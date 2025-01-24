"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function WeatherSearch() {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement weather search functionality
    console.log("Searching for:", search);
  };

  return (
    <form onSubmit={handleSearch} className="mb-8 flex gap-2">
      <Input
        type="text"
        placeholder="Enter city name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white/10 text-white placeholder-white/50"
      />
      <Button type="submit" variant="secondary">
        Search
      </Button>
    </form>
  );
}
