// === Chapter 8: Eigenvalues and Eigenvectors - Extra Visualizations ===
window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch08'] = window.EXTRA_VIZ['ch08'] || {};

// Section 1: Eigenvalues and Eigenvectors
window.EXTRA_VIZ['ch08']['ch08-sec01'] = [
    {
        id: 'ch08-extra-viz-1',
        title: 'Interactive Eigenvector Explorer',
        description: 'Drag a vector to see how it transforms. Eigenvectors stay on their span line (shown in green). The matrix shown has eigenvalues λ₁=2, λ₂=0.5.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Matrix with clear eigenvalues: [[2, 0], [0, 0.5]]
            // Rotated to make it more interesting
            const angle = Math.PI / 6;
            const c = Math.cos(angle), s = Math.sin(angle);
            const D = [[2, 0], [0, 0.5]];
            const R = [[c, -s], [s, c]];
            const Rt = [[c, s], [-s, c]];
            const M = VizEngine.matMul(VizEngine.matMul(R, D), Rt);

            const evals = VizEngine.eigenvalues2(M);
            const ev1 = VizEngine.eigenvector2(M, evals[0]);
            const ev2 = VizEngine.eigenvector2(M, evals[1]);

            const v = viz.addDraggable('v', 1.5, 1, viz.colors.blue, 8, () => draw());

            let showEigenspaces = true;
            VizEngine.createButton(controls, 'Toggle Eigenspaces', () => {
                showEigenspaces = !showEigenspaces;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw eigenspaces
                if (showEigenspaces) {
                    viz.drawLine(0, 0, ev1[0], ev1[1], viz.colors.green + '66', 2, true);
                    viz.drawLine(0, 0, ev2[0], ev2[1], viz.colors.yellow + '66', 2, true);
                    viz.drawText('λ₁=' + evals[0].toFixed(2), ev1[0]*2.5, ev1[1]*2.5, viz.colors.green, 12);
                    viz.drawText('λ₂=' + evals[1].toFixed(2), ev2[0]*2.5, ev2[1]*2.5, viz.colors.yellow, 12);
                }

                // Original vector
                viz.drawVector(0, 0, v.x, v.y, viz.colors.blue, 'v');

                // Transformed vector
                const Tv = VizEngine.matVec(M, [v.x, v.y]);
                viz.drawVector(0, 0, Tv[0], Tv[1], viz.colors.orange, 'Tv');

                // Check if v is close to an eigenvector
                const projLen1 = Math.abs(VizEngine.dot([v.x, v.y], ev1));
                const projLen2 = Math.abs(VizEngine.dot([v.x, v.y], ev2));
                const vLen = VizEngine.vecLen([v.x, v.y]);

                if (vLen > 0.1) {
                    if (Math.abs(projLen1 - vLen) < 0.2) {
                        viz.drawText('v is an eigenvector!', 0, 4.5, viz.colors.green, 16);
                    } else if (Math.abs(projLen2 - vLen) < 0.2) {
                        viz.drawText('v is an eigenvector!', 0, 4.5, viz.colors.green, 16);
                    }
                }

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    }
];

// Section 2: Characteristic and Minimal Polynomials
window.EXTRA_VIZ['ch08']['ch08-sec02'] = [
    {
        id: 'ch08-extra-viz-2',
        title: 'Characteristic Polynomial Landscape',
        description: 'Explore how det(λI - A) changes with λ. Eigenvalues are the roots (where the graph crosses zero).',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 60});

            let a = 1, b = 0, c = 0, d = 2;

            VizEngine.createSlider(controls, 'a₁₁', -3, 3, a, 0.1, (v) => { a = v; draw(); });
            VizEngine.createSlider(controls, 'a₁₂', -3, 3, b, 0.1, (v) => { b = v; draw(); });
            VizEngine.createSlider(controls, 'a₂₁', -3, 3, c, 0.1, (v) => { c = v; draw(); });
            VizEngine.createSlider(controls, 'a₂₂', -3, 3, d, 0.1, (v) => { d = v; draw(); });

            function draw() {
                viz.clear();
                viz.drawGrid(1);
                viz.drawAxes();

                const M = [[a, b], [c, d]];
                const trace = a + d;
                const det = a * d - b * c;

                // Draw characteristic polynomial: det(λI - A) = λ² - tr(A)λ + det(A)
                const points = [];
                for (let lam = -4; lam <= 4; lam += 0.05) {
                    const p = lam * lam - trace * lam + det;
                    points.push([lam, Math.max(-6, Math.min(6, p))]);
                }

                viz.ctx.strokeStyle = viz.colors.blue;
                viz.ctx.lineWidth = 2;
                viz.ctx.beginPath();
                points.forEach((pt, i) => {
                    const [sx, sy] = viz.toScreen(pt[0], pt[1]);
                    if (i === 0) viz.ctx.moveTo(sx, sy);
                    else viz.ctx.lineTo(sx, sy);
                });
                viz.ctx.stroke();

                // Mark eigenvalues
                const evals = VizEngine.eigenvalues2(M);
                if (evals) {
                    evals.forEach((lam, i) => {
                        if (Math.abs(lam) < 6) {
                            viz.drawPoint(lam, 0, viz.colors.orange, null, 6);
                            viz.drawText('λ' + (i+1) + '=' + lam.toFixed(2), lam, -0.8, viz.colors.orange, 12);
                        }
                    });
                    viz.drawText('p(λ) = λ² - ' + trace.toFixed(2) + 'λ + ' + det.toFixed(2), 0, 5, viz.colors.text, 13);
                } else {
                    viz.drawText('Complex eigenvalues (no real roots)', 0, 5, viz.colors.red, 13);
                }
            }

            draw();
            return viz;
        }
    }
];

