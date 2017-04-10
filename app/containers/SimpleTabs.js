/**
 * @flow
 */

import React from 'react';
import {
    Button,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
} from 'react-native';
import {
    TabNavigator,
} from 'react-navigation';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import SampleText from './SampleText';

const MyNavScreen = ({navigation, banner}) => (
    <ScrollView style={styles.container}>
        <SampleText>{banner}</SampleText>
        <Button
            onPress={() => navigation.navigate('Home')}
            title="Go to home tab"
        />
        <Button
            onPress={() => navigation.navigate('Settings')}
            title="Go to settings tab"
        />
        <Button
            onPress={() => navigation.goBack(null)}
            title="Go back"
        />
    </ScrollView>
);

const MyHomeScreen = ({navigation}) => (
    <MyNavScreen
        banner="Home Tab"
        navigation={navigation}
    />
);

MyHomeScreen.navigationOptions = {
    tabBar: {
        label: 'Home',
        icon: ({tintColor, focused}) => (
            <Text>{focused ? 'ios-home' : 'ios-home-outline'}</Text>
        ),
    },
};

const MyPeopleScreen = ({navigation}) => (
    <MyNavScreen
        banner="People Tab"
        navigation={navigation}
    />
);

MyPeopleScreen.navigationOptions = {
    tabBar: {
        label: 'People',
        icon: ({tintColor, focused}) => (
            <Text>{focused ? 'ios-people' : 'ios-people-outline'}</Text>
        ),
    },
};

const MyChatScreen = ({navigation}) => (
    <MyNavScreen
        banner="Chat Tab"
        navigation={navigation}
    />
);

MyChatScreen.navigationOptions = {
    tabBar: {
        label: 'Chat',
        icon: ({tintColor, focused}) => (
            <Text>{focused ? 'ios-chatboxes' : 'ios-chatboxes-outline'}</Text>
        ),
    },
};

const MySettingsScreen = ({navigation}) => (
    <MyNavScreen
        banner="Settings Tab"
        navigation={navigation}
    />
);

MySettingsScreen.navigationOptions = {
    tabBar: {
        label: 'Settings',
        icon: ({tintColor, focused}) => (
            <Text>{focused ? 'ios-settings' : 'ios-settings-outline'}</Text>
        ),
    },
};

const SimpleTabs = TabNavigator({
    Home: {
        screen: MyHomeScreen,
        path: '',
    },
    People: {
        screen: MyPeopleScreen,
        path: 'cart',
    },
    Chat: {
        screen: MyChatScreen,
        path: 'chat',
    },
    Settings: {
        screen: MySettingsScreen,
        path: 'settings',
    },
}, {
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
    },
});

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
});

export default SimpleTabs;
