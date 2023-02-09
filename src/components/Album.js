// 打开本地文件夹
import React,{useState, useEffect} from 'react';
import {View, Pressable, Image, ImageBackground} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {CircleButton} from './Button';

export default function Album({onChange, type, disabled}) {
  const openCamera = async () => {
    try {
      // type 'photo' or 'video'
      const res = await launchImageLibrary({
        mediaType: type || 'photo',
      });
      if (!res.assets[0]) {
        return;
      }
      const file = res.assets[0];
      onChange &&
        onChange({
          uri: file.uri.replace('file://', ''),
          type: file.type,
          fileSize: file.fileSize,
        });
    } catch (err) {
      console.info(err);
    }
  };

  const [fileImg, setFileImg] = useState()
  const [fileDisImg, setFileDisImg] = useState()

  useEffect(() => {
    let fileImg = require('../iconImg/file.png')
    setFileImg(fileImg)
    let fileDisImg = require('../iconImg/fileDis.png')
    setFileDisImg(fileDisImg)
  },[])

  const albumPulldown = () => {
    let fileImg = require('../iconImg/filePull.png')
    setFileImg(fileImg)
  }

  const albumPullup = () => {
    let fileImg = require('../iconImg/file.png')
    setFileImg(fileImg)
  }

  return (
    // <CircleButton disabled={disabled} name="folder-open" onPress={openCamera} />
    <Pressable disabled={disabled} onPress={openCamera} onPressIn={albumPulldown} onPressOut={albumPullup}>
      <Image style={{ height: 45, width: 45, alignItems: 'center' }}
        source={disabled ? fileDisImg : fileImg}
      />
    </Pressable>
  );
}
