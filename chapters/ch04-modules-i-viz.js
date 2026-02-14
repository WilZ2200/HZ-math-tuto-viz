// Chapter 4: Modules I - Extra Interactive Visualizations
window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch04'] = window.EXTRA_VIZ['ch04'] || {};

// Section: Basic Module Properties
window.EXTRA_VIZ['ch04']['ch04-sec01'] = [
    {
        id: 'ch04-extra-viz-1',
        title: 'Interactive: Z-Module Structure',
        description: 'Explore the integers as a module over themselves. See how scalar multiplication by integers generates the cyclic submodules nZ.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, { width: 560, height: 400, scale: 30 });

            let n = 3;
            let maxElements = 15;

            VizEngine.createSlider(controls, 'Generator n:', 1, 10, n, 1, (value) => {
                n = value;
                draw();
            });

            VizEngine.createButton(controls, 'Reset View', () => {
                n = 3;
                controls.querySelector('input[type="range"]').value = 3;
                draw();
            });

            function draw() {
                viz.clear();

                // Draw number line
                viz.drawLine(-10, 0, 10, 0, viz.colors.text + '44', 1);

                // Draw all integers (faded)
                for (let i = -maxElements; i <= maxElements; i++) {
                    viz.drawPoint(i, 0, viz.colors.text + '22', null, 2);
                }

                // Draw the cyclic submodule nZ
                const submodule = [];
                for (let k = -Math.floor(maxElements/n); k <= Math.floor(maxElements/n); k++) {
                    const element = k * n;
                    if (Math.abs(element) <= maxElements) {
                        submodule.push(element);
                    }
                }

                // Highlight submodule elements
                submodule.forEach((element, idx) => {
                    viz.drawPoint(element, 0, viz.colors.blue, null, 5);
                    viz.drawText(`${element}`, element, -0.8, viz.colors.blue, 12);
                });

                // Draw generator
                viz.drawPoint(n, 0, viz.colors.orange, null, 7);
                viz.drawVector(0, 1.5, n, 1.5, viz.colors.orange, 'n', 2);
                viz.drawText(`Generator: ${n}`, 0, 2.5, viz.colors.orange, 14);

                // Show cyclic submodule notation
                viz.drawText(`⟨⟨${n}⟩⟩ = ${n}ℤ = {..., ${-2*n}, ${-n}, 0, ${n}, ${2*n}, ...}`,
                    0, -2.5, viz.colors.teal, 13);

                // Show closure under addition
                if (submodule.length >= 3) {
                    const a = submodule[Math.floor(submodule.length/2) - 1];
                    const b = submodule[Math.floor(submodule.length/2) + 1];
                    if (Math.abs(a + b) <= maxElements) {
                        viz.drawSegment(a, 0.5, b, 0.5, viz.colors.green, 2);
                        viz.drawText(`${a} + ${b} = ${a+b}`, (a+b)/2, 1.2, viz.colors.green, 11);
                    }
                }
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch04-extra-viz-2',
        title: 'Interactive: Torsion Elements in Z/nZ',
        description: 'Visualize torsion elements in Z/nZ. Every element x satisfies nx = 0, making the entire module a torsion module.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, { width: 560, height: 400, scale: 60 });

            let n = 6;
            let selectedElement = 1;
            let multiplier = 1;

            VizEngine.createSlider(controls, 'Modulus n:', 3, 12, n, 1, (value) => {
                n = value;
                selectedElement = Math.min(selectedElement, n - 1);
                multiplier = 1;
                controls.querySelectorAll('input[type="range"]')[1].max = n - 1;
                controls.querySelectorAll('input[type="range"]')[1].value = selectedElement;
                controls.querySelectorAll('input[type="range"]')[2].value = 1;
                draw();
            });

            VizEngine.createSlider(controls, 'Element x:', 0, n - 1, selectedElement, 1, (value) => {
                selectedElement = value;
                multiplier = 1;
                controls.querySelectorAll('input[type="range"]')[2].value = 1;
                draw();
            });

            VizEngine.createSlider(controls, 'Multiplier k:', 1, 20, multiplier, 1, (value) => {
                multiplier = value;
                draw();
            });

            function draw() {
                viz.clear();

                const radius = 3;
                const angleStep = (2 * Math.PI) / n;

                // Draw circle representing Z/nZ
                viz.drawCircle(0, 0, radius, null, viz.colors.text + '44', 2);

                // Draw all elements as points on circle
                for (let i = 0; i < n; i++) {
                    const angle = -Math.PI/2 + i * angleStep; // Start at top
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);

                    const color = (i === selectedElement) ? viz.colors.orange : viz.colors.text + '66';
                    const size = (i === selectedElement) ? 6 : 4;

                    viz.drawPoint(x, y, color, null, size);

                    // Label
                    const labelDist = radius + 0.6;
                    const labelX = labelDist * Math.cos(angle);
                    const labelY = labelDist * Math.sin(angle);
                    viz.drawText(`${i}`, labelX, labelY, color, 13);
                }

                // Show multiplication: k * x mod n
                const result = (multiplier * selectedElement) % n;
                const startAngle = -Math.PI/2 + selectedElement * angleStep;
                const endAngle = -Math.PI/2 + result * angleStep;

                // Draw arc showing multiplication
                const steps = Math.abs(multiplier * selectedElement);
                for (let i = 0; i < Math.min(steps, n * 3); i++) {
                    const currentVal = (selectedElement * (i + 1)) % n;
                    const nextVal = (selectedElement * (i + 2)) % n;
                    const angle1 = -Math.PI/2 + currentVal * angleStep;
                    const angle2 = -Math.PI/2 + nextVal * angleStep;
                    const innerRadius = radius - 0.5;

                    const x1 = innerRadius * Math.cos(angle1);
                    const y1 = innerRadius * Math.sin(angle1);
                    const x2 = innerRadius * Math.cos(angle2);
                    const y2 = innerRadius * Math.sin(angle2);

                    const alpha = Math.floor(255 * (1 - i / Math.min(steps, n * 3))).toString(16).padStart(2, '0');
                    viz.drawSegment(x1, y1, x2, y2, viz.colors.blue + alpha, 2);
                }

                // Highlight result
                const resultAngle = -Math.PI/2 + result * angleStep;
                const resultX = radius * Math.cos(resultAngle);
                const resultY = radius * Math.sin(resultAngle);
                viz.drawPoint(resultX, resultY, viz.colors.green, null, 7);

                // Show equation
                viz.drawText(`ℤ/${n}ℤ Module`, 0, -4.5, viz.colors.white, 16, 'center');
                viz.drawText(`${multiplier} · ${selectedElement} = ${result} (mod ${n})`,
                    0, 4, viz.colors.blue, 14, 'center');

                // Check if torsion
                if (result === 0 && selectedElement !== 0) {
                    viz.drawText(`Torsion! ${multiplier} · ${selectedElement} = 0`,
                        0, 4.7, viz.colors.red, 13, 'center', 'middle');
                    viz.drawText(`ann(${selectedElement}) contains ${multiplier}`,
                        0, 5.4, viz.colors.orange, 12, 'center', 'middle');
                }

                // Note: every element is torsion
                viz.drawText(`Every element x ∈ ℤ/${n}ℤ satisfies ${n}·x = 0`,
                    0, -5.2, viz.colors.teal, 11, 'center');
            }

            draw();
            return viz;
        }
    }
];

