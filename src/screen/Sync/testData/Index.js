import React, {useEffect} from 'react';
import * as bridgeReport from '../../../database/bridge_report';
import {tailwind} from 'react-native-tailwindcss';
import {useFocusEffect} from '@react-navigation/native';
import {ProgressBar, Modal, Portal} from 'react-native-paper';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import Tabs from '../../../components/Tabs';
import {Box} from '../../../components/CommonView';
import {bridgeList} from '../../../database/bridge_project_bind';
import * as uploadStateRecord from '../../../database/upload_state_record';
import {Context as GlobalContext} from '../../../providers/GlobalProvider';
import {Context as ThemeContext} from '../../../providers/ThemeProvider';
import {syncGetProject, syncGroups} from '../../../utils/upload-data';
import {Context} from '../Provider';
import NotSync from './NotSync';
import Synced from './Synced';
import { uploadToObs } from '../../../utils/OBS';

const ProjectModel = React.forwardRef(({projectList, callBack}, ref) => {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const [visible, setVisible] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
  }));

  const close = () => {
    setVisible(false);
  };

  const handlePress = item => {
    close();
    callBack && callBack(item);
  };

  return (
    <Portal>
      <Modal
        contentContainerStyle={styles.model}
        onDismiss={close}
        visible={visible}>
        <View style={[styles.modelBody, theme.primaryBgStyle]}>
          <Text style={[tailwind.textCenter, tailwind.textLg]}>
            请选择云端项目
          </Text>
          <FlatList
            data={projectList}
            extraData={projectList}
            ItemSeparatorComponent={() => (
              <View
                style={[tailwind.borderT, tailwind.borderGray400, tailwind.mY2]}
              />
            )}
            renderItem={({item, index}) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(item)}
                style={[tailwind.flexRow, tailwind.pY1, tailwind.itemsCenter]}>
                <Text style={[tailwind.textLg, tailwind.mL2]}>
                  {item.projectname}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </Portal>
  );
});

