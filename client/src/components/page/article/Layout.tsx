import type { FC, ReactNode } from "react";
import Base from "@/layout/Base";
import Aside from "./Aside";
import dynamic from "next/dynamic";
import ToolBar from "./ToolBar";

let Comments = dynamic(import("./Comments"), { ssr: false });
let Recommend = dynamic(import("./Recommend"), { ssr: false });

interface propsType {
  children: ReactNode;
}

const Layout: FC<propsType> = props => {
  return (
    <Base className="pb-16">
      <ToolBar />
      <div className="mr-4 w-full sm:mr-0">
        <article className="p-8 pb-5 bg-white break-all shadow-sm">{props.children}</article>
        <div className="p-8 pb-10 mt-4 bg-white shadow-sm">
          <Comments />
        </div>
        <Recommend />
      </div>
      <Aside />
    </Base>
  );
};
export default Layout;
