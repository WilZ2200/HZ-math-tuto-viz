// Chapter 12: Metric Spaces - Extra Interactive Visualizations
// Advanced Linear Algebra Web App

window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch12'] = window.EXTRA_VIZ['ch12'] || {};

// Section 1: Different Metrics and Metric Balls
window.EXTRA_VIZ['ch12']['ch12-sec01'] = [
    {
        id: 'ch12-extra-viz-1',
        title: 'Interactive: Comparing L1, L2, and L∞ Metric Balls',
        description: 'Explore how different metrics create different notions of "distance" and "closeness". Drag the center point and adjust epsilon to see unit balls in three common metrics.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 600, height: 600, scale: 50});

            let centerX = 0;
            let centerY = 0;
            let epsilon = 2.0;
            let showL1 = true;
            let showL2 = true;
            let showLinf = true;

            // Create controls
            const epsilonSlider = VizEngine.createSlider(controls, 'Epsilon (ε)', 0.5, 5, 2.0, 0.1, (val) => {
                epsilon = val;
                draw();
            });

            const l1Checkbox = document.createElement('label');
            l1Checkbox.innerHTML = '<input type="checkbox" checked> L¹ (Manhattan) ';
            l1Checkbox.style.marginRight = '15px';
            l1Checkbox.style.color = '#f0f6fc';
            l1Checkbox.querySelector('input').addEventListener('change', (e) => {
                showL1 = e.target.checked;
                draw();
            });
            controls.appendChild(l1Checkbox);

            const l2Checkbox = document.createElement('label');
            l2Checkbox.innerHTML = '<input type="checkbox" checked> L² (Euclidean) ';
            l2Checkbox.style.marginRight = '15px';
            l2Checkbox.style.color = '#f0f6fc';
            l2Checkbox.querySelector('input').addEventListener('change', (e) => {
                showL2 = e.target.checked;
                draw();
            });
            controls.appendChild(l2Checkbox);

            const linfCheckbox = document.createElement('label');
            linfCheckbox.innerHTML = '<input type="checkbox" checked> L∞ (Chebyshev) ';
            linfCheckbox.style.color = '#f0f6fc';
            linfCheckbox.querySelector('input').addEventListener('change', (e) => {
                showLinf = e.target.checked;
                draw();
            });
            controls.appendChild(linfCheckbox);

            const center = viz.addDraggable('center', centerX, centerY, viz.colors.white, 8, () => {
                centerX = center.x;
                centerY = center.y;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw L1 ball (diamond): |x| + |y| ≤ ε
                if (showL1) {
                    const l1Points = [
                        [centerX + epsilon, centerY],
                        [centerX, centerY + epsilon],
                        [centerX - epsilon, centerY],
                        [centerX, centerY - epsilon]
                    ];
                    viz.drawPolygon(l1Points, viz.colors.orange + '33', viz.colors.orange, 2);
                    viz.drawText('L¹', centerX + epsilon + 0.3, centerY, viz.colors.orange, 14);
                }

                // Draw L2 ball (circle): x² + y² ≤ ε²
                if (showL2) {
                    viz.drawCircle(centerX, centerY, epsilon, viz.colors.blue + '33', viz.colors.blue);
                    viz.drawText('L²', centerX + epsilon * 0.707, centerY + epsilon * 0.707, viz.colors.blue, 14);
                }

                // Draw L∞ ball (square): max(|x|, |y|) ≤ ε
                if (showLinf) {
                    const linfPoints = [
                        [centerX + epsilon, centerY + epsilon],
                        [centerX - epsilon, centerY + epsilon],
                        [centerX - epsilon, centerY - epsilon],
                        [centerX + epsilon, centerY - epsilon]
                    ];
                    viz.drawPolygon(linfPoints, viz.colors.green + '33', viz.colors.green, 2);
                    viz.drawText('L∞', centerX + epsilon, centerY + epsilon + 0.4, viz.colors.green, 14);
                }

                // Sample test point
                const testX = centerX + epsilon * 0.6;
                const testY = centerY + epsilon * 0.6;
                viz.drawPoint(testX, testY, viz.colors.yellow, null, 5);

                // Calculate distances
                const l1Dist = Math.abs(testX - centerX) + Math.abs(testY - centerY);
                const l2Dist = Math.sqrt((testX - centerX)**2 + (testY - centerY)**2);
                const linfDist = Math.max(Math.abs(testX - centerX), Math.abs(testY - centerY));

                viz.drawText(`Test point distances:`, -5.5, 5, viz.colors.text, 12, 'left');
                viz.drawText(`L¹: ${l1Dist.toFixed(2)}`, -5.5, 4.5, viz.colors.orange, 12, 'left');
                viz.drawText(`L²: ${l2Dist.toFixed(2)}`, -5.5, 4.0, viz.colors.blue, 12, 'left');
                viz.drawText(`L∞: ${linfDist.toFixed(2)}`, -5.5, 3.5, viz.colors.green, 12, 'left');

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch12-extra-viz-2',
        title: 'Interactive: Epsilon-Ball Explorer',
        description: 'Visualize open balls B(x, ε) in a metric space. See which points are inside vs outside the ball as you vary epsilon.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 600, height: 600, scale: 60});

            let centerX = 0;
            let centerY = 0;
            let epsilon = 1.5;

            // Random test points
            const testPoints = [];
            for (let i = 0; i < 20; i++) {
                testPoints.push({
                    x: (Math.random() - 0.5) * 8,
                    y: (Math.random() - 0.5) * 8
                });
            }

            const epsilonSlider = VizEngine.createSlider(controls, 'Epsilon (ε)', 0.2, 4, 1.5, 0.1, (val) => {
                epsilon = val;
                draw();
            });

            const center = viz.addDraggable('center', centerX, centerY, viz.colors.white, 10, () => {
                centerX = center.x;
                centerY = center.y;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw the epsilon-ball
                viz.drawCircle(centerX, centerY, epsilon, viz.colors.blue + '22', viz.colors.blue);

                // Draw boundary circle (dashed to indicate open ball)
                const ctx = viz.ctx;
                ctx.save();
                ctx.setLineDash([5, 5]);
                viz.drawCircle(centerX, centerY, epsilon, null, viz.colors.blue);
                ctx.restore();

                // Count points inside/outside
                let insideCount = 0;
                let outsideCount = 0;

                // Draw test points
                for (const pt of testPoints) {
                    const dist = Math.sqrt((pt.x - centerX)**2 + (pt.y - centerY)**2);
                    const isInside = dist < epsilon;

                    if (isInside) {
                        viz.drawPoint(pt.x, pt.y, viz.colors.green, null, 5);
                        insideCount++;
                    } else {
                        viz.drawPoint(pt.x, pt.y, viz.colors.red, null, 5);
                        outsideCount++;
                    }
                }

                // Draw center point
                viz.drawDraggables();

                // Display info
                viz.drawText(`Open Ball B(x, ${epsilon.toFixed(2)})`, -4.5, 4.5, viz.colors.white, 14, 'left');
                viz.drawText(`Points inside: ${insideCount}`, -4.5, 4.0, viz.colors.green, 12, 'left');
                viz.drawText(`Points outside: ${outsideCount}`, -4.5, 3.5, viz.colors.red, 12, 'left');
                viz.drawText(`(Boundary excluded)`, -4.5, 3.0, viz.colors.text, 11, 'left');
            }

            draw();
            return viz;
        }
    }
];

// Section 2: Sequences and Convergence
window.EXTRA_VIZ['ch12']['ch12-sec02'] = [
    {
        id: 'ch12-extra-viz-3',
        title: 'Interactive: Cauchy Sequence Convergence',
        description: 'Watch a Cauchy sequence converge to its limit. Observe how the distance between terms decreases as n increases.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 700, height: 500, scale: 80});

            let sequenceType = 'harmonic';
            let n = 1;
            let playing = false;

            // Define different Cauchy sequences
            const sequences = {
                'harmonic': (k) => ({
                    x: 1 + 1/k,
                    y: 1 + 1/(k+1),
                    limit: {x: 1, y: 1},
                    name: 'x_n = (1 + 1/n, 1 + 1/(n+1))'
                }),
                'exponential': (k) => ({
                    x: 2 * (1 - Math.exp(-k/5)),
                    y: 1.5 * (1 - Math.exp(-k/4)),
                    limit: {x: 2, y: 1.5},
                    name: 'x_n = (2(1-e^{-n/5}), 1.5(1-e^{-n/4}))'
                }),
                'spiral': (k) => ({
                    x: Math.cos(k/2) / k,
                    y: Math.sin(k/2) / k,
                    limit: {x: 0, y: 0},
                    name: 'x_n = (cos(n/2)/n, sin(n/2)/n)'
                })
            };

            const typeSelector = document.createElement('select');
            typeSelector.innerHTML = `
                <option value="harmonic">Harmonic</option>
                <option value="exponential">Exponential</option>
                <option value="spiral">Spiral</option>
            `;
            typeSelector.style.marginRight = '10px';
            typeSelector.addEventListener('change', (e) => {
                sequenceType = e.target.value;
                n = 1;
                draw();
            });
            controls.appendChild(typeSelector);

            const playButton = VizEngine.createButton(controls, 'Play', () => {
                playing = !playing;
                playButton.textContent = playing ? 'Pause' : 'Play';
                if (playing) animate();
            });

            const resetButton = VizEngine.createButton(controls, 'Reset', () => {
                n = 1;
                playing = false;
                playButton.textContent = 'Play';
                draw();
            });

            const nSlider = VizEngine.createSlider(controls, 'n', 1, 50, 1, 1, (val) => {
                n = Math.floor(val);
                draw();
            });

            function animate() {
                if (!playing) return;

                n = Math.min(n + 1, 50);
                nSlider.value = n;
                draw();

                if (n < 50) {
                    setTimeout(animate, 200);
                } else {
                    playing = false;
                    playButton.textContent = 'Play';
                }
            }

            function draw() {
                viz.clear();
                viz.drawGrid(0.5);
                viz.drawAxes();

                const seq = sequences[sequenceType];
                const limit = seq(100).limit;

                // Draw limit point
                viz.drawPoint(limit.x, limit.y, viz.colors.yellow, 'L', 8);
                viz.drawCircle(limit.x, limit.y, 0.05, null, viz.colors.yellow);

                // Draw sequence points
                const points = [];
                for (let k = 1; k <= n; k++) {
                    const pt = seq(k);
                    points.push(pt);

                    // Color gradient from red to green
                    const alpha = Math.min(k / 20, 1);
                    const color = k === n ? viz.colors.white : viz.colors.blue;
                    const radius = k === n ? 6 : 3;

                    viz.drawPoint(pt.x, pt.y, color, k === n ? `x${n}` : null, radius);

                    // Draw line to previous point
                    if (k > 1) {
                        viz.drawSegment(points[k-2].x, points[k-2].y, pt.x, pt.y, viz.colors.teal + '66', 1);
                    }
                }

                // Calculate distance to limit
                if (n > 0) {
                    const current = seq(n);
                    const dist = Math.sqrt((current.x - limit.x)**2 + (current.y - limit.y)**2);

                    // Draw distance line
                    viz.drawSegment(current.x, current.y, limit.x, limit.y, viz.colors.red, 1.5, true);

                    // Info display
                    viz.drawText(seq(1).name, -4, 3, viz.colors.white, 12, 'left');
                    viz.drawText(`n = ${n}`, -4, 2.5, viz.colors.text, 12, 'left');
                    viz.drawText(`d(x_n, L) = ${dist.toFixed(4)}`, -4, 2.0, viz.colors.red, 12, 'left');

                    // Cauchy criterion check
                    if (n > 1) {
                        const prev = seq(n-1);
                        const cauchyDist = Math.sqrt((current.x - prev.x)**2 + (current.y - prev.y)**2);
                        viz.drawText(`d(x_n, x_{n-1}) = ${cauchyDist.toFixed(4)}`, -4, 1.5, viz.colors.orange, 12, 'left');
                    }
                }
            }

            draw();
            return viz;
        }
    }
];

// Section 3: Completeness and Fixed Points
window.EXTRA_VIZ['ch12']['ch12-sec03'] = [
    {
        id: 'ch12-extra-viz-4',
        title: 'Interactive: Banach Fixed Point Theorem (Contraction Mapping)',
        description: 'Visualize the Banach Fixed Point Theorem in action. Watch as repeated application of a contraction mapping converges to a unique fixed point.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 700, height: 500, scale: 60});

            let contractionFactor = 0.5;
            let centerX = 1.5;
            let centerY = 1.0;
            let n = 0;
            let playing = false;
            let x0 = {x: -2, y: 2};

            // Contraction mapping: T(x) = c + λ(x - c)
            function contractionMap(pt) {
                return {
                    x: centerX + contractionFactor * (pt.x - centerX),
                    y: centerY + contractionFactor * (pt.y - centerY)
                };
            }

            const factorSlider = VizEngine.createSlider(controls, 'Contraction factor (λ)', 0.1, 0.9, 0.5, 0.05, (val) => {
                contractionFactor = val;
                n = 0;
                draw();
            });

            const playButton = VizEngine.createButton(controls, 'Iterate', () => {
                playing = !playing;
                playButton.textContent = playing ? 'Pause' : 'Iterate';
                if (playing) animate();
            });

            const resetButton = VizEngine.createButton(controls, 'Reset', () => {
                n = 0;
                playing = false;
                playButton.textContent = 'Iterate';
                draw();
            });

            const startPoint = viz.addDraggable('x0', x0.x, x0.y, viz.colors.green, 8, () => {
                x0 = {x: startPoint.x, y: startPoint.y};
                n = 0;
                draw();
            });

            function animate() {
                if (!playing) return;

                n = Math.min(n + 1, 20);
                draw();

                if (n < 20) {
                    setTimeout(animate, 500);
                } else {
                    playing = false;
                    playButton.textContent = 'Iterate';
                }
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Fixed point (center)
                viz.drawPoint(centerX, centerY, viz.colors.yellow, 'x*', 10);
                viz.drawCircle(centerX, centerY, 0.1, null, viz.colors.yellow);

                // Draw contraction region visualization
                viz.drawCircle(centerX, centerY, 3, viz.colors.purple + '11', viz.colors.purple + '44');

                // Compute iteration sequence
                let current = {x: x0.x, y: x0.y};
                const points = [current];

                for (let i = 0; i < n; i++) {
                    current = contractionMap(current);
                    points.push(current);
                }

                // Draw iteration path
                for (let i = 0; i < points.length; i++) {
                    const pt = points[i];

                    if (i === 0) {
                        viz.drawPoint(pt.x, pt.y, viz.colors.green, 'x₀', 7);
                    } else if (i === points.length - 1) {
                        viz.drawPoint(pt.x, pt.y, viz.colors.blue, `x${i}`, 6);
                    } else {
                        viz.drawPoint(pt.x, pt.y, viz.colors.blue + '88', null, 4);
                    }

                    // Draw arrow to next point
                    if (i < points.length - 1) {
                        const next = points[i + 1];
                        viz.drawVector(pt.x, pt.y, next.x, next.y, viz.colors.teal + '99', null, 1.5);
                    }
                }

                // Display information
                viz.drawText(`Fixed Point Iteration: x_{n+1} = T(x_n)`, -5, 4.5, viz.colors.white, 13, 'left');
                viz.drawText(`T(x) = c + λ(x - c), λ = ${contractionFactor.toFixed(2)}`, -5, 4.0, viz.colors.text, 12, 'left');
                viz.drawText(`Iteration: n = ${n}`, -5, 3.5, viz.colors.text, 12, 'left');

                if (n > 0) {
                    const dist = Math.sqrt((current.x - centerX)**2 + (current.y - centerY)**2);
                    viz.drawText(`d(x_n, x*) = ${dist.toFixed(4)}`, -5, 3.0, viz.colors.orange, 12, 'left');

                    const initialDist = Math.sqrt((x0.x - centerX)**2 + (x0.y - centerY)**2);
                    const theoreticalBound = initialDist * Math.pow(contractionFactor, n);
                    viz.drawText(`Bound: ${theoreticalBound.toFixed(4)}`, -5, 2.5, viz.colors.red, 11, 'left');
                }

                if (n === 0) {
                    viz.drawDraggables();
                }
            }

            draw();
            return viz;
        }
    }
];

