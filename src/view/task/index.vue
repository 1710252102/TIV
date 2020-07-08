<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>任务管理</el-breadcrumb-item>
      <el-breadcrumb-item>任务列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
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
              <el-tag v-for="item in props.row.children" :key="item">{{item}}</el-tag>
              <!-- <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item> -->
              <!-- </el-form> -->
            </template>
          </el-table-column>
        </el-table>
      </template>
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
          children:[
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
      ]
    };
  }
};
</script>

<style lang="less" scoped>
  .el-tag{
    margin: 10px;
  }
</style>