/**
 * @flow
 */

import React from 'react';
import {
  Button,
  ScrollView,
} from 'react-native';
import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';
import SampleText from './SampleText';

const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView>
    <SampleText>{banner}</SampleText>
    <Button
      onPress={() => navigation.navigate('Profile', { name: 'Jordan' })}
      title="Go to a profile screen"
    />
    <Button
      onPress={() => navigation.navigate('NotifSettings')}
      title="Go to notification settings"
    />
    <Button
      onPress={() => navigation.navigate('SettingsTab')}
      title="Go to settings"
    />
    <Button
      onPress={() => navigation.goBack(null)}
      title="Go back"
    />
  </ScrollView>
);

const MyHomeScreen = ({ navigation }) => (
  <MyNavScreen
    banner="Home Screen"
    navigation={navigation}
  />
);

const MyProfileScreen = ({ navigation }) => (
  <MyNavScreen
    banner={`${navigation.state.params.name}s Profile`}
    navigation={navigation}
  />
);
MyProfileScreen.navigationOptions = {
  title: ({ state }) => `${state.params.name}'s Profile!`,
};

const MyNotificationsSettingsScreen = ({ navigation }) => (
  <MyNavScreen
    banner="Notification Settings"
    navigation={navigation}
  />
);

const MySettingsScreen = ({ navigation }) => (
  <MyNavScreen
    banner="Settings"
    navigation={navigation}
  />
);

const TabNav = TabNavigator({
  MainTab: {
    screen: MyHomeScreen,
    path: '/',
    navigationOptions: {
      tabBar: () => ({
        label: 'Home',
        icon: ({ tintColor, focused }) => (
            <Icon name="rocket" size={30} color="#900"/>
        ),
      }),
    },
  },
  SettingsTab: {
    screen: MySettingsScreen,
    path: '/settings',
    navigationOptions: {
      tabBar: () => ({
        label: 'Settings',
        icon: ({ tintColor, focused }) => (
            <Icon name="rocket" size={30} color="#900"/>
        ),
      }),
    },
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
});

const StacksOverTabs = StackNavigator({
  Root: {
    screen: TabNav,
  },
  NotifSettings: {
    screen: MyNotificationsSettingsScreen,
    navigationOptions: {
      title: () => 'Notification Settings',
    },
  },
  Profile: {
    screen: MyProfileScreen,
    path: '/people/:name',
    navigationOptions: {
      title: ({ state }) => `${state.params.name}'s Profile!`,
    },
  },
}, {
  headerMode: 'none',
});

export default StacksOverTabs;
