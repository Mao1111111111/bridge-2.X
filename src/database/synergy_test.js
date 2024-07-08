/* 
    协同检测记录表
 */
import { db, getResult } from '../utils/sqlite';
import dayjs from 'dayjs';

export const ddl = `
CREATE TABLE IF NOT EXISTS "synergy_test" (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, -- 文档中标记为服务器中使用
    bridgeid TEXT NOT NULL, -- 桥梁编号
    bridgereportid TEXT(50) NOT NULL, -- 检测编号
    userid TEXT(50) NOT NULL, -- 用户编号
    synergyid TEXT NOT NULL, -- 协同编号
    synergyPeopleNum INTEGER NOT NULL, -- 协同人数
    taskId TEXT NOT NULL, -- 任务id
    WSPath TEXT NOT NULL, -- 任务ws地址
    creator TEXT NOT NULL, -- 创建者信息
    participator TEXT NOT NULL, -- 参与者信息
    c_date TEXT NOT NULL, -- 创建时间
    state TEXT NOT NULL, -- 协同状态 '非协同'、'未开始'、'协同中'、'协同结束'
    other TEXT NOT NULL -- 其他
);
`;

// 保存
export const save = async data => {
  const sql = `
    insert into synergy_test (
        bridgeid
        , bridgereportid
        , userid
        , synergyid
        , synergyPeopleNum
        , taskId
        , WSPath
        , creator
        , participator
        , c_date
        , state
        , other
    ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const param = [
    data.bridgeid,
    data.bridgereportid,
    data.userid,
    data.synergyid,
    data.synergyPeopleNum,
    data.taskId,
    data.WSPath,
    data.creator,
    data.participator,
    data.c_date,
    data.state,
    data.other,
  ];
  await db().executeSql(sql, param);
};

// 更新
export const update = async data => {
  const sql = `
    update synergy_test
    set bridgeid = ?
    , userid = ?
    , synergyid = ?
    , synergyPeopleNum = ?
    , taskId = ?
    , WSPath = ?
    , creator = ?
    , participator = ?
    , c_date = ?
    , state = ?
    , other = ?
    where bridgereportid = ?
    `;
  const param = [
    data.bridgeid,
    data.userid,
    data.synergyid,
    data.synergyPeopleNum,
    data.taskId,
    data.WSPath,
    data.creator,
    data.participator,
    data.c_date,
    data.state,
    data.other,
    data.bridgereportid
  ];
  await db().executeSql(sql, param);
};

// 更新状态
export const updateState = async data => {
  const sql = `
    update synergy_test
    set state = ?
    where bridgereportid = ?
    `;
  const param = [
    data.state,
    data.bridgereportid
  ];
  await db().executeSql(sql, param);
};

// 更新参与者
export const updateParticipator = async data => {
  const sql = `
    update synergy_test
    set participator = ?
    where bridgereportid = ?
    `;
  const param = [
    data.participator,
    data.bridgereportid
  ];
  await db().executeSql(sql, param);
};


// 根据检测编号查询
export const getByReportid = async bridgereportid => {
  const sql = 'select * from synergy_test where bridgereportid = ?';
  const param = [bridgereportid];
  return getResult(await db().executeSql(sql, param), 'object');
}; 

// 根据任务码查询
export const getBytaskId = async taskId => {
  const sql = 'select * from synergy_test where taskId = ?';
  const param = [taskId];
  return getResult(await db().executeSql(sql, param), 'object');
}; 