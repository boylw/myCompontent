<template>
  <div id="scrollBox" ref="scrollBox">
    <div class="page">
      <img src="../../externals/block_chain/01.png" alt onclick="return false">
      <div class="pageTwo">
        <div class="animateBox1" ref="animateBox1">
          <transition-group name="myfadeup" mode="out-in">
            <img
              src="../../externals/block_chain/2.png"
              alt
              onclick="return false"
              :key="1"
              v-show="animateBox1"
            >
            <img
              src="../../externals/block_chain/3.png"
              alt
              onclick="return false"
              :key="2"
              v-show="animateBox1"
              class="delay"
            >
            <img
              src="../../externals/block_chain/4.png"
              alt
              onclick="return false"
              :key="3"
              v-show="animateBox1"
              class="delayTwo"
            >
          </transition-group>
        </div>
        <div class="animateViewPort" ref="animateViewPort1" v-show="!animateBox1"></div>
      </div>

      <div class="pageThree">
        <div class="animateBox2" ref="animateBox2">
          <transition-group name="myfadeup" mode="out-in">
            <img
              src="../../externals/block_chain/5.png"
              alt
              onclick="return false"
              :key="1"
              v-show="animateBox2"
            >
            <img
              src="../../externals/block_chain/6.png"
              alt
              onclick="return false"
              :key="2"
              v-show="animateBox2"
              class="delay"
            >
            <img
              src="../../externals/block_chain/7.png"
              alt
              onclick="return false"
              :key="3"
              v-show="animateBox2"
              class="delayTwo"
            >
          </transition-group>
        </div>
        <div class="animateViewPort" ref="animateViewPort2" v-show="!animateBox2"></div>
      </div>

      <div class="pageFour">
        <div class="animateBox3" ref="animateBox3">
          <transition-group name="myfadeup" mode="out-in">
            <img
              src="../../externals/block_chain/8.png"
              alt
              onclick="return false"
              :key="1"
              v-show="animateBox3"
            >
            <img
              src="../../externals/block_chain/9.png"
              alt
              onclick="return false"
              :key="2"
              v-show="animateBox3"
              class="delay"
            >
            <img
              src="../../externals/block_chain/10.png"
              alt
              onclick="return false"
              :key="3"
              v-show="animateBox3"
              class="delayTwo"
            >
          </transition-group>
        </div>
        <div class="animateViewPort" ref="animateViewPort3" v-show="!animateBox3"></div>
      </div>

      <div class="bottomPage">
        <div class="animateBox5" ref="animateBox5">
          <transition name="myfadeup" mode="out-in">
            <img
              src="../../externals/block_chain/11.png"
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
              src="../../externals/block_chain/12.png"
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
              <img src="../../externals/block_chain/13.png" alt v-show="animateBox7">
            </transition>
          </router-link>
        </div>
        <div class="animateViewPort" ref="animateViewPort7"></div>
      </div>

      <div class="pr">
        <img src="../../externals/block_chain/014.png" alt onclick="return false">
        <router-link to="/index/visual_design" tag="i" class="pa goPage0"></router-link>
        <router-link to="/index/brand_website" tag="i" class="pa goPage1"></router-link>
        <router-link to="/index/h5_activity" tag="i" class="pa goPage2"></router-link>
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
    this.wxMyReady({
      title: "有条企服-区块链",
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
    },
    stopDefaultProp() {
      return false;
    }
  }
};
</script>

<style lang="css" scoped>
.pageTwo {
  min-height: 40rem;
  width: 100%;
  background: url("../../externals/block_chain/02.png") no-repeat center;
  background-size: cover;
  box-sizing: border-box;
}

.pageThree {
  min-height: 40rem;
  width: 100%;
  box-sizing: border-box;
}

.pageFour {
  min-height: 45rem;
  width: 100%;
  background: url("../../externals/block_chain/03.png") no-repeat center;
  background-size: cover;
  box-sizing: border-box;
}

.delay {
  transition-delay: 500ms;
}

.delayTwo {
  transition-delay: 800ms;
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
  background: #eeeeee;
}
.animateBox2 {
  width: 100%;
}

.animateBox3 {
  width: 100%;
  background: #eeeeee;
}

.animateBox4 {
  width: 100%;
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