window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch11'] = window.EXTRA_VIZ['ch11'] || {};

// Section 1: Bilinear Forms and Quadratic Forms
window.EXTRA_VIZ['ch11']['ch11-sec01'] = [
    {
        id: 'ch11-extra-viz-1',
        title: 'Interactive Quadratic Form Contour Plot',
        description: 'Drag matrix entries to see how Q(x,y) = ax² + bxy + cy² changes. Watch level curves transform in real-time.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Matrix entries (for symmetric matrix [[a, b/2], [b/2, c]])
            let a = 1, b = 0, c = 1;  // starts as x² + y² (elliptic)

            const sliderA = VizEngine.createSlider(controls, 'a (x² coeff)', -3, 3, a, 0.1, (val) => {
                a = val;
                draw();
            });

            const sliderB = VizEngine.createSlider(controls, 'b (xy coeff)', -3, 3, b, 0.1, (val) => {
                b = val;
                draw();
            });

            const sliderC = VizEngine.createSlider(controls, 'c (y² coeff)', -3, 3, c, 0.1, (val) => {
                c = val;
                draw();
            });

            function quadraticForm(x, y) {
                return a * x * x + b * x * y + c * y * y;
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw contour lines for Q(x,y) = k
                const levels = [-6, -4, -2, -1, -0.5, 0.5, 1, 2, 4, 6];
                const resolution = 100;

                for (let level of levels) {
                    const points = [];
                    // Use marching squares-like approach
                    for (let i = 0; i < resolution; i++) {
                        const angle = (i / resolution) * 2 * Math.PI;
                        // Try to find points on the contour
                        for (let r = 0.1; r < 8; r += 0.1) {
                            const x = r * Math.cos(angle);
                            const y = r * Math.sin(angle);
                            const val = quadraticForm(x, y);
                            if (Math.abs(val - level) < 0.15) {
                                points.push([x, y]);
                                break;
                            }
                        }
                    }

                    if (points.length > 3) {
                        const color = level === 0 ? viz.colors.yellow :
                                    (level > 0 ? viz.colors.blue : viz.colors.red);
                        for (let i = 0; i < points.length - 1; i++) {
                            viz.drawSegment(points[i][0], points[i][1],
                                          points[i+1][0], points[i+1][1],
                                          color + '88', 1.5);
                        }
                    }
                }

                // Show gradient direction at a sample point
                const px = 2, py = 1;
                const gradX = 2 * a * px + b * py;
                const gradY = b * px + 2 * c * py;
                const gradLen = Math.sqrt(gradX * gradX + gradY * gradY);
                if (gradLen > 0.01) {
                    viz.drawVector(px, py, px + gradX/gradLen * 0.8, py + gradY/gradLen * 0.8,
                                 viz.colors.orange, '∇Q');
                }

                // Compute signature
                const det = a * c - (b/2) * (b/2);
                const trace = a + c;
                let signature = '';
                if (Math.abs(det) < 0.01) {
                    signature = 'Degenerate (det≈0)';
                } else if (det > 0 && trace > 0) {
                    signature = 'Positive definite (p=2,q=0)';
                } else if (det > 0 && trace < 0) {
                    signature = 'Negative definite (p=0,q=2)';
                } else if (det < 0) {
                    signature = 'Indefinite (p=1,q=1)';
                } else {
                    signature = 'Semidefinite';
                }

                viz.drawText(`Q(x,y) = ${a.toFixed(1)}x² + ${b.toFixed(1)}xy + ${c.toFixed(1)}y²`,
                           -6.5, 4.8, viz.colors.white, 13);
                viz.drawText(signature, -6.5, 4.2, viz.colors.teal, 13);
                viz.drawText(`det = ${det.toFixed(2)}`, -6.5, 3.6, viz.colors.text, 11);
            }

            draw();
            return viz;
        }
    },
    {
        id: 'ch11-extra-viz-2',
        title: 'Bilinear Form as Oriented Area',
        description: 'Drag vectors u and v to see B(u,v) as signed area of parallelogram (for alternating forms)',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

            const u = viz.addDraggable('u', 2, 1, viz.colors.blue, 8, () => draw());
            const v = viz.addDraggable('v', 1, 2.5, viz.colors.orange, 8, () => draw());

            let formType = 0; // 0: standard symplectic, 1: symmetric, 2: custom

            const typeBtn = VizEngine.createButton(controls, 'Toggle Form Type', () => {
                formType = (formType + 1) % 3;
                draw();
            });

            function bilinearForm(u, v) {
                if (formType === 0) {
                    // Standard symplectic form: B(u,v) = u₁v₂ - u₂v₁ (determinant)
                    return u.x * v.y - u.y * v.x;
                } else if (formType === 1) {
                    // Symmetric form: B(u,v) = u₁v₁ + u₂v₂ (dot product)
                    return u.x * v.x + u.y * v.y;
                } else {
                    // Custom: B(u,v) = 2u₁v₁ + u₁v₂ + u₂v₁
                    return 2 * u.x * v.x + u.x * v.y + u.y * v.x;
                }
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw parallelogram if symplectic
                if (formType === 0) {
                    const parallelogram = [
                        [0, 0],
                        [u.x, u.y],
                        [u.x + v.x, u.y + v.y],
                        [v.x, v.y]
                    ];
                    const area = bilinearForm(u, v);
                    const fillColor = area >= 0 ? viz.colors.teal + '33' : viz.colors.red + '33';
                    viz.drawPolygon(parallelogram, fillColor, viz.colors.white + '66', 2);
                }

                // Draw vectors
                viz.drawVector(0, 0, u.x, u.y, viz.colors.blue, 'u', 3);
                viz.drawVector(0, 0, v.x, v.y, viz.colors.orange, 'v', 3);

                // Draw resultant for symmetric case
                if (formType === 1) {
                    viz.drawVector(0, 0, u.x + v.x, u.y + v.y, viz.colors.purple + '66', 'u+v', 2);
                    // Draw projection visualization
                    const proj = VizEngine.proj([u.x, u.y], [v.x, v.y]);
                    viz.drawSegment(v.x, v.y, proj[0], proj[1], viz.colors.yellow + '88', 2, true);
                }

                viz.drawDraggables();

                // Display B(u,v)
                const value = bilinearForm(u, v);
                const formNames = ['Symplectic (det)', 'Symmetric (dot)', 'Custom'];
                viz.drawText(`Form: ${formNames[formType]}`, -5.2, 3.8, viz.colors.white, 14);
                viz.drawText(`B(u,v) = ${value.toFixed(3)}`, -5.2, 3.3, viz.colors.teal, 16, 'left');

                if (formType === 0) {
                    viz.drawText(`|B(u,v)| = area of parallelogram`, -5.2, 2.8, viz.colors.text, 11);
                    viz.drawText(`Sign = orientation`, -5.2, 2.4, viz.colors.text, 11);
                }
            }

            draw();
            return viz;
        }
    }
];

