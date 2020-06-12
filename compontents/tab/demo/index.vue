<template>
  <div>
    <ul>
      <li>a</li>
      <li>标签</li>
      <li>标签</li>
      <li>d</li>
      <li>aaaaaa</li>
      <li>b</li>
      <li>c</li>
      <li>d</li>
    </ul>
  </div>
</template>
<script>
export default {

};
</script>
<style scoped>
div {
  padding:0 20px;
}

ul {
  padding: 10px 0;
  display:flex;
  overflow: auto;
}
ul::-webkit-scrollbar {
 display: none;
}
li {
  padding: 0 20px;
  margin-right:10px;
  flex-shrink: 0;
  line-height: 25px;
  font-size:12px;
  text-align: center;
  list-style: none;
  background: #ddd;
  border-radius: 10px;;
}
li:last-child{
  margin-right:0;
}
</style>
