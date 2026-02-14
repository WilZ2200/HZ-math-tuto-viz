// === Chapter 3: The Isomorphism Theorems - Extra Visualizations ===
window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch03'] = window.EXTRA_VIZ['ch03'] || {};

// Section IDs will be dynamically matched, so we'll create visualizations that can be added to any section
// For now, we'll assign them to a generic section pattern

// Visualization 1: Quotient Space as Collapsing Dimensions
window.EXTRA_VIZ['ch03']['ch03-sec01'] = window.EXTRA_VIZ['ch03']['ch03-sec01'] || [];
window.EXTRA_VIZ['ch03']['ch03-sec01'].push({
    id: 'ch03-extra-viz-1',
    title: 'Quotient Space: Collapsing a Subspace to Zero',
    description: 'Drag vectors to see how V/S collapses the subspace S (the blue line) to the origin. Cosets are shown as parallel lines.',
    setup: function(container, controls) {
        const viz = new VizEngine(container, {width: 600, height: 450, scale: 45});

        // Define subspace S as span of (1, 0.5)
        const subspaceDir = {x: 1, y: 0.5};

        // Draggable vector v in V
        const v = viz.addDraggable('v', 2, 1.5, viz.colors.orange, 8, () => draw());

        // Control for dimension of quotient
        let showCosets = true;
        VizEngine.createButton(controls, 'Toggle Cosets', () => {
            showCosets = !showCosets;
            draw();
        });

        function draw() {
            viz.clear();
            viz.drawGrid();
            viz.drawAxes();

            // Draw subspace S (line through origin)
            for (let t = -10; t <= 10; t += 0.5) {
                const x = subspaceDir.x * t;
                const y = subspaceDir.y * t;
                viz.drawPoint(x, y, viz.colors.blue + '55', null, 2);
            }
            viz.drawLine(0, 0, subspaceDir.x, subspaceDir.y, viz.colors.blue, 2);
            viz.drawText('S (subspace)', subspaceDir.x * 3, subspaceDir.y * 3 + 0.5, viz.colors.blue, 12);

            // Project v onto S to find the representative in quotient space
            const dot = v.x * subspaceDir.x + v.y * subspaceDir.y;
            const lenSq = subspaceDir.x * subspaceDir.x + subspaceDir.y * subspaceDir.y;
            const projX = (dot / lenSq) * subspaceDir.x;
            const projY = (dot / lenSq) * subspaceDir.y;

            // Representative in quotient is v - proj(v, S)
            const repX = v.x - projX;
            const repY = v.y - projY;

            // Draw coset v + S (line parallel to S through v)
            if (showCosets) {
                for (let t = -10; t <= 10; t += 0.5) {
                    const x = v.x + subspaceDir.x * t;
                    const y = v.y + subspaceDir.y * t;
                    viz.drawPoint(x, y, viz.colors.orange + '33', null, 2);
                }
                viz.drawLine(v.x, v.y, v.x + subspaceDir.x, v.y + subspaceDir.y, viz.colors.orange + '77', 1.5, true);
                viz.drawText('v + S (coset)', v.x + 1, v.y + 0.8, viz.colors.orange, 11);
            }

            // Draw projection onto S
            viz.drawSegment(v.x, v.y, projX, projY, viz.colors.purple, 2, true);
            viz.drawPoint(projX, projY, viz.colors.purple, null, 5);

            // Draw representative vector (perpendicular component)
            viz.drawVector(0, 0, repX, repY, viz.colors.green, '[v]', 3);
            viz.drawText('Representative in V/S', repX + 0.5, repY + 0.6, viz.colors.green, 11);

            // Draw original vector v
            viz.drawVector(0, 0, v.x, v.y, viz.colors.orange, 'v', 2);

            viz.drawDraggables();

            // Info text
            viz.drawText('dim(V) = 2, dim(S) = 1', -6.2, 4.5, viz.colors.text, 11, 'left');
            viz.drawText('dim(V/S) = 1', -6.2, 4, viz.colors.text, 11, 'left');
        }

        draw();
        return viz;
    }
});

