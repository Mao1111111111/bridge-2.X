import dayjs from 'dayjs';
import {db, getResult, pageQuery} from '../utils/sqlite';

export const ddl = `
CREATE TABLE IF NOT EXISTS file_gps (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, -- 文档中标记为服务器中使用
    bridgeid TEXT(50) NOT NULL, -- 桥梁编号
    bridgereportid TEXT(50) NOT NULL, -- 桥梁本次检测编号
    mediaid TEXT(50) NOT NULL, -- 媒体数据id
    c_date TEXT(50) NOT NULL,
    u_date TEXT(50) NOT NULL,
    longitude REAL NOT NULL, -- 经度
    latitude REAL NOT NULL, -- 纬度
    accuracy REAL NOT NULL, -- 精度
    altitude REAL NOT NULL, -- 高度
    other TEXT NOT NULL
);
`;

export const getForMediaid = async mediaid => {
  const sql = 'select * from file_gps where mediaid = ?';
  return getResult(await db().executeSql(sql, [mediaid]), 'object');
};

export const save = async data => {
  const sql = `
  insert into file_gps (
      bridgeid
      , bridgereportid
      , mediaid
      , c_date
      , u_date
      , longitude
      , latitude
      , accuracy
      , altitude
      , other
  ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const param = [
    data.bridgeid,
    data.bridgereportid,
    data.mediaid,
    dayjs().format('YYYY-MM-DD HH:mm:ss'),
    dayjs().format('YYYY-MM-DD HH:mm:ss'),
    data.longitude,
    data.latitude,
    data.accuracy,
    data.altitude,
    data.other||'',
  ];
  await db().executeSql(sql, param);
};

export const update = async data => {
  const sql = `
    update file_gps 
      set u_date = ?
      , longitude = ?
      , latitude = ?
      , accuracy = ?
      , altitude = ?
    where mediaid = ?`;

  await db().executeSql(sql, [
    data.u_date ||dayjs().format('YYYY-MM-DD HH:mm:ss'),
    data.longitude,
    data.latitude,
    data.accuracy,
    data.altitude,
    data.mediaid,
  ]);
};

export const remove = async mediaid => {
  const sql =
    'delete from file_gps where mediaid = ?';
  const param = [mediaid];
  await db().executeSql(sql, param);
};

export const remove2 = async bridgereportid => {
  const sql = 'delete from file_gps where bridgereportid = ?';
  const param = [bridgereportid];
  await db().executeSql(sql, param);
};