"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.async-iterator.js");

/**
 * 中间有n个导出，为了方便截图删掉用...替代
 */
....

require("core-js/modules/web.url.to-json.js");

require("core-js/modules/web.url-search-params.js");

require("regenerator-runtime/runtime");

var odds = evens.map(function (v) {
  return v + 1;
});
var nums = evens.map(function (v, i) {
  return v + i;
}); // Statement bodies

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
};
new Promise();