# Gita Verse of the Day

A small web app that shows a Bhagavad Gita verse whenever you open or refresh the page: Sanskrit, an English rendering, the chapter and verse citation, a note for today, and a deeper meaning for ordinary life.

The collection is the complete traditional recension — all 701 verses across 18 chapters (chapter 13 has 35 verses). Each refresh picks a new verse and avoids immediately repeating the last one. There is no account, database, or backend. On a phone, use Add to Home Screen to keep the page one tap away.

Live GitHub Pages URL after Pages is enabled and the deploy workflow succeeds:

[https://sagarsahil.github.io/GitaVerseofDay/](https://sagarsahil.github.io/GitaVerseofDay/)

## Run locally

You need Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:43127](http://localhost:43127).

To build the static site:

```bash
npm run build
```

The export lands in `out/`. Preview it with any static server, for example:

```bash
npx --yes serve out -p 43127
```

Use `GITHUB_PAGES=true npm run build` if you want a production build with the `/GitaVerseofDay` base path that GitHub Pages uses.

## Publish to GitHub Pages

This project is already set up for GitHub Pages as a static export. You do not need Vercel or a Node host.

The public GitHub repo is [sagarsahil/GitaVerseofDay](https://github.com/sagarsahil/GitaVerseofDay).

### 1. Add GitHub as a remote and push

From this project, if the `github` remote is not already set:

```bash
git remote add github https://github.com/sagarsahil/GitaVerseofDay.git
git push -u github main
```

SSH:

```bash
git remote add github git@github.com:sagarsahil/GitaVerseofDay.git
git push -u github main
```

Pushing `main` builds the site. The deploy step only succeeds after Pages is enabled (next section).

### 2. Enable Pages from GitHub Actions

A push alone is not enough. The first deploy fails with 404 until Pages exists on the repo.

1. Open [Settings → Pages](https://github.com/sagarsahil/GitaVerseofDay/settings/pages).
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Re-run the failed **Deploy GitHub Pages** workflow: [Actions](https://github.com/sagarsahil/GitaVerseofDay/actions) → the latest run → **Re-run jobs**. You do not need to push new app code.

The workflow in `.github/workflows/deploy-github-pages.yml` builds the static export with `basePath` `/GitaVerseofDay` and deploys the `out/` folder.

After the first successful deploy, the site is at:

`https://sagarsahil.github.io/GitaVerseofDay/`

If assets 404, confirm the repository name is exactly `GitaVerseofDay` and that Pages is using GitHub Actions rather than a `/docs` folder.

## How a verse is chosen

Verses live in `data/verses.ts` — the full Gita, not a short anthology. The app picks one at random in the browser after the page loads, and remembers the last verse in `localStorage` so a refresh does not show the same one twice in a row. Because GitHub Pages is a static host, there is no server-side daily lock.

On a phone, open the browser share or menu and choose **Add to Home Screen** so the page sits next to your other apps.

Sanskrit is the traditional public-domain Gita text. Fifty-seven well-known verses keep English notes written for this app. The rest of the English follows Shri Purohit Swami’s 1935 public-domain translation, lightly regularized. Context, “For today,” and deeper meaning on every verse are original. This is not a reprint of a modern copyrighted edition (Sivananda, Prabhupada, and similar).
