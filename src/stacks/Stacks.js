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
import BootSplash from "react-native-bootsplash";

import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';
import FavRead from '../Screens/Appscreen/FavRead';
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
    // MyTabs: MyTabs,
  },
});

const Navigation = createStaticNavigation(RootStack);
const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <NavigationContainer>
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
            unmountOnBlur: true,
            tabBarIcon: ({color, size}) => (
              <Image
                source={h}
                style={{
                  tintColor: color,
                  height: responsiveWidth(8),
                  width: responsiveWidth(8),
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{
            unmountOnBlur: true,
            tabBarLabel: 'notification',
            tabBarStyle: {
              display: 'none',
            },
            tabBarButton: () => null,
          }}
        />
        <Tab.Screen
          name="FavRead"
          component={FavRead}
          options={{
            unmountOnBlur: true,
            // tabBarLabel: 'notification',
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
                style={{
                  tintColor: color,
                  height: responsiveWidth(8),
                  width: responsiveWidth(8),
                }}
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
                style={{
                  tintColor: color,
                  height: responsiveWidth(8),
                  width: responsiveWidth(8),
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default function Routes() {
  const Valid = useSelector(state => state.Slice.isValid);
  React.useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
  }, []);
  return Valid ? <MyTabs /> : <Navigation />;
}
