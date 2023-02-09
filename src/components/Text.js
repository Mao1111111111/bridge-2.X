import React from 'react';
import {Text as RnText, StyleSheet} from 'react-native';
import {tailwind} from 'react-native-tailwindcss';

export default function Text({style, children}) {
  return (
    <RnText style={style ? [style, styles.text] : [styles.text]}>
      {children}
    </RnText>
  );
}

const styles = StyleSheet.create({
  text: {
    ...tailwind.textSm,
  },
});
