/* 
  构件管理
 */
import React,{useState,useEffect,useRef} from 'react';
import dayjs from 'dayjs';
import uuid from 'react-native-uuid';
import {tailwind, colors} from 'react-native-tailwindcss';
import {
  View,
  Text,
  FlatList,
  SectionList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable
} from 'react-native';
import {Context} from './Provider';
import {Context as ThemeContext} from '../../../../providers/ThemeProvider';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';
import {Context as synergyContext} from '../../Detect/SynergyProvider'
import {Box, Content} from '../../../../components/CommonView';
import HeaderTabs from './HeaderTabs';
import LogList from './LogList';
import Media from './Media';
import {useFocusEffect} from '@react-navigation/native';
import * as editLog from '../../../../database/edit_log';
import Button from '../../../../components/Button';
import * as partsCheckstatusData from '../../../../database/parts_checkstatus_data';

const Item = ({title, color,coopData,item, checked, onPress}) => {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);
  useEffect(()=>{
    // console.log('itemitem',item);
    console.log('coopData',coopData);
  },[])

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.itemBtn,
        {borderColor: checked ? theme.primaryColor : colors.transparent},
        theme.primaryBgStyle,
      ]}>
      <View style={[{backgroundColor: color}, tailwind.w2]} />
      <View style={[styles.itemTitle]}>
        <Text>{title}</Text>
        {/* <FlatList
          data={coopData}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View key={index}>
              <Text>{item?.membername}</Text>
            </View>
          )}
        /> */}
      </View>
    </TouchableOpacity>
  );
};

