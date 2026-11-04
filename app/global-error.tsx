'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { errorDigest } from '@/lib/errors';

import './globals.css';

/** Replaces the root layout when it fails, so it brings its own document. */
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const digest = errorDigest(error);

  return (
    <html lang="en">
      <body className="flex min-h-svh items-center justify-center p-8 font-sans antialiased">
        <title>Something went wrong | NASA API Explorer</title>
        <main className="flex max-w-sm flex-col items-center gap-4 text-center">
          <h1 className="text-lg font-semibold">The explorer lost its signal</h1>
          <p className="text-sm text-muted-foreground">
            Something failed before the page could load. Try again; if it keeps happening, the
            reference below helps track it down.
          </p>
          <Button onClick={() => retry()}>Try again</Button>
          {digest && <p className="font-mono text-xs text-muted-foreground">Reference: {digest}</p>}
        </main>
      </body>
    </html>
  );
}
