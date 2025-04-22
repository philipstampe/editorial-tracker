"use client";
import React, { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      window.location.reload();
    }
  };

  return (
    <form
      className="max-w-sm mx-auto flex flex-col gap-4 mt-10"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="text-sm font-semibold block mb-1">Username</label>
        <input
          className="bg-gray-50 border border-gray-200 text-sm rounded-lg block w-full p-2.5"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </div>
      <div>
        <label className="text-sm font-semibold block mb-1">Password</label>
        <input
          className="bg-gray-50 border border-gray-200 text-sm rounded-lg block w-full p-2.5"
          name="password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <button
        className="text-sm font-semibold bg-slate-800 w-full hover:bg-slate-950 text-white rounded-lg cursor-pointer px-4 py-2.5"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
