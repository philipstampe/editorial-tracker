export type ContentStatus =
  | ""
  | "idea"
  | "draft"
  | "review"
  | "published"
  | "archived";

export type ContentType = "article" | "video" | "podcast";
export type UserRole = "editor" | "contributor";

export type ContentItem = {
  id: number;
  title: string;
  status: ContentStatus;
  authors: number[];
  deadline: string;
  type: ContentType;
  createdBy: number;
};

export type User = {
  id: number;
  username: string;
  password: string;
  role: UserRole;
};

export type PublicUser = Omit<User, "password">;
