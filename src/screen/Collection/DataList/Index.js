import React from 'react';
import {tailwind} from 'react-native-tailwindcss';
import Headerbar from '../../../components/Headerbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import BridgeList from './BridgeList';
import BridgeDetail from './BridgeDetail';
import ProjectList from './ProjectList';
import ProjectDetail from './ProjectDetail';
import NavigatorStack from '../../../components/NavigatorStack';
import {Context as GlobalContext} from '../../../providers/GlobalProvider';
import {Context as ThemeContext} from '../../../providers/ThemeProvider';

function Main({navigation}) {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const {dispatch} = React.useContext(GlobalContext);

  const toPage = path => {
    navigation.navigate(path);
  };

  const headerItems = [
    {
      name: '采集平台',
      onPress: () =>
        dispatch({
          type: 'drawerShowFlg',
          payload: Math.random().toString(36).slice(-8),
        }),
    },
    {
      name: '数据记录',
    },
    {
      name: '数据列表',
    },
  ];

  return (
    <View style={[tailwind.flex1]}>
      {/* <Headerbar items={headerItems} /> */}
      <View style={styles.box}>
        <TouchableOpacity
          style={[styles.cardBtn, theme.primaryBgStyle]}
          onPress={() => toPage('Collection/DataList/BridgeList')}>
          <Icon name="bridge" size={100} />
          <Text style={tailwind.text3xl}>桥梁列表</Text>
        </TouchableOpacity>
        <View style={tailwind.mX4} />

        <TouchableOpacity
          onPress={() => toPage('Collection/DataList/ProjectList')}
          style={[styles.cardBtn, theme.primaryBgStyle]}>
          <Icon name="folder-text-outline" size={100} />
          <Text style={tailwind.text3xl}>项目列表</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function DataList() {
  const routes = [
    {
      name: 'Collection/DataList/Main',
      component: Main,
    },
    {
      name: 'Collection/DataList/ProjectList',
      component: ProjectList,
    },
    {
      name: 'Collection/DataList/ProjectDetail',
      component: ProjectDetail,
    },
    {
      name: 'Collection/DataList/BridgeList',
      component: BridgeList,
    },
    {
      name: 'Collection/DataList/BridgeDetail',
      component: BridgeDetail,
    },
  ];
  return <NavigatorStack routes={routes} />;
}

const styles = StyleSheet.create({
  box: {
    ...tailwind.flex1,
    ...tailwind.flexRow,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
  },
  cardBtn: {
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
    ...tailwind.rounded,
    ...tailwind.shadow2xl,
    ...tailwind.pX24,
    ...tailwind.pY20,
  },
});