// 左侧构件列表
const BigData = ({title, data, coopData,onChange, onGroupChange}) => {
  // title-部件名称
  //data-部件进来时，data是跨列表;跨进来时，data是部件列表
  // 全局样式
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  // 当前选中的构件列表 
  const [checked, setChecked] = React.useState(new Set());

  // 当前编辑的 部件 或 是跨
  const [nowEdit, setNowEdit] = React.useState({});

  // 初始化数据
  React.useEffect(() => {
    // 初始化当前选中的 组
    if (data.length) {
      setNowEdit(data[0]);
    } else {
      setNowEdit({});
    }
  }, [data]);

  // 设置构件颜色
  const handleColor = ({memberstatus}) => {
    switch (memberstatus) {
      case '0':
        return colors.gray400;
      case '100':
        return colors.green600;
      case '200':
        return colors.red600;
      default:
        return colors.gray400;
    }
  };

  // 点击构件时
  const handleCheck = id => {
    const _checked = new Set(checked);
    if (_checked.has(id)) {
      _checked.delete(id);
    } else {
      _checked.add(id);
    }
    // 设置当前选中的构件列表
    setChecked(_checked);
    // 触发构件变化函数
    handleChange(_checked);
  };

  // 全选
  const handleCheckAll = () => {
    if (checked.size === nowEdit.list.length) {
      // 当已经全选时,设置全不选
      setChecked(new Set());
      // 触发 构件选中变化 的 函数
      handleChange(new Set());
    } else {
      // 选中全部
      setChecked(new Set(nowEdit.list.map(({id}) => id)));
      // 触发 构件选中变化 的 函数
      handleChange(new Set(nowEdit.list.map(({id}) => id)));
    }
  };

  // 取消选择
  const cancelSelect = () => {
    // 当已经全选时,设置全不选
    setChecked(new Set());
    // 触发 构件选中变化 的 函数
    handleChange(new Set());
  }

  // 选中的构件变化时
  const handleChange = _checked => {
    const _data = {};
    // console.log('选中的data',data);
    data
      .map(({list}) => list)
      .flat()
      .forEach(item => (_data[item.id] = _checked.has(item.id)));
    //执行父组件的函数,并将选择的构件数据传入 
    onChange && onChange(_data);
  };


  // 每个构件下的协同信息
  const secondItems_big = (e) => {
    console.log('部件进入__构件下的协同信息ee',e);
    // return(
    //   e.map((item,index)=>{
    //     return(
    //       <View key={index}>
    //         <Text>{item}</Text>
    //       </View>
    //     )
    //   })
    // )
    return (
      <ScrollView horizontal={true} style={{width:80}}>
        {e.map((item, index) => (
          <Pressable key={index} style={{ paddingHorizontal: 3, paddingVertical: 0 }}>
            <Text style={{color:'#586988',}}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>
    );
  }

  

  return (
    <View style={[tailwind.flex1, tailwind.flexRow]}>
      {/* 左侧 */}
      <View style={[tailwind.flexCol, tailwind.p2]}>
        <View style={[tailwind.mB1]}>
          <Text style={[styles.memberListTitle, {color:'#2b427d'}]}>
            {/* 这里的title是部件名称 或者 跨名称 */}
            {title}
          </Text>
        </View>
        <FlatList
          data={data || []}
          extraData={data}
          style={[tailwind.borderB, tailwind.borderGray400]}
          ItemSeparatorComponent={() => <View style={tailwind.mY1} />}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                // 执行父组件的函数
                onGroupChange && onGroupChange(item);
                // 清空选中的构件
                setChecked(new Set());
                // 设置当前选中的 部件 或 跨
                setNowEdit(item);
              }}>
              <View key={index} style={[styles.memberListItem]}>
                <View
                  style={[
                    {
                      backgroundColor:
                        nowEdit.title === item.title
                          ? theme.primaryColor
                          : colors.gray400,
                    },
                    tailwind.w2,
                  ]}
                />
                <View style={[styles.memberListItemTitle]}>
                  <Text>{item.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* 右侧 */}
      <View style={[styles.memberItem]}>
        <View style={[tailwind.mB1, tailwind.flexRow, tailwind.justifyBetween]}>
          <Text style={[styles.memberListTitle, {color:'#2b427d'}]}>
            {nowEdit?.title}
          </Text>
          <View style={[tailwind.flexRow]}>
            <Button onPress={handleCheckAll} style={[{backgroundColor:'#2b427d'}]}>全选</Button>
            <Button onPress={cancelSelect} style={[{backgroundColor:'#566a8b',marginLeft:10}]}>取消选择</Button> 
          </View>
        </View>
        <ScrollView>
          <View style={[tailwind.flexRow, tailwind.flex1, tailwind.flexWrap]}>
            {nowEdit?.list?.map((items, index) => (
              <View key={index}>
                <Item
                color={handleColor(items)}
                coopData={coopData}
                item={items}
                title={items.membername}
                checked={checked.has(items.id)}
                onPress={() => handleCheck(items.id)}
              />
              {
                coopData && coopData.some(coopItem => coopItem.memberId === items.memberid) ? 
                <View style={{height:50,width:'100%',paddingTop:0}}>
                  <View style={{
                    width:'85%',
                    flexDirection:'row',
                    alignItems:'center',
                  }}>
                    <View style={{marginRight:5,}}>
                      {
                        coopData.map((item,index)=>{
                          if(item.memberId == items.memberid) {
                            return (
                              <Text key={index} style={{color:'#2e407a',fontWeight:'500'}}>
                                {item.userGroup.length}
                              </Text>
                            )
                          }
                        })
                      }
                    </View>
                    <Pressable style={{borderLeftWidth:1,borderLeftColor:'#ccd4df',borderStyle:'solid'}}>
                      {
                        coopData.map((item,index)=>{
                          if(item.memberId == items.memberid) {
                            return (
                              <View key={index}>
                                {secondItems_big(item.userGroup)}
                              </View>
                            )
                          }
                        })
                      }
                      </Pressable>
                  </View>
                </View>
                : <></>
              }
              </View>
            ))}
            
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

// 当部件不是上部结构时，该部件里的所有跨信息显示在一起
const AllData = ({title, data, coopData,onChange, onGroupChange}) => {
  // title-部件名称
  //data-部件进来时，data是跨列表;跨进来时，data是部件列表
  // 全局样式
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  // 当前选中的构件列表 
  const [checked, setChecked] = React.useState(new Set());

  // 当前编辑的 部件 或 是跨
  const [nowEdit, setNowEdit] = React.useState({});

  // 初始化数据
  React.useEffect(() => {
    // 初始化当前选中的 组
    if (data.length) {
      try {
        let list = []
        data[0].list.forEach((item, index) => {
          list.push(item.membertype)
        })
        list = Array.from(new Set(list))
        let memberList = []
        list.forEach((item) => {
          memberList.push({
            title:item,
            list:[]
          })
        })
        memberList.forEach((item) => {
          data[0].list.forEach((items) => {
            if (item.title == items.membertype) {
              item.list.push(items)
            }
          })
        })
        memberList.forEach((item) => {
          if (item.title == 'b100001') {
            item.title = '主梁'
          } else if (item.title == 'b100002') {
            item.title = '横隔板'
          } else if (item.title == 'b100003') {
            item.title = '湿接段'
          } else if (item.title == 'b100004') {
            item.title = '支座'
          } else if (item.title == 'b100005') {
            item.title = '铰缝'
          } else if (item.title == 'b100006') {
            item.title = '挂梁'
          } else if (item.title == 'b100007') {
            item.title = '湿接缝'
          } else if (item.title == 'b200001') {
            item.title = '桥台'
          } else if (item.title == 'b200002') {
            item.title = '桥墩'
          } else if (item.title == 'b200003') {
            item.title = '墩台基础'
          } else if (item.title == 'b200004') {
            item.title = '翼墙、耳墙'
          } else if (item.title == 'b200005') {
            item.title = '锥坡、护坡'
          } else if (item.title == 'b200006') {
            item.title = '河床'
          } else if (item.title == 'b200007') {
            item.title = '调治构造物'
          } else if (item.title == 'b300001') {
            item.title = '桥面铺装'
          } else if (item.title == 'b300002') {
            item.title = '伸缩缝装置'
          } else if (item.title == 'b300003') {
            item.title = '人行道'
          } else if (item.title == 'b300004') {
            item.title = '栏杆、护栏'
          } else if (item.title == 'b300005') {
            item.title = '排水系统'
          } else if (item.title == 'b300006') {
            item.title = '照明、标志'
          }
        })
        // console.log('memberList',memberList[0]);
        data[0].memberList = memberList
      } catch (error) {
        console.log('error302',error);
      }
      
      setNowEdit(data[0]);
      console.log('nowEdit',nowEdit.memberList);
    } else {
      setNowEdit({});
    }
  }, [data,nowEdit]);

  // 设置构件颜色
  const handleColor = ({memberstatus}) => {
    switch (memberstatus) {
      case '0':
        return colors.gray400;
      case '100':
        return colors.green600;
      case '200':
        return colors.red600;
      default:
        return colors.gray400;
    }
  };

  // 点击构件时
  const handleCheck = id => {
    const _checked = new Set(checked);
    if (_checked.has(id)) {
      _checked.delete(id);
    } else {
      _checked.add(id);
    }
    // 设置当前选中的构件列表
    setChecked(_checked);
    // 触发构件变化函数
    handleChange(_checked);
  };

  // 全选
  const handleCheckAll = () => {
    if (checked.size === nowEdit.list.length) {
      // 当已经全选时,设置全不选
      setChecked(new Set());
      // 触发 构件选中变化 的 函数
      handleChange(new Set());
    } else {
      // 选中全部
      setChecked(new Set(nowEdit.list.map(({id}) => id)));
      // 触发 构件选中变化 的 函数
      handleChange(new Set(nowEdit.list.map(({id}) => id)));
    }
  };

  // 取消选择
  const cancelSelect = () => {
    // 当已经全选时,设置全不选
    setChecked(new Set());
    // 触发 构件选中变化 的 函数
    handleChange(new Set());
  }

  // 选中的构件变化时
  const handleChange = _checked => {
    const _data = {};
    data
      .map(({list}) => list)
      .flat()
      .forEach(item => (_data[item.id] = _checked.has(item.id)));
    //执行父组件的函数,并将选择的构件数据传入 
    onChange && onChange(_data);
  };

  const secondItems_all = (e) => {
    console.log('桥跨进入__构件下的协同信息ee',e);
    // return(
    //   e.map((item,index)=>{
    //     return(
    //       <View key={index}>
    //         <Text>{item}</Text>
    //       </View>
    //     )
        
    //   })
    // )
    return (
      <ScrollView horizontal={true} style={{width:80}}>
        {e.map((item, index) => (
          <Pressable key={index} style={{ paddingHorizontal: 3, paddingVertical: 0 }}>
            <Text style={{color:'#586988',}}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>
    );
  }

  return (
    <View style={[tailwind.flex1, tailwind.flexRow]}>
      {/* 左侧 */}
      <View style={[tailwind.flexCol, tailwind.p2]}>
        <View style={[tailwind.mB1]}>
          <Text style={[styles.memberListTitle, {color:'#2b427d'}]}>
            {/* 这里的title是部件名称 或者 跨名称 */}
            {title}
          </Text>
        </View>
        <FlatList
          data={data || []}
          extraData={data}
          style={[tailwind.borderB, tailwind.borderGray400]}
          ItemSeparatorComponent={() => <View style={tailwind.mY1} />}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                // 执行父组件的函数
                onGroupChange && onGroupChange(item);
                // 清空选中的构件
                setChecked(new Set());
                // 设置当前选中的 部件 或 跨
                setNowEdit(item);
              }}>
              <View key={index} style={[styles.memberListItem]}>
                <View
                  style={[
                    {
                      backgroundColor:
                        nowEdit.title === item.title
                          ? theme.primaryColor
                          : colors.gray400,
                    },
                    tailwind.w2,
                  ]}
                />
                <View style={[styles.memberListItemTitle]}>
                  <Text>{item.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* 右侧 */}
      <View style={[styles.memberItem]}>
        <View style={[tailwind.mB1, tailwind.flexRow, tailwind.justifyBetween]}>
          <Text style={[styles.memberListTitle, {color:'#2b427d'}]}>
            {nowEdit?.title}
          </Text>
          <View style={[tailwind.flexRow]}>
            <Button onPress={handleCheckAll} style={[{backgroundColor:'#2b427d'}]}>全选</Button>
            <Button onPress={cancelSelect} style={[{backgroundColor:'#566a8b',marginLeft:10}]}>取消选择</Button> 
          </View>
        </View>
        <ScrollView>
          {/* <View style={[tailwind.flexRow, tailwind.flex1, tailwind.flexWrap]}>
            {nowEdit?.list?.map((item, index) => (
              <Item
                key={index}
                color={handleColor(item)}
                title={item.membername}
                checked={checked.has(item.id)}
                onPress={() => handleCheck(item.id)}
              />
            ))}
          </View> */}
          <View style={[tailwind.flexRow, tailwind.flex1, tailwind.flexWrap]}>
            {nowEdit?.memberList?.map((item, index) => (
              <View key={index}>
                <View style={{fontColor:'red'}}>
                  <Text style={[styles.memberListTitle1, {color:'#2b427d'}]}>{item.title}</Text>
                </View>
                
                <View style={[tailwind.flexRow, tailwind.flex1, tailwind.flexWrap,]}>
                  {item.list.map((items, index) => (
                    <View key={index}>
                    <Item
                    color={handleColor(items)}
                    coopData={coopData}
                    item={items}
                    title={items.membername}
                    checked={checked.has(items.id)}
                    onPress={() => handleCheck(items.id)}
                  />
                  {
                    coopData && coopData.some(coopItem => coopItem.memberId === items.memberid) ? 
                    <View style={{height:50,width:'100%',paddingTop:0,}}>
                      <View style={{
                          width:'85%',
                          flexDirection:'row',
                          alignItems:'center',
                        }}>
                        <View style={{marginRight:5,}}>
                          {
                            coopData.map((item,index)=>{
                              if(item.memberId == items.memberid) {
                                return (
                                  <Text key={index} style={{color:'#2e407a',fontWeight:'500'}}>
                                    {item.userGroup.length}
                                  </Text>
                                )
                              }
                            })
                          }
                        </View>
                        <Pressable style={{borderLeftWidth:1,borderLeftColor:'#ccd4df',borderStyle:'solid'}}>
                          {
                            coopData.map((item,index)=>{
                              if(item.memberId == items.memberid) {
                                return (
                                  <View key={index}>
                                    {secondItems_all(item.userGroup)}
                                  </View>
                                )
                              }
                            })
                          }
                        </Pressable>
                      </View>
                    </View>
                    : <></>
                  }
                  </View>
                    
                  ))}
                </View>
              </View>
            ))}
            
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default function Member({route, navigation,item}) {
  // 全局样式
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  // 全局参数 -- 桥幅属性、桥梁结构数据、用户信息
  const {
    state: {bridgeside, basememberinfo, userInfo},
  } = React.useContext(GlobalContext);

  // 协同检测
  const {
    state: {wsOpen,curSynergyInfo,operationNoteData},
  } = React.useContext(synergyContext);

  // 桥梁检测全局参数 -- 桥梁信息、检测构件列表、项目信息
  const {
    state: {bridge, partsList, project},
    dispatch,
  } = React.useContext(Context);

  // 当前页面 数据 还是 影音
  const [pageType, setPageType] = React.useState('数据');

  // 组列表 ,部件 或 跨 列表
  const [list, setList] = React.useState([]);

  const [allList, setAllList] = React.useState([])

  const [parts, setParts] = React.useState([]);

  const [editLogList, setEditLogList] = React.useState([]);

  // 选中的构件列表
  const [checkedList, setCheckedList] = React.useState(new Set());

  // 当前选中的跨编号
  const [nowGroup, setNowGroup] = React.useState(null);

  
  const {data} = route.params;

  const [screenWidth,setScreenWidth] = React.useState() //屏幕宽度

  useFocusEffect(
    React.useCallback(() => {
      editLog
        .list({
          projectid: project.projectid,
          bridgeid: bridge.bridgeid,
        })
        .then(res => 
          {
            setEditLogList(res)
          }
        );
    }, [project, bridge]),
  );


  const [selfCoopData,setSelfCoopData] = useState({}) //协同检测中当前用户自己的数据
  const [noteData,setNoteData] = useState()
  React.useEffect(() => {
    console.log('构件列表 是否为协同检测wsOpen',wsOpen,);
    if(wsOpen){
      
      const coopData = curSynergyInfo
      console.log('当前为协同检测',coopData);
      console.log('访问操作记录',operationNoteData);
      console.log('noteData.length',noteData?.length);
      if(!noteData?.length){
        setNoteData(operationNoteData)
      }
      const participators = JSON.parse(coopData.participator);
      participators.forEach((item,index)=>{
        if(item.isSelf == 'true'){
          console.log('当前用户的信息',item);
          setSelfCoopData(item)
        }
      })
    }


    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
    if (!partsList || !data || !basememberinfo) {
      return;
    }
    // console.log('member route',route);
    const fun = (filterKey, dataKey, titleFun) => {
      const _list = [];
      const _data = {};
      const _parts = partsList.filter(
        item => item[filterKey] === data[filterKey],
      );
      // console.log('_parts',_parts);
      _parts.forEach((item) => {
        if (data.title == '桥台') {
            // console.log('items',item.membername.slice(0,1));
            let firstCode = Number(item.membername.slice(0,1))
            if (firstCode !== 0) {
              item.stepno = firstCode
            }
          }
      })
      _parts.forEach(item => {
        // console.log('_parts item',item);
        if (_data[item[dataKey]]) {
          _data[item[dataKey]].push(item);
        } else {
          _data[item[dataKey]] = [item];
        }
      });
      Object.keys(_data).forEach(key =>
        _list.push({
          title: titleFun(key),
          stepno: key,
          list: _data[key],
        }),
      );
      return {_parts, _list};
    };
    const {_parts, _list} =
      data.type === 'member'
        ? fun('membertype', 'stepno', key => `${key}#跨`)
        : fun(
            'stepno',
            'membertype',
            key =>
              basememberinfo.find(item => item.membertype === key).membername,
          );
    setNowGroup(_list ? _list[0]?.stepno : null);
    // console.log('listttttt',_list);
    _list.forEach((item) => {
      // console.log('_list item',item);
      if (item.title == '伸缩缝装置') {
        item.title = '伸缩装置'
      }
    })
    // console.log('_list',_list);
    setList(_list);

    let _allList = [
      {
        title:'全部跨径',
        stepno:'1',
        list:[]
      }
    ]
    _list.forEach((item) => {
      // console.log('item',item);
      item.list.forEach((items,index) => {
        _allList[0].list.push(item.list[index])
      })
      
    })
    // console.log('_allList',_allList);
    setAllList(_allList)

    
    setParts(_parts);
  }, [partsList, data, basememberinfo]);

  // 顶部导航
  const getHeaderItems = () => {
    let paramname = '';
    if (bridgeside && bridge) {
      paramname =
        bridgeside.find(item => bridge.bridgeside === item.paramid)
          ?.paramname || '';
    }
    return [
      {
        name: 'home',
        isIcon: true,
        onPress: () => navigation.navigate('Collection/Detect/Project'),
      },
      {
        name: `${project.projectname}`,
        onPress: () =>
          navigation.navigate('Collection/Detect/ProjectDetail', {project}),
      },
      {
        name: `${bridge.bridgestation}-${bridge.bridgename}-${paramname}`,
        onPress: () => navigation.navigate('Collection/Detect/BridgeTest/Main'),
      },
      {
        labelname: data.title,
      },
    ];
  };

  // 选中的构件改变时
  const handleCheckedChange = e => {
    const _checkedList = new Set();
    Array.from(parts).forEach(item => {
      if (e[item.id]) {
        _checkedList.add(item.id);
      } else {
        _checkedList.delete(item.id);
      }
    });
    setCheckedList(_checkedList);
  };

  // 全部标记为良好
  const handleGoodAll = () => {
    const _parts = [...parts];
    const version = uuid.v4();
    const cachePartsList = _parts
      .filter(item => item.memberstatus !== '200')
      .map(item => {
        item.memberstatus = '100';
        item.version = version;
        return item;
      });
    editLog.save({
      projectid: project.projectid,
      bridgeid: bridge.bridgeid,
      title: '全部',
      page_key: '标记为良好',
      userid: userInfo.userid,
      binddate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
    dispatch({type: 'isLoading', payload: true});
    dispatch({type: 'cachePartsList', payload: cachePartsList});
  };

  // 页面跳转
  const handleEditPage = path => {
    if (!checkedList.size) {
      return;
    }
    // 查询是否录入过数据
    let list = parts.filter(item => checkedList.has(item.id))
    list.forEach(async item=>{
      await partsCheckstatusData.getByDataid(item.memberid).then(res=>{
        if(res.length>0){
          item['version'] = res[0].version
        }else{
          item['version'] = uuid.v4()
        }
      })
    })
    // navigate保留当前页面直接跳转、replace销毁当前页面再跳转（移出路由栈）
    navigation.replace(path, {
      title: data.title,
      list: list,
      dataGroupId: checkedList.size > 1 ? uuid.v4() : '',
      routeParams: data,
      // 是否是协同检测
      isCoop:wsOpen,
      // 协同检测中当前用户的信息
      selfCoopData,
      // 当前协同检测过程中的操作历史记录
      operationNotes:[],
      // 每次开始进入病害列表的时间
      timestamp:dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      data:route.params.data
    });
  };

  // 影音组件
  const getMedia = (e) => {
    try {
      
      const nowEdit = parts.find(item => checkedList.has(item.id));
      
      const dataid = nowEdit
        ? nowEdit.memberid
        : data.type === 'member'
        ? data.membertype
        : nowGroup;
      const categoryList =
        checkedList.size === 0
          ? [
              {
                value: `member-${
                  data.type === 'member' ? data.membertype : nowGroup
                }`,
                label: '结构照片',
              },
            ]
          : [
              {
                value: `member-${nowEdit?.memberid}`,
                label: '结构照片',
              },
            ];
      const defaultFileName =
        checkedList.size === 0
          ? data.type === 'member'
            ? data.title
            : basememberinfo.find(item => item.membertype === nowGroup)
                ?.membername
          : nowEdit.membername;

      return (
        <Media
          navigation={navigation}
          dataid={dataid}
          type={checkedList.size === 0 ? 'member' : 'parts'}
          defaultFileName={`${defaultFileName}状况`}
          categoryList={categoryList}
          memberList={list}
          route={route}
          pid={e}
        />
      );
    } catch (err) {
      console.log('getMedia err',err);
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
    handleEditPage('Collection/Detect/BridgeTest/Member/DiseaseList')
  }


  // =============协同检测相关===================
  const [coopData,setCoopData] = useState() //协同任务中各用户的检测记录数据
  useEffect(()=>{
    // console.log('allList',allList[0]?.list);
    // 获取当前任务中各用户的检测记录数据
    let data = [
      {
        memberId:'g114ondgptv9904ondgpuxc38_b100001_luuloy3z_0',
        membername:'1-1#',
        userGroup:['张三','张三三','张四','张五',]
      },
      {
        memberId:'g114ondgptv9904ondgpuxc38_b100001_luuloy3z_1',
        membername:'1-2#',
        userGroup:['张三','张三三','张四','张五','李一','李二','李三','李四','李五','李六','李七','李八','李九',]
      },
      {
        memberId:'g114ondgptv9904ondgpuxc38_b100001_luuloy3z_2',
        membername:'2-1#',
        userGroup:['张三','李一','李二',]
      },
    ]
    setCoopData(data)
  },[])

  return (
    <Box pid="P1501" navigation={navigation} route={route} headerItems={getHeaderItems()} labelname={data.title} projectList={project} project={project.projectname} bridge={bridge}>
      {/* 年份 + 数据影音 tab，当选中构件时，数据影音tab禁用 */}
      <HeaderTabs onChangeTab={setPageType} disabled={checkedList.size} />
      {/* <View style={tailwind.mY2} /> */}
          {/* 影音 */}
        <View style={[pageType === '数据' ? tailwind.hidden : tailwind.flex1]}>
          {getMedia('P1501')}
        </View>
        {/* 数据 */}
        <View style={[pageType !== '数据' ? tailwind.hidden : tailwind.flex1]}>
          <Content
          onBack={goBack}
          onAhead={checkedList.size == 1 && goAhead}
            // 右侧按钮组
            operations={[
              {
                // name: 'eye',
                // 查看构件 跳转到病害管理
                img:'look',
                disabled: checkedList.size < 1,
                onPress: () =>
                  handleEditPage(
                    'Collection/Detect/BridgeTest/Member/DiseaseList',
                  ),
              },
              {
                // name: 'thumb-up',
                // 设置好构件
                img:'singleGood',
                color: colors.green600,
                onPress: () =>
                  handleEditPage('Collection/Detect/BridgeTest/Member/GoodEdit'),
              },
              {
                // name: 'thumb-up',
                // 全部设置为好构件
                img:'allGood',
                color: colors.green600,
                border: true,
                onPress: handleGoodAll,
              },
            ]}>
            {/* <View style={[theme.primaryBgStyle, styles.card, tailwind.flex1, {backgroundColor:'rgba(255,255,255,1)',right:11.5,width:715,top:1,borderRadius:5}]}></View> */}
            <View style={
              screenWidth > 830 ? [theme.primaryBgStyle, styles.card, tailwind.flex1,{backgroundColor:'rgba(255,255,255,1)',right:27,width:715,top:1,borderRadius:5}] 
              :
              [theme.primaryBgStyle, styles.card, tailwind.flex1,{backgroundColor:'rgba(255,255,255,1)',right:19,width:715,top:1,borderRadius:5}]
            }>
              {/* 左侧构件列表 */}
              <View style={[styles.listBox]}>
                {/* <BigData
                  title={data.title}
                  // 组列表 ,部件 或 跨 列表
                  data={list}
                  // 组改变时，即点击左侧列表时
                  onGroupChange={item => {
                    // 如果跨编号存在
                    if (item.stepno) {
                      console.info('???');
                      // 设置当前选中的跨编号
                      setNowGroup(item.stepno);
                    }
                    // 重置选中的构件列表
                    setCheckedList(new Set());
                  }}
                  // 选中的构件改变时
                  onChange={handleCheckedChange}
                /> */}

                {
                  data.title !== '主梁' && data.title !== '湿接段'
                  && data.title !== '湿接缝' && data.title !== '铰缝'
                  && data.title !== '横隔板' && data.title !== '支座' ? (
                    <AllData
                      title={data.title}
                      // 组列表 ,部件 或 跨 列表
                      data={allList}
                      // 协同检测数据
                      coopData={coopData}
                      // 组改变时，即点击左侧列表时
                      onGroupChange={item => {
                        // 如果跨编号存在
                        if (item.stepno) {
                          console.info('???');
                          // 设置当前选中的跨编号
                          setNowGroup(item.stepno);
                        }
                        // 重置选中的构件列表
                        setCheckedList(new Set());
                      }}
                      // 选中的构件改变时
                      onChange={handleCheckedChange}
                    />
                  ) : (
                    <BigData
                      title={data.title}
                      // 组列表 ,部件 或 跨 列表
                      data={list}
                      // 协同检测数据
                      coopData={coopData}
                      // 组改变时，即点击左侧列表时
                      onGroupChange={item => {
                        // 如果跨编号存在
                        if (item.stepno) {
                          console.info('???');
                          // 设置当前选中的跨编号
                          setNowGroup(item.stepno);
                        }
                        // 重置选中的构件列表
                        setCheckedList(new Set());
                      }}
                      // 选中的构件改变时
                      onChange={handleCheckedChange}
                    />
                  )
                    
                }



              </View>
              {/* 右侧 操作历史 */}
              <LogList 
                list={editLogList ? editLogList : ''}
                coopList={operationNoteData ? operationNoteData : ''}
              />
            </View>
          </Content>
        </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  contentContainer1: {
    // flex: 1/2,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    height:40,
    width:60,
    overflow:'scroll'
},
redView: {
  // backgroundColor:'red',
  height: 100,
  width: 100
},
  card: {
    ...tailwind.shadow2xl,
    ...tailwind.rounded,
    // ...tailwind.p2,
    ...tailwind.flexRow,
  },
  listBox: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  type1Color: {
    color: '#000000',
  },
  type2Color: {
    ...tailwind.textGreen600,
  },
  type3Color: {
    color: '#e2af62',
  },
  type4Color: {
    ...tailwind.textOrange500,
  },
  type5Color: {
    ...tailwind.textRed600,
  },
  itemTitle: {
    ...tailwind.borderY,
    ...tailwind.borderR,
    ...tailwind.borderGray400,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
    ...tailwind.w24,
    ...tailwind.pY2,
  },
  itemBtn: {
    ...tailwind.flexRow,
    ...tailwind.border2,
    ...tailwind.mR4,
    ...tailwind.mB2,
  },
  memberListTitle: {
    ...tailwind.textBase,
    ...tailwind.fontBold,
  },
  memberListTitle1: {
    ...tailwind.fontBold,
  },
  memberListItem: {
    ...tailwind.borderR,
    ...tailwind.borderGray400,
    ...tailwind.flexRow,
    ...tailwind.w24,
    ...tailwind.h10,
  },
  memberListItemTitle: {
    ...tailwind.borderY,
    ...tailwind.flex1,
    ...tailwind.pL2,
    // ...tailwind.pY2,
    ...tailwind.borderGray400,
    ...tailwind.justifyCenter,
  },
  memberItem: {
    ...tailwind.flex1,
    ...tailwind.flexColumn,
    ...tailwind.p2,
    ...tailwind.mL2,
  },
});
