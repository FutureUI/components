# infinite 

检测容器是否滚动到底部。

``` vue
<template>
  <div class="content" style="overflow: auto;">
    <ul>
      <li>...</li>
      <li>...</li>
    </ul>
    <infinite @infinite="infinite"></infinite>
  </div>
</template>

<script>
export default {
  methods: {
    infinite() {
      console.log('滚动到地步了');
    },
  },
};
</script>
```