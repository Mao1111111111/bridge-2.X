import React,{useState,useEffect} from 'react';
import dayjs from 'dayjs';
import {tailwind} from 'react-native-tailwindcss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Pressable, Image,Dimensions} from 'react-native';
import Table from '../components/Table';
import Modal from '../components/Modal';
import {Password} from '../components/Input';
import Headerbar from '../components/Headerbar';
import {Context as ThemeContext} from '../providers/ThemeProvider';
import {Context} from '../providers/GlobalProvider';
import {confirm, alert} from '../utils/alert';
import {syncCommonData} from '../utils/fetch-data';
import Button from '../components/Button';
import {logout, check, createpin} from '../database/user';
import {allData} from '../utils/sqlite';
import fs from '../utils/fs';
import RNFS from 'react-native-fs';

const Info = () => (
  <View>
    <Text style={[tailwind.textLg, tailwind.fontBold]}>软件信息</Text>
    <View style={tailwind.mT1} />
    <Text style={[tailwind.textBase]}>软件版本：v1.06</Text>
  </View>
);

const BaseData = ({onLoading, isLoading}) => {
  const [dataName, setDataName] = React.useState([]);

  const [data, setData] = React.useState({});

  // 数据更新按钮样式
  const [updateData, setUpdateData] = useState()

  const [screenWidth,setScreenWidth] = useState() //屏幕宽度

  const {
    state: {userInfo, networkState},
    dispatch,
  } = React.useContext(Context);

  useEffect(() => {
    let updateData = require('../iconImg/update.png')
    setUpdateData(updateData)
    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
  }, [])

  React.useEffect(() => {
    if (!userInfo) {
      return;
    }
    AsyncStorage.getItem('baseData_' + userInfo?.company?.companyid).then(
      async res => {
        if (res) {
          const baseData = JSON.parse(res);
          const keys = Object.keys(baseData);
          setDataName(keys);
          const _data = {};
          keys.forEach(async item => {
            const d = baseData[item];
            _data[item] = {laetDate: d.laetDate, status: '--'};
          });
          setData(_data);
        }
      },
    );
  }, [userInfo]);

  const handleUpdate = () => {
    if (!networkState?.isConnected) {
      alert('当前网络未连接！');
      return;
    }
    confirm('是否要更新数据？\n\n该操作耗时较长，请耐心等待。\n进行更新时请勿操作页面', () => {
      onLoading(true);
      setData(e => {
        const _data = {...e};
        Object.keys(_data).forEach(key => (_data[key].status = '等待更新中'));
        return _data;
      });
      syncCommonData(
        userInfo?.company?.companyid,
        userInfo.token.auth_access_token,
        res => {
          setData(e => ({
            ...e,
            [res.name]: {
              laetDate: res?.laetDate ? res?.laetDate : e[res.name]?.laetDate,
              status: res.status,
            },
          }));
        },
      ).then(() => {
        alert('基础数据更新完成!');
        dispatch({
          type: 'upBaseDataFlg',
          payload: Math.random().toString(36).slice(-8),
        });
        onLoading(false);
      });
    });
  };

  const updatePull = () => {
    let updateData = require('../iconImg/updatePull.png')
    setUpdateData(updateData)
  }

  const updateOut = () => {
    let updateData = require('../iconImg/update.png')
    setUpdateData(updateData)
  }

  return (
    <View>
      <View style={
        screenWidth > 830 ? [tailwind.flex1]
        :
        [tailwind.flex1,{backgroundColor:'rgba(255,255,255,1)',right:19,width:715,top:1,borderRadius:5}]
      }>
        {/* [,] */}
        <View style={tailwind.mY2} />
        <View style={[tailwind.flexRow,{height: 30}]}>
          {/* <Text style={[tailwind.textLg, tailwind.fontBold]}>基础数据</Text> */}
            <Text>{'    '}</Text>
            <Image style={{ height: 20, width: 5, alignItems: 'center' }}
              source={require('../iconImg/shuxian.png')}
            />
            <Text>{'  '}</Text>
            <Text style={[
              {
                fontSize:14,
                color:'#2b427d',
                fontWeight:'bold'
              }
            ]}>基础数据</Text>
          
          {/* <Button loading={isLoading} onPress={handleUpdate}>
            {isLoading ? '更新中' : '开始更新'}
          </Button> */}
        </View>
        <View style={[tailwind.mX2,{width: 685}]}>
          <Table.Header>
            <Table.Title title="数据集" flex={3} />
            <Table.Title title="最后更新时间" flex={2} />
            <Table.Title title="当前状态" flex={2} />
          </Table.Header>
        </View>
        
        <FlatList
          data={dataName}
          extraData={dataName}
          renderItem={({item, index}) => (
            <Table.Row key={index}>
              <Table.Cell flex={3}>{item}</Table.Cell>
              <Table.Cell flex={2}>
                {data[item] ? data[item].laetDate : ''}
              </Table.Cell>
              <Table.Cell flex={2}>
                {data[item] ? data[item].status : ''}
              </Table.Cell>
            </Table.Row>
          )}
        />
      </View>
      <View style={tailwind.mY2} />
      {/* 更新数据 按钮 */}
      <View>
        <Pressable style={[{
          position:'absolute',
          top:50,
          left:725
        }]}
          onPressIn={updatePull} onPressOut={updateOut} loading={isLoading} onPress={handleUpdate}
        >
          {/* { width: 45, height: 45, alignItems: 'center' } */}
          <Image style={
            screenWidth > 830 ? [{ width: 45, height: 45, alignItems: 'center' }]
            : [{ width: 35, height: 35, alignItems: 'center',right:23 }]
          }
            source={updateData}
          ></Image>
          <Text style={[{
            color: '#2b427d'
          }]}>
            {isLoading ? '更新中' : ''}
          </Text>
        </Pressable>
      </View>
    </View>
    
  );
};

