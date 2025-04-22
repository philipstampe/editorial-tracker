"use client";
import { ContentItem, ContentType } from "@/types";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StatusSelector from "./StatusSelector";
import UserSelector from "./UserSelector";

type Props = {
  item: ContentItem;
};

export default function EditEntryForm({ item }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState(item.title);
  const [status, setStatus] = useState(item.status);
  const [deadline, setDeadline] = useState(item.deadline);
  const [type, setType] = useState(item.type);
  const [authors, setAuthors] = useState<number[]>(item.authors);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:3001/api/content/${item.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        status,
        deadline,
        type,
        authors
      })
    });

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <div className="mb-8">
      <div className="px-2">
        <h2 className="text-xl font-semibold mb-2">Update entry</h2>
        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-semibold block mb-1">Title</label>
            <input
              className="bg-gray-50 border border-gray-200 text-sm rounded-lg block w-full p-2.5"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold block mb-1">Deadline</label>
            <input
              name="deadline"
              className="bg-gray-50 border border-gray-200 text-sm rounded-lg block w-full p-2.5"
              value={deadline}
              type="date"
              onChange={(event) => setDeadline(event.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-semibold block mb-1">Type</label>
            <select
              name="type"
              className="bg-gray-50 border border-gray-200 text-sm rounded-lg block w-full p-2.5 appearance-none"
              value={type}
              onChange={(event) => setType(event.target.value as ContentType)}
            >
              <option value="article">Article</option>
              <option value="video">Video</option>
              <option value="podcast">Podcast</option>
            </select>
          </div>

          <StatusSelector value={status} variant="full" onChange={setStatus} />
          <UserSelector selected={authors} onChange={setAuthors} />

          <button
            className="text-sm bg-slate-800 hover:bg-slate-900 text-white cursor-pointer rounded-lg p-2.5 font-semibold"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
