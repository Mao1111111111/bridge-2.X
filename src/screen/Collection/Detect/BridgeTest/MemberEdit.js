import React from 'react';
import uuid from 'react-native-uuid';
import {Portal, Modal as PaperModal} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, FlatList, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {tailwind} from 'react-native-tailwindcss';
import {Context} from './Provider';
import {Context as ThemeContext} from '../../../../providers/ThemeProvider';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';
import Table from '../../../../components/Table';
import Button from '../../../../components/Button';
import Checkbox from '../../../../components/Checkbox';
import {KeyboardInput} from '../../../../components/Input';
import {BujianCheckbox} from '../../components/BridgeEdit/components';
import {listToPage, listToGroup} from '../../../../utils/common';
import {alert, confirm} from '../../../../utils/alert';
import * as bridgeReportMember from '../../../../database/bridge_report_member';
import * as uploadStateRecord from '../../../../database/upload_state_record';
import rules from '../../../../utils/rules';

// 构件表单 组件 -- 构件新增、编辑
const PartsForm = React.forwardRef(
  ({onSubmit, bridgereportid, bridge}, ref) => {
    // 全局样式
    const {
      state: {theme},
    } = React.useContext(ThemeContext);

    // 是否显示
    const [visible, setVisible] = React.useState(false);

    // 是否是编辑
    const [isUpdate, setIsUpdate] = React.useState(false);

    // 当前部件编号
    const [membertype, setMembertype] = React.useState('');

    // 数据列表
    const [list, setList] = React.useState([]);

    // 当前编辑的数据的序号
    const [nowEdit, setNowEdit] = React.useState(0);

    // 暴露给父组件的函数
    React.useImperativeHandle(ref, () => ({
      // 打开
      open: (val, type) => {
        if (val) {
          setList([...val]);
          setIsUpdate(true);
        } else {
          setList([{}]);
          setIsUpdate(false);
        }
        setMembertype(type);
        setVisible(true);
      },
      // 关闭
      close,
    }));

    // 关闭
    const close = () => {
      setVisible(false);
      setNowEdit(0);
      setList([{}]);
    };

    // 向后
    const handleNext = () => {
      if (nowEdit === list.length - 1) {
        return;
      }
      setNowEdit(nowEdit + 1);
    };

    // 向前
    const handlePrev = () => {
      if (nowEdit === 0) {
        return;
      }
      setNowEdit(nowEdit - 1);
    };

    // 表单内容变化时
    const handleChange = val => {
      // 修改 数据列表 的 内容
      const _list = [...list];
      _list[nowEdit][val.name] = val.value;
      setList(_list);
    };

    // 点击确定时
    const handleOk = async () => {
      if (isUpdate) {
        // 编辑时，更新数据库的数据
        await Promise.all(list.map(bridgeReportMember.update));
      } else {
        // 当前时间戳
        let time = (new Date()).valueOf()
        // 新增时，在数据库中新增
        await Promise.all(
          list.map(async (item,index) => {
            await bridgeReportMember.save({
              ...item,
              position: membertype.substring(0, 3),
              memberid: bridgereportid + '_' + membertype + '_' + (time).toString(36) + '_' + index,
              membertype,
              dpscores_auto: 0,
              bridgereportid,
              bridgeid: bridge.bridgeid,
            });
          }),
        );
        //---更新上传状态
        // 获取当前上传状态
        // 上传状态
        let uploadState = await uploadStateRecord.getById(bridgereportid)
        // 当状态为已上传时，设置上传状态为有更新
        if(uploadState.state==3){
          await uploadStateRecord.update({
            state:1,
            bridgereportid:bridgereportid
          });
        }
      }
      await onSubmit();
      close();
    };

    return (
      <Portal>
        {/* 模态框 */}
        <PaperModal
          visible={visible}
          dismissable={false}
          contentContainerStyle={[styles.partsEditModalContent]}>
          <View
            style={[theme.primaryBgStyle, tailwind.flex1, tailwind.rounded]}>
            {/* 标题 + 关闭按钮 */}
            <View style={[styles.partsEditModalHand]}>
              <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
                <Text
                  style={[tailwind.textLg, tailwind.fontBold, tailwind.mR2]}>
                  {isUpdate ? '编辑构件' : '新增构件'}
                </Text>
              </View>
              <TouchableOpacity onPress={close}>
                <Icon name="close" size={24} />
              </TouchableOpacity>
            </View>
            {/* 内容 */}
            <View
              style={[tailwind.justifyBetween, tailwind.mT1, tailwind.flexRow]}>
              {/* 左侧按钮 */}
              {isUpdate ? (
                <TouchableOpacity
                  onPress={handlePrev}
                  style={[tailwind.justifyCenter, tailwind.mR4]}>
                  <Icon name="chevron-left" size={50} />
                </TouchableOpacity>
              ) : (
                <View style={[tailwind.mL4]} />
              )}
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
              {/* 右侧按钮 */}
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
            {/* 操作按钮 */}
            <View style={[styles.partsEditModalFoot]}>
              <Button style={[{backgroundColor: '#808285'}]} onPress={close}>
                取消
              </Button>
              {/* 序号 */}
              {isUpdate ? (
                <Text style={[tailwind.textBase, tailwind.fontBold]}>
                  {nowEdit + 1}/{list.length}
                </Text>
              ) : (
                <></>
              )}
              {/* 点击确定 */}
              <Button onPress={handleOk} style={[{backgroundColor: '#2b427d'}]}>确定</Button>
            </View>
          </View>
        </PaperModal>
      </Portal>
    );
  },
);