export default function TestData({navigation}) {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const {
    state: {userInfo},
  } = React.useContext(GlobalContext);

  const {
    dispatch,
    state: {testDataUploadingIds, testDataFefreshFlg, testDataUploadEndIds},
  } = React.useContext(Context);

  const [active, setActive] = React.useState('未上传');

  const [list, setList] = React.useState([]);

  //const [project, setProject] = React.useState([]);

  const [waitingData, setWaitingData] = React.useState([]);

  //const projectModelRef = React.useRef();

  const tabs = [
    {
      key: '未上传',
      name: '未上传',
    },
    {
      key: '已上传',
      name: '已上传',
    },
  ];

  useFocusEffect(
    React.useCallback(() => {
      if (userInfo || testDataFefreshFlg) {
        bridgeList(userInfo.userid).then(async res => {
          res.forEach(item => (item.id = item.bindId));
          // 表格数据 =  已上传 + 未上传
          let data = []
          // 将没有检测的数据排除
          for(let i=0;i<res.length;i++){
            let testData = await bridgeReport.get(res[i]);
            if(testData){
              // 获取检测状态
              const uploadState = await uploadStateRecord.getById(res[i].bridgereportid)
              //console.log("state",uploadStatestate);
              // 默认检测数据为未上传
              let state = 0
              if(uploadState){
                // 当上传状态表中存在时，上传状态为表中数据
                state = uploadState.state
              }else{
                // 当上传状态表中不存在数据时，上传状态根据上传记录表判断
                if(res[i].upload_date){
                  state = 3
                }
                // 并将数据存入上传状态表
                await uploadStateRecord.save({
                  bridgeid: res[i].bridgeid,
                  bridgereportid:res[i].bridgereportid,
                  userid: res[i].userid
                });
              }
              // 将上传状态存入数据
              data.push({
                ...res[i],
                uploadState:state
              })
            }
          }
          setList(data);
        });
      }
    }, [userInfo, testDataFefreshFlg]),
  );

  // useEffect(() => {
  //   console.info(list);
  // }, [list]);

  // 获取项目列表
  // useEffect(() => {
  //   const getproject = async (user_id, access_token) => {
  //     // 获取组
  //     const {
  //       list: [groupsData],
  //     } = await syncGroups(user_id, access_token);
  //     // 获取组项目
  //     const datas = (
  //       await Promise.all(
  //         groupsData.groups
  //           .filter(item => item.group.group_id)
  //           .map(async item => {
  //             const res = await syncGetProject(
  //               item.group.group_id,
  //               access_token,
  //             );
  //             if (res.list.length) {
  //               return res.list[0].projects;
  //             }
  //             return [];
  //           }),
  //       )
  //     ).flat();
  //     // 获取组用户项目
  //     const {
  //       list: [{projects}],
  //     } = await syncGetProject(user_id, access_token);
  //     // 合并组和用户项目并去重
  //     const projectMap = {};
  //     datas
  //       .concat(projects)
  //       .forEach(item => (projectMap[item.projectid] = item));
  //     setProject(Object.keys(projectMap).map(key => projectMap[key]));
  //   };
  //   if (userInfo) {
  //     getproject(userInfo.userid, userInfo.token.access_token);
  //   }
  // }, [userInfo]);

  const handleUpload = e => {
    // setWaitingData(e);
    // console.log('e',e);
    //projectModelRef.current.open();
    // dispatch({
    //   type: 'testDataUploadProject',
    //   payload: e,
    // });
    dispatch({
      type: 'testDataUploadingIds',
      payload: Array.from(new Set([...e])),
    });
  };

  // const handleModelCallBack = e => {
  //   dispatch({
  //     type: 'testDataUploadProject',
  //     payload: e,
  //   });
  //   dispatch({
  //     type: 'testDataUploadingIds',
  //     payload: Array.from(new Set([...waitingData])),
  //   });
  // };

  const renderTable = () => {
    switch (active) {
      case '未上传':
        return (
          <NotSync
            onUpload={handleUpload}
            list={list.filter(
              ({upload_date, id, uploadState}) =>
                /* !upload_date && !testDataUploadingIds.find(it => it === id), */
                uploadState!==3 && !testDataUploadingIds.find(it => it === id),
            )}
          />
        );
      case '已上传':
        return (
          <Synced
            onUpload={handleUpload}
            list={list.filter(
              ({upload_date, id, uploadState}) =>
                /* upload_date && !testDataUploadingIds.find(it => it === id), */
                uploadState==3 && !testDataUploadingIds.find(it => it === id),
            )}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <Box
      headerItems={[
        {
          name: '数据同步',
          onPress: () => navigation.navigate('Collection/Sync/Main'),
        },
        {
          name: '上传检测数据',
        },
      ]}>
      <View style={[tailwind.flex1, tailwind.pY2]}>
        <View style={[styles.tab]}>
          <Tabs onChangeTab={setActive} defaultActive="未上传" tabs={tabs} style={[{position:'absolute',left:73}]} />
          <View style={[tailwind.mY2]}></View>
          {testDataUploadingIds.length ? (
            <View style={[styles.progressBar]}>
              <Text style={tailwind.mR2}>
                上传中({testDataUploadEndIds.length}/
                {testDataUploadingIds.length})
              </Text>
              <ProgressBar
                progress={
                  testDataUploadEndIds.length / testDataUploadingIds.length
                }
                style={[tailwind.rounded, tailwind.w40, tailwind.h3]}
                color={theme.primaryColor}
              />
            </View>
          ) : (
            <></>
          )}
        </View>
        {renderTable()}
      </View>
      {/* <ProjectModel
        ref={projectModelRef}
        callBack={handleModelCallBack}
        projectList={project}
      /> */}
    </Box>
  );
}

const styles = StyleSheet.create({
  tab: {
    ...tailwind.flexRow,
    ...tailwind.justifyBetween,
    ...tailwind.pX16,
    ...tailwind.mB2,
  },
  card: {
    ...tailwind.flex1,
    ...tailwind.shadow2xl,
    ...tailwind.rounded,
    ...tailwind.p2,
  },
  progressBar: {
    ...tailwind.itemsCenter,
    ...tailwind.flexRow,
    ...tailwind.mR1,
  },
  model: {
    ...tailwind.w56,
    ...tailwind.selfCenter,
  },
  modelBody: {
    ...tailwind.p4,
    ...tailwind.rounded,
  },
});
