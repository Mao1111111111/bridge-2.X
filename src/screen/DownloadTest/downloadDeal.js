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
import fs from '../../utils/fs';
import { S3GetFile } from '../../utils/AWS';
import uuid from 'react-native-uuid';
import { testData } from './templateData';
import { yunduanData } from './yunduanData';

const dataDeal = async (testData, userInfo) => {
    try {
        // 消息 桥梁结构已存在、桥梁结构下载成功、桥梁检测数据已存在、桥梁检测数据下载成功
        let message = ''
        // ------- 项目表-projectData --------
        // 项目名称 (历史)+云端项目名称
        // 根据项目名称判断项目，项目名称存在则下载到项目，不存在则新建一个项目
        // 桥梁名称
        let projectname = (testData.dataType == 'structure' ? '(结构)' : '(检测)') + (testData.projectname || '').replace(/ /g, '')
        // 在数据库中查询 项目名称 是否重复
        const _projectData = await projectTable.getByName(projectname);
        let projectData = {}
        if (_projectData.length == 0) {
            // 新增项目
            projectData = {
                projectid: testData.projectid + testData.dataType,
                projectno: dayjs().format('YYYYMMDDHHmmss'),
                projectname,
                areacode: '',
                routecode: '',
                userid: userInfo.userid,
                username: userInfo.username,
                datasources: 1
            }
            // 存入数据库
            await projectTable.save(projectData)
        } else {
            // 获取项目信息
            projectData = _projectData[0]
        }

        // ------- 桥梁表-bridge、桥梁构件表-bridge_member -------
        // 判断桥梁是否存在，根据桥梁id判断，如果桥梁信息存在，则不录入bridge表 和 bridge_member表
        let _bridgeData = await bridgeTable.getByBridgeid(testData.bridgeid)
        // 桥梁数据
        let bridgeData = {}
        if (_bridgeData) {
            // 桥梁数据存在，获取本地桥梁数据
            bridgeData = _bridgeData
        } else {
            // 桥梁数据不存在，存入
            bridgeData = {
                bridgeid: testData.bridgeid,
                bridgename: testData.bridgename,
                bridgetype: testData.bridgetype,
                bridgestation: testData.bridgestation,
                b16: testData.b16,
                areacode: '',
                routecode: '',
                bridgefunc: testData.bridgefunc,
                bridgeside: testData.bridgeside,
                bridgestruct: testData.bridgestruct,
                userid: userInfo.userid,
                c_date: testData.bridge_c_date,
                longitude: testData.longitude || 0,
                latitude: testData.latitude || 0,
                bridgeconfig: JSON.stringify(testData.bridgeconfig),
                datasources: 1
            }
            // 存入数据库
            await bridgeTable.save(bridgeData)
            // 存入桥梁结构数据
            for (let i = 0; i < testData.structureInfo.length; i++) {
                await bridgeMember.save(testData.structureInfo[i])
            }
        }

        // ------- 桥梁项目绑定表-bridge_project_bind表 -------
        // 项目绑定表数据 是否存在
        let _bridgeProjectBindData = await bridgeProjectBind.get(
            {
                projectid: projectData.projectid,
                bridgeid: bridgeData.bridgeid
            }
        )
        // 项目桥梁绑定数据
        let bridgeProjectBindData = {}
        if (_bridgeProjectBindData) {
            bridgeProjectBindData = _bridgeProjectBindData
            message = '桥梁结构已存在'
        } else {
            bridgeProjectBindData = {
                projectid: projectData.projectid,
                bridgeid: bridgeData.bridgeid,
                bridgereportid: testData.dataType == 'structure' ? null : testData.bridgereportid,
                userid: userInfo.userid
            }
            // 存入
            await bridgeProjectBind.save(bridgeProjectBindData)
            message = '桥梁结构下载成功'
        }

        // ------- 测试数据存入 -------
        if (testData.dataType == 'testData') {
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
                    reportname: testData.reportname,
                    startdate: testData.startdate,
                    finishdate: testData.finishdate,
                    userid: userInfo.userid,
                    longitude: testData.bridge_report_longitude || 0,
                    latitude: testData.bridge_report_latitude || 0
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
                for (let i = 0; i < testData.bridge_report_member.length; i++) {
                    let item = testData.bridge_report_member[i]
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
                for (let i = 0; i < testData.bridge_report_data.length; i++) {
                    let item = testData.bridge_report_data[i]
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
                    testData.bridge_report_media.map((item) => {
                        if (item.key) {
                            let path = `${fs.dir}/${uuid.v4()}.${item.filetypes}`
                            item.filepath = path
                            return S3GetFile(item.key, path)
                        } else {
                            return null
                        }
                    }
                    ),
                )
                // ---- bridge_report_file 表、bridge_report_member_checkstatus_media 表、file_gps 表 ----
                for (let i = 0; i < testData.bridge_report_media.length; i++) {
                    let item = testData.bridge_report_media[i]
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
                    // 下载图片
                    let filePath = ''
                    if (item.key) {
                        let filePath = `${fs.dir}/${uuid.v4()}.${item.filetypes}`
                    }
                    await checkstatusMedia.save({
                        bridgereportid: bridgeProjectBindData.bridgereportid,
                        mediatype: item.mediatype,
                        mediaid: item.mediaid,
                        filename: item.filename,
                        filetypes: item.filetypes,
                        filesize: item.filesize,
                        // 需要替换
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

                message = '桥梁检测数据下载成功'
                return message
            } else {
                message = '桥梁检测数据已存在'
                return message
            }
        } else {
            return message
        }
    } catch (e) {
        console.log('-', e);
    }

}

const dataDealTest = async (userInfo) => {
    let data = {
        // ...testData,
        ...yunduanData,
        // 数据类型 structure(结构)、testData(测试数据)
        dataType: 'testData',
        // 项目名称
        projectname: '云端测试项目',
        // 项目id
        projectid: 'yunduan',
    }
    let message = await dataDeal(data, userInfo)
    return message
}

export {
    dataDealTest
}