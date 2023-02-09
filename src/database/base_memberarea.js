// 文档：桥梁基础数据相关表设计
// 桥梁结构部件检测位置数据表
import {db} from '../utils/sqlite';

export const ddl = `
CREATE TABLE IF NOT EXISTS base_memberarea (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	companyid TEXT(50) NOT NULL, -- 企业编号
    checktype TEXT(50) NOT NULL, -- 场景类型
    membertype TEXT(10) NOT NULL, -- 部件编号
    areatype TEXT(50) NOT NULL, -- 部件类型标号
    areaparamjson TEXT NOT NULL, -- 构建区域
    areanodejson TEXT NOT NULL, -- 位置节点
    orderdesc INTEGER NOT NULL, -- 排序编号
    exampleimg TEXT NOT NULL -- 实例图片
);
`;

export const remove = async id => {
  const sql = 'delete from base_memberarea where id = ?';
  const param = [id];
  await db().executeSql(sql, param);
};

export const save = async data => {
  const sql = `
  insert into base_memberarea (
      companyid
      , checktype
      , membertype
      , areatype
      , areaname
      , areaparamjson
      , areanodejson
      , orderdesc
      , exampleimg
  ) values (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const param = [
    data.companyid,
    data.checktype,
    data.membertype,
    data.areatype,
    data.areaname,
    data.areaparamjson || '{}',
    data.areanodejson || '{}',
    data.orderdesc,
    data.example || '',
  ];
  await db().executeSql(sql, param);
};

export const update = async data => {
  const sql = `
  update base_memberarea
  set companyid = ?
      , checktype = ?
      , membertype = ?
      , areatype = ?
      , areaname = ?
      , areaparamjson = ?
      , areanodejson = ?
      , orderdesc = ?
      , exampleimg = ?
  where id = ?
  `;
  const param = [
    data.companyid,
    data.checktype,
    data.membertype,
    data.areatype,
    data.areaname,
    data.areaparamjson || '{}',
    data.areanodejson || '{}',
    data.orderdesc,
    data.example || '',
    data.id,
  ];
  await db().executeSql(sql, param);
};
