import React from 'react';
import reducer from '../../../../providers/reducer';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';
import rules from '../../../../utils/rules';
import {listToGroup} from '../../../../utils/common';
import * as bridgeMember from '../../../../database/bridge_member';

const Context = React.createContext();

const Consumer = Context.Consumer;

const Provider = ({values, project, children}) => {
  const {state: globalState} = React.useContext(GlobalContext);

  const [state, dispatch] = React.useReducer(reducer, {
    headerItems: [],
    visible: false,
    isUpdate: false,
    footBarType: 'root',
    project: {}, // 项目信息
    values: {}, // 表单对象
    partsList: [], // 构件列表
    topPartsData: {}, // 上部部件
    bottomPartsData: {}, // 下部部件
    pmxData: {}, // 桥面系部件
    memberInfo: {},
  });

  React.useEffect(() => {
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
    dispatch({
      type: 'values',
      payload: Object.keys(values || {}).length
        ? {
            ...values,
            ...JSON.parse(values?.bridgeconfig || '{}'),
          }
        : {
            bridgetype: bridgetype[0].paramid,
            bridgeside: bridgeside[0].paramid,
            areacode: areaList[0].code,
            routecode: routeList[0].code,
            bridgefunc: bridgefunc[0].paramid,
            bridgestruct: globalState['bridgestruct_bridge-g'][0].paramid,
            bridgepadno: bridgepadno[0].paramid,
            bridgeabutment: bridgeabutment[0].paramid,
            bridgepier: bridgepier[0].paramid,
            bridgelightsys: bridgelightsys[0].paramid,
            bridgewall: bridgewall[0].paramid,
            b200001num: '2',
            qiaotaizhushu: '1',
            qiaodunzhushu: '1',
            leibanshu: '1',
          },
    });
    dispatch({type: 'isUpdate', payload: !!values && values.id});
    if (values && values.bridgeid) {
      bridgeMember
        .list(values.bridgeid)
        .then(res => {
          const _data = {
            b10: {},
            b20: {},
            b30: {},
          };

          res.forEach(item => {
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
      dispatch({type: 'topPartsData', payload: {}});
      dispatch({type: 'bottomPartsData', payload: {}});
      dispatch({type: 'pmxData', payload: {}});
      dispatch({type: 'partsList', payload: []});
    }
    dispatch({
      type: 'memberInfo',
      payload: listToGroup(basememberinfo, 'positionid'),
    });
  }, [values, globalState]);

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

  React.useEffect(() => {
    dispatch({type: 'project', payload: project || {}});
  }, [project]);

  React.useEffect(() => {
    const setTopData = () => {
      const pCode = 'b10';
      const code = {
        position: '上部结构',
        pCode,
      };
      const kua =
        parseInt(state.values.b200001num, 10) +
        parseInt(state.values.b200002num, 10) -
        1;
      const _data = {};
      if (state.values?.top) {
        Object.keys(state.values.top).forEach(
          name =>
            (_data[name] = state.values.top[name]
              ? rules[name](name, state.values, code, kua)
              : []),
        );
        dispatch({type: 'topPartsData', payload: _data});
      }
    };
    const setBottomData = () => {
      const pCode = 'b20';
      const code = {
        position: '下部结构',
        pCode,
      };
      const kua =
        parseInt(state.values.b200001num, 10) +
        parseInt(state.values.b200002num, 10) -
        1;
      if (state.values?.bottom) {
        const _data = {};
        Object.keys(state.values.bottom).forEach(
          name =>
            (_data[name] = state.values.bottom[name]
              ? rules[name](
                  name,
                  state.values,
                  code,
                  kua,
                  name === 'b200004'
                    ? globalState.bridgewall?.find(
                        item => item.paramid === state.values.bridgewall,
                      )?.paramname || globalState.bridgewall[0].paramname
                    : '',
                )
              : []),
        );
        dispatch({type: 'bottomPartsData', payload: _data});
      }
    };
    const setPmxData = () => {
      const pCode = 'b30';
      const code = {
        position: '桥面系',
        pCode,
      };
      const kua =
        parseInt(state.values.b200001num, 10) +
        parseInt(state.values.b200002num, 10) -
        1;
      if (state.values?.pmx) {
        const _data = {};
        Object.keys(state.values.pmx).forEach(
          name =>
            (_data[name] = state.values.pmx[name]
              ? rules[name](name, state.values, code, kua)
              : []),
        );
        dispatch({type: 'pmxData', payload: _data});
      }
    };

    setTopData();
    setBottomData();
    setPmxData();
  }, [state.values, globalState.bridgewall]);

  return (
    <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>
  );
};

export {Context, Consumer, Provider};
