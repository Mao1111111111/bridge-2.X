// 文档：桥梁数据相关表设计
import {db, getResult} from '../utils/sqlite';
import dayjs from 'dayjs';

export const ddl = `
CREATE TABLE IF NOT EXISTS bridge_member (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bridgeid TEXT(50), -- 桥梁编号
  position TEXT(10), -- 部件结构
  membertype TEXT(50), -- 部件编号
  memberid TEXT(50), -- 构件编号
  membername TEXT(50), -- 构件名称
  stepno INTEGER, -- 跨编号
  orderdesc INTEGER, -- 排序编号
  u_date TEXT -- 更新日期时间
);
`;

export const save = async data => {
  const sql = `
    insert into bridge_member (
      bridgeid,
      position,
      membertype,
      memberid,
      membername,
      stepno,
      orderdesc,
      u_date
    ) values (
      ?, ?, ?, ?, ?, ?, ?, ?
    )
  `;
  const param = [
    data.bridgeid,
    data.position,
    data.membertype,
    data.memberid,
    data.membername,
    data.stepno || -1,
    data.orderdesc || 0,
    dayjs().format('YYYY-MM-DD HH:mm:ss'),
  ];
  await db().executeSql(sql, param);
};

export const list = async bridgeid => {
  const sql =
    'select * from bridge_member where bridgeid = ? order by orderdesc';
  return getResult(await db().executeSql(sql, [bridgeid]), 'array');
};

export const remove = async bridgeid => {
  const sql = 'delete from bridge_member where bridgeid = ?';
  await db().executeSql(sql, [bridgeid]);
};

export const bridgeMemberList = async bridgeid => {
  const sql =
    'select * from bridge_member where bridgeid = ?';
  return getResult(await db().executeSql(sql, [bridgeid]), 'array');
};