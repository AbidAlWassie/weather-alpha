// src/app/page.tsx
import Link from "next/link";
import { WeatherOverview } from "~/components/WeatherOverview";
import { WeatherSearch } from "~/components/WeatherSearch";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-white">
          Weather <span className="text-[hsl(280,100%,70%)]">Forecast</span>
        </h1>
        <WeatherSearch />
        <WeatherOverview />
        <div className="mt-8 text-center">
          {session ? (
            <div>
              <p className="mb-4 text-white">
                Logged in as {session.user?.name}
              </p>
              <Link
                href="/api/auth/signout"
                className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              >
                Sign out
              </Link>
            </div>
          ) : (
            <Link
              href="/api/auth/signin"
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </HydrateClient>
  );
}
