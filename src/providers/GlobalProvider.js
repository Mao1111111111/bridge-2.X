import React from 'react';
// import {Dimensions} from 'react-native';
// import Orientation from 'react-native-orientation-locker';
import NetInfo from '@react-native-community/netinfo';
import storage from '../utils/storage';
import * as area from '../database/area';
import * as baseData from '../database/base_data';
import * as user from '../database/user';
import reducer from './reducer';

const Context = React.createContext();

const Consumer = Context.Consumer;

// 全局的state
const Provider = props => {
  const [state, dispatch] = React.useReducer(reducer, {
    isTabBarShow: true,
    isFabShow: true,
    drawerShowFlg: null,
    isLock: false,
    lockXY: {x: 0, y: 0},
    upBaseDataFlg: '',
    isInit: false,
    FABItem: [],
    basememberinfo: [], // 桥梁结构数据
    userInfo: null,
    isLogin: false,
    keyboard: [
      ['1', '2', '3', '%', '('],
      ['4', '5', '6', '#', ')'],
      ['7', '8', '9', '+', 'k'],
      ['/', '0', '.', '-', ','],
    ],
    screen: {
      height: 533,
      width: '100%',
    },
    networkState: {},
  });

  React.useEffect(() => {
    // console.info(Dimensions.get('window'));
    // Orientation.addOrientationListener(type => {
    //   const {height, width} = Dimensions.get('window');
    //   dispatch({type: 'screen', payload: {height: height - 20, width}});
    // });
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
    user
      .getLoginUser()
      .then(res => {
        if (res) {
          const userData = {
            ...res,
            groups: JSON.parse(res.groups),
            roles: JSON.parse(res.roles),
            company: JSON.parse(res.company),
            token: JSON.parse(res.token),
          };
          storage.setUserInfo(userData);
          dispatch({
            type: 'userInfo',
            payload: userData,
          });
          dispatch({type: 'isLogin', payload: true});
        } else {
          dispatch({type: 'isLogin', payload: false});
        }
        dispatch({type: 'isInit', payload: true});
      })
      .catch(console.log);
  }, []);

  React.useEffect(() => {
    if (!state.userInfo) {
      return;
    }
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
    storage.getBaseItem('桥梁结构数据').then(res => {
      dispatch({type: 'basememberinfo', payload: res?.data || []});
    });
  }, [state.userInfo]);

  React.useEffect(() => {
    if (!state.upBaseDataFlg || !state.userInfo) {
      return;
    }
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
