import { AuthenticatedRequest } from "./types";
import { Router } from "express";
import { users } from "./data/users";
import { contentItems } from "./data/content";
import { getPublicUserById } from "./utils";

const router = Router();

//Login functionality
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    res.status(401).json({ error: "Error" });
    return;
  }

  res.cookie("auth", user.id.toString(), {
    httpOnly: true,
    signed: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60
  });

  res.json({ message: "Logged in" });
});

//Logout functionality
router.post("/logout", (req, res) => {
  res.clearCookie("auth", {
    httpOnly: true,
    signed: true,
    sameSite: "strict"
  });

  res.json({ message: "Logged out" });
});

//Retrieve all content items, filtered based on user role.
router.get("/content", (req: AuthenticatedRequest, res) => {
  if (!req.publicUser) {
    return;
  }

  const { publicUser } = req;
  const { role } = publicUser;

  let responseData = contentItems;

  if (role === "contributor") {
    responseData = contentItems.filter(
      (entry) =>
        entry.createdBy === publicUser.id ||
        entry.authors.includes(publicUser.id)
    );
  }
  res.json(responseData);
});

//Get single content from id
router.get("/content/:id", (req: AuthenticatedRequest, res) => {
  if (!req.publicUser) {
    return;
  }

  const { publicUser } = req;
  const { id } = req.params;
  const { role } = publicUser;

  let responseData = contentItems.find(
    (contentItem) => contentItem.id === parseInt(id)
  );

  if (role === "contributor") {
    const isCreator = responseData?.createdBy === publicUser.id;
    const isAuthor = responseData?.authors.includes(publicUser.id);

    if (!isCreator && !isAuthor) {
      res.status(401).json({ error: "Error" });
      return;
    }
  }

  res.json(responseData);
});

//Create a new content item.
router.post("/content", (req: AuthenticatedRequest, res) => {
  if (!req.publicUser) {
    return;
  }

  const { publicUser } = req;
  const { title, status, deadline, type, authors } = req.body;

  const lastItemId = contentItems.at(-1)?.id;
  const nextItemId = (lastItemId || 0) + 1;
  const createdBy = publicUser.id;

  const newContentItem = {
    id: nextItemId,
    title,
    status,
    deadline,
    type,
    authors,
    createdBy
  };

  contentItems.push(newContentItem);
  res.json(newContentItem);
});

//Update (the status of a) content item.
router.patch("/content/:id", (req, res) => {
  const { id } = req.params;
  const item = contentItems.find(
    (contentItem) => contentItem.id === parseInt(id)
  );

  if (!item) {
    res.status(401).json({ error: "Entry not found" });
    return;
  }

  const { title, status, deadline, type, authors } = req.body;

  if (title !== undefined) item.title = title;
  if (status !== undefined) item.status = status;
  if (deadline !== undefined) item.deadline = deadline;
  if (type !== undefined) item.type = type;
  if (authors !== undefined) item.authors = authors;

  res.json(item);
});

//Get all users
router.get("/users", (req, res) => {
  const responseData = users.map((user) => getPublicUserById(user.id));
  res.json(responseData);
});

// Get single user from id.
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const publicUser = getPublicUserById(parseInt(id));
  if (!publicUser) {
    return;
  }
  res.json(publicUser);
});

export default router;
