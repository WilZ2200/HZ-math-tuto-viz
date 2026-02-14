window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch13',
    number: 13,
    title: 'Hilbert Spaces',
    subtitle: 'Complete inner product spaces, orthonormal bases, and the Riesz representation theorem',
    sections: [
        {
            id: 'ch13-sec01',
            title: 'Complete Subspaces and Projections',
            content: `
                <h2>Complete Subspaces and Projections</h2>

                <p>A Hilbert space is a complete inner product space, meaning that every Cauchy sequence converges. This completeness property is fundamental to much of functional analysis and allows us to generalize many finite-dimensional results to infinite dimensions.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.1 (Hilbert Space)</div>
                    <div class="env-body">
                        <p>An <strong>inner product space</strong> \\((H, \\langle \\cdot, \\cdot \\rangle)\\) is called a <strong>Hilbert space</strong> if it is complete with respect to the metric induced by its inner product, that is, if every Cauchy sequence in \\(H\\) converges to an element of \\(H\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 13.1</div>
                    <div class="env-body">
                        <p>The following are Hilbert spaces:</p>
                        <ul>
                            <li>\\(\\mathbb{R}^n\\) and \\(\\mathbb{C}^n\\) with the standard inner product \\(\\langle x, y \\rangle = \\sum_{i=1}^n x_i \\overline{y_i}\\)</li>
                            <li>\\(\\ell^2\\), the space of square-summable sequences \\(\\{a_n\\}\\) with \\(\\sum_{n=1}^\\infty |a_n|^2 < \\infty\\) and inner product \\(\\langle a, b \\rangle = \\sum_{n=1}^\\infty a_n \\overline{b_n}\\)</li>
                            <li>\\(L^2[a,b]\\), the space of square-integrable functions on \\([a,b]\\) with \\(\\langle f, g \\rangle = \\int_a^b f(x)\\overline{g(x)}\\,dx\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.2 (Best Approximation Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(H\\) be an inner product space and let \\(W\\) be a complete subspace of \\(H\\). Then for any \\(v \\in H\\), there exists a unique <strong>best approximation</strong> \\(\\hat{v} \\in W\\) such that</p>
                        \\[\\|v - \\hat{v}\\| = \\inf_{w \\in W} \\|v - w\\|\\]
                        <p>Moreover, \\(\\hat{v}\\) is characterized by the orthogonality condition: \\(v - \\hat{v} \\perp W\\), meaning \\(\\langle v - \\hat{v}, w \\rangle = 0\\) for all \\(w \\in W\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Let \\(d = \\inf_{w \\in W} \\|v - w\\|\\). Choose a sequence \\(\\{w_n\\} \\subset W\\) such that \\(\\|v - w_n\\| \\to d\\). By the parallelogram law,</p>
                        \\[\\|w_m - w_n\\|^2 = 2\\|v - w_m\\|^2 + 2\\|v - w_n\\|^2 - \\|2v - w_m - w_n\\|^2\\]
                        <p>Since \\(\\frac{w_m + w_n}{2} \\in W\\), we have \\(\\|v - \\frac{w_m + w_n}{2}\\| \\geq d\\), so</p>
                        \\[\\|w_m - w_n\\|^2 \\leq 2\\|v - w_m\\|^2 + 2\\|v - w_n\\|^2 - 4d^2 \\to 0\\]
                        <p>Thus \\(\\{w_n\\}\\) is Cauchy. Since \\(W\\) is complete, \\(w_n \\to \\hat{v} \\in W\\). By continuity of the norm, \\(\\|v - \\hat{v}\\| = d\\).</p>
                        <p>For the orthogonality: for any \\(w \\in W\\) and \\(\\lambda \\in \\mathbb{C}\\),</p>
                        \\[\\|v - \\hat{v}\\|^2 \\leq \\|v - \\hat{v} - \\lambda w\\|^2 = \\|v - \\hat{v}\\|^2 - 2\\text{Re}(\\lambda \\langle v - \\hat{v}, w \\rangle) + |\\lambda|^2 \\|w\\|^2\\]
                        <p>Choosing \\(\\lambda = \\frac{\\langle v - \\hat{v}, w \\rangle}{\\|w\\|^2}\\) gives \\(\\langle v - \\hat{v}, w \\rangle = 0\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.3 (Projection Theorem)</div>
                    <div class="env-body">
                        <p>If \\(W\\) is a closed subspace of a Hilbert space \\(H\\), then</p>
                        \\[H = W \\oplus W^\\perp\\]
                        <p>where \\(W^\\perp = \\{v \\in H : \\langle v, w \\rangle = 0 \\text{ for all } w \\in W\\}\\) is the <strong>orthogonal complement</strong> of \\(W\\). Every \\(v \\in H\\) can be uniquely written as \\(v = \\hat{v} + (v - \\hat{v})\\) where \\(\\hat{v} \\in W\\) and \\(v - \\hat{v} \\in W^\\perp\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The projection theorem says that in a Hilbert space, every vector can be uniquely decomposed into a component "inside" a closed subspace and a component "perpendicular" to it. This generalizes the familiar geometric intuition from \\(\\mathbb{R}^3\\) to infinite-dimensional spaces. The completeness of the subspace is crucial - without it, the best approximation might not exist.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="projection-viz"></div>
            `,
            visualizations: [
                {
                    id: 'projection-viz',
                    title: 'Interactive: Orthogonal Projection in Hilbert Space',
                    description: 'Drag the vector to see its orthogonal projection onto a subspace',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        // Subspace spanned by (1, 0.5)
                        const subspaceDir = {x: 1, y: 0.5};
                        const len = Math.sqrt(subspaceDir.x * subspaceDir.x + subspaceDir.y * subspaceDir.y);
                        subspaceDir.x /= len;
                        subspaceDir.y /= len;

                        const v = viz.addDraggable('v', 3, 2, viz.colors.blue, 8, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw the subspace as a line
                            viz.drawLine(-5 * subspaceDir.x, -5 * subspaceDir.y,
                                        5 * subspaceDir.x, 5 * subspaceDir.y,
                                        viz.colors.green + '88', 2);
                            viz.drawText('W (subspace)', 4 * subspaceDir.x, 4 * subspaceDir.y - 0.5,
                                        viz.colors.green, 14);

                            // Calculate projection
                            const dot = v.x * subspaceDir.x + v.y * subspaceDir.y;
                            const projX = dot * subspaceDir.x;
                            const projY = dot * subspaceDir.y;

                            // Draw projection
                            viz.drawVector(0, 0, projX, projY, viz.colors.orange, 'v̂');

                            // Draw original vector
                            viz.drawVector(0, 0, v.x, v.y, viz.colors.blue, 'v');

                            // Draw orthogonal component
                            viz.drawSegment(projX, projY, v.x, v.y, viz.colors.purple, 2, true);
                            viz.drawVector(projX, projY, v.x, v.y, viz.colors.purple, 'v - v̂');

                            // Show right angle
                            const scale = 0.3;
                            const perpX = -(v.y - projY) * scale;
                            const perpY = (v.x - projX) * scale;
                            viz.drawSegment(projX, projY, projX + perpX, projY + perpY, viz.colors.white + '88', 1);
                            viz.drawSegment(projX + perpX, projY + perpY,
                                          projX + perpX + scale * subspaceDir.x,
                                          projY + perpY + scale * subspaceDir.y,
                                          viz.colors.white + '88', 1);

                            viz.drawDraggables();

                            // Display info
                            const dist = Math.sqrt((v.x - projX) ** 2 + (v.y - projY) ** 2);
                            viz.drawText('‖v - v̂‖ = ' + dist.toFixed(2), -6, -4.5, viz.colors.text, 14, 'left');
                            viz.drawText('⟨v - v̂, v̂⟩ = 0', -6, -5.2, viz.colors.text, 14, 'left');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that \\(W^\\perp\\) is always a closed subspace of \\(H\\), even if \\(W\\) is not closed.',
                    hint: 'Show that \\(W^\\perp = \\bigcap_{w \\in W} \\ker(\\langle \\cdot, w \\rangle)\\) and use the fact that the inner product is continuous.',
                    solution: 'For each \\(w \\in W\\), the functional \\(f_w(v) = \\langle v, w \\rangle\\) is continuous (by Cauchy-Schwarz). Thus \\(\\ker(f_w)\\) is closed. Since \\(W^\\perp\\) is the intersection of closed sets, it is closed. To verify it is a subspace: if \\(v_1, v_2 \\in W^\\perp\\) and \\(\\alpha, \\beta \\in \\mathbb{C}\\), then for any \\(w \\in W\\), \\(\\langle \\alpha v_1 + \\beta v_2, w \\rangle = \\alpha \\langle v_1, w \\rangle + \\beta \\langle v_2, w \\rangle = 0\\).'
                },
                {
                    question: 'Let \\(W\\) be a closed subspace of a Hilbert space \\(H\\). Prove that \\((W^\\perp)^\\perp = W\\).',
                    hint: 'One inclusion is easy. For the other, use the projection theorem.',
                    solution: 'Clearly \\(W \\subseteq (W^\\perp)^\\perp\\) since if \\(w \\in W\\) and \\(v \\in W^\\perp\\), then \\(\\langle w, v \\rangle = 0\\). For the reverse inclusion, let \\(v \\in (W^\\perp)^\\perp\\). By the projection theorem, \\(v = w + u\\) where \\(w \\in W\\) and \\(u \\in W^\\perp\\). Then \\(0 = \\langle v, u \\rangle = \\langle w + u, u \\rangle = \\langle w, u \\rangle + \\|u\\|^2 = \\|u\\|^2\\), so \\(u = 0\\) and \\(v = w \\in W\\).'
                },
                {
                    question: 'Show that the space \\(c_{00}\\) of sequences with only finitely many nonzero terms is not complete under the \\(\\ell^2\\) norm, and thus is not a Hilbert space.',
                    hint: 'Find a Cauchy sequence in \\(c_{00}\\) whose limit (in \\(\\ell^2\\)) is not in \\(c_{00}\\).',
                    solution: 'Consider the sequence \\(\\{x^{(n)}\\}\\) where \\(x^{(n)} = (1, \\frac{1}{2}, \\frac{1}{3}, \\ldots, \\frac{1}{n}, 0, 0, \\ldots)\\). Each \\(x^{(n)} \\in c_{00}\\) and \\(\\|x^{(m)} - x^{(n)}\\|^2 = \\sum_{k=n+1}^m \\frac{1}{k^2} \\to 0\\) as \\(n, m \\to \\infty\\), so it is Cauchy. But the limit is \\(x = (1, \\frac{1}{2}, \\frac{1}{3}, \\ldots) \\in \\ell^2 \\setminus c_{00}\\).'
                }
            ]
        },
        {
            id: 'ch13-sec02',
            title: 'Hilbert Bases and Orthonormal Sets',
            content: `
                <h2>Hilbert Bases and Orthonormal Sets</h2>

                <p>In finite-dimensional spaces, orthonormal bases provide a canonical way to represent vectors. In Hilbert spaces, we need a more subtle notion called a Hilbert basis (or complete orthonormal system), which generalizes this concept to infinite dimensions.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.4 (Orthonormal Set)</div>
                    <div class="env-body">
                        <p>A set \\(\\{e_\\alpha\\}_{\\alpha \\in I}\\) in a Hilbert space \\(H\\) is called <strong>orthonormal</strong> if</p>
                        \\[\\langle e_\\alpha, e_\\beta \\rangle = \\delta_{\\alpha\\beta} = \\begin{cases} 1 & \\text{if } \\alpha = \\beta \\\\ 0 & \\text{if } \\alpha \\neq \\beta \\end{cases}\\]
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.5 (Hilbert Basis)</div>
                    <div class="env-body">
                        <p>A <strong>Hilbert basis</strong> (or <strong>complete orthonormal system</strong>) for a Hilbert space \\(H\\) is a maximal orthonormal set, that is, an orthonormal set \\(\\{e_\\alpha\\}_{\\alpha \\in I}\\) such that if \\(\\langle v, e_\\alpha \\rangle = 0\\) for all \\(\\alpha \\in I\\), then \\(v = 0\\).</p>
                        <p>Equivalently, \\(\\{e_\\alpha\\}\\) is a Hilbert basis if the closed linear span of \\(\\{e_\\alpha\\}\\) equals \\(H\\), that is, \\(\\overline{\\text{span}}\\{e_\\alpha\\} = H\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The term "Hilbert basis" is somewhat misleading because it differs from a Hamel basis (algebraic basis). A Hilbert basis for an infinite-dimensional space is <em>not</em> a Hamel basis. For instance, the standard basis \\(\\{e_n\\}\\) for \\(\\ell^2\\) is a Hilbert basis, but elements of \\(\\ell^2\\) cannot be expressed as finite linear combinations of the \\(e_n\\). Instead, we have convergent infinite series.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 13.2</div>
                    <div class="env-body">
                        <p>Important examples of Hilbert bases:</p>
                        <ul>
                            <li><strong>Standard basis for \\(\\ell^2\\)</strong>: \\(e_n = (0, \\ldots, 0, 1, 0, \\ldots)\\) with 1 in the \\(n\\)-th position</li>
                            <li><strong>Fourier basis for \\(L^2[-\\pi, \\pi]\\)</strong>: \\(\\frac{1}{\\sqrt{2\\pi}}\\{1, \\cos(nx), \\sin(nx)\\}_{n=1}^\\infty\\) or equivalently \\(\\frac{1}{\\sqrt{2\\pi}}\\{e^{inx}\\}_{n \\in \\mathbb{Z}}\\)</li>
                            <li><strong>Legendre polynomials</strong> (after orthonormalization) for \\(L^2[-1,1]\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.6 (Existence of Hilbert Bases)</div>
                    <div class="env-body">
                        <p>Every Hilbert space has a Hilbert basis. Moreover, any orthonormal set can be extended to a Hilbert basis.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Sketch)</div>
                    <div class="env-body">
                        <p>Apply Zorn's lemma to the collection of all orthonormal sets, ordered by inclusion. A maximal element exists and is a Hilbert basis.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.7 (Characterization of Hilbert Bases)</div>
                    <div class="env-body">
                        <p>Let \\(\\{e_\\alpha\\}_{\\alpha \\in I}\\) be an orthonormal set in a Hilbert space \\(H\\). The following are equivalent:</p>
                        <ol>
                            <li>\\(\\{e_\\alpha\\}\\) is a Hilbert basis (maximal orthonormal set)</li>
                            <li>\\(\\{e_\\alpha\\}^\\perp = \\{0\\}\\)</li>
                            <li>\\(\\overline{\\text{span}}\\{e_\\alpha\\} = H\\)</li>
                            <li>For every \\(v \\in H\\), \\(v = \\sum_{\\alpha \\in I} \\langle v, e_\\alpha \\rangle e_\\alpha\\) (Fourier series)</li>
                            <li>Parseval's identity holds: \\(\\|v\\|^2 = \\sum_{\\alpha \\in I} |\\langle v, e_\\alpha \\rangle|^2\\) for all \\(v \\in H\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>A Hilbert basis allows us to represent every element of the space as a (possibly infinite) series of orthogonal components, just like we can decompose vectors in \\(\\mathbb{R}^3\\) along orthogonal axes. The key difference is that in infinite dimensions, we need the series to converge in the norm topology. Parseval's identity is the infinite-dimensional version of the Pythagorean theorem.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="fourier-series-viz"></div>
            `,
            visualizations: [
                {
                    id: 'fourier-series-viz',
                    title: 'Interactive: Fourier Series Approximation',
                    description: 'See how adding more Fourier basis elements improves the approximation',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        let numTerms = 3;
                        const slider = VizEngine.createSlider(controls, 'Number of terms', 1, 20, numTerms, 1, (val) => {
                            numTerms = val;
                            draw();
                        });

                        // Target function: square wave
                        function targetFunc(x) {
                            const period = 2 * Math.PI;
                            const xMod = ((x % period) + period) % period;
                            return xMod < Math.PI ? 1 : -1;
                        }

                        // Fourier coefficients for square wave: b_n = 4/(n*pi) for odd n, 0 for even n
                        function fourierApprox(x, n) {
                            let sum = 0;
                            for (let k = 1; k <= n; k++) {
                                if (k % 2 === 1) {
                                    sum += (4 / (k * Math.PI)) * Math.sin(k * x);
                                }
                            }
                            return sum;
                        }

                        function draw() {
                            viz.clear();

                            // Draw axes
                            const ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.white + '44';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(0, viz.height / 2);
                            ctx.lineTo(viz.width, viz.height / 2);
                            ctx.moveTo(viz.width / 2, 0);
                            ctx.lineTo(viz.width / 2, viz.height);
                            ctx.stroke();

                            // Draw target function (square wave)
                            ctx.strokeStyle = viz.colors.green + 'AA';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (let px = 0; px < viz.width; px++) {
                                const x = (px - viz.width / 2) / 40;
                                const y = targetFunc(x);
                                const py = viz.height / 2 - y * 40;
                                if (px === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Draw Fourier approximation
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (let px = 0; px < viz.width; px++) {
                                const x = (px - viz.width / 2) / 40;
                                const y = fourierApprox(x, numTerms);
                                const py = viz.height / 2 - y * 40;
                                if (px === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Labels
                            viz.screenText('Target: Square Wave', 20, 30, viz.colors.green, 14, 'left');
                            viz.screenText('Fourier Approx (' + numTerms + ' terms)', 20, 50, viz.colors.blue, 14, 'left');
                            viz.screenText('f(x) ≈ Σ bₙsin(nx)', 20, 70, viz.colors.text, 12, 'left');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that if \\(\\{e_n\\}_{n=1}^\\infty\\) is an orthonormal sequence in a Hilbert space \\(H\\) and \\(v \\in H\\), then only countably many of the Fourier coefficients \\(\\langle v, e_n \\rangle\\) are nonzero.',
                    hint: 'Use Bessel\'s inequality to show that \\(|\\langle v, e_n \\rangle| \\geq \\epsilon\\) for only finitely many \\(n\\) for each \\(\\epsilon > 0\\).',
                    solution: 'By Bessel\'s inequality, \\(\\sum_{n=1}^\\infty |\\langle v, e_n \\rangle|^2 \\leq \\|v\\|^2 < \\infty\\). For each \\(k \\in \\mathbb{N}\\), let \\(S_k = \\{n : |\\langle v, e_n \\rangle| \\geq 1/k\\}\\). Then \\(|S_k| \\cdot (1/k)^2 \\leq \\sum_{n \\in S_k} |\\langle v, e_n \\rangle|^2 \\leq \\|v\\|^2\\), so \\(|S_k| \\leq k^2 \\|v\\|^2\\) is finite. The set of nonzero coefficients is \\(\\bigcup_{k=1}^\\infty S_k\\), a countable union of finite sets, hence countable.'
                },
                {
                    question: 'Show that the set \\(\\{\\frac{1}{\\sqrt{2\\pi}} e^{inx}\\}_{n \\in \\mathbb{Z}}\\) is an orthonormal set in \\(L^2[-\\pi, \\pi]\\).',
                    hint: 'Compute \\(\\int_{-\\pi}^\\pi e^{i(n-m)x}\\,dx\\) directly.',
                    solution: 'For \\(n \\neq m\\), \\[\\langle e^{inx}, e^{imx} \\rangle = \\frac{1}{2\\pi} \\int_{-\\pi}^\\pi e^{inx} \\overline{e^{imx}}\\,dx = \\frac{1}{2\\pi} \\int_{-\\pi}^\\pi e^{i(n-m)x}\\,dx = \\frac{1}{2\\pi} \\left[\\frac{e^{i(n-m)x}}{i(n-m)}\\right]_{-\\pi}^\\pi = 0\\] since \\(e^{i(n-m)\\pi} = e^{-i(n-m)\\pi}\\). For \\(n = m\\), \\(\\langle e^{inx}, e^{inx} \\rangle = \\frac{1}{2\\pi} \\int_{-\\pi}^\\pi 1\\,dx = 1\\).'
                }
            ]
        },
        {
            id: 'ch13-sec03',
            title: 'Parseval\'s Identity and Bessel\'s Inequality',
            content: `
                <h2>Parseval's Identity and Bessel's Inequality</h2>

                <p>Parseval's identity and Bessel's inequality are fundamental results that relate the norm of a vector to its Fourier coefficients with respect to an orthonormal set. These results are essential for understanding convergence in Hilbert spaces.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.8 (Bessel's Inequality)</div>
                    <div class="env-body">
                        <p>Let \\(\\{e_\\alpha\\}_{\\alpha \\in I}\\) be an orthonormal set in a Hilbert space \\(H\\). For any \\(v \\in H\\),</p>
                        \\[\\sum_{\\alpha \\in I} |\\langle v, e_\\alpha \\rangle|^2 \\leq \\|v\\|^2\\]
                        <p>with equality if and only if \\(v \\in \\overline{\\text{span}}\\{e_\\alpha\\}\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>For any finite subset \\(F \\subset I\\), let \\(v_F = \\sum_{\\alpha \\in F} \\langle v, e_\\alpha \\rangle e_\\alpha\\). Then \\(v - v_F \\perp v_F\\), so by the Pythagorean theorem,</p>
                        \\[\\|v\\|^2 = \\|v_F\\|^2 + \\|v - v_F\\|^2 \\geq \\|v_F\\|^2 = \\sum_{\\alpha \\in F} |\\langle v, e_\\alpha \\rangle|^2\\]
                        <p>Since this holds for all finite \\(F\\), taking the supremum over all finite subsets gives Bessel's inequality. Equality holds if and only if \\(\\|v - v_F\\|^2 = 0\\) for \\(F\\) large enough, which means \\(v\\) is in the closed span.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.9 (Parseval's Identity)</div>
                    <div class="env-body">
                        <p>Let \\(\\{e_\\alpha\\}_{\\alpha \\in I}\\) be a Hilbert basis for \\(H\\). Then for all \\(v, w \\in H\\),</p>
                        \\[\\langle v, w \\rangle = \\sum_{\\alpha \\in I} \\langle v, e_\\alpha \\rangle \\overline{\\langle w, e_\\alpha \\rangle}\\]
                        <p>In particular, taking \\(w = v\\),</p>
                        \\[\\|v\\|^2 = \\sum_{\\alpha \\in I} |\\langle v, e_\\alpha \\rangle|^2\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Since \\(\\{e_\\alpha\\}\\) is a Hilbert basis, \\(v = \\sum_{\\alpha} \\langle v, e_\\alpha \\rangle e_\\alpha\\) and \\(w = \\sum_{\\beta} \\langle w, e_\\beta \\rangle e_\\beta\\). By continuity of the inner product,</p>
                        \\[\\langle v, w \\rangle = \\left\\langle \\sum_{\\alpha} \\langle v, e_\\alpha \\rangle e_\\alpha, \\sum_{\\beta} \\langle w, e_\\beta \\rangle e_\\beta \\right\\rangle = \\sum_{\\alpha, \\beta} \\langle v, e_\\alpha \\rangle \\overline{\\langle w, e_\\beta \\rangle} \\langle e_\\alpha, e_\\beta \\rangle\\]
                        <p>Since \\(\\langle e_\\alpha, e_\\beta \\rangle = \\delta_{\\alpha\\beta}\\), only the \\(\\alpha = \\beta\\) terms survive.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 13.3 (Fourier Series on \\(L^2[-\\pi, \\pi]\\))</div>
                    <div class="env-body">
                        <p>For \\(f \\in L^2[-\\pi, \\pi]\\), the Fourier series is</p>
                        \\[f(x) = \\frac{a_0}{2} + \\sum_{n=1}^\\infty \\left(a_n \\cos(nx) + b_n \\sin(nx)\\right)\\]
                        <p>where \\(a_n = \\frac{1}{\\pi}\\int_{-\\pi}^\\pi f(x)\\cos(nx)\\,dx\\) and \\(b_n = \\frac{1}{\\pi}\\int_{-\\pi}^\\pi f(x)\\sin(nx)\\,dx\\). Parseval's identity gives</p>
                        \\[\\frac{1}{\\pi}\\int_{-\\pi}^\\pi |f(x)|^2\\,dx = \\frac{a_0^2}{2} + \\sum_{n=1}^\\infty (a_n^2 + b_n^2)\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Bessel's inequality says that the "energy" in the Fourier coefficients cannot exceed the energy in the original vector. Parseval's identity strengthens this to equality when the orthonormal set is complete (a Hilbert basis). This is a profound generalization of the Pythagorean theorem: the total "energy" of a vector equals the sum of the energies in its orthogonal components.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="parseval-viz"></div>
            `,
            visualizations: [
                {
                    id: 'parseval-viz',
                    title: 'Interactive: Parseval\'s Identity Demonstration',
                    description: 'Watch how the sum of squared Fourier coefficients converges to the norm squared',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 1});

                        let numTerms = 10;
                        const slider = VizEngine.createSlider(controls, 'Number of terms', 1, 50, numTerms, 1, (val) => {
                            numTerms = val;
                            draw();
                        });

                        // Example: square wave on [-π, π]
                        // Fourier coefficients: b_n = 4/(nπ) for odd n
                        function getFourierCoeff(n) {
                            if (n % 2 === 0) return 0;
                            return 4 / (n * Math.PI);
                        }

                        // Actual norm squared of square wave
                        const actualNormSq = 4; // ||f||^2 = (1/π) ∫_{-π}^π 1 dx = 2π/π * 2 = 4

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;

                            // Calculate partial sum
                            let partialSum = 0;
                            const coeffs = [];
                            for (let n = 1; n <= numTerms; n++) {
                                const bn = getFourierCoeff(n);
                                partialSum += bn * bn;
                                coeffs.push({n: n, val: bn * bn, cumSum: partialSum});
                            }

                            // Draw axes
                            ctx.strokeStyle = viz.colors.white + '44';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(50, viz.height - 50);
                            ctx.lineTo(viz.width - 20, viz.height - 50);
                            ctx.moveTo(50, 20);
                            ctx.lineTo(50, viz.height - 50);
                            ctx.stroke();

                            // Draw target line (actual norm squared)
                            const targetY = viz.height - 50 - (actualNormSq / 5) * (viz.height - 80);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([5, 5]);
                            ctx.beginPath();
                            ctx.moveTo(50, targetY);
                            ctx.lineTo(viz.width - 20, targetY);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw bars for coefficients
                            const barWidth = Math.min(20, (viz.width - 80) / numTerms);
                            let x = 60;
                            for (let i = 0; i < coeffs.length && i < 40; i++) {
                                const c = coeffs[i];
                                const barHeight = (c.val / 5) * (viz.height - 80);

                                ctx.fillStyle = viz.colors.blue + 'AA';
                                ctx.fillRect(x, viz.height - 50 - barHeight, barWidth - 2, barHeight);

                                x += barWidth;
                            }

                            // Draw cumulative sum line
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            x = 60;
                            for (let i = 0; i < coeffs.length && i < 40; i++) {
                                const c = coeffs[i];
                                const y = viz.height - 50 - (c.cumSum / 5) * (viz.height - 80);
                                if (i === 0) ctx.moveTo(x + barWidth/2, y);
                                else ctx.lineTo(x + barWidth/2, y);
                                x += barWidth;
                            }
                            ctx.stroke();

                            // Labels
                            viz.screenText('||f||² = ' + actualNormSq.toFixed(3), viz.width - 100, targetY - 10, viz.colors.green, 14);
                            viz.screenText('Σ|cₙ|² = ' + partialSum.toFixed(3), viz.width - 100, viz.height - 60, viz.colors.orange, 14);
                            viz.screenText('Individual |cₙ|²', 60, 35, viz.colors.blue, 12, 'left');
                            viz.screenText('Cumulative sum', 60, 55, viz.colors.orange, 12, 'left');
                            viz.screenText('Error = ' + Math.abs(actualNormSq - partialSum).toFixed(4), viz.width / 2, viz.height - 20, viz.colors.text, 14, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove the polarization identity: \\(\\langle v, w \\rangle = \\frac{1}{4}(\\|v+w\\|^2 - \\|v-w\\|^2 + i\\|v+iw\\|^2 - i\\|v-iw\\|^2)\\) for a complex Hilbert space.',
                    hint: 'Expand each squared norm using the definition \\(\\|x\\|^2 = \\langle x, x \\rangle\\).',
                    solution: 'Expanding: \\(\\|v+w\\|^2 = \\|v\\|^2 + \\|w\\|^2 + 2\\text{Re}\\langle v, w \\rangle\\), \\(\\|v-w\\|^2 = \\|v\\|^2 + \\|w\\|^2 - 2\\text{Re}\\langle v, w \\rangle\\). Thus \\(\\|v+w\\|^2 - \\|v-w\\|^2 = 4\\text{Re}\\langle v, w \\rangle\\). Similarly, \\(\\|v+iw\\|^2 - \\|v-iw\\|^2 = 4\\text{Re}\\langle v, iw \\rangle = 4\\text{Re}(i\\langle v, w \\rangle) = -4\\text{Im}\\langle v, w \\rangle\\). Combining gives the result.'
                },
                {
                    question: 'Let \\(f(x) = x\\) on \\([-\\pi, \\pi]\\). Compute the Fourier sine coefficients and use Parseval\'s identity to evaluate \\(\\sum_{n=1}^\\infty \\frac{1}{n^2}\\).',
                    hint: 'The sine coefficients are \\(b_n = \\frac{2}{\\pi}\\int_0^\\pi x\\sin(nx)\\,dx\\). Use integration by parts.',
                    solution: 'Integration by parts gives \\(b_n = \\frac{2(-1)^{n+1}}{n}\\). Parseval: \\(\\frac{1}{\\pi}\\int_{-\\pi}^\\pi x^2\\,dx = \\sum_{n=1}^\\infty b_n^2\\). LHS: \\(\\frac{2}{\\pi} \\cdot \\frac{\\pi^3}{3} = \\frac{2\\pi^2}{3}\\). RHS: \\(\\sum_{n=1}^\\infty \\frac{4}{n^2} = 4\\sum_{n=1}^\\infty \\frac{1}{n^2}\\). Thus \\(\\sum_{n=1}^\\infty \\frac{1}{n^2} = \\frac{\\pi^2}{6}\\).'
                },
                {
                    question: 'Show that if \\(\\{e_n\\}\\) is an orthonormal sequence in \\(H\\) and \\(\\sum_{n=1}^\\infty |c_n|^2 < \\infty\\), then the series \\(\\sum_{n=1}^\\infty c_n e_n\\) converges in \\(H\\).',
                    hint: 'Show that the partial sums form a Cauchy sequence.',
                    solution: 'Let \\(s_N = \\sum_{n=1}^N c_n e_n\\). For \\(M > N\\), \\(\\|s_M - s_N\\|^2 = \\|\\sum_{n=N+1}^M c_n e_n\\|^2 = \\sum_{n=N+1}^M |c_n|^2\\) by orthonormality. Since \\(\\sum_{n=1}^\\infty |c_n|^2\\) converges, this tail sum goes to 0, so \\(\\{s_N\\}\\) is Cauchy. By completeness, it converges.'
                }
            ]
        },
        {
            id: 'ch13-sec04',
            title: 'The Riesz Representation Theorem',
            content: `
                <h2>The Riesz Representation Theorem</h2>

                <p>The Riesz representation theorem is one of the most important results in functional analysis. It characterizes all continuous linear functionals on a Hilbert space and establishes a canonical isomorphism between a Hilbert space and its dual.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.10 (Bounded Linear Functional)</div>
                    <div class="env-body">
                        <p>A linear functional \\(\\phi: H \\to \\mathbb{C}\\) on a Hilbert space is <strong>bounded</strong> (or <strong>continuous</strong>) if there exists \\(C \\geq 0\\) such that</p>
                        \\[|\\phi(v)| \\leq C\\|v\\|\\]
                        <p>for all \\(v \\in H\\). The smallest such \\(C\\) is called the <strong>norm</strong> of \\(\\phi\\), denoted \\(\\|\\phi\\|\\). The space of all bounded linear functionals on \\(H\\) is called the <strong>dual space</strong> and denoted \\(H^*\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.11 (Boundedness and Continuity)</div>
                    <div class="env-body">
                        <p>A linear functional \\(\\phi\\) on a Hilbert space \\(H\\) is bounded if and only if it is continuous.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>If \\(\\phi\\) is bounded and \\(v_n \\to v\\), then \\(|\\phi(v_n) - \\phi(v)| = |\\phi(v_n - v)| \\leq \\|\\phi\\|\\|v_n - v\\| \\to 0\\), so \\(\\phi\\) is continuous. Conversely, if \\(\\phi\\) is continuous at 0, there exists \\(\\delta > 0\\) such that \\(\\|v\\| < \\delta\\) implies \\(|\\phi(v)| < 1\\). For any \\(v \\neq 0\\), set \\(w = \\frac{\\delta v}{2\\|v\\|}\\). Then \\(\\|w\\| = \\delta/2 < \\delta\\), so \\(|\\phi(w)| < 1\\). Thus \\(|\\phi(v)| = \\frac{2\\|v\\|}{\\delta}|\\phi(w)| < \\frac{2}{\\delta}\\|v\\|\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.12 (Riesz Representation Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(H\\) be a Hilbert space. For every bounded linear functional \\(\\phi \\in H^*\\), there exists a unique \\(w \\in H\\) such that</p>
                        \\[\\phi(v) = \\langle v, w \\rangle\\]
                        <p>for all \\(v \\in H\\). Moreover, \\(\\|\\phi\\| = \\|w\\|\\). The map \\(\\Phi: H \\to H^*\\) defined by \\(\\Phi(w)(v) = \\langle v, w \\rangle\\) is a conjugate-linear isometric isomorphism.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>If \\(\\phi = 0\\), take \\(w = 0\\). Otherwise, let \\(M = \\ker(\\phi)\\), a closed subspace since \\(\\phi\\) is continuous. Since \\(\\phi \\neq 0\\), \\(M \\neq H\\), so \\(M^\\perp \\neq \\{0\\}\\) by the projection theorem. Choose any \\(u \\in M^\\perp\\) with \\(\\|u\\| = 1\\).</p>
                        <p>For any \\(v \\in H\\), the vector \\(v - \\phi(v)u/\\phi(u)\\) is in \\(M\\) since</p>
                        \\[\\phi(v - \\phi(v)u/\\phi(u)) = \\phi(v) - \\phi(v)\\phi(u)/\\phi(u) = 0\\]
                        <p>Thus \\(v - \\phi(v)u/\\phi(u) \\perp u\\), which gives</p>
                        \\[\\langle v, u \\rangle = \\frac{\\phi(v)}{\\phi(u)} \\langle u, u \\rangle = \\frac{\\phi(v)}{\\phi(u)}\\]
                        <p>Hence \\(\\phi(v) = \\phi(u)\\langle v, u \\rangle = \\langle v, \\overline{\\phi(u)}u \\rangle\\). Set \\(w = \\overline{\\phi(u)}u\\).</p>
                        <p>For uniqueness: if \\(\\langle v, w_1 \\rangle = \\langle v, w_2 \\rangle\\) for all \\(v\\), take \\(v = w_1 - w_2\\) to get \\(\\|w_1 - w_2\\|^2 = 0\\).</p>
                        <p>The norm equality \\(\\|\\phi\\| = \\|w\\|\\) follows from Cauchy-Schwarz.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 13.13</div>
                    <div class="env-body">
                        <p>Every Hilbert space \\(H\\) is isometrically isomorphic to its dual \\(H^*\\) via the map \\(w \\mapsto \\langle \\cdot, w \\rangle\\). In particular, \\(H\\) is reflexive: \\(H \\cong H^{**}\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The Riesz representation theorem says that every continuous linear functional on a Hilbert space is "taking the inner product with something." This is remarkable because in general Banach spaces, the dual can be much more complicated. The theorem provides a concrete representation and shows that the geometry of inner products completely determines the linear structure of continuous functionals.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body">
                        <p>The isomorphism \\(H \\to H^*\\) is <strong>conjugate-linear</strong>, not linear. That is, \\(\\langle v, \\alpha w \\rangle = \\overline{\\alpha}\\langle v, w \\rangle\\). This is unavoidable in complex Hilbert spaces due to the sesquilinearity of the inner product. In real Hilbert spaces, the isomorphism is linear.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="riesz-viz"></div>
            `,
            visualizations: [
                {
                    id: 'riesz-viz',
                    title: 'Interactive: Riesz Representation',
                    description: 'Visualize how a linear functional corresponds to an inner product with a vector',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        const w = viz.addDraggable('w', 2, 1.5, viz.colors.orange, 8, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw the vector w that represents the functional
                            viz.drawVector(0, 0, w.x, w.y, viz.colors.orange, 'w');

                            // Draw level sets of the functional φ(v) = ⟨v, w⟩
                            // These are lines perpendicular to w
                            const perpX = -w.y;
                            const perpY = w.x;
                            const perpLen = Math.sqrt(perpX * perpX + perpY * perpY);
                            const perpUnitX = perpX / perpLen;
                            const perpUnitY = perpY / perpLen;

                            // Draw several level sets
                            const ctx = viz.ctx;
                            for (let level = -3; level <= 3; level++) {
                                if (level === 0) continue;

                                const normW = Math.sqrt(w.x * w.x + w.y * w.y);
                                if (normW < 0.1) continue;

                                // Point on the line: level * w / ||w||^2
                                const baseX = level * w.x / (normW * normW);
                                const baseY = level * w.y / (normW * normW);

                                const color = level > 0 ? viz.colors.blue : viz.colors.red;
                                const alpha = Math.abs(level) <= 2 ? 'AA' : '66';

                                viz.drawLine(
                                    baseX - 10 * perpUnitX, baseY - 10 * perpUnitY,
                                    baseX + 10 * perpUnitX, baseY + 10 * perpUnitY,
                                    color + alpha, 1.5
                                );

                                // Label
                                viz.drawText('φ=' + level, baseX + 0.3, baseY, color, 11);
                            }

                            // Draw the kernel (level set 0)
                            viz.drawLine(-10 * perpUnitX, -10 * perpUnitY,
                                        10 * perpUnitX, 10 * perpUnitY,
                                        viz.colors.green + 'AA', 2);
                            viz.drawText('ker(φ)', 3 * perpUnitX, 3 * perpUnitY + 0.5, viz.colors.green, 12);

                            viz.drawDraggables();

                            // Info text
                            const normW = Math.sqrt(w.x * w.x + w.y * w.y);
                            viz.drawText('φ(v) = ⟨v, w⟩', -6, 5.5, viz.colors.text, 14, 'left');
                            viz.drawText('‖φ‖ = ‖w‖ = ' + normW.toFixed(2), -6, 4.8, viz.colors.text, 14, 'left');
                            viz.drawText('Level sets: φ(v) = c', -6, 4.1, viz.colors.text, 12, 'left');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(H = \\ell^2\\) and define \\(\\phi(\\{a_n\\}) = \\sum_{n=1}^\\infty \\frac{a_n}{n}\\). Show that \\(\\phi\\) is a bounded linear functional and find the vector \\(w \\in \\ell^2\\) such that \\(\\phi(a) = \\langle a, w \\rangle\\).',
                    hint: 'Use Cauchy-Schwarz to show boundedness, and identify the representing vector directly.',
                    solution: 'By Cauchy-Schwarz, \\(|\\phi(a)| = |\\sum_{n=1}^\\infty \\frac{a_n}{n}| \\leq \\left(\\sum_{n=1}^\\infty |a_n|^2\\right)^{1/2} \\left(\\sum_{n=1}^\\infty \\frac{1}{n^2}\\right)^{1/2} = \\frac{\\pi}{\\sqrt{6}}\\|a\\|\\). Thus \\(\\phi\\) is bounded with \\(\\|\\phi\\| \\leq \\pi/\\sqrt{6}\\). The representing vector is \\(w = \\{1/n\\}_{n=1}^\\infty \\in \\ell^2\\).'
                },
                {
                    question: 'Prove that if \\(H\\) is infinite-dimensional, then not every linear functional on \\(H\\) is bounded.',
                    hint: 'Use a Hamel basis and define a functional that is unbounded on an orthonormal sequence.',
                    solution: 'Let \\(\\{e_n\\}\\) be an orthonormal sequence in \\(H\\). Extend it to a Hamel basis \\(\\mathcal{B}\\). Define \\(\\phi\\) on \\(\\mathcal{B}\\) by \\(\\phi(e_n) = n\\) for the orthonormal elements and 0 elsewhere, then extend linearly. This is well-defined but unbounded since \\(\\phi(e_n) = n\\) while \\(\\|e_n\\| = 1\\).'
                },
                {
                    question: 'Show that the dual space \\(H^*\\) is itself a Hilbert space with the norm \\(\\|\\phi\\| = \\sup_{\\|v\\| \\leq 1} |\\phi(v)|\\) and an appropriately defined inner product.',
                    hint: 'Use the Riesz isomorphism to transfer the inner product from \\(H\\) to \\(H^*\\).',
                    solution: 'Define \\(\\langle \\phi, \\psi \\rangle_{H^*} = \\langle w_\\psi, w_\\phi \\rangle_H\\) where \\(w_\\phi, w_\\psi\\) are the Riesz representatives. This makes \\(H^*\\) a Hilbert space, and the Riesz map \\(H \\to H^*\\) is an isometric isomorphism (conjugate-linear in the complex case).'
                }
            ]
        },
        {
            id: 'ch13-sec05',
            title: 'Bounded Linear Operators',
            content: `
                <h2>Bounded Linear Operators</h2>

                <p>Beyond functionals, we study bounded linear operators between Hilbert spaces. These form the foundation for operator theory and quantum mechanics.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.14 (Bounded Linear Operator)</div>
                    <div class="env-body">
                        <p>A linear operator \\(T: H_1 \\to H_2\\) between Hilbert spaces is <strong>bounded</strong> if there exists \\(C \\geq 0\\) such that</p>
                        \\[\\|Tv\\| \\leq C\\|v\\|\\]
                        <p>for all \\(v \\in H_1\\). The <strong>operator norm</strong> is defined as</p>
                        \\[\\|T\\| = \\sup_{\\|v\\| \\leq 1} \\|Tv\\| = \\sup_{v \\neq 0} \\frac{\\|Tv\\|}{\\|v\\|}\\]
                        <p>The space of all bounded linear operators from \\(H_1\\) to \\(H_2\\) is denoted \\(\\mathcal{B}(H_1, H_2)\\), or \\(\\mathcal{B}(H)\\) when \\(H_1 = H_2 = H\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.15 (Operator Norm Properties)</div>
                    <div class="env-body">
                        <p>The operator norm on \\(\\mathcal{B}(H_1, H_2)\\) satisfies:</p>
                        <ol>
                            <li>\\(\\|T\\| \\geq 0\\) and \\(\\|T\\| = 0 \\iff T = 0\\)</li>
                            <li>\\(\\|\\alpha T\\| = |\\alpha|\\|T\\|\\) for \\(\\alpha \\in \\mathbb{C}\\)</li>
                            <li>\\(\\|T_1 + T_2\\| \\leq \\|T_1\\| + \\|T_2\\|\\)</li>
                            <li>\\(\\|ST\\| \\leq \\|S\\|\\|T\\|\\) (submultiplicativity)</li>
                        </ol>
                        <p>Moreover, \\(\\mathcal{B}(H_1, H_2)\\) is a Banach space (complete normed space) with this norm.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.16 (Adjoint Operator)</div>
                    <div class="env-body">
                        <p>Let \\(T: H_1 \\to H_2\\) be a bounded linear operator. The <strong>adjoint</strong> of \\(T\\) is the unique bounded operator \\(T^*: H_2 \\to H_1\\) satisfying</p>
                        \\[\\langle Tv, w \\rangle_{H_2} = \\langle v, T^*w \\rangle_{H_1}\\]
                        <p>for all \\(v \\in H_1, w \\in H_2\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.17 (Existence and Properties of Adjoints)</div>
                    <div class="env-body">
                        <p>For every \\(T \\in \\mathcal{B}(H_1, H_2)\\), the adjoint \\(T^*\\) exists and is unique. Moreover:</p>
                        <ol>
                            <li>\\((\\alpha T + \\beta S)^* = \\overline{\\alpha} T^* + \\overline{\\beta} S^*\\)</li>
                            <li>\\((T^*)^* = T\\)</li>
                            <li>\\((ST)^* = T^*S^*\\)</li>
                            <li>\\(\\|T^*\\| = \\|T\\|\\)</li>
                            <li>\\(\\|T^*T\\| = \\|T\\|^2\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof of Existence</div>
                    <div class="env-body">
                        <p>Fix \\(w \\in H_2\\). Define \\(\\phi_w: H_1 \\to \\mathbb{C}\\) by \\(\\phi_w(v) = \\langle Tv, w \\rangle_{H_2}\\). This is a linear functional, and</p>
                        \\[|\\phi_w(v)| \\leq \\|Tv\\|\\|w\\| \\leq \\|T\\|\\|v\\|\\|w\\|\\]
                        <p>so \\(\\phi_w\\) is bounded with \\(\\|\\phi_w\\| \\leq \\|T\\|\\|w\\|\\). By Riesz representation, there exists unique \\(u \\in H_1\\) with \\(\\phi_w(v) = \\langle v, u \\rangle_{H_1}\\). Define \\(T^*w = u\\). One verifies that \\(T^*\\) is linear and bounded.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.18 (Special Classes of Operators)</div>
                    <div class="env-body">
                        <p>Let \\(T \\in \\mathcal{B}(H)\\). Then \\(T\\) is:</p>
                        <ul>
                            <li><strong>Self-adjoint</strong> (or <strong>Hermitian</strong>) if \\(T^* = T\\)</li>
                            <li><strong>Normal</strong> if \\(TT^* = T^*T\\)</li>
                            <li><strong>Unitary</strong> if \\(T^*T = TT^* = I\\) (equivalently, \\(T^{-1} = T^*\\))</li>
                            <li><strong>Positive</strong> if \\(\\langle Tv, v \\rangle \\geq 0\\) for all \\(v \\in H\\)</li>
                            <li>A <strong>projection</strong> if \\(T^2 = T = T^*\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 13.4</div>
                    <div class="env-body">
                        <p><strong>Multiplication operator:</strong> On \\(L^2[a,b]\\), define \\((M_f g)(x) = f(x)g(x)\\) where \\(f\\) is a bounded measurable function. Then \\(M_f\\) is bounded with \\(\\|M_f\\| = \\|f\\|_\\infty\\), and \\(M_f^* = M_{\\overline{f}}\\). \\(M_f\\) is self-adjoint if \\(f\\) is real-valued.</p>
                        <p><strong>Shift operator:</strong> On \\(\\ell^2\\), define \\((S(a_1, a_2, \\ldots)) = (0, a_1, a_2, \\ldots)\\). Then \\(\\|S\\| = 1\\), \\(S^*\\) is the backward shift, and \\(S^*S = I\\) but \\(SS^* \\neq I\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.19 (Orthogonal Projection)</div>
                    <div class="env-body">
                        <p>Let \\(W\\) be a closed subspace of a Hilbert space \\(H\\). The orthogonal projection \\(P_W: H \\to W\\) defined by \\(P_W(v) = \\hat{v}\\) (the best approximation of \\(v\\) in \\(W\\)) is a bounded linear operator with the following properties:</p>
                        <ol>
                            <li>\\(P_W^2 = P_W\\) (idempotent)</li>
                            <li>\\(P_W^* = P_W\\) (self-adjoint)</li>
                            <li>\\(\\|P_W\\| = 1\\) (unless \\(W = \\{0\\}\\))</li>
                            <li>\\(\\ker(P_W) = W^\\perp\\) and \\(\\text{range}(P_W) = W\\)</li>
                        </ol>
                        <p>Conversely, if \\(P \\in \\mathcal{B}(H)\\) satisfies \\(P^2 = P = P^*\\), then \\(P = P_W\\) for \\(W = \\text{range}(P)\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The adjoint generalizes the transpose of a matrix. The condition \\(\\langle Tv, w \\rangle = \\langle v, T^*w \\rangle\\) says that "moving \\(T\\) from the first argument to the second" requires taking the adjoint. Self-adjoint operators are the infinite-dimensional analogs of symmetric/Hermitian matrices and play a central role in quantum mechanics (observables). Projections geometrically represent "dropping the perpendicular" onto a subspace.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="operator-viz"></div>
            `,
            visualizations: [
                {
                    id: 'operator-viz',
                    title: 'Interactive: Linear Operator and Its Adjoint',
                    description: 'Visualize how an operator T and its adjoint T* relate',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        // Define a 2x2 operator matrix [[a, b], [c, d]]
                        let matrix = [[1.2, 0.4], [0.4, 0.8]];

                        const v = viz.addDraggable('v', 2, 1, viz.colors.blue, 8, () => draw());
                        const w = viz.addDraggable('w', 1, 2, viz.colors.green, 8, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Compute Tv and T*w
                            const Tv = VizEngine.matVec(matrix, [v.x, v.y]);
                            const matrixT = [[matrix[0][0], matrix[1][0]], [matrix[0][1], matrix[1][1]]];
                            const Tstarw = VizEngine.matVec(matrixT, [w.x, w.y]);

                            // Draw original vectors
                            viz.drawVector(0, 0, v.x, v.y, viz.colors.blue, 'v');
                            viz.drawVector(0, 0, w.x, w.y, viz.colors.green, 'w');

                            // Draw transformed vectors
                            viz.drawVector(0, 0, Tv[0], Tv[1], viz.colors.blue + 'AA', 'Tv', 2);
                            viz.drawVector(0, 0, Tstarw[0], Tstarw[1], viz.colors.green + 'AA', 'T*w', 2);

                            // Draw dashed lines to show the relationship
                            viz.drawSegment(0, 0, Tv[0], Tv[1], viz.colors.blue + '44', 1, true);
                            viz.drawSegment(0, 0, Tstarw[0], Tstarw[1], viz.colors.green + '44', 1, true);

                            viz.drawDraggables();

                            // Compute inner products to verify adjoint property
                            const innerTvw = Tv[0] * w.x + Tv[1] * w.y;
                            const innervTstarw = v.x * Tstarw[0] + v.y * Tstarw[1];

                            // Display info
                            viz.drawText('⟨Tv, w⟩ = ' + innerTvw.toFixed(3), -6, 5.5, viz.colors.text, 14, 'left');
                            viz.drawText('⟨v, T*w⟩ = ' + innervTstarw.toFixed(3), -6, 4.8, viz.colors.text, 14, 'left');
                            viz.drawText('Error = ' + Math.abs(innerTvw - innervTstarw).toFixed(6), -6, 4.1, viz.colors.text, 12, 'left');

                            const trace = matrix[0][0] + matrix[1][1];
                            const det = VizEngine.det2(matrix);
                            viz.drawText('T = [[1.2, 0.4], [0.4, 0.8]]', -6, -4.5, viz.colors.text, 11, 'left');
                            viz.drawText('tr(T) = ' + trace.toFixed(2) + ', det(T) = ' + det.toFixed(2), -6, -5.2, viz.colors.text, 11, 'left');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(T \\in \\mathcal{B}(H)\\) be self-adjoint. Prove that \\(\\langle Tv, v \\rangle \\in \\mathbb{R}\\) for all \\(v \\in H\\).',
                    hint: 'Use the fact that a complex number equals its conjugate if and only if it is real.',
                    solution: 'For any \\(v \\in H\\), \\(\\overline{\\langle Tv, v \\rangle} = \\langle v, Tv \\rangle = \\langle T^*v, v \\rangle = \\langle Tv, v \\rangle\\) since \\(T = T^*\\). A complex number that equals its conjugate is real.'
                },
                {
                    question: 'Prove that if \\(T \\in \\mathcal{B}(H)\\) is self-adjoint and \\(\\langle Tv, v \\rangle = 0\\) for all \\(v \\in H\\), then \\(T = 0\\).',
                    hint: 'Use polarization to express \\(\\langle Tv, w \\rangle\\) in terms of expressions like \\(\\langle T(v+w), v+w \\rangle\\).',
                    solution: 'For \\(v, w \\in H\\), polarization gives \\(\\langle Tv, w \\rangle = \\frac{1}{4}(\\langle T(v+w), v+w \\rangle - \\langle T(v-w), v-w \\rangle + i\\langle T(v+iw), v+iw \\rangle - i\\langle T(v-iw), v-iw \\rangle) = 0\\). Thus \\(Tv = 0\\) for all \\(v\\).'
                },
                {
                    question: 'Let \\(P\\) be an orthogonal projection onto a closed subspace \\(W\\). Show that \\(I - P\\) is the orthogonal projection onto \\(W^\\perp\\).',
                    hint: 'Verify that \\((I-P)^2 = I - P\\) and \\((I-P)^* = I - P\\), and identify the range.',
                    solution: '\\((I-P)^2 = I - 2P + P^2 = I - 2P + P = I - P\\). \\((I-P)^* = I^* - P^* = I - P\\). For \\(v \\in H\\), \\(v = Pv + (I-P)v\\) with \\(Pv \\in W\\) and \\((I-P)v \\perp W\\), so \\((I-P)v \\in W^\\perp\\). Thus \\(I-P = P_{W^\\perp}\\).'
                }
            ]
        },
        {
            id: 'ch13-sec06',
            title: 'Hilbert Dimension and Separability',
            content: `
                <h2>Hilbert Dimension and Separability</h2>

                <p>Just as vector spaces are classified by their dimension (cardinality of a basis), Hilbert spaces are classified by the cardinality of a Hilbert basis, called the Hilbert dimension.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.20 (Hilbert Bases Have Same Cardinality)</div>
                    <div class="env-body">
                        <p>All Hilbert bases for a Hilbert space \\(H\\) have the same cardinality. This cardinality is called the <strong>Hilbert dimension</strong> of \\(H\\), denoted \\(\\dim_H(H)\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Sketch)</div>
                    <div class="env-body">
                        <p>Let \\(\\{e_\\alpha\\}_{\\alpha \\in I}\\) and \\(\\{f_\\beta\\}_{\\beta \\in J}\\) be two Hilbert bases. For each \\(\\beta \\in J\\), by Parseval's identity,</p>
                        \\[\\|f_\\beta\\|^2 = \\sum_{\\alpha \\in I} |\\langle f_\\beta, e_\\alpha \\rangle|^2 = 1\\]
                        <p>so \\(f_\\beta\\) has nonzero inner product with at most countably many \\(e_\\alpha\\). Define \\(I_\\beta = \\{\\alpha \\in I : \\langle f_\\beta, e_\\alpha \\rangle \\neq 0\\}\\). Then each \\(I_\\beta\\) is countable and \\(\\bigcup_{\\beta \\in J} I_\\beta = I\\) (else some \\(e_\\alpha\\) would be orthogonal to all \\(f_\\beta\\), contradicting completeness). Thus \\(|I| \\leq |J| \\times \\aleph_0\\). If both are infinite, \\(|I| \\leq |J|\\). By symmetry, \\(|J| \\leq |I|\\), so \\(|I| = |J|\\) by Schröder-Bernstein.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.21 (Separable Hilbert Space)</div>
                    <div class="env-body">
                        <p>A Hilbert space \\(H\\) is <strong>separable</strong> if it contains a countable dense subset, equivalently, if \\(\\dim_H(H) \\leq \\aleph_0\\) (finite or countably infinite Hilbert dimension).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.22 (Classification of Separable Hilbert Spaces)</div>
                    <div class="env-body">
                        <p>Every separable infinite-dimensional Hilbert space is isometrically isomorphic to \\(\\ell^2\\). Thus, up to isometric isomorphism, there is only one infinite-dimensional separable Hilbert space.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Let \\(\\{e_n\\}_{n=1}^\\infty\\) be a Hilbert basis for \\(H\\). Define \\(\\Phi: H \\to \\ell^2\\) by \\(\\Phi(v) = (\\langle v, e_1 \\rangle, \\langle v, e_2 \\rangle, \\ldots)\\). By Parseval's identity, \\(\\|\\Phi(v)\\|_{\\ell^2}^2 = \\sum_{n=1}^\\infty |\\langle v, e_n \\rangle|^2 = \\|v\\|_H^2\\), so \\(\\Phi\\) is an isometry. For surjectivity, given \\((a_n) \\in \\ell^2\\), the series \\(\\sum_{n=1}^\\infty a_n e_n\\) converges in \\(H\\) to some \\(v\\), and \\(\\Phi(v) = (a_n)\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 13.5</div>
                    <div class="env-body">
                        <p>The following Hilbert spaces are all separable and thus isomorphic to \\(\\ell^2\\):</p>
                        <ul>
                            <li>\\(L^2[a,b]\\) for any finite interval \\([a,b]\\)</li>
                            <li>\\(L^2(\\mathbb{R}^n)\\) for any \\(n \\geq 1\\)</li>
                            <li>The Sobolev space \\(H^1(\\Omega)\\) for nice domains \\(\\Omega\\)</li>
                        </ul>
                        <p>In contrast, \\(\\ell^2(\\mathbb{R})\\) (square-summable functions on \\(\\mathbb{R}\\)) is non-separable with Hilbert dimension \\(2^{\\aleph_0}\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.23 (General Representation)</div>
                    <div class="env-body">
                        <p>Every Hilbert space \\(H\\) with Hilbert dimension \\(\\kappa\\) is isometrically isomorphic to \\(\\ell^2(I)\\) where \\(I\\) is any set of cardinality \\(\\kappa\\), and</p>
                        \\[\\ell^2(I) = \\left\\{f: I \\to \\mathbb{C} : \\sum_{\\alpha \\in I} |f(\\alpha)|^2 < \\infty \\right\\}\\]
                        <p>with inner product \\(\\langle f, g \\rangle = \\sum_{\\alpha \\in I} f(\\alpha)\\overline{g(\\alpha)}\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The condition \\(\\sum_{\\alpha \\in I} |f(\\alpha)|^2 < \\infty\\) for an uncountable index set \\(I\\) means that \\(\\sup_{F \\text{ finite}} \\sum_{\\alpha \\in F} |f(\\alpha)|^2 < \\infty\\). This automatically implies that at most countably many values \\(f(\\alpha)\\) are nonzero.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The classification theorem says that Hilbert spaces are completely determined by a single cardinal number - their Hilbert dimension. This is much simpler than the classification of Banach spaces, which is extraordinarily complex. The separable infinite-dimensional case is especially clean: all such spaces "look the same" from an isometric perspective, even though they may arise from very different contexts (sequences, functions on an interval, functions on \\(\\mathbb{R}^n\\), etc.).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="dimension-viz"></div>
            `,
            visualizations: [
                {
                    id: 'dimension-viz',
                    title: 'Interactive: Approximating in Different Hilbert Spaces',
                    description: 'Compare approximation quality as dimension increases',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 1});

                        let dimension = 5;
                        const slider = VizEngine.createSlider(controls, 'Dimension', 1, 30, dimension, 1, (val) => {
                            dimension = val;
                            draw();
                        });

                        // Target function: f(x) = exp(-x^2)
                        function targetFunc(x) {
                            return Math.exp(-x * x);
                        }

                        // Hermite functions (approximation of L^2(R) basis)
                        function hermite(n, x) {
                            // Simplified: use first few Hermite polynomials
                            const hermitePolys = [
                                (x) => 1,
                                (x) => 2*x,
                                (x) => 4*x*x - 2,
                                (x) => 8*x*x*x - 12*x,
                                (x) => 16*x*x*x*x - 48*x*x + 12,
                            ];
                            if (n < hermitePolys.length) {
                                return hermitePolys[n](x) * Math.exp(-x*x/2);
                            }
                            return 0;
                        }

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;

                            // Set up coordinate system
                            const xMin = -3, xMax = 3;
                            const yMin = 0, yMax = 1.2;
                            const width = viz.width - 80;
                            const height = viz.height - 100;
                            const xOffset = 40;
                            const yOffset = 20;

                            function toScreenX(x) {
                                return xOffset + ((x - xMin) / (xMax - xMin)) * width;
                            }
                            function toScreenY(y) {
                                return yOffset + height - ((y - yMin) / (yMax - yMin)) * height;
                            }

                            // Draw axes
                            ctx.strokeStyle = viz.colors.white + '44';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(toScreenX(xMin), toScreenY(0));
                            ctx.lineTo(toScreenX(xMax), toScreenY(0));
                            ctx.moveTo(toScreenX(0), toScreenY(yMin));
                            ctx.lineTo(toScreenX(0), toScreenY(yMax));
                            ctx.stroke();

                            // Draw target function
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (let px = 0; px <= width; px++) {
                                const x = xMin + (px / width) * (xMax - xMin);
                                const y = targetFunc(x);
                                const sx = toScreenX(x);
                                const sy = toScreenY(y);
                                if (px === 0) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Compute and draw projection onto span of first 'dimension' basis functions
                            // (simplified: not computing actual L^2 inner products, just illustration)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (let px = 0; px <= width; px++) {
                                const x = xMin + (px / width) * (xMax - xMin);
                                let approx = 0;
                                for (let n = 0; n < Math.min(dimension, 5); n++) {
                                    approx += 0.5 * hermite(n, x) * (n === 0 ? 0.8 : 0.2 / (n + 1));
                                }
                                const sx = toScreenX(x);
                                const sy = toScreenY(Math.abs(approx));
                                if (px === 0) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Compute approximate error
                            let errorSum = 0;
                            const samples = 50;
                            for (let i = 0; i <= samples; i++) {
                                const x = xMin + (i / samples) * (xMax - xMin);
                                const target = targetFunc(x);
                                let approx = 0;
                                for (let n = 0; n < Math.min(dimension, 5); n++) {
                                    approx += 0.5 * hermite(n, x) * (n === 0 ? 0.8 : 0.2 / (n + 1));
                                }
                                errorSum += (target - Math.abs(approx)) ** 2;
                            }
                            const avgError = Math.sqrt(errorSum / samples);

                            // Labels
                            viz.screenText('Target: f(x) = exp(-x²)', 50, 30, viz.colors.green, 14, 'left');
                            viz.screenText('Projection (dim ' + dimension + ')', 50, 50, viz.colors.blue, 14, 'left');
                            viz.screenText('Approx. Error ≈ ' + avgError.toFixed(4), viz.width / 2, viz.height - 20, viz.colors.text, 14, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that a Hilbert space is separable if and only if it has a countable Hilbert basis.',
                    hint: 'For one direction, show that finite rational linear combinations of a Hilbert basis are dense. For the other, construct an orthonormal set from a dense subset.',
                    solution: 'If \\(\\{e_n\\}\\) is a countable Hilbert basis, the set \\(D\\) of finite linear combinations with rational coefficients is countable and dense (by Parseval, any \\(v\\) is the limit of its Fourier series, which can be approximated by rational linear combinations). Conversely, if \\(D = \\{d_n\\}\\) is countable and dense, apply Gram-Schmidt to a linearly independent subset to get an orthonormal set \\(\\{f_n\\}\\). If \\(\\{f_n\\}^\\perp \\neq \\{0\\}\\), pick \\(v \\in \\{f_n\\}^\\perp\\), \\(v \\neq 0\\). Then \\(\\|v - d_n\\| \\geq \\|v\\|\\) for all \\(n\\), contradicting density.'
                },
                {
                    question: 'Show that \\(L^2[0,1]\\) and \\(L^2[0,2]\\) are isometrically isomorphic.',
                    hint: 'Both are separable infinite-dimensional, so use the classification theorem.',
                    solution: 'Both \\(L^2[0,1]\\) and \\(L^2[0,2]\\) are separable (e.g., polynomials with rational coefficients are countable and dense) and infinite-dimensional. By Theorem 13.22, both are isomorphic to \\(\\ell^2\\), hence to each other. Alternatively, define \\(\\Phi: L^2[0,1] \\to L^2[0,2]\\) by \\((\\Phi f)(x) = \\frac{1}{\\sqrt{2}} f(x/2)\\) and verify it is an isometric isomorphism.'
                },
                {
                    question: 'Determine the Hilbert dimension of \\(\\ell^2(\\mathbb{R})\\), the space of functions \\(f: \\mathbb{R} \\to \\mathbb{C}\\) with \\(\\sum_{x \\in \\mathbb{R}} |f(x)|^2 < \\infty\\).',
                    hint: 'Consider the indicator functions \\(\\delta_x\\) for \\(x \\in \\mathbb{R}\\).',
                    solution: 'For each \\(x \\in \\mathbb{R}\\), define \\(\\delta_x(y) = 1\\) if \\(y = x\\) and 0 otherwise. Then \\(\\{\\delta_x\\}_{x \\in \\mathbb{R}}\\) is an orthonormal set with cardinality \\(|\\mathbb{R}| = 2^{\\aleph_0}\\). Any \\(f \\in \\ell^2(\\mathbb{R})\\) satisfies \\(f = \\sum_{x \\in \\mathbb{R}} f(x)\\delta_x\\) (with only countably many nonzero terms), so this set is total. Thus \\(\\dim_H(\\ell^2(\\mathbb{R})) = 2^{\\aleph_0}\\).'
                }
            ]
        },
        {
            id: 'ch13-sec07',
            title: 'Applications and Examples',
            content: `
                <h2>Applications and Examples</h2>

                <p>We conclude with several important applications of Hilbert space theory to analysis, differential equations, and quantum mechanics.</p>

                <div class="env-block example">
                    <div class="env-title">Example 13.6 (Fourier Transform on \\(L^2(\\mathbb{R})\\))</div>
                    <div class="env-body">
                        <p>The Fourier transform \\(\\mathcal{F}: L^2(\\mathbb{R}) \\to L^2(\\mathbb{R})\\) defined initially on \\(L^1 \\cap L^2\\) by</p>
                        \\[\\hat{f}(\\xi) = \\int_{-\\infty}^\\infty f(x) e^{-2\\pi i x \\xi}\\,dx\\]
                        <p>extends to a unitary operator on all of \\(L^2(\\mathbb{R})\\). The Plancherel theorem states that</p>
                        \\[\\|\\hat{f}\\|_{L^2} = \\|f\\|_{L^2}\\]
                        <p>and the Fourier inversion formula holds: \\(\\mathcal{F}^{-1} = \\mathcal{F}^*\\) with</p>
                        \\[f(x) = \\int_{-\\infty}^\\infty \\hat{f}(\\xi) e^{2\\pi i x \\xi}\\,d\\xi\\]
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 13.7 (Quantum Mechanics)</div>
                    <div class="env-body">
                        <p>In quantum mechanics, the state of a system is represented by a unit vector \\(|\\psi\\rangle\\) in a Hilbert space \\(\\mathcal{H}\\). Observables (measurable quantities) correspond to self-adjoint operators \\(A\\) on \\(\\mathcal{H}\\). The expected value of measuring \\(A\\) in state \\(|\\psi\\rangle\\) is</p>
                        \\[\\langle A \\rangle = \\langle \\psi | A | \\psi \\rangle\\]
                        <p>The spectral theorem guarantees that self-adjoint operators have real eigenvalues (possible measurement outcomes) and orthogonal eigenvectors (corresponding states).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 13.8 (Sobolev Spaces and PDEs)</div>
                    <div class="env-body">
                        <p>The Sobolev space \\(H^1(\\Omega)\\) consists of functions \\(u \\in L^2(\\Omega)\\) whose weak derivatives also lie in \\(L^2(\\Omega)\\), with inner product</p>
                        \\[\\langle u, v \\rangle_{H^1} = \\int_\\Omega (uv + \\nabla u \\cdot \\nabla v)\\,dx\\]
                        <p>Many elliptic PDEs, such as \\(-\\Delta u = f\\) with boundary conditions, can be reformulated as finding \\(u \\in H^1_0(\\Omega)\\) satisfying</p>
                        \\[\\int_\\Omega \\nabla u \\cdot \\nabla v\\,dx = \\int_\\Omega fv\\,dx\\]
                        <p>for all \\(v \\in H^1_0(\\Omega)\\). The Riesz representation theorem guarantees existence and uniqueness of weak solutions.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 13.9 (Reproducing Kernel Hilbert Spaces)</div>
                    <div class="env-body">
                        <p>A reproducing kernel Hilbert space (RKHS) is a Hilbert space \\(\\mathcal{H}\\) of functions on a set \\(X\\) such that point evaluation \\(\\delta_x: f \\mapsto f(x)\\) is a bounded linear functional for each \\(x \\in X\\). By Riesz representation, there exists \\(K_x \\in \\mathcal{H}\\) such that</p>
                        \\[f(x) = \\langle f, K_x \\rangle\\]
                        <p>The function \\(K(x,y) = \\langle K_y, K_x \\rangle\\) is called the <strong>reproducing kernel</strong>. RKHSs are fundamental in machine learning (kernel methods, support vector machines, Gaussian processes).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.24 (Lax-Milgram Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(H\\) be a Hilbert space and \\(a: H \\times H \\to \\mathbb{C}\\) a bilinear form that is:</p>
                        <ol>
                            <li><strong>Bounded</strong>: \\(|a(u,v)| \\leq M\\|u\\|\\|v\\|\\) for some \\(M > 0\\)</li>
                            <li><strong>Coercive</strong>: \\(|a(v,v)| \\geq \\alpha \\|v\\|^2\\) for some \\(\\alpha > 0\\)</li>
                        </ol>
                        <p>Then for every bounded linear functional \\(\\phi \\in H^*\\), there exists a unique \\(u \\in H\\) such that</p>
                        \\[a(u, v) = \\phi(v)\\]
                        <p>for all \\(v \\in H\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Sketch)</div>
                    <div class="env-body">
                        <p>For fixed \\(u\\), \\(v \\mapsto a(u,v)\\) is a bounded linear functional, so by Riesz there exists \\(Tu \\in H\\) with \\(a(u,v) = \\langle Tu, v \\rangle\\). The operator \\(T\\) is bounded and invertible by coercivity. Given \\(\\phi\\), Riesz gives \\(w\\) with \\(\\phi(v) = \\langle w, v \\rangle\\). Set \\(u = T^{-1}w\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The Lax-Milgram theorem is a powerful generalization of the Riesz representation theorem to non-symmetric bilinear forms. It provides existence and uniqueness of solutions to a vast class of variational problems and PDEs. The coercivity condition ensures that the associated operator is invertible, while boundedness gives continuity. This theorem is the foundation of the modern finite element method for numerically solving PDEs.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="application-viz"></div>
            `,
            visualizations: [
                {
                    id: 'application-viz',
                    title: 'Interactive: Heat Equation via Fourier Series',
                    description: 'Watch the solution to the heat equation evolve using Fourier basis',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 1});

                        let time = 0;
                        let running = false;

                        const slider = VizEngine.createSlider(controls, 'Time t', 0, 2, time, 0.01, (val) => {
                            time = val;
                            if (!running) draw();
                        });

                        const playButton = VizEngine.createButton(controls, 'Play/Pause', () => {
                            running = !running;
                            if (running) animate();
                        });

                        // Heat equation: u_t = u_xx on [0, π] with u(0,t) = u(π,t) = 0
                        // Initial condition: u(x,0) = sin(x) + 0.5*sin(3x)
                        // Solution: u(x,t) = sin(x)*exp(-t) + 0.5*sin(3x)*exp(-9t)

                        function solution(x, t) {
                            return Math.sin(x) * Math.exp(-t) + 0.5 * Math.sin(3*x) * Math.exp(-9*t);
                        }

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;

                            const width = viz.width - 80;
                            const height = viz.height - 100;
                            const xOffset = 40;
                            const yOffset = 20;

                            // Draw axes
                            ctx.strokeStyle = viz.colors.white + '44';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(xOffset, yOffset + height/2);
                            ctx.lineTo(xOffset + width, yOffset + height/2);
                            ctx.moveTo(xOffset, yOffset);
                            ctx.lineTo(xOffset, yOffset + height);
                            ctx.stroke();

                            // Draw solution at current time
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (let px = 0; px <= width; px++) {
                                const x = (px / width) * Math.PI;
                                const u = solution(x, time);
                                const sx = xOffset + px;
                                const sy = yOffset + height/2 - u * (height/3);
                                if (px === 0) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Draw individual Fourier modes
                            const mode1 = (x) => Math.sin(x) * Math.exp(-time);
                            const mode2 = (x) => 0.5 * Math.sin(3*x) * Math.exp(-9*time);

                            // Mode 1
                            ctx.strokeStyle = viz.colors.orange + '88';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([5, 3]);
                            ctx.beginPath();
                            for (let px = 0; px <= width; px++) {
                                const x = (px / width) * Math.PI;
                                const u = mode1(x);
                                const sx = xOffset + px;
                                const sy = yOffset + height/2 - u * (height/3);
                                if (px === 0) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Mode 2
                            ctx.strokeStyle = viz.colors.green + '88';
                            ctx.beginPath();
                            for (let px = 0; px <= width; px++) {
                                const x = (px / width) * Math.PI;
                                const u = mode2(x);
                                const sx = xOffset + px;
                                const sy = yOffset + height/2 - u * (height/3);
                                if (px === 0) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Labels
                            viz.screenText('Heat Equation: uₜ = uₓₓ', 50, 30, viz.colors.text, 14, 'left');
                            viz.screenText('u(x,t) = sin(x)e⁻ᵗ + 0.5sin(3x)e⁻⁹ᵗ', 50, 50, viz.colors.blue, 13, 'left');
                            viz.screenText('Mode 1: sin(x)e⁻ᵗ', viz.width - 120, 30, viz.colors.orange, 11, 'left');
                            viz.screenText('Mode 2: 0.5sin(3x)e⁻⁹ᵗ', viz.width - 120, 48, viz.colors.green, 11, 'left');
                            viz.screenText('t = ' + time.toFixed(2), viz.width / 2, viz.height - 20, viz.colors.text, 14, 'center');

                            // Update slider
                            slider.value = time;
                        }

                        function animate() {
                            if (!running) return;
                            time += 0.01;
                            if (time > 2) time = 0;
                            draw();
                            requestAnimationFrame(animate);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that the Fourier transform \\(\\mathcal{F}\\) satisfies \\(\\mathcal{F}^4 = I\\) on \\(L^2(\\mathbb{R})\\), meaning applying it four times returns the original function.',
                    hint: 'Use the fact that \\(\\mathcal{F}^2 f(x) = f(-x)\\) (reflection).',
                    solution: 'By the Fourier inversion formula and properties of the Fourier transform, \\(\\mathcal{F}^2 f(x) = f(-x)\\). Thus \\(\\mathcal{F}^4 f(x) = \\mathcal{F}^2(f(-x)) = f(-(-x)) = f(x)\\), so \\(\\mathcal{F}^4 = I\\).'
                },
                {
                    question: 'Show that in a Hilbert space, weak convergence (\\(\\langle v_n, w \\rangle \\to \\langle v, w \\rangle\\) for all \\(w\\)) plus norm convergence (\\(\\|v_n\\| \\to \\|v\\|\\)) implies strong convergence (\\(\\|v_n - v\\| \\to 0\\)).',
                    hint: 'Expand \\(\\|v_n - v\\|^2\\) and use weak convergence.',
                    solution: '\\(\\|v_n - v\\|^2 = \\|v_n\\|^2 - 2\\text{Re}\\langle v_n, v \\rangle + \\|v\\|^2\\). By norm convergence, \\(\\|v_n\\|^2 \\to \\|v\\|^2\\). By weak convergence, \\(\\langle v_n, v \\rangle \\to \\langle v, v \\rangle = \\|v\\|^2\\). Thus \\(\\|v_n - v\\|^2 \\to \\|v\\|^2 - 2\\|v\\|^2 + \\|v\\|^2 = 0\\).'
                },
                {
                    question: 'Use the Lax-Milgram theorem to show that the Dirichlet problem \\(-\\Delta u = f\\) in \\(\\Omega\\), \\(u = 0\\) on \\(\\partial\\Omega\\) has a unique weak solution in \\(H^1_0(\\Omega)\\) for any \\(f \\in L^2(\\Omega)\\).',
                    hint: 'Show that \\(a(u,v) = \\int_\\Omega \\nabla u \\cdot \\nabla v\\) is bounded and coercive on \\(H^1_0(\\Omega)\\).',
                    solution: 'Boundedness: \\(|a(u,v)| \\leq \\|\\nabla u\\|_{L^2}\\|\\nabla v\\|_{L^2} \\leq \\|u\\|_{H^1}\\|v\\|_{H^1}\\). Coercivity: By Poincaré inequality, \\(\\|u\\|_{L^2} \\leq C\\|\\nabla u\\|_{L^2}\\) for \\(u \\in H^1_0(\\Omega)\\), so \\(a(u,u) = \\|\\nabla u\\|_{L^2}^2 \\geq c\\|u\\|_{H^1}^2\\). The functional \\(\\phi(v) = \\int_\\Omega fv\\) is bounded. Lax-Milgram gives unique \\(u\\).'
                }
            ]
        }
    ]
});
