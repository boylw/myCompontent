import Notice from '@/components/overall/notice.vue';
import Vue from 'vue';

Notice.getInstance = props => {
    // 创建一个Vue实例
    const newV = new Vue({
        render(h) {
            return h(Notice, {props});
        }
    }).$mount()
    // 挂载在页面body上
    document.body.appendChild(newV.$el); // 真实Dom

    // 获得notice实例
    const notice = newV.$children[0]; // 虚拟的Dom
    return notice;
}

// 设计一个单例模式
let msgInstance = null;
function getInstance() { 
    msgInstance = msgInstance || Notice.getInstance(); 
    return msgInstance;
}

// 暴露对象
export default {
    info({duration=2,content='',schema='default'}){
        getInstance().add({
            duration,
            content,
            schema
        })
    }
}