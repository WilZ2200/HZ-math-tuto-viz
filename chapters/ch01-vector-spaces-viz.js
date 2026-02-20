// Extra Interactive Visualizations for Chapter 1: Vector Spaces
// Steven Roman's Advanced Linear Algebra

window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch01'] = window.EXTRA_VIZ['ch01'] || {};

// Section 1: Vector Spaces and Subspaces
window.EXTRA_VIZ['ch01']['ch01-sec01'] = [
    {
        id: 'ch01-extra-viz-8',
        title: 'Interactive: Complexification Visualizer',
        description: 'See how a real vector space ℝ² embeds into its complexification ℝ²⊗ℂ. Real vectors are shown in blue, imaginary parts in red.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const realPart = viz.addDraggable('real', 2, 1, viz.colors.blue, 8, () => draw());
            const imagPart = viz.addDraggable('imag', -1, 2, viz.colors.red, 8, () => draw());

            let showRealOnly = false;

            const toggleBtn = VizEngine.createButton(controls, 'Toggle Real/Complex View', () => {
                showRealOnly = !showRealOnly;
                toggleBtn.textContent = showRealOnly ? 'Show Complex Part' : 'Show Real Only';
                draw();
            });

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '12px';
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                if (showRealOnly) {
                    // Show only real part (embedding)
                    viz.drawVector(0, 0, realPart.x, realPart.y, viz.colors.blue, 'v', 4);

                    // Show some other real vectors
                    for (let i = -3; i <= 3; i++) {
                        for (let j = -3; j <= 3; j++) {
                            if (i !== 0 || j !== 0) {
                                viz.drawPoint(i * 0.8, j * 0.8, viz.colors.blue + '33', null, 3);
                            }
                        }
                    }

                    infoDiv.innerHTML = `<strong>Real Vector Space ℝ²</strong><br><br>` +
                        `v = (${realPart.x.toFixed(2)}, ${realPart.y.toFixed(2)})<br><br>` +
                        `This is embedded in ℝ²⊗ℂ via:<br>` +
                        `cpx(v) = v + i·0<br>` +
                        `       = (${realPart.x.toFixed(2)}, ${realPart.y.toFixed(2)}) + i·(0, 0)`;
                } else {
                    // Show complex vector
                    viz.drawVector(0, 0, realPart.x, realPart.y, viz.colors.blue, 'Re(z)', 3);
                    viz.drawVector(0, 0, imagPart.x, imagPart.y, viz.colors.red, 'Im(z)', 3);

                    // Show the complex vector as combination
                    viz.drawVector(0, 0, realPart.x, realPart.y, viz.colors.blue + '88', null, 2);
                    viz.drawVector(realPart.x, realPart.y,
                        realPart.x + imagPart.x, realPart.y + imagPart.y,
                        viz.colors.red + '88', null, 2);

                    viz.drawVector(0, 0, realPart.x + imagPart.x, realPart.y + imagPart.y,
                        viz.colors.purple, 'z = Re + i·Im', 4);

                    // Draw parallelogram
                    viz.drawSegment(realPart.x, realPart.y,
                        realPart.x + imagPart.x, realPart.y + imagPart.y,
                        viz.colors.white + '44', 1, true);
                    viz.drawSegment(imagPart.x, imagPart.y,
                        realPart.x + imagPart.x, realPart.y + imagPart.y,
                        viz.colors.white + '44', 1, true);

                    infoDiv.innerHTML = `<strong>Complexification ℝ²⊗ℂ</strong><br><br>` +
                        `z = (${realPart.x.toFixed(2)}, ${realPart.y.toFixed(2)}) + ` +
                        `i·(${imagPart.x.toFixed(2)}, ${imagPart.y.toFixed(2)})<br><br>` +
                        `Real part: Re(z) = (${realPart.x.toFixed(2)}, ${realPart.y.toFixed(2)})<br>` +
                        `Imag part: Im(z) = (${imagPart.x.toFixed(2)}, ${imagPart.y.toFixed(2)})<br><br>` +
                        `<em>Note: Both Re(z) and Im(z) are in ℝ²</em><br>` +
                        `dim(ℝ²⊗ℂ) = dim(ℝ²) = 2 over ℂ`;
                }

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    }
];

