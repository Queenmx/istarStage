
import Vue from 'vue'
import axios from "axios";
import Qs from "qs";
import { baseUrl, KEY } from "../config";
import { strEnc, strDec } from "./aes.js";

function fetch(url, params) {
    return new Promise((resolve, reject) => {
        //这里做加密
        params.params = strEnc(params.params, KEY);
        let allParams = {
            appKey: "pro-1530002889-d",
            sign: "4a82b4b0724c14550edf7db91e3411e6",
            timestamp: new Date().valueOf(),
            data: params.params
        };
        axios
            .post(baseUrl + url, allParams, {
                headers: {
                    ACCESS_TOKEN: localStorage.getItem("api_token")
                }
            })
            .then(function (response) {
                if (response.data.code == 200) {
                    if (response.data.data) {
                        response.data.data = JSON.parse(strDec(response.data.data, KEY));
                    }
                    console.log(response.data.data);
                } else if (response.data.code == 403) {
                    this.$router.push({ path: '/login' })
                }
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
//用户登录接口
export const getUser = params => {
    params = JSON.stringify(params);
    return fetch("base/pwdLogin", { params });
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
export const HomeInfo = params => {
    params = JSON.stringify(params);
    return fetch('repayment/home', { params })
}
// 用户过滤
export const filterUser = params => {
    params = JSON.stringify(params);
    return fetch("", { params });
}