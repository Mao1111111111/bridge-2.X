import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';

const host = 'http://testdata.api.jianlide.cn:1088';

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

/*
 * 创建桥梁检测构件列表
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/aco8zg
 * 输入参数：要创建的多条桥梁检测构件列表对象（https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/aco8zg?inner=AXJXh）
 */
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

/*
 * 创建检测构件检测记录
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/gc9s1z
 * 输入参数：要创建的多条桥梁检测构件检测记录对象(https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/gc9s1z)
 */
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

/*
 * 创建数据记录
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/dv15xf
 * 输入参数：要创建的多条数据记录对象(https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/dv15xf?inner=AXJXh)
 */
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

/*
 * 创建病害程度值
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/mg8vfp
 * 输入参数：要创建的多条病害程度值对象(https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/mg8vfp?inner=AXJXh)
 */
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

/*
 * 创建裂缝记录
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/xztavu
 * 输入参数：要创建的多条裂缝记录对象（https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/xztavu?inner=AXJXh）
 */
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

/*
 * 创建媒体数据
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/ndxen6
 * 输入参数：要创建的多条媒体数据对象(https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/ndxen6?inner=juipg)
 */
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

/*
 * 文件上传
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/zaaeg9
 * 输入参数：上传文件内容（基于RFC1867标准的HTML中表单的文件）。 filename 必须包含文件扩展名
 * 文件类型：mp3, mp4, jpeg, jpg, png
 */
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
