// 导入 、克隆桥梁
import React,{useState,useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity,Pressable,
  ImageBackground, ScrollView,Dimensions,} from 'react-native';
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
import * as bridgeReportMember from '../../../database/bridge_report_member';
import {alert, confirm} from '../../../utils/alert';
import CommonView from '../../../components/CommonView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
// 克隆
const Clone = React.forwardRef(({onSubmitOver}, ref) => {
  // 从 全局参数 中 获取 桥幅属性
  const {
    state: {bridgeside,userInfo},
  } = React.useContext(GlobalContext);

  // 模态框是否显示
  const [visible, setVisible] = React.useState(false);

  // 当前项目的数据
  const [project, setProject] = React.useState('');

  // 表格数据
  const [list, setList] = React.useState([]);

  // 表格loading
  const [loading, setLoading] = React.useState(false);

  // 选中的数据 id 单选
  const [checked, setChecked] = React.useState(null);

  // 当前页
  const [page, setPage] = React.useState();

  // 共几条
  const [total, setTotal] = React.useState(0);

  // 共几页
  const [pageTotal, setPageTotal] = React.useState(0);

  // 检索数据
  const [search, setSearch] = React.useState({});

  // 选中的桥幅属性
  const [selBridgeside, setSelBridgeside] = React.useState('');

  // 桥梁组件的引用
  const bridgeRef = React.useRef();

  // 检索输入框的引用
  const searchRef = React.useRef({});

  // 暴露给父组件的函数
  React.useImperativeHandle(ref, () => ({
    // 打开
    open: _project => {
      // 设置项目数据
      setProject(_project);
      // 重置页码
      setPage({
        pageSize: 10,
        pageNo: 0,
      });
      // 重置检索条件
      setSearch('');
      setSelBridgeside('all')
      // 打开模态框
      setVisible(true);
    },
    // 关闭
    close,
  }));

  
  // 当检索条件 或 页码 变化时触发
  React.useEffect(() => {
    if (!page) {
      return;
    }
    let _search = search
    if(_search.bridgeside == 'all'){
       _search.bridgeside = ''
    }
    // 表格loading
    setLoading(true);
    // 查询桥梁数据 -- 查询的是 所有桥梁的数据
    bridge
      .search({param: _search, page})
      .then(res => {
        let userid = userInfo.userid
        let newList = []
        res.list.forEach(item=>{
          if(item.userid==userid){
            newList.push(item)
          }
        })
        setList(newList);
        setPageTotal(res.page.pageTotal);
        setTotal(res.page.total);
      })
      .finally(() => setLoading(false));
  }, [search, page]);

  // 关闭
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

  // 点击选择框 单选 
  const handleCheck = id => {
    // 存的是id
    setChecked(checked === id ? null : id);
  };

  // 克隆
  const handleClone = () => {
    // 关闭模态框
    setVisible(false);
    // 打开桥梁表单
    bridgeRef.current.open(list.find(item => item.id === checked));
  };

  // 检索
  const handleSearch = () => {
    // 存放检索数据
    const _data = {};
    Object.keys(searchRef.current).forEach(key => {
      _data[key] = searchRef.current[key].value;
      if (searchRef.current[key].blur) {
        searchRef.current[key].blur();
      }
    });
    // 设置检索数据
    setSearch(_data);
    // 重置页面
    setPage({
      pageSize: 10,
      pageNo: 0,
    });
    // 表格loading
    setLoading(true);
  };

  // 克隆完成后,关闭桥梁组件,执行父组件的函数,显示克隆桥梁模态框
  const handleSubmitOver = () => {
    alert('克隆完成', async () => {
      bridgeRef.current.close();
      onSubmitOver && (await onSubmitOver());
      setVisible(true);
    });
  };

  return (
    <>
      {/* 模态框 */}
      <Modal
        visible={visible}
        title="克隆桥梁"
        pid="P1102"
        showHead={true}
        notScroll={true}
        width={800}
        height={500}
        keyboardVerticalOffset={-250}
        onClose={() => setVisible(false)}>
        {/* 顶部检索区域 */}
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
                paramid: 'all',
              },
              ...(bridgeside || []),
            ]}
            value={selBridgeside}
            onChange={el =>setSelBridgeside(el.paramid)}
            ref={el => (searchRef.current.bridgeside = el)}
            style={[tailwind.mR6, tailwind.flex1]}
          />
          <Button onPress={handleSearch} style={[{backgroundColor: '#2b427d'}]}>检索</Button>
        </View>
        {/* 表格区域 */}
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
                  {/* 选择框--单选 */}
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
        {/* 分割线 */}
        <Divider style={[tailwind.mB2]} />
        {/* 底部操作按钮 */}
        <View style={styles.modalFoote}>
          {/* 取消，关闭模态框 */}
          <Button style={[{backgroundColor: '#808285'}]} onPress={() => setVisible(false)}>
            取消
          </Button>
          {/* 克隆 */}
          <Button onPress={handleClone} style={[{backgroundColor: '#2b427d'}]}>克隆选中的桥梁</Button>
        </View>
      </Modal>
      {/* 桥梁表单 */}
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

