// 首先引入Mock
import Mock from "mockjs";
import Login from "./login.js";
import {getUserList,deleteUser} from "./user.js"//用户
import {getProjectList}from "./project.js"//项目
import { getList, deleteTask, addTask, putTask } from "./taskList.js";

// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: "200-600"
});
// 登录
Mock.mock("/login", "post", Login);

Mock.mock("/tasks", "post", getList);
Mock.mock(/\/tasks/, "delete", deleteTask);
Mock.mock("/addTasks", "post", addTask);

Mock.mock(/\/tasks/, "put", putTask);
//用户管理
Mock.mock("/users/getUserList","post",getUserList);//用户列表展示
// Mock.mock("","get",)//给根据id查询用户
// Mock.mock("","put",)//修改用户信息
// Mock.mock("","post",)//增加用户信息
Mock.mock(/\/users/,"delete",deleteUser);//删除用户列表
//项目管理
Mock.mock("/projects/getProjectList","post",getProjectList);//项目列表展示
Mock.mock("","",);//根据id查询项目
Mock.mock("","",);//修改项目信息
Mock.mock("","",);//增加项目信息
Mock.mock("","",);//删除项目信息

