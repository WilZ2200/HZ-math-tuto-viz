// Chapter 9: Real and Complex Inner Product Spaces - Extra Visualizations
window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch09'] = window.EXTRA_VIZ['ch09'] || {};

// Assign visualizations to sections (distributed across the chapter)
window.EXTRA_VIZ['ch09']['ch09-sec01'] = [
    {
        id: 'ch09-extra-viz-1',
        title: 'Interactive: Gram-Schmidt Orthogonalization Process',
        description: 'Watch the Gram-Schmidt process transform linearly independent vectors into an orthogonal basis. Drag vectors to see the orthogonalization in real-time.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 600, height: 450, scale: 45});

            const v1 = viz.addDraggable('v1', 3, 1, viz.colors.blue, 8, () => draw());
            const v2 = viz.addDraggable('v2', 1, 2.5, viz.colors.orange, 8, () => draw());

            let showAnimation = false;
            let animationProgress = 0;
            let animating = false;

            // Gram-Schmidt algorithm
            function gramSchmidt(vectors) {
                const result = [];
                for (let i = 0; i < vectors.length; i++) {
                    let u = [...vectors[i]];
                    // Subtract projections onto previous orthogonal vectors
                    for (let j = 0; j < i; j++) {
                        const proj = VizEngine.proj(u, result[j]);
                        u[0] -= proj[0];
                        u[1] -= proj[1];
                    }
                    result.push(u);
                }
                return result;
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const vectors = [[v1.x, v1.y], [v2.x, v2.y]];
                const ortho = gramSchmidt(vectors);

                // Draw original vectors
                viz.drawVector(0, 0, v1.x, v1.y, viz.colors.blue + 'aa', 'v₁', 2);
                viz.drawVector(0, 0, v2.x, v2.y, viz.colors.orange + 'aa', 'v₂', 2);

                if (showAnimation && animating) {
                    // Animate the projection subtraction
                    const proj = VizEngine.proj([v2.x, v2.y], ortho[0]);
                    const t = Math.min(animationProgress / 1000, 1);

                    // Show projection
                    viz.drawVector(0, 0, proj[0] * t, proj[1] * t, viz.colors.yellow, '', 1.5);
                    viz.drawSegment(v2.x, v2.y, proj[0] * t, proj[1] * t, viz.colors.yellow + '66', 1.5, true);

                    // Show intermediate result
                    const interX = v2.x - proj[0] * t;
                    const interY = v2.y - proj[1] * t;
                    viz.drawVector(0, 0, interX, interY, viz.colors.green, '', 2.5);

                    if (t >= 1) {
                        viz.drawText('u₂ = v₂ - proj(v₂, u₁)', 0, -5, viz.colors.text, 12);
                    }
                } else {
                    // Show final orthogonal vectors
                    viz.drawVector(0, 0, ortho[0][0], ortho[0][1], viz.colors.teal, 'u₁', 2.5);
                    viz.drawVector(0, 0, ortho[1][0], ortho[1][1], viz.colors.green, 'u₂', 2.5);

                    // Show they're orthogonal with dot product
                    const dot = VizEngine.dot(ortho[0], ortho[1]);
                    viz.drawText(`⟨u₁, u₂⟩ = ${dot.toFixed(3)}`, 0, -5, viz.colors.white, 13);

                    // Draw right angle indicator if nearly orthogonal
                    if (Math.abs(dot) < 0.1) {
                        const scale = 0.3;
                        const norm0 = VizEngine.normalize(ortho[0]);
                        const norm1 = VizEngine.normalize(ortho[1]);
                        viz.drawSegment(norm0[0] * scale, norm0[1] * scale,
                                      norm0[0] * scale + norm1[0] * scale,
                                      norm0[1] * scale + norm1[1] * scale,
                                      viz.colors.white + '88', 1);
                        viz.drawSegment(norm1[0] * scale, norm1[1] * scale,
                                      norm0[0] * scale + norm1[0] * scale,
                                      norm0[1] * scale + norm1[1] * scale,
                                      viz.colors.white + '88', 1);
                    }
                }

                viz.drawDraggables();
            }

            VizEngine.createButton(controls, 'Animate Process', () => {
                showAnimation = true;
                animating = true;
                animationProgress = 0;

                const animate = () => {
                    animationProgress += 16;
                    draw();
                    if (animationProgress < 1500) {
                        requestAnimationFrame(animate);
                    } else {
                        animating = false;
                        showAnimation = false;
                        draw();
                    }
                };
                animate();
            });

            draw();
            return viz;
        }
    },

    {
        id: 'ch09-extra-viz-2',
        title: 'Interactive: Projection onto a Subspace',
        description: 'Drag the vector v to see its orthogonal projection onto the subspace W spanned by the basis vectors. The decomposition v = proj_W(v) + (v - proj_W(v)) is shown.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 600, height: 450, scale: 45});

            const w1 = viz.addDraggable('w1', 3, 0.5, viz.colors.blue, 8, () => draw());
            const w2 = viz.addDraggable('w2', 1, 2, viz.colors.orange, 8, () => draw());
            const v = viz.addDraggable('v', 2, 3.5, viz.colors.purple, 8, () => draw());

            let showDecomposition = true;

            function projectOntoSubspace(vec, basis) {
                // Project onto span(basis) using Gram-Schmidt
                const ortho = [];
                for (let b of basis) {
                    let u = [...b];
                    for (let o of ortho) {
                        const proj = VizEngine.proj(u, o);
                        u[0] -= proj[0];
                        u[1] -= proj[1];
                    }
                    if (VizEngine.vecLen(u) > 0.01) {
                        ortho.push(u);
                    }
                }

                // Project vec onto orthogonal basis
                let proj = [0, 0];
                for (let o of ortho) {
                    const p = VizEngine.proj(vec, o);
                    proj[0] += p[0];
                    proj[1] += p[1];
                }
                return proj;
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw subspace W as a plane (show span)
                const basis = [[w1.x, w1.y], [w2.x, w2.y]];
                const det = basis[0][0] * basis[1][1] - basis[0][1] * basis[1][0];

                if (Math.abs(det) > 0.01) {
                    // Draw parallelogram grid showing span
                    for (let a = -3; a <= 3; a++) {
                        for (let b = -3; b <= 3; b++) {
                            const x = a * w1.x + b * w2.x;
                            const y = a * w1.y + b * w2.y;
                            viz.drawPoint(x, y, viz.colors.teal + '22', null, 2);
                        }
                    }
                }

                // Draw basis vectors
                viz.drawVector(0, 0, w1.x, w1.y, viz.colors.blue, 'w₁', 2);
                viz.drawVector(0, 0, w2.x, w2.y, viz.colors.orange, 'w₂', 2);

                // Compute projection
                const proj = projectOntoSubspace([v.x, v.y], basis);
                const perpX = v.x - proj[0];
                const perpY = v.y - proj[1];

                if (showDecomposition) {
                    // Draw projection onto W
                    viz.drawVector(0, 0, proj[0], proj[1], viz.colors.green, 'proj_W(v)', 2.5);

                    // Draw perpendicular component
                    viz.drawVector(proj[0], proj[1], v.x, v.y, viz.colors.red, 'v - proj_W(v)', 2);

                    // Draw connection line (showing orthogonality)
                    viz.drawSegment(0, 0, proj[0], proj[1], viz.colors.green + '44', 1.5, true);
                    viz.drawSegment(proj[0], proj[1], v.x, v.y, viz.colors.red + '44', 1.5, true);

                    // Verify orthogonality
                    const dot1 = perpX * w1.x + perpY * w1.y;
                    const dot2 = perpX * w2.x + perpY * w2.y;
                    viz.drawText(`⟨v - proj(v), w₁⟩ = ${dot1.toFixed(3)}`, 0, -5.5, viz.colors.text, 11);
                    viz.drawText(`⟨v - proj(v), w₂⟩ = ${dot2.toFixed(3)}`, 0, -6.5, viz.colors.text, 11);
                }

                // Draw v
                viz.drawVector(0, 0, v.x, v.y, viz.colors.purple, 'v', 2.5);

                viz.drawDraggables();
            }

            VizEngine.createButton(controls, 'Toggle Decomposition', () => {
                showDecomposition = !showDecomposition;
                draw();
            });

            draw();
            return viz;
        }
    }
];

