import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Context as synergyContext } from '../Detect/SynergyProvider'

export default function SyTag() {
    const {
        state: { curSynergyInfo, wsConnectionState }
    } = React.useContext(synergyContext);

    const stateToShow = {
        '已连接':'协同中',
        '断开':'协同断开',
        '结束':'协同结束'
    }

    return curSynergyInfo?(
        <View style={[styles.SyTagBox]}>
            <Text>{stateToShow[wsConnectionState]}</Text>
        </View>
    ):<></>
}

const styles = StyleSheet.create({
    SyTagBox: {
        position: 'absolute',
        right: 2,
        bottom: 40,
        backgroundColor: 'red',
        width: 45,
        height: 20,
        borderRadius: 3,
        alignItems: 'center'
    }
})
