import React from 'react';
import NavigatorStack from '../../../components/NavigatorStack';
import ProjectDetail from './ProjectDetail';
import Project from './Project';
import Index from './BridgeTest/Index';
import { Provider as SynergyProvider } from '../Detect/SynergyProvider'

export default function () {
  const routes = [
    {
      name: 'Collection/Detect/Project',
      component: Project,
    },
    {
      name: 'Collection/Detect/ProjectDetail',
      component: ProjectDetail,
    },
    {
      name: 'Collection/Detect/BridgeTest',
      component: Index,
    },
  ];

  return <SynergyProvider><NavigatorStack routes={routes} /></SynergyProvider>;
}
