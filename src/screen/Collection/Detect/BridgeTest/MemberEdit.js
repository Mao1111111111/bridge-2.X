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
import rules from '../../../../utils/rules';

const PartsForm = React.forwardRef(
  ({onSubmit, bridgereportid, bridge}, ref) => {
    const {
      state: {theme},
    } = React.useContext(ThemeContext);

    const [visible, setVisible] = React.useState(false);

    const [isUpdate, setIsUpdate] = React.useState(false);

    const [membertype, setMembertype] = React.useState('');

    const [list, setList] = React.useState([]);

    const [nowEdit, setNowEdit] = React.useState(0);

    React.useImperativeHandle(ref, () => ({
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
      close,
    }));

    const close = () => {
      setVisible(false);
      setNowEdit(0);
      setList([{}]);
    };

    const handleNext = () => {
      if (nowEdit === list.length - 1) {
        return;
      }
      setNowEdit(nowEdit + 1);
    };

    const handlePrev = () => {
      if (nowEdit === 0) {
        return;
      }
      setNowEdit(nowEdit - 1);
    };

    const handleChange = val => {
      const _list = [...list];
      _list[nowEdit][val.name] = val.value;
      setList(_list);
    };

    const handleOk = async () => {
      if (isUpdate) {
        await Promise.all(list.map(bridgeReportMember.update));
      } else {
        await Promise.all(
          list.map(async item => {
            await bridgeReportMember.save({
              ...item,
              position: membertype.substring(0, 3),
              memberid: uuid.v4(),
              membertype,
              dpscores_auto: 0,
              bridgereportid,
              bridgeid: bridge.bridgeid,
            });
          }),
        );
      }
      await onSubmit();
      close();
    };

    return (
      <Portal>
        <PaperModal
          visible={visible}
          dismissable={false}
          contentContainerStyle={[styles.partsEditModalContent]}>
          <View
            style={[theme.primaryBgStyle, tailwind.flex1, tailwind.rounded]}>
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
            <View
              style={[tailwind.justifyBetween, tailwind.mT1, tailwind.flexRow]}>
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
            <View style={[styles.partsEditModalFoot]}>
              <Button style={[{backgroundColor: '#808285'}]} onPress={close}>
                取消
              </Button>
              {isUpdate ? (
                <Text style={[tailwind.textBase, tailwind.fontBold]}>
                  {nowEdit + 1}/{list.length}
                </Text>
              ) : (
                <></>
              )}
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

const MemberAdd = React.forwardRef(
  ({memberList, onSubmit, bridge, bridgewall, bridgereportid}, ref) => {
    const {
      state: {theme},
    } = React.useContext(ThemeContext);
    const {
      state: {basememberinfo},
    } = React.useContext(GlobalContext);

    const [visible, setVisible] = React.useState(false);

    const [checked, setChecked] = React.useState(new Set());

    const [b10, setB10] = React.useState([]);

    const [b20, setB20] = React.useState([]);

    const [b30, setB30] = React.useState([]);

    React.useImperativeHandle(ref, () => ({
      open: () => {
        setVisible(true);
      },
      close,
    }));

    React.useEffect(() => {
      const memberInfo = listToGroup(basememberinfo, 'positionid');
      if (memberList && basememberinfo) {
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

    const buildParts = () => {
      confirm('是否添加选中的部件？', async () => {
        const values = {
          ...bridge,
          ...JSON.parse(bridge?.bridgeconfig || '{}'),
        };
        const set = new Set(memberList.map(({membertype}) => membertype));
        console.info(set);
        const kua =
          parseInt(values.b200001num, 10) + parseInt(values.b200002num, 10) - 1;
        const data = [];
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
                item === 'b200004'
                  ? bridgewall?.find(it => it.paramid === values.bridgewall)
                      ?.paramname || bridgewall[0].paramname
                  : '',
              ),
            );
          }
        });
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
        await onSubmit();
        close();
      });
    };

    const close = () => {
      setChecked(new Set());
      setVisible(false);
    };

    const renderCheckList = (title, data) => {
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
      };
      return (
        <>
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
        <PaperModal
          visible={visible}
          dismissable={false}
          contentContainerStyle={[styles.partsAddModalContent]}>
          <View
            style={[theme.primaryBgStyle, tailwind.flex1, tailwind.rounded]}>
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

function MemberEdit({onClose}, ref) {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const {
    state: {basememberinfo, bridgewall},
  } = React.useContext(GlobalContext);

  const {
    state: {bridgereportid, bridge},
  } = React.useContext(Context);

  const [loading, setLoading] = React.useState(false);

  const [visible, setVisible] = React.useState(false);

  const [checked, setChecked] = React.useState(new Set());

  const [nowEdit, setNowEdit] = React.useState(0);

  const [memberList, setMemberList] = React.useState([]);

  const [partsList, setPartsList] = React.useState([]);

  const [list, setList] = React.useState([]);

  const partsFormRef = React.useRef();

  const MemberAddRef = React.useRef();

  React.useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
  }));

  React.useEffect(() => {
    bridgereportid &&
      basememberinfo &&
      bridge &&
      bridgeReportMember
        .list({bridgereportid, bridgeid: bridge.bridgeid})
        .then(res => {
          const group = listToGroup(res, 'membertype');
          setPartsList(res);
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

  React.useEffect(() => {
    if (memberList && partsList && memberList.length && partsList.length) {
      setList(
        partsList.filter(
          ({membertype}) => membertype === memberList[nowEdit]?.membertype,
        ),
      );
    }
  }, [partsList, nowEdit, memberList]);

  const handleAddMember = () => {
    MemberAddRef.current.open();
  };

  const getData = async () => {
    const res = await bridgeReportMember.list({
      bridgereportid,
      bridgeid: bridge.bridgeid,
    });
    const group = listToGroup(res, 'membertype');
    setPartsList(res);
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

  const handleDeleteMember = () => {
    confirm('是否删除选中的部件？', async () => {
      try {
        await bridgeReportMember.removeByMembertype({
          membertype: memberList[nowEdit]?.membertype,
          bridgereportid,
        });
        await getData();
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

  const handleDelete = () => {
    confirm('是否删除选中的构件？', async () => {
      try {
        await Promise.all([...checked].map(bridgeReportMember.remove));
        await getData();
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

  const handleEdit = () => {
    if (!checked.size) {
      return;
    }
    partsFormRef.current.open(
      JSON.parse(JSON.stringify(list.filter(item => checked.has(item.id)))),
      memberList[nowEdit]?.membertype,
    );
  };

  const handleAdd = () => {
    partsFormRef.current.open(undefined, memberList[nowEdit]?.membertype);
  };

  const handleCheck = id => {
    const _checked = new Set(checked);
    if (_checked.has(id)) {
      _checked.delete(id);
    } else {
      _checked.add(id);
    }
    setChecked(_checked);
  };

  const handleClose = () => {
    setVisible(false);
    setChecked(new Set());
    setNowEdit(0);
    onClose();
  };

  return (
    <Portal>
      <PaperModal
        visible={visible}
        onDismiss={handleClose}
        contentContainerStyle={[theme.primaryBgStyle, styles.partsEditContent]}
        onClose={handleClose}>
        <View style={tailwind.flex1}>
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
          <View style={styles.box}>
            <View style={tailwind.flex1}>
              <View style={tailwind.flex1}>
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
            <View style={styles.flex2}>
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
        <PartsForm
          ref={partsFormRef}
          onSubmit={getData}
          bridge={bridge}
          bridgereportid={bridgereportid}
        />
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