// Section 4: Open and Closed Sets
window.EXTRA_VIZ['ch12']['ch12-sec04'] = [
    {
        id: 'ch12-extra-viz-5',
        title: 'Interactive: Open vs Closed Sets and Boundaries',
        description: 'Explore the difference between open and closed sets. See how boundary points are included or excluded.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 700, height: 500, scale: 60});

            let setType = 'open-ball';
            let radius = 2.0;

            const sets = {
                'open-ball': {
                    name: 'Open Ball B(0, r)',
                    contains: (x, y, r) => x*x + y*y < r*r,
                    boundary: (x, y, r) => Math.abs(x*x + y*y - r*r) < 0.1,
                    isBoundaryIncluded: false
                },
                'closed-ball': {
                    name: 'Closed Ball B̄(0, r)',
                    contains: (x, y, r) => x*x + y*y <= r*r,
                    boundary: (x, y, r) => Math.abs(x*x + y*y - r*r) < 0.1,
                    isBoundaryIncluded: true
                },
                'open-square': {
                    name: 'Open Square (-r, r) × (-r, r)',
                    contains: (x, y, r) => Math.abs(x) < r && Math.abs(y) < r,
                    boundary: (x, y, r) => (Math.abs(Math.abs(x) - r) < 0.1 && Math.abs(y) <= r) ||
                                          (Math.abs(Math.abs(y) - r) < 0.1 && Math.abs(x) <= r),
                    isBoundaryIncluded: false
                },
                'closed-square': {
                    name: 'Closed Square [-r, r] × [-r, r]',
                    contains: (x, y, r) => Math.abs(x) <= r && Math.abs(y) <= r,
                    boundary: (x, y, r) => (Math.abs(Math.abs(x) - r) < 0.1 && Math.abs(y) <= r) ||
                                          (Math.abs(Math.abs(y) - r) < 0.1 && Math.abs(x) <= r),
                    isBoundaryIncluded: true
                }
            };

            const typeSelector = document.createElement('select');
            typeSelector.innerHTML = `
                <option value="open-ball">Open Ball</option>
                <option value="closed-ball">Closed Ball</option>
                <option value="open-square">Open Square</option>
                <option value="closed-square">Closed Square</option>
            `;
            typeSelector.style.marginRight = '10px';
            typeSelector.addEventListener('change', (e) => {
                setType = e.target.value;
                draw();
            });
            controls.appendChild(typeSelector);

            const radiusSlider = VizEngine.createSlider(controls, 'Radius (r)', 0.5, 3.5, 2.0, 0.1, (val) => {
                radius = val;
                draw();
            });

            // Generate test points
            const testPoints = [];
            for (let x = -4; x <= 4; x += 0.4) {
                for (let y = -4; y <= 4; y += 0.4) {
                    testPoints.push({x, y});
                }
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const set = sets[setType];

                // Draw test points
                for (const pt of testPoints) {
                    const isInside = set.contains(pt.x, pt.y, radius);
                    const isBoundary = set.boundary(pt.x, pt.y, radius);

                    if (isBoundary) {
                        if (set.isBoundaryIncluded) {
                            viz.drawPoint(pt.x, pt.y, viz.colors.orange, null, 4);
                        } else {
                            viz.drawCircle(pt.x, pt.y, 0.08, null, viz.colors.orange);
                        }
                    } else if (isInside) {
                        viz.drawPoint(pt.x, pt.y, viz.colors.green + '88', null, 3);
                    }
                }

                // Draw boundary
                if (setType.includes('ball')) {
                    const ctx = viz.ctx;
                    ctx.save();
                    if (!set.isBoundaryIncluded) {
                        ctx.setLineDash([5, 5]);
                    }
                    viz.drawCircle(0, 0, radius, null, viz.colors.orange);
                    ctx.restore();
                } else {
                    const ctx = viz.ctx;
                    ctx.save();
                    if (!set.isBoundaryIncluded) {
                        ctx.setLineDash([5, 5]);
                    }
                    viz.drawPolygon([
                        [radius, radius],
                        [-radius, radius],
                        [-radius, -radius],
                        [radius, -radius]
                    ], null, viz.colors.orange, 2);
                    ctx.restore();
                }

                // Legend
                viz.drawText(set.name, -5.5, 4.0, viz.colors.white, 14, 'left');

                viz.drawPoint(-5.2, 3.3, viz.colors.green + '88', null, 4);
                viz.drawText('Interior points', -4.8, 3.3, viz.colors.text, 11, 'left');

                if (set.isBoundaryIncluded) {
                    viz.drawPoint(-5.2, 2.8, viz.colors.orange, null, 4);
                    viz.drawText('Boundary (included)', -4.8, 2.8, viz.colors.text, 11, 'left');
                } else {
                    viz.drawCircle(-5.2, 2.8, 0.08, null, viz.colors.orange);
                    viz.drawText('Boundary (excluded)', -4.8, 2.8, viz.colors.text, 11, 'left');
                }

                viz.drawText(set.isBoundaryIncluded ? 'CLOSED SET' : 'OPEN SET',
                            -5.5, 2.2, set.isBoundaryIncluded ? viz.colors.blue : viz.colors.red, 13, 'left');
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch12-extra-viz-6',
        title: 'Interactive: Compactness and Open Cover Extraction',
        description: 'Visualize the Heine-Borel theorem: a subset of ℝⁿ is compact if and only if it is closed and bounded. Extract finite subcovers from open covers.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 700, height: 500, scale: 70});

            let setType = 'compact';
            let numCovers = 5;
            let showFiniteSubcover = false;

            const sets = {
                'compact': {
                    name: '[−2, 2] × [−1.5, 1.5] (Compact)',
                    bounds: {xMin: -2, xMax: 2, yMin: -1.5, yMax: 1.5},
                    isCompact: true,
                    isClosed: true,
                    isBounded: true
                },
                'not-closed': {
                    name: '(−2, 2) × (−1.5, 1.5) (Not Compact: Not Closed)',
                    bounds: {xMin: -2, xMax: 2, yMin: -1.5, yMax: 1.5},
                    isCompact: false,
                    isClosed: false,
                    isBounded: true
                },
                'not-bounded': {
                    name: '[0, ∞) × [−1, 1] (Not Compact: Not Bounded)',
                    bounds: {xMin: 0, xMax: 4, yMin: -1, yMax: 1},
                    isCompact: false,
                    isClosed: true,
                    isBounded: false
                }
            };

            const typeSelector = document.createElement('select');
            typeSelector.innerHTML = `
                <option value="compact">Compact Set</option>
                <option value="not-closed">Not Closed</option>
                <option value="not-bounded">Not Bounded</option>
            `;
            typeSelector.style.marginRight = '10px';
            typeSelector.addEventListener('change', (e) => {
                setType = e.target.value;
                generateCovers();
                draw();
            });
            controls.appendChild(typeSelector);

            const coversSlider = VizEngine.createSlider(controls, 'Number of open sets', 3, 10, 5, 1, (val) => {
                numCovers = Math.floor(val);
                generateCovers();
                draw();
            });

            const subcover = document.createElement('label');
            subcover.innerHTML = '<input type="checkbox"> Show finite subcover ';
            subcover.style.color = '#f0f6fc';
            subcover.querySelector('input').addEventListener('change', (e) => {
                showFiniteSubcover = e.target.checked;
                draw();
            });
            controls.appendChild(subcover);

            let openSets = [];

            function generateCovers() {
                const set = sets[setType];
                openSets = [];

                // Generate random open balls that cover the set
                for (let i = 0; i < numCovers; i++) {
                    const centerX = set.bounds.xMin + Math.random() * (set.bounds.xMax - set.bounds.xMin);
                    const centerY = set.bounds.yMin + Math.random() * (set.bounds.yMax - set.bounds.yMin);
                    const radius = 0.8 + Math.random() * 1.2;

                    openSets.push({
                        x: centerX,
                        y: centerY,
                        r: radius,
                        color: `hsl(${i * 360 / numCovers}, 70%, 60%)`
                    });
                }
            }

            generateCovers();

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const set = sets[setType];

                // Draw open cover
                const setsToShow = showFiniteSubcover && set.isCompact ?
                    openSets.slice(0, Math.ceil(numCovers / 2)) : openSets;

                for (const openSet of setsToShow) {
                    viz.drawCircle(openSet.x, openSet.y, openSet.r, openSet.color + '22', openSet.color + '88');
                }

                // Draw the set
                const b = set.bounds;
                const ctx = viz.ctx;
                ctx.save();

                if (!set.isClosed) {
                    ctx.setLineDash([5, 5]);
                }

                if (set.isBounded) {
                    viz.drawPolygon([
                        [b.xMax, b.yMax],
                        [b.xMin, b.yMax],
                        [b.xMin, b.yMin],
                        [b.xMax, b.yMin]
                    ], viz.colors.blue + '11', viz.colors.blue, 3);
                } else {
                    // Draw unbounded set with arrow
                    viz.drawSegment(b.xMin, b.yMin, b.xMin, b.yMax, viz.colors.blue, 3);
                    viz.drawSegment(b.xMin, b.yMin, b.xMax, b.yMin, viz.colors.blue, 3);
                    viz.drawSegment(b.xMin, b.yMax, b.xMax, b.yMax, viz.colors.blue, 3);
                    viz.drawVector(b.xMax - 0.5, 0, b.xMax, 0, viz.colors.blue, null, 3);
                }

                ctx.restore();

                // Info panel
                viz.drawText(set.name, -4.5, 3.5, viz.colors.white, 13, 'left');
                viz.drawText(`Closed: ${set.isClosed ? 'Yes' : 'No'}`, -4.5, 3.0,
                            set.isClosed ? viz.colors.green : viz.colors.red, 11, 'left');
                viz.drawText(`Bounded: ${set.isBounded ? 'Yes' : 'No'}`, -4.5, 2.6,
                            set.isBounded ? viz.colors.green : viz.colors.red, 11, 'left');
                viz.drawText(`Compact: ${set.isCompact ? 'Yes' : 'No'}`, -4.5, 2.2,
                            set.isCompact ? viz.colors.green : viz.colors.red, 12, 'left');

                if (showFiniteSubcover) {
                    if (set.isCompact) {
                        viz.drawText(`Finite subcover: ${setsToShow.length}/${openSets.length} sets`,
                                    -4.5, 1.7, viz.colors.yellow, 11, 'left');
                    } else {
                        viz.drawText('No finite subcover exists!', -4.5, 1.7, viz.colors.red, 11, 'left');
                    }
                }
            }

            draw();
            return viz;
        }
    }
];

