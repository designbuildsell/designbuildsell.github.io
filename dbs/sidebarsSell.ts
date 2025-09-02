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
        'physical-sales/real-estate-marketing-sales',
        'physical-sales/construction-services-bidding-crm',
        'physical-sales/channel-partnerships',
      ],
    },
    {
      type: 'category',
      label: 'Digital Sales',
      items: [
        'digital-sales/saas-monetization-pricing',
        'digital-sales/ecommerce-funnels',
        'digital-sales/customer-success-retention',
      ],
    },
    {
      type: 'category',
      label: 'Hybrid Sales',
      items: [
        'hybrid-sales/proptech-contech-gtm',
        'hybrid-sales/omnichannel-phygital',
        'hybrid-sales/data-smart-building-monetization',
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
