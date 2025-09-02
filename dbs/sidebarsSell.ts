import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebarsSell: SidebarsConfig = {
  sellSidebar: [
    'overview',
    {
      type: 'category',
      label: 'Physical Sales',
      items: [
        'physical/real-estate-marketing-sales',
        'physical/construction-services-bidding-crm',
        'physical/channel-partnerships',
      ],
    },
    {
      type: 'category',
      label: 'Digital Sales',
      items: [
        'digital/saas-monetization-pricing',
        'digital/ecommerce-funnels',
        'digital/customer-success-retention',
      ],
    },
    {
      type: 'category',
      label: 'Hybrid Sales',
      items: [
        'hybrid/proptech-contech-gtm',
        'hybrid/omnichannel-phygital',
        'hybrid/data-smart-building-monetization',
      ],
    },
    {
      type: 'category',
      label: 'Market Analysis & Strategy',
      items: ['market-analysis-and-strategy/overview'],
    },
  ],
};

export default sidebarsSell;
