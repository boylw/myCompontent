<template>
  <div id="scrollBox" ref="scrollBox">
    <div class="page">
      <img src="../../externals/synthetical_platform/01.png" alt onclick="return false">
      <div class="pageTwo">
        <div class="animateBox1" ref="animateBox1">
          <img src="../../externals/synthetical_platform/2.png" alt onclick="return false" :key="1">
          <div class="animateViewPort" ref="animateViewPort2" v-show="!animateBox2"></div>
          <transition-group name="Myfade" mode="out-in" tag="div" class="min-empty">
            <img
              src="../../externals/synthetical_platform/3.png"
              alt
              onclick="return false"
              :key="1"
              v-show="animateBox2"
              class="img-center pa"
            >
            <img
              src="../../externals/synthetical_platform/4.png"
              alt
              onclick="return false"
              :key="2"
              v-show="animateBox2"
              class="img-left pa delayTwo"
            >
            <img
              src="../../externals/synthetical_platform/8.png"
              alt
              onclick="return false"
              :key="3"
              v-show="animateBox2"
              class="img-left-top pa delayThree"
            >
            <img
              src="../../externals/synthetical_platform/9.png"
              alt
              onclick="return false"
              :key="4"
              v-show="animateBox2"
              class="pa delayFour"
            >
            <img
              src="../../externals/synthetical_platform/7.png"
              alt
              onclick="return false"
              :key="5"
              v-show="animateBox2"
              class="img-left-top pa delayFive"
            >
            <img
              src="../../externals/synthetical_platform/5.png"
              alt
              onclick="return false"
              :key="6"
              v-show="animateBox2"
              class="img-left-top pa delaySix"
            >
            <img
              src="../../externals/synthetical_platform/10.png"
              alt
              onclick="return false"
              :key="7"
              v-show="animateBox2"
              class="img-left-top pa delaySeven"
            >
            <img
              src="../../externals/synthetical_platform/6.png"
              alt
              onclick="return false"
              :key="8"
              v-show="animateBox2"
              class="img-left-top pa delayNine"
            >
          </transition-group>
        </div>
      </div>
      <img src="../../externals/synthetical_platform/011.png" alt onclick="return false">

      <div class="groupBg3">
        <div class="animateBox3" ref="animateBox3">
          <transition name="myfadeup" mode="out-in">
            <img
              src="../../externals/synthetical_platform/12.png"
              alt
              onclick="return false"
              v-show="animateBox3"
            >
          </transition>
        </div>
        <div class="animateViewPort" ref="animateViewPort3" v-show="!animateBox3"></div>
        <img src="../../externals/synthetical_platform/013.png" alt onclick="return false">
      </div>

      <div class="animateBox4" ref="animateBox4">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/synthetical_platform/14.png"
            alt
            onclick="return false"
            v-show="animateBox4"
          >
        </transition>
      </div>
      <div class="animateViewPort" ref="animateViewPort4" v-show="!animateBox4"></div>
      <img
        src="../../externals/synthetical_platform/015.png"
        alt
        onclick="return false"
        style="margin-bottom:4rem;"
      >
      <div class="bottomPage">
        <div class="animateBox5" ref="animateBox5">
          <transition name="myfadeup" mode="out-in">
            <img
              src="../../externals/synthetical_platform/16.png"
              alt
              onclick="return false"
              v-show="animateBox5"
            >
          </transition>
        </div>
        <div class="animateViewPort" ref="animateViewPort5"></div>

        <div class="animateBox6" ref="animateBox6">
          <transition name="myfadeup" mode="out-in">
            <img
              src="../../externals/synthetical_platform/17.png"
              alt
              onclick="return false"
              v-show="animateBox6"
            >
          </transition>
        </div>
        <div class="animateViewPort" ref="animateViewPort6"></div>

        <div class="animateBox7" ref="animateBox7">
          <router-link to="/home/new">
            <transition name="myzoomUp" mode="out-in">
              <img src="../../externals/synthetical_platform/18.png" alt v-show="animateBox7">
            </transition>
          </router-link>
        </div>
        <div class="animateViewPort" ref="animateViewPort7"></div>
      </div>

      <div class="pr">
        <img src="../../externals/synthetical_platform/019.png" alt onclick="return false">
        <router-link to="/index/content_operate" tag="i" class="pa goPage0"></router-link>
        <router-link to="/index/member_system" tag="i" class="pa goPage1"></router-link>
        <router-link to="/index/big_data" tag="i" class="pa goPage2"></router-link>
      </div>
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
      animateBox7: false
    };
  },
  mounted() {
    wxMyRthis.wxMyReadyeady({
      title: "有条企服-综合平台",
      desc: '万千方案，哪一个会是您的心头好?'
    });
    window.addEventListener("scroll", this.scrollW);
    window.scrollTo(0, 0);
  },
  methods: {
    animate(viewPort, el) {
      let Dom = this.$refs[viewPort];
      const isInWiewprot = inViewport(Dom, { offset: -100, debounce: 300 });
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
    },
    stopDefaultProp() {
      return false;
    },
    delayAdd(el) {
      console.log("====================================");
      console.log(el);
      console.log("====================================");
    }
  }
};
</script>

