import { ContentItem } from "../types";

export const contentItems: ContentItem[] = [
  {
    id: 1,
    title: "Investigative journalism part 1",
    status: "idea",
    authors: [1],
    deadline: "2025-05-01",
    type: "article",
    createdBy: 2
  },
  {
    id: 2,
    title: "The podcast episode 1",
    status: "draft",
    authors: [1, 2],
    deadline: "2025-05-01",
    type: "podcast",
    createdBy: 1
  },
  {
    id: 3,
    title: "The podcast episode 2",
    status: "draft",
    authors: [1, 2],
    deadline: "2025-05-01",
    type: "podcast",
    createdBy: 1
  },
  {
    id: 4,
    title: "The podcast episode 3",
    status: "published",
    authors: [1],
    deadline: "2025-05-01",
    type: "podcast",
    createdBy: 1
  }
];
