<template>
  <div class="demo-page">
    <h1> Popup </h1>
    <div class="demo-btn">
      <a href="javascript:void(0)"  @click="valueDefault =true">默认</a>
      <p>default</p>
    </div>
    <v-popup v-model="valueDefault">
      <p>content</p>
    </v-popup>
  </div>
</template>
<script>
import vPopup from '../popup.vue'
export default {
  components:{vPopup},
  data(){
    return {
      valueDefault: true,
      valueSlot: false,
      valueDuration:false,
      valueBackground: false,
      valueZIndex: false
    }
  }
}
</script>
<style scoped>

</style>