import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function Progress({
    bgStyle,//背景样式--宽默认100%;高默认10，圆角默认10 
    ProgressColor,//进度条颜色
    value,//num，进度值，默认90
    ProgressStyle,//进度条样式，高10，圆角10
}) {
  return (
    <View style={[styles.bgBox,bgStyle||{}]}>
        <View style={[styles.ProgressBox,{backgroundColor:ProgressColor?ProgressColor:'#128FD8',width:value?(value+'%'):'0%'},ProgressStyle||{}]}></View>
    </View> 
  )
}

const styles = StyleSheet.create({
    bgBox:{
        backgroundColor:'#D3D3D3',
        width:'100%',
        height:10,
        borderRadius:10
    },
    ProgressBox:{
        height:10,
        borderRadius:10
    }
})