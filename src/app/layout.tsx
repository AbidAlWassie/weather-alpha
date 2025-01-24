// src/app/layout.tsx
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

// import { AppSidebar } from "~/components/ui/AppSidebar";
import { AppSidebar } from "~/components/sidebar/app-sidebar";
import { SidebarProvider } from "~/components/ui/sidebar";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Weather App",
  description: "by Abid Al Wassie",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <div className="flex h-screen">
            <SidebarProvider defaultOpen={true}>
              <AppSidebar />
              <main className="flex-1 overflow-auto">{children}</main>
            </SidebarProvider>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
