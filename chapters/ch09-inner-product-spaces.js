window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch09',
    number: 9,
    title: 'Real and Complex Inner Product Spaces',
    subtitle: 'Inner products, orthogonality, and the geometry of vector spaces',
    sections: [
        {
            id: 'ch09-sec01',
            title: 'Inner Products and Norms',
            content: `
                <h2>Inner Products and Norms</h2>

                <p>Inner product spaces provide the algebraic framework for generalizing geometric concepts like length, angle, and orthogonality to arbitrary vector spaces. This structure is fundamental to both pure and applied mathematics.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 9.1 (Inner Product Space)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be a vector space over a field \\(F\\) (either \\(\\mathbb{R}\\) or \\(\\mathbb{C}\\)). An <strong>inner product</strong> on \\(V\\) is a function \\(\\langle \\cdot, \\cdot \\rangle: V \\times V \\to F\\) satisfying:</p>
                        <ol>
                            <li><strong>Conjugate symmetry:</strong> \\(\\langle u, v \\rangle = \\overline{\\langle v, u \\rangle}\\) for all \\(u, v \\in V\\)</li>
                            <li><strong>Linearity in first argument:</strong> \\(\\langle au + bw, v \\rangle = a\\langle u, v \\rangle + b\\langle w, v \\rangle\\)</li>
                            <li><strong>Positive definiteness:</strong> \\(\\langle v, v \\rangle > 0\\) for all \\(v \\neq 0\\)</li>
                        </ol>
                        <p>A vector space \\(V\\) equipped with an inner product is called an <strong>inner product space</strong>.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Real vs Complex)</div>
                    <div class="env-body">
                        <p>For real inner product spaces (\\(F = \\mathbb{R}\\)), conjugate symmetry reduces to ordinary symmetry: \\(\\langle u, v \\rangle = \\langle v, u \\rangle\\). For complex spaces, the inner product is conjugate linear (antilinear) in the second argument: \\(\\langle u, av + bw \\rangle = \\bar{a}\\langle u, v \\rangle + \\bar{b}\\langle u, w \\rangle\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 9.2 (Standard Inner Products)</div>
                    <div class="env-body">
                        <p><strong>(a) Euclidean space:</strong> On \\(\\mathbb{R}^n\\), the standard inner product is
                        \\[\\langle x, y \\rangle = \\sum_{i=1}^{n} x_i y_i = x^T y\\]</p>

                        <p><strong>(b) Complex space:</strong> On \\(\\mathbb{C}^n\\), the standard inner product is
                        \\[\\langle z, w \\rangle = \\sum_{i=1}^{n} z_i \\overline{w_i} = z^* w\\]
                        where \\(z^*\\) denotes the conjugate transpose.</p>

                        <p><strong>(c) Function spaces:</strong> On \\(L^2[a,b]\\), the inner product is
                        \\[\\langle f, g \\rangle = \\int_a^b f(x)\\overline{g(x)}\\, dx\\]</p>

                        <p><strong>(d) Matrix spaces:</strong> On \\(\\mathcal{M}_n(\\mathbb{C})\\), the Frobenius inner product is
                        \\[\\langle A, B \\rangle = \\operatorname{tr}(B^* A) = \\sum_{i,j} A_{ij}\\overline{B_{ij}}\\]</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 9.3 (Norm)</div>
                    <div class="env-body">
                        <p>The <strong>norm</strong> (or <strong>length</strong>) of a vector \\(v\\) in an inner product space is
                        \\[\\|v\\| = \\sqrt{\\langle v, v \\rangle}\\]
                        The <strong>distance</strong> between vectors \\(u\\) and \\(v\\) is \\(\\|u - v\\|\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.4 (Cauchy-Schwarz Inequality)</div>
                    <div class="env-body">
                        <p>For all vectors \\(u, v\\) in an inner product space,
                        \\[|\\langle u, v \\rangle| \\leq \\|u\\| \\cdot \\|v\\|\\]
                        with equality if and only if \\(u\\) and \\(v\\) are linearly dependent.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>If \\(v = 0\\), the inequality is trivial. Assume \\(v \\neq 0\\). For any scalar \\(t \\in F\\), we have
                        \\[0 \\leq \\langle u - tv, u - tv \\rangle = \\|u\\|^2 - 2\\operatorname{Re}(t\\langle u, v \\rangle) + |t|^2\\|v\\|^2\\]</p>

                        <p>Setting \\(t = \\frac{\\langle u, v \\rangle}{\\|v\\|^2}\\), we obtain
                        \\[0 \\leq \\|u\\|^2 - \\frac{|\\langle u, v \\rangle|^2}{\\|v\\|^2}\\]
                        which gives \\(|\\langle u, v \\rangle|^2 \\leq \\|u\\|^2 \\|v\\|^2\\). Equality holds if and only if \\(u - tv = 0\\), i.e., \\(u\\) and \\(v\\) are linearly dependent.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.5 (Triangle Inequality and Norm Properties)</div>
                    <div class="env-body">
                        <p>The norm satisfies:</p>
                        <ol>
                            <li><strong>Positivity:</strong> \\(\\|v\\| \\geq 0\\) with equality iff \\(v = 0\\)</li>
                            <li><strong>Homogeneity:</strong> \\(\\|\\alpha v\\| = |\\alpha| \\cdot \\|v\\|\\)</li>
                            <li><strong>Triangle inequality:</strong> \\(\\|u + v\\| \\leq \\|u\\| + \\|v\\|\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.6 (Polarization Identities)</div>
                    <div class="env-body">
                        <p>The inner product can be recovered from the norm:</p>
                        <p><strong>Real case:</strong>
                        \\[\\langle u, v \\rangle = \\frac{1}{4}\\left(\\|u + v\\|^2 - \\|u - v\\|^2\\right)\\]</p>

                        <p><strong>Complex case:</strong>
                        \\[\\langle u, v \\rangle = \\frac{1}{4}\\sum_{k=0}^{3} i^k \\|u + i^k v\\|^2\\]</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Geometric Intuition</div>
                    <div class="env-body">
                        <p>The Cauchy-Schwarz inequality has a beautiful geometric interpretation: \\(|\\langle u, v \\rangle| = \\|u\\| \\cdot \\|v\\| \\cdot |\\cos \\theta|\\), where \\(\\theta\\) is the angle between \\(u\\) and \\(v\\). Since \\(|\\cos \\theta| \\leq 1\\), we get the inequality. The triangle inequality states that the direct path between two points is shorter than any detour.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="inner-product-viz"></div>
            `,
            visualizations: [
                {
                    id: 'inner-product-viz',
                    title: 'Interactive: Inner Product Geometry',
                    description: 'Visualize the geometric meaning of inner products, norms, and angles',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        const u = viz.addDraggable('u', 2, 1.5, viz.colors.blue, 8, () => draw());
                        const v = viz.addDraggable('v', -1, 2, viz.colors.orange, 8, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw vectors
                            viz.drawVector(0, 0, u.x, u.y, viz.colors.blue, 'u', 3);
                            viz.drawVector(0, 0, v.x, v.y, viz.colors.orange, 'v', 3);

                            // Draw sum u + v
                            viz.drawVector(0, 0, u.x + v.x, u.y + v.y, viz.colors.green + '80', 'u+v', 2);
                            viz.drawSegment(u.x, u.y, u.x + v.x, u.y + v.y, viz.colors.orange + '60', 1, true);
                            viz.drawSegment(v.x, v.y, u.x + v.x, u.y + v.y, viz.colors.blue + '60', 1, true);

                            // Projection of v onto u
                            const dotProd = u.x * v.x + u.y * v.y;
                            const uLenSq = u.x * u.x + u.y * u.y;
                            const projX = (dotProd / uLenSq) * u.x;
                            const projY = (dotProd / uLenSq) * u.y;

                            viz.drawVector(0, 0, projX, projY, viz.colors.purple, '', 2);
                            viz.drawSegment(projX, projY, v.x, v.y, viz.colors.teal + '80', 1, true);

                            // Draw angle arc
                            const angle = Math.atan2(v.y, v.x) - Math.atan2(u.y, u.x);
                            const arcRadius = 0.5;
                            viz.drawArc = function(cx, cy, r, startAngle, endAngle, color) {
                                const ctx = this.ctx;
                                ctx.save();
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                const [sx, sy] = this.mathToScreen(cx, cy);
                                ctx.arc(sx, sy, r * this.scale, -startAngle, -endAngle, startAngle > endAngle);
                                ctx.stroke();
                                ctx.restore();
                            };
                            viz.drawArc(0, 0, arcRadius, Math.atan2(u.y, u.x), Math.atan2(v.y, v.x), viz.colors.yellow);

                            // Display calculations
                            const uLen = Math.sqrt(u.x * u.x + u.y * u.y);
                            const vLen = Math.sqrt(v.x * v.x + v.y * v.y);
                            const cosAngle = dotProd / (uLen * vLen);
                            const angleDeg = (angle * 180 / Math.PI).toFixed(1);

                            viz.drawText(`⟨u,v⟩ = ${dotProd.toFixed(2)}`, -4.5, 3.5, viz.colors.text, 14);
                            viz.drawText(`‖u‖ = ${uLen.toFixed(2)}`, -4.5, 3.1, viz.colors.blue, 14);
                            viz.drawText(`‖v‖ = ${vLen.toFixed(2)}`, -4.5, 2.7, viz.colors.orange, 14);
                            viz.drawText(`cos θ = ${cosAngle.toFixed(3)}`, -4.5, 2.3, viz.colors.yellow, 14);
                            viz.drawText(`θ = ${angleDeg}°`, -4.5, 1.9, viz.colors.yellow, 14);

                            viz.drawDraggables();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove the parallelogram law: For all \\(u, v\\) in an inner product space, \\(\\|u + v\\|^2 + \\|u - v\\|^2 = 2(\\|u\\|^2 + \\|v\\|^2)\\). Give a geometric interpretation.',
                    hint: 'Expand both sides using the definition \\(\\|w\\|^2 = \\langle w, w \\rangle\\) and simplify.',
                    solution: 'Expanding: \\(\\|u+v\\|^2 = \\langle u+v, u+v \\rangle = \\|u\\|^2 + 2\\operatorname{Re}\\langle u,v\\rangle + \\|v\\|^2\\) and \\(\\|u-v\\|^2 = \\|u\\|^2 - 2\\operatorname{Re}\\langle u,v\\rangle + \\|v\\|^2\\). Adding gives \\(2(\\|u\\|^2 + \\|v\\|^2)\\). Geometrically, in a parallelogram with sides u and v, the sum of squares of the diagonals equals the sum of squares of all four sides.'
                },
                {
                    question: 'Show that if \\(\\langle u, v \\rangle = 0\\) for all \\(v \\in V\\), then \\(u = 0\\).',
                    hint: 'What happens when you set \\(v = u\\)?',
                    solution: 'If \\(\\langle u, v \\rangle = 0\\) for all \\(v\\), then in particular \\(\\langle u, u \\rangle = 0\\). By positive definiteness of the inner product, this implies \\(u = 0\\).'
                },
                {
                    question: 'Prove that the norm induced by an inner product satisfies \\(\\|u\\|^2 + \\|v\\|^2 = \\frac{1}{2}(\\|u+v\\|^2 + \\|u-v\\|^2)\\) (the polarization identity in a different form).',
                    hint: 'This is equivalent to the parallelogram law.',
                    solution: 'This follows immediately from the parallelogram law by dividing both sides by 2.'
                }
            ]
        },
        {
            id: 'ch09-sec02',
            title: 'Orthogonality and Orthogonal Complements',
            content: `
                <h2>Orthogonality and Orthogonal Complements</h2>

                <p>Orthogonality generalizes perpendicularity to abstract inner product spaces and is central to decomposition theorems.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 9.7 (Orthogonality)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be an inner product space.</p>
                        <ol>
                            <li>Vectors \\(u, v \\in V\\) are <strong>orthogonal</strong>, written \\(u \\perp v\\), if \\(\\langle u, v \\rangle = 0\\).</li>
                            <li>Subsets \\(S, T \\subseteq V\\) are <strong>orthogonal</strong>, written \\(S \\perp T\\), if \\(\\langle s, t \\rangle = 0\\) for all \\(s \\in S, t \\in T\\).</li>
                            <li>The <strong>orthogonal complement</strong> of \\(S \\subseteq V\\) is
                            \\[S^\\perp = \\{v \\in V : v \\perp S\\} = \\{v \\in V : \\langle v, s \\rangle = 0 \\text{ for all } s \\in S\\}\\]</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.8 (Properties of Orthogonal Complements)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be an inner product space and \\(S \\subseteq V\\).</p>
                        <ol>
                            <li>\\(S^\\perp\\) is always a subspace of \\(V\\)</li>
                            <li>\\(S \\cap S^\\perp \\subseteq \\{0\\}\\)</li>
                            <li>If \\(S \\subseteq T\\), then \\(T^\\perp \\subseteq S^\\perp\\)</li>
                            <li>\\(S \\subseteq (S^\\perp)^\\perp\\)</li>
                            <li>\\(\\operatorname{span}(S)^\\perp = S^\\perp\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>(1) Clearly \\(0 \\in S^\\perp\\). If \\(u, v \\in S^\\perp\\) and \\(\\alpha, \\beta \\in F\\), then for any \\(s \\in S\\):
                        \\[\\langle \\alpha u + \\beta v, s \\rangle = \\alpha\\langle u, s \\rangle + \\beta\\langle v, s \\rangle = 0\\]
                        Thus \\(\\alpha u + \\beta v \\in S^\\perp\\), so \\(S^\\perp\\) is a subspace.</p>

                        <p>(2) If \\(v \\in S \\cap S^\\perp\\), then \\(\\langle v, v \\rangle = 0\\), so \\(v = 0\\).</p>

                        <p>(5) Clearly \\(S \\subseteq \\operatorname{span}(S)\\) implies \\(\\operatorname{span}(S)^\\perp \\subseteq S^\\perp\\). For the reverse, if \\(v \\perp S\\) and \\(w = \\sum \\alpha_i s_i \\in \\operatorname{span}(S)\\), then \\(\\langle v, w \\rangle = \\sum \\alpha_i \\langle v, s_i \\rangle = 0\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 9.9 (Orthogonal Direct Sum)</div>
                    <div class="env-body">
                        <p>An inner product space \\(V\\) is the <strong>orthogonal direct sum</strong> of subspaces \\(W_1, \\ldots, W_k\\), written
                        \\[V = W_1 \\oplus \\cdots \\oplus W_k\\]
                        if \\(V = W_1 + \\cdots + W_k\\) (direct sum) and \\(W_i \\perp W_j\\) for \\(i \\neq j\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.10 (Projection Theorem - Finite Dimensional)</div>
                    <div class="env-body">
                        <p>Let \\(W\\) be a finite-dimensional subspace of an inner product space \\(V\\). Then
                        \\[V = W \\oplus W^\\perp\\]
                        In particular, \\(\\dim(W) + \\dim(W^\\perp) = \\dim(V)\\) when \\(V\\) is finite-dimensional.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>We already know \\(W \\cap W^\\perp = \\{0\\}\\). We need to show \\(V = W + W^\\perp\\). Let \\(\\{e_1, \\ldots, e_k\\}\\) be an orthonormal basis for \\(W\\) (obtained via Gram-Schmidt). For any \\(v \\in V\\), define
                        \\[w = \\sum_{i=1}^{k} \\langle v, e_i \\rangle e_i \\in W\\]
                        We claim \\(v - w \\in W^\\perp\\). Indeed, for any \\(j\\):
                        \\[\\langle v - w, e_j \\rangle = \\langle v, e_j \\rangle - \\sum_{i=1}^{k} \\langle v, e_i \\rangle \\langle e_i, e_j \\rangle = \\langle v, e_j \\rangle - \\langle v, e_j \\rangle = 0\\]
                        Thus \\(v = w + (v-w) \\in W + W^\\perp\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 9.11</div>
                    <div class="env-body">
                        <p>For finite-dimensional \\(W \\subseteq V\\), we have \\((W^\\perp)^\\perp = W\\).</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning (Infinite Dimensions)</div>
                    <div class="env-body">
                        <p>The projection theorem fails for infinite-dimensional subspaces that are not closed. For example, in \\(\\ell^2\\), the subspace of sequences with finite support has \\(W^\\perp = \\{0\\}\\), but \\(W \\neq \\ell^2\\). Completeness is required.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="orthogonal-complement-viz"></div>
            `,
            visualizations: [
                {
                    id: 'orthogonal-complement-viz',
                    title: 'Interactive: Orthogonal Complement in ℝ³',
                    description: 'Visualize a line and its orthogonal plane in 3D space',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        let angle = 0;
                        const w = viz.addDraggable('w', 1.5, 2, viz.colors.blue, 8, () => draw());

                        VizEngine.createSlider(controls, 'Rotation', 0, 360, 0, 1, (val) => {
                            angle = val * Math.PI / 180;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw the subspace W (line through origin and w)
                            const wLen = Math.sqrt(w.x * w.x + w.y * w.y);
                            const wNormX = w.x / wLen;
                            const wNormY = w.y / wLen;

                            viz.drawLine(-5*wNormX, -5*wNormY, 5*wNormX, 5*wNormY, viz.colors.blue + '60', 2);
                            viz.drawVector(0, 0, w.x, w.y, viz.colors.blue, 'w', 3);

                            // Draw orthogonal complement (perpendicular line)
                            const perpX = -wNormY;
                            const perpY = wNormX;
                            viz.drawLine(-5*perpX, -5*perpY, 5*perpX, 5*perpY, viz.colors.orange + '60', 2);

                            // Draw a vector in W^perp
                            const perpVecX = 2 * perpX * Math.cos(angle);
                            const perpVecY = 2 * perpY * Math.cos(angle);
                            viz.drawVector(0, 0, perpVecX, perpVecY, viz.colors.orange, 'v ∈ W⊥', 2);

                            // Draw arbitrary vector and its decomposition
                            const testX = 2.5, testY = 1.5;
                            const projCoeff = (testX * w.x + testY * w.y) / (w.x * w.x + w.y * w.y);
                            const projX = projCoeff * w.x;
                            const projY = projCoeff * w.y;
                            const perpCompX = testX - projX;
                            const perpCompY = testY - projY;

                            viz.drawVector(0, 0, testX, testY, viz.colors.green, 'v', 2);
                            viz.drawVector(0, 0, projX, projY, viz.colors.purple + 'AA', '', 2);
                            viz.drawVector(projX, projY, testX, testY, viz.colors.teal + 'AA', '', 2);
                            viz.drawSegment(projX, projY, testX, testY, viz.colors.teal, 1, true);

                            // Labels
                            viz.drawText('W (span of w)', -4, 3.5, viz.colors.blue, 14);
                            viz.drawText('W⊥ (orthogonal complement)', -4, 3.1, viz.colors.orange, 14);
                            viz.drawText('v = proj_W(v) + proj_W⊥(v)', -4, 2.7, viz.colors.green, 14);

                            viz.drawDraggables();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(W = \\operatorname{span}\\{(1, 1, 0, 0), (0, 1, 1, 0)\\}\\) in \\(\\mathbb{R}^4\\). Find a basis for \\(W^\\perp\\).',
                    hint: 'A vector \\((x_1, x_2, x_3, x_4)\\) is in \\(W^\\perp\\) iff it is orthogonal to both basis vectors of \\(W\\). Set up a system of equations.',
                    solution: 'We need \\(x_1 + x_2 = 0\\) and \\(x_2 + x_3 = 0\\). This gives \\(x_2 = -x_1\\) and \\(x_3 = -x_2 = x_1\\). So \\(W^\\perp = \\operatorname{span}\\{(1, -1, 1, 0), (0, 0, 0, 1)\\}\\). Note \\(\\dim(W) + \\dim(W^\\perp) = 2 + 2 = 4 = \\dim(\\mathbb{R}^4)\\).'
                },
                {
                    question: 'Prove that if \\(V\\) is finite-dimensional and \\(W_1, W_2\\) are subspaces with \\(W_1 \\perp W_2\\), then \\(\\dim(W_1 + W_2) = \\dim(W_1) + \\dim(W_2)\\).',
                    hint: 'Use the fact that \\(W_1 \\cap W_2 = \\{0\\}\\) when \\(W_1 \\perp W_2\\).',
                    solution: 'If \\(v \\in W_1 \\cap W_2\\), then \\(\\langle v, v \\rangle = 0\\) (since \\(v \\in W_1\\) and \\(v \\in W_2\\) and \\(W_1 \\perp W_2\\)), thus \\(v = 0\\). By the dimension formula for sums, \\(\\dim(W_1 + W_2) = \\dim(W_1) + \\dim(W_2) - \\dim(W_1 \\cap W_2) = \\dim(W_1) + \\dim(W_2)\\).'
                }
            ]
        },
        {
            id: 'ch09-sec03',
            title: 'Gram-Schmidt Orthogonalization',
            content: `
                <h2>Gram-Schmidt Orthogonalization</h2>

                <p>The Gram-Schmidt process is a fundamental algorithm that converts any basis into an orthonormal basis while preserving the span at each step.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.12 (Gram-Schmidt Orthogonalization)</div>
                    <div class="env-body">
                        <p>Let \\(\\{v_1, v_2, \\ldots, v_n\\}\\) be a linearly independent set in an inner product space \\(V\\). Define inductively:</p>
                        <p>\\[u_1 = v_1\\]</p>
                        <p>\\[u_k = v_k - \\sum_{j=1}^{k-1} \\frac{\\langle v_k, u_j \\rangle}{\\langle u_j, u_j \\rangle} u_j \\quad \\text{for } k = 2, \\ldots, n\\]</p>
                        <p>Then \\(\\{u_1, \\ldots, u_n\\}\\) is an orthogonal set with \\(\\operatorname{span}\\{u_1, \\ldots, u_k\\} = \\operatorname{span}\\{v_1, \\ldots, v_k\\}\\) for all \\(k\\).</p>
                        <p>Normalizing gives an orthonormal set: \\(e_k = u_k / \\|u_k\\|\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>We proceed by induction. For \\(k=1\\), the statement is trivial. Assume \\(\\{u_1, \\ldots, u_{k-1}\\}\\) is orthogonal. For \\(1 \\leq j < k\\):
                        \\[\\langle u_k, u_j \\rangle = \\left\\langle v_k - \\sum_{i=1}^{k-1} \\frac{\\langle v_k, u_i \\rangle}{\\langle u_i, u_i \\rangle} u_i, u_j \\right\\rangle = \\langle v_k, u_j \\rangle - \\frac{\\langle v_k, u_j \\rangle}{\\langle u_j, u_j \\rangle} \\langle u_j, u_j \\rangle = 0\\]</p>

                        <p>Since \\(v_k \\notin \\operatorname{span}\\{v_1, \\ldots, v_{k-1}\\} = \\operatorname{span}\\{u_1, \\ldots, u_{k-1}\\}\\), we have \\(u_k \\neq 0\\). The span equality follows from the fact that \\(u_k \\in \\operatorname{span}\\{v_1, \\ldots, v_k\\}\\) and \\(v_k \\in \\operatorname{span}\\{u_1, \\ldots, u_k\\}\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 9.13 (Legendre Polynomials)</div>
                    <div class="env-body">
                        <p>Apply Gram-Schmidt to \\(\\{1, x, x^2, x^3\\}\\) in \\(L^2[-1, 1]\\) with \\(\\langle f, g \\rangle = \\int_{-1}^{1} f(x)g(x)\\, dx\\):</p>

                        <p>\\(u_1 = 1\\), \\(\\|u_1\\|^2 = 2\\), so \\(e_1 = 1/\\sqrt{2}\\)</p>

                        <p>\\(u_2 = x - \\frac{\\langle x, 1 \\rangle}{\\langle 1, 1 \\rangle} \\cdot 1 = x - 0 = x\\), \\(\\|u_2\\|^2 = 2/3\\), so \\(e_2 = \\sqrt{3/2} x\\)</p>

                        <p>\\(u_3 = x^2 - \\frac{\\langle x^2, 1 \\rangle}{2} \\cdot 1 - \\frac{\\langle x^2, x \\rangle}{2/3} \\cdot x = x^2 - \\frac{1}{3}\\)</p>

                        <p>These are (up to normalization) the first three Legendre polynomials: \\(P_0(x) = 1\\), \\(P_1(x) = x\\), \\(P_2(x) = \\frac{1}{2}(3x^2 - 1)\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.14 (QR Factorization)</div>
                    <div class="env-body">
                        <p>Any \\(m \\times n\\) matrix \\(A\\) (with \\(m \\geq n\\)) can be factored as
                        \\[A = QR\\]
                        where \\(Q\\) is \\(m \\times n\\) with orthonormal columns and \\(R\\) is \\(n \\times n\\) upper triangular with positive diagonal entries (if \\(A\\) has full rank).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Apply Gram-Schmidt to the columns of \\(A\\). If \\(A = [a_1 | \\cdots | a_n]\\) and Gram-Schmidt produces \\(q_1, \\ldots, q_n\\), then
                        \\[a_k = \\sum_{j=1}^{k} \\langle a_k, q_j \\rangle q_j = \\sum_{j=1}^{k} r_{jk} q_j\\]
                        where \\(r_{jk} = \\langle a_k, q_j \\rangle\\) for \\(j < k\\) and \\(r_{kk} = \\|u_k\\| > 0\\). This gives \\(A = QR\\) with \\(R\\) upper triangular.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Computational Perspective</div>
                    <div class="env-body">
                        <p>Gram-Schmidt is beautiful theoretically but can be numerically unstable. In practice, modified Gram-Schmidt or Householder reflections are used. The QR factorization is fundamental in numerical linear algebra: solving least squares, computing eigenvalues, and orthogonalizing bases.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="gram-schmidt-viz"></div>
            `,
            visualizations: [
                {
                    id: 'gram-schmidt-viz',
                    title: 'Interactive: Gram-Schmidt Process Step-by-Step',
                    description: 'Watch the Gram-Schmidt algorithm orthogonalize vectors in real-time',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        const v1 = viz.addDraggable('v1', 2, 0.5, viz.colors.blue, 8, () => draw());
                        const v2 = viz.addDraggable('v2', 1, 2, viz.colors.orange, 8, () => draw());

                        let step = 0;
                        const stepButton = VizEngine.createButton(controls, 'Next Step', () => {
                            step = (step + 1) % 4;
                            draw();
                        });

                        const resetButton = VizEngine.createButton(controls, 'Reset', () => {
                            step = 0;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Step 0: Original vectors
                            viz.drawVector(0, 0, v1.x, v1.y, viz.colors.blue + (step >= 0 ? '' : '40'), 'v₁', 3);
                            viz.drawVector(0, 0, v2.x, v2.y, viz.colors.orange + (step >= 1 ? '' : '40'), 'v₂', 3);

                            if (step >= 1) {
                                // Step 1: u1 = v1 (just copy)
                                const u1x = v1.x, u1y = v1.y;

                                if (step >= 2) {
                                    // Step 2: Project v2 onto u1
                                    const dotProd = v2.x * u1x + v2.y * u1y;
                                    const u1LenSq = u1x * u1x + u1y * u1y;
                                    const projX = (dotProd / u1LenSq) * u1x;
                                    const projY = (dotProd / u1LenSq) * u1y;

                                    viz.drawVector(0, 0, projX, projY, viz.colors.purple, 'proj', 2);
                                    viz.drawSegment(projX, projY, v2.x, v2.y, viz.colors.teal + 'AA', 2, true);

                                    if (step >= 3) {
                                        // Step 3: u2 = v2 - proj
                                        const u2x = v2.x - projX;
                                        const u2y = v2.y - projY;
                                        viz.drawVector(0, 0, u2x, u2y, viz.colors.teal, 'u₂', 3);

                                        // Show they're orthogonal
                                        const checkDot = u1x * u2x + u1y * u2y;
                                        viz.drawText(`⟨u₁, u₂⟩ = ${checkDot.toFixed(4)} ≈ 0`, -4, 3.5, viz.colors.green, 14);

                                        // Draw right angle indicator
                                        const scale = 0.3;
                                        const corner1X = scale * u1x / Math.sqrt(u1x*u1x + u1y*u1y);
                                        const corner1Y = scale * u1y / Math.sqrt(u1x*u1x + u1y*u1y);
                                        const corner2X = scale * u2x / Math.sqrt(u2x*u2x + u2y*u2y);
                                        const corner2Y = scale * u2y / Math.sqrt(u2x*u2x + u2y*u2y);

                                        viz.drawSegment(corner1X, corner1Y, corner1X + corner2X, corner1Y + corner2Y, viz.colors.green, 1.5);
                                        viz.drawSegment(corner2X, corner2Y, corner1X + corner2X, corner1Y + corner2Y, viz.colors.green, 1.5);
                                    }
                                }
                            }

                            // Instructions
                            const instructions = [
                                'Step 0: Original vectors v₁, v₂',
                                'Step 1: u₁ = v₁',
                                'Step 2: Project v₂ onto u₁',
                                'Step 3: u₂ = v₂ - proj_{u₁}(v₂)'
                            ];
                            viz.drawText(instructions[step], -4, -3.5, viz.colors.white, 15);

                            viz.drawDraggables();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Apply Gram-Schmidt to \\(\\{(1, 1, 1), (1, 1, 0), (1, 0, 0)\\}\\) in \\(\\mathbb{R}^3\\) with the standard inner product.',
                    hint: 'Start with \\(u_1 = (1,1,1)\\). Then compute \\(u_2 = (1,1,0) - \\text{proj}_{u_1}(1,1,0)\\).',
                    solution: '\\(u_1 = (1,1,1)\\). \\(u_2 = (1,1,0) - \\frac{2}{3}(1,1,1) = (1/3, 1/3, -2/3)\\). \\(u_3 = (1,0,0) - \\frac{2}{3}(1,1,1) - \\frac{1/3}{2/3}(1/3,1/3,-2/3) = (1/2, -1/2, 0)\\). Normalize each to get the orthonormal basis.'
                },
                {
                    question: 'Show that the Gram-Schmidt process applied to \\(\\{v_1, \\ldots, v_n\\}\\) produces the same result (up to sign) regardless of the order, provided the span remains the same.',
                    hint: 'This is false! The Gram-Schmidt output depends critically on the order.',
                    solution: 'This statement is false. Try \\(v_1 = (1,0)\\), \\(v_2 = (0,1)\\) versus \\(v_2 = (0,1)\\), \\(v_1 = (1,0)\\). The first gives \\(u_1 = (1,0), u_2 = (0,1)\\) while the second gives \\(u_1 = (0,1), u_2 = (1,0)\\), which are different orderings of the basis.'
                },
                {
                    question: 'Prove that in the QR factorization \\(A = QR\\), if \\(A\\) is invertible, then \\(R\\) is invertible and \\(Q\\) is orthogonal (when \\(A\\) is square).',
                    hint: 'Use the fact that \\(A\\) invertible implies all columns are linearly independent.',
                    solution: 'If \\(A\\) is \\(n \\times n\\) and invertible, Gram-Schmidt produces \\(n\\) orthonormal vectors (no zero vectors appear), so \\(Q\\) has orthonormal columns and is thus orthogonal. Since \\(A = QR\\) and both \\(A\\) and \\(Q\\) are invertible, \\(R = Q^T A\\) is invertible.'
                }
            ]
        },
        {
            id: 'ch09-sec04',
            title: 'Orthogonal Projections and Best Approximation',
            content: `
                <h2>Orthogonal Projections and Best Approximation</h2>

                <p>Orthogonal projections solve the fundamental problem: given a subspace \\(W\\) and a vector \\(v\\), find the closest point in \\(W\\) to \\(v\\).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 9.15 (Orthogonal Projection)</div>
                    <div class="env-body">
                        <p>Let \\(W\\) be a finite-dimensional subspace of an inner product space \\(V\\). The <strong>orthogonal projection</strong> of \\(v \\in V\\) onto \\(W\\) is the unique vector \\(\\text{proj}_W(v) \\in W\\) such that
                        \\[v - \\text{proj}_W(v) \\in W^\\perp\\]</p>
                        <p>If \\(\\{e_1, \\ldots, e_k\\}\\) is an orthonormal basis for \\(W\\), then
                        \\[\\text{proj}_W(v) = \\sum_{i=1}^{k} \\langle v, e_i \\rangle e_i\\]</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.16 (Best Approximation Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(W\\) be a finite-dimensional subspace of \\(V\\) and \\(v \\in V\\). Then \\(\\text{proj}_W(v)\\) is the unique closest point in \\(W\\) to \\(v\\):
                        \\[\\|v - \\text{proj}_W(v)\\| < \\|v - w\\| \\quad \\text{for all } w \\in W, w \\neq \\text{proj}_W(v)\\]</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Write \\(v = \\text{proj}_W(v) + (v - \\text{proj}_W(v))\\) where \\(v - \\text{proj}_W(v) \\in W^\\perp\\). For any \\(w \\in W\\):
                        \\begin{align*}
                        \\|v - w\\|^2 &= \\|(v - \\text{proj}_W(v)) + (\\text{proj}_W(v) - w)\\|^2\\\\
                        &= \\|v - \\text{proj}_W(v)\\|^2 + \\|\\text{proj}_W(v) - w\\|^2\\\\
                        &\\geq \\|v - \\text{proj}_W(v)\\|^2
                        \\end{align*}
                        with equality iff \\(w = \\text{proj}_W(v)\\). The cross term vanishes because \\((v - \\text{proj}_W(v)) \\perp (\\text{proj}_W(v) - w)\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 9.17 (Bessel's Inequality)</div>
                    <div class="env-body">
                        <p>If \\(\\{e_1, \\ldots, e_k\\}\\) is an orthonormal set in \\(V\\), then for all \\(v \\in V\\):
                        \\[\\sum_{i=1}^{k} |\\langle v, e_i \\rangle|^2 \\leq \\|v\\|^2\\]
                        with equality iff \\(v \\in \\text{span}\\{e_1, \\ldots, e_k\\}\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Let \\(W = \\text{span}\\{e_1, \\ldots, e_k\\}\\). Then
                        \\[\\|\\text{proj}_W(v)\\|^2 = \\left\\|\\sum_{i=1}^{k} \\langle v, e_i \\rangle e_i\\right\\|^2 = \\sum_{i=1}^{k} |\\langle v, e_i \\rangle|^2\\]
                        By the best approximation theorem, \\(\\|\\text{proj}_W(v)\\| \\leq \\|v\\|\\), giving the inequality.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.18 (Projection Operator Properties)</div>
                    <div class="env-body">
                        <p>The map \\(P_W: V \\to V\\) defined by \\(P_W(v) = \\text{proj}_W(v)\\) is a linear operator satisfying:</p>
                        <ol>
                            <li>\\(P_W^2 = P_W\\) (idempotent)</li>
                            <li>\\(P_W^* = P_W\\) (self-adjoint)</li>
                            <li>\\(\\ker(P_W) = W^\\perp\\) and \\(\\text{im}(P_W) = W\\)</li>
                            <li>\\(P_W + P_{W^\\perp} = I\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 9.19 (Least Squares)</div>
                    <div class="env-body">
                        <p>The least squares problem \\(Ax = b\\) (where \\(A\\) is \\(m \\times n\\) with \\(m > n\\)) seeks \\(x\\) minimizing \\(\\|Ax - b\\|\\). The solution is \\(x = \\text{proj}_{\\text{col}(A)}(b)\\), obtained by solving the normal equations:
                        \\[A^T A x = A^T b\\]
                        This is equivalent to requiring \\(b - Ax \\perp \\text{col}(A)\\), i.e., \\(b - Ax \\in \\text{col}(A)^\\perp = \\ker(A^T)\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="projection-viz"></div>
            `,
            visualizations: [
                {
                    id: 'projection-viz',
                    title: 'Interactive: Orthogonal Projection and Best Approximation',
                    description: 'See why orthogonal projection gives the closest point',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        const w1 = viz.addDraggable('w1', 2, 0.5, viz.colors.blue, 7, () => draw());
                        const v = viz.addDraggable('v', 1, 3, viz.colors.green, 8, () => draw());

                        let testPointT = 0;
                        VizEngine.createSlider(controls, 'Test point on W', -2, 3, 0, 0.1, (val) => {
                            testPointT = val;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Normalize w1 for the subspace direction
                            const w1Len = Math.sqrt(w1.x * w1.x + w1.y * w1.y);
                            const w1NormX = w1.x / w1Len;
                            const w1NormY = w1.y / w1Len;

                            // Draw subspace W (line through origin)
                            viz.drawLine(-5*w1NormX, -5*w1NormY, 5*w1NormX, 5*w1NormY, viz.colors.blue + '40', 3);
                            viz.drawVector(0, 0, w1.x, w1.y, viz.colors.blue, 'w', 2);

                            // Compute projection of v onto W
                            const dotProd = v.x * w1.x + v.y * w1.y;
                            const w1LenSq = w1.x * w1.x + w1.y * w1.y;
                            const projX = (dotProd / w1LenSq) * w1.x;
                            const projY = (dotProd / w1LenSq) * w1.y;

                            // Draw v and its projection
                            viz.drawVector(0, 0, v.x, v.y, viz.colors.green, 'v', 3);
                            viz.drawVector(0, 0, projX, projY, viz.colors.purple, 'proj_W(v)', 3);
                            viz.drawSegment(projX, projY, v.x, v.y, viz.colors.orange, 2, true);

                            // Test point on W
                            const testX = testPointT * w1NormX * w1Len;
                            const testY = testPointT * w1NormY * w1Len;
                            viz.drawPoint(testX, testY, viz.colors.teal, 'test', 6);
                            viz.drawSegment(testX, testY, v.x, v.y, viz.colors.teal + '80', 1.5, true);

                            // Compute distances
                            const distToProj = Math.sqrt((v.x - projX)**2 + (v.y - projY)**2);
                            const distToTest = Math.sqrt((v.x - testX)**2 + (v.y - testY)**2);

                            // Display distances
                            viz.drawText(`‖v - proj_W(v)‖ = ${distToProj.toFixed(3)}`, -4.5, 3.7, viz.colors.orange, 14);
                            viz.drawText(`‖v - test‖ = ${distToTest.toFixed(3)}`, -4.5, 3.3, viz.colors.teal, 14);

                            if (Math.abs(testX - projX) < 0.1 && Math.abs(testY - projY) < 0.1) {
                                viz.drawText('✓ Test point = projection (minimum!)', -4.5, 2.9, viz.colors.green, 14);
                            } else {
                                viz.drawText(`Distance increased by ${(distToTest - distToProj).toFixed(3)}`, -4.5, 2.9, viz.colors.red, 14);
                            }

                            viz.drawDraggables();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the projection of \\(v = (1, 2, 3, 4)\\) onto \\(W = \\text{span}\\{(1, 0, 1, 0), (0, 1, 0, 1)\\}\\).',
                    hint: 'First apply Gram-Schmidt to get an orthonormal basis for \\(W\\), then use the projection formula.',
                    solution: 'The given vectors are already orthogonal. Normalize: \\(e_1 = (1, 0, 1, 0)/\\sqrt{2}\\), \\(e_2 = (0, 1, 0, 1)/\\sqrt{2}\\). Then \\(\\text{proj}_W(v) = \\langle v, e_1\\rangle e_1 + \\langle v, e_2\\rangle e_2 = \\frac{4}{\\sqrt{2}}\\frac{(1,0,1,0)}{\\sqrt{2}} + \\frac{6}{\\sqrt{2}}\\frac{(0,1,0,1)}{\\sqrt{2}} = (2, 3, 2, 3)\\).'
                },
                {
                    question: 'Prove that if \\(P\\) is an orthogonal projection, then \\(I - P\\) is also an orthogonal projection. What subspace does it project onto?',
                    hint: 'Check that \\((I-P)^2 = I - P\\) and \\((I-P)^* = I - P\\).',
                    solution: '\\((I-P)^2 = I - 2P + P^2 = I - 2P + P = I - P\\) since \\(P^2 = P\\). Also \\((I-P)^* = I - P^* = I - P\\) since \\(P^* = P\\). The image of \\(I - P\\) is \\(W^\\perp\\) where \\(W = \\text{im}(P)\\), because \\((I-P)v = v - P v\\) is the component of \\(v\\) orthogonal to \\(W\\).'
                }
            ]
        },
        {
            id: 'ch09-sec05',
            title: 'Adjoint Operators',
            content: `
                <h2>Adjoint Operators</h2>

                <p>The adjoint generalizes matrix transpose to arbitrary linear operators on inner product spaces, enabling us to classify operators by their relationship to their adjoint.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 9.20 (Adjoint Operator)</div>
                    <div class="env-body">
                        <p>Let \\(T: V \\to W\\) be a linear operator between finite-dimensional inner product spaces. The <strong>adjoint</strong> of \\(T\\) is the unique linear operator \\(T^*: W \\to V\\) satisfying
                        \\[\\langle Tv, w \\rangle_W = \\langle v, T^*w \\rangle_V \\quad \\text{for all } v \\in V, w \\in W\\]</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.21 (Existence and Uniqueness of Adjoint)</div>
                    <div class="env-body">
                        <p>For any linear operator \\(T: V \\to W\\) between finite-dimensional inner product spaces, the adjoint \\(T^*\\) exists and is unique.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (via Riesz Representation)</div>
                    <div class="env-body">
                        <p>Fix \\(w \\in W\\). Define \\(\\phi_w: V \\to F\\) by \\(\\phi_w(v) = \\langle Tv, w \\rangle\\). This is a linear functional on \\(V\\). By the Riesz representation theorem, there exists unique \\(u \\in V\\) such that \\(\\phi_w(v) = \\langle v, u \\rangle\\) for all \\(v \\in V\\).</p>

                        <p>Define \\(T^*: W \\to V\\) by \\(T^*(w) = u\\). Then \\(\\langle Tv, w \\rangle = \\phi_w(v) = \\langle v, T^*w \\rangle\\). Linearity of \\(T^*\\) follows from uniqueness in Riesz representation.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.22 (Properties of Adjoints)</div>
                    <div class="env-body">
                        <p>For operators \\(S, T\\) and scalars \\(\\alpha, \\beta\\):</p>
                        <ol>
                            <li>\\((\\alpha S + \\beta T)^* = \\bar{\\alpha} S^* + \\bar{\\beta} T^*\\)</li>
                            <li>\\((ST)^* = T^* S^*\\)</li>
                            <li>\\((T^*)^* = T\\)</li>
                            <li>\\(I^* = I\\)</li>
                            <li>If \\(T\\) is invertible, then \\((T^{-1})^* = (T^*)^{-1}\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.23 (Matrix of the Adjoint)</div>
                    <div class="env-body">
                        <p>If \\(\\mathcal{B}\\) and \\(\\mathcal{C}\\) are orthonormal bases for \\(V\\) and \\(W\\), respectively, then
                        \\[[T^*]_{\\mathcal{C},\\mathcal{B}} = \\overline{[T]_{\\mathcal{B},\\mathcal{C}}^T}\\]
                        In other words, the matrix of \\(T^*\\) is the conjugate transpose (Hermitian transpose) of the matrix of \\(T\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.24 (Kernel and Image Relationships)</div>
                    <div class="env-body">
                        <p>For \\(T: V \\to W\\):</p>
                        <ol>
                            <li>\\(\\ker(T^*) = (\\text{im}(T))^\\perp\\)</li>
                            <li>\\(\\text{im}(T^*) = (\\ker(T))^\\perp\\)</li>
                            <li>\\(\\ker(T) = (\\text{im}(T^*))^\\perp\\)</li>
                            <li>\\(\\text{im}(T) = (\\ker(T^*))^\\perp\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof of (1)</div>
                    <div class="env-body">
                        <p>\\(w \\in \\ker(T^*) \\iff T^*w = 0 \\iff \\langle v, T^*w \\rangle = 0\\) for all \\(v \\in V\\) \\(\\iff \\langle Tv, w \\rangle = 0\\) for all \\(v \\in V\\) \\(\\iff w \\perp \\text{im}(T)\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 9.25 (Special Operators)</div>
                    <div class="env-body">
                        <p>Let \\(T: V \\to V\\) be an operator on an inner product space.</p>
                        <ul>
                            <li>\\(T\\) is <strong>self-adjoint</strong> (or <strong>Hermitian</strong>) if \\(T^* = T\\)</li>
                            <li>\\(T\\) is <strong>skew-adjoint</strong> if \\(T^* = -T\\)</li>
                            <li>\\(T\\) is <strong>normal</strong> if \\(TT^* = T^*T\\)</li>
                            <li>\\(T\\) is <strong>unitary</strong> (or <strong>orthogonal</strong> if real) if \\(T^*T = TT^* = I\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 9.26</div>
                    <div class="env-body">
                        <p><strong>(a)</strong> Rotation by \\(\\theta\\) in \\(\\mathbb{R}^2\\) has matrix \\(R_\\theta = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}\\). Then \\(R_\\theta^T = R_{-\\theta}\\) and \\(R_\\theta^T R_\\theta = I\\), so rotations are orthogonal.</p>

                        <p><strong>(b)</strong> Reflection across a line through the origin in \\(\\mathbb{R}^2\\) is orthogonal and self-adjoint.</p>

                        <p><strong>(c)</strong> The differentiation operator \\(D: P_n \\to P_n\\) on polynomials with \\(\\langle f, g \\rangle = \\int_0^1 f(x)g(x)dx\\) has adjoint \\(D^* = -D - I\\) (found via integration by parts).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="adjoint-viz"></div>
            `,
            visualizations: [
                {
                    id: 'adjoint-viz',
                    title: 'Interactive: Adjoint Operator Action',
                    description: 'Visualize the relationship between T and T* via inner products',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        let angle = 45;
                        let scale_factor = 1.5;

                        VizEngine.createSlider(controls, 'Rotation angle', 0, 180, 45, 1, (val) => {
                            angle = val;
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Scale factor', 0.5, 3, 1.5, 0.1, (val) => {
                            scale_factor = val;
                            draw();
                        });

                        const v = viz.addDraggable('v', 2, 1, viz.colors.blue, 8, () => draw());
                        const w = viz.addDraggable('w', -1, 2, viz.colors.orange, 8, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Define T as rotation by angle then scale
                            const theta = angle * Math.PI / 180;
                            const T = [
                                [scale_factor * Math.cos(theta), -scale_factor * Math.sin(theta)],
                                [scale_factor * Math.sin(theta), scale_factor * Math.cos(theta)]
                            ];

                            // T^* = (T^T for real matrices)
                            const Tstar = [
                                [T[0][0], T[1][0]],
                                [T[0][1], T[1][1]]
                            ];

                            // Compute Tv and T*w
                            const Tv = VizEngine.matVec(T, [v.x, v.y]);
                            const Tstarw = VizEngine.matVec(Tstar, [w.x, w.y]);

                            // Draw original vectors
                            viz.drawVector(0, 0, v.x, v.y, viz.colors.blue, 'v', 2);
                            viz.drawVector(0, 0, w.x, w.y, viz.colors.orange, 'w', 2);

                            // Draw transformed vectors
                            viz.drawVector(0, 0, Tv[0], Tv[1], viz.colors.blue + 'CC', 'Tv', 3);
                            viz.drawVector(0, 0, Tstarw[0], Tstarw[1], viz.colors.orange + 'CC', 'T*w', 3);

                            // Compute inner products
                            const inner1 = Tv[0] * w.x + Tv[1] * w.y;  // <Tv, w>
                            const inner2 = v.x * Tstarw[0] + v.y * Tstarw[1];  // <v, T*w>

                            // Display the key identity
                            viz.drawText(`⟨Tv, w⟩ = ${inner1.toFixed(3)}`, -4.5, 3.7, viz.colors.teal, 15);
                            viz.drawText(`⟨v, T*w⟩ = ${inner2.toFixed(3)}`, -4.5, 3.3, viz.colors.teal, 15);

                            const diff = Math.abs(inner1 - inner2);
                            if (diff < 0.001) {
                                viz.drawText('✓ Adjoint identity verified!', -4.5, 2.9, viz.colors.green, 15);
                            } else {
                                viz.drawText(`Difference: ${diff.toFixed(4)}`, -4.5, 2.9, viz.colors.red, 15);
                            }

                            viz.drawDraggables();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that an operator \\(T\\) is self-adjoint if and only if \\(\\langle Tv, v \\rangle \\in \\mathbb{R}\\) for all \\(v \\in V\\).',
                    hint: 'Use the polarization identity to express \\(\\langle Tu, v \\rangle\\) in terms of \\(\\langle T(u+v), u+v \\rangle\\), etc.',
                    solution: 'If \\(T = T^*\\), then \\(\\langle Tv, v \\rangle = \\langle v, T^*v \\rangle = \\langle v, Tv \\rangle = \\overline{\\langle Tv, v \\rangle}\\), so \\(\\langle Tv, v \\rangle\\) is real. Conversely, if \\(\\langle Tv, v \\rangle\\) is real for all \\(v\\), then by polarization identity, \\(\\langle Tu, v \\rangle = \\langle u, Tv \\rangle\\) for all \\(u, v\\), which means \\(T = T^*\\).'
                },
                {
                    question: 'Show that every operator \\(T\\) can be uniquely written as \\(T = H + iK\\) where \\(H, K\\) are self-adjoint (Cartesian decomposition).',
                    hint: 'Try \\(H = (T + T^*)/2\\) and \\(K = (T - T^*)/(2i)\\).',
                    solution: 'Define \\(H = (T + T^*)/2\\) and \\(K = (T - T^*)/(2i)\\). Then \\(H^* = (T^* + T)/2 = H\\) and \\(K^* = (T^* - T)/(2i) = K\\), so both are self-adjoint. Also \\(H + iK = T\\). Uniqueness: if \\(T = H_1 + iK_1\\) with \\(H_1, K_1\\) self-adjoint, then \\(T^* = H_1 - iK_1\\), so \\(H_1 = (T+T^*)/2 = H\\) and \\(K_1 = (T-T^*)/(2i) = K\\).'
                },
                {
                    question: 'Prove that if \\(T\\) is normal, then \\(\\|Tv\\| = \\|T^*v\\|\\) for all \\(v\\).',
                    hint: 'Compute \\(\\langle Tv, Tv \\rangle\\) and \\(\\langle T^*v, T^*v \\rangle\\) using the normality condition.',
                    solution: '\\(\\|Tv\\|^2 = \\langle Tv, Tv \\rangle = \\langle v, T^*Tv \\rangle = \\langle v, TT^*v \\rangle\\) (using \\(T^*T = TT^*\\)) \\(= \\langle T^*v, T^*v \\rangle = \\|T^*v\\|^2\\).'
                }
            ]
        },
        {
            id: 'ch09-sec06',
            title: 'The Riesz Representation Theorem',
            content: `
                <h2>The Riesz Representation Theorem</h2>

                <p>One of the most beautiful results in functional analysis: every continuous linear functional on a Hilbert space is represented by an inner product with a fixed vector.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.27 (Riesz Representation Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be a finite-dimensional inner product space. For every linear functional \\(\\phi: V \\to F\\), there exists a unique vector \\(u \\in V\\) such that
                        \\[\\phi(v) = \\langle v, u \\rangle \\quad \\text{for all } v \\in V\\]
                        We call \\(u\\) the <strong>Riesz representative</strong> of \\(\\phi\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>Uniqueness:</strong> If \\(\\phi(v) = \\langle v, u_1 \\rangle = \\langle v, u_2 \\rangle\\) for all \\(v\\), then \\(\\langle v, u_1 - u_2 \\rangle = 0\\) for all \\(v\\). Setting \\(v = u_1 - u_2\\) gives \\(u_1 = u_2\\).</p>

                        <p><strong>Existence:</strong> If \\(\\phi = 0\\), take \\(u = 0\\). Otherwise, let \\(W = \\ker(\\phi)\\). Since \\(\\phi \\neq 0\\), we have \\(\\dim(W) = \\dim(V) - 1\\). By the projection theorem, \\(V = W \\oplus W^\\perp\\) and \\(\\dim(W^\\perp) = 1\\).</p>

                        <p>Let \\(w \\in W^\\perp\\) with \\(w \\neq 0\\). For any \\(v \\in V\\), write \\(v = v_W + v_{W^\\perp}\\) where \\(v_W \\in W\\) and \\(v_{W^\\perp} = \\alpha w\\) for some \\(\\alpha \\in F\\).</p>

                        <p>Since \\(\\phi(v_W) = 0\\), we have \\(\\phi(v) = \\phi(\\alpha w) = \\alpha \\phi(w)\\). Also, \\(\\langle v, w \\rangle = \\langle \\alpha w, w \\rangle = \\alpha \\|w\\|^2\\).</p>

                        <p>Therefore, \\(\\alpha = \\langle v, w \\rangle / \\|w\\|^2\\), and
                        \\[\\phi(v) = \\frac{\\phi(w)}{\\|w\\|^2} \\langle v, w \\rangle = \\left\\langle v, \\frac{\\overline{\\phi(w)}}{\\|w\\|^2} w \\right\\rangle\\]
                        Set \\(u = \\frac{\\overline{\\phi(w)}}{\\|w\\|^2} w\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 9.28 (Canonical Isomorphism)</div>
                    <div class="env-body">
                        <p>The map \\(\\Phi: V \\to V^*\\) defined by \\(\\Phi(u) = \\langle \\cdot, u \\rangle\\) is a conjugate-linear isomorphism. That is:
                        \\[\\Phi(\\alpha u + \\beta v) = \\bar{\\alpha}\\Phi(u) + \\bar{\\beta}\\Phi(v)\\]
                        and \\(\\Phi\\) is bijective.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Relationship to Adjoint)</div>
                    <div class="env-body">
                        <p>The Riesz representation theorem is intimately connected to the adjoint. Given \\(T: V \\to W\\), for each \\(w \\in W\\), the functional \\(\\phi_w(v) = \\langle Tv, w \\rangle\\) has a Riesz representative \\(u_w \\in V\\). The map \\(w \\mapsto u_w\\) is precisely \\(T^*\\)!</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 9.29 (Computing Riesz Representatives)</div>
                    <div class="env-body">
                        <p><strong>(a)</strong> On \\(\\mathbb{R}^n\\) with standard inner product, if \\(\\phi(x) = a_1 x_1 + \\cdots + a_n x_n\\), then the Riesz representative is \\(u = (a_1, \\ldots, a_n)\\).</p>

                        <p><strong>(b)</strong> On \\(\\mathbb{C}^n\\), if \\(\\phi(z) = c_1 z_1 + \\cdots + c_n z_n\\), then \\(u = (\\bar{c_1}, \\ldots, \\bar{c_n})\\) because
                        \\[\\langle z, u \\rangle = \\sum z_i \\bar{u_i} = \\sum z_i c_i = \\phi(z)\\]</p>

                        <p><strong>(c)</strong> On \\(C[0,1]\\) with \\(\\langle f, g \\rangle = \\int_0^1 f(x)g(x)dx\\), the evaluation functional \\(\\phi(f) = f(1/2)\\) has Riesz representative \\(u = \\delta_{1/2}\\) (Dirac delta at \\(1/2\\)), but this is not in \\(C[0,1]\\)! This shows Riesz representation can fail for infinite-dimensional incomplete spaces.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.30 (Dual Basis)</div>
                    <div class="env-body">
                        <p>If \\(\\{e_1, \\ldots, e_n\\}\\) is an orthonormal basis for \\(V\\), then the dual basis \\(\\{e^1, \\ldots, e^n\\}\\) (where \\(e^i(e_j) = \\delta_{ij}\\)) consists of the functionals
                        \\[e^i(v) = \\langle v, e_i \\rangle\\]
                        Thus the Riesz representative of \\(e^i\\) is \\(e_i\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Deeper Meaning</div>
                    <div class="env-body">
                        <p>The Riesz theorem says that in an inner product space, there's no distinction between vectors and linear functionals - they're "the same thing" via the inner product. This is why physicists write \\(\\langle \\phi | v \\rangle\\) in bra-ket notation: \\(\\langle \\phi |\\) (a functional) and \\(| v \\rangle\\) (a vector) are interchangeable via the metric.</p>

                        <p>In infinite dimensions without completeness, this breaks down - not all functionals come from vectors. The Riesz theorem for Hilbert spaces (complete inner product spaces) is one of the pillars of functional analysis.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="riesz-viz"></div>
            `,
            visualizations: [
                {
                    id: 'riesz-viz',
                    title: 'Interactive: Riesz Representative Visualization',
                    description: 'See how a linear functional corresponds to a vector via inner product',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        const u = viz.addDraggable('u', 2, 1.5, viz.colors.purple, 8, () => draw());

                        let testAngle = 0;
                        let testRadius = 2;

                        VizEngine.createSlider(controls, 'Test vector angle', 0, 360, 0, 5, (val) => {
                            testAngle = val;
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Test vector length', 0, 4, 2, 0.1, (val) => {
                            testRadius = val;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw Riesz representative u
                            viz.drawVector(0, 0, u.x, u.y, viz.colors.purple, 'u (Riesz rep)', 3);

                            // Test vector v
                            const theta = testAngle * Math.PI / 180;
                            const vx = testRadius * Math.cos(theta);
                            const vy = testRadius * Math.sin(theta);
                            viz.drawVector(0, 0, vx, vy, viz.colors.blue, 'v', 3);

                            // The functional φ(v) = <v, u>
                            const phi_v = vx * u.x + vy * u.y;

                            // Draw level sets of φ (lines where φ = constant)
                            // These are perpendicular to u
                            const perpX = -u.y;
                            const perpY = u.x;
                            const perpLen = Math.sqrt(perpX * perpX + perpY * perpY);
                            const perpNormX = perpX / perpLen;
                            const perpNormY = perpY / perpLen;

                            // Draw several level sets
                            for (let c = -3; c <= 3; c++) {
                                const offset = c / Math.sqrt(u.x * u.x + u.y * u.y);
                                const baseX = offset * u.x;
                                const baseY = offset * u.y;

                                const alpha = c === 0 ? '60' : '30';
                                viz.drawLine(
                                    baseX - 5 * perpNormX, baseY - 5 * perpNormY,
                                    baseX + 5 * perpNormX, baseY + 5 * perpNormY,
                                    viz.colors.teal + alpha, 1, c !== 0
                                );

                                if (c === Math.round(phi_v)) {
                                    viz.drawText(`φ = ${c}`, baseX + 3.5 * perpNormX, baseY + 3.5 * perpNormY,
                                               viz.colors.orange, 12);
                                }
                            }

                            // Project v onto u to show the value geometrically
                            const uLenSq = u.x * u.x + u.y * u.y;
                            const projCoeff = (vx * u.x + vy * u.y) / uLenSq;
                            const projX = projCoeff * u.x;
                            const projY = projCoeff * u.y;
                            viz.drawVector(0, 0, projX, projY, viz.colors.orange + 'AA', '', 2);
                            viz.drawSegment(projX, projY, vx, vy, viz.colors.teal + '60', 1, true);

                            // Display values
                            viz.drawText(`φ(v) = ⟨v, u⟩ = ${phi_v.toFixed(3)}`, -4.5, 3.7, viz.colors.orange, 15);
                            viz.drawText(`‖u‖ = ${Math.sqrt(uLenSq).toFixed(3)}`, -4.5, 3.3, viz.colors.purple, 14);
                            viz.drawText(`‖v‖ = ${testRadius.toFixed(3)}`, -4.5, 2.9, viz.colors.blue, 14);

                            // Gradient information
                            viz.drawText('Level curves: φ(v) = constant', -4.5, 2.3, viz.colors.teal, 13);
                            viz.drawText('Gradient ∇φ points along u', -4.5, 1.9, viz.colors.purple, 13);

                            viz.drawDraggables();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(V = \\mathbb{R}^3\\) with standard inner product. Find the Riesz representative of \\(\\phi(x, y, z) = 2x - 3y + z\\).',
                    hint: 'The Riesz representative is the vector whose dot product with \\((x,y,z)\\) gives \\(\\phi(x,y,z)\\).',
                    solution: 'The Riesz representative is \\(u = (2, -3, 1)\\) since \\(\\langle (x,y,z), (2,-3,1) \\rangle = 2x - 3y + z = \\phi(x,y,z)\\).'
                },
                {
                    question: 'Prove that the map \\(V \\to V^*\\) given by \\(u \\mapsto \\langle \\cdot, u \\rangle\\) is conjugate-linear (i.e., \\(\\alpha u \\mapsto \\bar{\\alpha} \\langle \\cdot, u \\rangle\\)).',
                    hint: 'Check what happens to \\(\\langle v, \\alpha u \\rangle\\).',
                    solution: 'For any \\(v \\in V\\), \\(\\langle v, \\alpha u \\rangle = \\bar{\\alpha} \\langle v, u \\rangle\\) by conjugate linearity of the inner product in the second argument. Thus \\(\\alpha u\\) maps to the functional \\(v \\mapsto \\bar{\\alpha}\\langle v, u \\rangle = \\bar{\\alpha}\\phi_u(v)\\).'
                },
                {
                    question: 'Show that in a finite-dimensional inner product space, \\(V\\) and \\(V^*\\) have the same dimension, and construct an explicit isomorphism.',
                    hint: 'Use an orthonormal basis.',
                    solution: 'Let \\(\\{e_1, \\ldots, e_n\\}\\) be an orthonormal basis for \\(V\\). Define \\(\\Psi: V \\to V^*\\) by \\(\\Psi(u) = \\langle \\cdot, u \\rangle\\). This is bijective by Riesz representation. Alternatively, map \\(e_i \\mapsto e^i\\) where \\(e^i\\) is the dual basis functional. Both spaces have dimension \\(n\\).'
                }
            ]
        },
        {
            id: 'ch09-sec07',
            title: 'Orthonormal Bases and Parseval\'s Identity',
            content: `
                <h2>Orthonormal Bases and Parseval's Identity</h2>

                <p>Orthonormal bases are the "ideal" bases for inner product spaces, allowing explicit coordinate representations and powerful identities.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 9.31 (Orthonormal Basis)</div>
                    <div class="env-body">
                        <p>An <strong>orthonormal basis</strong> for an inner product space \\(V\\) is a basis \\(\\{e_1, \\ldots, e_n\\}\\) satisfying
                        \\[\\langle e_i, e_j \\rangle = \\delta_{ij} = \\begin{cases} 1 & i = j \\\\ 0 & i \\neq j \\end{cases}\\]</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.32 (Existence of Orthonormal Bases)</div>
                    <div class="env-body">
                        <p>Every finite-dimensional inner product space has an orthonormal basis. Moreover, every orthonormal set can be extended to an orthonormal basis.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Start with any basis and apply Gram-Schmidt to obtain an orthogonal basis, then normalize. For extension, if \\(\\{e_1, \\ldots, e_k\\}\\) is orthonormal, let \\(W = \\text{span}\\{e_1, \\ldots, e_k\\}\\). If \\(W \\neq V\\), pick \\(v \\in W^\\perp\\) with \\(v \\neq 0\\), and set \\(e_{k+1} = v/\\|v\\|\\). Continue inductively.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.33 (Fourier Expansion)</div>
                    <div class="env-body">
                        <p>If \\(\\{e_1, \\ldots, e_n\\}\\) is an orthonormal basis for \\(V\\), then every \\(v \\in V\\) has the unique representation
                        \\[v = \\sum_{i=1}^{n} \\langle v, e_i \\rangle e_i\\]
                        The scalars \\(\\langle v, e_i \\rangle\\) are called the <strong>Fourier coefficients</strong> of \\(v\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Since \\(\\{e_i\\}\\) is a basis, \\(v = \\sum c_i e_i\\) for unique scalars \\(c_i\\). Taking inner product with \\(e_j\\):
                        \\[\\langle v, e_j \\rangle = \\left\\langle \\sum_i c_i e_i, e_j \\right\\rangle = \\sum_i c_i \\langle e_i, e_j \\rangle = c_j\\]
                        by orthonormality.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.34 (Parseval's Identity)</div>
                    <div class="env-body">
                        <p>If \\(\\{e_1, \\ldots, e_n\\}\\) is an orthonormal basis for \\(V\\), then for all \\(u, v \\in V\\):
                        \\[\\langle u, v \\rangle = \\sum_{i=1}^{n} \\langle u, e_i \\rangle \\overline{\\langle v, e_i \\rangle}\\]
                        In particular (taking \\(u = v\\)):
                        \\[\\|v\\|^2 = \\sum_{i=1}^{n} |\\langle v, e_i \\rangle|^2\\]</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Using Fourier expansions \\(u = \\sum_i \\langle u, e_i \\rangle e_i\\) and \\(v = \\sum_j \\langle v, e_j \\rangle e_j\\):
                        \\begin{align*}
                        \\langle u, v \\rangle &= \\left\\langle \\sum_i \\langle u, e_i \\rangle e_i, \\sum_j \\langle v, e_j \\rangle e_j \\right\\rangle\\\\
                        &= \\sum_{i,j} \\langle u, e_i \\rangle \\overline{\\langle v, e_j \\rangle} \\langle e_i, e_j \\rangle\\\\
                        &= \\sum_i \\langle u, e_i \\rangle \\overline{\\langle v, e_i \\rangle}
                        \\end{align*}</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 9.35 (Bessel's Equality)</div>
                    <div class="env-body">
                        <p>For an orthonormal basis, Bessel's inequality becomes an equality:
                        \\[\\sum_{i=1}^{n} |\\langle v, e_i \\rangle|^2 = \\|v\\|^2\\]</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 9.36 (Matrix Representation)</div>
                    <div class="env-body">
                        <p>Relative to an orthonormal basis \\(\\mathcal{B} = \\{e_1, \\ldots, e_n\\}\\), a linear operator \\(T: V \\to V\\) has matrix entries
                        \\[T_{ij} = \\langle Te_j, e_i \\rangle\\]
                        and for any vector \\(v = \\sum_j v_j e_j\\),
                        \\[Tv = \\sum_{i,j} \\langle Te_j, e_i \\rangle v_j e_i\\]</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 9.37 (Infinite-Dimensional Analogue)</div>
                    <div class="env-body">
                        <p>In \\(L^2[0, 2\\pi]\\), the set \\(\\{e^{inx}/\\sqrt{2\\pi} : n \\in \\mathbb{Z}\\}\\) is an orthonormal basis (Fourier basis). Any \\(f \\in L^2[0, 2\\pi]\\) has Fourier series
                        \\[f(x) = \\sum_{n=-\\infty}^{\\infty} c_n e^{inx}, \\quad c_n = \\frac{1}{2\\pi}\\int_0^{2\\pi} f(x)e^{-inx}dx\\]
                        Parseval's identity becomes
                        \\[\\frac{1}{2\\pi}\\int_0^{2\\pi} |f(x)|^2 dx = \\sum_{n=-\\infty}^{\\infty} |c_n|^2\\]
                        This is the foundation of Fourier analysis!</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Geometric Picture</div>
                    <div class="env-body">
                        <p>Parseval's identity says that orthonormal bases preserve both inner products and norms - they're "perfect coordinate systems" for the inner product space. The transition from finite to infinite dimensions (Fourier series, wavelets, etc.) is one of the great triumphs of 20th century mathematics, underlying signal processing, quantum mechanics, and PDEs.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="parseval-viz"></div>
            `,
            visualizations: [
                {
                    id: 'parseval-viz',
                    title: 'Interactive: Parseval\'s Identity Verification',
                    description: 'Verify Parseval\'s identity with orthonormal coordinates',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        const v = viz.addDraggable('v', 2.5, 1.8, viz.colors.green, 8, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Standard orthonormal basis
                            const e1x = 1, e1y = 0;
                            const e2x = 0, e2y = 1;

                            viz.drawVector(0, 0, e1x, e1y, viz.colors.blue, 'e₁', 2);
                            viz.drawVector(0, 0, e2x, e2y, viz.colors.orange, 'e₂', 2);

                            // Vector v
                            viz.drawVector(0, 0, v.x, v.y, viz.colors.green, 'v', 3);

                            // Fourier coefficients
                            const c1 = v.x * e1x + v.y * e1y;  // <v, e1>
                            const c2 = v.x * e2x + v.y * e2y;  // <v, e2>

                            // Draw components
                            viz.drawVector(0, 0, c1 * e1x, c1 * e1y, viz.colors.blue + 'AA', '', 2);
                            viz.drawVector(0, 0, c2 * e2x, c2 * e2y, viz.colors.orange + 'AA', '', 2);

                            // Draw parallelogram showing decomposition
                            viz.drawSegment(c1, 0, v.x, v.y, viz.colors.orange + '60', 1, true);
                            viz.drawSegment(0, c2, v.x, v.y, viz.colors.blue + '60', 1, true);

                            // Compute norms
                            const normV = Math.sqrt(v.x * v.x + v.y * v.y);
                            const sumCoeffs = Math.sqrt(c1 * c1 + c2 * c2);

                            // Display Parseval's identity
                            viz.drawText('Parseval\'s Identity:', -4.5, 3.7, viz.colors.white, 15);
                            viz.drawText(`‖v‖² = ${(normV * normV).toFixed(4)}`, -4.5, 3.3, viz.colors.green, 14);
                            viz.drawText(`|⟨v,e₁⟩|² + |⟨v,e₂⟩|² = ${(c1*c1 + c2*c2).toFixed(4)}`, -4.5, 2.9, viz.colors.teal, 14);

                            const diff = Math.abs(normV * normV - (c1*c1 + c2*c2));
                            if (diff < 0.0001) {
                                viz.drawText('✓ Identity verified!', -4.5, 2.5, viz.colors.green, 15);
                            } else {
                                viz.drawText(`Error: ${diff.toFixed(6)}`, -4.5, 2.5, viz.colors.red, 14);
                            }

                            // Show coefficients
                            viz.drawText(`⟨v, e₁⟩ = ${c1.toFixed(3)}`, -4.5, 1.9, viz.colors.blue, 13);
                            viz.drawText(`⟨v, e₂⟩ = ${c2.toFixed(3)}`, -4.5, 1.5, viz.colors.orange, 13);
                            viz.drawText(`v = ${c1.toFixed(2)}e₁ + ${c2.toFixed(2)}e₂`, -4.5, 1.1, viz.colors.green, 13);

                            viz.drawDraggables();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that if \\(\\{e_1, \\ldots, e_n\\}\\) and \\(\\{f_1, \\ldots, f_n\\}\\) are two orthonormal bases for \\(V\\), then the change-of-basis matrix \\(P\\) with \\(P_{ij} = \\langle f_i, e_j \\rangle\\) is unitary (orthogonal if real).',
                    hint: 'Show that \\(P^*P = I\\) using orthonormality.',
                    solution: 'The \\((i,j)\\) entry of \\(P^*P\\) is \\(\\sum_k \\overline{P_{ki}} P_{kj} = \\sum_k \\overline{\\langle f_k, e_i \\rangle} \\langle f_k, e_j \\rangle\\). By Parseval\'s identity applied to \\(e_i\\) and \\(e_j\\) in the basis \\(\\{f_k\\}\\), this equals \\(\\langle e_i, e_j \\rangle = \\delta_{ij}\\). Thus \\(P^*P = I\\).'
                },
                {
                    question: 'Let \\(V = \\mathbb{C}^3\\) with standard inner product. Verify Parseval\'s identity for \\(v = (1, i, 1+i)\\) using the standard basis.',
                    hint: 'Compute \\(\\|v\\|^2\\) directly and compare with \\(\\sum |v_i|^2\\).',
                    solution: '\\(\\|v\\|^2 = |1|^2 + |i|^2 + |1+i|^2 = 1 + 1 + 2 = 4\\). The Fourier coefficients are \\(\\langle v, e_1 \\rangle = 1\\), \\(\\langle v, e_2 \\rangle = i\\), \\(\\langle v, e_3 \\rangle = 1+i\\). Thus \\(\\sum |\\langle v, e_i \\rangle|^2 = 1 + 1 + 2 = 4\\). ✓'
                },
                {
                    question: 'Show that in an infinite-dimensional space, Bessel\'s inequality \\(\\sum |\\langle v, e_i \\rangle|^2 \\leq \\|v\\|^2\\) can be strict even for a maximal orthonormal set.',
                    hint: 'Consider the example of sequences with finite support in \\(\\ell^2\\).',
                    solution: 'In \\(\\ell^2\\), let \\(e_i\\) be the standard basis. The vector \\(v = (1, 1/2, 1/3, \\ldots)\\) has \\(\\|v\\|^2 = \\sum 1/n^2 = \\pi^2/6\\). If we only sum the first \\(N\\) Fourier coefficients, \\(\\sum_{i=1}^N |\\langle v, e_i \\rangle|^2 = \\sum_{i=1}^N 1/i^2 < \\pi^2/6\\). The equality holds only in the limit \\(N \\to \\infty\\).'
                }
            ]
        }
    ]
});
