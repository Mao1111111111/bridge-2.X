/* 
    上传状态记录表
 */
import {db, getResult} from '../utils/sqlite';
import dayjs from 'dayjs';

export const ddl = `
CREATE TABLE IF NOT EXISTS "upload_state_record" (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, -- 文档中标记为服务器中使用
    bridgeid TEXT NOT NULL, -- 桥梁编号
    bridgereportid TEXT(50) NOT NULL, -- 检测编号
    userid TEXT(50) NOT NULL, -- 用户编号
    state INTEGER NOT NULL, -- 上传状态 0未上传 1有更新 2上传失败 3已上传 
    u_date TEXT NOT NULL -- 更新时间
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