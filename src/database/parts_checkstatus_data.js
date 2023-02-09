// 临时创建
// 桥梁检测构件检测记录
import dayjs from 'dayjs';
import {db, getResult} from '../utils/sqlite';

export const ddl = `
CREATE TABLE IF NOT EXISTS parts_checkstatus_data (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, -- 文档中标记为服务器中使用
    bridgereportid TEXT(50) NOT NULL, -- 桥梁本次检测编号
    dataid TEXT(50) NOT NULL, -- 构件编号
    jsondata JSON DEFAULT '{}' NOT NULL, -- 构件检测数据
    memberstatus TEXT(50) NOT NULL, -- 构建状态
    datatype TEXT(50) NOT NULL, -- 数据类型
    mian INTEGER NOT NULL, -- 是否重点关注
    version TEXT(50) NOT NULL, -- 数据版本 memberstatus 为 200 时作为id使用 
    dataGroupId TEXT(50) NOT NULL, -- 临时组id
    u_date TEXT NOT NULL, -- 更新日期时间
    userid TEXT(50) NOT NULl, -- 用户编号
    longitude REAL NOT NULL, -- 经度
    latitude REAL NOT NULL -- 纬度
);
`;

export const remove = async data => {
  const sql = `
    delete from parts_checkstatus_data where 1=1
    ${data.dataGroupId ? 'and version=?' : 'and version=? and dataid=? '}
  `;
  const param = data.dataGroupId ? [data.version] : [data.version, data.dataid];
  await db().executeSql(sql, param);
};

export const save = async data => {
  const sql = `insert into parts_checkstatus_data (
      bridgereportid
      , dataid
      , jsondata
      , memberstatus
      , datatype
      , mian
      , version
      , dataGroupId
      , u_date
      , userid
      , longitude
      , latitude
  ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const param = [
    data.bridgereportid,
    data.dataid,
    data.jsondata,
    data.memberstatus,
    data.datatype || '',
    data.mian || 0,
    data.version,
    data.dataGroupId || '',
    dayjs().format('YYYY-MM-DD HH:mm:ss'),
    data.userid,
    data.longitude || 0,
    data.latitude || 0,
  ];
  await db().executeSql(sql, param);
};

export const update = async data => {
  const sql = `
  update parts_checkstatus_data
  set bridgereportid = ?
      , dataid = ?
      , jsondata = ?
      , memberstatus = ?
      , datatype = ?
      , mian = ?
      , u_date = ?
      , userid = ?
      , longitude = ?
      , latitude = ?
  where bridgereportid = ? and dataid = ? and version = ?
  `;
  const param = [
    data.bridgereportid,
    data.dataid,
    data.jsondata,
    data.memberstatus,
    data.datatype,
    data.mian || 0,
    dayjs().format('YYYY-MM-DD HH:mm:ss'),
    data.userid,
    data.longitude || 0,
    data.latitude || 0,
    data.bridgereportid,
    data.dataid,
    data.version,
  ];
  await db().executeSql(sql, param);
};

export const list = async data => {
  const sql = `
    select * from parts_checkstatus_data 
    where bridgereportid = ? and memberstatus = ? 
    ${data.dataGroupId ? 'and dataGroupId = ?' : 'and dataid = ?'}
  `;
  const param = [
    data.bridgereportid,
    data.memberstatus,
    data.dataGroupId ? data.dataGroupId : data.dataid,
  ];
  return getResult(await db().executeSql(sql, param), 'array');
};

export const getGoods = async (bridgereportid, dataIds) => {
  const sql = `
    select * from parts_checkstatus_data 
    where dataid in (${dataIds.map(it => `'${it}'`).join(',')}) 
    and memberstatus = '200' and bridgereportid = ?`;
  return getResult(await db().executeSql(sql, [bridgereportid]), 'array');
};

export const getDisease = async (bridgereportid, dataIds) => {
  const sql = `
  select * from parts_checkstatus_data 
  where dataid in (${dataIds.map(it => `'${it}'`).join(',')}) 
  and memberstatus = '200' and bridgereportid = ?`;
  return getResult(await db().executeSql(sql, [bridgereportid]), 'array');
};

export const get = async data => {
  const sql = `
    select * from parts_checkstatus_data 
    where bridgereportid = ? and dataid= ? and memberstatus = ? and version != ?
    ORDER BY u_date DESC limit 1`;
  const param = [
    data.bridgereportid,
    data.dataid,
    data.memberstatus,
    data.version,
  ];
  return getResult(await db().executeSql(sql, param), 'object');
};

export const getByVersion = async version => {
  const sql = 'select * from parts_checkstatus_data where version = ?';
  const param = [version];
  return getResult(await db().executeSql(sql, param), 'array');
};

export const getDiseaseDataTotal = async bridgereportid => {
  const sql = `select count(*) as count from parts_checkstatus_data 
    where  bridgereportid = ? and memberstatus = '200' 
      and (select memberstatus from bridge_report_member 
        where bridgereportid = ? 
        and memberid = parts_checkstatus_data.dataid) = '200'`;
  const param = [bridgereportid, bridgereportid];
  return getResult(await db().executeSql(sql, param), 'object');
};

export const getMainTotal = async bridgereportid => {
  const sql = `select count(*) as count from parts_checkstatus_data 
    where  bridgereportid = ? and memberstatus = '200' and mian = 1 
      and (select memberstatus from bridge_report_member 
        where bridgereportid = ? 
        and memberid = parts_checkstatus_data.dataid) = '200'`;
  const param = [bridgereportid, bridgereportid];
  return getResult(await db().executeSql(sql, param), 'object');
};

export const getDiseaseDataList = async (bridgereportid, data) => {
  const sql = `select * from parts_checkstatus_data 
    where bridgereportid = ? and memberstatus = '200'
    and dataid in (${data.map(it => `'${it}'`).join(',')})
  `;
  return getResult(await db().executeSql(sql, [bridgereportid]), 'array');
};
