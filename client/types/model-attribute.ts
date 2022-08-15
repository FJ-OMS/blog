export interface TagAttributes {
  id: number;
  name: string;
  belong: number;
  icon_file_name?: string;
  create_time: Date;
  indexes: number;
}
export interface TypeAttributes {
  id: number;
  name: string;
  indexes: number;
  icon_file_name?: string;
  create_time: Date;
  description: string;
}
export interface ArticleAttributes {
  id: number;
  title: string;
  description: string;
  tag: TagAttributes[];
  author_data: UserAttributes;
  content: string;
  cover_file_name?: string;
  cover_url?: string;
  reprint?: string;
  language: string[] | null;
  view_count?: number;
  update_time?: Date;
  create_time: Date;
  comment_count: number;
  collection_count: number;
}
export interface UserAttributes {
  id: number;
  name: string;
  auth: number;
  email?: string;
  github?: string;
  qq?: string;
  password: string;
  state?: number;
  description?: string;
  site?: string;
  unit?: string;
  location?: string;
  avatar_file_name?: string;
  avatar_url?: string;
  create_time: Date;
}
export interface FollowAttributes {
  id: number;
  blogger_id: number;
  user_id: number;
  time: Date;
}

export interface CommentAttributes {
  id: number;
  article_id: number;
  user_id: number;
  user_data: Pick<UserAttributes, "id" | "name" | "auth" | "avatar_file_name" | "avatar_url">;
  content: string;
  reply: null;
  comment_pics: string;
  create_time: Date;
  children: [
    Omit<CommentAttributes, "children"> & {
      reply: {
        content: string;
        user_data: Pick<UserAttributes, "id" | "name" | "auth" | "avatar_file_name" | "avatar_url">;
      };
    }
  ];
}