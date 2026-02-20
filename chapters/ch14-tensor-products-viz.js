window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch14'] = window.EXTRA_VIZ['ch14'] || {};

// Section 1: The Tensor Product and Universal Property
window.EXTRA_VIZ['ch14']['ch14-sec01'] = [
    {
        id: 'ch14-extra-viz-1',
        title: 'Tensor Product v⊗w as Grid/Area Visualization',
        description: 'Drag vectors v and w to see their tensor product as a grid of basis vectors',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const v = viz.addDraggable('v', 2, 1, viz.colors.blue, 8, () => draw());
            const w = viz.addDraggable('w', 1, 2, viz.colors.orange, 8, () => draw());

            let showBasis = true;
            const toggleButton = VizEngine.createButton(controls, 'Toggle Basis Grid', () => {
                showBasis = !showBasis;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // The tensor product v⊗w can be visualized as a rank-1 tensor
                // representing the outer product matrix
                // In 2D, this creates a grid pattern scaled by components

                if (showBasis) {
                    // Show basis decomposition: v⊗w = (v₁e₁ + v₂e₂)⊗(w₁e₁ + w₂e₂)
                    // = v₁w₁(e₁⊗e₁) + v₁w₂(e₁⊗e₂) + v₂w₁(e₂⊗e₁) + v₂w₂(e₂⊗e₂)

                    const bases = [
                        [[1,0], [1,0], v.x * w.x, 'v₁w₁'],  // e₁⊗e₁
                        [[1,0], [0,1], v.x * w.y, 'v₁w₂'],  // e₁⊗e₂
                        [[0,1], [1,0], v.y * w.x, 'v₂w₁'],  // e₂⊗e₁
                        [[0,1], [0,1], v.y * w.y, 'v₂w₂']   // e₂⊗e₂
                    ];

                    const positions = [[-3, 2], [1, 2], [-3, -2], [1, -2]];

                    bases.forEach(([vec1, vec2, coef, label], idx) => {
                        const [ox, oy] = positions[idx];
                        const scale = 0.8;

                        // Draw mini coordinate system
                        viz.drawSegment(ox - scale, oy, ox + scale, oy, viz.colors.text + '44', 1);
                        viz.drawSegment(ox, oy - scale, ox, oy + scale, viz.colors.text + '44', 1);

                        // Draw basis vectors
                        viz.drawVector(ox, oy, ox + vec1[0] * scale, oy + vec1[1] * scale,
                                      viz.colors.blue + '88', null, 2);
                        viz.drawVector(ox, oy, ox + vec2[0] * scale, oy + vec2[1] * scale,
                                      viz.colors.orange + '88', null, 2);

                        // Draw parallelogram showing tensor product structure
                        const corner1 = [ox + vec1[0] * scale, oy + vec1[1] * scale];
                        const corner2 = [ox + vec2[0] * scale, oy + vec2[1] * scale];
                        const corner3 = [ox + (vec1[0] + vec2[0]) * scale, oy + (vec1[1] + vec2[1]) * scale];
                        viz.drawPolygon(
                            [[ox, oy], corner1, corner3, corner2],
                            viz.colors.teal + '22',
                            viz.colors.teal + '88',
                            1
                        );

                        viz.drawText(`${coef.toFixed(2)}·${label}`, ox, oy - scale - 0.5,
                                    viz.colors.white, 11, 'center');
                    });
                }

                // Draw main vectors
                viz.drawVector(0, 0, v.x, v.y, viz.colors.blue, 'v', 3);
                viz.drawVector(0, 0, w.x, w.y, viz.colors.orange, 'w', 3);

                // Draw parallelogram showing area = |det(v,w)|
                viz.drawPolygon(
                    [[0, 0], [v.x, v.y], [v.x + w.x, v.y + w.y], [w.x, w.y]],
                    viz.colors.purple + '22',
                    viz.colors.purple,
                    2
                );

                viz.drawDraggables();

                const det = v.x * w.y - v.y * w.x;
                viz.drawText(`v⊗w ∈ V⊗W (rank-1 tensor)`, 0, 4.5, viz.colors.white, 14, 'center');
                viz.drawText(`Area = |det([v|w])| = ${Math.abs(det).toFixed(2)}`,
                            0, -4.5, viz.colors.purple, 13, 'center');
            }

            draw();
            return viz;
        }
    },,
    {
        id: 'ch14-extra-viz-2',
        title: 'Universal Property of Tensor Product',
        description: 'Interactive factorization diagram showing how bilinear maps factor through V⊗W',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            let selectedMap = 0;
            const slider = VizEngine.createSlider(controls, 'Bilinear Map Type', 0, 2, 0, 1, (val) => {
                selectedMap = val;
                draw();
            });

            function draw() {
                viz.clear();

                // Draw commutative diagram:
                //     V × W  ---(bilinear)--→  Z
                //        ↘ ⊗      ↗ (unique linear)
                //         V⊗W

                const vwPos = {x: -4, y: 2};
                const tensorPos = {x: -1, y: -1};
                const zPos = {x: 4, y: 2};

                // Draw nodes
                viz.drawPoint(vwPos.x, vwPos.y, viz.colors.blue, null, 12);
                viz.drawText('V×W', vwPos.x, vwPos.y + 0.7, viz.colors.blue, 16, 'center');

                viz.drawPoint(tensorPos.x, tensorPos.y, viz.colors.teal, null, 12);
                viz.drawText('V⊗W', tensorPos.x, tensorPos.y - 0.7, viz.colors.teal, 16, 'center');

                viz.drawPoint(zPos.x, zPos.y, viz.colors.orange, null, 12);
                viz.drawText('Z', zPos.x, zPos.y + 0.7, viz.colors.orange, 16, 'center');

                // Draw arrows
                // V×W → V⊗W (tensor product map ⊗)
                viz.drawSegment(vwPos.x + 0.3, vwPos.y - 0.3,
                               tensorPos.x - 0.3, tensorPos.y + 0.3,
                               viz.colors.blue, 3);
                viz.drawText('⊗', (vwPos.x + tensorPos.x) / 2 - 0.7,
                            (vwPos.y + tensorPos.y) / 2, viz.colors.blue, 14);

                // V×W → Z (bilinear map g)
                viz.drawSegment(vwPos.x + 0.3, vwPos.y,
                               zPos.x - 0.3, zPos.y,
                               viz.colors.purple, 3);
                viz.drawText('g (bilinear)', (vwPos.x + zPos.x) / 2, vwPos.y + 0.7,
                            viz.colors.purple, 13, 'center');

                // V⊗W → Z (unique linear map φ)
                viz.drawSegment(tensorPos.x + 0.3, tensorPos.y + 0.3,
                               zPos.x - 0.3, zPos.y - 0.3,
                               viz.colors.green, 3, false);
                // Add dashed effect
                for (let t = 0; t < 1; t += 0.1) {
                    const x1 = tensorPos.x + 0.3 + t * (zPos.x - 0.3 - tensorPos.x - 0.3);
                    const y1 = tensorPos.y + 0.3 + t * (zPos.y - 0.3 - tensorPos.y - 0.3);
                    const x2 = tensorPos.x + 0.3 + (t + 0.05) * (zPos.x - 0.3 - tensorPos.x - 0.3);
                    const y2 = tensorPos.y + 0.3 + (t + 0.05) * (zPos.y - 0.3 - tensorPos.y - 0.3);
                    viz.drawSegment(x1, y1, x2, y2, viz.colors.green, 3);
                }
                viz.drawText('∃! φ (linear)', (tensorPos.x + zPos.x) / 2 + 1,
                            (tensorPos.y + zPos.y) / 2 - 0.5, viz.colors.green, 13, 'center');

                // Show example bilinear maps
                let mapName, mapDesc;
                if (selectedMap === 0) {
                    mapName = 'Dot product';
                    mapDesc = 'g(v,w) = v·w ∈ ℝ';
                } else if (selectedMap === 1) {
                    mapName = 'Outer product';
                    mapDesc = 'g(v,w) = vwᵀ ∈ M_n(ℝ)';
                } else {
                    mapName = 'Wedge product';
                    mapDesc = 'g(v,w) = v∧w ∈ Λ²V';
                }

                viz.drawText('Universal Property: g(v,w) = φ(v⊗w)', 0, 4.2,
                            viz.colors.white, 15, 'center');
                viz.drawText(`Example: ${mapName}`, 0, -3.5, viz.colors.white, 14, 'center');
                viz.drawText(mapDesc, 0, -4.2, viz.colors.text, 12, 'center');
            }

            draw();
            return viz;
        }
    }
];

