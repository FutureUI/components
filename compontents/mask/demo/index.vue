<template>
  <div class="demo-page">
    <h1> Mask </h1>
    <div class="demo-btn">
      <a href="javascript:void(0)"  @click="valueDefault =true">默认</a>
      <p>default</p>
    </div>

    <v-mask v-model="valueDefault"></v-mask>

    <div class="demo-btn">
      <a href="javascript:void(0)"  @click="valueSlot =true">插槽</a>
      <p>slot</p>
    </div>

    <v-mask v-model="valueSlot">
      <div
        style="
          margin: 100px auto;
          width: 80%;
          line-height: 30px;
          color:#fff;
          background: rgba(0,0,0,.3);
        "
      >
        <pre>
      margin: 100px auto;
      width: 100px;
      line-height: 30px;
      color:#fff;
      background: rgba(0,0,0,.3);</pre>
      </div>
    </v-mask>
    
    <div class="demo-btn">
      <a href="javascript:void(0)"  @click="valueDuration =true">动画时长</a>
      <p>duration="0"</p>
    </div>

    <v-mask v-model="valueDuration" duration="0"></v-mask>

    <div class="demo-btn">
      <a href="javascript:void(0)"  @click="valueBackground =true">自定义背景</a>
      <p>background="rgba(222,12,12,.3)"</p>
    </div>

    <v-mask v-model="valueBackground" background="rgba(222,12,12,.3)"></v-mask>

    <div class="demo-btn">
      <a href="javascript:void(0)"  @click="valueZIndex =true">z-index</a>
      <p>z-index="100"</p>
    </div>

    <v-mask v-model="valueZIndex" zIndex="100"></v-mask>
    <p class="z-p-top" v-show="valueZIndex">z-index:110</p>
    <p class="z-p-bottom" v-show="valueZIndex">z-index:90</p>
  </div>
</template>
<script>
import vMask from '../mask.vue'
export default {
  components:{vMask},
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