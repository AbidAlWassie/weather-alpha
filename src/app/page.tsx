// src/app/page.tsx
import { WeatherOverview } from "~/components/WeatherOverview";
import { WeatherSearch } from "~/components/WeatherSearch";
import { HydrateClient } from "~/trpc/server";

export default function Home() {
  const weather = null;

  return (
    <HydrateClient>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-white">
          Weather <span className="text-[hsl(236,100%,74%)]">Forecast</span>
        </h1>
        <WeatherSearch />
        <WeatherOverview weather={weather} />
      </div>
    </HydrateClient>
  );
}
