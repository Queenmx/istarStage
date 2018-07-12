import Vue from "vue";
import axios from "axios";
import { router } from "../router";
import Qs from "qs";
import { baseUrl, KEY } from "../config";
import { strEnc, strDec } from "./aes.js";
function fetch(url, params) {
    return new Promise((resolve, reject) => {
        //这里做加密
        params.params = strEnc(params.params, KEY);
        let allParams = {
            // appKey: "pro-1530002889-d",
            appKey: "PRO0711-01-m",
            sign: "4a82b4b0724c14550edf7db91e3411e6",
            timestamp: new Date().valueOf(),
            data: params.params
        };
        axios
            .post(baseUrl + url, allParams, {
                headers: {
                    // ACCESS_TOKEN: localStorage.getItem("api_token"),
                    TOKEN: localStorage.getItem("api_token")
                }
            })
            .then(response => {
                if (response.data.code == 200) {
                    if (response.data.data) {
                        try {
                            response.data.data = JSON.parse(strDec(response.data.data, KEY));
                        } catch (e) {
                            response.data.data = strDec(response.data.data, KEY);
                        }
                        // response.data.data = JSON.parse(strDec(response.data.data, KEY));
                        // console.log(response.data.data)
                    }
                } else if (response.data.code == 403) {
                    router.push({ path: "/login" });
                }
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}
//账号登录
export const getUser = params => {
    params = JSON.stringify(params);
    return fetch("base/pwdLogin", { params });
};
//验证码登录
export const loginByCode = params => {
    params = JSON.stringify(params);
    return fetch("base/loginByCode", { params });
};
// 设置新密码
export const updatePwd = params => {
    params = JSON.stringify(params);
    return fetch("base/updatePwd", { params });
};
// 意见反馈
export const addOpinion = params => {
    params = JSON.stringify(params);
    return fetch("other/addOpinionFeedback", { params });
};
//发送验证码
export const sendValidateCode = params => {
    params = JSON.stringify(params);
    return fetch("base/sendValidateCode", { params });
};
// 首页
export const HomeStatus = params => {
    params = JSON.stringify(params);
    return fetch("repayment/home", { params });
};
// 用户过滤
export const filterUser = params => {
    params = JSON.stringify(params);
    return fetch("proInfo/filter", { params });
};
// 基本信息查询
export const baseInfo = params => {
    params = JSON.stringify(params);
    return fetch("proInfo/base", { params });
};
//注册
export const registerByCusPhone = params => {
    params = JSON.stringify(params);
    return fetch("base/registerByCusPhone", { params });
};
//设置密码
export const setPassword = params => {
    params = JSON.stringify(params);
    return fetch("base/setPassword", { params });
};
//实名认证
export const realNameAuth = params => {
    params = JSON.stringify(params);
    return fetch("base/realNameAuth", { params });
};

//忘记密码
export const VaCodeAndPhone = params => {
    params = JSON.stringify(params);
    return fetch("base/VaCodeAndPhone", { params });
};
//消息列表
export const getMessageList = params => {
    params = JSON.stringify(params);
    return fetch("other/getMessageList", { params });
};
//是否有新消息
export const isNewMsg = params => {
    params = JSON.stringify(params);
    return fetch("other/isNewMsg", { params });
};

//消息标记为已读
export const updateIsRead = params => {
    params = JSON.stringify(params);
    return fetch("other/updateIsRead", { params });
};
// 借款记录
export const loanRecord = params => {
    params = JSON.stringify(params);
    return fetch("/repayment/loan", { params });
};
// 订单详情
export const repaymentDetail = params => {
    params = JSON.stringify(params);
    return fetch("/repayment/repaymentDetail", { params });
};
//资料列表是否认证
export const datum = params => {
    params = JSON.stringify(params);
    return fetch("proInfo/apply", { params });
};
//申请信息认证-返回条件
export const returnOption = params => {
    params = JSON.stringify(params);
    return fetch("basicInfo/returnOption", { params });
};

//申请信息认证-查询用户填写信息
export const getByCusId = params => {
    params = JSON.stringify(params);
    return fetch("basicInfo/getByCusId", { params });
};

//申请信息认证-提交填写信息
export const ApplicationInfo = params => {
    params = JSON.stringify(params);
    return fetch("basicInfo/ApplicationInfo", { params });
};

//申请信息认证-人际关系
export const relationship = params => {
    params = JSON.stringify(params);
    return fetch("contanctInfo/saveContact", { params });
};

//申请信息认证-人际关系信息获取
export const getrelation = params => {
    params = JSON.stringify(params);
    return fetch("contanctInfo/getByCusId", { params });
};
// 试算
export const calcu = params => {
    params = JSON.stringify(params);
    return fetch("proInfo/calcu", { params });
};
// 查询产品详细配置信息
export const proDetail = params => {
    params = JSON.stringify(params);
    return fetch("proInfo/config", { params });
};
// 推单
export const orderApply = params => {
    params = JSON.stringify(params);
    return fetch("/order/apply", { params });
};
// 获取认证url接口
export const getAuthUrl = params => {
    params = JSON.stringify(params);
    return fetch("/infoAuth/collect", { params });
};
// 申请认证-身份认证
export const certAuth = params => {
    params = JSON.stringify(params);
    return fetch("identity/idcard", { params })
}
