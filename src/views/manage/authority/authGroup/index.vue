<template>
  <div class="authGroup">
       <!-- 列表 -->

        <fv-DetailsList
        v-model="tableData"
        :head="head"
        :multiSelection="true"
        :allowDrag="true"
        style="width:1000px;min-height:300px"
        >
            <template v-slot:column_0="x">
                <p>{{x.item.name}}</p>
            </template>
            <template v-slot:column_1="x">
                <p class="sec">{{x.item.summary}}</p>
            </template>
            <template v-slot:column_2="x">
                <p class="sec">{{x.item.status==1?"显示":"隐藏"}}</p>
            </template>
            <template v-slot:column_3="x">
                <p class="sec">{{x.item.createTime}}</p>
            </template>
            <template v-slot:column_4="x">
                <p class="sec">{{x.item.updateTime}}</p>
            </template>
            <template v-slot:column_5="x">
                <div class="buttonGroup">
                    <fv-button  theme="light">编辑</fv-button>
                    <fv-button  theme="custom" @click="DeleteGroup(x)">删除</fv-button>
                </div>
            </template>            
        </fv-DetailsList>

    <!--分页-->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {getList,edit,add, deleteGroup} from "@/api/authGroup.js"
export default {
    data(){
        return{
            form: {
                uid: null,
                name: "",
                summary: "",
                categoryMenuUids: [],
            },
            //分类菜单列表
            categoryMenuList: [],
            tableData: [],
            keyword: "",
            currentPage: 1,
            pageSize: 10,
            total: 5, 
            title: "",
            head:[
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
            filter:"name"            
        }
    },
    created(){
        this.getGroupList()
    },
    methods:{
        /**
         * 获取权限组列表
         */
         getGroupList(){
            var params = {};
            params.keyword = this.keyword;
            params.currentPage = this.currentPage;
            params.pageSize = this.pageSize;
            getList(params).then(res=>{
                console.log(res.data)
                
                this.tableData=[...res.data.records]
                this.currentPage = response.data.current;
                this.pageSize = response.data.size;
                this.total = response.data.total;                
            })
                    
         },
         /**
          * 增加权限组
          */
         addGroup(){

         },
         /**
          * 删除
          */
         DeleteGroup(x){
           var param={uid:x.item.uid}
           deleteGroup(param).then(res=>{
               if(res.code=="success"){
                   this.getGroupList()
                   this.$message.success("删除成功")
               }else{
                   this.$message.warning(res.data)
               }
           })
         },
         /**
          * 编辑
          */
         edit(){

         },
         
         handleCurrentChange: function (val) {
            this.currentPage = val;
            this.getGroupList();
         },     
    }
}
</script>

<style lang="scss" scoped>
    .authGroup{
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 20px 10px;
    }
    .buttonGroup{
        display: flex;
    }
    .block{
        align-self: flex-end;
    }



</style>