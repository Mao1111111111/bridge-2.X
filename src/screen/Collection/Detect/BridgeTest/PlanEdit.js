// 养护计划
import React from 'react';
import {tailwind} from 'react-native-tailwindcss';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, Image, StyleSheet, FlatList,Dimensions} from 'react-native';
import {Context} from './Provider';
import {Context as ThemeContext} from '../../../../providers/ThemeProvider';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';
import {Box, Content} from '../../../../components/CommonView';
import {TextInput} from '../../../../components/Input';
import Checkbox from '../../../../components/Checkbox';
import Table from '../../../../components/Table';
import HeaderTabs from './HeaderTabs';
import {getDiseaseDataList} from '../../../../database/parts_checkstatus_data';
import * as partsPlanGenesisData from '../../../../database/parts_plan_genesis_data';
import * as uploadStateRecord from '../../../../database/upload_state_record';
import storage from '../../../../utils/storage';
import {listToPage} from '../../../../utils/common';

export default function PlanEdit({navigation, route}) {
  // 全局样式
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  // 全局参数 -- 桥幅属性、用户信息
  const {
    state: {bridgeside, userInfo},
  } = React.useContext(GlobalContext);

  // 桥梁检测全局参数 -- 项目信息、桥梁信息、文件列表、检测id
  const {
    state: {project, bridge, fileList, bridgereportid},
  } = React.useContext(Context);

  // 病害表格数据
  const [tableData, setTableData] = React.useState([]);

  // 养护计划数据
  const [plan, setPlan] = React.useState([]);

  // 桥梁各部件病害信息 -- 用于获取病害表格中的类别
  const [membercheck, setMembercheck] = React.useState([]);

  // 表格表格当前页
  const [tablePageNo, setTablePageNo] = React.useState(1);

  // 照片
  const [img, setImg] = React.useState();

  // 描述
  const [remark, setRemark] = React.useState();

  // 病害表格当前选中 -- 单选
  const [nowEdit, setNowEdit] = React.useState(null);

  const [data, setData] = React.useState(new Set());

  // 病害列表
  const {list} = route?.params || {};

  // 类别
  const category = 'plan';

  const [screenWidth,setScreenWidth] = React.useState() //屏幕宽度

  // 初始化
  React.useEffect(() => {
    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
    storage.getBaseItem('桥梁各部件病害信息').then(res => {
      if (res.data && res.data.length) {
        setMembercheck(res.data[0]);
      }
      // console.log('初始化的membercheck',membercheck);
    });
  }, []);

  // 初始化 病害表格数据
  React.useEffect(() => {
    if (!list.length || !bridgereportid) {
      return;
    }
    getDiseaseDataList(
      bridgereportid,
      list.map(({memberid}) => memberid),
    ).then(res => {
      if (res.length) {
        setNowEdit(res[0]);
      }
      setTableData(listToPage(res, 10));
    });
    
  }, [list, bridgereportid]);

  // 初始化 图片、描述、养护计划
  React.useEffect(() => {
    if (!fileList || !list) {
      return;
    }
    if (!nowEdit) {
      setImg(null);
      setRemark(null);
      setPlan([]);
      return;
    }

    // 获取图片
    const imglist = fileList.filter(
      item =>
        item.category === 'disease' &&
        item.dataid === nowEdit.version &&
        new Set(['image', 'virtualimage']).has(item.mediatype),
    );
    if (imglist.length) {
      const preference = imglist.find(({is_preference}) => !!is_preference);
      let _img = preference || imglist[0];
      if (!_img?.is_source) {
        _img = fileList.find(item => item.parentmediaid === _img.parentmediaid);
      }
      setImg(_img);
    } else {
      setImg(null);
    }

    // 获取描述
    const jsondata = JSON.parse(nowEdit.jsondata);
    setRemark(jsondata.remark || '描述');

    // 获取计划
    // 本地获取 部件养护计划信息
    storage.getBaseItem('部件养护计划信息').then(r => {
      // 部件养护计划数据
      const bermaintPlan = r.data || [];
      // 当前病害的部件编号
      const {membertype} =
        list?.find(({memberid}) => memberid === nowEdit.dataid) || {};
        // 获取当前病害养护计划的数据
      const {list: _plan} =
        bermaintPlan[0]?.list?.find(item => item.membertype === membertype) ||
        {};
      // 设置养护计划数据
      setPlan(_plan || []);
      if (!_plan) {
        return;
      }
      // 内容数据
      // 数据库中获取当前病害的养护计划数据
      partsPlanGenesisData
        .get({
          checkstatusdataid: nowEdit.version,
          category,
          bridgereportid,
        })
        .then(res => {
          console.info(res);
          // 如果没有计划，那么保存，如果有，则默认选择
          if (!res && _plan.length) {
            partsPlanGenesisData.save({
              checkstatusdataid: nowEdit.version,
              bridgereportid,
              membertype,
              jsondata: JSON.stringify({}),
              category,
              userid: userInfo.userid,
            });
          } else {
            setData(JSON.parse(res.jsondata));
          }
        });
    });
    //---更新上传状态
    const updateUploadState = async () => {
      // 获取当前上传状态
      // 上传状态
      let uploadState = await uploadStateRecord.getById(bridgereportid)
      // 当状态为已上传时，设置上传状态为有更新
      if(uploadState.state==3){
        await uploadStateRecord.update({
          state:1,
          bridgereportid:bridgereportid
        });
      }
    }
    updateUploadState()
    // console.log('tabledata~~',tableData);
  }, [nowEdit, fileList, list, bridgereportid, userInfo]);

  // 顶部导航
  const getHeaderItems = () => {
    if (!project.projectname) {
      return [];
    }
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
        onPress: () => navigation.goBack(),
      },
      {
        name: '养护计划',
      },
    ];
  };

  // 获取构件名
  const getMemberName = item => {
    return list.find(({memberid}) => memberid === item.dataid)?.membername;
  };

  // 获取类别名
  const getTypeName = item => {
     try {
      // console.info(getBaseData().桥梁各部件病害信息);
      // 获取病害数据
      const jsondata = JSON.parse(item.jsondata);
      // 如果 病害数据中 部件类型标号 存在
      // console.log('getTypeName list',list);
      // console.log('养护计划 getTypeName jsondata',jsondata);
      // console.log('养护计划 getTypeName jsondata.areatype',jsondata.areatype);
      if (jsondata?.areatype || jsondata.areatype !== undefined || jsondata.areatype !== '') {
        const membertype = list.find(
          ({memberid}) => memberid === item.dataid,
        )?.membertype;
        // console.log('membercheck',membercheck);
        const components = membercheck.list.find(
          it => membertype === it.membertype,
        ).list;
        return components.find(
          ({checktypeid}) => checktypeid === jsondata.checktypeid,
        )?.checkinfoshort;
      }
      return '';
    } catch (err) {
      console.log('GenesisEdit getTypeName err',err);
    }
    
  };

  // 养护计划选择时，更新养护计划
  const handleChenge = ({name, value}) => {
    const _data = {
      ...data,
      [name]: value,
    };
    partsPlanGenesisData.update({
      jsondata: JSON.stringify(_data),
      checkstatusdataid: nowEdit.version,
      category,
      bridgereportid,
    });
    setData(_data);
    //---更新上传状态
    const updateUploadState = async () => {
      // 获取当前上传状态
      // 上传状态
      let uploadState = await uploadStateRecord.getById(bridgereportid)
      // 当状态为已上传时，设置上传状态为有更新
      if(uploadState.state==3){
        await uploadStateRecord.update({
          state:1,
          bridgereportid:bridgereportid
        });
      }
    }
    updateUploadState()
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

  return (
    <Box headerItems={getHeaderItems()} pid="P1301" navigation={navigation} route={route} projectList={project} project={project.projectname} bridge={bridge.bridgename}>
      {/* 年份 + 影音 tab */}
      <HeaderTabs disabled={true} />
      <View style={tailwind.flex1}>
        <Content onBack={goBack}>
          <View style={
            screenWidth > 830 ? [tailwind.flexRow, tailwind.flex1,{backgroundColor:'rgba(255,255,255,1)',right:11.5,width:715,top:1,borderRadius:5,padding:10}] :
            [tailwind.flexRow, tailwind.flex1,{backgroundColor:'rgba(255,255,255,1)',right:19,width:715,top:1,borderRadius:5,padding:10}]
          }>
            <View style={[tailwind.flex1, tailwind.flexRow]}>
              {/* 左侧 */}
              <View style={[tailwind.flex1]}>
                {/* 标题 */}
                <Text style={[styles.title, {color:'#2b427d'}]}>
                  病害列表
                </Text>
                {/* 表格 */}
                <View style={styles.tableBox}>
                  <Table.Header>
                    <Table.Title title="选择" flex={1} />
                    <Table.Title title="序号" flex={1} />
                    <Table.Title title="类别" flex={2} />
                    <Table.Title title="构件" flex={2} />
                  </Table.Header>
                  <FlatList
                    data={tableData[tablePageNo - 1] || []}
                    extraData={tableData}
                    renderItem={({item, index}) => (
                      <Table.Row key={index}>
                        <Table.Cell flex={1}>
                          <Checkbox
                            onPress={() => setNowEdit(item)}
                            checked={nowEdit?.id === item.id}
                          />
                        </Table.Cell>
                        <Table.Cell flex={1}>{index + 1}</Table.Cell>
                        <Table.Cell flex={2}>{getTypeName(item)}</Table.Cell>
                        <Table.Cell flex={2}>{getMemberName(item)}</Table.Cell>
                      </Table.Row>
                    )}
                  />
                </View>
                <Table.Pagination
                  pageNo={tablePageNo}
                  onPageChange={setTablePageNo}
                  numberOfPages={tableData.length}
                />
              </View>
              <View style={tailwind.mX2} />
              {/* 右侧 */}
              <View style={[styles.flex2]}>
                {/* 顶部 */}
                <View style={[styles.flex2, tailwind.flexRow, tailwind.mB2]}>
                  {/* 左侧 */}
                  <View style={[tailwind.flex1]}>
                    <Text style={[styles.title, {color:'#2b427d'}]}>
                      照片
                    </Text>
                    {img ? (
                      // 有图片
                      img.mediatype === 'image' ? (
                        // 图片
                        <Image
                          style={styles.img}
                          source={{uri: 'file://' + img.filepath}}
                        />
                      ) : (
                        // 图片名
                        <View style={styles.img}>
                          <Text
                            style={[
                              tailwind.text2xl,
                              tailwind.fontBold,
                              theme.primaryTextStyle,
                            ]}>
                            {img.filename}
                          </Text>
                        </View>
                      )
                    ) : (
                      // 没有图片
                      <View style={styles.img}>
                        <Icon name="folder-multiple-image" size={40} />
                      </View>
                    )}
                  </View>
                  <View style={tailwind.mX2} />
                  {/* 右侧 */}
                  <View style={[tailwind.flex1]}>
                    <Text style={[styles.title, {color:'#2b427d'}]}>
                      描述
                    </Text>
                    <View style={[styles.remarkBox]}>
                      <Text>{remark}</Text>
                    </View>
                  </View>
                </View>
                {/* 底部 */}
                <View style={[styles.flex3]}>
                  <Text style={[styles.title, {color:'#2b427d'}]}>
                    养护计划
                  </Text>
                  <View style={tailwind.flex1}>
                    {plan &&
                      plan.map(
                        (
                          {maintplanname, maintplanid, maintplanunit},
                          index,
                        ) => (
                          <View
                            style={[tailwind.flexRow, tailwind.mB2]}
                            key={index}>
                            <TextInput
                              key={index}
                              name={maintplanid}
                              style={tailwind.flex1}
                              value={data[maintplanid] || ''}
                              onChange={handleChenge}
                              label={`${maintplanname}(${maintplanunit})：`}
                            />
                          </View>
                        ),
                      )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Content>
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  card: {
    ...tailwind.flex1,
    ...tailwind.shadow2xl,
    ...tailwind.rounded,
    ...tailwind.p2,
  },
  tableBox: {
    ...tailwind.flex1,
    ...tailwind.borderGray400,
    ...tailwind.border,
  },
  title: {
    ...tailwind.fontBold,
    ...tailwind.mB1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  img: {
    ...tailwind.bgGray400,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
    ...tailwind.flex1,
  },
  remarkBox: {
    ...tailwind.p1,
    ...tailwind.flex1,
    ...tailwind.border,
    ...tailwind.borderGray400,
  },
});
