<template>
  <el-container>
    <el-header>
      <span>| 任务信息可视化管理系统</span>
      <div class="title">
        <div class="adminInfo">
          <div class="time">{{ timeData }}</div>
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
          <span>admin</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="button" @click="toggleCollapse">
          |||
        </div>
        <!-- 侧边栏 菜单区 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="ii + ''" v-for="(item, ii) in menuList" :key="ii">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <i :class="iconList[ii]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="item2.path"
              :key="index2"
              v-for="(item2, index2) in item.children"
              @click="saveNavState(item2.path)"
              ><template slot="title">
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ item2.authName }}</span>
              </template></el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      timeData: moment(Date.now()).format("YYYY/MM/DD HH:mm"),
      // 左侧菜单数据
      menuList: [
        {
          authName: "用户管理",
          children: [
            {
              authName: "用户列表",
              path: "/users",
              children: []
            }
          ]
          // id:0,
        },
        {
          authName: "项目管理",
          children: [
            {
              authName: "项目列表",
              path: "/projects",
              children: []
            }
          ]
        },
        {
          authName: "组管理",
          children: [
            {
              authName: "组列表",
              path: "/groups",
              children: []
            }
          ]
        },
        {
          authName: "任务管理",
          children: [
            {
              authName: "任务列表",
              path: "/tasks",
              children: []
            }
          ]
        },
        {
          authName: "可视化显示",
          children: [
            {
              authName: "项目任务视图",
              path: "/taskView",
              children: []
            },
            {
              authName: "组内人员任务视图",
              path: "/userView",
              children: []
            },
            {
              authName: "组内项目任务视图",
              path: "/projectView",
              children: []
            }
          ]
        }
      ],
      iconList: [
        "el-icon-user",
        "el-icon-folder",
        "el-icon-copy-document",
        "el-icon-notebook-1",
        "el-icon-s-data"
      ],
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: "/users"
    };
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath") || "/users";
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 点击按钮,切换猜到的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    }
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 20px;
    color: #fff;
  }
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    .adminInfo {
      margin-right: 20px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      // font-size: 22px;
      .time {
        text-align: right;
        color: #fff;
        margin-right: 20px;

        // font-size: 22px;
      }
      span {
        margin-left: 10px;
        text-align: center;
        font-size: 16px;
      }
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
i {
  margin-right: 10px;
}
.button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
