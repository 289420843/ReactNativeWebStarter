import React from 'react';
import {View, TextInput, Text, StyleSheet, TouchableHighlight,} from "react-native";
import {Skin} from "utils"

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        }
    }

    onPress() {
        if (this.props.onPress && !this.props.disable) {
            this.props.onPress();
        }
    }

    render() {
        const {underlayTextColor} = this.props;
        let buttonColor = this.props.style ? ( this.props.style instanceof Array ? StyleSheet.flatten(this.props.style).backgroundColor : this.props.style.backgroundColor
        ) : null;

        let buttonStyle = StyleSheet.flatten([styles.button, this.props.style,]);
        let disableButtonStyle = StyleSheet.flatten([styles.button, styles.disableButton, this.props.disableStyle,]);
        let textStyle = StyleSheet.flatten([styles.text, this.props.textStyle,]);
        let disableTextStyle = StyleSheet.flatten([styles.text, styles.disableText, this.props.disableTextStyle,]);
        let underlayColor = this.props.disable ?
            disableButtonStyle.backgroundColor : (this.props.underlayColor ? this.props.underlayColor :
                (buttonColor ? buttonColor.toDark(0.1) : Skin.colors[0].toDark(0.1)));
        this.props = {
            ...this.props,
            style: this.props.disable ? disableButtonStyle : buttonStyle,
            underlayColor: underlayColor,
        };
        return (
            <TouchableHighlight
                {...this.props}
                onPress={this.onPress.bind(this)}
                onShowUnderlay={() => {
                    this.setState({
                        active: true,
                    });
                }}
                onHideUnderlay={() => {
                    this.setState({
                        active: false,
                    });
                }}
            >
                {
                    this.props.text ? (
                        <Text
                            style={this.props.disable ? disableTextStyle : textStyle}><Text
                            style={[this.state.active && underlayTextColor ? {color: underlayTextColor} : {}]}>{this.props.text}</Text></Text>) :
                        this.props.children
                }
            </TouchableHighlight>
        );
    }
}
const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: Skin.colors[0],
    },
    disableButton: {
        backgroundColor: "#CCC",
    },
    text: {
        color: "#FFF",
    },
    disableText: {
        color: "#CCC",
    }
});

export default Button;
