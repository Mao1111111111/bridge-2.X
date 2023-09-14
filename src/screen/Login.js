import React from 'react';
import dayjs from 'dayjs';
import {Buffer} from 'buffer';
import {tailwind, colors} from 'react-native-tailwindcss';
import {ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '../utils/storage';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from 'react-native';
import {fetchAuthorize, fetchUsersProfile, fetchInitAccessToken, fetchRegisterApplication, fetchoOtainAccessToken, fetchObtainUserInfo} from '../utils/user';
import {TextInput, Password} from '../components/Input';
import Button from '../components/Button';
import {Context} from '../providers/GlobalProvider';
import {Context as themeContext} from '../providers/ThemeProvider';
import {syncCommonData} from '../utils/fetch-data';
import {alert} from '../utils/alert';
import * as user from '../database/user';

export default function Login() {
  // 引用 存输入框的值 用户名username、密码password、pin
  const form = React.useRef({});

  // 全局参数 网络连接状态
  const {
    state: {networkState},
    dispatch,
  } = React.useContext(Context);

  // 全局样式
  const {
    state: {theme},
  } = React.useContext(themeContext);

  // 按钮的loading状态
  const [isLoading, setIsLoading] = React.useState(false);

  // 是否同步，默认不同步
  const [isSync, setIsSync] = React.useState(false);

  // 同步显示的信息
  const [massage, setMassage] = React.useState('');

  // 页面加载时
  React.useEffect(() => {
    // 获取上次登录的用户信息
    user.getLastLoginUser().then(res => {
      if (res) {
        // 如果存在上次登录的用户信息
        // 将用户名设置为 上次登录的 用户名
        form.current.username.setValue(res.username);
      }
    });
  }, []);

  // 在线登录
  const handleLogin = async () => {
    // 设置按钮 loading
    setIsLoading(true);
    // 从引用中 获取 用户名、密码
    const username = form.current.username.value;
    const password = form.current.password.value;
    // 对用户名和密码进行加密处理 作为 凭证
    const credentials = new Buffer.from(`${username}:${password}`).toString(
      'base64',
    );
    try {
      // 根据凭证获取 access_token
      // const token = await fetchAuthorize(credentials);
      // console.log("token",token);
      // 当授权失败时，显示登录失败，并取消按钮loading，取消同步
      // if (token.resultCode) {
      //   alert('登录失败');
      //   setIsLoading(false);
      //   setIsSync(false);
      //   return;
      // }
      // 当授权成功时，继续执行以下代码
      // 获取用户信息
      // const {resultJson} = await fetchUsersProfile(token.access_token);
      //console.log("resultJson",resultJson);

      //============权限============
      /* const credentials_1 = new Buffer.from(`${'test'}:${'test'}`).toString(
        'base64',
      ); */
      const credentials_1 = new Buffer.from(`${username}:${password}`).toString(
        'base64',
      );
      //---1、获取应用注册初始化令牌
      let token_1 = null
      try{
        token_1 = await fetchInitAccessToken(credentials_1)
        if(!token_1||!token_1.access_token){
          return loginErr()
        }
      }catch(e){
        console.log('fetchInitAccessToken',e);
        return loginErr()
      }
      //---2、注册应用
      //注册应用的body
      const RegisterAppBody = {
        client_name: "user_test_mobile_app",
        client_uri: "http://a.test.net",
        scope: "user disarm",
        redirect_uris: ["http://a.test.net/callback"],
        grant_types: ["password"],
        response_types: ["code"],
        token_endpoint_auth_method: "client_secret_basic"
      }
      let ApplicationInfo = null
      try{
        ApplicationInfo = await fetchRegisterApplication(token_1.access_token,RegisterAppBody)
        if(!ApplicationInfo||!ApplicationInfo.client_id){
          return loginErr()
        }
      }catch(e){
        console.log('fetchRegisterApplication',e);
        return loginErr()
      }
      //---3、获取访问令牌
      //获取访问令牌的body
      const GetAccessTokenBody = {
        grant_type:"password",
        password:password,
        username:username,
        scope:"user disarm"
      }
      /* const GetAccessTokenBody = {
        grant_type:"password",
        password:'test',
        username:'test',
        scope:"user disarm"
      } */
      const arr = []
      for(let key in GetAccessTokenBody){
       arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(GetAccessTokenBody[key])}`)
      }
      //clientInfo
      //const clientInfo = new Buffer.from(`${'6ATSUozZMswx8dmWGFUQiiTwJSf3BLI5zzQ1PPtwka'}:${'77e30374ba9335e045fcb504eb31419cb91a838c89fb29e0'}`).toString('base64',)
      const clientInfo = new Buffer.from(`${ApplicationInfo.client_id}:${ApplicationInfo.client_secret}`).toString('base64',)
      let accessTokenInfo = null
      try{
        accessTokenInfo = await fetchoOtainAccessToken(clientInfo,arr.join('&'))
        if(!accessTokenInfo||!accessTokenInfo.access_token){
          return loginErr()
        }
      }catch(e){
        console.log('accessTokenInfo',e);
        return loginErr()
      }
      //---4、获取用户信息
      let userInfo = null
      try{
        userInfo = await fetchObtainUserInfo(accessTokenInfo.access_token)
        if(!userInfo||!userInfo.userid){
          return loginErr()
        }
      }catch(e){
        console.log('fetchObtainUserInfo',e);
        return loginErr()
      }

      // 登录时间
      const loginDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
      // 整理用户信息
      const userData = {
        ...{
          company:{
            companyid:userInfo.company.id,
            companyname:userInfo.company.name
          },
          groups:[],
          nickname:userInfo.nickname,
          roles:userInfo.role,
          userid:userInfo.userid,
          username:userInfo.username
        },
        loginDate,
        token:{
          ...{
            access_token:'',
            refresh_token:''
          },
          auth_access_token:accessTokenInfo.access_token,
          client_id:ApplicationInfo.client_id,
          client_secret:ApplicationInfo.client_secret
         /*  client_id:'6ATSUozZMswx8dmWGFUQiiTwJSf3BLI5zzQ1PPtwka',
          client_secret:'77e30374ba9335e045fcb504eb31419cb91a838c89fb29e0' */
        },
        password,
        islogin: 1,
        pin: password,
      };
      console.log("userData",userData);
      // 将用户信息存入数据库中
      //如果数据库中有这个用户,那么更新数据;如果没有这个用户,那么插入这个用户信息到数据库
      await user.login(userData);
      // 设置用户信息
      // 1、将新的用户信息 存入 本地；赋给临时变量；存入全局参数
      // 2、将是否登录 设置为 true，隐藏登录页面
      // 3、如果基础数据不存在，那么同步数据
      await setUserInfo(userData);
    } catch (err) {
      console.info(err);
      setIsLoading(false);
      setIsSync(false);
    } finally {
      // setIsLoading(false);
    }
  };

  // 登录失败
  const loginErr = () => {
    alert('登录失败');
    setIsLoading(false);
    setIsSync(false);
    return;
  }
  // 离线登录
  const handleOfflineLogin = async () => {
    // 按钮loading
    setIsLoading(true);
    try {
      // 从引用中获取 用户名 和 pin
      const username = form.current.username.value;
      const pin = form.current.pin.value;
      // 如果填写不完整，那么返回
      if (!username || !pin) {
        alert('用户名或密码不能为空');
        setIsLoading(false);
        setIsSync(false);
        return;
      }
      // 获取用户信息，如果用户信息存在，那么返回；不存在，那么返回null
      const userData = await user.loginpin({
        username,
        pin,
      });
      if (userData) {
        // 如果用户信息存在
        // 设置用户信息
        // 1、将新的用户信息 存入 本地；赋给临时变量；存入全局参数
        // 2、将是否登录 设置为 true，隐藏登录页面
        // 3、如果基础数据不存在，那么同步数据 
        await setUserInfo({
          ...userData,
          groups: JSON.parse(userData.groups),
          roles: JSON.parse(userData.roles),
          company: JSON.parse(userData.company),
          token: JSON.parse(userData.token),
        });
      } else {
        // 用户信息不存在
        alert('用户名或PIN错误');
        setIsLoading(false);
        setIsSync(false);
      }
    } catch (err) {
      console.info(err);
      setIsLoading(false);
      setIsSync(false);
    } finally {
      // setIsLoading(false);
    }
  };

  const setUserInfo = async userData => {
    // 将用户信息 存入 本地
    await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
    // 将用户信息的值 赋值给 运行软件时的 临时变量
    storage.setUserInfo(userData);
    // 根据公司id 获取 基础数据
    const baseData = await AsyncStorage.getItem(
      'baseData_' + userData?.company?.companyid,
    );
    // 如果基础数据 不存在
    if (!baseData) {
      // 设置同步
      setIsSync(true);
      // 同步数据 服务器->客户端 公司id、access_token
      // 通过接口获取数据，将基础数据和养护区数据存入数据库中，将所有数据存入本地
      await syncCommonData(
        userData?.company?.companyid,
        userData?.token.auth_access_token,
        res => setMassage(res.name),
      );
      // 设置更新数据库的标志，触发全局提供者中的useEffect2
      // 从而更新全局参数中的 养护区列表、路线列表、基础数据（一堆）、桥梁结构数据
      dispatch({
        type: 'upBaseDataFlg',
        payload: Math.random().toString(36).slice(-8),
      });
    }
    // 将用户信息 存入 全局参数
    dispatch({
      type: 'userInfo',
      payload: userData,
    });
    // 将 全局参数中 的 是否登录 设置为 true
    dispatch({type: 'isLogin', payload: true});
  };

  return (
    // 点击空白处收起键盘
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        {/* 背景图片 */}
        <ImageBackground source={require('../iconImg/loginBg1.jpg')} style={[{width:'100%', height:'100%'}]}>
          {/* 软件版本 */}
          <Text
            style={
              [
                {
                  fontSize:8,
                  color:'#394f86',
                  fontWeight: 'bold',
                  left:8,
                  top:520
                }
              ]
            }
          >v3.00</Text>
          <View style={[styles.box]}>
            {/* 判断是否同步，默认不同步 */}
            {/* 这里是登录后，同步数据 */}
            {isSync ? (
              <View style={[styles.box, theme.primaryBgStyle]}>
                <View style={[styles.loading]}>
                  <ActivityIndicator
                    size={50}
                    animating={true}
                    color={colors.purple700}
                  />
                  {/* 显示同步信息 */}
                  <Text style={tailwind.mT1}>正在同步：{massage}</Text>
                </View>
              </View>
            ) : (
              <></>
            )}
            {/* 登录表单 */}
            <View>
              {/* 标题   欢迎使用 检立得 style={tailwind.flexRow} */}
              <View>
                <Text style={[tailwind.text2xl, tailwind.fontBold, tailwind.mR2, 
                  {color:'#2b427d', textAlign:'center', fontSize:16}]}>
                黑龙江省工程质量道桥检测中心
                </Text>
                <Text
                  style={[
                    tailwind.text2xl,
                    tailwind.fontBold,
                    // tailwind.textPurple700,
                    {
                      color:'#2b427d',
                      textAlign:'center'
                    }
                  ]}>
                    桥梁辅助检测系统
                </Text>
              </View>
              <View style={tailwind.mY1} />
              {/* <View style={tailwind.selfStart}>
                <Text style={[tailwind.textLg]}></Text>
              </View> */}
              {/* 表单 */}
              {/* 账号 */}
              <Text style={[tailwind.mB1,tailwind.fontBold, {color:'#2b427d'}]}>账号</Text>
              <View style={tailwind.h6}>
                <TextInput ref={e => (form.current.username = e)} />
              </View>
              {/* 根据是否联网判断 密码登录 还是 pin登录 */}
              {networkState?.isConnected ? (
                // 联网时，密码登录
                <>
                  <View style={tailwind.mY1} />
                  <Text style={[tailwind.mB1,tailwind.fontBold,{color:'#2b427d'}]}>密码</Text>
                  <View style={tailwind.h6}>
                    <Password ref={e => (form.current.password = e)} />
                  </View>
                </>
              ) : (
                // 未联网时，pin登录
                <>
                  <View style={tailwind.mY1} />
                  <Text style={tailwind.mB1}>PIN</Text>
                  <View style={tailwind.h6}>
                    <Password ref={e => (form.current.pin = e)} />
                  </View>
                </>
              )}
              <View style={tailwind.mY2} />
              {/* 登录按钮 */}
              <Button
                // 按钮的loading状态 
                loading={isLoading}
                // 根据是否联网判断执行 在线登录 还是 离线登录
                onPress={
                  networkState?.isConnected ? handleLogin : handleOfflineLogin
                }
                style={[{backgroundColor:'#2b427d'}]}
                >
                登录
              </Button>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  box: {
    ...tailwind.absolute,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
    ...tailwind.wFull,
    ...tailwind.hFull,
    zIndex: 1000,
  },
});
