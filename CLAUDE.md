# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An interactive educational showcase for 47 game/UI design terminology examples (Japanese). Pure vanilla HTML/CSS/JavaScript — no frameworks, no build tools, no package manager.

## Development

**Local server:** `node _server.js` (serves on http://localhost:8091)

No build step, no test framework. Static files served as-is.

**QA tool:** Open `_check-overflow.html` in browser to detect overflow/clipping issues across all 47 sample pages.

## Architecture

### Pages
- `index.html` — Homepage with search/filter, renders all 47 term cards with live demos
- `ui-showcase/sample.html?slug={slug}` — Individual term detail page with multiple code examples

### Data Flow
1. `terms.js` — Central data: array of 47 terms, each with id, slug, term, category, description, prompt, demo
2. `demos.js` — Homepage demo renderers (one function per term, pure DOM creation)
3. `multi-demos-*.js` — Multi-example definitions split by category:
   - `multi-demos-basics.js` → 画面の基本 (basics)
   - `multi-demos-motion-extra.js` → 動き・演出 (motion/effects)
   - `multi-demos-style.js` → 見た目・スタイル (style)
   - `multi-demos-parts.js` → UIパーツ (UI parts)
4. `multi-demos.js` — Wrapper that renders multi-examples, detects animations/interactions, and adds replay buttons
5. `main.js` — Homepage logic (filtering, card rendering)
6. `sample.js` — Sample page initialization, QR code generation

### DOM Utilities
Used throughout demo renderers:
- `n(tag, attrs, children)` — createElement shorthand
- `btn(label, onclick)` — button factory
- `addStyle(container, css)` — scoped style injection with auto-generated unique IDs

### Design System (CSS Variables)
Defined in `ui-showcase/assets/css/style.css`. Four category color themes:
- `--cat-basics-*` (blue), `--cat-motion-*` (purple), `--cat-style-*` (pink), `--cat-parts-*` (amber)

Surface/text/shadow/radius tokens follow `--{type}-{variant}` naming.

### Animation Detection
`multi-demos.js` auto-detects if a demo needs a replay button by checking for `@keyframes`, `onclick`, transitions, or JS code. Infinite animations are excluded.

## Conventions

- Git commit messages are in Japanese
- All UI text is Japanese
- External dependency: only `qrcode-generator` via CDN (used in sample pages)
- Fonts: Outfit (English), Zen Kaku Gothic New (Japanese) via Google Fonts