// Section 2: Properties and Functoriality of Tensor Products
window.EXTRA_VIZ['ch14']['ch14-sec02'] = [
    {
        id: 'ch14-extra-viz-3',
        title: 'Tensor Product Dimension Calculator',
        description: 'Interactive calculator showing dim(V⊗W) = dim(V)·dim(W)',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            let dimV = 3;
            let dimW = 2;

            const sliderV = VizEngine.createSlider(controls, 'dim(V)', 1, 5, 3, 1, (val) => {
                dimV = val;
                draw();
            });

            const sliderW = VizEngine.createSlider(controls, 'dim(W)', 1, 5, 2, 1, (val) => {
                dimW = val;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const dimTensor = dimV * dimW;

                // Visualize basis elements as a grid
                const cellSize = 0.8;
                const startX = -(dimW * cellSize) / 2;
                const startY = (dimV * cellSize) / 2;

                // Draw grid showing basis of V⊗W
                for (let i = 0; i < dimV; i++) {
                    for (let j = 0; j < dimW; j++) {
                        const x = startX + j * cellSize;
                        const y = startY - i * cellSize;

                        viz.drawCircle(x, y, 0.15, viz.colors.teal, viz.colors.teal);
                        viz.drawText(`e${i+1}⊗f${j+1}`, x, y + 0.4, viz.colors.text, 10, 'center');
                    }
                }

                // Draw labels for V basis
                viz.drawText('V basis:', startX - 1.5, startY + 0.8, viz.colors.blue, 13);
                for (let i = 0; i < dimV; i++) {
                    viz.drawText(`e${i+1}`, startX - 1.2, startY - i * cellSize,
                                viz.colors.blue, 12);
                }

                // Draw labels for W basis
                viz.drawText('W basis:', startX, startY + 1.2, viz.colors.orange, 13, 'center');
                for (let j = 0; j < dimW; j++) {
                    viz.drawText(`f${j+1}`, startX + j * cellSize, startY + 0.8,
                                viz.colors.orange, 12, 'center');
                }

                // Draw dimension formula
                viz.drawText(`dim(V) = ${dimV}`, -5, -3, viz.colors.blue, 15);
                viz.drawText(`dim(W) = ${dimW}`, -5, -3.7, viz.colors.orange, 15);
                viz.drawText(`dim(V⊗W) = ${dimV} × ${dimW} = ${dimTensor}`,
                            -5, -4.4, viz.colors.teal, 16);

                // Draw basis count
                viz.drawText(`Basis: {e_i⊗f_j : 1≤i≤${dimV}, 1≤j≤${dimW}}`,
                            0, 4.3, viz.colors.white, 14, 'center');
            }

            draw();
            return viz;
        }
    },,
    {
        id: 'ch14-extra-viz-8',
        title: 'Rank of Tensors and Decomposition',
        description: 'Explore tensor rank: decomposition into sum of rank-1 tensors',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            let rank = 1;
            const slider = VizEngine.createSlider(controls, 'Tensor Rank', 1, 3, 1, 1, (val) => {
                rank = val;
                draw();
            });

            // Define rank-1 components
            const components = [
                {v: [2, 1], w: [1, 2], color: viz.colors.blue},
                {v: [-1, 1.5], w: [2, 0.5], color: viz.colors.orange},
                {v: [0.5, -1], w: [-1, 2], color: viz.colors.green}
            ];

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const scale = 0.8;
                const spacing = 3.5;

                // Display components based on rank
                for (let i = 0; i < rank; i++) {
                    const comp = components[i];
                    const offsetX = (i - (rank - 1) / 2) * spacing;

                    // Draw v⊗w for each component
                    viz.drawVector(offsetX, 0, offsetX + comp.v[0] * scale, comp.v[1] * scale,
                                  comp.color, `v${i+1}`, 2);
                    viz.drawVector(offsetX, 0, offsetX + comp.w[0] * scale, comp.w[1] * scale,
                                  comp.color + 'AA', `w${i+1}`, 2);

                    // Draw parallelogram
                    viz.drawPolygon([
                        [offsetX, 0],
                        [offsetX + comp.v[0] * scale, comp.v[1] * scale],
                        [offsetX + (comp.v[0] + comp.w[0]) * scale, (comp.v[1] + comp.w[1]) * scale],
                        [offsetX + comp.w[0] * scale, comp.w[1] * scale]
                    ], comp.color + '22', comp.color, 2);

                    viz.drawText(`v${i+1}⊗w${i+1}`, offsetX, -2.8, comp.color, 13, 'center');

                    // Draw + sign between components
                    if (i < rank - 1) {
                        viz.drawText('+', offsetX + spacing/2, 0, viz.colors.white, 20, 'center');
                    }
                }

                // Display tensor decomposition info
                let decomp = '';
                for (let i = 0; i < rank; i++) {
                    decomp += `v${i+1}⊗w${i+1}`;
                    if (i < rank - 1) decomp += ' + ';
                }

                viz.drawText(`Tensor Rank = ${rank}`, 0, 4.5, viz.colors.white, 16, 'center');
                viz.drawText(`T = ${decomp}`, 0, 3.8, viz.colors.text, 13, 'center');

                const rankInfo = rank === 1
                    ? 'Rank-1: Single outer product (separable)'
                    : `Rank-${rank}: Minimum sum of rank-1 tensors`;
                viz.drawText(rankInfo, 0, -3.8, viz.colors.text, 12, 'center');

                viz.drawText('Generic rank-2 tensor cannot be decomposed into single v⊗w',
                            0, -4.4, viz.colors.text, 11, 'center');
            }

            draw();
            return viz;
        }
    },,
    {
        id: 'ch14-extra-viz-9',
        title: 'Tensor Product of Linear Maps',
        description: 'Visualize (T⊗S)(v⊗w) = T(v)⊗S(w) for linear transformations',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const v = viz.addDraggable('v', 1.5, 1, viz.colors.blue, 8, () => draw());
            const w = viz.addDraggable('w', 1, 1.5, viz.colors.orange, 8, () => draw());

            let thetaT = 0.6;
            let thetaS = -0.4;

            const sliderT = VizEngine.createSlider(controls, 'T rotation', -3.14, 3.14, 0.6, 0.1, (val) => {
                thetaT = val;
                draw();
            });

            const sliderS = VizEngine.createSlider(controls, 'S rotation', -3.14, 3.14, -0.4, 0.1, (val) => {
                thetaS = val;
                draw();
            });

            function applyT(vec) {
                const cos = Math.cos(thetaT);
                const sin = Math.sin(thetaT);
                return {
                    x: 1.2 * (cos * vec.x - sin * vec.y),
                    y: 1.2 * (sin * vec.x + cos * vec.y)
                };
            }

            function applyS(vec) {
                const cos = Math.cos(thetaS);
                const sin = Math.sin(thetaS);
                return {
                    x: 0.8 * (cos * vec.x - sin * vec.y),
                    y: 0.8 * (sin * vec.x + cos * vec.y)
                };
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const scale = 0.7;

                // Left side: original v⊗w
                const offsetL = -4;
                viz.drawText('v⊗w', offsetL, 3.5, viz.colors.white, 14, 'center');
                viz.drawVector(offsetL, 0, offsetL + v.x * scale, v.y * scale,
                              viz.colors.blue, 'v', 2);
                viz.drawVector(offsetL, 0, offsetL + w.x * scale, w.y * scale,
                              viz.colors.orange, 'w', 2);
                viz.drawPolygon([
                    [offsetL, 0],
                    [offsetL + v.x * scale, v.y * scale],
                    [offsetL + (v.x + w.x) * scale, (v.y + w.y) * scale],
                    [offsetL + w.x * scale, w.y * scale]
                ], viz.colors.purple + '22', viz.colors.purple, 2);

                // Right side: T(v)⊗S(w)
                const offsetR = 4;
                const Tv = applyT(v);
                const Sw = applyS(w);

                viz.drawText('T(v)⊗S(w)', offsetR, 3.5, viz.colors.white, 14, 'center');
                viz.drawVector(offsetR, 0, offsetR + Tv.x * scale, Tv.y * scale,
                              viz.colors.blue, 'Tv', 2);
                viz.drawVector(offsetR, 0, offsetR + Sw.x * scale, Sw.y * scale,
                              viz.colors.orange, 'Sw', 2);
                viz.drawPolygon([
                    [offsetR, 0],
                    [offsetR + Tv.x * scale, Tv.y * scale],
                    [offsetR + (Tv.x + Sw.x) * scale, (Tv.y + Sw.y) * scale],
                    [offsetR + Sw.x * scale, Sw.y * scale]
                ], viz.colors.green + '22', viz.colors.green, 2);

                // Draw arrow between them
                viz.drawSegment(offsetL + 1.5, 2, offsetR - 1.5, 2, viz.colors.teal, 3);
                viz.drawText('T⊗S', 0, 2.3, viz.colors.teal, 14, 'center');

                viz.drawDraggables();

                viz.drawText('Tensor Product of Maps: (T⊗S)(v⊗w) = T(v)⊗S(w)',
                            0, 4.5, viz.colors.white, 14, 'center');
                viz.drawText(`T: rotation by ${(thetaT * 180 / Math.PI).toFixed(0)}°, scale 1.2`,
                            0, -3.5, viz.colors.blue, 11, 'center');
                viz.drawText(`S: rotation by ${(thetaS * 180 / Math.PI).toFixed(0)}°, scale 0.8`,
                            0, -4.1, viz.colors.orange, 11, 'center');
            }

            draw();
            return viz;
        }
    }
];

