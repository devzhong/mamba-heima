<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formData">
      <h2>登录系统</h2>
    <el-form-item label="账号">
      <el-input v-model="formData.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formData.password" placeholder="请输入密码" type="password"></el-input>
    </el-form-item>
      <el-button class="login-btn" type="primary" v-on:click="login">登录</el-button>
  </el-form>
  </div>
</template>

<script>
  export default {
    beforeCreate(){
      const token = localStorage.getItem("token")
      if (token){
        this.$router.push({name:"home"})
      }

    },

    name: "login",
    data() {
      return {
        formData: {
          phone: '',
          password: ''
        }
      }
    },
    methods:{

      login(){
        const that = this
        this.$http.post('/usermanage/api/v1/logins', this.formData).then(
          res => {
            if (res.status === 200){
              //取出login的response
              const {
                status,token,errorMessage
              }=res.data
              //如果成功
              if (status === 'SUCCEED'){
                localStorage.setItem("token",token)
                console.log("token: "+localStorage.getItem("token"))
                that.$message({
                  message: '登录成功',
                  type: 'success'
                })
                this.$router.push({name: 'home'})
              }else {
                //如果失败
                that.$message.error(errorMessage)
              }
              //校验账号和密码
            }else {
              //如果接口请求失败
              that.$message.error("服务器内部错误")
            }
          }
        ).catch(function (err) {
          that.$message.error("服务器内部错误")

        })
      }
    }
  }
</script>

<style scoped>

  .login-wrap{
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-wrap .login-form{
    background-color: white;
    border-radius: 5px;
    padding: 30px;
    width: 400px;
  }

  .login-wrap .login-btn{
    width: 100%;
  }

</style>
