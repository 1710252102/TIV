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
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加任务</el-button>
        </el-col>
      </el-row>
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="任务名称" prop="id"> </el-table-column>
          <el-table-column label="所属项目" prop="name"> </el-table-column>
          <el-table-column label="预计开始时间" prop="desc"> </el-table-column>
          <el-table-column label="预计结束时间" prop="desc"> </el-table-column>
          <el-table-column label="实际开始时间" prop="desc"> </el-table-column>
          <el-table-column label="实际结束时间" prop="desc"> </el-table-column>
          <el-table-column type="expand" label="任务关联人员" width="70px">
            <template slot-scope="props">
              <el-tag v-for="item in props.row.children" :key="item">{{
                item
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template>
              <!--            {{scope.row}}}-->
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        :page-sizes="[2, 5, 10, 15]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          children: [
            "12987122",
            "好滋好味鸡蛋仔",
            "江浙小吃、小吃零食",
            "上海市普陀区真北路",
            "王小虎夫妻店"
          ]
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        }
      ],
      queryInfo: {
        //查询参数
        query: "",
        //当前页码
        pagenum: 1,
        //每页显示多少数据
        pagesize: 5
      }
    };
  }
};
</script>

<style lang="less" scoped>
.el-tag {
  margin: 10px;
}
</style>
