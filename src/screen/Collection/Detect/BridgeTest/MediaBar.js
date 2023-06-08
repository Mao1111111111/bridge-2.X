import React,{useState,useEffect} from 'react';
import {tailwind} from 'react-native-tailwindcss';
import {View, Pressable, Image, ImageBackground,Dimensions} from 'react-native';
import {RecordingModal} from '../../../../components/Audio';
import Camera from '../../../../components/Camera';
import Album from '../../../../components/Album';
import {CircleButton} from '../../../../components/Button';

// 媒体按钮组
export default function MediaBar({
  // 打开文件夹按钮 -- 禁用
  disableAlbum,
  // 打开文件夹按钮 -- 选中文件后
  albumChange,
  // 打开文件夹按钮 -- 照片 还是 mixed
  disableVideo,
  // 拍照是否可用
  disableCamera,
  // 拍照后
  cameraChange,
  // 录像后
  videoChange,
  // 虚拟照片按钮是否可用
  disableExternal,
  // 虚拟照片点击后
  externalChange,
  // 录音按钮是否可用
  disableRecording,
  // disableText,
  // 录音按钮点击后
  recordingChange
  // textChange,
}) {

  const [addPhotoImg, setAddPhotoImg] = useState()
  const [addPhotoDisImg, setAddPhotoDisImg] = useState()
  const [cameraImg, setCameraImg] = useState()
  const [cameraDisImg, serCameraDisImg] = useState()

  const [screenWidth,setScreenWidth] = useState() //屏幕宽度

  useEffect(() => {
    let cameraImg = require('../../../../iconImg/camera.png')
    setCameraImg(cameraImg)
    let cameraDisImg = require('../../../../iconImg/cameraDis.png')
    serCameraDisImg(cameraDisImg)
    let addPhotoImg = require('../../../../iconImg/addPhoto.png')
    setAddPhotoImg(addPhotoImg)
    let addPhotoDisImg = require('../../../../iconImg/addPhotoDis.png')
    setAddPhotoDisImg(addPhotoDisImg)

    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
  }, [])

  const addPhotoPulldown = () => {
    let addPhotoImg = require('../../../../iconImg/addPhotoPull.png')
    setAddPhotoImg(addPhotoImg)
  }
  const addPhotoPullup = () => {
    let addPhotoImg = require('../../../../iconImg/addPhoto.png')
    setAddPhotoImg(addPhotoImg)
  }

  return (
    <View style={[tailwind.justifyCenter]}>
      <View style={tailwind.mY1} />
      {/* 打开本地文件夹 */}
      <Album
        type={disableVideo ? 'photo' : 'mixed'}
        onChange={albumChange}
        disabled={disableAlbum}
      />
      <View style={tailwind.mY1} />
      {/* 拍照 */}
      <Camera type="photo" disabled={disableCamera} onChange={cameraChange} />
      <View style={tailwind.mY1} />
      {/* <CircleButton
        name="camera-outline"
        disabled={disableExternal}
        onPress={externalChange}
      /> */}
      {/* { height: 45, width: 45, alignItems: 'center' } */}
      {/* 生成一张虚拟照片 */}
      <Pressable disabled={disableExternal} onPress={externalChange}
      onPressIn={addPhotoPulldown} onPressOut={addPhotoPullup}>
        <Image style={
          screenWidth > 830 ? [{ height: 45, width: 45, alignItems: 'center' }] :
          [{ height: 35, width: 35, alignItems: 'center',left:8 }]
        }
          source={disableExternal ? addPhotoDisImg : addPhotoImg}
        />
      </Pressable>
      <View style={tailwind.mY1} />
      {/* 录音 */}
      <RecordingModal disabled={disableRecording} onChange={recordingChange} />
      <View style={tailwind.mY1} />
      {/* 录像 */}
      <Camera type="video" disabled={disableCamera} onChange={videoChange} />
      <View style={tailwind.mY1} />
      {/*
      {disableText ? (
        <></>
      ) : (
        <>
          <CircleButton name="file-document-edit" onPress={textChange} />
          <View style={tailwind.mY1} />
        </>
      )} */}
    </View>
  );
}
