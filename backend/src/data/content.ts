import { ContentItem } from "../types";

export const contentItems: ContentItem[] = [
  {
    id: 1,
    title: "Welcome",
    status: "idea",
    authors: [1],
    deadline: "2025-05-01",
    type: "article",
    createdBy: 2
  },
  {
    id: 2,
    title: "The good podcast",
    status: "draft",
    authors: [1, 2],
    deadline: "2025-05-01",
    type: "podcast",
    createdBy: 1
  },
  {
    id: 3,
    title: "The podcast",
    status: "draft",
    authors: [1, 2],
    deadline: "2025-05-01",
    type: "podcast",
    createdBy: 1
  },
  {
    id: 4,
    title: "The podcast 2",
    status: "published",
    authors: [1],
    deadline: "2025-05-01",
    type: "podcast",
    createdBy: 1
  }
];
