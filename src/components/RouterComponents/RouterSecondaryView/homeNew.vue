<template>
  <div id="PAGE">
    <div
      :class="['new-box', dialogLoginFlag==false ? '' : 'notScroll']"
      ref="newBox"
      style="transtion:all 0.3s;"
    >
      <div class="loadMsg" ref="loadMsg"></div>

      <div class="newMsgBox">
        <!-- 显示最后一条数据 -->

        <transition-group name="fade" ref="oldQuestBox" style="overflow:hidden;" tag="div">
          <div
            v-for="item in OldQuestionList"
            :key="item.id"
            :class=" {'chat-r':item.pos=='right', 'chat-l':item.pos=='left'}"
          >
            <p v-if="item.pos=='right'">{{item.val}}</p>
            <p v-if="item.pos=='left'">
              <img :src="item.src" v-if="item.src" alt>
              <i v-if="item.val!=''">{{item.val}}</i>
            </p>
          </div>
        </transition-group>

        <div class="chat-l" ref="guessChat">
          <p>你好，我是您的专属客服，很高兴为您服务。你可以直接向我提问，我将尽力为您解答~</p>
        </div>

        <div class="chat-card" ref="chatCard">
          <div class="chat-card-icon"></div>
          <div class="chat-card-list">
            <ul>
              <li
                :class="{'line-b': index == guessQL.length-1}"
                v-for="(item,index) in guessQL"
                :key="item.id"
                @click="guessSubmit(item.id, $event)"
              >{{item.val}}</li>
            </ul>
          </div>
        </div>

        <div ref="chatBox" :class="[hasOldNew == true ? 'chatBox' : 0]">
          <!-- 聊天框 -->
          <div
            v-for="item in newQuestionList"
            :key="item.id"
            :class=" {'chat-r':item.pos=='right', 'chat-l':item.pos=='left'}"
          >
            <p v-if="item.pos=='right'">{{item.val}}</p>
            <p v-if="item.pos=='left'">
              <img :src="item.src" v-if="item.src" alt>
              <i v-if="item.val!=''">{{item.val}}</i>
            </p>
          </div>
        </div>
      </div>

      <div class="new-input">
        <input type="text" placeholder="点击提问客服" v-model="question" @blur="resetDiv">
        <p class="newSend" @click="submitNew">
          <i id="newSend" class="newSend-icon"></i>
        </p>
      </div>
    </div>

    <!-- login弹窗 -->
    <w-dialog
      @getPhone="getPhone"
      @volidate="volidate"
      @closeDialog="close"
      :showDialog="dialogLogin"
    ></w-dialog>
  </div>
</template>

