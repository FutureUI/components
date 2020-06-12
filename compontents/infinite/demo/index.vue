<template>
  <div class="demo-page">
    <h2>滚动到底部</h2>
    <div class="content">
      <ul>
        <li v-for="(item,i) in list" :key="i">line: {{i+1}}</li>
      </ul>

      <span v-if="status === 'loading'">loading</span>
      <span v-if="status === 'nothing'">nothing</span>
      <span v-if="status === 'all'">no more</span>
      <span v-if="status === 'error'">error</span>

      <infinite @infinite="infinite"></infinite>
    </div>
  </div>
</template>
<script>
import Infinite from '../infinite.vue';

export default {
  components: { Infinite },
  data() {
    return {
      status: 'ready', // ready loading nothing all error
      list: [],
    };
  },
  mounted() {
    this.infinite();
  },
  methods: {
    infinite() {
      if (this.status === 'ready') {
        this.status = 'loading';
        this.fetch().then((res) => {
          this.list.push(...res);
          if (!this.list.length) this.status = 'nothing';
          else if (!res.length || this.list.length >= 12) this.status = 'all';
          else this.status = 'ready';
        }).catch(() => {
          this.status = 'error';
        });
      }
    },
    fetch() {
      return new Promise((reslove) => {
        setTimeout(() => {
          const res = [];
          for (let i = 0; i < 5; i += 1)res.push(parseInt(Math.random() * 10000, 10));
          reslove(res);
        }, 2000);
      });
    },
    fetchNothing() {
      return new Promise((reslove) => {
        setTimeout(() => {
          reslove([]);
        }, 1000);
      });
    },
    fetchError() {
      return new Promise((reslove, reject) => {
        setTimeout(() => {
          reject();
        }, 1000);
      });
    },
  },
};
</script>
<style scoped>
.content {
  width: 100%;
  height: 200px;
  margin: 100px auto;
  border: 3px solid #aaa;
  overflow: auto;
}
li {
  height: 50px;
  padding: 0 20px;
  line-height: 50px;
  text-align: left;
}
span {
  display:block;
  line-height: 50px;
  text-align: center;;
}
</style>
