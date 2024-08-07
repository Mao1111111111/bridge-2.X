/* 
    历史数据-接口
 */
import * as projectTable from '../../database/project';
import * as bridgeTable from '../../database/bridge';
import * as bridgeMember from '../../database/bridge_member';
import * as bridgeProjectBind from '../../database/bridge_project_bind';
import * as bridgeReport from '../../database/bridge_report';
import * as uploadStateRecord from '../../database/upload_state_record';
import * as bridgeReportMember from '../../database/bridge_report_member';
import * as partsCheckStatus from '../../database/parts_checkstatus_data';
import * as bridgeReportFile from '../../database/bridge_report_file';
import * as checkstatusMedia from '../../database/bridge_report_member_checkstatus_media';
import * as fileGps from '../../database/file_gps';
import dayjs from 'dayjs';

const host = 'http://106.3.97.61:1081/history'

// 获取养护单位列表
export const getGcompanylist = () => {
    return new Promise((resolve, reject) => {
        fetch(host + '/get_gcompanylist', {
            method: 'POST'
        })
            .then(response => response.json())
            .then(res => {
                if (res.success) {
                    resolve(res.resultJson)
                } else {
                    reject(res.resultMsg)
                }
            })
    })
}

// 获取云端项目列表
export const getGprojectlist = (params) => {
    // 模拟数据
    params = {
        gycompanyid: 'm16244jt01000',
        userid: '63'
    }

    let form = new FormData()
    form.append('gycompanyid', params.gycompanyid)
    form.append('userid', params.userid)
    return new Promise((resolve, reject) => {
        fetch(host + '/get_gprojectlist', {
            method: 'POST',
            headers: {
                "Content-type": "multipart/form-data"
            },
            body: form
        })
            .then(response => response.json())
            .then(res => {
                if (res.success) {
                    resolve(res.resultJson)
                } else {
                    reject(res.resultMsg)
                }
            })
    })
}

// 获取云端桥梁列表
export const getBridgelist = (params) => {
    // 模拟数据
    params = {
        gprojectid: 'r100000000_1705561696577'
    }

    let form = new FormData()
    form.append('gprojectid', params.gprojectid)
    return new Promise((resolve, reject) => {
        fetch(host + '/get_bridgelist', {
            method: 'POST',
            headers: {
                "Content-type": "multipart/form-data"
            },
            body: form
        })
            .then(response => response.json())
            .then(res => {
                if (res.success) {
                    resolve(res.resultJson)
                } else {
                    reject(res.resultMsg)
                }
            })
    })
}

// 下载结构数据
export const getStructureData = (params, userInfo) => {
    params = {
        bridgeid: 'g114mv2d60lip0',
        reportid: 'g114mv2d60lip04mv2d61nbjo'
    }

    let form = new FormData()
    form.append('bridgeid', params.bridgeid)
    form.append('reportid', params.reportid)
    return new Promise((resolve, reject) => {
        fetch(host + '/get_structure_data', {
            method: 'POST',
            headers: {
                "Content-type": "multipart/form-data"
            },
            body: form
        })
            .then(response => response.json())
            .then(async res => {
                if (res.success) {
                    try {
                        // 桥梁数据
                        let data = res.resultJson
                        // 数据库中是否存在此桥梁
                        let _bridgeData = await bridgeTable.getByBridgeid(data.bridgeid)
                        if (!_bridgeData) {
                            // 存入 bridge表
                            await bridgeTable.save({
                                bridgeid: data.bridgeid,
                                bridgename: data.bridgename,
                                bridgetype: data.bridgetype,
                                bridgestation: data.bridgestation,
                                b16: data.b16,
                                areacode: '',
                                routecode: '',
                                bridgefunc: data.bridgefunc,
                                bridgeside: data.bridgeside,
                                bridgestruct: data.bridgestruct,
                                userid: userInfo.userid,
                                c_date: data.bridge_c_date,
                                longitude: data.longitude || 0,
                                latitude: data.latitude || 0,
                                bridgeconfig: JSON.stringify(data.bridgeconfig),
                                datasources: 1
                            })
                            // 存入桥梁结构数据
                            for (let i = 0; i < data.structureInfo.length; i++) {
                                await bridgeMember.save(data.structureInfo[i])
                            }
                        }
                        resolve(params)
                    } catch (e) {
                        reject(params)
                    }
                } else {
                    reject(params)
                }
            })
    })
}