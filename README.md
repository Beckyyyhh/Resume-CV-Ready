# Resume Ready

A free, public step-by-step builder that helps high school students write a resume and cover letter, with samples, sentence starters and ideas for every section — then download a finished, professional PDF or Word document.

- Resume Builder (`/resume`) and Cover Letter Builder (`/cover-letter`) — multi-step wizards covering every section from the "How to Write a Winning Resume" and "How to Write a Winning Cover Letter" student workbooks, each with instructions, "what to include" checklists, clickable sentence starters, worked examples and (where relevant) idea word-banks for students with no prior work experience.
- A live preview updates as the student types, and progress auto-saves to the browser's own `localStorage` — nothing is ever sent to a server.
- "Finalise" generates a polished PDF (via `@react-pdf/renderer`) and/or Word document (via `docx`) entirely client-side, ready to download.

## Stack

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4. No database, no accounts, no backend — fully static/client-side.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3100](http://localhost:3100) (or whichever port `next dev` chooses).

## Deploying

This is a plain static/client-rendered Next.js app with no environment variables or database required — it can be deployed to Vercel (or any Next.js host) by importing the repo, no additional configuration needed.
