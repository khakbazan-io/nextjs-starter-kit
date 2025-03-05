"use client";
import { Spinner } from "@heroui/spinner";

export const TableLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center backdrop-blur-[3px] w-full h-full z-50">
      <Spinner label="درحال دریافت اطلاعات..." labelColor="primary" />
    </div>
  );
};
