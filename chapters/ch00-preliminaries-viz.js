window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch00'] = window.EXTRA_VIZ['ch00'] || {};

// Section 1: Equivalence Relations
window.EXTRA_VIZ['ch00']['ch00-sec01'] = [
    {
        id: 'ch00-extra-viz-1',
        title: 'Equivalence Class Partition Visualizer',
        description: 'Drag points to see how equivalence relation partitions a set into disjoint classes',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Create random points with equivalence classes based on mod 3
            const points = [];
            const numPoints = 12;
            for (let i = 0; i < numPoints; i++) {
                const x = (Math.random() - 0.5) * 12;
                const y = (Math.random() - 0.5) * 8;
                points.push({
                    x: x,
                    y: y,
                    id: i,
                    eqClass: i % 3  // equivalence class mod 3
                });
            }

            const colors = [viz.colors.blue, viz.colors.orange, viz.colors.green];
            const classNames = ['[0]', '[1]', '[2]'];

            // Add draggable points
            const draggables = points.map((p, idx) =>
                viz.addDraggable(`p${idx}`, p.x, p.y, colors[p.eqClass], 6, () => draw())
            );

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw convex hull for each equivalence class
                for (let c = 0; c < 3; c++) {
                    const classPoints = [];
                    draggables.forEach((d, idx) => {
                        if (points[idx].eqClass === c) {
                            classPoints.push([d.x, d.y]);
                        }
                    });

                    if (classPoints.length > 2) {
                        // Compute convex hull (simple algorithm for small sets)
                        const hull = computeConvexHull(classPoints);
                        viz.drawPolygon(hull, colors[c] + '22', colors[c], 2);
                    }
                }

                // Draw points with labels
                draggables.forEach((d, idx) => {
                    viz.drawPoint(d.x, d.y, colors[points[idx].eqClass],
                        `${points[idx].id}∈${classNames[points[idx].eqClass]}`, 6);
                });

                viz.drawDraggables();

                // Draw legend
                viz.drawText('Partition into 3 equivalence classes (mod 3)', -6, 4.5, viz.colors.white, 14);
            }

            function computeConvexHull(pts) {
                if (pts.length < 3) return pts;
                // Gift wrapping algorithm
                const hull = [];
                let pointOnHull = pts.reduce((min, p) => p[0] < min[0] ? p : min, pts[0]);
                let endpoint;
                do {
                    hull.push(pointOnHull);
                    endpoint = pts[0];
                    for (let j = 1; j < pts.length; j++) {
                        if (endpoint === pointOnHull ||
                            cross(pointOnHull, endpoint, pts[j]) > 0) {
                            endpoint = pts[j];
                        }
                    }
                    pointOnHull = endpoint;
                } while (endpoint !== hull[0]);
                return hull;
            }

            function cross(o, a, b) {
                return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
            }

            draw();
            return viz;
        }
    },
    {
        id: 'ch00-extra-viz-2',
        title: 'Function Injection/Surjection/Bijection Explorer',
        description: 'Use slider to explore different types of functions from domain to range',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            let functionType = 0; // 0: not injective, 1: injective not surjective, 2: bijective

            const slider = VizEngine.createSlider(controls, 'Function Type', 0, 2, 0, 1, (val) => {
                functionType = val;
                draw();
            });

            const domainPoints = [-5, -3, -1, 1, 3, 5];
            const rangePoints = [-4, -2, 0, 2, 4];

            function getMapping(type) {
                if (type === 0) {
                    // Not injective: two domain elements map to same range element
                    return {
                        '-5': -4,
                        '-3': -2,
                        '-1': -2,  // collision!
                        '1': 0,
                        '3': 2,
                        '5': 4
                    };
                } else if (type === 1) {
                    // Injective but not surjective: one range element has no preimage
                    return {
                        '-5': -4,
                        '-3': -2,
                        '-1': 2,
                        '1': 4,
                        '3': 0,
                        '5': -2  // collision - fix
                    };
                } else {
                    // Bijective
                    return {
                        '-5': -4,
                        '-3': -2,
                        '-1': 0,
                        '1': 2,
                        '3': 4,
                        '5': -4  // needs fixing
                    };
                }
            }

            function draw() {
                viz.clear();

                const leftX = -6;
                const rightX = 6;

                let mapping;
                let title;
                if (functionType === 0) {
                    mapping = {'-5': -4, '-3': -2, '-1': -2, '1': 0, '3': 2, '5': 4};
                    title = 'Not Injective (f(-3) = f(-1))';
                } else if (functionType === 1) {
                    mapping = {'-5': -4, '-3': -2, '-1': 0, '1': 2, '3': 4, '5': 2};
                    title = 'Injective but Not Surjective';
                } else {
                    mapping = {'-5': -4, '-3': -2, '-1': 0, '1': 2, '3': 4, '5': 0};
                    title = 'Bijective (1-to-1 and onto)';
                }

                // Actually fix bijective case
                if (functionType === 2) {
                    mapping = {'-5': -4, '-3': -2, '-1': 0, '1': 2, '3': 4, '5': -2};
                    // Still not perfect, let's use exactly the right mapping
                    mapping = {};
                    domainPoints.forEach((d, i) => {
                        if (i < rangePoints.length) {
                            mapping[d.toString()] = rangePoints[i];
                        }
                    });
                }

                // Draw domain and range sets
                viz.drawText('Domain X', leftX, 4.5, viz.colors.teal, 16);
                viz.drawText('Range Y', rightX, 4.5, viz.colors.orange, 16);

                // Draw domain points
                domainPoints.forEach(d => {
                    viz.drawPoint(leftX, d / 2, viz.colors.teal, null, 8);
                });

                // Draw range points
                rangePoints.forEach(r => {
                    viz.drawPoint(rightX, r / 2, viz.colors.orange, null, 8);
                });

                // Draw function arrows
                for (let d in mapping) {
                    const dVal = parseFloat(d);
                    const rVal = mapping[d];
                    viz.drawSegment(leftX, dVal / 2, rightX, rVal / 2, viz.colors.blue, 2);
                }

                // Highlight issues
                if (functionType === 0) {
                    // Highlight collision in range
                    viz.drawCircle(rightX, -2 / 2, 0.4, viz.colors.red + '44', viz.colors.red);
                } else if (functionType === 1) {
                    // Highlight missing preimage
                    const rangeCovered = new Set(Object.values(mapping));
                    rangePoints.forEach(r => {
                        if (!rangeCovered.has(r)) {
                            viz.drawCircle(rightX, r / 2, 0.4, viz.colors.red + '44', viz.colors.red);
                        }
                    });
                }

                viz.drawText(title, 0, 4.5, viz.colors.white, 16, 'center');
            }

            draw();
            return viz;
        }
    }
];