// Section 5: Continuity and Isometries
window.EXTRA_VIZ['ch12']['ch12-sec05'] = [
    {
        id: 'ch12-extra-viz-7',
        title: 'Interactive: Continuous Functions on Metric Spaces',
        description: 'Visualize epsilon-delta continuity. For any ε > 0, find δ > 0 such that d(x, x₀) < δ implies d(f(x), f(x₀)) < ε.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 700, height: 500, scale: 60});

            let epsilon = 0.8;
            let delta = 0.5;
            let x0 = {x: 1, y: 0.5};

            // Define a continuous function: f(x, y) = (x², xy)
            function f(pt) {
                return {
                    x: pt.x * pt.x / 3,
                    y: pt.x * pt.y / 2
                };
            }

            const fx0 = f(x0);

            const epsilonSlider = VizEngine.createSlider(controls, 'Epsilon (ε)', 0.2, 2.0, 0.8, 0.1, (val) => {
                epsilon = val;
                draw();
            });

            const deltaSlider = VizEngine.createSlider(controls, 'Delta (δ)', 0.1, 2.0, 0.5, 0.1, (val) => {
                delta = val;
                draw();
            });

            const point = viz.addDraggable('x0', x0.x, x0.y, viz.colors.white, 8, () => {
                x0 = {x: point.x, y: point.y};
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const fx0 = f(x0);

                // Draw input space (left side)
                viz.drawCircle(x0.x, x0.y, delta, viz.colors.blue + '22', viz.colors.blue);
                viz.drawPoint(x0.x, x0.y, viz.colors.white, 'x₀', 7);

                // Sample points in delta-ball
                const samplePoints = [];
                for (let angle = 0; angle < 2 * Math.PI; angle += Math.PI / 6) {
                    for (let r = 0.3; r <= delta; r += 0.3) {
                        const px = x0.x + r * Math.cos(angle);
                        const py = x0.y + r * Math.sin(angle);
                        const dist = Math.sqrt((px - x0.x)**2 + (py - x0.y)**2);

                        if (dist < delta) {
                            samplePoints.push({x: px, y: py});
                        }
                    }
                }

                // Draw output space (right side)
                const offset = 5;
                viz.drawCircle(fx0.x + offset, fx0.y, epsilon, viz.colors.green + '22', viz.colors.green);
                viz.drawPoint(fx0.x + offset, fx0.y, viz.colors.yellow, 'f(x₀)', 7);

                // Check continuity condition
                let allInside = true;
                for (const pt of samplePoints) {
                    viz.drawPoint(pt.x, pt.y, viz.colors.blue + '88', null, 3);

                    const fpt = f(pt);
                    const distToFx0 = Math.sqrt((fpt.x - fx0.x)**2 + (fpt.y - fx0.y)**2);

                    if (distToFx0 < epsilon) {
                        viz.drawPoint(fpt.x + offset, fpt.y, viz.colors.green + '88', null, 3);
                    } else {
                        viz.drawPoint(fpt.x + offset, fpt.y, viz.colors.red + '88', null, 3);
                        allInside = false;
                    }

                    // Draw mapping arrow
                    viz.drawSegment(pt.x, pt.y, fpt.x + offset, fpt.y, viz.colors.teal + '33', 1);
                }

                viz.drawDraggables();

                // Labels
                viz.drawText('Input Space X', x0.x, 3.5, viz.colors.text, 12);
                viz.drawText('Output Space Y', fx0.x + offset, 3.5, viz.colors.text, 12);
                viz.drawText(`B(x₀, δ=${delta.toFixed(2)})`, x0.x, -3.5, viz.colors.blue, 11);
                viz.drawText(`B(f(x₀), ε=${epsilon.toFixed(2)})`, fx0.x + offset, -3.5, viz.colors.green, 11);

                // Continuity check
                if (allInside) {
                    viz.drawText('✓ Continuity satisfied!', -5, -3.8, viz.colors.green, 13, 'left');
                    viz.drawText('f(B(x₀,δ)) ⊆ B(f(x₀),ε)', -5, -4.3, viz.colors.text, 11, 'left');
                } else {
                    viz.drawText('✗ Need smaller δ', -5, -3.8, viz.colors.red, 13, 'left');
                }
            }

            draw();
            return viz;
        }
    }
];

