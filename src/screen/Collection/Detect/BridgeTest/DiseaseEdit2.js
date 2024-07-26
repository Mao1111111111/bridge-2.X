import React from 'react';
import {tailwind} from 'react-native-tailwindcss';
import dayjs from 'dayjs';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions
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
import * as editLog from '../../../../database/edit_log';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';

export default function DiseaseEdit2({route, navigation,kuaMembertype}) {
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

  const {
    state: {userInfo},
  } = React.useContext(GlobalContext);

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

  const [screenWidth,setScreenWidth] = React.useState() //屏幕宽度

  React.useEffect(() => {
    // console.log('edit2 defaultFileName',itemData);
    setDiseaseData(itemData);
    // console.log('diseaseEdit2 kuaMembertype',scale);
    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
  }, [itemData]);

  
  React.useEffect(() => {
    const {memberList} = route.params;
    memberList.forEach(item =>
      editLog.save({
        projectid: project.projectid,
        bridgeid: bridge.bridgeid,
        title: item.membername,
        page_key: '病害录入',
        userid: userInfo.userid,
        binddate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }),
    )
  }, []);

  React.useEffect(() => {
    saveData.current = {...diseaseData};
    console.log('diseaseData',diseaseData);
  }, [diseaseData]);

  React.useEffect(() => {
    // route内容为DiseaseList文件handleModelCallBack传入的data数据
    // console.log('route', route);
    console.log('当前选择的membertype： ', route.params.routeParams.membertype + ' - ' + route.params.routeParams.title);
    console.log('桥跨进入-编辑病害',route.params.kuaMembertype);
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

  const [mediaMemberName, setMediaMemberName] = React.useState()
  const [mediaDiseaseName, setMediaDiseaseName] = React.useState()

  React.useEffect(()=>{
    // console.log('routeroute9 jsondata:', route.params.memberList[0].membername);
    // console.log('构件:', route.params.title);
    try {
      setPileTitle(route.params.title)
      // console.log('桩号:', route.params.memberList[0].membername);
      setPileNum(route.params.memberList[0].membername)
      // 传给media组件的部件名称与病害名称
      setMediaMemberName(route.params.memberList[0].membername)
      if (route.params.mediaType == 'add') {
        setMediaDiseaseName(route.params.thridData.checkinfoshort)
      } else if (route.params.mediaType == 'edit') {
        setMediaDiseaseName(route.params.data.jsondata.diseaseName)
      }
      let list = []
      if(baseData.membercheckdata&&route.params.thridData){
        route.params.thridData.datastr.forEach(item=>{
          let data = baseData.membercheckdata.find(({strid}) => strid === item)
          list.push(data)
        })
        //这里的list就是字段数据
        // console.log("listlistlist",list);
      }
    } catch (error) {
      console.log('diseaseEdit2--',error);
    }
  },[baseData])

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
    <Box headerItems={headerItems} navigation={navigation} pid="P1604" labelname={route.params.title} membername={route.params.memberList[0].membername} projectList={project} project={project.projectname} bridge={bridge}>
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
          navigation={navigation}
          type="diseaseParts"
          dataid={version}
          defaultFileName={defaultFileName}
          pileTitle={pileTitle}
          pileNum={pileNum}
          mediaMemberName={mediaMemberName}
          mediaDiseaseName={mediaDiseaseName}
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
          {/* [styles.card, {backgroundColor:'rgba(255,255,255,1)',right:11.5,width:715,top:1,borderRadius:5}] */}
          <View style={
            screenWidth > 830 ? [styles.card, {backgroundColor:'rgba(255,255,255,1)',right:27,width:715,top:1,borderRadius:5}]
            :
            [styles.card, {backgroundColor:'rgba(255,255,255,1)',right:19,width:715,top:1,borderRadius:5}]
          }>
          
            <View style={[tailwind.flex1]}>
              <View style={tailwind.flexRow}>
                <View style={tailwind.mX2} />
                {/* ================================================= */}
                {/* 引入不同病害填写页面 */}
                {/* 跨-新建 route.params.data.kuaMembertype */}
                {/* 跨-编辑 route.params.kuaMembertype */}
                  <View>
                    {/* 主梁 - */}
                  {route.params.routeParams.membertype == 'b100001' ||
                  route.params.data.kuaMembertype == 'b100001' ||
                  route.params.kuaMembertype == 'b100001' ||
                  route.params.data.kuaMembertype == 'b100006' ||
                  route.params.kuaMembertype == 'b100006' ||
                  // 挂梁 -
                  route.params.routeParams.membertype == 'b100006' ?
                  <DiseaseA route={route} navigation={navigation} diseaseData={diseaseData} /> :
                  // 横隔板 -
                  route.params.routeParams.membertype == 'b100002' ||
                  route.params.data.kuaMembertype == 'b100002' ||
                  route.params.kuaMembertype == 'b100002' ||
                  // 支座 -
                  route.params.routeParams.membertype == 'b100004' ||
                  route.params.data.kuaMembertype == 'b100004' ||
                  route.params.kuaMembertype == 'b100004' ||
                  // 墩台基础 -
                  route.params.routeParams.membertype == 'b200003' ||
                  route.params.data.kuaMembertype == 'b200003' ||
                  route.params.kuaMembertype == 'b200003' ||
                  // 翼墙、耳墙 -
                  route.params.routeParams.membertype == 'b200004' ||
                  route.params.data.kuaMembertype == 'b200004' ||
                  route.params.kuaMembertype == 'b200004' ||
                  // 河床 -
                  route.params.routeParams.membertype == 'b200006' ||
                  route.params.data.kuaMembertype == 'b200006' ||
                  route.params.kuaMembertype == 'b200006' ||
                  // 调治构造物 -
                  route.params.routeParams.membertype == 'b200007' ||
                  route.params.data.kuaMembertype == 'b200007' ||
                  route.params.kuaMembertype == 'b200007' ||
                  // 伸缩装置 -
                  route.params.routeParams.membertype == 'b300002' ||
                  route.params.data.kuaMembertype == 'b300002' ||
                  route.params.kuaMembertype == 'b300002' ||
                  // 人行道 -
                  route.params.routeParams.membertype == 'b300003' ||
                  route.params.data.kuaMembertype == 'b300003' ||
                  route.params.kuaMembertype == 'b300003' ||
                  // 栏杆、护栏 - 
                  route.params.routeParams.membertype == 'b300004' ||
                  route.params.data.kuaMembertype == 'b300004' ||
                  route.params.kuaMembertype == 'b300004' ||
                  route.params.data.kuaMembertype == 'b300005' ||
                  route.params.kuaMembertype == 'b300005' ||
                  // 排水系统 - 
                  route.params.routeParams.membertype == 'b300005' ? 
                  <DiseaseB route={route} navigation={navigation} diseaseData={diseaseData} /> :
                  // 湿接段 -
                  route.params.routeParams.membertype == 'b100003' ||
                  route.params.data.kuaMembertype == 'b100003' ||
                  route.params.kuaMembertype == 'b100003' ||
                  // 铰缝 -
                  route.params.routeParams.membertype == 'b100005' ||
                  route.params.data.kuaMembertype == 'b100005' ||
                  route.params.kuaMembertype == 'b100005' ||
                  route.params.data.kuaMembertype == 'b100007' ||
                  route.params.kuaMembertype == 'b100007' ||
                  // 湿接缝 -
                  route.params.routeParams.membertype == 'b100007' ?
                  <DiseaseC route={route} navigation={navigation} diseaseData={diseaseData} /> :
                  // 桥面铺装 -
                  route.params.data.kuaMembertype == 'b300001' ||
                  route.params.kuaMembertype == 'b300001' ||
                  route.params.routeParams.membertype == 'b300001' ?
                  <DiseaseK route={route} navigation={navigation} diseaseData={diseaseData} /> :
                  // 桥台 - 
                  route.params.data.kuaMembertype == 'b200001' ||
                  route.params.kuaMembertype == 'b200001' ||
                  route.params.routeParams.membertype == 'b200001' ?
                  <DiseaseG route={route} navigation={navigation} diseaseData={diseaseData} /> :
                  // 桥墩 -
                  route.params.data.kuaMembertype == 'b200002' ||
                  route.params.kuaMembertype == 'b200002' ||
                  route.params.routeParams.membertype == 'b200002' ?
                  <DiseaseH route={route} navigation={navigation} diseaseData={diseaseData} /> :
                  // 锥坡、护坡 - 
                  route.params.data.kuaMembertype == 'b200005' ||
                  route.params.kuaMembertype == 'b200005' ||
                  route.params.routeParams.membertype == 'b200005' ?
                  <DiseaseD route={route} navigation={navigation} diseaseData={diseaseData} /> :
                  // 照明、标志
                  route.params.data.kuaMembertype == 'b300006' ||
                  route.params.kuaMembertype == 'b300006' ||
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
