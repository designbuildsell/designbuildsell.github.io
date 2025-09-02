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
        'physical/construction-management',
        'physical/prefab-modular',
        'physical/quality-safety',
      ],
    },
    {
      type: 'category',
      label: 'Digital Build',
      items: [
        'digital/sdlc-devops-cicd',
        'digital/platform-api-development',
        'digital/testing-deployment',
      ],
    },
    {
      type: 'category',
      label: 'Hybrid Build',
      items: [
        'hybrid/iot-implementation',
        'hybrid/robotics-automation-3d-printing',
        'hybrid/smart-construction-cps',
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
