import type {
  CardBodyCmProps,
  CardCmProps,
  CardFooterCmProps,
  CardHeaderCmProps,
} from "./types";
import {
  Card as LibCard,
  CardBody as LibCardBody,
  CardFooter as LibCardFooter,
  CardHeader as LibCardHeader,
} from "@heroui/card";

export const Card: React.FC<CardCmProps> = ({ children, ...props }) => {
  return (
    <LibCard shadow="none" {...props}>
      {children}
    </LibCard>
  );
};

export const CardHeader: React.FC<CardHeaderCmProps> = ({
  children,
  ...props
}) => {
  return <LibCardHeader {...props}>{children}</LibCardHeader>;
};

export const CardBody: React.FC<CardBodyCmProps> = ({ children, ...props }) => {
  return <LibCardBody {...props}>{children}</LibCardBody>;
};

export const CardFooter: React.FC<CardFooterCmProps> = ({
  children,
  ...props
}) => {
  return <LibCardFooter {...props}>{children}</LibCardFooter>;
};
