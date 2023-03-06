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

      // 病害名称
      const [infoshort, setInfoShort] = useState()

      // 位置描述 墩台
      const [pier,  setPier] = useState()
      // 位置描述 长、宽、距顶
      const [lengthNum, setLengthNum] = useState()
      const [widthNum, setWidthNum] = useState()
      const [heightNum, setHeightNum] = useState()

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
          // 将病害位置的长宽高数据存进diseaseData
          diseaseData['lengthText'] = lengthText
          diseaseData['widthText'] = widthText
          diseaseData['heightText'] = heightText


          // console.log('桥跨：：',route.params.memberList[0].membername);
          let defaultPier = route.params.memberList[0].membername
          // 提取第一个字符进行判断（表示墩台的数据）
          let firstDefaultPier = defaultPier.slice(0,1)
          if (firstDefaultPier == 1) {
            let pier = (firstDefaultPier - 1) + '#台'
            setPier(pier)
            // console.log('dundun:', pier);
          } else {
            let pier = (firstDefaultPier - 1) + '#墩'
            setPier(pier)
            // console.log('dundun:', pier);
          }
          // let lengthNum = lengthText + 'm,'
          // let widthNum = '距左侧' + widthText + 'm,'
          // let heightNum = '距顶部' + heightText + 'm'
          // let writePositionTxt = '/' + diseaseData.area + '距' + '' + lengthNum + widthNum + heightNum
          // setWritePositionTxt(writePositionTxt)
          // diseaseData['position'] = writePositionTxt
          // console.log('diseaseData.area2222222:', areaparam[0].label);
          diseaseData['area'] = areaparam[0].label
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
          // setTimeout(() => {
          //   componentDidMount()
          // }, 5000)
          // 右侧的分项数据（不定）
          // console.log('infoList', infoList);
        };
      }, [baseData, saveData, version, route.params, dispatch]);
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
          // 截取有变化的数据的二、三位内容(第一位为逗号)
          let sliceWrite = writeTxt.slice(1, 3)
          console.log('sliceWrite', sliceWrite);
          // 在remark里面查找这两位内容，取出其位置下标
          if (diseaseData.remark !== undefined) {
            if (writeTxt == '' || writeTxt == undefined) {
              // 当还没有输入的内容时
              let allText = diseaseData.remark
              let binghai = allText.slice(0,allText.indexOf('，'))
              console.log('binghai',binghai);
              let numStart = allText.indexOf(sliceWrite)
              console.log(numStart);
              // 替换下标位置到其后第一个逗号之间的内容
              let allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
              console.log('allTextEnd', allTextEnd);
              let douhao = ','
              let numEnd = allTextEnd.indexOf(douhao)
              console.log('numEnd', numEnd);
              // 得出内容的末尾下标值
              let lengthAll = numStart + numEnd
              console.log('lengthAll', lengthAll);
              // diseaseData['description'] = writeTxt
              let aaaa = allText.substr(0, numStart-1)
              console.log('aaaa: ', aaaa);
              let bbbb = allText.substr(lengthAll)
              console.log('bbbb', bbbb);
              let cccc = aaaa.concat(bbbb)
              console.log('cccc: ', cccc);
              let ccca = '' + writeTxt
              // let saveDescription = cccc.concat(ccca)
              let saveDescription = binghai.concat(ccca)
              setSaveDescription(saveDescription)
              console.log('saveDescription: ', saveDescription);
              diseaseData['description'] = allTextEnd
              handleFormChenge(allTextEnd, diseaseData.description)
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
                  let allText = diseaseData.description
                  // console.log('allText', allText);
                  // console.log('sliceWrite:', sliceWrite);
                  let numStart = allText.indexOf(sliceWrite)
                  // console.log('numStart',numStart);
                  // 替换下标位置到其后第一个逗号之间的内容
                  let allTextEnd = allText.slice(numStart)  // 提取allText从numStart到其最后的所有内容
                  // console.log('allTextEnd', allTextEnd);
                  let numEnd = allTextEnd.indexOf(',')
                  // console.log('numEnd', numEnd);
                  if (numEnd !== -1) {
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
                    // 到数组的最后一项时，不再有逗号，numEnd返回-1；改变替换内容的方式
                    let aaaa = allText.substr(0, numStart-1)
                    // console.log('aaaa: ', aaaa);
                    let ccca = aaaa.concat(writeArr[i])
                    let saveDescription = ccca
                    setSaveDescription(saveDescription)
                    // console.log('saveDescription: ', saveDescription);
                    diseaseData['description'] = saveDescription
                    handleFormChenge(saveDescription, diseaseData.description)
                  }
                  
              }
            }
          } else {
            // if (writeTxt == '') {
            //   diseaseData['description'] = diseaseData.remark
            //   handleFormChenge(diseaseData.remark, diseaseData.description)
            // } else {
            //   let binghai = infoshort
            //   let allText = binghai.concat(writeTxt)
            //   // console.log('allText2',allText);
            //   diseaseData['description'] = allText
            //   handleFormChenge(allText, diseaseData.description)
            // }
            let binghai = infoshort
            let allText = binghai.concat(writeTxt)
            // console.log('allText2',allText);
            diseaseData['description'] = allText
            handleFormChenge(allText, diseaseData.description)
            
          }
          // let writeTxt = ''
          // setWriteTxt(writeTxt)
        } catch (err) {
          console.log(err);
        }
        
        
      }

      const writePositionText = () => {
        try {
          // console.log('diseaseData.area', areaparam[0].label);
          if (diseaseData.area == undefined) {
            let writePositionTxt = '/'
            setWritePositionTxt(writePositionTxt)
            diseaseData['position'] = writePositionTxt
          } else {

            // 墩/台描述
            // 长度描述
            let lengthNum = lengthText + 'm,'
            setLengthNum(lengthNum)
            // 宽度描述
            let widthNum = '距左侧' + widthText + 'm,'
            setWidthNum(widthNum)
            // 距顶描述
            let heightNum = '距顶部' + heightText + 'm'
            setHeightNum(heightNum)

            // 位置描述 = / + 病害区域 + 桥台 + 长度 + 宽度 + 距顶
            let writePositionTxt = '/' + diseaseData.area + '距' + pier + lengthNum + widthNum + heightNum + '处'
            setWritePositionTxt(writePositionTxt)
            diseaseData['writePositionTxt'] = writePositionTxt
            setDiseaseData(diseaseData)
            handleFormChenge(writePositionTxt, diseaseData.writePositionTxt)
          }
        } catch (err) {
          console.log(err);
        }
      }


    {/* ================================================= */}
    {/* 病害填写表格区域 */}
    return (
    <View style={tailwind.flexRow}>
      {/* 病害填写表格区域 */}
      <ScrollView style={{height:350}}>
        <View style={[{width:'90%'}]}>
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
          <View style={{width:'45%'}}>
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
          <View style={{width:'45%'}}>
            <View style={tailwind.mB2}>
              {!areaparam.length ? (
                <TextInput
                  name="area"
                  label="病害区域"
                  // value={diseaseData?.area}
                  onChange={handleFormChenge}
                  lines={1}
                  height={25}
                />
              ) : (
                <Select
                  name="area"
                  label="病害区域"
                  // value={diseaseData?.area}
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
              values={scale}
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
          <View style={{width:435}}>
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
          <TouchableOpacity style={styles.sideButton} onPress={writeDesText}>
            <Text style={[{color:'#fff',fontSize:12}]}>填入描述</Text>
          </TouchableOpacity>
        </View>
        <View style={tailwind.mT2} />
        <View style={[tailwind.flexRow]}>
          <View style={{width:435}}>
            <WriteInput
              name="writePositionTxt"
              label="位置描述"
              value={diseaseData?.writePositionTxt}
              onChange={handleFormChenge}
              lines={3}
              height={70}
            />
          </View>
          <TouchableOpacity style={styles.sideButton} onPress={writePositionText}>
            <Text style={[{color:'#fff',fontSize:12}]}>填入描述</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
      
      {/* ================================================= */}
      {/* <View style={tailwind.mX2} /> */}
      
      <View>
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
        // 将病害位置的长宽高数据存进diseaseData
        diseaseData['lengthText'] = lengthText
        diseaseData['widthText'] = widthText
        diseaseData['heightText'] = heightText
        diseaseData['description'] = diseaseData.remark
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
        // setTimeout(() => {
        //   componentDidMount()
        // }, 5000)
      };
    }, [baseData, saveData, version, route.params, dispatch]);
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
      setDiseaseData(_data);
    };


  {/* ================================================= */}
  {/* 病害填写表格区域 */}
  return (
  <View style={tailwind.flexRow}>
    {/* 病害填写表格区域 */}
    <ScrollView style={{height:350}}>
      <View style={[{width:'95%'}]}>
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
        <Select
          label="构件类型"
          name="areatype"
          labelName="areaname"
          valueName="areatype"
          value={diseaseData?.areatype}
          onChange={handleFormChenge}
          values={baseData.components}
        />
        <View style={tailwind.mT2} />

        <View style={[tailwind.flexRow]}>
          <View style={[tailwind.flex1]}>
            {areanode ? (
              <>
                {/* <View style={tailwind.mY1} /> */}
                {/* <View style={[tailwind.flexRow]}>
                  <LabelItem label="参照点" style={tailwind.w16} />
                  <Select
                    name="areanode"
                    values={areanode}
                    value={diseaseData?.areanode}
                    onChange={handleFormChenge}
                  />
                </View> */}
                {/* <View style={tailwind.mY1} /> */}
                <View style={tailwind.mT2} />
                {/* <View style={[tailwind.flexRow, tailwind.mB3]}>
                  <LabelItem label="dx(cm)" style={tailwind.w16} />
                  <KeyboardInput
                    name="dx"
                    value={diseaseData?.dx}
                    onChange={handleFormChenge}
                  />
                  <View style={tailwind.mX2} />
                  <LabelItem label="dy(cm)" style={tailwind.w16} />
                  <KeyboardInput
                    name="dy"
                    value={diseaseData?.dy}
                    onChange={handleFormChenge}
                  />
                </View> */}
              </>
            ) : (
              <></>
            )}
          </View>
        </View>

        {/* <View style={tailwind.mB2}>
          {!areaparam.length ? (
            <TextInput
              name="area"
              label="病害区域"
              value={diseaseData?.area}
              onChange={handleFormChenge}
            />
          ) : (
            <Select
              name="area"
              label="病害区域"
              value={diseaseData?.area}
              values={areaparam}
              onChange={handleFormChenge}
            />
          )}
        </View> */}

        {/* {scale.length ? (
          <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
            <LabelItem label="标度" />
            <Select
              name="scale"
              values={scale}
              value={diseaseData?.scale}
              onChange={handleFormChenge}
            />
          </View>
        ) : (
          <></>
        )} */}
        {scale.length ? (
          <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
            <LabelItem label="标度" />
            <TouchableOpacity onPress={handleScaleOpen}>
              <Icon
                name="information"
                size={20}
                style={[tailwind.mR2, tailwind.textPurple700]}
              />
            </TouchableOpacity>
            <Select
              name="scale"
              values={scale}
              value={diseaseData?.scale}
              onChange={handleFormChenge}
            />
          </View>
        ) : (
          <></>
        )}
        <View style={tailwind.mT2} />
        <TextInput
          name="disPosition"
          label="病害位置"
          value={diseaseData?.disPosition}
          onChange={handleFormChenge}
        />
        <View style={tailwind.mT2} />
        
        {infoList.length ? (
          infoList.map(({strvalue, strinfo}, index) => (
            <React.Fragment key={index}>
              <View style={[tailwind.flexRow, tailwind.mB2]}>
                <LabelItem label={strinfo} style={styles.width110} />
                <KeyboardInput
                  name={strvalue}
                  value={diseaseData[strvalue]}
                  onChange={handleFormChenge}
                />
              </View>
            </React.Fragment>
          ))
        ) : (
          <></>
        )}

        <TextInput
          name="description"
          label="病害描述"
          value={diseaseData?.description}
          onChange={handleFormChenge}
          // disabled={true}
        />
      </View>
    </ScrollView>
    
    {/* ================================================= */}
    <View style={tailwind.mX2} />
    <ScaleInfo ref={scaleInfoRef} info={scaleInfo} />
    {/* 病害类型选择区域 */}
    {/* <View style={[{width:'42%'}]}>
      <View>
      <LabelItem
        label="病害评定标准表"
        LabelStyle={[tailwind.mR0, tailwind.mX4,{color:'#2b427d'}]}
      />
      <View style={tailwind.mY1} />
      <View style={[tailwind.mX4, tailwind.mB4, styles.border]}>
        <View style={tailwind.flexRow}>
          <View style={[styles.center, tailwind.flex1, styles.borderRB]}>
            <Text>标度</Text>
          </View>
          <View style={[styles.center, styles.flex2, styles.borderRB]}>
            <Text>定性描述</Text>
          </View>
          <View style={[styles.center, styles.flex2, styles.borderB]}>
            <Text>定量描述</Text>
          </View>
        </View>
        <FlatList
          data={scaleInfo}
          renderItem={({item}) => (
            <View key={item.standardscale} style={tailwind.flexRow}>
              <View style={[styles.center, tailwind.flex1, styles.borderRB]}>
                <Text>{item.standardscale}</Text>
              </View>
              <View style={[styles.center, styles.flex2, styles.borderRB]}>
                <Text>{item.qualitative}</Text>
              </View>
              <View style={[styles.center, styles.flex2, styles.borderB]}>
                <Text>{item.standardname}</Text>
              </View>
            </View>
          )}
        />
      </View>
      </View>
    </View> */}
    {/* <ScaleInfo ref={scaleInfoRef} info={scaleInfo} /> */}
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
        // 将病害位置的长宽高数据存进diseaseData
        diseaseData['lengthText'] = lengthText
        diseaseData['widthText'] = widthText
        diseaseData['heightText'] = heightText
        diseaseData['description'] = diseaseData.remark
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
        // setTimeout(() => {
        //   componentDidMount()
        // }, 5000)
      };
    }, [baseData, saveData, version, route.params, dispatch]);
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
      setDiseaseData(_data);
    };


  {/* ================================================= */}
  {/* 病害填写表格区域 */}
  return (
  <View style={tailwind.flexRow}>
    {/* 病害填写表格区域 */}
    <ScrollView style={{height:350}}>
      <View style={[{width:'95%'}]}>
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
      <Select
        label="构件类型"
        name="areatype"
        labelName="areaname"
        valueName="areatype"
        value={diseaseData?.areatype}
        onChange={handleFormChenge}
        values={baseData.components}
      />
      
      <View style={[tailwind.flexRow]}>
        <View style={[tailwind.flex1]}>
          {areanode ? (
            <>
              <View style={tailwind.mT2} />
            </>
          ) : (
            <></>
          )}
        </View>
      </View>

      <View style={tailwind.mB2}>
        {!areaparam.length ? (
          <TextInput
            name="area"
            label="病害区域"
            value={diseaseData?.area}
            onChange={handleFormChenge}
          />
        ) : (
          <Select
            name="area"
            label="病害区域"
            value={diseaseData?.area}
            values={areaparam}
            onChange={handleFormChenge}
          />
        )}
      </View>

      {scale.length ? (
        <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
          <LabelItem label="标度" />
          <Select
            name="scale"
            values={scale}
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
          <LabelItem label="病害位置(m)" style={tailwind.w18} />
          <Text>长度{lengthText}m</Text>
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
      </View>
      <View style={tailwind.mT2} />
      
      {infoList.length ? (
        infoList.map(({strvalue, strinfo}, index) => (
          <React.Fragment key={index}>
            <View style={[tailwind.flexRow, tailwind.mB2]}>
              <LabelItem label={strinfo} style={styles.width110} />
              <KeyboardInput
                name={strvalue}
                value={diseaseData[strvalue]}
                onChange={handleFormChenge}
              />
            </View>
          </React.Fragment>
        ))
      ) : (
        <></>
      )}
    <TextInput
      name="description"
      label="病害描述"
      value={diseaseData?.description}
      onChange={handleFormChenge}
    />
    </View>
    </ScrollView>
    
    {/* ================================================= */}
    <View style={tailwind.mX2} />
    
    {/* 病害类型选择区域 */}
    <View style={[{width:'42%'}]}>
      <View>
      {/* <Text style={[tailwind.mR0, {color:'#2b427d'}]}>病害评定标准表</Text> */}
      <LabelItem
        label="病害评定标准表"
        LabelStyle={[tailwind.mR0, tailwind.mX4,{color:'#2b427d'}]}
      />
      <View style={tailwind.mY1} />
      <View style={[tailwind.mX4, tailwind.mB4, styles.border]}>
        <View style={tailwind.flexRow}>
          <View style={[styles.center, tailwind.flex1, styles.borderRB]}>
            <Text>标度</Text>
          </View>
          <View style={[styles.center, styles.flex2, styles.borderRB]}>
            <Text>定性描述</Text>
          </View>
          <View style={[styles.center, styles.flex2, styles.borderB]}>
            <Text>定量描述</Text>
          </View>
        </View>
        <FlatList
          data={scaleInfo}
          renderItem={({item}) => (
            <View key={item.standardscale} style={tailwind.flexRow}>
              <View style={[styles.center, tailwind.flex1, styles.borderRB]}>
                <Text>{item.standardscale}</Text>
              </View>
              <View style={[styles.center, styles.flex2, styles.borderRB]}>
                <Text>{item.qualitative}</Text>
              </View>
              <View style={[styles.center, styles.flex2, styles.borderB]}>
                <Text>{item.standardname}</Text>
              </View>
            </View>
          )}
        />
      </View>
      </View>
    </View>
    {/* <ScaleInfo ref={scaleInfoRef} info={scaleInfo} /> */}
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
        // 将病害位置的长宽高数据存进diseaseData
        diseaseData['lengthText'] = lengthText
        diseaseData['widthText'] = widthText
        //diseaseData['heightText'] = heightText
        diseaseData['description'] = diseaseData.remark
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
        // setTimeout(() => {
        //   componentDidMount()
        // }, 5000)
      };
    }, [baseData, saveData, version, route.params, dispatch]);
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
      setDiseaseData(_data);
    };


  {/* ================================================= */}
  {/* 病害填写表格区域 */}
  return (
  <View style={tailwind.flexRow}>
    {/* 病害填写表格区域 */}
    <ScrollView style={{height:350}}>
      <View style={[{width:'95%'}]}>
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
      <Select
        label="构件类型"
        name="areatype"
        labelName="areaname"
        valueName="areatype"
        value={diseaseData?.areatype}
        onChange={handleFormChenge}
        values={baseData.components}
      />
      <View style={[tailwind.flexRow]}>
        <View style={[tailwind.flex1]}>
          {areanode ? (
            <>
              <View style={tailwind.mT2} />
            </>
          ) : (
            <></>
          )}
        </View>
      </View>

      <View style={tailwind.mB2}>
        {!areaparam.length ? (
          <TextInput
            name="area"
            label="病害区域"
            value={diseaseData?.area}
            onChange={handleFormChenge}
          />
        ) : (
          <Select
            name="area"
            label="病害区域"
            value={diseaseData?.area}
            values={areaparam}
            onChange={handleFormChenge}
          />
        )}
      </View>

      {scale.length ? (
        <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
          <LabelItem label="标度" />
          <Select
            name="scale"
            values={scale}
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
          <LabelItem label="病害位置(m)" style={tailwind.w18} />
          <Text>长度{lengthText}m; 宽度{widthText}m</Text>
        </View>
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

       {/*  <View style={[tailwind.flexRow,tailwind.mB3]}>
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
      
      {infoList.length ? (
        infoList.map(({strvalue, strinfo}, index) => (
          <React.Fragment key={index}>
            <View style={[tailwind.flexRow, tailwind.mB2]}>
              <LabelItem label={strinfo} style={styles.width110} />
              <KeyboardInput
                name={strvalue}
                value={diseaseData[strvalue]}
                onChange={handleFormChenge}
              />
            </View>
          </React.Fragment>
        ))
      ) : (
        <></>
      )}
      <TextInput
        name="description"
        label="病害描述"
        value={diseaseData?.description}
        onChange={handleFormChenge}
      />
    </View>
    </ScrollView>
    
    {/* ================================================= */}
    <View style={tailwind.mX2} />
    
    {/* 病害类型选择区域 */}
    <View style={[{width:'42%'}]}>
      <View>
      {/* <Text style={[tailwind.mR0, {color:'#2b427d'}]}>病害评定标准表</Text> */}
      <LabelItem
        label="病害评定标准表"
        LabelStyle={[tailwind.mR0, tailwind.mX4,{color:'#2b427d'}]}
      />
      <View style={tailwind.mY1} />
      <View style={[tailwind.mX4, tailwind.mB4, styles.border]}>
        <View style={tailwind.flexRow}>
          <View style={[styles.center, tailwind.flex1, styles.borderRB]}>
            <Text>标度</Text>
          </View>
          <View style={[styles.center, styles.flex2, styles.borderRB]}>
            <Text>定性描述</Text>
          </View>
          <View style={[styles.center, styles.flex2, styles.borderB]}>
            <Text>定量描述</Text>
          </View>
        </View>
        <FlatList
          data={scaleInfo}
          renderItem={({item}) => (
            <View key={item.standardscale} style={tailwind.flexRow}>
              <View style={[styles.center, tailwind.flex1, styles.borderRB]}>
                <Text>{item.standardscale}</Text>
              </View>
              <View style={[styles.center, styles.flex2, styles.borderRB]}>
                <Text>{item.qualitative}</Text>
              </View>
              <View style={[styles.center, styles.flex2, styles.borderB]}>
                <Text>{item.standardname}</Text>
              </View>
            </View>
          )}
        />
      </View>
      </View>
    </View>
    {/* <ScaleInfo ref={scaleInfoRef} info={scaleInfo} /> */}
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
        // 将病害位置的长宽高数据存进diseaseData
        diseaseData['lengthText'] = lengthText
        diseaseData['widthText'] = widthText
        //diseaseData['heightText'] = heightText
        diseaseData['description'] = diseaseData.remark
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
        // setTimeout(() => {
        //   componentDidMount()
        // }, 5000)
      };
    }, [baseData, saveData, version, route.params, dispatch]);
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
      setDiseaseData(_data);
    };


  {/* ================================================= */}
  {/* 病害填写表格区域 */}
  return (
  <View style={tailwind.flexRow}>
    {/* 病害填写表格区域 */}
    <ScrollView style={{height:350}}>
      <View style={[{width:'95%'}]}>
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
      <Select
        label="构件类型"
        name="areatype"
        labelName="areaname"
        valueName="areatype"
        value={diseaseData?.areatype}
        onChange={handleFormChenge}
        values={baseData.components}
      />
      <View style={[tailwind.flexRow]}>
        <View style={[tailwind.flex1]}>
          {areanode ? (
            <>
              <View style={tailwind.mT2} />
            </>
          ) : (
            <></>
          )}
        </View>
      </View>

      <View style={tailwind.mB2}>
        {!areaparam.length ? (
          <TextInput
            name="area"
            label="病害区域"
            value={diseaseData?.area}
            onChange={handleFormChenge}
          />
        ) : (
          <Select
            name="area"
            label="病害区域"
            value={diseaseData?.area}
            values={areaparam}
            onChange={handleFormChenge}
          />
        )}
      </View>

      {scale.length ? (
        <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
          <LabelItem label="标度" />
          <Select
            name="scale"
            values={scale}
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
          <LabelItem label="病害位置(m)" style={tailwind.w18} />
          <Text>台高{lengthText}m; 台宽{widthText}m</Text>
        </View>
        <View style={[tailwind.flexRow]}>
          <LabelItem label="台高" />
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

       {/*  <View style={[tailwind.flexRow,tailwind.mB3]}>
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
      
      {infoList.length ? (
        infoList.map(({strvalue, strinfo}, index) => (
          <React.Fragment key={index}>
            <View style={[tailwind.flexRow, tailwind.mB2]}>
              <LabelItem label={strinfo} style={styles.width110} />
              <KeyboardInput
                name={strvalue}
                value={diseaseData[strvalue]}
                onChange={handleFormChenge}
              />
            </View>
          </React.Fragment>
        ))
      ) : (
        <></>
      )}
      <TextInput
        name="description"
        label="病害描述"
        value={diseaseData?.description}
        onChange={handleFormChenge}
      />
    </View>
    </ScrollView>
    
    {/* ================================================= */}
    <View style={tailwind.mX2} />
    
    {/* 病害类型选择区域 */}
    <View style={[{width:'42%'}]}>
      <View>
      {/* <Text style={[tailwind.mR0, {color:'#2b427d'}]}>病害评定标准表</Text> */}
      <LabelItem
        label="病害评定标准表"
        LabelStyle={[tailwind.mR0, tailwind.mX4,{color:'#2b427d'}]}
      />
      <View style={tailwind.mY1} />
      <View style={[tailwind.mX4, tailwind.mB4, styles.border]}>
        <View style={tailwind.flexRow}>
          <View style={[styles.center, tailwind.flex1, styles.borderRB]}>
            <Text>标度</Text>
          </View>
          <View style={[styles.center, styles.flex2, styles.borderRB]}>
            <Text>定性描述</Text>
          </View>
          <View style={[styles.center, styles.flex2, styles.borderB]}>
            <Text>定量描述</Text>
          </View>
        </View>
        <FlatList
          data={scaleInfo}
          renderItem={({item}) => (
            <View key={item.standardscale} style={tailwind.flexRow}>
              <View style={[styles.center, tailwind.flex1, styles.borderRB]}>
                <Text>{item.standardscale}</Text>
              </View>
              <View style={[styles.center, styles.flex2, styles.borderRB]}>
                <Text>{item.qualitative}</Text>
              </View>
              <View style={[styles.center, styles.flex2, styles.borderB]}>
                <Text>{item.standardname}</Text>
              </View>
            </View>
          )}
        />
      </View>
      </View>
    </View>
    {/* <ScaleInfo ref={scaleInfoRef} info={scaleInfo} /> */}
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
        // 将病害位置的长宽高数据存进diseaseData
        diseaseData['lengthText'] = lengthText
        //diseaseData['widthText'] = widthText
        diseaseData['heightText'] = heightText
        diseaseData['description'] = diseaseData.remark
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
        // setTimeout(() => {
        //   componentDidMount()
        // }, 5000)
      };
    }, [baseData, saveData, version, route.params, dispatch]);
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
      setDiseaseData(_data);
    };


  {/* ================================================= */}
  {/* 病害填写表格区域 */}
  return (
  <View style={tailwind.flexRow}>
    {/* 病害填写表格区域 */}
    <ScrollView style={{height:350}}>
      <View style={[{width:'95%'}]}>
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
      <Select
        label="构件类型"
        name="areatype"
        labelName="areaname"
        valueName="areatype"
        value={diseaseData?.areatype}
        onChange={handleFormChenge}
        values={baseData.components}
      />
      <View style={[tailwind.flexRow]}>
        <View style={[tailwind.flex1]}>
          {areanode ? (
            <>
              <View style={tailwind.mT2} />
            </>
          ) : (
            <></>
          )}
        </View>
      </View>

      <View style={tailwind.mB2}>
        {!areaparam.length ? (
          <TextInput
            name="area"
            label="病害区域"
            value={diseaseData?.area}
            onChange={handleFormChenge}
          />
        ) : (
          <Select
            name="area"
            label="病害区域"
            value={diseaseData?.area}
            values={areaparam}
            onChange={handleFormChenge}
          />
        )}
      </View>

      {scale.length ? (
        <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
          <LabelItem label="标度" />
          <Select
            name="scale"
            values={scale}
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
          <LabelItem label="病害位置(m)" style={tailwind.w18} />
          <Text>左侧{lengthText}m; 顶部{heightText}m</Text>
        </View>
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
      
      {infoList.length ? (
        infoList.map(({strvalue, strinfo}, index) => (
          <React.Fragment key={index}>
            <View style={[tailwind.flexRow, tailwind.mB2]}>
              <LabelItem label={strinfo} style={styles.width110} />
              <KeyboardInput
                name={strvalue}
                value={diseaseData[strvalue]}
                onChange={handleFormChenge}
              />
            </View>
          </React.Fragment>
        ))
      ) : (
        <></>
      )}
      <TextInput
        name="description"
        label="病害描述"
        value={diseaseData?.description}
        onChange={handleFormChenge}
      />
    </View>
    </ScrollView>
    
    {/* ================================================= */}
    <View style={tailwind.mX2} />
    
    {/* 病害类型选择区域 */}
    <View style={[{width:'42%'}]}>
      <View>
      {/* <Text style={[tailwind.mR0, {color:'#2b427d'}]}>病害评定标准表</Text> */}
      <LabelItem
        label="病害评定标准表"
        LabelStyle={[tailwind.mR0, tailwind.mX4,{color:'#2b427d'}]}
      />
      <View style={tailwind.mY1} />
      <View style={[tailwind.mX4, tailwind.mB4, styles.border]}>
        <View style={tailwind.flexRow}>
          <View style={[styles.center, tailwind.flex1, styles.borderRB]}>
            <Text>标度</Text>
          </View>
          <View style={[styles.center, styles.flex2, styles.borderRB]}>
            <Text>定性描述</Text>
          </View>
          <View style={[styles.center, styles.flex2, styles.borderB]}>
            <Text>定量描述</Text>
          </View>
        </View>
        <FlatList
          data={scaleInfo}
          renderItem={({item}) => (
            <View key={item.standardscale} style={tailwind.flexRow}>
              <View style={[styles.center, tailwind.flex1, styles.borderRB]}>
                <Text>{item.standardscale}</Text>
              </View>
              <View style={[styles.center, styles.flex2, styles.borderRB]}>
                <Text>{item.qualitative}</Text>
              </View>
              <View style={[styles.center, styles.flex2, styles.borderB]}>
                <Text>{item.standardname}</Text>
              </View>
            </View>
          )}
        />
      </View>
      </View>
    </View>
    {/* <ScaleInfo ref={scaleInfoRef} info={scaleInfo} /> */}
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
    }
  });