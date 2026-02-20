window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch13'] = window.EXTRA_VIZ['ch13'] || {};

// Section 1: Complete Subspaces and Projections
window.EXTRA_VIZ['ch13']['ch13-sec01'] = [
    {
        id: 'ch13-extra-viz-4',
        title: 'Orthogonal Projection onto Closed Subspace',
        description: 'Drag v to see projection onto subspace W. Best approximation minimizes distance!',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Define subspace W as span{w₁, w₂}
            const w1 = {x: 2, y: 0.5};
            const w2 = {x: 0.5, y: 1.5};

            const v = viz.addDraggable('v', 3, 2.5, viz.colors.blue, 8, () => draw());

            let showOrthogonality = false;

            const toggleButton = VizEngine.createButton(controls, 'Toggle Orthogonality', () => {
                showOrthogonality = !showOrthogonality;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw subspace W (as parallelogram tiling)
                for (let a = -3; a <= 3; a++) {
                    for (let b = -3; b <= 3; b++) {
                        const x = a * w1.x + b * w2.x;
                        const y = a * w1.y + b * w2.y;
                        if (Math.abs(x) <= 7 && Math.abs(y) <= 5) {
                            viz.drawPoint(x, y, viz.colors.teal + '33', null, 2);
                        }
                    }
                }

                // Draw basis vectors of W
                viz.drawVector(0, 0, w1.x, w1.y, viz.colors.green, 'w₁', 3);
                viz.drawVector(0, 0, w2.x, w2.y, viz.colors.green, 'w₂', 3);

                // Compute projection using Gram-Schmidt
                // Project v onto W = span{w₁, w₂}

                // Orthogonalize basis first
                const u1 = {x: w1.x, y: w1.y};
                const u1Norm = Math.sqrt(u1.x * u1.x + u1.y * u1.y);
                const e1 = {x: u1.x / u1Norm, y: u1.y / u1Norm};

                // u₂ = w₂ - ⟨w₂,e₁⟩e₁
                const dot_w2_e1 = w2.x * e1.x + w2.y * e1.y;
                const u2 = {
                    x: w2.x - dot_w2_e1 * e1.x,
                    y: w2.y - dot_w2_e1 * e1.y
                };
                const u2Norm = Math.sqrt(u2.x * u2.x + u2.y * u2.y);
                const e2 = {x: u2.x / u2Norm, y: u2.y / u2Norm};

                // Project v onto orthonormal basis {e₁, e₂}
                const c1 = v.x * e1.x + v.y * e1.y;
                const c2 = v.x * e2.x + v.y * e2.y;

                const vProj = {
                    x: c1 * e1.x + c2 * e2.x,
                    y: c1 * e1.y + c2 * e2.y
                };

                // Draw vector v
                viz.drawVector(0, 0, v.x, v.y, viz.colors.blue, 'v', 4);

                // Draw projection
                viz.drawVector(0, 0, vProj.x, vProj.y, viz.colors.purple, 'P_W(v)', 4);

                // Draw error vector (v - P_W(v))
                viz.drawVector(vProj.x, vProj.y, v.x, v.y, viz.colors.red, 'v-P_W(v)', 3);

                // Draw perpendicular indicator
                if (showOrthogonality) {
                    const perpSize = 0.3;
                    const errorVec = {x: v.x - vProj.x, y: v.y - vProj.y};
                    const errorNorm = Math.sqrt(errorVec.x * errorVec.x + errorVec.y * errorVec.y);

                    if (errorNorm > 0.01) {
                        // Draw right angle symbol
                        const ex = errorVec.x / errorNorm;
                        const ey = errorVec.y / errorNorm;
                        const px = vProj.x / Math.sqrt(vProj.x * vProj.x + vProj.y * vProj.y);
                        const py = vProj.y / Math.sqrt(vProj.x * vProj.x + vProj.y * vProj.y);

                        const corner = {
                            x: vProj.x + perpSize * ex,
                            y: vProj.y + perpSize * ey
                        };
                        viz.drawSegment(vProj.x, vProj.y, corner.x, corner.y, viz.colors.yellow, 2);
                        viz.drawSegment(corner.x, corner.y, corner.x + perpSize * px, corner.y + perpSize * py, viz.colors.yellow, 2);
                        viz.drawSegment(vProj.x + perpSize * px, vProj.y + perpSize * py, corner.x + perpSize * px, corner.y + perpSize * py, viz.colors.yellow, 2);
                    }
                }

                // Display distances
                const distToProj = Math.sqrt((v.x - vProj.x) ** 2 + (v.y - vProj.y) ** 2);
                const normV = Math.sqrt(v.x * v.x + v.y * v.y);

                viz.drawText('Projection Theorem:', -6, 4.5, viz.colors.white, 14);
                viz.drawText(`||v - P_W(v)|| = ${distToProj.toFixed(3)} (minimized!)`,
                            -6, 3.9, viz.colors.red, 11);
                viz.drawText('⟨v - P_W(v), w⟩ = 0 for all w ∈ W',
                            0, -4.5, viz.colors.yellow, 11, 'center');

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    },,
    {
        id: 'ch13-extra-viz-5',
        title: 'Best Approximation in Incomplete Subspace',
        description: 'Compare approximation error for different numbers of basis vectors',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            let numBasisVectors = 1;

            const slider = VizEngine.createSlider(controls, 'Basis Vectors Used', 1, 3, 1, 1, (val) => {
                numBasisVectors = val;
                draw();
            });

            // Three orthonormal basis vectors (in 3D, shown as 2D projection)
            const basis = [
                {x: 1, y: 0, label: 'e₁'},
                {x: 0, y: 1, label: 'e₂'},
                {x: -0.5, y: 0.5, label: 'e₃'}
            ];

            // Target vector
            const target = {x: 2.5, y: 2};

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw all basis vectors (dim those not used)
                basis.forEach((e, i) => {
                    const color = (i < numBasisVectors) ? viz.colors.green : viz.colors.green + '44';
                    const width = (i < numBasisVectors) ? 3 : 2;
                    viz.drawVector(0, 0, e.x, e.y, color, e.label, width);
                });

                // Draw target vector
                viz.drawVector(0, 0, target.x, target.y, viz.colors.blue, 'v', 4);

                // Compute best approximation using first numBasisVectors
                let approx = {x: 0, y: 0};
                let coeffs = [];
                for (let i = 0; i < numBasisVectors; i++) {
                    const c = target.x * basis[i].x + target.y * basis[i].y;
                    coeffs.push(c);
                    approx.x += c * basis[i].x;
                    approx.y += c * basis[i].y;
                }

                // Draw approximation
                viz.drawVector(0, 0, approx.x, approx.y, viz.colors.purple, 'v̂', 4);

                // Draw error
                viz.drawVector(approx.x, approx.y, target.x, target.y, viz.colors.red, 'error', 3);

                // Compute error and energy
                const errorNorm = Math.sqrt((target.x - approx.x) ** 2 + (target.y - approx.y) ** 2);
                const targetNorm = Math.sqrt(target.x * target.x + target.y * target.y);
                const approxNorm = Math.sqrt(approx.x * approx.x + approx.y * approx.y);

                // Draw error bar chart
                const barX = 4.5;
                const scale = 1.5;

                viz.drawPolygon(
                    [[barX, -3], [barX + 0.5, -3],
                     [barX + 0.5, -3 + errorNorm * scale], [barX, -3 + errorNorm * scale]],
                    viz.colors.red + '88',
                    viz.colors.red,
                    2
                );
                viz.drawText('Error', barX + 0.25, -3.5, viz.colors.red, 10, 'center');

                // Display metrics
                viz.drawText(`Subspace dim: ${numBasisVectors}`, -6, 4.5, viz.colors.white, 14);
                viz.drawText(`||error|| = ${errorNorm.toFixed(3)}`, -6, 3.9, viz.colors.red, 12);
                viz.drawText(`||v̂||² = ${(approxNorm * approxNorm).toFixed(3)}`, -6, 3.3, viz.colors.purple, 12);
                viz.drawText(`||v||² = ${(targetNorm * targetNorm).toFixed(3)}`, -6, 2.7, viz.colors.blue, 12);

                const inequalityHolds = (approxNorm * approxNorm <= targetNorm * targetNorm + 0.001);
                viz.drawText(`Bessel: ||v̂||² ≤ ||v||² ${inequalityHolds ? '✓' : '✗'}`,
                            0, -4.5, viz.colors.green, 11, 'center');
            }

            draw();
            return viz;
        }
    }
];

