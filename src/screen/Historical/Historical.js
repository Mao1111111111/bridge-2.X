import React,{useState,useEffect} from 'react';
import dayjs from 'dayjs';
import {tailwind} from 'react-native-tailwindcss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Pressable, Image,Dimensions,Alert,StatusBar,SafeAreaView,Switch} from 'react-native';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import {Password} from '../../components/Input';
import Headerbar from '../../components/Headerbar';
import {Context as ThemeContext} from '../../providers/ThemeProvider';
import { Context as GlobalContext } from '../../providers/GlobalProvider';
import {Context} from '../../providers/GlobalProvider';
import {confirm, alert} from '../../utils/alert';
import {syncCommonData} from '../../utils/fetch-data';
import Button from '../../components/Button';
import {logout, check, createpin} from '../../database/user';
import {allData} from '../../utils/sqlite';
import fs from '../../utils/fs';
import RNFS from 'react-native-fs';
import ExportData from '../components/ExportData';
import Select from '../../components/Select';
import * as projectTable from '../../database/project';
// 接口
import { getGcompanylist, getGprojectlist, getBridgelist, getStructureData, getDetectionData } from './HistoricalAPI';
// 进度条
import Progress from '../../components/Progress';


export default function Historical() {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const {
    state: { networkStateAll, userInfo, deviceId },
  } = React.useContext(GlobalContext);

  const [isLoading, setIsLoading] = React.useState(false);

  const [screenWidth,setScreenWidth] = React.useState() //屏幕宽度

  const [cloudDataList,setCloudDataList] = useState([])

  // 当前选择的本地项目
  const [curLocProject,setCurLocProject] = useState('1')
  // 本地项目列表
  const [locProjectList,setLocProjectList] = useState([])

  

  useEffect(() => {
    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
    console.log('设备deviceId',deviceId);
    console.log('设备是否联网',networkStateAll.isConnected.isConnected);
  },[networkStateAll])

  const [companyList,setCompanyList] = useState([])
  // 获取用于展示的项目与桥梁列表
  const getViewList = () => {
    if(!networkStateAll.isConnected.isConnected){
      Alert.alert('获取失败，请检查设备网络状态')
      return
    }
    console.log('获取分公司列表');
    // 获取养护公司列表
    getGcompanylist().then(res=>{
      setCompanyList(res)
    }).catch(e=>{
      setCompanyList([])
    })
  }

  const Item = ({title,type,value}) => (
    <Pressable style={styles.item} onPress={()=>itemClick(type,value)}>
      {
        type == 'company' ? 
        <>
          {
            title == companySel ? 
            <>
              <Text style={styles.itemTitleSel}>{title}</Text>
            </> 
            : 
            <>
              <Text style={styles.itemTitle}>{title}</Text>
            </>
          }
        </> 
        : 
        <>
          {
            title == proSel ? 
            <>
              <Text style={styles.itemTitleSel}>{title}</Text>
            </>
            :
            <>
              <Text style={styles.itemTitle}>{title}</Text>
            </>
          }
        </>
      }
      {/* <Text style={styles.itemTitle}>{title}</Text> */}
    </Pressable>
  );

  const [companySel,setCompanySel] = useState('')
  const [proSel,setProSel] = useState('')
  const itemClick = (type,value) => {
    console.log('列表点击',type,value);
    if(type == 'company'){
      setCompanySel(value?.gycompanyname)
      setProSel('')
      // 重置项目列表
      setProList([])
      // 重置桥梁列表
      setBridgeList([])
      setItemSelectArr([])
      // 获取分公司下的项目列表
      getProList(value)
    } else if(type == 'proJect'){
      setProSel(value?.gprojectname)
      // 重置桥梁列表
      setBridgeList([])
      setItemSelectArr([])
      // 获取项目下的桥梁列表
      getBridgeList(value)
    } else if(type == 'bridge'){
      // 重置桥梁列表
      setBridgeList([])
      // 获取项目下的桥梁列表
      getBridgeList(value)
    }
  }
  useEffect(()=>{
    console.log('companySel',companySel,proSel);
    
  },[companySel,proSel])

  const [proList,setProList] = useState([])
  const getProList = (value) => {
    if(!networkStateAll.isConnected.isConnected){
      Alert.alert('获取失败，请检查设备网络状态')
      return
    }
    console.log('获取项目列表',value);
    // 获取项目列表
    getGprojectlist({
      gycompanyid:value.gycompanyid,
      userid:userInfo.userid
    }).then(res=>{
      setProList(res)
    }).catch(e=>{
      setProList([])
    })
  }

  const [bridgeList, setBridgeList] = useState([])
  const getBridgeList = (value) => {
    if(!networkStateAll.isConnected.isConnected){
      Alert.alert('获取失败，请检查设备网络状态')
      return
    }
    console.log('获取桥梁列表',value);
    // 获取桥梁列表
    getBridgelist({gprojectid:value.gprojectid}).then(res=>{
      setBridgeList(res)
    }).catch(e=>{
      setBridgeList([])
    })
  }

  const BridgeItem = ({title,type,value}) => (
    <Pressable style={[styles.item]} onPress={()=>bridgeItemClick(type,value)}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
          {
            // 当前列表项是否是已被选择的桥梁
            itemSelectArr.includes(value) ?
            <Pressable style={{display:'flex',alignItems:'center',justifyContent:'center',marginRight:3,paddingTop:3,flexDirection:'row',alignItems:'center'}} onPress={()=>deleteItem(value)}>
              <Image style={
                { height: 15, width: 15, alignItems: 'center' }}
                source={require('../../iconImg/briSel.png')}
              />
              <Text style={styles.itemTitle}>{title}</Text>
            </Pressable>
            : 
            <View style={{display:'flex',alignItems:'center',justifyContent:'center',marginRight:3,paddingTop:3,flexDirection:'row',alignItems:'center'}}>
              <Image style={
                { height: 15, width: 15, alignItems: 'center' }}
                source={require('../../iconImg/briUnSel.png')}
              />
              <Text style={styles.itemTitle}>{title}</Text>
            </View>
          }
        {/* <Text style={styles.itemTitle}>{title}</Text> */}
      </View>
      
    </Pressable>
  );

  const [itemSelectArr,setItemSelectArr] = useState([])
  const bridgeItemClick = (type,value) => {
    console.log('桥梁项点击',type,value);
    let a = [...itemSelectArr]
    console.log('a.indexOf(value)',a.indexOf(value));
    // if(a.indexOf(value) == -1){
      a.push(value)
      setItemSelectArr([...new Set(a)]) //对数组进行去重，并倒序排列
      console.log('aaaa',a);
      // setItemSelectArr(a.reverse())
    // }
  }
  useEffect(()=>{
    console.log('itemSelectArr',itemSelectArr);
  },[itemSelectArr])

  const BridgeSelectItem = ({title,type,value}) => (
    <Pressable style={[styles.item,{width:'85%',flexDirection:'row',alignItems:'center'}]} onPress={()=>deleteItem(value)}>
      <View style={{display:'flex',alignItems:'center',justifyContent:'center',marginRight:3,paddingTop:3}}>
      <Image style={
        { height: 15, width: 15, alignItems: 'center' }}
        source={require('../../iconImg/briDel1.png')}
      />
      </View>
      <Text style={styles.itemTitle}>{title}</Text>
    </Pressable>
  );

  const deleteItem = (value) => {
    let arr = [...itemSelectArr]
    arr = arr.filter(item => item !== value);
    setItemSelectArr(arr)
  }
  
  // --- 下载模态框 ---
  const [confirmShow,setConfirmShow] = useState(false)
  // 模态框状态 default(默认)，underway(下载中)，finish(下载完成)
  const [modalState,setModalState] = useState('default')
  // 成功项
  const [successList,setSuccessList] = useState([])
  // 失败项
  const [errList,setErrList] = useState([])

  const downloadConfirm = async () => {
    // 获取本地项目列表
    let projectData = await projectTable.getList(userInfo.userid)
    setLocProjectList(projectData)
    // 设置模态框状态
    setModalState('default')
    // 下载前确认
    setConfirmShow(true)
  }
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  }

  const downloadData = async () => {
    console.log('确认下载',isEnabled);
    console.log('要下载的桥梁信息',itemSelectArr);
    // 获取当前需要下载的桥梁列表

    // 对照该桥梁是否已下载过，是则剔除

    // 依次对每个桥创建下载任务与显示下载进度

    // 完成后存入本地数据库

    // 执行本地创建对应项目、桥梁、结构、病害

    // 模态框状态变为 下载中
    setModalState('underway')
    // 重置成功列表
    setSuccessList([])
    // 重置失败列表
    setErrList([])
    // 判断下载的是结构数据还是检测数据
    if(isEnabled){
      // 检测数据
      let _successList = []
      let _errList = []
      // 结构数据 
      await Promise.all(
        itemSelectArr.map(async (item)=>{
          return await getDetectionData(item,userInfo,curLocProject).then(res=>{
            _successList.push(res)
            setSuccessList(_successList)
          }).catch(e=>{
            _errList.push(e)
            setErrList(_errList)
          })
        })
      )
      // 设置模态框状态为结束
      setModalState('finish')
      // 清空选择的桥梁
      setItemSelectArr([])
    }else{
      let _successList = []
      let _errList = []
      // 结构数据 
      await Promise.all(
        itemSelectArr.map(async (item)=>{
          return await getStructureData(item,userInfo).then(res=>{
            _successList.push(res)
            setSuccessList(_successList)
          }).catch(e=>{
            _errList.push(e)
            setErrList(_errList)
          })
        })
      )
      // 设置模态框状态为结束
      setModalState('finish')
      // 清空选择的桥梁
      setItemSelectArr([])
    }
  }

  // 处理下载进度
  const progressNumDeal = () => {
    let num = parseInt((successList.length + errList.length)/itemSelectArr.length* 100) 
    return num
  }

  return (
    <View style={[tailwind.flex1]}>
      <View
        style={
          [
            tailwind.mY8,
            // tailwind.mX19,
            {
              width:55,
              height:459,
              position:'absolute',
              left:10,
            }
          ]
        }
      >
        <View style={tailwind.mY8} />
      </View>
      <ImageBackground 
        style={
          [
            tailwind.mY12,
            {
              width:713,
              height:466,
              position:'absolute',
              left:70,
              padding:10
            }
          ]
        }
      >
        <View style={tailwind.mY3} />
        <View style={{width:'100%',height:'95%',
          display:'flex',justifyContent:'center',alignItems:'center',}}>
            {
              !cloudDataList?.length ? 
              <>
              {
                companyList?.length ? 
                <View style={{width:'100%',height:'100%',borderWidth:1,borderStyle:'solid',borderRadius:5,borderTopColor:"#c7c7c7",borderLeftColor:"#c7c7c7",borderBottomColor:"#e6e6e6",borderRightColor:"#e6e6e6",padding:5}}>
                  <View style={{width:'100%',height:'50%',flexDirection:'row',marginBottom:10}}>
                    <View style={{width:'25%',height:'100%',padding: 5,}}>
                      <View style={{width:'100%',height:'15%',
                        display:'flex',justifyContent:'center',alignItems:'flex-start',
                        paddingLeft:5,borderBottomWidth:1,borderStyle:'solid',borderBottomColor:"#c7c7c7",marginBottom:5}}>
                        <Text style={styles.listTitle}>分公司列表</Text>
                      </View>
                      <FlatList
                        data={companyList}
                        renderItem={({item}) => <Item title={item.gycompanyname} type={'company'} value={item} />}
                        keyExtractor={item => item.gycompanyid}
                      />
                    </View>
                    {
                      proList?.length ? 
                      <View style={{width:'40%',height:'100%',borderColor:'#c7c7c7',borderLeftWidth:1,borderStyle:'dashed',padding: 5,}}>
                        <View style={{width:'100%',height:'15%',
                          display:'flex',justifyContent:'center',alignItems:'flex-start',
                          paddingLeft:5,borderBottomWidth:1,borderStyle:'solid',borderBottomColor:"#c7c7c7",marginBottom:5}}>
                          <Text style={styles.listTitle}>项目列表</Text>
                        </View>
                        <FlatList
                          data={proList}
                          renderItem={({item}) => <Item title={item.gprojectname}  type={'proJect'} value={item} />}
                          keyExtractor={item => item.gprojectid}
                        />
                      </View> 
                      : 
                      <></>
                    }
                    {
                      bridgeList?.length ? 
                      <View style={{width:'35%',height:'100%',borderColor:'#c7c7c7',borderLeftWidth:1,borderStyle:'dashed',padding: 5,}}>
                        <View style={{width:'100%',height:'15%',
                          display:'flex',justifyContent:'center',alignItems:'flex-start',
                          paddingLeft:5,borderBottomWidth:1,borderStyle:'solid',borderBottomColor:"#c7c7c7",marginBottom:5}}>
                          <Text style={styles.listTitle}>桥梁列表</Text>
                        </View>
                        <FlatList
                          data={bridgeList}
                          renderItem={({item}) => <BridgeItem title={item.reportname}  type={'bridge'} value={item} />}
                          keyExtractor={item => item.bridgeid}
                        />
                      </View> 
                      : 
                      <></>
                    }
                  </View>
                  <View style={{width:'100%',height:'40%',}}>
                  {
                    itemSelectArr?.length ? 
                    <>
                      <View style={{width:'100%',height:'15%',
                        display:'flex',justifyContent:'center',alignItems:'flex-start',
                        paddingLeft:5,borderBottomWidth:1,borderStyle:'solid',borderBottomColor:"#c7c7c7",marginBottom:5}}>
                        <Text style={styles.listTitle}>已选桥梁列表 _ 共{itemSelectArr.length}条</Text>
                      </View>
                      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',padding:5}}>
                        <FlatList
                          data={itemSelectArr}
                          renderItem={({item}) => <BridgeSelectItem title={item.reportname}  type={'bridge'} value={item} />}
                          keyExtractor={item => item.bridgeid}
                        />
                      </View>
                      <TouchableOpacity style={styles.bottomButton} onPress={downloadConfirm}>
                        <Text style={[{color:'#fff',fontSize:14}]}>下载数据</Text>
                      </TouchableOpacity>
                    </>
                    : 
                    <></>
                  }
                  </View>
                  <Modal
                    visible={confirmShow}
                    showHead={true}
                    title={modalState=='underway'?'数据下载中':modalState=='finish'?'下载完成':'下载确认'}
                    width={300}
                    height={200}
                    keyboardVerticalOffset={-250}
                    onClose={() => setConfirmShow(false)}
                    notScroll={false}
                    closeHide={modalState=='underway'}
                  >
                    <View style={{ width: '100%', height: 100, justifyContent: "center", alignItems: 'center', }}>
                      {/* 下载确认 */}
                      {
                        modalState == 'default' &&
                        <>
                        <View style={{flexDirection:'row'}}>
                          <Switch
                            trackColor={{ false: "#767577", true: "#2b427d" }}
                            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                          />
                          <Text style={{ color: '#999', }}>{isEnabled ? '下载完整的结构数据与病害检测数据' : '仅下载结构数据'}</Text>
                        </View>
                          
                          {
                            isEnabled && <Select
                              name="bridgeside"
                              label="存入项目"
                              labelName="projectname"
                              valueName="projectid"
                              values={locProjectList}
                              value={curLocProject}
                              onChange={el => setCurLocProject(el.projectid)}
                              // ref={el => (searchRef.current.bridgeside = el)}
                              style={[tailwind.mR6, tailwind.mL6, tailwind.flex1]}
                            />
                          }
                        </>
                      }
                      {/* 下载进度 */}
                      {
                        modalState == 'underway' &&
                        <View style={{width:'80%'}}>
                          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{marginBottom:10}}>数据下载中：</Text>
                            <Text>{(successList.length+errList.length)+'/'+itemSelectArr.length}</Text>
                          </View>
                          <Progress
                            ProgressColor='#6BC1F3'
                            value={progressNumDeal() }></Progress>
                        </View>
                      }
                      {/* 下载完成 */}
                      {
                        modalState == 'finish' &&
                        <>
                          <Text>数据下载成功</Text>
                          <Text>下载成功 {successList.length} 条</Text>
                          <Text>下载失败 {errList.length} 条</Text>
                        </>
                      }
                    </View>
                    <View style={{position:'absolute',bottom:5,right:5}}>
                      {
                        modalState=='default'&&<Button style={{ backgroundColor: '#2b427d' }} onPress={downloadData}>确认下载</Button>
                      }
                      {
                        modalState=='finish'&&<Button style={{ backgroundColor: '#2b427d' }} onPress={() => setConfirmShow(false)}>确认</Button>
                      }
                    </View>
                  </Modal>
                </View>
                : 
                <>
                  <Pressable onPress={getViewList}>
                    <Button style={[{ backgroundColor: '#2b427d' }]}>获取云端数据列表</Button>
                  </Pressable>
                </>
              }
                
              </> 
              : 
              <></>
            }
        </View>
      </ImageBackground>
      <View
        style={
          [
            tailwind.mY2,
            // tailwind.mX19,
            {
              width:55,
              height:459,
              position:'absolute',
              right:10,
              // backgroundColor:'#000'
            }
          ]
        }
      >
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...tailwind.flex1,
    ...tailwind.m4,
    ...tailwind.p4,
    ...tailwind.rounded,
    ...tailwind.shadow2xl,
    ...tailwind.flexRow,
  },
  modelBody: {
    ...tailwind.pX4,
    ...tailwind.pB4,
    ...tailwind.w64,
    ...tailwind.selfCenter,
    ...tailwind.rounded,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor:'red',
    width:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'flex-start'
  },
  item: {
    backgroundColor: '#fff',
    padding: 4,
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  itemTitle: {
    fontSize: 12,
  },
  itemTitleSel: {
    fontSize: 12,
    color:'#2b427d',
    fontWeight:'700',
  },
  bottomButton: {
    backgroundColor:'#2b427d',
    height:65,
    width:65,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
    ...tailwind.rounded,
    position:'absolute',
    right:20,
    bottom:0
  },
  switch: {
    marginVertical: 10,
  },
  confir: {
    alignItems:'flex-start',
    justifyContent: "flex-end",
    width:'100%',
    height:'10%',
  },
  listTitle:{
    fontSize:13,
    color:'#2b427d',
    fontWeight:'900',
  }
});
