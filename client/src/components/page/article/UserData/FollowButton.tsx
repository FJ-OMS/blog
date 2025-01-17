import type { FC } from "react";
import { useRouter } from "next/router";
import { Button } from "antd";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modalStateContext } from "@/components/common/Header/Sign";
import useSWR from "swr";
import axios from "axios";
import { userDataContext } from "@/store/user-data";
import type { response } from "@type/response";
import type { FollowAttributes } from "@type/model-attribute";

interface propsType {
  /** 文章作者id*/
  bloggerID: FollowAttributes["blogger_id"];
  articleID: number;
}
/** 文章页面的关注按钮，会自动获取状态并展示对应的按钮*/
const SwitchButton: FC<propsType> = props => {
  let router = useRouter();
  let userData = useRecoilValue(userDataContext);

  let { data, error, isValidating, mutate } = useSWR(`follow-user-state-${props.bloggerID}`, () =>
    axios.get<response>(`/follow/state/${props.bloggerID}`).then(res => res.data.success)
  );
  function follow() {
    axios.post<response>(`/follow/${props.bloggerID}`).then(res => {
      mutate();
    });
  }
  function unfollow() {
    axios.delete<response>(`/follow/${props.bloggerID}`).then(res => {
      mutate();
    });
  }
  return (
    <>
      {error ? (
        <Button ghost disabled danger>
          请求错误
        </Button>
      ) : isValidating ? (
        <div>加载中</div>
      ) : (
        <>
          <Button
            ghost
            type="primary"
            className="rounded text-[#1e80ff] bg-[rgb(30,128,255)]"
            onClick={() => {
              userData?.id != props.bloggerID
                ? data
                  ? unfollow()
                  : follow()
                : router.push(`/article/editor/${props.articleID}`);
            }}
          >
            {userData?.id != props.bloggerID ? (data ? "已关注" : "+关注") : "编辑"}
          </Button>
        </>
      )}
    </>
  );
};

/**
 * 文章页面顶部的关注按钮，传递作者ID判断按钮显示状态
 * @params bloggerID {number} 文章发布者的ID
 * @params articleID {number} 文章的ID
 */
const FollowButton: FC<propsType> = props => {
  let userData = useRecoilValue(userDataContext);
  let setModalState = useSetRecoilState(modalStateContext);
  return (
    <>
      {userData ? (
        <SwitchButton {...props} />
      ) : (
        <Button
          ghost
          type="primary"
          className="rounded text-[#1e80ff] bg-[rgb(30,128,255)]"
          onClick={() => setModalState("LogIn")}
        >
          +关注
        </Button>
      )}
    </>
  );
};
export default FollowButton;
