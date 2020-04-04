<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple">
          <img src="../../assets/heima_logo.png">
        </div></el-col>
        <el-col :span="18">
          <h2 class="middle">电商后台管理系统</h2>


        </el-col>
        <el-col :span="2"><div class="grid-content bg-purple">
          <a class="loginout" href="#">退出</a>
        </div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">Aside</el-aside>
      <el-main class="main">main</el-main>
    </el-container>
  </el-container>
</template>

<script>
    export default {
        name: "home"
    }
</script>



<style scoped>
 .container{
   height: 100%;
 }
  .header{
    background-color: #b3c0d1;
  }

  .main{
    background-color: #e9eef3;
    height: 100%;

  }
  .aside{
    background-color: #d3dce6;

  }

  .middle{
    text-align: center;
  }
  .loginout{
    text-decoration: none;
    line-height: 60px;
  }
</style>
