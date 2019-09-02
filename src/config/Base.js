const {Browser} = require ('../../config/Browser');
const Cookies = require('js-cookie');

var $F = {
    /* 匹配 */
    global: {
        local: 'http://192.168.200.145:8080',
        test: 'http://enterprise.you-tiao.com'
    },
    Browser,
    /* url参数获取 */
    getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    },
    /* 跳转方法 */
    goPage(link) {
        window.location.href = link;
    },
    /* 身份认证方法 */
    async authenticate() {
        console.log(Browser);
        let p = this.getUrlParam('p'); // 传递者信息
        let c = this.getUrlParam('c'); // 分享者信息
        if (Browser.client.name == '微信浏览器') {
            try {
                let data = await this.ajax({
                    url: '/data/m/publicity/authenticate',
                    data: {p,c},
                    type: 'post'
                })
                console.log(data);
                if (data.status == 'MISSING_CODE') {
                    // 此时缺少了code,开始认证
                    let appId = data.token;
                    let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + location.href.split('#')[0] + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
                    this.goPage(url);
                    let code = this.getUrlParam('code');
                    console.log(code);
                    if (!code) {
                        this.authenticate();
                        console.log('授权失败');
                        return;
                    } else {
                        // 再次请求
                        let res = await this.ajax({
                            url: '/data/m/publicity/authenticate',
                            data: {code,p,c},
                            type: 'post'
                        })
                        if (res.status != 'AUTHENTICATED') {
                            console.log('授权code失败');
                            this.authenticate();
                            return;
                        }else {
                            return res;
                        }
                    }
                } else {
                    return data;
                }
            } catch (error) {
                console.log('是微信身份认证请求问题'+error);
            }
        } else {
            try {
                let code = Cookies('code');
                console.log(code);
                
                if (code != undefined || !code || code!='') {
                    // 第一次
                    let data = await this.ajax({
                        url: '/data/m/publicity/authenticate',
                        data: {code,p,c},
                        type: 'post'
                    })
                    if (data.status == 'AUTHENTICATED') {
                        Cookies.set('code', data.token);
                        return data;
                    } else {
                        this.authenticate();
                        return;
                    }
                }
                
            } catch (error) {
                console.log('不是微信身份认证请求问题'+error);
            }
           
        }
    },
    /* 请求方法 */
    ajax(params) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: $F.global.test + params.url,
                type: params.type || 'get',
                dataType: 'json',
                headers: params.headers || {},
                data: params.data || {},
                success(res) {
                    resolve(res)
                },
                error(err) {
                    reject(err)
                }
            })
        })
    }
}


export {
    $F
};