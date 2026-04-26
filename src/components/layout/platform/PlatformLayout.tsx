"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import PlatformSidebar from "./PlatformSidebar";
import PlatformTopNav from "./PlatformTopNav";

interface PlatformLayoutProps {
  children: React.ReactNode;
}

export default function PlatformLayout({ children }: PlatformLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const locale = useLocale();
  const isRTL = locale === "ar";

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    const frameId = window.requestAnimationFrame(() => {
      setIsClient(true);
      handleResize();
    });
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PlatformSidebar isOpen={false} isRTL={isRTL} onToggle={() => {}} />
        <div className="flex flex-1 flex-col transition-all duration-300 lg:ml-20">
          <PlatformTopNav isSidebarOpen={false} onMenuToggle={() => {}} />
          <main className="min-h-screen bg-background">{children}</main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PlatformSidebar
        isOpen={isSidebarOpen}
        isRTL={isRTL}
        onToggle={() => setIsSidebarOpen((current) => !current)}
      />
      <div
        className={`flex flex-1 flex-col transition-all duration-300 ${
          isRTL
            ? isSidebarOpen
              ? "lg:mr-[260px]"
              : "lg:mr-20"
            : isSidebarOpen
              ? "lg:ml-[260px]"
              : "lg:ml-20"
        }`}
      >
        <PlatformTopNav
          isSidebarOpen={isSidebarOpen}
          onMenuToggle={() => setIsSidebarOpen((current) => !current)}
        />
        <main className="min-h-screen bg-background">{children}</main>
      </div>
    </div>
  );
}
