// 文档：项目数据相关表设计
import {db, getResult} from '../utils/sqlite';
import uuid from 'react-native-uuid';
import dayjs from 'dayjs';

// 桥梁项目检测绑定关系列表（bridgeprojectbindlist）

export const ddl = `
CREATE TABLE IF NOT EXISTS "bridge_project_bind" (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, -- 文档中标记为服务器中使用
    projectid TEXT(50) NOT NULL, -- 项目编码
    bridgeid TEXT NOT NULL, -- 桥梁编号
    bridgereportid TEXT(50) NOT NULL, -- 检测编号
    bridgereportbindid TEXT NOT NULL, -- 绑定编码 建议“项目编码+检测编号”，顺便实现唯一约束
    userid TEXT(50) NOT NULL, -- 用户编号
    binddate DATETIME NOT NULL -- 绑定日期
);
`;

export const remove = async data => {
  const sql = `
  delete from bridge_project_bind where 1=1
   ${data.bridgeid ? 'and bridgeid = ?' : ''}
   ${data.projectid ? 'and projectid = ?' : ''} 
  `;

  let param = [];
  if (data.projectid && data.bridgeid) {
    param = [data.bridgeid, data.projectid];
  } else if (data.projectid) {
    param = [data.projectid];
  } else if (data.bridgeid) {
    param = [data.bridgeid];
  }
  if (param.length) {
    await db().executeSql(sql, param);
  }
};

export const save = async data => {
  const sql = `
  insert into bridge_project_bind (
      projectid
      , bridgeid
      , bridgereportid
      , bridgereportbindid
      , userid
      , binddate
  ) values (?, ?, ?, ?, ?, ?)
  `;
  const param = [
    data.projectid,
    data.bridgeid,
    data.bridgereportid || uuid.v4(),
    data.bridgereportbindid || '',
    data.userid,
    data.binddate || dayjs().format('YYYY-MM-DD HH:mm:ss'),
  ];
  await db().executeSql(sql, param);
};

export const update = async data => {
  const sql = `
  update bridge_project_bind
  set projectid = ?
      , bridgeid = ?
      , bridgereportid = ?
      , bridgereportbindid
      , userid = ?
      , binddate = ?
  where id = ?
  `;
  const param = [
    data.projectid,
    data.bridgeid,
    data.bridgereportid,
    data.bridgereportbindid || '',
    data.userid,
    data.binddate,
    data.id,
  ];
  await db().executeSql(sql, param);
};

export const get = async data => {
  const sql =
    'select * from bridge_project_bind where bridgeid = ? and projectid = ?';
  const param = [data.bridgeid, data.projectid];
  return getResult(await db().executeSql(sql, param), 'object');
};

export const getById = async id => {
  const sql = 'select * from bridge_project_bind where id = ?';
  const param = [id];
  return getResult(await db().executeSql(sql, param), 'object');
};

export const bridgeList = async userid => {
  const sql = `
    select *, bridge_project_bind.id as bindId,
    (select projectname from project 
      where projectid = bridge_project_bind.projectid ) as projectname,
    (select c_date from upload_log where dataid = bridge_project_bind.id and category = '检测数据'  ORDER BY c_date DESC limit 1) as upload_date,
    (select to_projcet_name from upload_log where dataid = bridge_project_bind.id and category = '检测数据' ORDER BY c_date DESC limit 1) as to_projcet_name  
    from bridge_project_bind 
    left join bridge on bridge.bridgeid = bridge_project_bind.bridgeid and bridge_project_bind.userid = ?`;
  return getResult(await db().executeSql(sql, [userid]), 'array');
};

export const listByProject = async projectid => {
  const sql = 'select * from bridge_project_bind where projectid = ?';
  return getResult(await db().executeSql(sql, [projectid]), 'array');
};

export const getByBridgereportid = async data => {
  const sql =
    'select * from bridge_project_bind where bridgeid = ? and bridgereportid = ?';
  const param = [data.bridgeid, data.bridgereportid];
  return getResult(await db().executeSql(sql, param), 'object');
};
