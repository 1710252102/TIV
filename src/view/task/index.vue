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
          <el-button type="primary" @click="addForm()">添加任务</el-button>
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
                @click="editTaskById(scope.row.id)"
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
      <el-form
        :model="addRuleForm"
        :rules="addRules"
        ref="addRuleFormRef"
        label-width="100px"
      >
        <el-form-item label="任务名称" prop="task">
          <el-input style="width:55%"> </el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-select v-model="addRuleForm.region" placeholder="请选择活动区域">
            <el-option
              v-for="item in projectList"
              :key="item.label"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
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
        <el-form-item label="任务关联人员">
          <el-cascader
            :options="userList"
            :props="{ multiple: true }"
            clearable
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
      addDialogVisible: false,
      addRuleForm: {
        task: "",
        region: ""
      },
      addRules: [],
      value1: "",
      value2: "",
      projectList: [
        {
          value: "1",
          label: "数据智能业务部"
        },
        {
          value: "2",
          label: "企业智能业务部"
        },
        {
          value: "3",
          label: "机器智能业务部"
        },
        {
          value: "3",
          label: "人工智能部"
        },
        {
          value: "3",
          label: "平台产品部"
        }
      ],
      userList: [
        {
          value: 1,
          label: "上海",
          children: [
            { value: 3, label: "普陀" },
            { value: 4, label: "黄埔" },
            { value: 5, label: "徐汇" }
          ]
        },
        {
          value: 2,
          label: "江苏",
          children: [
            { value: 8, label: "南京" },
            { value: 9, label: "苏州" },
            { value: 10, label: "无锡" }
          ]
        },
        {
          value: 3,
          label: "浙江",
          children: [
            { value: 13, label: "杭州" },
            { value: 14, label: "宁波" },
            { value: 15, label: "嘉兴" }
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
      console.log("res :>> ", res);
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
    editTaskById(id) {},
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
      const { data: res } = await this.$http.delete("/tasks/" + id);
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
    addForm(id) {
      if (!id) {
        this.addDialogVisible = true;
      } else {
      }
    },
    //
    addDialogClosed() {
      console.log("this.$refs.addRuleFormRef :>> ", this.$refs.addRuleFormRef);
      this.$refs.addRuleFormRef.resetFields();
    },
    addTask() {}
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
