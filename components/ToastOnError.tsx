// components/toast-on-error.tsx
"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function ToastOnError({ message }: { message: string }) {
  useEffect(() => {
    toast.error(message);
  }, [message]);

  return null; // renders nothing — just triggers the side effect
}
