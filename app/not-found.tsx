import { Button, Text } from "@/core/common";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-2xl mx-auto gap-y-4">
      <Text as="h2" size="lg" weight="semibold">
        صفحه مدنظر یافت نشد!
      </Text>

      <Link href="/">
        <Button color="primary">صفحه اصلی</Button>
      </Link>
    </div>
  );
}