// Visualization 2: First Isomorphism Theorem Animation
window.EXTRA_VIZ['ch03']['ch03-sec02'] = window.EXTRA_VIZ['ch03']['ch03-sec02'] || [];
window.EXTRA_VIZ['ch03']['ch03-sec02'].push({
    id: 'ch03-extra-viz-2',
    title: 'First Isomorphism Theorem: V/ker(T) ≅ im(T)',
    description: 'Watch how T maps vectors to its image. Vectors in the same coset of ker(T) map to the same point.',
    setup: function(container, controls) {
        const viz = new VizEngine(container, {width: 700, height: 400, scale: 40});

        // Define transformation T: R^2 -> R^2 as projection onto x-axis
        // ker(T) = y-axis, im(T) = x-axis
        const T = (x, y) => [x, 0];

        let animating = false;
        let t = 0;

        // Multiple test vectors in different cosets
        const vectors = [
            {x: 2, y: 1.5, color: viz.colors.orange},
            {x: 2, y: -1, color: viz.colors.pink},
            {x: -1.5, y: 2, color: viz.colors.teal},
            {x: -1.5, y: -0.5, color: viz.colors.yellow}
        ];

        function draw() {
            viz.clear();
            viz.drawGrid();
            viz.drawAxes();

            // Draw ker(T) - the y-axis (vertical line)
            viz.drawLine(0, -5, 0, 5, viz.colors.blue, 2);
            viz.drawText('ker(T)', 0.5, 4, viz.colors.blue, 11);

            // Draw im(T) - the x-axis (horizontal line)
            viz.drawLine(-5, 0, 5, 0, viz.colors.green + 'aa', 2);
            viz.drawText('im(T)', 4, 0.5, viz.colors.green, 11);

            // Draw vectors and their images
            for (const v of vectors) {
                const [tx, ty] = T(v.x, v.y);

                // Draw coset line (horizontal line through v)
                for (let s = -5; s <= 5; s += 0.5) {
                    viz.drawPoint(v.x, s, v.color + '22', null, 2);
                }

                // Draw original vector
                viz.drawVector(0, 0, v.x, v.y, v.color, null, 2);

                // Draw image vector
                if (animating) {
                    const progress = Math.min(1, t / 60);
                    const interpX = v.x + (tx - v.x) * progress;
                    const interpY = v.y + (ty - v.y) * progress;
                    viz.drawSegment(v.x, v.y, interpX, interpY, v.color + '77', 1, true);
                    viz.drawPoint(interpX, interpY, v.color, null, 5);
                } else {
                    viz.drawPoint(tx, ty, v.color + 'dd', null, 6);
                }
            }

            // Labels
            viz.drawText('T: R² → R²', -6.5, 4.5, viz.colors.white, 12, 'left');
            viz.drawText('T(x,y) = (x,0)', -6.5, 4, viz.colors.text, 11, 'left');

            if (animating) {
                t++;
                if (t > 60) {
                    t = 0;
                    animating = false;
                }
            }
        }

        VizEngine.createButton(controls, 'Animate T', () => {
            animating = true;
            t = 0;
        });

        viz.animate(() => draw());
        return viz;
    }
});