// Section 2: The Lattice of Subspaces
window.EXTRA_VIZ['ch01']['ch01-sec02'] = [
    {
        id: 'ch01-extra-viz-3',
        title: 'Interactive: Subspace Sum vs Intersection',
        description: 'Visualize U+W (sum) and U∩W (intersection) of two subspaces as lines in ℝ². Drag to see when the sum becomes a direct sum.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const u = viz.addDraggable('u', 2, 1, viz.colors.blue, 8, () => draw());
            const w = viz.addDraggable('w', 1, 2, viz.colors.orange, 8, () => draw());

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '12px';
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Check if direct sum (U ∩ W = {0})
                const det = u.x * w.y - u.y * w.x;
                const isDirectSum = Math.abs(det) > 0.01;

                // Draw U (line through origin in direction of u)
                const uLen = Math.sqrt(u.x * u.x + u.y * u.y);
                if (uLen > 0.01) {
                    const ux = u.x / uLen;
                    const uy = u.y / uLen;
                    for (let t = -15; t <= 15; t += 0.2) {
                        viz.drawPoint(t * ux, t * uy, viz.colors.blue + '44', null, 3);
                    }
                }

                // Draw W (line through origin in direction of w)
                const wLen = Math.sqrt(w.x * w.x + w.y * w.y);
                if (wLen > 0.01) {
                    const wx = w.x / wLen;
                    const wy = w.y / wLen;
                    for (let t = -15; t <= 15; t += 0.2) {
                        viz.drawPoint(t * wx, t * wy, viz.colors.orange + '44', null, 3);
                    }
                }

                // Draw U + W (sum)
                if (isDirectSum) {
                    // U ⊕ W = entire plane
                    for (let a = -8; a <= 8; a++) {
                        for (let b = -8; b <= 8; b++) {
                            const x = a * u.x + b * w.x;
                            const y = a * u.y + b * w.y;
                            if (Math.abs(x) < 10 && Math.abs(y) < 10) {
                                viz.drawPoint(x, y, viz.colors.green + '11', null, 1.5);
                            }
                        }
                    }
                    infoDiv.innerHTML = `<span style="color: ${viz.colors.green}">● DIRECT SUM: U ⊕ W</span><br>` +
                        `U ∩ W = {0}<br>` +
                        `U + W = ℝ²<br>` +
                        `dim(U) + dim(W) = 1 + 1 = 2 = dim(U ⊕ W)`;
                } else {
                    // U and W are the same line
                    infoDiv.innerHTML = `<span style="color: ${viz.colors.yellow}">● NOT A DIRECT SUM</span><br>` +
                        `U ∩ W = U = W (same line)<br>` +
                        `U + W = U = W<br>` +
                        `dim(U + W) = 1 ≠ dim(U) + dim(W) = 2`;
                }

                // Draw the direction vectors
                viz.drawVector(0, 0, u.x, u.y, viz.colors.blue, 'u ∈ U', 3);
                viz.drawVector(0, 0, w.x, w.y, viz.colors.orange, 'w ∈ W', 3);

                // Draw origin prominently
                viz.drawPoint(0, 0, viz.colors.white, null, 6);

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    }
];

