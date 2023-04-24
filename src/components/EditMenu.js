// 编辑侧边按钮菜单 - 左侧
// 右侧按钮在文件CommonView里
import React,{useState,useEffect} from 'react';
import {NativeModules, Button, Image,TouchableOpacity, Pressable} from 'react-native';
import {CircleButton} from './Button';
import {View} from 'react-native';
import {tailwind} from 'react-native-tailwindcss';
import {Context} from '../providers/GlobalProvider';

export default function EditMenu({
  onAdd,
  onCopy,
  onDelete,
  onBack,
  onAhead,
  onStick,
  onCut,
  onEdit,
}) {
  const {dispatch} = React.useContext(Context);

  const [layout, setLayout] = React.useState({});

  // 声明按钮背景图片
  const [addImg, setAddImg] = useState() // 添加
  const [addDisImg, setAddDisImg] = useState() // 添加
  const [editImg, setEditImg] = useState() //编辑 - 允许点击
  const [editDisImg, setEditDisImg] = useState() // 编辑 - 禁用
  const [deleteImg, setDeleteImg] = useState() // 删除 - 允许点击
  const [deleteDisImg, setdeleteDisImg] = useState() // 删除 - 禁用
  const [goBackImg, setGoBackImg] = useState() //页面回退 - 允许点击
  const [goBackDisImg, setGoBackDisImg] = useState() //页面回退 - 禁用
  const [goAheadImg, setGoAheadImg] = useState() //页面前进 - 允许点击
  const [goAheadDisImg, setGoAheadDisImg] = useState() //页面前进 - 禁用


  useEffect(() => {
    // console.log('223344');
    // 设置按钮的初始状态
    let addImg = require('../iconImg/add.png')
    setAddImg(addImg)
    let addDisImg = require('../iconImg/addDis.png')
    setAddDisImg(addDisImg)
    let editImg = require('../iconImg/edit.png')
    setEditImg(editImg)
    let editDisImg = require('../iconImg/editDis.png')
    setEditDisImg(editDisImg)
    let deleteImg = require('../iconImg/delete.png')
    setDeleteImg(deleteImg)
    let deleteDisImg = require('../iconImg/deleteDis.png')
    setdeleteDisImg(deleteDisImg)
    let goBackImg = require('../iconImg/goBack.png')
    setGoBackImg(goBackImg)
    let goBackDisImg = require('../iconImg/goBackDis.png')
    setGoBackDisImg(goBackDisImg)
    let goAheadImg = require('../iconImg/goAhead.png')
    setGoAheadImg(goAheadImg)
    let goAheadDisImg = require('../iconImg/goAheadDis.png')
    setGoAheadDisImg(goAheadDisImg)
  }, [])

           

  // downImg = require('../iconImg/allCheckDis.png')
  // setDownImg(downImg)
  const handleLock = () => {
    dispatch({type: 'lockXY', payload: layout});
    dispatch({type: 'isLock', payload: true});
  };

  const handleLayout = (x, y, width, height, pageX, pageY) => {
    setLayout({x: pageX, y: pageY});
  };

  // =============以下 按钮的按下与松开状态============================================
  // 添加
  const addPulldown = () => {
    // console.log('按下');
    let addImg = require('../iconImg/addPull.png')
    setAddImg(addImg)
    // console.log(downImg);
  }
  const addPullup = () => {
    // console.log('松开');
    let addImg = require('../iconImg/add.png')
    setAddImg(addImg)
  }
  // 修改
  const editPulldown = () => {
    let editImg = require('../iconImg/editPull.png')
    setEditImg(editImg)
  }
  const editPullup = () => {
    let editImg = require('../iconImg/edit.png')
    setEditImg(editImg)
  }
  // 删除
  const deletePulldown = () => {
    let deleteImg = require('../iconImg/deletePull.png')
    setDeleteImg(deleteImg)
  }
  const deletePullup = () => {
    let deleteImg = require('../iconImg/delete.png')
    setDeleteImg(deleteImg)
  }
  // 回退
  const goBackPulldown = () => {
    let goBackImg = require('../iconImg/goBackPull.png')
    setGoBackImg(goBackImg)
  }
  const goBackPullup = () => {
    let goBackImg = require('../iconImg/goBack.png')
    setGoBackImg(goBackImg)
  }
  // 前进
  const goAheadPulldown = () => {
    let goAheadImg = require('../iconImg/goAheadPull.png')
    setGoAheadImg(goAheadImg)
  }
  const goAheadPullup = () => {
    let goAheadImg = require('../iconImg/goAhead.png')
    setGoAheadImg(goAheadImg)
  }

  // =============以上 按钮的按下与松开状态============================================

  return (
    <View>
      {/* <CircleButton name="lock" onLayout={handleLayout} onPress={handleLock} /> */}
      {/* <View>
        <TouchableOpacity onLayout={handleLayout} onPress={handleLock} name="lock">
          <Image style={
            { height: 45, width: 45, alignItems: 'center' }}
            source={require('../iconImg/allCheck.png')}
          />
        </TouchableOpacity>
      </View> */}
      
      {/* <CircleButton name="lock" onLayout={handleLayout} onPress={handleLock} /> */}
      {/* 左侧按钮距离顶部的间距 */}
      {/* <View style={tailwind.mY12} /> */}
      <View style={tailwind.mY1} />
      {/* 添加 */}
      <TouchableOpacity>
        {/* 这里是控制按钮的显示效果 */}
        <Pressable onPressIn={addPulldown} onPressOut={addPullup} onPress={onAdd} disabled={!onAdd}>
          <Image style={
            { height: 45, width: 45, alignItems: 'center' }}
            source={onAdd ? addImg : addDisImg}
          />
        </Pressable>
      </TouchableOpacity>
      {/* <CircleButton name="plus-box" onPress={onAdd} disabled={!onAdd} /> */}
      {/* <View style={tailwind.mY1} /> */}
      {/* 复制 */}
      {/* <CircleButton name="content-copy" onPress={onCopy} disabled={!onCopy} /> */}
      {/* <View style={tailwind.mY1} /> */}
      {/* 剪切 */}
      {/* <CircleButton name="content-cut" onPress={onCut} disabled={!onCut} /> */}
      {/* <View style={tailwind.mY1} /> */}
      {/* <CircleButton name="note-multiple" onPress={onStick} disabled={!onStick} /> */}
      <View style={tailwind.mY1} />
      {/* 编辑 */}
      {/* <CircleButton name="pencil" onPress={onEdit} disabled={!onEdit} /> */}
      <View>
        <Pressable onPressIn={editPulldown} onPressOut={editPullup} onPress={onEdit} disabled={!onEdit}>
          <Image style={
            { height: 45, width: 45, alignItems: 'center' }}
            source={onEdit ? editImg : editDisImg}
          />
        </Pressable>
      </View>


      <View style={tailwind.mY1} />
      {/* 删除 */}
      {/* <CircleButton name="delete" onPress={onDelete} disabled={!onDelete} /> */}
      <View>
        <Pressable onPressIn={deletePulldown} onPressOut={deletePullup} onPress={onDelete} disabled={!onDelete}>
          <Image style={
            { height: 45, width: 45, alignItems: 'center' }}
            source={onDelete ? deleteImg : deleteDisImg}
          />
        </Pressable>
      </View>
      <View style={tailwind.mY1} />
      {/* 回退 */}
      <View>
        <Pressable onPressIn={goBackPulldown} onPressOut={goBackPullup} onPress={onBack} disabled={!onBack}>
          <Image style={
            { height: 45, width: 45, alignItems: 'center' }}
            source={onBack ? goBackImg : goBackDisImg}
          />
        </Pressable>
      </View>
      {/* 前进 */}
      <View style={tailwind.mY1} />
      <View>
        <Pressable onPressIn={goAheadPulldown} onPressOut={goAheadPullup} onPress={onAhead} disabled={!onAhead}>
          <Image style={
            { height: 45, width: 45, alignItems: 'center' }}
            source={onAhead ? goAheadImg : goAheadDisImg}
          />
        </Pressable>
      </View>
      {/* <View style={tailwind.mY1} />
      <CircleButton name="rotate-left" />
      <View style={tailwind.mY1} />
      <CircleButton name="rotate-right" /> */}
    </View>
  );
}
