import React from 'react';
import {tailwind} from 'react-native-tailwindcss';
import {View, StyleSheet, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Table from '../../../components/Table';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import {TextInput} from '../../../components/Input';
import Checkbox from '../../../components/Checkbox';
import CommonView from '../../../components/CommonView';
import {Context as GlobalContext} from '../../../providers/GlobalProvider';
import {Context as ThemeContext} from '../../../providers/ThemeProvider';
import * as project from '../../../database/project';
import * as bridgeProjectBind from '../../../database/bridge_project_bind';
import {alert, confirm} from '../../../utils/alert';
import Form from '../components/ProjectForm';

export default function Project({navigation}) {
  const {
    state: {areaList, routeList, userInfo},
    dispatch,
  } = React.useContext(GlobalContext);

  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const [search, setSearch] = React.useState({});

  const [list, setList] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  const [nowChecked, setNowChecked] = React.useState(null);

  const [page, setPage] = React.useState();

  const [total, setTotal] = React.useState(0);

  const [pageTotal, setPageTotal] = React.useState(0);

  const [areacode, setAreacode] = React.useState('');

  const [area, setArea] = React.useState([]);

  const [route, setRoute] = React.useState([]);

  const searchRef = React.useRef([]);

  const formRef = React.useRef();

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
    },
  ];

  useFocusEffect(
    React.useCallback(() => {
      setSearch({});
      searchRef.current.forEach(item => item.clear());
      setPage({
        pageSize: 10,
        pageNo: 0,
      });
    }, []),
  );

  React.useEffect(() => {
    if (areaList) {
      setArea([{name: '无', code: ''}, ...areaList]);
      if (routeList && areacode) {
        setRoute([
          {name: '无', code: ''},
          ...routeList?.filter(item => item.pcode === areacode.code),
        ]);
      } else {
        setRoute([{name: '无', code: ''}]);
      }
    }
  }, [areaList, routeList, areacode]);

  React.useEffect(() => {
    if (!page || !userInfo) {
      return;
    }
    setLoading(true);
    project
      .search({
        param: {
          ...search,
          userid: userInfo.userid,
        },
        page,
      })
      .then(res => {
        setList(res.list);
        setPageTotal(res.page.pageTotal);
        setTotal(res.page.total);
      })
      .finally(() => setLoading(false));
  }, [search, page, userInfo]);

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

  const handleDelete = async () => {
    const res = await bridgeProjectBind.bridgeList(nowChecked.projectid);
    if (res.length) {
      alert('该项目含有检测桥梁，不可删除');
      return;
    }
    confirm('是否删除选中的数据？', async () => {
      setLoading(true);
      try {
        await project.remove(nowChecked.id);
        await bridgeProjectBind.remove({
          projectid: nowChecked.projectid,
        });
        setSearch({});
        setPage({
          pageSize: 10,
          pageNo: 0,
        });
        setNowChecked(null);
        alert('删除成功');
      } catch (err) {
        console.error(err);
        alert('删除失败');
      } finally {
        setLoading(false);
      }
    });
  };

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

  const handleSubmitOver = () => {
    setSearch({});
    searchRef.current.forEach(item => item.clear());
    setPage({
      pageSize: 10,
      pageNo: 0,
    });
    setNowChecked(null);
  };

  return (
    <CommonView
      pid="P1710"
      headerItems={headerItems}
      onEdit={nowChecked && (() => formRef.current.open(nowChecked))}
      onDelete={nowChecked && handleDelete}>
      <View style={[styles.searchCard, {width:700, backgroundColor:'#fff'}]}>
        <TextInput
          name="projectname"
          label="项目名称:"
          ref={el => (searchRef.current[0] = el)}
          style={[tailwind.mR4, tailwind.flex1]}
        />
        <Select
          name="areacode"
          label="路段:"
          style={[tailwind.mR4, tailwind.flex1]}
          labelName="name"
          valueName="code"
          value={areacode.code}
          onChange={setAreacode}
          ref={el => (searchRef.current[1] = el)}
          values={area}
        />
        {routeList && (
          <Select
            name="routecode"
            label="路线:"
            style={[tailwind.mR4, tailwind.flex1]}
            labelName="name"
            valueName="code"
            ref={el => (searchRef.current[2] = el)}
            values={route}
          />
        )}
        <Button onPress={handleSearch} style={[{backgroundColor: '#2b427d'}]}>检索</Button>
      </View>
      <View style={tailwind.mY1} />
      <View style={[styles.tableCard, {width:700, backgroundColor:'#fff'}]}>
        <Table.Box
          loading={loading}
          style={tailwind.roundedSm}
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
              <Table.Title title="项目名称" flex={4} />
              <Table.Title title="状态" flex={1} />
              <Table.Title title="已采集" flex={1} />
              <Table.Title title="路段" flex={2} />
              <Table.Title title="创建日期" flex={3} />
            </Table.Header>
          }>
          <FlatList
            data={list}
            extraData={list}
            renderItem={({item, index}) => (
              <Table.Row
                key={index}
                onPress={() =>
                  navigation.navigate('Collection/DataList/ProjectDetail', {
                    project: item,
                  })
                }>
                <Table.Cell flex={1}>
                  <Checkbox
                    checked={(nowChecked || {}).id === item.id}
                    onPress={() => handleCheck(item)}
                  />
                </Table.Cell>
                <Table.Cell flex={1}>{item.id}</Table.Cell>
                <Table.Cell flex={4}>{item.projectname}</Table.Cell>
                <Table.Cell flex={1}>
                  {item.projectstatus ? '已完成' : '未完成'}
                </Table.Cell>
                <Table.Cell flex={1}>{item.yicaiji || 0}</Table.Cell>
                <Table.Cell flex={2}>
                  {area.find(it => it.code === item.areacode).name}
                </Table.Cell>
                <Table.Cell flex={3}>{item.c_date}</Table.Cell>
              </Table.Row>
            )}
          />
        </Table.Box>
      </View>
      <Form ref={formRef} onSubmitOver={handleSubmitOver} />
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
  modalFoot: {
    ...tailwind.mB4,
    ...tailwind.mX6,
    ...tailwind.flexRow,
    ...tailwind.justifyBetween,
  },
});