// Section 3: Multilinear Maps and Iterated Tensor Products
window.EXTRA_VIZ['ch14']['ch14-sec03'] = [
    {
        id: 'ch14-extra-viz-4',
        title: 'Multilinear Map Visualization',
        description: 'Drag vectors to see bilinearity: φ(av₁+bv₂, w) = aφ(v₁,w) + bφ(v₂,w)',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const v1 = viz.addDraggable('v1', 1.5, 0.5, viz.colors.blue, 8, () => draw());
            const v2 = viz.addDraggable('v2', 0.5, 1.5, viz.colors.blue + 'AA', 8, () => draw());
            const w = viz.addDraggable('w', -1, 1, viz.colors.orange, 8, () => draw());

            let a = 0.6;
            let b = 0.4;

            const sliderA = VizEngine.createSlider(controls, 'coefficient a', 0, 1, 0.6, 0.1, (val) => {
                a = val;
                draw();
            });

            const sliderB = VizEngine.createSlider(controls, 'coefficient b', 0, 1, 0.4, 0.1, (val) => {
                b = val;
                draw();
            });

            // Bilinear form: φ(v,w) = v·w (dot product)
            function phi(v, w) {
                return v.x * w.x + v.y * w.y;
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Compute linear combination
                const vComb = {x: a * v1.x + b * v2.x, y: a * v1.y + b * v2.y};

                // Draw vectors
                viz.drawVector(0, 0, v1.x, v1.y, viz.colors.blue, 'v₁', 2);
                viz.drawVector(0, 0, v2.x, v2.y, viz.colors.blue + 'AA', 'v₂', 2);
                viz.drawVector(0, 0, w.x, w.y, viz.colors.orange, 'w', 3);
                viz.drawVector(0, 0, vComb.x, vComb.y, viz.colors.green, 'av₁+bv₂', 3);

                viz.drawDraggables();

                // Compute bilinear form values
                const phi1 = phi(v1, w);
                const phi2 = phi(v2, w);
                const phiComb = phi(vComb, w);
                const phiLinear = a * phi1 + b * phi2;

                // Display bilinearity verification
                viz.drawText(`φ(v,w) = v·w (dot product)`, 0, 4.5, viz.colors.white, 14, 'center');
                viz.drawText(`a=${a.toFixed(1)}, b=${b.toFixed(1)}`, 0, 3.8, viz.colors.text, 12, 'center');

                const yStart = -2.5;
                viz.drawText(`φ(v₁,w) = ${phi1.toFixed(3)}`, -5, yStart, viz.colors.blue, 13);
                viz.drawText(`φ(v₂,w) = ${phi2.toFixed(3)}`, -5, yStart - 0.6, viz.colors.blue + 'AA', 13);
                viz.drawText(`aφ(v₁,w) + bφ(v₂,w) = ${phiLinear.toFixed(3)}`,
                            -5, yStart - 1.2, viz.colors.purple, 13);
                viz.drawText(`φ(av₁+bv₂,w) = ${phiComb.toFixed(3)}`,
                            -5, yStart - 1.8, viz.colors.green, 14);

                // Highlight if equal (bilinearity holds)
                const isEqual = Math.abs(phiLinear - phiComb) < 0.001;
                const checkMark = isEqual ? '✓' : '✗';
                const checkColor = isEqual ? viz.colors.green : viz.colors.red;
                viz.drawText(`Bilinearity: ${checkMark}`, -5, yStart - 2.5, checkColor, 15);
            }

            draw();
            return viz;
        }
    }
];

