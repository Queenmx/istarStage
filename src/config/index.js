let baseUrl;
let routerMode = "history";
let imgBaseUrl = "http://xrjf.oss-cn-shanghai.aliyuncs.com/";
const KEY = "pro-1530002889-d";
if (process.env.NODE_ENV === "development") {
<<<<<<< HEAD
  baseUrl = "http://whxr.free.ngrok.cc/";
=======
    baseUrl = "http://whxr.free.ngrok.cc";
>>>>>>> a0462d261be5577a4987184de2312cf8085ec788
} else if (process.env.NODE_ENV === "production") {
    baseUrl = "http://fsapi.starjrcs.com:8887/";//正式地址
} else if (process.env.NODE_ENV === "testing") {
    baseUrl = "http://wuhanxingrong.vicp.io:8890/"; //测试地址
}
export { baseUrl, routerMode, imgBaseUrl, KEY };
