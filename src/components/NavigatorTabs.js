import React,{useState,useEffect} from 'react';
import {tailwind} from 'react-native-tailwindcss';
import {Text,View, TouchableOpacity, StyleSheet, Animated, Image, StatusBar,Pressable, ImageBackground,Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Context} from '../providers/GlobalProvider';
import {Context as ThemeContext} from '../providers/ThemeProvider';
import Headerbar from './Headerbar';
import CommonView from './CommonView';
import Pid from './Pid';
import {Context as GlobalContext} from '../providers/GlobalProvider';
// import {BoxShadow} from '../declaration/react-native-shadow'
import ModalDropdown from 'react-native-modal-dropdown';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { log } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logout} from '../database/user'
import Modal from '../components/Modal';
import Button from '../components/Button';

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
const TabBar = ({state, navigation, descriptors, headerItems, pid}) => {

  const {
    state: {userInfo},
  } = React.useContext(GlobalContext);

  const {
    dispatch,
  } = React.useContext(Context);

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

  const [menuTitle, setMenuTitle] = useState('采集平台') 

  React.useEffect(() => {
    const windowWidth = Dimensions.get('window').width;
    // console.log('当前屏幕宽度',windowWidth);
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

  const handlePress = (route, index, value) => {
    // console.log('value555',route.name);
    let menuTitle = value
    setMenuTitle(menuTitle)
    // console.log('menuTitle', menuTitle);
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
    });
    const isFocused = state.index === index;
    if (!isFocused && !event.defaultPrevented) {
      // console.log('执行了路由跳转',route.name);
      navigation.navigate(route.name);
    }
  };

  const handlePress1 = (route, index, value) => {
    // console.log('value666',route.name);
    let menuTitle = value
    setMenuTitle(menuTitle)
    // console.log('menuTitle', menuTitle);
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
    });
    const isFocused = state.index === index;
    if (!isFocused && !event.defaultPrevented) {
      // console.log('执行了路由跳转',route.name);
      navigation.navigate(route.name);
    }
  };

  const [visible, setVisible] = React.useState(false);
  const close = () => {
    setVisible(false);
  };

  const asklogOut = (route, index) => {
    console.log('退出登录?');
    setVisible(true)
  }
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userInfo');
    await logout();
    dispatch({type: 'userInfo', payload: null});
    dispatch({type: 'isLogin', payload: false});
    setVisible(false)
  };

  // const type = ['用户设置','退出登录']
  const type = ['退出登录']
  // 左上角的一级菜单选项
  const typeL = ['采集平台','数据同步','数据统计','用户设置']
  
  // 分类选择
  _selectType = (indexA, value) => {
    console.log('---1', indexA, value)
      // {state.routes.map((route, index) =>(
      //   indexA == '0' && indexA == index ? handlePress(route, index, value) : <></>
      // ))}
      // indexA == '1' ? asklogOut() : <></>

      indexA == '0' ? asklogOut() : <></>
  }
  // 分类选择 左上角
  _selectTypeL = (indexA, value) => {
    console.log('---', indexA, value)
    {state.routes.map((route, index) =>(
      indexA == '0' && indexA == index ? handlePress1(route, index, value) :
      indexA == '1' && indexA == index ? handlePress1(route, index, value) :
      indexA == '2' && indexA == index ? handlePress1(route, index, value) :
      indexA == '3' && indexA == index ? handlePress1(route, index, value) : <></>
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
  // 下拉框位置 左上角
  _adjustTypeL = () => {
    return({
      top: 25,
      left: 25
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
          // theme.primaryBgStyle,
          // styles.boxShadow,
          // styles.bgcolor,
          // {height},
          {backgroundColor:'rgba(255,255,255,0)'}
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
      <Text
        style={
          [
            {
              fontSize:8,
              color:'#394f86',
              fontWeight: 'bold',
              left:8,
              top:520
            }
          ]
        }
      >v2.06</Text>
      {/* 检测公司名称 */}
      {/* <Text
        style={
          [
            {
              fontSize:14,
              color:'#394f86',
              fontWeight: 'bold',
              left:20,
              top:17,
              width:100,
              textAlign:'center',
              borderWidth:2,
            }
          ]
        }
      >采集平台</Text> */}
      <ModalDropdown
        adjustFrame={this._adjustTypeL}
        options={typeL} // 选项内容
        dropdownTextHighlightStyle={{color:'#2b427d',fontWeight:'800'}}
        dropdownStyle={[{width:120,height:145,alignItems:'center'}]}
        dropdownTextStyle={[{width:100,textAlign:'center'}]}
        onSelect={this._selectTypeL} // 点击选项时，执行的方法
        defaultValue={'采集平台'}
      >
        <ImageBackground
          source={require('../iconImg/dropdownMenu.png')} style={[{width:136, height:34,right:10,top:13}]}
        >
          <View style={styles.user}>
            <Text
              style={
                [
                  {
                    fontSize:14,
                    color:'#394f86',
                    fontWeight: 'bold',
                    width:100,
                    textAlign:'center',
                    bottom:2,
                    right:20
                  }
                ]
              }
            >{menuTitle}</Text>
          </View>
        </ImageBackground>
        
      </ModalDropdown>
      {/* 导航样式一 中间导航按钮 */}
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
        <Text>{userInfo?.nickname}</Text>
      </View> */}

      {/* <View style={[tailwind.mX19,{width:'76%'}]}>
        <Headerbar items={headerItems || []} pid={''} />
      </View> */}
      {/* 右下角的页面编号 */}
      {/* {pid ? (
        <View style={styles.pid}>
          <Pid pid={pid} size="small" />
        </View>
      ) : (
        <></>
      )} */}

      {/* 导航样式二 下拉式一级导航菜单 */}
      <ModalDropdown style={[styles.user,{top:15}]}
        adjustFrame={this._adjustType}
        options={type} // 选项内容
        dropdownTextHighlightStyle={{color:'#2b427d',fontWeight:'800'}}
        dropdownStyle={[{width:100,height:40,alignItems:'center'}]}
        dropdownTextStyle={[{width:80,textAlign:'center'}]}
        onSelect={this._selectType} // 点击选项时，执行的方法
        defaultValue={'用户设置'}
      >
        
        <View style={styles.user}>
          <Image style={{ height: 24, width: 24, alignItems: 'center' }}
              source={require('../iconImg/user.png')}
          />
          <Text>{' '}</Text>
          <Text>{userInfo?.nickname}</Text>
        </View>
      </ModalDropdown>

      <Modal onClose={close} visible={visible} title="退出登录" showHead>
        <View style={[styles.modelBody, theme.primaryBgStyle,{height: 80}]}>
          <View style={[tailwind.flexRow,tailwind.flex1, tailwind.mL2, tailwind.mT1]}>
            <TouchableOpacity onPress={close}>
              <Text style={[tailwind.mB1,tailwind.mX8,tailwind.mY8]}>取消</Text>
            </TouchableOpacity>
            <View style={tailwind.mY1} />
            <TouchableOpacity onPress={handleLogout}>
              <Text style={[tailwind.mB1,tailwind.mX16,,tailwind.mY8]}>确认</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
};


export default function NavigatorTabs({routes, headerItems, pid}) {
  return (
    <Tab.Navigator header={false} tabBar={props => <TabBar {...props} />}>
      {/* <Tab.Navigator header={false} tabBar={props => <TabBar {...props} />}> */}
      {/* 删除tebBar={....}的内容可以去除自定义的一级菜单导航按钮 */}
      {routes.map(item => (
        <Tab.Screen
          key={item.name}
          {...item}
          options={{
            // 将默认的顶部导航栏高度设为0进行隐藏
            headerStyle: tailwind.h0,
            // 将默认的顶部导航栏颜色设为与背景色一致
            // headerStyle: [{backgroundColor: '#e0e0e0'}],  //此处headeStyle与上方选其一存在
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
    // zIndex: 999,
    backgroundColor:'#fff'
  },
  pid: {
    position:'absolute',
    top:508,
    right:3,
    // height:20,
    // backgroundColor:'#fff'
  },
  modelBody: {
    ...tailwind.pX4,
    ...tailwind.pB4,
    ...tailwind.w64,
    ...tailwind.selfCenter,
    ...tailwind.rounded,
  },
});
