import React,{useState,useEffect} from 'react';
import {StatusBar, View, StyleSheet, Image, ImageBackground, Text, Pressable,Dimensions} from 'react-native';
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
import Historical from './Historical'
import Login from './Login';
import Lock from '../components/Lock';
import NurToast from '../components/NurToast';


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

  // 全局参数 -- 养护区列表、路线列表、用户信息
  const {
    state: {areaList, routeList, userInfo},
    dispatch,
  } = React.useContext(GlobalContext);

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
    {
      name: 'Historical',
      // title: '历史数据',
      // icon: 'cog',
      img: userSet,
      imgActive: userSetActive,
      component: Historical,
    },
  ];



  // 主题
  const {
    state: {theme},
  } = React.useContext(Context);

  // 全局参数 是否登录、是否初始化结束
  const {
    state: {isLogin, isInit},
  } = React.useContext(GlobalContext);

  // 导航的主题色
  const [navTheme, setNavTheme] = React.useState({
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.screenBgColor,
    },
  });

  const headerItems = [
    // 采集平台点击，打开抽屉导航
    // {
    //   name: '采集平台',
    //   onPress: () =>
    //     dispatch({
    //       type: 'drawerShowFlg',
    //       payload: Math.random().toString(36).slice(-8),
    //     }),
    // },
    // {
    //   name: '检测平台',
    // },
    {
      name: '项目管理',
    },
  ];

  React.useEffect(() => {
    setNavTheme({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        // app界面最底层背景颜色
        // background: theme.screenBgColor,
        background:'rgba(255,255,255,0)'
      },
    });
  }, [theme]);

  // 判断是否初始化结束  初始化：获取网络状态、获取用户信息
  return isInit ? (
    // 初始化结束
    <>
      {/* 锁屏组件，默认不锁屏 */}
      <Lock />
      {/* 登录，没有用户信息时，显示登录页面 */}
      {!isLogin ? <Login /> : <></>}
      {/* 路由最顶层包裹 */}
      <NavigationContainer theme={navTheme}>
        {/* 隐藏设备顶部状态栏（电量 时间） */}
        <StatusBar
          backgroundColor="#ff0000"
          translucent={true}
          hidden={true}
          animated={true}
        />
        {/* tab 导航 */}
        <NavigatorTabs routes={routes} headerItems={headerItems}  pid='P1001' />
        <View style={{alignItems: "center"}}>
          <NurToast />
        </View>
      </NavigationContainer>
    </>
  ) : (
    // 未初始化结束
    // 加载中
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
