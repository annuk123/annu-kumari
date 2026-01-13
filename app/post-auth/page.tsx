"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PostAuthRedirect() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.replace("/sign-in");
      return;
    }

    const role = user.publicMetadata?.role;

    if (role === "admin") {
      router.replace("/admin/build-notes");
    } else {
      router.replace("/");
    }
  }, [isLoaded, user, router]);

  return <p>Redirecting…</p>;
}
