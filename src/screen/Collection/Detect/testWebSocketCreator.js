import React from 'react'


export default function testWebSocketCreator() {

    // 任务信息
    const taskInfo = {
        // 协同人数
        peopleNum:'3',
        // 工程师名称
        engineer:'张三',
        // 设备id
        deviceId:deviceId
    }

    // 创建任务点击
    const createTaskBtn = () => {
        // 判断协同人数是否规范
        if(taskInfo.peopleNum){
            if(!/^-?\d+$/.test(taskInfo.peopleNum)){
                Alert.alert('协同人数格式不正确')
                return
            }
        }else{
            Alert.alert('请输入协同人数')
            return
        }

        // 判断工程师名字是否规范
        if(!taskInfo.engineer){
            Alert.alert('请输入工程师名称')
            return
        }

        // 判断网络是否连接
        if(!networkState.isConnected.isConnected){
            Alert.alert('请连接网络')
            return
        }

        // 是否连接了wifi
        if(networkState.type!=='wifi'){
            Alert.alert('请连接WIFI')
            return
        }

        // 是否连接了指定wifi
        // if(networkState.isConnected.ssid!==WIFIName){
        //     Alert.alert('请连接指定WIFI')
        //     return
        // }

        // 获取所连接wifi的ip
        NetworkInfo.getGatewayIPAddress().then(res=>{
            // 设置wifiip
            setWIFIIP(res)
            // 创建任务并加入房间
            creatTaskAddRoom(res)
        })
        
        // console.log();
    }


  return (
    <Text>testWebSocketCreator</Text>
  )
}
