import React from "react"
import {View, Text, Button} from "react-native"
import {observer} from "mobx-react/native";
import {home} from "model"
import {Icon} from "components"

@observer
export default class Home extends React.Component {
    static navigationOptions = {title: "ccccc",header:{}}

    render() {
        return (
            <View>
                <Text>这里是home页面name:{home.name}</Text>
                <Icon name="goon" size={30} color="red" />
                <Button title="点我啊" onPress={()=>{home.name="vvvvvvvvvv"}}/>
            </View>
        );
    }
}
