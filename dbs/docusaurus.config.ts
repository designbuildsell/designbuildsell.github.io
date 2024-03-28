import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Design Build Sell',
  tagline: 'Learn to build better. Together!',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://designbuildsell.xyz',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'designbuildsell', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your repo name.

  onBrokenLinks: 'warn',//use 'throw' instead to stop 'npm run build' on broken links
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          id: 'design',
          // id: 'product', // omitted => default instance
          path: 'design-doc',
          routeBasePath: 'design',
          sidebarPath: './sidebarsDesign.ts',
          //editUrl: 'https://github.com/designbuildsell/website...'
          // ... other options
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
						'https://github.com/designbuildsell/designbuildsell.github.io/tree/main/dbs/blog'	
            //'https://github.com/designbuildsell/designbuildsell.github.io/dbs/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'build',
        path: 'build-doc',
        routeBasePath: 'build',
        sidebarPath: './sidebarsBuild.ts',
        // ... other options
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'sell',
        path: 'sell-doc',
        routeBasePath: 'sell',
        sidebarPath: './sidebarsSell.ts',
        // ... other options
      },
    ] 
  ],
  /*
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          //To change docs folder to tutorial and /docs path to /tutorial
          //customDocsPath: 'tutorial',
          //routeBasePath: 'tutorial',
          
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
      } satisfies Preset.Options,
    ],
  ],
*/
  themeConfig: {
    // Replace with your project's social card
    image: 'img/favicon.ico',
    //Some meta tags for SEO
    metadata: [
      {name: 'keywords', content: 'design, build, sell, blog, tutorial, architecture, engineering, construction, software'},
      {name: 'twitter:card', content: 'summary_large_image'},
    ],

    //Navbar elements
    navbar: {
      title: '',
      logo: {
        alt: 'Design Build Sell Logo',
        src: 'img/logo.svg',
      },
      items: [
        /*{
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },*/
        {to: '/design', label: 'Design', position: 'left'},
        {to: '/build', label: 'Build', position: 'left'},
        {to: '/sell', label: 'Sell', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'right'},
        {to: '/', label: 'Tutorial', position: 'right'},
        /*{
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },*/
      ],
    },
    docs: {
      sidebar: {
        //makes sidebar hideable
        hideable: true,
        //other catergories auto collapse while expanding
        autoCollapseCategories: true,
      }
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Quick Access',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Tutorials',
              to: '/',
            },
            {
              label: 'Resources',
              to: '/',
            },
            {
              label: 'Books',
              to: '/',
            },
            {
              label: 'Tools',
              to: '/',
            },
          ],
        },

        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              to: 'https://discord.gg/s4f98vfxjT',
            },
            {
              label: 'Twitch',
              to: 'https://twitch.com/designbuildsell',
            },
            {
              label: 'Substack',
              to: 'https://designbuildsell.substack.com',
            },
            
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Twitter',
              to: 'https://twitter.com/designbuildsell',
            },
            {
              label: 'YouTube',
              //using href instead of to will result in an icon
              to: 'https://youtube.com/@designbuildsell',
            },
            {
              label: 'Instagram',
              to: 'https://instagram.com/designbuildsell.xyz',
            },

            {
              label: 'GitHub',
              to: 'https://github.com/designbuildsell',
            },
            
          ], 
        },
      ],
      copyright: `© Copyright ${new Date().getFullYear()} DesignBuildSell.xyz`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