// Visualization 3: Second Isomorphism Theorem Diamond
window.EXTRA_VIZ['ch03']['ch03-sec03'] = window.EXTRA_VIZ['ch03']['ch03-sec03'] || [];
window.EXTRA_VIZ['ch03']['ch03-sec03'].push({
    id: 'ch03-extra-viz-3',
    title: 'Second Isomorphism Theorem: (S+W)/S ≅ W/(S∩W)',
    description: 'Interactive diamond diagram showing the relationship between subspaces. Drag to explore dimensions.',
    setup: function(container, controls) {
        const viz = new VizEngine(container, {width: 600, height: 450, scale: 50});

        // S is the x-axis, W is a draggable line
        let wAngle = Math.PI / 4;

        VizEngine.createSlider(controls, 'W angle', 0, 180, 45, 5, (val) => {
            wAngle = val * Math.PI / 180;
            draw();
        });

        function draw() {
            viz.clear();
            viz.drawGrid();
            viz.drawAxes();

            const wDir = {x: Math.cos(wAngle), y: Math.sin(wAngle)};
            const sDir = {x: 1, y: 0};

            // Draw S (x-axis)
            viz.drawLine(0, 0, sDir.x, sDir.y, viz.colors.blue, 2);
            viz.drawText('S', 4, 0.5, viz.colors.blue, 12);

            // Draw W
            viz.drawLine(0, 0, wDir.x, wDir.y, viz.colors.orange, 2);
            viz.drawText('W', wDir.x * 4, wDir.y * 4 + 0.5, viz.colors.orange, 12);

            // Draw S ∩ W (origin if W not parallel to S)
            const parallel = Math.abs(wDir.y) < 0.1;
            if (parallel) {
                // S ∩ W = S = W
                viz.drawText('S ∩ W = S = W', 0, -4, viz.colors.purple, 12);
            } else {
                viz.drawPoint(0, 0, viz.colors.purple, 'S ∩ W = {0}', 6);
            }

            // Draw S + W (entire plane if not parallel)
            if (!parallel) {
                // Draw a grid to suggest the whole space
                for (let a = -2; a <= 2; a++) {
                    for (let b = -2; b <= 2; b++) {
                        const x = a * sDir.x + b * wDir.x;
                        const y = a * sDir.y + b * wDir.y;
                        viz.drawPoint(x, y, viz.colors.green + '33', null, 2);
                    }
                }
                viz.drawText('S + W = R²', 0, 4.5, viz.colors.green, 12);
            } else {
                viz.drawText('S + W = S', 0, 4.5, viz.colors.green, 12);
            }

            // Display the isomorphism
            const dimS = 1;
            const dimW = 1;
            const dimIntersection = parallel ? 1 : 0;
            const dimSum = parallel ? 1 : 2;
            const dimQuotientLeft = dimSum - dimS;
            const dimQuotientRight = dimW - dimIntersection;

            viz.drawText(`dim((S+W)/S) = ${dimQuotientLeft}`, -5.5, -3.5, viz.colors.text, 11, 'left');
            viz.drawText(`dim(W/(S∩W)) = ${dimQuotientRight}`, -5.5, -4, viz.colors.text, 11, 'left');
            viz.drawText(`Isomorphic? ${dimQuotientLeft === dimQuotientRight ? 'YES ✓' : 'Check dims'}`,
                         -5.5, -4.5, dimQuotientLeft === dimQuotientRight ? viz.colors.green : viz.colors.red, 11, 'left');
        }

        draw();
        return viz;
    }
});

// Visualization 4: Third Isomorphism Theorem
window.EXTRA_VIZ['ch03']['ch03-sec03'].push({
    id: 'ch03-extra-viz-4',
    title: 'Third Isomorphism Theorem: (V/S)/(W/S) ≅ V/W',
    description: 'Quotient of quotients behaves like cancellation. Shows tower of subspaces S ⊆ W ⊆ V.',
    setup: function(container, controls) {
        const viz = new VizEngine(container, {width: 600, height: 500, scale: 35});

        // V = R^2, W = line at angle θ₁, S = line at angle θ₂ where θ₂ is along W
        // To ensure S ⊆ W, we parameterize S along W

        let showLevels = true;

        function draw() {
            viz.clear();
            viz.drawGrid(0.5);
            viz.drawAxes();

            // Define nested subspaces: {0} ⊂ S ⊂ W ⊂ V
            // S = x-axis (1D)
            const sDir = {x: 1, y: 0};

            // W = span{(1,0), (0,1)} restricted visual: show as x-axis + some y
            // Actually, let's use W = span{(1,0), (1,1)} for visual clarity
            const w1 = {x: 1, y: 0};
            const w2 = {x: 0.6, y: 1};

            // V = entire R^2

            // Draw V (background plane)
            for (let i = -4; i <= 4; i += 0.7) {
                for (let j = -4; j <= 4; j += 0.7) {
                    viz.drawPoint(i, j, viz.colors.teal + '11', null, 1);
                }
            }
            viz.drawText('V = R²', 5, 5, viz.colors.teal, 11);

            // Draw W (parallelogram region)
            for (let a = -3; a <= 3; a += 0.3) {
                for (let b = -3; b <= 3; b += 0.3) {
                    const x = a * w1.x + b * w2.x;
                    const y = a * w1.y + b * w2.y;
                    viz.drawPoint(x, y, viz.colors.orange + '33', null, 2);
                }
            }
            viz.drawVector(0, 0, w1.x * 3, w1.y * 3, viz.colors.orange, null, 2);
            viz.drawVector(0, 0, w2.x * 3, w2.y * 3, viz.colors.orange, null, 2);
            viz.drawText('W', 3.5, 0.8, viz.colors.orange, 12);

            // Draw S (line)
            viz.drawLine(0, 0, sDir.x, sDir.y, viz.colors.blue, 3);
            viz.drawText('S', 4, 0.5, viz.colors.blue, 12);

            // Labels for dimensions
            viz.drawText('dim(V) = 2', -6, 5.5, viz.colors.white, 11, 'left');
            viz.drawText('dim(W) = 2 (actually a plane through these vectors)', -6, 5, viz.colors.text, 10, 'left');
            viz.drawText('dim(S) = 1', -6, 4.5, viz.colors.text, 11, 'left');

            viz.drawText('Third Iso Thm:', -6, -4.5, viz.colors.white, 12, 'left');
            viz.drawText('(V/S) / (W/S) ≅ V/W', -6, -5, viz.colors.green, 11, 'left');
            viz.drawText('"Quotients cancel"', -6, -5.5, viz.colors.text, 10, 'left');
        }

        draw();
        return viz;
    }
});

