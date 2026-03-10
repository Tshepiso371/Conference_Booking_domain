"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../app/context/AuthContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {

  const { token } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {

    // If no token and user tries to access dashboard
    if (!token && pathname.startsWith("/dashboard")) {
      router.push("/login");
    }

  }, [token, pathname, router]);

  return <>{children}</>;
}