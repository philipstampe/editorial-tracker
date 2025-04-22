"use client";
import React from "react";

export default function LogOutForm() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch("http://localhost:3001/api/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (res.ok) {
      window.location.reload();
    }
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <button
        type="submit"
        className="text-sm font-semibold bg-slate-800 hover:bg-slate-950 text-white rounded-lg cursor-pointer px-4 py-2.5"
      >
        Log out
      </button>
    </form>
  );
}
