# Govindarajula Adarsh: Portfolio

Live site: https://gsnadarsh24.github.io

Built with [Hugo](https://gohugo.io) (extended), the Hugo Blox Developer Portfolio template and Tailwind CSS.

## Run locally

Requires Hugo extended 0.169+, Go and Node.js.

```bash
npm install
hugo server
```

The `tailwindcss` command must be on your PATH (`node_modules/.bin`).

## Deploy

Every push to `main` builds the site and publishes it to GitHub Pages through `.github/workflows/deploy.yml`.
In the repository settings, set **Pages > Source** to **GitHub Actions**.

## Where things are

- `content/` project pages and the home page
- `data/authors/me.yaml` profile, experience and education
- `assets/css/` and `assets/js/` custom styling and behaviour
- `static/uploads/resume.pdf` the resume download

Template license: MIT (see `LICENSE.md`).
