<template>
  <div class="authGroup">
    <div class="row">
        <h1 class="main-title">我的模型管理</h1>
    </div>
    <!-- 工具栏 -->
    <div class="row command-bar">
        <fv-command-bar :options="cmd">
            <template v-slot:right-space>
                <div style="width: auto; height: 100%; display: flex; justify-content: center; align-items: center;">
                    <fv-search-box v-model="searchValue" :options="searchResult" icon="Search" placeholder="搜索模型" :revealBorder="true" borderRadius="3" borderWidth="2"></fv-search-box>
                </div>
            </template>
        </fv-command-bar>
    </div>
    <!-- 列表 -->
    <div class="row main-table">
        <fv-details-list v-model="tableData" :head="head" :multiSelection="true" style="width: 100%; height: 100%;" >
            <template v-slot:column_0="x">
                <p class="sec">{{x.row_index + 1}}</p>
            </template>
            <template v-slot:column_1="x">
                <p>{{x.item.name}}</p>
            </template>
            <template v-slot:column_2="x">
                <p class="sec">{{x.item.description}}</p>
            </template>
            <template v-slot:column_3="x">
                <p class="sec">{{x.item.image_name.split('/')[1]}}</p>
            </template>
            <template v-slot:column_4="x">
                <p class="sec">{{x.item.replicas}}</p>
            </template>
            <template v-slot:column_5="x">
                <p class="sec">
                   {{x.item.portList[0].port+":"+x.item.portList[0].cluster_port}}
                </p>
            </template>            
            <template v-slot:column_6="x">
                <div class="buttonGroup">
                    <fv-button  theme="custom" @click="deleteItem(x.item.deployment_id)" >删除</fv-button>
                    <fv-button  theme="custom" @click="getProxy(x.item.deployment_id)" >查询代理</fv-button>

                </div>
            </template>
        </fv-details-list>
    </div>

    <!-- 新增,编辑 对话框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="form.name" placeholder="请输入容器名称" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" placeholder="请输入容器描述" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="镜像名" :label-width="formLabelWidth">
          <el-input v-model="form.image_name" placeholder="请输入容器镜像名" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="副本数" :label-width="formLabelWidth">
          <el-input v-model="form.replicas" placeholder="请输入容器副本数" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="开放端口" :label-width="formLabelWidth">
          <el-input v-model="form.ports" placeholder="请选择容器开放端口,以逗号分割" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="环境变量" :label-width="formLabelWidth">
          <el-input v-model="form.envlist" placeholder="请输入容器环境变量" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="启动命令" :label-width="formLabelWidth">
          <el-input v-model="form.command" placeholder="请输入容器启动命令" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>

    </el-dialog>

    <!-- 代理信息 -->
    <el-dialog title="您的模型代理如下" :visible.sync="proxyDialog">


      <div slot="footer" class="dialog-footer">
        <el-button @click="proxyDialog = false">关 闭</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>

