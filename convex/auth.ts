import { Auth } from "convex/server";

export async function requireAdmin(auth: Auth) {
  const identity = await auth.getUserIdentity();

 


  if (!identity) {
    throw new Error("Not authenticated");
  }

  // ✅ role is a TOP-LEVEL JWT claim
  if ((identity as any).role !== "admin") {
    throw new Error("Not authorized");
  }

  return identity;
}
