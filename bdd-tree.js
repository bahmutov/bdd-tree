var falafel = require('falafel');
require('lazy-ass');

var describes = [];

function toTree(node) {
  // console.log(node.type, node.name);
  if (node.type === 'BlockStatement') {
    // console.log(node.source())
    // console.log('parent', node.parent.parent.callee.name)
    // console.log(node.parent.parent);
    var name = node.parent.parent.callee.name;
    if (name === 'describe') {
      var describeName = node.parent.parent.arguments[0].value;
      // console.log(node.parent.parent);
      describes.push({
        name: describeName,
        code: node.source()
      });
    }
  }
  /*
  if (node.type === 'Identifier' && node.name === 'describe') {
    // console.log(node);
    // console.log(node.parent.arguments[1].body.body)
    // if (node.parent.arguments.length === 2) {
      // console.log(node.parent.arguments[1].body.source());
      describes.push({
        name: node.parent.arguments[0].value,
        code: node.code
      });
    // }
  }*/
}

function bddToTree(source) {
  describes = [];

  falafel(source, toTree);

  return describes;
}

module.exports = bddToTree;
