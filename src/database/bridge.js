import dayjs from 'dayjs';
import {db, getResult, pageQuery} from '../utils/sqlite';

export const ddl = `
CREATE TABLE IF NOT EXISTS bridge (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, -- 文档中标记为服务器中使用
    bridgeid TEXT(50) NOT NULL, -- 桥梁编号
    bridgename TEXT(50) NOT NULL, -- 桥梁名称
    bridgetype TEXT(10) NOT NULL, -- 桥梁类型
    bridgestation TEXT(50) NOT NULL, -- 桥梁桩号
    b16 REAL DEFAULT 0 NOT NULL, -- 桥梁长度
    areacode TEXT(50) NOT NULL, -- 养护区/路段编号
    routecode TEXT(50) NOT NULL, -- 养护区/路线编号
    bridgefunc TEXT(20) NOT NULL, -- 功能类型
    bridgeside TEXT(20) NOT NULL, -- 桥幅属性
    bridgestruct TEXT(20) NOT NULL, -- 结构体系
    mainbridgeid TEXT(50) NOT NULL, -- 主桥编号 文档中标记为服务器中使用
    userid TEXT(50) NOT NULL, -- 用户编号
    c_date TEXT(50) NOT NULL,
    u_date TEXT(50) NOT NULL,
    longitude REAL NOT NULL, -- 经度
    latitude REAL NOT NULL, -- 纬度
    bridgeconfig JSON DEFAULT '{}' NOT NULL, -- 其他配置
    datasources INTEGER NOT NULL -- 数据来源 0客户端 1服务端
);
`;

/*
bridgeconfig 中对应的数据内容
b200001num	桥台数
b200002num	桥墩数
b100001num	梁片数
b300003num	人行道数
b300002num	伸缩装置数
b100002num	横隔板数
bridgelightsys	照明系统
bridgewall	翼墙、耳墙
bridgepadno	支座编号
bridgeabutment	桥台形式
bridgepier	桥墩形式
bridgepadstr	桥连组合
*/

export const remove = async id => {
  const sql = 'delete from bridge where id = ?';
  const param = [id];
  await db().executeSql(sql, param);
};

export const checkNameAndCode = async data => {
  let res = null;
  if (data.id) {
    let sql =
      'select * from bridge where bridgestation = ? and bridgename = ? and bridgeside =? and id != ?';
    res = await db().executeSql(sql, [
      data.bridgestation,
      data.bridgename,
      data.bridgeside,
      data.id,
    ]);
  } else {
    let sql =
      'select * from bridge where bridgestation = ? and bridgeside =? and bridgename = ?';
    res = await db().executeSql(sql, [
      data.bridgestation,
      data.bridgeside,
      data.bridgename,
    ]);
  }
  const list = getResult(res, 'array');
  return list.length === 0;
};

export const get = async id => {
  const sql = 'select * from bridge where id = ?';
  return getResult(await db().executeSql(sql, [id]), 'object');
};

export const getByBridgeid = async bridgeid => {
  const sql = 'select * from bridge where bridgeid = ?';
  return getResult(await db().executeSql(sql, [bridgeid]), 'object');
};

export const save = async data => {
  const sql = `
  insert into bridge (
      bridgeid
      , bridgename
      , bridgetype
      , bridgestation
      , b16
      , areacode
      , routecode
      , bridgefunc
      , bridgeside
      , bridgestruct
      , mainbridgeid
      , userid
      , c_date
      , u_date
      , longitude
      , latitude
      , bridgeconfig
      , datasources
  ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?)
  `;
  const param = [
    data.bridgeid,
    data.bridgename,
    data.bridgetype,
    data.bridgestation,
    data.b16 || 0,
    data.areacode,
    data.routecode,
    data.bridgefunc,
    data.bridgeside,
    data.bridgestruct,
    data.userid,
    dayjs().format('YYYY-MM-DD HH:mm:ss'),
    dayjs().format('YYYY-MM-DD HH:mm:ss'),
    data.longitude || 0,
    data.latitude || 0,
    data.bridgeconfig || '{}',
    data.datasources || 0,
  ];
  await db().executeSql(sql, param);
};

