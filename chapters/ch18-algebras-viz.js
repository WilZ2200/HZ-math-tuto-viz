// Extra Interactive Visualizations for Chapter 18: An Introduction to Algebras
// Steven Roman's Advanced Linear Algebra

window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch18'] = window.EXTRA_VIZ['ch18'] || {};

// Section 1: Algebras and Subalgebras
window.EXTRA_VIZ['ch18']['ch18-sec01'] = [
    {
        id: 'ch18-extra-viz-1',
        title: 'Interactive: Algebra Multiplication Table Heatmap',
        description: 'Explore multiplication tables of small algebras. View the structure constants as a heatmap and see how multiplication behaves.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 480, scale: 1});

            // Algebra selector
            const algebraSelect = document.createElement('select');
            algebraSelect.style.marginBottom = '10px';
            algebraSelect.innerHTML = `
                <option value="C">ℂ over ℝ (basis: {1, i})</option>
                <option value="H">ℍ Quaternions (basis: {1, i, j, k})</option>
                <option value="M2">M₂(ℝ) 2×2 matrices</option>
                <option value="dual">Dual numbers ℝ[ε] (ε²=0)</option>
            `;
            controls.appendChild(algebraSelect);

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            controls.appendChild(infoDiv);

            const algebras = {
                C: {
                    name: 'Complex numbers ℂ',
                    basis: ['1', 'i'],
                    // mult[i][j] = coefficients of e_i * e_j in basis
                    mult: [
                        [[1,0], [0,1]],  // 1*1=1, 1*i=i
                        [[0,1], [-1,0]]  // i*1=i, i*i=-1
                    ],
                    commutative: true,
                    associative: true,
                    division: true
                },
                H: {
                    name: 'Quaternions ℍ',
                    basis: ['1', 'i', 'j', 'k'],
                    mult: [
                        [[1,0,0,0], [0,1,0,0], [0,0,1,0], [0,0,0,1]], // 1*x = x
                        [[0,1,0,0], [-1,0,0,0], [0,0,0,1], [0,0,-1,0]], // i*1=i, i*i=-1, i*j=k, i*k=-j
                        [[0,0,1,0], [0,0,0,-1], [-1,0,0,0], [0,1,0,0]], // j*1=j, j*i=-k, j*j=-1, j*k=i
                        [[0,0,0,1], [0,0,1,0], [0,-1,0,0], [-1,0,0,0]]  // k*1=k, k*i=j, k*j=-i, k*k=-1
                    ],
                    commutative: false,
                    associative: true,
                    division: true
                },
                M2: {
                    name: 'M₂(ℝ) 2×2 matrices',
                    basis: ['E₁₁', 'E₁₂', 'E₂₁', 'E₂₂'],
                    // Elementary matrices
                    mult: [
                        [[1,0,0,0], [0,1,0,0], [0,0,0,0], [0,0,0,0]], // E11*Eij
                        [[0,0,0,0], [0,0,0,0], [1,0,0,0], [0,1,0,0]], // E12*Eij
                        [[0,0,1,0], [0,0,0,1], [0,0,0,0], [0,0,0,0]], // E21*Eij
                        [[0,0,0,0], [0,0,0,0], [0,0,1,0], [0,0,0,1]]  // E22*Eij
                    ],
                    commutative: false,
                    associative: true,
                    division: false
                },
                dual: {
                    name: 'Dual numbers ℝ[ε]',
                    basis: ['1', 'ε'],
                    mult: [
                        [[1,0], [0,1]],  // 1*1=1, 1*ε=ε
                        [[0,1], [0,0]]   // ε*1=ε, ε*ε=0
                    ],
                    commutative: true,
                    associative: true,
                    division: false
                }
            };

            function draw() {
                viz.clear();
                const algebra = algebras[algebraSelect.value];
                const n = algebra.basis.length;
                const cellSize = Math.min(80, 400 / n);
                const offsetX = 100;
                const offsetY = 80;

                const ctx = viz.ctx;
                ctx.save();

                // Title
                ctx.fillStyle = viz.colors.white;
                ctx.font = 'bold 14px Arial';
                ctx.textAlign = 'left';
                ctx.fillText(algebra.name, 10, 25);

                // Properties
                ctx.font = '12px monospace';
                ctx.fillStyle = viz.colors.text;
                let y = 45;
                ctx.fillText(`• Commutative: ${algebra.commutative ? 'Yes' : 'No'}`, 10, y);
                y += 15;
                ctx.fillText(`• Associative: ${algebra.associative ? 'Yes' : 'No'}`, 10, y);
                y += 15;
                ctx.fillText(`• Division algebra: ${algebra.division ? 'Yes' : 'No'}`, 10, y);

                // Row labels
                ctx.font = '12px Arial';
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                for (let i = 0; i < n; i++) {
                    ctx.fillStyle = viz.colors.white;
                    ctx.fillText(algebra.basis[i], offsetX - 10, offsetY + i * cellSize + cellSize/2);
                }

                // Column labels
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                for (let j = 0; j < n; j++) {
                    ctx.fillStyle = viz.colors.white;
                    ctx.fillText(algebra.basis[j], offsetX + j * cellSize + cellSize/2, offsetY - 10);
                }

                // Multiplication table with heatmap
                for (let i = 0; i < n; i++) {
                    for (let j = 0; j < n; j++) {
                        const product = algebra.mult[i][j];

                        // Calculate magnitude for heatmap (number of nonzero coefficients)
                        const magnitude = product.reduce((sum, c) => sum + Math.abs(c), 0);
                        const hasNegative = product.some(c => c < 0);

                        // Color based on product
                        let color = viz.colors.blue;
                        if (magnitude === 0) color = viz.colors.text;
                        else if (hasNegative) color = viz.colors.red;
                        else color = viz.colors.green;

                        // Draw cell
                        ctx.fillStyle = color + '33';
                        ctx.fillRect(offsetX + j * cellSize, offsetY + i * cellSize, cellSize, cellSize);

                        // Border
                        ctx.strokeStyle = viz.colors.text + '66';
                        ctx.lineWidth = 1;
                        ctx.strokeRect(offsetX + j * cellSize, offsetY + i * cellSize, cellSize, cellSize);

                        // Product text
                        ctx.fillStyle = viz.colors.white;
                        ctx.font = '10px monospace';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';

                        let productStr = '';
                        for (let k = 0; k < n; k++) {
                            if (product[k] !== 0) {
                                if (productStr !== '' && product[k] > 0) productStr += '+';
                                if (product[k] === -1 && k > 0) productStr += '-';
                                else if (product[k] !== 1 || k === 0) productStr += product[k];
                                if (k > 0) productStr += algebra.basis[k];
                            }
                        }
                        if (productStr === '') productStr = '0';

                        ctx.fillText(productStr,
                            offsetX + j * cellSize + cellSize/2,
                            offsetY + i * cellSize + cellSize/2);
                    }
                }

                // Axis labels
                ctx.fillStyle = viz.colors.text;
                ctx.font = 'italic 11px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('(column)', offsetX + n * cellSize / 2, offsetY - 30);

                ctx.save();
                ctx.translate(offsetX - 50, offsetY + n * cellSize / 2);
                ctx.rotate(-Math.PI / 2);
                ctx.fillText('(row)', 0, 0);
                ctx.restore();

                ctx.restore();

                // Info
                infoDiv.innerHTML = `<span style="color: ${viz.colors.teal}">Multiplication table:</span> ` +
                    `Row × Column = Result<br>` +
                    `<span style="color: ${viz.colors.green}">Green</span>: positive, ` +
                    `<span style="color: ${viz.colors.red}">Red</span>: negative terms`;
            }

            algebraSelect.addEventListener('change', draw);
            draw();
            return viz;
        }
    },

    {
        id: 'ch18-extra-viz-2',
        title: 'Interactive: Quaternion Rotation Explorer',
        description: 'See how quaternions represent 3D rotations. Adjust a quaternion q = w + xi + yj + zk and watch it rotate a vector in ℝ³.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 450, scale: 60});

            let q = {w: 1, x: 0, y: 0, z: 0}; // Quaternion
            const v = {x: 2, y: 1, z: 0.5}; // Vector to rotate

            // Sliders for quaternion components
            const wSlider = VizEngine.createSlider(controls, 'w (scalar):', -1, 1, 1, 0.1, (val) => {
                q.w = val; draw();
            });
            const xSlider = VizEngine.createSlider(controls, 'x (i coeff):', -1, 1, 0, 0.1, (val) => {
                q.x = val; draw();
            });
            const ySlider = VizEngine.createSlider(controls, 'y (j coeff):', -1, 1, 0, 0.1, (val) => {
                q.y = val; draw();
            });
            const zSlider = VizEngine.createSlider(controls, 'z (k coeff):', -1, 1, 0, 0.1, (val) => {
                q.z = val; draw();
            });

            const normalizeBtn = VizEngine.createButton(controls, 'Normalize', () => {
                const norm = Math.sqrt(q.w*q.w + q.x*q.x + q.y*q.y + q.z*q.z);
                if (norm > 0) {
                    q.w /= norm; q.x /= norm; q.y /= norm; q.z /= norm;
                    wSlider.value = q.w;
                    xSlider.value = q.x;
                    ySlider.value = q.y;
                    zSlider.value = q.z;
                    draw();
                }
            });

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            controls.appendChild(infoDiv);

            // Quaternion multiplication
            function quatMult(a, b) {
                return {
                    w: a.w*b.w - a.x*b.x - a.y*b.y - a.z*b.z,
                    x: a.w*b.x + a.x*b.w + a.y*b.z - a.z*b.y,
                    y: a.w*b.y - a.x*b.z + a.y*b.w + a.z*b.x,
                    z: a.w*b.z + a.x*b.y - a.y*b.x + a.z*b.w
                };
            }

            function quatConj(q) {
                return {w: q.w, x: -q.x, y: -q.y, z: -q.z};
            }

            // Rotate vector v by quaternion q using: q * v * q^*
            function rotateVector(q, v) {
                const vQuat = {w: 0, x: v.x, y: v.y, z: v.z};
                const qConj = quatConj(q);
                const temp = quatMult(q, vQuat);
                const result = quatMult(temp, qConj);
                return {x: result.x, y: result.y, z: result.z};
            }

            // Simple 3D to 2D projection (isometric)
            function project3D(x, y, z) {
                const isoX = (x - z) * 0.866;
                const isoY = (y - (x + z) * 0.5);
                return {x: isoX, y: isoY};
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const ctx = viz.ctx;

                // Normalize quaternion
                const norm = Math.sqrt(q.w*q.w + q.x*q.x + q.y*q.y + q.z*q.z);
                const qNorm = norm > 0 ? {w: q.w/norm, x: q.x/norm, y: q.y/norm, z: q.z/norm} : {w: 1, x: 0, y: 0, z: 0};

                // Rotate the vector
                const vRotated = rotateVector(qNorm, v);

                // Project to 2D
                const vProj = project3D(v.x, v.y, v.z);
                const vRotProj = project3D(vRotated.x, vRotated.y, vRotated.z);

                // Draw 3D axes
                const origin = {x: 0, y: 0};
                const xAxis = project3D(2.5, 0, 0);
                const yAxis = project3D(0, 2.5, 0);
                const zAxis = project3D(0, 0, 2.5);

                viz.drawVector(origin.x, origin.y, xAxis.x, xAxis.y, viz.colors.red + '88', 'x', 2);
                viz.drawVector(origin.x, origin.y, yAxis.x, yAxis.y, viz.colors.green + '88', 'y', 2);
                viz.drawVector(origin.x, origin.y, zAxis.x, zAxis.y, viz.colors.blue + '88', 'z', 2);

                // Draw original vector
                viz.drawVector(0, 0, vProj.x, vProj.y, viz.colors.orange, 'v', 3);

                // Draw rotated vector
                viz.drawVector(0, 0, vRotProj.x, vRotProj.y, viz.colors.teal, "v'", 3);

                // Draw arc showing rotation
                const angle = Math.atan2(vRotProj.y - vProj.y, vRotProj.x - vProj.x);
                const radius = Math.sqrt(vProj.x*vProj.x + vProj.y*vProj.y);

                // Info display
                const angle3D = Math.acos(
                    (v.x*vRotated.x + v.y*vRotated.y + v.z*vRotated.z) /
                    (Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z) *
                     Math.sqrt(vRotated.x*vRotated.x + vRotated.y*vRotated.y + vRotated.z*vRotated.z))
                ) * 180 / Math.PI;

                infoDiv.innerHTML =
                    `<span style="color: ${viz.colors.purple}">q = ${qNorm.w.toFixed(2)} + ${qNorm.x.toFixed(2)}i + ${qNorm.y.toFixed(2)}j + ${qNorm.z.toFixed(2)}k</span><br>` +
                    `‖q‖ = ${norm.toFixed(3)} (normalized: ${(norm/norm).toFixed(3)})<br>` +
                    `<span style="color: ${viz.colors.orange}">v</span> = (${v.x.toFixed(1)}, ${v.y.toFixed(1)}, ${v.z.toFixed(1)})<br>` +
                    `<span style="color: ${viz.colors.teal}">v'</span> = (${vRotated.x.toFixed(2)}, ${vRotated.y.toFixed(2)}, ${vRotated.z.toFixed(2)})<br>` +
                    `Rotation angle: ${angle3D.toFixed(1)}°<br>` +
                    `Unit quaternions form a division algebra!`;
            }

            draw();
            return viz;
        }
    }
];

