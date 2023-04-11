import AsyncStorage from '@react-native-async-storage/async-storage';

let userInfo = {};

export default {
  // 设置程序里的用户信息，将值赋予userInfo， 临时存储，只在软件打开时存在
  setUserInfo: _user => (userInfo = _user),
  getBaseItem: async key => {
    if (userInfo) {
      // 当用户信息存在时
      // 通过键名 baseData_ + companyid，获取存储在本地的数据JSON
      const data = await AsyncStorage.getItem(
        'baseData_' + userInfo?.company?.companyid,
      );
      // 解析JSON，获取 baseData
      const baseData = JSON.parse(data || '{}');
      // 根据key值，返回需要的数据
      return baseData[key];
    } else {
      // 从本地获取 用户信息
      userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));
      if (userInfo) {
        // 如果用户信息存在
        // 同上
        const data = await AsyncStorage.getItem(
          'baseData_' + userInfo?.company?.companyid,
        );
        // console.info(data);
        const baseData = JSON.parse(data || '{}');
        return baseData[key];
      } else {
        // 如果用户信息不存在，返回 null
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
