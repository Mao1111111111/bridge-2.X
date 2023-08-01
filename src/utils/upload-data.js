import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import { uploadTestDataToObs } from './OBS';

const host = 'http://testdata.api.jianlide.cn:1088';
const feedbackHost = 'http://114.116.196.47:10807'; 

/*
 * 获取桥梁项目列表
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/wuw7r0
 */
export const syncGetProject = (groupid, access_token) =>
  new Promise((resolve, reject) => {
    const path = '/api/v1/sync/getproject';
    const url = [host, path, `?groupid=${groupid}`];
    axios
      .get(url.join(''), {
        headers: {
          access_token_cookie: access_token,
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(response => {
        if (response.data.resultCode === 200) {
          resolve(response.data.resultJson);
        } else {
          reject(response.data.resultMsg);
        }
      })
      .catch(err => reject(err));
  });
//console.log(await syncGetProject());

/*
 * 获取组数据
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/rml7ot
 */
export const syncGroups = (userid, access_token) =>
  new Promise((resolve, reject) => {
    console.log('参数userid', userid);
    const path = '/api/v1/org/groups';
    const url = [host, path /*`?userid=${userid}`*/];
    axios
      .get(url.join(''), {
        headers: {
          access_token_cookie: access_token,
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(response => {
        if (response.data.resultCode === 200) {
          resolve(response.data.resultJson);
        } else {
          reject(response.data.resultMsg);
        }
      })
      .catch(err => reject(err));
  });

/*
 * 创建桥梁构件列表
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/vy7ggt
 * 输入参数：数组//要创建的多条桥梁构件列表对象(https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/vy7ggt?inner=AXJXh)
 */
// 用了桥梁上传
export const syncCreateBridgeMemberList = (objects, access_token) =>
  new Promise((resolve, reject) => {
    const url = [host, '/api/v1/sync/createbridgememberlist'];
    axios
      .post(
        url.join(''),
        {objects},
        {
          headers: {
            access_token_cookie: access_token,
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(response => {
        console.info(response);
        if (response.data.resultCode === 200) {
          resolve(response.data);
        } else {
          reject(response.data.resultMsg);
        }
      })
      .catch(err => reject(err));
  });
//console.log(await syncCreateBridgeMemberList([]));

/*
 * 创建桥梁列表
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/wu280x
 * 输入参数：要创建的多条桥梁列表对象(https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/wu280x?inner=AXJXh)
 */
// 用了桥梁上传
export const syncCreateBridgeList = (objects, access_token) =>
  new Promise((resolve, reject) => {
    const url = [host, '/api/v1/sync/createbridgelist'];
    axios
      .post(
        url.join(''),
        {objects},
        {
          headers: {
            access_token_cookie: access_token,
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(response => {
        if (response.data.resultCode === 200) {
          resolve(response.data);
        } else {
          reject(response.data.resultMsg);
        }
      })
      .catch(err => reject(err));
  });
//console.log(await syncCreateBridgeList([]));

/*
 * 创建桥梁检测列表
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/ayep1s
 * 输入参数：项目编码、要创建的多条桥梁检测列表对象(https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/ayep1s?inner=AXJXh)
 */
// 未用
export const syncCreateReportList = (project_id, objects, access_token) =>
  new Promise((resolve, reject) => {
    const url = [host, '/api/v1/sync/createreportlist'];
    console.info('桥梁项目关联数据');
    axios
      .post(
        url.join(''),
        {project_id, objects},
        {
          headers: {
            access_token_cookie: access_token,
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(response => {
        if (response.data.resultCode === 200) {
          resolve(response.data);
        } else {
          reject(response.data.resultMsg);
        }
      })
      .catch(err => reject(err));
  });
//console.log(await syncCreateReportList("test_project_id", []));
// 未用
export const syncCreateReportListToObs = (project_id, objects, access_token) =>
  new Promise((resolve, reject) => {
    console.info('桥梁项目关联数据');
    console.log("project_id",project_id);
    console.log("objects",objects);
   /*  uploadTestDataToObs(project_id,{project_id, objects}).then(res=>{
      resolve(res);
    }).catch(err=>{
      reject(err);
    }) */
  }); 

/*
 * 创建桥梁检测构件列表
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/aco8zg
 * 输入参数：要创建的多条桥梁检测构件列表对象（https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/aco8zg?inner=AXJXh）
 */
// 未用
export const syncCreateReportMemberList = (objects, access_token) =>
  new Promise((resolve, reject) => {
    const url = [host, '/api/v1/sync/createreportmemberlist'];
    console.info('桥梁项目关联构件数据');
    axios
      .post(
        url.join(''),
        {objects},
        {
          headers: {
            access_token_cookie: access_token,
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(response => {
        if (response.data.resultCode === 200) {
          resolve(response.data);
        } else {
          reject(response.data.resultMsg);
        }
      })
      .catch(err => reject(err));
  });
//console.log(await syncCreateReportMemberList([]));
// 未用
export const syncCreateReportMemberListToObs = (objects, access_token) =>
  new Promise((resolve, reject) => {
    console.info('桥梁项目关联构件数据');
    /* uploadTestDataToObs('ReportMemberList',objects).then(res=>{
      resolve(res);
    }).catch(err=>{
      reject(err);
    }) */
  });

/*
 * 创建检测构件检测记录
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/gc9s1z
 * 输入参数：要创建的多条桥梁检测构件检测记录对象(https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/gc9s1z)
 */
// 未用
export const syncCreateMemberCheckStatus = (objects, access_token) =>
  new Promise((resolve, reject) => {
    const url = [host, '/api/v1/sync/createmembercheckstatus'];
    console.info('检测记录');
    axios
      .post(
        url.join(''),
        {objects},
        {
          headers: {
            access_token_cookie: access_token,
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(response => {
        if (response.data.resultCode === 200) {
          resolve(response.data);
        } else {
          console.log(response);
          reject(response.data.resultMsg);
        }
      })
      .catch(err => reject(err));
  });
//console.log(await syncCreateMemberCheckStatus([]));
// 未用
export const syncCreateMemberCheckStatusToObs = (objects, access_token) =>
  new Promise((resolve, reject) => {
    console.info('检测记录');
    uploadTestDataToObs('MemberCheckStatus',objects).then(res=>{
      resolve(res);
    }).catch(err=>{
      reject(err);
    })
  });

/*
 * 创建数据记录
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/dv15xf
 * 输入参数：要创建的多条数据记录对象(https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/dv15xf?inner=AXJXh)
 */
// 未用
export const syncCreateCheckStatusDataJson = (objects, access_token) =>
  new Promise((resolve, reject) => {
    const url = [host, '/api/v1/sync/createcheckstatusdatajson'];
    console.info('检测记录扩展数据');
    axios
      .post(
        url.join(''),
        {objects},
        {
          headers: {
            access_token_cookie: access_token,
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(response => {
        if (response.data.resultCode === 200) {
          resolve(response.data);
        } else {
          reject(response.data.resultMsg);
        }
      })
      .catch(err => reject(err));
  });
//console.log(await syncCreateMemberCheckStatus([]));
// 未用
export const syncCreateCheckStatusDataJsonToObs = (objects, access_token) =>
  new Promise((resolve, reject) => {
    console.info('检测记录扩展数据');
    uploadTestDataToObs('CheckStatusDataJson',objects).then(res=>{
      resolve(res);
    }).catch(err=>{
      reject(err);
    })
  });

/*
 * 创建病害程度值
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/mg8vfp
 * 输入参数：要创建的多条病害程度值对象(https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/mg8vfp?inner=AXJXh)
 */
// 未用
export const syncCreateCheckStatusDataStrValue = (objects, access_token) =>
  new Promise((resolve, reject) => {
    const url = [host, '/api/v1/sync/createcheckstatusdatastrvalue'];
    console.info('病害程度值');
    axios
      .post(
        url.join(''),
        {objects},
        {
          headers: {
            access_token_cookie: access_token,
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(response => {
        if (response.data.resultCode === 200) {
          resolve(response.data);
        } else {
          reject(response.data.resultMsg);
        }
      })
      .catch(err => reject(err));
  });
//console.log(await syncCreateCheckStatusDataStrValue([]));
// 未用
export const syncCreateCheckStatusDataStrValueToObs = (objects, access_token) =>
  new Promise((resolve, reject) => {
    console.info('病害程度值');
    uploadTestDataToObs('CheckStatusDataStrValue',objects).then(res=>{
      resolve(res);
    }).catch(err=>{
      reject(err);
    })
  });

/*
 * 创建裂缝记录
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/xztavu
 * 输入参数：要创建的多条裂缝记录对象（https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/xztavu?inner=AXJXh）
 */
// 未用
export const syncCreateMemberCheckStatusC1003 = (objects, access_token) =>
  new Promise((resolve, reject) => {
    const url = [host, '/api/v1/sync/createmembercheckstatusc1003'];
    console.info('裂缝数据');
    axios
      .post(
        url.join(''),
        {objects},
        {
          headers: {
            access_token_cookie: access_token,
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(response => {
        if (response.data.resultCode === 200) {
          resolve(response.data);
        } else {
          reject(response.data.resultMsg);
        }
      })
      .catch(err => reject(err));
  });
//console.log(await syncCreateMemberCheckStatusC1003([]));
// 未用
export const syncCreateMemberCheckStatusC1003ToObs = (objects, access_token) =>
  new Promise((resolve, reject) => {
    console.info('裂缝数据');
    uploadTestDataToObs('MemberCheckStatusC1003',objects).then(res=>{
      resolve(res);
    }).catch(err=>{
      reject(err);
    })
  });

/*
 * 创建媒体数据
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/ndxen6
 * 输入参数：要创建的多条媒体数据对象(https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/ndxen6?inner=juipg)
 */
// 未用
export const syncCreateCheckStatusMedia = (objects, access_token) =>
  new Promise((resolve, reject) => {
    const url = [host, '/api/v1/sync/createcheckstatusmedia'];
    console.info('媒体数据');
    axios
      .post(
        url.join(''),
        {objects},
        {
          headers: {
            access_token_cookie: access_token,
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(response => {
        if (response.data.resultCode === 200) {
          resolve(response.data);
        } else {
          reject(response.data.resultMsg);
        }
      })
      .catch(err => reject(err));
  });
//console.log(await syncCreateCheckStatusMedia([]));
// 未用
export const syncCreateCheckStatusMediaToObs = (objects, access_token) =>
  new Promise((resolve, reject) => {
    console.info('媒体数据');
    uploadTestDataToObs('MemberCheckStatusC1003',objects).then(res=>{
      resolve(res);
    }).catch(err=>{
      reject(err);
    })
  });

/*
 * 文件上传
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/zaaeg9
 * 输入参数：上传文件内容（基于RFC1867标准的HTML中表单的文件）。 filename 必须包含文件扩展名
 * 文件类型：mp3, mp4, jpeg, jpg, png
 */
// 用了，桥梁上传
export const upload = (file, filename, access_token) =>
  new Promise(async (resolve, reject) => {
    const url = [host, '/api/v1/upload/'];
    console.info('文件上传');
    RNFetchBlob.fetch(
      'POST',
      url.join(''),
      {
        access_token_cookie: access_token,
        Authorization: `Bearer ${access_token}`,
        // this is required, otherwise it won't be process as a multipart/form-data request
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'file',
          filename,
          data: RNFetchBlob.wrap(file.uri),
        },
      ],
    )
      .then(resp => resp.json())
      .then(response => {
        if (response.resultCode === 200) {
          resolve(response);
        } else {
          reject(response.resultMsg);
        }
      })
      .catch(err => console.info(err));
  });
//console.log(await upload(fs.createReadStream("package.mp4")));


  //上传检测数据到云
  export const syncUploadTestDataToObs = (key,objects) =>
  new Promise((resolve, reject) => {
    uploadTestDataToObs(key,objects).then(res=>{
      resolve(res);
    }).catch(err=>{
      reject(err);
    })
  });
  //上传媒体数据到云
export const uploadImageToObs = (key,filePath) =>
new Promise(async (resolve, reject) => {
  console.info('文件上传');
  let data = ''
  RNFetchBlob.fs.readStream(filePath,'base64',4095).then((ifstream)=>{
    ifstream.open()
    ifstream.onData((chunk) => {
      // when encoding is `ascii`, chunk will be an array contains numbers
      // otherwise it will be a string
      data += chunk
    })
    ifstream.onError((err) => {
      reject(err);
    })
    ifstream.onEnd(() => {
      uploadTestDataToObs(key,data).then(res=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  })
});
  //上传到云后，反馈到后端
  export const syncUploadToObsAfterFeedback = (params) =>
  new Promise((resolve, reject) => {
      fetch('http://server1.api.jianlide.cn:5002/api/obs/object-upload-notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(params)
      })
        .then(res => res.json())
        .then(resolve)
        .catch(err => reject(err));
  });