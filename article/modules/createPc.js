function createPc(data) {
const {Base64} = require('js-base64');    let html = `
    <!DOCTYPE html>
<html lang="zn-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <meta name="application name" content="web博客分享:${Base64.decode(data.title)},写于：${data.time}">
    <meta name="keywords" content="${data.type}">
    <meta name="description" content="${Base64.decode(data.introduce)}">
    <meta name="author" content="菜鸡老刘">
    <meta name="copyright" content="菜鸡老刘：blog.blogweb.cn">
    <link rel="stylesheet" href="./css/pc.css">
    <link rel="stylesheet" href="./css/highLight.css">
    <title>${Base64.decode(data.title)}</title>
</head>
<body>
    <header>
        <div class="bar pc"></div>
        <a href="https://github.com/Lrunlin" class="github-corner" title="Follow me on GitHub"
            aria-label="Follow me on GitHub" rel="noopener" target="_blank"><svg width="80" height="80"
                viewbox="0 0 250 250" aria-hidden="true">
                <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
                <path
                    d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                    fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm" />
                <path
                    d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                    fill="currentColor" class="octo-body" /></svg></a>
    </header>
    <div id="container">
        <aside>
            <!-- 侧边栏顶部的黑色 -->
            <div class="head">
                <div class="name">名字还没想好</div>
                <div class="mes pc">消息也没想好</div>
            </div>
            <div class="show">
                <a href="https://blogweb.cn" class="router-link-active">首页</a>
                <a href = "https://blogweb.cn" > 文章分类
                    <span id="type">(个数)</span>
                </a>
                <a href="https://blogweb.cn">API分享</a>
                <a href="https://blogweb.cn">关于作者</a>
            </div>
            <div class="writer" id="writer">
                <div class="face-box">
                    <img src="./image/writer-face.jpg" alt="作者头像" class="face">
                </div>
                <div class="class pc">
                    <a href = "https://blogweb.cn" >
                        <p>11</p>
                        文章
                    </a>
                    <a href = "https://blogweb.cn" >
                        <p>11</p>
                        分类
                    </a>
                </div>
            </div>
        </aside>
        <article id="article">
            <!-- 这里写文章内容 -->

${Base64.decode(data.article)}



        </article>
    </div>
    <footer>
        <div class="main">
            <p>名字&copy;2020</p>
            <p id="light">
                <span>代</span>
                <span>码</span>
                <span>是</span>
                <span>写</span>
                <span>出</span>
                <span>来</span>
                <span>给</span>
                <span>人</span>
                <span>看</span>
                <span>的</span>
                <span>，</span>
                <span>附</span>
                <span>带</span>
                <span>能</span>
                <span>在</span>
                <span>机</span>
                <span>器</span>
                <span>上</span>
                <span>运</span>
                <span>行</span>
                <span>。</span>
                <!-- 代码是写出来给人看的，附带能在机器上运行 --有赞Vant弹出框组件 -->
            </p>
            <p><a href="https://github.com/Lrunlin" title="包括本博客（管理/客户端）源码" target="_blank">我的GitHub</a></p>
        </div>
    </footer>
    <!-- 右下角按钮 -->
    <div id="add" class="pc">
        <div id="add-box">
            <div id="wechat">
                <img data-src="./image/wechat.png" alt="微信图片">
                <p>微信</p>
                <div id="wechat-qrcode">
                    <img data-src="./image/wechat-code.jpg" alt="微信二维码图片" title="扫一扫添加微信">
                </div>
            </div>
            <div id="qq">
                <img data-src="./image/QQ.png" alt="QQ图片">
                <p>QQ</p>
            </div>
        </div>
        <div id="addBtn">
            <img data-src="./image/add.png" alt="PC端更多图标" class="add-image">
        </div>
    </div>
    <script src="./js/jquery.js"></script>
    <script type="module" src="./js/index.js"></script>
    <script type="module" src="./js/pc.js"></script>
</body>
</html>
    `
    return html;
}
module.exports = createPc;