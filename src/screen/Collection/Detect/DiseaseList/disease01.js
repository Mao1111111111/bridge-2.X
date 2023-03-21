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
    
      const infoList = hooks.useInfoComponents({diseaseData, baseData});
    
      const defaultFileName = hooks.useDefaultFileName({diseaseData, baseData});
    
      const [scale, scaleInfo] = hooks.useScale({
        diseaseData,
        typeList: route.params?.type?.list,
        baseData,
      });


      React.useEffect(() => {
        setDiseaseData(itemData);
        console.log('itemData:',itemData);
        // route.params.thridData.checkinfoshort
        // console.log('456',route.params.thridData.checkinfoshort);
        // diseaseData['remark'] = route.params.thridData.checkinfoshort
      }, [itemData]);
    
      const [lengthText, setLengthText] = useState(0)
      const [widthText, setWidthText] = useState('')
      const [heightText, setHeightText] = useState('')
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

      const [memberLength, setMemberLength] = useState('')
      const [memberWidth, setMemberWidth] = useState('')
      const [memberHeight, setMemberHeight] = useState('')

      const [diseaseName, setDiseaseName] = useState('')
      // =================================================
      React.useEffect(() => {
        saveData.current = {...diseaseData};
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

          console.log('选择的构件区域6', areaName)
          console.log('diseaseData.area',diseaseData.area);
          console.log('areatype',baseData.components[0].areanodejson.nodeparamlist);
          console.log(areaparam);
          console.log(areaparam[0].label);


          if (areaName == undefined || areaName == '') {
            let areaName = areaparam[0].label
            setAreaName(areaName)
            diseaseData['area'] = areaName
            handleFormChenge(areaName, diseaseData.area)
            console.log('333', diseaseData.area);
          } else {
            // if (areaName == '' || areaName == undefined) {
            //   if (labelName == 'at0000' && diseaseData.area == undefined || diseaseData.area == '' || diseaseData.area == '/') {
            //     console.log('empty~~~');
            //     var areaName = ''
            //     diseaseData['area'] = areaName
            //     handleFormChenge(areaName, diseaseData.area)
            //   } else if (labelName == 'at0000' && diseaseData.area !== undefined || diseaseData.area !== '' || diseaseData.area !== '/') {
            //     console.log('not empty~~~~');
            //     var areaName = diseaseData.area
            //     diseaseData['area'] = areaName
            //     handleFormChenge(areaName, diseaseData.area)
            //   }
            //   if (areaparam !== []) {
            //     let areaArr = areaparam
            //     let inputArea = diseaseData.area
            //     console.log('inputArea',inputArea);
            //     for (let i = 0; i < areaArr.length; i++) {
            //       if (inputArea == areaArr[i].value) {
            //         console.log('此时选中的构件是：',areaArr[i].label);
            //         var areaName = areaArr[i].label
            //         console.log(areaName);
            //         setAreaName(areaName)
            //       }
            //     }
            //   }
            // }
          }

          // console.log('表单填写页面的route',route.params.title);

          if (route.params.data.cacheNum == undefined) {
            console.log('cacheNum为空');
          } else if (route.params.data.cacheNum !== '' || route.params.data.cacheNum !== undefined) {
              diseaseData['memberLength'] = route.params.data.cacheNum[0].memberLength
              diseaseData['memberWidth'] = route.params.data.cacheNum[0].memberWidth
              diseaseData['memberHeight'] = route.params.data.cacheNum[0].memberHeight
          }

          let lengthText = (diseaseData.memberLength * (diseaseData.disLength / 100)).toFixed(1)
          setLengthText(lengthText)
          let widthText = (diseaseData.memberWidth * (diseaseData.disWidth / 100)).toFixed(1)
          setWidthText(widthText)
          let heightText = (diseaseData.memberHeight * (diseaseData.disHeight / 100)).toFixed(1)
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
          
          // console.log('diseaseData.memberLength',diseaseData.memberLength);
          // console.log('route66:', route.params.thridData.checkinfoshort);

          if (diseaseData.diseaseName == undefined || diseaseData.diseaseName == '') {
              diseaseData['diseaseName'] = route.params.thridData.checkinfoshort
              handleFormChenge(route.params.thridData.checkinfoshort, diseaseData.diseaseName)
          }
          
          
          // console.log('diseaseData66:', diseaseData);
          // console.log('diseaseData.areatype',diseaseData.area);
          if (diseaseData.area !== '' || diseaseData.area !== undefined) {
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
          // diseaseData['remark'] = route.params.thridData.checkinfoshort


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


          // console.log(diseaseData);
          if (diseaseData.remark == '' || diseaseData.remark == undefined) {
            let infoshort = route.params.thridData.checkinfoshort
            setInfoShort(infoshort)
          }
          if (diseaseData.description == '' || diseaseData.description == undefined) {
            diseaseData['description'] = diseaseData.remark
          }
        } catch (err){
          console.log('err1', err);
        }
      }, [diseaseData]);
    
      React.useEffect(() => {
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
        if (areaparam == '') {
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


        if (name == 'scale') {
          // 标度
          let biaodu = ',标度' + value + '@@'
          setBiaodu(biaodu)
        } else if (name == 'hzbrmc_length_m') {
          //长度 - 米
          let lengthM = ',长度' + value + '@@米@@'
          setLengthM(lengthM)
        } else if (name == 'hzbrmc_length_cm') {
          // 长度 - 厘米
          let lengthCM = ',长度' + value + '@@厘米@@'
          setLengthCM(lengthCM)
        } else if (name == 'hzbrmc_length_mm') {
          // 长度 - 毫米
          let lengthMM = ',长度' + value + '@@毫米@@'
          setLengthMM(lengthMM)
        } else if (name == 'hzbrmc_width_m') {
          // 宽度 - 米
          let widthM = ',宽度' + value + '@@米@@'
          setWidthM(widthM)
        } else if (name == 'hzbrmc_width_cm') {
          // 宽度 - 厘米
          let widthCM = ',宽度' + value + '@@厘米@@'
          setWidthCM(widthCM)
        } else if (name == 'hzbrmc_width_mm') {
          // 宽度 - 毫米
          let widthMM = ',宽度' + value + '@@毫米@@'
          setWidthMM(widthMM)
        } else if (name == 'hzbrmc_height_m') {
          // 高度 - 米
          let heightM = ',高度' + value + '@@米@@'
          setHeightM(heightM)
        } else if (name == 'hzbrmc_height_cm') {
          // 高度 - 厘米
          let heightCM = ',高度' + value + '@@厘米@@'
          setHeightCM(heightCM)
        } else if (name == 'hzbrmc_height_mm') {
          // 高度 - 毫米
          let heightMM = ',高度' + value + '@@毫米@@'
          setHeightMM(heightMM)
        } else if (name == 'hzbrmc_area_face') {
          // 面域 - %
          let areaFace = ',面域' + value + '@@%@@'
          setAreaFace(areaFace)
        } else if (name == 'hzbrmc_area_per') {
          // 面积占比 - %
          let areaPer = ',面积占比' + value + '@@%@@'
          setAreaPer(areaPer)
        } else if (name == 'hzbrmc_area_m') {
          // 面积 - 平方米
          let areaM = ',面积' + value + '@@平方米@@'
          setAreaM(areaM)
        } else if (name == 'hzbrmc_area_cm') {
          // 面积 - 平方厘米
          let areaCM = ',面积' + value + '@@平方厘米@@'
          setAreaCM(areaCM)
        } else if (name == 'hzbrmc_area_mm') {
          // 面积 - 平方毫米
          let areaMM = ',面积' + value + '@@平方毫米@@'
          setAreaMM(areaMM)
        } else if (name == 'hzbrmc_heightdiff_cm') {
          // 高差 - 厘米
          let heightDiffCM = ',高差' + value + '@@厘米@@'
          setHeightDiffCM(heightDiffCM)
        } else if (name == 'hzbrmc_heightdiff_mm') {
          // 高差 - 毫米
          let heightDiffMM = ',高差' + value + '@@毫米@@'
          setHeightDiffMM(heightDiffMM)
        } else if (name == 'hzbrmc_spacing_cm') {
          // 间距 - 厘米
          let spacingCM = ',间距' + value + '@@厘米@@'
          setSpacingCM(spacingCM)
        } else if (name == 'hzbrmc_deformation_mm') {
          // 变形 - 毫米
          let deformationMM = ',变形' + value + '@@毫米@@'
          setDeformationMM(deformationMM)
        } else if (name == 'hzbrmc_num') {
          // 个数 - 个
          let num = ',个数' + value + '@@个@@'
          setNum(num)
        } else if (name == 'hzbrmc_range_cm') {
          // 距离 - 厘米
          let rangeCM = ',距离' + value + '@@厘米@@'
          setRangeCM(rangeCM)
        } else if (name == 'hzbrmc_range_mm') {
          // 距离 - 毫米
          let rangeMM = ',距离' + value + '@@毫米@@'
          setRangeMM(rangeMM)
        } else if (name == 'hzbrmc_depth_cm') {
          // 深度 - 厘米
          let depthCM = ',深度' + value + '@@厘米@@'
          setDepthCM(depthCM)
        } else if (name == 'hzbrmc_depth_mm') {
          // 深度 - 毫米
          let depthMM = ',深度' + value + '@@毫米@@'
          setDepthMM(depthMM)
        } else if (name == 'hzbrmc_volume_m') {
          // 体积 - 立方米
          let volumeM = ',体积' + value + '@@立方米@@'
          setVolumeM(volumeM)
        } else if (name == 'hzbrmc_volume_cm') {
          // 体积 - 立方厘米
          let volumeCM = ',体积' + value + '@@立方厘米@@'
          setVolumeCM(volumeCM)
        } else if (name == 'hzbrmc_disp_cm') {
          // 位移 - 厘米
          let dispCM = ',位移' + value + '@@厘米@@'
          setDispCM(dispCM)
        } else if (name == 'hzbrmc_disp_mm') {
          // 位移 - 毫米
          let dispMM = ',位移' + value + '@@毫米@@'
          setDispMM(dispMM)
        } else if (name == 'hzbrmc_angle_c') {
          // 角度 - 度
          let dispMM = ',角度' + value + '@@度@@'
          setDispMM(dispMM)
        } else if (name == 'hzbrmc_chu') {
          // 处
          let chu = ',' + value + '@@处@@'
          setChu(chu)
        } else if (name == 'hzbrmc_tiao') {
          // 条
          let tiao = ',' + value + '@@条@@'
          setTiao(tiao)
        } else if (name == 'hzbrmc_range_fenbu_m') {
          // 分布范围 - 米
          let rangeFenbuM = ',分布范围' + value + '@@米@@'
          setRangeFenbuM(rangeFenbuM)
        } else if (name == 'hzbrmc_range_length_m') {
          // 长度范围 - 米
          let rangeLengthM = ',长度范围' + value + '@@米@@'
          setRangeLengthM(rangeLengthM)
        } else if (name == 'hzbrmc_range_width_mm') {
          // 宽度范围 - 毫米
          let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
          setRangeWidthMM(rangeWidthMM)
        } else if (name == 'hzbrmc_range_spacing_cm') {
          // 间距范围 - 厘米
          let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
          setRangeSpacingCM(rangeSpacingCM)
        } else if (name == 'hzbrmc_lb_left_length_m') {
          // 左腹板长度 - 米
          let leftLengthM = ',左腹板长度' + value + '@@米@@'
          setLeftLengthM(leftLengthM)
        } else if (name == 'hzbrmc_lb_bottom_length_m') {
          // 底板长度 - 米
          let bottomLengthM = ',底板长度' + value + '@@米@@'
          setBottomLengthM(bottomLengthM)
        } else if (name == 'hzbrmc_lb_right_length_m') {
          // 右腹板长度 - 米
          let rightLengthM = ',右腹板长度' + value + '@@米@@'
          setRightLengthM(rightLengthM)
        } else if (name == 'hzbrmc_lb_left_width_mm') {
          // 左腹板宽度 - 毫米
          let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
          setLeftWidthMM(leftWidthMM)
        } else if (name == 'hzbrmc_lb_bottom_width_mm') {
          // 底板宽度 - 毫米
          let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
          setBottomWidthMM(bottomWidthMM)
        } else if (name == 'hzbrmc_lb_right_width_mm') {
          // 右腹板宽度 - 毫米
          let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
          setRightWidthMM(rightWidthMM)
        } else if (name == 'hzbrmc_slant_m') {
          // 倾斜量 - 米
          let slantM = ',倾斜量' + value + '@@米@@'
          setSlantM(slantM)
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
          
      //     // 在remark里面查找这两位内容，取出其位置下标
      //     if (diseaseData.remark !== undefined) {
      //       if (writeTxt == '' || writeTxt == undefined) {
      //         // 当还没有输入的内容时
      //         // 截取有变化的数据的二、三位内容(第一位为逗号)
      //         let sliceWrite = writeTxt.slice(1, 3)
      //         console.log('sliceWrite', sliceWrite);
      //         let allText = diseaseData.remark
      //         let binghai = allText.slice(0,allText.indexOf('，'))
      //         console.log('binghai',binghai);
      //         let numStart = allText.indexOf(sliceWrite)
      //         console.log(numStart);
      //         // 替换下标位置到其后第一个逗号之间的内容
      //         let allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
      //         console.log('allTextEnd', allTextEnd);
      //         let douhao = ','
      //         let numEnd = allTextEnd.indexOf(douhao)
      //         console.log('numEnd', numEnd);
      //         // 得出内容的末尾下标值
      //         let lengthAll = numStart + numEnd
      //         console.log('lengthAll', lengthAll);
      //         // diseaseData['description'] = writeTxt
      //         let aaaa = allText.substr(0, numStart-1)
      //         console.log('aaaa: ', aaaa);
      //         let bbbb = allText.substr(lengthAll)
      //         console.log('bbbb', bbbb);
      //         let cccc = aaaa.concat(bbbb)
      //         console.log('cccc: ', cccc);
      //         let ccca = '' + writeTxt
      //         // let saveDescription = cccc.concat(ccca)
      //         let saveDescription = binghai.concat(ccca)
      //         setSaveDescription(saveDescription)
      //         console.log('saveDescription: ', saveDescription);
      //         diseaseData['description'] = allTextEnd
      //         handleFormChenge(allTextEnd, diseaseData.description)
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
      //             if (diseaseData.description == undefined || diseaseData.description == '') {
      //               var allText = diseaseData.remark
      //             } else if (diseaseData.description !== undefined || diseaseData.description !== '') {
      //               var allText = diseaseData.description
      //             }
                  
      //             // console.log('allText', allText);
      //             // console.log('sliceWrite:', sliceWrite);
      //             let numStart = allText.indexOf(sliceWrite)
      //             // console.log('numStart',numStart);
      //             // 替换下标位置到其后第一个逗号之间的内容
      //             let allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
      //             // console.log('allTextEnd', allTextEnd);
      //             let numEnd = allTextEnd.indexOf(',')
      //             // console.log('numEnd', numEnd);
      //             if (numEnd !== -1) {
      //               console.log('numEnd的值', numEnd);
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
      //               console.log('numEnd的值', numEnd);
      //               // 到数组的最后一项时，不再有逗号，numEnd返回-1；改变替换内容的方式
      //               // let aaaa = allText.substr(0, numStart-1)
      //               let aaaa = diseaseData.remark
      //               console.log('aaaa: ', aaaa);
      //               let bbbb = ''
      //               for (let i =0; i < writeArr.length; i++) {
      //                 bbbb += writeArr[i]
      //                 let ccca = aaaa.concat(bbbb)
      //                 console.log('ccca', ccca);
      //                 let saveDescription = ccca
      //                 setSaveDescription(saveDescription)
      //                 // console.log('saveDescription: ', saveDescription);
      //                 diseaseData['description'] = saveDescription
      //                 handleFormChenge(saveDescription, diseaseData.description)
      //               }
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
      //     // let writeTxt = ''
      //     // setWriteTxt(writeTxt)
      //   } catch (err) {
      //     console.log(err);
      //   }
        
        
      // }

      const writeDesText = () => {
        try {
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
          // console.log('remark:', diseaseData.remark);
          // console.log('route:::', route.params.thridData.checkinfoshort);
          
          // 在remark里面查找这两位内容，取出其位置下标
          if (diseaseData.remark !== undefined) {
            if (writeTxt == '' || writeTxt == undefined) {
              console.log('writeTxt没有内容~~~~~~');
              // 当还没有输入的内容时
              // 截取有变化的数据的二、三位内容(第一位为逗号)
              // let sliceWrite = writeTxt.slice(1, 3)
              // console.log('sliceWrite', sliceWrite);
              let allText = diseaseData.remark
              console.log('allText',allText);

              // 将remark里的中文逗号替换为英文逗号
              // ================================
              let num =allText.indexOf('，')
              console.log('num',num);
              if (num !== -1 && diseaseData.description == undefined || diseaseData.description == '') {
                let qian = allText.slice(0,allText.indexOf('，'))
                // console.log('qian',qian);
                let hou = allText.slice(allText.indexOf('，')+1)
                // console.log('hou',hou);
                let reset = qian + ',' + hou
                // console.log('reset',reset);
                console.log('reset');
                diseaseData['description'] = reset
                handleFormChenge(reset, diseaseData.description)
              } else if (num !== -1 && diseaseData.description !== undefined || diseaseData.description !== '') {
                diseaseData['description'] = diseaseData.description
                // handleFormChenge(allText, diseaseData.description)
              } else if (num == -1) {
                diseaseData['description'] = allText
                handleFormChenge(allText, diseaseData.description)
              }
            } else if (writeTxt !== '' || writeTxt !== undefined) {
              // 当有输入的内容时
              console.log('=============================================================================');
              console.log('writeTxt有内容： ',writeTxt);
              let writeArr = []
              // 将输入的内容按逗号分隔开
              // 先找到逗号
              let num = 0
              let commaKey = writeTxt.indexOf(',') //从第1号位开始查找逗号
              console.log('逗号的位置：',commaKey);
              let writeArrNum = []
              // 查找逗号出现的位置，将其下标存入数组
              while (commaKey !== -1) {
                writeArrNum.push(commaKey)
                console.log('commaKey逗号出现的位置:',commaKey);
                num ++
                commaKey = writeTxt.indexOf(',', commaKey + 1)
              }
              console.log('逗号出现的次数:', num);
              console.log('截取节点数组：', writeArrNum);
              // 根据查找出的逗号下标，对输入的内容进行截取，转存进新的数组
              for (let i = 0; i < writeArrNum.length; i++) {
                writeArr.push(
                  writeTxt.slice(writeArrNum[i], writeArrNum[i+1])
                )
              }
              console.log('截取后的数组：',writeArr);
              // 对writeArr数组的每一项进行替换
              for (let i = 0; i < writeArr.length; i++) {
                
                  // 截取数组每一项的二、三位内容，与原有数据对比
                  let sliceWrite = writeArr[i].slice(1, 3)
                  console.log('sliceWrite',sliceWrite);
                  if (diseaseData.description == undefined || diseaseData.description == '') {
                    var allText = diseaseData.remark
                  } else if (diseaseData.description !== undefined || diseaseData.description !== '') {
                    var allText = diseaseData.description
                  }
                  
                  console.log('allText', allText);
                  // console.log('sliceWrite:', sliceWrite);
                  let numStart = allText.indexOf(sliceWrite)
                  console.log('numStart',numStart);
                  // 替换下标位置到其后第一个逗号之间的内容
                  var allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
                  console.log('allTextEnd', allTextEnd);
                  let numEnd = allTextEnd.indexOf(',')
                  console.log('numEnd', numEnd);
                  if (numEnd !== -1) {
                    console.log('numEnd的值1', numEnd);
                    // 得出内容的末尾下标值
                    let lengthAll = numStart + numEnd
                    // console.log('lengthAll', lengthAll);
                    let aaaa = allText.substr(0, numStart-1)
                    // console.log('aaaa: ', aaaa);
                    let bbbb = allText.substr(lengthAll)
                    // console.log('bbbb', bbbb);
                    let ccca = '' + writeArr[i].concat(bbbb)
                    let saveDescription = aaaa.concat(ccca)
                    setSaveDescription(saveDescription)
                    // console.log('saveDescription: ', saveDescription);
                    diseaseData['description'] = saveDescription
                    handleFormChenge(saveDescription, diseaseData.description)
                  } else {
                    console.log('numEnd的值2', numEnd);
                    let aaaa = ''
                    // 到数组的最后一项时，不再有逗号，numEnd返回-1；改变替换内容的方式
                    if (numStart == -1) {
                      console.log('a1');
                      aaaa = allText
                    } else if (numStart !== -1) {
                      console.log('a2');
                      aaaa = allText.substr(0, numStart-1)
                      // aaaa = allText.substr(0,allText.indexOf(','))
                    }

                    // if (numStart !== -1) {
                    //   console.log('a1');
                    //   aaaa = allText.slice(0, numStart-1)
                    // } else if (numStart == -1) {
                    //   console.log('a2');
                    //   // aaaa = allText.substr(0, numStart-1)
                    //   aaaa = allText.substr(0,allText.indexOf(','))
                    // }

                    console.log('aaaa: ', aaaa);
                    let bbbb = ''
                    let ccca = ''
                    for (let i =0; i < writeArr.length; i++) {
                      bbbb += writeArr[i]
                      
                    }
                    ccca = aaaa.concat(bbbb)
                      console.log('ccca', ccca);
                      let saveDescription = ccca
                      setSaveDescription(saveDescription)
                      // console.log('saveDescription: ', saveDescription);
                      diseaseData['description'] = saveDescription
                      // diseaseData['remark'] = saveDescription
                      handleFormChenge(saveDescription, diseaseData.description)
                  }
                  
              }
            }
          } else {
            let binghai = infoshort
            let allText = binghai.concat(writeTxt)
            // console.log('allText2',allText);
            diseaseData['description'] = allText
            handleFormChenge(allText, diseaseData.description)
            
          }
        } catch (err) {
          console.log(err);
        }
        
        
      }

      // 填入位置描述内容
      const writePositionText = () => {
        try {
          // console.log('diseaseData.area', diseaseData.area);
          console.log('diseaseData.lengthText',lengthText,widthText,heightText);
          if (diseaseData.area == undefined) {
            let areaName = areaparam[0].label
            setAreaName(areaName)
            handleFormChenge(areaName, diseaseData.area)
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
              var widthNum = ',距左侧' + widthText + 'm'
              setWidthNum(widthNum)
            }

            // 距顶描述
            if (heightText == '0' || heightText == '0.0') {
              var heightNum = ''
              setHeightNum(heightNum)
            } else if (heightText !== '0' || heightText !== '0.0') {
              var heightNum = ',距顶' + heightText + 'm'
              setHeightNum(heightNum)
            }

            console.log('kankan areaName', areaName);
            // 位置描述 = / + 病害区域 + 桥台 + 长度 + 宽度 + 距顶
            let writePositionTxt = areaName + pier + lengthNum + widthNum + heightNum + '处'
            setWritePositionTxt(writePositionTxt)
            diseaseData['writePositionTxt'] = writePositionTxt
            setDiseaseData(diseaseData)
            handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
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
              var lengthNum = lengthText + 'm'
              setLengthNum(lengthNum)
            }
            
            // 宽度描述
            if (widthText == '0' || widthText == '0.0') {
              var widthNum = ''
              setWidthNum(widthNum)
            } else if (widthText !== '0' || widthText !== '0.0') {
              var widthNum = ',距左侧' + widthText + 'm'
              setWidthNum(widthNum)
            }

            // 距顶描述
            if (heightText == '0' || heightText == '0.0') {
              var heightNum = ''
              setHeightNum(heightNum)
            } else if (heightText !== '0' || heightText !== '0.0') {
              var heightNum = ',距顶' + heightText + 'm'
              setHeightNum(heightNum)
            }

            console.log('kankan areaName', areaName);
            // 位置描述 = / + 病害区域 + 桥台 + 长度 + 宽度 + 距顶
            let writePositionTxt = areaName + pier + lengthNum + widthNum + heightNum + '处'
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
        <View style={[tailwind.flexRow, tailwind.justifyBetween]}>
          <View style={{width:'30%'}}>
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
          <View style={{width:'40%'}}>
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
        {scale.length ? (
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
        )}


        <View style={tailwind.mT2} />
        <View>
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
          <Text style={[{color:'#fff',fontSize:16}]}>确认</Text>
        </TouchableOpacity>
      </View>
      
      <ScaleInfo ref={scaleInfoRef} info={scaleInfo} />
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
  
    const infoList = hooks.useInfoComponents({diseaseData, baseData});
  
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
        let lengthText = (diseaseData.memberLength * (diseaseData.disLength / 100)).toFixed(1)
        setLengthText(lengthText)
        let widthText = (diseaseData.memberWidth * (diseaseData.disWidth / 100)).toFixed(1)
        setWidthText(widthText)
        let heightText = (diseaseData.memberHeight * (diseaseData.disHeight / 100)).toFixed(1)
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


        if (diseaseData.diseaseName == undefined || diseaseData.diseaseName == '') {
          diseaseData['diseaseName'] = route.params.thridData.checkinfoshort
          handleFormChenge(route.params.thridData.checkinfoshort, diseaseData.diseaseName)
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
        }

      } catch {
      }
    }, [diseaseData]);
  
    React.useEffect(() => {
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
      if (areaparam == '') {
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


      if (name == 'scale') {
        // 标度
        let biaodu = ',标度' + value + '@@'
        setBiaodu(biaodu)
      } else if (name == 'hzbrmc_length_m') {
        //长度 - 米
        let lengthM = ',长度' + value + '@@米@@'
        setLengthM(lengthM)
      } else if (name == 'hzbrmc_length_cm') {
        // 长度 - 厘米
        let lengthCM = ',长度' + value + '@@厘米@@'
        setLengthCM(lengthCM)
      } else if (name == 'hzbrmc_length_mm') {
        // 长度 - 毫米
        let lengthMM = ',长度' + value + '@@毫米@@'
        setLengthMM(lengthMM)
      } else if (name == 'hzbrmc_width_m') {
        // 宽度 - 米
        let widthM = ',宽度' + value + '@@米@@'
        setWidthM(widthM)
      } else if (name == 'hzbrmc_width_cm') {
        // 宽度 - 厘米
        let widthCM = ',宽度' + value + '@@厘米@@'
        setWidthCM(widthCM)
      } else if (name == 'hzbrmc_width_mm') {
        // 宽度 - 毫米
        let widthMM = ',宽度' + value + '@@毫米@@'
        setWidthMM(widthMM)
      } else if (name == 'hzbrmc_height_m') {
        // 高度 - 米
        let heightM = ',高度' + value + '@@米@@'
        setHeightM(heightM)
      } else if (name == 'hzbrmc_height_cm') {
        // 高度 - 厘米
        let heightCM = ',高度' + value + '@@厘米@@'
        setHeightCM(heightCM)
      } else if (name == 'hzbrmc_height_mm') {
        // 高度 - 毫米
        let heightMM = ',高度' + value + '@@毫米@@'
        setHeightMM(heightMM)
      } else if (name == 'hzbrmc_area_face') {
        // 面域 - %
        let areaFace = ',面域' + value + '@@%@@'
        setAreaFace(areaFace)
      } else if (name == 'hzbrmc_area_per') {
        // 面积占比 - %
        let areaPer = ',面积占比' + value + '@@%@@'
        setAreaPer(areaPer)
      } else if (name == 'hzbrmc_area_m') {
        // 面积 - 平方米
        let areaM = ',面积' + value + '@@平方米@@'
        setAreaM(areaM)
      } else if (name == 'hzbrmc_area_cm') {
        // 面积 - 平方厘米
        let areaCM = ',面积' + value + '@@平方厘米@@'
        setAreaCM(areaCM)
      } else if (name == 'hzbrmc_area_mm') {
        // 面积 - 平方毫米
        let areaMM = ',面积' + value + '@@平方毫米@@'
        setAreaMM(areaMM)
      } else if (name == 'hzbrmc_heightdiff_cm') {
        // 高差 - 厘米
        let heightDiffCM = ',高差' + value + '@@厘米@@'
        setHeightDiffCM(heightDiffCM)
      } else if (name == 'hzbrmc_heightdiff_mm') {
        // 高差 - 毫米
        let heightDiffMM = ',高差' + value + '@@毫米@@'
        setHeightDiffMM(heightDiffMM)
      } else if (name == 'hzbrmc_spacing_cm') {
        // 间距 - 厘米
        let spacingCM = ',间距' + value + '@@厘米@@'
        setSpacingCM(spacingCM)
      } else if (name == 'hzbrmc_deformation_mm') {
        // 变形 - 毫米
        let deformationMM = ',变形' + value + '@@毫米@@'
        setDeformationMM(deformationMM)
      } else if (name == 'hzbrmc_num') {
        // 个数 - 个
        let num = ',个数' + value + '@@个@@'
        setNum(num)
      } else if (name == 'hzbrmc_range_cm') {
        // 距离 - 厘米
        let rangeCM = ',距离' + value + '@@厘米@@'
        setRangeCM(rangeCM)
      } else if (name == 'hzbrmc_range_mm') {
        // 距离 - 毫米
        let rangeMM = ',距离' + value + '@@毫米@@'
        setRangeMM(rangeMM)
      } else if (name == 'hzbrmc_depth_cm') {
        // 深度 - 厘米
        let depthCM = ',深度' + value + '@@厘米@@'
        setDepthCM(depthCM)
      } else if (name == 'hzbrmc_depth_mm') {
        // 深度 - 毫米
        let depthMM = ',深度' + value + '@@毫米@@'
        setDepthMM(depthMM)
      } else if (name == 'hzbrmc_volume_m') {
        // 体积 - 立方米
        let volumeM = ',体积' + value + '@@立方米@@'
        setVolumeM(volumeM)
      } else if (name == 'hzbrmc_volume_cm') {
        // 体积 - 立方厘米
        let volumeCM = ',体积' + value + '@@立方厘米@@'
        setVolumeCM(volumeCM)
      } else if (name == 'hzbrmc_disp_cm') {
        // 位移 - 厘米
        let dispCM = ',位移' + value + '@@厘米@@'
        setDispCM(dispCM)
      } else if (name == 'hzbrmc_disp_mm') {
        // 位移 - 毫米
        let dispMM = ',位移' + value + '@@毫米@@'
        setDispMM(dispMM)
      } else if (name == 'hzbrmc_angle_c') {
        // 角度 - 度
        let dispMM = ',角度' + value + '@@度@@'
        setDispMM(dispMM)
      } else if (name == 'hzbrmc_chu') {
        // 处
        let chu = ',' + value + '@@处@@'
        setChu(chu)
      } else if (name == 'hzbrmc_tiao') {
        // 条
        let tiao = ',' + value + '@@条@@'
        setTiao(tiao)
      } else if (name == 'hzbrmc_range_fenbu_m') {
        // 分布范围 - 米
        let rangeFenbuM = ',分布范围' + value + '@@米@@'
        setRangeFenbuM(rangeFenbuM)
      } else if (name == 'hzbrmc_range_length_m') {
        // 长度范围 - 米
        let rangeLengthM = ',长度范围' + value + '@@米@@'
        setRangeLengthM(rangeLengthM)
      } else if (name == 'hzbrmc_range_width_mm') {
        // 宽度范围 - 毫米
        let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
        setRangeWidthMM(rangeWidthMM)
      } else if (name == 'hzbrmc_range_spacing_cm') {
        // 间距范围 - 厘米
        let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
        setRangeSpacingCM(rangeSpacingCM)
      } else if (name == 'hzbrmc_lb_left_length_m') {
        // 左腹板长度 - 米
        let leftLengthM = ',左腹板长度' + value + '@@米@@'
        setLeftLengthM(leftLengthM)
      } else if (name == 'hzbrmc_lb_bottom_length_m') {
        // 底板长度 - 米
        let bottomLengthM = ',底板长度' + value + '@@米@@'
        setBottomLengthM(bottomLengthM)
      } else if (name == 'hzbrmc_lb_right_length_m') {
        // 右腹板长度 - 米
        let rightLengthM = ',右腹板长度' + value + '@@米@@'
        setRightLengthM(rightLengthM)
      } else if (name == 'hzbrmc_lb_left_width_mm') {
        // 左腹板宽度 - 毫米
        let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
        setLeftWidthMM(leftWidthMM)
      } else if (name == 'hzbrmc_lb_bottom_width_mm') {
        // 底板宽度 - 毫米
        let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
        setBottomWidthMM(bottomWidthMM)
      } else if (name == 'hzbrmc_lb_right_width_mm') {
        // 右腹板宽度 - 毫米
        let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
        setRightWidthMM(rightWidthMM)
      } else if (name == 'hzbrmc_slant_m') {
        // 倾斜量 - 米
        let slantM = ',倾斜量' + value + '@@米@@'
        setSlantM(slantM)
      }
      setDiseaseData(_data);
    };

    // 填入病害描述内容
    const writeDesText = () => {
      try {
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
        // console.log('remark:', diseaseData.remark);
        // console.log('route:::', route.params.thridData.checkinfoshort);
        
        // 在remark里面查找这两位内容，取出其位置下标
        if (diseaseData.remark !== undefined) {
          if (writeTxt == '' || writeTxt == undefined) {
            console.log('writeTxt没有内容~~~~~~');
            // 当还没有输入的内容时
            // 截取有变化的数据的二、三位内容(第一位为逗号)
            // let sliceWrite = writeTxt.slice(1, 3)
            // console.log('sliceWrite', sliceWrite);
            let allText = diseaseData.remark
            console.log('allText',allText);

            // 将remark里的中文逗号替换为英文逗号
            // ================================
            let num =allText.indexOf('，')
            // console.log('num',num);
            if (num !== -1) {
              let qian = allText.slice(0,allText.indexOf('，'))
              // console.log('qian',qian);
              let hou = allText.slice(allText.indexOf('，')+1)
              // console.log('hou',hou);
              let reset = qian + ',' + hou
              // console.log('reset',reset);
              diseaseData['description'] = reset
              handleFormChenge(reset, diseaseData.description)
            } else if (num == -1) {
              diseaseData['description'] = allText
              handleFormChenge(allText, diseaseData.description)
            }
            // ================================
            
            // let binghai = allText.slice(0,allText.indexOf(','))
            // console.log('binghai',binghai);
            // let numStart = allText.indexOf(sliceWrite)
            // console.log(numStart);
            // // 替换下标位置到其后第一个逗号之间的内容
            // let allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
            // console.log('allTextEnd', allTextEnd);
            // let douhao = ','
            // let numEnd = allTextEnd.indexOf(douhao)
            // console.log('numEnd', numEnd);
            // // 得出内容的末尾下标值
            // let lengthAll = numStart + numEnd
            // console.log('lengthAll', lengthAll);
            // // diseaseData['description'] = writeTxt
            // let aaaa = allText.substr(0, numStart-1)
            // console.log('aaaa: ', aaaa);
            // let bbbb = allText.substr(lengthAll)
            // console.log('bbbb', bbbb);
            // let cccc = aaaa.concat(bbbb)
            // console.log('cccc: ', cccc);
            // let ccca = '' + writeTxt
            // // let saveDescription = cccc.concat(ccca)
            // let saveDescription = binghai.concat(ccca)
            // setSaveDescription(saveDescription)
            // console.log('saveDescription: ', saveDescription);
            // diseaseData['description'] = allText
            // handleFormChenge(allText, diseaseData.description)
          } else if (writeTxt !== '' || writeTxt !== undefined) {
            // 当有输入的内容时
            console.log('=============================================================================');
            console.log('writeTxt有内容： ',writeTxt);
            let writeArr = []
            // 将输入的内容按逗号分隔开
            // 先找到逗号
            let num = 0
            let commaKey = writeTxt.indexOf(',') //从第1号位开始查找逗号
            console.log('逗号的位置：',commaKey);
            let writeArrNum = []
            // 查找逗号出现的位置，将其下标存入数组
            while (commaKey !== -1) {
              writeArrNum.push(commaKey)
              console.log('commaKey逗号出现的位置:',commaKey);
              num ++
              commaKey = writeTxt.indexOf(',', commaKey + 1)
            }
            console.log('逗号出现的次数:', num);
            console.log('截取节点数组：', writeArrNum);
            // 根据查找出的逗号下标，对输入的内容进行截取，转存进新的数组
            for (let i = 0; i < writeArrNum.length; i++) {
              writeArr.push(
                writeTxt.slice(writeArrNum[i], writeArrNum[i+1])
              )
            }
            console.log('截取后的数组：',writeArr);
            // 对writeArr数组的每一项进行替换
            for (let i = 0; i < writeArr.length; i++) {
              
                // 截取数组每一项的二、三位内容，与原有数据对比
                let sliceWrite = writeArr[i].slice(1, 3)
                console.log('sliceWrite',sliceWrite);
                if (diseaseData.description == undefined || diseaseData.description == '') {
                  var allText = diseaseData.remark
                } else if (diseaseData.description !== undefined || diseaseData.description !== '') {
                  var allText = diseaseData.description
                }
                
                console.log('allText', allText);
                // console.log('sliceWrite:', sliceWrite);
                let numStart = allText.indexOf(sliceWrite)
                console.log('numStart',numStart);
                // 替换下标位置到其后第一个逗号之间的内容
                var allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
                console.log('allTextEnd', allTextEnd);
                let numEnd = allTextEnd.indexOf(',')
                console.log('numEnd', numEnd);
                if (numEnd !== -1) {
                  console.log('numEnd的值1', numEnd);
                  // 得出内容的末尾下标值
                  let lengthAll = numStart + numEnd
                  // console.log('lengthAll', lengthAll);
                  let aaaa = allText.substr(0, numStart-1)
                  // console.log('aaaa: ', aaaa);
                  let bbbb = allText.substr(lengthAll)
                  // console.log('bbbb', bbbb);
                  let ccca = '' + writeArr[i].concat(bbbb)
                  let saveDescription = aaaa.concat(ccca)
                  setSaveDescription(saveDescription)
                  // console.log('saveDescription: ', saveDescription);
                  diseaseData['description'] = saveDescription
                  handleFormChenge(saveDescription, diseaseData.description)
                } else {
                  console.log('numEnd的值2', numEnd);
                  let aaaa = ''
                  // 到数组的最后一项时，不再有逗号，numEnd返回-1；改变替换内容的方式
                  if (numStart == -1) {
                    aaaa = allText
                  } else if (numStart !== -1) {
                    // aaaa = allText.substr(0, numStart-1)
                    aaaa = allText.substr(0,allText.indexOf(','))
                  }
                  console.log('aaaa: ', aaaa);
                  let bbbb = ''
                  let ccca = ''
                  for (let i =0; i < writeArr.length; i++) {
                    bbbb += writeArr[i]
                    
                  }
                  ccca = aaaa.concat(bbbb)
                    console.log('ccca', ccca);
                    let saveDescription = ccca
                    setSaveDescription(saveDescription)
                    // console.log('saveDescription: ', saveDescription);
                    diseaseData['description'] = saveDescription
                    // diseaseData['remark'] = saveDescription
                    handleFormChenge(saveDescription, diseaseData.description)
                }
                
            }
          }
        } else {
          let binghai = infoshort
          let allText = binghai.concat(writeTxt)
          // console.log('allText2',allText);
          diseaseData['description'] = allText
          handleFormChenge(allText, diseaseData.description)
          
        }
      } catch (err) {
        console.log(err);
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
      <View style={[tailwind.flexRow, tailwind.justifyBetween]}>
        <View style={{width:'30%'}}>
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
        <View style={{width:'40%'}}>
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
      {scale.length ? (
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
        <Text style={[{color:'#fff',fontSize:16}]}>确认</Text>
      </TouchableOpacity>
    </View>
    <ScaleInfo ref={scaleInfoRef} info={scaleInfo} />
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
  
    const infoList = hooks.useInfoComponents({diseaseData, baseData});
  
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
        let lengthText = (diseaseData.memberLength * (diseaseData.disLength / 100)).toFixed(1)
        setLengthText(lengthText)
        let widthText = (diseaseData.memberWidth * (diseaseData.disWidth / 100)).toFixed(1)
        setWidthText(widthText)
        let heightText = (diseaseData.memberHeight * (diseaseData.disHeight / 100)).toFixed(1)
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


        if (diseaseData.diseaseName == undefined || diseaseData.diseaseName == '') {
          diseaseData['diseaseName'] = route.params.thridData.checkinfoshort
          handleFormChenge(route.params.thridData.checkinfoshort, diseaseData.diseaseName)
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
        }

      } catch {
      }
    }, [diseaseData]);
  
    React.useEffect(() => {
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
      if (areaparam == '') {
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


      if (name == 'scale') {
        // 标度
        let biaodu = ',标度' + value + '@@'
        setBiaodu(biaodu)
      } else if (name == 'hzbrmc_length_m') {
        //长度 - 米
        let lengthM = ',长度' + value + '@@米@@'
        setLengthM(lengthM)
      } else if (name == 'hzbrmc_length_cm') {
        // 长度 - 厘米
        let lengthCM = ',长度' + value + '@@厘米@@'
        setLengthCM(lengthCM)
      } else if (name == 'hzbrmc_length_mm') {
        // 长度 - 毫米
        let lengthMM = ',长度' + value + '@@毫米@@'
        setLengthMM(lengthMM)
      } else if (name == 'hzbrmc_width_m') {
        // 宽度 - 米
        let widthM = ',宽度' + value + '@@米@@'
        setWidthM(widthM)
      } else if (name == 'hzbrmc_width_cm') {
        // 宽度 - 厘米
        let widthCM = ',宽度' + value + '@@厘米@@'
        setWidthCM(widthCM)
      } else if (name == 'hzbrmc_width_mm') {
        // 宽度 - 毫米
        let widthMM = ',宽度' + value + '@@毫米@@'
        setWidthMM(widthMM)
      } else if (name == 'hzbrmc_height_m') {
        // 高度 - 米
        let heightM = ',高度' + value + '@@米@@'
        setHeightM(heightM)
      } else if (name == 'hzbrmc_height_cm') {
        // 高度 - 厘米
        let heightCM = ',高度' + value + '@@厘米@@'
        setHeightCM(heightCM)
      } else if (name == 'hzbrmc_height_mm') {
        // 高度 - 毫米
        let heightMM = ',高度' + value + '@@毫米@@'
        setHeightMM(heightMM)
      } else if (name == 'hzbrmc_area_face') {
        // 面域 - %
        let areaFace = ',面域' + value + '@@%@@'
        setAreaFace(areaFace)
      } else if (name == 'hzbrmc_area_per') {
        // 面积占比 - %
        let areaPer = ',面积占比' + value + '@@%@@'
        setAreaPer(areaPer)
      } else if (name == 'hzbrmc_area_m') {
        // 面积 - 平方米
        let areaM = ',面积' + value + '@@平方米@@'
        setAreaM(areaM)
      } else if (name == 'hzbrmc_area_cm') {
        // 面积 - 平方厘米
        let areaCM = ',面积' + value + '@@平方厘米@@'
        setAreaCM(areaCM)
      } else if (name == 'hzbrmc_area_mm') {
        // 面积 - 平方毫米
        let areaMM = ',面积' + value + '@@平方毫米@@'
        setAreaMM(areaMM)
      } else if (name == 'hzbrmc_heightdiff_cm') {
        // 高差 - 厘米
        let heightDiffCM = ',高差' + value + '@@厘米@@'
        setHeightDiffCM(heightDiffCM)
      } else if (name == 'hzbrmc_heightdiff_mm') {
        // 高差 - 毫米
        let heightDiffMM = ',高差' + value + '@@毫米@@'
        setHeightDiffMM(heightDiffMM)
      } else if (name == 'hzbrmc_spacing_cm') {
        // 间距 - 厘米
        let spacingCM = ',间距' + value + '@@厘米@@'
        setSpacingCM(spacingCM)
      } else if (name == 'hzbrmc_deformation_mm') {
        // 变形 - 毫米
        let deformationMM = ',变形' + value + '@@毫米@@'
        setDeformationMM(deformationMM)
      } else if (name == 'hzbrmc_num') {
        // 个数 - 个
        let num = ',个数' + value + '@@个@@'
        setNum(num)
      } else if (name == 'hzbrmc_range_cm') {
        // 距离 - 厘米
        let rangeCM = ',距离' + value + '@@厘米@@'
        setRangeCM(rangeCM)
      } else if (name == 'hzbrmc_range_mm') {
        // 距离 - 毫米
        let rangeMM = ',距离' + value + '@@毫米@@'
        setRangeMM(rangeMM)
      } else if (name == 'hzbrmc_depth_cm') {
        // 深度 - 厘米
        let depthCM = ',深度' + value + '@@厘米@@'
        setDepthCM(depthCM)
      } else if (name == 'hzbrmc_depth_mm') {
        // 深度 - 毫米
        let depthMM = ',深度' + value + '@@毫米@@'
        setDepthMM(depthMM)
      } else if (name == 'hzbrmc_volume_m') {
        // 体积 - 立方米
        let volumeM = ',体积' + value + '@@立方米@@'
        setVolumeM(volumeM)
      } else if (name == 'hzbrmc_volume_cm') {
        // 体积 - 立方厘米
        let volumeCM = ',体积' + value + '@@立方厘米@@'
        setVolumeCM(volumeCM)
      } else if (name == 'hzbrmc_disp_cm') {
        // 位移 - 厘米
        let dispCM = ',位移' + value + '@@厘米@@'
        setDispCM(dispCM)
      } else if (name == 'hzbrmc_disp_mm') {
        // 位移 - 毫米
        let dispMM = ',位移' + value + '@@毫米@@'
        setDispMM(dispMM)
      } else if (name == 'hzbrmc_angle_c') {
        // 角度 - 度
        let dispMM = ',角度' + value + '@@度@@'
        setDispMM(dispMM)
      } else if (name == 'hzbrmc_chu') {
        // 处
        let chu = ',' + value + '@@处@@'
        setChu(chu)
      } else if (name == 'hzbrmc_tiao') {
        // 条
        let tiao = ',' + value + '@@条@@'
        setTiao(tiao)
      } else if (name == 'hzbrmc_range_fenbu_m') {
        // 分布范围 - 米
        let rangeFenbuM = ',分布范围' + value + '@@米@@'
        setRangeFenbuM(rangeFenbuM)
      } else if (name == 'hzbrmc_range_length_m') {
        // 长度范围 - 米
        let rangeLengthM = ',长度范围' + value + '@@米@@'
        setRangeLengthM(rangeLengthM)
      } else if (name == 'hzbrmc_range_width_mm') {
        // 宽度范围 - 毫米
        let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
        setRangeWidthMM(rangeWidthMM)
      } else if (name == 'hzbrmc_range_spacing_cm') {
        // 间距范围 - 厘米
        let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
        setRangeSpacingCM(rangeSpacingCM)
      } else if (name == 'hzbrmc_lb_left_length_m') {
        // 左腹板长度 - 米
        let leftLengthM = ',左腹板长度' + value + '@@米@@'
        setLeftLengthM(leftLengthM)
      } else if (name == 'hzbrmc_lb_bottom_length_m') {
        // 底板长度 - 米
        let bottomLengthM = ',底板长度' + value + '@@米@@'
        setBottomLengthM(bottomLengthM)
      } else if (name == 'hzbrmc_lb_right_length_m') {
        // 右腹板长度 - 米
        let rightLengthM = ',右腹板长度' + value + '@@米@@'
        setRightLengthM(rightLengthM)
      } else if (name == 'hzbrmc_lb_left_width_mm') {
        // 左腹板宽度 - 毫米
        let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
        setLeftWidthMM(leftWidthMM)
      } else if (name == 'hzbrmc_lb_bottom_width_mm') {
        // 底板宽度 - 毫米
        let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
        setBottomWidthMM(bottomWidthMM)
      } else if (name == 'hzbrmc_lb_right_width_mm') {
        // 右腹板宽度 - 毫米
        let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
        setRightWidthMM(rightWidthMM)
      } else if (name == 'hzbrmc_slant_m') {
        // 倾斜量 - 米
        let slantM = ',倾斜量' + value + '@@米@@'
        setSlantM(slantM)
      }
      setDiseaseData(_data);
    };

    // 填入病害描述内容
    const writeDesText = () => {
      try {
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
        // console.log('remark:', diseaseData.remark);
        // console.log('route:::', route.params.thridData.checkinfoshort);
        
        // 在remark里面查找这两位内容，取出其位置下标
        if (diseaseData.remark !== undefined) {
          if (writeTxt == '' || writeTxt == undefined) {
            console.log('writeTxt没有内容~~~~~~');
            // 当还没有输入的内容时
            // 截取有变化的数据的二、三位内容(第一位为逗号)
            // let sliceWrite = writeTxt.slice(1, 3)
            // console.log('sliceWrite', sliceWrite);
            let allText = diseaseData.remark
            console.log('allText',allText);

            // 将remark里的中文逗号替换为英文逗号
            // ================================
            let num =allText.indexOf('，')
            // console.log('num',num);
            if (num !== -1) {
              let qian = allText.slice(0,allText.indexOf('，'))
              // console.log('qian',qian);
              let hou = allText.slice(allText.indexOf('，')+1)
              // console.log('hou',hou);
              let reset = qian + ',' + hou
              // console.log('reset',reset);
              diseaseData['description'] = reset
              handleFormChenge(reset, diseaseData.description)
            } else if (num == -1) {
              diseaseData['description'] = allText
              handleFormChenge(allText, diseaseData.description)
            }
            // ================================
            
            // let binghai = allText.slice(0,allText.indexOf(','))
            // console.log('binghai',binghai);
            // let numStart = allText.indexOf(sliceWrite)
            // console.log(numStart);
            // // 替换下标位置到其后第一个逗号之间的内容
            // let allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
            // console.log('allTextEnd', allTextEnd);
            // let douhao = ','
            // let numEnd = allTextEnd.indexOf(douhao)
            // console.log('numEnd', numEnd);
            // // 得出内容的末尾下标值
            // let lengthAll = numStart + numEnd
            // console.log('lengthAll', lengthAll);
            // // diseaseData['description'] = writeTxt
            // let aaaa = allText.substr(0, numStart-1)
            // console.log('aaaa: ', aaaa);
            // let bbbb = allText.substr(lengthAll)
            // console.log('bbbb', bbbb);
            // let cccc = aaaa.concat(bbbb)
            // console.log('cccc: ', cccc);
            // let ccca = '' + writeTxt
            // // let saveDescription = cccc.concat(ccca)
            // let saveDescription = binghai.concat(ccca)
            // setSaveDescription(saveDescription)
            // console.log('saveDescription: ', saveDescription);
            // diseaseData['description'] = allText
            // handleFormChenge(allText, diseaseData.description)
          } else if (writeTxt !== '' || writeTxt !== undefined) {
            // 当有输入的内容时
            console.log('=============================================================================');
            console.log('writeTxt有内容： ',writeTxt);
            let writeArr = []
            // 将输入的内容按逗号分隔开
            // 先找到逗号
            let num = 0
            let commaKey = writeTxt.indexOf(',') //从第1号位开始查找逗号
            console.log('逗号的位置：',commaKey);
            let writeArrNum = []
            // 查找逗号出现的位置，将其下标存入数组
            while (commaKey !== -1) {
              writeArrNum.push(commaKey)
              console.log('commaKey逗号出现的位置:',commaKey);
              num ++
              commaKey = writeTxt.indexOf(',', commaKey + 1)
            }
            console.log('逗号出现的次数:', num);
            console.log('截取节点数组：', writeArrNum);
            // 根据查找出的逗号下标，对输入的内容进行截取，转存进新的数组
            for (let i = 0; i < writeArrNum.length; i++) {
              writeArr.push(
                writeTxt.slice(writeArrNum[i], writeArrNum[i+1])
              )
            }
            console.log('截取后的数组：',writeArr);
            // 对writeArr数组的每一项进行替换
            for (let i = 0; i < writeArr.length; i++) {
              
                // 截取数组每一项的二、三位内容，与原有数据对比
                let sliceWrite = writeArr[i].slice(1, 3)
                console.log('sliceWrite',sliceWrite);
                if (diseaseData.description == undefined || diseaseData.description == '') {
                  var allText = diseaseData.remark
                } else if (diseaseData.description !== undefined || diseaseData.description !== '') {
                  var allText = diseaseData.description
                }
                
                console.log('allText', allText);
                // console.log('sliceWrite:', sliceWrite);
                let numStart = allText.indexOf(sliceWrite)
                console.log('numStart',numStart);
                // 替换下标位置到其后第一个逗号之间的内容
                var allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
                console.log('allTextEnd', allTextEnd);
                let numEnd = allTextEnd.indexOf(',')
                console.log('numEnd', numEnd);
                if (numEnd !== -1) {
                  console.log('numEnd的值1', numEnd);
                  // 得出内容的末尾下标值
                  let lengthAll = numStart + numEnd
                  // console.log('lengthAll', lengthAll);
                  let aaaa = allText.substr(0, numStart-1)
                  // console.log('aaaa: ', aaaa);
                  let bbbb = allText.substr(lengthAll)
                  // console.log('bbbb', bbbb);
                  let ccca = '' + writeArr[i].concat(bbbb)
                  let saveDescription = aaaa.concat(ccca)
                  setSaveDescription(saveDescription)
                  // console.log('saveDescription: ', saveDescription);
                  diseaseData['description'] = saveDescription
                  handleFormChenge(saveDescription, diseaseData.description)
                } else {
                  console.log('numEnd的值2', numEnd);
                  let aaaa = ''
                  // 到数组的最后一项时，不再有逗号，numEnd返回-1；改变替换内容的方式
                  if (numStart == -1) {
                    aaaa = allText
                  } else if (numStart !== -1) {
                    // aaaa = allText.substr(0, numStart-1)
                    aaaa = allText.substr(0,allText.indexOf(','))
                  }
                  console.log('aaaa: ', aaaa);
                  let bbbb = ''
                  let ccca = ''
                  for (let i =0; i < writeArr.length; i++) {
                    bbbb += writeArr[i]
                    
                  }
                  ccca = aaaa.concat(bbbb)
                    console.log('ccca', ccca);
                    let saveDescription = ccca
                    setSaveDescription(saveDescription)
                    // console.log('saveDescription: ', saveDescription);
                    diseaseData['description'] = saveDescription
                    // diseaseData['remark'] = saveDescription
                    handleFormChenge(saveDescription, diseaseData.description)
                }
                
            }
          }
        } else {
          let binghai = infoshort
          let allText = binghai.concat(writeTxt)
          // console.log('allText2',allText);
          diseaseData['description'] = allText
          handleFormChenge(allText, diseaseData.description)
          
        }
      } catch (err) {
        console.log(err);
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
            // if (widthText == '0' || widthText == '0.0') {
            //   var widthNum = ''
            //   setWidthNum(widthNum)
            // } else if (widthText !== '0' || widthText !== '0.0') {
            //   var widthNum = ',距左侧' + widthText + 'm'
            //   setWidthNum(widthNum)
            // }

            // 距顶描述
            // if (heightText == '0' || heightText == '0.0') {
            //   var heightNum = ''
            //   setHeightNum(heightNum)
            // } else if (heightText !== '0' || heightText !== '0.0') {
            //   var heightNum = ',距顶' + heightText + 'm'
            //   setHeightNum(heightNum)
            // }

            // console.log('kankan areaName', areaName);
            // 位置描述 = / + 病害区域 + 桥台 + 长度
            let writePositionTxt = areaName + pier + lengthNum + '处'
            setWritePositionTxt(writePositionTxt)
            diseaseData['writePositionTxt'] = writePositionTxt
            setDiseaseData(diseaseData)
            handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
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
              var lengthNum = lengthText + 'm'
              setLengthNum(lengthNum)
            }
            
            // 宽度描述
            // if (widthText == '0' || widthText == '0.0') {
            //   var widthNum = ''
            //   setWidthNum(widthNum)
            // } else if (widthText !== '0' || widthText !== '0.0') {
            //   var widthNum = ',距左侧' + widthText + 'm'
            //   setWidthNum(widthNum)
            // }

            // 距顶描述
            // if (heightText == '0' || heightText == '0.0') {
            //   var heightNum = ''
            //   setHeightNum(heightNum)
            // } else if (heightText !== '0' || heightText !== '0.0') {
            //   var heightNum = ',距顶' + heightText + 'm'
            //   setHeightNum(heightNum)
            // }

            console.log('kankan areaName', areaName);
            // 位置描述 = / + 病害区域 + 桥台 + 长度 + 宽度 + 距顶
            let writePositionTxt = areaName + pier + lengthNum + '处'
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
      <View style={[tailwind.flexRow, tailwind.justifyBetween]}>
        <View style={{width:'30%'}}>
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
        <View style={{width:'40%'}}>
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
      {scale.length ? (
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
      )}


      <View style={tailwind.mT2} />
      <View>
        <View style={[tailwind.flexRow]}>
          <LabelItem label="病害位置(米)" style={tailwind.w18} />
          <Text>长度{lengthText}米</Text>
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
        <Text style={[{color:'#fff',fontSize:16}]}>确认</Text>
      </TouchableOpacity>
    </View>
    <ScaleInfo ref={scaleInfoRef} info={scaleInfo} />
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
  
    const infoList = hooks.useInfoComponents({diseaseData, baseData});
  
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
        let lengthText = (diseaseData.memberLength * (diseaseData.disLength / 100)).toFixed(1)
        setLengthText(lengthText)
        let widthText = (diseaseData.memberWidth * (diseaseData.disWidth / 100)).toFixed(1)
        setWidthText(widthText)
        let heightText = (diseaseData.memberHeight * (diseaseData.disHeight / 100)).toFixed(1)
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

        if (diseaseData.diseaseName == undefined || diseaseData.diseaseName == '') {
          diseaseData['diseaseName'] = route.params.thridData.checkinfoshort
          handleFormChenge(route.params.thridData.checkinfoshort, diseaseData.diseaseName)
        }

        if (diseaseData.area !== '' || diseaseData.area !== undefined) {
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


        // console.log(diseaseData);
        if (diseaseData.remark == '' || diseaseData.remark == undefined) {
          let infoshort = route.params.thridData.checkinfoshort
          setInfoShort(infoshort)
        }
        if (diseaseData.description == '' || diseaseData.description == undefined) {
          diseaseData['description'] = diseaseData.remark
        }
      } catch {
      }
    }, [diseaseData]);
  
    React.useEffect(() => {
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
      if (areaparam == '') {
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


      if (name == 'scale') {
        // 标度
        let biaodu = ',标度' + value + '@@'
        setBiaodu(biaodu)
      } else if (name == 'hzbrmc_length_m') {
        //长度 - 米
        let lengthM = ',长度' + value + '@@米@@'
        setLengthM(lengthM)
      } else if (name == 'hzbrmc_length_cm') {
        // 长度 - 厘米
        let lengthCM = ',长度' + value + '@@厘米@@'
        setLengthCM(lengthCM)
      } else if (name == 'hzbrmc_length_mm') {
        // 长度 - 毫米
        let lengthMM = ',长度' + value + '@@毫米@@'
        setLengthMM(lengthMM)
      } else if (name == 'hzbrmc_width_m') {
        // 宽度 - 米
        let widthM = ',宽度' + value + '@@米@@'
        setWidthM(widthM)
      } else if (name == 'hzbrmc_width_cm') {
        // 宽度 - 厘米
        let widthCM = ',宽度' + value + '@@厘米@@'
        setWidthCM(widthCM)
      } else if (name == 'hzbrmc_width_mm') {
        // 宽度 - 毫米
        let widthMM = ',宽度' + value + '@@毫米@@'
        setWidthMM(widthMM)
      } else if (name == 'hzbrmc_height_m') {
        // 高度 - 米
        let heightM = ',高度' + value + '@@米@@'
        setHeightM(heightM)
      } else if (name == 'hzbrmc_height_cm') {
        // 高度 - 厘米
        let heightCM = ',高度' + value + '@@厘米@@'
        setHeightCM(heightCM)
      } else if (name == 'hzbrmc_height_mm') {
        // 高度 - 毫米
        let heightMM = ',高度' + value + '@@毫米@@'
        setHeightMM(heightMM)
      } else if (name == 'hzbrmc_area_face') {
        // 面域 - %
        let areaFace = ',面域' + value + '@@%@@'
        setAreaFace(areaFace)
      } else if (name == 'hzbrmc_area_per') {
        // 面积占比 - %
        let areaPer = ',面积占比' + value + '@@%@@'
        setAreaPer(areaPer)
      } else if (name == 'hzbrmc_area_m') {
        // 面积 - 平方米
        let areaM = ',面积' + value + '@@平方米@@'
        setAreaM(areaM)
      } else if (name == 'hzbrmc_area_cm') {
        // 面积 - 平方厘米
        let areaCM = ',面积' + value + '@@平方厘米@@'
        setAreaCM(areaCM)
      } else if (name == 'hzbrmc_area_mm') {
        // 面积 - 平方毫米
        let areaMM = ',面积' + value + '@@平方毫米@@'
        setAreaMM(areaMM)
      } else if (name == 'hzbrmc_heightdiff_cm') {
        // 高差 - 厘米
        let heightDiffCM = ',高差' + value + '@@厘米@@'
        setHeightDiffCM(heightDiffCM)
      } else if (name == 'hzbrmc_heightdiff_mm') {
        // 高差 - 毫米
        let heightDiffMM = ',高差' + value + '@@毫米@@'
        setHeightDiffMM(heightDiffMM)
      } else if (name == 'hzbrmc_spacing_cm') {
        // 间距 - 厘米
        let spacingCM = ',间距' + value + '@@厘米@@'
        setSpacingCM(spacingCM)
      } else if (name == 'hzbrmc_deformation_mm') {
        // 变形 - 毫米
        let deformationMM = ',变形' + value + '@@毫米@@'
        setDeformationMM(deformationMM)
      } else if (name == 'hzbrmc_num') {
        // 个数 - 个
        let num = ',个数' + value + '@@个@@'
        setNum(num)
      } else if (name == 'hzbrmc_range_cm') {
        // 距离 - 厘米
        let rangeCM = ',距离' + value + '@@厘米@@'
        setRangeCM(rangeCM)
      } else if (name == 'hzbrmc_range_mm') {
        // 距离 - 毫米
        let rangeMM = ',距离' + value + '@@毫米@@'
        setRangeMM(rangeMM)
      } else if (name == 'hzbrmc_depth_cm') {
        // 深度 - 厘米
        let depthCM = ',深度' + value + '@@厘米@@'
        setDepthCM(depthCM)
      } else if (name == 'hzbrmc_depth_mm') {
        // 深度 - 毫米
        let depthMM = ',深度' + value + '@@毫米@@'
        setDepthMM(depthMM)
      } else if (name == 'hzbrmc_volume_m') {
        // 体积 - 立方米
        let volumeM = ',体积' + value + '@@立方米@@'
        setVolumeM(volumeM)
      } else if (name == 'hzbrmc_volume_cm') {
        // 体积 - 立方厘米
        let volumeCM = ',体积' + value + '@@立方厘米@@'
        setVolumeCM(volumeCM)
      } else if (name == 'hzbrmc_disp_cm') {
        // 位移 - 厘米
        let dispCM = ',位移' + value + '@@厘米@@'
        setDispCM(dispCM)
      } else if (name == 'hzbrmc_disp_mm') {
        // 位移 - 毫米
        let dispMM = ',位移' + value + '@@毫米@@'
        setDispMM(dispMM)
      } else if (name == 'hzbrmc_angle_c') {
        // 角度 - 度
        let dispMM = ',角度' + value + '@@度@@'
        setDispMM(dispMM)
      } else if (name == 'hzbrmc_chu') {
        // 处
        let chu = ',' + value + '@@处@@'
        setChu(chu)
      } else if (name == 'hzbrmc_tiao') {
        // 条
        let tiao = ',' + value + '@@条@@'
        setTiao(tiao)
      } else if (name == 'hzbrmc_range_fenbu_m') {
        // 分布范围 - 米
        let rangeFenbuM = ',分布范围' + value + '@@米@@'
        setRangeFenbuM(rangeFenbuM)
      } else if (name == 'hzbrmc_range_length_m') {
        // 长度范围 - 米
        let rangeLengthM = ',长度范围' + value + '@@米@@'
        setRangeLengthM(rangeLengthM)
      } else if (name == 'hzbrmc_range_width_mm') {
        // 宽度范围 - 毫米
        let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
        setRangeWidthMM(rangeWidthMM)
      } else if (name == 'hzbrmc_range_spacing_cm') {
        // 间距范围 - 厘米
        let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
        setRangeSpacingCM(rangeSpacingCM)
      } else if (name == 'hzbrmc_lb_left_length_m') {
        // 左腹板长度 - 米
        let leftLengthM = ',左腹板长度' + value + '@@米@@'
        setLeftLengthM(leftLengthM)
      } else if (name == 'hzbrmc_lb_bottom_length_m') {
        // 底板长度 - 米
        let bottomLengthM = ',底板长度' + value + '@@米@@'
        setBottomLengthM(bottomLengthM)
      } else if (name == 'hzbrmc_lb_right_length_m') {
        // 右腹板长度 - 米
        let rightLengthM = ',右腹板长度' + value + '@@米@@'
        setRightLengthM(rightLengthM)
      } else if (name == 'hzbrmc_lb_left_width_mm') {
        // 左腹板宽度 - 毫米
        let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
        setLeftWidthMM(leftWidthMM)
      } else if (name == 'hzbrmc_lb_bottom_width_mm') {
        // 底板宽度 - 毫米
        let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
        setBottomWidthMM(bottomWidthMM)
      } else if (name == 'hzbrmc_lb_right_width_mm') {
        // 右腹板宽度 - 毫米
        let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
        setRightWidthMM(rightWidthMM)
      } else if (name == 'hzbrmc_slant_m') {
        // 倾斜量 - 米
        let slantM = ',倾斜量' + value + '@@米@@'
        setSlantM(slantM)
      }
      setDiseaseData(_data);
    };

    // 填入病害描述内容
    const writeDesText = () => {
      try {
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
        // console.log('remark:', diseaseData.remark);
        // console.log('route:::', route.params.thridData.checkinfoshort);
        
        // 在remark里面查找这两位内容，取出其位置下标
        if (diseaseData.remark !== undefined) {
          if (writeTxt == '' || writeTxt == undefined) {
            console.log('writeTxt没有内容~~~~~~');
            // 当还没有输入的内容时
            // 截取有变化的数据的二、三位内容(第一位为逗号)
            // let sliceWrite = writeTxt.slice(1, 3)
            // console.log('sliceWrite', sliceWrite);
            let allText = diseaseData.remark
            console.log('allText',allText);

            // 将remark里的中文逗号替换为英文逗号
            // ================================
            let num =allText.indexOf('，')
            // console.log('num',num);
            if (num !== -1) {
              let qian = allText.slice(0,allText.indexOf('，'))
              // console.log('qian',qian);
              let hou = allText.slice(allText.indexOf('，')+1)
              // console.log('hou',hou);
              let reset = qian + ',' + hou
              // console.log('reset',reset);
              diseaseData['description'] = reset
              handleFormChenge(reset, diseaseData.description)
            } else if (num == -1) {
              diseaseData['description'] = allText
              handleFormChenge(allText, diseaseData.description)
            }
            // ================================
            
            // let binghai = allText.slice(0,allText.indexOf(','))
            // console.log('binghai',binghai);
            // let numStart = allText.indexOf(sliceWrite)
            // console.log(numStart);
            // // 替换下标位置到其后第一个逗号之间的内容
            // let allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
            // console.log('allTextEnd', allTextEnd);
            // let douhao = ','
            // let numEnd = allTextEnd.indexOf(douhao)
            // console.log('numEnd', numEnd);
            // // 得出内容的末尾下标值
            // let lengthAll = numStart + numEnd
            // console.log('lengthAll', lengthAll);
            // // diseaseData['description'] = writeTxt
            // let aaaa = allText.substr(0, numStart-1)
            // console.log('aaaa: ', aaaa);
            // let bbbb = allText.substr(lengthAll)
            // console.log('bbbb', bbbb);
            // let cccc = aaaa.concat(bbbb)
            // console.log('cccc: ', cccc);
            // let ccca = '' + writeTxt
            // // let saveDescription = cccc.concat(ccca)
            // let saveDescription = binghai.concat(ccca)
            // setSaveDescription(saveDescription)
            // console.log('saveDescription: ', saveDescription);
            // diseaseData['description'] = allText
            // handleFormChenge(allText, diseaseData.description)
          } else if (writeTxt !== '' || writeTxt !== undefined) {
            // 当有输入的内容时
            console.log('=============================================================================');
            console.log('writeTxt有内容： ',writeTxt);
            let writeArr = []
            // 将输入的内容按逗号分隔开
            // 先找到逗号
            let num = 0
            let commaKey = writeTxt.indexOf(',') //从第1号位开始查找逗号
            console.log('逗号的位置：',commaKey);
            let writeArrNum = []
            // 查找逗号出现的位置，将其下标存入数组
            while (commaKey !== -1) {
              writeArrNum.push(commaKey)
              console.log('commaKey逗号出现的位置:',commaKey);
              num ++
              commaKey = writeTxt.indexOf(',', commaKey + 1)
            }
            console.log('逗号出现的次数:', num);
            console.log('截取节点数组：', writeArrNum);
            // 根据查找出的逗号下标，对输入的内容进行截取，转存进新的数组
            for (let i = 0; i < writeArrNum.length; i++) {
              writeArr.push(
                writeTxt.slice(writeArrNum[i], writeArrNum[i+1])
              )
            }
            console.log('截取后的数组：',writeArr);
            // 对writeArr数组的每一项进行替换
            for (let i = 0; i < writeArr.length; i++) {
              
                // 截取数组每一项的二、三位内容，与原有数据对比
                let sliceWrite = writeArr[i].slice(1, 3)
                console.log('sliceWrite',sliceWrite);
                if (diseaseData.description == undefined || diseaseData.description == '') {
                  var allText = diseaseData.remark
                } else if (diseaseData.description !== undefined || diseaseData.description !== '') {
                  var allText = diseaseData.description
                }
                
                console.log('allText', allText);
                // console.log('sliceWrite:', sliceWrite);
                let numStart = allText.indexOf(sliceWrite)
                console.log('numStart',numStart);
                // 替换下标位置到其后第一个逗号之间的内容
                var allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
                console.log('allTextEnd', allTextEnd);
                let numEnd = allTextEnd.indexOf(',')
                console.log('numEnd', numEnd);
                if (numEnd !== -1) {
                  console.log('numEnd的值1', numEnd);
                  // 得出内容的末尾下标值
                  let lengthAll = numStart + numEnd
                  // console.log('lengthAll', lengthAll);
                  let aaaa = allText.substr(0, numStart-1)
                  // console.log('aaaa: ', aaaa);
                  let bbbb = allText.substr(lengthAll)
                  // console.log('bbbb', bbbb);
                  let ccca = '' + writeArr[i].concat(bbbb)
                  let saveDescription = aaaa.concat(ccca)
                  setSaveDescription(saveDescription)
                  // console.log('saveDescription: ', saveDescription);
                  diseaseData['description'] = saveDescription
                  handleFormChenge(saveDescription, diseaseData.description)
                } else {
                  console.log('numEnd的值2', numEnd);
                  let aaaa = ''
                  // 到数组的最后一项时，不再有逗号，numEnd返回-1；改变替换内容的方式
                  if (numStart == -1) {
                    aaaa = allText
                  } else if (numStart !== -1) {
                    // aaaa = allText.substr(0, numStart-1)
                    aaaa = allText.substr(0,allText.indexOf(','))
                  }
                  console.log('aaaa: ', aaaa);
                  let bbbb = ''
                  let ccca = ''
                  for (let i =0; i < writeArr.length; i++) {
                    bbbb += writeArr[i]
                    
                  }
                  ccca = aaaa.concat(bbbb)
                    console.log('ccca', ccca);
                    let saveDescription = ccca
                    setSaveDescription(saveDescription)
                    // console.log('saveDescription: ', saveDescription);
                    diseaseData['description'] = saveDescription
                    // diseaseData['remark'] = saveDescription
                    handleFormChenge(saveDescription, diseaseData.description)
                }
                
            }
          }
        } else {
          let binghai = infoshort
          let allText = binghai.concat(writeTxt)
          // console.log('allText2',allText);
          diseaseData['description'] = allText
          handleFormChenge(allText, diseaseData.description)
          
        }
      } catch (err) {
        console.log(err);
      }
      
      
    }

    // 填入位置描述内容
    const writePositionText = () => {
      try {
        // console.log('diseaseData.area', diseaseData.area);
        console.log('diseaseData.lengthText',lengthText,widthText,heightText);
        if (diseaseData.area == undefined) {
          let writePositionTxt = ''
          setWritePositionTxt(writePositionTxt)
          diseaseData['writePositionTxt'] = writePositionTxt
          handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
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
          if (areaparam !== '') {
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
          //   var lengthNum = '距左侧' + lengthText + 'm,'
          //   setLengthNum(lengthNum)
          // }
          
          // 宽度描述
          // if (widthText == '0' || widthText == '') {
          //   var widthNum = ''
          //   setWidthNum(widthNum)
          // } else if (widthText !== '0') {
          //   var widthNum = '距左侧' + widthText + 'm'
          //   setWidthNum(widthNum)
          // }

          // 距顶描述
          // if (heightText == '0') {
          //   var heightNum = ''
          //   setHeightNum(heightNum)
          // } else if (heightText !== '0') {
          //   var heightNum = ',距顶部' + heightText + 'm'
          //   setHeightNum(heightNum)
          // }

          // 位置描述 = / + 病害区域 + 桥台 + 长度 + 宽度 + 距顶
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
      <View style={[tailwind.flexRow, tailwind.justifyBetween]}>
        <View style={{width:'30%'}}>
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
        <View style={{width:'40%'}}>
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
      {scale.length ? (
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
        <Text style={[{color:'#fff',fontSize:16}]}>确认</Text>
      </TouchableOpacity>
    </View>
    
    <ScaleInfo ref={scaleInfoRef} info={scaleInfo} />
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
  
    const infoList = hooks.useInfoComponents({diseaseData, baseData});
  
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
        let lengthText = (diseaseData.memberLength * (diseaseData.disLength / 100)).toFixed(1)
        setLengthText(lengthText)
        let widthText = (diseaseData.memberWidth * (diseaseData.disWidth / 100)).toFixed(1)
        setWidthText(widthText)
        let heightText = (diseaseData.memberHeight * (diseaseData.disHeight / 100)).toFixed(1)
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

        if (diseaseData.diseaseName == undefined || diseaseData.diseaseName == '') {
          diseaseData['diseaseName'] = route.params.thridData.checkinfoshort
          handleFormChenge(route.params.thridData.checkinfoshort, diseaseData.diseaseName)
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


        // console.log(diseaseData);
        if (diseaseData.remark == '' || diseaseData.remark == undefined) {
          let infoshort = route.params.thridData.checkinfoshort
          setInfoShort(infoshort)
        }
        if (diseaseData.description == '' || diseaseData.description == undefined) {
          diseaseData['description'] = diseaseData.remark
        }
      } catch {
      }
    }, [diseaseData]);
  
    React.useEffect(() => {
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
      if (areaparam == '') {
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

      if (name == 'scale') {
        // 标度
        let biaodu = ',标度' + value + '@@'
        setBiaodu(biaodu)
      } else if (name == 'hzbrmc_length_m') {
        //长度 - 米
        let lengthM = ',长度' + value + '@@米@@'
        setLengthM(lengthM)
      } else if (name == 'hzbrmc_length_cm') {
        // 长度 - 厘米
        let lengthCM = ',长度' + value + '@@厘米@@'
        setLengthCM(lengthCM)
      } else if (name == 'hzbrmc_length_mm') {
        // 长度 - 毫米
        let lengthMM = ',长度' + value + '@@毫米@@'
        setLengthMM(lengthMM)
      } else if (name == 'hzbrmc_width_m') {
        // 宽度 - 米
        let widthM = ',宽度' + value + '@@米@@'
        setWidthM(widthM)
      } else if (name == 'hzbrmc_width_cm') {
        // 宽度 - 厘米
        let widthCM = ',宽度' + value + '@@厘米@@'
        setWidthCM(widthCM)
      } else if (name == 'hzbrmc_width_mm') {
        // 宽度 - 毫米
        let widthMM = ',宽度' + value + '@@毫米@@'
        setWidthMM(widthMM)
      } else if (name == 'hzbrmc_height_m') {
        // 高度 - 米
        let heightM = ',高度' + value + '@@米@@'
        setHeightM(heightM)
      } else if (name == 'hzbrmc_height_cm') {
        // 高度 - 厘米
        let heightCM = ',高度' + value + '@@厘米@@'
        setHeightCM(heightCM)
      } else if (name == 'hzbrmc_height_mm') {
        // 高度 - 毫米
        let heightMM = ',高度' + value + '@@毫米@@'
        setHeightMM(heightMM)
      } else if (name == 'hzbrmc_area_face') {
        // 面域 - %
        let areaFace = ',面域' + value + '@@%@@'
        setAreaFace(areaFace)
      } else if (name == 'hzbrmc_area_per') {
        // 面积占比 - %
        let areaPer = ',面积占比' + value + '@@%@@'
        setAreaPer(areaPer)
      } else if (name == 'hzbrmc_area_m') {
        // 面积 - 平方米
        let areaM = ',面积' + value + '@@平方米@@'
        setAreaM(areaM)
      } else if (name == 'hzbrmc_area_cm') {
        // 面积 - 平方厘米
        let areaCM = ',面积' + value + '@@平方厘米@@'
        setAreaCM(areaCM)
      } else if (name == 'hzbrmc_area_mm') {
        // 面积 - 平方毫米
        let areaMM = ',面积' + value + '@@平方毫米@@'
        setAreaMM(areaMM)
      } else if (name == 'hzbrmc_heightdiff_cm') {
        // 高差 - 厘米
        let heightDiffCM = ',高差' + value + '@@厘米@@'
        setHeightDiffCM(heightDiffCM)
      } else if (name == 'hzbrmc_heightdiff_mm') {
        // 高差 - 毫米
        let heightDiffMM = ',高差' + value + '@@毫米@@'
        setHeightDiffMM(heightDiffMM)
      } else if (name == 'hzbrmc_spacing_cm') {
        // 间距 - 厘米
        let spacingCM = ',间距' + value + '@@厘米@@'
        setSpacingCM(spacingCM)
      } else if (name == 'hzbrmc_deformation_mm') {
        // 变形 - 毫米
        let deformationMM = ',变形' + value + '@@毫米@@'
        setDeformationMM(deformationMM)
      } else if (name == 'hzbrmc_num') {
        // 个数 - 个
        let num = ',个数' + value + '@@个@@'
        setNum(num)
      } else if (name == 'hzbrmc_range_cm') {
        // 距离 - 厘米
        let rangeCM = ',距离' + value + '@@厘米@@'
        setRangeCM(rangeCM)
      } else if (name == 'hzbrmc_range_mm') {
        // 距离 - 毫米
        let rangeMM = ',距离' + value + '@@毫米@@'
        setRangeMM(rangeMM)
      } else if (name == 'hzbrmc_depth_cm') {
        // 深度 - 厘米
        let depthCM = ',深度' + value + '@@厘米@@'
        setDepthCM(depthCM)
      } else if (name == 'hzbrmc_depth_mm') {
        // 深度 - 毫米
        let depthMM = ',深度' + value + '@@毫米@@'
        setDepthMM(depthMM)
      } else if (name == 'hzbrmc_volume_m') {
        // 体积 - 立方米
        let volumeM = ',体积' + value + '@@立方米@@'
        setVolumeM(volumeM)
      } else if (name == 'hzbrmc_volume_cm') {
        // 体积 - 立方厘米
        let volumeCM = ',体积' + value + '@@立方厘米@@'
        setVolumeCM(volumeCM)
      } else if (name == 'hzbrmc_disp_cm') {
        // 位移 - 厘米
        let dispCM = ',位移' + value + '@@厘米@@'
        setDispCM(dispCM)
      } else if (name == 'hzbrmc_disp_mm') {
        // 位移 - 毫米
        let dispMM = ',位移' + value + '@@毫米@@'
        setDispMM(dispMM)
      } else if (name == 'hzbrmc_angle_c') {
        // 角度 - 度
        let dispMM = ',角度' + value + '@@度@@'
        setDispMM(dispMM)
      } else if (name == 'hzbrmc_chu') {
        // 处
        let chu = ',' + value + '@@处@@'
        setChu(chu)
      } else if (name == 'hzbrmc_tiao') {
        // 条
        let tiao = ',' + value + '@@条@@'
        setTiao(tiao)
      } else if (name == 'hzbrmc_range_fenbu_m') {
        // 分布范围 - 米
        let rangeFenbuM = ',分布范围' + value + '@@米@@'
        setRangeFenbuM(rangeFenbuM)
      } else if (name == 'hzbrmc_range_length_m') {
        // 长度范围 - 米
        let rangeLengthM = ',长度范围' + value + '@@米@@'
        setRangeLengthM(rangeLengthM)
      } else if (name == 'hzbrmc_range_width_mm') {
        // 宽度范围 - 毫米
        let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
        setRangeWidthMM(rangeWidthMM)
      } else if (name == 'hzbrmc_range_spacing_cm') {
        // 间距范围 - 厘米
        let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
        setRangeSpacingCM(rangeSpacingCM)
      } else if (name == 'hzbrmc_lb_left_length_m') {
        // 左腹板长度 - 米
        let leftLengthM = ',左腹板长度' + value + '@@米@@'
        setLeftLengthM(leftLengthM)
      } else if (name == 'hzbrmc_lb_bottom_length_m') {
        // 底板长度 - 米
        let bottomLengthM = ',底板长度' + value + '@@米@@'
        setBottomLengthM(bottomLengthM)
      } else if (name == 'hzbrmc_lb_right_length_m') {
        // 右腹板长度 - 米
        let rightLengthM = ',右腹板长度' + value + '@@米@@'
        setRightLengthM(rightLengthM)
      } else if (name == 'hzbrmc_lb_left_width_mm') {
        // 左腹板宽度 - 毫米
        let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
        setLeftWidthMM(leftWidthMM)
      } else if (name == 'hzbrmc_lb_bottom_width_mm') {
        // 底板宽度 - 毫米
        let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
        setBottomWidthMM(bottomWidthMM)
      } else if (name == 'hzbrmc_lb_right_width_mm') {
        // 右腹板宽度 - 毫米
        let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
        setRightWidthMM(rightWidthMM)
      } else if (name == 'hzbrmc_slant_m') {
        // 倾斜量 - 米
        let slantM = ',倾斜量' + value + '@@米@@'
        setSlantM(slantM)
      }
      setDiseaseData(_data);
    };

    // 填入病害描述内容
    const writeDesText = () => {
      try {
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
        // console.log('remark:', diseaseData.remark);
        // console.log('route:::', route.params.thridData.checkinfoshort);
        
        // 在remark里面查找这两位内容，取出其位置下标
        if (diseaseData.remark !== undefined) {
          if (writeTxt == '' || writeTxt == undefined) {
            console.log('writeTxt没有内容~~~~~~');
            // 当还没有输入的内容时
            // 截取有变化的数据的二、三位内容(第一位为逗号)
            // let sliceWrite = writeTxt.slice(1, 3)
            // console.log('sliceWrite', sliceWrite);
            let allText = diseaseData.remark
            console.log('allText',allText);

            // 将remark里的中文逗号替换为英文逗号
            // ================================
            let num =allText.indexOf('，')
            // console.log('num',num);
            if (num !== -1) {
              let qian = allText.slice(0,allText.indexOf('，'))
              // console.log('qian',qian);
              let hou = allText.slice(allText.indexOf('，')+1)
              // console.log('hou',hou);
              let reset = qian + ',' + hou
              // console.log('reset',reset);
              diseaseData['description'] = reset
              handleFormChenge(reset, diseaseData.description)
            } else if (num == -1) {
              diseaseData['description'] = allText
              handleFormChenge(allText, diseaseData.description)
            }
            // ================================
            
            // let binghai = allText.slice(0,allText.indexOf(','))
            // console.log('binghai',binghai);
            // let numStart = allText.indexOf(sliceWrite)
            // console.log(numStart);
            // // 替换下标位置到其后第一个逗号之间的内容
            // let allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
            // console.log('allTextEnd', allTextEnd);
            // let douhao = ','
            // let numEnd = allTextEnd.indexOf(douhao)
            // console.log('numEnd', numEnd);
            // // 得出内容的末尾下标值
            // let lengthAll = numStart + numEnd
            // console.log('lengthAll', lengthAll);
            // // diseaseData['description'] = writeTxt
            // let aaaa = allText.substr(0, numStart-1)
            // console.log('aaaa: ', aaaa);
            // let bbbb = allText.substr(lengthAll)
            // console.log('bbbb', bbbb);
            // let cccc = aaaa.concat(bbbb)
            // console.log('cccc: ', cccc);
            // let ccca = '' + writeTxt
            // // let saveDescription = cccc.concat(ccca)
            // let saveDescription = binghai.concat(ccca)
            // setSaveDescription(saveDescription)
            // console.log('saveDescription: ', saveDescription);
            // diseaseData['description'] = allText
            // handleFormChenge(allText, diseaseData.description)
          } else if (writeTxt !== '' || writeTxt !== undefined) {
            // 当有输入的内容时
            console.log('=============================================================================');
            console.log('writeTxt有内容： ',writeTxt);
            let writeArr = []
            // 将输入的内容按逗号分隔开
            // 先找到逗号
            let num = 0
            let commaKey = writeTxt.indexOf(',') //从第1号位开始查找逗号
            console.log('逗号的位置：',commaKey);
            let writeArrNum = []
            // 查找逗号出现的位置，将其下标存入数组
            while (commaKey !== -1) {
              writeArrNum.push(commaKey)
              console.log('commaKey逗号出现的位置:',commaKey);
              num ++
              commaKey = writeTxt.indexOf(',', commaKey + 1)
            }
            console.log('逗号出现的次数:', num);
            console.log('截取节点数组：', writeArrNum);
            // 根据查找出的逗号下标，对输入的内容进行截取，转存进新的数组
            for (let i = 0; i < writeArrNum.length; i++) {
              writeArr.push(
                writeTxt.slice(writeArrNum[i], writeArrNum[i+1])
              )
            }
            console.log('截取后的数组：',writeArr);
            // 对writeArr数组的每一项进行替换
            for (let i = 0; i < writeArr.length; i++) {
              
                // 截取数组每一项的二、三位内容，与原有数据对比
                let sliceWrite = writeArr[i].slice(1, 3)
                console.log('sliceWrite',sliceWrite);
                if (diseaseData.description == undefined || diseaseData.description == '') {
                  var allText = diseaseData.remark
                } else if (diseaseData.description !== undefined || diseaseData.description !== '') {
                  var allText = diseaseData.description
                }
                
                console.log('allText', allText);
                // console.log('sliceWrite:', sliceWrite);
                let numStart = allText.indexOf(sliceWrite)
                console.log('numStart',numStart);
                // 替换下标位置到其后第一个逗号之间的内容
                var allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
                console.log('allTextEnd', allTextEnd);
                let numEnd = allTextEnd.indexOf(',')
                console.log('numEnd', numEnd);
                if (numEnd !== -1) {
                  console.log('numEnd的值1', numEnd);
                  // 得出内容的末尾下标值
                  let lengthAll = numStart + numEnd
                  // console.log('lengthAll', lengthAll);
                  let aaaa = allText.substr(0, numStart-1)
                  // console.log('aaaa: ', aaaa);
                  let bbbb = allText.substr(lengthAll)
                  // console.log('bbbb', bbbb);
                  let ccca = '' + writeArr[i].concat(bbbb)
                  let saveDescription = aaaa.concat(ccca)
                  setSaveDescription(saveDescription)
                  // console.log('saveDescription: ', saveDescription);
                  diseaseData['description'] = saveDescription
                  handleFormChenge(saveDescription, diseaseData.description)
                } else {
                  console.log('numEnd的值2', numEnd);
                  let aaaa = ''
                  // 到数组的最后一项时，不再有逗号，numEnd返回-1；改变替换内容的方式
                  if (numStart == -1) {
                    aaaa = allText
                  } else if (numStart !== -1) {
                    // aaaa = allText.substr(0, numStart-1)
                    aaaa = allText.substr(0,allText.indexOf(','))
                  }
                  console.log('aaaa: ', aaaa);
                  let bbbb = ''
                  let ccca = ''
                  for (let i =0; i < writeArr.length; i++) {
                    bbbb += writeArr[i]
                    
                  }
                  ccca = aaaa.concat(bbbb)
                    console.log('ccca', ccca);
                    let saveDescription = ccca
                    setSaveDescription(saveDescription)
                    // console.log('saveDescription: ', saveDescription);
                    diseaseData['description'] = saveDescription
                    // diseaseData['remark'] = saveDescription
                    handleFormChenge(saveDescription, diseaseData.description)
                }
                
            }
          }
        } else {
          let binghai = infoshort
          let allText = binghai.concat(writeTxt)
          // console.log('allText2',allText);
          diseaseData['description'] = allText
          handleFormChenge(allText, diseaseData.description)
          
        }
      } catch (err) {
        console.log(err);
      }
      
      
    }

    // 填入位置描述内容
    const writePositionText = () => {
      try {
        // console.log('diseaseData.area', diseaseData.area);
        console.log('diseaseData.lengthText',lengthText,widthText,heightText);
        if (diseaseData.area == undefined) {
          let writePositionTxt = ''
          setWritePositionTxt(writePositionTxt)
          diseaseData['writePositionTxt'] = writePositionTxt
          handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
        } else if (lengthText !== 0 || widthText !== 0 || heightText !== 0){
          console.log('有数据了');
          console.log('构件区域列表：：',areaparam);
          console.log('表单中的构件区域',diseaseData.area);
          console.log('构件类型',labelName);
          // if (labelName == 'at0000' || labelName == undefined && areaparam == '') {
          //   var areaName = ''
          //   diseaseData['area'] = areaName
          //   // handleFormChenge(areaName, diseaseData.area)
          // }
          if (areaparam !== '') {
            let areaArr = areaparam
            let inputArea = diseaseData.area
            console.log('inputArea',inputArea);
            for (let i = 0; i < areaArr.length; i++) {
              if (inputArea == areaArr[i].value) {
                console.log('此时选中的构件是：',areaArr[i].label);
                var areaName = areaArr[i].label
                console.log(areaName);
              }
            }
          }
          setAreaName(areaName)
          
          // 墩/台描述
          // 长度描述
          if (lengthText == '0') {
            var lengthNum = ''
            setLengthNum(lengthNum)
            // let pier = ''
            // setPier(pier)
          } else if (lengthText !== '0') {
            var lengthNum = '距左侧' + lengthText + 'm,'
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
          if (heightText == '0') {
            var heightNum = ''
            setHeightNum(heightNum)
          } else if (heightText !== '0') {
            var heightNum = ',距顶部' + heightText + 'm'
            setHeightNum(heightNum)
          }

          // 位置描述 = / + 病害区域 + 桥台 + 长度 + 宽度 + 距顶
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
      <View style={[tailwind.flexRow, tailwind.justifyBetween]}>
        <View style={{width:'30%'}}>
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
        <View style={{width:'40%'}}>
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
      {scale.length ? (
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
        <Text style={[{color:'#fff',fontSize:16}]}>确认</Text>
      </TouchableOpacity>
    </View>
    
    <ScaleInfo ref={scaleInfoRef} info={scaleInfo} />
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
  
    const infoList = hooks.useInfoComponents({diseaseData, baseData});
  
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
        let lengthText = (diseaseData.memberLength * (diseaseData.disLength / 100)).toFixed(1)
        setLengthText(lengthText)
        let widthText = (diseaseData.memberWidth * (diseaseData.disWidth / 100)).toFixed(1)
        setWidthText(widthText)
        let heightText = (diseaseData.memberHeight * (diseaseData.disHeight / 100)).toFixed(1)
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

        if (diseaseData.diseaseName == undefined || diseaseData.diseaseName == '') {
            diseaseData['diseaseName'] = route.params.thridData.checkinfoshort
            handleFormChenge(route.params.thridData.checkinfoshort, diseaseData.diseaseName)
        }

        if (diseaseData.area !== '' || diseaseData.area !== undefined) {
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


        // console.log(diseaseData);
        if (diseaseData.remark == '' || diseaseData.remark == undefined) {
          let infoshort = route.params.thridData.checkinfoshort
          setInfoShort(infoshort)
        }
        if (diseaseData.description == '' || diseaseData.description == undefined) {
          diseaseData['description'] = diseaseData.remark
        }
      } catch {
      }
    }, [diseaseData]);
  
    React.useEffect(() => {
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
      if (areaparam == '') {
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


      if (name == 'scale') {
        // 标度
        let biaodu = ',标度' + value + '@@'
        setBiaodu(biaodu)
      } else if (name == 'hzbrmc_length_m') {
        //长度 - 米
        let lengthM = ',长度' + value + '@@米@@'
        setLengthM(lengthM)
      } else if (name == 'hzbrmc_length_cm') {
        // 长度 - 厘米
        let lengthCM = ',长度' + value + '@@厘米@@'
        setLengthCM(lengthCM)
      } else if (name == 'hzbrmc_length_mm') {
        // 长度 - 毫米
        let lengthMM = ',长度' + value + '@@毫米@@'
        setLengthMM(lengthMM)
      } else if (name == 'hzbrmc_width_m') {
        // 宽度 - 米
        let widthM = ',宽度' + value + '@@米@@'
        setWidthM(widthM)
      } else if (name == 'hzbrmc_width_cm') {
        // 宽度 - 厘米
        let widthCM = ',宽度' + value + '@@厘米@@'
        setWidthCM(widthCM)
      } else if (name == 'hzbrmc_width_mm') {
        // 宽度 - 毫米
        let widthMM = ',宽度' + value + '@@毫米@@'
        setWidthMM(widthMM)
      } else if (name == 'hzbrmc_height_m') {
        // 高度 - 米
        let heightM = ',高度' + value + '@@米@@'
        setHeightM(heightM)
      } else if (name == 'hzbrmc_height_cm') {
        // 高度 - 厘米
        let heightCM = ',高度' + value + '@@厘米@@'
        setHeightCM(heightCM)
      } else if (name == 'hzbrmc_height_mm') {
        // 高度 - 毫米
        let heightMM = ',高度' + value + '@@毫米@@'
        setHeightMM(heightMM)
      } else if (name == 'hzbrmc_area_face') {
        // 面域 - %
        let areaFace = ',面域' + value + '@@%@@'
        setAreaFace(areaFace)
      } else if (name == 'hzbrmc_area_per') {
        // 面积占比 - %
        let areaPer = ',面积占比' + value + '@@%@@'
        setAreaPer(areaPer)
      } else if (name == 'hzbrmc_area_m') {
        // 面积 - 平方米
        let areaM = ',面积' + value + '@@平方米@@'
        setAreaM(areaM)
      } else if (name == 'hzbrmc_area_cm') {
        // 面积 - 平方厘米
        let areaCM = ',面积' + value + '@@平方厘米@@'
        setAreaCM(areaCM)
      } else if (name == 'hzbrmc_area_mm') {
        // 面积 - 平方毫米
        let areaMM = ',面积' + value + '@@平方毫米@@'
        setAreaMM(areaMM)
      } else if (name == 'hzbrmc_heightdiff_cm') {
        // 高差 - 厘米
        let heightDiffCM = ',高差' + value + '@@厘米@@'
        setHeightDiffCM(heightDiffCM)
      } else if (name == 'hzbrmc_heightdiff_mm') {
        // 高差 - 毫米
        let heightDiffMM = ',高差' + value + '@@毫米@@'
        setHeightDiffMM(heightDiffMM)
      } else if (name == 'hzbrmc_spacing_cm') {
        // 间距 - 厘米
        let spacingCM = ',间距' + value + '@@厘米@@'
        setSpacingCM(spacingCM)
      } else if (name == 'hzbrmc_deformation_mm') {
        // 变形 - 毫米
        let deformationMM = ',变形' + value + '@@毫米@@'
        setDeformationMM(deformationMM)
      } else if (name == 'hzbrmc_num') {
        // 个数 - 个
        let num = ',个数' + value + '@@个@@'
        setNum(num)
      } else if (name == 'hzbrmc_range_cm') {
        // 距离 - 厘米
        let rangeCM = ',距离' + value + '@@厘米@@'
        setRangeCM(rangeCM)
      } else if (name == 'hzbrmc_range_mm') {
        // 距离 - 毫米
        let rangeMM = ',距离' + value + '@@毫米@@'
        setRangeMM(rangeMM)
      } else if (name == 'hzbrmc_depth_cm') {
        // 深度 - 厘米
        let depthCM = ',深度' + value + '@@厘米@@'
        setDepthCM(depthCM)
      } else if (name == 'hzbrmc_depth_mm') {
        // 深度 - 毫米
        let depthMM = ',深度' + value + '@@毫米@@'
        setDepthMM(depthMM)
      } else if (name == 'hzbrmc_volume_m') {
        // 体积 - 立方米
        let volumeM = ',体积' + value + '@@立方米@@'
        setVolumeM(volumeM)
      } else if (name == 'hzbrmc_volume_cm') {
        // 体积 - 立方厘米
        let volumeCM = ',体积' + value + '@@立方厘米@@'
        setVolumeCM(volumeCM)
      } else if (name == 'hzbrmc_disp_cm') {
        // 位移 - 厘米
        let dispCM = ',位移' + value + '@@厘米@@'
        setDispCM(dispCM)
      } else if (name == 'hzbrmc_disp_mm') {
        // 位移 - 毫米
        let dispMM = ',位移' + value + '@@毫米@@'
        setDispMM(dispMM)
      } else if (name == 'hzbrmc_angle_c') {
        // 角度 - 度
        let dispMM = ',角度' + value + '@@度@@'
        setDispMM(dispMM)
      } else if (name == 'hzbrmc_chu') {
        // 处
        let chu = ',' + value + '@@处@@'
        setChu(chu)
      } else if (name == 'hzbrmc_tiao') {
        // 条
        let tiao = ',' + value + '@@条@@'
        setTiao(tiao)
      } else if (name == 'hzbrmc_range_fenbu_m') {
        // 分布范围 - 米
        let rangeFenbuM = ',分布范围' + value + '@@米@@'
        setRangeFenbuM(rangeFenbuM)
      } else if (name == 'hzbrmc_range_length_m') {
        // 长度范围 - 米
        let rangeLengthM = ',长度范围' + value + '@@米@@'
        setRangeLengthM(rangeLengthM)
      } else if (name == 'hzbrmc_range_width_mm') {
        // 宽度范围 - 毫米
        let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
        setRangeWidthMM(rangeWidthMM)
      } else if (name == 'hzbrmc_range_spacing_cm') {
        // 间距范围 - 厘米
        let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
        setRangeSpacingCM(rangeSpacingCM)
      } else if (name == 'hzbrmc_lb_left_length_m') {
        // 左腹板长度 - 米
        let leftLengthM = ',左腹板长度' + value + '@@米@@'
        setLeftLengthM(leftLengthM)
      } else if (name == 'hzbrmc_lb_bottom_length_m') {
        // 底板长度 - 米
        let bottomLengthM = ',底板长度' + value + '@@米@@'
        setBottomLengthM(bottomLengthM)
      } else if (name == 'hzbrmc_lb_right_length_m') {
        // 右腹板长度 - 米
        let rightLengthM = ',右腹板长度' + value + '@@米@@'
        setRightLengthM(rightLengthM)
      } else if (name == 'hzbrmc_lb_left_width_mm') {
        // 左腹板宽度 - 毫米
        let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
        setLeftWidthMM(leftWidthMM)
      } else if (name == 'hzbrmc_lb_bottom_width_mm') {
        // 底板宽度 - 毫米
        let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
        setBottomWidthMM(bottomWidthMM)
      } else if (name == 'hzbrmc_lb_right_width_mm') {
        // 右腹板宽度 - 毫米
        let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
        setRightWidthMM(rightWidthMM)
      } else if (name == 'hzbrmc_slant_m') {
        // 倾斜量 - 米
        let slantM = ',倾斜量' + value + '@@米@@'
        setSlantM(slantM)
      }
      setDiseaseData(_data);
    };

    // 填入病害描述内容
    const writeDesText = () => {
      try {
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
        // console.log('remark:', diseaseData.remark);
        // console.log('route:::', route.params.thridData.checkinfoshort);
        
        // 在remark里面查找这两位内容，取出其位置下标
        if (diseaseData.remark !== undefined) {
          if (writeTxt == '' || writeTxt == undefined) {
            console.log('writeTxt没有内容~~~~~~');
            // 当还没有输入的内容时
            // 截取有变化的数据的二、三位内容(第一位为逗号)
            // let sliceWrite = writeTxt.slice(1, 3)
            // console.log('sliceWrite', sliceWrite);
            let allText = diseaseData.remark
            console.log('allText',allText);

            // 将remark里的中文逗号替换为英文逗号
            // ================================
            let num =allText.indexOf('，')
            // console.log('num',num);
            if (num !== -1) {
              let qian = allText.slice(0,allText.indexOf('，'))
              // console.log('qian',qian);
              let hou = allText.slice(allText.indexOf('，')+1)
              // console.log('hou',hou);
              let reset = qian + ',' + hou
              // console.log('reset',reset);
              diseaseData['description'] = reset
              handleFormChenge(reset, diseaseData.description)
            } else if (num == -1) {
              diseaseData['description'] = allText
              handleFormChenge(allText, diseaseData.description)
            }
            // ================================
            
            // let binghai = allText.slice(0,allText.indexOf(','))
            // console.log('binghai',binghai);
            // let numStart = allText.indexOf(sliceWrite)
            // console.log(numStart);
            // // 替换下标位置到其后第一个逗号之间的内容
            // let allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
            // console.log('allTextEnd', allTextEnd);
            // let douhao = ','
            // let numEnd = allTextEnd.indexOf(douhao)
            // console.log('numEnd', numEnd);
            // // 得出内容的末尾下标值
            // let lengthAll = numStart + numEnd
            // console.log('lengthAll', lengthAll);
            // // diseaseData['description'] = writeTxt
            // let aaaa = allText.substr(0, numStart-1)
            // console.log('aaaa: ', aaaa);
            // let bbbb = allText.substr(lengthAll)
            // console.log('bbbb', bbbb);
            // let cccc = aaaa.concat(bbbb)
            // console.log('cccc: ', cccc);
            // let ccca = '' + writeTxt
            // // let saveDescription = cccc.concat(ccca)
            // let saveDescription = binghai.concat(ccca)
            // setSaveDescription(saveDescription)
            // console.log('saveDescription: ', saveDescription);
            // diseaseData['description'] = allText
            // handleFormChenge(allText, diseaseData.description)
          } else if (writeTxt !== '' || writeTxt !== undefined) {
            // 当有输入的内容时
            console.log('=============================================================================');
            console.log('writeTxt有内容： ',writeTxt);
            let writeArr = []
            // 将输入的内容按逗号分隔开
            // 先找到逗号
            let num = 0
            let commaKey = writeTxt.indexOf(',') //从第1号位开始查找逗号
            console.log('逗号的位置：',commaKey);
            let writeArrNum = []
            // 查找逗号出现的位置，将其下标存入数组
            while (commaKey !== -1) {
              writeArrNum.push(commaKey)
              console.log('commaKey逗号出现的位置:',commaKey);
              num ++
              commaKey = writeTxt.indexOf(',', commaKey + 1)
            }
            console.log('逗号出现的次数:', num);
            console.log('截取节点数组：', writeArrNum);
            // 根据查找出的逗号下标，对输入的内容进行截取，转存进新的数组
            for (let i = 0; i < writeArrNum.length; i++) {
              writeArr.push(
                writeTxt.slice(writeArrNum[i], writeArrNum[i+1])
              )
            }
            console.log('截取后的数组：',writeArr);
            // 对writeArr数组的每一项进行替换
            for (let i = 0; i < writeArr.length; i++) {
              
                // 截取数组每一项的二、三位内容，与原有数据对比
                let sliceWrite = writeArr[i].slice(1, 3)
                console.log('sliceWrite',sliceWrite);
                if (diseaseData.description == undefined || diseaseData.description == '') {
                  var allText = diseaseData.remark
                } else if (diseaseData.description !== undefined || diseaseData.description !== '') {
                  var allText = diseaseData.description
                }
                
                console.log('allText', allText);
                // console.log('sliceWrite:', sliceWrite);
                let numStart = allText.indexOf(sliceWrite)
                console.log('numStart',numStart);
                // 替换下标位置到其后第一个逗号之间的内容
                var allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
                console.log('allTextEnd', allTextEnd);
                let numEnd = allTextEnd.indexOf(',')
                console.log('numEnd', numEnd);
                if (numEnd !== -1) {
                  console.log('numEnd的值1', numEnd);
                  // 得出内容的末尾下标值
                  let lengthAll = numStart + numEnd
                  // console.log('lengthAll', lengthAll);
                  let aaaa = allText.substr(0, numStart-1)
                  // console.log('aaaa: ', aaaa);
                  let bbbb = allText.substr(lengthAll)
                  // console.log('bbbb', bbbb);
                  let ccca = '' + writeArr[i].concat(bbbb)
                  let saveDescription = aaaa.concat(ccca)
                  setSaveDescription(saveDescription)
                  // console.log('saveDescription: ', saveDescription);
                  diseaseData['description'] = saveDescription
                  handleFormChenge(saveDescription, diseaseData.description)
                } else {
                  console.log('numEnd的值2', numEnd);
                  let aaaa = ''
                  // 到数组的最后一项时，不再有逗号，numEnd返回-1；改变替换内容的方式
                  if (numStart == -1) {
                    aaaa = allText
                  } else if (numStart !== -1) {
                    // aaaa = allText.substr(0, numStart-1)
                    aaaa = allText.substr(0,allText.indexOf(','))
                  }
                  console.log('aaaa: ', aaaa);
                  let bbbb = ''
                  let ccca = ''
                  for (let i =0; i < writeArr.length; i++) {
                    bbbb += writeArr[i]
                    
                  }
                  ccca = aaaa.concat(bbbb)
                    console.log('ccca', ccca);
                    let saveDescription = ccca
                    setSaveDescription(saveDescription)
                    // console.log('saveDescription: ', saveDescription);
                    diseaseData['description'] = saveDescription
                    // diseaseData['remark'] = saveDescription
                    handleFormChenge(saveDescription, diseaseData.description)
                }
                
            }
          }
        } else {
          let binghai = infoshort
          let allText = binghai.concat(writeTxt)
          // console.log('allText2',allText);
          diseaseData['description'] = allText
          handleFormChenge(allText, diseaseData.description)
          
        }
      } catch (err) {
        console.log(err);
      }
      
      
    }

    // 填入位置描述内容
    // const writePositionText = () => {
    //   try {
    //     // console.log('diseaseData.area', diseaseData.area);
    //     console.log('diseaseData.lengthText',lengthText,widthText,heightText);
    //     if (diseaseData.area == undefined) {
    //       let writePositionTxt = ''
    //       setWritePositionTxt(writePositionTxt)
    //       diseaseData['writePositionTxt'] = writePositionTxt
    //       handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
    //     } else if (lengthText !== 0 || widthText !== 0 || heightText !== 0){
    //       console.log('有数据了');
    //       console.log('构件区域列表：：',areaparam);
    //       console.log('表单中的构件区域',diseaseData.area);
    //       console.log('构件类型',labelName);
    //       if (labelName == 'at0000' || labelName == undefined && areaparam == '') {
    //         var areaName = ''
    //         diseaseData['area'] = areaName
    //         // handleFormChenge(areaName, diseaseData.area)
    //       }
    //       if (areaparam !== '') {
    //         let areaArr = areaparam
    //         let inputArea = diseaseData.area
    //         console.log('inputArea',inputArea);
    //         for (let i = 0; i < areaArr.length; i++) {
    //           if (inputArea == areaArr[i].value) {
    //             console.log('此时选中的构件是：',areaArr[i].label);
    //             var areaName = areaArr[i].label
    //             console.log(areaName);
    //           }
    //         }
    //       }
    //       setAreaName(areaName)
          
    //       // 墩/台描述
    //       // 长度描述
    //       if (lengthText == '0') {
    //         var lengthNum = ''
    //         setLengthNum(lengthNum)
    //         // let pier = ''
    //         // setPier(pier)
    //       } else if (lengthText !== '0') {
    //         var lengthNum = lengthText + 'm,'
    //         setLengthNum(lengthNum)
    //       }
          
    //       // 宽度描述
    //       if (widthText == '0' || widthText == '') {
    //         var widthNum = ''
    //         setWidthNum(widthNum)
    //       } else if (widthText !== '0') {
    //         var widthNum = '距左侧' + widthText + 'm'
    //         setWidthNum(widthNum)
    //       }

    //       // 距顶描述
    //       // if (heightText == '0') {
    //       //   var heightNum = ''
    //       //   setHeightNum(heightNum)
    //       // } else if (heightText !== '0') {
    //       //   var heightNum = ',距顶部' + heightText + 'm'
    //       //   setHeightNum(heightNum)
    //       // }

    //       // 位置描述 = / + 病害区域 + 桥台 + 长度 + 宽度 + 距顶
    //       let writePositionTxt = areaName + pier + lengthNum + widthNum + '处'
    //       setWritePositionTxt(writePositionTxt)
    //       diseaseData['writePositionTxt'] = writePositionTxt
    //       setDiseaseData(diseaseData)
    //       handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
    //     }
    //   } catch (err) {
    //     console.log('出现错误1:',err);
    //   }
    // }

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
              var widthNum = ',距左侧' + widthText + 'm'
              setWidthNum(widthNum)
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
              // 位置描述 = / + 病害区域 + 桥台 + 长度
              let writePositionTxt = areaName + pier + lengthNum + widthNum + '处'
              setWritePositionTxt(writePositionTxt)
              diseaseData['writePositionTxt'] = writePositionTxt
              setDiseaseData(diseaseData)
              handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
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
              var lengthNum = lengthText + 'm'
              setLengthNum(lengthNum)
            }
            
            // 宽度描述
            if (widthText == '0' || widthText == '0.0') {
              var widthNum = ''
              setWidthNum(widthNum)
            } else if (widthText !== '0' || widthText !== '0.0') {
              var widthNum = ',距左侧' + widthText + 'm'
              setWidthNum(widthNum)
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
              // 位置描述 = / + 病害区域 + 桥台 + 长度
              let writePositionTxt = areaName + pier + lengthNum + widthNum + '处'
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
      <View style={[tailwind.flexRow, tailwind.justifyBetween]}>
        <View style={{width:'30%'}}>
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
        <View style={{width:'40%'}}>
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
      {scale.length ? (
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
      )}


      <View style={tailwind.mT2} />
      <View>
        <View style={[tailwind.flexRow]}>
          <LabelItem label="病害位置(米)" style={tailwind.w18} />
          <Text>长度{lengthText}米；宽度{widthText}米</Text>
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
        <Text style={[{color:'#fff',fontSize:16}]}>确认</Text>
      </TouchableOpacity>
    </View>
    
    <ScaleInfo ref={scaleInfoRef} info={scaleInfo} />
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
  
    const infoList = hooks.useInfoComponents({diseaseData, baseData});
  
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
        let lengthText = (diseaseData.memberLength * (diseaseData.disLength / 100)).toFixed(1)
        setLengthText(lengthText)
        let widthText = (diseaseData.memberWidth * (diseaseData.disWidth / 100)).toFixed(1)
        setWidthText(widthText)
        let heightText = (diseaseData.memberHeight * (diseaseData.disHeight / 100)).toFixed(1)
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

        if (diseaseData.diseaseName == undefined || diseaseData.diseaseName == '') {
          diseaseData['diseaseName'] = route.params.thridData.checkinfoshort
          handleFormChenge(route.params.thridData.checkinfoshort, diseaseData.diseaseName)
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


        // console.log(diseaseData);
        if (diseaseData.remark == '' || diseaseData.remark == undefined) {
          let infoshort = route.params.thridData.checkinfoshort
          setInfoShort(infoshort)
        }
        if (diseaseData.description == '' || diseaseData.description == undefined) {
          diseaseData['description'] = diseaseData.remark
        }
      } catch {
      }
    }, [diseaseData]);
  
    React.useEffect(() => {
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
      if (areaparam == '') {
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


      if (name == 'scale') {
        // 标度
        let biaodu = ',标度' + value + '@@'
        setBiaodu(biaodu)
      } else if (name == 'hzbrmc_length_m') {
        //长度 - 米
        let lengthM = ',长度' + value + '@@米@@'
        setLengthM(lengthM)
      } else if (name == 'hzbrmc_length_cm') {
        // 长度 - 厘米
        let lengthCM = ',长度' + value + '@@厘米@@'
        setLengthCM(lengthCM)
      } else if (name == 'hzbrmc_length_mm') {
        // 长度 - 毫米
        let lengthMM = ',长度' + value + '@@毫米@@'
        setLengthMM(lengthMM)
      } else if (name == 'hzbrmc_width_m') {
        // 宽度 - 米
        let widthM = ',宽度' + value + '@@米@@'
        setWidthM(widthM)
      } else if (name == 'hzbrmc_width_cm') {
        // 宽度 - 厘米
        let widthCM = ',宽度' + value + '@@厘米@@'
        setWidthCM(widthCM)
      } else if (name == 'hzbrmc_width_mm') {
        // 宽度 - 毫米
        let widthMM = ',宽度' + value + '@@毫米@@'
        setWidthMM(widthMM)
      } else if (name == 'hzbrmc_height_m') {
        // 高度 - 米
        let heightM = ',高度' + value + '@@米@@'
        setHeightM(heightM)
      } else if (name == 'hzbrmc_height_cm') {
        // 高度 - 厘米
        let heightCM = ',高度' + value + '@@厘米@@'
        setHeightCM(heightCM)
      } else if (name == 'hzbrmc_height_mm') {
        // 高度 - 毫米
        let heightMM = ',高度' + value + '@@毫米@@'
        setHeightMM(heightMM)
      } else if (name == 'hzbrmc_area_face') {
        // 面域 - %
        let areaFace = ',面域' + value + '@@%@@'
        setAreaFace(areaFace)
      } else if (name == 'hzbrmc_area_per') {
        // 面积占比 - %
        let areaPer = ',面积占比' + value + '@@%@@'
        setAreaPer(areaPer)
      } else if (name == 'hzbrmc_area_m') {
        // 面积 - 平方米
        let areaM = ',面积' + value + '@@平方米@@'
        setAreaM(areaM)
      } else if (name == 'hzbrmc_area_cm') {
        // 面积 - 平方厘米
        let areaCM = ',面积' + value + '@@平方厘米@@'
        setAreaCM(areaCM)
      } else if (name == 'hzbrmc_area_mm') {
        // 面积 - 平方毫米
        let areaMM = ',面积' + value + '@@平方毫米@@'
        setAreaMM(areaMM)
      } else if (name == 'hzbrmc_heightdiff_cm') {
        // 高差 - 厘米
        let heightDiffCM = ',高差' + value + '@@厘米@@'
        setHeightDiffCM(heightDiffCM)
      } else if (name == 'hzbrmc_heightdiff_mm') {
        // 高差 - 毫米
        let heightDiffMM = ',高差' + value + '@@毫米@@'
        setHeightDiffMM(heightDiffMM)
      } else if (name == 'hzbrmc_spacing_cm') {
        // 间距 - 厘米
        let spacingCM = ',间距' + value + '@@厘米@@'
        setSpacingCM(spacingCM)
      } else if (name == 'hzbrmc_deformation_mm') {
        // 变形 - 毫米
        let deformationMM = ',变形' + value + '@@毫米@@'
        setDeformationMM(deformationMM)
      } else if (name == 'hzbrmc_num') {
        // 个数 - 个
        let num = ',个数' + value + '@@个@@'
        setNum(num)
      } else if (name == 'hzbrmc_range_cm') {
        // 距离 - 厘米
        let rangeCM = ',距离' + value + '@@厘米@@'
        setRangeCM(rangeCM)
      } else if (name == 'hzbrmc_range_mm') {
        // 距离 - 毫米
        let rangeMM = ',距离' + value + '@@毫米@@'
        setRangeMM(rangeMM)
      } else if (name == 'hzbrmc_depth_cm') {
        // 深度 - 厘米
        let depthCM = ',深度' + value + '@@厘米@@'
        setDepthCM(depthCM)
      } else if (name == 'hzbrmc_depth_mm') {
        // 深度 - 毫米
        let depthMM = ',深度' + value + '@@毫米@@'
        setDepthMM(depthMM)
      } else if (name == 'hzbrmc_volume_m') {
        // 体积 - 立方米
        let volumeM = ',体积' + value + '@@立方米@@'
        setVolumeM(volumeM)
      } else if (name == 'hzbrmc_volume_cm') {
        // 体积 - 立方厘米
        let volumeCM = ',体积' + value + '@@立方厘米@@'
        setVolumeCM(volumeCM)
      } else if (name == 'hzbrmc_disp_cm') {
        // 位移 - 厘米
        let dispCM = ',位移' + value + '@@厘米@@'
        setDispCM(dispCM)
      } else if (name == 'hzbrmc_disp_mm') {
        // 位移 - 毫米
        let dispMM = ',位移' + value + '@@毫米@@'
        setDispMM(dispMM)
      } else if (name == 'hzbrmc_angle_c') {
        // 角度 - 度
        let dispMM = ',角度' + value + '@@度@@'
        setDispMM(dispMM)
      } else if (name == 'hzbrmc_chu') {
        // 处
        let chu = ',' + value + '@@处@@'
        setChu(chu)
      } else if (name == 'hzbrmc_tiao') {
        // 条
        let tiao = ',' + value + '@@条@@'
        setTiao(tiao)
      } else if (name == 'hzbrmc_range_fenbu_m') {
        // 分布范围 - 米
        let rangeFenbuM = ',分布范围' + value + '@@米@@'
        setRangeFenbuM(rangeFenbuM)
      } else if (name == 'hzbrmc_range_length_m') {
        // 长度范围 - 米
        let rangeLengthM = ',长度范围' + value + '@@米@@'
        setRangeLengthM(rangeLengthM)
      } else if (name == 'hzbrmc_range_width_mm') {
        // 宽度范围 - 毫米
        let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
        setRangeWidthMM(rangeWidthMM)
      } else if (name == 'hzbrmc_range_spacing_cm') {
        // 间距范围 - 厘米
        let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
        setRangeSpacingCM(rangeSpacingCM)
      } else if (name == 'hzbrmc_lb_left_length_m') {
        // 左腹板长度 - 米
        let leftLengthM = ',左腹板长度' + value + '@@米@@'
        setLeftLengthM(leftLengthM)
      } else if (name == 'hzbrmc_lb_bottom_length_m') {
        // 底板长度 - 米
        let bottomLengthM = ',底板长度' + value + '@@米@@'
        setBottomLengthM(bottomLengthM)
      } else if (name == 'hzbrmc_lb_right_length_m') {
        // 右腹板长度 - 米
        let rightLengthM = ',右腹板长度' + value + '@@米@@'
        setRightLengthM(rightLengthM)
      } else if (name == 'hzbrmc_lb_left_width_mm') {
        // 左腹板宽度 - 毫米
        let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
        setLeftWidthMM(leftWidthMM)
      } else if (name == 'hzbrmc_lb_bottom_width_mm') {
        // 底板宽度 - 毫米
        let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
        setBottomWidthMM(bottomWidthMM)
      } else if (name == 'hzbrmc_lb_right_width_mm') {
        // 右腹板宽度 - 毫米
        let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
        setRightWidthMM(rightWidthMM)
      } else if (name == 'hzbrmc_slant_m') {
        // 倾斜量 - 米
        let slantM = ',倾斜量' + value + '@@米@@'
        setSlantM(slantM)
      }
      setDiseaseData(_data);
    };

    // 填入病害描述内容
    const writeDesText = () => {
      try {
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
        // console.log('remark:', diseaseData.remark);
        // console.log('route:::', route.params.thridData.checkinfoshort);
        
        // 在remark里面查找这两位内容，取出其位置下标
        if (diseaseData.remark !== undefined) {
          if (writeTxt == '' || writeTxt == undefined) {
            console.log('writeTxt没有内容~~~~~~');
            // 当还没有输入的内容时
            // 截取有变化的数据的二、三位内容(第一位为逗号)
            // let sliceWrite = writeTxt.slice(1, 3)
            // console.log('sliceWrite', sliceWrite);
            let allText = diseaseData.remark
            console.log('allText',allText);

            // 将remark里的中文逗号替换为英文逗号
            // ================================
            let num =allText.indexOf('，')
            // console.log('num',num);
            if (num !== -1) {
              let qian = allText.slice(0,allText.indexOf('，'))
              // console.log('qian',qian);
              let hou = allText.slice(allText.indexOf('，')+1)
              // console.log('hou',hou);
              let reset = qian + ',' + hou
              // console.log('reset',reset);
              diseaseData['description'] = reset
              handleFormChenge(reset, diseaseData.description)
            } else if (num == -1) {
              diseaseData['description'] = allText
              handleFormChenge(allText, diseaseData.description)
            }
            // ================================
            
            // let binghai = allText.slice(0,allText.indexOf(','))
            // console.log('binghai',binghai);
            // let numStart = allText.indexOf(sliceWrite)
            // console.log(numStart);
            // // 替换下标位置到其后第一个逗号之间的内容
            // let allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
            // console.log('allTextEnd', allTextEnd);
            // let douhao = ','
            // let numEnd = allTextEnd.indexOf(douhao)
            // console.log('numEnd', numEnd);
            // // 得出内容的末尾下标值
            // let lengthAll = numStart + numEnd
            // console.log('lengthAll', lengthAll);
            // // diseaseData['description'] = writeTxt
            // let aaaa = allText.substr(0, numStart-1)
            // console.log('aaaa: ', aaaa);
            // let bbbb = allText.substr(lengthAll)
            // console.log('bbbb', bbbb);
            // let cccc = aaaa.concat(bbbb)
            // console.log('cccc: ', cccc);
            // let ccca = '' + writeTxt
            // // let saveDescription = cccc.concat(ccca)
            // let saveDescription = binghai.concat(ccca)
            // setSaveDescription(saveDescription)
            // console.log('saveDescription: ', saveDescription);
            // diseaseData['description'] = allText
            // handleFormChenge(allText, diseaseData.description)
          } else if (writeTxt !== '' || writeTxt !== undefined) {
            // 当有输入的内容时
            console.log('=============================================================================');
            console.log('writeTxt有内容： ',writeTxt);
            let writeArr = []
            // 将输入的内容按逗号分隔开
            // 先找到逗号
            let num = 0
            let commaKey = writeTxt.indexOf(',') //从第1号位开始查找逗号
            console.log('逗号的位置：',commaKey);
            let writeArrNum = []
            // 查找逗号出现的位置，将其下标存入数组
            while (commaKey !== -1) {
              writeArrNum.push(commaKey)
              console.log('commaKey逗号出现的位置:',commaKey);
              num ++
              commaKey = writeTxt.indexOf(',', commaKey + 1)
            }
            console.log('逗号出现的次数:', num);
            console.log('截取节点数组：', writeArrNum);
            // 根据查找出的逗号下标，对输入的内容进行截取，转存进新的数组
            for (let i = 0; i < writeArrNum.length; i++) {
              writeArr.push(
                writeTxt.slice(writeArrNum[i], writeArrNum[i+1])
              )
            }
            console.log('截取后的数组：',writeArr);
            // 对writeArr数组的每一项进行替换
            for (let i = 0; i < writeArr.length; i++) {
              
                // 截取数组每一项的二、三位内容，与原有数据对比
                let sliceWrite = writeArr[i].slice(1, 3)
                console.log('sliceWrite',sliceWrite);
                if (diseaseData.description == undefined || diseaseData.description == '') {
                  var allText = diseaseData.remark
                } else if (diseaseData.description !== undefined || diseaseData.description !== '') {
                  var allText = diseaseData.description
                }
                
                console.log('allText', allText);
                // console.log('sliceWrite:', sliceWrite);
                let numStart = allText.indexOf(sliceWrite)
                console.log('numStart',numStart);
                // 替换下标位置到其后第一个逗号之间的内容
                var allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
                console.log('allTextEnd', allTextEnd);
                let numEnd = allTextEnd.indexOf(',')
                console.log('numEnd', numEnd);
                if (numEnd !== -1) {
                  console.log('numEnd的值1', numEnd);
                  // 得出内容的末尾下标值
                  let lengthAll = numStart + numEnd
                  // console.log('lengthAll', lengthAll);
                  let aaaa = allText.substr(0, numStart-1)
                  // console.log('aaaa: ', aaaa);
                  let bbbb = allText.substr(lengthAll)
                  // console.log('bbbb', bbbb);
                  let ccca = '' + writeArr[i].concat(bbbb)
                  let saveDescription = aaaa.concat(ccca)
                  setSaveDescription(saveDescription)
                  // console.log('saveDescription: ', saveDescription);
                  diseaseData['description'] = saveDescription
                  handleFormChenge(saveDescription, diseaseData.description)
                } else {
                  console.log('numEnd的值2', numEnd);
                  let aaaa = ''
                  // 到数组的最后一项时，不再有逗号，numEnd返回-1；改变替换内容的方式
                  if (numStart == -1) {
                    aaaa = allText
                  } else if (numStart !== -1) {
                    // aaaa = allText.substr(0, numStart-1)
                    aaaa = allText.substr(0,allText.indexOf(','))
                  }
                  console.log('aaaa: ', aaaa);
                  let bbbb = ''
                  let ccca = ''
                  for (let i =0; i < writeArr.length; i++) {
                    bbbb += writeArr[i]
                    
                  }
                  ccca = aaaa.concat(bbbb)
                    console.log('ccca', ccca);
                    let saveDescription = ccca
                    setSaveDescription(saveDescription)
                    // console.log('saveDescription: ', saveDescription);
                    diseaseData['description'] = saveDescription
                    // diseaseData['remark'] = saveDescription
                    handleFormChenge(saveDescription, diseaseData.description)
                }
                
            }
          }
        } else {
          let binghai = infoshort
          let allText = binghai.concat(writeTxt)
          // console.log('allText2',allText);
          diseaseData['description'] = allText
          handleFormChenge(allText, diseaseData.description)
          
        }
      } catch (err) {
        console.log(err);
      }
      
      
    }

    // 填入位置描述内容
    const writePositionText = () => {
      try {
        // console.log('diseaseData.area', diseaseData.area);
        console.log('diseaseData.lengthText',lengthText,widthText,heightText);
        if (diseaseData.area == undefined) {
          let writePositionTxt = ''
          setWritePositionTxt(writePositionTxt)
          diseaseData['writePositionTxt'] = writePositionTxt
          handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
        } else if (lengthText !== 0 || widthText !== 0 || heightText !== 0){
          console.log('有数据了');
          console.log('构件区域列表：：',areaparam);
          console.log('表单中的构件区域',diseaseData.area);
          console.log('构件类型',labelName);
          if (labelName == 'at0000' || labelName == undefined && areaparam == '') {
            var areaName = ''
            diseaseData['area'] = areaName
            // handleFormChenge(areaName, diseaseData.area)
          }
          if (areaparam !== '') {
            let areaArr = areaparam
            let inputArea = diseaseData.area
            console.log('inputArea',inputArea);
            for (let i = 0; i < areaArr.length; i++) {
              if (inputArea == areaArr[i].value) {
                console.log('此时选中的构件是：',areaArr[i].label);
                var areaName = areaArr[i].label
                console.log(areaName);
              }
            }
          }
          setAreaName(areaName)
          
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
          if (widthText == '0' || widthText == '') {
            var widthNum = ''
            setWidthNum(widthNum)
          } else if (widthText !== '0') {
            var widthNum = '距左侧' + widthText + 'm'
            setWidthNum(widthNum)
          }

          // 距顶描述
          if (heightText == '0') {
            var heightNum = ''
            setHeightNum(heightNum)
          } else if (heightText !== '0') {
            var heightNum = ',距顶部' + heightText + 'm'
            setHeightNum(heightNum)
          }

          // 位置描述 = / + 病害区域 + 桥台 + 长度 + 宽度 + 距顶
          let writePositionTxt = areaName + widthNum + heightNum + '处'
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
      <View style={[tailwind.flexRow, tailwind.justifyBetween]}>
        <View style={{width:'30%'}}>
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
        <View style={{width:'40%'}}>
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
      {scale.length ? (
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
      )}


      <View style={tailwind.mT2} />
      <View>
        <View style={[tailwind.flexRow]}>
          <LabelItem label="病害位置(米)" style={tailwind.w18} />
          <Text>距左侧边缘{widthText}米; 距顶部边缘{heightText}米</Text>
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
        <Text style={[{color:'#fff',fontSize:16}]}>确认</Text>
      </TouchableOpacity>
    </View>
    
    <ScaleInfo ref={scaleInfoRef} info={scaleInfo} />
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
  
    const infoList = hooks.useInfoComponents({diseaseData, baseData});
  
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
        let lengthText = (diseaseData.memberLength * (diseaseData.disLength / 100)).toFixed(1)
        setLengthText(lengthText)
        let widthText = (diseaseData.memberWidth * (diseaseData.disWidth / 100)).toFixed(1)
        setWidthText(widthText)
        let heightText = (diseaseData.memberHeight * (diseaseData.disHeight / 100)).toFixed(1)
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

        if (diseaseData.diseaseName == undefined || diseaseData.diseaseName == '') {
          diseaseData['diseaseName'] = route.params.thridData.checkinfoshort
          handleFormChenge(route.params.thridData.checkinfoshort, diseaseData.diseaseName)
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


        // console.log(diseaseData);
        if (diseaseData.remark == '' || diseaseData.remark == undefined) {
          let infoshort = route.params.thridData.checkinfoshort
          setInfoShort(infoshort)
        }
        if (diseaseData.description == '' || diseaseData.description == undefined) {
          diseaseData['description'] = diseaseData.remark
        }
      } catch {
      }
    }, [diseaseData]);
  
    React.useEffect(() => {
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
      if (areaparam == '') {
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


      if (name == 'scale') {
        // 标度
        let biaodu = ',标度' + value + '@@'
        setBiaodu(biaodu)
      } else if (name == 'hzbrmc_length_m') {
        //长度 - 米
        let lengthM = ',长度' + value + '@@米@@'
        setLengthM(lengthM)
      } else if (name == 'hzbrmc_length_cm') {
        // 长度 - 厘米
        let lengthCM = ',长度' + value + '@@厘米@@'
        setLengthCM(lengthCM)
      } else if (name == 'hzbrmc_length_mm') {
        // 长度 - 毫米
        let lengthMM = ',长度' + value + '@@毫米@@'
        setLengthMM(lengthMM)
      } else if (name == 'hzbrmc_width_m') {
        // 宽度 - 米
        let widthM = ',宽度' + value + '@@米@@'
        setWidthM(widthM)
      } else if (name == 'hzbrmc_width_cm') {
        // 宽度 - 厘米
        let widthCM = ',宽度' + value + '@@厘米@@'
        setWidthCM(widthCM)
      } else if (name == 'hzbrmc_width_mm') {
        // 宽度 - 毫米
        let widthMM = ',宽度' + value + '@@毫米@@'
        setWidthMM(widthMM)
      } else if (name == 'hzbrmc_height_m') {
        // 高度 - 米
        let heightM = ',高度' + value + '@@米@@'
        setHeightM(heightM)
      } else if (name == 'hzbrmc_height_cm') {
        // 高度 - 厘米
        let heightCM = ',高度' + value + '@@厘米@@'
        setHeightCM(heightCM)
      } else if (name == 'hzbrmc_height_mm') {
        // 高度 - 毫米
        let heightMM = ',高度' + value + '@@毫米@@'
        setHeightMM(heightMM)
      } else if (name == 'hzbrmc_area_face') {
        // 面域 - %
        let areaFace = ',面域' + value + '@@%@@'
        setAreaFace(areaFace)
      } else if (name == 'hzbrmc_area_per') {
        // 面积占比 - %
        let areaPer = ',面积占比' + value + '@@%@@'
        setAreaPer(areaPer)
      } else if (name == 'hzbrmc_area_m') {
        // 面积 - 平方米
        let areaM = ',面积' + value + '@@平方米@@'
        setAreaM(areaM)
      } else if (name == 'hzbrmc_area_cm') {
        // 面积 - 平方厘米
        let areaCM = ',面积' + value + '@@平方厘米@@'
        setAreaCM(areaCM)
      } else if (name == 'hzbrmc_area_mm') {
        // 面积 - 平方毫米
        let areaMM = ',面积' + value + '@@平方毫米@@'
        setAreaMM(areaMM)
      } else if (name == 'hzbrmc_heightdiff_cm') {
        // 高差 - 厘米
        let heightDiffCM = ',高差' + value + '@@厘米@@'
        setHeightDiffCM(heightDiffCM)
      } else if (name == 'hzbrmc_heightdiff_mm') {
        // 高差 - 毫米
        let heightDiffMM = ',高差' + value + '@@毫米@@'
        setHeightDiffMM(heightDiffMM)
      } else if (name == 'hzbrmc_spacing_cm') {
        // 间距 - 厘米
        let spacingCM = ',间距' + value + '@@厘米@@'
        setSpacingCM(spacingCM)
      } else if (name == 'hzbrmc_deformation_mm') {
        // 变形 - 毫米
        let deformationMM = ',变形' + value + '@@毫米@@'
        setDeformationMM(deformationMM)
      } else if (name == 'hzbrmc_num') {
        // 个数 - 个
        let num = ',个数' + value + '@@个@@'
        setNum(num)
      } else if (name == 'hzbrmc_range_cm') {
        // 距离 - 厘米
        let rangeCM = ',距离' + value + '@@厘米@@'
        setRangeCM(rangeCM)
      } else if (name == 'hzbrmc_range_mm') {
        // 距离 - 毫米
        let rangeMM = ',距离' + value + '@@毫米@@'
        setRangeMM(rangeMM)
      } else if (name == 'hzbrmc_depth_cm') {
        // 深度 - 厘米
        let depthCM = ',深度' + value + '@@厘米@@'
        setDepthCM(depthCM)
      } else if (name == 'hzbrmc_depth_mm') {
        // 深度 - 毫米
        let depthMM = ',深度' + value + '@@毫米@@'
        setDepthMM(depthMM)
      } else if (name == 'hzbrmc_volume_m') {
        // 体积 - 立方米
        let volumeM = ',体积' + value + '@@立方米@@'
        setVolumeM(volumeM)
      } else if (name == 'hzbrmc_volume_cm') {
        // 体积 - 立方厘米
        let volumeCM = ',体积' + value + '@@立方厘米@@'
        setVolumeCM(volumeCM)
      } else if (name == 'hzbrmc_disp_cm') {
        // 位移 - 厘米
        let dispCM = ',位移' + value + '@@厘米@@'
        setDispCM(dispCM)
      } else if (name == 'hzbrmc_disp_mm') {
        // 位移 - 毫米
        let dispMM = ',位移' + value + '@@毫米@@'
        setDispMM(dispMM)
      } else if (name == 'hzbrmc_angle_c') {
        // 角度 - 度
        let dispMM = ',角度' + value + '@@度@@'
        setDispMM(dispMM)
      } else if (name == 'hzbrmc_chu') {
        // 处
        let chu = ',' + value + '@@处@@'
        setChu(chu)
      } else if (name == 'hzbrmc_tiao') {
        // 条
        let tiao = ',' + value + '@@条@@'
        setTiao(tiao)
      } else if (name == 'hzbrmc_range_fenbu_m') {
        // 分布范围 - 米
        let rangeFenbuM = ',分布范围' + value + '@@米@@'
        setRangeFenbuM(rangeFenbuM)
      } else if (name == 'hzbrmc_range_length_m') {
        // 长度范围 - 米
        let rangeLengthM = ',长度范围' + value + '@@米@@'
        setRangeLengthM(rangeLengthM)
      } else if (name == 'hzbrmc_range_width_mm') {
        // 宽度范围 - 毫米
        let rangeWidthMM = ',宽度范围'+ value + '@@毫米@@'
        setRangeWidthMM(rangeWidthMM)
      } else if (name == 'hzbrmc_range_spacing_cm') {
        // 间距范围 - 厘米
        let rangeSpacingCM = ',间距范围' + value + '@@厘米@@'
        setRangeSpacingCM(rangeSpacingCM)
      } else if (name == 'hzbrmc_lb_left_length_m') {
        // 左腹板长度 - 米
        let leftLengthM = ',左腹板长度' + value + '@@米@@'
        setLeftLengthM(leftLengthM)
      } else if (name == 'hzbrmc_lb_bottom_length_m') {
        // 底板长度 - 米
        let bottomLengthM = ',底板长度' + value + '@@米@@'
        setBottomLengthM(bottomLengthM)
      } else if (name == 'hzbrmc_lb_right_length_m') {
        // 右腹板长度 - 米
        let rightLengthM = ',右腹板长度' + value + '@@米@@'
        setRightLengthM(rightLengthM)
      } else if (name == 'hzbrmc_lb_left_width_mm') {
        // 左腹板宽度 - 毫米
        let leftWidthMM = ',左腹板宽度' + value + '@@毫米@@'
        setLeftWidthMM(leftWidthMM)
      } else if (name == 'hzbrmc_lb_bottom_width_mm') {
        // 底板宽度 - 毫米
        let bottomWidthMM = ',底板宽度' + value + '@@毫米@@'
        setBottomWidthMM(bottomWidthMM)
      } else if (name == 'hzbrmc_lb_right_width_mm') {
        // 右腹板宽度 - 毫米
        let rightWidthMM = ',右腹板宽度' + value + '@@毫米@@'
        setRightWidthMM(rightWidthMM)
      } else if (name == 'hzbrmc_slant_m') {
        // 倾斜量 - 米
        let slantM = ',倾斜量' + value + '@@米@@'
        setSlantM(slantM)
      }
      setDiseaseData(_data);
    };

    // 填入病害描述内容
    const writeDesText = () => {
      try {
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
        // console.log('remark:', diseaseData.remark);
        // console.log('route:::', route.params.thridData.checkinfoshort);
        
        // 在remark里面查找这两位内容，取出其位置下标
        if (diseaseData.remark !== undefined) {
          if (writeTxt == '' || writeTxt == undefined) {
            console.log('writeTxt没有内容~~~~~~');
            // 当还没有输入的内容时
            // 截取有变化的数据的二、三位内容(第一位为逗号)
            // let sliceWrite = writeTxt.slice(1, 3)
            // console.log('sliceWrite', sliceWrite);
            let allText = diseaseData.remark
            console.log('allText',allText);

            // 将remark里的中文逗号替换为英文逗号
            // ================================
            let num =allText.indexOf('，')
            // console.log('num',num);
            if (num !== -1) {
              let qian = allText.slice(0,allText.indexOf('，'))
              // console.log('qian',qian);
              let hou = allText.slice(allText.indexOf('，')+1)
              // console.log('hou',hou);
              let reset = qian + ',' + hou
              // console.log('reset',reset);
              diseaseData['description'] = reset
              handleFormChenge(reset, diseaseData.description)
            } else if (num == -1) {
              diseaseData['description'] = allText
              handleFormChenge(allText, diseaseData.description)
            }
            // ================================
            
            // let binghai = allText.slice(0,allText.indexOf(','))
            // console.log('binghai',binghai);
            // let numStart = allText.indexOf(sliceWrite)
            // console.log(numStart);
            // // 替换下标位置到其后第一个逗号之间的内容
            // let allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
            // console.log('allTextEnd', allTextEnd);
            // let douhao = ','
            // let numEnd = allTextEnd.indexOf(douhao)
            // console.log('numEnd', numEnd);
            // // 得出内容的末尾下标值
            // let lengthAll = numStart + numEnd
            // console.log('lengthAll', lengthAll);
            // // diseaseData['description'] = writeTxt
            // let aaaa = allText.substr(0, numStart-1)
            // console.log('aaaa: ', aaaa);
            // let bbbb = allText.substr(lengthAll)
            // console.log('bbbb', bbbb);
            // let cccc = aaaa.concat(bbbb)
            // console.log('cccc: ', cccc);
            // let ccca = '' + writeTxt
            // // let saveDescription = cccc.concat(ccca)
            // let saveDescription = binghai.concat(ccca)
            // setSaveDescription(saveDescription)
            // console.log('saveDescription: ', saveDescription);
            // diseaseData['description'] = allText
            // handleFormChenge(allText, diseaseData.description)
          } else if (writeTxt !== '' || writeTxt !== undefined) {
            // 当有输入的内容时
            console.log('=============================================================================');
            console.log('writeTxt有内容： ',writeTxt);
            let writeArr = []
            // 将输入的内容按逗号分隔开
            // 先找到逗号
            let num = 0
            let commaKey = writeTxt.indexOf(',') //从第1号位开始查找逗号
            console.log('逗号的位置：',commaKey);
            let writeArrNum = []
            // 查找逗号出现的位置，将其下标存入数组
            while (commaKey !== -1) {
              writeArrNum.push(commaKey)
              console.log('commaKey逗号出现的位置:',commaKey);
              num ++
              commaKey = writeTxt.indexOf(',', commaKey + 1)
            }
            console.log('逗号出现的次数:', num);
            console.log('截取节点数组：', writeArrNum);
            // 根据查找出的逗号下标，对输入的内容进行截取，转存进新的数组
            for (let i = 0; i < writeArrNum.length; i++) {
              writeArr.push(
                writeTxt.slice(writeArrNum[i], writeArrNum[i+1])
              )
            }
            console.log('截取后的数组：',writeArr);
            // 对writeArr数组的每一项进行替换
            for (let i = 0; i < writeArr.length; i++) {
              
                // 截取数组每一项的二、三位内容，与原有数据对比
                let sliceWrite = writeArr[i].slice(1, 3)
                console.log('sliceWrite',sliceWrite);
                if (diseaseData.description == undefined || diseaseData.description == '') {
                  var allText = diseaseData.remark
                } else if (diseaseData.description !== undefined || diseaseData.description !== '') {
                  var allText = diseaseData.description
                }
                
                console.log('allText', allText);
                // console.log('sliceWrite:', sliceWrite);
                let numStart = allText.indexOf(sliceWrite)
                console.log('numStart',numStart);
                // 替换下标位置到其后第一个逗号之间的内容
                var allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
                console.log('allTextEnd', allTextEnd);
                let numEnd = allTextEnd.indexOf(',')
                console.log('numEnd', numEnd);
                if (numEnd !== -1) {
                  console.log('numEnd的值1', numEnd);
                  // 得出内容的末尾下标值
                  let lengthAll = numStart + numEnd
                  // console.log('lengthAll', lengthAll);
                  let aaaa = allText.substr(0, numStart-1)
                  // console.log('aaaa: ', aaaa);
                  let bbbb = allText.substr(lengthAll)
                  // console.log('bbbb', bbbb);
                  let ccca = '' + writeArr[i].concat(bbbb)
                  let saveDescription = aaaa.concat(ccca)
                  setSaveDescription(saveDescription)
                  // console.log('saveDescription: ', saveDescription);
                  diseaseData['description'] = saveDescription
                  handleFormChenge(saveDescription, diseaseData.description)
                } else {
                  console.log('numEnd的值2', numEnd);
                  let aaaa = ''
                  // 到数组的最后一项时，不再有逗号，numEnd返回-1；改变替换内容的方式
                  if (numStart == -1) {
                    aaaa = allText
                  } else if (numStart !== -1) {
                    // aaaa = allText.substr(0, numStart-1)
                    aaaa = allText.substr(0,allText.indexOf(','))
                  }
                  console.log('aaaa: ', aaaa);
                  let bbbb = ''
                  let ccca = ''
                  for (let i =0; i < writeArr.length; i++) {
                    bbbb += writeArr[i]
                    
                  }
                  ccca = aaaa.concat(bbbb)
                    console.log('ccca', ccca);
                    let saveDescription = ccca
                    setSaveDescription(saveDescription)
                    // console.log('saveDescription: ', saveDescription);
                    diseaseData['description'] = saveDescription
                    // diseaseData['remark'] = saveDescription
                    handleFormChenge(saveDescription, diseaseData.description)
                }
                
            }
          }
        } else {
          let binghai = infoshort
          let allText = binghai.concat(writeTxt)
          // console.log('allText2',allText);
          diseaseData['description'] = allText
          handleFormChenge(allText, diseaseData.description)
          
        }
      } catch (err) {
        console.log(err);
      }
      
      
    }

    // 填入位置描述内容
    const writePositionText = () => {
      try {
        // console.log('diseaseData.area', diseaseData.area);
        console.log('diseaseData.lengthText',lengthText,widthText,heightText);
        if (diseaseData.area == undefined) {
          let writePositionTxt = ''
          setWritePositionTxt(writePositionTxt)
          diseaseData['writePositionTxt'] = writePositionTxt
          handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
        } else if (lengthText !== 0 || widthText !== 0 || heightText !== 0){
          console.log('有数据了');
          console.log('构件区域列表：：',areaparam);
          console.log('表单中的构件区域',diseaseData.area);
          console.log('构件类型',labelName);
          if (labelName == 'at0000' || labelName == undefined && areaparam == '') {
            var areaName = ''
            diseaseData['area'] = areaName
            // handleFormChenge(areaName, diseaseData.area)
          }
          if (areaparam !== '') {
            let areaArr = areaparam
            let inputArea = diseaseData.area
            console.log('inputArea',inputArea);
            for (let i = 0; i < areaArr.length; i++) {
              if (inputArea == areaArr[i].value) {
                console.log('此时选中的构件是：',areaArr[i].label);
                var areaName = areaArr[i].label
                console.log(areaName);
              }
            }
          }
          setAreaName(areaName)
          
          // 墩/台描述
          // 长度描述
          if (lengthText == '0') {
            var lengthNum = ''
            setLengthNum(lengthNum)
            // let pier = ''
            // setPier(pier)
          } else if (lengthText !== '0') {
            var lengthNum = '距左侧' + lengthText + 'm,'
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
          if (heightText == '0') {
            var heightNum = ''
            setHeightNum(heightNum)
          } else if (heightText !== '0') {
            var heightNum = ',距顶部' + heightText + 'm'
            setHeightNum(heightNum)
          }

          // 位置描述 = / + 病害区域 + 桥台 + 长度 + 宽度 + 距顶
          let writePositionTxt = areaName + lengthNum + heightNum + '处'
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
      <View style={[tailwind.flexRow, tailwind.justifyBetween]}>
        <View style={{width:'30%'}}>
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
        <View style={{width:'40%'}}>
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
      {scale.length ? (
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
      )}


      <View style={tailwind.mT2} />
      <View>
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
        <Text style={[{color:'#fff',fontSize:16}]}>确认</Text>
      </TouchableOpacity>
    </View>
    
    <ScaleInfo ref={scaleInfoRef} info={scaleInfo} />
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