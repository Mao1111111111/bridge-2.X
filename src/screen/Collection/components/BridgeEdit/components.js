import React from 'react';
import styles from './styles';
import {View, Text, TouchableNativeFeedback} from 'react-native';
import {tailwind} from 'react-native-tailwindcss';
import {Divider, Checkbox} from 'react-native-paper';

// 部件选择盒子
export const BujianCheckbox = ({label, checked, disabled, onCheck, style}) => {
  return (
    <TouchableNativeFeedback onPress={disabled ? () => {} : onCheck}>
      <View style={[styles.row, ...(style || [])]}>
        <View
          style={[
            {backgroundColor:'#fff'},
            tailwind.w8,
            tailwind.h9,
            tailwind.borderGray400,
            tailwind.borderR,
          ]}>
          <Checkbox
            disabled={disabled}
            // onPress={onCheck}
            status={checked ? 'checked' : 'unchecked'}
          />
        </View>
        <View
          style={[tailwind.flexGrow, tailwind.borderGray400, tailwind.borderR]}>
          <Text style={[styles.textBox2]}>{label}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export const BujianRow = ({label, value}) => {
  return (
    <View style={[tailwind.flexRow]}>
      <View style={[styles.row]}>
        <View style={[tailwind.flexGrow]}>
          <Text style={[tailwind.m1]}>{label}</Text>
        </View>
        <View style={[styles.col]}>
          <Text>{value}</Text>
        </View>
      </View>
    </View>
  );
};

export const Goujian = ({title, list, isShow}) => {
  const getKuaColor = inx => {
    const kuaColor = [
      tailwind.bgGray200,
      tailwind.bgGray300,
      tailwind.bgGray400,
      tailwind.bgRed200,
      tailwind.bgRed300,
      tailwind.bgRed400,
      tailwind.bgBlue200,
      tailwind.bgBlue300,
      tailwind.bgBlue400,
      tailwind.bgGreen300,
    ];
    if (inx === -1) {
      return tailwind.bgWhite;
    }
    if (kuaColor[inx - 1]) {
      return kuaColor[inx - 1];
    } else {
      return kuaColor[(inx - 1) % 10];
    }
  };

  return isShow ? (
    <View style={tailwind.mT2}>
      <Text style={[tailwind.textBase, tailwind.mB2]}>
        {title}：总构件{list?.length || 0}个
      </Text>
      <Divider />
      <View style={[tailwind.mT2, tailwind.flexRow, tailwind.flexWrap]}>
        {list ? (
          list.map((it, inx) => (
            <View key={inx} style={[styles.inter, getKuaColor(it.stepno)]}>
              <Text>{it.membername}</Text>
            </View>
          ))
        ) : (
          <></>
        )}
      </View>
    </View>
  ) : (
    <></>
  );
};
