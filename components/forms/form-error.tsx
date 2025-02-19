import { TriangleAlert } from "lucide-react";

interface Props {
  message?: string;
}

export const FormError = ({ message }: Props) => {
  if (!message) return null;
  return (
    <div className="bg-red-500/15 p-3 rounded-md flex items-center justify-left text-red-500 gap-x-2 text-sm border border-red-500/30">
      <TriangleAlert className="w-4 h-4" />
      <p className="text-left">{message}</p>
    </div>
  );
};
