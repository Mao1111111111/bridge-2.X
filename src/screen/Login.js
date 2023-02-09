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
import {fetchAuthorize, fetchUsersProfile} from '../utils/user';
import {TextInput, Password} from '../components/Input';
import Button from '../components/Button';
import {Context} from '../providers/GlobalProvider';
import {Context as themeContext} from '../providers/ThemeProvider';
import {syncCommonData} from '../utils/fetch-data';
import {alert} from '../utils/alert';
import * as user from '../database/user';

export default function Login() {
  const form = React.useRef({});

  const {
    state: {networkState},
    dispatch,
  } = React.useContext(Context);

  const {
    state: {theme},
  } = React.useContext(themeContext);

  const [isLoading, setIsLoading] = React.useState(false);

  const [isSync, setIsSync] = React.useState(false);

  const [massage, setMassage] = React.useState('');

  React.useEffect(() => {
    user.getLastLoginUser().then(res => {
      if (res) {
        form.current.username.setValue(res.username);
      }
    });
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    const username = form.current.username.value;
    const password = form.current.password.value;
    const credentials = new Buffer.from(`${username}:${password}`).toString(
      'base64',
    );
    try {
      const token = await fetchAuthorize(credentials);
      if (token.resultCode) {
        alert('登录失败');
        setIsLoading(false);
        setIsSync(false);
        return;
      }
      const {resultJson} = await fetchUsersProfile(token.access_token);
      const loginDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
      const userData = {
        ...resultJson,
        loginDate,
        token,
        password,
        islogin: 1,
        pin: password,
      };
      await user.login(userData);
      await setUserInfo(userData);
    } catch (err) {
      console.info(err);
      setIsLoading(false);
      setIsSync(false);
    } finally {
      // setIsLoading(false);
    }
  };

  const handleOfflineLogin = async () => {
    setIsLoading(true);
    try {
      const username = form.current.username.value;
      const pin = form.current.pin.value;
      if (!username || !pin) {
        alert('用户名或密码不能为空');
        setIsLoading(false);
        setIsSync(false);
        return;
      }
      const userData = await user.loginpin({
        username,
        pin,
      });
      if (userData) {
        await setUserInfo({
          ...userData,
          groups: JSON.parse(userData.groups),
          roles: JSON.parse(userData.roles),
          company: JSON.parse(userData.company),
          token: JSON.parse(userData.token),
        });
      } else {
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
    await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
    storage.setUserInfo(userData);
    const baseData = await AsyncStorage.getItem(
      'baseData_' + userData?.company?.companyid,
    );
    if (!baseData) {
      setIsSync(true);
      await syncCommonData(
        userData?.company?.companyid,
        userData?.token.access_token,
        res => setMassage(res.name),
      );
      dispatch({
        type: 'upBaseDataFlg',
        payload: Math.random().toString(36).slice(-8),
      });
    }
    dispatch({
      type: 'userInfo',
      payload: userData,
    });
    dispatch({type: 'isLogin', payload: true});
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
      <ImageBackground source={require('../iconImg/loginBg1.jpg')} style={[{width:'100%', height:'100%'}]}>
      <View style={[styles.box]}>
        {isSync ? (
          <View style={[styles.box, theme.primaryBgStyle]}>
            <View style={[styles.loading]}>
              <ActivityIndicator
                size={50}
                animating={true}
                color={colors.purple700}
              />
              <Text style={tailwind.mT1}>正在同步：{massage}</Text>
            </View>
          </View>
        ) : (
          <></>
        )}
        <View>
          <View style={tailwind.flexRow}>
            <Text style={[tailwind.text2xl, tailwind.fontBold, tailwind.mR2]}>
              欢迎使用
            </Text>
            <Text
              style={[
                tailwind.text2xl,
                tailwind.fontBold,
                // tailwind.textPurple700,
                {
                  color:'#2b427d'
                }
              ]}>
              简立得
            </Text>
          </View>
          <View style={tailwind.mY1} />
          {/* <View style={tailwind.selfStart}>
            <Text style={[tailwind.textLg]}></Text>
          </View> */}
          <Text style={[tailwind.mB1,tailwind.fontBold, {color:'#2b427d'}]}>账号</Text>
          <View style={tailwind.h6}>
            <TextInput ref={e => (form.current.username = e)} />
          </View>
          {networkState?.isConnected ? (
            <>
              <View style={tailwind.mY1} />
              <Text style={[tailwind.mB1,tailwind.fontBold,{color:'#2b427d'}]}>密码</Text>
              <View style={tailwind.h6}>
                <Password ref={e => (form.current.password = e)} />
              </View>
            </>
          ) : (
            <>
              <View style={tailwind.mY1} />
              <Text style={tailwind.mB1}>PIN</Text>
              <View style={tailwind.h6}>
                <Password ref={e => (form.current.pin = e)} />
              </View>
            </>
          )}
          <View style={tailwind.mY2} />
          <Button
            loading={isLoading}
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
