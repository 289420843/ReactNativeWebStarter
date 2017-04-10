import React from 'react';

import {
    Platform,
    View,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {AppContainer} from 'react-hot-loader'
import Redbox from 'redbox-react'

import HomeStack from "./containers/home"
import CustomTabs from "./containers/TabsInDrawer"

const AppRoutes = {
    SimpleStack: {
        name: 'Stack Home',
        description: 'A card stack',
        screen: HomeStack,
        path: 'home',
    },
}
const AppNavigator = StackNavigator({
    ...AppRoutes,
}, {
    initialRouteName: 'SimpleStack',
    headerMode: 'screen',

    /*
     * Use modal on iOS because the card mode comes from the right,
     * which conflicts with the drawer example gesture
     */
    mode: Platform.OS === 'ios' ? 'modal' : 'card',

});

export default () =>  <AppContainer errorReporter={Redbox}><AppNavigator /></AppContainer>;