// Visualization 5: Subspace Lattice Explorer
window.EXTRA_VIZ['ch03']['ch03-sec01'].push({
    id: 'ch03-extra-viz-5',
    title: 'Subspace Lattice of R³',
    description: 'Explore the lattice of subspaces. Each node shows dimension. Click to highlight paths.',
    setup: function(container, controls) {
        const viz = new VizEngine(container, {width: 650, height: 520, scale: 1});

        // Lattice structure for R^3:
        // Level 3: R^3 (dim 3)
        // Level 2: all 2D subspaces (planes through origin)
        // Level 1: all 1D subspaces (lines through origin)
        // Level 0: {0} (dim 0)

        const lattice = {
            nodes: [
                // Level 0
                {id: 'zero', label: '{0}', dim: 0, level: 0, x: 325, y: 480},

                // Level 1 (sample lines)
                {id: 'L1', label: 'L₁', dim: 1, level: 1, x: 200, y: 360},
                {id: 'L2', label: 'L₂', dim: 1, level: 1, x: 325, y: 360},
                {id: 'L3', label: 'L₃', dim: 1, level: 1, x: 450, y: 360},

                // Level 2 (sample planes)
                {id: 'P1', label: 'P₁', dim: 2, level: 2, x: 160, y: 200},
                {id: 'P2', label: 'P₂', dim: 2, level: 2, x: 325, y: 200},
                {id: 'P3', label: 'P₃', dim: 2, level: 2, x: 490, y: 200},

                // Level 3
                {id: 'V', label: 'R³', dim: 3, level: 3, x: 325, y: 50}
            ],
            edges: [
                // From {0} to lines
                ['zero', 'L1'], ['zero', 'L2'], ['zero', 'L3'],

                // From lines to planes (sample connections)
                ['L1', 'P1'], ['L1', 'P2'],
                ['L2', 'P1'], ['L2', 'P2'], ['L2', 'P3'],
                ['L3', 'P2'], ['L3', 'P3'],

                // From planes to V
                ['P1', 'V'], ['P2', 'V'], ['P3', 'V']
            ]
        };

        let selectedNode = null;

        // Make canvas clickable
        viz.canvas.style.cursor = 'pointer';
        viz.canvas.addEventListener('click', (e) => {
            const rect = viz.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Find clicked node
            for (const node of lattice.nodes) {
                const dx = x - node.x;
                const dy = y - node.y;
                if (Math.sqrt(dx * dx + dy * dy) < 20) {
                    selectedNode = selectedNode === node ? null : node;
                    draw();
                    return;
                }
            }
            selectedNode = null;
            draw();
        });

        function draw() {
            viz.ctx.fillStyle = viz.colors.bg;
            viz.ctx.fillRect(0, 0, viz.width, viz.height);

            const ctx = viz.ctx;

            // Draw edges
            for (const [from, to] of lattice.edges) {
                const n1 = lattice.nodes.find(n => n.id === from);
                const n2 = lattice.nodes.find(n => n.id === to);

                const highlight = selectedNode && (selectedNode.id === from || selectedNode.id === to);

                ctx.strokeStyle = highlight ? viz.colors.orange : viz.colors.grid;
                ctx.lineWidth = highlight ? 3 : 1.5;
                ctx.beginPath();
                ctx.moveTo(n1.x, n1.y);
                ctx.lineTo(n2.x, n2.y);
                ctx.stroke();
            }

            // Draw nodes
            for (const node of lattice.nodes) {
                const isSelected = selectedNode === node;

                // Node circle
                ctx.fillStyle = isSelected ? viz.colors.orange :
                               node.level === 0 ? viz.colors.purple :
                               node.level === 1 ? viz.colors.blue :
                               node.level === 2 ? viz.colors.green :
                               viz.colors.teal;
                ctx.beginPath();
                ctx.arc(node.x, node.y, isSelected ? 22 : 18, 0, Math.PI * 2);
                ctx.fill();

                // Node border
                ctx.strokeStyle = viz.colors.white;
                ctx.lineWidth = isSelected ? 3 : 1.5;
                ctx.stroke();

                // Node label
                ctx.fillStyle = viz.colors.white;
                ctx.font = 'bold 14px -apple-system,sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(node.label, node.x, node.y);

                // Dimension label
                ctx.font = '11px -apple-system,sans-serif';
                ctx.fillStyle = viz.colors.text;
                ctx.fillText(`dim=${node.dim}`, node.x, node.y + 28);
            }

            // Legend
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 13px -apple-system,sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText('Subspace Lattice of R³', 20, 30);

            ctx.font = '11px -apple-system,sans-serif';
            ctx.fillStyle = viz.colors.text;
            ctx.fillText('• Lines connect S ⊂ W', 20, 50);
            ctx.fillText('• Click nodes to highlight', 20, 68);
            ctx.fillText('• Order-preserving bijection with subspaces of V/S', 20, 86);
        }

        draw();
        return viz;
    }
});