window.EXTRA_VIZ['ch09']['ch09-sec02'] = [
    {
        id: 'ch09-extra-viz-3',
        title: 'Interactive: Cauchy-Schwarz Inequality Visualizer',
        description: 'Explore the Cauchy-Schwarz inequality: |⟨u,v⟩| ≤ ||u|| ||v||. Drag vectors to see when equality holds (when vectors are parallel).',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 600, height: 450, scale: 45});

            const u = viz.addDraggable('u', 3, 1, viz.colors.blue, 8, () => draw());
            const v = viz.addDraggable('v', 1, 3, viz.colors.orange, 8, () => draw());

            let showAngle = true;

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw vectors
                viz.drawVector(0, 0, u.x, u.y, viz.colors.blue, 'u', 2.5);
                viz.drawVector(0, 0, v.x, v.y, viz.colors.orange, 'v', 2.5);

                // Compute inner product and norms
                const innerProd = u.x * v.x + u.y * v.y;
                const normU = Math.sqrt(u.x * u.x + u.y * u.y);
                const normV = Math.sqrt(v.x * v.x + v.y * v.y);
                const product = normU * normV;

                // Compute angle
                const cosTheta = product > 0.01 ? innerProd / product : 0;
                const theta = Math.acos(Math.max(-1, Math.min(1, cosTheta)));
                const thetaDeg = theta * 180 / Math.PI;

                // Check inequality
                const lhs = Math.abs(innerProd);
                const rhs = product;
                const ratio = rhs > 0.01 ? lhs / rhs : 0;
                const isEqual = Math.abs(ratio - 1) < 0.01;

                // Draw angle arc
                if (showAngle && normU > 0.1 && normV > 0.1) {
                    const ctx = viz.canvas.getContext('2d');
                    const [sx, sy] = viz.toScreen(0, 0);
                    const angleU = Math.atan2(u.y, u.x);
                    const angleV = Math.atan2(v.y, v.x);

                    ctx.strokeStyle = viz.colors.yellow;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(sx, sy, 30, -angleU, -angleV, angleU > angleV);
                    ctx.stroke();

                    const midAngle = (angleU + angleV) / 2;
                    const labelX = Math.cos(midAngle) * 1.2;
                    const labelY = Math.sin(midAngle) * 1.2;
                    viz.drawText(`θ = ${thetaDeg.toFixed(1)}°`, labelX, labelY, viz.colors.yellow, 11);
                }

                // Display inequality
                const color = isEqual ? viz.colors.green : viz.colors.white;
                viz.drawText(`|⟨u,v⟩| = ${lhs.toFixed(3)}`, -6, 5.5, viz.colors.text, 12);
                viz.drawText(`||u|| ||v|| = ${rhs.toFixed(3)}`, -6, 4.8, viz.colors.text, 12);
                viz.drawText(`Ratio: ${ratio.toFixed(4)}`, -6, 4.1, color, 12);

                if (isEqual) {
                    viz.drawText('EQUALITY! (vectors are parallel)', 0, -5.5, viz.colors.green, 13);
                } else {
                    viz.drawText(`Inequality holds: ${lhs.toFixed(3)} < ${rhs.toFixed(3)}`, 0, -5.5, viz.colors.teal, 12);
                }

                // Show formula
                viz.drawText('⟨u,v⟩ = ||u|| ||v|| cos(θ)', 0, -6.5, viz.colors.text, 11);
                viz.drawText(`${innerProd.toFixed(3)} = ${product.toFixed(3)} × ${cosTheta.toFixed(3)}`, 0, -7.3, viz.colors.text, 11);

                viz.drawDraggables();
            }

            VizEngine.createButton(controls, 'Toggle Angle', () => {
                showAngle = !showAngle;
                draw();
            });

            draw();
            return viz;
        }
    },

    {
        id: 'ch09-extra-viz-4',
        title: 'Interactive: Orthogonal Decomposition V = W ⊕ W⊥',
        description: 'Visualize the orthogonal direct sum decomposition. Any vector v can be uniquely written as w + w⊥ where w ∈ W and w⊥ ∈ W⊥.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 600, height: 450, scale: 50});

            const w = viz.addDraggable('w', 3, 1, viz.colors.blue, 8, () => draw());
            const v = viz.addDraggable('v', 2, 3, viz.colors.purple, 8, () => draw());

            let showOrthogonalComplement = true;

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // W is the line spanned by w
                const normW = Math.sqrt(w.x * w.x + w.y * w.y);

                if (normW > 0.1) {
                    // Draw W (subspace - line through origin)
                    for (let t = -6; t <= 6; t += 0.3) {
                        const x = w.x * t;
                        const y = w.y * t;
                        viz.drawPoint(x, y, viz.colors.blue + '33', null, 2);
                    }

                    // Draw W⊥ (orthogonal complement - perpendicular line)
                    if (showOrthogonalComplement) {
                        const perpX = -w.y;
                        const perpY = w.x;
                        for (let t = -6; t <= 6; t += 0.3) {
                            const x = perpX * t / normW;
                            const y = perpY * t / normW;
                            viz.drawPoint(x, y, viz.colors.orange + '33', null, 2);
                        }

                        // Label subspaces
                        viz.drawText('W', w.x / normW * 2, w.y / normW * 2, viz.colors.blue, 13);
                        viz.drawText('W⊥', -w.y / normW * 2, w.x / normW * 2, viz.colors.orange, 13);
                    }

                    // Project v onto W
                    const proj = VizEngine.proj([v.x, v.y], [w.x, w.y]);
                    const perpCompX = v.x - proj[0];
                    const perpCompY = v.y - proj[1];

                    // Draw decomposition
                    viz.drawVector(0, 0, proj[0], proj[1], viz.colors.green, 'w ∈ W', 2.5);
                    viz.drawVector(proj[0], proj[1], v.x, v.y, viz.colors.red, 'w⊥ ∈ W⊥', 2.5);

                    // Draw construction lines
                    viz.drawSegment(0, 0, proj[0], proj[1], viz.colors.green + '44', 1.5, true);
                    viz.drawSegment(proj[0], proj[1], v.x, v.y, viz.colors.red + '44', 1.5, true);

                    // Verify orthogonality
                    const dot = proj[0] * perpCompX + proj[1] * perpCompY;
                    viz.drawText(`⟨w, w⊥⟩ = ${dot.toFixed(4)}`, 0, -5.5, viz.colors.white, 12);
                    viz.drawText('v = w + w⊥', 0, -6.5, viz.colors.teal, 13);

                    // Show that W ∩ W⊥ = {0}
                    viz.drawText('W ∩ W⊥ = {0}', 0, 5.5, viz.colors.text, 11);
                }

                // Draw basis and target vector
                viz.drawVector(0, 0, w.x, w.y, viz.colors.blue, 'basis', 2);
                viz.drawVector(0, 0, v.x, v.y, viz.colors.purple, 'v', 2.5);

                viz.drawDraggables();
            }

            VizEngine.createButton(controls, 'Toggle W⊥', () => {
                showOrthogonalComplement = !showOrthogonalComplement;
                draw();
            });

            draw();
            return viz;
        }
    }
];

