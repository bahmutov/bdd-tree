var toTree = require('../bdd-tree');
require('lazy-ass');

describe('bdd-tree', function () {
  it('is a function', function () {
    la(typeof toTree === 'function');
  });

  var fs = require('fs');
  var src = fs.readFileSync(__filename, 'utf8');

  it('can process this file', function () {
    la(typeof src === 'string');
    var describes = toTree(src);
    la(Array.isArray(describes));
  });

  it('finds correct number describe blocks', function () {
    var describes = toTree(src);
    // console.log(describes)
    la(describes.length === 1); // in this file
    la(describes[0].name === 'bdd-tree');
  });
});
