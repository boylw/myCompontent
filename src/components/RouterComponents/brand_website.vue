<template>
  <div id="scrollBox" ref="scrollBox">
    <div class="page">
      <img src="../../externals/brand_website/1.jpg" alt onclick="return false">
      <div class="emptyBox2" ref="emptyBox2"></div>
      <div class="animateBox2" ref="animateBox2">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/brand_website/2.png"
            alt
            onclick="return false"
            v-show="animateBox2"
          >
        </transition>
        <div class="animateViewPort" ref="animateViewPort2"></div>
      </div>
      <div class="emptyBox3"></div>
      <img src="../../externals/brand_website/3.jpg" alt onclick="return false">
      <div class="animateBox3" ref="animateBox3">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/brand_website/4.png"
            alt
            onclick="return false"
            v-show="animateBox3"
          >
        </transition>
        <div class="animateViewPort" ref="animateViewPort3"></div>
      </div>
      <img src="../../externals/brand_website/5.jpg" alt onclick="return false">
      <div class="animateBox4" ref="animateBox4">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/brand_website/6.png"
            alt
            onclick="return false"
            v-show="animateBox4"
          >
        </transition>
      </div>
      <div class="animateViewPort" ref="animateViewPort4"></div>
      <div class="animateBox5" ref="animateBox5">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/brand_website/7.png"
            alt
            onclick="return false"
            v-show="animateBox5"
          >
        </transition>
        <div class="animateViewPort" ref="animateViewPort5"></div>
      </div>
      <div class="animateBox6" ref="animateBox6">
        <router-link to="/home/new">
          <transition name="myzoomUp" mode="out-in">
            <img src="../../externals/brand_website/8.png" alt v-show="animateBox6">
          </transition>
        </router-link>
        <div class="animateViewPort" ref="animateViewPort6"></div>
      </div>
      <div class="emptyBox4"></div>
      <router-link to="/index/h5_activity">
        <img src="../../externals/brand_website/9.jpg" alt>
      </router-link>
    </div>
  </div>
</template>

<script>
import inViewport from "in-viewport";
export default {
  data() {
    return {
      animateBox2: false,
      animateBox3: false,
      animateBox4: false,
      animateBox5: false,
      animateBox6: false
    };
  },
  mounted() {
    this.wxMyReady({
      title: "有条企服-品牌官网",
      desc: '百分百服务，助力企业数字化转型'
    });
    window.addEventListener("scroll", this.scrollW);
    window.scrollTo(0, 0);
  },
  methods: {
    animate(viewPort, el) {
      let Dom = this.$refs[viewPort];
      const isInWiewprot = inViewport(Dom, { offset: -50, debounce: 300 });
      if (isInWiewprot) {
        this[el] = true;
      } else {
        this[el] = false;
      }
    },
    scrollW() {
      this.animate("animateViewPort2", "animateBox2");
      this.animate("animateViewPort3", "animateBox3");
      this.animate("animateViewPort4", "animateBox4");
      this.animate("animateViewPort5", "animateBox5");
      this.animate("animateViewPort6", "animateBox6");
    },
    stopDefaultProp() {
      return false;
    }
  }
};
</script>

<style lang="css" scoped>
.animateViewPort {
  width: 100%;
  height: 0.05rem;
}
#scrollBox {
  background: #fff;
}
.animateBox2 {
  height: 10rem;
  width: 100%;
}

.emptyBox2 {
  height: 1.5rem;
  width: 100%;
}

.emptyBox3 {
  height: 1rem;
}

.emptyBox4 {
  height: 2.5rem;
}

.animateBox3 {
  height: 9.7rem;
  width: 100%;
  background: #fff;
}

.animateBox4 {
  height: 6.8rem;
  width: 100%;
}

.animateBox5 {
  height: 4rem;
  width: 100%;
}

.animateBox6 {
  height: 9rem;
  width: 100%;
}

.animateBox7 {
  height: 7rem;
  width: 100%;
}

.animateBox8 {
  height: 2.75rem;
  width: 100%;
}

.animateBox9 {
  height: 12.5rem;
  width: 100%;
}

.delay {
  transition-delay: 500ms;
}
</style>