// Section 6: Separability and Dense Subsets
window.EXTRA_VIZ['ch12']['ch12-sec06'] = [
    {
        id: 'ch12-extra-viz-8',
        title: 'Interactive: Dense Subsets and Separability',
        description: 'Visualize dense subsets of a metric space. A set S is dense if every point can be approximated arbitrarily well by points in S.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 700, height: 500, scale: 60});

            let epsilon = 0.5;
            let showRationals = true;

            // Generate rational points in a region (Q² is dense in R²)
            const rationalPoints = [];
            for (let p = -20; p <= 20; p++) {
                for (let q = 1; q <= 10; q++) {
                    for (let r = -20; r <= 20; r++) {
                        for (let s = 1; s <= 10; s++) {
                            const x = p / q;
                            const y = r / s;
                            if (Math.abs(x) <= 5 && Math.abs(y) <= 4) {
                                rationalPoints.push({x, y});
                            }
                        }
                    }
                }
            }

            // Remove duplicates
            const uniqueRationals = [];
            const seen = new Set();
            for (const pt of rationalPoints) {
                const key = `${pt.x.toFixed(3)},${pt.y.toFixed(3)}`;
                if (!seen.has(key)) {
                    seen.add(key);
                    uniqueRationals.push(pt);
                }
            }

            // Random test points (could be irrational)
            const testPoints = [];
            for (let i = 0; i < 8; i++) {
                testPoints.push({
                    x: (Math.random() - 0.5) * 8,
                    y: (Math.random() - 0.5) * 6
                });
            }

            const epsilonSlider = VizEngine.createSlider(controls, 'Epsilon (ε)', 0.1, 1.5, 0.5, 0.05, (val) => {
                epsilon = val;
                draw();
            });

            const checkbox = document.createElement('label');
            checkbox.innerHTML = '<input type="checkbox" checked> Show rational points ';
            checkbox.style.color = '#f0f6fc';
            checkbox.querySelector('input').addEventListener('change', (e) => {
                showRationals = e.target.checked;
                draw();
            });
            controls.appendChild(checkbox);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw rational points (dense subset)
                if (showRationals) {
                    for (const pt of uniqueRationals) {
                        viz.drawPoint(pt.x, pt.y, viz.colors.teal + '44', null, 1.5);
                    }
                }

                // Draw test points and their epsilon-balls
                for (const testPt of testPoints) {
                    viz.drawCircle(testPt.x, testPt.y, epsilon, viz.colors.orange + '11', viz.colors.orange + '66');
                    viz.drawPoint(testPt.x, testPt.y, viz.colors.yellow, null, 6);

                    // Find closest rational point
                    let minDist = Infinity;
                    let closest = null;

                    for (const ratPt of uniqueRationals) {
                        const dist = Math.sqrt((ratPt.x - testPt.x)**2 + (ratPt.y - testPt.y)**2);
                        if (dist < minDist) {
                            minDist = dist;
                            closest = ratPt;
                        }
                    }

                    if (closest && minDist < epsilon) {
                        viz.drawPoint(closest.x, closest.y, viz.colors.green, null, 4);
                        viz.drawSegment(testPt.x, testPt.y, closest.x, closest.y, viz.colors.green, 1.5);
                    }
                }

                // Info
                viz.drawText('Dense Subset Example: Q² in R²', -5.5, 4.5, viz.colors.white, 13, 'left');
                viz.drawText(`${uniqueRationals.length} rational points shown`, -5.5, 4.0, viz.colors.teal, 11, 'left');

                viz.drawPoint(-5.2, 3.3, viz.colors.yellow, null, 6);
                viz.drawText('Test points (any real numbers)', -4.8, 3.3, viz.colors.text, 11, 'left');

                viz.drawPoint(-5.2, 2.8, viz.colors.green, null, 4);
                viz.drawText('Closest rational in ε-ball', -4.8, 2.8, viz.colors.text, 11, 'left');

                viz.drawText('Q² is countable and dense in R²', -5.5, 2.2, viz.colors.green, 12, 'left');
                viz.drawText('(R² is separable)', -5.5, 1.7, viz.colors.text, 11, 'left');
            }

            draw();
            return viz;
        }
    }
];
