// 文档：桥梁检测数据相关表设计
// 桥梁检测构件检测记录-病害程度值
import {db} from '../utils/sqlite';

export const ddl = `
CREATE TABLE IF NOT EXISTS bridge_report_member_checkstatus_datastrvalue (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, -- 文档中标记为服务器中使用
    bridgereportid TEXT(50) NOT NULL, -- 桥梁本次检测编号
    dataid TEXT(50) NOT NULL, -- 本次提交数据id
    checktypeid TEXT(50) NOT NULL, -- 检测病害编号
    strvalue TEXT(50) NOT NULL, -- 程度单位值
    strvaluevalue TEXT(50) NOT NULL, -- 程度单位值的程度
);
`;

const remove = async id => {
  const sql = 'delete from bridge_report_member_checkstatus_datastrvalue where id = ?';
  const param = [id];
  await db().executeSql(sql, param);
};

const save = async data => {
  const sql = `
  insert into bridge_report_member_checkstatus_datastrvalue (
      bridgereportid
      , dataid
      , checktypeid
      , strvalue
      , strvaluevalue
  ) values (?, ?, ?, ?, ?)
  `;
  const param = [
    data.bridgereportid || '0',
    data.dataid,
    data.checktypeid,
    data.strvalue,
    data.strvaluevalue
  ];
  await db().executeSql(sql, param);
}

const update = async data => {
  const sql = `
  update bridge_report_member_checkstatus_datastrvalue
  set bridgereportid = ?
      , dataid = ?
      , checktypeid = ?
      , strvalue = ?
      , strvaluevalue = ?
  where id = ?
  `;
  const param = [
    data.bridgereportid,
    data.dataid,
    data.checktypeid,
    data.strvalue,
    data.strvaluevalue,
    data.id,
  ];
  await db().executeSql(sql, param);
}
