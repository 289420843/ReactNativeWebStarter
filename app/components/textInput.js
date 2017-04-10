import React from 'react';
import {TextInput, StyleSheet} from "react-native";


class MyTextInput extends React.Component {
    render() {
        return (
            <TextInput {...this.props} autoCapitalize="none"  autoCorrect={false} underlineColorAndroid="rgba(0,0,0,0)"></TextInput>
        );
    }
}
export default MyTextInput;
