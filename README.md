## A fork of [promise-loader](https://github.com/gaearon/promise-loader) with needless call to return a promise

### Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

This is a ripoff of [bundle-loader](https://github.com/webpack/bundle-loader) that uses promises instead of callbacks.
It only implements so-called `lazy` `bundle-loader` mode—that is, `require` returns a function that, when invoked, returns a promise that resolves to the module.

`require: (string) -> Promise<module>`

It's up to you to specify your Promise library of choice as a parameter.

``` javascript
// Assuming you use Bluebird
var load = require("then?bluebird!./file.js");

// load is a promise, and is resolved when file.js loaded
load.then(function(file) {

});
```

If a promise library is already loaded externally you can specify 'global'.


You can optionally specify [a name for your chunk](http://webpack.github.io/docs/code-splitting.html#named-chunks) after a comma:

```javascript
var load = require("then?bluebird,editor!./editor.js");
```

This can be useful for [single-page apps](http://webpack.github.io/docs/optimization.html#single-page-app) because you can later extract filenames from [Webpack-generated stats](https://github.com/webpack/docs/wiki/node.js-api#stats) and pre-load specific bundles if you know user's going to hit them.

The bundle name may include `[filename]`, which will be replaced with the filename, and `[name]`, which omits the extension. This is useful for when you want to configure loaders in Webpack configuration without specifying precise filenames—for example, by a suffix:

```javascript
{
  test: /\.i18n\.json$/,
  loader: 'then?global,[name].i18n'
}
```

### License
MIT
