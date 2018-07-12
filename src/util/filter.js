/**
 * 格式化时间
 *
 * @param {String} str
 * @returns string 格式化后的时间
 */
export const formatDate = (str, fmt) => {
    if (!str) return ''
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
/**
 * 格式化金额
 *
 * @param {String} str
 * @returns string 格式化后的金额
 */
export const formatMoney = (value) => {
    let money = 0;
    value ? (money = value.toFixed(2)) : "";
    return "￥" + money;
}