// Section 2: Signature and Congruence
window.EXTRA_VIZ['ch11']['ch11-sec02'] = [
    {
        id: 'ch11-extra-viz-3',
        title: 'Signature (p,q,r) Explorer',
        description: 'Explore Sylvester\'s Law: see how signature (p positive, q negative, r zero) characterizes a symmetric bilinear form',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 35});

            let p = 2, q = 1, r = 0; // signature (positive, negative, zero)
            const maxDim = 4;

            const sliderP = VizEngine.createSlider(controls, 'p (positive)', 0, maxDim, p, 1, (val) => {
                p = Math.floor(val);
                updateConstraints();
                draw();
            });

            const sliderQ = VizEngine.createSlider(controls, 'q (negative)', 0, maxDim, q, 1, (val) => {
                q = Math.floor(val);
                updateConstraints();
                draw();
            });

            const sliderR = VizEngine.createSlider(controls, 'r (null)', 0, maxDim, r, 1, (val) => {
                r = Math.floor(val);
                updateConstraints();
                draw();
            });

            function updateConstraints() {
                const total = p + q + r;
                if (total > maxDim) {
                    if (r > 0) r = Math.max(0, maxDim - p - q);
                }
            }

            function draw() {
                viz.clear();
                viz.drawGrid(0.5);
                viz.drawAxes();

                const dim = p + q + r;
                const angleStep = Math.PI * 2 / Math.max(dim, 1);
                const radius = 3;

                // Draw basis vectors in different colors/styles
                let angle = 0;

                // Positive eigenvectors (blue)
                for (let i = 0; i < p; i++) {
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);
                    viz.drawVector(0, 0, x, y, viz.colors.blue, `e₊${i+1}`, 3);

                    // Draw positive cone
                    for (let t = 0.2; t <= 1; t += 0.2) {
                        viz.drawCircle(0, 0, t * Math.sqrt(x*x + y*y),
                                      viz.colors.blue + '11', viz.colors.blue + '44');
                    }
                    angle += angleStep;
                }

                // Negative eigenvectors (red)
                for (let i = 0; i < q; i++) {
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);
                    viz.drawVector(0, 0, x, y, viz.colors.red, `e₋${i+1}`, 3);

                    // Draw negative cone (dashed)
                    for (let t = 0.2; t <= 1; t += 0.2) {
                        viz.drawCircle(0, 0, t * Math.sqrt(x*x + y*y),
                                      null, viz.colors.red + '44');
                    }
                    angle += angleStep;
                }

                // Null/radical eigenvectors (gray)
                for (let i = 0; i < r; i++) {
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);
                    viz.drawVector(0, 0, x, y, viz.colors.text, `e₀${i+1}`, 2);

                    // Draw null direction
                    viz.drawLine(0, 0, x, y, viz.colors.text + '33', 1, true);
                    angle += angleStep;
                }

                // Draw light cone (for Lorentzian signature like (1,1,0))
                if (p === 1 && q === 1 && r === 0) {
                    viz.drawText('Light Cone (Minkowski)', -6, 5, viz.colors.yellow, 12);
                    // Draw null directions
                    viz.drawLine(-5, -5, 5, 5, viz.colors.yellow + '66', 2);
                    viz.drawLine(-5, 5, 5, -5, viz.colors.yellow + '66', 2);
                }

                // Information display
                viz.drawText(`Signature: (${p}, ${q}, ${r})`, -6.5, -4.5, viz.colors.white, 14);
                viz.drawText(`Dimension: ${dim}`, -6.5, -5, viz.colors.text, 12);

                let type = '';
                if (r > 0) {
                    type = 'Degenerate';
                } else if (q === 0) {
                    type = 'Positive definite';
                } else if (p === 0) {
                    type = 'Negative definite';
                } else {
                    type = 'Indefinite';
                }
                viz.drawText(`Type: ${type}`, -6.5, -5.5, viz.colors.teal, 12);

                // Canonical form
                let canonical = 'Q = ';
                for (let i = 0; i < p; i++) canonical += `x₊${i+1}² + `;
                for (let i = 0; i < q; i++) canonical += `-x₋${i+1}² + `;
                canonical = canonical.slice(0, -3); // remove last ' + '
                if (dim === 0) canonical = 'Q = 0';

                viz.drawText(canonical, -6.5, 4.5, viz.colors.orange, 11);
            }

            draw();
            return viz;
        }
    },
    {
        id: 'ch11-extra-viz-4',
        title: 'Congruence Transformation Animation',
        description: 'Watch how congruence B\'(x,y) = B(Px, Py) preserves signature but changes the matrix representation',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 45});

            let t = 0; // animation parameter
            let animating = false;

            const playBtn = VizEngine.createButton(controls, 'Play/Pause', () => {
                animating = !animating;
                if (animating) {
                    viz.animate((timestamp) => {
                        t = (timestamp / 2000) % (Math.PI * 2);
                        draw();
                        return animating;
                    });
                } else {
                    viz.stopAnimation();
                }
            });

            const resetBtn = VizEngine.createButton(controls, 'Reset', () => {
                t = 0;
                animating = false;
                viz.stopAnimation();
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Original basis
                const e1 = [1, 0];
                const e2 = [0, 1];

                // Change of basis matrix P(t) (rotation + scaling)
                const angle = t * 0.5;
                const scale = 1 + 0.3 * Math.sin(t);
                const P = [
                    [scale * Math.cos(angle), -Math.sin(angle)],
                    [scale * Math.sin(angle), Math.cos(angle)]
                ];

                // Transformed basis
                const Pe1 = VizEngine.matVec(P, e1);
                const Pe2 = VizEngine.matVec(P, e2);

                // Original form matrix (indefinite: signature (1,1))
                const B = [[1, 0], [0, -1]];

                // Transformed form matrix B' = P^T B P
                const PT = [[P[0][0], P[1][0]], [P[0][1], P[1][1]]];
                const BP = VizEngine.matMul(B, P);
                const BPrime = VizEngine.matMul(PT, BP);

                // Draw original unit circle under B (hyperbola x² - y² = 1)
                for (let i = 0; i < 100; i++) {
                    const s = -3 + i * 6 / 100;
                    const y1 = Math.sqrt(1 + s * s);
                    const y2 = -Math.sqrt(1 + s * s);
                    if (i > 0) {
                        viz.drawPoint(s, y1, viz.colors.blue + '44', null, 2);
                        viz.drawPoint(s, y2, viz.colors.blue + '44', null, 2);
                    }
                }

                // Draw transformed hyperbola (approximately)
                for (let i = 0; i < 100; i++) {
                    const s = -3 + i * 6 / 100;
                    const y1 = Math.sqrt(1 + s * s);
                    const y2 = -Math.sqrt(1 + s * s);

                    const p1 = VizEngine.matVec(P, [s, y1]);
                    const p2 = VizEngine.matVec(P, [s, y2]);

                    if (i > 0) {
                        viz.drawPoint(p1[0], p1[1], viz.colors.orange + '88', null, 2);
                        viz.drawPoint(p2[0], p2[1], viz.colors.orange + '88', null, 2);
                    }
                }

                // Draw basis vectors
                viz.drawVector(0, 0, e1[0], e1[1], viz.colors.blue + '66', 'e₁', 2);
                viz.drawVector(0, 0, e2[0], e2[1], viz.colors.blue + '66', 'e₂', 2);

                viz.drawVector(0, 0, Pe1[0], Pe1[1], viz.colors.orange, 'Pe₁', 3);
                viz.drawVector(0, 0, Pe2[0], Pe2[1], viz.colors.orange, 'Pe₂', 3);

                // Display matrices
                viz.drawText(`Original: B = [[1,0],[0,-1]]`, -6, 4.8, viz.colors.blue, 11);
                viz.drawText(`Transformed: B' = P^T B P`, -6, 4.3, viz.colors.orange, 11);
                viz.drawText(`B'₁₁ = ${BPrime[0][0].toFixed(2)}, B'₁₂ = ${BPrime[0][1].toFixed(2)}`,
                           -6, 3.8, viz.colors.text, 10);
                viz.drawText(`B'₂₁ = ${BPrime[1][0].toFixed(2)}, B'₂₂ = ${BPrime[1][1].toFixed(2)}`,
                           -6, 3.4, viz.colors.text, 10);
                viz.drawText('Signature (1,1) preserved!', -6, 2.9, viz.colors.teal, 11);
            }

            draw();
            return viz;
        }
    }
];

