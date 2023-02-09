// 临时创建
// 桥梁检测构件养护计划 and 病害成因
import dayjs from 'dayjs';
import uuid from 'react-native-uuid';
import {db, getResult} from '../utils/sqlite';

export const ddl = `
CREATE TABLE IF NOT EXISTS parts_plan_genesis_data (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, -- 文档中标记为服务器中使用
  bridgereportid TEXT(50) NOT NULL, -- 桥梁本次检测编号
  dataid TEXT(50) NOT NULL, -- 数据id
  checkstatusdataid TEXT(50) NOT NULL, -- 检测数据编号
  jsondata JSON DEFAULT '{}' NOT NULL, -- 数据
  membertype TEXT(50) NOT NULL, -- 构件类型
  checktypeid TEXT(50) NOT NULL, -- 检测类型
  category TEXT(50) NOT NULL, -- 类别 plan/genesis 
  u_date TEXT NOT NULL, -- 更新日期时间
  userid TEXT(50) NOT NULl -- 用户编号
)
`;

export const save = async data => {
  const sql = `insert into parts_plan_genesis_data (
      bridgereportid
      , checkstatusdataid
      , jsondata
      , membertype
      , checktypeid
      , category
      , u_date
      , userid
      , dataid
  ) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const param = [
    data.bridgereportid,
    data.checkstatusdataid,
    data.jsondata,
    data.membertype,
    data.checktypeid || '',
    data.category,
    dayjs().format('YYYY-MM-DD HH:mm:ss'),
    data.userid,
    uuid.v4(),
  ];
  await db().executeSql(sql, param);
};

export const get = async data => {
  const sql = `
    select * from parts_plan_genesis_data where bridgereportid=? and checkstatusdataid=? and category=?
  `;
  const param = [data.bridgereportid, data.checkstatusdataid, data.category];
  return getResult(await db().executeSql(sql, param), 'object');
};

export const update = async data => {
  const sql = `
    update parts_plan_genesis_data
    set jsondata = ?
    where bridgereportid=? and checkstatusdataid=? and category=?
  `;
  const param = [
    data.jsondata,
    data.bridgereportid,
    data.checkstatusdataid,
    data.category,
  ];
  await db().executeSql(sql, param);
};

export const list = async data => {
  const sql = 'select * from parts_plan_genesis_data where bridgereportid=? ';
  const param = [data.bridgereportid];
  return getResult(await db().executeSql(sql, param), 'array');
};
