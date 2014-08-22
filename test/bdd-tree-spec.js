var toTree = require('../bdd-tree');
require('lazy-ass');
var fs = require('fs');

describe('bdd-tree', function () {
  it('is a function', function () {
    la(typeof toTree === 'function');
  });

  it('can process this file', function () {
    var src = fs.readFileSync(__filename, 'utf8');
    la(typeof src === 'string');
    var describes = toTree(src);
    la(Array.isArray(describes));
  });
});
