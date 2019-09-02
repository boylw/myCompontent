<template>
  <div class="person-change-tele" v-show="showPage">
    <transition name="fade">
      <i class="delete-icon" @click="emptyValue" v-show="changeTele.trim().length>0"></i>
    </transition>
    <div class="input-group">
      <input
        type="text"
        v-model="changeTele"
        class="changeTele"
        @blur="resetDiv"
        placeholder="请输入新手机号"
      >
      <input
        type="text"
        v-model="code"
        class="changeTele lineT"
        @blur="resetDiv"
        placeholder="请输入验证码"
      >
      <input
        type="button"
        :class="['getCode',isDisable==true? 'isDisable':'']"
        @click="getCode"
        :disabled="isDisable"
        value="获取验证码"
        @blur="resetDiv"
      >
    </div>
    <div class="bottom-btn">
      <button class="submit-save" @click="saveUserTele">保存</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      changeTele: this.$session.get("tele") || "",
      code: "",
      isDisable: false,
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
  methods: {
    emptyValue() {
      this.changeTele = "";
    },
    async saveUserTele() {
      // 提交登录
      if (this.changeTele.trim() == "") {
        this.$alert.info({
          content: "请输入手机号",
          schema: "error",
          duration: 2
        });
        return;
      } else if (this.code.trim() == "") {
        this.$alert.info({
          content: "请输入验证码",
          schema: "error",
          duration: 2
        });
        return;
      }
      // 提交接口
      let res = await this.Http.$put({
        url: "/data/bindCellphoneNumber",
        data: {
          cellphoneNumber: this.changeTele,
          code: this.code
        }
      });

      if (parseInt(res.status) >= 200 && parseInt(res.status) < 300) {
        this.$alert.info({
          content: "修改成功",
          schema: "success",
          duration: 2
        });
        this.$router.replace({
          path: "/home/personInfo"
        });
      }
    },
    resetDiv() {
      //ios 兼容，input失去焦点后界面上移不恢复的问题
      setTimeout(() => {
        let scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
    },
    async getCode(e) {
      let Dom = e.target;
      let phoneEgp = /^[1]([3-9])[0-9]{9}$/;
      if (this.changeTele.trim() != "" && phoneEgp.test(this.changeTele)) {
        // 调取接口
        let res = await this.Http.$get({
          url: "/data/sendBindingVerificationCode",
          data: {
            cellphoneNumber: this.changeTele
          }
        });
        if (parseInt(res.status) >= 200 && parseInt(res.status) < 300) {
          this.$alert.info({
            content: "已发送",
            schema: "success",
            duration: 2
          });
          let time = 60;
          this.isDisable = true;
          this.timer = setInterval(() => {
            --time;
            Dom.value = "重新获取" + time;
            if (time == 0) {
              Dom.value = "获取验证码";
              clearInterval(this.timer);
              this.isDisable = false;
            }
          }, 1000);
        }
      } else if (this.changeTele.trim() == "") {
        this.$alert.info({
          content: "请输入手机号",
          schema: "error",
          duration: 2
        });
      } else if (!phoneEgp.test(this.changeTele)) {
        this.$alert.info({
          content: "号码格式有误",
          schema: "error",
          duration: 2
        });
      }
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
.person-change-tele {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eeeff1;
}
.changeTele {
  width: 100%;
  height: 6rem;
  border: 0;
  outline: 0;
  color: #333333;
  font-size: 1.5rem;
}
.input-group {
  padding: 0 1.5rem;
  box-sizing: border-box;
  overflow: hidden;
  background: #fff;
  width: 100%;
  position: relative;
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
  z-index: 1;
}

.changeTele::placeholder {
  font-size: 1.5rem;
  color: #cccccc;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.lineT {
  border-top: 0.05rem solid #eeeff1;
}

.getCode {
  position: absolute;
  color: #0db29d;
  font-size: 1.6rem;
  border: 0;
  outline: 0;
  bottom: 2rem;
  background: transparent;
  right: 1.5rem;
}
.isDisable {
  color: #cccccc;
}
</style>