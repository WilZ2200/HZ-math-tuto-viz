# Content Specification for Chapter Files

## JS File Format (follow exactly)

```javascript
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch01',       // match filename
    number: 1,
    title: 'Vector Spaces',
    subtitle: 'A short description',
    sections: [
        {
            id: 'ch01-sec01',
            title: 'Section Title',
            content: `
                <h2>Section Title</h2>
                <p>Paragraph with \\(inline math\\). Display math below:</p>
                \\[\\dim(V/W) = \\dim V - \\dim W\\]

                <div class="env-block definition">
                    <div class="env-title">Definition 1.1 (Vector Space)</div>
                    <div class="env-body"><p>A <strong>vector space</strong> over a field \\(F\\) is...</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.2 (Steinitz Exchange)</div>
                    <div class="env-body"><p>If \\(S\\) is a spanning set and \\(L\\) is linearly independent, then...</p></div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>We proceed by induction on \\(|L|\\)...</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 1.3</div>
                    <div class="env-body"><p>Consider \\(\\mathbb{R}^3\\) with...</p></div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body"><p>Think of dimension as the number of "degrees of freedom"...</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body"><p>Note that this fails for modules...</p></div>
                </div>

                <div class="viz-placeholder" data-viz="span-viz"></div>
            `,
            visualizations: [
                {
                    id: 'span-viz',
                    title: 'Interactive: Span of Two Vectors',
                    description: 'Drag the vectors to see how their span changes',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});
                        const v1 = viz.addDraggable('v1', 2, 1, viz.colors.blue, 8, () => draw());
                        const v2 = viz.addDraggable('v2', -1, 2, viz.colors.orange, 8, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            // Draw span region (parallelogram tiling)
                            for (let a = -5; a <= 5; a++) {
                                for (let b = -5; b <= 5; b++) {
                                    const x = a * v1.x + b * v2.x;
                                    const y = a * v1.y + b * v2.y;
                                    viz.drawPoint(x, y, viz.colors.teal + '44', null, 3);
                                }
                            }
                            viz.drawVector(0, 0, v1.x, v1.y, viz.colors.blue, 'v₁');
                            viz.drawVector(0, 0, v2.x, v2.y, viz.colors.orange, 'v₂');
                            viz.drawDraggables();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that the zero vector \\(0\\) in a vector space is unique.',
                    hint: 'Suppose \\(0\\) and \\(0\'\\) are both zero vectors. What does each property give you?',
                    solution: 'If \\(0\\) and \\(0\'\\) are both zero vectors, then \\(0 = 0 + 0\' = 0\'\\), where the first equality uses that \\(0\'\\) is a zero vector and the second uses that \\(0\\) is a zero vector.'
                }
            ]
        }
        // ... more sections
    ]
});
```

## Available env-block Classes

| Class | Color | Use for |
|-------|-------|---------|
| definition | Green | Formal definitions |
| theorem | Orange | Theorems |
| proposition | Orange | Propositions |
| lemma | Yellow | Lemmas |
| corollary | Yellow | Corollaries |
| proof | Purple | Proofs (end with `<div class="qed">∎</div>`) |
| example | Blue | Worked examples |
| intuition | Teal | Geometric insight, metaphors, "why this matters" |
| remark | Gray | Side notes, connections |
| warning | Red | Common mistakes, subtle points |

## Math Delimiters (CRITICAL)

Content lives inside JS template literals (backticks). This means:

- **Inline math**: `\\(` and `\\)` — e.g., `\\(x + y\\)` renders as x + y
- **Display math**: `\\[` and `\\]` — e.g., `\\[\\sum_{i=1}^{n} x_i\\]`
- **LaTeX commands**: DOUBLE backslash — `\\alpha`, `\\mathbb{R}`, `\\frac{a}{b}`, `\\operatorname{ker}`
- **NEVER use `$` or `$$` delimiters** — they break in template literals when `$` precedes `{`

