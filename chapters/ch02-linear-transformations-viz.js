// Extra Interactive Visualizations for Chapter 2: Linear Transformations

window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch02'] = window.EXTRA_VIZ['ch02'] || {};

// Distribute visualizations across sections
window.EXTRA_VIZ['ch02']['ch02-sec01'] = [
    {
        id: 'ch02-extra-viz-1',
        title: 'Interactive: 2×2 Matrix Transformation',
        description: 'Drag the matrix entries to see how linear transformations affect the unit square and arbitrary vectors. Watch how determinant, eigenvalues, and the transformation geometry change.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 460, scale: 50});

            // Matrix entries as draggable controls
            const state = {
                a: 1.5, b: 0.5,
                c: 0.3, d: 1.2
            };

            // Create sliders for matrix entries
            const sliderA = VizEngine.createSlider(controls, 'a (top-left)', -3, 3, state.a, 0.1, (val) => {
                state.a = val;
                draw();
            });
            const sliderB = VizEngine.createSlider(controls, 'b (top-right)', -3, 3, state.b, 0.1, (val) => {
                state.b = val;
                draw();
            });
            const sliderC = VizEngine.createSlider(controls, 'c (bottom-left)', -3, 3, state.c, 0.1, (val) => {
                state.c = val;
                draw();
            });
            const sliderD = VizEngine.createSlider(controls, 'd (bottom-right)', -3, 3, state.d, 0.1, (val) => {
                state.d = val;
                draw();
            });

            // Draggable test vector
            const testVec = viz.addDraggable('test', 1.5, 1, viz.colors.pink, 8, () => draw());

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '13px';
            infoDiv.style.color = viz.colors.text;
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const matrix = [[state.a, state.b], [state.c, state.d]];
                const det = VizEngine.det2(matrix);

                // Draw original unit square (faded)
                viz.drawPolygon([[0,0], [1,0], [1,1], [0,1]], viz.colors.blue + '22', viz.colors.blue + '44', 1.5);

                // Draw transformed unit square
                viz.drawTransformedUnitSquare(matrix, viz.colors.orange + '44', viz.colors.orange, 2.5);

                // Draw basis vectors and their images
                const e1 = [1, 0];
                const e2 = [0, 1];
                const Te1 = VizEngine.matVec(matrix, e1);
                const Te2 = VizEngine.matVec(matrix, e2);

                viz.drawVector(0, 0, e1[0], e1[1], viz.colors.blue + '88', null, 2);
                viz.drawVector(0, 0, e2[0], e2[1], viz.colors.blue + '88', null, 2);
                viz.drawVector(0, 0, Te1[0], Te1[1], viz.colors.orange, 'T(e₁)', 3);
                viz.drawVector(0, 0, Te2[0], Te2[1], viz.colors.teal, 'T(e₂)', 3);

                // Draw test vector and its image
                const v = [testVec.x, testVec.y];
                const Tv = VizEngine.matVec(matrix, v);
                viz.drawVector(0, 0, v[0], v[1], viz.colors.pink, 'v', 2.5);
                viz.drawVector(0, 0, Tv[0], Tv[1], viz.colors.yellow, 'T(v)', 2.5);

                viz.drawDraggables();

                // Display matrix info
                const eigenVals = VizEngine.eigenvalues2(matrix);
                let eigenStr = 'complex';
                if (eigenVals !== null) {
                    eigenStr = eigenVals.map(ev => ev.toFixed(2)).join(', ');
                }

                let transformType = 'general';
                if (Math.abs(det) < 0.01) transformType = 'singular (collapses to line/point)';
                else if (Math.abs(det - 1) < 0.01) transformType = 'area-preserving';
                else if (det < 0) transformType = 'orientation-reversing';

                infoDiv.innerHTML = `
                    Matrix T = [[${state.a.toFixed(2)}, ${state.b.toFixed(2)}], [${state.c.toFixed(2)}, ${state.d.toFixed(2)}]]<br>
                    det(T) = ${det.toFixed(3)} (${transformType})<br>
                    eigenvalues: λ = ${eigenStr}<br>
                    v = (${testVec.x.toFixed(2)}, ${testVec.y.toFixed(2)}) → T(v) = (${Tv[0].toFixed(2)}, ${Tv[1].toFixed(2)})
                `;
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch02-extra-viz-2',
        title: 'Interactive: Kernel (Null Space) Visualization',
        description: 'Explore the kernel of a linear transformation. Adjust the matrix to see how ker(T) changes. The kernel shows all vectors that map to zero.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 460, scale: 50});

            const state = {
                a: 2, b: 1,
                c: 4, d: 2  // Initially rank 1, so ker has dimension 1
            };

            VizEngine.createSlider(controls, 'a', -3, 3, state.a, 0.1, (val) => {
                state.a = val;
                draw();
            });
            VizEngine.createSlider(controls, 'b', -3, 3, state.b, 0.1, (val) => {
                state.b = val;
                draw();
            });
            VizEngine.createSlider(controls, 'c', -3, 3, state.c, 0.1, (val) => {
                state.c = val;
                draw();
            });
            VizEngine.createSlider(controls, 'd', -3, 3, state.d, 0.1, (val) => {
                state.d = val;
                draw();
            });

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '13px';
            infoDiv.style.color = viz.colors.text;
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const matrix = [[state.a, state.b], [state.c, state.d]];
                const det = VizEngine.det2(matrix);

                // Compute kernel
                // For 2x2 matrix, if det=0, kernel is span of (-b, a) or (-d, c)
                let nullity = 0;
                let kernelVec = null;

                if (Math.abs(det) < 0.01) {
                    // Rank < 2, so nullity > 0
                    if (Math.abs(state.a) > 0.01 || Math.abs(state.b) > 0.01) {
                        kernelVec = [-state.b, state.a];
                        nullity = 1;
                    } else if (Math.abs(state.c) > 0.01 || Math.abs(state.d) > 0.01) {
                        kernelVec = [-state.d, state.c];
                        nullity = 1;
                    } else {
                        // Zero matrix, nullity = 2
                        nullity = 2;
                    }
                }

                // Draw kernel
                if (nullity === 2) {
                    // Entire plane is kernel
                    viz.drawText('ker(T) = ℝ²', -4, 4, viz.colors.green, 18);
                    for (let x = -5; x <= 5; x += 0.5) {
                        for (let y = -5; y <= 5; y += 0.5) {
                            viz.drawPoint(x, y, viz.colors.green + '66', null, 2);
                        }
                    }
                } else if (nullity === 1) {
                    // 1-dimensional kernel (line through origin)
                    const normLen = Math.sqrt(kernelVec[0]*kernelVec[0] + kernelVec[1]*kernelVec[1]);
                    const dir = [kernelVec[0]/normLen, kernelVec[1]/normLen];

                    for (let t = -10; t <= 10; t += 0.3) {
                        const x = t * dir[0];
                        const y = t * dir[1];
                        viz.drawPoint(x, y, viz.colors.green + '88', null, 2.5);
                    }

                    viz.drawVector(0, 0, 2*dir[0], 2*dir[1], viz.colors.green, 'ker basis', 3);
                    viz.drawText('ker(T) = span{v}', -4, 4.5, viz.colors.green, 16);
                } else {
                    // Trivial kernel (just origin)
                    viz.drawPoint(0, 0, viz.colors.green, 'ker(T)={0}', 8);
                }

                // Show a few test vectors and their images
                const testVecs = [[1, 0.5], [-1, 1], [0.5, -1]];
                testVecs.forEach((v, i) => {
                    const Tv = VizEngine.matVec(matrix, v);
                    const color = [viz.colors.blue, viz.colors.purple, viz.colors.pink][i];
                    viz.drawVector(0, 0, v[0], v[1], color + '66', null, 1.5);
                    viz.drawVector(0, 0, Tv[0], Tv[1], color, null, 2);
                });

                const rank = (nullity === 2) ? 0 : (nullity === 1) ? 1 : 2;
                infoDiv.innerHTML = `
                    Matrix T = [[${state.a.toFixed(2)}, ${state.b.toFixed(2)}], [${state.c.toFixed(2)}, ${state.d.toFixed(2)}]]<br>
                    det(T) = ${det.toFixed(3)}<br>
                    <span style="color:${viz.colors.green}">nullity(T) = dim(ker T) = ${nullity}</span><br>
                    rank(T) = dim(im T) = ${rank}<br>
                    Rank-Nullity: ${rank} + ${nullity} = ${rank + nullity} = dim(ℝ²)
                `;
            }

            draw();
            return viz;
        }
    }
];

