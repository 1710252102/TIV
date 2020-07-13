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
          <el-table-column label="任务名称" prop="task"> </el-table-column>
          <el-table-column label="所属项目" prop="project"> </el-table-column>
          <el-table-column label="预计开始时间" prop="expStart">
          </el-table-column>
          <el-table-column label="预计结束时间" prop="expEnd">
          </el-table-column>
          <el-table-column label="实际开始时间" prop="realStart">
          </el-table-column>
          <el-table-column label="实际结束时间" prop="realEnd">
          </el-table-column>
          <el-table-column type="expand" label="任务关联人员" width="120px">
            <template slot-scope="scope">
              <el-tag v-for="item in scope.row.children" :key="item.id"
                >{{ item.group }} / {{ item.name }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="showAddForm(scope.row.id)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="removeTaskById(scope.row.id)"
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
        :page-size="queryInfo.pagesize"
        :current-page="queryInfo.pagenum"
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
        <el-form-item label="任务名称" prop="task">
          <el-input style="width:55%" v-model="addTaskList.task"> </el-input>
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
              :value="item.label"
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
        <el-form-item label="任务关联人员" prop="children" required>
          <el-cascader
            :options="userList"
            :props="{ multiple: true }"
            clearable
            v-model="addTaskList.children"
          ></el-cascader>
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
        pagenum: 1,
        //每页显示多少数据
        pagesize: 5
      },
      total: null,
      //  添加表单 默认不展示
      addDialogVisible: false,
      // 添加任务数组
      addTaskList: {
        id: "",
        task: "",
        project: "",
        expTime: [],
        realTime: [],
        children: []
      },
      // 添加任务验证规则
      addTaskFormRules: {
        task: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        project: [{ required: true, message: "选择所属项目", trigger: "blur" }],
        expTime: [
          { required: true, message: "请输入预计时间", trigger: "blur" }
        ],
        realTime: [
          { required: true, message: "请输入实际时间", trigger: "blur" }
        ],
        children: [
          { required: true, message: "请选择关联人员", trigger: "blur" }
        ]
      },
      // 项目列表
      projectList: [
        {
          value: "数据智能业务部",
          label: "数据智能业务部"
        },
        {
          value: "企业智能业务部",
          label: "企业智能业务部"
        },
        {
          value: "机器智能业务部",
          label: "机器智能业务部"
        },
        {
          value: "人工智能部",
          label: "人工智能部"
        },
        {
          value: "平台产品部",
          label: "平台产品部"
        }
      ],
      // 用户列表
      userList: [
        {
          value: "项目技术部 ",
          label: "项目技术部 ",
          children: [
            { value: "曾娟", label: "曾娟" },
            { value: "黄埔1", label: "黄埔1" },
            { value: "徐汇", label: "徐汇" }
          ]
        },
        {
          value: "平台产品部",
          label: "平台产品部",
          children: [
            { value: "南京", label: "南京" },
            { value: "苏州", label: "苏州" },
            { value: "无锡", label: "无锡" }
          ]
        },
        {
          value: "企业智能业务部",
          label: "企业智能业务部",
          children: [
            { value: "周明", label: "周明" },
            { value: "任平", label: "任平" },
            { value: "杨娟", label: "杨娟" }
          ]
        }
      ]
    };
  },
  created() {
    this.getTaskList();
  },
  methods: {
    async getTaskList() {
      const { data: res } = await this.$http.post("/tasks", {
        parmas: this.queryInfo
      });
      console.log("index res :>> ", res);
      if (res.status !== 200) {
        return this.$message.error("获取任务列表失败");
      }
      this.total = res.data.total;
      this.tableData = res.data.rows;
    },
    //  监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getTaskList();
    },
    // 监听页码值改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize;
      this.getTaskList();
    },

    // editTaskById(id) {},
    // 移除某个任务
    async removeTaskById(id) {
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
      const { data: res } = await this.$http.delete("/tasks" + id);
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("删除任务失败");
      }
      if (this.tableData.length == 1) {
        this.queryInfo.pagenum--;
        if (this.queryInfo.pagenum <= 0) {
          this.queryInfo.pagenum = 1;
        }
      }
      this.getTaskList();
    },
    // 添加任务
    async showAddForm(id) {
      this.addDialogVisible = true;
      if (!id) {
      } else {
        const { data: res } = await this.$http.put("/tasks/" + id);
        this.addTaskList.task = res.data.task;
        this.addTaskList.project = res.data.project;
        this.addTaskList.children = res.data.children;
        this.addTaskList.id = res.data.id;
        this.addTaskList.expTime = [res.data.expStart, res.data.expEnd];
        this.addTaskList.realTime = [res.data.realStart, res.data.realEnd];
        console.log(this.userList);
        console.log("res.data.children :>> ", res.data.children);
        for (var i = 0; i < res.data.children.length; i++) {
          this.userList[i] = {};
          this.userList[i].label = this.userList[i].value =
            res.data.children[i].group;
          // this.userList[i].children.label = this.userList[i].children.value =
          //   res.data.children[i].name;
        }
        // console.log(
        //   " this.addTaskList.children:>> ",
        //   this.addTaskList.children
        // );
        // this.addTaskList.children=[res.data.children.]
      }
    },
    // 点击取消 删除 清空内容
    addDialogClosed() {
      this.$refs.addTaskListRef.resetFields();
    },
    addTask() {
      this.$refs.addTaskListRef.validate(async valid => {
        if (!valid) {
          return;
        }
        this.addTaskList.expTime = [
          moment(this.addTaskList.expTime[0]).format("YYYY-MM-DD"),
          moment(this.addTaskList.expTime[1]).format("YYYY-MM-DD")
        ];

        this.addTaskList.realTime = [
          moment(this.addTaskList.realTime[0]).format("YYYY-MM-DD"),
          moment(this.addTaskList.realTime[1]).format("YYYY-MM-DD")
        ];
        const { data: res } = await this.$http.post("/addTasks", {
          parmas: this.addTaskList
        });
        if (res.status == 200) {
          console.log(res);
          this.addDialogVisible = false;
          this.$message.success("添加成功");
        } else {
          this.$message.success("添加失败");
        }
        this.getTaskList();
        // console.log("this.addTaskList2 :>> ", this.addTaskList);
      });
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
