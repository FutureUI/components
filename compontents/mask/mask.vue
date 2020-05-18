<template>
  <transition 
    name="fade" 
  >
    <div 
      class="mask" 
      :style="style"
      @click="clickMaskHandler" 
      v-show="value">
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
    autoClose:{
      type:Boolean,
      default: true,
    },
    zIndex: {
      type:[Number,String],
      default:'1'
    },
    duration:{
      type:[Number,String],
      default: '.3'
    },
    background: {
      type:[String],
      default: 'rgba(0,0,0,.3)'
    }
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
        this.isVisible = true;
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
<style>
.overflow-hidden {
  overflow: hidden !important;
}


.fade-enter-active {
  animation: .3s fade-in both ease-out;
}

.fade-leave-active {
  animation: .3s fade-out both ease-in;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>
<style scoped>
.mask {
  position: fixed;
  z-index:0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
}
.content {
  position: relative;
}
</style>