// Visualization 6: Kernel-Image Correspondence
window.EXTRA_VIZ['ch03']['ch03-sec02'].push({
    id: 'ch03-extra-viz-6',
    title: 'Kernel-Image Correspondence',
    description: 'Adjust the transformation matrix. See how dim(ker) + dim(im) = dim(V). Drag to change T.',
    setup: function(container, controls) {
        const viz = new VizEngine(container, {width: 650, height: 400, scale: 40});

        // Transformation matrix T = [[a, b], [c, d]]
        let matrix = [[1, 0.5], [0, 0]]; // Initially projects to x-axis

        const m11 = VizEngine.createSlider(controls, 'a', -2, 2, 1, 0.1, (v) => { matrix[0][0] = v; draw(); });
        const m12 = VizEngine.createSlider(controls, 'b', -2, 2, 0.5, 0.1, (v) => { matrix[0][1] = v; draw(); });
        const m21 = VizEngine.createSlider(controls, 'c', -2, 2, 0, 0.1, (v) => { matrix[1][0] = v; draw(); });
        const m22 = VizEngine.createSlider(controls, 'd', -2, 2, 0, 0.1, (v) => { matrix[1][1] = v; draw(); });

        function computeKernelBasis() {
            // Solve [a b][x] = [0]
            //       [c d][y]   [0]
            const [[a, b], [c, d]] = matrix;
            const det = a * d - b * c;

            // If det ≠ 0, kernel is trivial
            if (Math.abs(det) > 0.01) {
                return null;
            }

            // Otherwise, find null space
            // If entire matrix is ~0, kernel is entire space
            if (Math.abs(a) < 0.01 && Math.abs(b) < 0.01 && Math.abs(c) < 0.01 && Math.abs(d) < 0.01) {
                return 'all';
            }

            // One-dimensional kernel
            if (Math.abs(b) > 0.01) {
                return VizEngine.normalize([-b, a]);
            }
            if (Math.abs(a) > 0.01) {
                return VizEngine.normalize([0, 1]);
            }
            if (Math.abs(d) > 0.01) {
                return VizEngine.normalize([1, 0]);
            }
            return VizEngine.normalize([-d, c]);
        }

        function computeImageBasis() {
            const [[a, b], [c, d]] = matrix;

            // Column space
            const col1 = [a, c];
            const col2 = [b, d];

            const len1 = VizEngine.vecLen(col1);
            const len2 = VizEngine.vecLen(col2);

            if (len1 < 0.01 && len2 < 0.01) {
                return null; // Zero map
            }

            if (len1 < 0.01) {
                return [VizEngine.normalize(col2)];
            }

            if (len2 < 0.01) {
                return [VizEngine.normalize(col1)];
            }

            // Check if columns are parallel
            const normalized1 = VizEngine.normalize(col1);
            const normalized2 = VizEngine.normalize(col2);
            const dot = Math.abs(VizEngine.dot(normalized1, normalized2));

            if (dot > 0.99) {
                return [normalized1]; // Parallel, rank 1
            }

            return [normalized1, normalized2]; // Rank 2
        }

        function draw() {
            viz.clear();
            viz.drawGrid();
            viz.drawAxes();

            const kerBasis = computeKernelBasis();
            const imBasis = computeImageBasis();

            // Draw kernel
            if (kerBasis === 'all') {
                viz.drawText('ker(T) = R²', 0, 4.5, viz.colors.red, 12);
                viz.drawText('(zero map)', 0, 4, viz.colors.text, 10);
            } else if (kerBasis) {
                // Draw kernel as a line
                for (let t = -10; t <= 10; t += 0.3) {
                    viz.drawPoint(kerBasis[0] * t, kerBasis[1] * t, viz.colors.red + '44', null, 2);
                }
                viz.drawLine(0, 0, kerBasis[0], kerBasis[1], viz.colors.red, 2);
                viz.drawText('ker(T)', kerBasis[0] * 3, kerBasis[1] * 3 + 0.5, viz.colors.red, 11);
            } else {
                viz.drawPoint(0, 0, viz.colors.red, 'ker(T)={0}', 8);
            }

            // Draw image
            if (imBasis && imBasis.length === 2) {
                // Full rank - draw entire plane
                viz.drawText('im(T) = R²', 0, -4, viz.colors.green, 12);
            } else if (imBasis && imBasis.length === 1) {
                // Rank 1 - draw line
                for (let t = -10; t <= 10; t += 0.3) {
                    viz.drawPoint(imBasis[0][0] * t, imBasis[0][1] * t, viz.colors.green + '44', null, 2);
                }
                viz.drawLine(0, 0, imBasis[0][0], imBasis[0][1], viz.colors.green, 2);
                viz.drawText('im(T)', imBasis[0][0] * 3, imBasis[0][1] * 3 - 0.5, viz.colors.green, 11);
            } else {
                // Zero map
                viz.drawText('im(T) = {0}', 0, -4, viz.colors.green, 12);
            }

            // Draw grid of transformed points
            for (let x = -3; x <= 3; x++) {
                for (let y = -3; y <= 3; y++) {
                    const [tx, ty] = VizEngine.matVec(matrix, [x, y]);
                    viz.drawPoint(tx, ty, viz.colors.blue + '22', null, 2);
                }
            }

            // Compute dimensions
            let dimKer = 0;
            if (kerBasis === 'all') dimKer = 2;
            else if (kerBasis) dimKer = 1;
            else dimKer = 0;

            let dimIm = 0;
            if (imBasis) dimIm = imBasis.length;

            // Display rank-nullity theorem
            viz.drawText(`Matrix: [${matrix[0][0].toFixed(1)}, ${matrix[0][1].toFixed(1)}]`, -7, 4.8, viz.colors.white, 11, 'left');
            viz.drawText(`        [${matrix[1][0].toFixed(1)}, ${matrix[1][1].toFixed(1)}]`, -7, 4.4, viz.colors.white, 11, 'left');
            viz.drawText(`dim(ker T) = ${dimKer}`, -7, 3.6, viz.colors.red, 11, 'left');
            viz.drawText(`dim(im T) = ${dimIm}`, -7, 3.2, viz.colors.green, 11, 'left');
            viz.drawText(`dim(V) = ${dimKer + dimIm}`, -7, 2.8, viz.colors.yellow, 11, 'left');
            viz.drawText(`Rank-Nullity Theorem ✓`, -7, 2.2, viz.colors.teal, 11, 'left');
        }

        draw();
        return viz;
    }
});

