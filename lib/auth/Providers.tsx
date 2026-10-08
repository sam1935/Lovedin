"use client";
import { useNotificationManager } from "@/hooks/useNotificationManager";
import InAppNotificationToast from "@/app/components/ui/InAppNotificationToast";
import ToastProvider from "@/app/components/ui/ToastProvider";

function NotificationWrapper({ children }: { children: React.ReactNode }) {
  useNotificationManager();
  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NotificationWrapper>
      {children}
      <ToastProvider />
      <InAppNotificationToast />
    </NotificationWrapper>
  );
}

