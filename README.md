# Editorial / Technical-Notebook Portfolio Template

A static, hand-typeset personal portfolio designed with an editorial and technical-notebook aesthetic. Built entirely with plain HTML5, CSS3, and lightweight vanilla ES6+ JavaScript. No npm, no frameworks, no bundlers, and no build step.

---

## 1. Overview & File Structure

```text
.
├── index.html                   # Core semantic markup & edit markers
├── styles.css                   # Design tokens, 12-col grid, typography, themes
├── main.js                      # Vanilla script (<150 lines): theme, menu, clock
├── favicon.svg                  # High-contrast monochrome SVG favicon
├── assets/
│   ├── images/
│   │   ├── about-placeholder.svg      # 4:5 editorial monochrome portrait placeholder
│   │   └── project-featured.svg       # 16:9 technical architectural schematic
│   └── resume.pdf                     # (Place your PDF résumé here)
└── README.md                    # Documentation, setup & hosting guide
```

### Aesthetic Principles (Anti-Slop)
- **Palette**: Warm off-white paper (`#F4F1EA`) with near-black ink (`#161614`) in light mode; warm charcoal (`#141413`) with muted bone ink (`#ECEAE4`) in dark mode.
- **One Accent**: A single burnt terracotta / deep rust (`#BC4726` light / `#E06D44` dark).
- **Typography**: Display & body in **Newsreader** (classic optical sizing); labels, dates, status lines, and tags in **JetBrains Mono**.
- **Layout**: Asymmetric 12-column grid with a left metadata/label spine (`01 — About`, `02 — Skills`, etc.) and hairline 1px dividers.
- **Craft Details**: Tabular numerals for alignment, live header status line with local clock, subtle SVG paper grain, and zero emoji or card-shadow bloat.

---

## 2. Running Locally

Because this site uses strictly relative paths and plain web standards, no local development server is mandatory:

### Option A: Direct Open
Double-click `index.html` or drag it directly into any modern web browser (Chrome, Firefox, Safari, Edge).

### Option B: Local HTTP Server (Recommended)
Running through a local server ensures full feature parity (e.g. testing relative asset paths or font caching):

```bash
# Python 3
python -m http.server 8000

# Node (npx)
npx serve .
```
Then navigate to `http://localhost:8000` in your browser.

---

## 3. Customization Guide

All placeholders in `index.html` are surrounded by square brackets `[LIKE THIS]` and preceded by `<!-- EDIT: ... -->` comments.

### ⏱ Change the Accent Color in 10 Seconds
Open `styles.css` and locate the root design tokens at the very top (lines 19–21 & lines 49–51). Replace the accent hex codes:

```css
/* Light Mode (default: Burnt Terracotta) */
--accent: #BC4726;
--accent-hover: #9E381C;

/* Dark Mode (high contrast counterpart) */
--accent: #E06D44;
--accent-hover: #F2855F;
```

**Alternative refined color pairings:**
- **Deep Forest Green**: `#2B5838` (light) / `#4E9B64` (dark)
- **Oxblood / Tuscan Red**: `#7C2D24` (light) / `#E26D60` (dark)
- **Industrial Ochre**: `#996515` (light) / `#D49B35` (dark)

---

### Customizing Typography
To change fonts, find the Google Fonts `<link>` in `index.html` and the font variables in `styles.css`:

```css
--font-serif: "Newsreader", Garamond, Georgia, serif;
--font-mono: "JetBrains Mono", SFMono-Regular, Menlo, monospace;
```
*(Constraint reminder: Maximum 2 font families are loaded to preserve sub-second page performance).*

---

### Replacing Images & Résumé
1. **Portrait Photo**: Save your portrait to `assets/images/portrait.jpg` (ideal ratio: 4:5, e.g. 800×1000px). In `index.html`, update the `src` attribute inside the `<figure class="portrait-figure">`:
   ```html
   <img src="assets/images/portrait.jpg" alt="Portrait of Your Name" ...>
   ```
