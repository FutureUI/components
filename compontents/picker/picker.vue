<template>
  <div ref="wrapper">
    <ul ref="ul" :style="ulStyle" @transitionend="onTransitionEnd">
      <li>0</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
      <li>21</li>
      <li>22</li>
      <li>23</li>
    </ul>
    <b></b>
  </div>
</template>
<script>


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


export default {
  data() {
    return {
      wrapperHeight: 0, // 容器高
      itemHeight: 0, // 行高
      count: 0, //  数量
      baseOffset: 0, // 中心位置偏移量

      offset: 0, // 实际偏移量

      duration: 200, // 动画时长
      /**
       * 拖拽偏移量
       */
      startX: 0,
      startY: 0,
      deltaX: 0,
      deltaY: 0,
      offsetX: 0,
      offsetY: 0,
      /**
       * 是否在移动
       */
      moving: false,
      startOffset: 0, // 滑动的开始位置
      touchStartTime: 0, // 开始时间
      /**
       * 快速移动
       */
      swipeDuration: 1000,
    };
  },
  computed: {
    ulStyle() {
      return {
        transform: `translate3d(0, ${this.offset + this.baseOffset}px, 0)`,
        transitionDuration: `${this.duration}ms`,
        transitionProperty: this.duration ? 'all' : 'none',
      };
    },
  },
  mounted() {
    // 初始化变量
    this.wrapperHeight = Number(window.getComputedStyle(this.$refs.wrapper).height.replace('px', ''));
    this.count = Number(this.$refs.ul.querySelectorAll('li').length);
    this.itemHeight = Number(window.getComputedStyle(this.$refs.ul.childNodes[0]).height.replace('px', ''));
    this.baseOffset = (this.wrapperHeight - this.itemHeight) / 2;
    // 绑定事件
    this.bind();

    // 初始化位置
    this.setIndex(0);
  },
  methods: {
    onTouchStart(e) {
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
      // this.transitionEndTrigger = null;
      this.touchStartTime = Date.now();
      this.momentumOffset = this.startOffset;
    },
    onTouchMove(e) {
      const touch = e.touches[0];
      this.deltaX = touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY);

      this.moving = true;
      // preventDefault(event, true);
      e.preventDefault();
      e.stopPropagation();

      this.offset = range(
        this.startOffset + this.deltaY,
        -(this.count * this.itemHeight),
        this.itemHeight,
      );

      const now = Date.now();
      // console.log(now,this.touchStartTime,now-this.touchStartTime)
      if (now - this.touchStartTime > MOMENTUM_LIMIT_TIME) {
        this.touchStartTime = now;
        this.momentumOffset = this.offset;
      }
    },
    onTouchEnd() {
      const distance = this.offset - this.momentumOffset;
      const duration = Date.now() - this.touchStartTime;
      const allowMomentum = duration < MOMENTUM_LIMIT_TIME
        && Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE;

      if (allowMomentum) {
        this.momentum(distance, duration);
        return;
      }

      const index = this.getIndexByOffset(this.offset);
      this.duration = 200;
      this.setIndex(index, true);

      // compatible with desktop scenario
      // use setTimeout to skip the click event triggered after touchstart
      setTimeout(() => {
        this.moving = false;
      }, 0);
    },
    onTransitionEnd() {
      this.moving = false;
      this.duration = 0;
    },
    momentum(distance, duration) {
      const speed = Math.abs(distance / duration);

      const realDistance = this.offset + (speed / 0.003) * (distance < 0 ? -1 : 1);

      const index = this.getIndexByOffset(realDistance);

      this.duration = +this.swipeDuration;
      this.setIndex(index, true);
    },
    getIndexByOffset(offset) {
      return range(Math.round(-offset / this.itemHeight), 0, this.count - 1);
    },
    setIndex(index) {
      const realIndex = range(index, 0, this.count);
      const offset = -realIndex * this.itemHeight;

      this.offset = offset;
    },
    bind() {
      this.$el.addEventListener('touchstart', this.onTouchStart);
      this.$el.addEventListener('touchmove', this.onTouchMove);
      this.$el.addEventListener('touchend', this.onTouchEnd);
      this.$el.addEventListener('touchcancel', this.onTouchEnd);
    },
  },
};
</script>

<style scoped>
ul,
li {
  list-style: none;
}
div {
  position: relative;
  height: 300px;
  overflow: hidden;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.3);
}
li {
  height: 44px;
  line-height: 44px;
  font-size:14px;
  text-align: center;
}
b {
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 44px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  transform: translateY(-50%);
}
</style>