// Section 3: Spanning Sets and Linear Independence
window.EXTRA_VIZ['ch01']['ch01-sec03'] = [
    {
        id: 'ch01-extra-viz-1',
        title: 'Interactive: Span Explorer in ℝ²',
        description: 'Drag two vectors to explore how their span changes. Watch for linear dependence when vectors become collinear.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const v1 = viz.addDraggable('v1', 3, 1, viz.colors.blue, 8, () => draw());
            const v2 = viz.addDraggable('v2', 1, 2.5, viz.colors.orange, 8, () => draw());

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Compute determinant to check linear independence
                const det = v1.x * v2.y - v1.y * v2.x;
                const isIndependent = Math.abs(det) > 0.01;

                if (isIndependent) {
                    // Draw span as parallelogram tiling (full plane)
                    for (let a = -8; a <= 8; a++) {
                        for (let b = -8; b <= 8; b++) {
                            const x = a * v1.x + b * v2.x;
                            const y = a * v1.y + b * v2.y;
                            if (Math.abs(x) < 10 && Math.abs(y) < 10) {
                                viz.drawPoint(x, y, viz.colors.teal + '33', null, 2);
                            }
                        }
                    }
                    infoDiv.innerHTML = `<span style="color: ${viz.colors.green}">● Linearly Independent</span><br>` +
                        `det = ${det.toFixed(3)}<br>` +
                        `Span(v₁, v₂) = ℝ²`;
                } else {
                    // Draw span as line
                    const len = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
                    if (len > 0.01) {
                        const dx = v1.x / len;
                        const dy = v1.y / len;
                        for (let t = -10; t <= 10; t += 0.1) {
                            const x = t * dx;
                            const y = t * dy;
                            viz.drawPoint(x, y, viz.colors.yellow + '44', null, 2);
                        }
                    }
                    infoDiv.innerHTML = `<span style="color: ${viz.colors.red}">● Linearly Dependent</span><br>` +
                        `det ≈ ${det.toFixed(3)}<br>` +
                        `Span(v₁, v₂) = 1-dimensional line`;
                }

                // Draw vectors
                viz.drawVector(0, 0, v1.x, v1.y, viz.colors.blue, 'v₁', 3);
                viz.drawVector(0, 0, v2.x, v2.y, viz.colors.orange, 'v₂', 3);

                // Draw parallelogram
                viz.drawSegment(v1.x, v1.y, v1.x + v2.x, v1.y + v2.y, viz.colors.white + '66', 2, true);
                viz.drawSegment(v2.x, v2.y, v1.x + v2.x, v1.y + v2.y, viz.colors.white + '66', 2, true);

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    },
    {
        id: 'ch01-extra-viz-2',
        title: 'Interactive: Linear Dependence Detector',
        description: 'Add up to 3 vectors and see when they become linearly dependent. A vector is dependent if it lies in the span of the others.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const v1 = viz.addDraggable('v1', 2, 1, viz.colors.blue, 8, () => draw());
            const v2 = viz.addDraggable('v2', -1, 2, viz.colors.orange, 8, () => draw());
            const v3 = viz.addDraggable('v3', 1, 1, viz.colors.green, 8, () => draw());

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '12px';
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw span of v1 and v2
                const det12 = v1.x * v2.y - v1.y * v2.x;
                if (Math.abs(det12) > 0.01) {
                    // v1 and v2 span a plane - draw light dots
                    for (let a = -6; a <= 6; a++) {
                        for (let b = -6; b <= 6; b++) {
                            const x = a * v1.x + b * v2.x;
                            const y = a * v1.y + b * v2.y;
                            if (Math.abs(x) < 10 && Math.abs(y) < 10) {
                                viz.drawPoint(x, y, viz.colors.purple + '22', null, 2);
                            }
                        }
                    }
                }

                // Check if v3 is in span of v1 and v2
                // Solve v3 = a*v1 + b*v2 using Cramer's rule
                let isDependent = false;
                let coeffs = '';

                if (Math.abs(det12) > 0.01) {
                    const a = (v3.x * v2.y - v3.y * v2.x) / det12;
                    const b = (v1.x * v3.y - v1.y * v3.x) / det12;
                    const checkX = a * v1.x + b * v2.x;
                    const checkY = a * v1.y + b * v2.y;
                    const error = Math.sqrt((checkX - v3.x)**2 + (checkY - v3.y)**2);

                    if (error < 0.1) {
                        isDependent = true;
                        coeffs = `v₃ = ${a.toFixed(2)}v₁ + ${b.toFixed(2)}v₂`;
                    }
                } else {
                    // v1 and v2 are collinear
                    isDependent = true;
                    coeffs = 'v₁ and v₂ are collinear';
                }

                // Draw vectors
                viz.drawVector(0, 0, v1.x, v1.y, viz.colors.blue, 'v₁', 3);
                viz.drawVector(0, 0, v2.x, v2.y, viz.colors.orange, 'v₂', 3);
                viz.drawVector(0, 0, v3.x, v3.y,
                    isDependent ? viz.colors.red : viz.colors.green, 'v₃', 3);

                viz.drawDraggables();

                // Update info
                infoDiv.innerHTML = isDependent ?
                    `<span style="color: ${viz.colors.red}">● LINEARLY DEPENDENT</span><br>${coeffs}<br>` +
                    `The set {v₁, v₂, v₃} can be reduced.` :
                    `<span style="color: ${viz.colors.green}">● Linearly Independent</span><br>` +
                    `{v₁, v₂, v₃} forms a basis for ℝ²<br>` +
                    `(Actually, any two are enough!)`;
            }

            draw();
            return viz;
        }
    }
];

