// src/app/api/location/search/route.ts
import { NextResponse } from "next/server";

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 },
      );
    }

    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`OpenWeatherMap API error: ${response.statusText}`);
    }

    const data = (await response.json()) as {
      name: string;
      lat: number;
      lon: number;
    }[];
    return NextResponse.json(data);
  } catch (error) {
    console.error("Location search error:", error);
    return NextResponse.json(
      { error: "Failed to search locations" },
      { status: 500 },
    );
  }
}
