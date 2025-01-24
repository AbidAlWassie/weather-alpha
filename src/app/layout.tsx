// src/app/layout.tsx
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

// import { AppSidebar } from "~/components/ui/AppSidebar";
import { AppSidebar } from "~/components/sidebar/app-sidebar";
import { SidebarProvider } from "~/components/ui/sidebar";
import { auth } from "~/server/auth";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Weather App",
  description: "by Abid Al Wassie",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  console.log(session?.user.image);
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <div className="flex h-screen">
            <SidebarProvider defaultOpen={true}>
              <AppSidebar
                session={
                  session &&
                  session.user &&
                  session.user.name &&
                  session.user.email &&
                  session.user.image
                    ? {
                        user: {
                          name: session.user.name,
                          email: session.user.email,
                          image: session.user.image,
                        },
                      }
                    : null
                }
              />
              <main className="flex-1 overflow-auto">{children}</main>
            </SidebarProvider>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
