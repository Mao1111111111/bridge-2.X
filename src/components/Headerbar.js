/* 
  顶部导航
 */
import React from 'react';
import {tailwind} from 'react-native-tailwindcss';
import {View, Text, StyleSheet, TouchableOpacity, Image,Pressable, ImageBackground,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Context} from '../providers/ThemeProvider';
import {Context as GlobalContext} from '../providers/GlobalProvider';
import Pid from './Pid';
import ModalDropdown from 'react-native-modal-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Headerbar({route,items, pid, proNameList, bridgeList,
  navigation,list,project,projectList,bridge, labelname, membername}) {
  const {
    state: {theme},
  } = React.useContext(Context);

  const {
    state: {userInfo},
  } = React.useContext(GlobalContext);

  // 对导航的显示内容进行处理
  const getText = item => {
    // console.log('getText item',pid,project,bridge, labelname, membername,route);
    return item.isIcon ? (
      // 如果是 icon图标，显示icon
      <Icon style={[{color:'#2b427d'}]} name={item.name} size={20} /> //首页home图标
    ) : (
      // 如果不是，显示文字
      // 如果文字长度大于12 那么多余部分显示...
      <Text
        style={[
          tailwind.textSm,
          tailwind.fontBold,
          // theme.primaryTextStyle
          // 页面路径文字颜色
          {color: '#2b427d'},
          ]}>
        {item.name.slice(0, 12)}
        {item.name.length > 12 ? '...' : ''}
      </Text>
    );
  };

  const [proList, setProList] = React.useState([])
  const [briList, setBriList] = React.useState([])
  // 桥梁所有数据
  const [brigeAllValue, setBrigeAllValue] = React.useState([])

  // 桥幅属性
  const [bridgeSideText, setBridgeSideText] = React.useState()

  const [screenWidth,setScreenWidth] = React.useState(0) //屏幕宽度
  const [screenHeight,setScreenHeight] = React.useState(0) //屏幕高度

  React.useEffect(()=> {
    // console.log('Headerbar',bridge);
    // console.log('pid6---',project,projectList);
    // console.log('items.name',items[0].name);
    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
    const windowHeight = Dimensions.get('window').height;
    setScreenHeight(windowHeight)
    getProStorage()
    getBriStorage()

    if (bridge) {
      if (bridge.bridgeside == 'side111') {
        let bridgeSideText = '（单幅）'
        setBridgeSideText(bridgeSideText)
      } else if (bridge.bridgeside == 'side100') {
        let bridgeSideText = '（左幅）'
        setBridgeSideText(bridgeSideText)
      } else if (bridge.bridgeside == 'side001') {
        let bridgeSideText = '（右幅）'
        setBridgeSideText(bridgeSideText)
      } else if (bridge.bridgeside == 'side010') {
        let bridgeSideText = '（中幅）'
        setBridgeSideText(bridgeSideText)
      } else if (bridge.bridgeside == 'side200') {
        let bridgeSideText = '（上行）'
        setBridgeSideText(bridgeSideText)
      } else if (bridge.bridgeside == 'side002') {
        let bridgeSideText = '（下行）'
        setBridgeSideText(bridgeSideText)
      } else if (bridge.bridgeside == 'side999') {
        let bridgeSideText = '（其他）'
        setBridgeSideText(bridgeSideText)
      }
    }
  },[bridge])

  // 读取存储的项目数据
  const getProStorage = async(item) => {
    try {
      // 将读取到的value JSON字符 转为 JSON对象
      const value = JSON.parse(await AsyncStorage.getItem('proList'))
      // console.log('读取的value2',value);
        let proList = []
        // console.log('111112',value.length);
        value.forEach((item) => {
          // console.log(item.proName);
          proList.push(item.proName)
        })
        setProList(proList)
        // console.log('11111');
    } catch (error) {
      console.log("error",error);
    }
  }

  // 读取存储的桥梁数据
  const getBriStorage = async(item) => {
    try {
      // 将读取到的value JSON字符 转为 JSON对象
      const value = JSON.parse(await AsyncStorage.getItem('briList'))
      setBrigeAllValue(value)
      // console.log('读取的value2',value);
      let briList = []
      // console.log('111112',value.length);
      value.forEach((item) => {
        // console.log(item.bridgeName);
        briList.push(item.bridgeName)
      })
      setBriList(briList)
      // console.log('11111');
    } catch (error) {
      console.log(error);
    }
  }

  // 回退
  const goBack = () => {
    console.log('点击了goBack');
    try {
      navigation.goBack()
    } catch (e) {
      console.log('goBack err', e);
    }
  }

  const topage = (e) => {
    try {
      console.log('eee',e);
      if (e == '项目') {
        // console.log('123');
        navigation.navigate('Collection/Detect/Project')
      } else if (e == '桥梁' && pid == 'P1301') {
        navigation.goBack()
      } else if (e == '桥梁' && pid !== 'P1301') {
        navigation.navigate('Collection/Detect/ProjectDetail', {
          project: projectList,
        })
      }
    } catch (error) {
      console.log('Headerbar topage',error);
    }
    
  }


  // 分类选择 - 项目
  _selectProType = (indexA, value) => {
    console.log('---', indexA, value)
    // console.log('listlist的内容',list);
    let resetItem = ''
    list.forEach(item => {
      if (value == item.projectname) {
        resetItem = item
      }
    });
    navigation.navigate('Collection/Detect/ProjectDetail', {
      project: resetItem,
    })
  }

  // 分类选择 - 桥梁
  _selectBriType = (indexB, value) => {
    console.log('---', indexB, value)
    // console.log('brigeAllValue1',brigeAllValue);
    // console.log('brigeAllValue2',brigeAllValue[0].list);
    brigeAllValue[0].list.forEach((item) => {
      if (JSON.stringify(value) == JSON.stringify(item.bridgename)) {
        // console.log('0000.0000',brigeAllValue[0].project);
        navigation.navigate('Collection/Detect/BridgeTest', {
          project: brigeAllValue[0].project,
          bridge: item,
        })
      }
    })
  }


  // 下拉列表分隔符
  _separator = () => {
    return(
      <Text style={{height:0}}></Text>
    )
  }
  // 下拉框位置
  _adjustType = () => {
    return({
      top: 25,
      left: 290
    })
  }

  return (
    <View style={[
      // styles.box,
      // theme.primaryBgStyle,
      {
        position:'relative',
        bottom:5,
        // backgroundColor: '#fff',
        height:'15%',
        right:'8.5%',
        // width:screenWidth*0.9
      }
      ]}>
      {pid && pid !== 'P1001' && pid !== 'P1101' ? (
        <View style={[styles.pidSmall]}>
          <Pid pid={pid} size={'medium'} />
        </View>
      ) : (
        <></>
      )}

      {pid && pid == 'P1001' || pid == 'P1101' ? (
        <View style={[styles.pidSmall]}>
          <Pid pid={pid} size={'medium'} />
        </View>
      ) : (
        <></>
      )}
      {/* 右侧导航 */}
      {items.map((item, index) => (
        // React.Fragment 相当于 <></>
        <React.Fragment key={index}>
          {index !== items.length - 1 ? (
            // 如果不是最后一个，加上
            // <React.Fragment>
            //   <TouchableOpacity onPress={item.onPress}>
            //     {/* getText 对显示内容进行处理：1）icon 2）超长截取 */}
            //     {getText(item)}
            //   </TouchableOpacity>
            //   <Text style={[tailwind.textSm, tailwind.mX1]}>\</Text>
            // </React.Fragment>
            pid == 'P1001' || pid == 'P1101' ? (
              <React.Fragment>
                <TouchableOpacity onPress={item.onPress}>
                  {/* getText 对显示内容进行处理：1）icon 2）超长截取 */}
                  {getText(item)}
                </TouchableOpacity>
                <Text style={[tailwind.textSm, tailwind.mX1]}>\</Text>
              </React.Fragment>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </React.Fragment>
      ))}
      {items.map((item, index) =>(
        <React.Fragment key={index}>
          {/* 第一行 */}
          <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
            {/* 项目管理 */}
            <ImageBackground source={require('../iconImg/headerBar1.png')} style={{width:screenWidth*0.339,height:screenWidth*0.339*0.1198,
            display:'flex',justifyContent:'center',alignItems:'flex-start',paddingLeft:20}}>
            {index !== items.length - 1 ? (
              <></>
            ) : (
              pid == 'P1001' ? (
                <Text style={{color:'#203365',fontSize:17}}>
                  {/* {item.name.slice(0, 20)}
                  {item.name.length > 20 ? '...' : ''} */}
                  项目管理
                </Text>
              ) : (
                pid == 'P1101' ? (
                  <Text style={{color:'#203365',fontSize:16}}>
                    {item.name.slice(0, 20)}
                    {item.name.length > 20 ? '...' : ''}
                  </Text>
                ) : (
                  <></>
                )
              )
            )}
            </ImageBackground>
            {/* 路段 */}
            <ImageBackground source={require('../iconImg/headerBar1.png')} style={{width:screenWidth*0.339,height:screenWidth*0.339*0.1198,
            display:'flex',justifyContent:'center',alignItems:'flex-start',paddingLeft:20,marginLeft:'0.2%'}}>
            {index !== items.length - 1 ? (
              <></>
            ) : (
              <Text style={{color:'#999999',fontSize:17}}>路段</Text>
            )}
            </ImageBackground>
            {/* 桥梁 */}
            <ImageBackground source={require('../iconImg/headerBar2.png')} style={{width:screenWidth*0.21,height:screenWidth*0.21*0.193,
            display:'flex',justifyContent:'center',alignItems:'flex-start',paddingLeft:20,marginLeft:'0.2%'}}>
            {index !== items.length - 1 ? (
              <></>
            ) : (
              <Text style={{color:'#999999',fontSize:17}}>桥梁</Text>
            )}
            </ImageBackground>
          </View>
          {/* 第二行 */}
          <View style={{flexDirection:'row',justifyContent:'space-between',width:screenWidth*0.339,}}>
            {/* 部件 */}
            <ImageBackground source={require('../iconImg/headerBar3.png')} style={{width:screenWidth*0.1632,height:screenWidth*0.1632*0.2488,
              display:'flex',justifyContent:'center',alignItems:'flex-start',paddingLeft:20}}>
              {index !== items.length - 1 ? (
                <></>
              ) : (
                <Text style={{color:'#999999',fontSize:17}}>部件</Text>
              )}
            </ImageBackground>
            {/* 构件 */}
            <ImageBackground source={require('../iconImg/headerBar3.png')} style={{width:screenWidth*0.1632,height:screenWidth*0.1632*0.2488,
              display:'flex',justifyContent:'center',alignItems:'flex-start',paddingLeft:20,}}>
              {index !== items.length - 1 ? (
                <></>
              ) : (
                <Text style={{color:'#999999',fontSize:17}}>构件</Text>
              )}
            </ImageBackground>
          </View>
        </React.Fragment>
      ))}
      {
        pid !== 'P1001' || pid !== 'P1101' ? (
          <React.Fragment>
              <View>
                {/* 第一行 */}
                {
                  project == undefined || project == '' ? (
                    <></>
                  ) : (
                      bridge == undefined || bridge == '' ? (
                        <Text style={[tailwind.textSm,tailwind.fontBold,{color: '#2b427d',fontSize:14}]}>项目：{project}</Text>
                      ) : (
                        <></>
                      )
                  ) 
                }
                {
                  bridge == undefined || bridge == '' && project == undefined || project == '' ? (
                    <></>
                  ) : (
                    <View style={[tailwind.flex1,tailwind.flexRow]}>
                      <TouchableOpacity onPress={() => topage('项目')}>
                        <Text style={[tailwind.textSm,tailwind.fontBold,{color: '#2b427d',fontSize:14,marginLeft:12}]}>
                              项目：{project}
                        </Text>
                      </TouchableOpacity>
                      
                      <Text>    \   </Text>
                      <TouchableOpacity onPress={() => topage('桥梁')}>
                        <Text style={[tailwind.textSm,tailwind.fontBold,{color: '#2b427d',fontSize:14}]}>
                          桥梁：{bridge.bridgename} {bridgeSideText}
                        </Text>
                      </TouchableOpacity>
                      
                    </View>
                  ) 
                }
                <View style={[{height:1}]}></View>
                {/* 第二行 */}
                {
                  labelname == undefined || labelname == '' ? (
                    <></>
                  ) : (
                    membername == undefined || membername == '' ? (
                      <Text style={[tailwind.textSm,tailwind.fontBold,{color: '#2b427d',fontSize:12}]}>     部件：{labelname}</Text>
                    ) : (
                      <></>
                    )
                  ) 
                }
                {
                 labelname == undefined || labelname == '' && membername == undefined || membername == '' ? (
                    <></>
                  ) : (
                    <View style={[tailwind.flex1,tailwind.flexRow]}>
                      <Text style={[tailwind.textSm,tailwind.fontBold,{color: '#2b427d',fontSize:12}]}>     部件：{labelname}
                      </Text>
                      <Text>    \   </Text>
                      <Text style={[tailwind.textSm,tailwind.fontBold,{color: '#2b427d',fontSize:12}]}>
                        构件：{membername}
                      </Text>
                    </View>
                  ) 
                }
              </View>
        </React.Fragment>
        ) : (
          <></>
        )
        
      }
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    ...tailwind.flexRow,
    ...tailwind.pY3,
    // ...tailwind.pX4,
    position:'relative',
    bottom:5,
    // left:65,
    // zIndex:500
    // ...tailwind.shadow2xl,
    // marginBottom:15,
  },
  pid: {
    ...tailwind.mL2,
    ...tailwind.mB1,
    ...tailwind.justifyCenter,
    position:'absolute',
    top:495,
    left:650,
    // width:60
  },
  // P1001 与 P1101页面的pid样式
  pid001: {
    ...tailwind.mL2,
    ...tailwind.mB1,
    ...tailwind.justifyCenter,
    position:'absolute',
    top:495,
    left:625,
    // width:60
  },
  pidSmall: {
    ...tailwind.mL2,
    ...tailwind.mB1,
    ...tailwind.justifyCenter,
    position:'absolute',
    top:495,
    left:625,
    // width:60
  },
  pid1: {
    ...tailwind.mL2,
    ...tailwind.mB1,
    ...tailwind.justifyCenter,
    position:'absolute',
    top:498,
    left:650,
    // width:60
  },
  user: {
    ...tailwind.mX2,
    ...tailwind.flex1,
    ...tailwind.flexRow,
    ...tailwind.justifyEnd,
    ...tailwind.itemsCenter,
  },
  // dropdownlist: {
  //   ...tailwind.mX3,
  //   ...tailwind.flex1,
  //   ...tailwind.flexRow,
  //   ...tailwind.justifyEnd,
  //   ...tailwind.itemsCenter,
  // },
});
