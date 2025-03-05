"use client";
import { Button, Text } from "@/core/common";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-2xl mx-auto gap-y-4">
      <Text as="h2" size="lg" weight="semibold">
        مشکلی پیش آمده!
      </Text>

      <Button onPress={() => reset()} color="primary">
        تلاش مجدد
      </Button>
    </div>
  );
}
