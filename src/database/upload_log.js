// 临时创建
// 上传记录仅本地使用
import dayjs from 'dayjs';
import {db, getResult} from '../utils/sqlite';

export const ddl = `
CREATE TABLE IF NOT EXISTS upload_log (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, -- 文档中标记为服务器中使用
    dataid TEXT(50) NOT NULL, -- 构件编号
    category TEXT(10) NOT NULL, -- 数据类别
    to_projcet_id TEXT(50) NOT NULL, -- 上传到项目id
    to_projcet_name TEXT(50) NOT NULL, -- 上传到项目名字
    c_date TEXT(50) NOT NULL -- 更新日期时间
);
`;

export const save = async data => {
  const sql = `insert into upload_log 
    (dataid, category, to_projcet_id, to_projcet_name, c_date) 
    values (?, ?, ?, ?, ?)`;
  const param = [
    data.dataid,
    data.category,
    data.to_projcet_id || '',
    data.to_projcet_name || '',
    dayjs().format('YYYY-MM-DD HH:mm:ss'),
  ];
  await db().executeSql(sql, param);
};

export const total = async () => {
  const sql = "select dataid from upload_log where category = '检测数据'";
  return getResult(await db().executeSql(sql, []), 'array');
};
