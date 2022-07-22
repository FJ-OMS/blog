import sanitizeHtml from "sanitize-html";

// https://github.com/apostrophecms/sanitize-html

/**
 * XSS
 * 用户端向服务端发送数据，对文章内容在进入数据前进行加工
 */
function dehydrate(content: string) {
  const clean = sanitizeHtml(content, {
    enforceHtmlBoundary: true,
    allowedTags: [
      "a",
      "b",
      "blockquote",
      "code",
      "del",
      "em",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "hr",
      "i",
      "img",
      "input",
      "li",
      "ol",
      "p",
      "pre",
      "s",
      "strong",
      "table",
      "tbody",
      "td",
      "th",
      "thead",
      "tr",
      "ul",
    ],
    allowedAttributes: {
      a: ["href"],
      img: ["src"],
      input: ["type", "checked", "disabled"],
    },
    allowProtocolRelative: false,
    allowedClasses: {
      pre: ["language-*"],
      code: ["language-*"],
    },
    /**
     * !插件逻辑有点问题，插件是先执行标签转换在执行过滤
     * ?现在插件转换时对src属性进行设置如果不符合就设置为undefined
     */
    transformTags: {
      img: function (tagName, attribs) {
        let src = attribs.src;
        let prefix = `${process.env.CDN}/article/`;
        return {
          tagName: "img",
          attribs: src.startsWith(prefix)
            ? {
                src: src.replace(prefix, ""),
              }
            : ({} as any),
        };
      },
    },
    // 对img中src属性不对劲的进行过滤，返回true表示删除
    exclusiveFilter: function (frame) {
      if (frame.tag === "img") {
        return !frame.attribs.src;
      }
      if (frame.tag === "input") {
        return frame.attribs.type !== "checkbox";
      }
      return false;
    },
  });
  return clean;
}
export default dehydrate;
