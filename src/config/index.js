let baseUrl;
let routerMode = "history";
let imgBaseUrl = "http://xrjf.oss-cn-shanghai.aliyuncs.com/";
const KEY = "JJPT@20200606@H5";
if (process.env.NODE_ENV === "development") {
    // baseUrl = "http://whxr.free.ngrok.cc/";
    baseUrl = 'http://wuhanxingrong.vicp.io:28900/';
    // baseUrl = "http://192.168.0.49:8888/";

} else if (process.env.NODE_ENV === "production") {
    baseUrl = "http://fsapi.starjrcs.com:8887/";//正式地址
} else if (process.env.NODE_ENV === "testing") {
    baseUrl = "http://wuhanxingrong.vicp.io:28900/"; //测试地址
}
export { baseUrl, routerMode, imgBaseUrl, KEY };
