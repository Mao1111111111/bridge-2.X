/* 
    协同检测记录表
 */
import { db, getResult } from '../utils/sqlite';
import dayjs from 'dayjs';

export const ddl = `
CREATE TABLE IF NOT EXISTS "synergy_test_record" (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, -- 文档中标记为服务器中使用
    bridgeid TEXT NOT NULL, -- 桥梁编号
    bridgereportid TEXT(50) NOT NULL, -- 检测编号
    userid TEXT(50) NOT NULL, -- 用户编号
    synergyid TEXT NOT NULL, -- 协同编号
    checkTime TEXT NOT NULL, -- 病害录入保存时的时间戳
    diseaseName TEXT NOT NULL, -- 病害名称
    isCoop TEXT NOT NULL, -- 是否是协同检测的数据
    memberid TEXT NOT NULL, -- 构件id
    membername TEXT NOT NULL, -- 构件名称
    user TEXT NOT NULL -- 协同检测任务中填入的用户名称
);
`;

// 保存
export const save = async data => {
  const sql = `
    insert into synergy_test_record (
        bridgeid
        , bridgereportid
        , userid
        , synergyid
        , checkTime
        , diseaseName
        , isCoop
        , memberid
        , membername
        , user
    ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const param = [
    data.bridgeid,
    data.bridgereportid,
    data.userid,
    data.synergyid,
    data.checkTime,
    data.diseaseName,
    data.isCoop,
    data.memberid,
    data.membername,
    data.user
  ];
  await db().executeSql(sql, param);
};

// 更新 - 根据 memberi 更新全部数据
export const update = async data => {
  const sql = `
    update synergy_test_record
    set bridgeid = ?
    , userid = ?
    , synergyid = ?
    , checkTime = ?
    , diseaseName = ?
    , isCoop = ?
    , bridgereportid = ?
    , membername = ?
    , user = ?
    where memberid = ?
    `;
  const param = [
    data.bridgeid,
    data.userid,
    data.synergyid,
    data.checkTime,
    data.diseaseName,
    data.isCoop,
    data.bridgereportid,
    data.membername,
    data.user,
    data.memberid
  ];
  await db().executeSql(sql, param);
};

// 更新 isCoop
export const updateIsCoop = async data => {
  const sql = `
    update synergy_test_record
    set isCoop = ?
    where memberid = ?
    `;
  const param = [
    data.isCoop,
    data.memberid
  ];
  await db().executeSql(sql, param);
};


// 获取所有数据
export const getList = async bridgereportid => {
  const sql = 'select * from synergy_test_record where bridgereportid = ?';
  const param = [bridgereportid];
  return getResult(await db().executeSql(sql, param), 'object');
}; 