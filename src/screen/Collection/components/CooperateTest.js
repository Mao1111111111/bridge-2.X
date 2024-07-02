/**
 * 协同检测
 */
import React, { useEffect, useState } from 'react'
import Modal from '../../../components/Modal'
import { View, StyleSheet, Pressable, Text, Alert, DeviceEventEmitter } from 'react-native'
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

export default function ({
    project,
    bridge,
    closeModal,
    CoopIntoTest }) {
    const {
        state: { networkStateAll, userInfo, deviceId },
    } = React.useContext(GlobalContext);
    const {
        state: { wsConnectionState, synergyTestData, curSynergyInfo, wsConnection, curSynergyBridgeInfo },
        dispatch
    } = React.useContext(synergyContext);

    // 当前顶部tab
    const [curTopItem, setCurTopItem] = useState('创建任务')
    // 模态框loading
    const [isLoading, setIsLoading] = useState(true)
    // 任务码
    const [taskCode, setTaskCode] = useState('')
    // 协同人数
    const [personNum, setPersonNum] = useState('1')
    // 创建者
    const [creator, setCreator] = useState('')
    // 参与任务码
    const [joinCode, setJoinCode] = useState('')
    // 参与者
    const [joinName, setJoinName] = useState('')
    // 任务进行中
    const [isTaskIng, setIsTaskIng] = useState(false)
    // 任务错误
    const [isError, setIsError] = useState(false)
    // 是否是任务创建者
    const [isCreator, setIsCreator] = useState(false)

    // 打开模态框时触发
    useEffect(() => {
        initModal()
    }, [])

    // 监听ws连接状态
    useEffect(() => {
        if (wsConnectionState == '已连接') {
            // 设置页面内容
            setTaskCode(curSynergyInfo.taskId)
            setPersonNum(curSynergyInfo.synergyPeopleNum)
            setCreator(JSON.parse(curSynergyInfo.creator).realname)
            setJoinCode(curSynergyInfo.taskId)
            JSON.parse(curSynergyInfo.participator).forEach(item => {
                if (item.isSelf == 'true') {
                    setJoinName(item.realname)
                }
            })
            // 判断是否是创建者
            if (JSON.parse(curSynergyInfo.creator).deviceId == deviceId) {
                setIsCreator(true)
            } else {
                setIsCreator(false)
            }
            setIsTaskIng(true)
            setIsError(false)
            // 设置模态框loading
            setIsLoading(false)
        }
        if (wsConnectionState == '已关闭') {
            setIsTaskIng(false)
            // 设置模态框loading
            setIsLoading(false)
        }
        if (wsConnectionState == '错误') {
            setIsTaskIng(false)
            setIsError(true)
            // 设置模态框loading
            setIsLoading(false)
        }
    }, [wsConnectionState])

    // 初始化数据
    const initModal = async () => {
        // 设置顶部tab
        setCurTopItem(bridge ? '创建任务' : '参与任务')
        // 获取本地协同检测数据
        let _curSynergyInfo = JSON.parse(await AsyncStorage.getItem('curSynergyInfo'))
        // 存在协同检测信息
        if (_curSynergyInfo) {
            // 将协同信息存入全局
            dispatch({ type: 'curSynergyInfo', payload: _curSynergyInfo })
            // 获取本地协同桥梁信息
            let _curSynergyBridgeInfo = JSON.parse(await AsyncStorage.getItem('curSynergyBridgeInfo'))
            // 将协同桥梁信息存入全局
            dispatch({ type: 'curSynergyBridgeInfo', payload: _curSynergyBridgeInfo })
            // 获取ws本地地址
            let _WSPath = await AsyncStorage.getItem('WSPath')
            // 设置全局ws路径
            dispatch({ type: 'WSPath', payload: _WSPath })
            // 设置任务状态打开
            dispatch({ type: 'wsOpen', payload: true })
        } else {
            // 不存在协同检测信息，清除填写的内容
            setTaskCode('')
            setPersonNum('1')
            setCreator('')
            setJoinCode('')
            setJoinName('')
            // 设置模态框loading
            setIsLoading(false)
        }
    }

    //-----模态框操作-----
    // 关闭模态框
    const closeModalOk = () => {
        // 调用父组件的回调
        closeModal()
    }
    // 顶部bar点击
    const topBarClick = (item) => {
        setCurTopItem(item)
    }

    //------创建任务------
    // 协同人数加减按钮点击
    const personNumChange = (e) => {
        var _personNum = parseInt(personNum)
        _personNum += e
        if (e < 1) {
            setPersonNum('1')
        } else {
            setPersonNum(_personNum + '')
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
        if (!creator) {
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
            // 创建任务并加入房间
            creatTaskFetch(IP)
        }).catch(e => {
            // 设置模态框loading
            setIsLoading(false)
        })
    }
    // 创建任务fetch
    const creatTaskFetch = async (IP) => {
        // 处理初始桥梁数据
        let data = await dealInitBridgeData()
        // url
        // let url = 'http://'+IP+':8000/task/'+personNum+'/'
        let url = 'http://10.1.1.71:8000/task/' + personNum + '/'
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
                    // 协同信息
                    let synergyData = {
                        bridgeid: bridge.bridgeid,
                        bridgereportid: bridge.bridgereportid,
                        userid: userInfo.userid,
                        synergyid: new Date().getTime() + '',
                        synergyPeopleNum: personNum,
                        taskId: result.room_id,
                        creator: JSON.stringify({
                            username: userInfo.username,
                            realname: creator,
                            userid: userInfo.userid,
                            deviceId: deviceId
                        }),
                        participator: JSON.stringify([{
                            username: userInfo.username,
                            realname: creator,
                            userid: userInfo.userid,
                            deviceId: deviceId,
                            isSelf: 'true'
                        }]),
                        c_date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                        state: '检测中',
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
                    // 将协同数据存入本地
                    await AsyncStorage.setItem('curSynergyInfo', JSON.stringify(synergyData))
                    // 将协同桥梁存入本地
                    await AsyncStorage.setItem('curSynergyBridgeInfo', JSON.stringify(bridge))
                    // 将协同信息存入全局
                    dispatch({ type: 'curSynergyInfo', payload: synergyData })
                    // 将协同桥梁信息存入全局
                    dispatch({ type: 'curSynergyBridgeInfo', payload: bridge })
                    // 加入任务
                    CTAfterAddTask(IP, result.room_id)
                } else {
                    Alert.alert('请连接指定WIFI,1' + JSON.stringify(result))
                }
            })
            .catch(error => {
                Alert.alert('请连接指定WIFI,2' + error)
                // 设置模态框loading
                setIsLoading(false)
            });
    }
    // 处理初始桥梁数据
    const dealInitBridgeData = async () => {
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
            synergyid: bridge.bridgereportid + parseInt((new Date()).valueOf() + '' + Math.ceil(Math.random() * (9999 - 1000 + 1) + 1000 - 1)).toString(36),
            // 协同人数
            synergyPeopleNum: personNum,
            // 创建者
            creator: {
                // 账号
                username: userInfo.username,
                // 真实姓名
                realname: creator,
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
    // 创建任务后加入任务
    const CTAfterAddTask = (IP, taskid) => {
        // url
        // let url = 'http://'+IP+':8000/task_room/'+taskid
        let url = 'http://10.1.1.71:8000/task_room/' + taskid
        fetch(url, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(result => {
                if (result.status == 'success') {
                    // 地址
                    // let WSPath = 'ws://'+ IP + ':8000' +result.ws + '?user=' + deviceId
                    let WSPath = 'ws://10.1.1.71:8000' + result.ws + '?user_id=' + userInfo.username + '&user_name=' + creator
                    // 将ws地址存入本地
                    AsyncStorage.setItem('WSPath', WSPath)
                    // 设置全局ws路径
                    dispatch({ type: 'WSPath', payload: WSPath })
                    // 设置任务状态打开
                    dispatch({ type: 'wsOpen', payload: true })
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
    // 复制任务码
    const copyCode = async () => {
        // 写入
        Clipboard.setString(taskCode);
        // 读取
        let str = await Clipboard.getString();
        if (str) {
            Alert.alert('提示', '复制任务码成功【' + str + '】');
        }
    }

    //------参与任务------
    // 确认参与
    const joinOk = () => {
        // 判断是否有任务码
        if (!joinCode) {
            Alert.alert('创建失败', '请输入任务码')
            return
        }
        if (!(/^\d{4}$/.test(joinCode))) {
            Alert.alert('创建失败', '请输入正确的任务号格式不正确')
            return
        }
        if (!joinName) {
            Alert.alert('创建失败', '请输入工程师名称')
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
            // 创建任务获取桥梁数据
            joinTaskGetBridge(IP)
        }).catch(e => {
            // 设置模态框loading
            setIsLoading(false)
        })
    }
    // 创建任务获取桥梁数据
    const joinTaskGetBridge = async (IP) => {
        // url
        // let url = 'http://'+IP+':8000/task_room/'+joinCode
        let url = 'http://10.1.1.71:8000/task_room/' + joinCode
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
        if (!bridgeTableData) {
            // 不存在这个桥梁，将桥梁信息存入
            // bridge 表 存入数据库
            bridgeTable.save({
                ...result.task_msg.bridge,
                userid: userInfo.userid
            })
            // bridgeMember 表 存入数据库
            result.task_msg.bridge_member.forEach(item => {
                bridgeMember.save(item)
            })
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
            // 协同信息
            let synergyData = {
                bridgeid: result.task_msg.bridge.bridgeid,
                bridgereportid: result.task_msg.bridge.bridgereportid,
                userid: userInfo.userid,
                synergyid: new Date().getTime() + '',
                synergyPeopleNum: result.task_msg.createInfo.synergyPeopleNum,
                taskId: joinCode,
                creator: JSON.stringify(result.task_msg.createInfo.creator),
                participator: JSON.stringify([
                    {
                        ...result.task_msg.createInfo.creator,
                        isSelf: 'false'
                    },
                    {
                        username: userInfo.username,
                        realname: joinName,
                        userid: userInfo.userid,
                        deviceId: deviceId,
                        isSelf: 'true'
                    }]),
                c_date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                state: '检测中',
                other: ''
            }
            // 协同桥梁
            let newBridge = {
                ...result.task_msg.bridge,
                synergyTestData: synergyData
            }
            // 地址
            // let WSPath = 'ws://'+ IP + ':8000' +result.ws + '?user=' + deviceId
            let WSPath = 'ws://10.1.1.71:8000' + result.ws + '?user_id=' + userInfo.username + '&user_name=' + joinName
            // 将协同信息存入数据库
            await synergyTest.save(synergyData)
            // 将协同数据存入本地
            await AsyncStorage.setItem('curSynergyInfo', JSON.stringify(synergyData))
            // 将协同桥梁存入本地
            await AsyncStorage.setItem('curSynergyBridgeInfo', JSON.stringify(newBridge))
            // 将ws地址存入本地
            AsyncStorage.setItem('WSPath', WSPath)
            // 将协同信息存入全局
            dispatch({ type: 'curSynergyInfo', payload: synergyData })
            // 将协同桥梁信息存入全局
            dispatch({ type: 'curSynergyBridgeInfo', payload: newBridge })
            // 设置全局ws路径
            dispatch({ type: 'WSPath', payload: WSPath })
            // 设置任务状态打开
            dispatch({ type: 'wsOpen', payload: true })
        } else {
            // 设置模态框loading
            setIsLoading(false)
            Alert.alert('桥梁已存在')
        }
    }

    //------任务操作------
    // 删除任务
    const deleteTask = () => {
        // 设置模态框loading
        setIsLoading(true)
        // 获取所连接wifi的ip
        NetworkInfo.getGatewayIPAddress().then(IP => {
            // let url = 'http://'+IP+':8000/task_room/'+taskCode
            let url = 'http://10.1.1.71:8000/task_room/' + taskCode
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
    // 退出任务
    const quitTask = async () => {
        // 设置模态框loading
        setIsLoading(true)
        // 检测记录表--更新检测状态
        await synergyTest.updateState({ state: '检测结束', bridgereportid: curSynergyInfo.bridgereportid })
        // 清除本地数据
        await AsyncStorage.removeItem('curSynergyInfo')
        // 清楚本地协同桥梁信息
        await AsyncStorage.removeItem('curSynergyBridgeInfo')
        // 请求本地ws地址
        await AsyncStorage.removeItem('WSPath')
        // 清空全局协同信息
        dispatch({ type: 'curSynergyInfo', payload: null })
        // 清空全局协同桥梁信息
        dispatch({ type: 'curSynergyBridgeInfo', payload: null })
        // 清除全局ws地址
        dispatch({ type: 'WSPath', payload: '' })
        // 清除任务状态
        dispatch({ type: 'wsOpen', payload: false })
        // 处理页面字段
        setTaskCode('')
        setPersonNum('1')
        setCreator('')
        setJoinCode('')
        setJoinName('')
        setIsTaskIng(false)
        // 设置模态框loading
        setIsLoading(false)
    }
    // 开始检测
    const goWork = () => {
        // 协同检测开始
        CoopIntoTest(curSynergyBridgeInfo)
    }


    return (
        <Modal
            title="协同检测"
            pid="P1103"
            showHead={true}
            // 没有滚动条
            notScroll={true}
            width={800}
            height={500}
            keyboardVerticalOffset={-50}
            //点击顶部关闭按钮
            onClose={closeModalOk}
        >
            {/* 顶部tab */}
            <View style={styles.topBarBox}>
                {
                    bridge &&
                    <Pressable style={[styles.topBarBtn, { backgroundColor: curTopItem == '创建任务' ? '#2b427d' : '#2b427d00' }]} onPress={() => topBarClick('创建任务')}>
                        <Text style={{ color: curTopItem == '创建任务' ? '#ffffff' : '#808285' }}>创建任务</Text>
                    </Pressable>
                }
                <Pressable style={[styles.topBarBtn, { backgroundColor: curTopItem == '参与任务' ? '#2b427d' : '#2b427d00' }]} onPress={() => topBarClick('参与任务')}>
                    <Text style={{ color: curTopItem == '参与任务' ? '#ffffff' : '#808285' }}>参与任务</Text>
                </Pressable>
                <Pressable style={[styles.topBarBtn, { backgroundColor: curTopItem == '使用帮助' ? '#2b427d' : '#2b427d00' }]} onPress={() => topBarClick('使用帮助')}>
                    <Text style={{ color: curTopItem == '使用帮助' ? '#ffffff' : '#808285' }}>使用帮助</Text>
                </Pressable>
            </View>
            {
                isLoading ? <Loading text='加载中...'></Loading> :
                    isError ? <Text>加载错误</Text> :
                        <>
                            {/* 内容盒子 */}
                            <View style={styles.contentBox}>
                                {/* 创建任务 */}
                                {
                                    curTopItem == '创建任务' &&
                                    <View style={styles.taskConAllBox}>
                                        {/* 左侧 */}
                                        <View style={styles.taskLeftBox}>
                                            {
                                                isTaskIng && <TextInput
                                                    name="taskCode"
                                                    label="任务码:    "
                                                    disabled
                                                    value={taskCode}
                                                    style={[styles.InputBox]}
                                                    inputStyle={styles.inputStyle} />
                                            }
                                            <View style={styles.taskLeftRowBox}>
                                                <TextInput
                                                    name="personNum"
                                                    label="协同人数:"
                                                    disabled
                                                    value={personNum}
                                                    style={[styles.InputBox2]}
                                                    inputStyle={styles.inputStyle} />
                                                {
                                                    !isTaskIng &&
                                                    <>
                                                        <Button style={styles.addNumBtn} onPress={() => personNumChange(1)}>+</Button>
                                                        <Button style={styles.addNumBtn} onPress={() => personNumChange(-1)}>-</Button>
                                                    </>
                                                }
                                            </View>
                                            <TextInput
                                                name="creator"
                                                label="创建者:    "
                                                disabled={isTaskIng}
                                                value={creator}
                                                style={[styles.InputBox]}
                                                inputStyle={styles.inputStyle}
                                                onChange={(e) => setCreator(e.value)} />
                                        </View>
                                        {/* 左侧表单遮罩层 */}
                                        {
                                            isTaskIng &&
                                            <View style={styles.leftFormShelter}>
                                                <Text>不允许创建多个任务</Text>
                                            </View>
                                        }
                                        {/* 右侧 表格+操作按钮 */}
                                        {
                                            isTaskIng &&
                                            <View style={[styles.rightBox]}>
                                                {/* 表格 */}
                                                <View style={[styles.rightTableBox]}></View>
                                                {/* 操作按钮 */}
                                                {
                                                    isCreator &&
                                                    <View style={[styles.rightActionBox]}>
                                                        <Button style={[styles.rightBtn]} onPress={copyCode}>复制任务码</Button>
                                                        <Button style={[styles.rightBtn]} onPress={deleteTask}>删除任务</Button>
                                                        <Button style={[styles.rightBtn]} onPress={goWork}>开始检测</Button>
                                                    </View>
                                                }
                                            </View>
                                        }
                                    </View>
                                }
                                {/* 参与任务 */}
                                {
                                    curTopItem == '参与任务' &&
                                    <View style={styles.taskConAllBox}>
                                        {/* 左侧 */}
                                        <View style={styles.taskLeftBox}>
                                            <TextInput
                                                name="joinCode"
                                                label="任务码:    "
                                                disabled={isTaskIng}
                                                value={joinCode}
                                                style={[styles.InputBox]}
                                                inputStyle={styles.inputStyle}
                                                onChange={(e) => setJoinCode(e.value)} />
                                            <TextInput
                                                name="joinName"
                                                label="您的名称:"
                                                disabled={isTaskIng}
                                                value={joinName}
                                                style={[styles.InputBox]}
                                                inputStyle={styles.inputStyle}
                                                onChange={(e) => setJoinName(e.value)} />
                                        </View>
                                        {/* 左侧表单遮罩层 */}
                                        {
                                            isTaskIng &&
                                            <View style={styles.leftFormShelter}>
                                                <Text>协同任务进行中</Text>
                                            </View>
                                        }
                                        {/* 右侧 表格+操作按钮 */}
                                        {
                                            isTaskIng &&
                                            <View style={[styles.rightBox]}>
                                                {/* 表格 */}
                                                <View style={[styles.rightTableBox]}></View>
                                                {/* 操作按钮 */}
                                                <View style={[styles.rightActionBox]}>
                                                    <Button style={[styles.rightBtn]} onPress={copyCode}>复制任务码</Button>
                                                    <Button style={[styles.rightBtn]} onPress={quitTask}>退出任务</Button>
                                                    <Button style={[styles.rightBtn]} onPress={goWork}>开始检测</Button>
                                                </View>
                                            </View>
                                        }
                                    </View>
                                }
                                {/* 使用帮助 */}
                                {
                                    curTopItem == '使用帮助' &&
                                    <View style={styles.helpBox}>
                                        <Text style={styles.helpText}>1.如需使用协同检测功能，请先让采集端设备连接到协同检测盒子</Text>
                                        <Text style={styles.helpText}>2.协同检测盒子WiFi名称：JIANLIDE_LAN1001</Text>
                                        <Text style={styles.helpText}>3.协同检测盒子WiFi密码：jianlide</Text>
                                    </View>
                                }
                            </View>
                            {/* 分割线 */}
                            <Divider style={[tailwind.mB2]} />
                            {/* 底部操作按钮 */}
                            <View style={styles.modalFoote}>
                                {/* 取消按钮，关闭模态框 */}
                                <Button style={[styles.closeBtn]} onPress={closeModalOk}>取消</Button>
                                {/* 确认按钮 */}
                                {
                                    curTopItem == '创建任务' && (!isTaskIng) && <Button style={[styles.okBtn]} onPress={createOk}>确认创建</Button>
                                }
                                {
                                    curTopItem == '参与任务' && (!isTaskIng) && <Button style={[styles.okBtn]} onPress={joinOk}>确认参与</Button>
                                }
                                {
                                    curTopItem == '使用帮助' && <Button style={[styles.okBtn]} onPress={closeModalOk}>确认</Button>
                                }
                            </View>
                        </>
            }
        </Modal>)
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
        width: '15%',
        height: '100%',
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
        width: '50%'
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
        height: '100%',
        width: '50%'
    },
    addNumBtn: {
        backgroundColor: '#2b427d'
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