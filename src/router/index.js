import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import sign from '@/pages/sign'
import setpsd from '@/pages/setpsd'
import forget from '@/pages/forget'
import certification from '@/pages/certification'
import index from '@/pages/index'
import product from '@/pages/index/product'
import productdetail from '@/pages/index/productdetail'
import personcenter from '@/pages/index/personcenter'
import setting from '@/pages/index/setting'
import respwd from '@/pages/index/respwd'
import question from '@/pages/index/question'
import opinion from '@/pages/index/opinion'
import changetel from '@/pages/index/changetel'
import aboutus from '@/pages/index/aboutus'
import quesDetail from '@/pages/index/quesDetail'

import certAuth from '@/pages/application/cert_auth'
import applyInfo from '@/pages/application/apply_info'
import otherInfo from '@/pages/application/other_info'
import humanRelation from '@/pages/application/human_relation'
import creditAuth from '@/pages/application/credit_auth'
import success from '@/pages/success'
import verify from '@/pages/verify'
import record from '@/pages/progress/record'
import assetsPage from '@/pages/application/assetsPage'
import progress from '@/pages/progress/progress'
import order from '@/pages/progress/order'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            component: index
        },
        {
            path: "/login",
            component: login
        },
        {
            path: "/sign",
            component: sign
        },
        {
            path: '/setpsd',
            component: setpsd
        },
        {
            path: '/forget',
            component: forget
        },
        {
            path: '/certification',
            component: certification
        },
        {
            path: '/index/product',
            component: product
        },
        {
            path: '/index/productdetail',
            component: productdetail
        },
        {
            path: '/index/personcenter',
            component: personcenter
        },
        {
            path: '/index/setting',
            component: setting
        },
        {
            path: '/index/respwd',
            component: respwd
        },
        {
            path: '/index/question',
            component: question
        },
        {
            path: '/index/opinion',
            component: opinion
        },
        {
            path: '/index/changetel',
            component: changetel
        },
        {
            path: '/index/aboutus',
            component: aboutus
        },
        {
            path: '/index/quesDetail',
            component: quesDetail
        },


        {
            path: '/application/cert_auth',
            component: certAuth
        },
        {
            path: '/application/apply_info',
            component: applyInfo
        },
        {
            path: '/application/other_info',
            component: otherInfo
        },
        {
            path: '/application/human_relation',
            component: humanRelation
        },
        {
            path: '/application/credit_auth',
            component: creditAuth
        },
        {
            path: '/success',
            component: success
        },
        {
            path: '/verify',
            component: verify
        },
        {
            path: '/progress/record',
            component: record
        },
        {
            path: '/application/assetsPage',
            component: assetsPage
        },
        {
            path: '/progress',
            component: progress
        },
        {
            path: '/progress/order',
            component: order
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
})
import { getItem, setItem } from "../util/util";
// setItem("userInfo",{'phone':'1232321321323'})
router.beforeEach((to, from, next) => {
    if (to.path !== "/login" && !getItem("userInfo")) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        next({
            path: "/login"
        });
    } else {
        next(); // 确保一定要调用 next()
    }
});
export { router };
