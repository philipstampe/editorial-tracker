import { ContentItem } from "@/types";

import React from "react";
import { cookies } from "next/headers";

import LogOutForm from "@/components/LogOutForm";
import EditEntryForm from "@/components/EditEntryForm";

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;

  const cookieStore = await cookies();
  const auth = cookieStore.get("auth")?.value;

  const res = await fetch(`http://localhost:3001/api/content/${id}`, {
    headers: {
      Cookie: `auth=${auth}`
    },
    cache: "no-store"
  });

  const item: ContentItem = await res.json();

  return (
    <main>
      <div className="p-2.5 bg-gray-50 border-b border-b-gray-200 flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Editorial Tracker</h1>
        <LogOutForm />
      </div>
      <EditEntryForm item={item} />
    </main>
  );
}
