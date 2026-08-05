# Louis Wellmeyer - Portfolio

Personal portfolio site.
Horizontal column deck with a terminal aesthetic and a procedural ASCII boid swarm drifting across the background.

Hosted at <https://wellbek.github.io>.

## Structure

- `index.html` - single-page markup, five columns (profile + about, journey, research, projects, certs).
- `css/styles.css` - hand-authored styles, the single source of truth. There is no CSS build step.
- `js/main.js` - swarm engine (older dragon engine kept for reference), vertical timetable, contact pixelate, deck pager.
- `assets/` - fonts, images, publications, CV.

## Hosting

This is a static site served by GitHub Pages from the `main` branch root.
Nothing is compiled, on the server or locally - every file in the repo is served as-is.
`.nojekyll` disables Jekyll so that stays true for dotfiles too.

## Local development

Edit `index.html`, `css/styles.css`, and `js/main.js` directly, then reload.
Serve locally with any static server, for example:

```bash
python3 -m http.server 8765
```

Then open <http://localhost:8765/>.

## Notes

- Asset paths are relative so the site works at any hosting path.
- Image slots with no file yet fall back to an `// add image` placeholder.
  Drop the referenced files into `assets/images/` to fill them in.
- `node_modules/` and local tool dirs are gitignored.