const PINForm = React.forwardRef(({userInfo}, ref) => {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const [visible, setVisible] = React.useState(false);

  const form = React.useRef({});

  React.useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
  }));

  const handleSave = async () => {
    try {
      const {current: data} = form;
      const password = data.password.value;
      const newpin = data.newpin.value;
      const newpin2 = data.newpin2.value;
      if (password === '' || newpin === '' || newpin2 === '') {
        return;
      }
      if (newpin !== newpin2) {
        alert('两次输入的PIN不一致！');
        return;
      }
      const user = await check({username: userInfo.username, password});
      if (user) {
        console.info(user.userid);
        await createpin({userid: user.userid, pin: newpin});
        setVisible(false);
        alert('保存成功！');
      } else {
        alert('密码错误！');
      }
    } catch (err) {
      console.info(err);
    }
  };

  const close = () => {
    setVisible(false);
  };

  return (
    <Modal onClose={close} visible={visible} title="设置PIN" showHead>
      <View style={[styles.modelBody, theme.primaryBgStyle]}>
        <Text style={tailwind.mB1}>用户密码</Text>
        <View style={tailwind.h6}>
          <Password ref={e => (form.current.password = e)} />
        </View>
        <View style={tailwind.mY1} />
        <Text style={tailwind.mB1}>新PIN</Text>
        <View style={tailwind.h6}>
          <Password ref={e => (form.current.newpin = e)} />
        </View>
        <View style={tailwind.mY1} />
        <Text style={tailwind.mB1}>确认新PIN</Text>
        <View style={tailwind.h6}>
          <Password ref={e => (form.current.newpin2 = e)} />
        </View>
        <View style={tailwind.mT4} />
        <Button onPress={handleSave} style={[{backgroundColor:'#2b427d'}]}>保存</Button>
      </View>
    </Modal>
  );
});

