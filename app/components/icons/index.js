import React, {Component} from "react"
import Icon, {hasName} from "./icon"
export default class IconView extends Component {
    setNativeProps(nativeProps) {
        this._root.setNativeProps(nativeProps);
    }

    render() {
        const {name, ...other} = this.props;
        let newName = name;
        if (!hasName(name)) {
            newName = parseInt(name.substr(1, 4), 16);
        }
        return <Icon ref={component => this._root = component}  {...other} name={newName}/>
    }
}