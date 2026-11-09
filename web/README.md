# Anshit Sharma, portfolio

A one-page portfolio set like a printed monograph on black. It is built to stay fast on slow connections and low-end phones: the page is fully server-rendered HTML and CSS, with one self-hosted serif and no UI or animation libraries.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Where things live

| Path | What it holds |
| --- | --- |
| `lib/content.ts` | Every claim on the page: the five systems and their stops, skills, jobs, links, the resume path, the contact form key. Edit copy here. |
| `lib/route.ts` | Draws the experience timeline to scale. "Today" comes from the current date, so the line grows on its own. |
| `lib/github.ts` | Fetches the last twelve months of GitHub contributions (cached for a day). If the service is down, the ledger is left out. |
| `components/` | One server component per section, plus `Enhance.tsx`, the only client code. |
| `app/globals.css` | The whole stylesheet: tokens, sections, motion and the two breakpoints (999px and 759px). |
| `app/fonts/` | Newsreader roman (variable optical size) and italic, subset to Latin text. |

## The figures

- **Fig. 0** in the opening section times the visitor's own page load with the Navigation and Resource Timing APIs, and shows it as a waterfall.
- **Fig. 1 to 6** draw each system as a line of stops, with what it replaced struck through. Pointing at a stop puts its explanation in the caption. On phones the line turns vertical and every explanation is shown.
- **The route** is the timeline, drawn to scale. Hovering a job lights its stretch of the line, and the other way round.
- **On GitHub** is a year of contributions, one square per day.

The page is regenerated once a day (`revalidate = 86400` in `app/page.tsx`), which refreshes the timeline's "today" and the GitHub numbers.

## Settings

- **Resume:** set `site.resume` in `lib/content.ts` to a PDF path (for example `/Anshit_Sharma_Resume.pdf`, placed in `public/`) to show the resume buttons. They stay hidden while it is `null`.
- **Contact form:** posts to Web3Forms with the public access key in `site.formKey`. Without JavaScript the browser submits the form directly.
- **Fonts:** the font files are subset to printable ASCII plus curly quotes, dashes, the ellipsis, `×`, `é` and `→`. Any other character falls back to a system serif. To add characters, download a new subset from Google Fonts with the `text=` parameter.
- **Analytics:** Vercel Web Analytics, which only loads on Vercel deployments.