window.EXTRA_VIZ['ch02']['ch02-sec02'] = [
    {
        id: 'ch02-extra-viz-3',
        title: 'Interactive: Image (Range) Visualization',
        description: 'See the image of a linear transformation as you adjust the matrix. The image shows all possible output vectors T(v) for v ∈ ℝ².',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 460, scale: 45});

            const state = {
                a: 1.5, b: 0.5,
                c: 0.5, d: 1
            };

            VizEngine.createSlider(controls, 'a', -3, 3, state.a, 0.1, (val) => {
                state.a = val;
                draw();
            });
            VizEngine.createSlider(controls, 'b', -3, 3, state.b, 0.1, (val) => {
                state.b = val;
                draw();
            });
            VizEngine.createSlider(controls, 'c', -3, 3, state.c, 0.1, (val) => {
                state.c = val;
                draw();
            });
            VizEngine.createSlider(controls, 'd', -3, 3, state.d, 0.1, (val) => {
                state.d = val;
                draw();
            });

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '13px';
            infoDiv.style.color = viz.colors.text;
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const matrix = [[state.a, state.b], [state.c, state.d]];
                const det = VizEngine.det2(matrix);

                const rank = Math.abs(det) > 0.01 ? 2 :
                             (Math.abs(state.a) + Math.abs(state.b) + Math.abs(state.c) + Math.abs(state.d) > 0.01) ? 1 : 0;

                // Sample many vectors from domain and show their images
                const numSamples = 80;
                for (let i = 0; i < numSamples; i++) {
                    const theta = (i / numSamples) * 2 * Math.PI;
                    const r = 2;
                    const v = [r * Math.cos(theta), r * Math.sin(theta)];
                    const Tv = VizEngine.matVec(matrix, v);
                    viz.drawPoint(Tv[0], Tv[1], viz.colors.orange + 'AA', null, 3);
                }

                // Draw image space
                if (rank === 2) {
                    // Full plane
                    viz.drawText('im(T) = ℝ²', -5, 5, viz.colors.orange, 18);
                } else if (rank === 1) {
                    // Line through origin
                    const col1 = [state.a, state.c];
                    const col2 = [state.b, state.d];
                    const imageVec = (Math.abs(state.a) + Math.abs(state.c) > 0.01) ? col1 : col2;
                    const normLen = Math.sqrt(imageVec[0]*imageVec[0] + imageVec[1]*imageVec[1]);
                    const dir = [imageVec[0]/normLen, imageVec[1]/normLen];

                    for (let t = -10; t <= 10; t += 0.2) {
                        viz.drawPoint(t*dir[0], t*dir[1], viz.colors.orange + 'CC', null, 3);
                    }

                    viz.drawVector(0, 0, 2*dir[0], 2*dir[1], viz.colors.orange, 'im basis', 3.5);
                    viz.drawText('im(T) = span{v}', -5, 5, viz.colors.orange, 16);
                } else {
                    // Just origin
                    viz.drawPoint(0, 0, viz.colors.orange, 'im(T)={0}', 10);
                }

                // Column space visualization
                viz.drawVector(0, 0, state.a, state.c, viz.colors.teal, 'col₁', 3);
                viz.drawVector(0, 0, state.b, state.d, viz.colors.blue, 'col₂', 3);

                infoDiv.innerHTML = `
                    Matrix T = [[${state.a.toFixed(2)}, ${state.b.toFixed(2)}], [${state.c.toFixed(2)}, ${state.d.toFixed(2)}]]<br>
                    <span style="color:${viz.colors.orange}">rank(T) = dim(im T) = ${rank}</span><br>
                    im(T) = column space of T<br>
                    T is ${rank === 2 ? 'surjective' : 'not surjective'}<br>
                    T is ${Math.abs(det) > 0.01 ? 'injective' : 'not injective'}
                `;
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch02-extra-viz-4',
        title: 'Interactive: Rank-Nullity Theorem Seesaw',
        description: 'Visual proof of rank(T) + nullity(T) = dim(V). As you adjust the matrix, watch how rank and nullity balance to always sum to 2.',
        setup: function(container, controls) {
            const canvas = document.createElement('canvas');
            canvas.width = 560;
            canvas.height = 460;
            canvas.style.background = '#0d1117';
            container.appendChild(canvas);
            const ctx = canvas.getContext('2d');

            const state = {
                a: 2, b: 1,
                c: 1, d: 0.5
            };

            VizEngine.createSlider(controls, 'a', -3, 3, state.a, 0.1, (val) => {
                state.a = val;
                draw();
            });
            VizEngine.createSlider(controls, 'b', -3, 3, state.b, 0.1, (val) => {
                state.b = val;
                draw();
            });
            VizEngine.createSlider(controls, 'c', -3, 3, state.c, 0.1, (val) => {
                state.c = val;
                draw();
            });
            VizEngine.createSlider(controls, 'd', -3, 3, state.d, 0.1, (val) => {
                state.d = val;
                draw();
            });

            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#0d1117';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const matrix = [[state.a, state.b], [state.c, state.d]];
                const det = VizEngine.det2(matrix);

                // Compute rank and nullity
                let rank, nullity;
                if (Math.abs(det) > 0.01) {
                    rank = 2;
                    nullity = 0;
                } else {
                    const allZero = Math.abs(state.a) + Math.abs(state.b) + Math.abs(state.c) + Math.abs(state.d) < 0.01;
                    if (allZero) {
                        rank = 0;
                        nullity = 2;
                    } else {
                        rank = 1;
                        nullity = 1;
                    }
                }

                // Draw seesaw
                const centerX = 280;
                const centerY = 230;
                const seesawLength = 200;

                // Seesaw angle based on rank vs nullity
                const angle = (rank - 1) * 0.3; // -0.3 to +0.3 radians

                // Fulcrum
                ctx.fillStyle = '#8b949e';
                ctx.beginPath();
                ctx.moveTo(centerX - 15, centerY + 20);
                ctx.lineTo(centerX + 15, centerY + 20);
                ctx.lineTo(centerX, centerY);
                ctx.closePath();
                ctx.fill();

                // Seesaw plank
                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.rotate(angle);
                ctx.fillStyle = '#58a6ff';
                ctx.fillRect(-seesawLength, -8, 2*seesawLength, 16);
                ctx.restore();

                // Rank weight (left side)
                const leftX = centerX - seesawLength * Math.cos(angle);
                const leftY = centerY - seesawLength * Math.sin(angle);
                ctx.fillStyle = '#f0883e';
                const rankSize = 30 + rank * 25;
                ctx.beginPath();
                ctx.arc(leftX, leftY, rankSize, 0, 2*Math.PI);
                ctx.fill();
                ctx.fillStyle = '#0d1117';
                ctx.font = 'bold 20px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('rank', leftX, leftY - 5);
                ctx.fillText(rank.toString(), leftX, leftY + 15);

                // Nullity weight (right side)
                const rightX = centerX + seesawLength * Math.cos(angle);
                const rightY = centerY + seesawLength * Math.sin(angle);
                ctx.fillStyle = '#3fb950';
                const nullitySize = 30 + nullity * 25;
                ctx.beginPath();
                ctx.arc(rightX, rightY, nullitySize, 0, 2*Math.PI);
                ctx.fill();
                ctx.fillStyle = '#0d1117';
                ctx.fillText('nullity', rightX, rightY - 5);
                ctx.fillText(nullity.toString(), rightX, rightY + 15);

                // Title and equation
                ctx.fillStyle = '#f0f6fc';
                ctx.font = 'bold 18px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Rank-Nullity Theorem', centerX, 40);

                ctx.fillStyle = '#bc8cff';
                ctx.font = '16px monospace';
                ctx.fillText(`rank(T) + nullity(T) = ${rank} + ${nullity} = ${rank + nullity} = dim(ℝ²)`, centerX, 70);

                // Matrix display
                ctx.fillStyle = '#8b949e';
                ctx.font = '14px monospace';
                ctx.textAlign = 'left';
                ctx.fillText(`T = [[${state.a.toFixed(2)}, ${state.b.toFixed(2)}]`, 20, canvas.height - 40);
                ctx.fillText(`     [${state.c.toFixed(2)}, ${state.d.toFixed(2)}]]`, 20, canvas.height - 20);

                // Visual representations
                ctx.fillStyle = '#f0883e';
                ctx.textAlign = 'right';
                ctx.fillText(`dim(im T) = ${rank}`, canvas.width - 20, canvas.height - 40);
                ctx.fillStyle = '#3fb950';
                ctx.fillText(`dim(ker T) = ${nullity}`, canvas.width - 20, canvas.height - 20);
            }

            draw();
            return { canvas, cleanup: () => {} };
        }
    }
];

