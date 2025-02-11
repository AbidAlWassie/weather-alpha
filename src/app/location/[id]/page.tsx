import { WeatherOverview } from "~/components/WeatherOverview";
import { getLocation } from "~/server/actions/locations";

export default async function LocationPage({
  params,
}: {
  params: { id: string };
}) {
  const result = await getLocation(params.id);

  if (!result.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500">{result.error}</div>
      </div>
    );
  }

  const { location, weather } = result.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-4xl font-bold">{location.name}</h1>
      <WeatherOverview weather={weather} />
    </div>
  );
}
