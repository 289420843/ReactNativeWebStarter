//字体图标
import {createIconSet} from 'react-native-vector-icons';
let glyphMap = {
    "goon":59026,
};
const Icon = createIconSet(glyphMap, 'iconfont');
export default Icon;
export function hasName(name) {
    return glyphMap[name];
}
