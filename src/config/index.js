let baseUrl;
let routerMode = "history";
let imgBaseUrl = "http://xrjf.oss-cn-shanghai.aliyuncs.com/";
const KEY = "JJPT@20200606@H5";
if (process.env.NODE_ENV === "development") {
    baseUrl = "http://wuhanxingrong.vicp.io:28900/";
    //   baseUrl = "http://wuhanxingrong.vicp.io:28010/";
} else if (process.env.NODE_ENV === "production") {
    baseUrl = "http://fsapi.starjrcs.com:8887/"; //正式地址
} else if (process.env.NODE_ENV === "testing") {
    baseUrl = "http://116.62.112.21:10081/"; //测试地址
}
export { baseUrl, routerMode, imgBaseUrl, KEY };
