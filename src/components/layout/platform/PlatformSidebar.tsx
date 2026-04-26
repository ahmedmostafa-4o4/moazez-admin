"use client";

import Sidebar from "@/components/layout/Sidebar";
import { platformBottomItems, platformMenuItems } from "@/config/navigation";

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
  return (
    <Sidebar
      onSelect={() => {}}
      menuItems={platformMenuItems}
      bottomItems={platformBottomItems}
      schoolName="Moazzez Platform"
      scopeLabel="Platform Scope"
      isOpen={isOpen}
      onToggle={onToggle}
      isRTL={isRTL}
    />
  );
}
