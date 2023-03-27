import React from 'react';
// import {Dimensions} from 'react-native';
// import Orientation from 'react-native-orientation-locker';
import NetInfo from '@react-native-community/netinfo';
import storage from '../utils/storage';
import * as area from '../database/area';
import * as baseData from '../database/base_data';
import * as user from '../database/user';
import reducer from './reducer';

// 上下文空间
const Context = React.createContext();

// 消费者
const Consumer = Context.Consumer;

// 全局的state
const Provider = props => {
  const [state, dispatch] = React.useReducer(reducer, {
    // tab页 导航是否显示
    isTabBarShow: true,
    // fab是否显示，代码中没有使用到FAB组件，所以这个参数 没有什么意义
    isFabShow: true,
    // 左侧抽屉是否显示，(点击采集平台时，出现左侧抽屉)
    drawerShowFlg: null,
    // 是否锁屏
    isLock: false,
    // 锁屏的偏移值
    lockXY: {x: 0, y: 0},
    // 数据库更新标志，当变化时，执行 useEffect2
    upBaseDataFlg: '',
    // 是否初始化结束 (有初始化，结束后变为 true)
    isInit: false,
    // 无意义参数
    FABItem: [],
    // 桥梁结构数据 (有初始化)
    basememberinfo: [], 
    // 用户信息 (有初始化)
    userInfo: null,
    // 是否登录 (有初始化判断)
    isLogin: false,
    // 数字键盘
    keyboard: [
      ['1', '2', '3', '%', '('],
      ['4', '5', '6', '#', ')'],
      ['7', '8', '9', '+', 'k'],
      ['/', '0', '.', '-', ','],
    ],
    // 屏幕配置
    screen: {
      height: 533,
      width: '100%',
    },
    // 网络连接状态 (有初始化 并 持续监听)
    networkState: {},

    //*********后续添加的参数 start **********/
    // ---- area表 获取
    // 养护区列表
    // areaList:[],
    // 路线列表
    // routeList:[]

    // baseData表 获取
    // 桥梁类型参数
    // bridgetype:[]
    // 桥幅属性
    // bridgeside:[]
    // 功能类型
    // bridgefunc :[]
    // 结构体系-梁式桥
    // bridgestruct-g :[]
    // 结构体系-拱式桥
    // bridgestruct-a :[]
    // 结构体系-悬索桥
    // bridgestruct-s :[]
    // 结构体系-斜拉桥
    // bridgestruct-c :[]
    // 照明系统
    // bridgelightsys :[]
    // 桥台形式
    // bridgeabutment :[]
    // 桥墩形式
    // bridgepier :[]
    // 支座编号
    // bridgepadno :[]
    //*********后续添加的参数 end **********/
  });

  React.useEffect(() => {
    // console.info(Dimensions.get('window'));
    // Orientation.addOrientationListener(type => {
    //   const {height, width} = Dimensions.get('window');
    //   dispatch({type: 'screen', payload: {height: height - 20, width}});
    // });
    // 获取 并 监听 网络连接状态
    NetInfo.addEventListener(res => {
      dispatch({
        type: 'networkState',
        payload: {
          type: res.type,
          isConnected: res.isConnected,
        },
      });
    });
    NetInfo.fetch().then(res => {
      dispatch({
        type: 'networkState',
        payload: {
          type: res.type,
          isConnected: res.isConnected,
        },
      });
    });

    //从 user 表中获取
    //获取当前登录的用户的信息
    user
      .getLoginUser()
      .then(res => {
        if (res) {
          // 如果res存在，那么表示当前以及登录
          // 设置userData
          const userData = {
            ...res,
            groups: JSON.parse(res.groups),
            roles: JSON.parse(res.roles),
            company: JSON.parse(res.company),
            token: JSON.parse(res.token),
          };
          // 设置程序里的用户信息，临时存储，只在软件打开时存在
          storage.setUserInfo(userData);
          // 将用户信息存入 全局state
          dispatch({
            type: 'userInfo',
            payload: userData,
          });
          // 设置登录为 true
          dispatch({type: 'isLogin', payload: true});
        } else {
          // res 不存在表示，当前未登录
          dispatch({type: 'isLogin', payload: false});
        }
        // 获取完用户信息后，初始化结束
        dispatch({type: 'isInit', payload: true});
      })
      .catch(console.log);
  }, []);

  // useEffect1
  // useEffect1 同 useEffect2 处理内容相同，只有触发条件不同
  // useEffect1 是 userInfo，useEffect2 是 upBaseDataFlg && userInfo
  React.useEffect(() => {
    //-----当用户信息变化时 触发
    // 没有用户信息时，返回
    if (!state.userInfo) {
      return;
    }
    // 有用户信息时，执行以下操作
    // 获取 养护区/路段 信息
    area.list().then(res => {
      // 养护区列表
      const areaList = [];
      // 路线列表
      const routeList = [];
      // 对res 遍历
      res.forEach(item => {
        // 当类别为 area 时，将数据存入养护区列表
        if (item.category === 'area') {
          areaList.push(item);
        }
        // 当类别为 route 时，将数据存入路线列表
        if (item.category === 'route') {
          routeList.push(item);
        }
      });
      // 将参数存入 全局的 state
      dispatch({type: 'areaList', payload: areaList});
      dispatch({type: 'routeList', payload: routeList});
    });
    // 获取 基础数据表 的数据
    baseData.list().then(res => {
      // 根据分类 分组 数据
      const items = {};
      res.forEach(item => {
        if (items[item.category]) {
          items[item.category].push(item);
        } else {
          items[item.category] = [item];
        }
      });
      Object.keys(items).forEach(key => {
        // 对值排序后，将每个key存入 全局的state
        dispatch({
          type: key,
          payload: items[key].sort((a, b) => a.order - b.order),
        });
      });
    });
    // 从本地获取 桥梁结构数据 ，并将数据赋值给 state中的参数
    storage.getBaseItem('桥梁结构数据').then(res => {
      dispatch({type: 'basememberinfo', payload: res?.data || []});
    });
  }, [state.userInfo]);

  // useEffect2
  // useEffect1 同 useEffect2 处理内容相同，只有触发条件不同
  // useEffect1 是 userInfo，useEffect2 是 upBaseDataFlg && userInfo
  React.useEffect(() => {
    // 数据库不升级 或 没有用户信息 返回
    if (!state.upBaseDataFlg || !state.userInfo) {
      return;
    }
    // 数据库升级 并且 有用户信息 执行以下操作
    // 从 area 表中获取 养护区数据 和 路线数据 并存入全局state
    area.list().then(res => {
      const areaList = [];
      const routeList = [];
      res.forEach(item => {
        if (item.category === 'area') {
          areaList.push(item);
        }
        if (item.category === 'route') {
          routeList.push(item);
        }
      });
      dispatch({type: 'areaList', payload: areaList});
      dispatch({type: 'routeList', payload: routeList});
    });
    // 获取 基础数据表 的数据
    baseData.list().then(res => {
      const items = {};
      res.forEach(item => {
        if (items[item.category]) {
          items[item.category].push(item);
        } else {
          items[item.category] = [item];
        }
      });
      Object.keys(items).forEach(key => {
        dispatch({
          type: key,
          payload: items[key].sort((a, b) => a.order - b.order),
        });
      });
    });
    // 对值排序后，将每个key存入 全局的state
    storage.getBaseItem('桥梁结构数据').then(res => {
      console.info('basememberinfo');
      dispatch({type: 'basememberinfo', payload: res?.data || []});
    });
  }, [state.upBaseDataFlg, state.userInfo]);

  return (
    <Context.Provider value={{state, dispatch}}>
      {props.children}
    </Context.Provider>
  );
};

export {Context, Consumer, Provider};
