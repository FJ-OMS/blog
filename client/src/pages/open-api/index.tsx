import { useState, Fragment, FunctionComponent } from "react";
import type { NextPage, GetServerSideProps } from "next";
import Layout from "@/layout/Base";
import css from "styled-jsx/css";
import Head from "@/utils/Head";
import axios from "axios";
import CodeStyle from "@/style/CodeStyle";
import NoSSR from '@/utils/NoSSR'
import type { response, api } from "@/types";
import { Skeleton } from "antd";
interface propsTypes {
  list: { name: string; id: string; time: string }[];
  content: api;
}

const propsStyle = css.resolve`
  .container {
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
  }
`;

const style = css`
  aside {
    position: sticky;
    top: 70px;
    z-index: 1;
    padding: 10px 24px;
    background-color: white;
    width: 300px;
  }
  article {
    flex-grow: 1; /*铺满剩余空间*/
    background-color: white;
    width: 100px;
    margin-left: 10px;
    padding: 10px;
    white-space: pre-wrap;
    word-wrap: break-word;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

const NextPageName: NextPage<propsTypes> = props => {
  let [data, setData] = useState(props.content);

  async function switchOpenApi(id: string) {
    let res = await axios.get<response<api>>(`/api/${id}`);
    setData(res.data.data);
  }

  return (
    <Layout styleJsx={propsStyle}>
      <Head
        title="前端|Api接口"
        description={`分享API公共接口，并且提供了API请求文档，接口地址请求样例${props.list
          .map(item => item.name)
          .join(",")}`}
        keyword={["公开API接口", "文章接口", ...props.list.map(item => item.name)]}
      />
      <style jsx>{style}</style>
      <CodeStyle type="open-api" />
      <aside>
        <h2>API</h2>
        {props.list.map(item => (
          <div key={item.id} onClick={() => switchOpenApi(item.id)}>
            {item.name}
          </div>
        ))}
      </aside>
      <article>
      <NoSSR onLoad={<Skeleton />}>
        <time>{data.time}</time>
        <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
      </NoSSR>
      </article>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async ctx => {
  let res = await axios.get<response<propsTypes>>("/api");
  return {
    props: {
      list: res.data.data.list,
      content: res.data.data.content,
    },
  };
};

export default NextPageName;