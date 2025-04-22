"use client";
import React, { useEffect, useState } from "react";
import { PublicUser } from "@/types";

type Props = {
  selected: number[];
  onChange: (id: number[]) => void;
};

export default function UserSelector({ selected, onChange }: Props) {
  const [users, setUsers] = useState<PublicUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:3001/api/users", {
        credentials: "include"
      });
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const selectedItems = checked
      ? [...selected, parseInt(value)]
      : selected.filter((val) => parseInt(value) != val);
    onChange(selectedItems);
  };

  return (
    <div>
      <h3 className="text-sm font-semibold block mb-1">Select authors</h3>
      <ul className="space-y-1">
        {users.map((user) => (
          <li key={user.id}>
            <label className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                value={user.id}
                checked={selected.includes(user.id)}
                onChange={(event) => handleChange(event)}
              />
              {user.username}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
