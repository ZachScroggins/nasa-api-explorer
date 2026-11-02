/** Days when EPIC caught something unusual. Every date has natural imagery. */
export const epicEvents = [
  {
    date: "2024-04-08",
    title: "Total solar eclipse over North America",
    detail: "The Moon's shadow crosses Mexico, the US and Canada.",
  },
  {
    date: "2023-10-14",
    title: "Annular solar eclipse over the Americas",
    detail: "A ring-of-fire eclipse tracks from Oregon to Brazil.",
  },
  {
    date: "2020-06-18",
    title: "Saharan dust plume",
    detail: "A huge cloud of dust drifts west across the Atlantic.",
  },
  {
    date: "2017-08-21",
    title: "Great American Eclipse",
    detail: "The first coast-to-coast total eclipse in the US since 1918.",
  },
  {
    date: "2017-02-26",
    title: "Annular eclipse over the South Atlantic",
    detail: "The shadow sweeps from Chile and Argentina to Africa.",
  },
  {
    date: "2016-03-09",
    title: "Total eclipse over the Pacific",
    detail: "The Moon's shadow crosses Indonesia and the open Pacific.",
  },
] as const satisfies readonly { date: string; title: string; detail: string }[]
