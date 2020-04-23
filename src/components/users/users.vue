<template>
  <el-card class="box-card">
   <!--面包屑-->

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

   <!--搜索-->

    <el-row class="searchRow">
      <el-col>

        <el-input
          placeholder="请输入内容"
          v-model="query"
          class="inputSearch">

          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success">添加用户</el-button>

      </el-col>
    </el-row>

   <!--表格-->

    <el-table
      :data="userList"
      style="width: 100%">
      <el-table-column
      type="index"
      label="#"
      width="60">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话">
      </el-table-column>

      <el-table-column
        label="创建日期">
        <template slot-scope="userList">
          {{userList.row.createTime | fmtdate}}
        </template>
      </el-table-column>

      <!--<el-table-column>
        <template slot-scope=""userList>
          {{userList.row.createTime | fmtdate}}
        </template>
      </el-table-column>-->


      <el-table-column
        label="用户状态">
        <template slot-scope="userList">
          <el-switch
            v-model="userList.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>


      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size=mini plain=false type="primary" icon="el-icon-edit" circle></el-button>
          <el-button size=mini plain=false type="danger" icon="el-icon-delete" circle></el-button>
          <el-button size=mini plain=false type="success" icon="el-icon-check" circle></el-button>

        </template>

      </el-table-column>
    </el-table>

   <!--分页-->

  </el-card>
</template>

<script>
    export default {
        data(){
          return{
            query: '',
            total:-1,
            pageIndex: 1,
            pageSize:10,
            userList:[],
            errorMessage:'',

          }
        },
      created(){
          this.getUserList()
      },
      methods:{


         async getUserList(){
           const that = this
            //test
           //this.$http.defaults.headers.common['token'] = localStorage.getItem("token")
           const res = await this.$http.get('/usermanage/api/v1/horses?pageIndex='
             +this.pageIndex+'&pageSize='+this.pageSize).catch(function () {
             that.$message.error(that.SERVE_RERROR)
           })
           console.log(res)
           const {status, total, datas, errorMessage} = res.data
           if (status === 'SUCCEED'){
             //1.给表格数据赋值
             this.userList = datas
             this.total = total
             //2.给total赋值
           }else {
             this.$message.error(this.errorMessage)
           }
          }
      }
    }
</script>

<style scoped>
  .box-card{
    height: 100%;
  }
  .inputSearch{
    width: 300px;
  }
  .searchRow{
    margin-top: 20px;
  }

</style>
