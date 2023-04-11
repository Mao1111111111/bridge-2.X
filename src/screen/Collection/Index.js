import React from 'react';
import {View} from 'react-native';
// import {useFocusEffect} from '@react-navigation/native';
import {tailwind} from 'react-native-tailwindcss';
import NavigatorDrawer from '../../components/NavigatorDrawer';
// import {Context as GlobalContext} from '../../providers/GlobalProvider';
import DataList from './DataList/Index';
import DetectIndex from './Detect/Index';

export default function Collection() {
  // const {dispatch} = React.useContext(GlobalContext);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     dispatch({
  //       type: 'FABItem',
  //       payload: [],
  //     });
  //   }, [dispatch]),
  // );

  return (
    <View style={[tailwind.flex1, tailwind.relative]}>
      {/* 抽屉路由 */}
      <NavigatorDrawer
        initialRouteName="Collection/Detect"
        routes={[
          {
            name: 'Collection/Detect',
            title: '检测平台',
            component: DetectIndex,
          },
          {
            name: 'Collection/DataList',
            title: '数据记录',
            component: DataList,
          },
        ]}
      />
    </View>
  );
}
