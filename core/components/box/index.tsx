"use client";
import { Card, CardBody, CardHeader, Text } from "@/core/common";
import type { BoxCmProps } from "./types";

export const Box: React.FC<BoxCmProps> = ({
  title,
  hint,
  isBordered,
  className,
  titleAddon,
  children,
}) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Text as="h3" weight="bold">
            {title}
          </Text>

          {hint ? (
            <Text color="foreGroundExtraLight" size="xs">
              {hint}
            </Text>
          ) : null}
        </div>

        {titleAddon && titleAddon}
      </CardHeader>

      <CardBody>{children}</CardBody>
    </Card>
  );
};
