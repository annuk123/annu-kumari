// import { Auth } from "convex/server";

// export async function requireAdmin(auth: Auth) {
//   const identity = await auth.getUserIdentity();

 


//   if (!identity) {
//     throw new Error("Not authenticated");
//   }

//   // ✅ role is a TOP-LEVEL JWT claim
//   if ((identity as any).role !== "admin") {
//     throw new Error("Not authorized");
//   }

//   return identity;
// }

import type { Auth } from "convex/server";

export async function requireAdmin(auth: Auth) {
  const identity = await auth.getUserIdentity();
  if (!identity) throw new Error("Not authenticated");

  const role = (identity as Record<string, unknown>).role;
  if (role !== "admin") throw new Error("Not authorized");

  // second lock: must also be your Clerk user
  if (identity.subject !== process.env.ADMIN_CLERK_USER_ID) {
    throw new Error("Not authorized");
  }

  return identity;
}
