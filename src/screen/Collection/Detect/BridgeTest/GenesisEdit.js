// 病害成因
import React from 'react';
import {tailwind} from 'react-native-tailwindcss';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import {Context} from './Provider';
import {Context as ThemeContext} from '../../../../providers/ThemeProvider';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';
import {Box, Content} from '../../../../components/CommonView';
import Checkbox from '../../../../components/Checkbox';
import Table from '../../../../components/Table';
import HeaderTabs from './HeaderTabs';
import {getDiseaseDataList} from '../../../../database/parts_checkstatus_data';
import * as partsPlanGenesisData from '../../../../database/parts_plan_genesis_data';
import * as uploadStateRecord from '../../../../database/upload_state_record';
import storage from '../../../../utils/storage';
import {listToPage} from '../../../../utils/common';

export default function GenesisEdit({navigation, route}) {
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

  // 表格数据
  const [tableData, setTableData] = React.useState([]);

  // 桥梁各部件病害信息
  const [membercheck, setMembercheck] = React.useState([]);

  // 表格当前页
  const [tablePageNo, setTablePageNo] = React.useState(1);

  // 照片
  const [img, setImg] = React.useState();

  // 描述
  const [remark, setRemark] = React.useState();

  // 当前选中的构件 -- 单选
  const [nowEdit, setNowEdit] = React.useState(null);

  // 病害成因表格数据
  const [genesis, setGenesis] = React.useState([]);

  // 选中的病害成因
  const [data, setData] = React.useState(new Set());

  // list 是 所有病害构件列表
  const {list} = route?.params || {};

  // 类型
  const category = 'genesis';

  // 初始化
  React.useEffect(() => {
    storage.getBaseItem('桥梁各部件病害信息').then(res => {
      if (res.data && res.data.length) {
        setMembercheck(res.data[0]);
      }
    });
  }, []);

  // 初始化表格数据 -- 当病害列表、检测id变化时，触发
  React.useEffect(() => {
    if (!list.length || !bridgereportid) {
      return;
    }
    // 在数据库中获取病害构件的数据
    getDiseaseDataList(
      bridgereportid,
      list.map(({memberid}) => memberid),
    ).then(res => {
      // 设置默认选择
      if (res.length) {
        setNowEdit(res[0]);
      }
      // 设置表格数据
      setTableData(listToPage(res, 10));
    });
  }, [list, bridgereportid]);

  // 选择的构件、文件列表、病害列表、检测id、用户信息 变化时触发
  React.useEffect(() => {
    if (!fileList || !list || !bridgereportid || !userInfo) {
      return;
    }
    // 没有选中，那么设置图片和描述为空
    if (!nowEdit) {
      setImg(null);
      setRemark(null);
      return;
    }

    // ----设置照片
    // 获取图片列表 -- 图片和虚拟图片
    const imglist = fileList.filter(
      item =>
        item.category === 'disease' &&
        item.dataid === nowEdit.version &&
        new Set(['image', 'virtualimage']).has(item.mediatype),
    );
    // 如果图片列表长度大于0
    if (imglist.length) {
      // 获取 优先使用的图片
      const preference = imglist.find(({is_preference}) => !!is_preference);
      // 如果有优先使用的图片，那么显示优先使用的，没有则显示第一个
      let _img = preference || imglist[0];
      // 如果图片不是源文件，那么获取源文件
      if (!_img?.is_source) {
        _img = fileList.find(item => item.parentmediaid === _img.parentmediaid);
      }
      // 设置图片
      setImg(_img);
    }

    // 获取描述
    const jsondata = JSON.parse(nowEdit.jsondata);
    setRemark(jsondata.remark || '描述');

    //-----病害成因
    // 获取当前病害的编号
    const {membertype} = list.find(({memberid}) => memberid === nowEdit.dataid);
    (async () => {
      // 从本地获取 病害与成因绑定关系表
      const membercheckcausebindlist =(await storage.getBaseItem('病害与成因绑定关系表')).data || [];
      // 根据 病害数据的checktypeid 在 病害与成因绑定关系表membercheckcausebindlist 中 获取 causetypeid
      const set = new Set(
        membercheckcausebindlist
          .filter(({checktypeid}) => jsondata.checktypeid === checktypeid)
          .map(({causetypeid}) => causetypeid),
      );
      let _genesis = null;
      // 本地获取 桥梁部件病害成因
      const membercheckcause =(await storage.getBaseItem('桥梁部件病害成因')).data || [];
      if (membercheckcause && membercheckcause.length) {
        // 获取病害成因
        _genesis = membercheckcause[0].list.filter(item => {
          return set.has(item.causetypeid) && item.membertype === membertype;
        });
      }
      if (!_genesis || !_genesis.length) {
        return;
      }
      // 设置病害成因表格数据
      setGenesis(_genesis);
      // 在病害成因数据库表中获取数据 parts_plan_genesis_data
      const res = await partsPlanGenesisData.get({
        checkstatusdataid: nowEdit.version,
        category,
        bridgereportid,
      });
      if (!res) {
        // 如果数据库中 不存在，那么将数据保存入数据库
        partsPlanGenesisData.save({
          checkstatusdataid: nowEdit.version,
          bridgereportid,
          membertype: membertype,
          jsondata: JSON.stringify({
            list: [],
          }),
          checktypeid: jsondata.checktypeid,
          category,
          userid: userInfo.userid,
        });
      } else {
        // 如果存在设置 选中的病害成因列表 编号
        setData(new Set(JSON.parse(res.jsondata).list));
      }
    })();
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
        name: '病害成因',
      },
    ];
  };

  // 获取构建名
  const getMemberName = item => {
    return list.find(({memberid}) => memberid === item.dataid)?.membername;
  };

  // 获取类别名
  const getTypeName = item => {
    // console.info(getBaseData().桥梁各部件病害信息);
    // 获取病害数据
    const jsondata = JSON.parse(item.jsondata);
    // 如果 病害数据中 部件类型标号 存在
    if (jsondata?.areatype) {
      const membertype = list.find(
        ({memberid}) => memberid === item.dataid,
      )?.membertype;
      const components = membercheck.list.find(
        it => membertype === it.membertype,
      ).list;
      return components.find(
        ({checktypeid}) => checktypeid === jsondata.checktypeid,
      )?.checkinfoshort;
    }
    return '';
  };

  // 右侧 病害成因选择变化时
  const handleChenge = causetypeid => {
    const set = new Set([...data]);
    if (set.has(causetypeid)) {
      set.delete(causetypeid);
    } else {
      set.add(causetypeid);
    }
    // 更新数据库中病害成因的数据
    partsPlanGenesisData.update({
      jsondata: JSON.stringify({
        list: Array.from(set),
      }),
      checkstatusdataid: nowEdit.version,
      category,
      bridgereportid,
    });
    setData(set);
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

  return (
    // 外部盒子
    <Box headerItems={getHeaderItems()} pid="P1301">
      {/* 年份导航 + 数据影音切换 */}
      <HeaderTabs disabled={true} />
      {/* 内容 */}
      <View style={tailwind.flex1}>
        <Content>
          <View style={[styles.card, {width:710, backgroundColor:'#fff'}]}>
            <View style={[tailwind.flex1, tailwind.flexRow]}>
              {/* 左侧 */}
              <View style={[tailwind.flex1]}>
                <Text style={[styles.title, {color:'#2b427d'}]}>
                  病害列表
                </Text>
                <View style={styles.tableBox}>
                  <Table.Header>
                    <Table.Title title="选择" flex={1} />
                    <Table.Title title="序号" flex={1} />
                    <Table.Title title="类别" flex={2} />
                    <Table.Title title="构件" flex={2} />
                  </Table.Header>
                  <FlatList
                    scrollEnabled={false}
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
                  // pageNo={tablePageNo}
                  onPageChange={setTablePageNo}
                  numberOfPages={tableData.length}
                />
              </View>
              <View style={tailwind.mX2} />
              {/* 右侧 */}
              <View style={[styles.flex2]}>
                {/* 上侧 */}
                <View style={[styles.flex2, tailwind.flexRow, tailwind.mB2]}>
                  <View style={[tailwind.flex1]}>
                    {/* 照片 */}
                    <Text style={[styles.title, {color:'#2b427d'}]}>
                      照片
                    </Text>
                    {img ? (
                      // 照片存在
                      img.mediatype === 'image' ? (
                        // 是 图片，则显示
                        <Image
                          style={styles.img}
                          source={{uri: 'file://' + img.filepath}}
                        />
                      ) : (
                        // 不是图片，则显示文件名
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
                      // 照片不存在
                      <View style={styles.img}>
                        <Icon name="folder-multiple-image" size={40} />
                      </View>
                    )}
                  </View>
                  <View style={tailwind.mX2} />
                  {/* 描述 */}
                  <View style={[tailwind.flex1]}>
                    <Text style={[styles.title, {color:'#2b427d'}]}>
                      描述
                    </Text>
                    <View style={[styles.remarkBox]}>
                      <Text>{remark}</Text>
                    </View>
                  </View>
                </View>
                {/* 下侧 */}
                <View style={[styles.flex3]}>
                  <Text style={[styles.title, {color:'#2b427d'}]}>
                    病害成因
                  </Text>
                  <View style={styles.tableBox}>
                    <Table.Header>
                      <Table.Title title="选择" flex={1} />
                      <Table.Title title="序号" flex={1} />
                      <Table.Title title="成因描述" flex={12} />
                    </Table.Header>
                    <FlatList
                      data={genesis}
                      extraData={genesis}
                      renderItem={({item, index}) => (
                        <Table.Row key={index}>
                          <Table.Cell flex={1}>
                            <Checkbox
                              onPress={() => handleChenge(item.causetypeid)}
                              checked={data.has(item.causetypeid)}
                            />
                          </Table.Cell>
                          <Table.Cell flex={1}>{index + 1}</Table.Cell>
                          <Table.Cell flex={12}>
                            {item.causetypeinfo}
                          </Table.Cell>
                        </Table.Row>
                      )}
                    />
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
