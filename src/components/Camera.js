/* 
  拍照
 */
import React,{useState,useEffect} from 'react';
import {View, Pressable, Image, ImageBackground,Dimensions} from 'react-native';
import RNFS from 'react-native-fs';
import uuid from 'react-native-uuid';
import {CircleButton} from './Button';
import {launchCamera} from 'react-native-image-picker';
import fs from '../utils/fs';
import { UploadObjectStorageName } from '../assets/uploadConfig/UploadConfig';

export default function Camera({onChange, type, disabled}) {
  // 打开相机
  const openCamera = async () => {
    try {
      const res = await launchCamera({
        mediaType: type,
        videoQuality: 'high',
        maxWidth:UploadObjectStorageName=='OBS'?2080:1560,
        maxHeight:UploadObjectStorageName=='OBS'?1560:1170
      });
      if (!res.assets[0]) {
        return;
      }
      const file = res.assets[0];
      const documentDir = RNFS.DocumentDirectoryPath;
      // 文件名为随机数
      const UUID = uuid.v4();
      // 将图片复制到本地文件夹
      await fs.copyFile(
        file.uri,
        `file://${documentDir}/${UUID}.${file.uri.split('.').pop()}`,
      );
      // 执行父组件的函数
      onChange &&
        onChange({
          uri: `${documentDir}/${UUID}.${file.uri.split('.').pop()}`,
          type: file.type,
          fileSize: file.fileSize,
        });
    } catch (err) {
      console.info("err",err);
    }
  };

  const [fileImg, setFileImg] = useState()
  const [fileDisImg, setFileDisImg] = useState()
  const [cameraImg, setCameraImg] = useState()
  const [cameraDisImg, serCameraDisImg] = useState()
  const [videoImg, setVideoImg] = useState()
  const [videoDisImg, setVideoDisImg] = useState()

  const [screenWidth,setScreenWidth] = useState() //屏幕宽度

  useEffect(() => {
    let fileImg = require('../iconImg/file.png')
    setFileImg(fileImg)
    let cameraImg = require('../iconImg/camera.png')
    setCameraImg(cameraImg)
    let cameraDisImg = require('../iconImg/cameraDis.png')
    serCameraDisImg(cameraDisImg)
    let videoImg = require('../iconImg/video.png')
    setVideoImg(videoImg)
    let videoDisImg = require('../iconImg/videoDis.png')
    setVideoDisImg(videoDisImg)

    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
  }, [])

  const cameraPulldown = (type) => {
    if (type === 'photo') {
      let cameraImg = require('../iconImg/cameraPull.png')
      setCameraImg(cameraImg)
    } else {
      let videoImg = require('../iconImg/videoPull.png')
      setVideoImg(videoImg)
    }
  }

  const cameraPullup = (type) => {
    if (type === 'photo') {
      let cameraImg = require('../iconImg/camera.png')
      setCameraImg(cameraImg)
    } else {
      let videoImg = require('../iconImg/video.png')
      setVideoImg(videoImg)
    }
  }

  return (
    // <CircleButton
    //   disabled={disabled}
    //   onPress={openCamera}
    //   name={type === 'photo' ? 'camera' : 'video'}
    // />
    // 圆形按钮
    <Pressable disabled={disabled} onPress={openCamera}
    onPressIn={() => cameraPulldown(type)}
    onPressOut={() => cameraPullup(type)}>
      <Image style={
          screenWidth > 830 ? [{ height: 60, width: 60, left: 15, alignItems: 'center' }] :
          [{ height: 35, width: 35, alignItems: 'center',left:8}]
        }
        source={
          disabled && type === 'photo' ? cameraDisImg : // 按钮为禁用状态时，分别判断type的值，以让相机与摄像机显示对应的图片
          (disabled && type !== 'photo' ? videoDisImg :
          (!disabled && type === 'photo' ? cameraImg : // 按钮为可用状态时....
          (!disabled && type !=='photo' ? videoImg : [])))
        }
      />
    </Pressable>
  );
}
