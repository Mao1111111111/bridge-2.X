// 项目管理
import React,{useState,useEffect} from 'react';
import Form from '../components/ProjectForm';
import {tailwind} from 'react-native-tailwindcss';
import {View, StyleSheet, FlatList, Text,Image,TouchableOpacity, Pressable, ImageBackground,Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Table from '../../../components/Table';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import {TextInput} from '../../../components/Input';
import Checkbox from '../../../components/Checkbox';
import CommonView from '../../../components/CommonView';
import {Context as GlobalContext} from '../../../providers/GlobalProvider';
import {Context as ThemeContext} from '../../../providers/ThemeProvider';
import * as bridgeProjectBind from '../../../database/bridge_project_bind';
import * as project from '../../../database/project';
import {alert, confirm} from '../../../utils/alert';
import {BoxShadow} from 'react-native-shadow'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Project({navigation}) {
  
  // 全局参数 -- 养护区列表、路线列表、用户信息
  const {
    state: {areaList, routeList, userInfo},
    dispatch,
  } = React.useContext(GlobalContext);
  // 全局主题样式
  const {
    state: {theme},
  } = React.useContext(ThemeContext);
  // 查询参数
  const [search, setSearch] = React.useState({});
  // 项目数据列表
  const [list, setList] = React.useState([]);
  // 表格的loading
  const [loading, setLoading] = React.useState(false);
  // 选中项的数据
  const [nowChecked, setNowChecked] = React.useState(null);
  // 当前页
  const [page, setPage] = React.useState();
  // 共几条
  const [total, setTotal] = React.useState(0);
  // 共几页
  const [pageTotal, setPageTotal] = React.useState(0);
  // 当前选中的养护区
  const [areacode, setAreacode] = React.useState('');
  // 养护区列表
  const [area, setArea] = React.useState([]);
  // 路线列表
  const [route, setRoute] = React.useState([]);
  // 新增修改模态框的引用
  const formRef = React.useRef();
  // 检索组件的引用
  const searchRef = React.useRef([]);

  // 顶部导航
  const headerItems = [
    // 采集平台点击，打开抽屉导航
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
    {
      name: '  项目管理',
    },
  ];

  useFocusEffect(
    React.useCallback(() => {
      // ---当屏幕聚焦时执行
      setSearch({});
      searchRef.current.forEach(item => item.clear());
      setPage({
        pageSize: 10,
        pageNo: 0,
      });
    }, []),
  );


  const [deleteImg, setDeleteImg] = useState() // 删除 - 允许点击
  const [deleteDisImg, setdeleteDisImg] = useState() // 删除 - 禁用

  const [screenWidth,setScreenWidth] = useState(0) //屏幕宽度
  const [screenHeight,setScreenHeight] = useState(0) //屏幕高度

  useEffect(() => {
    // console.log('223344');
    // 设置按钮的初始状态
    let deleteImg = require('../../../../src/iconImg/delete.png')
    setDeleteImg(deleteImg)
    let deleteDisImg = require('../../../../src/iconImg/deleteDis.png')
    setdeleteDisImg(deleteDisImg)
    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
    const windowHeight = Dimensions.get('window').height;
    setScreenHeight(windowHeight)
  }, [])

  React.useEffect(() => {
    if (areaList) {
      setArea([{name: '请选择路段', code: ''}, ...areaList]);
      if (routeList && areacode) {
        setRoute([
          {name: '请选择路线', code: ''},
          ...routeList?.filter(item => item.pcode === areacode.code),
        ]);
      } else {
        setRoute([{name: '无', code: ''}]);
      }
    }
  }, [areaList, routeList, areacode]);

  // 项目名称列表
  const [proNameList, setProNameList] = useState()

  // 当 检索条件、页码、用户信息变化时，触发
  React.useEffect(() => {
    // 如果页码为0 或 没有用户信息 那么返回
    if (!page || !userInfo) {
      return;
    }
    // 设置表格loading
    setLoading(true);
    setList([])

    let proNameList = []

    // 在数据库中查询
    project
      .search({
        param: {
          ...search,
          userid: userInfo.userid,
          status: 0,
        },
        page,
      })
      .then(res => {
        res.list.sort(function(a, b) {
          return new Date(b.c_date) - new Date(a.c_date);
        })
        // 设置数据列表
        setList(res.list);
        // console.log('项目列表的数据',list);
        // 设置共几页
        setPageTotal(res.page.pageTotal);
        // 设置共几条
        setTotal(res.page.total);
        // console.log('project res', res.list);
        // console.log('project res', res.list[0].projectname);
        res.list.forEach((item)=>{
          // console.log('item');
          proNameList.push({
            proName:item.projectname,
            proNum:item.projectno
          })
        })
        // console.log(proNameList);
        setProNameList(proNameList)
        // console.log('proNameList',proNameList);
        setProStorage(proNameList)
      })
      .finally(() => setLoading(false));
  }, [search, page, userInfo]);



  // 点击检索
  const handleSearch = () => {
    // 存储检索数据
    const values = {};
    searchRef.current.forEach(item => {
      values[item.name] = item.value;
      // 如果是输入框，那么有blur失焦函数，执行失焦函数
      if (item.blur) {
        item.blur();
      }
    });
    // 将输入存入，从而触发 useEffect
    setSearch(values);
    // 设置当前页
    setPage({
      pageSize: 10,
      pageNo: 0,
    });
  };
  // 删除
  const handleDelete = async () => {
    // 查询当前项目下是否有检测桥梁
    const res = await bridgeProjectBind.listByProject(nowChecked.projectid);
    // 如果有，则不可以删除
    if (res.length) {
      alert('该项目含有检测桥梁，不可删除');
      return;
    }
    // 确认框
    confirm('是否删除选中的数据？', async () => {
      // 设置表格loading
      setLoading(true);
      try {
        // 在项目表中删除
        await project.remove(nowChecked.id);
        // 在项目桥梁绑定表中删除
        await bridgeProjectBind.remove({
          projectid: nowChecked.projectid,
        });
        // 重置查询
        setSearch({});
        // 重置当前页
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
        // 完成后,解除loading
        setLoading(false);
      }
    });
  };
  // 项目状态改变
  const handleStatusChange = () => {
    confirm(
      `将项目状态变更“完成”后，请通过数
据记录中的项目记录查看。
项目变更完成，代表项目中的桥梁数据采集完成。`,
      async () => {
        try {
          // 设置表格loading
          setLoading(true);
          // 设置项目检测完成
          await project.switchStatus({
            status: 1,
            id: nowChecked.id,
          });
          // 重置检索
          setSearch({});
          // 重置当前页
          setPage({
            pageSize: 10,
            pageNo: 0,
          });
          // 重置选中
          setNowChecked(null);
          alert('操作成功');
        } catch (err) {
          console.error(err);
          alert('操作失败');
        } finally {
          // 解除表格loading
          setLoading(false);
        }
      },
    );
  };

  // 新增或修改 结束后 执行的函数
  const handleSubmitOver = (newProName, newProNum) => {
    console.log('newProName',newProName,newProNum);
    setSearch({});
    searchRef.current.forEach(item => item.clear());
    setPage({
      pageSize: 10,
      pageNo: 0,
    });
    setNowChecked(null);
    let newProvalue = [
      {
        proName:newProName,
        proNum:newProNum
      }
    ]
    // console.log('确认添加项目');
    setProStorage(newProvalue)
  };

  const setProStorage = async(value) => {
    // 存储项目名称数据
    // console.log('存储项目数据 全局', value);
    try {
      const name = 'proList'
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(name, jsonValue)
    } catch (error) {
      console.log('存入项目数据失败!', error);
    }
  }

  // 点击选择框时
  const handleCheck = item => {
    // item 里是选中的这条数据的所有信息
    if (!nowChecked) {
      // 如果当前没有选中，那么设置选中
      setNowChecked(item);
      return;
    } else if (nowChecked.id === item.id) {
      // 如果点击已经选中的项，那么取消选中
      setNowChecked(null);
    } else {
      // 如果选中了一项后，又选中了另一项，那么设置选中的另一项
      setNowChecked(item);
    }
  };

  // 回退
  const goBack = () => {
    console.log('点击了goBack');
    try {
      () => navigation.goBack()
    } catch (e) {
      console.log('goBack err', e);
    }
  }
  // 向前
  const goAhead = () => {
    console.log('点击了goAhead');
  }

  return (
    <CommonView
      //顶部导航最左侧标签 
      pid="P1001"
      //导航项
      headerItems={headerItems}
      // 项目名称列表
      proNameList={proNameList}
      navigation={navigation}
      projectList={list}
      list={list}
      //---左侧按钮----
      // 新增
      onAdd={() => formRef.current.open()}
      // 编辑 -- nowChecked 是选中项的数据
      onEdit={nowChecked && (() => formRef.current.open(nowChecked))}
      // 删除 -- nowChecked 是选中项的数据
      onDelete={nowChecked && handleDelete}
      // onBack={goBack}
      // onAhead={goAhead}
      // 右侧按钮
      // operations={[
      //   {
      //     // name: 'check', //此处name属性用于原代码里CircleButton用于标识icon
      //     img:'check',
      //     disabled: !nowChecked,
      //     onPress: handleStatusChange,
      //   },
      // ]}
      >
      <ImageBackground source={require('../../../iconImg/mainBg.png')}
      style={{width:screenWidth*0.82,height:screenWidth*0.82*0.549,padding:'3%',
      display:'flex',justifyContent:'center',alignItems:'center',position:'relative',}}>
         {/* 检索 */}
        <View style={[
          styles.searchCard,{flexDirection:'row',justifyContent:'space-around',width:screenWidth*0.758}
        ]}>
          <ImageBackground source={require('../../../iconImg/proSearch.png')}
          style={{width:screenWidth*0.253,height:screenWidth*0.253*0.1384}}>
            <TextInput
              name="projectname"
              // label="项目名称:"
              ref={el => (searchRef.current[0] = el)}
              style={[tailwind.mR4, tailwind.flex1,]}
              inputStyle={{borderWidth:0,}}
              placeholder={'请输入项目名称'}
            />
          </ImageBackground>
          <ImageBackground source={require('../../../iconImg/roadSearch.png')}
          style={{width:screenWidth*0.211,height:screenWidth*0.211*0.167}}>
            <Select
              name="areacode"
              // label="路段:"
              style={[tailwind.mR4, tailwind.flex1,]}
              labelName="name"
              valueName="code"
              value={areacode.code}
              onChange={setAreacode}
              ref={el => (searchRef.current[1] = el)}
              values={area}
              inputStyle={{borderWidth:0,}}
            />
          </ImageBackground>
          
          {routeList && (
            <ImageBackground source={require('../../../iconImg/roadSearch.png')}
            style={{width:screenWidth*0.211,height:screenWidth*0.211*0.167}}>
              <Select
                name="routecode"
                // label="路线:"
                style={[tailwind.mR4, tailwind.flex1]}
                labelName="name"
                valueName="code"
                ref={el => (searchRef.current[2] = el)}
                values={route}
                inputStyle={{borderWidth:0,}}
              />
            </ImageBackground>
            
          )}
          {/* 检索按钮 */}
          <ImageBackground
            source={require('../../../iconImg/searchConfirm.png')}
            style={[{width:screenWidth*0.0625, height:screenWidth*0.0625*0.5625,
            display:'flex',justifyContent:'center',alignItems:'center'}]}
          >
            {/* <Pressable OnPressIn={handleSearch}></Pressable> */}
            <Text onPress={handleSearch} style={{color:'#8e8e8e'}}>{'检索'}</Text>
          </ImageBackground>
          {/* <Button
            onPress={handleSearch}
            style={[{backgroundColor: '#2b427d'}]}
          >
            检索1
          </Button> */}
        </View>
        <View style={tailwind.mY1} />
        {/* 项目信息表格 */}
        <ImageBackground source={require('../../../iconImg/tableBg.png')}
          style={{width:screenWidth*0.758,height:screenWidth*0.758*0.4478,padding:'0.5%'}}>
          <Table.Box
            loading={loading}
            style={tailwind.roundedSm}
            // 共几页
            numberOfPages={pageTotal}
            // 共几条
            total={total}
            // 当前页
            pageNo={page?.pageNo || 0}
            // 当页码改变时
            onPageChange={e =>
              setPage({
                pageSize: 10,
                pageNo: e,
              })
            }
            header={
              <Table.Header>
                <Table.Title title="序号" flex={0.7} />
                <Table.Title title="项目名称" flex={3} />
                <Table.Title title="已采集" flex={0.7} />
                <Table.Title title="创建人" flex={1} />
                <Table.Title title="创建时间" flex={2} />
                <Table.Title title="最后操作时间" flex={2} />
                <Table.Title title="选择" flex={1} />
              </Table.Header>
            }>
            <FlatList
              data={list}
              extraData={list}
              renderItem={({item, index}) => (
                <Table.Row
                  key={index}
                  onPress={() =>
                    navigation.navigate('Collection/Detect/ProjectDetail', {
                      project: item,
                      list
                    })
                  }>
                  <Table.Cell flex={0.7}>{index+1}</Table.Cell>
                  <Table.Cell flex={3}>{item.projectname}</Table.Cell>
                  <Table.Cell flex={0.7}>{item.yicaiji || 0}</Table.Cell>
                  <Table.Cell flex={1}>{item.username}</Table.Cell>
                  <Table.Cell flex={2}>{item.c_date}</Table.Cell>
                  <Table.Cell flex={2}>{item.u_date}</Table.Cell>
                  <Table.Cell flex={1}>
                    {/* 核选框 */}
                    <Checkbox
                      checked={(nowChecked || {}).id === item.id}
                      onPress={() => handleCheck(item)}
                    />
                  </Table.Cell>
                </Table.Row>
              )}
            />
          </Table.Box>
        </ImageBackground>
      </ImageBackground>
       
      {/* 项目的 新增、修改表单 */}
      <Form ref={formRef} onSubmitOver={handleSubmitOver} />
    </CommonView>
  );
}

const styles = StyleSheet.create({
  card: {
    ...tailwind.shadow2xl,
    ...tailwind.roundedSm,
  },
  searchCard: {
    // ...tailwind.shadow2xl,
    // ...tailwind.roundedSm,
    // ...tailwind.flexRow,
    // ...tailwind.p2,
    // ...tailwind.pX3,
  },
  tableCard: {
    ...tailwind.shadow2xl,
    ...tailwind.roundedSm,
    ...tailwind.flex1,
  },
  modalFoot: {
    ...tailwind.mB4,
    ...tailwind.mX6,
    ...tailwind.flexRow,
    ...tailwind.justifyBetween,
  },
});