// Section 5: Matrix Algebras and the Tensor Product
window.EXTRA_VIZ['ch18']['ch18-sec05'] = [
    {
        id: 'ch18-extra-viz-3',
        title: 'Interactive: Complex Numbers as ℝ-Algebra',
        description: 'See ℂ as a 2-dimensional algebra over ℝ. Multiply complex numbers and see both the geometric and algebraic structure.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

            const z1 = viz.addDraggable('z1', 1.5, 1, viz.colors.blue, 8, () => draw());
            const z2 = viz.addDraggable('z2', 0.5, 1.5, viz.colors.orange, 8, () => draw());

            const showBasisCb = document.createElement('input');
            showBasisCb.type = 'checkbox';
            showBasisCb.checked = true;
            showBasisCb.addEventListener('change', draw);
            const cbLabel = document.createElement('label');
            cbLabel.appendChild(showBasisCb);
            cbLabel.appendChild(document.createTextNode(' Show basis {1, i}'));
            controls.appendChild(cbLabel);

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Complex multiplication: (a+bi)(c+di) = (ac-bd) + (ad+bc)i
                const a = z1.x, b = z1.y;
                const c = z2.x, d = z2.y;
                const prodReal = a*c - b*d;
                const prodImag = a*d + b*c;

                // Show basis if checked
                if (showBasisCb.checked) {
                    viz.drawVector(0, 0, 1, 0, viz.colors.green + '66', '1', 2);
                    viz.drawVector(0, 0, 0, 1, viz.colors.purple + '66', 'i', 2);
                }

                // Draw input complex numbers
                viz.drawVector(0, 0, z1.x, z1.y, viz.colors.blue, 'z₁', 3);
                viz.drawVector(0, 0, z2.x, z2.y, viz.colors.orange, 'z₂', 3);

                // Draw product
                viz.drawVector(0, 0, prodReal, prodImag, viz.colors.teal, 'z₁·z₂', 3);

                // Draw multiplication as rotation + scaling
                const r1 = Math.sqrt(a*a + b*b);
                const r2 = Math.sqrt(c*c + d*d);
                const theta1 = Math.atan2(b, a);
                const theta2 = Math.atan2(d, c);

                // Draw circles to show modulus
                viz.drawCircle(0, 0, r1, null, viz.colors.blue + '44', 1);
                viz.drawCircle(0, 0, r2, null, viz.colors.orange + '44', 1);
                viz.drawCircle(0, 0, r1*r2, null, viz.colors.teal + '66', 2);

                viz.drawDraggables();

                // Info
                const prodModulus = Math.sqrt(prodReal*prodReal + prodImag*prodImag);
                const prodArg = Math.atan2(prodImag, prodReal) * 180 / Math.PI;

                infoDiv.innerHTML =
                    `<span style="color: ${viz.colors.blue}">z₁ = ${a.toFixed(2)} + ${b.toFixed(2)}i</span><br>` +
                    `|z₁| = ${r1.toFixed(3)}, arg(z₁) = ${(theta1*180/Math.PI).toFixed(1)}°<br>` +
                    `<span style="color: ${viz.colors.orange}">z₂ = ${c.toFixed(2)} + ${d.toFixed(2)}i</span><br>` +
                    `|z₂| = ${r2.toFixed(3)}, arg(z₂) = ${(theta2*180/Math.PI).toFixed(1)}°<br>` +
                    `<span style="color: ${viz.colors.teal}">z₁·z₂ = ${prodReal.toFixed(2)} + ${prodImag.toFixed(2)}i</span><br>` +
                    `|z₁·z₂| = ${prodModulus.toFixed(3)} = |z₁|·|z₂|<br>` +
                    `arg(z₁·z₂) = ${prodArg.toFixed(1)}° = ${((theta1+theta2)*180/Math.PI).toFixed(1)}°<br>` +
                    `<br>ℂ is a 2-dim algebra over ℝ with basis {1, i}`;
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch18-extra-viz-4',
        title: 'Interactive: Matrix Algebra Composition',
        description: 'Visualize 2×2 matrix multiplication as a composition of linear transformations. See how algebra structure emerges.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 60});

            // Matrix A
            let A = [[1.5, 0.3], [0.2, 1.2]];
            // Matrix B
            let B = [[1.1, -0.4], [0.5, 0.9]];

            const aSliders = [];
            const bSliders = [];

            const labels = ['a₁₁', 'a₁₂', 'a₂₁', 'a₂₂'];
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    const idx = i*2 + j;
                    aSliders.push(VizEngine.createSlider(controls, labels[idx] + ':', -2, 2, A[i][j], 0.1, (val) => {
                        A[i][j] = val;
                        draw();
                    }));
                }
            }

            const spacer = document.createElement('div');
            spacer.style.height = '10px';
            controls.appendChild(spacer);

            const bLabels = ['b₁₁', 'b₁₂', 'b₂₁', 'b₂₂'];
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    const idx = i*2 + j;
                    bSliders.push(VizEngine.createSlider(controls, bLabels[idx] + ':', -2, 2, B[i][j], 0.1, (val) => {
                        B[i][j] = val;
                        draw();
                    }));
                }
            }

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '10px';
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Unit square
                const square = [[0,0], [1,0], [1,1], [0,1]];

                // Transform by B
                const squareB = square.map(p => VizEngine.matVec(B, p));
                viz.drawPolygon(squareB, viz.colors.orange + '33', viz.colors.orange, 2);

                // Transform by A then B (i.e., BA)
                const BA = VizEngine.matMul(B, A);
                const squareBA = square.map(p => VizEngine.matVec(BA, p));
                viz.drawPolygon(squareBA, viz.colors.teal + '33', viz.colors.teal, 2);

                // Draw unit square
                viz.drawPolygon(square, viz.colors.white + '22', viz.colors.white + '88', 1);

                // Draw basis vectors
                viz.drawVector(0, 0, 1, 0, viz.colors.blue + '66', 'e₁', 1);
                viz.drawVector(0, 0, 0, 1, viz.colors.green + '66', 'e₂', 1);

                // Compute determinants
                const detA = A[0][0]*A[1][1] - A[0][1]*A[1][0];
                const detB = B[0][0]*B[1][1] - B[0][1]*B[1][0];
                const detBA = BA[0][0]*BA[1][1] - BA[0][1]*BA[1][0];

                // Info
                infoDiv.innerHTML =
                    `<span style="color: ${viz.colors.blue}">A</span> = [${A[0][0].toFixed(2)}, ${A[0][1].toFixed(2)}; ${A[1][0].toFixed(2)}, ${A[1][1].toFixed(2)}]<br>` +
                    `det(A) = ${detA.toFixed(3)}<br>` +
                    `<span style="color: ${viz.colors.orange}">B</span> = [${B[0][0].toFixed(2)}, ${B[0][1].toFixed(2)}; ${B[1][0].toFixed(2)}, ${B[1][1].toFixed(2)}]<br>` +
                    `det(B) = ${detB.toFixed(3)}<br>` +
                    `<span style="color: ${viz.colors.teal}">BA</span> = [${BA[0][0].toFixed(2)}, ${BA[0][1].toFixed(2)}; ${BA[1][0].toFixed(2)}, ${BA[1][1].toFixed(2)}]<br>` +
                    `det(BA) = ${detBA.toFixed(3)} = det(B)·det(A)<br>` +
                    `<br>M₂(ℝ) is a non-commutative algebra`;
            }

            draw();
            return viz;
        }
    }
];

