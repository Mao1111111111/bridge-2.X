// 文档：项目数据相关表设计
import {db, getResult, pageQuery} from '../utils/sqlite';
import dayjs from 'dayjs';
import uuid from 'react-native-uuid';
//桥梁项目列表（bridgeprojectlist）

export const ddl = `
CREATE TABLE IF NOT EXISTS "project" (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, -- 文档中标记为服务器中使用
    projectid TEXT(50) NOT NULL, -- 项目编码
    projectno TEXT NOT NULL, -- 项目编号
    projectname TEXT(50) NOT NULL, -- 项目名称
    projecttype INTEGER NOT NULL, -- 项目类型 1定期检测 2常规巡检
    projectstatus INTEGER NOT NULL, -- 项目状态 0新建未完成 1已完成项目 文档中标记为客户端使用
    areacode TEXT(50) NOT NULL, -- 养护区/路段编号
    routecode TEXT(50) NOT NULL, -- 养护区/路线编号
    userid TEXT(50) NOT NULL, -- 用户编号
    username TEXT(50) NOT NULL, -- 用户名称
    c_date TEXT NOT NULL,
    u_date TEXT NOT NULL,
    datasources INTEGER NOT NULL -- 数据来源 0客户端 1服务端
);
`;

export const remove = async id => {
  const sql = 'delete from project where id = ?';
  const param = [id];
  await db().executeSql(sql, param);
};

export const save = async data => {
  const sql = `
  insert into project (
      projectid
      , projectno
      , projectname
      , projecttype
      , projectstatus
      , areacode
      , routecode
      , userid
      , username
      , c_date
      , u_date
      , datasources
  ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
  `;
  const param = [
    data.projectid || uuid.v4(),
    data.projectno,
    data.projectname,
    data.projecttype || '',
    0,
    data.areacode,
    data.routecode,
    data.userid,
    data.username,
    dayjs().format('YYYY-MM-DD HH:mm:ss'),
    dayjs().format('YYYY-MM-DD HH:mm:ss'),
  ];
  await db().executeSql(sql, param);
};

export const update = async data => {
  const sql = `
  update project
  set projectname = ?
      , projecttype = ?
      , areacode = ?
      , routecode = ?
      , u_date = ?
  where id = ?
  `;
  const param = [
    data.projectname,
    data.projecttype || '',
    data.areacode,
    data.routecode,
    dayjs().format('YYYY-MM-DD HH:mm:ss'),
    data.id,
  ];
  await db().executeSql(sql, param);
};
export const search = async ({param, page}) => {
  const sql = `select p.*, 
    (select COUNT(*) from bridge_report_member m where
      m.memberstatus != '0'
    and m.bridgereportid in 
      (select bridgereportid from bridge_project_bind b where b.projectid = p.projectid ))  as yicaiji
  from project p where userid = ?
    ${param.status !== undefined ? `and projectstatus = ${param.status}` : ''} 
    ${param.projectname ? `and projectname like '%${param.projectname}%'` : ''}
    ${param.areacode ? `and areacode = '${param.areacode}'` : ''}
    ${param.routecode ? `and routecode = '${param.routecode}'` : ''}
  `;
  return await pageQuery(sql, [param.userid], page);
};

export const switchStatus = async data => {
  const sql = 'update project set projectstatus = 1, u_date = ? where id = ?';
  const param = [dayjs().format('YYYY-MM-DD HH:mm:ss'), data.id];
  await db().executeSql(sql, param);
};

export const getByName = async (projectname, id) => {
  if (id) {
    const sql = 'select * from project where projectname = ? and id != ?';
    const param = [projectname, id];
    return getResult(await db().executeSql(sql, param), 'array');
  } else {
    const sql = 'select * from project where projectname = ?';
    const param = [projectname];
    return getResult(await db().executeSql(sql, param), 'array');
  }
};

export const getByBridge = async ({param, page}) => {
  const sql = `
    select 
    *,
    (select COUNT(*) from parts_checkstatus_data where  
    dataid in (select memberid from 
      bridge_report_member where bridgeid = ? and memberstatus = '200') 
      and bridgereportid = 
      (select bridgereportid from bridge_project_bind 
        where bridgeid = ? and projectid = project.projectid)) as Disease,
        (select c_date from upload_log where dataid = 
          (select id from bridge_project_bind 
            where bridgeid = ? and projectid = project.projectid) 
          and category = '检测数据'  ORDER BY c_date DESC limit 1) as upload_date
    from project 
    where projectid in (select projectid from bridge_project_bind where bridgeid = ?)
  `;
  return await pageQuery(
    sql,
    [param.bridgeid, param.bridgeid, param.bridgeid, param.bridgeid],
    page,
  );
};

export const getByProjectid = async projectid => {
  const sql = 'select * from project where projectid = ?';
  return getResult(await db().executeSql(sql, [projectid]), 'object');
};