// 导入桥梁
const Inducts = React.forwardRef(({onSubmitOver}, ref) => {
  // 从全局参数中 获取 桥幅属性、用户信息
  const {
    state: {bridgeside, userInfo},
  } = React.useContext(GlobalContext);

  // 模态框是否显示
  const [visible, setVisible] = React.useState(false);

  // 当前的 项目id
  const [projectid, setProjectId] = React.useState('');

  // 表格loading
  const [loading, setLoading] = React.useState(false);

  // 表格数据
  const [list, setList] = React.useState([]);

  // 当前页
  const [page, setPage] = React.useState();

  // 共几条
  const [total, setTotal] = React.useState(0);

  // 共几页
  const [pageTotal, setPageTotal] = React.useState(0);

  // 查询参数
  const [keywords, setKeywords] = React.useState('');

  // 当前选中桥梁的bridgeid，多选，是数组
  const [checked, setChecked] = React.useState(new Set([]));

  // 检索输入框的引用
  const searchRef = React.useRef([]);

  // 暴露给父组件的函数
  React.useImperativeHandle(ref, () => ({
    // 打开
    open: project => {
      // project 是当前项目信息
      // 设置projectid
      setProjectId(project.projectid);
      // 表格loading
      setLoading(true);
      setPage({
        pageSize: 10,
        pageNo: 0,
      });
      setVisible(true);
    },
    // 关闭函数
    close,
  }));

  // 当 查询参数变化 或 页码变化 或 项目id变化时 触发
  React.useEffect(() => {
    // 如果没有页码，那么返回
    if (!page) {
      return;
    }
    // 设置表格loading
    setLoading(true);
    // 查询桥梁数据--这里查询的是 bridge_project_bind 表中，项目id不等于当前项目id的数据
    bridge
      .search({
        param: {
          notId: projectid,
          keywords,
        },
        page,
      })
      .then(res => {
        let userid = userInfo.userid
        let newList = []
        res.list.forEach(item=>{
          if(item.userid==userid){
            newList.push(item)
          }
        })
        // 设置表格数据
        setList(newList);
        setPageTotal(res.page.pageTotal);
        setTotal(res.page.total);
      })
      .finally(() => setLoading(false));
  }, [keywords, page, projectid]);

  // 关闭时
  const close = () => {
    // 关闭模态框
    setVisible(false);
    // 清空表格数据
    setList([]);
    // 清空选中
    setChecked(new Set([]));
    // 清空检索数据
    if (searchRef.current[0]) {
      searchRef.current[0].clear();
    }
  };

  // 点击 选择框 -- 可多选
  const handleCheck = id => {
    // id 是 bridgeid
    const _checked = checked;
    if (_checked.has(id)) {
      _checked.delete(id);
    } else {
      _checked.add(id);
    }
    setChecked(new Set(_checked));
  };

  // 导入
  const handleInducts = () => {
    confirm('是否导入选中的数据？', async () => {
      try {
        // 表格loading
        setLoading(true);
        // 因为是多选，所以异步包裹
        await Promise.all(
          // 遍历选中的 bridgeid列表
          [...checked].map(
            id =>
              new Promise((resolve, reject) => {
                // 将数据存到桥梁绑定关系中
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
        // 清空查询参数，来重置表格数据
        setKeywords('');
        // 清空查询输入框
        if (searchRef.current[0]) {
          searchRef.current[0].clear();
        }
        // 重置页码
        setPage({
          pageSize: 10,
          pageNo: 0,
        });
        alert('导入完成');
        // 执行父组件传递的函数
        onSubmitOver && onSubmitOver();
        // 关闭模态框
        close();
      } catch (err) {
        console.error(err);
        alert('导入失败');
      } finally {
        setLoading(false);
      }
    });
  };

  // 点击检索按钮
  const handleSearch = () => {
    // 获取检索输入框的引用
    const _searchRef = searchRef.current;
    // 检索输入框失焦
    _searchRef[0].blur();
    // 设置查询参数
    setKeywords(_searchRef[0].value);
    // 重置页码
    setPage({
      pageSize: 10,
      pageNo: 0,
    });
  };

  return (
    // 导入桥梁模态框
    <Modal
      visible={visible}
      title="导入桥梁"
      pid="P1102"
      showHead={true}
      // 没有滚动条
      notScroll={true}
      width={800}
      height={500}
      keyboardVerticalOffset={-250}
      onClose={() => setVisible(false)}>
      <View style={tailwind.flex1}>
        {/* 检索区域 */}
        <View style={[tailwind.pX4, tailwind.pB2, tailwind.flexRow]}>
          <TextInput
            name="name"
            label="桩号/桥梁名称:"
            ref={el => (searchRef.current[0] = el)}
            style={[tailwind.mR6, tailwind.flex1]}
          />
          <Button onPress={handleSearch} style={[{backgroundColor: '#2b427d'}]}>检索</Button>
        </View>
        {/* 表格区域 */}
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
      {/* 分割线 */}
      <Divider style={[tailwind.mB2]} />
      {/* 底部操作按钮 */}
      <View style={styles.modalFoote}>
        {/* 取消按钮，关闭模态框 */}
        <Button style={[{backgroundColor: '#808285'}]} onPress={() => setVisible(false)}>
          取消
        </Button>
        {/* 确认导入按钮 */}
        <Button onPress={handleInducts} style={[{backgroundColor: '#2b427d'}]}>确认导入</Button>
      </View>
    </Modal>
  );
});

// 协同检测
const Cooperate = React.forwardRef(({onSubmitOver}, ref,) => {
  // 从全局参数中 获取 桥幅属性、用户信息
  const {
    state: {bridgeside, userInfo},
  } = React.useContext(GlobalContext);

  // 模态框是否显示
  const [visible, setVisible] = React.useState(false);

  // 当前的 项目id
  const [projectid, setProjectId] = React.useState('');

  // 表格loading
  const [loading, setLoading] = React.useState(false);

  // 表格数据
  const [list, setList] = React.useState([]);

  // 是否正在任务中
  const [isTaskIng,setIsTaskIng] = useState(false)

  // 当前页
  const [page, setPage] = React.useState();

  // 共几条
  const [total, setTotal] = React.useState(0);

  // 共几页
  const [pageTotal, setPageTotal] = React.useState(0);

  // 查询参数
  const [keywords, setKeywords] = React.useState('');

  // 当前选中桥梁的bridgeid，多选，是数组
  const [checked, setChecked] = React.useState(new Set([]));

  const [project,setProject] = useState()

  // 检索输入框的引用
  const searchRef = React.useRef([]);

  const [bridgeInfo,setBridgeInfo] = useState()

  const [navigation,setNavigation] = useState()
  const [route,setRoute] = useState()

  // 暴露给父组件的函数
  React.useImperativeHandle(ref, () => ({
    
    // 打开
    open: (project,bridge,navigation,route) => {
      setNavigation(navigation)
      setRoute(route)
      console.log('navigationnavigation',navigation);
      // 是否正在任务中
      // isTaskIng 读取本地数据库
      // setIsTaskIng(true)

      if(isTaskIng) {
        // 如果处于正在任务的状态，打开弹窗获取数据
        getTableData()
      } else if (!isTaskIng) {
        setList([])
      }
      
      
      // project 是当前项目信息
      // bridge 选择打开的桥梁信息
      console.log('bridge',bridge);
      setBridgeInfo(bridge)
      if(bridge){
        // 选择桥梁进入时，默认显示创建任务
        setFuncShow(1)
      } else if (!bridge){
        // 未选择桥梁进入时，默认显示参与任务
        setFuncShow(2)
      }
      setProject(project)
      // 设置projectid
      setProjectId(project.projectid);
      // 表格loading
      setLoading(true);
      setPage({
        pageSize: 10,
        pageNo: 0,
      });
      setVisible(true);
    },
    // 关闭函数
    close,
  }));

  // 当 查询参数变化 或 页码变化 或 项目id变化时 触发
  React.useEffect(() => {
    // 如果没有页码，那么返回
    if (!page) {
      return;
    }
    // 设置表格loading
    setLoading(true);
    // 查询桥梁数据--这里查询的是 bridge_project_bind 表中，项目id不等于当前项目id的数据
    bridge
      .search({
        param: {
          notId: projectid,
          keywords,
        },
        page,
      })
      .then(res => {
        let userid = userInfo.userid
        let newList = []
        res.list.forEach(item=>{
          if(item.userid==userid){
            newList.push(item)
          }
        })
        // 设置表格数据
        // setList(newList);
        setPageTotal(res.page.pageTotal);
        setTotal(res.page.total);
      })
      .finally(() => setLoading(false));
  }, [keywords, page, projectid]);

  // 关闭时
  const close = () => {
    // 关闭模态框
    setVisible(false);
    // 清空表格数据
    setList([]);
    // 清空选中
    setChecked(new Set([]));
    // 清空检索数据
    if (searchRef.current[0]) {
      searchRef.current[0].clear();
    }
    // 清空桥梁数据
    setBridgeInfo('')
    // 重置表单数据
    setTaskCode('')
    setPersonNum('1')
    setPersonName('')
    setJoinCode('')
    setJoinPersonName('')
  };

  // 点击 选择框 -- 可多选
  const handleCheck = id => {
    // id 是 bridgeid
    const _checked = checked;
    if (_checked.has(id)) {
      _checked.delete(id);
    } else {
      _checked.add(id);
    }
    setChecked(new Set(_checked));
  };

  const [taskCode,setTaskCode] = useState(0) // 任务码 - 创建
  const [personNum,setPersonNum] = useState(1) //协同人数
  const [personName,setPersonName] = useState('') //创建者名称 - 创建
  const [btnText,setBtnText] = useState('') //确认按钮的文字

  const [joinCode,setJoinCode] = useState('')
  const [joinPersonName,setJoinPersonName] = useState('')

  useEffect(()=>{
    setPersonNum('1')
    // if(bridgeInfo){
    //   setFuncShow(1)
    // } else if (!bridgeInfo){
    //   setFuncShow(2)
    // }
    if(funcShow == 1){
      setBtnText('确认创建')
    } else if (funcShow == 2){
      setBtnText('确认参与')
    }
    
  },[])
  const [funcShow,setFuncShow] = useState(1)

  // 切换功能页面
  const changeFunc = (e) => {
    // console.log('11111',e);
    setFuncShow(e)
  }

  
  // 生成任务码
  const changeTaskCode = () => {
    // 随机六位整数
    var code = '';
    for(var i=0;i<6;i++){
      code += parseInt(Math.random()*10);
    }
    console.log('切换任务码',code);
    setTaskCode(code)
    // console.log('切换任务码',);
  }

  // 复制任务码
  const copyCode = async(value) =>{
    // 写入
    Clipboard.setString(value);
    // 读取
    let str = await Clipboard.getString();
    // console.log('复制的内容',str)
    if(str){
      alert('复制任务码成功【' + str + '】');
    }
  }

  const personNumChange = (e) => {
    var a = parseInt(personNum)
    if(personNum>=2 && personNum<10){
      a+=e
      setPersonNum(a.toString())
    }
    if(personNum == 1){
      if(e>0){
        a+=e
        setPersonNum(a.toString())
      }
    }
    if(personNum == 10){
      if(e<0){
        a+=e
        setPersonNum(a.toString())
      }
    }
  }

  // 创建任务 的输入
  const valueChange = (e) => {
    console.log('输入内容',e);
    if(e.name=='personName'){
      setPersonName(e.value)
    }
  }

  // 参与任务 的输入
  const joinValueChange = (e) => {
    console.log('输入内容',e);
    if(e.name == 'joinCode'){
      setJoinCode(e.value)
    } else if (e.name == 'joinPersonName') {
      setJoinPersonName(e.value)
    }
  }

  // 确认
  const confirm = () => {
    if(funcShow == 1){
      // 创建任务的确认操作
      if(bridgeInfo){
        console.log('创建任务');
        // 任务码
        if(taskCode){
          console.log('任务码taskCode',taskCode);
        }
        // 协同人数
        if(personNum){
          console.log('协同人数personNum',personNum);
        }
        // 用户名称
        if(personName){
          console.log('用户名称personName',personName);
        }
      }
      if(!bridgeInfo){
        console.log('无数据空的确认');
      }
      // 获取数据
      getTableData()

      // 任务创建成功后改变'是否在任务中'的状态
      setIsTaskIng(true)
      
      

    } else if (funcShow == 2) {
      console.log('参与任务');
      // 任务码
      console.log('参与者的任务码',joinCode);
      // 用户名称
      console.log('参与者的名称',joinPersonName);
      // 获取数据
      getTableData()
    }

  }

  // 前往检测
  const goWork = () => {
    // console.log('页面跳转');
    try {
      // 关闭弹窗页面
      close()
      // 跳转
      navigation.navigate('Collection/Detect/BridgeTest', {
        project: project,
        bridge: bridgeInfo,
        list: route.params.list
      })
    } catch (error) {
      console.log('创建协同任务页面跳转error',error);
    }
  }

  const deleteTask = () => {
    console.log('删除任务');

    // 改变isTaskIng的状态
    setIsTaskIng(false)

    // 清除获取数据的定时器

    // 清空表格数据
    setList([])
    // 重置页面状态

  }

  // 获取任务协同者表格数据
  const getTableData = () => {
      // 持续向盒子获取最新状态信息
      // setInterval(()=>{
        console.log('获取数据');
        setList([])
        // =====模拟表格数据====
          let list = [
            {
              id:'1',
              user:'张三1',
              userName:'asfx',
              joinTime:'10:21',
              status:'在线'
            },
            {
              id:'2',
              user:'张三2',
              userName:'asdfbdffx',
              joinTime:'10:22',
              status:'在线'
            },
            {
              id:'3',
              user:'张三3',
              userName:'awrhwsfx',
              joinTime:'10:23',
              status:'离线'
            },
            {
              id:'4',
              user:'张三4',
              userName:'asfxbsbx',
              joinTime:'10:24',
              status:'在线'
            },
            {
              id:'5',
              user:'张三5',
              userName:'asfasx',
              joinTime:'10:25',
              status:'在线'
            },
            {
              id:'6',
              user:'张三2',
              userName:'asdfbdffx',
              joinTime:'10:22',
              status:'在线'
            },
            {
              id:'7',
              user:'张三3',
              userName:'awrhwsfx',
              joinTime:'10:23',
              status:'离线'
            },
            {
              id:'8',
              user:'张三4',
              userName:'asfxbsbx',
              joinTime:'10:24',
              status:'在线'
            },
            {
              id:'9',
              user:'张三5',
              userName:'asfasx',
              joinTime:'10:25',
              status:'在线'
            },
          ]
          setList(list)
      // },1000*2)
  }

  return (
    // 导入桥梁模态框
    <Modal
      visible={visible}
      title="协同检测"
      pid="P1103"
      showHead={true}
      // 没有滚动条
      notScroll={true}
      width={800}
      height={500}
      keyboardVerticalOffset={-250}
      onClose={() => setVisible(false)}>
      <View style={[tailwind.flex1,{}]}>
      <View style={{height:'10%',width:'100%',
    flexDirection: 'row',justifyContent:'flex-start',alignItems:'center'}}>
        <Pressable style={{width:'15%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',
        backgroundColor:funcShow == 1 ? '#2b427d' : '#2b427d00'}}
        onPress={()=>changeFunc(1)}>
          <Text style={{color:funcShow == 1 ? '#fff' : '#808285'}}>创建任务</Text>
        </Pressable>
        <Pressable style={{width:'15%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',
        backgroundColor:funcShow == 2 ? '#2b427d' : '#2b427d00'}}
        onPress={()=>changeFunc(2)}>
          <Text style={{color:funcShow == 2 ? '#fff' : '#808285'}}>参与任务</Text>
        </Pressable>
        <Pressable style={{width:'15%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',
        backgroundColor:funcShow == 3 ? '#2b427d' : '#2b427d00'}}
        onPress={()=>changeFunc(3)}>
          <Text style={{color:funcShow == 3 ? '#fff' : '#808285'}}>使用帮助</Text>
        </Pressable>
      </View>
        <View style={[tailwind.flex1,{}]}>
          {/* <Text>选择的桥梁：{bridgeInfo?.bridgename}</Text> */}
          {
            funcShow == 1 && bridgeInfo ? 
            <View style={{width:'100%',height:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <View style={{width:'50%',height:'100%',alignItems:"center",paddingTop:50,paddingLeft:20}}>
                <View style={{width:'100%',height:'20%',flexDirection:'row',alignItems:'center'}}>
                  <TextInput
                    name="taskCode"
                    label="任务码:    "
                    disabled
                    value={taskCode}
                    onChange={(e)=>valueChange(e)}
                    style={[tailwind.mR6, {height:'100%',width:'50%'}]}
                    inputStyle={[{color:'black'}]}
                  />
                  <Button style={{backgroundColor: '#2b427d'}} onPress={()=>changeTaskCode()}>生成任务码</Button>
                  <Button style={{backgroundColor: '#2b427d'}} onPress={()=>copyCode(taskCode)}>复制任务码</Button>
                </View>
                <View style={{width:'100%',height:'20%',flexDirection:'row',alignItems:'center'}}>
                  <TextInput
                    name="personNum"
                    label="协同人数:"
                    disabled
                    value={personNum}
                    onChange={(e)=>valueChange(e)}
                    style={[tailwind.mR6, {height:'100%',width:'50%'}]}
                    inputStyle={[{color:'black'}]}
                  />
                  <Button style={{backgroundColor: '#2b427d'}} onPress={()=>personNumChange(1)}>+</Button>
                  <Button style={{backgroundColor: '#2b427d'}} onPress={()=>personNumChange(-1)}>-</Button>
                </View>
                <View style={{width:'100%',paddingLeft:70}}>
                  <Text>*除您之外的其他协作者人数（1~10）</Text>
                </View>
                <View style={{width:'100%',height:'20%',flexDirection:'row',alignItems:'center'}}>
                  <TextInput
                    name="personName"
                    label="您的名称:"
                    onChange={(e)=>valueChange(e)}
                    style={[tailwind.mR6, {height:'100%',width:'50%'}]}
                  />
                </View>
              </View>
              {
                list.length ?
                <View style={{width:'45%',height:'100%',alignItems:'center',marginLeft:20}}>
                  {/* 参与者信息表格 */}
                  <View style={{width:'100%',height:'70%',padding:10}}>
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
                          <Table.Title title="序号" flex={1} />
                          <Table.Title title="账号" flex={4} />
                          <Table.Title title="人员" flex={3} />
                          <Table.Title title="加入时间" flex={2} />
                          <Table.Title title="状态" flex={2} />
                        </Table.Header>
                      }>
                      <FlatList
                        data={list}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item, index}) => (
                          <Table.Row key={index}>
                            <Table.Cell flex={1}>{index + 1}</Table.Cell>
                            <Table.Cell flex={4}>{item.user}</Table.Cell>
                            <Table.Cell flex={3}>{item.userName}</Table.Cell>
                            <Table.Cell flex={2}>{item.joinTime}</Table.Cell>
                            <Table.Cell flex={2}>{item.status}</Table.Cell>
                          </Table.Row>
                        )}
                      />
                    </Table.Box>
                  </View>
                  <View style={{width:'100%',height:'30%',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Button style={[{backgroundColor: '#2b427d'}]} onPress={()=>deleteTask()}>删除任务</Button>
                    <Button style={[{backgroundColor: '#2b427d'}]} onPress={()=>goWork()}>开始检测</Button>
                  </View>
                </View> 
                : <></>
              }
              {/* 创建任务成功后的左侧表单遮罩层 */}
              {
                list.length ? 
                <View style={{width:'54%',height:'100%',alignItems:"center",paddingTop:50,paddingLeft:20,backgroundColor:'#fff',
                position:'absolute',opacity:0.3,justifyContent:'flex-end',alignItems:'center',paddingBottom:40}}>
                  <Text>不允许创建多个任务</Text>
                </View>
                : <></>
              }
            </View>
            : funcShow == 1 && !bridgeInfo ? 
              <View style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Text>*请选择桥梁后再创建协同检测任务</Text>
              </View>
            : <></>
          }
          {
            funcShow == 2 ? 
            <View style={{width:'100%',height:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <View style={{width:'50%',height:'100%',alignItems:"center",paddingTop:50,paddingLeft:20}}>
                <View style={{width:'100%',height:'20%',flexDirection:'row',alignItems:'center'}}>
                  <TextInput
                    name="joinCode"
                    label="任务码:    "
                    value={joinCode}
                    onChange={(e)=>joinValueChange(e)}
                    style={[tailwind.mR6, {height:'100%',width:'50%'}]}
                    inputStyle={[{color:'black'}]}
                  />
                </View>
                <View style={{width:'100%',height:'20%',flexDirection:'row',alignItems:'center'}}>
                  <TextInput
                    name="joinPersonName"
                    label="您的名称:"
                    onChange={(e)=>joinValueChange(e)}
                    style={[tailwind.mR6, {height:'100%',width:'50%'}]}
                  />
                </View>
              </View>
              {
                list.length ?
                <View style={{width:'45%',height:'100%',alignItems:'center',marginLeft:20}}>
                  {/* 参与者信息表格 */}
                  <View style={{width:'100%',height:'70%',padding:10}}>
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
                          <Table.Title title="序号" flex={1} />
                          <Table.Title title="账号" flex={4} />
                          <Table.Title title="人员" flex={3} />
                          <Table.Title title="加入时间" flex={2} />
                          <Table.Title title="状态" flex={2} />
                        </Table.Header>
                      }>
                      <FlatList
                        data={list}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item, index}) => (
                          <Table.Row key={index}>
                            <Table.Cell flex={1}>{index + 1}</Table.Cell>
                            <Table.Cell flex={4}>{item.user}</Table.Cell>
                            <Table.Cell flex={3}>{item.userName}</Table.Cell>
                            <Table.Cell flex={2}>{item.joinTime}</Table.Cell>
                            <Table.Cell flex={2}>{item.status}</Table.Cell>
                          </Table.Row>
                        )}
                      />
                    </Table.Box>
                  </View>
                  <View style={{width:'100%',height:'30%',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Button style={[{backgroundColor: '#2b427d'}]} onPress={()=>deleteTask()}>删除任务</Button>
                    <Button style={[{backgroundColor: '#2b427d'}]} onPress={()=>goWork()}>开始检测</Button>
                  </View>
                </View> 
                : <></>
              }
              {/* 创建任务成功后的左侧表单遮罩层 */}
              {
                list.length ? 
                <View style={{width:'54%',height:'100%',alignItems:"center",paddingTop:50,paddingLeft:20,backgroundColor:'#fff',
                position:'absolute',opacity:0.3,justifyContent:'flex-end',alignItems:'center',paddingBottom:40}}>
                  {/* <Text>不允许创建多个任务</Text> */}
                </View>
                : <></>
              }
            </View>
            : <></>
          }
          {
            funcShow == 3 ? 
            <View style={{width:'100%',height:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <View style={{width:'50%',height:'100%',alignItems:'flex-start',paddingTop:50,paddingLeft:20}}>
                <Text>1.如需使用协同检测功能，请先让采集端设备连接到协同检测盒子</Text>
                <Text>2.协同检测盒子WiFi名称：JIANLIDE_LAN1001</Text>
                <Text>3.协同检测盒子WiFi密码：jianlide</Text>
              </View>
            </View>
            : <></>
          }
        </View>
        
      </View>
      {/* 分割线 */}
      <Divider style={[tailwind.mB2]} />
      {/* 底部操作按钮 */}
      <View style={styles.modalFoote}>
        {/* 取消按钮，关闭模态框 */}
        <Button style={[{backgroundColor: '#808285'}]} onPress={() => close()}>
          取消
        </Button>
        {/* 确认导入按钮 */}
        <Button style={[{backgroundColor: '#2b427d'}]} onPress={()=>confirm()}>确认</Button>
      </View>
    </Modal>
  );
});

export default function ProjectDetail({route, navigation}) {
  // 全局参数 -- 桥幅属性、养护区列表、路线列表
  const {
    state: {bridgeside, areaList, routeList},
    dispatch,
  } = React.useContext(GlobalContext);

  // 全局样式
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  // 表格数据
  const [list, setList] = React.useState([]);

  // 当前选中项
  const [nowChecked, setNowChecked] = React.useState(null);

  // 当前页
  const [page, setPage] = React.useState();

  // 共几条
  const [total, setTotal] = React.useState(0);

  // 共几页
  const [pageTotal, setPageTotal] = React.useState(0);

  // 检索值
  const [search, setSearch] = React.useState({});

  // 克隆桥梁 模态框的 引用
  const cloneRef = React.useRef();

  // 导入桥梁 模态框的 引用
  const inductsRef = React.useRef();

  // 协同检测 模态框的 引用
  const coopRef = React.useRef();

  // 桥梁引用
  const bridgeRef = React.useRef();

  // 检索输入框的引用
  const searchRef = React.useRef([]);

  // 表格的loading
  const [loading, setLoading] = React.useState(false);

  // 当前选中的养护区
  const [areacode, setAreacode] = React.useState('');

  // 当前选中的路线
  const [routecode, setRoutecode] = React.useState('');
  
  // 项目管理传递过来的 此条项目的数据
  const {project} = route.params;

  // 顶部导航项
  const headerItems = [
    // 采集平台,点击打开抽屉路由
    // {
    //   name: '采集平台',
    //   onPress: () =>
    //     dispatch({
    //       type: 'drawerShowFlg',
    //       payload: Math.random().toString(36).slice(-8),
    //     }),
    // },
    // {
    //   name: '检测平台',
    // },
    // 返回项目管理
    {
      name: '  项目管理',
      onPress: () => navigation.navigate('Collection/Detect/Project'),
    },
    // 项目名
    {
      name: `${project.projectname}`,
    },
  ];

  // 屏幕聚焦时
  useFocusEffect(
    React.useCallback(() => {
      // 重置页码
      setPage({
        pageSize: 10,
        pageNo: 0,
      });
    }, []),
  );

  // 桥梁名称列表
  const [bridgeList, setBridgeList] = useState()

  const [screenWidth,setScreenWidth] = useState() //屏幕宽度

  // 检索条件变化、页码变化、项目变化时 触发
  React.useEffect(() => {
    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
    if (!page) {
      return;
    }
    // 表格loading
    setLoading(true);

    let bridgeList = []

    // 查询数据
    bridge
      .new_search({
        param: {
          ...search,
          projectid: project.projectid,
        },
        page,
      })
      .then(async res => {
        setLoading(false);
        let _list = res.list
        for(let i=0;i<_list.length;i++){
          let bindDataParams = {
            bridgeid:_list[i].bridgeid,
            projectid: project.projectid,
          }
          await bridgeProjectBind.get(bindDataParams).then(async res1=>{
            await bridgeReportMember.searchUpDate(res1.bridgereportid).then(res2=>{
              if(res2){
                _list[i].date = res2.u_date
              }
            })
          })
        }
        setList(_list);
        setPageTotal(res.page.pageTotal);
        setTotal(res.page.total);
        res.list.forEach((item)=> {
          bridgeList.push({
            project,
            list,
            bridgeName:item.bridgename,
            bridgeStation:item.bridgestation,
            bridgeId:item.bridgeid
          })
        })
        setBridgeList(bridgeList)
        setBriStorage(bridgeList)
        // console.log('bridgeList',bridgeList);
      })
      .finally(() => {});

      setImgType('cooperate')
  }, [search, page, project]);

  // 当选中的养护区变化时，重置选中的路线
  React.useEffect(() => {
    setRoutecode({code: ''});
  }, [areacode]);

  // 点击查询
  const handleSearch = () => {
    const values = {};
    searchRef.current.forEach(item => {
      values[item.name] = item.value;
      if (item.blur) {
        item.blur();
      }
    });
    // 设置查询参数
    setSearch(values);
    /* setPage({
      pageSize: 10,
      pageNo: 0,
    }); */
  };

  // 删除数据
  const handleDelete = () => {
    confirm('是否删除选中的数据？', async () => {
      try {
        // 表格loading
        setLoading(true);
        // 删除桥梁和项目的绑定关系
        await bridgeProjectBind.remove({
          bridgeid: nowChecked.bridgeid,
          projectid: project.projectid,
        });
        // 重置页码
        setPage({
          pageSize: 10,
          pageNo: 0,
        });
        // 清空选中
        setNowChecked(null);
        // 提示
        alert('删除成功');
      } catch (err) {
        console.error(err);
        alert('删除失败');
      } finally {
        // 执行完成后，解除表格loading
        setLoading(false);
      }
    });
  };

  // 全局保存桥梁列表数据
  const setBriStorage = async(value) => {
    // console.log('valueeeeeee',value);
    try {
      const name = 'briList'
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(name, jsonValue)
    } catch (err) {
      console.log('setBriStorage err',err);
    }
  }

  // 新增、修改、导入、克隆完成后，重置页码，重置选中
  const handleSubmitOver = async () => {
    try {
      setPage({
        pageSize: 10,
        pageNo: 0,
      });
      setNowChecked(null);
    } catch (err) {
      console.info("err");
    } finally {
      setLoading(false);
    }
  };

// 协同检测按钮 不同状态对应的图标
  const [imgType,setImgType] = useState('cooperate')

  // 点击选择框 -- 单选
  const handleCheck = item => {
    if (!nowChecked) {
      setNowChecked(item);
      setImgType('cooperate')

      return;
    } else if (nowChecked.id === item.id) {
      setNowChecked(null);
      // setImgType('cooperateDis')
    } else {
      setNowChecked(item);
      // setImgType('cooperateDis')
    }
  };

  // 回退
  const goBack = () => {
    console.log('点击了goBack');
    try {
      navigation.goBack()
    } catch (e) {
      console.log('goBack err', e);
    }
  }
  // 向前
  const goAhead = () => {
    console.log('点击了goAhead');
  }

  const openCoop = () => {
    console.log('打开弹窗');
    coopRef.current.open(project,nowChecked,navigation,route)

    // 打开弹窗后重置表格选中状态、图标状态
    setNowChecked(null);
    // setImgType('cooperateDis')
    // if(nowChecked){
    //   console.log('选择的桥梁数据',nowChecked);
    //   coopRef.current.open(project,nowChecked)

    //   // 打开弹窗后重置表格选中状态、图标状态
    //   setNowChecked(null);
    //   setImgType('cooperateDis')
    // } else {
    //   console.log('未选择桥梁');
    // }
    
  }

  return (
    // 公共box
    <CommonView
      //顶部导航 
      headerItems={headerItems}
      // 桥梁名称列表
      bridgeList={bridgeList}
      navigation={navigation}
      projectList={route.params.list}
      list={list}
      // 顶部导航左侧的标签
      pid="P1101"
      // 新增
      onAdd={() => bridgeRef.current.open()}
      // 编辑；当选中时，编辑按钮可用；点击编辑传入当前选中项的数据
      onEdit={nowChecked && (() => bridgeRef.current.open(nowChecked))}
      // 删除
      onDelete={nowChecked && handleDelete}
      onBack={goBack}
      // onAhead={goAhead}
      // 右侧按钮
      operations={[
        // 导入桥梁 按钮
        {
          // name: 'table-arrow-left',
          img:'induct',
          onPress: () => inductsRef.current.open(project),
        },
        // 克隆桥梁按钮
        {
          // name: 'content-duplicate',
          img:'clone',
          onPress: () => cloneRef.current.open(project),
        },
        // 占位空按钮
        {},
        {},
        // 协同检测按钮
        {
          img:imgType,
          onPress: () => openCoop(),
        },
      ]}>
        <View style={
        screenWidth > 830 ? [styles.tableCard,{backgroundColor:'rgba(255,255,255,1)',right:27,width:715,top:1,borderRadius:5}] 
        :
        [styles.tableCard,{backgroundColor:'rgba(255,255,255,1)',right:19,width:715,top:1,borderRadius:5}]
      }>
          {/* 检索 */}
          <View style={[styles.searchCard]}>
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
              source={require('../../../iconImg/search.png')} style={[{width:40, height:40}]}
            >
              {/* <Pressable OnPressIn={handleSearch}></Pressable> */}
              <Text onPress={handleSearch}>{'         '}</Text>
            </ImageBackground>
          </View>
          <View style={tailwind.mY1} />
          {/* 表格 */}
          <View style={[styles.tableCard,{backgroundColor:'rgba(255,255,255,1)',padding:10}]}>
            <Table.Box
              loading={loading}
              numberOfPages={pageTotal}
              total={total}
              pageNo={page?.pageNo || 0}
              showPageJump={true}
              onPageChange={e =>
                setPage({
                  pageSize: 10,
                  pageNo: e,
                })
              }
              header={
                <Table.Header>
                  <Table.Title title="序号" flex={1} />
                  <Table.Title title="桩号" flex={2} />
                  <Table.Title title="桥梁名称" flex={3} />
                  <Table.Title title="桥幅" />
                  {/* <Table.Title title="病害构件" />
                  <Table.Title title="媒体文件" /> */}
                  <Table.Title title="检测日期" flex={2} />
                  <Table.Title title="存储" />
                  <Table.Title title="选择" flex={1} />
                </Table.Header>
              }>
              <FlatList
                data={list}
                extraData={list}
                renderItem={({item, index}) => (
                  <Table.Row key={index}>
                    <Table.Cell flex={1}>{index + page.pageNo*10 +1}</Table.Cell>
                    <Table.Cell flex={2} notText={true}>
                      {/* 跳转到桥梁检测 */}
                      <TouchableOpacity
                        // style={[styles.linkBox]}
                        onPress={() =>
                          navigation.navigate('Collection/Detect/BridgeTest', {
                            project: project,
                            bridge: item,
                            list: route.params.list
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
                    {/* <Table.Cell>{item.member}</Table.Cell>
                    <Table.Cell>{item.file}</Table.Cell> */}
                    <Table.Cell flex={2}>
                      {(item.date || '').split(' ')[0] || '未检测'}
                    </Table.Cell>
                    <Table.Cell>
                      {item.datasources === 0 ? '本地' : '云端'}
                    </Table.Cell>
                    <Table.Cell flex={1}>
                      <Checkbox
                        checked={(nowChecked || {}) === item}
                        onPress={() => handleCheck(item)}
                      />
                    </Table.Cell>
                  </Table.Row>
                )}
              />
            </Table.Box>
          </View>
        </View>
       
      {/* 克隆桥梁 模态框 */}
      <Clone ref={cloneRef} onSubmitOver={handleSubmitOver} />
      {/* 导入桥梁 模态框 */}
      <Inducts ref={inductsRef} onSubmitOver={handleSubmitOver} />
      {/* 桥梁表单 */}
      <BridgeForm
        ref={bridgeRef}
        project={project}
        onSubmitOver={handleSubmitOver}
      />
      
      {/* 协同检测 模态框 */}
      <Cooperate ref={coopRef} onSubmitOver={handleSubmitOver} />
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