export const update = async data => {
  const sql = `
    update bridge 
      set bridgename = '?'
      , bridgename = ?
      , bridgetype = ?
      , bridgestation = ?
      , b16 = ?
      , areacode = ?
      , routecode = ?
      , bridgefunc = ?
      , bridgeside = ?
      , bridgestruct = ?
      , userid = ?
      , u_date = ?
      , longitude = ?
      , latitude = ?
      , bridgeconfig = ?
    where bridgeid = ?`;

  await db().executeSql(sql, [
    data.bridgename,
    data.bridgetype,
    data.bridgestation,
    data.b16,
    data.areacode,
    data.routecode,
    data.bridgefunc,
    data.bridgeside,
    data.bridgestruct,
    data.userid,
    data.u_date,
    data.longitude,
    data.latitude,
    data.bridgeconfig,
    data.bridgeid,
  ]);
};

export const new_search = async ({param, page}) => {
  const sql = `
    select * from bridge where 1=1 
    ${
      param.projectid
        ? `and bridgeid in (select bridgeid from bridge_project_bind where projectid = '${param.projectid}') `
        : ''
    }
    ${param.bridgename ? ` and bridgename like '%${param.bridgename}%' ` : ''}
    ${param.areacode ? ` and areacode = '${param.areacode}' ` : ''}
    ${param.routecode ? ` and routecode = '${param.routecode}' ` : ''}
    ORDER BY c_date DESC`;
    return await pageQuery(sql, [], page);
};


export const search = async ({param, page}) => {
  const sql = `
    select *, 
    (select count(*) from parts_checkstatus_data where bridgereportid in (
      select bridgereportid from bridge_project_bind where bridgeid = b.bridgeid
    )) as testTotal,
    (select u_date from parts_checkstatus_data where bridgereportid in (
      select bridgereportid from bridge_project_bind where bridgeid = b.bridgeid
    ) ORDER BY u_date DESC limit 1) as testDate,
    (select count(*) from bridge_report_member where 
      memberstatus = '200' and bridgereportid in (
      select bridgereportid from bridge_project_bind where projectid = '${
        param.projectid
      }' and bridgeid = b.bridgeid
    )) as member,
    (select u_date from bridge_report_member where bridgereportid in (
      select bridgereportid from bridge_project_bind where projectid = '${
        param.projectid
      }' and bridgeid = b.bridgeid
    ) ORDER BY u_date DESC limit 1 ) as date,
    (select count(*) from bridge_report_file where 
      bridgereportid in (
      select bridgereportid from bridge_project_bind where projectid = '${
        param.projectid
      }' and bridgeid = b.bridgeid
    )) as file
    from bridge as b where 1=1
    ${
      param.projectid
        ? `and bridgeid in (select bridgeid from bridge_project_bind where projectid = '${param.projectid}') `
        : ''
    }
    ${
      param.notId
        ? `and bridgeid not in (select bridgeid from bridge_project_bind where projectid = '${param.notId}')`
        : ''
    }
    ${
      param.keywords
        ? ` and (bridgestation like '%${param.keywords}%' or bridgename like '%${param.keywords}%')`
        : ''
    }
    ${
      param.bridgestation
        ? ` and bridgestation like '%${param.bridgestation}%' `
        : ''
    }
    ${param.bridgename ? ` and bridgename like '%${param.bridgename}%' ` : ''}
    ${param.bridgeside ? ` and bridgeside = '${param.bridgeside}' ` : ''}
    ${param.areacode ? ` and areacode = '${param.areacode}' ` : ''}
    ${param.routecode ? ` and routecode = '${param.routecode}' ` : ''}
  `;
  return await pageQuery(sql, [], page);
};

export const list = async userid => {
  const sql = `
    select *, 
      (select c_date from upload_log where dataid = bridge.id and category = '桥梁数据' limit 1) as upload_date
    from bridge where userid = ?
  `;
  return getResult(await db().executeSql(sql, [userid]), 'array');
};

export const localnum = async () => {
  const sql = 'select COUNT(*) as num from bridge where datasources = 0';
  return getResult(await db().executeSql(sql, []), 'object');
};

export const cloudnum = async () => {
  const sql = 'select COUNT(*) as num from bridge where datasources = 1';
  return getResult(await db().executeSql(sql, []), 'object');
};

export const bridgeList = async () => {
  const sql = 'select * from bridge';
  return getResult(await db().executeSql(sql,[]), 'array');
};
