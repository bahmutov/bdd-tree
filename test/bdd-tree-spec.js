var toTree = require('../bdd-tree');
require('lazy-ass');
var check = require('check-types');

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

  it('describe has valid source code', function () {
    var describes = toTree(src);
    la(check.unemptyString(describes[0].code));
    // console.log(describes[0].code);
  });

  it('detects it blocks', function () {
    var describes = toTree(src);
    // console.log(describes[0]);
    var its = describes[0].its;
    la(Array.isArray(its));
    la(its.length > 3);
  });
});
