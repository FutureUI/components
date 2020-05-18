<template>
  <div>
    <ul ref="ul" :style="ulStyle">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
    <b></b>
  </div>
</template>
<script>

const DEFAULT_DURATION = 200;

const MOMENTUM_LIMIT_TIME = 300;
const MOMENTUM_LIMIT_DISTANCE = 15;

function getElementTranslateY(element) {
  const style = window.getComputedStyle(element);
  const transform = style.transform || style.webkitTransform;
  const translateY = transform.slice(7, transform.length - 1).split(', ')[5];

  return Number(translateY);
}
function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function isOptionDisabled(option) {
  return isObject(option) && option.disabled;
}
function isObject(val) {
  return val !== null && typeof val === 'object';
}


export default {
  data(){
    return {
      offset:0,
      itemHeight: 50,
      count: 4,
      duration: DEFAULT_DURATION,
      options:[{},{},{},{}],
      /**
       * 拖拽偏移量
       */
      startX:0,
      startY:0,
      deltaX:0,
      deltaY:0,
      offsetX:0,
      offsetY: 0
    }
  },
  computed:{
    baseOffset() {
      return (this.itemHeight * (4 - 1)) / 2;
    },
    ulStyle () {
      return {
        transform: `translate3d(0, ${this.offset + this.baseOffset}px, 0)`,
        transitionDuration: `${this.duration}ms`,
        transitionProperty: this.duration ? 'all' : 'none',
        lineHeight: `${this.itemHeight}px`,
      }
    }
  },
  mounted(){
    this.bind();
    this.setIndex(0);
  },
  methods:{
    onTouchStart(e){
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;

      if (this.moving) {
        const translateY = getElementTranslateY(this.$refs.ul);
        this.offset = Math.min(0, translateY - this.baseOffset);
        this.startOffset = this.offset;
      } else {
        this.startOffset = this.offset;
      }

      this.duration = 0;
      this.transitionEndTrigger = null;
      this.touchStartTime = Date.now();
      this.momentumOffset = this.startOffset;

    },
    onTouchMove(e){
      const touch = e.touches[0];
      this.deltaX = touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY);

      this.moving = true;
      // preventDefault(event, true);
      
      this.offset = range(
        this.startOffset + this.deltaY,
        -(this.count * this.itemHeight),
        this.itemHeight
      );

      const now = Date.now();
      if (now - this.touchStartTime > MOMENTUM_LIMIT_TIME) {
        this.touchStartTime = now;
        this.momentumOffset = this.offset;
      }
    },
    onTouchEnd(e){
      const distance = this.offset - this.momentumOffset;
      const duration = Date.now() - this.touchStartTime;
      const allowMomentum =
        duration < MOMENTUM_LIMIT_TIME &&
        Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE;

      if (allowMomentum) {
        this.momentum(distance, duration);
        return;
      }

      const index = this.getIndexByOffset(this.offset);
      this.duration = DEFAULT_DURATION;
      this.setIndex(index, true);

      // compatible with desktop scenario
      // use setTimeout to skip the click event triggered after touchstart
      setTimeout(() => {
        this.moving = false;
      }, 0);
    },
    momentum(distance, duration) {
      const speed = Math.abs(distance / duration);

      distance = this.offset + (speed / 0.003) * (distance < 0 ? -1 : 1);

      const index = this.getIndexByOffset(distance);

      this.duration = +this.swipeDuration;
      this.setIndex(index, true);
    },
     getIndexByOffset(offset) {
      return range(Math.round(-offset / this.itemHeight), 0, this.count - 1);
    },
    setIndex(index, emitChange) {
      index = this.adjustIndex(index) || 0;

      const offset = -index * this.itemHeight;

      // const trigger = () => {
      //   if (index !== this.currentIndex) {
      //     this.currentIndex = index;

      //     if (emitChange) {
      //       this.$emit('change', index);
      //     }
      //   }
      // };

      // // trigger the change event after transitionend when moving
      // if (this.moving && offset !== this.offset) {
      //   this.transitionEndTrigger = trigger;
      // } else {
      //   trigger();
      // }

      this.offset = offset;
    },
    adjustIndex(index) {
      index = range(index, 0, this.count);

      for (let i = index; i < this.count; i++) {
        if (!isOptionDisabled(this.options[i])) return i;
      }

      for (let i = index - 1; i >= 0; i--) {
        if (!isOptionDisabled(this.options[i])) return i;
      }
    },
    bind(){
      this.$el.addEventListener( 'touchstart', this.onTouchStart);
      this.$el.addEventListener( 'touchmove',this.onTouchMove);
      this.$el.addEventListener( 'touchend', this.onTouchEnd);
      this.$el.addEventListener('touchcancel',this.onTouchEnd);
    }
  }
}
</script>

<style scoped>
ul,
li {
  list-style: none;
}
div {
  position:relative;
  height: 250px;
  overflow: hidden;
  border: 1px solid #ddd;
}
li {
  height: 50px;
  line-height: 50px;
  text-align: center;
}
b {
  display: block;
  position: absolute;
  top:50%;
  left:0;
  right:0;
  height: 50px;
  border-top:1px solid #ddd;
  border-bottom:1px solid #ddd;
  transform: translateY(-50%);
}
</style>