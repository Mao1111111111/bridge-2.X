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
import {TextInput, KeyboardInput} from '../../../../components/Input';
import {SliderInput} from '../../../../components/SliderInput';
import Select from '../../../../components/Select';
import * as hooks from '../BridgeTest/DiseaseHooks';
// import {RadioGroup} from '../../../../components/Radio';
import ScaleInfo from '../BridgeTest/ScaleInfo';
import RadioGroup from 'react-native-radio-buttons-group';

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
        <View style={[{width:380}]}>
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
            <Text>长度{lengthText}m; 宽度{widthText}m; 距顶{heightText}m</Text>
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
        {/* <View style={tailwind.mT2} /> */}
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
      
      {/* 病害评定标准表 */}
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
  });