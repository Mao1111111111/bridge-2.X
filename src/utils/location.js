import Geolocation from 'react-native-geolocation-service';

// 高德定位
import { init,addLocationListener,start, stop,setInterval} from "react-native-amap-geolocation";

let position = {};

// 高德定位
const initWatchAmapGPS = async () => {
  await init({
      android: "a6b8a1e83fd87a7c31f1ae2d0777f479",
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
      console.info(_position);
      console.log("position",position);
      position === _position;
    },
    error => {
      // See error code charts below.
      console.log(error.code, error.message);
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
    initWatchAmapGPS()
  },
  getPosition: () => position,
};
