import axios from "axios";
import Qs from "qs";
import { baseUrl, KEY } from "../config";
import { strEnc, strDec } from "./aes.js";

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
