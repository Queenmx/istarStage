import axios from "axios";
import Qs from "qs";
import { baseUrl, KEY } from "../config";
import { strEnc, strDec } from "./aes.js";
axios.interceptors.request.use(
  config => {
    console.log(config);
    // 这里的config包含每次请求的内容
    // config.data.appKey = 1;
    // config.data.sign = 1;
    // config.data.timestamp = new Date().valueOf();
    // config = {
    //   appKey: 1,
    //   sign: "",
    //   timestamp: new Date().valueOf(),
    //   data: config
    // };
    // 判断localStorage中是否存在api_token
    // if (localStorage.getItem('api_token')) {
    //     //  存在将api_token写入 request header
    //     config.headers.apiToken = `${localStorage.getItem('api_token')}`;
    // }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// axios.interceptors.response.use(response => {
//     return response
// }, error => {
//     return Promise.resolve(error.response)
// });

function fetch(url, params) {
  return new Promise((resolve, reject) => {
    //这里做加密
    params.params = strEnc(params.params, KEY);
    let allParams = {
      appKey: 1,
      sign: "",
      timestamp: new Date().valueOf(),
      data: params.params
    };
    axios
      .post(baseUrl + url, allParams, {
        headers: {
          ACCESS_TOKEN: localStorage.getItem("api_token")
        }
      })
      .then(function(response) {
        if (response.data.code == 200) {
          response.data.data = JSON.parse(strDec(response.data.data, KEY));
        }

        resolve(response.data);
      })
      .catch(function(error) {
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
  params = JSON.stringify(params);
  return fetch("/base/updatePwd", { params });
};
