import { PublicUser } from "./types";
import { cookies } from "next/headers";

export async function getPublicUserById(
  id: number
): Promise<PublicUser | null> {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth")?.value;

  const res = await fetch(`http://localhost:3001/api/users/${id}`, {
    headers: {
      Cookie: `auth=${auth}`
    },
    cache: "no-store"
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data;
}
