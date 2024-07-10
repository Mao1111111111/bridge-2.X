import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable, TouchableOpacity, FlatList } from 'react-native'
import { Context as bridgeTestContext } from '../Detect/BridgeTest/Provider'
import { Context as synergyContext } from '../Detect/SynergyProvider'
import { Divider } from 'react-native-paper';
import Modal from '../../../components/Modal';
import { tailwind } from 'react-native-tailwindcss';
import Table from '../../../components/Table';
import Button from '../../../components/Button';

export default function SyTag() {
    const {
        state: { bridgereportid }
    } = React.useContext(bridgeTestContext);
    const {
        state: { wsOpen, wsConnectionState, curSynergyInfo, wsError }
    } = React.useContext(synergyContext);

    // 标签展示
    const [tagShow, setTagShow] = useState(false)
    // 标签颜色
    const [tagColor, setTagColor] = useState('#A4C979')
    // 标签文字
    const [tagFont, setTagFont] = useState('协同中')
    // 协同检测 模态框的 引用
    const coopRef = React.useRef();

    // 标签展示
    useEffect(() => {
        // 有协同检测信息 && 当前桥梁是协同检测桥梁 && 协同检测打开
        if (curSynergyInfo && (curSynergyInfo.bridgereportid == bridgereportid) && wsOpen) {
            setTagShow(true)
        } else {
            setTagShow(false)
        }
    }, [curSynergyInfo, bridgereportid, wsOpen])

    // 标签颜色与文字
    useEffect(() => {
        if (wsConnectionState == '未连接' && wsError) {
            setTagColor('#CC5C5C')
            setTagFont('协同断开')
        } else {
            setTagColor('#A4C979')
            setTagFont('协同中')
        }
    }, [wsConnectionState, wsError])

    // 点击打开协同检测弹窗
    const openCoop = () => {
        coopRef.current.open()
    }

    return tagShow ? (
        <TouchableOpacity
            style={[styles.SyTagBox, { backgroundColor: tagColor }]}
            onPress={openCoop}>
            <Text style={[styles.font]}>{tagFont}</Text>
            {/* 协同检测 模态框 */}
            <Cooperate ref={coopRef} />
        </TouchableOpacity>
    ) : <></>
}

