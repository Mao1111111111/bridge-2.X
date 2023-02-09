/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import orientation from 'react-native-orientation-locker';
import 'react-native-get-random-values';

orientation.lockToLandscape();
AppRegistry.registerComponent(appName, () => App);
