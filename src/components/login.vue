<template>
  <div id="PAGE">
    <div class="main_box">
      <div class="login_banner">欢迎来到有条！</div>
      <div class="login_main">
        <div class="login_item_panel">手机号</div>
        <div class="input_item_phone">
          <span>+86</span>
          <input
            class="fs-48"
            type="number"
            placeholder="请输入手机号"
            v-model="telephone"
            @blur="resetDiv"
          >
        </div>
        <div class="login_item_panel">验证码</div>
        <div class="input_item_code">
          <input class="fs-48" type="text" placeholder="请输入验证码" v-model="code" @blur="resetDiv">
          <input
            type="button"
            :class="['Cbutton-code',telephone.length == 11 ? '': 'disabled', isDisable == true? 'timeDis' : '', 'fr']"
            @click="getCode"
            :disabled="isDisable"
            value="获取验证码"
            @blur="resetDiv"
          >
        </div>
      </div>
      <div class="login_button tc">
        <span
          :class="['Cbutton-confirm', code.length == 4 ? '' : 'disabled']"
          @click="submitLogin"
        >登录</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      telephone: "",
      code: "",
      isDisable: false
    };
  },
  methods: {
    async getCode(e) {
      let Dom = e.target;
      let phoneEgp = /^[1]([3-9])[0-9]{9}$/;
      if (this.telephone.trim() != "" && phoneEgp.test(this.telephone)) {
        // 调取接口
        let res = await this.Http.$get({
          url: "/data/sendLoginVerificationCode",
          data: {
            cellphoneNumber: this.telephone
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
            Dom.value = time + "s重新获取";
            if (time == 0) {
              Dom.value = "重新获取";
              clearInterval(this.timer);
              this.isDisable = false;
            }
          }, 1000);
        }
      } else if (this.telephone.trim() == "") {
        this.$alert.info({
          content: "请输入手机号",
          schema: "error",
          duration: 2
        });
      } else if (!phoneEgp.test(this.telephone)) {
        this.$alert.info({
          content: "号码格式有误",
          schema: "error",
          duration: 2
        });
      }
    },
    async submitLogin() {
      // 提交登录
      if (this.telephone.trim() == "") {
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
      let res = await this.Http.$post({
        url: '/data/login',
        data: {
          cellphoneNumber: this.telephone,
          code: this.code
        }
      })

      if (parseInt(res.status) >= 200 && parseInt(res.status) < 300) {
        this.$alert.info({
          content: "登录成功",
          schema: "success",
          duration: 2
        });
        this.$router.push({ path: "/home" });
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
  watch: {
    code(newValue, oldValue) {
      return newValue;
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="css" scoped>
.main_box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  padding: 5rem 3.12rem 0 3.12rem;
  box-sizing: border-box;
}
.login_banner {
  font-size: 3rem;
  color: #1a1a1a;
}
.login_main {
  margin-top: 5.2rem;
}

.login_item_panel {
  color: #1a1a1a;
  font-size: 1.5rem;
  margin-top: 3rem;
}
.input_item_phone {
  padding: 1.5rem 0;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}
.input_item_phone > span {
  display: inline-block;
  font-size: 1.5rem;
  width: 6rem;
}
.input_item_code {
  padding: 1.5rem 0;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
}

.login_button {
  margin-top: 5rem;
}
.Cbutton-code {
  font-size: 1.2rem !important;
  text-align: center;
  background: #0db29d;
  color: #ffffff;
  padding: 0 1.5rem;
  height: 3.5rem;
  line-height: 3.5rem;
  border-radius: 2.7rem;
  min-width: 9rem;
  box-sizing: border-box;
}
.Cbutton-code.disabled {
  background: #8ee0cf;
}
.timeDis {
  color: #999999;
  background: transparent;
  border: 0.05rem solid #999;
}
.Cbutton-confirm {
  display: inline-block;
  width: 32rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
  border-radius: 2.7rem;
  background: #0db29d;
  font-size: 1.6rem;
  color: #ffffff;
}
.Cbutton-confirm.disabled {
  background: #8ee0cf;
}
.login_button {
  display: flex;
  align-items: center;
  justify-content: center;
}
.fs-48 {
  font-size: 2.4rem !important;
  width: 80%;
}

.fs-48::placeholder {
  font-size: 1.8rem;
}

</style>