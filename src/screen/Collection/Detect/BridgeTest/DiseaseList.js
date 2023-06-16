import React from 'react';
import {Modal, Portal} from 'react-native-paper';
import {tailwind} from 'react-native-tailwindcss';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, FlatList, TouchableOpacity, StyleSheet,Dimensions} from 'react-native';
import {Context} from './Provider';
import {Context as ThemeContext} from '../../../../providers/ThemeProvider';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';
import * as partsCheckstatusData from '../../../../database/parts_checkstatus_data';
import {Box, Content} from '../../../../components/CommonView';
import Checkbox from '../../../../components/Checkbox';
import Table from '../../../../components/Table';
import {score, numeric} from '../../../../utils/score';
import {listToPage} from '../../../../utils/common';
import HeaderTabs from './HeaderTabs';
import {confirm} from '../../../../utils/alert';
import { getBaseData } from './utils';
import uuid from 'react-native-uuid';

const TypeModel = React.forwardRef(({groupList, callBack,memberList}, ref) => {
  //console.log("groupList",groupList);
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const [visible, setVisible] = React.useState(false);

  const [nowEdit, setNowEdit] = React.useState({});

  React.useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
  }));

  //一级菜单点击时
  const firstDisTypeListChange = async (item) => {
    setNowEdit(item)
    //设置二级菜单选中项
    setSecondDisTypeSel(item.list[0])
    //设置三级菜单
    const res = await getBaseData(memberList, item.list[0]);
    setThridDisTypeList(res.infoComponents)
    // console.log('一级菜单点击',item);
  }

   //二级菜单选中项
   const [secondDisTypeSel,setSecondDisTypeSel] = React.useState(null)
   //二级菜单点击时
   const secondDisTypeListChange =async (item) => {
     setSecondDisTypeSel(item)
     const res = await getBaseData(memberList, item);
     setThridDisTypeList(res.infoComponents)
    //  console.log('二级菜单点击',item);
   }

   //三级菜单列表
   const [thridDisTypeList,setThridDisTypeList] = React.useState([])
   //三级菜单点击时
   const thridDisTypeListChange = (item) => {
    let data = {
      firstDisTypeData:nowEdit,
      secondDisTypeData:secondDisTypeSel,
      thridDisTypeData:item
    }
    close();
    callBack && callBack(data);
   }

  React.useEffect(() => {
    // console.log("groupList",groupList);
    // console.log('memberList',memberList);
    if (groupList && groupList.length) {
      groupList[0] && setNowEdit(groupList[0]);
      if(setSecondDisTypeSel){
        setSecondDisTypeSel(groupList[0].list[0])
      }
      (
        async () => {
          let newMemberList = memberList
          if(memberList[0].membertype=='b100006'){
            newMemberList[0] = {...memberList[0],membertype: 'b100001'}
          }
          if(memberList[0].membertype=='b100007'){
            newMemberList[0] = {...memberList[0],membertype: 'b100003'}
          }
          const res = await getBaseData(memberList, groupList[0].list[0])
          setThridDisTypeList(res.infoComponents)
        }
      )()
    }
  }, [groupList]);

  const close = () => {
    setVisible(false);
  };

  const handlePress = item => {
    close();
    callBack && callBack(item);
  };

  //图标忽略
  const IconIgnore = [
    '0',
    'train-car-box-full',
    'wrench-cog-outline',
    'filter-settings-outline',
    'tally-mark-3'
  ]

  return (
    <Portal>
      <Modal
        contentContainerStyle={styles.model}
        onDismiss={close}
        visible={visible}>
        <View style={[styles.modelBody, theme.primaryBgStyle]}>
          {groupList && groupList.length ? (
            <>
              <View style={[tailwind.flex1]}>
                <FlatList
                  data={groupList}
                  extraData={groupList}
                  ItemSeparatorComponent={() => (
                    <View
                      style={[
                        tailwind.borderT,
                        tailwind.borderGray400,
                        tailwind.mY2,
                      ]}
                    />
                  )}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => firstDisTypeListChange(item)}
                      //onPress={() => handlePress(item)}
                      style={[tailwind.flexRow, tailwind.itemsCenter]}>
                      <Icon
                        name={
                          IconIgnore.indexOf(item.checktypegrouplogo)!==-1?'bug':item.checktypegrouplogo
                        }
                        style={
                          nowEdit.checktypegroupid === item.checktypegroupid
                            ? {color:'#2b427d'}
                            : {}
                        }
                        size={30}
                      />
                      <Text
                        style={[
                          tailwind.textLg,
                          tailwind.mL2,
                          nowEdit.checktypegroupid === item.checktypegroupid
                            ? {color:'#2b427d'}
                            : {},
                        ]}>
                        {item.checktypegroupname}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <View
                style={[tailwind.mR1, tailwind.borderR, tailwind.borderGray400]}
              />
              <View style={tailwind.flex1}>
                <FlatList
                  data={nowEdit.list}
                  extraData={nowEdit.list}
                  ItemSeparatorComponent={() => (
                    <View
                      style={[
                        // tailwind.borderT,
                        // tailwind.borderGray400,
                        tailwind.mY2,
                      ]}
                    />
                  )}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      key={index}
                      onPress={()=>secondDisTypeListChange(item)}
                      //onPress={() => handlePress(item)}
                      style={[tailwind.flexRow, tailwind.itemsCenter]}>
                      <Icon
                        name={
                          IconIgnore.indexOf(item.checktypegrouplogo)!==-1?'bug':item.checktypegrouplogo
                        }
                        style={
                          (secondDisTypeSel.checktypegroupid==item.checktypegroupid)&&{color:'#2b427d'}
                        }
                        size={30}
                      />
                      <Text 
                        style={[tailwind.textLg,
                          tailwind.mL2,
                          (secondDisTypeSel.checktypegroupid==item.checktypegroupid)&&{color:'#2b427d'}]}>
                        {item.checktypegroupname}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              {
                <>
                  <View
                    style={[tailwind.mR1, tailwind.borderR, tailwind.borderGray400]}
                  />
                  <View style={tailwind.flex1}>
                    <FlatList
                      data={thridDisTypeList}
                      extraData={thridDisTypeList}
                      ItemSeparatorComponent={() => (
                        <View
                          style={[
                            tailwind.mY2,
                          ]}
                        />
                      )}
                      renderItem={({item, index}) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => thridDisTypeListChange(item)}
                          style={[tailwind.flexRow, tailwind.itemsCenter]}>
                          <Text style={[tailwind.textLg, tailwind.mL2]}>
                            {item.checkinfoshort}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </>
              }
              
            </>
          ) : (
            <View
              style={[
                tailwind.flex1,
                tailwind.justifyCenter,
                tailwind.itemsCenter,
              ]}>
              <Text style={tailwind.text2xl}>该部件没有病害分组</Text>
            </View>
          )}
        </View>
      </Modal>
    </Portal>
  );
});

