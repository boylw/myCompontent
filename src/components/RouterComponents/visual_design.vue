<template>
  <div id="scrollBox" ref="scrollBox">
    <div class="page">
      <img src="../../externals/visual_design/1.png" alt onclick="return false">
      <div class="emptyBox2" ref="emptyBox2"></div>
      <div class="animateBox2" ref="animateBox2">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/visual_design/2.png"
            alt
            onclick="return false"
            v-show="animateBox2"
          >
        </transition>
        <div class="animateViewPort" ref="animateViewPort2"></div>
      </div>
      <div class="emptyBox3"></div>
      <img src="../../externals/visual_design/3.png" alt onclick="return false">
      <div class="animateBox3" ref="animateBox3">
        <transition name="Myfade" mode="out-in">
          <img
            src="../../externals/visual_design/4.png"
            alt
            onclick="return false"
            v-show="animateBox3"
          >
        </transition>
        <div class="animateViewPort" ref="animateViewPort3"></div>
      </div>
      <div class="animateBox4" ref="animateBox4">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/visual_design/5.png"
            alt
            onclick="return false"
            v-show="animateBox4"
          >
        </transition>
      </div>
      <div class="animateViewPort" ref="animateViewPort4"></div>
      <img src="../../externals/visual_design/6.png" alt onclick="return false">
      <div class="animateBox5" ref="animateBox5">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/visual_design/7.png"
            alt
            onclick="return false"
            v-show="animateBox5"
          >
        </transition>
        <div class="animateViewPort" ref="animateViewPort5"></div>
      </div>
      <img src="../../externals/visual_design/8.png" alt onclick="return false">
      <div class="animateBox6" ref="animateBox6">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/visual_design/9.png"
            alt
            onclick="return false"
            v-show="animateBox6"
          >
        </transition>
        <div class="animateViewPort" ref="animateViewPort6"></div>
      </div>
      <img src="../../externals/visual_design/10.png" alt onclick="return false">
      <div class="animateBox7" ref="animateBox7">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/visual_design/11.png"
            alt
            onclick="return false"
            v-show="animateBox7"
          >
        </transition>
        <div class="animateViewPort" ref="animateViewPort7"></div>
      </div>
      <div class="animateBox8" ref="animateBox8">
        <transition name="myfadeup" mode="out-in">
          <img
            src="../../externals/visual_design/12.png"
            alt
            onclick="return false"
            v-show="animateBox8"
          >
        </transition>
        <div class="animateViewPort" ref="animateViewPort8"></div>
      </div>
      <div class="animateBox9" ref="animateBox9">
          <router-link to="/home/new">
            <transition name="myzoomUp" mode="out-in">
                <img src="../../externals/visual_design/13.png" alt v-show="animateBox9">
            </transition>
          </router-link>
      </div>
      <div class="animateViewPort" ref="animateViewPort9"></div>
      <router-link to="/index/brand_website">
        <img src="../../externals/visual_design/14.png" alt>
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
      animateBox6: false,
      animateBox7: false,
      animateBox8: false,
      animateBox9: false
    };
  },
  mounted() {
    this.wxMyReady({
      title: "有条企服-视觉设计",
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
.animateBox2 {
  height: 6.6rem;
  width: 100%;
}

.emptyBox2 {
  height: 1.5rem;
  width: 100%;
}

.emptyBox3 {
  height: 1rem;
}

.animateBox3 {
  height: 9.8rem;
  width: 100%;
  background: #efefef;
}

.animateBox4 {
  height: 7.8rem;
  width: 100%;
}

.animateBox5 {
  height: 5rem;
  width: 100%;
  margin-bottom: 4rem;
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