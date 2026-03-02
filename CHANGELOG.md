# Changelog

All notable project updates are documented in this file.

## 2026-02-05 — Version 5

### Added
- Added `.nojekyll` to disable Jekyll processing on GitHub Pages.

### Changed
- Updated `brandName` in `data/hero.json`.
- Updated logo home link behavior in `index.html`.
- Added robust scroll-to-top behavior on load in `js/main.js`.

### Fixed
- Fixed project image path issues in `data/projects.json` to avoid missing images on GitHub Pages.

## 2026-02-04 — Version 4

### Changed
- Improved responsive behavior across tablet/mobile breakpoints.
- Refined `clients` section grid behavior using adaptive `minmax` layouts.
- Refined `Featured Major Projects` responsive layout and image presentation.

### Fixed
- Fixed overlap issues between experience cards and BIM ticker on small screens.
- Improved image rendering to reduce clipping in responsive views.

## 2026-02-04 — Version 3

### Added
- Added dynamic certifications slider with autoplay, arrows, and dots.
- Added training showcase section with dedicated data source in `data/training-courses.json`.

### Changed
- Updated `js/data-loader.js` to support certifications and training rendering.
- Added/updated styling for certifications and training showcase in `css/style.css`.

### Fixed
- Fixed data-loader structural issues and improved runtime behavior.
- Replaced marquee-like behavior with standard slider interactions.

## 2026-02 — Version 2

### Added
- Logo image integration in navigation.
- Animated stats counter (`js/counter.js`).
- Experience timeline card presentation improvements.
- Behance links support for course cards.
- Text-only software tools presentation style.

### Changed
- Expanded certifications presentation toward slider-based UX.
- Introduced additional UX/content updates tracked in this period.

## 2026-02 — Initial Design Updates

### Added
- Hero redesign (image + text layout).
- Stats section.
- Academic qualifications section.
- Professional certifications section.
- Software & tools section.

### Changed
- Updated section titles and hierarchy.
- Improved responsive behavior for desktop/tablet/mobile.

---

## Notes
- Historical details previously split across `UPDATES*.md` files were consolidated here.
- Source-of-truth for content remains JSON files under `data/`.
