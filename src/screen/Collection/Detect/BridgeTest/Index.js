/* 
  桥梁检测路由
 */
import React from 'react';
import NavigatorStack from '../../../../components/NavigatorStack';
import {Provider} from './Provider';
import Main from './Main';
import Member from './Member';
import GoodEdit from './GoodEdit';
import DiseaseList from './DiseaseList';
import DiseaseEdit from './DiseaseEdit';
import DiseaseEdit2 from './DiseaseEdit2';
import PlanEdit from './PlanEdit';
import GenesisEdit from './GenesisEdit';

export default function Index({route}) {
  const {project, bridge} = route.params;

  return (
    // bridge是这条桥梁的数据，project是项目信息
    <Provider bridge={bridge} project={project}>
      <NavigatorStack
        routes={[
          {
            name: 'Collection/Detect/BridgeTest/Main',
            component: Main,
          },
          {
            name: 'Collection/Detect/BridgeTest/Member',
            component: Member,
          },
          {
            name: 'Collection/Detect/BridgeTest/Member/GoodEdit',
            component: GoodEdit,
          },
          {
            name: 'Collection/Detect/BridgeTest/Member/DiseaseList',
            component: DiseaseList,
          },
          {
            name: 'Collection/Detect/BridgeTest/Member/DiseaseEdit',
            component: DiseaseEdit,
          },
          {
            name: 'Collection/Detect/BridgeTest/Member/DiseaseEdit2',
            component: DiseaseEdit2,
          },
          {
            name: 'Collection/Detect/BridgeTest/Member/PlanEdit',
            component: PlanEdit,
          },
          {
            name: 'Collection/Detect/BridgeTest/Member/GenesisEdit',
            component: GenesisEdit,
          },
        ]}
      />
    </Provider>
  );
}
