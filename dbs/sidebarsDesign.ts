import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebarsDesign: SidebarsConfig = {
  designSidebar: [
    'overview',
    {
      type: 'category',
      label: 'Physical Design',
      items: [
        'physical/architecture-bim',
        'physical/industrial-product-design',
        'physical/spatial-urban-design',
      ],
    },
    {
      type: 'category',
      label: 'Digital Design',
      items: [
        'digital/ux-ui-design-systems',
        'digital/service-design-blueprints',
        'digital/software-data-architecture',
      ],
    },
    {
      type: 'category',
      label: 'Hybrid Approaches',
      items: [
        'hybrid/digital-twins',
        'hybrid/vr-ar-phygital',
        'hybrid/smart-building-iot-design',
      ],
    },
    {
      type: 'category',
      label: 'Methodologies',
      items: [
        'methodology/design-thinking-hcd',
        'methodology/lean-agile-design-sprints',
        'methodology/computational-parametric',
      ],
    },
    {
      type: 'category',
      label: 'Tools & Software',
      items: ['tools-and-software/overview'],
    },
  ],
};

export default sidebarsDesign;
