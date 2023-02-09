import React,{useState,useEffect} from 'react';
import {StatusBar, View, StyleSheet, Image, ImageBackground, Text, Pressable} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Context} from '../providers/ThemeProvider';
import {tailwind, colors} from 'react-native-tailwindcss';
import {Context as GlobalContext} from '../providers/GlobalProvider';
import NavigatorTabs from '../components/NavigatorTabs';
import Collection from './Collection/Index';
import Sync from './Sync/Index';
import Chart from './Chart';
import Setting from './Setting';
import Login from './Login';
import Lock from '../components/Lock';


// const routes = [
//   {
//     name: 'Collection',
//     title: '采集平台',
//     icon: 'plus-thick',
//     component: Collection,
//   },
//   {
//     name: 'Sync',
//     title: '数据同步',
//     icon: 'cloud-sync',
//     component: Sync,
//   },
//   {
//     name: 'Chart',
//     title: '数据统计',
//     icon: 'chart-arc',
//     component: Chart,
//   },
//   {
//     name: 'Setting',
//     title: '用户设置',
//     icon: 'cog',
//     component: Setting,
//   },
// ];

export default function Main() {

  // ===============设置一级菜单的选中与未选中状态下的图片样式=========================
  // 采集平台
  const [collectData, setCollectData] = useState()
  const [collectDataActive, setCollectDataActive] = useState()
  // 数据同步
  const [uploadData, setCaijiImg] = useState()
  const [uploadDataActive, setCaijiImgActive] = useState()
  // 数据统计
  const [statisData, setStatisData] = useState()
  const [statisDataActive, setStatisDataActive] = useState()
  // 用户设置
  const [userSet, setUserSet] = useState()
  const [userSetActive, setUserSetActive] = useState()

  useEffect(() => {
    let collectData = require('../iconImg/collectData.png')
    setCollectData(collectData)
    let collectDataActive = require('../iconImg/collectDataActive.png')
    setCollectDataActive(collectDataActive)

    let uploadData = require('../iconImg/uploadData.png')
    setCaijiImg(uploadData)
    let uploadDataActive = require('../iconImg/uploadDataActive.png')
    setCaijiImgActive(uploadDataActive)

    let statisData = require('../iconImg/statisData.png')
    setStatisData(statisData)
    let statisDataActive = require('../iconImg/statisDataActive.png')
    setStatisDataActive(statisDataActive)

    let userSet = require('../iconImg/userSet.png')
    setUserSet(userSet)
    let userSetActive = require('../iconImg/userSetActive.png')
    setUserSetActive(userSetActive)

  }, [])


  const routes = [
    {
      name: 'Collection',
      // title: '采集平台',
      // icon: 'plus-thick',
      img: collectData,
      imgActive: collectDataActive,
      component: Collection,
    },
    {
      name: 'Sync',
      // title: '数据同步',
      // icon: 'cloud-sync',
      img: uploadData,
      imgActive: uploadDataActive,
      component: Sync,
    },
    {
      name: 'Chart',
      // title: '数据统计',
      // icon: 'chart-arc',
      img: statisData,
      imgActive: statisDataActive,
      component: Chart,
    },
    {
      name: 'Setting',
      // title: '用户设置',
      // icon: 'cog',
      img: userSet,
      imgActive: userSetActive,
      component: Setting,
    },
  ];




  const {
    state: {theme},
  } = React.useContext(Context);

  const {
    state: {isLogin, isInit},
  } = React.useContext(GlobalContext);

  const [navTheme, setNavTheme] = React.useState({
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.screenBgColor,
    },
  });

  React.useEffect(() => {
    setNavTheme({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        // app界面最底层背景颜色
        // background: theme.screenBgColor,
        background:'rgba(255)'
      },
    });
  }, [theme]);

  return isInit ? (
    <>
      <Lock />
      {!isLogin ? <Login /> : <></>}
      <NavigationContainer theme={navTheme}>
        {/* 隐藏设备顶部状态栏（电量 时间） */}
        <StatusBar
          backgroundColor="#ff0000"
          translucent={true}
          hidden={true}
          animated={true}
        />
        <NavigatorTabs routes={routes} />
        
        {/* <ImageBackground source={require('../iconImg/testbg.webp')} style={[{width:'100%', height:'100%'}]}></ImageBackground> */}
      </NavigationContainer>
    </>
  ) : (
    <View
      style={[tailwind.flex1, tailwind.justifyCenter, tailwind.itemsCenter]}
      >
      <View style={[styles.loading]}>
        <ActivityIndicator
          size={50}
          animating={true}
          color={colors.purple700}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    ...tailwind.absolute,
    ...tailwind.wFull,
    ...tailwind.hFull,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
    backgroundColor: 'rgba(255,255,255,0.6)',
    zIndex: 200,
  },
});
