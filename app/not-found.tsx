import Link from "next/link";

export default function NotFound(){
    return(
     <main className="max-w-xl mx-auto px-6 py-24 space-y-6 text-center ">
      <h1 className="text-2xl font-medium ">Page not found</h1>

      <p className="text-neutral-500">
        The page you’re looking for doesn’t exist or was removed.
      </p>

      <div className="flex justify-center gap-4 text-sm">
        <Link
          href="/"
          className="underline text-neutral-700"
        >
          Go home
        </Link>

        <Link
          href="/notes"
          className="underline text-neutral-700"
        >
          Read notes
        </Link>
      </div>
    </main>

    )
}