// Section 3: Diagonalizability
window.EXTRA_VIZ['ch08']['ch08-sec03'] = [
    {
        id: 'ch08-extra-viz-3',
        title: 'Diagonalization Animation',
        description: 'Watch how a diagonalizable matrix transforms vectors along its eigenbasis. Toggle animation to see the transformation in action.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Diagonalizable matrix with eigenvalues 2 and 0.5
            const M = [[1.5, 0.5], [0.5, 1.5]];
            const evals = VizEngine.eigenvalues2(M);
            const ev1 = VizEngine.eigenvector2(M, evals[0]);
            const ev2 = VizEngine.eigenvector2(M, evals[1]);

            let t = 0;
            let animating = false;

            const playBtn = VizEngine.createButton(controls, 'Play Animation', () => {
                animating = !animating;
                playBtn.textContent = animating ? 'Pause' : 'Play Animation';
                if (animating) animate();
            });

            function animate() {
                if (!animating) return;
                t += 0.01;
                draw();
                requestAnimationFrame(animate);
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw eigenspaces
                viz.drawLine(0, 0, ev1[0], ev1[1], viz.colors.green + '44', 2, true);
                viz.drawLine(0, 0, ev2[0], ev2[1], viz.colors.yellow + '44', 2, true);

                // Draw eigenvectors scaled by eigenvalues
                viz.drawVector(0, 0, ev1[0] * 1.5, ev1[1] * 1.5, viz.colors.green, 'e₁');
                viz.drawVector(0, 0, ev2[0] * 1.5, ev2[1] * 1.5, viz.colors.yellow, 'e₂');

                // Sample vector that rotates
                const angle = t;
                const vx = 2 * Math.cos(angle);
                const vy = 2 * Math.sin(angle);

                viz.drawVector(0, 0, vx, vy, viz.colors.blue + '88', 'v');

                // Transformed vector
                const Tv = VizEngine.matVec(M, [vx, vy]);
                viz.drawVector(0, 0, Tv[0], Tv[1], viz.colors.orange, 'Av');

                // Show decomposition
                const alpha = VizEngine.dot([vx, vy], ev1);
                const beta = VizEngine.dot([vx, vy], ev2);

                viz.drawText('v = ' + alpha.toFixed(2) + 'e₁ + ' + beta.toFixed(2) + 'e₂', 0, -4.5, viz.colors.text, 12);
                viz.drawText('Av = ' + (alpha * evals[0]).toFixed(2) + 'e₁ + ' + (beta * evals[1]).toFixed(2) + 'e₂', 0, -5.2, viz.colors.text, 12);
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch08-extra-viz-4',
        title: 'Shear Transformation: Non-Diagonalizable Example',
        description: 'A shear matrix has only one eigenvalue (1) with geometric multiplicity 1. Watch vectors transform - only horizontal vectors are eigenvectors.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            let shearFactor = 1;
            VizEngine.createSlider(controls, 'Shear', 0, 2, shearFactor, 0.1, (v) => {
                shearFactor = v;
                draw();
            });

            const v = viz.addDraggable('v', 2, 1, viz.colors.blue, 8, () => draw());

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const M = [[1, shearFactor], [0, 1]]; // Shear matrix

                // Draw the eigenspace (only x-axis)
                viz.drawLine(0, 0, 1, 0, viz.colors.green + '88', 2, true);
                viz.drawText('Eigenspace: λ=1 (geometric mult. = 1)', 0, 4.5, viz.colors.green, 13);

                // Draw unit square transformation
                const corners = [[0, 0], [1, 0], [1, 1], [0, 1]];
                const transformedCorners = corners.map(pt => VizEngine.matVec(M, pt));

                viz.drawPolygon(corners, viz.colors.blue + '22', viz.colors.blue + '66', 1.5);
                viz.drawPolygon(transformedCorners, viz.colors.orange + '22', viz.colors.orange, 2);

                // Draw original vector
                viz.drawVector(0, 0, v.x, v.y, viz.colors.blue, 'v');

                // Draw transformed vector
                const Tv = VizEngine.matVec(M, [v.x, v.y]);
                viz.drawVector(0, 0, Tv[0], Tv[1], viz.colors.orange, 'Av');

                // Check if it's an eigenvector
                if (Math.abs(v.y) < 0.1 && Math.abs(v.x) > 0.1) {
                    viz.drawText('v is an eigenvector! (λ=1)', 0, -4.5, viz.colors.green, 14);
                } else {
                    viz.drawText('Not an eigenvector - direction changed', 0, -4.5, viz.colors.red, 14);
                }
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch08-extra-viz-8',
        title: 'Geometric vs Algebraic Multiplicity',
        description: 'Compare matrices with different multiplicities. Adjust sliders to see when geometric multiplicity equals algebraic multiplicity (diagonalizable case).',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            let matrixType = 0; // 0: diagonal, 1: diagonalizable, 2: Jordan block
            const typeNames = ['Diagonal (diag.)', 'Diagonalizable', 'Jordan Block (non-diag.)'];

            const matrices = [
                [[2, 0], [0, 2]],           // Diagonal: geom = alg = 2
                [[2, 0.5], [0.5, 2]],       // Diagonalizable: geom = alg = 2
                [[2, 1], [0, 2]]            // Jordan: geom = 1, alg = 2
            ];

            const typeBtn = VizEngine.createButton(controls, 'Type: ' + typeNames[0], () => {
                matrixType = (matrixType + 1) % 3;
                typeBtn.textContent = 'Type: ' + typeNames[matrixType];
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const M = matrices[matrixType];
                const evals = VizEngine.eigenvalues2(M);

                // Find eigenspaces dimension
                let geomMult = 0;
                if (evals) {
                    const ev1 = VizEngine.eigenvector2(M, evals[0]);
                    const ev2 = VizEngine.eigenvector2(M, evals[1]);

                    // Check if they're independent
                    const cross = ev1[0] * ev2[1] - ev1[1] * ev2[0];

                    if (Math.abs(cross) > 0.01) {
                        geomMult = 2;
                        // Draw both eigenspaces
                        viz.drawLine(0, 0, ev1[0], ev1[1], viz.colors.green + '66', 2, true);
                        viz.drawLine(0, 0, ev2[0], ev2[1], viz.colors.yellow + '66', 2, true);
                        viz.drawVector(0, 0, ev1[0] * 2, ev1[1] * 2, viz.colors.green, 'e₁');
                        viz.drawVector(0, 0, ev2[0] * 2, ev2[1] * 2, viz.colors.yellow, 'e₂');
                    } else {
                        geomMult = 1;
                        // Draw single eigenspace
                        viz.drawLine(0, 0, ev1[0], ev1[1], viz.colors.green + '88', 3, true);
                        viz.drawVector(0, 0, ev1[0] * 2, ev1[1] * 2, viz.colors.green, 'e₁');
                    }
                }

                // Draw unit square transformation
                viz.drawTransformedUnitSquare(M, viz.colors.orange + '22', viz.colors.orange, 2);

                // Display info
                viz.drawText('Matrix: ' + typeNames[matrixType], 0, 4.8, viz.colors.white, 14);
                if (evals) {
                    viz.drawText('λ = ' + evals[0].toFixed(2) + ' (repeated)', 0, 4.0, viz.colors.text, 12);
                    viz.drawText('Algebraic multiplicity: 2', 0, -4.0, viz.colors.text, 12);
                    viz.drawText('Geometric multiplicity: ' + geomMult, 0, -4.7, geomMult === 2 ? viz.colors.green : viz.colors.orange, 12);

                    if (geomMult === 2) {
                        viz.drawText('✓ Diagonalizable!', 0, -5.4, viz.colors.green, 13);
                    } else {
                        viz.drawText('✗ Not diagonalizable', 0, -5.4, viz.colors.red, 13);
                    }
                }
            }

            draw();
            return viz;
        }
    }
];

// Section 4: Triangularization and Schur's Theorem
window.EXTRA_VIZ['ch08']['ch08-sec04'] = [
    {
        id: 'ch08-extra-viz-9',
        title: 'Schur Triangularization Process',
        description: 'Visualize how any matrix can be triangularized. The basis vectors are chosen to be orthogonal (unitary triangularization).',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            let step = 0;
            const M = [[2, 1], [0.5, 1.5]]; // Sample matrix

            const stepBtn = VizEngine.createButton(controls, 'Next Step', () => {
                step = (step + 1) % 4;
                draw();
            });

            VizEngine.createButton(controls, 'Reset', () => {
                step = 0;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const evals = VizEngine.eigenvalues2(M);
                const ev1 = VizEngine.eigenvector2(M, evals[0]);

                // Find orthogonal vector to ev1
                const ev2_perp = [-ev1[1], ev1[0]];

                if (step === 0) {
                    viz.drawText('Step 1: Original matrix A', 0, 4.8, viz.colors.white, 14);
                    viz.drawTransformedUnitSquare(M, viz.colors.blue + '22', viz.colors.blue, 2);
                    viz.drawText('A = [[' + M[0][0] + ', ' + M[0][1] + '], [' + M[1][0] + ', ' + M[1][1] + ']]', 0, -4.5, viz.colors.text, 11);
                } else if (step === 1) {
                    viz.drawText('Step 2: Find eigenvector q₁', 0, 4.8, viz.colors.white, 14);
                    viz.drawVector(0, 0, ev1[0] * 2.5, ev1[1] * 2.5, viz.colors.green, 'q₁');
                    const Aev1 = VizEngine.matVec(M, ev1);
                    viz.drawVector(0, 0, Aev1[0] * 2.5, Aev1[1] * 2.5, viz.colors.orange, 'Aq₁=' + evals[0].toFixed(2) + 'q₁');
                    viz.drawText('λ₁ = ' + evals[0].toFixed(2), 0, -4.5, viz.colors.text, 12);
                } else if (step === 2) {
                    viz.drawText('Step 3: Choose orthogonal q₂', 0, 4.8, viz.colors.white, 14);
                    viz.drawVector(0, 0, ev1[0] * 2.5, ev1[1] * 2.5, viz.colors.green, 'q₁');
                    viz.drawVector(0, 0, ev2_perp[0] * 2.5, ev2_perp[1] * 2.5, viz.colors.yellow, 'q₂');
                    viz.drawText('Q = [q₁ | q₂] is orthogonal', 0, -4.5, viz.colors.text, 12);
                } else if (step === 3) {
                    viz.drawText('Step 4: T = Q*AQ is upper triangular', 0, 4.8, viz.colors.white, 14);

                    // Build Q matrix
                    const Q = [[ev1[0], ev2_perp[0]], [ev1[1], ev2_perp[1]]];
                    const Qt = [[ev1[0], ev1[1]], [ev2_perp[0], ev2_perp[1]]];

                    // Compute T = Qt * M * Q (approximately)
                    const MQ = VizEngine.matMul(M, Q);
                    const T = VizEngine.matMul(Qt, MQ);

                    viz.drawText('T ≈ [[' + T[0][0].toFixed(1) + ', ' + T[0][1].toFixed(1) + '], [' + T[1][0].toFixed(2) + ', ' + T[1][1].toFixed(1) + ']]', 0, -4.0, viz.colors.orange, 11);
                    viz.drawText('Upper triangular! (T₂₁ ≈ 0)', 0, -4.7, viz.colors.green, 12);

                    // Show triangular structure
                    const scale = 1.5;
                    viz.drawSegment(-3, 2, -1, 2, viz.colors.white, 2);
                    viz.drawSegment(-1, 2, -1, 1, viz.colors.white, 2);
                    viz.drawSegment(-1, 1, -3, 1, viz.colors.white, 2);
                    viz.drawSegment(-3, 1, -3, 2, viz.colors.white, 2);
                    viz.drawText('*', -2, 1.5, viz.colors.orange, 16);
                    viz.drawText('*', -2, 1.5, viz.colors.orange, 16);
                    viz.drawSegment(-2, 1.5, -2, 1.5, viz.colors.orange, 4);
                    viz.drawText('0', -2.5, 1.25, viz.colors.green, 14);
                }
            }

            draw();
            return viz;
        }
    }
];

// Section 5: The Jordan Canonical Form
window.EXTRA_VIZ['ch08']['ch08-sec05'] = [
    {
        id: 'ch08-extra-viz-7',
        title: 'Jordan Block Structure Visualizer',
        description: 'Explore how a Jordan block transforms the plane. Notice how vectors spiral - the block has one eigenvalue but limited eigenvectors.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            let lambda = 1.2;

            VizEngine.createSlider(controls, 'λ', 0.5, 2, lambda, 0.1, (v) => {
                lambda = v;
                draw();
            });

            let t = 0;
            let animating = false;

            const playBtn = VizEngine.createButton(controls, 'Animate', () => {
                animating = !animating;
                playBtn.textContent = animating ? 'Pause' : 'Animate';
                if (animating) animate();
            });

            function animate() {
                if (!animating) return;
                t += 0.02;
                draw();
                requestAnimationFrame(animate);
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Jordan block: [[λ, 1], [0, λ]]
                const J = [[lambda, 1], [0, lambda]];

                // Draw eigenspace (only x-axis, since geometric multiplicity = 1)
                viz.drawLine(0, 0, 1, 0, viz.colors.green + '88', 2, true);
                viz.drawText('1D eigenspace (geom. mult. = 1)', 0, 4.8, viz.colors.green, 13);
                viz.drawText('Algebraic mult. = 2', 0, 4.1, viz.colors.text, 12);

                // Draw several test vectors
                const testVectors = [
                    [2, 0],     // eigenvector
                    [1, 1],     // general vector
                    [-1, 1.5],  // another vector
                    [0.5, -1]
                ];

                testVectors.forEach((v, i) => {
                    const colors = [viz.colors.green, viz.colors.blue, viz.colors.purple, viz.colors.pink];
                    const vx = v[0] * Math.cos(t * 0.5) - v[1] * Math.sin(t * 0.5);
                    const vy = v[0] * Math.sin(t * 0.5) + v[1] * Math.cos(t * 0.5);

                    if (animating) {
                        viz.drawVector(0, 0, vx, vy, colors[i] + '88', null, 1.5);
                        const Jv = VizEngine.matVec(J, [vx, vy]);
                        viz.drawVector(0, 0, Jv[0], Jv[1], colors[i], null, 2);
                    }
                });

                // Static example
                if (!animating) {
                    viz.drawVector(0, 0, 2, 0, viz.colors.green, 'e');
                    const Je = VizEngine.matVec(J, [2, 0]);
                    viz.drawVector(0, 0, Je[0], Je[1], viz.colors.green + 'cc', 'Je=' + lambda.toFixed(1) + 'e');

                    viz.drawVector(0, 0, 1, 1, viz.colors.blue, 'v');
                    const Jv = VizEngine.matVec(J, [1, 1]);
                    viz.drawVector(0, 0, Jv[0], Jv[1], viz.colors.orange, 'Jv');

                    viz.drawText('J = [[' + lambda.toFixed(1) + ', 1], [0, ' + lambda.toFixed(1) + ']]', 0, -4.5, viz.colors.text, 12);
                }
            }

            draw();
            return viz;
        }
    }
];

