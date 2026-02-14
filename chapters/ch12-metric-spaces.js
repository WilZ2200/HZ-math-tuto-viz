window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch12',
    number: 12,
    title: 'Metric Spaces',
    subtitle: 'Topology, convergence, completeness, and the Banach fixed point theorem',
    sections: [
        {
            id: 'ch12-sec01',
            title: 'Metric Spaces and Open Sets',
            content: `
                <h2>Metric Spaces and Open Sets</h2>

                <p>Metric spaces provide the fundamental framework for discussing continuity, convergence, and completeness in abstract settings. The theory developed here will be essential for our study of infinite-dimensional inner product spaces.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.1 (Metric Space)</div>
                    <div class="env-body">
                        <p>A <strong>metric space</strong> is a pair \\((M, d)\\) where \\(M\\) is a set and \\(d: M \\times M \\to \\mathbb{R}\\) is a function satisfying:</p>
                        <ol>
                            <li><strong>Positive definiteness:</strong> \\(d(x,y) \\geq 0\\) with equality if and only if \\(x = y\\)</li>
                            <li><strong>Symmetry:</strong> \\(d(x,y) = d(y,x)\\) for all \\(x, y \\in M\\)</li>
                            <li><strong>Triangle inequality:</strong> \\(d(x,z) \\leq d(x,y) + d(y,z)\\) for all \\(x, y, z \\in M\\)</li>
                        </ol>
                        <p>The function \\(d\\) is called a <strong>metric</strong> or <strong>distance function</strong>.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.1 (Standard Metric Spaces)</div>
                    <div class="env-body">
                        <p>The following are fundamental examples of metric spaces:</p>
                        <ol>
                            <li><strong>Euclidean space:</strong> \\(\\mathbb{R}^n\\) with \\(d(x,y) = \\sqrt{\\sum_{i=1}^{n} (x_i - y_i)^2}\\)</li>
                            <li><strong>Discrete metric:</strong> Any set \\(M\\) with \\(d(x,y) = 1\\) if \\(x \\neq y\\) and \\(d(x,x) = 0\\)</li>
                            <li><strong>\\(\\ell^2\\) space:</strong> The space of square-summable sequences with \\(d(x,y) = \\left(\\sum_{i=1}^{\\infty} |x_i - y_i|^2\\right)^{1/2}\\)</li>
                            <li><strong>Continuous functions:</strong> \\(C[a,b]\\) with \\(d(f,g) = \\sup_{x \\in [a,b]} |f(x) - g(x)|\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.2 (Open and Closed Balls)</div>
                    <div class="env-body">
                        <p>Let \\((M, d)\\) be a metric space, \\(x \\in M\\), and \\(r > 0\\). The <strong>open ball</strong> of radius \\(r\\) centered at \\(x\\) is</p>
                        \\[B(x, r) = \\{y \\in M : d(x, y) < r\\}\\]
                        <p>The <strong>closed ball</strong> is</p>
                        \\[\\overline{B}(x, r) = \\{y \\in M : d(x, y) \\leq r\\}\\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="metric-balls-viz"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.3 (Open Sets)</div>
                    <div class="env-body">
                        <p>A subset \\(U \\subseteq M\\) is <strong>open</strong> if for every \\(x \\in U\\), there exists \\(r > 0\\) such that \\(B(x, r) \\subseteq U\\). That is, \\(U\\) contains an open ball around each of its points.</p>
                        <p>A subset \\(F \\subseteq M\\) is <strong>closed</strong> if its complement \\(M \\setminus F\\) is open.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.1 (Properties of Open Sets)</div>
                    <div class="env-body">
                        <p>Let \\((M, d)\\) be a metric space. Then:</p>
                        <ol>
                            <li>Both \\(\\emptyset\\) and \\(M\\) are open</li>
                            <li>The union of any collection of open sets is open</li>
                            <li>The intersection of finitely many open sets is open</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>1) The empty set is vacuously open. For \\(M\\), given any \\(x \\in M\\), every ball \\(B(x,r)\\) is contained in \\(M\\).</p>
                        <p>2) Let \\(\\{U_\\alpha\\}_{\\alpha \\in A}\\) be a collection of open sets and \\(U = \\bigcup_{\\alpha \\in A} U_\\alpha\\). If \\(x \\in U\\), then \\(x \\in U_\\alpha\\) for some \\(\\alpha\\). Since \\(U_\\alpha\\) is open, there exists \\(r > 0\\) with \\(B(x,r) \\subseteq U_\\alpha \\subseteq U\\).</p>
                        <p>3) Let \\(U_1, \\ldots, U_n\\) be open and \\(U = \\bigcap_{i=1}^{n} U_i\\). If \\(x \\in U\\), then for each \\(i\\), there exists \\(r_i > 0\\) with \\(B(x, r_i) \\subseteq U_i\\). Setting \\(r = \\min\\{r_1, \\ldots, r_n\\}\\), we have \\(B(x,r) \\subseteq U\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Open sets capture the notion of "interior" regions without boundary. The topology defined by open sets allows us to discuss continuity without reference to the specific metric—two metrics generating the same open sets are topologically equivalent.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="open-closed-viz"></div>
            `,
            visualizations: [
                {
                    id: 'metric-balls-viz',
                    title: 'Interactive: Metric Balls in ℝ²',
                    description: 'Explore open and closed balls under different metrics. Drag the center point and adjust the radius.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        let radius = 3;
                        let metricType = 'euclidean'; // euclidean, taxicab, max

                        const center = viz.addDraggable('center', 0, 0, viz.colors.blue, 8, () => draw());

                        const radiusSlider = VizEngine.createSlider(controls, 'Radius: ', 0.5, 6, radius, 0.1, (val) => {
                            radius = val;
                            draw();
                        });

                        const metricSelect = document.createElement('select');
                        metricSelect.style.marginLeft = '10px';
                        metricSelect.innerHTML = `
                            <option value="euclidean">Euclidean (ℓ²)</option>
                            <option value="taxicab">Taxicab (ℓ¹)</option>
                            <option value="max">Max (ℓ∞)</option>
                        `;
                        metricSelect.addEventListener('change', (e) => {
                            metricType = e.target.value;
                            draw();
                        });
                        controls.appendChild(metricSelect);

                        function distance(x1, y1, x2, y2, type) {
                            const dx = Math.abs(x2 - x1);
                            const dy = Math.abs(y2 - y1);
                            switch(type) {
                                case 'euclidean': return Math.sqrt(dx*dx + dy*dy);
                                case 'taxicab': return dx + dy;
                                case 'max': return Math.max(dx, dy);
                            }
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw ball boundary
                            const resolution = 200;
                            for (let i = 0; i <= resolution; i++) {
                                const angle = (i / resolution) * 2 * Math.PI;
                                let x, y;

                                if (metricType === 'euclidean') {
                                    x = center.x + radius * Math.cos(angle);
                                    y = center.y + radius * Math.sin(angle);
                                } else if (metricType === 'taxicab') {
                                    // Diamond shape
                                    const t = (angle / (Math.PI / 2)) % 4;
                                    if (t < 1) {
                                        x = center.x + radius * (1 - t);
                                        y = center.y + radius * t;
                                    } else if (t < 2) {
                                        x = center.x - radius * (t - 1);
                                        y = center.y + radius * (2 - t);
                                    } else if (t < 3) {
                                        x = center.x - radius * (3 - t);
                                        y = center.y - radius * (t - 2);
                                    } else {
                                        x = center.x + radius * (t - 3);
                                        y = center.y - radius * (4 - t);
                                    }
                                } else { // max
                                    // Square shape
                                    if (angle < Math.PI / 4) {
                                        x = center.x + radius;
                                        y = center.y + radius * Math.tan(angle);
                                    } else if (angle < 3 * Math.PI / 4) {
                                        x = center.x + radius / Math.tan(angle);
                                        y = center.y + radius;
                                    } else if (angle < 5 * Math.PI / 4) {
                                        x = center.x - radius;
                                        y = center.y - radius * Math.tan(angle);
                                    } else if (angle < 7 * Math.PI / 4) {
                                        x = center.x - radius / Math.tan(angle);
                                        y = center.y - radius;
                                    } else {
                                        x = center.x + radius;
                                        y = center.y + radius * Math.tan(angle);
                                    }
                                }

                                viz.drawPoint(x, y, viz.colors.teal + '88', null, 2);
                            }

                            // Draw boundary line
                            viz.drawCircle(center.x, center.y, radius, null, viz.colors.teal);

                            // Draw center
                            viz.drawDraggables();
                            viz.drawText('B(x, r)', center.x + radius + 0.5, center.y + 0.5, viz.colors.text, 16);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'open-closed-viz',
                    title: 'Interactive: Open vs Closed Sets',
                    description: 'Visualize the difference between open and closed sets in ℝ².',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        let setType = 'open'; // open, closed, neither, both

                        const setSelect = document.createElement('select');
                        setSelect.style.marginLeft = '10px';
                        setSelect.innerHTML = `
                            <option value="open">Open Ball (no boundary)</option>
                            <option value="closed">Closed Ball (with boundary)</option>
                            <option value="neither">Half-open interval</option>
                            <option value="both">Entire space (both)</option>
                        `;
                        setSelect.addEventListener('change', (e) => {
                            setType = e.target.value;
                            draw();
                        });
                        controls.appendChild(setSelect);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const cx = 0, cy = 0, r = 3;

                            if (setType === 'open') {
                                // Fill interior
                                for (let i = -r; i <= r; i += 0.1) {
                                    for (let j = -r; j <= r; j += 0.1) {
                                        if (i*i + j*j < r*r) {
                                            viz.drawPoint(cx + i, cy + j, viz.colors.blue + '33', null, 2);
                                        }
                                    }
                                }
                                // Dashed boundary (not included)
                                viz.drawCircle(cx, cy, r, null, viz.colors.orange, 2);
                                viz.drawText('B(0,3) - open', cx, cy + r + 0.8, viz.colors.text, 16);
                                viz.drawText('(boundary not included)', cx, cy - r - 0.8, viz.colors.text, 14);

                            } else if (setType === 'closed') {
                                // Fill interior
                                for (let i = -r; i <= r; i += 0.1) {
                                    for (let j = -r; j <= r; j += 0.1) {
                                        if (i*i + j*j <= r*r) {
                                            viz.drawPoint(cx + i, cy + j, viz.colors.green + '33', null, 2);
                                        }
                                    }
                                }
                                // Solid boundary (included)
                                viz.drawCircle(cx, cy, r, null, viz.colors.green, 3);
                                viz.drawText('B̄(0,3) - closed', cx, cy + r + 0.8, viz.colors.text, 16);
                                viz.drawText('(boundary included)', cx, cy - r - 0.8, viz.colors.text, 14);

                            } else if (setType === 'neither') {
                                // Half-open: [x1, x2) × [y1, y2)
                                const x1 = -3, x2 = 3, y1 = -2, y2 = 2;
                                viz.drawPolygon([[x1,y1],[x2,y1],[x2,y2],[x1,y2]], viz.colors.purple + '33', null);

                                // Draw boundaries with different styles
                                viz.drawSegment(x1, y1, x1, y2, viz.colors.purple, 3, false); // closed
                                viz.drawSegment(x1, y1, x2, y1, viz.colors.purple, 3, false); // closed
                                viz.drawSegment(x2, y1, x2, y2, viz.colors.orange, 2, true); // open
                                viz.drawSegment(x1, y2, x2, y2, viz.colors.orange, 2, true); // open

                                viz.drawText('Neither open nor closed', cx, cy + 3, viz.colors.text, 16);

                            } else { // both
                                // Fill entire visible space
                                for (let i = -7; i <= 7; i += 0.2) {
                                    for (let j = -5; j <= 5; j += 0.2) {
                                        viz.drawPoint(i, j, viz.colors.teal + '22', null, 2);
                                    }
                                }
                                viz.drawText('ℝ² (both open and closed)', cx, cy, viz.colors.text, 18);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that the closed ball \\(\\overline{B}(x, r) = \\{y : d(x,y) \\leq r\\}\\) is always a closed set in any metric space.',
                    hint: 'Show that the complement is open by using the triangle inequality to construct an open ball around any point outside \\(\\overline{B}(x,r)\\).',
                    solution: 'Let \\(y \\in M \\setminus \\overline{B}(x,r)\\), so \\(d(x,y) > r\\). Set \\(\\epsilon = d(x,y) - r > 0\\). For any \\(z \\in B(y, \\epsilon)\\), we have \\(d(x,z) \\geq d(x,y) - d(y,z) > d(x,y) - \\epsilon = r\\), so \\(z \\notin \\overline{B}(x,r)\\). Thus \\(B(y,\\epsilon) \\subseteq M \\setminus \\overline{B}(x,r)\\), proving the complement is open.'
                },
                {
                    question: 'Show that in a discrete metric space (where \\(d(x,y) = 1\\) for \\(x \\neq y\\)), every subset is both open and closed.',
                    hint: 'Show that \\(B(x, 1) = \\{x\\}\\) for any \\(x\\).',
                    solution: 'For any \\(x\\) in a discrete metric space, \\(B(x, 1) = \\{y : d(x,y) < 1\\} = \\{x\\}\\) since \\(d(x,y) = 1\\) for all \\(y \\neq x\\). Therefore, every singleton \\(\\{x\\}\\) is open. Since every set is a union of singletons, every set is open. But then every complement is also open, so every set is also closed.'
                },
                {
                    question: 'Let \\(M = \\mathbb{R}\\) with the usual metric. Determine whether the following sets are open, closed, both, or neither: (a) \\((0,1)\\), (b) \\([0,1]\\), (c) \\([0,1)\\), (d) \\(\\mathbb{Q}\\).',
                    hint: 'Check whether each set contains an open ball around every point, and whether the complement is open.',
                    solution: '(a) \\((0,1)\\) is open but not closed. (b) \\([0,1]\\) is closed but not open (endpoints have no interior ball). (c) \\([0,1)\\) is neither open (0 has no interior ball) nor closed (complement is not open near 1). (d) \\(\\mathbb{Q}\\) is neither open nor closed in \\(\\mathbb{R}\\) (every ball contains irrationals, and every point of \\(\\mathbb{R} \\setminus \\mathbb{Q}\\) is a limit point of \\(\\mathbb{Q}\\)).'
                }
            ]
        },
        {
            id: 'ch12-sec02',
            title: 'Convergence and Continuity',
            content: `
                <h2>Convergence and Continuity</h2>

                <p>The metric structure allows us to define convergence of sequences and continuity of functions in a natural way.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.4 (Convergence)</div>
                    <div class="env-body">
                        <p>A sequence \\((x_n)\\) in a metric space \\((M, d)\\) <strong>converges</strong> to \\(x \\in M\\) if for every \\(\\epsilon > 0\\), there exists \\(N \\in \\mathbb{N}\\) such that</p>
                        \\[n \\geq N \\implies d(x_n, x) < \\epsilon\\]
                        <p>We write \\(x_n \\to x\\) or \\(\\lim_{n \\to \\infty} x_n = x\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.2 (Uniqueness of Limits)</div>
                    <div class="env-body">
                        <p>If \\(x_n \\to x\\) and \\(x_n \\to y\\) in a metric space, then \\(x = y\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Let \\(\\epsilon > 0\\). There exist \\(N_1, N_2\\) such that \\(d(x_n, x) < \\epsilon/2\\) for \\(n \\geq N_1\\) and \\(d(x_n, y) < \\epsilon/2\\) for \\(n \\geq N_2\\). For \\(n \\geq \\max\\{N_1, N_2\\}\\), the triangle inequality gives</p>
                        \\[d(x,y) \\leq d(x, x_n) + d(x_n, y) < \\epsilon/2 + \\epsilon/2 = \\epsilon\\]
                        <p>Since \\(\\epsilon\\) was arbitrary, \\(d(x,y) = 0\\), so \\(x = y\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="convergence-viz"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.5 (Continuity)</div>
                    <div class="env-body">
                        <p>Let \\((M, d_M)\\) and \\((N, d_N)\\) be metric spaces. A function \\(f: M \\to N\\) is <strong>continuous at</strong> \\(x \\in M\\) if for every \\(\\epsilon > 0\\), there exists \\(\\delta > 0\\) such that</p>
                        \\[d_M(x, y) < \\delta \\implies d_N(f(x), f(y)) < \\epsilon\\]
                        <p>We say \\(f\\) is <strong>continuous</strong> if it is continuous at every point of \\(M\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.3 (Sequential Characterization of Continuity)</div>
                    <div class="env-body">
                        <p>A function \\(f: M \\to N\\) is continuous at \\(x\\) if and only if for every sequence \\((x_n)\\) in \\(M\\) with \\(x_n \\to x\\), we have \\(f(x_n) \\to f(x)\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>(\\(\\Rightarrow\\)) Suppose \\(f\\) is continuous at \\(x\\) and \\(x_n \\to x\\). Given \\(\\epsilon > 0\\), choose \\(\\delta > 0\\) such that \\(d_M(x,y) < \\delta \\implies d_N(f(x), f(y)) < \\epsilon\\). Since \\(x_n \\to x\\), there exists \\(N\\) with \\(d_M(x_n, x) < \\delta\\) for \\(n \\geq N\\). Thus \\(d_N(f(x_n), f(x)) < \\epsilon\\) for \\(n \\geq N\\), so \\(f(x_n) \\to f(x)\\).</p>
                        <p>(\\(\\Leftarrow\\)) Suppose \\(f\\) is not continuous at \\(x\\). Then there exists \\(\\epsilon > 0\\) such that for every \\(\\delta > 0\\), we can find \\(y\\) with \\(d_M(x,y) < \\delta\\) but \\(d_N(f(x), f(y)) \\geq \\epsilon\\). Taking \\(\\delta = 1/n\\), we construct a sequence \\(x_n \\to x\\) with \\(f(x_n) \\not\\to f(x)\\), contradicting the hypothesis.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.4 (Continuity of the Distance Function)</div>
                    <div class="env-body">
                        <p>The distance function \\(d: M \\times M \\to \\mathbb{R}\\) is continuous. That is, if \\(x_n \\to x\\) and \\(y_n \\to y\\), then \\(d(x_n, y_n) \\to d(x,y)\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>By the triangle inequality,</p>
                        \\[d(x_n, y_n) \\leq d(x_n, x) + d(x, y) + d(y, y_n)\\]
                        \\[d(x, y) \\leq d(x, x_n) + d(x_n, y_n) + d(y_n, y)\\]
                        <p>Thus</p>
                        \\[|d(x_n, y_n) - d(x,y)| \\leq d(x_n, x) + d(y_n, y) \\to 0\\]
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The topological characterization of continuity states that \\(f: M \\to N\\) is continuous if and only if the preimage of every open set is open, i.e., \\(f^{-1}(U)\\) is open in \\(M\\) whenever \\(U\\) is open in \\(N\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'convergence-viz',
                    title: 'Interactive: Convergent Sequence Animation',
                    description: 'Watch a sequence converge to its limit. The epsilon-band shows points within ε of the limit.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        let epsilon = 1.0;
                        let n = 1;
                        let isPlaying = false;
                        let animationId = null;

                        // Example sequence: x_n = 2 + 1/n + 0.3*sin(n)
                        function sequence(k) {
                            return 2 + 1/k + 0.3 * Math.sin(k);
                        }
                        const limit = 2;

                        const epsilonSlider = VizEngine.createSlider(controls, 'ε: ', 0.1, 3, epsilon, 0.1, (val) => {
                            epsilon = val;
                            draw();
                        });

                        const playButton = VizEngine.createButton(controls, 'Play', () => {
                            isPlaying = !isPlaying;
                            playButton.textContent = isPlaying ? 'Pause' : 'Play';
                            if (isPlaying) animate();
                        });

                        const resetButton = VizEngine.createButton(controls, 'Reset', () => {
                            n = 1;
                            isPlaying = false;
                            playButton.textContent = 'Play';
                            draw();
                        });

                        function animate() {
                            if (!isPlaying) return;
                            n = Math.min(n + 0.2, 50);
                            draw();
                            animationId = requestAnimationFrame(animate);
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw limit line
                            viz.drawSegment(-7, limit, 7, limit, viz.colors.green, 3, false);
                            viz.drawText('L = 2', -6.5, limit + 0.4, viz.colors.green, 16);

                            // Draw epsilon band
                            viz.drawSegment(-7, limit + epsilon, 7, limit + epsilon, viz.colors.yellow, 1, true);
                            viz.drawSegment(-7, limit - epsilon, 7, limit - epsilon, viz.colors.yellow, 1, true);
                            viz.drawText('L + ε', -6.5, limit + epsilon + 0.4, viz.colors.yellow, 14);
                            viz.drawText('L - ε', -6.5, limit - epsilon - 0.4, viz.colors.yellow, 14);

                            // Draw sequence points
                            const maxN = Math.floor(n);
                            for (let k = 1; k <= Math.min(maxN, 40); k++) {
                                const xPos = -6 + (k / 40) * 12;
                                const yVal = sequence(k);
                                const inEpsilon = Math.abs(yVal - limit) < epsilon;
                                const color = inEpsilon ? viz.colors.blue : viz.colors.red;
                                const radius = (k === maxN) ? 6 : 4;
                                viz.drawPoint(xPos, yVal, color, null, radius);

                                if (k === maxN) {
                                    viz.drawText(`n = ${k}`, xPos + 0.5, yVal + 0.5, viz.colors.text, 14);
                                }
                            }

                            // Find N such that |x_n - L| < epsilon for n >= N
                            let N = 1;
                            for (let k = 1; k <= 100; k++) {
                                if (Math.abs(sequence(k) - limit) < epsilon) {
                                    let allGood = true;
                                    for (let j = k; j <= 100; j++) {
                                        if (Math.abs(sequence(j) - limit) >= epsilon) {
                                            allGood = false;
                                            break;
                                        }
                                    }
                                    if (allGood) {
                                        N = k;
                                        break;
                                    }
                                }
                            }

                            viz.drawText(`For ε = ${epsilon.toFixed(1)}, N ≈ ${N}`, 0, -4.5, viz.colors.text, 16);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that in the discrete metric space, every function \\(f: M \\to N\\) is continuous.',
                    hint: 'For any \\(x\\) and \\(\\epsilon > 0\\), take \\(\\delta = 1\\). Then \\(B(x, \\delta) = \\{x\\}\\).',
                    solution: 'Let \\(x \\in M\\) and \\(\\epsilon > 0\\). Set \\(\\delta = 1\\). If \\(d_M(x,y) < \\delta = 1\\), then \\(y = x\\) in the discrete metric. Thus \\(f(y) = f(x)\\), so \\(d_N(f(x), f(y)) = 0 < \\epsilon\\). Therefore \\(f\\) is continuous at every point.'
                },
                {
                    question: 'Show that if \\(f: M \\to N\\) and \\(g: N \\to P\\) are continuous, then \\(g \\circ f: M \\to P\\) is continuous.',
                    hint: 'Use the sequential characterization: if \\(x_n \\to x\\), then \\(f(x_n) \\to f(x)\\), so \\(g(f(x_n)) \\to g(f(x))\\).',
                    solution: 'Let \\(x_n \\to x\\) in \\(M\\). Since \\(f\\) is continuous, \\(f(x_n) \\to f(x)\\) in \\(N\\). Since \\(g\\) is continuous, \\(g(f(x_n)) \\to g(f(x))\\) in \\(P\\). By the sequential characterization, \\(g \\circ f\\) is continuous.'
                },
                {
                    question: 'Let \\(M = C[0,1]\\) with the sup metric \\(d(f,g) = \\sup_{x \\in [0,1]} |f(x) - g(x)|\\). Define \\(\\Phi: M \\to \\mathbb{R}\\) by \\(\\Phi(f) = \\int_0^1 f(x)\\,dx\\). Prove that \\(\\Phi\\) is continuous.',
                    hint: 'Show that \\(|\\Phi(f) - \\Phi(g)| \\leq d(f,g)\\).',
                    solution: 'For \\(f, g \\in M\\), we have \\[|\\Phi(f) - \\Phi(g)| = \\left|\\int_0^1 (f(x) - g(x))\\,dx\\right| \\leq \\int_0^1 |f(x) - g(x)|\\,dx \\leq \\sup_{x \\in [0,1]} |f(x) - g(x)| = d(f,g).\\] Thus given \\(\\epsilon > 0\\), taking \\(\\delta = \\epsilon\\) works: \\(d(f,g) < \\delta\\) implies \\(|\\Phi(f) - \\Phi(g)| \\leq d(f,g) < \\epsilon\\).'
                }
            ]
        },
        {
            id: 'ch12-sec03',
            title: 'Completeness and Cauchy Sequences',
            content: `
                <h2>Completeness and Cauchy Sequences</h2>

                <p>Completeness is a crucial property that distinguishes spaces where analysis can be done effectively.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.6 (Cauchy Sequence)</div>
                    <div class="env-body">
                        <p>A sequence \\((x_n)\\) in a metric space \\((M, d)\\) is a <strong>Cauchy sequence</strong> if for every \\(\\epsilon > 0\\), there exists \\(N \\in \\mathbb{N}\\) such that</p>
                        \\[m, n \\geq N \\implies d(x_m, x_n) < \\epsilon\\]
                        <p>Intuitively, the terms of a Cauchy sequence get arbitrarily close to each other.</p>
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 12.1</div>
                    <div class="env-body">
                        <p>Every convergent sequence is Cauchy.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Suppose \\(x_n \\to x\\). Given \\(\\epsilon > 0\\), choose \\(N\\) such that \\(d(x_n, x) < \\epsilon/2\\) for \\(n \\geq N\\). Then for \\(m, n \\geq N\\),</p>
                        \\[d(x_m, x_n) \\leq d(x_m, x) + d(x, x_n) < \\epsilon/2 + \\epsilon/2 = \\epsilon\\]
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body">
                        <p>The converse is <strong>not</strong> true in general! A Cauchy sequence need not converge unless the space is complete.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.7 (Complete Metric Space)</div>
                    <div class="env-body">
                        <p>A metric space \\((M, d)\\) is <strong>complete</strong> if every Cauchy sequence in \\(M\\) converges to a point in \\(M\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.2 (Complete Spaces)</div>
                    <div class="env-body">
                        <p>The following are complete metric spaces:</p>
                        <ol>
                            <li>\\(\\mathbb{R}\\) and \\(\\mathbb{C}\\) with the usual metrics (fundamental theorem of analysis)</li>
                            <li>\\(\\mathbb{R}^n\\) with the Euclidean metric</li>
                            <li>The space \\(\\ell^2\\) of square-summable sequences</li>
                            <li>\\(C[a,b]\\) with the sup metric \\(d(f,g) = \\sup_{x \\in [a,b]} |f(x) - g(x)|\\)</li>
                            <li>The space \\(\\ell^\\infty\\) of bounded sequences with \\(d(x,y) = \\sup_n |x_n - y_n|\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.3 (Incomplete Space)</div>
                    <div class="env-body">
                        <p>The space \\((0,1)\\) with the usual metric is <strong>not complete</strong>. The sequence \\(x_n = 1/n\\) is Cauchy but does not converge to any point in \\((0,1)\\) (it converges to \\(0 \\notin (0,1)\\)).</p>
                        <p>Similarly, the rationals \\(\\mathbb{Q}\\) with the usual metric are not complete. For instance, the sequence defined by the continued fraction approximation to \\(\\sqrt{2}\\) is Cauchy in \\(\\mathbb{Q}\\) but converges to \\(\\sqrt{2} \\notin \\mathbb{Q}\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.5 (Completeness of Subspaces)</div>
                    <div class="env-body">
                        <p>Let \\(M\\) be a complete metric space and \\(S \\subseteq M\\). Then:</p>
                        <ol>
                            <li>If \\(S\\) is complete, then \\(S\\) is closed</li>
                            <li>If \\(S\\) is closed, then \\(S\\) is complete</li>
                        </ol>
                        <p>In other words, for subspaces of complete spaces, completeness is equivalent to closedness.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>(1) Suppose \\(S\\) is complete and let \\((x_n)\\) be a sequence in \\(S\\) converging to \\(x \\in M\\). Then \\((x_n)\\) is Cauchy in \\(S\\), so by completeness of \\(S\\), it converges to some \\(s \\in S\\). By uniqueness of limits, \\(x = s \\in S\\), so \\(S\\) is closed.</p>
                        <p>(2) Suppose \\(S\\) is closed and let \\((x_n)\\) be Cauchy in \\(S\\). Then \\((x_n)\\) is Cauchy in \\(M\\), so by completeness of \\(M\\), \\(x_n \\to x\\) for some \\(x \\in M\\). Since \\(S\\) is closed and \\((x_n) \\subseteq S\\), we have \\(x \\in S\\). Thus \\(S\\) is complete.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.6 (Nested Interval Property)</div>
                    <div class="env-body">
                        <p>A metric space \\((M,d)\\) is complete if and only if every nested sequence of non-empty closed sets with diameters tending to zero has a non-empty intersection containing exactly one point.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Completeness means the space has "no holes"—every sequence that ought to converge (because its terms get close together) actually does converge to a point in the space. This is essential for analysis: it allows us to define limits, integrals, and solutions to equations without worrying about escaping the space.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Prove that every Cauchy sequence is bounded.',
                    hint: 'Use the Cauchy property with \\(\\epsilon = 1\\) to show all but finitely many terms lie in a bounded set.',
                    solution: 'Let \\((x_n)\\) be Cauchy. Taking \\(\\epsilon = 1\\), there exists \\(N\\) such that \\(d(x_m, x_n) < 1\\) for all \\(m,n \\geq N\\). In particular, \\(d(x_n, x_N) < 1\\) for all \\(n \\geq N\\). Set \\(M = \\max\\{d(x_1, x_N), \\ldots, d(x_{N-1}, x_N), 1\\}\\). Then \\(d(x_n, x_N) \\leq M\\) for all \\(n\\), so the sequence is bounded.'
                },
                {
                    question: 'Show that \\(\\mathbb{R}^n\\) with the Euclidean metric is complete.',
                    hint: 'Show that a sequence is Cauchy in \\(\\mathbb{R}^n\\) if and only if each coordinate sequence is Cauchy in \\(\\mathbb{R}\\). Use completeness of \\(\\mathbb{R}\\).',
                    solution: 'Let \\((x^{(k)})\\) be Cauchy in \\(\\mathbb{R}^n\\) where \\(x^{(k)} = (x_1^{(k)}, \\ldots, x_n^{(k)})\\). For each \\(i\\), \\(|x_i^{(k)} - x_i^{(\\ell)}| \\leq \\|x^{(k)} - x^{(\\ell)}\\| \\to 0\\), so \\((x_i^{(k)})\\) is Cauchy in \\(\\mathbb{R}\\). By completeness of \\(\\mathbb{R}\\), \\(x_i^{(k)} \\to x_i\\) for some \\(x_i \\in \\mathbb{R}\\). Let \\(x = (x_1, \\ldots, x_n)\\). Then \\(\\|x^{(k)} - x\\|^2 = \\sum_i |x_i^{(k)} - x_i|^2 \\to 0\\), so \\(x^{(k)} \\to x\\) in \\(\\mathbb{R}^n\\).'
                },
                {
                    question: 'Let \\(M = C[0,1]\\) with metric \\(d(f,g) = \\int_0^1 |f(x) - g(x)|\\,dx\\). Show that \\(M\\) is not complete.',
                    hint: 'Consider a sequence of continuous functions approximating a discontinuous function, such as the indicator of \\([1/2, 1]\\).',
                    solution: 'Consider \\(f_n(x) = \\begin{cases} 0 & x \\in [0, 1/2 - 1/n] \\\\ n(x - 1/2 + 1/n) & x \\in [1/2 - 1/n, 1/2] \\\\ 1 & x \\in [1/2, 1] \\end{cases}\\). These are continuous and \\(d(f_m, f_n) \\to 0\\) as \\(m,n \\to \\infty\\), but \\(f_n\\) converges (in the \\(L^1\\) sense) to the discontinuous function \\(\\chi_{[1/2,1]}\\), which is not in \\(C[0,1]\\). Thus \\(M\\) is not complete.'
                }
            ]
        },
        {
            id: 'ch12-sec04',
            title: 'The Completion of a Metric Space',
            content: `
                <h2>The Completion of a Metric Space</h2>

                <p>Every metric space can be "completed" by adding limit points of Cauchy sequences.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.7 (Existence of Completion)</div>
                    <div class="env-body">
                        <p>Let \\((M, d)\\) be any metric space. Then there exists a complete metric space \\((\\overline{M}, \\overline{d})\\) and an isometry \\(\\iota: M \\to \\overline{M}\\) such that \\(\\iota(M)\\) is dense in \\(\\overline{M}\\). Moreover, \\(\\overline{M}\\) is unique up to isometric isomorphism.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The completion \\(\\overline{M}\\) consists of equivalence classes of Cauchy sequences in \\(M\\). Two Cauchy sequences are equivalent if their distance tends to zero. This construction is analogous to constructing \\(\\mathbb{R}\\) from \\(\\mathbb{Q}\\) using Dedekind cuts or Cauchy sequences.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Sketch)</div>
                    <div class="env-body">
                        <p><strong>Step 1: Define \\(\\overline{M}\\).</strong> Let \\(\\mathcal{C}(M)\\) be the set of all Cauchy sequences in \\(M\\). Define an equivalence relation on \\(\\mathcal{C}(M)\\) by</p>
                        \\[(x_n) \\sim (y_n) \\iff \\lim_{n \\to \\infty} d(x_n, y_n) = 0\\]
                        <p>Let \\(\\overline{M} = \\mathcal{C}(M) / {\\sim}\\) be the set of equivalence classes.</p>

                        <p><strong>Step 2: Define the metric.</strong> For \\([(x_n)], [(y_n)] \\in \\overline{M}\\), the sequence \\((d(x_n, y_n))\\) is Cauchy in \\(\\mathbb{R}\\) (by the reverse triangle inequality), hence converges. Define</p>
                        \\[\\overline{d}([(x_n)], [(y_n)]) = \\lim_{n \\to \\infty} d(x_n, y_n)\\]
                        <p>This is well-defined and satisfies the metric axioms.</p>

                        <p><strong>Step 3: Embed \\(M\\) in \\(\\overline{M}\\).</strong> Define \\(\\iota: M \\to \\overline{M}\\) by \\(\\iota(x) = [(x, x, x, \\ldots)]\\), the equivalence class of the constant sequence. Then</p>
                        \\[\\overline{d}(\\iota(x), \\iota(y)) = \\lim_{n \\to \\infty} d(x, y) = d(x,y)\\]
                        <p>so \\(\\iota\\) is an isometry.</p>

                        <p><strong>Step 4: \\(\\iota(M)\\) is dense.</strong> Let \\([(x_n)] \\in \\overline{M}\\) and \\(\\epsilon > 0\\). Since \\((x_n)\\) is Cauchy, there exists \\(N\\) such that \\(d(x_m, x_N) < \\epsilon\\) for all \\(m \\geq N\\). Then</p>
                        \\[\\overline{d}([(x_n)], \\iota(x_N)) = \\lim_{n \\to \\infty} d(x_n, x_N) \\leq \\epsilon\\]

                        <p><strong>Step 5: \\(\\overline{M}\\) is complete.</strong> Let \\((\\xi_k)\\) be a Cauchy sequence in \\(\\overline{M}\\) where \\(\\xi_k = [(x_n^{(k)})]\\). By density, choose \\(y_k \\in M\\) with \\(\\overline{d}(\\iota(y_k), \\xi_k) < 1/k\\). Then \\((y_k)\\) is Cauchy in \\(M\\), and \\(\\xi_k \\to [(y_k)]\\) in \\(\\overline{M}\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.4 (Completion of \\(\\mathbb{Q}\\))</div>
                    <div class="env-body">
                        <p>The completion of \\(\\mathbb{Q}\\) with the usual metric is \\(\\mathbb{R}\\). Every real number can be represented as the limit of a Cauchy sequence of rationals (e.g., decimal expansions).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="completion-viz"></div>

                <div class="env-block example">
                    <div class="env-title">Example 12.5 (Completing \\(C[0,1]\\) with \\(L^1\\) Metric)</div>
                    <div class="env-body">
                        <p>The completion of \\(C[0,1]\\) with respect to the \\(L^1\\) metric \\(d(f,g) = \\int_0^1 |f - g|\\) is the space \\(L^1[0,1]\\) of Lebesgue integrable functions. This space includes discontinuous functions.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The completion is universal in the following sense: any isometry from \\(M\\) into a complete space extends uniquely to an isometry from \\(\\overline{M}\\) into that space. This makes \\(\\overline{M}\\) the "smallest" complete space containing \\(M\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'completion-viz',
                    title: 'Interactive: Visualizing Completion',
                    description: 'See how Cauchy sequences in an incomplete space converge to "missing" points in the completion.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        let showCompletion = false;

                        const toggleButton = VizEngine.createButton(controls, 'Show Completion', () => {
                            showCompletion = !showCompletion;
                            toggleButton.textContent = showCompletion ? 'Hide Completion' : 'Show Completion';
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw (0,2) as incomplete space (missing x=1)
                            viz.drawSegment(0, 0, 0.95, 0, viz.colors.blue, 4, false);
                            viz.drawSegment(1.05, 0, 2, 0, viz.colors.blue, 4, false);

                            // Draw endpoints
                            viz.drawPoint(0, 0, viz.colors.blue, null, 6);
                            viz.drawPoint(2, 0, viz.colors.blue, null, 6);

                            // Draw "hole" at x=1
                            viz.drawPoint(1, 0, viz.colors.white, null, 6);
                            viz.drawText('M = (0,2) \\ {1}', 1, -1, viz.colors.blue, 16);

                            // Draw Cauchy sequence converging to 1
                            const limit = 1;
                            for (let n = 1; n <= 8; n++) {
                                const x = limit + 1 / (n + 1);
                                viz.drawPoint(x, 0.5 + n * 0.15, viz.colors.orange, `x${n}`, 5);
                                if (n > 1) {
                                    const xPrev = limit + 1 / n;
                                    viz.drawSegment(xPrev, 0.5 + (n-1) * 0.15, x, 0.5 + n * 0.15,
                                                  viz.colors.orange + '66', 1, true);
                                }
                            }

                            viz.drawText('Cauchy sequence', 2.5, 1.7, viz.colors.orange, 14);

                            if (showCompletion) {
                                // Show the completion by filling the hole
                                viz.drawPoint(1, 0, viz.colors.green, null, 8);
                                viz.drawText('1 ∉ M', 1, -0.5, viz.colors.red, 14);
                                viz.drawText('1 ∈ M̄', 1, 0.5, viz.colors.green, 14);

                                // Draw completed interval
                                viz.drawSegment(0, -2, 2, -2, viz.colors.green, 4, false);
                                viz.drawPoint(0, -2, viz.colors.green, null, 6);
                                viz.drawPoint(2, -2, viz.colors.green, null, 6);
                                viz.drawPoint(1, -2, viz.colors.green, null, 6);
                                viz.drawText('M̄ = [0,2]', 1, -2.7, viz.colors.green, 16);

                                // Arrow showing limit
                                viz.drawSegment(1 + 1/9, 1.7, 1, 0.3, viz.colors.green, 2, false);
                                viz.drawText('lim', 1.3, 1.5, viz.colors.green, 14);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that the relation \\((x_n) \\sim (y_n) \\iff \\lim_{n \\to \\infty} d(x_n, y_n) = 0\\) is an equivalence relation on the set of Cauchy sequences.',
                    hint: 'Check reflexivity, symmetry, and transitivity using properties of limits.',
                    solution: 'Reflexivity: \\(d(x_n, x_n) = 0 \\to 0\\). Symmetry: \\(d(x_n, y_n) = d(y_n, x_n)\\). Transitivity: If \\(d(x_n, y_n) \\to 0\\) and \\(d(y_n, z_n) \\to 0\\), then \\(d(x_n, z_n) \\leq d(x_n, y_n) + d(y_n, z_n) \\to 0 + 0 = 0\\).'
                },
                {
                    question: 'Show that if \\((x_n)\\) and \\((y_n)\\) are Cauchy sequences in \\((M,d)\\), then \\((d(x_n, y_n))\\) is a Cauchy sequence in \\(\\mathbb{R}\\).',
                    hint: 'Use the reverse triangle inequality: \\(|d(x_m, y_m) - d(x_n, y_n)| \\leq d(x_m, x_n) + d(y_m, y_n)\\).',
                    solution: 'By the reverse triangle inequality, \\(|d(x_m, y_m) - d(x_n, y_n)| \\leq d(x_m, x_n) + d(y_m, y_n)\\). Given \\(\\epsilon > 0\\), choose \\(N\\) such that \\(d(x_m, x_n) < \\epsilon/2\\) and \\(d(y_m, y_n) < \\epsilon/2\\) for \\(m,n \\geq N\\). Then \\(|d(x_m, y_m) - d(x_n, y_n)| < \\epsilon\\) for \\(m,n \\geq N\\), so \\((d(x_n, y_n))\\) is Cauchy in \\(\\mathbb{R}\\).'
                },
                {
                    question: 'What is the completion of \\((0, \\infty)\\) with the usual metric?',
                    hint: 'Consider what points are "missing" that could be limits of Cauchy sequences.',
                    solution: 'The completion is \\([0, \\infty)\\). The only missing point is \\(0\\), which is the limit of the Cauchy sequence \\(1/n\\). Since \\((0,\\infty)\\) already extends to \\(+\\infty\\), no point is added there.'
                }
            ]
        },
        {
            id: 'ch12-sec05',
            title: 'Compactness',
            content: `
                <h2>Compactness</h2>

                <p>Compactness is a topological property that generalizes the notion of closed and bounded subsets of Euclidean space.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.8 (Compactness)</div>
                    <div class="env-body">
                        <p>A subset \\(K\\) of a metric space \\(M\\) is <strong>compact</strong> if every open cover of \\(K\\) has a finite subcover. That is, if \\(K \\subseteq \\bigcup_{\\alpha \\in A} U_\\alpha\\) where each \\(U_\\alpha\\) is open, then there exist finitely many indices \\(\\alpha_1, \\ldots, \\alpha_n\\) such that \\(K \\subseteq U_{\\alpha_1} \\cup \\cdots \\cup U_{\\alpha_n}\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.9 (Sequential Compactness)</div>
                    <div class="env-body">
                        <p>A subset \\(K\\) of a metric space is <strong>sequentially compact</strong> if every sequence in \\(K\\) has a convergent subsequence whose limit is in \\(K\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.8 (Equivalence in Metric Spaces)</div>
                    <div class="env-body">
                        <p>In metric spaces, compactness and sequential compactness are equivalent.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>This equivalence fails in general topological spaces, but holds for all metric spaces. This makes working with compact sets in analysis particularly convenient.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.9 (Heine-Borel Theorem)</div>
                    <div class="env-body">
                        <p>A subset of \\(\\mathbb{R}^n\\) (with the usual metric) is compact if and only if it is closed and bounded.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body">
                        <p>The Heine-Borel theorem is <strong>specific to finite-dimensional Euclidean spaces</strong>. In infinite-dimensional spaces, closed and bounded sets need not be compact. For example, the closed unit ball in \\(\\ell^2\\) is not compact.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.10 (Properties of Compact Sets)</div>
                    <div class="env-body">
                        <p>Let \\(K\\) be a compact subset of a metric space \\(M\\). Then:</p>
                        <ol>
                            <li>\\(K\\) is closed and bounded</li>
                            <li>Every closed subset of \\(K\\) is compact</li>
                            <li>The continuous image of \\(K\\) is compact: if \\(f: K \\to N\\) is continuous, then \\(f(K)\\) is compact in \\(N\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 12.1 (Extreme Value Theorem)</div>
                    <div class="env-body">
                        <p>If \\(K\\) is compact and \\(f: K \\to \\mathbb{R}\\) is continuous, then \\(f\\) attains its maximum and minimum on \\(K\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Since \\(K\\) is compact and \\(f\\) is continuous, \\(f(K)\\) is a compact subset of \\(\\mathbb{R}\\). By Heine-Borel, \\(f(K)\\) is closed and bounded in \\(\\mathbb{R}\\). Let \\(M = \\sup f(K)\\). By boundedness, \\(M < \\infty\\). There exists a sequence \\(y_n \\in f(K)\\) with \\(y_n \\to M\\). Since \\(f(K)\\) is closed, \\(M \\in f(K)\\), so \\(f\\) attains its maximum. Similarly for the minimum.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.6 (Non-compact Sets)</div>
                    <div class="env-body">
                        <p>The following are <strong>not</strong> compact:</p>
                        <ol>
                            <li>\\((0,1)\\) in \\(\\mathbb{R}\\) (not closed)</li>
                            <li>\\([0, \\infty)\\) in \\(\\mathbb{R}\\) (not bounded)</li>
                            <li>The unit ball \\(\\{x \\in \\ell^2 : \\|x\\| \\leq 1\\}\\) (infinite-dimensional)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Compactness is a topological version of finiteness. Compact sets have many properties of finite sets: continuous functions on them are bounded and attain their extrema, sequences have convergent subsequences, and every family of closed sets with the finite intersection property has non-empty intersection. In analysis, compactness is often the key to making limiting arguments work.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Prove that every compact subset of a metric space is closed and bounded.',
                    hint: 'For boundedness, cover with balls \\(B(x_0, n)\\). For closedness, show the complement is open.',
                    solution: 'Boundedness: Fix \\(x_0 \\in K\\). Then \\(K \\subseteq \\bigcup_{n=1}^{\\infty} B(x_0, n)\\). By compactness, \\(K \\subseteq \\bigcup_{i=1}^{N} B(x_0, n_i) = B(x_0, \\max\\{n_1,\\ldots,n_N\\})\\), so \\(K\\) is bounded. Closedness: Let \\(x \\notin K\\). For each \\(y \\in K\\), choose disjoint balls \\(B(x, r_y)\\) and \\(B(y, r_y)\\). Then \\(\\{B(y, r_y)\\}_{y \\in K}\\) covers \\(K\\), so finitely many cover: \\(K \\subseteq B(y_1, r_{y_1}) \\cup \\cdots \\cup B(y_n, r_{y_n})\\). Let \\(r = \\min\\{r_{y_1}, \\ldots, r_{y_n}\\}\\). Then \\(B(x, r)\\) is disjoint from \\(K\\), so \\(M \\setminus K\\) is open.'
                },
                {
                    question: 'Show that a compact metric space is complete.',
                    hint: 'Use sequential compactness: every Cauchy sequence has a convergent subsequence.',
                    solution: 'Let \\((x_n)\\) be Cauchy in the compact space \\(K\\). By sequential compactness, \\((x_n)\\) has a convergent subsequence \\(x_{n_k} \\to x \\in K\\). Since \\((x_n)\\) is Cauchy and has a convergent subsequence, the entire sequence converges to \\(x\\). Thus \\(K\\) is complete.'
                },
                {
                    question: 'Prove that a continuous function \\(f: K \\to \\mathbb{R}\\) on a compact set \\(K\\) is uniformly continuous.',
                    hint: 'Use compactness to reduce continuity at every point to a finite cover.',
                    solution: 'Given \\(\\epsilon > 0\\), for each \\(x \\in K\\), choose \\(\\delta_x > 0\\) such that \\(d(x,y) < \\delta_x \\implies |f(x) - f(y)| < \\epsilon/2\\). The cover \\(\\{B(x, \\delta_x/2)\\}_{x \\in K}\\) has a finite subcover, say \\(B(x_1, \\delta_{x_1}/2), \\ldots, B(x_n, \\delta_{x_n}/2)\\). Set \\(\\delta = \\min\\{\\delta_{x_1}/2, \\ldots, \\delta_{x_n}/2\\}\\). If \\(d(y,z) < \\delta\\), then \\(y \\in B(x_i, \\delta_{x_i}/2)\\) for some \\(i\\), so \\(d(x_i, y) < \\delta_{x_i}/2\\) and \\(d(x_i, z) < \\delta_{x_i}\\), giving \\(|f(y) - f(z)| \\leq |f(y) - f(x_i)| + |f(x_i) - f(z)| < \\epsilon/2 + \\epsilon/2 = \\epsilon\\).'
                }
            ]
        },
        {
            id: 'ch12-sec06',
            title: 'The Banach Fixed Point Theorem',
            content: `
                <h2>The Banach Fixed Point Theorem</h2>

                <p>One of the most powerful and widely applicable results in analysis is the Banach fixed point theorem, also known as the contraction mapping theorem.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.10 (Contraction Mapping)</div>
                    <div class="env-body">
                        <p>Let \\((M, d)\\) be a metric space. A function \\(T: M \\to M\\) is a <strong>contraction</strong> (or <strong>contraction mapping</strong>) if there exists a constant \\(0 \\leq c < 1\\) such that</p>
                        \\[d(T(x), T(y)) \\leq c \\cdot d(x, y) \\text{ for all } x, y \\in M\\]
                        <p>The constant \\(c\\) is called the <strong>contraction constant</strong> or <strong>Lipschitz constant</strong>.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Note that the key condition is \\(c < 1\\). A contraction strictly decreases distances—it's more than just continuity. For example, \\(T(x) = x/2\\) on \\(\\mathbb{R}\\) is a contraction with \\(c = 1/2\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.11 (Banach Fixed Point Theorem)</div>
                    <div class="env-body">
                        <p>Let \\((M, d)\\) be a complete metric space and let \\(T: M \\to M\\) be a contraction with constant \\(c < 1\\). Then:</p>
                        <ol>
                            <li>\\(T\\) has a unique fixed point \\(x^* \\in M\\), i.e., \\(T(x^*) = x^*\\)</li>
                            <li>For any \\(x_0 \\in M\\), the sequence defined by \\(x_{n+1} = T(x_n)\\) converges to \\(x^*\\)</li>
                            <li>The rate of convergence satisfies \\(d(x_n, x^*) \\leq c^n d(x_0, x^*)\\)</li>
                            <li>A priori error estimate: \\(d(x_n, x^*) \\leq \\frac{c^n}{1-c} d(x_0, x_1)\\)</li>
                            <li>A posteriori error estimate: \\(d(x_n, x^*) \\leq \\frac{c}{1-c} d(x_{n-1}, x_n)\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>Existence:</strong> Pick any \\(x_0 \\in M\\) and define \\(x_{n+1} = T(x_n)\\). We show \\((x_n)\\) is Cauchy. For \\(n > m\\),</p>
                        \\[\\begin{align}
                        d(x_n, x_m) &\\leq d(x_n, x_{n-1}) + \\cdots + d(x_{m+1}, x_m) \\\\
                        &\\leq (c^{n-1} + \\cdots + c^m) d(x_1, x_0) \\\\
                        &= c^m \\frac{1 - c^{n-m}}{1-c} d(x_1, x_0) \\\\
                        &\\leq \\frac{c^m}{1-c} d(x_1, x_0) \\to 0
                        \\end{align}\\]
                        <p>Since \\(M\\) is complete, \\(x_n \\to x^*\\) for some \\(x^* \\in M\\). By continuity of \\(T\\),</p>
                        \\[T(x^*) = T(\\lim x_n) = \\lim T(x_n) = \\lim x_{n+1} = x^*\\]

                        <p><strong>Uniqueness:</strong> If \\(T(x^*) = x^*\\) and \\(T(y^*) = y^*\\), then</p>
                        \\[d(x^*, y^*) = d(T(x^*), T(y^*)) \\leq c \\cdot d(x^*, y^*)\\]
                        <p>Since \\(c < 1\\), this forces \\(d(x^*, y^*) = 0\\), so \\(x^* = y^*\\).</p>

                        <p><strong>Convergence rate:</strong> We have</p>
                        \\[d(x_{n+1}, x^*) = d(T(x_n), T(x^*)) \\leq c \\cdot d(x_n, x^*)\\]
                        <p>Iterating gives \\(d(x_n, x^*) \\leq c^n d(x_0, x^*)\\).</p>

                        <p><strong>Error estimates:</strong> Follow from the geometric series bounds and the triangle inequality.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="contraction-viz"></div>

                <div class="env-block example">
                    <div class="env-title">Example 12.7 (Solving Equations)</div>
                    <div class="env-body">
                        <p>Consider the equation \\(x = \\cos(x)\\) on \\([0,1]\\). Define \\(T(x) = \\cos(x)\\). Since \\(|T'(x)| = |\\sin(x)| \\leq \\sin(1) < 1\\) on \\([0,1]\\), \\(T\\) is a contraction. The Banach theorem guarantees a unique solution, and iterating \\(x_{n+1} = \\cos(x_n)\\) starting from any \\(x_0 \\in [0,1]\\) converges to \\(x^* \\approx 0.739\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.8 (Existence of Solutions to ODEs)</div>
                    <div class="env-body">
                        <p>The Picard-Lindelöf theorem on existence and uniqueness of solutions to ordinary differential equations</p>
                        \\[y' = f(t, y), \\quad y(t_0) = y_0\\]
                        <p>can be proved using the Banach fixed point theorem by converting the ODE to the integral equation</p>
                        \\[y(t) = y_0 + \\int_{t_0}^{t} f(s, y(s))\\,ds\\]
                        <p>and showing the integral operator is a contraction on a suitable complete space of functions.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The Banach fixed point theorem is a constructive existence theorem: it not only guarantees a solution exists, but gives an algorithm to find it. The proof shows that "Picard iteration" (repeatedly applying \\(T\\)) converges exponentially fast to the fixed point. This makes the theorem extremely useful in numerical analysis and applied mathematics.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'contraction-viz',
                    title: 'Interactive: Contraction Mapping Iteration',
                    description: 'Visualize the fixed point iteration for a contraction mapping. Click "Step" to iterate.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        let x = 5;
                        let history = [x];
                        let contractConst = 0.6;

                        // Contraction T(x) = 2 + c*(x - 2) with fixed point at x=2
                        function T(val) {
                            const fixedPt = 2;
                            return fixedPt + contractConst * (val - fixedPt);
                        }
                        const fixedPoint = 2;

                        const cSlider = VizEngine.createSlider(controls, 'Contraction c: ', 0.1, 0.9, contractConst, 0.1, (val) => {
                            contractConst = val;
                            reset();
                        });

                        const stepButton = VizEngine.createButton(controls, 'Step', () => {
                            x = T(x);
                            history.push(x);
                            draw();
                        });

                        const resetButton = VizEngine.createButton(controls, 'Reset', reset);

                        function reset() {
                            x = 5;
                            history = [x];
                            draw();
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw y = x line
                            viz.drawSegment(-1, -1, 7, 7, viz.colors.text + '44', 1, true);
                            viz.drawText('y = x', 6.5, 6.5, viz.colors.text, 14);

                            // Draw T(x) function
                            for (let t = -1; t <= 7; t += 0.1) {
                                const y = T(t);
                                viz.drawPoint(t, y, viz.colors.blue + '88', null, 2);
                            }
                            viz.drawText('y = T(x)', 6.5, T(6.5) + 0.5, viz.colors.blue, 14);

                            // Draw fixed point
                            viz.drawPoint(fixedPoint, fixedPoint, viz.colors.green, null, 8);
                            viz.drawText('x*', fixedPoint + 0.3, fixedPoint + 0.3, viz.colors.green, 16);

                            // Draw iteration path
                            if (history.length > 1) {
                                for (let i = 0; i < history.length - 1; i++) {
                                    const x1 = history[i];
                                    const y1 = T(x1);
                                    const x2 = history[i + 1];

                                    // Vertical line to T(x)
                                    viz.drawSegment(x1, x1, x1, y1, viz.colors.orange, 2, false);
                                    viz.drawPoint(x1, y1, viz.colors.orange, null, 4);

                                    // Horizontal line to y=x
                                    viz.drawSegment(x1, y1, x2, y1, viz.colors.orange, 2, false);
                                    viz.drawPoint(x2, y1, viz.colors.orange, null, 4);
                                }

                                // Current point
                                viz.drawPoint(x, x, viz.colors.red, null, 6);
                            } else {
                                viz.drawPoint(history[0], history[0], viz.colors.red, null, 6);
                            }

                            // Display info
                            viz.drawText(`n = ${history.length - 1}`, 5, -3.5, viz.colors.text, 16);
                            viz.drawText(`x_n = ${x.toFixed(4)}`, 5, -4.2, viz.colors.text, 16);
                            viz.drawText(`|x_n - x*| = ${Math.abs(x - fixedPoint).toFixed(4)}`, 5, -4.9, viz.colors.text, 16);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that \\(T(x) = \\frac{1}{2}(x + \\frac{a}{x})\\) is a contraction on \\([1, a]\\) for \\(a > 1\\), and use this to prove that the iteration converges to \\(\\sqrt{a}\\).',
                    hint: 'Compute \\(T\'(x) = \\frac{1}{2}(1 - \\frac{a}{x^2})\\) and show \\(|T\'(x)| < 1\\) on \\([1,a]\\).',
                    solution: 'We have \\(T\'(x) = \\frac{1}{2}(1 - \\frac{a}{x^2})\\). For \\(x \\in [1,a]\\), \\(x^2 \\geq 1\\), so \\(\\frac{a}{x^2} \\leq a\\). If \\(x \\geq \\sqrt{a}\\), then \\(T\'(x) \\leq 0\\). If \\(x < \\sqrt{a}\\), then \\(T\'(x) < \\frac{1}{2}(1 - 1) = 0\\). Actually, for \\(x \\in [\\sqrt{a}, a]\\), \\(|T\'(x)| = |\\frac{1}{2}(1 - \\frac{a}{x^2})| = \\frac{1}{2}(\\frac{a}{x^2} - 1) \\leq \\frac{1}{2}(\\frac{a}{a} - 1) = 0\\) when \\(x = a\\), and the maximum occurs at \\(x = \\sqrt{a}\\) giving \\(T\'(\\sqrt{a}) = 0\\). By MVT, \\(T\\) is a contraction. The fixed point satisfies \\(x = \\frac{1}{2}(x + \\frac{a}{x})\\), giving \\(x^2 = a\\), so \\(x = \\sqrt{a}\\).'
                },
                {
                    question: 'Let \\(M = C[0,1]\\) with sup metric. Define \\((Tf)(x) = \\frac{1}{2} + \\frac{1}{4}\\int_0^x f(t)\\,dt\\). Show \\(T\\) is a contraction and find its fixed point.',
                    hint: 'Compute \\(d(Tf, Tg)\\) and use \\(|\\int_0^x (f-g)| \\leq x \\cdot d(f,g)\\).',
                    solution: 'For \\(f, g \\in M\\), \\(|(Tf)(x) - (Tg)(x)| = \\frac{1}{4}|\\int_0^x (f(t) - g(t))\\,dt| \\leq \\frac{1}{4} \\int_0^x |f(t) - g(t)|\\,dt \\leq \\frac{1}{4} x \\cdot d(f,g) \\leq \\frac{1}{4} d(f,g)\\). Thus \\(d(Tf, Tg) \\leq \\frac{1}{4} d(f,g)\\), so \\(T\\) is a contraction with \\(c = 1/4\\). The fixed point satisfies \\(f(x) = \\frac{1}{2} + \\frac{1}{4}\\int_0^x f(t)\\,dt\\). Differentiating: \\(f\'(x) = \\frac{1}{4}f(x)\\) with \\(f(0) = 1/2\\), giving \\(f(x) = \\frac{1}{2}e^{x/4}\\).'
                },
                {
                    question: 'Give an example showing that the completeness assumption in the Banach fixed point theorem cannot be dropped.',
                    hint: 'Consider a contraction on an incomplete space where the iteration sequence converges to a point outside the space.',
                    solution: 'Let \\(M = (0, 1]\\) with the usual metric, and \\(T(x) = x/2\\). Then \\(T\\) is a contraction with constant \\(c = 1/2\\), and \\(T: M \\to M\\). However, starting from any \\(x_0 \\in M\\), the sequence \\(x_n = x_0/2^n \\to 0\\), which is not in \\(M\\). The unique fixed point \\(x = 0\\) lies outside \\(M\\), so \\(T\\) has no fixed point in \\(M\\). This shows completeness is essential.'
                }
            ]
        },
        {
            id: 'ch12-sec07',
            title: 'Separability and Dense Subsets',
            content: `
                <h2>Separability and Dense Subsets</h2>

                <p>Separability is a topological property that characterizes when a metric space is "not too large" in a certain sense.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.11 (Dense Subset)</div>
                    <div class="env-body">
                        <p>A subset \\(D\\) of a metric space \\(M\\) is <strong>dense</strong> in \\(M\\) if the closure of \\(D\\) equals \\(M\\), i.e., \\(\\overline{D} = M\\). Equivalently, for every \\(x \\in M\\) and every \\(\\epsilon > 0\\), there exists \\(d \\in D\\) with \\(d(x, d) < \\epsilon\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.12 (Separable Space)</div>
                    <div class="env-body">
                        <p>A metric space \\(M\\) is <strong>separable</strong> if it contains a countable dense subset.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.9 (Separable Spaces)</div>
                    <div class="env-body">
                        <ol>
                            <li>\\(\\mathbb{R}^n\\) is separable: \\(\\mathbb{Q}^n\\) (points with rational coordinates) is countable and dense</li>
                            <li>\\(C[0,1]\\) with the sup metric is separable: polynomials with rational coefficients are dense by the Weierstrass approximation theorem</li>
                            <li>\\(\\ell^2\\) is separable: sequences with finitely many non-zero rational entries form a countable dense set</li>
                            <li>Any countable metric space is separable (take \\(D = M\\))</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.10 (Non-separable Space)</div>
                    <div class="env-body">
                        <p>The space \\(\\ell^\\infty\\) of bounded sequences with the sup metric is <strong>not separable</strong>. Consider the set \\(S\\) of all sequences \\((x_n)\\) where each \\(x_n \\in \\{0, 1\\}\\). This set is uncountable (in bijection with \\(2^{\\mathbb{N}}\\)) and has the property that \\(d(x, y) = 1\\) for any two distinct elements \\(x, y \\in S\\). Therefore, the open balls \\(B(x, 1/2)\\) for \\(x \\in S\\) are mutually disjoint. No countable set can intersect all these uncountably many disjoint balls, so \\(\\ell^\\infty\\) has no countable dense subset.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.12</div>
                    <div class="env-body">
                        <p>Let \\(M\\) be a metric space. The following are equivalent:</p>
                        <ol>
                            <li>\\(M\\) is separable</li>
                            <li>\\(M\\) has a countable base for its topology</li>
                            <li>Every collection of disjoint open sets in \\(M\\) is countable</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 12.2</div>
                    <div class="env-body">
                        <p>Every separable metric space is a continuous image of the Cantor set (which is itself separable). Moreover, every compact metric space is separable.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Separability is preserved under taking subspaces, continuous images, and countable products. It is a useful property in functional analysis because separable spaces are more tractable—for instance, in a separable Hilbert space, every orthonormal basis is countable.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Separability means the space can be "approximated" by a countable set. This is analogous to how \\(\\mathbb{R}\\) can be approximated by \\(\\mathbb{Q}\\). Separable spaces are "small" in a topological sense, even if they are infinite-dimensional. Most spaces encountered in applications are separable, which allows us to use countable arguments and constructions.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Prove that \\(\\mathbb{Q}^n\\) is dense in \\(\\mathbb{R}^n\\) with the Euclidean metric.',
                    hint: 'Use the fact that \\(\\mathbb{Q}\\) is dense in \\(\\mathbb{R}\\) and approximate each coordinate.',
                    solution: 'Let \\(x = (x_1, \\ldots, x_n) \\in \\mathbb{R}^n\\) and \\(\\epsilon > 0\\). For each \\(i\\), since \\(\\mathbb{Q}\\) is dense in \\(\\mathbb{R}\\), choose \\(q_i \\in \\mathbb{Q}\\) with \\(|x_i - q_i| < \\epsilon/\\sqrt{n}\\). Then \\(q = (q_1, \\ldots, q_n) \\in \\mathbb{Q}^n\\) and \\(\\|x - q\\| = \\sqrt{\\sum_i (x_i - q_i)^2} < \\sqrt{n \\cdot (\\epsilon/\\sqrt{n})^2} = \\epsilon\\). Thus every point of \\(\\mathbb{R}^n\\) is a limit of points in \\(\\mathbb{Q}^n\\), so \\(\\mathbb{Q}^n\\) is dense.'
                },
                {
                    question: 'Show that every compact metric space is separable.',
                    hint: 'For each \\(n\\), cover the space with finitely many balls of radius \\(1/n\\) and take centers.',
                    solution: 'Let \\(K\\) be compact. For each \\(n \\in \\mathbb{N}\\), the cover \\(\\{B(x, 1/n) : x \\in K\\}\\) has a finite subcover, say \\(B(x_1^{(n)}, 1/n), \\ldots, B(x_{k_n}^{(n)}, 1/n)\\). Let \\(D = \\bigcup_{n=1}^{\\infty} \\{x_1^{(n)}, \\ldots, x_{k_n}^{(n)}\\}\\). Then \\(D\\) is countable (countable union of finite sets). For any \\(x \\in K\\) and \\(\\epsilon > 0\\), choose \\(n\\) with \\(1/n < \\epsilon\\). Then \\(x \\in B(x_i^{(n)}, 1/n)\\) for some \\(i\\), so \\(d(x, x_i^{(n)}) < 1/n < \\epsilon\\). Thus \\(D\\) is dense in \\(K\\), so \\(K\\) is separable.'
                },
                {
                    question: 'Prove that a subspace of a separable metric space is separable.',
                    hint: 'If \\(D\\) is countable and dense in \\(M\\), show that \\(D \\cap S\\) or a suitable modification is dense in \\(S\\).',
                    solution: 'Let \\(S \\subseteq M\\) where \\(M\\) is separable with countable dense subset \\(D\\). For each \\(d \\in D\\) and \\(n \\in \\mathbb{N}\\), if \\(B(d, 1/n) \\cap S \\neq \\emptyset\\), choose one point \\(s_{d,n} \\in B(d, 1/n) \\cap S\\). Let \\(D_S\\) be the set of all such \\(s_{d,n}\\). Then \\(D_S\\) is countable (subset of \\(D \\times \\mathbb{N}\\)). Given \\(s \\in S\\) and \\(\\epsilon > 0\\), choose \\(d \\in D\\) with \\(d(s, d) < \\epsilon/2\\) and \\(n\\) with \\(1/n < \\epsilon/2\\). Then \\(s \\in B(d, 1/n)\\), so \\(s_{d,n}\\) exists and \\(d(s, s_{d,n}) < 1/n < \\epsilon/2\\). Thus \\(D_S\\) is dense in \\(S\\).'
                }
            ]
        }
    ]
});
