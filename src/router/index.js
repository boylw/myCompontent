import VueRouter from 'vue-router';
import '../css/index.css';

const index = resolve => require(['@/components/index.vue'], resolve);
const login = resolve => require(['@/components/login.vue'], resolve);
const welfare = resolve => require(['@/components/RouterComponents/welfare.vue'], resolve);
const not = resolve => require(['@/components/not.vue'], resolve);
const visual = resolve => require(['@/components/RouterComponents/visual_design.vue'], resolve);
const bwebsite = resolve => require(['@/components/RouterComponents/brand_website.vue'], resolve);
const activity = resolve => require(['@/components/RouterComponents/h5_activity.vue'], resolve);
const coperate = resolve => require(['@/components/RouterComponents/content_operate.vue'], resolve);
const msystem = resolve => require(['@/components/RouterComponents/member_system.vue'], resolve);
const bchain = resolve => require(['@/components/RouterComponents/block_chain.vue'], resolve);
const bdata = resolve => require(['@/components/RouterComponents/big_data.vue'], resolve);
const splatform = resolve => require(['@/components/RouterComponents/synthetical_platform.vue'], resolve);
const home = resolve => require(['@/components/RouterComponents/home.vue'], resolve);
const homeNew = resolve => require(['@/components/RouterComponents/RouterSecondaryView/homeNew.vue'], resolve);
const homeChit = resolve => require(['@/components/RouterComponents/RouterSecondaryView/homeChit.vue'], resolve);
const homeActive = resolve => require(['@/components/RouterComponents/RouterSecondaryView/homeActive.vue'], resolve);
const personInfo = resolve => require(['@/components/RouterComponents/RouterSecondaryView/personInfo.vue'], resolve);
const personChangeName = resolve => require(['@/components/RouterComponents/RouterSecondaryView/personChangeName.vue'], resolve);
const personChangeTele = resolve => require(['@/components/RouterComponents/RouterSecondaryView/personChangeTele.vue'], resolve);
const homeCoupon = resolve => require(['@/components/RouterComponents/RouterSecondaryView/homeCoupon.vue'], resolve);

const router = new VueRouter({
    mode: 'history',
    base: '/page/',
    routes: [{
            name: 'index',
            path: '/',
            component: index
        }, // 首页
        {
            name: 'index',
            path: '/index',
            component: index
        }, // 首页
        {
            name: 'login',
            path: '/login',
            component: login
        },
        {
            name: 'visual',
            path: '/index/visual_design',
            component: visual
        }, // 首页二级页面->视觉设计
        {
            name: 'bwebsite',
            path: '/index/brand_website',
            component: bwebsite
        }, // 首页二级页面->品牌官网
        {
            name: 'activity',
            path: '/index/h5_activity',
            component: activity
        }, // 首页二级页面->h5 活动
        {
            name: 'coperate',
            path: '/index/content_operate',
            component: coperate
        }, // 首页二级页面->内容运营
        {
            name: 'msystem',
            path: '/index/member_system',
            component: msystem
        }, // 首页二级页面->会员系统
        {
            name: 'bchain',
            path: '/index/block_chain',
            component: bchain
        }, // 首页二级页面->区块链
        {
            name: 'bdata',
            path: '/index/big_data',
            component: bdata
        }, // 大数据
        {
            name: 'splatform',
            path: '/index/synthetical_platform',
            component: splatform
        }, // 综合平台
        {
            name: 'welfare',
            path: '/welfare',
            component: welfare
        }, // 福利
        {
            name: 'home',
            path: '/home',
            component: home
        }, // 个人中心
        {
            name: 'homeNew',
            path: '/home/new',
            component: homeNew
        }, // 个人中心二级页 -> 消息
        {
            name: 'homeChit',
            path: '/home/chit',
            component: homeChit
        }, // 个人中心二级页 -> 优惠券
        {
            name: 'homeActive',
            path: '/home/active',
            component: homeActive
        }, // 个人中心二级页 -> 优惠券
        {
            name: 'personInfo',
            path: '/home/personInfo',
            component: personInfo
        }, // 个人信息二级页 -> 信息展示编辑
        {
            name: 'personChangeName',
            path: '/home/personChangeName',
            component: personChangeName
        },// 个人信息三级页 -> 修改昵称
        {
            name: 'personChangeTele',
            path: '/home/personChangeTele',
            component: personChangeTele
        },// 个人信息三级页 -> 修改手机号
        {
            name: 'homeCoupon',
            path: '/home/chit/homeCoupon',
            component: homeCoupon
        },
        {
            name: 'not',
            path: '/not',
            component: not
        },
        {
            path: '*',
            component: not
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (JSON.stringify(to.query) != '{}' && JSON.stringify(from.query) == '{}') {
        next();
    } else if (JSON.stringify(to.query) == '{}' && JSON.stringify(from.query) != '{}') {
        let query = from.query
        next({
            path: to.path,
            query: query
        });
    } else {
        next();
    }
})

// 全局解析守卫 导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后,解析守卫被调用
router.beforeResolve((to, from, next) => {
    if (to.name == undefined) {
        let goLink = to.path.substr(1);
        if (goLink.indexOf('http://') == -1 && goLink.indexOf('https://') == -1) {
            next();
        } else if (goLink.indexOf('http://') != -1 || goLink.indexOf('https://') != -1){
            window.location.href = goLink;
        }
    } else {
        next();
    }
})

export default router