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
    line-height: 39px;
    padding-left: 15px;
    background: url('../assets/titleBackground.svg');
    background-repeat: no-repeat;
    background-size: cover;
    /* width: 80%;
    padding: 10px; */
  }
</style>