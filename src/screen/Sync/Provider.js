import React from 'react';
import * as uploadData from '../../utils/upload-data';
import * as bridge from '../../database/bridge';
import * as project from '../../database/project';
import * as bridgeProjectBind from '../../database/bridge_project_bind';
import * as bridgeMember from '../../database/bridge_member';
import * as uploadStateRecord from '../../database/upload_state_record';
import * as uploadLog from '../../database/upload_log';
import reducer from '../../providers/reducer';
import {Context as GlobalContext} from '../../providers/GlobalProvider';
import {alert} from '../../utils/alert';
import storage from '../../utils/storage';
import * as createData from './createData';
import { BucketName_storeTestData } from '../../assets/uploadConfig/OBSConfig';
//AWS配置
import { AWSBucket } from '../../assets/uploadConfig/AWSConfig'
// 上传配置
import { UploadObjectStorageName } from '../../assets/uploadConfig/UploadConfig';

import fs from '../../utils/fs'
import RNFS from 'react-native-fs';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    //testDataUploadProject: null,
    nowUploadingTestDataInx: -1,
    // 当前上传的图片总数
    curUploadImgAllNUm:0,
    // 当前上传成功的图片数
    curUploadImgSucNUm:0,

    planMeta: [],
    genesisMate: [],
    membercheckdata: [],

    promptFontErr:{},
    deviceId:''
  });

  React.useEffect(() => {
    getBaseData().then(res => {
      const [planMeta, membercheckdata, genesisMate] = res;
      dispatch({type: 'planMeta', payload: planMeta});
      dispatch({type: 'membercheckdata', payload: membercheckdata});
      dispatch({type: 'genesisMate', payload: genesisMate});
    });
  }, []);

  // 获取设备id
  React.useEffect(()=>{
    let deviceId = DeviceInfo.getUniqueId()
    AsyncStorage.setItem('deviceId', deviceId?deviceId.toUpperCase():'');
    dispatch({type: 'deviceId', payload: deviceId?deviceId.toUpperCase():''});
  },[])

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

  // 检测数据上传
  React.useEffect(() => {
    if (
      !userInfo ||
      !state.planMeta ||
      !state.membercheckdata ||
      !state.genesisMate
    ) {
      return;
    }
    dispatch({
      type: 'curUploadImgAllNUm',
      payload: 0
    })
    dispatch({
      type: 'curUploadImgSucNUm',
      payload: 0
    })
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
          type: 'testDataFefreshFlg',
          payload: Math.random().toString(36).slice(-8),
        });
        let errFont = ''
        if(JSON.stringify(state.promptFontErr)=='{}'){
          errFont = '上传完成'
        }else{
          errFont = '上传完成，其中以下检测数据上传失败：'
          Object.keys(state.promptFontErr).forEach((key,index)=>{
            errFont = errFont + '\n\n' + (index + 1) + '、' + key + '上传失败：'
            if(state.promptFontErr[key].collateDataErr){
              errFont = errFont + '\n' + '1)' + state.promptFontErr[key].collateDataErr
            }
            if(state.promptFontErr[key].testDataFont){
              errFont = errFont + '\n' + '1)' + '检测数据上传失败，失败原因：' + state.promptFontErr[key].testDataFont
            }
            if(state.promptFontErr[key].mediaDataFont&&state.promptFontErr[key].mediaDataFont.length>0){
              errFont = errFont + '\n' 
                      + (state.promptFontErr[key].testDataFont?'2)':'1)' )
                      + '媒体数据上传失败' 
                      + state.promptFontErr[key].mediaDataFont.length + '条，失败原因：' 
                      + state.promptFontErr[key].mediaDataFont[0]
            }
            if(state.promptFontErr[key].otherErr){
              errFont = errFont + '\n' + '1)' + '检测数据上传失败，失败原因：' + state.promptFontErr[key].otherErr
            }
          })
        }
        alert(errFont,
          ()=>dispatch({
            type: 'promptFontErr',
            payload: {}
          })
        );
      } else {
        const upload = async () => {
          try {
            // 设置当前上传的图片总数
            dispatch({
              type: 'curUploadImgAllNUm',
              payload: 0
            })
            dispatch({
              type: 'curUploadImgSucNUm',
              payload: 0
            })
            // 获取数据
            const allData = await createData.getData(
              state.testDataUploadingIds[inx],
              state.planMeta,
              state.genesisMate,
              state.membercheckdata,
              basememberinfo
            );
            let successImgNum = 0
            // console.log("allData",JSON.stringify(allData) );
            if(allData.state){
              // 数据整理成功
              const data = allData.data
              const mediaData = allData.mediaData
              // 设置当前上传的图片总数
              dispatch({
                type: 'curUploadImgAllNUm',
                payload: allData.mediaData.length
              })
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
              
              //---------键值
              // 企业编号/用户编号/桥梁编号/桥梁检测编号/对象文件编号
              let ObsReportDataKey = userInfo.company.companyid + '/'
                          + data.testData.userid + '/'
                          + data.bridgeid + '/'
                          + data.testData.bridgereportid + '/'
                          + 'reportData.json'
              //---------上传反馈数据
              let feedbackParams = {
                bucketname:BucketName_storeTestData,
                objectkey:ObsReportDataKey,
                obsstorage:1,
                objecttype:'txt',
                objectsize:fileSize,
                downserver:'00000000-0000-0000-0000-0242ac130006',
                projectkey:data.testData.projectid,
                objectinfo:{
                  companyid:userInfo.company.companyid,
                  userid:data.testData.userid,
                  filenameuser:data.testData.bridgereportid,
                  filenamesys:data.testData.bridgereportid,
                  filesize:Math.floor(fileSize/1024*100)/100,
                  filetypes:'.json',
                  dirpath:ObsReportDataKey.replace("reportData.json",""),
                  fileinfo:'',
                  filemd5:'',//obs反馈的etag
                  projectkey:data.testData.projectid,
                  createtime:fileCTime+"",
                  checkbridgeid:data.testData.bridgereportid,
                  bridgename:data.bridgename
                }
              }
              // 测试数据上传成功 标志位
              let testDataUploadSuccess = true
              // 媒体数据上传成功 标志位
              let mediaDataUploadSuccess = true

              // 判断是上传到华为云 还是 上传到紫光云
              if(UploadObjectStorageName=='OBS'){
                // 上传到华为云
                feedbackParams.bucketname = BucketName_storeTestData
                // 上传检测数据到云
                await uploadData.syncUploadTestDataToObs(ObsReportDataKey,JSON.stringify(data)).then(async res=>{
                  let newFeedbackParams = feedbackParams
                  newFeedbackParams.objectinfo.filemd5 = (res.InterfaceResult.ETag.replace("\"","")).replace("\"","")
                  //---------反馈
                  await uploadData.syncUploadToObsAfterFeedback(newFeedbackParams).then(res=>{
                  }).catch(err=>{
                    let errObj = state.promptFontErr
                    let name = data.testData.projectname + '-' + data.bridgename
                    if(errObj[name]){
                      errObj[name]['testDataFont'] = err
                    }else{
                      errObj[name] = {
                        testDataFont:err
                      }
                    }
                    dispatch({
                      type: 'promptFontErr',
                      payload: errObj
                    })
                    // 测试数据上传成功 标志位
                    testDataUploadSuccess = false
                  })
                }).catch(err=>{
                  let errObj = state.promptFontErr
                  let name = data.testData.projectname + '-' + data.bridgename
                  if(errObj[name]){
                    errObj[name]['testDataFont'] = err
                  }else{
                    errObj[name] = {
                      testDataFont:err
                    }
                  }
                  dispatch({
                    type: 'promptFontErr',
                    payload: errObj
                  })
                  // 测试数据上传成功 标志位
                  testDataUploadSuccess = false
                })
                // 上传媒体数据到云
                await Promise.all(
                  mediaData
                    .filter(({filepath}) => filepath)
                    .map(async item => {
                      //将文件地址分割获取文件名
                      let arr = item.appliedPath.split('/')
                      //拼接key
                      let key = userInfo.company.companyid + '/'
                        + data.testData.userid + '/'
                        + data.bridgeid + '/'
                        + data.testData.bridgereportid + '/'
                        + arr[arr.length-1].replace("jpg","jpeg")
                      return await uploadData.uploadImageToObs(key,item.appliedPath).then(res=>{
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
                          successImgNum++
                          dispatch({
                            type: 'curUploadImgSucNUm',
                            payload: successImgNum
                          })
                        }).catch(err=>{
                          let errObj = state.promptFontErr
                          let name = data.testData.projectname + '-' + data.bridgename
                          if(errObj[name]){
                            if(errObj[name]['mediaDataFont']){
                              errObj[name]['mediaDataFont'].push(err)
                            }else{
                              errObj[name]['mediaDataFont'] = [err]
                            }
                          }else{
                            errObj[name] = {
                              mediaDataFont:[err]
                            }
                          }
                          dispatch({
                            type: 'promptFontErr',
                            payload: errObj
                          })
                          // 媒体数据上传成功 标志位
                          mediaDataUploadSuccess = false
                        })
                      }).catch(err=>{
                          let errObj = state.promptFontErr
                          let name = data.testData.projectname + '-' + data.bridgename
                          if(errObj[name]){
                            if(errObj[name]['mediaDataFont']){
                              errObj[name]['mediaDataFont'].push(err)
                            }else{
                              errObj[name]['mediaDataFont'] = [err]
                            }
                          }else{
                            errObj[name] = {
                              mediaDataFont:[err]
                            }
                          }
                          dispatch({
                            type: 'promptFontErr',
                            payload: errObj
                          })
                          // 媒体数据上传成功 标志位
                          mediaDataUploadSuccess = false
                      })
                    }),
                );
              }else{
                // 上传到紫光云
                feedbackParams.bucketname = AWSBucket.defaultBucket
                // 上传检测数据到云
                await uploadData.syncUploadTestDataToAWS(ObsReportDataKey,JSON.stringify(data)).then(async res=>{
                  let newFeedbackParams = feedbackParams
                  newFeedbackParams.objectinfo.filemd5 = (res.ETag.replace("\"","")).replace("\"","")
                  //---------反馈
                  await uploadData.syncUploadToAWSAfterFeedback(newFeedbackParams).then(res=>{
                  }).catch(err=>{
                    let errObj = state.promptFontErr
                    let name = data.testData.projectname + '-' + data.bridgename
                    if(errObj[name]){
                      errObj[name]['testDataFont'] = err
                    }else{
                      errObj[name] = {
                        testDataFont:err
                      }
                    }
                    dispatch({
                      type: 'promptFontErr',
                      payload: errObj
                    })
                    // 测试数据上传成功 标志位
                    testDataUploadSuccess = false
                  })
                }).catch(err=>{
                  console.log("err",err);
                  let errObj = state.promptFontErr
                  let name = data.testData.projectname + '-' + data.bridgename
                  if(errObj[name]){
                    errObj[name]['testDataFont'] = err
                  }else{
                    errObj[name] = {
                      testDataFont:err
                    }
                  }
                  dispatch({
                    type: 'promptFontErr',
                    payload: errObj
                  })
                  // 测试数据上传成功 标志位
                  testDataUploadSuccess = false
                })
                // 上传媒体数据到云
                await uploadImgSingle(0,successImgNum,userInfo,data,feedbackParams,mediaDataUploadSuccess,mediaData,state,dispatch)
              }
             
              // 判断是否上传成功
              if(testDataUploadSuccess&&mediaDataUploadSuccess){
                // 上传状态
                await uploadStateRecord.update({
                  state:3,
                  bridgereportid:data.testData.bridgereportid
                });
                // 上传记录
                await uploadLog.save({
                  dataid: state.testDataUploadingIds[inx],
                  category: '检测数据',
                  to_projcet_id: data.testData.projectid,
                  to_projcet_name: data.testData.projectname,
                });
              }else{
                await uploadStateRecord.update({
                  state:2,
                  bridgereportid:data.testData.bridgereportid
                });
              }
            }else{
              // 数据整理失败
              let errObj = state.promptFontErr
              let name = allData.data.projectname + '-' + (allData.data.bridgename?allData.data.bridgename:'')
              console.log("name",name);
              if(errObj[name]){
                errObj[name]['collateDataErr'] = '数据整理错误，错误原因：' + allData.err
              }else{
                errObj[name] = {
                  collateDataErr:'数据整理错误，错误原因：' + allData.err
                }
              }
              dispatch({
                type: 'promptFontErr',
                payload: errObj
              })
              // 上传状态记录表
              await uploadStateRecord.update({
                state:2,
                bridgereportid:allData.data.bridgereportid
              });
            }
            dispatch({
              type: 'testDataUploadEndIds',
              payload: state.testDataUploadingIds?.slice(0, inx + 1),
            });




            //---------将数据标记为已上传
            // 上传状态记录表
           /*  await uploadStateRecord.update({
              state:3,
              bridgereportid:data.bridgereportid
            });
            await uploadLog.save({
              dataid: state.testDataUploadingIds[inx],
              category: '检测数据',
              to_projcet_id: state.testDataUploadProject.projectid,
              to_projcet_name: state.testDataUploadProject.projectname,
            });
            dispatch({
              type: 'testDataUploadEndIds',
              payload: state.testDataUploadingIds?.slice(0, inx + 1),
            }); */
            
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
            // ----- 记录上传原因
            let errObj = state.promptFontErr
            const bindData = await bridgeProjectBind.getById(state.testDataUploadingIds[inx]);
            const bridgeData = await bridge.getByBridgeid(bindData.bridgeid);
            const projectData = await project.getByProjectid(bindData.projectid)
            let name = projectData.projectname + '-' + bridgeData.bridgename
            if(errObj[name]){
              errObj[name]['otherErr'] = err
            }else{
              errObj[name] = {
                testDataFont:err
              }
            }
            dispatch({
              type: 'promptFontErr',
              payload: errObj
            })
            // ----数据库记录上传状态
            await uploadStateRecord.update({
              state:2,
              bridgereportid:bindData.bridgereportid
            });
            console.info('errr',err);
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

// 递归上传
const uploadImgSingle =async (index,successImgNum,userInfo,data,feedbackParams,mediaDataUploadSuccess,mediaData,state,dispatch) => {
  //将文件地址分割获取文件名
  let arr = mediaData[index].appliedPath.split('/')
  //拼接key
  let key = userInfo.company.companyid + '/'
    + data.testData.userid + '/'
    + data.bridgeid + '/'
    + data.testData.bridgereportid + '/'
    + arr[arr.length-1].replace("jpg","jpeg")
  await uploadData.uploadImageToAWS(key,mediaData[index].appliedPath).then(async res=>{
    successImgNum++
    dispatch({
      type: 'curUploadImgSucNUm',
      payload: successImgNum
    })
    //设置反馈参数
    let newFeedbackParams = {
      ...feedbackParams,
      objectkey:key,
      objecttype:'img',
      objectsize:mediaData[index].filesize,
      objectinfo:{
        ...feedbackParams.objectinfo,
        filenameuser:mediaData[index].filename + '.' + mediaData[index].filetypes.replace("jpg","jpeg"),
        filenamesys:arr[arr.length-1].replace("jpg","jpeg"),
        filesize:Math.floor(mediaData[index].filesize/1024*100)/100,
        filetypes:'.' + mediaData[index].filetypes.replace("jpg","jpeg"),
        filemd5:(res.ETag.replace("\"","")).replace("\"",""),
        createtime:mediaData[index].u_date
      }
    }
    //---------反馈
    await uploadData.syncUploadToAWSAfterFeedback(newFeedbackParams).then(async res=>{
      if((index+1)<mediaData.length){
        await uploadImgSingle(index+1,successImgNum,userInfo,data,feedbackParams,mediaDataUploadSuccess,mediaData,state,dispatch)
      }
    }).catch(async err=>{
      if((index+1)<mediaData.length){
        await uploadImgSingle(index+1,successImgNum,userInfo,data,feedbackParams,mediaDataUploadSuccess,mediaData,state,dispatch)
      }
      let errObj = state.promptFontErr
      let name = data.testData.projectname + '-' + data.bridgename
      if(errObj[name]){
        if(errObj[name]['mediaDataFont']){
          errObj[name]['mediaDataFont'].push(err)
        }else{
          errObj[name]['mediaDataFont'] = [err]
        }
      }else{
        errObj[name] = {
          mediaDataFont:[err]
        }
      }
      dispatch({
        type: 'promptFontErr',
        payload: errObj
      })
      // 媒体数据上传成功 标志位
      mediaDataUploadSuccess = false
    })
  }).catch(async err=>{
    if(index+1<mediaData.length){
      await uploadImgSingle(index+1,successImgNum,userInfo,data,feedbackParams,mediaDataUploadSuccess,mediaData,state,dispatch)
    }
      let errObj = state.promptFontErr
      let name = data.testData.projectname + '-' + data.bridgename
      if(errObj[name]){
        if(errObj[name]['mediaDataFont']){
          errObj[name]['mediaDataFont'].push(err)
        }else{
          errObj[name]['mediaDataFont'] = [err]
        }
      }else{
        errObj[name] = {
          mediaDataFont:[err]
        }
      }
      dispatch({
        type: 'promptFontErr',
        payload: errObj
      })
      // 媒体数据上传成功 标志位
      mediaDataUploadSuccess = false
  })
}

export {Context, Consumer, Provider};
