// 文档：桥梁检测数据相关表设计
// 桥梁检测构件检测记录-媒体数据
import dayjs from 'dayjs';
import {db, getResult} from '../utils/sqlite';

export const ddl = `
CREATE TABLE IF NOT EXISTS bridge_report_member_checkstatus_media (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, -- 文档中标记为服务器中使用
    bridgereportid TEXT(50) NOT NULL, -- 桥梁本次检测编号
    mediatype TEXT(50) NOT NULL, -- 媒体数据类型
    parentmediaid TEXT(50) NOT NULL, -- 主媒体数据id
    mediaid TEXT(50) NOT NULL, -- 媒体数据id
    filename TEXT(50) NOT NULL, -- 媒体文件名称
    filetypes TEXT(50) NOT NULL, -- 媒体文件扩展名
    filesize REAL NOT NULL, -- 媒体文件大小Kb
    filepath TEXT(50) NOT NULL, -- 媒体文件路径
    duration INTEGER NOT NULL, -- 媒体文件时长
    userid TEXT(50) NOT NULL, -- 用户编号
    u_date TEXT NOT NULL -- 日期时间
);
`;

export const remove = async mediaid => {
  const sql =
    'delete from bridge_report_member_checkstatus_media where mediaid = ?';
  const param = [mediaid];
  await db().executeSql(sql, param);
};
export const remove2 = async bridgereportid => {
  const sql = 'delete from bridge_report_member_checkstatus_media where bridgereportid = ?';
  const param = [bridgereportid];
  await db().executeSql(sql, param);
};

export const removeByParentmediaid = async parentmediaid => {
  const sql =
    'delete from bridge_report_member_checkstatus_media where parentmediaid = ?';
  const param = [parentmediaid];
  await db().executeSql(sql, param);
};

export const save = async data => {
  const sql = `
  insert into bridge_report_member_checkstatus_media (
      bridgereportid
      , mediatype
      , parentmediaid
      , mediaid
      , filename
      , filetypes
      , filesize
      , filepath
      , duration
      , userid
      , u_date
  ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const param = [
    data.bridgereportid || '0',
    data.mediatype || '',
    data.parentmediaid || '0',
    data.mediaid || '',
    data.filename || '0',
    data.filetypes || '',
    data.filesize || 0,
    data.filepath || '',
    data.duration || 0,
    data.userid,
    data.u_date || dayjs().format('YYYY-MM-DD HH:mm:ss'),
  ];
  await db().executeSql(sql, param);
};

export const update = async data => {
  const sql = `
  update bridge_report_member_checkstatus_media
  set bridgereportid = ?
      , mediatype = ?
      , parentmediaid = ?
      , mediaid = ?
      , filename = ?
      , filetypes = ?
      , filesize = ?
      , filepath = ?
      , duration = ?
      , userid = ?
      , u_date = ?
  where mediaid = ?
  `;
  const param = [
    data.bridgereportid,
    data.mediatype,
    data.parentmediaid,
    data.mediaid,
    data.filename,
    data.filetypes,
    data.filesize,
    data.filepath,
    data.duration || 0,
    data.userid,
    data.u_date || dayjs().format('YYYY-MM-DD HH:mm:ss'),
    data.mediaid,
  ];
  await db().executeSql(sql, param);
};

export const fileDisk = async () => {
  const sql =
    'select sum(filesize) as fileDisk from bridge_report_member_checkstatus_media';
  return getResult(await db().executeSql(sql, []), 'object');
};
