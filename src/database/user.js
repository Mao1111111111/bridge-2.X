import dayjs from 'dayjs';
import {db, getResult} from '../utils/sqlite';
// 用户表仅本地使用
export const ddl = `
CREATE TABLE IF NOT EXISTS user (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  userid TEXT(50) NOT NULL,
  username TEXT(50) NOT NULL,
  nickname TEXT(50) NOT NULL,
  loginDate TEXT(50) NOT NULL,
  password TEXT(50) NOT NULL,
  pin TEXT(50) NOT NULL,
  groups json NOT NULL,
  company json NOT NULL,
  roles json NOT NULL,
  token json NOT NULL,
  islogin INTEGER NOT NULL,
  c_date INTEGER NOT NULL,
  u_date INTEGER NOT NULL
) 
`;

export const login = async data => {
  let sql = 'select * from user where userid = ?';
  const user = getResult(await db().executeSql(sql, [data.userid]));
  if (user) {
    sql = `
      update user set 
        islogin = 1 
      , username = ?
      , nickname = ?
      , password = ?
      , loginDate = ?
      , groups = ?
      , company = ?
      , roles = ?
      , token = ?
      , u_date = ?
      , islogin = 1
      where userid = ?
    `;
    getResult(
      await db().executeSql(sql, [
        data.username,
        data.nickname,
        data.password,
        dayjs().format('YYYY-MM-DD HH:mm:ss'),
        JSON.stringify(data.groups),
        JSON.stringify(data.company),
        JSON.stringify(data.roles),
        JSON.stringify(data.token),
        dayjs().format('YYYY-MM-DD HH:mm:ss'),
        data.userid,
      ]),
    );
  } else {
    sql = `
      insert into user (
        userid,
        username,
        nickname,
        password,
        loginDate,
        pin,
        groups,
        company,
        roles,
        token,
        islogin,
        c_date,
        u_date
      ) values (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      )
    `;
    await db().executeSql(sql, [
      data.userid,
      data.username,
      data.nickname,
      data.password,
      dayjs().format('YYYY-MM-DD HH:mm:ss'),
      data.pin,
      JSON.stringify(data.groups),
      JSON.stringify(data.company),
      JSON.stringify(data.roles),
      JSON.stringify(data.token),
      data.islogin,
      dayjs().format('YYYY-MM-DD HH:mm:ss'),
      dayjs().format('YYYY-MM-DD HH:mm:ss'),
    ]);
  }
  return data;
};

export const createpin = async data => {
  const sql = 'update user set pin = ? where userid = ?';
  await db().executeSql(sql, [data.pin, data.userid]);
};

export const check = async data => {
  const sql2 = 'select * from user where username = ? and password = ?';
  return getResult(
    await db().executeSql(sql2, [data.username, data.password]),
    'object',
  );
};

export const loginpin = async data => {
  const sql2 = 'select * from user where username = ? and pin = ?';
  const user = getResult(
    await db().executeSql(sql2, [data.username, data.pin]),
    'object',
  );
  const sql = 'update user set islogin = 1 where username = ?';
  await db().executeSql(sql, [data.username]);
  if (user) {
    return user;
  } else {
    return null;
  }
};
export const getLoginUser = async () => {
  const sql = 'select * from user where islogin = 1 limit 1';
  return getResult(await db().executeSql(sql, []), 'object');
};

export const logout = async () => {
  const sql = 'update user set islogin = 0';
  await db().executeSql(sql, []);
};

export const getLastLoginUser = async () => {
  const sql = 'select * from user ORDER BY loginDate DESC limit 1';
  return getResult(await db().executeSql(sql, []), 'object');
};
