import React from 'react';
import {tailwind} from 'react-native-tailwindcss';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Context} from './Provider';
import {Context as ThemeContext} from '../../../../providers/ThemeProvider';
import {Box, Content} from '../../../../components/CommonView';
import {RadioGroup} from '../../../../components/Radio';
import LabelItem from '../../../../components/LabelItem';
import Checkbox from '../../../../components/Checkbox';
import {TextInput, KeyboardInput} from '../../../../components/Input';
import Select from '../../../../components/Select';
import HeaderTabs from './HeaderTabs';
import Media from './Media';
import ScaleInfo from './ScaleInfo';
import * as hooks from './DiseaseHooks';
import {DiseaseA, DiseaseB, DiseaseC, DiseaseD, DiseaseE, DiseaseK, DiseaseG, DiseaseH} from '../DiseaseList/disease01'

export default function DiseaseEdit2({route, navigation}) {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const {dispatch} = React.useContext(Context);

  const [pageType, setPageType] = React.useState('数据');

  const [diseaseData, setDiseaseData] = React.useState();

  const saveData = React.useRef(null);

  const scaleInfoRef = React.useRef();

  const [baseData, itemData, version, headerItems] = hooks.useP1002Init({
    route,
    navigation,
  });

  const {
    state: {project, bridge, fileList, isLoading, groupList},
  } = React.useContext(Context);

  const [areaparam, areanode] = hooks.useArea({diseaseData, baseData});

  const infoList = hooks.useInfoComponents({diseaseData, baseData});

  const defaultFileName = hooks.useDefaultFileName({diseaseData, baseData});

  const [pileTitle, setPileTitle] = React.useState('');
  const [pileNum, setPileNum] = React.useState('');

  const [scale, scaleInfo] = hooks.useScale({
    diseaseData,
    typeList: route.params?.type?.list,
    baseData,
  });

  React.useEffect(() => {
    setDiseaseData(itemData);
  }, [itemData]);


  React.useEffect(() => {
    saveData.current = {...diseaseData};
  }, [diseaseData]);

  React.useEffect(() => {
    // route内容为DiseaseList文件handleModelCallBack传入的data数据
    // console.log('route', route);
    // console.log('当前选择的membertype： ', route.params.routeParams.membertype + ' - ' + route.params.routeParams.title);
    // console.log('params: ', route.params.data);
    return () => {
      if (version) {
        const {memberList, type, dataGroupId} = route.params;
        let datas = [];
        const item = baseData.infoComponents.find(
          ({checktypeid}) => saveData.current.checktypeid === checktypeid,
        );
        if (item && item.datastr && item.datastr.length > 0) {
          datas = item.datastr
            .map(key =>
              baseData.membercheckdata.find(({strid}) => strid === key),
            )
            .filter(it => !!it);
        }
        const str = datas
          .map(
            ({strname, strvalue, strunit}) =>
              `${strname}${saveData.current[strvalue] || 0}@@${
                strunit || ''
              }@@`,
          )
          .join(',');
        let scalegroupid = '';
        if (baseData.scale && baseData.scale.length) {
          scalegroupid =
            baseData.scale.find(
              ({checktypeid}) => saveData.current.checktypeid === checktypeid,
            )?.scalegroupid || '';
        }
        const jsondata = {
          ...saveData.current,
          checktypegroupid: type.checktypegroupid,
          scalegroupid,
          remark: `${
            baseData.infoComponents.find(
              ({checktypeid}) => saveData.current.checktypeid === checktypeid,
            )?.checkinfoshort || ''
          }，${str}`,
        };
        delete jsondata.current;
        const list = memberList.map(it => ({
          ...it,
          memberstatus: '200',
          mian: jsondata.main,
          datatype: 'c1001',
          jsondata,
          dataGroupId,
          version,
        }));
        dispatch({type: 'isLoading', payload: true});
        dispatch({type: 'cachePartsList', payload: list});
      }
    };
  }, [baseData, saveData, version, route.params, dispatch]);

  React.useEffect(()=>{
    // console.log('routeroute9 jsondata:', route.params.memberList[0].membername);
    // console.log('构件:', route.params.title);
    setPileTitle(route.params.title)
    // console.log('桩号:', route.params.memberList[0].membername);
    setPileNum(route.params.memberList[0].membername)
    // console.log('memberLength:', route.params.data.jsondata.memberLength);
    let list = []
    if(baseData.membercheckdata&&route.params.thridData){
      route.params.thridData.datastr.forEach(item=>{
        let data = baseData.membercheckdata.find(({strid}) => strid === item)
        list.push(data)
      })
      //这里的list就是字段数据
      // console.log("listlistlist",list);
    }
    // console.log('route.params.jsondata::::',route.params.data.jsondata);
  },[baseData])
  // const handleFormChenge = ({name, value}) => {
  //   const _data = {
  //     ...diseaseData,
  //     [name]: value,
  //   };
  //   if (name === 'checktypeid') {
  //     const _type = route.params.type.list.find(
  //       item => value === item.checktypeid,
  //     );
  //     let defaultScaleVal = '';
  //     if (_type) {
  //       defaultScaleVal = _type?.standardscale;
  //     }
  //     _data.scale = defaultScaleVal;
  //     const {basestandardtable, infoComponents} = baseData;
  //     const standardid =
  //       infoComponents.find(({checktypeid}) => value === checktypeid)
  //         ?.standardid || '';
  //     if (standardid) {
  //       const _standardscale = basestandardtable.find(
  //         item => standardid === item.standardid,
  //       )?.standardscale;
  //       if (_standardscale) {
  //         _data.standard = {
  //           scale: _standardscale,
  //           id: standardid,
  //         };
  //       } else {
  //         const defaultScale = basestandardtable.find(
  //           item => item.standardid === 'JTG-TH21-2011-T000-0',
  //         )?.standardscale;
  //         _data.standard = {
  //           scale: defaultScale,
  //           id: 'JTG-TH21-2011-T000-0',
  //         };
  //       }
  //     }
  //     _data.scale = _data.scale || '';
  //   }
  //   setDiseaseData(_data);
  // };

  const handleScaleOpen = () => scaleInfoRef.current.open();

  // 回退
  const goBack = () => {
    console.log('点击了goBack');
    try {
      navigation.goBack()
    } catch (e) {
      console.log('goBack err', e);
    }
  }
  // 向前
  const goAhead = () => {
    console.log('点击了goAhead');
  }

  return (
    <Box headerItems={headerItems} navigation={navigation} pid="P1604" labelname={route.params.title} membername={route.params.memberList[0].membername} project={project.projectname} bridge={bridge.bridgename}>
      <HeaderTabs
        onChangeTab={setPageType}
        disabled={route.params.memberList.length > 1}
      />
      <View
        style={[
          pageType === '数据'
            ? {
                ...tailwind.hidden,
                ...tailwind.opacity0,
              }
            : tailwind.flex1,
        ]}>
        <Media
          type="diseaseParts"
          dataid={version}
          defaultFileName={defaultFileName}
          pileTitle={pileTitle}
          pileNum={pileNum}
          categoryList={[
            {
              value: 'disease',
              label: '病害照片',
            },
          ]}
        />
      </View>
      <View
        style={[
          pageType !== '数据'
            ? {
                ...tailwind.hidden,
                ...tailwind.opacity0,
              }
            : tailwind.flex1,
        ]}>
        <Content
        // onAdd={false}
        onBack={goBack}
        >
          <View style={[styles.card, {backgroundColor:'rgba(255,255,255,1)',right:11.5,width:715,top:1,borderRadius:5}]}>
          
            <View style={[tailwind.flex1]}>
              <View style={tailwind.flexRow}>
                <View style={tailwind.mX2} />
                {/* ================================================= */}
                {/* 引入不同病害填写页面 */}
                  <View>
                    {/* 主梁 - */}
                  {route.params.routeParams.membertype == 'b100001' ||
                  // 挂梁 -
                  route.params.routeParams.membertype == 'b100006' ?
                  <DiseaseA route={route} navigation={navigation} diseaseData={diseaseData} /> :
                  // 横隔板 -
                  route.params.routeParams.membertype == 'b100002' ||
                  // 支座 -
                  route.params.routeParams.membertype == 'b100004' ||
                  // 墩台基础 -
                  route.params.routeParams.membertype == 'b200003' ||
                  // 翼墙、耳墙 -
                  route.params.routeParams.membertype == 'b200004' ||
                  // 河床 -
                  route.params.routeParams.membertype == 'b200006' ||
                  // 调治构造物 -
                  route.params.routeParams.membertype == 'b200007' ||
                  // 伸缩缝装置 -
                  route.params.routeParams.membertype == 'b300002' ||
                  // 人行道 -
                  route.params.routeParams.membertype == 'b300003' ||
                  // 栏杆、护栏 - 
                  route.params.routeParams.membertype == 'b300004' ||
                  // 排水系统 - 
                  route.params.routeParams.membertype == 'b300005' ? 
                  <DiseaseB route={route} navigation={navigation} diseaseData={diseaseData} /> :
                  // 湿接段 -
                  route.params.routeParams.membertype == 'b100003' ||
                  // 铰缝 -
                  route.params.routeParams.membertype == 'b100005' ||
                  // 湿接缝 -
                  route.params.routeParams.membertype == 'b100007' ?
                  <DiseaseC route={route} navigation={navigation} diseaseData={diseaseData} /> :
                  // 桥面铺装 -
                  route.params.routeParams.membertype == 'b300001' ?
                  <DiseaseK route={route} navigation={navigation} diseaseData={diseaseData} /> :
                  // 桥台 - 
                  route.params.routeParams.membertype == 'b200001' ?
                  <DiseaseG route={route} navigation={navigation} diseaseData={diseaseData} /> :
                  // 桥墩 -
                  route.params.routeParams.membertype == 'b200002' ?
                  <DiseaseH route={route} navigation={navigation} diseaseData={diseaseData} /> :
                  // 锥坡、护坡 - 
                  route.params.routeParams.membertype == 'b200005' ?
                  <DiseaseD route={route} navigation={navigation} diseaseData={diseaseData} /> :
                  // 照明、标志
                  route.params.routeParams.membertype == 'b300006' ?
                  <DiseaseE route={route} navigation={navigation} diseaseData={diseaseData} /> :
                  <></>
                  }
                </View>
                
                {/* ================================================= */}
                <View style={tailwind.mX2} />
              </View>
            </View>
          </View>
        </Content>
      </View>
      <ScaleInfo ref={scaleInfoRef} info={scaleInfo} />
    </Box>
  );
}

const styles = StyleSheet.create({
  card: {
    ...tailwind.flex1,
    ...tailwind.shadow2xl,
    ...tailwind.rounded,
    ...tailwind.p2,
  },
  title: {
    ...tailwind.fontBold,
    ...tailwind.mB2,
  },
  tableBox: {
    ...tailwind.flex1,
    ...tailwind.borderGray400,
    ...tailwind.border,
  },
  image: {
    ...tailwind.hFull,
  },
  flex2: {
    flex: 2,
  },
  checkboxRow: {
    ...tailwind.flexRow,
    ...tailwind.flex1,
    ...tailwind.justifyEnd,
  },
  width110: {
    width: 110,
  },
});
