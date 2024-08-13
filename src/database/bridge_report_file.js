// 临时使用，桥梁检测数据文件中间表
import dayjs from 'dayjs';
import {db, getResult} from '../utils/sqlite';

export const ddl = `
  CREATE TABLE IF NOT EXISTS bridge_report_file (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, -- 文档中标记为服务器中使用
    bridgeid TEXT(50) NOT NULL, -- 桥梁编号
    bridgereportid TEXT(50) NOT NULL, -- 桥梁本次检测编号
    dataid TEXT(50) NOT NULL, -- 数据编号
    mediaid TEXT(50) NOT NULL, -- 文件名
    type TEXT(50) NOT NULL, -- 业务类型
    category TEXT(50) NOT NULL, -- 分类
    inx TEXT(50) NOT NULL, -- 编号
    remark TEXT(50) NOT NULL, -- 备注
    userid TEXT(50) NOT NULL, -- 用户编号
    is_source INTEGER NOT NULL, -- 是否使用源文件 1是 0否
    is_preference INTEGER NOT NULL, -- 是否优先使用 1是 0否
    u_date TEXT NOT NULL -- 日期时间
  );
`;

export const remove = async mediaid => {
  const sql = 'delete from bridge_report_file where mediaid = ?';
  const param = [mediaid];
  await db().executeSql(sql, param);
};
export const remove2 = async bridgereportid => {
  const sql = 'delete from bridge_report_file where bridgereportid = ?';
  const param = [bridgereportid];
  await db().executeSql(sql, param);
};

export const save = async data => {
  const sql = `
    insert into bridge_report_file (
        bridgeid
        , bridgereportid
        , dataid
        , mediaid
        , type
        , category
        , inx
        , is_source
        , is_preference
        , remark
        , userid
        , u_date
    ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const param = [
    data.bridgeid,
    data.bridgereportid,
    data.dataid,
    data.mediaid,
    data.type,
    data.category,
    data.inx,
    data.is_source || 0,
    data.is_preference || 0,
    data.remark,
    data.userid,
    data.u_date || dayjs().format('YYYY-MM-DD HH:mm:ss'),
  ];
  await db().executeSql(sql, param);
};

export const update = async data => {
  const sql = `
    update bridge_report_file
    set bridgeid = ?
        , bridgereportid = ?
        , dataid = ?
        , mediaid = ?
        , type = ?
        , category = ?
        , inx = ?
        , is_source = ?
        , is_preference = ?
        , remark = ?
        , userid = ?
        , u_date = ?
    where mediaid = ?`;
  const param = [
    data.bridgeid,
    data.bridgereportid,
    data.dataid,
    data.mediaid,
    data.type,
    data.category,
    data.inx,
    data.is_source || 0,
    data.is_preference || 0,
    data.remark,
    data.userid,
    data.u_date || dayjs().format('YYYY-MM-DD HH:mm:ss'),
    data.mediaid,
  ];
  await db().executeSql(sql, param);
};

export const list = async data => {
  const sql = `
    select 
      f.id  
    , f.bridgeid
    , f.bridgereportid
    , f.dataid
    , f.type
    , f.category
    , f.inx
    , f.is_source
    , f.is_preference
    , f.remark
    , f.userid
    , f.u_date 
    , m.mediatype
    , m.parentmediaid
    , m.mediaid
    , m.filename
    , m.filetypes
    , m.filesize
    , m.filepath
    , m.duration
    , (select filepath from 
        bridge_report_member_checkstatus_media where parentmediaid=m.mediaid
        ) as copypath  
    from bridge_report_file as f
    left join bridge_report_member_checkstatus_media as m
    on m.mediaid = f.mediaid
    where f.bridgeid = ? and f.bridgereportid = ?
    ORDER BY f.id DESC
  `;
  const param = [data.bridgeid, data.bridgereportid];
  return getResult(await db().executeSql(sql, param), 'array');
};

export const total = async data => {
  const sql = `
  select sum(m.filesize) as filesize
    from bridge_report_file as f
    left join bridge_report_member_checkstatus_media as m
    on m.mediaid = f.mediaid
    where
    f.bridgereportid = 
    (select bridgereportid from bridge_project_bind where id in (
      select dataid from upload_log where category = '检测数据'
    ))
    ORDER BY f.id DESC
  `;
  return getResult(await db().executeSql(sql, []), 'array');
};
