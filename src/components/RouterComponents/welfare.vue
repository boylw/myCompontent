<template>
  <div id="PAGE">
    <div class="welfare" v-show="cardList.length !=0">
      <div tag="div" class="card" v-for="(cardItem,index) in cardList" :key="index">
        <router-link :to="{path:cardItem.link}">
          <div
            class="card-icon"
            :style="{backgroundImage:`url('${cardItem.imageKey}')`,backgroundSize: '100% 100%',backgroundRepeat: 'no-repeat'}"
          ></div>
        </router-link>
        <p class="card-title">
          <s>{{cardItem.title}}</s>
          <b>{{ cardItem.startTime | moment('YYYY-MM-DD')}}</b>
        </p>
      </div>
      <div class="loading">
        <img src="../../images/loading.gif" alt class="loading-img" v-show="loadingImg">
        <p class="loading-info" v-show="endOne">
          <em class="line"></em> 我也是有底线的
          <em class="line"></em>
        </p>
      </div>
    </div>
    <div class="welfare-empty" v-if="cardList.length ==0"></div>
    <my-footer active="welfare"></my-footer>
  </div>
</template>

<script>
import config from "@/config/config.js";
export default {
  data() {
    let size = parseInt(window.innerHeight / (19.2 * 20)) + 1;
    return {
      cardList: [],
      loadingImg: true,
      endOne: false,
      listOption: {
        number: 0,
        size: size
      },
      listTotal: 0
    };
  },
  components: {
    myFooter: resolve => require(["../footer"], resolve)
  },
  created() {
    this.getInfo(this.listOption);
     this.wxMyReady({
      title: "有条企服",
      desc: '百分百服务，助力企业数字化转型'
    });
  },
  methods: {
    async getInfo(listOption) {
      let {data} = await this.Http.$get({
        url: "/data/publicity/mobile/activities",
        data: {
          number: listOption.number,
          size: listOption.size
        }
      });
      let res = data;
      if (res.total < listOption.size) {
        this.loadingImg = false;
      }
      res.data.map(item => {
        item.imageKey =
          config.current + "/data/publicity/mobile/image/" + item.imageKey;
      });
      this.listTotal = res.total;
      this.cardList = this.cardList.concat(res.data);
    },
    async sleep() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      let el = document.querySelector(".welfare");
      el.onscroll = async () => {
        let scrollHeight = el.scrollHeight;
        if (
          parseInt(el.scrollTop) + parseInt(el.offsetHeight) - scrollHeight >=
          -1
        ) {
          if (this.listTotal > this.listOption.number) {
            await this.sleep();
            this.listOption.number += 1;
            this.getInfo(this.listOption);
            if (this.listTotal <= this.listOption.number) {
              this.loadingImg = false;
              this.endOne = true
            }
          }
        }
      };
    });
  }
};
</script>

<style lang="css" scoped>
.welfare {
  position: absolute;
  padding: 2rem 1.5rem 0 1.5rem;
  left: 0;
  right: 0;
  bottom: 5.5rem;
  top: 0;
  background: #f0f0f0;
  overflow-y: auto;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
}

.welfare::-webkit-scrollbar {
  width: 0 !important;
}

.card {
  width: 100%;
  height: 19.2rem;
  border-radius: 0.2rem;
  box-shadow: 0.1rem 0.1rem 0.25rem #e6ebf4;
  margin-bottom: 2rem;
  box-sizing: border-box;
}

.card-icon {
  width: 100%;
  height: 13rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-size: 100% 100%;
}

.card-title {
  background: #ffffff;
  height: 6rem;
  width: 100%;
  box-sizing: border-box;
  padding-left: 1.6rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.card-title s {
  font-size: 1.5rem;
  line-height: 1.5rem;
  font-family: "PingFangSC-Regular, sans-serif";
  height: 1.5rem;
  text-decoration: none;
  color: #333333;
  font-weight: 800;
  margin-top: 1.5rem;
}

.card-title b {
  font-size: 1.2rem;
  height: 1.2rem;
  line-height: 1.2rem;
  color: #ccc;
  margin-top: 0.8rem;
}

.welfare-empty {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../../images/empty.png") no-repeat center;
  background-size: contain;
}

.loading {
  width: 100%;
  height: 2.5rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  align-items: center;
}
.loading-img {
  display: inline-block;
  width: 1.7rem;
  height: 1.7rem;
}
.loading-info {
  position: relative;
  height: 100%;
  color: #ccc;
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 0.5rem;
}
.loading-info .line {
  display: inline-block;
  width: 3.7rem;
  height: 0.05rem;
  background: #ccc;
  position: relative;
  top: -0.3rem;
}
</style>



