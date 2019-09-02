<template>
  <div class="home_coupon">
    <div class="home_coupon_box">
      <div class="coupon_item">
        <div class="coupon_item_top">{{title}}</div>
        <div class="coupon_item_bottom">{{startTime}} 至 {{endTime}}</div>
      </div>
    </div>

    <div class="draw_btn_box">
      <button :class="[draw == true ? 'draw' : 'not_draw']">{{drawTxt}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeCoupon",
  data() {
    return {
      title: "官网建站6折折扣券",
      startTime: "2019-02-25 12:00:00",
      endTime: "2019-04-12 12:00:00",
      draw: false,
      drawTxt: ""
    };
  },
  created() {
    if (this.draw) {
      this.drawTxt = "去我的优惠券查看";
    } else {
      this.drawTxt = "立即领取";
    }

    
  }
};
</script>

<style lang="css" scoped>
.home_coupon {
  background: #eeeff1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.home_coupon_box {
  padding: 1.5rem 1.5rem 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 92%;
  border-radius: 0.5rem;
}
.coupon_item {
  width: 100%;
  height: 19.2rem;
  
  border-radius: 0.5rem;
  position: relative;
}
.coupon_item_top {
  height: 14.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
  color: #fff;
  font-weight: bold;
  font-family: "PingFangSC-Regular, sans-serif";
  background-size: cover;
  background-image: url("../../../images/coupons-bg-top.png");
  border-radius: 0.5rem;
}

.coupon_item_bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 5rem;
  font-size: 1.4rem;
  color: #666666;
  font-family: "PingFangSC-Regular, sans-serif";
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background-size: cover;
  background-image: url("../../../images/coupons-bg-bottom.png");
}

.draw_btn_box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.draw {
  width: 20rem;
  height: 5rem;
  border: 1px solid #ff4d56;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-family: "PingFangSC-Regular, sans-serif";
  color: #ff4d56;
  border-radius: 2.5rem;
  margin-top: 7rem;
  background: transparent;
}
.not_draw {
  width: 20rem;
  height: 5rem;
  border: 0;
  background: #ff4d56;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-family: "PingFangSC-Regular, sans-serif";
  color: #fff;
  border-radius: 2.5rem;
  margin-top: 7rem;
}

@media screen and (max-width: 640px) {
  .home_coupon_box {
    padding: 1rem 1rem 0 1rem;
  }
  .coupon_item_bottom {
    font-size: 1.2rem;
  }
}
</style>