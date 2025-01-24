import { CloudSun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function CurrentWeather() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Current Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">New York</h2>
            <p className="text-xl">Partly Cloudy</p>
          </div>
          <div className="flex items-center text-5xl font-bold">
            <CloudSun className="mr-2 h-12 w-12" />
            72°F
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="text-lg font-semibold">65%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Wind Speed</p>
            <p className="text-lg font-semibold">5 mph</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pressure</p>
            <p className="text-lg font-semibold">1015 hPa</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Visibility</p>
            <p className="text-lg font-semibold">10 km</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
