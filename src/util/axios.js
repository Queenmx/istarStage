import axios from "axios";
import Qs from "qs";
import { baseUrl, KEY } from "../config";
import { strEnc, strDec } from "./aes.js";
axios.interceptors.request.use(config => {    // 这里的config包含每次请求的内容
    // config = {
    //     appKey: 1,
    //     sign: "e67a3e7ee713152b57b3cd6429f06ba2",
    //     timestamp: "000",
    //     data: config
    // }
    // 判断localStorage中是否存在api_token
    // if (localStorage.getItem('api_token')) {
    //     //  存在将api_token写入 request header
    //     config.headers.apiToken = `${localStorage.getItem('api_token')}`;
    // }
    return config;
}, err => {
    return Promise.reject(err);
});

function fetch(url, params) {
    return new Promise((resolve, reject) => {
        //这里做加密
        params.data = strEnc(params.data, KEY);
        axios
            .post(baseUrl + url, Qs.stringify(params), {
                headers: {
                    "ACCESS_TOKEN": localStorage.getItem('api_token')
                }
            })
            .then(function (response) {
                if (response.data.data !== null) {
                    // response.data.data = JSON.parse(strDec(response.data.data, KEY));
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
    return fetch("user/userInfo", { params });
};
// 设置新密码
export const updatePwd = params => {
    let data = JSON.stringify(params);
    return fetch("/base/updatePwd", { data });
};
