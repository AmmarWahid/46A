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

AppRegistry.registerComponent(appName, () => Routes);