// Section 3: Symplectic Geometry
window.EXTRA_VIZ['ch11']['ch11-sec03'] = [
    {
        id: 'ch11-extra-viz-5',
        title: 'Symplectic Form Visualization',
        description: 'Explore the standard symplectic form ω(u,v) on R²ⁿ. Drag vectors to see skew-symmetry and non-degeneracy.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

            const u = viz.addDraggable('u', 2, 1, viz.colors.blue, 8, () => draw());
            const v = viz.addDraggable('v', -1, 2, viz.colors.orange, 8, () => draw());

            let showDual = false;

            const dualBtn = VizEngine.createButton(controls, 'Toggle Dual Vectors', () => {
                showDual = !showDual;
                draw();
            });

            function symplecticForm(u, v) {
                // Standard symplectic form: ω(u,v) = u₁v₂ - u₂v₁
                return u.x * v.y - u.y * v.x;
            }

            function symplecticDual(u) {
                // J(u) where J = [[0, -1], [1, 0]]
                return [-u.y, u.x];
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const omega_uv = symplecticForm(u, v);
                const omega_vu = symplecticForm(v, u);

                // Draw parallelogram showing oriented area
                const parallelogram = [
                    [0, 0],
                    [u.x, u.y],
                    [u.x + v.x, u.y + v.y],
                    [v.x, v.y]
                ];
                const fillColor = omega_uv >= 0 ? viz.colors.teal + '22' : viz.colors.red + '22';
                viz.drawPolygon(parallelogram, fillColor, viz.colors.white + '44', 1.5);

                // Draw vectors
                viz.drawVector(0, 0, u.x, u.y, viz.colors.blue, 'u', 3);
                viz.drawVector(0, 0, v.x, v.y, viz.colors.orange, 'v', 3);

                // Draw symplectic dual (orthogonal complement in symplectic sense)
                if (showDual) {
                    const Ju = symplecticDual(u);
                    const Jv = symplecticDual(v);
                    viz.drawVector(0, 0, Ju[0], Ju[1], viz.colors.purple, 'Ju', 2);
                    viz.drawVector(0, 0, Jv[0], Jv[1], viz.colors.pink, 'Jv', 2);

                    // Show that ω(u, Ju) = 0
                    const omega_uJu = u.x * Ju[1] - u.y * Ju[0];
                    viz.drawText(`ω(u, Ju) = ${omega_uJu.toFixed(3)} (should be 0)`,
                               -5, -4, viz.colors.purple, 10);
                }

                // Display symplectic properties
                viz.drawText(`ω(u,v) = ${omega_uv.toFixed(3)}`, -5, 4.8, viz.colors.white, 14);
                viz.drawText(`ω(v,u) = ${omega_vu.toFixed(3)}`, -5, 4.3, viz.colors.white, 14);
                viz.drawText(`Skew-symmetric: ω(v,u) = -ω(u,v) ✓`, -5, 3.6, viz.colors.teal, 11);

                // Check if u, v form a symplectic basis
                if (Math.abs(omega_uv - 1) < 0.1) {
                    viz.drawText(`Symplectic basis! ω(u,v) ≈ 1`, -5, 3, viz.colors.green, 12);
                } else if (Math.abs(omega_uv) < 0.1) {
                    viz.drawText(`u,v are symplectically orthogonal`, -5, 3, viz.colors.yellow, 11);
                }

                // Show matrix form
                viz.drawText(`Matrix: J = [[0, -1], [1, 0]]`, -5, 2.3, viz.colors.text, 10);
                viz.drawText(`ω(u,v) = u^T J v`, -5, 1.9, viz.colors.text, 10);
            }

            draw();
            return viz;
        }
    },
    {
        id: 'ch11-extra-viz-6',
        title: 'Hyperbolic Plane and Symplectic Basis',
        description: 'Drag to create a symplectic/hyperbolic pair: two vectors with ⟨e,f⟩=0, ⟨e,e⟩=0, ⟨f,f⟩=0, ⟨e,f⟩=1',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

            const e = viz.addDraggable('e', 1.5, 1, viz.colors.blue, 8, () => draw());
            const f = viz.addDraggable('f', 1, 2, viz.colors.orange, 8, () => draw());

            let mode = 0; // 0: symplectic, 1: hyperbolic (orthogonal)

            const modeBtn = VizEngine.createButton(controls, 'Toggle Symplectic/Hyperbolic', () => {
                mode = 1 - mode;
                draw();
            });

            const normalizeBtn = VizEngine.createButton(controls, 'Auto-Normalize to Basis', () => {
                if (mode === 0) {
                    // Create symplectic basis
                    e.x = 1; e.y = 0;
                    f.x = 0; f.y = 1;
                } else {
                    // Create hyperbolic basis
                    e.x = 1; e.y = 1;
                    f.x = 1; f.y = -1;
                }
                draw();
            });

            function computeForm(u, v) {
                if (mode === 0) {
                    // Symplectic: ω(u,v) = u₁v₂ - u₂v₁
                    return u.x * v.y - u.y * v.x;
                } else {
                    // Hyperbolic (indefinite orthogonal): B(u,v) = u₁v₁ - u₂v₂
                    return u.x * v.x - u.y * v.y;
                }
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const B_ee = computeForm(e, e);
                const B_ff = computeForm(f, f);
                const B_ef = computeForm(e, f);
                const B_fe = computeForm(f, e);

                // Check if it's a valid hyperbolic/symplectic pair
                const isValidPair = Math.abs(B_ee) < 0.1 &&
                                   Math.abs(B_ff) < 0.1 &&
                                   Math.abs(B_ef - 1) < 0.2;

                // Draw the span (2D plane)
                const span = [];
                for (let a = -2; a <= 2; a += 0.5) {
                    for (let b = -2; b <= 2; b += 0.5) {
                        const x = a * e.x + b * f.x;
                        const y = a * e.y + b * f.y;
                        viz.drawPoint(x, y, viz.colors.teal + '22', null, 2);
                    }
                }

                // Draw level curves of the form
                if (mode === 0) {
                    // Symplectic: show area interpretation
                    const parallelogram = [
                        [0, 0],
                        [e.x, e.y],
                        [e.x + f.x, e.y + f.y],
                        [f.x, f.y]
                    ];
                    viz.drawPolygon(parallelogram, viz.colors.blue + '11', viz.colors.white + '66', 2);
                } else {
                    // Hyperbolic: show null cone (light cone)
                    for (let t = -4; t <= 4; t += 0.05) {
                        // Null directions: B(x,x) = 0 => x₁² = x₂²
                        viz.drawPoint(t, t, viz.colors.yellow + '44', null, 1);
                        viz.drawPoint(t, -t, viz.colors.yellow + '44', null, 1);
                    }
                    viz.drawLine(-3, -3, 3, 3, viz.colors.yellow + '88', 2);
                    viz.drawLine(-3, 3, 3, -3, viz.colors.yellow + '88', 2);
                }

                // Draw vectors
                viz.drawVector(0, 0, e.x, e.y, viz.colors.blue, 'e', 3);
                viz.drawVector(0, 0, f.x, f.y, viz.colors.orange, 'f', 3);

                // Draw perpendicular indicator if orthogonal
                if (Math.abs(B_ef) < 0.15) {
                    const len = 0.3;
                    const ex = e.x / Math.sqrt(e.x*e.x + e.y*e.y) * len;
                    const ey = e.y / Math.sqrt(e.x*e.x + e.y*e.y) * len;
                    const fx = f.x / Math.sqrt(f.x*f.x + f.y*f.y) * len;
                    const fy = f.y / Math.sqrt(f.x*f.x + f.y*f.y) * len;

                    viz.drawSegment(ex, ey, ex + fx, ey + fy, viz.colors.white, 1.5);
                    viz.drawSegment(fx, fy, ex + fx, ey + fy, viz.colors.white, 1.5);
                }

                // Information display
                const modeName = mode === 0 ? 'Symplectic' : 'Hyperbolic (Orthogonal)';
                viz.drawText(`Mode: ${modeName}`, -5, 4.8, viz.colors.white, 13);
                viz.drawText(`⟨e,e⟩ = ${B_ee.toFixed(3)}`, -5, 4.2,
                           Math.abs(B_ee) < 0.1 ? viz.colors.green : viz.colors.white, 11);
                viz.drawText(`⟨f,f⟩ = ${B_ff.toFixed(3)}`, -5, 3.8,
                           Math.abs(B_ff) < 0.1 ? viz.colors.green : viz.colors.white, 11);
                viz.drawText(`⟨e,f⟩ = ${B_ef.toFixed(3)}`, -5, 3.4,
                           Math.abs(B_ef - 1) < 0.2 ? viz.colors.green : viz.colors.white, 11);

                if (isValidPair) {
                    viz.drawText(`✓ Valid ${modeName} Pair!`, -5, 2.7, viz.colors.green, 13);
                    viz.drawText(`Span forms ${modeName} plane`, -5, 2.2, viz.colors.teal, 11);
                } else {
                    viz.drawText(`Adjust to make a valid pair`, -5, 2.7, viz.colors.yellow, 11);
                }

                if (mode === 1) {
                    viz.drawText(`Yellow lines: null cone (⟨x,x⟩=0)`, -5, -4.5, viz.colors.yellow, 10);
                }
            }

            draw();
            return viz;
        }
    }
];

