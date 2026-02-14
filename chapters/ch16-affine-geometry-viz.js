// Extra Interactive Visualizations for Chapter 16: Affine Geometry
// Steven Roman's Advanced Linear Algebra

window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch16'] = window.EXTRA_VIZ['ch16'] || {};

// Section 1: Affine Combinations and Affine Independence
window.EXTRA_VIZ['ch16']['ch16-sec01'] = [
    {
        id: 'ch16-extra-viz-1',
        title: 'Interactive: Affine Combination Explorer',
        description: 'Explore affine combinations where weights sum to 1. Drag three points and adjust weights to see how the affine combination p = λ₁p₁ + λ₂p₂ + λ₃p₃ moves (with λ₁ + λ₂ + λ₃ = 1).',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const p1 = viz.addDraggable('p1', -3, -1, viz.colors.blue, 8, () => draw());
            const p2 = viz.addDraggable('p2', 3, -1, viz.colors.orange, 8, () => draw());
            const p3 = viz.addDraggable('p3', 0, 3, viz.colors.green, 8, () => draw());

            let lambda1 = 0.4;
            let lambda2 = 0.3;
            let lambda3 = 0.3;

            const slider1 = VizEngine.createSlider(controls, 'λ₁', 0, 1, lambda1, 0.01, (val) => {
                lambda1 = val;
                adjustWeights(1);
                draw();
            });

            const slider2 = VizEngine.createSlider(controls, 'λ₂', 0, 1, lambda2, 0.01, (val) => {
                lambda2 = val;
                adjustWeights(2);
                draw();
            });

            const slider3 = VizEngine.createSlider(controls, 'λ₃', 0, 1, lambda3, 0.01, (val) => {
                lambda3 = val;
                adjustWeights(3);
                draw();
            });

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '12px';
            infoDiv.style.padding = '10px';
            infoDiv.style.backgroundColor = '#1a1a1a';
            infoDiv.style.borderRadius = '5px';
            controls.appendChild(infoDiv);

            function adjustWeights(changed) {
                const sum = lambda1 + lambda2 + lambda3;
                if (Math.abs(sum - 1) < 0.001) return;

                // Normalize to sum to 1, keeping the changed slider fixed
                if (changed === 1) {
                    const remaining = 1 - lambda1;
                    const current = lambda2 + lambda3;
                    if (current > 0) {
                        lambda2 = (lambda2 / current) * remaining;
                        lambda3 = (lambda3 / current) * remaining;
                    } else {
                        lambda2 = remaining / 2;
                        lambda3 = remaining / 2;
                    }
                } else if (changed === 2) {
                    const remaining = 1 - lambda2;
                    const current = lambda1 + lambda3;
                    if (current > 0) {
                        lambda1 = (lambda1 / current) * remaining;
                        lambda3 = (lambda3 / current) * remaining;
                    } else {
                        lambda1 = remaining / 2;
                        lambda3 = remaining / 2;
                    }
                } else {
                    const remaining = 1 - lambda3;
                    const current = lambda1 + lambda2;
                    if (current > 0) {
                        lambda1 = (lambda1 / current) * remaining;
                        lambda2 = (lambda2 / current) * remaining;
                    } else {
                        lambda1 = remaining / 2;
                        lambda2 = remaining / 2;
                    }
                }

                slider1.value = lambda1;
                slider2.value = lambda2;
                slider3.value = lambda3;
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Compute affine combination
                const px = lambda1 * p1.x + lambda2 * p2.x + lambda3 * p3.x;
                const py = lambda1 * p1.y + lambda2 * p2.y + lambda3 * p3.y;

                // Draw triangle formed by p1, p2, p3
                viz.drawPolygon([
                    [p1.x, p1.y],
                    [p2.x, p2.y],
                    [p3.x, p3.y]
                ], viz.colors.purple + '22', viz.colors.purple + '66', 2);

                // Draw lines from each point to the combination
                viz.drawSegment(p1.x, p1.y, px, py, viz.colors.blue + '44', 1, true);
                viz.drawSegment(p2.x, p2.y, px, py, viz.colors.orange + '44', 1, true);
                viz.drawSegment(p3.x, p3.y, px, py, viz.colors.green + '44', 1, true);

                // Draw the three base points
                viz.drawPoint(p1.x, p1.y, viz.colors.blue, 'p₁', 8);
                viz.drawPoint(p2.x, p2.y, viz.colors.orange, 'p₂', 8);
                viz.drawPoint(p3.x, p3.y, viz.colors.green, 'p₃', 8);

                // Draw the affine combination
                viz.drawPoint(px, py, viz.colors.pink, 'p', 10);

                // Show weighted vectors from origin (for visualization)
                viz.drawVector(0, 0, lambda1 * p1.x, lambda1 * p1.y, viz.colors.blue + '88', null, 2);
                viz.drawVector(0, 0, lambda2 * p2.x, lambda2 * p2.y, viz.colors.orange + '88', null, 2);
                viz.drawVector(0, 0, lambda3 * p3.x, lambda3 * p3.y, viz.colors.green + '88', null, 2);
                viz.drawVector(0, 0, px, py, viz.colors.pink, null, 3);

                viz.drawDraggables();

                const sum = lambda1 + lambda2 + lambda3;
                const isAffine = Math.abs(sum - 1) < 0.01;

                infoDiv.innerHTML = `<strong style="color: ${viz.colors.pink}">Affine Combination</strong><br><br>` +
                    `p = λ₁p₁ + λ₂p₂ + λ₃p₃<br><br>` +
                    `λ₁ = ${lambda1.toFixed(3)}<br>` +
                    `λ₂ = ${lambda2.toFixed(3)}<br>` +
                    `λ₃ = ${lambda3.toFixed(3)}<br>` +
                    `<strong>Sum: ${sum.toFixed(3)}</strong> ${isAffine ? '✓' : '✗'}<br><br>` +
                    `p = (${px.toFixed(2)}, ${py.toFixed(2)})<br><br>` +
                    `<em>Key: Affine combinations require Σλᵢ = 1</em><br>` +
                    `<em>When all λᵢ ≥ 0, p is in the convex hull</em>`;
            }

            draw();
            return viz;
        }
    },
    {
        id: 'ch16-extra-viz-2',
        title: 'Interactive: Barycentric Coordinate Triangle',
        description: 'Drag a point inside (or outside) a triangle to see its barycentric coordinates. These are the unique affine coordinates with respect to the triangle vertices.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const v1 = viz.addDraggable('v1', -3, -2, viz.colors.blue, 8, () => draw());
            const v2 = viz.addDraggable('v2', 4, -1, viz.colors.orange, 8, () => draw());
            const v3 = viz.addDraggable('v3', 0, 3.5, viz.colors.green, 8, () => draw());
            const p = viz.addDraggable('p', 0.5, 0.5, viz.colors.pink, 9, () => draw());

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '12px';
            infoDiv.style.padding = '10px';
            infoDiv.style.backgroundColor = '#1a1a1a';
            infoDiv.style.borderRadius = '5px';
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Compute barycentric coordinates using areas
                // For point p and triangle (v1, v2, v3):
                // λ₁ = Area(p, v2, v3) / Area(v1, v2, v3)
                // λ₂ = Area(v1, p, v3) / Area(v1, v2, v3)
                // λ₃ = Area(v1, v2, p) / Area(v1, v2, v3)

                function signedArea(x1, y1, x2, y2, x3, y3) {
                    return 0.5 * ((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));
                }

                const totalArea = signedArea(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);

                if (Math.abs(totalArea) < 0.01) {
                    viz.drawPoint(v1.x, v1.y, viz.colors.blue, 'v₁', 8);
                    viz.drawPoint(v2.x, v2.y, viz.colors.orange, 'v₂', 8);
                    viz.drawPoint(v3.x, v3.y, viz.colors.green, 'v₃', 8);
                    viz.drawDraggables();
                    infoDiv.innerHTML = `<span style="color: ${viz.colors.red}">ERROR: Triangle is degenerate!</span><br>` +
                        `The three vertices are collinear.<br>` +
                        `Make them non-collinear.`;
                    return;
                }

                const area1 = signedArea(p.x, p.y, v2.x, v2.y, v3.x, v3.y);
                const area2 = signedArea(v1.x, v1.y, p.x, p.y, v3.x, v3.y);
                const area3 = signedArea(v1.x, v1.y, v2.x, v2.y, p.x, p.y);

                const lambda1 = area1 / totalArea;
                const lambda2 = area2 / totalArea;
                const lambda3 = area3 / totalArea;

                const sum = lambda1 + lambda2 + lambda3;
                const isInside = lambda1 >= 0 && lambda2 >= 0 && lambda3 >= 0;

                // Draw triangle
                viz.drawPolygon([
                    [v1.x, v1.y],
                    [v2.x, v2.y],
                    [v3.x, v3.y]
                ], isInside ? viz.colors.teal + '22' : viz.colors.purple + '11',
                   viz.colors.white + '66', 2);

                // Draw sub-triangles with different colors to show areas
                if (isInside) {
                    viz.drawPolygon([
                        [p.x, p.y],
                        [v2.x, v2.y],
                        [v3.x, v3.y]
                    ], viz.colors.blue + '22', viz.colors.blue + '44', 1);

                    viz.drawPolygon([
                        [v1.x, v1.y],
                        [p.x, p.y],
                        [v3.x, v3.y]
                    ], viz.colors.orange + '22', viz.colors.orange + '44', 1);

                    viz.drawPolygon([
                        [v1.x, v1.y],
                        [v2.x, v2.y],
                        [p.x, p.y]
                    ], viz.colors.green + '22', viz.colors.green + '44', 1);
                }

                // Draw vertices
                viz.drawPoint(v1.x, v1.y, viz.colors.blue, 'v₁', 8);
                viz.drawPoint(v2.x, v2.y, viz.colors.orange, 'v₂', 8);
                viz.drawPoint(v3.x, v3.y, viz.colors.green, 'v₃', 8);

                // Draw point
                viz.drawPoint(p.x, p.y, viz.colors.pink, 'p', 9);

                viz.drawDraggables();

                infoDiv.innerHTML = `<strong style="color: ${viz.colors.pink}">Barycentric Coordinates</strong><br><br>` +
                    `p = λ₁v₁ + λ₂v₂ + λ₃v₃<br><br>` +
                    `λ₁ = ${lambda1.toFixed(3)} <span style="color: ${viz.colors.blue}">●</span><br>` +
                    `λ₂ = ${lambda2.toFixed(3)} <span style="color: ${viz.colors.orange}">●</span><br>` +
                    `λ₃ = ${lambda3.toFixed(3)} <span style="color: ${viz.colors.green}">●</span><br>` +
                    `Sum: ${sum.toFixed(3)} ✓<br><br>` +
                    `<strong>Location:</strong> ${isInside ? 'Inside triangle ✓' : 'Outside triangle'}<br>` +
                    `${isInside ? '(All coordinates ≥ 0)' : '(Some coordinate < 0)'}<br><br>` +
                    `<em>Barycentric coords are computed using<br>area ratios (signed areas)</em>`;
            }

            draw();
            return viz;
        }
    },
    {
        id: 'ch16-extra-viz-3',
        title: 'Interactive: Affine Independence Tester',
        description: 'Test whether a set of points is affinely independent. Points are affinely independent if no point lies in the affine hull of the others.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const p1 = viz.addDraggable('p1', -3, -1, viz.colors.blue, 8, () => draw());
            const p2 = viz.addDraggable('p2', 3, 0, viz.colors.orange, 8, () => draw());
            const p3 = viz.addDraggable('p3', 0, 3, viz.colors.green, 8, () => draw());

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '12px';
            infoDiv.style.padding = '10px';
            infoDiv.style.backgroundColor = '#1a1a1a';
            infoDiv.style.borderRadius = '5px';
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Check affine independence:
                // {p1, p2, p3} is affinely independent iff {p2-p1, p3-p1} is linearly independent
                const v1x = p2.x - p1.x;
                const v1y = p2.y - p1.y;
                const v2x = p3.x - p1.x;
                const v2y = p3.y - p1.y;

                const det = v1x * v2y - v1y * v2x;
                const isAffinelyIndependent = Math.abs(det) > 0.05;

                // Draw affine hull (line through all three if dependent, triangle if independent)
                if (isAffinelyIndependent) {
                    // Draw triangle
                    viz.drawPolygon([
                        [p1.x, p1.y],
                        [p2.x, p2.y],
                        [p3.x, p3.y]
                    ], viz.colors.green + '22', viz.colors.green + '66', 2);

                    // Draw grid of affine combinations
                    for (let a = 0; a <= 1; a += 0.1) {
                        for (let b = 0; b <= 1 - a; b += 0.1) {
                            const c = 1 - a - b;
                            const x = a * p1.x + b * p2.x + c * p3.x;
                            const y = a * p1.y + b * p2.y + c * p3.y;
                            viz.drawPoint(x, y, viz.colors.teal + '44', null, 2);
                        }
                    }
                } else {
                    // Draw line through all three points
                    const len = Math.sqrt(v1x * v1x + v1y * v1y);
                    if (len > 0.01) {
                        const dx = v1x / len;
                        const dy = v1y / len;
                        for (let t = -10; t <= 10; t += 0.1) {
                            const x = p1.x + t * dx;
                            const y = p1.y + t * dy;
                            viz.drawPoint(x, y, viz.colors.yellow + '66', null, 2);
                        }
                    }
                }

                // Draw difference vectors from p1
                viz.drawVector(p1.x, p1.y, p2.x, p2.y, viz.colors.orange + '88', 'p₂-p₁', 2);
                viz.drawVector(p1.x, p1.y, p3.x, p3.y, viz.colors.green + '88', 'p₃-p₁', 2);

                // Draw points
                viz.drawPoint(p1.x, p1.y, viz.colors.blue, 'p₁', 8);
                viz.drawPoint(p2.x, p2.y, viz.colors.orange, 'p₂', 8);
                viz.drawPoint(p3.x, p3.y, viz.colors.green, 'p₃', 8);

                viz.drawDraggables();

                if (isAffinelyIndependent) {
                    infoDiv.innerHTML = `<strong style="color: ${viz.colors.green}">✓ AFFINELY INDEPENDENT</strong><br><br>` +
                        `The points {p₁, p₂, p₃} are affinely independent<br>` +
                        `because the vectors {p₂-p₁, p₃-p₁} are<br>` +
                        `linearly independent.<br><br>` +
                        `det = ${det.toFixed(3)}<br><br>` +
                        `<strong>Affine hull:</strong> The triangle (2-dimensional)<br>` +
                        `aff({p₁, p₂, p₃}) = {λ₁p₁ + λ₂p₂ + λ₃p₃ : Σλᵢ = 1}<br><br>` +
                        `<em>These three points form an affine basis for ℝ²</em>`;
                } else {
                    infoDiv.innerHTML = `<strong style="color: ${viz.colors.red}">✗ AFFINELY DEPENDENT</strong><br><br>` +
                        `The points {p₁, p₂, p₃} are affinely dependent<br>` +
                        `because the vectors {p₂-p₁, p₃-p₁} are<br>` +
                        `linearly dependent (collinear).<br><br>` +
                        `det ≈ ${det.toFixed(3)}<br><br>` +
                        `<strong>Affine hull:</strong> A line (1-dimensional)<br>` +
                        `aff({p₁, p₂, p₃}) is a line through the points<br><br>` +
                        `<em>One point is in the affine hull of the others</em>`;
                }
            }

            draw();
            return viz;
        }
    }
];

