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
        state: { wsOpen, wsConnectionState, curSynergyInfo }
    } = React.useContext(synergyContext);

    const stateToShow = {
        '已连接': '协同中',
        '断开': '协同断开',
        '结束': '协同结束'
    }
    const stateToColor = {
        '已连接': '#A4C979',
        '断开': '#CC5C5C',
        '结束': '#8D8D8D'
    }

    // 标签展示
    const [tagShow, setTagShow] = useState(false)
    // 协同检测 模态框的 引用
    const coopRef = React.useRef();

    useEffect(() => {
        if (curSynergyInfo) {
            if (curSynergyInfo.bridgereportid == bridgereportid) {
                setTagShow(true)
            } else {
                setTagShow(false)
            }
        } else {
            setTagShow(false)
        }
    }, [curSynergyInfo, wsOpen, wsConnectionState, bridgereportid])

    const openCoop = () => {
        console.log('打开协同检测弹窗');
        coopRef.current.open()
    }

    return tagShow ? (
        <TouchableOpacity
            style={[styles.SyTagBox, { backgroundColor: stateToColor[wsConnectionState] }]}
            onPress={openCoop}>
            <Text style={[styles.font]}>{stateToShow[wsConnectionState]}</Text>
            {/* 协同检测 模态框 */ }
            <Cooperate ref={coopRef} />
        </TouchableOpacity>
    ) : <></>
}

// 协同检测 -- 人员列表模态框
const Cooperate = React.forwardRef(({ onSubmitOver }, ref,) => {
    // 协同检测全局参数
    const {
        state: { allyStatusList }
    } = React.useContext(synergyContext);

    // 模态框是否显示
    const [visible, setVisible] = useState(false);
    // 当前展示的页面
    const [funcShow, setFuncShow] = useState(1)

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
            title="协同检测"
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
                    flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'
                }}>
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
                {/* 内容 */}
                <View style={[tailwind.flex1, {}]}>
                    {
                        funcShow == 1 &&
                        <View style={{ width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ width: '100%', height: '100%', alignItems: 'center', paddingTop: 5, paddingHorizontal: 10 }}>
                                {/* 参与者信息表格 */}
                                <View style={{ width: '100%', height: '100%', padding: 10 }}>
                                    <Table.Box
                                        header={
                                            <Table.Header>
                                                <Table.Title title="序号" flex={1} />
                                                <Table.Title title="账号" flex={4} />
                                                <Table.Title title="人员" flex={3} />
                                                <Table.Title title="加入时间" flex={2} />
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