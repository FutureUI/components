<template>
  <p>
    <slot>
      {{text}}
    </slot>
  </p>
</template>
<script>
export default {
  props:{
    text:{
      type:[String,Number],
      default:'demo'
    }
  },
  data(){
    return {}
  },
  methods:{
    
  }
}
</script>
<style scoped>

</style>