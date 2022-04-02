// todo 未来可以通过.prop('attributes')精细限制属性，要等Markdown编辑器
import { assets, cdn } from "@/store/assetsPath";
import cheerio from "cheerio";
import blackList from './blackList';
/**
 * xss处理article字段
 * @?处理图片路径和白名单外的标签和属性
 * @params html {string} 需要处理的HTML字符串
 * @return str {string} 处理好的HTML字符串
 */
function xss(html: string): string {
  const $ = cheerio.load(blackList(html));
  $("img").each((index, item) => {
    let _src = $(item).attr("src") || $(item).attr("data-src"); //获取data-src,防止意外
    $(item)
      .attr("src", (_src as string).replace(`${assets}image/`, "").replace(`${cdn}/image/`, ""))
      .removeAttr("data-src")
      .removeAttr("alt")
      .removeAttr("title");
  });




  return $("body").html() as string;
}

export default xss;
