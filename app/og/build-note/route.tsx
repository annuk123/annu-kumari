// import { ImageResponse } from "@vercel/og";
// import { api } from "@/convex/_generated/api";
// import { fetchQuery } from "convex/nextjs";
// import { Id } from "@/convex/_generated/dataModel";

// export const runtime = "edge";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");

//   if (!id) {
//     return new ImageResponse(
//       <div style={{ fontSize: 40 }}>Missing id</div>,
//       { width: 1200, height: 630 }
//     );
//   }

//   const post = await fetchQuery(api.buildNotes.getByIdPublic, {
//     id: id as Id<"buildNotes">,
//   });

//   if (!post) {
//     return new ImageResponse(
//       <div style={{ fontSize: 40 }}>Not found</div>,
//       { width: 1200, height: 630 }
//     );
//   }

//   return new ImageResponse(
//     (
//       <div
//         style={{
//           width: "100%",
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           padding: "80px",
//           background: "#ffffff",
//           color: "black",
//         }}
//       >
//         <h1 style={{ fontSize: 64, marginBottom: 24 }}>
//           {post.title}
//         </h1>
//         <p style={{ fontSize: 32, opacity: 0.85 }}>
//           {post.summary}
//         </p>
//         <span style={{ marginTop: 40, fontSize: 24, opacity: 0.6 }}>
//           Nexra AI • Build Notes
//         </span>
//       </div>
//     ),
//     {
//       width: 1200,
//       height: 630,
//     }
//   );
// }


import { ImageResponse } from "next/og";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new ImageResponse(
      <div style={{ fontSize: 40 }}>Missing id</div>,
      { width: 1200, height: 630 }
    );
  }

  const post = await fetchQuery(api.buildNotes.getByIdPublic, {
    id: id as Id<"buildNotes">,
  });

  if (!post) {
    return new ImageResponse(
      <div style={{ fontSize: 40 }}>Not found</div>,
      { width: 1200, height: 630 }
    );
  }
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: 64, fontWeight: 600 }}>
          {post?.title ?? "Build note"}
        </h1>
        <p style={{ fontSize: 28, opacity: 0.7 }}>
          {post?.summary}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
