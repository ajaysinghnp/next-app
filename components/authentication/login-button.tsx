"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { loginRoute } from "@/config/routes";

export interface Props {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({ children, mode = "redirect", asChild }: Props) => {
  const router = useRouter();
  console.log("LoginButton", { mode, asChild });
  const goToLogin = () => {
    if (mode === "redirect") {
      // redirect to login page
      router.push(loginRoute);
    } else {
      // open modal
    }
  };

  // temporary warning for development
  if (mode === "modal") {
    return <span>TODO: Implement modal login</span>;
  }

  return (
    <span className="cursor-pointer" onClick={goToLogin}>
      {children}
    </span>
  );
};
