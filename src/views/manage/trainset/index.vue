<template>
  <div class="authGroup">
    <div class="row">
        <h1 class="main-title">文件管理</h1>
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
                <p>{{x.item.fileName}}</p>
            </template>
            <template v-slot:column_2="x">
                <p>{{x.item.fileSize}}</p>
            </template>            
            <template v-slot:column_3="x">
                <p class="sec">{{x.item.chunkSize}}</p>
            </template>
            <template v-slot:column_4="x">
                <p class="sec">{{x.item.url}}</p>
            </template>
            <template v-slot:column_5="x">
                <p class="sec">{{x.item.createTime}}</p>
            </template>          
            <template v-slot:column_6="x">
                <div class="buttonGroup">
                   
                    <fv-button  theme="custom" @click="deleteItem(x)" >删除</fv-button>
                </div>
            </template>
            
        </fv-details-list>
    </div>

   <!-- 添加或修改对话框 -->
    <el-dialog   :visible.sync="dialogFormVisible" width="55%">
       <minioUpload></minioUpload>
    </el-dialog>


  </div>
</template>

<script>
import {getFileList,deleteFile} from '@/api/file.js'
import {getToken,getUserUid} from '@/utils/auth'
export default {
    data(){
        return{        

            dialogFormVisible:false,
            formLabelWidth: "120px",
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
                    content: "名称",
                    minWidth: 100,
                    width: 150,
                },
                {
                    content: "大小",
                    minWidth: 100,
                    width: 150,
                },        
                {
                    content: "分片数",
                    minWidth: 100,
                    width: 150,
                },
               {
                    content: "访问地址",
                    minWidth: 100,
                    width: 150,
                },
                {
                    content: "创建时间",
                    minWidth: 100,
                    width: 150,
                },
               {
                    content: "相关操作",
                    minWidth: 100,
                    width: 150,
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
            ]        
        }
    },
    created(){
        this.getItemLists()
    },
    components:{
       minioUpload:resolve=>require(['./upload1.vue'],resolve)
    },
    methods:{
        addItem(){
            this.title="上传训练集"
            this.dialogFormVisible=!this.dialogFormVisible
        },
        /**
         * 获取列表
         */
         getItemLists(){
            var param={}
            param.userUid=getUserUid()
            param.currentPage=this.currentPage;
            param.pageSize=this.pageSize; 
            getFileList(param).then(res=>{
                console.log(res.data)
                var data=res.data
                var records=data.records
                this.currentPage=data.current
                this.pageSize=data.size
                this.total=data.total
                this.tableData=records
            })                 
         },
         /**
          * 删除
          */
         deleteItem(x){
           var param={uid:x.item.uid,userUid:getUserUid()}
           deleteFile(param).then(res=>{
               if(res.code=="success"){
                   this.getItemLists()
                   this.$message.success("删除成功")
               }else{
                   this.$message.warning(res.data)
               }
           })
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

    /deep/.el-dialog{
       margin-top: 0;
       /deep/.el-dialog__header{
           padding: 0 !important;
       }
       /deep/.el-dialog__body{
          padding-top: 10px !important;
       }
    }
}  




</style>