import React from 'react';
import {Button} from 'react-native-paper';
import {View} from 'react-native';
import {tailwind, colors} from 'react-native-tailwindcss';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Context} from '../providers/ThemeProvider';

export default function ButtonItem(props) {
  return (
    <Button
      {...props}
      contentStyle={styles.content}
      labelStyle={[styles.label, props.labelStyle ? props.labelStyle : {}]}
      style={props.style ? [props.style, styles.btn] : [styles.btn]}
      mode={props.mode || 'contained'}>
      <Text style={tailwind.flex1}>{props.children}</Text>
    </Button>
  );
}

export function CircleButton({
  onPress,
  name,
  color,
  style,
  border,
  onLayout,
  disabled,
}) {
  const {
    state: {theme},
  } = React.useContext(Context);

  const ref = React.useRef();

  const handleLayout = () => {
    ref.current.measure((x, y, width, height, pageX, pageY) => {
      onLayout && onLayout(x, y, width, height, pageX, pageY);
    });
  };

  return (
    <TouchableOpacity
      style={[
        styles.circleButton,
        style || {},
        disabled ? {backgroundColor: colors.gray100} : theme.primaryBgStyle,
      ]}
      disabled={disabled}
      onPress={onPress}>
      <View
        onLayout={handleLayout}
        ref={ref}
        style={
          border
            ? [
                tailwind.borderT2,
                tailwind.borderB2,
                {
                  borderColor: color || theme.primaryColor,
                },
                tailwind.absolute,
                {elevation: 12000},
              ]
            : [tailwind.absolute, {elevation: 12000}]
        }>
        <Icon
          style={{
            color: !disabled ? color || theme.primaryColor : colors.gray400,
          }}
          name={name || 'file-document-edit-outline'}
          size={20}
        />
      </View>
      <View />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    // ...tailwind.itemsCenter,
    // ...tailwind.justifyCenter,
    ...tailwind.p0,
  },
  label: {
    ...tailwind.fontBold,
    ...tailwind.textXs,
    ...tailwind.mB3,
    height: 14,
  },
  content: {
    ...tailwind.p0,
    // height: 25,
    height: 40,
  },
  circleButton: {
    ...tailwind.itemsCenter,
    ...tailwind.justifyCenter,
    ...tailwind.roundedFull,
    ...tailwind.h10,
    ...tailwind.w10,
    ...tailwind.shadow2xl,
  },
});
