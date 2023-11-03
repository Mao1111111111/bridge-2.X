import React from 'react';
import dayjs from 'dayjs';
import uuid from 'react-native-uuid';
import {getBaseData} from './utils';
import {useFocusEffect} from '@react-navigation/native';
import {Context} from './Provider';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';
import * as editLog from '../../../../database/edit_log';

export const useP1001Init = ({route, navigation}) => {
  const {
    state: {project, bridge},
    dispatch,
  } = React.useContext(Context);

  const {
    state: {bridgeside, userInfo},
  } = React.useContext(GlobalContext);

  const [baseData, setBaseData] = React.useState({});

  const [itemData, setItemData] = React.useState({});

  const [version, setVersion] = React.useState(null);

  const [defaultImg, setDefaultImg] = React.useState('');

  const [defaultBgImg, setDefaultBgImg] = React.useState('');

  const [defaultAddFlg, setDefaultAddFlg] = React.useState(false);

  const [headerItems, setHeaderItems] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      if (version) {
        return;
      }
      const {memberList, data, type} = route.params;
      const ver = data?.version ? data?.version : uuid.v4();
      dispatch({type: 'isLoading', payload: true});
      (async () => {
        // memberList.forEach(item =>
        //   editLog.save({
        //     projectid: project.projectid,
        //     bridgeid: bridge.bridgeid,
        //     title: item.membername,
        //     page_key: '病害录入',
        //     userid: userInfo.userid,
        //     binddate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        //   }),
        // );
        const res = await getBaseData(memberList, type);
        if (res.infoComponents.length && res.components.length) {
          const _diseaseData = {...(data?.jsondata || {})};
          if (!_diseaseData.areatype) {
            _diseaseData.areatype = res.components[0]?.areatype;
            setDefaultBgImg(
              res.components[0]?.exampleimg &&
                `data:image/png;base64,${res.components[0]?.exampleimg}`,
            );
          } else {
            const area = res.components.find(
              ({areatype}) => _diseaseData.areatype === areatype,
            );
            setDefaultBgImg(
              area?.exampleimg &&
                `data:image/png;base64,${res.components[0]?.exampleimg}`,
            );
          }

          if (!_diseaseData.checktypeid) {
            _diseaseData.checktypeid = res.infoComponents[0]?.checktypeid;
            const standardid = res.infoComponents[0]?.standardid;
            setDefaultImg(
              res.infoComponents[0]?.exampleimg
                ? `data:image/png;base64,${res.infoComponents[0]?.exampleimg}`
                : '',
            );
            if (res.basestandardtable && res.basestandardtable.length) {
              const _standardscale = res.basestandardtable.find(
                item => standardid === item.standardid,
              )?.standardscale;
              if (_standardscale) {
                _diseaseData.standard = {
                  scale: _standardscale,
                  id: standardid,
                };
              } else {
                const defaultScale = res.basestandardtable.find(
                  item => item.standardid === 'JTG-TH21-2011-T000-0',
                )?.standardscale;
                _diseaseData.standard = {
                  scale: defaultScale,
                  id: 'JTG-TH21-2011-T000-0',
                };
              }
            }
          } else {
            const info = res.infoComponents.find(
              ({checktypeid}) => checktypeid === _diseaseData.checktypeid,
            );
            setDefaultImg(
              info?.exampleimg && `data:image/png;base64,${info?.exampleimg}`,
            );
          }
          setDefaultAddFlg(!res.infoComponents[0]?.config?.node);
          if (!_diseaseData.list || !_diseaseData.list.length) {
            const list = [];
            for (
              let inx = 0;
              inx < res.infoComponents[0]?.config?.node || 0;
              inx++
            ) {
              list.push({
                inx: inx + 1,
                coordinate: 'orthogonal',
              });
            }
            _diseaseData.list = list;
          }
          if (!_diseaseData.scale) {
            const _type = type.list.find(
              item => _diseaseData.checktypeid === item.checktypeid,
            );
            let defaultScale = '';
            if (_type) {
              defaultScale = _type?.standardscale;
            }
            _diseaseData.scale = defaultScale;
          }
          setItemData({
            ..._diseaseData,
            version: ver,
          });
          setBaseData(res);
          setVersion(ver);
          let paramname = '';
          if (bridgeside && bridge) {
            paramname =
              bridgeside.find(item => bridge.bridgeside === item.paramid)
                ?.paramname || '';
          }
          setHeaderItems([
            {
              name: 'home',
              isIcon: true,
              onPress: () => navigation.navigate('Collection/Detect/Project'),
            },
            {
              name: `${project.projectname}`,
              onPress: () =>
                navigation.navigate('Collection/Detect/ProjectDetail', {
                  project,
                }),
            },
            {
              name: `${bridge.bridgestation}-${bridge.bridgename}-${paramname}`,
              onPress: () =>
                navigation.navigate('Collection/Detect/BridgeTest/Main', {
                  project,
                  bridge,
                }),
            },
            {
              name: route.params.title,
              onPress: () =>
                navigation.navigate('Collection/Detect/BridgeTest/Member', {
                  data: route.params.routeParams,
                }),
            },
            {
              name:
                route.params.memberList.length > 1
                  ? '病害批量录入'
                  : `${route.params.memberList[0].membername}-病害录入`,
              onPress: () => navigation.goBack(),
            },
            {
              name: `${route.params.type.checktypegroupname}`,
            },
          ]);
        }
        dispatch({type: 'isLoading', payload: false});
      })();
    }, [
      route,
      version,
      project,
      bridge,
      userInfo,
      dispatch,
      bridgeside,
      navigation,
    ]),
  );

  return [
    baseData,
    itemData,
    version,
    defaultImg,
    defaultBgImg,
    defaultAddFlg,
    headerItems,
  ];
};