// Section 4: Symmetric and Exterior Algebras
window.EXTRA_VIZ['ch14']['ch14-sec04'] = [
    {
        id: 'ch14-extra-viz-5',
        title: 'Exterior Product v∧w as Oriented Area',
        description: 'Drag vectors to see wedge product v∧w representing signed area with anticommutativity',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const v = viz.addDraggable('v', 2.5, 0.5, viz.colors.blue, 8, () => draw());
            const w = viz.addDraggable('w', 0.5, 2, viz.colors.orange, 8, () => draw());

            let showSwapped = false;
            const toggleButton = VizEngine.createButton(controls, 'Show w∧v (swapped)', () => {
                showSwapped = !showSwapped;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Compute signed area (determinant)
                const signedArea = v.x * w.y - v.y * w.x;
                const isPositive = signedArea > 0;

                if (!showSwapped) {
                    // Draw v∧w
                    viz.drawVector(0, 0, v.x, v.y, viz.colors.blue, 'v', 3);
                    viz.drawVector(0, 0, w.x, w.y, viz.colors.orange, 'w', 3);

                    // Draw oriented parallelogram
                    const fillColor = isPositive ? viz.colors.green + '33' : viz.colors.red + '33';
                    const strokeColor = isPositive ? viz.colors.green : viz.colors.red;

                    viz.drawPolygon(
                        [[0, 0], [v.x, v.y], [v.x + w.x, v.y + w.y], [w.x, w.y]],
                        fillColor,
                        strokeColor,
                        3
                    );

                    // Draw orientation arrow
                    const cx = (v.x + w.x) / 2;
                    const cy = (v.y + w.y) / 2;
                    const angle = isPositive ? 0.3 : -0.3;
                    viz.drawText('↻', cx, cy, strokeColor, 24, 'center');

                    viz.drawText(`v∧w`, cx - 1, cy + 1, viz.colors.white, 16);
                    viz.drawText(`signed area = ${signedArea.toFixed(3)}`, 0, 4.5,
                                strokeColor, 15, 'center');
                    viz.drawText(`orientation: ${isPositive ? 'CCW (+)' : 'CW (-)'}`, 0, 3.8,
                                viz.colors.text, 13, 'center');
                } else {
                    // Draw both v∧w and w∧v to show anticommutativity
                    // Left side: v∧w
                    const offsetX = -3;
                    viz.drawVector(offsetX, 0, offsetX + v.x * 0.6, v.y * 0.6,
                                  viz.colors.blue, 'v', 2);
                    viz.drawVector(offsetX, 0, offsetX + w.x * 0.6, w.y * 0.6,
                                  viz.colors.orange, 'w', 2);

                    const fillColor1 = isPositive ? viz.colors.green + '33' : viz.colors.red + '33';
                    viz.drawPolygon(
                        [[offsetX, 0],
                         [offsetX + v.x * 0.6, v.y * 0.6],
                         [offsetX + (v.x + w.x) * 0.6, (v.y + w.y) * 0.6],
                         [offsetX + w.x * 0.6, w.y * 0.6]],
                        fillColor1,
                        isPositive ? viz.colors.green : viz.colors.red,
                        2
                    );
                    viz.drawText('v∧w', offsetX, -3, viz.colors.white, 15, 'center');
                    viz.drawText(signedArea.toFixed(2), offsetX, -3.7,
                                isPositive ? viz.colors.green : viz.colors.red, 14, 'center');

                    // Right side: w∧v = -(v∧w)
                    const offsetX2 = 3;
                    viz.drawVector(offsetX2, 0, offsetX2 + w.x * 0.6, w.y * 0.6,
                                  viz.colors.orange, 'w', 2);
                    viz.drawVector(offsetX2, 0, offsetX2 + v.x * 0.6, v.y * 0.6,
                                  viz.colors.blue, 'v', 2);

                    const fillColor2 = isPositive ? viz.colors.red + '33' : viz.colors.green + '33';
                    viz.drawPolygon(
                        [[offsetX2, 0],
                         [offsetX2 + w.x * 0.6, w.y * 0.6],
                         [offsetX2 + (v.x + w.x) * 0.6, (v.y + w.y) * 0.6],
                         [offsetX2 + v.x * 0.6, v.y * 0.6]],
                        fillColor2,
                        isPositive ? viz.colors.red : viz.colors.green,
                        2
                    );
                    viz.drawText('w∧v', offsetX2, -3, viz.colors.white, 15, 'center');
                    viz.drawText((-signedArea).toFixed(2), offsetX2, -3.7,
                                isPositive ? viz.colors.red : viz.colors.green, 14, 'center');

                    viz.drawText('Anticommutativity: w∧v = -(v∧w)', 0, 4.5,
                                viz.colors.white, 15, 'center');
                }

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    },,
    {
        id: 'ch14-extra-viz-6',
        title: 'Symmetric vs Alternating Tensors',
        description: 'Visualize symmetric (v⊗w + w⊗v) versus alternating (v∧w = v⊗w - w⊗v) products',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            const v = viz.addDraggable('v', 2, 0.5, viz.colors.blue, 8, () => draw());
            const w = viz.addDraggable('w', 0.5, 2.5, viz.colors.orange, 8, () => draw());

            let mode = 0; // 0: symmetric, 1: alternating
            const slider = VizEngine.createSlider(controls, 'Tensor Type', 0, 1, 0, 1, (val) => {
                mode = val;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const scale = 0.7;

                if (mode === 0) {
                    // Symmetric tensor: Sym(v,w) = v⊗w + w⊗v

                    // Left: v⊗w
                    const offset1 = -3.5;
                    viz.drawVector(offset1, 0, offset1 + v.x * scale, v.y * scale,
                                  viz.colors.blue, 'v', 2);
                    viz.drawVector(offset1, 0, offset1 + w.x * scale, w.y * scale,
                                  viz.colors.orange, 'w', 2);
                    viz.drawPolygon(
                        [[offset1, 0],
                         [offset1 + v.x * scale, v.y * scale],
                         [offset1 + (v.x + w.x) * scale, (v.y + w.y) * scale],
                         [offset1 + w.x * scale, w.y * scale]],
                        viz.colors.teal + '33',
                        viz.colors.teal,
                        2
                    );
                    viz.drawText('v⊗w', offset1, -2.5, viz.colors.teal, 14, 'center');

                    // Center: +
                    viz.drawText('+', 0, 0, viz.colors.white, 24, 'center');

                    // Right: w⊗v
                    const offset2 = 3.5;
                    viz.drawVector(offset2, 0, offset2 + w.x * scale, w.y * scale,
                                  viz.colors.orange, 'w', 2);
                    viz.drawVector(offset2, 0, offset2 + v.x * scale, v.y * scale,
                                  viz.colors.blue, 'v', 2);
                    viz.drawPolygon(
                        [[offset2, 0],
                         [offset2 + w.x * scale, w.y * scale],
                         [offset2 + (v.x + w.x) * scale, (v.y + w.y) * scale],
                         [offset2 + v.x * scale, v.y * scale]],
                        viz.colors.teal + '33',
                        viz.colors.teal,
                        2
                    );
                    viz.drawText('w⊗v', offset2, -2.5, viz.colors.teal, 14, 'center');

                    viz.drawText('Symmetric: v⊗w + w⊗v ∈ Sym²(V)', 0, 4.5,
                                viz.colors.white, 15, 'center');
                    viz.drawText('Invariant under permutation', 0, 3.8,
                                viz.colors.text, 12, 'center');

                } else {
                    // Alternating tensor: Alt(v,w) = v∧w = v⊗w - w⊗v

                    // Left: v⊗w
                    const offset1 = -3.5;
                    viz.drawVector(offset1, 0, offset1 + v.x * scale, v.y * scale,
                                  viz.colors.blue, 'v', 2);
                    viz.drawVector(offset1, 0, offset1 + w.x * scale, w.y * scale,
                                  viz.colors.orange, 'w', 2);
                    viz.drawPolygon(
                        [[offset1, 0],
                         [offset1 + v.x * scale, v.y * scale],
                         [offset1 + (v.x + w.x) * scale, (v.y + w.y) * scale],
                         [offset1 + w.x * scale, w.y * scale]],
                        viz.colors.green + '33',
                        viz.colors.green,
                        2
                    );
                    viz.drawText('v⊗w', offset1, -2.5, viz.colors.green, 14, 'center');

                    // Center: -
                    viz.drawText('−', 0, 0, viz.colors.white, 24, 'center');

                    // Right: w⊗v
                    const offset2 = 3.5;
                    viz.drawVector(offset2, 0, offset2 + w.x * scale, w.y * scale,
                                  viz.colors.orange, 'w', 2);
                    viz.drawVector(offset2, 0, offset2 + v.x * scale, v.y * scale,
                                  viz.colors.blue, 'v', 2);
                    viz.drawPolygon(
                        [[offset2, 0],
                         [offset2 + w.x * scale, w.y * scale],
                         [offset2 + (v.x + w.x) * scale, (v.y + w.y) * scale],
                         [offset2 + v.x * scale, v.y * scale]],
                        viz.colors.red + '33',
                        viz.colors.red,
                        2
                    );
                    viz.drawText('w⊗v', offset2, -2.5, viz.colors.red, 14, 'center');

                    const signedArea = v.x * w.y - v.y * w.x;
                    viz.drawText('Alternating: v∧w = v⊗w − w⊗v ∈ Λ²(V)', 0, 4.5,
                                viz.colors.white, 15, 'center');
                    viz.drawText(`Changes sign under swap: v∧w = −w∧v, area = ${signedArea.toFixed(2)}`,
                                0, 3.8, viz.colors.text, 12, 'center');
                }

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    }
];

// Section 5: Tensor Algebra and Universal Constructions
window.EXTRA_VIZ['ch14']['ch14-sec05'] = [
    {
        id: 'ch14-extra-viz-7',
        title: 'Tensor Contraction Visualization',
        description: 'Interactive demonstration of trace as tensor contraction',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            let angle = 0.5;
            let scale = 1.5;

            const sliderAngle = VizEngine.createSlider(controls, 'Rotation angle', 0, 6.28, 0.5, 0.1, (val) => {
                angle = val;
                draw();
            });

            const sliderScale = VizEngine.createSlider(controls, 'Scale', 0.5, 3, 1.5, 0.1, (val) => {
                scale = val;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Create a 2×2 matrix (rank-2 tensor in V⊗V*)
                const cos = Math.cos(angle);
                const sin = Math.sin(angle);
                const matrix = [
                    [scale * cos, -scale * sin],
                    [scale * sin,  scale * cos]
                ];

                // Draw transformed unit square to show linear map
                viz.drawTransformedUnitSquare(matrix, viz.colors.purple + '33', viz.colors.purple);

                // Draw basis vectors being transformed
                viz.drawVector(0, 0, 1, 0, viz.colors.blue + '88', 'e₁', 2);
                viz.drawVector(0, 0, 0, 1, viz.colors.blue + '88', 'e₂', 2);

                viz.drawVector(0, 0, matrix[0][0], matrix[1][0], viz.colors.orange, 'Te₁', 2);
                viz.drawVector(0, 0, matrix[0][1], matrix[1][1], viz.colors.orange, 'Te₂', 2);

                // Compute trace (contraction of tensor)
                const trace = matrix[0][0] + matrix[1][1];

                // Draw diagonal elements
                const e1Pos = [matrix[0][0], matrix[1][0]];
                const e2Pos = [matrix[0][1], matrix[1][1]];

                viz.drawPoint(e1Pos[0], e1Pos[1], viz.colors.green, 'T¹₁', 10);
                viz.drawPoint(e2Pos[0], e2Pos[1], viz.colors.green, 'T²₂', 10);

                // Display trace information
                viz.drawText('Tensor Contraction: tr(T) = T^i_i (sum over diagonal)',
                            0, 4.5, viz.colors.white, 14, 'center');
                viz.drawText(`T¹₁ = ${matrix[0][0].toFixed(2)},  T²₂ = ${matrix[1][1].toFixed(2)}`,
                            0, 3.7, viz.colors.text, 13, 'center');
                viz.drawText(`tr(T) = ${trace.toFixed(2)}`, 0, -4.2, viz.colors.green, 16, 'center');

                // Show matrix representation
                const matStr = `[${matrix[0][0].toFixed(1)} ${matrix[0][1].toFixed(1)}; ${matrix[1][0].toFixed(1)} ${matrix[1][1].toFixed(1)}]`;
                viz.drawText(`Matrix: ${matStr}`, 0, -3.4, viz.colors.text, 11, 'center');
            }

            draw();
            return viz;
        }
    },
];
