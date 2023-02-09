import React from 'react';
import dayjs from 'dayjs';
import uuid from 'react-native-uuid';
import {tailwind, colors} from 'react-native-tailwindcss';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Context} from './Provider';
import {Context as ThemeContext} from '../../../../providers/ThemeProvider';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';
import {Box, Content} from '../../../../components/CommonView';
import HeaderTabs from './HeaderTabs';
import LogList from './LogList';
import Media from './Media';
import {useFocusEffect} from '@react-navigation/native';
import * as editLog from '../../../../database/edit_log';
import Button from '../../../../components/Button';

const Item = ({title, color, checked, onPress}) => {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.itemBtn,
        {borderColor: checked ? theme.primaryColor : colors.transparent},
        theme.primaryBgStyle,
      ]}>
      <View style={[{backgroundColor: color}, tailwind.w2]} />
      <View style={[styles.itemTitle]}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const BigData = ({title, data, onChange, onGroupChange}) => {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const [checked, setChecked] = React.useState(new Set());

  const [nowEdit, setNowEdit] = React.useState({});

  React.useEffect(() => {
    if (data.length) {
      setNowEdit(data[0]);
    } else {
      setNowEdit({});
    }
  }, [data]);

  const handleColor = ({memberstatus}) => {
    switch (memberstatus) {
      case '0':
        return colors.gray400;
      case '100':
        return colors.green600;
      case '200':
        return colors.red600;
      default:
        return colors.gray400;
    }
  };

  const handleCheck = id => {
    const _checked = new Set(checked);
    if (_checked.has(id)) {
      _checked.delete(id);
    } else {
      _checked.add(id);
    }
    setChecked(_checked);
    handleChange(_checked);
  };

  const handleCheckAll = () => {
    if (checked.size === nowEdit.list.length) {
      setChecked(new Set());
      handleChange(new Set());
    } else {
      setChecked(new Set(nowEdit.list.map(({id}) => id)));
      handleChange(new Set(nowEdit.list.map(({id}) => id)));
    }
  };

  const handleChange = _checked => {
    const _data = {};
    data
      .map(({list}) => list)
      .flat()
      .forEach(item => (_data[item.id] = _checked.has(item.id)));
    onChange && onChange(_data);
  };

  return (
    <View style={[tailwind.flex1, tailwind.flexRow]}>
      <View style={[tailwind.flexCol, tailwind.p2]}>
        <View style={[tailwind.mB1]}>
          <Text style={[styles.memberListTitle, {color:'#2b427d'}]}>
            {title}
          </Text>
        </View>
        <FlatList
          data={data || []}
          extraData={data}
          style={[tailwind.borderB, tailwind.borderGray400]}
          ItemSeparatorComponent={() => <View style={tailwind.mY1} />}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                onGroupChange && onGroupChange(item);
                setChecked(new Set());
                setNowEdit(item);
              }}>
              <View key={index} style={[styles.memberListItem]}>
                <View
                  style={[
                    {
                      backgroundColor:
                        nowEdit.title === item.title
                          ? theme.primaryColor
                          : colors.gray400,
                    },
                    tailwind.w2,
                  ]}
                />
                <View style={[styles.memberListItemTitle]}>
                  <Text>{item.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={[styles.memberItem]}>
        <View style={[tailwind.mB1, tailwind.flexRow, tailwind.justifyBetween]}>
          <Text style={[styles.memberListTitle, {color:'#2b427d'}]}>
            {nowEdit?.title}
          </Text>
          <Button onPress={handleCheckAll} style={[{backgroundColor:'#2b427d'}]}>全选</Button>
        </View>
        <ScrollView>
          <View style={[tailwind.flexRow, tailwind.flex1, tailwind.flexWrap]}>
            {nowEdit?.list?.map((item, index) => (
              <Item
                key={index}
                color={handleColor(item)}
                title={item.membername}
                checked={checked.has(item.id)}
                onPress={() => handleCheck(item.id)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default function Member({route, navigation}) {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const {
    state: {bridgeside, basememberinfo, userInfo},
  } = React.useContext(GlobalContext);

  const {
    state: {bridge, partsList, project},
    dispatch,
  } = React.useContext(Context);

  const [pageType, setPageType] = React.useState('数据');

  const [list, setList] = React.useState([]);

  const [parts, setParts] = React.useState([]);

  const [editLogList, setEditLogList] = React.useState([]);

  const [checkedList, setCheckedList] = React.useState(new Set());

  const [nowGroup, setNowGroup] = React.useState(null);

  const {data} = route.params;

  useFocusEffect(
    React.useCallback(() => {
      editLog
        .list({
          projectid: project.projectid,
          bridgeid: bridge.bridgeid,
        })
        .then(res => setEditLogList(res));
    }, [project, bridge]),
  );

  React.useEffect(() => {
    if (!partsList || !data || !basememberinfo) {
      return;
    }
    const fun = (filterKey, dataKey, titleFun) => {
      const _list = [];
      const _data = {};
      const _parts = partsList.filter(
        item => item[filterKey] === data[filterKey],
      );
      _parts.forEach(item => {
        if (_data[item[dataKey]]) {
          _data[item[dataKey]].push(item);
        } else {
          _data[item[dataKey]] = [item];
        }
      });
      Object.keys(_data).forEach(key =>
        _list.push({
          title: titleFun(key),
          stepno: key,
          list: _data[key],
        }),
      );
      return {_parts, _list};
    };
    const {_parts, _list} =
      data.type === 'member'
        ? fun('membertype', 'stepno', key => `${key}#跨`)
        : fun(
            'stepno',
            'membertype',
            key =>
              basememberinfo.find(item => item.membertype === key).membername,
          );
    setNowGroup(_list ? _list[0].stepno : null);
    setList(_list);
    setParts(_parts);
  }, [partsList, data, basememberinfo]);

  const getHeaderItems = () => {
    let paramname = '';
    if (bridgeside && bridge) {
      paramname =
        bridgeside.find(item => bridge.bridgeside === item.paramid)
          ?.paramname || '';
    }
    return [
      {
        // name: 'home',
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
        onPress: () => navigation.navigate('Collection/Detect/BridgeTest/Main'),
      },
      {
        name: data.title,
      },
    ];
  };

  const handleCheckedChange = e => {
    const _checkedList = new Set();
    Array.from(parts).forEach(item => {
      if (e[item.id]) {
        _checkedList.add(item.id);
      } else {
        _checkedList.delete(item.id);
      }
    });
    setCheckedList(_checkedList);
  };

  const handleGoodAll = () => {
    const _parts = [...parts];
    const version = uuid.v4();
    const cachePartsList = _parts
      .filter(item => item.memberstatus !== '200')
      .map(item => {
        item.memberstatus = '100';
        item.version = version;
        return item;
      });
    editLog.save({
      projectid: project.projectid,
      bridgeid: bridge.bridgeid,
      title: '全部',
      page_key: '标记为良好',
      userid: userInfo.userid,
      binddate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
    dispatch({type: 'isLoading', payload: true});
    dispatch({type: 'cachePartsList', payload: cachePartsList});
  };

  const handleEditPage = path => {
    if (!checkedList.size) {
      return;
    }
    navigation.navigate(path, {
      title: data.title,
      list: parts.filter(item => checkedList.has(item.id)),
      dataGroupId: checkedList.size > 1 ? uuid.v4() : '',
      routeParams: data,
    });
  };

  const getMedia = () => {
    const nowEdit = parts.find(item => checkedList.has(item.id));
    const dataid = nowEdit
      ? nowEdit.memberid
      : data.type === 'member'
      ? data.membertype
      : nowGroup;
    const categoryList =
      checkedList.size === 0
        ? [
            {
              value: `member-${
                data.type === 'member' ? data.membertype : nowGroup
              }`,
              label: '结构照片',
            },
          ]
        : [
            {
              value: `member-${nowEdit?.memberid}`,
              label: '结构照片',
            },
          ];
    const defaultFileName =
      checkedList.size === 0
        ? data.type === 'member'
          ? data.title
          : basememberinfo.find(item => item.membertype === nowGroup)
              ?.membername
        : nowEdit.membername;
    return (
      <Media
        dataid={dataid}
        type={checkedList.size === 0 ? 'member' : 'parts'}
        defaultFileName={`${defaultFileName}状况`}
        categoryList={categoryList}
      />
    );
  };

  return (
    <Box pid="P1501" headerItems={getHeaderItems()}>
      <HeaderTabs onChangeTab={setPageType} disabled={checkedList.size} />
      <View style={[pageType === '数据' ? tailwind.hidden : tailwind.flex1]}>
        {getMedia()}
      </View>
      <View style={[pageType !== '数据' ? tailwind.hidden : tailwind.flex1]}>
        <Content
          operations={[
            {
              // name: 'eye',
              img:'look',
              disabled: checkedList.size < 1,
              onPress: () =>
                handleEditPage(
                  'Collection/Detect/BridgeTest/Member/DiseaseList',
                ),
            },
            {
              // name: 'thumb-up',
              img:'singleGood',
              color: colors.green600,
              onPress: () =>
                handleEditPage('Collection/Detect/BridgeTest/Member/GoodEdit'),
            },
            {
              // name: 'thumb-up',
              img:'allGood',
              color: colors.green600,
              border: true,
              onPress: handleGoodAll,
            },
          ]}>
          <View style={[theme.primaryBgStyle, styles.card, tailwind.flex1]}>
            <View style={[styles.listBox]}>
              <BigData
                title={data.title}
                data={list}
                onGroupChange={item => {
                  if (item.stepno) {
                    console.info('???');
                    setNowGroup(item.stepno);
                  }
                  setCheckedList(new Set());
                }}
                onChange={handleCheckedChange}
              />
            </View>
            <LogList list={editLogList} />
          </View>
        </Content>
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  card: {
    ...tailwind.shadow2xl,
    ...tailwind.rounded,
    // ...tailwind.p2,
    ...tailwind.flexRow,
  },
  listBox: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  type1Color: {
    color: '#000000',
  },
  type2Color: {
    ...tailwind.textGreen600,
  },
  type3Color: {
    color: '#e2af62',
  },
  type4Color: {
    ...tailwind.textOrange500,
  },
  type5Color: {
    ...tailwind.textRed600,
  },
  itemTitle: {
    ...tailwind.borderY,
    ...tailwind.borderR,
    ...tailwind.borderGray400,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
    ...tailwind.w24,
    ...tailwind.pY2,
  },
  itemBtn: {
    ...tailwind.flexRow,
    ...tailwind.border2,
    ...tailwind.mR4,
    ...tailwind.mB2,
  },
  memberListTitle: {
    ...tailwind.textBase,
    ...tailwind.fontBold,
  },
  memberListItem: {
    ...tailwind.borderR,
    ...tailwind.borderGray400,
    ...tailwind.flexRow,
    ...tailwind.w24,
    ...tailwind.h10,
  },
  memberListItemTitle: {
    ...tailwind.borderY,
    ...tailwind.flex1,
    ...tailwind.pL2,
    // ...tailwind.pY2,
    ...tailwind.borderGray400,
    ...tailwind.justifyCenter,
  },
  memberItem: {
    ...tailwind.flex1,
    ...tailwind.flexColumn,
    ...tailwind.p2,
    ...tailwind.mL2,
  },
});
