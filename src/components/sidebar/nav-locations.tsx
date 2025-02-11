// src/components/sidebar/nav-locations.tsx
"use client";

import { Globe, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { deleteLocation, getLocations } from "~/server/actions/locations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { AddLocation } from "./add-location";

type Location = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

export function NavLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isMobile } = useSidebar();

  useEffect(() => {
    const fetchData = async () => {
      await fetchLocations();
    };
    void fetchData();
  }, []);

  const fetchLocations = async () => {
    try {
      const result = await getLocations();
      if (!result.success) throw new Error(result.error);
      if (result.data) {
        setLocations(result.data);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      toast.error("Failed to load locations");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLocation = async (id: string) => {
    try {
      const result = await deleteLocation(id);
      if (!result.success) throw new Error(result.error);
      setLocations(locations.filter((loc) => loc.id !== id));
      toast.success("Location deleted successfully");
    } catch (error) {
      console.error("Error deleting location:", error);
      toast.error("Failed to delete location");
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Locations</SidebarGroupLabel>
      <SidebarMenu>
        {isLoading ? (
          <SidebarMenuItem>
            <div className="flex items-center space-x-2">
              <Globe className="animate-spin" />
              <span>Loading locations...</span>
            </div>
          </SidebarMenuItem>
        ) : (
          <>
            {locations.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild>
                  <Link href={`/location/${item.id}`}>
                    <Globe className="mr-2" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-48"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                  >
                    <DropdownMenuItem
                      onSelect={() => handleDeleteLocation(item.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete Location</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <AddLocation onAddLocation={fetchLocations} />
            </SidebarMenuItem>
          </>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
