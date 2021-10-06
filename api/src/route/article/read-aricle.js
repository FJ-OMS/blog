const express = require("express");
const app = express();
const router = express.Router();
const pool = require("@/modules/pool");
const switchArticleModel = require('@/modules/switchArticleModel.js');

router.get("/article", async (req, res) => {
  const key = req.query?.key?.join(",");
  const router = req.params.router;
  const show = req.query.show;
  const sql = `select ${key || "*"} from article${show ? " where isShow=1" : ""};`;
  console.log(sql);

  let [data] = await pool.query(sql);
  let needDecode = ["article", "introduce", "title"];
  data.map(item => {
    return switchArticleModel(item);
  });
  res.json({
    success: true,
    message: `查询${router || "全部文章"}成功`,
    data: data,
  });
});
module.exports = router;