// 协同检测 -- 人员列表模态框
const Cooperate = React.forwardRef(({ onSubmitOver }, ref,) => {
    // 协同检测全局参数
    const {
        state: { allyStatusList, curSynergyInfo, wsConnectionState, wsError }
    } = React.useContext(synergyContext);

    // 模态框是否显示
    const [visible, setVisible] = useState(false);
    // 当前展示的页面
    const [funcShow, setFuncShow] = useState(1)
    // 断开原因
    const [errFont, setErrFont] = useState('')

    // 暴露给父组件的函数
    React.useImperativeHandle(ref, () => ({
        // 打开
        open: () => {
            setFuncShow(1)
            setVisible(true);
        },
        // 关闭函数
        close,
    }));

    // 连接失败处理
    useEffect(() => {
        if (wsConnectionState == '未连接' && wsError) {
            // 处理断开文字
            dealErrFont()
        } else {
            setErrFont('')
        }
    }, [wsConnectionState, wsError])

    // 处理断开文字
    const dealErrFont = () => {
        let font = wsError
        if (wsError == "Expected HTTP 101 response but was '403 Forbidden'") {
            font = '任务不存在或任务人数超出'
        } else if (wsError == "Software caused connection abort") {
            font = '网络连接中断'
        } else if (wsError.substring(0, 20) == 'Failed to connect to') {
            font = '网络连接失败，请检测网络连接'
        } else if (wsError.substring(0, 20) == 'failed to connect to') {
            font = '请连接指定网络'
        }
        setErrFont(font)
    }

    // 关闭时
    const close = () => {
        // 关闭模态框
        setVisible(false);
    };

    // 切换功能页面
    const changeFunc = (e) => {
        setFuncShow(e)
    }

    // 时间转换
    const timeToHS = (dateTime) => {
        let time = dateTime.split(' ')[1]
        let timeArr = time.split(':')
        let HSTime = timeArr[0] + ':' + timeArr[1]
        return HSTime
    }

    return (
        // 导入桥梁模态框
        <Modal
            visible={visible}
            title={"协同检测"}
            pid="P1303"
            showHead={true}
            // 没有滚动条
            notScroll={true}
            width={400}
            height={350}
            keyboardVerticalOffset={-250}
            onClose={() => setVisible(false)}>
            <View style={[tailwind.flex1, {}]}>
                {/* 顶部 */}
                <View style={{
                    height: '10%', width: '100%',
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable style={{
                            width: 100, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center',
                            backgroundColor: funcShow == 1 ? '#2b427d' : '#2b427d00'
                        }}
                            onPress={() => changeFunc(1)}>
                            <Text style={{ color: funcShow == 1 ? '#fff' : '#808285' }}>任务详情</Text>
                        </Pressable>
                        <Pressable style={{
                            width: 100, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center',
                            backgroundColor: funcShow == 2 ? '#2b427d' : '#2b427d00'
                        }}
                            onPress={() => changeFunc(2)}>
                            <Text style={{ color: funcShow == 2 ? '#fff' : '#808285' }}>使用帮助</Text>
                        </Pressable>
                    </View>
                    <Text style={{ marginRight: 20, fontWeight: 'bold' }}>任务码：{curSynergyInfo.taskId}</Text>
                </View>
                {/* 内容 */}
                <View style={[tailwind.flex1, {}]}>
                    {
                        funcShow == 1 &&
                        <View style={{ width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ width: '100%', height: '100%', alignItems: 'center', paddingTop: 5, paddingHorizontal: 10 }}>
                                {/* 参与者信息表格 */}
                                <View style={{ width: '100%', height: '100%', padding: 10 }}>
                                    {
                                        errFont ?
                                            <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text>{errFont}</Text>
                                            </View> :
                                            <Table.Box
                                                header={
                                                    <Table.Header>
                                                        <Table.Title title="序号" flex={1} />
                                                        <Table.Title title="账号" flex={4} />
                                                        <Table.Title title="人员" flex={3} />
                                                        <Table.Title title="时间" flex={2} />
                                                        <Table.Title title="状态" flex={2} />
                                                    </Table.Header>
                                                }>
                                                <FlatList
                                                    data={allyStatusList}
                                                    showsVerticalScrollIndicator={false}
                                                    renderItem={({ item, index }) => (
                                                        <Table.Row key={index}>
                                                            <Table.Cell flex={1}>{index + 1}</Table.Cell>
                                                            <Table.Cell flex={4}>{item.username}</Table.Cell>
                                                            <Table.Cell flex={3}>{item.realname}</Table.Cell>
                                                            <Table.Cell flex={2}>{timeToHS(item.time)}</Table.Cell>
                                                            <Table.Cell flex={2}>{item.state}</Table.Cell>
                                                        </Table.Row>
                                                    )}
                                                />
                                            </Table.Box>
                                    }
                                </View>
                            </View>
                        </View>
                    }
                    {
                        funcShow == 2 &&
                        <View style={styles.helpBox}>
                            <Text style={styles.helpText}>1.如需使用协同检测功能，请先让采集端设备连接到协同检测盒子</Text>
                            <Text style={styles.helpText}>2.协同检测盒子WiFi名称：JIANLIDE_LAN1001</Text>
                            <Text style={styles.helpText}>3.协同检测盒子WiFi密码：jianlide</Text>
                        </View>
                    }
                </View>
            </View>
            {/* 分割线 */}
            <Divider style={[tailwind.mB2]} />
            {/* 底部操作按钮 */}
            <View style={styles.modalFoote}>
                {/* 确认 */}
                <Button style={[{ backgroundColor: '#2b427d' }]} onPress={() => close()}>确认</Button>
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    SyTagBox: {
        position: 'absolute',
        right: 2,
        bottom: 40,
        backgroundColor: 'red',
        width: 45,
        height: 18,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999
    },
    font: {
        color: '#ffffff',
        fontSize: 10
    },
    helpBox: {
        paddingTop: 20,
        paddingHorizontal: 20
    },
    helpText: {
        marginBottom: 10
    },
    modalFoote: {
        ...tailwind.mB2,
        ...tailwind.mX4,
        ...tailwind.flexRow,
        ...tailwind.justifyEnd,
    }
})