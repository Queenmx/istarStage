import axios from "axios";
import Qs from "qs";
import { baseUrl, KEY } from "../config";
import { strEnc, strDec } from "./aes.js";
axios.interceptors.request.use(config => {    // 这里的config包含每次请求的内容
    // 判断localStorage中是否存在api_token
    if (localStorage.getItem('api_token')) {
        //  存在将api_token写入 request header
        config.headers.apiToken = `${localStorage.getItem('api_token')}`;
    }
    return config;
}, err => {
    return Promise.reject(err);
});
axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
});


function fetch(url, params) {
    return new Promise((resolve, reject) => {
        //这里做加密
        params.params = strEnc(params.params, KEY);
        axios
            .post(baseUrl + url, Qs.stringify(params), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(function (response) {
                if (response.data.data !== null) {
                    response.data.data = JSON.parse(strDec(response.data.data, KEY));
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

