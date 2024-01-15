// In App.js in a new project

import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {
  NavigationContainer,
  createStaticNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Signup from '../Screens/Auth/Signup';
import Login from '../Screens/Auth/Login';
import Intro from '../Screens/Auth/Into';
import Forget from '../Screens/Auth/Forgetpassword';
import ResetPassword from '../Screens/Auth/Resetpassword';
import Home from '../Screens/Appscreen/Home';
import Notifications from '../Screens/Appscreen/Notifications';
import Favourites from '../Screens/Appscreen/Favourites';
import Profile from '../Screens/Appscreen/Profile';
import h from './../Assets/home.png';
import fav from './../Assets/heart.png';
import pro from './../Assets/user.png';
import {responsiveHeight} from 'react-native-responsive-dimensions';
const RootStack = createNativeStackNavigator({
  initialRouteName: 'intro',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    intro: Intro,
    signup: Signup,
    login: Login,
    forgetpassword: Forget,
    resetpassword: ResetPassword,
    MyTabs: MyTabs,
  },
});

const Navigation = createStaticNavigation(RootStack);
const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#B27E19',
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFB424',
          position: 'absolute',
          paddingBottom: responsiveHeight(2),
          borderTopLeftRadius: responsiveHeight(6),
          paddingVertical: responsiveHeight(6),
          borderTopRightRadius: responsiveHeight(6),
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Image
              source={h}
              style={{tintColor: color, height: size, width: size}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'notification',
          tabBarStyle: {
            display: 'none',
          },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({color, size}) => (
            <Image
              source={fav}
              style={{tintColor: color, height: size, width: size}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Image
              source={pro}
              style={{tintColor: color, height: size, width: size}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default function Routes() {
  return <Navigation />;
}
