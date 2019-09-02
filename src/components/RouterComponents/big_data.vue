<template>
  <div id="scrollBox" ref="scrollBox">
    <div class="page">
      <img src="../../externals/big_data/01.png" alt onclick="return false">
      <div class="pageTwo">
        <div class="animateBox1" ref="animateBox1">
          <transition-group name="myfadeup" mode="out-in">
            <img
              src="../../externals/big_data/2.png"
              alt
              onclick="return false"
              :key="1"
              v-show="animateBox1"
            >
            <img
              src="../../externals/big_data/3.png"
              alt
              onclick="return false"
              :key="2"
              v-show="animateBox1"
              class="delay"
            >
          </transition-group>
        </div>
        <div class="animateViewPort" ref="animateViewPort1" v-show="!animateBox1"></div>
      </div>
      <img src="../../externals/big_data/04.png" alt onclick="return false">

      <div class="pageThree">
        <div class="animateBox2" ref="animateBox2">
          <transition-group name="myfadeup" mode="out-in">
            <img
              src="../../externals/big_data/5.png"
              alt
              onclick="return false"
              :key="1"
              v-show="animateBox2"
            >
            <img
              src="../../externals/big_data/6.png"
              alt
              onclick="return false"
              :key="2"
              v-show="animateBox2"
              class="delay"
            >
          </transition-group>
        </div>
        <div class="animateViewPort" ref="animateViewPort2" v-show="!animateBox2"></div>
      </div>
      <img src="../../externals/big_data/07.png" alt onclick="return false">

      <div class="pageFour">
        <div class="animateBox3" ref="animateBox3">
          <transition-group name="myfadeup" mode="out-in">
            <img
              src="../../externals/big_data/8.png"
              alt
              onclick="return false"
              :key="1"
              v-show="animateBox3"
            >
            <img
              src="../../externals/big_data/9.png"
              alt
              onclick="return false"
              :key="2"
              v-show="animateBox3"
              class="delay"
            >
          </transition-group>
        </div>
        <div class="animateViewPort" ref="animateViewPort3" v-show="!animateBox3"></div>
      </div>
      <img src="../../externals/big_data/010.png" alt onclick="return false">

      <div class="pageFive">
        <div class="animateBox4" ref="animateBox4">
          <transition-group name="myfadeup" mode="out-in">
            <img
              src="../../externals/big_data/11.png"
              alt
              onclick="return false"
              :key="1"
              v-show="animateBox4"
            >
            <img
              src="../../externals/big_data/12.png"
              alt
              onclick="return false"
              :key="2"
              v-show="animateBox4"
              class="delay"
            >
          </transition-group>
        </div>
        <div class="animateViewPort" ref="animateViewPort4" v-show="!animateBox4"></div>
      </div>
      <img src="../../externals/big_data/013.png" alt onclick="return false">

      <div class="bottomPage">
        <div class="animateBox5" ref="animateBox5">
          <transition name="myfadeup" mode="out-in">
            <img
              src="../../externals/big_data/14.png"
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
              src="../../externals/big_data/15.png"
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
              <img src="../../externals/big_data/16.png" alt v-show="animateBox7">
            </transition>
          </router-link>
        </div>
        <div class="animateViewPort" ref="animateViewPort7"></div>
      </div>
      <router-link to="/index/synthetical_platform">
        <img src="../../externals/big_data/017.png" alt>
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
      animateBox7: false
    };
  },
  mounted() {
    this.wxMyReady({
      title: "有条企服-大数据",
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
  background: #fafafa;
}
.animateBox2 {
  width: 100%;
}

.animateBox3 {
  width: 100%;
  background: #fafafa;
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
</style>