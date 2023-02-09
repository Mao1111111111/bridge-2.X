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

const PartsForm = React.forwardRef(({}, ref) => {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);
  const {
    dispatch,
    state: {partsList, memberInfo},
  } = React.useContext(Context);

  const [visible, setVisible] = React.useState(false);

  const [isUpdate, setIsUpdate] = React.useState(false);

  const [list, setList] = React.useState([]);

  const [nowEdit, setNowEdit] = React.useState(0);

  const [typeName, setTypeName] = React.useState('');

  React.useImperativeHandle(ref, () => ({
    open: (val, _typeName) => {
      if (val) {
        setList(val);
        setIsUpdate(true);
      } else {
        setList([{}]);
        setIsUpdate(false);
      }
      setTypeName(_typeName);
      setVisible(true);
    },
    close,
  }));

  const close = () => {
    setVisible(false);
    setNowEdit(0);
    setList([]);
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

  const handleOk = () => {
    const _partsList = [...partsList];
    if (isUpdate) {
      list.forEach(item => {
        const inx = _partsList.findIndex(it => item.id === it.id);
        if (inx !== -1) {
          _partsList[inx] = item;
        }
      });
    } else {
      _partsList.push({
        ...list[0],
        position: typeName.substring(0, 3),
        membertype: typeName,
        memberid: uuid.v4(),
      });
    }
    dispatch({type: 'partsList', payload: _partsList});
    close();
  };

  const memberName = () => {
    const member = memberInfo[typeName.substring(0, 3)];
    if (member) {
      return (
        member?.find(({membertype}) => membertype === typeName)?.membername ||
        ''
      );
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={[styles.partsEditModalContent]}>
        <View style={[theme.primaryBgStyle, tailwind.flex1, tailwind.rounded]}>
          <View style={[styles.partsEditModalHand]}>
            <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
              <Text style={[tailwind.textLg, tailwind.fontBold, tailwind.mR2]}>
                {isUpdate ? '编辑构件' : '新增构件'}({memberName()})
              </Text>
              <Pid pid="P1207" />
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
            <Button style={[{backgroundColor:'#808285'}]} onPress={close}>
              取消
            </Button>
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

const PartsAdd = React.forwardRef(({}, ref) => {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const {
    dispatch,
    state: {partsList, memberInfo, bridgewall, values},
  } = React.useContext(Context);

  const [visible, setVisible] = React.useState(false);

  const [b10, setB10] = React.useState([]);

  const [b20, setB20] = React.useState([]);

  const [b30, setB30] = React.useState([]);

  const [checked, setChecked] = React.useState(new Set());

  // const [hide, setHide] = React.useState(new Set());

  React.useImperativeHandle(ref, () => ({
    open: () => {
      setVisible(true);
    },
    close,
  }));

  React.useEffect(() => {
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

  const close = () => {
    setVisible(false);
  };

  const buildParts = () => {
    confirm('是否添加选中的部件？', () => {
      const data = [...partsList];
      const set = new Set(data.map(({membertype}) => membertype));
      const kua =
        parseInt(values.b200001num, 10) + parseInt(values.b200002num, 10) - 1;

      const getBridgewallParam = () => {
        if (!bridgewall || !bridgewall.length) {
          return '';
        }
        return (
          bridgewall?.find(it => it.paramid === values.bridgewall)?.paramname ||
          bridgewall[0].paramname
        );
      };
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
      dispatch({type: 'partsList', payload: data});
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
        <Text style={[tailwind.fontBold, {color:'#2b427d'}]}>{title}</Text>
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
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={[styles.partsAddModalContent]}>
        <View style={[theme.primaryBgStyle, tailwind.flex1, tailwind.rounded]}>
          <View style={[styles.partsEditModalHand]}>
            <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
              <Text
                style={[tailwind.textBase, tailwind.fontBold, tailwind.mR2]}>
                新增部件
              </Text>
              <Pid pid="P1208" />
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

export default function PartsEdit({navigation}) {
  const {dispatch, state} = React.useContext(Context);

  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const {
    state: {bridgeabutment, bridgepier, basememberinfo, bridgewall},
  } = React.useContext(GlobalContext);

  const [list, setList] = React.useState([]);

  const [nowEdit, setNowEdit] = React.useState(0);

  const [showInfo, setShowInfo] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const [checked, setChecked] = React.useState(new Set());

  const {values, partsList} = state;

  const partsFormRef = React.useRef();

  const partsAddRef = React.useRef();

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

  React.useEffect(() => {
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
    setList(_list);
  }, [state, basememberinfo]);

  React.useEffect(() => {
    setChecked(new Set());
  }, [nowEdit]);

  const handleCheck = id => {
    const _checked = new Set(checked);
    if (_checked.has(id)) {
      _checked.delete(id);
    } else {
      _checked.add(id);
    }
    setChecked(_checked);
  };

  const handleDelete = () => {
    if (!checked.size) {
      return;
    }
    try {
      setLoading(true);
      const _partsList = partsList.filter(item => !checked.has(item.id));
      dispatch({type: 'partsList', payload: _partsList});
    } finally {
      setLoading(false);
    }
    setChecked(new Set());
  };

  const handleDeletePorts = () => {
    confirm('是否删除选中的数据？', () => {
      if (nowEdit === -1) {
        return;
      }
      try {
        setLoading(true);
        const _partsList = partsList.filter(
          item => item.membertype !== list[nowEdit].key,
        );
        dispatch({type: 'partsList', payload: _partsList});
      } finally {
        setLoading(false);
        setChecked(new Set());
        setNowEdit(0);
      }
    });
  };

  const handleEdit = () => {
    if (!checked.size) {
      return;
    }
    partsFormRef.current.open(
      state.partsList.filter(item => checked.has(item.id)),
      list[nowEdit].key,
    );
  };

  const handleAdd = () => {
    try {
      partsFormRef.current.open(undefined, list[nowEdit].key);
    } catch (err) {
      console.info(err);
    }
  };

  const handleAddPorts = () => {
    try {
      partsAddRef.current.open();
    } catch (err) {
      console.info(err);
    }
  };

  return (
    <View style={[styles.partsEdit]}>
      <View style={[styles.partsEditCard, theme.primaryBgStyle]}>
        <View style={[styles.partsEditList]}>
          <Text style={[tailwind.fontBold, {color:'#2b427d'}]}>
            已创建部件列表
          </Text>
          <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
            <Icon
              name="information"
              size={24}
              style={[tailwind.mR2, {color:'#2b427d'}]}
            />
          </TouchableOpacity>
        </View>
        {!showInfo ? (
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
                data={list}
                renderItem={({item, index}) => (
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
                    label="伸缩缝装置数"
                    value={values.b300002num || 0}
                  />
                </ScrollView>
              </View>
            </View>
          </View>
        )}
      </View>
      <View style={[tailwind.flexGrow]}>
        <View
          style={[
            tailwind.flex1,
            tailwind.p2,
            styles.card,
            theme.primaryBgStyle,
          ]}>
          {nowEdit !== -1 ? (
            <>
              <Text
                style={[
                  tailwind.fontBold,
                  tailwind.mB2,
                  // theme.primaryTextStyle,
                  {color:'#2b427d'}
                ]}>
                {(list[nowEdit] || {}).name}: 总构件{' '}
                {(list[nowEdit] || {})?.data?.length}
              </Text>
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
      <PartsForm ref={partsFormRef} />
      <PartsAdd ref={partsAddRef} />
    </View>
  );
}