<style lang="css" scoped>
.groupBg3 {
  min-height: 22.1rem;
  background: url("../../externals/synthetical_platform/013b.png") no-repeat
    center;
  background-size: cover;
  margin-top: 4rem;
}
.min-empty {
  min-height: 16.5rem;
  width: 100%;
  position: relative;
  background: #fff;
  margin-top: 3.75rem;
  margin-bottom: 2rem;
}

.pa {
  position: absolute;
}

.img-center {
  left: 50%;
  top: 50%;
  margin-left: -3.75rem;
  margin-top: -1.25rem;
  width: 7.5rem;
  height: 2.5rem;
}

.img-left {
  left: 20%;
  top: 40%;
  margin-left: -3.75rem;
  margin-top: -1.25rem;
  width: 7.5rem;
  height: 2.5rem;
}
.img-left-top {
  left: 40%;
  top: 20%;
  margin-left: -3.75rem;
  margin-top: -1.25rem;
  width: 5.7rem;
  height: 1.5rem;
}

.delay {
  -webkit-transition-delay: 300ms;
  transition-delay: 300ms;
}

.delayTwo {
  -webkit-transition-delay: 1600ms;
  transition-delay: 1600ms;
}

.delayThree {
  -webkit-transition-delay: 800ms;
  transition-delay: 800ms;
}

.delayFour {
  left: 70%;
  top: 25%;
  margin-left: -3.75rem;
  margin-top: -1.25rem;
  width: 5rem;
  height: 1.5rem;
  -webkit-transition-delay: 1000ms;
  transition-delay: 1000ms;
}

.delayFive {
  left: 78%;
  top: 52%;
  margin-left: -3.75rem;
  margin-top: -1.25rem;
  width: 10rem;
  height: 2.2rem;

  -webkit-transition-delay: 1400ms;
  transition-delay: 1400ms;
}

.delaySix {
  left: 70%;
  top: 80%;
  margin-left: -3.75rem;
  margin-top: -1.25rem;
  width: 10.5rem;
  height: 1.65rem;
  -webkit-transition-delay: 600ms;
  transition-delay: 600ms;
}

.delaySeven {
  left: 50%;
  top: 90%;
  margin-left: -3.75rem;
  margin-top: -1.25rem;
  width: 4.8rem;
  height: 1.5rem;
  -webkit-transition-delay: 1800ms;
  transition-delay: 1800ms;
}

.delayNine {
  left: 16%;
  top: 76%;
  margin-left: -3.75rem;
  margin-top: -1.25rem;
  width: 10.7rem;
  height: 1.8rem;
  -webkit-transition-delay: 1600ms;
  transition-delay: 1600ms;
}

.animateViewPort {
  width: 100%;
  height: 0.05rem;
}
#scrollBox {
  background: #fff;
}

.animateBox1 {
  width: 100%;
  background: #ffffff;
}
.animateBox2 {
  width: 100%;
}

.animateBox3 {
  width: 100%;
  min-height: 10.4rem;
}

.animateBox4 {
  width: 100%;
  min-height: 5.75rem;
}

.animateBox5 {
  width: 100%;
}

.animateBox6 {
  width: 100%;
}

.animateBox7 {
  width: 100%;
}

.bottomPage {
  min-height: 22rem;
}

.pr {
  position: relative;
}

.pa {
  position: absolute;
  z-index: 5;
}

.goPage0 {
  width: 9.5%;
  height: 20%;
  top: 48.8%;
  left: 20%;
}

.goPage1 {
  width: 9.5%;
  height: 20%;
  top: 48.8%;
  left: 45.3%;
}

.goPage2 {
  width: 9.5%;
  height: 20%;
  top: 48.8%;
  right: 20%;
}
</style>