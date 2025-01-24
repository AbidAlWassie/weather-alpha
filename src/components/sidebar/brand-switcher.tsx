// src/components/sidebar/brand-switcher.tsx
"use client";

import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";

export function BrandSwitcher({
  brands,
}: {
  brands: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  useSidebar();
  const [activeBrand] = React.useState(brands[0]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            {activeBrand && <activeBrand.logo className="size-4" />}
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {activeBrand ? activeBrand.name : "No team selected"}
            </span>
            <span className="truncate text-xs">
              {activeBrand ? activeBrand.plan : "No plan"}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
