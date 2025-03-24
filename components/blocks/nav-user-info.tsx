import { Session } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initials } from "@/lib/strings";

const CurrentUserInfo = (user: Session["user"]) => {
  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={user?.image as string} alt={user?.name as string} />
        <AvatarFallback className="rounded-lg">{initials(user?.name as string)}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">
          {user?.name} ({user?.role})
        </span>
        <span className="truncate text-xs">{user?.email}</span>
      </div>
    </>
  );
};

export default CurrentUserInfo;