2. **Featured Project Graphic**: Save your schematic, architecture diagram, or UI capture to `assets/images/project-featured.png` (ideal ratio: 16:9).
3. **Résumé**: Place your PDF file in `assets/resume.pdf` to match the hero link.

---

### Adding & Removing Sections / Blocks

#### To Add a Project Row
Look for `<!-- Copy this block to add another -->` inside `.projects-table` in `index.html`:
```html
<div class="project-row" role="row">
  <span class="proj-num" role="cell">05</span>
  <div role="cell"><h3 class="proj-title">[PROJECT NAME]</h3></div>
  <p class="proj-desc" role="cell">[One-line technical description.]</p>
  <span class="proj-stack" role="cell">[Go / SQLite]</span>
  <span class="proj-year" role="cell">[2026]</span>
  <div class="proj-links" role="cell">
    <a href="https://github.com/..." target="_blank" rel="noopener noreferrer">Code ↗</a>
  </div>
</div>
```

#### To Add a Timeline Entry
In the `#experience` section, copy a `.timeline-entry` block:
```html
<article class="timeline-entry">
  <time class="timeline-period">[START — END DATE]</time>
  <div class="timeline-content">
    <header class="timeline-header">
      <h3 class="timeline-role">[ROLE TITLE]</h3>
      <span class="timeline-org">[ORGANIZATION]</span>
    </header>
    <ul class="timeline-bullets">
      <li>[Bullet point describing impact or architecture.]</li>
      <li>[Bullet point describing tooling or performance win.]</li>
    </ul>
  </div>
</article>
```

#### To Set Your Local Timezone
In `main.js`, update line 111 with your IANA timezone identifier:
```javascript
const targetTimeZone = "America/New_York"; // e.g. "Europe/London", "Asia/Tokyo"
```

---

## 4. Free Deployment

Because this project is 100% static, it can be hosted anywhere for free.

### Option 1: GitHub Pages (Step-by-Step)
1. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "feat: initial portfolio release"
   ```
2. Create a new repository on GitHub (e.g. `portfolio` or `<your-username>.github.io`).
3. Link your remote and push:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
4. In GitHub, go to **Settings** → **Pages**.
5. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then click **Save**.
7. Your site will be live at `https://<your-username>.github.io/<repo-name>/` in ~1 minute.

### Option 2: Cloudflare Pages
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages**.
2. Connect your GitHub repository.
3. Build settings:
   - **Framework preset**: None
   - **Build command**: (leave empty)
   - **Build output directory**: `/`
4. Click **Save and Deploy**. Fast global CDN caching is active automatically.

### Option 3: Netlify
1. Log in to [Netlify](https://app.netlify.com/).
2. Drag and drop the portfolio folder into the Netlify Sites dashboard, or link your Git repository.
3. Set build command to empty and publish directory to `.` (root).

---

## 5. Pre-Launch Checklist

Before sharing your portfolio publicly, review this checklist:

- [ ] **Search for `[` brackets**: Run a project-wide search for `[` to ensure all placeholder brackets (`[FIRSTNAME LASTNAME]`, `[YOUR.EMAIL@EXAMPLE.COM]`, etc.) are replaced.
- [ ] **Update Metadata & SEO**: In `index.html`, verify:
  - `<title>`
  - `<meta name="description">`
  - Canonical URL (`<link rel="canonical">`)
  - Open Graph (`og:url`, `og:image`, `og:title`)
- [ ] **Add Your Actual Résumé**: Ensure `assets/resume.pdf` exists or update the links to point to your live document.
- [ ] **Test Responsive Viewports**: Inspect at `360px` (small mobile), `768px` (tablet), `1024px` (laptop), and `1440px` (desktop). Check that the mobile menu toggles smoothly.
- [ ] **Verify Keyboard & Accessibility**: Tab through all interactive links, buttons, and form targets. Ensure focus rings are sharp and visible.
- [ ] **Run Google Lighthouse**: Run an audit in Chrome DevTools (target: 95–100 in Performance, Accessibility, Best Practices, and SEO).
- [ ] **Theme Persistence**: Switch between Light and Dark mode, then reload the page to confirm there is zero theme flicker (FOUC).
