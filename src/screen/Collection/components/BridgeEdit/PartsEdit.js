/* 
  桥梁表单--部件列表
 */
import React from 'react';
import uuid from 'react-native-uuid';
import {View, Text, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {tailwind} from 'react-native-tailwindcss';
import {Portal, Modal} from 'react-native-paper';
import {Context as ThemeContext} from '../../../../providers/ThemeProvider';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';
import {Context} from './Provider';
import {KeyboardInput} from '../../../../components/Input';
import Checkbox from '../../../../components/Checkbox';
import Button from '../../../../components/Button';
import Table from '../../../../components/Table';
import Pid from '../../../../components/Pid';
import {BujianRow, BujianCheckbox} from './components';
import styles from './styles';
import {confirm} from '../../../../utils/alert';
import {listToPage} from '../../../../utils/common';
import rules from '../../../../utils/rules';

// 构件表单 -- 新增、修改
const PartsForm = React.forwardRef(({}, ref) => {
  // 全局样式
  const {
    state: {theme},
  } = React.useContext(ThemeContext);
  // 桥梁全局参数 -- 现有构件列表、全部部件信息
  const {
    dispatch,
    state: {partsList, memberInfo},
  } = React.useContext(Context);

  // 模态框是否显示
  const [visible, setVisible] = React.useState(false);

  // 新增 还是 修改
  const [isUpdate, setIsUpdate] = React.useState(false);

  // 模态框的数据列表，选中了几个构件这里有几条
  const [list, setList] = React.useState([]);

  // 当前编辑的 id
  const [nowEdit, setNowEdit] = React.useState(0);

  // 编号，例如 b200004
  const [typeName, setTypeName] = React.useState('');
  
  // 暴露给父组件的函数
  React.useImperativeHandle(ref, () => ({
    // 打开
    open: (val, _typeName) => {
      console.log("_typeName",_typeName);
      if (val) {
        // 编辑时
        setList(val);
        setIsUpdate(true);
      } else {
        // 新增时
        setList([{}]);
        setIsUpdate(false);
      }
      setTypeName(_typeName);
      setVisible(true);
    },
    // 关闭
    close,
  }));

  // 关闭
  const close = () => {
    setVisible(false);
    setNowEdit(0);
    setList([]);
  };

  // 点击右侧按钮 -- 将现在编辑的id 加 1
  const handleNext = () => {
    if (nowEdit === list.length - 1) {
      return;
    }
    setNowEdit(nowEdit + 1);
  };

  // 点击左侧按钮 -- 将现在编辑的id 减 1
  const handlePrev = () => {
    if (nowEdit === 0) {
      return;
    }
    setNowEdit(nowEdit - 1);
  };

  // 内容改变时，将值存入
  const handleChange = val => {
    const _list = [...list];
    _list[nowEdit][val.name] = val.value;
    // 将改变的值存入
    setList(_list);
  };

  // 点击确定
  const handleOk = () => {
    // 获取现有的构件列表
    const _partsList = [...partsList];
    if (isUpdate) {
      // 如果是编辑
      // 修改部件数据
      list.forEach(item => {
        const inx = _partsList.findIndex(it => item.id === it.id);
        if (inx !== -1) {
          _partsList[inx] = item;
        }
      });
    } else {
      // 是新增
      // 新增部件数据
      _partsList.push({
        ...list[0],
        position: typeName.substring(0, 3),
        membertype: typeName,
        memberid: uuid.v4(),
      });
    }
    // 将修改好的数据存入桥梁全局参数
    dispatch({type: 'partsList', payload: _partsList});
    close();
  };

  // 获取部件名称
  const memberName = () => {
    // 获取 上部、下部 或是 桥面系的全部构件
    const member = memberInfo[typeName.substring(0, 3)];
    // 获取部件名称
    if (member) {
      return (
        member?.find(({membertype}) => membertype === typeName)?.membername ||
        ''
      );
    }
  };

  return (
    <Portal>
      {/* 模态框 */}
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={[styles.partsEditModalContent]}>
        <View style={[theme.primaryBgStyle, tailwind.flex1, tailwind.rounded]}>
          {/* 顶部标题 */}
          <View style={[styles.partsEditModalHand]}>
            <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
              <Text style={[tailwind.textLg, tailwind.fontBold, tailwind.mR2]}>
                {/* 括号里显示当前部件名称 */}
                {isUpdate ? '编辑构件' : '新增构件'}({memberName()})
              </Text>
              <Pid pid="P1207" />
            </View>
            {/* 右侧关闭按钮 */}
            <TouchableOpacity onPress={close}>
              <Icon name="close" size={24} />
            </TouchableOpacity>
          </View>
          {/* 中部 */}
          <View
            style={[tailwind.justifyBetween, tailwind.mT1, tailwind.flexRow]}>
            {/* 左侧箭头 -- 仅编辑时显示 */}
            {isUpdate ? (
              <TouchableOpacity
                onPress={handlePrev}
                style={[tailwind.justifyCenter, tailwind.mR4]}>
                <Icon name="chevron-left" size={50} />
              </TouchableOpacity>
            ) : (
              <View style={[tailwind.mL4]} />
            )}
            {/* 中间内容 */}
            <View style={[tailwind.flex1]}>
              <KeyboardInput
                style={[tailwind.mT3]}
                name="membername"
                value={list[nowEdit]?.membername}
                onChange={handleChange}
                label="构件编号:    "
              />
              <KeyboardInput
                style={[tailwind.mT4]}
                name="stepno"
                value={list[nowEdit]?.stepno}
                onChange={handleChange}
                label="所在跨编号:"
              />
              <KeyboardInput
                style={[tailwind.mT4]}
                name="orderdesc"
                value={list[nowEdit]?.orderdesc}
                onChange={handleChange}
                label="排序序号:    "
              />
            </View>
            {/* 右侧箭头 -- 仅编辑时显示 */}
            {isUpdate ? (
              <TouchableOpacity
                onPress={handleNext}
                style={[tailwind.justifyCenter, tailwind.mL4]}>
                <Icon name="chevron-right" size={50} />
              </TouchableOpacity>
            ) : (
              <View style={[tailwind.mL4]} />
            )}
          </View>
          {/* 底部操作 */}
          <View style={[styles.partsEditModalFoot]}>
            <Button style={[{backgroundColor:'#808285'}]} onPress={close}>
              取消
            </Button>
            {/* 如果是编辑，那么显示当前是第几个构件 */}
            {isUpdate ? (
              <Text style={[tailwind.textBase, tailwind.fontBold]}>
                {nowEdit + 1}/{list.length}
              </Text>
            ) : (
              <></>
            )}
            <Button onPress={handleOk} style={[{backgroundColor:'#2b427d'}]}>确定</Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
});

const only1 = ['b100001', 'b100006'];
const only2 = ['b100003', 'b100007', 'b100005'];

// 添加部件
const PartsAdd = React.forwardRef(({}, ref) => {
  // 全局样式
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  // 桥梁全局参数 -- 部件(构件)列表、全部的构件信息，并按 b10 b20 b30 分组、翼墙耳墙、表单对象
  const {
    dispatch,
    state: {partsList, memberInfo, bridgewall, values},
  } = React.useContext(Context);

  // 模态框是否显示
  const [visible, setVisible] = React.useState(false);

  // 上部结构 数据
  const [b10, setB10] = React.useState([]);

  // 下部结构 数据
  const [b20, setB20] = React.useState([]);

  // 桥面系结构 数据
  const [b30, setB30] = React.useState([]);

  // 当前选中的
  const [checked, setChecked] = React.useState(new Set());

  // const [hide, setHide] = React.useState(new Set());

  // 暴露给父组件的函数
  React.useImperativeHandle(ref, () => ({
    // 打开
    open: () => {
      setVisible(true);
    },
    // 关闭
    close,
  }));

  // 构件信息--构件列表、全部构件信息 变化时触发
  React.useEffect(() => {
    // 存在构件 并 存在全部构件
    if (partsList && memberInfo) {
      const hide = new Set(partsList.map(({membertype}) => membertype));
      const checkOnly1 = membertype => {
        if (
          only1.find(item => hide.has(item)) &&
          only1.find(item => item === membertype)
        ) {
          return false;
        } else {
          return true;
        }
      };
      const checkOnly2 = membertype => {
        if (
          only2.find(item => hide.has(item)) &&
          only2.find(item => item === membertype)
        ) {
          return false;
        } else {
          return true;
        }
      };
      const _b10 = memberInfo.b10.filter(
        ({membertype}) =>
          !hide.has(membertype) &&
          checkOnly1(membertype) &&
          checkOnly2(membertype),
      );
      setB10(listToPage(_b10, 3));
      setB20(
        listToPage(
          memberInfo.b20.filter(({membertype}) => !hide.has(membertype)),
          3,
        ),
      );
      setB30(
        listToPage(
          memberInfo.b30.filter(({membertype}) => !hide.has(membertype)),
          3,
        ),
      );
    }
  }, [partsList, memberInfo]);

  // 关闭
  const close = () => {
    setVisible(false);
  };

  // 点击确定
  const buildParts = () => {
    confirm('是否添加选中的部件？', () => {
      // data 为现有的所有构件
      const data = [...partsList];
      // 过滤出部件
      const set = new Set(data.map(({membertype}) => membertype));
      // 计算跨
      const kua =
        parseInt(values.b200001num, 10) + parseInt(values.b200002num, 10) - 1;
      // 获取翼墙耳墙参数
      const getBridgewallParam = () => {
        if (!bridgewall || !bridgewall.length) {
          return '';
        }
        return (
          bridgewall?.find(it => it.paramid === values.bridgewall)?.paramname ||
          bridgewall[0].paramname
        );
      };
      // 对当前选中项遍历，并存入data
      checked.forEach(item => {
        if (!set.has(item)) {
          data.push(
            ...rules[item](
              item,
              values,
              {
                pCode: item.slice(0, 3),
                [item]: item,
              },
              kua,
              item === 'b200004' ? getBridgewallParam() : '',
            ),
          );
        }
      });
      // 将新的构件信息存入
      dispatch({type: 'partsList', payload: data});
      // 关闭模态框
      close();
    });
    // const data = partsList.filter(({membertype}) => checked.has(membertype));
  };

  // const handleCheckAll = () => {
  //   setChecked(
  //     new Set([
  //       'b100001',
  //       'b100003',
  //       'b100004',
  //       'b100002',
  //       'b200004',
  //       'b200005',
  //       'b200002',
  //       'b200001',
  //       'b200003',
  //       'b200006',
  //       'b200007',
  //       'b300001',
  //       'b300002',
  //       'b300003',
  //       'b300004',
  //       'b300005',
  //       'b300006',
  //     ]),
  //   );
  // };

  // 上部、下部、桥面系 表格
  const renderCheckList = (title, data) => {
    // 点击部件时
    const handleCheck = membertype => {
      // 设置当前选中
      const _checked = new Set(checked);
      // 互斥选择
      if (only1.find(item => membertype === item)) {
        only1
          .filter(item => membertype !== item)
          .forEach(item => _checked.delete(item));
      }
      // 互斥选择
      if (only2.find(item => membertype === item)) {
        only2
          .filter(item => membertype !== item)
          .forEach(item => _checked.delete(item));
      }
      if (_checked.has(membertype)) {
        _checked.delete(membertype);
      } else {
        _checked.add(membertype);
      }
      // 将选中的存入
      setChecked(_checked);
    };
    return (
      <>
        {/* 标题 */}
        <Text style={[tailwind.fontBold, {color:'#2b427d'}]}>{title}</Text>
        {/* 表格 */}
        {data.length ? (
          <View
            style={[
              tailwind.mT1,
              tailwind.borderGray400,
              tailwind.borderT,
              tailwind.borderL,
            ]}>
            {data.map((item, index) => (
              <View style={[tailwind.flexRow]} key={index}>
                {item?.map((it, inx) => (
                  <BujianCheckbox
                    key={inx}
                    label={it.membername}
                    onCheck={() => handleCheck(it.membertype)}
                    checked={checked.has(it.membertype)}
                  />
                ))}
              </View>
            ))}
          </View>
        ) : (
          <Text>暂无可添加部件</Text>
        )}
      </>
    );
  };

  return (
    <Portal>
      {/* 模态框 */}
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={[styles.partsAddModalContent]}>
        <View style={[theme.primaryBgStyle, tailwind.flex1, tailwind.rounded]}>
          {/* 顶部标题 */}
          <View style={[styles.partsEditModalHand]}>
            <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
              <Text
                style={[tailwind.textBase, tailwind.fontBold, tailwind.mR2]}>
                新增部件
              </Text>
              <Pid pid="P1208" />
            </View>
            {/* 右上角关闭按钮 */}
            <TouchableOpacity onPress={close}>
              <Icon name="close" size={24} />
            </TouchableOpacity>
          </View>
          {/* 中部 + 底部 */}
          <View style={[tailwind.flex1, tailwind.p2]}>
            {/* 中部 */}
            {renderCheckList('上部结构', b10)}
            <View style={tailwind.mT2} />
            {renderCheckList('下部结构', b20)}
            <View style={tailwind.mT2} />
            {renderCheckList('桥面系', b30)}
            {/* 底部按钮 */}
            <View
              style={[tailwind.flexRow, tailwind.mY2, tailwind.justifyBetween]}>
              {/* <Button onPress={handleCheckAll}>全选</Button> */}
              <Button disabled={!checked.size} onPress={buildParts} style={[{backgroundColor:'#2b427d'}]}>
                确定
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
});

// 部件列表
export default function PartsEdit({navigation}) {
  // 桥梁全局参数
  const {dispatch, state} = React.useContext(Context);

  // 全局样式
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  // 全局参数 -- 桥台形式、桥墩形式、基础构件信息、翼墙耳墙
  const {
    state: {bridgeabutment, bridgepier, basememberinfo, bridgewall},
  } = React.useContext(GlobalContext);

  // 部件列表数据
  const [list, setList] = React.useState([]);

  // 当前编辑的部件index
  const [nowEdit, setNowEdit] = React.useState(0);

  // 编号规则依据展示
  const [showInfo, setShowInfo] = React.useState(false);

  // 按钮loading
  const [loading, setLoading] = React.useState(false);

  // 右侧选中的
  const [checked, setChecked] = React.useState(new Set());

  // 桥梁全局参数 -- 表单对象、部件列表
  const {values, partsList} = state;

  // 构件表单组件 的 引用
  const partsFormRef = React.useRef();

  // 新增部件组件 的 引用
  const partsAddRef = React.useRef();

  // 配置页面
  React.useEffect(() => {
    dispatch({
      type: 'headerItems',
      payload: [
        // {
        //   name: '桥梁编辑',
        //   onPress: () => navigation.navigate('Collection/Bridge/Base'),
        // },
        {
          name: '部件列表',
        },
      ],
    });
    dispatch({
      type: 'pid',
      payload: 'P1206',
    });
    dispatch({
      type: 'footBarType',
      payload: 'notRoot',
    });
  }, [dispatch, navigation]);

  // 处理部件数据列表 -- 桥梁全局参数、基础构件信息 变化时触发
  React.useEffect(() => {
    // 获取 上部结构数据、下部结构数据、桥面系结构数据
    const {topPartsData, bottomPartsData, pmxData} = state;
    const _list = [];
    Object.keys(topPartsData).forEach(key => {
      if (topPartsData[key].length) {
        _list.push({
          key,
          name: basememberinfo.find(item => item.membertype === key).membername,
          data: topPartsData[key],
        });
      }
    });
    Object.keys(bottomPartsData).forEach(key => {
      if (bottomPartsData[key].length) {
        _list.push({
          key,
          name: basememberinfo.find(item => item.membertype === key).membername,
          data: bottomPartsData[key],
        });
      }
    });
    Object.keys(pmxData).forEach(key => {
      if (pmxData[key].length) {
        _list.push({
          key: key,
          name: basememberinfo.find(item => item.membertype === key).membername,
          data: pmxData[key],
        });
      }
    });
    // 将构件数据处理为 部件数据 列表
    setList(_list);
  }, [state, basememberinfo]);

  // 清除右侧的选中 --  当左侧选中变化时，清除右侧的选中
  React.useEffect(() => {
    setChecked(new Set());
  }, [nowEdit]);

  // 右侧选中
  const handleCheck = id => {
    const _checked = new Set(checked);
    if (_checked.has(id)) {
      _checked.delete(id);
    } else {
      _checked.add(id);
    }
    setChecked(_checked);
  };

  // 删除选中的构件
  const handleDelete = () => {
    // 如果没有选中，那么返回
    if (!checked.size) {
      return;
    }
    try {
      // 按钮loading
      setLoading(true);
      // 删除--按id
      const _partsList = partsList.filter(item => !checked.has(item.id));
      // 存入桥梁全局参数的 部件列表，以完成删除构件的功能
      dispatch({type: 'partsList', payload: _partsList});
    } finally {
      setLoading(false);
    }
    // 清空所有选中
    setChecked(new Set());
  };

  // 删除部件
  const handleDeletePorts = () => {
    confirm('是否删除选中的数据？', () => {
      // 如果没有部件，那么点击删除按钮无效
      if (nowEdit === -1) {
        return;
      }
      try {
        // 设置按钮loading
        setLoading(true);
        // 过滤出 除要删除的部件外的 所有构件
        const _partsList = partsList.filter(
          item => item.membertype !== list[nowEdit].key,
        );
        // 存入桥梁全局参数的 部件列表，以完成删除部件的功能
        dispatch({type: 'partsList', payload: _partsList});
      } finally {
        // 解除按钮loading
        setLoading(false);
        // 重置右侧box的选择
        setChecked(new Set());
        // 重置选中的部件
        setNowEdit(0);
      }
    });
  };

  // 编辑选中的构件
  const handleEdit = () => {
    // 没选择则返回
    if (!checked.size) {
      return;
    }
    // 打开编辑构件的模态框
    partsFormRef.current.open(
      state.partsList.filter(item => checked.has(item.id)),
      list[nowEdit].key,
    );
  };

  // 添加构件
  const handleAdd = () => {
    try {
      // 打开添加构件的模态框
      partsFormRef.current.open(undefined, list[nowEdit].key);
    } catch (err) {
      console.info(err);
    }
  };

  // 添加部件
  const handleAddPorts = () => {
    try {
      // 打开添加部件模态框
      partsAddRef.current.open();
    } catch (err) {
      console.info(err);
    }
  };

  return (
    <View style={[styles.partsEdit]}>
      {/* 左侧 */}
      <View style={[styles.partsEditCard, theme.primaryBgStyle]}>
        {/* 顶部 */}
        <View style={[styles.partsEditList]}>
          <Text style={[tailwind.fontBold, {color:'#2b427d'}]}>
            已创建部件列表
          </Text>
          {/* 点击展示 编号规则依据 */}
          <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
            <Icon
              name="information"
              size={24}
              style={[tailwind.mR2, {color:'#2b427d'}]}
            />
          </TouchableOpacity>
        </View>
        {/* 中部 + 下部 */}
        {!showInfo ? (
          // 部件列表 + 顶部操作按钮
          <View style={tailwind.flex1}>
            {/* 表格 */}
            <Table.Box
              header={
                <Table.Header style={[tailwind.flexGrow]}>
                  <Table.Title
                    flex={1}
                    style={[tailwind.borderL, tailwind.borderGray300]}
                  />
                  <Table.Title title="部件名称" flex={5} />
                  <Table.Title title="构件数量" flex={2} />
                </Table.Header>
              }>
              <FlatList
                data={list}
                renderItem={({item, index}) => (
                  // 点击可以切换右侧的构件列表
                  <Table.Row
                    style={[index === nowEdit ? tailwind.bgGray300 : {}]}
                    onPress={() => setNowEdit(index)}>
                    <Table.Cell flex={1}>{index + 1}</Table.Cell>
                    <Table.Cell flex={5}>{item.name}</Table.Cell>
                    <Table.Cell flex={2}>{item.data.length}</Table.Cell>
                  </Table.Row>
                )}
              />
            </Table.Box>
            {/* 操作按钮 */}
            <View
              style={[tailwind.mT2, tailwind.flexRow, tailwind.justifyBetween]}>
              <Button loading={loading} onPress={handleAddPorts} style={[{backgroundColor: '#2b427d'}]}>
                添加部件
              </Button>
              <Button
                loading={loading}
                disabled={!list.length}
                onPress={handleDeletePorts}
                style={[{backgroundColor: '#808285'}]}>
                删除已选中部件
              </Button>
            </View>
          </View>
        ) : (
          // 展示编号规则依据
          <View style={[styles.partsEditTeble]}>
            <View style={[tailwind.flexGrow]}>
              <View style={[tailwind.borderB, tailwind.borderGray400]}>
                <Text
                  style={[styles.partsEditTebleTitle, theme.primaryTextStyle]}>
                  编号规则依据：
                </Text>
              </View>
              <View style={tailwind.flex1}>
                <ScrollView>
                  <BujianRow label="桥台数" value={values.b200001num || 0} />
                  <BujianRow label="桥墩数" value={values.b200002num || 0} />
                  <BujianRow
                    label="单跨梁片数"
                    value={values.b100001num || 0}
                  />
                  <BujianRow label="横隔板数" value={values.b100002num || 0} />
                  <BujianRow
                    label="单片梁或墩台上支座数"
                    value={values.zhizuo_total}
                  />
                  <BujianRow label="桥台数" value={values.b200001num || 0} />
                  <BujianRow label="桥墩数" value={values.b200002num || 0} />
                  <BujianRow
                    label="翼墙、耳墙"
                    value={
                      bridgewall?.find(
                        item => item.paramid === values.bridgewall,
                      )?.paramname || bridgewall[0].paramname
                    }
                  />
                  <BujianRow
                    label="桥台形式"
                    value={
                      bridgeabutment?.find(
                        it => it.paramid === values.bridgeabutment,
                      )?.paramname || ''
                    }
                  />
                  <BujianRow
                    label="桥墩形式"
                    value={
                      bridgepier?.find(it => it.paramid === values.bridgepier)
                        ?.paramname || ''
                    }
                  />
                  <BujianRow label="桥台数" value={values.b200001num || 0} />
                  <BujianRow label="桥墩数" value={values.b200002num || 0} />
                  <BujianRow label="人行道数" value={values.b300003num || 0} />
                  <BujianRow
                    label="伸缩装置数"
                    value={values.b300002num || 0}
                  />
                </ScrollView>
              </View>
            </View>
          </View>
        )}
      </View>
      {/* 右侧 */}
      <View style={[tailwind.flexGrow]}>
        <View
          style={[
            tailwind.flex1,
            tailwind.p2,
            styles.card,
            theme.primaryBgStyle,
          ]}>
          {/* 如果左侧没有部件，那么右侧为空 */}
          {nowEdit !== -1 ? (
            <>
              {/* 顶部标题 */}
              <Text
                style={[
                  tailwind.fontBold,
                  tailwind.mB2,
                  // theme.primaryTextStyle,
                  {color:'#2b427d'}
                ]}>
                {/* 左侧列表数据[index]，获取部件名称 和 其中的 构件数 */}
                {(list[nowEdit] || {}).name}: 总构件{' '}
                {(list[nowEdit] || {})?.data?.length}
              </Text>
              {/* 中部表格 */}
              <Table.Box
                header={
                  <Table.Header>
                    <Table.Title title="选择" flex={1} />
                    <Table.Title title="序号" flex={1} />
                    <Table.Title title="构件编号" flex={5} />
                    <Table.Title title="跨编号" flex={2} />
                    <Table.Title title="排序编号" flex={2} />
                  </Table.Header>
                }>
                <FlatList
                  data={list[nowEdit]?.data || []}
                  renderItem={({item, index}) => (
                    <Table.Row>
                      <Table.Cell flex={1}>
                        <Checkbox
                          onPress={() => handleCheck(item.id)}
                          checked={checked.has(item.id)}
                        />
                      </Table.Cell>
                      <Table.Cell flex={1}>{index + 1}</Table.Cell>
                      <Table.Cell flex={5}>{item.membername}</Table.Cell>
                      <Table.Cell flex={2}>{item.stepno}</Table.Cell>
                      <Table.Cell flex={2}>{item.orderdesc}</Table.Cell>
                    </Table.Row>
                  )}
                />
              </Table.Box>
              {/* 底部操作按钮 */}
              <View
                style={[
                  tailwind.pT2,
                  tailwind.flexRow,
                  tailwind.justifyBetween,
                ]}>
                <Button
                  loading={loading}
                  onPress={handleDelete}
                  disabled={!list.length}
                  style={[{backgroundColor: '#808285'}, tailwind.w30]}>
                  删除选中构件
                </Button>
                <Button
                  loading={loading}
                  style={[{backgroundColor: '#2b427d'}]}
                  disabled={!list.length}
                  onPress={handleEdit}>
                  编辑选中的构件
                </Button>
                <Button
                  loading={loading}
                  style={[{backgroundColor: '#2b427d'}]}
                  disabled={!list.length}
                  onPress={handleAdd}>
                  添加构件
                </Button>
              </View>
            </>
          ) : (
            <></>
          )}
        </View>
      </View>
      {/* 构件表单 */}
      <PartsForm ref={partsFormRef} />
      {/* 新增部件 */}
      <PartsAdd ref={partsAddRef} />
    </View>
  );
}
