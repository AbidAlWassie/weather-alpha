// src/components/sidebar/app-sidebar.tsx
"use client";

import {
  BarChart,
  GalleryVerticalEnd,
  Globe,
  Home,
  Map,
  Settings2,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../ui/sidebar";
import { BrandSwitcher } from "./brand-switcher";
import { NavLocations } from "./nav-locations";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    image: "https://icons8.com/icon/kDoeg22e5jUY/male-user",
  },
  brand: [
    {
      name: "Weather App",
      logo: GalleryVerticalEnd,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Forecast",
      url: "/forecast",
      icon: BarChart,
    },
    {
      title: "Map",
      url: "/map",
      icon: Map,
    },
    {
      title: "Customize",
      url: "#",
      icon: Settings2,
    },
  ],
  locations: [
    {
      name: "Rangpur, Bangladesh",
      url: "#",
      icon: Globe,
    },
    {
      name: "Damascus, Syria",
      url: "#",
      icon: Globe,
    },
    {
      name: "Austin TX, USA",
      url: "#",
      icon: Globe,
    },
  ],
};

export function AppSidebar({
  session,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  session: { user: { name: string; email: string; image: string } } | null;
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <BrandSwitcher brands={data.brand} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavLocations locations={data.locations} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session?.user ?? null} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
