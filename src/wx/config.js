import Http from '../config/axios';
import Browser from '../config/Browser';
import wx from 'weixin-jsapi'

function MyReady(params) {
    try {
        (async () => {
            let {
                data
            } = await Http.$get({
                url: '/data/weixin/jsapisignature',
                data: {
                    url: window.location.href
                }
            })
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: parseInt(data.timestamp), // 必填，生成签名的时间戳
                nonceStr: data.randomString, // 必填，生成签名的随机串
                signature: data.signature, // 必填，签名

                jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表
            });
            // 每个页面都需要先配置
            wx.ready(function () { //需在用户可能点击分享按钮前就先调用
                let query = window.location.search.substring(1);
                let url = params.url ? 'http://enterprise.ducis.cn' + params.url + '?' + query : window.location.href;
                
                if (wx.updateAppMessageShareData) {
                    wx.updateAppMessageShareData({
                        // code...
                        title: params.title, // 分享标题
                        desc: params.desc || '', // 分享描述
                        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://enterprise.ducis.cn/icon400.jpg', // 分享图标
                        success: function () {
                        }
                    });
                } else {
                    wx.onMenuShareAppMessage({
                        // code...
                        title: params.title, // 分享标题
                        desc: params.desc || '', // 分享描述
                        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://enterprise.ducis.cn/icon400.jpg', // 分享图标
                        success: function () {
                        }
                    });
                }
                //分享给朋友圈
                if (wx.updateTimelineShareData) {
                    wx.updateTimelineShareData({
                        // code...
                        title: params.title, // 分享标题
                        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://enterprise.ducis.cn/icon400.jpg', // 分享图标
                        success: function () {
                        }
                    });
                } else {
                    wx.onMenuShareTimeline({
                        // code...
                        title: params.title, // 分享标题
                        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://enterprise.ducis.cn/icon400.jpg', // 分享图标
                        success: function () {
                        }
                    });
                }
            });
        })()
    } catch (error) {
        console.error('微信签名获取失败' + error);
    }


}




export default {
    wx,
    MyReady
};