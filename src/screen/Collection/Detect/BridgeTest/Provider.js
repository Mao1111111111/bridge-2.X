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

const Context = React.createContext();

const Consumer = Context.Consumer;

const Provider = ({bridge, project, children}) => {
  const {
    state: {userInfo, basememberinfo},
  } = React.useContext(GlobalContext);

  const [state, dispatch] = React.useReducer(reducer, {
    bridgereportid: '', // 检测id
    project: {}, // 项目信息
    bridge: {}, // 桥梁信息
    partsList: [], // 检测部位列表
    cachePartsList: [], // 缓存的检测部位列表 保存用
    cacheFileData: null, // 缓存的文件 保存用
    memberList: [],
    kuaList: [],
    fileList: [], // 文件列表
    memberCheckstatus: [],
    baseMembercheckGroup: [],
    close: null,
    isLoading: false,
    isInit: true,
    groupList: [],
    memberInfo: {},
  });

  React.useEffect(() => {
    storage.getBaseItem('病害分组列表和病害明细表').then(res => {
      if (res.data && res.data.length) {
        dispatch({type: 'groupList', payload: res.data[0]?.list});
      }
    });
  }, []);

  // 初始化数据
  React.useEffect(() => {
    if (!bridge.bridgeid) {
      return;
    }
    const initData = async () => {
      const {bridgereportid} = await bridgeProjectBind.get({
        projectid: project.projectid,
        bridgeid: bridge.bridgeid,
      });
      const bridgeReportData = await bridgeReport.get({
        bridgeid: bridge.bridgeid,
        bridgereportid,
      });
      let _partsList = [];
      // 初始化检测部位列表
      if (!bridgeReportData) {
        await bridgeReport.save({
          bridgeid: bridge.bridgeid,
          bridgereportid,
          userid: userInfo.userid,
        });
        _partsList = (await bridgeMember.list(bridge.bridgeid)).map(item => ({
          ...item,
          bridgereportid,
          memberstatus: '0',
          dpscores_auto: 0,
          u_date: '',
        }));
        await loop(_partsList, bridgeReportMember.save);
      } else {
        _partsList = await bridgeReportMember.list({
          bridgeid: bridge.bridgeid,
          bridgereportid,
        });
      }
      const fileList = await bridgeReportFile.list({
        bridgereportid,
        bridgeid: bridge.bridgeid,
      });
      dispatch({type: 'bridge', payload: bridge});
      dispatch({type: 'project', payload: project});
      dispatch({type: 'fileList', payload: fileList || []});
      dispatch({type: 'bridgereportid', payload: bridgereportid});
      dispatch({type: 'partsList', payload: _partsList || []});
    };
    // 初始化数据
    dispatch({type: 'isInit', payload: true});
    initData()
      .then(() => dispatch({type: 'isInit', payload: false}))
      .catch(err => {
        console.info(err);
        dispatch({type: 'isInit', payload: false});
      });
  }, [bridge, project, userInfo]);

  // 跨/构件视角 数据
  React.useEffect(() => {
    if (state.isInit || !basememberinfo) {
      return;
    }

    const getLastDate = plist => {
      return plist
        .map(({u_date}) => u_date)
        .sort((a, b) => b.localeCompare(a))[0];
    };

    const fun = key => {
      const data = new Set();
      state.partsList.forEach(item => data.add(item[key]));
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
    dispatch({
      type: 'memberInfo',
      payload: listToGroup(basememberinfo, 'positionid'),
    });
    dispatch({type: 'kuaList', payload: fun('stepno') || []});
    dispatch({
      type: 'memberList',
      payload:
        fun('membertype').sort((a, b) =>
          a.membertype.localeCompare(b.membertype),
        ) || [],
    });
  }, [state.isInit, state.partsList, basememberinfo]);

  // 跨/构件视角 数据
  React.useEffect(() => {
    if (!state.reflush || !basememberinfo || !state.bridgereportid) {
      return;
    }
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

  // 部件数据更新
  React.useEffect(() => {
    if (state.isInit || !state.cachePartsList.length) {
      dispatch({type: 'isLoading', payload: false});
      return;
    }
    const update = async () => {
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
          await partsCheckstatusData.update(param);
        } else {
          await partsCheckstatusData.save(param);
        }
      });
      return await bridgeReportMember.list({
        bridgeid: state.bridge.bridgeid,
        bridgereportid: state.bridgereportid,
      });
    };
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
        await checkstatusMedia.save(data);
        await bridgeReportFile.save(data);
      }
      if (state.cacheFileData.isUpdate) {
        await bridgeReportFile.update(data);
        await checkstatusMedia.update(data);
        if (data.copypath) {
          await checkstatusMedia.removeByParentmediaid(data.mediaid);
          await checkstatusMedia.save({
            ...data,
            filepath: data.copypath,
            mediaid: uuid.v4(),
            parentmediaid: data.mediaid,
          });
        }
      }
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
