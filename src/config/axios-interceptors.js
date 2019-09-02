import axios from 'axios';
import notice from '@/server/notaic'
import router from '../router';

axios.interceptors.request.use((request) => {
    // 请求拦截器  request 为请求实例
    return request;
})

axios.interceptors.response.use(response => {
    // 请求拦截器  response 为响应实例
    return response;
    console.log('====================================');
    console.log(response);
    console.log('====================================');
}, err => {
    // err 为错误实例 err.response 为错误响应实例
    console.log('====================================');
    console.log(err.response);
    console.log('====================================');
    console.log('====== ### 错误输出日志 ###  ========');
    axios.errMsg = {
        'url': err.response && err.response.config.url,
        'status': err.response && err.response.data.status || err.response.status,
        '错误原因为': err.response && err.response.data.error,
        '错误提示为': err.response && err.response.data.message,
        '错误接口为': err.response && err.response.data.path,
        '提示': '请检查当前页面的接口处理'
    };

    if(parseInt(axios.errMsg['status']) >= 400 && parseInt(axios.errMsg['status']) < 500 && parseInt(axios.errMsg['status'])!=404) {
        if (err.response && err.response.data && err.response.data.toString().length <= 8) {
            notice.info({
                content: err.response.data,
                schema: "error",
            })
        }else if(parseInt(axios.errMsg['status']) == 401) {
            router.go(0);
        }
    } else if (parseInt(axios.errMsg['status']) >= 500) {
        notice.info({
            content: '服务器有误',
            schema: "error",
        })
    } else if (parseInt(axios.errMsg['status']) == 404) {
        // notice.info({
        //     content: '接口不存在',
        //     schema: "error",
        // })
    }
})