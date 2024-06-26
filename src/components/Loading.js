import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"

export default function Loading({
    boxStyle,//盒子样式--可自定义添加
    size, //string or number,大小,值：'small'、'large'、数字，默认'small'
    color, //string,颜色,默认 系统默认的强调色
    text, //string，loading文字
    textStyle, //obj,文字样式
}) {
  try{
    return (
      <View style={[styles.box,boxStyle]}>
          <ActivityIndicator size={size} color={color?color:'#2b427d'}/>
          {
              text&&<Text style={[styles.text,textStyle||{}]}>{text}</Text>
          }
      </View>
    )
  }catch(e){
    console.log('Loading',e);
  }
}

const styles = StyleSheet.create({
    box: {
      flex: 1,
      alignItems:'center',
      justifyContent: "center",
      flexDirection: "row",
      padding: 10,
      backgroundColor:'#ffffff'
    },
    text:{
        marginLeft:10,
        color:'#71757f'
    }
});