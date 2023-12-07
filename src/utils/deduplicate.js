/* 
    数据库去重
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as bridge from '../database/bridge';
import * as bridgeMember from '../database/bridge_member';

// 数据库去重
export const deduplicate = async () => {
    // 桥梁构件去重
    await deduplicate_bridge_member()
}

// 桥梁构件去重
const deduplicate_bridge_member = async () => {
    try{
        // ---判断是否 是 首次去重
        // 本地 获取 去重参数
        const isDeduplicate = await AsyncStorage.getItem('isDeduplicate')
        // 如果没有去重则处理
        if(!isDeduplicate){
            // 桥梁列表
            let bridgeList = await bridge.bridgeList();
            console.log("bridgeList",bridgeList);
            // 如果当前有桥梁
            if(bridgeList.length>0){
                for(let i=0;i<bridgeList.length;i++){
                    let bridgeid = bridgeList[i].bridgeid
                    // 逐个去重
                    await _deduplicate_bridge_member(bridgeid)
                }
            }
        }
    }catch(e){
      console.log('-',e);
    }
}

// 构件去重函数
const _deduplicate_bridge_member = async (bridgeid) => {
    try{
        // 根据桥梁id获取桥梁构件列表
        let bridgeMemberList = await bridgeMember.bridgeMemberList(bridgeid)
        console.log("bridgeMemberList",bridgeMemberList);
        // if(bridgeMemberList)
        // 构件编号分组
        let memberIdGroup = {}
        // 构件列表遍历
        for(let i=0;i<bridgeMemberList.length;i++){
            // 对构件编号分割
            let bridgeMemberIdArr = bridgeMemberList[i].memberid.split('_')
            // 判断构件编号分组中是否存在

        }
    }catch(e){
      console.log('-',e);
    }
    
    
}