import React, {useEffect, useState} from 'react';
import {View, Image, Platform, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundFetch from 'react-native-background-fetch';
import PushNotification from 'react-native-push-notification';
import {NavigationContainer} from '@react-navigation/native';

import Home from './Home';
import Notifications from './Notifications';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import Favourites from './Favourites';

import h from './../../Assets/home.png';
import fav from './../../Assets/heart.png';
import pro from './../../Assets/user.png';
import Profile from './Profile';

const images = [
  require('./../../Assets/p1.jpg'),
  require('./../../Assets/p2.jpg'),
];

const MyTabs = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isNewNotification, setIsNewNotification] = useState(false);
  const initBackgroundFetch = async () => {
    const onEvent = async taskId => {
      console.log('[BackgroundFetch] task: ', taskId);
      await addEvent(taskId);
      BackgroundFetch.finish(taskId);
    };

    const onTimeout = async taskId => {
      console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
      BackgroundFetch.finish(taskId);
    };

    let status = await BackgroundFetch.configure(
      {minimumFetchInterval: 15},
      onEvent,
      onTimeout,
    );
    console.log('[BackgroundFetch] configure status: ', status);
  };

  const addEvent = taskId => {
    return new Promise((resolve, reject) => {
      setEvents(prevEvents => [
        ...prevEvents,
        {
          taskId: taskId,
          timestamp: new Date().toString(),
        },
      ]);
      resolve();
    });
  };
  useEffect(() => {
    initBackgroundFetch();

    // PushNotification.popInitialNotification(notification => {
    handleBackgroundTask();
 

    return () => {
      PushNotification.removeAllDeliveredNotifications();
    };
  }, []);

  const handleBackgroundTask = async () => {
    const newIndex = Math.floor(Math.random() * images.length);
    await AsyncStorage.setItem('currentImageIndex', String(newIndex));
    setCurrentImageIndex(newIndex);
    sendNotification();
  };

  const handleNotification = notification => {
    if (notification && notification.foreground) {
      setIsNewNotification(true);
    }
  };

  const sendNotification = () => {
    PushNotification.localNotification({
      title: 'Image Updated',
      message: 'Check out the new image!',
    });
  };

  const Tab = createBottomTabNavigator();

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
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Image
              source={h}
              style={{tintColor: color, height: size, width: size}}
            />
          ),
        }}>
        {props => <Home {...props} currentImageIndex={currentImageIndex} />}
      </Tab.Screen>

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
};

export default MyTabs;