window.EXTRA_VIZ['ch02']['ch02-sec03'] = [
    {
        id: 'ch02-extra-viz-5',
        title: 'Interactive: Composition of Transformations',
        description: 'Visualize how composing two linear transformations works: (S ∘ T)(v) = S(T(v)). See how the product of matrices represents composition.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 460, scale: 40});

            const state = {
                // First transformation T
                t_a: 1.2, t_b: 0.3,
                t_c: 0.2, t_d: 1.1,
                // Second transformation S
                s_a: 1, s_b: 0.5,
                s_c: -0.5, s_d: 1,
                showIntermediate: true
            };

            VizEngine.createSlider(controls, 'T: a', -2, 2, state.t_a, 0.1, (val) => {
                state.t_a = val;
                draw();
            });
            VizEngine.createSlider(controls, 'T: b', -2, 2, state.t_b, 0.1, (val) => {
                state.t_b = val;
                draw();
            });
            VizEngine.createSlider(controls, 'T: c', -2, 2, state.t_c, 0.1, (val) => {
                state.t_c = val;
                draw();
            });
            VizEngine.createSlider(controls, 'T: d', -2, 2, state.t_d, 0.1, (val) => {
                state.t_d = val;
                draw();
            });

            VizEngine.createSlider(controls, 'S: a', -2, 2, state.s_a, 0.1, (val) => {
                state.s_a = val;
                draw();
            });
            VizEngine.createSlider(controls, 'S: b', -2, 2, state.s_b, 0.1, (val) => {
                state.s_b = val;
                draw();
            });
            VizEngine.createSlider(controls, 'S: c', -2, 2, state.s_c, 0.1, (val) => {
                state.s_c = val;
                draw();
            });
            VizEngine.createSlider(controls, 'S: d', -2, 2, state.s_d, 0.1, (val) => {
                state.s_d = val;
                draw();
            });

            const toggleBtn = VizEngine.createButton(controls, 'Toggle Intermediate', () => {
                state.showIntermediate = !state.showIntermediate;
                draw();
            });

            const testVec = viz.addDraggable('test', 1.5, 1, viz.colors.blue, 8, () => draw());

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '12px';
            infoDiv.style.color = viz.colors.text;
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const T = [[state.t_a, state.t_b], [state.t_c, state.t_d]];
                const S = [[state.s_a, state.s_b], [state.s_c, state.s_d]];
                const ST = VizEngine.matMul(S, T);

                const v = [testVec.x, testVec.y];
                const Tv = VizEngine.matVec(T, v);
                const STv = VizEngine.matVec(S, Tv);

                // Draw original vector
                viz.drawVector(0, 0, v[0], v[1], viz.colors.blue, 'v', 3);

                if (state.showIntermediate) {
                    // Show intermediate T(v)
                    viz.drawVector(0, 0, Tv[0], Tv[1], viz.colors.orange, 'T(v)', 2.5);
                    // Show S applied to T(v)
                    viz.drawVector(0, 0, STv[0], STv[1], viz.colors.purple, 'S(T(v))', 3);

                    // Draw path
                    viz.drawSegment(v[0], v[1], Tv[0], Tv[1], viz.colors.orange + '66', 2, true);
                    viz.drawSegment(Tv[0], Tv[1], STv[0], STv[1], viz.colors.purple + '66', 2, true);
                } else {
                    // Show direct composition
                    viz.drawVector(0, 0, STv[0], STv[1], viz.colors.purple, '(S∘T)(v)', 3);
                    viz.drawSegment(v[0], v[1], STv[0], STv[1], viz.colors.purple + '66', 2, true);
                }

                // Show unit square transformations (faded)
                viz.drawTransformedUnitSquare(T, viz.colors.orange + '22', viz.colors.orange + '44', 1);
                viz.drawTransformedUnitSquare(ST, viz.colors.purple + '33', viz.colors.purple + '66', 1.5);

                viz.drawDraggables();

                infoDiv.innerHTML = `
                    T = [[${state.t_a.toFixed(2)}, ${state.t_b.toFixed(2)}], [${state.t_c.toFixed(2)}, ${state.t_d.toFixed(2)}]]<br>
                    S = [[${state.s_a.toFixed(2)}, ${state.s_b.toFixed(2)}], [${state.s_c.toFixed(2)}, ${state.s_d.toFixed(2)}]]<br>
                    <span style="color:${viz.colors.purple}">S∘T = [[${ST[0][0].toFixed(2)}, ${ST[0][1].toFixed(2)}], [${ST[1][0].toFixed(2)}, ${ST[1][1].toFixed(2)}]]</span><br>
                    v = (${v[0].toFixed(2)}, ${v[1].toFixed(2)})<br>
                    ${state.showIntermediate ?
                        `<span style="color:${viz.colors.orange}">T(v) = (${Tv[0].toFixed(2)}, ${Tv[1].toFixed(2)})</span><br>` : ''}
                    <span style="color:${viz.colors.purple}">(S∘T)(v) = (${STv[0].toFixed(2)}, ${STv[1].toFixed(2)})</span>
                `;
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch02-extra-viz-6',
        title: 'Interactive: Change of Basis with Dual Coordinate Grids',
        description: 'See how the same vector has different coordinates in different bases. Drag the basis vectors and watch coordinates update in both coordinate systems.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 460, scale: 45});

            // Standard basis e1, e2 is fixed
            // New basis b1, b2 is draggable
            const b1 = viz.addDraggable('b1', 1.5, 0.5, viz.colors.orange, 8, () => draw());
            const b2 = viz.addDraggable('b2', -0.3, 1.8, viz.colors.teal, 8, () => draw());
            const testVec = viz.addDraggable('v', 2, 1.5, viz.colors.pink, 9, () => draw());

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '13px';
            infoDiv.style.color = viz.colors.text;
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();

                // Draw standard grid
                viz.drawGrid(1);
                viz.drawAxes();

                // Draw new basis grid (parallelogram grid formed by b1, b2)
                for (let i = -5; i <= 5; i++) {
                    // Lines parallel to b1
                    const start = [i * b2.x - 10 * b1.x, i * b2.y - 10 * b1.y];
                    const end = [i * b2.x + 10 * b1.x, i * b2.y + 10 * b1.y];
                    viz.drawSegment(start[0], start[1], end[0], end[1], viz.colors.orange + '33', 1, false);

                    // Lines parallel to b2
                    const start2 = [i * b1.x - 10 * b2.x, i * b1.y - 10 * b2.y];
                    const end2 = [i * b1.x + 10 * b2.x, i * b1.y + 10 * b2.y];
                    viz.drawSegment(start2[0], start2[1], end2[0], end2[1], viz.colors.teal + '33', 1, false);
                }

                // Draw basis vectors
                viz.drawVector(0, 0, b1.x, b1.y, viz.colors.orange, 'b₁', 3);
                viz.drawVector(0, 0, b2.x, b2.y, viz.colors.teal, 'b₂', 3);

                // Draw test vector
                viz.drawVector(0, 0, testVec.x, testVec.y, viz.colors.pink, 'v', 3.5);

                // Compute coordinates in new basis
                // Solve: v = α*b1 + β*b2
                // This is: [b1 b2] [α; β] = v
                // So [α; β] = [b1 b2]^(-1) v
                const B = [[b1.x, b2.x], [b1.y, b2.y]];
                const detB = VizEngine.det2(B);

                let alpha = 0, beta = 0;
                if (Math.abs(detB) > 0.01) {
                    // B is invertible
                    const Binv = [[B[1][1]/detB, -B[0][1]/detB], [-B[1][0]/detB, B[0][0]/detB]];
                    const coords = VizEngine.matVec(Binv, [testVec.x, testVec.y]);
                    alpha = coords[0];
                    beta = coords[1];

                    // Draw decomposition
                    const alphaB1 = [alpha * b1.x, alpha * b1.y];
                    const betaB2 = [beta * b2.x, beta * b2.y];

                    viz.drawVector(0, 0, alphaB1[0], alphaB1[1], viz.colors.orange + 'AA', null, 2);
                    viz.drawVector(alphaB1[0], alphaB1[1], alphaB1[0] + betaB2[0], alphaB1[1] + betaB2[1],
                                   viz.colors.teal + 'AA', null, 2);

                    // Parallelogram
                    viz.drawSegment(0, 0, alphaB1[0], alphaB1[1], viz.colors.orange + '88', 2, true);
                    viz.drawSegment(0, 0, betaB2[0], betaB2[1], viz.colors.teal + '88', 2, true);
                    viz.drawSegment(alphaB1[0], alphaB1[1], testVec.x, testVec.y, viz.colors.teal + '88', 2, true);
                    viz.drawSegment(betaB2[0], betaB2[1], testVec.x, testVec.y, viz.colors.orange + '88', 2, true);
                }

                viz.drawDraggables();

                const validBasis = Math.abs(detB) > 0.01;
                infoDiv.innerHTML = `
                    Standard basis: e₁=(1,0), e₂=(0,1)<br>
                    New basis: b₁=(${b1.x.toFixed(2)}, ${b1.y.toFixed(2)}), b₂=(${b2.x.toFixed(2)}, ${b2.y.toFixed(2)})<br>
                    ${validBasis ? '' : '<span style="color:#f85149">Basis vectors are linearly dependent!</span><br>'}
                    <br>
                    Vector v in standard coords: [v]ₑ = (${testVec.x.toFixed(2)}, ${testVec.y.toFixed(2)})<br>
                    ${validBasis ?
                        `Vector v in new basis: <span style="color:${viz.colors.pink}">[v]ᵦ = (${alpha.toFixed(2)}, ${beta.toFixed(2)})</span><br>` +
                        `Verification: v = ${alpha.toFixed(2)}·b₁ + ${beta.toFixed(2)}·b₂` :
                        'Cannot express v in this basis'}
                `;
            }

            draw();
            return viz;
        }
    }
];

