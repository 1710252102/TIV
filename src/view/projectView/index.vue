<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>可视化显示</el-breadcrumb-item>
      <el-breadcrumb-item>组内项目任务视图</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="selectBox">
        <span>请选择组名：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in groupList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span>请选择时间：</span>
        <el-date-picker
          v-model="selectTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <div class="container">
        <div class="left">
          <div class="title">
            <span>组名称</span>
            <span>项目</span>
            <span>任务名称</span>
          </div>
          <div class="col">
            <canvas id="col"></canvas>
          </div>
        </div>
        <div class="right">
          <div class="row">
            <canvas id="row"></canvas>
          </div>
          <div class="content">
            <canvas id="canvasId"></canvas>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      lineArr: [
        {
          groupName: "东风",
          projectList: [
            {
              value: "项目A",
              task: [
                {
                  value: "任务1",
                  state: [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
                },
                {
                  value: "任务2",
                  state: [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
                },
                {
                  value: "任务3",
                  state: [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
                }
              ]
            },
            {
              value: "项目B",
              task: [
                {
                  value: "任务1",
                  state: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
                },
                {
                  value: "任务2",
                  state: [1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1]
                },
                {
                  value: "任务3",
                  state: [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1]
                }
              ]
            },
            {
              value: "项目B",
              task: [
                {
                  value: "任务7",
                  state: [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1]
                },
                {
                  value: "任务8",
                  state: [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1]
                },
                {
                  value: "任务9",
                  state: [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1]
                },
                {
                  value: "任务10",
                  state: [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1]
                }
              ]
            }
          ]
        }
      ],
      gridWidth: 90,
      gridHeight: 30,
      firstGridWidth: 90,
      dateList: [
        {
          value: "9",
          children: [27, 28, 29, 30]
        },
        {
          value: "10",
          children: [1, 2, 3, 4, 5, 6, 7, 8]
        }
      ],
      dateNum: 0,
      taskNum: 0,
      groupList: [
        {
          value: "1",
          label: "1"
        }
      ],
      selectTime: "",
      value: ""
    };
  },
  watch: {
    selectTime(e) {
      let a = moment(e[0]).format("YYYY-MM-DD");
      let b = moment(e[1]).format("YYYY-MM-DD");
      this.dealTime(a, b);
    }
  },
  mounted() {
    this.drawCol();
    this.drawRow();
    this.drawContent();
    let content = document.querySelector(".content");
    content.addEventListener("scroll", function() {
      var top = this.scrollTop;
      var left = this.scrollLeft;
      console.log('left :>> ', left);
      document.querySelector("#col").style.transform = `translateY(-${top}px)`;
      document.querySelector("#row").style.transform = `translateX(-${left}px)`;
    });
  },
  methods: {
    // 画左侧
    drawRow() {
      let cas = document.querySelector("#col");
      cas.width = this.gridWidth * 4 + "";
      this.taskNum = 0;
      for (let i = 0; i < this.lineArr[0].projectList.length; i++) {
        this.taskNum += this.lineArr[0].projectList[i].task.length;
      }
      cas.height = this.gridHeight * this.taskNum + "";
      //  拿到canvas绘图上下文
      var ctx = cas.getContext("2d");
      ctx.clearRect(0, 0, this.gridWidth * 4, this.gridHeight * this.taskNum);
      ctx.font = "12px Courier New"; // 文字
      ctx.strokeStyle = "#999"; //
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      this.lineArr.forEach((item1, index1) => {
        let num1 = 0;
        item1.projectList.forEach((item2, index2) => {
          let num2 = 0;
          item2.task.forEach((item3, index3) => {
            ctx.rect(
              2 * this.gridWidth,
              this.gridHeight * num1,
              2 * this.gridWidth,
              this.gridHeight
            );
            num1++;
            num2++;
            ctx.fillText(
              item3.value,
              2 * this.gridWidth + this.gridWidth,
              this.gridHeight * num1 - this.gridHeight / 2
            );
          });
          ctx.rect(
            this.gridWidth,
            this.gridHeight * (num1 - num2),
            this.gridWidth,
            this.gridHeight * num2
          );
          ctx.fillText(
            item2.value,
            this.gridWidth + this.gridWidth / 2,
            this.gridHeight * (num1 - num2) + (this.gridHeight * num2) / 2
          );
        });
        ctx.rect(
          0,
          this.gridHeight * index1,
          this.gridWidth,
          this.gridHeight * num1
        );
        ctx.fillText(
          item1.groupName,
          this.gridWidth / 2,
          (this.gridHeight * num1) / 2
        );
      });
      ctx.stroke();
    },
    // 画右上
    drawCol() {
      let cas = document.querySelector("#row");
      this.dateNum = 0;
      for (let i = 0; i < this.dateList.length; i++) {
        this.dateNum += this.dateList[i].children.length;
      }
      cas.width = this.gridWidth * this.dateNum;
      cas.height = this.gridHeight * 2;
      let ctx = cas.getContext("2d");
      ctx.clearRect(0, 0, this.gridWidth * this.dateNum, this.gridHeight * 2);
      ctx.font = "18px Courier New"; // 文字
      ctx.strokeStyle = "#333"; //
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let num1 = 0;
      this.dateList.forEach((item1, index1) => {
        let num2 = 0;
        item1.children.forEach((item2, index2) => {
          ctx.rect(
            this.gridWidth * num1,
            this.gridHeight,
            this.gridWidth,
            this.gridHeight
          );
          num1++;
          num2++;
          ctx.fillText(
            item2,
            this.gridWidth * num1 - this.gridWidth / 2,
            this.gridHeight + this.gridHeight / 2
          );
        });
        ctx.rect(
          this.gridWidth * (num1 - num2),
          0,
          this.gridWidth * num2,
          this.gridHeight
        );
        ctx.fillText(
          item1.value + "月",
          this.gridWidth * (num1 - num2) + (this.gridWidth * num2) / 2,
          this.gridHeight / 2
        );
      });
      ctx.stroke();
    },
    //  画右下
    drawContent() {
      let cas = document.querySelector("#canvasId");
      cas.width = this.gridWidth * this.dateNum;
      cas.height = this.gridHeight * this.taskNum;
      var ctx = cas.getContext("2d");
      ctx.clearRect(
        0,
        0,
        this.gridWidth * this.dateNum,
        this.gridHeight * this.taskNum
      );
      ctx.font = "18px Courier New"; // 文字
      ctx.strokeStyle = "#333"; //
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let num = 0;
      this.lineArr[0].projectList.forEach((item1, index1) => {
        item1.task.forEach((item2, index2) => {
          item2.state.forEach((item3, index3) => {
            ctx.rect(
              this.gridWidth * index3,
              this.gridHeight * num,
              this.gridWidth,
              this.gridHeight
            );
            if (item3 == 1) ctx.fillStyle = "green";
            else {
              ctx.fillStyle = "white";
            }
            ctx.fillRect(
              this.gridWidth * index3,
              this.gridHeight * num,
              this.gridWidth,
              this.gridHeight
            );
          });

          num++;
        });
      });
      ctx.stroke();
    },
    // 处理时间
    dealTime(a, b) {
      let start = a;
      let end = b;
      let bd = new Date(start),
        be = new Date(end);
      let bd_time = bd.getTime(),
        be_time = be.getTime(),
        time_diff = be_time - bd_time;
      this.dateList = [];
      for (let i = 0; i <= time_diff; i += 86400000) {
        let ds = new Date(bd_time + i);
        let flag = 0;
        for (let j = 0; j < this.dateList.length; j++) {
          if (
            this.dateList[j].value ==
            ds.getFullYear() + "/" + (ds.getMonth() + 1)
          ) {
            this.dateList[j].children.push(ds.getDate());
            flag = 1;
          }
        }
        if (!flag) {
          this.dateList.push({
            value: ds.getFullYear() + "/" + (ds.getMonth() + 1),
            children: [ds.getDate()]
          });
        }
      }
      this.drawCol();
      this.drawCol();
      this.drawContent();
    }
  }
};
</script>

<style lang="less" scoped>
.selectBox {
  margin-bottom: 30px;
  .el-select {
    margin-right: 28px;
  }
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .left {
    .title {
      width: 360px;
      height: 61px;
      display: flex;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90px;
        height: 60px;
        border: 1px solid #333;
        &:last-child {
          width: 180px;
        }
      }
    }
    .col {
      overflow: hidden;
    }
  }

  .right {
    width: calc(100% - 360px);
    .row {
      height: 61px;
      overflow: hidden;
    }
    .content {
      height: 300px;
      overflow: auto;
    }
  }
}

.row::-webkit-scrollbar {
  display: none;
}
.col::-webkit-scrollbar {
  display: none;
}
.content::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.content::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
  opacity: 0.5;
}
</style>
