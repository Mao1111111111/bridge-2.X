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
// 接口
import { getGcompanylist, getGprojectlist, getBridgelist, getStructureData } from './HistoricalAPI';
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
  },[networkStateAll,])

  const [companyList,setCompanyList] = useState([])
  // 获取用于展示的项目与桥梁列表
  const getViewList = () => {
    if(!networkStateAll.isConnected.isConnected){
      Alert.alert('获取失败，请检查设备网络状态')
      return
    }
    console.log('获取分公司列表');
    // let companyList = [
    //   {
    //     comName:'哈尔滨养护分公司甲',
    //     comId:'proId_A',
    //   },
    //   {
    //     comName:'哈尔滨养护分公司乙',
    //     comId:'proId_B',
    //   },
    //   {
    //     comName:'哈尔滨养护分公司丙',
    //     comId:'proId_C',
    //   },
    //   {
    //     comName:'哈尔滨养护分公司丁',
    //     comId:'proId_D',
    //   },
    // ]
    // setCompanyList(companyList)
    // 获取养护公司列表
    getGcompanylist().then(res=>{
      setCompanyList(res)
    }).catch(e=>{
      setCompanyList([])
    })
  }

  const Item = ({title,type,value}) => (
    <Pressable style={styles.item} onPress={()=>itemClick(type,value)}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );

  
  const itemClick = (type,value) => {
    console.log('列表点击',type,value);
    if(type == 'company'){
      // 重置项目列表
      setProList([])
      // 重置桥梁列表
      setBridgeList([])
      setItemSelectArr([])
      // 获取分公司下的项目列表
      getProList(value)
    } else if(type == 'proJect'){
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

  const [proList,setProList] = useState([])
  const getProList = (value) => {
    if(!networkStateAll.isConnected.isConnected){
      Alert.alert('获取失败，请检查设备网络状态')
      return
    }
    console.log('获取项目列表',value);

    // let proList = [
    //   {
    //     proName:'2024哈尔滨养护分公司绥满高速A',
    //     proId:'proId_A',
    //   },
    //   {
    //     proName:'2024哈尔滨养护分公司绥满高速B',
    //     proId:'proId_B',
    //   },
    //   {
    //     proName:'2024哈尔滨养护分公司绥满高速C',
    //     proId:'proId_C',
    //   },
    //   {
    //     proName:'2024哈尔滨养护分公司绥满高速D',
    //     proId:'proId_D',
    //   },
    //   {
    //     proName:'2024哈尔滨养护分公司绥满高速E',
    //     proId:'proId_E',
    //   },
    //   {
    //     proName:'2024哈尔滨养护分公司绥满高速F',
    //     proId:'proId_F',
    //   },
    // ]
    // setProList(proList)
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

    // let bridgeList = [
    //   {
    //     bridgeName:'K123456_XXXXXX大桥1',
    //     bridgeId:'bridgeId_1',
    //   },
    //   {
    //     bridgeName:'K123456_XXXXXX大桥2',
    //     bridgeId:'bridgeId_2',
    //   },
    //   {
    //     bridgeName:'K123456_XXXXXX大桥3',
    //     bridgeId:'bridgeId_3',
    //   },
    //   {
    //     bridgeName:'K123456_XXXXXX大桥4',
    //     bridgeId:'bridgeId_4',
    //   },
    //   {
    //     bridgeName:'K123456_XXXXXX大桥5',
    //     bridgeId:'bridgeId_5',
    //   },
    //   {
    //     bridgeName:'K123456_XXXXXX大桥6',
    //     bridgeId:'bridgeId_6',
    //   },
    //   {
    //     bridgeName:'K123456_XXXXXX大桥7',
    //     bridgeId:'bridgeId_7',
    //   },
    //   {
    //     bridgeName:'K123456_XXXXXX大桥8',
    //     bridgeId:'bridgeId_8',
    //   },
    //   {
    //     bridgeName:'K123456_XXXXXX大桥9',
    //     bridgeId:'bridgeId_9',
    //   },
    //   {
    //     bridgeName:'K123456_XXXXXX大桥10',
    //     bridgeId:'bridgeId_10',
    //   },
    // ]
    // setBridgeList(bridgeList)
    // 获取桥梁列表
    getBridgelist({gprojectid:value.gprojectid}).then(res=>{
      setBridgeList(res)
    }).catch(e=>{
      setBridgeList([])
    })
  }

  const BridgeItem = ({title,type,value}) => (
    <Pressable style={[styles.item]} onPress={()=>bridgeItemClick(type,value)}>
      <Text style={styles.title}>{title}</Text>
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
    <Pressable style={[styles.item,{width:'85%',flexDirection:'row',alignItems:'center'}]}>
      <Pressable onPress={()=>deleteItem(value)} style={{backgroundColor:'#999',width:30,height:30,alignItems:'center',justifyContent:'center'}}>
        <Text>-</Text>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
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
  const downloadConfirm = () => {
    // 设置模态框状态
    setModalState('underway')
    // 下载前确认
    setConfirmShow(true)
  }
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  }

  const downloadData = () => {
    console.log('确认下载',isEnabled);
    console.log('要下载的桥梁信息',itemSelectArr);
    // 获取当前需要下载的桥梁列表

    // 对照该桥梁是否已下载过，是则剔除

    // 依次对每个桥创建下载任务与显示下载进度

    // 完成后存入本地数据库

    // 执行本地创建对应项目、桥梁、结构、病害

  }

  return (
    <View style={tailwind.flex1}>
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
              left:70
            }
          ]
        }
      >
        <View style={tailwind.mY3} />
        <View style={{width:'100%',height:'95%',
          display:'flex',justifyContent:'center',alignItems:'center'}}>
            {
              !cloudDataList?.length ? 
              <>
              {
                companyList?.length ? 
                <>
                  <View style={{width:'100%',height:'50%',flexDirection:'row',marginBottom:10}}>
                    <View style={{width:'25%',height:'100%',borderColor:'#999',borderRightWidth:1,borderStyle:'dashed',padding: 5,}}>
                      <FlatList
                        data={companyList}
                        renderItem={({item}) => <Item title={item.gycompanyname} type={'company'} value={item} />}
                        keyExtractor={item => item.gycompanyid}
                      />
                    </View>
                    {
                      proList?.length ? 
                      <View style={{width:'40%',height:'100%',borderColor:'#999',borderRightWidth:1,borderStyle:'dashed',padding: 5,}}>
                        <FlatList
                          data={proList}
                          renderItem={({item}) => <Item title={item.gprojectname}  type={'proJect'} value={item} />}
                          keyExtractor={item => item.gprojectid}
                        />
                      </View> 
                      : 
                      <></>
                    }
                    <View style={{width:'35%',height:'100%',padding: 5,}}>
                      {
                        bridgeList?.length ? 
                        <>
                          <FlatList
                            data={bridgeList}
                            renderItem={({item}) => <BridgeItem title={item.reportname}  type={'bridge'} value={item} />}
                            keyExtractor={item => item.bridgeid}
                          />
                        </> 
                        : 
                        <></>
                      }
                    </View>
                  </View>
                  <View style={{width:'100%',height:'40%',}}>
                  {
                    itemSelectArr?.length ? 
                    <>
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
                    // onClose={() => setConfirmShow(false)}
                    notScroll={false}
                    closeHide={modalState=='underway'}
                  >
                    <View style={{ width: '100%', height: 100, justifyContent: "center", alignItems: 'center', }}>
                      {/* 下载确认 */}
                      {
                        modalState == 'default' &&
                        <>
                          <Switch
                            trackColor={{ false: "#767577", true: "#2b427d" }}
                            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                          />
                          <Text style={{ color: '#999', }}>{isEnabled ? '下载完整的桥梁结构数据与病害检测数据' : '仅下载桥梁结构数据'}</Text>
                          {
                            isEnabled && <Select
                              name="bridgeside"
                              label="选择项目"
                              labelName="label"
                              valueName="value"
                              values={locProjectList}
                              value={curLocProject}
                              onChange={el => setCurLocProject(el.value)}
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
                            <Text>3/4</Text>
                          </View>
                          <Progress
                            ProgressColor='#6BC1F3'
                            value={60}></Progress>
                        </View>
                      }
                      {/* 下载完成 */}
                      {
                        modalState == 'finish' &&<Text>数据下载成功</Text>
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
                </>
                : 
                <>
                  <Pressable onPress={getViewList}>
                    <Button>获取云端数据列表</Button>
                  </Pressable>
                </>
              }
                
              </> 
              : 
              <>
                <Text>有云端数据列表</Text>
              </>
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
    padding: 5,
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
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
  }
});
