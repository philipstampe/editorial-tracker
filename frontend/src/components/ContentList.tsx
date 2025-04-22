import { ContentItem } from "@/types";
import React from "react";
import Link from "next/link";
import StatusIndicator from "./StatusIndicator";
import CreatedBy from "./CreatedBy";

type Props = {
  items: ContentItem[];
};

export default function ContentList({ items }: Props) {
  return (
    <div className="mb-8">
      <h2 className="text-l font-semibold mb-2 px-2">Items</h2>
      <div className="grid grid-cols-12 p-2 font-semibold border-b border-gray-200 text-sm">
        <div className="col-span-2">Status</div>
        <div className="col-span-4">Title</div>
        <div className="col-span-2">Deadline</div>
        <div className="col-span-2">Created by</div>
        <div className="col-span-2">Type</div>
      </div>
      {items.map((item) => (
        <Link
          href={`/${item.id}`}
          key={item.id}
          className="border-b border-gray-200 grid grid-cols-12 p-2.5 hover:bg-gray-50 text-sm"
        >
          <div className="col-span-2">
            <StatusIndicator status={item.status} />
          </div>
          <div className="col-span-4">{item.title}</div>
          <div className="col-span-2">{item.deadline}</div>
          <div className="col-span-2">
            <CreatedBy id={item.createdBy} />
          </div>
          <div className="col-span-2">
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </div>
        </Link>
      ))}
    </div>
  );
}
