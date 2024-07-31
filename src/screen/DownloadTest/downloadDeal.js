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
import { S3GetFile, test } from '../../utils/AWS';
import uuid from 'react-native-uuid';

const testData = {
    // 数据类型 structure(结构)、testData(测试数据)
    dataType: 'testData',
    // 项目名称
    projectname: '佳木斯过境桥梁4 （年度）',
    // 项目id
    projectid: '22',
    // 桥梁id
    bridgeid: 'g114pkr3y2z980',
    // 桥梁名称
    bridgename: '测试桥梁-g114pkr3y2z980',
    // 桥梁类型
    bridgetype: 'bridge-g',
    // 桥梁桩号
    bridgestation: 'k500+g114pkr3y2z980',
    // 桥梁长度（浮点数），有上传(b16)
    b16: 0,
    // 功能类型（字符串），有上传(bridgefunc)
    bridgefunc: 'func101',
    // 桥幅属性（字符串），有上传(bridgeside)
    bridgeside: 'side111',
    // 结构体系（字符串），有上传(bridgestruct)
    bridgestruct: 'funcg101',
    // 主桥id -- 未存
    mainbridgeid: "",
    // 桥梁创建时间
    bridge_c_date: "2023-09-13 11:19:29",
    // 桥梁经度
    longitude: 0,
    // 桥梁维度
    latitude: 0,
    // 其他配置，有上传(bridgeconfig)
    bridgeconfig: {
        "b200001num": "2",
        "b200002num": "1",
        "b100001num": "1",
        "b300003num": "2",
        "b300002num": "2",
        "zhizuo_total": "2",
        "bridgelightsys": "light10",
        "bridgewall": "ears",
        "bridgepadno": "padno1000",
        "bridgeabutment": "abutment102",
        "bridgepier": "pier100",
        "qiaotaizhushu": "1",
        "qiaodunzhushu": "1",
        "leibanshu": "1"
    },
    // 桥梁结构数据
    structureInfo: [
        {
            // 桥梁id（字符串），有上传(bridgeid)，同桥梁基本数据中bridgeid
            bridgeid: 'g114pkr3y2z980',
            // 部件结构（字符串），有上传(structureInfo.memberData.position)
            position: 'b10',
            // 部件编号（字符串），有上传(structureInfo.memberData.membertype)
            membertype: 'b100001',
            // 构件编号（字符串），有上传(structureInfo.memberData.memberid)
            memberid: 'g114pkr3y2z980_b100001_lz6c37cc_0',
            // 构件名称（字符串），有上传(structureInfo.memberData.membername)
            membername: '1-1#',
            // 跨编号（int），有上传(structureInfo.memberData.stepno)
            stepno: 1,
            // 排序编号（int），有上传(structureInfo.memberData.orderdesc)
            orderdesc: 10,
            // 创建时间
            u_date: "2023-09-13 11:21:50"
        },
        {
            // 桥梁id（字符串），有上传(bridgeid)，同桥梁基本数据中bridgeid
            bridgeid: 'g114pkr3y2z980',
            // 部件结构（字符串），有上传(structureInfo.memberData.position)
            position: 'b10',
            // 部件编号（字符串），有上传(structureInfo.memberData.membertype)
            membertype: 'b100001',
            // 构件编号（字符串），有上传(structureInfo.memberData.memberid)
            memberid: 'g114pkr3y2z980_b100001_lz6c37cc_1',
            // 构件名称（字符串），有上传(structureInfo.memberData.membername)
            membername: '2-1#',
            // 跨编号（int），有上传(structureInfo.memberData.stepno)
            stepno: 2,
            // 排序编号（int），有上传(structureInfo.memberData.orderdesc)
            orderdesc: 20,
            // 创建时间
            u_date: "2023-09-13 11:21:50"
        },
        {
            // 桥梁id（字符串），有上传(bridgeid)，同桥梁基本数据中bridgeid
            bridgeid: 'g114pkr3y2z980',
            // 部件结构（字符串），有上传(structureInfo.memberData.position)
            position: 'b20',
            // 部件编号（字符串），有上传(structureInfo.memberData.membertype)
            membertype: 'b200001',
            // 构件编号（字符串），有上传(structureInfo.memberData.memberid)
            memberid: 'g114pkr3y2z980_b200001_lz6c37cc_2',
            // 构件名称（字符串），有上传(structureInfo.memberData.membername)
            membername: '0#台台身',
            // 跨编号（int），有上传(structureInfo.memberData.stepno)
            stepno: 1,
            // 排序编号（int），有上传(structureInfo.memberData.orderdesc)
            orderdesc: 10,
            // 创建时间
            u_date: "2023-09-13 11:21:50"
        },
        {
            // 桥梁id（字符串），有上传(bridgeid)，同桥梁基本数据中bridgeid
            bridgeid: 'g114pkr3y2z980',
            // 部件结构（字符串），有上传(structureInfo.memberData.position)
            position: 'b20',
            // 部件编号（字符串），有上传(structureInfo.memberData.membertype)
            membertype: 'b200001',
            // 构件编号（字符串），有上传(structureInfo.memberData.memberid)
            memberid: 'g114pkr3y2z980_b200001_lz6c37cc_3',
            // 构件名称（字符串），有上传(structureInfo.memberData.membername)
            membername: '0#台台帽',
            // 跨编号（int），有上传(structureInfo.memberData.stepno)
            stepno: 1,
            // 排序编号（int），有上传(structureInfo.memberData.orderdesc)
            orderdesc: 20,
            // 创建时间
            u_date: "2023-09-13 11:21:50"
        },
        {
            // 桥梁id（字符串），有上传(bridgeid)，同桥梁基本数据中bridgeid
            bridgeid: 'g114pkr3y2z980',
            // 部件结构（字符串），有上传(structureInfo.memberData.position)
            position: 'b20',
            // 部件编号（字符串），有上传(structureInfo.memberData.membertype)
            membertype: 'b200001',
            // 构件编号（字符串），有上传(structureInfo.memberData.memberid)
            memberid: 'g114pkr3y2z980_b200001_lz6c37cc_4',
            // 构件名称（字符串），有上传(structureInfo.memberData.membername)
            membername: '2#台台身',
            // 跨编号（int），有上传(structureInfo.memberData.stepno)
            stepno: 1,
            // 排序编号（int），有上传(structureInfo.memberData.orderdesc)
            orderdesc: 30,
            // 创建时间
            u_date: "2023-09-13 11:21:50"
        },
        {
            // 桥梁id（字符串），有上传(bridgeid)，同桥梁基本数据中bridgeid
            bridgeid: 'g114pkr3y2z980',
            // 部件结构（字符串），有上传(structureInfo.memberData.position)
            position: 'b20',
            // 部件编号（字符串），有上传(structureInfo.memberData.membertype)
            membertype: 'b200001',
            // 构件编号（字符串），有上传(structureInfo.memberData.memberid)
            memberid: 'g114pkr3y2z980_b200001_lz6c37cc_5',
            // 构件名称（字符串），有上传(structureInfo.memberData.membername)
            membername: '2#台台帽',
            // 跨编号（int），有上传(structureInfo.memberData.stepno)
            stepno: 1,
            // 排序编号（int），有上传(structureInfo.memberData.orderdesc)
            orderdesc: 40,
            // 创建时间
            u_date: "2023-09-13 11:21:50"
        },
        {
            // 桥梁id（字符串），有上传(bridgeid)，同桥梁基本数据中bridgeid
            bridgeid: 'g114pkr3y2z980',
            // 部件结构（字符串），有上传(structureInfo.memberData.position)
            position: 'b20',
            // 部件编号（字符串），有上传(structureInfo.memberData.membertype)
            membertype: 'b300003',
            // 构件编号（字符串），有上传(structureInfo.memberData.memberid)
            memberid: 'g114pkr3y2z980_b300003_lz6c37cc_6',
            // 构件名称（字符串），有上传(structureInfo.memberData.membername)
            membername: '左侧1#跨',
            // 跨编号（int），有上传(structureInfo.memberData.stepno)
            stepno: 1,
            // 排序编号（int），有上传(structureInfo.memberData.orderdesc)
            orderdesc: 10,
            // 创建时间
            u_date: "2023-09-13 11:21:50"
        },
        {
            // 桥梁id（字符串），有上传(bridgeid)，同桥梁基本数据中bridgeid
            bridgeid: 'g114pkr3y2z980',
            // 部件结构（字符串），有上传(structureInfo.memberData.position)
            position: 'b20',
            // 部件编号（字符串），有上传(structureInfo.memberData.membertype)
            membertype: 'b300003',
            // 构件编号（字符串），有上传(structureInfo.memberData.memberid)
            memberid: 'g114pkr3y2z980_b300003_lz6c37cc_7',
            // 构件名称（字符串），有上传(structureInfo.memberData.membername)
            membername: '左侧2#跨',
            // 跨编号（int），有上传(structureInfo.memberData.stepno)
            stepno: 2,
            // 排序编号（int），有上传(structureInfo.memberData.orderdesc)
            orderdesc: 20,
            // 创建时间
            u_date: "2023-09-13 11:21:50"
        },
        {
            // 桥梁id（字符串），有上传(bridgeid)，同桥梁基本数据中bridgeid
            bridgeid: 'g114pkr3y2z980',
            // 部件结构（字符串），有上传(structureInfo.memberData.position)
            position: 'b20',
            // 部件编号（字符串），有上传(structureInfo.memberData.membertype)
            membertype: 'b300003',
            // 构件编号（字符串），有上传(structureInfo.memberData.memberid)
            memberid: 'g114pkr3y2z980_b300003_lz6c37cc_8',
            // 构件名称（字符串），有上传(structureInfo.memberData.membername)
            membername: '右侧1#跨',
            // 跨编号（int），有上传(structureInfo.memberData.stepno)
            stepno: 1,
            // 排序编号（int），有上传(structureInfo.memberData.orderdesc)
            orderdesc: 30,
            // 创建时间
            u_date: "2023-09-13 11:21:50"
        },
        {
            // 桥梁id（字符串），有上传(bridgeid)，同桥梁基本数据中bridgeid
            bridgeid: 'g114pkr3y2z980',
            // 部件结构（字符串），有上传(structureInfo.memberData.position)
            position: 'b20',
            // 部件编号（字符串），有上传(structureInfo.memberData.membertype)
            membertype: 'b300003',
            // 构件编号（字符串），有上传(structureInfo.memberData.memberid)
            memberid: 'g114pkr3y2z980_b300003_lz6c37cc_9',
            // 构件名称（字符串），有上传(structureInfo.memberData.membername)
            membername: '右侧2#跨',
            // 跨编号（int），有上传(structureInfo.memberData.stepno)
            stepno: 2,
            // 排序编号（int），有上传(structureInfo.memberData.orderdesc)
            orderdesc: 40,
            // 创建时间
            u_date: "2023-09-13 11:21:50"
        },
    ],
    //----- 测试数据 -----
    bridgereportid: 'g114pkr3y2z9804pkr3y24w7w',
    // 报告名
    reportname: "G1011哈同高速k69+275三宝分离式立交桥(右幅)桥梁检测",
    // 开始时间
    startdate: "2023-10-08 08:42:24",
    // 结束时间
    finishdate: "2023-09-19 15:26:19",
    // 报告经度
    bridge_report_longitude: 0,
    // 报告维度
    bridge_report_latitude: 0,
    // 桥梁检测--构件数据（bridge_report_member表）
    bridge_report_member: [
        {
            // 部件结构，有上传(testData.detailTestData.memberData.position)
            position: 'b10',
            // 部件编号，有上传(testData.detailTestData.memberData.membertype)
            membertype: 'b100001',
            // 构件编号，有上传(testData.detailTestData.memberData.memberid)
            memberid: 'g114pkr3y2z9804pkr3y24w7w_b100001_lz6c37cc_0',
            // 构建名称，有上传(testData.detailTestData.memberData.membername)
            membername: '1-1#',
            // 跨编号，有上传(testData.detailTestData.memberData.stepno)
            stepno: 1,
            // 排序编号，有上传(testData.detailTestData.memberData.orderdesc)
            orderdesc: 10,
            // 构建状态，有上传(testData.detailTestData.memberData.memberstatus)
            memberstatus: '200',
            // 构件评分，有上传(testData.detailTestData.memberData.dpscores_auto)
            dpscores_auto: 0,
            // 更新时间，有上传(testData.detailTestData.memberData.u_date)
            u_date: '2024-07-29 13:53:53'
        },
        {
            // 部件结构，有上传(testData.detailTestData.memberData.position)
            position: 'b10',
            // 部件编号，有上传(testData.detailTestData.memberData.membertype)
            membertype: 'b100001',
            // 构件编号，有上传(testData.detailTestData.memberData.memberid)
            memberid: 'g114pkr3y2z9804pkr3y24w7w_b100001_lz6c37cc_1',
            // 构建名称，有上传(testData.detailTestData.memberData.membername)
            membername: '2-1#',
            // 跨编号，有上传(testData.detailTestData.memberData.stepno)
            stepno: 2,
            // 排序编号，有上传(testData.detailTestData.memberData.orderdesc)
            orderdesc: 20,
            // 构建状态，有上传(testData.detailTestData.memberData.memberstatus)
            memberstatus: '200',
            // 构件评分，有上传(testData.detailTestData.memberData.dpscores_auto)
            dpscores_auto: 0,
            // 更新时间，有上传(testData.detailTestData.memberData.u_date)
            u_date: '2024-07-29 13:53:53'
        },
        {
            // 部件结构，有上传(testData.detailTestData.memberData.position)
            position: 'b20',
            // 部件编号，有上传(testData.detailTestData.memberData.membertype)
            membertype: 'b200001',
            // 构件编号，有上传(testData.detailTestData.memberData.memberid)
            memberid: 'g114pkr3y2z9804pkr3y24w7w_b200001_lz6c37cc_2',
            // 构建名称，有上传(testData.detailTestData.memberData.membername)
            membername: '0#台台身',
            // 跨编号，有上传(testData.detailTestData.memberData.stepno)
            stepno: 1,
            // 排序编号，有上传(testData.detailTestData.memberData.orderdesc)
            orderdesc: 10,
            // 构建状态，有上传(testData.detailTestData.memberData.memberstatus)
            memberstatus: '100',
            // 构件评分，有上传(testData.detailTestData.memberData.dpscores_auto)
            dpscores_auto: 0,
            // 更新时间，有上传(testData.detailTestData.memberData.u_date)
            u_date: '2024-07-29 13:53:53'
        },
        {
            // 部件结构，有上传(testData.detailTestData.memberData.position)
            position: 'b20',
            // 部件编号，有上传(testData.detailTestData.memberData.membertype)
            membertype: 'b200001',
            // 构件编号，有上传(testData.detailTestData.memberData.memberid)
            memberid: 'g114pkr3y2z9804pkr3y24w7w_b200001_lz6c37cc_3',
            // 构建名称，有上传(testData.detailTestData.memberData.membername)
            membername: '0#台台帽',
            // 跨编号，有上传(testData.detailTestData.memberData.stepno)
            stepno: 1,
            // 排序编号，有上传(testData.detailTestData.memberData.orderdesc)
            orderdesc: 20,
            // 构建状态，有上传(testData.detailTestData.memberData.memberstatus)
            memberstatus: '100',
            // 构件评分，有上传(testData.detailTestData.memberData.dpscores_auto)
            dpscores_auto: 0,
            // 更新时间，有上传(testData.detailTestData.memberData.u_date)
            u_date: '2024-07-29 13:53:53'
        },
        {
            // 部件结构，有上传(testData.detailTestData.memberData.position)
            position: 'b20',
            // 部件编号，有上传(testData.detailTestData.memberData.membertype)
            membertype: 'b200001',
            // 构件编号，有上传(testData.detailTestData.memberData.memberid)
            memberid: 'g114pkr3y2z9804pkr3y24w7w_b200001_lz6c37cc_4',
            // 构建名称，有上传(testData.detailTestData.memberData.membername)
            membername: '2#台台身',
            // 跨编号，有上传(testData.detailTestData.memberData.stepno)
            stepno: 1,
            // 排序编号，有上传(testData.detailTestData.memberData.orderdesc)
            orderdesc: 30,
            // 构建状态，有上传(testData.detailTestData.memberData.memberstatus)
            memberstatus: '100',
            // 构件评分，有上传(testData.detailTestData.memberData.dpscores_auto)
            dpscores_auto: 0,
            // 更新时间，有上传(testData.detailTestData.memberData.u_date)
            u_date: '2024-07-29 13:53:53'
        },
        {
            // 部件结构，有上传(testData.detailTestData.memberData.position)
            position: 'b20',
            // 部件编号，有上传(testData.detailTestData.memberData.membertype)
            membertype: 'b200001',
            // 构件编号，有上传(testData.detailTestData.memberData.memberid)
            memberid: 'g114pkr3y2z9804pkr3y24w7w_b200001_lz6c37cc_5',
            // 构建名称，有上传(testData.detailTestData.memberData.membername)
            membername: '2#台台帽',
            // 跨编号，有上传(testData.detailTestData.memberData.stepno)
            stepno: 1,
            // 排序编号，有上传(testData.detailTestData.memberData.orderdesc)
            orderdesc: 40,
            // 构建状态，有上传(testData.detailTestData.memberData.memberstatus)
            memberstatus: '100',
            // 构件评分，有上传(testData.detailTestData.memberData.dpscores_auto)
            dpscores_auto: 0,
            // 更新时间，有上传(testData.detailTestData.memberData.u_date)
            u_date: '2024-07-29 13:53:53'
        },
        {
            // 部件结构，有上传(testData.detailTestData.memberData.position)
            position: 'b30',
            // 部件编号，有上传(testData.detailTestData.memberData.membertype)
            membertype: 'b300003',
            // 构件编号，有上传(testData.detailTestData.memberData.memberid)
            memberid: 'g114pkr3y2z9804pkr3y24w7w_b300003_lz6c37cc_6',
            // 构建名称，有上传(testData.detailTestData.memberData.membername)
            membername: '左侧1#跨',
            // 跨编号，有上传(testData.detailTestData.memberData.stepno)
            stepno: 1,
            // 排序编号，有上传(testData.detailTestData.memberData.orderdesc)
            orderdesc: 10,
            // 构建状态，有上传(testData.detailTestData.memberData.memberstatus)
            memberstatus: '0',
            // 构件评分，有上传(testData.detailTestData.memberData.dpscores_auto)
            dpscores_auto: 0,
            // 更新时间，有上传(testData.detailTestData.memberData.u_date)
            u_date: '2024-07-29 13:53:53'
        },
        {
            // 部件结构，有上传(testData.detailTestData.memberData.position)
            position: 'b30',
            // 部件编号，有上传(testData.detailTestData.memberData.membertype)
            membertype: 'b300003',
            // 构件编号，有上传(testData.detailTestData.memberData.memberid)
            memberid: 'g114pkr3y2z9804pkr3y24w7w_b300003_lz6c37cc_7',
            // 构建名称，有上传(testData.detailTestData.memberData.membername)
            membername: '左侧2#跨',
            // 跨编号，有上传(testData.detailTestData.memberData.stepno)
            stepno: 2,
            // 排序编号，有上传(testData.detailTestData.memberData.orderdesc)
            orderdesc: 20,
            // 构建状态，有上传(testData.detailTestData.memberData.memberstatus)
            memberstatus: '100',
            // 构件评分，有上传(testData.detailTestData.memberData.dpscores_auto)
            dpscores_auto: 0,
            // 更新时间，有上传(testData.detailTestData.memberData.u_date)
            u_date: '2024-07-29 13:53:53'
        },
        {
            // 部件结构，有上传(testData.detailTestData.memberData.position)
            position: 'b30',
            // 部件编号，有上传(testData.detailTestData.memberData.membertype)
            membertype: 'b300003',
            // 构件编号，有上传(testData.detailTestData.memberData.memberid)
            memberid: 'g114pkr3y2z9804pkr3y24w7w_b300003_lz6c37cc_8',
            // 构建名称，有上传(testData.detailTestData.memberData.membername)
            membername: '右侧1#跨',
            // 跨编号，有上传(testData.detailTestData.memberData.stepno)
            stepno: 1,
            // 排序编号，有上传(testData.detailTestData.memberData.orderdesc)
            orderdesc: 30,
            // 构建状态，有上传(testData.detailTestData.memberData.memberstatus)
            memberstatus: '100',
            // 构件评分，有上传(testData.detailTestData.memberData.dpscores_auto)
            dpscores_auto: 0,
            // 更新时间，有上传(testData.detailTestData.memberData.u_date)
            u_date: '2024-07-29 13:53:53'
        },
        {
            // 部件结构，有上传(testData.detailTestData.memberData.position)
            position: 'b30',
            // 部件编号，有上传(testData.detailTestData.memberData.membertype)
            membertype: 'b300003',
            // 构件编号，有上传(testData.detailTestData.memberData.memberid)
            memberid: 'g114pkr3y2z9804pkr3y24w7w_b300003_lz6c37cc_9',
            // 构建名称，有上传(testData.detailTestData.memberData.membername)
            membername: '右侧2#跨',
            // 跨编号，有上传(testData.detailTestData.memberData.stepno)
            stepno: 1,
            // 排序编号，有上传(testData.detailTestData.memberData.orderdesc)
            orderdesc: 40,
            // 构建状态，有上传(testData.detailTestData.memberData.memberstatus)
            memberstatus: '0',
            // 构件评分，有上传(testData.detailTestData.memberData.dpscores_auto)
            dpscores_auto: 0,
            // 更新时间，有上传(testData.detailTestData.memberData.u_date)
            u_date: '2024-07-29 13:53:53'
        },
    ],
    // 桥梁检测--检测数据（parts_checkstatus_data表）
    bridge_report_data: [
        {
            // 构件编号，构件id，有上传(testData.detailTestData.memberData.diseaseData/goodData.dataid = testData.detailTestData.memberData.memberid)
            dataid: 'g114pkr3y2z9804pkr3y24w7w_b100001_lz6c37cc_0',
            // ？构件检测数据，是一个json，下面会具体举例，对应不上的情况
            jsondata: JSON.stringify({
                "areatype": "at0001",
                "checktypeid": "b100001t00c1044",
                "standard": {
                    "scale": "3",
                    "id": "JTG-TH21-2011-T000-0"
                },
                "scale": "2",
                "list": [],
                "diseaseName": "混凝土破损，钢筋、波纹管外露",
                "unit": {
                    "areatype": "at0001",
                    "area": "at0001r1002",
                    "scale": "2",
                    "lengthText": "NaN",
                    "widthText": "NaN",
                    "heightText": "NaN"
                },
                "lengthText": "NaN",
                "widthText": "NaN",
                "heightText": "NaN",
                "remark": "混凝土破损，钢筋、波纹管外露，/",
                "stairgroupid": "10000dg00003",
                "description": "混凝土破损，钢筋、波纹管外露",
                "writePositionTxt": "/",
                "scaleArr": [
                    {
                        "label": 1,
                        "value": "1"
                    }, {
                        "label": 2,
                        "value": "2"
                    }, {
                        "label": 3,
                        "value": "3"
                    }, {
                        "label": 4,
                        "value": "4"
                    }],
                "scaleTableArr": [
                    {
                        "qualitative": "完好.无剥落、掉角",
                        "ration": "—",
                        "standardid": "JTG-TH21-2011-T511-2",
                        "standardname": "剥落、掉角",
                        "standardscale": "1"
                    }, {
                        "qualitative": "局部混凝土剥落或掉角",
                        "ration": "累计面积≤构件面积5%，或单处面积≤0.5平方米",
                        "standardid": "JTG-TH21-2011-T511-2",
                        "standardname": "剥落、掉角",
                        "standardscale": "2"
                    }, {
                        "qualitative": "较大范围混凝土剥落或掉角",
                        "ration": "累计面积＞构件面积的5%且＜构件面积的10%，或单处面积＞0.5平方米且＜1.0平方米",
                        "standardid": "JTG-TH21-2011-T511-2",
                        "standardname": "剥落、掉角",
                        "standardscale": "3"
                    }, {
                        "qualitative": "大范围混凝土剥落或掉角",
                        "ration": "累计面积≥构件面积的10%，或单处面积≥1.0平方米",
                        "standardid": "JTG-TH21-2011-T511-2",
                        "standardname": "剥落、掉角",
                        "standardscale": "4"
                    }],
                "infoList": [{
                    "strid": "s1401",
                    "strinfo": "面积（平方米）",
                    "strname": "面积",
                    "strunit": "平方米",
                    "strvalue": "hzbrmc_area_m"
                }],
                "area": "at0001r1002",
                "checktypegroupid": "10000dg00047",
                "scalegroupid": "10000sg0015"
            }),
            // 构件状态，有上传(testData.detailTestData.memberData.diseaseData/goodData.memberstatus)
            memberstatus: '200',
            // 数据类型，有上传(testData.detailTestData.memberData.diseaseData/goodData.datatype)
            datatype: 'c1001',
            // 是否重点关注 -- 未存
            mian: 0,
            // 数据版本，病害唯一值，有上传(testData.detailTestData.memberData.diseaseData/goodData.version)，对应图片数据中的 dataid，用来确定图片
            version: 'g114pkr3y2z9804pkr3y24w7w_b100001_lz6c37cc_0_1',
            // 更新时间，有上传(testData.detailTestData.memberData.diseaseData/goodData.u_date)
            u_date: '2024-07-29 13:53:12',
            // 经度，有上传(testData.detailTestData.memberData.diseaseData/goodData.longitude)
            longitude: '',
            // 纬度，有上传(testData.detailTestData.memberData.diseaseData/goodData.latitude)
            latitude: ''
        },
        {
            // 构件编号，构件id，有上传(testData.detailTestData.memberData.diseaseData/goodData.dataid = testData.detailTestData.memberData.memberid)
            dataid: 'g114pkr3y2z9804pkr3y24w7w_b100001_lz6c37cc_0',
            // ？构件检测数据，是一个json，下面会具体举例，对应不上的情况
            jsondata: JSON.stringify({
                "areatype": "at0001",
                "checktypeid": "b100001t00c1041",
                "standard": {
                    "scale": "3",
                    "id": "JTG-TH21-2011-T000-0"
                },
                "scale": "2",
                "list": [],
                "diseaseName": "混凝土破损、掉角",
                "unit": {
                    "areatype": "at0001",
                    "area": "at0001r1002",
                    "scale": "2",
                    "lengthText": "NaN",
                    "widthText": "NaN",
                    "heightText": "NaN"
                },
                "lengthText": "NaN",
                "widthText": "NaN",
                "heightText": "NaN",
                "remark": "混凝土破损、掉角，/",
                "stairgroupid": "10000dg00003",
                "description": "混凝土破损、掉角",
                "writePositionTxt": "/",
                "scaleArr": [{
                    "label": 1,
                    "value": "1"
                }, {
                    "label": 2,
                    "value": "2"
                }, {
                    "label": 3,
                    "value": "3"
                }, {
                    "label": 4,
                    "value": "4"
                }],
                "scaleTableArr": [{
                    "qualitative": "完好.无剥落、掉角",
                    "ration": "—",
                    "standardid": "JTG-TH21-2011-T511-2",
                    "standardname": "剥落、掉角",
                    "standardscale": "1"
                }, {
                    "qualitative": "局部混凝土剥落或掉角",
                    "ration": "累计面积≤构件面积5%，或单处面积≤0.5平方米",
                    "standardid": "JTG-TH21-2011-T511-2",
                    "standardname": "剥落、掉角",
                    "standardscale": "2"
                }, {
                    "qualitative": "较大范围混凝土剥落或掉角",
                    "ration": "累计面积＞构件面积的5%且＜构件面积的10%，或单处面积＞0.5平方米且＜1.0平方米",
                    "standardid": "JTG-TH21-2011-T511-2",
                    "standardname": "剥落、掉角",
                    "standardscale": "3"
                }, {
                    "qualitative": "大范围混凝土剥落或掉角",
                    "ration": "累计面积≥构件面积的10%，或单处面积≥1.0平方米",
                    "standardid": "JTG-TH21-2011-T511-2",
                    "standardname": "剥落、掉角",
                    "standardscale": "4"
                }],
                "infoList": [{
                    "strid": "s1401",
                    "strinfo": "面积（平方米）",
                    "strname": "面积",
                    "strunit": "平方米",
                    "strvalue": "hzbrmc_area_m"
                }],
                "area": "at0001r1002",
                "checktypegroupid": "10000dg00045",
                "scalegroupid": "10000sg0013"
            }),
            // 构件状态，有上传(testData.detailTestData.memberData.diseaseData/goodData.memberstatus)
            memberstatus: '200',
            // 数据类型，有上传(testData.detailTestData.memberData.diseaseData/goodData.datatype)
            datatype: 'c1001',
            // 数据版本，病害唯一值，有上传(testData.detailTestData.memberData.diseaseData/goodData.version)，对应图片数据中的 dataid，用来确定图片
            version: 'g114pkr3y2z9804pkr3y24w7w_b100001_lz6c37cc_0_2',
            // 更新时间，有上传(testData.detailTestData.memberData.diseaseData/goodData.u_date)
            u_date: '2024-07-29 13:53:53',
            // 经度，有上传(testData.detailTestData.memberData.diseaseData/goodData.longitude)
            longitude: '',
            // 纬度，有上传(testData.detailTestData.memberData.diseaseData/goodData.latitude)
            latitude: ''
        },
        {
            // 构件编号，构件id，有上传(testData.detailTestData.memberData.diseaseData/goodData.dataid = testData.detailTestData.memberData.memberid)
            dataid: 'g114pkr3y2z9804pkr3y24w7w_b100001_lz6c37cc_1',
            // ？构件检测数据，是一个json，下面会具体举例，对应不上的情况
            jsondata: JSON.stringify({
                "areatype": "at0001",
                "checktypeid": "b100001t00c1044",
                "standard": {
                    "scale": "3",
                    "id": "JTG-TH21-2011-T000-0"
                },
                "scale": "2",
                "list": [],
                "diseaseName": "混凝土破损，钢筋、波纹管外露",
                "unit": {
                    "areatype": "at0001",
                    "area": "at0001r1002",
                    "scale": "2",
                    "lengthText": "NaN",
                    "widthText": "NaN",
                    "heightText": "NaN"
                },
                "lengthText": "NaN",
                "widthText": "NaN",
                "heightText": "NaN",
                "remark": "混凝土破损，钢筋、波纹管外露，/",
                "stairgroupid": "10000dg00003",
                "description": "混凝土破损，钢筋、波纹管外露",
                "writePositionTxt": "/",
                "scaleArr": [{
                    "label": 1,
                    "value": "1"
                }, {
                    "label": 2,
                    "value": "2"
                }, {
                    "label": 3,
                    "value": "3"
                }, {
                    "label": 4,
                    "value": "4"
                }],
                "scaleTableArr": [{
                    "qualitative": "完好.无剥落、掉角",
                    "ration": "—",
                    "standardid": "JTG-TH21-2011-T511-2",
                    "standardname": "剥落、掉角",
                    "standardscale": "1"
                }, {
                    "qualitative": "局部混凝土剥落或掉角",
                    "ration": "累计面积≤构件面积5%，或单处面积≤0.5平方米",
                    "standardid": "JTG-TH21-2011-T511-2",
                    "standardname": "剥落、掉角",
                    "standardscale": "2"
                }, {
                    "qualitative": "较大范围混凝土剥落或掉角",
                    "ration": "累计面积＞构件面积的5%且＜构件面积的10%，或单处面积＞0.5平方米且＜1.0平方米",
                    "standardid": "JTG-TH21-2011-T511-2",
                    "standardname": "剥落、掉角",
                    "standardscale": "3"
                }, {
                    "qualitative": "大范围混凝土剥落或掉角",
                    "ration": "累计面积≥构件面积的10%，或单处面积≥1.0平方米",
                    "standardid": "JTG-TH21-2011-T511-2",
                    "standardname": "剥落、掉角",
                    "standardscale": "4"
                }],
                "infoList": [{
                    "strid": "s1401",
                    "strinfo": "面积（平方米）",
                    "strname": "面积",
                    "strunit": "平方米",
                    "strvalue": "hzbrmc_area_m"
                }],
                "area": "at0001r1002",
                "checktypegroupid": "10000dg00047",
                "scalegroupid": "10000sg0015"
            }),
            // 构件状态，有上传(testData.detailTestData.memberData.diseaseData/goodData.memberstatus)
            memberstatus: '200',
            // 数据类型，有上传(testData.detailTestData.memberData.diseaseData/goodData.datatype)
            datatype: 'c1001',
            // 数据版本，病害唯一值，有上传(testData.detailTestData.memberData.diseaseData/goodData.version)，对应图片数据中的 dataid，用来确定图片
            version: 'g114pkr3y2z9804pkr3y24w7w_b100001_lz6c37cc_1_1',
            // 更新时间，有上传(testData.detailTestData.memberData.diseaseData/goodData.u_date)
            u_date: '2024-07-29 13:53:27',
            // 经度，有上传(testData.detailTestData.memberData.diseaseData/goodData.longitude)
            longitude: 106.82685801116266,
            // 纬度，有上传(testData.detailTestData.memberData.diseaseData/goodData.latitude)
            latitude: 29.719104168310523
        },
        {
            // 构件编号，构件id，有上传(testData.detailTestData.memberData.diseaseData/goodData.dataid = testData.detailTestData.memberData.memberid)
            dataid: 'g114pkr3y2z9804pkr3y24w7w_b200001_lz6c37cc_2',
            // ？构件检测数据，是一个json，下面会具体举例，对应不上的情况
            jsondata: JSON.stringify({}),
            // 构件状态，有上传(testData.detailTestData.memberData.diseaseData/goodData.memberstatus)
            memberstatus: '100',
            // 数据类型，有上传(testData.detailTestData.memberData.diseaseData/goodData.datatype)
            datatype: '',
            // 数据版本，病害唯一值，有上传(testData.detailTestData.memberData.diseaseData/goodData.version)，对应图片数据中的 dataid，用来确定图片
            version: 'g114pkr3y2z9804pkr3y24w7w_b200001_lz6c37cc_2_1',
            // 更新时间，有上传(testData.detailTestData.memberData.diseaseData/goodData.u_date)
            u_date: '2024-07-29 13:54:02',
            // 经度，有上传(testData.detailTestData.memberData.diseaseData/goodData.longitude)
            longitude: 106.82685801116266,
            // 纬度，有上传(testData.detailTestData.memberData.diseaseData/goodData.latitude)
            latitude: 29.719104168310523
        },
        {
            // 构件编号，构件id，有上传(testData.detailTestData.memberData.diseaseData/goodData.dataid = testData.detailTestData.memberData.memberid)
            dataid: 'g114pkr3y2z9804pkr3y24w7w_b200001_lz6c37cc_3',
            // ？构件检测数据，是一个json，下面会具体举例，对应不上的情况
            jsondata: JSON.stringify({}),
            // 构件状态，有上传(testData.detailTestData.memberData.diseaseData/goodData.memberstatus)
            memberstatus: '100',
            // 数据类型，有上传(testData.detailTestData.memberData.diseaseData/goodData.datatype)
            datatype: '',
            // 数据版本，病害唯一值，有上传(testData.detailTestData.memberData.diseaseData/goodData.version)，对应图片数据中的 dataid，用来确定图片
            version: 'g114pkr3y2z9804pkr3y24w7w_b200001_lz6c37cc_3_1',
            // 更新时间，有上传(testData.detailTestData.memberData.diseaseData/goodData.u_date)
            u_date: '2024-07-29 13:54:02',
            // 经度，有上传(testData.detailTestData.memberData.diseaseData/goodData.longitude)
            longitude: 106.82685801116266,
            // 纬度，有上传(testData.detailTestData.memberData.diseaseData/goodData.latitude)
            latitude: 29.719104168310523
        },
        {
            // 构件编号，构件id，有上传(testData.detailTestData.memberData.diseaseData/goodData.dataid = testData.detailTestData.memberData.memberid)
            dataid: 'g114pkr3y2z9804pkr3y24w7w_b200001_lz6c37cc_4',
            // ？构件检测数据，是一个json，下面会具体举例，对应不上的情况
            jsondata: JSON.stringify({}),
            // 构件状态，有上传(testData.detailTestData.memberData.diseaseData/goodData.memberstatus)
            memberstatus: '100',
            // 数据类型，有上传(testData.detailTestData.memberData.diseaseData/goodData.datatype)
            datatype: '',
            // 数据版本，病害唯一值，有上传(testData.detailTestData.memberData.diseaseData/goodData.version)，对应图片数据中的 dataid，用来确定图片
            version: 'g114pkr3y2z9804pkr3y24w7w_b200001_lz6c37cc_4_1',
            // 更新时间，有上传(testData.detailTestData.memberData.diseaseData/goodData.u_date)
            u_date: '2024-07-29 13:54:02',
            // 经度，有上传(testData.detailTestData.memberData.diseaseData/goodData.longitude)
            longitude: 106.82685801116266,
            // 纬度，有上传(testData.detailTestData.memberData.diseaseData/goodData.latitude)
            latitude: 29.719104168310523
        },
        {
            // 构件编号，构件id，有上传(testData.detailTestData.memberData.diseaseData/goodData.dataid = testData.detailTestData.memberData.memberid)
            dataid: 'g114pkr3y2z9804pkr3y24w7w_b200001_lz6c37cc_5',
            // ？构件检测数据，是一个json，下面会具体举例，对应不上的情况
            jsondata: JSON.stringify({}),
            // 构件状态，有上传(testData.detailTestData.memberData.diseaseData/goodData.memberstatus)
            memberstatus: '100',
            // 数据类型，有上传(testData.detailTestData.memberData.diseaseData/goodData.datatype)
            datatype: '',
            // 数据版本，病害唯一值，有上传(testData.detailTestData.memberData.diseaseData/goodData.version)，对应图片数据中的 dataid，用来确定图片
            version: 'g114pkr3y2z9804pkr3y24w7w_b200001_lz6c37cc_5_1',
            // 更新时间，有上传(testData.detailTestData.memberData.diseaseData/goodData.u_date)
            u_date: '2024-07-29 13:54:02',
            // 经度，有上传(testData.detailTestData.memberData.diseaseData/goodData.longitude)
            longitude: 106.82685801116266,
            // 纬度，有上传(testData.detailTestData.memberData.diseaseData/goodData.latitude)
            latitude: 29.719104168310523
        },
        {
            // 构件编号，构件id，有上传(testData.detailTestData.memberData.diseaseData/goodData.dataid = testData.detailTestData.memberData.memberid)
            dataid: 'g114pkr3y2z9804pkr3y24w7w_b300003_lz6c37cc_7',
            // ？构件检测数据，是一个json，下面会具体举例，对应不上的情况
            jsondata: JSON.stringify({}),
            // 构件状态，有上传(testData.detailTestData.memberData.diseaseData/goodData.memberstatus)
            memberstatus: '100',
            // 数据类型，有上传(testData.detailTestData.memberData.diseaseData/goodData.datatype)
            datatype: '',
            // 数据版本，病害唯一值，有上传(testData.detailTestData.memberData.diseaseData/goodData.version)，对应图片数据中的 dataid，用来确定图片
            version: 'g114pkr3y2z9804pkr3y24w7w_b300003_lz6c37cc_7_1',
            // 更新时间，有上传(testData.detailTestData.memberData.diseaseData/goodData.u_date)
            u_date: '2024-07-29 13:54:12',
            // 经度，有上传(testData.detailTestData.memberData.diseaseData/goodData.longitude)
            longitude: 106.82685801116266,
            // 纬度，有上传(testData.detailTestData.memberData.diseaseData/goodData.latitude)
            latitude: 29.719104168310523
        },
        {
            // 构件编号，构件id，有上传(testData.detailTestData.memberData.diseaseData/goodData.dataid = testData.detailTestData.memberData.memberid)
            dataid: 'g114pkr3y2z9804pkr3y24w7w_b300003_lz6c37cc_8',
            // ？构件检测数据，是一个json，下面会具体举例，对应不上的情况
            jsondata: JSON.stringify({
                "remark": "1"
            }),
            // 构件状态，有上传(testData.detailTestData.memberData.diseaseData/goodData.memberstatus)
            memberstatus: '100',
            // 数据类型，有上传(testData.detailTestData.memberData.diseaseData/goodData.datatype)
            datatype: '',
            // 数据版本，病害唯一值，有上传(testData.detailTestData.memberData.diseaseData/goodData.version)，对应图片数据中的 dataid，用来确定图片
            version: 'g114pkr3y2z9804pkr3y24w7w_b300003_lz6c37cc_8_1',
            // 更新时间，有上传(testData.detailTestData.memberData.diseaseData/goodData.u_date)
            u_date: '2024-07-29 13:54:12',
            // 经度，有上传(testData.detailTestData.memberData.diseaseData/goodData.longitude)
            longitude: 106.82685801116266,
            // 纬度，有上传(testData.detailTestData.memberData.diseaseData/goodData.latitude)
            latitude: 29.719104168310523
        },
    ],
    // 桥梁检测--图片数据（bridge_report_file表、bridge_report_member_checkstatus_media表、file_gps表）
    bridge_report_media: [
        {
            // 数据编号，有上传(dataid)，建议使用上传的dataid，桥梁图片(dataid=bridgeid)，部件图片(dataid=partid)，良好构件图片(dataid=构件的memberid)，病害图片(dataid=病害唯一值)
            dataid: 'b100001',
            // 文件id，有上传(memberid)
            mediaid: "g114pkr3y2z9804pkr3y24w7w_1",
            // 文件类型，有上传(type)，建议使用上传的type，桥梁图片(bridge)，部件图片(member)，良好构件图片(goodParts)，病害图片(diseaseParts)
            type: 'member',
            // ？ 分类，有上传(category)，建议使用上传的category，这里是后期改动的，可能和之前的数据对应不上
            category: 'member-b100001',
            // 图片描述，有上传(remark)
            remark: '',
            // 未存 -- 默认值
            is_source: 1,
            // 更新时间，有上传(u_date)
            u_date: '2024-07-29 15:39:36',
            // ？媒体类型，有上传(mediatype)，voice、image、virtualimage、video，以前还有虚拟图片，现在没有了
            mediatype: 'image',
            // * 主媒体id，默认0
            parentmediaid: '0',
            // 媒体文件名称，有上传(filename)
            filename: '主梁状况',
            // 媒体文件扩展名，有上传(filetypes)
            filetypes: 'jpg',
            // 媒体文件大小Kb，有上传(filesize)
            filesize: 3916316,
            // 媒体文件时长，有上传(duration)
            duration: 0,
            // * 文件gps，如果没有gps数据，那么没有gpsInfo字段
            // ？ 远端下载的key 或 在压缩包中对应的名字
            key: 'pro_m1624439268_g334nhpyb8wg084nhpybajp68/img/d20231207135411/thumbnail_001502ac-178e-409e-bbcd-01002a531aec.jpg'
        },
        {
            // 数据编号，有上传(dataid)，建议使用上传的dataid，桥梁图片(dataid=bridgeid)，部件图片(dataid=partid)，良好构件图片(dataid=构件的memberid)，病害图片(dataid=病害唯一值)
            dataid: 'b100001',
            // 文件id，有上传(memberid)
            mediaid: "g114pkr3y2z9804pkr3y24w7w_2",
            // 文件类型，有上传(type)，建议使用上传的type，桥梁图片(bridge)，部件图片(member)，良好构件图片(goodParts)，病害图片(diseaseParts)
            type: 'member',
            // ？ 分类，有上传(category)，建议使用上传的category，这里是后期改动的，可能和之前的数据对应不上
            category: 'member-b100001',
            // 图片描述，有上传(remark)
            remark: '',
            // 更新时间，有上传(u_date)
            u_date: '2024-07-29 15:39:36',
            // ？媒体类型，有上传(mediatype)，voice、image、virtualimage、video，以前还有虚拟图片，现在没有了
            mediatype: 'image',
            // * 主媒体id，默认0
            parentmediaid: '0',
            // 媒体文件名称，有上传(filename)
            filename: '主梁状况',
            // 媒体文件扩展名，有上传(filetypes)
            filetypes: 'jpg',
            // 媒体文件大小Kb，有上传(filesize)
            filesize: 389307,
            // 媒体文件时长，有上传(duration)
            duration: 0,
            // * 文件gps，如果没有gps数据，那么没有gpsInfo字段
            gpsInfo: {
                // 经度
                longitude: 106.826929,
                // 纬度
                latitude: 29.719054,
                // 精度
                accuracy: 30,
                // 高度
                altitude: 0
            },
            // ？ 远端下载的key 或 在压缩包中对应的名字
            key: 'pro_m1624439268_g334nhpyb8wg084nhpybajp68/img/d20231207135411/thumbnail_001502ac-178e-409e-bbcd-01002a531aec.jpg'
        },
        {
            // 数据编号，有上传(dataid)，建议使用上传的dataid，桥梁图片(dataid=bridgeid)，部件图片(dataid=partid)，良好构件图片(dataid=构件的memberid)，病害图片(dataid=病害唯一值)
            dataid: 'g114pkr3y2z980',
            // 文件id，有上传(memberid)
            mediaid: "g114pkr3y2z9804pkr3y24w7w_3",
            // 文件类型，有上传(type)，建议使用上传的type，桥梁图片(bridge)，部件图片(member)，良好构件图片(goodParts)，病害图片(diseaseParts)
            type: 'bridge',
            // ？ 分类，有上传(category)，建议使用上传的category，这里是后期改动的，可能和之前的数据对应不上
            category: 'L0101',
            // 图片描述，有上传(remark)
            remark: '',
            // 更新时间，有上传(u_date)
            u_date: '2024-07-29 15:39:36',
            // ？媒体类型，有上传(mediatype)，voice、image、virtualimage、video，以前还有虚拟图片，现在没有了
            mediatype: 'image',
            // * 主媒体id，默认0
            parentmediaid: '0',
            // 媒体文件名称，有上传(filename)
            filename: '桥梁左侧起点立面照',
            // 媒体文件扩展名，有上传(filetypes)
            filetypes: 'jpg',
            // 媒体文件大小Kb，有上传(filesize)
            filesize: 106999,
            // 媒体文件时长，有上传(duration)
            duration: 0,
            // * 文件gps，如果没有gps数据，那么没有gpsInfo字段
            gpsInfo: {
                // 经度
                longitude: 106.826929,
                // 纬度
                latitude: 29.719054,
                // 精度
                accuracy: 30,
                // 高度
                altitude: 0
            },
            // ？ 远端下载的key 或 在压缩包中对应的名字
            key: 'pro_m1624439268_g334nhpyb8wg084nhpybajp68/img/d20231207135411/thumbnail_001502ac-178e-409e-bbcd-01002a531aec.jpg'
        },
        {
            // 数据编号，有上传(dataid)，建议使用上传的dataid，桥梁图片(dataid=bridgeid)，部件图片(dataid=partid)，良好构件图片(dataid=构件的memberid)，病害图片(dataid=病害唯一值)
            dataid: 'g114pkr3y2z980',
            // 文件id，有上传(memberid)
            mediaid: "g114pkr3y2z9804pkr3y24w7w_4",
            // 文件类型，有上传(type)，建议使用上传的type，桥梁图片(bridge)，部件图片(member)，良好构件图片(goodParts)，病害图片(diseaseParts)
            type: 'bridge',
            // ？ 分类，有上传(category)，建议使用上传的category，这里是后期改动的，可能和之前的数据对应不上
            category: 'L0101',
            // 图片描述，有上传(remark)
            remark: '',
            // 更新时间，有上传(u_date)
            u_date: '2024-07-29 15:39:36',
            // ？媒体类型，有上传(mediatype)，voice、image、virtualimage、video，以前还有虚拟图片，现在没有了
            mediatype: 'image',
            // * 主媒体id，默认0
            parentmediaid: '0',
            // 媒体文件名称，有上传(filename)
            filename: '桥梁左侧起点立面照',
            // 媒体文件扩展名，有上传(filetypes)
            filetypes: 'jpg',
            // 媒体文件大小Kb，有上传(filesize)
            filesize: 2522433,
            // 媒体文件时长，有上传(duration)
            duration: 0,
            // * 文件gps，如果没有gps数据，那么没有gpsInfo字段
            gpsInfo: {
                // 经度
                longitude: 106.826929,
                // 纬度
                latitude: 29.719054,
                // 精度
                accuracy: 30,
                // 高度
                altitude: 0
            },
            // ？ 远端下载的key 或 在压缩包中对应的名字
            key: 'pro_m1624439268_g334nhpyb8wg084nhpybajp68/img/d20231207135411/thumbnail_001502ac-178e-409e-bbcd-01002a531aec.jpg'
        },
        {
            // 数据编号，有上传(dataid)，建议使用上传的dataid，桥梁图片(dataid=bridgeid)，部件图片(dataid=partid)，良好构件图片(dataid=构件的memberid)，病害图片(dataid=病害唯一值)
            dataid: 'g114pkr3y2z980',
            // 文件id，有上传(memberid)
            mediaid: "g114pkr3y2z9804pkr3y24w7w_41",
            // 文件类型，有上传(type)，建议使用上传的type，桥梁图片(bridge)，部件图片(member)，良好构件图片(goodParts)，病害图片(diseaseParts)
            type: 'bridge',
            // ？ 分类，有上传(category)，建议使用上传的category，这里是后期改动的，可能和之前的数据对应不上
            category: 'L0101',
            // 图片描述，有上传(remark)
            remark: '',
            // 更新时间，有上传(u_date)
            u_date: '2024-07-29 15:39:36',
            // ？媒体类型，有上传(mediatype)，voice、image、virtualimage、video，以前还有虚拟图片，现在没有了
            mediatype: 'image',
            // * 主媒体id，默认0
            parentmediaid: '0',
            // 媒体文件名称，有上传(filename)
            filename: '桥梁左侧起点立面照',
            // 媒体文件扩展名，有上传(filetypes)
            filetypes: '',
            // 媒体文件大小Kb，有上传(filesize)
            filesize: 0,
            // 媒体文件时长，有上传(duration)
            duration: 0,
            // * 文件gps，如果没有gps数据，那么没有gpsInfo字段
            gpsInfo: {
                // 经度
                longitude: 106.826929,
                // 纬度
                latitude: 29.719054,
                // 精度
                accuracy: 30,
                // 高度
                altitude: 0
            },
            // ？ 远端下载的key 或 在压缩包中对应的名字
            key: ''
        },
        {
            // 数据编号，有上传(dataid)，建议使用上传的dataid，桥梁图片(dataid=bridgeid)，部件图片(dataid=partid)，良好构件图片(dataid=构件的memberid)，病害图片(dataid=病害唯一值)
            dataid: 'g114pkr3y2z9804pkr3y24w7w_b100001_lz6c37cc_0_2',
            // 文件id，有上传(memberid)
            mediaid: "g114pkr3y2z9804pkr3y24w7w_5",
            // 文件类型，有上传(type)，建议使用上传的type，桥梁图片(bridge)，部件图片(member)，良好构件图片(goodParts)，病害图片(diseaseParts)
            type: 'diseaseParts',
            // ？ 分类，有上传(category)，建议使用上传的category，这里是后期改动的，可能和之前的数据对应不上
            category: 'disease',
            // 图片描述，有上传(remark)
            remark: '',
            // 更新时间，有上传(u_date)
            u_date: '2024-07-29 15:39:36',
            // ？媒体类型，有上传(mediatype)，voice、image、virtualimage、video，以前还有虚拟图片，现在没有了
            mediatype: 'image',
            // * 主媒体id，默认0
            parentmediaid: '0',
            // 媒体文件名称，有上传(filename)
            filename: '1-1#梁混凝土破损、掉角',
            // 媒体文件扩展名，有上传(filetypes)
            filetypes: 'jpg',
            // 媒体文件大小Kb，有上传(filesize)
            filesize: 403862,
            // 媒体文件时长，有上传(duration)
            duration: 0,
            // * 文件gps，如果没有gps数据，那么没有gpsInfo字段
            gpsInfo: {
                // 经度
                longitude: 106.826929,
                // 纬度
                latitude: 29.719054,
                // 精度
                accuracy: 30,
                // 高度
                altitude: 0
            },
            // ？ 远端下载的key 或 在压缩包中对应的名字
            key: 'pro_m1624439268_g334nhpyb8wg084nhpybajp68/img/d20231207135411/thumbnail_001502ac-178e-409e-bbcd-01002a531aec.jpg'
        }
    ]
}

const dataDeal = async (testData, userInfo) => {
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
    } else {
        bridgeProjectBindData = {
            projectid: projectData.projectid,
            bridgeid: bridgeData.bridgeid,
            bridgereportid: testData.dataType == 'structure' ? null : testData.bridgereportid,
            userid: userInfo.userid
        }
        // 存入
        await bridgeProjectBind.save(bridgeProjectBindData)
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
                    jsondata: item.jsondata,
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
        }
    }
}

const dataDealTest = (userInfo) => {
    dataDeal(testData, userInfo)
}

export {
    dataDealTest
}