// Section 2: Hilbert Bases and Orthonormal Sets
window.EXTRA_VIZ['ch13']['ch13-sec02'] = [
    {
        id: 'ch13-extra-viz-1',
        title: 'Fourier Series Convergence',
        description: 'Adjust slider to see how more Fourier terms approximate a square wave. Watch convergence!',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            let numTerms = 1;

            const slider = VizEngine.createSlider(controls, 'Number of Terms', 1, 20, 1, 1, (val) => {
                numTerms = val;
                draw();
            });

            // Square wave target function: f(x) = 1 for x in (0,π), -1 for x in (π,2π)
            // Fourier series: f(x) ≈ (4/π) Σ sin((2k-1)x)/(2k-1) for k=1,2,3,...
            function squareWave(x) {
                const period = 2 * Math.PI;
                const xMod = ((x % period) + period) % period;
                return xMod < Math.PI ? 1 : -1;
            }

            function fourierApprox(x, n) {
                let sum = 0;
                for (let k = 1; k <= n; k++) {
                    sum += Math.sin((2*k - 1) * x) / (2*k - 1);
                }
                return (4 / Math.PI) * sum;
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const xMin = -6;
                const xMax = 6;
                const steps = 200;
                const dx = (xMax - xMin) / steps;

                // Draw target square wave (dashed)
                for (let i = 0; i < steps; i++) {
                    const x1 = xMin + i * dx;
                    const x2 = xMin + (i + 1) * dx;
                    const y1 = squareWave(x1);
                    const y2 = squareWave(x2);
                    viz.drawSegment(x1, y1, x2, y2, viz.colors.teal + '88', 2, true);
                }

                // Draw Fourier approximation
                const approxPoints = [];
                for (let i = 0; i <= steps; i++) {
                    const x = xMin + i * dx;
                    const y = fourierApprox(x, numTerms);
                    approxPoints.push([x, y]);
                }

                for (let i = 0; i < approxPoints.length - 1; i++) {
                    viz.drawSegment(
                        approxPoints[i][0], approxPoints[i][1],
                        approxPoints[i + 1][0], approxPoints[i + 1][1],
                        viz.colors.orange, 3
                    );
                }

                // Compute L2 error
                let error = 0;
                for (let i = 0; i <= 100; i++) {
                    const x = -Math.PI + i * (2 * Math.PI / 100);
                    const diff = squareWave(x) - fourierApprox(x, numTerms);
                    error += diff * diff;
                }
                error = Math.sqrt(error / 100);

                viz.drawText(`Fourier Series: ${numTerms} term${numTerms > 1 ? 's' : ''}`,
                            0, 4.5, viz.colors.white, 14, 'center');
                viz.drawText(`L² error: ${error.toFixed(3)}`,
                            0, 3.8, viz.colors.yellow, 12, 'center');
                viz.drawText('Target (teal dashed) vs Approximation (orange)',
                            0, -4.5, viz.colors.white, 11, 'center');
            }

            draw();
            return viz;
        }
    },,
    {
        id: 'ch13-extra-viz-7',
        title: 'L² Function Space Inner Product',
        description: 'Visualize inner product ⟨f,g⟩ = ∫f(x)g(x)dx in L²[0,2π] with orthogonal functions',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            let func1 = 0; // 0: cos(x), 1: sin(x), 2: cos(2x)
            let func2 = 1;

            const slider1 = VizEngine.createSlider(controls, 'Function f', 0, 4, 0, 1, (val) => {
                func1 = val;
                draw();
            });

            const slider2 = VizEngine.createSlider(controls, 'Function g', 0, 4, 1, 1, (val) => {
                func2 = val;
                draw();
            });

            const functions = [
                {name: 'cos(x)', f: (x) => Math.cos(x), color: viz.colors.blue},
                {name: 'sin(x)', f: (x) => Math.sin(x), color: viz.colors.orange},
                {name: 'cos(2x)', f: (x) => Math.cos(2*x), color: viz.colors.green},
                {name: 'sin(2x)', f: (x) => Math.sin(2*x), color: viz.colors.purple},
                {name: '1', f: (x) => 0.5, color: viz.colors.pink}
            ];

            function computeInnerProduct(f1, f2) {
                // Approximate ∫₀²ᵖ f(x)g(x) dx using trapezoidal rule
                const n = 200;
                const dx = (2 * Math.PI) / n;
                let sum = 0;

                for (let i = 0; i <= n; i++) {
                    const x = i * dx;
                    const weight = (i === 0 || i === n) ? 0.5 : 1;
                    sum += weight * f1(x) * f2(x) * dx;
                }

                return sum;
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const f1 = functions[func1];
                const f2 = functions[func2];

                // Draw function 1
                const steps = 150;
                for (let i = 0; i < steps; i++) {
                    const x1 = (i / steps) * 2 * Math.PI - Math.PI;
                    const x2 = ((i + 1) / steps) * 2 * Math.PI - Math.PI;
                    const y1 = f1.f(x1);
                    const y2 = f1.f(x2);
                    viz.drawSegment(x1, y1, x2, y2, f1.color, 3);
                }

                // Draw function 2
                for (let i = 0; i < steps; i++) {
                    const x1 = (i / steps) * 2 * Math.PI - Math.PI;
                    const x2 = ((i + 1) / steps) * 2 * Math.PI - Math.PI;
                    const y1 = f2.f(x1);
                    const y2 = f2.f(x2);
                    viz.drawSegment(x1, y1, x2, y2, f2.color, 3);
                }

                // Shade the product f1(x) * f2(x) region
                for (let i = 0; i < steps; i++) {
                    const x = (i / steps) * 2 * Math.PI - Math.PI;
                    const product = f1.f(x) * f2.f(x);
                    const color = product > 0 ? viz.colors.green + '22' : viz.colors.red + '22';

                    if (Math.abs(product) > 0.01) {
                        viz.drawSegment(x, 0, x, product, color, 2);
                    }
                }

                // Compute inner product
                const innerProd = computeInnerProduct(f1.f, f2.f);
                const norm1 = Math.sqrt(computeInnerProduct(f1.f, f1.f));
                const norm2 = Math.sqrt(computeInnerProduct(f2.f, f2.f));

                // Display results
                viz.drawText(`f = ${f1.name}`, -6, 4.5, f1.color, 13);
                viz.drawText(`g = ${f2.name}`, -6, 3.9, f2.color, 13);

                viz.drawText(`⟨f,g⟩ = ∫₀²ᵖ f(x)g(x)dx = ${innerProd.toFixed(4)}`,
                            0, -3.5, viz.colors.white, 12, 'center');

                const isOrthogonal = Math.abs(innerProd) < 0.01;
                const orthogonalText = isOrthogonal ? '⊥ ORTHOGONAL!' : 'not orthogonal';
                const orthogonalColor = isOrthogonal ? viz.colors.green : viz.colors.yellow;

                viz.drawText(orthogonalText, 0, -4.1, orthogonalColor, 14, 'center');

                viz.drawText(`||f|| = ${norm1.toFixed(3)}, ||g|| = ${norm2.toFixed(3)}`,
                            0, -4.7, viz.colors.text, 10, 'center');
            }

            draw();
            return viz;
        }
    },,
    {
        id: 'ch13-extra-viz-8',
        title: 'Gram-Schmidt Orthogonalization Process',
        description: 'Drag vectors to see Gram-Schmidt transform linearly independent set to orthonormal basis',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const v1 = viz.addDraggable('v1', 2.5, 0.8, viz.colors.blue, 8, () => draw());
            const v2 = viz.addDraggable('v2', 1, 2.5, viz.colors.blue, 8, () => draw());

            let showProcess = 0; // 0: original, 1: after u1, 2: after u2, 3: normalized

            const slider = VizEngine.createSlider(controls, 'Show Steps', 0, 3, 0, 1, (val) => {
                showProcess = val;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Step 0: Original vectors
                if (showProcess >= 0) {
                    viz.drawVector(0, 0, v1.x, v1.y, viz.colors.blue + '88', 'v₁', 3);
                    viz.drawVector(0, 0, v2.x, v2.y, viz.colors.blue + '88', 'v₂', 3);
                }

                // Step 1: u₁ = v₁
                const u1 = {x: v1.x, y: v1.y};
                if (showProcess >= 1) {
                    viz.drawVector(0, 0, u1.x, u1.y, viz.colors.green, 'u₁=v₁', 4);
                }

                // Step 2: u₂ = v₂ - proj_{u₁}(v₂)
                const u1NormSq = u1.x * u1.x + u1.y * u1.y;
                const dotV2U1 = v2.x * u1.x + v2.y * u1.y;
                const proj = {
                    x: (dotV2U1 / u1NormSq) * u1.x,
                    y: (dotV2U1 / u1NormSq) * u1.y
                };
                const u2 = {
                    x: v2.x - proj.x,
                    y: v2.y - proj.y
                };

                if (showProcess >= 2) {
                    // Show projection
                    viz.drawVector(0, 0, proj.x, proj.y, viz.colors.orange + '66', 'proj', 2);
                    viz.drawSegment(proj.x, proj.y, v2.x, v2.y, viz.colors.yellow + 'aa', 2, true);

                    // Show u₂
                    viz.drawVector(0, 0, u2.x, u2.y, viz.colors.purple, 'u₂', 4);
                }

                // Step 3: Normalize
                const e1Norm = Math.sqrt(u1.x * u1.x + u1.y * u1.y);
                const e2Norm = Math.sqrt(u2.x * u2.x + u2.y * u2.y);

                const e1 = {x: u1.x / e1Norm, y: u1.y / e1Norm};
                const e2 = {x: u2.x / e2Norm, y: u2.y / e2Norm};

                if (showProcess >= 3) {
                    viz.drawVector(0, 0, e1.x * 2, e1.y * 2, viz.colors.green, 'e₁', 4);
                    viz.drawVector(0, 0, e2.x * 2, e2.y * 2, viz.colors.purple, 'e₂', 4);

                    // Draw unit circles
                    viz.drawCircle(e1.x * 2, e1.y * 2, 0.2, viz.colors.green + '44', viz.colors.green);
                    viz.drawCircle(e2.x * 2, e2.y * 2, 0.2, viz.colors.purple + '44', viz.colors.purple);
                }

                // Check orthogonality
                const dotU1U2 = u1.x * u2.x + u1.y * u2.y;
                const dotE1E2 = e1.x * e2.x + e1.y * e2.y;

                // Display info based on step
                const stepLabels = [
                    'Original vectors {v₁, v₂}',
                    'Step 1: Set u₁ = v₁',
                    'Step 2: u₂ = v₂ - proj_{u₁}(v₂)',
                    'Step 3: Normalize to get {e₁, e₂}'
                ];

                viz.drawText('Gram-Schmidt Orthogonalization', 0, 4.5, viz.colors.white, 14, 'center');
                viz.drawText(stepLabels[showProcess], 0, 3.8, viz.colors.yellow, 12, 'center');

                if (showProcess >= 2) {
                    viz.drawText(`⟨u₁,u₂⟩ = ${dotU1U2.toFixed(4)}`, -6, -3.8, viz.colors.white, 11);
                }

                if (showProcess >= 3) {
                    viz.drawText(`⟨e₁,e₂⟩ = ${dotE1E2.toFixed(4)} ≈ 0`, -6, -4.4, viz.colors.green, 11);
                    viz.drawText(`||e₁|| = ${Math.sqrt(e1.x*e1.x + e1.y*e1.y).toFixed(4)} ≈ 1`,
                                2, -3.8, viz.colors.green, 11);
                    viz.drawText(`||e₂|| = ${Math.sqrt(e2.x*e2.x + e2.y*e2.y).toFixed(4)} ≈ 1`,
                                2, -4.4, viz.colors.purple, 11);
                }

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    }
];

// Section 3: Parseval's Identity and Bessel's Inequality
window.EXTRA_VIZ['ch13']['ch13-sec03'] = [
    {
        id: 'ch13-extra-viz-2',
        title: 'Bessel Inequality Demonstration',
        description: 'Drag vector v to see Bessel inequality: sum of squared Fourier coefficients ≤ ||v||²',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Orthonormal basis in R³ (visualized in 2D projection)
            const e1 = {x: 1, y: 0};
            const e2 = {x: 0, y: 1};

            const v = viz.addDraggable('v', 2.5, 1.8, viz.colors.blue, 8, () => draw());

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw orthonormal basis vectors
                viz.drawVector(0, 0, e1.x, e1.y, viz.colors.green, 'e₁', 3);
                viz.drawVector(0, 0, e2.x, e2.y, viz.colors.green, 'e₂', 3);

                // Draw vector v
                viz.drawVector(0, 0, v.x, v.y, viz.colors.blue, 'v', 4);

                // Compute Fourier coefficients (inner products)
                const c1 = v.x * e1.x + v.y * e1.y;  // ⟨v, e₁⟩
                const c2 = v.x * e2.x + v.y * e2.y;  // ⟨v, e₂⟩

                // Draw projections
                viz.drawVector(0, 0, c1 * e1.x, c1 * e1.y, viz.colors.orange + 'aa', null, 3);
                viz.drawVector(0, 0, c2 * e2.x, c2 * e2.y, viz.colors.orange + 'aa', null, 3);

                // Draw Fourier approximation
                const vApprox = {
                    x: c1 * e1.x + c2 * e2.x,
                    y: c1 * e1.y + c2 * e2.y
                };
                viz.drawVector(0, 0, vApprox.x, vApprox.y, viz.colors.purple, 'v̂', 4);

                // Draw error vector
                viz.drawVector(vApprox.x, vApprox.y, v.x, v.y, viz.colors.red, 'v-v̂', 2);

                // Compute norms
                const normV = Math.sqrt(v.x * v.x + v.y * v.y);
                const sumSquaredCoeffs = c1 * c1 + c2 * c2;
                const normVApprox = Math.sqrt(sumSquaredCoeffs);

                // Display Bessel inequality
                viz.drawText('Bessel Inequality:', -6, 4.5, viz.colors.white, 14);
                viz.drawText(`Σ|⟨v,eᵢ⟩|² = ${sumSquaredCoeffs.toFixed(3)}`, -6, 3.9, viz.colors.orange, 12);
                viz.drawText(`||v||² = ${(normV * normV).toFixed(3)}`, -6, 3.3, viz.colors.blue, 12);
                viz.drawText(`||v̂||² = ${sumSquaredCoeffs.toFixed(3)} ≤ ||v||²`,
                            0, -4.5, viz.colors.purple, 12, 'center');

                const ratio = (sumSquaredCoeffs / (normV * normV)) * 100;
                viz.drawText(`Energy captured: ${ratio.toFixed(1)}%`,
                            0, -4.0, viz.colors.green, 11, 'center');

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    },,
    {
        id: 'ch13-extra-viz-3',
        title: 'Parseval Energy Conservation',
        description: 'Interactive demo showing Parseval identity: ||v||² = Σ|⟨v,eᵢ⟩|² for complete basis',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            let angle = 0;
            let animating = false;

            // Complete orthonormal basis in R²
            const basis = [
                {x: 1, y: 0, label: 'e₁'},
                {x: 0, y: 1, label: 'e₂'}
            ];

            const startButton = VizEngine.createButton(controls, 'Start/Stop Rotation', () => {
                animating = !animating;
                if (animating) animate();
            });

            function animate() {
                if (!animating) return;
                angle += 0.03;
                draw();
                requestAnimationFrame(animate);
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw basis
                basis.forEach(e => {
                    viz.drawVector(0, 0, e.x, e.y, viz.colors.green, e.label, 3);
                });

                // Rotating vector
                const v = {
                    x: 2.5 * Math.cos(angle),
                    y: 2.5 * Math.sin(angle)
                };

                viz.drawVector(0, 0, v.x, v.y, viz.colors.blue, 'v', 4);

                // Fourier coefficients
                const coeffs = basis.map(e => v.x * e.x + v.y * e.y);

                // Draw projections
                coeffs.forEach((c, i) => {
                    const e = basis[i];
                    viz.drawVector(0, 0, c * e.x, c * e.y, viz.colors.orange + '66', null, 2);
                });

                // Compute energies
                const normVSquared = v.x * v.x + v.y * v.y;
                const sumSquaredCoeffs = coeffs.reduce((sum, c) => sum + c * c, 0);

                // Energy bars
                const barWidth = 0.8;
                const barX = 5;

                // ||v||² bar
                viz.drawPolygon(
                    [[barX, 0], [barX + barWidth, 0],
                     [barX + barWidth, normVSquared / 3], [barX, normVSquared / 3]],
                    viz.colors.blue + '88',
                    viz.colors.blue,
                    2
                );
                viz.drawText('||v||²', barX + barWidth/2, -0.8, viz.colors.blue, 10, 'center');

                // Σ|cᵢ|² bar
                viz.drawPolygon(
                    [[barX - 2, 0], [barX - 2 + barWidth, 0],
                     [barX - 2 + barWidth, sumSquaredCoeffs / 3], [barX - 2, sumSquaredCoeffs / 3]],
                    viz.colors.orange + '88',
                    viz.colors.orange,
                    2
                );
                viz.drawText('Σ|cᵢ|²', barX - 2 + barWidth/2, -0.8, viz.colors.orange, 10, 'center');

                // Display values
                viz.drawText('Parseval Identity (Complete Basis):', -6, 4.5, viz.colors.white, 14);
                viz.drawText(`||v||² = ${normVSquared.toFixed(4)}`, -6, 3.9, viz.colors.blue, 12);
                viz.drawText(`Σ|⟨v,eᵢ⟩|² = ${sumSquaredCoeffs.toFixed(4)}`, -6, 3.3, viz.colors.orange, 12);

                const diff = Math.abs(normVSquared - sumSquaredCoeffs);
                viz.drawText(`Difference: ${diff.toFixed(6)} (equality!)`,
                            0, -4.5, viz.colors.green, 12, 'center');
            }

            draw();
            return viz;
        }
    }
];

