# Gita Verse of the Day

A small web app that shows one Bhagavad Gita verse each calendar day: Sanskrit, an English rendering, the chapter and verse citation, and a short context note.

The verse is chosen from a bundled collection by local calendar day, so the same date always shows the same verse. There is no account, database, or backend.

Live GitHub Pages URL after you enable Pages:

[https://sahil-sagar.github.io/GitaVerseofDay/](https://sahil-sagar.github.io/GitaVerseofDay/)

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

### 1. Create the GitHub repository

On GitHub, create a repository named `GitaVerseofDay` under the `sahil-sagar` account if it does not exist yet. A public repo is simplest for Pages.

### 2. Add GitHub as a remote and push

From this project:

```bash
git remote add github https://github.com/sahil-sagar/GitaVerseofDay.git
git push -u github main
```

If your GitHub remote should be the primary `origin` instead:

```bash
git remote add origin https://github.com/sahil-sagar/GitaVerseofDay.git
git push -u origin main
```

SSH works the same way:

```bash
git remote add github git@github.com:sahil-sagar/GitaVerseofDay.git
git push -u github main
```

Pushing `main` is what publishes the site. Feature-branch work can go through a pull request; the deploy workflow runs on `main`.

### 3. Enable Pages from GitHub Actions

In the GitHub repo:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Wait for the **Deploy GitHub Pages** workflow on `main` to finish.

The workflow in `.github/workflows/deploy-github-pages.yml` builds the static export with `basePath` `/GitaVerseofDay` and deploys the `out/` folder.

After the first successful deploy, the site is at:

`https://sahil-sagar.github.io/GitaVerseofDay/`

If assets 404, confirm the repository name is exactly `GitaVerseofDay` and that Pages is using GitHub Actions rather than a `/docs` folder.

## How the daily verse works

Verses live in `data/verses.ts`. The app picks one with the local day of year, so 1 January is the first verse, and the collection then cycles. Because GitHub Pages is a static host, the date is resolved in the browser after the page loads.

Sanskrit is the traditional public-domain Gita text. The English lines are original paraphrases written for this app, not a published translator’s edition.
