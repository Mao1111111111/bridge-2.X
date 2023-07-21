/* 
  桥梁表单--其他属性
 */
import React from 'react';
import {View, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {tailwind} from 'react-native-tailwindcss';
import {Context} from './Provider';
import {KeyboardInput} from '../../../../components/Input';
import Select from '../../../../components/Select';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';
import {Context as ThemeContext} from '../../../../providers/ThemeProvider';
import styles from './styles';

export default function Other({navigation}) {
  // 桥梁全局参数
  const {state, dispatch} = React.useContext(Context);

  // 全局参数
  const {state: globalState} = React.useContext(GlobalContext);

  // 全局样式
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  // 桥梁全局参数 -- 表单值
  const {values} = state;

  // 全局参数 -- 支座编号、桥台形式、翼墙耳墙、桥墩形式、照明系统
  const {bridgepadno, bridgeabutment, bridgewall, bridgepier, bridgelightsys} =
    globalState;

  // 页面聚焦时
  useFocusEffect(
    React.useCallback(() => {
      // 重置顶部标题
      dispatch({
        type: 'headerItems',
        payload: [
          // {
          //   name: '桥梁创建',
          //   onPress: () => navigation.navigate('Collection/Bridge/Base'),
          // },
          {
            name: '其他属性',
          },
        ],
      });
      // 重置顶部标签
      dispatch({
        type: 'pid',
        payload: 'P1202',
      });
      // 重置底部类型
      dispatch({
        type: 'footBarType',
        payload: 'notRoot',
      });
    }, [dispatch, navigation]),
  );

  // 当数据变化时，存入 桥梁全局参数的 表单对象
  const handleChange = ({name, value}) => {
    dispatch({
      type: 'values',
      payload: {
        ...values,
        [name]: value,
      },
    });
  };

  return (
    <View
      style={[
        tailwind.m2,
        tailwind.p2,
        styles.card,
        theme.primaryBgStyle,
        tailwind.flex1,
      ]}>
      {/* 顶部 */}
      <Text style={[tailwind.fontBold]}>----构件配置相关参数----{'>'}</Text>
      {/* 内容 */}
      <View>
        <View style={[tailwind.flexRow, tailwind.mY2, tailwind.itemsCenter]}>
          <KeyboardInput
            style={[tailwind.mR2, tailwind.flex1]}
            LabelStyle={tailwind.w16}
            name="b200001num"
            value={values.b200001num || '2'}
            label="桥台数:"
            onChange={handleChange}
          />
          <KeyboardInput
            style={[tailwind.mR2, tailwind.flex1]}
            name="b200002num"
            label="桥墩数:"
            LabelStyle={tailwind.w24}
            value={values.b200002num || ''}
            onChange={handleChange}
          />
          <KeyboardInput
            style={[tailwind.flex1]}
            name="b100001num"
            label="梁片数:"
            LabelStyle={tailwind.w16}
            value={values.b100001num || ''}
            onChange={handleChange}
          />
          <Text style={[tailwind.mL4, styles.flex2]}>
            *单跨片数，用于构件编号规则中，梁的编号
          </Text>
        </View>
        <View style={[tailwind.flexRow, tailwind.mY2, tailwind.itemsCenter]}>
          <KeyboardInput
            style={[tailwind.mR2, tailwind.flex1]}
            name="b300003num"
            type="numeric"
            label="人行道数:"
            LabelStyle={tailwind.w16}
            value={values.b300003num || ''}
            onChange={handleChange}
          />
          <KeyboardInput
            style={[tailwind.mR2, tailwind.flex1]}
            name="b300002num"
            type="numeric"
            LabelStyle={tailwind.w24}
            label="伸缩装置数:"
            value={values.b300002num || ''}
            onChange={handleChange}
          />
          <KeyboardInput
            style={[tailwind.flex1]}
            name="b100002num"
            type="numeric"
            label="横隔板数:"
            LabelStyle={tailwind.w16}
            value={values.b100002num || ''}
            onChange={handleChange}
          />
          <Text style={[tailwind.mL4, styles.flex2]}>*梁间横隔板数</Text>
        </View>
        <View style={[tailwind.flexRow, tailwind.mY2, tailwind.itemsCenter]}>
          <Select
            labelName="paramname"
            valueName="paramid"
            values={bridgelightsys}
            onChange={handleChange}
            style={[tailwind.mR2, tailwind.flex1]}
            name="bridgelightsys"
            value={values.bridgelightsys || ''}
            label="照明系统:"
          />
          <Select
            style={[tailwind.mR2, tailwind.flex1]}
            labelName="paramname"
            valueName="paramid"
            values={bridgewall}
            onChange={handleChange}
            name="bridgewall"
            value={values.bridgewall || ''}
            label="翼墙、耳墙:"
          />
          <Select
            style={[styles.flex2]}
            values={bridgepadno}
            labelName="paramname"
            valueName="paramid"
            onChange={handleChange}
            name="bridgepadno"
            value={values.bridgepadno || ''}
            label="支座编号:"
          />
        </View>
        <View style={[tailwind.flexRow, tailwind.mY2, tailwind.itemsCenter]}>
          <KeyboardInput
            style={[tailwind.flex1]}
            name="zhizuo_total"
            type="numeric"
            label="支座数:"
            LabelStyle={tailwind.w16}
            value={values.zhizuo_total || ''}
            onChange={handleChange}
          />
          <Text style={[tailwind.mL4, tailwind.flex1]}>
            *单片梁在每个墩或台上的支座数
          </Text>
        </View>
        <View style={[tailwind.flexRow, tailwind.mY2, tailwind.itemsCenter]}>
          <KeyboardInput
            style={[tailwind.flex1]}
            name="bridgepadstr"
            label="桥联组合:"
            LabelStyle={tailwind.w16}
            value={values.bridgepadstr || ''}
            onChange={handleChange}
          />
          <Text style={[tailwind.mL4, tailwind.flex1]}>
            *请填写2+4+6格式，连续梁时使用规则
          </Text>
        </View>
        <View style={[tailwind.flexRow, tailwind.mY2, tailwind.itemsCenter]}>
          <Select
            style={[tailwind.flex1]}
            values={bridgeabutment}
            name="bridgeabutment"
            label="桥台形式:"
            labelName="paramname"
            valueName="paramid"
            LabelStyle={tailwind.w16}
            value={values.bridgeabutment || ''}
            onChange={handleChange}
          />
          <Text style={[tailwind.mL4, tailwind.flex1]}>
            *例如：重力式桥台，构件由 台身、台帽 构成
          </Text>
        </View>
        <View style={[tailwind.flexRow, tailwind.mY2, tailwind.itemsCenter]}>
          <Select
            style={[tailwind.flex1]}
            values={bridgepier}
            name="bridgepier"
            labelName="paramname"
            valueName="paramid"
            label="桥墩形式:"
            LabelStyle={tailwind.w16}
            value={values.bridgepier || ''}
            onChange={handleChange}
          />
          <Text style={[tailwind.mL4, tailwind.flex1]}>
            *例如：柱式桥，构件由 墩柱、盖梁 构成
          </Text>
        </View>
        {values.bridgeabutment === 'abutment101' && (
          <View style={[tailwind.flexRow, tailwind.mY2, tailwind.itemsCenter]}>
            <KeyboardInput
              style={[tailwind.flex1]}
              name="qiaotaizhushu"
              label="桥台柱数:"
              LabelStyle={tailwind.w16}
              value={values.qiaotaizhushu || ''}
              onChange={handleChange}
            />
            <Text style={[tailwind.mL4, tailwind.flex1]} />
          </View>
        )}
        {values.bridgepier === 'pier100' && (
          <View style={[tailwind.flexRow, tailwind.mY2, tailwind.itemsCenter]}>
            <KeyboardInput
              style={[tailwind.flex1]}
              name="qiaodunzhushu"
              label="桥墩柱数:"
              LabelStyle={tailwind.w16}
              value={values.qiaodunzhushu || ''}
              onChange={handleChange}
            />
            <Text style={[tailwind.mL4, tailwind.flex1]} />
          </View>
        )}

        {values.bridgeabutment === 'abutment107' && (
          <View style={[tailwind.flexRow, tailwind.mY2, tailwind.itemsCenter]}>
            <KeyboardInput
              style={[tailwind.flex1]}
              name="leibanshu"
              label="肋板数:"
              LabelStyle={tailwind.w16}
              value={values.leibanshu || ''}
              onChange={handleChange}
            />
            <Text style={[tailwind.mL4, tailwind.flex1]} />
          </View>
        )}
      </View>
      {/* <Divider /> */}
    </View>
  );
}
