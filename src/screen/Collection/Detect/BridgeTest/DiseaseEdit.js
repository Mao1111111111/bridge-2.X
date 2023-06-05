import React from 'react';
import {tailwind} from 'react-native-tailwindcss';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Context} from './Provider';
import {Context as ThemeContext} from '../../../../providers/ThemeProvider';
import {Box, Content} from '../../../../components/CommonView';
import LabelItem from '../../../../components/LabelItem';
import Checkbox from '../../../../components/Checkbox';
import {TextInput, KeyboardInput} from '../../../../components/Input';
import Select from '../../../../components/Select';
import Table from '../../../../components/Table';
import * as hooks from './DiseaseHooks';
import HeaderTabs from './HeaderTabs';
import ScaleInfo from './ScaleInfo';
import Media from './Media';

const CrackForm = ({baseData, diseaseData, inx, onChange}) => {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const [formData, setFormData] = React.useState(null);

  React.useEffect(() => {
    setFormData(diseaseData?.list?.find(item => item.inx === inx) || {});
  }, [diseaseData, inx]);

  const [areaparam, areanode] = hooks.useArea({
    diseaseData,
    baseData,
  });

  return (
    <>
      <LabelItem
        label="节点坐标："
        LabelStyle={[tailwind.mR0, theme.primaryTextStyle]}>
        <Text style={[tailwind.fontBold, theme.primaryTextStyle]}>
          {formData?.inx ? formData?.inx + '' : '未选择'}
        </Text>
      </LabelItem>
      {formData?.inx ? (
        <>
          <View style={tailwind.mT1} />
          <View style={[tailwind.flexRow]}>
            <View style={[tailwind.flex1, tailwind.mR4]}>
              {!areaparam.length ? (
                <TextInput
                  name="area"
                  label="构件区域"
                  value={formData?.area}
                  onChange={onChange}
                />
              ) : (
                <Select
                  name="area"
                  label="构件区域"
                  value={formData?.area}
                  values={areaparam}
                  onChange={onChange}
                />
              )}
            </View>

            <View style={[tailwind.flex1]}>
              {!areanode.length ? (
                <TextInput
                  name="areanode"
                  label="参照点    "
                  value={formData?.areanode}
                  LabelStyle={tailwind.w14}
                  onChange={onChange}
                />
              ) : (
                <Select
                  name="areanode"
                  label="参照点    "
                  value={formData?.areanode}
                  values={areanode}
                  onChange={onChange}
                />
              )}
            </View>
          </View>
          <View style={tailwind.mY1} />
          {/* <RadioGroup
        label="坐标值"
        name="coordinate"
        value={formData?.coordinate}
        onChange={onChange}
        values={[
          {label: '正交坐标', value: 'orthogonal'},
          {label: '极坐标', value: 'pole'},
        ]}
      /> */}
          <View>
            <LabelItem label="坐标值" />
            <View style={[tailwind.flexRow, tailwind.mB3]}>
              <LabelItem label="dx(cm)" style={tailwind.w16} />
              <KeyboardInput
                name="dx"
                value={formData?.dx}
                onChange={onChange}
              />
              <View style={tailwind.mX2} />
              <LabelItem label="dy(cm)" style={tailwind.w16} />
              <KeyboardInput
                name="dy"
                value={formData?.dy}
                onChange={onChange}
              />
            </View>
            {/* {formData?.coordinate === 'orthogonal' ? (
          <View style={[tailwind.flexRow, tailwind.mB3]}>
            <LabelItem label="dx(cm)" style={tailwind.w16} />
            <TextInput name="dx" value={formData?.dx} onChange={onChange} />
            <View style={tailwind.mX2} />
            <LabelItem label="dy(cm)" style={tailwind.w16} />
            <TextInput name="dy" value={formData?.dy} onChange={onChange} />
          </View>
        ) : (
          <View style={[tailwind.flexRow, tailwind.mB3]}>
            <LabelItem label="ΔL(cm)" style={tailwind.w16} />
            <TextInput name="ΔL" value={formData?.L} onChange={onChange} />
            <View style={tailwind.mX2} />
            <LabelItem label="α(℃)   " style={tailwind.w16} />
            <TextInput name="α" value={formData?.a} onChange={onChange} />
          </View>
        )}
        <View style={[tailwind.flexRow, tailwind.mB3]}>
          <LabelItem label="x(cm)" style={tailwind.w16} />
          <TextInput name="x" value={formData?.x} onChange={onChange} />
          <View style={tailwind.mX2} />
          <LabelItem label="y(cm)" style={tailwind.w16} />
          <TextInput name="y" value={formData?.y} onChange={onChange} />
        </View> */}
          </View>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default function DiseaseEdit({route, navigation}) {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const {dispatch: dispatch} = React.useContext(Context);

  const [pageType, setPageType] = React.useState('数据');

  const [diseaseData, setDiseaseData] = React.useState();

  const [nowEditInx, setNowEditInx] = React.useState(1);

  const [img, setImg] = React.useState('');

  const [bgImg, setBgImg] = React.useState('');

  const [addFlg, setAddFlg] = React.useState(false);

  const saveData = React.useRef(null);

  const scaleInfoRef = React.useRef();

  const [
    baseData,
    itemData,
    version,
    defaultImg,
    defaultBgImg,
    defaultAddFlg,
    headerItems,
  ] = hooks.useP1001Init({route, navigation});

  const [scale, scaleInfo] = hooks.useScale({
    diseaseData,
    typeList: route.params?.type?.list,
    baseData,
  });

  const defaultFileName = hooks.useDefaultFileName({diseaseData, baseData});

  const infoList = hooks.useInfoComponents({diseaseData, baseData});

  React.useEffect(() => setDiseaseData(itemData), [itemData]);

  React.useEffect(() => setImg(defaultImg), [defaultImg]);

  React.useEffect(() => setBgImg(defaultBgImg), [defaultBgImg]);

  React.useEffect(() => setAddFlg(defaultAddFlg), [defaultAddFlg]);

  React.useEffect(() => {
    saveData.current = {...diseaseData};
    console.log('进入DiseaseEdit页面~~~~~~~~~1~');
  }, [diseaseData]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (version && baseData) {
          const {dataGroupId, memberList, type} = route.params;
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
                `${strname}${saveData.current[strvalue]}@@${strunit}@@`,
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
            jsondata,
            dataGroupId,
            datatype: 'c1003',
            version,
          }));
          dispatch({type: 'isLoading', payload: true});
          dispatch({type: 'cachePartsList', payload: list});
        }
      };
    }, [route.params, dispatch, version, baseData]),
  );

  const getAreaName = item => {
    const {components} = baseData;
    if (diseaseData?.areatype && components) {
      const {areaparamjson} =
        components.find(({areatype}) => diseaseData?.areatype === areatype) ||
        {};
      if (!areaparamjson) {
        return item.area;
      }
      const {areaparamlist} =
        typeof areaparamjson === 'string'
          ? JSON.parse(areaparamjson)
          : areaparamjson;
      if (!areaparamlist) {
        return item.area;
      }
      return (
        areaparamlist.find(it => it.areaparamid === item.area)?.areaparam ||
        item.area
      );
    }
    return item.area;
  };

  const handleFormChenge = ({name, value}) => {
    const _data = {
      ...diseaseData,
      [name]: value,
    };
    const {infoComponents, basestandardtable, components} = baseData;
    if (name === 'checktypeid') {
      const _type = route.params.type.list.find(
        item => _data.checktypeid === item.checktypeid,
      );
      let defaultScaleVal = '';
      if (_type) {
        defaultScaleVal = _type?.standardscale;
      }
      _data.scale = defaultScaleVal;
      // 切换标度
      const info = infoComponents.find(
        ({checktypeid}) => value === checktypeid,
      );
      const list = [];
      if (info) {
        const {standardid, config} = info;
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
        setImg(info?.exampleimg && `data:image/png;base64,${info?.exampleimg}`);
        // 切换节点数
        setAddFlg(!config?.node);
        for (let inx = 0; inx < config?.node || 0; inx++) {
          list.push({
            inx: inx + 1,
            coordinate: 'orthogonal',
          });
        }
      }
      _data.list = list;
      _data.scale = '';
    }
    if (name === 'areatype') {
      const area = components.find(({areatype}) => value === areatype);
      if (area) {
        setBgImg(area.exampleimg && `data:image/png;base64,${area.exampleimg}`);
      }
    }
    setDiseaseData(_data);
  };

  const handleTableChenge = ({name, value}) => {
    const _list = [...diseaseData.list];
    const inx = _list.findIndex(item => item.inx === nowEditInx);
    _list[inx] = {
      ..._list[inx],
      [name]: value,
    };
    setDiseaseData({
      ...diseaseData,
      list: _list,
    });
  };

  const handleAdd = () => {
    const list = [...(diseaseData.list || [])];
    list.push({
      inx: list.length + 1,
      coordinate: 'orthogonal',
    });
    setDiseaseData({
      ...diseaseData,
      list,
    });
    setNowEditInx(list.length);
  };

  const handleDelete = () => {
    const list = diseaseData.list.filter(item => item.inx !== nowEditInx);
    list.forEach((item, index) => {
      item.inx = index + 1;
    });
    setDiseaseData({
      ...diseaseData,
      list,
    });
    setNowEditInx(-1);
  };

  const handleScaleOpen = () => scaleInfoRef.current.open();

  return (
    <Box headerItems={headerItems} pid="P1603">
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
          onAdd={addFlg && handleAdd}
          onDelete={addFlg && handleDelete}
        >
          <View style={[styles.card, theme.primaryBgStyle]}>
            <View style={[tailwind.flexRow, tailwind.mB1]}>
              {/* <LabelItem label="编号:">
                <Text style={[tailwind.fontBold]}>{data.index}</Text>
              </LabelItem>
              <View style={tailwind.mX2} /> */}
              <Select
                label="构件"
                name="areatype"
                labelName="areaname"
                valueName="areatype"
                style={tailwind.flex1}
                value={diseaseData?.areatype}
                onChange={handleFormChenge}
                values={baseData.components}
              />
              <View style={tailwind.mX2} />
              <Select
                label="类型"
                name="checktypeid"
                labelName="checkinfoshort"
                valueName="checktypeid"
                style={tailwind.flex1}
                onChange={handleFormChenge}
                value={diseaseData?.checktypeid}
                values={baseData.infoComponents}
              />
              {scale.length ? (
                <>
                  <View style={tailwind.mX2} />
                  <View
                    style={[
                      tailwind.flexRow,
                      tailwind.itemsCenter,
                      styles.width130,
                    ]}>
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
                      value={diseaseData?.scale}
                      values={scale}
                      onChange={handleFormChenge}
                      style={tailwind.flex1}
                    />
                  </View>
                </>
              ) : (
                <></>
              )}
              <View style={tailwind.mX2} />
              <LabelItem
                label="是否贯通"
                LabelStyle={[tailwind.mR0, theme.primaryTextStyle]}
              />
              <Checkbox
                checked={!!diseaseData?.istransfixion}
                onPress={() =>
                  handleFormChenge({
                    name: 'istransfixion',
                    value: !diseaseData?.istransfixion + 0,
                  })
                }
              />
              <View style={tailwind.mX2} />
              <LabelItem
                label="重点关注"
                LabelStyle={[tailwind.mR0, theme.primaryTextStyle]}
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
            <View style={[tailwind.flex1, tailwind.flexRow]}>
              <View style={[tailwind.flex1]}>
                <View style={tailwind.flex1}>
                  <Text style={[styles.title, theme.primaryTextStyle]}>
                    节点列表
                  </Text>
                  <View style={styles.tableBox}>
                    <Table.Header>
                      <Table.Title title="选择" flex={1} />
                      <Table.Title title="序号" flex={1} />
                      <Table.Title title="区域" flex={3} />
                      <Table.Title title="x(cm)" flex={2} />
                      <Table.Title title="y(cm)" flex={2} />
                    </Table.Header>
                    <FlatList
                      extraData={diseaseData?.list || []}
                      data={diseaseData?.list || []}
                      renderItem={({item, index}) => (
                        <Table.Row
                          key={index}
                          onPress={() => setNowEditInx(item.inx)}>
                          <Table.Cell flex={1}>
                            <Checkbox
                              onPress={() => setNowEditInx(item.inx)}
                              checked={nowEditInx === item.inx}
                            />
                          </Table.Cell>
                          <Table.Cell flex={1}>{item.inx}</Table.Cell>
                          <Table.Cell flex={3}>
                            {item.area ? getAreaName(item) : '--'}
                          </Table.Cell>
                          <Table.Cell flex={2}>{item.dx || '--'}</Table.Cell>
                          <Table.Cell flex={2}>{item.dy || '--'}</Table.Cell>
                        </Table.Row>
                      )}
                    />
                  </View>
                </View>
                <View style={tailwind.mY1} />
                <View style={[tailwind.flex1]}>
                  <View style={[styles.imageBox, tailwind.z20]}>
                    {img ? (
                      <Image style={[styles.image]} source={{uri: img}} />
                    ) : null}
                  </View>
                  <View style={[styles.imageBox]}>
                    {bgImg ? (
                      <Image style={[styles.image]} source={{uri: bgImg}} />
                    ) : null}
                  </View>
                </View>
              </View>
              <View style={tailwind.mX2} />
              <View style={tailwind.flex1}>
                <View style={tailwind.flex1}>
                  {nowEditInx && diseaseData && (
                    <CrackForm
                      baseData={baseData}
                      diseaseData={diseaseData}
                      inx={nowEditInx}
                      onChange={handleTableChenge}
                    />
                  )}
                </View>
                <View style={tailwind.flex1}>
                  <LabelItem
                    label="裂缝属性"
                    LabelStyle={theme.primaryTextStyle}
                  />
                  {infoList.length ? (
                    infoList.map(({strvalue, strinfo}, index) => (
                      <View
                        key={index}
                        style={[tailwind.flexRow, tailwind.mB2]}>
                        <LabelItem label={strinfo} LabelStyle={tailwind.w24} />
                        <KeyboardInput
                          name={strvalue}
                          value={diseaseData[strvalue]}
                          onChange={handleFormChenge}
                        />
                      </View>
                    ))
                  ) : (
                    <></>
                  )}
                  <KeyboardInput
                    label="L(cm)"
                    name="L"
                    LabelStyle={tailwind.w24}
                    value={diseaseData?.L}
                    onChange={handleFormChenge}
                  />
                  <View style={tailwind.mT1}>
                    <LabelItem label="裂缝宽度(mm)" />
                    <View style={[tailwind.flexRow, tailwind.mT2]}>
                      <KeyboardInput
                        label="w1"
                        name="w1"
                        style={tailwind.flex1}
                        value={diseaseData?.w1}
                        onChange={handleFormChenge}
                      />
                      <View style={tailwind.mX2} />
                      <KeyboardInput
                        label="w2"
                        name="w2"
                        style={tailwind.flex1}
                        value={diseaseData?.w2}
                        onChange={handleFormChenge}
                      />
                      <View style={tailwind.mX2} />
                      <KeyboardInput
                        label="w3"
                        name="w3"
                        style={tailwind.flex1}
                        value={diseaseData?.w3}
                        onChange={handleFormChenge}
                      />
                    </View>
                  </View>
                </View>
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
  imageBox: {
    height: '100%',
    width: '100%',
    top: 0,
    ...tailwind.absolute,
    ...tailwind.bgTransparent,
  },
  image: {
    ...tailwind.wFull,
    ...tailwind.hFull,
    ...tailwind.bgTransparent,
  },
  flex2: {
    flex: 2,
  },
  checkboxRow: {
    ...tailwind.flexRow,
    ...tailwind.flex1,
    ...tailwind.justifyEnd,
  },
  width130: {
    width: 130,
  },
});
