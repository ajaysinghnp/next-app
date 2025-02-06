import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers/all";

import { app_config } from "@/config/app";
import { business_config } from "@/config/business"

import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${business_config.name} | ${app_config.app_name} ${app_config.app_version}`,
  description: app_config.app_description,
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        geistSans.variable,
        geistMono.variable,
        "antialiased",
        "bg-gradient-to-br from-zinc-400 via-zinc-100 to-blue-200 dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-700 dark:to-slate-950"
      )}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
