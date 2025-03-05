import { Fragment } from "react";
import type { MainLayoutCmProps } from "./types";

export const MainLayout: React.FC<MainLayoutCmProps> = ({ children }) => {
  return (
    <Fragment>
      <div className="w-full min-h-screen">
        <main className="col-span-16 lg:col-span-13 semiXl:col-span-13 2xl:col-span-14">
          {children}
        </main>
      </div>
    </Fragment>
  );
};
