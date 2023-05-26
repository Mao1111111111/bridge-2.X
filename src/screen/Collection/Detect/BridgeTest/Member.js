/* 
  构件管理
 */
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

// 左侧构件列表
const BigData = ({title, data, onChange, onGroupChange}) => {
  // title-部件名称
  //data-部件进来时，data是跨列表;跨进来时，data是部件列表
  // 全局样式
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  // 当前选中的构件列表 
  const [checked, setChecked] = React.useState(new Set());

  // 当前编辑的 部件 或 是跨
  const [nowEdit, setNowEdit] = React.useState({});

  // 初始化数据
  React.useEffect(() => {
    // 初始化当前选中的 组
    if (data.length) {
      setNowEdit(data[0]);
    } else {
      setNowEdit({});
    }
  }, [data]);

  // 设置构件颜色
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

  // 点击构件时
  const handleCheck = id => {
    const _checked = new Set(checked);
    if (_checked.has(id)) {
      _checked.delete(id);
    } else {
      _checked.add(id);
    }
    // 设置当前选中的构件列表
    setChecked(_checked);
    // 触发构件变化函数
    handleChange(_checked);
  };

  // 全选
  const handleCheckAll = () => {
    if (checked.size === nowEdit.list.length) {
      // 当已经全选时,设置全不选
      setChecked(new Set());
      // 触发 构件选中变化 的 函数
      handleChange(new Set());
    } else {
      // 选中全部
      setChecked(new Set(nowEdit.list.map(({id}) => id)));
      // 触发 构件选中变化 的 函数
      handleChange(new Set(nowEdit.list.map(({id}) => id)));
    }
  };

  // 选中的构件变化时
  const handleChange = _checked => {
    const _data = {};
    data
      .map(({list}) => list)
      .flat()
      .forEach(item => (_data[item.id] = _checked.has(item.id)));
    //执行父组件的函数,并将选择的构件数据传入 
    onChange && onChange(_data);
  };

  return (
    <View style={[tailwind.flex1, tailwind.flexRow]}>
      {/* 左侧 */}
      <View style={[tailwind.flexCol, tailwind.p2]}>
        <View style={[tailwind.mB1]}>
          <Text style={[styles.memberListTitle, {color:'#2b427d'}]}>
            {/* 这里的title是部件名称 或者 跨名称 */}
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
                // 执行父组件的函数
                onGroupChange && onGroupChange(item);
                // 清空选中的构件
                setChecked(new Set());
                // 设置当前选中的 部件 或 跨
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
      {/* 右侧 */}
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

export default function Member({route, navigation,item}) {
  // 全局样式
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  // 全局参数 -- 桥幅属性、桥梁结构数据、用户信息
  const {
    state: {bridgeside, basememberinfo, userInfo},
  } = React.useContext(GlobalContext);

  // 桥梁检测全局参数 -- 桥梁信息、检测构件列表、项目信息
  const {
    state: {bridge, partsList, project},
    dispatch,
  } = React.useContext(Context);

  // 当前页面 数据 还是 影音
  const [pageType, setPageType] = React.useState('数据');

  // 组列表 ,部件 或 跨 列表
  const [list, setList] = React.useState([]);

  const [parts, setParts] = React.useState([]);

  const [editLogList, setEditLogList] = React.useState([]);

  // 选中的构件列表
  const [checkedList, setCheckedList] = React.useState(new Set());

  // 当前选中的跨编号
  const [nowGroup, setNowGroup] = React.useState(null);

  // data是部件数据 data = {"done": 2, "lastEditDate": "2023-04-06 14:27:13", "membertype": "b200001", "title": "桥台", "total": 2, "type": "member"}
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
    console.log('projectprojectproject',project);
    console.log('projectprojectproject',bridge);
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
    // console.log('list', _list);
  }, [partsList, data, basememberinfo]);

  // 顶部导航
  const getHeaderItems = () => {
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
        onPress: () => navigation.navigate('Collection/Detect/BridgeTest/Main'),
      },
      {
        labelname: data.title,
      },
    ];
  };

  // 选中的构件改变时
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

  // 全部标记为良好
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

  // 页面跳转
  const handleEditPage = path => {
    // let list = parts.filter(item => checkedList.has(item.id))
    // console.log('P1501 checkedList',list[0].membername);
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

  // 影音组件
  const getMedia = () => {
    try {
      // console.log('listlist',list);
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
          memberList={list}
          route={route}
        />
      );
    } catch (err) {
      console.log('getMedia err',err);
    }
    
  };

  // 回退
  const goBack = () => {
    console.log('点击了goBack');
    try {
      navigation.goBack()
    } catch (e) {
      console.log('goBack err', e);
    }
  }
  // 向前
  const goAhead = () => {
    console.log('点击了goAhead');
    handleEditPage('Collection/Detect/BridgeTest/Member/DiseaseList')
  }

  return (
    <Box pid="P1501" navigation={navigation} route={route} headerItems={getHeaderItems()} labelname={data.title} project={project.projectname} bridge={bridge.bridgename}>
      {/* 年份 + 数据影音 tab，当选中构件时，数据影音tab禁用 */}
      <HeaderTabs onChangeTab={setPageType} disabled={checkedList.size} />
      {/* 影音 */}
      <View style={[pageType === '数据' ? tailwind.hidden : tailwind.flex1]}>
        {getMedia()}
      </View>
      {/* 数据 */}
      <View style={[pageType !== '数据' ? tailwind.hidden : tailwind.flex1]}>
        <Content
        onBack={goBack}
        onAhead={checkedList.size == 1 && goAhead}
          // 右侧按钮组
          operations={[
            {
              // name: 'eye',
              // 查看构件 跳转到病害管理
              img:'look',
              disabled: checkedList.size < 1,
              onPress: () =>
                handleEditPage(
                  'Collection/Detect/BridgeTest/Member/DiseaseList',
                ),
            },
            {
              // name: 'thumb-up',
              // 设置好构件
              img:'singleGood',
              color: colors.green600,
              onPress: () =>
                handleEditPage('Collection/Detect/BridgeTest/Member/GoodEdit'),
            },
            {
              // name: 'thumb-up',
              // 全部设置为好构件
              img:'allGood',
              color: colors.green600,
              border: true,
              onPress: handleGoodAll,
            },
          ]}>
          <View style={[theme.primaryBgStyle, styles.card, tailwind.flex1]}>
            {/* 左侧构件列表 */}
            <View style={[styles.listBox]}>
              <BigData
                title={data.title}
                // 组列表 ,部件 或 跨 列表
                data={list}
                // 组改变时，即点击左侧列表时
                onGroupChange={item => {
                  console.log("item",item);
                  // 如果跨编号存在
                  if (item.stepno) {
                    console.info('???');
                    // 设置当前选中的跨编号
                    setNowGroup(item.stepno);
                  }
                  // 重置选中的构件列表
                  setCheckedList(new Set());
                }}
                // 选中的构件改变时
                onChange={handleCheckedChange}
              />
            </View>
            {/* 右侧 操作历史 */}
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
