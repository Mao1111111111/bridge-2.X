/* 
    历史数据-接口
 */
import * as bridgeTable from '../../database/bridge';
import * as bridgeMember from '../../database/bridge_member';
import * as bridgeProjectBind from '../../database/bridge_project_bind';
import * as bridgeReport from '../../database/bridge_report';
import * as uploadStateRecord from '../../database/upload_state_record';
import * as bridgeReportMember from '../../database/bridge_report_member';
import * as partsCheckStatus from '../../database/parts_checkstatus_data';
import * as bridgeReportFile from '../../database/bridge_report_file';
import * as checkstatusMedia from '../../database/bridge_report_member_checkstatus_media';
import * as fileGps from '../../database/file_gps';;
import fs from '../../utils/fs';
import { S3GetFile } from '../../utils/AWS';
import uuid from 'react-native-uuid';

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

// 下载检测数据
export const getDetectionData = (params, userInfo, projectid) => {
    params = {
        bridgeid: 'g114mv2d60lip0',
        reportid: 'g114mv2d60lip04mv2d61nbjo'
    }

    let form = new FormData()
    form.append('bridgeid', params.bridgeid)
    form.append('reportid', params.reportid)
    return new Promise((resolve, reject) => {
        fetch(host + '/get_detection_data', {
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
                        console.log("res.resultJson",JSON.stringify(res.resultJson));
                        // 桥梁数据
                        let data = res.resultJson
                        // 数据库中是否存在此桥梁
                        let _bridgeData = await bridgeTable.getByBridgeid(data.bridgeid)
                        // 桥梁数据
                        let bridgeData = {}
                        if (_bridgeData) {
                            bridgeData = _bridgeData
                        } else {
                            bridgeData = {
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
                            }
                            // 存入 bridge表
                            await bridgeTable.save(bridgeData)
                            // 存入桥梁结构数据
                            for (let i = 0; i < data.structureInfo.length; i++) {
                                await bridgeMember.save(data.structureInfo[i])
                            }
                        }

                        // ------- 测试数据存入 -------
                        // ------- 桥梁项目绑定表-bridge_project_bind表 -------
                        // 项目绑定表数据 是否存在
                        let _bridgeProjectBindData = await bridgeProjectBind.get(
                            {
                                projectid: projectid,
                                bridgeid: bridgeData.bridgeid
                            }
                        )
                        // 项目桥梁绑定数据
                        let bridgeProjectBindData = {}
                        if (_bridgeProjectBindData) {
                            bridgeProjectBindData = _bridgeProjectBindData
                        } else {
                            bridgeProjectBindData = {
                                projectid: projectid,
                                bridgeid: bridgeData.bridgeid,
                                bridgereportid: data.bridgereportid,
                                userid: userInfo.userid
                            }
                            // 存入
                            await bridgeProjectBind.save(bridgeProjectBindData)
                        }

                        // 判断检测基础信息是否存在
                        let _bridgeReportData = await bridgeReport.get({
                            bridgeid: bridgeData.bridgeid,
                            bridgereportid: bridgeProjectBindData.bridgereportid
                        })
                        if (!_bridgeReportData) {
                            // ---- 存入 检测基础信息-bridge_report表 ---- 
                            await bridgeReport.save({
                                bridgeid: bridgeData.bridgeid,
                                bridgereportid: bridgeProjectBindData.bridgereportid,
                                reportname: data.reportname,
                                startdate: data.startdate,
                                finishdate: data.finishdate,
                                userid: userInfo.userid,
                                longitude: data.bridge_report_longitude || 0,
                                latitude: data.bridge_report_latitude || 0
                            })
                            // ---- 存入 上传记录数据-upload_state_record表 ----
                            // 存入
                            await uploadStateRecord.save({
                                bridgeid: bridgeData.bridgeid,
                                bridgereportid: bridgeProjectBindData.bridgereportid,
                                userid: userInfo.userid
                            })
                            // ---- 存入检测构件数据-bridge_report_member表 ----
                            // 检测构件数据存入
                            for (let i = 0; i < data.bridge_report_member.length; i++) {
                                let item = data.bridge_report_member[i]
                                await bridgeReportMember.save({
                                    bridgeid: bridgeData.bridgeid,
                                    bridgereportid: bridgeProjectBindData.bridgereportid,
                                    position: item.position,
                                    membertype: item.membertype,
                                    memberid: item.memberid,
                                    membername: item.membername,
                                    stepno: item.stepno,
                                    orderdesc: item.orderdesc,
                                    memberstatus: item.memberstatus,
                                    dpscores_auto: item.dpscores_auto,
                                    u_date: item.u_date
                                })
                            }
                            // ---- 存入 检测情况表-parts_checkstatus_data ----
                            for (let i = 0; i < data.bridge_report_data.length; i++) {
                                let item = data.bridge_report_data[i]
                                await partsCheckStatus.save({
                                    bridgereportid: bridgeProjectBindData.bridgereportid,
                                    dataid: item.dataid,
                                    jsondata: JSON.stringify(item.jsondata),
                                    memberstatus: item.memberstatus,
                                    datatype: item.datatype,
                                    version: item.version,
                                    userid: userInfo.userid,
                                    u_date: item.u_date,
                                    longitude: item.longitude || '',
                                    latitude: item.latitude || '',
                                })
                            }
                            // ---- 下载图片 ----
                            await Promise.all(
                                data.bridge_report_media.map((item) => {
                                    if (item.key) {
                                        let path = `${fs.dir}/${uuid.v4()}.${item.filetypes}`
                                        item.filepath = path
                                        return S3GetFile(item.key, path)
                                    } else {
                                        return null
                                    }
                                })
                            )
                            // ---- bridge_report_file 表、bridge_report_member_checkstatus_media 表、file_gps 表 ----
                            for (let i = 0; i < data.bridge_report_media.length; i++) {
                                let item = data.bridge_report_media[i]
                                await bridgeReportFile.save({
                                    bridgeid: bridgeData.bridgeid,
                                    bridgereportid: bridgeProjectBindData.bridgereportid,
                                    dataid: item.dataid,
                                    mediaid: item.mediaid,
                                    type: item.type,
                                    category: item.category,
                                    inx: i,
                                    remark: item.remark || '',
                                    userid: userInfo.userid,
                                    is_source: 1,
                                    u_date: item.u_date
                                })
                                await checkstatusMedia.save({
                                    bridgereportid: bridgeProjectBindData.bridgereportid,
                                    mediatype: item.mediatype,
                                    mediaid: item.mediaid,
                                    filename: item.filename,
                                    filetypes: item.filetypes,
                                    filesize: item.filesize,
                                    filepath: item.filepath,
                                    duration: item.duration || 0,
                                    userid: userInfo.userid,
                                    u_date: item.u_date
                                })
                                if (item.gpsInfo) {
                                    await fileGps.save({
                                        bridgeid: bridgeData.bridgeid,
                                        bridgereportid: bridgeProjectBindData.bridgereportid,
                                        mediaid: item.mediaid,
                                        longitude: item.gpsInfo.longitude,
                                        latitude: item.gpsInfo.latitude,
                                        accuracy: item.gpsInfo.accuracy,
                                        altitude: item.gpsInfo.altitude
                                    })
                                }
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