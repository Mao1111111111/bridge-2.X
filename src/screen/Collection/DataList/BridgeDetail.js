import React from 'react';
import {tailwind} from 'react-native-tailwindcss';
import {View, StyleSheet, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Table from '../../../components/Table';
import CommonView from '../../../components/CommonView';
import {Context as GlobalContext} from '../../../providers/GlobalProvider';
import {Context as ThemeContext} from '../../../providers/ThemeProvider';
import * as project from '../../../database/project';

export default function BridgeDetail({route, navigation}) {
  const {dispatch} = React.useContext(GlobalContext);

  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const [list, setList] = React.useState([]);

  const [total, setTotal] = React.useState(0);

  const [page, setPage] = React.useState();

  const [loading, setLoading] = React.useState(false);

  const [pageTotal, setPageTotal] = React.useState(0);

  const {pageName, bridgeid} = route.params;

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
      name: '桥梁管理',
    },
    {
      name: '数据列表',
      onPress: () => navigation.navigate('Collection/DataList/Main'),
    },
    {
      name: '桥梁列表',
      onPress: () => navigation.navigate('Collection/DataList/BridgeList'),
    },
    {
      name: pageName,
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
    project
      .getByBridge({
        param: {
          bridgeid,
        },
        page,
      })
      .then(res => {
        setList(res.list);
        setPageTotal(res.page.pageTotal);
        setTotal(res.page.total);
      })
      .finally(() => setLoading(false));
  }, [page, bridgeid]);

  return (
    <CommonView pid="P1702" headerItems={headerItems}>
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
              <Table.Title title="序号" flex={1} />
              <Table.Title title="桥梁名称" flex={4} />
              <Table.Title title="病害记录" flex={1} />
              <Table.Title title="存储" flex={1} />
              <Table.Title title="存储" flex={1} />
              <Table.Title title="同步" flex={1} />
            </Table.Header>
          }>
          <FlatList
            data={list}
            extraData={list}
            renderItem={({item, index}) => (
              <Table.Row key={index}>
                <Table.Cell flex={1}>{index + 1}</Table.Cell>
                <Table.Cell flex={4}>{item.projectname}</Table.Cell>
                <Table.Cell flex={1}>{item.Disease}</Table.Cell>
                <Table.Cell flex={1}>
                  {item.projectstatus ? '已完成' : '未完成'}
                </Table.Cell>
                <Table.Cell flex={1}>
                  {item.datasources ? '本地' : '云端'}
                </Table.Cell>
                <Table.Cell flex={1}>
                  {item.upload_date ? '已同步' : '未同步'}
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
