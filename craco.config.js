// craco.config.js
const path = require("path");

//定义函数resolve,将你想要自定义的路径和js的根路劲作拼接
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  webpack: {
    alias: {
      //名称:路径
      "@": resolve("src")
    }
  }
}
