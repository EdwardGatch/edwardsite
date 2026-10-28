EDWARD'S SITE: HOW TO GO LIVE

Files: index.html (landing), resources.html, story.html, work.html, site.css, site.js,
assets/ (images + videos), api/stats.js (live Instagram follower count, runs on Vercel), package.json.

Links live in site.js under "EDIT YOUR LINKS HERE" (Calendly, guides, King's Club).
Optional files: assets/edward.png (half-body photo), assets/thumb-1.jpg ... thumb-6.jpg (reel covers).

Deploy (GitHub + Vercel):
1. github.com > New repository > upload every file in this folder (not the folder itself) > Commit.
2. vercel.com > Add New > Project > import that repo > Deploy. Leave all settings as they are.
3. Vercel > Project > Settings > Environment Variables: IG_ACCESS_TOKEN = your token > Redeploy.
4. Vercel > Settings > Domains: add your domain and copy the DNS records it shows into your domain provider.

Any future edit: change the file on GitHub, and Vercel republishes automatically.
