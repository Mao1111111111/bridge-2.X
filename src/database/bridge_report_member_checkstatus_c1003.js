// 文档：桥梁检测数据相关表设计
// 桥梁检测构件检测记录-裂缝记录
import {db} from '../utils/sqlite';

export const ddl = `
CREATE TABLE IF NOT EXISTS bridge_report_member_checkstatus_c1003 (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, -- 文档中标记为服务器中使用
    bridgereportid TEXT(50) NOT NULL, -- 桥梁本次检测编号
    dataid TEXT(50) NOT NULL, -- 本次提交数据id
    datajson TEXT NOT NULL, -- 提交裂缝数据的json
);
`;

const remove = async id => {
  const sql = 'delete from bridge_report_member_checkstatus_c1003 where id = ?';
  const param = [id];
  await db().executeSql(sql, param);
};

const save = async data => {
  const sql = `
  insert into bridge_report_member_checkstatus_c1003 (
      bridgereportid
      , dataid
      , datajson
  ) values (?, ?, ?)
  `;
  const param = [
    data.bridgereportid || '0',
    data.dataid,
    data.datajson || '{}',
  ];
  await db().executeSql(sql, param);
}

const update = async data => {
  const sql = `
  update bridge_report_member_checkstatus_c1003
  set bridgereportid = ?
      , dataid = ?
      , datajson
  where id = ?
  `;
  const param = [
    data.bridgereportid,
    data.dataid,
    data.datajson,
    data.id,
  ];
  await db().executeSql(sql, param);
}