// Visualization 7: Correspondence Theorem Interactive
window.EXTRA_VIZ['ch03']['ch03-sec01'].push({
    id: 'ch03-extra-viz-7',
    title: 'Correspondence Theorem: Subspaces containing S ↔ Subspaces of V/S',
    description: 'Shows the bijection between intermediate subspaces. Each subspace W ⊇ S corresponds to W/S in V/S.',
    setup: function(container, controls) {
        const viz = new VizEngine(container, {width: 700, height: 480, scale: 1});

        // Draw two parallel lattices side by side
        function draw() {
            viz.ctx.fillStyle = viz.colors.bg;
            viz.ctx.fillRect(0, 0, viz.width, viz.height);

            const ctx = viz.ctx;

            // Left side: Subspaces of V containing S
            const leftX = 150;
            const rightX = 550;
            const spacing = 80;

            // Title
            ctx.fillStyle = viz.colors.white;
            ctx.font = 'bold 13px -apple-system,sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Subspaces W ⊇ S', leftX, 30);
            ctx.fillText('Subspaces of V/S', rightX, 30);

            // Nodes on left (in V)
            const leftNodes = [
                {label: 'V', y: 80, color: viz.colors.teal},
                {label: 'W₃', y: 160, color: viz.colors.green},
                {label: 'W₂', y: 240, color: viz.colors.orange},
                {label: 'W₁', y: 320, color: viz.colors.blue},
                {label: 'S', y: 400, color: viz.colors.purple}
            ];

            // Nodes on right (in V/S)
            const rightNodes = [
                {label: 'V/S', y: 80, color: viz.colors.teal},
                {label: 'W₃/S', y: 160, color: viz.colors.green},
                {label: 'W₂/S', y: 240, color: viz.colors.orange},
                {label: 'W₁/S', y: 320, color: viz.colors.blue},
                {label: '{0}', y: 400, color: viz.colors.purple}
            ];

            // Draw edges (vertical connections)
            ctx.strokeStyle = viz.colors.grid;
            ctx.lineWidth = 1.5;
            for (let i = 0; i < leftNodes.length - 1; i++) {
                ctx.beginPath();
                ctx.moveTo(leftX, leftNodes[i].y);
                ctx.lineTo(leftX, leftNodes[i + 1].y);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(rightX, rightNodes[i].y);
                ctx.lineTo(rightX, rightNodes[i + 1].y);
                ctx.stroke();
            }

            // Draw correspondence arrows
            ctx.strokeStyle = viz.colors.yellow;
            ctx.lineWidth = 2;
            ctx.setLineDash([8, 4]);
            for (let i = 0; i < leftNodes.length; i++) {
                ctx.beginPath();
                ctx.moveTo(leftX + 35, leftNodes[i].y);
                ctx.lineTo(rightX - 35, rightNodes[i].y);
                ctx.stroke();

                // Arrow head
                const arrowX = rightX - 35;
                const arrowY = rightNodes[i].y;
                ctx.fillStyle = viz.colors.yellow;
                ctx.beginPath();
                ctx.moveTo(arrowX, arrowY);
                ctx.lineTo(arrowX - 8, arrowY - 4);
                ctx.lineTo(arrowX - 8, arrowY + 4);
                ctx.closePath();
                ctx.fill();
            }
            ctx.setLineDash([]);

            // Draw left nodes
            for (const node of leftNodes) {
                ctx.fillStyle = node.color;
                ctx.beginPath();
                ctx.arc(leftX, node.y, 18, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = viz.colors.white;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                ctx.fillStyle = viz.colors.white;
                ctx.font = 'bold 12px -apple-system,sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(node.label, leftX, node.y);
            }

            // Draw right nodes
            for (const node of rightNodes) {
                ctx.fillStyle = node.color;
                ctx.beginPath();
                ctx.arc(rightX, node.y, 18, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = viz.colors.white;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                ctx.fillStyle = viz.colors.white;
                ctx.font = 'bold 11px -apple-system,sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(node.label, rightX, node.y);
            }

            // Bottom text
            ctx.fillStyle = viz.colors.text;
            ctx.font = '11px -apple-system,sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Order-preserving bijection', 350, 450);
            ctx.fillText('S ⊆ W₁ ⊆ W₂ ⊆ W₃ ⊆ V  ⟷  {0} ⊆ W₁/S ⊆ W₂/S ⊆ W₃/S ⊆ V/S', 350, 468);
        }

        draw();
        return viz;
    }
});

