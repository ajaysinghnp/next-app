"use client";

import * as React from "react";

import { NavMain } from "@/components/blocks/nav-main";
import { NavReports } from "@/components/blocks/nav-reports";
import { NavUser } from "@/components/blocks/nav-user";
import { TeamSwitcher } from "@/components/blocks/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { data } from "@/config/sidebar";

import { NavSecondary } from "./nav-secondary";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain.items} title={data.navMain.title} />
        <NavReports reports={data.reports.items} title={data.reports.title} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
