<template>
  <div class="person-info-two" v-show="showPage">
    <div class="person-item person-img">
      <span class="person-txt">头像</span>
      <p class="item-right">
        <img :src="my.headPortrait" alt>
        <input
          type="file"
          @change="changeFile"
          name="cover"
          accept="image/*"
          multiple
          class="change-file"
        >
        <s class="person-item-icon"></s>
      </p>
    </div>
    <div class="person-item">
      <div class="line-both">
        <span class="person-txt">昵称</span>
        <router-link to="/home/personChangeName" tag="p" class="item-right">
          <s class="person-txt-right">{{my.nickname}}</s>
          <s class="person-item-icon"></s>
        </router-link>
      </div>
    </div>
    <div class="person-item">
      <span class="person-txt">手机号</span>
      <router-link to="/home/personChangeTele" tag="p" class="item-right">
        <s class="person-txt-right">{{my.cellphoneNumber}}</s>
        <s class="person-item-icon"></s>
      </router-link>
    </div>

    <notice-a :showAlert="notice.showAlert" :schema="notice.schema" :content="notice.content"></notice-a>
  </div>
</template>

<script>
import defaultHeaderImg from "@/images/login-default-icon.png";
import noticeA from "../../overall/notice-noAutoClose.vue";

export default {
  name: "person-info",
  data() {
    return {
      my: {
        nickname: "",
        cellphoneNumber: "",
        headPortrait: defaultHeaderImg
      },
      notice: {
        showAlert: false,
        schema: "loading",
        content: "正在上传"
      },
      showPage: false
    };
  },
  async created() {
    this.wxMyReady({
      url: "/",
      title: "有条企服",
      desc: "百分百服务，助力企业数字化转型"
    });
    this.getInfo();
  },
  methods: {
    async getInfo() {
      let res = await this.Http.$get("/data/my");
      if (res.status < 300 && res.status >= 200) {
        let { data } = res;
        this.my.nickname = data.nickname;
        this.$session.set("name", this.my.nickname);
        this.my.cellphoneNumber = data.cellphoneNumber;
        this.$session.set("tele", this.my.cellphoneNumber);
      }

      if (this.my.cellphoneNumber) {
        // 获取简要信息
        let briefs = await this.Http.$get("/data/profiles/briefs");
        let brief = briefs.data;
        if (brief.hasHeadPortrait) {
          let resImg = await this.Http.$get({
            url: "/data/headPortrait",
            responseType: "arraybuffer"
          });

          if (resImg.status < 300 && resImg.status >= 200) {
            let file = resImg.data;
            this.my.headPortrait =
              "data:image/png;base64," +
              btoa(
                new Uint8Array(file).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              );
          }
        } else {
          this.$alert.info({
            content: "您还未设置头像",
            schema: "default"
          });
        }
      }
    },
    async changeFile(e) {
      let file = e.target.files[0];
      let headPortrait = new FormData();
      let reader = new FileReader();
      headPortrait.append("headPortrait", file);

      this.notice.showAlert = true;

      let res = await this.Http.$patch({
        url: "/data/profiles/headPortrait",
        data: headPortrait,
        contentType: "form-data"
      });

      if (res.status >= 200 && res.status < 300) {
        setTimeout(() => {
          this.notice.showAlert = false;
          this.$alert.info({
            content: "上传成功",
            schema: "success"
          });
        }, 2000);
        reader.readAsDataURL(file);
        reader.onload = es => {
          console.log("====================================");
          console.log(es.target.result);
          console.log("====================================");
          this.my.headPortrait = es.target.result;
          e.target.value = "";
        };
      } else {
        this.notice.showAlert = false;
      }
    }
  },
  watch: {
    my: {
      handler(newValue, oldValue) {
        console.log("====================================");
        console.log(newValue);
        console.log("====================================");
        return newValue;
      },
      immediate: false,
      deep: true
    }
  },
  components: {
    noticeA
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

<style lang="css" scoped>
.person-info-two {
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eeeff1 !important;
}
.person-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  height: 5.9rem;
  background: #fff;
  box-sizing: border-box;
}
.person-img {
  height: 8.2rem;
}
.line-both {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5.9rem;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  border-bottom: 0.05rem solid #e5e5e5;
  border-top: 0.05rem solid #e5e5e5;
}
.person-txt {
  color: #666666;
  font-size: 1.5rem;
  width: 14%;
  height: 100%;
  display: inline-flex;
  align-items: center;
}

.item-right {
  position: relative;
  width: 87%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.item-right img {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 0.05rem solid #ccc;
  margin-right: 1rem;
  object-fit: cover;
  vertical-align: middle;
}

.change-file {
  position: absolute;
  width: 12rem;
  height: 5rem;
  border-radius: 50%;
  background: red;
  opacity: 0;
  right: -2rem;
}
.person-item-icon {
  width: 0.8rem;
  height: 1.4rem;
  background: url("../../../images/next.png") no-repeat center;
}
.person-txt-right {
  color: #333333;
  font-size: 1.5rem;
  margin-right: 1rem;
}
</style>