// Section 4: The Riesz Representation Theorem
window.EXTRA_VIZ['ch13']['ch13-sec04'] = [
    {
        id: 'ch13-extra-viz-6',
        title: 'Riesz Representation: Functional ↔ Vector',
        description: 'Every bounded linear functional φ on Hilbert space corresponds to unique vector via φ(v) = ⟨v,w⟩',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            let functionalAngle = 0.8;

            const slider = VizEngine.createSlider(controls, 'Functional Direction', 0, 2 * Math.PI, 0.8, 0.1, (val) => {
                functionalAngle = val;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Riesz vector w corresponding to functional φ
                const w = {
                    x: 2.5 * Math.cos(functionalAngle),
                    y: 2.5 * Math.sin(functionalAngle)
                };

                // Draw the Riesz vector
                viz.drawVector(0, 0, w.x, w.y, viz.colors.orange, 'w (Riesz vector)', 4);

                // Draw level sets of the functional φ(v) = ⟨v, w⟩
                // These are lines perpendicular to w
                const perpX = -w.y;
                const perpY = w.x;
                const perpNorm = Math.sqrt(perpX * perpX + perpY * perpY);
                const perpUnit = {x: perpX / perpNorm, y: perpY / perpNorm};

                // Draw several level sets
                const wNorm = Math.sqrt(w.x * w.x + w.y * w.y);
                for (let c = -3; c <= 3; c++) {
                    const offset = c / wNorm;
                    const centerX = offset * w.x;
                    const centerY = offset * w.y;

                    const t = 8;
                    const color = (c === 0) ? viz.colors.yellow : viz.colors.teal + '66';
                    const width = (c === 0) ? 3 : 1;

                    viz.drawSegment(
                        centerX - t * perpUnit.x, centerY - t * perpUnit.y,
                        centerX + t * perpUnit.x, centerY + t * perpUnit.y,
                        color, width, c !== 0
                    );

                    if (c !== 0 && Math.abs(c) <= 2) {
                        viz.drawText(`φ=${c.toFixed(1)}`,
                                    centerX + 2 * perpUnit.x, centerY + 2 * perpUnit.y,
                                    viz.colors.teal, 9);
                    }
                }

                // Sample test vectors
                const testVectors = [
                    {x: 1.5, y: 2, label: 'v₁'},
                    {x: -2, y: 1.5, label: 'v₂'},
                    {x: 2, y: -1, label: 'v₃'}
                ];

                testVectors.forEach(v => {
                    viz.drawVector(0, 0, v.x, v.y, viz.colors.blue + 'aa', v.label, 2);

                    // Compute φ(v) = ⟨v, w⟩
                    const phiV = v.x * w.x + v.y * w.y;

                    // Draw value
                    viz.drawText(`φ(${v.label})=${phiV.toFixed(2)}`,
                                v.x + 0.3, v.y + 0.3, viz.colors.blue, 9);
                });

                // Draw kernel (null space): φ(v) = 0
                viz.drawText('ker(φ) = {v : ⟨v,w⟩ = 0} (yellow line)',
                            0, 4.5, viz.colors.yellow, 12, 'center');

                // Display Riesz info
                viz.drawText('Riesz Representation Theorem:', -6, -3.5, viz.colors.white, 13);
                viz.drawText('φ: H → ℂ bounded linear ⟺ ∃! w ∈ H s.t. φ(v) = ⟨v,w⟩',
                            -6, -4.0, viz.colors.white, 10);
                viz.drawText(`||w|| = ||φ|| = ${wNorm.toFixed(3)}`,
                            -6, -4.5, viz.colors.orange, 11);
            }

            draw();
            return viz;
        }
    },
];
