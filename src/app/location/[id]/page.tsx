import { WeatherOverview } from "~/components/WeatherOverview";
import { getLocation } from "~/server/actions/locations";

type LocationPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LocationPage(props: LocationPageProps) {
  const params = await props.params;

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
      <WeatherOverview weather={weather ?? null} />
    </div>
  );
}
