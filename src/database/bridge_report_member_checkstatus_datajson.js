// 文档：桥梁检测数据相关表设计
// 桥梁检测构件检测记录-数据记录
import {db} from '../utils/sqlite';

export const ddl = `
CREATE TABLE IF NOT EXISTS bridge_report_member_checkstatus_datajson (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, -- 文档中标记为服务器中使用
    bridgereportid TEXT(50) NOT NULL, -- 桥梁本次检测编号
    dataid TEXT(50) NOT NULL, -- 本次提交数据id
    datatype TEXT(50) NOT NULL, -- 提交的数据类型
    datajson TEXT NOT NULL, -- 提交的数据json
);
`;

const remove = async id => {
  const sql =
    'delete from bridge_report_member_checkstatus_datajson where id = ?';
  const param = [id];
  await db().executeSql(sql, param);
};

const save = async data => {
  const sql = `
  insert into bridge_report_member_checkstatus_datajson (
      bridgereportid
      , dataid
      , datatype
      , datajson
  ) values (?, ?, ?, ?)
  `;
  const param = [
    data.bridgereportid || '0',
    data.dataid,
    data.datatype,
    data.datajson || '{}',
  ];
  await db().executeSql(sql, param);
};

const update = async data => {
  const sql = `
  update bridge_report_member_checkstatus_datajson
  set bridgereportid = ?
      , dataid = ?
      , datatype = ?
      , datajson = ?
  where id = ?
  `;
  const param = [
    data.bridgereportid,
    data.dataid,
    data.datatype,
    data.datajson,
    data.id,
  ];
  await db().executeSql(sql, param);
};
