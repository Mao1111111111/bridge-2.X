// 养护计划
import React from 'react';
import {tailwind} from 'react-native-tailwindcss';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import {Context} from './Provider';
import {Context as ThemeContext} from '../../../../providers/ThemeProvider';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';
import {Box, Content} from '../../../../components/CommonView';
import {TextInput} from '../../../../components/Input';
import Checkbox from '../../../../components/Checkbox';
import Table from '../../../../components/Table';
import HeaderTabs from './HeaderTabs';
import {getDiseaseDataList} from '../../../../database/parts_checkstatus_data';
import * as partsPlanGenesisData from '../../../../database/parts_plan_genesis_data';
import storage from '../../../../utils/storage';
import {listToPage} from '../../../../utils/common';

export default function PlanEdit({navigation, route}) {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const {
    state: {bridgeside, userInfo},
  } = React.useContext(GlobalContext);

  const {
    state: {project, bridge, fileList, bridgereportid},
  } = React.useContext(Context);

  const [tableData, setTableData] = React.useState([]);

  const [plan, setPlan] = React.useState([]);

  const [membercheck, setMembercheck] = React.useState([]);

  const [tablePageNo, setTablePageNo] = React.useState(1);

  const [img, setImg] = React.useState();

  const [remark, setRemark] = React.useState();

  const [nowEdit, setNowEdit] = React.useState(null);

  const [data, setData] = React.useState(new Set());

  const {list} = route?.params || {};

  const category = 'plan';

  React.useEffect(() => {
    storage.getBaseItem('桥梁各部件病害信息').then(res => {
      if (res.data && res.data.length) {
        setMembercheck(res.data[0]);
      }
    });
  }, []);

  React.useEffect(() => {
    if (!list.length || !bridgereportid) {
      return;
    }
    getDiseaseDataList(
      bridgereportid,
      list.map(({memberid}) => memberid),
    ).then(res => {
      if (res.length) {
        setNowEdit(res[0]);
      }
      setTableData(listToPage(res, 10));
    });
  }, [list, bridgereportid]);

  React.useEffect(() => {
    if (!fileList || !list) {
      return;
    }
    if (!nowEdit) {
      setImg(null);
      setRemark(null);
      setPlan([]);
      return;
    }

    // 获取图片
    const imglist = fileList.filter(
      item =>
        item.category === 'disease' &&
        item.dataid === nowEdit.version &&
        new Set(['image', 'virtualimage']).has(item.mediatype),
    );
    if (imglist.length) {
      const preference = imglist.find(({is_preference}) => !!is_preference);
      let _img = preference || imglist[0];
      if (!_img?.is_source) {
        _img = fileList.find(item => item.parentmediaid === _img.parentmediaid);
      }
      setImg(_img);
    } else {
      setImg(null);
    }

    // 获取描述
    const jsondata = JSON.parse(nowEdit.jsondata);
    setRemark(jsondata.remark || '描述');

    // 获取计划
    storage.getBaseItem('部件养护计划信息').then(r => {
      const bermaintPlan = r.data || [];
      const {membertype} =
        list?.find(({memberid}) => memberid === nowEdit.dataid) || {};
      const {list: _plan} =
        bermaintPlan[0]?.list?.find(item => item.membertype === membertype) ||
        {};
      setPlan(_plan || []);
      if (!_plan) {
        return;
      }
      // 内容数据
      partsPlanGenesisData
        .get({
          checkstatusdataid: nowEdit.version,
          category,
          bridgereportid,
        })
        .then(res => {
          console.info(res);
          if (!res && _plan.length) {
            partsPlanGenesisData.save({
              checkstatusdataid: nowEdit.version,
              bridgereportid,
              membertype,
              jsondata: JSON.stringify({}),
              category,
              userid: userInfo.userid,
            });
          } else {
            setData(JSON.parse(res.jsondata));
          }
        });
    });
  }, [nowEdit, fileList, list, bridgereportid, userInfo]);

  const getHeaderItems = () => {
    if (!project.projectname) {
      return [];
    }
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
        onPress: () => navigation.goBack(),
      },
      {
        name: '养护计划',
      },
    ];
  };

  const getMemberName = item => {
    return list.find(({memberid}) => memberid === item.dataid)?.membername;
  };

  const getTypeName = item => {
    const jsondata = JSON.parse(item.jsondata);
    if (jsondata?.areatype) {
      const membertype = list.find(
        ({memberid}) => memberid === item.dataid,
      )?.membertype;
      const components = membercheck.list.find(
        it => membertype === it.membertype,
      ).list;
      return components.find(
        ({checktypeid}) => checktypeid === jsondata.checktypeid,
      )?.checkinfoshort;
    }
    return '';
  };

  const handleChenge = ({name, value}) => {
    const _data = {
      ...data,
      [name]: value,
    };
    partsPlanGenesisData.update({
      jsondata: JSON.stringify(_data),
      checkstatusdataid: nowEdit.version,
      category,
      bridgereportid,
    });
    setData(_data);
  };

  return (
    <Box headerItems={getHeaderItems()} pid="P1301">
      <HeaderTabs disabled={true} />
      <View style={tailwind.flex1}>
        <Content>
          <View style={[styles.card, {width:710, backgroundColor:'#fff'}]}>
            <View style={[tailwind.flex1, tailwind.flexRow]}>
              <View style={[tailwind.flex1]}>
                <Text style={[styles.title, {color:'#2b427d'}]}>
                  病害列表
                </Text>
                <View style={styles.tableBox}>
                  <Table.Header>
                    <Table.Title title="选择" flex={1} />
                    <Table.Title title="序号" flex={1} />
                    <Table.Title title="类别" flex={2} />
                    <Table.Title title="构件" flex={2} />
                  </Table.Header>
                  <FlatList
                    scrollEnabled={false}
                    data={tableData[tablePageNo - 1] || []}
                    extraData={tableData}
                    renderItem={({item, index}) => (
                      <Table.Row key={index}>
                        <Table.Cell flex={1}>
                          <Checkbox
                            onPress={() => setNowEdit(item)}
                            checked={nowEdit?.id === item.id}
                          />
                        </Table.Cell>
                        <Table.Cell flex={1}>{index + 1}</Table.Cell>
                        <Table.Cell flex={2}>{getTypeName(item)}</Table.Cell>
                        <Table.Cell flex={2}>{getMemberName(item)}</Table.Cell>
                      </Table.Row>
                    )}
                  />
                </View>
                <Table.Pagination
                  pageNo={tablePageNo}
                  onPageChange={setTablePageNo}
                  numberOfPages={tableData.length}
                />
              </View>
              <View style={tailwind.mX2} />
              <View style={[styles.flex2]}>
                <View style={[styles.flex2, tailwind.flexRow, tailwind.mB2]}>
                  <View style={[tailwind.flex1]}>
                    <Text style={[styles.title, {color:'#2b427d'}]}>
                      照片
                    </Text>
                    {img ? (
                      img.mediatype === 'image' ? (
                        <Image
                          style={styles.img}
                          source={{uri: 'file://' + img.filepath}}
                        />
                      ) : (
                        <View style={styles.img}>
                          <Text
                            style={[
                              tailwind.text2xl,
                              tailwind.fontBold,
                              theme.primaryTextStyle,
                            ]}>
                            {img.filename}
                          </Text>
                        </View>
                      )
                    ) : (
                      <View style={styles.img}>
                        <Icon name="folder-multiple-image" size={40} />
                      </View>
                    )}
                  </View>
                  <View style={tailwind.mX2} />
                  <View style={[tailwind.flex1]}>
                    <Text style={[styles.title, {color:'#2b427d'}]}>
                      描述
                    </Text>
                    <View style={[styles.remarkBox]}>
                      <Text>{remark}</Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.flex3]}>
                  <Text style={[styles.title, {color:'#2b427d'}]}>
                    养护计划
                  </Text>
                  <View style={tailwind.flex1}>
                    {plan &&
                      plan.map(
                        (
                          {maintplanname, maintplanid, maintplanunit},
                          index,
                        ) => (
                          <View
                            style={[tailwind.flexRow, tailwind.mB2]}
                            key={index}>
                            <TextInput
                              key={index}
                              name={maintplanid}
                              style={tailwind.flex1}
                              value={data[maintplanid] || ''}
                              onChange={handleChenge}
                              label={`${maintplanname}(${maintplanunit})：`}
                            />
                          </View>
                        ),
                      )}
                  </View>
                </View>
              </View>
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
    ...tailwind.p2,
  },
  tableBox: {
    ...tailwind.flex1,
    ...tailwind.borderGray400,
    ...tailwind.border,
  },
  title: {
    ...tailwind.fontBold,
    ...tailwind.mB1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  img: {
    ...tailwind.bgGray400,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
    ...tailwind.flex1,
  },
  remarkBox: {
    ...tailwind.p1,
    ...tailwind.flex1,
    ...tailwind.border,
    ...tailwind.borderGray400,
  },
});
