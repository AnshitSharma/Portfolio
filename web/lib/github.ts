// GitHub contributions for the last twelve months, fetched on the server and cached for a day.
// If the service is down the ledger is simply left out of the page.

export type Day = { date: string; count: number; level: number };

export async function getContributions(user: string): Promise<{ total: number; days: Day[] } | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { total?: { lastYear?: number }; contributions?: Day[] };
    const days = json.contributions;
    if (!Array.isArray(days) || days.length < 30) return null;
    const total = json.total?.lastYear ?? days.reduce((a, d) => a + d.count, 0);
    return { total, days };
  } catch {
    return null;
  }
}
