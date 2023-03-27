import {PermissionsAndroid} from 'react-native';

// 导出 异步的函数
export default async () => {
  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ];
    const granted = await PermissionsAndroid.requestMultiple(permissions);
    return granted;
  } catch (err) {
    console.info(err);
    return err.toString();
  }
};
