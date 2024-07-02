import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Context as synergyContext } from '../Detect/SynergyProvider'

export default function SyTag() {
    const {
        state: { wsOpen, wsConnectionState }
    } = React.useContext(synergyContext);

    const stateToShow = {
        '已连接':'协同中',
        '断开':'协同断开',
        '结束':'协同结束'
    }
    const stateToColor = {
        '已连接':'#A4C979',
        '断开':'#CC5C5C',
        '结束':'#8D8D8D'
    }

    return wsOpen?(
        <View style={[styles.SyTagBox,{backgroundColor:stateToColor[wsConnectionState]}]}>
            <Text style={[styles.font]}>{stateToShow[wsConnectionState]}</Text>
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
        height: 18,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent:'center'
    },
    font:{
        color:'#ffffff',
        fontSize:10
    }
})
