import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {tailwind} from 'react-native-tailwindcss';
import {Context as ThemeContext} from '../providers/ThemeProvider';

export default function Tabs({
  disabled,
  defaultActive,
  onChangeTab,
  tabs,
  btnStyle,
  justify,
  style,
  type,
}) {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const [active, setActive] = React.useState('');

  React.useEffect(() => setActive(defaultActive), [defaultActive]);

  const handleTabPress = tab => {
    setActive(tab.key);
    onChangeTab && onChangeTab(tab.key);
  };

  const getComponent = () => {
    if (!tabs) {
      return <></>;
    }
    return tabs.find(tab => tab.key === active)?.component || <></>;
  };

  const getTab = () => {
    if (type === 'button') {
      return (
        <View
          style={[
            styles.btnBox,
            disabled ? tailwind.opacity50 : tailwind.opacity100,
            {borderColor: theme.primaryColor},
          ]}>
          {tabs.map(item => (
            <TouchableOpacity
              onPress={() => handleTabPress(item)}
              disabled={disabled}
              style={[
                btnStyle ? btnStyle : styles.btn,
                active === item.key
                  ? {backgroundColor: theme.primaryColor}
                  : {},
              ]}
              key={item.key}>
              <Text
                style={[
                  styles.text,
                  active === item.key ? tailwind.textWhite : {},
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    } else {
      return (
        <>
          <View style={[tailwind.flexRow]}>
            {tabs.map(item => (
              <TouchableOpacity
                key={item.key}
                onPress={() => handleTabPress(item)}
                style={[styles.btn2]}
                disabled={disabled}>
                <Text
                  style={[
                    active === item.key
                      ? {
                          ...styles.borderB,
                          ...tailwind.pX1,
                          color: theme.primaryColor,
                          borderColor: theme.primaryColor,
                          ...tailwind.fontBold,
                        }
                      : {},
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      );
    }
  };

  return (
    <View style={style}>
      <View
        style={[
          styles.tabRow,
          justify === 'start' ? tailwind.justifyStart : tailwind.justifyEnd,
        ]}>
        {getTab()}
      </View>
      <View style={tailwind.flex1}>{getComponent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabRow: {
    ...tailwind.flexRow,
  },
  btnBox: {
    ...tailwind.flexRow,
    ...tailwind.border,
    ...tailwind.roundedSm,
  },
  btn: {
    ...tailwind.pX4,
    ...tailwind.pY1,
  },
  btn2: {
    ...tailwind.pX2,
    ...tailwind.pB1,
  },
  text: {
    ...tailwind.fontBold,
  },
  borderB: {
    ...tailwind.borderB2,
    ...tailwind.borderGray400,
  },
});
