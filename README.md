# HZ's Math Tutorial & Visualization

Interactive web app for **Steven Roman's *Advanced Linear Algebra*** (Springer GTM 135, 3rd Edition).

**[Live Demo](https://wilz2200.github.io/HZ-math-tuto-viz/)**

## Features

- **20 chapters** covering the complete book (Ch 0–19)
- **294 interactive visualizations** with draggable points, sliders, and animations
- **380 exercises** with hints and full solutions
- **KaTeX** math rendering for rigorous notation
- **Lazy loading** — only the selected chapter loads, keeping the app fast
- **Dark theme** with progress tracking (saved in localStorage)
- **Zero dependencies** — just open `index.html` or serve with any static server

## Quick Start

```bash
# Clone
git clone https://github.com/WilZ2200/HZ-math-tuto-viz.git
cd HZ-math-tuto-viz

# Serve locally
python3 -m http.server 8000
# Open http://localhost:8000
```

Or just visit the [live demo](https://wilz2200.github.io/HZ-math-tuto-viz/).

## Course Structure

### Part I: Basic Linear Algebra
| Ch | Topic |
|----|-------|
| 0 | Preliminaries |
| 1 | Vector Spaces |
| 2 | Linear Transformations |
| 3 | The Isomorphism Theorems |
| 4 | Modules I: Basic Properties |
| 5 | Modules II: Free & Noetherian |
| 6 | Modules over a PID |
| 7 | Structure of a Linear Operator |
| 8 | Eigenvalues & Eigenvectors |
| 9 | Inner Product Spaces |
| 10 | Normal Operators |

### Part II: Topics
| Ch | Topic |
|----|-------|
| 11 | Bilinear Forms |
| 12 | Metric Spaces |
| 13 | Hilbert Spaces |
| 14 | Tensor Products |
| 15 | Positive Solutions & Convexity |
| 16 | Affine Geometry |
| 17 | SVD & Moore-Penrose Inverse |
| 18 | Algebras |
| 19 | The Umbral Calculus |

## Tech Stack

- Vanilla HTML/CSS/JS (no build step)
- [KaTeX](https://katex.org/) for math rendering
- Custom `VizEngine` class for Canvas 2D visualizations

## License

Educational use. Based on content from *Advanced Linear Algebra* by Steven Roman.
