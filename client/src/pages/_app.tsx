import { NextPage } from "next";
import NextApp from "next/app";
import type { AppProps, AppContext } from "next/app";

//部分动画样式在这个css里面
import "antd/lib/style/index.css";
import "@/plugin/axios";

import "@/plugin/dayjs.ts";

import "@/styles/globals.scss";

import { parse as cookieParse } from "cookie";

import axios from "axios";

import Recoil, { userInfo } from "@/plugin/recoil";
export interface Props extends AppProps {
  userInfo: userInfo;
}

import SWR from "@/plugin/swr";

const APP: NextPage<Props> = ({ Component, pageProps, userInfo }) => {
  return (
    <>
      <Recoil userInfo={userInfo}>
        <SWR>
          <Component {...pageProps} />
        </SWR>
      </Recoil>
    </>
  );
};

//! APP组件无法使用getServerSideProps
//? 因为是APP组件的原因,ctx并不是顶级的对象参数只是一个属性
NextApp.getInitialProps = async ({ ctx }): Promise<any> => {
  // ? article页面不请求,防止被redis缓存
  if (ctx.pathname.startsWith("/article/") && ctx.pathname != "/article/editor") {
    return { userInfo: null };
  }

  let { token } = cookieParse(ctx?.req?.headers?.cookie + "");
  if (!token) {
    return { userInfo: null };
  }

  return await axios
    .get("/user/info", {
      headers: { authorization: token },
    })
    .then(res => {
      return { userInfo: res.data.data || null };
    })
    .catch(() => ({ userInfo: null }));
};
export default APP;
