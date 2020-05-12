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
          placeholder="请输入用户名"
          v-model="name"
          class="inputSearch">

          <el-button slot="append" icon="el-icon-search" v-on:click="searchUser"></el-button>
        </el-input>
        <el-button type="success" @click="dialogFormVisible = true">添加用户</el-button>

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
        width="120">
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
            @change="changeStatus(userList.row)"
            v-model="userList.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>

      <!--delHorse(scope.row.id)-->
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="diagEditShow(scope.row)" size=mini plain type="primary" icon="el-icon-edit" circle></el-button>
          <el-button @click="dialogshow(scope.row.id)" size=mini plain type="danger" icon="el-icon-delete" circle>
          </el-button>
          <el-button @click="showSetUserRoleDia(scope.row)" size=mini plain type="success" icon="el-icon-check" circle>
          </el-button>
        </template>

      </el-table-column>
    </el-table>


    <el-dialog title="分配角色" :visible.sync="dialogEditUserRoleFormVisible">
      <el-form :model="editHorseForm">
        <el-form-item label="用户名" label-width="120px">
          {{editHorseForm.name}}
        </el-form-item>
        <el-form-item label="角色" label-width="120px">

          <el-select
            v-model="currentRoleId"
            placeholder="请选择角色"
            @change="selectRole(currentRoleId)"
          >
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, i) in roleList"
              :key="i"
            >
            </el-option>
          </el-select>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditUserRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserRole">确 定</el-button>
      </div>
    </el-dialog>




    <el-dialog title="编辑用户" :visible.sync="dialogEditFormVisible">
      <el-form :model="editHorseForm" >
        <el-form-item label="姓名" label-width="120px">
          <el-input v-model="editHorseForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="editHorseForm.email" autocomplete="off">
          </el-input>
        </el-form-item>

        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="editHorseForm.phone" autocomplete="off">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="editHorse">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="addHorseForm" >
        <el-form-item label="姓名" label-width="120px"
                      :rules="[{required:true,message:'请输入姓名'}]">
          <el-input v-model="addHorseForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" label-width="120px"
                      :rules="[{required:true,message:'请输入邮箱'}]">
          <el-input v-model="addHorseForm.email" autocomplete="off">
          </el-input>
        </el-form-item>

        <el-form-item label="手机号" label-width="120px"
                      :rules="[{required:true,message:'请输入手机号'}]">
          <el-input v-model="addHorseForm.phone" autocomplete="off">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addHorse">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="delHorse()">确 定</el-button>
  </span>
    </el-dialog>

   <!--分页-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>

  </el-card>
</template>