export default {
    data(){
        return{
            form: {
                uid: null,
                name: "",
                description: "",
                image_name:"",
                replicas:1,
                ports:"",
                envList:[],
                command:"",
                type:0,
                session_affinity:0,
                portList:[]
            },          
            //分类菜单列表
            categoryMenuList: [],
            dialogFormVisible:false,
            proxyDialog:false,
            proxys:[{
                port:0,
                cluster_ip:"",
                url:""
            }],
            formLabelWidth: "120px",
            tableData: [],
            keyword: "",
            currentPage: 1,
            pageSize: 10,
            total: 5, 
            title: "",
            searchValue:"",
            filterLength:100,
            head:[
                {
                    content: "序号",
                    minWidth: 60,
                    width: 80
                },
                {
                    content: "名称",
                    minWidth: 100,
                    width: 150,
                },
                {
                    content: "描述",
                    minWidth: 100,
                    width: 150,
                },
                {
                    content: "镜像名",
                    minWidth: 100,
                    width: 200,
                },
                {
                    content: "副本",
                    minWidth: 100,
                    width: 100,
                }
                ,
                {
                    content: "端口",
                    minWidth: 100,
                    width: 200,
                },
                        
                {
                    content: "相关操作",
                    minWidth: 100,
                    width: 200,
                }
            ],
            cmd: [
                { name: "刷新", icon: "Refresh", iconColor: "rgba(0, 153, 204, 1)", func: () => { this.getItemLists() } },
                { name: "增加", icon: "Add", iconColor: "rgba(0, 153, 204, 1)", func: () => { this.addItem() }},
                { name: "显示范围", icon: "Filter", iconColor: "rgba(0, 153, 204, 1)", secondary: [
                    { name: "10", icon: "LineSpacing", func: () => { this.filterLength = 10 } },
                    { name: "50", icon: "LineSpacing", func: () => { this.filterLength = 50 } },
                    { name: "100", icon: "LineSpacing", func: () => { this.filterLength = 100 } }
                ]}
            ],
            rules: {
                name: [
                {required: true, message: '名称不能为空', trigger: 'blur'},
                {min: 1, max: 20, message: '长度在1到20个字符'},
                ]
            }          
        }
    },
    created(){
        this.getItemLists()
    },
    methods:{
        /**
         * 查询代理
         */
        getProxy(x){
            this.$api.MicroService.GetProxys(x).then(res=>{
                var data=res.data
                if(data.length>0){
                    this.proxys=data;
                    this.proxyDialog=!this.proxyDialog
                    this.$message.success("查询成功")
                }else{
                    this.$message.info("您还未创建代理")
                }
            })
        },
        /**
         * 获取列表
         */
         getItemLists(){
             this.$api.MicroService.GetMyDeployments(10,0).then(res=>{
                 console.log(res.data)
                 this.tableData=res.data
             })    
         },
         /**
          * 增加容器
          */
         addItem(){
             this.title="创建模型"
             this.form=this.getFormObject()
             this.dialogFormVisible=!this.dialogFormVisible
         },
         /**
          * 删除
          */
         deleteItem(x){
s
           this.$api.MicroService.RemoveDeployment(x).then(res=>{
               this.$message.success("删除成功")
               this.getItemLists()
           })
         },

        
         /**
          * 提交表单
          */
         submitForm(){
            this.$refs.form.validate((valid) => {
                if(!valid){
                    this.$message.warning("参数校验出错,请按照提示天写")
                }else{
                    if(this.form.ports!=null){
                        var portList=[]
                        var portTemp=this.form.ports.split(",")
                        portTemp.forEach((item,index)=>{
                            var p=Number.parseInt(item);
                            var temp={port:p,cluster_port:p}
                            portList.push(temp)
                        })
                        this.form.portList=portList;
                    }
                    var data=this.form;
                    this.$api.MicroService.CreateDeployment(data.name,data.description,data.image_name,data.replicas,data.portlist,data.envlist,data.command,data.type,data.session_affinity).then(res=>{
                        console.log(res.data)
                        this.$message.success("创建模型成功")
                        this.getItemLists()
                        this.form=this.getFormObject()
                        this.dialogFormVisible=!this.dialogFormVisible
                    })        
                }
            })
         },
         /**
          * 初始化表单
          */
         getFormObject: function () {
            var formObject = {
                uid: null,
                name: "test cnn",
                description: "test",
                image_name:"frp.leavessoft.cn:50000/ccknn:v0.2",
                replicas:1,
                ports:"80,90",
                envList:[],
                command:"",
                type:0,
                session_affinity:0,
                portList:[]
            };
            return formObject;
        },          
        
    },
    watch: {
        /**
         * 监听搜索数据
         */
        searchValue (val, old) {
            if(val==""){
                this.getItemLists()
                return
            }
            if(val === old)
                return 0;
            var list=[]
            this.tableData.forEach((item,index)=>{
                if(item.name==val)list.push(item)
            })
            if(list.length>0){
                this.tableData=list;
            }
        },
        /**
         * 监听显示范围
         */
        filterLength () {
            this.pageSize=this.filterLength
            this.getItemLists()
        },
    },
    computed: {
        
        searchResult () {
            let arr = [];
            this.tableData.forEach((item, index) => {
                arr.push({
                    key: index,
                    name: item.name,
                    icon: "Contact"
                });
                if(index > 8)
                    return arr;
            });
            return arr;
        }
    },   
}
</script>

<style lang="scss" scoped>
.buttonGroup{
    display: flex;
}
.block{
    align-self: flex-end;
}
.authGroup
{
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(250, 250, 250, 1);
	box-sizing: border-box;
    overflow: hidden;
    
    display: flex;
    flex-direction: column;

    .row
    {
        position: relative;
        width: 100%;
        height: auto;
        padding: 12px;
        box-sizing: border-box;

        &.command-bar
        {
            padding: 0px 12px;
            z-index: 1;
        }

        &.main-table
        {
            width: calc(100% - 24px);
            flex: 1;
            margin: 8px 12px;
            padding: 0px;
            background: white;
            border-radius: 5px;
            box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
    }

    .main-title
    {
        @include nowrap;
        
        font-size: 18px;
        font-weight: 600;
        color: rgba(172, 89, 101, 0.9);
    }
}    



</style>