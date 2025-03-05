import { Text } from "../text";
import type { TitleCmProps } from "./types";

export const Title: React.FC<TitleCmProps> = ({ title }) => {
  return (
    <div className="flex items-center gap-x-1 mb-3">
      <Text as="h2" size="xl" weight="bold">
        {title}
      </Text>
    </div>
  );
};