<script>
import("../../../css/home/new.css");
import aboutYT from "@/images/about-YT.png";
import linkYT from "@/images/link-YT.png";
export default {
  data() {
    return {
      question: "", // 提问框
      questionList: [], // 历史对话
      guessQL: [
        {
          id: 0,
          val: "您想联系我们或者获取准确报价？"
        },
        {
          id: 1,
          val: "您想确认活动结果？"
        },
        {
          id: 2,
          val: "关于有条？"
        }
      ], // 猜你想问,
      disabled: false,
      dialogLogin: false, // 弹窗关闭控制 false 关
      phone: "",
      dialogLoginFlag: true, // 是否登录控制
      messageAxiosData: 0, // 总页数
      messageCurrentData: 0,
      newQuestionList: [],
      OldQuestionList: [], // 旧数据集合
      hasOldNew: false
    };
  },
  created() {
    this.loginHeadlerVilidate();
    this.wxMyReady({
      title: "有条企服",
      desc: "百分百服务，助力企业数字化转型"
    });
  },
  methods: {
    async submitNew() {
      if (this.question.trim() != "" && !this.dialogLoginFlag) {
        // 如果存在令牌，并且输入问题不为空
        this.newQuestionList.push({
          id: this.newQuestionList.length,
          pos: "right",
          val: this.question
        });
        let question = this.question;
        // 留言接口
        await this.Http.$post({
          url: "/data/message/",
          data: {
            content: this.question
          }
        });
        this.question = "";
        setTimeout(() => {
          this.newQuestionList.push({
            id: this.newQuestionList.length,
            pos: "left",
            val:
              "已收到您的消息，工作人员将在48小时内回复您，感谢关注，如需实时回复，请联系您的专属产品经理。"
          });
          this.scrollToBottom();
        }, 500);
      } else if (this.question.trim() == "") {
        this.$alert.info({
          content: "信息不能为空",
          schema: "error",
          duration: 2
        });
      } else {
        this.dialogLogin = true;
        window.scrollTo(0, 0);
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        setTimeout(() => {
          var scrollTop = this.$el.querySelector(".new-box");
          scrollTop.scrollTop = scrollTop.scrollHeight;
        }, 13);
      });
    },
    guessSubmit(id, event) {
      this.newQuestionList.push({
        id: this.newQuestionList.length,
        pos: "right",
        val: event.target.innerText
      });
      if (id == 0) {
        setTimeout(() => {
          this.newQuestionList.push({
            id: this.newQuestionList.length,
            pos: "left",
            val: "",
            src: linkYT
          });
          this.scrollToBottom();
        }, 500);
      } else if (id == 1) {
        setTimeout(() => {
          this.newQuestionList.push({
            id: this.newQuestionList.length,
            pos: "left",
            val:
              "您可以进入官网的“个人中心”点击“我的活动”进入，可以查看您所参与的所有活动，点击相应的活动进入活动页面，请根据具体活动所说明的具体活动规则来确认活动结果与兑换方式，如上述方法依旧不能解决您的疑问，您可选择联系我们获取帮助，联系方式请点击联系我们获取。"
          });
          this.scrollToBottom();
        }, 500);
      } else if (id == 2) {
        setTimeout(() => {
          this.newQuestionList.push({
            id: this.newQuestionList.length,
            pos: "left",
            val: "",
            src: aboutYT
          });
          this.scrollToBottom();
        }, 500);
      }
    },
    getValue(value) {
      this.codeList.map((item, index) => {
        if (index == value.index && value.val != "") {
          item.val = value.val;
        }
      });
      this.code = this.codeList;
    },
    async volidate(code) {
      let res = await this.Http.$post({
        url: "/data/login",
        data: {
          cellphoneNumber: this.phone,
          code: code
        }
      });
      if (res.status >= 200 && res.status < 300) {
        this.dialogLogin = false;
        this.dialogLoginFlag = false;
        this.$alert.info({
          content: "登录成功",
          schema: "success"
        });

        this.loadMessage(this.messageCurrentData);
        // 清空session
        this.$session.remove("phones");
      } else {
        this.$alert.info({
          content: "验证码有误",
          schema: "error"
        });
        this.resetDiv();
      }
    },
    getPhone(value) {
      this.phone = value;
    },
    close() {
      this.dialogLogin = false;
      this.resetDiv();
    },
    async loginHeadlerVilidate() {
      // 登录判断
      let res = await this.Http.$get("/data/my");
      if (res.status >= 200 && res.status < 300) {
        let { data } = res;
        if (data.cellphoneNumber) {
          this.dialogLoginFlag = false;
          this.loadMessage(0);
        } else {
          this.dialogLoginFlag = true;
        }
      }
    },
    async loadMessage(number) {
      // 加載消息
      let res = await this.Http.$get({
        url: "/data/message",
        data: { number: number, size: 5 }
      });
      let contentArr = res.data.data;
      // 先获取最后一条旧数据
      this.messageAxiosData = res.data.total;
      for (let j = 0; j <= contentArr.length - 1; j++) {
        let content = contentArr[j].content;
        if (contentArr[j].message) {
          this.OldQuestionList.unshift({
            id: this.OldQuestionList.length,
            pos: "right",
            val: content
          });
        } else {
          this.OldQuestionList.unshift({
            id: this.OldQuestionList.length,
            pos: "left",
            val: content
          });
        }
      }
      // 先加载，加载完在滚动到底部
      if (this.messageCurrentData == 0) {
        this.scrollToBottom();
      } else {
        this.$nextTick(() => {
          setTimeout(() => {
            var scrollTop = this.$el.querySelector(".new-box");
            scrollTop.scrollTop = 400;
          }, 13);
        });
      }

      // 只有当它请求完了才能请求下一次
      this.flag = true;

      // 加载完后可以滚动
      this.$refs.newBox.addEventListener("scroll", this.handleTouchMove);
    },
    handleTouchMove(e) {
      let scrollTop = this.$refs.newBox.scrollTop;
      let clientHeight = this.$refs.newBox.clientHeight;
      // 如果总页数大于当前页数，说明还有历史记录
      if (scrollTop < 200 && this.flag) {
        this.flag = false;
        this.messageCurrentData += 1;
        // 预设50像素的
        if (this.messageAxiosData > this.messageCurrentData) {
          this.loadMessage(this.messageCurrentData);
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
  watch: {
    questionList: {
      handler(newV, oldV) {
        //   用sessionStore 进行保存提过的问题
        // this.$session.set("questionList", this.questionList);
        if (this.$refs.newBox) {
          this.$nextTick(async () => {
            let domScroll = this.$refs.newBox;
            domScroll.scrollTop = domScroll.scrollHeight;
          });
        }
      },
      immediate: true,
      deep: true
    },
    dialogLogin(newValue) {
      return newValue;
    },
    messageCurrentData(newValue) {
      return newValue;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.chatBox.style.height = 
        parseInt(this.$refs.newBox.clientHeight) -
        parseInt(this.$refs.chatCard.clientHeight) -
        parseInt(this.$refs.guessChat.clientHeight) - 150 + 'px';
    });

    if (!this.dialogLoginFlag) {
      this.scrollToBottom();
    }
  }
};
</script>


