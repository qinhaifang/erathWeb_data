<template>
  <div class="title">
    {{title}}
  </div>
</template>
<script>
export default {
  props:["title"]
}
</script>
<style scoped>
  .title{
    height: 50px;
    line-height: 40px;
    padding-left: 15px;
    background: url('../assets/titleBackground.svg');
    background-repeat: no-repeat;
    background-size: cover;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
  }
</style>