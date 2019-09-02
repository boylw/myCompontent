<template>
  <div class="alert">
    <div class="alert-container" v-for="item in alerts" :key="item.id">
      <div :class='[schema,"alert-content"]'>{{ item.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alerts: [],
      schema: 'default' // 模式s
    };
  },
  created() {
    this.count = 0;
  },
  methods: {
    add(options) {
      const id = "_id" + this.count++;
      this.schema =  options.schema || 'default';
      const _alert = { ...options, id };
      this.alerts.push(_alert);
      // 延迟时间，支持传递 单位秒
      const duration = options.duration || 2;
      // 延迟关闭
      setTimeout(() => {
        this.del(id);
      }, duration * 1000);
    },
    del(idProp) {
      for (let i = 0; i < this.alerts.length; i++) {
        const { id } = this.alerts[i];
        if (id === idProp) {
          this.alerts.splice(i, 1);
          break;
        }
      }
    }
  }
};
</script>

<style scoped>
.alert {
  position: absolute;
  top: 20rem;
  left: 0;
  z-index: 1000;
  text-align: center;
  right: 0;
}
.alert-content {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  background-color: rgb(58, 58, 58);
  opacity: 0.902;
  min-width: 12.1rem;
  height: 3.7rem;
  border-radius: 0.2rem;
  font-size: 1.4rem;
  box-sizing: border-box;
}

.default {
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
}

.error {  
  color: #fff;
}

.warning {
  background: rgba(58, 11, 212, 0.671);
  color: #fff;
}

.success {
  padding: 0;
  height: 12rem;
  width: 12rem;
  color: #fff;
  padding-top: 6rem;
}

.success::before {
  content: '';
  position: absolute;
  width: 3.6rem;
  height: 3.6rem;
  background: url('../../images/success-notice.png') no-repeat center;
  background-size: 100% 100%;
  top: 2.8rem;
  left: 50%;
  margin-left: -1.8rem;
}

.loading {
  padding: 0;
  height: 12rem;
  width: 12rem;
  color: #fff;
  padding-top: 6rem;
}

.loading::before {
  content: '';
  position: absolute;
  width: 3.6rem;
  height: 3.6rem;
  background: url('../../images/loading-notice.gif') no-repeat center;
  background-size: 100% 100%;
  top: 2.8rem;
  left: 50%;
  margin-left: -1.8rem;
}

</style>

