<template>
  <div class="demo-page">
    <h1> Picker </h1>
    <v-picker></v-picker>
  </div>
</template>
<script>
import vPicker from '../picker.vue'
export default {
  components:{vPicker},
  data(){
    return {
      valueDefault: false,
      valueSlot: false,
      valueDuration:false,
      valueBackground: false,
      valueZIndex: false
    }
  }
}
</script>
<style scoped>
.content {
  height: 1200px;
  padding: 100px 0;
  text-align: center;
  background: red;
  background-image: linear-gradient(#fff, #aaa);
}

.z-p-top,.z-p-bottom{
  position: fixed;
  left:20px; 
  right:20px;
  height: 50px;
  line-height: 50px;
  text-align: center;;
  color:#fff;
  background:red;
  border-radius:10px;
}
.z-p-top {
  z-index: 110;
  top:100px;
}
.z-p-bottom {
  z-index: 90;
  top:180px;
}
</style>