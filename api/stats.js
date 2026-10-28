// Vercel serverless function: GET /api/stats
// Reads your own Instagram numbers with the token stored in Vercel's
// environment settings (IG_ACCESS_TOKEN). The token never reaches the browser.
// Responses are cached at the edge for 24 hours, so Instagram is called
// at most about once a day.

export default async function handler(req, res) {
  const token = process.env.IG_ACCESS_TOKEN;
  if (!token) return res.status(503).json({ error: "IG_ACCESS_TOKEN is not set" });

  const base = "https://graph.instagram.com";
  const out = { instagram: {}, updated: new Date().toISOString() };

  try {
    const me = await fetch(`${base}/me?fields=followers_count&access_token=${token}`).then(r => r.json());
    if (me.followers_count != null) out.instagram.followers = me.followers_count;

    // Account views over the last 30 days (Instagram allows a range of up to 30 days).
    const until = Math.floor(Date.now() / 1000);
    const since = until - 30 * 24 * 3600;
    const ins = await fetch(
      `${base}/me/insights?metric=views&period=day&metric_type=total_value&since=${since}&until=${until}&access_token=${token}`
    ).then(r => r.json());
    const views = ins?.data?.[0]?.total_value?.value;
    if (views != null) out.instagram.views30d = views;

    // TikTok is added here once its developer app is set up.

    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=86400");
    return res.status(200).json(out);
  } catch (e) {
    return res.status(502).json({ error: "Could not reach Instagram" });
  }
}
