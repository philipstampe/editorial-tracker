import { getPublicUserById } from "@/utils";

type Props = {
  id: number;
};

export default async function CreatedBy({ id }: Props) {
  const user = await getPublicUserById(id);
  return user ? user.username : null;
}
