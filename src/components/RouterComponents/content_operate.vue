<template>
  <div id="scrollBox" ref="scrollBox">
    <div class="page">
      <img src="../../externals/content_operate/1.png" alt onclick="return false">

      <div class="animateBox1" ref="animateBox1">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/content_operate/2.png"
            alt
            onclick="return false"
            v-show="animateBox1"
          >
        </transition>
      </div>
      <div class="animateViewPort" ref="animateViewPort1"></div>
      <img src="../../externals/content_operate/3.png" alt onclick="return false">

      <div class="animateBox2" ref="animateBox2">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/content_operate/4.png"
            alt
            onclick="return false"
            v-show="animateBox2"
          >
        </transition>
      </div>
      <div class="animateViewPort" ref="animateViewPort2"></div>

      <img src="../../externals/content_operate/5.png" alt onclick="return false">

      <div class="animateBox3" ref="animateBox3">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/content_operate/6.png"
            alt
            onclick="return false"
            v-show="animateBox3"
          >
        </transition>
      </div>
      <div class="animateViewPort" ref="animateViewPort3"></div>

      <img src="../../externals/content_operate/7.png" alt onclick="return false">

      <div class="animateBox4" ref="animateBox4">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/content_operate/8.png"
            alt
            onclick="return false"
            v-show="animateBox4"
          >
        </transition>
      </div>
      <div class="animateViewPort" ref="animateViewPort4"></div>

      <img src="../../externals/content_operate/9.png" alt onclick="return false">

      <div class="animateBox5" ref="animateBox5">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/content_operate/10.png"
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
            src="../../externals/content_operate/11.png"
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
            <img src="../../externals/content_operate/12.png" alt v-show="animateBox7">
          </transition>
        </router-link>
      </div>
      <div class="animateViewPort" ref="animateViewPort7"></div>

      <router-link to="/index/member_system">
        <img src="../../externals/content_operate/13.png" alt>
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
      title: "有条企服-内容运营",
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
      } else {
        this[el] = false;
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
.animateViewPort {
  width: 100%;
  height: 0.05rem;
}
#scrollBox {
  background: #fff;
}

.animateBox1 {
  width: 100%;
  height: 8.7rem;
}
.animateBox2 {
  height: 9rem;
  width: 100%;
}

.animateBox3 {
  height: 5.2rem;
  width: 100%;
}

.animateBox4 {
  height: 11.3rem;
  width: 100%;
}

.animateBox5 {
  height: 7rem;
  width: 100%;
}

.animateBox6 {
  height: 2.8rem;
  width: 100%;
}

.animateBox7 {
  height: 12.5rem;
  width: 100%;
}

.animateBox8 {
  height: 3rem;
  width: 100%;
}

.animateBox9 {
  height: 12.5rem;
  width: 100%;
}
</style>