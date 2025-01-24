import { Cloud, CloudRain, Sun } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const weeklyData = [
  { day: "Mon", temp: 72, icon: Sun },
  { day: "Tue", temp: 68, icon: Cloud },
  { day: "Wed", temp: 75, icon: Sun },
  { day: "Thu", temp: 71, icon: CloudRain },
  { day: "Fri", temp: 67, icon: Cloud },
  { day: "Sat", temp: 69, icon: Sun },
  { day: "Sun", temp: 72, icon: Sun },
];

export default function WeeklyForecast() {
  return (
    <div className="grid grid-cols-7 gap-4">
      {weeklyData.map((day) => (
        <Card key={day.day}>
          <CardContent className="p-4 text-center">
            <p className="font-semibold">{day.day}</p>
            <day.icon className="mx-auto my-2 h-8 w-8" />
            <p className="text-lg font-bold">{day.temp}°F</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
