import {
  TbAlertOctagonFilled,
  TbRosetteDiscountCheckFilled,
} from "react-icons/tb";
import type { BooleanLabelCmProps } from "./types";
import { Text } from "../text";

export const BooleanLabel: React.FC<BooleanLabelCmProps> = ({
  value,
  text,
}) => {
  if (!value) {
    return (
      <div className="flex items-center gap-x-1">
        <TbAlertOctagonFilled className="text-warning-600" size={19} />
        <Text className="text-warning-600" weight="medium">
          {text}
        </Text>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-x-1">
      <TbRosetteDiscountCheckFilled className="text-success-600" size={19} />
      <Text className="text-success-600" weight="medium">
        {text}
      </Text>
    </div>
  );
};
