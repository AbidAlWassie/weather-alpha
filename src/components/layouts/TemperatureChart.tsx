"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const data = [
  { name: "Mon", temp: 72 },
  { name: "Tue", temp: 68 },
  { name: "Wed", temp: 75 },
  { name: "Thu", temp: 71 },
  { name: "Fri", temp: 67 },
  { name: "Sat", temp: 69 },
  { name: "Sun", temp: 72 },
];

export default function TemperatureChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Temperature Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
