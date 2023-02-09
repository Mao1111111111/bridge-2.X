import {Alert} from 'react-native';

export const confirm = (text, fun) => {
  Alert.alert('请确认', text, [
    {
      text: '取消',
      style: 'cancel',
    },
    {
      text: '确定',
      onPress: fun,
    },
  ]);
};

export const alert = (text, onPress) => {
  Alert.alert('提示', text, [
    {
      text: '确定',
      onPress,
      style: 'cancel',
    },
  ]);
};
