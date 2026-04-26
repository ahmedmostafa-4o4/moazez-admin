"use client";

import Sidebar from "@/components/layout/Sidebar";
import { platformBottomItems, platformMenuItems } from "@/config/navigation";
import { useTranslations } from "next-intl";

interface PlatformSidebarProps {
  isOpen: boolean;
  isRTL: boolean;
  onToggle: () => void;
}

export default function PlatformSidebar({
  isOpen,
  isRTL,
  onToggle,
}: PlatformSidebarProps) {
  const t = useTranslations("platform");

  return (
    <Sidebar
      onSelect={() => {}}
      menuItems={platformMenuItems}
      bottomItems={platformBottomItems}
      schoolName={t("scopeName")}
      scopeLabel={t("scopeLabel")}
      isOpen={isOpen}
      onToggle={onToggle}
      isRTL={isRTL}
    />
  );
}
