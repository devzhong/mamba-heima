<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple">
          <img src="../../assets/heima_logo.png">
        </div></el-col>
        <el-col :span="18">
          <h2 class="middle">测试管理</h2>


        </el-col>
        <el-col :span="2"><div class="grid-content bg-purple">
          <a class="loginout" href="#" v-on:click="logout">退出</a>
        </div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">

        <el-menu
          :router="true"
          :unique-opened="true">

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-location"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-location"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-location"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-location"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-location"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-location"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-location"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-location"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>测试工具</span>
            </template>
            <el-menu-item index="6-1">
              <i class="el-icon-location"></i>
              <span>水滴</span>
            </el-menu-item>
            <el-menu-item index="6-2">
              <i class="el-icon-location"></i>
              <span>关注</span>
            </el-menu-item>
            <el-menu-item index="6-3">
              <i class="el-icon-location"></i>
              <span>活动</span>
            </el-menu-item>
          </el-submenu>


        </el-menu>

      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  //newVue之前触发
    export default {
      beforeCreate() {
        //获取token
        //判断token，有则放行，无则返回登录界面
        const token = localStorage.getItem("token")
        if (!token){
          this.$router.push({name: "login"})
        }
      },

      methods:{
        logout(){
          localStorage.removeItem("token")
          this.$message.success("退出成功")
          this.$router.push({name:"login"})
        },
      }
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