// Section 2: Affine Transformations and Maps
window.EXTRA_VIZ['ch16']['ch16-sec02'] = [
    {
        id: 'ch16-extra-viz-4',
        title: 'Interactive: Affine vs Linear Map Comparison',
        description: 'Compare a linear map T(x) = Ax with an affine map τ(x) = Ax + b. Linear maps preserve the origin; affine maps do not.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 35});

            let matrix = [[0.8, -0.3], [0.4, 0.9]];
            let translation = {x: 2, y: 1};
            let showLinear = true;
            let showAffine = true;

            const gridPoints = [];
            for (let i = -4; i <= 4; i++) {
                for (let j = -4; j <= 4; j++) {
                    gridPoints.push({x: i, y: j});
                }
            }

            const toggleLinear = VizEngine.createButton(controls, 'Toggle Linear Map', () => {
                showLinear = !showLinear;
                draw();
            });

            const toggleAffine = VizEngine.createButton(controls, 'Toggle Affine Map', () => {
                showAffine = !showAffine;
                draw();
            });

            const sliderTx = VizEngine.createSlider(controls, 'Translation X', -3, 3, translation.x, 0.1, (val) => {
                translation.x = val;
                draw();
            });

            const sliderTy = VizEngine.createSlider(controls, 'Translation Y', -3, 3, translation.y, 0.1, (val) => {
                translation.y = val;
                draw();
            });

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            controls.appendChild(infoDiv);

            function applyLinear(p) {
                return {
                    x: matrix[0][0] * p.x + matrix[0][1] * p.y,
                    y: matrix[1][0] * p.x + matrix[1][1] * p.y
                };
            }

            function applyAffine(p) {
                const linear = applyLinear(p);
                return {
                    x: linear.x + translation.x,
                    y: linear.y + translation.y
                };
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw original grid points (small)
                for (const p of gridPoints) {
                    viz.drawPoint(p.x, p.y, viz.colors.text + '33', null, 2);
                }

                // Draw linear map images
                if (showLinear) {
                    for (const p of gridPoints) {
                        const tp = applyLinear(p);
                        viz.drawPoint(tp.x, tp.y, viz.colors.blue + '88', null, 4);
                    }
                    // Highlight origin mapping
                    const origin = applyLinear({x: 0, y: 0});
                    viz.drawPoint(origin.x, origin.y, viz.colors.blue, 'T(0)', 7);
                }

                // Draw affine map images
                if (showAffine) {
                    for (const p of gridPoints) {
                        const tp = applyAffine(p);
                        viz.drawPoint(tp.x, tp.y, viz.colors.orange + '88', null, 4);
                    }
                    // Highlight origin mapping
                    const origin = applyAffine({x: 0, y: 0});
                    viz.drawPoint(origin.x, origin.y, viz.colors.orange, 'τ(0)', 7);
                }

                // Draw a unit square and its images
                const square = [
                    {x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}
                ];

                viz.drawPolygon(square.map(p => [p.x, p.y]), null, viz.colors.white + '44', 2);

                if (showLinear) {
                    const linearSquare = square.map(applyLinear);
                    viz.drawPolygon(linearSquare.map(p => [p.x, p.y]), viz.colors.blue + '11', viz.colors.blue, 2);
                }

                if (showAffine) {
                    const affineSquare = square.map(applyAffine);
                    viz.drawPolygon(affineSquare.map(p => [p.x, p.y]), viz.colors.orange + '11', viz.colors.orange, 2);
                }

                // Highlight the origin
                viz.drawPoint(0, 0, viz.colors.white, '0', 6);

                infoDiv.innerHTML = `<strong>Linear Map T(x) = Ax</strong> <span style="color: ${viz.colors.blue}">●</span><br>` +
                    `A = [${matrix[0][0].toFixed(1)}, ${matrix[0][1].toFixed(1)}; ${matrix[1][0].toFixed(1)}, ${matrix[1][1].toFixed(1)}]<br>` +
                    `<em>Preserves origin: T(0) = 0 ✓</em><br>` +
                    `<em>Preserves linear combinations</em><br><br>` +
                    `<strong>Affine Map τ(x) = Ax + b</strong> <span style="color: ${viz.colors.orange}">●</span><br>` +
                    `b = (${translation.x.toFixed(1)}, ${translation.y.toFixed(1)})<br>` +
                    `τ(0) = (${translation.x.toFixed(1)}, ${translation.y.toFixed(1)}) ≠ 0<br>` +
                    `<em>Preserves affine combinations</em><br>` +
                    `<em>(but NOT linear combinations)</em>`;
            }

            draw();
            return viz;
        }
    }
];

