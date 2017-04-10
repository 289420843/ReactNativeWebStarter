let gettype = Object.prototype.toString

export default  DataType = {
    isObj: function (o) {
        return gettype.call(o) == "[object Object]";
    },
    isArray: function (o) {
        return gettype.call(o) == "[object Array]";
    },
    isNULL: function (o) {
        return gettype.call(o) == "[object Null]";
    },
    isDocument: function () {
        return gettype.call(o) == "[object Document]" || ["object HTMLDocument"];
    }
}