// Section 4: Division Algebras
window.EXTRA_VIZ['ch18']['ch18-sec04'] = [
    {
        id: 'ch18-extra-viz-5',
        title: 'Interactive: Division Algebra Explorer',
        description: 'Compare ℝ, ℂ, and ℍ (the only finite-dimensional division algebras over ℝ by Frobenius). See multiplicative inverses.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 450, scale: 1});

            const algebraSelect = document.createElement('select');
            algebraSelect.style.marginBottom = '10px';
            algebraSelect.innerHTML = `
                <option value="R">ℝ (1-dimensional)</option>
                <option value="C">ℂ (2-dimensional)</option>
                <option value="H">ℍ Quaternions (4-dimensional)</option>
            `;
            controls.appendChild(algebraSelect);

            // Element input (depends on algebra)
            const elementDiv = document.createElement('div');
            elementDiv.style.marginTop = '10px';
            controls.appendChild(elementDiv);

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            controls.appendChild(infoDiv);

            let sliders = [];
            let element = {a: 2};

            function updateSliders() {
                elementDiv.innerHTML = '';
                sliders = [];

                if (algebraSelect.value === 'R') {
                    element = {a: 2};
                    sliders.push(VizEngine.createSlider(elementDiv, 'x:', -5, 5, 2, 0.1, (val) => {
                        element.a = val;
                        draw();
                    }));
                } else if (algebraSelect.value === 'C') {
                    element = {a: 1.5, b: 1};
                    sliders.push(VizEngine.createSlider(elementDiv, 'Re(z):', -3, 3, 1.5, 0.1, (val) => {
                        element.a = val;
                        draw();
                    }));
                    sliders.push(VizEngine.createSlider(elementDiv, 'Im(z):', -3, 3, 1, 0.1, (val) => {
                        element.b = val;
                        draw();
                    }));
                } else { // H
                    element = {w: 1, x: 0.5, y: 0.5, z: 0};
                    sliders.push(VizEngine.createSlider(elementDiv, 'w (scalar):', -2, 2, 1, 0.1, (val) => {
                        element.w = val;
                        draw();
                    }));
                    sliders.push(VizEngine.createSlider(elementDiv, 'x (i):', -2, 2, 0.5, 0.1, (val) => {
                        element.x = val;
                        draw();
                    }));
                    sliders.push(VizEngine.createSlider(elementDiv, 'y (j):', -2, 2, 0.5, 0.1, (val) => {
                        element.y = val;
                        draw();
                    }));
                    sliders.push(VizEngine.createSlider(elementDiv, 'z (k):', -2, 2, 0, 0.1, (val) => {
                        element.z = val;
                        draw();
                    }));
                }
                draw();
            }

            function draw() {
                viz.clear();
                const ctx = viz.ctx;
                ctx.fillStyle = viz.colors.white;
                ctx.font = 'bold 16px Arial';
                ctx.textAlign = 'left';

                let title = '';
                let elemStr = '';
                let invStr = '';
                let normSq = 0;
                let isDivision = false;
                let dimension = 0;

                if (algebraSelect.value === 'R') {
                    title = 'Real Numbers ℝ';
                    dimension = 1;
                    elemStr = element.a.toFixed(3);
                    normSq = element.a * element.a;
                    if (Math.abs(element.a) > 0.001) {
                        invStr = (1/element.a).toFixed(3);
                        isDivision = true;
                    }
                } else if (algebraSelect.value === 'C') {
                    title = 'Complex Numbers ℂ';
                    dimension = 2;
                    elemStr = `${element.a.toFixed(2)} + ${element.b.toFixed(2)}i`;
                    normSq = element.a*element.a + element.b*element.b;
                    if (normSq > 0.001) {
                        const invA = element.a / normSq;
                        const invB = -element.b / normSq;
                        invStr = `${invA.toFixed(3)} + ${invB.toFixed(3)}i`;
                        isDivision = true;
                    }
                } else {
                    title = 'Quaternions ℍ';
                    dimension = 4;
                    elemStr = `${element.w.toFixed(2)} + ${element.x.toFixed(2)}i + ${element.y.toFixed(2)}j + ${element.z.toFixed(2)}k`;
                    normSq = element.w*element.w + element.x*element.x + element.y*element.y + element.z*element.z;
                    if (normSq > 0.001) {
                        const invW = element.w / normSq;
                        const invX = -element.x / normSq;
                        const invY = -element.y / normSq;
                        const invZ = -element.z / normSq;
                        invStr = `${invW.toFixed(3)} + ${invX.toFixed(3)}i + ${invY.toFixed(3)}j + ${invZ.toFixed(3)}k`;
                        isDivision = true;
                    }
                }

                ctx.fillText(title, 20, 30);

                ctx.font = '12px monospace';
                ctx.fillStyle = viz.colors.text;
                let y = 60;
                ctx.fillText(`Dimension over ℝ: ${dimension}`, 20, y);
                y += 25;

                ctx.fillStyle = viz.colors.blue;
                ctx.fillText(`x = ${elemStr}`, 20, y);
                y += 20;

                ctx.fillStyle = viz.colors.purple;
                ctx.fillText(`‖x‖² = ${normSq.toFixed(4)}`, 20, y);
                y += 25;

                if (isDivision) {
                    ctx.fillStyle = viz.colors.green;
                    ctx.fillText(`x⁻¹ = ${invStr}`, 20, y);
                    y += 20;
                    ctx.fillStyle = viz.colors.teal;
                    ctx.fillText(`✓ Inverse exists (division algebra)`, 20, y);
                } else {
                    ctx.fillStyle = viz.colors.red;
                    ctx.fillText(`✗ No inverse (x = 0)`, 20, y);
                }
                y += 30;

                // Draw table of properties
                ctx.fillStyle = viz.colors.white;
                ctx.font = '11px Arial';
                ctx.fillText('Properties:', 20, y);
                y += 20;

                const props = [
                    ['Associative', 'Yes', 'Yes', 'Yes'],
                    ['Commutative', 'Yes', 'Yes', 'No'],
                    ['Division algebra', 'Yes', 'Yes', 'Yes']
                ];

                const algs = ['ℝ', 'ℂ', 'ℍ'];
                const algIdx = algebraSelect.value === 'R' ? 0 : algebraSelect.value === 'C' ? 1 : 2;

                ctx.font = '10px monospace';
                props.forEach((prop, i) => {
                    ctx.fillStyle = viz.colors.text;
                    ctx.fillText(`• ${prop[0]}: `, 30, y);
                    ctx.fillStyle = prop[algIdx + 1] === 'Yes' ? viz.colors.green : viz.colors.orange;
                    ctx.fillText(prop[algIdx + 1], 150, y);
                    y += 18;
                });

                // Frobenius theorem note
                y += 10;
                ctx.fillStyle = viz.colors.yellow;
                ctx.font = 'italic 11px Arial';
                const lines = [
                    'Frobenius Theorem (1877):',
                    'The only finite-dimensional division',
                    'algebras over ℝ are ℝ, ℂ, and ℍ.'
                ];
                lines.forEach(line => {
                    ctx.fillText(line, 20, y);
                    y += 15;
                });

                infoDiv.innerHTML = isDivision ?
                    `<span style="color: ${viz.colors.green}">Every nonzero element has a multiplicative inverse.</span><br>` +
                    `Inverse formula: x⁻¹ = x* / ‖x‖²` :
                    `<span style="color: ${viz.colors.red}">Zero has no inverse.</span>`;
            }

            algebraSelect.addEventListener('change', updateSliders);
            updateSliders();
            return viz;
        }
    },

    {
        id: 'ch18-extra-viz-6',
        title: 'Interactive: Ideal Containment Lattice',
        description: 'Explore ideals in the matrix algebra M₂(ℝ). See how ideals form a lattice structure and understand simple algebras.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 450, scale: 1});

            const algebraSelect = document.createElement('select');
            algebraSelect.style.marginBottom = '10px';
            algebraSelect.innerHTML = `
                <option value="M2">M₂(ℝ) - Simple algebra</option>
                <option value="upper">Upper triangular 2×2 - Not simple</option>
                <option value="R">ℝ[x]/(x²) - Not simple</option>
            `;
            controls.appendChild(algebraSelect);

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                const ctx = viz.ctx;

                const algebra = algebraSelect.value;
                let title = '';
                let ideals = [];
                let edges = [];
                let isSimple = false;

                if (algebra === 'M2') {
                    title = 'M₂(ℝ) - Matrix Algebra';
                    ideals = [
                        {name: 'M₂(ℝ)', desc: 'All 2×2 matrices', level: 2},
                        {name: '{0}', desc: 'Zero ideal', level: 0}
                    ];
                    edges = [];
                    isSimple = true;
                } else if (algebra === 'upper') {
                    title = 'Upper Triangular 2×2 Matrices';
                    ideals = [
                        {name: 'T₂(ℝ)', desc: 'All upper triangular', level: 3},
                        {name: 'N', desc: 'Strictly upper triangular', level: 2},
                        {name: 'N²', desc: 'Nilpotent of index 2', level: 1},
                        {name: '{0}', desc: 'Zero ideal', level: 0}
                    ];
                    edges = [[0,1], [1,2], [2,3]];
                    isSimple = false;
                } else {
                    title = 'ℝ[x]/(x²) - Quotient Algebra';
                    ideals = [
                        {name: 'ℝ[x]/(x²)', desc: 'Whole algebra', level: 2},
                        {name: '(x̄)', desc: 'Ideal generated by x̄', level: 1},
                        {name: '{0}', desc: 'Zero ideal', level: 0}
                    ];
                    edges = [[0,1], [1,2]];
                    isSimple = false;
                }

                // Draw title
                ctx.fillStyle = viz.colors.white;
                ctx.font = 'bold 14px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(title, 280, 30);

                // Draw lattice
                const levelHeight = 80;
                const startY = 100;
                const centerX = 280;

                // Draw edges first
                ctx.strokeStyle = viz.colors.text + '88';
                ctx.lineWidth = 2;
                edges.forEach(([from, to]) => {
                    const fromY = startY + (ideals.length - 1 - ideals[from].level) * levelHeight;
                    const toY = startY + (ideals.length - 1 - ideals[to].level) * levelHeight;

                    ctx.beginPath();
                    ctx.moveTo(centerX, fromY + 25);
                    ctx.lineTo(centerX, toY - 25);
                    ctx.stroke();
                });

                // Draw nodes
                ideals.forEach((ideal, i) => {
                    const y = startY + (ideals.length - 1 - ideal.level) * levelHeight;

                    // Circle
                    ctx.fillStyle = i === 0 ? viz.colors.blue :
                                   i === ideals.length - 1 ? viz.colors.red :
                                   viz.colors.purple;
                    ctx.beginPath();
                    ctx.arc(centerX, y, 20, 0, 2*Math.PI);
                    ctx.fill();

                    ctx.strokeStyle = viz.colors.white;
                    ctx.lineWidth = 2;
                    ctx.stroke();

                    // Label
                    ctx.fillStyle = viz.colors.white;
                    ctx.font = 'bold 12px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(ideal.name, centerX, y);

                    // Description
                    ctx.font = '10px Arial';
                    ctx.fillStyle = viz.colors.text;
                    ctx.fillText(ideal.desc, centerX, y + 40);
                });

                // Draw properties box
                const boxY = startY + ideals.length * levelHeight + 20;
                ctx.fillStyle = viz.colors.white + '22';
                ctx.fillRect(50, boxY, 460, 100);
                ctx.strokeStyle = viz.colors.white + '88';
                ctx.lineWidth = 1;
                ctx.strokeRect(50, boxY, 460, 100);

                ctx.fillStyle = viz.colors.white;
                ctx.font = 'bold 12px Arial';
                ctx.textAlign = 'left';
                ctx.fillText('Properties:', 60, boxY + 20);

                ctx.font = '11px monospace';
                ctx.fillStyle = viz.colors.text;
                let textY = boxY + 40;

                if (isSimple) {
                    ctx.fillStyle = viz.colors.green;
                    ctx.fillText('✓ Simple algebra: Only trivial ideals {0} and the whole algebra', 60, textY);
                    textY += 20;
                    ctx.fillStyle = viz.colors.teal;
                    ctx.fillText('  Simple algebras are "irreducible" building blocks', 60, textY);
                } else {
                    ctx.fillStyle = viz.colors.orange;
                    ctx.fillText('✗ Not simple: Has nontrivial proper ideals', 60, textY);
                    textY += 20;
                    ctx.fillStyle = viz.colors.text;
                    ctx.fillText(`  Contains ${ideals.length - 2} proper nontrivial ideal(s)`, 60, textY);
                }

                infoDiv.innerHTML =
                    `<span style="color: ${viz.colors.purple}">Ideal:</span> A subspace I such that AI ⊆ I and IA ⊆ I<br>` +
                    `<span style="color: ${viz.colors.teal}">Simple algebra:</span> Only ideals are {0} and A itself<br>` +
                    `<br>` +
                    (isSimple ?
                        `<span style="color: ${viz.colors.green}">This algebra is simple!</span><br>` +
                        `M_n(F) over any field F is always simple.` :
                        `<span style="color: ${viz.colors.orange}">This algebra has proper ideals.</span><br>` +
                        `Can be "factored" into simpler algebras.`);
            }

            algebraSelect.addEventListener('change', draw);
            draw();
            return viz;
        }
    }
];

