/**
 * @format
 */
// import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Homes from './src/Screens/Appscreen/Home';
import Auth, {MyTabs} from './src/stacks/Stacks';
import Route from './src/stacks';
import Routes from './src/stacks/Stacks';
import {configurePushNotifications} from './stng';
import {Provider} from 'react-redux';

import {PersistGate} from 'redux-persist/lib/integration/react';
import Toast, {BaseToast} from 'react-native-toast-message';
import {Store, persistor, store} from './src/Store';
import {useEffect} from 'react';
import {
  GetFCMToken,
  NotificationListener,
} from './src/utlies/pushnotifications_helpers';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

configurePushNotifications();

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: '#D86E06'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 12,
        fontWeight: '400',
        color: '#D86E06',
      }}
    />
  ),
  error: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'red'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 13,
        fontWeight: 'bold',
        color: 'red',
      }}
    />
  ),
};

const Root = () => {
  useEffect(() => {
    const get = async () => {
      await GetFCMToken();
    };
    get();
  }, []);

  useEffect(() => {
    NotificationListener();
  }, []);
  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <Routes />
        <Toast config={toastConfig} position="bottom" />
      </PersistGate>
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => Root);
