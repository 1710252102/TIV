// 首先引入Mock
import Mock from "mockjs";
import Login from "./login.js";
import { getList, deleteTask } from "./taskList.js";
// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: "200-600"
});
// 登录
Mock.mock("/login", "post", Login);
Mock.mock("/tasks", "post", getList);
Mock.mock(/\/tasks/, "delete", deleteTask);