// Visualization 8: Universal Property of Quotients
window.EXTRA_VIZ['ch03']['ch03-sec02'].push({
    id: 'ch03-extra-viz-8',
    title: 'Universal Property: Factoring through π: V → V/S',
    description: 'Any linear map T: V → W with ker(T) ⊇ S factors uniquely through the quotient map π.',
    setup: function(container, controls) {
        const viz = new VizEngine(container, {width: 650, height: 450, scale: 42});

        // Demonstration: V = R^2, S = x-axis, W = R
        // T: (x,y) → y (projection to y-coordinate)
        // π: V → V/S quotients by x-axis
        // T': V/S → W is induced map

        const v = viz.addDraggable('v', 2, 2, viz.colors.orange, 8, () => draw());

        let showFactorization = false;
        VizEngine.createButton(controls, 'Show Factorization', () => {
            showFactorization = !showFactorization;
            draw();
        });

        function draw() {
            viz.clear();
            viz.drawGrid();
            viz.drawAxes();

            // S = x-axis (ker contains S means T annihilates x-axis)
            viz.drawLine(-5, 0, 5, 0, viz.colors.blue, 2);
            viz.drawText('S (kernel of T)', 3.5, 0.5, viz.colors.blue, 11);

            // Draw vector v
            viz.drawVector(0, 0, v.x, v.y, viz.colors.orange, 'v', 2);

            // T(v) = y-component (draw on y-axis)
            const Tv = v.y;
            viz.drawPoint(0, Tv, viz.colors.green, null, 7);
            viz.drawText('T(v) = ' + Tv.toFixed(2), 0.8, Tv, viz.colors.green, 11, 'left');

            // Draw coset v + S (horizontal line)
            for (let t = -5; t <= 5; t += 0.3) {
                viz.drawPoint(t, v.y, viz.colors.orange + '33', null, 2);
            }
            viz.drawLine(-5, v.y, 5, v.y, viz.colors.orange + '55', 1, true);
            viz.drawText('[v] ∈ V/S', 4, v.y + 0.4, viz.colors.orange, 10);

            if (showFactorization) {
                // Show the induced map T': [v] → T(v)
                // [v] is represented by the point (0, v.y) on the y-axis
                viz.drawPoint(0, v.y, viz.colors.purple, null, 6);
                viz.drawSegment(0, v.y, 0, Tv, viz.colors.purple, 2, true);

                // Arrow from v to [v]
                viz.drawSegment(v.x, v.y, 0.3, v.y, viz.colors.teal + '88', 2);

                viz.drawText("π(v) = [v]", -1.5, v.y, viz.colors.teal, 10);
                viz.drawText("T'([v]) = T(v)", 0.8, (v.y + Tv) / 2, viz.colors.purple, 10, 'left');
            }

            // Info text
            viz.drawText('T: V → W, T(x,y) = y', -6.5, 4.8, viz.colors.white, 11, 'left');
            viz.drawText('π: V → V/S (quotient)', -6.5, 4.4, viz.colors.teal, 11, 'left');
            viz.drawText("T': V/S → W (induced)", -6.5, 4, viz.colors.purple, 11, 'left');
            viz.drawText('T = T\' ∘ π', -6.5, 3.5, viz.colors.green, 11, 'left');

            viz.drawDraggables();
        }

        draw();
        return viz;
    }
});

console.log('Chapter 3 extra visualizations loaded: Isomorphism Theorems');
