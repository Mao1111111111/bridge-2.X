import dayjs from 'dayjs';
import {db, getResult} from '../utils/sqlite';

/**
 * 分类：
 * bridgetype 桥梁类型参数
 * bridgeside 桥幅属性
 * bridgefunc 功能类型
 * bridgestruct-g 结构体系-梁式桥
 * bridgestruct-a 结构体系-拱式桥
 * bridgestruct-s 结构体系-悬索桥
 * bridgestruct-c 结构体系-斜拉桥
 * bridgelightsys 照明系统
 * bridgeabutment 桥台形式
 * bridgepier 桥墩形式
 * bridgepadno 支座编号
 * **/

export const ddl = `
CREATE TABLE IF NOT EXISTS base_data (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  paramid TEXT(50) NOT NULL, -- 编号
  paramname TEXT(50) NOT NULL, -- 名称
  category TEXT(10) NOT NULL, -- 分类
  "order" INTEGER NOT NULL, -- 顺序
  isDefault INTEGER NOT NULL, -- 是否默认 0否 1是
  c_date TEXT NOT NULL -- 创建时间
);
`;

export const list = async () => {
  const sql = 'select * from base_data';
  return getResult(await db().executeSql(sql), 'array');
};

export const save = async data => {
  const sql = `insert into base_data (
      paramid, paramname, category, "order", isDefault, c_date
      ) values (?, ?, ?, ?, ?, ?)`;
  const param = [
    data.paramid,
    data.paramname,
    data.category,
    data.order,
    data.isDefault,
    dayjs().format('YYYY-MM-DD HH:mm:ss'),
  ];
  await db().executeSql(sql, param);
};

// 生成临时测试数据
// export const createInitData = async () => {
//   const sql2 = 'delete from base_data';
//   await db().executeSql(sql2);
//   const sql = 'select * from base_data';
//   const res = getResult(await db().executeSql(sql), 'array');
//   if (res.length === 0) {
//     await Promise.all(initData.map(save));
//     return getResult(await db().executeSql(sql), 'array');
//   } else {
//     return res;
//   }
// };

// 同步数据
export const syncData = async data => {
  const sql2 = 'delete from base_data';
  await db().executeSql(sql2);
  await Promise.all(data.map(save));
};
