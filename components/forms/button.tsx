"use client";

import { Loader2, LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Props {
  pending: boolean;
  type: "submit" | "reset" | "button";
  text: string;
  className?: string;
  Icon?: LucideIcon;
}

export const FormButton = ({ pending, type = "button", text = "Button", className, Icon }: Props) => {
  if (pending) {
    return (
      <Button type={type} className={cn("w-full", className)} disabled>
        <Loader2 className="animate-spin" />
        Please wait...
      </Button>
    );
  }

  return (
    <Button type={type} className={cn("w-full", className)}>
      {Icon && <Icon className="w-4 h-4" />}
      {text}
    </Button>
  );
};
