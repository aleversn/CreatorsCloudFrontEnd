<template>
  <div class="authGroup">
    <div class="row">
        <h1 class="main-title">权限管理</h1>
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
        <fv-details-list 
        v-model="tableData" 
        :head="head" 
        :group="tableGroup"
        :multiSelection="true" 
        style="width: 100%; height: 100%;" >
            <template v-slot:column_0="x">
                <p class="sec">{{x.row_index + 1}}</p>
            </template>
            <template v-slot:column_1="x">
                <p>{{x.item.name}}</p>
            </template>
            <template v-slot:column_2="x">
                <p>{{x.item.fatherName}}</p>
            </template>            
            <template v-slot:column_3="x">
                <p class="sec">{{x.item.url}}</p>
            </template>
            <template v-slot:column_4="x">
                <p class="sec">{{x.item.icon}}</p>
            </template>
            <template v-slot:column_5="x">
                <p class="sec">{{x.item.sort}}</p>
            </template>          
            <template v-slot:column_6="x">
                <div class="buttonGroup">
                    <fv-button  theme="light" @click="editItem(x)">编辑</fv-button>
                    <fv-button  theme="custom" @click="deleteItem(x)">删除</fv-button>
                </div>
            </template>
            
        </fv-details-list>
    </div>

   <!-- 添加或修改对话框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="菜单等级" :label-width="formLabelWidth" prop="menuLevel">
          <el-select v-model="form.menuLevel" placeholder="请选择">
            <el-option
              v-for="item in leveArr"
              :key="item.key"
              :label="item.label"
              :value="parseInt(item.key)"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="form.menuLevel == 2"
          label="父菜单名"
          :label-width="formLabelWidth"
          prop="parentUid"
        >
          <el-select
            v-model="form.parentUid"
            placeholder="请输入父菜单名"
          >
            <el-option
              v-for="item in parentUids"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>



        <el-form-item label="图标" :label-width="formLabelWidth" prop="icon">
          <el-input v-model="form.icon" placeholder="请输入前图标名称">
            <!-- <el-button slot="append" icon="el-icon-setting" @click="openIconsDialog('prefix-icon')">
              选择
            </el-button> -->
          </el-input>
        </el-form-item>


        <el-form-item label="路由" :label-width="formLabelWidth" prop="url">
          <el-input v-model="form.url" placeholder="URL" auto-complete="off"></el-input>
        </el-form-item>



        <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
          <el-input v-model="form.sort" auto-complete="off"></el-input>
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
import {getMenuList,addMenu,editMenu,deleteMenu} from '@/api/menu.js'
export default {
    data(){
        return{
            form: {
                uid: null,
                parentUid:"",
                menuLevel:"",
                menuType:0,
                name: "",
                icon: "",
                url: "",
                sort: ""
            },        
            //分类菜单列表
            categoryMenuList: [],
            parentUids:[],
            leveArr:[
                {
                    key:1,
                    label:"一级菜单",
                    value:"1"
                },
                {
                    key:2,
                    label:"二级子菜单",
                    value:"2"
                }
            ],
            dialogFormVisible:false,
            formLabelWidth: "120px",
            defaultProps: {
                children: "childMenu",
                label: "name"
            },
            tableData: [],
            tableGroup:[],
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
                    content: "菜单名",
                    minWidth: 100,
                    width: 150,
                },
                {
                    content: "父类名",
                    minWidth: 100,
                    width: 150,
                },        
                {
                    content: "路由",
                    minWidth: 100,
                    width: 180,
                },
                {
                    content: "图标",
                    minWidth: 100,
                    width: 150,
                },
                {
                    content: "排序",
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
                {required: true, message: '菜单名称不能为空', trigger: 'blur'},
                {min: 1, max: 20, message: '长度在1到20个字符'},
                ],
                menuLevel: [
                {required: true, message: '菜单等级不能为空', trigger: 'blur'}
                ],
                parentUid: [
                {required: true, message: '父菜单名不能为空', trigger: 'blur'}
                ],
                icon: [
                {required: true, message: '图标不能为空', trigger: 'blur'}
                ],
                url: [
                {required: true, message: '路由不能为空', trigger: 'blur'}
                ],
                sort: [
                {required: true, message: '排序字段不能为空', trigger: 'blur'},
                {pattern: /^[0-9]\d*$/, message: '排序字段只能为自然数'},
                ],
            }         
        }
    },
    created(){
        this.getItemLists()
    },
    methods:{

        /**
         * 获取列表
         */
         getItemLists(){
            var param={}
            param.currentPage=this.currentPage;
            param.pageSize=this.pageSize; 
            getMenuList(param).then(res=>{
                console.log(res.data.records)
                var data=res.data
                var records=data.records
                this.currentPage=data.current
                this.pageSize=data.size
                this.total=data.total

                var list=[]
                records.forEach((item,index)=>{
                    // 保留父类数组
                    var parent={}
                    parent.value=item.uid
                    parent.label=item.name
                    this.parentUids.push(parent)
                    // 将子类放进tableDate
                    item.childMenu.forEach((child,i)=>{
                        child.fatherName=item.name
                        list.push(child)
                    })
                    
                })
                this.tableData=list
            })                  
         },
         /**
          * 增加权限组
          */
         addItem(){
             this.title="增加菜单"
             this.dialogFormVisible=!this.dialogFormVisible
             this.form=this.getFormObject()
             this.isEdit = false;
         },
         /**
          * 删除
          */
         deleteItem(x){
           var param={uid:x.item.uid}
           deleteMenu(param).then(res=>{
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
             this.title="编辑菜单";
             this.isEdit=true;
             this.form=x.item
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
                    var param=this.form
                    console.log(param)
                    if(this.isEdit){
                        //如果是编辑类型
                        editMenu(param).then(res=>{
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
                        addMenu(param).then(res=>{
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
                parentUid:"",
                menuLevel:"",
                menuType:1,
                name: "",
                icon: "",
                url: "",
                sort: ""
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
            // var list=[]
            // this.tableData.forEach((item,index)=>{
            //     if(item.name==val)list.push(item)
            // })
            // if(list.length>0){
            //     this.tableData=list;
            // }
        },
        /**
         * 监听显示范围
         */
        filterLength () {
            console.log(this.filterLength)
            this.pageSize=this.filterLength
            this.getItemLists()
        },
    },
    computed: {
        
        searchResult () {
            let arr = [];
            // this.tableData.forEach((item, index) => {
            //     arr.push({
            //         key: index,
            //         name: item.name,
            //         icon: "Contact"
            //     });
            //     if(index > 8)
            //         return arr;
            // });
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