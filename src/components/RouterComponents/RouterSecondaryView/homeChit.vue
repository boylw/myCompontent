<template>
  <div id="PAGE" v-show="showPage">
    <div class="coupons empty">
      <!-- <router-link to="/home/chit/homeCoupon" tag="div" class="coupons_card padding pr">
        <div class="coupons_card_txt">
          <div class="card_txt_top">官网建站——6折折扣券</div>
          <div class="card_txt_bottom">有效时间</div>
          <div class="card_txt_date">2019-02-25 至 2019-04-12</div>
        </div>
        <div class="triangle_box pr">
          <div class="triangle_txt">待使用</div>
          <div class="triangle_border"></div>
        </div>
      </router-link>
      <div class="coupons_card finished pr">
        <div class="coupons_card_txt">
          <div class="card_txt_top">官网建站——6折折扣券</div>
          <div class="card_txt_bottom">有效时间</div>
          <div class="card_txt_date">2019-02-25 至 2019-04-12</div>
        </div>
        <div class="triangle_box pr">
          <div class="triangle_txt">已使用</div>
          <div class="triangle_border"></div>
        </div>
      </div>
      <div class="coupons_card used pr">
        <div class="coupons_card_txt">
          <div class="card_txt_top">官网建站——6折折扣券</div>
          <div class="card_txt_bottom">有效时间</div>
          <div class="card_txt_date">2019-02-25 至 2019-04-12</div>
        </div>
        <div class="triangle_box pr">
          <div class="triangle_txt">已过期</div>
          <div class="triangle_border"></div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPage: false
    }
  },
  created () {
    vm.wxMyReady({
      url: "/",
      title: "有条企服",
      desc: "百分百服务，助力企业数字化转型"
    });
  },
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      let briefs = await vm.Http.$get("/data/profiles/briefs");
      let brief = briefs.data;
      if (!brief.cellphoneNumber) {
        next({
          path: "/"
        });
      } else {
        vm.showPage = true;
        next();
      }
    });
  }
};
</script>

<style scoped>
.coupons {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  padding: 0 1.5rem 0 1.5rem;
}

.empty {
    background: url('../../../images/all-empty.png') no-repeat center;
    background-size: 100%;
}

.coupons-card {
  box-sizing: border-box;
  width: 100%;
  min-height: 12rem;
  margin-top: 1.5rem;
  padding-left: 1.5rem;
  border-radius: 0.5rem;
}

.card-info-name {
  margin-bottom: 0.5rem;
}

.coupons-card.padding {
  background: url("../../../images/coupons-padding.jpg") no-repeat center;
  color: #fff;
}

.coupons-card.finished {
  background: url("../../../images/coupons-finished.png") no-repeat center;
  color: #999999;
}

.coupons-card.used {
  background: url("../../../images/coupons-used.jpg") no-repeat center;
  color: #999999;
}

.coupons-card.padding .coupons-card-title {
  height: 6rem;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  color: #ffffff;
  font-family: "PingFangSC-Regular, sans-serif";
  font-weight: 500;
}

.coupons-card.padding .coupons-card-info {
  height: 6rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.coupons-card.padding .coupons-card-info p {
  font-size: 1.3rem;
  height: 1.3rem;
  line-height: 1.3rem;
  color: #ffffff;
}

.coupons-card.finished .coupons-card-title {
  height: 6rem;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  color: #999999;
  font-family: "PingFangSC-Regular, sans-serif";
  font-weight: 500;
}

.coupons-card.finished .coupons-card-info {
  height: 6rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.coupons-card.finished .coupons-card-info p {
  font-size: 1.3rem;
  height: 1.3rem;
  line-height: 1.3rem;
  color: #999999;
}

.coupons-card.used .coupons-card-title {
  height: 6rem;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  color: #333333;
  font-family: "PingFangSC-Regular, sans-serif";
  font-weight: 500;
}

.coupons-card.used .coupons-card-info {
  height: 6rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.coupons-card.used .coupons-card-info p {
  font-size: 1.3rem;
  height: 1.3rem;
  line-height: 1.3rem;
  color: #999999;
}
.coupons_card {
  height: 12.3rem;
  background: #ffffff;
  border-radius: 15px;
  padding-left: 1.5rem;
  margin-top: 1.5rem;
}
.coupons_card_txt {
  display: inline-block;
}
.card_txt_top {
  height: 7rem;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  color: #999999;
  font-family: "PingFangSC-Regular, sans-serif";
  font-weight: 500;
}
.card_txt_bottom {
  font-size: 1.3rem;
  height: 1.3rem;
  line-height: 1.3rem;
  color: #999999;
  margin-bottom: 0.8rem;
}
.card_txt_date {
  font-size: 1.3rem;
  height: 1.3rem;
  line-height: 1.3rem;
  color: #999999;
}

.triangle_box {
  display: inline-block;
  position: absolute;
  right: 0;
}
.triangle_border {
  display: inline-block;
  width: 0;
  height: 0;
  border-width: 60px;
  border-style: solid;
  border-color: #ff383f #ff383f transparent transparent;
  float: right;
  border-top-right-radius: 15px;
  position: relative;
}
.triangle_txt {
  width: 103px;
  font-size: 28px;
  display: inline-block;
  position: absolute;
  right: -18px;
  transform: rotate(46deg);
  z-index: 11;
  top: 28px;
  color: #ffffff;
}

.coupons_card.padding {
  background: #ff4d56;
}
.coupons_card.padding > div.coupons_card_txt > div {
  color: #ffffff;
}
.coupons_card.finished > div.triangle_box > div.triangle_border {
  border-color: #84a6b9 #84a6b9 transparent transparent;
}
.coupons_card.used > div.triangle_box > div.triangle_border {
  border-color: #b9b9b9 #b9b9b9 transparent transparent;
}
</style>
