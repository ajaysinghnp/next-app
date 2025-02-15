import React from "react";

import CopyRight from "@/components/blocks/copyright";
import { ModeToggle } from "@/components/ui/theme-toggle";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="absolute right-0 top-0 p-4">
        <ModeToggle />
      </div>
      {children}
      <CopyRight />
    </div>
  );
};

export default AuthLayout;
