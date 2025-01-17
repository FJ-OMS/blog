import { Avatar } from "antd";
import useSWR from "swr";
import axios from "axios";
import NoFollowLink from "@/components/next/NoFollowLink";
const AuthorRanking = () => {
  let { data, isValidating, error } = useSWR<any[]>("author-ranking", () =>
    axios.get("/author-ranking").then(res => res.data.data)
  );
  return (
    <>
      <div className="bg-white mt-3 shadow-sm">
        <div className="py-3 px-2 border-b-solid border-slate-200">🎖️作者榜</div>
        {isValidating && <div className="bg-gray-200 h-80"></div>}
        {error && <div className="h-10  flex items-center justify-center">加载错误</div>}
        <div className="px-2">
          {data &&
            data.map(item => (
              <NoFollowLink href={`/user/${item.id}`} key={item.id} className="mt-2 py-2 flex">
                <Avatar size={40} src={item.avatar_url} alt="头像">
                  {(item.name as string).substring(0, 1).toLocaleUpperCase()}
                </Avatar>
                <div className="ml-2 w-32 truncate">
                  <p className="m-0 text-slate-800">{item.name}</p>
                  <p className="m-0 text-xs text-slate-600 ">
                    {item.description || item.unit || item.location}
                  </p>
                </div>
              </NoFollowLink>
            ))}
        </div>
      </div>
    </>
  );
};
export default AuthorRanking;