// Section 4: Bases and Dimension
window.EXTRA_VIZ['ch01']['ch01-sec04'] = [
    {
        id: 'ch01-extra-viz-6',
        title: 'Interactive: Dimension Formula Visualizer',
        description: 'Explore dim(U+W) = dim(U) + dim(W) - dim(U∩W) with two lines in ℝ². Watch dimensions change as lines rotate.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const u = viz.addDraggable('u', 2, 1, viz.colors.blue, 8, () => draw());
            const w = viz.addDraggable('w', -1, 2, viz.colors.orange, 8, () => draw());

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '13px';
            infoDiv.style.padding = '10px';
            infoDiv.style.backgroundColor = '#1a1a1a';
            infoDiv.style.borderRadius = '5px';
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw U (1-dimensional subspace)
                const uLen = Math.sqrt(u.x * u.x + u.y * u.y);
                if (uLen > 0.01) {
                    const ux = u.x / uLen;
                    const uy = u.y / uLen;
                    for (let t = -15; t <= 15; t += 0.15) {
                        viz.drawPoint(t * ux, t * uy, viz.colors.blue + '55', null, 3);
                    }
                }

                // Draw W (1-dimensional subspace)
                const wLen = Math.sqrt(w.x * w.x + w.y * w.y);
                if (wLen > 0.01) {
                    const wx = w.x / wLen;
                    const wy = w.y / wLen;
                    for (let t = -15; t <= 15; t += 0.15) {
                        viz.drawPoint(t * wx, t * wy, viz.colors.orange + '55', null, 3);
                    }
                }

                // Check if U and W are the same line
                const det = u.x * w.y - u.y * w.x;
                const sameLine = Math.abs(det) < 0.1;

                let dimU = 1, dimW = 1, dimIntersection, dimSum;

                if (sameLine) {
                    dimIntersection = 1;
                    dimSum = 1;

                    infoDiv.innerHTML = `<strong>CASE: U = W (Same Line)</strong><br><br>` +
                        `dim(U) = ${dimU}<br>` +
                        `dim(W) = ${dimW}<br>` +
                        `dim(U ∩ W) = ${dimIntersection} <span style="color: ${viz.colors.yellow}">(U ∩ W = U = W)</span><br>` +
                        `dim(U + W) = ${dimSum} <span style="color: ${viz.colors.yellow}">(U + W = U = W)</span><br><br>` +
                        `<strong style="color: ${viz.colors.green}">✓ Dimension Formula:</strong><br>` +
                        `${dimSum} = ${dimU} + ${dimW} - ${dimIntersection}<br>` +
                        `${dimSum} = ${dimU + dimW - dimIntersection} ✓`;
                } else {
                    dimIntersection = 0;
                    dimSum = 2;

                    // Draw sum (entire plane) lightly
                    for (let i = -8; i <= 8; i++) {
                        for (let j = -8; j <= 8; j++) {
                            const x = i * u.x + j * w.x;
                            const y = i * u.y + j * w.y;
                            if (Math.abs(x) < 10 && Math.abs(y) < 10) {
                                viz.drawPoint(x, y, viz.colors.green + '08', null, 1.5);
                            }
                        }
                    }

                    infoDiv.innerHTML = `<strong>CASE: U ⊕ W (Direct Sum)</strong><br><br>` +
                        `dim(U) = ${dimU}<br>` +
                        `dim(W) = ${dimW}<br>` +
                        `dim(U ∩ W) = ${dimIntersection} <span style="color: ${viz.colors.green}">(U ∩ W = {0})</span><br>` +
                        `dim(U + W) = ${dimSum} <span style="color: ${viz.colors.green}">(U + W = ℝ²)</span><br><br>` +
                        `<strong style="color: ${viz.colors.green}">✓ Dimension Formula:</strong><br>` +
                        `${dimSum} = ${dimU} + ${dimW} - ${dimIntersection}<br>` +
                        `${dimSum} = ${dimU + dimW - dimIntersection} ✓`;
                }

                // Draw basis vectors
                viz.drawVector(0, 0, u.x, u.y, viz.colors.blue, 'u', 3);
                viz.drawVector(0, 0, w.x, w.y, viz.colors.orange, 'w', 3);

                // Highlight origin
                viz.drawPoint(0, 0, viz.colors.white, null, 6);

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    }
];

