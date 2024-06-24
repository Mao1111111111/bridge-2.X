import SQLite from 'react-native-sqlite-storage';
import {ddl as projectDdl} from '../database/project';
import {ddl as bridgeProjectBindDdl} from '../database/bridge_project_bind';
import {ddl as areaDdl} from '../database/area';
import {ddl as bridgeDdl} from '../database/bridge';
import {ddl as editLogDdl} from '../database/edit_log';
import {ddl as baseDataDdl} from '../database/base_data';
import {ddl as bridgeMemberDdl} from '../database/bridge_member';
import {ddl as bridgeReportDdl} from '../database/bridge_report';
import {ddl as bridgeReportMemberDdl} from '../database/bridge_report_member';
import {ddl as bridgeReportMemberCheckstatusDdl} from '../database/bridge_report_member_checkstatus';
import {ddl as partsCheckstatusDataDdl} from '../database/parts_checkstatus_data';
import {ddl as checkstatusMediaDdl} from '../database/bridge_report_member_checkstatus_media';
import {ddl as bridgeReportFileDdl} from '../database/bridge_report_file';
import {ddl as partsPlanGenesisDataDdl} from '../database/parts_plan_genesis_data';
import {ddl as uploadLogDdl} from '../database/upload_log';
import {ddl as userDdl} from '../database/user';
import {ddl as uploadStateRecordDdl} from '../database/upload_state_record';
import {ddl as fileGPSDdl} from '../database/file_gps';

SQLite.enablePromise(true);
let _db = null;

// const clear = async () => {
//   await _db.executeSql('drop table IF EXISTS project');
//   await _db.executeSql('drop table IF EXISTS bridge');
//   await _db.executeSql('drop table IF EXISTS bridge_project_bind');
// };

export const init = async () => {
  _db = await SQLite.openDatabase({name: 'jianlide-sql.db'});
  // await clear();

  /**
   * 2022-04-12
   * 根据服务端表结构生成的项目表
   */
  // 项目表
  await _db.executeSql(projectDdl);
  // 桥梁项目检测绑定关系列表（bridgeprojectbindlist）
  await _db.executeSql(bridgeProjectBindDdl);
  // 养护区/路段 路线
  await _db.executeSql(areaDdl);
  // 基础数据
  await _db.executeSql(baseDataDdl);
  // 桥梁表
  await _db.executeSql(bridgeDdl);
  // 桥梁构件
  await _db.executeSql(bridgeMemberDdl);
  // 桥梁检测
  await _db.executeSql(bridgeReportDdl);
  // 桥梁检测部件
  await _db.executeSql(bridgeReportMemberDdl);
  // 桥梁检测部件
  await _db.executeSql(bridgeReportMemberCheckstatusDdl);
  // 文件
  await _db.executeSql(checkstatusMediaDdl);
  // 文件 中间表
  await _db.executeSql(bridgeReportFileDdl);
  // 桥梁检测记录
  // await _db.executeSql('drop table IF EXISTS parts_checkstatus_data');
  await _db.executeSql(partsCheckstatusDataDdl);
  // 桥梁检测构件养护计划 and 病害成因
  await _db.executeSql(partsPlanGenesisDataDdl);
  // 桥梁检测操作记录
  await _db.executeSql(editLogDdl);
  // 上传记录
  await _db.executeSql(uploadLogDdl);
  // 用户
  // await _db.executeSql('drop table IF EXISTS user');
  await _db.executeSql(userDdl);
  // 上传状态记录表
  await _db.executeSql(uploadStateRecordDdl);
  // 文件gps记录表
  await _db.executeSql(fileGPSDdl);
};
export const db = () => _db;

export const getResult = (raw, type) => {
  const _list = [];
  try {
    for (let i = 0; i < raw[0].rows.length; i++) {
      _list.push(raw[0].rows.item(i));
    }
    return type === 'array' ? _list : _list[0];
  } catch (err) {
    return _list;
  }
};

export const allData = async () => {
  const tables = getResult(
    await db().executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' order by name",
    ),
    'array',
  );
  const sqls = tables.map(({name}) => ({
    table: name,
    sql: `select * from ${name}`,
  }));

  const data = await Promise.all(
    sqls.map(async ({table, sql}) => ({
      table,
      data: getResult(await db().executeSql(sql), 'array'),
    })),
  );
  const res = {};
  data.forEach(item => (res[item.table] = item.data));
  return res;
};

export const pageQuery = async (sql, params, _page) => {
  const {total} = getResult(
    await db().executeSql(
      `select COUNT(*) as total from (${sql}) as T `,
      params,
    ),
    'object',
  );
  const list = getResult(
    await db().executeSql(
      `select * from (${sql}) as T limit ${_page.pageSize} offset ${
        _page.pageNo * _page.pageSize
      }`,
      params,
    ),
    'array',
  );
  return {
    page: {
      pageSize: _page.pageSize,
      pageNo: _page.pageNo,
      pageTotal: Math.ceil(total / _page.pageSize),
      total,
    },
    list,
  };
};
