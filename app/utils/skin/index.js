import * as blue from "./blue";
let skinList = {blue};
let currentSkin = blue;
function Set(skinName) {
    currentSkin = skinList[skinName]
}
export {Set};
export default currentSkin;