// Section 5: Direct Sums
window.EXTRA_VIZ['ch01']['ch01-sec05'] = [
    {
        id: 'ch01-extra-viz-4',
        title: 'Interactive: Direct Sum Decomposition',
        description: 'See how any vector in ℝ² can be uniquely written as u+w when U⊕W=ℝ². Drag the target vector to decompose it.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const u = viz.addDraggable('u', 2, 0.5, viz.colors.blue, 7, () => draw());
            const w = viz.addDraggable('w', 0.5, 2, viz.colors.orange, 7, () => draw());
            const target = viz.addDraggable('target', 3, 3, viz.colors.pink, 8, () => draw());

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '12px';
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Check if direct sum
                const det = u.x * w.y - u.y * w.x;

                if (Math.abs(det) > 0.01) {
                    // Solve: target = a*u + b*w
                    const a = (target.x * w.y - target.y * w.x) / det;
                    const b = (u.x * target.y - u.y * target.x) / det;

                    const uComponent = {x: a * u.x, y: a * u.y};
                    const wComponent = {x: b * w.x, y: b * w.y};

                    // Draw basis vectors
                    viz.drawVector(0, 0, u.x, u.y, viz.colors.blue, 'u', 2);
                    viz.drawVector(0, 0, w.x, w.y, viz.colors.orange, 'w', 2);

                    // Draw decomposition
                    viz.drawVector(0, 0, uComponent.x, uComponent.y, viz.colors.blue, `${a.toFixed(2)}u`, 3);
                    viz.drawVector(uComponent.x, uComponent.y,
                        uComponent.x + wComponent.x, uComponent.y + wComponent.y,
                        viz.colors.orange, `${b.toFixed(2)}w`, 3);

                    // Draw parallelogram
                    viz.drawSegment(0, 0, uComponent.x, uComponent.y, viz.colors.blue + '66', 2, true);
                    viz.drawSegment(0, 0, wComponent.x, wComponent.y, viz.colors.orange + '66', 2, true);
                    viz.drawSegment(uComponent.x, uComponent.y, target.x, target.y,
                        viz.colors.orange + '66', 2, true);
                    viz.drawSegment(wComponent.x, wComponent.y, target.x, target.y,
                        viz.colors.blue + '66', 2, true);

                    infoDiv.innerHTML = `<span style="color: ${viz.colors.green}">● Unique Decomposition</span><br>` +
                        `v = ${a.toFixed(2)}u + ${b.toFixed(2)}w<br>` +
                        `where v ∈ U ⊕ W = ℝ²<br>` +
                        `This shows U ∩ W = {0}`;
                } else {
                    viz.drawVector(0, 0, u.x, u.y, viz.colors.blue, 'u', 2);
                    viz.drawVector(0, 0, w.x, w.y, viz.colors.orange, 'w', 2);

                    infoDiv.innerHTML = `<span style="color: ${viz.colors.red}">● Not a Direct Sum</span><br>` +
                        `u and w are collinear<br>` +
                        `Cannot decompose uniquely`;
                }

                viz.drawPoint(target.x, target.y, viz.colors.pink, 'v', 8);
                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    }
];