window.EXTRA_VIZ['ch09']['ch09-sec03'] = [
    {
        id: 'ch09-extra-viz-5',
        title: 'Interactive: Bessel\'s Inequality Demo',
        description: 'Visualize Bessel\'s inequality: ||proj_W(v)||² ≤ ||v||². The norm of the projection is always less than or equal to the norm of the original vector.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 600, height: 450, scale: 50});

            const e1 = viz.addDraggable('e1', 2, 0, viz.colors.blue, 8, () => draw());
            const e2 = viz.addDraggable('e2', 0, 2, viz.colors.orange, 8, () => draw());
            const v = viz.addDraggable('v', 3, 2.5, viz.colors.purple, 8, () => draw());

            let showSquares = false;

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Normalize basis vectors
                const norm1 = VizEngine.vecLen([e1.x, e1.y]);
                const norm2 = VizEngine.vecLen([e2.x, e2.y]);

                let u1 = norm1 > 0.1 ? [e1.x / norm1, e1.y / norm1] : [1, 0];
                let u2 = norm2 > 0.1 ? [e2.x / norm2, e2.y / norm2] : [0, 1];

                // Make orthonormal basis using Gram-Schmidt
                const dot = VizEngine.dot(u1, u2);
                u2[0] -= dot * u1[0];
                u2[1] -= dot * u1[1];
                const norm2_new = VizEngine.vecLen(u2);
                if (norm2_new > 0.1) {
                    u2[0] /= norm2_new;
                    u2[1] /= norm2_new;
                }

                // Draw orthonormal basis
                viz.drawVector(0, 0, u1[0] * 2, u1[1] * 2, viz.colors.blue, 'e₁', 2);
                viz.drawVector(0, 0, u2[0] * 2, u2[1] * 2, viz.colors.orange, 'e₂', 2);

                // Draw unit circles around basis vectors
                viz.drawCircle(0, 0, 1, null, viz.colors.blue + '44', 1);

                // Compute Fourier coefficients
                const c1 = VizEngine.dot([v.x, v.y], u1);
                const c2 = VizEngine.dot([v.x, v.y], u2);

                // Compute projection (Fourier expansion)
                const proj = [c1 * u1[0] + c2 * u2[0], c1 * u1[1] + c2 * u2[1]];

                // Draw projections onto each basis vector
                viz.drawVector(0, 0, c1 * u1[0], c1 * u1[1], viz.colors.teal + '88', 'c₁e₁', 1.5);
                viz.drawVector(c1 * u1[0], c1 * u1[1], proj[0], proj[1], viz.colors.green + '88', 'c₂e₂', 1.5);

                // Draw total projection
                viz.drawVector(0, 0, proj[0], proj[1], viz.colors.green, 'proj(v)', 2.5);

                // Draw original vector
                viz.drawVector(0, 0, v.x, v.y, viz.colors.purple, 'v', 2.5);

                // Compute norms
                const normProj = VizEngine.vecLen(proj);
                const normV = VizEngine.vecLen([v.x, v.y]);
                const sumSquaredCoeffs = c1 * c1 + c2 * c2;

                // Display Bessel's inequality
                viz.drawText('Bessel\'s Inequality:', 0, -6.5, viz.colors.white, 13);
                viz.drawText(`||proj(v)||² = c₁² + c₂² = ${sumSquaredCoeffs.toFixed(3)}`, 0, -5.5, viz.colors.green, 12);
                viz.drawText(`||v||² = ${(normV * normV).toFixed(3)}`, 0, -4.8, viz.colors.purple, 12);
                viz.drawText(`${sumSquaredCoeffs.toFixed(3)} ≤ ${(normV * normV).toFixed(3)} ✓`, 0, -4.0, viz.colors.teal, 12);

                // Show coefficients
                viz.drawText(`c₁ = ⟨v, e₁⟩ = ${c1.toFixed(3)}`, -6, 5.5, viz.colors.text, 11);
                viz.drawText(`c₂ = ⟨v, e₂⟩ = ${c2.toFixed(3)}`, -6, 4.8, viz.colors.text, 11);

                if (showSquares) {
                    // Visual representation of squared norms
                    viz.drawText(`Area: ${sumSquaredCoeffs.toFixed(2)}`, proj[0] / 2, proj[1] / 2, viz.colors.green, 11);
                    viz.drawPolygon([[0, 0], [proj[0], proj[1]], [proj[0] - proj[1], proj[1] + proj[0]], [-proj[1], proj[0]]],
                                   viz.colors.green + '22', viz.colors.green + '88', 1.5);
                }

                viz.drawDraggables();
            }

            VizEngine.createButton(controls, 'Toggle Squares', () => {
                showSquares = !showSquares;
                draw();
            });

            draw();
            return viz;
        }
    },

    {
        id: 'ch09-extra-viz-6',
        title: 'Interactive: Riesz Representation Theorem',
        description: 'Every linear functional φ on an inner product space has a unique representation φ(v) = ⟨v, w⟩ for some w. Drag w to define the functional.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 600, height: 450, scale: 50});

            // Riesz vector w determines the functional
            const w = viz.addDraggable('w', 2, 1.5, viz.colors.blue, 8, () => draw());
            const v = viz.addDraggable('v', 1, 2.5, viz.colors.purple, 8, () => draw());

            let showKernel = false;

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const normW = VizEngine.vecLen([w.x, w.y]);

                if (normW > 0.1) {
                    // The functional φ(v) = ⟨v, w⟩
                    const functionalValue = VizEngine.dot([v.x, v.y], [w.x, w.y]);

                    // Draw kernel (perpendicular line to w)
                    if (showKernel) {
                        const perpX = -w.y / normW;
                        const perpY = w.x / normW;

                        for (let t = -6; t <= 6; t += 0.2) {
                            const x = perpX * t;
                            const y = perpY * t;
                            viz.drawPoint(x, y, viz.colors.red + '33', null, 2);
                        }

                        viz.drawText('ker(φ) = {v : φ(v) = 0}', 0, 5.5, viz.colors.red, 12);
                        viz.drawText('ker(φ) = w⊥', 0, 4.7, viz.colors.text, 11);
                    }

                    // Draw level sets (lines parallel to kernel)
                    for (let c = -2; c <= 2; c += 0.5) {
                        if (Math.abs(c) < 0.1) continue;
                        const offset = c * normW;
                        const offsetX = w.x / normW * offset;
                        const offsetY = w.y / normW * offset;

                        const perpX = -w.y / normW;
                        const perpY = w.x / normW;

                        viz.drawSegment(
                            offsetX + perpX * 5, offsetY + perpY * 5,
                            offsetX - perpX * 5, offsetY - perpY * 5,
                            viz.colors.teal + '33', 1, true
                        );
                    }

                    // Draw Riesz vector w
                    viz.drawVector(0, 0, w.x, w.y, viz.colors.blue, 'w (Riesz vector)', 2.5);

                    // Draw test vector v
                    viz.drawVector(0, 0, v.x, v.y, viz.colors.purple, 'v', 2.5);

                    // Show projection of v onto w (geometrically represents the functional value)
                    const proj = VizEngine.proj([v.x, v.y], [w.x, w.y]);
                    viz.drawVector(0, 0, proj[0], proj[1], viz.colors.green, '', 2);
                    viz.drawSegment(v.x, v.y, proj[0], proj[1], viz.colors.yellow + '66', 1.5, true);

                    // Display functional value
                    viz.drawText(`φ(v) = ⟨v, w⟩ = ${functionalValue.toFixed(3)}`, 0, -5.5, viz.colors.white, 13);
                    viz.drawText(`||w|| = ${normW.toFixed(3)}`, 0, -6.5, viz.colors.blue, 11);

                    // Show that projection length relates to functional
                    const projLen = VizEngine.vecLen(proj);
                    const sign = VizEngine.dot([v.x, v.y], [w.x, w.y]) >= 0 ? '+' : '-';
                    viz.drawText(`proj length: ${sign}${projLen.toFixed(3)}`, 0, -4.3, viz.colors.green, 11);

                    // Info text
                    viz.drawText('Riesz Theorem: φ ↔ w unique', -6, -6.5, viz.colors.text, 10);
                }

                viz.drawDraggables();
            }

            VizEngine.createButton(controls, 'Toggle Kernel', () => {
                showKernel = !showKernel;
                draw();
            });

            draw();
            return viz;
        }
    }
];

