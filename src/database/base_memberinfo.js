// 文档：桥梁基础数据相关表设计
import {db} from '../utils/sqlite';

export const ddl = `
CREATE TABLE IF NOT EXISTS base_memberinfo (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	standardid TEXT(20) NOT NULL, -- 规范编号
	bridgetype TEXT(10) NOT NULL, -- 桥梁类型
	positionid TEXT(10) NOT NULL, -- 结构编码
	membertype TEXT(10) NOT NULL, -- 部件编号
	membername TEXT(20) NOT NULL, -- 部件名称
	weight REAL DEFAULT 0.00 NOT NULL -- 部件权重
);
`;

export const remove = async id => {
  const sql = 'delete from base_memberinfo where id = ?';
  const param = [id];
  await db().executeSql(sql, param);
};

export const save = async data => {
  const sql = `
  insert into base_memberinfo (
      standardid
      , bridgetype
      , positionid
      , membertype
      , membername
      , weight
  ) values (?, ?, ?, ?, ?, ?)
  `;
  const param = [
    data.standardid,
    data.bridgetype,
    data.positionid,
    data.membertype,
    data.membername,
    data.weight || 0.0,
  ];
  await db().executeSql(sql, param);
};

export const update = async data => {
  const sql = `
  update base_memberinfo
  set standardid = ?
      , bridgetype = ?
      , membertype = ?
      , membername = ?
  where id = ?
  `;
  const param = [
    data.standardid,
    data.bridgetype,
    data.membertype,
    data.membername,
    data.id,
  ];
  await db().executeSql(sql, param);
};
