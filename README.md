# Source Code
Design Build Sell website's source code is hosted here. Export to be copied to the (live) website folder on designbuildsell github account.


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

`_wip` folder being used to store work in progress content

---

### Algolia

Search provided by [Algolia](https://dashboard.algolia.com/)

### NPM

npm packages used other than docusaurus default

```bash title="react-youtube"
npm install react-youtube
```
One try each quarter???

branch name

edit that





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

???

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

