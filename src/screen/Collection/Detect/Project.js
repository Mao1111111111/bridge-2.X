// 项目管理
import React,{useState,useEffect} from 'react';
import Form from '../components/ProjectForm';
import {tailwind} from 'react-native-tailwindcss';
import {View, StyleSheet, FlatList, Text,Image,TouchableOpacity, Pressable, ImageBackground} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Table from '../../../components/Table';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import {TextInput} from '../../../components/Input';
import Checkbox from '../../../components/Checkbox';
import CommonView from '../../../components/CommonView';
import {Context as GlobalContext} from '../../../providers/GlobalProvider';
import {Context as ThemeContext} from '../../../providers/ThemeProvider';
import * as bridgeProjectBind from '../../../database/bridge_project_bind';
import * as project from '../../../database/project';
import {alert, confirm} from '../../../utils/alert';
import {BoxShadow} from 'react-native-shadow'

// const textShadow = {
//   width:707,
//   height: 40,
//   color:"#000",
//   border:0,
//   radius:0.1,
//   opacity:0.1,
//   x:2,
//   y:2,
//   style:{marginVertical:0}
// }





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

  const formRef = React.useRef();

  const searchRef = React.useRef([]);

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
      name: '检测平台',
    },
    {
      name: '项目管理',
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


  const [deleteImg, setDeleteImg] = useState() // 删除 - 允许点击
  const [deleteDisImg, setdeleteDisImg] = useState() // 删除 - 禁用


  useEffect(() => {
    // console.log('223344');
    // 设置按钮的初始状态
    let deleteImg = require('../../../../src/iconImg/delete.png')
    setDeleteImg(deleteImg)
    let deleteDisImg = require('../../../../src/iconImg/deleteDis.png')
    setdeleteDisImg(deleteDisImg)
  }, [])

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
          status: 0,
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

  const handleStatusChange = () => {
    confirm(
      `将项目状态变更“完成”后，请通过数
据记录中的项目记录查看。
项目变更完成，代表项目中的桥梁数据采集完成。`,
      async () => {
        try {
          setLoading(true);
          await project.switchStatus({
            status: 1,
            id: nowChecked.id,
          });
          setSearch({});
          setPage({
            pageSize: 10,
            pageNo: 0,
          });
          setNowChecked(null);
          alert('操作成功');
        } catch (err) {
          console.error(err);
          alert('操作失败');
        } finally {
          setLoading(false);
        }
      },
    );
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
    <CommonView
      pid="P1001"
      headerItems={headerItems}
      onAdd={() => formRef.current.open()}
      onEdit={nowChecked && (() => formRef.current.open(nowChecked))}
      onDelete={nowChecked && handleDelete}
      operations={[
        {
          // name: 'check', //此处name属性用于原代码里CircleButton用于标识icon
          img:'check',
          disabled: !nowChecked,
          onPress: handleStatusChange,
        },
      ]}>
        {/* 检索 */}
      <View style={[
        styles.searchCard,
        theme.primaryBgStyle
      ]}>
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
        {/* 检索按钮 */}
        <ImageBackground
          source={require('../../../iconImg/search.png')} style={[{width:38, height:28}]}
        >
          {/* <Pressable OnPressIn={handleSearch}></Pressable> */}
          <Text onPress={handleSearch}>{'         '}</Text>
        </ImageBackground>
        {/* <Button
          onPress={handleSearch}
          style={[{backgroundColor: '#2b427d'}]}
        >
          检索1
        </Button> */}
      </View>
      <View style={tailwind.mY1} />
      {/* 项目信息表格 */}
      {/* <View style={[styles.tableCard, {backgroundColor:'rgba(255,255,255,1)'}]}> */}
      <View style={[styles.tableCard, theme.primaryBgStyle]}>
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
              <Table.Title title="序号" flex={0.7} />
              <Table.Title title="项目名称" flex={3} />
              <Table.Title title="已采集" flex={0.7} />
              <Table.Title title="创建人" flex={1} />
              <Table.Title title="创建时间" flex={2} />
              <Table.Title title="最后操作时间" flex={2} />
            </Table.Header>
          }>
          <FlatList
            data={list}
            extraData={list}
            renderItem={({item, index}) => (
              <Table.Row
                key={index}
                onPress={() =>
                  navigation.navigate('Collection/Detect/ProjectDetail', {
                    project: item,
                  })
                }>
                <Table.Cell flex={1}>
                  <Checkbox
                    checked={(nowChecked || {}).id === item.id}
                    onPress={() => handleCheck(item)}
                  />
                </Table.Cell>
                <Table.Cell flex={0.7}>{item.id}</Table.Cell>
                <Table.Cell flex={3}>{item.projectname}</Table.Cell>
                <Table.Cell flex={0.7}>{item.yicaiji || 0}</Table.Cell>
                <Table.Cell flex={1}>{item.username}</Table.Cell>
                <Table.Cell flex={2}>{item.c_date}</Table.Cell>
                <Table.Cell flex={2}>{item.u_date}</Table.Cell>
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
    // ...tailwind.shadow2xl,
    // ...tailwind.roundedSm,
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
