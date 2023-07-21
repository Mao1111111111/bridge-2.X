import React,{useState,useEffect} from 'react';
import {tailwind} from 'react-native-tailwindcss';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    FlatList,
  } from 'react-native';
  import Slider from '@react-native-community/slider';
  import {Context} from '../BridgeTest/Provider';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Context as ThemeContext} from '../../../../providers/ThemeProvider';
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import LabelItem from '../../../../components/LabelItem'
import Checkbox from '../../../../components/Checkbox';
import {TextInput, KeyboardInput, WriteInput} from '../../../../components/Input';
import {SliderInput} from '../../../../components/SliderInput';
import Select from '../../../../components/Select';
import * as hooks from '../BridgeTest/DiseaseHooks';
import {RadioGroup} from '../../../../components/Radio';
import ScaleInfo from '../BridgeTest/ScaleInfo';
// import RadioGroup from 'react-native-radio-buttons-group';
// 引入
import AsyncStorage from '@react-native-async-storage/async-storage';
import { log } from 'react-native-reanimated';


export function DiseaseA({route, navigation}) {
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
    
      const [areaparam, areanode] = hooks.useArea({diseaseData, baseData});
    
      // const infoList = hooks.useInfoComponents({diseaseData, baseData});
      const [infoList,setInfoList] = useState([])
    
      const defaultFileName = hooks.useDefaultFileName({diseaseData, baseData});
    
      const [scale, scaleInfo] = hooks.useScale({
        diseaseData,
        typeList: route.params?.type?.list,
        baseData,
      });


      React.useEffect(() => {
        setDiseaseData(itemData);
        // console.log('route.params.data.jsondata',route.params.data.jsondata);
        try {
          // console.log('itemData',itemData.standard.scale);
          // console.log('diseaseData.standard.scale',diseaseData.standard.scale);
          // console.log('areatype',itemData.areatype);
          setBiaodu(itemData.standard.scale)
          diseaseData['scale'] = itemData.standard.scale
          // handleFormChenge(itemData.standard.scale, diseaseData.scale)
        } catch (error) {
          console.log('areatype error',error);
        }
      }, [itemData]);
    
      const [lengthText, setLengthText] = useState(0)
      const [widthText, setWidthText] = useState(0)
      const [heightText, setHeightText] = useState(0)
      // =================================================
      const [writeTxt, setWriteTxt] = useState('')
      const [writePositionTxt, setWritePositionTxt] = useState('')
      // -------------------------------------------------
      // 标度,默认为 2
      const [biaodu, setBiaodu] = useState('')
      // 长度 - 米
      const [lengthM, setLengthM] = useState('')
      // 长度 - 厘米
      const [lengthCM, setLengthCM] = useState('')
      // 长度 - 毫米
      const [lengthMM, setLengthMM] = useState('')
      // 宽度 - 米
      const [widthM, setWidthM] = useState('')
      // 宽度 - 厘米
      const [widthCM, setWidthCM] = useState('')
      // 宽度 - 毫米
      const [widthMM, setWidthMM] = useState('')
      // 高度 - 米
      const [heightM, setHeightM] = useState('')
      // 高度 - 厘米
      const [heightCM, setHeightCM] = useState('')
      // 高度 - 毫米
      const [heightMM, setHeightMM] = useState('')
      // 面域 - %
      const [areaFace, setAreaFace] = useState('')
      // 面积占比 - %
      const [areaPer, setAreaPer] = useState('')
      // 面积 - 平方米
      const [areaM, setAreaM] = useState('')
      // 面积 - 平方厘米
      const [areaCM, setAreaCM] = useState('')
      // 面积 - 平方毫米
      const [areaMM, setAreaMM] = useState('')
      // 高差 - 厘米
      const [heightDiffCM, setHeightDiffCM] = useState('')
      // 高差 - 毫米
      const [heightDiffMM, setHeightDiffMM] = useState('')
      // 间距 - 厘米
      const [spacingCM, setSpacingCM] = useState('')
      // 变形 - 毫米
      const [deformationMM, setDeformationMM] = useState('')
      // 个数 - 个
      const [num, setNum] = useState('')
      // 距离 - 厘米
      const [rangeCM, setRangeCM] = useState('')
      // 距离 - 毫米
      const [rangeMM, setRangeMM] = useState('')
      // 深度 - 厘米
      const [depthCM, setDepthCM] = useState('')
      // 深度 - 毫米
      const [depthMM, setDepthMM] = useState('')
      // 体积 - 立方米
      const [volumeM, setVolumeM] = useState('')
      // 体积 - 立方厘米
      const [volumeCM, setVolumeCM] = useState('')
      // 位移 - 厘米
      const [dispCM, setDispCM] = useState('')
      // 位移 - 毫米
      const [dispMM, setDispMM] = useState('')
      // 角度 - 度
      const [angle, setAngle] = useState('')
      // 处
      const [chu, setChu] = useState('')
      // 条
      const [tiao, setTiao] = useState('')
      // 分布范围 - 米
      const [rangeFenbuM, setRangeFenbuM] = useState('')
      // 长度范围 - 米
      const [rangeLengthM, setRangeLengthM] = useState('')
      // 宽度范围 - 毫米
      const [rangeWidthMM, setRangeWidthMM] = useState('')
      // 间距范围 - 厘米
      const [rangeSpacingCM, setRangeSpacingCM] = useState('')
      // 左腹板长度 - 米
      const [leftLengthM, setLeftLengthM] = useState('')
      // 底板长度 - 米
      const [bottomLengthM, setBottomLengthM] = useState('')
      // 右腹板长度 - 米
      const [rightLengthM, setRightLengthM] = useState('')
      // 左腹板宽度 - 毫米
      const [leftWidthMM, setLeftWidthMM] = useState('')
      // 底板宽度 - 毫米
      const [bottomWidthMM, setBottomWidthMM] = useState('')
      // 右腹板宽度 - 毫米
      const [rightWidthMM, setRightWidthMM] = useState('')
      // 倾斜量 - 米
      const [slantM, setSlantM] = useState('')

      const [saveDescription, setSaveDescription] = useState()

      // 构件类型
      const [labelName, setLabelName] = useState()
      // 构件区域
      const [areaName, setAreaName] = useState()

      // 病害名称
      const [infoshort, setInfoShort] = useState()

      // 位置描述 墩台
      const [pier,  setPier] = useState('')
      // 位置描述 长、宽、距顶
      const [lengthNum, setLengthNum] = useState('')
      const [widthNum, setWidthNum] = useState('')
      const [heightNum, setHeightNum] = useState('')

      const [memberLength, setMemberLength] = useState('')
      const [memberWidth, setMemberWidth] = useState('')
      const [memberHeight, setMemberHeight] = useState('')

      const [diseaseName, setDiseaseName] = useState('')
      const [memberName, setMemberName] = useState('')

      // 桥梁id
      const [bridgeId, setBridgeId] = useState(route.params.memberList[0].bridgeid)
      // 部件名称
      const [storageMemberName, setStorageMemberName] =useState(route.params.routeParams.title)


      // =================================================
      React.useEffect(() => {
        saveData.current = {...diseaseData};
        try {
          // console.log('route',route);
          // console.log('navigation',navigation);
          // console.log('route.params.thridData',route.params.thridData);
          // console.log('baseData.membercheckdata',baseData.membercheckdata);
          if (baseData.membercheckdata) {
            console.log('保存baseData数据');
            setBaseDataStorage(JSON.stringify(baseData.membercheckdata))
          }
          if (route.params.thridData.datastr && baseData.membercheckdata) {
            let infoList = []
            route.params.thridData.datastr.forEach((item) => {
              // console.log('病害列表传入的datastr',item);
              baseData.membercheckdata.forEach((item1) => {
                if (item == item1.strid) {
                  // console.log('取出来的item1',item1);
                  infoList.push(item1)
                }
              })
            })
            setInfoList(infoList)
          } else if (!baseData.membercheckdata) {
            console.log('读取baseData数据');
            getBaseDataStorage('baseData')
          }
          
          
          if (diseaseData.diseaseName == undefined || diseaseData.diseaseName == '') {
            // console.log('7777');
            diseaseData['diseaseName'] = route.params.thridData.checkinfoshort
            handleFormChenge(route.params.thridData.checkinfoshort, diseaseData.diseaseName)
          }
        } catch (err){
          console.log('err09', err);
        }
        
        try {
          // console.log('选择的构件区域6', areaName)
          console.log('构件区域',diseaseData.area);
          console.log('构件区域列表2',baseData.components);
          // console.log('选择的构件类型id:', diseaseData.areatype);
          // console.log('构件区域id',diseaseData.area);
          // console.log('baseData.components[0].areatype',baseData.components[0].areatype);
          // console.log('----------------------------------------------------------------');

          // 初始构件类型与选择的构件类型一致时，构件区域取选择的值
          // 初始构件类型与选择的构件类型不一致时，构件区域默认取第一项
          // for (let i =0; i < areaparam.length; i ++) {
          //   if (diseaseData.area == undefined) {
          //     console.log('areaparam[i]',areaparam[i]);
          //     diseaseData.area = areaparam[0].value
          //     handleFormChenge(areaparam[0].value, diseaseData.area)
          //     setAreaName(areaparam[0].label)
          //   } else if (diseaseData.area !== undefined) {
          //     let sliceArea = diseaseData.area.slice(0,6)
          //     console.log('sliceArea',sliceArea);
          //     console.log('diseaseData.areatype',diseaseData.areatype);
          //     if (sliceArea !== diseaseData.areatype) {
          //       // console.log('构件类型有变化！',diseaseData.areatype, sliceArea);
          //       for (let k = 0; k < baseData.components.length; k++) {
          //         if (diseaseData.areatype == baseData.components[k].areatype) {
          //           console.log('此时的areaname',baseData.components[k].areaname);
          //           console.log('此时的areatype',baseData.components[k].areatype);
          //           // console.log('baseData.components[k]',baseData.components[k].areaparamjson.areaparamlist[0].areaparamid);
          //           diseaseData['areatype'] = baseData.components[k].areatype
          //           diseaseData['area'] = baseData.components[k].areaparamjson.areaparamlist[0].areaparamid
          //         }
          //       }
          //     }
          //   }
          // }

          // 构件类型与构件区域的初始默认值
          baseData.components.forEach((item,index) => {
            if (!diseaseData.area) {
              if (item.areaname == '板梁') {
                diseaseData['areatype'] = baseData.components[index].areatype
                diseaseData['area'] = baseData.components[index].areaparamjson.areaparamlist[1].areaparamid
              }
              
            }
          })


        } catch (err) {
          console.log('err08', err);
        }
        try {
          // 当新建的表单里长宽高为空，且前面有部件填写过长宽高数据时，则默认填写前面部件使用的长宽高数据
          // if (diseaseData.memberLength == undefined || diseaseData.memberWidth == undefined || diseaseData.memberHeight == undefined) {
          //   console.log('12333233');
          //   console.log('route.params.data.cacheNum', route.params.data.cacheNum);
          //   if (route.params.data.cacheNum !== '' || route.params.data.cacheNum !== undefined) {
          //     console.log('777777777777');
          //     diseaseData['memberLength'] = route.params.data.cacheNum[0].memberLength
          //     let memberLength = route.params.data.cacheNum[0].memberLength
          //     setMemberLength(memberLength)
          //     diseaseData['memberWidth'] = route.params.data.cacheNum[0].memberWidth
          //     let memberWidth = route.params.data.cacheNum[0].memberWidth
          //     setMemberWidth(memberWidth)
          //     diseaseData['memberHeight'] = route.params.data.cacheNum[0].memberHeight
          //     let memberHeight = route.params.data.cacheNum[0].memberHeight
          //     setMemberHeight(memberHeight)
          //   }
          // }
          // console.log('12333233');

          // console.log('baseData.membercheckdata',baseData.membercheckdata);
          console.log('infoList---------------',infoList);

          let lengthText = (diseaseData.memberLength * (diseaseData.disLength / 100)).toFixed(2)
          setLengthText(lengthText)
          let widthText = (diseaseData.memberWidth * (diseaseData.disWidth / 100)).toFixed(2)
          setWidthText(widthText)
          let heightText = (diseaseData.memberHeight * (diseaseData.disHeight / 100)).toFixed(2)
          setHeightText(heightText)
          if (lengthText == 'NaN') {
            let lengthText = '0'
            setLengthText(lengthText)
          }
          if (widthText == 'NaN') {
            let widthText = '0'
            setWidthText(widthText)
          }
          if (heightText == 'NaN') {
            let heightText = '0'
            setHeightText(heightText)
          }
          
          if (diseaseData.area == undefined) {

          } else if (diseaseData.area !== '' || diseaseData.area !== undefined || diseaseData.area !== '/') {
            var sliceArea = diseaseData.area.slice(0,5)
          }
          
          if (diseaseData.areatype == 'at0000' && sliceArea == 'at000') {
            console.log(sliceArea);
            console.log('xu~~~~~');
            diseaseData['area'] = '/'
          }

          // 将病害位置的长宽高数据存进diseaseData
          diseaseData['lengthText'] = lengthText
          diseaseData['widthText'] = widthText
          diseaseData['heightText'] = heightText
          diseaseData['remark'] = route.params.thridData.checkinfoshort


          // console.log('打印一下病害名称:',route);
          // 取病害名称并保存
          if (diseaseData.diseaseName == '' || diseaseData.diseaseName == undefined) {
            let diseaseName = route.params.thridData.checkinfoshort
            // setDiseaseName(diseaseName)
            console.log('0000000');
            console.log('~~~~~~~diseaseName~~~~~',diseaseName);
            diseaseData['diseaseName'] = diseaseName
            handleFormChenge(diseaseName, diseaseData.diseaseName)
            setDiseaseName(diseaseName)
          }

          // console.log('一级病害id',route.params.stairgroupid);
          if (diseaseData.stairgroupid == undefined || diseaseData.stairgroupid == '') {
            // console.log('0000.000');
            diseaseData['stairgroupid'] = route.params.stairgroupid
            handleFormChenge(route.params.stairgroupid, diseaseData.stairgroupid)
          }

          // console.log(diseaseData);
          if (diseaseData.remark == '' || diseaseData.remark == undefined) {
            let infoshort = route.params.thridData.checkinfoshort
            setInfoShort(infoshort)
          }
          if (diseaseData.description == '' || diseaseData.description == undefined) {
            diseaseData['description'] = diseaseData.remark
          }

          if (diseaseData.writePositionTxt == undefined || diseaseData.writePositionTxt == '') {
            let writePositionTxt = '/'
            setWritePositionTxt(writePositionTxt)
            diseaseData['writePositionTxt'] = writePositionTxt
            handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
          }

          try {
            // console.log('diseaseData.scale',diseaseData.scale);
            if (itemData && route.params.mediaType == 'add') {
              diseaseData['scale'] = rightScaleNum
              handleFormChenge(rightScaleNum, diseaseData.scale)
              route.params.mediaType = ''
            }
          } catch (error) {
            console.log('设置标度初始值',error);
          }
          
        } catch (err){
          console.log('err10', err);
        }
      }, [diseaseData]);

      // 保存baseData的数据
      const setBaseDataStorage = async(value) => {
        try {
          await AsyncStorage.setItem('baseData', value)
        } catch (err) {
          console.log('存入数据失败!3', err);
        }
      }
      // 读取baseData的数据
      const getBaseDataStorage = async(name) => {
        // console.log('读取baseData数据')
        try {
          const value = await AsyncStorage.getItem(name)
          let values = JSON.parse(value)
          // console.log('value~~~',value);
          let infoList = []
            route.params.thridData.datastr.forEach((item) => {
              // console.log('病害列表传入的datastr',item);
              values.forEach((item1) => {
                if (item == item1.strid) {
                  // console.log('取出来的item1',item1);
                  infoList.push(item1)
                }
              })
            })
            setInfoList(infoList)
        } catch (error) {
          console.log('读取baseData数据失败',error);
        }
      }

      // 重新获取数据的标度选项数组
      const [rightScale, setRightScale] = useState([])
      // 默认的标度值
      const [rightScaleNum, setRightScaleNum] = useState('')
      // 重新获取数据的标度评定标准表格
      const [scaleTabel, setScaleTabel] = useState([])
    
      React.useEffect(() => {
        
        try {
          // console.log('scale',scale);
          // console.log('baseData', baseData);
          // console.log('标度表格信息baseData.basestandardtable',baseData.basestandardtable)

          // 当页面是由新建进入时，存储标度数组，以备编辑进入时使用
          if (route.params.mediaType == 'add' || route.params.mediaType == '') {
            // =================================
            // 获取标度列表与标度默认值
            let scaleSelect = baseData.basestandardtable
            let oldArr = ''
            let scaleNum = ''
            scaleSelect.forEach(item => {
              // console.log('33330000',item.standardid);
              
              if (route.params.thridData.strandardid == item.standardid) {
                // console.log('当前病害的标度选项',item);
                // setRightScale(item.standardscalestr)
                oldArr = item.standardscalestr
                scaleNum = item.standardscale
              }
            });
            setRightScaleNum(scaleNum)
            // console.log('rightScale',rightScale);
            const arr = oldArr.split(',')
            // console.log('arr',arr);
            
            let resetArr = []
            arr.forEach((item, index) => {
              resetArr.push({
                label:index + 1,
                value:item
              })
            })
            // console.log('resetArr',resetArr);
            setRightScale(resetArr)
            diseaseData['scaleArr'] = rightScale
            handleFormChenge(rightScale, diseaseData.scaleArr)

            // =================================
            // 获取标度评定标准表数据
            let scaleTabel = baseData.standardtableinfo
            // console.log('表格数据',scaleTabel);
            let oldTable = []
            scaleTabel.forEach((item) => {
              if (route.params.thridData.strandardid == item.standardid) {
                // console.log('当前的评定表item',item);
                oldTable.push(item)
              }
            })
            // console.log('oldTable',oldTable);
            setScaleTabel(oldTable)
            diseaseData['scaleTableArr'] = oldTable
            handleFormChenge(oldTable, diseaseData.scaleTableArr)


          } else if (route.params.mediaType == 'edit') {
            // 当页面是由编辑进入时
            setRightScale(diseaseData.scaleArr)
            setScaleTabel(scaleTabel)
            // console.log('rightScale222222',rightScale);
          }
        } catch (error) {
          console.log('获取标度数据',error);
        }
        return () => {
          if (version) {
            const {memberList, type, dataGroupId} = route.params;
            // console.log('baseData',baseData.infoComponents);
            // console.log('saveData',saveData);
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

            // console.log('datas', datas)
            const str = datas
              // .map(
              //   ({strname, strvalue, strunit}) =>
              //     `${strname}${saveData.current[strvalue] || 0}@@${
              //       strunit || ''
              //     }@@`,
              // )
              .map(
                ({strname, strvalue, strunit}) =>
                  `${saveData.current[strvalue] == undefined ? '' : strname + saveData.current[strvalue] + '@@' + strunit + '@@'}`
              )
              // .join(',');
              // 1.去掉为空的项 2.当所有数据都为空时，默认为 /
              const strr = str.filter(item => item!=='') == '' ? '/' : str.filter(item => item!=='')
              
            let scalegroupid = '';
            if (baseData.scale && baseData.scale.length) {
              scalegroupid =
                baseData.scale.find(
                  ({checktypeid}) => saveData.current.checktypeid == checktypeid,
                )?.scalegroupid || '';
            }
            // console.log('scalegroupid',scalegroupid);
            const jsondata = {
              ...saveData.current,
              checktypegroupid: type.checktypegroupid,
              scalegroupid,
              remark: `${
                baseData.infoComponents.find(
                  ({checktypeid}) => saveData.current.checktypeid === checktypeid,
                )?.checkinfoshort || ''
              }，${strr}`,
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
    
      useEffect(() => {
        // console.log('disea111',diseaseData);
        // console.log('diseaseData.standard.scale',diseaseData.standard.scale);
        // console.log('route',route);
        // console.log('桥跨：：',route.params.memberList);
        // console.log('桥梁id::',route.params.memberList[0].bridgeid);
        // console.log('部件',route.params.routeParams.title);
        
        let defaultPier = route.params.memberList[0].membername
        // 提取第一个字符进行判断（表示墩台的数据）
        let firstDefaultPier = defaultPier.slice(0,1)
        if (firstDefaultPier == 1) {
          let pier = '距' + (firstDefaultPier - 1) + '#台'
          setPier(pier)
          console.log('dundun:', pier);
        } else {
          let pier = '距' + (firstDefaultPier - 1) + '#墩'
          setPier(pier)
          console.log('dundun:', pier);
        }
        

        // console.log('构件区域列表：：',areaparam);
        // console.log('表单中的构件区域',diseaseData.area);
        if (areaparam == '' || areaparam == undefined) {
          console.log('选的其他');
          try{
           console.log('构件类型', itemData.areatype); 
           if (itemData.areatype == 'at0000' || itemData.areatype == undefined) {
            // console.log('9999');
            diseaseData['area'] = '/'
            let labelName = 'at0000'
            setLabelName(labelName)
           }
          } catch {

          }
        }
      },[])

      const handleScaleOpen = () => scaleInfoRef.current.open();
      const handleFormChenge = ({name,value}) => {
        // console.log('```````执行了handleFormChenge``````````');
        // const _data = {
        //   ...diseaseData,
        //   [name]: value,
        // };
        // console.log('diseaseData9',diseaseData);
        // let resetDiseaseData = JSON.stringify(diseaseData)
        // console.log(resetDiseaseData);

        try {
          // const _data = {
          //   ...diseaseData,
          //   [name]: value,
          // };
          // console.log('diseaseData9',diseaseData);
          let unitt = JSON.stringify(diseaseData, [
                                    'areatype','area','scale','lengthText','widthText','heightText','memberLength','memberWidth',
                                  'memberHeight','disLength','disWidth','disHeight','hzbrmc_length_m','hzbrmc_length_cm','hzbrmc_length_mm','hzbrmc_width_m',
                                  'hzbrmc_width_cm','hzbrmc_width_mm','hzbrmc_height_m','hzbrmc_height_cm','hzbrmc_height_mm',
                                  'hzbrmc_area_face','hzbrmc_area_per','hzbrmc_area_m','hzbrmc_area_cm','hzbrmc_area_mm',
                                  'hzbrmc_heightdiff_cm','hzbrmc_heightdiff_mm','hzbrmc_spacing_cm','hzbrmc_deformation_mm',
                                  'hzbrmc_num','hzbrmc_range_cm','hzbrmc_range_mm','hzbrmc_depth_cm','hzbrmc_depth_mm',
                                  'hzbrmc_volume_m','hzbrmc_volume_cm','hzbrmc_disp_cm','hzbrmc_disp_mm','hzbrmc_angle_c',
                                  'hzbrmc_chu','hzbrmc_tiao','hzbrmc_range_fenbu_m','hzbrmc_range_length_m','hzbrmc_range_width_mm',
                                  'hzbrmc_range_spacing_cm','hzbrmc_lb_left_length_m','hzbrmc_lb_bottom_length_m','hzbrmc_lb_right_length_m',
                                  'hzbrmc_lb_left_width_mm','hzbrmc_lb_bottom_width_mm','hzbrmc_lb_right_width_mm','hzbrmc_slant_m'])
          // console.log('unitt',unitt);
          let unit = JSON.parse(unitt)
          diseaseData['unit'] = unit
          // const { item1, itme2, ...rest } = obj;
          // let {hzbrmc_length_m,hzbrmc_length_cm,hzbrmc_length_mm,hzbrmc_width_m,hzbrmc_width_cm,
          //   hzbrmc_width_mm,hzbrmc_height_m,hzbrmc_height_cm,hzbrmc_height_mm,hzbrmc_area_face,hzbrmc_area_per,
          //   hzbrmc_area_m,hzbrmc_area_cm,hzbrmc_area_mm,hzbrmc_heightdiff_cm,hzbrmc_heightdiff_mm,hzbrmc_spacing_cm,
          //   hzbrmc_deformation_mm,hzbrmc_num,hzbrmc_range_cm,hzbrmc_range_mm,hzbrmc_depth_cm,hzbrmc_depth_mm,
          //   hzbrmc_volume_m,hzbrmc_volume_cm,hzbrmc_disp_cm,hzbrmc_disp_mm,hzbrmc_angle_c,hzbrmc_chu,hzbrmc_tiao,
          //   hzbrmc_range_fenbu_m,hzbrmc_range_length_m,hzbrmc_range_width_mm,hzbrmc_range_spacing_cm,hzbrmc_lb_left_length_m,
          //   hzbrmc_lb_bottom_length_m,hzbrmc_lb_right_length_m,hzbrmc_lb_left_width_mm,hzbrmc_lb_bottom_width_mm,
          //   hzbrmc_lb_right_width_mm,hzbrmc_slant_m,lengthText,widthText,heightText,memberLength,memberWidth,
          //   memberHeight,disLength,disWidth,disHeight,...rest} = diseaseData
          // console.log('resttttt',rest)

          const _data = {
            ...diseaseData,
            [name]: value,
          };
          // console.log('diseaseData9',diseaseData);

          if (name === 'checktypeid') {
            const _type = route.params.type.list.find(
              item => value === item.checktypeid,
            );
            let defaultScaleVal = '';
            if (_type) {
              defaultScaleVal = _type?.standardscale;
            }
            _data.scale = defaultScaleVal;
            const {basestandardtable, infoComponents} = baseData;
            const standardid =
              infoComponents.find(({checktypeid}) => value === checktypeid)
                ?.standardid || '';
            if (standardid) {
              const _standardscale = basestandardtable.find(
                item => standardid === item.standardid,
              )?.standardscale;
              if (_standardscale) {
                _data.standard = {
                  scale: _standardscale,
                  id: standardid,
                  unit: {
                    [name]: value
                  }
                };
                // ------
              } else {
                const defaultScale = basestandardtable.find(
                  item => item.standardid === 'JTG-TH21-2011-T000-0',
                )?.standardscale;
                _data.standard = {
                  scale: defaultScale,
                  id: 'JTG-TH21-2011-T000-0',
                };
              }
            }
            _data.scale = _data.scale || '';
          }

          // console.log('_data',_data);

          if (value) {
            // console.log('调用了writeDes', name,value);
            // console.log('lengthM',lengthM);
            // 向病害描述函数里传入
            writeDesText(name, value)
          }
        
          if (true) {
            if (name == 'scale') {
              // 标度
              let biaodu = ',标度' + value + '@@'
              setBiaodu(biaodu)
            } else if (name == 'hzbrmc_length_m') {
              //长度 - 米
              if (value == '' || value == 0) {
                let lengthM = ''
                setLengthM(lengthM)
                // handleFormChenge(diseaseData.lengthM,lengthM)
              } else {
                let lengthM = ',长度' + value + '@@米@@'
                setLengthM(lengthM)
              }
            } else if (name == 'hzbrmc_length_cm') {
              // 长度 - 厘米
              // let lengthCM = ',长度' + value + '@@厘米@@'
              // setLengthCM(lengthCM)
              if (value == '' || value == 0) {
                let lengthCM = ''
                setLengthCM(lengthCM)
              } else {
                let lengthCM = ',长度' + value + '@@厘米@@'
                setLengthCM(lengthCM)
              }
            } else if (name == 'hzbrmc_length_mm') {
              // 长度 - 毫米
              // let lengthMM = ',长度' + value + '@@毫米@@'
              // setLengthMM(lengthMM)
              if (value == '' || value == 0) {
                let lengthMM = ''
                setLengthMM(lengthMM)
              } else {
                let lengthMM = ',长度' + value + '@@毫米@@'
                setLengthMM(lengthMM)
              }
            } else if (name == 'hzbrmc_width_m') {
              // 宽度 - 米
              // let widthM = ',宽度' + value + '@@米@@'
              // setWidthM(widthM)
              if (value == '' || value == 0) {
                let widthM = ''
                setWidthM(widthM)
              } else {
                let widthM = ',宽度' + value + '@@米@@'
                setWidthM(widthM)
              }
            } else if (name == 'hzbrmc_width_cm') {
              // 宽度 - 厘米
              // let widthCM = ',宽度' + value + '@@厘米@@'
              // setWidthCM(widthCM)
              if (value == '' || value == 0) {
                let widthCM = ''
                setWidthCM(widthCM)
              } else {
                let widthCM = ',宽度' + value + '@@厘米@@'
                setWidthCM(widthCM)
              }
            } else if (name == 'hzbrmc_width_mm') {
              // 宽度 - 毫米
              if (value == '' || value == 0) {
                // console.log('宽度毫米设为0');
                let widthMM = ''
                setWidthMM(widthMM)
              } else {
                let widthMM = ',宽度' + value + '@@毫米@@'
                setWidthMM(widthMM)
              }
            } else if (name == 'hzbrmc_height_m') {
              // 高度 - 米
              // let heightM = ',高度' + value + '@@米@@'
              // setHeightM(heightM)
              if (value == '' || value == 0) {
                let heightM = ''
                setHeightM(heightM)
              } else {
                let heightM = ',高度' + value + '@@米@@'
                setHeightM(heightM)
              }
            } else if (name == 'hzbrmc_height_cm') {
              // 高度 - 厘米
              if (value == '' || value == 0) {
                let heightCM = ''
                setHeightCM(heightCM)
              } else {
                let heightCM = ',高度' + value + '@@厘米@@'
                setHeightCM(heightCM)
              }
            } else if (name == 'hzbrmc_height_mm') {
              // 高度 - 毫米
              // let heightMM = ',高度' + value + '@@毫米@@'
              // setHeightMM(heightMM)
              if (value == '' || value == 0) {
                let heightMM = ''
                setHeightMM(heightMM)
              } else {
                let heightMM = ',高度' + value + '@@毫米@@'
                setHeightMM(heightMM)
              }
            } else if (name == 'hzbrmc_area_face') {
              // 面域 - %
              // let areaFace = ',面域' + value + '@@%@@'
              // setAreaFace(areaFace)
              if (value == '' || value == 0) {
                let areaFace = ''
                setAreaFace(areaFace)
              } else {
                let areaFace = ',面域' + value + '@@%@@'
                setAreaFace(areaFace)
              }
            } else if (name == 'hzbrmc_area_per') {
              // 面积占比 - %
              // let areaPer = ',面积占比' + value + '@@%@@'
              // setAreaPer(areaPer)
              if (value == '' || value == 0) {
                let areaPer = ''
                setAreaPer(areaPer)
              } else {
                let areaPer = ',面积占比' + value + '@@%@@'
                setAreaPer(areaPer)
              }
            } else if (name == 'hzbrmc_area_m') {
              // 面积 - 平方米
              // let areaM = ',面积' + value + '@@平方米@@'
              // setAreaM(areaM)
              if (value == '' || value == 0) {
                let areaM = ''
                setAreaM(areaM)
              } else {
                let areaM = ',面积' + value + '@@平方米@@'
                setAreaM(areaM)
              }
            } else if (name == 'hzbrmc_area_cm') {
              // 面积 - 平方厘米
              // let areaCM = ',面积' + value + '@@平方厘米@@'
              // setAreaCM(areaCM)
              if (value == '' || value == 0) {
                let areaCM = ''
                setAreaCM(areaCM)
              } else {
                let areaCM = ',面积' + value + '@@平方厘米@@'
                setAreaCM(areaCM)
              }
            } else if (name == 'hzbrmc_area_mm') {
              // 面积 - 平方毫米
              // let areaMM = ',面积' + value + '@@平方毫米@@'
              // setAreaMM(areaMM)
              if (value == '' || value == 0) {
                let areaMM = ''
                setAreaMM(areaMM)
              } else {
                let areaMM = ',面积' + value + '@@平方毫米@@'
                setAreaMM(areaMM)
              }
            } else if (name == 'hzbrmc_heightdiff_cm') {
              // 高差 - 厘米
              // let heightDiffCM = ',高差' + value + '@@厘米@@'
              // setHeightDiffCM(heightDiffCM)
              if (value == '' || value == 0) {
                let heightDiffCM = ''
                setHeightDiffCM(heightDiffCM)
              } else {
                let heightDiffCM = ',高差' + value + '@@厘米@@'
                setHeightDiffCM(heightDiffCM)
              }
            } else if (name == 'hzbrmc_heightdiff_mm') {
              // 高差 - 毫米
              // let heightDiffMM = ',高差' + value + '@@毫米@@'
              // setHeightDiffMM(heightDiffMM)
              if (value == '' || value == 0) {
                let heightDiffMM = ''
                setHeightDiffMM(heightDiffMM)
              } else {
                let heightDiffMM = ',高差' + value + '@@毫米@@'
                setHeightDiffMM(heightDiffMM)
              }
            } else if (name == 'hzbrmc_spacing_cm') {
              // 间距 - 厘米
              // let spacingCM = ',间距' + value + '@@厘米@@'
              // setSpacingCM(spacingCM)
              if (value == '' || value == 0) {
                let spacingCM = ',间距' + value + '@@厘米@@'
                setSpacingCM(spacingCM)
              } else {
                let spacingCM = ',间距' + value + '@@厘米@@'
                setSpacingCM(spacingCM)
              }
            } else if (name == 'hzbrmc_deformation_mm') {
              // 变形 - 毫米
              // let deformationMM = ',变形' + value + '@@毫米@@'
              // setDeformationMM(deformationMM)
              if (value == '' || value == 0) {
                let deformationMM = ''
                setDeformationMM(deformationMM)
              } else {
                let deformationMM = ',变形' + value + '@@毫米@@'
                setDeformationMM(deformationMM)
              }
            } else if (name == 'hzbrmc_num') {
              // 个数 - 个
              // let num = ',个数' + value + '@@个@@'
              // setNum(num)
              if (value == '' || value == 0) {
                let num = ''
                setNum(num)
              } else {
                let num = ',个数' + value + '@@个@@'
                setNum(num)
              }
            } else if (name == 'hzbrmc_range_cm') {
              // 距离 - 厘米
              // let rangeCM = ',距离' + value + '@@厘米@@'
              // setRangeCM(rangeCM)
              if (value == '' || value == 0) {
                let rangeCM = ''
                setRangeCM(rangeCM)
              } else {
                let rangeCM = ',距离' + value + '@@厘米@@'
                setRangeCM(rangeCM)
              }
            } else if (name == 'hzbrmc_range_mm') {
              // 距离 - 毫米
              // let rangeMM = ',距离' + value + '@@毫米@@'
              // setRangeMM(rangeMM)
              if (value == '' || value == 0) {
                let rangeMM = ''
                setRangeMM(rangeMM)
              } else {
                let rangeMM = ',距离' + value + '@@毫米@@'
                setRangeMM(rangeMM)
              }
            } else if (name == 'hzbrmc_depth_cm') {
              // 深度 - 厘米
              // let depthCM = ',深度' + value + '@@厘米@@'
              // setDepthCM(depthCM)
              if (value == '' || value == 0) {
                let depthCM = ''
                setDepthCM(depthCM)
              } else {
                let depthCM = ',深度' + value + '@@厘米@@'
                setDepthCM(depthCM)
              }
            } else if (name == 'hzbrmc_depth_mm') {
              // 深度 - 毫米
              // let depthMM = ',深度' + value + '@@毫米@@'
              // setDepthMM(depthMM)
              if (value == '' || value == 0) {
                let depthMM = ''
                setDepthMM(depthMM)
              } else {
                let depthMM = ',深度' + value + '@@毫米@@'
                setDepthMM(depthMM)
              }
            } else if (name == 'hzbrmc_volume_m') {
              // 体积 - 立方米
              // let volumeM = ',体积' + value + '@@立方米@@'
              // setVolumeM(volumeM)
              if (value == '' || value == 0) {
                let volumeM = ''
                setVolumeM(volumeM)
              } else {
                let volumeM = ',体积' + value + '@@立方米@@'
                setVolumeM(volumeM)
              }
            } else if (name == 'hzbrmc_volume_cm') {
              // 体积 - 立方厘米
              // let volumeCM = ',体积' + value + '@@立方厘米@@'
              // setVolumeCM(volumeCM)
              if (value == '' || value == 0) {
                let volumeCM = ''
                setVolumeCM(volumeCM)
              } else {
                let volumeCM = ',体积' + value + '@@立方厘米@@'
                setVolumeCM(volumeCM)
              }
            } else if (name == 'hzbrmc_disp_cm') {
              // 位移 - 厘米
              // let dispCM = ',位移' + value + '@@厘米@@'
              // setDispCM(dispCM)
              if (value == '' || value == 0) {
                let dispCM = ''
                setDispCM(dispCM)
              } else {
                let dispCM = ',位移' + value + '@@厘米@@'
                setDispCM(dispCM)
              }
            } else if (name == 'hzbrmc_disp_mm') {
              // 位移 - 毫米
              // let dispMM = ',位移' + value + '@@毫米@@'
              // setDispMM(dispMM)
              if (value == '' || value == 0) {
                let dispMM = ''
                setDispMM(dispMM)
              } else {
                let dispMM = ',位移' + value + '@@毫米@@'
                setDispMM(dispMM)
              }
            } else if (name == 'hzbrmc_angle_c') {
              // 角度 - 度
              // let dispMM = ',角度' + value + '@@度@@'
              // setDispMM(dispMM)
              if (value == '' || value == 0) {
                let angle = ''
                setAngle(angle)
              } else {
                let angle = ',角度' + value + '@@度@@'
                setAngle(angle)
              }
            } else if (name == 'hzbrmc_chu') {
              // 处
              // let chu = ',' + value + '@@处@@'
              // setChu(chu)
              if (value == '' || value == 0) {
                let chu = ''
                setChu(chu)
              } else {
                let chu = ',' + value + '@@处@@'
                setChu(chu)
              }
            } else if (name == 'hzbrmc_tiao') {
              // 条
              // let tiao = ',' + value + '@@条@@'
              // setTiao(tiao)
              if (value == '' || value == 0) {
                let tiao = ''
                setTiao(tiao)
              } else {
                let tiao = ',' + value + '@@条@@'
                setTiao(tiao)
              }
            } else if (name == 'hzbrmc_range_fenbu_m') {
              // 分布范围 - 米
              // let rangeFenbuM = ',分布范围' + value + '@@米@@'
              // setRangeFenbuM(rangeFenbuM)
              if (value == '' || value == 0) {
                let rangeFenbuM = ''
                setRangeFenbuM(rangeFenbuM)
              } else {
                let rangeFenbuM = ',分布范围' + value + '@@米@@'
                setRangeFenbuM(rangeFenbuM)
              }
            } else if (name == 'hzbrmc_range_length_m') {
              // 长度范围 - 米
              // let rangeLengthM = ',长度范围' + value + '@@米@@'
              // setRangeLengthM(rangeLengthM)
              if (value == '' || value == 0) {
                let rangeLengthM = ''
                setRangeLengthM(rangeLengthM)
              } else {
                let rangeLengthM = ',长度范围' + value + '@@米@@'
                setRangeLengthM(rangeLengthM)
              }
            } else if (name == 'hzbrmc_range_width_mm') {
              // 宽度范围 - 毫米
              // let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
              // setRangeWidthMM(rangeWidthMM)
              if (value == '' || value == 0) {
                let rangeWidthMM = ''
                setRangeWidthMM(rangeWidthMM)
              } else {
                let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
                setRangeWidthMM(rangeWidthMM)
              }
            } else if (name == 'hzbrmc_range_spacing_cm') {
              // 间距范围 - 厘米
              // let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
              // setRangeSpacingCM(rangeSpacingCM)
              if (value == '' || value == 0) {
                let rangeSpacingCM = ''
                setRangeSpacingCM(rangeSpacingCM)
              } else {
                let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
                setRangeSpacingCM(rangeSpacingCM)
              }
            } else if (name == 'hzbrmc_lb_left_length_m') {
              // 左腹板长度 - 米
              // let leftLengthM = ',左腹板长度' + value + '@@米@@'
              // setLeftLengthM(leftLengthM)
              if (value == '' || value == 0) {
                let leftLengthM = ''
                setLeftLengthM(leftLengthM)
              } else {
                let leftLengthM = ',左腹板长度' + value + '@@米@@'
                setLeftLengthM(leftLengthM)
              }
            } else if (name == 'hzbrmc_lb_bottom_length_m') {
              // 底板长度 - 米
              // let bottomLengthM = ',底板长度' + value + '@@米@@'
              // setBottomLengthM(bottomLengthM)
              if (value == '' || value == 0) {
                let bottomLengthM = ''
                setBottomLengthM(bottomLengthM)
              } else {
                let bottomLengthM = ',底板长度' + value + '@@米@@'
                setBottomLengthM(bottomLengthM)
              }
            } else if (name == 'hzbrmc_lb_right_length_m') {
              // 右腹板长度 - 米
              // let rightLengthM = ',右腹板长度' + value + '@@米@@'
              // setRightLengthM(rightLengthM)
              if (value == '' || value == 0) {
                let rightLengthM = ''
                setRightLengthM(rightLengthM)
              } else {
                let rightLengthM = ',右腹板长度' + value + '@@米@@'
                setRightLengthM(rightLengthM)
              }
            } else if (name == 'hzbrmc_lb_left_width_mm') {
              // 左腹板宽度 - 毫米
              // let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
              // setLeftWidthMM(leftWidthMM)
              if (value == '' || value == 0) {
                let leftWidthMM = ''
                setLeftWidthMM(leftWidthMM)
              } else {
                let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
                setLeftWidthMM(leftWidthMM)
              }
            } else if (name == 'hzbrmc_lb_bottom_width_mm') {
              // 底板宽度 - 毫米
              // let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
              // setBottomWidthMM(bottomWidthMM)
              if (value == '' || value == 0) {
                let bottomWidthMM = ''
                setBottomWidthMM(bottomWidthMM)
              } else {
                let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
                setBottomWidthMM(bottomWidthMM)
              }
            } else if (name == 'hzbrmc_lb_right_width_mm') {
              // 右腹板宽度 - 毫米
              // let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
              // setRightWidthMM(rightWidthMM)
              if (value == '' || value == 0) {
                let rightWidthMM = ''
                setRightWidthMM(rightWidthMM)
              } else {
                let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
                setRightWidthMM(rightWidthMM)
              }
            } else if (name == 'hzbrmc_slant_m') {
              // 倾斜量 - 米
              // let slantM = ',倾斜量' + value + '@@米@@'
              // setSlantM(slantM)
              if (value == '' || value == 0) {
                let slantM = ''
                setSlantM(slantM)
              } else {
                let slantM = ',倾斜量' + value + '@@米@@'
                setSlantM(slantM)
              }
            }
          }
          
          setDiseaseData(_data);

        } catch (error) {
          console.log('error321',error);
        }
      };

      const [writeDesTextValue, setWriteDesTextValue] = useState('')
      const writeDesText = (name, value) => {
        // let writeTxt = []
        console.log('长度lengthM',diseaseData);
        console.log('writeDesText', name, value);
        setWriteDesTextValue(value)

        if (name == 'memberLength') {
          diseaseData['memberLength'] = value
          handleFormChenge(value, diseaseData.memberLength)
        } else if (name == 'memberWidth') {
          diseaseData['memberWidth'] = value
          handleFormChenge(value, diseaseData.memberWidth)
        } else if (name == 'memberHeight') {
          diseaseData['memberHeight'] = value
          handleFormChenge(value, diseaseData.memberHeight)
        }


        console.log('diseaseData.memberLength1',diseaseData.memberLength, diseaseData.memberWidth, diseaseData.memberHeight);
        console.log('name value1', name, value);

        // 当数据是长宽高的时候，进行数据存储
        if (name == 'memberLength' || name == 'memberWidth' || name == 'memberHeight') {
          setStorage(name, value)
        }

        
        if (true) {
          if (diseaseData.scale !== '' && diseaseData.scale !== '0' && diseaseData.scale !== '') {
            var biaodu = ',标度' + diseaseData.scale + '@@'
            setBiaodu(biaodu)
          } else {
            var biaodu = ''
            setBiaodu(biaodu)
          }
          if (diseaseData.hzbrmc_length_m !== undefined && diseaseData.hzbrmc_length_m !== '0' && diseaseData.hzbrmc_length_m !== '') {
            var lengthM = ',长度' + diseaseData.hzbrmc_length_m + '@@米@@'
            setLengthM(lengthM)
          } else {
            var lengthM = ''
            setLengthM(lengthM)
          }
          if (diseaseData.hzbrmc_length_cm !== undefined && diseaseData.hzbrmc_length_cm !== '0' && diseaseData.hzbrmc_length_cm !== '') {
            var lengthCM = ',长度' + diseaseData.hzbrmc_length_cm + '@@厘米@@'
            setLengthCM(lengthCM)
          } else {
            var lengthCM = ''
            setLengthCM(lengthCM)
          }
          if (diseaseData.hzbrmc_length_mm !== undefined && diseaseData.hzbrmc_length_mm !== '0' && diseaseData.hzbrmc_length_mm !== '') {
            var lengthMM = ',长度' + diseaseData.hzbrmc_length_mm + '@@毫米@@'
            setLengthMM(lengthMM)
          } else {
            var lengthMM = ''
            setLengthMM(lengthMM)
          }
          if (diseaseData.hzbrmc_width_m !== undefined && diseaseData.hzbrmc_width_m !== '0' && diseaseData.hzbrmc_width_m !== '') {
            var widthM = ',宽度' + diseaseData.hzbrmc_width_m + '@@米@@'
            setWidthM(widthM)
          } else {
            var widthM = ''
            setWidthM(widthM)
          }
          if (diseaseData.hzbrmc_width_cm !== undefined && diseaseData.hzbrmc_width_cm !== '0' && diseaseData.hzbrmc_width_cm !== '') {
            var widthCM = ',宽度' + diseaseData.hzbrmc_width_cm + '@@厘米@@'
            setWidthCM(widthCM)
          } else {
            var widthCM = ''
            setWidthCM(widthCM)
          }
          if (diseaseData.hzbrmc_width_mm !== undefined && diseaseData.hzbrmc_width_mm !== '0' && diseaseData.hzbrmc_width_mm !== '') {
            console.log('diseaseData.hzbrmc_width_mm',diseaseData.hzbrmc_width_mm == '');
            var widthMM = ',宽度' + diseaseData.hzbrmc_width_mm + '@@毫米@@'
            setWidthMM(widthMM)
          } else {
            // diseaseData.hzbrmc_width_mm == undefined || diseaseData.hzbrmc_width_mm == 0 || diseaseData.hzbrmc_width_mm == ''
            var widthMM = ''
            setWidthMM(widthMM)
          }
          if (diseaseData.hzbrmc_height_m !== undefined && diseaseData.hzbrmc_height_m !== '0' && diseaseData.hzbrmc_height_m !== '') {
            var heightM = ',高度' + diseaseData.hzbrmc_height_m + '@@米@@'
            setHeightM(heightM)
          } else {
            var heightM = ''
            setHeightM(heightM)
          }
          if (diseaseData.hzbrmc_height_cm !== undefined && diseaseData.hzbrmc_height_cm !== '0' && diseaseData.hzbrmc_height_cm !== '') {
            var heightCM = ',高度' + diseaseData.hzbrmc_height_cm + '@@厘米@@'
            setHeightCM(heightCM)
          } else {
            var heightCM = ''
            setHeightCM(heightCM)
          }
          if (diseaseData.hzbrmc_height_mm !== undefined && diseaseData.hzbrmc_height_mm !== '0' && diseaseData.hzbrmc_height_mm !== '') {
            var heightMM = ',高度' + diseaseData.hzbrmc_height_mm + '@@毫米@@'
            setHeightMM(heightMM)
          } else {
            var heightMM = ''
            setHeightMM(heightMM)
          }
          if (diseaseData.hzbrmc_area_face !== undefined && diseaseData.hzbrmc_area_face !== '0' && diseaseData.hzbrmc_area_face !== '') {
            var areaFace = ',面域' + diseaseData.hzbrmc_area_face + '@@%@@'
            setAreaFace(areaFace)
          } else {
            var areaFace = ''
            setAreaFace(areaFace)
          }
          if (diseaseData.hzbrmc_area_per !== undefined && diseaseData.hzbrmc_area_per !== '0' && diseaseData.hzbrmc_area_per !== '') {
            var areaPer = ',面积占比' + diseaseData.hzbrmc_area_per + '@@%@@'
            setAreaPer(areaPer)
          } else {
            var areaPer = ''
            setAreaPer(areaPer)
          }
          if (diseaseData.hzbrmc_area_m !== undefined && diseaseData.hzbrmc_area_m !== '0' && diseaseData.hzbrmc_area_m !== '') {
            var areaM = ',面积' + diseaseData.hzbrmc_area_m + '@@平方米@@'
            setAreaM(areaM)
          } else {
            var areaM = ''
            setAreaM(areaM)
          }
          if (diseaseData.hzbrmc_area_cm !== undefined && diseaseData.hzbrmc_area_cm !== '0' && diseaseData.hzbrmc_area_cm !== '') {
            var areaCM = ',面积' + diseaseData.hzbrmc_area_cm + '@@平方厘米@@'
            setAreaCM(areaCM)
          } else {
            var areaCM = ''
            setAreaCM(areaCM)
          }
          if (diseaseData.hzbrmc_area_mm !== undefined && diseaseData.hzbrmc_area_mm !== '0' && diseaseData.hzbrmc_area_mm !== '') {
            var areaMM = ',面积' + diseaseData.hzbrmc_area_mm + '@@平方毫米@@'
            setAreaMM(areaMM)
          } else {
            var areaMM = ''
            setAreaMM(areaMM)
          }
          if (diseaseData.hzbrmc_heightdiff_cm !== undefined && diseaseData.hzbrmc_heightdiff_cm !== '0' && diseaseData.hzbrmc_heightdiff_cm !== '') {
            var heightDiffCM = ',高差' + diseaseData.hzbrmc_heightdiff_cm + '@@厘米@@'
            setHeightDiffCM(heightDiffCM)
          } else {
            var heightDiffCM = ''
            setHeightDiffCM(heightDiffCM)
          }
          if (diseaseData.hzbrmc_heightdiff_mm !== undefined && diseaseData.hzbrmc_heightdiff_mm !== '0' && diseaseData.hzbrmc_heightdiff_mm !== '') {
            var heightDiffMM = ',高差' + diseaseData.hzbrmc_heightdiff_mm + '@@毫米@@'
            setHeightDiffMM(heightDiffMM)
          } else {
            var heightDiffMM = ''
            setHeightDiffMM(heightDiffMM)
          }
          if (diseaseData.hzbrmc_spacing_cm !== undefined && diseaseData.hzbrmc_spacing_cm !== '0' && diseaseData.hzbrmc_spacing_cm !== '') {
            var spacingCM = ',间距' + diseaseData.hzbrmc_spacing_cm + '@@厘米@@'
            setSpacingCM(spacingCM)
          } else {
            var spacingCM = ''
            setSpacingCM(spacingCM)
          }
          if (diseaseData.hzbrmc_deformation_mm !== undefined && diseaseData.hzbrmc_deformation_mm !== '0' && diseaseData.hzbrmc_deformation_mm !== '') {
            var deformationMM = ',变形' + diseaseData.hzbrmc_deformation_mm + '@@毫米@@'
            setDeformationMM(deformationMM)
          } else {
            var deformationMM = ''
            setDeformationMM(deformationMM)
          }
          if (diseaseData.hzbrmc_num !== undefined && diseaseData.hzbrmc_num !== '0' && diseaseData.hzbrmc_num !== '') {
            var num = ',个数' + diseaseData.hzbrmc_num + '@@个@@'
            setNum(num)
          } else {
            var num = ''
            setNum(num)
          }
          if (diseaseData.hzbrmc_range_cm !== undefined && diseaseData.hzbrmc_range_cm !== '0' && diseaseData.hzbrmc_range_cm !== '') {
            var rangeCM = ',距离' + diseaseData.hzbrmc_range_cm + '@@厘米@@'
            setRangeCM(rangeCM)
          } else {
            var rangeCM = ''
            setRangeCM(rangeCM)
          }
          if (diseaseData.hzbrmc_range_mm !== undefined && diseaseData.hzbrmc_range_mm !== '0' && diseaseData.hzbrmc_range_mm !== '') {
            var rangeMM = ',距离' + diseaseData.hzbrmc_range_mm + '@@毫米@@'
            setRangeMM(rangeMM)
          } else {
            var rangeMM = ''
            setRangeMM(rangeMM)
          }
          if (diseaseData.hzbrmc_depth_cm !== undefined && diseaseData.hzbrmc_depth_cm !== '0' && diseaseData.hzbrmc_depth_cm !== '') {
            var depthCM = ',深度' + diseaseData.hzbrmc_depth_cm + '@@厘米@@'
            setDepthCM(depthCM)
          } else {
            var depthCM = ''
            setDepthCM(depthCM)
          }
          if (diseaseData.hzbrmc_depth_mm !== undefined && diseaseData.hzbrmc_depth_mm !== '0' && diseaseData.hzbrmc_depth_mm !== '') {
            var depthMM = ',深度' + diseaseData.hzbrmc_depth_mm + '@@毫米@@'
            setDepthMM(depthMM)
          } else {
            var depthMM = ''
            setDepthMM(depthMM)
          }
          if (diseaseData.hzbrmc_volume_m !== undefined && diseaseData.hzbrmc_volume_m !== '0' && diseaseData.hzbrmc_volume_m !== '') {
            var volumeM = ',体积' + diseaseData.hzbrmc_volume_m + '@@立方米@@'
            setVolumeM(volumeM)
          } else {
            var volumeM = ''
            setVolumeM(volumeM)
          }
          if (diseaseData.hzbrmc_volume_cm !== undefined && diseaseData.hzbrmc_volume_cm !== '0' && diseaseData.hzbrmc_volume_cm !== '') {
            var volumeCM = ',体积' + diseaseData.hzbrmc_volume_cm + '@@立方厘米@@'
            setVolumeCM(volumeCM)
          } else {
            var volumeCM = ''
            setVolumeCM(volumeCM)
          }
          if (diseaseData.hzbrmc_disp_cm !== undefined && diseaseData.hzbrmc_disp_cm !== '0' && diseaseData.hzbrmc_disp_cm !== '') {
            var dispCM = ',位移' + diseaseData.hzbrmc_disp_cm + '@@厘米@@'
            setDispCM(dispCM)
          } else {
            var dispCM = ''
            setDispCM(dispCM)
          }
          if (diseaseData.hzbrmc_disp_mm !== undefined && diseaseData.hzbrmc_disp_mm !== '0' && diseaseData.hzbrmc_disp_mm !== '') {
            var dispMM = ',位移' + diseaseData.hzbrmc_disp_mm + '@@毫米@@'
            setDispMM(dispMM)
          } else {
            var dispMM = ''
            setDispMM(dispMM)
          }
          if (diseaseData.hzbrmc_angle_c !== undefined && diseaseData.hzbrmc_angle_c !== '0' && diseaseData.hzbrmc_angle_c !== '') {
            var angle = ',角度' + diseaseData.hzbrmc_angle_c + '@@度@@'
            setAngle(angle)
          } else {
            var angle = ''
            setAngle(angle)
          }
          if (diseaseData.hzbrmc_chu !== undefined && diseaseData.hzbrmc_chu !== '0' && diseaseData.hzbrmc_chu !== '') {
            var chu = ',' + diseaseData.hzbrmc_chu + '@@处@@'
            setChu(chu)
          } else {
            var chu = ''
            setChu(chu)
          }
          if (diseaseData.hzbrmc_tiao !== undefined && diseaseData.hzbrmc_tiao !== '0' && diseaseData.hzbrmc_tiao !== '') {
            var tiao = ',' + diseaseData.hzbrmc_tiao + '@@条@@'
            setTiao(tiao)
          } else {
            var tiao = ''
            setTiao(tiao)
          }
          if (diseaseData.hzbrmc_range_fenbu_m !== undefined && diseaseData.hzbrmc_range_fenbu_m !== '0' && diseaseData.hzbrmc_range_fenbu_m !== '') {
            var rangeFenbuM = ',分布范围' + diseaseData.hzbrmc_range_fenbu_m + '@@米@@'
            setRangeFenbuM(rangeFenbuM)
          } else {
            var rangeFenbuM = ''
            setRangeFenbuM(rangeFenbuM)
          }
          if (diseaseData.hzbrmc_range_length_m !== undefined && diseaseData.hzbrmc_range_length_m !== '0' && diseaseData.hzbrmc_range_length_m !== '') {
            var rangeLengthM = ',长度范围' + diseaseData.hzbrmc_range_length_m + '@@米@@'
            setRangeLengthM(rangeLengthM)
          } else {
            var rangeLengthM = ''
            setRangeLengthM(rangeLengthM)
          }
          if (diseaseData.hzbrmc_range_width_mm !== undefined && diseaseData.hzbrmc_range_width_mm !== '0' && diseaseData.hzbrmc_range_width_mm !== '') {
            var rangeWidthMM = ',宽度范围'+ diseaseData.hzbrmc_range_width_mm + '@@毫米@@'
            setRangeWidthMM(rangeWidthMM)
          } else {
            var rangeWidthMM = ''
            setRangeWidthMM(rangeWidthMM)
          }
          if (diseaseData.hzbrmc_range_spacing_cm !== undefined && diseaseData.hzbrmc_range_spacing_cm !== '0' && diseaseData.hzbrmc_range_spacing_cm !== '') {
            var rangeSpacingCM = ',间距范围' + diseaseData.hzbrmc_range_spacing_cm + '@@厘米@@'
            setRangeSpacingCM(rangeSpacingCM)
          } else {
            var rangeSpacingCM = ''
            setRangeSpacingCM(rangeSpacingCM)
          }
          if (diseaseData.hzbrmc_lb_left_length_m !== undefined && diseaseData.hzbrmc_lb_left_length_m !== '0' && diseaseData.hzbrmc_lb_left_length_m !== '') {
            var leftLengthM = ',左腹板长度' + diseaseData.hzbrmc_lb_left_length_m + '@@米@@'
            setLeftLengthM(leftLengthM)
          } else {
            var leftLengthM = ''
            setLeftLengthM(leftLengthM)
          }
          if (diseaseData.hzbrmc_lb_bottom_length_m !== undefined && diseaseData.hzbrmc_lb_bottom_length_m !== '0' && diseaseData.hzbrmc_lb_bottom_length_m !== '') {
            var bottomLengthM = ',底板长度' + diseaseData.hzbrmc_lb_bottom_length_m + '@@米@@'
            setBottomLengthM(bottomLengthM)
          } else {
            var bottomLengthM = ''
            setBottomLengthM(bottomLengthM)
          }
          if (diseaseData.hzbrmc_lb_right_length_m !== undefined && diseaseData.hzbrmc_lb_right_length_m !== '0' && diseaseData.hzbrmc_lb_right_length_m !== '') {
            var rightLengthM = ',右腹板长度' + diseaseData.hzbrmc_lb_right_length_m + '@@米@@'
            setRightLengthM(rightLengthM)
          } else {
            var rightLengthM = ''
            setRightLengthM(rightLengthM)
          }
          if (diseaseData.hzbrmc_lb_left_width_mm !== undefined && diseaseData.hzbrmc_lb_left_width_mm !== '0' && diseaseData.hzbrmc_lb_left_width_mm !== '') {
            var leftWidthMM = ',左腹板宽度' + diseaseData.hzbrmc_lb_left_width_mm + '@@毫米@@'
            setLeftWidthMM(leftWidthMM)
          } else {
            var leftWidthMM = ''
            setLeftWidthMM(leftWidthMM)
          }
          if (diseaseData.hzbrmc_lb_bottom_width_mm !== undefined && diseaseData.hzbrmc_lb_bottom_width_mm !== '0' && diseaseData.hzbrmc_lb_bottom_width_mm !== '') {
            var bottomWidthMM = ',底板宽度' + diseaseData.hzbrmc_lb_bottom_width_mm + '@@毫米@@'
            setBottomWidthMM(bottomWidthMM)
          } else {
            var bottomWidthMM = ''
            setBottomWidthMM(bottomWidthMM)
          }
          if (diseaseData.hzbrmc_lb_right_width_mm !== undefined && diseaseData.hzbrmc_lb_right_width_mm !== '0' && diseaseData.hzbrmc_lb_right_width_mm !== '') {
            var rightWidthMM = ',右腹板宽度' + diseaseData.hzbrmc_lb_right_width_mm + '@@毫米@@'
            setRightWidthMM(rightWidthMM)
          } else {
            var rightWidthMM = ''
            setRightWidthMM(rightWidthMM)
          }
          if (diseaseData.hzbrmc_slant_m !== undefined && diseaseData.hzbrmc_slant_m !== '0' && diseaseData.hzbrmc_slant_m !== '') {
            var slantM = ',倾斜量' + diseaseData.hzbrmc_slant_m + '@@米@@'
            setSlantM(slantM)
          } else {
            var slantM = ''
            setSlantM(slantM)
          }
        }

        if (writeDesTextValue == '' || writeDesTextValue == undefined) {
          console.log('没有修改数据');
          if (diseaseData.description == '' || diseaseData.description == undefined) {
            diseaseData['description'] = itemData.diseaseName
          } else if (diseaseData.description !== '' || diseaseData.description !== undefined) {
            let writeTxt = lengthM + lengthCM + lengthMM + widthM + widthCM
                    + widthMM + heightM + heightCM + heightMM + areaFace
                    + areaPer + areaM + areaCM + areaMM + heightDiffCM + heightDiffMM
                    + spacingCM + deformationMM + num + rangeCM + rangeMM + depthCM
                    + depthMM + volumeM + volumeCM + dispCM + dispMM + angle + chu
                    + tiao + rangeFenbuM + rangeLengthM + rangeWidthMM + rangeSpacingCM
                    + leftLengthM + bottomLengthM + rightLengthM + leftWidthMM
                    + bottomWidthMM + rightWidthMM + slantM
            // let writeTxt = diseaseData.hzbrmc_length_m
            setWriteTxt(writeTxt)
            // console.log('writeTxt', writeTxt);
            // console.log('病害名称',itemData.diseaseName);
            let binghai = itemData.diseaseName
            let allText = binghai.concat(writeTxt)
            console.log('allText', allText);
            diseaseData['description'] = allText
            handleFormChenge(allText, diseaseData.description)
          }
        } else {
          let writeTxt = lengthM + lengthCM + lengthMM + widthM + widthCM
                    + widthMM + heightM + heightCM + heightMM + areaFace
                    + areaPer + areaM + areaCM + areaMM + heightDiffCM + heightDiffMM
                    + spacingCM + deformationMM + num + rangeCM + rangeMM + depthCM
                    + depthMM + volumeM + volumeCM + dispCM + dispMM + angle + chu
                    + tiao + rangeFenbuM + rangeLengthM + rangeWidthMM + rangeSpacingCM
                    + leftLengthM + bottomLengthM + rightLengthM + leftWidthMM
                    + bottomWidthMM + rightWidthMM + slantM
          // let writeTxt = diseaseData.hzbrmc_length_m
          setWriteTxt(writeTxt)
          // console.log('writeTxt', writeTxt);
          // console.log('病害名称',itemData.diseaseName);
          let binghai = itemData.diseaseName
          let allText = binghai.concat(writeTxt)
          console.log('allText', allText);
          diseaseData['description'] = allText
          handleFormChenge(allText, diseaseData.description)
        }
      }

      // 存入数据
      const setStorage = async(name, value) => {
        console.log('存储长宽高数据的函数~~', name, value);
        // 桥梁id + 部件名称 + 长/宽/高
        const REname = bridgeId + '_' + storageMemberName + '_' + name
        try {
          await AsyncStorage.setItem(REname, value)
        } catch (err) {
          console.log('存入数据失败!', err);
        }
      }

      const writeNum = () => {
        try {
          console.log('长宽高的数据::',diseaseData.memberLength,diseaseData.memberWidth,diseaseData.memberHeight);
          const lengthName = bridgeId + '_' + storageMemberName + '_' + 'memberLength'
          const lengthValue = AsyncStorage.getItem(lengthName)
          const widthName = bridgeId + '_' + storageMemberName + '_' + 'memberWidth'
          const widthValue = AsyncStorage.getItem(widthName)
          const heightName = bridgeId + '_' + storageMemberName + '_' + 'memberHeight'
          const heightValue = AsyncStorage.getItem(heightName)
          // if (diseaseData.memberLength == undefined || diseaseData.memberLength !== lengthValue) {
          //   // console.log('长度数据为空');
          //   getStorage(lengthName)
          // } else if (diseaseData.memberWidth == undefined || diseaseData.memberWidth !== widthValue) {
          //   // console.log('宽度数据为空');
          //   getStorage(widthName)
          // } else if (diseaseData.memberHeight == undefined || diseaseData.memberHeight !== heightValue) {
          //   // console.log('高度数据为空');
          //   getStorage(heightName)
          // }
          getStorage(lengthName)
          getStorage(widthName)
          getStorage(heightName)
        } catch (e) {
          console.log('writeNum错误',e);
        }
      }

      // 读取数据
      const getStorage = async(name) => {
        console.log('读取存储的长宽高的数据~',name);
        // console.log('diseaseData 有无',diseaseData);
        try {
          const value = await AsyncStorage.getItem(name)
          console.log('value~~~',value);
          if (value !== null) {
            console.log('读取到的数据',name,value);
            if (name == bridgeId + '_' + storageMemberName + '_' + 'memberLength') {
              console.log('length99999');
              diseaseData['memberLength'] = value
              setDiseaseData(diseaseData)
              handleFormChenge(value, diseaseData.memberLength)
            } else if (name == bridgeId + '_' + storageMemberName + '_' + 'memberWidth') {
              console.log('Width99999');
              diseaseData['memberWidth'] = value
              setDiseaseData(diseaseData)
              handleFormChenge(value, diseaseData.memberWidth)
            } else if (name == bridgeId + '_' + storageMemberName + '_' + 'memberHeight') {
              console.log('Height99999');
              diseaseData['memberHeight'] = value
              setDiseaseData(diseaseData)
              handleFormChenge(value, diseaseData.memberHeight)
            }
          }
        } catch (err) {
          console.log('读取失败~', err);
        }
      }


      // 填入位置描述内容
      const writePositionText = () => {
        try {
          // console.log('diseaseData.area', diseaseData.area);
          console.log('diseaseData.lengthText',lengthText,widthText,heightText);
          
          if (diseaseData.area == undefined) {
            console.log('area未定义 areaparam',areaparam);
            console.log('labelName333222111',labelName);
            var areaName = ''
            setAreaName(areaName)
            console.log('diseaseData.area为空');
            // 墩/台描述
            // 长度描述
            if (lengthText == '0' || lengthText == '0.0') {
              var lengthNum = ''
              setLengthNum(lengthNum)
            } else if (lengthText !== '0' || lengthText !== '0.0') {
              var lengthNum = lengthText + 'm'
              setLengthNum(lengthNum)
            }
            
            // 宽度描述
            if (widthText == '0' || widthText == '0.0') {
              var widthNum = ''
              setWidthNum(widthNum)
            } else if (widthText !== '0' || widthText !== '0.0') {
              if (lengthNum == '') {
                var widthNum = '距左侧' + widthText + 'm'
                setWidthNum(widthNum)
              } else {
                var widthNum = ',距左侧' + widthText + 'm'
                setWidthNum(widthNum)
              }
            }

            console.log('diseaseData.lengthNum',lengthNum,widthNum,heightNum);
            // 距顶描述
            if (heightText == '0' || heightText == '0.0') {
              var heightNum = ''
              setHeightNum(heightNum)
            } else if (heightText !== '0' || heightText !== '0.0') {
              // if (lengthNum == '' || lengthNum == undefined && pier == '' && widthNum == '' || widthNum == undefined) {
              //   var heightNum = '距顶' + heightText + 'm'
              //   setHeightNum(heightNum)
              // } else {
              //   var heightNum = ',距顶' + heightText + 'm'
              //   setHeightNum(heightNum)
              // }
              if (lengthNum !== '' || widthNum !== '') {
                var heightNum = ',距顶部' + heightText + 'm'
                setHeightNum(heightNum)
              } else {
                var heightNum = '距顶部' + heightText + 'm'
                setHeightNum(heightNum)
              }
            }

            if (lengthNum == '' && widthNum == '' && heightNum == '') {
              let writePositionTxt = areaName
              setWritePositionTxt(writePositionTxt)
              diseaseData['writePositionTxt'] = writePositionTxt
              setDiseaseData(diseaseData)
              handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
            } else {
              console.log('55555');
              // console.log('kankan areaName', areaName);
              // 位置描述 = / + 病害区域 + 桥台 + 长度
              // console.log('pier',pier);
              if (lengthNum == '') {
                let writePositionTxt = areaName + widthNum + heightNum + '处'
                setWritePositionTxt(writePositionTxt)
                diseaseData['writePositionTxt'] = writePositionTxt
                setDiseaseData(diseaseData)
                handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
              } else {
                let writePositionTxt = areaName + pier + lengthNum + widthNum + heightNum + '处'
                setWritePositionTxt(writePositionTxt)
                diseaseData['writePositionTxt'] = writePositionTxt
                setDiseaseData(diseaseData)
                handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
              }
            }
          } else {
            console.log('有数据了');
            console.log('构件区域列表：：',areaparam);
            console.log('表单中的构件区域',diseaseData.area);
            console.log('构件类型',labelName);
            if (labelName == 'at0000' && diseaseData.area == undefined || diseaseData.area == '' || diseaseData.area == '/') {
              console.log('empty~~~');
              var areaName = ''
              diseaseData['area'] = areaName
              handleFormChenge(areaName, diseaseData.area)
            } else if (labelName == 'at0000' && diseaseData.area !== undefined || diseaseData.area !== '' || diseaseData.area !== '/') {
              // console.log('not empty~~~~');
              var areaName = diseaseData.area
              diseaseData['area'] = areaName
              handleFormChenge(areaName, diseaseData.area)
              console.log('not empty~~~~',areaName);
            }
            if (areaparam !== []) {
              let areaArr = areaparam
              let inputArea = diseaseData.area
              console.log('inputArea',inputArea);
              for (let i = 0; i < areaArr.length; i++) {
                if (inputArea == areaArr[i].value) {
                  console.log('此时选中的构件是：',areaArr[i].label);
                  var areaName = areaArr[i].label
                  console.log(areaName);
                  setAreaName(areaName)
                }
              }
            }
            
            
            // 墩/台描述
            // 长度描述
            if (lengthText == '0' || lengthText == '0.0') {
              var lengthNum = ''
              setLengthNum(lengthNum)
            } else if (lengthText !== '0' || lengthText !== '0.0') {
              var lengthNum = lengthText + 'm'
              setLengthNum(lengthNum)
            }
            
            // 宽度描述
            if (widthText == '0' || widthText == '0.0') {
              var widthNum = ''
              setWidthNum(widthNum)
            } else if (widthText !== '0' || widthText !== '0.0') {
              if (lengthNum == '') {
                var widthNum = '距左侧' + widthText + 'm'
                setWidthNum(widthNum)
              } else {
                var widthNum = ',距左侧' + widthText + 'm'
                setWidthNum(widthNum)
              }
            }

            // 距顶描述
            if (heightText == '0' || heightText == '0.0') {
              var heightNum = ''
              setHeightNum(heightNum)
            } else if (heightText !== '0' || heightText !== '0.0') {
              if (lengthNum !== '' || widthNum !== '') {
                var heightNum = ',距顶部' + heightText + 'm'
                setHeightNum(heightNum)
              } else {
                var heightNum = '距顶部' + heightText + 'm'
                setHeightNum(heightNum)
              }
            }

            console.log('kankan areaName', areaName);
            // 位置描述 = / + 病害区域 + 桥台 + 长度 + 宽度 + 距顶
            if (lengthNum == '' && widthNum == '' && heightNum == '') {
              let writePositionTxt = areaName
              setWritePositionTxt(writePositionTxt)
              diseaseData['writePositionTxt'] = writePositionTxt
              setDiseaseData(diseaseData)
              handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
            } else {
              console.log('65666');
              // console.log('kankan areaName', areaName);
              // 位置描述 = / + 病害区域 + 桥台 + 长度
              if (lengthNum == '') {
                let writePositionTxt = areaName + lengthNum + widthNum + heightNum + '处'
                setWritePositionTxt(writePositionTxt)
                diseaseData['writePositionTxt'] = writePositionTxt
                setDiseaseData(diseaseData)
                handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
              } else {
                let writePositionTxt = areaName + pier + lengthNum + widthNum + heightNum + '处'
                setWritePositionTxt(writePositionTxt)
                diseaseData['writePositionTxt'] = writePositionTxt
                setDiseaseData(diseaseData)
                handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
              }
            }
          }
        } catch (err) {
          console.log('出现错误1:',err);
        }
      }

      // 一键填入病害描述与位置描述
      const allWrite = () => {
        writeDesText()
        writePositionText()
      }


    {/* ================================================= */}
    {/* 病害填写表格区域 */}
    return (
    <View style={tailwind.flexRow}>
      {/* 病害填写表格区域 */}
      <ScrollView style={{height:'100%'}}>
        <View>
        <View style={[tailwind.flexRow, tailwind.justifyBetween]}>
          <LabelItem label="编号:">
            <Text style={[tailwind.fontBold]}>
              {route.params?.data?.index}
            </Text>
          </LabelItem>
          <View style={tailwind.flexRow}>
            <LabelItem
              label="重点关注"
              LabelStyle={[tailwind.mR0, {color:'#2b427d'}]}
            />
            <Checkbox
              checked={!!diseaseData?.mian}
              onPress={() =>
                handleFormChenge({
                  name: 'mian',
                  value: !diseaseData?.mian + 0,
                })
              }
            />
          </View>
        </View>
        <View style={[tailwind.flexRow]}>
          <View style={{width:230}}>
             <Select
            label="构件类型"
            name="areatype"
            labelName="areaname"
            valueName="areatype"
            value={diseaseData?.areatype}
            onChange={handleFormChenge}
            values={baseData.components}
          /> 
          </View>
          <Text>           </Text>
          <View style={{width:230}}>
            <View style={tailwind.mB2}>
              {!areaparam.length ? (
                <TextInput
                  name="area"
                  label="构件区域"
                  value={diseaseData?.area}
                  onChange={handleFormChenge}
                  lines={1}
                  height={25}
                />
              ) : (
                <Select
                  name="area"
                  label="构件区域"
                  value={diseaseData?.area}
                  values={areaparam}
                  onChange={handleFormChenge}
                />
              )}
            </View>
          </View>
          
        </View>
        
        {/* 原本的标度内容 */}
        {/* {scale.length ? (
          <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
            <LabelItem label="标度" />
            <TouchableOpacity onPress={handleScaleOpen}>
              <Icon
                name="information"
                size={20}
                style={[tailwind.mR2, {color:'#2b427d'}]}
              />
            </TouchableOpacity>
            <RadioGroup
              name="scale"
              values={scale}
              value={diseaseData?.scale}
              onChange={handleFormChenge}
            />
          </View>
        ) : (
          <></>
        )} */}

        {/* 修改标度：删除'无'的项 */}
        {/* {scale.length ? (
          <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
            <LabelItem label="标度" />
            <TouchableOpacity onPress={handleScaleOpen}>
              <Icon
                name="information"
                size={20}
                style={[tailwind.mR2, {color:'#2b427d'}]}
              />
            </TouchableOpacity>
            <RadioGroup
              name="scale"
              values={scale.slice(1)} // 初始数据第一项为'无'，提取第二项及以后的数据传入组件
              value={diseaseData?.scale}
              onChange={handleFormChenge}
            />
          </View>
        ) : (
          <></>
        )} */}

        {/* 修改标度数据源 */}
        {rightScale.length ? (
          <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
            <LabelItem label="标度" />
            <TouchableOpacity onPress={handleScaleOpen}>
              <Icon
                name="information"
                size={20}
                style={[tailwind.mR2, {color:'#2b427d'}]}
              />
            </TouchableOpacity>
            <RadioGroup
              name="scale"
              values={rightScale} // 初始数据第一项为'无'，提取第二项及以后的数据传入组件
              value={diseaseData?.scale}
              onChange={handleFormChenge}
            />
          </View>
        ) : (
          <></>
        )}


        <View style={tailwind.mT2} />
        <View>
          <View style={[tailwind.flexRow]}>
          <TouchableOpacity style={{width:90,height:20,borderRadius: 5,
              backgroundColor: '#2b427d',
              justifyContent: 'center',
              overflow: 'hidden'}}
              onPress={writeNum}>
              <Text style={{textAlign: 'center',color:'#fff',fontSize:12}}>获取上一次数据</Text>
            </TouchableOpacity>
            <LabelItem label="病害位置(米)" style={[tailwind.w18,{marginLeft:10}]} />
            <Text>长度{lengthText}米; 宽度{widthText}米; 距顶{heightText}米</Text>
            <Text>  </Text>
            
          </View>
          <View style={tailwind.mT2} />
          <View style={[tailwind.flexRow]}>
            <LabelItem label="长度" />
            <KeyboardInput
              name="memberLength"
              value={diseaseData?.memberLength}
              onChange={handleFormChenge}
            />
            <SliderInput
              name="disLength"
              memberData={diseaseData?.memberLength}
              value={diseaseData?.disLength}
              onChange={handleFormChenge}
            />
          </View>
          <View style={tailwind.mT2} />
          <View style={[tailwind.flexRow]}>
            <LabelItem label="宽度" style={tailwind.w18} />
            <KeyboardInput
              name="memberWidth"
              value={diseaseData?.memberWidth}
              onChange={handleFormChenge}
            />
            <SliderInput
              name="disWidth"
              memberData={diseaseData?.memberWidth}
              value={diseaseData?.disWidth}
              onChange={handleFormChenge}
            />
          </View>
          <View style={tailwind.mT2} />
          <View style={[tailwind.flexRow,tailwind.mB3]}>
            <LabelItem label="距顶" style={tailwind.w18} />
            <KeyboardInput
              name="memberHeight"
              value={diseaseData?.memberHeight}
              onChange={handleFormChenge}
            />
            <SliderInput
              name="disHeight"
              memberData={diseaseData?.memberHeight}
              value={diseaseData?.disHeight}
              onChange={handleFormChenge}
            />
          </View>
        </View>
        {/* <View style={tailwind.mT2} /> */}
        <View style={[tailwind.flexRow]}>
          <View style={{width:500}}>
            <WriteInput
              name="description"
              label="病害描述"
              value={diseaseData?.description}
              onChange={handleFormChenge}
              lines={3}
              height={70}
              // disabled={true}
            />
          </View>
          {/* <TouchableOpacity style={styles.sideButton} onPress={writeDesText}>
            <Text style={[{color:'#fff',fontSize:12}]}>填入描述</Text>
          </TouchableOpacity> */}
        </View>
        <View style={tailwind.mT2} />
        <View style={[tailwind.flexRow]}>
          <View style={{width:500}}>
            <WriteInput
              name="writePositionTxt"
              label="位置描述"
              value={diseaseData?.writePositionTxt}
              onChange={handleFormChenge}
              lines={3}
              height={70}
            />
          </View>
          {/* <TouchableOpacity style={styles.sideButton} onPress={writePositionText}>
            <Text style={[{color:'#fff',fontSize:12}]}>填入描述</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      </ScrollView>
      
      {/* ================================================= */}
      <View style={tailwind.mX3} />
      
      <View style={[{width:'20%'}]}>
      <View>
        {/* <LabelItem label="当前病害:" /> */}
        <Text style={[tailwind.fontBold,{width:'100%'}]}>
          {itemData?.diseaseName}
        </Text>
      </View>
      <View style={tailwind.mT2} />
      {infoList.length ? (
          infoList.map(({strvalue, strinfo}, index) => (
            <React.Fragment key={index}>
                <View style={[tailwind.mB2]}>
                  <LabelItem label={strinfo} />
                  <View style={{width:'70%',height:25}}>
                    <KeyboardInput
                      name={strvalue}
                      value={diseaseData[strvalue]}
                      onChange={handleFormChenge}
                    />
                  </View>
                </View>
            </React.Fragment>
          ))
        ) : (
          <></>
        )}
        <TouchableOpacity style={styles.bottomButton} onPress={allWrite}>
          <Text style={[{color:'#fff',fontSize:14}]}>生成描述</Text>
        </TouchableOpacity>
      </View>
      
      <ScaleInfo ref={scaleInfoRef} info={scaleTabel} />
    </View>
    );
    {/* ================================================= */}
}

export function DiseaseB({route, navigation}) {
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
  
    const [areaparam, areanode] = hooks.useArea({diseaseData, baseData});
  
    // const infoList = hooks.useInfoComponents({diseaseData, baseData});
    const [infoList,setInfoList] = useState([])
  
    const defaultFileName = hooks.useDefaultFileName({diseaseData, baseData});
  
    const [scale, scaleInfo] = hooks.useScale({
      diseaseData,
      typeList: route.params?.type?.list,
      baseData,
    });


    React.useEffect(() => {
      setDiseaseData(itemData);
      console.log('itemData:',itemData);
    }, [itemData]);
  
    const [lengthText, setLengthText] = useState()
    const [widthText, setWidthText] = useState()
    const [heightText, setHeightText] = useState()
    // =================================================
    const [writeTxt, setWriteTxt] = useState('')
    const [writePositionTxt, setWritePositionTxt] = useState('')
    // -------------------------------------------------
    // 标度,默认为 2
    const [biaodu, setBiaodu] = useState('')
    // 长度 - 米
    const [lengthM, setLengthM] = useState('')
    // 长度 - 厘米
    const [lengthCM, setLengthCM] = useState('')
    // 长度 - 毫米
    const [lengthMM, setLengthMM] = useState('')
    // 宽度 - 米
    const [widthM, setWidthM] = useState('')
    // 宽度 - 厘米
    const [widthCM, setWidthCM] = useState('')
    // 宽度 - 毫米
    const [widthMM, setWidthMM] = useState('')
    // 高度 - 米
    const [heightM, setHeightM] = useState('')
    // 高度 - 厘米
    const [heightCM, setHeightCM] = useState('')
    // 高度 - 毫米
    const [heightMM, setHeightMM] = useState('')
    // 面域 - %
    const [areaFace, setAreaFace] = useState('')
    // 面积占比 - %
    const [areaPer, setAreaPer] = useState('')
    // 面积 - 平方米
    const [areaM, setAreaM] = useState('')
    // 面积 - 平方厘米
    const [areaCM, setAreaCM] = useState('')
    // 面积 - 平方毫米
    const [areaMM, setAreaMM] = useState('')
    // 高差 - 厘米
    const [heightDiffCM, setHeightDiffCM] = useState('')
    // 高差 - 毫米
    const [heightDiffMM, setHeightDiffMM] = useState('')
    // 间距 - 厘米
    const [spacingCM, setSpacingCM] = useState('')
    // 变形 - 毫米
    const [deformationMM, setDeformationMM] = useState('')
    // 个数 - 个
    const [num, setNum] = useState('')
    // 距离 - 厘米
    const [rangeCM, setRangeCM] = useState('')
    // 距离 - 毫米
    const [rangeMM, setRangeMM] = useState('')
    // 深度 - 厘米
    const [depthCM, setDepthCM] = useState('')
    // 深度 - 毫米
    const [depthMM, setDepthMM] = useState('')
    // 体积 - 立方米
    const [volumeM, setVolumeM] = useState('')
    // 体积 - 立方厘米
    const [volumeCM, setVolumeCM] = useState('')
    // 位移 - 厘米
    const [dispCM, setDispCM] = useState('')
    // 位移 - 毫米
    const [dispMM, setDispMM] = useState('')
    // 角度 - 度
    const [angle, setAngle] = useState('')
    // 处
    const [chu, setChu] = useState('')
    // 条
    const [tiao, setTiao] = useState('')
    // 分布范围 - 米
    const [rangeFenbuM, setRangeFenbuM] = useState('')
    // 长度范围 - 米
    const [rangeLengthM, setRangeLengthM] = useState('')
    // 宽度范围 - 毫米
    const [rangeWidthMM, setRangeWidthMM] = useState('')
    // 间距范围 - 厘米
    const [rangeSpacingCM, setRangeSpacingCM] = useState('')
    // 左腹板长度 - 米
    const [leftLengthM, setLeftLengthM] = useState('')
    // 底板长度 - 米
    const [bottomLengthM, setBottomLengthM] = useState('')
    // 右腹板长度 - 米
    const [rightLengthM, setRightLengthM] = useState('')
    // 左腹板宽度 - 毫米
    const [leftWidthMM, setLeftWidthMM] = useState('')
    // 底板宽度 - 毫米
    const [bottomWidthMM, setBottomWidthMM] = useState('')
    // 右腹板宽度 - 毫米
    const [rightWidthMM, setRightWidthMM] = useState('')
    // 倾斜量 - 米
    const [slantM, setSlantM] = useState('')

    const [saveDescription, setSaveDescription] = useState()

    // 构件类型
    const [labelName, setLabelName] = useState()
    // 构件区域
    const [areaName, setAreaName] = useState()

    // 病害名称
    const [infoshort, setInfoShort] = useState()

    // 位置描述 墩台
    const [pier,  setPier] = useState()
    // 位置描述 长、宽、距顶
    const [lengthNum, setLengthNum] = useState()
    const [widthNum, setWidthNum] = useState()
    const [heightNum, setHeightNum] = useState()


    // const [diseaseName, setDiseaseName] = useState('')
    // =================================================
    React.useEffect(() => {
      saveData.current = {...diseaseData};
      try {

        if (baseData.membercheckdata) {
          console.log('保存baseData数据');
          setBaseDataStorage(JSON.stringify(baseData.membercheckdata))
        }
        if (route.params.thridData.datastr && baseData.membercheckdata) {
          let infoList = []
          route.params.thridData.datastr.forEach((item) => {
            // console.log('病害列表传入的datastr',item);
            baseData.membercheckdata.forEach((item1) => {
              if (item == item1.strid) {
                // console.log('取出来的item1',item1);
                infoList.push(item1)
              }
            })
          })
          setInfoList(infoList)
        } else if (!baseData.membercheckdata) {
          console.log('读取baseData数据');
          getBaseDataStorage('baseData')
        }

        if (diseaseData.diseaseName == undefined || diseaseData.diseaseName == '') {
          console.log('7777');
          diseaseData['diseaseName'] = route.params.thridData.checkinfoshort
          handleFormChenge(route.params.thridData.checkinfoshort, diseaseData.diseaseName)
          // setDiseaseName(route.params.thridData.checkinfoshort)
        }
      } catch (err){
        console.log('err09', err);
      }
      try {
        let lengthText = (diseaseData.memberLength * (diseaseData.disLength / 100)).toFixed(2)
        setLengthText(lengthText)
        let widthText = (diseaseData.memberWidth * (diseaseData.disWidth / 100)).toFixed(2)
        setWidthText(widthText)
        let heightText = (diseaseData.memberHeight * (diseaseData.disHeight / 100)).toFixed(2)
        setHeightText(heightText)
        if (lengthText == 'NaN') {
          let lengthText = '0'
          setLengthText(lengthText)
        }
        if (widthText == 'NaN') {
          let widthText = '0'
          setWidthText(widthText)
        }
        if (heightText == 'NaN') {
          let heightText = '0'
          setHeightText(heightText)
        }


        if (diseaseData.area == undefined) {

        } else if (diseaseData.area !== '' || diseaseData.area !== undefined || diseaseData.area !== '/') {
          var sliceArea = diseaseData.area.slice(0,5)
        }

        if (diseaseData.areatype == 'at0000' && sliceArea == 'at000') {
          console.log(sliceArea);
          // console.log('xu~~~~~');
          diseaseData['area'] = '/'
        }

        // 将病害位置的长宽高数据存进diseaseData
        diseaseData['lengthText'] = lengthText
        diseaseData['widthText'] = widthText
        diseaseData['heightText'] = heightText
        diseaseData['remark'] = route.params.thridData.checkinfoshort
        
        // 取病害名称并保存
        if (diseaseData.diseaseName == '' || diseaseData.diseaseName == undefined) {
          let diseaseName = route.params.thridData.checkinfoshort
          // setDiseaseName(diseaseName)
          // console.log('0000000');
          // console.log('~~~~~~~diseaseName~~~~~',diseaseName);
          diseaseData['diseaseName'] = diseaseName
          handleFormChenge(diseaseName, diseaseData.diseaseName)
          // setDiseaseName(diseaseName)
        }
        
        if (diseaseData.stairgroupid == undefined || diseaseData.stairgroupid == '') {
          // console.log('0000.000');
          diseaseData['stairgroupid'] = route.params.stairgroupid
          handleFormChenge(route.params.stairgroupid, diseaseData.stairgroupid)
        }
        
        if (diseaseData.remark == '' || diseaseData.remark == undefined) {
          let infoshort = route.params.thridData.checkinfoshort
          setInfoShort(infoshort)
        }
        if (diseaseData.description == '' || diseaseData.description == undefined) {
          diseaseData['description'] = diseaseData.remark
        }

        if (diseaseData.writePositionTxt == undefined || diseaseData.writePositionTxt == '') {
          let writePositionTxt = '/'
          setWritePositionTxt(writePositionTxt)
          diseaseData['writePositionTxt'] = writePositionTxt
          handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
        }

        // console.log('scale',scale, diseaseData.scale);
        // if (diseaseData.scale == '4') {
        //   diseaseData['scale'] = '2'
        //   handleFormChenge('2',diseaseData.scale)
        // }
        try {
          if (itemData && route.params.mediaType == 'add') {
            diseaseData['scale'] = rightScaleNum
            handleFormChenge(rightScaleNum, diseaseData.scale)
            route.params.mediaType = ''
          }
        } catch (error) {
          console.log('设置标度初始值',error);
        }
      } catch {
      }
    }, [diseaseData]);

    // 保存baseData的数据
    const setBaseDataStorage = async(value) => {
      try {
        await AsyncStorage.setItem('baseData', value)
      } catch (err) {
        console.log('存入数据失败!3', err);
      }
    }
    // 读取baseData的数据
    const getBaseDataStorage = async(name) => {
      // console.log('读取baseData数据')
      try {
        const value = await AsyncStorage.getItem(name)
        let values = JSON.parse(value)
        // console.log('value~~~',value);
        let infoList = []
          route.params.thridData.datastr.forEach((item) => {
            // console.log('病害列表传入的datastr',item);
            values.forEach((item1) => {
              if (item == item1.strid) {
                // console.log('取出来的item1',item1);
                infoList.push(item1)
              }
            })
          })
          setInfoList(infoList)
      } catch (error) {
        console.log('读取baseData数据失败',error);
      }
    }

    // 重新获取数据的标度选项数组
    const [rightScale, setRightScale] = useState([])
    // 默认的标度值
    const [rightScaleNum, setRightScaleNum] = useState('')
    // 重新获取数据的标度评定标准表格
    const [scaleTabel, setScaleTabel] = useState([])
  
    React.useEffect(() => {

      try {
        console.log('scale',scale);
        // console.log('baseData', baseData);
        // console.log('标度表格信息baseData.basestandardtable',baseData.basestandardtable)

        // 当页面是由新建进入时，存储标度数组，以备编辑进入时使用
        if (route.params.mediaType == 'add' || route.params.mediaType == '') {
          // =================================
          // 获取标度列表与标度默认值
          let scaleSelect = baseData.basestandardtable
          let oldArr = ''
          let scaleNum = ''
          scaleSelect.forEach(item => {
            // console.log('33330000',item.standardid);
            
            if (route.params.thridData.strandardid == item.standardid) {
              console.log('当前病害的标度选项',item);
              // setRightScale(item.standardscalestr)
              oldArr = item.standardscalestr
              scaleNum = item.standardscale
            }
          });
          setRightScaleNum(scaleNum)
          // console.log('rightScale',rightScale);
          const arr = oldArr.split(',')
          console.log('arr',arr);
          
          let resetArr = []
          arr.forEach((item, index) => {
            resetArr.push({
              label:index + 1,
              value:item
            })
          })
          console.log('resetArr',resetArr);
          setRightScale(resetArr)
          diseaseData['scaleArr'] = rightScale
          handleFormChenge(rightScale, diseaseData.scaleArr)

          // =================================
          // 获取标度评定标准表数据
          let scaleTabel = baseData.standardtableinfo
          // console.log('表格数据',scaleTabel);
          let oldTable = []
          scaleTabel.forEach((item) => {
            if (route.params.thridData.strandardid == item.standardid) {
              // console.log('当前的评定表item',item);
              oldTable.push(item)
            }
          })
          console.log('oldTable',oldTable);
          setScaleTabel(oldTable)
          diseaseData['scaleTableArr'] = oldTable
          handleFormChenge(oldTable, diseaseData.scaleTableArr)


        } else if (route.params.mediaType == 'edit') {
          // 当页面是由编辑进入时
          setRightScale(diseaseData.scaleArr)
          setScaleTabel(scaleTabel)
          // console.log('rightScale222222',rightScale);
        }
      } catch (error) {
        console.log('获取标度数据',error);
      }

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
            // .map(
            //   ({strname, strvalue, strunit}) =>
            //     `${strname}${saveData.current[strvalue] || 0}@@${
            //       strunit || ''
            //     }@@`,
            // )
            .map(
              ({strname, strvalue, strunit}) =>
                `${saveData.current[strvalue] == undefined ? '' : strname + saveData.current[strvalue] + '@@' + strunit + '@@'}`
            )
            const strr = str.filter(item => item!=='') == '' ? '/' : str.filter(item => item!=='')
            // .join(',');
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
            }，${strr}`,
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

    useEffect(() => {
      // console.log('桥跨：：',route.params.memberList);
      let defaultPier = route.params.memberList[0].membername
      // 提取第一个字符进行判断（表示墩台的数据）
      let firstDefaultPier = defaultPier.slice(0,1)
      if (firstDefaultPier == 1) {
        let pier = '距' + (firstDefaultPier - 1) + '#台'
        setPier(pier)
        // console.log('dundun:', pier);
      } else {
        let pier = '距' + (firstDefaultPier - 1) + '#墩'
        setPier(pier)
        // console.log('dundun:', pier);
      }

      // console.log('构件区域列表：：',areaparam);
      // console.log('表单中的构件区域',diseaseData.area);
      if (areaparam == '' || areaparam == undefined) {
        console.log('选的其他');
        try{
         console.log('构件类型', itemData.areatype); 
         if (itemData.areatype == 'at0000' || itemData.areatype == undefined) {
          // console.log('9999');
          diseaseData['area'] = '/'
          let labelName = itemData.areatype
          setLabelName(labelName)
         }
        } catch {

        }
      }
    },[])

    const handleScaleOpen = () => scaleInfoRef.current.open();
    const handleFormChenge = ({name, value}) => {
      // const _data = {
      //   ...diseaseData,
      //   [name]: value,
      // };
      let unitt = JSON.stringify(diseaseData, [
                                  'areatype','area','scale','lengthText','widthText','heightText','memberLength','memberWidth',
                                'memberHeight','disLength','disWidth','disHeight','hzbrmc_length_m','hzbrmc_length_cm','hzbrmc_length_mm','hzbrmc_width_m',
                                'hzbrmc_width_cm','hzbrmc_width_mm','hzbrmc_height_m','hzbrmc_height_cm','hzbrmc_height_mm',
                                'hzbrmc_area_face','hzbrmc_area_per','hzbrmc_area_m','hzbrmc_area_cm','hzbrmc_area_mm',
                                'hzbrmc_heightdiff_cm','hzbrmc_heightdiff_mm','hzbrmc_spacing_cm','hzbrmc_deformation_mm',
                                'hzbrmc_num','hzbrmc_range_cm','hzbrmc_range_mm','hzbrmc_depth_cm','hzbrmc_depth_mm',
                                'hzbrmc_volume_m','hzbrmc_volume_cm','hzbrmc_disp_cm','hzbrmc_disp_mm','hzbrmc_angle_c',
                                'hzbrmc_chu','hzbrmc_tiao','hzbrmc_range_fenbu_m','hzbrmc_range_length_m','hzbrmc_range_width_mm',
                                'hzbrmc_range_spacing_cm','hzbrmc_lb_left_length_m','hzbrmc_lb_bottom_length_m','hzbrmc_lb_right_length_m',
                                'hzbrmc_lb_left_width_mm','hzbrmc_lb_bottom_width_mm','hzbrmc_lb_right_width_mm','hzbrmc_slant_m'])
      // console.log(unitt);
      let unit = JSON.parse(unitt)
      diseaseData['unit'] = unit
      // const {area,areatype,scale,hzbrmc_length_m,hzbrmc_length_cm,hzbrmc_length_mm,hzbrmc_width_m,hzbrmc_width_cm,
      //   hzbrmc_width_mm,hzbrmc_height_m,hzbrmc_height_cm,hzbrmc_height_mm,hzbrmc_area_face,hzbrmc_area_per,
      //   hzbrmc_area_m,hzbrmc_area_cm,hzbrmc_area_mm,hzbrmc_heightdiff_cm,hzbrmc_heightdiff_mm,hzbrmc_spacing_cm,
      //   hzbrmc_deformation_mm,hzbrmc_num,hzbrmc_range_cm,hzbrmc_range_mm,hzbrmc_depth_cm,hzbrmc_depth_mm,
      //   hzbrmc_volume_m,hzbrmc_volume_cm,hzbrmc_disp_cm,hzbrmc_disp_mm,hzbrmc_angle_c,hzbrmc_chu,hzbrmc_tiao,
      //   hzbrmc_range_fenbu_m,hzbrmc_range_length_m,hzbrmc_range_width_mm,hzbrmc_range_spacing_cm,hzbrmc_lb_left_length_m,
      //   hzbrmc_lb_bottom_length_m,hzbrmc_lb_right_length_m,hzbrmc_lb_left_width_mm,hzbrmc_lb_bottom_width_mm,
      //   hzbrmc_lb_right_width_mm,hzbrmc_slant_m,lengthText,widthText,heightText,memberLength,memberWidth,
      //   memberHeight,disLength,disWidth,disHeight,...rest} = diseaseData
      const _data = {
        ...diseaseData,
        [name]: value,
      };

      if (name === 'checktypeid') {
        const _type = route.params.type.list.find(
          item => value === item.checktypeid,
        );
        let defaultScaleVal = '';
        if (_type) {
          defaultScaleVal = _type?.standardscale;
        }
        _data.scale = defaultScaleVal;
        const {basestandardtable, infoComponents} = baseData;
        const standardid =
          infoComponents.find(({checktypeid}) => value === checktypeid)
            ?.standardid || '';
        if (standardid) {
          const _standardscale = basestandardtable.find(
            item => standardid === item.standardid,
          )?.standardscale;
          if (_standardscale) {
            _data.standard = {
              scale: _standardscale,
              id: standardid,
            };
          } else {
            const defaultScale = basestandardtable.find(
              item => item.standardid === 'JTG-TH21-2011-T000-0',
            )?.standardscale;
            _data.standard = {
              scale: defaultScale,
              id: 'JTG-TH21-2011-T000-0',
            };
          }
        }
        _data.scale = _data.scale || '';
      }

      if (value) {
        // 向病害描述函数里传入
        writeDesText(name, value)
      }

      if (name == 'scale') {
        // 标度
        let biaodu = ',标度' + value + '@@'
        setBiaodu(biaodu)
      } else if (name == 'hzbrmc_length_m') {
        //长度 - 米
        // let lengthM = ',长度' + value + '@@米@@'
        // setLengthM(lengthM)
        if (value == '' || value == 0) {
          let lengthM = ''
          setLengthM(lengthM)
        } else {
          let lengthM = ',长度' + value + '@@米@@'
          setLengthM(lengthM)
        }
      } else if (name == 'hzbrmc_length_cm') {
        // 长度 - 厘米
        // let lengthCM = ',长度' + value + '@@厘米@@'
        // setLengthCM(lengthCM)
        if (value == '' || value == 0) {
          let lengthCM = ''
          setLengthCM(lengthCM)
        } else {
          let lengthCM = ',长度' + value + '@@厘米@@'
          setLengthCM(lengthCM)
        }
      } else if (name == 'hzbrmc_length_mm') {
        // 长度 - 毫米
        // let lengthMM = ',长度' + value + '@@毫米@@'
        // setLengthMM(lengthMM)
        if (value == '' || value == 0) {
          let lengthMM = ''
          setLengthMM(lengthMM)
        } else {
          let lengthMM = ',长度' + value + '@@毫米@@'
          setLengthMM(lengthMM)
        }
      } else if (name == 'hzbrmc_width_m') {
        // 宽度 - 米
        // let widthM = ',宽度' + value + '@@米@@'
        // setWidthM(widthM)
        if (value == '' || value == 0) {
          let widthM = ''
          setWidthM(widthM)
        } else {
          let widthM = ',宽度' + value + '@@米@@'
          setWidthM(widthM)
        }
      } else if (name == 'hzbrmc_width_cm') {
        // 宽度 - 厘米
        // let widthCM = ',宽度' + value + '@@厘米@@'
        // setWidthCM(widthCM)
        if (value == '' || value == 0) {
          let widthCM = ''
          setWidthCM(widthCM)
        } else {
          let widthCM = ',宽度' + value + '@@厘米@@'
          setWidthCM(widthCM)
        }
      } else if (name == 'hzbrmc_width_mm') {
        // 宽度 - 毫米
        if (value == '' || value == 0) {
          let widthMM = ''
          setWidthMM(widthMM)
        } else {
          let widthMM = ',宽度' + value + '@@毫米@@'
          setWidthMM(widthMM)
        }
      } else if (name == 'hzbrmc_height_m') {
        // 高度 - 米
        // let heightM = ',高度' + value + '@@米@@'
        // setHeightM(heightM)
        if (value == '' || value == 0) {
          let heightM = ''
          setHeightM(heightM)
        } else {
          let heightM = ',高度' + value + '@@米@@'
          setHeightM(heightM)
        }
      } else if (name == 'hzbrmc_height_cm') {
        // 高度 - 厘米
        if (value == '' || value == 0) {
          let heightCM = ''
          setHeightCM(heightCM)
        } else {
          let heightCM = ',高度' + value + '@@厘米@@'
          setHeightCM(heightCM)
        }
      } else if (name == 'hzbrmc_height_mm') {
        // 高度 - 毫米
        // let heightMM = ',高度' + value + '@@毫米@@'
        // setHeightMM(heightMM)
        if (value == '' || value == 0) {
          let heightMM = ''
          setHeightMM(heightMM)
        } else {
          let heightMM = ',高度' + value + '@@毫米@@'
          setHeightMM(heightMM)
        }
      } else if (name == 'hzbrmc_area_face') {
        // 面域 - %
        // let areaFace = ',面域' + value + '@@%@@'
        // setAreaFace(areaFace)
        if (value == '' || value == 0) {
          let areaFace = ''
          setAreaFace(areaFace)
        } else {
          let areaFace = ',面域' + value + '@@%@@'
          setAreaFace(areaFace)
        }
      } else if (name == 'hzbrmc_area_per') {
        // 面积占比 - %
        // let areaPer = ',面积占比' + value + '@@%@@'
        // setAreaPer(areaPer)
        if (value == '' || value == 0) {
          let areaPer = ''
          setAreaPer(areaPer)
        } else {
          let areaPer = ',面积占比' + value + '@@%@@'
          setAreaPer(areaPer)
        }
      } else if (name == 'hzbrmc_area_m') {
        // 面积 - 平方米
        // let areaM = ',面积' + value + '@@平方米@@'
        // setAreaM(areaM)
        if (value == '' || value == 0) {
          let areaM = ''
          setAreaM(areaM)
        } else {
          let areaM = ',面积' + value + '@@平方米@@'
          setAreaM(areaM)
        }
      } else if (name == 'hzbrmc_area_cm') {
        // 面积 - 平方厘米
        // let areaCM = ',面积' + value + '@@平方厘米@@'
        // setAreaCM(areaCM)
        if (value == '' || value == 0) {
          let areaCM = ''
          setAreaCM(areaCM)
        } else {
          let areaCM = ',面积' + value + '@@平方厘米@@'
          setAreaCM(areaCM)
        }
      } else if (name == 'hzbrmc_area_mm') {
        // 面积 - 平方毫米
        // let areaMM = ',面积' + value + '@@平方毫米@@'
        // setAreaMM(areaMM)
        if (value == '' || value == 0) {
          let areaMM = ''
          setAreaMM(areaMM)
        } else {
          let areaMM = ',面积' + value + '@@平方毫米@@'
          setAreaMM(areaMM)
        }
      } else if (name == 'hzbrmc_heightdiff_cm') {
        // 高差 - 厘米
        // let heightDiffCM = ',高差' + value + '@@厘米@@'
        // setHeightDiffCM(heightDiffCM)
        if (value == '' || value == 0) {
          let heightDiffCM = ''
          setHeightDiffCM(heightDiffCM)
        } else {
          let heightDiffCM = ',高差' + value + '@@厘米@@'
          setHeightDiffCM(heightDiffCM)
        }
      } else if (name == 'hzbrmc_heightdiff_mm') {
        // 高差 - 毫米
        // let heightDiffMM = ',高差' + value + '@@毫米@@'
        // setHeightDiffMM(heightDiffMM)
        if (value == '' || value == 0) {
          let heightDiffMM = ''
          setHeightDiffMM(heightDiffMM)
        } else {
          let heightDiffMM = ',高差' + value + '@@毫米@@'
          setHeightDiffMM(heightDiffMM)
        }
      } else if (name == 'hzbrmc_spacing_cm') {
        // 间距 - 厘米
        // let spacingCM = ',间距' + value + '@@厘米@@'
        // setSpacingCM(spacingCM)
        if (value == '' || value == 0) {
          let spacingCM = ',间距' + value + '@@厘米@@'
          setSpacingCM(spacingCM)
        } else {
          let spacingCM = ',间距' + value + '@@厘米@@'
          setSpacingCM(spacingCM)
        }
      } else if (name == 'hzbrmc_deformation_mm') {
        // 变形 - 毫米
        // let deformationMM = ',变形' + value + '@@毫米@@'
        // setDeformationMM(deformationMM)
        if (value == '' || value == 0) {
          let deformationMM = ''
          setDeformationMM(deformationMM)
        } else {
          let deformationMM = ',变形' + value + '@@毫米@@'
          setDeformationMM(deformationMM)
        }
      } else if (name == 'hzbrmc_num') {
        // 个数 - 个
        // let num = ',个数' + value + '@@个@@'
        // setNum(num)
        if (value == '' || value == 0) {
          let num = ''
          setNum(num)
        } else {
          let num = ',个数' + value + '@@个@@'
          setNum(num)
        }
      } else if (name == 'hzbrmc_range_cm') {
        // 距离 - 厘米
        // let rangeCM = ',距离' + value + '@@厘米@@'
        // setRangeCM(rangeCM)
        if (value == '' || value == 0) {
          let rangeCM = ''
          setRangeCM(rangeCM)
        } else {
          let rangeCM = ',距离' + value + '@@厘米@@'
          setRangeCM(rangeCM)
        }
      } else if (name == 'hzbrmc_range_mm') {
        // 距离 - 毫米
        // let rangeMM = ',距离' + value + '@@毫米@@'
        // setRangeMM(rangeMM)
        if (value == '' || value == 0) {
          let rangeMM = ''
          setRangeMM(rangeMM)
        } else {
          let rangeMM = ',距离' + value + '@@毫米@@'
          setRangeMM(rangeMM)
        }
      } else if (name == 'hzbrmc_depth_cm') {
        // 深度 - 厘米
        // let depthCM = ',深度' + value + '@@厘米@@'
        // setDepthCM(depthCM)
        if (value == '' || value == 0) {
          let depthCM = ''
          setDepthCM(depthCM)
        } else {
          let depthCM = ',深度' + value + '@@厘米@@'
          setDepthCM(depthCM)
        }
      } else if (name == 'hzbrmc_depth_mm') {
        // 深度 - 毫米
        // let depthMM = ',深度' + value + '@@毫米@@'
        // setDepthMM(depthMM)
        if (value == '' || value == 0) {
          let depthMM = ''
          setDepthMM(depthMM)
        } else {
          let depthMM = ',深度' + value + '@@毫米@@'
          setDepthMM(depthMM)
        }
      } else if (name == 'hzbrmc_volume_m') {
        // 体积 - 立方米
        // let volumeM = ',体积' + value + '@@立方米@@'
        // setVolumeM(volumeM)
        if (value == '' || value == 0) {
          let volumeM = ''
          setVolumeM(volumeM)
        } else {
          let volumeM = ',体积' + value + '@@立方米@@'
          setVolumeM(volumeM)
        }
      } else if (name == 'hzbrmc_volume_cm') {
        // 体积 - 立方厘米
        // let volumeCM = ',体积' + value + '@@立方厘米@@'
        // setVolumeCM(volumeCM)
        if (value == '' || value == 0) {
          let volumeCM = ''
          setVolumeCM(volumeCM)
        } else {
          let volumeCM = ',体积' + value + '@@立方厘米@@'
          setVolumeCM(volumeCM)
        }
      } else if (name == 'hzbrmc_disp_cm') {
        // 位移 - 厘米
        // let dispCM = ',位移' + value + '@@厘米@@'
        // setDispCM(dispCM)
        if (value == '' || value == 0) {
          let dispCM = ''
          setDispCM(dispCM)
        } else {
          let dispCM = ',位移' + value + '@@厘米@@'
          setDispCM(dispCM)
        }
      } else if (name == 'hzbrmc_disp_mm') {
        // 位移 - 毫米
        // let dispMM = ',位移' + value + '@@毫米@@'
        // setDispMM(dispMM)
        if (value == '' || value == 0) {
          let dispMM = ''
          setDispMM(dispMM)
        } else {
          let dispMM = ',位移' + value + '@@毫米@@'
          setDispMM(dispMM)
        }
      } else if (name == 'hzbrmc_angle_c') {
        // 角度 - 度
        // let angle = ',角度' + value + '@@度@@'
        // setAngle(angle)
        if (value == '' || value == 0) {
          let angle = ''
          setAngle(angle)
        } else {
          let angle = ',角度' + value + '@@度@@'
          setAngle(angle)
        }
      } else if (name == 'hzbrmc_chu') {
        // 处
        // let chu = ',' + value + '@@处@@'
        // setChu(chu)
        if (value == '' || value == 0) {
          let chu = ''
          setChu(chu)
        } else {
          let chu = ',' + value + '@@处@@'
          setChu(chu)
        }
      } else if (name == 'hzbrmc_tiao') {
        // 条
        // let tiao = ',' + value + '@@条@@'
        // setTiao(tiao)
        if (value == '' || value == 0) {
          let tiao = ''
          setTiao(tiao)
        } else {
          let tiao = ',' + value + '@@条@@'
          setTiao(tiao)
        }
      } else if (name == 'hzbrmc_range_fenbu_m') {
        // 分布范围 - 米
        // let rangeFenbuM = ',分布范围' + value + '@@米@@'
        // setRangeFenbuM(rangeFenbuM)
        if (value == '' || value == 0) {
          let rangeFenbuM = ''
          setRangeFenbuM(rangeFenbuM)
        } else {
          let rangeFenbuM = ',分布范围' + value + '@@米@@'
          setRangeFenbuM(rangeFenbuM)
        }
      } else if (name == 'hzbrmc_range_length_m') {
        // 长度范围 - 米
        // let rangeLengthM = ',长度范围' + value + '@@米@@'
        // setRangeLengthM(rangeLengthM)
        if (value == '' || value == 0) {
          let rangeLengthM = ''
          setRangeLengthM(rangeLengthM)
        } else {
          let rangeLengthM = ',长度范围' + value + '@@米@@'
          setRangeLengthM(rangeLengthM)
        }
      } else if (name == 'hzbrmc_range_width_mm') {
        // 宽度范围 - 毫米
        // let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
        // setRangeWidthMM(rangeWidthMM)
        if (value == '' || value == 0) {
          let rangeWidthMM = ''
          setRangeWidthMM(rangeWidthMM)
        } else {
          let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
          setRangeWidthMM(rangeWidthMM)
        }
      } else if (name == 'hzbrmc_range_spacing_cm') {
        // 间距范围 - 厘米
        // let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
        // setRangeSpacingCM(rangeSpacingCM)
        if (value == '' || value == 0) {
          let rangeSpacingCM = ''
          setRangeSpacingCM(rangeSpacingCM)
        } else {
          let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
          setRangeSpacingCM(rangeSpacingCM)
        }
      } else if (name == 'hzbrmc_lb_left_length_m') {
        // 左腹板长度 - 米
        // let leftLengthM = ',左腹板长度' + value + '@@米@@'
        // setLeftLengthM(leftLengthM)
        if (value == '' || value == 0) {
          let leftLengthM = ''
          setLeftLengthM(leftLengthM)
        } else {
          let leftLengthM = ',左腹板长度' + value + '@@米@@'
          setLeftLengthM(leftLengthM)
        }
      } else if (name == 'hzbrmc_lb_bottom_length_m') {
        // 底板长度 - 米
        // let bottomLengthM = ',底板长度' + value + '@@米@@'
        // setBottomLengthM(bottomLengthM)
        if (value == '' || value == 0) {
          let bottomLengthM = ''
          setBottomLengthM(bottomLengthM)
        } else {
          let bottomLengthM = ',底板长度' + value + '@@米@@'
          setBottomLengthM(bottomLengthM)
        }
      } else if (name == 'hzbrmc_lb_right_length_m') {
        // 右腹板长度 - 米
        // let rightLengthM = ',右腹板长度' + value + '@@米@@'
        // setRightLengthM(rightLengthM)
        if (value == '' || value == 0) {
          let rightLengthM = ''
          setRightLengthM(rightLengthM)
        } else {
          let rightLengthM = ',右腹板长度' + value + '@@米@@'
          setRightLengthM(rightLengthM)
        }
      } else if (name == 'hzbrmc_lb_left_width_mm') {
        // 左腹板宽度 - 毫米
        // let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
        // setLeftWidthMM(leftWidthMM)
        if (value == '' || value == 0) {
          let leftWidthMM = ''
          setLeftWidthMM(leftWidthMM)
        } else {
          let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
          setLeftWidthMM(leftWidthMM)
        }
      } else if (name == 'hzbrmc_lb_bottom_width_mm') {
        // 底板宽度 - 毫米
        // let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
        // setBottomWidthMM(bottomWidthMM)
        if (value == '' || value == 0) {
          let bottomWidthMM = ''
          setBottomWidthMM(bottomWidthMM)
        } else {
          let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
          setBottomWidthMM(bottomWidthMM)
        }
      } else if (name == 'hzbrmc_lb_right_width_mm') {
        // 右腹板宽度 - 毫米
        // let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
        // setRightWidthMM(rightWidthMM)
        if (value == '' || value == 0) {
          let rightWidthMM = ''
          setRightWidthMM(rightWidthMM)
        } else {
          let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
          setRightWidthMM(rightWidthMM)
        }
      } else if (name == 'hzbrmc_slant_m') {
        // 倾斜量 - 米
        // let slantM = ',倾斜量' + value + '@@米@@'
        // setSlantM(slantM)
        if (value == '' || value == 0) {
          let slantM = ''
          setSlantM(slantM)
        } else {
          let slantM = ',倾斜量' + value + '@@米@@'
          setSlantM(slantM)
        }
      }
      setDiseaseData(_data);
    };

    // 填入病害描述内容
    // const writeDesText = () => {
    //   try {
    //     let writeTxt = lengthM + lengthCM + lengthMM + widthM + widthCM
    //                   + widthMM + heightM + heightCM + heightMM + areaFace
    //                   + areaPer + areaM + areaCM + areaMM + heightDiffCM + heightDiffMM
    //                   + spacingCM + deformationMM + num + rangeCM + rangeMM + depthCM
    //                   + depthMM + volumeM + volumeCM + dispCM + dispMM + angle + chu
    //                   + tiao + rangeFenbuM + rangeLengthM + rangeWidthMM + rangeSpacingCM
    //                   + leftLengthM + bottomLengthM + rightLengthM + leftWidthMM
    //                   + bottomWidthMM + rightWidthMM + slantM
    //     setWriteTxt(writeTxt)
    //     console.log('writeTxt', writeTxt);
    //     // console.log('remark:', diseaseData.remark);
    //     // console.log('route:::', route.params.thridData.checkinfoshort);
        
    //     console.log('病害名称:::', diseaseData.diseaseName);

    //     // 在remark里面查找这两位内容，取出其位置下标
    //     if (diseaseData.remark !== undefined) {
    //       if (writeTxt == '' || writeTxt == undefined) {
    //         console.log('writeTxt没有内容~~~~~~');
    //         // 当还没有输入的内容时
    //         // 截取有变化的数据的二、三位内容(第一位为逗号)
    //         // let sliceWrite = writeTxt.slice(1, 3)
    //         // console.log('sliceWrite', sliceWrite);
    //         let allText = diseaseData.remark
    //         console.log('allText',allText);

    //         // 将remark里的中文逗号替换为英文逗号
    //         // ================================
    //         let num =allText.indexOf('，')
    //         // console.log('num',num);
    //         if (num !== -1) {
    //           let qian = allText.slice(0,allText.indexOf('，'))
    //           // console.log('qian',qian);
    //           let hou = allText.slice(allText.indexOf('，')+1)
    //           // console.log('hou',hou);
    //           let reset = qian + ',' + hou
    //           // console.log('reset',reset);
    //           diseaseData['description'] = reset
    //           handleFormChenge(reset, diseaseData.description)
    //         } else if (num == -1) {
    //           diseaseData['description'] = allText
    //           handleFormChenge(allText, diseaseData.description)
    //         }
    //         // ================================
            
    //         // let binghai = allText.slice(0,allText.indexOf(','))
    //         // console.log('binghai',binghai);
    //         // let numStart = allText.indexOf(sliceWrite)
    //         // console.log(numStart);
    //         // // 替换下标位置到其后第一个逗号之间的内容
    //         // let allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
    //         // console.log('allTextEnd', allTextEnd);
    //         // let douhao = ','
    //         // let numEnd = allTextEnd.indexOf(douhao)
    //         // console.log('numEnd', numEnd);
    //         // // 得出内容的末尾下标值
    //         // let lengthAll = numStart + numEnd
    //         // console.log('lengthAll', lengthAll);
    //         // // diseaseData['description'] = writeTxt
    //         // let aaaa = allText.substr(0, numStart-1)
    //         // console.log('aaaa: ', aaaa);
    //         // let bbbb = allText.substr(lengthAll)
    //         // console.log('bbbb', bbbb);
    //         // let cccc = aaaa.concat(bbbb)
    //         // console.log('cccc: ', cccc);
    //         // let ccca = '' + writeTxt
    //         // // let saveDescription = cccc.concat(ccca)
    //         // let saveDescription = binghai.concat(ccca)
    //         // setSaveDescription(saveDescription)
    //         // console.log('saveDescription: ', saveDescription);
    //         // diseaseData['description'] = allText
    //         // handleFormChenge(allText, diseaseData.description)
    //       } else if (writeTxt !== '' || writeTxt !== undefined) {
    //         // 当有输入的内容时
    //         console.log('=============================================================================');
    //         console.log('writeTxt有内容： ',writeTxt);
    //         let writeArr = []
    //         // 将输入的内容按逗号分隔开
    //         // 先找到逗号
    //         let num = 0
    //         let commaKey = writeTxt.indexOf(',') //从第1号位开始查找逗号
    //         console.log('逗号的位置：',commaKey);
    //         let writeArrNum = []
    //         // 查找逗号出现的位置，将其下标存入数组
    //         while (commaKey !== -1) {
    //           writeArrNum.push(commaKey)
    //           console.log('commaKey逗号出现的位置:',commaKey);
    //           num ++
    //           commaKey = writeTxt.indexOf(',', commaKey + 1)
    //         }
    //         console.log('逗号出现的次数:', num);
    //         console.log('截取节点数组：', writeArrNum);
    //         // 根据查找出的逗号下标，对输入的内容进行截取，转存进新的数组
    //         for (let i = 0; i < writeArrNum.length; i++) {
    //           writeArr.push(
    //             writeTxt.slice(writeArrNum[i], writeArrNum[i+1])
    //           )
    //         }
    //         console.log('截取后的数组：',writeArr);
    //         // 对writeArr数组的每一项进行替换
    //         for (let i = 0; i < writeArr.length; i++) {
              
    //             // 截取数组每一项的二、三位内容，与原有数据对比
    //             let sliceWrite = writeArr[i].slice(1, 3)
    //             console.log('sliceWrite',sliceWrite);
    //             if (diseaseData.description == undefined || diseaseData.description == '') {
    //               var allText = diseaseData.remark
    //             } else if (diseaseData.description !== undefined || diseaseData.description !== '') {
    //               var allText = diseaseData.description
    //             }
                
    //             console.log('allText', allText);
    //             // console.log('sliceWrite:', sliceWrite);
    //             let numStart = allText.indexOf(sliceWrite)
    //             console.log('numStart',numStart);
    //             // 替换下标位置到其后第一个逗号之间的内容
    //             var allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
    //             console.log('allTextEnd', allTextEnd);
    //             let numEnd = allTextEnd.indexOf(',')
    //             console.log('numEnd', numEnd);
    //             if (numEnd !== -1) {
    //               console.log('numEnd的值1', numEnd);
    //               // 得出内容的末尾下标值
    //               let lengthAll = numStart + numEnd
    //               // console.log('lengthAll', lengthAll);
    //               let aaaa = allText.substr(0, numStart-1)
    //               // console.log('aaaa: ', aaaa);
    //               let bbbb = allText.substr(lengthAll)
    //               // console.log('bbbb', bbbb);
    //               let ccca = '' + writeArr[i].concat(bbbb)
    //               let saveDescription = aaaa.concat(ccca)
    //               setSaveDescription(saveDescription)
    //               // console.log('saveDescription: ', saveDescription);
    //               diseaseData['description'] = saveDescription
    //               handleFormChenge(saveDescription, diseaseData.description)
    //             } else {
    //               console.log('numEnd的值2', numEnd);
    //               let aaaa = ''
    //               // 到数组的最后一项时，不再有逗号，numEnd返回-1；改变替换内容的方式
    //               if (numStart == -1) {
    //                 aaaa = allText
    //               } else if (numStart !== -1) {
    //                 // aaaa = allText.substr(0, numStart-1)
    //                 // aaaa = allText.substr(0,allText.indexOf(','))

    //                 // 当病害名称里含有逗号时，截取到第二个逗号
    //                 let doudou = diseaseData.diseaseName.indexOf('，')
    //                 console.log('doudou', doudou);
    //                 if (doudou !== -1) {
    //                   let testa = allText.slice(doudou+1)
    //                   console.log('testa',testa);
    //                   let testb = testa.slice(0, testa.indexOf(','))
    //                   console.log('testb',testb);
    //                   let boubou = allText.slice(doudou,allText.indexOf(','))
    //                   console.log('boubou', boubou);
    //                   aaaa = allText.slice(0,doudou+1).concat(testb)
    //                 } else if (doudou == -1) {
    //                   aaaa = allText.substr(0,allText.indexOf(','))
    //                 }
                    
    //               }
    //               console.log('aaaa: ', aaaa);
    //               let bbbb = ''
    //               let ccca = ''
    //               for (let i =0; i < writeArr.length; i++) {
    //                 bbbb += writeArr[i]
                    
    //               }
    //               ccca = aaaa.concat(bbbb)
    //                 console.log('ccca', ccca);
    //                 let saveDescription = ccca
    //                 setSaveDescription(saveDescription)
    //                 // console.log('saveDescription: ', saveDescription);
    //                 diseaseData['description'] = saveDescription
    //                 // diseaseData['remark'] = saveDescription
    //                 handleFormChenge(saveDescription, diseaseData.description)
    //             }
                
    //         }
    //       }
    //     } else {
    //       let binghai = infoshort
    //       let allText = binghai.concat(writeTxt)
    //       // console.log('allText2',allText);
    //       diseaseData['description'] = allText
    //       handleFormChenge(allText, diseaseData.description)
          
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
      
      
    // }

    const [writeDesTextValue, setWriteDesTextValue] = useState('')

    const writeDesText = (name, value) => {
      // let writeTxt = []
      console.log('writeDesText', name, value);
      setWriteDesTextValue(value)

      if (true) {
        if (diseaseData.scale !== '' && diseaseData.scale !== '0' && diseaseData.scale !== '') {
          var biaodu = ',标度' + diseaseData.scale + '@@'
          setBiaodu(biaodu)
        } else {
          var biaodu = ''
          setBiaodu(biaodu)
        }
        if (diseaseData.hzbrmc_length_m !== undefined && diseaseData.hzbrmc_length_m !== '0' && diseaseData.hzbrmc_length_m !== '') {
          var lengthM = ',长度' + diseaseData.hzbrmc_length_m + '@@米@@'
          setLengthM(lengthM)
        } else {
          var lengthM = ''
          setLengthM(lengthM)
        }
        if (diseaseData.hzbrmc_length_cm !== undefined && diseaseData.hzbrmc_length_cm !== '0' && diseaseData.hzbrmc_length_cm !== '') {
          var lengthCM = ',长度' + diseaseData.hzbrmc_length_cm + '@@厘米@@'
          setLengthCM(lengthCM)
        } else {
          var lengthCM = ''
          setLengthCM(lengthCM)
        }
        if (diseaseData.hzbrmc_length_mm !== undefined && diseaseData.hzbrmc_length_mm !== '0' && diseaseData.hzbrmc_length_mm !== '') {
          var lengthMM = ',长度' + diseaseData.hzbrmc_length_mm + '@@毫米@@'
          setLengthMM(lengthMM)
        } else {
          var lengthMM = ''
          setLengthMM(lengthMM)
        }
        if (diseaseData.hzbrmc_width_m !== undefined && diseaseData.hzbrmc_width_m !== '0' && diseaseData.hzbrmc_width_m !== '') {
          var widthM = ',宽度' + diseaseData.hzbrmc_width_m + '@@米@@'
          setWidthM(widthM)
        } else {
          var widthM = ''
          setWidthM(widthM)
        }
        if (diseaseData.hzbrmc_width_cm !== undefined && diseaseData.hzbrmc_width_cm !== '0' && diseaseData.hzbrmc_width_cm !== '') {
          var widthCM = ',宽度' + diseaseData.hzbrmc_width_cm + '@@厘米@@'
          setWidthCM(widthCM)
        } else {
          var widthCM = ''
          setWidthCM(widthCM)
        }
        if (diseaseData.hzbrmc_width_mm !== undefined && diseaseData.hzbrmc_width_mm !== '0' && diseaseData.hzbrmc_width_mm !== '') {
          console.log('diseaseData.hzbrmc_width_mm',diseaseData.hzbrmc_width_mm == '');
          var widthMM = ',宽度' + diseaseData.hzbrmc_width_mm + '@@毫米@@'
          setWidthMM(widthMM)
        } else {
          // diseaseData.hzbrmc_width_mm == undefined || diseaseData.hzbrmc_width_mm == 0 || diseaseData.hzbrmc_width_mm == ''
          var widthMM = ''
          setWidthMM(widthMM)
        }
        if (diseaseData.hzbrmc_height_m !== undefined && diseaseData.hzbrmc_height_m !== '0' && diseaseData.hzbrmc_height_m !== '') {
          var heightM = ',高度' + diseaseData.hzbrmc_height_m + '@@米@@'
          setHeightM(heightM)
        } else {
          var heightM = ''
          setHeightM(heightM)
        }
        if (diseaseData.hzbrmc_height_cm !== undefined && diseaseData.hzbrmc_height_cm !== '0' && diseaseData.hzbrmc_height_cm !== '') {
          var heightCM = ',高度' + diseaseData.hzbrmc_height_cm + '@@厘米@@'
          setHeightCM(heightCM)
        } else {
          var heightCM = ''
          setHeightCM(heightCM)
        }
        if (diseaseData.hzbrmc_height_mm !== undefined && diseaseData.hzbrmc_height_mm !== '0' && diseaseData.hzbrmc_height_mm !== '') {
          var heightMM = ',高度' + diseaseData.hzbrmc_height_mm + '@@毫米@@'
          setHeightMM(heightMM)
        } else {
          var heightMM = ''
          setHeightMM(heightMM)
        }
        if (diseaseData.hzbrmc_area_face !== undefined && diseaseData.hzbrmc_area_face !== '0' && diseaseData.hzbrmc_area_face !== '') {
          var areaFace = ',面域' + diseaseData.hzbrmc_area_face + '@@%@@'
          setAreaFace(areaFace)
        } else {
          var areaFace = ''
          setAreaFace(areaFace)
        }
        if (diseaseData.hzbrmc_area_per !== undefined && diseaseData.hzbrmc_area_per !== '0' && diseaseData.hzbrmc_area_per !== '') {
          var areaPer = ',面积占比' + diseaseData.hzbrmc_area_per + '@@%@@'
          setAreaPer(areaPer)
        } else {
          var areaPer = ''
          setAreaPer(areaPer)
        }
        if (diseaseData.hzbrmc_area_m !== undefined && diseaseData.hzbrmc_area_m !== '0' && diseaseData.hzbrmc_area_m !== '') {
          var areaM = ',面积' + diseaseData.hzbrmc_area_m + '@@平方米@@'
          setAreaM(areaM)
        } else {
          var areaM = ''
          setAreaM(areaM)
        }
        if (diseaseData.hzbrmc_area_cm !== undefined && diseaseData.hzbrmc_area_cm !== '0' && diseaseData.hzbrmc_area_cm !== '') {
          var areaCM = ',面积' + diseaseData.hzbrmc_area_cm + '@@平方厘米@@'
          setAreaCM(areaCM)
        } else {
          var areaCM = ''
          setAreaCM(areaCM)
        }
        if (diseaseData.hzbrmc_area_mm !== undefined && diseaseData.hzbrmc_area_mm !== '0' && diseaseData.hzbrmc_area_mm !== '') {
          var areaMM = ',面积' + diseaseData.hzbrmc_area_mm + '@@平方毫米@@'
          setAreaMM(areaMM)
        } else {
          var areaMM = ''
          setAreaMM(areaMM)
        }
        if (diseaseData.hzbrmc_heightdiff_cm !== undefined && diseaseData.hzbrmc_heightdiff_cm !== '0' && diseaseData.hzbrmc_heightdiff_cm !== '') {
          var heightDiffCM = ',高差' + diseaseData.hzbrmc_heightdiff_cm + '@@厘米@@'
          setHeightDiffCM(heightDiffCM)
        } else {
          var heightDiffCM = ''
          setHeightDiffCM(heightDiffCM)
        }
        if (diseaseData.hzbrmc_heightdiff_mm !== undefined && diseaseData.hzbrmc_heightdiff_mm !== '0' && diseaseData.hzbrmc_heightdiff_mm !== '') {
          var heightDiffMM = ',高差' + diseaseData.hzbrmc_heightdiff_mm + '@@毫米@@'
          setHeightDiffMM(heightDiffMM)
        } else {
          var heightDiffMM = ''
          setHeightDiffMM(heightDiffMM)
        }
        if (diseaseData.hzbrmc_spacing_cm !== undefined && diseaseData.hzbrmc_spacing_cm !== '0' && diseaseData.hzbrmc_spacing_cm !== '') {
          var spacingCM = ',间距' + diseaseData.hzbrmc_spacing_cm + '@@厘米@@'
          setSpacingCM(spacingCM)
        } else {
          var spacingCM = ''
          setSpacingCM(spacingCM)
        }
        if (diseaseData.hzbrmc_deformation_mm !== undefined && diseaseData.hzbrmc_deformation_mm !== '0' && diseaseData.hzbrmc_deformation_mm !== '') {
          var deformationMM = ',变形' + diseaseData.hzbrmc_deformation_mm + '@@毫米@@'
          setDeformationMM(deformationMM)
        } else {
          var deformationMM = ''
          setDeformationMM(deformationMM)
        }
        if (diseaseData.hzbrmc_num !== undefined && diseaseData.hzbrmc_num !== '0' && diseaseData.hzbrmc_num !== '') {
          var num = ',个数' + diseaseData.hzbrmc_num + '@@个@@'
          setNum(num)
        } else {
          var num = ''
          setNum(num)
        }
        if (diseaseData.hzbrmc_range_cm !== undefined && diseaseData.hzbrmc_range_cm !== '0' && diseaseData.hzbrmc_range_cm !== '') {
          var rangeCM = ',距离' + diseaseData.hzbrmc_range_cm + '@@厘米@@'
          setRangeCM(rangeCM)
        } else {
          var rangeCM = ''
          setRangeCM(rangeCM)
        }
        if (diseaseData.hzbrmc_range_mm !== undefined && diseaseData.hzbrmc_range_mm !== '0' && diseaseData.hzbrmc_range_mm !== '') {
          var rangeMM = ',距离' + diseaseData.hzbrmc_range_mm + '@@毫米@@'
          setRangeMM(rangeMM)
        } else {
          var rangeMM = ''
          setRangeMM(rangeMM)
        }
        if (diseaseData.hzbrmc_depth_cm !== undefined && diseaseData.hzbrmc_depth_cm !== '0' && diseaseData.hzbrmc_depth_cm !== '') {
          var depthCM = ',深度' + diseaseData.hzbrmc_depth_cm + '@@厘米@@'
          setDepthCM(depthCM)
        } else {
          var depthCM = ''
          setDepthCM(depthCM)
        }
        if (diseaseData.hzbrmc_depth_mm !== undefined && diseaseData.hzbrmc_depth_mm !== '0' && diseaseData.hzbrmc_depth_mm !== '') {
          var depthMM = ',深度' + diseaseData.hzbrmc_depth_mm + '@@毫米@@'
          setDepthMM(depthMM)
        } else {
          var depthMM = ''
          setDepthMM(depthMM)
        }
        if (diseaseData.hzbrmc_volume_m !== undefined && diseaseData.hzbrmc_volume_m !== '0' && diseaseData.hzbrmc_volume_m !== '') {
          var volumeM = ',体积' + diseaseData.hzbrmc_volume_m + '@@立方米@@'
          setVolumeM(volumeM)
        } else {
          var volumeM = ''
          setVolumeM(volumeM)
        }
        if (diseaseData.hzbrmc_volume_cm !== undefined && diseaseData.hzbrmc_volume_cm !== '0' && diseaseData.hzbrmc_volume_cm !== '') {
          var volumeCM = ',体积' + diseaseData.hzbrmc_volume_cm + '@@立方厘米@@'
          setVolumeCM(volumeCM)
        } else {
          var volumeCM = ''
          setVolumeCM(volumeCM)
        }
        if (diseaseData.hzbrmc_disp_cm !== undefined && diseaseData.hzbrmc_disp_cm !== '0' && diseaseData.hzbrmc_disp_cm !== '') {
          var dispCM = ',位移' + diseaseData.hzbrmc_disp_cm + '@@厘米@@'
          setDispCM(dispCM)
        } else {
          var dispCM = ''
          setDispCM(dispCM)
        }
        if (diseaseData.hzbrmc_disp_mm !== undefined && diseaseData.hzbrmc_disp_mm !== '0' && diseaseData.hzbrmc_disp_mm !== '') {
          var dispMM = ',位移' + diseaseData.hzbrmc_disp_mm + '@@毫米@@'
          setDispMM(dispMM)
        } else {
          var dispMM = ''
          setDispMM(dispMM)
        }
        if (diseaseData.hzbrmc_angle_c !== undefined && diseaseData.hzbrmc_angle_c !== '0' && diseaseData.hzbrmc_angle_c !== '') {
          var angle = ',角度' + diseaseData.hzbrmc_angle_c + '@@度@@'
          setAngle(angle)
        } else {
          var angle = ''
          setAngle(angle)
        }
        if (diseaseData.hzbrmc_chu !== undefined && diseaseData.hzbrmc_chu !== '0' && diseaseData.hzbrmc_chu !== '') {
          var chu = ',' + diseaseData.hzbrmc_chu + '@@处@@'
          setChu(chu)
        } else {
          var chu = ''
          setChu(chu)
        }
        if (diseaseData.hzbrmc_tiao !== undefined && diseaseData.hzbrmc_tiao !== '0' && diseaseData.hzbrmc_tiao !== '') {
          var tiao = ',' + diseaseData.hzbrmc_tiao + '@@条@@'
          setTiao(tiao)
        } else {
          var tiao = ''
          setTiao(tiao)
        }
        if (diseaseData.hzbrmc_range_fenbu_m !== undefined && diseaseData.hzbrmc_range_fenbu_m !== '0' && diseaseData.hzbrmc_range_fenbu_m !== '') {
          var rangeFenbuM = ',分布范围' + diseaseData.hzbrmc_range_fenbu_m + '@@米@@'
          setRangeFenbuM(rangeFenbuM)
        } else {
          var rangeFenbuM = ''
          setRangeFenbuM(rangeFenbuM)
        }
        if (diseaseData.hzbrmc_range_length_m !== undefined && diseaseData.hzbrmc_range_length_m !== '0' && diseaseData.hzbrmc_range_length_m !== '') {
          var rangeLengthM = ',长度范围' + diseaseData.hzbrmc_range_length_m + '@@米@@'
          setRangeLengthM(rangeLengthM)
        } else {
          var rangeLengthM = ''
          setRangeLengthM(rangeLengthM)
        }
        if (diseaseData.hzbrmc_range_width_mm !== undefined && diseaseData.hzbrmc_range_width_mm !== '0' && diseaseData.hzbrmc_range_width_mm !== '') {
          var rangeWidthMM = ',宽度范围'+ diseaseData.hzbrmc_range_width_mm + '@@毫米@@'
          setRangeWidthMM(rangeWidthMM)
        } else {
          var rangeWidthMM = ''
          setRangeWidthMM(rangeWidthMM)
        }
        if (diseaseData.hzbrmc_range_spacing_cm !== undefined && diseaseData.hzbrmc_range_spacing_cm !== '0' && diseaseData.hzbrmc_range_spacing_cm !== '') {
          var rangeSpacingCM = ',间距范围' + diseaseData.hzbrmc_range_spacing_cm + '@@厘米@@'
          setRangeSpacingCM(rangeSpacingCM)
        } else {
          var rangeSpacingCM = ''
          setRangeSpacingCM(rangeSpacingCM)
        }
        if (diseaseData.hzbrmc_lb_left_length_m !== undefined && diseaseData.hzbrmc_lb_left_length_m !== '0' && diseaseData.hzbrmc_lb_left_length_m !== '') {
          var leftLengthM = ',左腹板长度' + diseaseData.hzbrmc_lb_left_length_m + '@@米@@'
          setLeftLengthM(leftLengthM)
        } else {
          var leftLengthM = ''
          setLeftLengthM(leftLengthM)
        }
        if (diseaseData.hzbrmc_lb_bottom_length_m !== undefined && diseaseData.hzbrmc_lb_bottom_length_m !== '0' && diseaseData.hzbrmc_lb_bottom_length_m !== '') {
          var bottomLengthM = ',底板长度' + diseaseData.hzbrmc_lb_bottom_length_m + '@@米@@'
          setBottomLengthM(bottomLengthM)
        } else {
          var bottomLengthM = ''
          setBottomLengthM(bottomLengthM)
        }
        if (diseaseData.hzbrmc_lb_right_length_m !== undefined && diseaseData.hzbrmc_lb_right_length_m !== '0' && diseaseData.hzbrmc_lb_right_length_m !== '') {
          var rightLengthM = ',右腹板长度' + diseaseData.hzbrmc_lb_right_length_m + '@@米@@'
          setRightLengthM(rightLengthM)
        } else {
          var rightLengthM = ''
          setRightLengthM(rightLengthM)
        }
        if (diseaseData.hzbrmc_lb_left_width_mm !== undefined && diseaseData.hzbrmc_lb_left_width_mm !== '0' && diseaseData.hzbrmc_lb_left_width_mm !== '') {
          var leftWidthMM = ',左腹板宽度' + diseaseData.hzbrmc_lb_left_width_mm + '@@毫米@@'
          setLeftWidthMM(leftWidthMM)
        } else {
          var leftWidthMM = ''
          setLeftWidthMM(leftWidthMM)
        }
        if (diseaseData.hzbrmc_lb_bottom_width_mm !== undefined && diseaseData.hzbrmc_lb_bottom_width_mm !== '0' && diseaseData.hzbrmc_lb_bottom_width_mm !== '') {
          var bottomWidthMM = ',底板宽度' + diseaseData.hzbrmc_lb_bottom_width_mm + '@@毫米@@'
          setBottomWidthMM(bottomWidthMM)
        } else {
          var bottomWidthMM = ''
          setBottomWidthMM(bottomWidthMM)
        }
        if (diseaseData.hzbrmc_lb_right_width_mm !== undefined && diseaseData.hzbrmc_lb_right_width_mm !== '0' && diseaseData.hzbrmc_lb_right_width_mm !== '') {
          var rightWidthMM = ',右腹板宽度' + diseaseData.hzbrmc_lb_right_width_mm + '@@毫米@@'
          setRightWidthMM(rightWidthMM)
        } else {
          var rightWidthMM = ''
          setRightWidthMM(rightWidthMM)
        }
        if (diseaseData.hzbrmc_slant_m !== undefined && diseaseData.hzbrmc_slant_m !== '0' && diseaseData.hzbrmc_slant_m !== '') {
          var slantM = ',倾斜量' + diseaseData.hzbrmc_slant_m + '@@米@@'
          setSlantM(slantM)
        } else {
          var slantM = ''
          setSlantM(slantM)
        }
      }

      if (writeDesTextValue == '' || writeDesTextValue == undefined) {
        console.log('没有修改数据');
        if (diseaseData.description == '' || diseaseData.description == undefined) {
          diseaseData['description'] = itemData.diseaseName
        } else if (diseaseData.description !== '' || diseaseData.description !== undefined) {
          let writeTxt = lengthM + lengthCM + lengthMM + widthM + widthCM
                  + widthMM + heightM + heightCM + heightMM + areaFace
                  + areaPer + areaM + areaCM + areaMM + heightDiffCM + heightDiffMM
                  + spacingCM + deformationMM + num + rangeCM + rangeMM + depthCM
                  + depthMM + volumeM + volumeCM + dispCM + dispMM + angle + chu
                  + tiao + rangeFenbuM + rangeLengthM + rangeWidthMM + rangeSpacingCM
                  + leftLengthM + bottomLengthM + rightLengthM + leftWidthMM
                  + bottomWidthMM + rightWidthMM + slantM
          // let writeTxt = diseaseData.hzbrmc_length_m
          setWriteTxt(writeTxt)
          // console.log('writeTxt', writeTxt);
          // console.log('病害名称',itemData.diseaseName);
          let binghai = itemData.diseaseName
          let allText = binghai.concat(writeTxt)
          console.log('allText', allText);
          diseaseData['description'] = allText
          handleFormChenge(allText, diseaseData.description)
        }
      } else {
        let writeTxt = lengthM + lengthCM + lengthMM + widthM + widthCM
                  + widthMM + heightM + heightCM + heightMM + areaFace
                  + areaPer + areaM + areaCM + areaMM + heightDiffCM + heightDiffMM
                  + spacingCM + deformationMM + num + rangeCM + rangeMM + depthCM
                  + depthMM + volumeM + volumeCM + dispCM + dispMM + angle + chu
                  + tiao + rangeFenbuM + rangeLengthM + rangeWidthMM + rangeSpacingCM
                  + leftLengthM + bottomLengthM + rightLengthM + leftWidthMM
                  + bottomWidthMM + rightWidthMM + slantM
        setWriteTxt(writeTxt)
        console.log('writeTxt', writeTxt);
        console.log('病害名称',itemData.diseaseName);
        let binghai = itemData.diseaseName
        let allText = binghai.concat(writeTxt)
        console.log('allText', allText);
        diseaseData['description'] = allText
        handleFormChenge(allText, diseaseData.description)
      }
    }

    // 填入位置描述内容
    const writePositionText = () => {
      try {
        // console.log('diseaseData.area', diseaseData.area);
        console.log('diseaseData.lengthText',lengthText,widthText,heightText);
        if (diseaseData.area == undefined || diseaseData.area == '') {
          let writePositionTxt = '/'
          setWritePositionTxt(writePositionTxt)
          diseaseData['writePositionTxt'] = writePositionTxt
          handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
        } else {
          console.log('有数据了');
          console.log('构件区域列表：：',areaparam);
          console.log('表单中的构件区域',diseaseData.area);
          console.log('构件类型',labelName);
          // if (labelName == 'at0000' || labelName == undefined && areaparam == '') {
          //   var areaName = ''
          //   diseaseData['area'] = areaName
          //   // handleFormChenge(areaName, diseaseData.area)
          // }
          // if (areaparam !== '') {
          //   let areaArr = areaparam
          //   let inputArea = diseaseData.area
          //   for (let i = 0; i < areaArr.length; i++) {
          //     if (inputArea == areaArr[i].value) {
          //       console.log('此时选中的构件是：',areaArr[i].label);
          //       var areaName = areaArr[i].label
          //     }
          //   }
          // }
          // setAreaName(areaName)
          

          // 位置描述 = /
          let writePositionTxt = diseaseData.area
          console.log('writePositionTxt999:', writePositionTxt);
          setWritePositionTxt(writePositionTxt)
          diseaseData['writePositionTxt'] = writePositionTxt
          setDiseaseData(diseaseData)
          handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
        }
      } catch (err) {
        console.log('出现错误1:',err);
      }
    }

    // 一键填入病害描述与位置描述
    const allWrite = () => {
      writeDesText()
      writePositionText()
    }

  {/* ================================================= */}
  {/* 病害填写表格区域 */}
  return (
  <View style={tailwind.flexRow}>
    {/* 病害填写表格区域 */}
    <ScrollView style={{height:350}}>
      <View>
      <View style={[tailwind.flexRow, tailwind.justifyBetween]}>
        <LabelItem label="编号:">
          <Text style={[tailwind.fontBold]}>
            {route.params?.data?.index}
          </Text>
        </LabelItem>
        <View style={tailwind.flexRow}>
          <LabelItem
            label="重点关注"
            LabelStyle={[tailwind.mR0, {color:'#2b427d'}]}
          />
          <Checkbox
            checked={!!diseaseData?.mian}
            onPress={() =>
              handleFormChenge({
                name: 'mian',
                value: !diseaseData?.mian + 0,
              })
            }
          />
        </View>
      </View>
      {/* 构件类型、构件区域 */}
      <View style={[tailwind.flexRow]}>
        <View style={{width:230}}>
            <Select
          label="构件类型"
          name="areatype"
          labelName="areaname"
          valueName="areatype"
          value={diseaseData?.areatype}
          onChange={handleFormChenge}
          values={baseData.components}
        />
        </View>
        <View style={{width:230}}>
          <View style={tailwind.mB2}>
            {!areaparam.length ? (
              <TextInput
                name="area"
                label="构件区域"
                value={diseaseData?.area}
                onChange={handleFormChenge}
                lines={1}
                height={25}
              />
            ) : (
              <Select
                name="area"
                label="构件区域"
                value={diseaseData?.area}
                values={areaparam}
                onChange={handleFormChenge}
              />
            )}
          </View>
        </View>
      </View>
      {/* 修改标度数据源 */}
      {rightScale.length ? (
          <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
            <LabelItem label="标度" />
            <TouchableOpacity onPress={handleScaleOpen}>
              <Icon
                name="information"
                size={20}
                style={[tailwind.mR2, {color:'#2b427d'}]}
              />
            </TouchableOpacity>
            <RadioGroup
              name="scale"
              values={rightScale} // 初始数据第一项为'无'，提取第二项及以后的数据传入组件
              value={diseaseData?.scale}
              onChange={handleFormChenge}
            />
          </View>
        ) : (
          <></>
        )}


      <View style={tailwind.mT2} />
      {/* <View>
        <View style={[tailwind.flexRow]}>
          <LabelItem label="病害位置(米)" style={tailwind.w18} />
          <Text>长度{lengthText}米; 宽度{widthText}米; 距顶{heightText}米</Text>
        </View>
        <View style={tailwind.mT2} />
        <View style={[tailwind.flexRow]}>
          <LabelItem label="长度" />
          <KeyboardInput
            name="memberLength"
            value={diseaseData?.memberLength}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disLength"
            memberData={diseaseData?.memberLength}
            value={diseaseData?.disLength}
            onChange={handleFormChenge}
          />
        </View>
        <View style={tailwind.mT2} />
        <View style={[tailwind.flexRow]}>
          <LabelItem label="宽度" style={tailwind.w18} />
          <KeyboardInput
            name="memberWidth"
            value={diseaseData?.memberWidth}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disWidth"
            memberData={diseaseData?.memberWidth}
            value={diseaseData?.disWidth}
            onChange={handleFormChenge}
          />
        </View>
        <View style={tailwind.mT2} />
        <View style={[tailwind.flexRow,tailwind.mB3]}>
          <LabelItem label="距顶" style={tailwind.w18} />
          <KeyboardInput
            name="memberHeight"
            value={diseaseData?.memberHeight}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disHeight"
            memberData={diseaseData?.memberHeight}
            value={diseaseData?.disHeight}
            onChange={handleFormChenge}
          />
        </View>
      </View> */}
      {/* <View style={tailwind.mT2} /> */}
      <View style={[tailwind.flexRow]}>
        <View style={{width:500}}>
          <WriteInput
            name="description"
            label="病害描述"
            value={diseaseData?.description}
            onChange={handleFormChenge}
            lines={3}
            height={70}
            // disabled={true}
          />
        </View>
        {/* <TouchableOpacity style={styles.sideButton} onPress={writeDesText}>
          <Text style={[{color:'#fff',fontSize:12}]}>填入描述</Text>
        </TouchableOpacity> */}
      </View>
      <View style={tailwind.mT2} />
      <View style={[tailwind.flexRow]}>
        <View style={{width:500}}>
          <WriteInput
            name="writePositionTxt"
            label="位置描述"
            value={diseaseData?.writePositionTxt}
            onChange={handleFormChenge}
            lines={3}
            height={70}
          />
        </View>
        {/* <TouchableOpacity style={styles.sideButton} onPress={writePositionText}>
          <Text style={[{color:'#fff',fontSize:12}]}>填入描述</Text>
        </TouchableOpacity> */}
      </View>
    </View>
    </ScrollView>
    
    {/* ================================================= */}
    <View style={tailwind.mX3} />
    
    <View style={[{width:'20%'}]}>
    <View>
      {/* <LabelItem label="当前病害:" /> */}
      <Text style={[tailwind.fontBold,{width:'100%'}]}>
        {itemData?.diseaseName}
      </Text>
    </View>
    <View style={tailwind.mT2} />
    {infoList.length ? (
        infoList.map(({strvalue, strinfo}, index) => (
          <React.Fragment key={index}>
              <View style={[tailwind.mB2]}>
                <LabelItem label={strinfo} />
                <View style={{width:70,height:25}}>
                  <KeyboardInput
                    name={strvalue}
                    value={diseaseData[strvalue]}
                    onChange={handleFormChenge}
                  />
                </View>
              </View>
          </React.Fragment>
          
        ))
      ) : (
        <></>
      )}
      <TouchableOpacity style={styles.bottomButton} onPress={allWrite}>
        <Text style={[{color:'#fff',fontSize:14}]}>生成描述</Text>
      </TouchableOpacity>
    </View>
    <ScaleInfo ref={scaleInfoRef} info={scaleTabel} />
  </View>
  );
  {/* ================================================= */}
}

export function DiseaseC({route, navigation}) {
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
  
    const [areaparam, areanode] = hooks.useArea({diseaseData, baseData});
  
    // const infoList = hooks.useInfoComponents({diseaseData, baseData});
    const [infoList,setInfoList] = useState([])
  
    const defaultFileName = hooks.useDefaultFileName({diseaseData, baseData});
  
    const [scale, scaleInfo] = hooks.useScale({
      diseaseData,
      typeList: route.params?.type?.list,
      baseData,
    });


    React.useEffect(() => {
      setDiseaseData(itemData);
      console.log('itemData:',itemData);
      try {
        console.log('itemData',itemData.standard.scale);
        setBiaodu(itemData.standard.scale)
        diseaseData['scale'] = itemData.standard.scale
      } catch (error) {
        console.log('设置标度初始值',error);
      }
    }, [itemData]);
  
    const [lengthText, setLengthText] = useState()
    const [widthText, setWidthText] = useState()
    const [heightText, setHeightText] = useState()
    // =================================================
    const [writeTxt, setWriteTxt] = useState('')
    const [writePositionTxt, setWritePositionTxt] = useState('')
    // -------------------------------------------------
    // 标度,默认为 2
    const [biaodu, setBiaodu] = useState(2)
    // 长度 - 米
    const [lengthM, setLengthM] = useState('')
    // 长度 - 厘米
    const [lengthCM, setLengthCM] = useState('')
    // 长度 - 毫米
    const [lengthMM, setLengthMM] = useState('')
    // 宽度 - 米
    const [widthM, setWidthM] = useState('')
    // 宽度 - 厘米
    const [widthCM, setWidthCM] = useState('')
    // 宽度 - 毫米
    const [widthMM, setWidthMM] = useState('')
    // 高度 - 米
    const [heightM, setHeightM] = useState('')
    // 高度 - 厘米
    const [heightCM, setHeightCM] = useState('')
    // 高度 - 毫米
    const [heightMM, setHeightMM] = useState('')
    // 面域 - %
    const [areaFace, setAreaFace] = useState('')
    // 面积占比 - %
    const [areaPer, setAreaPer] = useState('')
    // 面积 - 平方米
    const [areaM, setAreaM] = useState('')
    // 面积 - 平方厘米
    const [areaCM, setAreaCM] = useState('')
    // 面积 - 平方毫米
    const [areaMM, setAreaMM] = useState('')
    // 高差 - 厘米
    const [heightDiffCM, setHeightDiffCM] = useState('')
    // 高差 - 毫米
    const [heightDiffMM, setHeightDiffMM] = useState('')
    // 间距 - 厘米
    const [spacingCM, setSpacingCM] = useState('')
    // 变形 - 毫米
    const [deformationMM, setDeformationMM] = useState('')
    // 个数 - 个
    const [num, setNum] = useState('')
    // 距离 - 厘米
    const [rangeCM, setRangeCM] = useState('')
    // 距离 - 毫米
    const [rangeMM, setRangeMM] = useState('')
    // 深度 - 厘米
    const [depthCM, setDepthCM] = useState('')
    // 深度 - 毫米
    const [depthMM, setDepthMM] = useState('')
    // 体积 - 立方米
    const [volumeM, setVolumeM] = useState('')
    // 体积 - 立方厘米
    const [volumeCM, setVolumeCM] = useState('')
    // 位移 - 厘米
    const [dispCM, setDispCM] = useState('')
    // 位移 - 毫米
    const [dispMM, setDispMM] = useState('')
    // 角度 - 度
    const [angle, setAngle] = useState('')
    // 处
    const [chu, setChu] = useState('')
    // 条
    const [tiao, setTiao] = useState('')
    // 分布范围 - 米
    const [rangeFenbuM, setRangeFenbuM] = useState('')
    // 长度范围 - 米
    const [rangeLengthM, setRangeLengthM] = useState('')
    // 宽度范围 - 毫米
    const [rangeWidthMM, setRangeWidthMM] = useState('')
    // 间距范围 - 厘米
    const [rangeSpacingCM, setRangeSpacingCM] = useState('')
    // 左腹板长度 - 米
    const [leftLengthM, setLeftLengthM] = useState('')
    // 底板长度 - 米
    const [bottomLengthM, setBottomLengthM] = useState('')
    // 右腹板长度 - 米
    const [rightLengthM, setRightLengthM] = useState('')
    // 左腹板宽度 - 毫米
    const [leftWidthMM, setLeftWidthMM] = useState('')
    // 底板宽度 - 毫米
    const [bottomWidthMM, setBottomWidthMM] = useState('')
    // 右腹板宽度 - 毫米
    const [rightWidthMM, setRightWidthMM] = useState('')
    // 倾斜量 - 米
    const [slantM, setSlantM] = useState('')

    const [saveDescription, setSaveDescription] = useState()

    // 构件类型
    const [labelName, setLabelName] = useState()
    // 构件区域
    const [areaName, setAreaName] = useState()

    // 病害名称
    const [infoshort, setInfoShort] = useState()

    // 位置描述 墩台
    const [pier,  setPier] = useState()
    // 位置描述 长、宽、距顶
    const [lengthNum, setLengthNum] = useState()
    const [widthNum, setWidthNum] = useState()
    const [heightNum, setHeightNum] = useState()

    const [diseaseName, setDiseaseName] = useState('')

    // 桥梁id
    const [bridgeId, setBridgeId] = useState(route.params.memberList[0].bridgeid)
    // 部件名称
    const [storageMemberName, setStorageMemberName] =useState(route.params.routeParams.title)

    // =================================================
    React.useEffect(() => {
      saveData.current = {...diseaseData};
      try {

        if (baseData.membercheckdata) {
          console.log('保存baseData数据');
          setBaseDataStorage(JSON.stringify(baseData.membercheckdata))
        }
        if (route.params.thridData.datastr && baseData.membercheckdata) {
          let infoList = []
          route.params.thridData.datastr.forEach((item) => {
            // console.log('病害列表传入的datastr',item);
            baseData.membercheckdata.forEach((item1) => {
              if (item == item1.strid) {
                // console.log('取出来的item1',item1);
                infoList.push(item1)
              }
            })
          })
          setInfoList(infoList)
        } else if (!baseData.membercheckdata) {
          console.log('读取baseData数据');
          getBaseDataStorage('baseData')
        }

        if (diseaseData.diseaseName == undefined || diseaseData.diseaseName == '') {
          console.log('7777');
          diseaseData['diseaseName'] = route.params.thridData.checkinfoshort
          handleFormChenge(route.params.thridData.checkinfoshort, diseaseData.diseaseName)
        }
      } catch (err){
        console.log('err09', err);
      }
      try {
        let lengthText = (diseaseData.memberLength * (diseaseData.disLength / 100)).toFixed(2)
        setLengthText(lengthText)
        let widthText = (diseaseData.memberWidth * (diseaseData.disWidth / 100)).toFixed(2)
        setWidthText(widthText)
        let heightText = (diseaseData.memberHeight * (diseaseData.disHeight / 100)).toFixed(2)
        setHeightText(heightText)
        if (lengthText == 'NaN') {
          let lengthText = '0'
          setLengthText(lengthText)
        }
        if (widthText == 'NaN') {
          let widthText = '0'
          setWidthText(widthText)
        }
        if (heightText == 'NaN') {
          let heightText = '0'
          setHeightText(heightText)
        }

        if (diseaseData.area == undefined) {

        } else if (diseaseData.area !== '' || diseaseData.area !== undefined || diseaseData.area !== '/') {
          var sliceArea = diseaseData.area.slice(0,5)
        }
        
        if (diseaseData.areatype == 'at0000' && sliceArea == 'at000') {
          console.log(sliceArea);
          console.log('xu~~~~~');
          diseaseData['area'] = '/'
        }

        // console.log('short',route.params.thridData.checkinfoshort);
        // 将病害位置的长宽高数据存进diseaseData
        diseaseData['lengthText'] = lengthText
        diseaseData['widthText'] = widthText
        diseaseData['heightText'] = heightText
        diseaseData['remark'] = route.params.thridData.checkinfoshort
        
        
        // 取病害名称并保存
        if (diseaseData.diseaseName == '' || diseaseData.diseaseName == undefined) {
          let diseaseName = route.params.thridData.checkinfoshort
          // setDiseaseName(diseaseName)
          console.log('0000000');
          console.log('~~~~~~~diseaseName~~~~~',diseaseName);
          diseaseData['diseaseName'] = diseaseName
          handleFormChenge(diseaseName, diseaseData.diseaseName)
          setDiseaseName(diseaseName)
        }
        
        if (diseaseData.stairgroupid == undefined || diseaseData.stairgroupid == '') {
          // console.log('0000.000');
          diseaseData['stairgroupid'] = route.params.stairgroupid
          handleFormChenge(route.params.stairgroupid, diseaseData.stairgroupid)
        }

        // console.log(diseaseData);
        if (diseaseData.remark == '' || diseaseData.remark == undefined) {
          let infoshort = route.params.thridData.checkinfoshort
          setInfoShort(infoshort)
        }
        if (diseaseData.description == '' || diseaseData.description == undefined) {
          diseaseData['description'] = diseaseData.remark
        }

        if (diseaseData.writePositionTxt == undefined || diseaseData.writePositionTxt == '') {
          let writePositionTxt = '/'
          setWritePositionTxt(writePositionTxt)
          diseaseData['writePositionTxt'] = writePositionTxt
          handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
        }

        try {
          if (itemData && route.params.mediaType == 'add') {
            diseaseData['scale'] = rightScaleNum
            handleFormChenge(rightScaleNum, diseaseData.scale)
            route.params.mediaType = ''
          }
        } catch (error) {
          console.log('设置标度初始值',error);
        }

      } catch {
      }
    }, [diseaseData]);

    // 保存baseData的数据
    const setBaseDataStorage = async(value) => {
      try {
        await AsyncStorage.setItem('baseData', value)
      } catch (err) {
        console.log('存入数据失败!3', err);
      }
    }
    // 读取baseData的数据
    const getBaseDataStorage = async(name) => {
      // console.log('读取baseData数据')
      try {
        const value = await AsyncStorage.getItem(name)
        let values = JSON.parse(value)
        // console.log('value~~~',value);
        let infoList = []
          route.params.thridData.datastr.forEach((item) => {
            // console.log('病害列表传入的datastr',item);
            values.forEach((item1) => {
              if (item == item1.strid) {
                // console.log('取出来的item1',item1);
                infoList.push(item1)
              }
            })
          })
          setInfoList(infoList)
      } catch (error) {
        console.log('读取baseData数据失败',error);
      }
    }

    // 重新获取数据的标度选项数组
    const [rightScale, setRightScale] = useState([])
    // 默认的标度值
    const [rightScaleNum, setRightScaleNum] = useState('')
    // 重新获取数据的标度评定标准表格
    const [scaleTabel, setScaleTabel] = useState([])
  
    React.useEffect(() => {

      try {
        console.log('scale',scale);
        // console.log('baseData', baseData);
        // console.log('标度表格信息baseData.basestandardtable',baseData.basestandardtable)

        // 当页面是由新建进入时，存储标度数组，以备编辑进入时使用
        if (route.params.mediaType == 'add' || route.params.mediaType == '') {
          // =================================
          // 获取标度列表与标度默认值
          let scaleSelect = baseData.basestandardtable
          let oldArr = ''
          let scaleNum = ''
          scaleSelect.forEach(item => {
            // console.log('33330000',item.standardid);
            
            if (route.params.thridData.strandardid == item.standardid) {
              console.log('当前病害的标度选项',item);
              // setRightScale(item.standardscalestr)
              oldArr = item.standardscalestr
              scaleNum = item.standardscale
            }
          });
          setRightScaleNum(scaleNum)
          // console.log('rightScale',rightScale);
          const arr = oldArr.split(',')
          console.log('arr',arr);
          
          let resetArr = []
          arr.forEach((item, index) => {
            resetArr.push({
              label:index + 1,
              value:item
            })
          })
          console.log('resetArr',resetArr);
          setRightScale(resetArr)
          diseaseData['scaleArr'] = rightScale
          handleFormChenge(rightScale, diseaseData.scaleArr)

          // =================================
          // 获取标度评定标准表数据
          let scaleTabel = baseData.standardtableinfo
          // console.log('表格数据',scaleTabel);
          let oldTable = []
          scaleTabel.forEach((item) => {
            if (route.params.thridData.strandardid == item.standardid) {
              // console.log('当前的评定表item',item);
              oldTable.push(item)
            }
          })
          console.log('oldTable',oldTable);
          setScaleTabel(oldTable)
          diseaseData['scaleTableArr'] = oldTable
          handleFormChenge(oldTable, diseaseData.scaleTableArr)


        } else if (route.params.mediaType == 'edit') {
          // 当页面是由编辑进入时
          setRightScale(diseaseData.scaleArr)
          setScaleTabel(scaleTabel)
          // console.log('rightScale222222',rightScale);
        }
      } catch (error) {
        console.log('获取标度数据',error);
      }

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
            // .map(
            //   ({strname, strvalue, strunit}) =>
            //     `${strname}${saveData.current[strvalue] || 0}@@${
            //       strunit || ''
            //     }@@`,
            // )
            .map(
              ({strname, strvalue, strunit}) =>
                `${saveData.current[strvalue] == undefined ? '' : strname + saveData.current[strvalue] + '@@' + strunit + '@@'}`
            )
            const strr = str.filter(item => item!=='') == '' ? '/' : str.filter(item => item!=='')
            // .join(',');
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
            }，${strr}`,
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

    useEffect(() => {
      // console.log('桥跨：：',route.params.memberList);
      let defaultPier = route.params.memberList[0].membername
      // 提取第一个字符进行判断（表示墩台的数据）
      let firstDefaultPier = defaultPier.slice(0,1)
      if (firstDefaultPier == 1) {
        let pier = '距' + (firstDefaultPier - 1) + '#台'
        setPier(pier)
        // console.log('dundun:', pier);
      } else {
        let pier = '距' + (firstDefaultPier - 1) + '#墩'
        setPier(pier)
        // console.log('dundun:', pier);
      }

      // console.log('构件区域列表：：',areaparam);
      // console.log('表单中的构件区域',diseaseData.area);
      if (areaparam == '' || areaparam == undefined) {
        console.log('选的其他');
        try{
         console.log('构件类型', itemData.areatype); 
         if (itemData.areatype == 'at0000' || itemData.areatype == undefined) {
          // console.log('9999');
          diseaseData['area'] = '/'
          let labelName = itemData.areatype
          setLabelName(labelName)
         }
        } catch {

        }
      }
    },[])

    const handleScaleOpen = () => scaleInfoRef.current.open();
    const handleFormChenge = ({name, value}) => {
      // const _data = {
      //   ...diseaseData,
      //   [name]: value,
      // };
      let unitt = JSON.stringify(diseaseData, [
          'areatype','area','scale','lengthText','widthText','heightText','memberLength','memberWidth',
        'memberHeight','disLength','disWidth','disHeight','hzbrmc_length_m','hzbrmc_length_cm','hzbrmc_length_mm','hzbrmc_width_m',
        'hzbrmc_width_cm','hzbrmc_width_mm','hzbrmc_height_m','hzbrmc_height_cm','hzbrmc_height_mm',
        'hzbrmc_area_face','hzbrmc_area_per','hzbrmc_area_m','hzbrmc_area_cm','hzbrmc_area_mm',
        'hzbrmc_heightdiff_cm','hzbrmc_heightdiff_mm','hzbrmc_spacing_cm','hzbrmc_deformation_mm',
        'hzbrmc_num','hzbrmc_range_cm','hzbrmc_range_mm','hzbrmc_depth_cm','hzbrmc_depth_mm',
        'hzbrmc_volume_m','hzbrmc_volume_cm','hzbrmc_disp_cm','hzbrmc_disp_mm','hzbrmc_angle_c',
        'hzbrmc_chu','hzbrmc_tiao','hzbrmc_range_fenbu_m','hzbrmc_range_length_m','hzbrmc_range_width_mm',
        'hzbrmc_range_spacing_cm','hzbrmc_lb_left_length_m','hzbrmc_lb_bottom_length_m','hzbrmc_lb_right_length_m',
        'hzbrmc_lb_left_width_mm','hzbrmc_lb_bottom_width_mm','hzbrmc_lb_right_width_mm','hzbrmc_slant_m'])
      // console.log(unitt);
      let unit = JSON.parse(unitt)
      diseaseData['unit'] = unit
      // const {area,areatype,scale,hzbrmc_length_m,hzbrmc_length_cm,hzbrmc_length_mm,hzbrmc_width_m,hzbrmc_width_cm,
      //   hzbrmc_width_mm,hzbrmc_height_m,hzbrmc_height_cm,hzbrmc_height_mm,hzbrmc_area_face,hzbrmc_area_per,
      //   hzbrmc_area_m,hzbrmc_area_cm,hzbrmc_area_mm,hzbrmc_heightdiff_cm,hzbrmc_heightdiff_mm,hzbrmc_spacing_cm,
      //   hzbrmc_deformation_mm,hzbrmc_num,hzbrmc_range_cm,hzbrmc_range_mm,hzbrmc_depth_cm,hzbrmc_depth_mm,
      //   hzbrmc_volume_m,hzbrmc_volume_cm,hzbrmc_disp_cm,hzbrmc_disp_mm,hzbrmc_angle_c,hzbrmc_chu,hzbrmc_tiao,
      //   hzbrmc_range_fenbu_m,hzbrmc_range_length_m,hzbrmc_range_width_mm,hzbrmc_range_spacing_cm,hzbrmc_lb_left_length_m,
      //   hzbrmc_lb_bottom_length_m,hzbrmc_lb_right_length_m,hzbrmc_lb_left_width_mm,hzbrmc_lb_bottom_width_mm,
      //   hzbrmc_lb_right_width_mm,hzbrmc_slant_m,lengthText,widthText,heightText,memberLength,memberWidth,
      //   memberHeight,disLength,disWidth,disHeight,...rest} = diseaseData
      const _data = {
        ...diseaseData,
        [name]: value,
      };
      if (name === 'checktypeid') {
        const _type = route.params.type.list.find(
          item => value === item.checktypeid,
        );
        let defaultScaleVal = '';
        if (_type) {
          defaultScaleVal = _type?.standardscale;
        }
        _data.scale = defaultScaleVal;
        const {basestandardtable, infoComponents} = baseData;
        const standardid =
          infoComponents.find(({checktypeid}) => value === checktypeid)
            ?.standardid || '';
        if (standardid) {
          const _standardscale = basestandardtable.find(
            item => standardid === item.standardid,
          )?.standardscale;
          if (_standardscale) {
            _data.standard = {
              scale: _standardscale,
              id: standardid,
            };
          } else {
            const defaultScale = basestandardtable.find(
              item => item.standardid === 'JTG-TH21-2011-T000-0',
            )?.standardscale;
            _data.standard = {
              scale: defaultScale,
              id: 'JTG-TH21-2011-T000-0',
            };
          }
        }
        _data.scale = _data.scale || '';
      }


      if (value) {
        // 向病害描述函数里传入
        writeDesText(name, value)
      }

      if (name == 'scale') {
        // 标度
        let biaodu = ',标度' + value + '@@'
        setBiaodu(biaodu)
      } else if (name == 'hzbrmc_length_m') {
        //长度 - 米
        // let lengthM = ',长度' + value + '@@米@@'
        // setLengthM(lengthM)
        if (value == '' || value == 0) {
          let lengthM = ''
          setLengthM(lengthM)
        } else {
          let lengthM = ',长度' + value + '@@米@@'
          setLengthM(lengthM)
        }
      } else if (name == 'hzbrmc_length_cm') {
        // 长度 - 厘米
        // let lengthCM = ',长度' + value + '@@厘米@@'
        // setLengthCM(lengthCM)
        if (value == '' || value == 0) {
          let lengthCM = ''
          setLengthCM(lengthCM)
        } else {
          let lengthCM = ',长度' + value + '@@厘米@@'
          setLengthCM(lengthCM)
        }
      } else if (name == 'hzbrmc_length_mm') {
        // 长度 - 毫米
        // let lengthMM = ',长度' + value + '@@毫米@@'
        // setLengthMM(lengthMM)
        if (value == '' || value == 0) {
          let lengthMM = ''
          setLengthMM(lengthMM)
        } else {
          let lengthMM = ',长度' + value + '@@毫米@@'
          setLengthMM(lengthMM)
        }
      } else if (name == 'hzbrmc_width_m') {
        // 宽度 - 米
        // let widthM = ',宽度' + value + '@@米@@'
        // setWidthM(widthM)
        if (value == '' || value == 0) {
          let widthM = ''
          setWidthM(widthM)
        } else {
          let widthM = ',宽度' + value + '@@米@@'
          setWidthM(widthM)
        }
      } else if (name == 'hzbrmc_width_cm') {
        // 宽度 - 厘米
        // let widthCM = ',宽度' + value + '@@厘米@@'
        // setWidthCM(widthCM)
        if (value == '' || value == 0) {
          let widthCM = ''
          setWidthCM(widthCM)
        } else {
          let widthCM = ',宽度' + value + '@@厘米@@'
          setWidthCM(widthCM)
        }
      } else if (name == 'hzbrmc_width_mm') {
        // 宽度 - 毫米
        if (value == '' || value == 0) {
          let widthMM = ''
          setWidthMM(widthMM)
        } else {
          let widthMM = ',宽度' + value + '@@毫米@@'
          setWidthMM(widthMM)
        }
      } else if (name == 'hzbrmc_height_m') {
        // 高度 - 米
        // let heightM = ',高度' + value + '@@米@@'
        // setHeightM(heightM)
        if (value == '' || value == 0) {
          let heightM = ''
          setHeightM(heightM)
        } else {
          let heightM = ',高度' + value + '@@米@@'
          setHeightM(heightM)
        }
      } else if (name == 'hzbrmc_height_cm') {
        // 高度 - 厘米
        if (value == '' || value == 0) {
          let heightCM = ''
          setHeightCM(heightCM)
        } else {
          let heightCM = ',高度' + value + '@@厘米@@'
          setHeightCM(heightCM)
        }
      } else if (name == 'hzbrmc_height_mm') {
        // 高度 - 毫米
        // let heightMM = ',高度' + value + '@@毫米@@'
        // setHeightMM(heightMM)
        if (value == '' || value == 0) {
          let heightMM = ''
          setHeightMM(heightMM)
        } else {
          let heightMM = ',高度' + value + '@@毫米@@'
          setHeightMM(heightMM)
        }
      } else if (name == 'hzbrmc_area_face') {
        // 面域 - %
        // let areaFace = ',面域' + value + '@@%@@'
        // setAreaFace(areaFace)
        if (value == '' || value == 0) {
          let areaFace = ''
          setAreaFace(areaFace)
        } else {
          let areaFace = ',面域' + value + '@@%@@'
          setAreaFace(areaFace)
        }
      } else if (name == 'hzbrmc_area_per') {
        // 面积占比 - %
        // let areaPer = ',面积占比' + value + '@@%@@'
        // setAreaPer(areaPer)
        if (value == '' || value == 0) {
          let areaPer = ''
          setAreaPer(areaPer)
        } else {
          let areaPer = ',面积占比' + value + '@@%@@'
          setAreaPer(areaPer)
        }
      } else if (name == 'hzbrmc_area_m') {
        // 面积 - 平方米
        // let areaM = ',面积' + value + '@@平方米@@'
        // setAreaM(areaM)
        if (value == '' || value == 0) {
          let areaM = ''
          setAreaM(areaM)
        } else {
          let areaM = ',面积' + value + '@@平方米@@'
          setAreaM(areaM)
        }
      } else if (name == 'hzbrmc_area_cm') {
        // 面积 - 平方厘米
        // let areaCM = ',面积' + value + '@@平方厘米@@'
        // setAreaCM(areaCM)
        if (value == '' || value == 0) {
          let areaCM = ''
          setAreaCM(areaCM)
        } else {
          let areaCM = ',面积' + value + '@@平方厘米@@'
          setAreaCM(areaCM)
        }
      } else if (name == 'hzbrmc_area_mm') {
        // 面积 - 平方毫米
        // let areaMM = ',面积' + value + '@@平方毫米@@'
        // setAreaMM(areaMM)
        if (value == '' || value == 0) {
          let areaMM = ''
          setAreaMM(areaMM)
        } else {
          let areaMM = ',面积' + value + '@@平方毫米@@'
          setAreaMM(areaMM)
        }
      } else if (name == 'hzbrmc_heightdiff_cm') {
        // 高差 - 厘米
        // let heightDiffCM = ',高差' + value + '@@厘米@@'
        // setHeightDiffCM(heightDiffCM)
        if (value == '' || value == 0) {
          let heightDiffCM = ''
          setHeightDiffCM(heightDiffCM)
        } else {
          let heightDiffCM = ',高差' + value + '@@厘米@@'
          setHeightDiffCM(heightDiffCM)
        }
      } else if (name == 'hzbrmc_heightdiff_mm') {
        // 高差 - 毫米
        // let heightDiffMM = ',高差' + value + '@@毫米@@'
        // setHeightDiffMM(heightDiffMM)
        if (value == '' || value == 0) {
          let heightDiffMM = ''
          setHeightDiffMM(heightDiffMM)
        } else {
          let heightDiffMM = ',高差' + value + '@@毫米@@'
          setHeightDiffMM(heightDiffMM)
        }
      } else if (name == 'hzbrmc_spacing_cm') {
        // 间距 - 厘米
        // let spacingCM = ',间距' + value + '@@厘米@@'
        // setSpacingCM(spacingCM)
        if (value == '' || value == 0) {
          let spacingCM = ',间距' + value + '@@厘米@@'
          setSpacingCM(spacingCM)
        } else {
          let spacingCM = ',间距' + value + '@@厘米@@'
          setSpacingCM(spacingCM)
        }
      } else if (name == 'hzbrmc_deformation_mm') {
        // 变形 - 毫米
        // let deformationMM = ',变形' + value + '@@毫米@@'
        // setDeformationMM(deformationMM)
        if (value == '' || value == 0) {
          let deformationMM = ''
          setDeformationMM(deformationMM)
        } else {
          let deformationMM = ',变形' + value + '@@毫米@@'
          setDeformationMM(deformationMM)
        }
      } else if (name == 'hzbrmc_num') {
        // 个数 - 个
        // let num = ',个数' + value + '@@个@@'
        // setNum(num)
        if (value == '' || value == 0) {
          let num = ''
          setNum(num)
        } else {
          let num = ',个数' + value + '@@个@@'
          setNum(num)
        }
      } else if (name == 'hzbrmc_range_cm') {
        // 距离 - 厘米
        // let rangeCM = ',距离' + value + '@@厘米@@'
        // setRangeCM(rangeCM)
        if (value == '' || value == 0) {
          let rangeCM = ''
          setRangeCM(rangeCM)
        } else {
          let rangeCM = ',距离' + value + '@@厘米@@'
          setRangeCM(rangeCM)
        }
      } else if (name == 'hzbrmc_range_mm') {
        // 距离 - 毫米
        // let rangeMM = ',距离' + value + '@@毫米@@'
        // setRangeMM(rangeMM)
        if (value == '' || value == 0) {
          let rangeMM = ''
          setRangeMM(rangeMM)
        } else {
          let rangeMM = ',距离' + value + '@@毫米@@'
          setRangeMM(rangeMM)
        }
      } else if (name == 'hzbrmc_depth_cm') {
        // 深度 - 厘米
        // let depthCM = ',深度' + value + '@@厘米@@'
        // setDepthCM(depthCM)
        if (value == '' || value == 0) {
          let depthCM = ''
          setDepthCM(depthCM)
        } else {
          let depthCM = ',深度' + value + '@@厘米@@'
          setDepthCM(depthCM)
        }
      } else if (name == 'hzbrmc_depth_mm') {
        // 深度 - 毫米
        // let depthMM = ',深度' + value + '@@毫米@@'
        // setDepthMM(depthMM)
        if (value == '' || value == 0) {
          let depthMM = ''
          setDepthMM(depthMM)
        } else {
          let depthMM = ',深度' + value + '@@毫米@@'
          setDepthMM(depthMM)
        }
      } else if (name == 'hzbrmc_volume_m') {
        // 体积 - 立方米
        // let volumeM = ',体积' + value + '@@立方米@@'
        // setVolumeM(volumeM)
        if (value == '' || value == 0) {
          let volumeM = ''
          setVolumeM(volumeM)
        } else {
          let volumeM = ',体积' + value + '@@立方米@@'
          setVolumeM(volumeM)
        }
      } else if (name == 'hzbrmc_volume_cm') {
        // 体积 - 立方厘米
        // let volumeCM = ',体积' + value + '@@立方厘米@@'
        // setVolumeCM(volumeCM)
        if (value == '' || value == 0) {
          let volumeCM = ''
          setVolumeCM(volumeCM)
        } else {
          let volumeCM = ',体积' + value + '@@立方厘米@@'
          setVolumeCM(volumeCM)
        }
      } else if (name == 'hzbrmc_disp_cm') {
        // 位移 - 厘米
        // let dispCM = ',位移' + value + '@@厘米@@'
        // setDispCM(dispCM)
        if (value == '' || value == 0) {
          let dispCM = ''
          setDispCM(dispCM)
        } else {
          let dispCM = ',位移' + value + '@@厘米@@'
          setDispCM(dispCM)
        }
      } else if (name == 'hzbrmc_disp_mm') {
        // 位移 - 毫米
        // let dispMM = ',位移' + value + '@@毫米@@'
        // setDispMM(dispMM)
        if (value == '' || value == 0) {
          let dispMM = ''
          setDispMM(dispMM)
        } else {
          let dispMM = ',位移' + value + '@@毫米@@'
          setDispMM(dispMM)
        }
      } else if (name == 'hzbrmc_angle_c') {
        // 角度 - 度
        // let angle = ',角度' + value + '@@度@@'
        // setDispMM(angle)
        if (value == '' || value == 0) {
          let angle = ''
          setAngle(angle)
        } else {
          let angle = ',角度' + value + '@@度@@'
          setAngle(angle)
        }
      } else if (name == 'hzbrmc_chu') {
        // 处
        // let chu = ',' + value + '@@处@@'
        // setChu(chu)
        if (value == '' || value == 0) {
          let chu = ''
          setChu(chu)
        } else {
          let chu = ',' + value + '@@处@@'
          setChu(chu)
        }
      } else if (name == 'hzbrmc_tiao') {
        // 条
        // let tiao = ',' + value + '@@条@@'
        // setTiao(tiao)
        if (value == '' || value == 0) {
          let tiao = ''
          setTiao(tiao)
        } else {
          let tiao = ',' + value + '@@条@@'
          setTiao(tiao)
        }
      } else if (name == 'hzbrmc_range_fenbu_m') {
        // 分布范围 - 米
        // let rangeFenbuM = ',分布范围' + value + '@@米@@'
        // setRangeFenbuM(rangeFenbuM)
        if (value == '' || value == 0) {
          let rangeFenbuM = ''
          setRangeFenbuM(rangeFenbuM)
        } else {
          let rangeFenbuM = ',分布范围' + value + '@@米@@'
          setRangeFenbuM(rangeFenbuM)
        }
      } else if (name == 'hzbrmc_range_length_m') {
        // 长度范围 - 米
        // let rangeLengthM = ',长度范围' + value + '@@米@@'
        // setRangeLengthM(rangeLengthM)
        if (value == '' || value == 0) {
          let rangeLengthM = ''
          setRangeLengthM(rangeLengthM)
        } else {
          let rangeLengthM = ',长度范围' + value + '@@米@@'
          setRangeLengthM(rangeLengthM)
        }
      } else if (name == 'hzbrmc_range_width_mm') {
        // 宽度范围 - 毫米
        // let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
        // setRangeWidthMM(rangeWidthMM)
        if (value == '' || value == 0) {
          let rangeWidthMM = ''
          setRangeWidthMM(rangeWidthMM)
        } else {
          let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
          setRangeWidthMM(rangeWidthMM)
        }
      } else if (name == 'hzbrmc_range_spacing_cm') {
        // 间距范围 - 厘米
        // let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
        // setRangeSpacingCM(rangeSpacingCM)
        if (value == '' || value == 0) {
          let rangeSpacingCM = ''
          setRangeSpacingCM(rangeSpacingCM)
        } else {
          let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
          setRangeSpacingCM(rangeSpacingCM)
        }
      } else if (name == 'hzbrmc_lb_left_length_m') {
        // 左腹板长度 - 米
        // let leftLengthM = ',左腹板长度' + value + '@@米@@'
        // setLeftLengthM(leftLengthM)
        if (value == '' || value == 0) {
          let leftLengthM = ''
          setLeftLengthM(leftLengthM)
        } else {
          let leftLengthM = ',左腹板长度' + value + '@@米@@'
          setLeftLengthM(leftLengthM)
        }
      } else if (name == 'hzbrmc_lb_bottom_length_m') {
        // 底板长度 - 米
        // let bottomLengthM = ',底板长度' + value + '@@米@@'
        // setBottomLengthM(bottomLengthM)
        if (value == '' || value == 0) {
          let bottomLengthM = ''
          setBottomLengthM(bottomLengthM)
        } else {
          let bottomLengthM = ',底板长度' + value + '@@米@@'
          setBottomLengthM(bottomLengthM)
        }
      } else if (name == 'hzbrmc_lb_right_length_m') {
        // 右腹板长度 - 米
        // let rightLengthM = ',右腹板长度' + value + '@@米@@'
        // setRightLengthM(rightLengthM)
        if (value == '' || value == 0) {
          let rightLengthM = ''
          setRightLengthM(rightLengthM)
        } else {
          let rightLengthM = ',右腹板长度' + value + '@@米@@'
          setRightLengthM(rightLengthM)
        }
      } else if (name == 'hzbrmc_lb_left_width_mm') {
        // 左腹板宽度 - 毫米
        // let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
        // setLeftWidthMM(leftWidthMM)
        if (value == '' || value == 0) {
          let leftWidthMM = ''
          setLeftWidthMM(leftWidthMM)
        } else {
          let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
          setLeftWidthMM(leftWidthMM)
        }
      } else if (name == 'hzbrmc_lb_bottom_width_mm') {
        // 底板宽度 - 毫米
        // let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
        // setBottomWidthMM(bottomWidthMM)
        if (value == '' || value == 0) {
          let bottomWidthMM = ''
          setBottomWidthMM(bottomWidthMM)
        } else {
          let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
          setBottomWidthMM(bottomWidthMM)
        }
      } else if (name == 'hzbrmc_lb_right_width_mm') {
        // 右腹板宽度 - 毫米
        // let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
        // setRightWidthMM(rightWidthMM)
        if (value == '' || value == 0) {
          let rightWidthMM = ''
          setRightWidthMM(rightWidthMM)
        } else {
          let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
          setRightWidthMM(rightWidthMM)
        }
      } else if (name == 'hzbrmc_slant_m') {
        // 倾斜量 - 米
        // let slantM = ',倾斜量' + value + '@@米@@'
        // setSlantM(slantM)
        if (value == '' || value == 0) {
          let slantM = ''
          setSlantM(slantM)
        } else {
          let slantM = ',倾斜量' + value + '@@米@@'
          setSlantM(slantM)
        }
      }
      setDiseaseData(_data);
    };

    const [writeDesTextValue, setWriteDesTextValue] = useState('')

    // 填入病害描述内容
    const writeDesText = (name, value) => {
      // let writeTxt = []
      console.log('writeDesText', name, value);
      setWriteDesTextValue(value)

      if (name == 'memberLength') {
        diseaseData['memberLength'] = value
        handleFormChenge(value, diseaseData.memberLength)
      } else if (name == 'memberWidth') {
        diseaseData['memberWidth'] = value
        handleFormChenge(value, diseaseData.memberWidth)
      } else if (name == 'memberHeight') {
        diseaseData['memberHeight'] = value
        handleFormChenge(value, diseaseData.memberHeight)
      }


      // console.log('diseaseData.memberLength1',diseaseData.memberLength, diseaseData.memberWidth, diseaseData.memberHeight);
      // console.log('name value1', name, value);

      // 当数据是长宽高的时候，进行数据存储
      if (name == 'memberLength' || name == 'memberWidth' || name == 'memberHeight') {
        setStorage(name, value)
      }

      if (true) {
        if (diseaseData.scale !== '' && diseaseData.scale !== '0' && diseaseData.scale !== '') {
          var biaodu = ',标度' + diseaseData.scale + '@@'
          setBiaodu(biaodu)
        } else {
          var biaodu = ''
          setBiaodu(biaodu)
        }
        if (diseaseData.hzbrmc_length_m !== undefined && diseaseData.hzbrmc_length_m !== '0' && diseaseData.hzbrmc_length_m !== '') {
          var lengthM = ',长度' + diseaseData.hzbrmc_length_m + '@@米@@'
          setLengthM(lengthM)
        } else {
          var lengthM = ''
          setLengthM(lengthM)
        }
        if (diseaseData.hzbrmc_length_cm !== undefined && diseaseData.hzbrmc_length_cm !== '0' && diseaseData.hzbrmc_length_cm !== '') {
          var lengthCM = ',长度' + diseaseData.hzbrmc_length_cm + '@@厘米@@'
          setLengthCM(lengthCM)
        } else {
          var lengthCM = ''
          setLengthCM(lengthCM)
        }
        if (diseaseData.hzbrmc_length_mm !== undefined && diseaseData.hzbrmc_length_mm !== '0' && diseaseData.hzbrmc_length_mm !== '') {
          var lengthMM = ',长度' + diseaseData.hzbrmc_length_mm + '@@毫米@@'
          setLengthMM(lengthMM)
        } else {
          var lengthMM = ''
          setLengthMM(lengthMM)
        }
        if (diseaseData.hzbrmc_width_m !== undefined && diseaseData.hzbrmc_width_m !== '0' && diseaseData.hzbrmc_width_m !== '') {
          var widthM = ',宽度' + diseaseData.hzbrmc_width_m + '@@米@@'
          setWidthM(widthM)
        } else {
          var widthM = ''
          setWidthM(widthM)
        }
        if (diseaseData.hzbrmc_width_cm !== undefined && diseaseData.hzbrmc_width_cm !== '0' && diseaseData.hzbrmc_width_cm !== '') {
          var widthCM = ',宽度' + diseaseData.hzbrmc_width_cm + '@@厘米@@'
          setWidthCM(widthCM)
        } else {
          var widthCM = ''
          setWidthCM(widthCM)
        }
        if (diseaseData.hzbrmc_width_mm !== undefined && diseaseData.hzbrmc_width_mm !== '0' && diseaseData.hzbrmc_width_mm !== '') {
          console.log('diseaseData.hzbrmc_width_mm',diseaseData.hzbrmc_width_mm == '');
          var widthMM = ',宽度' + diseaseData.hzbrmc_width_mm + '@@毫米@@'
          setWidthMM(widthMM)
        } else {
          // diseaseData.hzbrmc_width_mm == undefined || diseaseData.hzbrmc_width_mm == 0 || diseaseData.hzbrmc_width_mm == ''
          var widthMM = ''
          setWidthMM(widthMM)
        }
        if (diseaseData.hzbrmc_height_m !== undefined && diseaseData.hzbrmc_height_m !== '0' && diseaseData.hzbrmc_height_m !== '') {
          var heightM = ',高度' + diseaseData.hzbrmc_height_m + '@@米@@'
          setHeightM(heightM)
        } else {
          var heightM = ''
          setHeightM(heightM)
        }
        if (diseaseData.hzbrmc_height_cm !== undefined && diseaseData.hzbrmc_height_cm !== '0' && diseaseData.hzbrmc_height_cm !== '') {
          var heightCM = ',高度' + diseaseData.hzbrmc_height_cm + '@@厘米@@'
          setHeightCM(heightCM)
        } else {
          var heightCM = ''
          setHeightCM(heightCM)
        }
        if (diseaseData.hzbrmc_height_mm !== undefined && diseaseData.hzbrmc_height_mm !== '0' && diseaseData.hzbrmc_height_mm !== '') {
          var heightMM = ',高度' + diseaseData.hzbrmc_height_mm + '@@毫米@@'
          setHeightMM(heightMM)
        } else {
          var heightMM = ''
          setHeightMM(heightMM)
        }
        if (diseaseData.hzbrmc_area_face !== undefined && diseaseData.hzbrmc_area_face !== '0' && diseaseData.hzbrmc_area_face !== '') {
          var areaFace = ',面域' + diseaseData.hzbrmc_area_face + '@@%@@'
          setAreaFace(areaFace)
        } else {
          var areaFace = ''
          setAreaFace(areaFace)
        }
        if (diseaseData.hzbrmc_area_per !== undefined && diseaseData.hzbrmc_area_per !== '0' && diseaseData.hzbrmc_area_per !== '') {
          var areaPer = ',面积占比' + diseaseData.hzbrmc_area_per + '@@%@@'
          setAreaPer(areaPer)
        } else {
          var areaPer = ''
          setAreaPer(areaPer)
        }
        if (diseaseData.hzbrmc_area_m !== undefined && diseaseData.hzbrmc_area_m !== '0' && diseaseData.hzbrmc_area_m !== '') {
          var areaM = ',面积' + diseaseData.hzbrmc_area_m + '@@平方米@@'
          setAreaM(areaM)
        } else {
          var areaM = ''
          setAreaM(areaM)
        }
        if (diseaseData.hzbrmc_area_cm !== undefined && diseaseData.hzbrmc_area_cm !== '0' && diseaseData.hzbrmc_area_cm !== '') {
          var areaCM = ',面积' + diseaseData.hzbrmc_area_cm + '@@平方厘米@@'
          setAreaCM(areaCM)
        } else {
          var areaCM = ''
          setAreaCM(areaCM)
        }
        if (diseaseData.hzbrmc_area_mm !== undefined && diseaseData.hzbrmc_area_mm !== '0' && diseaseData.hzbrmc_area_mm !== '') {
          var areaMM = ',面积' + diseaseData.hzbrmc_area_mm + '@@平方毫米@@'
          setAreaMM(areaMM)
        } else {
          var areaMM = ''
          setAreaMM(areaMM)
        }
        if (diseaseData.hzbrmc_heightdiff_cm !== undefined && diseaseData.hzbrmc_heightdiff_cm !== '0' && diseaseData.hzbrmc_heightdiff_cm !== '') {
          var heightDiffCM = ',高差' + diseaseData.hzbrmc_heightdiff_cm + '@@厘米@@'
          setHeightDiffCM(heightDiffCM)
        } else {
          var heightDiffCM = ''
          setHeightDiffCM(heightDiffCM)
        }
        if (diseaseData.hzbrmc_heightdiff_mm !== undefined && diseaseData.hzbrmc_heightdiff_mm !== '0' && diseaseData.hzbrmc_heightdiff_mm !== '') {
          var heightDiffMM = ',高差' + diseaseData.hzbrmc_heightdiff_mm + '@@毫米@@'
          setHeightDiffMM(heightDiffMM)
        } else {
          var heightDiffMM = ''
          setHeightDiffMM(heightDiffMM)
        }
        if (diseaseData.hzbrmc_spacing_cm !== undefined && diseaseData.hzbrmc_spacing_cm !== '0' && diseaseData.hzbrmc_spacing_cm !== '') {
          var spacingCM = ',间距' + diseaseData.hzbrmc_spacing_cm + '@@厘米@@'
          setSpacingCM(spacingCM)
        } else {
          var spacingCM = ''
          setSpacingCM(spacingCM)
        }
        if (diseaseData.hzbrmc_deformation_mm !== undefined && diseaseData.hzbrmc_deformation_mm !== '0' && diseaseData.hzbrmc_deformation_mm !== '') {
          var deformationMM = ',变形' + diseaseData.hzbrmc_deformation_mm + '@@毫米@@'
          setDeformationMM(deformationMM)
        } else {
          var deformationMM = ''
          setDeformationMM(deformationMM)
        }
        if (diseaseData.hzbrmc_num !== undefined && diseaseData.hzbrmc_num !== '0' && diseaseData.hzbrmc_num !== '') {
          var num = ',个数' + diseaseData.hzbrmc_num + '@@个@@'
          setNum(num)
        } else {
          var num = ''
          setNum(num)
        }
        if (diseaseData.hzbrmc_range_cm !== undefined && diseaseData.hzbrmc_range_cm !== '0' && diseaseData.hzbrmc_range_cm !== '') {
          var rangeCM = ',距离' + diseaseData.hzbrmc_range_cm + '@@厘米@@'
          setRangeCM(rangeCM)
        } else {
          var rangeCM = ''
          setRangeCM(rangeCM)
        }
        if (diseaseData.hzbrmc_range_mm !== undefined && diseaseData.hzbrmc_range_mm !== '0' && diseaseData.hzbrmc_range_mm !== '') {
          var rangeMM = ',距离' + diseaseData.hzbrmc_range_mm + '@@毫米@@'
          setRangeMM(rangeMM)
        } else {
          var rangeMM = ''
          setRangeMM(rangeMM)
        }
        if (diseaseData.hzbrmc_depth_cm !== undefined && diseaseData.hzbrmc_depth_cm !== '0' && diseaseData.hzbrmc_depth_cm !== '') {
          var depthCM = ',深度' + diseaseData.hzbrmc_depth_cm + '@@厘米@@'
          setDepthCM(depthCM)
        } else {
          var depthCM = ''
          setDepthCM(depthCM)
        }
        if (diseaseData.hzbrmc_depth_mm !== undefined && diseaseData.hzbrmc_depth_mm !== '0' && diseaseData.hzbrmc_depth_mm !== '') {
          var depthMM = ',深度' + diseaseData.hzbrmc_depth_mm + '@@毫米@@'
          setDepthMM(depthMM)
        } else {
          var depthMM = ''
          setDepthMM(depthMM)
        }
        if (diseaseData.hzbrmc_volume_m !== undefined && diseaseData.hzbrmc_volume_m !== '0' && diseaseData.hzbrmc_volume_m !== '') {
          var volumeM = ',体积' + diseaseData.hzbrmc_volume_m + '@@立方米@@'
          setVolumeM(volumeM)
        } else {
          var volumeM = ''
          setVolumeM(volumeM)
        }
        if (diseaseData.hzbrmc_volume_cm !== undefined && diseaseData.hzbrmc_volume_cm !== '0' && diseaseData.hzbrmc_volume_cm !== '') {
          var volumeCM = ',体积' + diseaseData.hzbrmc_volume_cm + '@@立方厘米@@'
          setVolumeCM(volumeCM)
        } else {
          var volumeCM = ''
          setVolumeCM(volumeCM)
        }
        if (diseaseData.hzbrmc_disp_cm !== undefined && diseaseData.hzbrmc_disp_cm !== '0' && diseaseData.hzbrmc_disp_cm !== '') {
          var dispCM = ',位移' + diseaseData.hzbrmc_disp_cm + '@@厘米@@'
          setDispCM(dispCM)
        } else {
          var dispCM = ''
          setDispCM(dispCM)
        }
        if (diseaseData.hzbrmc_disp_mm !== undefined && diseaseData.hzbrmc_disp_mm !== '0' && diseaseData.hzbrmc_disp_mm !== '') {
          var dispMM = ',位移' + diseaseData.hzbrmc_disp_mm + '@@毫米@@'
          setDispMM(dispMM)
        } else {
          var dispMM = ''
          setDispMM(dispMM)
        }
        if (diseaseData.hzbrmc_angle_c !== undefined && diseaseData.hzbrmc_angle_c !== '0' && diseaseData.hzbrmc_angle_c !== '') {
          var angle = ',角度' + diseaseData.hzbrmc_angle_c + '@@度@@'
          setAngle(angle)
        } else {
          var angle = ''
          setAngle(angle)
        }
        if (diseaseData.hzbrmc_chu !== undefined && diseaseData.hzbrmc_chu !== '0' && diseaseData.hzbrmc_chu !== '') {
          var chu = ',' + diseaseData.hzbrmc_chu + '@@处@@'
          setChu(chu)
        } else {
          var chu = ''
          setChu(chu)
        }
        if (diseaseData.hzbrmc_tiao !== undefined && diseaseData.hzbrmc_tiao !== '0' && diseaseData.hzbrmc_tiao !== '') {
          var tiao = ',' + diseaseData.hzbrmc_tiao + '@@条@@'
          setTiao(tiao)
        } else {
          var tiao = ''
          setTiao(tiao)
        }
        if (diseaseData.hzbrmc_range_fenbu_m !== undefined && diseaseData.hzbrmc_range_fenbu_m !== '0' && diseaseData.hzbrmc_range_fenbu_m !== '') {
          var rangeFenbuM = ',分布范围' + diseaseData.hzbrmc_range_fenbu_m + '@@米@@'
          setRangeFenbuM(rangeFenbuM)
        } else {
          var rangeFenbuM = ''
          setRangeFenbuM(rangeFenbuM)
        }
        if (diseaseData.hzbrmc_range_length_m !== undefined && diseaseData.hzbrmc_range_length_m !== '0' && diseaseData.hzbrmc_range_length_m !== '') {
          var rangeLengthM = ',长度范围' + diseaseData.hzbrmc_range_length_m + '@@米@@'
          setRangeLengthM(rangeLengthM)
        } else {
          var rangeLengthM = ''
          setRangeLengthM(rangeLengthM)
        }
        if (diseaseData.hzbrmc_range_width_mm !== undefined && diseaseData.hzbrmc_range_width_mm !== '0' && diseaseData.hzbrmc_range_width_mm !== '') {
          var rangeWidthMM = ',宽度范围'+ diseaseData.hzbrmc_range_width_mm + '@@毫米@@'
          setRangeWidthMM(rangeWidthMM)
        } else {
          var rangeWidthMM = ''
          setRangeWidthMM(rangeWidthMM)
        }
        if (diseaseData.hzbrmc_range_spacing_cm !== undefined && diseaseData.hzbrmc_range_spacing_cm !== '0' && diseaseData.hzbrmc_range_spacing_cm !== '') {
          var rangeSpacingCM = ',间距范围' + diseaseData.hzbrmc_range_spacing_cm + '@@厘米@@'
          setRangeSpacingCM(rangeSpacingCM)
        } else {
          var rangeSpacingCM = ''
          setRangeSpacingCM(rangeSpacingCM)
        }
        if (diseaseData.hzbrmc_lb_left_length_m !== undefined && diseaseData.hzbrmc_lb_left_length_m !== '0' && diseaseData.hzbrmc_lb_left_length_m !== '') {
          var leftLengthM = ',左腹板长度' + diseaseData.hzbrmc_lb_left_length_m + '@@米@@'
          setLeftLengthM(leftLengthM)
        } else {
          var leftLengthM = ''
          setLeftLengthM(leftLengthM)
        }
        if (diseaseData.hzbrmc_lb_bottom_length_m !== undefined && diseaseData.hzbrmc_lb_bottom_length_m !== '0' && diseaseData.hzbrmc_lb_bottom_length_m !== '') {
          var bottomLengthM = ',底板长度' + diseaseData.hzbrmc_lb_bottom_length_m + '@@米@@'
          setBottomLengthM(bottomLengthM)
        } else {
          var bottomLengthM = ''
          setBottomLengthM(bottomLengthM)
        }
        if (diseaseData.hzbrmc_lb_right_length_m !== undefined && diseaseData.hzbrmc_lb_right_length_m !== '0' && diseaseData.hzbrmc_lb_right_length_m !== '') {
          var rightLengthM = ',右腹板长度' + diseaseData.hzbrmc_lb_right_length_m + '@@米@@'
          setRightLengthM(rightLengthM)
        } else {
          var rightLengthM = ''
          setRightLengthM(rightLengthM)
        }
        if (diseaseData.hzbrmc_lb_left_width_mm !== undefined && diseaseData.hzbrmc_lb_left_width_mm !== '0' && diseaseData.hzbrmc_lb_left_width_mm !== '') {
          var leftWidthMM = ',左腹板宽度' + diseaseData.hzbrmc_lb_left_width_mm + '@@毫米@@'
          setLeftWidthMM(leftWidthMM)
        } else {
          var leftWidthMM = ''
          setLeftWidthMM(leftWidthMM)
        }
        if (diseaseData.hzbrmc_lb_bottom_width_mm !== undefined && diseaseData.hzbrmc_lb_bottom_width_mm !== '0' && diseaseData.hzbrmc_lb_bottom_width_mm !== '') {
          var bottomWidthMM = ',底板宽度' + diseaseData.hzbrmc_lb_bottom_width_mm + '@@毫米@@'
          setBottomWidthMM(bottomWidthMM)
        } else {
          var bottomWidthMM = ''
          setBottomWidthMM(bottomWidthMM)
        }
        if (diseaseData.hzbrmc_lb_right_width_mm !== undefined && diseaseData.hzbrmc_lb_right_width_mm !== '0' && diseaseData.hzbrmc_lb_right_width_mm !== '') {
          var rightWidthMM = ',右腹板宽度' + diseaseData.hzbrmc_lb_right_width_mm + '@@毫米@@'
          setRightWidthMM(rightWidthMM)
        } else {
          var rightWidthMM = ''
          setRightWidthMM(rightWidthMM)
        }
        if (diseaseData.hzbrmc_slant_m !== undefined && diseaseData.hzbrmc_slant_m !== '0' && diseaseData.hzbrmc_slant_m !== '') {
          var slantM = ',倾斜量' + diseaseData.hzbrmc_slant_m + '@@米@@'
          setSlantM(slantM)
        } else {
          var slantM = ''
          setSlantM(slantM)
        }
      }

      // console.log('value',writeDesTextValue);
      if (writeDesTextValue == '' || writeDesTextValue == undefined) {
        console.log('没有修改数据');
        if (diseaseData.description == '' || diseaseData.description == undefined) {
          diseaseData['description'] = itemData.diseaseName
        } else if (diseaseData.description !== '' || diseaseData.description !== undefined) {
          let writeTxt = lengthM + lengthCM + lengthMM + widthM + widthCM
                  + widthMM + heightM + heightCM + heightMM + areaFace
                  + areaPer + areaM + areaCM + areaMM + heightDiffCM + heightDiffMM
                  + spacingCM + deformationMM + num + rangeCM + rangeMM + depthCM
                  + depthMM + volumeM + volumeCM + dispCM + dispMM + angle + chu
                  + tiao + rangeFenbuM + rangeLengthM + rangeWidthMM + rangeSpacingCM
                  + leftLengthM + bottomLengthM + rightLengthM + leftWidthMM
                  + bottomWidthMM + rightWidthMM + slantM
          // let writeTxt = diseaseData.hzbrmc_length_m
          setWriteTxt(writeTxt)
          // console.log('writeTxt', writeTxt);
          // console.log('病害名称',itemData.diseaseName);
          let binghai = itemData.diseaseName
          let allText = binghai.concat(writeTxt)
          console.log('allText', allText);
          diseaseData['description'] = allText
          handleFormChenge(allText, diseaseData.description)
        }
      } else {
        let writeTxt = lengthM + lengthCM + lengthMM + widthM + widthCM
                  + widthMM + heightM + heightCM + heightMM + areaFace
                  + areaPer + areaM + areaCM + areaMM + heightDiffCM + heightDiffMM
                  + spacingCM + deformationMM + num + rangeCM + rangeMM + depthCM
                  + depthMM + volumeM + volumeCM + dispCM + dispMM + angle + chu
                  + tiao + rangeFenbuM + rangeLengthM + rangeWidthMM + rangeSpacingCM
                  + leftLengthM + bottomLengthM + rightLengthM + leftWidthMM
                  + bottomWidthMM + rightWidthMM + slantM
        setWriteTxt(writeTxt)
        console.log('writeTxt', writeTxt);
        console.log('病害名称',itemData.diseaseName);
        let binghai = itemData.diseaseName
        let allText = binghai.concat(writeTxt)
        console.log('allText', allText);
        diseaseData['description'] = allText
        handleFormChenge(allText, diseaseData.description)
      }
      
      
      
    }

    // 填入位置描述内容
    const writePositionText = () => {
      try {
        // console.log('diseaseData.area', diseaseData.area);
        console.log('diseaseData.lengthText',lengthText,widthText,heightText);
        if (diseaseData.area == undefined || diseaseData.area == '') {
          let areaName = ''
          console.log('diseaseData.area为空');
          // 墩/台描述
          // 长度描述
          if (lengthText == '0' || lengthText == '0.0') {
            var lengthNum = ''
            setLengthNum(lengthNum)
            // let pier = ''
            // setPier(pier)
          } else if (lengthText !== '0' || lengthText !== '0.0') {
            var lengthNum = lengthText + 'm'
            setLengthNum(lengthNum)
          }
          
          // 宽度描述
          if (widthText == '0' || widthText == '0.0') {
            var widthNum = ''
            setWidthNum(widthNum)
          } else if (widthText !== '0' || widthText !== '0.0') {
            if (lengthNum == '') {
              var widthNum = '距左侧' + widthText + 'm'
              setWidthNum(widthNum)
            } else {
              var widthNum = ',距左侧' + widthText + 'm'
              setWidthNum(widthNum)
            }
          }

          // 距顶描述
          // if (heightText == '0' || heightText == '0.0') {
          //   var heightNum = ''
          //   setHeightNum(heightNum)
          // } else if (heightText !== '0' || heightText !== '0.0') {
          //   var heightNum = ',距顶' + heightText + 'm'
          //   setHeightNum(heightNum)
          // }

          if (lengthNum == '' && widthNum == '') {
            let writePositionTxt = '/' + areaName
            setWritePositionTxt(writePositionTxt)
            diseaseData['writePositionTxt'] = writePositionTxt
            setDiseaseData(diseaseData)
            handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
          } else {
            console.log('55555');
            // console.log('kankan areaName', areaName);

            if (lengthNum == '') {
              let writePositionTxt = areaName + widthNum + '处'
              setWritePositionTxt(writePositionTxt)
              diseaseData['writePositionTxt'] = writePositionTxt
              setDiseaseData(diseaseData)
              handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
            } else {
              // 位置描述 = / + 病害区域 + 桥台 + 长度
              let writePositionTxt = areaName + pier + lengthNum + widthNum + '处'
              setWritePositionTxt(writePositionTxt)
              diseaseData['writePositionTxt'] = writePositionTxt
              setDiseaseData(diseaseData)
              handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
            }
          }
        } else {
          console.log('有数据了');
          console.log('构件区域列表：：',areaparam);
          console.log('表单中的构件区域',diseaseData.area);
          console.log('构件类型',labelName);
          if (labelName == 'at0000' && diseaseData.area == undefined || diseaseData.area == '' || diseaseData.area == '/') {
            console.log('empty~~~');
            var areaName = ''
            diseaseData['area'] = areaName
            handleFormChenge(areaName, diseaseData.area)
          } else if (labelName == 'at0000' && diseaseData.area !== undefined || diseaseData.area !== '' || diseaseData.area !== '/') {
            console.log('not empty~~~~');
            var areaName = diseaseData.area
            diseaseData['area'] = areaName
            handleFormChenge(areaName, diseaseData.area)
          }
          if (areaparam !== []) {
            let areaArr = areaparam
            let inputArea = diseaseData.area
            console.log('inputArea',inputArea);
            for (let i = 0; i < areaArr.length; i++) {
              if (inputArea == areaArr[i].value) {
                console.log('此时选中的构件是：',areaArr[i].label);
                var areaName = areaArr[i].label
                console.log(areaName);
                setAreaName(areaName)
              }
            }
          }
            
            
            // 墩/台描述
            // 长度描述
            if (lengthText == '0' || lengthText == '0.0') {
              var lengthNum = ''
              setLengthNum(lengthNum)
            } else if (lengthText !== '0' || lengthText !== '0.0') {
              var lengthNum = lengthText + 'm'
              setLengthNum(lengthNum)
            }
            
            // 宽度描述
            if (widthText == '0' || widthText == '0.0') {
              var widthNum = ''
              setWidthNum(widthNum)
            } else if (widthText !== '0' || widthText !== '0.0') {
              if (lengthNum == '') {
                var widthNum = '距左侧' + widthText + 'm'
                setWidthNum(widthNum)
              } else {
                var widthNum = ',距左侧' + widthText + 'm'
                setWidthNum(widthNum)
              }
            }

            // 距顶描述
            // if (heightText == '0' || heightText == '0.0') {
            //   var heightNum = ''
            //   setHeightNum(heightNum)
            // } else if (heightText !== '0' || heightText !== '0.0') {
            //   var heightNum = ',距顶' + heightText + 'm'
            //   setHeightNum(heightNum)
            // }

            console.log('kankan areaName', areaName);
            if (lengthNum == '' && widthNum == '') {
              let writePositionTxt = areaName
              setWritePositionTxt(writePositionTxt)
              diseaseData['writePositionTxt'] = writePositionTxt
              setDiseaseData(diseaseData)
              handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
            } else {
              console.log('65666');
              // console.log('kankan areaName', areaName);
              if (lengthNum == '') {
                let writePositionTxt = areaName + lengthNum + widthNum + '处'
                setWritePositionTxt(writePositionTxt)
                diseaseData['writePositionTxt'] = writePositionTxt
                setDiseaseData(diseaseData)
                handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
              } else {
                let writePositionTxt = areaName + pier + lengthNum + widthNum + '处'
                setWritePositionTxt(writePositionTxt)
                diseaseData['writePositionTxt'] = writePositionTxt
                setDiseaseData(diseaseData)
                handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
              }
            }
        }
      } catch (err) {
        console.log('出现错误1:',err);
      }
    }

    // 一键填入病害描述与位置描述
    const allWrite = () => {
      writeDesText()
      writePositionText()
    }

    // 存入数据
    const setStorage = async(name, value) => {
      console.log('存储长宽高数据的函数~~', name, value);
      // 桥梁id + 部件名称 + 长/宽/高
      const REname = bridgeId + '_' + storageMemberName + '_' + name
      try {
        await AsyncStorage.setItem(REname, value)
      } catch (err) {
        console.log('存入数据失败!', err);
      }
    }

    // 读取数据
    const getStorage = async(name) => {
      console.log('读取存储的长宽高的数据~',name);
      // console.log('diseaseData 有无',diseaseData);
      try {
        const value = await AsyncStorage.getItem(name)
        console.log('value~~~',value);
        if (value !== null) {
          console.log('读取到的数据',name,value);
          if (name == bridgeId + '_' + storageMemberName + '_' + 'memberLength') {
            console.log('length99999');
            diseaseData['memberLength'] = value
            setDiseaseData(diseaseData)
            handleFormChenge(value, diseaseData.memberLength)
          }
          // else if (name == bridgeId + '_' + storageMemberName + '_' + 'memberWidth') {
          //   console.log('Width99999');
          //   diseaseData['memberWidth'] = value
          //   setDiseaseData(diseaseData)
          //   handleFormChenge(value, diseaseData.memberWidth)
          // } else if (name == bridgeId + '_' + storageMemberName + '_' + 'memberHeight') {
          //   console.log('Height99999');
          //   diseaseData['memberHeight'] = value
          //   setDiseaseData(diseaseData)
          //   handleFormChenge(value, diseaseData.memberHeight)
          // }
        }
      } catch (err) {
        console.log('读取失败~', err);
      }
    }

    const writeNum = () => {
      try {
        console.log('长宽高的数据::',diseaseData.memberLength,diseaseData.memberWidth,diseaseData.memberHeight);
        const lengthName = bridgeId + '_' + storageMemberName + '_' + 'memberLength'
        const lengthValue = AsyncStorage.getItem(lengthName)
        // const widthName = bridgeId + '_' + storageMemberName + '_' + 'memberWidth'
        // const widthValue = AsyncStorage.getItem(widthName)
        // const heightName = bridgeId + '_' + storageMemberName + '_' + 'memberHeight'
        // const heightValue = AsyncStorage.getItem(heightName)
        getStorage(lengthName)
      } catch (e) {
        console.log('writeNum错误',e);
      }
    }


  {/* ================================================= */}
  {/* 病害填写表格区域 */}
  return (
  <View style={tailwind.flexRow}>
    {/* 病害填写表格区域 */}
    <ScrollView style={{height:350}}>
      <View>
      <View style={[tailwind.flexRow, tailwind.justifyBetween]}>
        <LabelItem label="编号:">
          <Text style={[tailwind.fontBold]}>
            {route.params?.data?.index}
          </Text>
        </LabelItem>
        <View style={tailwind.flexRow}>
          <LabelItem
            label="重点关注"
            LabelStyle={[tailwind.mR0, {color:'#2b427d'}]}
          />
          <Checkbox
            checked={!!diseaseData?.mian}
            onPress={() =>
              handleFormChenge({
                name: 'mian',
                value: !diseaseData?.mian + 0,
              })
            }
          />
        </View>
      </View>
      {/* 构件类型、构件区域 */}
      <View style={[tailwind.flexRow]}>
        <View style={{width:230}}>
            <Select
          label="构件类型"
          name="areatype"
          labelName="areaname"
          valueName="areatype"
          value={diseaseData?.areatype}
          onChange={handleFormChenge}
          values={baseData.components}
        />
        </View>
        <View style={{width:230}}>
          <View style={tailwind.mB2}>
            {!areaparam.length ? (
              <TextInput
                name="area"
                label="构件区域"
                value={diseaseData?.area}
                onChange={handleFormChenge}
                lines={1}
                height={25}
              />
            ) : (
              <Select
                name="area"
                label="构件区域"
                value={diseaseData?.area}
                values={areaparam}
                onChange={handleFormChenge}
              />
            )}
          </View>
        </View>
      </View>
      {/* 修改标度数据源 */}
      {rightScale.length ? (
          <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
            <LabelItem label="标度" />
            <TouchableOpacity onPress={handleScaleOpen}>
              <Icon
                name="information"
                size={20}
                style={[tailwind.mR2, {color:'#2b427d'}]}
              />
            </TouchableOpacity>
            <RadioGroup
              name="scale"
              values={rightScale} // 初始数据第一项为'无'，提取第二项及以后的数据传入组件
              value={diseaseData?.scale}
              onChange={handleFormChenge}
            />
          </View>
        ) : (
          <></>
        )}


      <View style={tailwind.mT2} />
      <View>
        <View style={[tailwind.flexRow]}>
          <TouchableOpacity style={{width:90,height:20,borderRadius: 5,
            backgroundColor: '#2b427d',
            justifyContent: 'center',
            overflow: 'hidden'}}
            onPress={writeNum}>
            <Text style={{textAlign: 'center',color:'#fff',fontSize:12}}>获取上一次数据</Text>
          </TouchableOpacity>
          <LabelItem label="病害位置(米)" style={[tailwind.w18,{marginLeft:10}]} />
          <Text>长度{lengthText}米</Text>
          <Text>  </Text>
          
        </View>
        <View style={tailwind.mT2} />
        <View style={[tailwind.flexRow]}>
          <LabelItem label="长度" />
          <KeyboardInput
            name="memberLength"
            value={diseaseData?.memberLength}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disLength"
            memberData={diseaseData?.memberLength}
            value={diseaseData?.disLength}
            onChange={handleFormChenge}
          />
        </View>
         <View style={tailwind.mT2} />
        {/* <View style={[tailwind.flexRow]}>
          <LabelItem label="宽度" style={tailwind.w18} />
          <KeyboardInput
            name="memberWidth"
            value={diseaseData?.memberWidth}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disWidth"
            memberData={diseaseData?.memberWidth}
            value={diseaseData?.disWidth}
            onChange={handleFormChenge}
          />
        </View>
        <View style={tailwind.mT2} />
        <View style={[tailwind.flexRow,tailwind.mB3]}>
          <LabelItem label="距顶" style={tailwind.w18} />
          <KeyboardInput
            name="memberHeight"
            value={diseaseData?.memberHeight}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disHeight"
            memberData={diseaseData?.memberHeight}
            value={diseaseData?.disHeight}
            onChange={handleFormChenge}
          />
        </View> */}
      </View>
      {/* <View style={tailwind.mT2} /> */}
      <View style={[tailwind.flexRow]}>
        <View style={{width:500}}>
          <WriteInput
            name="description"
            label="病害描述"
            value={diseaseData?.description}
            onChange={handleFormChenge}
            lines={3}
            height={70}
            // disabled={true}
          />
        </View>
        {/* <TouchableOpacity style={styles.sideButton} onPress={writeDesText}>
          <Text style={[{color:'#fff',fontSize:12}]}>填入描述</Text>
        </TouchableOpacity> */}
      </View>
      <View style={tailwind.mT2} />
      <View style={[tailwind.flexRow]}>
        <View style={{width:500}}>
          <WriteInput
            name="writePositionTxt"
            label="位置描述"
            value={diseaseData?.writePositionTxt}
            onChange={handleFormChenge}
            lines={3}
            height={70}
          />
        </View>
        {/* <TouchableOpacity style={styles.sideButton} onPress={writePositionText}>
          <Text style={[{color:'#fff',fontSize:12}]}>填入描述</Text>
        </TouchableOpacity> */}
      </View>
    </View>
    </ScrollView>
    
    {/* ================================================= */}
    <View style={tailwind.mX3} />
    
    <View style={[{width:'20%'}]}>
      <View>
        {/* <LabelItem label="当前病害:" /> */}
        <Text style={[tailwind.fontBold,{width:'100%'}]}>
          {itemData?.diseaseName}
        </Text>
      </View>
      <View style={tailwind.mT2} />
      {infoList.length ? (
        infoList.map(({strvalue, strinfo}, index) => (
          <React.Fragment key={index}>
              <View style={[tailwind.mB2]}>
                <LabelItem label={strinfo} />
                <View style={{width:70,height:25}}>
                  <KeyboardInput
                    name={strvalue}
                    value={diseaseData[strvalue]}
                    onChange={handleFormChenge}
                  />
                </View>
              </View>
          </React.Fragment>
          
        ))
      ) : (
        <></>
      )}
      <TouchableOpacity style={styles.bottomButton} onPress={allWrite}>
        <Text style={[{color:'#fff',fontSize:14}]}>生成描述</Text>
      </TouchableOpacity>
    </View>
    <ScaleInfo ref={scaleInfoRef} info={scaleTabel} />
  </View>
  );
  {/* ================================================= */}
}

export function DiseaseD({route, navigation}) {
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
  
    const [areaparam, areanode] = hooks.useArea({diseaseData, baseData});
  
    // const infoList = hooks.useInfoComponents({diseaseData, baseData});
    const [infoList,setInfoList] = useState([])
  
    const defaultFileName = hooks.useDefaultFileName({diseaseData, baseData});
  
    const [scale, scaleInfo] = hooks.useScale({
      diseaseData,
      typeList: route.params?.type?.list,
      baseData,
    });


    React.useEffect(() => {
      setDiseaseData(itemData);
      console.log('itemData:',itemData);
      try {
        console.log('itemData',itemData.standard.scale);
        setBiaodu(itemData.standard.scale)
        diseaseData['scale'] = itemData.standard.scale
      } catch (error) {
        console.log('设置标度初始值',error);
      }
    }, [itemData]);
  
    const [lengthText, setLengthText] = useState()
    const [widthText, setWidthText] = useState()
    const [heightText, setHeightText] = useState()
    // =================================================
    const [writeTxt, setWriteTxt] = useState('')
    const [writePositionTxt, setWritePositionTxt] = useState('')
    // -------------------------------------------------
    // 标度,默认为 2
    const [biaodu, setBiaodu] = useState(2)
    // 长度 - 米
    const [lengthM, setLengthM] = useState('')
    // 长度 - 厘米
    const [lengthCM, setLengthCM] = useState('')
    // 长度 - 毫米
    const [lengthMM, setLengthMM] = useState('')
    // 宽度 - 米
    const [widthM, setWidthM] = useState('')
    // 宽度 - 厘米
    const [widthCM, setWidthCM] = useState('')
    // 宽度 - 毫米
    const [widthMM, setWidthMM] = useState('')
    // 高度 - 米
    const [heightM, setHeightM] = useState('')
    // 高度 - 厘米
    const [heightCM, setHeightCM] = useState('')
    // 高度 - 毫米
    const [heightMM, setHeightMM] = useState('')
    // 面域 - %
    const [areaFace, setAreaFace] = useState('')
    // 面积占比 - %
    const [areaPer, setAreaPer] = useState('')
    // 面积 - 平方米
    const [areaM, setAreaM] = useState('')
    // 面积 - 平方厘米
    const [areaCM, setAreaCM] = useState('')
    // 面积 - 平方毫米
    const [areaMM, setAreaMM] = useState('')
    // 高差 - 厘米
    const [heightDiffCM, setHeightDiffCM] = useState('')
    // 高差 - 毫米
    const [heightDiffMM, setHeightDiffMM] = useState('')
    // 间距 - 厘米
    const [spacingCM, setSpacingCM] = useState('')
    // 变形 - 毫米
    const [deformationMM, setDeformationMM] = useState('')
    // 个数 - 个
    const [num, setNum] = useState('')
    // 距离 - 厘米
    const [rangeCM, setRangeCM] = useState('')
    // 距离 - 毫米
    const [rangeMM, setRangeMM] = useState('')
    // 深度 - 厘米
    const [depthCM, setDepthCM] = useState('')
    // 深度 - 毫米
    const [depthMM, setDepthMM] = useState('')
    // 体积 - 立方米
    const [volumeM, setVolumeM] = useState('')
    // 体积 - 立方厘米
    const [volumeCM, setVolumeCM] = useState('')
    // 位移 - 厘米
    const [dispCM, setDispCM] = useState('')
    // 位移 - 毫米
    const [dispMM, setDispMM] = useState('')
    // 角度 - 度
    const [angle, setAngle] = useState('')
    // 处
    const [chu, setChu] = useState('')
    // 条
    const [tiao, setTiao] = useState('')
    // 分布范围 - 米
    const [rangeFenbuM, setRangeFenbuM] = useState('')
    // 长度范围 - 米
    const [rangeLengthM, setRangeLengthM] = useState('')
    // 宽度范围 - 毫米
    const [rangeWidthMM, setRangeWidthMM] = useState('')
    // 间距范围 - 厘米
    const [rangeSpacingCM, setRangeSpacingCM] = useState('')
    // 左腹板长度 - 米
    const [leftLengthM, setLeftLengthM] = useState('')
    // 底板长度 - 米
    const [bottomLengthM, setBottomLengthM] = useState('')
    // 右腹板长度 - 米
    const [rightLengthM, setRightLengthM] = useState('')
    // 左腹板宽度 - 毫米
    const [leftWidthMM, setLeftWidthMM] = useState('')
    // 底板宽度 - 毫米
    const [bottomWidthMM, setBottomWidthMM] = useState('')
    // 右腹板宽度 - 毫米
    const [rightWidthMM, setRightWidthMM] = useState('')
    // 倾斜量 - 米
    const [slantM, setSlantM] = useState('')

    const [saveDescription, setSaveDescription] = useState()

    // 构件类型
    const [labelName, setLabelName] = useState()
    // 构件区域
    const [areaName, setAreaName] = useState()

    // 病害名称
    const [infoshort, setInfoShort] = useState()

    // 位置描述 墩台
    const [pier,  setPier] = useState()
    // 位置描述 长、宽、距顶
    const [lengthNum, setLengthNum] = useState()
    const [widthNum, setWidthNum] = useState()
    const [heightNum, setHeightNum] = useState()

    const [diseaseName, setDiseaseName] = useState('')
    // =================================================
    React.useEffect(() => {
      saveData.current = {...diseaseData};
      try {

        if (baseData.membercheckdata) {
          console.log('保存baseData数据');
          setBaseDataStorage(JSON.stringify(baseData.membercheckdata))
        }
        if (route.params.thridData.datastr && baseData.membercheckdata) {
          let infoList = []
          route.params.thridData.datastr.forEach((item) => {
            // console.log('病害列表传入的datastr',item);
            baseData.membercheckdata.forEach((item1) => {
              if (item == item1.strid) {
                // console.log('取出来的item1',item1);
                infoList.push(item1)
              }
            })
          })
          setInfoList(infoList)
        } else if (!baseData.membercheckdata) {
          console.log('读取baseData数据');
          getBaseDataStorage('baseData')
        }

        if (diseaseData.diseaseName == undefined || diseaseData.diseaseName == '') {
          console.log('7777');
          diseaseData['diseaseName'] = route.params.thridData.checkinfoshort
          handleFormChenge(route.params.thridData.checkinfoshort, diseaseData.diseaseName)
        }
      } catch (err){
        console.log('err09', err);
      }
      try {
        // 初始构件类型与选择的构件类型一致时，构件区域取选择的值
        // 初始构件类型与选择的构件类型不一致时，构件区域默认取第一项
        for (let i =0; i < areaparam.length; i ++) {
          if (diseaseData.area == undefined) {
            diseaseData.area = areaparam[0].value
            handleFormChenge(areaparam[0].value, diseaseData.area)
            setAreaName(areaparam[0].label)
          } else if (diseaseData.area !== undefined) {
            let sliceArea = diseaseData.area.slice(0,6)
            if (sliceArea !== diseaseData.areatype) {
              for (let k = 0; k < baseData.components.length; k++) {
                if (diseaseData.areatype == baseData.components[k].areatype) {
                  diseaseData['areatype'] = baseData.components[k].areatype
                  diseaseData['area'] = baseData.components[k].areaparamjson.areaparamlist[0].areaparamid
                }
              }
            }
          }
        }
      } catch (err) {
        console.log('err08', err);
      }
      try {
        let lengthText = (diseaseData.memberLength * (diseaseData.disLength / 100)).toFixed(2)
        setLengthText(lengthText)
        let widthText = (diseaseData.memberWidth * (diseaseData.disWidth / 100)).toFixed(2)
        setWidthText(widthText)
        let heightText = (diseaseData.memberHeight * (diseaseData.disHeight / 100)).toFixed(2)
        setHeightText(heightText)
        if (lengthText == 'NaN') {
          let lengthText = '0'
          setLengthText(lengthText)
        }
        if (widthText == 'NaN') {
          let widthText = '0'
          setWidthText(widthText)
        }
        if (heightText == 'NaN') {
          let heightText = '0'
          setHeightText(heightText)
        }


        if (diseaseData.area == undefined) {

        } else if (diseaseData.area !== '' || diseaseData.area !== undefined || diseaseData.area !== '/') {
          var sliceArea = diseaseData.area.slice(0,5)
        }
        
        if (diseaseData.areatype == 'at0000' && sliceArea == 'at000') {
          console.log(sliceArea);
          console.log('xu~~~~~');
          diseaseData['area'] = '/'
        }
        
        // 将病害位置的长宽高数据存进diseaseData
        diseaseData['lengthText'] = lengthText
        diseaseData['widthText'] = widthText
        diseaseData['heightText'] = heightText
        diseaseData['remark'] = route.params.thridData.checkinfoshort


        // 取病害名称并保存
        if (diseaseData.diseaseName == '' || diseaseData.diseaseName == undefined) {
          let diseaseName = route.params.thridData.checkinfoshort
          // setDiseaseName(diseaseName)
          console.log('0000000');
          console.log('~~~~~~~diseaseName~~~~~',diseaseName);
          diseaseData['diseaseName'] = diseaseName
          handleFormChenge(diseaseName, diseaseData.diseaseName)
          setDiseaseName(diseaseName)
        }

        if (diseaseData.stairgroupid == undefined || diseaseData.stairgroupid == '') {
          // console.log('0000.000');
          diseaseData['stairgroupid'] = route.params.stairgroupid
          handleFormChenge(route.params.stairgroupid, diseaseData.stairgroupid)
        }


        // console.log(diseaseData);
        if (diseaseData.remark == '' || diseaseData.remark == undefined) {
          let infoshort = route.params.thridData.checkinfoshort
          setInfoShort(infoshort)
        }
        if (diseaseData.description == '' || diseaseData.description == undefined) {
          diseaseData['description'] = diseaseData.remark
        }

        // console.log('diseaseData.writePositionTxt00000000',diseaseData.writePositionTxt);
        if (diseaseData.writePositionTxt == undefined || diseaseData.writePositionTxt == '') {
          let writePositionTxt = '/'
          setWritePositionTxt(writePositionTxt)
          diseaseData['writePositionTxt'] = writePositionTxt
          handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
        }

        try {
          if (itemData && route.params.mediaType == 'add') {
            diseaseData['scale'] = rightScaleNum
            handleFormChenge(rightScaleNum, diseaseData.scale)
            route.params.mediaType = ''
          }
        } catch (error) {
          console.log('设置标度初始值',error);
        }
      } catch {
      }
    }, [diseaseData]);

    // 保存baseData的数据
    const setBaseDataStorage = async(value) => {
      try {
        await AsyncStorage.setItem('baseData', value)
      } catch (err) {
        console.log('存入数据失败!3', err);
      }
    }
    // 读取baseData的数据
    const getBaseDataStorage = async(name) => {
      // console.log('读取baseData数据')
      try {
        const value = await AsyncStorage.getItem(name)
        let values = JSON.parse(value)
        // console.log('value~~~',value);
        let infoList = []
          route.params.thridData.datastr.forEach((item) => {
            // console.log('病害列表传入的datastr',item);
            values.forEach((item1) => {
              if (item == item1.strid) {
                // console.log('取出来的item1',item1);
                infoList.push(item1)
              }
            })
          })
          setInfoList(infoList)
      } catch (error) {
        console.log('读取baseData数据失败',error);
      }
    }

    // 重新获取数据的标度选项数组
    const [rightScale, setRightScale] = useState([])
    // 默认的标度值
    const [rightScaleNum, setRightScaleNum] = useState('')
    // 重新获取数据的标度评定标准表格
    const [scaleTabel, setScaleTabel] = useState([])
  
    React.useEffect(() => {

      try {
        console.log('scale',scale);
        // console.log('baseData', baseData);
        // console.log('标度表格信息baseData.basestandardtable',baseData.basestandardtable)

        // 当页面是由新建进入时，存储标度数组，以备编辑进入时使用
        if (route.params.mediaType == 'add' || route.params.mediaType == '') {
          // =================================
          // 获取标度列表与标度默认值
          let scaleSelect = baseData.basestandardtable
          let oldArr = ''
          let scaleNum = ''
          scaleSelect.forEach(item => {
            // console.log('33330000',item.standardid);
            
            if (route.params.thridData.strandardid == item.standardid) {
              console.log('当前病害的标度选项',item);
              // setRightScale(item.standardscalestr)
              oldArr = item.standardscalestr
              scaleNum = item.standardscale
            }
          });
          setRightScaleNum(scaleNum)
          // console.log('rightScale',rightScale);
          const arr = oldArr.split(',')
          console.log('arr',arr);
          
          let resetArr = []
          arr.forEach((item, index) => {
            resetArr.push({
              label:index + 1,
              value:item
            })
          })
          console.log('resetArr',resetArr);
          setRightScale(resetArr)
          diseaseData['scaleArr'] = rightScale
          handleFormChenge(rightScale, diseaseData.scaleArr)

          // =================================
          // 获取标度评定标准表数据
          let scaleTabel = baseData.standardtableinfo
          // console.log('表格数据',scaleTabel);
          let oldTable = []
          scaleTabel.forEach((item) => {
            if (route.params.thridData.strandardid == item.standardid) {
              // console.log('当前的评定表item',item);
              oldTable.push(item)
            }
          })
          console.log('oldTable',oldTable);
          setScaleTabel(oldTable)
          diseaseData['scaleTableArr'] = oldTable
          handleFormChenge(oldTable, diseaseData.scaleTableArr)


        } else if (route.params.mediaType == 'edit') {
          // 当页面是由编辑进入时
          setRightScale(diseaseData.scaleArr)
          setScaleTabel(scaleTabel)
          // console.log('rightScale222222',rightScale);
        }
      } catch (error) {
        console.log('获取标度数据',error);
      }

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
            // .map(
            //   ({strname, strvalue, strunit}) =>
            //     `${strname}${saveData.current[strvalue] || 0}@@${
            //       strunit || ''
            //     }@@`,
            // )
            .map(
              ({strname, strvalue, strunit}) =>
                `${saveData.current[strvalue] == undefined ? '' : strname + saveData.current[strvalue] + '@@' + strunit + '@@'}`
            )
            const strr = str.filter(item => item!=='') == '' ? '/' : str.filter(item => item!=='')
            // .join(',');
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
            }，${strr}`,
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

    useEffect(() => {
      // console.log('桥跨：：',route.params.memberList);
      let defaultPier = route.params.memberList[0].membername
      // 提取第一个字符进行判断（表示墩台的数据）
      let firstDefaultPier = defaultPier.slice(0,1)
      if (firstDefaultPier == 1) {
        let pier = '距' + (firstDefaultPier - 1) + '#台'
        setPier(pier)
        console.log('dundun:', pier);
      } else {
        let pier = '距' + (firstDefaultPier - 1) + '#墩'
        setPier(pier)
        console.log('dundun:', pier);
      }

      

      console.log('构件区域列表：：',areaparam);
      // console.log('表单中的构件区域',diseaseData.area);
      if (areaparam == '' || areaparam == undefined) {
        console.log('选的其他');
        try{
         console.log('构件类型', itemData.areatype); 
         if (itemData.areatype == 'at0000' || itemData.areatype == undefined) {
          // console.log('9999');
          diseaseData['area'] = '/'
          let labelName = itemData.areatype
          setLabelName(labelName)
         }
        } catch {

        }
      }
    },[])

    const handleScaleOpen = () => scaleInfoRef.current.open();
    const handleFormChenge = ({name, value}) => {
      // const _data = {
      //   ...diseaseData,
      //   [name]: value,
      // };

      let unitt = JSON.stringify(diseaseData, [
          'areatype','area','scale','lengthText','widthText','heightText','memberLength','memberWidth',
        'memberHeight','disLength','disWidth','disHeight','hzbrmc_length_m','hzbrmc_length_cm','hzbrmc_length_mm','hzbrmc_width_m',
        'hzbrmc_width_cm','hzbrmc_width_mm','hzbrmc_height_m','hzbrmc_height_cm','hzbrmc_height_mm',
        'hzbrmc_area_face','hzbrmc_area_per','hzbrmc_area_m','hzbrmc_area_cm','hzbrmc_area_mm',
        'hzbrmc_heightdiff_cm','hzbrmc_heightdiff_mm','hzbrmc_spacing_cm','hzbrmc_deformation_mm',
        'hzbrmc_num','hzbrmc_range_cm','hzbrmc_range_mm','hzbrmc_depth_cm','hzbrmc_depth_mm',
        'hzbrmc_volume_m','hzbrmc_volume_cm','hzbrmc_disp_cm','hzbrmc_disp_mm','hzbrmc_angle_c',
        'hzbrmc_chu','hzbrmc_tiao','hzbrmc_range_fenbu_m','hzbrmc_range_length_m','hzbrmc_range_width_mm',
        'hzbrmc_range_spacing_cm','hzbrmc_lb_left_length_m','hzbrmc_lb_bottom_length_m','hzbrmc_lb_right_length_m',
        'hzbrmc_lb_left_width_mm','hzbrmc_lb_bottom_width_mm','hzbrmc_lb_right_width_mm','hzbrmc_slant_m'])
      // console.log(unitt);
      let unit = JSON.parse(unitt)
      diseaseData['unit'] = unit
      // const {area,areatype,scale,hzbrmc_length_m,hzbrmc_length_cm,hzbrmc_length_mm,hzbrmc_width_m,hzbrmc_width_cm,
      //   hzbrmc_width_mm,hzbrmc_height_m,hzbrmc_height_cm,hzbrmc_height_mm,hzbrmc_area_face,hzbrmc_area_per,
      //   hzbrmc_area_m,hzbrmc_area_cm,hzbrmc_area_mm,hzbrmc_heightdiff_cm,hzbrmc_heightdiff_mm,hzbrmc_spacing_cm,
      //   hzbrmc_deformation_mm,hzbrmc_num,hzbrmc_range_cm,hzbrmc_range_mm,hzbrmc_depth_cm,hzbrmc_depth_mm,
      //   hzbrmc_volume_m,hzbrmc_volume_cm,hzbrmc_disp_cm,hzbrmc_disp_mm,hzbrmc_angle_c,hzbrmc_chu,hzbrmc_tiao,
      //   hzbrmc_range_fenbu_m,hzbrmc_range_length_m,hzbrmc_range_width_mm,hzbrmc_range_spacing_cm,hzbrmc_lb_left_length_m,
      //   hzbrmc_lb_bottom_length_m,hzbrmc_lb_right_length_m,hzbrmc_lb_left_width_mm,hzbrmc_lb_bottom_width_mm,
      //   hzbrmc_lb_right_width_mm,hzbrmc_slant_m,lengthText,widthText,heightText,memberLength,memberWidth,
      //   memberHeight,disLength,disWidth,disHeight,...rest} = diseaseData
      const _data = {
        ...diseaseData,
        [name]: value,
      };

      if (name === 'checktypeid') {
        const _type = route.params.type.list.find(
          item => value === item.checktypeid,
        );
        let defaultScaleVal = '';
        if (_type) {
          defaultScaleVal = _type?.standardscale;
        }
        _data.scale = defaultScaleVal;
        const {basestandardtable, infoComponents} = baseData;
        const standardid =
          infoComponents.find(({checktypeid}) => value === checktypeid)
            ?.standardid || '';
        if (standardid) {
          const _standardscale = basestandardtable.find(
            item => standardid === item.standardid,
          )?.standardscale;
          if (_standardscale) {
            _data.standard = {
              scale: _standardscale,
              id: standardid,
            };
          } else {
            const defaultScale = basestandardtable.find(
              item => item.standardid === 'JTG-TH21-2011-T000-0',
            )?.standardscale;
            _data.standard = {
              scale: defaultScale,
              id: 'JTG-TH21-2011-T000-0',
            };
          }
        }
        _data.scale = _data.scale || '';
      }


      if (value) {
        // 向病害描述函数里传入
        writeDesText(name, value)
      }

      if (name == 'scale') {
        // 标度
        let biaodu = ',标度' + value + '@@'
        setBiaodu(biaodu)
      } else if (name == 'hzbrmc_length_m') {
        //长度 - 米
        // let lengthM = ',长度' + value + '@@米@@'
        // setLengthM(lengthM)
        if (value == '' || value == 0) {
          let lengthM = ''
          setLengthM(lengthM)
        } else {
          let lengthM = ',长度' + value + '@@米@@'
          setLengthM(lengthM)
        }
      } else if (name == 'hzbrmc_length_cm') {
        // 长度 - 厘米
        // let lengthCM = ',长度' + value + '@@厘米@@'
        // setLengthCM(lengthCM)
        if (value == '' || value == 0) {
          let lengthCM = ''
          setLengthCM(lengthCM)
        } else {
          let lengthCM = ',长度' + value + '@@厘米@@'
          setLengthCM(lengthCM)
        }
      } else if (name == 'hzbrmc_length_mm') {
        // 长度 - 毫米
        // let lengthMM = ',长度' + value + '@@毫米@@'
        // setLengthMM(lengthMM)
        if (value == '' || value == 0) {
          let lengthMM = ''
          setLengthMM(lengthMM)
        } else {
          let lengthMM = ',长度' + value + '@@毫米@@'
          setLengthMM(lengthMM)
        }
      } else if (name == 'hzbrmc_width_m') {
        // 宽度 - 米
        // let widthM = ',宽度' + value + '@@米@@'
        // setWidthM(widthM)
        if (value == '' || value == 0) {
          let widthM = ''
          setWidthM(widthM)
        } else {
          let widthM = ',宽度' + value + '@@米@@'
          setWidthM(widthM)
        }
      } else if (name == 'hzbrmc_width_cm') {
        // 宽度 - 厘米
        // let widthCM = ',宽度' + value + '@@厘米@@'
        // setWidthCM(widthCM)
        if (value == '' || value == 0) {
          let widthCM = ''
          setWidthCM(widthCM)
        } else {
          let widthCM = ',宽度' + value + '@@厘米@@'
          setWidthCM(widthCM)
        }
      } else if (name == 'hzbrmc_width_mm') {
        // 宽度 - 毫米
        if (value == '' || value == 0) {
          let widthMM = ''
          setWidthMM(widthMM)
        } else {
          let widthMM = ',宽度' + value + '@@毫米@@'
          setWidthMM(widthMM)
        }
      } else if (name == 'hzbrmc_height_m') {
        // 高度 - 米
        // let heightM = ',高度' + value + '@@米@@'
        // setHeightM(heightM)
        if (value == '' || value == 0) {
          let heightM = ''
          setHeightM(heightM)
        } else {
          let heightM = ',高度' + value + '@@米@@'
          setHeightM(heightM)
        }
      } else if (name == 'hzbrmc_height_cm') {
        // 高度 - 厘米
        if (value == '' || value == 0) {
          let heightCM = ''
          setHeightCM(heightCM)
        } else {
          let heightCM = ',高度' + value + '@@厘米@@'
          setHeightCM(heightCM)
        }
      } else if (name == 'hzbrmc_height_mm') {
        // 高度 - 毫米
        // let heightMM = ',高度' + value + '@@毫米@@'
        // setHeightMM(heightMM)
        if (value == '' || value == 0) {
          let heightMM = ''
          setHeightMM(heightMM)
        } else {
          let heightMM = ',高度' + value + '@@毫米@@'
          setHeightMM(heightMM)
        }
      } else if (name == 'hzbrmc_area_face') {
        // 面域 - %
        // let areaFace = ',面域' + value + '@@%@@'
        // setAreaFace(areaFace)
        if (value == '' || value == 0) {
          let areaFace = ''
          setAreaFace(areaFace)
        } else {
          let areaFace = ',面域' + value + '@@%@@'
          setAreaFace(areaFace)
        }
      } else if (name == 'hzbrmc_area_per') {
        // 面积占比 - %
        // let areaPer = ',面积占比' + value + '@@%@@'
        // setAreaPer(areaPer)
        if (value == '' || value == 0) {
          let areaPer = ''
          setAreaPer(areaPer)
        } else {
          let areaPer = ',面积占比' + value + '@@%@@'
          setAreaPer(areaPer)
        }
      } else if (name == 'hzbrmc_area_m') {
        // 面积 - 平方米
        // let areaM = ',面积' + value + '@@平方米@@'
        // setAreaM(areaM)
        if (value == '' || value == 0) {
          let areaM = ''
          setAreaM(areaM)
        } else {
          let areaM = ',面积' + value + '@@平方米@@'
          setAreaM(areaM)
        }
      } else if (name == 'hzbrmc_area_cm') {
        // 面积 - 平方厘米
        // let areaCM = ',面积' + value + '@@平方厘米@@'
        // setAreaCM(areaCM)
        if (value == '' || value == 0) {
          let areaCM = ''
          setAreaCM(areaCM)
        } else {
          let areaCM = ',面积' + value + '@@平方厘米@@'
          setAreaCM(areaCM)
        }
      } else if (name == 'hzbrmc_area_mm') {
        // 面积 - 平方毫米
        // let areaMM = ',面积' + value + '@@平方毫米@@'
        // setAreaMM(areaMM)
        if (value == '' || value == 0) {
          let areaMM = ''
          setAreaMM(areaMM)
        } else {
          let areaMM = ',面积' + value + '@@平方毫米@@'
          setAreaMM(areaMM)
        }
      } else if (name == 'hzbrmc_heightdiff_cm') {
        // 高差 - 厘米
        // let heightDiffCM = ',高差' + value + '@@厘米@@'
        // setHeightDiffCM(heightDiffCM)
        if (value == '' || value == 0) {
          let heightDiffCM = ''
          setHeightDiffCM(heightDiffCM)
        } else {
          let heightDiffCM = ',高差' + value + '@@厘米@@'
          setHeightDiffCM(heightDiffCM)
        }
      } else if (name == 'hzbrmc_heightdiff_mm') {
        // 高差 - 毫米
        // let heightDiffMM = ',高差' + value + '@@毫米@@'
        // setHeightDiffMM(heightDiffMM)
        if (value == '' || value == 0) {
          let heightDiffMM = ''
          setHeightDiffMM(heightDiffMM)
        } else {
          let heightDiffMM = ',高差' + value + '@@毫米@@'
          setHeightDiffMM(heightDiffMM)
        }
      } else if (name == 'hzbrmc_spacing_cm') {
        // 间距 - 厘米
        // let spacingCM = ',间距' + value + '@@厘米@@'
        // setSpacingCM(spacingCM)
        if (value == '' || value == 0) {
          let spacingCM = ',间距' + value + '@@厘米@@'
          setSpacingCM(spacingCM)
        } else {
          let spacingCM = ',间距' + value + '@@厘米@@'
          setSpacingCM(spacingCM)
        }
      } else if (name == 'hzbrmc_deformation_mm') {
        // 变形 - 毫米
        // let deformationMM = ',变形' + value + '@@毫米@@'
        // setDeformationMM(deformationMM)
        if (value == '' || value == 0) {
          let deformationMM = ''
          setDeformationMM(deformationMM)
        } else {
          let deformationMM = ',变形' + value + '@@毫米@@'
          setDeformationMM(deformationMM)
        }
      } else if (name == 'hzbrmc_num') {
        // 个数 - 个
        // let num = ',个数' + value + '@@个@@'
        // setNum(num)
        if (value == '' || value == 0) {
          let num = ''
          setNum(num)
        } else {
          let num = ',个数' + value + '@@个@@'
          setNum(num)
        }
      } else if (name == 'hzbrmc_range_cm') {
        // 距离 - 厘米
        // let rangeCM = ',距离' + value + '@@厘米@@'
        // setRangeCM(rangeCM)
        if (value == '' || value == 0) {
          let rangeCM = ''
          setRangeCM(rangeCM)
        } else {
          let rangeCM = ',距离' + value + '@@厘米@@'
          setRangeCM(rangeCM)
        }
      } else if (name == 'hzbrmc_range_mm') {
        // 距离 - 毫米
        // let rangeMM = ',距离' + value + '@@毫米@@'
        // setRangeMM(rangeMM)
        if (value == '' || value == 0) {
          let rangeMM = ''
          setRangeMM(rangeMM)
        } else {
          let rangeMM = ',距离' + value + '@@毫米@@'
          setRangeMM(rangeMM)
        }
      } else if (name == 'hzbrmc_depth_cm') {
        // 深度 - 厘米
        // let depthCM = ',深度' + value + '@@厘米@@'
        // setDepthCM(depthCM)
        if (value == '' || value == 0) {
          let depthCM = ''
          setDepthCM(depthCM)
        } else {
          let depthCM = ',深度' + value + '@@厘米@@'
          setDepthCM(depthCM)
        }
      } else if (name == 'hzbrmc_depth_mm') {
        // 深度 - 毫米
        // let depthMM = ',深度' + value + '@@毫米@@'
        // setDepthMM(depthMM)
        if (value == '' || value == 0) {
          let depthMM = ''
          setDepthMM(depthMM)
        } else {
          let depthMM = ',深度' + value + '@@毫米@@'
          setDepthMM(depthMM)
        }
      } else if (name == 'hzbrmc_volume_m') {
        // 体积 - 立方米
        // let volumeM = ',体积' + value + '@@立方米@@'
        // setVolumeM(volumeM)
        if (value == '' || value == 0) {
          let volumeM = ''
          setVolumeM(volumeM)
        } else {
          let volumeM = ',体积' + value + '@@立方米@@'
          setVolumeM(volumeM)
        }
      } else if (name == 'hzbrmc_volume_cm') {
        // 体积 - 立方厘米
        // let volumeCM = ',体积' + value + '@@立方厘米@@'
        // setVolumeCM(volumeCM)
        if (value == '' || value == 0) {
          let volumeCM = ''
          setVolumeCM(volumeCM)
        } else {
          let volumeCM = ',体积' + value + '@@立方厘米@@'
          setVolumeCM(volumeCM)
        }
      } else if (name == 'hzbrmc_disp_cm') {
        // 位移 - 厘米
        // let dispCM = ',位移' + value + '@@厘米@@'
        // setDispCM(dispCM)
        if (value == '' || value == 0) {
          let dispCM = ''
          setDispCM(dispCM)
        } else {
          let dispCM = ',位移' + value + '@@厘米@@'
          setDispCM(dispCM)
        }
      } else if (name == 'hzbrmc_disp_mm') {
        // 位移 - 毫米
        // let dispMM = ',位移' + value + '@@毫米@@'
        // setDispMM(dispMM)
        if (value == '' || value == 0) {
          let dispMM = ''
          setDispMM(dispMM)
        } else {
          let dispMM = ',位移' + value + '@@毫米@@'
          setDispMM(dispMM)
        }
      } else if (name == 'hzbrmc_angle_c') {
        // 角度 - 度
        // let angle = ',角度' + value + '@@度@@'
        // setAngle(angle)
        if (value == '' || value == 0) {
          let angle = ''
          setAngle(angle)
        } else {
          let angle = ',角度' + value + '@@度@@'
          setAngle(angle)
        }
      } else if (name == 'hzbrmc_chu') {
        // 处
        // let chu = ',' + value + '@@处@@'
        // setChu(chu)
        if (value == '' || value == 0) {
          let chu = ''
          setChu(chu)
        } else {
          let chu = ',' + value + '@@处@@'
          setChu(chu)
        }
      } else if (name == 'hzbrmc_tiao') {
        // 条
        // let tiao = ',' + value + '@@条@@'
        // setTiao(tiao)
        if (value == '' || value == 0) {
          let tiao = ''
          setTiao(tiao)
        } else {
          let tiao = ',' + value + '@@条@@'
          setTiao(tiao)
        }
      } else if (name == 'hzbrmc_range_fenbu_m') {
        // 分布范围 - 米
        // let rangeFenbuM = ',分布范围' + value + '@@米@@'
        // setRangeFenbuM(rangeFenbuM)
        if (value == '' || value == 0) {
          let rangeFenbuM = ''
          setRangeFenbuM(rangeFenbuM)
        } else {
          let rangeFenbuM = ',分布范围' + value + '@@米@@'
          setRangeFenbuM(rangeFenbuM)
        }
      } else if (name == 'hzbrmc_range_length_m') {
        // 长度范围 - 米
        // let rangeLengthM = ',长度范围' + value + '@@米@@'
        // setRangeLengthM(rangeLengthM)
        if (value == '' || value == 0) {
          let rangeLengthM = ''
          setRangeLengthM(rangeLengthM)
        } else {
          let rangeLengthM = ',长度范围' + value + '@@米@@'
          setRangeLengthM(rangeLengthM)
        }
      } else if (name == 'hzbrmc_range_width_mm') {
        // 宽度范围 - 毫米
        // let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
        // setRangeWidthMM(rangeWidthMM)
        if (value == '' || value == 0) {
          let rangeWidthMM = ''
          setRangeWidthMM(rangeWidthMM)
        } else {
          let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
          setRangeWidthMM(rangeWidthMM)
        }
      } else if (name == 'hzbrmc_range_spacing_cm') {
        // 间距范围 - 厘米
        // let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
        // setRangeSpacingCM(rangeSpacingCM)
        if (value == '' || value == 0) {
          let rangeSpacingCM = ''
          setRangeSpacingCM(rangeSpacingCM)
        } else {
          let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
          setRangeSpacingCM(rangeSpacingCM)
        }
      } else if (name == 'hzbrmc_lb_left_length_m') {
        // 左腹板长度 - 米
        // let leftLengthM = ',左腹板长度' + value + '@@米@@'
        // setLeftLengthM(leftLengthM)
        if (value == '' || value == 0) {
          let leftLengthM = ''
          setLeftLengthM(leftLengthM)
        } else {
          let leftLengthM = ',左腹板长度' + value + '@@米@@'
          setLeftLengthM(leftLengthM)
        }
      } else if (name == 'hzbrmc_lb_bottom_length_m') {
        // 底板长度 - 米
        // let bottomLengthM = ',底板长度' + value + '@@米@@'
        // setBottomLengthM(bottomLengthM)
        if (value == '' || value == 0) {
          let bottomLengthM = ''
          setBottomLengthM(bottomLengthM)
        } else {
          let bottomLengthM = ',底板长度' + value + '@@米@@'
          setBottomLengthM(bottomLengthM)
        }
      } else if (name == 'hzbrmc_lb_right_length_m') {
        // 右腹板长度 - 米
        // let rightLengthM = ',右腹板长度' + value + '@@米@@'
        // setRightLengthM(rightLengthM)
        if (value == '' || value == 0) {
          let rightLengthM = ''
          setRightLengthM(rightLengthM)
        } else {
          let rightLengthM = ',右腹板长度' + value + '@@米@@'
          setRightLengthM(rightLengthM)
        }
      } else if (name == 'hzbrmc_lb_left_width_mm') {
        // 左腹板宽度 - 毫米
        // let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
        // setLeftWidthMM(leftWidthMM)
        if (value == '' || value == 0) {
          let leftWidthMM = ''
          setLeftWidthMM(leftWidthMM)
        } else {
          let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
          setLeftWidthMM(leftWidthMM)
        }
      } else if (name == 'hzbrmc_lb_bottom_width_mm') {
        // 底板宽度 - 毫米
        // let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
        // setBottomWidthMM(bottomWidthMM)
        if (value == '' || value == 0) {
          let bottomWidthMM = ''
          setBottomWidthMM(bottomWidthMM)
        } else {
          let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
          setBottomWidthMM(bottomWidthMM)
        }
      } else if (name == 'hzbrmc_lb_right_width_mm') {
        // 右腹板宽度 - 毫米
        // let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
        // setRightWidthMM(rightWidthMM)
        if (value == '' || value == 0) {
          let rightWidthMM = ''
          setRightWidthMM(rightWidthMM)
        } else {
          let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
          setRightWidthMM(rightWidthMM)
        }
      } else if (name == 'hzbrmc_slant_m') {
        // 倾斜量 - 米
        // let slantM = ',倾斜量' + value + '@@米@@'
        // setSlantM(slantM)
        if (value == '' || value == 0) {
          let slantM = ''
          setSlantM(slantM)
        } else {
          let slantM = ',倾斜量' + value + '@@米@@'
          setSlantM(slantM)
        }
      }
      setDiseaseData(_data);
    };

    const [writeDesTextValue, setWriteDesTextValue] = useState('')

    // 填入病害描述内容
    const writeDesText = (name, value) => {
      // let writeTxt = []
      console.log('writeDesText', name, value);
      setWriteDesTextValue(value)

      if (true) {
        if (diseaseData.scale !== '' && diseaseData.scale !== '0' && diseaseData.scale !== '') {
          var biaodu = ',标度' + diseaseData.scale + '@@'
          setBiaodu(biaodu)
        } else {
          var biaodu = ''
          setBiaodu(biaodu)
        }
        if (diseaseData.hzbrmc_length_m !== undefined && diseaseData.hzbrmc_length_m !== '0' && diseaseData.hzbrmc_length_m !== '') {
          var lengthM = ',长度' + diseaseData.hzbrmc_length_m + '@@米@@'
          setLengthM(lengthM)
        } else {
          var lengthM = ''
          setLengthM(lengthM)
        }
        if (diseaseData.hzbrmc_length_cm !== undefined && diseaseData.hzbrmc_length_cm !== '0' && diseaseData.hzbrmc_length_cm !== '') {
          var lengthCM = ',长度' + diseaseData.hzbrmc_length_cm + '@@厘米@@'
          setLengthCM(lengthCM)
        } else {
          var lengthCM = ''
          setLengthCM(lengthCM)
        }
        if (diseaseData.hzbrmc_length_mm !== undefined && diseaseData.hzbrmc_length_mm !== '0' && diseaseData.hzbrmc_length_mm !== '') {
          var lengthMM = ',长度' + diseaseData.hzbrmc_length_mm + '@@毫米@@'
          setLengthMM(lengthMM)
        } else {
          var lengthMM = ''
          setLengthMM(lengthMM)
        }
        if (diseaseData.hzbrmc_width_m !== undefined && diseaseData.hzbrmc_width_m !== '0' && diseaseData.hzbrmc_width_m !== '') {
          var widthM = ',宽度' + diseaseData.hzbrmc_width_m + '@@米@@'
          setWidthM(widthM)
        } else {
          var widthM = ''
          setWidthM(widthM)
        }
        if (diseaseData.hzbrmc_width_cm !== undefined && diseaseData.hzbrmc_width_cm !== '0' && diseaseData.hzbrmc_width_cm !== '') {
          var widthCM = ',宽度' + diseaseData.hzbrmc_width_cm + '@@厘米@@'
          setWidthCM(widthCM)
        } else {
          var widthCM = ''
          setWidthCM(widthCM)
        }
        if (diseaseData.hzbrmc_width_mm !== undefined && diseaseData.hzbrmc_width_mm !== '0' && diseaseData.hzbrmc_width_mm !== '') {
          console.log('diseaseData.hzbrmc_width_mm',diseaseData.hzbrmc_width_mm == '');
          var widthMM = ',宽度' + diseaseData.hzbrmc_width_mm + '@@毫米@@'
          setWidthMM(widthMM)
        } else {
          // diseaseData.hzbrmc_width_mm == undefined || diseaseData.hzbrmc_width_mm == 0 || diseaseData.hzbrmc_width_mm == ''
          var widthMM = ''
          setWidthMM(widthMM)
        }
        if (diseaseData.hzbrmc_height_m !== undefined && diseaseData.hzbrmc_height_m !== '0' && diseaseData.hzbrmc_height_m !== '') {
          var heightM = ',高度' + diseaseData.hzbrmc_height_m + '@@米@@'
          setHeightM(heightM)
        } else {
          var heightM = ''
          setHeightM(heightM)
        }
        if (diseaseData.hzbrmc_height_cm !== undefined && diseaseData.hzbrmc_height_cm !== '0' && diseaseData.hzbrmc_height_cm !== '') {
          var heightCM = ',高度' + diseaseData.hzbrmc_height_cm + '@@厘米@@'
          setHeightCM(heightCM)
        } else {
          var heightCM = ''
          setHeightCM(heightCM)
        }
        if (diseaseData.hzbrmc_height_mm !== undefined && diseaseData.hzbrmc_height_mm !== '0' && diseaseData.hzbrmc_height_mm !== '') {
          var heightMM = ',高度' + diseaseData.hzbrmc_height_mm + '@@毫米@@'
          setHeightMM(heightMM)
        } else {
          var heightMM = ''
          setHeightMM(heightMM)
        }
        if (diseaseData.hzbrmc_area_face !== undefined && diseaseData.hzbrmc_area_face !== '0' && diseaseData.hzbrmc_area_face !== '') {
          var areaFace = ',面域' + diseaseData.hzbrmc_area_face + '@@%@@'
          setAreaFace(areaFace)
        } else {
          var areaFace = ''
          setAreaFace(areaFace)
        }
        if (diseaseData.hzbrmc_area_per !== undefined && diseaseData.hzbrmc_area_per !== '0' && diseaseData.hzbrmc_area_per !== '') {
          var areaPer = ',面积占比' + diseaseData.hzbrmc_area_per + '@@%@@'
          setAreaPer(areaPer)
        } else {
          var areaPer = ''
          setAreaPer(areaPer)
        }
        if (diseaseData.hzbrmc_area_m !== undefined && diseaseData.hzbrmc_area_m !== '0' && diseaseData.hzbrmc_area_m !== '') {
          var areaM = ',面积' + diseaseData.hzbrmc_area_m + '@@平方米@@'
          setAreaM(areaM)
        } else {
          var areaM = ''
          setAreaM(areaM)
        }
        if (diseaseData.hzbrmc_area_cm !== undefined && diseaseData.hzbrmc_area_cm !== '0' && diseaseData.hzbrmc_area_cm !== '') {
          var areaCM = ',面积' + diseaseData.hzbrmc_area_cm + '@@平方厘米@@'
          setAreaCM(areaCM)
        } else {
          var areaCM = ''
          setAreaCM(areaCM)
        }
        if (diseaseData.hzbrmc_area_mm !== undefined && diseaseData.hzbrmc_area_mm !== '0' && diseaseData.hzbrmc_area_mm !== '') {
          var areaMM = ',面积' + diseaseData.hzbrmc_area_mm + '@@平方毫米@@'
          setAreaMM(areaMM)
        } else {
          var areaMM = ''
          setAreaMM(areaMM)
        }
        if (diseaseData.hzbrmc_heightdiff_cm !== undefined && diseaseData.hzbrmc_heightdiff_cm !== '0' && diseaseData.hzbrmc_heightdiff_cm !== '') {
          var heightDiffCM = ',高差' + diseaseData.hzbrmc_heightdiff_cm + '@@厘米@@'
          setHeightDiffCM(heightDiffCM)
        } else {
          var heightDiffCM = ''
          setHeightDiffCM(heightDiffCM)
        }
        if (diseaseData.hzbrmc_heightdiff_mm !== undefined && diseaseData.hzbrmc_heightdiff_mm !== '0' && diseaseData.hzbrmc_heightdiff_mm !== '') {
          var heightDiffMM = ',高差' + diseaseData.hzbrmc_heightdiff_mm + '@@毫米@@'
          setHeightDiffMM(heightDiffMM)
        } else {
          var heightDiffMM = ''
          setHeightDiffMM(heightDiffMM)
        }
        if (diseaseData.hzbrmc_spacing_cm !== undefined && diseaseData.hzbrmc_spacing_cm !== '0' && diseaseData.hzbrmc_spacing_cm !== '') {
          var spacingCM = ',间距' + diseaseData.hzbrmc_spacing_cm + '@@厘米@@'
          setSpacingCM(spacingCM)
        } else {
          var spacingCM = ''
          setSpacingCM(spacingCM)
        }
        if (diseaseData.hzbrmc_deformation_mm !== undefined && diseaseData.hzbrmc_deformation_mm !== '0' && diseaseData.hzbrmc_deformation_mm !== '') {
          var deformationMM = ',变形' + diseaseData.hzbrmc_deformation_mm + '@@毫米@@'
          setDeformationMM(deformationMM)
        } else {
          var deformationMM = ''
          setDeformationMM(deformationMM)
        }
        if (diseaseData.hzbrmc_num !== undefined && diseaseData.hzbrmc_num !== '0' && diseaseData.hzbrmc_num !== '') {
          var num = ',个数' + diseaseData.hzbrmc_num + '@@个@@'
          setNum(num)
        } else {
          var num = ''
          setNum(num)
        }
        if (diseaseData.hzbrmc_range_cm !== undefined && diseaseData.hzbrmc_range_cm !== '0' && diseaseData.hzbrmc_range_cm !== '') {
          var rangeCM = ',距离' + diseaseData.hzbrmc_range_cm + '@@厘米@@'
          setRangeCM(rangeCM)
        } else {
          var rangeCM = ''
          setRangeCM(rangeCM)
        }
        if (diseaseData.hzbrmc_range_mm !== undefined && diseaseData.hzbrmc_range_mm !== '0' && diseaseData.hzbrmc_range_mm !== '') {
          var rangeMM = ',距离' + diseaseData.hzbrmc_range_mm + '@@毫米@@'
          setRangeMM(rangeMM)
        } else {
          var rangeMM = ''
          setRangeMM(rangeMM)
        }
        if (diseaseData.hzbrmc_depth_cm !== undefined && diseaseData.hzbrmc_depth_cm !== '0' && diseaseData.hzbrmc_depth_cm !== '') {
          var depthCM = ',深度' + diseaseData.hzbrmc_depth_cm + '@@厘米@@'
          setDepthCM(depthCM)
        } else {
          var depthCM = ''
          setDepthCM(depthCM)
        }
        if (diseaseData.hzbrmc_depth_mm !== undefined && diseaseData.hzbrmc_depth_mm !== '0' && diseaseData.hzbrmc_depth_mm !== '') {
          var depthMM = ',深度' + diseaseData.hzbrmc_depth_mm + '@@毫米@@'
          setDepthMM(depthMM)
        } else {
          var depthMM = ''
          setDepthMM(depthMM)
        }
        if (diseaseData.hzbrmc_volume_m !== undefined && diseaseData.hzbrmc_volume_m !== '0' && diseaseData.hzbrmc_volume_m !== '') {
          var volumeM = ',体积' + diseaseData.hzbrmc_volume_m + '@@立方米@@'
          setVolumeM(volumeM)
        } else {
          var volumeM = ''
          setVolumeM(volumeM)
        }
        if (diseaseData.hzbrmc_volume_cm !== undefined && diseaseData.hzbrmc_volume_cm !== '0' && diseaseData.hzbrmc_volume_cm !== '') {
          var volumeCM = ',体积' + diseaseData.hzbrmc_volume_cm + '@@立方厘米@@'
          setVolumeCM(volumeCM)
        } else {
          var volumeCM = ''
          setVolumeCM(volumeCM)
        }
        if (diseaseData.hzbrmc_disp_cm !== undefined && diseaseData.hzbrmc_disp_cm !== '0' && diseaseData.hzbrmc_disp_cm !== '') {
          var dispCM = ',位移' + diseaseData.hzbrmc_disp_cm + '@@厘米@@'
          setDispCM(dispCM)
        } else {
          var dispCM = ''
          setDispCM(dispCM)
        }
        if (diseaseData.hzbrmc_disp_mm !== undefined && diseaseData.hzbrmc_disp_mm !== '0' && diseaseData.hzbrmc_disp_mm !== '') {
          var dispMM = ',位移' + diseaseData.hzbrmc_disp_mm + '@@毫米@@'
          setDispMM(dispMM)
        } else {
          var dispMM = ''
          setDispMM(dispMM)
        }
        if (diseaseData.hzbrmc_angle_c !== undefined && diseaseData.hzbrmc_angle_c !== '0' && diseaseData.hzbrmc_angle_c !== '') {
          var angle = ',角度' + diseaseData.hzbrmc_angle_c + '@@度@@'
          setAngle(angle)
        } else {
          var angle = ''
          setAngle(angle)
        }
        if (diseaseData.hzbrmc_chu !== undefined && diseaseData.hzbrmc_chu !== '0' && diseaseData.hzbrmc_chu !== '') {
          var chu = ',' + diseaseData.hzbrmc_chu + '@@处@@'
          setChu(chu)
        } else {
          var chu = ''
          setChu(chu)
        }
        if (diseaseData.hzbrmc_tiao !== undefined && diseaseData.hzbrmc_tiao !== '0' && diseaseData.hzbrmc_tiao !== '') {
          var tiao = ',' + diseaseData.hzbrmc_tiao + '@@条@@'
          setTiao(tiao)
        } else {
          var tiao = ''
          setTiao(tiao)
        }
        if (diseaseData.hzbrmc_range_fenbu_m !== undefined && diseaseData.hzbrmc_range_fenbu_m !== '0' && diseaseData.hzbrmc_range_fenbu_m !== '') {
          var rangeFenbuM = ',分布范围' + diseaseData.hzbrmc_range_fenbu_m + '@@米@@'
          setRangeFenbuM(rangeFenbuM)
        } else {
          var rangeFenbuM = ''
          setRangeFenbuM(rangeFenbuM)
        }
        if (diseaseData.hzbrmc_range_length_m !== undefined && diseaseData.hzbrmc_range_length_m !== '0' && diseaseData.hzbrmc_range_length_m !== '') {
          var rangeLengthM = ',长度范围' + diseaseData.hzbrmc_range_length_m + '@@米@@'
          setRangeLengthM(rangeLengthM)
        } else {
          var rangeLengthM = ''
          setRangeLengthM(rangeLengthM)
        }
        if (diseaseData.hzbrmc_range_width_mm !== undefined && diseaseData.hzbrmc_range_width_mm !== '0' && diseaseData.hzbrmc_range_width_mm !== '') {
          var rangeWidthMM = ',宽度范围'+ diseaseData.hzbrmc_range_width_mm + '@@毫米@@'
          setRangeWidthMM(rangeWidthMM)
        } else {
          var rangeWidthMM = ''
          setRangeWidthMM(rangeWidthMM)
        }
        if (diseaseData.hzbrmc_range_spacing_cm !== undefined && diseaseData.hzbrmc_range_spacing_cm !== '0' && diseaseData.hzbrmc_range_spacing_cm !== '') {
          var rangeSpacingCM = ',间距范围' + diseaseData.hzbrmc_range_spacing_cm + '@@厘米@@'
          setRangeSpacingCM(rangeSpacingCM)
        } else {
          var rangeSpacingCM = ''
          setRangeSpacingCM(rangeSpacingCM)
        }
        if (diseaseData.hzbrmc_lb_left_length_m !== undefined && diseaseData.hzbrmc_lb_left_length_m !== '0' && diseaseData.hzbrmc_lb_left_length_m !== '') {
          var leftLengthM = ',左腹板长度' + diseaseData.hzbrmc_lb_left_length_m + '@@米@@'
          setLeftLengthM(leftLengthM)
        } else {
          var leftLengthM = ''
          setLeftLengthM(leftLengthM)
        }
        if (diseaseData.hzbrmc_lb_bottom_length_m !== undefined && diseaseData.hzbrmc_lb_bottom_length_m !== '0' && diseaseData.hzbrmc_lb_bottom_length_m !== '') {
          var bottomLengthM = ',底板长度' + diseaseData.hzbrmc_lb_bottom_length_m + '@@米@@'
          setBottomLengthM(bottomLengthM)
        } else {
          var bottomLengthM = ''
          setBottomLengthM(bottomLengthM)
        }
        if (diseaseData.hzbrmc_lb_right_length_m !== undefined && diseaseData.hzbrmc_lb_right_length_m !== '0' && diseaseData.hzbrmc_lb_right_length_m !== '') {
          var rightLengthM = ',右腹板长度' + diseaseData.hzbrmc_lb_right_length_m + '@@米@@'
          setRightLengthM(rightLengthM)
        } else {
          var rightLengthM = ''
          setRightLengthM(rightLengthM)
        }
        if (diseaseData.hzbrmc_lb_left_width_mm !== undefined && diseaseData.hzbrmc_lb_left_width_mm !== '0' && diseaseData.hzbrmc_lb_left_width_mm !== '') {
          var leftWidthMM = ',左腹板宽度' + diseaseData.hzbrmc_lb_left_width_mm + '@@毫米@@'
          setLeftWidthMM(leftWidthMM)
        } else {
          var leftWidthMM = ''
          setLeftWidthMM(leftWidthMM)
        }
        if (diseaseData.hzbrmc_lb_bottom_width_mm !== undefined && diseaseData.hzbrmc_lb_bottom_width_mm !== '0' && diseaseData.hzbrmc_lb_bottom_width_mm !== '') {
          var bottomWidthMM = ',底板宽度' + diseaseData.hzbrmc_lb_bottom_width_mm + '@@毫米@@'
          setBottomWidthMM(bottomWidthMM)
        } else {
          var bottomWidthMM = ''
          setBottomWidthMM(bottomWidthMM)
        }
        if (diseaseData.hzbrmc_lb_right_width_mm !== undefined && diseaseData.hzbrmc_lb_right_width_mm !== '0' && diseaseData.hzbrmc_lb_right_width_mm !== '') {
          var rightWidthMM = ',右腹板宽度' + diseaseData.hzbrmc_lb_right_width_mm + '@@毫米@@'
          setRightWidthMM(rightWidthMM)
        } else {
          var rightWidthMM = ''
          setRightWidthMM(rightWidthMM)
        }
        if (diseaseData.hzbrmc_slant_m !== undefined && diseaseData.hzbrmc_slant_m !== '0' && diseaseData.hzbrmc_slant_m !== '') {
          var slantM = ',倾斜量' + diseaseData.hzbrmc_slant_m + '@@米@@'
          setSlantM(slantM)
        } else {
          var slantM = ''
          setSlantM(slantM)
        }
      }

      if (writeDesTextValue == '' || writeDesTextValue == undefined) {
        console.log('没有修改数据');
        if (diseaseData.description == '' || diseaseData.description == undefined) {
          diseaseData['description'] = itemData.diseaseName
        } else if (diseaseData.description !== '' || diseaseData.description !== undefined) {
          let writeTxt = lengthM + lengthCM + lengthMM + widthM + widthCM
                  + widthMM + heightM + heightCM + heightMM + areaFace
                  + areaPer + areaM + areaCM + areaMM + heightDiffCM + heightDiffMM
                  + spacingCM + deformationMM + num + rangeCM + rangeMM + depthCM
                  + depthMM + volumeM + volumeCM + dispCM + dispMM + angle + chu
                  + tiao + rangeFenbuM + rangeLengthM + rangeWidthMM + rangeSpacingCM
                  + leftLengthM + bottomLengthM + rightLengthM + leftWidthMM
                  + bottomWidthMM + rightWidthMM + slantM
          // let writeTxt = diseaseData.hzbrmc_length_m
          setWriteTxt(writeTxt)
          // console.log('writeTxt', writeTxt);
          // console.log('病害名称',itemData.diseaseName);
          let binghai = itemData.diseaseName
          let allText = binghai.concat(writeTxt)
          console.log('allText', allText);
          diseaseData['description'] = allText
          handleFormChenge(allText, diseaseData.description)
        }
      } else {
        let writeTxt = lengthM + lengthCM + lengthMM + widthM + widthCM
                  + widthMM + heightM + heightCM + heightMM + areaFace
                  + areaPer + areaM + areaCM + areaMM + heightDiffCM + heightDiffMM
                  + spacingCM + deformationMM + num + rangeCM + rangeMM + depthCM
                  + depthMM + volumeM + volumeCM + dispCM + dispMM + angle + chu
                  + tiao + rangeFenbuM + rangeLengthM + rangeWidthMM + rangeSpacingCM
                  + leftLengthM + bottomLengthM + rightLengthM + leftWidthMM
                  + bottomWidthMM + rightWidthMM + slantM
        setWriteTxt(writeTxt)
        console.log('writeTxt', writeTxt);
        console.log('病害名称',itemData.diseaseName);
        let binghai = itemData.diseaseName
        let allText = binghai.concat(writeTxt)
        console.log('allText', allText);
        diseaseData['description'] = allText
        handleFormChenge(allText, diseaseData.description)
      }
    }

    // 填入位置描述内容
    const writePositionText = () => {
      try {
        // console.log('diseaseData.area', diseaseData.area);
        console.log('diseaseData.lengthText',lengthText,widthText,heightText);
        if (diseaseData.area == undefined) {
          var areaName = areaparam[0].label
            setAreaName(areaName)
          console.log('没有填入位置描述内容');
          if (areaName == '' || areaName == undefined) {
            let writePositionTxt = '/'
            setWritePositionTxt(writePositionTxt)
            diseaseData['writePositionTxt'] = writePositionTxt
            handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
          } else {
            let writePositionTxt = areaName
            setWritePositionTxt(writePositionTxt)
            diseaseData['writePositionTxt'] = writePositionTxt
            handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
          }
          
        } else if (lengthText !== 0 || widthText !== 0 || heightText !== 0){
          console.log('有数据了');
          console.log('构件区域列表：：',areaparam);
          console.log('表单中的构件区域',diseaseData.area);
          console.log('构件类型',labelName);
          if (labelName == 'at0000' && diseaseData.area == undefined || diseaseData.area == '' || diseaseData.area == '/') {
            console.log('empty~~~');
            var areaName = ''
            diseaseData['area'] = areaName
            handleFormChenge(areaName, diseaseData.area)
          } else if (labelName == 'at0000' && diseaseData.area !== undefined || diseaseData.area !== '' || diseaseData.area !== '/') {
            console.log('not empty~~~~');
            var areaName = diseaseData.area
            diseaseData['area'] = areaName
            handleFormChenge(areaName, diseaseData.area)
          }
          if (areaparam !== []) {
            let areaArr = areaparam
            let inputArea = diseaseData.area
            console.log('inputArea',inputArea);
            for (let i = 0; i < areaArr.length; i++) {
              if (inputArea == areaArr[i].value) {
                console.log('此时选中的构件是：',areaArr[i].label);
                var areaName = areaArr[i].label
                // console.log(areaName);
                setAreaName(areaName)
              }
            }
          }

          // 位置描述 = / + 病害区域
          let writePositionTxt = areaName
          setWritePositionTxt(writePositionTxt)
          diseaseData['writePositionTxt'] = writePositionTxt
          setDiseaseData(diseaseData)
          handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
        }
      } catch (err) {
        console.log('出现错误1:',err);
      }
    }

    // 一键填入病害描述与位置描述
    const allWrite = () => {
      writeDesText()
      writePositionText()
    }


  {/* ================================================= */}
  {/* 病害填写表格区域 */}
  return (
  <View style={tailwind.flexRow}>
    {/* 病害填写表格区域 */}
    <ScrollView style={{height:350}}>
      <View>
      <View style={[tailwind.flexRow, tailwind.justifyBetween]}>
        <LabelItem label="编号:">
          <Text style={[tailwind.fontBold]}>
            {route.params?.data?.index}
          </Text>
        </LabelItem>
        <View style={tailwind.flexRow}>
          <LabelItem
            label="重点关注"
            LabelStyle={[tailwind.mR0, {color:'#2b427d'}]}
          />
          <Checkbox
            checked={!!diseaseData?.mian}
            onPress={() =>
              handleFormChenge({
                name: 'mian',
                value: !diseaseData?.mian + 0,
              })
            }
          />
        </View>
      </View>
      <View style={[tailwind.flexRow]}>
        <View style={{width:230}}>
           <Select
          label="构件类型"
          name="areatype"
          labelName="areaname"
          valueName="areatype"
          value={diseaseData?.areatype}
          onChange={handleFormChenge}
          values={baseData.components}
        /> 
        </View>
        <View style={{width:230}}>
          <View style={tailwind.mB2}>
            {!areaparam.length ? (
              <TextInput
                name="area"
                label="构件区域"
                value={diseaseData?.area}
                onChange={handleFormChenge}
                lines={1}
                height={25}
              />
            ) : (
              <Select
                name="area"
                label="构件区域"
                value={diseaseData?.area}
                values={areaparam}
                onChange={handleFormChenge}
              />
            )}
          </View>
        </View>
        
      </View>
      
      {/* 原本的标度内容 */}
      {/* {scale.length ? (
        <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
          <LabelItem label="标度" />
          <TouchableOpacity onPress={handleScaleOpen}>
            <Icon
              name="information"
              size={20}
              style={[tailwind.mR2, {color:'#2b427d'}]}
            />
          </TouchableOpacity>
          <RadioGroup
            name="scale"
            values={scale}
            value={diseaseData?.scale}
            onChange={handleFormChenge}
          />
        </View>
      ) : (
        <></>
      )} */}

      {/* 修改标度数据源 */}
      {rightScale.length ? (
          <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
            <LabelItem label="标度" />
            <TouchableOpacity onPress={handleScaleOpen}>
              <Icon
                name="information"
                size={20}
                style={[tailwind.mR2, {color:'#2b427d'}]}
              />
            </TouchableOpacity>
            <RadioGroup
              name="scale"
              values={rightScale} // 初始数据第一项为'无'，提取第二项及以后的数据传入组件
              value={diseaseData?.scale}
              onChange={handleFormChenge}
            />
          </View>
        ) : (
          <></>
        )}


      <View style={tailwind.mT2} />
      {/* <View>
        <View style={[tailwind.flexRow]}>
          <LabelItem label="病害位置(米)" style={tailwind.w18} />
          <Text>距左侧{lengthText}米; 距顶部{heightText}米</Text>
        </View>
        <View style={tailwind.mT2} />
        <View style={[tailwind.flexRow]}>
          <LabelItem label="长度" />
          <KeyboardInput
            name="memberLength"
            value={diseaseData?.memberLength}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disLength"
            memberData={diseaseData?.memberLength}
            value={diseaseData?.disLength}
            onChange={handleFormChenge}
          />
        </View>
        <View style={tailwind.mT2} />
        <View style={[tailwind.flexRow]}>
          <LabelItem label="台宽" style={tailwind.w18} />
          <KeyboardInput
            name="memberWidth"
            value={diseaseData?.memberWidth}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disWidth"
            memberData={diseaseData?.memberWidth}
            value={diseaseData?.disWidth}
            onChange={handleFormChenge}
          />
        </View>
        <View style={tailwind.mT2} />
        <View style={[tailwind.flexRow,tailwind.mB3]}>
          <LabelItem label="台高" style={tailwind.w18} />
          <KeyboardInput
            name="memberHeight"
            value={diseaseData?.memberHeight}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disHeight"
            memberData={diseaseData?.memberHeight}
            value={diseaseData?.disHeight}
            onChange={handleFormChenge}
          />
        </View>
      </View> */}
      {/* <View style={tailwind.mT2} /> */}
      <View style={[tailwind.flexRow]}>
        <View style={{width:500}}>
          <WriteInput
            name="description"
            label="病害描述"
            value={diseaseData?.description}
            onChange={handleFormChenge}
            lines={3}
            height={70}
            // disabled={true}
          />
        </View>
        {/* <TouchableOpacity style={styles.sideButton} onPress={writeDesText}>
          <Text style={[{color:'#fff',fontSize:12}]}>填入描述</Text>
        </TouchableOpacity> */}
      </View>
      <View style={tailwind.mT2} />
      <View style={[tailwind.flexRow]}>
        <View style={{width:500}}>
          <WriteInput
            name="writePositionTxt"
            label="位置描述"
            value={diseaseData?.writePositionTxt}
            onChange={handleFormChenge}
            lines={3}
            height={70}
          />
        </View>
        {/* <TouchableOpacity style={styles.sideButton} onPress={writePositionText}>
          <Text style={[{color:'#fff',fontSize:12}]}>填入描述</Text>
        </TouchableOpacity> */}
      </View>
    </View>
    </ScrollView>
    
    {/* ================================================= */}
    <View style={tailwind.mX3} />
    
    <View style={[{width:'20%'}]}>
    <View>
      {/* <LabelItem label="当前病害:" /> */}
      <Text style={[tailwind.fontBold,{width:'100%'}]}>
        {itemData?.diseaseName}
      </Text>
    </View>
    <View style={tailwind.mT2} />
    {infoList.length ? (
        infoList.map(({strvalue, strinfo}, index) => (
          <React.Fragment key={index}>
              <View style={[tailwind.mB2]}>
                <LabelItem label={strinfo} />
                <View style={{width:'70%',height:25}}>
                  <KeyboardInput
                    name={strvalue}
                    value={diseaseData[strvalue]}
                    onChange={handleFormChenge}
                  />
                </View>
              </View>
          </React.Fragment>
        ))
      ) : (
        <></>
      )}
      <TouchableOpacity style={styles.bottomButton} onPress={allWrite}>
        <Text style={[{color:'#fff',fontSize:14}]}>生成描述</Text>
      </TouchableOpacity>
    </View>
    
    <ScaleInfo ref={scaleInfoRef} info={scaleTabel} />
  </View>
  );
  {/* ================================================= */}
}

export function DiseaseE({route, navigation}) {
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
  
    const [areaparam, areanode] = hooks.useArea({diseaseData, baseData});
  
    // const infoList = hooks.useInfoComponents({diseaseData, baseData});
    const [infoList,setInfoList] = useState([])
  
    const defaultFileName = hooks.useDefaultFileName({diseaseData, baseData});
  
    const [scale, scaleInfo] = hooks.useScale({
      diseaseData,
      typeList: route.params?.type?.list,
      baseData,
    });


    React.useEffect(() => {
      setDiseaseData(itemData);
      console.log('itemData:',itemData);
      try {
        console.log('itemData',itemData.standard.scale);
        setBiaodu(itemData.standard.scale)
        diseaseData['scale'] = itemData.standard.scale
      } catch (error) {
        console.log('设置标度初始值',error);
      }
    }, [itemData]);
  
    const [lengthText, setLengthText] = useState()
    const [widthText, setWidthText] = useState()
    const [heightText, setHeightText] = useState()
    // =================================================
    const [writeTxt, setWriteTxt] = useState('')
    const [writePositionTxt, setWritePositionTxt] = useState('')
    // -------------------------------------------------
    // 标度,默认为 2
    const [biaodu, setBiaodu] = useState(2)
    // 长度 - 米
    const [lengthM, setLengthM] = useState('')
    // 长度 - 厘米
    const [lengthCM, setLengthCM] = useState('')
    // 长度 - 毫米
    const [lengthMM, setLengthMM] = useState('')
    // 宽度 - 米
    const [widthM, setWidthM] = useState('')
    // 宽度 - 厘米
    const [widthCM, setWidthCM] = useState('')
    // 宽度 - 毫米
    const [widthMM, setWidthMM] = useState('')
    // 高度 - 米
    const [heightM, setHeightM] = useState('')
    // 高度 - 厘米
    const [heightCM, setHeightCM] = useState('')
    // 高度 - 毫米
    const [heightMM, setHeightMM] = useState('')
    // 面域 - %
    const [areaFace, setAreaFace] = useState('')
    // 面积占比 - %
    const [areaPer, setAreaPer] = useState('')
    // 面积 - 平方米
    const [areaM, setAreaM] = useState('')
    // 面积 - 平方厘米
    const [areaCM, setAreaCM] = useState('')
    // 面积 - 平方毫米
    const [areaMM, setAreaMM] = useState('')
    // 高差 - 厘米
    const [heightDiffCM, setHeightDiffCM] = useState('')
    // 高差 - 毫米
    const [heightDiffMM, setHeightDiffMM] = useState('')
    // 间距 - 厘米
    const [spacingCM, setSpacingCM] = useState('')
    // 变形 - 毫米
    const [deformationMM, setDeformationMM] = useState('')
    // 个数 - 个
    const [num, setNum] = useState('')
    // 距离 - 厘米
    const [rangeCM, setRangeCM] = useState('')
    // 距离 - 毫米
    const [rangeMM, setRangeMM] = useState('')
    // 深度 - 厘米
    const [depthCM, setDepthCM] = useState('')
    // 深度 - 毫米
    const [depthMM, setDepthMM] = useState('')
    // 体积 - 立方米
    const [volumeM, setVolumeM] = useState('')
    // 体积 - 立方厘米
    const [volumeCM, setVolumeCM] = useState('')
    // 位移 - 厘米
    const [dispCM, setDispCM] = useState('')
    // 位移 - 毫米
    const [dispMM, setDispMM] = useState('')
    // 角度 - 度
    const [angle, setAngle] = useState('')
    // 处
    const [chu, setChu] = useState('')
    // 条
    const [tiao, setTiao] = useState('')
    // 分布范围 - 米
    const [rangeFenbuM, setRangeFenbuM] = useState('')
    // 长度范围 - 米
    const [rangeLengthM, setRangeLengthM] = useState('')
    // 宽度范围 - 毫米
    const [rangeWidthMM, setRangeWidthMM] = useState('')
    // 间距范围 - 厘米
    const [rangeSpacingCM, setRangeSpacingCM] = useState('')
    // 左腹板长度 - 米
    const [leftLengthM, setLeftLengthM] = useState('')
    // 底板长度 - 米
    const [bottomLengthM, setBottomLengthM] = useState('')
    // 右腹板长度 - 米
    const [rightLengthM, setRightLengthM] = useState('')
    // 左腹板宽度 - 毫米
    const [leftWidthMM, setLeftWidthMM] = useState('')
    // 底板宽度 - 毫米
    const [bottomWidthMM, setBottomWidthMM] = useState('')
    // 右腹板宽度 - 毫米
    const [rightWidthMM, setRightWidthMM] = useState('')
    // 倾斜量 - 米
    const [slantM, setSlantM] = useState('')

    const [saveDescription, setSaveDescription] = useState()

    // 构件类型
    const [labelName, setLabelName] = useState()
    // 构件区域
    const [areaName, setAreaName] = useState()

    // 病害名称
    const [infoshort, setInfoShort] = useState()

    // 位置描述 墩台
    const [pier,  setPier] = useState()
    // 位置描述 长、宽、距顶
    const [lengthNum, setLengthNum] = useState()
    const [widthNum, setWidthNum] = useState()
    const [heightNum, setHeightNum] = useState()

    const [diseaseName, setDiseaseName] = useState('')
    // =================================================
    React.useEffect(() => {
      saveData.current = {...diseaseData};
      try {

        if (baseData.membercheckdata) {
          console.log('保存baseData数据');
          setBaseDataStorage(JSON.stringify(baseData.membercheckdata))
        }
        if (route.params.thridData.datastr && baseData.membercheckdata) {
          let infoList = []
          route.params.thridData.datastr.forEach((item) => {
            // console.log('病害列表传入的datastr',item);
            baseData.membercheckdata.forEach((item1) => {
              if (item == item1.strid) {
                // console.log('取出来的item1',item1);
                infoList.push(item1)
              }
            })
          })
          setInfoList(infoList)
        } else if (!baseData.membercheckdata) {
          console.log('读取baseData数据');
          getBaseDataStorage('baseData')
        }

        if (diseaseData.diseaseName == undefined || diseaseData.diseaseName == '') {
          console.log('7777');
          diseaseData['diseaseName'] = route.params.thridData.checkinfoshort
          handleFormChenge(route.params.thridData.checkinfoshort, diseaseData.diseaseName)
        }
      } catch (err){
        console.log('err09', err);
      }
      try {
        // 初始构件类型与选择的构件类型一致时，构件区域取选择的值
        // 初始构件类型与选择的构件类型不一致时，构件区域默认取第一项
        for (let i =0; i < areaparam.length; i ++) {
          if (diseaseData.area == undefined) {
            diseaseData.area = areaparam[0].value
            handleFormChenge(areaparam[0].value, diseaseData.area)
            setAreaName(areaparam[0].label)
          } else if (diseaseData.area !== undefined) {
            let sliceArea = diseaseData.area.slice(0,6)
            if (sliceArea !== diseaseData.areatype) {
              for (let k = 0; k < baseData.components.length; k++) {
                if (diseaseData.areatype == baseData.components[k].areatype) {
                  diseaseData['areatype'] = baseData.components[k].areatype
                  diseaseData['area'] = baseData.components[k].areaparamjson.areaparamlist[0].areaparamid
                }
              }
            }
          }
        }
      } catch (err) {
        console.log('err08', err);
      }
      try {
        let lengthText = (diseaseData.memberLength * (diseaseData.disLength / 100)).toFixed(2)
        setLengthText(lengthText)
        let widthText = (diseaseData.memberWidth * (diseaseData.disWidth / 100)).toFixed(2)
        setWidthText(widthText)
        let heightText = (diseaseData.memberHeight * (diseaseData.disHeight / 100)).toFixed(2)
        setHeightText(heightText)
        if (lengthText == 'NaN') {
          let lengthText = '0'
          setLengthText(lengthText)
        }
        if (widthText == 'NaN') {
          let widthText = '0'
          setWidthText(widthText)
        }
        if (heightText == 'NaN') {
          let heightText = '0'
          setHeightText(heightText)
        }

        if (diseaseData.area == undefined) {

        } else if (diseaseData.area !== '' || diseaseData.area !== undefined || diseaseData.area !== '/') {
          var sliceArea = diseaseData.area.slice(0,5)
        }
        
        if (diseaseData.areatype == 'at0000' && sliceArea == 'at000') {
          console.log(sliceArea);
          console.log('xu~~~~~');
          diseaseData['area'] = '/'
        }

        if (diseaseData.areatype == 'at0008' && sliceArea == 'at000') {
          console.log(sliceArea);
          console.log('xu11~~~~~');
          diseaseData['area'] = '/'
        }
        
        // 将病害位置的长宽高数据存进diseaseData
        diseaseData['lengthText'] = lengthText
        diseaseData['widthText'] = widthText
        diseaseData['heightText'] = heightText
        diseaseData['remark'] = route.params.thridData.checkinfoshort


        // 取病害名称并保存
        if (diseaseData.diseaseName == '' || diseaseData.diseaseName == undefined) {
          let diseaseName = route.params.thridData.checkinfoshort
          // setDiseaseName(diseaseName)
          console.log('0000000');
          console.log('~~~~~~~diseaseName~~~~~',diseaseName);
          diseaseData['diseaseName'] = diseaseName
          handleFormChenge(diseaseName, diseaseData.diseaseName)
          setDiseaseName(diseaseName)
        }

        if (diseaseData.stairgroupid == undefined || diseaseData.stairgroupid == '') {
          // console.log('0000.000');
          diseaseData['stairgroupid'] = route.params.stairgroupid
          handleFormChenge(route.params.stairgroupid, diseaseData.stairgroupid)
        }

        // console.log(diseaseData);
        if (diseaseData.remark == '' || diseaseData.remark == undefined) {
          let infoshort = route.params.thridData.checkinfoshort
          setInfoShort(infoshort)
        }
        if (diseaseData.description == '' || diseaseData.description == undefined) {
          diseaseData['description'] = diseaseData.remark
        }

        if (diseaseData.writePositionTxt == undefined || diseaseData.writePositionTxt == '') {
          let writePositionTxt = '/'
          setWritePositionTxt(writePositionTxt)
          diseaseData['writePositionTxt'] = writePositionTxt
          handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
        }

        try {
          if (itemData && route.params.mediaType == 'add') {
            diseaseData['scale'] = rightScaleNum
            handleFormChenge(rightScaleNum, diseaseData.scale)
            route.params.mediaType = ''
          }
        } catch (error) {
          console.log('设置标度初始值',error);
        }
      } catch {
      }
    }, [diseaseData]);

    // 保存baseData的数据
    const setBaseDataStorage = async(value) => {
      try {
        await AsyncStorage.setItem('baseData', value)
      } catch (err) {
        console.log('存入数据失败!3', err);
      }
    }
    // 读取baseData的数据
    const getBaseDataStorage = async(name) => {
      // console.log('读取baseData数据')
      try {
        const value = await AsyncStorage.getItem(name)
        let values = JSON.parse(value)
        // console.log('value~~~',value);
        let infoList = []
          route.params.thridData.datastr.forEach((item) => {
            // console.log('病害列表传入的datastr',item);
            values.forEach((item1) => {
              if (item == item1.strid) {
                // console.log('取出来的item1',item1);
                infoList.push(item1)
              }
            })
          })
          setInfoList(infoList)
      } catch (error) {
        console.log('读取baseData数据失败',error);
      }
    }

    // 重新获取数据的标度选项数组
    const [rightScale, setRightScale] = useState([])
    // 默认的标度值
    const [rightScaleNum, setRightScaleNum] = useState('')
    // 重新获取数据的标度评定标准表格
    const [scaleTabel, setScaleTabel] = useState([])
  
    React.useEffect(() => {

      try {
        console.log('scale',scale);
        // console.log('baseData', baseData);
        // console.log('标度表格信息baseData.basestandardtable',baseData.basestandardtable)

        // 当页面是由新建进入时，存储标度数组，以备编辑进入时使用
        if (route.params.mediaType == 'add' || route.params.mediaType == '') {
          // =================================
          // 获取标度列表与标度默认值
          let scaleSelect = baseData.basestandardtable
          let oldArr = ''
          let scaleNum = ''
          scaleSelect.forEach(item => {
            // console.log('33330000',item.standardid);
            
            if (route.params.thridData.strandardid == item.standardid) {
              console.log('当前病害的标度选项',item);
              // setRightScale(item.standardscalestr)
              oldArr = item.standardscalestr
              scaleNum = item.standardscale
            }
          });
          setRightScaleNum(scaleNum)
          // console.log('rightScale',rightScale);
          const arr = oldArr.split(',')
          console.log('arr',arr);
          
          let resetArr = []
          arr.forEach((item, index) => {
            resetArr.push({
              label:index + 1,
              value:item
            })
          })
          console.log('resetArr',resetArr);
          setRightScale(resetArr)
          diseaseData['scaleArr'] = rightScale
          handleFormChenge(rightScale, diseaseData.scaleArr)

          // =================================
          // 获取标度评定标准表数据
          let scaleTabel = baseData.standardtableinfo
          // console.log('表格数据',scaleTabel);
          let oldTable = []
          scaleTabel.forEach((item) => {
            if (route.params.thridData.strandardid == item.standardid) {
              // console.log('当前的评定表item',item);
              oldTable.push(item)
            }
          })
          console.log('oldTable',oldTable);
          setScaleTabel(oldTable)
          diseaseData['scaleTableArr'] = oldTable
          handleFormChenge(oldTable, diseaseData.scaleTableArr)


        } else if (route.params.mediaType == 'edit') {
          // 当页面是由编辑进入时
          setRightScale(diseaseData.scaleArr)
          setScaleTabel(scaleTabel)
          // console.log('rightScale222222',rightScale);
        }
      } catch (error) {
        console.log('获取标度数据',error);
      }

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
            // .map(
            //   ({strname, strvalue, strunit}) =>
            //     `${strname}${saveData.current[strvalue] || 0}@@${
            //       strunit || ''
            //     }@@`,
            // )
            .map(
              ({strname, strvalue, strunit}) =>
                `${saveData.current[strvalue] == undefined ? '' : strname + saveData.current[strvalue] + '@@' + strunit + '@@'}`
            )
            const strr = str.filter(item => item!=='') == '' ? '/' : str.filter(item => item!=='')
            // .join(',');
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
            }，${strr}`,
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

    useEffect(() => {
      // console.log('桥跨：：',route.params.memberList);
      let defaultPier = route.params.memberList[0].membername
      // 提取第一个字符进行判断（表示墩台的数据）
      let firstDefaultPier = defaultPier.slice(0,1)
      if (firstDefaultPier == 1) {
        let pier = '距' + (firstDefaultPier - 1) + '#台'
        setPier(pier)
        console.log('dundun:', pier);
      } else {
        let pier = '距' + (firstDefaultPier - 1) + '#墩'
        setPier(pier)
        console.log('dundun:', pier);
      }

      

      console.log('构件区域列表：：',areaparam);
      console.log('构件类型：：', itemData.areatype);
      // console.log('表单中的构件区域',diseaseData.area);
      if (areaparam == '' || areaparam == undefined) {
        console.log('选的其他');
        try{
         console.log('构件类型', itemData.areatype); 
         if (itemData.areatype == 'at0000' || itemData.areatype == undefined) {
          // console.log('9999');
          diseaseData['area'] = '/'
          let labelName = itemData.areatype
          setLabelName(labelName)
         }
        } catch {

        }
      }
    },[])

    const handleScaleOpen = () => scaleInfoRef.current.open();
    const handleFormChenge = ({name, value}) => {
      // const _data = {
      //   ...diseaseData,
      //   [name]: value,
      // };

      let unitt = JSON.stringify(diseaseData, [
          'areatype','area','scale','lengthText','widthText','heightText','memberLength','memberWidth',
        'memberHeight','disLength','disWidth','disHeight','hzbrmc_length_m','hzbrmc_length_cm','hzbrmc_length_mm','hzbrmc_width_m',
        'hzbrmc_width_cm','hzbrmc_width_mm','hzbrmc_height_m','hzbrmc_height_cm','hzbrmc_height_mm',
        'hzbrmc_area_face','hzbrmc_area_per','hzbrmc_area_m','hzbrmc_area_cm','hzbrmc_area_mm',
        'hzbrmc_heightdiff_cm','hzbrmc_heightdiff_mm','hzbrmc_spacing_cm','hzbrmc_deformation_mm',
        'hzbrmc_num','hzbrmc_range_cm','hzbrmc_range_mm','hzbrmc_depth_cm','hzbrmc_depth_mm',
        'hzbrmc_volume_m','hzbrmc_volume_cm','hzbrmc_disp_cm','hzbrmc_disp_mm','hzbrmc_angle_c',
        'hzbrmc_chu','hzbrmc_tiao','hzbrmc_range_fenbu_m','hzbrmc_range_length_m','hzbrmc_range_width_mm',
        'hzbrmc_range_spacing_cm','hzbrmc_lb_left_length_m','hzbrmc_lb_bottom_length_m','hzbrmc_lb_right_length_m',
        'hzbrmc_lb_left_width_mm','hzbrmc_lb_bottom_width_mm','hzbrmc_lb_right_width_mm','hzbrmc_slant_m'])
      // console.log(unitt);
      let unit = JSON.parse(unitt)
      diseaseData['unit'] = unit
      // const {area,areatype,scale,hzbrmc_length_m,hzbrmc_length_cm,hzbrmc_length_mm,hzbrmc_width_m,hzbrmc_width_cm,
      //   hzbrmc_width_mm,hzbrmc_height_m,hzbrmc_height_cm,hzbrmc_height_mm,hzbrmc_area_face,hzbrmc_area_per,
      //   hzbrmc_area_m,hzbrmc_area_cm,hzbrmc_area_mm,hzbrmc_heightdiff_cm,hzbrmc_heightdiff_mm,hzbrmc_spacing_cm,
      //   hzbrmc_deformation_mm,hzbrmc_num,hzbrmc_range_cm,hzbrmc_range_mm,hzbrmc_depth_cm,hzbrmc_depth_mm,
      //   hzbrmc_volume_m,hzbrmc_volume_cm,hzbrmc_disp_cm,hzbrmc_disp_mm,hzbrmc_angle_c,hzbrmc_chu,hzbrmc_tiao,
      //   hzbrmc_range_fenbu_m,hzbrmc_range_length_m,hzbrmc_range_width_mm,hzbrmc_range_spacing_cm,hzbrmc_lb_left_length_m,
      //   hzbrmc_lb_bottom_length_m,hzbrmc_lb_right_length_m,hzbrmc_lb_left_width_mm,hzbrmc_lb_bottom_width_mm,
      //   hzbrmc_lb_right_width_mm,hzbrmc_slant_m,lengthText,widthText,heightText,memberLength,memberWidth,
      //   memberHeight,disLength,disWidth,disHeight,...rest} = diseaseData
      const _data = {
        ...diseaseData,
        [name]: value,
      };
      if (name === 'checktypeid') {
        const _type = route.params.type.list.find(
          item => value === item.checktypeid,
        );
        let defaultScaleVal = '';
        if (_type) {
          defaultScaleVal = _type?.standardscale;
        }
        _data.scale = defaultScaleVal;
        const {basestandardtable, infoComponents} = baseData;
        const standardid =
          infoComponents.find(({checktypeid}) => value === checktypeid)
            ?.standardid || '';
        if (standardid) {
          const _standardscale = basestandardtable.find(
            item => standardid === item.standardid,
          )?.standardscale;
          if (_standardscale) {
            _data.standard = {
              scale: _standardscale,
              id: standardid,
            };
          } else {
            const defaultScale = basestandardtable.find(
              item => item.standardid === 'JTG-TH21-2011-T000-0',
            )?.standardscale;
            _data.standard = {
              scale: defaultScale,
              id: 'JTG-TH21-2011-T000-0',
            };
          }
        }
        _data.scale = _data.scale || '';
      }

      // console.log('构件类型22：：', itemData.areatype);

      if (value) {
        // 向病害描述函数里传入
        writeDesText(name, value)
      }

      if (name == 'scale') {
        // 标度
        let biaodu = ',标度' + value + '@@'
        setBiaodu(biaodu)
      } else if (name == 'hzbrmc_length_m') {
        //长度 - 米
        // let lengthM = ',长度' + value + '@@米@@'
        // setLengthM(lengthM)
        if (value == '' || value == 0) {
          let lengthM = ''
          setLengthM(lengthM)
        } else {
          let lengthM = ',长度' + value + '@@米@@'
          setLengthM(lengthM)
        }
      } else if (name == 'hzbrmc_length_cm') {
        // 长度 - 厘米
        // let lengthCM = ',长度' + value + '@@厘米@@'
        // setLengthCM(lengthCM)
        if (value == '' || value == 0) {
          let lengthCM = ''
          setLengthCM(lengthCM)
        } else {
          let lengthCM = ',长度' + value + '@@厘米@@'
          setLengthCM(lengthCM)
        }
      } else if (name == 'hzbrmc_length_mm') {
        // 长度 - 毫米
        // let lengthMM = ',长度' + value + '@@毫米@@'
        // setLengthMM(lengthMM)
        if (value == '' || value == 0) {
          let lengthMM = ''
          setLengthMM(lengthMM)
        } else {
          let lengthMM = ',长度' + value + '@@毫米@@'
          setLengthMM(lengthMM)
        }
      } else if (name == 'hzbrmc_width_m') {
        // 宽度 - 米
        // let widthM = ',宽度' + value + '@@米@@'
        // setWidthM(widthM)
        if (value == '' || value == 0) {
          let widthM = ''
          setWidthM(widthM)
        } else {
          let widthM = ',宽度' + value + '@@米@@'
          setWidthM(widthM)
        }
      } else if (name == 'hzbrmc_width_cm') {
        // 宽度 - 厘米
        // let widthCM = ',宽度' + value + '@@厘米@@'
        // setWidthCM(widthCM)
        if (value == '' || value == 0) {
          let widthCM = ''
          setWidthCM(widthCM)
        } else {
          let widthCM = ',宽度' + value + '@@厘米@@'
          setWidthCM(widthCM)
        }
      } else if (name == 'hzbrmc_width_mm') {
        // 宽度 - 毫米
        if (value == '' || value == 0) {
          let widthMM = ''
          setWidthMM(widthMM)
        } else {
          let widthMM = ',宽度' + value + '@@毫米@@'
          setWidthMM(widthMM)
        }
      } else if (name == 'hzbrmc_height_m') {
        // 高度 - 米
        // let heightM = ',高度' + value + '@@米@@'
        // setHeightM(heightM)
        if (value == '' || value == 0) {
          let heightM = ''
          setHeightM(heightM)
        } else {
          let heightM = ',高度' + value + '@@米@@'
          setHeightM(heightM)
        }
      } else if (name == 'hzbrmc_height_cm') {
        // 高度 - 厘米
        if (value == '' || value == 0) {
          let heightCM = ''
          setHeightCM(heightCM)
        } else {
          let heightCM = ',高度' + value + '@@厘米@@'
          setHeightCM(heightCM)
        }
      } else if (name == 'hzbrmc_height_mm') {
        // 高度 - 毫米
        // let heightMM = ',高度' + value + '@@毫米@@'
        // setHeightMM(heightMM)
        if (value == '' || value == 0) {
          let heightMM = ''
          setHeightMM(heightMM)
        } else {
          let heightMM = ',高度' + value + '@@毫米@@'
          setHeightMM(heightMM)
        }
      } else if (name == 'hzbrmc_area_face') {
        // 面域 - %
        // let areaFace = ',面域' + value + '@@%@@'
        // setAreaFace(areaFace)
        if (value == '' || value == 0) {
          let areaFace = ''
          setAreaFace(areaFace)
        } else {
          let areaFace = ',面域' + value + '@@%@@'
          setAreaFace(areaFace)
        }
      } else if (name == 'hzbrmc_area_per') {
        // 面积占比 - %
        // let areaPer = ',面积占比' + value + '@@%@@'
        // setAreaPer(areaPer)
        if (value == '' || value == 0) {
          let areaPer = ''
          setAreaPer(areaPer)
        } else {
          let areaPer = ',面积占比' + value + '@@%@@'
          setAreaPer(areaPer)
        }
      } else if (name == 'hzbrmc_area_m') {
        // 面积 - 平方米
        // let areaM = ',面积' + value + '@@平方米@@'
        // setAreaM(areaM)
        if (value == '' || value == 0) {
          let areaM = ''
          setAreaM(areaM)
        } else {
          let areaM = ',面积' + value + '@@平方米@@'
          setAreaM(areaM)
        }
      } else if (name == 'hzbrmc_area_cm') {
        // 面积 - 平方厘米
        // let areaCM = ',面积' + value + '@@平方厘米@@'
        // setAreaCM(areaCM)
        if (value == '' || value == 0) {
          let areaCM = ''
          setAreaCM(areaCM)
        } else {
          let areaCM = ',面积' + value + '@@平方厘米@@'
          setAreaCM(areaCM)
        }
      } else if (name == 'hzbrmc_area_mm') {
        // 面积 - 平方毫米
        // let areaMM = ',面积' + value + '@@平方毫米@@'
        // setAreaMM(areaMM)
        if (value == '' || value == 0) {
          let areaMM = ''
          setAreaMM(areaMM)
        } else {
          let areaMM = ',面积' + value + '@@平方毫米@@'
          setAreaMM(areaMM)
        }
      } else if (name == 'hzbrmc_heightdiff_cm') {
        // 高差 - 厘米
        // let heightDiffCM = ',高差' + value + '@@厘米@@'
        // setHeightDiffCM(heightDiffCM)
        if (value == '' || value == 0) {
          let heightDiffCM = ''
          setHeightDiffCM(heightDiffCM)
        } else {
          let heightDiffCM = ',高差' + value + '@@厘米@@'
          setHeightDiffCM(heightDiffCM)
        }
      } else if (name == 'hzbrmc_heightdiff_mm') {
        // 高差 - 毫米
        // let heightDiffMM = ',高差' + value + '@@毫米@@'
        // setHeightDiffMM(heightDiffMM)
        if (value == '' || value == 0) {
          let heightDiffMM = ''
          setHeightDiffMM(heightDiffMM)
        } else {
          let heightDiffMM = ',高差' + value + '@@毫米@@'
          setHeightDiffMM(heightDiffMM)
        }
      } else if (name == 'hzbrmc_spacing_cm') {
        // 间距 - 厘米
        // let spacingCM = ',间距' + value + '@@厘米@@'
        // setSpacingCM(spacingCM)
        if (value == '' || value == 0) {
          let spacingCM = ',间距' + value + '@@厘米@@'
          setSpacingCM(spacingCM)
        } else {
          let spacingCM = ',间距' + value + '@@厘米@@'
          setSpacingCM(spacingCM)
        }
      } else if (name == 'hzbrmc_deformation_mm') {
        // 变形 - 毫米
        // let deformationMM = ',变形' + value + '@@毫米@@'
        // setDeformationMM(deformationMM)
        if (value == '' || value == 0) {
          let deformationMM = ''
          setDeformationMM(deformationMM)
        } else {
          let deformationMM = ',变形' + value + '@@毫米@@'
          setDeformationMM(deformationMM)
        }
      } else if (name == 'hzbrmc_num') {
        // 个数 - 个
        // let num = ',个数' + value + '@@个@@'
        // setNum(num)
        if (value == '' || value == 0) {
          let num = ''
          setNum(num)
        } else {
          let num = ',个数' + value + '@@个@@'
          setNum(num)
        }
      } else if (name == 'hzbrmc_range_cm') {
        // 距离 - 厘米
        // let rangeCM = ',距离' + value + '@@厘米@@'
        // setRangeCM(rangeCM)
        if (value == '' || value == 0) {
          let rangeCM = ''
          setRangeCM(rangeCM)
        } else {
          let rangeCM = ',距离' + value + '@@厘米@@'
          setRangeCM(rangeCM)
        }
      } else if (name == 'hzbrmc_range_mm') {
        // 距离 - 毫米
        // let rangeMM = ',距离' + value + '@@毫米@@'
        // setRangeMM(rangeMM)
        if (value == '' || value == 0) {
          let rangeMM = ''
          setRangeMM(rangeMM)
        } else {
          let rangeMM = ',距离' + value + '@@毫米@@'
          setRangeMM(rangeMM)
        }
      } else if (name == 'hzbrmc_depth_cm') {
        // 深度 - 厘米
        // let depthCM = ',深度' + value + '@@厘米@@'
        // setDepthCM(depthCM)
        if (value == '' || value == 0) {
          let depthCM = ''
          setDepthCM(depthCM)
        } else {
          let depthCM = ',深度' + value + '@@厘米@@'
          setDepthCM(depthCM)
        }
      } else if (name == 'hzbrmc_depth_mm') {
        // 深度 - 毫米
        // let depthMM = ',深度' + value + '@@毫米@@'
        // setDepthMM(depthMM)
        if (value == '' || value == 0) {
          let depthMM = ''
          setDepthMM(depthMM)
        } else {
          let depthMM = ',深度' + value + '@@毫米@@'
          setDepthMM(depthMM)
        }
      } else if (name == 'hzbrmc_volume_m') {
        // 体积 - 立方米
        // let volumeM = ',体积' + value + '@@立方米@@'
        // setVolumeM(volumeM)
        if (value == '' || value == 0) {
          let volumeM = ''
          setVolumeM(volumeM)
        } else {
          let volumeM = ',体积' + value + '@@立方米@@'
          setVolumeM(volumeM)
        }
      } else if (name == 'hzbrmc_volume_cm') {
        // 体积 - 立方厘米
        // let volumeCM = ',体积' + value + '@@立方厘米@@'
        // setVolumeCM(volumeCM)
        if (value == '' || value == 0) {
          let volumeCM = ''
          setVolumeCM(volumeCM)
        } else {
          let volumeCM = ',体积' + value + '@@立方厘米@@'
          setVolumeCM(volumeCM)
        }
      } else if (name == 'hzbrmc_disp_cm') {
        // 位移 - 厘米
        // let dispCM = ',位移' + value + '@@厘米@@'
        // setDispCM(dispCM)
        if (value == '' || value == 0) {
          let dispCM = ''
          setDispCM(dispCM)
        } else {
          let dispCM = ',位移' + value + '@@厘米@@'
          setDispCM(dispCM)
        }
      } else if (name == 'hzbrmc_disp_mm') {
        // 位移 - 毫米
        // let dispMM = ',位移' + value + '@@毫米@@'
        // setDispMM(dispMM)
        if (value == '' || value == 0) {
          let dispMM = ''
          setDispMM(dispMM)
        } else {
          let dispMM = ',位移' + value + '@@毫米@@'
          setDispMM(dispMM)
        }
      } else if (name == 'hzbrmc_angle_c') {
        // 角度 - 度
        // let angle = ',角度' + value + '@@度@@'
        // setAngle(angle)
        if (value == '' || value == 0) {
          let angle = ''
          setAngle(angle)
        } else {
          let angle = ',角度' + value + '@@度@@'
          setAngle(angle)
        }
      } else if (name == 'hzbrmc_chu') {
        // 处
        // let chu = ',' + value + '@@处@@'
        // setChu(chu)
        if (value == '' || value == 0) {
          let chu = ''
          setChu(chu)
        } else {
          let chu = ',' + value + '@@处@@'
          setChu(chu)
        }
      } else if (name == 'hzbrmc_tiao') {
        // 条
        // let tiao = ',' + value + '@@条@@'
        // setTiao(tiao)
        if (value == '' || value == 0) {
          let tiao = ''
          setTiao(tiao)
        } else {
          let tiao = ',' + value + '@@条@@'
          setTiao(tiao)
        }
      } else if (name == 'hzbrmc_range_fenbu_m') {
        // 分布范围 - 米
        // let rangeFenbuM = ',分布范围' + value + '@@米@@'
        // setRangeFenbuM(rangeFenbuM)
        if (value == '' || value == 0) {
          let rangeFenbuM = ''
          setRangeFenbuM(rangeFenbuM)
        } else {
          let rangeFenbuM = ',分布范围' + value + '@@米@@'
          setRangeFenbuM(rangeFenbuM)
        }
      } else if (name == 'hzbrmc_range_length_m') {
        // 长度范围 - 米
        // let rangeLengthM = ',长度范围' + value + '@@米@@'
        // setRangeLengthM(rangeLengthM)
        if (value == '' || value == 0) {
          let rangeLengthM = ''
          setRangeLengthM(rangeLengthM)
        } else {
          let rangeLengthM = ',长度范围' + value + '@@米@@'
          setRangeLengthM(rangeLengthM)
        }
      } else if (name == 'hzbrmc_range_width_mm') {
        // 宽度范围 - 毫米
        // let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
        // setRangeWidthMM(rangeWidthMM)
        if (value == '' || value == 0) {
          let rangeWidthMM = ''
          setRangeWidthMM(rangeWidthMM)
        } else {
          let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
          setRangeWidthMM(rangeWidthMM)
        }
      } else if (name == 'hzbrmc_range_spacing_cm') {
        // 间距范围 - 厘米
        // let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
        // setRangeSpacingCM(rangeSpacingCM)
        if (value == '' || value == 0) {
          let rangeSpacingCM = ''
          setRangeSpacingCM(rangeSpacingCM)
        } else {
          let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
          setRangeSpacingCM(rangeSpacingCM)
        }
      } else if (name == 'hzbrmc_lb_left_length_m') {
        // 左腹板长度 - 米
        // let leftLengthM = ',左腹板长度' + value + '@@米@@'
        // setLeftLengthM(leftLengthM)
        if (value == '' || value == 0) {
          let leftLengthM = ''
          setLeftLengthM(leftLengthM)
        } else {
          let leftLengthM = ',左腹板长度' + value + '@@米@@'
          setLeftLengthM(leftLengthM)
        }
      } else if (name == 'hzbrmc_lb_bottom_length_m') {
        // 底板长度 - 米
        // let bottomLengthM = ',底板长度' + value + '@@米@@'
        // setBottomLengthM(bottomLengthM)
        if (value == '' || value == 0) {
          let bottomLengthM = ''
          setBottomLengthM(bottomLengthM)
        } else {
          let bottomLengthM = ',底板长度' + value + '@@米@@'
          setBottomLengthM(bottomLengthM)
        }
      } else if (name == 'hzbrmc_lb_right_length_m') {
        // 右腹板长度 - 米
        // let rightLengthM = ',右腹板长度' + value + '@@米@@'
        // setRightLengthM(rightLengthM)
        if (value == '' || value == 0) {
          let rightLengthM = ''
          setRightLengthM(rightLengthM)
        } else {
          let rightLengthM = ',右腹板长度' + value + '@@米@@'
          setRightLengthM(rightLengthM)
        }
      } else if (name == 'hzbrmc_lb_left_width_mm') {
        // 左腹板宽度 - 毫米
        // let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
        // setLeftWidthMM(leftWidthMM)
        if (value == '' || value == 0) {
          let leftWidthMM = ''
          setLeftWidthMM(leftWidthMM)
        } else {
          let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
          setLeftWidthMM(leftWidthMM)
        }
      } else if (name == 'hzbrmc_lb_bottom_width_mm') {
        // 底板宽度 - 毫米
        // let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
        // setBottomWidthMM(bottomWidthMM)
        if (value == '' || value == 0) {
          let bottomWidthMM = ''
          setBottomWidthMM(bottomWidthMM)
        } else {
          let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
          setBottomWidthMM(bottomWidthMM)
        }
      } else if (name == 'hzbrmc_lb_right_width_mm') {
        // 右腹板宽度 - 毫米
        // let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
        // setRightWidthMM(rightWidthMM)
        if (value == '' || value == 0) {
          let rightWidthMM = ''
          setRightWidthMM(rightWidthMM)
        } else {
          let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
          setRightWidthMM(rightWidthMM)
        }
      } else if (name == 'hzbrmc_slant_m') {
        // 倾斜量 - 米
        // let slantM = ',倾斜量' + value + '@@米@@'
        // setSlantM(slantM)
        if (value == '' || value == 0) {
          let slantM = ''
          setSlantM(slantM)
        } else {
          let slantM = ',倾斜量' + value + '@@米@@'
          setSlantM(slantM)
        }
      }
      setDiseaseData(_data);
    };

    const [writeDesTextValue, setWriteDesTextValue] = useState('')

    // 填入病害描述内容
    const writeDesText = (name, value) => {
      // let writeTxt = []
      console.log('writeDesText', name, value);
      setWriteDesTextValue(value)

      if (true) {
        if (diseaseData.scale !== '' && diseaseData.scale !== '0' && diseaseData.scale !== '') {
          var biaodu = ',标度' + diseaseData.scale + '@@'
          setBiaodu(biaodu)
        } else {
          var biaodu = ''
          setBiaodu(biaodu)
        }
        if (diseaseData.hzbrmc_length_m !== undefined && diseaseData.hzbrmc_length_m !== '0' && diseaseData.hzbrmc_length_m !== '') {
          var lengthM = ',长度' + diseaseData.hzbrmc_length_m + '@@米@@'
          setLengthM(lengthM)
        } else {
          var lengthM = ''
          setLengthM(lengthM)
        }
        if (diseaseData.hzbrmc_length_cm !== undefined && diseaseData.hzbrmc_length_cm !== '0' && diseaseData.hzbrmc_length_cm !== '') {
          var lengthCM = ',长度' + diseaseData.hzbrmc_length_cm + '@@厘米@@'
          setLengthCM(lengthCM)
        } else {
          var lengthCM = ''
          setLengthCM(lengthCM)
        }
        if (diseaseData.hzbrmc_length_mm !== undefined && diseaseData.hzbrmc_length_mm !== '0' && diseaseData.hzbrmc_length_mm !== '') {
          var lengthMM = ',长度' + diseaseData.hzbrmc_length_mm + '@@毫米@@'
          setLengthMM(lengthMM)
        } else {
          var lengthMM = ''
          setLengthMM(lengthMM)
        }
        if (diseaseData.hzbrmc_width_m !== undefined && diseaseData.hzbrmc_width_m !== '0' && diseaseData.hzbrmc_width_m !== '') {
          var widthM = ',宽度' + diseaseData.hzbrmc_width_m + '@@米@@'
          setWidthM(widthM)
        } else {
          var widthM = ''
          setWidthM(widthM)
        }
        if (diseaseData.hzbrmc_width_cm !== undefined && diseaseData.hzbrmc_width_cm !== '0' && diseaseData.hzbrmc_width_cm !== '') {
          var widthCM = ',宽度' + diseaseData.hzbrmc_width_cm + '@@厘米@@'
          setWidthCM(widthCM)
        } else {
          var widthCM = ''
          setWidthCM(widthCM)
        }
        if (diseaseData.hzbrmc_width_mm !== undefined && diseaseData.hzbrmc_width_mm !== '0' && diseaseData.hzbrmc_width_mm !== '') {
          console.log('diseaseData.hzbrmc_width_mm',diseaseData.hzbrmc_width_mm == '');
          var widthMM = ',宽度' + diseaseData.hzbrmc_width_mm + '@@毫米@@'
          setWidthMM(widthMM)
        } else {
          // diseaseData.hzbrmc_width_mm == undefined || diseaseData.hzbrmc_width_mm == 0 || diseaseData.hzbrmc_width_mm == ''
          var widthMM = ''
          setWidthMM(widthMM)
        }
        if (diseaseData.hzbrmc_height_m !== undefined && diseaseData.hzbrmc_height_m !== '0' && diseaseData.hzbrmc_height_m !== '') {
          var heightM = ',高度' + diseaseData.hzbrmc_height_m + '@@米@@'
          setHeightM(heightM)
        } else {
          var heightM = ''
          setHeightM(heightM)
        }
        if (diseaseData.hzbrmc_height_cm !== undefined && diseaseData.hzbrmc_height_cm !== '0' && diseaseData.hzbrmc_height_cm !== '') {
          var heightCM = ',高度' + diseaseData.hzbrmc_height_cm + '@@厘米@@'
          setHeightCM(heightCM)
        } else {
          var heightCM = ''
          setHeightCM(heightCM)
        }
        if (diseaseData.hzbrmc_height_mm !== undefined && diseaseData.hzbrmc_height_mm !== '0' && diseaseData.hzbrmc_height_mm !== '') {
          var heightMM = ',高度' + diseaseData.hzbrmc_height_mm + '@@毫米@@'
          setHeightMM(heightMM)
        } else {
          var heightMM = ''
          setHeightMM(heightMM)
        }
        if (diseaseData.hzbrmc_area_face !== undefined && diseaseData.hzbrmc_area_face !== '0' && diseaseData.hzbrmc_area_face !== '') {
          var areaFace = ',面域' + diseaseData.hzbrmc_area_face + '@@%@@'
          setAreaFace(areaFace)
        } else {
          var areaFace = ''
          setAreaFace(areaFace)
        }
        if (diseaseData.hzbrmc_area_per !== undefined && diseaseData.hzbrmc_area_per !== '0' && diseaseData.hzbrmc_area_per !== '') {
          var areaPer = ',面积占比' + diseaseData.hzbrmc_area_per + '@@%@@'
          setAreaPer(areaPer)
        } else {
          var areaPer = ''
          setAreaPer(areaPer)
        }
        if (diseaseData.hzbrmc_area_m !== undefined && diseaseData.hzbrmc_area_m !== '0' && diseaseData.hzbrmc_area_m !== '') {
          var areaM = ',面积' + diseaseData.hzbrmc_area_m + '@@平方米@@'
          setAreaM(areaM)
        } else {
          var areaM = ''
          setAreaM(areaM)
        }
        if (diseaseData.hzbrmc_area_cm !== undefined && diseaseData.hzbrmc_area_cm !== '0' && diseaseData.hzbrmc_area_cm !== '') {
          var areaCM = ',面积' + diseaseData.hzbrmc_area_cm + '@@平方厘米@@'
          setAreaCM(areaCM)
        } else {
          var areaCM = ''
          setAreaCM(areaCM)
        }
        if (diseaseData.hzbrmc_area_mm !== undefined && diseaseData.hzbrmc_area_mm !== '0' && diseaseData.hzbrmc_area_mm !== '') {
          var areaMM = ',面积' + diseaseData.hzbrmc_area_mm + '@@平方毫米@@'
          setAreaMM(areaMM)
        } else {
          var areaMM = ''
          setAreaMM(areaMM)
        }
        if (diseaseData.hzbrmc_heightdiff_cm !== undefined && diseaseData.hzbrmc_heightdiff_cm !== '0' && diseaseData.hzbrmc_heightdiff_cm !== '') {
          var heightDiffCM = ',高差' + diseaseData.hzbrmc_heightdiff_cm + '@@厘米@@'
          setHeightDiffCM(heightDiffCM)
        } else {
          var heightDiffCM = ''
          setHeightDiffCM(heightDiffCM)
        }
        if (diseaseData.hzbrmc_heightdiff_mm !== undefined && diseaseData.hzbrmc_heightdiff_mm !== '0' && diseaseData.hzbrmc_heightdiff_mm !== '') {
          var heightDiffMM = ',高差' + diseaseData.hzbrmc_heightdiff_mm + '@@毫米@@'
          setHeightDiffMM(heightDiffMM)
        } else {
          var heightDiffMM = ''
          setHeightDiffMM(heightDiffMM)
        }
        if (diseaseData.hzbrmc_spacing_cm !== undefined && diseaseData.hzbrmc_spacing_cm !== '0' && diseaseData.hzbrmc_spacing_cm !== '') {
          var spacingCM = ',间距' + diseaseData.hzbrmc_spacing_cm + '@@厘米@@'
          setSpacingCM(spacingCM)
        } else {
          var spacingCM = ''
          setSpacingCM(spacingCM)
        }
        if (diseaseData.hzbrmc_deformation_mm !== undefined && diseaseData.hzbrmc_deformation_mm !== '0' && diseaseData.hzbrmc_deformation_mm !== '') {
          var deformationMM = ',变形' + diseaseData.hzbrmc_deformation_mm + '@@毫米@@'
          setDeformationMM(deformationMM)
        } else {
          var deformationMM = ''
          setDeformationMM(deformationMM)
        }
        if (diseaseData.hzbrmc_num !== undefined && diseaseData.hzbrmc_num !== '0' && diseaseData.hzbrmc_num !== '') {
          var num = ',个数' + diseaseData.hzbrmc_num + '@@个@@'
          setNum(num)
        } else {
          var num = ''
          setNum(num)
        }
        if (diseaseData.hzbrmc_range_cm !== undefined && diseaseData.hzbrmc_range_cm !== '0' && diseaseData.hzbrmc_range_cm !== '') {
          var rangeCM = ',距离' + diseaseData.hzbrmc_range_cm + '@@厘米@@'
          setRangeCM(rangeCM)
        } else {
          var rangeCM = ''
          setRangeCM(rangeCM)
        }
        if (diseaseData.hzbrmc_range_mm !== undefined && diseaseData.hzbrmc_range_mm !== '0' && diseaseData.hzbrmc_range_mm !== '') {
          var rangeMM = ',距离' + diseaseData.hzbrmc_range_mm + '@@毫米@@'
          setRangeMM(rangeMM)
        } else {
          var rangeMM = ''
          setRangeMM(rangeMM)
        }
        if (diseaseData.hzbrmc_depth_cm !== undefined && diseaseData.hzbrmc_depth_cm !== '0' && diseaseData.hzbrmc_depth_cm !== '') {
          var depthCM = ',深度' + diseaseData.hzbrmc_depth_cm + '@@厘米@@'
          setDepthCM(depthCM)
        } else {
          var depthCM = ''
          setDepthCM(depthCM)
        }
        if (diseaseData.hzbrmc_depth_mm !== undefined && diseaseData.hzbrmc_depth_mm !== '0' && diseaseData.hzbrmc_depth_mm !== '') {
          var depthMM = ',深度' + diseaseData.hzbrmc_depth_mm + '@@毫米@@'
          setDepthMM(depthMM)
        } else {
          var depthMM = ''
          setDepthMM(depthMM)
        }
        if (diseaseData.hzbrmc_volume_m !== undefined && diseaseData.hzbrmc_volume_m !== '0' && diseaseData.hzbrmc_volume_m !== '') {
          var volumeM = ',体积' + diseaseData.hzbrmc_volume_m + '@@立方米@@'
          setVolumeM(volumeM)
        } else {
          var volumeM = ''
          setVolumeM(volumeM)
        }
        if (diseaseData.hzbrmc_volume_cm !== undefined && diseaseData.hzbrmc_volume_cm !== '0' && diseaseData.hzbrmc_volume_cm !== '') {
          var volumeCM = ',体积' + diseaseData.hzbrmc_volume_cm + '@@立方厘米@@'
          setVolumeCM(volumeCM)
        } else {
          var volumeCM = ''
          setVolumeCM(volumeCM)
        }
        if (diseaseData.hzbrmc_disp_cm !== undefined && diseaseData.hzbrmc_disp_cm !== '0' && diseaseData.hzbrmc_disp_cm !== '') {
          var dispCM = ',位移' + diseaseData.hzbrmc_disp_cm + '@@厘米@@'
          setDispCM(dispCM)
        } else {
          var dispCM = ''
          setDispCM(dispCM)
        }
        if (diseaseData.hzbrmc_disp_mm !== undefined && diseaseData.hzbrmc_disp_mm !== '0' && diseaseData.hzbrmc_disp_mm !== '') {
          var dispMM = ',位移' + diseaseData.hzbrmc_disp_mm + '@@毫米@@'
          setDispMM(dispMM)
        } else {
          var dispMM = ''
          setDispMM(dispMM)
        }
        if (diseaseData.hzbrmc_angle_c !== undefined && diseaseData.hzbrmc_angle_c !== '0' && diseaseData.hzbrmc_angle_c !== '') {
          var angle = ',角度' + diseaseData.hzbrmc_angle_c + '@@度@@'
          setAngle(angle)
        } else {
          var angle = ''
          setAngle(angle)
        }
        if (diseaseData.hzbrmc_chu !== undefined && diseaseData.hzbrmc_chu !== '0' && diseaseData.hzbrmc_chu !== '') {
          var chu = ',' + diseaseData.hzbrmc_chu + '@@处@@'
          setChu(chu)
        } else {
          var chu = ''
          setChu(chu)
        }
        if (diseaseData.hzbrmc_tiao !== undefined && diseaseData.hzbrmc_tiao !== '0' && diseaseData.hzbrmc_tiao !== '') {
          var tiao = ',' + diseaseData.hzbrmc_tiao + '@@条@@'
          setTiao(tiao)
        } else {
          var tiao = ''
          setTiao(tiao)
        }
        if (diseaseData.hzbrmc_range_fenbu_m !== undefined && diseaseData.hzbrmc_range_fenbu_m !== '0' && diseaseData.hzbrmc_range_fenbu_m !== '') {
          var rangeFenbuM = ',分布范围' + diseaseData.hzbrmc_range_fenbu_m + '@@米@@'
          setRangeFenbuM(rangeFenbuM)
        } else {
          var rangeFenbuM = ''
          setRangeFenbuM(rangeFenbuM)
        }
        if (diseaseData.hzbrmc_range_length_m !== undefined && diseaseData.hzbrmc_range_length_m !== '0' && diseaseData.hzbrmc_range_length_m !== '') {
          var rangeLengthM = ',长度范围' + diseaseData.hzbrmc_range_length_m + '@@米@@'
          setRangeLengthM(rangeLengthM)
        } else {
          var rangeLengthM = ''
          setRangeLengthM(rangeLengthM)
        }
        if (diseaseData.hzbrmc_range_width_mm !== undefined && diseaseData.hzbrmc_range_width_mm !== '0' && diseaseData.hzbrmc_range_width_mm !== '') {
          var rangeWidthMM = ',宽度范围'+ diseaseData.hzbrmc_range_width_mm + '@@毫米@@'
          setRangeWidthMM(rangeWidthMM)
        } else {
          var rangeWidthMM = ''
          setRangeWidthMM(rangeWidthMM)
        }
        if (diseaseData.hzbrmc_range_spacing_cm !== undefined && diseaseData.hzbrmc_range_spacing_cm !== '0' && diseaseData.hzbrmc_range_spacing_cm !== '') {
          var rangeSpacingCM = ',间距范围' + diseaseData.hzbrmc_range_spacing_cm + '@@厘米@@'
          setRangeSpacingCM(rangeSpacingCM)
        } else {
          var rangeSpacingCM = ''
          setRangeSpacingCM(rangeSpacingCM)
        }
        if (diseaseData.hzbrmc_lb_left_length_m !== undefined && diseaseData.hzbrmc_lb_left_length_m !== '0' && diseaseData.hzbrmc_lb_left_length_m !== '') {
          var leftLengthM = ',左腹板长度' + diseaseData.hzbrmc_lb_left_length_m + '@@米@@'
          setLeftLengthM(leftLengthM)
        } else {
          var leftLengthM = ''
          setLeftLengthM(leftLengthM)
        }
        if (diseaseData.hzbrmc_lb_bottom_length_m !== undefined && diseaseData.hzbrmc_lb_bottom_length_m !== '0' && diseaseData.hzbrmc_lb_bottom_length_m !== '') {
          var bottomLengthM = ',底板长度' + diseaseData.hzbrmc_lb_bottom_length_m + '@@米@@'
          setBottomLengthM(bottomLengthM)
        } else {
          var bottomLengthM = ''
          setBottomLengthM(bottomLengthM)
        }
        if (diseaseData.hzbrmc_lb_right_length_m !== undefined && diseaseData.hzbrmc_lb_right_length_m !== '0' && diseaseData.hzbrmc_lb_right_length_m !== '') {
          var rightLengthM = ',右腹板长度' + diseaseData.hzbrmc_lb_right_length_m + '@@米@@'
          setRightLengthM(rightLengthM)
        } else {
          var rightLengthM = ''
          setRightLengthM(rightLengthM)
        }
        if (diseaseData.hzbrmc_lb_left_width_mm !== undefined && diseaseData.hzbrmc_lb_left_width_mm !== '0' && diseaseData.hzbrmc_lb_left_width_mm !== '') {
          var leftWidthMM = ',左腹板宽度' + diseaseData.hzbrmc_lb_left_width_mm + '@@毫米@@'
          setLeftWidthMM(leftWidthMM)
        } else {
          var leftWidthMM = ''
          setLeftWidthMM(leftWidthMM)
        }
        if (diseaseData.hzbrmc_lb_bottom_width_mm !== undefined && diseaseData.hzbrmc_lb_bottom_width_mm !== '0' && diseaseData.hzbrmc_lb_bottom_width_mm !== '') {
          var bottomWidthMM = ',底板宽度' + diseaseData.hzbrmc_lb_bottom_width_mm + '@@毫米@@'
          setBottomWidthMM(bottomWidthMM)
        } else {
          var bottomWidthMM = ''
          setBottomWidthMM(bottomWidthMM)
        }
        if (diseaseData.hzbrmc_lb_right_width_mm !== undefined && diseaseData.hzbrmc_lb_right_width_mm !== '0' && diseaseData.hzbrmc_lb_right_width_mm !== '') {
          var rightWidthMM = ',右腹板宽度' + diseaseData.hzbrmc_lb_right_width_mm + '@@毫米@@'
          setRightWidthMM(rightWidthMM)
        } else {
          var rightWidthMM = ''
          setRightWidthMM(rightWidthMM)
        }
        if (diseaseData.hzbrmc_slant_m !== undefined && diseaseData.hzbrmc_slant_m !== '0' && diseaseData.hzbrmc_slant_m !== '') {
          var slantM = ',倾斜量' + diseaseData.hzbrmc_slant_m + '@@米@@'
          setSlantM(slantM)
        } else {
          var slantM = ''
          setSlantM(slantM)
        }
      }

      if (writeDesTextValue == '' || writeDesTextValue == undefined) {
        console.log('没有修改数据');
        if (diseaseData.description == '' || diseaseData.description == undefined) {
          diseaseData['description'] = itemData.diseaseName
        } else if (diseaseData.description !== '' || diseaseData.description !== undefined) {
          let writeTxt = lengthM + lengthCM + lengthMM + widthM + widthCM
                  + widthMM + heightM + heightCM + heightMM + areaFace
                  + areaPer + areaM + areaCM + areaMM + heightDiffCM + heightDiffMM
                  + spacingCM + deformationMM + num + rangeCM + rangeMM + depthCM
                  + depthMM + volumeM + volumeCM + dispCM + dispMM + angle + chu
                  + tiao + rangeFenbuM + rangeLengthM + rangeWidthMM + rangeSpacingCM
                  + leftLengthM + bottomLengthM + rightLengthM + leftWidthMM
                  + bottomWidthMM + rightWidthMM + slantM
          // let writeTxt = diseaseData.hzbrmc_length_m
          setWriteTxt(writeTxt)
          // console.log('writeTxt', writeTxt);
          // console.log('病害名称',itemData.diseaseName);
          let binghai = itemData.diseaseName
          let allText = binghai.concat(writeTxt)
          console.log('allText', allText);
          diseaseData['description'] = allText
          handleFormChenge(allText, diseaseData.description)
        }
      } else {
        let writeTxt = lengthM + lengthCM + lengthMM + widthM + widthCM
                  + widthMM + heightM + heightCM + heightMM + areaFace
                  + areaPer + areaM + areaCM + areaMM + heightDiffCM + heightDiffMM
                  + spacingCM + deformationMM + num + rangeCM + rangeMM + depthCM
                  + depthMM + volumeM + volumeCM + dispCM + dispMM + angle + chu
                  + tiao + rangeFenbuM + rangeLengthM + rangeWidthMM + rangeSpacingCM
                  + leftLengthM + bottomLengthM + rightLengthM + leftWidthMM
                  + bottomWidthMM + rightWidthMM + slantM
        setWriteTxt(writeTxt)
        console.log('writeTxt', writeTxt);
        console.log('病害名称',itemData.diseaseName);
        let binghai = itemData.diseaseName
        let allText = binghai.concat(writeTxt)
        console.log('allText', allText);
        diseaseData['description'] = allText
        handleFormChenge(allText, diseaseData.description)
      }
    }

    // 填入位置描述内容
    const writePositionText = () => {
      try {
        // console.log('diseaseData.area', diseaseData.area);
        console.log('diseaseData.lengthText',lengthText,widthText,heightText);
        if (diseaseData.area == undefined) {
          var areaName = areaparam[0].label
            setAreaName(areaName)
          console.log('没有填入位置描述内容');
          if (areaName == '' || areaName == undefined) {
            let writePositionTxt = '/'
            setWritePositionTxt(writePositionTxt)
            diseaseData['writePositionTxt'] = writePositionTxt
            handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
          } else {
            let writePositionTxt = areaName
            setWritePositionTxt(writePositionTxt)
            diseaseData['writePositionTxt'] = writePositionTxt
            handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
          }
        } else if (lengthText !== 0 || widthText !== 0 || heightText !== 0){
          console.log('有数据了');
          console.log('构件区域列表：：',areaparam);
          console.log('表单中的构件区域',diseaseData.area);
          console.log('构件类型',diseaseData.areatype);
          if (labelName == 'at0000' && diseaseData.area == undefined || diseaseData.area == '' || diseaseData.area == '/') {
            console.log('empty~~~');
            var areaName = ''
            diseaseData['area'] = areaName
            handleFormChenge(areaName, diseaseData.area)
          } else if (labelName == 'at0000' && diseaseData.area !== undefined || diseaseData.area !== '' || diseaseData.area !== '/') {
            console.log('not empty~~~~');
            var areaName = diseaseData.area
            diseaseData['area'] = areaName
            handleFormChenge(areaName, diseaseData.area)
          }
          if (areaparam !== []) {
            let areaArr = areaparam
            let inputArea = diseaseData.area
            console.log('inputArea',inputArea);
            for (let i = 0; i < areaArr.length; i++) {
              if (inputArea == areaArr[i].value) {
                console.log('此时选中的构件是：',areaArr[i].label);
                var areaName = areaArr[i].label
                // console.log(areaName);
                setAreaName(areaName)
              }
            }
          }

          if (diseaseData.areatype == 'at0008') {
            // 位置描述 = / + 病害区域
            let writePositionTxt = areaName + '#孔位置处'
            setWritePositionTxt(writePositionTxt)
            diseaseData['writePositionTxt'] = writePositionTxt
            setDiseaseData(diseaseData)
            handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
          } else {
            // 位置描述 = / + 病害区域
            let writePositionTxt = areaName
            setWritePositionTxt(writePositionTxt)
            diseaseData['writePositionTxt'] = writePositionTxt
            setDiseaseData(diseaseData)
            handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
          }

          
        }
      } catch (err) {
        console.log('出现错误1:',err);
      }
    }

    // 一键填入病害描述与位置描述
    const allWrite = () => {
      writeDesText()
      writePositionText()
    }


  {/* ================================================= */}
  {/* 病害填写表格区域 */}
  return (
  <View style={tailwind.flexRow}>
    {/* 病害填写表格区域 */}
    <ScrollView style={{height:350}}>
      <View>
      <View style={[tailwind.flexRow, tailwind.justifyBetween]}>
        <LabelItem label="编号:">
          <Text style={[tailwind.fontBold]}>
            {route.params?.data?.index}
          </Text>
        </LabelItem>
        <View style={tailwind.flexRow}>
          <LabelItem
            label="重点关注"
            LabelStyle={[tailwind.mR0, {color:'#2b427d'}]}
          />
          <Checkbox
            checked={!!diseaseData?.mian}
            onPress={() =>
              handleFormChenge({
                name: 'mian',
                value: !diseaseData?.mian + 0,
              })
            }
          />
        </View>
      </View>
      <View style={[tailwind.flexRow]}>
        <View style={{width:230}}>
           <Select
          label="构件类型"
          name="areatype"
          labelName="areaname"
          valueName="areatype"
          value={diseaseData?.areatype}
          onChange={handleFormChenge}
          values={baseData.components}
        /> 
        </View>
        <View style={{width:230}}>
          <View style={tailwind.mB2}>
            {!areaparam.length ? (
              <TextInput
                name="area"
                label="构件区域"
                value={diseaseData?.area}
                onChange={handleFormChenge}
                lines={1}
                height={25}
              />
            ) : (
              <Select
                name="area"
                label="构件区域"
                value={diseaseData?.area}
                values={areaparam}
                onChange={handleFormChenge}
              />
            )}
          </View>
        </View>
        
      </View>
      
      {/* 原本的标度内容 */}
      {/* {scale.length ? (
        <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
          <LabelItem label="标度" />
          <TouchableOpacity onPress={handleScaleOpen}>
            <Icon
              name="information"
              size={20}
              style={[tailwind.mR2, {color:'#2b427d'}]}
            />
          </TouchableOpacity>
          <RadioGroup
            name="scale"
            values={scale}
            value={diseaseData?.scale}
            onChange={handleFormChenge}
          />
        </View>
      ) : (
        <></>
      )} */}

      {/* 修改标度数据源 */}
      {rightScale.length ? (
          <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
            <LabelItem label="标度" />
            <TouchableOpacity onPress={handleScaleOpen}>
              <Icon
                name="information"
                size={20}
                style={[tailwind.mR2, {color:'#2b427d'}]}
              />
            </TouchableOpacity>
            <RadioGroup
              name="scale"
              values={rightScale} // 初始数据第一项为'无'，提取第二项及以后的数据传入组件
              value={diseaseData?.scale}
              onChange={handleFormChenge}
            />
          </View>
        ) : (
          <></>
        )}


      <View style={tailwind.mT2} />
      {/* <View>
        <View style={[tailwind.flexRow]}>
          <LabelItem label="病害位置(米)" style={tailwind.w18} />
          <Text>距左侧{lengthText}米; 距顶部{heightText}米</Text>
        </View>
        <View style={tailwind.mT2} />
        <View style={[tailwind.flexRow]}>
          <LabelItem label="长度" />
          <KeyboardInput
            name="memberLength"
            value={diseaseData?.memberLength}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disLength"
            memberData={diseaseData?.memberLength}
            value={diseaseData?.disLength}
            onChange={handleFormChenge}
          />
        </View>
        <View style={tailwind.mT2} />
        <View style={[tailwind.flexRow]}>
          <LabelItem label="台宽" style={tailwind.w18} />
          <KeyboardInput
            name="memberWidth"
            value={diseaseData?.memberWidth}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disWidth"
            memberData={diseaseData?.memberWidth}
            value={diseaseData?.disWidth}
            onChange={handleFormChenge}
          />
        </View>
        <View style={tailwind.mT2} />
        <View style={[tailwind.flexRow,tailwind.mB3]}>
          <LabelItem label="台高" style={tailwind.w18} />
          <KeyboardInput
            name="memberHeight"
            value={diseaseData?.memberHeight}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disHeight"
            memberData={diseaseData?.memberHeight}
            value={diseaseData?.disHeight}
            onChange={handleFormChenge}
          />
        </View>
      </View> */}
      {/* <View style={tailwind.mT2} /> */}
      <View style={[tailwind.flexRow]}>
        <View style={{width:500}}>
          <WriteInput
            name="description"
            label="病害描述"
            value={diseaseData?.description}
            onChange={handleFormChenge}
            lines={3}
            height={70}
            // disabled={true}
          />
        </View>
        {/* <TouchableOpacity style={styles.sideButton} onPress={writeDesText}>
          <Text style={[{color:'#fff',fontSize:12}]}>填入描述</Text>
        </TouchableOpacity> */}
      </View>
      <View style={tailwind.mT2} />
      <View style={[tailwind.flexRow]}>
        <View style={{width:500}}>
          <WriteInput
            name="writePositionTxt"
            label="位置描述"
            value={diseaseData?.writePositionTxt}
            onChange={handleFormChenge}
            lines={3}
            height={70}
          />
        </View>
        {/* <TouchableOpacity style={styles.sideButton} onPress={writePositionText}>
          <Text style={[{color:'#fff',fontSize:12}]}>填入描述</Text>
        </TouchableOpacity> */}
      </View>
    </View>
    </ScrollView>
    
    {/* ================================================= */}
    <View style={tailwind.mX3} />
    
    <View style={[{width:'20%'}]}>
    <View>
      {/* <LabelItem label="当前病害:" /> */}
      <Text style={[tailwind.fontBold,{width:'100%'}]}>
        {itemData?.diseaseName}
      </Text>
    </View>
    <View style={tailwind.mT2} />
    {infoList.length ? (
        infoList.map(({strvalue, strinfo}, index) => (
          <React.Fragment key={index}>
              <View style={[tailwind.mB2]}>
                <LabelItem label={strinfo} />
                <View style={{width:70,height:25}}>
                  <KeyboardInput
                    name={strvalue}
                    value={diseaseData[strvalue]}
                    onChange={handleFormChenge}
                  />
                </View>
              </View>
          </React.Fragment>
        ))
      ) : (
        <></>
      )}
      <TouchableOpacity style={styles.bottomButton} onPress={allWrite}>
        <Text style={[{color:'#fff',fontSize:14}]}>生成描述</Text>
      </TouchableOpacity>
    </View>
    
    <ScaleInfo ref={scaleInfoRef} info={scaleTabel} />
  </View>
  );
  {/* ================================================= */}
}

export function DiseaseK({route, navigation}) {
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
  
    const [areaparam, areanode] = hooks.useArea({diseaseData, baseData});
  
    // const infoList = hooks.useInfoComponents({diseaseData, baseData});
    const [infoList,setInfoList] = useState([])
  
    const defaultFileName = hooks.useDefaultFileName({diseaseData, baseData});
  
    const [scale, scaleInfo] = hooks.useScale({
      diseaseData,
      typeList: route.params?.type?.list,
      baseData,
    });


    React.useEffect(() => {
      setDiseaseData(itemData);
      console.log('itemData:',itemData);
      try {
        console.log('itemData',itemData.standard.scale);
        setBiaodu(itemData.standard.scale)
        diseaseData['scale'] = itemData.standard.scale
      } catch (error) {
        console.log('设置标度初始值',error);
      }
    }, [itemData]);
  
    const [lengthText, setLengthText] = useState()
    const [widthText, setWidthText] = useState()
    const [heightText, setHeightText] = useState()
    // =================================================
    const [writeTxt, setWriteTxt] = useState('')
    const [writePositionTxt, setWritePositionTxt] = useState('')
    // -------------------------------------------------
    // 标度,默认为 2
    const [biaodu, setBiaodu] = useState(2)
    // 长度 - 米
    const [lengthM, setLengthM] = useState('')
    // 长度 - 厘米
    const [lengthCM, setLengthCM] = useState('')
    // 长度 - 毫米
    const [lengthMM, setLengthMM] = useState('')
    // 宽度 - 米
    const [widthM, setWidthM] = useState('')
    // 宽度 - 厘米
    const [widthCM, setWidthCM] = useState('')
    // 宽度 - 毫米
    const [widthMM, setWidthMM] = useState('')
    // 高度 - 米
    const [heightM, setHeightM] = useState('')
    // 高度 - 厘米
    const [heightCM, setHeightCM] = useState('')
    // 高度 - 毫米
    const [heightMM, setHeightMM] = useState('')
    // 面域 - %
    const [areaFace, setAreaFace] = useState('')
    // 面积占比 - %
    const [areaPer, setAreaPer] = useState('')
    // 面积 - 平方米
    const [areaM, setAreaM] = useState('')
    // 面积 - 平方厘米
    const [areaCM, setAreaCM] = useState('')
    // 面积 - 平方毫米
    const [areaMM, setAreaMM] = useState('')
    // 高差 - 厘米
    const [heightDiffCM, setHeightDiffCM] = useState('')
    // 高差 - 毫米
    const [heightDiffMM, setHeightDiffMM] = useState('')
    // 间距 - 厘米
    const [spacingCM, setSpacingCM] = useState('')
    // 变形 - 毫米
    const [deformationMM, setDeformationMM] = useState('')
    // 个数 - 个
    const [num, setNum] = useState('')
    // 距离 - 厘米
    const [rangeCM, setRangeCM] = useState('')
    // 距离 - 毫米
    const [rangeMM, setRangeMM] = useState('')
    // 深度 - 厘米
    const [depthCM, setDepthCM] = useState('')
    // 深度 - 毫米
    const [depthMM, setDepthMM] = useState('')
    // 体积 - 立方米
    const [volumeM, setVolumeM] = useState('')
    // 体积 - 立方厘米
    const [volumeCM, setVolumeCM] = useState('')
    // 位移 - 厘米
    const [dispCM, setDispCM] = useState('')
    // 位移 - 毫米
    const [dispMM, setDispMM] = useState('')
    // 角度 - 度
    const [angle, setAngle] = useState('')
    // 处
    const [chu, setChu] = useState('')
    // 条
    const [tiao, setTiao] = useState('')
    // 分布范围 - 米
    const [rangeFenbuM, setRangeFenbuM] = useState('')
    // 长度范围 - 米
    const [rangeLengthM, setRangeLengthM] = useState('')
    // 宽度范围 - 毫米
    const [rangeWidthMM, setRangeWidthMM] = useState('')
    // 间距范围 - 厘米
    const [rangeSpacingCM, setRangeSpacingCM] = useState('')
    // 左腹板长度 - 米
    const [leftLengthM, setLeftLengthM] = useState('')
    // 底板长度 - 米
    const [bottomLengthM, setBottomLengthM] = useState('')
    // 右腹板长度 - 米
    const [rightLengthM, setRightLengthM] = useState('')
    // 左腹板宽度 - 毫米
    const [leftWidthMM, setLeftWidthMM] = useState('')
    // 底板宽度 - 毫米
    const [bottomWidthMM, setBottomWidthMM] = useState('')
    // 右腹板宽度 - 毫米
    const [rightWidthMM, setRightWidthMM] = useState('')
    // 倾斜量 - 米
    const [slantM, setSlantM] = useState('')

    const [saveDescription, setSaveDescription] = useState()

    // 构件类型
    const [labelName, setLabelName] = useState()
    // 构件区域
    const [areaName, setAreaName] = useState()

    // 病害名称
    const [infoshort, setInfoShort] = useState()

    // 位置描述 墩台
    const [pier,  setPier] = useState()
    // 位置描述 长、宽、距顶
    const [lengthNum, setLengthNum] = useState('')
    const [widthNum, setWidthNum] = useState('')
    const [heightNum, setHeightNum] = useState('')

    const [diseaseName, setDiseaseName] = useState('')

    // 桥梁id
    const [bridgeId, setBridgeId] = useState(route.params.memberList[0].bridgeid)
    // 部件名称
    const [storageMemberName, setStorageMemberName] =useState(route.params.routeParams.title)

    // =================================================
    React.useEffect(() => {
      saveData.current = {...diseaseData};
      try {

        if (baseData.membercheckdata) {
          console.log('保存baseData数据');
          setBaseDataStorage(JSON.stringify(baseData.membercheckdata))
        }
        if (route.params.thridData.datastr && baseData.membercheckdata) {
          let infoList = []
          route.params.thridData.datastr.forEach((item) => {
            // console.log('病害列表传入的datastr',item);
            baseData.membercheckdata.forEach((item1) => {
              if (item == item1.strid) {
                // console.log('取出来的item1',item1);
                infoList.push(item1)
              }
            })
          })
          setInfoList(infoList)
        } else if (!baseData.membercheckdata) {
          console.log('读取baseData数据');
          getBaseDataStorage('baseData')
        }

        if (diseaseData.diseaseName == undefined || diseaseData.diseaseName == '') {
          console.log('7777');
          diseaseData['diseaseName'] = route.params.thridData.checkinfoshort
          handleFormChenge(route.params.thridData.checkinfoshort, diseaseData.diseaseName)
        }
      } catch (err){
        console.log('err09', err);
      }
      try {
        // 初始构件类型与选择的构件类型一致时，构件区域取选择的值
        // 初始构件类型与选择的构件类型不一致时，构件区域默认取第一项
        for (let i =0; i < areaparam.length; i ++) {
          if (diseaseData.area == undefined) {
            diseaseData.area = areaparam[0].value
            handleFormChenge(areaparam[0].value, diseaseData.area)
            setAreaName(areaparam[0].label)
          } else if (diseaseData.area !== undefined) {
            let sliceArea = diseaseData.area.slice(0,6)
            if (sliceArea !== diseaseData.areatype) {
              for (let k = 0; k < baseData.components.length; k++) {
                if (diseaseData.areatype == baseData.components[k].areatype) {
                  diseaseData['areatype'] = baseData.components[k].areatype
                  diseaseData['area'] = baseData.components[k].areaparamjson.areaparamlist[0].areaparamid
                }
              }
            }
          }
        }
      } catch (err) {
        console.log('err08', err);
      }
      try {
        let lengthText = (diseaseData.memberLength * (diseaseData.disLength / 100)).toFixed(2)
        setLengthText(lengthText)
        let widthText = (diseaseData.memberWidth * (diseaseData.disWidth / 100)).toFixed(2)
        setWidthText(widthText)
        let heightText = (diseaseData.memberHeight * (diseaseData.disHeight / 100)).toFixed(2)
        setHeightText(heightText)
        if (lengthText == 'NaN') {
          let lengthText = '0'
          setLengthText(lengthText)
        }
        if (widthText == 'NaN') {
          let widthText = '0'
          setWidthText(widthText)
        }
        if (heightText == 'NaN') {
          let heightText = '0'
          setHeightText(heightText)
        }

        if (diseaseData.area == undefined) {

        } else if (diseaseData.area !== '' || diseaseData.area !== undefined || diseaseData.area !== '/') {
          var sliceArea = diseaseData.area.slice(0,5)
        }
        
        if (diseaseData.areatype == 'at0000' && sliceArea == 'at000') {
          console.log(sliceArea);
          console.log('xu~~~~~');
          diseaseData['area'] = '/'
        }
        
        // 将病害位置的长宽高数据存进diseaseData
        diseaseData['lengthText'] = lengthText
        diseaseData['widthText'] = widthText
        diseaseData['heightText'] = heightText
        diseaseData['remark'] = route.params.thridData.checkinfoshort


        // 取病害名称并保存
        if (diseaseData.diseaseName == '' || diseaseData.diseaseName == undefined) {
          let diseaseName = route.params.thridData.checkinfoshort
          // setDiseaseName(diseaseName)
          console.log('0000000');
          console.log('~~~~~~~diseaseName~~~~~',diseaseName);
          diseaseData['diseaseName'] = diseaseName
          handleFormChenge(diseaseName, diseaseData.diseaseName)
          setDiseaseName(diseaseName)
        }

        if (diseaseData.stairgroupid == undefined || diseaseData.stairgroupid == '') {
          // console.log('0000.000');
          diseaseData['stairgroupid'] = route.params.stairgroupid
          handleFormChenge(route.params.stairgroupid, diseaseData.stairgroupid)
        }

        // console.log(diseaseData);
        if (diseaseData.remark == '' || diseaseData.remark == undefined) {
          let infoshort = route.params.thridData.checkinfoshort
          setInfoShort(infoshort)
        }
        if (diseaseData.description == '' || diseaseData.description == undefined) {
          diseaseData['description'] = diseaseData.remark
          handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
        }

        if (diseaseData.writePositionTxt == undefined || diseaseData.writePositionTxt == '') {
          let writePositionTxt = '/'
          setWritePositionTxt(writePositionTxt)
          diseaseData['writePositionTxt'] = writePositionTxt
          handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
        }

        try {
          if (itemData && route.params.mediaType == 'add') {
            diseaseData['scale'] = rightScaleNum
            handleFormChenge(rightScaleNum, diseaseData.scale)
            route.params.mediaType = ''
          }
        } catch (error) {
          console.log('设置标度初始值',error);
        }
      } catch {
      }
    }, [diseaseData]);

    // 保存baseData的数据
    const setBaseDataStorage = async(value) => {
      try {
        await AsyncStorage.setItem('baseData', value)
      } catch (err) {
        console.log('存入数据失败!3', err);
      }
    }
    // 读取baseData的数据
    const getBaseDataStorage = async(name) => {
      // console.log('读取baseData数据')
      try {
        const value = await AsyncStorage.getItem(name)
        let values = JSON.parse(value)
        // console.log('value~~~',value);
        let infoList = []
          route.params.thridData.datastr.forEach((item) => {
            // console.log('病害列表传入的datastr',item);
            values.forEach((item1) => {
              if (item == item1.strid) {
                // console.log('取出来的item1',item1);
                infoList.push(item1)
              }
            })
          })
          setInfoList(infoList)
      } catch (error) {
        console.log('读取baseData数据失败',error);
      }
    }

    // 重新获取数据的标度选项数组
    const [rightScale, setRightScale] = useState([])
    // 默认的标度值
    const [rightScaleNum, setRightScaleNum] = useState('')
    // 重新获取数据的标度评定标准表格
    const [scaleTabel, setScaleTabel] = useState([])
  
    React.useEffect(() => {

      try {
        console.log('scale',scale);
        // console.log('baseData', baseData);
        // console.log('标度表格信息baseData.basestandardtable',baseData.basestandardtable)

        // 当页面是由新建进入时，存储标度数组，以备编辑进入时使用
        if (route.params.mediaType == 'add' || route.params.mediaType == '') {
          // =================================
          // 获取标度列表与标度默认值
          let scaleSelect = baseData.basestandardtable
          let oldArr = ''
          let scaleNum = ''
          scaleSelect.forEach(item => {
            // console.log('33330000',item.standardid);
            
            if (route.params.thridData.strandardid == item.standardid) {
              console.log('当前病害的标度选项',item);
              // setRightScale(item.standardscalestr)
              oldArr = item.standardscalestr
              scaleNum = item.standardscale
            }
          });
          setRightScaleNum(scaleNum)
          // console.log('rightScale',rightScale);
          const arr = oldArr.split(',')
          console.log('arr',arr);
          
          let resetArr = []
          arr.forEach((item, index) => {
            resetArr.push({
              label:index + 1,
              value:item
            })
          })
          console.log('resetArr',resetArr);
          setRightScale(resetArr)
          diseaseData['scaleArr'] = rightScale
          handleFormChenge(rightScale, diseaseData.scaleArr)

          // =================================
          // 获取标度评定标准表数据
          let scaleTabel = baseData.standardtableinfo
          // console.log('表格数据',scaleTabel);
          let oldTable = []
          scaleTabel.forEach((item) => {
            if (route.params.thridData.strandardid == item.standardid) {
              // console.log('当前的评定表item',item);
              oldTable.push(item)
            }
          })
          console.log('oldTable',oldTable);
          setScaleTabel(oldTable)
          diseaseData['scaleTableArr'] = oldTable
          handleFormChenge(oldTable, diseaseData.scaleTableArr)


        } else if (route.params.mediaType == 'edit') {
          // 当页面是由编辑进入时
          setRightScale(diseaseData.scaleArr)
          setScaleTabel(scaleTabel)
          // console.log('rightScale222222',rightScale);
        }
      } catch (error) {
        console.log('获取标度数据',error);
      }

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
            // .map(
            //   ({strname, strvalue, strunit}) =>
            //     `${strname}${saveData.current[strvalue] || 0}@@${
            //       strunit || ''
            //     }@@`,
            // )
            .map(
              ({strname, strvalue, strunit}) =>
                `${saveData.current[strvalue] == undefined ? '' : strname + saveData.current[strvalue] + '@@' + strunit + '@@'}`
            )
            const strr = str.filter(item => item!=='') == '' ? '/' : str.filter(item => item!=='')
            // .join(',');
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
            }，${strr}`,
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

    useEffect(() => {
      // console.log('桥跨：：',route.params.memberList);
      let defaultPier = route.params.memberList[0].membername
      // 提取第一个字符进行判断（表示墩台的数据）
      let firstDefaultPier = defaultPier.slice(0,1)
      if (firstDefaultPier == 1) {
        let pier = '距' + (firstDefaultPier - 1) + '#台'
        setPier(pier)
        console.log('dundun:', pier);
      } else {
        let pier = '距' + (firstDefaultPier - 1) + '#墩'
        setPier(pier)
        console.log('dundun:', pier);
      }

      

      console.log('构件区域列表：：',areaparam);
      // console.log('表单中的构件区域',diseaseData.area);
      if (areaparam == '' || areaparam == undefined) {
        console.log('选的其他');
        try{
         console.log('构件类型', itemData.areatype); 
         if (itemData.areatype == 'at0000' || itemData.areatype == undefined) {
          // console.log('9999');
          diseaseData['area'] = '/'
          let labelName = 'at0000'
          setLabelName(labelName)
         }
        } catch {

        }
      }
    },[])

    const handleScaleOpen = () => scaleInfoRef.current.open();
    const handleFormChenge = ({name, value}) => {
      // const _data = {
      //   ...diseaseData,
      //   [name]: value,
      // };
      let unitt = JSON.stringify(diseaseData, [
          'areatype','area','scale','lengthText','widthText','heightText','memberLength','memberWidth',
        'memberHeight','disLength','disWidth','disHeight','hzbrmc_length_m','hzbrmc_length_cm','hzbrmc_length_mm','hzbrmc_width_m',
        'hzbrmc_width_cm','hzbrmc_width_mm','hzbrmc_height_m','hzbrmc_height_cm','hzbrmc_height_mm',
        'hzbrmc_area_face','hzbrmc_area_per','hzbrmc_area_m','hzbrmc_area_cm','hzbrmc_area_mm',
        'hzbrmc_heightdiff_cm','hzbrmc_heightdiff_mm','hzbrmc_spacing_cm','hzbrmc_deformation_mm',
        'hzbrmc_num','hzbrmc_range_cm','hzbrmc_range_mm','hzbrmc_depth_cm','hzbrmc_depth_mm',
        'hzbrmc_volume_m','hzbrmc_volume_cm','hzbrmc_disp_cm','hzbrmc_disp_mm','hzbrmc_angle_c',
        'hzbrmc_chu','hzbrmc_tiao','hzbrmc_range_fenbu_m','hzbrmc_range_length_m','hzbrmc_range_width_mm',
        'hzbrmc_range_spacing_cm','hzbrmc_lb_left_length_m','hzbrmc_lb_bottom_length_m','hzbrmc_lb_right_length_m',
        'hzbrmc_lb_left_width_mm','hzbrmc_lb_bottom_width_mm','hzbrmc_lb_right_width_mm','hzbrmc_slant_m'])
      // console.log(unitt);
      let unit = JSON.parse(unitt)
      diseaseData['unit'] = unit
      // const {area,areatype,scale,hzbrmc_length_m,hzbrmc_length_cm,hzbrmc_length_mm,hzbrmc_width_m,hzbrmc_width_cm,
      //   hzbrmc_width_mm,hzbrmc_height_m,hzbrmc_height_cm,hzbrmc_height_mm,hzbrmc_area_face,hzbrmc_area_per,
      //   hzbrmc_area_m,hzbrmc_area_cm,hzbrmc_area_mm,hzbrmc_heightdiff_cm,hzbrmc_heightdiff_mm,hzbrmc_spacing_cm,
      //   hzbrmc_deformation_mm,hzbrmc_num,hzbrmc_range_cm,hzbrmc_range_mm,hzbrmc_depth_cm,hzbrmc_depth_mm,
      //   hzbrmc_volume_m,hzbrmc_volume_cm,hzbrmc_disp_cm,hzbrmc_disp_mm,hzbrmc_angle_c,hzbrmc_chu,hzbrmc_tiao,
      //   hzbrmc_range_fenbu_m,hzbrmc_range_length_m,hzbrmc_range_width_mm,hzbrmc_range_spacing_cm,hzbrmc_lb_left_length_m,
      //   hzbrmc_lb_bottom_length_m,hzbrmc_lb_right_length_m,hzbrmc_lb_left_width_mm,hzbrmc_lb_bottom_width_mm,
      //   hzbrmc_lb_right_width_mm,hzbrmc_slant_m,lengthText,widthText,heightText,memberLength,memberWidth,
      //   memberHeight,disLength,disWidth,disHeight,...rest} = diseaseData
      const _data = {
        ...diseaseData,
        [name]: value,
      };
      if (name === 'checktypeid') {
        const _type = route.params.type.list.find(
          item => value === item.checktypeid,
        );
        let defaultScaleVal = '';
        if (_type) {
          defaultScaleVal = _type?.standardscale;
        }
        _data.scale = defaultScaleVal;
        const {basestandardtable, infoComponents} = baseData;
        const standardid =
          infoComponents.find(({checktypeid}) => value === checktypeid)
            ?.standardid || '';
        if (standardid) {
          const _standardscale = basestandardtable.find(
            item => standardid === item.standardid,
          )?.standardscale;
          if (_standardscale) {
            _data.standard = {
              scale: _standardscale,
              id: standardid,
            };
          } else {
            const defaultScale = basestandardtable.find(
              item => item.standardid === 'JTG-TH21-2011-T000-0',
            )?.standardscale;
            _data.standard = {
              scale: defaultScale,
              id: 'JTG-TH21-2011-T000-0',
            };
          }
        }
        _data.scale = _data.scale || '';
      }


      if (value) {
        // 向病害描述函数里传入
        writeDesText(name, value)
      }

      if (name == 'scale') {
        // 标度
        let biaodu = ',标度' + value + '@@'
        setBiaodu(biaodu)
      } else if (name == 'hzbrmc_length_m') {
        //长度 - 米
        // let lengthM = ',长度' + value + '@@米@@'
        // setLengthM(lengthM)
        if (value == '' || value == 0) {
          let lengthM = ''
          setLengthM(lengthM)
        } else {
          let lengthM = ',长度' + value + '@@米@@'
          setLengthM(lengthM)
        }
      } else if (name == 'hzbrmc_length_cm') {
        // 长度 - 厘米
        // let lengthCM = ',长度' + value + '@@厘米@@'
        // setLengthCM(lengthCM)
        if (value == '' || value == 0) {
          let lengthCM = ''
          setLengthCM(lengthCM)
        } else {
          let lengthCM = ',长度' + value + '@@厘米@@'
          setLengthCM(lengthCM)
        }
      } else if (name == 'hzbrmc_length_mm') {
        // 长度 - 毫米
        // let lengthMM = ',长度' + value + '@@毫米@@'
        // setLengthMM(lengthMM)
        if (value == '' || value == 0) {
          let lengthMM = ''
          setLengthMM(lengthMM)
        } else {
          let lengthMM = ',长度' + value + '@@毫米@@'
          setLengthMM(lengthMM)
        }
      } else if (name == 'hzbrmc_width_m') {
        // 宽度 - 米
        // let widthM = ',宽度' + value + '@@米@@'
        // setWidthM(widthM)
        if (value == '' || value == 0) {
          let widthM = ''
          setWidthM(widthM)
        } else {
          let widthM = ',宽度' + value + '@@米@@'
          setWidthM(widthM)
        }
      } else if (name == 'hzbrmc_width_cm') {
        // 宽度 - 厘米
        // let widthCM = ',宽度' + value + '@@厘米@@'
        // setWidthCM(widthCM)
        if (value == '' || value == 0) {
          let widthCM = ''
          setWidthCM(widthCM)
        } else {
          let widthCM = ',宽度' + value + '@@厘米@@'
          setWidthCM(widthCM)
        }
      } else if (name == 'hzbrmc_width_mm') {
        // 宽度 - 毫米
        if (value == '' || value == 0) {
          let widthMM = ''
          setWidthMM(widthMM)
        } else {
          let widthMM = ',宽度' + value + '@@毫米@@'
          setWidthMM(widthMM)
        }
      } else if (name == 'hzbrmc_height_m') {
        // 高度 - 米
        // let heightM = ',高度' + value + '@@米@@'
        // setHeightM(heightM)
        if (value == '' || value == 0) {
          let heightM = ''
          setHeightM(heightM)
        } else {
          let heightM = ',高度' + value + '@@米@@'
          setHeightM(heightM)
        }
      } else if (name == 'hzbrmc_height_cm') {
        // 高度 - 厘米
        if (value == '' || value == 0) {
          let heightCM = ''
          setHeightCM(heightCM)
        } else {
          let heightCM = ',高度' + value + '@@厘米@@'
          setHeightCM(heightCM)
        }
      } else if (name == 'hzbrmc_height_mm') {
        // 高度 - 毫米
        // let heightMM = ',高度' + value + '@@毫米@@'
        // setHeightMM(heightMM)
        if (value == '' || value == 0) {
          let heightMM = ''
          setHeightMM(heightMM)
        } else {
          let heightMM = ',高度' + value + '@@毫米@@'
          setHeightMM(heightMM)
        }
      } else if (name == 'hzbrmc_area_face') {
        // 面域 - %
        // let areaFace = ',面域' + value + '@@%@@'
        // setAreaFace(areaFace)
        if (value == '' || value == 0) {
          let areaFace = ''
          setAreaFace(areaFace)
        } else {
          let areaFace = ',面域' + value + '@@%@@'
          setAreaFace(areaFace)
        }
      } else if (name == 'hzbrmc_area_per') {
        // 面积占比 - %
        // let areaPer = ',面积占比' + value + '@@%@@'
        // setAreaPer(areaPer)
        if (value == '' || value == 0) {
          let areaPer = ''
          setAreaPer(areaPer)
        } else {
          let areaPer = ',面积占比' + value + '@@%@@'
          setAreaPer(areaPer)
        }
      } else if (name == 'hzbrmc_area_m') {
        // 面积 - 平方米
        // let areaM = ',面积' + value + '@@平方米@@'
        // setAreaM(areaM)
        if (value == '' || value == 0) {
          let areaM = ''
          setAreaM(areaM)
        } else {
          let areaM = ',面积' + value + '@@平方米@@'
          setAreaM(areaM)
        }
      } else if (name == 'hzbrmc_area_cm') {
        // 面积 - 平方厘米
        // let areaCM = ',面积' + value + '@@平方厘米@@'
        // setAreaCM(areaCM)
        if (value == '' || value == 0) {
          let areaCM = ''
          setAreaCM(areaCM)
        } else {
          let areaCM = ',面积' + value + '@@平方厘米@@'
          setAreaCM(areaCM)
        }
      } else if (name == 'hzbrmc_area_mm') {
        // 面积 - 平方毫米
        // let areaMM = ',面积' + value + '@@平方毫米@@'
        // setAreaMM(areaMM)
        if (value == '' || value == 0) {
          let areaMM = ''
          setAreaMM(areaMM)
        } else {
          let areaMM = ',面积' + value + '@@平方毫米@@'
          setAreaMM(areaMM)
        }
      } else if (name == 'hzbrmc_heightdiff_cm') {
        // 高差 - 厘米
        // let heightDiffCM = ',高差' + value + '@@厘米@@'
        // setHeightDiffCM(heightDiffCM)
        if (value == '' || value == 0) {
          let heightDiffCM = ''
          setHeightDiffCM(heightDiffCM)
        } else {
          let heightDiffCM = ',高差' + value + '@@厘米@@'
          setHeightDiffCM(heightDiffCM)
        }
      } else if (name == 'hzbrmc_heightdiff_mm') {
        // 高差 - 毫米
        // let heightDiffMM = ',高差' + value + '@@毫米@@'
        // setHeightDiffMM(heightDiffMM)
        if (value == '' || value == 0) {
          let heightDiffMM = ''
          setHeightDiffMM(heightDiffMM)
        } else {
          let heightDiffMM = ',高差' + value + '@@毫米@@'
          setHeightDiffMM(heightDiffMM)
        }
      } else if (name == 'hzbrmc_spacing_cm') {
        // 间距 - 厘米
        // let spacingCM = ',间距' + value + '@@厘米@@'
        // setSpacingCM(spacingCM)
        if (value == '' || value == 0) {
          let spacingCM = ',间距' + value + '@@厘米@@'
          setSpacingCM(spacingCM)
        } else {
          let spacingCM = ',间距' + value + '@@厘米@@'
          setSpacingCM(spacingCM)
        }
      } else if (name == 'hzbrmc_deformation_mm') {
        // 变形 - 毫米
        // let deformationMM = ',变形' + value + '@@毫米@@'
        // setDeformationMM(deformationMM)
        if (value == '' || value == 0) {
          let deformationMM = ''
          setDeformationMM(deformationMM)
        } else {
          let deformationMM = ',变形' + value + '@@毫米@@'
          setDeformationMM(deformationMM)
        }
      } else if (name == 'hzbrmc_num') {
        // 个数 - 个
        // let num = ',个数' + value + '@@个@@'
        // setNum(num)
        if (value == '' || value == 0) {
          let num = ''
          setNum(num)
        } else {
          let num = ',个数' + value + '@@个@@'
          setNum(num)
        }
      } else if (name == 'hzbrmc_range_cm') {
        // 距离 - 厘米
        // let rangeCM = ',距离' + value + '@@厘米@@'
        // setRangeCM(rangeCM)
        if (value == '' || value == 0) {
          let rangeCM = ''
          setRangeCM(rangeCM)
        } else {
          let rangeCM = ',距离' + value + '@@厘米@@'
          setRangeCM(rangeCM)
        }
      } else if (name == 'hzbrmc_range_mm') {
        // 距离 - 毫米
        // let rangeMM = ',距离' + value + '@@毫米@@'
        // setRangeMM(rangeMM)
        if (value == '' || value == 0) {
          let rangeMM = ''
          setRangeMM(rangeMM)
        } else {
          let rangeMM = ',距离' + value + '@@毫米@@'
          setRangeMM(rangeMM)
        }
      } else if (name == 'hzbrmc_depth_cm') {
        // 深度 - 厘米
        // let depthCM = ',深度' + value + '@@厘米@@'
        // setDepthCM(depthCM)
        if (value == '' || value == 0) {
          let depthCM = ''
          setDepthCM(depthCM)
        } else {
          let depthCM = ',深度' + value + '@@厘米@@'
          setDepthCM(depthCM)
        }
      } else if (name == 'hzbrmc_depth_mm') {
        // 深度 - 毫米
        // let depthMM = ',深度' + value + '@@毫米@@'
        // setDepthMM(depthMM)
        if (value == '' || value == 0) {
          let depthMM = ''
          setDepthMM(depthMM)
        } else {
          let depthMM = ',深度' + value + '@@毫米@@'
          setDepthMM(depthMM)
        }
      } else if (name == 'hzbrmc_volume_m') {
        // 体积 - 立方米
        // let volumeM = ',体积' + value + '@@立方米@@'
        // setVolumeM(volumeM)
        if (value == '' || value == 0) {
          let volumeM = ''
          setVolumeM(volumeM)
        } else {
          let volumeM = ',体积' + value + '@@立方米@@'
          setVolumeM(volumeM)
        }
      } else if (name == 'hzbrmc_volume_cm') {
        // 体积 - 立方厘米
        // let volumeCM = ',体积' + value + '@@立方厘米@@'
        // setVolumeCM(volumeCM)
        if (value == '' || value == 0) {
          let volumeCM = ''
          setVolumeCM(volumeCM)
        } else {
          let volumeCM = ',体积' + value + '@@立方厘米@@'
          setVolumeCM(volumeCM)
        }
      } else if (name == 'hzbrmc_disp_cm') {
        // 位移 - 厘米
        // let dispCM = ',位移' + value + '@@厘米@@'
        // setDispCM(dispCM)
        if (value == '' || value == 0) {
          let dispCM = ''
          setDispCM(dispCM)
        } else {
          let dispCM = ',位移' + value + '@@厘米@@'
          setDispCM(dispCM)
        }
      } else if (name == 'hzbrmc_disp_mm') {
        // 位移 - 毫米
        // let dispMM = ',位移' + value + '@@毫米@@'
        // setDispMM(dispMM)
        if (value == '' || value == 0) {
          let dispMM = ''
          setDispMM(dispMM)
        } else {
          let dispMM = ',位移' + value + '@@毫米@@'
          setDispMM(dispMM)
        }
      } else if (name == 'hzbrmc_angle_c') {
        // 角度 - 度
        // let angle = ',角度' + value + '@@度@@'
        // setAngle(angle)
        if (value == '' || value == 0) {
          let angle = ''
          setAngle(angle)
        } else {
          let angle = ',角度' + value + '@@度@@'
          setAngle(angle)
        }
      } else if (name == 'hzbrmc_chu') {
        // 处
        // let chu = ',' + value + '@@处@@'
        // setChu(chu)
        if (value == '' || value == 0) {
          let chu = ''
          setChu(chu)
        } else {
          let chu = ',' + value + '@@处@@'
          setChu(chu)
        }
      } else if (name == 'hzbrmc_tiao') {
        // 条
        // let tiao = ',' + value + '@@条@@'
        // setTiao(tiao)
        if (value == '' || value == 0) {
          let tiao = ''
          setTiao(tiao)
        } else {
          let tiao = ',' + value + '@@条@@'
          setTiao(tiao)
        }
      } else if (name == 'hzbrmc_range_fenbu_m') {
        // 分布范围 - 米
        // let rangeFenbuM = ',分布范围' + value + '@@米@@'
        // setRangeFenbuM(rangeFenbuM)
        if (value == '' || value == 0) {
          let rangeFenbuM = ''
          setRangeFenbuM(rangeFenbuM)
        } else {
          let rangeFenbuM = ',分布范围' + value + '@@米@@'
          setRangeFenbuM(rangeFenbuM)
        }
      } else if (name == 'hzbrmc_range_length_m') {
        // 长度范围 - 米
        // let rangeLengthM = ',长度范围' + value + '@@米@@'
        // setRangeLengthM(rangeLengthM)
        if (value == '' || value == 0) {
          let rangeLengthM = ''
          setRangeLengthM(rangeLengthM)
        } else {
          let rangeLengthM = ',长度范围' + value + '@@米@@'
          setRangeLengthM(rangeLengthM)
        }
      } else if (name == 'hzbrmc_range_width_mm') {
        // 宽度范围 - 毫米
        // let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
        // setRangeWidthMM(rangeWidthMM)
        if (value == '' || value == 0) {
          let rangeWidthMM = ''
          setRangeWidthMM(rangeWidthMM)
        } else {
          let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
          setRangeWidthMM(rangeWidthMM)
        }
      } else if (name == 'hzbrmc_range_spacing_cm') {
        // 间距范围 - 厘米
        // let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
        // setRangeSpacingCM(rangeSpacingCM)
        if (value == '' || value == 0) {
          let rangeSpacingCM = ''
          setRangeSpacingCM(rangeSpacingCM)
        } else {
          let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
          setRangeSpacingCM(rangeSpacingCM)
        }
      } else if (name == 'hzbrmc_lb_left_length_m') {
        // 左腹板长度 - 米
        // let leftLengthM = ',左腹板长度' + value + '@@米@@'
        // setLeftLengthM(leftLengthM)
        if (value == '' || value == 0) {
          let leftLengthM = ''
          setLeftLengthM(leftLengthM)
        } else {
          let leftLengthM = ',左腹板长度' + value + '@@米@@'
          setLeftLengthM(leftLengthM)
        }
      } else if (name == 'hzbrmc_lb_bottom_length_m') {
        // 底板长度 - 米
        // let bottomLengthM = ',底板长度' + value + '@@米@@'
        // setBottomLengthM(bottomLengthM)
        if (value == '' || value == 0) {
          let bottomLengthM = ''
          setBottomLengthM(bottomLengthM)
        } else {
          let bottomLengthM = ',底板长度' + value + '@@米@@'
          setBottomLengthM(bottomLengthM)
        }
      } else if (name == 'hzbrmc_lb_right_length_m') {
        // 右腹板长度 - 米
        // let rightLengthM = ',右腹板长度' + value + '@@米@@'
        // setRightLengthM(rightLengthM)
        if (value == '' || value == 0) {
          let rightLengthM = ''
          setRightLengthM(rightLengthM)
        } else {
          let rightLengthM = ',右腹板长度' + value + '@@米@@'
          setRightLengthM(rightLengthM)
        }
      } else if (name == 'hzbrmc_lb_left_width_mm') {
        // 左腹板宽度 - 毫米
        // let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
        // setLeftWidthMM(leftWidthMM)
        if (value == '' || value == 0) {
          let leftWidthMM = ''
          setLeftWidthMM(leftWidthMM)
        } else {
          let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
          setLeftWidthMM(leftWidthMM)
        }
      } else if (name == 'hzbrmc_lb_bottom_width_mm') {
        // 底板宽度 - 毫米
        // let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
        // setBottomWidthMM(bottomWidthMM)
        if (value == '' || value == 0) {
          let bottomWidthMM = ''
          setBottomWidthMM(bottomWidthMM)
        } else {
          let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
          setBottomWidthMM(bottomWidthMM)
        }
      } else if (name == 'hzbrmc_lb_right_width_mm') {
        // 右腹板宽度 - 毫米
        // let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
        // setRightWidthMM(rightWidthMM)
        if (value == '' || value == 0) {
          let rightWidthMM = ''
          setRightWidthMM(rightWidthMM)
        } else {
          let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
          setRightWidthMM(rightWidthMM)
        }
      } else if (name == 'hzbrmc_slant_m') {
        // 倾斜量 - 米
        // let slantM = ',倾斜量' + value + '@@米@@'
        // setSlantM(slantM)
        if (value == '' || value == 0) {
          let slantM = ''
          setSlantM(slantM)
        } else {
          let slantM = ',倾斜量' + value + '@@米@@'
          setSlantM(slantM)
        }
      }
      setDiseaseData(_data);
    };

    const [writeDesTextValue, setWriteDesTextValue] = useState('')

    // 填入病害描述内容
    const writeDesText = (name, value) => {
      // let writeTxt = []
      console.log('writeDesText', name, value);
      setWriteDesTextValue(value)

      if (name == 'memberLength') {
        diseaseData['memberLength'] = value
        handleFormChenge(value, diseaseData.memberLength)
      } else if (name == 'memberWidth') {
        diseaseData['memberWidth'] = value
        handleFormChenge(value, diseaseData.memberWidth)
      } else if (name == 'memberHeight') {
        diseaseData['memberHeight'] = value
        handleFormChenge(value, diseaseData.memberHeight)
      }


      console.log('diseaseData.memberLength1',diseaseData.memberLength, diseaseData.memberWidth, diseaseData.memberHeight);
      console.log('name value1', name, value);

      // 当数据是长宽高的时候，进行数据存储
      if (name == 'memberLength' || name == 'memberWidth' || name == 'memberHeight') {
        setStorage(name, value)
      }

      if (true) {
        if (diseaseData.scale !== '' && diseaseData.scale !== '0' && diseaseData.scale !== '') {
          var biaodu = ',标度' + diseaseData.scale + '@@'
          setBiaodu(biaodu)
        } else {
          var biaodu = ''
          setBiaodu(biaodu)
        }
        if (diseaseData.hzbrmc_length_m !== undefined && diseaseData.hzbrmc_length_m !== '0' && diseaseData.hzbrmc_length_m !== '') {
          var lengthM = ',长度' + diseaseData.hzbrmc_length_m + '@@米@@'
          setLengthM(lengthM)
        } else {
          var lengthM = ''
          setLengthM(lengthM)
        }
        if (diseaseData.hzbrmc_length_cm !== undefined && diseaseData.hzbrmc_length_cm !== '0' && diseaseData.hzbrmc_length_cm !== '') {
          var lengthCM = ',长度' + diseaseData.hzbrmc_length_cm + '@@厘米@@'
          setLengthCM(lengthCM)
        } else {
          var lengthCM = ''
          setLengthCM(lengthCM)
        }
        if (diseaseData.hzbrmc_length_mm !== undefined && diseaseData.hzbrmc_length_mm !== '0' && diseaseData.hzbrmc_length_mm !== '') {
          var lengthMM = ',长度' + diseaseData.hzbrmc_length_mm + '@@毫米@@'
          setLengthMM(lengthMM)
        } else {
          var lengthMM = ''
          setLengthMM(lengthMM)
        }
        if (diseaseData.hzbrmc_width_m !== undefined && diseaseData.hzbrmc_width_m !== '0' && diseaseData.hzbrmc_width_m !== '') {
          var widthM = ',宽度' + diseaseData.hzbrmc_width_m + '@@米@@'
          setWidthM(widthM)
        } else {
          var widthM = ''
          setWidthM(widthM)
        }
        if (diseaseData.hzbrmc_width_cm !== undefined && diseaseData.hzbrmc_width_cm !== '0' && diseaseData.hzbrmc_width_cm !== '') {
          var widthCM = ',宽度' + diseaseData.hzbrmc_width_cm + '@@厘米@@'
          setWidthCM(widthCM)
        } else {
          var widthCM = ''
          setWidthCM(widthCM)
        }
        if (diseaseData.hzbrmc_width_mm !== undefined && diseaseData.hzbrmc_width_mm !== '0' && diseaseData.hzbrmc_width_mm !== '') {
          console.log('diseaseData.hzbrmc_width_mm',diseaseData.hzbrmc_width_mm == '');
          var widthMM = ',宽度' + diseaseData.hzbrmc_width_mm + '@@毫米@@'
          setWidthMM(widthMM)
        } else {
          // diseaseData.hzbrmc_width_mm == undefined || diseaseData.hzbrmc_width_mm == 0 || diseaseData.hzbrmc_width_mm == ''
          var widthMM = ''
          setWidthMM(widthMM)
        }
        if (diseaseData.hzbrmc_height_m !== undefined && diseaseData.hzbrmc_height_m !== '0' && diseaseData.hzbrmc_height_m !== '') {
          var heightM = ',高度' + diseaseData.hzbrmc_height_m + '@@米@@'
          setHeightM(heightM)
        } else {
          var heightM = ''
          setHeightM(heightM)
        }
        if (diseaseData.hzbrmc_height_cm !== undefined && diseaseData.hzbrmc_height_cm !== '0' && diseaseData.hzbrmc_height_cm !== '') {
          var heightCM = ',高度' + diseaseData.hzbrmc_height_cm + '@@厘米@@'
          setHeightCM(heightCM)
        } else {
          var heightCM = ''
          setHeightCM(heightCM)
        }
        if (diseaseData.hzbrmc_height_mm !== undefined && diseaseData.hzbrmc_height_mm !== '0' && diseaseData.hzbrmc_height_mm !== '') {
          var heightMM = ',高度' + diseaseData.hzbrmc_height_mm + '@@毫米@@'
          setHeightMM(heightMM)
        } else {
          var heightMM = ''
          setHeightMM(heightMM)
        }
        if (diseaseData.hzbrmc_area_face !== undefined && diseaseData.hzbrmc_area_face !== '0' && diseaseData.hzbrmc_area_face !== '') {
          var areaFace = ',面域' + diseaseData.hzbrmc_area_face + '@@%@@'
          setAreaFace(areaFace)
        } else {
          var areaFace = ''
          setAreaFace(areaFace)
        }
        if (diseaseData.hzbrmc_area_per !== undefined && diseaseData.hzbrmc_area_per !== '0' && diseaseData.hzbrmc_area_per !== '') {
          var areaPer = ',面积占比' + diseaseData.hzbrmc_area_per + '@@%@@'
          setAreaPer(areaPer)
        } else {
          var areaPer = ''
          setAreaPer(areaPer)
        }
        if (diseaseData.hzbrmc_area_m !== undefined && diseaseData.hzbrmc_area_m !== '0' && diseaseData.hzbrmc_area_m !== '') {
          var areaM = ',面积' + diseaseData.hzbrmc_area_m + '@@平方米@@'
          setAreaM(areaM)
        } else {
          var areaM = ''
          setAreaM(areaM)
        }
        if (diseaseData.hzbrmc_area_cm !== undefined && diseaseData.hzbrmc_area_cm !== '0' && diseaseData.hzbrmc_area_cm !== '') {
          var areaCM = ',面积' + diseaseData.hzbrmc_area_cm + '@@平方厘米@@'
          setAreaCM(areaCM)
        } else {
          var areaCM = ''
          setAreaCM(areaCM)
        }
        if (diseaseData.hzbrmc_area_mm !== undefined && diseaseData.hzbrmc_area_mm !== '0' && diseaseData.hzbrmc_area_mm !== '') {
          var areaMM = ',面积' + diseaseData.hzbrmc_area_mm + '@@平方毫米@@'
          setAreaMM(areaMM)
        } else {
          var areaMM = ''
          setAreaMM(areaMM)
        }
        if (diseaseData.hzbrmc_heightdiff_cm !== undefined && diseaseData.hzbrmc_heightdiff_cm !== '0' && diseaseData.hzbrmc_heightdiff_cm !== '') {
          var heightDiffCM = ',高差' + diseaseData.hzbrmc_heightdiff_cm + '@@厘米@@'
          setHeightDiffCM(heightDiffCM)
        } else {
          var heightDiffCM = ''
          setHeightDiffCM(heightDiffCM)
        }
        if (diseaseData.hzbrmc_heightdiff_mm !== undefined && diseaseData.hzbrmc_heightdiff_mm !== '0' && diseaseData.hzbrmc_heightdiff_mm !== '') {
          var heightDiffMM = ',高差' + diseaseData.hzbrmc_heightdiff_mm + '@@毫米@@'
          setHeightDiffMM(heightDiffMM)
        } else {
          var heightDiffMM = ''
          setHeightDiffMM(heightDiffMM)
        }
        if (diseaseData.hzbrmc_spacing_cm !== undefined && diseaseData.hzbrmc_spacing_cm !== '0' && diseaseData.hzbrmc_spacing_cm !== '') {
          var spacingCM = ',间距' + diseaseData.hzbrmc_spacing_cm + '@@厘米@@'
          setSpacingCM(spacingCM)
        } else {
          var spacingCM = ''
          setSpacingCM(spacingCM)
        }
        if (diseaseData.hzbrmc_deformation_mm !== undefined && diseaseData.hzbrmc_deformation_mm !== '0' && diseaseData.hzbrmc_deformation_mm !== '') {
          var deformationMM = ',变形' + diseaseData.hzbrmc_deformation_mm + '@@毫米@@'
          setDeformationMM(deformationMM)
        } else {
          var deformationMM = ''
          setDeformationMM(deformationMM)
        }
        if (diseaseData.hzbrmc_num !== undefined && diseaseData.hzbrmc_num !== '0' && diseaseData.hzbrmc_num !== '') {
          var num = ',个数' + diseaseData.hzbrmc_num + '@@个@@'
          setNum(num)
        } else {
          var num = ''
          setNum(num)
        }
        if (diseaseData.hzbrmc_range_cm !== undefined && diseaseData.hzbrmc_range_cm !== '0' && diseaseData.hzbrmc_range_cm !== '') {
          var rangeCM = ',距离' + diseaseData.hzbrmc_range_cm + '@@厘米@@'
          setRangeCM(rangeCM)
        } else {
          var rangeCM = ''
          setRangeCM(rangeCM)
        }
        if (diseaseData.hzbrmc_range_mm !== undefined && diseaseData.hzbrmc_range_mm !== '0' && diseaseData.hzbrmc_range_mm !== '') {
          var rangeMM = ',距离' + diseaseData.hzbrmc_range_mm + '@@毫米@@'
          setRangeMM(rangeMM)
        } else {
          var rangeMM = ''
          setRangeMM(rangeMM)
        }
        if (diseaseData.hzbrmc_depth_cm !== undefined && diseaseData.hzbrmc_depth_cm !== '0' && diseaseData.hzbrmc_depth_cm !== '') {
          var depthCM = ',深度' + diseaseData.hzbrmc_depth_cm + '@@厘米@@'
          setDepthCM(depthCM)
        } else {
          var depthCM = ''
          setDepthCM(depthCM)
        }
        if (diseaseData.hzbrmc_depth_mm !== undefined && diseaseData.hzbrmc_depth_mm !== '0' && diseaseData.hzbrmc_depth_mm !== '') {
          var depthMM = ',深度' + diseaseData.hzbrmc_depth_mm + '@@毫米@@'
          setDepthMM(depthMM)
        } else {
          var depthMM = ''
          setDepthMM(depthMM)
        }
        if (diseaseData.hzbrmc_volume_m !== undefined && diseaseData.hzbrmc_volume_m !== '0' && diseaseData.hzbrmc_volume_m !== '') {
          var volumeM = ',体积' + diseaseData.hzbrmc_volume_m + '@@立方米@@'
          setVolumeM(volumeM)
        } else {
          var volumeM = ''
          setVolumeM(volumeM)
        }
        if (diseaseData.hzbrmc_volume_cm !== undefined && diseaseData.hzbrmc_volume_cm !== '0' && diseaseData.hzbrmc_volume_cm !== '') {
          var volumeCM = ',体积' + diseaseData.hzbrmc_volume_cm + '@@立方厘米@@'
          setVolumeCM(volumeCM)
        } else {
          var volumeCM = ''
          setVolumeCM(volumeCM)
        }
        if (diseaseData.hzbrmc_disp_cm !== undefined && diseaseData.hzbrmc_disp_cm !== '0' && diseaseData.hzbrmc_disp_cm !== '') {
          var dispCM = ',位移' + diseaseData.hzbrmc_disp_cm + '@@厘米@@'
          setDispCM(dispCM)
        } else {
          var dispCM = ''
          setDispCM(dispCM)
        }
        if (diseaseData.hzbrmc_disp_mm !== undefined && diseaseData.hzbrmc_disp_mm !== '0' && diseaseData.hzbrmc_disp_mm !== '') {
          var dispMM = ',位移' + diseaseData.hzbrmc_disp_mm + '@@毫米@@'
          setDispMM(dispMM)
        } else {
          var dispMM = ''
          setDispMM(dispMM)
        }
        if (diseaseData.hzbrmc_angle_c !== undefined && diseaseData.hzbrmc_angle_c !== '0' && diseaseData.hzbrmc_angle_c !== '') {
          var angle = ',角度' + diseaseData.hzbrmc_angle_c + '@@度@@'
          setAngle(angle)
        } else {
          var angle = ''
          setAngle(angle)
        }
        if (diseaseData.hzbrmc_chu !== undefined && diseaseData.hzbrmc_chu !== '0' && diseaseData.hzbrmc_chu !== '') {
          var chu = ',' + diseaseData.hzbrmc_chu + '@@处@@'
          setChu(chu)
        } else {
          var chu = ''
          setChu(chu)
        }
        if (diseaseData.hzbrmc_tiao !== undefined && diseaseData.hzbrmc_tiao !== '0' && diseaseData.hzbrmc_tiao !== '') {
          var tiao = ',' + diseaseData.hzbrmc_tiao + '@@条@@'
          setTiao(tiao)
        } else {
          var tiao = ''
          setTiao(tiao)
        }
        if (diseaseData.hzbrmc_range_fenbu_m !== undefined && diseaseData.hzbrmc_range_fenbu_m !== '0' && diseaseData.hzbrmc_range_fenbu_m !== '') {
          var rangeFenbuM = ',分布范围' + diseaseData.hzbrmc_range_fenbu_m + '@@米@@'
          setRangeFenbuM(rangeFenbuM)
        } else {
          var rangeFenbuM = ''
          setRangeFenbuM(rangeFenbuM)
        }
        if (diseaseData.hzbrmc_range_length_m !== undefined && diseaseData.hzbrmc_range_length_m !== '0' && diseaseData.hzbrmc_range_length_m !== '') {
          var rangeLengthM = ',长度范围' + diseaseData.hzbrmc_range_length_m + '@@米@@'
          setRangeLengthM(rangeLengthM)
        } else {
          var rangeLengthM = ''
          setRangeLengthM(rangeLengthM)
        }
        if (diseaseData.hzbrmc_range_width_mm !== undefined && diseaseData.hzbrmc_range_width_mm !== '0' && diseaseData.hzbrmc_range_width_mm !== '') {
          var rangeWidthMM = ',宽度范围'+ diseaseData.hzbrmc_range_width_mm + '@@毫米@@'
          setRangeWidthMM(rangeWidthMM)
        } else {
          var rangeWidthMM = ''
          setRangeWidthMM(rangeWidthMM)
        }
        if (diseaseData.hzbrmc_range_spacing_cm !== undefined && diseaseData.hzbrmc_range_spacing_cm !== '0' && diseaseData.hzbrmc_range_spacing_cm !== '') {
          var rangeSpacingCM = ',间距范围' + diseaseData.hzbrmc_range_spacing_cm + '@@厘米@@'
          setRangeSpacingCM(rangeSpacingCM)
        } else {
          var rangeSpacingCM = ''
          setRangeSpacingCM(rangeSpacingCM)
        }
        if (diseaseData.hzbrmc_lb_left_length_m !== undefined && diseaseData.hzbrmc_lb_left_length_m !== '0' && diseaseData.hzbrmc_lb_left_length_m !== '') {
          var leftLengthM = ',左腹板长度' + diseaseData.hzbrmc_lb_left_length_m + '@@米@@'
          setLeftLengthM(leftLengthM)
        } else {
          var leftLengthM = ''
          setLeftLengthM(leftLengthM)
        }
        if (diseaseData.hzbrmc_lb_bottom_length_m !== undefined && diseaseData.hzbrmc_lb_bottom_length_m !== '0' && diseaseData.hzbrmc_lb_bottom_length_m !== '') {
          var bottomLengthM = ',底板长度' + diseaseData.hzbrmc_lb_bottom_length_m + '@@米@@'
          setBottomLengthM(bottomLengthM)
        } else {
          var bottomLengthM = ''
          setBottomLengthM(bottomLengthM)
        }
        if (diseaseData.hzbrmc_lb_right_length_m !== undefined && diseaseData.hzbrmc_lb_right_length_m !== '0' && diseaseData.hzbrmc_lb_right_length_m !== '') {
          var rightLengthM = ',右腹板长度' + diseaseData.hzbrmc_lb_right_length_m + '@@米@@'
          setRightLengthM(rightLengthM)
        } else {
          var rightLengthM = ''
          setRightLengthM(rightLengthM)
        }
        if (diseaseData.hzbrmc_lb_left_width_mm !== undefined && diseaseData.hzbrmc_lb_left_width_mm !== '0' && diseaseData.hzbrmc_lb_left_width_mm !== '') {
          var leftWidthMM = ',左腹板宽度' + diseaseData.hzbrmc_lb_left_width_mm + '@@毫米@@'
          setLeftWidthMM(leftWidthMM)
        } else {
          var leftWidthMM = ''
          setLeftWidthMM(leftWidthMM)
        }
        if (diseaseData.hzbrmc_lb_bottom_width_mm !== undefined && diseaseData.hzbrmc_lb_bottom_width_mm !== '0' && diseaseData.hzbrmc_lb_bottom_width_mm !== '') {
          var bottomWidthMM = ',底板宽度' + diseaseData.hzbrmc_lb_bottom_width_mm + '@@毫米@@'
          setBottomWidthMM(bottomWidthMM)
        } else {
          var bottomWidthMM = ''
          setBottomWidthMM(bottomWidthMM)
        }
        if (diseaseData.hzbrmc_lb_right_width_mm !== undefined && diseaseData.hzbrmc_lb_right_width_mm !== '0' && diseaseData.hzbrmc_lb_right_width_mm !== '') {
          var rightWidthMM = ',右腹板宽度' + diseaseData.hzbrmc_lb_right_width_mm + '@@毫米@@'
          setRightWidthMM(rightWidthMM)
        } else {
          var rightWidthMM = ''
          setRightWidthMM(rightWidthMM)
        }
        if (diseaseData.hzbrmc_slant_m !== undefined && diseaseData.hzbrmc_slant_m !== '0' && diseaseData.hzbrmc_slant_m !== '') {
          var slantM = ',倾斜量' + diseaseData.hzbrmc_slant_m + '@@米@@'
          setSlantM(slantM)
        } else {
          var slantM = ''
          setSlantM(slantM)
        }
      }

      if (writeDesTextValue == '' || writeDesTextValue == undefined) {
        console.log('没有修改数据');
        if (diseaseData.description == '' || diseaseData.description == undefined) {
          diseaseData['description'] = itemData.diseaseName
        } else if (diseaseData.description !== '' || diseaseData.description !== undefined) {
          let writeTxt = lengthM + lengthCM + lengthMM + widthM + widthCM
                  + widthMM + heightM + heightCM + heightMM + areaFace
                  + areaPer + areaM + areaCM + areaMM + heightDiffCM + heightDiffMM
                  + spacingCM + deformationMM + num + rangeCM + rangeMM + depthCM
                  + depthMM + volumeM + volumeCM + dispCM + dispMM + angle + chu
                  + tiao + rangeFenbuM + rangeLengthM + rangeWidthMM + rangeSpacingCM
                  + leftLengthM + bottomLengthM + rightLengthM + leftWidthMM
                  + bottomWidthMM + rightWidthMM + slantM
          // let writeTxt = diseaseData.hzbrmc_length_m
          setWriteTxt(writeTxt)
          // console.log('writeTxt', writeTxt);
          // console.log('病害名称',itemData.diseaseName);
          let binghai = itemData.diseaseName
          let allText = binghai.concat(writeTxt)
          console.log('allText', allText);
          diseaseData['description'] = allText
          handleFormChenge(allText, diseaseData.description)
        }
      } else {
        let writeTxt = lengthM + lengthCM + lengthMM + widthM + widthCM
                  + widthMM + heightM + heightCM + heightMM + areaFace
                  + areaPer + areaM + areaCM + areaMM + heightDiffCM + heightDiffMM
                  + spacingCM + deformationMM + num + rangeCM + rangeMM + depthCM
                  + depthMM + volumeM + volumeCM + dispCM + dispMM + angle + chu
                  + tiao + rangeFenbuM + rangeLengthM + rangeWidthMM + rangeSpacingCM
                  + leftLengthM + bottomLengthM + rightLengthM + leftWidthMM
                  + bottomWidthMM + rightWidthMM + slantM
        setWriteTxt(writeTxt)
        console.log('writeTxt', writeTxt);
        console.log('病害名称',itemData.diseaseName);
        let binghai = itemData.diseaseName
        let allText = binghai.concat(writeTxt)
        console.log('allText', allText);
        diseaseData['description'] = allText
        handleFormChenge(allText, diseaseData.description)
      }
    }

    // 存入数据
    const setStorage = async(name, value) => {
      console.log('存储长宽高数据的函数~~', name, value);
      // 桥梁id + 部件名称 + 长/宽/高
      const REname = bridgeId + '_' + storageMemberName + '_' + name
      try {
        await AsyncStorage.setItem(REname, value)
      } catch (err) {
        console.log('存入数据失败!', err);
      }
    }

    const writeNum = () => {
      try {
        console.log('长宽高的数据::',diseaseData.memberLength,diseaseData.memberWidth,diseaseData.memberHeight);
        const lengthName = bridgeId + '_' + storageMemberName + '_' + 'memberLength'
        const lengthValue = AsyncStorage.getItem(lengthName)
        const widthName = bridgeId + '_' + storageMemberName + '_' + 'memberWidth'
        const widthValue = AsyncStorage.getItem(widthName)
        const heightName = bridgeId + '_' + storageMemberName + '_' + 'memberHeight'
        const heightValue = AsyncStorage.getItem(heightName)
        // if (diseaseData.memberLength == undefined || diseaseData.memberLength !== lengthValue) {
        //   // console.log('长度数据为空');
        //   getStorage(lengthName)
        // } else if (diseaseData.memberWidth == undefined || diseaseData.memberWidth !== widthValue) {
        //   // console.log('宽度数据为空');
        //   getStorage(widthName)
        // } else if (diseaseData.memberHeight == undefined || diseaseData.memberHeight !== heightValue) {
        //   // console.log('高度数据为空');
        //   getStorage(heightName)
        // }
        getStorage(lengthName)
        getStorage(widthName)
        getStorage(heightName)
      } catch (e) {
        console.log('writeNum错误',e);
      }
    }

    // 读取数据
    const getStorage = async(name) => {
      console.log('读取存储的长宽高的数据~',name);
      // console.log('diseaseData 有无',diseaseData);
      try {
        const value = await AsyncStorage.getItem(name)
        console.log('value~~~',value);
        if (value !== null) {
          console.log('读取到的数据',name,value);
          if (name == bridgeId + '_' + storageMemberName + '_' + 'memberLength') {
            console.log('length99999');
            diseaseData['memberLength'] = value
            setDiseaseData(diseaseData)
            handleFormChenge(value, diseaseData.memberLength)
          } else if (name == bridgeId + '_' + storageMemberName + '_' + 'memberWidth') {
            console.log('Width99999');
            diseaseData['memberWidth'] = value
            setDiseaseData(diseaseData)
            handleFormChenge(value, diseaseData.memberWidth)
          } else if (name == bridgeId + '_' + storageMemberName + '_' + 'memberHeight') {
            console.log('Height99999');
            diseaseData['memberHeight'] = value
            setDiseaseData(diseaseData)
            handleFormChenge(value, diseaseData.memberHeight)
          }
        }
      } catch (err) {
        console.log('读取失败~', err);
      }
    }

    // 填入位置描述内容
    const writePositionText = () => {
      try {
        // console.log('diseaseData.area', diseaseData.area);
        console.log('diseaseData.lengthText',lengthText,widthText,heightText);
        if (diseaseData.area == undefined || diseaseData.area == '') {
            var areaName = ''
            setAreaName(areaName)
            console.log('diseaseData.area为空');
            // 墩/台描述
            // 长度描述
            if (lengthText == '0' || lengthText == '0.0') {
              var lengthNum = ''
              setLengthNum(lengthNum)
              // let pier = ''
              // setPier(pier)
            } else if (lengthText !== '0' || lengthText !== '0.0') {
              var lengthNum = lengthText + 'm'
              setLengthNum(lengthNum)
            }
            
            // 宽度描述
            if (widthText == '0' || widthText == '0.0') {
              var widthNum = ''
              setWidthNum(widthNum)
            } else if (widthText !== '0' || widthText !== '0.0') {
              if (lengthNum == '') {
                var widthNum = '距左侧' + widthText + 'm'
                setWidthNum(widthNum)
              } else {
                var widthNum = ',距左侧' + widthText + 'm'
                setWidthNum(widthNum)
              }
            }

            // 距顶描述
            // if (heightText == '0' || heightText == '0.0') {
            //   var heightNum = ''
            //   setHeightNum(heightNum)
            // } else if (heightText !== '0' || heightText !== '0.0') {
            //   var heightNum = ',距顶' + heightText + 'm'
            //   setHeightNum(heightNum)
            // }

            if (lengthNum == '' && widthNum == '') {
              let writePositionTxt = areaName
              setWritePositionTxt(writePositionTxt)
              diseaseData['writePositionTxt'] = writePositionTxt
              setDiseaseData(diseaseData)
              handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
            } else {
              console.log('55555');
              // console.log('kankan areaName', areaName);

              if (lengthNum == '') {
                let writePositionTxt = areaName + widthNum + '处'
                setWritePositionTxt(writePositionTxt)
                diseaseData['writePositionTxt'] = writePositionTxt
                setDiseaseData(diseaseData)
                handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
              } else {
                // 位置描述 = / + 病害区域 + 桥台 + 长度
                let writePositionTxt = areaName + pier + lengthNum + widthNum + '处'
                setWritePositionTxt(writePositionTxt)
                diseaseData['writePositionTxt'] = writePositionTxt
                setDiseaseData(diseaseData)
                handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
              }
            }
        } else {
          console.log('有数据了');
          console.log('构件区域列表：：',areaparam);
          console.log('表单中的构件区域',diseaseData.area);
          console.log('构件类型',labelName);
          if (labelName == 'at0000' && diseaseData.area == undefined || diseaseData.area == '' || diseaseData.area == '/') {
            console.log('empty~~~');
            var areaName = ''
            diseaseData['area'] = areaName
            handleFormChenge(areaName, diseaseData.area)
          } else if (labelName == 'at0000' && diseaseData.area !== undefined || diseaseData.area !== '' || diseaseData.area !== '/') {
            console.log('not empty~~~~');
            var areaName = diseaseData.area
            diseaseData['area'] = areaName
            handleFormChenge(areaName, diseaseData.area)
          }
          if (areaparam !== []) {
            let areaArr = areaparam
            let inputArea = diseaseData.area
            console.log('inputArea',inputArea);
            for (let i = 0; i < areaArr.length; i++) {
              if (inputArea == areaArr[i].value) {
                console.log('此时选中的构件是：',areaArr[i].label);
                var areaName = areaArr[i].label
                console.log(areaName);
                setAreaName(areaName)
              }
            }
          }
            
            
            // 墩/台描述
            // 长度描述
            if (lengthText == '0' || lengthText == '0.0') {
              var lengthNum = ''
              setLengthNum(lengthNum)
            } else if (lengthText !== '0' || lengthText !== '0.0') {
              var lengthNum = lengthText + 'm'
              setLengthNum(lengthNum)
            }
            
            // 宽度描述
            if (widthText == '0' || widthText == '0.0') {
              var widthNum = ''
              setWidthNum(widthNum)
            } else if (widthText !== '0' || widthText !== '0.0') {
              if (lengthNum == '') {
                var widthNum = '距左侧' + widthText + 'm'
                setWidthNum(widthNum)
              } else {
                var widthNum = ',距左侧' + widthText + 'm'
                setWidthNum(widthNum)
              }
            }

            // 距顶描述
            // if (heightText == '0' || heightText == '0.0') {
            //   var heightNum = ''
            //   setHeightNum(heightNum)
            // } else if (heightText !== '0' || heightText !== '0.0') {
            //   var heightNum = ',距顶' + heightText + 'm'
            //   setHeightNum(heightNum)
            // }

            console.log('kankan areaName', areaName);
            if (lengthNum == '' && widthNum == '') {
              let writePositionTxt = areaName
              setWritePositionTxt(writePositionTxt)
              diseaseData['writePositionTxt'] = writePositionTxt
              setDiseaseData(diseaseData)
              handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
            } else {
              console.log('65666');
              // console.log('kankan areaName', areaName);
              if (lengthNum == '') {
                let writePositionTxt = areaName + lengthNum + widthNum + '处'
                setWritePositionTxt(writePositionTxt)
                diseaseData['writePositionTxt'] = writePositionTxt
                setDiseaseData(diseaseData)
                handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
              } else {
                let writePositionTxt = areaName + pier + lengthNum + widthNum + '处'
                setWritePositionTxt(writePositionTxt)
                diseaseData['writePositionTxt'] = writePositionTxt
                setDiseaseData(diseaseData)
                handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
              }
            }
        }
      } catch (err) {
        console.log('出现错误1:',err);
      }
    }

    // 一键填入病害描述与位置描述
    const allWrite = () => {
      writeDesText()
      writePositionText()
    }


  {/* ================================================= */}
  {/* 病害填写表格区域 */}
  return (
  <View style={tailwind.flexRow}>
    {/* 病害填写表格区域 */}
    <ScrollView style={{height:350}}>
      <View>
      <View style={[tailwind.flexRow, tailwind.justifyBetween]}>
        <LabelItem label="编号:">
          <Text style={[tailwind.fontBold]}>
            {route.params?.data?.index}
          </Text>
        </LabelItem>
        <View style={tailwind.flexRow}>
          <LabelItem
            label="重点关注"
            LabelStyle={[tailwind.mR0, {color:'#2b427d'}]}
          />
          <Checkbox
            checked={!!diseaseData?.mian}
            onPress={() =>
              handleFormChenge({
                name: 'mian',
                value: !diseaseData?.mian + 0,
              })
            }
          />
        </View>
      </View>
      <View style={[tailwind.flexRow]}>
        <View style={{width:230}}>
           <Select
          label="构件类型"
          name="areatype"
          labelName="areaname"
          valueName="areatype"
          value={diseaseData?.areatype}
          onChange={handleFormChenge}
          values={baseData.components}
        /> 
        </View>
        <View style={{width:230}}>
          <View style={tailwind.mB2}>
            {!areaparam.length ? (
              <TextInput
                name="area"
                label="构件区域"
                value={diseaseData?.area}
                onChange={handleFormChenge}
                lines={1}
                height={25}
              />
            ) : (
              <Select
                name="area"
                label="构件区域"
                value={diseaseData?.area}
                values={areaparam}
                onChange={handleFormChenge}
              />
            )}
          </View>
        </View>
        
      </View>
      
      {/* 原本的标度内容 */}
      {/* {scale.length ? (
        <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
          <LabelItem label="标度" />
          <TouchableOpacity onPress={handleScaleOpen}>
            <Icon
              name="information"
              size={20}
              style={[tailwind.mR2, {color:'#2b427d'}]}
            />
          </TouchableOpacity>
          <RadioGroup
            name="scale"
            values={scale}
            value={diseaseData?.scale}
            onChange={handleFormChenge}
          />
        </View>
      ) : (
        <></>
      )} */}

      {/* 修改标度数据源 */}
      {rightScale.length ? (
          <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
            <LabelItem label="标度" />
            <TouchableOpacity onPress={handleScaleOpen}>
              <Icon
                name="information"
                size={20}
                style={[tailwind.mR2, {color:'#2b427d'}]}
              />
            </TouchableOpacity>
            <RadioGroup
              name="scale"
              values={rightScale} // 初始数据第一项为'无'，提取第二项及以后的数据传入组件
              value={diseaseData?.scale}
              onChange={handleFormChenge}
            />
          </View>
        ) : (
          <></>
        )}


      <View style={tailwind.mT2} />
      <View>
        <View style={[tailwind.flexRow]}>
        <TouchableOpacity style={{width:90,height:20,borderRadius: 5,
            backgroundColor: '#2b427d',
            justifyContent: 'center',
            overflow: 'hidden'}}
            onPress={writeNum}>
            <Text style={{textAlign: 'center',color:'#fff',fontSize:12}}>获取上一次数据</Text>
          </TouchableOpacity>
          <LabelItem label="病害位置(米)" style={[tailwind.w18,{marginLeft:10}]} />
          <Text>长度{lengthText}米；宽度{widthText}米</Text>
          <Text>  </Text>
          
        </View>
        <View style={tailwind.mT2} />
        <View style={[tailwind.flexRow]}>
          <LabelItem label="长度" />
          <KeyboardInput
            name="memberLength"
            value={diseaseData?.memberLength}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disLength"
            memberData={diseaseData?.memberLength}
            value={diseaseData?.disLength}
            onChange={handleFormChenge}
          />
        </View>
        <View style={tailwind.mT2} />
        <View style={[tailwind.flexRow]}>
          <LabelItem label="宽度" style={tailwind.w18} />
          <KeyboardInput
            name="memberWidth"
            value={diseaseData?.memberWidth}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disWidth"
            memberData={diseaseData?.memberWidth}
            value={diseaseData?.disWidth}
            onChange={handleFormChenge}
          />
        </View>
        <View style={tailwind.mT2} />
        {/* <View style={[tailwind.flexRow,tailwind.mB3]}>
          <LabelItem label="台高" style={tailwind.w18} />
          <KeyboardInput
            name="memberHeight"
            value={diseaseData?.memberHeight}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disHeight"
            memberData={diseaseData?.memberHeight}
            value={diseaseData?.disHeight}
            onChange={handleFormChenge}
          />
        </View> */}
      </View>
      {/* <View style={tailwind.mT2} /> */}
      <View style={[tailwind.flexRow]}>
        <View style={{width:500}}>
          <WriteInput
            name="description"
            label="病害描述"
            value={diseaseData?.description}
            onChange={handleFormChenge}
            lines={3}
            height={70}
            // disabled={true}
          />
        </View>
        {/* <TouchableOpacity style={styles.sideButton} onPress={writeDesText}>
          <Text style={[{color:'#fff',fontSize:12}]}>填入描述</Text>
        </TouchableOpacity> */}
      </View>
      <View style={tailwind.mT2} />
      <View style={[tailwind.flexRow]}>
        <View style={{width:500}}>
          <WriteInput
            name="writePositionTxt"
            label="位置描述"
            value={diseaseData?.writePositionTxt}
            onChange={handleFormChenge}
            lines={3}
            height={70}
          />
        </View>
        {/* <TouchableOpacity style={styles.sideButton} onPress={writePositionText}>
          <Text style={[{color:'#fff',fontSize:12}]}>填入描述</Text>
        </TouchableOpacity> */}
      </View>
    </View>
    </ScrollView>
    
    {/* ================================================= */}
    <View style={tailwind.mX3} />
    
    <View style={[{width:'20%'}]}>
    <View>
      {/* <LabelItem label="当前病害:" /> */}
      <Text style={[tailwind.fontBold,{width:'100%'}]}>
        {itemData?.diseaseName}
      </Text>
    </View>
    <View style={tailwind.mT2} />
    {infoList.length ? (
        infoList.map(({strvalue, strinfo}, index) => (
          <React.Fragment key={index}>
              <View style={[tailwind.mB2]}>
                <LabelItem label={strinfo} />
                <View style={{width:'70%',height:25}}>
                  <KeyboardInput
                    name={strvalue}
                    value={diseaseData[strvalue]}
                    onChange={handleFormChenge}
                  />
                </View>
              </View>
          </React.Fragment>
        ))
      ) : (
        <></>
      )}
      <TouchableOpacity style={styles.bottomButton} onPress={allWrite}>
        <Text style={[{color:'#fff',fontSize:14}]}>生成描述</Text>
      </TouchableOpacity>
    </View>
    
    <ScaleInfo ref={scaleInfoRef} info={scaleTabel} />
  </View>
  );
  {/* ================================================= */}
}

export function DiseaseG({route, navigation}) {
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
  
    const [areaparam, areanode] = hooks.useArea({diseaseData, baseData});
  
    // const infoList = hooks.useInfoComponents({diseaseData, baseData});
    const [infoList,setInfoList] = useState([])
  
    const defaultFileName = hooks.useDefaultFileName({diseaseData, baseData});
  
    const [scale, scaleInfo] = hooks.useScale({
      diseaseData,
      typeList: route.params?.type?.list,
      baseData,
    });


    React.useEffect(() => {
      setDiseaseData(itemData);
      console.log('itemData:',itemData);
      try {
        console.log('itemData',itemData.standard.scale);
        setBiaodu(itemData.standard.scale)
        diseaseData['scale'] = itemData.standard.scale
      } catch (error) {
        console.log('设置标度初始值',error);
      }
    }, [itemData]);
  
    const [lengthText, setLengthText] = useState()
    const [widthText, setWidthText] = useState()
    const [heightText, setHeightText] = useState()
    // =================================================
    const [writeTxt, setWriteTxt] = useState('')
    const [writePositionTxt, setWritePositionTxt] = useState('')
    // -------------------------------------------------
    // 标度,默认为 2
    const [biaodu, setBiaodu] = useState(2)
    // 长度 - 米
    const [lengthM, setLengthM] = useState('')
    // 长度 - 厘米
    const [lengthCM, setLengthCM] = useState('')
    // 长度 - 毫米
    const [lengthMM, setLengthMM] = useState('')
    // 宽度 - 米
    const [widthM, setWidthM] = useState('')
    // 宽度 - 厘米
    const [widthCM, setWidthCM] = useState('')
    // 宽度 - 毫米
    const [widthMM, setWidthMM] = useState('')
    // 高度 - 米
    const [heightM, setHeightM] = useState('')
    // 高度 - 厘米
    const [heightCM, setHeightCM] = useState('')
    // 高度 - 毫米
    const [heightMM, setHeightMM] = useState('')
    // 面域 - %
    const [areaFace, setAreaFace] = useState('')
    // 面积占比 - %
    const [areaPer, setAreaPer] = useState('')
    // 面积 - 平方米
    const [areaM, setAreaM] = useState('')
    // 面积 - 平方厘米
    const [areaCM, setAreaCM] = useState('')
    // 面积 - 平方毫米
    const [areaMM, setAreaMM] = useState('')
    // 高差 - 厘米
    const [heightDiffCM, setHeightDiffCM] = useState('')
    // 高差 - 毫米
    const [heightDiffMM, setHeightDiffMM] = useState('')
    // 间距 - 厘米
    const [spacingCM, setSpacingCM] = useState('')
    // 变形 - 毫米
    const [deformationMM, setDeformationMM] = useState('')
    // 个数 - 个
    const [num, setNum] = useState('')
    // 距离 - 厘米
    const [rangeCM, setRangeCM] = useState('')
    // 距离 - 毫米
    const [rangeMM, setRangeMM] = useState('')
    // 深度 - 厘米
    const [depthCM, setDepthCM] = useState('')
    // 深度 - 毫米
    const [depthMM, setDepthMM] = useState('')
    // 体积 - 立方米
    const [volumeM, setVolumeM] = useState('')
    // 体积 - 立方厘米
    const [volumeCM, setVolumeCM] = useState('')
    // 位移 - 厘米
    const [dispCM, setDispCM] = useState('')
    // 位移 - 毫米
    const [dispMM, setDispMM] = useState('')
    // 角度 - 度
    const [angle, setAngle] = useState('')
    // 处
    const [chu, setChu] = useState('')
    // 条
    const [tiao, setTiao] = useState('')
    // 分布范围 - 米
    const [rangeFenbuM, setRangeFenbuM] = useState('')
    // 长度范围 - 米
    const [rangeLengthM, setRangeLengthM] = useState('')
    // 宽度范围 - 毫米
    const [rangeWidthMM, setRangeWidthMM] = useState('')
    // 间距范围 - 厘米
    const [rangeSpacingCM, setRangeSpacingCM] = useState('')
    // 左腹板长度 - 米
    const [leftLengthM, setLeftLengthM] = useState('')
    // 底板长度 - 米
    const [bottomLengthM, setBottomLengthM] = useState('')
    // 右腹板长度 - 米
    const [rightLengthM, setRightLengthM] = useState('')
    // 左腹板宽度 - 毫米
    const [leftWidthMM, setLeftWidthMM] = useState('')
    // 底板宽度 - 毫米
    const [bottomWidthMM, setBottomWidthMM] = useState('')
    // 右腹板宽度 - 毫米
    const [rightWidthMM, setRightWidthMM] = useState('')
    // 倾斜量 - 米
    const [slantM, setSlantM] = useState('')

    const [saveDescription, setSaveDescription] = useState()

    // 构件类型
    const [labelName, setLabelName] = useState()
    // 构件区域
    const [areaName, setAreaName] = useState()

    // 病害名称
    const [infoshort, setInfoShort] = useState()

    // 位置描述 墩台
    const [pier,  setPier] = useState()
    // 位置描述 长、宽、距顶
    const [lengthNum, setLengthNum] = useState('')
    const [widthNum, setWidthNum] = useState('')
    const [heightNum, setHeightNum] = useState('')

    const [diseaseName, setDiseaseName] = useState('')

    // 桥梁id
    const [bridgeId, setBridgeId] = useState(route.params.memberList[0].bridgeid)
    // 部件名称
    const [storageMemberName, setStorageMemberName] =useState(route.params.routeParams.title)

    // =================================================
    React.useEffect(() => {
      saveData.current = {...diseaseData};
      try {

        if (baseData.membercheckdata) {
          console.log('保存baseData数据');
          setBaseDataStorage(JSON.stringify(baseData.membercheckdata))
        }
        if (route.params.thridData.datastr && baseData.membercheckdata) {
          let infoList = []
          route.params.thridData.datastr.forEach((item) => {
            // console.log('病害列表传入的datastr',item);
            baseData.membercheckdata.forEach((item1) => {
              if (item == item1.strid) {
                // console.log('取出来的item1',item1);
                infoList.push(item1)
              }
            })
          })
          setInfoList(infoList)
        } else if (!baseData.membercheckdata) {
          console.log('读取baseData数据');
          getBaseDataStorage('baseData')
        }

        if (diseaseData.diseaseName == undefined || diseaseData.diseaseName == '') {
          console.log('7777');
          diseaseData['diseaseName'] = route.params.thridData.checkinfoshort
          handleFormChenge(route.params.thridData.checkinfoshort, diseaseData.diseaseName)
        }
      } catch (err){
        console.log('err09', err);
      }
      try {
        // 初始构件类型与选择的构件类型一致时，构件区域取选择的值
        // 初始构件类型与选择的构件类型不一致时，构件区域默认取第一项
        for (let i =0; i < areaparam.length; i ++) {
          if (diseaseData.area == undefined) {
            diseaseData.area = areaparam[0].value
            handleFormChenge(areaparam[0].value, diseaseData.area)
            setAreaName(areaparam[0].label)
          } else if (diseaseData.area !== undefined) {
            let sliceArea = diseaseData.area.slice(0,6)
            if (sliceArea !== diseaseData.areatype) {
              for (let k = 0; k < baseData.components.length; k++) {
                if (diseaseData.areatype == baseData.components[k].areatype) {
                  diseaseData['areatype'] = baseData.components[k].areatype
                  diseaseData['area'] = baseData.components[k].areaparamjson.areaparamlist[0].areaparamid
                }
              }
            }
          }
        }
      } catch (err) {
        console.log('err08', err);
      }
      try {
        let lengthText = (diseaseData.memberLength * (diseaseData.disLength / 100)).toFixed(2)
        setLengthText(lengthText)
        let widthText = (diseaseData.memberWidth * (diseaseData.disWidth / 100)).toFixed(2)
        setWidthText(widthText)
        let heightText = (diseaseData.memberHeight * (diseaseData.disHeight / 100)).toFixed(2)
        setHeightText(heightText)
        if (lengthText == 'NaN') {
          let lengthText = '0'
          setLengthText(lengthText)
        }
        if (widthText == 'NaN') {
          let widthText = '0'
          setWidthText(widthText)
        }
        if (heightText == 'NaN') {
          let heightText = '0'
          setHeightText(heightText)
        }


        if (diseaseData.area == undefined) {

        } else if (diseaseData.area !== '' || diseaseData.area !== undefined || diseaseData.area !== '/') {
          var sliceArea = diseaseData.area.slice(0,5)
        }
        
        if (diseaseData.areatype == 'at0000' && sliceArea == 'at000') {
          console.log(sliceArea);
          console.log('xu~~~~~');
          diseaseData['area'] = '/'
        }
        
        // 将病害位置的长宽高数据存进diseaseData
        diseaseData['lengthText'] = lengthText
        diseaseData['widthText'] = widthText
        diseaseData['heightText'] = heightText
        diseaseData['remark'] = route.params.thridData.checkinfoshort


        // 取病害名称并保存
        if (diseaseData.diseaseName == '' || diseaseData.diseaseName == undefined) {
          let diseaseName = route.params.thridData.checkinfoshort
          // setDiseaseName(diseaseName)
          console.log('0000000');
          console.log('~~~~~~~diseaseName~~~~~',diseaseName);
          diseaseData['diseaseName'] = diseaseName
          handleFormChenge(diseaseName, diseaseData.diseaseName)
          setDiseaseName(diseaseName)
        }

        if (diseaseData.stairgroupid == undefined || diseaseData.stairgroupid == '') {
          // console.log('0000.000');
          diseaseData['stairgroupid'] = route.params.stairgroupid
          handleFormChenge(route.params.stairgroupid, diseaseData.stairgroupid)
        }

        // console.log(diseaseData);
        if (diseaseData.remark == '' || diseaseData.remark == undefined) {
          let infoshort = route.params.thridData.checkinfoshort
          setInfoShort(infoshort)
        }
        if (diseaseData.description == '' || diseaseData.description == undefined) {
          diseaseData['description'] = diseaseData.remark
        }

        if (diseaseData.writePositionTxt == undefined || diseaseData.writePositionTxt == '') {
          let writePositionTxt = '/'
          setWritePositionTxt(writePositionTxt)
          diseaseData['writePositionTxt'] = writePositionTxt
          handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
        }

        try {
          if (itemData && route.params.mediaType == 'add') {
            diseaseData['scale'] = rightScaleNum
            handleFormChenge(rightScaleNum, diseaseData.scale)
            route.params.mediaType = ''
          }
        } catch (error) {
          console.log('设置标度初始值',error);
        }
      } catch {
      }
    }, [diseaseData]);

    // 保存baseData的数据
    const setBaseDataStorage = async(value) => {
      try {
        await AsyncStorage.setItem('baseData', value)
      } catch (err) {
        console.log('存入数据失败!3', err);
      }
    }
    // 读取baseData的数据
    const getBaseDataStorage = async(name) => {
      // console.log('读取baseData数据')
      try {
        const value = await AsyncStorage.getItem(name)
        let values = JSON.parse(value)
        // console.log('value~~~',value);
        let infoList = []
          route.params.thridData.datastr.forEach((item) => {
            // console.log('病害列表传入的datastr',item);
            values.forEach((item1) => {
              if (item == item1.strid) {
                // console.log('取出来的item1',item1);
                infoList.push(item1)
              }
            })
          })
          setInfoList(infoList)
      } catch (error) {
        console.log('读取baseData数据失败',error);
      }
    }

    // 重新获取数据的标度选项数组
    const [rightScale, setRightScale] = useState([])
    // 默认的标度值
    const [rightScaleNum, setRightScaleNum] = useState('')
    // 重新获取数据的标度评定标准表格
    const [scaleTabel, setScaleTabel] = useState([])
  
    React.useEffect(() => {

      try {
        console.log('scale',scale);
        // console.log('baseData', baseData);
        // console.log('标度表格信息baseData.basestandardtable',baseData.basestandardtable)

        // 当页面是由新建进入时，存储标度数组，以备编辑进入时使用
        if (route.params.mediaType == 'add' || route.params.mediaType == '') {
          // =================================
          // 获取标度列表与标度默认值
          let scaleSelect = baseData.basestandardtable
          let oldArr = ''
          let scaleNum = ''
          scaleSelect.forEach(item => {
            // console.log('33330000',item.standardid);
            
            if (route.params.thridData.strandardid == item.standardid) {
              console.log('当前病害的标度选项',item);
              // setRightScale(item.standardscalestr)
              oldArr = item.standardscalestr
              scaleNum = item.standardscale
            }
          });
          setRightScaleNum(scaleNum)
          // console.log('rightScale',rightScale);
          const arr = oldArr.split(',')
          console.log('arr',arr);
          
          let resetArr = []
          arr.forEach((item, index) => {
            resetArr.push({
              label:index + 1,
              value:item
            })
          })
          console.log('resetArr',resetArr);
          setRightScale(resetArr)
          diseaseData['scaleArr'] = rightScale
          handleFormChenge(rightScale, diseaseData.scaleArr)

          // =================================
          // 获取标度评定标准表数据
          let scaleTabel = baseData.standardtableinfo
          // console.log('表格数据',scaleTabel);
          let oldTable = []
          scaleTabel.forEach((item) => {
            if (route.params.thridData.strandardid == item.standardid) {
              // console.log('当前的评定表item',item);
              oldTable.push(item)
            }
          })
          console.log('oldTable',oldTable);
          setScaleTabel(oldTable)
          diseaseData['scaleTableArr'] = oldTable
          handleFormChenge(oldTable, diseaseData.scaleTableArr)


        } else if (route.params.mediaType == 'edit') {
          // 当页面是由编辑进入时
          setRightScale(diseaseData.scaleArr)
          setScaleTabel(scaleTabel)
          // console.log('rightScale222222',rightScale);
        }
      } catch (error) {
        console.log('获取标度数据',error);
      }

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
            // .map(
            //   ({strname, strvalue, strunit}) =>
            //     `${strname}${saveData.current[strvalue] || 0}@@${
            //       strunit || ''
            //     }@@`,
            // )
            .map(
              ({strname, strvalue, strunit}) =>
                `${saveData.current[strvalue] == undefined ? '' : strname + saveData.current[strvalue] + '@@' + strunit + '@@'}`
            )
            const strr = str.filter(item => item!=='') == '' ? '/' : str.filter(item => item!=='')
            // .join(',');
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
            }，${strr}`,
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

    useEffect(() => {
      // console.log('桥跨：：',route.params.memberList);
      let defaultPier = route.params.memberList[0].membername
      // 提取第一个字符进行判断（表示墩台的数据）
      let firstDefaultPier = defaultPier.slice(0,1)
      if (firstDefaultPier == 1) {
        let pier = '距' + (firstDefaultPier - 1) + '#台'
        setPier(pier)
        console.log('dundun:', pier);
      } else {
        let pier = '距' + (firstDefaultPier - 1) + '#墩'
        setPier(pier)
        console.log('dundun:', pier);
      }

      

      console.log('构件区域列表：：',areaparam);
      // console.log('表单中的构件区域',diseaseData.area);
      if (areaparam == '' || areaparam == undefined) {
        console.log('选的其他');
        try{
         console.log('构件类型', itemData.areatype); 
         if (itemData.areatype == 'at0000' || itemData.areatype == undefined) {
          // console.log('9999');
          diseaseData['area'] = '/'
          let labelName = 'at0000'
          setLabelName(labelName)
         }
        } catch {

        }
      }
    },[])

    const handleScaleOpen = () => scaleInfoRef.current.open();
    const handleFormChenge = ({name, value}) => {
      // const _data = {
      //   ...diseaseData,
      //   [name]: value,
      // };
      let unitt = JSON.stringify(diseaseData, [
          'areatype','area','scale','lengthText','widthText','heightText','memberLength','memberWidth',
        'memberHeight','disLength','disWidth','disHeight','hzbrmc_length_m','hzbrmc_length_cm','hzbrmc_length_mm','hzbrmc_width_m',
        'hzbrmc_width_cm','hzbrmc_width_mm','hzbrmc_height_m','hzbrmc_height_cm','hzbrmc_height_mm',
        'hzbrmc_area_face','hzbrmc_area_per','hzbrmc_area_m','hzbrmc_area_cm','hzbrmc_area_mm',
        'hzbrmc_heightdiff_cm','hzbrmc_heightdiff_mm','hzbrmc_spacing_cm','hzbrmc_deformation_mm',
        'hzbrmc_num','hzbrmc_range_cm','hzbrmc_range_mm','hzbrmc_depth_cm','hzbrmc_depth_mm',
        'hzbrmc_volume_m','hzbrmc_volume_cm','hzbrmc_disp_cm','hzbrmc_disp_mm','hzbrmc_angle_c',
        'hzbrmc_chu','hzbrmc_tiao','hzbrmc_range_fenbu_m','hzbrmc_range_length_m','hzbrmc_range_width_mm',
        'hzbrmc_range_spacing_cm','hzbrmc_lb_left_length_m','hzbrmc_lb_bottom_length_m','hzbrmc_lb_right_length_m',
        'hzbrmc_lb_left_width_mm','hzbrmc_lb_bottom_width_mm','hzbrmc_lb_right_width_mm','hzbrmc_slant_m'])
      // console.log(unitt);
      let unit = JSON.parse(unitt)
      diseaseData['unit'] = unit
      // const {area,areatype,scale,hzbrmc_length_m,hzbrmc_length_cm,hzbrmc_length_mm,hzbrmc_width_m,hzbrmc_width_cm,
      //   hzbrmc_width_mm,hzbrmc_height_m,hzbrmc_height_cm,hzbrmc_height_mm,hzbrmc_area_face,hzbrmc_area_per,
      //   hzbrmc_area_m,hzbrmc_area_cm,hzbrmc_area_mm,hzbrmc_heightdiff_cm,hzbrmc_heightdiff_mm,hzbrmc_spacing_cm,
      //   hzbrmc_deformation_mm,hzbrmc_num,hzbrmc_range_cm,hzbrmc_range_mm,hzbrmc_depth_cm,hzbrmc_depth_mm,
      //   hzbrmc_volume_m,hzbrmc_volume_cm,hzbrmc_disp_cm,hzbrmc_disp_mm,hzbrmc_angle_c,hzbrmc_chu,hzbrmc_tiao,
      //   hzbrmc_range_fenbu_m,hzbrmc_range_length_m,hzbrmc_range_width_mm,hzbrmc_range_spacing_cm,hzbrmc_lb_left_length_m,
      //   hzbrmc_lb_bottom_length_m,hzbrmc_lb_right_length_m,hzbrmc_lb_left_width_mm,hzbrmc_lb_bottom_width_mm,
      //   hzbrmc_lb_right_width_mm,hzbrmc_slant_m,lengthText,widthText,heightText,memberLength,memberWidth,
      //   memberHeight,disLength,disWidth,disHeight,...rest} = diseaseData
      const _data = {
        ...diseaseData,
        [name]: value,
      };
      if (name === 'checktypeid') {
        const _type = route.params.type.list.find(
          item => value === item.checktypeid,
        );
        let defaultScaleVal = '';
        if (_type) {
          defaultScaleVal = _type?.standardscale;
        }
        _data.scale = defaultScaleVal;
        const {basestandardtable, infoComponents} = baseData;
        const standardid =
          infoComponents.find(({checktypeid}) => value === checktypeid)
            ?.standardid || '';
        if (standardid) {
          const _standardscale = basestandardtable.find(
            item => standardid === item.standardid,
          )?.standardscale;
          if (_standardscale) {
            _data.standard = {
              scale: _standardscale,
              id: standardid,
            };
          } else {
            const defaultScale = basestandardtable.find(
              item => item.standardid === 'JTG-TH21-2011-T000-0',
            )?.standardscale;
            _data.standard = {
              scale: defaultScale,
              id: 'JTG-TH21-2011-T000-0',
            };
          }
        }
        _data.scale = _data.scale || '';
      }


      if (value) {
        // 向病害描述函数里传入
        writeDesText(name, value)
      }

      if (name == 'scale') {
        // 标度
        let biaodu = ',标度' + value + '@@'
        setBiaodu(biaodu)
      } else if (name == 'hzbrmc_length_m') {
        //长度 - 米
        // let lengthM = ',长度' + value + '@@米@@'
        // setLengthM(lengthM)
        if (value == '' || value == 0) {
          let lengthM = ''
          setLengthM(lengthM)
        } else {
          let lengthM = ',长度' + value + '@@米@@'
          setLengthM(lengthM)
        }
      } else if (name == 'hzbrmc_length_cm') {
        // 长度 - 厘米
        // let lengthCM = ',长度' + value + '@@厘米@@'
        // setLengthCM(lengthCM)
        if (value == '' || value == 0) {
          let lengthCM = ''
          setLengthCM(lengthCM)
        } else {
          let lengthCM = ',长度' + value + '@@厘米@@'
          setLengthCM(lengthCM)
        }
      } else if (name == 'hzbrmc_length_mm') {
        // 长度 - 毫米
        // let lengthMM = ',长度' + value + '@@毫米@@'
        // setLengthMM(lengthMM)
        if (value == '' || value == 0) {
          let lengthMM = ''
          setLengthMM(lengthMM)
        } else {
          let lengthMM = ',长度' + value + '@@毫米@@'
          setLengthMM(lengthMM)
        }
      } else if (name == 'hzbrmc_width_m') {
        // 宽度 - 米
        // let widthM = ',宽度' + value + '@@米@@'
        // setWidthM(widthM)
        if (value == '' || value == 0) {
          let widthM = ''
          setWidthM(widthM)
        } else {
          let widthM = ',宽度' + value + '@@米@@'
          setWidthM(widthM)
        }
      } else if (name == 'hzbrmc_width_cm') {
        // 宽度 - 厘米
        // let widthCM = ',宽度' + value + '@@厘米@@'
        // setWidthCM(widthCM)
        if (value == '' || value == 0) {
          let widthCM = ''
          setWidthCM(widthCM)
        } else {
          let widthCM = ',宽度' + value + '@@厘米@@'
          setWidthCM(widthCM)
        }
      } else if (name == 'hzbrmc_width_mm') {
        // 宽度 - 毫米
        if (value == '' || value == 0) {
          let widthMM = ''
          setWidthMM(widthMM)
        } else {
          let widthMM = ',宽度' + value + '@@毫米@@'
          setWidthMM(widthMM)
        }
      } else if (name == 'hzbrmc_height_m') {
        // 高度 - 米
        // let heightM = ',高度' + value + '@@米@@'
        // setHeightM(heightM)
        if (value == '' || value == 0) {
          let heightM = ''
          setHeightM(heightM)
        } else {
          let heightM = ',高度' + value + '@@米@@'
          setHeightM(heightM)
        }
      } else if (name == 'hzbrmc_height_cm') {
        // 高度 - 厘米
        if (value == '' || value == 0) {
          let heightCM = ''
          setHeightCM(heightCM)
        } else {
          let heightCM = ',高度' + value + '@@厘米@@'
          setHeightCM(heightCM)
        }
      } else if (name == 'hzbrmc_height_mm') {
        // 高度 - 毫米
        // let heightMM = ',高度' + value + '@@毫米@@'
        // setHeightMM(heightMM)
        if (value == '' || value == 0) {
          let heightMM = ''
          setHeightMM(heightMM)
        } else {
          let heightMM = ',高度' + value + '@@毫米@@'
          setHeightMM(heightMM)
        }
      } else if (name == 'hzbrmc_area_face') {
        // 面域 - %
        // let areaFace = ',面域' + value + '@@%@@'
        // setAreaFace(areaFace)
        if (value == '' || value == 0) {
          let areaFace = ''
          setAreaFace(areaFace)
        } else {
          let areaFace = ',面域' + value + '@@%@@'
          setAreaFace(areaFace)
        }
      } else if (name == 'hzbrmc_area_per') {
        // 面积占比 - %
        // let areaPer = ',面积占比' + value + '@@%@@'
        // setAreaPer(areaPer)
        if (value == '' || value == 0) {
          let areaPer = ''
          setAreaPer(areaPer)
        } else {
          let areaPer = ',面积占比' + value + '@@%@@'
          setAreaPer(areaPer)
        }
      } else if (name == 'hzbrmc_area_m') {
        // 面积 - 平方米
        // let areaM = ',面积' + value + '@@平方米@@'
        // setAreaM(areaM)
        if (value == '' || value == 0) {
          let areaM = ''
          setAreaM(areaM)
        } else {
          let areaM = ',面积' + value + '@@平方米@@'
          setAreaM(areaM)
        }
      } else if (name == 'hzbrmc_area_cm') {
        // 面积 - 平方厘米
        // let areaCM = ',面积' + value + '@@平方厘米@@'
        // setAreaCM(areaCM)
        if (value == '' || value == 0) {
          let areaCM = ''
          setAreaCM(areaCM)
        } else {
          let areaCM = ',面积' + value + '@@平方厘米@@'
          setAreaCM(areaCM)
        }
      } else if (name == 'hzbrmc_area_mm') {
        // 面积 - 平方毫米
        // let areaMM = ',面积' + value + '@@平方毫米@@'
        // setAreaMM(areaMM)
        if (value == '' || value == 0) {
          let areaMM = ''
          setAreaMM(areaMM)
        } else {
          let areaMM = ',面积' + value + '@@平方毫米@@'
          setAreaMM(areaMM)
        }
      } else if (name == 'hzbrmc_heightdiff_cm') {
        // 高差 - 厘米
        // let heightDiffCM = ',高差' + value + '@@厘米@@'
        // setHeightDiffCM(heightDiffCM)
        if (value == '' || value == 0) {
          let heightDiffCM = ''
          setHeightDiffCM(heightDiffCM)
        } else {
          let heightDiffCM = ',高差' + value + '@@厘米@@'
          setHeightDiffCM(heightDiffCM)
        }
      } else if (name == 'hzbrmc_heightdiff_mm') {
        // 高差 - 毫米
        // let heightDiffMM = ',高差' + value + '@@毫米@@'
        // setHeightDiffMM(heightDiffMM)
        if (value == '' || value == 0) {
          let heightDiffMM = ''
          setHeightDiffMM(heightDiffMM)
        } else {
          let heightDiffMM = ',高差' + value + '@@毫米@@'
          setHeightDiffMM(heightDiffMM)
        }
      } else if (name == 'hzbrmc_spacing_cm') {
        // 间距 - 厘米
        // let spacingCM = ',间距' + value + '@@厘米@@'
        // setSpacingCM(spacingCM)
        if (value == '' || value == 0) {
          let spacingCM = ',间距' + value + '@@厘米@@'
          setSpacingCM(spacingCM)
        } else {
          let spacingCM = ',间距' + value + '@@厘米@@'
          setSpacingCM(spacingCM)
        }
      } else if (name == 'hzbrmc_deformation_mm') {
        // 变形 - 毫米
        // let deformationMM = ',变形' + value + '@@毫米@@'
        // setDeformationMM(deformationMM)
        if (value == '' || value == 0) {
          let deformationMM = ''
          setDeformationMM(deformationMM)
        } else {
          let deformationMM = ',变形' + value + '@@毫米@@'
          setDeformationMM(deformationMM)
        }
      } else if (name == 'hzbrmc_num') {
        // 个数 - 个
        // let num = ',个数' + value + '@@个@@'
        // setNum(num)
        if (value == '' || value == 0) {
          let num = ''
          setNum(num)
        } else {
          let num = ',个数' + value + '@@个@@'
          setNum(num)
        }
      } else if (name == 'hzbrmc_range_cm') {
        // 距离 - 厘米
        // let rangeCM = ',距离' + value + '@@厘米@@'
        // setRangeCM(rangeCM)
        if (value == '' || value == 0) {
          let rangeCM = ''
          setRangeCM(rangeCM)
        } else {
          let rangeCM = ',距离' + value + '@@厘米@@'
          setRangeCM(rangeCM)
        }
      } else if (name == 'hzbrmc_range_mm') {
        // 距离 - 毫米
        // let rangeMM = ',距离' + value + '@@毫米@@'
        // setRangeMM(rangeMM)
        if (value == '' || value == 0) {
          let rangeMM = ''
          setRangeMM(rangeMM)
        } else {
          let rangeMM = ',距离' + value + '@@毫米@@'
          setRangeMM(rangeMM)
        }
      } else if (name == 'hzbrmc_depth_cm') {
        // 深度 - 厘米
        // let depthCM = ',深度' + value + '@@厘米@@'
        // setDepthCM(depthCM)
        if (value == '' || value == 0) {
          let depthCM = ''
          setDepthCM(depthCM)
        } else {
          let depthCM = ',深度' + value + '@@厘米@@'
          setDepthCM(depthCM)
        }
      } else if (name == 'hzbrmc_depth_mm') {
        // 深度 - 毫米
        // let depthMM = ',深度' + value + '@@毫米@@'
        // setDepthMM(depthMM)
        if (value == '' || value == 0) {
          let depthMM = ''
          setDepthMM(depthMM)
        } else {
          let depthMM = ',深度' + value + '@@毫米@@'
          setDepthMM(depthMM)
        }
      } else if (name == 'hzbrmc_volume_m') {
        // 体积 - 立方米
        // let volumeM = ',体积' + value + '@@立方米@@'
        // setVolumeM(volumeM)
        if (value == '' || value == 0) {
          let volumeM = ''
          setVolumeM(volumeM)
        } else {
          let volumeM = ',体积' + value + '@@立方米@@'
          setVolumeM(volumeM)
        }
      } else if (name == 'hzbrmc_volume_cm') {
        // 体积 - 立方厘米
        // let volumeCM = ',体积' + value + '@@立方厘米@@'
        // setVolumeCM(volumeCM)
        if (value == '' || value == 0) {
          let volumeCM = ''
          setVolumeCM(volumeCM)
        } else {
          let volumeCM = ',体积' + value + '@@立方厘米@@'
          setVolumeCM(volumeCM)
        }
      } else if (name == 'hzbrmc_disp_cm') {
        // 位移 - 厘米
        // let dispCM = ',位移' + value + '@@厘米@@'
        // setDispCM(dispCM)
        if (value == '' || value == 0) {
          let dispCM = ''
          setDispCM(dispCM)
        } else {
          let dispCM = ',位移' + value + '@@厘米@@'
          setDispCM(dispCM)
        }
      } else if (name == 'hzbrmc_disp_mm') {
        // 位移 - 毫米
        // let dispMM = ',位移' + value + '@@毫米@@'
        // setDispMM(dispMM)
        if (value == '' || value == 0) {
          let dispMM = ''
          setDispMM(dispMM)
        } else {
          let dispMM = ',位移' + value + '@@毫米@@'
          setDispMM(dispMM)
        }
      } else if (name == 'hzbrmc_angle_c') {
        // 角度 - 度
        // let angle = ',角度' + value + '@@度@@'
        // setAngle(angle)
        if (value == '' || value == 0) {
          let angle = ''
          setAngle(angle)
        } else {
          let angle = ',角度' + value + '@@度@@'
          setAngle(angle)
        }
      } else if (name == 'hzbrmc_chu') {
        // 处
        // let chu = ',' + value + '@@处@@'
        // setChu(chu)
        if (value == '' || value == 0) {
          let chu = ''
          setChu(chu)
        } else {
          let chu = ',' + value + '@@处@@'
          setChu(chu)
        }
      } else if (name == 'hzbrmc_tiao') {
        // 条
        // let tiao = ',' + value + '@@条@@'
        // setTiao(tiao)
        if (value == '' || value == 0) {
          let tiao = ''
          setTiao(tiao)
        } else {
          let tiao = ',' + value + '@@条@@'
          setTiao(tiao)
        }
      } else if (name == 'hzbrmc_range_fenbu_m') {
        // 分布范围 - 米
        // let rangeFenbuM = ',分布范围' + value + '@@米@@'
        // setRangeFenbuM(rangeFenbuM)
        if (value == '' || value == 0) {
          let rangeFenbuM = ''
          setRangeFenbuM(rangeFenbuM)
        } else {
          let rangeFenbuM = ',分布范围' + value + '@@米@@'
          setRangeFenbuM(rangeFenbuM)
        }
      } else if (name == 'hzbrmc_range_length_m') {
        // 长度范围 - 米
        // let rangeLengthM = ',长度范围' + value + '@@米@@'
        // setRangeLengthM(rangeLengthM)
        if (value == '' || value == 0) {
          let rangeLengthM = ''
          setRangeLengthM(rangeLengthM)
        } else {
          let rangeLengthM = ',长度范围' + value + '@@米@@'
          setRangeLengthM(rangeLengthM)
        }
      } else if (name == 'hzbrmc_range_width_mm') {
        // 宽度范围 - 毫米
        // let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
        // setRangeWidthMM(rangeWidthMM)
        if (value == '' || value == 0) {
          let rangeWidthMM = ''
          setRangeWidthMM(rangeWidthMM)
        } else {
          let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
          setRangeWidthMM(rangeWidthMM)
        }
      } else if (name == 'hzbrmc_range_spacing_cm') {
        // 间距范围 - 厘米
        // let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
        // setRangeSpacingCM(rangeSpacingCM)
        if (value == '' || value == 0) {
          let rangeSpacingCM = ''
          setRangeSpacingCM(rangeSpacingCM)
        } else {
          let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
          setRangeSpacingCM(rangeSpacingCM)
        }
      } else if (name == 'hzbrmc_lb_left_length_m') {
        // 左腹板长度 - 米
        // let leftLengthM = ',左腹板长度' + value + '@@米@@'
        // setLeftLengthM(leftLengthM)
        if (value == '' || value == 0) {
          let leftLengthM = ''
          setLeftLengthM(leftLengthM)
        } else {
          let leftLengthM = ',左腹板长度' + value + '@@米@@'
          setLeftLengthM(leftLengthM)
        }
      } else if (name == 'hzbrmc_lb_bottom_length_m') {
        // 底板长度 - 米
        // let bottomLengthM = ',底板长度' + value + '@@米@@'
        // setBottomLengthM(bottomLengthM)
        if (value == '' || value == 0) {
          let bottomLengthM = ''
          setBottomLengthM(bottomLengthM)
        } else {
          let bottomLengthM = ',底板长度' + value + '@@米@@'
          setBottomLengthM(bottomLengthM)
        }
      } else if (name == 'hzbrmc_lb_right_length_m') {
        // 右腹板长度 - 米
        // let rightLengthM = ',右腹板长度' + value + '@@米@@'
        // setRightLengthM(rightLengthM)
        if (value == '' || value == 0) {
          let rightLengthM = ''
          setRightLengthM(rightLengthM)
        } else {
          let rightLengthM = ',右腹板长度' + value + '@@米@@'
          setRightLengthM(rightLengthM)
        }
      } else if (name == 'hzbrmc_lb_left_width_mm') {
        // 左腹板宽度 - 毫米
        // let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
        // setLeftWidthMM(leftWidthMM)
        if (value == '' || value == 0) {
          let leftWidthMM = ''
          setLeftWidthMM(leftWidthMM)
        } else {
          let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
          setLeftWidthMM(leftWidthMM)
        }
      } else if (name == 'hzbrmc_lb_bottom_width_mm') {
        // 底板宽度 - 毫米
        // let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
        // setBottomWidthMM(bottomWidthMM)
        if (value == '' || value == 0) {
          let bottomWidthMM = ''
          setBottomWidthMM(bottomWidthMM)
        } else {
          let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
          setBottomWidthMM(bottomWidthMM)
        }
      } else if (name == 'hzbrmc_lb_right_width_mm') {
        // 右腹板宽度 - 毫米
        // let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
        // setRightWidthMM(rightWidthMM)
        if (value == '' || value == 0) {
          let rightWidthMM = ''
          setRightWidthMM(rightWidthMM)
        } else {
          let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
          setRightWidthMM(rightWidthMM)
        }
      } else if (name == 'hzbrmc_slant_m') {
        // 倾斜量 - 米
        // let slantM = ',倾斜量' + value + '@@米@@'
        // setSlantM(slantM)
        if (value == '' || value == 0) {
          let slantM = ''
          setSlantM(slantM)
        } else {
          let slantM = ',倾斜量' + value + '@@米@@'
          setSlantM(slantM)
        }
      }
      setDiseaseData(_data);
    };

    const [writeDesTextValue, setWriteDesTextValue] = useState('')

    // 填入病害描述内容
    const writeDesText = (name, value) => {
      // let writeTxt = []
      console.log('writeDesText', name, value);
      setWriteDesTextValue(value)

      if (name == 'memberLength') {
        diseaseData['memberLength'] = value
        handleFormChenge(value, diseaseData.memberLength)
      } else if (name == 'memberWidth') {
        diseaseData['memberWidth'] = value
        handleFormChenge(value, diseaseData.memberWidth)
      } else if (name == 'memberHeight') {
        diseaseData['memberHeight'] = value
        handleFormChenge(value, diseaseData.memberHeight)
      }


      console.log('diseaseData.memberLength1',diseaseData.memberLength, diseaseData.memberWidth, diseaseData.memberHeight);
      console.log('name value1', name, value);

      // 当数据是长宽高的时候，进行数据存储
      if (name == 'memberLength' || name == 'memberWidth' || name == 'memberHeight') {
        setStorage(name, value)
      }

      if (true) {
        if (diseaseData.scale !== '' && diseaseData.scale !== '0' && diseaseData.scale !== '') {
          var biaodu = ',标度' + diseaseData.scale + '@@'
          setBiaodu(biaodu)
        } else {
          var biaodu = ''
          setBiaodu(biaodu)
        }
        if (diseaseData.hzbrmc_length_m !== undefined && diseaseData.hzbrmc_length_m !== '0' && diseaseData.hzbrmc_length_m !== '') {
          var lengthM = ',长度' + diseaseData.hzbrmc_length_m + '@@米@@'
          setLengthM(lengthM)
        } else {
          var lengthM = ''
          setLengthM(lengthM)
        }
        if (diseaseData.hzbrmc_length_cm !== undefined && diseaseData.hzbrmc_length_cm !== '0' && diseaseData.hzbrmc_length_cm !== '') {
          var lengthCM = ',长度' + diseaseData.hzbrmc_length_cm + '@@厘米@@'
          setLengthCM(lengthCM)
        } else {
          var lengthCM = ''
          setLengthCM(lengthCM)
        }
        if (diseaseData.hzbrmc_length_mm !== undefined && diseaseData.hzbrmc_length_mm !== '0' && diseaseData.hzbrmc_length_mm !== '') {
          var lengthMM = ',长度' + diseaseData.hzbrmc_length_mm + '@@毫米@@'
          setLengthMM(lengthMM)
        } else {
          var lengthMM = ''
          setLengthMM(lengthMM)
        }
        if (diseaseData.hzbrmc_width_m !== undefined && diseaseData.hzbrmc_width_m !== '0' && diseaseData.hzbrmc_width_m !== '') {
          var widthM = ',宽度' + diseaseData.hzbrmc_width_m + '@@米@@'
          setWidthM(widthM)
        } else {
          var widthM = ''
          setWidthM(widthM)
        }
        if (diseaseData.hzbrmc_width_cm !== undefined && diseaseData.hzbrmc_width_cm !== '0' && diseaseData.hzbrmc_width_cm !== '') {
          var widthCM = ',宽度' + diseaseData.hzbrmc_width_cm + '@@厘米@@'
          setWidthCM(widthCM)
        } else {
          var widthCM = ''
          setWidthCM(widthCM)
        }
        if (diseaseData.hzbrmc_width_mm !== undefined && diseaseData.hzbrmc_width_mm !== '0' && diseaseData.hzbrmc_width_mm !== '') {
          console.log('diseaseData.hzbrmc_width_mm',diseaseData.hzbrmc_width_mm == '');
          var widthMM = ',宽度' + diseaseData.hzbrmc_width_mm + '@@毫米@@'
          setWidthMM(widthMM)
        } else {
          // diseaseData.hzbrmc_width_mm == undefined || diseaseData.hzbrmc_width_mm == 0 || diseaseData.hzbrmc_width_mm == ''
          var widthMM = ''
          setWidthMM(widthMM)
        }
        if (diseaseData.hzbrmc_height_m !== undefined && diseaseData.hzbrmc_height_m !== '0' && diseaseData.hzbrmc_height_m !== '') {
          var heightM = ',高度' + diseaseData.hzbrmc_height_m + '@@米@@'
          setHeightM(heightM)
        } else {
          var heightM = ''
          setHeightM(heightM)
        }
        if (diseaseData.hzbrmc_height_cm !== undefined && diseaseData.hzbrmc_height_cm !== '0' && diseaseData.hzbrmc_height_cm !== '') {
          var heightCM = ',高度' + diseaseData.hzbrmc_height_cm + '@@厘米@@'
          setHeightCM(heightCM)
        } else {
          var heightCM = ''
          setHeightCM(heightCM)
        }
        if (diseaseData.hzbrmc_height_mm !== undefined && diseaseData.hzbrmc_height_mm !== '0' && diseaseData.hzbrmc_height_mm !== '') {
          var heightMM = ',高度' + diseaseData.hzbrmc_height_mm + '@@毫米@@'
          setHeightMM(heightMM)
        } else {
          var heightMM = ''
          setHeightMM(heightMM)
        }
        if (diseaseData.hzbrmc_area_face !== undefined && diseaseData.hzbrmc_area_face !== '0' && diseaseData.hzbrmc_area_face !== '') {
          var areaFace = ',面域' + diseaseData.hzbrmc_area_face + '@@%@@'
          setAreaFace(areaFace)
        } else {
          var areaFace = ''
          setAreaFace(areaFace)
        }
        if (diseaseData.hzbrmc_area_per !== undefined && diseaseData.hzbrmc_area_per !== '0' && diseaseData.hzbrmc_area_per !== '') {
          var areaPer = ',面积占比' + diseaseData.hzbrmc_area_per + '@@%@@'
          setAreaPer(areaPer)
        } else {
          var areaPer = ''
          setAreaPer(areaPer)
        }
        if (diseaseData.hzbrmc_area_m !== undefined && diseaseData.hzbrmc_area_m !== '0' && diseaseData.hzbrmc_area_m !== '') {
          var areaM = ',面积' + diseaseData.hzbrmc_area_m + '@@平方米@@'
          setAreaM(areaM)
        } else {
          var areaM = ''
          setAreaM(areaM)
        }
        if (diseaseData.hzbrmc_area_cm !== undefined && diseaseData.hzbrmc_area_cm !== '0' && diseaseData.hzbrmc_area_cm !== '') {
          var areaCM = ',面积' + diseaseData.hzbrmc_area_cm + '@@平方厘米@@'
          setAreaCM(areaCM)
        } else {
          var areaCM = ''
          setAreaCM(areaCM)
        }
        if (diseaseData.hzbrmc_area_mm !== undefined && diseaseData.hzbrmc_area_mm !== '0' && diseaseData.hzbrmc_area_mm !== '') {
          var areaMM = ',面积' + diseaseData.hzbrmc_area_mm + '@@平方毫米@@'
          setAreaMM(areaMM)
        } else {
          var areaMM = ''
          setAreaMM(areaMM)
        }
        if (diseaseData.hzbrmc_heightdiff_cm !== undefined && diseaseData.hzbrmc_heightdiff_cm !== '0' && diseaseData.hzbrmc_heightdiff_cm !== '') {
          var heightDiffCM = ',高差' + diseaseData.hzbrmc_heightdiff_cm + '@@厘米@@'
          setHeightDiffCM(heightDiffCM)
        } else {
          var heightDiffCM = ''
          setHeightDiffCM(heightDiffCM)
        }
        if (diseaseData.hzbrmc_heightdiff_mm !== undefined && diseaseData.hzbrmc_heightdiff_mm !== '0' && diseaseData.hzbrmc_heightdiff_mm !== '') {
          var heightDiffMM = ',高差' + diseaseData.hzbrmc_heightdiff_mm + '@@毫米@@'
          setHeightDiffMM(heightDiffMM)
        } else {
          var heightDiffMM = ''
          setHeightDiffMM(heightDiffMM)
        }
        if (diseaseData.hzbrmc_spacing_cm !== undefined && diseaseData.hzbrmc_spacing_cm !== '0' && diseaseData.hzbrmc_spacing_cm !== '') {
          var spacingCM = ',间距' + diseaseData.hzbrmc_spacing_cm + '@@厘米@@'
          setSpacingCM(spacingCM)
        } else {
          var spacingCM = ''
          setSpacingCM(spacingCM)
        }
        if (diseaseData.hzbrmc_deformation_mm !== undefined && diseaseData.hzbrmc_deformation_mm !== '0' && diseaseData.hzbrmc_deformation_mm !== '') {
          var deformationMM = ',变形' + diseaseData.hzbrmc_deformation_mm + '@@毫米@@'
          setDeformationMM(deformationMM)
        } else {
          var deformationMM = ''
          setDeformationMM(deformationMM)
        }
        if (diseaseData.hzbrmc_num !== undefined && diseaseData.hzbrmc_num !== '0' && diseaseData.hzbrmc_num !== '') {
          var num = ',个数' + diseaseData.hzbrmc_num + '@@个@@'
          setNum(num)
        } else {
          var num = ''
          setNum(num)
        }
        if (diseaseData.hzbrmc_range_cm !== undefined && diseaseData.hzbrmc_range_cm !== '0' && diseaseData.hzbrmc_range_cm !== '') {
          var rangeCM = ',距离' + diseaseData.hzbrmc_range_cm + '@@厘米@@'
          setRangeCM(rangeCM)
        } else {
          var rangeCM = ''
          setRangeCM(rangeCM)
        }
        if (diseaseData.hzbrmc_range_mm !== undefined && diseaseData.hzbrmc_range_mm !== '0' && diseaseData.hzbrmc_range_mm !== '') {
          var rangeMM = ',距离' + diseaseData.hzbrmc_range_mm + '@@毫米@@'
          setRangeMM(rangeMM)
        } else {
          var rangeMM = ''
          setRangeMM(rangeMM)
        }
        if (diseaseData.hzbrmc_depth_cm !== undefined && diseaseData.hzbrmc_depth_cm !== '0' && diseaseData.hzbrmc_depth_cm !== '') {
          var depthCM = ',深度' + diseaseData.hzbrmc_depth_cm + '@@厘米@@'
          setDepthCM(depthCM)
        } else {
          var depthCM = ''
          setDepthCM(depthCM)
        }
        if (diseaseData.hzbrmc_depth_mm !== undefined && diseaseData.hzbrmc_depth_mm !== '0' && diseaseData.hzbrmc_depth_mm !== '') {
          var depthMM = ',深度' + diseaseData.hzbrmc_depth_mm + '@@毫米@@'
          setDepthMM(depthMM)
        } else {
          var depthMM = ''
          setDepthMM(depthMM)
        }
        if (diseaseData.hzbrmc_volume_m !== undefined && diseaseData.hzbrmc_volume_m !== '0' && diseaseData.hzbrmc_volume_m !== '') {
          var volumeM = ',体积' + diseaseData.hzbrmc_volume_m + '@@立方米@@'
          setVolumeM(volumeM)
        } else {
          var volumeM = ''
          setVolumeM(volumeM)
        }
        if (diseaseData.hzbrmc_volume_cm !== undefined && diseaseData.hzbrmc_volume_cm !== '0' && diseaseData.hzbrmc_volume_cm !== '') {
          var volumeCM = ',体积' + diseaseData.hzbrmc_volume_cm + '@@立方厘米@@'
          setVolumeCM(volumeCM)
        } else {
          var volumeCM = ''
          setVolumeCM(volumeCM)
        }
        if (diseaseData.hzbrmc_disp_cm !== undefined && diseaseData.hzbrmc_disp_cm !== '0' && diseaseData.hzbrmc_disp_cm !== '') {
          var dispCM = ',位移' + diseaseData.hzbrmc_disp_cm + '@@厘米@@'
          setDispCM(dispCM)
        } else {
          var dispCM = ''
          setDispCM(dispCM)
        }
        if (diseaseData.hzbrmc_disp_mm !== undefined && diseaseData.hzbrmc_disp_mm !== '0' && diseaseData.hzbrmc_disp_mm !== '') {
          var dispMM = ',位移' + diseaseData.hzbrmc_disp_mm + '@@毫米@@'
          setDispMM(dispMM)
        } else {
          var dispMM = ''
          setDispMM(dispMM)
        }
        if (diseaseData.hzbrmc_angle_c !== undefined && diseaseData.hzbrmc_angle_c !== '0' && diseaseData.hzbrmc_angle_c !== '') {
          var angle = ',角度' + diseaseData.hzbrmc_angle_c + '@@度@@'
          setAngle(angle)
        } else {
          var angle = ''
          setAngle(angle)
        }
        if (diseaseData.hzbrmc_chu !== undefined && diseaseData.hzbrmc_chu !== '0' && diseaseData.hzbrmc_chu !== '') {
          var chu = ',' + diseaseData.hzbrmc_chu + '@@处@@'
          setChu(chu)
        } else {
          var chu = ''
          setChu(chu)
        }
        if (diseaseData.hzbrmc_tiao !== undefined && diseaseData.hzbrmc_tiao !== '0' && diseaseData.hzbrmc_tiao !== '') {
          var tiao = ',' + diseaseData.hzbrmc_tiao + '@@条@@'
          setTiao(tiao)
        } else {
          var tiao = ''
          setTiao(tiao)
        }
        if (diseaseData.hzbrmc_range_fenbu_m !== undefined && diseaseData.hzbrmc_range_fenbu_m !== '0' && diseaseData.hzbrmc_range_fenbu_m !== '') {
          var rangeFenbuM = ',分布范围' + diseaseData.hzbrmc_range_fenbu_m + '@@米@@'
          setRangeFenbuM(rangeFenbuM)
        } else {
          var rangeFenbuM = ''
          setRangeFenbuM(rangeFenbuM)
        }
        if (diseaseData.hzbrmc_range_length_m !== undefined && diseaseData.hzbrmc_range_length_m !== '0' && diseaseData.hzbrmc_range_length_m !== '') {
          var rangeLengthM = ',长度范围' + diseaseData.hzbrmc_range_length_m + '@@米@@'
          setRangeLengthM(rangeLengthM)
        } else {
          var rangeLengthM = ''
          setRangeLengthM(rangeLengthM)
        }
        if (diseaseData.hzbrmc_range_width_mm !== undefined && diseaseData.hzbrmc_range_width_mm !== '0' && diseaseData.hzbrmc_range_width_mm !== '') {
          var rangeWidthMM = ',宽度范围'+ diseaseData.hzbrmc_range_width_mm + '@@毫米@@'
          setRangeWidthMM(rangeWidthMM)
        } else {
          var rangeWidthMM = ''
          setRangeWidthMM(rangeWidthMM)
        }
        if (diseaseData.hzbrmc_range_spacing_cm !== undefined && diseaseData.hzbrmc_range_spacing_cm !== '0' && diseaseData.hzbrmc_range_spacing_cm !== '') {
          var rangeSpacingCM = ',间距范围' + diseaseData.hzbrmc_range_spacing_cm + '@@厘米@@'
          setRangeSpacingCM(rangeSpacingCM)
        } else {
          var rangeSpacingCM = ''
          setRangeSpacingCM(rangeSpacingCM)
        }
        if (diseaseData.hzbrmc_lb_left_length_m !== undefined && diseaseData.hzbrmc_lb_left_length_m !== '0' && diseaseData.hzbrmc_lb_left_length_m !== '') {
          var leftLengthM = ',左腹板长度' + diseaseData.hzbrmc_lb_left_length_m + '@@米@@'
          setLeftLengthM(leftLengthM)
        } else {
          var leftLengthM = ''
          setLeftLengthM(leftLengthM)
        }
        if (diseaseData.hzbrmc_lb_bottom_length_m !== undefined && diseaseData.hzbrmc_lb_bottom_length_m !== '0' && diseaseData.hzbrmc_lb_bottom_length_m !== '') {
          var bottomLengthM = ',底板长度' + diseaseData.hzbrmc_lb_bottom_length_m + '@@米@@'
          setBottomLengthM(bottomLengthM)
        } else {
          var bottomLengthM = ''
          setBottomLengthM(bottomLengthM)
        }
        if (diseaseData.hzbrmc_lb_right_length_m !== undefined && diseaseData.hzbrmc_lb_right_length_m !== '0' && diseaseData.hzbrmc_lb_right_length_m !== '') {
          var rightLengthM = ',右腹板长度' + diseaseData.hzbrmc_lb_right_length_m + '@@米@@'
          setRightLengthM(rightLengthM)
        } else {
          var rightLengthM = ''
          setRightLengthM(rightLengthM)
        }
        if (diseaseData.hzbrmc_lb_left_width_mm !== undefined && diseaseData.hzbrmc_lb_left_width_mm !== '0' && diseaseData.hzbrmc_lb_left_width_mm !== '') {
          var leftWidthMM = ',左腹板宽度' + diseaseData.hzbrmc_lb_left_width_mm + '@@毫米@@'
          setLeftWidthMM(leftWidthMM)
        } else {
          var leftWidthMM = ''
          setLeftWidthMM(leftWidthMM)
        }
        if (diseaseData.hzbrmc_lb_bottom_width_mm !== undefined && diseaseData.hzbrmc_lb_bottom_width_mm !== '0' && diseaseData.hzbrmc_lb_bottom_width_mm !== '') {
          var bottomWidthMM = ',底板宽度' + diseaseData.hzbrmc_lb_bottom_width_mm + '@@毫米@@'
          setBottomWidthMM(bottomWidthMM)
        } else {
          var bottomWidthMM = ''
          setBottomWidthMM(bottomWidthMM)
        }
        if (diseaseData.hzbrmc_lb_right_width_mm !== undefined && diseaseData.hzbrmc_lb_right_width_mm !== '0' && diseaseData.hzbrmc_lb_right_width_mm !== '') {
          var rightWidthMM = ',右腹板宽度' + diseaseData.hzbrmc_lb_right_width_mm + '@@毫米@@'
          setRightWidthMM(rightWidthMM)
        } else {
          var rightWidthMM = ''
          setRightWidthMM(rightWidthMM)
        }
        if (diseaseData.hzbrmc_slant_m !== undefined && diseaseData.hzbrmc_slant_m !== '0' && diseaseData.hzbrmc_slant_m !== '') {
          var slantM = ',倾斜量' + diseaseData.hzbrmc_slant_m + '@@米@@'
          setSlantM(slantM)
        } else {
          var slantM = ''
          setSlantM(slantM)
        }
      }

      if (writeDesTextValue == '' || writeDesTextValue == undefined) {
        console.log('没有修改数据');
        if (diseaseData.description == '' || diseaseData.description == undefined) {
          diseaseData['description'] = itemData.diseaseName
        } else if (diseaseData.description !== '' || diseaseData.description !== undefined) {
          let writeTxt = lengthM + lengthCM + lengthMM + widthM + widthCM
                  + widthMM + heightM + heightCM + heightMM + areaFace
                  + areaPer + areaM + areaCM + areaMM + heightDiffCM + heightDiffMM
                  + spacingCM + deformationMM + num + rangeCM + rangeMM + depthCM
                  + depthMM + volumeM + volumeCM + dispCM + dispMM + angle + chu
                  + tiao + rangeFenbuM + rangeLengthM + rangeWidthMM + rangeSpacingCM
                  + leftLengthM + bottomLengthM + rightLengthM + leftWidthMM
                  + bottomWidthMM + rightWidthMM + slantM
          // let writeTxt = diseaseData.hzbrmc_length_m
          setWriteTxt(writeTxt)
          // console.log('writeTxt', writeTxt);
          // console.log('病害名称',itemData.diseaseName);
          let binghai = itemData.diseaseName
          let allText = binghai.concat(writeTxt)
          console.log('allText', allText);
          diseaseData['description'] = allText
          handleFormChenge(allText, diseaseData.description)
        }
      } else {
        let writeTxt = lengthM + lengthCM + lengthMM + widthM + widthCM
                  + widthMM + heightM + heightCM + heightMM + areaFace
                  + areaPer + areaM + areaCM + areaMM + heightDiffCM + heightDiffMM
                  + spacingCM + deformationMM + num + rangeCM + rangeMM + depthCM
                  + depthMM + volumeM + volumeCM + dispCM + dispMM + angle + chu
                  + tiao + rangeFenbuM + rangeLengthM + rangeWidthMM + rangeSpacingCM
                  + leftLengthM + bottomLengthM + rightLengthM + leftWidthMM
                  + bottomWidthMM + rightWidthMM + slantM
        setWriteTxt(writeTxt)
        console.log('writeTxt', writeTxt);
        console.log('病害名称',itemData.diseaseName);
        let binghai = itemData.diseaseName
        let allText = binghai.concat(writeTxt)
        console.log('allText', allText);
        diseaseData['description'] = allText
        handleFormChenge(allText, diseaseData.description)
      }
    }

    // 存入数据
    const setStorage = async(name, value) => {
      console.log('存储长宽高数据的函数~~', name, value);
      // 桥梁id + 部件名称 + 长/宽/高
      const REname = bridgeId + '_' + storageMemberName + '_' + name
      try {
        await AsyncStorage.setItem(REname, value)
      } catch (err) {
        console.log('存入数据失败!', err);
      }
    }

    const writeNum = () => {
      try {
        console.log('长宽高的数据::',diseaseData.memberLength,diseaseData.memberWidth,diseaseData.memberHeight);
        const lengthName = bridgeId + '_' + storageMemberName + '_' + 'memberLength'
        const lengthValue = AsyncStorage.getItem(lengthName)
        const widthName = bridgeId + '_' + storageMemberName + '_' + 'memberWidth'
        const widthValue = AsyncStorage.getItem(widthName)
        const heightName = bridgeId + '_' + storageMemberName + '_' + 'memberHeight'
        const heightValue = AsyncStorage.getItem(heightName)
        // if (diseaseData.memberLength == undefined || diseaseData.memberLength !== lengthValue) {
        //   // console.log('长度数据为空');
        //   getStorage(lengthName)
        // } else if (diseaseData.memberWidth == undefined || diseaseData.memberWidth !== widthValue) {
        //   // console.log('宽度数据为空');
        //   getStorage(widthName)
        // } else if (diseaseData.memberHeight == undefined || diseaseData.memberHeight !== heightValue) {
        //   // console.log('高度数据为空');
        //   getStorage(heightName)
        // }
        getStorage(lengthName)
        getStorage(widthName)
        getStorage(heightName)
      } catch (e) {
        console.log('writeNum错误',e);
      }
    }

    // 读取数据
    const getStorage = async(name) => {
      console.log('读取存储的长宽高的数据~',name);
      // console.log('diseaseData 有无',diseaseData);
      try {
        const value = await AsyncStorage.getItem(name)
        console.log('value~~~',value);
        if (value !== null) {
          console.log('读取到的数据',name,value);
          if (name == bridgeId + '_' + storageMemberName + '_' + 'memberLength') {
            console.log('length99999');
            diseaseData['memberLength'] = value
            setDiseaseData(diseaseData)
            handleFormChenge(value, diseaseData.memberLength)
          } else if (name == bridgeId + '_' + storageMemberName + '_' + 'memberWidth') {
            console.log('Width99999');
            diseaseData['memberWidth'] = value
            setDiseaseData(diseaseData)
            handleFormChenge(value, diseaseData.memberWidth)
          } else if (name == bridgeId + '_' + storageMemberName + '_' + 'memberHeight') {
            console.log('Height99999');
            diseaseData['memberHeight'] = value
            setDiseaseData(diseaseData)
            handleFormChenge(value, diseaseData.memberHeight)
          }
        }
      } catch (err) {
        console.log('读取失败~', err);
      }
    }

    // 填入位置描述内容
    const writePositionText = () => {
      try {
        // console.log('diseaseData.area', diseaseData.area);
        console.log('diseaseData.lengthText',lengthText,widthText,heightText);
        if (diseaseData.area == undefined) {
          var areaName = ''
          setAreaName(areaName)
          console.log('diseaseData.area为空');

          // 宽度描述
          if (widthText == '0' || widthText == '0.0') {
            var widthNum = ''
            setWidthNum(widthNum)
          } else if (widthText !== '0' || widthText !== '0.0') {
            var widthNum = '距左侧' + widthText + 'm'
            setWidthNum(widthNum)
          }

          // 距顶描述
          if (heightText == '0' || heightText == '0.0') {
            var heightNum = ''
            setHeightNum(heightNum)
          } else if (heightText !== '0' || heightText !== '0.0') {
            if (widthNum == '') {
              var heightNum = '距顶部' + heightText + 'm'
              setHeightNum(heightNum)
            } else {
              var heightNum = ',距顶部' + heightText + 'm'
              setHeightNum(heightNum)
            }
          }

          if (heightNum == '' && widthNum == '') {
            let writePositionTxt = areaName
            setWritePositionTxt(writePositionTxt)
            diseaseData['writePositionTxt'] = writePositionTxt
            setDiseaseData(diseaseData)
            handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
          } else {
            if (widthNum == '') {
              let writePositionTxt = areaName + widthNum + heightNum + '处'
              setWritePositionTxt(writePositionTxt)
              diseaseData['writePositionTxt'] = writePositionTxt
              setDiseaseData(diseaseData)
              handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
            } else {
              // 位置描述 = / + 病害区域 + 桥台 + 宽度 + 高度
              let writePositionTxt = areaName + widthNum + heightNum + '处'
              setWritePositionTxt(writePositionTxt)
              diseaseData['writePositionTxt'] = writePositionTxt
              setDiseaseData(diseaseData)
              handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
            }
          }
        } else {
          console.log('有数据了');
          console.log('构件区域列表：：',areaparam);
          console.log('表单中的构件区域',diseaseData.area);
          console.log('构件类型',labelName);
          if (labelName == 'at0000' && diseaseData.area == undefined || diseaseData.area == '' || diseaseData.area == '/') {
            console.log('empty~~~');
            var areaName = ''
            diseaseData['area'] = areaName
            handleFormChenge(areaName, diseaseData.area)
          } else if (labelName == 'at0000' && diseaseData.area !== undefined || diseaseData.area !== '' || diseaseData.area !== '/') {
            console.log('not empty~~~~');
            var areaName = diseaseData.area
            diseaseData['area'] = areaName
            handleFormChenge(areaName, diseaseData.area)
          }
          if (areaparam !== []) {
            let areaArr = areaparam
            let inputArea = diseaseData.area
            console.log('inputArea',inputArea);
            for (let i = 0; i < areaArr.length; i++) {
              if (inputArea == areaArr[i].value) {
                console.log('此时选中的构件是：',areaArr[i].label);
                var areaName = areaArr[i].label
                console.log(areaName);
                setAreaName(areaName)
              }
            }
          }
          
          // 墩/台描述
          // 长度描述
          // if (lengthText == '0') {
          //   var lengthNum = ''
          //   setLengthNum(lengthNum)
          //   // let pier = ''
          //   // setPier(pier)
          // } else if (lengthText !== '0') {
          //   var lengthNum = lengthText + 'm,'
          //   setLengthNum(lengthNum)
          // }
          
          // 宽度描述
          if (widthText == '0' || widthText == '0.0') {
            var widthNum = ''
            setWidthNum(widthNum)
          } else if (widthText !== '0' || widthText !== '0.0') {
            var widthNum = '距左侧' + widthText + 'm'
            setWidthNum(widthNum)
          }

          // 距顶描述
          if (heightText == '0' || heightText == '0.0') {
            var heightNum = ''
            setHeightNum(heightNum)
          } else if (heightText !== '0' || heightText !== '0.0') {
            if (widthNum == '') {
              var heightNum = '距顶部' + heightText + 'm'
              setHeightNum(heightNum)
            } else {
              var heightNum = ',距顶部' + heightText + 'm'
              setHeightNum(heightNum)
            }
          }


          if (heightNum == '' && widthNum == '') {
            let writePositionTxt = areaName
            setWritePositionTxt(writePositionTxt)
            diseaseData['writePositionTxt'] = writePositionTxt
            setDiseaseData(diseaseData)
            handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
          } else {

            if (widthNum == '') {
              let writePositionTxt = areaName + widthNum + heightNum + '处'
              setWritePositionTxt(writePositionTxt)
              diseaseData['writePositionTxt'] = writePositionTxt
              setDiseaseData(diseaseData)
              handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
            } else {
              // 位置描述 = / + 病害区域 + 桥台 + 宽度 + 高度
              let writePositionTxt = areaName + widthNum + heightNum + '处'
              setWritePositionTxt(writePositionTxt)
              diseaseData['writePositionTxt'] = writePositionTxt
              setDiseaseData(diseaseData)
              handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
            }

            
          }
        }
      } catch (err) {
        console.log('出现错误1:',err);
      }
    }

    // 一键填入病害描述与位置描述
    const allWrite = () => {
      writeDesText()
      writePositionText()
    }


  {/* ================================================= */}
  {/* 病害填写表格区域 */}
  return (
  <View style={tailwind.flexRow}>
    {/* 病害填写表格区域 */}
    <ScrollView style={{height:350}}>
      <View>
      <View style={[tailwind.flexRow, tailwind.justifyBetween]}>
        <LabelItem label="编号:">
          <Text style={[tailwind.fontBold]}>
            {route.params?.data?.index}
          </Text>
        </LabelItem>
        <View style={tailwind.flexRow}>
          <LabelItem
            label="重点关注"
            LabelStyle={[tailwind.mR0, {color:'#2b427d'}]}
          />
          <Checkbox
            checked={!!diseaseData?.mian}
            onPress={() =>
              handleFormChenge({
                name: 'mian',
                value: !diseaseData?.mian + 0,
              })
            }
          />
        </View>
      </View>
      <View style={[tailwind.flexRow]}>
        <View style={{width:230}}>
           <Select
          label="构件类型"
          name="areatype"
          labelName="areaname"
          valueName="areatype"
          value={diseaseData?.areatype}
          onChange={handleFormChenge}
          values={baseData.components}
        /> 
        </View>
        <View style={{width:230}}>
          <View style={tailwind.mB2}>
            {!areaparam.length ? (
              <TextInput
                name="area"
                label="构件区域"
                value={diseaseData?.area}
                onChange={handleFormChenge}
                lines={1}
                height={25}
              />
            ) : (
              <Select
                name="area"
                label="构件区域"
                value={diseaseData?.area}
                values={areaparam}
                onChange={handleFormChenge}
              />
            )}
          </View>
        </View>
        
      </View>
      
      {/* 原本的标度内容 */}
      {/* {scale.length ? (
        <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
          <LabelItem label="标度" />
          <TouchableOpacity onPress={handleScaleOpen}>
            <Icon
              name="information"
              size={20}
              style={[tailwind.mR2, {color:'#2b427d'}]}
            />
          </TouchableOpacity>
          <RadioGroup
            name="scale"
            values={scale}
            value={diseaseData?.scale}
            onChange={handleFormChenge}
          />
        </View>
      ) : (
        <></>
      )} */}

      {/* 修改标度数据源 */}
      {rightScale.length ? (
          <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
            <LabelItem label="标度" />
            <TouchableOpacity onPress={handleScaleOpen}>
              <Icon
                name="information"
                size={20}
                style={[tailwind.mR2, {color:'#2b427d'}]}
              />
            </TouchableOpacity>
            <RadioGroup
              name="scale"
              values={rightScale} // 初始数据第一项为'无'，提取第二项及以后的数据传入组件
              value={diseaseData?.scale}
              onChange={handleFormChenge}
            />
          </View>
        ) : (
          <></>
        )}


      <View style={tailwind.mT2} />
      <View>
        <View style={[tailwind.flexRow]}>
        <TouchableOpacity style={{width:90,height:20,borderRadius: 5,
            backgroundColor: '#2b427d',
            justifyContent: 'center',
            overflow: 'hidden'}}
            onPress={writeNum}>
            <Text style={{textAlign: 'center',color:'#fff',fontSize:12}}>获取上一次数据</Text>
          </TouchableOpacity>
          <LabelItem label="病害位置(米)" style={[tailwind.w18,{marginLeft:10}]} />
          <Text>距左侧边缘{widthText}米; 距顶部边缘{heightText}米</Text>
          <Text>  </Text>
          
        </View>
        {/* <View style={tailwind.mT2} /> */}
        {/* <View style={[tailwind.flexRow]}>
          <LabelItem label="长度" />
          <KeyboardInput
            name="memberLength"
            value={diseaseData?.memberLength}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disLength"
            memberData={diseaseData?.memberLength}
            value={diseaseData?.disLength}
            onChange={handleFormChenge}
          />
        </View> */}
        <View style={tailwind.mT2} />
        <View style={[tailwind.flexRow]}>
          <LabelItem label="台宽" style={tailwind.w18} />
          <KeyboardInput
            name="memberWidth"
            value={diseaseData?.memberWidth}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disWidth"
            memberData={diseaseData?.memberWidth}
            value={diseaseData?.disWidth}
            onChange={handleFormChenge}
          />
        </View>
        <View style={tailwind.mT2} />
        <View style={[tailwind.flexRow,tailwind.mB3]}>
          <LabelItem label="台高" style={tailwind.w18} />
          <KeyboardInput
            name="memberHeight"
            value={diseaseData?.memberHeight}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disHeight"
            memberData={diseaseData?.memberHeight}
            value={diseaseData?.disHeight}
            onChange={handleFormChenge}
          />
        </View>
      </View>
      <View style={tailwind.mT2} />
      <View style={[tailwind.flexRow]}>
        <View style={{width:500}}>
          <WriteInput
            name="description"
            label="病害描述"
            value={diseaseData?.description}
            onChange={handleFormChenge}
            lines={3}
            height={70}
            // disabled={true}
          />
        </View>
        {/* <TouchableOpacity style={styles.sideButton} onPress={writeDesText}>
          <Text style={[{color:'#fff',fontSize:12}]}>填入描述</Text>
        </TouchableOpacity> */}
      </View>
      <View style={tailwind.mT2} />
      <View style={[tailwind.flexRow]}>
        <View style={{width:500}}>
          <WriteInput
            name="writePositionTxt"
            label="位置描述"
            value={diseaseData?.writePositionTxt}
            onChange={handleFormChenge}
            lines={3}
            height={70}
          />
        </View>
        {/* <TouchableOpacity style={styles.sideButton} onPress={writePositionText}>
          <Text style={[{color:'#fff',fontSize:12}]}>填入描述</Text>
        </TouchableOpacity> */}
      </View>
    </View>
    </ScrollView>
    
    {/* ================================================= */}
    <View style={tailwind.mX3} />
    
    <View style={[{width:'20%'}]}>
    <View>
      {/* <LabelItem label="当前病害:" /> */}
      <Text style={[tailwind.fontBold,{width:'100%'}]}>
        {itemData?.diseaseName}
      </Text>
    </View>
    <View style={tailwind.mT2} />
    {infoList.length ? (
        infoList.map(({strvalue, strinfo}, index) => (
          <React.Fragment key={index}>
              <View style={[tailwind.mB2]}>
                <LabelItem label={strinfo} />
                <View style={{width:'70%',height:25}}>
                  <KeyboardInput
                    name={strvalue}
                    value={diseaseData[strvalue]}
                    onChange={handleFormChenge}
                  />
                </View>
              </View>
          </React.Fragment>
        ))
      ) : (
        <></>
      )}
      <TouchableOpacity style={styles.bottomButton} onPress={allWrite}>
        <Text style={[{color:'#fff',fontSize:14}]}>生成描述</Text>
      </TouchableOpacity>
    </View>
    
    <ScaleInfo ref={scaleInfoRef} info={scaleTabel} />
  </View>
  );
  {/* ================================================= */}
}

export function DiseaseH({route, navigation}) {
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
  
    const [areaparam, areanode] = hooks.useArea({diseaseData, baseData});
  
    // const infoList = hooks.useInfoComponents({diseaseData, baseData});
    const [infoList,setInfoList] = useState([])
  
    const defaultFileName = hooks.useDefaultFileName({diseaseData, baseData});
  
    const [scale, scaleInfo] = hooks.useScale({
      diseaseData,
      typeList: route.params?.type?.list,
      baseData,
    });


    React.useEffect(() => {
      setDiseaseData(itemData);
      console.log('itemData:',itemData);
      try {
        console.log('itemData',itemData.standard.scale);
        setBiaodu(itemData.standard.scale)
        diseaseData['scale'] = itemData.standard.scale
      } catch (error) {
        console.log('设置标度初始值',error);
      }
    }, [itemData]);
  
    const [lengthText, setLengthText] = useState()
    const [widthText, setWidthText] = useState()
    const [heightText, setHeightText] = useState()
    // =================================================
    const [writeTxt, setWriteTxt] = useState('')
    const [writePositionTxt, setWritePositionTxt] = useState('')
    // -------------------------------------------------
    // 标度,默认为 2
    const [biaodu, setBiaodu] = useState(2)
    // 长度 - 米
    const [lengthM, setLengthM] = useState('')
    // 长度 - 厘米
    const [lengthCM, setLengthCM] = useState('')
    // 长度 - 毫米
    const [lengthMM, setLengthMM] = useState('')
    // 宽度 - 米
    const [widthM, setWidthM] = useState('')
    // 宽度 - 厘米
    const [widthCM, setWidthCM] = useState('')
    // 宽度 - 毫米
    const [widthMM, setWidthMM] = useState('')
    // 高度 - 米
    const [heightM, setHeightM] = useState('')
    // 高度 - 厘米
    const [heightCM, setHeightCM] = useState('')
    // 高度 - 毫米
    const [heightMM, setHeightMM] = useState('')
    // 面域 - %
    const [areaFace, setAreaFace] = useState('')
    // 面积占比 - %
    const [areaPer, setAreaPer] = useState('')
    // 面积 - 平方米
    const [areaM, setAreaM] = useState('')
    // 面积 - 平方厘米
    const [areaCM, setAreaCM] = useState('')
    // 面积 - 平方毫米
    const [areaMM, setAreaMM] = useState('')
    // 高差 - 厘米
    const [heightDiffCM, setHeightDiffCM] = useState('')
    // 高差 - 毫米
    const [heightDiffMM, setHeightDiffMM] = useState('')
    // 间距 - 厘米
    const [spacingCM, setSpacingCM] = useState('')
    // 变形 - 毫米
    const [deformationMM, setDeformationMM] = useState('')
    // 个数 - 个
    const [num, setNum] = useState('')
    // 距离 - 厘米
    const [rangeCM, setRangeCM] = useState('')
    // 距离 - 毫米
    const [rangeMM, setRangeMM] = useState('')
    // 深度 - 厘米
    const [depthCM, setDepthCM] = useState('')
    // 深度 - 毫米
    const [depthMM, setDepthMM] = useState('')
    // 体积 - 立方米
    const [volumeM, setVolumeM] = useState('')
    // 体积 - 立方厘米
    const [volumeCM, setVolumeCM] = useState('')
    // 位移 - 厘米
    const [dispCM, setDispCM] = useState('')
    // 位移 - 毫米
    const [dispMM, setDispMM] = useState('')
    // 角度 - 度
    const [angle, setAngle] = useState('')
    // 处
    const [chu, setChu] = useState('')
    // 条
    const [tiao, setTiao] = useState('')
    // 分布范围 - 米
    const [rangeFenbuM, setRangeFenbuM] = useState('')
    // 长度范围 - 米
    const [rangeLengthM, setRangeLengthM] = useState('')
    // 宽度范围 - 毫米
    const [rangeWidthMM, setRangeWidthMM] = useState('')
    // 间距范围 - 厘米
    const [rangeSpacingCM, setRangeSpacingCM] = useState('')
    // 左腹板长度 - 米
    const [leftLengthM, setLeftLengthM] = useState('')
    // 底板长度 - 米
    const [bottomLengthM, setBottomLengthM] = useState('')
    // 右腹板长度 - 米
    const [rightLengthM, setRightLengthM] = useState('')
    // 左腹板宽度 - 毫米
    const [leftWidthMM, setLeftWidthMM] = useState('')
    // 底板宽度 - 毫米
    const [bottomWidthMM, setBottomWidthMM] = useState('')
    // 右腹板宽度 - 毫米
    const [rightWidthMM, setRightWidthMM] = useState('')
    // 倾斜量 - 米
    const [slantM, setSlantM] = useState('')

    const [saveDescription, setSaveDescription] = useState()

    // 构件类型
    const [labelName, setLabelName] = useState()
    // 构件区域
    const [areaName, setAreaName] = useState()

    // 病害名称
    const [infoshort, setInfoShort] = useState()

    // 位置描述 墩台
    const [pier,  setPier] = useState()
    // 位置描述 长、宽、距顶
    const [lengthNum, setLengthNum] = useState()
    const [widthNum, setWidthNum] = useState()
    const [heightNum, setHeightNum] = useState()

    const [diseaseName, setDiseaseName] = useState('')

    // 桥梁id
    const [bridgeId, setBridgeId] = useState(route.params.memberList[0].bridgeid)
    // 部件名称
    const [storageMemberName, setStorageMemberName] =useState(route.params.routeParams.title)

    // =================================================
    React.useEffect(() => {
      saveData.current = {...diseaseData};
      try {

        if (baseData.membercheckdata) {
          console.log('保存baseData数据');
          setBaseDataStorage(JSON.stringify(baseData.membercheckdata))
        }
        if (route.params.thridData.datastr && baseData.membercheckdata) {
          let infoList = []
          route.params.thridData.datastr.forEach((item) => {
            // console.log('病害列表传入的datastr',item);
            baseData.membercheckdata.forEach((item1) => {
              if (item == item1.strid) {
                // console.log('取出来的item1',item1);
                infoList.push(item1)
              }
            })
          })
          setInfoList(infoList)
        } else if (!baseData.membercheckdata) {
          console.log('读取baseData数据');
          getBaseDataStorage('baseData')
        }

        if (diseaseData.diseaseName == undefined || diseaseData.diseaseName == '') {
          console.log('7777');
          diseaseData['diseaseName'] = route.params.thridData.checkinfoshort
          handleFormChenge(route.params.thridData.checkinfoshort, diseaseData.diseaseName)
        }
      } catch (err){
        console.log('err09', err);
      }
      try {
        // 初始构件类型与选择的构件类型一致时，构件区域取选择的值
        // 初始构件类型与选择的构件类型不一致时，构件区域默认取第一项
        for (let i =0; i < areaparam.length; i ++) {
          if (diseaseData.area == undefined) {
            diseaseData.area = areaparam[0].value
            handleFormChenge(areaparam[0].value, diseaseData.area)
            setAreaName(areaparam[0].label)
          } else if (diseaseData.area !== undefined) {
            let sliceArea = diseaseData.area.slice(0,6)
            if (sliceArea !== diseaseData.areatype) {
              for (let k = 0; k < baseData.components.length; k++) {
                if (diseaseData.areatype == baseData.components[k].areatype) {
                  diseaseData['areatype'] = baseData.components[k].areatype
                  diseaseData['area'] = baseData.components[k].areaparamjson.areaparamlist[0].areaparamid
                }
              }
            }
          }
        }
      } catch (err) {
        console.log('err08', err);
      }
      try {
        let lengthText = (diseaseData.memberLength * (diseaseData.disLength / 100)).toFixed(2)
        setLengthText(lengthText)
        let widthText = (diseaseData.memberWidth * (diseaseData.disWidth / 100)).toFixed(2)
        setWidthText(widthText)
        let heightText = (diseaseData.memberHeight * (diseaseData.disHeight / 100)).toFixed(2)
        setHeightText(heightText)
        if (lengthText == 'NaN') {
          let lengthText = '0'
          setLengthText(lengthText)
        }
        if (widthText == 'NaN') {
          let widthText = '0'
          setWidthText(widthText)
        }
        if (heightText == 'NaN') {
          let heightText = '0'
          setHeightText(heightText)
        }

        if (diseaseData.area == undefined) {

        } else if (diseaseData.area !== '' || diseaseData.area !== undefined || diseaseData.area !== '/') {
          var sliceArea = diseaseData.area.slice(0,5)
        }
        
        if (diseaseData.areatype == 'at0000' && sliceArea == 'at000') {
          console.log(sliceArea);
          console.log('xu~~~~~');
          diseaseData['area'] = '/'
        }
        
        // 将病害位置的长宽高数据存进diseaseData
        diseaseData['lengthText'] = lengthText
        diseaseData['widthText'] = widthText
        diseaseData['heightText'] = heightText
        diseaseData['remark'] = route.params.thridData.checkinfoshort


        // 取病害名称并保存
        if (diseaseData.diseaseName == '' || diseaseData.diseaseName == undefined) {
          let diseaseName = route.params.thridData.checkinfoshort
          // setDiseaseName(diseaseName)
          console.log('0000000');
          console.log('~~~~~~~diseaseName~~~~~',diseaseName);
          diseaseData['diseaseName'] = diseaseName
          handleFormChenge(diseaseName, diseaseData.diseaseName)
          setDiseaseName(diseaseName)
        }

        if (diseaseData.stairgroupid == undefined || diseaseData.stairgroupid == '') {
          // console.log('0000.000');
          diseaseData['stairgroupid'] = route.params.stairgroupid
          handleFormChenge(route.params.stairgroupid, diseaseData.stairgroupid)
        }

        // console.log(diseaseData);
        if (diseaseData.remark == '' || diseaseData.remark == undefined) {
          let infoshort = route.params.thridData.checkinfoshort
          setInfoShort(infoshort)
        }
        if (diseaseData.description == '' || diseaseData.description == undefined) {
          diseaseData['description'] = diseaseData.remark
        }

        if (diseaseData.writePositionTxt == undefined || diseaseData.writePositionTxt == '') {
          let writePositionTxt = '/'
          setWritePositionTxt(writePositionTxt)
          diseaseData['writePositionTxt'] = writePositionTxt
          handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
        }

        try {
          if (itemData && route.params.mediaType == 'add') {
            diseaseData['scale'] = rightScaleNum
            handleFormChenge(rightScaleNum, diseaseData.scale)
            route.params.mediaType = ''
          }
        } catch (error) {
          console.log('设置标度初始值',error);
        }
      } catch {
      }
    }, [diseaseData]);

    // 保存baseData的数据
    const setBaseDataStorage = async(value) => {
      try {
        await AsyncStorage.setItem('baseData', value)
      } catch (err) {
        console.log('存入数据失败!3', err);
      }
    }
    // 读取baseData的数据
    const getBaseDataStorage = async(name) => {
      // console.log('读取baseData数据')
      try {
        const value = await AsyncStorage.getItem(name)
        let values = JSON.parse(value)
        // console.log('value~~~',value);
        let infoList = []
          route.params.thridData.datastr.forEach((item) => {
            // console.log('病害列表传入的datastr',item);
            values.forEach((item1) => {
              if (item == item1.strid) {
                // console.log('取出来的item1',item1);
                infoList.push(item1)
              }
            })
          })
          setInfoList(infoList)
      } catch (error) {
        console.log('读取baseData数据失败',error);
      }
    }

    // 重新获取数据的标度选项数组
    const [rightScale, setRightScale] = useState([])
    // 默认的标度值
    const [rightScaleNum, setRightScaleNum] = useState('')
    // 重新获取数据的标度评定标准表格
    const [scaleTabel, setScaleTabel] = useState([])
  
    React.useEffect(() => {

      try {
        console.log('scale',scale);
        // console.log('baseData', baseData);
        // console.log('标度表格信息baseData.basestandardtable',baseData.basestandardtable)

        // 当页面是由新建进入时，存储标度数组，以备编辑进入时使用
        if (route.params.mediaType == 'add' || route.params.mediaType == '') {
          // =================================
          // 获取标度列表与标度默认值
          let scaleSelect = baseData.basestandardtable
          let oldArr = ''
          let scaleNum = ''
          scaleSelect.forEach(item => {
            // console.log('33330000',item.standardid);
            
            if (route.params.thridData.strandardid == item.standardid) {
              console.log('当前病害的标度选项',item);
              // setRightScale(item.standardscalestr)
              oldArr = item.standardscalestr
              scaleNum = item.standardscale
            }
          });
          setRightScaleNum(scaleNum)
          // console.log('rightScale',rightScale);
          const arr = oldArr.split(',')
          console.log('arr',arr);
          
          let resetArr = []
          arr.forEach((item, index) => {
            resetArr.push({
              label:index + 1,
              value:item
            })
          })
          console.log('resetArr',resetArr);
          setRightScale(resetArr)
          diseaseData['scaleArr'] = rightScale
          handleFormChenge(rightScale, diseaseData.scaleArr)

          // =================================
          // 获取标度评定标准表数据
          let scaleTabel = baseData.standardtableinfo
          // console.log('表格数据',scaleTabel);
          let oldTable = []
          scaleTabel.forEach((item) => {
            if (route.params.thridData.strandardid == item.standardid) {
              // console.log('当前的评定表item',item);
              oldTable.push(item)
            }
          })
          console.log('oldTable',oldTable);
          setScaleTabel(oldTable)
          diseaseData['scaleTableArr'] = oldTable
          handleFormChenge(oldTable, diseaseData.scaleTableArr)


        } else if (route.params.mediaType == 'edit') {
          // 当页面是由编辑进入时
          setRightScale(diseaseData.scaleArr)
          setScaleTabel(scaleTabel)
          // console.log('rightScale222222',rightScale);
        }
      } catch (error) {
        console.log('获取标度数据',error);
      }

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
            // .map(
            //   ({strname, strvalue, strunit}) =>
            //     `${strname}${saveData.current[strvalue] || 0}@@${
            //       strunit || ''
            //     }@@`,
            // )
            .map(
              ({strname, strvalue, strunit}) =>
                `${saveData.current[strvalue] == undefined ? '' : strname + saveData.current[strvalue] + '@@' + strunit + '@@'}`
            )
            // .join(',');
          const strr = str.filter(item => item!=='') == '' ? '/' : str.filter(item => item!=='')
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
            }，${strr}`,
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

    useEffect(() => {
      // console.log('桥跨：：',route.params.memberList);
      let defaultPier = route.params.memberList[0].membername
      // 提取第一个字符进行判断（表示墩台的数据）
      let firstDefaultPier = defaultPier.slice(0,1)
      if (firstDefaultPier == 1) {
        let pier = '距' + (firstDefaultPier - 1) + '#台'
        setPier(pier)
        console.log('dundun:', pier);
      } else {
        let pier = '距' + (firstDefaultPier - 1) + '#墩'
        setPier(pier)
        console.log('dundun:', pier);
      }

      

      console.log('构件区域列表：：',areaparam);
      // console.log('表单中的构件区域',diseaseData.area);
      if (areaparam == '' || areaparam == undefined) {
        console.log('选的其他');
        try{
         console.log('构件类型', itemData.areatype); 
         if (itemData.areatype == 'at0000' || itemData.areatype == undefined) {
          // console.log('9999');
          diseaseData['area'] = '/'
          let labelName = 'at0000'
          setLabelName(labelName)
         }
        } catch {

        }
      }
    },[])

    const handleScaleOpen = () => scaleInfoRef.current.open();
    const handleFormChenge = ({name, value}) => {
      // const _data = {
      //   ...diseaseData,
      //   [name]: value,
      // };
      let unitt = JSON.stringify(diseaseData, [
          'areatype','area','scale','lengthText','widthText','heightText','memberLength','memberWidth',
        'memberHeight','disLength','disWidth','disHeight','hzbrmc_length_m','hzbrmc_length_cm','hzbrmc_length_mm','hzbrmc_width_m',
        'hzbrmc_width_cm','hzbrmc_width_mm','hzbrmc_height_m','hzbrmc_height_cm','hzbrmc_height_mm',
        'hzbrmc_area_face','hzbrmc_area_per','hzbrmc_area_m','hzbrmc_area_cm','hzbrmc_area_mm',
        'hzbrmc_heightdiff_cm','hzbrmc_heightdiff_mm','hzbrmc_spacing_cm','hzbrmc_deformation_mm',
        'hzbrmc_num','hzbrmc_range_cm','hzbrmc_range_mm','hzbrmc_depth_cm','hzbrmc_depth_mm',
        'hzbrmc_volume_m','hzbrmc_volume_cm','hzbrmc_disp_cm','hzbrmc_disp_mm','hzbrmc_angle_c',
        'hzbrmc_chu','hzbrmc_tiao','hzbrmc_range_fenbu_m','hzbrmc_range_length_m','hzbrmc_range_width_mm',
        'hzbrmc_range_spacing_cm','hzbrmc_lb_left_length_m','hzbrmc_lb_bottom_length_m','hzbrmc_lb_right_length_m',
        'hzbrmc_lb_left_width_mm','hzbrmc_lb_bottom_width_mm','hzbrmc_lb_right_width_mm','hzbrmc_slant_m'])
      // console.log(unitt);
      let unit = JSON.parse(unitt)
      diseaseData['unit'] = unit
      // const {area,areatype,scale,hzbrmc_length_m,hzbrmc_length_cm,hzbrmc_length_mm,hzbrmc_width_m,hzbrmc_width_cm,
      //   hzbrmc_width_mm,hzbrmc_height_m,hzbrmc_height_cm,hzbrmc_height_mm,hzbrmc_area_face,hzbrmc_area_per,
      //   hzbrmc_area_m,hzbrmc_area_cm,hzbrmc_area_mm,hzbrmc_heightdiff_cm,hzbrmc_heightdiff_mm,hzbrmc_spacing_cm,
      //   hzbrmc_deformation_mm,hzbrmc_num,hzbrmc_range_cm,hzbrmc_range_mm,hzbrmc_depth_cm,hzbrmc_depth_mm,
      //   hzbrmc_volume_m,hzbrmc_volume_cm,hzbrmc_disp_cm,hzbrmc_disp_mm,hzbrmc_angle_c,hzbrmc_chu,hzbrmc_tiao,
      //   hzbrmc_range_fenbu_m,hzbrmc_range_length_m,hzbrmc_range_width_mm,hzbrmc_range_spacing_cm,hzbrmc_lb_left_length_m,
      //   hzbrmc_lb_bottom_length_m,hzbrmc_lb_right_length_m,hzbrmc_lb_left_width_mm,hzbrmc_lb_bottom_width_mm,
      //   hzbrmc_lb_right_width_mm,hzbrmc_slant_m,lengthText,widthText,heightText,memberLength,memberWidth,
      //   memberHeight,disLength,disWidth,disHeight,...rest} = diseaseData
      const _data = {
        ...diseaseData,
        [name]: value,
      };
      if (name === 'checktypeid') {
        const _type = route.params.type.list.find(
          item => value === item.checktypeid,
        );
        let defaultScaleVal = '';
        if (_type) {
          defaultScaleVal = _type?.standardscale;
        }
        _data.scale = defaultScaleVal;
        const {basestandardtable, infoComponents} = baseData;
        const standardid =
          infoComponents.find(({checktypeid}) => value === checktypeid)
            ?.standardid || '';
        if (standardid) {
          const _standardscale = basestandardtable.find(
            item => standardid === item.standardid,
          )?.standardscale;
          if (_standardscale) {
            _data.standard = {
              scale: _standardscale,
              id: standardid,
            };
          } else {
            const defaultScale = basestandardtable.find(
              item => item.standardid === 'JTG-TH21-2011-T000-0',
            )?.standardscale;
            _data.standard = {
              scale: defaultScale,
              id: 'JTG-TH21-2011-T000-0',
            };
          }
        }
        _data.scale = _data.scale || '';
      }


      if (value) {
        // 向病害描述函数里传入
        writeDesText(name, value)
      }

      if (name == 'scale') {
        // 标度
        let biaodu = ',标度' + value + '@@'
        setBiaodu(biaodu)
      } else if (name == 'hzbrmc_length_m') {
        //长度 - 米
        // let lengthM = ',长度' + value + '@@米@@'
        // setLengthM(lengthM)
        if (value == '' || value == 0) {
          let lengthM = ''
          setLengthM(lengthM)
        } else {
          let lengthM = ',长度' + value + '@@米@@'
          setLengthM(lengthM)
        }
      } else if (name == 'hzbrmc_length_cm') {
        // 长度 - 厘米
        // let lengthCM = ',长度' + value + '@@厘米@@'
        // setLengthCM(lengthCM)
        if (value == '' || value == 0) {
          let lengthCM = ''
          setLengthCM(lengthCM)
        } else {
          let lengthCM = ',长度' + value + '@@厘米@@'
          setLengthCM(lengthCM)
        }
      } else if (name == 'hzbrmc_length_mm') {
        // 长度 - 毫米
        // let lengthMM = ',长度' + value + '@@毫米@@'
        // setLengthMM(lengthMM)
        if (value == '' || value == 0) {
          let lengthMM = ''
          setLengthMM(lengthMM)
        } else {
          let lengthMM = ',长度' + value + '@@毫米@@'
          setLengthMM(lengthMM)
        }
      } else if (name == 'hzbrmc_width_m') {
        // 宽度 - 米
        // let widthM = ',宽度' + value + '@@米@@'
        // setWidthM(widthM)
        if (value == '' || value == 0) {
          let widthM = ''
          setWidthM(widthM)
        } else {
          let widthM = ',宽度' + value + '@@米@@'
          setWidthM(widthM)
        }
      } else if (name == 'hzbrmc_width_cm') {
        // 宽度 - 厘米
        // let widthCM = ',宽度' + value + '@@厘米@@'
        // setWidthCM(widthCM)
        if (value == '' || value == 0) {
          let widthCM = ''
          setWidthCM(widthCM)
        } else {
          let widthCM = ',宽度' + value + '@@厘米@@'
          setWidthCM(widthCM)
        }
      } else if (name == 'hzbrmc_width_mm') {
        // 宽度 - 毫米
        if (value == '' || value == 0) {
          let widthMM = ''
          setWidthMM(widthMM)
        } else {
          let widthMM = ',宽度' + value + '@@毫米@@'
          setWidthMM(widthMM)
        }
      } else if (name == 'hzbrmc_height_m') {
        // 高度 - 米
        // let heightM = ',高度' + value + '@@米@@'
        // setHeightM(heightM)
        if (value == '' || value == 0) {
          let heightM = ''
          setHeightM(heightM)
        } else {
          let heightM = ',高度' + value + '@@米@@'
          setHeightM(heightM)
        }
      } else if (name == 'hzbrmc_height_cm') {
        // 高度 - 厘米
        if (value == '' || value == 0) {
          let heightCM = ''
          setHeightCM(heightCM)
        } else {
          let heightCM = ',高度' + value + '@@厘米@@'
          setHeightCM(heightCM)
        }
      } else if (name == 'hzbrmc_height_mm') {
        // 高度 - 毫米
        // let heightMM = ',高度' + value + '@@毫米@@'
        // setHeightMM(heightMM)
        if (value == '' || value == 0) {
          let heightMM = ''
          setHeightMM(heightMM)
        } else {
          let heightMM = ',高度' + value + '@@毫米@@'
          setHeightMM(heightMM)
        }
      } else if (name == 'hzbrmc_area_face') {
        // 面域 - %
        // let areaFace = ',面域' + value + '@@%@@'
        // setAreaFace(areaFace)
        if (value == '' || value == 0) {
          let areaFace = ''
          setAreaFace(areaFace)
        } else {
          let areaFace = ',面域' + value + '@@%@@'
          setAreaFace(areaFace)
        }
      } else if (name == 'hzbrmc_area_per') {
        // 面积占比 - %
        // let areaPer = ',面积占比' + value + '@@%@@'
        // setAreaPer(areaPer)
        if (value == '' || value == 0) {
          let areaPer = ''
          setAreaPer(areaPer)
        } else {
          let areaPer = ',面积占比' + value + '@@%@@'
          setAreaPer(areaPer)
        }
      } else if (name == 'hzbrmc_area_m') {
        // 面积 - 平方米
        // let areaM = ',面积' + value + '@@平方米@@'
        // setAreaM(areaM)
        if (value == '' || value == 0) {
          let areaM = ''
          setAreaM(areaM)
        } else {
          let areaM = ',面积' + value + '@@平方米@@'
          setAreaM(areaM)
        }
      } else if (name == 'hzbrmc_area_cm') {
        // 面积 - 平方厘米
        // let areaCM = ',面积' + value + '@@平方厘米@@'
        // setAreaCM(areaCM)
        if (value == '' || value == 0) {
          let areaCM = ''
          setAreaCM(areaCM)
        } else {
          let areaCM = ',面积' + value + '@@平方厘米@@'
          setAreaCM(areaCM)
        }
      } else if (name == 'hzbrmc_area_mm') {
        // 面积 - 平方毫米
        // let areaMM = ',面积' + value + '@@平方毫米@@'
        // setAreaMM(areaMM)
        if (value == '' || value == 0) {
          let areaMM = ''
          setAreaMM(areaMM)
        } else {
          let areaMM = ',面积' + value + '@@平方毫米@@'
          setAreaMM(areaMM)
        }
      } else if (name == 'hzbrmc_heightdiff_cm') {
        // 高差 - 厘米
        // let heightDiffCM = ',高差' + value + '@@厘米@@'
        // setHeightDiffCM(heightDiffCM)
        if (value == '' || value == 0) {
          let heightDiffCM = ''
          setHeightDiffCM(heightDiffCM)
        } else {
          let heightDiffCM = ',高差' + value + '@@厘米@@'
          setHeightDiffCM(heightDiffCM)
        }
      } else if (name == 'hzbrmc_heightdiff_mm') {
        // 高差 - 毫米
        // let heightDiffMM = ',高差' + value + '@@毫米@@'
        // setHeightDiffMM(heightDiffMM)
        if (value == '' || value == 0) {
          let heightDiffMM = ''
          setHeightDiffMM(heightDiffMM)
        } else {
          let heightDiffMM = ',高差' + value + '@@毫米@@'
          setHeightDiffMM(heightDiffMM)
        }
      } else if (name == 'hzbrmc_spacing_cm') {
        // 间距 - 厘米
        // let spacingCM = ',间距' + value + '@@厘米@@'
        // setSpacingCM(spacingCM)
        if (value == '' || value == 0) {
          let spacingCM = ',间距' + value + '@@厘米@@'
          setSpacingCM(spacingCM)
        } else {
          let spacingCM = ',间距' + value + '@@厘米@@'
          setSpacingCM(spacingCM)
        }
      } else if (name == 'hzbrmc_deformation_mm') {
        // 变形 - 毫米
        // let deformationMM = ',变形' + value + '@@毫米@@'
        // setDeformationMM(deformationMM)
        if (value == '' || value == 0) {
          let deformationMM = ''
          setDeformationMM(deformationMM)
        } else {
          let deformationMM = ',变形' + value + '@@毫米@@'
          setDeformationMM(deformationMM)
        }
      } else if (name == 'hzbrmc_num') {
        // 个数 - 个
        // let num = ',个数' + value + '@@个@@'
        // setNum(num)
        if (value == '' || value == 0) {
          let num = ''
          setNum(num)
        } else {
          let num = ',个数' + value + '@@个@@'
          setNum(num)
        }
      } else if (name == 'hzbrmc_range_cm') {
        // 距离 - 厘米
        // let rangeCM = ',距离' + value + '@@厘米@@'
        // setRangeCM(rangeCM)
        if (value == '' || value == 0) {
          let rangeCM = ''
          setRangeCM(rangeCM)
        } else {
          let rangeCM = ',距离' + value + '@@厘米@@'
          setRangeCM(rangeCM)
        }
      } else if (name == 'hzbrmc_range_mm') {
        // 距离 - 毫米
        // let rangeMM = ',距离' + value + '@@毫米@@'
        // setRangeMM(rangeMM)
        if (value == '' || value == 0) {
          let rangeMM = ''
          setRangeMM(rangeMM)
        } else {
          let rangeMM = ',距离' + value + '@@毫米@@'
          setRangeMM(rangeMM)
        }
      } else if (name == 'hzbrmc_depth_cm') {
        // 深度 - 厘米
        // let depthCM = ',深度' + value + '@@厘米@@'
        // setDepthCM(depthCM)
        if (value == '' || value == 0) {
          let depthCM = ''
          setDepthCM(depthCM)
        } else {
          let depthCM = ',深度' + value + '@@厘米@@'
          setDepthCM(depthCM)
        }
      } else if (name == 'hzbrmc_depth_mm') {
        // 深度 - 毫米
        // let depthMM = ',深度' + value + '@@毫米@@'
        // setDepthMM(depthMM)
        if (value == '' || value == 0) {
          let depthMM = ''
          setDepthMM(depthMM)
        } else {
          let depthMM = ',深度' + value + '@@毫米@@'
          setDepthMM(depthMM)
        }
      } else if (name == 'hzbrmc_volume_m') {
        // 体积 - 立方米
        // let volumeM = ',体积' + value + '@@立方米@@'
        // setVolumeM(volumeM)
        if (value == '' || value == 0) {
          let volumeM = ''
          setVolumeM(volumeM)
        } else {
          let volumeM = ',体积' + value + '@@立方米@@'
          setVolumeM(volumeM)
        }
      } else if (name == 'hzbrmc_volume_cm') {
        // 体积 - 立方厘米
        // let volumeCM = ',体积' + value + '@@立方厘米@@'
        // setVolumeCM(volumeCM)
        if (value == '' || value == 0) {
          let volumeCM = ''
          setVolumeCM(volumeCM)
        } else {
          let volumeCM = ',体积' + value + '@@立方厘米@@'
          setVolumeCM(volumeCM)
        }
      } else if (name == 'hzbrmc_disp_cm') {
        // 位移 - 厘米
        // let dispCM = ',位移' + value + '@@厘米@@'
        // setDispCM(dispCM)
        if (value == '' || value == 0) {
          let dispCM = ''
          setDispCM(dispCM)
        } else {
          let dispCM = ',位移' + value + '@@厘米@@'
          setDispCM(dispCM)
        }
      } else if (name == 'hzbrmc_disp_mm') {
        // 位移 - 毫米
        // let dispMM = ',位移' + value + '@@毫米@@'
        // setDispMM(dispMM)
        if (value == '' || value == 0) {
          let dispMM = ''
          setDispMM(dispMM)
        } else {
          let dispMM = ',位移' + value + '@@毫米@@'
          setDispMM(dispMM)
        }
      } else if (name == 'hzbrmc_angle_c') {
        // 角度 - 度
        // let angle = ',角度' + value + '@@度@@'
        // setAngle(angle)
        if (value == '' || value == 0) {
          let angle = ''
          setAngle(angle)
        } else {
          let angle = ',角度' + value + '@@度@@'
          setAngle(angle)
        }
      } else if (name == 'hzbrmc_chu') {
        // 处
        // let chu = ',' + value + '@@处@@'
        // setChu(chu)
        if (value == '' || value == 0) {
          let chu = ''
          setChu(chu)
        } else {
          let chu = ',' + value + '@@处@@'
          setChu(chu)
        }
      } else if (name == 'hzbrmc_tiao') {
        // 条
        // let tiao = ',' + value + '@@条@@'
        // setTiao(tiao)
        if (value == '' || value == 0) {
          let tiao = ''
          setTiao(tiao)
        } else {
          let tiao = ',' + value + '@@条@@'
          setTiao(tiao)
        }
      } else if (name == 'hzbrmc_range_fenbu_m') {
        // 分布范围 - 米
        // let rangeFenbuM = ',分布范围' + value + '@@米@@'
        // setRangeFenbuM(rangeFenbuM)
        if (value == '' || value == 0) {
          let rangeFenbuM = ''
          setRangeFenbuM(rangeFenbuM)
        } else {
          let rangeFenbuM = ',分布范围' + value + '@@米@@'
          setRangeFenbuM(rangeFenbuM)
        }
      } else if (name == 'hzbrmc_range_length_m') {
        // 长度范围 - 米
        // let rangeLengthM = ',长度范围' + value + '@@米@@'
        // setRangeLengthM(rangeLengthM)
        if (value == '' || value == 0) {
          let rangeLengthM = ''
          setRangeLengthM(rangeLengthM)
        } else {
          let rangeLengthM = ',长度范围' + value + '@@米@@'
          setRangeLengthM(rangeLengthM)
        }
      } else if (name == 'hzbrmc_range_width_mm') {
        // 宽度范围 - 毫米
        // let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
        // setRangeWidthMM(rangeWidthMM)
        if (value == '' || value == 0) {
          let rangeWidthMM = ''
          setRangeWidthMM(rangeWidthMM)
        } else {
          let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
          setRangeWidthMM(rangeWidthMM)
        }
      } else if (name == 'hzbrmc_range_spacing_cm') {
        // 间距范围 - 厘米
        // let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
        // setRangeSpacingCM(rangeSpacingCM)
        if (value == '' || value == 0) {
          let rangeSpacingCM = ''
          setRangeSpacingCM(rangeSpacingCM)
        } else {
          let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
          setRangeSpacingCM(rangeSpacingCM)
        }
      } else if (name == 'hzbrmc_lb_left_length_m') {
        // 左腹板长度 - 米
        // let leftLengthM = ',左腹板长度' + value + '@@米@@'
        // setLeftLengthM(leftLengthM)
        if (value == '' || value == 0) {
          let leftLengthM = ''
          setLeftLengthM(leftLengthM)
        } else {
          let leftLengthM = ',左腹板长度' + value + '@@米@@'
          setLeftLengthM(leftLengthM)
        }
      } else if (name == 'hzbrmc_lb_bottom_length_m') {
        // 底板长度 - 米
        // let bottomLengthM = ',底板长度' + value + '@@米@@'
        // setBottomLengthM(bottomLengthM)
        if (value == '' || value == 0) {
          let bottomLengthM = ''
          setBottomLengthM(bottomLengthM)
        } else {
          let bottomLengthM = ',底板长度' + value + '@@米@@'
          setBottomLengthM(bottomLengthM)
        }
      } else if (name == 'hzbrmc_lb_right_length_m') {
        // 右腹板长度 - 米
        // let rightLengthM = ',右腹板长度' + value + '@@米@@'
        // setRightLengthM(rightLengthM)
        if (value == '' || value == 0) {
          let rightLengthM = ''
          setRightLengthM(rightLengthM)
        } else {
          let rightLengthM = ',右腹板长度' + value + '@@米@@'
          setRightLengthM(rightLengthM)
        }
      } else if (name == 'hzbrmc_lb_left_width_mm') {
        // 左腹板宽度 - 毫米
        // let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
        // setLeftWidthMM(leftWidthMM)
        if (value == '' || value == 0) {
          let leftWidthMM = ''
          setLeftWidthMM(leftWidthMM)
        } else {
          let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
          setLeftWidthMM(leftWidthMM)
        }
      } else if (name == 'hzbrmc_lb_bottom_width_mm') {
        // 底板宽度 - 毫米
        // let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
        // setBottomWidthMM(bottomWidthMM)
        if (value == '' || value == 0) {
          let bottomWidthMM = ''
          setBottomWidthMM(bottomWidthMM)
        } else {
          let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
          setBottomWidthMM(bottomWidthMM)
        }
      } else if (name == 'hzbrmc_lb_right_width_mm') {
        // 右腹板宽度 - 毫米
        // let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
        // setRightWidthMM(rightWidthMM)
        if (value == '' || value == 0) {
          let rightWidthMM = ''
          setRightWidthMM(rightWidthMM)
        } else {
          let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
          setRightWidthMM(rightWidthMM)
        }
      } else if (name == 'hzbrmc_slant_m') {
        // 倾斜量 - 米
        // let slantM = ',倾斜量' + value + '@@米@@'
        // setSlantM(slantM)
        if (value == '' || value == 0) {
          let slantM = ''
          setSlantM(slantM)
        } else {
          let slantM = ',倾斜量' + value + '@@米@@'
          setSlantM(slantM)
        }
      }
      setDiseaseData(_data);
    };

    const [writeDesTextValue, setWriteDesTextValue] = useState('')

    // 填入病害描述内容
    const writeDesText = (name, value) => {
      // let writeTxt = []
      console.log('writeDesText', name, value);
      setWriteDesTextValue(value)

      if (name == 'memberLength') {
        diseaseData['memberLength'] = value
        handleFormChenge(value, diseaseData.memberLength)
      } else if (name == 'memberWidth') {
        diseaseData['memberWidth'] = value
        handleFormChenge(value, diseaseData.memberWidth)
      } else if (name == 'memberHeight') {
        diseaseData['memberHeight'] = value
        handleFormChenge(value, diseaseData.memberHeight)
      }


      console.log('diseaseData.memberLength1',diseaseData.memberLength, diseaseData.memberWidth, diseaseData.memberHeight);
      console.log('name value1', name, value);

      // 当数据是长宽高的时候，进行数据存储
      if (name == 'memberLength' || name == 'memberWidth' || name == 'memberHeight') {
        setStorage(name, value)
      }

      if (true) {
        if (diseaseData.scale !== '' && diseaseData.scale !== '0' && diseaseData.scale !== '') {
          var biaodu = ',标度' + diseaseData.scale + '@@'
          setBiaodu(biaodu)
        } else {
          var biaodu = ''
          setBiaodu(biaodu)
        }
        if (diseaseData.hzbrmc_length_m !== undefined && diseaseData.hzbrmc_length_m !== '0' && diseaseData.hzbrmc_length_m !== '') {
          var lengthM = ',长度' + diseaseData.hzbrmc_length_m + '@@米@@'
          setLengthM(lengthM)
        } else {
          var lengthM = ''
          setLengthM(lengthM)
        }
        if (diseaseData.hzbrmc_length_cm !== undefined && diseaseData.hzbrmc_length_cm !== '0' && diseaseData.hzbrmc_length_cm !== '') {
          var lengthCM = ',长度' + diseaseData.hzbrmc_length_cm + '@@厘米@@'
          setLengthCM(lengthCM)
        } else {
          var lengthCM = ''
          setLengthCM(lengthCM)
        }
        if (diseaseData.hzbrmc_length_mm !== undefined && diseaseData.hzbrmc_length_mm !== '0' && diseaseData.hzbrmc_length_mm !== '') {
          var lengthMM = ',长度' + diseaseData.hzbrmc_length_mm + '@@毫米@@'
          setLengthMM(lengthMM)
        } else {
          var lengthMM = ''
          setLengthMM(lengthMM)
        }
        if (diseaseData.hzbrmc_width_m !== undefined && diseaseData.hzbrmc_width_m !== '0' && diseaseData.hzbrmc_width_m !== '') {
          var widthM = ',宽度' + diseaseData.hzbrmc_width_m + '@@米@@'
          setWidthM(widthM)
        } else {
          var widthM = ''
          setWidthM(widthM)
        }
        if (diseaseData.hzbrmc_width_cm !== undefined && diseaseData.hzbrmc_width_cm !== '0' && diseaseData.hzbrmc_width_cm !== '') {
          var widthCM = ',宽度' + diseaseData.hzbrmc_width_cm + '@@厘米@@'
          setWidthCM(widthCM)
        } else {
          var widthCM = ''
          setWidthCM(widthCM)
        }
        if (diseaseData.hzbrmc_width_mm !== undefined && diseaseData.hzbrmc_width_mm !== '0' && diseaseData.hzbrmc_width_mm !== '') {
          console.log('diseaseData.hzbrmc_width_mm',diseaseData.hzbrmc_width_mm == '');
          var widthMM = ',宽度' + diseaseData.hzbrmc_width_mm + '@@毫米@@'
          setWidthMM(widthMM)
        } else {
          // diseaseData.hzbrmc_width_mm == undefined || diseaseData.hzbrmc_width_mm == 0 || diseaseData.hzbrmc_width_mm == ''
          var widthMM = ''
          setWidthMM(widthMM)
        }
        if (diseaseData.hzbrmc_height_m !== undefined && diseaseData.hzbrmc_height_m !== '0' && diseaseData.hzbrmc_height_m !== '') {
          var heightM = ',高度' + diseaseData.hzbrmc_height_m + '@@米@@'
          setHeightM(heightM)
        } else {
          var heightM = ''
          setHeightM(heightM)
        }
        if (diseaseData.hzbrmc_height_cm !== undefined && diseaseData.hzbrmc_height_cm !== '0' && diseaseData.hzbrmc_height_cm !== '') {
          var heightCM = ',高度' + diseaseData.hzbrmc_height_cm + '@@厘米@@'
          setHeightCM(heightCM)
        } else {
          var heightCM = ''
          setHeightCM(heightCM)
        }
        if (diseaseData.hzbrmc_height_mm !== undefined && diseaseData.hzbrmc_height_mm !== '0' && diseaseData.hzbrmc_height_mm !== '') {
          var heightMM = ',高度' + diseaseData.hzbrmc_height_mm + '@@毫米@@'
          setHeightMM(heightMM)
        } else {
          var heightMM = ''
          setHeightMM(heightMM)
        }
        if (diseaseData.hzbrmc_area_face !== undefined && diseaseData.hzbrmc_area_face !== '0' && diseaseData.hzbrmc_area_face !== '') {
          var areaFace = ',面域' + diseaseData.hzbrmc_area_face + '@@%@@'
          setAreaFace(areaFace)
        } else {
          var areaFace = ''
          setAreaFace(areaFace)
        }
        if (diseaseData.hzbrmc_area_per !== undefined && diseaseData.hzbrmc_area_per !== '0' && diseaseData.hzbrmc_area_per !== '') {
          var areaPer = ',面积占比' + diseaseData.hzbrmc_area_per + '@@%@@'
          setAreaPer(areaPer)
        } else {
          var areaPer = ''
          setAreaPer(areaPer)
        }
        if (diseaseData.hzbrmc_area_m !== undefined && diseaseData.hzbrmc_area_m !== '0' && diseaseData.hzbrmc_area_m !== '') {
          var areaM = ',面积' + diseaseData.hzbrmc_area_m + '@@平方米@@'
          setAreaM(areaM)
        } else {
          var areaM = ''
          setAreaM(areaM)
        }
        if (diseaseData.hzbrmc_area_cm !== undefined && diseaseData.hzbrmc_area_cm !== '0' && diseaseData.hzbrmc_area_cm !== '') {
          var areaCM = ',面积' + diseaseData.hzbrmc_area_cm + '@@平方厘米@@'
          setAreaCM(areaCM)
        } else {
          var areaCM = ''
          setAreaCM(areaCM)
        }
        if (diseaseData.hzbrmc_area_mm !== undefined && diseaseData.hzbrmc_area_mm !== '0' && diseaseData.hzbrmc_area_mm !== '') {
          var areaMM = ',面积' + diseaseData.hzbrmc_area_mm + '@@平方毫米@@'
          setAreaMM(areaMM)
        } else {
          var areaMM = ''
          setAreaMM(areaMM)
        }
        if (diseaseData.hzbrmc_heightdiff_cm !== undefined && diseaseData.hzbrmc_heightdiff_cm !== '0' && diseaseData.hzbrmc_heightdiff_cm !== '') {
          var heightDiffCM = ',高差' + diseaseData.hzbrmc_heightdiff_cm + '@@厘米@@'
          setHeightDiffCM(heightDiffCM)
        } else {
          var heightDiffCM = ''
          setHeightDiffCM(heightDiffCM)
        }
        if (diseaseData.hzbrmc_heightdiff_mm !== undefined && diseaseData.hzbrmc_heightdiff_mm !== '0' && diseaseData.hzbrmc_heightdiff_mm !== '') {
          var heightDiffMM = ',高差' + diseaseData.hzbrmc_heightdiff_mm + '@@毫米@@'
          setHeightDiffMM(heightDiffMM)
        } else {
          var heightDiffMM = ''
          setHeightDiffMM(heightDiffMM)
        }
        if (diseaseData.hzbrmc_spacing_cm !== undefined && diseaseData.hzbrmc_spacing_cm !== '0' && diseaseData.hzbrmc_spacing_cm !== '') {
          var spacingCM = ',间距' + diseaseData.hzbrmc_spacing_cm + '@@厘米@@'
          setSpacingCM(spacingCM)
        } else {
          var spacingCM = ''
          setSpacingCM(spacingCM)
        }
        if (diseaseData.hzbrmc_deformation_mm !== undefined && diseaseData.hzbrmc_deformation_mm !== '0' && diseaseData.hzbrmc_deformation_mm !== '') {
          var deformationMM = ',变形' + diseaseData.hzbrmc_deformation_mm + '@@毫米@@'
          setDeformationMM(deformationMM)
        } else {
          var deformationMM = ''
          setDeformationMM(deformationMM)
        }
        if (diseaseData.hzbrmc_num !== undefined && diseaseData.hzbrmc_num !== '0' && diseaseData.hzbrmc_num !== '') {
          var num = ',个数' + diseaseData.hzbrmc_num + '@@个@@'
          setNum(num)
        } else {
          var num = ''
          setNum(num)
        }
        if (diseaseData.hzbrmc_range_cm !== undefined && diseaseData.hzbrmc_range_cm !== '0' && diseaseData.hzbrmc_range_cm !== '') {
          var rangeCM = ',距离' + diseaseData.hzbrmc_range_cm + '@@厘米@@'
          setRangeCM(rangeCM)
        } else {
          var rangeCM = ''
          setRangeCM(rangeCM)
        }
        if (diseaseData.hzbrmc_range_mm !== undefined && diseaseData.hzbrmc_range_mm !== '0' && diseaseData.hzbrmc_range_mm !== '') {
          var rangeMM = ',距离' + diseaseData.hzbrmc_range_mm + '@@毫米@@'
          setRangeMM(rangeMM)
        } else {
          var rangeMM = ''
          setRangeMM(rangeMM)
        }
        if (diseaseData.hzbrmc_depth_cm !== undefined && diseaseData.hzbrmc_depth_cm !== '0' && diseaseData.hzbrmc_depth_cm !== '') {
          var depthCM = ',深度' + diseaseData.hzbrmc_depth_cm + '@@厘米@@'
          setDepthCM(depthCM)
        } else {
          var depthCM = ''
          setDepthCM(depthCM)
        }
        if (diseaseData.hzbrmc_depth_mm !== undefined && diseaseData.hzbrmc_depth_mm !== '0' && diseaseData.hzbrmc_depth_mm !== '') {
          var depthMM = ',深度' + diseaseData.hzbrmc_depth_mm + '@@毫米@@'
          setDepthMM(depthMM)
        } else {
          var depthMM = ''
          setDepthMM(depthMM)
        }
        if (diseaseData.hzbrmc_volume_m !== undefined && diseaseData.hzbrmc_volume_m !== '0' && diseaseData.hzbrmc_volume_m !== '') {
          var volumeM = ',体积' + diseaseData.hzbrmc_volume_m + '@@立方米@@'
          setVolumeM(volumeM)
        } else {
          var volumeM = ''
          setVolumeM(volumeM)
        }
        if (diseaseData.hzbrmc_volume_cm !== undefined && diseaseData.hzbrmc_volume_cm !== '0' && diseaseData.hzbrmc_volume_cm !== '') {
          var volumeCM = ',体积' + diseaseData.hzbrmc_volume_cm + '@@立方厘米@@'
          setVolumeCM(volumeCM)
        } else {
          var volumeCM = ''
          setVolumeCM(volumeCM)
        }
        if (diseaseData.hzbrmc_disp_cm !== undefined && diseaseData.hzbrmc_disp_cm !== '0' && diseaseData.hzbrmc_disp_cm !== '') {
          var dispCM = ',位移' + diseaseData.hzbrmc_disp_cm + '@@厘米@@'
          setDispCM(dispCM)
        } else {
          var dispCM = ''
          setDispCM(dispCM)
        }
        if (diseaseData.hzbrmc_disp_mm !== undefined && diseaseData.hzbrmc_disp_mm !== '0' && diseaseData.hzbrmc_disp_mm !== '') {
          var dispMM = ',位移' + diseaseData.hzbrmc_disp_mm + '@@毫米@@'
          setDispMM(dispMM)
        } else {
          var dispMM = ''
          setDispMM(dispMM)
        }
        if (diseaseData.hzbrmc_angle_c !== undefined && diseaseData.hzbrmc_angle_c !== '0' && diseaseData.hzbrmc_angle_c !== '') {
          var angle = ',角度' + diseaseData.hzbrmc_angle_c + '@@度@@'
          setAngle(angle)
        } else {
          var angle = ''
          setAngle(angle)
        }
        if (diseaseData.hzbrmc_chu !== undefined && diseaseData.hzbrmc_chu !== '0' && diseaseData.hzbrmc_chu !== '') {
          var chu = ',' + diseaseData.hzbrmc_chu + '@@处@@'
          setChu(chu)
        } else {
          var chu = ''
          setChu(chu)
        }
        if (diseaseData.hzbrmc_tiao !== undefined && diseaseData.hzbrmc_tiao !== '0' && diseaseData.hzbrmc_tiao !== '') {
          var tiao = ',' + diseaseData.hzbrmc_tiao + '@@条@@'
          setTiao(tiao)
        } else {
          var tiao = ''
          setTiao(tiao)
        }
        if (diseaseData.hzbrmc_range_fenbu_m !== undefined && diseaseData.hzbrmc_range_fenbu_m !== '0' && diseaseData.hzbrmc_range_fenbu_m !== '') {
          var rangeFenbuM = ',分布范围' + diseaseData.hzbrmc_range_fenbu_m + '@@米@@'
          setRangeFenbuM(rangeFenbuM)
        } else {
          var rangeFenbuM = ''
          setRangeFenbuM(rangeFenbuM)
        }
        if (diseaseData.hzbrmc_range_length_m !== undefined && diseaseData.hzbrmc_range_length_m !== '0' && diseaseData.hzbrmc_range_length_m !== '') {
          var rangeLengthM = ',长度范围' + diseaseData.hzbrmc_range_length_m + '@@米@@'
          setRangeLengthM(rangeLengthM)
        } else {
          var rangeLengthM = ''
          setRangeLengthM(rangeLengthM)
        }
        if (diseaseData.hzbrmc_range_width_mm !== undefined && diseaseData.hzbrmc_range_width_mm !== '0' && diseaseData.hzbrmc_range_width_mm !== '') {
          var rangeWidthMM = ',宽度范围'+ diseaseData.hzbrmc_range_width_mm + '@@毫米@@'
          setRangeWidthMM(rangeWidthMM)
        } else {
          var rangeWidthMM = ''
          setRangeWidthMM(rangeWidthMM)
        }
        if (diseaseData.hzbrmc_range_spacing_cm !== undefined && diseaseData.hzbrmc_range_spacing_cm !== '0' && diseaseData.hzbrmc_range_spacing_cm !== '') {
          var rangeSpacingCM = ',间距范围' + diseaseData.hzbrmc_range_spacing_cm + '@@厘米@@'
          setRangeSpacingCM(rangeSpacingCM)
        } else {
          var rangeSpacingCM = ''
          setRangeSpacingCM(rangeSpacingCM)
        }
        if (diseaseData.hzbrmc_lb_left_length_m !== undefined && diseaseData.hzbrmc_lb_left_length_m !== '0' && diseaseData.hzbrmc_lb_left_length_m !== '') {
          var leftLengthM = ',左腹板长度' + diseaseData.hzbrmc_lb_left_length_m + '@@米@@'
          setLeftLengthM(leftLengthM)
        } else {
          var leftLengthM = ''
          setLeftLengthM(leftLengthM)
        }
        if (diseaseData.hzbrmc_lb_bottom_length_m !== undefined && diseaseData.hzbrmc_lb_bottom_length_m !== '0' && diseaseData.hzbrmc_lb_bottom_length_m !== '') {
          var bottomLengthM = ',底板长度' + diseaseData.hzbrmc_lb_bottom_length_m + '@@米@@'
          setBottomLengthM(bottomLengthM)
        } else {
          var bottomLengthM = ''
          setBottomLengthM(bottomLengthM)
        }
        if (diseaseData.hzbrmc_lb_right_length_m !== undefined && diseaseData.hzbrmc_lb_right_length_m !== '0' && diseaseData.hzbrmc_lb_right_length_m !== '') {
          var rightLengthM = ',右腹板长度' + diseaseData.hzbrmc_lb_right_length_m + '@@米@@'
          setRightLengthM(rightLengthM)
        } else {
          var rightLengthM = ''
          setRightLengthM(rightLengthM)
        }
        if (diseaseData.hzbrmc_lb_left_width_mm !== undefined && diseaseData.hzbrmc_lb_left_width_mm !== '0' && diseaseData.hzbrmc_lb_left_width_mm !== '') {
          var leftWidthMM = ',左腹板宽度' + diseaseData.hzbrmc_lb_left_width_mm + '@@毫米@@'
          setLeftWidthMM(leftWidthMM)
        } else {
          var leftWidthMM = ''
          setLeftWidthMM(leftWidthMM)
        }
        if (diseaseData.hzbrmc_lb_bottom_width_mm !== undefined && diseaseData.hzbrmc_lb_bottom_width_mm !== '0' && diseaseData.hzbrmc_lb_bottom_width_mm !== '') {
          var bottomWidthMM = ',底板宽度' + diseaseData.hzbrmc_lb_bottom_width_mm + '@@毫米@@'
          setBottomWidthMM(bottomWidthMM)
        } else {
          var bottomWidthMM = ''
          setBottomWidthMM(bottomWidthMM)
        }
        if (diseaseData.hzbrmc_lb_right_width_mm !== undefined && diseaseData.hzbrmc_lb_right_width_mm !== '0' && diseaseData.hzbrmc_lb_right_width_mm !== '') {
          var rightWidthMM = ',右腹板宽度' + diseaseData.hzbrmc_lb_right_width_mm + '@@毫米@@'
          setRightWidthMM(rightWidthMM)
        } else {
          var rightWidthMM = ''
          setRightWidthMM(rightWidthMM)
        }
        if (diseaseData.hzbrmc_slant_m !== undefined && diseaseData.hzbrmc_slant_m !== '0' && diseaseData.hzbrmc_slant_m !== '') {
          var slantM = ',倾斜量' + diseaseData.hzbrmc_slant_m + '@@米@@'
          setSlantM(slantM)
        } else {
          var slantM = ''
          setSlantM(slantM)
        }
      }

      if (writeDesTextValue == '' || writeDesTextValue == undefined) {
        console.log('没有修改数据');
        if (diseaseData.description == '' || diseaseData.description == undefined) {
          diseaseData['description'] = itemData.diseaseName
        } else if (diseaseData.description !== '' || diseaseData.description !== undefined) {
          let writeTxt = lengthM + lengthCM + lengthMM + widthM + widthCM
                  + widthMM + heightM + heightCM + heightMM + areaFace
                  + areaPer + areaM + areaCM + areaMM + heightDiffCM + heightDiffMM
                  + spacingCM + deformationMM + num + rangeCM + rangeMM + depthCM
                  + depthMM + volumeM + volumeCM + dispCM + dispMM + angle + chu
                  + tiao + rangeFenbuM + rangeLengthM + rangeWidthMM + rangeSpacingCM
                  + leftLengthM + bottomLengthM + rightLengthM + leftWidthMM
                  + bottomWidthMM + rightWidthMM + slantM
          // let writeTxt = diseaseData.hzbrmc_length_m
          setWriteTxt(writeTxt)
          // console.log('writeTxt', writeTxt);
          // console.log('病害名称',itemData.diseaseName);
          let binghai = itemData.diseaseName
          let allText = binghai.concat(writeTxt)
          console.log('allText', allText);
          diseaseData['description'] = allText
          handleFormChenge(allText, diseaseData.description)
        }
      } else {
        let writeTxt = lengthM + lengthCM + lengthMM + widthM + widthCM
                  + widthMM + heightM + heightCM + heightMM + areaFace
                  + areaPer + areaM + areaCM + areaMM + heightDiffCM + heightDiffMM
                  + spacingCM + deformationMM + num + rangeCM + rangeMM + depthCM
                  + depthMM + volumeM + volumeCM + dispCM + dispMM + angle + chu
                  + tiao + rangeFenbuM + rangeLengthM + rangeWidthMM + rangeSpacingCM
                  + leftLengthM + bottomLengthM + rightLengthM + leftWidthMM
                  + bottomWidthMM + rightWidthMM + slantM
        setWriteTxt(writeTxt)
        console.log('writeTxt', writeTxt);
        console.log('病害名称',itemData.diseaseName);
        let binghai = itemData.diseaseName
        let allText = binghai.concat(writeTxt)
        console.log('allText', allText);
        diseaseData['description'] = allText
        handleFormChenge(allText, diseaseData.description)
      }
    }

    // 存入数据
    const setStorage = async(name, value) => {
      console.log('存储长宽高数据的函数~~', name, value);
      // 桥梁id + 部件名称 + 长/宽/高
      const REname = bridgeId + '_' + storageMemberName + '_' + name
      try {
        await AsyncStorage.setItem(REname, value)
      } catch (err) {
        console.log('存入数据失败!', err);
      }
    }

    const writeNum = () => {
      try {
        console.log('长宽高的数据::',diseaseData.memberLength,diseaseData.memberWidth,diseaseData.memberHeight);
        const lengthName = bridgeId + '_' + storageMemberName + '_' + 'memberLength'
        const lengthValue = AsyncStorage.getItem(lengthName)
        const widthName = bridgeId + '_' + storageMemberName + '_' + 'memberWidth'
        const widthValue = AsyncStorage.getItem(widthName)
        const heightName = bridgeId + '_' + storageMemberName + '_' + 'memberHeight'
        const heightValue = AsyncStorage.getItem(heightName)
        // if (diseaseData.memberLength == undefined || diseaseData.memberLength !== lengthValue) {
        //   // console.log('长度数据为空');
        //   getStorage(lengthName)
        // } else if (diseaseData.memberWidth == undefined || diseaseData.memberWidth !== widthValue) {
        //   // console.log('宽度数据为空');
        //   getStorage(widthName)
        // } else if (diseaseData.memberHeight == undefined || diseaseData.memberHeight !== heightValue) {
        //   // console.log('高度数据为空');
        //   getStorage(heightName)
        // }
        getStorage(lengthName)
        getStorage(widthName)
        getStorage(heightName)
      } catch (e) {
        console.log('writeNum错误',e);
      }
    }

    // 读取数据
    const getStorage = async(name) => {
      console.log('读取存储的长宽高的数据~',name);
      // console.log('diseaseData 有无',diseaseData);
      try {
        const value = await AsyncStorage.getItem(name)
        console.log('value~~~',value);
        if (value !== null) {
          console.log('读取到的数据',name,value);
          if (name == bridgeId + '_' + storageMemberName + '_' + 'memberLength') {
            console.log('length99999');
            diseaseData['memberLength'] = value
            setDiseaseData(diseaseData)
            handleFormChenge(value, diseaseData.memberLength)
          } else if (name == bridgeId + '_' + storageMemberName + '_' + 'memberWidth') {
            console.log('Width99999');
            diseaseData['memberWidth'] = value
            setDiseaseData(diseaseData)
            handleFormChenge(value, diseaseData.memberWidth)
          } else if (name == bridgeId + '_' + storageMemberName + '_' + 'memberHeight') {
            console.log('Height99999');
            diseaseData['memberHeight'] = value
            setDiseaseData(diseaseData)
            handleFormChenge(value, diseaseData.memberHeight)
          }
        }
      } catch (err) {
        console.log('读取失败~', err);
      }
    }

    // 填入位置描述内容
    const writePositionText = () => {
      try {
        // console.log('diseaseData.area', diseaseData.area);
        console.log('diseaseData.lengthText',lengthText,widthText,heightText);
        if (diseaseData.area == undefined) {
          var areaName = ''
          setAreaName(areaName)
          console.log('diseaseData.area为空');

          // 左侧描述
          if (lengthText == '0' || lengthText == '0.0') {
            var lengthNum = ''
            setLengthNum(lengthNum)
          } else if (lengthText !== '0' || lengthText !== '0.0') {
            var lengthNum = '距左侧' + lengthText + 'm'
            setLengthNum(lengthNum)
          }

          // 距顶描述
          if (heightText == '0' || heightText == '0.0') {
            var heightNum = ''
            setHeightNum(heightNum)
          } else if (heightText !== '0' || heightText !== '0.0') {
            if (lengthNum == '') {
              var heightNum = '距顶部' + heightText + 'm'
              setHeightNum(heightNum)
            } else {
              var heightNum = ',距顶部' + heightText + 'm'
              setHeightNum(heightNum)
            }
          }

          if (heightNum == '' && lengthNum == '') {
            let writePositionTxt = areaName
            setWritePositionTxt(writePositionTxt)
            diseaseData['writePositionTxt'] = writePositionTxt
            setDiseaseData(diseaseData)
            handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
          } else {
            if (lengthNum == '') {
              let writePositionTxt = areaName + lengthNum + heightNum + '处'
              setWritePositionTxt(writePositionTxt)
              diseaseData['writePositionTxt'] = writePositionTxt
              setDiseaseData(diseaseData)
              handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
            } else {
              // 位置描述 = / + 病害区域 + 桥台 + 长度 + 高度
              let writePositionTxt = areaName + lengthNum + heightNum + '处'
              setWritePositionTxt(writePositionTxt)
              diseaseData['writePositionTxt'] = writePositionTxt
              setDiseaseData(diseaseData)
              handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
            }
          }
        } else {
          console.log('有数据了');
          console.log('构件区域列表：：',areaparam);
          console.log('表单中的构件区域',diseaseData.area);
          console.log('构件类型',labelName);
          if (labelName == 'at0000' && diseaseData.area == undefined || diseaseData.area == '' || diseaseData.area == '/') {
            console.log('empty~~~');
            var areaName = ''
            diseaseData['area'] = areaName
            handleFormChenge(areaName, diseaseData.area)
          } else if (labelName == 'at0000' && diseaseData.area !== undefined || diseaseData.area !== '' || diseaseData.area !== '/') {
            console.log('not empty~~~~');
            var areaName = diseaseData.area
            diseaseData['area'] = areaName
            handleFormChenge(areaName, diseaseData.area)
          }
          if (areaparam !== []) {
            let areaArr = areaparam
            let inputArea = diseaseData.area
            console.log('inputArea',inputArea);
            for (let i = 0; i < areaArr.length; i++) {
              if (inputArea == areaArr[i].value) {
                console.log('此时选中的构件是：',areaArr[i].label);
                var areaName = areaArr[i].label
                console.log(areaName);
                setAreaName(areaName)
              }
            }
          }
          
          // 墩/台描述
          // 长度描述
          if (lengthText == '0' || lengthText == '0.0') {
            var lengthNum = ''
            setLengthNum(lengthNum)
            // let pier = ''
            // setPier(pier)
          } else if (lengthText !== '0' || lengthText !== '0.0') {
            var lengthNum = '距左侧' + lengthText + 'm'
            setLengthNum(lengthNum)
          }
          
          // 宽度描述
          // if (widthText == '0' || widthText == '') {
          //   var widthNum = ''
          //   setWidthNum(widthNum)
          // } else if (widthText !== '0') {
          //   var widthNum = '距左侧' + widthText + 'm'
          //   setWidthNum(widthNum)
          // }

          // 距顶描述
          if (heightText == '0' || heightText == '0.0') {
            var heightNum = ''
            setHeightNum(heightNum)
          } else if (heightText !== '0' || heightText !== '0.0') {
            if (lengthNum == '') {
              var heightNum = '距顶部' + heightText + 'm'
              setHeightNum(heightNum)
            } else {
              var heightNum = ',距顶部' + heightText + 'm'
              setHeightNum(heightNum)
            }
          }

          if (heightNum == '' && lengthNum == '') {
            let writePositionTxt = areaName
            setWritePositionTxt(writePositionTxt)
            diseaseData['writePositionTxt'] = writePositionTxt
            setDiseaseData(diseaseData)
            handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
          } else {

            if (lengthNum == '') {
              let writePositionTxt = areaName + lengthNum + heightNum + '处'
              setWritePositionTxt(writePositionTxt)
              diseaseData['writePositionTxt'] = writePositionTxt
              setDiseaseData(diseaseData)
              handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
            } else {
              // 位置描述 = / + 病害区域 + 桥台 + 长度 + 高度
              let writePositionTxt = areaName + lengthNum + heightNum + '处'
              setWritePositionTxt(writePositionTxt)
              diseaseData['writePositionTxt'] = writePositionTxt
              setDiseaseData(diseaseData)
              handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
            }
          }
        }
      } catch (err) {
        console.log('出现错误1:',err);
      }
    }

    // 一键填入病害描述与位置描述
    const allWrite = () => {
      writeDesText()
      writePositionText()
    }


  {/* ================================================= */}
  {/* 病害填写表格区域 */}
  return (
  <View style={tailwind.flexRow}>
    {/* 病害填写表格区域 */}
    <ScrollView style={{height:350}}>
      <View>
      <View style={[tailwind.flexRow, tailwind.justifyBetween]}>
        <LabelItem label="编号:">
          <Text style={[tailwind.fontBold]}>
            {route.params?.data?.index}
          </Text>
        </LabelItem>
        <View style={tailwind.flexRow}>
          <LabelItem
            label="重点关注"
            LabelStyle={[tailwind.mR0, {color:'#2b427d'}]}
          />
          <Checkbox
            checked={!!diseaseData?.mian}
            onPress={() =>
              handleFormChenge({
                name: 'mian',
                value: !diseaseData?.mian + 0,
              })
            }
          />
        </View>
      </View>
      <View style={[tailwind.flexRow]}>
        <View style={{width:230}}>
           <Select
          label="构件类型"
          name="areatype"
          labelName="areaname"
          valueName="areatype"
          value={diseaseData?.areatype}
          onChange={handleFormChenge}
          values={baseData.components}
        /> 
        </View>
        <View style={{width:230}}>
          <View style={tailwind.mB2}>
            {!areaparam.length ? (
              <TextInput
                name="area"
                label="构件区域"
                value={diseaseData?.area}
                onChange={handleFormChenge}
                lines={1}
                height={25}
              />
            ) : (
              <Select
                name="area"
                label="构件区域"
                value={diseaseData?.area}
                values={areaparam}
                onChange={handleFormChenge}
              />
            )}
          </View>
        </View>
        
      </View>
      
      {/* 原本的标度内容 */}
      {/* {scale.length ? (
        <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
          <LabelItem label="标度" />
          <TouchableOpacity onPress={handleScaleOpen}>
            <Icon
              name="information"
              size={20}
              style={[tailwind.mR2, {color:'#2b427d'}]}
            />
          </TouchableOpacity>
          <RadioGroup
            name="scale"
            values={scale}
            value={diseaseData?.scale}
            onChange={handleFormChenge}
          />
        </View>
      ) : (
        <></>
      )} */}

      {/* 修改标度数据源 */}
      {rightScale.length ? (
          <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
            <LabelItem label="标度" />
            <TouchableOpacity onPress={handleScaleOpen}>
              <Icon
                name="information"
                size={20}
                style={[tailwind.mR2, {color:'#2b427d'}]}
              />
            </TouchableOpacity>
            <RadioGroup
              name="scale"
              values={rightScale} // 初始数据第一项为'无'，提取第二项及以后的数据传入组件
              value={diseaseData?.scale}
              onChange={handleFormChenge}
            />
          </View>
        ) : (
          <></>
        )}


      <View style={tailwind.mT2} />
      <View>
        <View style={[tailwind.flexRow]}>
        <TouchableOpacity style={{width:90,height:20,borderRadius: 5,
            backgroundColor: '#2b427d',
            justifyContent: 'center',
            overflow: 'hidden'}}
            onPress={writeNum}>
            <Text style={{textAlign: 'center',color:'#fff',fontSize:12}}>获取上一次数据</Text>
          </TouchableOpacity>
          <LabelItem label="病害位置(米)" style={[tailwind.w18,{marginLeft:10}]} />
          <Text>距左侧{lengthText}米; 距顶部{heightText}米</Text>
          <Text>  </Text>
        </View>
        <View style={tailwind.mT2} />
        <View style={[tailwind.flexRow]}>
          <LabelItem label="左侧" />
          <KeyboardInput
            name="memberLength"
            value={diseaseData?.memberLength}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disLength"
            memberData={diseaseData?.memberLength}
            value={diseaseData?.disLength}
            onChange={handleFormChenge}
          />
        </View>
        {/* <View style={tailwind.mT2} /> */}
        {/* <View style={[tailwind.flexRow]}>
          <LabelItem label="台宽" style={tailwind.w18} />
          <KeyboardInput
            name="memberWidth"
            value={diseaseData?.memberWidth}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disWidth"
            memberData={diseaseData?.memberWidth}
            value={diseaseData?.disWidth}
            onChange={handleFormChenge}
          />
        </View> */}
        <View style={tailwind.mT2} />
        <View style={[tailwind.flexRow,tailwind.mB3]}>
          <LabelItem label="顶部" style={tailwind.w18} />
          <KeyboardInput
            name="memberHeight"
            value={diseaseData?.memberHeight}
            onChange={handleFormChenge}
          />
          <SliderInput
            name="disHeight"
            memberData={diseaseData?.memberHeight}
            value={diseaseData?.disHeight}
            onChange={handleFormChenge}
          />
        </View>
      </View>
      {/* <View style={tailwind.mT2} /> */}
      <View style={[tailwind.flexRow]}>
        <View style={{width:500}}>
          <WriteInput
            name="description"
            label="病害描述"
            value={diseaseData?.description}
            onChange={handleFormChenge}
            lines={3}
            height={70}
            // disabled={true}
          />
        </View>
        {/* <TouchableOpacity style={styles.sideButton} onPress={writeDesText}>
          <Text style={[{color:'#fff',fontSize:12}]}>填入描述</Text>
        </TouchableOpacity> */}
      </View>
      <View style={tailwind.mT2} />
      <View style={[tailwind.flexRow]}>
        <View style={{width:500}}>
          <WriteInput
            name="writePositionTxt"
            label="位置描述"
            value={diseaseData?.writePositionTxt}
            onChange={handleFormChenge}
            lines={3}
            height={70}
          />
        </View>
        {/* <TouchableOpacity style={styles.sideButton} onPress={writePositionText}>
          <Text style={[{color:'#fff',fontSize:12}]}>填入描述</Text>
        </TouchableOpacity> */}
      </View>
    </View>
    </ScrollView>
    
    {/* ================================================= */}
    <View style={tailwind.mX3} />
    
    <View style={[{width:'20%'}]}>
    <View>
      {/* <LabelItem label="当前病害:" /> */}
      <Text style={[tailwind.fontBold,{width:'100%'}]}>
        {itemData?.diseaseName}
      </Text>
    </View>
    <View style={tailwind.mT2} />
    {infoList.length ? (
        infoList.map(({strvalue, strinfo}, index) => (
          <React.Fragment key={index}>
              <View style={[tailwind.mB2]}>
                <LabelItem label={strinfo} />
                <View style={{width:'70%',height:25}}>
                  <KeyboardInput
                    name={strvalue}
                    value={diseaseData[strvalue]}
                    onChange={handleFormChenge}
                  />
                </View>
              </View>
          </React.Fragment>
        ))
      ) : (
        <></>
      )}
      <TouchableOpacity style={styles.bottomButton} onPress={allWrite}>
        <Text style={[{color:'#fff',fontSize:14}]}>生成描述</Text>
      </TouchableOpacity>
    </View>
    <ScaleInfo ref={scaleInfoRef} info={scaleTabel} />
  </View>
  );
  {/* ================================================= */}
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
    center: {
      ...tailwind.justifyCenter,
      ...tailwind.itemsCenter,
    },
    borderRB: {
      ...tailwind.borderR,
      ...tailwind.borderB,
      ...tailwind.borderGray400,
    },
    borderB: {
      ...tailwind.borderB,
      ...tailwind.borderGray400,
    },
    border: {
      ...tailwind.border,
      ...tailwind.borderGray400,
    },
    sideButton: {
      backgroundColor:'#2b427d',
      height:30,
      width:60,
      ...tailwind.justifyCenter,
      ...tailwind.itemsCenter,
      ...tailwind.rounded,
    },
    bottomButton: {
      backgroundColor:'#2b427d',
      height:70,
      width:70,
      ...tailwind.justifyCenter,
      ...tailwind.itemsCenter,
      ...tailwind.rounded,
      position:'absolute',
      right:0,
      bottom:0
    }
  });