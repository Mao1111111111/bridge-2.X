// 文档：桥梁检测数据相关表设计
// 桥梁检测构件检测记录
import dayjs from 'dayjs';
import {db} from '../utils/sqlite';

export const ddl = `
CREATE TABLE IF NOT EXISTS bridge_report_member_checkstatus (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, -- 文档中标记为服务器中使用
    bridgereportid TEXT(50) NOT NULL, -- 桥梁本次检测编号
    dataid TEXT(50) NOT NULL, -- 本次提交数据id
    parentdataid TEXT(50) NOT NULL, -- 本次提交依赖父id
    datatype TEXT(50) NOT NULL, -- 提交的数据类型
    membertype TEXT NOT NULL, -- 部件编号
    memberid TEXT NOT NULL, -- 构件（部件）编号
    checktypeid TEXT NOT NULL, -- 检测病害编号
    scale TEXT NOT NULL, -- 病害评定标度
    u_date TEXT NOT NULL, -- 更新日期时间
    userid TEXT(50) NOT NULl, -- 用户编号
    longitude REAL NOT NULL, -- 经度
    latitude REAL NOT NULL -- 纬度
);
`;

export const remove = async id => {
  const sql = 'delete from bridge_report_member_checkstatus where id = ?';
  const param = [id];
  await db().executeSql(sql, param);
};

export const save = async data => {
  const sql = `
  insert into bridge_report_member_checkstatus (
      bridgereportid
      , dataid
      , parentdataid
      , datatype
      , membertype
      , memberid
      , checktypeid
      , scale
      , u_date
      , userid
      , longitude
      , latitude
  ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const param = [
    data.bridgereportid || '0',
    data.dataid,
    data.parentdataid || '0',
    data.datatype,
    data.membertype,
    data.memberid,
    data.checktypeid || '0',
    data.scale || '0',
    data.u_date || dayjs().format('YYYY-MM-DD HH:mm:ss'),
    data.userid,
    data.longitude || 0,
    data.latitude || 0,
  ];
  await db().executeSql(sql, param);
};

export const update = async data => {
  const sql = `
  update bridge_report_member_checkstatus
  set bridgereportid = ?
      , dataid = ?
      , parentdataid = ?
      , datatype = ?
      , membertype = ?
      , memberid = ?
      , checktypeid = ?
      , scale = ?
      , u_date = ?
      , userid = ?
      , longitude = ?
      , latitude = ?
  where id = ?
  `;
  const param = [
    data.bridgereportid,
    data.dataid,
    data.parentdataid,
    data.datatype,
    data.membertype,
    data.memberid,
    data.checktypeid,
    data.scale,
    data.u_date || dayjs().format('YYYY-MM-DD HH:mm:ss'),
    data.userid,
    data.longitude,
    data.latitude,
    data.id,
  ];
  await db().executeSql(sql, param);
};