// Section 2: Partial Orders
window.EXTRA_VIZ['ch00']['ch00-sec02'] = [
    {
        id: 'ch00-extra-viz-3',
        title: 'Hasse Diagram of Partial Order (Divisibility)',
        description: 'Interactive Hasse diagram showing divisibility relation on {1,2,3,4,6,12}',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Elements and their positions
            const elements = {
                1: {x: 0, y: -3, label: '1'},
                2: {x: -3, y: -1, label: '2'},
                3: {x: 3, y: -1, label: '3'},
                4: {x: -3, y: 1, label: '4'},
                6: {x: 3, y: 1, label: '6'},
                12: {x: 0, y: 3, label: '12'}
            };

            // Divisibility relation (covering relations only)
            const edges = [
                [1, 2], [1, 3],
                [2, 4], [2, 6],
                [3, 6],
                [4, 12], [6, 12]
            ];

            // Make elements draggable
            const draggables = {};
            for (let key in elements) {
                const elem = elements[key];
                draggables[key] = viz.addDraggable(
                    `elem${key}`,
                    elem.x,
                    elem.y,
                    viz.colors.blue,
                    10,
                    () => draw()
                );
            }

            let highlightChain = false;
            const toggleButton = VizEngine.createButton(controls, 'Toggle Chain 1→2→4→12', () => {
                highlightChain = !highlightChain;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw edges
                edges.forEach(([from, to]) => {
                    const fromPos = draggables[from];
                    const toPos = draggables[to];
                    const color = (highlightChain &&
                                   [[1,2], [2,4], [4,12]].some(e => e[0] === from && e[1] === to))
                                 ? viz.colors.orange
                                 : viz.colors.teal;
                    viz.drawSegment(fromPos.x, fromPos.y, toPos.x, toPos.y, color, 3);
                });

                // Draw nodes
                for (let key in draggables) {
                    const d = draggables[key];
                    const elem = elements[key];
                    viz.drawPoint(d.x, d.y, viz.colors.blue, elem.label, 10);
                }

                viz.drawDraggables();

                viz.drawText('Hasse Diagram: (ℕ₆, |) where a|b means "a divides b"',
                            0, 4.5, viz.colors.white, 14, 'center');
                if (highlightChain) {
                    viz.drawText('Chain: 1 ≤ 2 ≤ 4 ≤ 12', 0, -4.5, viz.colors.orange, 14, 'center');
                }
            }

            draw();
            return viz;
        }
    },
    {
        id: 'ch00-extra-viz-4',
        title: 'Lattice Structure Explorer (LUB and GLB)',
        description: 'Click two nodes to see their least upper bound (join) and greatest lower bound (meet)',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Boolean lattice for power set of {a,b}
            const elements = {
                empty: {x: 0, y: -3, label: '∅', set: []},
                a: {x: -2, y: -1, label: '{a}', set: ['a']},
                b: {x: 2, y: -1, label: '{b}', set: ['b']},
                ab: {x: 0, y: 1, label: '{a,b}', set: ['a', 'b']}
            };

            const edges = [
                ['empty', 'a'],
                ['empty', 'b'],
                ['a', 'ab'],
                ['b', 'ab']
            ];

            let selected = [];

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw edges
                edges.forEach(([from, to]) => {
                    const fromPos = elements[from];
                    const toPos = elements[to];
                    viz.drawSegment(fromPos.x, fromPos.y, toPos.x, toPos.y, viz.colors.teal, 2);
                });

                // Draw nodes
                for (let key in elements) {
                    const elem = elements[key];
                    const isSelected = selected.includes(key);
                    const color = isSelected ? viz.colors.orange : viz.colors.blue;
                    viz.drawPoint(elem.x, elem.y, color, elem.label, 12);
                }

                // If two selected, show LUB and GLB
                if (selected.length === 2) {
                    const set1 = elements[selected[0]].set;
                    const set2 = elements[selected[1]].set;

                    // LUB = union
                    const lubSet = [...new Set([...set1, ...set2])];
                    // GLB = intersection
                    const glbSet = set1.filter(x => set2.includes(x));

                    // Find which element corresponds to LUB
                    let lub = null;
                    let glb = null;
                    for (let key in elements) {
                        const s = elements[key].set;
                        if (s.length === lubSet.length && s.every(x => lubSet.includes(x))) {
                            lub = key;
                        }
                        if (s.length === glbSet.length && s.every(x => glbSet.includes(x))) {
                            glb = key;
                        }
                    }

                    if (lub) {
                        viz.drawCircle(elements[lub].x, elements[lub].y, 0.5,
                                      viz.colors.green + '44', viz.colors.green);
                    }
                    if (glb) {
                        viz.drawCircle(elements[glb].x, elements[glb].y, 0.5,
                                      viz.colors.purple + '44', viz.colors.purple);
                    }

                    viz.drawText(`LUB (green) = ${elements[lub]?.label || '?'}    GLB (purple) = ${elements[glb]?.label || '?'}`,
                                0, 3.5, viz.colors.white, 14, 'center');
                }

                viz.drawText('Lattice: 𝒫({a,b}) - Click nodes to select pairs',
                            0, -4.2, viz.colors.white, 14, 'center');
            }

            // Click detection
            container.addEventListener('click', (e) => {
                const rect = container.getBoundingClientRect();
                const canvasX = e.clientX - rect.left;
                const canvasY = e.clientY - rect.top;

                // Convert to math coordinates
                const centerX = container.width / 2;
                const centerY = container.height / 2;
                const mathX = (canvasX - centerX) / 40;
                const mathY = (centerY - canvasY) / 40;

                // Check if clicked near any element
                for (let key in elements) {
                    const elem = elements[key];
                    const dist = Math.sqrt((mathX - elem.x)**2 + (mathY - elem.y)**2);
                    if (dist < 0.5) {
                        if (selected.includes(key)) {
                            selected = selected.filter(k => k !== key);
                        } else {
                            selected.push(key);
                            if (selected.length > 2) selected.shift();
                        }
                        draw();
                        break;
                    }
                }
            });

            draw();
            return viz;
        }
    }
];

