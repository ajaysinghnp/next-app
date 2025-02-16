import { TriangleAlert } from "lucide-react";

import CopyRight from "@/components/blocks/copyright";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { app_config } from "@/config/app";
import { business_config } from "@/config/business";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="absolute right-0 top-0 p-4">
        <ModeToggle />
      </div>
      <main className="flex flex-col gap-4 text-center text-slate-800 dark:text-white">
        <div className="flex flex-col gap-4 justify-center items-center font-bold drop-shadow-md">
          <TriangleAlert className="h-24 w-24 text-red-500" />
          <h1 className="text-3xl ">404: Page Not found!</h1>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-semibold drop-shadow-md">🛍️ {business_config.name}</h1>
          <h2 className="text-1xl font-semibold drop-shadow-md">
            {app_config.app_name} <span className="text-1xl font-normal drop-shadow-md">{app_config.app_version}</span>
          </h2>
        </div>
      </main>
      <CopyRight />
    </div>
  );
}
