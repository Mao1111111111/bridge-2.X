/* 
  桥梁表单--基础页面
 */
import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {tailwind} from 'react-native-tailwindcss';
import {Context} from './Provider';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';
import {Context as ThemeContext} from '../../../../providers/ThemeProvider';
import Button from '../../../../components/Button';
import {KeyboardInput, TextInput} from '../../../../components/Input';
import Select from '../../../../components/Select';
import styles from './styles';

const Row = ({title, list}) => {
  return list.length ? (
    <View style={tailwind.mB2}>
      <Text>
        {title}，{list.length}个构件
      </Text>
      <Text>{list?.map(({membername}) => membername)?.join('，')}</Text>
    </View>
  ) : (
    <></>
  );
};

export default function Base({navigation}) {
  // 桥梁全局属性
  const {state, dispatch} = React.useContext(Context);

  // 全局属性
  const {state: globalState} = React.useContext(GlobalContext);

  // 全局样式
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  // 右侧box 的 顶部tab，默认显示摘要detail
  const [tab, setTab] = React.useState('detail');

  // 桥梁全局属性 -- 表单值、上部部件、下部部件、桥面系部件、全部的构件信息，并按 b10 b20 b30 分组
  const {values, topPartsData, bottomPartsData, pmxData, memberInfo} = state;

  // 全局属性 -- 养护区列表、路线列表、桥梁类型参数、桥幅属性、功能类型
  const {areaList, routeList, bridgetype, bridgeside, bridgefunc} = globalState;

  // 路段列表
  const [areaList2,setAreaList2] = React.useState([])
  // 路线列表
  const [routeList2,setRouteList] = React.useState([])

  // 页面聚焦时，设置桥梁全局属性
  useFocusEffect(
    React.useCallback(() => {
      // 设置顶部导航 -- 这里值设置 桥梁创建 这个标题
      dispatch({
        type: 'headerItems',
        payload: [{name: '桥梁创建', onPress: () => {}}],
      });
      // 设置顶部导航左侧标签
      dispatch({
        type: 'pid',
        payload: 'P1201',
      });
      // 设置底部类型
      dispatch({
        type: 'footBarType',
        payload: 'root',
      });
      // 设置路段列表
      let _areaList = []
      areaList.forEach(item=>{
        _areaList.push({
          ...item,
          label:item.name,
          name:'areacode'
        })
      })
      setAreaList2(_areaList)
      // 设置路线列表
      let _routeList = []
      routeList.forEach(item=>{
        _routeList.push({
          ...item,
          label:item.name,
          name:'routecode'
        })
      })
      setRouteList(_routeList)
    }, [dispatch]),
  );

  const handleChange = ({name,value}) => {
    // 当表单值变化时，修改 桥梁全局参数 中的 表单值
    if (name === 'bridgetype') {
      dispatch({
        type: 'values',
        payload: {
          ...values,
          [name]: value,
          bridgestruct: globalState[`bridgestruct_${value}`][0].paramid,
        },
      });
    } else {
      dispatch({
        type: 'values',
        payload: {
          ...values,
          [name]: value,
        },
      });
    }
  };

  return (
    <View style={[tailwind.flexRow, tailwind.p2, tailwind.flex1]}>
      {/* 左侧 */}
      <View style={[tailwind.flex1, tailwind.flexGrow]}>
        <View
          style={[
            styles.card,
            theme.primaryBgStyle,
            tailwind.p2,
            tailwind.pX2,
            tailwind.flexCol,
            tailwind.flex1,
          ]}>
          {/* 顶部 -- 标题 */}
          <Text
            style={[tailwind.fontBold, tailwind.mB1, {color:'#2b427d'}]}>
            基本属性
          </Text>
          {/* 顶部 -- 表单 */}
          <View style={[tailwind.flex1, tailwind.justifyBetween]}>
            <Select
              name="bridgetype"
              label="桥梁类型:"
              labelName="paramname"
              valueName="paramid"
              values={bridgetype}
              value={values.bridgetype}
              onChange={handleChange}
            />
            <KeyboardInput
              name="bridgestation"
              value={values.bridgestation || ''}
              label="桥梁桩号:"
              onChange={handleChange}
            />
            <TextInput
              name="bridgename"
              value={values.bridgename || ''}
              label="桥梁名称:"
              onChange={handleChange}
            />
            <Select
              name="bridgeside"
              label="桥幅属性:"
              labelName="paramname"
              valueName="paramid"
              values={bridgeside}
              value={values.bridgeside}
              onChange={handleChange}
            />
            <Select
              name="areacode"
              label="所属路段:"
              labelName="label"
              valueName="code"
              values={areaList2}
              value={values.areacode}
              onChange={handleChange}
            />
            <Select
              name="routecode"
              label="所属路线:"
              labelName="label"
              valueName="code"
              values={routeList2}
              value={values.routecode}
              onChange={handleChange}
            />
            <Select
              name="bridgefunc"
              label="功能类型:"
              labelName="paramname"
              valueName="paramid"
              values={bridgefunc}
              value={values.bridgefunc}
              onChange={handleChange}
            />
            <Select
              name="bridgestruct"
              label="结构体系:"
              labelName="paramname"
              valueName="paramid"
              values={
                globalState[`bridgestruct_${values.bridgetype || 'bridge-g'}`]
              }
              value={values.bridgestruct}
              onChange={handleChange}
            />
          </View>
          {/* 中部 -- 其他属性按钮 */}
          <View style={[tailwind.itemsEnd, tailwind.mT2]}>
            <Button
            style={[{backgroundColor:'#2b427d'}]} 
              onPress={() => navigation.navigate('Collection/Bridge/Other')}>
              其他属性
            </Button>
          </View>
          {/* 底部 -- 标题 */}
          <Text
            style={[tailwind.fontBold,{color:'#2b427d'}, tailwind.mB1]}>
            构件配置
          </Text>
          {/* 底部 -- 部件 */}
          {!values.id ? (
            // ----新增时，有上部、下部、桥面系结构
            <View style={[tailwind.flexRow, tailwind.justifyBetween]}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Collection/Bridge/Top')}
                style={[styles.cardBtn, theme.primaryBgStyle]}>
                <Text style={[tailwind.fontBold]}>上部结构</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Collection/Bridge/Bottom')}
                style={[styles.cardBtn, tailwind.mL2, theme.primaryBgStyle]}>
                <Text style={[tailwind.fontBold]}>下部结构</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Collection/Bridge/PMX')}
                style={[styles.cardBtn, tailwind.mL2, theme.primaryBgStyle]}>
                <Text style={[tailwind.fontBold]}>桥面系</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // ----编辑时，是部件列表
            <View style={[tailwind.flexRow, tailwind.justifyBetween]}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Collection/Bridge/PartsEdit')
                }
                style={[styles.cardBtn, tailwind.mL2, theme.primaryBgStyle]}>
                <Text style={[tailwind.fontBold, tailwind.textLg]}>
                  部件列表
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {/* <View style={[theme.primaryBgStyle, tailwind.p1, tailwind.pX2]} /> */}
      </View>
      {/* 右侧 */}
      <View
        style={[tailwind.mL2, styles.flex2, styles.card, theme.primaryBgStyle]}>
        <View style={[tailwind.flex1]}>
          {/* 顶部导航 */}
          <View style={[tailwind.pT4, tailwind.pX6, tailwind.flexRow]}>
            <TouchableOpacity onPress={() => setTab('detail')}>
              <View style={[tailwind.itemsCenter, tailwind.mR8]}>
                <Text
                  style={[
                    tailwind.textBase,
                    tailwind.fontBold,
                    tab === 'detail' ? {color:'#2b427d'} : {},
                  ]}>
                  摘要
                </Text>
                <View
                  style={[
                    tab === 'detail' ? {backgroundColor:'#2b427d'} : {},
                    tailwind.h1,
                    tailwind.w4,
                  ]}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTab('info')}>
              <View style={[tailwind.justifyCenter, tailwind.itemsCenter]}>
                <Text
                  style={[
                    tailwind.textBase,
                    tailwind.fontBold,
                    tab === 'info' ? {color:'#2b427d'} : {},
                  ]}>
                  解释
                </Text>
                <View
                  style={[
                    tab === 'info' ? {backgroundColor:'#2b427d'} : {},
                    tailwind.h1,
                    tailwind.w4,
                  ]}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* 内容 */}
          {tab === 'detail' ? (
            <View style={styles.textBox}>
              {/* 有滚动条 */}
              <ScrollView>
                <Text style={tailwind.mB2}>桥梁名称：{values.bridgename}</Text>
                {/* 上部 */}
                {topPartsData ? (
                  <View>
                    <Text>上部结构信息{'>>'}</Text>
                    {memberInfo?.b10?.map((item, index) => (
                      <React.Fragment key={index}>
                        {topPartsData[item.membertype] ? (
                          <Row
                            title={item.membername}
                            list={topPartsData[item.membertype]}
                          />
                        ) : (
                          <></>
                        )}
                      </React.Fragment>
                    ))}
                  </View>
                ) : (
                  <></>
                )}
                {/* 下部 */}
                {bottomPartsData ? (
                  <View>
                    <Text>下部结构信息{'>>'}</Text>
                    {memberInfo?.b20?.map((item, index) => (
                      <React.Fragment key={index}>
                        {bottomPartsData[item.membertype] ? (
                          <Row
                            title={item.membername}
                            list={bottomPartsData[item.membertype]}
                          />
                        ) : (
                          <></>
                        )}
                      </React.Fragment>
                    ))}
                  </View>
                ) : (
                  <></>
                )}
                {/* 桥面系 */}
                {pmxData ? (
                  <View>
                    <Text>桥面系结构信息{'>>'}</Text>
                    {memberInfo?.b30?.map((item, index) => (
                      <React.Fragment key={index}>
                        {pmxData[item.membertype] ? (
                          <Row
                            title={item.membername}
                            list={pmxData[item.membertype]}
                          />
                        ) : (
                          <></>
                        )}
                      </React.Fragment>
                    ))}
                  </View>
                ) : (
                  <></>
                )}
              </ScrollView>
            </View>
          ) : (
            // 解释
            <View style={styles.textBox}>
              <ScrollView />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
