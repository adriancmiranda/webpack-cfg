<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

<h1 align="center">webpack-cfg</h1>

<blockquote align="center">
  <p>A distribution board for webpack</p>
</blockquote>

[![stability]][stability-url] [![xo]][xo-url] [![deps]][deps-url] [![depsci]][depsci-url] [![travis]][travis-url] [![appveyor]][appveyor-url]

<h2 align="center">Install</h2>

```bash
npm i -D webpack-cfg
```

<h2 align="center">Usage</h2>

<h3 align="center">package.json</h3>

```json
{
  "scripts": {
    "build": "webpack --config bin --env.run client-build,server-build"
  }
}
```

<h3 align="center">bin/index.js</h3>

```javascript
const webpackCfg = require('webpack-cfg');

const pipeline = webpackCfg({
  client: './configs/**/client-*.js',
  server: './configs/**/server-*.js',
});

module.exports = pipeline.setConfig((common, client, server) => {
  common.set('cwd', process.cwd());
  common.set('context', process.cwd());
  common.set('path.public', '/')
  common.set('path.output', './dist');
  server.set('path.entry', './server/index.js');
  client.set('path.output', './dist/static');
  client.set('path.entry', './source/client.js');
});

public.on('config', console.log);
```

<h3 align="center">bin/configs/client-build.js</h3>

```javascript
const { baseTemplate } = require('webpack-cfg/templates');

module.exports = get => baseTemplate(get).cfg({
  name: 'client-build',
  context: get('context'),
  entry: get('cwd', get('path.entry')),
  output: {
    path: get('path.output'),
    publicPath: get('path.public'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js',
  },
});
```

<h3 align="center">bin/configs/server-build.js</h3>

```javascript
module.exports = get => ({
  name: 'server-build',
  context: get('context'),
  entry: get('cwd', get('path.entry')),
  output: {
    path: get('path.output'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js',
  },
});
```

<h2 align="center">License</h2>

<p align="center">MIT</p>


[xo]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo-url]: https://github.com/sindresorhus/xo

[npm]: https://img.shields.io/npm/v/webpack-cfg.svg
[npm-url]: https://npmjs.com/package/webpack-cfg

[travis]: https://travis-ci.org/adriancmiranda/webpack-cfg.svg?branch=master
[travis-url]: https://travis-ci.org/adriancmiranda/webpack-cfg

[appveyor]: https://ci.appveyor.com/api/projects/status/hucvow1n0t3q3le3/branch/master?svg=true
[appveyor-url]: https://ci.appveyor.com/project/adriancmiranda/webpack-cfg/branch/master

[deps]: https://david-dm.org/adriancmiranda/webpack-cfg.svg
[deps-url]: https://david-dm.org/adriancmiranda/webpack-cfg

[depsci]: https://dependencyci.com/github/adriancmiranda/webpack-cfg/badge
[depsci-url]: https://dependencyci.com/github/adriancmiranda/webpack-cfg

[stability]: http://badges.github.io/stability-badges/dist/experimental.svg
[stability-url]: https://cdn.meme.am/cache/instances/folder481/500x/9689481.jpg
