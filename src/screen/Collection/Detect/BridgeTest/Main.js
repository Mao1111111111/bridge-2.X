import React, { useEffect, useState } from 'react';
import {ProgressBar, Portal, Modal as PaperModal} from 'react-native-paper';
import {tailwind} from 'react-native-tailwindcss';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, Image, FlatList, StyleSheet,Dimensions, TouchableOpacity,Pressable,ImageBackground} from 'react-native';
import {Context} from './Provider';
import {Context as ThemeContext} from '../../../../providers/ThemeProvider';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';
import Tabs from '../../../../components/Tabs';
import Table from '../../../../components/Table';
import Checkbox from '../../../../components/Checkbox';
import {Box, Content} from '../../../../components/CommonView';
import {TextInput, KeyboardInput, WriteInput, Textarea} from '../../../../components/Input';
import {
  getDiseaseDataTotal,
  getMainTotal,
} from '../../../../database/parts_checkstatus_data';
import {listToPage} from '../../../../utils/common';
import Button from '../../../../components/Button';
import HeaderTabs from './HeaderTabs';
import MemberEdit from './MemberEdit';
import Media from './Media';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Divider} from 'react-native-paper';
import Modal from '../../../../components/Modal';

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

      getTableData()
      setFuncShow(1)
      
      // project 是当前项目信息
      // bridge 选择打开的桥梁信息
      console.log('bridge',bridge);
      setBridgeInfo(bridge)
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
      pid="P1303"
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
          <Text style={{color:funcShow == 1 ? '#fff' : '#808285'}}>任务详情</Text>
        </Pressable>
        <Pressable style={{width:'15%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',
        backgroundColor:funcShow == 2 ? '#2b427d' : '#2b427d00'}}
        onPress={()=>changeFunc(2)}>
          <Text style={{color:funcShow == 2 ? '#fff' : '#808285'}}>使用帮助</Text>
        </Pressable>
      </View>
        <View style={[tailwind.flex1,{}]}>
          {
            funcShow == 1 ? 
            <View style={{width:'100%',height:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <View style={{width:'50%',height:'100%',alignItems:'center',paddingTop:20,paddingLeft:20}}>
                  {/* 参与者信息表格 */}
                  <View style={{width:'100%',height:'90%',padding:10}}>
                    <Table.Box
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
                </View>
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
        <View></View>
        {/* <Button style={[{backgroundColor: '#808285'}]} onPress={() => close()}>
          取消
        </Button> */}
        {/* 确认 */}
        <Button style={[{backgroundColor: '#2b427d'}]} onPress={()=>close()}>确认</Button>
      </View>
    </Modal>
  );
});

