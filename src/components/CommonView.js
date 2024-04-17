import React,{useState,useEffect} from 'react';
import {tailwind} from 'react-native-tailwindcss';
import {View, TouchableWithoutFeedback, Keyboard, Image,Dimensions} from 'react-native';
import {CircleButton} from './Button';
import Headerbar from './Headerbar';
import EditMenu from './EditMenu';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

// 盒子
export function Box({navigation,route,pid, children, headerItems,project,projectList,bridge,labelname,membername}) {
  useEffect(() => {
    // console.log('box route',projectList);
    // console.log('Box headerItems',headerItems,labelname);
  },[])
  return (
    // 点击空白处，收起键盘
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[tailwind.flex1]}>
        <View style={[tailwind.mX19,{position:'absolute',top:12,left:73}]}>
          {/* 顶部导航 */}
          <Headerbar navigation={navigation} route={route} items={headerItems || []} pid={pid || ''} projectList={projectList} project={project} bridge={bridge} labelname={labelname || ''} membername={membername || ''} />
        </View>
        <View style={[tailwind.mY8]}></View>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}

// 用于影音
export function Content({
  children,
  onAdd,
  onEdit,
  onCopy,
  onCut,
  onDelete,
  onBack,
  onAhead,
  onStick,
  hideMenu,
  operations,
  operationsComponents,
}) {

  const [singleUploadImg, setSingleUploadImg] = useState() // 单个上传
  const [allUploadImg, setAllUploadImg] = useState() // 全部上传
  const [lookImg, setLookImg] = useState() // 查看
  const [lookDisImg, setLookDisImg] = useState() //查看 禁用
  const [bridgeInfoImg, setBridgeInfoImg] = useState() // 桥梁信息
  const [bridgeInfoDisImg, setBridgeInfoDisImg] = useState() // 桥梁信息 禁用
  const [diseaseListImg, setDiseaseListImg] = useState() //病害列表
  const [diseaseListDisImg, setDiseaseListDisImg] = useState() //病害列表 禁用
  const [maintainPlanImg, setMaintainPlanImg] = useState() //养护计划
  const [maintainPlanDisImg, setMaintainPlanDisImg] = useState() //养护计划 禁用
  const [singleGoodImg, setSingleGoodImg] = useState() //单条确认
  const [singleGoodDisImg, setSingleGoodDisImg] = useState() //单条确认 禁用
  const [allGoodImg, setAllGoodImg] = useState() //全部确认
  const [allGoodDisImg, setAllGoodDisImg] = useState() //全部确认 禁用
  const [exportImg, setExportImg] = useState() //保存数据

  const [screenWidth,setScreenWidth] = useState() //屏幕宽度

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
    let bridgeInfoImg = require('../iconImg/bridgeInfo.png')
    setBridgeInfoImg(bridgeInfoImg)
    let bridgeInfoDisImg = require('../iconImg/bridgeInfo.png')
    setBridgeInfoImg(bridgeInfoDisImg)
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
    let exportImg = require('../iconImg/export.png')
    setExportImg(exportImg)

    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
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
    } else if (res == 'bridgeInfo') {
      let bridgeInfoImg = require('../iconImg/bridgeInfoPull.png')
      setBridgeInfoImg(bridgeInfoImg)
    } else if (res == 'disList') {
      let diseaseListImg = require('../iconImg/disListPull.png')
      setDiseaseListImg(diseaseListImg)
    } else if (res == 'maintainPlan') {
      let maintainPlanImg = require('../iconImg/maintainPlanPull.png')
      setMaintainPlanImg(maintainPlanImg)
    } else if (res == 'export') {
      let exportImg = require('../iconImg/exportPull.png')
      setExportImg(exportImg)
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
    } else if (res == 'bridgeInfo') {
      let bridgeInfoImg = require('../iconImg/bridgeInfo.png')
      setBridgeInfoImg(bridgeInfoImg)
    } else if (res == 'disList') {
      let diseaseListImg = require('../iconImg/disList.png')
      setDiseaseListImg(diseaseListImg)
    } else if (res == 'maintainPlan') {
      let maintainPlanImg = require('../iconImg/maintainPlan.png')
      setMaintainPlanImg(maintainPlanImg)
    } else if (res == 'export') {
      let exportImg = require('../iconImg/export.png')
      setExportImg(exportImg)
    }
  }

  return (
    <View
      style={[tailwind.flex1, tailwind.flexRow, tailwind.pX4, tailwind.mB3]}>
      {/* 左侧菜单 */}
      {!hideMenu ? (
        <View style={[tailwind.mR3,tailwind.pX1]}>
          <EditMenu
            onAdd={onAdd}
            onEdit={onEdit}
            onCopy={onCopy}
            onCut={onCut}
            onDelete={onDelete}
            onBack={onBack}
            onAhead={onAhead}
            onStick={onStick}
          />
        </View>
      ) : (
        <></>
      )}
      {/* 内容 */}
      <View style={tailwind.flex1}>{children}</View>
      {/* 右侧菜单 */}
      {!hideMenu ? (
        <View style={tailwind.mL3}>
          {/* <CircleButton name="help" /> */}
          {/* <View style={tailwind.mY10} /> */}
          {/* 父组件传入的组件 */}
          {operationsComponents ? operationsComponents : <></>}
          {/* 操作列表 */}
          {operations ? (
            operations.map((operation, index) => (
              <React.Fragment key={index}>
                <View style={tailwind.mY1} />
                {/* <CircleButton {...operation} { height: 45, width: 45, alignItems: 'center' }/> */}
                <View>
                    {/* Pressable 按钮点击效果 */}
                    <Pressable {...operation} onPressIn={() => imgPulldown(operation.img)} onPressOut={() => imgPullup(operation.img)}>
                      <Image style={
                        screenWidth > 830 ? [{ height: 60, width: 60,left: 15, alignItems: 'center' }] :
                        [{ height: 35, width: 35, alignItems: 'center',left:8 }]
                        // screenWidth > 830 && operation.img !== 'look' ? [{ height: 45, width: 45, left:15, alignItems: 'center' }] :
                        // screenWidth > 830 && operation.img == 'look' ? [{height: 60, width: 60, left:15, alignItems: 'center'}] :
                        // [{ height: 35, width: 35, alignItems: 'center',left:8 }]
                      }
                      source={
                        operation.img == 'singleUpload' ? singleUploadImg : 
                        (operation.img == 'allUpload' ? allUploadImg :
                        (operation.img == 'look' && operation.disabled ? lookDisImg :
                        (operation.img == 'disList' && operation.disabled ? diseaseListDisImg :
                        (operation.img == 'maintainPlan' && operation.disabled ? maintainPlanDisImg: 
                        (operation.img == 'look' && !operation.disabled ? lookImg :
                        (operation.img == 'disList' && !operation.disabled ? diseaseListImg :
                        (operation.img == 'export' ? exportImg :
                        (operation.img == 'bridgeInfo' ? bridgeInfoImg :
                        (operation.img == 'singleGood' ? singleGoodImg :
                        (operation.img == 'allGood' ? allGoodImg : {}))))))))))
                      }
                      />
                    </Pressable>
                  </View>
                  <View style={tailwind.mY6} />
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
  proNameList,
  bridgeList,
  navigation,
  list,
  tabBar,
  onAdd,
  onEdit,
  onCopy,
  onCut,
  onDelete,
  onBack,
  onAhead,
  onStick,
  operations,
  projectList
}) {

  const [doneImg, setDoneImg] = useState() // 完成
  const [doneDisImg, setDoneDisImg] = useState() // 完成 - 禁用
  const [inductImg, setInductImg] = useState() // 导入
  const [cloneImg, setCloneImg] = useState() // 克隆
  const [cloneDisImg, setCloneDisImg] = useState() // 克隆 - 禁用
  const [cooperateImg, setCooperateImg] = useState() //协同检测
  const [cooperateDisImg, setCooperateDisImg] = useState() //协同检测

  const [screenWidth,setScreenWidth] = useState() //屏幕宽度

  useEffect(() => {
    // console.log('2233445',projectList);
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
    let cooperateImg = require('../iconImg/cooperate.png')
    setCooperateImg(cooperateImg)
    let cooperateDisImg = require('../iconImg/cooperateDis.png')
    setCooperateDisImg(cooperateDisImg)
    // console.log('当前屏幕宽度',windowWidth);
    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
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
    } else if (res == 'cooperate') {
      // 协同检测
      let cooperateImg = require('../iconImg/cooperatePull.png')
      setCooperateImg(cooperateImg)
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
    } else if (res == 'cooperate') {
      let cooperateImg = require('../iconImg/cooperate.png')
      setCooperateImg(cooperateImg)
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
                onBack={onBack}
                onAhead={onAhead}
                onStick={onStick}
              />
          </View>
          {/* 中部 = 顶部导航 + 内容 */}
          <View style={tailwind.flex1}>
            {/* 页面路径与用户信息 */}
            {/* <View style={[tailwind.mX19,{width:700}]}> */}
              {/* 顶部导航 可以显示 1）导航按钮 2）icon图标按钮 3）对过长的标题截取 */}
              <Headerbar
                items={headerItems || []}
                pid={pid || ''}
                proNameList={proNameList || [] }
                bridgeList={bridgeList || []}
                navigation={navigation}
                list={list}
                projectList={projectList}
              />
            {/* </View> */}
            {/* 嵌入公共盒子的内容，即主要内容 */}
            {children}
          </View>
          {/* 右侧 */}
          {/* <View style={tailwind.mL3}> */}
          {/* <View style={[tailwind.mL3,{left:10}]}> */}
          <View style={
            screenWidth > 830 ? [tailwind.mL3] :
            [tailwind.mL3,{left:8}]
          }>
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
                  {/* 项目变更‘完成’按钮 { height: 45, width: 45, alignItems: 'center' }*/}
                  {/* <CircleButton {...operation} /> */}
                  <View>
                    <Pressable {...operation} onPressIn={() => donePulldown(operation.img)} onPressOut={() => donePullup(operation.img)}>
                      <Image style={
                      screenWidth > 830 ? [{ height: 60, width: 60,left: 15, alignItems: 'center' }] :
                      { height: 35, width: 35, alignItems: 'center'}
                    }
                      // source={operation.disabled ? doneDisImg : doneImg}
                      source={
                        operation.disabled ? doneDisImg :
                        (operation.img == 'check' ? doneImg : //判断img传入的值,显示对应的按钮图片
                        (operation.img == 'induct' ? inductImg : //依次进行条件判断
                        (operation.img == 'clone' ? cloneImg : 
                        (operation.img == 'cooperate' ? cooperateImg : 
                        (operation.img == 'cooperateDis' ? cooperateDisImg : '')))))
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
