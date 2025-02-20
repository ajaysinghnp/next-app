import { CircleX } from "lucide-react";

import { Button } from "@/components/ui/button";

export interface Props {
  dirty?: boolean;
}

export const ClearButton = ({ dirty = true }: Props) => {
  if (!dirty) {
    return null;
  }

  return (
    <Button type="reset" className="absolute top-[-20] right-[-10]" variant={"ghost"}>
      <CircleX size={24} />
    </Button>
  );
};
