<template>
  <div id="PAGE" style="overflow: hidden;">
    <div class="person-header">
      <router-link to="/home/personInfo" tag="div" class="person-info" v-if="bindPhone">
        <img class="person-info-icon" :src="personImg">
        <p class="person-info-title">
          <b class="person-info-name" id="person-info-name">{{nickname}}</b>
          <b class="person-info-phone" id="person-info-phone">手机号:{{cellphoneNumber}}</b>
        </p>
      </router-link>
    </div>

    <div class="person-bind-phone">
      <div class="bind-phone-panel">
        <i></i> 我的专属产品经理
      </div>
      <div class="bind-phone-info">
        <!-- 已登录 -->
        <div class="binded" id="binded" v-if="bindPhone">
          <div class="binded-text">
            <img :src="prodcutManager.headPortraitKey" class="binded-icon" alt>
            <p class="binded-txt">
              <span class="binded-txt-c">
                <i class="icon icon-24-12"></i>
                <s id="bindedName">{{prodcutManager.name}}</s>
              </span>
              <span class="binded-txt-c">
                <i class="icon icon-30-12"></i>
                <s id="bindedWx">{{prodcutManager.weixinNumber}}</s>
              </span>
            </p>
          </div>
          <div class="binded-phone">
            <a :href="'tel:'+prodcutManager.cellphoneNumber" class="go-phone"></a>
            <i class="icon icon-18-12"></i>
          </div>
        </div>
        <!-- 未登录 -->
        <div class="unbinded" id="unbinded" v-if="notbindPhone">
          <div class="unbinded-text pr">
            <i class="unbinded-icon"></i>
            <p class="unbinded-txt">
              <s>您还未登录。</s>
              <s>登录后为您推荐专属产品经理~</s>
            </p>
          </div>
          <div class="unbinded-btn">
            <router-link to="/login" tag="button" class="unbinded-btn-target">去登录</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="person-list">
      <ul>
        <router-link to="/home/new" tag="li" class="line-b">
          <p class="person-list-icon">
            <i class="icon icon-0-12"></i>
            <s>消息</s>
          </p>
          <i class="go-icon icon icon-36-12"></i>
        </router-link>
        <router-link to="/home/active" tag="li" class="line-b">
          <p class="person-list-icon">
            <i class="icon icon-6-12"></i>
            <s>我的活动</s>
          </p>
          <i class="go-icon icon icon-36-12"></i>
        </router-link>
        <router-link to="/home/chit" tag="li" class="line-b">
          <p class="person-list-icon">
            <i class="icon icon-12-12"></i>
            <s>优惠券</s>
          </p>
          <i class="go-icon icon icon-36-12"></i>
        </router-link>
      </ul>
    </div>

    <my-footer active="home"></my-footer>
  </div>
</template>

<script>
import("../../css/home/person.css");
import config from "@/config/config";
import defalutImg from "@/images/login-default-icon.png";

export default {
  data() {
    return {
      bindPhone: false,
      notbindPhone: false,
      personImg: defalutImg,
      cellphoneNumber: "", // 我的电话
      nickname: "", // 昵称
      prodcutManager: {
        headPortraitKey: ""
      } // 产品经理
    };
  },
  created() {
    this.getInfo();
    this.wxMyReady({
      title: "有条企服",
      desc: "百分百服务，助力企业数字化转型"
    });
  },
  methods: {
    async getInfo() {
      let { data } = await this.Http.$get("/data/my");
      let res = data;

      // 手机号
      if (res.cellphoneNumber) {
        this.cellphoneNumber = res.cellphoneNumber;
        this.nickname = res.nickname;
        this.prodcutManager = res.prodcutManager || {};
        // 获取我的头像
        this.checkHasHeaderImg();
        // 显示
        this.bindPhone = true;
      } else {
        this.notbindPhone = true;
      }

      // 项目经理头像
      if (this.prodcutManager && this.prodcutManager.headPortraitKey) {
        this.prodcutManager.headPortraitKey =
          config.current +
          "/data/publicity/mobile/image/" +
          this.prodcutManager.headPortraitKey;
      } else {
        this.prodcutManager.headPortraitKey = defalutImg;
      }
    },
    async checkHasHeaderImg() {
      let res = await this.Http.$get("/data/profiles/briefs");
      let { data } = res || {};
      if (data && data.hasHeadPortrait) {
        // 如果有头像，我就调用获取用户头像
        let resImg = await this.Http.$get({
          url: "/data/headPortrait",
          responseType: "arraybuffer"
        }); // 返回的是二进制流
        if (resImg.status < 300 && resImg.status >= 200) {
          let file = resImg.data;
          // 转换为base64位
          this.personImg =
            "data:image/png;base64," +
            btoa(
              new Uint8Array(file).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
        } else {
          // 调用失败.放入默认头像
          this.personImg = "../../images/login-default-icon.png";
        }
      } else {
        this.personImg = defalutImg;
      }
    }
  },
  components: {
    myFooter: resolve => require(["../footer"], resolve)
  },
  watch: {
    prodcutManager: {
      handler(newValue, oldValue) {
        return newValue;
      },
      immediate: false,
      deep: true
    },
    nickname(newValue, oldValue) {
      return newValue;
    },
    cellphoneNumber(newValue, oldValue) {
      return newValue;
    },
    personImg(newValue) {
      return newValue;
    }
  }
};
</script>

<style scoped>
.binded-phone {
  position: relative;
}
.go-phone {
  position: absolute;
  top: 0;
  left: 0;
  width: 5rem;
  height: 4.5rem;
  z-index: 2;
}
</style>