// Section 7: Applications and Spectral Theory
window.EXTRA_VIZ['ch08']['ch08-sec07'] = [
    {
        id: 'ch08-extra-viz-5',
        title: 'Simultaneous Eigenspaces (Commuting Operators)',
        description: 'Two commuting matrices share eigenspaces. Drag a vector to see it transform under both matrices A and B.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Two diagonal matrices (clearly commute)
            const A = [[2, 0], [0, 0.5]];
            const B = [[1.5, 0], [0, 3]];

            // Rotate both to same basis
            const theta = Math.PI / 4;
            const c = Math.cos(theta), s = Math.sin(theta);
            const R = [[c, -s], [s, c]];
            const Rt = [[c, s], [-s, c]];

            const A_rot = VizEngine.matMul(VizEngine.matMul(R, A), Rt);
            const B_rot = VizEngine.matMul(VizEngine.matMul(R, B), Rt);

            const ev1 = [c, s];
            const ev2 = [-s, c];

            const v = viz.addDraggable('v', 2, 1.5, viz.colors.blue, 8, () => draw());

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw shared eigenspaces
                viz.drawLine(0, 0, ev1[0], ev1[1], viz.colors.green + '66', 2, true);
                viz.drawLine(0, 0, ev2[0], ev2[1], viz.colors.yellow + '66', 2, true);
                viz.drawText('Shared eigenspaces', 0, 4.8, viz.colors.text, 13);

                // Original vector
                viz.drawVector(0, 0, v.x, v.y, viz.colors.blue, 'v');

                // Transform by A
                const Av = VizEngine.matVec(A_rot, [v.x, v.y]);
                viz.drawVector(0, 0, Av[0], Av[1], viz.colors.orange, 'Av');

                // Transform by B
                const Bv = VizEngine.matVec(B_rot, [v.x, v.y]);
                viz.drawVector(0, 0, Bv[0], Bv[1], viz.colors.purple, 'Bv');

                // Show that AB = BA
                const ABv = VizEngine.matVec(A_rot, Bv);
                const BAv = VizEngine.matVec(B_rot, Av);

                viz.drawPoint(ABv[0], ABv[1], viz.colors.pink, null, 4);
                viz.drawText('AB = BA (commute)', 0, -4.5, viz.colors.text, 12);

                // Check if v is in an eigenspace
                const proj1 = Math.abs(VizEngine.dot([v.x, v.y], ev1) / VizEngine.vecLen([v.x, v.y]));
                const proj2 = Math.abs(VizEngine.dot([v.x, v.y], ev2) / VizEngine.vecLen([v.x, v.y]));

                if (proj1 > 0.95) {
                    viz.drawText('v in shared eigenspace 1!', 0, -5.2, viz.colors.green, 12);
                } else if (proj2 > 0.95) {
                    viz.drawText('v in shared eigenspace 2!', 0, -5.2, viz.colors.yellow, 12);
                }
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch08-extra-viz-6',
        title: 'Power Iteration Convergence',
        description: 'Watch power iteration find the dominant eigenvector. The method repeatedly applies A to a random vector - it converges to the eigenvector with largest |λ|.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const M = [[1.8, 0.4], [0.4, 1.2]]; // Matrix with dominant eigenvalue
            const evals = VizEngine.eigenvalues2(M);
            const dominantIdx = Math.abs(evals[0]) > Math.abs(evals[1]) ? 0 : 1;
            const dominantEval = evals[dominantIdx];
            const dominantEvec = VizEngine.eigenvector2(M, dominantEval);

            let iteration = 0;
            let currentVec = [1, 0.5]; // Random starting vector
            let history = [[...currentVec]];
            let running = false;

            const stepBtn = VizEngine.createButton(controls, 'Step', () => {
                step();
            });

            const autoBtn = VizEngine.createButton(controls, 'Auto Run', () => {
                running = !running;
                autoBtn.textContent = running ? 'Stop' : 'Auto Run';
                if (running) autoRun();
            });

            const resetBtn = VizEngine.createButton(controls, 'Reset', () => {
                iteration = 0;
                currentVec = [Math.random() - 0.5, Math.random() - 0.5];
                history = [[...currentVec]];
                running = false;
                autoBtn.textContent = 'Auto Run';
                draw();
            });

            function step() {
                currentVec = VizEngine.matVec(M, currentVec);
                // Normalize to prevent overflow
                const len = VizEngine.vecLen(currentVec);
                if (len > 0.1) {
                    currentVec = [currentVec[0] / len * 2, currentVec[1] / len * 2];
                }
                history.push([...currentVec]);
                if (history.length > 30) history.shift();
                iteration++;
                draw();
            }

            function autoRun() {
                if (!running) return;
                step();
                if (iteration < 50) {
                    setTimeout(autoRun, 200);
                } else {
                    running = false;
                    autoBtn.textContent = 'Auto Run';
                }
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw true eigenvectors
                viz.drawVector(0, 0, dominantEvec[0] * 2, dominantEvec[1] * 2, viz.colors.green, 'e₁');
                viz.drawLine(0, 0, dominantEvec[0], dominantEvec[1], viz.colors.green + '44', 2, true);

                const otherEvec = VizEngine.eigenvector2(M, evals[1 - dominantIdx]);
                viz.drawVector(0, 0, otherEvec[0] * 1.5, otherEvec[1] * 1.5, viz.colors.yellow + '88', 'e₂');

                // Draw history trail
                for (let i = 1; i < history.length; i++) {
                    const alpha = i / history.length;
                    viz.drawSegment(history[i-1][0], history[i-1][1], history[i][0], history[i][1],
                                  viz.colors.blue + Math.floor(alpha * 255).toString(16).padStart(2, '0'), 2);
                }

                // Draw current vector
                viz.drawVector(0, 0, currentVec[0], currentVec[1], viz.colors.orange, 'v⁽ⁿ⁾');

                // Calculate angle to dominant eigenvector
                const dot = VizEngine.dot(currentVec, dominantEvec);
                const angle = Math.acos(dot / (VizEngine.vecLen(currentVec) * VizEngine.vecLen(dominantEvec)));
                const angleDeg = angle * 180 / Math.PI;

                viz.drawText('Iteration: ' + iteration, 0, 4.8, viz.colors.text, 13);
                viz.drawText('Angle to e₁: ' + angleDeg.toFixed(1) + '°', 0, 4.1, viz.colors.text, 13);
                viz.drawText('Dominant λ₁ = ' + dominantEval.toFixed(2), 0, -4.5, viz.colors.green, 12);
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch08-extra-viz-10',
        title: 'Spectral Resolution Explorer',
        description: 'For a diagonalizable operator, explore the spectral decomposition A = λ₁P₁ + λ₂P₂ where Pᵢ are projections onto eigenspaces.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const M = [[1.5, 0.5], [0.5, 1.5]]; // Symmetric matrix (diagonalizable)
            const evals = VizEngine.eigenvalues2(M);
            const ev1 = VizEngine.eigenvector2(M, evals[0]);
            const ev2 = VizEngine.eigenvector2(M, evals[1]);

            const v = viz.addDraggable('v', 2, 1, viz.colors.blue, 8, () => draw());

            let showDecomposition = true;

            VizEngine.createButton(controls, 'Toggle Decomposition', () => {
                showDecomposition = !showDecomposition;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw eigenspaces
                viz.drawLine(0, 0, ev1[0], ev1[1], viz.colors.green + '44', 2, true);
                viz.drawLine(0, 0, ev2[0], ev2[1], viz.colors.yellow + '44', 2, true);

                // Original vector
                viz.drawVector(0, 0, v.x, v.y, viz.colors.blue, 'v');

                // Projections onto eigenspaces
                const proj1 = VizEngine.proj([v.x, v.y], ev1);
                const proj2 = VizEngine.proj([v.x, v.y], ev2);

                if (showDecomposition) {
                    viz.drawVector(0, 0, proj1[0], proj1[1], viz.colors.green, 'P₁v');
                    viz.drawVector(0, 0, proj2[0], proj2[1], viz.colors.yellow, 'P₂v');
                    viz.drawSegment(v.x, v.y, proj1[0], proj1[1], viz.colors.green + '66', 1, true);
                    viz.drawSegment(v.x, v.y, proj2[0], proj2[1], viz.colors.yellow + '66', 1, true);
                }

                // Spectral decomposition: Av = λ₁P₁v + λ₂P₂v
                const Av1 = [proj1[0] * evals[0], proj1[1] * evals[0]];
                const Av2 = [proj2[0] * evals[1], proj2[1] * evals[1]];
                const Av = [Av1[0] + Av2[0], Av1[1] + Av2[1]];

                if (showDecomposition) {
                    viz.drawVector(0, 0, Av1[0], Av1[1], viz.colors.green + 'cc', 'λ₁P₁v', 1.5);
                    viz.drawVector(0, 0, Av2[0], Av2[1], viz.colors.yellow + 'cc', 'λ₂P₂v', 1.5);
                }

                viz.drawVector(0, 0, Av[0], Av[1], viz.colors.orange, 'Av', 2.5);

                // Info
                viz.drawText('A = ' + evals[0].toFixed(2) + 'P₁ + ' + evals[1].toFixed(2) + 'P₂', 0, 4.8, viz.colors.white, 13);
                viz.drawText('Spectral Resolution', 0, 4.1, viz.colors.text, 12);
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch08-extra-viz-11',
        title: 'Matrix Powers via Spectral Decomposition',
        description: 'See how A^n is easy to compute using eigenvalues: A^n = λ₁^n P₁ + λ₂^n P₂. Watch as powers amplify the dominant eigenspace.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const M = [[1.5, 0.3], [0.3, 0.8]]; // Matrix with |λ₁| > |λ₂|
            const evals = VizEngine.eigenvalues2(M);
            const ev1 = VizEngine.eigenvector2(M, evals[0]);
            const ev2 = VizEngine.eigenvector2(M, evals[1]);

            let n = 0;

            VizEngine.createSlider(controls, 'Power n', 0, 10, n, 1, (v) => {
                n = Math.floor(v);
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw eigenspaces
                viz.drawLine(0, 0, ev1[0], ev1[1], viz.colors.green + '44', 3, true);
                viz.drawLine(0, 0, ev2[0], ev2[1], viz.colors.yellow + '44', 2, true);

                // Test vector
                const v = [1.5, 1];
                viz.drawVector(0, 0, v[0], v[1], viz.colors.blue + '88', 'v', 1.5);

                // Compute A^n using spectral decomposition
                const proj1 = VizEngine.proj(v, ev1);
                const proj2 = VizEngine.proj(v, ev2);

                const lam1_pow = Math.pow(evals[0], n);
                const lam2_pow = Math.pow(evals[1], n);

                const Anv1 = [proj1[0] * lam1_pow, proj1[1] * lam1_pow];
                const Anv2 = [proj2[0] * lam2_pow, proj2[1] * lam2_pow];
                const Anv = [Anv1[0] + Anv2[0], Anv1[1] + Anv2[1]];

                // Scale for visibility
                const maxLen = Math.max(VizEngine.vecLen(Anv), 0.1);
                const scale = Math.min(4 / maxLen, 1);

                viz.drawVector(0, 0, Anv1[0] * scale, Anv1[1] * scale, viz.colors.green + 'cc', null, 1.5);
                viz.drawVector(0, 0, Anv2[0] * scale, Anv2[1] * scale, viz.colors.yellow + 'cc', null, 1.5);
                viz.drawVector(0, 0, Anv[0] * scale, Anv[1] * scale, viz.colors.orange, 'A^' + n + 'v', 2.5);

                // Info
                viz.drawText('A^' + n + ' = λ₁^' + n + 'P₁ + λ₂^' + n + 'P₂', 0, 4.8, viz.colors.white, 13);
                viz.drawText('λ₁^' + n + ' = ' + lam1_pow.toFixed(2) + ', λ₂^' + n + ' = ' + lam2_pow.toFixed(2), 0, 4.1, viz.colors.text, 11);

                if (n > 3) {
                    viz.drawText('Dominated by λ₁^' + n + ' term!', 0, -4.5, viz.colors.green, 12);
                }

                if (maxLen !== scale) {
                    viz.drawText('(scaled for visibility)', 0, -5.2, viz.colors.text, 10);
                }
            }

            draw();
            return viz;
        }
    }
];
