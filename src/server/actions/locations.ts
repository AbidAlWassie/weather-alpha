// src/server/actions/locations.ts
"use server";

import { z } from "zod";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

type LocationInput = {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
};

export async function addLocation(input: LocationInput) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const location = await db.location.create({
      data: {
        name: input.name,
        latitude: input.latitude,
        longitude: input.longitude,
        userId: session.user.id,
      },
    });

    return { success: true, data: location };
  } catch (error) {
    console.error("Error adding location:", error);
    return { success: false, error: "Failed to add location" };
  }
}

export async function getLocations() {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const locations = await db.location.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: locations };
  } catch (error) {
    console.error("Error fetching locations:", error);
    return { success: false, error: "Failed to fetch locations" };
  }
}

export async function deleteLocation(id: string) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    await db.location.delete({
      where: {
        id,
        userId: session.user.id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting location:", error);
    return { success: false, error: "Failed to delete location" };
  }
}

const WeatherDataSchema = z.object({
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    humidity: z.number(),
  }),
  weather: z.array(
    z.object({
      main: z.string(),
      description: z.string(),
    }),
  ),
  wind: z.object({
    speed: z.number(),
  }),
});

export type WeatherData = z.infer<typeof WeatherDataSchema>;

export async function getLocation(id: string) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const location = await db.location.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!location) {
      throw new Error("Location not found");
    }

    const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&units=metric`,
    );

    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const weatherData: unknown = await weatherResponse.json();
    const parsedWeatherData = WeatherDataSchema.parse(weatherData);

    return {
      success: true as const,
      data: {
        location,
        weather: parsedWeatherData,
      },
    };
  } catch (error) {
    console.error("Error fetching location:", error);
    return { success: false as const, error: "Failed to fetch location" };
  }
}
