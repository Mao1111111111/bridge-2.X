import React from 'react';
import * as uploadData from '../../utils/upload-data';
import * as bridge from '../../database/bridge';
import * as bridgeMember from '../../database/bridge_member';
import * as uploadLog from '../../database/upload_log';
import reducer from '../../providers/reducer';
import {Context as GlobalContext} from '../../providers/GlobalProvider';
import {alert} from '../../utils/alert';
import storage from '../../utils/storage';
import * as createData from './createData';
import { BucketName_storeTestData } from '../../assets/OBSConfig';

const Context = React.createContext();

const Consumer = Context.Consumer;

const getBaseData = async () => {
  const data = [];
  try {
    const planMeta = await storage.getBaseItem('部件养护计划信息');
    data.push(planMeta.data[0] || []);
    data.push((await storage.getBaseItem('病害程度单位列表')).data || []);
    data.push((await storage.getBaseItem('桥梁部件病害成因')).data || []);
  } catch (err) {
    console.info(err);
  } finally {
    return data;
  }
};

function Provider({children}) {
  const {
    state: {userInfo,basememberinfo},
  } = React.useContext(GlobalContext);

  const [state, dispatch] = React.useReducer(reducer, {
    bridgeFefreshFlg: null,
    bridgeUploadingIds: [],
    bridgeUploadEndIds: [],
    nowUploadingBridgeInx: -1,

    testDataFefreshFlg: null,
    testDataUploadingIds: [],
    testDataUploadEndIds: [],
    testDataUploadProject: null,
    nowUploadingTestDataInx: -1,

    planMeta: [],
    genesisMate: [],
    membercheckdata: [],
  });

  React.useEffect(() => {
    getBaseData().then(res => {
      const [planMeta, membercheckdata, genesisMate] = res;
      dispatch({type: 'planMeta', payload: planMeta});
      dispatch({type: 'membercheckdata', payload: membercheckdata});
      dispatch({type: 'genesisMate', payload: genesisMate});
    });
  }, []);

  // 桥梁上传
  React.useEffect(() => {
    if (!userInfo) {
      return;
    }
    if (state.bridgeUploadingIds.length) {
      const inx = state.nowUploadingBridgeInx + 1;
      console.info(inx, state.bridgeUploadingIds.length);
      if (inx === state.bridgeUploadingIds.length) {
        dispatch({
          type: 'nowUploadingBridgeInx',
          payload: -1,
        });
        dispatch({
          type: 'bridgeUploadingIds',
          payload: [],
        });
        dispatch({
          type: 'bridgeUploadEndIds',
          payload: [],
        });
        dispatch({
          type: 'bridgeFefreshFlg',
          payload: Math.random().toString(36).slice(-8),
        });
        alert('上传完成');
      } else {
        const upload = async () => {
          try {
            const data = await bridge.get(state.bridgeUploadingIds[inx]);
            const member = await bridgeMember.list(data.bridgeid);
            data.bridgeconfig = JSON.parse(data.bridgeconfig);
            const {success} = await uploadData.syncCreateBridgeList(
              [data],
              userInfo.token.access_token,
            );
            if (success) {
              const res = await uploadData.syncCreateBridgeMemberList(
                member,
                userInfo.token.access_token,
              );
              if (res.success) {
                await uploadLog.save({
                  dataid: state.bridgeUploadingIds[inx],
                  category: '桥梁数据',
                });
                dispatch({
                  type: 'bridgeUploadEndIds',
                  payload: state.bridgeUploadingIds.slice(0, inx + 1),
                });
              }
            }
          } catch (err) {
            console.info(err);
          } finally {
            dispatch({
              type: 'nowUploadingBridgeInx',
              payload: inx,
            });
          }
        };
        setTimeout(() => upload(), 500);
      }
    }
  }, [state.bridgeUploadingIds, state.nowUploadingBridgeInx, userInfo]);

  React.useEffect(() => {
    if (
      !userInfo ||
      !state.testDataUploadProject ||
      !state.planMeta ||
      !state.membercheckdata ||
      !state.genesisMate
    ) {
      return;
    }
    // console.info(
    //   '?',
    //   state.nowUploadingTestDataInx + 1,
    //   state.testDataUploadingIds.length,
    // );
    if (state.testDataUploadingIds.length) {
      const inx = state.nowUploadingTestDataInx + 1;

      if (inx === state.testDataUploadingIds.length) {
        dispatch({
          type: 'nowUploadingTestDataInx',
          payload: -1,
        });
        dispatch({
          type: 'testDataUploadingIds',
          payload: [],
        });
        dispatch({
          type: 'testDataUploadEndIds',
          payload: [],
        });
        dispatch({
          type: 'testDataUploadProject',
          payload: null,
        });
        dispatch({
          type: 'testDataFefreshFlg',
          payload: Math.random().toString(36).slice(-8),
        });
        alert('上传完成');
      } else {
        const upload = async () => {
          console.log("1111");
          try {
            // 获取数据
            const data = await createData.getData(
              state.testDataUploadingIds[inx],
              state.planMeta,
              state.genesisMate,
              state.membercheckdata,
              basememberinfo
            );
            //存储到华为云的键值
            let ObsKey = 'testData'
            
            //上传反馈数据
            let feedbackParams = {
              bucketname:BucketName_storeTestData,
              objectkey:ObsKey,
              obsstorage:'StorageClassStandard',
              objecttype:'json',
              objectsize:0,
              downserver:'00000000-0000-0000-0000-bcaec5b80c54',
              projectkey:data.testData.projectid,
              objectinfo:{
                companyid:BucketName_storeTestData,
                userid:data.testData.userid
              }
            }
            console.log("data",data);
            console.log("len",JSON.stringify(data).length);
            //上传到云
            //await uploadData.syncUploadTestDataToObs(ObsKey,JSON.stringify(data));

            /* const data = await createData.getTestData(
              state.testDataUploadingIds[inx],
              state.planMeta,
              state.genesisMate,
              state.membercheckdata,
              basememberinfo
            ); */
             // console.log("data",data);
         /*   if (data) {
              // 桥梁项目关联数据
              await uploadData.syncCreateReportListToObs(
                state.testDataUploadProject.projectid,
                data.bridgeReportData ? [data.bridgeReportData] : [],
                userInfo.token.access_token,
              );
              // 桥梁项目关联构件数据
              await uploadData.syncCreateReportMemberListToObs(
                data.bridgeReportMemberData,
                userInfo.token.access_token,
              );
              // 检测记录
              await uploadData.syncCreateMemberCheckStatusToObs(
                data.membercheckstatus,
                userInfo.token.access_token,
              );
              // 检测记录扩展数据
              const _testData = data.testData.filter(
                ({datatype}) => datatype !== 'c1003',
              );
              const updata = [];
              _testData.forEach(item => {
                if (!updata.find(({dataid}) => item.dataid === dataid)) {
                  updata.push(item);
                }
              });
              await uploadData.syncCreateCheckStatusDataJsonToObs(
                updata,
                userInfo.token.access_token,
              );

              // 裂缝数据
              await uploadData.syncCreateMemberCheckStatusC1003ToObs(
                data.testData.filter(({datatype}) => datatype === 'c1003'),
                userInfo.token.access_token,
              );

              // 病害程度值
              await uploadData.syncCreateCheckStatusDataStrValueToObs(
                data.strvaluearr,
                userInfo.token.access_token,
              );

              // 媒体数据
              await uploadData.syncCreateCheckStatusMediaToObs(
                data.mediaData,
                userInfo.token.access_token,
              );

              // 媒体数据扩展数据;
              await Promise.all(
                data.mediaData
                  .filter(({filepath}) => filepath)
                  .map(async item => {
                    return await uploadData.uploadImageToObs(
                      {
                        uri: item.filepath,
                        type: item.filename.split('.').pop(),
                        size: item.filesize,
                        name: item.filename,
                      },
                      item.filename,
                      userInfo.token.access_token,
                    );
                  }),
              );
              await uploadLog.save({
                dataid: state.testDataUploadingIds[inx],
                category: '检测数据',
                to_projcet_id: state.testDataUploadProject.projectid,
                to_projcet_name: state.testDataUploadProject.projectname,
              });
            } */

            /* dispatch({
              type: 'testDataUploadEndIds',
              payload: state.testDataUploadingIds?.slice(0, inx + 1),
            }); */
          } catch (err) {
            console.info(err);
          } finally {
            console.info('>???', inx);
            dispatch({
              type: 'nowUploadingTestDataInx',
              payload: inx,
            });
          }
        };
        setTimeout(() => upload(), 500);
      }
    }
  }, [
    state.testDataUploadingIds,
    state.testDataUploadProject,
    state.nowUploadingTestDataInx,
    state.planMeta,
    state.membercheckdata,
    state.genesisMate,
    userInfo,
  ]);

  return (
    <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>
  );
}

export {Context, Consumer, Provider};
