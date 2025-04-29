import React from "react";
import { ContentStatus } from "@/types";

type Props = {
  status: ContentStatus;
};

export default function StatusIndicator({ status }: Props) {
  const key = status ? status : 'blank';
  const colors: Record<Exclude<ContentStatus, null> | "blank", { bg: string | null; indicator: string | null }> = {
    "blank": { bg: null, indicator: null },
    "idea": { bg: "bg-blue-500/25", indicator: "bg-blue-500" },
    "draft": { bg: "bg-yellow-500/25", indicator: "bg-yellow-500" },
    "review": { bg: "bg-orange-500/25", indicator: "bg-orange-500" },
    "published": { bg: "bg-green-500/25", indicator: "bg-green-500" },
    "archived": { bg: "bg-slate-500/25", indicator: "bg-slate-500" }
  };

  const themeColor = colors[key];

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-op ${themeColor?.bg}`}
    >
      <span className={`w-2 h-2 rounded-full ${themeColor?.indicator}`}></span>
      {status}
    </div>
  );
}
