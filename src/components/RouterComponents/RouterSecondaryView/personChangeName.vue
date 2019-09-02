<template>
  <div class="person-change-name" v-show="showPage">
    <transition name="fade">
      <i class="delete-icon" @click="emptyValue" v-show="changeName.trim().length>0"></i>
    </transition>
    <input type="text" v-model="changeName" class="changeName" @blur="resetDiv" placeholder="请输入新昵称">
    <div class="bottom-btn">
      <button class="submit-save" @click="saveUserName">保存</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      changeName: this.$session.get('name') || '',
      showPage: false
    };
  },
  created () {
    this.wxMyReady({
        url: '/',
        title: "有条企服",
        desc: "百分百服务，助力企业数字化转型"
      });
  },
  methods: {
    emptyValue() {
      this.changeName = "";
    },
    async saveUserName() {
      if (this.changeName.trim() != "") {
        let res = await this.Http.$patch({
          url: "/data/profiles/nickname",
          data: {
            nickname: this.changeName
          }
        });
        if (res.status >= 200 && res.status < 300) {
          this.$alert.info({
            content: "修改成功",
            schema: "success"
          });
          this.$router.replace({
            path: "/home/personInfo"
          });
        }
      }
    },
    resetDiv() {
      //ios 兼容，input失去焦点后界面上移不恢复的问题
      setTimeout(() => {
        let scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
    }
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
.person-change-name {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eeeff1;
}
.changeName {
  width: 100%;
  height: 6rem;
  border: 0;
  outline: 0;
  color: #333333;
  font-size: 1.5rem;
  padding: 0 1.5rem;
}

.changeName::placeholder {
    font-size: 1.5rem;
    color: #cccccc;
}

.bottom-btn {
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.submit-save {
  height: 5rem;
  width: 32.5rem;
  background: #0db29d;
  border-radius: 2.5rem;
  color: #f5f6fa;
  font-size: 1.6rem;
  text-align: center;
  line-height: 5rem;
}

.delete-icon {
  position: absolute;
  right: 1.5rem;
  top: 2.25rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: url("../../../images/detele.png") no-repeat center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>