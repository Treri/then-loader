
 var path = require('path');

module.exports = function () {};
module.exports.pitch = function (remainingRequest) {
  this.cacheable && this.cacheable();
  var query = this.query.substring(1).split(','),
    promiseLib = query[0],
    bundleName = query[1] || '';
  var filename = path.basename(remainingRequest);
  var name = path.basename(remainingRequest, path.extname(filename));

  bundleName = bundleName.replace(/\[filename\]/g, filename).replace(/\[name\]/g, name);

  if (!promiseLib) {
    throw new Error('You need to specify your Promise library of choice, e.g. require("then?bluebird!./file.js")');
  }

  var result = [
    (promiseLib !== 'global') ? 'var Promise = require(' + JSON.stringify(promiseLib) + ');\n' : '',
    'module.exports = new Promise(function (resolve) {\n',
    '  require.ensure([], function (require) {\n',
    '    resolve(require(', JSON.stringify('!!' + remainingRequest), '));\n',
    '  }' + (bundleName && (', ' + JSON.stringify(bundleName))) + ');\n',
    '});'
  ];

  return result.join('');
};
