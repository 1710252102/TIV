<template>
  <!--  面包屑导航区-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索 添加用户为一行-->
      <!-- gutter 属性来指定每一栏之间的间隔，默认间隔为 0-->
      <el-row :gutter="20">
        <el-col :span="7">
<<<<<<< HEAD
<!--          queryInfo.query-->
          <el-input
            placeholder="请输入内容"
            v-model="query"
            clearable
            @clear="getUserList"
          >
<!--            @click-->
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="serchId"
=======
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
>>>>>>> origin/suifeng
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <!-- stripe: 斑马条纹 border：边框 模板列-->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
<!--        <el-table-column prop="password" label="密码"></el-table-column>-->
        <el-table-column prop="name" label="昵称"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
<<<<<<< HEAD
            <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="showEditDialog(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="removeUserById(scope.row.id)"
=======
            <!--            {{scope.row}}}-->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              @click="removeUserById(scope.row.id)"
>>>>>>> origin/suifeng
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
<<<<<<< HEAD
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
=======
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
>>>>>>> origin/suifeng
        :page-sizes="[2, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加用户的对话框    addDialogVisible 默认为隐藏对话框   close-->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
<<<<<<< HEAD
      <!-- 内容主体 --> <!--        :model="addUserForm"-->
=======
      <!-- 内容主体 -->
>>>>>>> origin/suifeng
      <el-form
        :model="addUserForm"
        ref="addUserFormRef"
        :rules="addUserFormRules"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="addUserForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addUserForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
<<<<<<< HEAD
    <el-dialog title="修改用户信息"
=======
    <el-dialog
      title="修改用户信息"
>>>>>>> origin/suifeng
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 内容主体 -->
      <el-form
        :model="editUserForm"
        ref="editUserFormRef"
        :rules="editUserFormRules"
        label-width="70px"
      >
<<<<<<< HEAD
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUserForm.username" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="editUserForm.name"></el-input>
=======
        <el-form-item label="用户名">
          <el-input v-model="editUserForm.username" disabled></el-input>
>>>>>>> origin/suifeng
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editUserForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 自定义邮箱规则
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/;
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback();
      }
      callback(new Error("请输入合法邮箱"));
    };
    // 自定义手机号规则
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/;
      if (regMobile.test(value)) {
        return callback();
      }
      // 返回一个错误提示
      callback(new Error("请输入合法的手机号码"));
    };
    return {
      //  获取用户列表查询参数对象 到时候根据接口修改查询参数
      queryInfo: {
        //查询参数
        query: "",
        //当前页码
        pagenum: 1,
        //每页显示多少数据
        pagesize: 5
<<<<<<< HEAD
      },
      userlist: [],
      total: 0,
      //  添加用户对话框
      addDialogVisible: false,
      //  增加用户
      addUserForm: {
        username: "",
        password: "",
        name: "",
        email: "",
        phone: ""
      },
      query:'',

=======
      },
      userlist: [],
      total: 0,
      //  添加用户对话框
      addDialogVisible: false,
      //  增加用户
      addUserForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
>>>>>>> origin/suifeng
      //  用户添加表单验证规则
      addUserFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "用户名的长度在2～10个字",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "用户密码的长度在6～18个字",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      },
      //  修改用户对话框
      editDialogVisible: false,
      // 编辑用户表单
      editUserForm: {},
      //  编辑用户表单验证
      editUserFormRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    //生命周期函数中获取列表
    this.getUserList();
  },
  methods: {
<<<<<<< HEAD

    serchId (){
      let temp= [];
      this.userlist.map(item=>{
        if(item.username===this.query)
          temp.push(item)
      });
      this.userlist=temp

    },
    //获取用户列表
    async getUserList() {
      const { data: res } = await this.$http.post("/users/getUserList", {
        params: this.queryInfo
      });
      console.log(res); // 打印用户数据
      if (res.status !== 200) {
        return this.$message.error("获取用户列表失败！");
      }
      this.userlist = res.data.rows;
=======
    //获取用户列表
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo
      });
      console.log(res); // 打印用户数据
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户列表失败！");
      }
      this.userlist = res.data.users;
