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
  const {
    state: {userInfo, areaList, routeList},
  } = React.useContext(GlobalContext);

  const [visible, setVisible] = React.useState(false);

  const [data, setData] = React.useState();

  const [title, setTitle] = React.useState('');

  const [loading, setLoading] = React.useState(false);

  const [areacode, setAreacode] = React.useState('');

  const [routecode, setRoutecode] = React.useState('');

  const [area, setArea] = React.useState([]);

  const [route, setRoute] = React.useState([]);

  const [name, setName] = React.useState(dayjs().format('YYYY'));

  const formRef = React.useRef({});

  React.useImperativeHandle(ref, () => ({
    open: val => {
      if (val) {
        setData(val);
        setName(val.projectname);
        setTitle(Object.keys(val).length === 0 ? '新增项目' : '编辑项目');
      } else {
        setTitle('新增项目');
        setData(null);
      }
      setVisible(true);
    },
    close,
  }));

  React.useEffect(() => {
    if (areaList) {
      setArea(areaList);
      setAreacode(areaList[0]);
      if (routeList) {
        setRoutecode(
          (routeList?.filter(item => item.pcode === areaList[0].code) || [
            {},
          ])[0],
        );
      }
    }
  }, [areaList, routeList]);

  React.useEffect(() => {
    if (routeList && areacode) {
      setRoute(routeList?.filter(item => item.pcode === areacode.code) || []);
    }
  }, [areacode, routeList]);

  const close = () => {
    if (loading) {
      return;
    }
    setData(null);
    Object.keys(formRef.current).forEach(key => formRef.current[key].clear());
    formRef.current = {};
    setName(
      `${dayjs().format('YYYY')}${areaList[0].name}${
        (routeList?.filter(item => item.pcode === areaList[0].code) || [{}])[0]
          .name
      }`,
    );
    setRoutecode(
      (routeList?.filter(item => item.pcode === areaList[0].code) || [{}])[0],
    );
    setAreacode(areaList[0]);
    setVisible(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = {};
      Object.keys(formRef.current).forEach(key => {
        values[key] = formRef.current[key].value;
      });
      values.projectname = (values.projectname || '').replace(/ /g, '');
      if (!values.projectname) {
        alert('请填写项目名称!');
        setLoading(false);
        return;
      }
      if (!values.projectno) {
        alert('请填写项目编号!');
        setLoading(false);
        return;
      }
      const _p = await project.getByName(values.projectname, data?.id);
      if (_p.length !== 0) {
        alert('项目名称不可重复!');
        setLoading(false);
        return;
      }
      if (data) {
        await project.update({
          ...values,
          id: data.id,
        });
      } else {
        await project.save({
          ...values,
          userid: userInfo.userid,
          username: userInfo.nickname,
        });
      }
      setLoading(false);
      onSubmitOver();
      close();
    } catch (error) {
      console.error(error);
      alert('操作失败');
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setName(e => {
      const yaer = e.substring(0, 4);
      return `${yaer}${areacode?.name || ''}${routecode?.name || ''}`;
    });
  }, [areacode, routecode]);

  return (
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
        <Button
          style={[{backgroundColor: '#808285'}]}
          loading={loading}
          onPress={() => setVisible(false)}>
          取消
        </Button>
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
