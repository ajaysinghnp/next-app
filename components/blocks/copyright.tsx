import { app_config } from "@/config/app";
import { cn } from "@/lib/utils";

export interface Props {
  className?: string;
}

const CopyRight = ({ className }: Props) => {
  return (
    <div className={cn("absolute bottom-0 p-4 text-zinc-400 dark:text-slate-500", className)}>
      &copy; {new Date().getFullYear()} {app_config.app_name}. All rights reserved.
    </div>
  );
};

export default CopyRight;
