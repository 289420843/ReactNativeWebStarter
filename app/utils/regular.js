export function phone(str) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!myreg.test(str)) {
        return false;
    }
    return true;
}
export function account(str) {
    var myreg = /^\w{8,16}$/;
    if (!myreg.test(str)) {
        return false;
    }
    return true;
}
export function number(str) {
    var myreg = /\d+/;
    if (!myreg.test(str)) {
        return false;
    }
    return true;
}
export function length(str, min, max) {
    var myreg = new RegExp("^\[\\s\|\\S\]\{" + min + (max ? "\," + max : "") + "\}$");

    console.warn(JSON.stringify(myreg.toString()));
    if (!myreg.test(str)) {
        return false;
    }
    return true;
}