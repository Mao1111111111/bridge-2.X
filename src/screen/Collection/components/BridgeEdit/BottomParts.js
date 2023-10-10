/* 
  桥梁表单--下部结构
 */
import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {tailwind} from 'react-native-tailwindcss';
import {Context} from './Provider';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';
import {Context as ThemeContext} from '../../../../providers/ThemeProvider';
import Button from '../../../../components/Button';
import {Goujian, BujianRow, BujianCheckbox} from './components';
import {listToPage} from '../../../../utils/common';
import styles from './styles';

export default function BottomParts({navigation}) {
  // 桥梁全局参数
  const {dispatch, state} = React.useContext(Context);

  // 全局参数
  const {
    state: {type, bridgeabutment, bridgepier, bridgewall},
  } = React.useContext(GlobalContext);

  // 全局样式
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  // 当前选中的 -- 多选
  const [checked, setChecked] = React.useState({});

  // 部件数据 -- 一行两个进行处理
  const [memberRow, setMemberRow] = React.useState([]);

  // 下部部件 编号
  const pCode = 'b20';

  // 桥梁全局参数 -- 表单对象、全部的构件信息，并按 b10 b20 b30 分组、下部部件数据
  const {values, memberInfo, bottomPartsData} = state;

  // 页面聚焦时 -- 处理下部部件数据
  useFocusEffect(
    React.useCallback(() => {
      if (!memberInfo) {
        return;
      }
      const code = {
        position: '下部结构',
        pCode,
      };
      const list = memberInfo[pCode] || [];
      list.forEach(item => (code[item.membertype] = item.membertype));
      setMemberRow(listToPage(list, 2));
      setChecked(values?.bottom || {});
      console.log('下部结构memberInfo1',bottomPartsData);
    }, [values, memberInfo]),
  );

  React.useEffect(() => {
    // console.log('下部结构values',values);
  },[])

  // 页面聚焦时 -- 处理页面配置
  useFocusEffect(
    React.useCallback(() => {
      dispatch({
        type: 'headerItems',
        payload: [
          {
            name: '桥梁创建',
            onPress: () => navigation.navigate('Collection/Bridge/Base'),
          },
          {
            name: '下部结构',
          },
        ],
      });
      dispatch({
        type: 'pid',
        payload: 'P1204',
      });
      dispatch({
        type: 'footBarType',
        payload: 'notRoot',
      });
    }, [dispatch, navigation]),
  );

  // 选中时，将数据存入 桥梁全局参数的 values
  const handleCheck = name => {
    const _checked = {...checked};
    _checked[name] = !_checked[name];
    setChecked(_checked);
    dispatch({
      type: 'values',
      payload: {
        ...values,
        bottom: _checked,
      },
    });
  };

  // 全选，将数据存入 桥梁全局参数的 values
  const handleCheckAll = () => {
    const _checked = {
      b200004: true,
      b200005: true,
      b200002: true,
      b200001: true,
      b200003: true,
      b200006: true,
      b200007: true,
    };
    dispatch({
      type: 'values',
      payload: {
        ...values,
        bottom: _checked,
      },
    });
  };

  return (
    <View style={[tailwind.m2, tailwind.flexGrow, tailwind.flexRow]}>
      <View
        style={[
          tailwind.flex1,
          tailwind.p2,
          styles.card,
          theme.primaryBgStyle,
        ]}>
        <Text style={[tailwind.fontBold, theme.primaryTextStyle]}>
          {type?.find(it => it.value === values.type)?.label || '梁式桥'}
        </Text>
        <View
          style={[
            tailwind.mT2,
            tailwind.borderGray400,
            tailwind.borderT,
            tailwind.borderL,
          ]}>
          {memberRow?.map((item, index) => (
            <View style={[tailwind.flexRow]} key={index}>
              {item?.map((it, inx) => (
                <BujianCheckbox
                  key={inx}
                  label={it.membername}
                  onCheck={() => handleCheck(it.membertype)}
                  checked={checked[it.membertype]}
                />
              ))}
            </View>
          ))}
        </View>
        <View style={[tailwind.flexRow, tailwind.mY2, tailwind.justifyBetween]}>
          <Button onPress={handleCheckAll}>全选</Button>
        </View>
        <View style={[tailwind.justifyEnd, tailwind.flexGrow]}>
          <View
            style={[
              tailwind.borderX,
              tailwind.borderT,
              tailwind.borderGray400,
            ]}>
            <View style={[tailwind.borderB, tailwind.borderGray400]}>
              <Text
                style={[
                  tailwind.m1,
                  tailwind.fontBold,
                  theme.primaryTextStyle,
                ]}>
                编号规则依据：
              </Text>
            </View>
            <View>
              <BujianRow label="桥台数" value={values.b200001num || 0} />
              <BujianRow label="桥墩数" value={values.b200002num || 0} />
              <BujianRow
                label="翼墙、耳墙"
                value={
                  bridgewall?.find(item => item.paramid === values.bridgewall)
                    ?.paramname || bridgewall[0].paramname
                }
              />
              <BujianRow
                label="桥台形式"
                value={
                  bridgeabutment?.find(
                    it => it.paramid === state.values.bridgeabutment,
                  )?.paramname || ''
                }
              />
              <BujianRow
                label="桥墩形式"
                value={
                  bridgepier?.find(it => it.paramid === state.values.bridgepier)
                    ?.paramname || ''
                }
              />
            </View>
          </View>
        </View>
      </View>
      <View
        style={[
          tailwind.p2,
          tailwind.mL2,
          styles.flex2,
          styles.card,
          theme.primaryBgStyle,
        ]}>
        <View style={[tailwind.flex1]}>
          <ScrollView>
            {memberInfo[pCode]?.map((item, index) => (
              <Goujian
                key={index}
                title={item.membername}
                list={
                  bottomPartsData && bottomPartsData[item.membertype]
                    ? bottomPartsData[item.membertype]
                    : []
                }
                isShow={checked[item.membertype]}
              />
            ))}
          </ScrollView>
        </View>
        <View style={tailwind.flexRow}>
          <Text>备注:构件编号规则源于桥梁的</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Collection/Bridge/Other')}>
            <Text style={[theme.primaryTextStyle]}>其他配置属性</Text>
          </TouchableOpacity>
          <Text>，若规则不准确请修改配置数据</Text>
        </View>
      </View>
    </View>
  );
}
