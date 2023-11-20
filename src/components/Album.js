// 打开本地文件夹
import React,{useState, useEffect} from 'react';
import {View, Pressable, Image, ImageBackground,Dimensions} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {CircleButton} from './Button';
import { rotateImage } from '../utils/imageDeal';

export default function Album({onChange, type, disabled}) {
  // 打开本地文件夹
  const openCamera = async () => {
    try {
      // type 'photo' or 'video'
      // 打开本地文件夹
      const res = await launchImageLibrary({
        mediaType: type || 'photo',
      });
      // 如果没有选中照片那么返回
      if (!res.assets[0]) {
        return;
      }
      const file = res.assets[0];
      let path = file.uri
      if(file.height>file.width){
        path =await rotateImage(file.uri)
      }
      // 执行父组件的函数,并将 文件地址、类型、文件大小传回
      onChange &&
        onChange({
          uri: path.replace('file://', ''),
          type: file.type,
          fileSize: file.fileSize,
        });
    } catch (err) {
      console.info('err',err);
    }
  };

  // 设置按钮图片
  const [fileImg, setFileImg] = useState()
  const [fileDisImg, setFileDisImg] = useState()

  const [screenWidth,setScreenWidth] = useState() //屏幕宽度

  useEffect(() => {
    let fileImg = require('../iconImg/file.png')
    setFileImg(fileImg)
    let fileDisImg = require('../iconImg/fileDis.png')
    setFileDisImg(fileDisImg)

    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
  },[])

  // 按下时
  const albumPulldown = () => {
    let fileImg = require('../iconImg/filePull.png')
    setFileImg(fileImg)
  }

  // 手移开时
  const albumPullup = () => {
    let fileImg = require('../iconImg/file.png')
    setFileImg(fileImg)
  }

  return (
    // <CircleButton disabled={disabled} name="folder-open" onPress={openCamera} />
    <Pressable disabled={disabled} onPress={openCamera} onPressIn={albumPulldown} onPressOut={albumPullup}>
      <Image style={
          screenWidth > 830 ? [{ height: 60, width: 60, left: 15, alignItems: 'center' }] :
          [{ height: 35, width: 35, alignItems: 'center',left:8 }]
        }
        source={disabled ? fileDisImg : fileImg}
      />
    </Pressable>
  );
}
