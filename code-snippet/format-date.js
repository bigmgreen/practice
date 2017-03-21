/*
 * 格式化时间
 * @param {date} [原始时间]
 * @param {formattype} [格式化标签] "yyyy-MM-dd HH-mm-ss"
 * @param {types} [0:传入时间为字符串格式时间,1:传入时间格式为时间戳格式] 
 */
function FormatData(date, formattype, types) {
    var datetime = "";
    if (types == 1) {
        datetime = date;
    } else {
        datetime = new Date(Date.parse(date.replace('T', ' ').split('.')[0].replace(/\-/g, "/")))
    }
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1; //js从0开始取 
    var date = datetime.getDate();
    var hour = datetime.getHours();
    var minutes = datetime.getMinutes();
    var second = datetime.getSeconds();

    if (month < 10) {
        month = "0" + month;
    }
    if (date < 10) {
        date = "0" + date;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (second < 10) {
        second = "0" + second;
    }
    var time = "";
    if (formattype != null && formattype != "" && formattype != "undefined") {
        var sss = formattype;
        if (formattype.indexOf('yyyy') >= 0) {
            sss = sss.replace('yyyy', year);
        }
        if (formattype.indexOf('MM') >= 0) {
            sss = sss.replace('MM', month);
        }
        if (formattype.indexOf('dd') >= 0) {
            sss = sss.replace('dd', date);
        }
        if (formattype.indexOf('HH') >= 0) {
            sss = sss.replace('HH', hour);
        }
        if (formattype.indexOf('mm') >= 0) {
            sss = sss.replace('mm', minutes);
        }
        if (formattype.indexOf('ss') >= 0) {
            sss = sss.replace('ss', second);
        }
        time = sss
    } else {
        time = year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + second; //2009-06-12 17:18:05
    }
    return time;
}