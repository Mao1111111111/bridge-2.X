/* 
  项目新增修改表单
 */
import React from 'react';
import dayjs from 'dayjs';
import {Divider} from 'react-native-paper';
import {tailwind} from 'react-native-tailwindcss';
import {View, StyleSheet} from 'react-native';
import Modal from '../../../components/Modal';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import {TextInput} from '../../../components/Input';
import {Context as GlobalContext} from '../../../providers/GlobalProvider';
import * as project from '../../../database/project';
import {alert} from '../../../utils/alert';

export default React.forwardRef(({onSubmitOver}, ref) => {
  // 全局参数 -- 用户信息、养护区列表、路线列表
  const {
    state: {userInfo, areaList, routeList},
  } = React.useContext(GlobalContext);

  // 模态框是否显示
  const [visible, setVisible] = React.useState(false);
  // 回显的数据
  const [data, setData] = React.useState();
  // 标题
  const [title, setTitle] = React.useState('');
  // 按钮的loading
  const [loading, setLoading] = React.useState(false);
  // 当前选中的养护区编号
  const [areacode, setAreacode] = React.useState('');
  // 当前选中的路线编号 
  const [routecode, setRoutecode] = React.useState('');
  // 选择器 的 养护区列表
  const [area, setArea] = React.useState([]);
  // 选择器 的 路线列表
  const [route, setRoute] = React.useState([]);
  // 项目名称
  const [name, setName] = React.useState(dayjs().format('YYYY'));
  // 引用，用于记录 选择器和输入框的值
  const formRef = React.useRef({});

  // 暴露给父组件的函数
  React.useImperativeHandle(ref, () => ({
    // 打开
    open: val => {
      // 如果不存在val，那么是新增；如果存在val，那么是编辑
      if (val) {
        // 编辑
        // 设置回显的数据
        setData(val);
        // 项目名称
        setName(val.projectname);
        // 标题
        setTitle(Object.keys(val).length === 0 ? '新增项目' : '编辑项目');
      } else {
        // 新增
        setTitle('新增项目');
        setData(null);
      }
      // 显示模态框
      setVisible(true);
    },
    // 关闭函数
    close,
  }));

  // 触发时机： 1）养护区列表、路线列表更新时； 2）第一次加载时
  React.useEffect(() => {
    if (areaList) {
      // 设置 养护区列表
      setArea(areaList);
      // 设置当前选中的养护区
      setAreacode(areaList[0]);
      // 如果路线列表存在
      if (routeList) {
        // 设置当前选中的路线
        setRoutecode(
          (routeList?.filter(item => item.pcode === areaList[0].code) || [
            {},
          ])[0],
        );
      }
    }
  }, [areaList, routeList]);

  // 触发时机：选中的养护区变化时；路线列表变化时
  React.useEffect(() => {
    if (routeList && areacode) {
      // 设置路线列表
      setRoute(routeList?.filter(item => item.pcode === areacode.code) || []);
    }
  }, [areacode, routeList]);

  // 关闭模态框
  const close = () => {
    // 当loading状态时，点击关闭按钮无效
    if (loading) {
      return;
    }
    //----关闭
    // 重置数据
    setData(null);
    // 清空引用数据
    Object.keys(formRef.current).forEach(key => formRef.current[key].clear());
    formRef.current = {};
    // 重置项目名称  当前年份+养护区列表第一个的名字+路线列表第一个的名字
    setName(
      `${dayjs().format('YYYY')}${areaList[0].name}${
        (routeList?.filter(item => item.pcode === areaList[0].code) || [{}])[0]
          .name
      }`,
    );
    // 重置当前选中的路线
    setRoutecode(
      (routeList?.filter(item => item.pcode === areaList[0].code) || [{}])[0],
    );
    // 重置当前选中的养护区
    setAreacode(areaList[0]);
    // 关闭模态框
    setVisible(false);
  };

  // 点击确定时，保存项目信息
  const handleSave = async () => {
    try {
      // 设置按钮loading
      setLoading(true);
      // 记录 选择器 和 输入框 的数据对象
      const values = {};
      // 将引用中的数据，存入 values
      Object.keys(formRef.current).forEach(key => {
        values[key] = formRef.current[key].value;
      });
      // 去除项目名称中的空格
      values.projectname = (values.projectname || '').replace(/ /g, '');
      // 判断数据是否填写完整
      if (!values.projectname) {
        alert('请填写项目名称!');
        setLoading(false);
        return;
      }
      // 判断数据是否填写完整
      if (!values.projectno) {
        alert('请填写项目编号!');
        setLoading(false);
        return;
      }
      // 在数据库中查询 项目名称 是否重复，如果是编辑数据，需要判断id不同
      const _p = await project.getByName(values.projectname, data?.id);
      // 项目名称相同时，返回
      if (_p.length !== 0) {
        alert('项目名称不可重复!');
        setLoading(false);
        return;
      }
      // 编辑数据，更新数据库中信息；新增数据
      if (data) {
        // 如果data存在，那么是编辑，数据库更新数据
        await project.update({
          ...values,
          id: data.id,
        });
      } else {
        // 数据库存储数据
        await project.save({
          ...values,
          userid: userInfo.userid,
          username: userInfo.nickname,
        });
      }
      console.log('新增项目表单的data',values.projectno);
      // 解除loading
      setLoading(false);
      // 执行父组件传递过来的函数
      onSubmitOver(values.projectname, values.projectno);
      // 关闭模态框
      close();
    } catch (error) {
      console.error(error);
      alert('操作失败');
      setLoading(false);
    }
  };

  // 当养护区 或 路线 变化时，重置项目名称
  React.useEffect(() => {
    setName(e => {
      const yaer = e.substring(0, 4);
      return `${yaer}${areacode?.name || ''}${routecode?.name || ''}`;
    });
  }, [areacode, routecode]);

  return (
    // 模态框
    <Modal
      visible={visible}
      width={450}
      height={270}
      title={title}
      pid="P1003"
      showHead={true}
      onClose={close}>
      {visible ? (
        <View style={[tailwind.pX6, tailwind.flex1, tailwind.justifyBetween]}>
          <Select
            name="areacode"
            label="选择路段:"
            labelName="name"
            valueName="code"
            value={data?.areacode || ''}
            onChange={setAreacode}
            ref={e => (formRef.current.areacode = e)}
            values={area}
          />
          <Select
            name="routecode"
            label="选择路线:"
            labelName="name"
            valueName="code"
            value={data?.routecode || ''}
            onChange={setRoutecode}
            ref={e => (formRef.current.routecode = e)}
            values={route}
          />
          <TextInput
            name="projectname"
            label="项目名称:"
            value={name}
            ref={e => (formRef.current.projectname = e)}
          />
          <TextInput
            name="projectno"
            label="项目编号:"
            value={data?.projectno || dayjs().format('YYYYMMDDHHmmss')}
            ref={e => (formRef.current.projectno = e)}
          />
        </View>
      ) : (
        <></>
      )}
      <Divider style={[tailwind.mY4]} />
      <View style={[styles.modalFoot]}>
        {/* 取消按钮 */}
        <Button
          style={[{backgroundColor: '#808285'}]}
          loading={loading}
          onPress={() => setVisible(false)}>
          取消
        </Button>
        {/* 确定按钮 */}
        <Button onPress={handleSave} loading={loading} style={[{backgroundColor: '#2b427d'}]}>
          确定
        </Button>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalFoot: {
    ...tailwind.mB4,
    ...tailwind.mX6,
    ...tailwind.flexRow,
    ...tailwind.justifyBetween,
  },
});
