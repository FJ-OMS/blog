const express = require('express')
const app = express()
const router = express.Router()
let pool = require('../../modules/pool')
router.put('/article/:router', (req, res) => {
    // path的router是数据库的原始路由也就是旧路由，参数的路由时传来的路由，防止用户需要修改修改路由
    let router = req.params.router;
    let params = req.body;
    (async () => {
        const [rows] = await pool.query(` 
        UPDATE article SET 
        router='${params.router}',
        type='${params.type}',
        title='${params.type}',
        introduce = '${params.introduce}',
        article = '${params.article}',
        isTop=${params.isTop},
        isShow=${params.isShow}
        WHERE router='${router}';`);
        if (rows.affectedRows) {
            res.json({
                success: true,
                message: `修改成功`,
            })
        } else {
            res.json({
                success: false,
                message: `SQL执行成功但修改失败，没有找到对应的router`,
            })
        }
    })();
})
module.exports = router;