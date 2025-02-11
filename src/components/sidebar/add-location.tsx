"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { addLocation } from "~/server/actions/locations";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SidebarMenuButton } from "../ui/sidebar";

type LocationResult = {
  lat: number;
  lon: number;
  name: string;
  country: string;
};

export function AddLocation({ onAddLocation }: { onAddLocation: () => void }) {
  const [isAdding, setIsAdding] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `/api/location/search?q=${encodeURIComponent(query)}`,
      );
      if (!response.ok) throw new Error("Search failed");
      const data = (await response.json()) as LocationResult[];
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to search locations");
    } finally {
      setIsSearching(false);
    }
  };

  const handleLocationSelect = async (location: LocationResult) => {
    try {
      const result = await addLocation({
        name: location.name,
        latitude: location.lat,
        longitude: location.lon,
        country: location.country,
      });

      if (!result.success) throw new Error(result.error);

      toast.success("Location added successfully");
      onAddLocation();
      setIsAdding(false);
      setQuery("");
      setResults([]);
    } catch (error) {
      console.error("Error adding location:", error);
      toast.error("Failed to add location");
    }
  };

  if (!isAdding) {
    return (
      <SidebarMenuButton onClick={() => setIsAdding(true)}>
        <Plus className="mr-2" />
        Add Location
      </SidebarMenuButton>
    );
  }

  return (
    <div className="space-y-2 p-2">
      <div className="flex gap-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="h-8"
        />
        <Button onClick={handleSearch} disabled={isSearching} size="sm">
          {isSearching ? "..." : "Search"}
        </Button>
      </div>
      {results.length > 0 && (
        <ul className="space-y-1">
          {results.map((result) => (
            <li key={`${result.lat}-${result.lon}`}>
              <Button
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={() => handleLocationSelect(result)}
              >
                {result.name}, {result.country}
              </Button>
            </li>
          ))}
        </ul>
      )}
      <Button
        variant="ghost"
        size="sm"
        className="w-full"
        onClick={() => {
          setIsAdding(false);
          setQuery("");
          setResults([]);
        }}
      >
        Cancel
      </Button>
    </div>
  );
}
