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
  const {dispatch, state} = React.useContext(Context);

  const {
    state: {type, bridgeabutment, bridgepier, bridgewall},
  } = React.useContext(GlobalContext);

  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const [checked, setChecked] = React.useState({});

  const [memberRow, setMemberRow] = React.useState([]);

  const pCode = 'b20';

  const {values, memberInfo, bottomPartsData} = state;

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
    }, [values, memberInfo]),
  );

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
