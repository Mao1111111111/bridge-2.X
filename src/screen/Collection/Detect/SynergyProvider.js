import React, { useEffect } from 'react';
import reducer from '../../../providers/reducer';
import * as synergyTest from '../../../database/synergy_test';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 上下文空间
const Context = React.createContext();

// 消费者
const Consumer = Context.Consumer;

// 全局的state
const Provider = props => {
  const [state, dispatch] = React.useReducer(reducer, {
    // WSPath
    WSPath: '',
    // ws开启
    wsOpen: false,
    //  连接状态 未连接、已连接、断开、结束
    wsConnectionState: '未连接',
    // ws对象
    wsConnection: React.useRef(),
    // 当前协同检测信息
    curSynergyInfo: null,
    // 当前协同检测的桥梁信息
    curSynergyBridgeInfo: null,
    // 在线状态表格数据
    allyStatusList: null,

    // 协同检测数据
    synergyTestData: null,
    // 用户检测记录
    userRecordData: null
  });

  useEffect(() => {
    if (state.wsOpen && (state.wsConnectionState == '未连接'||state.wsConnectionState == '已关闭')) {
      // 创建连接
      state.wsConnection.current = new WebSocket(state.WSPath);
      // 打开
      state.wsConnection.current.onopen = () => {
        console.log("打开");
        dispatch({ type: 'wsConnectionState', payload: '已连接' })
      }
      // 接收
      state.wsConnection.current.onmessage = (e) => {
        console.log("接收");
        let data = JSON.parse(e.data)
        if (data.type == 'ally_status') {
          // 处理协同人员状态列表
          dealSynergyPeople(data.content)
        } else if (data.type == 'record') {
          // 处理检测记录数据
          dealTestRecordData(data.content)
        }
      };
      // 关闭时触发
      state.wsConnection.current.onclose = (e) => {
        console.log("关闭", e);
        dispatch({ type: 'wsConnectionState', payload: '已关闭' })
      };
      // 处理错误
      state.wsConnection.current.onerror = (e) => {
        console.log('错误', e);
        dispatch({ type: 'wsConnectionState', payload: '错误' })
      };
    }else if(state.wsOpen == false && state.wsConnectionState == '已连接'){
      // 设置ws状态
      dispatch({ type: 'wsConnectionState', payload: '未连接' })
      // 关闭协同检测
      closeWs()
    }
  }, [state.wsOpen])

  // 处理在线人员
  const dealSynergyPeople = (data) => {
    console.log("data",data);
    let list = []
    // 处理在线数据
    for(let i=0;i<data.online.length;i++){
      let user_id_arr = data.online[i].user_id.split(',')
      list.push({
        deviceId:data.online[i].device_id,
        time:data.online[i].time,
        realname:data.online[i].user_name,
        username:user_id_arr[0],
        userid:user_id_arr[1],
        state:'在线'
      })
    }
    // 处理离线数据
    for(let i=0;i<data.offline.length;i++){
      let user_id_arr = data.offline[i].user_id.split(',')
      list.push({
        deviceId:data.offline[i].device_id,
        time:data.offline[i].time,
        realname:data.offline[i].user_name,
        username:user_id_arr[0],
        userid:user_id_arr[1],
        state:'离线'
      })
    }
    console.log("list",list);
    syPeopleToDatabase(list)
    // 设置协同人员状态列表 allyStatusList
    dispatch({ type: 'allyStatusList', payload: list })
  }

  // 人员信息存入协同检测表
  const syPeopleToDatabase = (list) => {
    let participator = JSON.parse(state.curSynergyInfo.participator)
    for(let i=0;i<list.length;i++){
      let existIndex = participator.findIndex(item=>item.deviceId==list[i].device_id)
      if(existIndex==-1){
        participator.push({
          username:list[i].username,
          realname:list[i].realname,
          userid:list[i].userid,
          deviceId:list[i].device_id,
          isSelf:"false"
        })
      }
    }
    console.log("participator",participator);
    // 新的协同数据
    let newCurSynergyInfo = {
      ...state.curSynergyInfo,
      participator:JSON.stringify(participator)
    }
    // 更新全局参数中的数据
    dispatch({ type: 'curSynergyInfo', payload: newCurSynergyInfo })
    // 更新本地协同数据
    AsyncStorage.setItem('curSynergyInfo', JSON.stringify(newCurSynergyInfo))
    // 更新数据库的数据
    synergyTest.updateParticipator({
      participator:JSON.stringify(participator),
      bridgereportid:state.curSynergyInfo.bridgereportid
    })
  }


  // 检测记录数据
  const dealTestRecordData = (data) => {
    // 
    console.log("data",data);
  }

  // 关闭协同检测
  const closeWs = () => {
    if (state.wsConnection.current) {
      state.wsConnection.current?.close();
    }
  }

  // 发送人员信息
  // const sendPeople = (data) => {
  //   state.wsConnection.current.send(data)
  // }


  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, Consumer, Provider };