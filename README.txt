Shareef Construction — Starter Website
=====================================

How to use
----------
1) Open `index.html` to preview locally.
2) Deploy to GitHub Pages:
   - Create a new repo (e.g., `shareef-construction`).
   - Push all files.
   - In repo settings, enable GitHub Pages for the `main` branch (root).
   - Your site will be live at `https://<your-username>.github.io/shareef-construction/`.

Customize
---------
- Replace placeholder images in `assets/` with your project photos (JPG/PNG).
- Update business info in the Contact card.
- Add more Services/Projects by duplicating the cards in `index.html`.
- For videos: put MP4 files in `assets/` and add more `<video>` blocks in the Videos section.
- For YouTube/Vimeo: replace the `iframe` `src` with your own links.

Optional backend
----------------
- Hook the contact form to a service (e.g., Netlify Forms, Formspree) or your own API.
- If you add a backend, remove the simulated `setTimeout` in `script.js` submit handler.

Branding
--------
- Edit `assets/logo-mark.svg` to change colors or text.
- Update `<title>` and meta tags in `<head>` for SEO.
