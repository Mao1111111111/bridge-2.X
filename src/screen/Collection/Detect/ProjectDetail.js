// 导入 、克隆桥梁
import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity,ImageBackground} from 'react-native';
import {Divider} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import {tailwind} from 'react-native-tailwindcss';
import {Context as GlobalContext} from '../../../providers/GlobalProvider';
import {Context as ThemeContext} from '../../../providers/ThemeProvider';
import BridgeForm from '../components/BridgeEdit/Index';
import {TextInput} from '../../../components/Input';
import Button from '../../../components/Button';
import Table from '../../../components/Table';
import Select from '../../../components/Select';
import Modal from '../../../components/Modal';
import Checkbox from '../../../components/Checkbox';
import * as bridge from '../../../database/bridge';
import * as bridgeProjectBind from '../../../database/bridge_project_bind';
import {alert, confirm} from '../../../utils/alert';
import CommonView from '../../../components/CommonView';

// 克隆
const Clone = React.forwardRef(({onSubmitOver}, ref) => {
  const {
    state: {bridgeside},
  } = React.useContext(GlobalContext);

  const [visible, setVisible] = React.useState(false);

  const [project, setProject] = React.useState('');

  const [list, setList] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  const [checked, setChecked] = React.useState(null);

  const [page, setPage] = React.useState();

  const [total, setTotal] = React.useState(0);

  const [pageTotal, setPageTotal] = React.useState(0);

  const [search, setSearch] = React.useState({});

  const bridgeRef = React.useRef();

  const searchRef = React.useRef({});

  React.useImperativeHandle(ref, () => ({
    open: _project => {
      setProject(_project);
      setPage({
        pageSize: 10,
        pageNo: 0,
      });
      setSearch('');
      setVisible(true);
    },
    close,
  }));

  React.useEffect(() => {
    if (!page) {
      return;
    }
    setLoading(true);
    bridge
      .search({param: search, page})
      .then(res => {
        setList(res.list);
        setPageTotal(res.page.pageTotal);
        setTotal(res.page.total);
      })
      .finally(() => setLoading(false));
  }, [search, page]);

  const close = () => {
    setVisible(false);
    setList([]);
    setChecked(null);
    Object.keys(searchRef.current).forEach(key => {
      if (searchRef.current[key].clear) {
        searchRef.current[key].clear();
      }
    });
  };

  const handleCheck = id => {
    setChecked(checked === id ? null : id);
  };

  const handleClone = () => {
    setVisible(false);
    bridgeRef.current.open(list.find(item => item.id === checked));
  };

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

  const handleSubmitOver = () => {
    alert('克隆完成', async () => {
      bridgeRef.current.close();
      onSubmitOver && (await onSubmitOver());
      setVisible(true);
    });
  };

  return (
    <>
      <Modal
        visible={visible}
        title="克隆桥梁"
        pid="P1102"
        showHead={true}
        notScroll={true}
        width={800}
        height={500}
        onClose={() => setVisible(false)}>
        <View style={[tailwind.pB2, tailwind.pX4, tailwind.flexRow]}>
          <TextInput
            name="bridgestation"
            label="桩号:"
            ref={el => (searchRef.current.bridgestation = el)}
            style={[tailwind.mR6, tailwind.flex1]}
          />
          <TextInput
            name="bridgename"
            label="桥梁名称:"
            ref={el => (searchRef.current.bridgename = el)}
            style={[tailwind.mR6, tailwind.flex1]}
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
            style={[tailwind.mR6, tailwind.flex1]}
          />
          <Button onPress={handleSearch} style={[{backgroundColor: '#2b427d'}]}>检索</Button>
        </View>
        <View style={[tailwind.flex1]}>
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
                <Table.Title title="桥梁名称" flex={4} />
                <Table.Title title="桩号" flex={3} />
                <Table.Title title="桥幅属性" flex={2} />
                <Table.Title title="桥长（米）" flex={2} />
                <Table.Title title="位置" flex={2} />
                <Table.Title title="存储" flex={2} />
              </Table.Header>
            }>
            <FlatList
              data={list}
              extraData={list}
              renderItem={({item, index}) => (
                <Table.Row key={index}>
                  <Table.Cell flex={1}>
                    <Checkbox
                      checked={checked === item.id}
                      onPress={() => handleCheck(item.id)}
                    />
                  </Table.Cell>
                  <Table.Cell flex={1}>{item.id}</Table.Cell>
                  <Table.Cell flex={4}>{item.bridgename}</Table.Cell>
                  <Table.Cell flex={3}>{item.bridgestation}</Table.Cell>
                  <Table.Cell flex={2}>
                    {
                      bridgeside?.find(it => it.paramid === item.bridgeside)
                        .paramname
                    }
                  </Table.Cell>
                  <Table.Cell flex={2}>未知</Table.Cell>
                  <Table.Cell flex={2}>未知</Table.Cell>
                  <Table.Cell flex={2}>
                    {item.datasources === 0 ? '本地' : '云端'}
                  </Table.Cell>
                </Table.Row>
              )}
            />
          </Table.Box>
        </View>
        <Divider style={[tailwind.mB2]} />
        <View style={styles.modalFoote}>
          <Button style={[{backgroundColor: '#808285'}]} onPress={() => setVisible(false)}>
            取消
          </Button>
          <Button onPress={handleClone} style={[{backgroundColor: '#2b427d'}]}>克隆选中的桥梁</Button>
        </View>
      </Modal>
      <BridgeForm
        ref={bridgeRef}
        onSubmitOver={handleSubmitOver}
        onClose={() => setVisible(true)}
        isClone={true}
        project={project}
      />
    </>
  );
});

