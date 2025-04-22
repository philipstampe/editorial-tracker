import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./types";
import { users } from "./data/users";
import { getPublicUserById } from "./utils";

export const auth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = parseInt(req.signedCookies.auth);

  if (!userId) {
    return res.status(401).json({ error: "Error" });
  }

  // const user = users.find((user) => user.id === userId);
  const user = getPublicUserById(userId);

  if (!user) {
    return res.status(401).json({ error: "Invalid user" });
  }

  req.publicUser = user;
  next();
};
