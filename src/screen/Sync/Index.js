import React from 'react';
import {Provider} from './Provider';
import NavigatorStack from '../../components/NavigatorStack';
import Bridge from './bridge/Index';
import TestData from './testData/Index';
import {tailwind} from 'react-native-tailwindcss';
import Headerbar from '../../components/Headerbar';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Context as ThemeContext} from '../../providers/ThemeProvider';
import {Context as GlobalContext} from '../../providers/GlobalProvider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Main({navigation}) {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const toPage = path => {
    navigation.navigate(path);
  };

  return (
    <View style={[tailwind.flex1]}>
      {/* <Headerbar items={[{name: '数据同步'}]} /> */}
      <View style={styles.box}>
        <TouchableOpacity
          style={[styles.cardBtn, theme.primaryBgStyle,{width:310,height:310}]}
          onPress={() => toPage('Collection/Sync/Bridge')}>
          {/* <Icon name="bridge" size={100} /> */}
          <Image
            source={require('../../iconImg/bridgeData.png')}
            style={
              [{
                width:100,
                height:100
              }]
            }
          ></Image>
          <Text style={tailwind.text2xl}>同步桥梁数据</Text>
        </TouchableOpacity>
        <View style={tailwind.mX4} />

        <TouchableOpacity
          onPress={() => toPage('Collection/Sync/TestData')}
          style={[styles.cardBtn, theme.primaryBgStyle, {width:310,height:310}]}>
          {/* <Icon name="cloud-upload-outline" size={100} /> */}
          <Image
            source={require('../../iconImg/uploadDataMenu.png')}
            style={
              [{
                width:100,
                height:100
              }]
            }
          ></Image>
          <Text style={tailwind.text2xl}>上传检测数据</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Index() {
  const {
    state: {networkState},
  } = React.useContext(GlobalContext);

  const routes = [
    {
      name: 'Collection/Sync/TestData',
      component: TestData,
    },
    // {
    //   name: 'Collection/Sync/Main',
    //   component: Main,
    // },
    // {
    //   name: 'Collection/Sync/Bridge',
    //   component: Bridge,
    // }
  ];

  return !networkState?.isConnected ? (
    <View style={[tailwind.flex1]}>
      <Headerbar items={[{name: '数据同步'}]} />
      <View style={styles.box}>
        <Text style={tailwind.text3xl}>网络未连接</Text>
      </View>
    </View>
  ) : (
    <Provider>
      <NavigatorStack routes={routes} />
    </Provider>
  );
}

const styles = StyleSheet.create({
  box: {
    ...tailwind.flex1,
    ...tailwind.flexRow,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
  },
  cardBtn: {
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
    ...tailwind.rounded,
    ...tailwind.shadow2xl,
    ...tailwind.pX20,
    ...tailwind.pY20,
  },
});
