import { LogIn } from "lucide-react";

import { LoginButton } from "@/components/authentication/login-button";
import { CopyRight } from "@/components/blocks/copyright";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { app_config } from "@/config/app";
import { business_config } from "@/config/business";

export default function Home() {
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="absolute right-0 top-0 p-4">
        <ModeToggle />
      </div>
      <div className="space-y-6 text-center text-slate-800 dark:text-white">
        <h1 className="text-6xl font-semibold drop-shadow-md">🛍️ {business_config.name}</h1>
        <h2 className="text-4xl font-semibold drop-shadow-md">
          {app_config.app_name} <span className="text-2xl font-normal drop-shadow-md">{app_config.app_version}</span>
        </h2>
        <p className="text-xl drop-shadow-md">{app_config.app_description}</p>
        <div>
          <LoginButton asChild>
            <Button className="font-semibold" size="lg">
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </LoginButton>
        </div>
      </div>
      <CopyRight />
    </div>
  );
}
