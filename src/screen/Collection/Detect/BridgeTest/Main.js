import React from 'react';
import {ProgressBar} from 'react-native-paper';
import {tailwind} from 'react-native-tailwindcss';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import {Context} from './Provider';
import {Context as ThemeContext} from '../../../../providers/ThemeProvider';
import {Context as GlobalContext} from '../../../../providers/GlobalProvider';
import Tabs from '../../../../components/Tabs';
import Table from '../../../../components/Table';
import Checkbox from '../../../../components/Checkbox';
import {Box, Content} from '../../../../components/CommonView';
import {
  getDiseaseDataTotal,
  getMainTotal,
} from '../../../../database/parts_checkstatus_data';
import {listToPage} from '../../../../utils/common';
import Button from '../../../../components/Button';
import HeaderTabs from './HeaderTabs';
import MemberEdit from './MemberEdit';
import Media from './Media';

export default function Main({navigation}) {
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

  const [nowEdit, setNowEdit] = React.useState(null);

  const [diseaseDataTotal, setDiseaseDataTotal] = React.useState(0);

  const [mianTotal, setMianTotal] = React.useState(0);

  const [table1Data, setTable1Data] = React.useState([]);

  const [table1PageNo, setTable1PageNo] = React.useState(1);

  const [table2Data, setTable2Data] = React.useState([]);

  const [table2PageNo, setTable2PageNo] = React.useState(1);

  const memberEditRef = React.useRef();

  const pageRow = 8;

  React.useEffect(() => setNowEdit(null), [pageType]);

  React.useEffect(() => {
    memberList.length && setTable1Data(listToPage(memberList, pageRow));
  }, [memberList]);

  React.useEffect(() => {
    kuaList.length && setTable2Data(listToPage(kuaList, pageRow));
  }, [kuaList]);

  useFocusEffect(
    React.useCallback(() => {
      if (bridgereportid) {
        getDiseaseDataTotal(bridgereportid).then(res =>
          setDiseaseDataTotal(res.count),
        );
        getMainTotal(bridgereportid).then(res => setMianTotal(res.count));
      }
    }, [bridgereportid]),
  );

  const getImg = (category, text) => {
    const style = [
      styles.img,
      tailwind.justifyCenter,
      tailwind.itemsCenter,
      tailwind.bgGray200,
    ];

    const getComponent = data => {
      return data.mediatype === 'virtualimage' ? (
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
        <Image
          style={styles.img}
          source={{
            uri: `file:// ${_img?.is_source ? data.filepath : data.copypath}`,
          }}
        />
      );
    };

    const datas = fileList.filter(
      item =>
        item.category === category &&
        new Set(['image', 'virtualimage']).has(item.mediatype),
    );
    let _img = {};
    if (datas.length) {
      const preference = datas.find(({is_preference}) => !!is_preference);
      _img = preference || datas[0];
    }
    return (
      <>
        {datas.length ? (
          getComponent(_img)
        ) : (
          <View style={[style]}>
            {category === 'remark' ? (
              <Icon name="file-document-edit-outline" size={40} />
            ) : (
              <Icon name="folder-multiple-image" size={40} />
            )}
          </View>
        )}
        <Text style={tailwind.textCenter}>
          {text}[{datas.length}]
        </Text>
      </>
    );
  };

  // 获取 顶部导航项
  const getHeaderItems = () => {
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
    ];
  };

  const handleCheck = (val, key) => {
    if (nowEdit && val[key] === nowEdit[key]) {
      setNowEdit(null);
    } else {
      setNowEdit(val);
    }
  };

  const handleMember = () => {
    if (!nowEdit) {
      return;
    }
    navigation.navigate('Collection/Detect/BridgeTest/Member', {
      data: nowEdit,
      list: [],
    });
  };

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

  const handleEdit = () => {
    memberEditRef.current.open();
  };

  const handleEditClose = () => {
    dispatch({type: 'reflush', payload: Math.random().toString(36).slice(-8)});
  };

  return (
    // 外部盒子 = 样式 + 顶部导航 + 导航左侧标签
    <Box headerItems={getHeaderItems()} pid="P1301">
      {/* 年份tab + 数据/影音tab，onChangeTab 为点击数据/影音tab时 */}
      <HeaderTabs onChangeTab={setPageType} />
      {pageType !== '数据' ? (
        //---------影音---------
        <Media
          type="bridge"
          dataid={bridge.bridgeid}
          categoryList={[
            {
              value: 'front',
              label: '桥梁正面照',
            },
            {
              value: 'facade',
              label: '桥梁立面照',
            },
            {
              value: 'remake',
              label: '工作照片',
            },
          ]}
        />
      ) : (
        //---------数据---------
        <Content
          operations={[
            {
              // name: 'eye',
              img:'look',
              onPress: handleMember,
              disabled: !nowEdit,
            },
            {
              // name: 'stethoscope',
              img:'disList',
              onPress: () => handlePlanOrGenesis('GenesisEdit'),
              disabled: !nowEdit,
            },
            {
              // name: 'book-plus',
              img: 'maintainPlan',
              onPress: () => handlePlanOrGenesis('PlanEdit'),
              disabled: !nowEdit,
            },
          ]}>
          <View style={[tailwind.flexRow, tailwind.flex1]}>
            <View style={[styles.card, theme.primaryBgStyle]}>
              <Tabs
                style={[tailwind.flex1]}
                defaultActive="部件"
                onChangeTab={() => setNowEdit(null)}
                tabs={[
                  {
                    key: '部件',
                    name: '部件',
                    component: (
                      <>
                        <View style={styles.tableBox}>
                          <Table.Header>
                            <Table.Title title="选择" flex={1} />
                            <Table.Title title="部件" flex={2} />
                            <Table.Title title="检测进度" flex={3} />
                            <Table.Title title="数量" flex={2} />
                            <Table.Title title="编辑时间" flex={3} />
                          </Table.Header>
                          <FlatList
                            scrollEnabled={false}
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
                          <Button onPress={handleEdit} style={[{backgroundColor:'#2b427d'}]}>编辑部件</Button>
                          <Table.Pagination
                            // pageNo={table1PageNo}
                            onPageChange={setTable1PageNo}
                            numberOfPages={table1Data.length}
                          />
                        </View>
                      </>
                    ),
                  },
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
                            scrollEnabled={false}
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
                          <Button onPress={handleEdit} style={[{backgroundColor:'#2b427d'}]}>编辑部件</Button>
                          <Table.Pagination
                            // pageNo={table2PageNo} // 页码数字的背景色
                            onPageChange={setTable2PageNo}
                            numberOfPages={table2Data.length}
                          />
                        </View>
                      </>
                    ),
                  },
                ]}
              />
            </View>
            <View style={tailwind.mX2} />
            <View style={[styles.card, theme.primaryBgStyle]}>
              <Text style={[tailwind.fontBold, {color: '#2b427d'}]}>
                全局描述
              </Text>
              <View style={[tailwind.flexRow, tailwind.mY2]}>
                <View style={tailwind.flex1}>{getImg('front', '正面照')}</View>
                <View style={tailwind.mX2} />
                <View style={tailwind.flex1}>{getImg('facade', '立面照')}</View>
              </View>
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
      <MemberEdit ref={memberEditRef} onClose={handleEditClose} />
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
});
