/* 
  顶部导航
 */
import React from 'react';
import {tailwind} from 'react-native-tailwindcss';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Context} from '../providers/ThemeProvider';
import {Context as GlobalContext} from '../providers/GlobalProvider';
import Pid from './Pid';
import ModalDropdown from 'react-native-modal-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Headerbar({route,items, pid, proNameList, bridgeList,
  navigation,list,project,bridge, labelname, membername}) {
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


  React.useEffect(()=> {
    console.log('pid',pid);
    // console.log('items.name',items[0].name);
    getProStorage()
    getBriStorage()
  },[])

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
      console.log(error);
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
      styles.box,
      // theme.primaryBgStyle,
      // {
      //   backgroundColor: '#fff',
      // }
      ]}>
      {/* 如项目管理中，顶部导航最左边的标签 */}
      {/* {pid && pid !== 'P1001' || pid !== 'P1101' ? (
        <View style={[styles.pid]}>
          <Pid pid={pid} size="medium" />
        </View>
      ) : (
        pid && pid == 'P1001' || pid == 'P1101' ? (
          <View style={[styles.pid1]}>
            <Pid pid={pid} size="medium" />
          </View>
        ) : (
          <></>
        )
      )} */}
      {pid ? (
        <View style={[styles.pid]}>
          <Pid pid={pid} size="medium" />
        </View>
      ) : (
        <></>
      )}
      
      {/* <Text>{'  '}</Text> */}
      {/* 顶部导航左侧的 蓝色粗竖线 */}
      {/* <Image style={{ height: 20, width: 5, alignItems: 'center' }}
          source={require('../iconImg/shuxian.png')}
      /> */}
      {/* <Text>{'  '}</Text> */}
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
          {index !== items.length - 1 ? (
            // 如果不是最后一个，加上
            <></>
          ) : (
            // 最后一个导航，显示并 超长截取
            // <ModalDropdown
            //   adjustFrame={this._adjustType}
            //   options={proList} // 选项内容
            //   dropdownTextHighlightStyle={{color:'#2b427d',fontWeight:'800'}}
            //   dropdownStyle={[{width:150,height:155,alignItems:'center'}]}
            //   dropdownTextStyle={[{width:130,textAlign:'center'}]}
            //   onSelect={this._selectType} // 点击选项时，执行的方法
            //   defaultValue={proList[0]}
            //   onDropdownWillShow={()=>getStorage()}
            // >
            //   {/* <TouchableOpacity onPress={()=>getStorage()}> */}
            //   <Text style={[tailwind.textSm, tailwind.fontBold]}>
            //     {item.name.slice(0, 12)}
            //     {item.name.length > 12 ? '...' : ''}
            //   </Text>
            // {/* </TouchableOpacity> */}
            // </ModalDropdown>
            pid == 'P1001' ? (
              <ModalDropdown
                adjustFrame={this._adjustType}
                options={proList} // 选项内容
                dropdownTextHighlightStyle={{color:'#2b427d',fontWeight:'800'}}
                dropdownStyle={[{width:150,height:155,alignItems:'center'}]}
                dropdownTextStyle={[{width:130,textAlign:'center'}]}
                onSelect={this._selectProType} // 点击选项时，执行的方法
                defaultValue={proList[0]}
                onDropdownWillShow={()=>getProStorage()}
              >
                <Text style={[tailwind.textSm, tailwind.fontBold]}>
                  {item.name.slice(0, 12)}
                  {item.name.length > 12 ? '...' : ''}
                </Text>
              </ModalDropdown>
            ) : (
              pid == 'P1101' ? (
                <ModalDropdown
                  adjustFrame={this._adjustType}
                  options={briList} // 选项内容
                  dropdownTextHighlightStyle={{color:'#2b427d',fontWeight:'800'}}
                  dropdownStyle={[{width:150,height:155,alignItems:'center'}]}
                  dropdownTextStyle={[{width:130,textAlign:'center'}]}
                  onSelect={this._selectBriType} // 点击选项时，执行的方法
                  defaultValue={briList[0]}
                  onDropdownWillShow={()=>getBriStorage()}
                >
                  <Text style={[tailwind.textSm, tailwind.fontBold]}>
                    {item.name.slice(0, 12)}
                    {item.name.length > 12 ? '...' : ''}
                  </Text>
                </ModalDropdown>
              ) : (
                <></>
              )
            )
          )}
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
                        <Text style={[tailwind.textSm,tailwind.fontBold,{color: '#2b427d',fontSize:14}]}>
                          项目：{project}
                        </Text>
                      </TouchableOpacity>
                      
                      <Text>    \   </Text>
                      <TouchableOpacity onPress={() => topage('桥梁')}>
                        <Text style={[tailwind.textSm,tailwind.fontBold,{color: '#2b427d',fontSize:14}]}>
                          桥梁：{bridge}
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
                      <Text style={[tailwind.textSm,tailwind.fontBold,{color: '#2b427d',fontSize:12}]}>部件：{labelname}</Text>
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
                      <Text style={[tailwind.textSm,tailwind.fontBold,{color: '#2b427d',fontSize:12}]}>
                        部件：{labelname}
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
    ...tailwind.pX4,
    position:'relative',
    bottom:5,
    left:65,
    // zIndex:500
    ...tailwind.shadow2xl,
    marginBottom:15,
  },
  pid: {
    ...tailwind.mL2,
    ...tailwind.mB1,
    ...tailwind.justifyCenter,
    position:'absolute',
    top:495,
    left:635,
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
