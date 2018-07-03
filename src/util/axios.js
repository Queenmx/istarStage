import axios from "axios";
import Qs from "qs";
import { baseUrl, baseUrl2, KEY } from "../config";
import { strEnc, strDec } from "./aes.js";
function fetch(url, params, isOa) {
  return new Promise((resolve, reject) => {
    //这里做加密
    params.params = strEnc(params.params, KEY);
    axios
      .post(baseUrl + url, Qs.stringify(params), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(function(response) {
        if (response.data.data !== null) {
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
//拜访记录列表
export const visitRecordList = params => {
  params = JSON.stringify(params);
  return fetch("visit/self/visitRecordList", { params });
};
//拜访记录增删改
export const saveVisitRecord = params => {
  params = JSON.stringify(params);
  return fetch("visit/self/saveVisitRecord", { params });
};
//私海列表
export const storeSelf = params => {
  params = JSON.stringify(params);
  return fetch("store/self", { params });
};
//申请补券
export const applyCoupon = params => {
  params = JSON.stringify(params);
  return fetch("coupon/save", { params });
};
//门店查询
export const searchStore = params => {
  params = JSON.stringify(params);
  return fetch("store/common", { params });
};
//审核状态门店列表
export const auditList = params => {
  params = JSON.stringify(params);
  return fetch("store/self/audit", { params });
};
//门店详情-门店信息
export const storeDetail = params => {
  params = JSON.stringify(params);
  return fetch("store/details/store", { params });
};
//门店详情-补券列表
export const couponList = params => {
  params = JSON.stringify(params);
  return fetch("store/details/coupon", { params });
};
//门店详情-订单列表接口
export const orderList = params => {
  params = JSON.stringify(params);
  return fetch("store/details/order", { params });
};
//公海门店
export const publicStore = params => {
  params = JSON.stringify(params);
  return fetch("store/common", { params });
};
//附近门店
export const nearbyStore = params => {
  params = JSON.stringify(params);
  return fetch("store/nearby", { params });
};
// 订单
export const storeSelfOrder = params => {
  params = JSON.stringify(params);
  return fetch("store/self/order", { params });
};
// 最近拜访记录
export const recentVisitRecord = params => {
  params = JSON.stringify(params);
  return fetch("visit/store/recentVisitRecord", { params });
};
// 拜访总次数/本周总次数
export const allVisitNum = params => {
  params = JSON.stringify(params);
  return fetch("visit/store/storeVisitRecordNum", { params });
};
// 修改密码
export const updatePwd = params => {
  params = JSON.stringify(params);
  return fetch("base/updatePwd", { params });
};
// 更改头像
export const userHead = params => {
  params = JSON.stringify(params);
  return fetch("user/userHead", { params });
};
//订单搜索
export const orderStoreSearch = params => {
  params = JSON.stringify(params);
  return fetch("store/self/order", { params });
};
//图片上传接口
export const uploadPhotos = params => {
  params = JSON.stringify(params);
  return fetch("Oss/uploadPhotos", { params });
};
//业绩排名
export const rankingInfo = params => {
  params = JSON.stringify(params);
  return fetch("ranking/rankingInfo", { params });
};
//根据ID查询督导员信息
export const userDetails = params => {
  params = JSON.stringify(params);
  return fetch("user/userDetails", { params });
};
/////////////////////////////////////////////
