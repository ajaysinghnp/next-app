import { CheckCircle2Icon } from "lucide-react";

interface Props {
  message?: string;
}

export const FormSuccess = ({ message }: Props) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center justify-left text-emerald-500 gap-x-2 text-sm border border-emerald-500/30">
      <CheckCircle2Icon className="w-4 h-4" />
      <p className="text-left">{message}</p>
    </div>
  );
};