<script>
    export default {
      data() {
        return {
          currentRoleId:-1,
          dialogEditUserRoleFormVisible: false,
          dialogEditFormVisible: false,
          delId: '',
          name: '',
          totalCount: -1,
          pageIndex: 1,
          pageSize: 10,
          userList: [],
          errorMessage: '',
          dialogVisible: false,
          dialogFormVisible: false,
          editUserRoleForm: {
            id: '',
            name: '',
            email: '',
            phone: '',
            roleId: '',
            roleName: ''
          },
          roleList: [],
          role: {
            id: '',
            name: '',
            status: ''
          },
          editHorseForm: {
            id: '',
            name: '',
            email: '',
            phone: '',
            roleId: ''
          },
          addHorseForm: {
            name: '',
            email: '',
            phone: ''
          }

        }
      },
      created() {
        this.getUserList()
      },
      methods: {

        async editUserRole(){
          const that = this
          const res =await this.$http.put("/usermanage/api/v1/horses/"+this.editHorseForm.id, this.editHorseForm).catch(function () {
            that.$message.error(that.SERVE_RERROR)
          })
          const{status, errorMessage} = res.data
          if (status === 'SUCCEED'){
            this.$message.success('修改成功')
            this.editHorseForm={}
            this.dialogEditUserRoleFormVisible=false
            this.getUserList()
          } else {
            that.$message.error(errorMessage);
          }
        },

        selectRole(id){
          this.editHorseForm.roleId = id
        },

        //打开分配角色对话框
        async showSetUserRoleDia(user){
          this.dialogEditUserRoleFormVisible=true

          const that = this
          const res = await this.$http.get("/usermanage/api/v1/roles?pageIndex=1&pageSize=1000").catch(function () {
            that.$message.error(that.SERVE_RERROR)
          })
          const {status, totalCount, datas, errorMessage} = res.data
          if (status === 'SUCCEED'){
            this.roleList = datas
            this.editHorseForm={...user}
            this.currentRoleId = this.editHorseForm.roleId
          }else {
            this.$message.error(errorMessage)
          }


        },

      searchUser() {
        this.pageIndex = 1
        this.getUserList();
      },

      changeStatus(row) {
        const that = this
        const param = {"status": row.status}
        this.$http.put("/usermanage/api/v1/horses/" + row.id, param).then(res => {
          const {status, errorMessage} = res.data
          if (status !== 'SUCCEED') {
            this.$message.error(errorMessage)
          }
        }).catch(function (err) {
          that.$message.error(that.SERVE_RERROR)
        })
      },


      cancelEdit() {
        this.getUserList()
        this.dialogEditFormVisible = false
      },

      async editHorse() {
        const that = this
        const res = await this.$http.put("/usermanage/api/v1/horses/" + this.editHorseForm.id, this.editHorseForm)
          .catch(function () {
            that.$message.error(that.SERVE_RERROR)
          })
        const {status, errorMessage} = res.data
        if (status === 'SUCCEED') {
          this.$message.success('修改成功')
          this.getUserList()
          this.dialogEditFormVisible = false
        }
      },

      diagEditShow(row) {
        /*this.editHorseForm={...row}*/
        this.editHorseForm = Object.assign({}, row)
        this.dialogEditFormVisible = true
      },

      dialogshow(id) {
        this.delId = id
        this.dialogVisible = true
      },

      handleSizeChange(val) {
        this.pageSize = val
        this.pageIndex = 1
        console.log(`每页${val}条`)
        this.getUserList()

      },
      handleCurrentChange(val) {
        this.pageIndex = val
        this.getUserList()
        console.log(`当前页: ${val}`);
      },

      async delHorse() {
        const that = this
        const res = await this.$http.delete('/usermanage/api/v1/horses/' + this.delId)
          .catch(function () {
            that.$message.error(that.SERVE_RERROR)
          })
        const {status, errorMessage} = res.data
        if (status === 'SUCCEED') {
          this.$message.success('删除成功')
          this.dialogVisible = false
          //判断当前页是否还有数据，如果当前页没数据，且非首页，则请求第一页的数据
          if (this.userList.length === 1 && this.pageIndex !== 1) {
            this.pageIndex = 1
            this.getUserList()
          } else {
            this.getUserList()
          }

        } else {
          this.$message.error(errorMessage)
        }
      },

      async addHorse() {
        const that = this
        const res = await this.$http.post('/usermanage/api/v1/horses', this.addHorseForm)
          .catch(function () {
            that.$message.error(that.SERVE_RERROR)
          })
        const {status, errorMessage} = res.data
        if (status === 'SUCCEED') {
          this.$message.success('添加成功')
          this.getUserList()
          this.addHorseForm = {}
          this.dialogFormVisible = false

        } else {
          this.$message.error(this.errorMessage)
        }
      },

      async getUserList() {
        const that = this
        //this.$http.defaults.headers.common['token'] = localStorage.getItem("token")
        const res = await this.$http.get('/usermanage/api/v1/horses?pageIndex='
          + this.pageIndex + '&pageSize=' + this.pageSize + '&name=' + this.name).catch(function () {
          that.$message.error(that.SERVE_RERROR)
        })
        const {status, totalCount, datas, errorMessage} = res.data
        if (status === 'SUCCEED') {
          //1.给表格数据赋值
          this.userList = datas
          this.totalCount = totalCount
          //2.给total赋值
        } else {
          this.$message.error(this.errorMessage)
        }
      },
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
  .block{
    padding-top: 20px;
  }

</style>