export const useP1002Init = ({route, navigation}) => {
  const {
    state: {project, bridge},
    dispatch,
  } = React.useContext(Context);

  const {
    state: {bridgeside, userInfo},
  } = React.useContext(GlobalContext);

  const [baseData, setBaseData] = React.useState({});

  const [itemData, setItemData] = React.useState({});

  const [version, setVersion] = React.useState(null);

  // 日志
  useFocusEffect(
    React.useCallback(() => {
      if (version) {
        return;
      }
      const {memberList, data, type, thridData} = route.params;
      (async () => {
        dispatch({type: 'isLoading', payload: true});
        // memberList.forEach(item =>
        //   editLog.save({
        //     projectid: project.projectid,
        //     bridgeid: bridge.bridgeid,
        //     title: item.membername,
        //     page_key: '病害录入',
        //     userid: userInfo.userid,
        //     binddate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        //   }),
        // );
        const ver = data?.version ? data.version : uuid.v4();
        const res = await getBaseData(memberList, type);
        // console.log('hookp1002 route',route);
        // console.log('ressss',res.infoComponents);
        if (res.infoComponents.length && res.components.length && data) {
          const _data = {...(data.jsondata || {})};
          if (!_data.areatype) {
            _data.areatype = res.components[0]?.areatype;
          }
          if (!_data.checktypeid) {
            // console.log('这里获取typeid');
            // _data.checktypeid = res.infoComponents[0]?.checktypeid;
            _data.checktypeid = thridData.checktypeid
            // res.infoComponents.forEach(item => {
            //   if (route.params.thridData.checktypeid == item.checktypeid) {
            //     _data.checktypeid = item.checktypeid
            //   }
            // });
          }
          if (!_data.standard) {
            const defaultScale = res.basestandardtable.find(
              item => item.standardid === 'JTG-TH21-2011-T000-0',
            )?.standardscale;
            _data.standard = {
              scale: defaultScale,
              id: 'JTG-TH21-2011-T000-0',
            };
          }
          if (!_data.scale) {
            const _type = type.list.find(
              item => _data.checktypeid === item.checktypeid,
            );
            let defaultScale = '';
            if (_type) {
              defaultScale = _type?.standardscale;
            }
            _data.scale = defaultScale;
          }
          _data.list = [];
          setItemData(_data);
          setBaseData(res);
          setVersion(ver);
          dispatch({type: 'isLoading', payload: false});
        }
      })();
    }, [route.params, project, bridge, userInfo, dispatch, version]),
  );

  const headerItems = (() => {
    let paramname = '';
    if (bridgeside && bridge) {
      paramname =
        bridgeside.find(item => bridge.bridgeside === item.paramid)
          ?.paramname || '';
    }
    return [
      {
        name: 'home',
        isIcon: true,
        onPress: () => navigation.navigate('Collection/Detect/Project'),
      },
      {
        name: `${project.projectname}`,
        onPress: () =>
          navigation.navigate('Collection/Detect/ProjectDetail', {project}),
      },
      {
        name: `${bridge.bridgestation}-${bridge.bridgename}-${paramname}`,
        onPress: () =>
          navigation.navigate('Collection/Detect/BridgeTest/Main', {
            project,
            bridge,
          }),
      },
      {
        name: route.params.title,
        onPress: () =>
          navigation.navigate('Collection/Detect/BridgeTest/Member', {
            data: route.params.routeParams,
          }),
      },
      {
        name:
          route.params.memberList.length > 1
            ? '病害批量录入'
            : `${route.params.memberList[0].membername}-病害录入`,
        onPress: () => navigation.goBack(),
      },
      {
        name: `${route.params.type.checktypegroupname}`,
      },
    ];
  })();

  return [baseData, itemData, version, headerItems];
};

