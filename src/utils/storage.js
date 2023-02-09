import AsyncStorage from '@react-native-async-storage/async-storage';

let userInfo = {};

export default {
  setUserInfo: _user => (userInfo = _user),
  getBaseItem: async key => {
    if (userInfo) {
      const data = await AsyncStorage.getItem(
        'baseData_' + userInfo?.company?.companyid,
      );
      const baseData = JSON.parse(data || '{}');
      return baseData[key];
    } else {
      userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));
      if (userInfo) {
        const data = await AsyncStorage.getItem(
          'baseData_' + userInfo?.company?.companyid,
        );
        // console.info(data);
        const baseData = JSON.parse(data || '{}');
        return baseData[key];
      } else {
        return null;
      }
    }
  },
  getBaseAll: async () => {
    if (userInfo) {
      const data = await AsyncStorage.getItem(
        'baseData_' + userInfo?.company?.companyid,
      );
      const baseData = JSON.parse(data || '{}');
      return baseData;
    } else {
      return null;
    }
  },
};