// Section 4: Degenerate vs Nondegenerate
window.EXTRA_VIZ['ch11']['ch11-sec04'] = [
    {
        id: 'ch11-extra-viz-7',
        title: 'Degenerate vs Nondegenerate Forms',
        description: 'Compare degenerate (has radical) and nondegenerate forms. See how the radical kills information.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

            let degeneracy = 0; // 0 to 1, where 1 is fully degenerate

            const slider = VizEngine.createSlider(controls, 'Degeneracy', 0, 1, 0, 0.01, (val) => {
                degeneracy = val;
                draw();
            });

            const u = viz.addDraggable('u', 2, 1, viz.colors.blue, 8, () => draw());

            function getMatrix() {
                // Interpolate between nondegenerate [[1,0],[0,1]] and degenerate [[1,0],[0,0]]
                const a = 1;
                const d = 1 - degeneracy; // goes to 0
                return [[a, 0], [0, d]];
            }

            function bilinearForm(u, v, M) {
                // B(u,v) = u^T M v
                const Mv = [M[0][0] * v.x + M[0][1] * v.y,
                           M[1][0] * v.x + M[1][1] * v.y];
                return u.x * Mv[0] + u.y * Mv[1];
            }

            function radicalVector(M) {
                // For matrix [[a, 0], [0, d]], radical is span of [0,1] when d=0
                if (Math.abs(M[1][1]) < 0.01) {
                    return [0, 1];
                }
                return null;
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const M = getMatrix();
                const rad = radicalVector(M);

                // Draw grid transformed by the form
                for (let i = -3; i <= 3; i++) {
                    for (let j = -3; j <= 3; j++) {
                        if (Math.abs(i) > 0.2 || Math.abs(j) > 0.2) {
                            const v = {x: i * 0.5, y: j * 0.5};
                            const B_uv = bilinearForm(u, v, M);

                            // Color by value of form
                            const intensity = Math.min(Math.abs(B_uv) / 5, 1);
                            const color = B_uv > 0 ? viz.colors.blue : viz.colors.red;
                            viz.drawPoint(v.x, v.y, color + Math.floor(intensity * 200).toString(16).padStart(2, '0'),
                                        null, 2);
                        }
                    }
                }

                // Draw the radical (kernel of the form)
                if (rad) {
                    for (let t = -5; t <= 5; t += 0.1) {
                        viz.drawPoint(rad[0] * t, rad[1] * t, viz.colors.yellow + 'aa', null, 3);
                    }
                    viz.drawVector(0, 0, rad[0] * 3, rad[1] * 3, viz.colors.yellow, 'rad(B)', 3);

                    viz.drawText('Radical: all v with B(·,v)=0', -5, -4, viz.colors.yellow, 11);
                    viz.drawText('Form vanishes on this subspace!', -5, -4.5, viz.colors.yellow, 10);
                }

                // Draw u
                viz.drawVector(0, 0, u.x, u.y, viz.colors.blue, 'u', 3);
                viz.drawDraggables();

                // Compute B(u, e₂) where e₂ is in radical
                if (rad) {
                    const B_u_rad = bilinearForm(u, {x: rad[0], y: rad[1]}, M);
                    viz.drawText(`B(u, rad) = ${B_u_rad.toFixed(4)} ≈ 0`, 2, -4,
                               Math.abs(B_u_rad) < 0.01 ? viz.colors.green : viz.colors.red, 11);
                }

                // Display matrix and properties
                viz.drawText(`Matrix: [[${M[0][0].toFixed(1)}, ${M[0][1].toFixed(1)}],`, -5, 4.8, viz.colors.white, 11);
                viz.drawText(`         [${M[1][0].toFixed(1)}, ${M[1][1].toFixed(1)}]]`, -5, 4.4, viz.colors.white, 11);

                const det = M[0][0] * M[1][1] - M[0][1] * M[1][0];
                viz.drawText(`det(M) = ${det.toFixed(3)}`, -5, 3.9,
                           Math.abs(det) < 0.01 ? viz.colors.red : viz.colors.green, 12);

                if (Math.abs(det) < 0.01) {
                    viz.drawText(`DEGENERATE (rank < dim)`, -5, 3.4, viz.colors.red, 12);
                    viz.drawText(`dim(rad) = ${1}`, -5, 2.9, viz.colors.yellow, 11);
                } else {
                    viz.drawText(`NONDEGENERATE`, -5, 3.4, viz.colors.green, 12);
                    viz.drawText(`rad(B) = {0}`, -5, 2.9, viz.colors.green, 11);
                }
            }

            draw();
            return viz;
        }
    },
    {
        id: 'ch11-extra-viz-8',
        title: 'Orthogonal Complement and Radical',
        description: 'For subspace U, explore U⊥ (orthogonal complement). When U∩U⊥≠{0}, U is degenerate.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

            const u = viz.addDraggable('u', 2, 1.5, viz.colors.blue, 8, () => draw());

            let formType = 0; // 0: positive definite, 1: indefinite, 2: degenerate

            const typeBtn = VizEngine.createButton(controls, 'Cycle Form Type', () => {
                formType = (formType + 1) % 3;
                draw();
            });

            function getMatrix() {
                if (formType === 0) {
                    // Positive definite: standard inner product
                    return [[1, 0], [0, 1]];
                } else if (formType === 1) {
                    // Indefinite: Minkowski metric
                    return [[1, 0], [0, -1]];
                } else {
                    // Degenerate
                    return [[1, 0], [0, 0]];
                }
            }

            function bilinearForm(u, v, M) {
                const Mv = [M[0][0] * v.x + M[0][1] * v.y,
                           M[1][0] * v.x + M[1][1] * v.y];
                return u.x * Mv[0] + u.y * Mv[1];
            }

            function orthogonalComplement(u, M) {
                // Find v such that B(u,v) = 0
                // For 2D, this is a line (or subspace)
                const det = M[0][0] * M[1][1] - M[0][1] * M[1][0];

                if (Math.abs(det) < 0.01) {
                    // Degenerate case
                    if (Math.abs(M[1][1]) < 0.01) {
                        // Radical is span([0,1])
                        return {type: 'line', dir: [0, 1], isRadical: true};
                    }
                }

                // For symmetric M, solve M u · v = 0
                const Mu = [M[0][0] * u.x + M[0][1] * u.y,
                           M[1][0] * u.x + M[1][1] * u.y];

                // Orthogonal direction to Mu
                return {type: 'line', dir: [-Mu[1], Mu[0]], isRadical: false};
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const M = getMatrix();
                const orth = orthogonalComplement(u, M);

                // Draw U (span of u)
                for (let t = -5; t <= 5; t += 0.1) {
                    viz.drawPoint(u.x * t, u.y * t, viz.colors.blue + '33', null, 2);
                }

                // Draw U⊥ (orthogonal complement)
                if (orth.type === 'line') {
                    const norm = Math.sqrt(orth.dir[0]**2 + orth.dir[1]**2);
                    const dir = [orth.dir[0]/norm, orth.dir[1]/norm];

                    for (let t = -5; t <= 5; t += 0.1) {
                        const color = orth.isRadical ? viz.colors.yellow : viz.colors.orange;
                        viz.drawPoint(dir[0] * t, dir[1] * t, color + '44', null, 2);
                    }

                    viz.drawVector(0, 0, dir[0] * 3, dir[1] * 3,
                                 orth.isRadical ? viz.colors.yellow : viz.colors.orange,
                                 'U⊥', 3);
                }

                // Draw U
                viz.drawVector(0, 0, u.x, u.y, viz.colors.blue, 'U=span(u)', 3);
                viz.drawDraggables();

                // Check intersection
                let intersection = null;
                if (orth.isRadical) {
                    // Check if u is in radical
                    const B_uu = bilinearForm(u, u, M);
                    if (Math.abs(B_uu) < 0.2) {
                        intersection = 'U ⊆ U⊥ (in radical!)';
                    }
                } else {
                    // For nondegenerate, check if orthogonal
                    const B_uu = bilinearForm(u, u, M);
                    if (Math.abs(B_uu) < 0.1) {
                        intersection = 'U ∩ U⊥ ≠ {0}';
                    } else {
                        intersection = 'U ∩ U⊥ = {0}';
                    }
                }

                // Information
                const typeNames = ['Positive Definite', 'Indefinite (Lorentzian)', 'Degenerate'];
                viz.drawText(`Form: ${typeNames[formType]}`, -5, 4.8, viz.colors.white, 13);

                const det = M[0][0] * M[1][1] - M[0][1] * M[1][0];
                viz.drawText(`det(M) = ${det.toFixed(2)}`, -5, 4.3,
                           Math.abs(det) < 0.01 ? viz.colors.red : viz.colors.white, 11);

                const B_uu = bilinearForm(u, u, M);
                viz.drawText(`B(u,u) = ${B_uu.toFixed(3)}`, -5, 3.8, viz.colors.text, 11);

                if (intersection) {
                    viz.drawText(intersection, -5, 3.2,
                               intersection.includes('≠') ? viz.colors.green : viz.colors.yellow, 12);
                }

                if (formType === 2) {
                    viz.drawText('U⊥ includes radical (yellow)', -5, 2.6, viz.colors.yellow, 11);
                    viz.drawText('Information is lost on rad(B)!', -5, 2.1, viz.colors.red, 11);
                } else if (formType === 0) {
                    viz.drawText('U and U⊥ are complementary', -5, 2.6, viz.colors.green, 11);
                    viz.drawText('V = U ⊕ U⊥ (orthogonal direct sum)', -5, 2.1, viz.colors.teal, 11);
                } else {
                    viz.drawText('Indefinite: U can be isotropic', -5, 2.6, viz.colors.orange, 11);
                    viz.drawText('(self-orthogonal: U ⊆ U⊥)', -5, 2.1, viz.colors.text, 10);
                }
            }

            draw();
            return viz;
        }
    }
];

