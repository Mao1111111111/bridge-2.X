import React from 'react';
import uuid from 'react-native-uuid';
import {Chip} from 'react-native-paper';
import {tailwind} from 'react-native-tailwindcss';
import {View, Text, StyleSheet,Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Context} from './Provider';
import {Context as ThemeContext} from '../../../../providers/ThemeProvider';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';
import * as partsCheckstatusData from '../../../../database/parts_checkstatus_data';
import {Textarea} from '../../../../components/Input';
import {Box, Content} from '../../../../components/CommonView';
import Media from './Media';
import HeaderTabs from './HeaderTabs';
import * as editLog from '../../../../database/edit_log';
import dayjs from 'dayjs';

export default function GoodEdit({route, navigation}) {
  // 主题
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  // 桥幅属性、用户信息
  const {
    state: {bridgeside, userInfo},
  } = React.useContext(GlobalContext);

  // 项目信息、桥梁信息
  const {
    state: {project, bridge},
    dispatch,
  } = React.useContext(Context);

  const [pageType, setPageType] = React.useState('数据');

  const [data, setData] = React.useState('');

  const [version, setVersion] = React.useState('');

  const remarkRef = React.useRef();

  const {title, list} = route.params;

  // 是否编辑备注
  const [editRemarks,setEditRemarks] = React.useState(false)

  // 设置版本号
  useFocusEffect(React.useCallback(() => setVersion(uuid.v4()), []));

  const [screenWidth,setScreenWidth] = React.useState() //屏幕宽度

  // 进入标记良好界面就将编辑记录存入数据库
  React.useEffect(()=>{
    list.forEach(item =>
      editLog.save({
        projectid: project.projectid,
        bridgeid: bridge.bridgeid,
        title: item.membername,
        page_key: '标记为良好',
        userid: userInfo.userid,
        binddate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }),
    );

    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
  },[])

  // 初始化数据 -- 有问题
  useFocusEffect(
    React.useCallback(() => {
      // 获取备注信息
      partsCheckstatusData
      .getByDataid(list[0].memberid)
      .then(res => {
        if ((res.length>0)&&res[0].memberstatus!=='200') {
          const {remark} = JSON.parse(res[0].jsondata);
          setData(remark?{remark}:{});
          remarkRef.current.setValue(remark);
        }else{
          setData({});
          remarkRef.current.setValue('');
        }
      });
    }, [list, version]),
  );

  // 退出时保存数据
  useFocusEffect(
    React.useCallback(() => {
      if (!version) {
        return;
      }
      return  () => {
        handleSave()
      };
    }, [dispatch,data,list, version,editRemarks]),
  );
  const handleSave = () => {
    if(editRemarks||data!==''){
      if (!list) {
        return;
      }
      const _list = [...list];
      _list.forEach(item => {
        item.memberstatus = '100';
        item.jsondata = data;
      });
      dispatch({type: 'cachePartsList', payload: _list});
    }
  };

  const getHeaderItems = () => {
    let paramname = '';
    if (bridgeside && bridge) {
      paramname =
        bridgeside.find(item => bridge.bridgeside === item.paramid)
          ?.paramname || '';
    }
    return [
      {
        name: 'home',
        isIcon: true,
        onPress: () => navigation.navigate('Collection/Detect/Project'),
      },
      {
        name: `${project.projectname}`,
        onPress: () =>
          navigation.navigate('Collection/Detect/ProjectDetail', {project}),
      },
      {
        name: `${bridge.bridgestation}-${bridge.bridgename}-${paramname}`,
        onPress: () =>
          navigation.navigate('Collection/Detect/BridgeTest/Main', {
            project,
            bridge,
          }),
      },
      {
        name: title,
        onPress: () => navigation.goBack(),
      },
      {
        name: ' 标记为良好',
      },
    ];
  };

  // 回退
  const goBack = () => {
    try {
      navigation.goBack()
    } catch (e) {
      console.log('goBack err', e);
    }
  }

  return (
    <Box headerItems={getHeaderItems()} pid="P1603" navigation={navigation} route={route} projectList={project} project={project.projectname} bridge={bridge.bridgename}>
      {/* 长度等于1时，顶部年份导航 */}
      {list.length === 1 ? (
        <HeaderTabs
          onChangeTab={setPageType}
          style={pageType === '数据' ? tailwind.pX3 : tailwind.pX12}
        />
      ) : (
        <View style={tailwind.mT3} />
      )}
      <View style={[pageType === '数据' ? tailwind.hidden : tailwind.flex1]}>
        {/* 每天数据，默认存入第一个构件 */}
        <Media
          navigation={navigation}
          type="goodParts"
          dataid={list[0].memberid}
          categoryList={[
            {value: 'good', label: `良好部件:${list[0].membername}`},
          ]}
        />
      </View>
      <View style={[pageType !== '数据' ? tailwind.hidden : tailwind.flex1]}>
        <Content
          onBack={goBack}
        >
          {/* [theme.primaryBgStyle, styles.card, tailwind.flex1, {backgroundColor:'rgba(255,255,255,1)',right:11.5,width:715,top:1,borderRadius:5}] */}
          <View style={
            screenWidth > 830 ? [theme.primaryBgStyle, styles.card, tailwind.flex1, {backgroundColor:'rgba(255,255,255,1)',right:11.5,width:715,top:1,borderRadius:5}]
            :
            [theme.primaryBgStyle, styles.card, tailwind.flex1, {backgroundColor:'rgba(255,255,255,1)',right:19,width:715,top:1,borderRadius:5}]
          }>
            <View style={[tailwind.flex1, tailwind.flexRow]}>
              <View style={[styles.flex2]}>
                {/* 描述 */}
                <Textarea
                  label="描述"
                  name="remark"
                  ref={remarkRef}
                  onChange={({name, value}) => {setData({[name]: value});setEditRemarks(true)}}
                  labelStyle={[styles.title, theme.primaryTextStyle,{color:'#2b427d'}]}
                  style={{height:100,color:'#2b427d'}}
                />
              </View>
              {/* 选择的构建大于一个时，右侧构建列表 */}
              {list.length > 1 ? (
                <>
                  <View style={[tailwind.mX4]} />
                  <View style={tailwind.flex1}>
                    <Text
                      style={[
                        styles.title,
                        tailwind.mB1,
                        tailwind.mL2,
                        theme.primaryTextStyle,
                      ]}>
                      构件列表
                    </Text>
                    <View
                      style={[
                        tailwind.flex1,
                        tailwind.flexRow,
                        tailwind.flexWrap,
                      ]}>
                      {list.map(item => (
                        <Chip key={item.id} style={styles.chip} mode="outlined">
                          {item.membername}
                        </Chip>
                      ))}
                    </View>
                  </View>
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
        </Content>
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  card: {
    ...tailwind.flex1,
    ...tailwind.shadow2xl,
    ...tailwind.rounded,
    ...tailwind.p3,
  },
  title: {
    ...tailwind.fontBold,
    ...tailwind.textBase,
    ...tailwind.mB2,
  },
  flex2: {
    flex: 2,
  },
  chip: {
    ...tailwind.h8,
    ...tailwind.m1,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
  },
});
