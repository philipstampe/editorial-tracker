import { users } from "./data/users";
import { PublicUser } from "./types";

export function getPublicUserById(id: number): PublicUser | null {
  const user = users.find((user) => user.id === id);

  if (!user) return null;

  return {
    id: user.id,
    username: user.username,
    role: user.role
  };
}
