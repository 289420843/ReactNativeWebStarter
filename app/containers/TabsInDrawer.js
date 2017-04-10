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
    DrawerNavigator,
} from 'react-navigation';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleTabs from './SimpleTabs';
import StacksOverTabs from './StacksOverTabs';

const TabsInDrawer = DrawerNavigator({
    SimpleTabs: {
        screen: SimpleTabs,
        navigationOptions: {
            drawer: () => ({
                label: 'Simple Tabs',
                icon: ({tintColor}) => (
                    <Text>filter-1</Text>
                ),
            }),
        },
    },
    StacksOverTabs: {
        screen: StacksOverTabs,
        navigationOptions: {
            drawer: () => ({
                label: 'Stacks Over Tabs',
                icon: ({tintColor}) => (
                    <Text>filter-2</Text>
                ),
            }),
        },
    },
});

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
});

export default TabsInDrawer;
