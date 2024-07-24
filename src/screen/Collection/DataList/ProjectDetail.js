// 项目详情
import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {tailwind} from 'react-native-tailwindcss';
import {Context as GlobalContext} from '../../../providers/GlobalProvider';
import {Context as ThemeContext} from '../../../providers/ThemeProvider';
import {TextInput} from '../../../components/Input';
import Button from '../../../components/Button';
import Table from '../../../components/Table';
import Select from '../../../components/Select';
import Checkbox from '../../../components/Checkbox';
import * as bridge from '../../../database/bridge';
// import * as bridgeProjectBind from '../../../database/bridge_project_bind';
// import {alert, confirm} from '../../../utils/alert';
import CommonView from '../../../components/CommonView';

export default function ProjectDetail({route, navigation}) {
  const {
    state: {bridgeside, areaList, routeList},
    dispatch,
  } = React.useContext(GlobalContext);

  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const [list, setList] = React.useState([]);

  const [nowChecked, setNowChecked] = React.useState(null);

  const [page, setPage] = React.useState();

  const [total, setTotal] = React.useState(0);

  const [pageTotal, setPageTotal] = React.useState(0);

  const [search, setSearch] = React.useState({});

  const searchRef = React.useRef([]);

  const [loading, setLoading] = React.useState(false);

  const [areacode, setAreacode] = React.useState('');

  const [routecode, setRoutecode] = React.useState('');

  const {project} = route.params;

  const headerItems = [
    {
      name: '采集平台',
      onPress: () =>
        dispatch({
          type: 'drawerShowFlg',
          payload: Math.random().toString(36).slice(-8),
        }),
    },
    {
      name: '数据记录',
    },
    {
      name: '数据列表',
      onPress: () => navigation.navigate('Collection/DataList/Main'),
    },
    {
      name: '项目列表',
      onPress: () => navigation.navigate('Collection/DataList/ProjectList'),
    },
    {
      name: `${project.projectname}`,
    },
  ];

  useFocusEffect(
    React.useCallback(() => {
      setPage({
        pageSize: 10,
        pageNo: 0,
      });
    }, []),
  );

  React.useEffect(() => {
    if (!page) {
      return;
    }
    setLoading(true);
    bridge
      .search({
        param: {
          ...search,
          projectid: project.projectid,
        },
        page,
      })
      .then(res => {
        setList(res.list);
        setPageTotal(res.page.pageTotal);
        setTotal(res.page.total);
      })
      .finally(() => setLoading(false));
  }, [search, page, project]);

  React.useEffect(() => {
    setRoutecode({code: ''});
  }, [areacode]);

  const handleSearch = () => {
    const values = {};
    searchRef.current.forEach(item => {
      values[item.name] = item.value;
      if (item.blur) {
        item.blur();
      }
    });
    setSearch(values);
    setPage({
      pageSize: 10,
      pageNo: 0,
    });
  };

  // const handleDelete = () => {
  //   confirm('是否删除选中的数据？', async () => {
  //     try {
  //       setLoading(true);
  //       await bridgeProjectBind.remove({
  //         bridgeid: nowChecked.bridgeid,
  //         projectid: project.id,
  //       });
  //       setPage({
  //         pageSize: 10,
  //         pageNo: 0,
  //       });
  //       setNowChecked(null);
  //       alert('删除成功');
  //     } catch (err) {
  //       console.error(err);
  //       alert('删除失败');
  //     } finally {
  //       setLoading(false);
  //     }
  //   });
  // };

  const handleCheck = item => {
    if (!nowChecked) {
      setNowChecked(item);
      return;
    } else if (nowChecked.id === item.id) {
      setNowChecked(null);
    } else {
      setNowChecked(item);
    }
  };

  return (
    <CommonView headerItems={headerItems} pid="P1101">
      <View style={[styles.searchCard, {width:700, backgroundColor:'#fff'}]}>
        <TextInput
          name="bridgename"
          label="桥梁名称:"
          ref={el => (searchRef.current[0] = el)}
          style={[tailwind.mR4, tailwind.flex1]}
        />
        <Select
          name="areacode"
          label="路段:"
          labelName="name"
          valueName="code"
          value={areacode.code}
          onChange={setAreacode}
          style={[tailwind.mR4, tailwind.flex1]}
          ref={el => (searchRef.current[1] = el)}
          values={[{name: '无', code: ''}, ...(areaList || [])]}
        />
        <Select
          name="routecode"
          label="路线:"
          labelName="name"
          valueName="code"
          value={routecode.code}
          onChange={setRoutecode}
          style={[tailwind.mR4, tailwind.flex1]}
          ref={el => (searchRef.current[2] = el)}
          values={[
            {name: '无', code: ''},
            ...(routeList?.filter(item => item.pcode === areacode.code) || []),
          ]}
        />
        <Button onPress={handleSearch} style={[{backgroundColor: '#2b427d'}]}>检索</Button>
      </View>
      <View style={tailwind.mY1} />
      <View style={[styles.tableCard, {width:700, backgroundColor:'#fff'}]}>
        <Table.Box
          loading={loading}
          numberOfPages={pageTotal}
          total={total}
          pageNo={page?.pageNo || 0}
          onPageChange={e =>
            setPage({
              pageSize: 10,
              pageNo: e,
            })
          }
          header={
            <Table.Header>
              <Table.Title title="选择" flex={1} />
              <Table.Title title="序号" flex={1} />
              <Table.Title title="桩号" flex={3} />
              <Table.Title title="桥梁名称" flex={4} />
              <Table.Title title="桥幅" flex={1} />
              <Table.Title title="路段" flex={2} />
              <Table.Title title="检测次数" flex={2} />
              <Table.Title title="最近检测" flex={4} />
              <Table.Title title="来源" flex={2} />
            </Table.Header>
          }>
          <FlatList
            data={list}
            extraData={list}
            renderItem={({item, index}) => (
              <Table.Row key={index}>
                <Table.Cell flex={1}>
                  <Checkbox
                    checked={(nowChecked || {}) === item}
                    onPress={() => handleCheck(item)}
                  />
                </Table.Cell>
                <Table.Cell flex={1}>{item.id}</Table.Cell>
                <Table.Cell flex={3}>{item.bridgestation}</Table.Cell>
                <Table.Cell flex={4}>{item.bridgename}</Table.Cell>
                <Table.Cell flex={1}>
                  {
                    bridgeside?.find(it => it.paramid === item.bridgeside)
                      .paramname
                  }
                </Table.Cell>
                <Table.Cell flex={2}>
                  {areaList?.find(it => it.code === item.areacode).name}
                </Table.Cell>
                <Table.Cell flex={2}>{item.testTotal}</Table.Cell>
                <Table.Cell flex={4}>{item.testDate || '--'}</Table.Cell>
                <Table.Cell flex={2}>
                  {item.datasources === 0 ? '本地' : '云端'}
                </Table.Cell>
              </Table.Row>
            )}
          />
        </Table.Box>
      </View>
    </CommonView>
  );
}

