<template>
  <transition name="fade">
    <div class="popup" :style="style" v-show="value">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
export default {
  props:{
    value:{
      type:Boolean,
      default:false
    },
    
  },
  data(){
    return {
    }
  },
  computed: {
    style(){
      const style = {
        zIndex: `${this.zIndex}`,
        background:`${this.background}`,
        animationDuration:`${this.duration}s`
      }
      return style;
    }
  },
  watch:{
    value(val){
      if(Boolean(val)) {
        this.open()
      }
      else this.close();
    }
  },
  methods:{
    open(){
      document.body.classList.add('overflow-hidden');
      this.$emit('input',true)
    },

    close(){
      document.body.classList.remove('overflow-hidden');
      this.$emit('input',false)
    },

    clickMaskHandler(e){
      if(this.autoClose){
        this.close();
      }
    },
  }
}
</script>
<style  scoped>
.popup {
  position: fixed;
  top:50%;
  left:50%;
  
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>