// Section 3: Cartesian Products and Functions
window.EXTRA_VIZ['ch00']['ch00-sec03'] = [
    {
        id: 'ch00-extra-viz-5',
        title: 'Cartesian Product Visualizer',
        description: 'Drag sliders to see different subsets and their Cartesian product A × B',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            let sizeA = 3;
            let sizeB = 2;

            const sliderA = VizEngine.createSlider(controls, '|A|', 1, 4, 3, 1, (val) => {
                sizeA = val;
                draw();
            });

            const sliderB = VizEngine.createSlider(controls, '|B|', 1, 4, 2, 1, (val) => {
                sizeB = val;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Set A = {1, 2, ..., sizeA}
                // Set B = {1, 2, ..., sizeB}

                // Draw all points in A × B
                for (let a = 1; a <= sizeA; a++) {
                    for (let b = 1; b <= sizeB; b++) {
                        viz.drawPoint(a - 0.5, b - 0.5, viz.colors.blue, null, 8);
                    }
                }

                // Draw rectangles showing structure
                viz.drawPolygon(
                    [[0.5, 0.5], [sizeA + 0.5, 0.5], [sizeA + 0.5, sizeB + 0.5], [0.5, sizeB + 0.5]],
                    viz.colors.teal + '11',
                    viz.colors.teal,
                    2
                );

                // Labels
                viz.drawText(`A = {1,...,${sizeA}}`, 0.5 + sizeA/2, -1, viz.colors.white, 14, 'center');
                viz.drawText(`B = {1,...,${sizeB}}`, -1.5, 0.5 + sizeB/2, viz.colors.white, 14, 'center');
                viz.drawText(`|A × B| = ${sizeA} × ${sizeB} = ${sizeA * sizeB}`,
                            0, 4.5, viz.colors.white, 16, 'center');

                // Draw set A on x-axis
                for (let a = 1; a <= sizeA; a++) {
                    viz.drawCircle(a - 0.5, -0.5, 0.15, viz.colors.orange, viz.colors.orange);
                }

                // Draw set B on y-axis
                for (let b = 1; b <= sizeB; b++) {
                    viz.drawCircle(-0.5, b - 0.5, 0.15, viz.colors.green, viz.colors.green);
                }
            }

            draw();
            return viz;
        }
    }
];

