<template>
  <div id="PAGE" v-show="showPage">
    <div class="activity empty">
      <div v-if="false" class="activity-card">
        <img src="../../../images/list_banner.png" alt class="activity-card-icon">
        <!-- end and padding -->
        <div class="activity-card-info padding">
          <div class="activity-card-text">
            <p>有条企服免费送5K建站</p>
            <s>2019-03-16 至 2019-06-22</s>
          </div>
          <div class="activity-card-status">
            <p></p>
          </div>
        </div>
      </div>

      <div v-if="false" class="activity-card">
        <img src="../../../images/list_banner.png" alt class="activity-card-icon">
        <!-- end and padding -->
        <div class="activity-card-info end">
          <div class="activity-card-text">
            <p>有条企服免费送5K建站</p>
            <s>2019-03-16 至 2019-06-22</s>
          </div>
          <div class="activity-card-status">
            <p></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPage: false
    };
  },
  created() {
    this.wxMyReady({
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
.activity {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  padding: 0 1.5rem 0 1.5rem;
}

.empty {
  background: url("../../../images/empty.png") no-repeat center;
  background-size: 100%;
}
.activity-card {
  margin-top: 1.5rem;
  width: 100%;
  height: 20.5rem;
  border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
  background: #fff;
}

.activity-card-icon {
  height: 13rem;
  width: 100%;
  border-radius: 0.5rem 0.5rem 0 0;
}

.activity-card-info {
  height: 7.8rem;
  width: 100%;
  border-radius: 0 0 0.5rem 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.activity-card-text {
  width: 84%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1.5rem;
}

.activity-card-info.padding .activity-card-text p {
  font-size: 1.5rem;
  line-height: 1.5rem;
  height: 1.5rem;
  color: #333333;
  font-weight: 550;
  font-family: "PingFangSC-Regular, sans-serif";
  padding-bottom: 1rem;
}

.activity-card-info.padding .activity-card-text s {
  font-size: 1.2rem;
  line-height: 1.2rem;
  height: 1.2rem;
  color: #999999;
  font-weight: 550;
  font-family: "PingFangSC-Regular, sans-serif";
}

.activity-card-info.padding .activity-card-status {
  width: 16%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.activity-card-info.padding .activity-card-status p {
  width: 100%;
  height: 2.5rem;
  border-radius: 1.2rem 0 0 1.2rem;
  background: linear-gradient(#ffc15d, #fd7935);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.1rem 0.05rem 0.5rem #ccc;
}

.activity-card-info.padding .activity-card-status p::before {
  content: "参与中";
  font-size: 1.3rem;
  font-family: "PingFangSC-Regular, sans-serif";
  color: #ffffff;
  line-height: 1.3rem;
  height: 1.3rem;
}

.activity-card-info.end .activity-card-text p {
  font-size: 1.5rem;
  line-height: 1.5rem;
  height: 1.5rem;
  color: #999999;
  font-weight: 550;
  font-family: "PingFangSC-Regular, sans-serif";
  padding-bottom: 1rem;
}

.activity-card-info.end .activity-card-text s {
  font-size: 1.2rem;
  line-height: 1.2rem;
  height: 1.2rem;
  color: #999999;
  font-weight: 550;
  font-family: "PingFangSC-Regular, sans-serif";
}

.activity-card-info.end .activity-card-status {
  width: 16%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.activity-card-info.end .activity-card-status p {
  width: 100%;
  height: 2.5rem;
  border-radius: 1.2rem 0 0 1.2rem;
  background: linear-gradient(#afc0c9, #8ba1ae);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.02rem 0.02rem #ccc;
}

.activity-card-info.end .activity-card-status p::before {
  content: "已结束";
  font-size: 1.3rem;
  font-family: "PingFangSC-Regular, sans-serif";
  color: #ffffff;
  line-height: 1.3rem;
  height: 1.3rem;
}

.section img {
  width: 100%;
}
</style>

