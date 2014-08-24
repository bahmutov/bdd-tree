var falafel = require('falafel');
require('lazy-ass');

var describes = [];
var its = [];
var currentDescribe;

function isBddBlock(name, node) {
  /*
    Typical 'describe' (or 'it') block
    describe('foo', function fooBlock() {
      ...
    });
    when node is BlockStatement, then we go up:
      functional declaration, call statement with
      callee name equal to 'describe'

    return name
  */
  la(name === 'describe' || name === 'it', 'invalid name', name);
  return node.type === 'BlockStatement' &&
    node.parent &&
    node.parent.parent &&
    node.parent.parent.callee &&
    node.parent.parent.callee.name === name &&
    node.parent.parent.arguments[0].value;
}

var isDescribe = isBddBlock.bind(null, 'describe');
var isIt = isBddBlock.bind(null, 'it');

function stripFirstAndLastBraces(src) {
  return src.replace(/^\s*\{\n/, '')
    .replace(/\}$/, '')
    .trim();
}

function toTree(node) {
  // console.log(node.type, node.name);
  if (node.type === 'BlockStatement') {
    // console.log(node.source())
    // console.log('parent', node.parent.parent.callee.name)
    // console.log(node.parent.parent);
    var callName;
    if (callName = isDescribe(node)) {

      // console.log(node.parent.parent);
      var src = node.source();
      src = stripFirstAndLastBraces(src);

      var currentDescribe = {
        name: callName,
        code: src,
        its: its
      };
      describes.push(currentDescribe);

      its = [];
    } else if (callName = isIt(node)) {
      // console.log('found it', callName);
      var src = node.source();
      src = stripFirstAndLastBraces(src);

      its.push({
        name: callName,
        code: src
      });
    }
  }
}

function bddToTree(source) {
  describes = [];
  its = [];

  falafel(source, toTree);

  if (its.length) {
    // any remaining unit tests will be part of
    // anonymous describe
    describes.push({
      name: '',
      code: '',
      its: its
    });
  }
  return describes;
}

module.exports = bddToTree;