const User = () => {
  const {
    state: {userInfo},
    dispatch,
  } = React.useContext(Context);

  const form = React.useRef();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userInfo');
    await logout();
    dispatch({type: 'userInfo', payload: null});
    dispatch({type: 'isLogin', payload: false});
  };

  const handlePIN = async () => {
    form.current.open();
  };

  const [screenWidth,setScreenWidth] = useState() //屏幕宽度
  useEffect(() => {
    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
  }, [])

  return (
    <View>
      {/* <Text style={[tailwind.textLg, tailwind.fontBold]}>用户信息</Text>
      <View style={tailwind.mT1} />
      <Text style={[tailwind.textBase]}>用户名：{userInfo?.nickname}</Text>
      <View style={tailwind.mT1} />
      <Text style={[tailwind.textBase]}>
        所属公司：{userInfo?.company?.companyname}
      </Text>
      <View style={tailwind.mT1} />
      <Text style={[tailwind.textBase]}>登录日期：{userInfo?.loginDate}</Text>
      <View style={tailwind.mT4} />
      <Button onPress={handlePIN}>设置PIN</Button>
      <View style={tailwind.mT4} />
      <Button style={tailwind.bgRed700} onPress={handleLogout}>
        退出登录
      </Button>
      <PINForm ref={form} userInfo={userInfo} /> */}
      <View style={
        screenWidth > 830 ? [tailwind.flex1]
        :
        [tailwind.flex1,{backgroundColor:'rgba(255,255,255,1)',right:19,width:715,top:1,borderRadius:5}]
      }>
        <View style={tailwind.mY2} />
        <View style={[tailwind.flexRow,{height: 30}]}>
          {/* <Text style={[tailwind.textLg, tailwind.fontBold]}>基础数据</Text> */}
            <Text>{'    '}</Text>
            <Image style={{ height: 20, width: 5, alignItems: 'center' }}
              source={require('../iconImg/shuxian.png')}
            />
            <Text>{'  '}</Text>
            <Text style={[
              {
                fontSize:14,
                color:'#2b427d',
                fontWeight:'bold'
              }
            ]}>用户信息</Text>
        </View>
        <ImageBackground
          source={require('../iconImg/userInfoBg.png')}
          style={
            [
              tailwind.mY4,
              tailwind.mX1,
              {
                width: 698,
                height: 333
              }
            ]
          }
        >
          <View style={[tailwind.flexRow]}>
            {/* 设置PIN */}
              <Pressable onPressIn={handlePIN}>
                <ImageBackground
                  source={require('../iconImg/settingPin.png')}
                  style={
                    [
                      {
                        width:90,
                        height:22,
                        position: 'relative',
                        top: 283,
                        left: 238,
                      }
                    ]
                  }
                ></ImageBackground>
              </Pressable>
            
            {/* 退出登录 */}
            <Pressable onPressIn={handleLogout}>
              <Image
                source={require('../iconImg/logoutBg.png')}
                style={
                  [
                    {
                      width:90,
                      height:22,
                      position: 'relative',
                      top: 283,
                      left: 275
                    }
                  ]
                }
              ></Image>
            </Pressable>
          </View>
        </ImageBackground>
        <PINForm ref={form} userInfo={userInfo} />
      </View>
      <View>
        
      </View>
      <View>
        {/* 用户名 */}
        <Text style={
          [
            {
              color:'#2b427d',
              fontWeight: 'bold',
              textAlign:'center',
              fontSize:18,
              right:'0.5%',
              top: 160
            }
          ]
        }>
          {userInfo?.nickname}
        </Text>
        {/* 所属公司 */}
        <Text style={
          [
            {
              color:'#2b427d',
              // fontWeight: 'bold',
              // fontSize:18,
              left:'49%',
              top: 203
            }
          ]
        }>{userInfo?.company?.companyname}</Text>
        {/* 登陆日期 */}
        <Text style={
          [
            {
              color:'#2b427d',
              // fontWeight: 'bold',
              fontSize:13,
              left:'49%',
              top: 217
            }
          ]
        }>{userInfo?.loginDate}</Text>
      </View>
    </View>
  );
};

const Debug = () => {
  const [loading, setLoding] = React.useState(false);

  const handleExport = async () => {
    setLoding(true);
    try {
      const data = await allData();
      const filename = dayjs().format('YYYYMMDDHHmmss');
      await fs.mkdir(RNFS.ExternalStorageDirectoryPath + '/jianlide-data');
      await fs.write(
        RNFS.ExternalStorageDirectoryPath +
          `/jianlide-data/bak_${filename}.json`,
        JSON.stringify(data),
        'utf8',
      );
      alert(`(/jianlide-data/bak_${filename}.json)导出成功！`);
    } catch (err) {
      alert('导出失败');
    } finally {
      setLoding(false);
    }
  };

  const [screenWidth,setScreenWidth] = useState() //屏幕宽度
  useEffect(() => {
    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
  }, [])

  return (
    <View>
      {/* <Button
      onPress={handleExport}
        loading={loading}
        style={
          [
            {
              width:100,
              backgroundColor:'#2b427d',
              left: 20,
              top: 20
            }
          ]
        }
        >
        导出数据
      </Button> */}
      <View style={
        screenWidth > 830 ? [tailwind.flex1]
        :
        [tailwind.flex1,{backgroundColor:'rgba(255,255,255,1)',right:19,width:715,top:1,borderRadius:5}]
      }>
      <View style={tailwind.mY2} />
        <View style={[tailwind.flexRow,{height: 30}]}>
          {/* <Text style={[tailwind.textLg, tailwind.fontBold]}>基础数据</Text> */}
            <Text>{'    '}</Text>
            <Image style={{ height: 20, width: 5, alignItems: 'center' }}
              source={require('../iconImg/shuxian.png')}
            />
            <Text>{'  '}</Text>
            <Text style={[
              {
                fontSize:14,
                color:'#2b427d',
                fontWeight:'bold'
              }
            ]}>程序调试</Text>
        </View>
        
        
      </View>
      <View style={tailwind.mY2} />
      <Button
        onPress={handleExport}
        loading={loading}
        style={
          [
            {
              width:100,
              backgroundColor:'#2b427d',
              left: 20,
              top: 40
            }
          ]
        }
      >
        导出数据
      </Button>
    </View>
  );
};

