<template>
  <!--  面包屑导航区-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>项目管理</el-breadcrumb-item>
      <el-breadcrumb-item>项目列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索 添加   为一行-->
      <!-- gutter 属性来指定每一栏之间的间隔，默认间隔为 0。-->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getProjectList">
            <el-button slot="append" icon="el-icon-search" @click="getProjectList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible=true">添加项目</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="projectlist" border stripe>
        <!-- stripe: 斑马条纹 border：边框 模板列-->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="describe" label="描述"></el-table-column>
        <el-table-column prop="expStart" label="预计开始时间"></el-table-column>
        <el-table-column prop="expEnd" label="预计结束时间"></el-table-column>
        <!--        <el-table-column label="状态">-->
        <!--          <template slot-scope="scope">-->
        <!--            &lt;!&ndash;            双向数据绑定   作用域插槽会覆盖props  v-model 双向绑定&ndash;&gt;-->
        <!--            <el-switch v-model="scope.row.my_state" @change="userStateChanged(scope.row)"></el-switch>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--            {{scope.row}}}-->
            <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="showEditDialog(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="removeProjectgitById(scope.row.id)"></el-button>
            <!--            <el-tooltip class="item" effect="dark" content="角色分配" :enterable="false" placement="top">-->
            <!--              &lt;!&ndash;     enterable         &ndash;&gt;-->
            <!--              <el-button type="warning" icon="el-icon-setting" size="mini" circle @click="showSetRole(scope.row)"></el-button>-->
            <!--            </el-tooltip>-->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[2, 5, 10, 15]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </el-card>
    <!-- 添加用户的对话框    addDialogVisible 默认为隐藏对话框   close-->
    <el-dialog title="添加项目" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体 -->
      <el-form :model="addProjectForm" ref="addProjectFormRef" :rules="addProjectFormRules" label-width="110px">
        <el-form-item label="名称" prop="username">
          <el-input v-model="addProjectForm.username"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="describe">
          <el-input v-model="addProjectForm.describe"></el-input>
        </el-form-item>
