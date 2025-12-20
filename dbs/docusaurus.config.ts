import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import bookData from './src/data/books.json'; 

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

  onBrokenLinks: 'warn', // or 'ignore' if you want to completely suppress the errors
  onBrokenAnchors: 'warn', // optional: for broken anchor links
  markdown: {
    hooks: {
    onBrokenMarkdownLinks: 'warn',
    // Other markdown-related hooks can go here
    },
  },

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
        docs: false,
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/designbuildsell/designbuildsell.github.io/tree/main/dbs/',
          /**
           * Blog feed configuration
           * This controls the generation of the RSS and Atom feeds for your blog posts.
           */
          feedOptions: {
            type: 'all', // RSS, Atom, or both
            title: 'Design Build Sell Blog',
            description: 'The latest articles and tutorials from the Design Build Sell.',
            copyright: `Copyright © ${new Date().getFullYear()} DesignBuildSell.xyz`,
            // The `createFeedItems` function allows customization of feed items.
            // By default, it includes posts that are not drafts.
            // The frontmatter `rss: false` can be used to exclude specific posts.
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-XXXXXXXXXX', // Your GA4 measurement ID
          anonymizeIP: false, // Optional
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    './plugins/webpack-config',
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'design',
        path: 'design-docs',
        routeBasePath: 'design',
        sidebarPath: false, // './sidebarsDesign.ts', uncomment when content available
        editUrl: 'https://github.com/designbuildsell/designbuildsell.github.io/tree/main/dbs/',
        // ... other options
      },
    ],    
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'build',
        path: 'build-docs',
        routeBasePath: 'build',
        sidebarPath: false, //'./sidebarsBuild.ts', uncomment when content available
        editUrl: 'https://github.com/designbuildsell/designbuildsell.github.io/tree/main/dbs/',
        // ... other options
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'sell',
        path: 'sell-docs',
        routeBasePath: 'sell',
        sidebarPath: false, //'./sidebarsSell.ts', uncomment when content available
        editUrl: 'https://github.com/designbuildsell/designbuildsell.github.io/tree/main/dbs/',
        // ... other options
      },
    ],
    //'@docusaurus/plugin-ideal-image',
    function booksPlugin(context, options) {
      return {
        name: 'docusaurus-books-plugin',
        async contentLoaded({content, actions}) {
          const {addRoute, createData} = actions;

          // 1. Create a single JSON file for all books to be used by the index page (optional, but good practice)
          // const booksJsonPath = await createData(
          //   'books.json',
          //   JSON.stringify(bookData),
          // );

          // 2. Create Static Detail Pages for every book
          await Promise.all(
            bookData.map(async (book) => {
              // Create a unique JSON file for this specific book
              const bookJsonPath = await createData(
                `book-${book.slug}.json`,
                JSON.stringify(book)
              );

              addRoute({
                path: `/books/${book.slug}`,
                component: '@site/src/templates/BookDetail.tsx',
                exact: true,
                // Pass the path to the created JSON file as a module
                // The component will receive this as a prop named 'bookData'
                modules: {
                  bookData: bookJsonPath,
                },
              });
            })
          );
        },
      };
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/favicon.ico',
    //Some meta tags for SEO
    metadata: [
      {name: 'keywords', content: 'design, build, sell, architecture, engineering, construction, software, product, saas, blog, tutorial'},
      {name: 'twitter:card', content: 'summary_large_image'},
    ],
    //Algolia Doc Search
    algolia: {
      // The application ID provided by Algolia
      appId: '63QQXNG86J',

      // Public API key: it is safe to commit it
      apiKey: '5cde40ad852e8fe5ed0af1acc6879771',

      //Temporary name. Can be refined when the content gets more structured.
      indexName: 'Master',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      //externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      //replaceSearchResultPathname: {
      //  from: '/docs/', // or as RegExp: /\/docs\//
      //  to: '/',
      //},

      // Optional: Algolia search parameters
      //searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      //... other Algolia params
    },
    // Color theme
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      // match user's system theme
      respectPrefersColorScheme: true,
    },


    //Navbar elements
    navbar: {
      title: '',
      logo: {
        alt: 'Design Build Sell Logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/design', label: 'Design', position: 'left'},
        {to: '/build', label: 'Build', position: 'left'},
        {to: '/sell', label: 'Sell', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'right'},
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
      /*logo: {
        alt: 'Design Build Sell Logo',
        src: 'img/footer.png',
        //href: 'https://opensource.fb.com',
        width: 32,
        height: 32,
      }*/
      links: [
        {
          title: 'Quick Access',
          items: [
            {
              label: 'About',
              to: '/about',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Community',
              to: '/community',
            },
            {
              label: 'Resources',
              to: '/resources',
            },
            {
              label: 'Books',
              to: '/books',
            },
            {
              label: 'Tutorials',
              to: '/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              html: `
                <a href="https://discord.gg/s4f98vfxjT" class="footer__link-item" target="_blank" rel="noopener noreferrer">
                  <span class="footer-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.11 13.11 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.293a.077.077 0 01-.006.127 12.3 12.3 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.84 19.84 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.158-2.419 1.21 0 2.175 1.096 2.157 2.42 0 1.333-.956 2.418-2.158 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.158 2.42 0 1.333-.956 2.418-2.158 2.418z"/>
                    </svg>
                  </span>
                  <span>Discord</span>
                </a>
              `,
            },
            {
              html: `
                <a href="https://twitch.com/designbuildsell" class="footer__link-item" target="_blank" rel="noopener noreferrer">
                  <span class="footer-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                    </svg>
                  </span>
                  <span>Twitch</span>
                </a>
              `,
            },
            {
              html: `
                <a href="https://designbuildsell.substack.com" class="footer__link-item" target="_blank" rel="noopener noreferrer">
                  <span class="footer-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.539 8.243H1.46V5.406h21.08v2.837zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM1.46 0h21.08v2.843H1.46V0z"/>
                    </svg>
                  </span>
                  <span>Newsletter</span>
                </a>
              `,
            },
            {
              html: `
                <a href="/blog/rss.xml" target="_blank" rel="noopener noreferrer" class="footer__link-item">
                  <span class="rss-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.199 24C19.199 13.467 10.533 4.8 0 4.8V0c13.165 0 24 10.835 24 24h-4.801zM3.291 17.415c1.814 0 3.293 1.479 3.293 3.295 0 1.813-1.485 3.29-3.301 3.29C1.47 24 0 22.526 0 20.71s1.475-3.294 3.291-3.295zM15.909 24h-4.665c0-6.169-5.075-11.245-11.244-11.245V8.09c8.727 0 15.909 7.184 15.909 15.91z"/>
                    </svg>
                  </span>
                  <span>RSS</span>
                </a>
              `,
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              html: `
                <a href="https://twitter.com/designbuildsell" class="footer__link-item" target="_blank" rel="noopener noreferrer">
                  <span class="footer-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </span>
                  <span>Twitter</span>
                </a>
              `,
            },
            {
              html: `
                <a href="https://youtube.com/@designbuildsell" class="footer__link-item" target="_blank" rel="noopener noreferrer">
                  <span class="footer-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.5 6.5a2.5 2.5 0 00-1.768-2.393C19.586 3.5 12 3.5 12 3.5s-7.586 0-9.732.607A2.5 2.5 0 00.5 6.5v11a2.5 2.5 0 001.768 2.393C4.414 20.5 12 20.5 12 20.5s7.586 0 9.732-.607A2.5 2.5 0 0023.5 17.5v-11zM9.6 15.4V8.6L16.2 12l-6.6 3.4z"/>
                    </svg>
                  </span>
                  <span>YouTube</span>
                </a>
              `,
            },
            {
              html: `
                <a href="https://instagram.com/designbuildsell.xyz" class="footer__link-item" target="_blank" rel="noopener noreferrer">
                  <span class="footer-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </span>
                  <span>Instagram</span>
                </a>
              `,
            },
            {
              html: `
                <a href="https://linktr.ee/designbuildsell" class="footer__link-item" target="_blank" rel="noopener noreferrer">
                  <span class="footer-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.5 10.5H15V15H13.5zM10.5 10.5H12V15H10.5z"/>
                      <path d="M12 7.5a4.5 4.5 0 014.5 4.5v9h-9v-9a4.5 4.5 0 014.5-4.5z"/>
                      <path d="M10.5 6h3V4.5h-3z"/>
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 21.6c-5.3 0-9.6-4.3-9.6-9.6S6.7 2.4 12 2.4s9.6 4.3 9.6 9.6-4.3 9.6-9.6 9.6z"/>
                    </svg>
                  </span>
                  <span>Linktree</span>
                </a>
              `,
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

