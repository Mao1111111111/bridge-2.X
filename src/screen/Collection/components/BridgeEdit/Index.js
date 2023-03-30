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

// 桥梁表单顶部
const Header = ({onClose}) => {
  // 全局样式
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  // 桥梁全局属性 --- 顶部导航列表、顶部导航左侧标签  这里的值，是在Base.js中赋予的
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

// 桥梁组件
function Index({onClose, onSubmitOver, isClone}, ref) {
  // 桥梁的全局变量
  const {state} = React.useContext(Context);

  // 总体的全局变量
  const {state: globalState} = React.useContext(GlobalContext);

  // 全局样式
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  // 按钮的loading
  const [loading, setLoading] = React.useState(false);

  // 模态框是否显示
  const [visible, setVisible] = React.useState(false);

  // 路由引用
  const navigatorRef = React.useRef();

  // 从 桥梁的全局变量 中取出
  const {
    // 表单数据
    values,
    // 项目信息
    project,
    // 编辑桥梁 的 id
    isUpdate,
    // 顶部部件数据
    topPartsData,
    // 底部部件数据
    bottomPartsData,
    // 桥面部件数据
    pmxData,
    // 底部类型
    footBarType,
  } = state;

  // 全局的 -- 用户信息，屏幕配置，桥幅属性
  const {userInfo, screen, bridgeside} = globalState;

  // 暴露给父组件的函数
  React.useImperativeHandle(ref, () => ({
    // 打开
    open: () => {
      setVisible(true);
      setLoading(false);
    },
    // 关闭
    close: () => {
      setVisible(false);
      setLoading(false);
    },
  }));


  // 保存按钮点击
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

  // 当数据已存在时，拼接提示信息
  const getMessage = () => {
    const paramname =
      bridgeside?.find(it => it.paramid === values.bridgeside)?.paramname || '';
    return `${values.bridgestation} ${values.bridgename} ${paramname} 已存在`;
  };

  const add = async (_values, parts) => {
    try {
      // 检测数据库中 桥梁名字 和 桥幅属性 是否存在
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
    // 模态框
    <Modal
      visible={visible}
      setVisible={setVisible}
      dismissable={false}
      contentContainerStyle={[styles.bridgeForm, screen]}>
      <View style={[theme.primaryBgStyle, tailwind.flex1]}>
        {/* 顶部 */}
        <Header onClose={() => setVisible(false)} />
        {/* 内部各个页面的路由 */}
        <NavigationContainer ref={navigatorRef} independent={true}>
          <NavigatorStack
            routes={[
              {
                // 基本页面
                name: 'Collection/Bridge/Base',
                component: Base,
              },
              {
                // 其他属性
                name: 'Collection/Bridge/Other',
                component: Other,
              },
              {
                // 上部结构
                name: 'Collection/Bridge/Top',
                component: TopParts,
              },
              {
                // 下部结构
                name: 'Collection/Bridge/Bottom',
                component: BottomParts,
              },
              {
                // 桥面系
                name: 'Collection/Bridge/PMX',
                component: PMX,
              },
              {
                // 部件列表
                name: 'Collection/Bridge/PartsEdit',
                component: PartsEdit,
              },
            ]}
          />
        </NavigationContainer>
        {/* 底部 */}
        <View
          style={[
            tailwind.justifyBetween,
            tailwind.flexRow,
            tailwind.pX3,
            tailwind.pY3,
          ]}>
          {footBarType === 'root' ? (
            <>
              {/* 点击取消，不显示桥梁编辑页面 */}
              <Button
                style={[tailwind.bgRed700,{backgroundColor:'#808285'}]}
                onPress={() => setVisible(false)}
                loading={loading}>
                取消
              </Button>
              {/* 保存 */}
              <Button onPress={handleSave} loading={loading} style={[{backgroundColor:'#2b427d'}]}>
                保存
              </Button>
            </>
          ) : (
            // 后退按钮 -- 进入其他属性、部件等页面时，显示
            <Button onPress={() => navigatorRef.current.goBack()} style={[{backgroundColor:'#2b427d'}]}>返回</Button>
          )}
        </View>
      </View>
    </Modal>
  );
}
const Bridge = React.forwardRef(Index);

// 创建桥梁、编辑桥梁 的 组件
export default React.forwardRef(function (
  {project, isClone, onClose, onSubmitOver},
  ref,
) {
  // 表单数据
  const [values, setValues] = React.useState(null);

  // 桥梁组件的引用
  const indexRef = React.useRef();

  // 暴露给父组件的函数
  React.useImperativeHandle(ref, () => ({
    // 打开时
    open: val => {
      // 当新增时，val为空
      // 设置表单数据
      setValues({...val});
      indexRef.current.open(val);
    },
    // 关闭时
    close: () => {
      setValues(null);
      indexRef.current.close();
    },
  }));

  // 关闭
  const handleClose = async () => {
    onClose && onClose();
  };

  // 操作结束后，关闭组件，并执行父组件的函数
  const handleSubmitOver = () => {
    indexRef.current.close();
    onSubmitOver && onSubmitOver();
  };

  return (
    <Portal>
      {/* Provider 创建、编辑桥梁 的 组件 的 全局参数 */}
      {/* 新增时，values = {}；编辑时，values 为这条桥梁的数据 */}
      <Provider project={project} values={values}>
        {/* 桥梁组件 */}
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