// Section: Submodules and Quotients
window.EXTRA_VIZ['ch04']['ch04-sec02'] = [
    {
        id: 'ch04-extra-viz-3',
        title: 'Interactive: Submodule Lattice of Z',
        description: 'Explore the lattice of submodules of Z. Each submodule is of the form nZ, and they form a divisibility lattice.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, { width: 560, height: 400, scale: 40 });

            let selectedN = 6;

            VizEngine.createSlider(controls, 'Focus on nZ, n =', 1, 12, selectedN, 1, (value) => {
                selectedN = value;
                draw();
            });

            VizEngine.createButton(controls, 'Show Divisors', () => {
                selectedN = 12;
                controls.querySelector('input[type="range"]').value = 12;
                draw();
            });

            function getDivisors(n) {
                const divisors = [];
                for (let i = 1; i <= n; i++) {
                    if (n % i === 0) {
                        divisors.push(i);
                    }
                }
                return divisors;
            }

            function draw() {
                viz.clear();

                const divisors = getDivisors(selectedN);
                const levels = divisors.length;
                const ySpacing = 7 / levels;

                // Position for each divisor
                const positions = {};
                divisors.forEach((d, idx) => {
                    positions[d] = {
                        x: 0,
                        y: 3 - idx * ySpacing
                    };
                });

                // Draw containment edges (d1Z ⊆ d2Z iff d2 | d1)
                for (let i = 0; i < divisors.length; i++) {
                    for (let j = i + 1; j < divisors.length; j++) {
                        const d1 = divisors[i];
                        const d2 = divisors[j];

                        // d1Z ⊆ d2Z iff d2 divides d1
                        if (d1 % d2 === 0) {
                            // Check if this is a direct covering relation
                            let isCover = true;
                            for (let k = i + 1; k < j; k++) {
                                const d3 = divisors[k];
                                if (d1 % d3 === 0 && d3 % d2 === 0) {
                                    isCover = false;
                                    break;
                                }
                            }

                            if (isCover) {
                                viz.drawSegment(
                                    positions[d1].x, positions[d1].y,
                                    positions[d2].x, positions[d2].y,
                                    viz.colors.teal + '88', 2
                                );
                            }
                        }
                    }
                }

                // Draw nodes
                divisors.forEach((d, idx) => {
                    const pos = positions[d];
                    const color = (d === selectedN) ? viz.colors.orange :
                                 (d === 1) ? viz.colors.green : viz.colors.blue;

                    viz.drawPoint(pos.x, pos.y, color, null, 8);
                    viz.drawText(`${d}ℤ`, pos.x + 0.8, pos.y, color, 13);

                    // Show index if not top
                    if (idx > 0) {
                        const parent = divisors[idx - 1];
                        if (parent % d === 0) {
                            const index = parent / d;
                            viz.drawText(`[${index}]`, pos.x - 1.2, pos.y - 0.5, viz.colors.text, 10);
                        }
                    }
                });

                // Labels
                viz.drawText('Submodule Lattice of ℤ', 0, -4.5, viz.colors.white, 15, 'center');
                viz.drawText(`Divisors of ${selectedN}: ${divisors.join(', ')}`,
                    0, 4.5, viz.colors.teal, 12, 'center');
                viz.drawText('Smaller → Larger (d₁ℤ ⊆ d₂ℤ iff d₂|d₁)',
                    0, 5.2, viz.colors.text, 11, 'center');

                // Show specific containment
                if (divisors.length > 1) {
                    const top = divisors[0];
                    const bottom = divisors[divisors.length - 1];
                    viz.drawText(`${top}ℤ ⊆ ${selectedN}ℤ ⊆ ${bottom}ℤ ⊆ ℤ`,
                        0, -5.2, viz.colors.blue, 12, 'center');
                }
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch04-extra-viz-4',
        title: 'Interactive: Quotient Module Z/nZ Visualization',
        description: 'See how cosets partition Z into equivalence classes. Drag to explore different coset representatives.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, { width: 560, height: 400, scale: 35 });

            let n = 5;
            let representative = 0;

            VizEngine.createSlider(controls, 'Modulus n:', 2, 10, n, 1, (value) => {
                n = value;
                representative = 0;
                draw();
            });

            VizEngine.createSlider(controls, 'Representative:', -15, 15, representative, 1, (value) => {
                representative = value;
                draw();
            });

            function draw() {
                viz.clear();

                // Draw number line
                viz.drawLine(-12, 0, 12, 0, viz.colors.text + '44', 1);

                // Draw all integers (faded)
                for (let i = -12; i <= 12; i++) {
                    viz.drawPoint(i, 0, viz.colors.text + '22', null, 2);
                    viz.drawText(`${i}`, i, -0.6, viz.colors.text + '66', 9);
                }

                // Calculate which coset the representative belongs to
                const cosetClass = ((representative % n) + n) % n;

                // Highlight all elements in the same coset
                for (let i = -12; i <= 12; i++) {
                    if (((i % n) + n) % n === cosetClass) {
                        viz.drawPoint(i, 0, viz.colors.blue, null, 5);
                    }
                }

                // Highlight the selected representative
                if (Math.abs(representative) <= 12) {
                    viz.drawPoint(representative, 0, viz.colors.orange, null, 7);
                    viz.drawText('Rep', representative, 1, viz.colors.orange, 12);
                }

                // Draw coset notation
                viz.drawText(`ℤ/${n}ℤ: Quotient Module`, 0, 3, viz.colors.white, 15, 'center');
                viz.drawText(`Coset: ${representative} + ${n}ℤ = {..., ${representative-2*n}, ${representative-n}, ${representative}, ${representative+n}, ${representative+2*n}, ...}`,
                    0, 2, viz.colors.blue, 11, 'center');
                viz.drawText(`Equivalence class: [${cosetClass}] in ℤ/${n}ℤ`,
                    0, -2.5, viz.colors.teal, 13, 'center');

                // Show the n cosets
                let cosetInfo = 'All cosets: ';
                for (let i = 0; i < n; i++) {
                    cosetInfo += `[${i}]`;
                    if (i < n - 1) cosetInfo += ', ';
                }
                viz.drawText(cosetInfo, 0, -3.5, viz.colors.text, 11, 'center');

                // Show module structure
                viz.drawText(`${n} cosets partition ℤ`, 0, -4.5, viz.colors.green, 12, 'center');
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch04-extra-viz-5',
        title: 'Interactive: Cyclic Module Generator',
        description: 'Visualize how a single element generates a cyclic submodule ⟨⟨x⟩⟩ = Rx = {rx | r ∈ R}.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, { width: 560, height: 400, scale: 45 });

            let generatorX = 1.5;
            let generatorY = 1;
            let scalar = 2;

            const generator = viz.addDraggable('gen', generatorX, generatorY, viz.colors.orange, 8, () => draw());

            VizEngine.createSlider(controls, 'Scalar multiplier r:', -5, 5, scalar, 0.5, (value) => {
                scalar = value;
                draw();
            });

            VizEngine.createButton(controls, 'Animate', () => {
                let t = 0;
                const animation = viz.animate((timestamp) => {
                    t += 0.02;
                    scalar = 3 * Math.sin(t);
                    controls.querySelector('input[type="range"]').value = scalar;
                    draw();
                    if (t > 4 * Math.PI) {
                        viz.stopAnimation();
                    }
                });
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw generator
                viz.drawVector(0, 0, generator.x, generator.y, viz.colors.orange, 'x', 3);

                // Draw cyclic submodule - all integer multiples
                for (let r = -4; r <= 4; r++) {
                    if (r === 0) continue;
                    const x = r * generator.x;
                    const y = r * generator.y;

                    if (Math.abs(x) <= 6 && Math.abs(y) <= 5) {
                        viz.drawPoint(x, y, viz.colors.blue + '66', null, 4);

                        if (r === Math.round(scalar) || r === Math.round(scalar) + 1 || r === Math.round(scalar) - 1) {
                            viz.drawVector(0, 0, x, y, viz.colors.blue + '44', `${r}x`, 1.5, true);
                        }
                    }
                }

                // Draw current scalar multiple
                const currentX = scalar * generator.x;
                const currentY = scalar * generator.y;

                if (Math.abs(currentX) <= 6 && Math.abs(currentY) <= 5) {
                    viz.drawVector(0, 0, currentX, currentY, viz.colors.green, `${scalar.toFixed(1)}x`, 2.5);
                    viz.drawPoint(currentX, currentY, viz.colors.green, null, 6);
                }

                // Draw the line through origin and generator (span in R-module context)
                const extension = 10;
                const dx = generator.x;
                const dy = generator.y;
                const length = Math.sqrt(dx * dx + dy * dy);
                const unitX = dx / length;
                const unitY = dy / length;

                viz.drawSegment(
                    -extension * unitX, -extension * unitY,
                    extension * unitX, extension * unitY,
                    viz.colors.teal + '33', 2, true
                );

                viz.drawDraggables();

                // Labels
                viz.drawText('Cyclic Submodule ⟨⟨x⟩⟩ = Rx', 0, -5.5, viz.colors.white, 14, 'center');
                viz.drawText(`x = (${generator.x.toFixed(2)}, ${generator.y.toFixed(2)})`,
                    -5, 5, viz.colors.orange, 12);
                viz.drawText(`Blue dots: integer multiples (if R = ℤ)`,
                    -5, 4.3, viz.colors.blue, 11);
                viz.drawText(`Green: r·x where r = ${scalar.toFixed(1)}`,
                    -5, 3.6, viz.colors.green, 11);
            }

            draw();
            return viz;
        }
    }
];

// Section: Direct Sums and Free Modules
window.EXTRA_VIZ['ch04']['ch04-sec03'] = [
    {
        id: 'ch04-extra-viz-6',
        title: 'Interactive: Direct Sum vs Direct Product',
        description: 'Compare external direct sum M₁ ⊕ M₂ with direct product. For finite collections, they coincide.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, { width: 560, height: 400, scale: 50 });

            let m1_x = 2, m1_y = 0.5;
            let m2_x = 0, m2_y = 1.5;
            let a = 2, b = 1;

            const module1 = viz.addDraggable('m1', m1_x, m1_y, viz.colors.blue, 7, () => draw());
            const module2 = viz.addDraggable('m2', m2_x, m2_y, viz.colors.orange, 7, () => draw());

            VizEngine.createSlider(controls, 'Coefficient a:', -3, 3, a, 0.5, (value) => {
                a = value;
                draw();
            });

            VizEngine.createSlider(controls, 'Coefficient b:', -3, 3, b, 0.5, (value) => {
                b = value;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw M₁ basis element
                viz.drawVector(0, 0, module1.x, module1.y, viz.colors.blue, 'm₁', 2.5);

                // Draw M₂ basis element
                viz.drawVector(0, 0, module2.x, module2.y, viz.colors.orange, 'm₂', 2.5);

                // Draw some elements from M₁ (multiples of m₁)
                for (let k = -2; k <= 2; k++) {
                    if (k === 0) continue;
                    const x = k * module1.x;
                    const y = k * module1.y;
                    if (Math.abs(x) <= 5 && Math.abs(y) <= 4) {
                        viz.drawPoint(x, y, viz.colors.blue + '44', null, 3);
                    }
                }

                // Draw some elements from M₂ (multiples of m₂)
                for (let k = -2; k <= 2; k++) {
                    if (k === 0) continue;
                    const x = k * module2.x;
                    const y = k * module2.y;
                    if (Math.abs(x) <= 5 && Math.abs(y) <= 4) {
                        viz.drawPoint(x, y, viz.colors.orange + '44', null, 3);
                    }
                }

                // Draw direct sum: a·m₁ + b·m₂
                const sum_x = a * module1.x + b * module2.x;
                const sum_y = a * module1.y + b * module2.y;

                // Show decomposition visually
                viz.drawVector(0, 0, a * module1.x, a * module1.y, viz.colors.blue + 'AA', `a·m₁`, 1.5, true);
                viz.drawVector(a * module1.x, a * module1.y, sum_x, sum_y, viz.colors.orange + 'AA', `b·m₂`, 1.5);

                // Draw result
                viz.drawVector(0, 0, sum_x, sum_y, viz.colors.green, '(a·m₁, b·m₂)', 3);
                viz.drawPoint(sum_x, sum_y, viz.colors.green, null, 7);

                // Draw grid of direct sum elements
                for (let i = -2; i <= 2; i++) {
                    for (let j = -2; j <= 2; j++) {
                        if (i === 0 && j === 0) continue;
                        const x = i * module1.x + j * module2.x;
                        const y = i * module1.y + j * module2.y;
                        if (Math.abs(x) <= 5 && Math.abs(y) <= 4) {
                            viz.drawPoint(x, y, viz.colors.teal + '33', null, 2);
                        }
                    }
                }

                viz.drawDraggables();

                // Labels
                viz.drawText('Direct Sum M₁ ⊕ M₂', 0, -4.8, viz.colors.white, 15, 'center');
                viz.drawText(`Element: (${a.toFixed(1)}·m₁, ${b.toFixed(1)}·m₂)`,
                    -4.5, 4.2, viz.colors.green, 12);
                viz.drawText('Componentwise operations: (x₁,y₁)+(x₂,y₂)=(x₁+x₂, y₁+y₂)',
                    0, -5.6, viz.colors.text, 10, 'center');
                viz.drawText('Teal dots: lattice of direct sum elements',
                    -4.5, 3.5, viz.colors.teal, 10);
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch04-extra-viz-7',
        title: 'Interactive: Complemented Submodules',
        description: 'Explore when a submodule N has a complement C such that M = N ⊕ C. Not all submodules are complemented!',
        setup: function(container, controls) {
            const viz = new VizEngine(container, { width: 560, height: 400, scale: 45 });

            let n_x = 2.5, n_y = 0;
            let c_x = 0, c_y = 2;
            let testX = 3, testY = 1.5;

            const submoduleN = viz.addDraggable('n', n_x, n_y, viz.colors.blue, 7, () => draw());
            const complementC = viz.addDraggable('c', c_x, c_y, viz.colors.orange, 7, () => draw());
            const testPoint = viz.addDraggable('test', testX, testY, viz.colors.green, 6, () => draw());

            VizEngine.createButton(controls, 'Orthogonal Example', () => {
                submoduleN.x = 2.5;
                submoduleN.y = 0;
                complementC.x = 0;
                complementC.y = 2;
                draw();
            });

            VizEngine.createButton(controls, 'Non-trivial Example', () => {
                submoduleN.x = 2;
                submoduleN.y = 1;
                complementC.x = -1;
                complementC.y = 2;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw submodule N (line through origin)
                const nLen = Math.sqrt(submoduleN.x * submoduleN.x + submoduleN.y * submoduleN.y);
                const nUnitX = submoduleN.x / nLen;
                const nUnitY = submoduleN.y / nLen;
                viz.drawSegment(-10 * nUnitX, -10 * nUnitY, 10 * nUnitX, 10 * nUnitY,
                    viz.colors.blue + '44', 2, true);

                // Draw complement C (line through origin)
                const cLen = Math.sqrt(complementC.x * complementC.x + complementC.y * complementC.y);
                const cUnitX = complementC.x / cLen;
                const cUnitY = complementC.y / cLen;
                viz.drawSegment(-10 * cUnitX, -10 * cUnitY, 10 * cUnitX, 10 * cUnitY,
                    viz.colors.orange + '44', 2, true);

                // Check if N and C intersect only at origin (direct sum condition)
                const dotProduct = submoduleN.x * complementC.x + submoduleN.y * complementC.y;
                const crossProduct = submoduleN.x * complementC.y - submoduleN.y * complementC.x;
                const isDirectSum = Math.abs(crossProduct) > 0.1; // Not parallel

                // Try to decompose test point as n + c
                if (isDirectSum) {
                    // Solve: testX = a*n_x + b*c_x, testY = a*n_y + b*c_y
                    const det = submoduleN.x * complementC.y - submoduleN.y * complementC.x;
                    const a = (testPoint.x * complementC.y - testPoint.y * complementC.x) / det;
                    const b = (submoduleN.x * testPoint.y - submoduleN.y * testPoint.x) / det;

                    const n_component_x = a * submoduleN.x;
                    const n_component_y = a * submoduleN.y;
                    const c_component_x = b * complementC.x;
                    const c_component_y = b * complementC.y;

                    // Draw decomposition
                    viz.drawVector(0, 0, n_component_x, n_component_y, viz.colors.blue, 'n', 2);
                    viz.drawVector(n_component_x, n_component_y,
                        n_component_x + c_component_x, n_component_y + c_component_y,
                        viz.colors.orange, 'c', 2);

                    viz.drawPoint(n_component_x, n_component_y, viz.colors.blue, null, 5);
                    viz.drawPoint(n_component_x + c_component_x, n_component_y + c_component_y,
                        viz.colors.green, null, 6);

                    viz.drawText(`Decomposition: (${testPoint.x.toFixed(1)}, ${testPoint.y.toFixed(1)}) = n + c`,
                        0, 5.2, viz.colors.green, 12, 'center');
                    viz.drawText(`where n = ${a.toFixed(2)}·n₀, c = ${b.toFixed(2)}·c₀`,
                        0, 4.5, viz.colors.text, 11, 'center');
                }

                // Draw basis vectors
                viz.drawVector(0, 0, submoduleN.x, submoduleN.y, viz.colors.blue, 'n₀', 3);
                viz.drawVector(0, 0, complementC.x, complementC.y, viz.colors.orange, 'c₀', 3);

                viz.drawDraggables();

                // Status
                viz.drawText('Complemented Submodules', 0, -5.5, viz.colors.white, 15, 'center');

                if (isDirectSum) {
                    viz.drawText('✓ Direct sum: M = N ⊕ C (N ∩ C = {0})',
                        0, -4.8, viz.colors.green, 13, 'center');
                } else {
                    viz.drawText('✗ Not a direct sum (N and C are parallel)',
                        0, -4.8, viz.colors.red, 13, 'center');
                }

                viz.drawText('Drag blue (N) and orange (C) to explore complements',
                    0, -4.1, viz.colors.text, 10, 'center');
            }

            draw();
            return viz;
        }
    }
];

// Section: Homomorphisms and Isomorphisms
window.EXTRA_VIZ['ch04']['ch04-sec04'] = [
    {
        id: 'ch04-extra-viz-8',
        title: 'Interactive: First Isomorphism Theorem',
        description: 'Visualize M/ker(φ) ≅ im(φ). See how the quotient map factors through the image.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, { width: 560, height: 400, scale: 50 });

            let matrix_a = 1, matrix_b = 0.5;
            let matrix_c = 0, matrix_d = 0; // This makes it non-injective

            VizEngine.createSlider(controls, 'φ: (x,y) → (ax+by, cx+dy), a =', -2, 2, matrix_a, 0.1, (value) => {
                matrix_a = value;
                draw();
            });

            VizEngine.createSlider(controls, 'b =', -2, 2, matrix_b, 0.1, (value) => {
                matrix_b = value;
                draw();
            });

            VizEngine.createSlider(controls, 'c =', -2, 2, matrix_c, 0.1, (value) => {
                matrix_c = value;
                draw();
            });

            VizEngine.createSlider(controls, 'd =', -2, 2, matrix_d, 0.1, (value) => {
                matrix_d = value;
                draw();
            });

            VizEngine.createButton(controls, 'Projection Example', () => {
                matrix_a = 1;
                matrix_b = 0;
                matrix_c = 0;
                matrix_d = 0;
                controls.querySelectorAll('input[type="range"]').forEach((slider, idx) => {
                    slider.value = [1, 0, 0, 0][idx];
                });
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                const matrix = [[matrix_a, matrix_b], [matrix_c, matrix_d]];

                // Find kernel: vectors (x, y) such that φ(x, y) = (0, 0)
                // ax + by = 0 and cx + dy = 0
                const det = matrix_a * matrix_d - matrix_b * matrix_c;

                let kernelDir = null;
                if (Math.abs(det) < 0.01) {
                    // Non-trivial kernel
                    if (Math.abs(matrix_a) > 0.01 || Math.abs(matrix_b) > 0.01) {
                        // Kernel is the line perpendicular to (a, b)
                        kernelDir = {x: -matrix_b, y: matrix_a};
                        const len = Math.sqrt(kernelDir.x * kernelDir.x + kernelDir.y * kernelDir.y);
                        if (len > 0.01) {
                            kernelDir.x /= len;
                            kernelDir.y /= len;

                            // Draw kernel
                            viz.drawSegment(-5 * kernelDir.x, -5 * kernelDir.y,
                                5 * kernelDir.x, 5 * kernelDir.y,
                                viz.colors.red, 3);
                            viz.drawText('ker(φ)', 2.5 * kernelDir.x, 2.5 * kernelDir.y,
                                viz.colors.red, 13);
                        }
                    }
                }

                // Draw image: range of φ
                // Image is spanned by φ(e₁) and φ(e₂)
                const img1 = {x: matrix_a, y: matrix_c};
                const img2 = {x: matrix_b, y: matrix_d};

                if (Math.abs(det) > 0.01) {
                    // Full rank - image is 2D
                    viz.drawText('im(φ) = ℝ²', 0, -4.5, viz.colors.green, 13, 'center');
                } else {
                    // Image is 1D
                    let imgDir = null;
                    if (Math.abs(img1.x) + Math.abs(img1.y) > 0.01) {
                        imgDir = img1;
                    } else if (Math.abs(img2.x) + Math.abs(img2.y) > 0.01) {
                        imgDir = img2;
                    }

                    if (imgDir) {
                        const len = Math.sqrt(imgDir.x * imgDir.x + imgDir.y * imgDir.y);
                        imgDir.x /= len;
                        imgDir.y /= len;

                        viz.drawSegment(-5 * imgDir.x, -5 * imgDir.y,
                            5 * imgDir.x, 5 * imgDir.y,
                            viz.colors.green + '88', 2, true);
                        viz.drawText('im(φ)', -2.5 * imgDir.x, -2.5 * imgDir.y,
                            viz.colors.green, 13);
                    }
                }

                // Draw some cosets of ker(φ)
                if (kernelDir) {
                    for (let t = -2; t <= 2; t += 1) {
                        if (t === 0) continue;
                        const offset = {x: t * 1.5, y: 0};
                        // Make sure offset is not in kernel direction
                        if (Math.abs(offset.x * kernelDir.y - offset.y * kernelDir.x) > 0.1) {
                            viz.drawSegment(
                                offset.x - 3 * kernelDir.x, offset.y - 3 * kernelDir.y,
                                offset.x + 3 * kernelDir.x, offset.y + 3 * kernelDir.y,
                                viz.colors.blue + '44', 1, true
                            );
                        }
                    }
                }

                // Draw a test vector and its image
                const test = {x: 2, y: 1};
                const image = VizEngine.matVec(matrix, [test.x, test.y]);

                viz.drawVector(0, 0, test.x, test.y, viz.colors.blue, 'v', 2);
                viz.drawVector(0, 0, image[0], image[1], viz.colors.orange, 'φ(v)', 2.5);

                // Show quotient structure
                viz.drawText('First Isomorphism Theorem', 0, 5.2, viz.colors.white, 14, 'center');
                viz.drawText('M/ker(φ) ≅ im(φ)', 0, 4.5, viz.colors.teal, 14, 'center');

                if (kernelDir) {
                    viz.drawText('Cosets of ker(φ) (parallel lines) → points in im(φ)',
                        0, -5.2, viz.colors.text, 11, 'center');
                } else {
                    viz.drawText('φ is injective (trivial kernel)',
                        0, -5.2, viz.colors.green, 12, 'center');
                }
            }

            draw();
            return viz;
        }
    }
];

console.log('Chapter 4 Extra Visualizations loaded:', Object.keys(window.EXTRA_VIZ['ch04']).length, 'sections');