// Section 7: Coordinates and the Row Space
window.EXTRA_VIZ['ch01']['ch01-sec07'] = [
    {
        id: 'ch01-extra-viz-5',
        title: 'Interactive: Basis Change Animation',
        description: 'Watch a vector\'s coordinates change as the basis transforms from standard to a custom basis. The vector stays fixed!',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const b1 = viz.addDraggable('b1', 2, 0.5, viz.colors.blue, 8, () => draw());
            const b2 = viz.addDraggable('b2', 0.5, 2.5, viz.colors.orange, 8, () => draw());

            let animating = false;
            let t = 0;

            const v = {x: 3, y: 2}; // Fixed vector

            const animateBtn = VizEngine.createButton(controls, 'Animate Basis Change', () => {
                animating = !animating;
                animateBtn.textContent = animating ? 'Stop Animation' : 'Animate Basis Change';
                if (animating) {
                    viz.animate(frame);
                }
            });

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '12px';
            controls.appendChild(infoDiv);

            function frame(timestamp) {
                if (!animating) return;
                t += 0.01;
                draw();
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Interpolate between standard basis and custom basis
                const s = (Math.sin(t) + 1) / 2; // oscillate between 0 and 1
                const e1x = 1 * (1 - s) + b1.x * s;
                const e1y = 0 * (1 - s) + b1.y * s;
                const e2x = 0 * (1 - s) + b2.x * s;
                const e2y = 1 * (1 - s) + b2.y * s;

                const det = e1x * e2y - e1y * e2x;

                if (Math.abs(det) > 0.01) {
                    // Compute coordinates in current basis
                    const alpha = (v.x * e2y - v.y * e2x) / det;
                    const beta = (e1x * v.y - e1y * v.x) / det;

                    // Draw current basis vectors
                    viz.drawVector(0, 0, e1x, e1y, viz.colors.blue, 'e₁', 3);
                    viz.drawVector(0, 0, e2x, e2y, viz.colors.orange, 'e₂', 3);

                    // Draw parallelogram grid
                    for (let i = -5; i <= 5; i++) {
                        viz.drawSegment(i * e1x - 5 * e2x, i * e1y - 5 * e2y,
                            i * e1x + 5 * e2x, i * e1y + 5 * e2y,
                            viz.colors.text + '33', 1);
                        viz.drawSegment(i * e2x - 5 * e1x, i * e2y - 5 * e1y,
                            i * e2x + 5 * e1x, i * e2y + 5 * e1y,
                            viz.colors.text + '33', 1);
                    }

                    // Draw the fixed vector
                    viz.drawVector(0, 0, v.x, v.y, viz.colors.pink, 'v', 4);

                    // Draw decomposition in current basis
                    viz.drawVector(0, 0, alpha * e1x, alpha * e1y, viz.colors.blue + '88', null, 2);
                    viz.drawVector(alpha * e1x, alpha * e1y, v.x, v.y, viz.colors.orange + '88', null, 2);

                    const basisType = s < 0.1 ? 'Standard Basis' : (s > 0.9 ? 'Custom Basis' : 'Intermediate');
                    infoDiv.innerHTML = `<span style="color: ${viz.colors.green}">Current Basis: ${basisType}</span><br>` +
                        `v = ${alpha.toFixed(2)}e₁ + ${beta.toFixed(2)}e₂<br>` +
                        `[v]ᴮ = (${alpha.toFixed(2)}, ${beta.toFixed(2)})ᵀ<br>` +
                        `<em>The vector v = (${v.x}, ${v.y}) stays fixed!</em>`;
                } else {
                    viz.drawVector(0, 0, v.x, v.y, viz.colors.pink, 'v', 4);
                    infoDiv.innerHTML = `<span style="color: ${viz.colors.red}">Basis vectors are dependent!</span>`;
                }

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    },
    {
        id: 'ch01-extra-viz-7',
        title: 'Interactive: Coordinate Matrix Explorer',
        description: 'See how the coordinate matrix [v]ᴮ changes when you drag the vector v or change the basis B = {b₁, b₂}.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const b1 = viz.addDraggable('b1', 2, 0.5, viz.colors.blue, 8, () => draw());
            const b2 = viz.addDraggable('b2', 0.5, 2, viz.colors.orange, 8, () => draw());
            const v = viz.addDraggable('v', 3, 3, viz.colors.pink, 9, () => draw());

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '13px';
            infoDiv.style.whiteSpace = 'pre';
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const det = b1.x * b2.y - b1.y * b2.x;

                if (Math.abs(det) > 0.01) {
                    // Compute coordinates [v]ᴮ
                    const alpha = (v.x * b2.y - v.y * b2.x) / det;
                    const beta = (b1.x * v.y - b1.y * v.x) / det;

                    // Draw basis vectors
                    viz.drawVector(0, 0, b1.x, b1.y, viz.colors.blue, 'b₁', 3);
                    viz.drawVector(0, 0, b2.x, b2.y, viz.colors.orange, 'b₂', 3);

                    // Draw parallelogram grid for basis
                    for (let i = -6; i <= 6; i++) {
                        if (i !== 0) {
                            viz.drawSegment(i * b1.x - 10 * b2.x, i * b1.y - 10 * b2.y,
                                i * b1.x + 10 * b2.x, i * b1.y + 10 * b2.y,
                                viz.colors.text + '22', 1, true);
                            viz.drawSegment(i * b2.x - 10 * b1.x, i * b2.y - 10 * b1.y,
                                i * b2.x + 10 * b1.x, i * b2.y + 10 * b1.y,
                                viz.colors.text + '22', 1, true);
                        }
                    }

                    // Draw decomposition
                    viz.drawVector(0, 0, alpha * b1.x, alpha * b1.y, viz.colors.blue + '99', `${alpha.toFixed(2)}b₁`, 2);
                    viz.drawVector(alpha * b1.x, alpha * b1.y, v.x, v.y, viz.colors.orange + '99', `${beta.toFixed(2)}b₂`, 2);

                    // Draw v
                    viz.drawVector(0, 0, v.x, v.y, viz.colors.pink, 'v', 4);

                    infoDiv.innerHTML = `Basis B = {b₁, b₂}:\n` +
                        `  b₁ = (${b1.x.toFixed(2)}, ${b1.y.toFixed(2)})\n` +
                        `  b₂ = (${b2.x.toFixed(2)}, ${b2.y.toFixed(2)})\n\n` +
                        `Vector v in standard coords:\n` +
                        `  v = (${v.x.toFixed(2)}, ${v.y.toFixed(2)})\n\n` +
                        `Coordinate matrix [v]ᴮ:\n` +
                        `       ⎡${alpha.toFixed(2).padStart(6)}⎤\n` +
                        `  [v]ᴮ = ⎢${' '.repeat(6)}⎥\n` +
                        `       ⎣${beta.toFixed(2).padStart(6)}⎦\n\n` +
                        `Decomposition:\n` +
                        `  v = ${alpha.toFixed(2)}b₁ + ${beta.toFixed(2)}b₂`;
                } else {
                    viz.drawVector(0, 0, b1.x, b1.y, viz.colors.blue, 'b₁', 3);
                    viz.drawVector(0, 0, b2.x, b2.y, viz.colors.orange, 'b₂', 3);
                    viz.drawVector(0, 0, v.x, v.y, viz.colors.pink, 'v', 4);

                    infoDiv.innerHTML = `ERROR: b₁ and b₂ are not\nlinearly independent!\n\n` +
                        `They cannot form a basis.\n` +
                        `Make them non-collinear.`;
                }

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    }
];

console.log('Chapter 1 Extra Visualizations Loaded: 8 interactive visualizations across 6 sections');