window.EXTRA_VIZ['ch09']['ch09-sec04'] = [
    {
        id: 'ch09-extra-viz-7',
        title: 'Interactive: QR Factorization Visualization',
        description: 'Watch how Gram-Schmidt leads to QR factorization: A = QR where Q has orthonormal columns and R is upper triangular.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 650, height: 450, scale: 45});

            const a1 = viz.addDraggable('a1', 3, 0.5, viz.colors.blue, 8, () => draw());
            const a2 = viz.addDraggable('a2', 1.5, 2.5, viz.colors.orange, 8, () => draw());

            let showMatrices = false;

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const col1 = [a1.x, a1.y];
                const col2 = [a2.x, a2.y];

                // Gram-Schmidt to get Q
                let q1 = [...col1];
                const norm1 = VizEngine.vecLen(q1);
                if (norm1 > 0.01) {
                    q1[0] /= norm1;
                    q1[1] /= norm1;
                } else {
                    q1 = [1, 0];
                }

                // q2 = a2 - proj(a2, q1)
                const proj = VizEngine.proj(col2, q1);
                let q2 = [col2[0] - proj[0], col2[1] - proj[1]];
                const norm2 = VizEngine.vecLen(q2);
                if (norm2 > 0.01) {
                    q2[0] /= norm2;
                    q2[1] /= norm2;
                } else {
                    q2 = [-q1[1], q1[0]]; // perpendicular
                }

                // Compute R matrix coefficients
                const r11 = VizEngine.dot(col1, q1);
                const r12 = VizEngine.dot(col2, q1);
                const r22 = VizEngine.dot(col2, q2);

                // Draw original matrix A columns
                viz.drawVector(0, 0, col1[0], col1[1], viz.colors.blue + '66', 'a₁', 2);
                viz.drawVector(0, 0, col2[0], col2[1], viz.colors.orange + '66', 'a₂', 2);

                // Draw orthonormal Q columns
                viz.drawVector(0, 0, q1[0] * 2, q1[1] * 2, viz.colors.teal, 'q₁', 2.5);
                viz.drawVector(0, 0, q2[0] * 2, q2[1] * 2, viz.colors.green, 'q₂', 2.5);

                // Draw decomposition: a1 = r11*q1
                if (Math.abs(r11) > 0.01) {
                    viz.drawSegment(0, 0, col1[0], col1[1], viz.colors.yellow + '88', 2, true);
                }

                // Draw decomposition: a2 = r12*q1 + r22*q2
                const a2_component1 = [r12 * q1[0], r12 * q1[1]];
                const a2_component2 = [r22 * q2[0], r22 * q2[1]];
                viz.drawVector(0, 0, a2_component1[0], a2_component1[1], viz.colors.yellow + '66', '', 1.5);
                viz.drawVector(a2_component1[0], a2_component1[1],
                              a2_component1[0] + a2_component2[0],
                              a2_component1[1] + a2_component2[1],
                              viz.colors.yellow + '66', '', 1.5);

                if (showMatrices) {
                    // Display matrices as text
                    const matrixX = -6.5;
                    viz.drawText('A = Q R', matrixX, 5.5, viz.colors.white, 13);

                    // Matrix A
                    viz.drawText(`[${col1[0].toFixed(2)} ${col2[0].toFixed(2)}]`, matrixX, 4.5, viz.colors.text, 10);
                    viz.drawText(`[${col1[1].toFixed(2)} ${col2[1].toFixed(2)}]`, matrixX, 4.0, viz.colors.text, 10);

                    viz.drawText('=', matrixX + 2, 4.25, viz.colors.text, 12);

                    // Matrix Q
                    viz.drawText(`[${q1[0].toFixed(2)} ${q2[0].toFixed(2)}]`, matrixX + 2.5, 4.5, viz.colors.teal, 10);
                    viz.drawText(`[${q1[1].toFixed(2)} ${q2[1].toFixed(2)}]`, matrixX + 2.5, 4.0, viz.colors.teal, 10);

                    viz.drawText('×', matrixX + 4.5, 4.25, viz.colors.text, 12);

                    // Matrix R (upper triangular)
                    viz.drawText(`[${r11.toFixed(2)} ${r12.toFixed(2)}]`, matrixX + 5, 4.5, viz.colors.orange, 10);
                    viz.drawText(`[  0    ${r22.toFixed(2)}]`, matrixX + 5, 4.0, viz.colors.orange, 10);
                }

                // Info
                viz.drawText('QR Factorization (Gram-Schmidt)', 0, -5.5, viz.colors.white, 13);
                viz.drawText('Q: orthonormal columns', 0, -6.5, viz.colors.teal, 11);
                viz.drawText('R: upper triangular', 0, -7.3, viz.colors.orange, 11);

                viz.drawDraggables();
            }

            VizEngine.createButton(controls, 'Toggle Matrices', () => {
                showMatrices = !showMatrices;
                draw();
            });

            draw();
            return viz;
        }
    },

    {
        id: 'ch09-extra-viz-8',
        title: 'Interactive: Parseval\'s Identity for Orthonormal Bases',
        description: 'For orthonormal basis {e₁, e₂}, Parseval\'s identity states: ⟨u, v⟩ = ⟨u,e₁⟩⟨v,e₁⟩ + ⟨u,e₂⟩⟨v,e₂⟩. Drag vectors to verify.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 600, height: 450, scale: 50});

            const u = viz.addDraggable('u', 2, 1, viz.colors.blue, 8, () => draw());
            const v = viz.addDraggable('v', 1, 2.5, viz.colors.purple, 8, () => draw());

            // Fixed orthonormal basis
            const e1 = [1, 0];
            const e2 = [0, 1];

            let showCoefficients = true;

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw orthonormal basis
                viz.drawVector(0, 0, e1[0] * 2, e1[1] * 2, viz.colors.teal, 'e₁', 2);
                viz.drawVector(0, 0, e2[0] * 2, e2[1] * 2, viz.colors.green, 'e₂', 2);

                // Draw unit circle to show orthonormality
                viz.drawCircle(0, 0, 1, null, viz.colors.teal + '44', 1);

                // Draw vectors u and v
                viz.drawVector(0, 0, u.x, u.y, viz.colors.blue, 'u', 2.5);
                viz.drawVector(0, 0, v.x, v.y, viz.colors.purple, 'v', 2.5);

                // Compute Fourier coefficients
                const u1 = VizEngine.dot([u.x, u.y], e1);
                const u2 = VizEngine.dot([u.x, u.y], e2);
                const v1 = VizEngine.dot([v.x, v.y], e1);
                const v2 = VizEngine.dot([v.x, v.y], e2);

                // Show projections
                if (showCoefficients) {
                    viz.drawSegment(u.x, u.y, u1, 0, viz.colors.blue + '66', 1.5, true);
                    viz.drawSegment(u.x, u.y, 0, u2, viz.colors.blue + '66', 1.5, true);
                    viz.drawSegment(v.x, v.y, v1, 0, viz.colors.purple + '66', 1.5, true);
                    viz.drawSegment(v.x, v.y, 0, v2, viz.colors.purple + '66', 1.5, true);

                    viz.drawPoint(u1, 0, viz.colors.blue, null, 4);
                    viz.drawPoint(0, u2, viz.colors.blue, null, 4);
                    viz.drawPoint(v1, 0, viz.colors.purple, null, 4);
                    viz.drawPoint(0, v2, viz.colors.purple, null, 4);
                }

                // Compute inner products
                const directInnerProduct = VizEngine.dot([u.x, u.y], [v.x, v.y]);
                const parsevalInnerProduct = u1 * v1 + u2 * v2;

                // Compute norms (Bessel's identity)
                const normUSq = u.x * u.x + u.y * u.y;
                const sumCoeffsSq = u1 * u1 + u2 * u2;

                // Display Parseval's identity
                viz.drawText('Parseval\'s Identity:', 0, -5.5, viz.colors.white, 13);
                viz.drawText(`⟨u, v⟩ = ${directInnerProduct.toFixed(4)}`, 0, -4.5, viz.colors.text, 12);
                viz.drawText(`⟨u,e₁⟩⟨v,e₁⟩ + ⟨u,e₂⟩⟨v,e₂⟩ = ${parsevalInnerProduct.toFixed(4)}`, 0, -3.7, viz.colors.text, 11);
                viz.drawText(`${u1.toFixed(2)}×${v1.toFixed(2)} + ${u2.toFixed(2)}×${v2.toFixed(2)} = ${parsevalInnerProduct.toFixed(4)}`,
                           0, -3.0, viz.colors.teal, 11);

                const diff = Math.abs(directInnerProduct - parsevalInnerProduct);
                if (diff < 0.001) {
                    viz.drawText('✓ Identity verified!', 0, -2.2, viz.colors.green, 12);
                }

                // Show Bessel's identity as special case
                viz.drawText(`Bessel: ||u||² = ${normUSq.toFixed(3)}, sum = ${sumCoeffsSq.toFixed(3)}`,
                           0, 5.5, viz.colors.text, 11);

                viz.drawDraggables();
            }

            VizEngine.createButton(controls, 'Toggle Projections', () => {
                showCoefficients = !showCoefficients;
                draw();
            });

            draw();
            return viz;
        }
    }
];
