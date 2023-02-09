import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
// import screenWindow from '../utils/screenWindow';
import {tailwind} from 'react-native-tailwindcss';
import {Context} from '../providers/GlobalProvider';
import {CircleButton} from '../components/Button';

export default function Lock() {
  const {
    state: {isLock, lockXY, screen},
    dispatch,
  } = React.useContext(Context);

  const handleUnlock = () => {
    dispatch({type: 'isLock', payload: false});
  };

  return isLock ? (
    <View style={[styles.lock, screen]}>
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