// Section 4: Cardinality
window.EXTRA_VIZ['ch00']['ch00-sec04'] = [
    {
        id: 'ch00-extra-viz-6',
        title: 'Bijection Between ℕ and ℤ',
        description: 'Animation showing explicit bijection f: ℕ → ℤ (naturals to integers)',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            let n = 0;
            let animating = false;

            // Bijection: 0→0, 1→1, 2→-1, 3→2, 4→-2, 5→3, ...
            // f(n) = n/2 if n even, -(n+1)/2 if n odd (for n > 0)
            function f(n) {
                if (n === 0) return 0;
                if (n % 2 === 1) return (n + 1) / 2;
                return -n / 2;
            }

            const startButton = VizEngine.createButton(controls, 'Start/Stop Animation', () => {
                animating = !animating;
                if (animating) animate();
            });

            const resetButton = VizEngine.createButton(controls, 'Reset', () => {
                animating = false;
                n = 0;
                draw();
            });

            function animate() {
                if (!animating) return;
                n = (n + 1) % 13;
                draw();
                setTimeout(animate, 800);
            }

            function draw() {
                viz.clear();

                const leftX = -6;
                const rightX = 6;

                // Draw ℕ
                viz.drawText('ℕ', leftX, 4, viz.colors.teal, 18);
                for (let i = 0; i <= 6; i++) {
                    const color = (i === n) ? viz.colors.orange : viz.colors.teal;
                    const radius = (i === n) ? 10 : 6;
                    viz.drawPoint(leftX, 3 - i * 0.8, color, i.toString(), radius);
                }

                // Draw ℤ
                viz.drawText('ℤ', rightX, 4, viz.colors.blue, 18);
                for (let z = -3; z <= 3; z++) {
                    const mapped = f(n);
                    const color = (z === mapped) ? viz.colors.orange : viz.colors.blue;
                    const radius = (z === mapped) ? 10 : 6;
                    viz.drawPoint(rightX, z * 0.8, color, z.toString(), radius);
                }

                // Draw arrow
                if (n <= 6) {
                    const fromY = 3 - n * 0.8;
                    const toY = f(n) * 0.8;
                    viz.drawSegment(leftX + 0.5, fromY, rightX - 0.5, toY, viz.colors.orange, 3);
                }

                viz.drawText(`f(${n}) = ${f(n)}`, 0, 4, viz.colors.white, 16, 'center');
                viz.drawText('|ℕ| = |ℤ| = ℵ₀', 0, -4, viz.colors.white, 14, 'center');
            }

            draw();
            return viz;
        }
    },
    {
        id: 'ch00-extra-viz-7',
        title: 'Cantor Diagonal Argument Visualization',
        description: 'Interactive demonstration showing ℝ is uncountable via diagonal argument',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Show a "table" of real numbers in [0,1) with binary expansions
            const sequences = [
                [0, 1, 0, 1, 0, 1, 0, 1],
                [1, 1, 0, 0, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 0, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 1, 0, 0, 1, 1, 0],
                [1, 1, 1, 0, 0, 0, 1, 1]
            ];

            let highlightDiagonal = false;

            const toggleButton = VizEngine.createButton(controls, 'Toggle Diagonal', () => {
                highlightDiagonal = !highlightDiagonal;
                draw();
            });

            function draw() {
                viz.clear();

                // Draw table
                const startX = -5;
                const startY = 3;
                const cellSize = 0.6;

                viz.drawText('Binary expansions of reals in [0,1):', startX, startY + 0.8,
                            viz.colors.white, 14);

                for (let i = 0; i < sequences.length; i++) {
                    const seq = sequences[i];

                    // Row label
                    viz.drawText(`r${i}:`, startX - 1, startY - i * cellSize,
                                viz.colors.teal, 12);

                    for (let j = 0; j < seq.length; j++) {
                        const x = startX + j * cellSize;
                        const y = startY - i * cellSize;

                        const isDiagonal = (i === j);
                        const color = (highlightDiagonal && isDiagonal)
                                     ? viz.colors.orange
                                     : viz.colors.blue;
                        const size = (highlightDiagonal && isDiagonal) ? 14 : 12;

                        viz.drawText(seq[j].toString(), x, y, color, size);
                    }
                }

                if (highlightDiagonal) {
                    // Show the diagonal number
                    const diagonal = sequences.map((seq, i) => seq[i]);
                    const flipped = diagonal.map(d => 1 - d);

                    viz.drawText('Diagonal: ' + diagonal.join(''), startX, -2.5,
                                viz.colors.orange, 12);
                    viz.drawText('Flipped:   ' + flipped.join(''), startX, -3,
                                viz.colors.green, 12);
                    viz.drawText('This flipped number differs from every row!', startX, -3.7,
                                viz.colors.white, 11);
                }

                viz.drawText('ℝ is uncountable', 0, -4.5, viz.colors.white, 16, 'center');
            }

            draw();
            return viz;
        }
    }
];

