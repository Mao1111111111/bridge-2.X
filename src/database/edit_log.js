// 文档：项目数据相关表设计
import {db, getResult} from '../utils/sqlite';
import dayjs from 'dayjs';

// 桥梁检测操作记录表

export const ddl = `
CREATE TABLE IF NOT EXISTS "edit_log" (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title TEXT(50) NOT NULL, -- 标题
    projectid TEXT(50) NOT NULL, -- 项目编码
    bridgeid TEXT NOT NULL, -- 桥梁编号
    page_key TEXT(50) NOT NULL, -- 页面key
    userid TEXT(50) NOT NULL, -- 用户编号
    binddate DATETIME NOT NULL -- 绑定日期
);
`;

export const save = async data => {
  const sql = `
    insert into edit_log (
      title
      , projectid
      , bridgeid
      , page_key
      , userid
      , binddate
    ) values (
      ?, ?, ?, ?, ?, ?
    )
  `;
  const param = [
    data.title,
    data.projectid,
    data.bridgeid,
    data.page_key,
    data.userid,
    data.binddate || dayjs().format('YYYY-MM-DD HH:mm:ss'),
  ];
  await db().executeSql(sql, param);
};

export const list = async data => {
  const sql =
    'select * from edit_log where projectid = ? and bridgeid = ? ORDER BY binddate DESC';
  const param = [data.projectid, data.bridgeid];
  return getResult(await db().executeSql(sql, param), 'array');
};
