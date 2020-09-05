<template>
  <div class="authGroup">
    <div class="row">
        <h1 class="main-title">权限组管理</h1>
    </div>
    <!-- 工具栏 -->
    <div class="row command-bar">
        <fv-command-bar :options="cmd">
            <template v-slot:right-space>
                <div style="width: auto; height: 100%; display: flex; justify-content: center; align-items: center;">
                    <fv-search-box v-model="searchValue" :options="searchResult" icon="Search" placeholder="搜索权限组" :revealBorder="true" borderRadius="3" borderWidth="2"></fv-search-box>
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
                <p class="sec">{{x.item.summary}}</p>
            </template>
            <template v-slot:column_3="x">
                <p class="sec">{{x.item.status==1?"显示":"隐藏"}}</p>
            </template>
            <template v-slot:column_4="x">
                <p class="sec">{{x.item.createTime}}</p>
            </template>
            <template v-slot:column_5="x">
                <p class="sec">{{x.item.updateTime}}</p>
            </template>            
            <template v-slot:column_6="x">
                <div class="buttonGroup">
                    <fv-button  theme="light" @click="editItem(x)">编辑</fv-button>
                    <fv-button  theme="custom" @click="deleteItem(x)">删除</fv-button>
                </div>
            </template>
        </fv-details-list>
    </div>

    <!-- 新增,编辑 对话框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="权限组名称" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="form.name" placeholder="请输入权限组名称" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="权限组介绍" :label-width="formLabelWidth">
          <el-input v-model="form.summary" placeholder="请输入权限组介绍" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="权限菜单" :label-width="formLabelWidth">
            <el-tree
                ref="tree"
                check-strictly   
                :data="categoryMenuList"
                show-checkbox
                node-key="uid"   
                :props="defaultProps"   
                :default-checked-keys="form.mpids"  
            ></el-tree>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>

    </el-dialog>


  </div>
</template>

<script>
import {getList,edit,add, deleteGroup,getPmIds} from "@/api/authGroup.js"
import {getAllMenu} from '@/api/menu.js'
export default {
    data(){
        return{
            form: {
                uid: null,
                name: "",
                summary: "",
                mpids: [],
            },          
            //分类菜单列表
            categoryMenuList: [],
            dialogFormVisible:false,
            formLabelWidth: "120px",
            defaultProps: {
                children: "childMenu",
                label: "name"
            },
            tableData: [],
            keyword: "",
            currentPage: 1,
            pageSize: 10,
            isEdit:false,
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
                    content: "组名",
                    minWidth: 100,
                    width: 150,
                },
                {
                    content: "描述",
                    minWidth: 100,
                    width: 150,
                },
                {
                    content: "状态",
                    minWidth: 100,
                    width: 100,
                }
                ,
                {
                    content: "创建时间",
                    minWidth: 100,
                    width: 150,
                },
                            {
                    content: "更新时间",
                    minWidth: 100,
                    width: 150,
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
        this.getAllMenuList()
    },
    methods:{
        /**
        * 获取所有菜单,用于树形组件
        */
        getAllMenuList(){
            getAllMenu().then(res=>{
                  this.categoryMenuList=res.data
             })
        },
        /**
         * 获取列表
         */
         getItemLists(){
            var param={}
            param.currentPage=this.currentPage;
            param.pageSize=this.pageSize; 
            getList(param).then(res=>{
                var data=res.data
                this.currentPage=data.current
                this.pageSize=data.size
                this.total=data.total
                this.tableData=data.records              
            })
                    
         },
         /**
          * 增加权限组
          */
         addItem(){
             this.title="增加权限组"
             this.dialogFormVisible=!this.dialogFormVisible
             this.form=this.getFormObject()
             setTimeout(() => {
                this.$refs.tree.setCheckedKeys(this.form.mpids);
             }, 100);
             this.isEdit = false;

         },
         /**
          * 删除
          */
         deleteItem(x){
           var param={uid:x.item.uid}
           deleteGroup(param).then(res=>{
               if(res.code=="success"){
                   this.getItemLists()
                   this.$message.success("删除成功")
               }else{
                   this.$message.warning(res.data)
               }
           })
         },
         /**
          * 编辑
          */
         editItem(x){
             this.title="编辑权限组";
             this.isEdit=true;
             var param={uid:x.item.uid}
             this.form=x.item
             getPmIds(param).then(res=>{
                 var list=res.data
                 this.form.mpids=list
             })
             setTimeout(()=>{
                this.$refs.tree.setCheckedKeys(this.form.mpids);
             },100)
              this.dialogFormVisible=!this.dialogFormVisible 
         },
         
         /**
          * 提交表单
          */
         submitForm(){
            this.$refs.form.validate((valid) => {
                if(!valid){
                    this.$message.warning("参数校验出错,请按照提示天写")
                }else{
                    var categoryMenuUids = this.$refs.tree.getCheckedKeys();
                    // 得到的半选UID(也就是父级菜单)
                    var halfCategoryMenuUids = this.$refs.tree.getHalfCheckedKeys();
                    // 合并
                    categoryMenuUids = categoryMenuUids.concat(halfCategoryMenuUids);
                    console.log("合并后的", categoryMenuUids)
                    var param={}
                    param.name=this.form.name
                    param.summary=this.form.summary
                    param.mpids=categoryMenuUids.join(',')
                    
                    if(this.isEdit){
                        //如果是编辑类型
                        param.uid=this.form.uid
                        edit(param).then(res=>{
                            if(res.code=="success"){
                                this.$message.success(res.data)
                                this.getItemLists()
                            }else{
                                this.$message.warning(res.data)
                            }
                            this.dialogFormVisible=!this.dialogFormVisible
                            this.form=this.getFormObject()
                        })
                    }else{
                        //如果是提交类型
                        add(param).then(res=>{
                            if(res.code=="success"){
                                this.$message.success(res.data)
                                this.getItemLists()
                            }else{
                                this.$message.warning(res.data)
                            }
                            this.dialogFormVisible=!this.dialogFormVisible
                            this.form=this.getFormObject()   
                        })

                    }
                }
            })
         },
         /**
          * 初始化表单
          */
         getFormObject: function () {
            var formObject = {
                uid: null,
                name: null,
                summary: null,
                mpids: [],
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