import { PlatformLayout } from "@/components/layout/platform";
import { NavigationGuardProvider } from "@/providers/NavigationGuardProvider";
import { ProgressBarProvider } from "@/providers/ProgressBarProvider";
import { UnsavedChangesProvider } from "@/providers/UnsavedChangesProvider";
import { ToastProvider } from "@/components/ui/toast/Toast";

export default function PlatformRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <UnsavedChangesProvider>
        <NavigationGuardProvider>
          <ProgressBarProvider>
            <PlatformLayout>{children}</PlatformLayout>
          </ProgressBarProvider>
        </NavigationGuardProvider>
      </UnsavedChangesProvider>
    </ToastProvider>
  );
}
