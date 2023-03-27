import dayjs from 'dayjs';
import {db, getResult} from '../utils/sqlite';

export const ddl = `
CREATE TABLE IF NOT EXISTS area (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, -- 文档中标记为服务器中使用
  pcode TEXT(50) NOT NULL, -- 上级编码
  code TEXT(50) NOT NULL, -- 编码
  name TEXT(50) NOT NULL, -- 名称
  data json NOT NULL, -- 数据 {"kmstart": "text","kmend": "text","routelength": num}
  category TEXT(10) NOT NULL, -- 分类 org 组织机构 areamanage 管理处 area 养护区/路段 route 路线
  c_date TEXT(50) NOT NULL -- 创建时间
);
`;

export const list = async () => {
  const sql = 'select * from area';
  return getResult(await db().executeSql(sql), 'array');
};

export const save = async data => {
  const sql =
    'insert into area (code, name, pcode, data, category, c_date) values (?, ?, ?, ?, ?, ?)';
  const param = [
    data.code,
    data.name,
    data.pcode,
    JSON.stringify(data.data),
    data.category,
    dayjs().format('YYYY-MM-DD HH:mm:ss'),
  ];
  await db().executeSql(sql, param);
};

// 生成临时测试数据
// 同步数据  先删除表，然后再逐条插入
export const syncData = async data => {
  const sql2 = 'delete from area';
  await db().executeSql(sql2);
  await Promise.all(data.map(save));
};
