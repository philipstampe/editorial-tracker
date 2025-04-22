"use client";
import { ContentStatus } from "@/types";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StatusSelector from "./StatusSelector";
import UserSelector from "./UserSelector";

export default function NewEntryForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<ContentStatus>("");
  const [deadline, setDeadline] = useState("");
  const [type, setType] = useState("article");
  const [authors, setAuthors] = useState<number[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch("http://localhost:3001/api/content", {
      method: "POST",
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
      setTitle("");
      setStatus("");
      setDeadline("");
      setType("article");
      setAuthors([]);
    }
  };

  return (
    <div className="mb-8">
      <div className="px-2">
        <h2 className="text-l font-semibold mb-2">Create new</h2>
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
              onChange={(event) => setType(event.target.value)}
            >
              <option value="article">Article</option>
              <option value="video">Video</option>
              <option value="podcast">Podcast</option>
            </select>
          </div>

          <StatusSelector
            value={status}
            variant="simple"
            onChange={setStatus}
          />
          <UserSelector selected={authors} onChange={setAuthors} />

          <button
            className="text-sm font-semibold bg-slate-800 hover:bg-slate-950 text-white rounded-lg cursor-pointer px-4 py-2.5"
            type="submit"
          >
            Create new
          </button>
        </form>
      </div>
    </div>
  );
}
