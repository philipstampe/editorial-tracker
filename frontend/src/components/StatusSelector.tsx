"use client";
import { ContentStatus } from "@/types";
import { capitalizeString } from "../../utils/capitalizeString";

import React from "react";

type Props = {
  value: ContentStatus;
  variant: "simple" | "full";
  onChange: (status: ContentStatus) => void;
};

export default function UserSelector({ value, variant, onChange }: Props) {
  const options: ContentStatus[] =
    variant === "simple"
      ? ["idea", "draft", "review"]
      : ["idea", "draft", "review", "published", "archived"];
  return (
    <div>
      <h3 className="text-sm font-semibold block mb-1">Status</h3>
      {options.map((option) => (
        <label key={option} className="flex items-center gap-1 text-sm">
          <input
            type="radio"
            name="status"
            value={option}
            checked={value === option}
            onChange={(event) => onChange(event.target.value as ContentStatus)}
          />
          {capitalizeString(option)}
        </label>
      ))}
    </div>
  );
}
