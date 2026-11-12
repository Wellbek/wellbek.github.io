# Louis Wellmeyer - Personal Site

Personal academic homepage.
A single scrolling page in the tradition of researcher homepages, with a monochrome "ink and dots" look.
A stippled William Morris floral fades in quietly behind the header.

Hosted at <https://wellbek.github.io>.

## Structure

- `index.html` - the homepage: about, news, research, education and experience, honors, skills, projects.
- `cv.html` - the CV as a page, with a print stylesheet.
  The PDF download is a "coming soon" placeholder until `assets/Louis_Wellmeyer_CV.pdf` is regenerated, then relink it.
- `css/site.css` - hand-authored styles, the single source of truth.
  There is no CSS build step.
- `js/site.js` - the dusk/paper theme toggle and nothing else.
- `assets/images/banner-stipple.png` - the banner, a transparent PNG of dots used as a CSS mask (see below).
- `assets/images/` - portrait, project thumbnails, institution logos.
- `assets/publications/` and `assets/Louis_Wellmeyer_CV.pdf` - papers and the CV.

## Themes

The page has two themes, `dusk` (default, dark) and `paper` (light).
The choice is stored in `localStorage` under the key `theme`.
A tiny inline script in each page `<head>` applies it before first paint, so there is no flash.

## The banner

The banner is not drawn at runtime.
It is a one-off conversion of a Morris acanthus pattern into dots:
the pattern is mirror-tiled so it repeats seamlessly, random points are kept with a probability that follows the pattern's brightness, and each kept point becomes a small dot.
The vertical fade is baked in by thinning the dots toward the bottom, so the PNG stays a crisp one-bit mask.
`css/site.css` paints it with `mask-image` over a flat color, so the same file recolors for both themes.
Opacity per theme is the `--banner-opacity` variable.

## Hosting

This is a static site served by GitHub Pages from the `main` branch root.
Nothing is compiled, on the server or locally - every file in the repo is served as-is.
`.nojekyll` disables Jekyll so that stays true for dotfiles too.

## Local development

Edit `index.html`, `cv.html`, `css/site.css`, and `js/site.js` directly, then reload.
Serve locally with any static server, for example:

```bash
python3 -m http.server 8765
```

Then open <http://localhost:8765/>.

## Notes

- Asset paths are relative so the site works at any hosting path.
- The previous site (terminal-style horizontal deck with an ASCII swarm, EN/DE/KO) is preserved as the git tag and branch `archive/v1-terminal-deck`.
  Because the tag and branch share a name, use `refs/tags/archive/v1-terminal-deck` or `refs/heads/archive/v1-terminal-deck` to disambiguate.
- `node_modules/` and local tool dirs are gitignored.
