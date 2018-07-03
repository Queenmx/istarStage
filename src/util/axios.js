import axios from "axios";
import Qs from "qs";
import { baseUrl, KEY } from "../config";
import { strEnc, strDec } from "./aes.js";

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
