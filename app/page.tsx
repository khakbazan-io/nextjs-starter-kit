import { UsersList } from "@/components/users";
import { generateMeta } from "@/core/utils";

export const metadata = generateMeta({
  title: "خانه",
  description: "خانه",
});

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto pt-6">
      <UsersList />
    </div>
  );
}
