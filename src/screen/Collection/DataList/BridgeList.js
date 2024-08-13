import React from 'react';
import { tailwind } from 'react-native-tailwindcss';
import { View, StyleSheet, FlatList, Dimensions, ImageBackground, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Table from '../../../components/Table';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import { TextInput } from '../../../components/Input';
import Checkbox from '../../../components/Checkbox';
import CommonView from '../../../components/CommonView';
import { alert, confirm } from '../../../utils/alert';
import BridgeForm from '../components/BridgeEdit/Index';
import { Context as GlobalContext } from '../../../providers/GlobalProvider';
import { Context as ThemeContext } from '../../../providers/ThemeProvider';
import * as bridge from '../../../database/bridge';
import * as bridgeProjectBind from '../../../database/bridge_project_bind';

export default function BridgeList({ navigation }) {
  const {
    state: { areaList, bridgeside },
    dispatch,
  } = React.useContext(GlobalContext);

  const {
    state: { theme },
  } = React.useContext(ThemeContext);

  const [search, setSearch] = React.useState({});

  const [list, setList] = React.useState([]);

  const [nowChecked, setNowChecked] = React.useState(null);

  const [loading, setLoading] = React.useState(false);

  const [page, setPage] = React.useState();

  const [total, setTotal] = React.useState(0);

  const [pageTotal, setPageTotal] = React.useState(0);

  const bridgeRef = React.useRef();

  const searchRef = React.useRef([]);

  const [screenWidth, setScreenWidth] = React.useState() //屏幕宽度

  React.useEffect(() => {
    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
  }, [])

  const headerItems = [
    {
      name: '桥梁管理',
    },
    {
      name: '桥梁列表',
    },
  ];

  useFocusEffect(
    React.useCallback(() => {
      try {
        setPage({
          pageSize: 10,
          pageNo: 0,
        });
        setNowChecked(null);
      } catch (err) {
        console.info(err);
      } finally {
        setLoading(false);
      }
    }, []),
  );

  React.useEffect(() => {
    if (!page) {
      return;
    }
    setLoading(true);
    bridge
      .search({ param: search, page })
      .then(res => {
        setList(res.list);
        setPageTotal(res.page.pageTotal);
        setTotal(res.page.total);
      })
      .finally(() => setLoading(false));
  }, [search, page]);

  const handleSearch = () => {
    const _data = {};
    Object.keys(searchRef.current).forEach(key => {
      _data[key] = searchRef.current[key].value;
      if (searchRef.current[key].blur) {
        searchRef.current[key].blur();
      }
    });
    setSearch(_data);
    setPage({
      pageSize: 10,
      pageNo: 0,
    });
    setLoading(true);
  };

  const handleSubmitOver = async () => {
    try {
      setPage({
        pageSize: 10,
        pageNo: 0,
      });
      setNowChecked(null);
    } catch (err) {
      console.info(err);
    } finally {
      setLoading(false);
    }
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
  const handleDelete = () => {
    confirm('是否删除选中的数据？', async () => {
      try {
        setLoading(true);
        await bridgeProjectBind.remove({
          bridgeid: nowChecked.bridgeid,
        });
        await bridge.remove(nowChecked.id);
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

  return (
    <CommonView
      pid="P1701"
      headerItems={headerItems}
      list={list}
      onAdd={() => bridgeRef.current.open()}
      onDelete={nowChecked && handleDelete}
      onEdit={nowChecked && (() => bridgeRef.current.open(nowChecked))}>
        <View style={tailwind.mY2} />
      <View style={
        screenWidth > 830 ? [styles.tableCard, { backgroundColor: 'rgba(255,255,255,1)', right: 27, width: 715, top: 1, borderRadius: 5 }]
          :
          [styles.tableCard, { backgroundColor: 'rgba(255,255,255,1)', right: 19, width: 715, top: 1, borderRadius: 5 }]
      }>
        <View style={[styles.searchCard]}>
          <TextInput
            name="bridgestation"
            label="桩号:"
            ref={el => (searchRef.current.bridgestation = el)}
            style={[tailwind.mR4, tailwind.flex1]}
          />
          <TextInput
            name="bridgename"
            label="桥梁名称:"
            ref={el => (searchRef.current.bridgename = el)}
            style={[tailwind.mR4, tailwind.flex1]}
          />
          <Select
            name="bridgeside"
            label="桥幅属性:"
            labelName="paramname"
            valueName="paramid"
            values={[
              {
                paramname: '无',
                paramid: '',
              },
              ...(bridgeside || []),
            ]}
            ref={el => (searchRef.current.bridgeside = el)}
            style={[tailwind.mR4, tailwind.flex1]}
          />
          {/* 检索按钮 */}
          <ImageBackground
            source={require('../../../iconImg/search.png')} style={[{ width: 40, height: 40 }]}
          >
            {/* <Pressable OnPressIn={handleSearch}></Pressable> */}
            <Text onPress={handleSearch}>{'         '}</Text>
          </ImageBackground>
        </View>
        <View style={tailwind.mY1} />
        <View style={[styles.tableCard, { backgroundColor: 'rgba(255,255,255,1)', padding: 10 }]}>
        {/* <View style={[styles.tableCard, { backgroundColor: 'rgba(255,255,255,1)', padding: 10 }]}> */}
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
                <Table.Title title="存储" flex={2} />
              </Table.Header>
            }>
            <FlatList
              data={list}
              extraData={list}
              renderItem={({ item, index }) => (
                <Table.Row
                  key={index}
                  onPress={() => {
                    // navigation.navigate('Collection/DataList/BridgeDetail', {
                    //   pageName: `${item.bridgestation}-${item.bridgename}`,
                    //   bridgeid: item.bridgeid,
                    // });
                  }}>
                  <Table.Cell flex={1}>
                    <Checkbox
                      checked={(nowChecked || {}) === item}
                      onPress={() => handleCheck(item)}
                    />
                  </Table.Cell>
                  <Table.Cell flex={1}>{item.id}</Table.Cell>
                  <Table.Cell flex={3}>{item.bridgestation?item.bridgestation:'/'}</Table.Cell>
                  <Table.Cell flex={4}>{item.bridgename}</Table.Cell>
                  <Table.Cell flex={1}>
                    {
                      bridgeside?.find(it => it.paramid === item.bridgeside)
                        .paramname
                    }
                  </Table.Cell>
                  <Table.Cell flex={2}>
                    {areaList?.find(it => it.code === item.areacode)?.name||'/'}
                  </Table.Cell>
                  <Table.Cell flex={2}>{item.testTotal}</Table.Cell>
                  <Table.Cell flex={4}>{item.testDate || '/'}</Table.Cell>
                  <Table.Cell flex={2}>
                    {item.datasources === 0 ? '本地' : '云端'}
                  </Table.Cell>
                </Table.Row>
              )}
            />
          </Table.Box>
        </View>
      </View>

      <BridgeForm ref={bridgeRef} onSubmitOver={handleSubmitOver} />
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
    ...tailwind.mB2,
    ...tailwind.mX4,
    ...tailwind.flexRow,
    ...tailwind.justifyBetween,
  },
});
