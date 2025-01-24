import { Cloud, CloudRain, Moon, Sun } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const hourlyData = [
  { time: "12 AM", temp: 65, icon: Moon },
  { time: "3 AM", temp: 63, icon: Moon },
  { time: "6 AM", temp: 62, icon: Cloud },
  { time: "9 AM", temp: 68, icon: Sun },
  { time: "12 PM", temp: 72, icon: Sun },
  { time: "3 PM", temp: 75, icon: Sun },
  { time: "6 PM", temp: 73, icon: CloudRain },
  { time: "9 PM", temp: 69, icon: Moon },
];

export default function HourlyForecast() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {hourlyData.map((hour) => (
        <Card key={hour.time}>
          <CardContent className="p-4 text-center">
            <p className="font-semibold">{hour.time}</p>
            <hour.icon className="mx-auto my-2 h-8 w-8" />
            <p className="text-lg font-bold">{hour.temp}°F</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
