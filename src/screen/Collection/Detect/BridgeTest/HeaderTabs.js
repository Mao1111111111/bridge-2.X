/* 
  桥梁检测页面的 顶部tab
  年份tab + 数据/影音tab
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {tailwind} from 'react-native-tailwindcss';
import Tabs from '../../../../components/Tabs';

export default function HeaderTabs({onChangeTab, style, disabled}) {
  const yaer = [
    {
      key: '2020',
      name: '2020',
    },
    {
      key: '2021',
      name: '2021',
    },
    {
      key: '2022',
      name: '2022',
    },
  ];

  const page = [
    {
      key: '数据',
      name: '数据',
    },
    {
      key: '影音',
      name: '影音',
    },
  ];

  return (
    <View style={[styles.tabsBox, style]}>
      {/* 年份tabs */}
      {/* <Tabs style={[tailwind.mB1,{position:'absolute',left:80}]} defaultActive="2022" tabs={yaer} /> */}
      {/* 数据影音tabs */}
      <Tabs
        tabs={page}
        type="button"
        disabled={disabled}
        defaultActive="数据"
        style={[tailwind.mB1, tailwind.mR1, {position:'absolute',right:80}]}
        // 点击tab时
        onChangeTab={onChangeTab}
        // 数据与影音切换按钮加宽加高
        btnStyle={[tailwind.pX6,{height:35,display:'flex',justifyContent:'center',alignItems:'center'}]}
      />
      <View style={[tailwind.mY4]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsBox: {
    ...tailwind.justifyBetween,
    ...tailwind.itemsCenter,
    ...tailwind.flexRow,
    ...tailwind.pX16,
    ...tailwind.pT2,
  },
});
