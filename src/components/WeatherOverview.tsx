import { Cloud, Sun, Thermometer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function WeatherOverview() {
  // TODO: Replace with actual weather data
  const weatherData = {
    temperature: 72,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 5,
  };

  return (
    <Card className="bg-white/10 text-white">
      <CardHeader>
        <CardTitle className="text-2xl">Current Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Thermometer className="mr-2 h-8 w-8" />
            <span className="text-4xl font-bold">
              {weatherData.temperature}°F
            </span>
          </div>
          <div className="flex items-center">
            <Cloud className="mr-2 h-8 w-8" />
            <Sun className="mr-2 h-8 w-8" />
            <span className="text-xl">{weatherData.condition}</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-white/70">Humidity</p>
            <p className="text-lg font-semibold">{weatherData.humidity}%</p>
          </div>
          <div>
            <p className="text-sm text-white/70">Wind Speed</p>
            <p className="text-lg font-semibold">{weatherData.windSpeed} mph</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
