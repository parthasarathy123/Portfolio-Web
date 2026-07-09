# Deployment

Recommended workflow: connect this repo to Vercel through GitHub. Every push to `main` becomes production, and other branches get preview URLs.

## First deploy

1. Push this folder to a GitHub repo.
2. In Vercel, choose Add New Project, import the repo, and keep the Framework Preset as Next.js.
3. Use the defaults:
   - Install Command: `pnpm install`
   - Build Command: `pnpm build`
   - Output Directory: Next.js default
4. Deploy.

## Updating with Codex

1. Ask Codex to edit the site. Most copy lives in `content/site.ts`.
2. Codex runs a build check.
3. Commit and push changes to GitHub.
4. Vercel automatically creates a deployment.

## Custom domain

In Vercel, open the project, go to Settings, then Domains, add your domain, and follow the DNS instructions.
