/* 
  桥梁检测的全局参数
 */
import React from 'react';
import uuid from 'react-native-uuid';
import {View, StyleSheet} from 'react-native';
import {tailwind, colors} from 'react-native-tailwindcss';
import {ActivityIndicator} from 'react-native-paper';
import reducer from '../../../../providers/reducer';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';
import * as bridgeMember from '../../../../database/bridge_member';
import * as bridgeReport from '../../../../database/bridge_report';
import * as bridgeReportFile from '../../../../database/bridge_report_file';
import * as bridgeProjectBind from '../../../../database/bridge_project_bind';
import * as bridgeReportMember from '../../../../database/bridge_report_member';
import * as partsCheckstatusData from '../../../../database/parts_checkstatus_data';
import * as checkstatusMedia from '../../../../database/bridge_report_member_checkstatus_media';
import location from '../../../../utils/location';
import storage from '../../../../utils/storage';
import {loop, listToGroup} from '../../../../utils/common';

// 上下文空间
const Context = React.createContext();

// 消费者
const Consumer = Context.Consumer;

// 提供者
const Provider = ({bridge, project, children}) => {
  // bridge是当前桥梁的数据，project是当前项目信息

  // 全局参数 -- 用户信息、桥梁基础信息
  const {
    state: {userInfo, basememberinfo},
  } = React.useContext(GlobalContext);

  const [state, dispatch] = React.useReducer(reducer, {
    // 检测id
    bridgereportid: '',
    // 当前项目的信息
    project: {},
    // 当前桥梁的基本信息
    bridge: {},
    // 检测构件列表 -- 对应bridge_report_member表的数据
    partsList: [],
    // 缓存的检测部位列表 保存用
    cachePartsList: [],
    // 缓存的文件 保存用
    cacheFileData: null, 
    // 检测桥梁的部件列表
    memberList: [],
    // 检测桥梁的跨列表
    kuaList: [],
    // 当前桥梁检测 的 媒体文件
    fileList: [],
    memberCheckstatus: [],
    baseMembercheckGroup: [],
    close: null,
    // 整个loading
    isLoading: false,
    // 初始化
    isInit: true,
    // 病害分组列表和病害明细表
    groupList: [],
    // 全部的部件信息 b10 b20 b30分组
    memberInfo: {},

    //刷新
    //reflush
  });

  // 获取 病害分组列表和病害明细表
  React.useEffect(() => {
    storage.getBaseItem('病害分组列表和病害明细表').then(res => {
      if (res.data && res.data.length) {
        dispatch({type: 'groupList', payload: res.data[0]?.list});
      }
    });
  }, []);

  // 初始化数据 -- 当前桥梁数据、当前项目数据、用户信息变化时触发
  React.useEffect(() => {
    if (!bridge.bridgeid) {
      return;
    }
    // 初始化数据 的 函数
    const initData = async () => {
      // 获取检测id 从 bridgeProjectBind表
      const {bridgereportid} = await bridgeProjectBind.get({
        projectid: project.projectid,
        bridgeid: bridge.bridgeid,
      });
      // 从 桥梁检测表bridgeReport 中获取 检测桥梁的数据(检测情况的数据)
      const bridgeReportData = await bridgeReport.get({
        bridgeid: bridge.bridgeid,
        bridgereportid,
      });
      let _partsList = [];
      // 初始化检测部位列表
      if (!bridgeReportData) {
        // 当桥梁首次进入桥梁检测时
        // 新建桥梁检测数据
        await bridgeReport.save({
          bridgeid: bridge.bridgeid,
          bridgereportid,
          userid: userInfo.userid,
        });
        // 获取桥梁的构件，并在数据中加入 报告id、构件检测状态、构件评分、更新时间
        _partsList = (await bridgeMember.list(bridge.bridgeid)).map(item => ({
          ...item,
          bridgereportid,
          memberstatus: '0',
          dpscores_auto: 0,
          u_date: '',
        }));
        // 将桥梁构件数据 存入 桥梁构件检测表
        await loop(_partsList, bridgeReportMember.save);
      } else {
        // 获取检测构件列表
        _partsList = await bridgeReportMember.list({
          bridgeid: bridge.bridgeid,
          bridgereportid,
        });
      }
      // 获取检测中的媒体文件
      const fileList = await bridgeReportFile.list({
        bridgereportid,
        bridgeid: bridge.bridgeid,
      });
      // 当前桥梁信息
      dispatch({type: 'bridge', payload: bridge});
      // 当前项目信息
      dispatch({type: 'project', payload: project});
      // 当前桥梁检测 的 媒体文件
      dispatch({type: 'fileList', payload: fileList || []});
      // 当前桥梁检测id
      dispatch({type: 'bridgereportid', payload: bridgereportid});
      // 检测桥梁构件列表
      dispatch({type: 'partsList', payload: _partsList || []});
    };
    // 初始化数据
    dispatch({type: 'isInit', payload: true});
    // 执行上面定义的 初始化函数
    initData()
      .then(() => dispatch({type: 'isInit', payload: false}))
      .catch(err => {
        console.info(err);
        dispatch({type: 'isInit', payload: false});
      });
  }, [bridge, project, userInfo]);

  // 跨/构件视角 数据 -- 初始化状态、构建列表、基本构件信息变化时触发
  React.useEffect(() => {
    if (state.isInit || !basememberinfo) {
      return;
    }

    const getLastDate = plist => {
      return plist
        .map(({u_date}) => u_date)
        .sort((a, b) => b.localeCompare(a))[0];
    };

    // 获取跨列表 、 部件列表
    const fun = key => {
      const data = new Set();
      // 将构建列表 的 跨编号存入data
      state.partsList.forEach(item => data.add(item[key]));
      // 对跨编号遍历
      return [...data].map(item => {
        const plist = state.partsList.filter(i => i[key] === item);
        return {
          title:
            key === 'membertype'
              ? basememberinfo?.find(it => it.membertype === item)?.membername
              : `${item}#跨`,
          [key]: item,
          type: key === 'membertype' ? 'member' : 'kua',
          total: plist.length,
          done: plist.filter(
            i => i.memberstatus !== '0' && i.memberstatus !== '300',
          ).length,
          lastEditDate: getLastDate(plist),
        };
      });
    };
    // 部件信息，b10 b20 b30分组
    dispatch({
      type: 'memberInfo',
      payload: listToGroup(basememberinfo, 'positionid'),
    });
    // stepno为跨编号
    dispatch({type: 'kuaList', payload: fun('stepno') || []});
    // 当前 检测桥梁 的 部件列表 
    dispatch({
      type: 'memberList',
      payload:
        fun('membertype').sort((a, b) =>
          a.membertype.localeCompare(b.membertype),
        ) || [],
    });
  }, [state.isInit, state.partsList, basememberinfo]);

  // 跨/构件视角 数据 -- 
  React.useEffect(() => {
    if (!state.reflush || !basememberinfo || !state.bridgereportid) {
      return;
    }
    // 桥梁检测构件表
    bridgeReportMember
      .list({
        bridgeid: state.bridge.bridgeid,
        bridgereportid: state.bridgereportid,
      })
      .then(res => {
        const fun = key => {
          const data = new Set();
          res.forEach(item => data.add(item[key]));
          return [...data].map(item => ({
            title:
              key === 'membertype'
                ? basememberinfo?.find(it => it.membertype === item)?.membername
                : `${item}#跨`,
            [key]: item,
            type: key === 'membertype' ? 'member' : 'kua',
            total: res.filter(i => i[key] === item).length,
            done: res.filter(
              i =>
                i[key] === item &&
                i.memberstatus !== '0' &&
                i.memberstatus !== '300',
            ).length,
            lastEditDate: '-',
          }));
        };
        dispatch({type: 'partsList', payload: res || []});
        dispatch({type: 'kuaList', payload: fun('stepno') || []});
        dispatch({
          type: 'memberList',
          payload:
            fun('membertype').sort((a, b) =>
              a.membertype.localeCompare(b.membertype),
            ) || [],
        });
      });
  }, [state.reflush, basememberinfo, state.bridgereportid, state.bridge]);

  // 部件数据更新 -- bridgeReportMember表，更新部件检测状态；partsCheckstatusData表，更新保存数据
  React.useEffect(() => {
    // 解除 loading
    if (state.isInit || !state.cachePartsList.length) {
      dispatch({type: 'isLoading', payload: false});
      return;
    }
    const update = async () => {
      // 检测构件更新状态
      await bridgeReportMember.updateStatus({
        memberstatus: state.cachePartsList[0].memberstatus,
        ids: state.cachePartsList.map(item => `'${item.memberid}'`),
        bridgereportid: state.bridgereportid,
      });
      const flg = !!(
        await partsCheckstatusData.getByVersion(state.cachePartsList[0].version)
      ).length;
      await loop(state.cachePartsList, async item => {
        const param = {
          bridgereportid: state.bridgereportid,
          dataid: item.memberid,
          jsondata: JSON.stringify(item.jsondata || {}),
          memberstatus: item.memberstatus,
          datatype: item.datatype,
          version: item.version,
          dataGroupId: item.dataGroupId,
          userid: userInfo.userid,
          latitude: location.getPosition().latitude,
          longitude: location.getPosition().longitude,
        };
        if (flg) {
          // 更新部件检测数据
          await partsCheckstatusData.update(param);
        } else {
          // 报错部件检测数据
          await partsCheckstatusData.save(param);
        }
      });
      return await bridgeReportMember.list({
        bridgeid: state.bridge.bridgeid,
        bridgereportid: state.bridgereportid,
      });
    };
    // 设置检测构件列表，清空缓存
    update()
      .then(res => dispatch({type: 'partsList', payload: res || []}))
      .catch(err => console.info(err))
      .finally(() => {
        dispatch({type: 'isLoading', payload: false});
        dispatch({type: 'cachePartsList', payload: []});
      });
  }, [
    state.cachePartsList,
    state.isInit,
    state.bridge,
    state.bridgereportid,
    userInfo.userid,
  ]);

  // ？？？媒体文件保存 -- 缓存文件...变化时触发
  React.useEffect(() => {
    if (state.isInit || !state.cacheFileData) {
      return;
    }
    const fun = async () => {
      const data = {
        ...state.cacheFileData,
        bridgeid: state.bridge.bridgeid,
        bridgereportid: state.bridgereportid,
        userid: userInfo.userid,
      };
      if (state.cacheFileData.isAdd) {
        // 检测桥梁构件状态的媒体表bridge_report_member_checkstatus_media ，保存数据
        await checkstatusMedia.save(data);
        // 桥梁报告文件表，保存数据
        await bridgeReportFile.save(data);
      }
      // 更新 -- 即 对图片位置添加图片
      if (state.cacheFileData.isUpdate) {
        // 检测桥梁构件状态的媒体表bridge_report_member_checkstatus_media ，更新数据
        await bridgeReportFile.update(data);
        // 桥梁报告文件表，更新数据
        await checkstatusMedia.update(data);
        // 如果复制路径存在
        if (data.copypath) {
          // 删除原来的图片数据再保存
          await checkstatusMedia.removeByParentmediaid(data.mediaid);
          await checkstatusMedia.save({
            ...data,
            filepath: data.copypath,
            mediaid: uuid.v4(),
            parentmediaid: data.mediaid,
          });
        }
      }
      // 删除媒体
      if (state.cacheFileData.isDelete) {
        await checkstatusMedia.remove(data.mediaid);
        await bridgeReportFile.remove(data.mediaid);
      }
      const res = await bridgeReportFile.list({
        bridgeid: state.bridge.bridgeid,
        bridgereportid: state.bridgereportid,
      });
      return res;
    };
    fun()
      .then(res => dispatch({type: 'fileList', payload: res || []}))
      .catch(err => console.info(err))
      .finally(() => {
        dispatch({type: 'isLoading', payload: false});
        dispatch({type: 'cacheFileData', payload: null});
      });
  }, [
    state.cacheFileData,
    state.isInit,
    state.bridge,
    state.bridgereportid,
    userInfo.userid,
  ]);

  return (
    <Context.Provider value={{state, dispatch}}>
      {children}
      {state.isInit || state.isLoading ? (
        // 未初始化完 或 loading 显示 loading圈
        <View style={styles.loading}>
          <ActivityIndicator
            size={50}
            animating={true}
            color={colors.purple700}
          />
        </View>
      ) : (
        <></>
      )}
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  loading: {
    ...tailwind.absolute,
    ...tailwind.wFull,
    ...tailwind.hFull,
    ...tailwind.justifyCenter,
    backgroundColor: 'rgba(255,255,255,0.6)',
    zIndex: 200,
  },
});

export {Context, Consumer, Provider};