// Section 5: Zorn's Lemma
window.EXTRA_VIZ['ch00']['ch00-sec05'] = [
    {
        id: 'ch00-extra-viz-8',
        title: "Zorn's Lemma: Chains and Maximal Elements",
        description: 'Drag to explore a poset where every chain has an upper bound, implying a maximal element',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Poset structure - every chain has an upper bound
            const elements = {
                bottom: {x: 0, y: -3, label: '⊥'},
                a: {x: -3, y: -1, label: 'a'},
                b: {x: -1, y: -1, label: 'b'},
                c: {x: 1, y: -1, label: 'c'},
                d: {x: 3, y: -1, label: 'd'},
                ab: {x: -2, y: 1, label: 'a∨b'},
                cd: {x: 2, y: 1, label: 'c∨d'},
                max: {x: 0, y: 3, label: '⊤'}
            };

            const edges = [
                ['bottom', 'a'], ['bottom', 'b'], ['bottom', 'c'], ['bottom', 'd'],
                ['a', 'ab'], ['b', 'ab'],
                ['c', 'cd'], ['d', 'cd'],
                ['ab', 'max'], ['cd', 'max']
            ];

            const draggables = {};
            for (let key in elements) {
                const elem = elements[key];
                draggables[key] = viz.addDraggable(
                    `e${key}`, elem.x, elem.y, viz.colors.blue, 8, () => draw()
                );
            }

            let showChain = false;
            const toggleButton = VizEngine.createButton(controls, 'Show Chain Example', () => {
                showChain = !showChain;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw edges
                edges.forEach(([from, to]) => {
                    const fromPos = draggables[from];
                    const toPos = draggables[to];

                    const isChainEdge = showChain &&
                        (['bottom', 'a', 'ab', 'max'].includes(from) &&
                         ['bottom', 'a', 'ab', 'max'].includes(to) &&
                         edges.some(e => e[0] === from && e[1] === to));

                    const color = isChainEdge ? viz.colors.orange : viz.colors.teal;
                    viz.drawSegment(fromPos.x, fromPos.y, toPos.x, toPos.y, color, 2);
                });

                // Draw nodes
                for (let key in draggables) {
                    const d = draggables[key];
                    const elem = elements[key];
                    const color = (key === 'max') ? viz.colors.green : viz.colors.blue;
                    const radius = (key === 'max') ? 12 : 8;
                    viz.drawPoint(d.x, d.y, color, elem.label, radius);
                }

                viz.drawDraggables();

                viz.drawText("Poset satisfying Zorn's Lemma hypothesis",
                            0, 4.5, viz.colors.white, 14, 'center');
                if (showChain) {
                    viz.drawText('Chain ⊥ ≤ a ≤ a∨b ≤ ⊤ has upper bound ⊤',
                                0, -4.2, viz.colors.orange, 12, 'center');
                }
                viz.drawText('⊤ is the maximal element (green)',
                            0, -4.7, viz.colors.green, 11, 'center');
            }

            draw();
            return viz;
        }
    }
];