export default function Main({navigation, route}) {
  // 全局样式
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  // 桥梁检测的全局参数
  const {
    state: {
      // 项目信息 -- 从前面的项目表中传过来的
      project,
      // 检测桥梁的部件列表
      memberList,
      // 检测id
      bridgereportid,
      // 检测桥梁的跨列表
      kuaList,
      // 当前桥梁检测 的 媒体文件
      fileList,
      // 检测构件列表
      partsList,
      // 桥梁信息 -- 从前面的桥梁表中传过来的
      bridge,
    },
    dispatch,
  } = React.useContext(Context);

  // 全局参数 -- 桥幅属性
  const {
    state: {bridgeside},
  } = React.useContext(GlobalContext);

  // 当前tab
  const [pageType, setPageType] = React.useState('数据');

  // 选中的数据 单选
  const [nowEdit, setNowEdit] = React.useState(null);

  // 病害记录条数
  const [diseaseDataTotal, setDiseaseDataTotal] = React.useState(0);

  // 标记的图片数量
  const [mianTotal, setMianTotal] = React.useState(0);

  // 部件表格数据
  const [table1Data, setTable1Data] = React.useState([]);

  // 部件表格当前页
  const [table1PageNo, setTable1PageNo] = React.useState(1);

  // 桥跨表格的数据
  const [table2Data, setTable2Data] = React.useState([]);

  // 桥跨表格当前页
  const [table2PageNo, setTable2PageNo] = React.useState(1);

  // 部件编辑组件的引用
  const memberEditRef = React.useRef();

  // 协同检测 模态框的 引用
  const coopRef = React.useRef();

  // 表格每页条数
  const pageRow = 8;

  // 当页面改变时,清空当前选中
  React.useEffect(() => setNowEdit(null), [pageType]);

  const [screenWidth,setScreenWidth] = React.useState() //屏幕宽度

  // 当部件列表变化时 重新设置部件表格的数据
  React.useEffect(() => {
    const windowWidth = Dimensions.get('window').width;
    // console.log('当前屏幕宽度',windowWidth);
    setScreenWidth(windowWidth)
    if(memberList.length>0){
      setTable1Data(listToPage(memberList, pageRow));
    }else{
      setTable1Data([])
    }
    if (bridgereportid) {
      // 获取检测桥梁的 病害条数
      getDiseaseDataTotal(bridgereportid).then(res =>
        setDiseaseDataTotal(res.count),
      );
      // 获取检测桥梁的 标记条数
      getMainTotal(bridgereportid).then(res => setMianTotal(res.count));
    }
      memberList.forEach((item) => {
        if (item.title == '伸缩缝装置') {
          item.title = '伸缩装置'
        }
      })
    
  }, [memberList]);

  // 当跨列表数据变化时, 重新设置跨表格的数据
  React.useEffect(() => {
    console.log('p1301 route',route);
    kuaList.length && setTable2Data(listToPage(kuaList, pageRow));
    console.log('table2Data',table2Data.length);
  }, [kuaList]);

  // 页面聚焦时
  useFocusEffect(
    React.useCallback(() => {
      if (bridgereportid) {
        // 获取检测桥梁的 病害条数
        getDiseaseDataTotal(bridgereportid).then(res =>
          setDiseaseDataTotal(res.count),
        );
        // 获取检测桥梁的 标记条数
        getMainTotal(bridgereportid).then(res => setMianTotal(res.count));
      }
    }, [bridgereportid]),
  );

  // 显示右侧图片的组件
  const getImg = (category, text) => {
    const style = [
      styles.img,
      tailwind.justifyCenter,
      tailwind.itemsCenter,
      tailwind.bgGray200,
    ];

    // 显示组件
    const getComponent = data => {
      return data.mediatype === 'virtualimage' ? (
        // 虚拟图片
        <View style={[style, tailwind.bgGray200]}>
          <Text
            style={[
              theme.primaryTextStyle,
              tailwind.text4xl,
              tailwind.fontBold,
            ]}>
            {data.filename}
          </Text>
        </View>
      ) : (
        // tip
        <Image
          style={styles.img}
          source={{
            uri: `file:// ${_img?.is_source ? data.filepath : data.copypath}`,
          }}
        />
      );
    };
    // 获取数据-- 符合条件的所有图片 -- 桥梁检测文件列表过滤
    const datas = fileList.filter(
      // 如果是传入类型的图片，并且是图片或虚拟图片，那么存入数据
      item =>
        item.category.substring(0,1) === category &&
        new Set(['image', 'virtualimage']).has(item.mediatype),
    );
    // 显示的图片数据--一张
    let _img = {};
    if (datas.length) {
      const preference = datas.find(({is_preference}) => !!is_preference);
      _img = preference || datas[0];
    }
    return (
      <>
        {/* 图片 */}
        {datas.length ? (
          // 有数据，那么显示图片
          getComponent(_img)
        ) : (
          // 没有数据
          <View style={[style]}>
            {category === 'remark' ? (
              <Icon name="file-document-edit-outline" size={40} />
            ) : (
              <Icon name="folder-multiple-image" size={40} />
            )}
          </View>
        )}
        {/* 图片下面的文字 */}
        <Text style={tailwind.textCenter}>
          {text}[{datas.length}]
        </Text>
      </>
    );
  };

  // 获取 顶部导航项
  const getHeaderItems = () => {
    // console.log('project',bridge.bridgename);
    // 没有项目名时，返回 []
    if (!project.projectname) {
      return [];
    }
    // 桥幅属性名
    let paramname = '';
    if (bridgeside && bridge) {
      paramname =
        bridgeside.find(item => bridge.bridgeside === item.paramid)
          ?.paramname || '';
    }
    return [
      // {
      //   // name: 'home',
      //   isIcon: true,
      //   onPress: () => navigation.navigate('Collection/Detect/Project'),
      // },
      {
        // 项目名称 -- 点击返回项目下的，桥梁列表
        name: `${project.projectname}`,
        onPress: () =>
          navigation.navigate('Collection/Detect/ProjectDetail', {project}),
      },
      {
        // 桥梁桩号 - 桥梁名称 - 桥幅属性
        name: `${bridge.bridgestation}-${bridge.bridgename}-${paramname}`,
      },
      {
        project
      }
    ];
  };

  // 点击列表，将选中的数据存入
  const handleCheck = (val, key) => {
    if (nowEdit && val[key] === nowEdit[key]) {
      setNowEdit(null);
    } else {
      setNowEdit(val);
    }
  };

  // 进入构件管理
  const handleMember = () => {
    if (!nowEdit) {
      return;
    }
    console.log('handleMember nowEdit',nowEdit);
    navigation.navigate('Collection/Detect/BridgeTest/Member', {
      data: nowEdit,
      list: [],
    });
  };

  // 进入病害成因 或 养护区
  const handlePlanOrGenesis = path => {
    const key = nowEdit.type === 'member' ? 'membertype' : 'stepno';
    const list = partsList.filter(
      item => item.memberstatus === '200' && item[key] === nowEdit[key],
    );
    navigation.navigate(`Collection/Detect/BridgeTest/Member/${path}`, {
      data: nowEdit,
      list,
    });
  };

  // 获取列表文件总大小
  const getMB = list => {
    if (list.length) {
      return (
        list.map(({filesize}) => filesize || 0).reduce((a, b) => a + b) /
        1024 /
        1024
      ).toFixed(2);
    } else {
      return 0;
    }
  };

  // 打开编辑部件模态框
  const handleEdit = () => {
    memberEditRef.current.open();
  };

  // 关闭 编辑部件模态框
  const handleEditClose = () => {
    // 触发刷新
    dispatch({type: 'reflush', payload: Math.random().toString(36).slice(-8)});
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

  React.useEffect(() => {
    console.log('main bridge',bridge);
    // 桥梁id bridge.bridgeid
  },[])

  const [infoWrite, setInfoWrite] = React.useState(false)
  const bridgeInfo = () => {
    setInfoWrite(true)
    console.log('按下了桥梁备注按钮',infoWrite)
    let name = bridge.bridgeid + '_' + 'bridgeInfoText'
    getBridgeInfoStorage(name)
  }
  const closeBridgeInfoWindow = () => {
    setInfoWrite(false)
  }

  const [bridgeInfoWriteText, setBridgeInfoWriteText] = React.useState('')

  const bridgeInfoWrite = (e) => {
    setBridgeInfoWriteText(e.value)
    // console.log('桥梁备注输入内容',bridgeInfoWriteText);
  }
  const confirmText = () => {
    console.log('确认并提交桥梁备注', bridgeInfoWriteText);
    setBridgeInfoStorage('bridgeInfoText', bridgeInfoWriteText)
  }

  // 存入桥梁备注数据
  const setBridgeInfoStorage = async(name, value) => {
    console.log('存入桥梁备注数据的函数~~', name, value);
    const REname = bridge.bridgeid + '_' + name
    try {
      await AsyncStorage.setItem(REname, value)
      console.log('存入成功');
    } catch (err) {
      console.log('存入数据失败!', err);
    }
  }
  // 读取桥梁备注数据
  const getBridgeInfoStorage = async(name) => {
    console.log('读取桥梁备注数据~',name);
    try {
      const value = await AsyncStorage.getItem(name)
      console.log('读取的value~~~',value);
      setBridgeInfoWriteText(value)
    } catch (error) {
      console.log('读取桥梁备注数据失败main', error);
    }
  }

  // 协同检测按钮 不同状态对应的图标
  const [imgType,setImgType] = useState('cooperate')
  // 是否存在正在进行的协同任务
  const [isCoop,setIsCoop] = useState(false)
  useEffect(()=>{
    // 判断当前进入的桥梁页面，是否存在正在进行的协同任务
    setIsCoop(true)

    
    if(isCoop == true){
      setImgType('cooperate')
    } else if (isCoop == false){
      setImgType('cooperateDis')
    }

    
  },[imgType])

  const openCoop = () => {
    console.log('打开协同检测弹窗');
    coopRef.current.open(navigation,route)

    // 打开弹窗后重置表格选中状态、图标状态
    // setNowChecked(null);
  }

  return (
    // 外部盒子 = 样式 + 顶部导航 + 导航左侧标签
    <Box headerItems={getHeaderItems()} pid="P1301" navigation={navigation} route={route} projectList={project} project={project.projectname} bridge={bridge}>
      {/* 年份tab + 数据/影音tab，onChangeTab 为点击数据/影音tab时 */}
      <HeaderTabs onChangeTab={setPageType} />
      {pageType !== '数据' ? (
        //---------影音---------
        <Media
          navigation={navigation}
          type="bridge"
          dataid={bridge.bridgeid}
          categoryList={[
            {
              value: 'L0101',
              label: '桥梁左侧起点立面照',
            },
            {
              value: 'L0102',
              label: '桥梁右侧起点立面照',
            },
            {
              value: 'L0201',
              label: '桥梁左侧终点立面照',
            },
            {
              value: 'L0202',
              label: '桥梁右侧终点立面照',
            },
            {
              value: 'Z01',
              label: '桥梁起点正面照',
            },
            {
              value: 'Z02',
              label: '桥梁终点正面照',
            },
            {
              value: 'remake',
              label: '工作照',
            },
          ]}
        />
      ) : (
        //---------数据---------
        <Content
        onBack={goBack}
        onAhead={nowEdit && handleMember}
        //右侧按钮 
        operations={[
          {
            // 进入构件管理
            // name: 'eye',
            img:'look',
            onPress: handleMember,
            disabled: !nowEdit,
          },
          {
            // 进入构件管理
            // name: 'eye',
            img:'bridgeInfo',
            onPress: () => bridgeInfo(),
          },
          // {
          //   // 病害成因
          //   // name: 'stethoscope',
          //   img:'disList',
          //   onPress: () => handlePlanOrGenesis('GenesisEdit'),
          //   disabled: !nowEdit,
          // },
          {
            // 协同检测按钮
            // name: 'book-plus',
            img: imgType,
            onPress: () => openCoop(),
            disabled: !isCoop,
          },
        ]}>
          {/* <View style={[tailwind.flexRow, tailwind.flex1,{backgroundColor:'rgba(255,255,255,1)',right:11.5,width:715,top:1,borderRadius:5}]}>
            </View> */}
          <View style={
            screenWidth > 830 ? [tailwind.flexRow, tailwind.flex1,{backgroundColor:'rgba(255,255,255,1)',right:27,width:715,top:1,borderRadius:5}] 
            :
            [tailwind.flexRow, tailwind.flex1,{backgroundColor:'rgba(255,255,255,1)',right:19,width:715,top:1,borderRadius:5}]
          }>
            {/* 左侧 */}
            <View style={[styles.card, theme.primaryBgStyle]}>
              {/* tab */}
              <Tabs
                style={[tailwind.flex1]}
                defaultActive="部件"
                // 切换时，清空选中
                onChangeTab={() => setNowEdit(null)}
                tabs={[
                  // 部件
                  {
                    key: '部件',
                    name: '部件',
                    component: (
                      <>
                        {/* 部件 表格 */}
                        <View style={styles.tableBox}>
                          <Table.Header>
                            <Table.Title title="选择" flex={1} />
                            <Table.Title title="部件" flex={2} />
                            <Table.Title title="检测进度" flex={3} />
                            <Table.Title title="数量" flex={2} />
                            <Table.Title title="编辑时间" flex={3} />
                          </Table.Header>
                          <FlatList
                            scrollEnabled={true}
                            data={table1Data[table1PageNo - 1] || []}
                            extraData={table1Data}
                            renderItem={({item, index}) => (
                              <Table.Row
                                key={index}
                                onPress={() => handleCheck(item, 'membertype')}>
                                <Table.Cell flex={1}>
                                  <Checkbox
                                    onPress={() =>
                                      handleCheck(item, 'membertype')
                                    }
                                    checked={
                                      nowEdit?.membertype === item.membertype
                                    }
                                  />
                                </Table.Cell>
                                <Table.Cell flex={2}>{item.title}</Table.Cell>
                                <Table.Cell notText={true} flex={3}>
                                  <View style={[tailwind.flex1, tailwind.pX2]}>
                                    <ProgressBar
                                      //进度为 done/total 
                                      progress={item.done / item.total}
                                      style={[tailwind.rounded, tailwind.h2]}
                                      color={theme.primaryColor}
                                    />
                                  </View>
                                </Table.Cell>
                                <Table.Cell flex={2}>
                                  {item.done}/{item.total}
                                </Table.Cell>
                                <Table.Cell flex={3}>
                                  {item.lastEditDate}
                                </Table.Cell>
                              </Table.Row>
                            )}
                          />
                        </View>
                        {/* 操作按钮 */}
                        <View
                          style={[tailwind.flexRow, tailwind.justifyBetween]}>
                          <Table.Pagination
                            pageNo={table1PageNo}
                            onPageChange={setTable1PageNo}
                            numberOfPages={table1Data.length}
                          />
                          <Button onPress={handleEdit} style={[{backgroundColor:'#2b427d'}]}>编辑部件</Button>
                        </View>
                      </>
                    ),
                  },
                  // 桥跨
                  {
                    key: '桥跨',
                    name: '桥跨',
                    component: (
                      <>
                        <View style={styles.tableBox}>
                          <Table.Header>
                            <Table.Title title="选择" flex={1} />
                            <Table.Title title="跨编号" flex={2} />
                            <Table.Title title="检测进度" flex={3} />
                            <Table.Title title="数量" flex={2} />
                            <Table.Title title="编辑时间" flex={3} />
                          </Table.Header>
                          <FlatList
                            scrollEnabled={true}
                            data={table2Data[table2PageNo - 1] || []}
                            extraData={table2Data}
                            renderItem={({item, index}) => (
                              <Table.Row
                                key={index}
                                onPress={() => handleCheck(item, 'stepno')}>
                                <Table.Cell flex={1}>
                                  <Checkbox
                                    onPress={() => handleCheck(item, 'stepno')}
                                    checked={nowEdit?.stepno === item.stepno}
                                  />
                                </Table.Cell>
                                <Table.Cell flex={2}>{item.title}</Table.Cell>
                                <Table.Cell notText={true} flex={3}>
                                  <View style={[tailwind.flex1, tailwind.pX2]}>
                                    <ProgressBar
                                      progress={item.done / item.total}
                                      style={[tailwind.rounded, tailwind.h2]}
                                      color={theme.primaryColor}
                                    />
                                  </View>
                                </Table.Cell>
                                <Table.Cell flex={2}>
                                  {item.done}/{item.total}
                                </Table.Cell>
                                <Table.Cell flex={3}>
                                  {item.lastEditDate}
                                </Table.Cell>
                              </Table.Row>
                            )}
                          />
                        </View>
                        <View
                          style={[tailwind.flexRow, tailwind.justifyBetween]}>
                          <Table.Pagination
                            pageNo={table2PageNo} // 页码数字的背景色
                            onPageChange={setTable2PageNo}
                            numberOfPages={table2Data.length}
                          />
                          <Button onPress={handleEdit} style={[{backgroundColor:'#2b427d'}]}>编辑部件</Button>
                        </View>
                      </>
                    ),
                  },
                ]}
              />
            </View>
            <View style={tailwind.mX2} />
            {/* 右侧 */}
            <View style={[styles.card, theme.primaryBgStyle]}>
              {/* 标题 */}
              <Text style={[tailwind.fontBold, {color: '#2b427d'}]}>
                全局描述
              </Text>
              {/* 图片 */}
              <View style={[tailwind.flexRow, tailwind.mY2]}>
                <View style={tailwind.flex1}>{getImg('L', '立面照')}</View>
                <View style={tailwind.mX2} />
                <View style={tailwind.flex1}>{getImg('Z', '正面照')}</View>
              </View>
              {/* 描述表单 */}
              <View style={tailwind.flex1}>
                <View
                  style={[styles.tableRow, tailwind.border, tailwind.borderB0]}>
                  <View style={[styles.flex4]}>
                    <View style={styles.tableRow}>
                      <View style={[tailwind.flex1, styles.tableCol]}>
                        <Text>良好构件</Text>
                      </View>
                      <View style={[tailwind.flex1, styles.tableCol]}>
                        <Text>
                          {
                            partsList.filter(
                              ({memberstatus}) => memberstatus === '100',
                            ).length
                          }
                        </Text>
                      </View>
                      <View style={[tailwind.flex1, styles.tableCol]}>
                        <Text>病害构件</Text>
                      </View>
                      <View style={[tailwind.flex1, tailwind.justifyCenter]}>
                        <Text style={[tailwind.textCenter]}>
                          {
                            partsList.filter(
                              ({memberstatus}) => memberstatus === '200',
                            ).length
                          }
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[tailwind.flex1, styles.tableCol]}>
                        <Text>标注记录</Text>
                      </View>
                      <View style={[tailwind.flex1, styles.tableCol]}>
                        <Text>{mianTotal}</Text>
                      </View>
                      <View style={[tailwind.flex1, styles.tableCol]}>
                        <Text>病害记录</Text>
                      </View>
                      <View style={[tailwind.flex1, tailwind.justifyCenter]}>
                        <Text style={[tailwind.textCenter]}>
                          {diseaseDataTotal}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[tailwind.flex1, styles.tableCol]}>
                        <Text>本机照片</Text>
                      </View>
                      <View style={[tailwind.flex1, styles.tableCol]}>
                        <Text>
                          {
                            fileList.filter(
                              ({mediatype, filesize}) =>
                                mediatype === 'image' && filesize,
                            ).length
                          }
                          /
                          {getMB(
                            fileList.filter(
                              ({mediatype, filesize}) =>
                                mediatype === 'image' && filesize,
                            ),
                          )}
                          MB
                        </Text>
                      </View>
                      <View style={[tailwind.flex1, styles.tableCol]}>
                        <Text>外设照片</Text>
                      </View>
                      <View style={[tailwind.flex1, tailwind.justifyCenter]}>
                        <Text style={[tailwind.textCenter]}>
                          {
                            fileList.filter(
                              ({mediatype}) => mediatype === 'virtualimage',
                            ).length
                          }
                          /0MB
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[tailwind.flex1, styles.tableCol]}>
                        <Text>音频记录</Text>
                      </View>
                      <View style={[tailwind.flex1, styles.tableCol]}>
                        <Text>
                          {
                            fileList.filter(
                              ({mediatype}) => mediatype === 'voice',
                            ).length
                          }
                          /
                          {getMB(
                            fileList.filter(
                              ({mediatype}) => mediatype === 'voice',
                            ),
                          )}
                          MB
                        </Text>
                      </View>
                      <View style={[tailwind.flex1, styles.tableCol]}>
                        <Text>视频记录</Text>
                      </View>
                      <View style={[tailwind.flex1, tailwind.justifyCenter]}>
                        <Text style={[tailwind.textCenter]}>
                          {
                            fileList.filter(
                              ({mediatype}) => mediatype === 'video',
                            ).length
                          }
                          /
                          {getMB(
                            fileList.filter(
                              ({mediatype}) => mediatype === 'video',
                            ),
                          )}
                          MB
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[tailwind.flex1, styles.tableCol]}>
                        <Text>数据总量</Text>
                      </View>
                      <View style={[tailwind.flex1, styles.tableCol]}>
                        <Text>{getMB(fileList)}MB</Text>
                      </View>
                      <View style={[tailwind.flex1, styles.tableCol]}>
                        <Text>存储状态</Text>
                      </View>
                      <View style={[tailwind.flex1, tailwind.justifyCenter]}>
                        <Text style={[tailwind.textCenter]}>本地</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <Table.Pagination style={tailwind.opacity0} />
              </View>
            </View>
          </View>
        </Content>
      )}
      {/* 部件编辑组件 */}
      <MemberEdit ref={memberEditRef} onClose={handleEditClose} />

      {
        infoWrite ?
        <Portal>
          <PaperModal
          visible={infoWrite}
          onDismiss={closeBridgeInfoWindow}
          onClose={closeBridgeInfoWindow}
          contentContainerStyle={[styles.partsAddModalContent]}>
            <View style={[theme.primaryBgStyle, tailwind.flex1, tailwind.rounded]}>
              {/* 顶部 = 标题 + 关闭按钮 */}
              <View style={[styles.partsEditModalHand]}>
                <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
                  <Text
                    style={[tailwind.textBase, tailwind.fontBold, tailwind.mR2]}>
                    桥梁备注
                  </Text>
                </View>
                <TouchableOpacity onPress={closeBridgeInfoWindow}>
                  <Icon name="close" size={24} />
                </TouchableOpacity>
              </View>
              <View
              style={[tailwind.justifyBetween, tailwind.mT1, tailwind.flexRow]}>
                <View style={[tailwind.flex1,{height:300,width:600,padding:10}]}>
                  <View style={[tailwind.mT3,{width:'100%',height:200}]}>
                    <WriteInput
                      name="bridgeInfoText"
                      label=""
                      lines={3}
                      value={bridgeInfoWriteText}
                      onChange={(e) => bridgeInfoWrite(e)}
                      // onChange={handleFormChenge}
                    />
                  </View>
                </View>
                <View style={[styles.partsEditModalFoot,{width:'40%'}]}>
                  <Button style={[{backgroundColor: '#808285',marginRight:20}]} onPress={closeBridgeInfoWindow}>
                    取消
                  </Button>
                  <Button style={[{backgroundColor: '#2b427d'}]} onPress={confirmText}>确定</Button>
                </View>
              </View>
                
            </View>
          </PaperModal>
        </Portal>
        : <></>
      }

      {/* 协同检测 模态框 */}
      <Cooperate ref={coopRef} />
    </Box>
  );
}

const styles = StyleSheet.create({
  flex4: {
    flex: 4,
  },
  tableBox: {
    ...tailwind.flex1,
    ...tailwind.borderGray400,
    ...tailwind.border,
    ...tailwind.mY1,
  },
  tableRow: {
    ...tailwind.flexGrow,
    ...tailwind.flexRow,
    ...tailwind.borderB,
    ...tailwind.borderGray400,
  },
  tableCol: {
    ...tailwind.borderR,
    ...tailwind.borderGray400,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
  },
  center: {
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
  },
  img: {
    width: '100%',
    height: 150,
    ...tailwind.mB1,
  },
  card: {
    ...tailwind.p2,
    ...tailwind.flex1,
    ...tailwind.rounded,
    ...tailwind.shadow2xl,
  },
  partsAddModalContent: {
    ...tailwind.w2_4,
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
    // ...tailwind.borderT,
    ...tailwind.borderGray300,
    position:'absolute',
    bottom:10,
    right:10,
  },
  modalFoote: {
    ...tailwind.mB2,
    ...tailwind.mX4,
    ...tailwind.flexRow,
    ...tailwind.justifyBetween,
  },
});
