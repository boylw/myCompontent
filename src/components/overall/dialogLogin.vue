<template>
  <div class="dialog-login" v-show="show">
    
    <div class="dialog-box">
      <span class="close-dialog" @click="closeDialog"></span>
      <h3 class="dialog-box-title">登录手机</h3>
      <div class="telephone-box">
        <input type="number" placeholder="请输入手机号" v-model="phones" class="telephone" @blur="resetDiv">
        <input type="button" value="获取验证码" :disabled="disabled" class="getcode" @click="getCode" @blur="resetDiv">
      </div>
      <div class="code-group">
        <input
          type="number"
          class="code-item"
          v-for="(item,index) in codeList"
          :key="index"
          v-model="item.val"
          @keyup="nextFocus($event,index)"
          @input="inputValue($event,index)"
          @focus="getFocus($event,index)"
          maxlength="1"
          @blur="resetDiv"
        >
      </div>

      <p class="bottom-text">填写手机短信验证码</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "dialog-login",
  props: {
    showDialog: {
      type: Boolean
    }
  },
  data() {
    let phones = this.$session.get('phones');
    return {
      disabled: false,
      phones: "" || phones, // 输入的手机号
      codeList: [
        {
          val: ""
        },
        {
          val: ""
        },
        {
          val: ""
        },
        {
          val: ""
        }
      ],
      code: "" // 最后的验证码
    };
  },
  methods: {
    inputValue(el, index) {
      this.$nextTick(() => {
        let dom = el;
        if (dom.target.value.trim() != "") {
          this.code += dom.target.value;
        }
      });
    },
    nextFocus(el, index) {
      var dom = document.getElementsByClassName("code-item"),
        currInput = dom[index],
        nextInput = dom[index + 1],
        lastInput = dom[index - 1];
      var firstInput = dom[0];
      /*这里的keyCode 根据不同的平台或许不同,安卓就是不是8*/
      if (el.keyCode != 8) {
        if (index < this.codeList.length - 1) {
          nextInput.focus();
        } else {
          currInput.blur();
          if (this.code.length == 4) {
            this.$emit("volidate", this.code);
          } else {
            this.$alert.info({
              content: "验证码格式有误",
              schema: "error",
              duration: 2
            });
            setTimeout(function() {
              firstInput.focus();
            }, 100);
            this.emptyCode();
          }
        }
      } else {
        this.code = this.code.substr(0, this.code.length - 1);
        if (index != 0) {
          lastInput.focus();
        }
      }
    },
    getFocus(el, i) {
      var dom = document.getElementsByClassName("code-item");
      for (let index = parseInt(i); index < dom.length; index++) {
        const element = dom[index];
        if (element.value == "") {
          return;
        } else {
          if (element.value != "") {
            element.focus();
          }
        }
      }
    },
    async getCode(el) {
      let phoneEgp = /^[1]([3-9])[0-9]{9}$/;
      this.$session.set('phones',this.phones);
      if (this.phones.trim() == "") {
        this.$alert.info({
          content: "请输入电话",
          schema: "error",
          duration: 2
        });
        return;
      } else if (!phoneEgp.test(this.phones)) {
        this.$alert.info({
          content: "手机号格式有误",
          schema: "error",
          duration: 2
        });
      } else {
        // 调取接口
        let res = await this.Http.$get({
          url: "/data/sendLoginVerificationCode",
          data: {
            cellphoneNumber: this.phones
          }
        });

        if (res.status == 200) {
          this.$alert.info({
            content: "已发送,注意接收",
            schema: "success",
            duration: 2
          });
        }
        this.disabled = true;
        let i = 60;
        this.timer = setInterval(() => {
          el.target.value = --i + "s重新获取";
          if (i == 0) {
            this.disabled = false;
            clearInterval(this.timer);
            el.target.value = "获取验证码";
          }
        }, 1000);
        this.$emit("getPhone", this.phones);
      }
    },
    emptyCode() {
      this.code = "";
      this.codeList.map(item => {
        item.val = "";
      });
    },
    closeDialog() {
      // this.phones= '';
      this.disabled = false;
      this.emptyCode();
      this.$emit('closeDialog')
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
    show(newValue, oldValue) {
      return newValue;
    }
  },
  computed: {
    show() {
      return this.$props.showDialog;
    }
  },
};
</script>
<style scoped>
.dialog-login {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-box {
  width: 72%;
  height: 23.5rem;
  background: #fff;
  border-radius: 10px;
  position: absolute;
}

.close-dialog {
  width: 1rem;
  height: 1rem;
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  background: url("../../images/close.png") no-repeat center;
}

.dialog-box-title {
  font-size: 1.8rem;
  color: #000000;
  font-weight: 400;
  text-align: center;
  margin-top: 2.3rem;
}

.telephone-box {
  margin: 3.5rem 2.5rem 0 2.5rem;
  border-bottom: 0.05px solid #cccccc;
  height: 4rem;
  display: flex;
  justify-content: space-between;
}

.telephone {
  outline: none;
  border: 0;
  font-size: 1.6rem;
  height: 98%;
  width: 94%;
}

.telephone::placeholder {
  color: #eaeaea;
  font-size: 1.4rem;
}
.getcode {
  color: #1ec19f;
  font-size: 1.6rem;
  background: transparent;
}
.code-group {
  margin-top: 40px;
  padding: 0 2.5rem;
  display: flex;
  justify-content: space-around;
}

.code-item {
  width: 3.5rem;
  height: 3.5rem;
  background: #f5f5f5;
  text-align: center;
  font-size: 1.6rem;
  color: #000000;
}
.code-item:nth-last-of-type(1) {
  margin-right: 0;
}

.bottom-text {
  font-size: 1.2rem;
  color: #999999;
  width: 100%;
  margin: 2.3rem 0;
  text-align: center;
}
</style>