export default function Setting() {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const [active, setActive] = React.useState('basedata');

  const [isLoading, setIsLoading] = React.useState(false);

  const [screenWidth,setScreenWidth] = React.useState() //屏幕宽度

  const getPage = () => {
    switch (active) {
      case 'basedata':
        return <BaseData onLoading={setIsLoading} isLoading={isLoading} />;
      case 'info':
        return <Info />;
      case 'user':
        return <User />;
      case 'debug':
        return <Debug />;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
  },[])

  return (
    <View style={tailwind.flex1}>
      {/* <Headerbar items={[{name: '用户设置'}]} /> */}
      {/* <View style={[styles.card, theme.primaryBgStyle]}>
        <View style={[tailwind.mR8, tailwind.mL4]}>
          <TouchableOpacity onPress={() => isLoading || setActive('basedata')}>
            <Text
              style={[
                tailwind.textXl,
                tailwind.fontBold,
                active === 'basedata' ? theme.primaryTextStyle : {},
              ]}>
              基础数据
            </Text>
          </TouchableOpacity>
          <View style={tailwind.mY3} />
          <TouchableOpacity onPress={() => isLoading || setActive('info')}>
            <Text
              style={[
                tailwind.textXl,
                tailwind.fontBold,
                active === 'info' ? theme.primaryTextStyle : {},
              ]}>
              软件信息
            </Text>
          </TouchableOpacity>
          <View style={tailwind.mY3} />
          <TouchableOpacity onPress={() => isLoading || setActive('user')}>
            <Text
              style={[
                tailwind.textXl,
                tailwind.fontBold,
                active === 'user' ? theme.primaryTextStyle : {},
              ]}>
              用户信息
            </Text>
          </TouchableOpacity>
          <View style={tailwind.mY3} />
          <TouchableOpacity onPress={() => isLoading || setActive('debug')}>
            <Text
              style={[
                tailwind.textXl,
                tailwind.fontBold,
                active === 'user' ? theme.primaryTextStyle : {},
              ]}>
              程序调试
            </Text>
          </TouchableOpacity>
        </View>
        {getPage()}
      </View> */}
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
              // backgroundColor:'#fff'
            }
          ]
        }
      >
        <View style={tailwind.mY8} />
        {/* 基础数据 */}
        <Pressable onPress={() => isLoading || setActive('basedata')}>
          {/* { width: 55, height: 39, alignItems: 'center' } */}
          <Image style={
            screenWidth > 830 ? [{ width: 55, height: 39, alignItems: 'center' }]
            :
            [{ width: 35, height: 24, alignItems: 'center' }]
          }
            source={require('../iconImg/settingData.png')}
          ></Image>
        </Pressable>
        <View style={tailwind.mY1} />
        {/* 用户信息 */}
        <Pressable onPress={() => isLoading || setActive('user')}>
          <Image style={
            screenWidth > 830 ? [{ width: 55, height: 39, alignItems: 'center' }]
            :
            [{ width: 35, height: 24, alignItems: 'center' }]
          }
            source={require('../iconImg/settingUser.png')}
          ></Image>
        </Pressable>
        <View style={tailwind.mY1} />
        {/* 程序调试 */}
        <Pressable onPress={() => isLoading || setActive('debug')}>
          <Image style={
            screenWidth > 830 ? [{ width: 55, height: 39, alignItems: 'center' }]
            :
            [{ width: 35, height: 24, alignItems: 'center' }]
          }
            source={require('../iconImg/settingDebug.png')}
          ></Image>
        </Pressable>
      </View>
      <ImageBackground 
        style={
          [
            tailwind.mY12,
            // tailwind.mX19,
            {
              width:710,
              height:440,
              position:'absolute',
              left:75
            }
          ]
        }
      >
        {/* <Headerbar items={[{name: '用户设置'}]} /> */}
        <View style={tailwind.mY2} />
        {getPage()}
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
});
