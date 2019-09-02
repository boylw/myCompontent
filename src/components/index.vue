<template>
  <div id="PAGE">
    <div class="container">
      <swiper
        class="swiper-container"
        v-if="slideList.length>=1"
        :options="swiperOption"
        ref="mySwiper"
        @touch-move="moveHandler"
        @touch-end="moveEndHandler"
      >
        <swiper-slide v-for="(slideListItem,index) in slideList" :key="index">
          <router-link
            tag="img"
            :src="slideListItem.imageKey"
            :name="slideListItem.name"
            :to="slideListItem.link"
          ></router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <div class="container_box">
        <div
          class="enterprise_service"
          v-for="item in subjectSeachAll"
          :key="item.id"
          ref="container_box_item"
        >
          <div class="server_title">
            <i>
              <s>{{item.name}}</s>
            </i>
          </div>
          <div class="server_nav">
            <ul class="server_nav_ul">
              <router-link
                :to="listItem.link"
                tag="li"
                v-for="(listItem,index) in item.list"
                :key="index"
                class="pr"
              >
                <div class="icon_box">
                  <img :src="listItem.iconKey" class="icon_box_img" alt>
                </div>
                <p>{{listItem.name}}</p>
                <b :class="{'line':((index +1 ) % 3 != 0)}"></b>
                <b :class="{'line-1':((index+1) % 3 != 0)}"></b>
              </router-link>
            </ul>
          </div>
        </div>

        <div class="bottom" v-show="bottomShow" ref="bottom">
          <ul>
            <router-link to="/" tag="li">
              <i class="bottom-active bottom-home"></i>
              <p class="active">首页</p>
            </router-link>

            <router-link to="/welfare" tag="li">
              <i class="bottom-welfare"></i>
              <p class>福利</p>
            </router-link>

            <router-link to="/home" tag="li">
              <i class="bottom-person"></i>
              <p>我的</p>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const indexCss = require("../css/index.css");
import "swiper/dist/css/swiper.css"; //在全局没引入，这里记得要！
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { mapActions } from "vuex";
import { setTimeout } from "timers";
import config from "../config/config.js";
export default {
  data() {
    return {
      bottomShow: false,
      subjectSeachAll: [], //所有的类型
      slideList: [], // 轮播数据,
      swiperOption: {
        direction: "horizontal",
        loop: true,
        speed: 800,
        autoplay: {
          // delay: 1600,
          disableOnInteraction: false,
          waitForTransition: true
        },
        slidesPerView: "auto",
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 20,
        observer: true,
        virtualTranslate: false,
        observeParents: true,
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  created() {
    this.wxMyReady({
      title: "有条企服",
      desc: '百分百服务，助力企业数字化转型'
    });
    // this.$cookies.set("JSESSIONID", "C3E3C1271EF32D3766A09ACB121D8FB2");
    // this.$cookies.set("yesid", "%09%2509b7af55db801548a8b0816789e75111c0");
    this.getInfo();
    this.loginStatusM(true);
  },
  updated() {
    // if (this.slideList.length > 1) {
    //   this.swiper.init();
    // }
  },
  methods: {
    ...mapActions(["loginStatusM"]),
    async getInfo() {
      let { data } = await this.Http.$get("/data/publicity/mobile/home");
      let { slides, serviceCategories } = data;
      // 轮播图
      slides &&
        Array.from(slides).map(item => {
          item.imageKey =
            config.current + `/data/publicity/mobile/image/${item.imageKey}`;
          item.link = item.link == null ? "http://www.baidu.com" : item.link;
        });

      this.slideList = slides || [];

      if (this.slideList.length < 3) {
        this.swiperOption.loop = false;
      }
      // 服务类
      serviceCategories &&
        Array.from(serviceCategories).map(item => {
          item.services.map(serverItem => {
            serverItem.iconKey =
              config.current +
              `/data/publicity/mobile/image/${serverItem.iconKey}`;
            item.link = item.link == null ? "/" : item.link;
          });
          let cur = {
            name: item.name,
            list: item.services
          };
          this.subjectSeachAll.push(cur);
        });

      this.$nextTick(() => {
        if (
          window.innerHeight >
          this.$refs.container_box_item[0].offsetHeight * 3 + 22.5 * 20 + 110
        ) {
          this.$refs.bottom.style.position = "fixed";
        }
        this.bottomShow = true;
      });
    },
    moveHandler() {
      this.swiperOption.autoplay.waitForTransition = false;
    },
    moveEndHandler() {
      this.swiperOption.autoplay.waitForTransition = true;
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  computed: {
    swiperOptions() {
      return this.swiperOption;
    }
  },
  watch: {
    swiperOptions: {
      handler(newValue, oldValue) {
        return newValue;
      },
      deep: true
    }
  },
  components: {
    myFooter: resolve => require(["./footer"], resolve),
    swiper,
    swiperSlide
  }
};
</script>

<style scoped>
.bottom {
  position: relative;
}

.server_nav {
  height: 33.33333333%;
  /* min-height: 15rem; */
}

@media screen and (min-width: 480px) and (max-width: 719px) {
  body {
  }
  .icon_box_img {
    width: 2rem;
    height: 2rem;
  }
}
@media screen and (min-width: 720px) and (max-width: 1080px) {
  body {
  }
  .icon_box_img {
    width: 4rem;
    height: 4rem;
  }
}
@media screen and (min-width: 1080px) and (max-width: 1242px) {
  body {
  }
  .icon_box_img {
    width: 8rem;
    height: 8rem;
  }
}
</style>


