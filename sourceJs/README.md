## 操作指南

前端项目工程化不断迭代更新，新的语法功能、特性让代码的书写变得更加舒服、简洁、易读、可维护。然而，对于浏览器的语法兼容性，却并不能很好的完美兼容新提出的语法、特性，不同版本的浏览器对于兼容语法方面也有着较大的差异。这时候，babel的出现可以说是应运而生，通过对于es2015+的语法进行编译适配，可以让我们更好的关注于业务本省、用最简洁的的代码完成需求，而不需要关注不同版本之间的兼容问题。Babel可以在不同测场景有着不同的使用，如下介绍的则是在cli（命令行）环境下，如何使用babel为我们的项目实现编译兼容。

1. 安装babel
```
$ npm init
$ npm install --save-dev @babel/core @babel/cli
```

@babel/cli: babel自带的cli工具，可通过命令编译文件
@babel/core： babel功能核心库，babel转换核心库，可做一些中间操作


2. 创建配置文件 babel.config.json/babel.config.js/.babelrc



配置文件用于配置babel的部分预设功能
```json
// babel.config.json

{
  "presets": ["@babel/preset-env"]  // 启动 es6语法转换功能
}

```

如上配置需要安装 **@babel/preset-env**库，

```shell

$ npm install --save-dev  @babel/preset-env

```

3、 创建一个js文件

```js
// Expression bodies
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);

// Statement bodies
nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v);
});

// Lexical this
var bob = {
  _name: "Bob",
  _friends: [],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
};

// Lexical arguments
function square() {
  let example = () => {
    let numbers = [];
    for (let number of arguments) {
      numbers.push(number * number);
    }

    return numbers;
  };

  return example();
}

square(2, 4, 7.5, 8, 11.5, 21); // returns: [4, 16, 56.25, 64, 132.25, 441]

```

4、 编译js

- 添加编译脚本
在package.json中添加:
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build:babel": "babel src -d lib"
  },
```

- 运行编译脚本

```
$ npm run build:babel

```

- 编译结果

```js
"use strict";
// lib/syntax.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
// Expression bodies
var odds = evens.map(function (v) { return v + 1;});
var nums = evens.map(function (v, i) {return v + i;}); // Statement bodies
nums.forEach(function (v) {
  if (v % 5 === 0) fives.push(v);
}); // Lexical this
var bob = {
  _name: "Bob",
  _friends: [],
  printFriends: function printFriends() {
    var _this = this;
    this._friends.forEach(function (f) {
      return console.log(_this._name + " knows " + f);
    });
  }
}; // Lexical arguments
function square() {
  var _arguments = arguments;
  var example = function example() {
    var numbers = [];
    var _iterator = _createForOfIteratorHelper(_arguments),
        _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var number = _step.value;
        numbers.push(number * number);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return numbers;
  };
  return example();
}
square(2, 4, 7.5, 8, 11.5, 21); // returns: [4, 16, 56.25, 64, 132.25, 441]
```

上面可以发现，使用@babel/preset预设编译可以完成es6的语法代码的转译（let、var、for...in、for...of等）,但对于es6中新增的api功能并不能完成编译（Array.map、Array.forEach、Promise等）。为此，我们需要对于es6中新增的api进行单独的转译


5、 es6 API编译

实现API的编译有两种实现方法
- @babel/runtime 

@babel/runtime 是由 Babel 提供的 polyfill 套件，由 core-js 和 regenerator 组成，core-js 是用于 JavaScript 的组合式标准库，它包含各种版本的 polyfills 实现；而 regenerator 是來自 facebook 的一个函数库，主要用于实现 generator/yeild，async/await 等特性。

- @babel/polyfill