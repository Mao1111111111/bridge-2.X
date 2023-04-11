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

// import {BoxShadow} from 'react-native-shadow'

// const textShadow = {
//   width:707,
//   height: 48,
//   color:"#000",
//   border:0,
//   radius:0.1,
//   opacity:0.1,
//   x:2,
//   y:2,
//   style:{marginVertical:0}
// }

export default function Headerbar({items, pid}) {
  const {
    state: {theme},
  } = React.useContext(Context);

  const {
    state: {userInfo},
  } = React.useContext(GlobalContext);

  // 对导航的显示内容进行处理
  const getText = item => {
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

  return (
    <View style={[
      styles.box,
      // theme.primaryBgStyle
      {
        backgroundColor: '#fff',
      }
      ]}>
      {/* 如项目管理中，顶部导航最左边的标签 */}
      {pid ? (
        <View style={[styles.pid]}>
          <Pid pid={pid} size="medium" />
        </View>
      ) : (
        <></>
      )}
      <Text>{'  '}</Text>
      {/* 顶部导航左侧的 蓝色粗竖线 */}
      <Image style={{ height: 20, width: 5, alignItems: 'center' }}
          source={require('../iconImg/shuxian.png')}
      />
      <Text>{'  '}</Text>
      {/* 右侧导航 */}
      {items.map((item, index) => (
        // React.Fragment 相当于 <></>
        <React.Fragment key={index}>
          {index !== items.length - 1 ? (
            // 如果不是最后一个，加上 /
            <React.Fragment>
              <TouchableOpacity onPress={item.onPress}>
                {/* getText 对显示内容进行处理：1）icon 2）超长截取 */}
                {getText(item)}
              </TouchableOpacity>
              <Text style={[tailwind.textSm, tailwind.mX1]}>/</Text>
            </React.Fragment>
          ) : (
            // 最后一个导航，显示并 超长截取
            <Text style={[tailwind.textSm, tailwind.fontBold]}>
              {item.name.slice(0, 12)}
              {item.name.length > 12 ? '...' : ''}
            </Text>
          )}
        </React.Fragment>
      ))}
      {/* {pid ? (
        <View style={[styles.pid]}>
          <Pid pid={pid} size="small" />
        </View>
      ) : (
        <></>
      )} */}
      {/* 用户信息 */}
      {/* <View style={styles.user}>
        <Icon name="account-circle" size={24} style={tailwind.mR1} />
        <Image style={{ height: 24, width: 24, alignItems: 'center' }}
            source={require('../iconImg/user.png')}
        />
        <Text>{' '}</Text>
        <Text>{userInfo?.nickname}</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    ...tailwind.flexRow,
    ...tailwind.pY3,
    ...tailwind.pX1,
    // ...tailwind.shadow2xl,
  },
  pid: {
    ...tailwind.mL2,
    ...tailwind.mB1,
    ...tailwind.justifyCenter,
  },
  user: {
    ...tailwind.mX2,
    ...tailwind.flex1,
    ...tailwind.flexRow,
    ...tailwind.justifyEnd,
    ...tailwind.itemsCenter,
  },
});
