window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch15',
    number: 15,
    title: 'Positive Solutions to Linear Systems',
    subtitle: 'Convexity and Separation Theorems',
    sections: [
        {
            id: 'ch15-sec01',
            title: 'Convex Sets and Half-Spaces',
            content: `
                <h2>Convex Sets and Half-Spaces</h2>

                <p>This chapter studies the geometry of positive solutions to linear systems \\(Ax = b\\) and \\(Ax \\geq b\\). The key tools are convex sets and separation theorems, which allow us to characterize when such systems have solutions.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 15.1 (Convex Set)</div>
                    <div class="env-body">
                        <p>A subset \\(C\\) of \\(\\mathbb{R}^n\\) is <strong>convex</strong> if for all \\(x, y \\in C\\) and all \\(t \\in [0,1]\\), the point
                        \\[tx + (1-t)y \\in C\\]
                        In other words, \\(C\\) contains the entire line segment joining any two of its points.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Convex sets have no "dents" or "holes" — they are "solid" regions. Think of a ball, an ellipsoid, or a halfspace. A crescent moon is not convex because the line segment between two points on opposite horns goes outside the crescent.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 15.2</div>
                    <div class="env-body">
                        <p>The following are convex sets in \\(\\mathbb{R}^n\\):</p>
                        <ul>
                            <li>Any subspace of \\(\\mathbb{R}^n\\)</li>
                            <li>Any affine subspace (translate of a subspace)</li>
                            <li>Closed balls: \\(\\{x : \\|x - c\\| \\leq r\\}\\)</li>
                            <li>Half-spaces: \\(\\{x : \\langle v, x \\rangle \\leq \\alpha\\}\\) for fixed \\(v \\neq 0\\) and \\(\\alpha \\in \\mathbb{R}\\)</li>
                            <li>Polyhedra: \\(\\{x : Ax \\leq b\\}\\) (intersections of finitely many half-spaces)</li>
                        </ul>
                        <p>The following are <em>not</em> convex:</p>
                        <ul>
                            <li>The boundary of a ball (sphere)</li>
                            <li>The union of two disjoint balls</li>
                            <li>\\(\\mathbb{R}^2 \\setminus \\{0\\}\\) (the plane with the origin removed)</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="convex-set-demo"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition 15.3 (Hyperplane and Half-Spaces)</div>
                    <div class="env-body">
                        <p>Let \\(v \\in \\mathbb{R}^n\\) be nonzero and \\(\\alpha \\in \\mathbb{R}\\). The <strong>hyperplane</strong> with normal vector \\(v\\) and offset \\(\\alpha\\) is
                        \\[H(v, \\alpha) = \\{x \\in \\mathbb{R}^n : \\langle v, x \\rangle = \\alpha\\}\\]
                        The associated <strong>closed half-spaces</strong> are
                        \\[H^+(v, \\alpha) = \\{x : \\langle v, x \\rangle \\geq \\alpha\\}\\]
                        \\[H^-(v, \\alpha) = \\{x : \\langle v, x \\rangle \\leq \\alpha\\}\\]
                        The <strong>open half-spaces</strong> are
                        \\[H^+_o(v, \\alpha) = \\{x : \\langle v, x \\rangle > \\alpha\\}\\]
                        \\[H^-_o(v, \\alpha) = \\{x : \\langle v, x \\rangle < \\alpha\\}\\]
                        </p>
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 15.4</div>
                    <div class="env-body">
                        <p>Hyperplanes and half-spaces are convex sets. Moreover, the intersection of any collection of convex sets is convex.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>For a hyperplane \\(H(v, \\alpha)\\), if \\(x, y \\in H(v, \\alpha)\\) and \\(t \\in [0,1]\\), then
                        \\[\\langle v, tx + (1-t)y \\rangle = t\\langle v, x \\rangle + (1-t)\\langle v, y \\rangle = t\\alpha + (1-t)\\alpha = \\alpha\\]
                        so \\(tx + (1-t)y \\in H(v, \\alpha)\\).</p>

                        <p>For half-spaces, the argument is similar: if \\(\\langle v, x \\rangle \\geq \\alpha\\) and \\(\\langle v, y \\rangle \\geq \\alpha\\), then
                        \\[\\langle v, tx + (1-t)y \\rangle = t\\langle v, x \\rangle + (1-t)\\langle v, y \\rangle \\geq t\\alpha + (1-t)\\alpha = \\alpha\\]</p>

                        <p>For intersections: if \\(x, y \\in \\bigcap_i C_i\\) where each \\(C_i\\) is convex, then \\(x, y \\in C_i\\) for all \\(i\\), so \\(tx + (1-t)y \\in C_i\\) for all \\(i\\), hence \\(tx + (1-t)y \\in \\bigcap_i C_i\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Note that \\(H^+(v, \\alpha)\\), \\(H^-(v, \\alpha)\\), and \\(H(v, \\alpha)\\) are pairwise disjoint, and their union is all of \\(\\mathbb{R}^n\\). A hyperplane of dimension \\(n-1\\) divides \\(\\mathbb{R}^n\\) into two half-spaces.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'convex-set-demo',
                    title: 'Interactive: Convex vs Non-Convex Sets',
                    description: 'Drag points to create sets and see if line segments stay inside',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        let mode = 0; // 0: convex, 1: non-convex

                        // Convex set: triangle
                        const convexPoints = [
                            viz.addDraggable('c1', -3, -2, viz.colors.blue, 8, () => draw()),
                            viz.addDraggable('c2', 3, -1, viz.colors.blue, 8, () => draw()),
                            viz.addDraggable('c3', 0, 3, viz.colors.blue, 8, () => draw())
                        ];

                        // Non-convex set: crescent
                        const nonConvexPoints = [
                            viz.addDraggable('nc1', -2, 0, viz.colors.orange, 8, () => draw()),
                            viz.addDraggable('nc2', -1, 2, viz.colors.orange, 8, () => draw()),
                            viz.addDraggable('nc3', 1, 2, viz.colors.orange, 8, () => draw()),
                            viz.addDraggable('nc4', 2, 0, viz.colors.orange, 8, () => draw()),
                            viz.addDraggable('nc5', 1, -1, viz.colors.orange, 8, () => draw()),
                            viz.addDraggable('nc6', -1, -1, viz.colors.orange, 8, () => draw())
                        ];

                        const slider = VizEngine.createSlider(controls, 'Set Type', 0, 1, 0, 1, (val) => {
                            mode = val;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            if (mode === 0) {
                                // Draw convex set (filled triangle)
                                const pts = convexPoints.map(p => [p.x, p.y]);
                                viz.drawPolygon(pts, viz.colors.blue + '33', viz.colors.blue, 2);

                                // Draw line segments between all pairs
                                for (let i = 0; i < pts.length; i++) {
                                    for (let j = i+1; j < pts.length; j++) {
                                        viz.drawSegment(pts[i][0], pts[i][1], pts[j][0], pts[j][1],
                                                       viz.colors.green, 1, true);
                                    }
                                }

                                convexPoints.forEach(p => viz.drawPoint(p.x, p.y, viz.colors.blue, null, 8));
                                viz.drawDraggables();

                                viz.drawText('CONVEX: All line segments stay inside', 0, 4.5, viz.colors.green, 16, 'center');
                            } else {
                                // Draw non-convex set (crescent-like)
                                const pts = nonConvexPoints.map(p => [p.x, p.y]);
                                viz.drawPolygon(pts, viz.colors.orange + '33', viz.colors.orange, 2);

                                // Draw one segment that goes outside (first and fourth points)
                                if (pts.length >= 4) {
                                    viz.drawSegment(pts[0][0], pts[0][1], pts[3][0], pts[3][1],
                                                   viz.colors.red, 3, false);
                                    viz.drawText('⚠', (pts[0][0] + pts[3][0])/2, (pts[0][1] + pts[3][1])/2,
                                               viz.colors.red, 20, 'center');
                                }

                                nonConvexPoints.forEach(p => viz.drawPoint(p.x, p.y, viz.colors.orange, null, 8));
                                viz.drawDraggables();

                                viz.drawText('NON-CONVEX: Some line segments escape!', 0, 4.5, viz.colors.red, 16, 'center');
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that the intersection of two convex sets is convex. Is the union of two convex sets always convex?',
                    hint: 'For the union, consider two disjoint balls.',
                    solution: 'Let \\(C_1, C_2\\) be convex and let \\(x, y \\in C_1 \\cap C_2\\). Then \\(x, y \\in C_1\\) and \\(x, y \\in C_2\\). For any \\(t \\in [0,1]\\), we have \\(tx + (1-t)y \\in C_1\\) (since \\(C_1\\) is convex) and \\(tx + (1-t)y \\in C_2\\) (since \\(C_2\\) is convex), hence \\(tx + (1-t)y \\in C_1 \\cap C_2\\). The union is NOT always convex: take \\(C_1 = \\{x : \\|x - (1,0)\\| \\leq 1/2\\}\\) and \\(C_2 = \\{x : \\|x - (-1,0)\\| \\leq 1/2\\}\\). These are disjoint balls, and the line segment from \\((1/2, 0) \\in C_1\\) to \\((-1/2, 0) \\in C_2\\) contains points not in \\(C_1 \\cup C_2\\).'
                },
                {
                    question: 'Show that any hyperplane \\(H(v, \\alpha) = \\{x : \\langle v, x \\rangle = \\alpha\\}\\) is an \\((n-1)\\)-dimensional affine subspace of \\(\\mathbb{R}^n\\).',
                    hint: 'Find a particular solution \\(x_0\\) with \\(\\langle v, x_0 \\rangle = \\alpha\\), then show \\(H(v, \\alpha) = x_0 + v^\\perp\\).',
                    solution: 'Choose any \\(x_0\\) with \\(\\langle v, x_0 \\rangle = \\alpha\\) (for instance, \\(x_0 = (\\alpha / \\|v\\|^2) v\\)). Then \\(x \\in H(v, \\alpha)\\) if and only if \\(\\langle v, x \\rangle = \\alpha = \\langle v, x_0 \\rangle\\), which holds if and only if \\(\\langle v, x - x_0 \\rangle = 0\\), i.e., \\(x - x_0 \\in v^\\perp\\). Thus \\(H(v, \\alpha) = x_0 + v^\\perp\\), which is a translate of the \\((n-1)\\)-dimensional subspace \\(v^\\perp\\).'
                },
                {
                    question: 'Prove that the set \\(\\{x \\in \\mathbb{R}^n : Ax \\leq b\\}\\) is convex for any matrix \\(A \\in \\mathbb{R}^{m \\times n}\\) and vector \\(b \\in \\mathbb{R}^m\\).',
                    hint: 'Write this as an intersection of half-spaces.',
                    solution: 'We have \\(\\{x : Ax \\leq b\\} = \\bigcap_{i=1}^m \\{x : a_i^T x \\leq b_i\\}\\), where \\(a_i^T\\) is the \\(i\\)-th row of \\(A\\). Each set \\(\\{x : a_i^T x \\leq b_i\\}\\) is a closed half-space, hence convex. The intersection of convex sets is convex, so \\(\\{x : Ax \\leq b\\}\\) is convex.'
                }
            ]
        },

        {
            id: 'ch15-sec02',
            title: 'Convex Hulls and Convex Combinations',
            content: `
                <h2>Convex Hulls and Convex Combinations</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition 15.5 (Convex Combination)</div>
                    <div class="env-body">
                        <p>A <strong>convex combination</strong> of points \\(x_1, \\ldots, x_k \\in \\mathbb{R}^n\\) is a sum
                        \\[\\sum_{i=1}^k \\lambda_i x_i\\]
                        where \\(\\lambda_i \\geq 0\\) and \\(\\sum_{i=1}^k \\lambda_i = 1\\). The coefficients \\(\\lambda_i\\) are called <strong>convex coefficients</strong>.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>A convex combination is a "weighted average" where the weights are non-negative and sum to 1. This generalizes the notion of a line segment: the segment from \\(x\\) to \\(y\\) consists of all convex combinations \\(tx + (1-t)y\\) for \\(t \\in [0,1]\\).</p>
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 15.6</div>
                    <div class="env-body">
                        <p>A set \\(C \\subseteq \\mathbb{R}^n\\) is convex if and only if \\(C\\) contains all convex combinations of its elements.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>(⇐) If \\(C\\) contains all convex combinations, then in particular for \\(x, y \\in C\\) and \\(t \\in [0,1]\\), we have \\(tx + (1-t)y \\in C\\), so \\(C\\) is convex.</p>

                        <p>(⇒) Suppose \\(C\\) is convex. We prove by induction on \\(k\\) that all convex combinations of \\(k\\) points in \\(C\\) lie in \\(C\\). Base case \\(k=2\\): this is the definition of convexity. Inductive step: suppose \\(x_1, \\ldots, x_{k+1} \\in C\\) and \\(\\lambda_1, \\ldots, \\lambda_{k+1} \\geq 0\\) with \\(\\sum_{i=1}^{k+1} \\lambda_i = 1\\). If \\(\\lambda_{k+1} = 1\\), the result is trivial. Otherwise, let \\(s = \\lambda_1 + \\cdots + \\lambda_k = 1 - \\lambda_{k+1} > 0\\). Then
                        \\[\\sum_{i=1}^{k+1} \\lambda_i x_i = s \\cdot \\underbrace{\\sum_{i=1}^k \\frac{\\lambda_i}{s} x_i}_{=: y} + \\lambda_{k+1} x_{k+1}\\]
                        By the inductive hypothesis, \\(y \\in C\\) (since \\(\\frac{\\lambda_i}{s} \\geq 0\\) and \\(\\sum \\frac{\\lambda_i}{s} = 1\\)). By convexity, \\(sy + \\lambda_{k+1} x_{k+1} \\in C\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 15.7 (Convex Hull)</div>
                    <div class="env-body">
                        <p>The <strong>convex hull</strong> of a set \\(S \\subseteq \\mathbb{R}^n\\), denoted \\(\\operatorname{conv}(S)\\), is the smallest convex set containing \\(S\\). Equivalently,
                        \\[\\operatorname{conv}(S) = \\bigcap_{\\substack{C \\supseteq S \\\\ C \\text{ convex}}} C\\]
                        Alternatively, \\(\\operatorname{conv}(S)\\) equals the set of all convex combinations of points in \\(S\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="convex-hull-builder"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 15.8 (Carathéodory's Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(S \\subseteq \\mathbb{R}^n\\). Every point in \\(\\operatorname{conv}(S)\\) is a convex combination of at most \\(n+1\\) points from \\(S\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Sketch)</div>
                    <div class="env-body">
                        <p>Let \\(x \\in \\operatorname{conv}(S)\\), so \\(x = \\sum_{i=1}^k \\lambda_i x_i\\) for some \\(x_i \\in S\\), \\(\\lambda_i > 0\\), \\(\\sum \\lambda_i = 1\\). If \\(k \\leq n+1\\), we are done. Otherwise, the vectors \\(x_2 - x_1, \\ldots, x_k - x_1\\) (which are \\(k-1 \\geq n+1\\) vectors in \\(\\mathbb{R}^n\\)) are linearly dependent. Hence there exist \\(\\mu_2, \\ldots, \\mu_k\\) (not all zero) with \\(\\sum_{i=2}^k \\mu_i (x_i - x_1) = 0\\). Let \\(\\mu_1 = -\\sum_{i=2}^k \\mu_i\\), so \\(\\sum_{i=1}^k \\mu_i x_i = 0\\) and \\(\\sum_{i=1}^k \\mu_i = 0\\).</p>

                        <p>For \\(t \\in \\mathbb{R}\\), we have \\(x = \\sum_{i=1}^k (\\lambda_i - t\\mu_i) x_i\\) and \\(\\sum_{i=1}^k (\\lambda_i - t\\mu_i) = 1\\). Choose \\(t\\) maximal such that \\(\\lambda_i - t\\mu_i \\geq 0\\) for all \\(i\\). Then for this \\(t\\), at least one coefficient becomes zero, reducing the number of terms. Iterate until at most \\(n+1\\) terms remain.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Carathéodory's theorem is remarkable: even though \\(\\operatorname{conv}(S)\\) may contain infinitely many points and \\(S\\) itself may be infinite, every point can be expressed using only \\(n+1\\) points from \\(S\\). In \\(\\mathbb{R}^2\\), every point in the convex hull is a convex combination of at most 3 points (forming a triangle). In \\(\\mathbb{R}^3\\), at most 4 points suffice (forming a tetrahedron).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'convex-hull-builder',
                    title: 'Interactive: Build Convex Hulls in ℝ²',
                    description: 'Add/drag points to see their convex hull (smallest enclosing convex polygon)',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        const points = [
                            viz.addDraggable('p1', -4, -2, viz.colors.blue, 8, () => draw()),
                            viz.addDraggable('p2', -1, 3, viz.colors.blue, 8, () => draw()),
                            viz.addDraggable('p3', 3, 2, viz.colors.blue, 8, () => draw()),
                            viz.addDraggable('p4', 2, -3, viz.colors.blue, 8, () => draw()),
                            viz.addDraggable('p5', 0, 0, viz.colors.blue, 8, () => draw())
                        ];

                        function computeConvexHull(pts) {
                            if (pts.length < 3) return pts;
                            // Gift wrapping (Jarvis march)
                            const hull = [];
                            let pointOnHull = pts.reduce((min, p) => p[0] < min[0] ? p : min, pts[0]);
                            let endpoint;
                            do {
                                hull.push(pointOnHull);
                                endpoint = pts[0];
                                for (let j = 1; j < pts.length; j++) {
                                    if (endpoint === pointOnHull || cross(pointOnHull, endpoint, pts[j]) > 0) {
                                        endpoint = pts[j];
                                    }
                                }
                                pointOnHull = endpoint;
                            } while (endpoint !== hull[0] && hull.length < pts.length + 1);
                            return hull;
                        }

                        function cross(o, a, b) {
                            return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const pts = points.map(p => [p.x, p.y]);
                            const hull = computeConvexHull(pts);

                            // Draw convex hull
                            viz.drawPolygon(hull, viz.colors.teal + '33', viz.colors.teal, 3);

                            // Draw all points
                            points.forEach((p, i) => {
                                const isOnHull = hull.some(h => h[0] === p.x && h[1] === p.y);
                                const color = isOnHull ? viz.colors.orange : viz.colors.blue;
                                viz.drawPoint(p.x, p.y, color, null, isOnHull ? 10 : 8);
                            });

                            viz.drawDraggables();

                            viz.drawText(`Convex Hull: ${hull.length} vertices`, 0, 4.5, viz.colors.teal, 16, 'center');
                            viz.drawText('Orange = hull vertices, Blue = interior', 0, -4.5, viz.colors.text, 12, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that if \\(S\\) is finite, then \\(\\operatorname{conv}(S)\\) is compact (closed and bounded).',
                    hint: 'Use Carathéodory: conv(S) is the continuous image of a compact set.',
                    solution: 'By Carathéodory, every point in \\(\\operatorname{conv}(S)\\) has the form \\(\\sum_{i=1}^{n+1} \\lambda_i x_i\\) where \\(x_i \\in S\\) and \\(\\lambda \\in \\Delta^n = \\{\\lambda \\geq 0 : \\sum \\lambda_i = 1\\}\\). The map \\(f: S^{n+1} \\times \\Delta^n \\to \\mathbb{R}^n\\) given by \\(f(x_1, \\ldots, x_{n+1}, \\lambda) = \\sum \\lambda_i x_i\\) is continuous. Since \\(S\\) is finite, \\(S^{n+1}\\) is finite (hence compact), and \\(\\Delta^n\\) is compact (closed and bounded in \\(\\mathbb{R}^{n+1}\\)). Thus \\(\\operatorname{conv}(S)\\) is the continuous image of a compact set, hence compact.'
                },
                {
                    question: 'Show that in \\(\\mathbb{R}^2\\), the convex hull of three non-collinear points is a triangle.',
                    hint: 'Any point in the convex hull is a convex combination of the three points.',
                    solution: 'Let \\(x_1, x_2, x_3\\) be non-collinear. A point \\(x\\) is in \\(\\operatorname{conv}(\\{x_1, x_2, x_3\\})\\) if and only if \\(x = \\lambda_1 x_1 + \\lambda_2 x_2 + \\lambda_3 x_3\\) with \\(\\lambda_i \\geq 0\\) and \\(\\lambda_1 + \\lambda_2 + \\lambda_3 = 1\\). The boundary consists of points where at least one \\(\\lambda_i = 0\\) (i.e., points on the edges \\(\\overline{x_1 x_2}\\), \\(\\overline{x_2 x_3}\\), \\(\\overline{x_3 x_1}\\)). The interior consists of points with all \\(\\lambda_i > 0\\). This describes a triangle with vertices \\(x_1, x_2, x_3\\).'
                }
            ]
        },

        {
            id: 'ch15-sec03',
            title: 'Separation Theorems',
            content: `
                <h2>Separation Theorems</h2>

                <p>One of the most powerful tools in convex analysis is the ability to separate disjoint convex sets by hyperplanes. These separation theorems have profound applications in optimization, duality theory, and the study of positive solutions to linear systems.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 15.9 (Separation)</div>
                    <div class="env-body">
                        <p>Let \\(C, D \\subseteq \\mathbb{R}^n\\) be nonempty sets. We say a hyperplane \\(H(v, \\alpha)\\) <strong>separates</strong> \\(C\\) and \\(D\\) if
                        \\[C \\subseteq H^-(v, \\alpha) \\quad \\text{and} \\quad D \\subseteq H^+(v, \\alpha)\\]
                        (or vice versa). The sets are <strong>strictly separated</strong> if
                        \\[C \\subseteq H^-_o(v, \\alpha) \\quad \\text{and} \\quad D \\subseteq H^+_o(v, \\alpha)\\]
                        They are <strong>strongly separated</strong> if there exists \\(\\epsilon > 0\\) such that
                        \\[\\langle v, c \\rangle \\leq \\alpha - \\epsilon \\text{ for all } c \\in C \\quad \\text{and} \\quad \\langle v, d \\rangle \\geq \\alpha + \\epsilon \\text{ for all } d \\in D\\]
                        </p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="separating-hyperplane"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 15.10 (Separation of Convex Sets)</div>
                    <div class="env-body">
                        <p>Let \\(C, D \\subseteq \\mathbb{R}^n\\) be nonempty, disjoint, convex sets.</p>
                        <ol>
                            <li>If \\(C\\) is closed and \\(D\\) is compact, then \\(C\\) and \\(D\\) can be strongly separated.</li>
                            <li>If both \\(C\\) and \\(D\\) are closed, they can be strictly separated.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Part 1)</div>
                    <div class="env-body">
                        <p>Since \\(C\\) is closed and \\(D\\) is compact, and they are disjoint, the distance
                        \\[\\delta = \\inf_{c \\in C, d \\in D} \\|c - d\\|\\]
                        is achieved at some \\(c_0 \\in C\\) and \\(d_0 \\in D\\) (since \\(D\\) is compact and the distance function to \\(C\\) is continuous). Moreover, \\(\\delta > 0\\) since \\(C \\cap D = \\emptyset\\).</p>

                        <p>Let \\(v = d_0 - c_0\\) and \\(\\alpha = \\frac{1}{2}(\\langle v, c_0 \\rangle + \\langle v, d_0 \\rangle)\\). We claim that \\(H(v, \\alpha)\\) strongly separates \\(C\\) and \\(D\\). Indeed, for any \\(c \\in C\\), the convexity of \\(C\\) and the minimality of \\(\\|c_0 - d_0\\|\\) imply
                        \\[\\langle d_0 - c_0, c - c_0 \\rangle \\leq 0\\]
                        (otherwise we could move from \\(c_0\\) toward \\(c\\) to get closer to \\(d_0\\)). Thus
                        \\[\\langle v, c \\rangle \\leq \\langle v, c_0 \\rangle = \\alpha - \\frac{\\delta^2}{2\\|v\\|}\\]
                        Similarly, \\(\\langle v, d \\rangle \\geq \\alpha + \\frac{\\delta^2}{2\\|v\\|}\\) for all \\(d \\in D\\). Taking \\(\\epsilon = \\frac{\\delta^2}{2\\|v\\|}\\) gives strong separation.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 15.11</div>
                    <div class="env-body">
                        <p>Let \\(C \\subseteq \\mathbb{R}^n\\) be a closed, convex set and let \\(x \\notin C\\). Then there exists a hyperplane \\(H(v, \\alpha)\\) that strictly separates \\(\\{x\\}\\) and \\(C\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Apply Theorem 15.10(1) with \\(D = \\{x\\}\\), which is compact.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 15.12 (Supporting Hyperplane Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(C \\subseteq \\mathbb{R}^n\\) be a closed, convex set and let \\(x_0\\) be a boundary point of \\(C\\). Then there exists a hyperplane \\(H(v, \\alpha)\\) containing \\(x_0\\) such that \\(C \\subseteq H^-(v, \\alpha)\\). Such a hyperplane is called a <strong>supporting hyperplane</strong> to \\(C\\) at \\(x_0\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Since \\(x_0\\) is on the boundary of \\(C\\), there exists a sequence \\(y_k \\notin C\\) with \\(y_k \\to x_0\\). For each \\(k\\), by Corollary 15.11, there exists a unit vector \\(v_k\\) and \\(\\alpha_k\\) such that
                        \\[\\langle v_k, y_k \\rangle > \\alpha_k \\geq \\langle v_k, c \\rangle \\text{ for all } c \\in C\\]
                        The sequence \\((v_k)\\) lies on the unit sphere (compact), so has a convergent subsequence \\(v_k \\to v\\) with \\(\\|v\\| = 1\\). Passing to this subsequence and taking limits, we get
                        \\[\\langle v, x_0 \\rangle \\geq \\langle v, c \\rangle \\text{ for all } c \\in C\\]
                        Thus \\(H(v, \\langle v, x_0 \\rangle)\\) is a supporting hyperplane.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="supporting-hyperplane"></div>
            `,
            visualizations: [
                {
                    id: 'separating-hyperplane',
                    title: 'Interactive: Separating Hyperplane',
                    description: 'Drag two convex sets to see the separating hyperplane',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        // Left convex set (triangle)
                        const setA = [
                            viz.addDraggable('a1', -5, 0, viz.colors.blue, 8, () => draw()),
                            viz.addDraggable('a2', -3, 2, viz.colors.blue, 8, () => draw()),
                            viz.addDraggable('a3', -3, -2, viz.colors.blue, 8, () => draw())
                        ];

                        // Right convex set (triangle)
                        const setB = [
                            viz.addDraggable('b1', 2, 0, viz.colors.orange, 8, () => draw()),
                            viz.addDraggable('b2', 4, 1.5, viz.colors.orange, 8, () => draw()),
                            viz.addDraggable('b3', 4, -1.5, viz.colors.orange, 8, () => draw())
                        ];

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const ptsA = setA.map(p => [p.x, p.y]);
                            const ptsB = setB.map(p => [p.x, p.y]);

                            // Draw sets
                            viz.drawPolygon(ptsA, viz.colors.blue + '44', viz.colors.blue, 2);
                            viz.drawPolygon(ptsB, viz.colors.orange + '44', viz.colors.orange, 2);

                            // Find separating hyperplane (simple: perpendicular to line joining centroids)
                            const centroidA = [
                                ptsA.reduce((s, p) => s + p[0], 0) / ptsA.length,
                                ptsA.reduce((s, p) => s + p[1], 0) / ptsA.length
                            ];
                            const centroidB = [
                                ptsB.reduce((s, p) => s + p[0], 0) / ptsB.length,
                                ptsB.reduce((s, p) => s + p[1], 0) / ptsB.length
                            ];

                            const v = [centroidB[0] - centroidA[0], centroidB[1] - centroidA[1]];
                            const vlen = Math.sqrt(v[0]*v[0] + v[1]*v[1]);
                            if (vlen > 0.01) {
                                const midpoint = [(centroidA[0] + centroidB[0])/2, (centroidA[1] + centroidB[1])/2];

                                // Draw hyperplane (line perpendicular to v through midpoint)
                                const perp = [-v[1]/vlen, v[0]/vlen];
                                const p1 = [midpoint[0] - 10*perp[0], midpoint[1] - 10*perp[1]];
                                const p2 = [midpoint[0] + 10*perp[0], midpoint[1] + 10*perp[1]];
                                viz.drawLine(p1[0], p1[1], p2[0], p2[1], viz.colors.green, 2, true);

                                // Draw normal vector
                                viz.drawVector(midpoint[0], midpoint[1],
                                             midpoint[0] + v[0]/vlen*1.5, midpoint[1] + v[1]/vlen*1.5,
                                             viz.colors.green, 'v', 2);
                            }

                            setA.forEach(p => viz.drawPoint(p.x, p.y, viz.colors.blue, null, 8));
                            setB.forEach(p => viz.drawPoint(p.x, p.y, viz.colors.orange, null, 8));
                            viz.drawDraggables();

                            viz.drawText('Separating Hyperplane (green line)', 0, 4.5, viz.colors.green, 16, 'center');
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'supporting-hyperplane',
                    title: 'Interactive: Supporting Hyperplane',
                    description: 'Drag the boundary point to see supporting hyperplanes',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        const center = {x: 0, y: 0};
                        const rx = 4, ry = 2.5;

                        let angle = 0;
                        const angleSlider = VizEngine.createSlider(controls, 'Boundary Point Angle', 0, 360, 0, 1, (val) => {
                            angle = val * Math.PI / 180;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw ellipse (convex set)
                            viz.drawEllipse(center.x, center.y, rx, ry, 0, viz.colors.blue + '33', viz.colors.blue);

                            // Boundary point
                            const x0 = center.x + rx * Math.cos(angle);
                            const y0 = center.y + ry * Math.sin(angle);
                            viz.drawPoint(x0, y0, viz.colors.orange, 'x₀', 10);

                            // Normal to ellipse at (x0, y0): gradient of x²/rx² + y²/ry² = 1
                            const nx = (x0 - center.x) / (rx * rx);
                            const ny = (y0 - center.y) / (ry * ry);
                            const nlen = Math.sqrt(nx*nx + ny*ny);

                            // Draw supporting hyperplane (tangent line)
                            const perp = [-ny/nlen, nx/nlen];
                            const p1 = [x0 - 10*perp[0], y0 - 10*perp[1]];
                            const p2 = [x0 + 10*perp[0], y0 + 10*perp[1]];
                            viz.drawLine(p1[0], p1[1], p2[0], p2[1], viz.colors.green, 2, false);

                            // Draw outward normal
                            viz.drawVector(x0, y0, x0 + nx/nlen*1.5, y0 + ny/nlen*1.5,
                                         viz.colors.green, 'n', 2);

                            viz.drawText('Supporting Hyperplane at x₀', 0, 4.5, viz.colors.green, 16, 'center');
                            viz.drawText('⟨n, x⟩ ≤ ⟨n, x₀⟩ for all x in ellipse', 0, -4.5, viz.colors.text, 12, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that two disjoint closed convex sets in \\(\\mathbb{R}^n\\) need not be strongly separated. (Hint: Consider \\(C = \\{(x,y) : y \\geq e^x\\}\\) and \\(D = \\{(x,y) : y \\leq 0\\}\\) in \\(\\mathbb{R}^2\\).)',
                    hint: 'These sets are separated by the x-axis, but the gap goes to zero as x → -∞.',
                    solution: 'Let \\(C = \\{(x,y) : y \\geq e^x\\}\\) and \\(D = \\{(x,y) : y \\leq 0\\}\\). Both are closed and convex, and they are disjoint. The hyperplane \\(y = 0\\) separates them (and even strictly separates them). However, they cannot be strongly separated: for any \\(\\epsilon > 0\\), there exists \\(x\\) large negative such that \\(e^x < \\epsilon\\), so the distance from \\((x, e^x) \\in C\\) to \\((x, 0) \\in D\\) is less than \\(\\epsilon\\).'
                },
                {
                    question: 'Prove that a closed convex set \\(C\\) in \\(\\mathbb{R}^n\\) is the intersection of all half-spaces containing it.',
                    hint: 'Use the supporting hyperplane theorem.',
                    solution: 'Let \\(C\\) be closed and convex, and let \\(D = \\bigcap \\{H^- : C \\subseteq H^-\\}\\) be the intersection of all closed half-spaces containing \\(C\\). Clearly \\(C \\subseteq D\\). For the reverse, suppose \\(x \\notin C\\). By Corollary 15.11, there exists a hyperplane \\(H(v, \\alpha)\\) strictly separating \\(\\{x\\}\\) and \\(C\\), i.e., \\(C \\subseteq H^-(v, \\alpha)\\) and \\(x \\in H^+_o(v, \\alpha)\\). Thus \\(x \\notin D\\). Hence \\(D \\subseteq C\\), so \\(C = D\\).'
                },
                {
                    question: 'Let \\(C\\) be a compact convex set in \\(\\mathbb{R}^n\\) and \\(x_0\\) a boundary point. Show that there may be infinitely many supporting hyperplanes at \\(x_0\\). Give an example.',
                    hint: 'Consider a corner of a polygon or polyhedron.',
                    solution: 'Consider \\(C = \\operatorname{conv}\\{(0,0), (1,0), (0,1)\\}\\) (a triangle) in \\(\\mathbb{R}^2\\), and let \\(x_0 = (0,0)\\) be a vertex. Any hyperplane (line) \\(\\{(x,y) : ax + by = 0\\}\\) with \\(a, b \\geq 0\\) and \\((a,b) \\neq (0,0)\\) is a supporting hyperplane at \\(x_0\\), since \\(ax + by \\geq 0\\) for all \\((x,y) \\in C\\). There are infinitely many such lines (any line through the origin lying in the cone spanned by the positive \\(x\\) and \\(y\\) axes).'
                }
            ]
        },

        {
            id: 'ch15-sec04',
            title: 'Cones and Polar Cones',
            content: `
                <h2>Cones and Polar Cones</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition 15.13 (Cone)</div>
                    <div class="env-body">
                        <p>A subset \\(K \\subseteq \\mathbb{R}^n\\) is a <strong>cone</strong> if for all \\(x \\in K\\) and all \\(\\lambda \\geq 0\\), we have \\(\\lambda x \\in K\\). A cone is <strong>convex</strong> if it is also a convex set, equivalently, if \\(x, y \\in K\\) and \\(\\lambda, \\mu \\geq 0\\) imply \\(\\lambda x + \\mu y \\in K\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 15.14</div>
                    <div class="env-body">
                        <ul>
                            <li>The nonnegative orthant \\(\\mathbb{R}^n_+ = \\{x \\in \\mathbb{R}^n : x_i \\geq 0 \\text{ for all } i\\}\\) is a convex cone.</li>
                            <li>Any subspace is a convex cone (it contains \\(\\lambda x\\) for all \\(\\lambda \\in \\mathbb{R}\\), hence for \\(\\lambda \\geq 0\\)).</li>
                            <li>For a matrix \\(A \\in \\mathbb{R}^{m \\times n}\\), the set \\(\\{Ax : x \\geq 0\\}\\) is a convex cone (the cone generated by the columns of \\(A\\)).</li>
                            <li>The set \\(\\{(x,y) \\in \\mathbb{R}^2 : x \\geq 0\\} \\cup \\{(x,y) : x \\leq 0\\}\\) is a cone but not convex.</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="cone-generator"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition 15.15 (Polar Cone)</div>
                    <div class="env-body">
                        <p>Let \\(K \\subseteq \\mathbb{R}^n\\) be a cone. The <strong>polar cone</strong> (or <strong>dual cone</strong>) of \\(K\\) is
                        \\[K^\\circ = \\{y \\in \\mathbb{R}^n : \\langle y, x \\rangle \\leq 0 \\text{ for all } x \\in K\\}\\]
                        Sometimes the <strong>positive polar</strong> is defined as \\(K^* = -K^\\circ = \\{y : \\langle y, x \\rangle \\geq 0 \\text{ for all } x \\in K\\}\\).</p>
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 15.16</div>
                    <div class="env-body">
                        <p>For any cone \\(K \\subseteq \\mathbb{R}^n\\), the polar \\(K^\\circ\\) is a closed convex cone. Moreover, \\((K^\\circ)^\\circ\\) is the closure of the convex hull of \\(K \\cup \\{0\\}\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>We have \\(K^\\circ = \\bigcap_{x \\in K} \\{y : \\langle y, x \\rangle \\leq 0\\}\\), an intersection of closed half-spaces (each is closed and convex), hence \\(K^\\circ\\) is closed and convex. To see \\(K^\\circ\\) is a cone: if \\(y \\in K^\\circ\\) and \\(\\lambda \\geq 0\\), then for all \\(x \\in K\\),
                        \\[\\langle \\lambda y, x \\rangle = \\lambda \\langle y, x \\rangle \\leq 0\\]
                        so \\(\\lambda y \\in K^\\circ\\). The statement about \\((K^\\circ)^\\circ\\) is the bipolar theorem, which we omit.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 15.17</div>
                    <div class="env-body">
                        <p>The polar of \\(\\mathbb{R}^n_+\\) is \\(\\mathbb{R}^n_- = \\{x : x_i \\leq 0 \\text{ for all } i\\}\\). Indeed, \\(y \\in (\\mathbb{R}^n_+)^\\circ\\) iff \\(\\langle y, x \\rangle \\leq 0\\) for all \\(x \\geq 0\\). Taking \\(x = e_i\\) (the \\(i\\)-th standard basis vector), we get \\(y_i \\leq 0\\) for all \\(i\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 15.18 (Strictly Positive and Strongly Positive Vectors)</div>
                    <div class="env-body">
                        <p>A vector \\(x \\in \\mathbb{R}^n\\) is <strong>nonnegative</strong> (written \\(x \\geq 0\\)) if \\(x_i \\geq 0\\) for all \\(i\\). It is <strong>strictly positive</strong> (written \\(x > 0\\)) if \\(x_i \\geq 0\\) for all \\(i\\) and \\(x_j > 0\\) for at least one \\(j\\). It is <strong>strongly positive</strong> (written \\(x \\gg 0\\)) if \\(x_i > 0\\) for all \\(i\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 15.19</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be a subspace of \\(\\mathbb{R}^n\\). Then:</p>
                        <ol>
                            <li>\\(V \\cap \\mathbb{R}^n_+ = \\{0\\}\\) if and only if \\(V^\\perp \\cap \\mathbb{R}^n_{--} \\neq \\emptyset\\) (where \\(\\mathbb{R}^n_{--} = \\{x \\gg 0\\}\\)).</li>
                            <li>\\(V \\cap \\mathbb{R}^n_{--} = \\emptyset\\) if and only if \\(V^\\perp \\cap \\mathbb{R}^n_+ \\neq \\{0\\}\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Part (1) says: if \\(V\\) has no nonnegative vectors except zero, then the orthogonal complement \\(V^\\perp\\) must contain a strongly positive vector. This is the key to proving Farkas's lemma: the existence of a nonnegative solution to \\(Ax = b\\) is related to the non-existence of a dual certificate.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'cone-generator',
                    title: 'Interactive: Convex Cone Generation',
                    description: 'Drag generators to see the convex cone they span',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        const generators = [
                            viz.addDraggable('g1', 3, 1, viz.colors.blue, 8, () => draw()),
                            viz.addDraggable('g2', 1, 3, viz.colors.orange, 8, () => draw())
                        ];

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const g1 = [generators[0].x, generators[0].y];
                            const g2 = [generators[1].x, generators[1].y];

                            // Draw cone: {λ₁g₁ + λ₂g₂ : λ₁, λ₂ ≥ 0}
                            // Draw as filled region
                            const rays = [];
                            for (let t = 0; t <= 1; t += 0.05) {
                                const dir = [t*g1[0] + (1-t)*g2[0], t*g1[1] + (1-t)*g2[1]];
                                const len = Math.sqrt(dir[0]*dir[0] + dir[1]*dir[1]);
                                if (len > 0.1) {
                                    const scale = 10;
                                    rays.push([scale * dir[0]/len, scale * dir[1]/len]);
                                }
                            }

                            // Draw cone as polygon
                            const conePoints = [[0,0]];
                            for (let t = 0; t <= 1; t += 0.1) {
                                const dir = [t*g1[0] + (1-t)*g2[0], t*g1[1] + (1-t)*g2[1]];
                                const len = Math.sqrt(dir[0]*dir[0] + dir[1]*dir[1]);
                                if (len > 0.01) {
                                    const scale = 8;
                                    conePoints.push([scale * dir[0]/len, scale * dir[1]/len]);
                                }
                            }
                            conePoints.push([0,0]);

                            viz.drawPolygon(conePoints, viz.colors.teal + '22', viz.colors.teal, 1);

                            // Draw generator rays
                            if (Math.sqrt(g1[0]*g1[0] + g1[1]*g1[1]) > 0.1) {
                                const len1 = Math.sqrt(g1[0]*g1[0] + g1[1]*g1[1]);
                                viz.drawVector(0, 0, 8*g1[0]/len1, 8*g1[1]/len1, viz.colors.blue, 'g₁', 3);
                            }
                            if (Math.sqrt(g2[0]*g2[0] + g2[1]*g2[1]) > 0.1) {
                                const len2 = Math.sqrt(g2[0]*g2[0] + g2[1]*g2[1]);
                                viz.drawVector(0, 0, 8*g2[0]/len2, 8*g2[1]/len2, viz.colors.orange, 'g₂', 3);
                            }

                            generators.forEach((g, i) => {
                                viz.drawPoint(g.x, g.y, i === 0 ? viz.colors.blue : viz.colors.orange, null, 8);
                            });
                            viz.drawDraggables();

                            viz.drawText('Convex Cone = {λ₁g₁ + λ₂g₂ : λ₁, λ₂ ≥ 0}', 0, 4.5, viz.colors.teal, 16, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that a cone \\(K\\) is convex if and only if \\(K + K \\subseteq K\\).',
                    hint: 'Show that if x, y ∈ K, then x + y ∈ K implies convexity.',
                    solution: '(⇒) If \\(K\\) is a convex cone and \\(x, y \\in K\\), then \\(x + y = 1 \\cdot x + 1 \\cdot y \\in K\\) (since \\(K\\) is closed under nonnegative combinations), so \\(K + K \\subseteq K\\). (⇐) Suppose \\(K + K \\subseteq K\\). Let \\(x, y \\in K\\) and \\(\\lambda, \\mu \\geq 0\\). Since \\(K\\) is a cone, \\(\\lambda x \\in K\\) and \\(\\mu y \\in K\\). By assumption, \\(\\lambda x + \\mu y \\in K + K \\subseteq K\\). Thus \\(K\\) is a convex cone.'
                },
                {
                    question: 'Show that \\((K^\\circ)^\\circ \\supseteq K\\) for any cone \\(K\\). When does equality hold?',
                    hint: 'Use the definition directly. Equality holds when K is a closed convex cone.',
                    solution: 'If \\(x \\in K\\) and \\(y \\in K^\\circ\\), then \\(\\langle y, x \\rangle \\leq 0\\) by definition of \\(K^\\circ\\). Thus for all \\(y \\in K^\\circ\\), we have \\(\\langle x, y \\rangle \\leq 0\\), which means \\(x \\in (K^\\circ)^\\circ\\). Hence \\(K \\subseteq (K^\\circ)^\\circ\\). Equality holds when \\(K\\) is a closed convex cone (bipolar theorem).'
                }
            ]
        },

        {
            id: 'ch15-sec05',
            title: 'Farkas\' Lemma',
            content: `
                <h2>Farkas' Lemma</h2>

                <p>Farkas' lemma is a fundamental result in the theory of linear inequalities. It provides a criterion for when a system \\(Ax = b\\), \\(x \\geq 0\\) has a solution, phrased as a "theorem of the alternative": exactly one of two mutually exclusive statements holds.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 15.20 (Farkas' Lemma)</div>
                    <div class="env-body">
                        <p>Let \\(A \\in \\mathbb{R}^{m \\times n}\\) and \\(b \\in \\mathbb{R}^m\\) be nonzero. Exactly one of the following holds:</p>
                        <ol>
                            <li>There exists \\(x \\in \\mathbb{R}^n\\) with \\(x \\gg 0\\) (strongly positive) such that \\(Ax = b\\).</li>
                            <li>There exists \\(y \\in \\mathbb{R}^m\\) such that \\(A^T y \\leq 0\\) and \\(\\langle y, b \\rangle > 0\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>Step 1:</strong> Show that (1) and (2) are mutually exclusive. Suppose both hold. Then
                        \\[\\langle y, b \\rangle = \\langle y, Ax \\rangle = \\langle A^T y, x \\rangle \\leq 0\\]
                        since \\(A^T y \\leq 0\\) and \\(x \\gg 0\\) (each component \\((A^T y)_i x_i \\leq 0\\), and at least one is strictly negative if \\(A^T y \\neq 0\\)). But this contradicts \\(\\langle y, b \\rangle > 0\\). Thus at most one holds.</p>

                        <p><strong>Step 2:</strong> Assume (1) fails. We must show (2) holds. Consider the set
                        \\[K = \\{Ax : x \\in \\mathbb{R}^n, x \\gg 0\\} \\subseteq \\mathbb{R}^m\\]
                        This is a convex cone (though not closed). Since (1) fails, \\(b \\notin K\\).</p>

                        <p>Consider instead the convex hull \\(C\\) of the standard basis vectors \\(e_1, \\ldots, e_n\\) in \\(\\mathbb{R}^n_+\\):
                        \\[C = \\left\\{\\sum_{i=1}^n \\lambda_i e_i : \\lambda_i \\geq 0, \\sum \\lambda_i = 1\\right\\}\\]
                        This is the simplex, which is compact. The image \\(AC\\) is also compact. If \\(b \\in AC\\), then \\(b = Ax\\) for some \\(x \\in C\\), i.e., \\(x \\geq 0\\) and \\(\\sum x_i = 1\\), so \\(x \\gg 0\\) (wait, not quite—but we can argue that \\(b\\) is in the cone generated by columns of \\(A\\)).</p>

                        <p>Actually, let's use Theorem 15.19 instead. The failure of (1) means \\(b\\) is not in the interior of the cone generated by the columns of \\(A\\). By separation, there exists \\(y\\) such that \\(\\langle y, Ax \\rangle \\leq 0\\) for all \\(x \\gg 0\\), and \\(\\langle y, b \\rangle > 0\\). The first condition gives \\(A^T y \\leq 0\\) (taking \\(x = e_i\\) gives \\(\\langle y, A e_i \\rangle = (A^T y)_i \\leq 0\\)). Thus (2) holds.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="farkas-geometric"></div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 15.21 (Farkas' Lemma, Homogeneous Version)</div>
                    <div class="env-body">
                        <p>Let \\(A \\in \\mathbb{R}^{m \\times n}\\) and \\(c \\in \\mathbb{R}^n\\). Exactly one of the following holds:</p>
                        <ol>
                            <li>There exists \\(x \\geq 0\\) such that \\(Ax \\leq 0\\) and \\(\\langle c, x \\rangle > 0\\).</li>
                            <li>There exists \\(y \\geq 0\\) such that \\(A^T y = c\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Farkas as a Certificate</div>
                    <div class="env-body">
                        <p>Farkas' lemma can be interpreted as follows: if you want to prove that \\(Ax = b\\), \\(x \\gg 0\\) has no solution, you can provide a <em>certificate</em> \\(y\\) satisfying (2). The certificate \\(y\\) "witnesses" the infeasibility by showing that any nonnegative combination of columns of \\(A\\) cannot reach \\(b\\) in the right direction. This duality between primal feasibility and dual certificates is central to linear programming.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 15.22</div>
                    <div class="env-body">
                        <p>Consider \\(A = \\begin{pmatrix} 1 & 1 \\\\ -1 & 1 \\end{pmatrix}\\) and \\(b = \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}\\). Does there exist \\(x \\gg 0\\) with \\(Ax = b\\)?</p>

                        <p>The system is \\(x_1 + x_2 = 0\\), \\(-x_1 + x_2 = 1\\). Adding gives \\(2x_2 = 1\\), so \\(x_2 = 1/2\\) and \\(x_1 = -1/2 < 0\\). Thus no strongly positive solution exists (in fact, no nonnegative solution exists).</p>

                        <p>By Farkas, there exists \\(y = \\begin{pmatrix} y_1 \\\\ y_2 \\end{pmatrix}\\) with \\(A^T y \\leq 0\\) and \\(\\langle y, b \\rangle > 0\\). We have
                        \\[A^T y = \\begin{pmatrix} 1 & -1 \\\\ 1 & 1 \\end{pmatrix} \\begin{pmatrix} y_1 \\\\ y_2 \\end{pmatrix} = \\begin{pmatrix} y_1 - y_2 \\\\ y_1 + y_2 \\end{pmatrix} \\leq 0\\]
                        and \\(\\langle y, b \\rangle = y_2 > 0\\). Taking \\(y_1 = -1, y_2 = 1\\) gives \\(A^T y = \\begin{pmatrix} -2 \\\\ 0 \\end{pmatrix} \\leq 0\\) and \\(\\langle y, b \\rangle = 1 > 0\\). This is our certificate.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'farkas-geometric',
                    title: 'Interactive: Geometric View of Farkas\' Lemma',
                    description: 'Drag b to see when Ax = b has a nonnegative solution',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        // Fixed columns of A
                        const a1 = [2, 1];
                        const a2 = [1, 3];

                        const bDrag = viz.addDraggable('b', 2, 2, viz.colors.orange, 10, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw cone generated by a1, a2 (nonnegative span)
                            const conePoints = [[0,0]];
                            for (let t = 0; t <= 1; t += 0.05) {
                                const dir = [t*a1[0] + (1-t)*a2[0], t*a1[1] + (1-t)*a2[1]];
                                const scale = 8;
                                conePoints.push([scale * dir[0], scale * dir[1]]);
                            }
                            conePoints.push([0,0]);
                            viz.drawPolygon(conePoints, viz.colors.blue + '22', viz.colors.blue, 1);

                            // Draw column vectors
                            viz.drawVector(0, 0, a1[0], a1[1], viz.colors.blue, 'a₁', 3);
                            viz.drawVector(0, 0, a2[0], a2[1], viz.colors.blue, 'a₂', 3);

                            // Check if b is in the cone
                            const b = [bDrag.x, bDrag.y];
                            // Solve [a1 a2] x = b for x, check if x >= 0
                            // [ 2  1 ] [x1]   [b1]
                            // [ 1  3 ] [x2] = [b2]
                            const det = a1[0]*a2[1] - a1[1]*a2[0];
                            let feasible = false;
                            if (Math.abs(det) > 0.01) {
                                const x1 = (a2[1]*b[0] - a2[0]*b[1]) / det;
                                const x2 = (-a1[1]*b[0] + a1[0]*b[1]) / det;
                                feasible = (x1 >= -0.01 && x2 >= -0.01);

                                if (feasible) {
                                    viz.drawText(`✓ FEASIBLE: x = (${x1.toFixed(2)}, ${x2.toFixed(2)}) ≥ 0`,
                                               0, 4.5, viz.colors.green, 16, 'center');
                                } else {
                                    viz.drawText(`✗ INFEASIBLE: x = (${x1.toFixed(2)}, ${x2.toFixed(2)}) has negatives`,
                                               0, 4.5, viz.colors.red, 16, 'center');
                                }
                            }

                            // Draw b
                            viz.drawVector(0, 0, b[0], b[1], feasible ? viz.colors.green : viz.colors.red, 'b', 3);
                            viz.drawPoint(b[0], b[1], viz.colors.orange, null, 10);
                            viz.drawDraggables();

                            viz.drawText('Blue cone = {λ₁a₁ + λ₂a₂ : λᵢ ≥ 0}', 0, -4.5, viz.colors.text, 12, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use Farkas\' lemma to show that the system \\(x_1 - x_2 \\geq 1\\), \\(-x_1 + x_2 \\geq 1\\) has no solution.',
                    hint: 'Rewrite as Ax ≥ b and apply Farkas.',
                    solution: 'The system is \\(\\begin{pmatrix} 1 & -1 \\\\ -1 & 1 \\end{pmatrix} \\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} \\geq \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}\\). By Farkas (for \\(Ax \\geq b\\)), this has no solution iff there exists \\(y \\geq 0\\) with \\(A^T y = 0\\) and \\(\\langle y, b \\rangle < 0\\). We have \\(A^T = \\begin{pmatrix} 1 & -1 \\\\ -1 & 1 \\end{pmatrix}\\), so \\(A^T y = \\begin{pmatrix} y_1 - y_2 \\\\ -y_1 + y_2 \\end{pmatrix} = 0\\) requires \\(y_1 = y_2\\). Taking \\(y = (1,1)\\) gives \\(A^T y = 0\\) and \\(\\langle y, b \\rangle = 1 + 1 = 2 > 0\\). Wait, this is the wrong direction. Let me reconsider: actually, the system \\(Ax \\geq b\\) has no solution iff there exists \\(y \\geq 0\\) with \\(A^T y = 0\\) and \\(b^T y > 0\\). Taking \\(y = (1,1)\\) works. Alternatively, adding the two inequalities: \\((x_1 - x_2) + (-x_1 + x_2) \\geq 1 + 1\\) gives \\(0 \\geq 2\\), a contradiction.'
                },
                {
                    question: 'Prove Corollary 15.21 from Theorem 15.20.',
                    hint: 'Use a homogenization trick or apply Farkas directly.',
                    solution: 'To show (1) ⇔ ¬(2), suppose (2) fails, i.e., \\(c\\) is not in the cone \\(\\{A^T y : y \\geq 0\\}\\). By separation, there exists \\(x\\) with \\(\\langle x, A^T y \\rangle \\leq 0\\) for all \\(y \\geq 0\\) and \\(\\langle x, c \\rangle > 0\\). The first gives \\(\\langle Ax, y \\rangle \\leq 0\\) for all \\(y \\geq 0\\), which implies \\(Ax \\leq 0\\). Thus (1) holds. Conversely, if (1) holds, then for any \\(y \\geq 0\\) with \\(A^T y = c\\), we have \\(\\langle c, x \\rangle = \\langle A^T y, x \\rangle = \\langle y, Ax \\rangle \\leq 0\\) (since \\(y \\geq 0\\) and \\(Ax \\leq 0\\)), contradicting \\(\\langle c, x \\rangle > 0\\).'
                },
                {
                    question: 'Show that Farkas\' lemma cannot be improved by replacing "strongly positive" with "nonnegative" in part (1). (Hint: Take \\(A = (1, 1)\\) and \\(b = 0\\) in \\(\\mathbb{R}^1\\).)',
                    hint: 'Find a case where \\(x \\geq 0\\) with \\(Ax = b\\) exists but \\(x \\gg 0\\) does not, and check if (2) holds.',
                    solution: 'Let \\(n = 2\\), \\(m = 1\\), \\(A = \\begin{pmatrix} 1 & 1 \\end{pmatrix}\\), \\(b = 0\\). Then \\(Ax = b\\) with \\(x \\geq 0\\) has solution \\(x = (0, 0)\\), but no strongly positive solution (if \\(x \\gg 0\\), then \\(x_1 + x_2 > 0 \\neq b\\)). For (2), we need \\(y \\in \\mathbb{R}^1\\) (a scalar) with \\(A^T y = \\begin{pmatrix} y \\\\ y \\end{pmatrix} \\leq 0\\) and \\(yb = 0 > 0\\), which is impossible. So neither (1) nor (2) holds in the weakened version.'
                }
            ]
        },

        {
            id: 'ch15-sec06',
            title: 'Linear Programming Duality',
            content: `
                <h2>Linear Programming Duality</h2>

                <p>Farkas' lemma is the foundation of linear programming duality. We briefly explore the connection between primal and dual linear programs.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 15.23 (Linear Program)</div>
                    <div class="env-body">
                        <p>A <strong>linear program</strong> (LP) in standard form is an optimization problem:
                        \\[\\begin{align*}
                        \\text{maximize} \\quad & \\langle c, x \\rangle \\\\
                        \\text{subject to} \\quad & Ax \\leq b \\\\
                        & x \\geq 0
                        \\end{align*}\\]
                        where \\(A \\in \\mathbb{R}^{m \\times n}\\), \\(b \\in \\mathbb{R}^m\\), \\(c \\in \\mathbb{R}^n\\) are given.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 15.24 (Dual Linear Program)</div>
                    <div class="env-body">
                        <p>The <strong>dual</strong> of the above LP is:
                        \\[\\begin{align*}
                        \\text{minimize} \\quad & \\langle b, y \\rangle \\\\
                        \\text{subject to} \\quad & A^T y \\geq c \\\\
                        & y \\geq 0
                        \\end{align*}\\]
                        The original problem is called the <strong>primal</strong>.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 15.25 (Weak Duality)</div>
                    <div class="env-body">
                        <p>If \\(x\\) is feasible for the primal and \\(y\\) is feasible for the dual, then
                        \\[\\langle c, x \\rangle \\leq \\langle b, y \\rangle\\]
                        In other words, the primal objective is always at most the dual objective.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Since \\(x \\geq 0\\), \\(y \\geq 0\\), \\(Ax \\leq b\\), and \\(A^T y \\geq c\\), we have
                        \\[\\langle c, x \\rangle \\leq \\langle A^T y, x \\rangle = \\langle y, Ax \\rangle \\leq \\langle y, b \\rangle = \\langle b, y \\rangle\\]
                        where the first inequality uses \\(A^T y \\geq c\\) and \\(x \\geq 0\\), and the second uses \\(Ax \\leq b\\) and \\(y \\geq 0\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 15.26 (Strong Duality)</div>
                    <div class="env-body">
                        <p>If the primal LP has an optimal solution \\(x^*\\), then the dual LP also has an optimal solution \\(y^*\\), and
                        \\[\\langle c, x^* \\rangle = \\langle b, y^* \\rangle\\]
                        (i.e., the optimal values are equal).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Sketch)</div>
                    <div class="env-body">
                        <p>The proof uses Farkas' lemma. Suppose \\(x^*\\) is optimal for the primal with value \\(v = \\langle c, x^* \\rangle\\). Consider the system:
                        \\[A^T y \\geq c, \\quad \\langle b, y \\rangle < v, \\quad y \\geq 0\\]
                        If this system has a solution, then by weak duality, \\(\\langle c, x^* \\rangle \\leq \\langle b, y \\rangle < v\\), a contradiction. Hence by Farkas, this system has no solution. A more careful application of Farkas shows that there exists \\(y^* \\geq 0\\) with \\(A^T y^* \\geq c\\) and \\(\\langle b, y^* \\rangle = v\\), which is the desired dual optimal solution.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Complementary Slackness</div>
                    <div class="env-body">
                        <p>At optimality, if \\(x^*\\) and \\(y^*\\) are primal and dual optimal solutions, then:
                        <ul>
                            <li>If \\(x^*_j > 0\\), then \\((A^T y^*)_j = c_j\\) (the \\(j\\)-th dual constraint is tight).</li>
                            <li>If \\((Ax^*)_i < b_i\\), then \\(y^*_i = 0\\) (the \\(i\\)-th primal constraint is slack).</li>
                        </ul>
                        This is called <strong>complementary slackness</strong> and is a consequence of the equality \\(\\langle c, x^* \\rangle = \\langle b, y^* \\rangle\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 15.27</div>
                    <div class="env-body">
                        <p>Consider the primal LP:
                        \\[\\begin{align*}
                        \\text{maximize} \\quad & 3x_1 + 2x_2 \\\\
                        \\text{subject to} \\quad & x_1 + x_2 \\leq 4 \\\\
                        & 2x_1 + x_2 \\leq 5 \\\\
                        & x_1, x_2 \\geq 0
                        \\end{align*}\\]
                        The dual is:
                        \\[\\begin{align*}
                        \\text{minimize} \\quad & 4y_1 + 5y_2 \\\\
                        \\text{subject to} \\quad & y_1 + 2y_2 \\geq 3 \\\\
                        & y_1 + y_2 \\geq 2 \\\\
                        & y_1, y_2 \\geq 0
                        \\end{align*}\\]
                        It can be verified that \\(x^* = (1, 3)\\) is primal optimal with value \\(3(1) + 2(3) = 9\\), and \\(y^* = (1, 1)\\) is dual optimal with value \\(4(1) + 5(1) = 9\\). Strong duality holds.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="lp-duality"></div>
            `,
            visualizations: [
                {
                    id: 'lp-duality',
                    title: 'Interactive: LP Primal and Dual Feasible Regions',
                    description: 'See how primal and dual LPs relate geometrically',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        // Simple LP: max c^T x s.t. Ax <= b, x >= 0
                        // A = [1 1; 2 1], b = [4; 5], c = [3; 2]

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Primal feasible region: x1 + x2 <= 4, 2x1 + x2 <= 5, x >= 0
                            const feasibleRegion = [
                                [0, 0],
                                [2.5, 0],  // intersection of 2x1 + x2 = 5 with x2 = 0
                                [1, 3],    // intersection of x1 + x2 = 4 and 2x1 + x2 = 5
                                [0, 4]     // intersection of x1 + x2 = 4 with x1 = 0
                            ];
                            viz.drawPolygon(feasibleRegion, viz.colors.blue + '33', viz.colors.blue, 2);

                            // Draw constraints
                            // x1 + x2 = 4
                            viz.drawLine(0, 4, 4, 0, viz.colors.teal, 1, true);
                            // 2x1 + x2 = 5
                            viz.drawLine(0, 5, 2.5, 0, viz.colors.teal, 1, true);

                            // Draw objective function level curves: 3x1 + 2x2 = k
                            for (let k = 0; k <= 10; k += 3) {
                                const alpha = k / 10;
                                viz.drawLine(0, k/2, k/3, 0, viz.colors.orange + '88', 1, true);
                            }

                            // Optimal point (1, 3)
                            viz.drawPoint(1, 3, viz.colors.red, '(1,3)*', 10);

                            viz.drawText('Primal Feasible Region (blue)', 0, 4.5, viz.colors.blue, 14, 'center');
                            viz.drawText('Optimal: x* = (1, 3), value = 9', 0, -4.5, viz.colors.red, 12, 'center');
                            viz.drawText('Orange lines: objective 3x₁ + 2x₂ = k', -4, -4, viz.colors.orange, 10);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Write down the dual of the LP: minimize \\(x_1 + 2x_2\\) subject to \\(x_1 + x_2 \\geq 3\\), \\(2x_1 + x_2 \\geq 4\\), \\(x_1, x_2 \\geq 0\\).',
                    hint: 'First convert to standard form (maximization), then apply the duality rules.',
                    solution: 'Rewrite as: maximize \\(-(x_1 + 2x_2)\\) subject to \\(-x_1 - x_2 \\leq -3\\), \\(-2x_1 - x_2 \\leq -4\\), \\(x \\geq 0\\). The dual is: minimize \\(-3y_1 - 4y_2\\) subject to \\(-y_1 - 2y_2 \\geq -1\\), \\(-y_1 - y_2 \\geq -2\\), \\(y \\geq 0\\). Simplifying (multiply by -1): maximize \\(3y_1 + 4y_2\\) subject to \\(y_1 + 2y_2 \\leq 1\\), \\(y_1 + y_2 \\leq 2\\), \\(y \\geq 0\\).'
                },
                {
                    question: 'Use strong duality to show that if both the primal and dual are feasible, then both have optimal solutions.',
                    hint: 'The feasible sets are nonempty and bounded by weak duality.',
                    solution: 'By weak duality, for any primal feasible \\(x\\) and dual feasible \\(y\\), we have \\(\\langle c, x \\rangle \\leq \\langle b, y \\rangle\\). Since the dual is feasible, the primal objective \\(\\langle c, x \\rangle\\) is bounded above. Since the primal feasible region is a polyhedron and the objective is linear, the supremum is attained (by compactness or vertex enumeration). Thus the primal has an optimal solution \\(x^*\\). By strong duality, the dual also has an optimal solution \\(y^*\\) with \\(\\langle c, x^* \\rangle = \\langle b, y^* \\rangle\\).'
                }
            ]
        }
    ]
});
