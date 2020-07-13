<template>
  <div class="container">
    <div class="title">组内项目任务视图</div>
    <groupCanvas class="groupCanvas"></groupCanvas>
  </div>

</template>

<script>
import groupCanvas from '../groupCanvas'
export default {
  components:{
    groupCanvas
  },

  created() {
  },
}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;

  .groupCanvas{
    width: 100%;
    height: 90%;
    border: 1px solid red;
  }
}

</style>