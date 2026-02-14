// Chapter 10: Structure Theory for Normal Operators - Extra Visualizations

window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch10'] = window.EXTRA_VIZ['ch10'] || {};

// Extra visualizations for all sections
window.EXTRA_VIZ['ch10']['ch10-sec01'] = [
    {
        id: 'ch10-extra-viz-1',
        title: 'Interactive: Spectral Decomposition of Normal Operators',
        description: 'Visualize how a normal operator decomposes into orthogonal eigenspaces. Drag the vector to see projection onto eigenspaces.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 600, height: 500, scale: 50});

            // Create angle slider for the normal operator
            const angleSlider = VizEngine.createSlider(controls, 'Rotation angle θ', 0, 360, 45, 1, draw);
            const stretchSlider = VizEngine.createSlider(controls, 'Eigenvalue λ₁', 0.5, 3, 1.5, 0.1, draw);
            const stretch2Slider = VizEngine.createSlider(controls, 'Eigenvalue λ₂', 0.5, 3, 0.8, 0.1, draw);

            // Draggable input vector
            const v = viz.addDraggable('v', 3, 2, viz.colors.white, 8, draw);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const theta = angleSlider.value * Math.PI / 180;
                const lambda1 = parseFloat(stretchSlider.value);
                const lambda2 = parseFloat(stretch2Slider.value);

                // Eigenvectors (orthogonal)
                const e1 = [Math.cos(theta), Math.sin(theta)];
                const e2 = [-Math.sin(theta), Math.cos(theta)];

                // Draw eigenspaces
                for (let t = -10; t <= 10; t += 0.2) {
                    viz.drawPoint(t * e1[0], t * e1[1], viz.colors.blue + '22', null, 2);
                    viz.drawPoint(t * e2[0], t * e2[1], viz.colors.orange + '22', null, 2);
                }

                // Draw eigenvectors
                viz.drawVector(0, 0, 2 * e1[0], 2 * e1[1], viz.colors.blue, 'e₁', 2);
                viz.drawVector(0, 0, 2 * e2[0], 2 * e2[1], viz.colors.orange, 'e₂', 2);

                // Project v onto eigenspaces
                const proj1 = VizEngine.dot([v.x, v.y], e1);
                const proj2 = VizEngine.dot([v.x, v.y], e2);

                const v1 = [proj1 * e1[0], proj1 * e1[1]];
                const v2 = [proj2 * e2[0], proj2 * e2[1]];

                // Draw projections
                viz.drawVector(0, 0, v1[0], v1[1], viz.colors.blue + 'aa', null, 1.5);
                viz.drawVector(0, 0, v2[0], v2[1], viz.colors.orange + 'aa', null, 1.5);
                viz.drawSegment(v1[0], v1[1], v.x, v.y, viz.colors.teal + '66', 1, true);
                viz.drawSegment(v2[0], v2[1], v.x, v.y, viz.colors.teal + '66', 1, true);

                // Apply T to v: T(v) = λ₁⟨v,e₁⟩e₁ + λ₂⟨v,e₂⟩e₂
                const Tv = [lambda1 * v1[0] + lambda2 * v2[0], lambda1 * v1[1] + lambda2 * v2[1]];

                // Draw original and transformed vectors
                viz.drawVector(0, 0, v.x, v.y, viz.colors.white, 'v', 3);
                viz.drawVector(0, 0, Tv[0], Tv[1], viz.colors.green, 'T(v)', 3);

                // Draw spectral decomposition components
                const Tv1 = [lambda1 * v1[0], lambda1 * v1[1]];
                const Tv2 = [lambda2 * v2[0], lambda2 * v2[1]];
                viz.drawVector(0, 0, Tv1[0], Tv1[1], viz.colors.blue + 'dd', 'λ₁P₁(v)', 1.5);
                viz.drawVector(0, 0, Tv2[0], Tv2[1], viz.colors.orange + 'dd', 'λ₂P₂(v)', 1.5);

                viz.drawDraggables();

                // Display spectral decomposition formula
                viz.drawText('T = λ₁P₁ + λ₂P₂', 10, 20, viz.colors.text, 14, 'left', 'top');
                viz.drawText(`λ₁ = ${lambda1.toFixed(2)}, λ₂ = ${lambda2.toFixed(2)}`, 10, 40, viz.colors.text, 12, 'left', 'top');
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch10-extra-viz-2',
        title: 'Interactive: Self-Adjoint Operators Have Real Eigenvalues',
        description: 'See how self-adjoint (Hermitian) operators always have real eigenvalues. Adjust the symmetric matrix entries.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 600, height: 500, scale: 50});

            const aSlider = VizEngine.createSlider(controls, 'a₁₁', -2, 2, 1, 0.1, draw);
            const bSlider = VizEngine.createSlider(controls, 'a₁₂ = a₂₁', -2, 2, 0.5, 0.1, draw);
            const dSlider = VizEngine.createSlider(controls, 'a₂₂', -2, 2, 0.8, 0.1, draw);

            const v1 = viz.addDraggable('v1', 2, 1.5, viz.colors.white, 8, draw);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const a = parseFloat(aSlider.value);
                const b = parseFloat(bSlider.value);
                const d = parseFloat(dSlider.value);

                // Symmetric matrix (self-adjoint)
                const A = [[a, b], [b, d]];

                // Compute eigenvalues using quadratic formula
                const trace = a + d;
                const det = a * d - b * b;
                const discriminant = trace * trace - 4 * det;

                // For symmetric matrices, discriminant is always >= 0
                const lambda1 = (trace + Math.sqrt(Math.max(0, discriminant))) / 2;
                const lambda2 = (trace - Math.sqrt(Math.max(0, discriminant))) / 2;

                // Compute eigenvectors
                let e1, e2;
                if (Math.abs(b) > 0.001) {
                    // Use first row to get eigenvector
                    const v1x = b;
                    const v1y = lambda1 - a;
                    const len1 = Math.sqrt(v1x * v1x + v1y * v1y);
                    e1 = len1 > 0.001 ? [v1x / len1, v1y / len1] : [1, 0];

                    const v2x = b;
                    const v2y = lambda2 - a;
                    const len2 = Math.sqrt(v2x * v2x + v2y * v2y);
                    e2 = len2 > 0.001 ? [v2x / len2, v2y / len2] : [0, 1];
                } else {
                    e1 = [1, 0];
                    e2 = [0, 1];
                }

                // Draw eigenspaces
                for (let t = -10; t <= 10; t += 0.3) {
                    viz.drawPoint(t * e1[0], t * e1[1], viz.colors.blue + '33', null, 2);
                    viz.drawPoint(t * e2[0], t * e2[1], viz.colors.orange + '33', null, 2);
                }

                // Draw eigenvectors with lengths proportional to eigenvalues
                const scale1 = Math.sign(lambda1) * Math.min(Math.abs(lambda1), 3);
                const scale2 = Math.sign(lambda2) * Math.min(Math.abs(lambda2), 3);

                viz.drawVector(0, 0, scale1 * e1[0], scale1 * e1[1], viz.colors.blue, 'e₁', 3);
                viz.drawVector(0, 0, scale2 * e2[0], scale2 * e2[1], viz.colors.orange, 'e₂', 3);

                // Apply A to draggable vector
                const Av = VizEngine.matVec(A, [v1.x, v1.y]);

                viz.drawVector(0, 0, v1.x, v1.y, viz.colors.white, 'v', 2.5);
                viz.drawVector(0, 0, Av[0], Av[1], viz.colors.green, 'Av', 2.5);

                viz.drawDraggables();

                // Display matrix and eigenvalues
                viz.drawText('Self-Adjoint Matrix A:', 10, 20, viz.colors.text, 14, 'left', 'top');
                viz.drawText(`[${a.toFixed(2)}  ${b.toFixed(2)}]`, 10, 40, viz.colors.text, 12, 'left', 'top');
                viz.drawText(`[${b.toFixed(2)}  ${d.toFixed(2)}]`, 10, 55, viz.colors.text, 12, 'left', 'top');
                viz.drawText(`λ₁ = ${lambda1.toFixed(3)} (REAL)`, 10, 80, viz.colors.blue, 13, 'left', 'top');
                viz.drawText(`λ₂ = ${lambda2.toFixed(3)} (REAL)`, 10, 100, viz.colors.orange, 13, 'left', 'top');
                viz.drawText('Eigenspaces are orthogonal', 10, 125, viz.colors.teal, 12, 'left', 'top');
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch10-extra-viz-3',
        title: 'Interactive: Unitary Operators Preserve Lengths and Angles',
        description: 'Drag vectors to see how unitary operators preserve inner products, lengths, and orthogonality.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 600, height: 500, scale: 50});

            const rotationSlider = VizEngine.createSlider(controls, 'Rotation angle θ', 0, 360, 60, 1, draw);

            const v1 = viz.addDraggable('v1', 2.5, 1, viz.colors.blue, 8, draw);
            const v2 = viz.addDraggable('v2', 1, 2, viz.colors.orange, 8, draw);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const theta = rotationSlider.value * Math.PI / 180;

                // Unitary matrix (rotation)
                const U = [[Math.cos(theta), -Math.sin(theta)],
                          [Math.sin(theta), Math.cos(theta)]];

                // Apply U to vectors
                const Uv1 = VizEngine.matVec(U, [v1.x, v1.y]);
                const Uv2 = VizEngine.matVec(U, [v2.x, v2.y]);

                // Draw unit circle for reference
                viz.drawCircle(0, 0, 1, null, viz.colors.grid);

                // Draw original vectors
                viz.drawVector(0, 0, v1.x, v1.y, viz.colors.blue, 'v', 2.5);
                viz.drawVector(0, 0, v2.x, v2.y, viz.colors.orange, 'w', 2.5);

                // Draw transformed vectors
                viz.drawVector(0, 0, Uv1[0], Uv1[1], viz.colors.blue + 'dd', 'U(v)', 2.5);
                viz.drawVector(0, 0, Uv2[0], Uv2[1], viz.colors.orange + 'dd', 'U(w)', 2.5);

                // Draw angle indicators
                const angle1 = Math.atan2(v1.y, v1.x);
                const angle2 = Math.atan2(v2.y, v2.x);
                const angleU1 = Math.atan2(Uv1[1], Uv1[0]);
                const angleU2 = Math.atan2(Uv2[1], Uv2[0]);

                // Original angle between vectors
                const origAngle = Math.abs(angle2 - angle1);
                const transAngle = Math.abs(angleU2 - angleU1);

                // Compute lengths
                const len1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
                const len2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
                const lenU1 = Math.sqrt(Uv1[0] * Uv1[0] + Uv1[1] * Uv1[1]);
                const lenU2 = Math.sqrt(Uv2[0] * Uv2[0] + Uv2[1] * Uv2[1]);

                // Compute inner products
                const innerProd = v1.x * v2.x + v1.y * v2.y;
                const innerProdU = Uv1[0] * Uv2[0] + Uv1[1] * Uv2[1];

                viz.drawDraggables();

                // Display preservation properties
                viz.drawText('UNITARY OPERATOR (Rotation)', 10, 20, viz.colors.text, 14, 'left', 'top');
                viz.drawText('Preserves:', 10, 45, viz.colors.white, 13, 'left', 'top');
                viz.drawText(`‖v‖: ${len1.toFixed(3)} → ${lenU1.toFixed(3)} ✓`, 20, 65, viz.colors.green, 12, 'left', 'top');
                viz.drawText(`‖w‖: ${len2.toFixed(3)} → ${lenU2.toFixed(3)} ✓`, 20, 82, viz.colors.green, 12, 'left', 'top');
                viz.drawText(`⟨v,w⟩: ${innerProd.toFixed(3)} → ${innerProdU.toFixed(3)} ✓`, 20, 99, viz.colors.green, 12, 'left', 'top');

                // Draw arc for angle
                if (len1 > 0.5 && len2 > 0.5) {
                    const arcRadius = 0.8;
                    viz.drawText(`Angle preserved: ${(origAngle * 180 / Math.PI).toFixed(1)}°`, 20, 116, viz.colors.teal, 12, 'left', 'top');
                }
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch10-extra-viz-4',
        title: 'Interactive: Normal vs Non-Normal Operators',
        description: 'Compare how normal operators (TT* = T*T) differ from non-normal operators in their spectral properties.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 600, height: 500, scale: 50});

            const normalSlider = VizEngine.createSlider(controls, 'Non-normality (shear)', 0, 1, 0, 0.05, draw);
            const rotationSlider = VizEngine.createSlider(controls, 'Base rotation', 0, 180, 30, 5, draw);
            const scaleSlider = VizEngine.createSlider(controls, 'Stretch ratio', 0.5, 2, 1.5, 0.1, draw);

            const v = viz.addDraggable('v', 2, 1.5, viz.colors.white, 8, draw);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const shear = parseFloat(normalSlider.value);
                const theta = rotationSlider.value * Math.PI / 180;
                const stretch = parseFloat(scaleSlider.value);

                // Create operator: rotation + stretch + shear
                const cos = Math.cos(theta);
                const sin = Math.sin(theta);

                // Normal part: rotation matrix
                const R = [[cos, -sin], [sin, cos]];

                // Stretch along eigendirections
                const S = [[stretch, 0], [0, 1/stretch]];

                // Shear (makes it non-normal)
                const Sh = [[1, shear], [0, 1]];

                // T = R * S * R^T * Sh (when shear=0, this is normal)
                let T = VizEngine.matMul(R, S);
                T = VizEngine.matMul(T, [[cos, sin], [-sin, cos]]);
                T = VizEngine.matMul(T, Sh);

                // Compute T*T and TT*
                const TStar = [[T[0][0], T[1][0]], [T[0][1], T[1][1]]]; // transpose for real case
                const TTStar = VizEngine.matMul(T, TStar);
                const TStarT = VizEngine.matMul(TStar, T);

                // Check if normal (TT* = T*T)
                const normDiff = Math.abs(TTStar[0][0] - TStarT[0][0]) +
                                Math.abs(TTStar[0][1] - TStarT[0][1]) +
                                Math.abs(TTStar[1][0] - TStarT[1][0]) +
                                Math.abs(TTStar[1][1] - TStarT[1][1]);

                const isNormal = normDiff < 0.01;

                // Apply T to test vector
                const Tv = VizEngine.matVec(T, [v.x, v.y]);

                // Draw unit circle and its image under T
                const circlePoints = [];
                for (let angle = 0; angle < 2 * Math.PI; angle += 0.1) {
                    const x = Math.cos(angle);
                    const y = Math.sin(angle);
                    const Tp = VizEngine.matVec(T, [x, y]);
                    circlePoints.push(Tp);
                }

                // Draw transformed circle
                viz.drawCircle(0, 0, 1, null, viz.colors.grid);
                for (let i = 0; i < circlePoints.length; i++) {
                    const next = (i + 1) % circlePoints.length;
                    viz.drawSegment(circlePoints[i][0], circlePoints[i][1],
                                   circlePoints[next][0], circlePoints[next][1],
                                   viz.colors.yellow + '88', 1.5);
                }

                // Try to show eigenvectors if they exist
                const eigenvals = VizEngine.eigenvalues2(T);
                if (eigenvals && shear < 0.3) {
                    const ev1 = VizEngine.eigenvector2(T, eigenvals[0]);
                    const ev2 = VizEngine.eigenvector2(T, eigenvals[1]);

                    if (ev1) {
                        for (let t = -8; t <= 8; t += 0.3) {
                            viz.drawPoint(t * ev1[0], t * ev1[1], viz.colors.blue + '33', null, 2);
                        }
                        viz.drawVector(0, 0, 2 * ev1[0], 2 * ev1[1], viz.colors.blue, 'e₁', 2);
                    }
                    if (ev2) {
                        for (let t = -8; t <= 8; t += 0.3) {
                            viz.drawPoint(t * ev2[0], t * ev2[1], viz.colors.orange + '33', null, 2);
                        }
                        viz.drawVector(0, 0, 2 * ev2[0], 2 * ev2[1], viz.colors.orange, 'e₂', 2);
                    }

                    // Check orthogonality
                    if (ev1 && ev2) {
                        const dotProd = Math.abs(VizEngine.dot(ev1, ev2));
                        const orthogonal = dotProd < 0.1;
                        viz.drawText(orthogonal ? 'Eigenvectors: ORTHOGONAL ✓' : 'Eigenvectors: NOT orthogonal ✗',
                                   10, 140, orthogonal ? viz.colors.green : viz.colors.red, 12, 'left', 'top');
                    }
                }

                // Draw vectors
                viz.drawVector(0, 0, v.x, v.y, viz.colors.white, 'v', 2.5);
                viz.drawVector(0, 0, Tv[0], Tv[1], viz.colors.green, 'T(v)', 2.5);

                viz.drawDraggables();

                // Display normality status
                viz.drawText(isNormal ? 'NORMAL OPERATOR ✓' : 'NON-NORMAL OPERATOR ✗',
                           10, 20, isNormal ? viz.colors.green : viz.colors.red, 14, 'left', 'top');
                viz.drawText(isNormal ? 'TT* = T*T' : 'TT* ≠ T*T', 10, 40, viz.colors.text, 12, 'left', 'top');
                viz.drawText(`Commutator ‖TT* - T*T‖ = ${normDiff.toFixed(4)}`, 10, 60, viz.colors.text, 11, 'left', 'top');

                if (isNormal) {
                    viz.drawText('Properties: Orthogonal eigenvectors', 10, 80, viz.colors.teal, 12, 'left', 'top');
                    viz.drawText('           Unitarily diagonalizable', 10, 97, viz.colors.teal, 12, 'left', 'top');
                }
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch10-extra-viz-5',
        title: 'Interactive: Positive Operators and Square Roots',
        description: 'Explore positive operators T (all eigenvalues ≥ 0) and their unique positive square root √T.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 600, height: 500, scale: 50});

            const lambda1Slider = VizEngine.createSlider(controls, 'Eigenvalue λ₁', 0.1, 3, 2, 0.1, draw);
            const lambda2Slider = VizEngine.createSlider(controls, 'Eigenvalue λ₂', 0.1, 3, 1, 0.1, draw);
            const thetaSlider = VizEngine.createSlider(controls, 'Eigenvector angle', 0, 180, 30, 5, draw);

            const v = viz.addDraggable('v', 2, 1.5, viz.colors.white, 8, draw);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const lambda1 = parseFloat(lambda1Slider.value);
                const lambda2 = parseFloat(lambda2Slider.value);
                const theta = thetaSlider.value * Math.PI / 180;

                // Eigenvectors
                const e1 = [Math.cos(theta), Math.sin(theta)];
                const e2 = [-Math.sin(theta), Math.cos(theta)];

                // Construct T = λ₁e₁e₁ᵀ + λ₂e₂e₂ᵀ (spectral decomposition)
                const T = [
                    [lambda1 * e1[0] * e1[0] + lambda2 * e2[0] * e2[0],
                     lambda1 * e1[0] * e1[1] + lambda2 * e2[0] * e2[1]],
                    [lambda1 * e1[1] * e1[0] + lambda2 * e2[1] * e2[0],
                     lambda1 * e1[1] * e1[1] + lambda2 * e2[1] * e2[1]]
                ];

                // Square root: √T = √λ₁e₁e₁ᵀ + √λ₂e₂e₂ᵀ
                const sqrtLambda1 = Math.sqrt(lambda1);
                const sqrtLambda2 = Math.sqrt(lambda2);
                const sqrtT = [
                    [sqrtLambda1 * e1[0] * e1[0] + sqrtLambda2 * e2[0] * e2[0],
                     sqrtLambda1 * e1[0] * e1[1] + sqrtLambda2 * e2[0] * e2[1]],
                    [sqrtLambda1 * e1[1] * e1[0] + sqrtLambda2 * e2[1] * e2[0],
                     sqrtLambda1 * e1[1] * e1[1] + sqrtLambda2 * e2[1] * e2[1]]
                ];

                // Draw eigenspaces
                for (let t = -10; t <= 10; t += 0.3) {
                    viz.drawPoint(t * e1[0], t * e1[1], viz.colors.blue + '22', null, 2);
                    viz.drawPoint(t * e2[0], t * e2[1], viz.colors.orange + '22', null, 2);
                }

                // Draw eigenvectors scaled by eigenvalues
                viz.drawVector(0, 0, lambda1 * e1[0], lambda1 * e1[1], viz.colors.blue,
                             `λ₁e₁ (${lambda1.toFixed(2)})`, 3);
                viz.drawVector(0, 0, lambda2 * e2[0], lambda2 * e2[1], viz.colors.orange,
                             `λ₂e₂ (${lambda2.toFixed(2)})`, 3);

                // Draw sqrt eigenvalues
                viz.drawVector(0, 0, sqrtLambda1 * e1[0], sqrtLambda1 * e1[1],
                             viz.colors.blue + 'aa', null, 1.5);
                viz.drawVector(0, 0, sqrtLambda2 * e2[0], sqrtLambda2 * e2[1],
                             viz.colors.orange + 'aa', null, 1.5);

                // Apply operators to v
                const Tv = VizEngine.matVec(T, [v.x, v.y]);
                const sqrtTv = VizEngine.matVec(sqrtT, [v.x, v.y]);

                // Draw v, √T(v), and T(v)
                viz.drawVector(0, 0, v.x, v.y, viz.colors.white, 'v', 2.5);
                viz.drawVector(0, 0, sqrtTv[0], sqrtTv[1], viz.colors.teal, '√T(v)', 2.5);
                viz.drawVector(0, 0, Tv[0], Tv[1], viz.colors.green, 'T(v)', 2.5);

                // Verify (√T)² = T
                const sqrtTSquared = VizEngine.matVec(sqrtT, sqrtTv);
                const error = Math.sqrt((Tv[0] - sqrtTSquared[0]) ** 2 + (Tv[1] - sqrtTSquared[1]) ** 2);

                // Draw ellipse showing T applied to unit circle
                const ellipsePoints = [];
                for (let angle = 0; angle < 2 * Math.PI; angle += 0.1) {
                    const x = Math.cos(angle);
                    const y = Math.sin(angle);
                    const Tp = VizEngine.matVec(T, [x, y]);
                    ellipsePoints.push(Tp);
                }
                for (let i = 0; i < ellipsePoints.length; i++) {
                    const next = (i + 1) % ellipsePoints.length;
                    viz.drawSegment(ellipsePoints[i][0], ellipsePoints[i][1],
                                   ellipsePoints[next][0], ellipsePoints[next][1],
                                   viz.colors.purple + '44', 1);
                }

                viz.drawDraggables();

                // Display information
                viz.drawText('POSITIVE OPERATOR T', 10, 20, viz.colors.green, 14, 'left', 'top');
                viz.drawText(`λ₁ = ${lambda1.toFixed(2)} > 0 ✓`, 10, 45, viz.colors.blue, 12, 'left', 'top');
                viz.drawText(`λ₂ = ${lambda2.toFixed(2)} > 0 ✓`, 10, 62, viz.colors.orange, 12, 'left', 'top');
                viz.drawText(`√λ₁ = ${sqrtLambda1.toFixed(3)}, √λ₂ = ${sqrtLambda2.toFixed(3)}`, 10, 85, viz.colors.teal, 12, 'left', 'top');
                viz.drawText(`Verify: (√T)²(v) = T(v)`, 10, 105, viz.colors.text, 12, 'left', 'top');
                viz.drawText(`Error: ${error.toFixed(6)}`, 10, 122, viz.colors.text, 11, 'left', 'top');
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch10-extra-viz-6',
        title: 'Interactive: Polar Decomposition T = UP (Rotation × Stretch)',
        description: 'Every operator decomposes as T = UP where U is unitary (rotation) and P is positive (stretch). Like z = re^(iθ) for complex numbers!',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 600, height: 500, scale: 50});

            const rotationSlider = VizEngine.createSlider(controls, 'Rotation angle θ', 0, 360, 45, 5, draw);
            const stretchXSlider = VizEngine.createSlider(controls, 'Stretch along x', 0.3, 3, 2, 0.1, draw);
            const stretchYSlider = VizEngine.createSlider(controls, 'Stretch along y', 0.3, 3, 1, 0.1, draw);

            const showStepsBtn = VizEngine.createButton(controls, 'Toggle Decomposition Steps', () => {
                showSteps = !showSteps;
                draw();
            });

            let showSteps = false;
            const v = viz.addDraggable('v', 1.5, 1, viz.colors.white, 8, draw);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const theta = rotationSlider.value * Math.PI / 180;
                const sx = parseFloat(stretchXSlider.value);
                const sy = parseFloat(stretchYSlider.value);

                // Unitary operator U (rotation)
                const cos = Math.cos(theta);
                const sin = Math.sin(theta);
                const U = [[cos, -sin], [sin, cos]];

                // Positive operator P (stretch along axes)
                const P = [[sx, 0], [0, sy]];

                // Combined T = UP
                const T = VizEngine.matMul(U, P);

                // Apply transformations
                const Pv = VizEngine.matVec(P, [v.x, v.y]); // First stretch
                const UPv = VizEngine.matVec(U, Pv);        // Then rotate
                const Tv = VizEngine.matVec(T, [v.x, v.y]); // Direct application

                // Verify decomposition
                const error = Math.sqrt((Tv[0] - UPv[0]) ** 2 + (Tv[1] - UPv[1]) ** 2);

                // Draw unit circle and its images
                const circlePoints = [];
                const pCirclePoints = [];
                const tCirclePoints = [];

                for (let angle = 0; angle < 2 * Math.PI; angle += 0.08) {
                    const x = Math.cos(angle);
                    const y = Math.sin(angle);
                    circlePoints.push([x, y]);

                    const p = VizEngine.matVec(P, [x, y]);
                    pCirclePoints.push(p);

                    const t = VizEngine.matVec(T, [x, y]);
                    tCirclePoints.push(t);
                }

                // Draw original circle
                viz.drawCircle(0, 0, 1, null, viz.colors.grid);

                if (showSteps) {
                    // Show step-by-step transformation

                    // Step 1: Original vector
                    viz.drawVector(0, 0, v.x, v.y, viz.colors.white, 'v', 2);

                    // Step 2: After P (stretch)
                    for (let i = 0; i < pCirclePoints.length; i++) {
                        const next = (i + 1) % pCirclePoints.length;
                        viz.drawSegment(pCirclePoints[i][0], pCirclePoints[i][1],
                                       pCirclePoints[next][0], pCirclePoints[next][1],
                                       viz.colors.teal + '66', 1.5);
                    }
                    viz.drawVector(0, 0, Pv[0], Pv[1], viz.colors.teal, 'P(v)', 2.5);

                    // Step 3: After U (rotate)
                    for (let i = 0; i < tCirclePoints.length; i++) {
                        const next = (i + 1) % tCirclePoints.length;
                        viz.drawSegment(tCirclePoints[i][0], tCirclePoints[i][1],
                                       tCirclePoints[next][0], tCirclePoints[next][1],
                                       viz.colors.yellow + '88', 2);
                    }
                    viz.drawVector(0, 0, UPv[0], UPv[1], viz.colors.yellow, 'UP(v)=T(v)', 3);

                    // Draw path
                    viz.drawSegment(v.x, v.y, Pv[0], Pv[1], viz.colors.teal + '44', 1, true);
                    viz.drawSegment(Pv[0], Pv[1], UPv[0], UPv[1], viz.colors.yellow + '44', 1, true);

                } else {
                    // Show final result only
                    for (let i = 0; i < tCirclePoints.length; i++) {
                        const next = (i + 1) % tCirclePoints.length;
                        viz.drawSegment(tCirclePoints[i][0], tCirclePoints[i][1],
                                       tCirclePoints[next][0], tCirclePoints[next][1],
                                       viz.colors.yellow + '88', 2);
                    }

                    viz.drawVector(0, 0, v.x, v.y, viz.colors.white, 'v', 2.5);
                    viz.drawVector(0, 0, Tv[0], Tv[1], viz.colors.green, 'T(v)', 3);
                }

                // Draw principal axes of stretch
                viz.drawVector(0, 0, sx * Math.cos(theta), sx * Math.sin(theta),
                             viz.colors.blue + '88', null, 1.5);
                viz.drawVector(0, 0, sy * Math.cos(theta + Math.PI/2), sy * Math.sin(theta + Math.PI/2),
                             viz.colors.orange + '88', null, 1.5);

                viz.drawDraggables();

                // Display decomposition info
                viz.drawText('POLAR DECOMPOSITION: T = UP', 10, 20, viz.colors.text, 14, 'left', 'top');
                viz.drawText('U = unitary (rotation)', 10, 45, viz.colors.yellow, 12, 'left', 'top');
                viz.drawText(`    θ = ${rotationSlider.value}°`, 20, 62, viz.colors.text, 11, 'left', 'top');
                viz.drawText('P = positive (stretch)', 10, 82, viz.colors.teal, 12, 'left', 'top');
                viz.drawText(`    eigenvalues: ${sx.toFixed(2)}, ${sy.toFixed(2)}`, 20, 99, viz.colors.text, 11, 'left', 'top');

                if (showSteps) {
                    viz.drawText('Showing: v → P(v) → U(P(v))', 10, 125, viz.colors.white, 12, 'left', 'top');
                } else {
                    viz.drawText('Click button to see steps', 10, 125, viz.colors.text, 11, 'left', 'top');
                }

                viz.drawText(`Verification: ‖UP(v) - T(v)‖ = ${error.toFixed(6)}`, 10, 145, viz.colors.text, 10, 'left', 'top');
            }

            draw();
            return viz;
        }
    }
];
