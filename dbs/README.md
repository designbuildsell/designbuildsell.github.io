# Source Code
Design Build Sell website's source code is hosted here. Export to be copied to the (live) website folder on designbuildsell github account.

## To Do

- skeleton content for all sections like design build sell book tool etc.
- React page for each section to pull together various content. Blog with design tag, Books with design tag and so on
- Database integration
- look into axios etc.
- Dont push to github until local build is satisfactory
- SEO properties edit. Google
- Algolia integration... dig deeper
- Imgur to host images??
- Notion databse integration .. eg https://www.makeuseof.com/react-notion-database-api-store-data/



## Workflow

For assets used see [designbuildsell_assets](https://github.com/aecabhijeet/designbuildsell_assets) repository

### Docusaurus

[Docusaurus](https://docusaurus.io/)

[Documentation](https://docusaurus.io/docs)

```bash
# Create new project using default template and typescript
npx create-docusaurus@latest my-website classic --typescript

# Change directory
cd my-website

# Start server
npm start
```
This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

```bash
# If cloned existing project from Github
# Install all packages
cd my-website
# Clean install of npm packages
npm ci

# Start server
npm start

```

#### Docs

Multiple plugin instances used to create documentation/tutorial related to Design, Build, Sell

atoms and bits??




#### Blog


#### Pages



#### Work In Progress

By default, files prefixed with `_`, test files `.test.js`, and files in `__tests__` directory are not turned into pages, and no routes are created (see the `exclude` option).

```
my-website
├── src
│   └── pages
│       ├── styles.module.css
│       ├── index.js
│       ├── _ignored.js
│       ├── _ignored-folder
│       │   ├── Component1.js
│       │   └── Component2.js
│       └── support
│           ├── index.js
│           └── styles.module.css
.
```

`_wip` folder redacted. See `designbuildsell_assets/wip` being used to store work in progress content including templates.

---

### Algolia

Search provided by [Algolia](https://dashboard.algolia.com/)

See [Docusaurus Search Documentation](https://docusaurus.io/docs/search#using-algolia-docsearch)



### NPM

npm packages used other than docusaurus default

```bash title="react-youtube"
npm install react-youtube
```

#### Data Tables

[Link](https://datatables.net/download/npm)



### SEO

To prevent a single page from being indexed, use <meta name="robots" content="noindex"> as page metadata.



### Deployment

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

> React doesn't like a `build` directory with content. Therefore we switched to `build-doc` directory to keep things simple.


```bash
npm run --prefix ??
```

It is important to test your build locally before deploying it for production.


```bash
npm run serve
```

