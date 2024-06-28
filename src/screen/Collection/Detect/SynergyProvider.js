import React, { useEffect } from 'react';
import reducer from '../../../providers/reducer';

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

    // 在线状态
    ally_status: null,
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
        sendPeople()
      }
      // 接收
      state.wsConnection.current.onmessage = (e) => {
        let data = JSON.parse(e.data)
        console.log("data", JSON.stringify(data));
        if (data.type == 'ally_status') {
          // 处理协同人员状态
          let SynergyStateList = dealSynergyPeople(data.content)
          // 设置协同人员状态 ally_status
          dispatch({ type: 'ally_status', payload: SynergyStateList })
        } else if (data.type == 'record') {
          // 处理检测记录数据
          dealTestRecordData(data)
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
  const dealSynergyPeople = (list) => {
    // let participator = JSON.parse(state.curSynergyInfo.synergyData.participator)
    // let newList = []
    // list.offline.forEach(item => {
    //   let existIndex = participator.findIndex(i => i.deviceId == item)
    //   if (existIndex !== -1) {
    //     newList.push({
    //       ...participator[existIndex],
    //       state: 'offline'
    //     })
    //   }
    // })
    // list.online.forEach(item => {
    //   let existIndex = participator.findIndex(i => i.deviceId == item)
    //   if (existIndex !== -1) {
    //     newList.push({
    //       ...participator[existIndex],
    //       state: 'online'
    //     })
    //   }
    // })
    // return newList
  }

  // 检测记录数据
  const dealTestRecordData = (data) => {
    // 
  }

  // 关闭协同检测
  const closeWs = () => {
    if (state.wsConnection.current) {
      state.wsConnection.current?.close();
    }
  }

  // 发送人员信息
  const sendPeople = () => {
    state.wsConnection.current.send(JSON.stringify({ 'aa': 1 }))
  }


  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, Consumer, Provider };