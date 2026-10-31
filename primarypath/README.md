# PrimaryPath

Coded front-end for PrimaryPath, an AI-assisted assessment system for children in Grades 1 to 5 (CSEN 909, Winter 2026, Milestone 3 bonus). Students upload exam papers, and teachers verify the OCR text, confirm or override AI grades and red flags, and send feedback. It also includes parent and counsellor views.

All AI output (OCR text, grades, feedback, drafts) is mocked, as the project brief allows. There is no back-end, and uploaded files stay in the browser.

## Requirements

- [Node.js](https://nodejs.org) 20.19 or newer in the 20 line, or 22.12 or newer. npm comes with it.
- A modern browser such as Chrome, Edge or Firefox.
- An internet connection for the install step and the web fonts.

The full list is in [requirements.txt](requirements.txt). You don't install packages one by one, because `npm install` handles them all.

To check your version, run `node --version`.

## Install and run

1. Get the project and open a terminal in its folder (the one containing `package.json`).

2. Install the packages. You only need to do this once:

   ```bash
   npm install
   ```

3. Start the app:

   ```bash
   npm run dev
   ```

4. Open the address it prints, usually http://localhost:5173.

5. To stop the app, press `Ctrl + C` in the terminal.

### If you get an error on Windows

| Error | Fix |
|---|---|
| `npm is not recognized` | Install Node.js, then close and reopen your terminal and editor. |
| `running scripts is disabled on this system` | Use `npm.cmd install` and `npm.cmd run dev` instead. |

## Commands

| Command | What it does |
|---|---|
| `npm install` | Installs the packages |
| `npm run dev` | Runs the app for development |
| `npm run build` | Checks the types and builds the site into `dist/` |
| `npm run preview` | Serves the built site locally, after `npm run build` |
| `npm run lint` | Checks the code for common problems |

## Deploy

Run `npm run build` to create a static site in `dist/`.

- **Vercel:** import the repository. It detects Vite automatically.
- **GitHub Pages:** publish the contents of `dist/`. Paths are relative and routes use `#`, so it works from a sub-folder.

## How to test the full workflow

Pick a role on the login screen and press the log in button. No real password is needed. Logging in resets the demo data.

**Student (Lina)**
1. Map > Upload my exam > Take a photo. Page 2 is blurry, so sending is blocked until you press Retake.
2. Send to your teacher, tick the checklist, then see the status trail.
3. Open the Mailbox > Read to see the grade, feedback and red flag. Try Read to me and EN / DE.
4. Beat it! to play the riddle (the right answer is 3/4). Try the hints, Tiny video and Pizza scale.
5. Winning adds a sticker and marks the weak point as fixed under Progress and Stickers.

**Teacher (Ms. Salma)**
1. Home > Start grading.
2. Check scans: correct or accept the low-confidence word. Next stays locked until you do.
3. Confirm grades: confirm a group, or Change grade (a reason is required).
4. Gaps and red flags: assign or dismiss, with undo.
5. Feedback: edit the AI draft, change tone or language, and watch the pupil preview update.
6. Publish: confirm, with a 10-second undo.

Also try New exam, Classes, Insights and Alerts.

**Parent** is a phone layout with a child switcher. **Counsellor** is a referral inbox.

## Stack

React, TypeScript, Vite, React Router and lucide-react icons. Illustrations are vectors exported from the team's Penpot file.

```
src/
  art.tsx        illustrations
  state.tsx      shared demo state, toasts, dialogs, speech
  Login.tsx      role picker
  student/       storybook screens for pupils
  teacher/       teacher workspace, grading, exam wizard, parent, counsellor
  styles/        design tokens and the two visual voices
```
