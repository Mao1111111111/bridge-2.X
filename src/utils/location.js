import Geolocation from 'react-native-geolocation-service';

let position = {};

export default {
  initWatch: () => {
    Geolocation.watchPosition(
      _position => {
        console.info(_position);
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
  },
  getPosition: () => position,
};
