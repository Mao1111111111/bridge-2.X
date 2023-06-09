import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import {syncData as syncBaseData} from '../database/base_data';
import {syncData as syncAreaData} from '../database/area';

const host = 'http://testdata.api.jianlide.cn:1088';
const prefix = '/api/v1/base/';

// const auth_host = 'http://114.116.196.47:10811'
const auth_host = 'http://server1.api.jianlide.cn:5001'
const auth_prefix = '/base/';
/**
 * 获取桥梁结构数据
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/fdanb3
 * @returns
 */
export const fetchBasememberinfo = access_token =>
  new Promise((resolve, reject) => {
    const url = [
      host,
      prefix,
      'basememberinfo',
      '?standardid=JTG-TH21-2011',
      `&r=${Math.random()}`,
    ];
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
          console.info(access_token);
        } else {
          reject(response.data.resultMsg);
        }
      })
      .catch(err => reject(err));
  });
// 验证权限
export const fetchBasememberinfo_auth = access_token => 
  new Promise((resolve, reject) => {
    const url = [
      auth_host,
      auth_prefix,
      'basememberinfo',
      '?standardid=JTG-TH21-2011'
    ];
    axios
      .get(url.join(''), {
        headers: {
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

// 测试
/*
(async () => {
    console.log("桥梁结构数据");
    try {
        const result = await fetchBasememberinfo();
        //console.log(result.list);
        result.list?.forEach(async (r) => {
            await save2Schema("Common", "桥梁结构数据", JSON.stringify(r));
        })
    } catch (err) {
        console.error(err);
    }
})();
*/

/**
 * 获取桥梁结构检测位置信息
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/wy44lp
 * @param {*} companyid
 * @returns
 */
export const fetchBasememberareainfo = (companyid, access_token) =>
  new Promise((resolve, reject) => {
    const url = [
      host,
      prefix,
      'basememberareainfo',
      `?companyid=${companyid}`,
      `&r=${Math.random()}`,
    ];
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
export const fetchBasememberareainfo_auth = access_token => 
  new Promise((resolve, reject) => {
    const url = [
      auth_host,
      auth_prefix,
      'basememberareainfo'
    ];
    axios
      .get(url.join(''), {
        headers: {
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

// 测试
/*
(async () => {
    console.log("桥梁结构检测位置");
    try {
        const result = await fetchBasememberareainfo(10000);
        //console.log(result.list[0].list);
        result.list?.forEach(async (r) => {
            await save2Schema("Common", "桥梁结构检测位置", JSON.stringify(r));
        })
    } catch (err) {
        console.error(err);
    }
})();
*/

/**
 * 获取部件养护计划信息
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/ftek7x
 * @param {*} companyid
 * @returns
 */
export const fetchBasemembermaintplan = (companyid, access_token) =>
  new Promise((resolve, reject) => {
    const url = [
      host,
      prefix,
      'basemembermaintplan',
      `?companyid=${companyid}`,
      `&r=${Math.random()}`,
    ];
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
export const fetchBasemembermaintplan_auth = access_token => 
  new Promise((resolve, reject) => {
    const url = [
      auth_host,
      auth_prefix,
      'basemembermaintplan'
    ];
    axios
      .get(url.join(''), {
        headers: {
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
// 测试
/*
(async () => {
    console.log("获取部件养护计划信息");
    try {
        const result = await fetchBasemembermaintplan(10000);
        //console.log(result.list);
        result.list?.forEach(async (r) => {
            await save2Schema("Common", "部件养护计划信息", JSON.stringify(r));
        })
    } catch (err) {
        console.error(err);
    }
})();
*/

/**
 * 获取桥梁各部件病害信息（文档内容有出入）
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/rocnud
 * @param {*} companyid
 * @returns
 */
export const fetchBasemembercheckinfo = (companyid, access_token) =>
  new Promise((resolve, reject) => {
    const url = [
      host,
      prefix,
      'basemembercheckinfo',
      `?companyid=${companyid}&r=${Math.random()}`,
    ];
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
export const fetchBasemembercheckinfo_auth = access_token => 
  new Promise((resolve, reject) => {
    const url = [
      auth_host,
      auth_prefix,
      'basemembercheckinfo'
    ];
    axios
      .get(url.join(''), {
        headers: {
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
// 测试
/*
(async () => {
    console.log("获取桥梁各部件病害信息");
    try {
        const result = await fetchBasemembercheckinfo(10000);
        //console.log(result.list);
        result.list?.forEach(async (r) => {
            await save2Schema("Common", "桥梁各部件病害信息", JSON.stringify(r));
        })
    } catch (err) {
        console.error(err);
    }
})();
*/

/**
 * 获取病害程度单位列表
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/eftoy2
 * @returns
 */
export const fetchBasemembercheckdata = access_token =>
  new Promise((resolve, reject) => {
    const url = [host, prefix, 'basemembercheckdata', `?r=${Math.random()}`];
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
export const fetchBasemembercheckdata_auth = access_token => 
  new Promise((resolve, reject) => {
    const url = [
      auth_host,
      auth_prefix,
      'basemembercheckdata'
    ];
    axios
      .get(url.join(''), {
        headers: {
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
// 测试
/*
(async () => {
    console.log("获取病害程度单位列表");
    try {
        const result = await fetchBasemembercheckdata();
        //console.log(result.list);
        result.list?.forEach(async (r) => {
            await save2Schema("Common", "病害程度单位列表", JSON.stringify(r));
        })
    } catch (err) {
        console.error(err);
    }
})();
*/

/**
 * 获取规范标度评分数据
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/qhgx25
 * @returns
 */
export const fetchBasestandardtable = access_token =>
  new Promise((resolve, reject) => {
    const url = [
      host,
      prefix,
      'basestandardtable',
      '?standard=JTG-TH21-2011',
      `&r=${Math.random()}`,
    ];
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
export const fetchBasestandardtable_auth = access_token => 
  new Promise((resolve, reject) => {
    const url = [
      auth_host,
      auth_prefix,
      'basestandardtable',
      '?standard=JTG-TH21-2011'
    ];
    axios
      .get(url.join(''), {
        headers: {
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
// 测试
/*
(async () => {
    console.log("获取规范标度评分数据");
    try {
        const result = await fetchBasestandardtable();
        //console.log(result.list);
        result.list?.forEach(async (r) => {
            await save2Schema("Common", "规范标度评分数据", JSON.stringify(r));
        })
    } catch (err) {
        console.error(err);
    }
})();
*/

/**
 * 获取规范标度评分表明细
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/sldzoe
 * @returns
 */
export const fetchBasestandardtableinfo = access_token =>
  new Promise((resolve, reject) => {
    const url = [host, prefix, 'basestandardtableinfo', `?r=${Math.random()}`];
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
export const fetchBasestandardtableinfo_auth = access_token => 
  new Promise((resolve, reject) => {
    const url = [
      auth_host,
      auth_prefix,
      'basestandardtableinfo'
    ];
    axios
      .get(url.join(''), {
        headers: {
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
// 测试
/*
(async () => {
    console.log("获取规范标度评分表明细");
    try {
        const result = await fetchBasestandardtableinfo();
        //console.log(result.list);
        result.list?.forEach(async (r) => {
            await save2Schema("Common", "规范标度评分表明细", JSON.stringify(r));
        })
    } catch (err) {
        console.error(err);
    }
})();
*/

/**
 * 获取病害分组列表和病害明细表
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/ddmw9s
 * @param {*} companyid
 * @returns
 */
export const fetchBasemembercheckgroup = (companyid, access_token) =>
  new Promise((resolve, reject) => {
    const url = [
      host,
      prefix,
      'basemembercheckgroup',
      `?companyid=${companyid}&r=${Math.random()}`,
    ];
    axios
      .get(url.join(''), {
        headers: {
          access_token_cookie: access_token,
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(response => {
        if (response.data.resultCode === 200) {
          console.info(response.data.resultJson);
          resolve(response.data.resultJson);
        } else {
          reject(response.data.resultMsg);
        }
      })
      .catch(err => reject(err));
  });
export const fetchBasemembercheckgroup_auth = access_token => 
  new Promise((resolve, reject) => {
    const url = [
      auth_host,
      auth_prefix,
      'basemembercheckgroup'
    ];
    axios
      .get(url.join(''), {
        headers: {
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
// 测试
/*
(async () => {
    console.log("获取病害分组列表和病害明细表");
    try {
        const result = await fetchBasemembercheckgroup(10000);
        //console.log(result.list);
        result.list?.forEach(async (r) => {
            await save2Schema("Common", "病害分组列表和病害明细表", JSON.stringify(r));
        })
    } catch (err) {
        console.error(err);
    }
})();
*/

/**
 * 获取同类病害评定明细
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/aror87
 * @param {*} companyid
 * @returns
 */
export const fetchBasemembercheckscalelist = (companyid, access_token) =>
  new Promise((resolve, reject) => {
    const url = [
      host,
      prefix,
      'basemembercheckscalelist',
      `?companyid=${companyid}&r=${Math.random()}`,
    ];
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
export const fetchBasemembercheckscalelist_auth = access_token => 
  new Promise((resolve, reject) => {
    const url = [
      auth_host,
      auth_prefix,
      'basemembercheckscalelist'
    ];
    axios
      .get(url.join(''), {
        headers: {
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
// 测试
/*
(async () => {
    console.log("获取同类病害评定明细");
    try {
        const result = await fetchBasemembercheckscalelist(10000);
        //console.log(result.list);
        result.list?.forEach(async (r) => {
            await save2Schema("Common", "同类病害评定明细", JSON.stringify(r));
        })
    } catch (err) {
        console.error(err);
    }
})();
*/

/**
 * 获取病害与成因绑定关系（文档有出入）
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/zc2vep
 * @param {*} companyid
 * @returns
 */
export const fetchBasemembercheckcausebindlist = (companyid, access_token) =>
  new Promise((resolve, reject) => {
    const url = [
      host,
      prefix,
      'basemembercheckcausebindlist',
      `?companyid=${companyid}&r=${Math.random()}`,
    ];
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
export const fetchBasemembercheckcausebindlist_auth = access_token => 
  new Promise((resolve, reject) => {
    const url = [
      auth_host,
      auth_prefix,
      'basemembercheckcausebindlist'
    ];
    axios
      .get(url.join(''), {
        headers: {
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
// 测试
/*
(async () => {
    console.log("获取病害与成因绑定关系");
    try {
        const result = await fetchBasemembercheckcausebindlist(10000);
        //console.log(result.list);
        result.list?.forEach(async (r) => {
            await save2Schema("Common", "病害与成因绑定关系", JSON.stringify(r));
        })
    } catch (err) {
        console.error(err);
    }
})();
*/

/**
 * 获取桥梁部件病害成因信息
 * https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/ng1mx5
 * @param {*} companyid
 * @returns
 */
export const fetchBasemembercheckcause = (companyid, access_token) =>
  new Promise((resolve, reject) => {
    const url = [
      host,
      prefix,
      'basemembercheckcause',
      `?companyid=${companyid}&r=${Math.random()}`,
    ];
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
export const fetchBasemembercheckcause_auth = access_token => 
  new Promise((resolve, reject) => {
    const url = [
      auth_host,
      auth_prefix,
      'basemembercheckcause'
    ];
    axios
      .get(url.join(''), {
        headers: {
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

// 桥梁属性基础数据
export const baseclientinit = async access_token =>
  new Promise((resolve, reject) => {
    const url = [
      host,
      prefix,
      'baseclientinit',
      `?datatype=bridge&r=${Math.random()}`,
    ];
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
export const baseclientinit_auth = access_token => 
  new Promise((resolve, reject) => {
    const url = [
      auth_host,
      auth_prefix,
      'baseclientinit',
      '?datatype=bridge'
    ];
    axios
      .get(url.join(''), {
        headers: {
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

// 测试
/*
(async () => {
    console.log("获取桥梁部件病害成因信息");
    try {
        const result = await fetchBasemembercheckcause(10000);
        //console.log(result.list);
        result.list?.forEach(async (r) => {
            await save2Schema("Common", "桥梁部件病害成因信息", JSON.stringify(r));
        })
    } catch (err) {
        console.error(err);
    }
})();
*/
// 养护区路线数据
export const baseareamanage = async access_token =>
  new Promise((resolve, reject) => {
    const url = [host, prefix, 'baseareamanage', `?r=${Math.random()}`];
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
export const baseareamanage_auth = access_token => 
  new Promise((resolve, reject) => {
    const url = [
      auth_host,
      auth_prefix,
      'baseareamanage'
    ];
    axios
      .get(url.join(''), {
        headers: {
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

// 同步数据 服务器->客户端
export const syncCommonData = async (company_id, access_token, fun) => {
  // 清空 本地存储
  await AsyncStorage.clear();
  // 数据 以及 设置数据的函数
  const data = {};
  const setData = (name, val) => {
    data[name] = val;
  };
  // fun 是回调函数，用于显示 同步到 哪一步了 
  try {
    // 如果回调函数存储，那么执行
    fun && fun({name: '桥梁结构数据', status: '更新中'});
    // 请求接口，获取桥梁结构数据
    const result = await fetchBasememberinfo_auth(access_token);
    // 时间
    const laetDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    // 将数据存入 data
    setData('桥梁结构数据', {
      data: result.list,
      laetDate,
    });
    console.info(result);
    fun && fun({name: '桥梁结构数据', status: '更新成功', laetDate});
  } catch (err) {
    console.error(err);
    fun && fun({name: '桥梁结构数据', status: '更新失败', massage: err});
  }
  
  try {
    fun && fun({name: '桥梁结构检测位置', status: '更新中'});
    const result = await fetchBasememberareainfo_auth(access_token);
    const laetDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    console.log("result",result);
    setData('桥梁结构检测位置', {
      data: result.list,
      laetDate,
    });
    fun && fun({name: '桥梁结构检测位置', status: '更新成功', laetDate});
  } catch (err) {
    fun && fun({name: '桥梁结构检测位置', status: '更新失败', massage: err});
    console.error(err);
  }

  // fun && fun('获取部件养护计划信息');
  try {
    fun && fun({name: '部件养护计划信息', status: '更新中'});
    const result = await fetchBasemembermaintplan_auth(access_token);
    const laetDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    setData('部件养护计划信息', {
      data: result.list,
      laetDate: laetDate,
    });
    fun && fun({name: '部件养护计划信息', status: '更新成功', laetDate});
  } catch (err) {
    fun && fun({name: '部件养护计划信息', status: '更新失败', massage: err});
    console.error(err);
  }

  // fun && fun('获取桥梁各部件病害信息');
  try {
    fun && fun({name: '桥梁各部件病害信息', status: '更新中'});
    const result = await fetchBasemembercheckinfo_auth(access_token);
    const laetDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    setData('桥梁各部件病害信息', {
      data: result.list,
      laetDate,
    });
    fun && fun({name: '桥梁各部件病害信息', status: '更新成功', laetDate});
  } catch (err) {
    fun && fun({name: '桥梁各部件病害信息', status: '更新失败', massage: err});
    console.error(err);
  }

  // fun && fun('获取病害程度单位列表');
  try {
    fun && fun({name: '病害程度单位列表', status: '更新中'});
    const laetDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const result = await fetchBasemembercheckdata_auth(access_token);
    setData('病害程度单位列表', {
      data: result.list,
      laetDate,
    });
    fun && fun({name: '病害程度单位列表', status: '更新成功', laetDate});
  } catch (err) {
    fun && fun({name: '病害程度单位列表', status: '更新失败', massage: err});
    console.error(err);
  }

  // fun && fun('获取规范标度评分数据');
  try {
    fun && fun({name: '规范标度评分数据', status: '更新中'});
    const laetDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const result = await fetchBasestandardtable_auth(access_token);
    setData('规范标度评分数据', {
      data: result.list,
      laetDate,
    });
    fun && fun({name: '规范标度评分数据', status: '更新成功', laetDate});
  } catch (err) {
    fun && fun({name: '规范标度评分数据', status: '更新失败', massage: err});
    console.error(err);
  }

  // fun && fun('获取规范标度评分表明细');
  try {
    fun && fun({name: '规范标度评分表明细', status: '更新中'});
    const laetDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const result = await fetchBasestandardtableinfo_auth(access_token);
    setData('规范标度评分表明细', {
      data: result.list,
      laetDate,
    });
    fun && fun({name: '规范标度评分表明细', status: '更新成功', laetDate});
  } catch (err) {
    fun && fun({name: '规范标度评分表明细', status: '更新失败', massage: err});
    console.error(err);
  }
  
  // fun && fun('获取病害分组列表和病害明细表');
  try {
    fun && fun({name: '病害与成因绑定关系表', status: '更新中'});
    const laetDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const result = await fetchBasemembercheckcausebindlist_auth(access_token);
    setData('病害与成因绑定关系表', {
      data: result.list,
      laetDate,
    });
    fun && fun({name: '病害与成因绑定关系表', status: '更新成功', laetDate});
  } catch (err) {
    fun &&
      fun({name: '病害与成因绑定关系表', status: '更新失败', massage: err});
    console.error(err);
  }

  // fun && fun('获取病害分组列表和病害明细表');
  try {
    fun && fun({name: '病害分组列表和病害明细表', status: '更新中'});
    const laetDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const result = await fetchBasemembercheckgroup_auth(access_token);
    setData('病害分组列表和病害明细表', {
      data: result.list,
      laetDate,
    });
    fun &&
      fun({name: '病害分组列表和病害明细表', status: '更新成功', laetDate});
  } catch (err) {
    fun &&
      fun({name: '病害分组列表和病害明细表', status: '更新失败', massage: err});
    console.error(err);
  }

  try {
    fun && fun({name: '病害评定明细', status: '更新中'});
    const laetDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const result = await fetchBasemembercheckscalelist_auth(access_token);
    setData('病害评定明细', {
      data: result.list,
      laetDate,
    });
    fun && fun({name: '病害评定明细', status: '更新成功', laetDate});
  } catch (err) {
    fun && fun({name: '病害评定明细', status: '更新失败', massage: err});
    console.error(err);
  }

  try {
    fun && fun({name: '桥梁部件病害成因', status: '更新中'});
    const laetDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const result = await fetchBasemembercheckcause_auth(access_token);
    setData('桥梁部件病害成因', {
      data: result.list,
      laetDate,
    });
    fun && fun({name: '桥梁部件病害成因', status: '更新成功', laetDate});
  } catch (err) {
    fun && fun({name: '桥梁部件病害成因', status: '更新失败', massage: err});
    console.error(err);
  }

  try {
    fun && fun({name: '桥梁属性基础数据', status: '更新中'});
    const laetDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const result = await baseclientinit_auth(access_token);
    const {baseparam} = result;
    const list = [];
    Object.keys(baseparam).forEach(key => {
      baseparam[key].datalist.forEach(item => {
        item.category = item.parampid !== '0' ? `${key}_${item.parampid}` : key;
        item.isDefault = item.default;
        list.push(item);
      });
    });
    // 同步 基础数据 到 数据库的  base_data表中
    await syncBaseData(list);
    setData('桥梁属性基础数据', {laetDate});
    fun && fun({name: '桥梁属性基础数据', status: '更新成功', laetDate});
  } catch (err) {
    fun && fun({name: '桥梁属性基础数据', status: '更新失败', massage: err});
    console.error(err);
  }

  try {
    fun && fun({name: '养护区路线数据', status: '更新中'});
    const laetDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const result = await baseareamanage_auth(access_token);
    const {arealist} = result;
    const list = [];
    arealist.forEach(item => {
      list.push({
        code: item.areamanagecode,
        name: item.areamanagename,
        pcode: -1,
        data: {},
        category: 'areamanage',
      });
      if (item.list) {
        item.list.forEach(it => {
          list.push({
            code: it.areacode,
            name: it.areaname,
            data: {},
            pcode: item.areamanagecode,
            category: 'area',
          });
          if (it.list) {
            it.list.forEach(t => {
              list.push({
                code: t.routecode,
                name: t.routename,
                pcode: it.areacode,
                data: {
                  kmstart: t.kmstart,
                  kmend: t.kmend,
                  routelength: t.routelength,
                },
                category: 'route',
              });
            });
          }
        });
      }
    });
    // 将 养护区数据 更新 到 数据库的area表 中
    await syncAreaData(list);
    setData('养护区路线数据', {laetDate});
    fun && fun({name: '养护区路线数据', status: '更新成功', laetDate});
    // 将所有获取到的数据，存储到 本地
    await AsyncStorage.setItem('baseData_' + company_id, JSON.stringify(data));
  } catch (err) {
    fun && fun({name: '养护区路线数据', status: '更新失败', massage: err});
    console.error(err);
  }
};