// Section 5: Isometries and Witt's Theorem
window.EXTRA_VIZ['ch11']['ch11-sec05'] = [
    {
        id: 'ch11-extra-viz-9',
        title: 'Isometry: Form-Preserving Transformation',
        description: 'An isometry preserves the bilinear form: B(Tu, Tv) = B(u,v). Watch rotations (O(2)) and symplectic maps (Sp(2)).',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 45});

            let angle = 0;
            let formType = 0; // 0: orthogonal (rotation), 1: symplectic

            const angleSlider = VizEngine.createSlider(controls, 'Angle', 0, Math.PI * 2, 0, 0.05, (val) => {
                angle = val;
                draw();
            });

            const typeBtn = VizEngine.createButton(controls, 'Toggle O(2) / Sp(2)', () => {
                formType = 1 - formType;
                draw();
            });

            // Test vectors
            const testVectors = [
                {x: 2, y: 0, color: viz.colors.blue},
                {x: 0, y: 2, color: viz.colors.orange},
                {x: 1.5, y: 1.5, color: viz.colors.green}
            ];

            function getIsometry() {
                if (formType === 0) {
                    // Rotation matrix (preserves x² + y²)
                    return [
                        [Math.cos(angle), -Math.sin(angle)],
                        [Math.sin(angle), Math.cos(angle)]
                    ];
                } else {
                    // Symplectic map (preserves ω)
                    // Example: shear matrix in SL(2,R) ∩ Sp(2,R)
                    const t = Math.tan(angle / 2);
                    return [
                        [1, -t],
                        [t, 1 - t*t]
                    ];
                }
            }

            function bilinearForm(u, v) {
                if (formType === 0) {
                    // Standard inner product
                    return u[0] * v[0] + u[1] * v[1];
                } else {
                    // Symplectic form
                    return u[0] * v[1] - u[1] * v[0];
                }
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const T = getIsometry();

                // Draw unit circle/shape that's preserved
                if (formType === 0) {
                    // Unit circle
                    viz.drawCircle(0, 0, 2, null, viz.colors.white + '44');
                } else {
                    // Unit area parallelogram grid
                    for (let i = -3; i <= 3; i++) {
                        for (let j = -3; j <= 3; j++) {
                            if (i !== 0 || j !== 0) {
                                const area = Math.abs(i * 1 - j * 1); // area from symplectic form
                                if (Math.abs(area - 1) < 0.1) {
                                    viz.drawPoint(i * 0.7, j * 0.7, viz.colors.white + '33', null, 2);
                                }
                            }
                        }
                    }
                }

                // Draw original and transformed vectors
                for (let i = 0; i < testVectors.length; i++) {
                    const v = testVectors[i];
                    const vArr = [v.x, v.y];
                    const Tv = VizEngine.matVec(T, vArr);

                    // Original
                    viz.drawVector(0, 0, v.x, v.y, v.color + '66', `v${i}`, 2);

                    // Transformed
                    viz.drawVector(0, 0, Tv[0], Tv[1], v.color, `Tv${i}`, 3);

                    // Check preservation
                    const B_vv = bilinearForm(vArr, vArr);
                    const B_TvTv = bilinearForm(Tv, Tv);

                    if (i === 0) {
                        viz.drawText(`B(v${i},v${i}) = ${B_vv.toFixed(3)}`, -5, 4.5 - i*0.5, v.color, 10);
                        viz.drawText(`B(Tv${i},Tv${i}) = ${B_TvTv.toFixed(3)}`, -5, 4.2 - i*0.5, v.color, 10);
                    }
                }

                // Verify isometry property for first two vectors
                const v0 = [testVectors[0].x, testVectors[0].y];
                const v1 = [testVectors[1].x, testVectors[1].y];
                const Tv0 = VizEngine.matVec(T, v0);
                const Tv1 = VizEngine.matVec(T, v1);

                const B_v0v1 = bilinearForm(v0, v1);
                const B_Tv0Tv1 = bilinearForm(Tv0, Tv1);

                const groupName = formType === 0 ? 'Orthogonal O(2)' : 'Symplectic Sp(2)';
                viz.drawText(`Isometry Group: ${groupName}`, -5, -3.5, viz.colors.white, 13);
                viz.drawText(`B(v₀,v₁) = ${B_v0v1.toFixed(3)}`, -5, -4, viz.colors.teal, 11);
                viz.drawText(`B(Tv₀,Tv₁) = ${B_Tv0Tv1.toFixed(3)}`, -5, -4.5, viz.colors.teal, 11);

                const preserved = Math.abs(B_v0v1 - B_Tv0Tv1) < 0.01;
                viz.drawText(preserved ? '✓ Form preserved!' : '✗ Not preserved',
                           2, -4, preserved ? viz.colors.green : viz.colors.red, 12);

                // Show matrix
                viz.drawText(`T = [[${T[0][0].toFixed(2)}, ${T[0][1].toFixed(2)}],`,
                           2, 4.5, viz.colors.text, 10);
                viz.drawText(`     [${T[1][0].toFixed(2)}, ${T[1][1].toFixed(2)}]]`,
                           2, 4.1, viz.colors.text, 10);

                const det = VizEngine.det2(T);
                viz.drawText(`det(T) = ${det.toFixed(3)}`, 2, 3.6, viz.colors.text, 10);
            }

            draw();
            return viz;
        }
    },
    {
        id: 'ch11-extra-viz-10',
        title: 'Witt\'s Theorem: Extending Isometries',
        description: 'Witt: an isometry on a subspace extends to the whole space. Drag subspace vectors to see extension.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 45});

            // Subspace U = span(u)
            const u = viz.addDraggable('u', 2, 1, viz.colors.blue, 8, () => draw());

            // Image Tu (where u maps to)
            const Tu = viz.addDraggable('Tu', 1, 2.5, viz.colors.orange, 8, () => draw());

            let showExtension = false;

            const extBtn = VizEngine.createButton(controls, 'Show Extension', () => {
                showExtension = !showExtension;
                draw();
            });

            const normalizeBtn = VizEngine.createButton(controls, 'Normalize: |u|=|Tu|', () => {
                const normU = Math.sqrt(u.x * u.x + u.y * u.y);
                if (normU > 0.1) {
                    const normTu = Math.sqrt(Tu.x * Tu.x + Tu.y * Tu.y);
                    Tu.x = (Tu.x / normTu) * normU;
                    Tu.y = (Tu.y / normTu) * normU;
                }
                draw();
            });

            function norm(v) {
                return Math.sqrt(v.x * v.x + v.y * v.y);
            }

            function constructIsometry() {
                // Construct isometry T: R² → R² such that T(u) = Tu
                // For this to be an isometry, we need |u| = |Tu|

                const normU = norm(u);
                const normTu = norm(Tu);

                if (normU < 0.1 || normTu < 0.1) return null;

                // Normalize
                const uNorm = [u.x / normU, u.y / normU];
                const TuNorm = [Tu.x / normTu, Tu.y / normTu];

                // Construct orthonormal basis
                const uPerp = [-uNorm[1], uNorm[0]]; // perpendicular to u

                // Extend: need T(uPerp) such that {Tu, T(uPerp)} is orthonormal
                // One choice: T(uPerp) ⊥ Tu with |T(uPerp)| = |uPerp| = 1
                const TuPerp = [-TuNorm[1], TuNorm[0]];

                // Matrix of T in standard basis
                // T([1,0]) = T(uNorm * uNorm[0] + uPerp * uPerp[0])
                const T = [
                    [TuNorm[0] * uNorm[0] + TuPerp[0] * uPerp[0],
                     TuNorm[0] * uNorm[1] + TuPerp[0] * uPerp[1]],
                    [TuNorm[1] * uNorm[0] + TuPerp[1] * uPerp[0],
                     TuNorm[1] * uNorm[1] + TuPerp[1] * uPerp[1]]
                ];

                return {
                    matrix: T,
                    uPerp: [uPerp[0] * normU, uPerp[1] * normU],
                    TuPerp: [TuPerp[0] * normU, TuPerp[1] * normU]
                };
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw subspace U = span(u)
                for (let t = -5; t <= 5; t += 0.1) {
                    viz.drawPoint(u.x * t, u.y * t, viz.colors.blue + '22', null, 2);
                }

                // Draw image of U
                for (let t = -5; t <= 5; t += 0.1) {
                    viz.drawPoint(Tu.x * t, Tu.y * t, viz.colors.orange + '22', null, 2);
                }

                // Draw vectors
                viz.drawVector(0, 0, u.x, u.y, viz.colors.blue, 'u', 3);
                viz.drawVector(0, 0, Tu.x, Tu.y, viz.colors.orange, 'Tu', 3);

                // Check if isometry on U
                const normU = norm(u);
                const normTu = norm(Tu);
                const isIsometry = Math.abs(normU - normTu) < 0.2;

                viz.drawText(`|u| = ${normU.toFixed(3)}`, -5, 4.8, viz.colors.blue, 11);
                viz.drawText(`|Tu| = ${normTu.toFixed(3)}`, -5, 4.4, viz.colors.orange, 11);
                viz.drawText(isIsometry ? '✓ Isometry on U' : '✗ Not isometry (adjust)',
                           -5, 3.9, isIsometry ? viz.colors.green : viz.colors.yellow, 12);

                if (showExtension && isIsometry) {
                    const ext = constructIsometry();
                    if (ext) {
                        // Draw orthogonal complement vectors
                        viz.drawVector(0, 0, ext.uPerp[0], ext.uPerp[1],
                                     viz.colors.purple, 'u⊥', 2);
                        viz.drawVector(0, 0, ext.TuPerp[0], ext.TuPerp[1],
                                     viz.colors.pink, 'T(u⊥)', 2);

                        // Show grid transformed by T
                        const T = ext.matrix;
                        for (let i = -3; i <= 3; i += 0.5) {
                            for (let j = -3; j <= 3; j += 0.5) {
                                const v = [i, j];
                                const Tv = VizEngine.matVec(T, v);
                                viz.drawSegment(i, j, Tv[0], Tv[1],
                                              viz.colors.teal + '44', 1);
                            }
                        }

                        viz.drawText('Extension to full space:', -5, 3.3, viz.colors.teal, 11);
                        viz.drawText(`T(u⊥) shown in pink`, -5, 2.8, viz.colors.pink, 10);
                        viz.drawText(`Witt's Theorem ✓`, -5, 2.3, viz.colors.green, 12);
                    }
                }

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    }
];
