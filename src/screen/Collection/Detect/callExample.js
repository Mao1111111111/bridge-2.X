/* 
    synergy_test_record 表调用示例
 */
import * as synergyTestRecord from '../../../database/synergy_test_record';

// 调用保存
const callSave = () => {
    let data = {
        bridgeid:"",
        bridgereportid:"",
        userid:"",
        synergyid:"",
        checkTime:"",
        diseaseName:"",
        isCoop:"",
        memberid:"",
        membername:"",
        user:""
    }
    synergyTestRecord.save(data)
    // 或者
    await synergyTestRecord.save(data)
}

// 根据bridgereportid 获取这个桥梁的 所有协同检测记录
const callGetList = () => {
    let list = await synergyTestRecord.getList(bridgereportid)
}

// 更新 isCoop -- 每次更新一条，memberid 确定唯一值
const callupdateIsCoop = () => {
    let data = {
        isCoop:'true',
        memberid:'g114ondgptv9904ondgpuxc38_b100001_luuloy3z'
    }
    await synergyTestRecord.updateIsCoop(data)
}

// 更新全部数据
