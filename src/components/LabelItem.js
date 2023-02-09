import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {tailwind} from 'react-native-tailwindcss';

export default function LabelItem({
  style,
  LabelStyle,
  label,
  children,
  onPress,
}) {
  return label ? (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={style ? [styles.box, style] : [styles.box]}>
        <Text style={LabelStyle ? [LabelStyle, styles.label] : [styles.label]}>
          {label}
        </Text>
        {children}
      </View>
    </TouchableWithoutFeedback>
  ) : (
    children
  );
}

const styles = StyleSheet.create({
  box: {
    ...tailwind.flexRow,
    ...tailwind.itemsCenter,
  },
  label: {
    ...tailwind.mR2,
    ...tailwind.fontBold,
  },
});