export default function DiseaseList({route, navigation}) {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const {
    state: {bridgeside},
  } = React.useContext(GlobalContext);

  const {
    state: {project, bridge, fileList, isLoading, groupList},
  } = React.useContext(Context);

  const [tableData, setTableData] = React.useState([]);

  const [tablePageNo, setTablePageNo] = React.useState(1);

  const [total, setTotal] = React.useState(1);

  const [nowEdit, setNowEdit] = React.useState(null);

  const [group, setGroup] = React.useState([]);

  const [waitingData, setWaitingData] = React.useState([]);

  const [scores, setScores] = React.useState(100);

  const typeModelRef = React.useRef();

  const {title, list, dataGroupId, routeParams} = route.params;

  const [screenWidth,setScreenWidth] = React.useState() //屏幕宽度

  React.useEffect(() => {
    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
  },[])

  useFocusEffect(
    React.useCallback(() => {
      if (!list || group.length !== 0 || groupList.length === 0) {
        return;
      }
      if (
        groupList?.find(({membertype}) => membertype === list[0].membertype)
      ) {
        setGroup(
          groupList?.find(({membertype}) => membertype === list[0].membertype)
            .list,
        );
      }
    }, [list, group, groupList]),
  );

  useFocusEffect(
    React.useCallback(() => {
      // console.log('123321');
      if (!list || isLoading) {
        return;
      }
      partsCheckstatusData
        .list({
          bridgereportid: list[0].bridgereportid,
          memberstatus: 200,
          dataid: list[0].memberid,
          dataGroupId,
        })
        .then(res => {
          const _list = [];
          res.forEach((item, index) => {
            if (!_list.find(it => it.version === item.version)) {
              console.log('病害录入页面返回传入的数据',item.jsondata);
              // console.log('病害录入页面返回传入的scale',item.jsondata.areatype);
              if (item.jsondata.scale =='4') {
                item.jsondata.scale = '2'
              }
              item.jsondata = JSON.parse(item.jsondata || '{}');
              item.index = index + 1;
              if (item?.jsondata?.standard?.scale) {
                item.score =
                  numeric(item?.jsondata?.standard?.scale)[
                    item.jsondata.scale
                  ] || 0;
              }
              _list.push(item);
            }
          });
          if (_list.length === 1) {
            setScores(100 - (_list[0].score || 0));
          } else if (_list.length > 1) {
            const m = {};
            _list.forEach(item => {
              if (m[item.scalegroupid || 'not']) {
                m[item.scalegroupid || 'not'].push(item.score || 0);
              } else {
                m[item.scalegroupid || 'not'] = [item.score || 0];
              }
            });
            const scoreList = [...(m.not || [])];
            Object.keys(m)
              .filter(key => key !== 'not')
              .forEach(key => {
                scoreList.push(Math.max(...m[key]));
              });
            setScores(
              parseFloat(
                (100 - score(scoreList).reduce((a, c) => a + c)).toFixed(3),
              ),
            );
          }
          setTotal(_list.length + 1);
          setNowEdit(null);

          setTableData(listToPage(_list, 10));

          console.log('DiseaseList route', route);
          console.log('res[0].jsondata', route.params.list[0].membertype);
          // console.log('list',list);
        });
    }, [list, isLoading, dataGroupId]),
  );

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
        // onPress: () => navigation.goBack(),
        onPress: () =>
          navigation.navigate('Collection/Detect/BridgeTest/Member', {
            data: route.params.routeParams,
          }),
      },
      {
        name:
          list.length > 1 ? '病害批量录入' : `${list[0].membername}-病害录入`,
      },
    ];
  };

  const handleAdd = data => {
    console.log('222');
    if(list[0].membertype=='b100006'){
      let a = groupList.find(({membertype}) => membertype === 'b100001').list
      setGroup(a)
    }
    if(list[0].membertype=='b100007'){
      let a = groupList.find(({membertype}) => membertype === 'b100003').list
      setGroup(a)
    }
    typeModelRef.current.open();
    setWaitingData(data);
  };

  const handleEdit = data => {
    console.log('data',data);
    if (!data) {
      return;
    }
    const type = group
      .map(item => item.list)
      .flat()
      .find(item => data.jsondata.checktypegroupid === item.checktypegroupid);
      const kuaMembertype = route.params.list[0].membertype
    const url =
      type.paneltype === 'p1001'
        ? 'Collection/Detect/BridgeTest/Member/DiseaseEdit'
        : 'Collection/Detect/BridgeTest/Member/DiseaseEdit2';
    navigation.navigate(url, {
      title,
      type,
      data: data,
      memberList: list,
      dataGroupId,
      routeParams,
      kuaMembertype,
      mediaType:'edit'
    });
  };


 /*  const handleModelCallBack = type => {
    const url =
      type.paneltype === 'p1001'
        ? 'Collection/Detect/BridgeTest/Member/DiseaseEdit'
        : 'Collection/Detect/BridgeTest/Member/DiseaseEdit2';
    navigation.navigate(url, {
      title,
      type,
      data: waitingData,
      memberList: list,
      dataGroupId,
      routeParams
    });
    setWaitingData({});
  }; */

  const handleModelCallBack = data => {
    console.log("data6661",data.secondDisTypeData.paneltype);
    console.log("data6662",waitingData,routeParams);
    console.log('handleModelCallBack data',data);
    console.log('route.params.list[0].membertype1',route.params.list[0].membertype);
    const kuaMembertype = route.params.list[0].membertype
    const url =
      data.secondDisTypeData.paneltype === 'p1001'
        ? 'Collection/Detect/BridgeTest/Member/DiseaseEdit'
        : 'Collection/Detect/BridgeTest/Member/DiseaseEdit2';
    navigation.navigate(url, {
      title,
      stairgroupid:data.firstDisTypeData.checktypegroupid,
      type:data.secondDisTypeData,
      thridData:data.thridDisTypeData,
      data: {
        ...waitingData,
        version:uuid.v4(),
        kuaMembertype
      },
      memberList: list,
      dataGroupId,
      routeParams,
      mediaType:'add'
    });
    setWaitingData({});
  };

