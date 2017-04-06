$(function () {

    /*
     * 字符串运算
     * */
    (function (doc) {
        /*  字符串    */
        var str = doc.getElementById('string');
        /*  查找字符    */
        var mark = doc.getElementById('mark');
        /*  开始查找按钮    */
        var findBtn = doc.getElementById('findBtn');
        /*  字符串转换后的数组    */
        var toArrayText = doc.getElementById('toArray');
        /*  出现次数最多的字母    */
        var mostLetter = doc.getElementById('mostLetter');
        /*  出现次数最多的字母    */
        var totalCount = doc.getElementById('totalCount');
        /*  索引下标    */
        var index = doc.getElementById('index');

        /*     函数调用，获取字符串相关信息，并把数据显示到页面上   start     */

        var info = getStringInfo(str.value);
        toArrayText.innerHTML = info.toArrayText;
        mostLetter.innerHTML = info.mostLetter;
        totalCount.innerHTML = info.totalCount;
        index.innerHTML = info.index;

        /*     函数调用，获取字符串相关信息，并把数据显示到页面上   end     */


        /*   添加按钮事件   start   */



        /*   添加按钮事件   end   */
    })(document);

});

/**
 * 返回输入字符串相关信息
 * @param str  输入的字符串
 * @returns {{
 *      toArrayText: string, 字符串转换后的数组
 *      mostLetter: string, 出现次数最多的字母
 *      totalCount: string, 出现次数最多的字母
 *      index: string 索引下标
 * }}
 */
function getStringInfo(str) {

    //转换为数组
    var arr = [];
    //转换为对象去重并计数
    var o = {};
    for (var i = 0; i < str.length; i++) {
        arr.push('"' + str[i] + '"');
        var item = str[i];
        if (o[item]) {
            o[item]['count'] += 1;
        } else {
            o[item] = {};
            o[item]['count'] = 1;
            o[item]['index'] = [];
        }
        o[item]['index'].push(i + 1);
    }

    //拿出每个字符出现的次数并排序
    var tempArr = [];
    for (var temp in o) {
        if (!Object.hasOwnProperty(temp)) {
            tempArr.push(o[temp]['count']);
        }
    }
    var max = Math.max.apply(Object.create(null), tempArr);

    //根据找到的最大次数进行查找
    var printInfo = [];
    for (var item2 in o) {
        if (!Object.hasOwnProperty(item2)) {
            if (max === o[item2].count) {
                o[item2]['name'] = item2;
                printInfo.push(o[item2]);
            }
        }
    }

    //出现次数最多的字母
    var mostLetter = printInfo.map(function (item) {
        return item.name;
    });
    //出现次数最多的字母
    var totalCount = printInfo.map(function (item) {
        return item.count;
    });
    //索引下标
    var index = printInfo.map(function (item) {
        return item.index;
    });

    return {
        toArrayText: '[' + arr.join() + ']',
        mostLetter: mostLetter.join(),
        totalCount: totalCount,
        index: index
    }
}