>>>>>>> origin/suifeng
      this.total = res.data.total;
    },
    //  监听pagesize改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    // 监听页码值改变事件
    handleCurrentChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagenum = newSize;
      this.getUserList();
    },
    // 监听 添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addUserFormRef.resetFields();
    },
    //  添加用户
    addUser() {
<<<<<<< HEAD
      // this.userlist.push(this.addUserForm)
      this.total+=1
      let userInfo = {
        username: this.addUserForm.username,
        name:this.addUserForm.name,
        password:this.addUserForm.password,
       email:this.addUserForm.email,
        phone:this.addUserForm.phone
      }
      this.userlist.push(userInfo)
      // console.log(this.userlist,this.addUserForm)
      // console.log(this.addUserForm.username)
=======
>>>>>>> origin/suifeng
      // 提交请求前，表单预验证
      this.$refs.addUserFormRef.validate(async valid => {
        // console.log(valid)
        // 表单预校验失败
        if (!valid) return;
        // 可以发起添加用户的网络请求
<<<<<<< HEAD
        // this.userlist = res.data.rows;
        // this.total = res.data.total;
        // if (res.meta.status !== 201) {
        //   this.$message.error("添加用户失败！");
        // }
        // this.$message.success("添加用户成功！");
        // 隐藏添加用户对话框
        this.addDialogVisible = false;
        // 刷新用户列表·
        // this.getUserList();
      });
    },
    // 编辑用户信息 根据id查询用户信息
    // async
    showEditDialog(record) {
      // console.log(record)
      console.log('123')
      this.editDialogVisible = true;
      this.$set(this.editUserForm,'username', record.username);
      this.$set(this.editUserForm, 'password', record.password);
      this.$set(this.editUserForm, 'name', record.name);
      this.$set(this.editUserForm, 'email', record.email);
      this.$set(this.editUserForm, 'phone', record.phone);


    },
      // this.editDialogVisible = true;
      // const { data: res } = await this.$http.get("users/" + id);
      // if (res.meta.status !== 200) {
      //   return this.$message.error("查询用户信息失败！");
      // }
      // this.editUserForm = res.data;
      // this.editDialogVisible = true;
    // },
=======
        // const { data:res } = await this.$http.post('users',this.addUserForm)
        const { data: res } = await this.$http.post("users", this.addUserForm);
        if (res.meta.status !== 201) {
          // this.$message.error('添加用户失败! ')
          this.$message.error("添加用户失败！");
        }
        this.$message.success("添加用户成功！");
        // 隐藏添加用户对话框
        this.addDialogVisible = false;
        // 刷新用户列表
        this.getUserList();
      });
    },
    // 编辑用户信息 根据id查询用户信息
    async showEditDialog(id) {
      const { data: res } = await this.$http.get("users/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("查询用户信息失败！");
      }
      this.editUserForm = res.data;
      this.editDialogVisible = true;
    },
>>>>>>> origin/suifeng
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editUserFormRef.resetFields();
    },
    // 修改用户信息
    editUser() {
      // 提交请求前，表单预验证
      this.$refs.editUserFormRef.validate(async valid => {
        if (!valid) return;
<<<<<<< HEAD
        let temp= [];
        this.userlist.map(item=>{
          if(item.username === this.editUserForm.username) {
            item.name = this.editUserForm.name;
            item.password = this.editUserForm.password;
            item.email = this.editUserForm.email;
            item.phone = this.editUserForm.phone;
          }
        });
        //
        // const { data: res } = await this.$http.put(
        //   "users/" + this.editUserForm.id,
        //   {
        //     email: this.editUserForm.email,
        //     mobile: this.editUserForm.mobile
        //   }
        // );
        // if (res.meta.status !== 200) {
        //   return this.$message.error("更新用户信息失败！");
        // }
        // // 隐藏添加用户对话框
        // this.editDialogVisible = false;
        // this.$message.success("更新用户信息成功！");
        // // 刷新数据列表
        // this.getUserList();
      });
    },
    // 根据id删除用户
    async removeUserById(id) {
      console.log(id)
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err); // 箭头函数 捕获错误
      // 点击确定 返回值为：confirm
      // 点击取消 返回值为： cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      // 发送请求删除用户信息
      const { data: res } = await this.$http.delete("/users/" + id);
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("删除用户失败！");
      }
      this.$message.success("删除用户成功！");
      if (this.userlist.length == 1) {
        this.queryInfo.pagenum--;
        if (this.queryInfo.pagenum <= 0) {
          this.queryInfo.pagenum = 1;
        }
      }
=======
        const { data: res } = await this.$http.put(
          "users/" + this.editUserForm.id,
          {
            email: this.editUserForm.email,
            mobile: this.editUserForm.mobile
          }
        );
        if (res.meta.status !== 200) {
          return this.$message.error("更新用户信息失败！");
        }
        // 隐藏添加用户对话框
        this.editDialogVisible = false;
        this.$message.success("更新用户信息成功！");
        // 刷新数据列表
        this.getUserList();
      });
    },
    // 根据id删除用户
    async removeUserById(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err); // 箭头函数 捕获错误
      // 点击确定 返回值为：confirm
      // 点击取消 返回值为： cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      // 发送请求删除用户信息
      const { data: res } = await this.$http.delete("users/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("删除用户失败！");
      }
      this.$message.success("删除用户成功！");
>>>>>>> origin/suifeng
      this.getUserList();
    }
  }
};
</script>
<style lang="less" scoped></style>
