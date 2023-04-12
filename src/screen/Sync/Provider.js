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
import AsyncStorage from '@react-native-async-storage/async-storage';
import fs from '../../utils/fs'
import RNFS from 'react-native-fs';

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
          try {
            // 获取数据
            const allData = await createData.getData(
              state.testDataUploadingIds[inx],
              state.planMeta,
              state.genesisMate,
              state.membercheckdata,
              basememberinfo
            );
            const data = allData.data
            const mediaData = allData.mediaData
            // 处理数据中的 检测部件id
            if(data.testData.detailTestData.length>0){
              data.testData.detailTestData.forEach(item=>{
                item.partid = data.testData.bridgereportid + '_' + item.positionid + '_' + item.membertype
              })
            }
            //---------对检测数据操作
            //---文件夹
            // 文件夹地址，根据 桥id 建立文件夹
            let dirPath = RNFS.DocumentDirectoryPath + '/testData/' + data.bridgeid
            // 创建文件夹
            await fs.mkdir(dirPath)
            //---写入本地
            // 文件地址 = 桥梁文件夹 + 检测id
            let dataPath = dirPath + '/' + data.testData.bridgereportid + '.txt'
            // 将数据存入本地
            await fs.write(dataPath,JSON.stringify(data),'utf8')
            //---获取文件信息
            //文件大小
            let fileSize = 0
            //文件创建时间
            let fileCTime = ''
            await fs.getFileInfo(dataPath).then(res=>{
              fileSize = res.size
              fileCTime = res.ctime
            })
            //--将GMT时间 转换为 yyyy-mm-dd
            let date = new Date(fileCTime)
            fileCTime = date.getFullYear() + '-' +
            (date.getMonth() + 1) + '-' + 
            date.getDate() + ' ' + 
            date.getHours() + ':' + 
            date.getMinutes() + ':' + 
            date.getSeconds()

            //---------存储到华为云的键值
            // 获取用户信息
            const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'))
            // 企业编号/用户编号/桥梁编号/桥梁检测编号/对象文件编号
            let ObsReportDataKey = userInfo.company.companyid + '/'
                        + data.testData.userid + '/'
                        + data.bridgeid + '/'
                        + data.testData.bridgereportid + '/'
                        + 'reportData.txt'
            //---------上传反馈数据
            let feedbackParams = {
              bucketname:BucketName_storeTestData,
              objectkey:ObsReportDataKey,
              obsstorage:1,
              objecttype:'txt',
              objectsize:fileSize,
              downserver:'00000000-0000-0000-0000-bcaec5b80c54',
              projectkey:data.testData.projectid,
              objectinfo:{
                companyid:userInfo.company.companyid,
                userid:data.testData.userid,
                filenameuser:data.testData.bridgereportid,
                filenamesys:data.testData.bridgereportid,
                filesize:Math.floor(fileSize/1024*100)/100,
                filetypes:'.json',
                dirpath:ObsReportDataKey.replace("reportData.txt",""),
                fileinfo:'',
                filemd5:'',//obs反馈的etag
                projectkey:data.testData.projectid,
                createtime:fileCTime+"",
                checkbridgeid:data.testData.bridgereportid,
                bridgename:data.bridgename
              }
            }
            //---------上传检测数据到云
            await uploadData.syncUploadTestDataToObs(ObsReportDataKey,JSON.stringify(data)).then(async res=>{
              let newFeedbackParams = feedbackParams
              newFeedbackParams.objectinfo.filemd5 = (res.InterfaceResult.ETag.replace("\"","")).replace("\"","")
              //---------反馈
              await uploadData.syncUploadToObsAfterFeedback(newFeedbackParams).then(res=>{
                //console.log("res",res);
              }).catch(err=>console.log("err",err))
            }).catch(err=>console.log("err",err))

            //---------上传媒体数据到云
            await Promise.all(
              mediaData
                .filter(({filepath}) => filepath)
                .map(async item => {
                  //将文件地址分割获取文件名
                  let arr = item.filepath.split('/')
                  //拼接key
                  let key = userInfo.company.companyid + '/'
                    + data.testData.userid + '/'
                    + data.bridgeid + '/'
                    + data.testData.bridgereportid + '/'
                    + arr[arr.length-1].replace("jpg","jpeg")
                  return await uploadData.uploadImageToObs(key,item.filepath).then(res=>{
                    //设置反馈参数
                    let newFeedbackParams = {
                      ...feedbackParams,
                      objectkey:key,
                      objecttype:'img',
                      objectsize:item.filesize,
                      objectinfo:{
                        ...feedbackParams.objectinfo,
                        filenameuser:item.filename + '.' + item.filetypes.replace("jpg","jpeg"),
                        filenamesys:arr[arr.length-1].replace("jpg","jpeg"),
                        filesize:Math.floor(item.filesize/1024*100)/100,
                        filetypes:'.' + item.filetypes.replace("jpg","jpeg"),
                        filemd5:(res.InterfaceResult.ETag.replace("\"","")).replace("\"",""),
                        createtime:item.u_date
                      }
                    }
                    //---------反馈
                    uploadData.syncUploadToObsAfterFeedback(newFeedbackParams).then(res=>{
                      console.log("res",res);
                    }).catch(err=>console.log("err",err))
                  }).catch(err=>console.log("err",err))
                }),
            );

            //---------将数据标记为已上传
            await uploadLog.save({
              dataid: state.testDataUploadingIds[inx],
              category: '检测数据',
              to_projcet_id: state.testDataUploadProject.projectid,
              to_projcet_name: state.testDataUploadProject.projectname,
            });
            dispatch({
              type: 'testDataUploadEndIds',
              payload: state.testDataUploadingIds?.slice(0, inx + 1),
            });

            //------以下注释为 原上传逻辑
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
            } */
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