/*   const handleModelCallBack = type => {
    console.log("type",type);
    
    const url =
      type.list[0].paneltype === 'p1001'
        ? 'Collection/Detect/BridgeTest/Member/DiseaseEdit'
        : 'Collection/Detect/BridgeTest/Member/DiseaseEdit2';
    navigation.navigate(url, {
      title,
      type:type.list[0],
      data: waitingData,
      memberList: list,
      dataGroupId,
      routeParams,
      disList:type.list,
      topName:type.checktypegroupname
    });
    setWaitingData({});
  }; */

  const handleDelete = async () => {
    if (!nowEdit) {
      return;
    }
    confirm('是否删除选中的数据？', async () => {
      await partsCheckstatusData.remove({
        ...nowEdit,
        dataGroupId,
        dataid: list[0].memberid,
      });
      partsCheckstatusData
        .list({
          bridgereportid: list[0].bridgereportid,
          memberstatus: 200,
          dataid: list[0].memberid,
          dataGroupId,
        })
        .then(res => {
          const _list = [];
          res.forEach((item, index) => {
            if (!_list.find(it => it.version === item.version)) {
              item.jsondata = JSON.parse(item.jsondata || '{}');
              item.index = index + 1;
              if (item?.jsondata?.standard?.scale) {
                item.score =
                  numeric(item?.jsondata?.standard?.scale)[
                    item.jsondata.scale
                  ] || 0;
              }
              _list.push(item);
            }
          });
          if (_list.length === 1) {
            setScores(100 - _list[0].score);
          } else if (_list.length > 1) {
            const m = {};
            _list.forEach(item => {
              if (m[item.scalegroupid || 'not']) {
                m[item.scalegroupid || 'not'].push(item.score);
              } else {
                m[item.scalegroupid || 'not'] = [item.score];
              }
            });
            const scoreList = [...(m.not || [])];
            Object.keys(m)
              .filter(key => key !== 'not')
              .forEach(key => {
                scoreList.push(Math.max(...m[key]));
              });
            setScores(
              parseFloat(
                (100 - score(scoreList).reduce((a, c) => a + c)).toFixed(3),
              ),
            );
          }
          setTableData(listToPage(_list, 10));
        });
    });
  };

  const handleCheck = item => {
    if (item.id === nowEdit?.id) {
      setNowEdit(null);
    } else {
      setNowEdit({...item});
    }
  };

  // 回退
  const goBack = () => {
    console.log('点击了goBack');
    try {
      navigation.goBack()
    } catch (e) {
      console.log('goBack err', e);
    }
  }

  return (
    <Box headerItems={getHeaderItems()} navigation={navigation} pid="P1603" labelname={route.params.title} membername={list[0].membername} projectList={project} project={project.projectname} bridge={bridge.bridgename}>
      <HeaderTabs disabled={true} />
      <View style={[tailwind.flex1]}>
        <Content
          onAdd={() => handleAdd({list: [], index: total})}
          onEdit={nowEdit && (() => handleEdit(nowEdit))}
          onDelete={nowEdit && handleDelete}
          onBack={goBack}
          onAhead={nowEdit && (() => handleEdit(nowEdit))}>
            {/* [styles.card, {backgroundColor:'rgba(255,255,255,1)',right:11.5,width:715,top:1,borderRadius:5}] */}
          <View style={
            screenWidth > 830 ? [styles.card, {backgroundColor:'rgba(255,255,255,1)',right:11.5,width:715,top:1,borderRadius:5}]
            :
            [styles.card, {backgroundColor:'rgba(255,255,255,1)',right:19,width:715,top:1,borderRadius:5}]
          }>
            <View style={[tailwind.flex1, tailwind.flexRow]}>
              <View style={[tailwind.flex1]}>
                <Text style={[styles.title, {color:'#2b427d'}]}>
                  病害列表 评分：{scores}
                </Text>
                <View style={styles.tableBox}>
                  <Table.Header>
                    <Table.Title title="选择" flex={1} />
                    <Table.Title title="时间" flex={3} />
                    <Table.Title title="名称" flex={2} />
                    <Table.Title title="范围" flex={4} />
                    <Table.Title title="影音" flex={1} />
                    <Table.Title title="标度" flex={1} />
                    <Table.Title title="评分" flex={1} />
                  </Table.Header>
                  <FlatList
                    extraData={tableData}
                    data={tableData[tablePageNo - 1] || []}
                    renderItem={({item, index}) => (
                      <Table.Row key={index} onPress={() => handleCheck(item)}>
                        <Table.Cell flex={1}>
                          <Checkbox
                            onPress={() => handleCheck(item)}
                            checked={nowEdit?.id === item.id}
                          />
                        </Table.Cell>
                        <Table.Cell flex={3}>{item.u_date}</Table.Cell>
                        <Table.Cell flex={2}>
                          {item.jsondata?.diseaseName}
                        </Table.Cell>
                        <Table.Cell flex={4}>
                          {item.jsondata?.remark?.split('，').slice(1).join()}
                        </Table.Cell>
                        <Table.Cell flex={1}>
                          {
                            fileList.filter(it => it.dataid === item.version)
                              .length
                          }
                        </Table.Cell>
                        <Table.Cell flex={1}>
                          {item?.jsondata?.scale}
                        </Table.Cell>
                        <Table.Cell flex={1}>{item.score || 0}</Table.Cell>
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
            </View>
          </View>
        </Content>
      </View>
      <TypeModel
        memberList={list}
        groupList={group}
        callBack={handleModelCallBack}
        ref={typeModelRef}
      />
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
    ...tailwind.mB1,
  },
  tableBox: {
    ...tailwind.flex1,
    ...tailwind.borderGray400,
    ...tailwind.border,
  },
  model: {
    width: 600,
    ...tailwind.selfCenter
  },
  modelBody: {
    ...tailwind.p4,
    ...tailwind.rounded,
    ...tailwind.flexRow,
    ...tailwind.h64,
  },
});
