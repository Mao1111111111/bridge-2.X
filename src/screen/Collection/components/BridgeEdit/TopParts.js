import React from 'react';
import {tailwind} from 'react-native-tailwindcss';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Context} from './Provider';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';
import {Context as ThemeContext} from '../../../../providers/ThemeProvider';
import {Goujian, BujianRow, BujianCheckbox} from './components';
import Button from '../../../../components/Button';
import {listToPage} from '../../../../utils/common';
import styles from './styles';

export default function TopParts({navigation}) {
  const {
    dispatch,
    state: {values, memberInfo, topPartsData},
  } = React.useContext(Context);

  const {
    state: {type},
  } = React.useContext(GlobalContext);

  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const [checked, setChecked] = React.useState({});

  const [memberRow, setMemberRow] = React.useState([]);

  const pCode = 'b10';

  useFocusEffect(
    React.useCallback(() => {
      if (!memberInfo) {
        return;
      }
      const code = {
        position: '上部结构',
        pCode,
      };
      const list = memberInfo[pCode] || [];
      list.forEach(item => (code[item.membertype] = item.membertype));
      setMemberRow(listToPage(list, 2));
      setChecked(values?.top || {});
    }, [values, memberInfo]),
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch({
        type: 'footBarType',
        payload: 'notRoot',
      });
      dispatch({
        type: 'headerItems',
        payload: [
          {
            name: '桥梁创建',
            onPress: () => navigation.navigate('Collection/Bridge/Base'),
          },
          {
            name: '上部结构',
          },
        ],
      });
      dispatch({
        type: 'pid',
        payload: 'P1203',
      });
      dispatch({
        type: 'footBarType',
        payload: 'notRoot',
      });
    }, [dispatch, navigation]),
  );

  const handleCheck = name => {
    const _checked = {...checked};
    _checked[name] = !_checked[name];
    const only1 = ['b100001', 'b100006'];
    const only2 = ['b100003', 'b100007', 'b100005'];
    if (only1.find(item => name === item)) {
      only1
        .filter(item => name !== item)
        .forEach(item => (_checked[item] = false));
    }
    if (only2.find(item => name === item)) {
      only2
        .filter(item => name !== item)
        .forEach(item => (_checked[item] = false));
    }
    setChecked(_checked);
    dispatch({
      type: 'values',
      payload: {
        ...values,
        top: _checked,
      },
    });
  };

  const handleCheckAll = () => {
    const _checked = {
      b100001: true,
      b100006: false,
      b100003: true,
      b100004: true,
      b100007: false,
      b100002: true,
      b100005: false,
    };
    setChecked(_checked);
    dispatch({
      type: 'values',
      payload: {
        ...values,
        top: _checked,
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
            <BujianRow label="桥台数" value={values.b200001num || 0} />
            <BujianRow label="桥墩数" value={values.b200002num || 0} />
            <BujianRow label="单跨梁片数" value={values.b100001num || 0} />
            <BujianRow label="横隔板数" value={values.b100002num || 0} />
            <BujianRow
              label="单片梁或墩台上支座数"
              value={values.zhizuo_total || 0}
            />
          </View>
        </View>
      </View>
      <View
        style={[
          tailwind.p2,
          tailwind.mL2,
          styles.card,
          styles.flex2,
          theme.primaryBgStyle,
        ]}>
        <View style={[tailwind.flex1]}>
          <ScrollView>
            {memberInfo[pCode]?.map((item, index) => (
              <Goujian
                key={index}
                title={item.membername}
                list={
                  topPartsData && topPartsData[item.membertype]
                    ? topPartsData[item.membertype]
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