// Section 3: Affine Hulls and Flats
window.EXTRA_VIZ['ch16']['ch16-sec03'] = [
    {
        id: 'ch16-extra-viz-5',
        title: 'Interactive: Affine Hull Construction',
        description: 'Build the affine hull of a set of points. The affine hull is the smallest affine subspace containing all the points.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const points = [
                viz.addDraggable('p1', -2, -1, viz.colors.blue, 7, () => draw()),
                viz.addDraggable('p2', 2, -1, viz.colors.blue, 7, () => draw()),
                viz.addDraggable('p3', 0, 2, viz.colors.blue, 7, () => draw())
            ];

            let showHull = true;
            let showConvex = false;

            const toggleHull = VizEngine.createButton(controls, 'Toggle Affine Hull', () => {
                showHull = !showHull;
                draw();
            });

            const toggleConvex = VizEngine.createButton(controls, 'Toggle Convex Hull', () => {
                showConvex = !showConvex;
                draw();
            });

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '12px';
            infoDiv.style.padding = '10px';
            infoDiv.style.backgroundColor = '#1a1a1a';
            infoDiv.style.borderRadius = '5px';
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Check if points are collinear
                if (points.length >= 3) {
                    const v1x = points[1].x - points[0].x;
                    const v1y = points[1].y - points[0].y;
                    const v2x = points[2].x - points[0].x;
                    const v2y = points[2].y - points[0].y;
                    const det = v1x * v2y - v1y * v2x;
                    const isCollinear = Math.abs(det) < 0.1;

                    if (isCollinear) {
                        // Affine hull is a line
                        if (showHull) {
                            const len = Math.sqrt(v1x * v1x + v1y * v1y);
                            if (len > 0.01) {
                                const dx = v1x / len;
                                const dy = v1y / len;
                                for (let t = -12; t <= 12; t += 0.1) {
                                    const x = points[0].x + t * dx;
                                    const y = points[0].y + t * dy;
                                    viz.drawPoint(x, y, viz.colors.teal + '66', null, 2);
                                }
                            }
                        }

                        infoDiv.innerHTML = `<strong style="color: ${viz.colors.yellow}">Points are COLLINEAR</strong><br><br>` +
                            `<strong>Affine hull:</strong> A line<br>` +
                            `aff({p₁, p₂, p₃}) = 1-dimensional<br><br>` +
                            `The affine hull is:<br>` +
                            `{λ₁p₁ + λ₂p₂ + λ₃p₃ : λ₁ + λ₂ + λ₃ = 1}<br><br>` +
                            `<em>All affine combinations lie on a line</em>`;
                    } else {
                        // Affine hull is the plane
                        if (showHull) {
                            // Draw dense grid of affine combinations
                            for (let a = -1.5; a <= 2.5; a += 0.15) {
                                for (let b = -1.5; b <= 2.5; b += 0.15) {
                                    const c = 1 - a - b;
                                    const x = a * points[0].x + b * points[1].x + c * points[2].x;
                                    const y = a * points[0].y + b * points[1].y + c * points[2].y;
                                    if (Math.abs(x) < 10 && Math.abs(y) < 10) {
                                        viz.drawPoint(x, y, viz.colors.teal + '33', null, 2);
                                    }
                                }
                            }
                        }

                        if (showConvex) {
                            // Draw convex hull (triangle)
                            viz.drawPolygon([
                                [points[0].x, points[0].y],
                                [points[1].x, points[1].y],
                                [points[2].x, points[2].y]
                            ], viz.colors.orange + '22', viz.colors.orange, 2);
                        }

                        infoDiv.innerHTML = `<strong style="color: ${viz.colors.green}">Points are AFFINELY INDEPENDENT</strong><br><br>` +
                            `<strong>Affine hull:</strong> The entire plane<br>` +
                            `aff({p₁, p₂, p₃}) = ℝ² (2-dimensional)<br><br>` +
                            `<strong style="color: ${viz.colors.orange}">Convex hull:</strong> Triangle region<br>` +
                            `conv({p₁, p₂, p₃}) ⊂ aff({p₁, p₂, p₃})<br><br>` +
                            `<em>Affine hull: all λᵢ ∈ ℝ, Σλᵢ = 1</em><br>` +
                            `<em>Convex hull: all λᵢ ≥ 0, Σλᵢ = 1</em>`;
                    }
                }

                // Draw the points
                for (let i = 0; i < points.length; i++) {
                    viz.drawPoint(points[i].x, points[i].y, viz.colors.blue, `p${i+1}`, 7);
                }

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    },
    {
        id: 'ch16-extra-viz-6',
        title: 'Interactive: Parallel Affine Subspaces',
        description: 'Explore parallel flats (affine subspaces). Two flats are parallel if their direction spaces are equal. Drag points to see when lines become parallel.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // First flat: point + direction
            const p1 = viz.addDraggable('p1', -3, 2, viz.colors.blue, 8, () => draw());
            const d1 = viz.addDraggable('d1', 2, 1, viz.colors.blue, 7, () => draw());

            // Second flat: point + direction
            const p2 = viz.addDraggable('p2', -2, -2, viz.colors.orange, 8, () => draw());
            const d2 = viz.addDraggable('d2', 2.1, 0.9, viz.colors.orange, 7, () => draw());

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '12px';
            infoDiv.style.padding = '10px';
            infoDiv.style.backgroundColor = '#1a1a1a';
            infoDiv.style.borderRadius = '5px';
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Check if direction vectors are parallel
                const cross = d1.x * d2.y - d1.y * d2.x;
                const isParallel = Math.abs(cross) < 0.3;

                // Normalize direction vectors
                const len1 = Math.sqrt(d1.x * d1.x + d1.y * d1.y);
                const len2 = Math.sqrt(d2.x * d2.x + d2.y * d2.y);

                if (len1 > 0.01 && len2 > 0.01) {
                    const dir1x = d1.x / len1;
                    const dir1y = d1.y / len1;
                    const dir2x = d2.x / len2;
                    const dir2y = d2.y / len2;

                    // Draw first flat (line through p1 in direction d1)
                    for (let t = -12; t <= 12; t += 0.1) {
                        const x = p1.x + t * dir1x;
                        const y = p1.y + t * dir1y;
                        viz.drawPoint(x, y, viz.colors.blue + '66', null, 3);
                    }

                    // Draw second flat (line through p2 in direction d2)
                    for (let t = -12; t <= 12; t += 0.1) {
                        const x = p2.x + t * dir2x;
                        const y = p2.y + t * dir2y;
                        viz.drawPoint(x, y, viz.colors.orange + '66', null, 3);
                    }

                    // Draw direction vectors
                    viz.drawVector(p1.x, p1.y, p1.x + dir1x * 2, p1.y + dir1y * 2,
                                   viz.colors.blue, 'd₁', 3);
                    viz.drawVector(p2.x, p2.y, p2.x + dir2x * 2, p2.y + dir2y * 2,
                                   viz.colors.orange, 'd₂', 3);

                    // If parallel, draw connecting line to show distance
                    if (isParallel) {
                        // Project p2 onto the first line to find closest point
                        const v = {x: p2.x - p1.x, y: p2.y - p1.y};
                        const proj = (v.x * dir1x + v.y * dir1y);
                        const closest = {
                            x: p1.x + proj * dir1x,
                            y: p1.y + proj * dir1y
                        };
                        viz.drawSegment(p2.x, p2.y, closest.x, closest.y,
                                       viz.colors.green, 2, true);
                        const dist = Math.sqrt((p2.x - closest.x)**2 + (p2.y - closest.y)**2);
                        viz.drawText(`d = ${dist.toFixed(2)}`,
                                    (p2.x + closest.x) / 2, (p2.y + closest.y) / 2,
                                    viz.colors.green, 12);
                    } else {
                        // Find intersection point
                        // Line 1: p1 + s*d1, Line 2: p2 + t*d2
                        // Solve: p1 + s*d1 = p2 + t*d2
                        const det = dir1x * dir2y - dir1y * dir2x;
                        if (Math.abs(det) > 0.01) {
                            const dx = p2.x - p1.x;
                            const dy = p2.y - p1.y;
                            const s = (dx * dir2y - dy * dir2x) / det;
                            const intx = p1.x + s * dir1x;
                            const inty = p1.y + s * dir1y;
                            viz.drawPoint(intx, inty, viz.colors.red, 'intersection', 8);
                        }
                    }
                }

                // Draw base points
                viz.drawPoint(p1.x, p1.y, viz.colors.blue, 'p₁', 8);
                viz.drawPoint(p2.x, p2.y, viz.colors.orange, 'p₂', 8);

                viz.drawDraggables();

                if (isParallel) {
                    infoDiv.innerHTML = `<strong style="color: ${viz.colors.green}">✓ PARALLEL FLATS</strong><br><br>` +
                        `Flat F₁ = p₁ + ⟨d₁⟩ <span style="color: ${viz.colors.blue}">—</span><br>` +
                        `Flat F₂ = p₂ + ⟨d₂⟩ <span style="color: ${viz.colors.orange}">—</span><br><br>` +
                        `The direction spaces are equal:<br>` +
                        `⟨d₁⟩ = ⟨d₂⟩<br><br>` +
                        `d₁ × d₂ ≈ ${cross.toFixed(3)} ≈ 0<br><br>` +
                        `<strong>Intersection:</strong> F₁ ∩ F₂ = ∅<br>` +
                        `(Empty - parallel lines don't meet)<br><br>` +
                        `<em>In affine geometry, parallel flats have<br>the same direction space</em>`;
                } else {
                    infoDiv.innerHTML = `<strong style="color: ${viz.colors.red}">✗ NOT PARALLEL</strong><br><br>` +
                        `Flat F₁ = p₁ + ⟨d₁⟩ <span style="color: ${viz.colors.blue}">—</span><br>` +
                        `Flat F₂ = p₂ + ⟨d₂⟩ <span style="color: ${viz.colors.orange}">—</span><br><br>` +
                        `The direction spaces are different:<br>` +
                        `⟨d₁⟩ ≠ ⟨d₂⟩<br><br>` +
                        `d₁ × d₂ = ${cross.toFixed(3)} ≠ 0<br><br>` +
                        `<strong>Intersection:</strong> F₁ ∩ F₂ = {pt} <span style="color: ${viz.colors.red}">●</span><br>` +
                        `(Lines intersect at a point)<br><br>` +
                        `<em>Make d₁ and d₂ collinear to make<br>the flats parallel</em>`;
                }
            }

            draw();
            return viz;
        }
    }
];

