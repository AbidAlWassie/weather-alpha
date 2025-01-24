import CurrentWeather from "../../components/layouts/CurrentWeather";
import HourlyForecast from "../../components/layouts/HourlyForecast";
import TemperatureChart from "../../components/layouts/TemperatureChart";
import WeeklyForecast from "../../components/layouts/WeeklyForecast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

export default function CityWeather({ params }: { params: { city: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">
        Weather for {params.city}
      </h1>
      <CurrentWeather />
      <Tabs defaultValue="weekly" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weekly">Weekly Forecast</TabsTrigger>
          <TabsTrigger value="hourly">Hourly Forecast</TabsTrigger>
          <TabsTrigger value="temperature">Temperature Trend</TabsTrigger>
        </TabsList>
        <TabsContent value="weekly">
          <WeeklyForecast />
        </TabsContent>
        <TabsContent value="hourly">
          <HourlyForecast />
        </TabsContent>
        <TabsContent value="temperature">
          <TemperatureChart />
        </TabsContent>
      </Tabs>
    </div>
  );
}
