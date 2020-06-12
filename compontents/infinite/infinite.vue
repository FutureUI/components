<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>


export default {
  data() {
    return {
      container: '',
      handler: null,
    };
  },
  props: {
    distance: {
      type: [Number],
      default: 100,
    },
  },
  mounted() {
    this.container = this.getContainer();
    this.handler = this.throttle(this.judge, 300);
    this.container.addEventListener('scroll', this.handler);
  },
  destroyed() {
    this.container.removeEventListener('scroll', this.handler);
  },
  methods: {
    throttle(func, delay) {
      let timer = null;
      let startTime = Date.now();
      return (...args) => {
        const curTime = Date.now();
        const remaining = delay - (curTime - startTime);
        const context = this;
        clearTimeout(timer);
        if (remaining <= 0) {
          func.apply(context, args);
          startTime = Date.now();
        } else {
          timer = setTimeout(func, remaining);
        }
      };
    },
    judge() {
      if (this.getCurrentDistance() < this.distance) {
        this.$emit('infinite');
      }
    },
    getContainer(el = this.$el) {
      let result;
      if (!result) {
        if (el.tagName === 'BODY') {
          result = window;
        } else if (
          ['scroll', 'auto'].indexOf(getComputedStyle(el).overflowY) > -1
        ) {
          result = el;
        }
      }
      return result || this.getContainer(el.parentNode);
    },
    getCurrentDistance() {
      const elTop = this.$el.getBoundingClientRect().top;
      const containerTop = this.container === window
        ? window.innerHeight
        : this.container.getBoundingClientRect().bottom;
      const distance = elTop - containerTop;
      return distance;
    },
  },
};
</script>
<style  scoped>
div {
  min-height: 1px;
}
</style>
