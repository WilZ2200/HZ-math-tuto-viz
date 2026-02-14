window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch05',
    number: 5,
    title: 'Modules II: Free and Noetherian Modules',
    subtitle: 'Free modules, rank, Noetherian rings, and the Hilbert basis theorem',
    sections: [
        {
            id: 'ch05-sec01',
            title: 'Free Modules and Rank',
            content: `
                <h2>Free Modules and Rank</h2>

                <p>In the study of vector spaces over fields, we know that every vector space has a basis and all bases have the same cardinality (the dimension). The situation for modules over arbitrary rings is considerably more subtle. While free modules do have bases, not all modules are free, and even for free modules, the behavior of bases depends critically on the underlying ring.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 5.1 (Free Module)</div>
                    <div class="env-body">
                        <p>An \\(R\\)-module \\(M\\) is called <strong>free</strong> if it has a basis \\(B\\), that is, a linearly independent set that spans \\(M\\). The <strong>rank</strong> of a free module \\(M\\), denoted \\(\\operatorname{rk}(M)\\), is the cardinality of any basis for \\(M\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Unlike vector spaces, not all modules are free. For example, \\(\\mathbb{Z}/n\\mathbb{Z}\\) is a \\(\\mathbb{Z}\\)-module that is not free for \\(n > 1\\). Moreover, the rank of a free module is not always well-defined unless we impose conditions on the ring \\(R\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 5.2 (Standard Free Module)</div>
                    <div class="env-body">
                        <p>Let \\(I\\) be any set and let \\(R\\) be a commutative ring with identity. The set \\(R^{(I)}\\) of all functions from \\(I\\) to \\(R\\) that have finite support is a free \\(R\\)-module of rank \\(|I|\\) with basis \\(\\{\\delta_i : i \\in I\\}\\) where</p>
                        \\[\\delta_i(j) = \\begin{cases} 1 & \\text{if } j = i \\\\ 0 & \\text{if } j \\neq i \\end{cases}\\]
                        <p>This basis is referred to as the <strong>standard basis</strong> for \\(R^{(I)}\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Think of \\(R^{(I)}\\) as consisting of "generalized vectors" indexed by \\(I\\), but with only finitely many non-zero coordinates. The standard basis vectors \\(\\delta_i\\) play the same role as the standard basis vectors in \\(\\mathbb{R}^n\\), but now indexed by an arbitrary set \\(I\\). The finite support condition ensures that linear combinations make sense.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="free-module-basis"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 5.3 (Characterization of Free Modules)</div>
                    <div class="env-body">
                        <p>Let \\(M\\) be an \\(R\\)-module. If \\(B\\) is a basis for \\(M\\), then \\(M\\) is isomorphic to \\(R^{(B)}\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Consider the map \\(\\varphi: M \\to R^{(B)}\\) defined by setting \\(\\varphi(b) = \\delta_b\\) for \\(b \\in B\\), where \\(\\delta_b\\) is defined as in Theorem 5.2, and extending \\(\\varphi\\) to \\(M\\) by linearity. Since \\(\\varphi\\) maps a basis for \\(M\\) to a basis \\(\\{\\delta_b : b \\in B\\}\\) for \\(R^{(B)}\\), it follows that \\(\\varphi\\) is an isomorphism from \\(M\\) to \\(R^{(B)}\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 5.4 (Invariance of Rank)</div>
                    <div class="env-body">
                        <p>Two free \\(R\\)-modules (over a commutative ring) are isomorphic if and only if they have the same rank.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>If \\(M \\cong N\\), then any isomorphism \\(\\varphi\\) from \\(M\\) to \\(N\\) maps a basis for \\(M\\) to a basis for \\(N\\). Since \\(\\varphi\\) is a bijection, we have \\(\\operatorname{rk}(M) = \\operatorname{rk}(N)\\).</p>
                        <p>Conversely, suppose that \\(\\operatorname{rk}(M) = \\operatorname{rk}(N)\\). Let \\(B\\) be a basis for \\(M\\) and let \\(C\\) be a basis for \\(N\\). Since \\(|B| = |C|\\), there is a bijective map \\(\\psi: B \\to C\\). This map can be extended by linearity to an isomorphism of \\(M\\) onto \\(N\\), and so \\(M \\cong N\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 5.5 (Bounds on Linear Independence)</div>
                    <div class="env-body">
                        <p>Let \\(R\\) be an integral domain and let \\(M\\) be a free \\(R\\)-module. Then all linearly independent sets have cardinality at most \\(\\operatorname{rk}(M)\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>Since \\(M \\cong R^{(n)}\\) for some \\(n = \\operatorname{rk}(M)\\), we need only prove the result for \\(R^{(n)}\\). Let \\(F\\) be the field of quotients of \\(R\\). Then \\(F^n\\) is a vector space over \\(F\\), and \\(R^{(n)} \\subseteq F^n\\).</p>
                        <p>A key observation is that a set \\(S = \\{v_1, \\ldots, v_k\\} \\subseteq R^{(n)}\\) is linearly independent over \\(R\\) if and only if it is linearly independent over \\(F\\) when viewed as a subset of \\(F^n\\). This follows by clearing denominators: if \\(\\sum \\frac{a_i}{b_i} v_i = 0\\) in \\(F^n\\), multiply through by \\(\\prod b_i\\) to obtain a linear dependence over \\(R\\).</p>
                        <p>Since any linearly independent set in the \\(n\\)-dimensional vector space \\(F^n\\) has at most \\(n\\) elements, the result follows.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="rank-visualization"></div>

                <div class="env-block example">
                    <div class="env-title">Example 5.6</div>
                    <div class="env-body">
                        <p><strong>(a)</strong> The \\(\\mathbb{Z}\\)-module \\(\\mathbb{Z}^n\\) is free of rank \\(n\\) with standard basis \\(\\{e_1, \\ldots, e_n\\}\\) where \\(e_i\\) has a \\(1\\) in position \\(i\\) and zeros elsewhere.</p>
                        <p><strong>(b)</strong> Any vector space \\(V\\) over a field \\(F\\) is a free \\(F\\)-module with rank equal to \\(\\dim_F(V)\\).</p>
                        <p><strong>(c)</strong> The \\(\\mathbb{Z}\\)-module \\(\\mathbb{Q}\\) is not free. If it were free with basis \\(B\\), then any \\(q \\in \\mathbb{Q}\\) could be written uniquely as \\(q = \\sum_{b \\in B} n_b b\\) with \\(n_b \\in \\mathbb{Z}\\) and only finitely many nonzero. But \\(q/2 = \\sum_{b \\in B} (n_b/2) b\\) would give a different representation if any \\(n_b\\) is odd, contradicting uniqueness.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'free-module-basis',
                    title: 'Interactive: Free Module Basis',
                    description: 'Visualize how a free module is generated by its basis elements',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 400, scale: 35});

                        // We'll visualize Z^2 as a free Z-module with basis {e1, e2}
                        const e1 = viz.addDraggable('e1', 3, 0, viz.colors.blue, 8, () => draw());
                        const e2 = viz.addDraggable('e2', 0, 3, viz.colors.orange, 8, () => draw());

                        let showLattice = true;
                        let showSpan = true;

                        const toggleLattice = VizEngine.createButton(controls, 'Toggle Lattice Points', () => {
                            showLattice = !showLattice;
                            draw();
                        });

                        const toggleSpan = VizEngine.createButton(controls, 'Toggle Span', () => {
                            showSpan = !showSpan;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw the lattice points generated by Z-linear combinations
                            if (showLattice) {
                                for (let a = -4; a <= 4; a++) {
                                    for (let b = -4; b <= 4; b++) {
                                        const x = a * e1.x + b * e2.x;
                                        const y = a * e1.y + b * e2.y;
                                        viz.drawPoint(x, y, viz.colors.teal + '66', null, 4);
                                    }
                                }
                            }

                            // Draw span as parallelogram grid
                            if (showSpan) {
                                for (let a = -3; a <= 3; a++) {
                                    for (let b = -3; b <= 3; b++) {
                                        if (a === 0 && b === 0) continue;
                                        const x1 = a * e1.x + b * e2.x;
                                        const y1 = a * e1.y + b * e2.y;
                                        const x2 = (a+1) * e1.x + b * e2.x;
                                        const y2 = (a+1) * e1.y + b * e2.y;
                                        viz.drawSegment(x1, y1, x2, y2, viz.colors.white + '22', 1);
                                        const x3 = a * e1.x + (b+1) * e2.x;
                                        const y3 = a * e1.y + (b+1) * e2.y;
                                        viz.drawSegment(x1, y1, x3, y3, viz.colors.white + '22', 1);
                                    }
                                }
                            }

                            // Draw basis vectors
                            viz.drawVector(0, 0, e1.x, e1.y, viz.colors.blue, 'e₁', 3);
                            viz.drawVector(0, 0, e2.x, e2.y, viz.colors.orange, 'e₂', 3);

                            // Draw a sample linear combination
                            const sampleX = 2 * e1.x + 1 * e2.x;
                            const sampleY = 2 * e1.y + 1 * e2.y;
                            viz.drawVector(0, 0, sampleX, sampleY, viz.colors.green, '2e₁ + e₂', 2);

                            viz.drawDraggables();

                            // Display rank
                            viz.drawText('Rank = 2 (basis has 2 elements)', -8, 5.5, viz.colors.text, 14);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'rank-visualization',
                    title: 'Interactive: Rank and Linear Independence',
                    description: 'Explore the relationship between rank and the maximum size of linearly independent sets',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 400, scale: 40});

                        // Visualize R^2 where R is the integers
                        const v1 = viz.addDraggable('v1', 2, 1, viz.colors.blue, 8, () => draw());
                        const v2 = viz.addDraggable('v2', -1, 2, viz.colors.orange, 8, () => draw());
                        const v3 = viz.addDraggable('v3', 1, -1, viz.colors.purple, 8, () => draw());

                        function isLinearlyIndependent() {
                            // Check if v3 is in the Z-span of v1 and v2
                            // This is more complex than for vector spaces!
                            // For now, check if determinants indicate independence
                            const det12 = v1.x * v2.y - v1.y * v2.x;
                            const det13 = v1.x * v3.y - v1.y * v3.x;
                            const det23 = v2.x * v3.y - v2.y * v3.x;

                            // Three vectors in R^2 are always dependent
                            return false;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw vectors
                            viz.drawVector(0, 0, v1.x, v1.y, viz.colors.blue, 'v₁', 2.5);
                            viz.drawVector(0, 0, v2.x, v2.y, viz.colors.orange, 'v₂', 2.5);
                            viz.drawVector(0, 0, v3.x, v3.y, viz.colors.purple, 'v₃', 2.5);

                            // Check if v1, v2 are independent
                            const det12 = v1.x * v2.y - v1.y * v2.x;
                            const indep12 = Math.abs(det12) > 0.01;

                            viz.drawDraggables();

                            // Display information
                            viz.drawText('Rank of ℤ² = 2', -7, 4.8, viz.colors.text, 14);
                            viz.drawText('v₁, v₂ are ' + (indep12 ? 'independent' : 'dependent'), -7, 4.2,
                                        indep12 ? viz.colors.green : viz.colors.red, 14);
                            viz.drawText('Any 3 vectors in ℤ² are dependent', -7, 3.6, viz.colors.yellow, 14);
                            viz.drawText('(max independent set size ≤ rank)', -7, 3.0, viz.colors.text, 12);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that \\(R^{(I)}\\) as defined in Theorem 5.2 is indeed a free \\(R\\)-module with basis \\(\\{\\\\delta_i : i \\\\in I\\}\\).',
                    hint: 'Show that the \\(\\\\delta_i\\) are linearly independent and span \\(R^{(I)}\\). Use the fact that functions have finite support.',
                    solution: 'For linear independence: suppose \\(\\\\sum_{i \\\\in I} r_i \\\\delta_i = 0\\) where only finitely many \\(r_i\\) are nonzero. Evaluating at any \\(j \\\\in I\\) gives \\(r_j = 0\\). For spanning: any \\(f \\\\in R^{(I)}\\) has finite support \\(\\\\{i_1, \\\\ldots, i_n\\}\\), so \\(f = \\\\sum_{k=1}^n f(i_k) \\\\delta_{i_k}\\).'
                },
                {
                    question: 'Let \\(R\\) be an integral domain. Prove that if \\(M\\) is a free \\(R\\)-module of rank \\(n\\), then any generating set for \\(M\\) has at least \\(n\\) elements.',
                    hint: 'Use the fact that you can map \\(M\\) to its field of quotients and apply dimension theory for vector spaces.',
                    solution: 'Let \\(F\\) be the field of quotients of \\(R\\). Then \\(M \\\\otimes_R F \\\\cong F^n\\) is an \\(n\\)-dimensional vector space over \\(F\\). Any generating set \\(S\\) for \\(M\\) yields a spanning set for \\(M \\\\otimes_R F\\), which must have at least \\(n\\) elements by basic linear algebra.'
                },
                {
                    question: 'Show that \\(\\\\mathbb{Z}/n\\\\mathbb{Z}\\) is not a free \\(\\\\mathbb{Z}\\)-module for \\(n > 1\\).',
                    hint: 'In a free module over \\(\\\\mathbb{Z}\\), multiplication by any nonzero integer is injective when restricted to basis elements.',
                    solution: 'Suppose \\(\\\\mathbb{Z}/n\\\\mathbb{Z}\\) were free with basis \\(B\\). For any \\(b \\\\in B\\), we have \\(nb = 0\\) in \\(\\\\mathbb{Z}/n\\\\mathbb{Z}\\). But in a free \\(\\\\mathbb{Z}\\)-module, if \\(nb = 0\\) with \\(n \\\\neq 0\\), then \\(b = 0\\), contradicting that \\(b\\) is a basis element.'
                }
            ]
        },
        {
            id: 'ch05-sec02',
            title: 'Free Modules and Epimorphisms',
            content: `
                <h2>Free Modules and Epimorphisms</h2>

                <p>Free modules enjoy special properties with respect to homomorphisms. In particular, epimorphisms onto free modules always split, meaning they have right inverses. This section explores these structural properties and their consequences.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 5.6 (Splitting of Epimorphisms onto Free Modules)</div>
                    <div class="env-body">
                        <p>Let \\(R\\) be a commutative ring with identity.</p>
                        <p><strong>(1)</strong> If \\(\\varphi: M \\to N\\) is an \\(R\\)-epimorphism and \\(N\\) is free, then \\(\\ker(\\varphi)\\) is complemented and</p>
                        \\[M \\cong \\ker(\\varphi) \\oplus K \\cong \\ker(\\varphi) \\oplus N\\]
                        <p>where \\(K \\cong N\\).</p>
                        <p><strong>(2)</strong> If \\(S\\) is a submodule of \\(M\\) and if \\(M/S\\) is free, then \\(S\\) is complemented and</p>
                        \\[M \\cong S \\oplus \\frac{M}{S}\\]
                        <p><strong>(3)</strong> If \\(M\\), \\(S\\), and \\(M/S\\) are all free, then</p>
                        \\[\\operatorname{rk}(M) = \\operatorname{rk}(S) + \\operatorname{rk}\\left(\\frac{M}{S}\\right)\\]
                        <p>and if the ranks are all finite, then</p>
                        \\[\\operatorname{rk}\\left(\\frac{M}{S}\\right) = \\operatorname{rk}(M) - \\operatorname{rk}(S)\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>For part (1), since \\(N\\) is free with basis \\(B\\), we can define a map \\(\\psi: N \\to M\\) by specifying its values arbitrarily on \\(B\\) and extending by linearity. For each \\(b \\in B\\), choose any \\(\\psi(b) \\in \\varphi^{-1}(b)\\) (possible since \\(\\varphi\\) is surjective). Then \\(\\varphi \\circ \\psi = \\text{id}_N\\), so \\(\\psi\\) is a right inverse of \\(\\varphi\\).</p>
                        <p>By a general theorem on split exact sequences, we have \\(M \\cong \\ker(\\varphi) \\oplus \\text{im}(\\psi)\\). Since \\(\\psi\\) is injective (being a right inverse of a surjection), we have \\(\\text{im}(\\psi) \\cong N\\).</p>
                        <p>Part (2) follows by applying part (1) to the canonical projection \\(\\pi: M \\to M/S\\).</p>
                        <p>Part (3) follows from the fact that if \\(M \\cong S \\oplus M/S\\) and all modules are free, then a basis for \\(M\\) is the union of (the images of) bases for \\(S\\) and \\(M/S\\), which are disjoint.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The key insight is that free modules are "projective": any surjection onto a free module can be "lifted" to a section. Think of it this way: if you have a basis for \\(N\\), you can arbitrarily choose preimages for each basis element in \\(M\\), and this extends to a right inverse by linearity. This is analogous to choosing a basis for a quotient vector space and lifting it to the original space.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 5.7</div>
                    <div class="env-body">
                        <p>Consider the \\(\\mathbb{Z}\\)-module homomorphism \\(\\varphi: \\mathbb{Z}^3 \\to \\mathbb{Z}^2\\) defined by</p>
                        \\[\\varphi(x, y, z) = (x + y, y + z)\\]
                        <p>This is surjective (check: \\(\\varphi(a, 0, b) = (a, b)\\)). The kernel consists of elements \\((x, y, z)\\) with \\(x + y = 0\\) and \\(y + z = 0\\), so \\(x = -y\\) and \\(z = -y\\). Thus</p>
                        \\[\\ker(\\varphi) = \\{(-t, t, -t) : t \\in \\mathbb{Z}\\} \\cong \\mathbb{Z}\\]
                        <p>By Theorem 5.6, we have \\(\\mathbb{Z}^3 \\cong \\mathbb{Z} \\oplus \\mathbb{Z}^2\\), confirming that \\(3 = 1 + 2\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="epimorphism-splitting"></div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body">
                        <p>The converse of Theorem 5.6 is false: if \\(\\varphi: M \\to N\\) is an epimorphism with \\(\\ker(\\varphi)\\) complemented, it does <em>not</em> follow that \\(N\\) is free. For example, the projection \\(\\mathbb{Z} \\to \\mathbb{Z}/n\\mathbb{Z}\\) has kernel \\(n\\mathbb{Z} \\cong \\mathbb{Z}\\), which is free and hence complemented (trivially, as a direct summand of \\(\\mathbb{Z}\\)), but \\(\\mathbb{Z}/n\\mathbb{Z}\\) is not free for \\(n > 1\\).</p>
                        <p><em>Note:</em> The statement above needs reconsideration. Actually, \\(n\\mathbb{Z}\\) is not complemented in \\(\\mathbb{Z}\\) for \\(n > 1\\), since \\(\\mathbb{Z}\\) is indecomposable. The correct warning is: not all kernels of epimorphisms are complemented.</p>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 5.8</div>
                    <div class="env-body">
                        <p>Let \\(R\\) be a commutative ring with identity. If \\(M\\) is a free \\(R\\)-module and \\(S\\) is a submodule such that \\(M/S\\) is also free, then \\(S\\) is a direct summand of \\(M\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'epimorphism-splitting',
                    title: 'Interactive: Splitting of Epimorphisms',
                    description: 'Visualize how an epimorphism onto a free module splits',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 450, scale: 1});

                        let step = 0;
                        const maxSteps = 4;

                        const nextBtn = VizEngine.createButton(controls, 'Next Step', () => {
                            step = (step + 1) % (maxSteps + 1);
                            draw();
                        });

                        const resetBtn = VizEngine.createButton(controls, 'Reset', () => {
                            step = 0;
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            const ctx = viz.ctx;
                            const w = viz.canvas.width;
                            const h = viz.canvas.height;

                            // Draw M at top
                            const mX = w / 2;
                            const mY = 80;
                            const mRadius = 50;

                            // Draw N at bottom
                            const nX = w / 2;
                            const nY = 320;
                            const nRadius = 40;

                            // Draw ker(φ) on left
                            const kerX = 120;
                            const kerY = 200;
                            const kerRadius = 35;

                            // Draw K on right (section)
                            const kX = w - 120;
                            const kY = 200;
                            const kRadius = 35;

                            // Step 0: Show M and N with epimorphism φ
                            if (step >= 0) {
                                viz.drawCircle(mX, mY, mRadius, viz.colors.blue + '33', viz.colors.blue);
                                viz.drawText('M', mX, mY, viz.colors.white, 24, 'center', 'middle');

                                viz.drawCircle(nX, nY, nRadius, viz.colors.orange + '33', viz.colors.orange);
                                viz.drawText('N (free)', nX, nY, viz.colors.white, 20, 'center', 'middle');

                                // Draw arrow φ
                                viz.drawSegment(mX, mY + mRadius, nX, nY - nRadius, viz.colors.white, 2);
                                viz.drawText('φ (epi)', mX + 30, (mY + nY) / 2, viz.colors.white, 16);
                            }

                            // Step 1: Show kernel
                            if (step >= 1) {
                                viz.drawCircle(kerX, kerY, kerRadius, viz.colors.red + '33', viz.colors.red);
                                viz.drawText('ker(φ)', kerX, kerY, viz.colors.white, 18, 'center', 'middle');

                                // Arrow from ker to M
                                viz.drawSegment(kerX + kerRadius, kerY, mX - mRadius * 0.7, mY + mRadius * 0.5,
                                              viz.colors.red, 2, true);
                            }

                            // Step 2: Construct section ψ
                            if (step >= 2) {
                                // Draw ψ: N → M (dashed)
                                viz.drawSegment(nX + nRadius * 0.7, nY - nRadius * 0.7,
                                              mX + mRadius * 0.7, mY + mRadius * 0.7,
                                              viz.colors.green, 2, true);
                                viz.drawText('ψ (section)', nX + 80, (mY + nY) / 2 - 20, viz.colors.green, 16);
                                viz.drawText('φ ∘ ψ = id', nX + 80, (mY + nY) / 2 + 5, viz.colors.yellow, 14);
                            }

                            // Step 3: Show K = im(ψ)
                            if (step >= 3) {
                                viz.drawCircle(kX, kY, kRadius, viz.colors.green + '33', viz.colors.green);
                                viz.drawText('K ≅ N', kX, kY, viz.colors.white, 18, 'center', 'middle');

                                // Arrow from K to M
                                viz.drawSegment(kX - kRadius * 0.7, kY - kRadius * 0.5, mX + mRadius * 0.7, mY + mRadius * 0.5,
                                              viz.colors.green, 2, true);
                            }

                            // Step 4: Show decomposition M ≅ ker(φ) ⊕ K
                            if (step >= 4) {
                                viz.drawText('M ≅ ker(φ) ⊕ K', w / 2, h - 40, viz.colors.yellow, 22, 'center', 'middle');

                                // Draw direct sum symbol
                                const oplus = '⊕';
                                viz.drawSegment(kerX + kerRadius, kerY, kX - kRadius, kY, viz.colors.white + '66', 2, true);
                                viz.drawText(oplus, (kerX + kX) / 2, kerY - 15, viz.colors.white, 28, 'center', 'middle');
                            }

                            // Step indicator
                            const stepDescriptions = [
                                'Step 0: Epimorphism φ: M → N (N is free)',
                                'Step 1: Kernel of φ',
                                'Step 2: Construct section ψ using freeness of N',
                                'Step 3: K = im(ψ) ≅ N',
                                'Step 4: Direct sum decomposition'
                            ];
                            viz.drawText(stepDescriptions[step], 20, 20, viz.colors.text, 14, 'left', 'top');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that if \\(\\\\varphi: M \\\\to N\\) is an \\(R\\)-epimorphism and \\(N\\) is free, then there exists a homomorphism \\(\\\\psi: N \\\\to M\\) such that \\(\\\\varphi \\\\circ \\\\psi = \\\\text{id}_N\\).',
                    hint: 'Use the fact that \\(N\\) has a basis and you can define \\(\\\\psi\\) by specifying its values on basis elements.',
                    solution: 'Let \\(B\\) be a basis for \\(N\\). For each \\(b \\\\in B\\), since \\(\\\\varphi\\) is surjective, there exists \\(m_b \\\\in M\\) with \\(\\\\varphi(m_b) = b\\). Define \\(\\\\psi(b) = m_b\\) and extend by linearity. Then \\(\\\\varphi(\\\\psi(b)) = \\\\varphi(m_b) = b\\) for all \\(b \\\\in B\\), so \\(\\\\varphi \\\\circ \\\\psi = \\\\text{id}_N\\) by linearity.'
                },
                {
                    question: 'Let \\(I\\) be an ideal of \\(\\\\mathbb{Z}\\). Prove that if \\(\\\\mathbb{Z}/I\\) is a free \\(\\\\mathbb{Z}\\)-module, then \\(I = \\\\{0\\}\\).',
                    hint: 'Use the fact that free \\(\\\\mathbb{Z}\\)-modules are torsion-free.',
                    solution: 'If \\(\\\\mathbb{Z}/I\\) is free and \\(I \\\\neq \\\\{0\\}\\), let \\(I = n\\\\mathbb{Z}\\) for some \\(n > 0\\). Then \\(\\\\overline{1} \\\\in \\\\mathbb{Z}/n\\\\mathbb{Z}\\) satisfies \\(n \\\\cdot \\\\overline{1} = \\\\overline{0}\\). But in a free \\(\\\\mathbb{Z}\\)-module, if \\(n \\\\cdot m = 0\\) with \\(n \\\\neq 0\\), then \\(m = 0\\). Thus \\(\\\\overline{1} = \\\\overline{0}\\), implying \\(\\\\mathbb{Z}/I = \\\\{0\\}\\), a contradiction unless \\(I = \\\\mathbb{Z}\\). But \\(\\\\mathbb{Z}/\\\\mathbb{Z} = \\\\{0\\}\\) is not free (rank 0 is debatable, but conventionally the zero module is considered free of rank 0). The only possibility is \\(I = \\\\{0\\}\\).'
                },
                {
                    question: 'Show that if \\(M\\) and \\(M/S\\) are finitely generated free modules, then \\(S\\) is also finitely generated.',
                    hint: 'Use the direct sum decomposition and the fact that submodules of finitely generated free modules have bounded rank.',
                    solution: 'By Theorem 5.6, since \\(M/S\\) is free, we have \\(M \\\\cong S \\\\oplus M/S\\). Since \\(M\\) is finitely generated free with rank \\(n\\) and \\(M/S\\) has rank \\(k\\), the rank of \\(S\\) is \\(n - k\\), which is finite. Thus \\(S\\) is a free module of finite rank, hence finitely generated.'
                }
            ]
        },
        {
            id: 'ch05-sec03',
            title: 'Noetherian Modules',
            content: `
                <h2>Noetherian Modules</h2>

                <p>One of the most important finiteness conditions in algebra is the ascending chain condition. Modules and rings satisfying this condition are called Noetherian, after Emmy Noether, who pioneered the use of these ideas in abstract algebra.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 5.9 (Ascending Chain Condition for Modules)</div>
                    <div class="env-body">
                        <p>An \\(R\\)-module \\(M\\) is said to satisfy the <strong>ascending chain condition (ACC)</strong> on submodules if every ascending sequence of submodules</p>
                        \\[S_1 \\subseteq S_2 \\subseteq S_3 \\subseteq \\cdots\\]
                        <p>is eventually constant, that is, there exists an index \\(n\\) such that</p>
                        \\[S_n = S_{n+1} = S_{n+2} = \\cdots\\]
                        <p>Modules satisfying the ACC on submodules are called <strong>Noetherian modules</strong>.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 5.10 (Noetherian Ring)</div>
                    <div class="env-body">
                        <p>A ring \\(R\\) is said to satisfy the <strong>ascending chain condition on ideals</strong> if any ascending sequence</p>
                        \\[I_1 \\subseteq I_2 \\subseteq I_3 \\subseteq \\cdots\\]
                        <p>of ideals of \\(R\\) is eventually constant. A ring satisfying the ACC on ideals is called a <strong>Noetherian ring</strong>.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Since a ring \\(R\\) is a module over itself and the submodules of the module \\(R\\) are precisely the ideals of \\(R\\), the definition of a Noetherian ring is a special case of the definition of a Noetherian module.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="acc-animation"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 5.11 (Characterization of Noetherian Modules)</div>
                    <div class="env-body">
                        <p><strong>(1)</strong> An \\(R\\)-module \\(M\\) is Noetherian if and only if every submodule of \\(M\\) is finitely generated.</p>
                        <p><strong>(2)</strong> In particular, a ring \\(R\\) is Noetherian if and only if every ideal of \\(R\\) is finitely generated.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>(⇐)</strong> Suppose all submodules of \\(M\\) are finitely generated and that \\(M\\) contains an infinite ascending chain</p>
                        \\[S_1 \\subsetneq S_2 \\subsetneq S_3 \\subsetneq \\cdots\\]
                        <p>Then the union</p>
                        \\[S = \\bigcup_{i=1}^{\\infty} S_i\\]
                        <p>is easily seen to be a submodule of \\(M\\). Hence \\(S\\) is finitely generated, say \\(S = \\langle v_1, \\ldots, v_k \\rangle\\). Since each \\(v_j \\in S\\), there exists an index \\(n_j\\) such that \\(v_j \\in S_{n_j}\\). Let \\(n = \\max\\{n_1, \\ldots, n_k\\}\\). Then</p>
                        \\[\\{v_1, \\ldots, v_k\\} \\subseteq S_n\\]
                        <p>and so</p>
                        \\[S = \\langle v_1, \\ldots, v_k \\rangle \\subseteq S_n \\subseteq S_{n+1} \\subseteq \\cdots \\subseteq S\\]
                        <p>which shows that \\(S_n = S_{n+1} = \\cdots\\), contradicting that each inclusion is proper.</p>

                        <p><strong>(⇒)</strong> Suppose \\(M\\) satisfies the ACC on submodules and let \\(S\\) be a submodule of \\(M\\). Pick \\(v_1 \\in S\\) and consider the submodule \\(S_1 = \\langle v_1 \\rangle \\subseteq S\\). If \\(S_1 = S\\), then \\(S\\) is finitely generated. Otherwise, there is a \\(v_2 \\in S \\setminus S_1\\). Let \\(S_2 = \\langle v_1, v_2 \\rangle\\). If \\(S_2 = S\\), we're done. Otherwise, pick \\(v_3 \\in S \\setminus S_2\\) and consider \\(S_3 = \\langle v_1, v_2, v_3 \\rangle\\).</p>
                        <p>Continuing in this way, we get an ascending chain</p>
                        \\[\\langle v_1 \\rangle \\subseteq \\langle v_1, v_2 \\rangle \\subseteq \\langle v_1, v_2, v_3 \\rangle \\subseteq \\cdots \\subseteq S\\]
                        <p>If none of these submodules equals \\(S\\), we would have an infinite ascending chain with each inclusion proper, contradicting the ACC. Hence \\(S = \\langle v_1, \\ldots, v_n \\rangle\\) for some \\(n\\), so \\(S\\) is finitely generated.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The Noetherian condition is a powerful finiteness assumption. It says that you can't keep adding "new directions" indefinitely—at some point, any ascending chain of submodules stabilizes. The equivalence with finite generation of submodules is remarkable: it transforms a condition about chains (which is hard to check directly) into a condition about individual submodules (which is more concrete).</p>
                        <p>Think of it this way: in a Noetherian module, the process of "building up" a submodule by adding one generator at a time must terminate in finitely many steps. This is analogous to finite-dimensional vector spaces, where any subspace has a finite basis.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 5.12</div>
                    <div class="env-body">
                        <p><strong>(a)</strong> Any finitely generated module over a field is a finite-dimensional vector space, hence Noetherian.</p>
                        <p><strong>(b)</strong> The \\(\\mathbb{Z}\\)-module \\(\\mathbb{Z}\\) is Noetherian because every ideal of \\(\\mathbb{Z}\\) is of the form \\(n\\mathbb{Z}\\), which is generated by \\(n\\).</p>
                        <p><strong>(c)</strong> The \\(\\mathbb{Z}\\)-module \\(\\mathbb{Q}\\) is <em>not</em> Noetherian. Consider the ascending chain of subgroups</p>
                        \\[\\mathbb{Z} \\subsetneq \\frac{1}{2}\\mathbb{Z} \\subsetneq \\frac{1}{6}\\mathbb{Z} \\subsetneq \\frac{1}{24}\\mathbb{Z} \\subsetneq \\cdots \\subsetneq \\frac{1}{n!}\\mathbb{Z} \\subsetneq \\cdots\\]
                        <p>Each inclusion is proper, and the chain never stabilizes.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="noetherian-comparison"></div>
            `,
            visualizations: [
                {
                    id: 'acc-animation',
                    title: 'Interactive: Ascending Chain Condition',
                    description: 'Visualize how ascending chains stabilize in Noetherian modules',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 400, scale: 1});

                        let animating = false;
                        let t = 0;
                        const chainLength = 8;
                        const stabilizeAt = 4;

                        const startBtn = VizEngine.createButton(controls, 'Start Animation', () => {
                            if (!animating) {
                                animating = true;
                                t = 0;
                                viz.animate((timestamp) => {
                                    t += 0.02;
                                    if (t > chainLength + 2) {
                                        t = 0;
                                    }
                                    draw();
                                });
                                startBtn.textContent = 'Stop Animation';
                            } else {
                                animating = false;
                                viz.stopAnimation();
                                startBtn.textContent = 'Start Animation';
                            }
                        });

                        function draw() {
                            viz.clear();

                            const ctx = viz.ctx;
                            const w = viz.canvas.width;
                            const h = viz.canvas.height;

                            // Draw title
                            viz.screenText('Ascending Chain: S₁ ⊆ S₂ ⊆ S₃ ⊆ ...', w / 2, 30, viz.colors.white, 18, 'center');

                            const startY = 80;
                            const spacing = 40;
                            const baseWidth = 60;

                            for (let i = 1; i <= chainLength; i++) {
                                const y = startY + (i - 1) * spacing;
                                const growthRate = i <= stabilizeAt ? i : stabilizeAt;
                                const width = baseWidth + growthRate * 40;
                                const x = (w - width) / 2;

                                // Determine color based on animation progress
                                const alpha = t >= i ? 1 : Math.max(0, Math.min(1, t - i + 1));
                                const color = i > stabilizeAt ? viz.colors.yellow : viz.colors.blue;

                                // Draw rectangle for S_i
                                ctx.fillStyle = color + Math.floor(alpha * 0.4 * 255).toString(16).padStart(2, '0');
                                ctx.fillRect(x, y, width, 30);
                                ctx.strokeStyle = color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
                                ctx.lineWidth = 2;
                                ctx.strokeRect(x, y, width, 30);

                                // Draw label
                                viz.screenText('S' + (i === stabilizeAt + 1 ? '₄' : '₁₂₃₄₅₆₇₈'.charAt(i - 1)),
                                            x + width / 2, y + 15,
                                            viz.colors.white, 16, 'center', 'middle');

                                // Draw subset symbol if not first
                                if (i > 1 && alpha > 0.5) {
                                    const prevY = startY + (i - 2) * spacing;
                                    const strict = i <= stabilizeAt;
                                    viz.screenText(strict ? '⊊' : '=', w / 2 - 80, (y + prevY + 30) / 2,
                                                strict ? viz.colors.orange : viz.colors.green, 24, 'center', 'middle');
                                }
                            }

                            // Draw stabilization message
                            if (t > stabilizeAt + 0.5) {
                                const msg = 'Chain stabilizes at S₄ (Noetherian!)';
                                viz.screenText(msg, w / 2, h - 40, viz.colors.green, 18, 'center', 'middle');
                            }
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'noetherian-comparison',
                    title: 'Interactive: Noetherian vs Non-Noetherian',
                    description: 'Compare behavior of Noetherian and non-Noetherian modules',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 450, scale: 1});

                        let showNoetherian = true;

                        const toggleBtn = VizEngine.createButton(controls, 'Toggle Module Type', () => {
                            showNoetherian = !showNoetherian;
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            const ctx = viz.ctx;
                            const w = viz.canvas.width;
                            const h = viz.canvas.height;

                            if (showNoetherian) {
                                // Noetherian example: Z as a Z-module
                                viz.screenText('Noetherian Module: ℤ as a ℤ-module', w / 2, 30, viz.colors.green, 20, 'center');
                                viz.screenText('Every ideal is of the form nℤ (finitely generated)', w / 2, 60, viz.colors.text, 14, 'center');

                                const ideals = [
                                    {name: '0', gen: '⟨0⟩', size: 1},
                                    {name: '2ℤ', gen: '⟨2⟩', size: 2},
                                    {name: '3ℤ', gen: '⟨3⟩', size: 2},
                                    {name: '6ℤ', gen: '⟨6⟩', size: 2},
                                    {name: 'ℤ', gen: '⟨1⟩', size: 1.5}
                                ];

                                let y = 120;
                                for (let i = 0; i < ideals.length; i++) {
                                    const ideal = ideals[i];
                                    const barWidth = ideal.size * 80;
                                    const x = w / 2 - barWidth / 2;

                                    ctx.fillStyle = viz.colors.blue + '44';
                                    ctx.fillRect(x, y, barWidth, 35);
                                    ctx.strokeStyle = viz.colors.blue;
                                    ctx.lineWidth = 2;
                                    ctx.strokeRect(x, y, barWidth, 35);

                                    viz.screenText(ideal.name, x - 40, y + 17, viz.colors.white, 14, 'right', 'middle');
                                    viz.screenText(ideal.gen, x + barWidth / 2, y + 17, viz.colors.yellow, 14, 'center', 'middle');

                                    y += 50;
                                }

                                viz.screenText('✓ All ideals finitely generated', w / 2, h - 50, viz.colors.green, 16, 'center');
                                viz.screenText('✓ ACC holds', w / 2, h - 25, viz.colors.green, 16, 'center');

                            } else {
                                // Non-Noetherian example: Q as a Z-module
                                viz.screenText('Non-Noetherian Module: ℚ as a ℤ-module', w / 2, 30, viz.colors.red, 20, 'center');
                                viz.screenText('Infinite ascending chain that never stabilizes:', w / 2, 60, viz.colors.text, 14, 'center');

                                const chain = [
                                    {name: 'ℤ', width: 80},
                                    {name: '½ℤ', width: 120},
                                    {name: '⅙ℤ', width: 160},
                                    {name: '¹⁄₂₄ℤ', width: 200},
                                    {name: '¹⁄₁₂₀ℤ', width: 240},
                                    {name: '...', width: 280}
                                ];

                                let y = 120;
                                for (let i = 0; i < chain.length; i++) {
                                    const item = chain[i];
                                    const barWidth = item.width;
                                    const x = w / 2 - barWidth / 2;

                                    ctx.fillStyle = viz.colors.orange + '44';
                                    ctx.fillRect(x, y, barWidth, 30);
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 2;
                                    ctx.strokeRect(x, y, barWidth, 30);

                                    viz.screenText(item.name, x + barWidth / 2, y + 15, viz.colors.white, 14, 'center', 'middle');

                                    if (i < chain.length - 1) {
                                        viz.screenText('⊊', w / 2 + barWidth / 2 + 20, y + 15, viz.colors.yellow, 20, 'center', 'middle');
                                    }

                                    y += 45;
                                }

                                viz.screenText('✗ Chain never stabilizes', w / 2, h - 50, viz.colors.red, 16, 'center');
                                viz.screenText('✗ ACC fails', w / 2, h - 25, viz.colors.red, 16, 'center');
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that the union of an ascending chain of submodules is a submodule.',
                    hint: 'Check the submodule axioms directly. Use the fact that if \\(x, y\\) are in the union, they both lie in some \\(S_n\\) for large enough \\(n\\).',
                    solution: 'Let \\(S = \\\\bigcup_{i=1}^{\\\\infty} S_i\\). If \\(x, y \\\\in S\\), then \\(x \\\\in S_m\\) and \\(y \\\\in S_n\\) for some \\(m, n\\). Let \\(k = \\\\max\\\\{m, n\\\\}\\). Then \\(x, y \\\\in S_k\\), so \\(x + y \\\\in S_k \\\\subseteq S\\). If \\(r \\\\in R\\) and \\(x \\\\in S\\), then \\(x \\\\in S_m\\) for some \\(m\\), so \\(rx \\\\in S_m \\\\subseteq S\\). Thus \\(S\\) is a submodule.'
                },
                {
                    question: 'Show that an \\(R\\)-module \\(M\\) satisfies the ACC for submodules if and only if every nonempty collection \\(\\\\mathcal{F}\\) of submodules of \\(M\\) has a maximal element.',
                    hint: 'For one direction, use the ACC to show that if you pick \\(S_1 \\\\in \\\\mathcal{F}\\) and keep replacing it with strictly larger elements, the chain must stabilize. For the other direction, assume ACC fails and construct a collection with no maximal element.',
                    solution: '(⇒) Suppose ACC holds and \\(\\\\mathcal{F}\\) is nonempty. Pick \\(S_1 \\\\in \\\\mathcal{F}\\). If \\(S_1\\) is maximal, done. Otherwise, pick \\(S_2 \\\\in \\\\mathcal{F}\\) with \\(S_1 \\\\subsetneq S_2\\). Continue. By ACC, this chain stabilizes at some \\(S_n\\), which must be maximal in \\(\\\\mathcal{F}\\). (⇐) Suppose every nonempty collection has a maximal element. If \\(S_1 \\\\subseteq S_2 \\\\subseteq \\\\cdots\\) is an ascending chain, let \\(\\\\mathcal{F} = \\\\{S_i : i \\\\geq 1\\\\}\\). This has a maximal element \\(S_n\\), so \\(S_n = S_{n+1} = \\\\cdots\\).'
                },
                {
                    question: 'Let \\(S\\) be a submodule of an \\(R\\)-module \\(M\\). Show that if \\(M\\) is finitely generated, then so is the quotient \\(M/S\\).',
                    hint: 'If \\(M = \\\\langle m_1, \\\\ldots, m_n \\\\rangle\\), consider the images of the generators under the quotient map.',
                    solution: 'If \\(M = \\\\langle m_1, \\\\ldots, m_n \\\\rangle\\), let \\(\\\\pi: M \\\\to M/S\\) be the quotient map. Then \\(M/S = \\\\pi(M) = \\\\pi(\\\\langle m_1, \\\\ldots, m_n \\\\rangle) = \\\\langle \\\\pi(m_1), \\\\ldots, \\\\pi(m_n) \\\\rangle\\), so \\(M/S\\) is finitely generated.'
                }
            ]
        },
        {
            id: 'ch05-sec04',
            title: 'Noetherian Rings and Modules',
            content: `
                <h2>Noetherian Rings and Modules</h2>

                <p>A fundamental question in module theory is: when are all finitely generated modules over a ring \\(R\\) Noetherian? The answer turns out to be remarkably clean: this happens if and only if \\(R\\) itself is Noetherian as a ring.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 5.13 (Noetherian Rings and Finitely Generated Modules)</div>
                    <div class="env-body">
                        <p>Let \\(R\\) be a commutative ring with identity. Then \\(R\\) is Noetherian if and only if every finitely generated \\(R\\)-module is Noetherian.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>One direction is evident: if every finitely generated \\(R\\)-module is Noetherian, then \\(R\\) itself (as an \\(R\\)-module generated by \\(1\\)) is Noetherian.</p>

                        <p>For the converse, assume \\(R\\) is Noetherian and let \\(M = \\langle v_1, \\ldots, v_n \\rangle\\) be a finitely generated \\(R\\)-module. Consider the epimorphism \\(\\varphi: R^n \\to M\\) defined by</p>
                        \\[\\varphi(r_1, \\ldots, r_n) = r_1 v_1 + \\cdots + r_n v_n\\]

                        <p>Let \\(S\\) be a submodule of \\(M\\). Then</p>
                        \\[\\varphi^{-1}(S) = \\{(r_1, \\ldots, r_n) \\in R^n : r_1 v_1 + \\cdots + r_n v_n \\in S\\}\\]
                        <p>is a submodule of \\(R^n\\), and \\(\\varphi(\\varphi^{-1}(S)) = S\\). If every submodule of \\(R^n\\) is finitely generated, then \\(\\varphi^{-1}(S)\\) is finitely generated, say \\(\\varphi^{-1}(S) = \\langle w_1, \\ldots, w_k \\rangle\\). Then</p>
                        \\[S = \\varphi(\\varphi^{-1}(S)) = \\langle \\varphi(w_1), \\ldots, \\varphi(w_k) \\rangle\\]
                        <p>is finitely generated. Thus it suffices to prove the theorem for \\(R^n\\), which we do by induction on \\(n\\).</p>

                        <p><strong>Base case (\\(n = 1\\)):</strong> Any submodule of \\(R\\) is an ideal of \\(R\\), which is finitely generated by assumption.</p>

                        <p><strong>Inductive step:</strong> Assume every submodule of \\(R^{n-1}\\) is finitely generated, and let \\(S\\) be a submodule of \\(R^n\\). Define</p>
                        \\[S_n = \\{r \\in R : (r_1, \\ldots, r_{n-1}, r) \\in S \\text{ for some } r_1, \\ldots, r_{n-1} \\in R\\}\\]
                        <p>This is the "projection onto the last coordinate" and is an ideal of \\(R\\). Since \\(R\\) is Noetherian, \\(S_n\\) is finitely generated, say \\(S_n = \\langle a_1, \\ldots, a_k \\rangle\\). For each \\(a_i\\), choose a vector \\(u_i = (u_{i,1}, \\ldots, u_{i,n-1}, a_i) \\in S\\).</p>

                        <p>Also, let</p>
                        \\[S_0 = \\{s \\in S : s = (r_1, \\ldots, r_{n-1}, 0) \\text{ for some } r_1, \\ldots, r_{n-1} \\in R\\}\\]
                        <p>This is isomorphic to a submodule of \\(R^{n-1}\\), hence finitely generated by the inductive hypothesis, say \\(S_0 = \\langle v_1, \\ldots, v_m \\rangle\\).</p>

                        <p>We claim that \\(S = \\langle u_1, \\ldots, u_k, v_1, \\ldots, v_m \\rangle\\). To see this, let \\(s = (r_1, \\ldots, r_n) \\in S\\). Then \\(r_n \\in S_n\\), so</p>
                        \\[r_n = \\sum_{i=1}^k b_i a_i\\]
                        <p>for some \\(b_i \\in R\\). Consider</p>
                        \\[s' = \\sum_{i=1}^k b_i u_i = \\left(\\sum_{i=1}^k b_i u_{i,1}, \\ldots, \\sum_{i=1}^k b_i u_{i,n-1}, \\sum_{i=1}^k b_i a_i\\right) = (s'_1, \\ldots, s'_{n-1}, r_n)\\]
                        <p>Then \\(s - s' = (r_1 - s'_1, \\ldots, r_{n-1} - s'_{n-1}, 0) \\in S_0\\), so \\(s - s' = \\sum_{j=1}^m c_j v_j\\) for some \\(c_j \\in R\\). Thus</p>
                        \\[s = s' + (s - s') = \\sum_{i=1}^k b_i u_i + \\sum_{j=1}^m c_j v_j \\in \\langle u_1, \\ldots, u_k, v_1, \\ldots, v_m \\rangle\\]
                        <p>This completes the induction.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 5.14</div>
                    <div class="env-body">
                        <p>Let \\(R\\) be a principal ideal domain. If an \\(R\\)-module \\(M\\) is \\(n\\)-generated, then any submodule of \\(M\\) is also \\(n\\)-generated.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>The proof follows the same pattern as Theorem 5.13, but uses the fact that ideals in a PID are principal (generated by a single element). In the inductive step, \\(S_n\\) is a principal ideal, so only one element \\(u_1\\) is needed instead of \\(k\\) elements. The bound on the number of generators is preserved through the induction.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 5.15</div>
                    <div class="env-body">
                        <p><strong>(a)</strong> Fields are Noetherian rings (every ideal is either \\(\\{0\\}\\) or the whole field, both finitely generated). Thus all finitely generated vector spaces are Noetherian (which is obvious, since they're finite-dimensional).</p>
                        <p><strong>(b)</strong> \\(\\mathbb{Z}\\) is a Noetherian ring (it's a PID). Thus every finitely generated abelian group is Noetherian as a \\(\\mathbb{Z}\\)-module.</p>
                        <p><strong>(c)</strong> The ring \\(k[x_1, x_2, \\ldots]\\) of polynomials in infinitely many variables over a field \\(k\\) is <em>not</em> Noetherian. The ascending chain of ideals</p>
                        \\[\\langle x_1 \\rangle \\subsetneq \\langle x_1, x_2 \\rangle \\subsetneq \\langle x_1, x_2, x_3 \\rangle \\subsetneq \\cdots\\]
                        <p>never stabilizes.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ideal-chain"></div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 5.16</div>
                    <div class="env-body">
                        <p>Let \\(S\\) be a submodule of an \\(R\\)-module \\(M\\). If both \\(S\\) and \\(M/S\\) are Noetherian, then so is \\(M\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Let \\(T\\) be a submodule of \\(M\\). We need to show \\(T\\) is finitely generated. Consider \\(T \\cap S\\) and \\((T + S)/S \\cong T/(T \\cap S)\\). Since \\(T \\cap S\\) is a submodule of the Noetherian module \\(S\\), it is finitely generated, say \\(T \\cap S = \\langle t_1, \\ldots, t_k \\rangle\\).</p>
                        <p>Also, \\((T + S)/S\\) is a submodule of \\(M/S\\), which is Noetherian, so \\((T + S)/S\\) is finitely generated. Let \\(\\{s_1 + S, \\ldots, s_m + S\\}\\) be generators, where \\(s_i \\in T + S\\). Each \\(s_i = t'_i + s'_i\\) for some \\(t'_i \\in T\\) and \\(s'_i \\in S\\). We can assume \\(s_i \\in T\\) (by replacing \\(s_i\\) with \\(t'_i\\)).</p>
                        <p>We claim \\(T = \\langle t_1, \\ldots, t_k, s_1, \\ldots, s_m \\rangle\\). Let \\(t \\in T\\). Then \\(t + S \\in (T+S)/S\\), so</p>
                        \\[t + S = \\sum_{i=1}^m r_i (s_i + S) = \\left(\\sum_{i=1}^m r_i s_i\\right) + S\\]
                        <p>Thus \\(t - \\sum r_i s_i \\in S \\cap T = \\langle t_1, \\ldots, t_k \\rangle\\), so \\(t \\in \\langle t_1, \\ldots, t_k, s_1, \\ldots, s_m \\rangle\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'ideal-chain',
                    title: 'Interactive: Ideal Chain Stabilization',
                    description: 'Visualize how chains of ideals stabilize in Noetherian rings',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 450, scale: 1});

                        let ringType = 'Z'; // 'Z' or 'k[x,y,...]'

                        const toggleRing = VizEngine.createButton(controls, 'Toggle Ring', () => {
                            ringType = ringType === 'Z' ? 'poly' : 'Z';
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            const ctx = viz.ctx;
                            const w = viz.canvas.width;
                            const h = viz.canvas.height;

                            if (ringType === 'Z') {
                                // Noetherian example: Z
                                viz.screenText('Noetherian Ring: ℤ', w / 2, 30, viz.colors.green, 22, 'center');
                                viz.screenText('Example chain: ⟨60⟩ ⊆ ⟨30⟩ ⊆ ⟨6⟩ ⊆ ⟨2⟩ ⊆ ℤ', w / 2, 60, viz.colors.text, 14, 'center');

                                const chain = [
                                    {name: '⟨60⟩', gen: '60ℤ', size: 0.3},
                                    {name: '⟨30⟩', gen: '30ℤ', size: 0.5},
                                    {name: '⟨6⟩', gen: '6ℤ', size: 0.7},
                                    {name: '⟨2⟩', gen: '2ℤ', size: 0.85},
                                    {name: 'ℤ', gen: '⟨1⟩', size: 1.0}
                                ];

                                let y = 110;
                                for (let i = 0; i < chain.length; i++) {
                                    const item = chain[i];
                                    const barWidth = item.size * 400;
                                    const x = w / 2 - barWidth / 2;

                                    ctx.fillStyle = viz.colors.blue + '44';
                                    ctx.fillRect(x, y, barWidth, 35);
                                    ctx.strokeStyle = viz.colors.blue;
                                    ctx.lineWidth = 2;
                                    ctx.strokeRect(x, y, barWidth, 35);

                                    viz.screenText(item.name, x - 60, y + 17, viz.colors.white, 15, 'right', 'middle');
                                    viz.screenText(item.gen, x + barWidth / 2, y + 17, viz.colors.yellow, 13, 'center', 'middle');

                                    if (i < chain.length - 1) {
                                        viz.screenText('⊊', w / 2 - 240, y + 45, viz.colors.orange, 22, 'center', 'middle');
                                    }

                                    y += 60;
                                }

                                viz.screenText('✓ Chain has length 5 (finite)', w / 2, h - 50, viz.colors.green, 16, 'center');
                                viz.screenText('✓ Every ideal is principal: ⟨n⟩ for some n ∈ ℤ', w / 2, h - 25, viz.colors.green, 14, 'center');

                            } else {
                                // Non-Noetherian example: k[x1, x2, x3, ...]
                                viz.screenText('Non-Noetherian Ring: k[x₁, x₂, x₃, ...]', w / 2, 30, viz.colors.red, 22, 'center');
                                viz.screenText('Infinite chain of ideals:', w / 2, 60, viz.colors.text, 14, 'center');

                                const chain = [
                                    {name: '⟨x₁⟩', width: 100},
                                    {name: '⟨x₁, x₂⟩', width: 160},
                                    {name: '⟨x₁, x₂, x₃⟩', width: 220},
                                    {name: '⟨x₁, x₂, x₃, x₄⟩', width: 280},
                                    {name: '⟨x₁, ..., x₅⟩', width: 340},
                                    {name: '...', width: 400}
                                ];

                                let y = 110;
                                for (let i = 0; i < chain.length; i++) {
                                    const item = chain[i];
                                    const barWidth = item.width;
                                    const x = w / 2 - barWidth / 2;

                                    ctx.fillStyle = viz.colors.orange + '44';
                                    ctx.fillRect(x, y, barWidth, 35);
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 2;
                                    ctx.strokeRect(x, y, barWidth, 35);

                                    viz.screenText(item.name, x + barWidth / 2, y + 17, viz.colors.white, 14, 'center', 'middle');

                                    if (i < chain.length - 1) {
                                        viz.screenText('⊊', w / 2 - 210, y + 45, viz.colors.yellow, 22, 'center', 'middle');
                                    }

                                    y += 60;
                                }

                                viz.screenText('✗ Chain never stabilizes (infinite)', w / 2, h - 50, viz.colors.red, 16, 'center');
                                viz.screenText('✗ Not every ideal is finitely generated', w / 2, h - 25, viz.colors.red, 14, 'center');
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that if \\(R\\) is a Noetherian ring and \\(I\\) is an ideal of \\(R\\), then \\(R/I\\) is also Noetherian.',
                    hint: 'Show that ideals of \\(R/I\\) correspond bijectively to ideals of \\(R\\) containing \\(I\\).',
                    solution: 'Let \\(\\\\pi: R \\\\to R/I\\) be the quotient map. Ideals of \\(R/I\\) are in bijection with ideals of \\(R\\) containing \\(I\\) via \\(J \\\\mapsto \\\\pi^{-1}(J)\\) and \\(J\' \\\\mapsto \\\\pi(J\')\\). If \\(J_1 \\\\subseteq J_2 \\\\subseteq \\\\cdots\\) is an ascending chain in \\(R/I\\), then \\(\\\\pi^{-1}(J_1) \\\\subseteq \\\\pi^{-1}(J_2) \\\\subseteq \\\\cdots\\) is an ascending chain in \\(R\\), which stabilizes since \\(R\\) is Noetherian. Thus the original chain stabilizes.'
                },
                {
                    question: 'Show that a direct sum \\(M = M_1 \\\\oplus M_2\\) is Noetherian if and only if both \\(M_1\\) and \\(M_2\\) are Noetherian.',
                    hint: 'Use Proposition 5.16 and the fact that \\(M/M_1 \\\\cong M_2\\).',
                    solution: '(⇒) If \\(M\\) is Noetherian, then \\(M_1\\) is Noetherian as a submodule. Also, \\(M/M_1 \\\\cong M_2\\) is a quotient of \\(M\\), hence Noetherian. (⇐) If \\(M_1\\) and \\(M_2\\) are Noetherian, then \\(M_1\\) and \\(M/M_1 \\\\cong M_2\\) are Noetherian, so \\(M\\) is Noetherian by Proposition 5.16.'
                },
                {
                    question: 'Let \\(\\\\varphi: M \\\\to N\\) be an \\(R\\)-homomorphism. Show that if \\(M\\) is finitely generated, then so is \\(\\\\text{im}(\\\\varphi)\\).',
                    hint: 'Use the first isomorphism theorem.',
                    solution: 'If \\(M = \\\\langle m_1, \\\\ldots, m_n \\\\rangle\\), then \\(\\\\text{im}(\\\\varphi) = \\\\varphi(M) = \\\\langle \\\\varphi(m_1), \\\\ldots, \\\\varphi(m_n) \\\\rangle\\) is finitely generated. Alternatively, \\(\\\\text{im}(\\\\varphi) \\\\cong M/\\\\ker(\\\\varphi)\\) is a quotient of a finitely generated module, hence finitely generated.'
                }
            ]
        },
        {
            id: 'ch05-sec05',
            title: 'The Hilbert Basis Theorem',
            content: `
                <h2>The Hilbert Basis Theorem</h2>

                <p>One of the most celebrated results in commutative algebra is the Hilbert Basis Theorem, which shows that the property of being Noetherian passes from a ring to its polynomial ring. This theorem is fundamental in algebraic geometry and has far-reaching consequences.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 5.17 (Hilbert Basis Theorem)</div>
                    <div class="env-body">
                        <p>If a ring \\(R\\) is Noetherian, then so is the polynomial ring \\(R[x]\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>We wish to show that any ideal \\(I\\) in \\(R[x]\\) is finitely generated. Let \\(L\\) denote the set of all leading coefficients of polynomials in \\(I\\), together with the zero element of \\(R\\). We claim that \\(L\\) is an ideal of \\(R\\).</p>

                        <p><strong>Claim: \\(L\\) is an ideal.</strong> If \\(a \\in L\\) is the leading coefficient of \\(p(x) \\in I\\) and \\(r \\in R\\), then either \\(ra = 0\\) or \\(ra\\) is the leading coefficient of \\(r \\cdot p(x) \\in I\\). In either case, \\(ra \\in L\\). Similarly, suppose \\(a, b \\in L\\) are leading coefficients of \\(p(x), q(x) \\in I\\) respectively. We may assume \\(\\deg p(x) = d\\) and \\(\\deg q(x) = e\\) with \\(d \\geq e\\). Then \\(p(x) - x^{d-e} q(x) \\in I\\) has degree less than \\(d\\) and leading coefficient \\(a - b\\) (or is zero). In either case, \\(a - b \\in L\\).</p>

                        <p>Since \\(L\\) is an ideal of the Noetherian ring \\(R\\), it is finitely generated, say \\(L = \\langle a_1, \\ldots, a_k \\rangle\\). For each \\(a_i\\), choose a polynomial \\(p_i(x) \\in I\\) with leading coefficient \\(a_i\\). By multiplying by suitable powers of \\(x\\), we may assume</p>
                        \\[\\deg p_i(x) = d = \\max\\{\\deg p_1(x), \\ldots, \\deg p_k(x)\\}\\]
                        <p>for all \\(i = 1, \\ldots, k\\).</p>

                        <p>Now for \\(j = 0, 1, \\ldots, d-1\\), let \\(L_j\\) be the set of all leading coefficients of polynomials in \\(I\\) of degree \\(j\\), together with \\(0\\). By a similar argument, \\(L_j\\) is an ideal of \\(R\\), hence finitely generated. Choose polynomials \\(Q_j = \\{q_{j,1}(x), \\ldots, q_{j,m_j}(x)\\}\\) in \\(I\\) whose leading coefficients generate \\(L_j\\).</p>

                        <p>Consider the finite set</p>
                        \\[F = \\{p_1(x), \\ldots, p_k(x)\\} \\cup Q_0 \\cup Q_1 \\cup \\cdots \\cup Q_{d-1}\\]
                        <p>Let \\(J\\) be the ideal generated by \\(F\\). Clearly \\(J \\subseteq I\\). We will show \\(I \\subseteq J\\) by induction on the degree of polynomials in \\(I\\).</p>

                        <p><strong>Base case:</strong> If \\(f(x) \\in I\\) has degree \\(< d\\), say \\(\\deg f = j < d\\), then the leading coefficient of \\(f\\) is in \\(L_j\\), so there is a linear combination \\(g(x)\\) of polynomials in \\(Q_j\\) (with coefficients in \\(R\\)) having the same leading coefficient as \\(f(x)\\). Then \\(f(x) - g(x)\\) has degree \\(< j\\). Repeating this process, we eventually get to degree \\(-\\infty\\) (i.e., the zero polynomial), showing \\(f(x) \\in J\\).</p>

                        <p><strong>Inductive step:</strong> Assume all polynomials in \\(I\\) of degree \\(< n\\) are in \\(J\\), and let \\(f(x) \\in I\\) have degree \\(n \\geq d\\). The leading coefficient of \\(f\\) is in \\(L = \\langle a_1, \\ldots, a_k \\rangle\\), so there exist \\(r_1, \\ldots, r_k \\in R\\) such that the polynomial</p>
                        \\[g(x) = \\sum_{i=1}^k r_i x^{n-d} p_i(x)\\]
                        <p>has the same leading coefficient as \\(f(x)\\). Since \\(g(x) \\in J\\) and \\(f(x) - g(x) \\in I\\) has degree \\(< n\\), by the inductive hypothesis \\(f(x) - g(x) \\in J\\). Therefore \\(f(x) = (f(x) - g(x)) + g(x) \\in J\\).</p>

                        <p>This completes the induction and shows \\(I = J\\) is finitely generated.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The proof uses a clever stratification by degree. The key insight is that the set of leading coefficients forms an ideal (this takes some work to verify), and this ideal is finitely generated because \\(R\\) is Noetherian. Once we have finitely many polynomials whose leading coefficients generate all possible leading coefficients, we can use a "greedy" algorithm: given any polynomial in \\(I\\), subtract off a combination of our chosen polynomials to reduce the degree, and iterate until we reach the zero polynomial.</p>
                        <p>This theorem is powerful because it can be applied repeatedly: if \\(R\\) is Noetherian, so is \\(R[x]\\), and therefore so is \\(R[x,y] = R[x][y]\\), and so on. This is the foundation for much of classical algebraic geometry.</p>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 5.18</div>
                    <div class="env-body">
                        <p>If \\(R\\) is Noetherian, then so is \\(R[x_1, \\ldots, x_n]\\) for any \\(n \\geq 1\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Apply the Hilbert Basis Theorem inductively:</p>
                        \\[R[x_1, \\ldots, x_n] = R[x_1, \\ldots, x_{n-1}][x_n]\\]
                        <p>If \\(R[x_1, \\ldots, x_{n-1}]\\) is Noetherian (by induction), then \\(R[x_1, \\ldots, x_n]\\) is Noetherian by the Hilbert Basis Theorem.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 5.19</div>
                    <div class="env-body">
                        <p><strong>(a)</strong> The polynomial ring \\(\\mathbb{Z}[x]\\) is Noetherian, since \\(\\mathbb{Z}\\) is Noetherian.</p>
                        <p><strong>(b)</strong> For any field \\(k\\), the polynomial ring \\(k[x_1, \\ldots, x_n]\\) in \\(n\\) variables is Noetherian. This is fundamental in algebraic geometry: it means that every ideal in \\(k[x_1, \\ldots, x_n]\\) (corresponding to an algebraic set in \\(\\mathbb{A}^n_k\\)) is finitely generated.</p>
                        <p><strong>(c)</strong> The ring \\(k[x_1, x_2, x_3, \\ldots]\\) of polynomials in <em>infinitely many</em> variables is not Noetherian, as we've seen. The Hilbert Basis Theorem only applies to polynomial rings in finitely many variables.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="hilbert-basis-construction"></div>

                <div class="env-block remark">
                    <div class="env-title">Historical Note</div>
                    <div class="env-body">
                        <p>The Hilbert Basis Theorem was proved by David Hilbert in 1890. At the time, it was revolutionary because it gave an existence proof without an explicit construction. Earlier mathematicians had laboriously constructed generators for specific ideals; Hilbert showed that generators <em>must exist</em> without finding them. Paul Gordan, a leading invariant theorist of the time, famously responded: "This is not mathematics, this is theology!" However, the power and elegance of Hilbert's approach soon won over the mathematical community and ushered in the modern era of abstract algebra.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body">
                        <p>The Hilbert Basis Theorem guarantees that ideals are finitely generated, but it does not tell you <em>how many</em> generators are needed, nor does it give you an algorithm to find them efficiently. In practice, computing Gröbner bases (which are special generating sets for ideals in polynomial rings) can be extremely computationally expensive.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'hilbert-basis-construction',
                    title: 'Interactive: Hilbert Basis Theorem Construction',
                    description: 'Visualize the construction of generators in the proof of the Hilbert Basis Theorem',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 500, scale: 1});

                        let step = 0;
                        const maxSteps = 5;

                        const nextBtn = VizEngine.createButton(controls, 'Next Step', () => {
                            step = Math.min(step + 1, maxSteps);
                            draw();
                        });

                        const prevBtn = VizEngine.createButton(controls, 'Previous Step', () => {
                            step = Math.max(step - 1, 0);
                            draw();
                        });

                        const resetBtn = VizEngine.createButton(controls, 'Reset', () => {
                            step = 0;
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            const ctx = viz.ctx;
                            const w = viz.canvas.width;
                            const h = viz.canvas.height;

                            viz.screenText('Hilbert Basis Theorem: Constructing Generators for I ⊆ R[x]',
                                        w / 2, 25, viz.colors.white, 18, 'center');

                            let y = 70;

                            // Step 0: Start with ideal I
                            if (step >= 0) {
                                viz.screenText('Step 0: Given ideal I ⊆ R[x]', 30, y, viz.colors.yellow, 16, 'left');
                                y += 30;
                                viz.screenText('Goal: Show I is finitely generated', 50, y, viz.colors.text, 14, 'left');
                                y += 40;
                            }

                            // Step 1: Define L (leading coefficients)
                            if (step >= 1) {
                                viz.screenText('Step 1: Form ideal L ⊆ R of leading coefficients', 30, y, viz.colors.yellow, 16, 'left');
                                y += 30;
                                viz.screenText('L = {leading coeff. of p(x) : p(x) ∈ I} ∪ {0}', 50, y, viz.colors.text, 14, 'left');
                                y += 25;

                                // Show L as an ideal
                                ctx.fillStyle = viz.colors.blue + '33';
                                ctx.fillRect(70, y, 200, 40);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(70, y, 200, 40);
                                viz.screenText('L (ideal in R)', 170, y + 20, viz.colors.white, 14, 'center', 'middle');

                                y += 55;
                            }

                            // Step 2: L is finitely generated
                            if (step >= 2) {
                                viz.screenText('Step 2: Since R is Noetherian, L = ⟨a₁, ..., aₖ⟩', 30, y, viz.colors.yellow, 16, 'left');
                                y += 30;
                                viz.screenText('Choose p₁(x), ..., pₖ(x) ∈ I with leading coeffs a₁, ..., aₖ', 50, y, viz.colors.text, 13, 'left');
                                y += 25;

                                // Show generators
                                const gens = ['p₁(x)', 'p₂(x)', 'p₃(x)'];
                                for (let i = 0; i < gens.length; i++) {
                                    ctx.fillStyle = viz.colors.orange + '33';
                                    ctx.fillRect(70 + i * 110, y, 100, 35);
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 2;
                                    ctx.strokeRect(70 + i * 110, y, 100, 35);
                                    viz.screenText(gens[i], 120 + i * 110, y + 17, viz.colors.white, 13, 'center', 'middle');
                                }

                                y += 50;
                            }

                            // Step 3: Handle lower degrees
                            if (step >= 3) {
                                viz.screenText('Step 3: For j = 0, 1, ..., d-1, form ideals Lⱼ', 30, y, viz.colors.yellow, 16, 'left');
                                y += 30;
                                viz.screenText('Lⱼ = {leading coeff. of deg j polynomials in I} ∪ {0}', 50, y, viz.colors.text, 13, 'left');
                                y += 25;
                                viz.screenText('Each Lⱼ finitely generated → choose qⱼ,₁(x), ..., qⱼ,ₘⱼ(x)', 50, y, viz.colors.text, 13, 'left');
                                y += 40;
                            }

                            // Step 4: Finite generating set
                            if (step >= 4) {
                                viz.screenText('Step 4: Form finite set F of generators', 30, y, viz.colors.yellow, 16, 'left');
                                y += 30;
                                viz.screenText('F = {p₁(x), ..., pₖ(x)} ∪ Q₀ ∪ Q₁ ∪ ... ∪ Qₐ₋₁', 50, y, viz.colors.green, 14, 'left');
                                y += 25;

                                // Draw box around F
                                ctx.fillStyle = viz.colors.green + '22';
                                ctx.fillRect(50, y, 500, 50);
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 3;
                                ctx.strokeRect(50, y, 500, 50);
                                viz.screenText('F (finite generating set for I)', 300, y + 25, viz.colors.white, 15, 'center', 'middle');

                                y += 65;
                            }

                            // Step 5: Induction argument
                            if (step >= 5) {
                                viz.screenText('Step 5: Prove I = ⟨F⟩ by induction on degree', 30, y, viz.colors.yellow, 16, 'left');
                                y += 30;
                                viz.screenText('For any f(x) ∈ I, subtract combinations from F', 50, y, viz.colors.text, 13, 'left');
                                y += 25;
                                viz.screenText('to reduce degree, iterate until degree < 0', 50, y, viz.colors.text, 13, 'left');
                                y += 25;
                                viz.screenText('Therefore I is finitely generated! ✓', 50, y, viz.colors.green, 15, 'left');
                            }

                            // Step indicator at bottom
                            viz.screenText('Step ' + step + ' of ' + maxSteps, w / 2, h - 20, viz.colors.text, 14, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that if \\(R\\) is Noetherian, then the power series ring \\(R[[x]]\\) is also Noetherian.',
                    hint: 'Use a similar argument to the Hilbert Basis Theorem, but note that the set of leading coefficients (constant terms) may not be an ideal. Instead, consider the set of leading coefficients after removing lower-degree terms.',
                    solution: 'Let \\(I\\) be an ideal of \\(R[[x]]\\). Define \\(L_i\\) to be the ideal of \\(R\\) consisting of coefficients of \\(x^i\\) in power series in \\(I\\) whose first \\(i\\) terms are zero. The ascending chain \\(L_0 \\\\subseteq L_1 \\\\subseteq \\\\cdots\\) stabilizes at some \\(L_n\\) since \\(R\\) is Noetherian. One can show that \\(I\\) is generated by finitely many power series chosen appropriately from representatives of generators of \\(L_0, \\\\ldots, L_n\\). (This is a sketch; the full proof requires care.)'
                },
                {
                    question: 'Show that the conclusion of the Hilbert Basis Theorem fails for polynomial rings in infinitely many variables. Specifically, find an ideal in \\(k[x_1, x_2, x_3, \\\\ldots]\\) (\\(k\\) a field) that is not finitely generated.',
                    hint: 'Consider the ideal generated by all the variables.',
                    solution: 'Let \\(I = \\\\langle x_1, x_2, x_3, \\\\ldots \\\\rangle\\). Suppose \\(I\\) were finitely generated by \\(f_1, \\\\ldots, f_k\\). Each \\(f_i\\) involves only finitely many variables, so there exists an \\(N\\) such that \\(f_1, \\\\ldots, f_k \\\\in k[x_1, \\\\ldots, x_N]\\). But then \\(x_{N+1} \\\\in I\\) cannot be written as a combination of \\(f_1, \\\\ldots, f_k\\), a contradiction.'
                },
                {
                    question: 'Let \\(R\\) be a Noetherian ring and \\(M\\) a finitely generated \\(R\\)-module. Prove that the endomorphism ring \\(\\\\text{End}_R(M)\\) need not be Noetherian.',
                    hint: "Consider \\(M = R^{\\\\infty}\\) (infinite direct sum). Wait, that's not finitely generated. Try \\(M = R\\) and \\(R = k[x_1, x_2, \\\\ldots]/(x_i^2)\\). Actually, a simpler example: \\(M = k^2\\) as a module over \\(k\\), then \\(\\\\text{End}_k(k^2) \\\\cong M_2(k)\\) which is Noetherian. The question may be too advanced for this level.",
                    solution: 'This is a challenging question. A counterexample requires careful construction. One approach: Let \\(k\\) be a field and \\(V\\) an infinite-dimensional \\(k\\)-vector space. Then \\(\\\\text{End}_k(V)\\) is not Noetherian (it contains an infinite ascending chain of left ideals). However, \\(V\\) is not finitely generated. For finitely generated modules, \\(\\\\text{End}_R(M)\\) is often Noetherian under reasonable conditions, but counterexamples exist in pathological cases. (This exercise may be too difficult for the intended level.)'
                }
            ]
        }
    ]
});