const styles = StyleSheet.create({
  card: {
    ...tailwind.shadow2xl,
    ...tailwind.roundedSm,
  },
  searchCard: {
    ...tailwind.shadow2xl,
    ...tailwind.roundedSm,
    ...tailwind.flexRow,
    ...tailwind.p2,
    ...tailwind.pX3,
  },
  tableCard: {
    ...tailwind.shadow2xl,
    ...tailwind.roundedSm,
    ...tailwind.flex1,
  },
  bridgeForm: {
    ...tailwind.absolute,
    ...tailwind.selfCenter,
    top: -19,
    width: '100%',
    height: '104%',
  },
  modalTitle: {
    ...tailwind.mT4,
    ...tailwind.mX6,
    ...tailwind.flexRow,
    ...tailwind.justifyBetween,
  },
  tableModal: {
    ...tailwind.w3_4,
    ...tailwind.hFull,
    ...tailwind.pB12,
    ...tailwind.absolute,
    ...tailwind.selfCenter,
  },
  modalFoote: {
    ...tailwind.mB2,
    ...tailwind.mX4,
    ...tailwind.flexRow,
    ...tailwind.justifyBetween,
  },
  linkBox: {
    ...tailwind.wFull,
    ...tailwind.hFull,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
  },
  link: {
    ...tailwind.borderB,
    ...tailwind.borderPurple700,
    ...tailwind.textPurple700,
  },
});
