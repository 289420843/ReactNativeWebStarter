import Styles from "./styles"
import Skin from "./skin"
import Guid from "./guid"
import * as RegEx from "./regular"
import DataType from "./dataType"

export {Skin, Styles, Guid, RegEx, DataType}


Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//十六进制颜色值域RGB格式颜色值之间的相互转换

//-------------------------------------
//十六进制颜色值的正则表达式
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
/*RGB颜色转换为16进制*/
String.prototype.toHex = function () {
    var that = this;
    if (/^(rgb|RGB)/.test(that)) {
        var aColor = that.replace(/(?:||rgb|RGB)*/g, "").split(",");
        var strHex = "#";
        for (var i = 0; i < aColor.length; i++) {
            var hex = Number(aColor[i]).toString(16);
            if (hex === "0") {
                hex += hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = that;
        }
        return strHex;
    } else if (reg.test(that)) {
        var aNum = that.replace(/#/, "").split("");
        if (aNum.length === 6) {
            return that;
        } else if (aNum.length === 3) {
            var numHex = "#";
            for (var i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    } else {
        return that;
    }
};

//-------------------------------------------------

/*16进制颜色转为RGB格式*/
String.prototype.toRGB = function () {
    var sColor = this.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return "RGB(" + sColorChange.join(",") + ")";
    } else {
        return sColor;
    }
};


//backgroundColor:"rgb(20,41,32)"
String.prototype.toRGBA = function (a) {
    let str = this.substring(this.indexOf("(") + 1, (this.indexOf(")") ));
    let numbers = str.split(",");
    return "rgba(" + numbers.join(",") + "," + a + ")";
}
String.prototype.toDark = function (level) {
    var r = /^\#?[0-9a-f]{6}$/;
    if (!r.test(this))
        return this;
    var rgbc = HexToRgb(this);
    //floor 向下取整
    for (var i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level));
    return "rgb(" + rgbc[0] + "," + rgbc[1] + "," + rgbc[2] + ")".toHex();
}

String.prototype.toLight = function (level) {
    var r = /^\#?[0-9a-f]{6}$/;
    if (!r.test(this)) return this;
    var rgbc = HexToRgb(this);
    for (var i = 0; i < 3; i++) rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i]);
    return "rgb(" + rgbc[0] + "," + rgbc[1] + "," + rgbc[2] + ")".toHex();
}
function HexToRgb(str) {
    var r = /^\#?[0-9a-f]{6}$/;
    //test方法检查在字符串中是否存在一个模式，如果存在则返回true，否则返回false
    if (!r.test(str)) return str;
    //replace替换查找的到的字符串
    str = str.replace("#", "");
    //match得到查询数组
    var hxs = str.match(/../g);
    for (var i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16);
    return hxs;
}


String.prototype.toDate = function () {
    if (this.indexOf("/Date(") == 0) {
        let time = this.substr(6);
        time = time.substr(0, time.lastIndexOf(")"));
        return new Date(parseInt(time));
    }
    return new Date(this);
    return this + "";
}

Date.prototype.toMini = function () {
    return new Date(this.format("yyyy/MM/dd") + " 00:00:00");
}

//正则验证
//验证邮箱
String.prototype.isemail = function () {
    var result = this.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);
    if (result == null) return false;
    return true;
}
String.prototype.isqq = function () {
    var result = this.match(/[1-9][0-9]{4,}/);
    if (result == null) return false;
    return true;
}
//身份证
String.prototype.isidcard = function () {
    var result = this.match(/\d{15}|\d{18}/);
    if (result == null) return false;
    return true;
}
String.prototype.isphone = function () {
    var result = this.match(/^1[3|4|5|8][0-9]\d{4,8}$/);
    if (result == null) return false;
    return true;
}

