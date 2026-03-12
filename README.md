# 0xGeN02 Terminal Portfolio

Interactive portfolio built with Next.js, React, TypeScript, and Tailwind CSS.

The site is designed as a terminal-first personal portfolio: visitors can type commands such as `whoami`, `projects`, `experience`, `contact`, or `curl` to explore the profile. Some commands open full-screen overlays for richer sections like projects and contact.

## Preview

- Terminal-style landing page with command history and autocomplete
- `whoami` section with fastfetch-inspired profile output
- `projects` overlay with image cards
- `contact` overlay with social links and a minimal terminal-style message form
- `experience` command that groups both work experience and education
- `curl` command to download the CV directly
- Static export configured for GitHub Pages

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- React Icons
- Catppuccin Mocha-inspired palette

## Commands

Available terminal commands:

- `help` - show available commands
- `whoami` - profile / fastfetch-style summary
- `skills` - technologies and stack
- `projects` - open project gallery overlay
- `experience` - work experience and education
- `contact` - open contact overlay
- `curl` - download CV / resume
- `blog` - blog section
- `banner` - show ASCII banner
- `loadkeys en|es` - switch language
- `clear` - clear terminal output
- `sudo` - easter egg

## Local Development

Requirements:

- Node.js `>=24 <25`
- `pnpm 10.26.2`

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open `http://localhost:3000`.

Other scripts:

```bash
pnpm build
pnpm start
pnpm lint
```

## Project Structure

```text
app/
  components/
    Terminal.tsx
    commands/
      blog.tsx
      contact.tsx
      education.tsx
      experience.tsx
      projects.tsx
      skills.tsx
      whoami.tsx
  lib/
    commands.tsx
    data.ts
    site.ts
    types.ts
public/
  pdf/
.github/workflows/
  deploy-pages.yml
```

Key files:

- `app/components/Terminal.tsx` - terminal shell, input handling, overlays, history
- `app/lib/commands.tsx` - command registry and command execution
- `app/lib/data.ts` - all profile content in English and Spanish
- `app/components/commands/*.tsx` - command output UIs
- `app/lib/site.ts` - base-path aware helpers for GitHub Pages
- `next.config.ts` - static export and Pages configuration

## Customization

### Edit content

Most portfolio content lives in:

- `app/lib/data.ts`

This includes:

- profile summary
- achievements
- skills
- projects
- work experience
- education
- contact links
- CV URL

### Update command behavior

Command names and descriptions are defined in:

- `app/lib/commands.tsx`

### Update visuals

Main terminal shell:

- `app/components/Terminal.tsx`

Global styles:

- `app/globals.css`

### Replace the CV

Put your PDF in:

- `public/pdf/`

Then update `cvUrl` in `app/lib/data.ts`.

### Replace project images

Put project screenshots in `public/image/` and update the `image` fields in `app/lib/data.ts`.

## GitHub Pages Deployment

This project is already configured for static deployment to GitHub Pages.

What is included:

- `next.config.ts` configured with `output: "export"`
- `images.unoptimized = true` for static export
- repo-aware `basePath` / `assetPrefix`
- `.github/workflows/deploy-pages.yml` workflow for automatic deployment

### Enable Pages in GitHub

In your repository:

1. Go to `Settings` -> `Pages`
2. Under `Build and deployment`, choose `GitHub Actions`
3. Push to `main`

The workflow will build the static export and publish it automatically.

For a standard project repository, the site would be available at:

```text
https://<your-user>.github.io/website/
```

Because this repository is named `0xGeN02.github.io`, GitHub Pages serves it from the root domain instead of a repo subpath. Your site URL is:

```text
https://0xGeN02.github.io/
```

## Notes

- The project uses a repo base path on GitHub Pages, so asset URLs should go through `withBasePath(...)` when needed.
- `next/image` is configured in unoptimized mode because GitHub Pages does not provide the Next.js image optimizer.
- The production deployment is static, so anything requiring a backend should use an external service or a client-side fallback.

## License

This repository currently has no explicit license. Add one if you want others to reuse the code.
