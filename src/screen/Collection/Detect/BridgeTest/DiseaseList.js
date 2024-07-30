import React,{useState,useEffect} from 'react';
import {Modal, Portal} from 'react-native-paper';
import {tailwind} from 'react-native-tailwindcss';
import dayjs from 'dayjs';
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
import {Context as synergyContext} from '../../Detect/SynergyProvider'

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
    //  console.log('二级菜单 item',item);
    //  console.log('二级菜单选中的病害是',item.checktypegroupname);
    //  console.log('二级菜单点击',res.infoComponents);
   }

   //三级菜单列表
   const [thridDisTypeList,setThridDisTypeList] = React.useState([])
   //三级菜单点击时
   const thridDisTypeListChange = (item) => {
    // console.log('三级菜单点击时 item',item);
    let data = {
      firstDisTypeData:nowEdit,
      secondDisTypeData:secondDisTypeSel,
      thridDisTypeData:item
    }
    // console.log('三级菜单的data',data);
    // console.log('三级菜单 thridDisTypeList',thridDisTypeList);
    close();
    callBack && callBack(data);
   }

  React.useEffect(() => {
    console.log("groupList",groupList);
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
    try {
      if (groupList) {
      if (groupList[0].checktypegroupname == '伸缩缝') {
        console.log('groupList[0]',groupList[0]);
        groupList[0].checktypegroupname = '伸缩装置'
      }
    }
    } catch (e) {
      console.log('Diseaselist 00',e);
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
            {/* 一级菜单列表 */}
              <View style={[{width:'23%'}]}>
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
              {/* 分隔竖线 */}
              <View
                style={[tailwind.mR1, tailwind.borderR, tailwind.borderGray400]}
              />
              {/* 二级菜单列表 */}
              <View style={[{width:'60%'}]}>
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
                  {/* 三级菜单列表 */}
                  <View style={[tailwind.flex1]}>
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

  // 协同检测
  const {
    state: {wsOpen,curSynergyInfo,wsConnection,operationNoteData},
  } = React.useContext(synergyContext);

  const [tableData, setTableData] = React.useState([]);

  const [tablePageNo, setTablePageNo] = React.useState(1);

  const [total, setTotal] = React.useState(1);

  const [nowEdit, setNowEdit] = React.useState(null);

  const [group, setGroup] = React.useState([]);

  const [waitingData, setWaitingData] = React.useState([]);

  const [scores, setScores] = React.useState(100);

  const typeModelRef = React.useRef();

  const {title, list, dataGroupId, routeParams,isCoop,coopData} = route.params;

  const [screenWidth,setScreenWidth] = React.useState() //屏幕宽度

  React.useEffect(() => {
    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
    console.log('wsConnection',wsConnection);
    console.log('构件列表传过来的数据',route.params);
    console.log('是否是协同检测',route.params.isCoop);
    console.log('协同检测的当前用户信息',route.params.selfCoopData);
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

              item.jsondata = JSON.parse(item.jsondata || '{}');
              item.index = index + 1;
              if (item?.jsondata?.standard?.scale) {
                item.score =
                  numeric(item?.jsondata?.standard?.scale)[
                    item.jsondata.scale
                  ] || 0;
              }
              _list.push(item);
              console.log('病害列表数据',_list);
              
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

          // console.log('DiseaseList route', route);
          // console.log('res[0].jsondata', route.params.list[0].membertype);
          // console.log('list',list);
        });
    }, [list, isLoading, dataGroupId]),
  );

  
  // 初次进入病害列表与每次向盒子发送操作记录后重置的起始时间
  const [startTime, setStartTime] = useState('')
  useEffect(()=>{
    try {
      if(!startTime){
        setStartTime(route.params.timestamp)
      }
      console.log('初次进入病害列表的时间',startTime);
      console.log('route.params.selfCoopData.realname',route.params.selfCoopData.realname);
      // 是否为协同
      if(route.params.isCoop){
        if(startTime){
          // 检查操作记录最新一条是否为开始检测，如是则不再进行发送，避免重复，否则发送
          console.log('operationNoteData...',operationNoteData);

          // 没有检测记录时，直接发送一条更改状态的数据
          if(!operationNoteData){
            console.log('if(!operationNoteData)--------------------');
            list.forEach((item)=>{
              let noteTypeData = {}
              console.log('------用户进入协同检测页面开始检测------',startTime);
              noteTypeData['isCoop'] = route.params.isCoop
              noteTypeData['memberid'] = item.memberid
              noteTypeData['membername'] = item.membername
              noteTypeData['user'] = route.params.selfCoopData.realname
              noteTypeData['dataType'] = '检测状态'
              noteTypeData['typeCode'] = '开始检测'
              noteTypeData['checkTime'] = startTime
              // console.log('向盒子发送一条更改检测状态的信息',noteTypeData);
              wsConnection.current.send(JSON.stringify(noteTypeData))
            })
            
          }

          // 有检测记录时，进行判断
          if(operationNoteData){
            console.log('if(operationNoteData).....................');
            // 找到最新的包含 dataType 的记录
            let latestRecord = null;
            for (let i = 0; i < operationNoteData.length; i++) {
              const currentRecord = operationNoteData[i];
              if (currentRecord.dataType && (!latestRecord || new Date(currentRecord.checkTime) > new Date(latestRecord.checkTime))) {
                latestRecord = currentRecord;
              }
            }

            // 如果找到了符合条件的记录，检查其 typeCode 是否为 '开始检测'
            if (latestRecord && latestRecord.typeCode == '开始检测') {
              console.log('true');
              list.forEach((item)=>{
                let noteTypeData = {}
                console.log('------用户进入协同检测页面开始检测------',startTime);
                noteTypeData['isCoop'] = route.params.isCoop
                noteTypeData['memberid'] = item.memberid
                noteTypeData['membername'] = item.membername
                noteTypeData['user'] = route.params.selfCoopData.realname
                noteTypeData['dataType'] = '检测状态'
                noteTypeData['typeCode'] = '开始检测'
                noteTypeData['checkTime'] = startTime
                console.log('向盒子发送一条更改检测状态的信息',noteTypeData);
                wsConnection.current.send(JSON.stringify(noteTypeData))
              })
            } else {
              console.log('false');
              list.forEach((item)=>{
                let noteTypeData = {}
                console.log('------用户进入协同检测页面开始检测------',startTime);
                noteTypeData['isCoop'] = route.params.isCoop
                noteTypeData['memberid'] = item.memberid
                noteTypeData['membername'] = item.membername
                noteTypeData['user'] = route.params.selfCoopData.realname
                noteTypeData['dataType'] = '检测状态'
                noteTypeData['typeCode'] = '开始检测'
                noteTypeData['checkTime'] = startTime
                console.log('向盒子发送一条更改检测状态的信息',noteTypeData);
                wsConnection.current.send(JSON.stringify(noteTypeData))
              })
            }
          }

          
        }
      }

      if(tableData[0]){
        let noteData = {}
        // 对病害列表数据进行筛选
        list.forEach((items)=>{
          tableData[0].forEach((item,index)=>{
            // 当 是协同检测 且 新增的病害数据是进入页面后新增的（避免把以前发送过的记录重复发送）
            if(route.params.isCoop && new Date(item.u_date) > new Date(startTime)){
              console.log('-------------------有新增修改');
              
              noteData['isCoop'] = route.params.isCoop
                noteData['memberid'] = items.memberid
                noteData['membername'] = items.membername
                noteData['user'] = route.params.selfCoopData.realname
                noteData['diseaseName'] = item.jsondata.diseaseName
                noteData['checkTime'] = item.u_date

                // noteData['dataType'] = '检测状态'
                // noteData['typeCode'] = '开始检测'
  
                console.log('记录在协同检测中的操作历史noteData',noteData);
                wsConnection.current.send(JSON.stringify(noteData))
              // 发送操作记录成功后重置对照时间
              setStartTime(dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'))
              console.log('重置对照时间',startTime);
            }
          })
        })
        
      }
    } catch (error) {
      console.log('转存的json error',error);
    }
    
  },[tableData])

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
    // console.log('222');
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

  const [thridData, setThridData] = React.useState();

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
      thridData,
      data: data,
      memberList: list,
      dataGroupId,
      routeParams,
      kuaMembertype,
      mediaType:'edit'
    });
  };

  const handleModelCallBack = data => {
    console.log('handleModelCallBack data',data);
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
        mediaType:'add',
        // 向病害录入页面传入协同检测信息
        isCoop, //是否是协同检测
        coopData //协同检测用户的信息
      });
    setThridData(data.thridDisTypeData)
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
    console.log('点击了goBack222');
    try {
      // navigation.goBack()

      if(route.params.isCoop){
        let endTime = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        console.log('用户退出检测返回构件列表',endTime);
        let noteTypeData = {}
        noteTypeData['isCoop'] = route.params.isCoop
        noteTypeData['memberid'] = list[0].memberid
        noteTypeData['membername'] = list[0].membername
        noteTypeData['user'] = route.params.selfCoopData.realname
        noteTypeData['dataType'] = '检测状态'
        noteTypeData['typeCode'] = '结束检测'
        noteTypeData['checkTime'] = endTime
        console.log('向盒子发送一条更改检测状态的信息',noteTypeData);
        if(wsConnection.current){
          wsConnection.current.send(JSON.stringify(noteTypeData))
        }
        
      }

      navigation.replace('Collection/Detect/BridgeTest/Member', {
        data: route.params.data,
        list: [],
      })
    } catch (e) {
      console.log('goBack err', e);
    }
  }

  return (
    <Box headerItems={getHeaderItems()} navigation={navigation} pid="P1603" labelname={route.params.title} membername={list[0].membername} projectList={project} project={project.projectname} bridge={bridge}>
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
            screenWidth > 830 ? [styles.card, {backgroundColor:'rgba(255,255,255,1)',right:27,width:715,top:1,borderRadius:5}]
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
    width: '90%',
    ...tailwind.selfCenter
  },
  modelBody: {
    ...tailwind.p4,
    ...tailwind.rounded,
    ...tailwind.flexRow,
    ...tailwind.h64,
  },
});
