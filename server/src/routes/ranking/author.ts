import Router from "@koa/router";
import DB from "@/db";
import Sequelize from "@/db/config";
import Models from "@/db";
import moment from "moment";
let router = new Router();

router.get("/author-ranking", async ctx => {
  let time = moment(+new Date() - 604_800_000).format("YYYY-MM-DD hh:mm:ss");
  let data = await DB.User.findAll({
    attributes: [
      "id",
      "name",
      "auth",
      "avatar_file_name",
      "avatar_url",
      "description",
      "unit",
      "location",
      // 根据7日内发布的文章数量排序
      [
        Sequelize.literal(
          `(select count(id) from article where article.author=user.id and article.state=1 and article.create_time>"${time}")`
        ),
        "article_count",
      ],
    ],
    offset: 0,
    limit: 5,
    order: [["article_count", "desc"]],
  })
    .then(rows => rows)
    .catch(() => []);
  ctx.body = {
    success: true,
    message: "查询作者榜",
    data: data,
  };
});
export default router;
// SELECT `id`, `name`, `auth`, `avatar_file_name`, `description`, `unit`, `location`, (select count(id) from article where article.author=user.id and article.state=1 and article.create_time>"2022-01-04") AS `article_count` FROM `user` AS `User` ORDER BY `article_count` DESC LIMIT 0, 5;
