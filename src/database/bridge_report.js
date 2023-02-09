// 文档：检测数据相关表设计
// 桥梁检测列表（bridgereportlist）
import dayjs from 'dayjs';
import {db, getResult} from '../utils/sqlite';

export const ddl = `
CREATE TABLE IF NOT EXISTS bridge_report (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, -- 文档中标记为服务器中使用
    bridgeid TEXT(50) NOT NULL, -- 桥梁编号
    bridgereportid TEXT(50) NOT NULL, -- 桥梁本次检测编号
    reportname TEXT(50) NOT NULL, -- 基础数据包-桥梁属性-基础数据（B01001B）
    startdate TEXT NOT NULL, -- 创建日期时间
    finishdate TEXT NOT NULL, -- 检测完成日期时间
    rstatus INTEGER NOT NULL, -- 检测状态
    userid TEXT(50) NOT NULL, -- 用户编号
    longitude REAL NOT NULL, -- 经度
    latitude REAL NOT NULL -- 纬度
);
`;

export const remove = async id => {
  const sql = 'delete from bridge_report where id = ?';
  const param = [id];
  await db().executeSql(sql, param);
};

export const save = async data => {
  const sql = `
  insert into bridge_report (
      bridgeid
      , bridgereportid
      , reportname
      , startdate
      , finishdate
      , rstatus
      , userid
      , longitude
      , latitude
  ) values (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const param = [
    data.bridgeid,
    data.bridgereportid,
    data.reportname || '',
    data.startdate || dayjs().format('YYYY-MM-DD HH:mm:ss'),
    data.finishdate || '',
    data.rstatus || 0,
    data.userid,
    data.longitude || 0,
    data.latitude || 0,
  ];
  await db().executeSql(sql, param);
};

export const update = async data => {
  const sql = `
  update bridge_report
  set bridgeid = ?
      , bridgereportid = ?
      , reportname = ?
      , startdate = ?
      , finishdate = ?
      , rstatus = ?
      , userid = ?
      , longitude = ?
      , latitude = ?
  where id = ?
  `;
  const param = [
    data.bridgeid,
    data.bridgereportid,
    data.reportname,
    data.startdate,
    data.finishdate,
    data.rstatus,
    data.userid,
    data.longitude,
    data.latitude,
    data.id,
  ];
  await db().executeSql(sql, param);
};

export const get = async data => {
  const sql =
    'select * from bridge_report where bridgeid = ? and bridgereportid = ?';
  const param = [data.bridgeid, data.bridgereportid];
  return getResult(await db().executeSql(sql, param), 'object');
};

export const total = async () => {
  const sql = 'select bridgeid from bridge_report';
  return getResult(await db().executeSql(sql, []), 'array');
};
