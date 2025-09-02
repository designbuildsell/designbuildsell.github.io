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
        'physical-design/architecture-bim',
        'physical-design/industrial-product-design',
        'physical-design/spatial-urban-design',
      ],
    },
    {
      type: 'category',
      label: 'Digital Design',
      items: [
        'digital-design/ux-ui-design-systems',
        'digital-design/service-design-blueprints',
        'digital-design/software-data-architecture',
      ],
    },
    {
      type: 'category',
      label: 'Hybrid Approaches',
      items: [
        'hybrid-approaches/digital-twins',
        'hybrid-approaches/vr-ar-phygital',
        'hybrid-approaches/smart-building-iot-design',
      ],
    },
    {
      type: 'category',
      label: 'Methodologies',
      items: [
        'methodologies/design-thinking-hcd',
        'methodologies/lean-agile-design-sprints',
        'methodologies/computational-parametric',
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