export const useArea = ({diseaseData, baseData}) => {
  const [param, setParam] = React.useState([]);

  const [areanode, setAreanode] = React.useState([]);

  React.useEffect(() => {
    if (!diseaseData?.areatype || !baseData?.components) {
      return;
    }
    const {areaparamjson, areanodejson} =
      baseData.components.find(
        ({areatype}) => diseaseData?.areatype === areatype,
      ) || {};
    if (areaparamjson) {
      const {areaparamlist} =
        typeof areaparamjson === 'string'
          ? JSON.parse(areaparamjson)
          : areaparamjson;
      setParam(
        areaparamlist
          ? areaparamlist.map(({areaparam, areaparamid}) => ({
              label: areaparam,
              value: areaparamid,
            }))
          : [],
      );
    }
    if (areanodejson) {
      const {nodeparamlist} =
        typeof areanodejson === 'string'
          ? JSON.parse(areanodejson)
          : areanodejson;
      setAreanode(
        nodeparamlist
          ? nodeparamlist.map(({nodeparamname, nodeparamid}) => ({
              label: nodeparamname,
              value: nodeparamid,
            }))
          : [],
      );
    }
  }, [diseaseData, baseData]);

  return [param, areanode];
};

export const useInfoComponents = ({diseaseData, baseData}) => {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    if (diseaseData?.checktypeid && baseData?.infoComponents) {
      const item = baseData.infoComponents.find(
        ({checktypeid}) => diseaseData?.checktypeid === checktypeid,
      );
      if (item && item.datastr && item.datastr.length > 0) {
        const datas = item.datastr
          .map(key => baseData.membercheckdata.find(({strid}) => strid === key))
          .filter(it => !!it);
        setList(datas);
      }
    }
  }, [diseaseData, baseData]);

  return list;
};

export const useScale = ({diseaseData, typeList, baseData}) => {
  const [list, setList] = React.useState([]);

  const [info, setInfo] = React.useState([]);

  React.useEffect(() => {
    if (
      diseaseData?.standard?.scale &&
      typeList &&
      baseData &&
      baseData.standardtableinfo
    ) {
      const type = typeList.find(
        item => diseaseData.checktypeid === item.checktypeid,
      );
      let defaultScale = '';
      if (type) {
        defaultScale = type?.standardscale;
      }
      const _list = [{label: '无', value: ''}];
      for (
        let i = 0;
        i < parseInt(diseaseData?.standard?.scale || 0, 10);
        i++
      ) {
        _list.push({
          label: `${i + 1}`,
          value: `${i + 1}`,
          isDefault: i + 1 + '' === defaultScale ? 1 : 0,
        });
      }
      setInfo(
        baseData.standardtableinfo.filter(
          ({standardid}) => diseaseData?.standard?.id === standardid,
        ),
      );
      setList(_list);
    }
  }, [diseaseData, typeList, baseData]);

  return [list, info];
};

export const useDefaultFileName = ({diseaseData, baseData}) => {
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    try {
      // console.log('diseaseData.checktypeid',diseaseData);
      // console.log('baseDatabaseData',baseData.infoComponents);
    } catch (error) {
      
    }
    if (diseaseData?.checktypeid && baseData?.infoComponents) {
      const checkinfoshort =
        baseData.infoComponents.find(
          ({checktypeid}) => checktypeid === diseaseData.checktypeid,
        )?.checkinfoshort || '';
        console.log('hooks checkinfoshort',checkinfoshort);
      setName(checkinfoshort);
      console.log('name',name)
    }
  }, [diseaseData, baseData]);

  return name;
};
