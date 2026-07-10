# Louis Wellmeyer - Portfolio

Personal portfolio site.
Horizontal column deck with a terminal aesthetic and a procedural ASCII dragon that follows the cursor.

Hosted at <https://wellbek.github.io>.

## Structure

- `index.html` - single-page markup, five columns (profile + about, journey, research, projects, certs).
- `css/styles.scss` - source styles, compiled to `css/styles.css`.
- `js/main.js` - dragon engine, vertical timetable, contact pixelate, deck pager.
- `assets/` - fonts, images, publications, CV.

## Hosting

This is a static site served by GitHub Pages from the `main` branch root.
No build step runs on the server.
The compiled `css/styles.css` is committed, so Pages serves it directly.
`.nojekyll` disables Jekyll so every file is served as-is.

## Local development

Requires Node.js.

```bash
npm install        # installs sass
npm run watch      # recompiles css/styles.css on save
npm run build      # one-off expanded build
npm run build:min  # minified build
```

Serve locally with any static server, for example:

```bash
python3 -m http.server 8765
```

Then open <http://localhost:8765/>.

## Notes

- Asset paths are relative so the site works at any hosting path.
- Image slots with no file yet fall back to an `// add image` placeholder.
  Drop the referenced files into `assets/images/` to fill them in.
- `node_modules/`, build caches, and local tool dirs are gitignored.
