<template>
  <ul>
    <li v-for="(item,i) in componentNames" :key="i">
      <router-link :to="{name:item}">{{item}}</router-link>
    </li>
  </ul>
</template>

<script>
import componentNames from '../config';
export default {
  data(){
    return {
      componentNames
    }
  },
  mounted(){}
}
</script>
<style scoped>
ul {
  padding: 20px;
}
li {
  padding: 5px 0;
  list-style: none;;
}
li a {
  display:block;
  height: 40px;
  line-height: 40px;
  color: #08c;
  font-weight: bold;
  text-align:center;
  text-decoration: none;
  background:#f1f1f1;
  border-radius: 4px;
}
</style>