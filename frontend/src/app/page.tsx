import React from "react";
import { ContentItem } from "@/types";

import LogOutForm from "@/components/LogOutForm";
import LoginForm from "@/components/loginForm";
import ContentList from "@/components/ContentList";
import NewEntryForm from "@/components/NewEntryForm";

import { cookies } from "next/headers";

export default async function Index() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth")?.value;
  const isLoggedIn = auth ? true : false;

  if (!isLoggedIn) {
    return (
      <main>
        <LoginForm />
      </main>
    );
  }

  const res = await fetch("http://localhost:3001/api/content", {
    headers: {
      Cookie: `auth=${auth}`
    },
    cache: "no-store"
  });

  const items = await res.json();

  const groupedItems: Record<string, ContentItem[]> = {
    blank: [],
    idea: [],
    draft: [],
    review: [],
    published: [],
    archived: []
  };

  items.forEach((item: ContentItem) => {
    if (groupedItems[item.status]) {
      groupedItems[item.status].push(item);
    } else {
      groupedItems["blank"].push(item);
    }
  });

  const mergedItems = Object.values(groupedItems).flat();

  return (
    <main>
      <div className="p-2.5 bg-gray-50 border-b border-b-gray-200 flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Editorial Tracker</h1>
        <LogOutForm />
      </div>
      <ContentList items={mergedItems} />
      <NewEntryForm />
    </main>
  );
}
