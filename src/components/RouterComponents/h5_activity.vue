<template>
  <div id="scrollBox" ref="scrollBox">
    <div class="page">
      <img src="../../externals/h5_activity/1.jpg" alt onclick="return false">
      <img src="../../externals/h5_activity/2.jpg" alt onclick="return false">

      <div class="animateBox1" ref="animateBox1">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/h5_activity/3.png"
            alt
            onclick="return false"
            v-show="animateBox1"
          >
        </transition>
      </div>
      <div class="animateViewPort" ref="animateViewPort1" v-show="!animateBox1"></div>

      <div class="animateBox2" ref="animateBox2">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/h5_activity/3.5.jpg"
            alt
            onclick="return false"
            v-show="animateBox2"
          >
        </transition>
      </div>
      <div class="animateViewPort" ref="animateViewPort2" v-show="!animateBox2"></div>

      <div class="animateBox3" ref="animateBox3">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/h5_activity/4.jpg"
            alt
            onclick="return false"
            v-show="animateBox3"
          >
        </transition>
      </div>
      <div class="animateViewPort" ref="animateViewPort3" v-show="!animateBox3"></div>

      <div class="animateBox4" ref="animateBox4">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/h5_activity/5.jpg"
            alt
            onclick="return false"
            v-show="animateBox4"
          >
        </transition>
      </div>
      <div class="animateViewPort" ref="animateViewPort4" v-show="!animateBox4"></div>

      <div class="animateBox5" ref="animateBox5">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/h5_activity/6.jpg"
            alt
            onclick="return false"
            v-show="animateBox5"
          >
        </transition>
      </div>
      <div class="animateViewPort" ref="animateViewPort5" v-show="!animateBox5"></div>

      <div class="animateBox6" ref="animateBox6">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/h5_activity/7.jpg"
            alt
            onclick="return false"
            v-show="animateBox6"
          >
        </transition>
      </div>
      <div class="animateViewPort" ref="animateViewPort6" v-show="!animateBox6"></div>

      <img
        src="../../externals/h5_activity/8.png"
        alt
        onclick="return false"
        style="margin-top:4.6rem;"
      >

      <div class="animateBox7" ref="animateBox7">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/h5_activity/9.png"
            alt
            onclick="return false"
            v-show="animateBox7"
          >
        </transition>
      </div>
      <div class="animateViewPort" ref="animateViewPort7" v-show="!animateBox7"></div>

      <div class="animateBox8" ref="animateBox8">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/h5_activity/10.png"
            alt
            onclick="return false"
            v-show="animateBox8"
          >
        </transition>
      </div>
      <div class="animateViewPort" ref="animateViewPort8" v-show="!animateBox8"></div>

      <div class="animateBox9" ref="animateBox9">
        <router-link to="/home/new">
          <transition name="myzoomUp" mode="out-in">
            <img src="../../externals/h5_activity/11.png" alt v-show="animateBox9">
          </transition>
        </router-link>
      </div>
      <div class="animateViewPort" ref="animateViewPort9" v-show="!animateBox9"></div>

      <router-link to="/index/content_operate">
        <img src="../../externals/h5_activity/12.jpg" alt>
      </router-link>
    </div>
  </div>
</template>

<script>
import inViewport from "in-viewport";
export default {
  data() {
    return {
      animateBox1: false,
      animateBox2: false,
      animateBox3: false,
      animateBox4: false,
      animateBox5: false,
      animateBox6: false,
      animateBox7: false,
      animateBox8: false,
      animateBox9: false
    };
  },
  mounted() {
     this.wxMyReady({
      title: "有条企服-h5活动",
      desc: '万千方案，哪一个会是您的心头好?'
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
      }
    },
    scrollW() {
      this.animate("animateViewPort1", "animateBox1");
      this.animate("animateViewPort2", "animateBox2");
      this.animate("animateViewPort3", "animateBox3");
      this.animate("animateViewPort4", "animateBox4");
      this.animate("animateViewPort5", "animateBox5");
      this.animate("animateViewPort6", "animateBox6");
      this.animate("animateViewPort7", "animateBox7");
      this.animate("animateViewPort8", "animateBox8");
      this.animate("animateViewPort9", "animateBox9");
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

.animateBox1 {
  width: 100%;
  height: 13rem;
}
.animateBox2 {
  height: 13.5rem;
  width: 100%;
}

.animateBox3 {
  height: 13.5rem;
  width: 100%;
}

.animateBox4 {
  height: 13.5rem;
  width: 100%;
}

.animateBox5 {
  height: 13.5rem;
  width: 100%;
}

.animateBox6 {
  height: 13.5rem;
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

img {
  height: 100%;
}
</style>