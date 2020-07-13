<template>
  <div class="login_container">
    <div class="login_box">
      <div class="login_bcg"></div>
      <div class="login_content">
        <!-- logo区域 -->
        <div class="logo">
          <!-- <img src="../../../static/img/im-xuelang.png" /> -->
          <p>任务信息可视化管理系统</p>
        </div>
        <!-- 登录表单区域 -->
        <el-form
          :rules="loginFormRules"
          :model="loginForm"
          label-width="0px"
          class="login_form"
          ref="loginFormRef"
        >
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              prefix-icon="el-icon-s-custom"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              prefix-icon="el-icon-lock"
              type="password"
            ></el-input>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456"
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    // async getList() {
    //   const res = await this.$http.get("/parameter/query");
    //   // console.log("res :>> ", res);
    // },
    // 点击重置按钮 重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      // 预校验
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post("/login", this.loginForm);
        if (res.status !== 200) return this.$message.error("登录失败! ");
        this.$message.success("登录成功");
        window.sessionStorage.setItem("token", res.data.token);
        console.log(res.data.token);
        this.$router.push("/home");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  background: url("../../../static/img/bg-login.png");
  background-size: 100% 100%;
  // background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  .login_box {
    @rate: 1440/1920;
    width: 100%;
    height: 100%;
    // background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;

    .login_bcg {
      background: url("../../../static/img/im-login-banner.png");
      background-size: 100% 100%;
      width: 640px * @rate;
      height: 570px * @rate;
      z-index: 999;
    }
    .login_content {
      width: 360px * @rate;
      height: 500px * @rate;
      margin-top: -12px;
      margin-left: -26px;
      background-color: #eee;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      .logo {
        // margin-left: 50px;
        p {
          padding: 40px 0 60px 0;
          text-align: center;
          font-weight: 600;
          font-size: 18px;
          // line-height: 50px;
        }
        // margin-top: -40px;
      }
      .login_form {
        box-sizing: border-box;
        padding: 0 30px;
      }
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
