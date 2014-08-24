var falafel = require('falafel');
require('lazy-ass');

var describes = [];

function isDescribeBlockStatement(node) {
  /*
    Typical 'describe' block
    describe('foo', function fooBlock() {
      ...
    });
    when node is BlockStatement, then we go up:
      functional declaration, call statement with
      callee name equal to 'describe'
  */
  return node.type === 'BlockStatement' &&
    node.parent &&
    node.parent.parent &&
    node.parent.parent.callee &&
    node.parent.parent.callee.name === 'describe';
}

function toTree(node) {
  // console.log(node.type, node.name);
  if (node.type === 'BlockStatement') {
    // console.log(node.source())
    // console.log('parent', node.parent.parent.callee.name)
    // console.log(node.parent.parent);
    if (isDescribeBlockStatement(node)) {
      var describeName = node.parent.parent.arguments[0].value;
      // console.log(node.parent.parent);
      describes.push({
        name: describeName,
        code: node.source()
      });
    }
  }
}

function bddToTree(source) {
  describes = [];

  falafel(source, toTree);

  return describes;
}

module.exports = bddToTree;
