/**
 * 协同检测--版本2
 */
import React, { useEffect, useState } from 'react'
import Modal from '../../../components/Modal'
import { View, StyleSheet, Pressable, Text, Alert, FlatList } from 'react-native'
import { tailwind } from 'react-native-tailwindcss';
import { TextInput } from '../../../components/Input';
import Button from '../../../components/Button';
import { Divider } from 'react-native-paper';
import { Context as GlobalContext } from '../../../providers/GlobalProvider';
import { Context as synergyContext } from '../Detect/SynergyProvider'
import { NetworkInfo } from 'react-native-network-info';
import * as bridgeTable from '../../../database/bridge';
import * as bridgeReport from '../../../database/bridge_report';
import * as uploadStateRecord from '../../../database/upload_state_record';
import * as bridgeMember from '../../../database/bridge_member';
import * as bridgeReportMember from '../../../database/bridge_report_member';
import * as bridgeProjectBind from '../../../database/bridge_project_bind';
import * as synergyTest from '../../../database/synergy_test';
import { loop } from '../../../utils/common';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import Loading from '../../../components/Loading';
import Table from '../../../components/Table';

export default function CooperateTest2({
    project,
    bridge,
    closeModal,
    CoopIntoTest
}) {
    const {
        state: { networkStateAll, userInfo, deviceId },
    } = React.useContext(GlobalContext);

    // 模态框loading
    const [isLoading, setIsLoading] = useState(false)
    // 当前顶部tab 创建任务、参与任务、任务详情、使用帮助
    const [curTopItem, setCurTopItem] = useState('')
    // 是否是任务创建者
    const [isCreator, setIsCreator] = useState(true)
    // 测试ip
    const testIP = '10.1.1.71:8000'
    // const testIP = '39.91.167.242:9000'

    // 初始化页面
    useEffect(() => {
        if (bridge) {
            // 判断是否有协同任务，以及协同任务是否结束
            if (bridge.synergyTestData && bridge.synergyTestData.state !== '协同结束') {
                setBridgestation(bridge.bridgestation)
                setBridgename(bridge.bridgename)
                setITaskCode(bridge.synergyTestData.taskId)
                setIPeopleNum(bridge.synergyTestData.synergyPeopleNum + '')
                setICreator(JSON.parse(bridge.synergyTestData.creator).realname)
                setCurTopItem('任务详情')
                JSON.parse(bridge.synergyTestData.participator).forEach(item => {
                    if (item.isSelf == 'true') {
                        setIEngineer(item.realname)
                    }
                })
                // 判断是否是创建者
                if (JSON.parse(bridge.synergyTestData.creator).deviceId == deviceId) {
                    setIsCreator(true)
                } else {
                    setIsCreator(false)
                }
            } else {
                // 判断是否是创建者
                if(bridge.synergyTestData){
                    if (JSON.parse(bridge.synergyTestData.creator).deviceId == deviceId) {
                        setIsCreator(true)
                    } else {
                        setIsCreator(false)
                    }
                }
                // 设置顶部导航
                setCurTopItem('创建任务')
            }
        } else {
            setCurTopItem('参与任务')
            setIsCreator(false)
        }
    }, [])


    // -------- 创建任务 --------
    // 创建任务-协同人数
    const [CTPersonNum, setCTPersonNum] = useState('1')
    // 创建者
    const [CTCreator, setCTCreator] = useState('')
    // 协同人数加减按钮点击
    const CTPersonNumChange = (e) => {
        var _personNum = parseInt(CTPersonNum)
        if (_personNum < 10) {
            _personNum += e
        }
        if (e < 1) {
            setCTPersonNum('1')
        } else {
            setCTPersonNum(_personNum + '')
        }
    }
    // 确认创建
    const createOk = () => {
        // 判断是否有桥梁数据
        if (!bridge) {
            Alert.alert('创建失败', '请选择桥梁后再创建任务')
            return
        }
        // 创建者名称
        if (!CTCreator) {
            Alert.alert('创建失败', '请输入创建者名称')
            return
        }
        // 判断网络是否连接
        if (!networkStateAll.isConnected.isConnected) {
            Alert.alert('创建失败', '请连接网络')
            return
        }
        // 是否连接了wifi
        if (networkStateAll.type !== 'wifi') {
            Alert.alert('创建失败', '请连接WIFI')
            return
        }

        // 设置模态框loading
        setIsLoading(true)

        // 获取所连接wifi的ip
        NetworkInfo.getGatewayIPAddress().then(IP => {
            // 创建任务fetch
            creatTaskFetch(IP)
        }).catch(e => {
            // 设置模态框loading
            setIsLoading(false)
        })
    }
    // 创建任务fetch
    const creatTaskFetch = async (IP) => {
        // 设置协同编号
        let synergyid = bridge.bridgereportid + parseInt((new Date()).valueOf() + '' + Math.ceil(Math.random() * (9999 - 1000 + 1) + 1000 - 1)).toString(36)
        // 处理初始桥梁数据
        let data = await dealInitBridgeData(synergyid)
        // url
        // let url = 'http://'+IP+':8000/task/'+CTPersonNum+'/'
        let url = 'http://' + testIP + '/task/' + CTPersonNum + '/'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(async result => {
                if (result.status == 'success') {
                    // 获取ws地址
                    // let url1 = 'http://'+IP+':8000/task_room/'+ result.room_id
                    let url1 = 'http://' + testIP + '/task_room/' + result.room_id
                    fetch(url1, {
                        method: 'GET'
                    })
                        .then(res => res.json())
                        .then(async result1 => {
                            if (result1.status == 'success') {
                                // 协同信息
                                let synergyData = {
                                    bridgeid: bridge.bridgeid,
                                    bridgereportid: bridge.bridgereportid,
                                    userid: userInfo.userid,
                                    synergyid: synergyid,
                                    synergyPeopleNum: CTPersonNum,
                                    taskId: result.room_id,
                                    // WSPath: 'ws://' + IP + ':8000' + result1.ws + '?user_id=' + userInfo.username + ',' + userInfo.userid + '&user_name=' + CTCreator + '&device_id=' + deviceId,
                                    WSPath: 'ws://' + testIP + result1.ws + '?user_id=' + userInfo.username + ',' + userInfo.userid + '&user_name=' + CTCreator + '&device_id=' + deviceId,
                                    creator: JSON.stringify({
                                        username: userInfo.username,
                                        realname: CTCreator,
                                        userid: userInfo.userid,
                                        deviceId: deviceId
                                    }),
                                    participator: JSON.stringify([{
                                        username: userInfo.username,
                                        realname: CTCreator,
                                        userid: userInfo.userid,
                                        deviceId: deviceId,
                                        isSelf: 'true'
                                    }]),
                                    c_date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                    state: '协同中',
                                    other: ''
                                }
                                // 检查数据库中是否存在这条数据
                                let synergyTestData = await synergyTest.getByReportid(bridge.bridgereportid)
                                if (synergyTestData) {
                                    // 修改数据
                                    await synergyTest.update(synergyData)
                                } else {
                                    // 将协同信息存入数据库
                                    await synergyTest.save(synergyData)
                                }
                                // 设置任务详情数据
                                setITaskCode(result.room_id)
                                setIPeopleNum(CTPersonNum)
                                setICreator(CTCreator)
                                setIEngineer(CTCreator)
                                // 设置顶部tab
                                setCurTopItem('任务详情')
                                // 设置模态框loading
                                setIsLoading(false)
                            } else {
                                if (result.detail.msg == 'invalid room_id') {
                                    Alert.alert('任务号不存在')
                                } else {
                                    Alert.alert('ws失败1：' + result)
                                }
                                // 设置模态框loading
                                setIsLoading(false)
                            }
                        })
                        .catch(err => {
                            console.log("err", JSON.stringify(err));
                            Alert.alert('ws失败2：' + err)
                            // 设置模态框loading
                            setIsLoading(false)
                        })
                } else {
                    Alert.alert('请连接指定WIFI,1' + JSON.stringify(result))
                    // 设置模态框loading
                    setIsLoading(false)
                }
            })
            .catch(error => {
                Alert.alert('请连接指定WIFI,2' + error)
                // 设置模态框loading
                setIsLoading(false)
            });
    }
    // 处理初始桥梁数据
    const dealInitBridgeData = async (synergyid) => {
        // 判断 是否有 桥梁检测报告数据
        const bridgeReportData = await bridgeReport.get({
            bridgeid: bridge.bridgeid,
            bridgereportid: bridge.bridgereportid
        })
        // 如果 桥梁检测报告 数据 不存在，那么存入检测报告数据
        if (!bridgeReportData) {
            // 新建桥梁检测数据
            await bridgeReport.save({
                bridgeid: bridge.bridgeid,
                bridgereportid: bridge.bridgereportid,
                userid: userInfo.userid
            });
            // 上传状态记录
            await uploadStateRecord.save({
                bridgeid: bridge.bridgeid,
                bridgereportid: bridge.bridgereportid,
                userid: userInfo.userid
            })
            // 获取桥梁的构件，并在数据中加入 报告id、构件检测状态、构件评分、更新时间
            let _partsList = [];
            _partsList = (await bridgeMember.list(bridge.bridgeid)).map(item => ({
                ...item,
                bridgereportid: bridge.bridgereportid,
                memberstatus: '0',
                dpscores_auto: 0,
                u_date: '',
            }));
            // 处理构件编号
            _partsList.forEach(item => {
                item.memberid = item.memberid.replace(bridge.bridgeid, bridge.bridgereportid)
            })
            // 将桥梁构件数据 存入 桥梁构件检测表
            await loop(_partsList, bridgeReportMember.save);
        }

        // 获取 桥梁构件 数据
        let bridge_member = await bridgeMember.list(bridge.bridgeid)
        // 获取 桥梁项目绑定 数据
        let bridge_project_bind = await bridgeProjectBind.get({ bridgeid: bridge.bridgeid, projectid: project.projectid })
        // 获取 桥梁报告 数据
        let bridge_report = await bridgeReport.get({ bridgeid: bridge.bridgeid, bridgereportid: bridge.bridgereportid })
        // 获取 桥梁检测构件 数据
        let bridge_report_member = await bridgeReportMember.list({ bridgeid: bridge.bridgeid, bridgereportid: bridge.bridgereportid })
        // 创建信息
        let createInfo = {
            // 协同编号
            synergyid: synergyid,
            // 协同人数
            synergyPeopleNum: CTPersonNum,
            // 创建者
            creator: {
                // 账号
                username: userInfo.username,
                // 真实姓名
                realname: CTCreator,
                // id
                userid: userInfo.userid,
                // 设备id
                deviceId: deviceId
            },
            // 创建时间
            c_date: dayjs().format('YYYY-MM-DD HH:mm:ss')
        }
        // 数据
        let data = {
            bridge: bridge,
            bridge_member,
            bridge_project_bind,
            bridge_report,
            bridge_report_member,
            createInfo
        }
        return data
    }

    // -------- 参与任务 --------
    // 参与任务码
    const [JTJoinCode, setJTJoinCode] = useState('')
    // 参与者
    const [JTJoinName, setJTJoinName] = useState('')
    // 确认参与
    const joinOk = async () => {
        // 判断是否有任务码
        if (!JTJoinCode) {
            Alert.alert('参与失败', '请输入任务码')
            return
        }
        if (!(/^\d{4}$/.test(JTJoinCode))) {
            Alert.alert('参与失败', '请输入正确的任务号格式不正确')
            return
        }
        if (!JTJoinName) {
            Alert.alert('参与失败', '请输入工程师名称')
            return
        }

        // 判断网络是否连接
        if (!networkStateAll.isConnected.isConnected) {
            Alert.alert('参与失败', '请连接网络')
            return
        }

        // 是否连接了wifi
        if (networkStateAll.type !== 'wifi') {
            Alert.alert('参与失败', '请连接WIFI')
            return
        }

        // 判断任任务码是否存在
        let synergyTestData = await synergyTest.getBytaskId(JTJoinCode)
        if(synergyTestData){
            Alert.alert('参与失败', synergyTestData.state=='协同中'?'当前协同任务参与中':'当前协同任务已结束')
            return
        }

        // 设置模态框loading
        setIsLoading(true)

        // 获取所连接wifi的ip
        NetworkInfo.getGatewayIPAddress().then(IP => {
            // 参与任务获取桥梁数据
            joinTaskGetBridge(IP)
        }).catch(e => {
            // 设置模态框loading
            setIsLoading(false)
        })
    }
    // 参与任务获取桥梁数据
    const joinTaskGetBridge = async (IP) => {
        // url
        // let url = 'http://'+IP+':8000/task_room/'+JTJoinCode
        let url = 'http://' + testIP + '/task_room/' + JTJoinCode
        fetch(url, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(result => {
                if (result.status == 'success') {
                    // 处理接收的桥梁数据
                    dealReceiveBridgeData(result)
                } else {
                    if (result.detail.msg == 'invalid room_id') {
                        Alert.alert('任务号不存在')
                    } else {
                        Alert.alert('ws失败1：' + result)
                    }
                    // 设置模态框loading
                    setIsLoading(false)
                }
            })
            .catch(err => {
                Alert.alert('ws失败2：' + err)
                // 设置模态框loading
                setIsLoading(false)
            });
    }
    // 处理接收的桥梁数据
    const dealReceiveBridgeData = async (result) => {
        // 将桥梁数据存入本地
        // bridge 表中是否存在这个桥梁
        let bridgeTableData = await bridgeTable.getByBridgeid(result.task_msg.bridge.bridgeid)
        // 不存在这个桥梁，将桥梁信息存入
        if (!bridgeTableData) {
            // bridge 表 存入数据库
            bridgeTable.save({
                ...result.task_msg.bridge,
                userid: userInfo.userid
            })
            // bridgeMember 表 存入数据库
            result.task_msg.bridge_member.forEach(item => {
                bridgeMember.save(item)
            })
        }
        // 桥梁检测信息是否存在
        let bindData = await bridgeProjectBind.getByBridgereportid({
            bridgereportid:result.task_msg.bridge_project_bind.bridgereportid,
            bridgeid:result.task_msg.bridge.bridgeid
        })
        // 不存在桥梁检测信息，将桥梁检测信息存入
        if (!bindData) {
            // bridge_project_bind 数据存入数据库
            bridgeProjectBind.save({
                projectid: project.projectid,
                bridgeid: result.task_msg.bridge.bridgeid,
                bridgereportid: result.task_msg.bridge_project_bind.bridgereportid,
                userid: userInfo.userid
            })
            // bridge_report 表数据 存入数据库
            bridgeReport.save({
                ...result.task_msg.bridge_report,
                userid: userInfo.userid
            })
            // uploadStateRecord 表 数据存入数据库
            uploadStateRecord.save({
                bridgeid: result.task_msg.bridge.bridgeid,
                bridgereportid: result.task_msg.bridge_project_bind.bridgereportid,
                userid: userInfo.userid
            })
            // bridge_report_member 表 数据存入数据库
            result.task_msg.bridge_report_member.forEach(item => {
                bridgeReportMember.save(item)
            })
        }

        // 协同信息
        let synergyData = {
            bridgeid: result.task_msg.bridge.bridgeid,
            bridgereportid: result.task_msg.bridge.bridgereportid,
            userid: userInfo.userid,
            synergyid: result.task_msg.createInfo.synergyid,
            synergyPeopleNum: result.task_msg.createInfo.synergyPeopleNum,
            taskId: JTJoinCode,
            // WSPath: 'ws://' + IP + ':8000' + result.ws + '?user_id=' + userInfo.username + ',' + userInfo.userid + '&user_name=' + JTJoinName + '&device_id=' + deviceId,
            WSPath: 'ws://' + testIP + result.ws + '?user_id=' + userInfo.username + ',' + userInfo.userid + '&user_name=' + JTJoinName + '&device_id=' + deviceId,
            creator: JSON.stringify(result.task_msg.createInfo.creator),
            participator: JSON.stringify([
                {
                    ...result.task_msg.createInfo.creator,
                    isSelf: 'false'
                },
                {
                    username: userInfo.username,
                    realname: JTJoinName,
                    userid: userInfo.userid,
                    deviceId: deviceId,
                    isSelf: 'true'
                }]),
            c_date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            state: '协同中',
            other: ''
        }
        // 检查数据库中是否存在这条数据
        let synergyTestData = await synergyTest.getByReportid(result.task_msg.bridge_project_bind.bridgereportid)
        if (synergyTestData) {
            // 修改数据
            await synergyTest.update(synergyData)
        } else {
            // 将协同信息存入数据库
            await synergyTest.save(synergyData)
        }
        // 设置任务详情数据
        setBridgestation(result.task_msg.bridge.bridgestation)
        setBridgename(result.task_msg.bridge.bridgename)
        setITaskCode(JTJoinCode)
        setIPeopleNum(result.task_msg.createInfo.synergyPeopleNum)
        setICreator(result.task_msg.createInfo.creator.realname)
        setIEngineer(JTJoinName)
        // 设置顶部tab
        setCurTopItem('任务详情')
        // 设置模态框loading
        setIsLoading(false)
    }

    // -------- 任务详情 --------
    // 桥梁桩号
    const [bridgestation,setBridgestation] = useState('')
    // 桥梁名称
    const [bridgename,setBridgename] = useState('')
    // 任务码
    const [ITaskCode, setITaskCode] = useState('')
    // 协同人数
    const [IPeopleNum, setIPeopleNum] = useState('')
    // 创建者
    const [ICreator, setICreator] = useState('')
    // 工程师名称
    const [IEngineer, setIEngineer] = useState('')
    // 退出任务
    const quitTask = async () => {
        // 设置模态框loading
        setIsLoading(true)
        // 检测记录表--更新检测状态
        await synergyTest.updateState({ state: '协同结束', bridgereportid: bridge.bridgereportid })
        // 设置创建页面数据
        setCTPersonNum('1')
        setCTCreator('')
        setCurTopItem('创建任务')
        // 设置模态框loading
        setIsLoading(false)
    }
    // 删除任务
    const deleteTask = () => {
        // 设置模态框loading
        setIsLoading(true)
        // 获取所连接wifi的ip
        NetworkInfo.getGatewayIPAddress().then(IP => {
            // let url = 'http://'+IP+':8000/task_room/'+ITaskCode
            let url = 'http://' + testIP + '/task_room/' + ITaskCode
            fetch(url, {
                method: 'Delete'
            })
                .then(res => res.json())
                .then(result => {
                    if (result.status == 'success') {
                        // 退出任务
                        quitTask()
                    } else {
                        if (result.detail.msg == 'invalid room_id') {
                            Alert.alert('任务号不存在')
                        } else {
                            Alert.alert('ws失败1：' + result)
                        }
                        // 设置模态框loading
                        setIsLoading(false)
                    }
                })
                .catch(err => {
                    Alert.alert('ws失败2：' + err)
                    // 设置模态框loading
                    setIsLoading(false)
                });
        }).catch(e => {
            // 设置模态框loading
            setIsLoading(false)
        })
    }

    return (
        <Modal
            title={"协同检测"}
            pid="P1103"
            showHead={true}
            // 没有滚动条
            notScroll={true}
            width={450}
            height={350}
            keyboardVerticalOffset={-50}
            //点击顶部关闭按钮
            onClose={closeModal}
        >
            {/* 顶部tab */}
            <View style={styles.topBarBox}>
                {
                    curTopItem == '创建任务' &&
                    <Pressable style={[styles.topBarBtn, { backgroundColor: curTopItem == '创建任务' ? '#2b427d' : '#2b427d00' }]} onPress={() => setCurTopItem('创建任务')}>
                        <Text style={{ color: curTopItem == '创建任务' ? '#ffffff' : '#808285' }}>创建任务</Text>
                    </Pressable>
                }
                {
                    curTopItem == '参与任务' &&
                    <Pressable style={[styles.topBarBtn, { backgroundColor: curTopItem == '参与任务' ? '#2b427d' : '#2b427d00' }]} onPress={() => setCurTopItem('参与任务')}>
                        <Text style={{ color: curTopItem == '参与任务' ? '#ffffff' : '#808285' }}>参与任务</Text>
                    </Pressable>
                }
                {
                    curTopItem == '任务详情' &&
                    <Pressable style={[styles.topBarBtn, { backgroundColor: curTopItem == '任务详情' ? '#2b427d' : '#2b427d00' }]} onPress={() => setCurTopItem('任务详情')}>
                        <Text style={{ color: curTopItem == '任务详情' ? '#ffffff' : '#808285' }}>任务详情</Text>
                    </Pressable>
                }
                <Pressable style={[styles.topBarBtn, { backgroundColor: curTopItem == '使用帮助' ? '#2b427d' : '#2b427d00' }]} onPress={() => setCurTopItem('使用帮助')}>
                    <Text style={{ color: curTopItem == '使用帮助' ? '#ffffff' : '#808285' }}>使用帮助</Text>
                </Pressable>
            </View>
            {
                isLoading ? <Loading text='加载中...'></Loading> :
                    <>
                        {/* 内容盒子 */}
                        <View style={styles.contentBox}>
                            {/* 创建任务 */}
                            {
                                curTopItem == '创建任务' &&
                                <View style={styles.taskConAllBox}>
                                    <Text style={styles.bridgeInfo1}>{'桥梁桩号：' + bridge.bridgestation + '     桥梁名称：' + bridge.bridgename}</Text>
                                    <View style={styles.taskLeftRowBox}>
                                        <TextInput
                                            name="CTPersonNum"
                                            label="邀请人数:    "
                                            disabled
                                            value={CTPersonNum}
                                            style={[styles.InputBox2]}
                                            inputStyle={styles.inputStyle} />
                                        <Button style={styles.addNumBtn} onPress={() => CTPersonNumChange(1)}>+</Button>
                                        <Button style={styles.addNumBtn} onPress={() => CTPersonNumChange(-1)}>-</Button>
                                    </View>
                                    <View style={{ width: '100%', paddingLeft: 80, marginBottom: 10 }}>
                                        <Text>*除您之外的其他协作者人数（1~10）</Text>
                                    </View>
                                    <TextInput
                                        name="CTCreator"
                                        label="工程师名称:"
                                        value={CTCreator}
                                        style={[styles.InputBox]}
                                        inputStyle={styles.inputStyle}
                                        onChange={(e) => setCTCreator(e.value)} />
                                    {
                                        !isCreator && <Text style={{ marginTop: 15, color: 'red' }}>*禁止参与者对该桥梁再次发起协同任务</Text>
                                    }
                                </View>
                            }
                            {/* 参与任务 */}
                            {
                                curTopItem == '参与任务' &&
                                <View style={styles.taskConAllBox}>
                                    <TextInput
                                        name="JTJoinCode"
                                        label="任务码:        "
                                        value={JTJoinCode}
                                        style={[styles.InputBox, { marginVertical: 20 }]}
                                        inputStyle={styles.inputStyle}
                                        onChange={(e) => setJTJoinCode(e.value)} />
                                    <TextInput
                                        name="JTJoinName"
                                        label="工程师名称:"
                                        value={JTJoinName}
                                        style={[styles.InputBox]}
                                        inputStyle={styles.inputStyle}
                                        onChange={(e) => setJTJoinName(e.value)} />
                                </View>
                            }
                            {/* 任务详情 */}
                            {
                                curTopItem == '任务详情' &&
                                <View style={styles.taskConAllBox}>
                                    <Text style={styles.bridgeInfo1}>{'桥梁桩号：' + bridgestation + '     桥梁名称：' + bridgename}</Text>
                                    <Text style={styles.bridgeInfo1}>{'任务码：' + ITaskCode + '         协同人数：' + IPeopleNum}</Text>
                                    <Text style={styles.bridgeInfo1}>创 建 者：{ICreator}</Text>
                                    <Text style={styles.bridgeInfo1}>工程师名称(本人)：{IEngineer}</Text>
                                </View>
                            }
                        </View>
                        {/* 分割线 */}
                        <Divider style={[tailwind.mB2]} />
                        {/* 底部操作按钮 */}
                        <View style={styles.modalFoote}>
                            {/* 取消按钮，关闭模态框 */}
                            <Button style={[styles.closeBtn]} onPress={closeModal}>取消</Button>
                            {/* 确认按钮 */}
                            {
                                curTopItem == '创建任务' && isCreator &&
                                <Button style={[styles.okBtn]} onPress={createOk}>确认创建</Button>
                            }
                            {
                                curTopItem == '参与任务' && <Button style={[styles.okBtn]} onPress={joinOk}>确认参与</Button>
                            }
                            {
                                curTopItem == '任务详情' &&
                                <View style={{ flexDirection: 'row' }}>
                                    {
                                        isCreator && <Button style={[styles.okBtn]} onPress={deleteTask}>删除任务</Button>
                                    }
                                    {/* <Button style={[styles.okBtn, { marginLeft: 10 }]} onPress={quitTask}>退出任务</Button> */}
                                </View>
                            }
                            {
                                curTopItem == '使用帮助' && <Button style={[styles.okBtn]}>确认</Button>
                            }
                        </View>
                    </>
            }
        </Modal>
    )
}


const styles = StyleSheet.create({
    topBarBox: {
        height: '10%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    topBarBtn: {
        width: 100,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentBox: {
        ...tailwind.flex1
    },
    taskConAllBox: {
        width: '100%',
        height: '100%',
        marginLeft: 15,
        paddingTop: 20
    },
    taskLeftBox: {
        width: '50%',
        height: '100%',
        paddingTop: 20,
        paddingLeft: 20
    },
    InputBox: {
        height: '20%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        ...tailwind.mR6,
        width: 220
    },
    inputStyle: {
        color: 'black'
    },
    taskLeftRowBox: {
        width: '100%',
        height: '20%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    InputBox2: {
        ...tailwind.mR6,
        // height: '100%',
        width: 220
    },
    bridgeInfo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10
    },
    bridgeInfo1: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10
    },
    addNumBtn: {
        backgroundColor: '#2b427d',
        height: 40
    },
    leftFormShelter: {
        width: '54%',
        height: '100%',
        alignItems: "center",
        paddingTop: 50,
        paddingLeft: 20,
        backgroundColor: '#fff',
        position: 'absolute',
        opacity: 0.3,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 40
    },
    helpBox: {
        paddingTop: 20,
        paddingLeft: 20
    },
    helpText: {
        marginBottom: 10
    },
    modalFoote: {
        ...tailwind.mB2,
        ...tailwind.mX4,
        ...tailwind.flexRow,
        ...tailwind.justifyBetween,
    },
    closeBtn: {
        backgroundColor: '#808285'
    },
    okBtn: {
        backgroundColor: '#2b427d'
    },
    rightBox: {
        width: '45%',
        height: '100%',
        alignItems: 'center',
        marginLeft: 20
    },
    rightTableBox: {
        width: '100%',
        height: '70%',
        padding: 10
    },
    rightActionBox: {
        width: '100%',
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightBtn: {
        backgroundColor: '#2b427d'
    }
})