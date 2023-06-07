/* 
  桥梁创建、编辑的 全局参数，检测桥梁全局参数
 */
import React from 'react';
import reducer from '../../../../providers/reducer';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';
import rules from '../../../../utils/rules';
import {listToGroup} from '../../../../utils/common';
import * as bridgeMember from '../../../../database/bridge_member';

// 上下文空间
const Context = React.createContext();

// 消费者
const Consumer = Context.Consumer;

const Provider = ({values, project, children}) => {
  // 获取全局参数
  const {state: globalState} = React.useContext(GlobalContext);
  // 桥梁全局参数
  const [state, dispatch] = React.useReducer(reducer, {
    // 顶部导航项
    headerItems: [],
    // 组件是否显示
    visible: false,

    isUpdate: false,
    // 页面底部的类型，root时为 取消保存按钮；不是root时为返回按钮
    footBarType: 'root',
    // 项目信息
    project: {},
    // 表单对象
    values: {}, 
    // 部件(构件)列表
    partsList: [], 
    // 上部部件
    topPartsData: {}, 
    // 下部部件
    bottomPartsData: {}, 
    // 桥面系部件
    pmxData: {}, 
    // 全部的部件信息，并按 b10 b20 b30 分组
    memberInfo: {},
  });

  // 当传入的values表单对象 或 全局参数 变化时触发
  React.useEffect(() => {
    // 从全局参数中获取数据
    const {
      areaList,
      routeList,
      bridgetype,
      bridgeside,
      bridgefunc,
      bridgepadno,
      bridgeabutment,
      bridgepier,
      bridgewall,
      bridgelightsys,
      basememberinfo,
    } = globalState;
    // 如果全局数据中 缺损某个数据 那么则停止执行
    if (
      !areaList ||
      !routeList ||
      !bridgetype ||
      !bridgeside ||
      !bridgefunc ||
      !bridgepadno ||
      !bridgeabutment ||
      !bridgepier ||
      !bridgewall ||
      !bridgelightsys ||
      !basememberinfo
    ) {
      return;
    }
    // 向表单对象中添加数据
    dispatch({
      type: 'values',
      // 这里遍历的 values 是 表格中的桥梁数据
      payload: Object.keys(values || {}).length
        ? {
            // ---编辑桥梁时
            ...values,
            ...JSON.parse(values?.bridgeconfig || '{}'),
          }
        : {
            // ---新增桥梁时
            // 选中的 桥梁类型参数
            bridgetype: bridgetype[0].paramid,
            // 选中的 桥幅属性
            bridgeside: bridgeside[0].paramid,
            // 选中的 养护区编号
            areacode: areaList[0].code,
            // 选中的 路线编号
            routecode: routeList[0].code,
            // 选中的 功能类型
            bridgefunc: bridgefunc[0].paramid,
            // 选中的 结构体系
            bridgestruct: globalState['bridgestruct_bridge-g'][0].paramid,
            // 支座编号
            bridgepadno: bridgepadno[0].paramid,
            // 桥台形式
            bridgeabutment: bridgeabutment[0].paramid,
            // 桥墩形式
            bridgepier: bridgepier[0].paramid,
            // 照明系统
            bridgelightsys: bridgelightsys[0].paramid,
            // 翼墙、耳墙
            bridgewall: bridgewall[0].paramid,
            // 桥台数
            b200001num: '2',
            // 桥台柱数
            qiaotaizhushu: '1',
            // 桥墩柱数
            qiaodunzhushu: '1',
            leibanshu: '1',
          },
    });
    // !!values 是 判断 valuse 是否存在，如果存在，那么 !!values 为 true
    // isUpdate ，如果是编辑，那么给 isUpdate 赋值为 values.id
    dispatch({type: 'isUpdate', payload: !!values && values.id});
    // 如果是编辑
    if (values && values.bridgeid) {
      // 获取桥梁构件信息
      bridgeMember
        .list(values.bridgeid)
        .then(res => {
          const _data = {
            // 上部部件
            b10: {},
            // 下部部件
            b20: {},
            // 桥面系部件
            b30: {},
          };

          res.forEach(item => {
            // item.position 部件结构
            if (_data[item.position][item.membertype]) {
              _data[item.position][item.membertype].push(item);
            } else {
              _data[item.position][item.membertype] = [item];
            }
          });
          dispatch({type: 'topPartsData', payload: _data.b10});
          dispatch({type: 'bottomPartsData', payload: _data.b20});
          dispatch({type: 'pmxData', payload: _data.b30});
          dispatch({type: 'partsList', payload: res});
        })
        .catch(err => console.error(err));
    } else {
      // 新增桥梁时
      dispatch({type: 'topPartsData', payload: {}});
      dispatch({type: 'bottomPartsData', payload: {}});
      dispatch({type: 'pmxData', payload: {}});
      dispatch({type: 'partsList', payload: []});
    }
    // 全部的构件信息
    dispatch({
      type: 'memberInfo',
      payload: listToGroup(basememberinfo, 'positionid'),
    });
  }, [values, globalState]);

  // 当部件列表变化时，重置部件
  React.useEffect(() => {
    const _data = {
      b10: {},
      b20: {},
      b30: {},
    };
    state.partsList.forEach(item => {
      if (_data[item.position][item.membertype]) {
        _data[item.position][item.membertype].push(item);
      } else {
        _data[item.position][item.membertype] = [item];
      }
    });
    dispatch({type: 'topPartsData', payload: _data.b10});
    dispatch({type: 'bottomPartsData', payload: _data.b20});
    dispatch({type: 'pmxData', payload: _data.b30});
  }, [state.partsList]);

  // 当项目变化时，重置项目数据
  React.useEffect(() => {
    dispatch({type: 'project', payload: project || {}});
  }, [project]);

  // 当 桥梁全局参数 的 表单对象变化时 或 全局参数的
  React.useEffect(() => {
    // 设置上部部件数据
    // const setTopData = () => {
    //   const pCode = 'b10';
    //   const code = {
    //     position: '上部结构',
    //     pCode,
    //   };
    //   // 计算跨，总数-1
    //   const kua =
    //     parseInt(state.values.b200001num, 10) +
    //     parseInt(state.values.b200002num, 10) -
    //     1;
    //   const _data = {};
    //   // 是否存在上部结构
    //   if (state.values?.top) {
    //     Object.keys(state.values.top).forEach(
    //       name =>
    //         (_data[name] = state.values.top[name]
    //           ? rules[name](name, state.values, code, kua)
    //           : []),
    //     );
    //     console.log("state.values.top",state.values.top);
    //     console.log("_data",_data);
    //     dispatch({type: 'topPartsData', payload: _data});
    //   }
    // };
    // const setBottomData = () => {
    //   const pCode = 'b20';
    //   const code = {
    //     position: '下部结构',
    //     pCode,
    //   };
    //   const kua =
    //     parseInt(state.values.b200001num, 10) +
    //     parseInt(state.values.b200002num, 10) -
    //     1;
    //   if (state.values?.bottom) {
    //     const _data = {};
    //     Object.keys(state.values.bottom).forEach(
    //       name =>
    //         (_data[name] = state.values.bottom[name]
    //           ? rules[name](
    //               name,
    //               state.values,
    //               code,
    //               kua,
    //               name === 'b200004'
    //                 ? globalState.bridgewall?.find(
    //                     item => item.paramid === state.values.bridgewall,
    //                   )?.paramname || globalState.bridgewall[0].paramname
    //                 : '',
    //             )
    //           : []),
    //     );
    //     dispatch({type: 'bottomPartsData', payload: _data});
    //   }
    // };
    // const setPmxData = () => {
    //   const pCode = 'b30';
    //   const code = {
    //     position: '桥面系',
    //     pCode,
    //   };
    //   const kua =
    //     parseInt(state.values.b200001num, 10) +
    //     parseInt(state.values.b200002num, 10) -
    //     1;
    //   if (state.values?.pmx) {
    //     const _data = {};
    //     Object.keys(state.values.pmx).forEach(
    //       name =>
    //         (_data[name] = state.values.pmx[name]
    //           ? rules[name](name, state.values, code, kua)
    //           : []),
    //     );
    //     dispatch({type: 'pmxData', payload: _data});
    //   }
    // };
    // setTopData();
    // setBottomData();
    // setPmxData();
  }, [state.values, globalState.bridgewall]);

  return (
    <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>
  );
};

export {Context, Consumer, Provider};
