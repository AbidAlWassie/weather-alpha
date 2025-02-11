// src/components/WeatherOverview.tsx
import { Cloud, Sun, Thermometer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { WeatherData } from "~/server/actions/locations";

export function WeatherOverview({ weather }: { weather?: WeatherData | null }) {
  if (!weather) {
    return (
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-2xl">Weather Data Unavailable</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Unable to fetch weather data. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-2xl">Current Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Thermometer className="mr-2 h-8 w-8 text-primary" />
            <span className="text-4xl font-bold">
              {Math.round(weather.main.temp)}°C
            </span>
          </div>
          <div className="flex items-center">
            {weather.weather[0]?.main === "Clear" ? (
              <Sun className="mr-2 h-8 w-8 text-primary" />
            ) : (
              <Cloud className="mr-2 h-8 w-8 text-primary" />
            )}
            <span className="text-xl">{weather.weather[0]?.description}</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Feels Like</p>
            <p className="text-lg font-semibold">
              {Math.round(weather.main.feels_like)}°C
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Humidity</p>
            <p className="text-lg font-semibold">{weather.main.humidity}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Wind Speed</p>
            <p className="text-lg font-semibold">{weather.wind.speed} m/s</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
