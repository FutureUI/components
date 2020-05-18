<template>
  <div class="page">
    <header>
      <router-link :to="{path:'/'}">HOME</router-link>
    </header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    back(){
      // history.go(-1)
    }
  }
}
</script>

<style>
header {
  position: fixed;
  z-index: 1;
  top:0;
  left:0;
  right:0;
  height: 60px;
  line-height: 60px;
  text-align: center;;
  background:#f1f1f1;
  border-bottom:1px solid #ddd;
}
header a {
  padding: 0 10px;
  display: block;
  float:left;
  border-right: 1px solid #ddd;
}
.content {
  position: fixed;
  z-index: 0;
  top:60px;
  left:0;
  right:0;
  bottom:0;
}
</style>