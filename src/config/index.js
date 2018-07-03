let baseUrl,
  baseUrl2 = "";
let routerMode = "history";
let imgBaseUrl = "http://xrjf.oss-cn-shanghai.aliyuncs.com/";
const KEY = "XFS20180504XCRMM";
if (process.env.NODE_ENV === "development") {
  baseUrl = "http://whxr.free.ngrok.cc/";
} else if (process.env.NODE_ENV === "production") {
  baseUrl = "http://fsapi.starjrcs.com:8887/";
  baseUrl2 = "http://marketoa.istarcredit.com:8185/"; //正式地址
} else if (process.env.NODE_ENV === "testing") {
  baseUrl = "http://wuhanxingrong.vicp.io:8890/"; //测试地址
}
export { baseUrl, baseUrl2, routerMode, imgBaseUrl, KEY };
