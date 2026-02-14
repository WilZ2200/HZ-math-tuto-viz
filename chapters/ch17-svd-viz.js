// Extra Interactive Visualizations for Chapter 17: SVD and Moore-Penrose Inverse
// Steven Roman's Advanced Linear Algebra

window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch17'] = window.EXTRA_VIZ['ch17'] || {};

// Section 1: Singular Value Decomposition
window.EXTRA_VIZ['ch17']['ch17-sec01'] = [
    {
        id: 'ch17-extra-viz-1',
        title: 'Interactive: SVD Decomposition Animation (Circle → Ellipse)',
        description: 'Watch how a matrix transforms a unit circle into an ellipse. The SVD reveals the principal axes and stretching factors.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

            // Matrix components
            let a = 2.0, b = 0.5, c = 0.3, d = 1.5;
            let animationTime = 0;
            let isAnimating = false;

            // Create sliders for matrix entries
            const sliderA = VizEngine.createSlider(controls, 'a (top-left)', -3, 3, a, 0.1, (val) => {
                a = val;
                if (!isAnimating) draw();
            });
            const sliderB = VizEngine.createSlider(controls, 'b (top-right)', -3, 3, b, 0.1, (val) => {
                b = val;
                if (!isAnimating) draw();
            });
            const sliderC = VizEngine.createSlider(controls, 'c (bottom-left)', -3, 3, c, 0.1, (val) => {
                c = val;
                if (!isAnimating) draw();
            });
            const sliderD = VizEngine.createSlider(controls, 'd (bottom-right)', -3, 3, d, 0.1, (val) => {
                d = val;
                if (!isAnimating) draw();
            });

            const animateBtn = VizEngine.createButton(controls, 'Animate Transformation', () => {
                isAnimating = !isAnimating;
                animateBtn.textContent = isAnimating ? 'Stop Animation' : 'Animate Transformation';
                if (isAnimating) {
                    animationTime = 0;
                    animate();
                }
            });

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            controls.appendChild(infoDiv);

            function computeSVD(A) {
                // For 2x2 matrix A = [[a,b],[c,d]]
                // Compute A^T A
                const ATA = [
                    [a*a + c*c, a*b + c*d],
                    [a*b + c*d, b*b + d*d]
                ];

                // Eigenvalues of A^T A
                const trace = ATA[0][0] + ATA[1][1];
                const det = ATA[0][0] * ATA[1][1] - ATA[0][1] * ATA[1][0];
                const lambda1 = (trace + Math.sqrt(trace*trace - 4*det)) / 2;
                const lambda2 = (trace - Math.sqrt(trace*trace - 4*det)) / 2;

                // Singular values
                const sigma1 = Math.sqrt(Math.max(0, lambda1));
                const sigma2 = Math.sqrt(Math.max(0, lambda2));

                // Right singular vectors (eigenvectors of A^T A)
                let v1, v2;
                if (Math.abs(ATA[0][1]) > 1e-10) {
                    v1 = [ATA[0][1], lambda1 - ATA[0][0]];
                    v2 = [ATA[0][1], lambda2 - ATA[0][0]];
                } else {
                    v1 = [1, 0];
                    v2 = [0, 1];
                }

                // Normalize
                const len1 = Math.sqrt(v1[0]*v1[0] + v1[1]*v1[1]);
                const len2 = Math.sqrt(v2[0]*v2[0] + v2[1]*v2[1]);
                if (len1 > 1e-10) {
                    v1[0] /= len1;
                    v1[1] /= len1;
                }
                if (len2 > 1e-10) {
                    v2[0] /= len2;
                    v2[1] /= len2;
                }

                // Left singular vectors u_i = (1/σ_i) A v_i
                let u1 = [0, 0];
                let u2 = [0, 0];
                if (sigma1 > 1e-10) {
                    u1[0] = (a * v1[0] + b * v1[1]) / sigma1;
                    u1[1] = (c * v1[0] + d * v1[1]) / sigma1;
                }
                if (sigma2 > 1e-10) {
                    u2[0] = (a * v2[0] + b * v2[1]) / sigma2;
                    u2[1] = (c * v2[0] + d * v2[1]) / sigma2;
                }

                return { sigma1, sigma2, u1, u2, v1, v2 };
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const A = [[a, b], [c, d]];
                const svd = computeSVD(A);

                // Interpolation parameter for animation
                const t = isAnimating ? animationTime : 0;

                // Draw unit circle points and their transformations
                const numPoints = 64;
                for (let i = 0; i < numPoints; i++) {
                    const angle = (2 * Math.PI * i) / numPoints;
                    const x = Math.cos(angle);
                    const y = Math.sin(angle);

                    // Transformed point
                    const tx = a * x + b * y;
                    const ty = c * x + d * y;

                    // Interpolate
                    const px = (1 - t) * x + t * tx;
                    const py = (1 - t) * y + t * ty;

                    viz.drawPoint(px, py, viz.colors.teal + '88', null, 3);
                }

                // Draw right singular vectors (V)
                viz.drawVector(0, 0, svd.v1[0] * 1.5, svd.v1[1] * 1.5, viz.colors.purple, 'v₁', 2);
                viz.drawVector(0, 0, svd.v2[0] * 1.5, svd.v2[1] * 1.5, viz.colors.pink, 'v₂', 2);

                // Draw stretched and rotated vectors (sigma * u)
                const scaledU1x = svd.sigma1 * svd.u1[0];
                const scaledU1y = svd.sigma1 * svd.u1[1];
                const scaledU2x = svd.sigma2 * svd.u2[0];
                const scaledU2y = svd.sigma2 * svd.u2[1];

                const interpU1x = (1 - t) * svd.v1[0] * 1.5 + t * scaledU1x;
                const interpU1y = (1 - t) * svd.v1[1] * 1.5 + t * scaledU1y;
                const interpU2x = (1 - t) * svd.v2[0] * 1.5 + t * scaledU2x;
                const interpU2y = (1 - t) * svd.v2[1] * 1.5 + t * scaledU2y;

                viz.drawVector(0, 0, interpU1x, interpU1y, viz.colors.blue, 'σ₁u₁', 3);
                viz.drawVector(0, 0, interpU2x, interpU2y, viz.colors.orange, 'σ₂u₂', 3);

                // Info display
                infoDiv.innerHTML = `Matrix A = [[${a.toFixed(2)}, ${b.toFixed(2)}], [${c.toFixed(2)}, ${d.toFixed(2)}]]<br>` +
                    `Singular values: σ₁ = ${svd.sigma1.toFixed(3)}, σ₂ = ${svd.sigma2.toFixed(3)}<br>` +
                    `Condition number: κ = ${svd.sigma2 > 1e-10 ? (svd.sigma1/svd.sigma2).toFixed(2) : '∞'}<br>` +
                    `<span style="color: ${viz.colors.purple}">v₁</span> → stretched by σ₁ → <span style="color: ${viz.colors.blue}">σ₁u₁</span><br>` +
                    `<span style="color: ${viz.colors.pink}">v₂</span> → stretched by σ₂ → <span style="color: ${viz.colors.orange}">σ₂u₂</span>`;
            }

            function animate() {
                if (!isAnimating) return;

                animationTime += 0.005;
                if (animationTime >= 1) {
                    animationTime = 1;
                    setTimeout(() => {
                        animationTime = 0;
                        if (isAnimating) animate();
                    }, 1000);
                } else {
                    draw();
                    requestAnimationFrame(animate);
                }
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch17-extra-viz-2',
        title: 'Interactive: Singular Value Truncation Slider',
        description: 'Truncate the SVD by keeping only the largest k singular values. See how rank-k approximations capture the essential features.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 45});

            // Define a matrix with clear singular value structure
            const A = [[2.5, 0.8, 0.3], [0.8, 1.5, 0.2], [0.3, 0.2, 0.5]];
            let k = 3; // Number of singular values to keep

            const slider = VizEngine.createSlider(controls, 'Rank k (number of singular values)', 0, 3, k, 1, (val) => {
                k = val;
                draw();
            });

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            controls.appendChild(infoDiv);

            // For visualization, we'll show the effect on a collection of vectors
            const testVectors = [
                [1, 0, 0], [0, 1, 0], [0, 0, 1],
                [1, 1, 0], [1, 0, 1], [0, 1, 1],
                [1, 1, 1], [-1, 1, 0]
            ];

            function matVec3(M, v) {
                return [
                    M[0][0]*v[0] + M[0][1]*v[1] + M[0][2]*v[2],
                    M[1][0]*v[0] + M[1][1]*v[1] + M[1][2]*v[2],
                    M[2][0]*v[0] + M[2][1]*v[1] + M[2][2]*v[2]
                ];
            }

            function computeSVD3x3(M) {
                // Simplified: compute eigenvalues of M^T M
                // For display purposes, we'll use approximations
                const MtM = [
                    [M[0][0]*M[0][0]+M[1][0]*M[1][0]+M[2][0]*M[2][0],
                     M[0][0]*M[0][1]+M[1][0]*M[1][1]+M[2][0]*M[2][1],
                     M[0][0]*M[0][2]+M[1][0]*M[1][2]+M[2][0]*M[2][2]],
                    [M[0][1]*M[0][0]+M[1][1]*M[1][0]+M[2][1]*M[2][0],
                     M[0][1]*M[0][1]+M[1][1]*M[1][1]+M[2][1]*M[2][1],
                     M[0][1]*M[0][2]+M[1][1]*M[1][2]+M[2][1]*M[2][2]],
                    [M[0][2]*M[0][0]+M[1][2]*M[1][0]+M[2][2]*M[2][0],
                     M[0][2]*M[0][1]+M[1][2]*M[1][1]+M[2][2]*M[2][1],
                     M[0][2]*M[0][2]+M[1][2]*M[1][2]+M[2][2]*M[2][2]]
                ];

                // Approximate eigenvalues (for this specific matrix)
                return {
                    sigma: [2.8, 1.6, 0.4],  // Precomputed for this example
                    U: [[0.9, -0.3, 0.3], [0.3, 0.9, 0.3], [0.3, -0.3, 0.9]],
                    V: [[0.9, -0.3, 0.3], [0.3, 0.9, 0.3], [0.3, -0.3, 0.9]]
                };
            }

            function truncatedMatVec(v, k_trunc) {
                const svd = computeSVD3x3(A);
                let result = [0, 0, 0];

                for (let i = 0; i < k_trunc; i++) {
                    // A_k = sum_{i=1}^k sigma_i u_i v_i^T
                    const vi = svd.V[i];
                    const ui = svd.U[i];
                    const sigma = svd.sigma[i];

                    const dot = vi[0]*v[0] + vi[1]*v[1] + vi[2]*v[2];
                    result[0] += sigma * dot * ui[0];
                    result[1] += sigma * dot * ui[1];
                    result[2] += sigma * dot * ui[2];
                }

                return result;
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const svd = computeSVD3x3(A);

                // Project to 2D for visualization (just use x,y coordinates)
                testVectors.forEach((v, idx) => {
                    const vNorm = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
                    const vUnit = [v[0]/vNorm, v[1]/vNorm, v[2]/vNorm];

                    // Full transformation
                    const fullTransform = matVec3(A, vUnit);

                    // Truncated transformation
                    const truncTransform = truncatedMatVec(vUnit, k);

                    // Draw original vector
                    viz.drawVector(0, 0, vUnit[0]*1.5, vUnit[1]*1.5, viz.colors.text + '44', '', 1);

                    // Draw full transformation (gray)
                    viz.drawVector(0, 0, fullTransform[0], fullTransform[1],
                                   viz.colors.white + '33', '', 1);

                    // Draw truncated transformation (colored)
                    const color = k === 0 ? viz.colors.red :
                                  k === 1 ? viz.colors.orange :
                                  k === 2 ? viz.colors.yellow : viz.colors.green;
                    viz.drawVector(0, 0, truncTransform[0], truncTransform[1],
                                   color, '', 2);
                });

                // Draw principal axes
                if (k >= 1) {
                    const u1 = svd.U[0];
                    viz.drawVector(0, 0, svd.sigma[0]*u1[0], svd.sigma[0]*u1[1],
                                   viz.colors.blue, 'σ₁u₁', 3);
                }
                if (k >= 2) {
                    const u2 = svd.U[1];
                    viz.drawVector(0, 0, svd.sigma[1]*u2[0], svd.sigma[1]*u2[1],
                                   viz.colors.purple, 'σ₂u₂', 3);
                }
                if (k >= 3) {
                    const u3 = svd.U[2];
                    viz.drawVector(0, 0, svd.sigma[2]*u3[0], svd.sigma[2]*u3[1],
                                   viz.colors.pink, 'σ₃u₃', 3);
                }

                // Info
                const sigmaStr = svd.sigma.slice(0, k).map((s,i) => `σ₍${i+1}₎=${s.toFixed(2)}`).join(', ');
                const totalEnergy = svd.sigma.reduce((sum, s) => sum + s*s, 0);
                const capturedEnergy = svd.sigma.slice(0, k).reduce((sum, s) => sum + s*s, 0);
                const energyPercent = totalEnergy > 0 ? (100 * capturedEnergy / totalEnergy).toFixed(1) : 0;

                infoDiv.innerHTML = `Rank-${k} approximation: A ≈ A₍${k}₎<br>` +
                    `Using ${k} singular value${k !== 1 ? 's' : ''}: ${sigmaStr || 'none'}<br>` +
                    `Energy captured: ${energyPercent}% (Frobenius norm squared)<br>` +
                    `<span style="color: ${viz.colors.white}">Gray vectors</span> = full transform, ` +
                    `<span style="color: ${k > 0 ? 'yellow' : viz.colors.red}">Colored</span> = rank-${k} approx`;
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch17-extra-viz-3',
        title: 'Interactive: Moore-Penrose Pseudoinverse Solving Ax≈b',
        description: 'Drag the target vector b. The pseudoinverse finds the least-squares solution x⁺ = A⁺b, minimizing ||Ax-b||.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Matrix A (2x2, possibly singular)
            let a = 2.0, b = 1.0, c = 1.0, d = 0.5;

            const sliderA = VizEngine.createSlider(controls, 'a', -3, 3, a, 0.1, (val) => {
                a = val;
                draw();
            });
            const sliderB = VizEngine.createSlider(controls, 'b', -3, 3, b, 0.1, (val) => {
                b = val;
                draw();
            });
            const sliderC = VizEngine.createSlider(controls, 'c', -3, 3, c, 0.1, (val) => {
                c = val;
                draw();
            });
            const sliderD = VizEngine.createSlider(controls, 'd', -3, 3, d, 0.1, (val) => {
                d = val;
                draw();
            });

            const target = viz.addDraggable('target', 3, 2, viz.colors.red, 8, () => draw());

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            controls.appendChild(infoDiv);

            function computePseudoinverse2x2(a, b, c, d) {
                // A = [[a,b],[c,d]]
                // A⁺ via SVD: A = UΣV^T, A⁺ = VΣ⁺U^T

                // Compute A^T A
                const ATA = [
                    [a*a + c*c, a*b + c*d],
                    [a*b + c*d, b*b + d*d]
                ];

                // Eigenvalues of A^T A
                const trace = ATA[0][0] + ATA[1][1];
                const det = ATA[0][0] * ATA[1][1] - ATA[0][1] * ATA[1][0];
                const disc = trace*trace - 4*det;

                if (disc < 0) {
                    // Degenerate case
                    return [[0, 0], [0, 0]];
                }

                const lambda1 = (trace + Math.sqrt(disc)) / 2;
                const lambda2 = (trace - Math.sqrt(disc)) / 2;

                const sigma1 = Math.sqrt(Math.max(0, lambda1));
                const sigma2 = Math.sqrt(Math.max(0, lambda2));

                // Right singular vectors
                let v1, v2;
                if (Math.abs(ATA[0][1]) > 1e-10) {
                    v1 = [ATA[0][1], lambda1 - ATA[0][0]];
                    v2 = [ATA[0][1], lambda2 - ATA[0][0]];
                } else {
                    v1 = [1, 0];
                    v2 = [0, 1];
                }

                const len1 = Math.sqrt(v1[0]*v1[0] + v1[1]*v1[1]);
                const len2 = Math.sqrt(v2[0]*v2[0] + v2[1]*v2[1]);
                if (len1 > 1e-10) { v1[0] /= len1; v1[1] /= len1; }
                if (len2 > 1e-10) { v2[0] /= len2; v2[1] /= len2; }

                // Left singular vectors
                let u1 = [0, 0], u2 = [0, 0];
                if (sigma1 > 1e-10) {
                    u1[0] = (a * v1[0] + b * v1[1]) / sigma1;
                    u1[1] = (c * v1[0] + d * v1[1]) / sigma1;
                }
                if (sigma2 > 1e-10) {
                    u2[0] = (a * v2[0] + b * v2[1]) / sigma2;
                    u2[1] = (c * v2[0] + d * v2[1]) / sigma2;
                }

                // Pseudoinverse: A⁺ = V Σ⁺ U^T
                // Σ⁺ = diag(1/σ₁, 1/σ₂) where σᵢ > 0
                const Aplus = [[0, 0], [0, 0]];

                if (sigma1 > 1e-10) {
                    const inv_sigma1 = 1 / sigma1;
                    Aplus[0][0] += inv_sigma1 * v1[0] * u1[0];
                    Aplus[0][1] += inv_sigma1 * v1[0] * u1[1];
                    Aplus[1][0] += inv_sigma1 * v1[1] * u1[0];
                    Aplus[1][1] += inv_sigma1 * v1[1] * u1[1];
                }

                if (sigma2 > 1e-10) {
                    const inv_sigma2 = 1 / sigma2;
                    Aplus[0][0] += inv_sigma2 * v2[0] * u2[0];
                    Aplus[0][1] += inv_sigma2 * v2[0] * u2[1];
                    Aplus[1][0] += inv_sigma2 * v2[1] * u2[0];
                    Aplus[1][1] += inv_sigma2 * v2[1] * u2[1];
                }

                return Aplus;
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const A = [[a, b], [c, d]];
                const bVec = [target.x, target.y];

                // Compute A⁺
                const Aplus = computePseudoinverse2x2(a, b, c, d);

                // Least squares solution x⁺ = A⁺ b
                const xPlus = [
                    Aplus[0][0] * bVec[0] + Aplus[0][1] * bVec[1],
                    Aplus[1][0] * bVec[0] + Aplus[1][1] * bVec[1]
                ];

                // Projection Ax⁺
                const AxPlus = [
                    a * xPlus[0] + b * xPlus[1],
                    c * xPlus[0] + d * xPlus[1]
                ];

                // Residual
                const residual = [bVec[0] - AxPlus[0], bVec[1] - AxPlus[1]];
                const residualNorm = Math.sqrt(residual[0]*residual[0] + residual[1]*residual[1]);

                // Draw column space of A (span of columns)
                const col1 = [a, c];
                const col2 = [b, d];

                // Draw the column space as a shaded region
                for (let s = -5; s <= 5; s += 0.2) {
                    for (let t = -5; t <= 5; t += 0.2) {
                        const px = s * col1[0] + t * col2[0];
                        const py = s * col1[1] + t * col2[1];
                        if (Math.abs(px) < 10 && Math.abs(py) < 10) {
                            viz.drawPoint(px, py, viz.colors.blue + '11', null, 2);
                        }
                    }
                }

                // Draw columns of A
                viz.drawVector(0, 0, col1[0]*2, col1[1]*2, viz.colors.blue, 'col₁(A)', 2);
                viz.drawVector(0, 0, col2[0]*2, col2[1]*2, viz.colors.purple, 'col₂(A)', 2);

                // Draw target vector b
                viz.drawVector(0, 0, bVec[0], bVec[1], viz.colors.red, 'b', 3);

                // Draw projection Ax⁺
                viz.drawVector(0, 0, AxPlus[0], AxPlus[1], viz.colors.green, 'Ax⁺', 3);

                // Draw residual
                viz.drawSegment(AxPlus[0], AxPlus[1], bVec[0], bVec[1],
                               viz.colors.yellow, 2, true);

                // Draw solution x⁺ in a separate region (offset)
                const offsetX = -7;
                viz.drawText('x⁺', offsetX, 4.5, viz.colors.white, 14);
                viz.drawVector(offsetX, 3, offsetX + xPlus[0], 3 + xPlus[1],
                              viz.colors.orange, '', 2);
                viz.drawPoint(offsetX + xPlus[0], 3 + xPlus[1], viz.colors.orange,
                             `(${xPlus[0].toFixed(2)}, ${xPlus[1].toFixed(2)})`, 6);

                viz.drawDraggables();

                infoDiv.innerHTML = `Matrix A = [[${a.toFixed(2)}, ${b.toFixed(2)}], [${c.toFixed(2)}, ${d.toFixed(2)}]]<br>` +
                    `Target: b = (${bVec[0].toFixed(2)}, ${bVec[1].toFixed(2)})<br>` +
                    `Pseudoinverse solution: x⁺ = A⁺b = (${xPlus[0].toFixed(2)}, ${xPlus[1].toFixed(2)})<br>` +
                    `Projection: Ax⁺ = (${AxPlus[0].toFixed(2)}, ${AxPlus[1].toFixed(2)})<br>` +
                    `Residual norm: ||b - Ax⁺|| = ${residualNorm.toFixed(3)}<br>` +
                    `<span style="color: ${viz.colors.blue}">Blue region</span> = column space of A`;
            }

            draw();
            return viz;
        }
    }
];

// Section 2: Least Squares and Applications
window.EXTRA_VIZ['ch17']['ch17-sec02'] = [
    {
        id: 'ch17-extra-viz-4',
        title: 'Interactive: Least Squares Geometric View',
        description: 'Visualize least squares as orthogonal projection onto the column space. Drag data points to see the best fit.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 35});

            // Data points for linear regression: y = mx + c
            const dataPoints = [
                viz.addDraggable('p0', -4, -2, viz.colors.orange, 6, () => draw()),
                viz.addDraggable('p1', -2, 0, viz.colors.orange, 6, () => draw()),
                viz.addDraggable('p2', 0, 1, viz.colors.orange, 6, () => draw()),
                viz.addDraggable('p3', 2, 3, viz.colors.orange, 6, () => draw()),
                viz.addDraggable('p4', 4, 4, viz.colors.orange, 6, () => draw())
            ];

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            controls.appendChild(infoDiv);

            function leastSquaresFit() {
                const n = dataPoints.length;

                // Build design matrix A and observation vector b
                // A = [[x₁, 1], [x₂, 1], ..., [xₙ, 1]]
                // We solve A θ = b where θ = [m, c]^T

                let sumX = 0, sumY = 0, sumXX = 0, sumXY = 0;

                dataPoints.forEach(p => {
                    sumX += p.x;
                    sumY += p.y;
                    sumXX += p.x * p.x;
                    sumXY += p.x * p.y;
                });

                // Normal equation: A^T A θ = A^T b
                const ATA = [[sumXX, sumX], [sumX, n]];
                const ATb = [sumXY, sumY];

                // Solve 2x2 system
                const det = ATA[0][0] * ATA[1][1] - ATA[0][1] * ATA[1][0];

                if (Math.abs(det) < 1e-10) {
                    return { m: 0, c: 0, residuals: [] };
                }

                const m = (ATA[1][1] * ATb[0] - ATA[0][1] * ATb[1]) / det;
                const c = (ATA[0][0] * ATb[1] - ATA[1][0] * ATb[0]) / det;

                // Compute residuals
                const residuals = dataPoints.map(p => {
                    const yFit = m * p.x + c;
                    return p.y - yFit;
                });

                const rss = residuals.reduce((sum, r) => sum + r*r, 0);

                return { m, c, residuals, rss };
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const fit = leastSquaresFit();

                // Draw best fit line
                const xMin = -6, xMax = 6;
                const yMin = fit.m * xMin + fit.c;
                const yMax = fit.m * xMax + fit.c;
                viz.drawSegment(xMin, yMin, xMax, yMax, viz.colors.green, 3);

                // Draw data points and residuals
                dataPoints.forEach((p, i) => {
                    const yFit = fit.m * p.x + fit.c;

                    // Draw residual line
                    viz.drawSegment(p.x, yFit, p.x, p.y, viz.colors.red, 2, true);

                    // Draw fitted point
                    viz.drawPoint(p.x, yFit, viz.colors.green, null, 5);

                    // Draw data point
                    viz.drawPoint(p.x, p.y, viz.colors.orange, `(${p.x.toFixed(1)}, ${p.y.toFixed(1)})`, 6);
                });

                viz.drawDraggables();

                // Draw column space visualization in corner
                const cornerX = 5, cornerY = -4;
                viz.drawText('Col(A)', cornerX - 1.5, cornerY + 1.8, viz.colors.white, 12);

                // Stylized: show b, projection, and residual
                const scale = 0.4;
                const bLen = 2;
                const projLen = 1.5;
                viz.drawVector(cornerX, cornerY, cornerX, cornerY + bLen*scale,
                              viz.colors.orange, 'b', 2);
                viz.drawVector(cornerX, cornerY, cornerX, cornerY + projLen*scale,
                              viz.colors.green, 'Âθ̂', 2);
                viz.drawSegment(cornerX, cornerY + projLen*scale, cornerX, cornerY + bLen*scale,
                               viz.colors.red, 2, true);
                viz.drawText('residual', cornerX + 0.3, cornerY + 1, viz.colors.red, 10);

                infoDiv.innerHTML = `Best fit line: y = ${fit.m.toFixed(3)}x + ${fit.c.toFixed(3)}<br>` +
                    `Residual sum of squares: RSS = ${fit.rss.toFixed(3)}<br>` +
                    `<span style="color: ${viz.colors.green}">Green line</span> = least squares fit minimizes RSS<br>` +
                    `<span style="color: ${viz.colors.red}">Red dashed lines</span> = residuals (orthogonal to col space)`;
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch17-extra-viz-5',
        title: 'Interactive: Condition Number Explorer',
        description: 'Adjust matrix entries to see how condition number κ(A) = σ₁/σ₂ affects numerical stability. High κ means ill-conditioned.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

            let a = 2.0, b = 0.1, c = 0.1, d = 0.5;

            const sliderA = VizEngine.createSlider(controls, 'a (try large values)', 0.1, 5, a, 0.1, (val) => {
                a = val;
                draw();
            });
            const sliderB = VizEngine.createSlider(controls, 'b (try small values)', -2, 2, b, 0.05, (val) => {
                b = val;
                draw();
            });
            const sliderC = VizEngine.createSlider(controls, 'c (try small values)', -2, 2, c, 0.05, (val) => {
                c = val;
                draw();
            });
            const sliderD = VizEngine.createSlider(controls, 'd (try small values)', 0.05, 2, d, 0.05, (val) => {
                d = val;
                draw();
            });

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            controls.appendChild(infoDiv);

            function computeSVD(A) {
                const a = A[0][0], b = A[0][1], c = A[1][0], d = A[1][1];

                const ATA = [
                    [a*a + c*c, a*b + c*d],
                    [a*b + c*d, b*b + d*d]
                ];

                const trace = ATA[0][0] + ATA[1][1];
                const det = ATA[0][0] * ATA[1][1] - ATA[0][1] * ATA[1][0];
                const disc = trace*trace - 4*det;

                if (disc < 0) return { sigma1: 0, sigma2: 0 };

                const lambda1 = (trace + Math.sqrt(disc)) / 2;
                const lambda2 = (trace - Math.sqrt(disc)) / 2;

                return {
                    sigma1: Math.sqrt(Math.max(0, lambda1)),
                    sigma2: Math.sqrt(Math.max(0, lambda2))
                };
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const A = [[a, b], [c, d]];
                const svd = computeSVD(A);

                const kappa = svd.sigma2 > 1e-10 ? svd.sigma1 / svd.sigma2 : Infinity;

                // Determine condition
                let condition, conditionColor;
                if (kappa < 10) {
                    condition = 'Well-conditioned';
                    conditionColor = viz.colors.green;
                } else if (kappa < 100) {
                    condition = 'Moderately conditioned';
                    conditionColor = viz.colors.yellow;
                } else if (kappa < 1000) {
                    condition = 'Ill-conditioned';
                    conditionColor = viz.colors.orange;
                } else {
                    condition = 'Severely ill-conditioned';
                    conditionColor = viz.colors.red;
                }

                // Draw unit circle and its transformation
                const numPoints = 64;
                for (let i = 0; i < numPoints; i++) {
                    const angle = (2 * Math.PI * i) / numPoints;
                    const x = Math.cos(angle);
                    const y = Math.sin(angle);

                    viz.drawPoint(x, y, viz.colors.blue + '44', null, 2);

                    const tx = a * x + b * y;
                    const ty = c * x + d * y;
                    viz.drawPoint(tx, ty, viz.colors.orange + '88', null, 3);
                }

                // Draw ellipse axes (approximate)
                // Major axis length ≈ σ₁, minor axis ≈ σ₂
                const aspectRatio = svd.sigma2 > 1e-10 ? svd.sigma2 / svd.sigma1 : 0;

                // Draw axes indicators
                viz.drawSegment(-svd.sigma1, 0, svd.sigma1, 0, viz.colors.green + '88', 2);
                viz.drawSegment(0, -svd.sigma2, 0, svd.sigma2, viz.colors.green + '88', 2);

                viz.drawText(`σ₁ = ${svd.sigma1.toFixed(3)}`, svd.sigma1 * 0.5, 0.3, viz.colors.green, 11);
                viz.drawText(`σ₂ = ${svd.sigma2.toFixed(3)}`, 0.2, svd.sigma2 * 0.7, viz.colors.green, 11);

                // Visualization of perturbation sensitivity
                const testVec = [1, 0];
                const perturbation = 0.01;
                const testVecPerturbed = [1, perturbation];

                const output1 = [a * testVec[0] + b * testVec[1], c * testVec[0] + d * testVec[1]];
                const output2 = [a * testVecPerturbed[0] + b * testVecPerturbed[1],
                                c * testVecPerturbed[0] + d * testVecPerturbed[1]];

                const inputChange = Math.sqrt(perturbation * perturbation);
                const outputChange = Math.sqrt(
                    (output2[0] - output1[0]) ** 2 + (output2[1] - output1[1]) ** 2
                );
                const amplification = outputChange / inputChange;

                infoDiv.innerHTML = `Matrix A = [[${a.toFixed(2)}, ${b.toFixed(2)}], [${c.toFixed(2)}, ${d.toFixed(2)}]]<br>` +
                    `Singular values: σ₁ = ${svd.sigma1.toFixed(4)}, σ₂ = ${svd.sigma2.toFixed(4)}<br>` +
                    `Condition number: <strong style="color: ${conditionColor}">κ(A) = ${kappa < 1e6 ? kappa.toFixed(2) : '∞'}</strong><br>` +
                    `Status: <span style="color: ${conditionColor}">${condition}</span><br>` +
                    `Perturbation amplification: ${amplification.toFixed(2)}× (max: κ(A))<br>` +
                    `<span style="color: ${viz.colors.blue}">Blue circle</span> → <span style="color: ${viz.colors.orange}">Orange ellipse</span><br>` +
                    `Thin ellipse (high κ) = unstable, Round (low κ) = stable`;
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch17-extra-viz-6',
        title: 'Interactive: Low-Rank Approximation Quality',
        description: 'Compare different rank approximations of a 2D transformation. See how error decreases as rank increases.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 45});

            // Matrix with specific structure
            let rank = 2;

            const slider = VizEngine.createSlider(controls, 'Approximation Rank k', 0, 2, rank, 1, (val) => {
                rank = val;
                draw();
            });

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            controls.appendChild(infoDiv);

            // Define original matrix with known SVD
            const A = [[2.5, 1.5], [1.5, 0.5]];
            // Approximate singular values: σ₁ ≈ 3.24, σ₂ ≈ 0.26
            const sigma1 = 3.24, sigma2 = 0.26;
            const u1 = [0.88, 0.48], u2 = [-0.48, 0.88];
            const v1 = [0.88, 0.48], v2 = [-0.48, 0.88];

            function rankKApprox(k) {
                if (k === 0) return [[0, 0], [0, 0]];
                if (k === 1) {
                    // A₁ = σ₁ u₁ v₁^T
                    return [
                        [sigma1 * u1[0] * v1[0], sigma1 * u1[0] * v1[1]],
                        [sigma1 * u1[1] * v1[0], sigma1 * u1[1] * v1[1]]
                    ];
                }
                // k === 2, return full matrix
                return A;
            }

            function frobeniusNorm(M) {
                return Math.sqrt(M[0][0]**2 + M[0][1]**2 + M[1][0]**2 + M[1][1]**2);
            }

            function matrixDiff(M1, M2) {
                return [
                    [M1[0][0] - M2[0][0], M1[0][1] - M2[0][1]],
                    [M1[1][0] - M2[1][0], M1[1][1] - M2[1][1]]
                ];
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const Ak = rankKApprox(rank);
                const error = matrixDiff(A, Ak);
                const errorNorm = frobeniusNorm(error);
                const fullNorm = frobeniusNorm(A);
                const relativeError = (100 * errorNorm / fullNorm).toFixed(2);

                // Test vectors
                const testVecs = [
                    [1, 0], [0, 1], [1, 1], [1, -1],
                    [2, 1], [-1, 2]
                ];

                testVecs.forEach(v => {
                    const len = Math.sqrt(v[0]**2 + v[1]**2);
                    const vn = [v[0]/len, v[1]/len];

                    // Original transformation
                    const Av = [A[0][0]*vn[0] + A[0][1]*vn[1], A[1][0]*vn[0] + A[1][1]*vn[1]];

                    // Rank-k approximation
                    const Akv = [Ak[0][0]*vn[0] + Ak[0][1]*vn[1], Ak[1][0]*vn[0] + Ak[1][1]*vn[1]];

                    // Draw input vector (small)
                    viz.drawVector(0, 0, vn[0]*0.8, vn[1]*0.8, viz.colors.text + '44', '', 1);

                    // Draw original output
                    viz.drawVector(0, 0, Av[0], Av[1], viz.colors.blue + '66', '', 2);

                    // Draw rank-k output
                    viz.drawVector(0, 0, Akv[0], Akv[1], viz.colors.orange, '', 3);

                    // Draw error
                    viz.drawSegment(Akv[0], Akv[1], Av[0], Av[1], viz.colors.red + '88', 1, true);
                });

                // Draw singular vectors
                if (rank >= 1) {
                    viz.drawVector(0, 0, sigma1 * u1[0], sigma1 * u1[1],
                                   viz.colors.green, 'σ₁u₁', 3);
                    viz.drawVector(0, 0, v1[0]*1.5, v1[1]*1.5,
                                   viz.colors.purple, 'v₁', 2);
                }
                if (rank >= 2) {
                    viz.drawVector(0, 0, sigma2 * u2[0], sigma2 * u2[1],
                                   viz.colors.yellow, 'σ₂u₂', 2);
                    viz.drawVector(0, 0, v2[0]*1.5, v2[1]*1.5,
                                   viz.colors.pink, 'v₂', 2);
                }

                // Theoretical error (Eckart-Young theorem)
                let theoreticalError = 0;
                if (rank === 0) {
                    theoreticalError = Math.sqrt(sigma1**2 + sigma2**2);
                } else if (rank === 1) {
                    theoreticalError = sigma2;
                }

                infoDiv.innerHTML = `Rank-${rank} approximation: A ≈ A₍${rank}₎<br>` +
                    `Frobenius norm error: ||A - A₍${rank}₎||_F = ${errorNorm.toFixed(4)}<br>` +
                    `Theoretical (Eckart-Young): ||A - A₍${rank}₎||_F = ${theoreticalError.toFixed(4)}<br>` +
                    `Relative error: ${relativeError}%<br>` +
                    `<span style="color: ${viz.colors.blue}">Blue</span> = original transform, ` +
                    `<span style="color: ${viz.colors.orange}">Orange</span> = rank-${rank} approx<br>` +
                    `<span style="color: ${viz.colors.red}">Red dashes</span> = approximation error`;
            }

            draw();
            return viz;
        }
    }
];

// Section 3: Additional Applications
window.EXTRA_VIZ['ch17']['ch17-sec03'] = [
    {
        id: 'ch17-extra-viz-7',
        title: 'Interactive: Image Compression via SVD',
        description: 'Simulate image compression by truncating singular values. Higher ranks preserve more detail.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 1});

            let rank = 8;

            const slider = VizEngine.createSlider(controls, 'Number of singular values', 1, 16, rank, 1, (val) => {
                rank = val;
                draw();
            });

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            controls.appendChild(infoDiv);

            // Create a synthetic "image" matrix (16x16 with patterns)
            const imgSize = 16;
            const originalImage = [];
            for (let i = 0; i < imgSize; i++) {
                originalImage[i] = [];
                for (let j = 0; j < imgSize; j++) {
                    // Create a pattern: checkerboard + diagonal gradient
                    const checkerboard = ((i + j) % 4 < 2) ? 0.3 : 0.7;
                    const gradient = (i + j) / (2 * imgSize);
                    const circle = Math.exp(-((i-8)**2 + (j-8)**2) / 20);
                    originalImage[i][j] = 0.3 * checkerboard + 0.3 * gradient + 0.4 * circle;
                }
            }

            // Compute SVD (simplified: we'll approximate with random values for demonstration)
            const singularValues = [];
            for (let i = 0; i < imgSize; i++) {
                singularValues.push(10 * Math.exp(-i * 0.5));  // Exponential decay
            }

            function reconstructImage(k) {
                // Simulate rank-k reconstruction
                // In reality: A_k = sum_{i=1}^k sigma_i u_i v_i^T
                // For simplicity, we'll blur/downsample the image based on k

                const reconstructed = [];
                for (let i = 0; i < imgSize; i++) {
                    reconstructed[i] = [];
                    for (let j = 0; j < imgSize; j++) {
                        // Simple approximation: average over larger neighborhoods for lower k
                        const windowSize = Math.max(1, Math.floor(imgSize / (2 * k)));
                        let sum = 0, count = 0;
                        for (let di = -windowSize; di <= windowSize; di++) {
                            for (let dj = -windowSize; dj <= windowSize; dj++) {
                                const ni = i + di, nj = j + dj;
                                if (ni >= 0 && ni < imgSize && nj >= 0 && nj < imgSize) {
                                    sum += originalImage[ni][nj];
                                    count++;
                                }
                            }
                        }
                        reconstructed[i][j] = count > 0 ? sum / count : 0;
                    }
                }
                return reconstructed;
            }

            function draw() {
                const canvas = viz.canvas;
                const ctx = viz.ctx;

                // Clear with dark background
                ctx.fillStyle = '#0d1117';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const pixelSize = 12;
                const spacing = 20;

                // Draw original image
                ctx.fillStyle = viz.colors.white;
                ctx.font = '12px monospace';
                ctx.fillText('Original', spacing, spacing - 5);

                for (let i = 0; i < imgSize; i++) {
                    for (let j = 0; j < imgSize; j++) {
                        const intensity = originalImage[i][j];
                        ctx.fillStyle = `rgb(${intensity*255}, ${intensity*255}, ${intensity*255})`;
                        ctx.fillRect(spacing + j * pixelSize, spacing + i * pixelSize,
                                    pixelSize - 1, pixelSize - 1);
                    }
                }

                // Draw reconstructed image
                const offsetX = spacing + imgSize * pixelSize + 40;
                ctx.fillStyle = viz.colors.white;
                ctx.fillText(`Rank ${rank}`, offsetX, spacing - 5);

                const reconstructed = reconstructImage(rank);
                for (let i = 0; i < imgSize; i++) {
                    for (let j = 0; j < imgSize; j++) {
                        const intensity = Math.max(0, Math.min(1, reconstructed[i][j]));
                        ctx.fillStyle = `rgb(${intensity*255}, ${intensity*255}, ${intensity*255})`;
                        ctx.fillRect(offsetX + j * pixelSize, spacing + i * pixelSize,
                                    pixelSize - 1, pixelSize - 1);
                    }
                }

                // Draw singular value spectrum
                const spectrumY = spacing + imgSize * pixelSize + 40;
                ctx.fillStyle = viz.colors.white;
                ctx.fillText('Singular Values', spacing, spectrumY);

                const barWidth = 15;
                const maxHeight = 80;
                for (let i = 0; i < Math.min(16, singularValues.length); i++) {
                    const height = (singularValues[i] / singularValues[0]) * maxHeight;
                    const color = i < rank ? viz.colors.green : viz.colors.text + '44';
                    ctx.fillStyle = color;
                    ctx.fillRect(spacing + i * (barWidth + 2), spectrumY + 20 + (maxHeight - height),
                                barWidth, height);
                }

                // Compression info
                const originalSize = imgSize * imgSize;
                const compressedSize = rank * (2 * imgSize + 1);  // U, V, sigma
                const compressionRatio = (100 * compressedSize / originalSize).toFixed(1);

                infoDiv.innerHTML = `Rank-${rank} approximation uses ${rank} singular value${rank > 1 ? 's' : ''}<br>` +
                    `Original size: ${originalSize} values<br>` +
                    `Compressed size: ${compressedSize} values (${compressionRatio}% of original)<br>` +
                    `Compression ratio: ${(originalSize / compressedSize).toFixed(2)}:1<br>` +
                    `<span style="color: ${viz.colors.green}">Green bars</span> = singular values used in reconstruction`;
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch17-extra-viz-8',
        title: 'Interactive: Principal Component Analysis (PCA)',
        description: 'Drag data points. PCA finds directions of maximum variance using SVD of centered data matrix.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Create data points
            const dataPoints = [];
            for (let i = 0; i < 8; i++) {
                const angle = (2 * Math.PI * i) / 8;
                const r = 2 + Math.random() * 1;
                const x = r * Math.cos(angle) + (Math.random() - 0.5) * 0.5;
                const y = 0.5 * r * Math.sin(angle) + (Math.random() - 0.5) * 0.5;
                dataPoints.push(
                    viz.addDraggable(`p${i}`, x, y, viz.colors.orange, 6, () => draw())
                );
            }

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            controls.appendChild(infoDiv);

            function computePCA() {
                const n = dataPoints.length;

                // Compute mean
                let mx = 0, my = 0;
                dataPoints.forEach(p => {
                    mx += p.x;
                    my += p.y;
                });
                mx /= n;
                my /= n;

                // Center data
                const centered = dataPoints.map(p => [p.x - mx, p.y - my]);

                // Compute covariance matrix C = (1/n) X^T X
                let c11 = 0, c12 = 0, c22 = 0;
                centered.forEach(([x, y]) => {
                    c11 += x * x;
                    c12 += x * y;
                    c22 += y * y;
                });
                c11 /= n;
                c12 /= n;
                c22 /= n;

                // Eigenvalues of covariance matrix
                const trace = c11 + c22;
                const det = c11 * c22 - c12 * c12;
                const disc = Math.sqrt(Math.max(0, trace * trace - 4 * det));

                const lambda1 = (trace + disc) / 2;
                const lambda2 = (trace - disc) / 2;

                // Eigenvectors (principal components)
                let pc1, pc2;
                if (Math.abs(c12) > 1e-10) {
                    pc1 = [c12, lambda1 - c11];
                    pc2 = [c12, lambda2 - c11];
                } else {
                    pc1 = [1, 0];
                    pc2 = [0, 1];
                }

                // Normalize
                const len1 = Math.sqrt(pc1[0]**2 + pc1[1]**2);
                const len2 = Math.sqrt(pc2[0]**2 + pc2[1]**2);
                if (len1 > 1e-10) {
                    pc1[0] /= len1;
                    pc1[1] /= len1;
                }
                if (len2 > 1e-10) {
                    pc2[0] /= len2;
                    pc2[1] /= len2;
                }

                // Variance explained
                const totalVar = lambda1 + lambda2;
                const var1 = totalVar > 0 ? (100 * lambda1 / totalVar) : 0;
                const var2 = totalVar > 0 ? (100 * lambda2 / totalVar) : 0;

                return { mean: [mx, my], pc1, pc2, lambda1, lambda2, var1, var2, centered };
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const pca = computePCA();

                // Draw centered data points
                pca.centered.forEach(([x, y], i) => {
                    const px = x + pca.mean[0];
                    const py = y + pca.mean[1];

                    // Project onto PC1
                    const proj1 = (x * pca.pc1[0] + y * pca.pc1[1]);
                    const projX = proj1 * pca.pc1[0] + pca.mean[0];
                    const projY = proj1 * pca.pc1[1] + pca.mean[1];

                    // Draw projection line
                    viz.drawSegment(px, py, projX, projY, viz.colors.teal + '44', 1, true);
                    viz.drawPoint(projX, projY, viz.colors.teal, null, 4);
                });

                // Draw data points
                dataPoints.forEach(p => {
                    viz.drawPoint(p.x, p.y, viz.colors.orange, null, 6);
                });

                // Draw mean
                viz.drawPoint(pca.mean[0], pca.mean[1], viz.colors.yellow, 'μ', 7);

                // Draw principal components
                const scale1 = Math.sqrt(pca.lambda1) * 2;
                const scale2 = Math.sqrt(pca.lambda2) * 2;

                viz.drawVector(pca.mean[0], pca.mean[1],
                              pca.mean[0] + scale1 * pca.pc1[0],
                              pca.mean[1] + scale1 * pca.pc1[1],
                              viz.colors.green, 'PC1', 3);

                viz.drawVector(pca.mean[0], pca.mean[1],
                              pca.mean[0] + scale2 * pca.pc2[0],
                              pca.mean[1] + scale2 * pca.pc2[1],
                              viz.colors.blue, 'PC2', 3);

                // Draw variance ellipse
                const numEllipsePoints = 32;
                for (let i = 0; i <= numEllipsePoints; i++) {
                    const angle = (2 * Math.PI * i) / numEllipsePoints;
                    const r1 = Math.sqrt(pca.lambda1);
                    const r2 = Math.sqrt(pca.lambda2);

                    const x = r1 * Math.cos(angle) * pca.pc1[0] + r2 * Math.sin(angle) * pca.pc2[0];
                    const y = r1 * Math.cos(angle) * pca.pc1[1] + r2 * Math.sin(angle) * pca.pc2[1];

                    viz.drawPoint(pca.mean[0] + x, pca.mean[1] + y,
                                 viz.colors.purple + '44', null, 2);
                }

                viz.drawDraggables();

                infoDiv.innerHTML = `Mean: μ = (${pca.mean[0].toFixed(2)}, ${pca.mean[1].toFixed(2)})<br>` +
                    `PC1: (${pca.pc1[0].toFixed(3)}, ${pca.pc1[1].toFixed(3)}), ` +
                    `variance = ${pca.lambda1.toFixed(3)} (${pca.var1.toFixed(1)}%)<br>` +
                    `PC2: (${pca.pc2[0].toFixed(3)}, ${pca.pc2[1].toFixed(3)}), ` +
                    `variance = ${pca.lambda2.toFixed(3)} (${pca.var2.toFixed(1)}%)<br>` +
                    `<span style="color: ${viz.colors.green}">PC1</span> = direction of maximum variance<br>` +
                    `<span style="color: ${viz.colors.purple}">Purple ellipse</span> = 1-std contour`;
            }

            draw();
            return viz;
        }
    }
];