// 导入
const Inducts = React.forwardRef(({onSubmitOver}, ref) => {
  const {
    state: {bridgeside, userInfo},
  } = React.useContext(GlobalContext);

  const [visible, setVisible] = React.useState(false);

  const [projectid, setProjectId] = React.useState('');

  const [loading, setLoading] = React.useState(false);

  const [list, setList] = React.useState([]);

  const [page, setPage] = React.useState();

  const [total, setTotal] = React.useState(0);

  const [pageTotal, setPageTotal] = React.useState(0);

  const [keywords, setKeywords] = React.useState('');

  const [checked, setChecked] = React.useState(new Set([]));

  const searchRef = React.useRef([]);

  React.useImperativeHandle(ref, () => ({
    open: project => {
      setProjectId(project.projectid);
      setLoading(true);
      setPage({
        pageSize: 10,
        pageNo: 0,
      });
      setVisible(true);
    },
    close,
  }));

  React.useEffect(() => {
    if (!page) {
      return;
    }
    setLoading(true);
    bridge
      .search({
        param: {
          notId: projectid,
          keywords,
        },
        page,
      })
      .then(res => {
        setList(res.list);
        setPageTotal(res.page.pageTotal);
        setTotal(res.page.total);
      })
      .finally(() => setLoading(false));
  }, [keywords, page, projectid]);

  const close = () => {
    setVisible(false);
    setList([]);
    setChecked(new Set([]));
    if (searchRef.current[0]) {
      searchRef.current[0].clear();
    }
  };

  const handleCheck = id => {
    const _checked = checked;
    if (_checked.has(id)) {
      _checked.delete(id);
    } else {
      _checked.add(id);
    }
    setChecked(new Set(_checked));
  };

  const handleInducts = () => {
    confirm('是否导入选中的数据？', async () => {
      try {
        setLoading(true);
        await Promise.all(
          [...checked].map(
            id =>
              new Promise((resolve, reject) => {
                bridgeProjectBind
                  .save({
                    projectid: projectid,
                    bridgeid: id,
                    userid: userInfo.userid,
                  })
                  .then(resolve)
                  .catch(reject);
              }),
          ),
        );
        setKeywords('');
        if (searchRef.current[0]) {
          searchRef.current[0].clear();
        }
        setPage({
          pageSize: 10,
          pageNo: 0,
        });
        alert('导入完成');
        onSubmitOver && onSubmitOver();
        close();
      } catch (err) {
        console.error(err);
        alert('导入失败');
      } finally {
        setLoading(false);
      }
    });
  };

  const handleSearch = () => {
    const _searchRef = searchRef.current;
    _searchRef[0].blur();
    setKeywords(_searchRef[0].value);
    setPage({
      pageSize: 10,
      pageNo: 0,
    });
  };

  return (
    <Modal
      visible={visible}
      title="导入桥梁"
      pid="P1102"
      showHead={true}
      notScroll={true}
      width={800}
      height={500}
      onClose={() => setVisible(false)}>
      <View style={tailwind.flex1}>
        <View style={[tailwind.pX4, tailwind.pB2, tailwind.flexRow]}>
          <TextInput
            name="name"
            label="桩号/桥梁名称:"
            ref={el => (searchRef.current[0] = el)}
            style={[tailwind.mR6, tailwind.flex1]}
          />
          <Button onPress={handleSearch} style={[{backgroundColor: '#2b427d'}]}>检索</Button>
        </View>
        <View style={[tailwind.flex1]}>
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
                <Table.Title title="桥梁名称" flex={4} />
                <Table.Title title="桩号" flex={3} />
                <Table.Title title="桥幅属性" flex={2} />
                <Table.Title title="桥长（米）" flex={2} />
                <Table.Title title="位置" flex={2} />
                <Table.Title title="存储" flex={2} />
              </Table.Header>
            }>
            <FlatList
              data={list}
              renderItem={({item, index}) => (
                <Table.Row key={index}>
                  <Table.Cell flex={1}>
                    <Checkbox
                      checked={checked.has(item.bridgeid)}
                      onPress={() => handleCheck(item.bridgeid)}
                    />
                  </Table.Cell>
                  <Table.Cell flex={1}>{index + 1}</Table.Cell>
                  <Table.Cell flex={4}>{item.bridgename}</Table.Cell>
                  <Table.Cell flex={3}>{item.bridgestation}</Table.Cell>
                  <Table.Cell flex={2}>
                    {
                      bridgeside?.find(it => it.paramid === item.bridgeside)
                        .paramname
                    }
                  </Table.Cell>
                  <Table.Cell flex={2}>未知</Table.Cell>
                  <Table.Cell flex={2}>未知</Table.Cell>
                  <Table.Cell flex={2}>
                    {item.datasources === 0 ? '本地' : '云端'}
                  </Table.Cell>
                </Table.Row>
              )}
            />
          </Table.Box>
        </View>
      </View>
      <Divider style={[tailwind.mB2]} />
      <View style={styles.modalFoote}>
        <Button style={[{backgroundColor: '#808285'}]} onPress={() => setVisible(false)}>
          取消
        </Button>
        <Button onPress={handleInducts} style={[{backgroundColor: '#2b427d'}]}>确认导入</Button>
      </View>
    </Modal>
  );
});

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

  const cloneRef = React.useRef();

  const inductsRef = React.useRef();
  // 桥梁引用
  const bridgeRef = React.useRef();

  const searchRef = React.useRef([]);

  const [loading, setLoading] = React.useState(false);

  const [areacode, setAreacode] = React.useState('');

  const [routecode, setRoutecode] = React.useState('');
  // 项目管理传递过来的 此条项目的数据
  const {project} = route.params;

  // 顶部导航项
  const headerItems = [
    // 采集平台,点击打开抽屉路由
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
    // 返回项目管理
    {
      name: '项目管理',
      onPress: () => navigation.navigate('Collection/Detect/Project'),
    },
    // 项目名
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

  const handleDelete = () => {
    confirm('是否删除选中的数据？', async () => {
      try {
        setLoading(true);
        await bridgeProjectBind.remove({
          bridgeid: nowChecked.bridgeid,
          projectid: project.projectid,
        });
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

  return (
    // 公共box
    <CommonView
      headerItems={headerItems}
      pid="P1101"
      onAdd={() => bridgeRef.current.open()}
      onEdit={nowChecked && (() => bridgeRef.current.open(nowChecked))}
      onDelete={nowChecked && handleDelete}
      operations={[
        {
          name: 'table-arrow-left',
          img:'induct',
          onPress: () => inductsRef.current.open(project),
        },
        {
          name: 'content-duplicate',
          img:'clone',
          onPress: () => cloneRef.current.open(project),
        },
      ]}>
        {/* 检索 */}
      <View style={[styles.searchCard, theme.primaryBgStyle]}>
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
        {/* <Button onPress={handleSearch} style={[{backgroundColor: '#2b427d'}]}>检索</Button> */}
        {/* 检索按钮 */}
        <ImageBackground
          source={require('../../../iconImg/search.png')} style={[{width:38, height:28}]}
        >
          {/* <Pressable OnPressIn={handleSearch}></Pressable> */}
          <Text onPress={handleSearch}>{'         '}</Text>
        </ImageBackground>
      </View>
      <View style={tailwind.mY1} />
      <View style={[styles.tableCard, theme.primaryBgStyle]}>
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
              <Table.Title title="桩号" flex={2} />
              <Table.Title title="桥梁名称" flex={3} />
              <Table.Title title="桥幅" />
              <Table.Title title="病害构件" />
              <Table.Title title="媒体文件" />
              <Table.Title title="检测日期" flex={2} />
              <Table.Title title="存储" />
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
                <Table.Cell flex={1}>{index + 1}</Table.Cell>
                <Table.Cell flex={2} notText={true}>
                  <TouchableOpacity
                    // style={[styles.linkBox]}
                    onPress={() =>
                      navigation.navigate('Collection/Detect/BridgeTest', {
                        project: project,
                        bridge: item,
                      })
                    }>
                    <Text style={[{color: '#2b427d', textDecorationLine: 'underline'}]}>{item.bridgestation}</Text>
                  </TouchableOpacity>
                </Table.Cell>
                <Table.Cell flex={3}>{item.bridgename}</Table.Cell>
                <Table.Cell>
                  {
                    bridgeside?.find(it => it.paramid === item.bridgeside)
                      .paramname
                  }
                </Table.Cell>
                <Table.Cell>{item.member}</Table.Cell>
                <Table.Cell>{item.file}</Table.Cell>
                <Table.Cell flex={2}>
                  {(item.date || '').split(' ')[0] || '未检测'}
                </Table.Cell>
                <Table.Cell>
                  {item.datasources === 0 ? '本地' : '云端'}
                </Table.Cell>
              </Table.Row>
            )}
          />
        </Table.Box>
      </View>
      <Clone ref={cloneRef} onSubmitOver={handleSubmitOver} />
      <Inducts ref={inductsRef} onSubmitOver={handleSubmitOver} />
      <BridgeForm
        ref={bridgeRef}
        project={project}
        onSubmitOver={handleSubmitOver}
      />
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
