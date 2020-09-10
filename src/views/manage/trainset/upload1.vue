<template>
  <div class="hello">
    <uploader 
    :key="uploader_key" 
    :options="options" 
    :autoStart="false" 
    class="uploader-example"
    @file-success="onFileSuccess"
    >
      <uploader-unsupport></uploader-unsupport>
      <uploader-drop>
        <uploader-btn :single="true">选择文件</uploader-btn>
      </uploader-drop>
      <uploader-list></uploader-list>
    </uploader>
  </div>
</template>

<script>
import {getToken} from '../../../utils/auth'  
export default {
  data(){
    return{
      uploader_key: new Date().getTime(),//这个用来刷新组件--解决不刷新页面连续上传的缓存上传数据（注：每次上传时，强制这个值进行更改---根据自己的实际情况重新赋值）
      options: {
        target: 'http://localhost:8017/upload/upload',//SpringBoot后台接收文件夹数据的接口
        testChunks: false,//是否测试分片
        chunkSize: '50240000',   //分块大小 50Mb一块
        headers: {
          // 在header中添加的验证，请根据实际业务来
            Authorization: getToken()
        },

      }
    }
  },
  props: {
    msg: String
  },
  methods:{
    onFileSuccess: function (rootFile, file, response, chunk) {
      console.log(rootFile)
      console.log(file)
      console.log(response)
      console.log(chunk)
    },   
  }
}
</script>

<style>
  .uploader-example {
    width: 90%;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }

  .uploader-example .uploader-btn {
    margin-right: 4px;
  }

  .uploader-example .uploader-list {
    max-height: 440px;
    height: 500px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
