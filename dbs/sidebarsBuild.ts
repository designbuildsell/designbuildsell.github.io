import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebarsBuild: SidebarsConfig = {
  buildSidebar: [
    'overview',
    {
      type: 'category',
      label: 'Physical Build',
      items: [
        'physical-build/construction-management',
        'physical-build/prefab-modular',
        'physical-build/quality-safety',
      ],
    },
    {
      type: 'category',
      label: 'Digital Build',
      items: [
        'digital-build/sdlc-devops-cicd',
        'digital-build/platform-api-development',
        'digital-build/testing-deployment',
      ],
    },
    {
      type: 'category',
      label: 'Hybrid Build',
      items: [
        'hybrid-build/iot-implementation',
        'hybrid-build/robotics-automation-3d-printing',
        'hybrid-build/smart-construction-cps',
      ],
    },
    {
      type: 'category',
      label: 'Project Management',
      items: [
        'project-management/methods-risk',
        'project-management/coordination-tools',
      ],
    },
  ],
};

export default sidebarsBuild;
