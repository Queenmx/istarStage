
export const getItem = name => {
    if (!name) return;
    let str = localStorage.getItem(name);
    try {
        return JSON.parse(str);
    } catch (error) {
        return str;
    }
};
export const setItem = (name, content) => {
    if (!name) return;
    if (typeof content !== "string") {
        // console.log("setItem" + content)
        content = JSON.stringify(content);
    }
    localStorage.setItem(name, content);
};
export const delItem = name => {
    if (!name) return;
    localStorage.removeItem(name);
};
export const phoneMask = phone => {
    return mask(phone, 3, 5);
};
export const mask = (string, startIndex, length) => {
    var subString = string.substr(startIndex, length);
    var maskStr = new Array(subString.length + 1).join("*");
    return string.replace(subString, maskStr);
};
export const isRealNum = val => {
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
    if (val === "" || val == null) {
        return false;
    }
    if (!isNaN(val)) {
        return true;
    } else {
        return false;
    }
};
export function formateTime(date, fmt) {
    // (x) 匹配 'x' 并且记住匹配项，就像下面的例子展示的那样。括号被称为 捕获括号。
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }
    let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + "";
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? str : padLeftZero(str)
            );
        }
    }
    return fmt;
}
function padLeftZero(str) {
    return ("00" + str).substr(str.length);
}
export function getElementTop(obj) {
    console.log("obj:", obj);
    var top = obj.offsetTop;
    var cur = obj.offsetParent;
    console.log("parent:", cur);
    let count = 0;
    while (cur != null) {
        // console.log("count:" + count++);
        top += cur.offsetTop;
        cur = cur.offsetParent;
    }
    return top;
}
export function checkSys() {
    var u = navigator.userAgent,
        app = navigator.appVersion;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        return "android";
    } else if (isiOS) {
        return "ios";
    } else {
        return "unknown";
    }
}
export function callPhone(str) {
    var native = function (data) {
        console.log(data);
    };
    return nativeInteractive(native, str);
}
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];

    var WVJBIframe = document.createElement("iframe");
    WVJBIframe.style.display = "none";
    WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe);
    }, 0);
}
function nativeInteractive(fn, obj) {
    console.log(123);
    setupWebViewJavascriptBridge(function (bridge) {
        if (obj) {
            bridge.callHandler("webview_call_native", obj, function (
                response
            ) { });
        }
        bridge.registerHandler("native_call_webview", function (
            data,
            response
        ) {
            fn(data);
        });
    });
    if (window.xingfenqi && obj) {
        var str = JSON.stringify(obj);
        window.xingfenqi.webview_call_native(str);
    }

    window.native_call_webview = function (data) {
        var obj = eval("(" + data + ")");
        fn(obj);
    };
}
export function initMap(address) {
    // 百度地图API功能
    var map = new BMap.Map("container");
    var point = new BMap.Point(116.331398, 39.897445);
    map.centerAndZoom(point, 12);
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(address, function (point) {
        if (point) {
            map.centerAndZoom(point, 16);
            map.addOverlay(new BMap.Marker(point));
        } else {
            // alert("您选择地址没有解析到结果!");
        }
    });
}

//银行卡号过滤
export function stringHidePart(strObj) {
    var strLength = strObj.length;
    var star = '';
    var strRel = '';
    if (strLength > 8) {
        var hideSec = strObj.substring(3);    //星号部分
        for (var i = 5; i < hideSec.length; i++) {
            star += "*";
        }
    };
    strRel = strObj.substring(0, 4) + star + strObj.substr(strObj.length - 4);
    // strRel=strRel.replace(/\s/g,'').replace(/(.{4})/g,"$1 ");

    return strRel;
};

export function verifyName(name) {
    var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
    return reg.test(name)
}


