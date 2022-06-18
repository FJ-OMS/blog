import type { NextPage, GetServerSideProps } from "next";
import css from "styled-jsx/css";
import Layout from "@/layout/Main";
import { getArticleData } from "@/request";
import type { article } from "@/types";
import Comment from "@/components/common/Comment";
import NotFound from "@/components/article/NotFound";
import Article from "@/components/article/Article";
import Head from "next/head";

interface propsTypes {
  data: article | null;
}
const routerMappingList = [
  {
    id: 6064299710,
    router: "1627106874249",
  },
  {
    id: 6064299610,
    router: "1638719606363",
  },
  {
    id: 6064301111,
    router: "1e27701d7b6be0812783007ffac240b2",
  },
  {
    id: 6064301710,
    router: "8c9d55e37dd9241d5dc2545e82cc0e38",
  },
  {
    id: 6064299810,
    router: "axiosasyncawait",
  },
  {
    id: 6064301511,
    router: "bf7bd604a4fdbb72f3bd42a4d40acba3",
  },
  {
    id: 6064299711,
    router: "cookiesessionjwt",
  },
  {
    id: 6064299811,
    router: "createreactapp",
  },
  {
    id: 6064299911,
    router: "developmenttrendofCSS",
  },
  {
    id: 6064301210,
    router: "eeeae2f9d42160ee3e583c2b1d63af87",
  },
  {
    id: 6064301811,
    router: "express-use-server-cache",
  },
  {
    id: 6064299910,
    router: "expresscancelbodyparser",
  },
  {
    id: 6064301310,
    router: "javascriptoptimization",
  },
  {
    id: 6064300110,
    router: "leetcode1",
  },
  {
    id: 6064300011,
    router: "leetcode14",
  },
  {
    id: 6064300111,
    router: "leetcode3",
  },
  {
    id: 6064300010,
    router: "leetcode4",
  },
  {
    id: 6064300211,
    router: "leetcode7",
  },
  {
    id: 6064300310,
    router: "leetcode8",
  },
  {
    id: 6064301612,
    router: "monitor-qiniu-cdn",
  },
  {
    id: 6064300610,
    router: "nextjs",
  },
  {
    id: 6064301110,
    router: "nextjsvsremixjs",
  },
  {
    id: 6064301910,
    router: "node-get-file-type",
  },
  {
    id: 6064300210,
    router: "nodeexpress",
  },
  {
    id: 6064300711,
    router: "nodeexpressmysql",
  },
  {
    id: 6064300410,
    router: "nodeffmpeg",
  },
  {
    id: 6064301711,
    router: "npm-or-yarn-use-cnpm",
  },
  {
    id: 6064301410,
    router: "npmfailedtoinstallsharp",
  },
  {
    id: 6064301010,
    router: "performanceoptimization",
  },
  {
    id: 6064301311,
    router: "puppeteerusebrowser",
  },
  {
    id: 6064300311,
    router: "react",
  },
  {
    id: 6064300411,
    router: "reacthooks",
  },
  {
    id: 6064300510,
    router: "reactuseclass",
  },
  {
    id: 6064300910,
    router: "reactvsvue2022",
  },
  {
    id: 6064300511,
    router: "routerandpage",
  },
  {
    id: 6064300710,
    router: "studentachievement1",
  },
  {
    id: 6064301912,
    router: "styled-jsx-plugins-is-not-a-function",
  },
  {
    id: 6064301911,
    router: "styled-jsx-use-sass",
  },
  {
    id: 6064302010,
    router: "tencent-cloud-uses-cloud-database",
  },
  {
    id: 6064301610,
    router: "typescriptgetparamstype",
  },
  {
    id: 6064301510,
    router: "unabletouseftp",
  },
  {
    id: 6064301810,
    router: "vs-code-counter",
  },
  {
    id: 6064301611,
    router: "vue3-declare-emits",
  },
  {
    id: 6064300911,
    router: "vueoptimizationtechniques",
  },
  {
    id: 6064300810,
    router: "vuescriptsetup",
  },
];
const propsStyle = css.resolve`
  .container {
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
  }
`;

const NextPageName: NextPage<propsTypes> = props => {
  let data = props.data;

  return (
    <>
      <Layout styleJsx={propsStyle}>
        {data ? (
          <>
            <Head>
              <link rel="canonical" href={`https://blogweb.cn/article/${data.id}`} />
            </Head>
            <Article data={data as article} />
            <Comment articleId={(data as article).id + ""} />
          </>
        ) : (
          <NotFound />
        )}
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  let id = context?.params?.id as string;
  let mappingID = routerMappingList.find(item => item.router == id)?.id;
  if (mappingID) {
    return {
      redirect: {
        destination: `/article/${mappingID}`,
        statusCode: 301,
      },
    };
  }
  let rows = await getArticleData(mappingID?mappingID+'':id);
  if (!rows) {
    context.res.statusCode = 404;
  };
  return {
    props: {
      data: rows,
    },
  };
};

export default NextPageName;
