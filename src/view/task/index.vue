<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>任务管理</el-breadcrumb-item>
      <el-breadcrumb-item>任务列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            clearable
            v-model="queryInfo.query"
            @clear="getTaskList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getTaskList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="showAddForm()">添加任务</el-button>
        </el-col>
      </el-row>
      <template>
        <el-table :data="tableData" style="width: 100%" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="任务名称" prop="taskName"> </el-table-column>
          <el-table-column label="所属项目" prop="project"> </el-table-column>
          <el-table-column label="预计开始时间" prop="estimatedStartTime">
          </el-table-column>
          <el-table-column label="预计结束时间" prop="estimatedEndTime">
          </el-table-column>
          <el-table-column label="实际开始时间" prop="actualStartTime">
          </el-table-column>
          <el-table-column label="实际结束时间" prop="actualEndTime">
          </el-table-column>
          <el-table-column type="expand" label="任务关联人员" width="120px">
            <template slot-scope="scope">
              <el-tag v-for="item in scope.row.related" :key="item._id"
                >{{ item.account }} / {{ item.nickname }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="showAddForm(scope.row._id)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="removeTaskById(scope.row._id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        :page-sizes="[2, 5, 10, 15]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-size="queryInfo.pageSize"
        :current-page="queryInfo.current"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容 -->
      <el-form
        :model="addTaskList"
        ref="addTaskListRef"
        label-width="100px"
        :rules="addTaskFormRules"
      >
        <el-form-item label="任务名称" prop="taskName">
          <el-input style="width:55%" v-model="addTaskList.taskName">
          </el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="project">
          <el-select
            v-model="addTaskList.project"
            placeholder="请选择活动区域"
            required
          >
            <el-option
              v-for="item in projectList"
              :key="item.label"
              :value="item.value"
              :label="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预计时间" prop="expTime" required>
          <el-date-picker
            v-model="addTaskList.expTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实际时间" prop="realTime" required>
          <el-date-picker
            v-model="addTaskList.realTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="任务关联人员" prop="related" required>
          <el-select
            v-model="addTaskList.related"
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="item in userList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTask">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tableData: [],
      queryInfo: {
        //查询参数
        query: "",
        //当前页码
        current: 1,
        //每页显示多少数据
        pageSize: 5
      },
      total: null,
      //  添加表单 默认不展示
      addDialogVisible: false,
      // 添加任务数组
      addTaskList: {
        id: "",
        taskName: "",
        project: "",
        expTime: [],
        realTime: [],
        related: [],
        estimatedStartTime: "",
        actualEndTime: "",
        estimatedEndTime: "",
        estimatedStartTime: ""
      },
      // 添加任务验证规则
      addTaskFormRules: {
        taskName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        project: [{ required: true, message: "选择所属项目", trigger: "blur" }],
        expTime: [
          { required: true, message: "请输入预计时间", trigger: "blur" }
        ],
        realTime: [
          { required: true, message: "请输入实际时间", trigger: "blur" }
        ],
        related: [
          { required: true, message: "请选择关联人员", trigger: "blur" }
        ]
      },
      // 项目列表
      projectList: [],
      // 用户列表
      userList: [],
      // 任务id
      taskId: ""
    };
  },
  created() {
    this.getTaskList();
  },
  methods: {
    // 获取列表
    async getTaskList() {
      const { data: res } = await this.$http.get(
        "/task/list" +
          "?" +
          "pageSize=" +
          this.queryInfo.pageSize +
          "&" +
          "current=" +
          this.queryInfo.current
      );
      console.log(res, "rews");
      if (res.code !== 200) {
        return this.$message.error("获取任务列表失败");
      }

      this.total = res.count;
      res.data.forEach((item, index) => {
        item.estimatedStartTime = this.transformDate(item.estimatedStartTime);
        item.estimatedEndTime = this.transformDate(item.estimatedEndTime);
        item.actualStartTime = this.transformDate(item.actualStartTime);
        item.actualEndTime = this.transformDate(item.actualEndTime);
      });
      this.tableData = res.data;
    },

    //  监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getTaskList();
    },
    // 监听页码值改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.current = newSize;
      this.getTaskList();
    },

    // editTaskById(id) {},
    // 移除某个任务
    async removeTaskById(id) {
      // alert(id);
      const confirmResult = await this.$confirm(
        "此操作将永久删除任务, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      // 点击确定 返回值为：confirm
      // 点击取消 返回值为： cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$http.delete("/task/delete?id=" + id);
      console.log(res);
      if (res.code !== 200) {
        return this.$message.error("删除任务失败");
      }
      if (this.tableData.length == 1) {
        this.queryInfo.current--;
        if (this.queryInfo.current <= 0) {
          this.queryInfo.current = 1;
        }
      }
      this.getTaskList();
    },
    // 添加任务 修改任务
    async showAddForm(id) {
      console.log(typeof id);
      this.addDialogVisible = true;
      //  获取项目列表
      const { data: res1 } = await this.$http.get("/task/project");
      this.projectList = [];
      this.userList = [];
      if (res1.code == 200) {
        res1.data.forEach((item, index) => {
          this.projectList[index] = {
            label: item.projectName,
            value: item._id
          };
        });
      }
      // 获取人员列表
      const { data: res2 } = await this.$http.get("/task/account");
      if (res2.code == 200) {
        res2.data.forEach((item, index) => {
          this.userList[index] = {
            label: item.account,
            value: item._id
          };
        });
      }
      if (id) {
        this.taskId = id;
        console.log(this.tableData);
        this.tableData.forEach((item, index) => {
          if (item._id == id) {
            console.log(item,"213123");
            this.addTaskList.expTime = [
              item.estimatedStartTime,
              item.estimatedEndTime
            ];
            this.addTaskList.realTime = [
              item.actualStartTime,
              item.actualEndTime
            ];
            item.related.forEach((item2, index2) => {
              // item.related[item2]
              this.addTaskList.related[index2] = item2._id;
            });
            this.addTaskList.taskName = item.taskName;
            this.addTaskList.project = item.project;
            this.addTaskList.id = item._id;
          }
        });
      }
    },
    // 点击取消 删除 清空内容
    addDialogClosed() {
      this.$refs.addTaskListRef.resetFields();
    },

    addTask() {
      if (!this.taskId.length) {
        this.$refs.addTaskListRef.validate(async valid => {
          if (!valid) {
            return;
          }
          this.addTaskList.estimatedStartTime = this.addTaskList.expTime[0];
          this.addTaskList.estimatedEndTime = this.addTaskList.expTime[1];
          this.addTaskList.actualStartTime = this.addTaskList.realTime[0];
          this.addTaskList.actualEndTime = this.addTaskList.realTime[1];
          const { data: res } = await this.$http.post(
            "/task/add",
            this.addTaskList
          );
          // console.log("this.addTaskList :>> ", this.addTaskList);
          if (res.code == 200) {
            console.log(res);
            this.addDialogVisible = false;
            this.$message.success("添加成功");
          } else {
            this.$message.error("添加失败");
          }
          this.getTaskList();
        });
      } else {
        this.$refs.addTaskListRef.validate(async valid => {
          if (!valid) {
            return;
          }
          this.addTaskList.estimatedStartTime = this.addTaskList.expTime[0];
          this.addTaskList.estimatedEndTime = this.addTaskList.expTime[1];
          this.addTaskList.actualStartTime = this.addTaskList.realTime[0];
          this.addTaskList.actualEndTime = this.addTaskList.realTime[1];
          const { data: res } = await this.$http.post(
            "/task/update",
            this.addTaskList
          );
          if (res.code == 200) {
            console.log(res);
            this.addDialogVisible = false;
            this.$message.success("添加成功");
          } else {
            this.$message.error("添加失败");
          }
          this.getTaskList();
        });
      }
    },
    transformDate(val) {
      return moment(val).format("YYYY-MM-DD");
    }
  }
};
</script>

<style lang="less" scoped>
.el-tag {
  margin: 10px;
}
.line {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
