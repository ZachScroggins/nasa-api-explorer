# NASA API Explorer

Browse NASA's open data in one place:

- **Astronomy Picture of the Day**: any day since June 16, 1995, including videos.
- **Earth from EPIC**: full-disc Earth images from DSCOVR at the Sun–Earth L1 point, playable as a time-lapse, with distances worked out from each image's position data.
- **NASA Image Library**: search NASA's image archive and open any result's full description and original file.

## Stack

Next.js 16 (App Router, Cache Components, React Compiler, typed routes), React 19, TypeScript 7, Tailwind CSS 4, shadcn/ui (Base UI, preset `b0`), React Hook Form, Zod, next-themes and react-icons.

Pages are server components that fetch from NASA directly. Every response is validated with a Zod schema in `lib/nasa/` and cached with `"use cache"`.

## Run it

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. No API key is needed: APOD, EPIC and the image library endpoints used here are all keyless.

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the dev server                          |
| `npm run build`     | Production build                              |
| `npm run typecheck` | Generate route types and type-check with TS 7 |
| `npm run lint`      | ESLint (Next.js core web vitals + TypeScript) |
| `npm run format`    | Prettier with import sorting and Tailwind     |

`typescript` is aliased to `@typescript/typescript6` so typescript-eslint and Next.js can use the TS 6 API, while `tsc` runs TypeScript 7 (`@typescript/native`). This follows [Microsoft's side-by-side guidance](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/). `.npmrc` sets `legacy-peer-deps` because `@hookform/resolvers` 6 declares conflicting optional peers.

## Data sources

| Feature       | Endpoint                                            |
| ------------- | --------------------------------------------------- |
| APOD          | `https://science.nasa.gov/wp-json/wp/v2/apod-basic` |
| EPIC          | `https://epic.gsfc.nasa.gov/api`                    |
| Image Library | `https://images-api.nasa.gov`                       |

APOD moved to NASA Science on September 10, 2026. The legacy `api.nasa.gov/planetary/apod` endpoint now returns a placeholder and goes offline December 1, 2026.

This project isn't affiliated with or endorsed by NASA.
