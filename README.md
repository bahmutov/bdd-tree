# bdd-tree

> Transforms BDD source into syntax tree

[![NPM][bdd-tree-icon] ][bdd-tree-url]

[![Build status][bdd-tree-ci-image] ][bdd-tree-ci-url]
[![dependencies][bdd-tree-dependencies-image] ][bdd-tree-dependencies-url]
[![devdependencies][bdd-tree-devdependencies-image] ][bdd-tree-devdependencies-url]

Given a BDD spec like this

    // add-spec.js
    describe('add', function () {
      it('does something', ...);
      it('does something else', ...);
    });
    describe('sub', function () {
      it('minus', ...);
    });

you can produce a tree of `describe` and `it` code blocks

    npm install bdd-tree
    // index.js
    var toTree = require('bdd-tree');
    var describes = toTree(require('fs').readFileSync('./add-spec.js', 'utf8'));
    [{
      name: 'add',
      its: [{
        name: 'does something',
        code: ...
      }, {
        name: 'does something else',
        code: ...
      }],
      code: // entire code for describe callback
    }, {
      name: 'sub'
      ...
    }]

Can be used to analyze your specs. I use it to generate Markdown code blocks
from unit tests to avoid writing manual examples in jsdoc comments.
See [xplain](https://github.com/bahmutov/xplain) and
[grunt-xplain](https://github.com/bahmutov/grunt-xplain).

### Small print

Author: Gleb Bahmutov &copy; 2014

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/bdd-tree/issues) on Github

## MIT License

The MIT License (MIT)

Copyright (c) 2014 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[bdd-tree-icon]: https://nodei.co/npm/bdd-tree.png?downloads=true
[bdd-tree-url]: https://npmjs.org/package/bdd-tree
[bdd-tree-ci-image]: https://travis-ci.org/bahmutov/bdd-tree.png?branch=master
[bdd-tree-ci-url]: https://travis-ci.org/bahmutov/bdd-tree
[bdd-tree-dependencies-image]: https://david-dm.org/bahmutov/bdd-tree.png
[bdd-tree-dependencies-url]: https://david-dm.org/bahmutov/bdd-tree
[bdd-tree-devdependencies-image]: https://david-dm.org/bahmutov/bdd-tree/dev-status.png
[bdd-tree-devdependencies-url]: https://david-dm.org/bahmutov/bdd-tree#info=devDependencies
