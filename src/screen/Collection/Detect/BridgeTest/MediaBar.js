import React,{useState,useEffect} from 'react';
import {tailwind} from 'react-native-tailwindcss';
import {View, Pressable, Image, ImageBackground} from 'react-native';
import {RecordingModal} from '../../../../components/Audio';
import Camera from '../../../../components/Camera';
import Album from '../../../../components/Album';
import {CircleButton} from '../../../../components/Button';

export default function MediaBar({
  disableAlbum,
  disableCamera,
  disableExternal,
  disableRecording,
  disableVideo,
  // disableText,
  albumChange,
  cameraChange,
  externalChange,
  recordingChange,
  videoChange,
  // textChange,
}) {

  const [addPhotoImg, setAddPhotoImg] = useState()
  const [addPhotoDisImg, setAddPhotoDisImg] = useState()
  const [cameraImg, setCameraImg] = useState()
  const [cameraDisImg, serCameraDisImg] = useState()

  useEffect(() => {
    let cameraImg = require('../../../../iconImg/camera.png')
    setCameraImg(cameraImg)
    let cameraDisImg = require('../../../../iconImg/cameraDis.png')
    serCameraDisImg(cameraDisImg)
    let addPhotoImg = require('../../../../iconImg/addPhoto.png')
    setAddPhotoImg(addPhotoImg)
    let addPhotoDisImg = require('../../../../iconImg/addPhotoDis.png')
    setAddPhotoDisImg(addPhotoDisImg)
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
      {/* 生成一张虚拟照片 */}
      <Pressable disabled={disableExternal} onPress={externalChange}
      onPressIn={addPhotoPulldown} onPressOut={addPhotoPullup}>
        <Image style={{ height: 45, width: 45, alignItems: 'center' }}
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
