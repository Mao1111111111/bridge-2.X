// 文档：检测数据相关表设计
// 桥梁检测构件列表（bridgereportmemberlist）
import dayjs from 'dayjs';
import {db, getResult} from '../utils/sqlite';

export const ddl = `
CREATE TABLE IF NOT EXISTS bridge_report_member (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, -- 文档中标记为服务器中使用
    bridgeid TEXT(50) NOT NULL, -- 桥梁编号
    bridgereportid TEXT(50) NOT NULL, -- 桥梁检测编号?
    position TEXT(10) NOT NULL, -- 部件结构 基础数据包-桥梁属性-结构/部件编码（B01002B）
    membertype TEXT(50) NOT NULL, -- 部件编号？ 基础数据包-桥梁属性-结构/部件编码（B01002B）
    memberid TEXT(50) NOT NULL, -- 构件编号 系统内建的构件编号
    membername TEXT(50) NOT NULL, -- 构建名称 根据规则生成的名称或用户输入，例如1-1#
    stepno INTEGER NOT NULL, -- 跨编号 跨编号（1、2..），-1 代表其他
    orderdesc INTEGER NOT NULL, -- 排序编号 各构件之间，序号递增基数为 10
    memberstatus TEXT(50) NOT NULL, -- 构建状态
    dpscores_auto REAL NOT NULL, -- 构件评分
    u_date DATETIME NOT NULL
);
`;

export const remove = async id => {
  const sql = 'delete from bridge_report_member where id = ?';
  const param = [id];
  await db().executeSql(sql, param);
};

export const removeByMembertype = async data => {
  const sql =
    'delete from bridge_report_member where bridgereportid = ? and membertype = ?';
  await db().executeSql(sql, [data.bridgereportid, data.membertype]);
};

export const save = async data => {
  const sql = `
  insert into bridge_report_member (
      bridgeid
      , bridgereportid
      , position
      , membertype
      , memberid
      , membername
      , stepno
      , orderdesc
      , memberstatus
      , dpscores_auto
      , u_date
  ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const param = [
    data.bridgeid || '0',
    data.bridgereportid,
    data.position,
    data.membertype,
    data.memberid,
    data.membername,
    data.stepno || -1,
    data.orderdesc || '0',
    data.memberstatus || '0',
    data.dpscores_auto,
    data.u_date||dayjs().format('YYYY-MM-DD HH:mm:ss'),
  ];
  await db().executeSql(sql, param);
};

export const update = async data => {
  const sql = `
  update bridge_report_member
  set bridgeid = ?
      , bridgereportid = ?
      , position = ?
      , membertype = ?
      , memberid = ?
      , membername = ?
      , stepno = ?
      , orderdesc = ?
      , memberstatus = ?
      , dpscores_auto = ?
      , u_date = ?
  where id = ?
  `;
  const param = [
    data.bridgeid,
    data.bridgereportid,
    data.position,
    data.membertype,
    data.memberid,
    data.membername,
    data.stepno,
    data.orderdesc,
    data.memberstatus,
    data.dpscores_auto,
    dayjs().format('YYYY-MM-DD HH:mm:ss'),
    data.id,
  ];
  await db().executeSql(sql, param);
};

export const list = async data => {
  const sql =
    'select * from bridge_report_member where bridgereportid = ? and bridgeid = ?';
  const param = [data.bridgereportid, data.bridgeid];
  return getResult(await db().executeSql(sql, param), 'array');
};

export const updateStatus = data => {
  const sql = `
  update bridge_report_member
  set memberstatus = ?
    ,u_date = ?
  where memberid in (${data.ids.join(',')})
  and bridgereportid = ?
  `;
  const param = [
    data.memberstatus,
    dayjs().format('YYYY-MM-DD HH:mm:ss'),
    data.bridgereportid,
  ];
  return db().executeSql(sql, param);
};

export const searchUpDate = async bridgereportid => {
  const sql = 'select u_date from bridge_report_member where bridgereportid = ? ORDER BY u_date DESC limit 1';
  return getResult(await db().executeSql(sql, [bridgereportid]), 'object');
};
