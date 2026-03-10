"use client";

import { useAuth } from "../app/context/AuthContext";
import { useRouter } from "next/navigation";
import { userAgent } from "next/server";
import { useEffect } from "react";

type RoleGuardProps = {
  allowedRoles: string[];
  children: React.ReactNode;
};

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {

    if (!user) return;

    if (!allowedRoles.includes(user.role)) {
      router.push("/dashboard");
    }

  }, [user, allowedRoles, router]);

  if (!user) return null;

  if (!allowedRoles.includes(user.role)) {
    return <p style={{ padding: "20px" }}>Access Denied</p>;
  }

  return <>{children}</>;
}