const express = require("express");
const { kill } = require("cross-port-killer");
const next = require("next");
const Redis = require("./redis");
const readingRecords = require("./readingRecords");
const port = 5678; //端口
const app = next({
  dev: process.env.NODE_ENV == "development",
  dir: "./",
});

let RedisHTML = Redis(1);
// 每次启动时候清空全部页面缓存
RedisHTML.flushdb();
// nextjs原生请求处理函数
const handle = app.getRequestHandler();
//渲染和处理缓存
async function renderAndCache(req, res) {
  let pagePath = req.path;
  let queryParams = req.query;
  // 如果缓存中有直出的html数据，就直接将缓存内容响应给客户端
  if (await RedisHTML.exists(pagePath)) {
    res.send(await RedisHTML.get(pagePath));
    readingRecords(req);
    return;
  }
  // 如果没有当前缓存，调用renderToHTML生成直出html
  app
    .renderToHTML(req, res, pagePath, queryParams)
    .then(async html => {
      // 响应直出内容
      res.send(html);
      if (res.statusCode === 200) {
        readingRecords(req);
        if (JSON.stringify(req.query) === "{}") {
          RedisHTML.set(pagePath, html + "");
        }
      }
    })
    .catch(err => {
      app.renderError(err, req, res, pagePath, queryParams);
    });
}
async function main() {
  await app.prepare(); //准备(初始化)
  const server = express();
  //对哪些页面进行缓存
  server.get(`/article/*`, (req, res) => renderAndCache(req, res));
  server.get("*", (req, res) => handle(req, res));
  await kill(port).catch(() => {
    console.log(`端口${port}关闭失败！`);
  });
  server.listen(port, () => {
    console.log(`>开始运行于： http://localhost:${port}`);
  });
}
main();
