import Geolocation from 'react-native-geolocation-service';

// 高德定位
// import { init,addLocationListener,start, stop,setInterval} from "react-native-amap-geolocation";
import {  init,addLocationListener,start, stop,setInterval } from 'react-native-amap-geolocation'

let position = {};

// 高德定位
const initWatchAmapGPS = async () => {
  await init({
      android: "6a8dfa3196f2eab56910cbbd668b1622", 
      ios:''
  });
  addLocationListener((location) => {
    position = location
  });
  // 开始连续定位
  start();
}

// 原生定位
const initWatchGPS = () => {
  Geolocation.watchPosition(
    _position => {
      position = {
        ..._position,
        errorCode:0
      };
    },
    error => {
      // See error code charts below.
      console.log(error.code, error.message);
      position={
        errorCode:error.code,
        locationDetail:error.message
      }
    },
    {
      enableHighAccuracy: false,
      forceLocationManager: true,
      forceRequestLocation: true,
      timeout: 15000,
      maximumAge: 10000,
    },
  );
}

export default {
  initWatch: () => {
    initWatchGPS()
  },
  getPosition: () => position,
};
