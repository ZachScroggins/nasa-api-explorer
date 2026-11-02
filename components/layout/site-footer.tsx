import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          Data and images from NASA&apos;s open APIs. This project isn&apos;t
          affiliated with or endorsed by NASA.
        </p>
        <Link href="/about" className="underline-offset-4 hover:underline">
          About the APIs
        </Link>
      </div>
    </footer>
  )
}
