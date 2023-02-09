import React from 'react';
import {View, Text} from 'react-native';
import {tailwind} from 'react-native-tailwindcss';

export default function ({pid, size}) {
  return (
    <View
      style={[
        {backgroundColor: '#2b427d'},
        tailwind.pX3,
        size === 'small' ? tailwind.h4 : tailwind.h5,
        tailwind.roundedSm,
        tailwind.justifyCenter,
        tailwind.shadow2xl,
      ]}>
      {size === 'small' ? (
        <Text style={[tailwind.textWhite, tailwind.textXs, tailwind.fontBold]}>
          {pid}
        </Text>
      ) : (
        <Text style={[tailwind.textWhite, tailwind.fontBold]}>{pid}</Text>
      )}
    </View>
  );
}
