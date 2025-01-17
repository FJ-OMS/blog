import { Transaction } from "sequelize/types";
import DB from "@/db";
import { Op } from "sequelize";
/**
 * 删除文章进行的事务处理
 * @params article_id {number} 被删除文章的ID
 * @return {boolean} 结果
 */
async function transaction(article_id: number, t: Transaction) {
  //删除收藏
  let deleteCollection = await DB.Collection.destroy({
    where: {
      article_id: article_id,
    },
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);

  //删除评论
  let deleteComment = await DB.Comment.destroy({
    where: {
      article_id: article_id,
    },
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);

  //删除文章创建的通知
  let deleteArticleNotice = await DB.Notice.destroy({
    where: {
      relation_id: article_id,
    },
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);

  // 该文章下的评论列表
  let commentList = await DB.Comment.findAll({
    where: { article_id: article_id },
    attributes: ["id"],
    raw: true,
  })
    .then(rows => rows.map(item => item.id))
    .catch(() => false as false);

  //删除文章创建的通知
  let deleteCommentNotice = await DB.Notice.destroy({
    where: {
      relation_id: commentList,
      type: { [Op.or]: ["comment", "article_comment"] },
    },
    transaction: t,
  })
    .then(() => true)
    .catch(() => false);

  return (
    deleteCollection && deleteComment && deleteArticleNotice && commentList && deleteCommentNotice
  );
}

export default transaction;