Examples of correct math in template literals:
- `\\(\\mathbb{R}^n\\)` → ℝⁿ
- `\\(\\operatorname{ker}(T)\\)` → ker(T)
- `\\[V = W_1 \\oplus W_2\\]` → display: V = W₁ ⊕ W₂
- `\\(\\frac{\\dim V}{2}\\)` → dim V / 2

## VizEngine API

### Constructor
```javascript
const viz = new VizEngine(container, { width: 560, height: 400, scale: 40 });
```
- `scale`: pixels per math unit (40 means 1 unit = 40px)
- Origin is at center of canvas by default

### Drawing Methods
- `viz.clear()` — clear canvas with dark background
- `viz.drawGrid(spacing)` — draw grid lines (default spacing=1)
- `viz.drawAxes()` — draw X/Y axes with numeric labels
- `viz.drawVector(x1, y1, x2, y2, color, label, lineWidth)` — arrow from (x1,y1) to (x2,y2)
- `viz.drawPoint(x, y, color, label, radius)` — dot at math coords
- `viz.drawLine(x1, y1, x2, y2, color, lineWidth, dashed)` — infinite line through two points
- `viz.drawSegment(x1, y1, x2, y2, color, lineWidth, dashed)` — line segment
- `viz.drawPolygon(points, fillColor, strokeColor, lineWidth)` — points = [[x,y],...]
- `viz.drawCircle(cx, cy, r, fillColor, strokeColor)` — circle at (cx,cy) radius r (math units)
- `viz.drawEllipse(cx, cy, rx, ry, angle, fillColor, strokeColor)`
- `viz.drawText(text, x, y, color, fontSize, textAlign, textBaseline)`
- `viz.drawTransformedUnitSquare(matrix, fillColor, strokeColor)` — matrix = [[a,b],[c,d]]

### Interaction
- `viz.addDraggable(id, x, y, color, radius, onDragCallback)` — returns draggable object with .x, .y
- `viz.drawDraggables()` — render all draggable points (call in draw loop)
- `viz.animate(drawFrameFunction)` — start animation loop, drawFrame receives timestamp
- `viz.stopAnimation()` — stop animation

### Controls
- `VizEngine.createSlider(controlsElement, label, min, max, value, step, onChange)` — returns slider input
- `VizEngine.createButton(controlsElement, label, onClick)` — returns button

### Static Math Utilities
- `VizEngine.matVec(matrix2x2, vec2)` — matrix-vector multiply
- `VizEngine.matMul(A, B)` — 2x2 matrix multiply
- `VizEngine.det2(matrix)` — determinant of 2x2
- `VizEngine.eigenvalues2(matrix)` — returns [λ₁, λ₂] or null if complex
- `VizEngine.eigenvector2(matrix, lambda)` — returns normalized eigenvector
- `VizEngine.normalize(v)`, `VizEngine.vecLen(v)`, `VizEngine.dot(u, v)`, `VizEngine.proj(u, v)`

### Color Palette
`viz.colors.blue` (#58a6ff), `.teal` (#3fb9a0), `.orange` (#f0883e), `.green` (#3fb950), `.purple` (#bc8cff), `.red` (#f85149), `.yellow` (#d29922), `.pink` (#f778ba), `.white` (#f0f6fc), `.text` (#8b949e)

Use with transparency: `viz.colors.blue + '44'` for 27% opacity.

## Quality Guidelines

- **Graduate-level rigor**: Precise definitions, proper theorem statements, proof sketches for all key results
- **Intuition blocks**: Use metaphors and geometric insight to build understanding, but NEVER sacrifice mathematical accuracy for simplicity
- **Each section**: Should contain 2-3 exercises with hints and solutions
- **Substantial content**: Each section is a real lesson (not a stub). Aim for rich explanations.
- **Visualizations**: Make them genuinely interactive (draggable points, sliders, animations). Return the VizEngine instance from setup().
