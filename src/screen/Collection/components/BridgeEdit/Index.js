import React from 'react';
import uuid from 'react-native-uuid';
import {Modal, Portal} from 'react-native-paper';
import {View, Text, TouchableOpacity, BackHandler, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {tailwind} from 'react-native-tailwindcss';
import NavigatorStack from '../../../../components/NavigatorStack';
import {Provider, Context} from './Provider';
import {Context as ThemeContext} from '../../../../providers/ThemeProvider';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';
import {NavigationContainer} from '@react-navigation/native';
import Button from '../../../../components/Button';
import styles from './styles';
import Base from './Base';
import Other from './Other';
import BottomParts from './BottomParts';
import TopParts from './TopParts';
import PMX from './PMX';
import PartsEdit from './PartsEdit';
import Pid from '../../../../components/Pid';
import * as bridge from '../../../../database/bridge';
import * as bridgeMember from '../../../../database/bridge_member';
import * as bridgeProjectBind from '../../../../database/bridge_project_bind';

const Header = ({onClose}) => {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const {
    state: {headerItems, pid},
  } = React.useContext(Context);

  return (
    <View style={[styles.header, theme.primaryBgStyle]}>
      <View style={[tailwind.flexGrow, tailwind.flexRow]}>
        <View style={[tailwind.flexRow, tailwind.mR2]}>
          {headerItems.map((item, index) => (
            <React.Fragment key={index}>
              {index !== headerItems.length - 1 ? (
                <React.Fragment>
                  <TouchableOpacity onPress={item.onPress}>
                    <Text
                      style={[
                        tailwind.textBase,
                        tailwind.fontBold,
                        theme.primaryTextStyle,
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                  <Text style={[tailwind.textBase, tailwind.mX1]}>/</Text>
                </React.Fragment>
              ) : (
                <Text style={[tailwind.textBase, tailwind.fontBold]}>
                  {item.name}
                </Text>
              )}
            </React.Fragment>
          ))}
        </View>

        {pid ? (
          <View style={[tailwind.justifyCenter]}>
            <Pid pid={pid} />
          </View>
        ) : (
          <></>
        )}
      </View>
      <View>
        <TouchableOpacity onPress={onClose}>
          <Icon name="close" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

function Index({onClose, onSubmitOver, isClone}, ref) {
  const {state} = React.useContext(Context);

  const {state: globalState} = React.useContext(GlobalContext);

  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const [loading, setLoading] = React.useState(false);

  const [visible, setVisible] = React.useState(false);

  const navigatorRef = React.useRef();

  const {
    values,
    project,
    isUpdate,
    topPartsData,
    bottomPartsData,
    pmxData,
    footBarType,
  } = state;

  const {userInfo, screen, bridgeside} = globalState;

  React.useImperativeHandle(ref, () => ({
    open: () => {
      setVisible(true);
      setLoading(false);
    },
    close: () => {
      setVisible(false);
      setLoading(false);
    },
  }));

  const handleSave = () => {
    const _values = {
      ...values,
      top: JSON.stringify(values.top || {}),
      bottom: JSON.stringify(values.bottom || {}),
      pmx: JSON.stringify(values.pmx || {}),
      bridgeconfig: JSON.stringify({
        b200001num: values.b200001num, // 桥台数
        b200002num: values.b200002num, // 桥墩数
        b100001num: values.b100001num, // 梁片数
        b300003num: values.b300003num, // 人行道数
        b300002num: values.b300002num, //	伸缩缝装置数
        b100002num: values.b100002num, //	横隔板数
        zhizuo_total: values.zhizuo_total, //	支座数
        bridgelightsys: values.bridgelightsys, //	照明系统
        bridgewall: values.bridgewall, //	翼墙、耳墙
        bridgepadno: values.bridgepadno, //	支座编号
        bridgeabutment: values.bridgeabutment, // 桥台形式
        bridgepier: values.bridgepier, //	桥墩形式
        bridgepadstr: values.bridgepadstr, //	桥连组合
        qiaotaizhushu: values.qiaotaizhushu,
        qiaodunzhushu: values.qiaodunzhushu,
        leibanshu: values.leibanshu,
      }),
    };
    setLoading(true);
    const parts = [];
    Object.keys(topPartsData).forEach(key =>
      parts.push(
        ...topPartsData[key].map(it => {
          it.membertype = key;
          return it;
        }),
      ),
    );
    Object.keys(bottomPartsData).forEach(key =>
      parts.push(
        ...bottomPartsData[key].map(it => {
          it.membertype = key;
          return it;
        }),
      ),
    );
    Object.keys(pmxData).forEach(key =>
      parts.push(
        ...pmxData[key].map(it => {
          it.membertype = key;
          return it;
        }),
      ),
    );
    if (isClone) {
      clone(_values, parts);
      return;
    }
    if (isUpdate) {
      console.info('update');
      update(_values, parts);
    } else {
      console.info('add');
      add(_values, parts);
    }
  };

  const getMessage = () => {
    const paramname =
      bridgeside?.find(it => it.paramid === values.bridgeside)?.paramname || '';
    return `${values.bridgestation} ${values.bridgename} ${paramname} 已存在`;
  };

  const add = async (_values, parts) => {
    try {
      if (!(await bridge.checkNameAndCode(values))) {
        Alert.alert('消息', getMessage());
        setLoading(false);
        return;
      }
      const UUID = uuid.v4();
      console.info('add');
      await bridge.save({
        ..._values,
        bridgeid: UUID,
        userid: userInfo.userid,
        username: userInfo.nickname,
      });
      await Promise.all(
        parts.map(
          it =>
            new Promise((resolve, reject) => {
              bridgeMember
                .save({
                  ...it,
                  bridgeid: UUID,
                })
                .then(resolve)
                .catch(reject);
            }),
        ),
      );
      if (project.id) {
        await bridgeProjectBind.save({
          projectid: project.projectid,
          bridgeid: UUID,
          userid: userInfo.userid,
        });
      }
      Alert.alert('消息', '保存成功');
      setLoading(false);
      await onSubmitOver();
      onClose();
    } catch (error) {
      console.info(error);
      Alert.alert('消息', '操作失败');
      setLoading(false);
    }
  };

  const update = async (_values, parts) => {
    try {
      if (!(await bridge.checkNameAndCode(values))) {
        Alert.alert('消息', getMessage());
        setLoading(false);
        return;
      }
      await bridge.update(_values);
      await bridgeMember.remove(_values.bridgeid);
      await Promise.all(
        parts.map(
          it =>
            new Promise((resolve, reject) => {
              bridgeMember
                .save({
                  ...it,
                  bridgeid: _values.bridgeid,
                })
                .then(resolve)
                .catch(reject);
            }),
        ),
      );
      Alert.alert('消息', '保存成功');
      setLoading(false);
      await onSubmitOver();
      onClose();
    } catch (err) {
      console.info(err);
      Alert.alert('消息', '操作失败');
      setLoading(false);
    }
  };

  const clone = async (_values, parts) => {
    try {
      if (
        !(await bridge.checkNameAndCode({
          ...values,
          id: null,
        }))
      ) {
        Alert.alert('消息', getMessage());
        setLoading(false);
        return;
      }
      const UUID = uuid.v4();
      await bridge.save({
        ..._values,
        bridgeid: UUID,
        userid: userInfo.userid,
        username: userInfo.nickname,
      });
      await Promise.all(
        parts.map(
          it =>
            new Promise((resolve, reject) => {
              bridgeMember
                .save({
                  ...it,
                  bridgeid: UUID,
                })
                .then(resolve)
                .catch(reject);
            }),
        ),
      );
      if (project.id) {
        if (project.id) {
          await bridgeProjectBind.save({
            projectid: project.projectid,
            bridgeid: UUID,
            userid: userInfo.userid,
          });
        }
      }
      setLoading(false);
      onSubmitOver();
    } catch (error) {
      console.info(error);
      Alert.alert('消息', '操作失败');
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const back = () => {
      if (navigatorRef.current && navigatorRef?.current?.getRootState) {
        const data = navigatorRef?.current?.getRootState();
        if (data.index === 0) {
          setVisible && setVisible(false);
        } else {
          navigatorRef?.current?.goBack();
        }
      }
    };
    if (visible) {
      setTimeout(
        () => BackHandler.addEventListener('hardwareBackPress', back),
        100,
      );
    } else {
      BackHandler.removeEventListener('hardwareBackPress', back);
    }
  }, [visible, setVisible, navigatorRef]);

  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      dismissable={false}
      contentContainerStyle={[styles.bridgeForm, screen]}>
      <View style={[theme.primaryBgStyle, tailwind.flex1]}>
        <Header onClose={() => setVisible(false)} />
        <NavigationContainer ref={navigatorRef} independent={true}>
          <NavigatorStack
            routes={[
              {
                name: 'Collection/Bridge/Base',
                component: Base,
              },
              {
                name: 'Collection/Bridge/Other',
                component: Other,
              },
              {
                name: 'Collection/Bridge/Top',
                component: TopParts,
              },
              {
                name: 'Collection/Bridge/Bottom',
                component: BottomParts,
              },
              {
                name: 'Collection/Bridge/PMX',
                component: PMX,
              },
              {
                name: 'Collection/Bridge/PartsEdit',
                component: PartsEdit,
              },
            ]}
          />
        </NavigationContainer>
        <View
          style={[
            tailwind.justifyBetween,
            tailwind.flexRow,
            tailwind.pX3,
            tailwind.pY3,
          ]}>
          {footBarType === 'root' ? (
            <>
              <Button
                style={[tailwind.bgRed700,{backgroundColor:'#808285'}]}
                onPress={() => setVisible(false)}
                loading={loading}>
                取消
              </Button>
              <Button onPress={handleSave} loading={loading} style={[{backgroundColor:'#2b427d'}]}>
                保存
              </Button>
            </>
          ) : (
            <Button onPress={() => navigatorRef.current.goBack()} style={[{backgroundColor:'#2b427d'}]}>返回</Button>
          )}
        </View>
      </View>
    </Modal>
  );
}
const Bridge = React.forwardRef(Index);

export default React.forwardRef(function (
  {project, isClone, onClose, onSubmitOver},
  ref,
) {
  const [values, setValues] = React.useState(null);

  const indexRef = React.useRef();

  React.useImperativeHandle(ref, () => ({
    open: val => {
      setValues({...val});
      indexRef.current.open(val);
    },
    close: () => {
      setValues(null);
      indexRef.current.close();
    },
  }));

  const handleClose = async () => {
    onClose && onClose();
  };

  const handleSubmitOver = () => {
    indexRef.current.close();
    onSubmitOver && onSubmitOver();
  };

  return (
    <Portal>
      <Provider project={project} values={values}>
        <Bridge
          ref={indexRef}
          onClose={handleClose}
          isClone={isClone}
          onSubmitOver={handleSubmitOver}
        />
      </Provider>
    </Portal>
  );
});
