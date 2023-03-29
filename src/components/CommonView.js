import React,{useState,useEffect} from 'react';
import {tailwind} from 'react-native-tailwindcss';
import {View, TouchableWithoutFeedback, Keyboard, Image} from 'react-native';
import {CircleButton} from './Button';
import Headerbar from './Headerbar';
import EditMenu from './EditMenu';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

export function Box({pid, children, headerItems}) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[tailwind.flex1]}>
        <View style={[tailwind.mX19,{position:'absolute',top:13,left:70}]}>
          <Headerbar items={headerItems || []} pid={pid || ''} />
        </View>
        <View style={[tailwind.mY6]}></View>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}

export function Content({
  children,
  onAdd,
  onEdit,
  onCopy,
  onCut,
  onDelete,
  onStick,
  hideMenu,
  operations,
  operationsComponents,
}) {

  const [singleUploadImg, setSingleUploadImg] = useState() // 单个上传
  const [allUploadImg, setAllUploadImg] = useState() // 全部上传
  const [lookImg, setLookImg] = useState() // 查看
  const [lookDisImg, setLookDisImg] = useState() //查看 禁用
  const [diseaseListImg, setDiseaseListImg] = useState() //病害列表
  const [diseaseListDisImg, setDiseaseListDisImg] = useState() //病害列表 禁用
  const [maintainPlanImg, setMaintainPlanImg] = useState() //养护计划
  const [maintainPlanDisImg, setMaintainPlanDisImg] = useState() //养护计划 禁用
  const [singleGoodImg, setSingleGoodImg] = useState() //单条确认
  const [singleGoodDisImg, setSingleGoodDisImg] = useState() //单条确认 禁用
  const [allGoodImg, setAllGoodImg] = useState() //全部确认
  const [allGoodDisImg, setAllGoodDisImg] = useState() //全部确认 禁用

  useEffect(() => {
    // 设置按钮的初始状态
    // console.log('operations', operations);
    let singleUploadImg = require('../iconImg/singleUpload.png')
    setSingleUploadImg(singleUploadImg)
    let allUploadImg = require('../iconImg/allUpload.png')
    setAllUploadImg(allUploadImg)
    let lookImg = require('../iconImg/look.png')
    setLookImg(lookImg)
    let lookDisImg = require('../iconImg/lookDis.png')
    setLookDisImg(lookDisImg)
    let diseaseListImg = require('../iconImg/disList.png')
    setDiseaseListImg(diseaseListImg)
    let diseaseListDisImg = require('../iconImg/disListDis.png')
    setDiseaseListDisImg(diseaseListDisImg)
    let maintainPlanImg = require('../iconImg/maintainPlan.png')
    setMaintainPlanImg(maintainPlanImg)
    let maintainPlanDisImg = require('../iconImg/maintainPlanDis.png')
    setMaintainPlanDisImg(maintainPlanDisImg)
    let singleGoodImg = require('../iconImg/singleGood.png')
    setSingleGoodImg(singleGoodImg)
    let singleGoodDisImg = require('../iconImg/singleGoodDis.png')
    setSingleGoodDisImg(singleGoodDisImg)
    let allGoodImg = require('../iconImg/allGood.png')
    setAllGoodImg(allGoodImg)
    let allGoodDisImg = require('../iconImg/allGoodDis.png')
    setAllGoodDisImg(allGoodDisImg)
  }, [])

  // 图标按下 变化
  const imgPulldown = (res) => {
    if (res == 'singleUpload') {
      let singleUploadImg = require('../iconImg/singleUploadPull.png')
      setSingleUploadImg(singleUploadImg)
    } else if (res == 'allUpload') {
      let allUploadImg = require('../iconImg/allUploadPull.png')
      setAllUploadImg(allUploadImg)
    } else if (res == 'look') {
      let lookImg = require('../iconImg/lookPull.png')
      setLookImg(lookImg)
    } else if (res == 'disList') {
      let diseaseListImg = require('../iconImg/disListPull.png')
      setDiseaseListImg(diseaseListImg)
    } else if (res == 'maintainPlan') {
      let maintainPlanImg = require('../iconImg/maintainPlanPull.png')
      setMaintainPlanImg(maintainPlanImg)
    }
  }
  // 图标松开 恢复
  const imgPullup = (res) => {
    if (res == 'singleUpload') {
      let singleUploadImg = require('../iconImg/singleUpload.png')
      setSingleUploadImg(singleUploadImg)
    } else if (res == 'allUpload') {
      let allUploadImg = require('../iconImg/allUpload.png')
      setAllUploadImg(allUploadImg)
    } else if (res == 'look') {
      let lookImg = require('../iconImg/look.png')
      setLookImg(lookImg)
    } else if (res == 'disList') {
      let diseaseListImg = require('../iconImg/disList.png')
      setDiseaseListImg(diseaseListImg)
    } else if (res == 'maintainPlan') {
      let maintainPlanImg = require('../iconImg/maintainPlan.png')
      setMaintainPlanImg(maintainPlanImg)
    }
  }

  return (
    <View
      style={[tailwind.flex1, tailwind.flexRow, tailwind.pX4, tailwind.mB3]}>
      {!hideMenu ? (
        <View style={[tailwind.mR3,tailwind.pX1]}>
          <EditMenu
            onAdd={onAdd}
            onEdit={onEdit}
            onCopy={onCopy}
            onCut={onCut}
            onDelete={onDelete}
            onStick={onStick}
          />
        </View>
      ) : (
        <></>
      )}
      <View style={tailwind.flex1}>{children}</View>
      {!hideMenu ? (
        <View style={tailwind.mL3}>
          {/* <CircleButton name="help" /> */}
          {/* <View style={tailwind.mY10} /> */}
          {operationsComponents ? operationsComponents : <></>}
          {operations ? (
            operations.map((operation, index) => (
              <React.Fragment key={index}>
                <View style={tailwind.mY1} />
                {/* <CircleButton {...operation} /> */}
                <View>
                    <Pressable {...operation} onPressIn={() => imgPulldown(operation.img)} onPressOut={() => imgPullup(operation.img)}>
                      <Image style={
                      { height: 45, width: 45, alignItems: 'center' }}
                      source={
                        operation.img == 'singleUpload' ? singleUploadImg : 
                        (operation.img == 'allUpload' ? allUploadImg :
                        (operation.img == 'look' && operation.disabled ? lookDisImg :
                        (operation.img == 'disList' && operation.disabled ? diseaseListDisImg :
                        (operation.img == 'maintainPlan' && operation.disabled ? maintainPlanDisImg: 
                        (operation.img == 'look' && !operation.disabled ? lookImg :
                        (operation.img == 'disList' && !operation.disabled ? diseaseListImg :
                        (operation.img == 'maintainPlan' && !operation.disabled ? maintainPlanImg :
                        (operation.img == 'singleGood' ? singleGoodImg :
                        (operation.img == 'allGood' ? allGoodImg : {})))))))))
                      }
                      />
                    </Pressable>
                  </View>
              </React.Fragment>
            ))
          ) : (
            <></>
          )}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}

export default function CommonView({
  pid,
  children,
  headerItems,
  tabBar,
  onAdd,
  onEdit,
  onCopy,
  onCut,
  onDelete,
  onStick,
  operations,
}) {

  const [doneImg, setDoneImg] = useState() // 完成
  const [doneDisImg, setDoneDisImg] = useState() // 完成 - 禁用
  const [inductImg, setInductImg] = useState() // 导入
  const [cloneImg, setCloneImg] = useState() // 克隆
  const [cloneDisImg, setCloneDisImg] = useState() // 克隆 - 禁用

  useEffect(() => {
    // console.log('223344');
    // 设置按钮的初始状态
    // console.log('operations', operations);
    let doneImg = require('../iconImg/done.png')
    setDoneImg(doneImg)
    let doneDisImg = require('../iconImg/doneDis.png')
    setDoneDisImg(doneDisImg)
    let inductImg = require('../iconImg/induct.png')
    setInductImg(inductImg)
    let cloneImg = require('../iconImg/clone.png')
    setCloneImg(cloneImg)
    let cloneDisImg = require('../iconImg/cloneDis.png')
    setCloneDisImg(cloneDisImg)
  }, [])




  // 图标 按下 与 松开 状态的背景图片
  const donePulldown = (res) => {
    // console.log('按下: ',res);
    if (res == 'check') {
      let doneImg = require('../iconImg/donePull.png')
      setDoneImg(doneImg)
    } else if (res == 'induct') {
      // 导入桥梁
      let inductImg = require('../iconImg/inductPull.png')
      setInductImg(inductImg)
    } else if (res == 'clone') {
      // 克隆桥梁
      let cloneImg = require('../iconImg/clonePull.png')
      setCloneImg(cloneImg)
    }
    
  }
  // 松开时，恢复默认状态图标
  const donePullup = (res) => {
    // console.log('松开:', res);
    if (res == 'check') {
      let doneImg = require('../iconImg/done.png')
      setDoneImg(doneImg)
    } else if (res == 'induct') {
      let inductImg = require('../iconImg/induct.png')
      setInductImg(inductImg)
    } else if (res == 'clone') {
      let cloneImg = require('../iconImg/clone.png')
      setCloneImg(cloneImg)
    }
    
  }


  return (
    // TouchableWithoutFeedback 点击空白处收起键盘
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* 占满box */}
      <View style={[tailwind.flex1]}>
        {/* 界面顶部栏 页面路径与用户名 */}
        {/* <Headerbar items={headerItems || []} pid={pid || ''} /> */}
        {/* tabBar 无意义参数 */}
        {tabBar ? tabBar : <></>}
        {/* 内部大盒子，采用row 左中右 */}
        <View
          style={[
            tailwind.flex1,
            tailwind.flexRow,
            tailwind.pX4,
            tailwind.pY3,
          ]}>
          {/* 左侧按钮 */}
          <View style={[tailwind.mR3,tailwind.pX1]}>
            <View style={tailwind.mY12} />
              {/* 左侧按钮 */}
              <EditMenu
                onAdd={onAdd}
                onEdit={onEdit}
                onCopy={onCopy}
                onCut={onCut}
                onDelete={onDelete}
                onStick={onStick}
              />
          </View>
          {/* 中部 = 顶部导航 + 内容 */}
          <View style={tailwind.flex1}>
            {/* 页面路径与用户信息 */}
            <View style={[tailwind.mX19,{width:700}]}>
              {/* 顶部导航 可以显示 1）导航按钮 2）icon图标按钮 3）对过长的标题截取 */}
              <Headerbar items={headerItems || []} pid={pid || ''} />
            </View>
            {/* 嵌入公共盒子的内容，即主要内容 */}
            {children}
          </View>
          {/* 右侧 */}
          <View style={tailwind.mL3}>
            {/* 帮助 按钮 */}
            {/* <CircleButton name="help" /> */}
            {/* 右侧图标整体距离顶部的距离 */}
            <View style={[tailwind.mY12]} />
            {/* 此处operations内容由文件Project内的CommonView传入（文件位置：src\screen\Collection\Detect\Project） */}
            {operations ? (
              operations.map((operation, index) => (
                <React.Fragment key={index}>
                  {/* 右侧各图标之间的距离 */}
                  <View style={tailwind.mY1} />
                  {/* 项目变更‘完成’按钮 */}
                  {/* <CircleButton {...operation} /> */}
                  <View>
                    <Pressable {...operation} onPressIn={() => donePulldown(operation.img)} onPressOut={() => donePullup(operation.img)}>
                      <Image style={
                      { height: 45, width: 45, alignItems: 'center' }}
                      // source={operation.disabled ? doneDisImg : doneImg}
                      source={
                        operation.disabled ? doneDisImg :
                        (operation.img == 'check' ? doneImg : //判断img传入的值,显示对应的按钮图片
                        (operation.img == 'induct' ? inductImg : //依次进行条件判断
                        (operation.img == 'clone' ? cloneImg : cloneDisImg)))
                      }
                      />
                    </Pressable>
                  </View>
                  
                </React.Fragment>
              ))
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