const only1 = ['b100001', 'b100006'];
const only2 = ['b100003', 'b100007', 'b100005'];

// 新增部件 组件
const MemberAdd = React.forwardRef(
  // 部件列表、父组件的函数、桥梁信息、翼墙耳墙、检测id
  ({memberList, onSubmit, bridge, bridgewall, bridgereportid}, ref) => {
    // 全局样式
    const {
      state: {theme},
    } = React.useContext(ThemeContext);

    // 全局参数 -- 基础部件信息
    const {
      state: {basememberinfo},
    } = React.useContext(GlobalContext);

    // 是否显示
    const [visible, setVisible] = React.useState(false);

    // 当前选中 -- 多选
    const [checked, setChecked] = React.useState(new Set());

    // 上部结构数据
    const [b10, setB10] = React.useState([]);

    // 下部结构数据
    const [b20, setB20] = React.useState([]);

    // 桥面系结构数据
    const [b30, setB30] = React.useState([]);

    // 暴露给父组件的函数
    React.useImperativeHandle(ref, () => ({
      open: () => {
        setVisible(true);
      },
      close,
    }));

    // 初始化
    React.useEffect(() => {
      // 部件信息 ，根据 b10 b20 b30分组
      const memberInfo = listToGroup(basememberinfo, 'positionid');
      // console.log('添加部件弹窗 所有的部件信息',memberInfo);
      if (memberList && basememberinfo) {
        // console.log('当前已有的部件列表数据',memberList);
        const hide = new Set(memberList.map(({membertype}) => membertype));
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
    }, [memberList, basememberinfo]);

    // 确定添加部件
    const buildParts = () => {
      confirm('是否添加选中的部件？', async () => {
        // values = 桥梁数据 + 桥梁配置数据
        const values = {
          ...bridge,
          ...JSON.parse(bridge?.bridgeconfig || '{}'),
        };
        // 部件编号 的 集合
        const set = new Set(memberList.map(({membertype}) => membertype));
        console.info(set);
        // 跨数量
        const kua =
          parseInt(values.b200001num, 10) + parseInt(values.b200002num, 10) - 1;
        const data = [];
        // console.log('checked values',checked,values);
        // console.log('setset',set);
        // console.log('set.has',set.has('b200005'));
        // 选中的部件 遍历
        checked.forEach(item => {
          // 如果现有的部件列表中 不存在选中的部件，那么把选中的部件的数据存入
          if (!set.has(item)) {
            data.push(
                //根据新的部件编号，执行规则中 对应部件的函数 ，获取对应的构件数据(多条构件数据)
              ...rules[item](
                item,
                values,
                {
                  pCode: item.slice(0, 3),
                  [item]: item,
                },
                kua,
                item === 'b200004'
                  ? bridgewall?.find(it => it.paramid === values.bridgewall)
                      ?.paramname || bridgewall[0].paramname
                  : '',
              ),
            );
            // console.log('data999',data);
          }
        });

        // 当前时间戳
        let time = (new Date()).valueOf()
        // 处理构件数据中的 memberid
        data.forEach((item,index)=>{
          item.memberid = bridgereportid + '_' + item.membertype + '_' + (time).toString(36) + '_' + index
        })
        // console.log('确认添加的data',data);
        // 将所有的构件数据存入 桥梁检测构件表 
        await Promise.all(
          data.map(
            async item =>
              await bridgeReportMember.save({
                ...item,
                bridgereportid,
                bridgeid: bridge.bridgeid,
                dpscores_auto: 0,
              }),
          ),
        );
        //---更新上传状态
        // 获取当前上传状态
        // 上传状态
        let uploadState = await uploadStateRecord.getById(bridgereportid)
        // 当状态为已上传时，设置上传状态为有更新
        if(uploadState.state==3){
          await uploadStateRecord.update({
            state:1,
            bridgereportid:bridgereportid
          });
        }
        await onSubmit();
        close();
      });
    };

    // 关闭
    const close = () => {
      // 重置选中
      setChecked(new Set());
      setVisible(false);
    };

    // 部件表格
    const renderCheckList = (title, data) => {
      // 选中时
      const handleCheck = membertype => {
        const _checked = new Set(checked);
        if (only1.find(item => membertype === item)) {
          only1
            .filter(item => membertype !== item)
            .forEach(item => _checked.delete(item));
        }
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
        setChecked(_checked);
        // console.log('选中的部件',_checked);
      };
      return (
        <>
          {/* 顶部标题 */}
          <Text style={[tailwind.fontBold, theme.primaryTextStyle]}>
            {title}
          </Text>
          {data.length ? (
            <View
              style={[
                tailwind.mT1,
                tailwind.borderGray400,
                tailwind.borderT,
                tailwind.borderL,
              ]}>
              {/* 部件表格 */}
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
        <PaperModal
          visible={visible}
          dismissable={false}
          contentContainerStyle={[styles.partsAddModalContent]}>
          <View
            style={[theme.primaryBgStyle, tailwind.flex1, tailwind.rounded]}>
            {/* 顶部 = 标题 + 关闭按钮 */}
            <View style={[styles.partsEditModalHand]}>
              <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
                <Text
                  style={[tailwind.textBase, tailwind.fontBold, tailwind.mR2]}>
                  新增部件
                </Text>
              </View>
              <TouchableOpacity onPress={close}>
                <Icon name="close" size={24} />
              </TouchableOpacity>
            </View>
            {/* 内容 + 底部按钮 */}
            <View style={[tailwind.flex1, tailwind.p2]}>
              {renderCheckList('上部结构', b10)}
              <View style={tailwind.mT2} />
              {renderCheckList('下部结构', b20)}
              <View style={tailwind.mT2} />
              {renderCheckList('桥面系', b30)}
              <View
                style={[
                  tailwind.flexRow,
                  tailwind.mY2,
                  tailwind.justifyBetween,
                ]}>
                {/* <Button onPress={handleCheckAll}>全选</Button> */}
                <Button disabled={!checked.size} onPress={buildParts}>
                  确定
                </Button>
              </View>
            </View>
          </View>
        </PaperModal>
      </Portal>
    );
  },
);

// 编辑部件
function MemberEdit({onClose}, ref) {
  // 全局样式
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  // 全局参数 -- 桥梁结构数据、翼墙耳墙
  const {
    state: {basememberinfo, bridgewall},
  } = React.useContext(GlobalContext);

  // 桥梁检测参数 -- 检测id、桥梁信息
  const {
    state: {bridgereportid, bridge},
  } = React.useContext(Context);

  // 按钮loading
  const [loading, setLoading] = React.useState(false);

  // 模态框是否显示
  const [visible, setVisible] = React.useState(false);

  // 选中构件的id -- 多选
  const [checked, setChecked] = React.useState(new Set());

  // 当前编辑的部件的 序号
  const [nowEdit, setNowEdit] = React.useState(0);

  // 部件列表
  const [memberList, setMemberList] = React.useState([]);

  // 存放所有构件数据 -- 不分组
  const [partsList, setPartsList] = React.useState([]);

  // 右侧构件表格的数据
  const [list, setList] = React.useState([]);

  // 构件表单组件的引用
  const partsFormRef = React.useRef();

  // 添加部件组件 的 引用
  const MemberAddRef = React.useRef();

  // 暴露给父组件的函数
  React.useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
  }));

  // 初始化数据 
  React.useEffect(() => {
    // 检测编号、基础部件信息、桥梁信息都存在时，从桥梁检测部件表中获取数据
    bridgereportid &&
      basememberinfo &&
      bridge &&
      bridgeReportMember
        .list({bridgereportid, bridgeid: bridge.bridgeid})
        .then(res => {
          // 对数据分组
          const group = listToGroup(res, 'membertype');
          // 将未分组的数据存入
          setPartsList(res);
          // 处理部件表格的数据
          setMemberList(
            Object.keys(group)
              .map(key => {
                return {
                  membertype: key,
                  title: basememberinfo.find(it => it.membertype === key)
                    ?.membername,
                  total: group[key].length,
                };
              })
              .sort((a, b) => a.membertype.localeCompare(b.membertype)),
          );
        });
  }, [bridgereportid, bridge, basememberinfo]);

  // 设置右侧构件表格的数据 -- 当构件列表、部件列表、当前选择的部件 变化时触发
  React.useEffect(() => {
    if (memberList && partsList && memberList.length && partsList.length) {
      // 设置构件表格数据
      setList(
        partsList.filter(
          ({membertype}) => membertype === memberList[nowEdit]?.membertype,
        ),
      );
    }else{
      setList([])
    }
    memberList.forEach((item) => {
      if (item.title == '伸缩缝装置') {
        item.title = '伸缩装置'
      }
    })
    // console.log('MemberEdit memberList111',memberList.length);
  }, [partsList, nowEdit, memberList]);

  // 点击 添加部件 按钮
  const handleAddMember = () => {
    // 打开添加部件模态框
    MemberAddRef.current.open();
  };

  // 获取数据
  const getData = async () => {
    // 在数据库中获取数据
    const res = await bridgeReportMember.list({
      bridgereportid,
      bridgeid: bridge.bridgeid,
    });
    // 分组
    const group = listToGroup(res, 'membertype');
    // 设置所有构件列表
    setPartsList(res);
    // 设置部件表格数据 -- 部件类型、名称、构件数量
    setMemberList(
      Object.keys(group)
        .map(key => {
          return {
            membertype: key,
            title: basememberinfo.find(it => it.membertype === key)?.membername,
            total: group[key].length,
          };
        })
        .sort((a, b) => a.membertype.localeCompare(b.membertype)),
    );
  };

  // 删除部件
  const handleDeleteMember = () => {
    confirm('是否删除选中的部件？', async () => {
      try {
        // 数据库中删除
        await bridgeReportMember.removeByMembertype({
          membertype: memberList[nowEdit]?.membertype,
          bridgereportid,
        });
        // 重新获取数据
        await getData();
        // 重置选中部件
        setNowEdit(0);
        alert('删除成功');
      } catch (err) {
        console.error(err);
        alert('删除失败');
      } finally {
        setLoading(false);
      }
    });
  };

  // 删除选中的构件
  const handleDelete = () => {
    confirm('是否删除选中的构件？', async () => {
      try {
        // 数据库中删除 --- 一次删除多个
        await Promise.all([...checked].map(bridgeReportMember.remove));
        // 重新获取表格数据
        await getData();
        // 重置选中的构件
        setChecked(new Set());
        alert('删除成功');
      } catch (err) {
        console.error(err);
        alert('删除失败');
      } finally {
        setLoading(false);
      }
    });
  };

  // 编辑构件
  const handleEdit = () => {
    if (!checked.size) {
      return;
    }
    // 打开构件表单 参数(当前选中的构件数据，当前编辑的部件编号)
    partsFormRef.current.open(
      JSON.parse(JSON.stringify(list.filter(item => checked.has(item.id)))),
      memberList[nowEdit]?.membertype,
    );
  };

  // 新增构件
  const handleAdd = () => {
    // 打开构件表单 参数(无，当前编辑的部件编号)
    partsFormRef.current.open(undefined, memberList[nowEdit]?.membertype);
  };

  // 选择右侧构件时
  const handleCheck = id => {
    const _checked = new Set(checked);
    if (_checked.has(id)) {
      _checked.delete(id);
    } else {
      _checked.add(id);
    }
    setChecked(_checked);
  };

  // 关闭模态框
  const handleClose = () => {
    // 关闭
    setVisible(false);
    // 清空选中的 构件
    setChecked(new Set());
    // 重置当前编辑的 部件
    setNowEdit(0);
    // 执行父组件的函数
    onClose();
  };

  return (
    <Portal>
      {/* 模态框 */}
      <PaperModal
        visible={visible}
        onDismiss={handleClose}
        contentContainerStyle={[theme.primaryBgStyle, styles.partsEditContent]}
        onClose={handleClose}>
        <View style={tailwind.flex1}>
          {/* 顶部 = 标题 + 关闭按钮 */}
          <View style={[styles.partsEditModalHand]}>
            <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
              <Text style={[tailwind.textLg, tailwind.fontBold, tailwind.mR2]}>
                编辑部件
              </Text>
            </View>
            <TouchableOpacity onPress={handleClose}>
              <Icon name="close" size={24} />
            </TouchableOpacity>
          </View>
          {/* 内容 + 底部 */}
          <View style={styles.box}>
            {/* 左侧 */}
            <View style={tailwind.flex1}>
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
                    data={memberList}
                    renderItem={({item, index}) => (
                      <Table.Row
                        style={[index === nowEdit ? tailwind.bgGray300 : {}]}
                        onPress={() => setNowEdit(index)}>
                        <Table.Cell flex={1}>{index + 1}</Table.Cell>
                        <Table.Cell flex={5}>{item.title}</Table.Cell>
                        <Table.Cell flex={2}>{item.total}</Table.Cell>
                      </Table.Row>
                    )}
                  />
                </Table.Box>
                {/* 操作按钮 */}
                <View style={styles.btnRow}>
                  <Button loading={loading} onPress={handleAddMember} style={[{backgroundColor: '#2b427d'}]}>
                    添加部件
                  </Button>
                  <Button
                    loading={loading}
                    disabled={!memberList.length}
                    onPress={handleDeleteMember}
                    style={[{backgroundColor: '#808285'}]}>
                    删除已选中部件
                  </Button>
                </View>
              </View>
            </View>
            <View style={tailwind.mX1} />
            {/* 右侧 */}
            <View style={styles.flex2}>
              {/* 表格 */}
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
                  data={list}
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
              {/* 操作按钮 */}
              <View style={styles.btnRow}>
                <Button
                  loading={loading}
                  onPress={handleDelete}
                  disabled={!list.length}
                  style={[tailwind.w30, {backgroundColor: '#808285'}]}>
                  删除选中构件
                </Button>
                <Button
                  loading={loading}
                  style={[tailwind.w30, {backgroundColor: '#2b427d'}]}
                  disabled={!list.length}
                  onPress={handleEdit}>
                  编辑选中的构件
                </Button>
                <Button
                  loading={loading}
                  style={[tailwind.w30, {backgroundColor: '#2b427d'}]}
                  disabled={!list.length}
                  onPress={handleAdd}>
                  添加构件
                </Button>
              </View>
            </View>
          </View>
        </View>
        {/* 构件表单 */}
        <PartsForm
          ref={partsFormRef}
          onSubmit={getData}
          bridge={bridge}
          bridgereportid={bridgereportid}
        />
        {/* 新增部件 */}
        <MemberAdd
          ref={MemberAddRef}
          onSubmit={getData}
          memberList={memberList}
          bridge={bridge}
          bridgewall={bridgewall}
          bridgereportid={bridgereportid}
        />
      </PaperModal>
    </Portal>
  );
}

export default React.forwardRef(MemberEdit);

const styles = StyleSheet.create({
  box: {
    ...tailwind.flex1,
    ...tailwind.flexRow,
    ...tailwind.pX2,
    ...tailwind.mY2,
  },
  flex2: {
    flex: 2,
  },
  partsEdit: {
    ...tailwind.m2,
    ...tailwind.flexGrow,
    ...tailwind.flexRow,
  },
  partsEditContent: {
    width: 750,
    height: 450,
    ...tailwind.absolute,
    ...tailwind.selfCenter,
    ...tailwind.shadow2xl,
    ...tailwind.rounded,
  },
  partsEditCard: {
    width: 300,
    ...tailwind.shadow2xl,
    ...tailwind.rounded,
    ...tailwind.borderGray400,
    ...tailwind.mR2,
    ...tailwind.p2,
  },
  partsEditTeble: {
    ...tailwind.flex1,
    ...tailwind.borderX,
    ...tailwind.borderT,
    ...tailwind.borderGray400,
  },
  partsEditTebleTitle: {
    ...tailwind.m1,
    ...tailwind.fontBold,
  },
  partsEditList: {
    ...tailwind.mB2,
    ...tailwind.flexRow,
    ...tailwind.itemsCenter,
    ...tailwind.justifyBetween,
  },
  partsEditModalContent: {
    ...tailwind.w2_5,
    ...tailwind.absolute,
    ...tailwind.selfCenter,
  },
  partsEditModalHand: {
    ...tailwind.pY2,
    ...tailwind.pX2,
    ...tailwind.flexRow,
    ...tailwind.justifyBetween,
    ...tailwind.borderB,
    ...tailwind.borderGray300,
  },
  partsEditModalFoot: {
    ...tailwind.mT4,
    ...tailwind.pY2,
    ...tailwind.pX6,
    ...tailwind.justifyBetween,
    ...tailwind.itemsCenter,
    ...tailwind.flexRow,
    ...tailwind.borderT,
    ...tailwind.borderGray300,
  },
  partsAddModalContent: {
    ...tailwind.w2_4,
    ...tailwind.absolute,
    ...tailwind.selfCenter,
  },
  btnRow: {
    ...tailwind.pT2,
    ...tailwind.flexRow,
    ...tailwind.justifyBetween,
  },
});