<!--        <el-form-item label="预计开始时间" prop="expStart">-->
<!--          <el-input v-model="addProjectForm.expStart"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="预计结束时间" prop="expEnd">-->
<!--          <el-input v-model="addProjectForm.expEnd"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="预计时间" required>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实际时间" required>
          <el-date-picker
            v-model="value2"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProject">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog title="修改项目信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <!-- 内容主体 -->
      <el-form :model="editProjectForm" ref="editProjectFormRef" :rules="editProjectFormRules" label-width="120px">
        <el-form-item label="项目名称">
          <el-input v-model="editProjectForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="describle">
          <el-input v-model="editProjectForm.describle"></el-input>
        </el-form-item>
        <el-form-item label="预计开始时间" prop="expStart">
          <el-input v-model="editProjectForm.expStart"></el-input>
        </el-form-item>
        <el-form-item label="预计开始时间" prop="expEnd">
          <el-input v-model="editProjectForm.expEnd"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editProject">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      // // 自定义邮箱规则
      // var checkEmail = (rule, value, callback) => {
      //   const regEmail = /^\w+@\w+(\.\w+)+$/
      //   if (regEmail.test(value)) {
      //     // 合法邮箱
      //     return callback()
      //   }
      //   callback(new Error('请输入合法邮箱'))
      // }
      // // 自定义手机号规则
      // var checkMobile = (rule, value, callback) => {
      //   const regMobile = /^1[34578]\d{9}$/
      //   if (regMobile.test(value)) {
      //     return callback()
      //   }
      //   // 返回一个错误提示
      //   callback(new Error('请输入合法的手机号码'))
      // }
      return {
        //  获取用户列表查询参数对象 到时候根据接口修改查询参数
        queryInfo: {
          //查询参数
          query: '',
          //当前页码
          pagenum: 1,
          //每页显示多少数据
          pagesize: 5
        },
        projectlist: [],
        total: 0,
        //  添加用户对话框
        addDialogVisible: false,
        //  增加用户
        addProjectForm: {
          username: '',
          password: '',
          describle: '',
          expStart: '',
          expEnd:''
        },
        //  用户添加表单验证规则
        addUserFormRules: {
          username: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
            {
              min: 2,
              max: 10,
              message: '用户名的长度在2～10个字',
              trigger: 'blur'
            }
          ],
          password: [
            { required: true, message: '请输入项目描述', trigger: 'blur' },
            {
              min: 6,
              max: 18,
              message: '用户密码的长度在6～18个字',
              trigger: 'blur'
            }
          ],
        },
        //  修改用户对话框
        editDialogVisible: false,
        // 编辑用户表单
        editProjectForm: {},
        //  编辑用户表单验证
        editProjectFormRules:{
        },
      }
    },
    created () {
      //生命周期函数中获取列表
      this.getProjectList()
    },
    methods:{
      //获取用户列表
      async getProjectList () {
        const { data: res } = await this.$http.post('/projects/getProjectList', {
          params: this.queryInfo
        })
        console.log(res) // 打印用户数据
        if (res.status !== 200) {
          return this.$message.error('获取用户列表失败！')
        }
        this.total = res.data.total
        this.projectlist = res.data.rows
      },
      //  监听pagesize改变的事件
      handleSizeChange (newSize) {
        // console.log(newSize)
        this.queryInfo.pagesize = newSize
        this.getUserList()
      },
      // 监听页码值改变事件
      handleCurrentChange (newSize) {
        // console.log(newSize)
        this.queryInfo.pagenum = newSize
        this.getUserList()
      },
      // 监听 添加用户对话框的关闭事件
      addDialogClosed(){
        this.$refs.addUserFormRef.resetFields()
      },
      //  添加用户
      addUser () {
        // 提交请求前，表单预验证
        this.$refs.addUserFormRef.validate(async valid => {
          // console.log(valid)
          // 表单预校验失败
          if (!valid) return
          // 可以发起添加用户的网络请求
          // const { data:res } = await this.$http.post('users',this.addUserForm)
          const { data: res } = await this.$http.post('users', this.addUserForm)
          if (res.meta.status !== 201) {
            // this.$message.error('添加用户失败! ')
            this.$message.error('添加用户失败！')
          }
          this.$message.success('添加用户成功！')
          // 隐藏添加用户对话框
          this.addDialogVisible = false
          // 刷新用户列表
          this.getUserList()
        })
      },
      // 编辑用户信息 根据id查询用户信息
      async showEditDialog (id) {
        const { data: res } = await this.$http.get('users/' + id)
        if (res.meta.status !== 200) {
          return this.$message.error('查询用户信息失败！')
        }
        this.editUserForm = res.data
        this.editDialogVisible = true
      },
      // 监听修改用户对话框的关闭事件
      editDialogClosed () {
        this.$refs.editUserFormRef.resetFields()
      },
      // 修改用户信息
      editUser () {
        // 提交请求前，表单预验证
        this.$refs.editUserFormRef.validate(async valid => {
          // console.log(valid)
          // 表单预校验失败
          // if (!valid) return
          if (!valid) return
          // const { data: res } = await  this.$http.put(
          //
          // )
          const { data: res } = await this.$http.put(
            'users/' + this.editUserForm.id,
            {
              email: this.editUserForm.email,
              mobile: this.editUserForm.mobile
            }
          )
          if (res.meta.status !== 200) {
            return this.$message.error('更新用户信息失败！')
          }
          // 隐藏添加用户对话框
          this.editDialogVisible = false
          this.$message.success('更新用户信息成功！')
          // 刷新数据列表
          this.getUserList()
        })
      },
      // 根据id删除用户
      async removeUserById (id) {
        const confirmResult = await this.$confirm(
          '此操作将永久删除该用户, 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).catch(err => err)// 箭头函数 捕获错误
        // 点击确定 返回值为：confirm
        // 点击取消 返回值为： cancel
        if (confirmResult !== 'confirm') {
          return this.$message.info('已取消删除')
        }
        // 发送请求删除用户信息
        const { data: res } = await this.$http.delete('users/' + id)
        if (res.meta.status !== 200) {
          return this.$message.error('删除用户失败！')
        }
        this.$message.success('删除用户成功！')
        this.getUserList()
      }
    }


  }
</script>

<style lang="less" scoped>

</style>
