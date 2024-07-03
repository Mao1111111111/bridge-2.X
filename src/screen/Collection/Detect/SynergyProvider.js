import React, { useEffect } from 'react';
import reducer from '../../../providers/reducer';
import * as synergyTest from '../../../database/synergy_test';

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
        dispatch({ type: 'wsConnectionState', payload: '已连接' })
      }
      // 接收
      state.wsConnection.current.onmessage = (e) => {
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
      console.log("3333");
    }
  }, [state.wsOpen])

  // 处理在线人员
  const dealSynergyPeople = (data) => {
    let list = []
    // 处理在线数据
    for(let i=0;i<data.online.length;i++){
      list.push({
        ...data.online[i],
        state:'在线'
      })
    }
    // 处理离线数据
    for(let i=0;i<data.offline.length;i++){
      list.push({
        ...data.offline[i],
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
    console.log("curSynergyInfo",state.curSynergyInfo);
    let participator = JSON.parse(state.curSynergyInfo.participator)
    for(let i=0;i<list.length;i++){
      let existIndex = participator.findIndex(item=>item.deviceId==list[i].device_id)
      if(existIndex==-1){
        participator.push({
          username:list[i].user_id,
          realname:list[i].user_name,
          userid:list[i].user_id,
          deviceId:list[i].device_id,
          isSelf:"false"
        })
      }
    }
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