// Section 6: The Structure Theory of Algebras
window.EXTRA_VIZ['ch18']['ch18-sec06'] = [
    {
        id: 'ch18-extra-viz-7',
        title: 'Interactive: Finite Division Algebras (Wedderburn)',
        description: "Explore Wedderburn's theorem: Every finite division algebra is a field (commutative). See examples of finite fields.",
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 450, scale: 1});

            const fieldSelect = document.createElement('select');
            fieldSelect.style.marginBottom = '10px';
            fieldSelect.innerHTML = `
                <option value="2">𝔽₂ (2 elements)</option>
                <option value="3">𝔽₃ (3 elements)</option>
                <option value="4">𝔽₄ (4 elements)</option>
                <option value="5">𝔽₅ (5 elements)</option>
            `;
            controls.appendChild(fieldSelect);

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                const ctx = viz.ctx;
                const p = parseInt(fieldSelect.value);

                // For F_4, we need extension field
                let elements = [];
                let multTable = [];
                let isPrime = [2,3,5].includes(p);

                if (p === 2) {
                    elements = ['0', '1'];
                    multTable = [[0,0], [0,1]];
                } else if (p === 3) {
                    elements = ['0', '1', '2'];
                    multTable = [[0,0,0], [0,1,2], [0,2,1]];
                } else if (p === 4) {
                    elements = ['0', '1', 'α', '1+α'];
                    // F_4 = F_2[x]/(x^2+x+1)
                    multTable = [
                        [0,0,0,0],
                        [0,1,2,3],
                        [0,2,3,1],
                        [0,3,1,2]
                    ];
                } else { // p === 5
                    elements = ['0', '1', '2', '3', '4'];
                    multTable = [
                        [0,0,0,0,0],
                        [0,1,2,3,4],
                        [0,2,4,1,3],
                        [0,3,1,4,2],
                        [0,4,3,2,1]
                    ];
                }

                const n = elements.length;

                // Title
                ctx.fillStyle = viz.colors.white;
                ctx.font = 'bold 16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(`𝔽${p} - Finite Field`, 280, 30);

                ctx.font = '12px Arial';
                ctx.fillStyle = viz.colors.text;
                ctx.fillText(isPrime ?
                    `Prime field (isomorphic to ℤ/${p}ℤ)` :
                    `Extension field 𝔽₂[x]/(x²+x+1)`, 280, 50);

                // Draw multiplication table
                const cellSize = Math.min(50, 300/n);
                const offsetX = 140;
                const offsetY = 100;

                // Labels
                ctx.font = '11px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                ctx.fillStyle = viz.colors.white;
                ctx.fillText('×', offsetX - 30, offsetY - 30);

                for (let i = 0; i < n; i++) {
                    ctx.fillStyle = viz.colors.blue;
                    ctx.fillText(elements[i], offsetX + i*cellSize + cellSize/2, offsetY - 20);
                    ctx.fillText(elements[i], offsetX - 20, offsetY + i*cellSize + cellSize/2);
                }

                // Table cells
                for (let i = 0; i < n; i++) {
                    for (let j = 0; j < n; j++) {
                        // Color based on result
                        let color = viz.colors.purple;
                        if (multTable[i][j] === 0) color = viz.colors.text;
                        else if (multTable[i][j] === 1) color = viz.colors.green;
                        else color = viz.colors.teal;

                        ctx.fillStyle = color + '33';
                        ctx.fillRect(offsetX + j*cellSize, offsetY + i*cellSize, cellSize, cellSize);

                        ctx.strokeStyle = viz.colors.white + '44';
                        ctx.lineWidth = 1;
                        ctx.strokeRect(offsetX + j*cellSize, offsetY + i*cellSize, cellSize, cellSize);

                        ctx.fillStyle = viz.colors.white;
                        ctx.fillText(elements[multTable[i][j]],
                            offsetX + j*cellSize + cellSize/2,
                            offsetY + i*cellSize + cellSize/2);
                    }
                }

                // Properties
                const propsY = offsetY + n*cellSize + 40;
                ctx.fillStyle = viz.colors.white;
                ctx.font = 'bold 12px Arial';
                ctx.textAlign = 'left';
                ctx.fillText('Wedderburn\'s Theorem (1905):', 50, propsY);

                ctx.font = '11px monospace';
                ctx.fillStyle = viz.colors.yellow;
                const lines = [
                    'Every finite division algebra is commutative,',
                    'hence is a field.',
                    '',
                    'All finite fields have order p^n for prime p.',
                    '𝔽_q ≅ 𝔽_p[x]/(f(x)) where f irreducible of degree n.'
                ];

                lines.forEach((line, i) => {
                    ctx.fillText(line, 50, propsY + 25 + i*15);
                });

                // Check commutativity
                let isCommutative = true;
                for (let i = 0; i < n; i++) {
                    for (let j = 0; j < n; j++) {
                        if (multTable[i][j] !== multTable[j][i]) {
                            isCommutative = false;
                            break;
                        }
                    }
                }

                infoDiv.innerHTML =
                    `<span style="color: ${viz.colors.green}">✓ Commutative:</span> ab = ba for all a,b ∈ 𝔽${p}<br>` +
                    `<span style="color: ${viz.colors.green}">✓ Division algebra:</span> Every nonzero element has inverse<br>` +
                    `<span style="color: ${viz.colors.teal}">⇒ 𝔽${p} is a field</span><br>` +
                    `<br>Size: |𝔽${p}| = ${n} = ${isPrime ? p : `2²`}<br>` +
                    `Characteristic: char(𝔽${p}) = ${p === 4 ? 2 : p}`;
            }

            fieldSelect.addEventListener('change', draw);
            draw();
            return viz;
        }
    }
];
