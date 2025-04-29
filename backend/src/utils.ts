import { users } from "./data/users";
import { PublicUser } from "./types";

export function getPublicUserById(id: number): PublicUser {
  const user = users.find((user) => user.id === id);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user.id,
    username: user.username,
    role: user.role
  };
}