// Section 4: Flats as Cosets
window.EXTRA_VIZ['ch16']['ch16-sec04'] = [
    {
        id: 'ch16-extra-viz-7',
        title: 'Interactive: Flat as Point + Subspace',
        description: 'Visualize a flat F = p + U as a point p plus a subspace U. Drag the base point and the subspace direction to explore the structure.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const p = viz.addDraggable('p', 2, 1, viz.colors.pink, 9, () => draw());
            const u = viz.addDraggable('u', 2, 1, viz.colors.teal, 8, () => draw());

            let showSubspace = true;
            let showFlat = true;

            const toggleSubspace = VizEngine.createButton(controls, 'Toggle Subspace U', () => {
                showSubspace = !showSubspace;
                draw();
            });

            const toggleFlat = VizEngine.createButton(controls, 'Toggle Flat F', () => {
                showFlat = !showFlat;
                draw();
            });

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '12px';
            infoDiv.style.padding = '10px';
            infoDiv.style.backgroundColor = '#1a1a1a';
            infoDiv.style.borderRadius = '5px';
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const uLen = Math.sqrt(u.x * u.x + u.y * u.y);

                if (uLen > 0.01) {
                    const ux = u.x / uLen;
                    const uy = u.y / uLen;

                    // Draw subspace U (line through origin)
                    if (showSubspace) {
                        for (let t = -12; t <= 12; t += 0.1) {
                            const x = t * ux;
                            const y = t * uy;
                            viz.drawPoint(x, y, viz.colors.teal + '66', null, 3);
                        }
                        viz.drawVector(0, 0, u.x, u.y, viz.colors.teal, 'u ∈ U', 3);
                    }

                    // Draw flat F = p + U (line through p parallel to U)
                    if (showFlat) {
                        for (let t = -12; t <= 12; t += 0.1) {
                            const x = p.x + t * ux;
                            const y = p.y + t * uy;
                            viz.drawPoint(x, y, viz.colors.orange + '88', null, 3);
                        }

                        // Show some vectors from p in direction of U
                        viz.drawVector(p.x, p.y, p.x + u.x, p.y + u.y,
                                      viz.colors.orange + '88', 'p+u', 2);
                        viz.drawVector(p.x, p.y, p.x - u.x, p.y - u.y,
                                      viz.colors.orange + '88', 'p-u', 2);
                    }

                    // Draw translation from origin to flat
                    if (showSubspace && showFlat) {
                        viz.drawVector(0, 0, p.x, p.y, viz.colors.pink, 'p', 3);

                        // Show that F = p + U is a translation of U
                        viz.drawSegment(0, 0, p.x, p.y, viz.colors.pink + '66', 2, true);
                        viz.drawSegment(u.x, u.y, p.x + u.x, p.y + u.y,
                                       viz.colors.pink + '44', 2, true);
                    }
                }

                // Highlight origin
                viz.drawPoint(0, 0, viz.colors.white, '0', 6);

                // Draw base point
                viz.drawPoint(p.x, p.y, viz.colors.pink, 'p', 9);

                viz.drawDraggables();

                const containsOrigin = Math.sqrt(p.x * p.x + p.y * p.y) < 0.2;

                infoDiv.innerHTML = `<strong style="color: ${viz.colors.orange}">Flat F = p + U</strong><br><br>` +
                    `<strong>Base point:</strong> p = (${p.x.toFixed(2)}, ${p.y.toFixed(2)}) <span style="color: ${viz.colors.pink}">●</span><br>` +
                    `<strong>Direction space:</strong> U = ⟨u⟩ <span style="color: ${viz.colors.teal}">—</span><br>` +
                    `where u = (${u.x.toFixed(2)}, ${u.y.toFixed(2)})<br><br>` +
                    `F = {p + λu : λ ∈ ℝ}<br>` +
                    `  = p + U<br><br>` +
                    `<strong>Contains origin?</strong> ${containsOrigin ? 'YES ✓' : 'NO'}<br>` +
                    (containsOrigin ?
                        `<em>When 0 ∈ F, the flat IS a subspace!</em><br>` +
                        `F = U (no translation needed)` :
                        `<em>F is a translate of U by vector p</em><br>` +
                        `F is NOT a subspace (doesn't contain 0)`);
            }

            draw();
            return viz;
        }
    },
    {
        id: 'ch16-extra-viz-8',
        title: 'Interactive: Dimension of Join and Intersection',
        description: 'Explore the dimension formula for flats: dim(F∨G) + dim(F∩G) depends on whether F and G are parallel or intersecting.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // First line (flat)
            const p1 = viz.addDraggable('p1', -2, 1, viz.colors.blue, 8, () => draw());
            const d1 = viz.addDraggable('d1', 2, 0.5, viz.colors.blue, 7, () => draw());

            // Second line (flat)
            const p2 = viz.addDraggable('p2', 0, -2, viz.colors.orange, 8, () => draw());
            const d2 = viz.addDraggable('d2', 1.5, 2, viz.colors.orange, 7, () => draw());

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            infoDiv.style.padding = '10px';
            infoDiv.style.backgroundColor = '#1a1a1a';
            infoDiv.style.borderRadius = '5px';
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Normalize directions
                const len1 = Math.sqrt(d1.x * d1.x + d1.y * d1.y);
                const len2 = Math.sqrt(d2.x * d2.x + d2.y * d2.y);

                if (len1 < 0.01 || len2 < 0.01) return;

                const dir1 = {x: d1.x / len1, y: d1.y / len1};
                const dir2 = {x: d2.x / len2, y: d2.y / len2};

                // Check if parallel
                const cross = dir1.x * dir2.y - dir1.y * dir2.x;
                const isParallel = Math.abs(cross) < 0.15;

                // Draw first flat
                for (let t = -12; t <= 12; t += 0.1) {
                    viz.drawPoint(p1.x + t * dir1.x, p1.y + t * dir1.y,
                                 viz.colors.blue + '66', null, 3);
                }

                // Draw second flat
                for (let t = -12; t <= 12; t += 0.1) {
                    viz.drawPoint(p2.x + t * dir2.x, p2.y + t * dir2.y,
                                 viz.colors.orange + '66', null, 3);
                }

                let dimF = 1, dimG = 1, dimJoin, dimIntersect;

                if (isParallel) {
                    // Check if same line
                    const v = {x: p2.x - p1.x, y: p2.y - p1.y};
                    const perp = v.x * dir1.y - v.y * dir1.x;
                    const sameLine = Math.abs(perp) < 0.3;

                    if (sameLine) {
                        dimJoin = 1;
                        dimIntersect = 1;
                        infoDiv.innerHTML = `<strong style="color: ${viz.colors.green}">SAME LINE</strong><br><br>` +
                            `F = G (identical flats)<br><br>` +
                            `dim(F) = ${dimF}<br>` +
                            `dim(G) = ${dimG}<br>` +
                            `dim(F ∩ G) = ${dimIntersect} (F ∩ G = F = G)<br>` +
                            `dim(F ∨ G) = ${dimJoin} (F ∨ G = F = G)<br><br>` +
                            `<strong>Formula:</strong><br>` +
                            `dim(F ∨ G) + dim(F ∩ G) = ${dimJoin} + ${dimIntersect}<br>` +
                            `= ${dimJoin + dimIntersect}<br>` +
                            `= dim(F) + dim(G) = ${dimF + dimG} ✓`;
                    } else {
                        dimJoin = 2;
                        dimIntersect = -1; // empty intersection (dimension undefined)

                        // Highlight empty intersection
                        viz.drawText('F ∩ G = ∅', 0, 5, viz.colors.red, 14);

                        infoDiv.innerHTML = `<strong style="color: ${viz.colors.yellow}">PARALLEL (DISJOINT)</strong><br><br>` +
                            `F ∥ G but F ≠ G<br><br>` +
                            `dim(F) = ${dimF}<br>` +
                            `dim(G) = ${dimG}<br>` +
                            `<strong>dim(F ∩ G) = -1</strong> (empty!)<br>` +
                            `dim(F ∨ G) = ${dimJoin} (entire plane)<br><br>` +
                            `<strong>Formula:</strong><br>` +
                            `When F ∩ G = ∅ (disjoint):<br>` +
                            `dim(F ∨ G) = max{dim(F), dim(G)} + 1<br>` +
                            `= max{${dimF}, ${dimG}} + 1 = ${dimJoin} ✓`;
                    }
                } else {
                    // Find intersection
                    const dx = p2.x - p1.x;
                    const dy = p2.y - p1.y;
                    const s = (dx * dir2.y - dy * dir2.x) / cross;
                    const intx = p1.x + s * dir1.x;
                    const inty = p1.y + s * dir1.y;

                    dimJoin = 2;
                    dimIntersect = 0;

                    viz.drawPoint(intx, inty, viz.colors.green, 'F ∩ G', 9);

                    // Shade the join (entire plane)
                    for (let i = -6; i <= 6; i += 0.8) {
                        for (let j = -6; j <= 6; j += 0.8) {
                            viz.drawPoint(i, j, viz.colors.green + '11', null, 2);
                        }
                    }

                    infoDiv.innerHTML = `<strong style="color: ${viz.colors.green}">INTERSECTING</strong><br><br>` +
                        `F and G intersect at a point<br><br>` +
                        `dim(F) = ${dimF}<br>` +
                        `dim(G) = ${dimG}<br>` +
                        `dim(F ∩ G) = ${dimIntersect} (a point)<br>` +
                        `dim(F ∨ G) = ${dimJoin} (entire plane)<br><br>` +
                        `<strong>Formula:</strong><br>` +
                        `dim(F ∨ G) + dim(F ∩ G)<br>` +
                        `= ${dimJoin} + ${dimIntersect} = ${dimJoin + dimIntersect}<br>` +
                        `= dim(F) + dim(G) = ${dimF + dimG} ✓<br><br>` +
                        `<em>(Similar to dimension formula for subspaces!)</em>`;
                }

                // Draw direction vectors
                viz.drawVector(p1.x, p1.y, p1.x + dir1.x * 2, p1.y + dir1.y * 2,
                              viz.colors.blue, 'd₁', 2);
                viz.drawVector(p2.x, p2.y, p2.x + dir2.x * 2, p2.y + dir2.y * 2,
                              viz.colors.orange, 'd₂', 2);

                // Draw base points
                viz.drawPoint(p1.x, p1.y, viz.colors.blue, 'p₁', 8);
                viz.drawPoint(p2.x, p2.y, viz.colors.orange, 'p₂', 8);

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    }
];

console.log('Chapter 16 Extra Visualizations Loaded: 8 interactive visualizations for Affine Geometry');
