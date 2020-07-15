<template>
  <div class="container">
      <canvas id="leftCanvas"></canvas>
      <canvas id="rightCanvas"></canvas>
      <canvas id="contentCanvas"></canvas>
  </div>
</template>
  
<script>

export default {
  data() {
    return {
      groupNameSize: {
        width: 80,
        height: 440,
      },
      projectTitleSize: {
        width: 80,
        height: 80,
      },
      projectNameSize: {
        width: 80,
        height: 120,
      },
      taskTitleSize: {
        width: 80,
        height: 80,          
      },
      tasknameSize: {
        width: 80,
        height: 40,
      },
      contentSize: {
        width: 80,
        height: 40,
      },
      groupData: [{
        groupName: 'group1',
        project: [
        {
          projectName: 'project1',
          task:[
          {
            taskId: '1',
            taskName: 'task1'
          },{
            taskId: '2',
            taskName: 'task2'
          },{
            taskId: '3',
            taskName: 'task3'
          }]
        },{
          projectName: 'project2',
          task:[
          {
            taskId: '4',
            taskName: 'task4'
          },{
            taskId: '5',
            taskName: 'task5'
          },{
            taskId: '6',
            taskName: 'task6'
          }]
        },{
          projectName: 'project3',
          task:[
          {
            taskId: '7',
            taskName: 'task7'
          },{
            taskId: '8',
            taskName: 'task8'
          },{
            taskId: '9',
            taskName: 'task9'
          }]
        }],
        taskInfo:[{
          taskId:'1',
          taskName:'task1',
          timeStatus: [0,0,1,1,1,1,0,0,0,0]
        },{
          taskId:'2',
          taskName:'task2',
          timeStatus: [0,0,1,1,1,1,0,0,0,0]
        },{
          taskId:'3',
          taskName:'task3',
          timeStatus: [0,0,1,1,1,1,0,0,0,0]
        },{
          taskId:'4',
          taskName:'task4',
          timeStatus: [0,0,1,1,1,1,0,0,0,0]
        },{
          taskId:'5',
          taskName:'task5',
          timeStatus: [0,0,1,1,1,1,0,0,0,0]
        },{
          taskId:'6',
          taskName:'task6',
          timeStatus: [0,0,1,1,1,1,0,0,0,0]
        },{
          taskId:'7',
          taskName:'task7',
          timeStatus: [0,0,1,1,1,1,0,0,0,0]
        },{
          taskId:'8',
          taskName:'task8',
          timeStatus: [0,0,1,1,1,1,0,0,0,0]
        },{
          taskId:'9',
          taskName:'task9',
          timeStatus: [0,0,1,1,1,1,0,0,0,0]
        }],
        timeData: [{
          name: '九月',
          list: [25,26,27,28,29,30]
        },{
          name: '十月',
          list: [1,2,3,4]
        }]
      }]
    }
  },

  mounted() {
    this.leftCanvasFn();
    this.rightCanvasFn();
    this.contentCanvas();
  },
  
  methods: {
    leftCanvasFn() {
      //找到canvas
      let cas = document.getElementById('leftCanvas'); 
      //动态设置canvas画布的宽高
      cas.width = this.groupNameSize.width + this.projectNameSize.width + this.tasknameSize.width;
      cas.height =  this.groupNameSize.height * this.groupData.length;
      //拿到canvas绘图上下文
      let ctx = cas.getContext('2d')
      ctx.font = '14px Courier New'
      ctx.strokeStyle = 'grey'; // 轮廓的颜色
      this.LeftContent(ctx)
    },

    LeftContent(ctx) {
      //组信息列
      this.groupData.map( item=> {
        ctx.rect(0, 0, this.groupNameSize.width, this.groupNameSize.height);
        ctx.fillStyle = 'black';
        ctx.fillText (item.groupName, 0, this.groupNameSize.height/2);         
      })

      //项目名称列
      ctx.rect(this.groupNameSize.width, 0, this.projectTitleSize.width, this.projectTitleSize.height);
      ctx.fillStyle = 'black';
      ctx.fillText("项目", this.projectTitleSize.width/2+this.groupNameSize.width-15, this.projectTitleSize.height/2);
      this.groupData.map(item=>{
        let posX = this.groupNameSize.width, posY = this.projectTitleSize.height;
        item.project.map(pro=>{
          ctx.rect(posX, posY, this.projectNameSize.width, this.projectNameSize.height);
          ctx.fillStyle = 'black';
          ctx.fillText(pro.projectName, posX , posY + this.projectNameSize.height/2);
          posY += this.projectNameSize.height;
        })
      })
  
      //任务名称列
      let taskTempX = this.groupNameSize.width + this.projectNameSize.width;
      ctx.rect(taskTempX, 0, this.taskTitleSize.width, this.taskTitleSize.height);
      ctx.fillStyle = 'black';
      ctx.fillText("项目", taskTempX + this.taskTitleSize.width/2-15, this.taskTitleSize.height/2);

      this.groupData.map(item=>{
        let posX = this.groupNameSize.width + this.projectNameSize.width, posY = this.taskTitleSize.height;
        item.project.map(pro=>{
          for(let i = 0; i < pro.task.length; i++){
            ctx.rect(posX, posY, this.tasknameSize.width, this.tasknameSize.height);
            ctx.fillStyle = 'black';
            ctx.fillText(pro.task[i].taskName, posX, posY + this.tasknameSize.height/2); 
            posY += this.tasknameSize.height;           
          }
        })
      })      
      ctx.stroke()
    },

    rightCanvasFn() {
      //找到canvas
      let cas = document.getElementById('rightCanvas'); 
      //动态设置canvas画布的宽高
      let width = 0, height = 0;
      this.groupData.map(item=>{
        item.timeData.map(data => {
          width += data.list.length * this.contentSize.width;
        })
        height += this.contentSize.height*2;
      })
      cas.width = width;
      cas.height = height;
      //拿到canvas绘图上下文
      let ctx = cas.getContext('2d')
      ctx.font = '14px Courier New'
      ctx.strokeStyle = 'grey';// 轮廓的颜色
      this.rightContent(ctx)     
    },

    rightContent(ctx) {
      this.groupData.map(item=>{
        let posX = 0;
        //绘制月份
        item.timeData.map(month=>{
          let width = month.list.length * this.contentSize.width;
          ctx.rect(posX, 0, width, this.contentSize.height);
          ctx.fillStyle = 'black';
          ctx.fillText(month.name, posX + width/2-20, this.contentSize.height/2);
          posX += width;
        })
        //绘制号
        let dayPosX = 0, dayPosY = this.contentSize.height;
        this.groupData[0].timeData.map(month=>{
          for(let i of month.list){
            ctx.rect(dayPosX, dayPosY, this.contentSize.width, this.contentSize.height);
            ctx.fillStyle = 'black';
            ctx.fillText(i+'', dayPosX,  dayPosY + this.contentSize.height/2);
            dayPosX += this.contentSize.width;
          }
        })
      })
      ctx.stroke();
    },

    contentCanvas() {
       //找到canvas
      let cas = document.getElementById('contentCanvas'); 
      //动态设置canvas画布的宽高
      cas.width = this.groupData[0].taskInfo[0].timeStatus.length * this.contentSize.width;
      cas.height =  this.groupData[0].taskInfo.length *this.contentSize.height;
      //拿到canvas绘图上下文
      let ctx = cas.getContext('2d')
      ctx.font = '14px Courier New'
      ctx.strokeStyle = 'grey'; // 轮廓的颜色
      this.conContent(ctx)
    },

    conContent(ctx) {
      this.groupData.map(item=>{
        let posX = 0, posY = 0;
        for(let info of item.taskInfo){
          for(let status of info.timeStatus){
            ctx.rect(posX, posY, this.contentSize.width, this.contentSize.height);
            ctx.fillStyle = 'black';
            ctx.fillText(status+'', posX, posY + this.contentSize.height/2);
            posX += this.contentSize.width;
          }
          posX = 0, posY += this.contentSize.height;
        }
      });
      ctx.stroke();
    }
  },


}
</script>
  
<style lang="less" scoped>
  .container{
    width: 100%;
    height: 100%;
    #leftCanvas{
      float: left;
    }
    #rightCanvas{
      float: left;
    }
    #contentCanvas{
      float:left;
    }
  }
</style>
