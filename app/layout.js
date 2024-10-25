"use client";

import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/store/provider";
import Sidebar from "./components/common/Sidebar";
import Navbar from "./components/common/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="font-custom h-full"      >
        <Navbar />
        <Providers>
          <div className="">
            <Sidebar>
              {children}
            </Sidebar>
          </div>
        </Providers>
      </body>
    </html>
  );
}
