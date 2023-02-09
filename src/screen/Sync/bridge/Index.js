import React from 'react';
import {ProgressBar} from 'react-native-paper';
import Tabs from '../../../components/Tabs';
import {View, Text, StyleSheet} from 'react-native';
import {tailwind} from 'react-native-tailwindcss';
import {useFocusEffect} from '@react-navigation/native';
import {Box} from '../../../components/CommonView';
import {Context as GlobalContext} from '../../../providers/GlobalProvider';
import {Context as ThemeContext} from '../../../providers/ThemeProvider';
import {Context} from '../Provider';
import * as bridge from '../../../database/bridge';
import Synced from './Synced';
import NotSync from './NotSync';
// import Synchronizing from './Synchronizing';

export default function Bridge({navigation}) {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const {
    state: {userInfo},
  } = React.useContext(GlobalContext);

  const {
    dispatch,
    state: {bridgeUploadingIds, bridgeFefreshFlg, bridgeUploadEndIds},
  } = React.useContext(Context);

  const [active, setActive] = React.useState('未上传');

  const [list, setList] = React.useState([]);

  const tabs = [
    {
      key: '未上传',
      name: '未上传',
    },
    {
      key: '已上传',
      name: '已上传',
    },
  ];

  useFocusEffect(
    React.useCallback(() => {
      if (userInfo || bridgeFefreshFlg) {
        bridge.list(userInfo.userid).then(setList);
      }
    }, [userInfo, bridgeFefreshFlg]),
  );

  const handleUpload = e => {
    dispatch({
      type: 'bridgeUploadingIds',
      payload: Array.from(new Set([...e])),
    });
  };

  const renderTable = () => {
    switch (active) {
      case '未上传':
        return (
          <NotSync
            onUpload={handleUpload}
            list={list.filter(
              ({upload_date, id}) =>
                !upload_date && !bridgeUploadingIds.find(it => it === id),
            )}
          />
        );
      case '已上传':
        return (
          <Synced
            onUpload={handleUpload}
            list={list.filter(
              ({upload_date, id}) =>
                upload_date && !bridgeUploadingIds.find(it => it === id),
            )}
          />
        );
      default:
    }
  };

  return (
    <Box
      headerItems={[
        {
          name: '数据同步',
          onPress: () => navigation.navigate('Collection/Sync/Main'),
        },
        {
          name: '同步桥梁数据',
        },
      ]}>
      <View style={[tailwind.flex1, tailwind.pY2]}>
        <View style={[styles.tab]}>
          <Tabs onChangeTab={setActive} defaultActive="未上传" tabs={tabs} style={[{position:'absolute',left:73}]} />
          <View style={[tailwind.mY2]}></View>
          {bridgeUploadingIds.length ? (
            <View style={[styles.progressBar]}>
              <Text style={tailwind.mR2}>
                上传中({bridgeUploadEndIds.length}/{bridgeUploadingIds.length})
              </Text>
              <ProgressBar
                progress={bridgeUploadEndIds.length / bridgeUploadingIds.length}
                style={[tailwind.rounded, tailwind.w40, tailwind.h3]}
                color={theme.primaryColor}
              />
            </View>
          ) : (
            <></>
          )}
        </View>
        {renderTable()}
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  tab: {
    ...tailwind.flexRow,
    ...tailwind.justifyBetween,
    ...tailwind.pX16,
    ...tailwind.mB2,
  },
  card: {
    ...tailwind.flex1,
    ...tailwind.shadow2xl,
    ...tailwind.rounded,
    ...tailwind.p2,
  },
  progressBar: {
    ...tailwind.itemsCenter,
    ...tailwind.flexRow,
    ...tailwind.mR1,
  },
});
