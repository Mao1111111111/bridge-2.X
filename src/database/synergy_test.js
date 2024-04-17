/* 
    协同检测记录表
 */
import {db, getResult} from '../utils/sqlite';
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
    creator TEXT NOT NULL, -- 创建者信息
    c_date TEXT NOT NULL, -- 创建时间
    state TEXT NOT NULL, -- 协同状态
    other TEXT NOT NULL -- 其他
);
`;

// 保存
export const save = async data => {
    const sql = `
    insert into upload_state_record (
        bridgeid
        , bridgereportid
        , userid
        , u_date
        , state
    ) values (?, ?, ?, ?, 0)
    `;
    const param = [
      data.bridgeid,
      data.bridgereportid,
      data.userid,
      dayjs().format('YYYY-MM-DD HH:mm:ss'),
    ];
    await db().executeSql(sql, param);
  };

// 更新
export const update = async data => {
    const sql = `
    update upload_state_record
    set state = ?
        , u_date = ?
    where bridgereportid = ?
    `;
    const param = [
      data.state,
      dayjs().format('YYYY-MM-DD HH:mm:ss'),
      data.bridgereportid,
    ];
    await db().executeSql(sql, param);
  };

//根据检测id查询
export const getById = async bridgereportid => {
  const sql = 'select * from upload_state_record where bridgereportid = ?';
  const param = [bridgereportid];
  return getResult(await db().executeSql(sql, param), 'object');
}; 