window.EXTRA_VIZ['ch02']['ch02-sec04'] = [
    {
        id: 'ch02-extra-viz-7',
        title: 'Interactive: Projection Operators',
        description: 'Explore projection onto a subspace W along a complement. Drag to set the subspace and see how vectors project onto it.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 460, scale: 45});

            const wVec = viz.addDraggable('w', 2, 1, viz.colors.green, 8, () => draw());
            const compVec = viz.addDraggable('c', -0.5, 2, viz.colors.yellow, 8, () => draw());
            const testVec = viz.addDraggable('v', 2.5, 2, viz.colors.pink, 9, () => draw());

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '13px';
            infoDiv.style.color = viz.colors.text;
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const w = [wVec.x, wVec.y];
                const c = [compVec.x, compVec.y];

                // Draw subspace W (line through origin)
                for (let t = -10; t <= 10; t += 0.2) {
                    viz.drawPoint(t * w[0], t * w[1], viz.colors.green + '66', null, 2);
                }

                // Draw complement space (line through origin)
                for (let t = -10; t <= 10; t += 0.2) {
                    viz.drawPoint(t * c[0], t * c[1], viz.colors.yellow + '44', null, 2);
                }

                viz.drawVector(0, 0, w[0], w[1], viz.colors.green, 'w (subspace)', 3);
                viz.drawVector(0, 0, c[0], c[1], viz.colors.yellow, 'c (complement)', 2.5);

                // Project v onto W along C
                // v = α*w + β*c, projection is α*w
                const det = w[0]*c[1] - w[1]*c[0];

                if (Math.abs(det) > 0.01) {
                    // Solve [w c][α; β] = v
                    const invDet = 1/det;
                    const alpha = invDet * (c[1]*testVec.x - c[0]*testVec.y);
                    const beta = invDet * (-w[1]*testVec.x + w[0]*testVec.y);

                    const proj = [alpha * w[0], alpha * w[1]];
                    const comp = [beta * c[0], beta * c[1]];

                    // Draw test vector
                    viz.drawVector(0, 0, testVec.x, testVec.y, viz.colors.pink, 'v', 3);

                    // Draw projection
                    viz.drawVector(0, 0, proj[0], proj[1], viz.colors.blue, 'P(v)', 3.5);

                    // Draw decomposition
                    viz.drawSegment(proj[0], proj[1], testVec.x, testVec.y, viz.colors.yellow + 'AA', 2.5, true);
                    viz.drawPoint(proj[0], proj[1], viz.colors.blue, null, 7);

                    // Show that v = P(v) + component
                    viz.drawVector(proj[0], proj[1], testVec.x, testVec.y, viz.colors.yellow + 'AA', null, 2);

                    const isIdempotent = Math.abs(alpha - alpha*alpha) < 0.01 && Math.abs(beta - 0) < 0.01;

                    infoDiv.innerHTML = `
                        Projection onto W = span{w} along C = span{c}<br>
                        w = (${w[0].toFixed(2)}, ${w[1].toFixed(2)})<br>
                        c = (${c[0].toFixed(2)}, ${c[1].toFixed(2)})<br>
                        <br>
                        v = (${testVec.x.toFixed(2)}, ${testVec.y.toFixed(2)})<br>
                        v = ${alpha.toFixed(2)}·w + ${beta.toFixed(2)}·c<br>
                        <span style="color:${viz.colors.blue}">P(v) = ${alpha.toFixed(2)}·w = (${proj[0].toFixed(2)}, ${proj[1].toFixed(2)})</span><br>
                        <br>
                        P² = P (projection is idempotent)<br>
                        im(P) = W, ker(P) = C
                    `;
                } else {
                    viz.drawVector(0, 0, testVec.x, testVec.y, viz.colors.pink, 'v', 3);
                    viz.drawDraggables();
                    infoDiv.innerHTML = `
                        <span style="color:#f85149">w and c are not linearly independent!</span><br>
                        Need w and c to span ℝ² for projection to be well-defined.
                    `;
                    return;
                }

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch02-extra-viz-8',
        title: 'Interactive: Reflection and Rotation Decomposition',
        description: 'Decompose transformations into reflections and rotations. See how matrix properties determine geometric behavior.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 460, scale: 55});

            const state = {
                type: 'rotation',
                angle: Math.PI / 4,
                reflectAngle: 0,
                scale: 1
            };

            const typeSelect = document.createElement('select');
            typeSelect.style.marginBottom = '10px';
            typeSelect.style.padding = '5px';
            typeSelect.innerHTML = `
                <option value="rotation">Rotation</option>
                <option value="reflection">Reflection</option>
                <option value="rotoreflection">Rotation + Reflection</option>
                <option value="scaling">Scaling</option>
            `;
            typeSelect.addEventListener('change', (e) => {
                state.type = e.target.value;
                draw();
            });
            controls.appendChild(typeSelect);

            const angleSlider = VizEngine.createSlider(controls, 'Angle (degrees)', 0, 360, state.angle * 180 / Math.PI, 5, (val) => {
                state.angle = val * Math.PI / 180;
                draw();
            });

            const reflectSlider = VizEngine.createSlider(controls, 'Reflection axis (degrees)', 0, 180, state.reflectAngle * 180 / Math.PI, 5, (val) => {
                state.reflectAngle = val * Math.PI / 180;
                draw();
            });

            const scaleSlider = VizEngine.createSlider(controls, 'Scale factor', 0.1, 2, state.scale, 0.1, (val) => {
                state.scale = val;
                draw();
            });

            const testVec = viz.addDraggable('v', 1.5, 0.5, viz.colors.pink, 8, () => draw());

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '12px';
            infoDiv.style.color = viz.colors.text;
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                let matrix;
                let description = '';

                if (state.type === 'rotation') {
                    const c = Math.cos(state.angle);
                    const s = Math.sin(state.angle);
                    matrix = [[c, -s], [s, c]];
                    description = `Rotation by ${(state.angle * 180 / Math.PI).toFixed(1)}°`;
                } else if (state.type === 'reflection') {
                    const c = Math.cos(2 * state.reflectAngle);
                    const s = Math.sin(2 * state.reflectAngle);
                    matrix = [[c, s], [s, -c]];
                    description = `Reflection across line at ${(state.reflectAngle * 180 / Math.PI).toFixed(1)}°`;

                    // Draw reflection axis
                    const axisDir = [Math.cos(state.reflectAngle), Math.sin(state.reflectAngle)];
                    for (let t = -10; t <= 10; t += 0.15) {
                        viz.drawPoint(t * axisDir[0], t * axisDir[1], viz.colors.yellow + '66', null, 2);
                    }
                } else if (state.type === 'rotoreflection') {
                    const cr = Math.cos(state.angle);
                    const sr = Math.sin(state.angle);
                    const cf = Math.cos(2 * state.reflectAngle);
                    const sf = Math.sin(2 * state.reflectAngle);
                    const R = [[cr, -sr], [sr, cr]];
                    const F = [[cf, sf], [sf, -cf]];
                    matrix = VizEngine.matMul(R, F);
                    description = `Rotation ${(state.angle * 180 / Math.PI).toFixed(1)}° + Reflection ${(state.reflectAngle * 180 / Math.PI).toFixed(1)}°`;
                } else if (state.type === 'scaling') {
                    matrix = [[state.scale, 0], [0, state.scale]];
                    description = `Uniform scaling by ${state.scale.toFixed(2)}`;
                }

                // Draw transformed unit circle
                const numPoints = 60;
                for (let i = 0; i < numPoints; i++) {
                    const theta = (i / numPoints) * 2 * Math.PI;
                    const p = [Math.cos(theta), Math.sin(theta)];
                    const Tp = VizEngine.matVec(matrix, p);
                    viz.drawPoint(Tp[0], Tp[1], viz.colors.orange + '88', null, 2.5);

                    // Original circle (faded)
                    viz.drawPoint(p[0], p[1], viz.colors.blue + '33', null, 2);
                }

                // Draw test vector and its image
                const v = [testVec.x, testVec.y];
                const Tv = VizEngine.matVec(matrix, v);

                viz.drawVector(0, 0, v[0], v[1], viz.colors.pink, 'v', 3);
                viz.drawVector(0, 0, Tv[0], Tv[1], viz.colors.teal, 'T(v)', 3.5);

                // Draw basis vectors and their images
                const e1 = [1, 0];
                const e2 = [0, 1];
                const Te1 = VizEngine.matVec(matrix, e1);
                const Te2 = VizEngine.matVec(matrix, e2);

                viz.drawVector(0, 0, Te1[0], Te1[1], viz.colors.orange + 'AA', null, 2);
                viz.drawVector(0, 0, Te2[0], Te2[1], viz.colors.orange + 'AA', null, 2);

                viz.drawDraggables();

                const det = VizEngine.det2(matrix);
                const eigenvals = VizEngine.eigenvalues2(matrix);
                const eigenStr = eigenvals ? eigenvals.map(e => e.toFixed(3)).join(', ') : 'complex';

                infoDiv.innerHTML = `
                    <strong>${description}</strong><br>
                    Matrix: [[${matrix[0][0].toFixed(3)}, ${matrix[0][1].toFixed(3)}], [${matrix[1][0].toFixed(3)}, ${matrix[1][1].toFixed(3)}]]<br>
                    det(T) = ${det.toFixed(3)}<br>
                    eigenvalues: ${eigenStr}<br>
                    <br>
                    v = (${v[0].toFixed(2)}, ${v[1].toFixed(2)})<br>
                    T(v) = (${Tv[0].toFixed(2)}, ${Tv[1].toFixed(2)})<br>
                    |v| = ${VizEngine.vecLen(v).toFixed(3)}, |T(v)| = ${VizEngine.vecLen(Tv).toFixed(3)}
                `;
            }

            draw();
            return viz;
        }
    }
];
