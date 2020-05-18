<template>
  <div>
    <h2>属性</h2>
    <test text="属性"/>
    
    <h2>插槽</h2>
    <test>插槽</test>

    <h2>属性/插槽同时使用</h2>
    <test text="属性">插槽</test>
  </div>
</template>

<script>
import test from '../test.vue';
export default {
  components:{test}
}
</script>

<style scoped>

</style>