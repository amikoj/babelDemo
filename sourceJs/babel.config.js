// babel.config.js

const presets =   [[
    "@babel/preset-env",
    {
      "useBuiltIns": "entry",
      "corejs": 3 // 當前 core-js 版本
    }
  ]];
    
module.exports = { presets };