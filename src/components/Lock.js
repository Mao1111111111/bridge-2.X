import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
// import screenWindow from '../utils/screenWindow';
import {tailwind} from 'react-native-tailwindcss';
import {Context} from '../providers/GlobalProvider';
import {CircleButton} from '../components/Button';

export default function Lock() {
  // 全局参数 是否锁屏、锁屏偏移量、屏幕配置
  const {
    state: {isLock, lockXY, screen},
    dispatch,
  } = React.useContext(Context);

  // 点击解锁
  const handleUnlock = () => {
    dispatch({type: 'isLock', payload: false});
  };

  // 判断是否锁屏
  return isLock ? (
    // 锁屏时
    // 在最顶层，相当于在所有页面最顶层添加一个不可点击的蒙版
    <View style={[styles.lock, screen]}>
      {/* 圆形 解锁 按钮 */}
      <CircleButton
        name="lock-open"
        style={[
          styles.btn,
          {
            transform: [
              {translateX: lockXY.x - 10},
              {translateY: lockXY.y - 10},
            ],
          },
        ]}
        onPress={handleUnlock}
      />

      <Text style={[tailwind.text2xl, tailwind.opacity50]}>已锁屏</Text>
    </View>
  ) : (
    // 未锁屏时
    <></>
  );
}

const styles = StyleSheet.create({
  lock: {
    ...tailwind.absolute,
    ...tailwind.bgTransparent,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
    // ...screenWindow(),
    zIndex: 1000,
  },
  btn: {
    ...tailwind.absolute,
    top: 0,
    left: 0,
  },
});
