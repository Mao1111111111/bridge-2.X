import React, { useEffect } from 'react';
import reducer from '../../../providers/reducer';

// 上下文空间
const Context = React.createContext();

// 消费者
const Consumer = Context.Consumer;

// 全局的state
const Provider = props => {
  const [state, dispatch] = React.useReducer(reducer, {
    // 当前协同检测信息
    curSynergyInfo: null,
    // 在线状态
    ally_status: null,
    // 协同检测数据
    synergyTestData: null,
    // ws
    ws:'',
    //  连接状态
    wsConnectionState: false,
    // deviceId
    synergydeviceId:'',
    wsConnection : React.useRef()
  });

  useEffect(() => {
    if (state.wsConnectionState) {
      console.log("111");
      // 地址
      let path = 'ws://10.1.1.71:8000' + state.ws + '?user=' + state.synergydeviceId
      // 创建连接
      state.wsConnection.current = new WebSocket(path);
      // 打开
      state.wsConnection.current.onopen = () => {}
      // 接收
      state.wsConnection.current.onmessage = (e) => {
        console.log("接收", e);
        let data = JSON.parse(e.data)
        console.log("data", data);
        console.log("curSynergyInfo", state.curSynergyInfo);
        if (data.type == 'ally_status') {
          // 处理协同人员状态
          let SynergyStateList = dealSynergyPeople(data.content)
          console.log("SynergyStateList",SynergyStateList);
          // 设置协同人员状态 ally_status
          dispatch({ type: 'ally_status', payload: SynergyStateList })
        }
      };
      // 关闭时触发
      state.wsConnection.current.onclose = (e) => {
        console.log("关闭", e);
      };
      // 处理错误
      state.wsConnection.current.onerror = (e) => {
        console.log('错误', e);
      };
    }
  }, [state.wsConnectionState])

  // 处理在线人员
  const dealSynergyPeople = (list) => {
    let participator = JSON.parse(state.curSynergyInfo.synergyData.participator)
    let newList = []
    list.offline.forEach(item=>{
      let existIndex = participator.findIndex(i=>i.deviceId==item)
      if(existIndex!==-1){
        newList.push({
          ...participator[existIndex],
          state:'offline'
        })
      }
    })
    list.online.forEach(item=>{
      let existIndex = participator.findIndex(i=>i.deviceId==item)
      if(existIndex!==-1){
        newList.push({
          ...participator[existIndex],
          state:'online'
        })
      }
    })
    return newList
  }


  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, Consumer, Provider };