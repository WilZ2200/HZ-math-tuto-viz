// Chapter 7: The Structure of a Linear Operator - EXTRA Interactive Visualizations
// For Advanced Linear Algebra Web App

window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch07'] = window.EXTRA_VIZ['ch07'] || {};

// Section 1: Primary Cyclic Decomposition Visualizations
window.EXTRA_VIZ['ch07']['ch07-sec01'] = [
    {
        id: 'ch07-extra-viz-1',
        title: 'Interactive: Invariant Subspace Under Repeated Application',
        description: 'Visualize how a linear operator T repeatedly acts on a vector, showing the T-cyclic subspace generated. Drag the initial vector and adjust the matrix to see how the orbit stabilizes in an invariant subspace.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 35});

            // Default: rotation + scaling matrix
            let matrix = [[0.8, -0.6], [0.6, 0.8]];
            let maxIterations = 8;
            let showSpan = true;

            const v0 = viz.addDraggable('v0', 3, 2, viz.colors.blue, 8, () => draw());

            // Matrix controls
            const a11Slider = VizEngine.createSlider(controls, 'a₁₁', -2, 2, 0.8, 0.1, (val) => {
                matrix[0][0] = val;
                draw();
            });
            const a12Slider = VizEngine.createSlider(controls, 'a₁₂', -2, 2, -0.6, 0.1, (val) => {
                matrix[0][1] = val;
                draw();
            });
            const a21Slider = VizEngine.createSlider(controls, 'a₂₁', -2, 2, 0.6, 0.1, (val) => {
                matrix[1][0] = val;
                draw();
            });
            const a22Slider = VizEngine.createSlider(controls, 'a₂₂', -2, 2, 0.8, 0.1, (val) => {
                matrix[1][1] = val;
                draw();
            });

            const iterSlider = VizEngine.createSlider(controls, 'Iterations', 1, 15, 8, 1, (val) => {
                maxIterations = val;
                draw();
            });

            VizEngine.createButton(controls, 'Toggle Span', () => {
                showSpan = !showSpan;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Compute orbit: v₀, Tv₀, T²v₀, ...
                const orbit = [];
                let current = [v0.x, v0.y];
                orbit.push([...current]);

                for (let i = 1; i < maxIterations; i++) {
                    current = VizEngine.matVec(matrix, current);
                    orbit.push([...current]);

                    // Stop if diverging too far
                    if (Math.abs(current[0]) > 20 || Math.abs(current[1]) > 20) break;
                }

                // Draw span of orbit vectors if enabled
                if (showSpan && orbit.length >= 2) {
                    // Draw parallelogram tiling for 2D span
                    for (let a = -3; a <= 3; a++) {
                        for (let b = -3; b <= 3; b++) {
                            const x = a * orbit[0][0] + b * orbit[1][0];
                            const y = a * orbit[0][1] + b * orbit[1][1];
                            if (Math.abs(x) < 15 && Math.abs(y) < 15) {
                                viz.drawPoint(x, y, viz.colors.teal + '22', null, 2);
                            }
                        }
                    }
                }

                // Draw orbit vectors
                const colors = [viz.colors.blue, viz.colors.orange, viz.colors.green,
                               viz.colors.purple, viz.colors.pink, viz.colors.yellow];

                for (let i = 0; i < orbit.length; i++) {
                    const [x, y] = orbit[i];
                    const color = colors[i % colors.length];
                    const label = i === 0 ? 'v' : `T${i > 1 ? '^' + i : ''}v`;
                    viz.drawVector(0, 0, x, y, color, label, 2);
                }

                // Draw trajectory path
                for (let i = 0; i < orbit.length - 1; i++) {
                    viz.drawSegment(orbit[i][0], orbit[i][1],
                                   orbit[i+1][0], orbit[i+1][1],
                                   viz.colors.text + '44', 1, true);
                }

                // Info text
                viz.drawText(`Orbit size: ${orbit.length}`, -7.5, 5.5, viz.colors.text, 14);
                viz.drawText(`T-cyclic subspace: span{v, Tv, T²v, ...}`, -7.5, 5, viz.colors.text, 12);

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch07-extra-viz-2',
        title: 'Interactive: Minimal Polynomial Root Finder',
        description: 'Visualize the characteristic and minimal polynomials of a 2×2 matrix. Adjust matrix entries to see how the polynomials change and find their roots graphically.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

            let matrix = [[1.5, 0.5], [0.5, 1]];

            const a11Slider = VizEngine.createSlider(controls, 'a₁₁', -2, 2, 1.5, 0.1, (val) => {
                matrix[0][0] = val;
                draw();
            });
            const a12Slider = VizEngine.createSlider(controls, 'a₁₂', -2, 2, 0.5, 0.1, (val) => {
                matrix[0][1] = val;
                draw();
            });
            const a21Slider = VizEngine.createSlider(controls, 'a₂₁', -2, 2, 0.5, 0.1, (val) => {
                matrix[1][0] = val;
                draw();
            });
            const a22Slider = VizEngine.createSlider(controls, 'a₂₂', -2, 2, 1, 0.1, (val) => {
                matrix[1][1] = val;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid(0.5);
                viz.drawAxes();

                // Compute characteristic polynomial: det(λI - A) = λ² - tr(A)λ + det(A)
                const trace = matrix[0][0] + matrix[1][1];
                const det = VizEngine.det2(matrix);

                // Characteristic polynomial: λ² - trace·λ + det
                // Roots: λ = (trace ± √(trace² - 4·det)) / 2
                const discriminant = trace * trace - 4 * det;

                let eigenvalues = [];
                if (discriminant >= 0) {
                    const lambda1 = (trace + Math.sqrt(discriminant)) / 2;
                    const lambda2 = (trace - Math.sqrt(discriminant)) / 2;
                    eigenvalues = [lambda1, lambda2];
                } else {
                    // Complex eigenvalues - show real part only
                    const realPart = trace / 2;
                    const imagPart = Math.sqrt(-discriminant) / 2;
                    eigenvalues = [realPart]; // Mark complex case
                }

                // Plot characteristic polynomial
                for (let x = -4; x <= 4; x += 0.05) {
                    const y = x * x - trace * x + det;
                    if (Math.abs(y) < 7) {
                        viz.drawPoint(x, y, viz.colors.orange + '88', null, 2);
                    }
                }

                // Draw roots as eigenvalues on x-axis
                if (discriminant >= 0) {
                    eigenvalues.forEach((lambda, i) => {
                        viz.drawPoint(lambda, 0, viz.colors.blue, `λ${i+1}`, 6);
                        viz.drawSegment(lambda, -6, lambda, 6, viz.colors.blue + '44', 1, true);
                    });
                } else {
                    // Complex eigenvalues
                    const realPart = eigenvalues[0];
                    viz.drawPoint(realPart, 0, viz.colors.red, 'Re(λ)', 6);
                    viz.drawText('Complex eigenvalues!', realPart + 0.3, 0.5, viz.colors.red, 12);
                }

                // Info panel
                viz.drawText(`χ(λ) = λ² - ${trace.toFixed(2)}λ + ${det.toFixed(2)}`, -6.5, 6, viz.colors.text, 12);
                if (discriminant >= 0) {
                    viz.drawText(`λ₁ = ${eigenvalues[0].toFixed(3)}`, -6.5, 5.5, viz.colors.blue, 12);
                    viz.drawText(`λ₂ = ${eigenvalues[1].toFixed(3)}`, -6.5, 5, viz.colors.blue, 12);

                    // Minimal polynomial check
                    if (Math.abs(eigenvalues[0] - eigenvalues[1]) < 0.01) {
                        viz.drawText(`m(λ) = (λ - ${eigenvalues[0].toFixed(2)})`, -6.5, 4.5, viz.colors.green, 12);
                    } else {
                        viz.drawText(`m(λ) = (λ - λ₁)(λ - λ₂)`, -6.5, 4.5, viz.colors.green, 12);
                    }
                } else {
                    const realPart = trace / 2;
                    const imagPart = Math.sqrt(-discriminant) / 2;
                    viz.drawText(`λ = ${realPart.toFixed(2)} ± ${imagPart.toFixed(2)}i`, -6.5, 5.5, viz.colors.red, 12);
                    viz.drawText(`m(λ) = χ(λ)`, -6.5, 5, viz.colors.green, 12);
                }

                viz.drawText('Orange: χ(λ)', -6.5, -5.5, viz.colors.orange, 11);
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch07-extra-viz-3',
        title: 'Interactive: Primary Decomposition into Generalized Eigenspaces',
        description: 'Visualize the primary decomposition V = V₁ ⊕ V₂ where Vᵢ are generalized eigenspaces. Watch how vectors decompose into components from different primary submodules.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Use a matrix with two distinct eigenvalues for clear separation
            // A = [[2, 0], [0, -1]] has eigenvalues 2 and -1
            let lambda1 = 2;
            let lambda2 = -1;

            const v = viz.addDraggable('v', 2, 1.5, viz.colors.white, 8, () => draw());

            VizEngine.createSlider(controls, 'λ₁', -3, 3, 2, 0.2, (val) => {
                lambda1 = val;
                draw();
            });

            VizEngine.createSlider(controls, 'λ₂', -3, 3, -1, 0.2, (val) => {
                lambda2 = val;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Matrix A = diag(λ₁, λ₂) for simplicity
                const matrix = [[lambda1, 0], [0, lambda2]];

                // Generalized eigenspaces are just eigenspaces for diagonal matrix
                // V₁ = span{e₁} (x-axis), V₂ = span{e₂} (y-axis)

                // Draw primary subspaces
                for (let t = -8; t <= 8; t += 0.1) {
                    viz.drawPoint(t, 0, viz.colors.blue + '22', null, 2);
                    viz.drawPoint(0, t, viz.colors.orange + '22', null, 2);
                }

                viz.drawVector(0, 0, 3, 0, viz.colors.blue, 'V₁', 3);
                viz.drawVector(0, 0, 0, 3, viz.colors.orange, 'V₂', 3);

                // Decompose v into primary components
                const v1_component = [v.x, 0]; // Component in V₁
                const v2_component = [0, v.y]; // Component in V₂

                // Draw decomposition
                viz.drawVector(0, 0, v.x, v.y, viz.colors.white, 'v', 3);
                viz.drawVector(0, 0, v1_component[0], v1_component[1], viz.colors.blue, 'v₁', 2);
                viz.drawVector(0, 0, v2_component[0], v2_component[1], viz.colors.orange, 'v₂', 2);

                // Draw projection lines
                viz.drawSegment(v.x, v.y, v.x, 0, viz.colors.blue + '66', 1, true);
                viz.drawSegment(v.x, v.y, 0, v.y, viz.colors.orange + '66', 1, true);

                // Apply T to each component
                const Tv1 = [lambda1 * v1_component[0], lambda1 * v1_component[1]];
                const Tv2 = [lambda2 * v2_component[0], lambda2 * v2_component[1]];

                if (VizEngine.vecLen(Tv1) > 0.1) {
                    viz.drawVector(0, 0, Tv1[0], Tv1[1], viz.colors.blue + '99', 'Tv₁', 1.5);
                }
                if (VizEngine.vecLen(Tv2) > 0.1) {
                    viz.drawVector(0, 0, Tv2[0], Tv2[1], viz.colors.orange + '99', 'Tv₂', 1.5);
                }

                // Info
                viz.drawText('Primary Decomposition: V = V₁ ⊕ V₂', -6.5, 6, viz.colors.text, 13);
                viz.drawText(`V₁: eigenspace for λ₁ = ${lambda1.toFixed(1)}`, -6.5, 5.5, viz.colors.blue, 11);
                viz.drawText(`V₂: eigenspace for λ₂ = ${lambda2.toFixed(1)}`, -6.5, 5, viz.colors.orange, 11);
                viz.drawText(`v = v₁ + v₂`, -6.5, 4.3, viz.colors.white, 11);

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch07-extra-viz-4',
        title: 'Interactive: Jordan Block Action Animation',
        description: 'Animate how a Jordan block matrix acts on vectors. See the characteristic "shearing" behavior where vectors rotate and scale while also being pushed along the generalized eigenvector direction.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            let eigenvalue = 0.9;
            let time = 0;
            let animating = false;
            let showBasis = true;

            // Jordan block J = [[λ, 1], [0, λ]]
            function getJordanMatrix() {
                return [[eigenvalue, 1], [0, eigenvalue]];
            }

            VizEngine.createSlider(controls, 'Eigenvalue λ', -1.5, 1.5, 0.9, 0.1, (val) => {
                eigenvalue = val;
                if (!animating) draw();
            });

            VizEngine.createButton(controls, 'Animate', () => {
                animating = !animating;
                if (animating) {
                    viz.animate((timestamp) => {
                        if (!animating) return;
                        time += 0.02;
                        draw();
                    });
                } else {
                    viz.stopAnimation();
                }
            });

            VizEngine.createButton(controls, 'Toggle Basis', () => {
                showBasis = !showBasis;
                draw();
            });

            VizEngine.createButton(controls, 'Reset', () => {
                time = 0;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const J = getJordanMatrix();

                // Show Jordan block basis vectors
                if (showBasis) {
                    viz.drawVector(0, 0, 2, 0, viz.colors.blue, 'e₁ (eigenvector)', 2);
                    viz.drawVector(0, 0, 0, 2, viz.colors.orange, 'e₂ (gen. eigenvector)', 2);
                }

                // Sample vectors on a circle
                const numVectors = 12;
                const radius = 2;

                for (let i = 0; i < numVectors; i++) {
                    const angle = (i / numVectors) * 2 * Math.PI;
                    let v = [radius * Math.cos(angle), radius * Math.sin(angle)];

                    // Apply J^n where n depends on time
                    const n = Math.floor(time);
                    for (let k = 0; k < n; k++) {
                        v = VizEngine.matVec(J, v);
                    }

                    // Partial application for smooth animation
                    const fraction = time - n;
                    if (fraction > 0) {
                        const vnext = VizEngine.matVec(J, v);
                        v = [
                            v[0] + fraction * (vnext[0] - v[0]),
                            v[1] + fraction * (vnext[1] - v[1])
                        ];
                    }

                    // Draw if not too large
                    if (VizEngine.vecLen(v) < 15) {
                        const color = `hsl(${i * 30}, 70%, 60%)`;
                        viz.drawVector(0, 0, v[0], v[1], color, '', 1.5);
                        viz.drawPoint(v[0], v[1], color, null, 4);
                    }
                }

                // Draw effect of Jordan block
                viz.drawText(`Jordan Block J = [λ 1; 0 λ], λ = ${eigenvalue.toFixed(1)}`, -6.5, 6, viz.colors.text, 12);
                viz.drawText(`Iterations: ${time.toFixed(1)}`, -6.5, 5.5, viz.colors.text, 12);
                viz.drawText('J acts: scales by λ + shears along e₁', -6.5, 5, viz.colors.text, 11);
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch07-extra-viz-5',
        title: 'Interactive: Nilpotent Operator Visualization',
        description: 'Explore nilpotent operators where Tⁿ = 0. Watch how repeated application drives all vectors toward zero, visualizing the nilpotency index.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 45});

            // Nilpotent matrix: N = [[0, 1, 0], [0, 0, 1], [0, 0, 0]] (3×3)
            // For 2D visualization, use N = [[0, 1], [0, 0]] with nilpotency index 2
            const nilpotentMatrix = [[0, 1], [0, 0]];

            let iteration = 0;
            let maxIter = 3;

            const v = viz.addDraggable('v', 2, 3, viz.colors.blue, 8, () => draw());

            VizEngine.createSlider(controls, 'Show iteration', 0, 3, 0, 1, (val) => {
                iteration = val;
                draw();
            });

            VizEngine.createButton(controls, 'Step Forward', () => {
                iteration = Math.min(iteration + 1, maxIter);
                draw();
            });

            VizEngine.createButton(controls, 'Reset', () => {
                iteration = 0;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Show kernel and image
                // ker(N) = span{e₁} (x-axis)
                // im(N) = span{e₁} (x-axis)

                for (let t = -8; t <= 8; t += 0.1) {
                    viz.drawPoint(t, 0, viz.colors.yellow + '22', null, 2);
                }
                viz.drawText('ker(N) = im(N)', 3, 0.5, viz.colors.yellow, 11);

                // Compute orbit of v
                const orbit = [];
                let current = [v.x, v.y];
                orbit.push([...current]);

                for (let i = 1; i <= maxIter; i++) {
                    current = VizEngine.matVec(nilpotentMatrix, current);
                    orbit.push([...current]);
                }

                // Draw all vectors in orbit
                const colors = [viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.red];
                for (let i = 0; i <= iteration && i < orbit.length; i++) {
                    const [x, y] = orbit[i];
                    const label = i === 0 ? 'v' : `N${i > 1 ? '^' + i : ''}v`;
                    viz.drawVector(0, 0, x, y, colors[i % colors.length], label, 3);
                }

                // Draw trajectory
                for (let i = 0; i < Math.min(iteration, orbit.length - 1); i++) {
                    viz.drawSegment(orbit[i][0], orbit[i][1],
                                   orbit[i+1][0], orbit[i+1][1],
                                   viz.colors.text + '66', 1.5, true);
                }

                // Info
                viz.drawText('Nilpotent Matrix: N = [0 1; 0 0]', -6.5, 6, viz.colors.text, 13);
                viz.drawText('N² = 0 (nilpotency index = 2)', -6.5, 5.5, viz.colors.text, 12);
                viz.drawText(`Current: N^${iteration}v`, -6.5, 5, viz.colors.text, 12);

                if (orbit[iteration]) {
                    const len = VizEngine.vecLen(orbit[iteration]);
                    viz.drawText(`||N^${iteration}v|| = ${len.toFixed(3)}`, -6.5, 4.5, viz.colors.text, 11);
                }

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch07-extra-viz-6',
        title: 'Interactive: Cyclic Subspace Generator',
        description: 'Generate T-cyclic subspaces by choosing a vector v and watching how {v, Tv, T²v, ...} spans a subspace. Visualize when the space becomes cyclic versus when it decomposes.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Start with a rotation matrix
            let angle = Math.PI / 6; // 30 degrees
            let scale = 0.95;

            const v = viz.addDraggable('v', 3, 1, viz.colors.blue, 8, () => draw());

            VizEngine.createSlider(controls, 'Rotation (deg)', 0, 180, 30, 5, (val) => {
                angle = val * Math.PI / 180;
                draw();
            });

            VizEngine.createSlider(controls, 'Scale factor', 0.5, 1.5, 0.95, 0.05, (val) => {
                scale = val;
                draw();
            });

            let showCyclicBasis = true;
            VizEngine.createButton(controls, 'Toggle Basis', () => {
                showCyclicBasis = !showCyclicBasis;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const cos = Math.cos(angle);
                const sin = Math.sin(angle);
                const matrix = [
                    [scale * cos, -scale * sin],
                    [scale * sin, scale * cos]
                ];

                // Generate cyclic sequence
                const cyclicVectors = [];
                let current = [v.x, v.y];
                const maxVectors = 15;

                for (let i = 0; i < maxVectors; i++) {
                    cyclicVectors.push([...current]);
                    const next = VizEngine.matVec(matrix, current);

                    // Check if we're getting too small or too large
                    const len = VizEngine.vecLen(next);
                    if (len < 0.01 || len > 15) break;

                    // Check for approximate linear dependence (cyclic condition)
                    if (i >= 2) {
                        // Simple check: if next is very close to v, we have cyclicity
                        const diff = Math.sqrt(
                            (next[0] - v.x) ** 2 + (next[1] - v.y) ** 2
                        );
                        if (diff < 0.1) break;
                    }

                    current = next;
                }

                // Draw the cyclic vectors
                const colors = [
                    viz.colors.blue, viz.colors.orange, viz.colors.green,
                    viz.colors.purple, viz.colors.pink, viz.colors.yellow,
                    viz.colors.teal
                ];

                for (let i = 0; i < cyclicVectors.length; i++) {
                    const [x, y] = cyclicVectors[i];
                    const color = colors[i % colors.length];
                    const label = i === 0 ? 'v' : `T${i > 1 ? '^' + i : ''}v`;

                    viz.drawVector(0, 0, x, y, color, showCyclicBasis ? label : '', 2);
                }

                // Draw spiral path
                for (let i = 0; i < cyclicVectors.length - 1; i++) {
                    viz.drawSegment(
                        cyclicVectors[i][0], cyclicVectors[i][1],
                        cyclicVectors[i+1][0], cyclicVectors[i+1][1],
                        viz.colors.text + '44', 1, true
                    );
                }

                // Try to find dimension of span
                let dim = Math.min(2, cyclicVectors.length);
                if (cyclicVectors.length >= 2) {
                    // Check if v and Tv are linearly independent
                    const det = cyclicVectors[0][0] * cyclicVectors[1][1] -
                               cyclicVectors[0][1] * cyclicVectors[1][0];
                    if (Math.abs(det) < 0.01) dim = 1;
                }

                // Info
                viz.drawText('T-Cyclic Subspace: span{v, Tv, T²v, ...}', -6.5, 6, viz.colors.text, 13);
                viz.drawText(`Generated ${cyclicVectors.length} vectors`, -6.5, 5.5, viz.colors.text, 11);
                viz.drawText(`Dimension of span: ${dim}`, -6.5, 5, viz.colors.text, 11);

                if (dim === 2 && cyclicVectors.length >= 2) {
                    viz.drawText('Space is T-cyclic!', -6.5, 4.5, viz.colors.green, 12);
                } else if (dim === 1) {
                    viz.drawText('v is an eigenvector', -6.5, 4.5, viz.colors.yellow, 12);
                }

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch07-extra-viz-7',
        title: 'Interactive: Companion Matrix Structure Explorer',
        description: 'Explore companion matrices C(p) for polynomials p(x). See how the characteristic polynomial of C(p) equals p(x), visualizing the connection between matrix structure and polynomials.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 450, scale: 1});

            // Polynomial coefficients for p(x) = x² + a₁x + a₀
            let a0 = -2; // constant term
            let a1 = -1; // linear coefficient

            VizEngine.createSlider(controls, 'a₀ (constant)', -3, 3, -2, 0.2, (val) => {
                a0 = val;
                draw();
            });

            VizEngine.createSlider(controls, 'a₁ (linear)', -3, 3, -1, 0.2, (val) => {
                a1 = val;
                draw();
            });

            function draw() {
                viz.clear();

                // Companion matrix for p(x) = x² + a₁x + a₀ is:
                // C(p) = [[0, -a₀],
                //         [1, -a₁]]
                const companion = [[0, -a0], [1, -a1]];

                // Draw matrix representation
                const matrixX = 100;
                const matrixY = 150;
                const cellSize = 80;

                // Draw matrix brackets
                viz.ctx.strokeStyle = viz.colors.text;
                viz.ctx.lineWidth = 2;
                viz.ctx.beginPath();
                viz.ctx.moveTo(matrixX - 10, matrixY - 10);
                viz.ctx.lineTo(matrixX - 20, matrixY - 10);
                viz.ctx.lineTo(matrixX - 20, matrixY + 2 * cellSize + 10);
                viz.ctx.lineTo(matrixX - 10, matrixY + 2 * cellSize + 10);
                viz.ctx.stroke();

                viz.ctx.beginPath();
                viz.ctx.moveTo(matrixX + 2 * cellSize + 10, matrixY - 10);
                viz.ctx.lineTo(matrixX + 2 * cellSize + 20, matrixY - 10);
                viz.ctx.lineTo(matrixX + 2 * cellSize + 20, matrixY + 2 * cellSize + 10);
                viz.ctx.lineTo(matrixX + 2 * cellSize + 10, matrixY + 2 * cellSize + 10);
                viz.ctx.stroke();

                // Draw matrix entries
                for (let i = 0; i < 2; i++) {
                    for (let j = 0; j < 2; j++) {
                        const x = matrixX + j * cellSize + cellSize / 2;
                        const y = matrixY + i * cellSize + cellSize / 2;
                        const value = companion[i][j].toFixed(1);

                        viz.ctx.fillStyle = viz.colors.blue;
                        viz.ctx.font = '24px monospace';
                        viz.ctx.textAlign = 'center';
                        viz.ctx.textBaseline = 'middle';
                        viz.ctx.fillText(value, x, y);
                    }
                }

                // Label
                viz.ctx.fillStyle = viz.colors.text;
                viz.ctx.font = '20px serif';
                viz.ctx.fillText('C(p) =', matrixX - 80, matrixY + cellSize);

                // Draw polynomial
                viz.ctx.font = '18px serif';
                viz.ctx.fillStyle = viz.colors.orange;
                const polyText = `p(x) = x² + (${a1.toFixed(1)})x + (${a0.toFixed(1)})`;
                viz.ctx.fillText(polyText, 50, 60);

                // Compute and show eigenvalues
                const trace = companion[0][0] + companion[1][1];
                const det = VizEngine.det2(companion);
                const discriminant = trace * trace - 4 * det;

                viz.ctx.fillStyle = viz.colors.green;
                viz.ctx.font = '16px serif';
                viz.ctx.fillText('Characteristic polynomial χ(λ) = p(λ)', 50, 90);

                if (discriminant >= 0) {
                    const lambda1 = (trace + Math.sqrt(discriminant)) / 2;
                    const lambda2 = (trace - Math.sqrt(discriminant)) / 2;
                    viz.ctx.fillText(`Eigenvalues: λ₁ = ${lambda1.toFixed(2)}, λ₂ = ${lambda2.toFixed(2)}`, 50, 115);
                } else {
                    const realPart = trace / 2;
                    const imagPart = Math.sqrt(-discriminant) / 2;
                    viz.ctx.fillText(`Eigenvalues: ${realPart.toFixed(2)} ± ${imagPart.toFixed(2)}i (complex)`, 50, 115);
                }

                // Key property box
                viz.ctx.strokeStyle = viz.colors.purple;
                viz.ctx.lineWidth = 2;
                viz.ctx.strokeRect(50, 320, 460, 100);

                viz.ctx.fillStyle = viz.colors.purple;
                viz.ctx.font = 'bold 16px sans-serif';
                viz.ctx.fillText('Key Property:', 60, 345);

                viz.ctx.font = '14px sans-serif';
                viz.ctx.fillText('The companion matrix C(p) has characteristic polynomial equal to p(x)', 60, 370);
                viz.ctx.fillText('Thus: det(λI - C(p)) = p(λ)', 60, 390);
                viz.ctx.fillText('Companion matrices are nonderogatory: m_C(x) = χ_C(x) = p(x)', 60, 410);

                // Draw cyclic basis note
                viz.ctx.fillStyle = viz.colors.teal;
                viz.ctx.font = '14px sans-serif';
                viz.ctx.fillText('Cyclic basis: {e₁, Te₁} where Te₁ = e₂ and T²e₁ = -a₁e₂ - a₀e₁', 50, 300);
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch07-extra-viz-8',
        title: 'Interactive: Rational Canonical Form Builder',
        description: 'Build rational canonical forms by selecting elementary divisors. See how companion matrices are arranged on the block diagonal and understand the complete structure theorem.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 450, scale: 1});

            // Elementary divisors (simplified for 2D)
            // We'll use divisors like (x-λ), (x-λ)², etc.
            let divisors = [
                {lambda: 1, power: 1},
                {lambda: -1, power: 1}
            ];

            let selectedDivisor = 0;

            VizEngine.createButton(controls, 'Add (x-1)', () => {
                divisors.push({lambda: 1, power: 1});
                draw();
            });

            VizEngine.createButton(controls, 'Add (x+1)', () => {
                divisors.push({lambda: -1, power: 1});
                draw();
            });

            VizEngine.createButton(controls, 'Add (x-1)²', () => {
                divisors.push({lambda: 1, power: 2});
                draw();
            });

            VizEngine.createButton(controls, 'Clear', () => {
                divisors = [];
                draw();
            });

            function companionBlock(lambda, power) {
                // For (x - λ)^n, companion matrix is n×n Jordan-like
                // For power=1: [λ]
                // For power=2: [[0, -λ²], [1, 2λ]]
                if (power === 1) {
                    return [[lambda]];
                } else if (power === 2) {
                    return [[0, -lambda * lambda], [1, 2 * lambda]];
                }
                return [[lambda]]; // fallback
            }

            function draw() {
                viz.clear();

                viz.ctx.fillStyle = viz.colors.text;
                viz.ctx.font = '18px serif';
                viz.ctx.fillText('Rational Canonical Form (Elementary Divisor Version)', 50, 30);

                if (divisors.length === 0) {
                    viz.ctx.font = '14px sans-serif';
                    viz.ctx.fillText('Add elementary divisors to build the RCF matrix...', 50, 80);
                    viz.ctx.fillText('RCF = block-diag(C(p₁), C(p₂), ..., C(pₖ))', 50, 100);
                    return;
                }

                // Draw elementary divisors list
                viz.ctx.font = '14px monospace';
                viz.ctx.fillStyle = viz.colors.orange;
                viz.ctx.fillText('Elementary Divisors:', 50, 60);

                divisors.forEach((d, i) => {
                    const powerStr = d.power > 1 ? `^${d.power}` : '';
                    viz.ctx.fillText(`  ${i+1}. (x - ${d.lambda})${powerStr}`, 50, 80 + i * 20);
                });

                // Compute total dimension
                const totalDim = divisors.reduce((sum, d) => sum + d.power, 0);
                viz.ctx.fillStyle = viz.colors.green;
                viz.ctx.fillText(`Total dimension: ${totalDim}`, 50, 80 + divisors.length * 20 + 20);

                // Draw block diagonal structure
                const blockStartY = 150;
                const blockSize = 60;
                let currentX = 50;

                divisors.forEach((d, i) => {
                    const size = d.power;
                    const blockWidth = size * blockSize;
                    const blockHeight = size * blockSize;

                    // Draw block outline
                    viz.ctx.strokeStyle = viz.colors.blue;
                    viz.ctx.lineWidth = 2;
                    viz.ctx.strokeRect(currentX, blockStartY, blockWidth, blockHeight);

                    // Draw companion matrix entries (simplified)
                    const companion = companionBlock(d.lambda, d.power);
                    for (let row = 0; row < size; row++) {
                        for (let col = 0; col < size; col++) {
                            const x = currentX + col * blockSize + blockSize / 2;
                            const y = blockStartY + row * blockSize + blockSize / 2;

                            const val = companion[row] ? companion[row][col] : 0;
                            if (val !== undefined && val !== 0) {
                                viz.ctx.fillStyle = viz.colors.blue;
                                viz.ctx.font = '16px monospace';
                                viz.ctx.textAlign = 'center';
                                viz.ctx.textBaseline = 'middle';
                                viz.ctx.fillText(val.toFixed(1), x, y);
                            }
                        }
                    }

                    // Label
                    viz.ctx.fillStyle = viz.colors.text;
                    viz.ctx.font = '12px serif';
                    viz.ctx.textAlign = 'center';
                    const powerStr = d.power > 1 ? `^${d.power}` : '';
                    viz.ctx.fillText(`C((x-${d.lambda})${powerStr})`,
                                    currentX + blockWidth / 2,
                                    blockStartY + blockHeight + 15);

                    currentX += blockWidth + 20;
                });

                // Information box
                viz.ctx.strokeStyle = viz.colors.purple;
                viz.ctx.lineWidth = 2;
                viz.ctx.strokeRect(50, 350, 460, 80);

                viz.ctx.fillStyle = viz.colors.purple;
                viz.ctx.font = 'bold 14px sans-serif';
                viz.ctx.textAlign = 'left';
                viz.ctx.fillText('Structure Theorem:', 60, 370);

                viz.ctx.font = '12px sans-serif';
                viz.ctx.fillText('Every operator has a unique set of elementary divisors (up to order)', 60, 390);
                viz.ctx.fillText('RCF is block-diagonal with companion matrices C(pᵢ) on diagonal', 60, 405);
                viz.ctx.fillText('Elementary divisors form a complete invariant for similarity', 60, 420);
            }

            draw();
            return viz;
        }
    }
];
