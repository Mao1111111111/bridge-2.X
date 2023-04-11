import React,{useState,useEffect} from 'react';
import {tailwind} from 'react-native-tailwindcss';
import {Text,View, TouchableOpacity, StyleSheet, Animated, Image, StatusBar,Pressable, ImageBackground} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Context} from '../providers/GlobalProvider';
import {Context as ThemeContext} from '../providers/ThemeProvider';
import Headerbar from './Headerbar';
import {Context as GlobalContext} from '../providers/GlobalProvider';
// import {BoxShadow} from '../declaration/react-native-shadow'
import ModalDropdown from 'react-native-modal-dropdown';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Caiji from '../../src/screen/Collection/Index';
import Shuju from '../../src/screen/Sync/Index';
import Tongji from '../../src/screen/Chart';
import Shezhi from '../../src/screen/Setting';
import { log } from 'react-native-reanimated';

const Tab = createBottomTabNavigator();

const TabItem = ({title, icon, img,imgActive,isActive}) => {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  return (
    <>
      {/* <Icon
        name={icon}
        size={20} // icon尺寸
        style={{
          ...(isActive ? theme.primaryTextStyle : {}),
          ...tailwind.mR2, // icon与文字的间隔
        }}
      />
      <Text
      // 一级菜单样式
        style={{
          ...tailwind.textBase, // 字体大小 textBase\textXs\textSm
          ...tailwind.fontBold, // 字型 加粗
          ...(isActive ? theme.primaryTextStyle : {}),
        }}>
        {title}
      </Text> */}
        {/* <Image style={
            { height: 50, width: 326, alignItems: 'center' }}
            source={require('../iconImg/logo.png')}
        /> */}
        <Image
          style={
            { height: 57, width: 129, alignItems: 'center' }}
          source={isActive ? imgActive : img}
        />
    </>
  );
};


// 自定义 TabBar 渲染
const TabBar = ({state, navigation, descriptors}) => {

  const {
    state: {userInfo},
  } = React.useContext(GlobalContext);

  const {
    state: {isTabBarShow},
  } = React.useContext(Context);

  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const [tabHeight] = React.useState(new Animated.Value(1));

  // 调整一级菜单导航栏高度
  const height = tabHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 57],
    extrapolate: 'clamp',
  });

  React.useEffect(() => {
    if (isTabBarShow) {
      Animated.timing(tabHeight, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(tabHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isTabBarShow, tabHeight]);


  const handlePress = (route, index) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
    });
    const isFocused = state.index === index;
    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  

  const type = ['采集平台', '数据同步','数据统计','用户设置']
  
  const [toPage, setToPage] = useState()
  // 分类选择
  _selectType = (indexA, value) => {
    // console.log('---', indexA, value)
      {state.routes.map((route, index) =>(
        indexA == '0' && indexA == index ? handlePress(route, index) :
        indexA == '1' && indexA == index ? handlePress(route, index) :
        indexA == '2' && indexA == index ? handlePress(route, index) :
        indexA == '3' && indexA == index ? handlePress(route, index) : <></>
      ))}
  }
  // 下拉列表分隔符
  _separator = () => {
    return(
      <Text style={{height:0}}></Text>
    )
  }
  // 下拉框位置
  _adjustType = () => {
    return({
      top: 25,
      right: 15
    })
  }

  return (
    // Animated 给菜单添加点击动画
    <Animated.View
      style={[
        [
          // 一级导航栏置顶
          {position: 'absolute'},
          {width: '100%'},
          tailwind.flexRow,
          // tailwind.flexGrow0,
          theme.primaryBgStyle,
          styles.boxShadow,
          styles.bgcolor,
          {height},
          // {backgroundColor:'#000'}
          // {top:50}
        ],
      ]}
      >
      {/* logo */}
      {/* <Image style={
        { height: 55, width: 180, alignItems: 'center' }}
        source={require('../iconImg/logo.png')}
      /> */}
      {/* 软件版本 */}
      {/* <Text
        style={
          [
            {
              fontSize:8,
              color:'#394f86',
              fontWeight: 'bold',
              right:65,
              top:25
            }
          ]
        }
      >v1.083</Text> */}
      {/* 中间导航按钮 */}
      {/* {state.routes.map((route, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(route, index)}
          style={[
            tailwind.flexRow,
            tailwind.flex1,
            tailwind.justifyCenter,
            tailwind.itemsCenter,
            tailwind.shadow,
          ]}>
          <TabItem
            {...descriptors[route.key].options}
            isActive={state.index === index}
          />
        </TouchableOpacity>
      ))} */}

      {/* 用户信息 */}
      {/* <Pressable onPress={() => menuList()}>
        <View style={styles.user}>
          <Image style={{ height: 24, width: 24, alignItems: 'center' }}
              source={require('../iconImg/user.png')}
          />
          <Text>{' '}</Text>
          <Text>{userInfo?.nickname}</Text>
        </View>
      </Pressable> */}
      {/* <View style={styles.user}> */}
        {/* 用户头像 */}
        {/* <Image style={{ height: 24, width: 24, alignItems: 'center' }}
            source={require('../iconImg/user.png')}
        /> */}
        {/* 整个小间隔 */}
        {/* <Text>{' '}</Text>
        <Text>{userInfo?.nickname}</Text> */}
      {/* </View> */}

      {/* 下拉式一级导航菜单 */}
      <ModalDropdown style={[styles.user,{top:0}]}
        adjustFrame={this._adjustType}
        options={type} // 选项内容
        dropdownTextHighlightStyle={{color:'#2b427d',fontWeight:'800'}}
        dropdownStyle={[{width:100,height:145,alignItems:'center'}]}
        dropdownTextStyle={[{width:80,textAlign:'center'}]}
        onSelect={this._selectType} // 点击选项时，执行的方法
        defaultValue={'采集平台'}
      >
        
        <View style={styles.user}>
          <Image style={{ height: 24, width: 24, alignItems: 'center' }}
              source={require('../iconImg/user.png')}
          />
          <Text>{' '}</Text>
          <Text>{userInfo?.nickname}</Text>
        </View>
      </ModalDropdown>
      
    </Animated.View>
    
    
  );
};
export default function NavigatorTabs({routes}) {
  return (
    <Tab.Navigator header={false} tabBar={props => <TabBar {...props} />}>
      {routes.map(item => (
        <Tab.Screen
          key={item.name}
          {...item}
          options={{
            // 将默认的顶部导航栏高度设为0进行隐藏
            // headerStyle: tailwind.h0,
            // 将默认的顶部导航栏颜色设为与背景色一致
            headerStyle: [{backgroundColor: '#e0e0e0'}], 
            title: item.title,
            icon: item.icon,
            img: item.img,
            imgActive: item.imgActive
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  // 顶部导航栏阴影
  boxShadow: {
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
  },
  bgcolor: {
    backgroundColor:'#eeeeee'
  },
  box: {
    ...tailwind.flexRow,
    ...tailwind.pY3,
    ...tailwind.pX1,
    // ...tailwind.shadow2xl,
  },
  user: {
    ...tailwind.mX3,
    ...tailwind.flex1,
    ...tailwind.flexRow,
    ...tailwind.justifyEnd,
    ...tailwind.itemsCenter,
  },
  menuListStyle: {
    zIndex: 999,
    backgroundColor:'#fff'
  }
});
