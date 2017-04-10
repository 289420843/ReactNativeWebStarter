import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import App from "./App/index"

import iconfont from 'fonts/iconfont.ttf';
console.log("iconfont",iconfont);
const reactNativeVectorIconsRequiredStyles = "@font-face { src:url(" + iconfont + ");font-family: IconFont; }"
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet){
    style.styleSheet.cssText = reactNativeVectorIconsRequiredStyles;
} else {
    style.appendChild(document.createTextNode(reactNativeVectorIconsRequiredStyles));
}

// inject stylesheet
document.head.appendChild(style);
AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
    rootTag: document.getElementById('app')
});