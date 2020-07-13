<template>
  <div class="container">
    <!-- 用于返回登录页 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>组管理</el-breadcrumb-item>
      <el-breadcrumb-item>组列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="search">
      <dl>
        <dt>
          <el-input
            placeholder="请输入组名" 
            :searchStr="searchStr"          
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchGroup"
            ></el-button>
          </el-input>
        </dt>
        <dd>
          <el-button type="primary" @click="addGroupVisibility = true"
            >添加组</el-button>
        </dd>
      </dl> 

    </div>

    <div class="content">
      <el-table
        :data="this.groupInfo"
        stripe
        border  
        height="100%"
      >
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column 
          v-for="(item, index) in this.tableColmns" :key="index"
          :prop="item.colProp"
          :label="item.colLabel"
        ></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="medium"
                circle
                @click="showEditDialog(scope.row.id)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="medium"
                circle
                @click="removeGroup(scope.row.id)"
              ></el-button>
            </template>
        </el-table-column>
      </el-table>
    </div>
    
    <div class="bottom">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 添加组与添加组可以同一dialog -->
    <el-dialog
      title="添加组"
      :visible.sync="addGroupVisibility"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form
        :model="GroupInfo"
        ref="addGroupFormRef"
        label-width="100px"
      >
        <el-form-item label="组名" prop="groupName">
          <el-input v-model="GroupInfo.groupName"></el-input>
        </el-form-item>
        <el-form-item label="组员" prop="groupMember">
          <el-input v-model="GroupInfo.groupMember"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addGroupVisibility = false">取 消</el-button>
        <el-button type="primary" @click="addGroup">确 定</el-button>
      </span>
    </el-dialog>

  
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchStr: '',
      total: 11,
      addGroupVisibility: false,
      editGroupVisibility: false,
      GroupInfo: {},
      groupInfo: 
      [
        {
          id: 1,
          groupName: 'group1',
          groupMember: 1,
          other1: 'other1',
          other2: 'other2',
          other3: 'other3',
        },{
          id: 2,
          groupName: 'group2',
          groupMember: 2,
          other1: 'other1',
          other2: 'other2',
          other3: 'other3',
        },{
          id: 3,
          groupName: 'group3',
          groupMember: 3,
          other1: 'other1',
          other2: 'other2',
          other3: 'other3',
        },{
          id: 3,
          groupName: 'group3',
          groupMember: 3,
          other1: 'other1',
          other2: 'other2',
          other3: 'other3',
        },{
          id: 3,
          groupName: 'group3',
          groupMember: 3,
          other1: 'other1',
          other2: 'other2',
          other3: 'other3',
        },{
          id: 3,
          groupName: 'group3',
          groupMember: 3,
          other1: 'other1',
          other2: 'other2',
          other3: 'other3',
        },{
          id: 3,
          groupName: 'group3',
          groupMember: 3,
          other1: 'other1',
          other2: 'other2',
          other3: 'other3',
        },{
          id: 3,
          groupName: 'group3',
          groupMember: 3,
          other1: 'other1',
          other2: 'other2',
          other3: 'other3',
        },{
          id: 3,
          groupName: 'group3',
          groupMember: 3,
          other1: 'other1',
          other2: 'other2',
          other3: 'other3',
        },{
          id: 3,
          groupName: 'group3',
          groupMember: 3,
          other1: 'other1',
          other2: 'other2',
          other3: 'other3',
        },{
          id: 3,
          groupName: 'group3',
          groupMember: 3,
          other1: 'other1',
          other2: 'other2',
          other3: 'other3',
        }
      ], 
      tableColmns: [{
        colProp: 'groupName',
        colLabel: '组名'
      },{
        colProp: 'groupMember',
        colLabel: '成员'
      },{
        colProp: 'other1',
        colLabel: '其他1'
      },{
        colProp: 'other2',
        colLabel: '其他2'
      },{
        colProp: 'other3',
        colLabel: '其他3'
      }],

      queryInfo: {
        //查询参数
        query: "",
        //当前页码
        pagenum: 1,
        //每页显示多少数据
        pagesize: 5
      },
    }
  },
  beforeMount() {
    
  },
  methods: {  
    showEditDialog(id) {

    },
    removeUserById(id) {

    },
    handleSizeChange(newSize) {

    },
    handleCurrentChange(newSize) {

    },
    searchGroup() {
      
    },
    addGroup() {
      this.addGroupVisibility = false;
    },
    addDialogClosed() {

    },

    async removeGroup(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除组信息, 是否继续?",
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
      // const { data: res } = await this.$http.delete("/tasks/" + id);
      // if (res.status !== 200) {
      //   return this.$message.error("删除任务失败");
      // }
      // if (this.tableData.length == 1) {
      //   this.queryInfo.pagenum--;
      //   if (this.queryInfo.pagenum <= 0) {
      //     this.queryInfo.pagenum = 1;
      //   }
      // }
      // this.getTaskList();
    },

  }        
};
</script>

<style lang="less" scoped>
  .container{
    display: flex;
    height: 100% ;
    flex-direction: column;
    .search{
      height: 75px;
      overflow: hidden;
      background-color: white;
      dl{
        width: 100%;
        margin-top: 20px;
        dt{
          width: 350px;
          float: left;
          margin-left: 30px;
        }
        dd{
          float: left;
        }
      }
    }

    .content{
      flex: 1;
      font-size: 12px;
      overflow: hidden;
      background-color: white;
    }
    .content /deep/ .el-table{
      width: 95%;
      margin: auto;
    }
    .content /deep/ .el-table__row{
      height: 65px;
    }
    .bottom{
      height: 60px;
      background: white;
    }
    .bottom /deep/ .el-pagination{
      margin-left: 30px;
    }
  }
</style>
