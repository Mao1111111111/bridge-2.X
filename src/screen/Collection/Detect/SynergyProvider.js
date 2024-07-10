import React, { useEffect } from 'react';
import reducer from '../../../providers/reducer';
import * as synergyTest from '../../../database/synergy_test';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context as GlobalContext } from '../../../providers/GlobalProvider';
var _ = require('lodash');

// 上下文空间
const Context = React.createContext();

// 消费者
const Consumer = Context.Consumer;

// 全局的state
const Provider = props => {

  const {
    state: { networkState },
  } = React.useContext(GlobalContext);

  const [state, dispatch] = React.useReducer(reducer, {
    // ws开启
    wsOpen: false,
    //  连接状态 未连接、已连接
    wsConnectionState: '未连接',
    // ws错误原因
    wsError: '',
    // ws对象
    wsConnection: React.useRef(),
    // 当前协同检测信息
    curSynergyInfo: null,
    // 当前协同检测的桥梁信息
    curSynergyBridgeInfo: null,
    // 在线状态表格数据
    allyStatusList: null,

    // 协同检测_操作记录数据
    operationNoteData: null,
    // 协同检测数据
    synergyTestData: null,
    // 用户检测记录
    userRecordData: null
  });

  // 监听ws的开启状态
  useEffect(() => {
    wsLink(state)
  }, [state.wsOpen])

  // 监听网络状态
  useEffect(() => {
    wsReLink(state, networkState)
  }, [networkState])

  // ws连接  正常连接、正常关闭、异常断开
  const wsLink = React.useCallback(_.debounce(function (state) {
    // 正常连接 -- ws打开，ws为null
    if (state.wsOpen) {
      // 创建连接
      state.wsConnection.current = new WebSocket(state.curSynergyInfo.WSPath);
      // 打开
      state.wsConnection.current.onopen = () => {
        console.log("打开", state.wsConnection);
        dispatch({ type: 'wsConnectionState', payload: '已连接' })
      }
      // 接收
      state.wsConnection.current.onmessage = (e) => {
        let data = JSON.parse(e.data)
        console.log("接收", JSON.stringify(data));
        if (data.type == 'ally_status') {
          // 处理协同人员状态列表
          dealSynergyPeople(state.curSynergyInfo, data.content)
        } else if (data.type == 'record') {
          // 处理检测记录数据
          dealTestRecordData(data.content)
        }
      };
      // 关闭时触发
      state.wsConnection.current.onclose = (e) => {
        console.log("关闭", e);
        dispatch({ type: 'wsConnectionState', payload: '未连接' })
      };
      // 处理错误
      state.wsConnection.current.onerror = (e) => {
        console.log('错误', e);
        dispatch({ type: 'wsError', payload: e.message })
        // 断开ws
        closeWs()
      };
    }

    // 正常断开
    if (!state.wsOpen) {
      // 设置ws状态
      dispatch({ type: 'wsConnectionState', payload: '未连接' })
      // 设置错误原因
      dispatch({ type: 'wsError', payload: '' })
      // 断开ws
      closeWs()
    }
  }, 300, {
    'leading': false,
    'trailing': true
  }), [])

  // ws重连
  const wsReLink = React.useCallback(_.debounce(function (state, networkState) {
    // 网络连接，ws打开，ws为空，ws为未连接
    if (networkState.isConnected && state.wsOpen && state.wsConnectionState == '未连接') {
      // 创建连接
      state.wsConnection.current = new WebSocket(state.curSynergyInfo.WSPath);
      // 打开
      state.wsConnection.current.onopen = () => {
        console.log("打开1");
        dispatch({ type: 'wsConnectionState', payload: '已连接' })
      }
      // 接收
      state.wsConnection.current.onmessage = (e) => {
        let data = JSON.parse(e.data)
        console.log("接收1", JSON.stringify(data));
        if (data.type == 'ally_status') {
          // 处理协同人员状态列表
          dealSynergyPeople(state.curSynergyInfo, data.content)
        } else if (data.type == 'record') {
          // 处理检测记录数据
          dealTestRecordData(data.content)
        }
      };
      // 关闭时触发
      state.wsConnection.current.onclose = (e) => {
        console.log("关闭1", e);
        dispatch({ type: 'wsConnectionState', payload: '未连接' })
      };
      // 处理错误
      state.wsConnection.current.onerror = (e) => {
        console.log('错误1', e);
        dispatch({ type: 'wsError', payload: e.message })
        // 断开ws
        closeWs()
      };
    }
  }, 600, {
    'leading': false,
    'trailing': true
  }), [])

  // 处理在线人员
  const dealSynergyPeople = (curSynergyInfo, data) => {
    let list = []
    // 处理在线数据
    for (let i = 0; i < data.online.length; i++) {
      let user_id_arr = data.online[i].user_id.split(',')
      list.push({
        deviceId: data.online[i].device_id,
        time: data.online[i].time,
        realname: data.online[i].user_name,
        username: user_id_arr[0],
        userid: user_id_arr[1],
        state: '在线'
      })
    }
    // 处理离线数据
    for (let i = 0; i < data.offline.length; i++) {
      let user_id_arr = data.offline[i].user_id.split(',')
      list.push({
        deviceId: data.offline[i].device_id,
        time: data.offline[i].time,
        realname: data.offline[i].user_name,
        username: user_id_arr[0],
        userid: user_id_arr[1],
        state: '离线'
      })
    }
    syPeopleToDatabase(curSynergyInfo, list)
    // 设置协同人员状态列表 allyStatusList
    dispatch({ type: 'allyStatusList', payload: list })
  }

  // 人员信息存入协同检测表
  const syPeopleToDatabase = (curSynergyInfo, list) => {
    let participator = curSynergyInfo.participator
    for (let i = 0; i < list.length; i++) {
      let existIndex = participator.findIndex(item => item.deviceId == list[i].deviceId)
      if (existIndex == -1) {
        participator.push({
          username: list[i].username,
          realname: list[i].realname,
          userid: list[i].userid,
          deviceId: list[i].deviceId,
          isSelf: "false"
        })
      }
    }
    // 新的协同数据
    let newCurSynergyInfo = {
      ...curSynergyInfo,
      participator: participator
    }
    // 更新全局参数中的数据
    dispatch({ type: 'curSynergyInfo', payload: newCurSynergyInfo })
    // 更新数据库的数据
    synergyTest.updateParticipator({
      participator: JSON.stringify(participator),
      bridgereportid: curSynergyInfo.bridgereportid
    })
  }

  // 检测记录数据
  const dealTestRecordData = (data) => {
    data.sort((a, b) => {
      return new Date(b.checkTime) - new Date(a.checkTime);
    })
    console.log("dealTestRecordData data", data);
    dispatch({ type: 'operationNoteData', payload: data })
  }

  // 关闭协同检测
  const closeWs = () => {
    if (state.wsConnection.current) {
      state.wsConnection.current?.close();
      state.wsConnection.current = null
    }
  }

  // 发送人员信息
  const sendPeople = (data) => {
    state.wsConnection.current.send(data)
  }


  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, Consumer, Provider };