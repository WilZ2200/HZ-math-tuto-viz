window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch14',
    number: 14,
    title: 'Tensor Products',
    subtitle: 'Universal Property, Multilinear Maps, and Tensor Algebras',
    sections: [
        {
            id: 'ch14-sec01',
            title: 'The Tensor Product and Universal Property',
            content: `
                <h2>The Tensor Product and Universal Property</h2>

                <p>The tensor product is one of the most powerful constructions in linear algebra, providing a bridge between bilinear maps and linear maps. Unlike direct sums, which capture "independent" combinations of vector spaces, tensor products capture "interactive" combinations. The construction appears throughout mathematics: in differential geometry (tensor fields), representation theory (tensor products of representations), and quantum mechanics (composite systems).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 14.1 (Bilinear Map)</div>
                    <div class="env-body">
                        <p>Let \\(V\\), \\(W\\), and \\(X\\) be vector spaces over a field \\(F\\). A function \\(f : V \\times W \\to X\\) is <strong>bilinear</strong> if it is linear in each argument separately:</p>
                        <ul>
                            <li>\\(f(av_1 + bv_2, w) = af(v_1, w) + bf(v_2, w)\\) for all \\(a, b \\in F\\), \\(v_1, v_2 \\in V\\), \\(w \\in W\\)</li>
                            <li>\\(f(v, aw_1 + bw_2) = af(v, w_1) + bf(v, w_2)\\) for all \\(a, b \\in F\\), \\(v \\in V\\), \\(w_1, w_2 \\in W\\)</li>
                        </ul>
                        <p>We denote the set of all bilinear maps from \\(V \\times W\\) to \\(X\\) by \\(\\operatorname{Bil}(V, W; X)\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 14.2 (Natural Bilinear Maps)</div>
                    <div class="env-body">
                        <p><strong>(a) Matrix multiplication:</strong> The map \\(M_{m \\times n}(F) \\times M_{n \\times p}(F) \\to M_{m \\times p}(F)\\) given by \\((A, B) \\mapsto AB\\) is bilinear.</p>

                        <p><strong>(b) Scalar multiplication:</strong> The map \\(F \\times V \\to V\\) given by \\((\\alpha, v) \\mapsto \\alpha v\\) is bilinear.</p>

                        <p><strong>(c) Evaluation:</strong> For a vector space \\(V\\), the map \\(V^* \\times V \\to F\\) given by \\((\\phi, v) \\mapsto \\phi(v)\\) is bilinear.</p>

                        <p><strong>(d) Determinant on columns:</strong> For \\(n = 2\\), the map \\(\\mathbb{R}^2 \\times \\mathbb{R}^2 \\to \\mathbb{R}\\) given by \\((v, w) \\mapsto \\det[v | w]\\) is bilinear.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 14.3 (Tensor Product - Universal Property)</div>
                    <div class="env-body">
                        <p>A <strong>tensor product</strong> of vector spaces \\(V\\) and \\(W\\) over \\(F\\) is a pair \\((V \\otimes W, \\tau)\\) where \\(V \\otimes W\\) is a vector space and \\(\\tau : V \\times W \\to V \\otimes W\\) is a bilinear map satisfying the following <strong>universal property</strong>:</p>

                        <p>For every vector space \\(X\\) and every bilinear map \\(f : V \\times W \\to X\\), there exists a <em>unique</em> linear map \\(\\bar{f} : V \\otimes W \\to X\\) such that the diagram commutes:</p>

                        <div style="text-align: center; margin: 20px 0;">
                            <div style="display: inline-block; text-align: left;">
                                \\(V \\times W \\xrightarrow{\\tau} V \\otimes W\\)<br>
                                \\(\\qquad \\searrow_{f} \\qquad \\downarrow_{\\bar{f}}\\)<br>
                                \\(\\qquad \\qquad \\quad X\\)
                            </div>
                        </div>

                        <p>That is, \\(f = \\bar{f} \\circ \\tau\\). We write \\(v \\otimes w\\) for \\(\\tau(v, w)\\) and call it a <strong>pure tensor</strong> or <strong>decomposable tensor</strong>.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: The Universal Property</div>
                    <div class="env-body">
                        <p>The universal property says that <em>the tensor product is the "most general" bilinear target</em>. Any bilinear map \\(f\\) from \\(V \\times W\\) factors uniquely through the tensor product. Think of it as a "linearization machine" that converts bilinear problems into linear ones:</p>
                        <ul>
                            <li><strong>Bilinearity on \\(V \\times W\\)</strong> is equivalent to <strong>linearity on \\(V \\otimes W\\)</strong></li>
                            <li>The tensor product "forgets" nothing about bilinear maps—it captures exactly what is needed and no more</li>
                            <li>The uniqueness ensures that \\(V \\otimes W\\) is determined up to unique isomorphism</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="universal-property-viz"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 14.4 (Uniqueness of Tensor Product)</div>
                    <div class="env-body">
                        <p>If \\((T_1, \\tau_1)\\) and \\((T_2, \\tau_2)\\) both satisfy the universal property for the tensor product of \\(V\\) and \\(W\\), then there exists a unique isomorphism \\(\\phi : T_1 \\to T_2\\) such that \\(\\phi \\circ \\tau_1 = \\tau_2\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Since \\(\\tau_2 : V \\times W \\to T_2\\) is bilinear and \\((T_1, \\tau_1)\\) has the universal property, there exists a unique linear map \\(\\phi : T_1 \\to T_2\\) with \\(\\phi \\circ \\tau_1 = \\tau_2\\).</p>

                        <p>Similarly, since \\(\\tau_1 : V \\times W \\to T_1\\) is bilinear and \\((T_2, \\tau_2)\\) has the universal property, there exists a unique linear map \\(\\psi : T_2 \\to T_1\\) with \\(\\psi \\circ \\tau_2 = \\tau_1\\).</p>

                        <p>Then \\(\\psi \\circ \\phi \\circ \\tau_1 = \\psi \\circ \\tau_2 = \\tau_1\\). But \\(\\operatorname{id}_{T_1} \\circ \\tau_1 = \\tau_1\\) as well. By uniqueness in the universal property applied to the bilinear map \\(\\tau_1\\), we have \\(\\psi \\circ \\phi = \\operatorname{id}_{T_1}\\). Similarly, \\(\\phi \\circ \\psi = \\operatorname{id}_{T_2}\\). Thus \\(\\phi\\) is an isomorphism.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 14.5 (Concrete Construction)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) and \\(W\\) be vector spaces over \\(F\\) with bases \\(\\mathcal{B}_V = \\{e_i : i \\in I\\}\\) and \\(\\mathcal{B}_W = \\{f_j : j \\in J\\}\\). Define \\(V \\otimes W\\) to be the vector space with basis</p>
                        \\[\\{e_i \\otimes f_j : i \\in I, j \\in J\\}\\]
                        <p>For general vectors \\(v = \\sum_i a_i e_i \\in V\\) and \\(w = \\sum_j b_j f_j \\in W\\), define</p>
                        \\[v \\otimes w = \\sum_{i,j} a_i b_j (e_i \\otimes f_j)\\]
                        <p>This makes \\(\\otimes : V \\times W \\to V \\otimes W\\) bilinear by construction.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 14.6 (Dimension Formula)</div>
                    <div class="env-body">
                        <p>If \\(V\\) and \\(W\\) are finite-dimensional vector spaces, then</p>
                        \\[\\dim(V \\otimes W) = \\dim(V) \\cdot \\dim(W)\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>If \\(\\{e_1, \\ldots, e_m\\}\\) is a basis for \\(V\\) and \\(\\{f_1, \\ldots, f_n\\}\\) is a basis for \\(W\\), then \\(\\{e_i \\otimes f_j : 1 \\le i \\le m, 1 \\le j \\le n\\}\\) is a basis for \\(V \\otimes W\\) with \\(mn\\) elements.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="tensor-dimension-viz"></div>
            `,
            visualizations: [
                {
                    id: 'universal-property-viz',
                    title: 'Interactive: Universal Property Factorization',
                    description: 'See how bilinear maps factor uniquely through the tensor product',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        let stage = 0; // 0: show f, 1: show tau, 2: show f-bar

                        const nextButton = VizEngine.createButton(controls, 'Next Step', () => {
                            stage = (stage + 1) % 3;
                            draw();
                        });

                        const resetButton = VizEngine.createButton(controls, 'Reset', () => {
                            stage = 0;
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            // Draw spaces as regions
                            const vwPos = [-4, 2];
                            const tensorPos = [0, 2];
                            const xPos = [2, -1];

                            // V x W box
                            viz.drawText('V × W', vwPos[0], vwPos[1] + 0.5, viz.colors.blue, 16, 'center');
                            viz.drawPolygon([
                                [vwPos[0] - 1, vwPos[1] - 0.5],
                                [vwPos[0] + 1, vwPos[1] - 0.5],
                                [vwPos[0] + 1, vwPos[1] + 0.5],
                                [vwPos[0] - 1, vwPos[1] + 0.5]
                            ], viz.colors.blue + '22', viz.colors.blue, 2);

                            // V ⊗ W box
                            viz.drawText('V ⊗ W', tensorPos[0], tensorPos[1] + 0.5, viz.colors.teal, 16, 'center');
                            viz.drawPolygon([
                                [tensorPos[0] - 1, tensorPos[1] - 0.5],
                                [tensorPos[0] + 1, tensorPos[1] - 0.5],
                                [tensorPos[0] + 1, tensorPos[1] + 0.5],
                                [tensorPos[0] - 1, tensorPos[1] + 0.5]
                            ], viz.colors.teal + '22', viz.colors.teal, 2);

                            // X box
                            viz.drawText('X', xPos[0], xPos[1] + 0.5, viz.colors.orange, 16, 'center');
                            viz.drawPolygon([
                                [xPos[0] - 1, xPos[1] - 0.5],
                                [xPos[0] + 1, xPos[1] - 0.5],
                                [xPos[0] + 1, xPos[1] + 0.5],
                                [xPos[0] - 1, xPos[1] + 0.5]
                            ], viz.colors.orange + '22', viz.colors.orange, 2);

                            // Stage 0: Show f (bilinear)
                            if (stage >= 0) {
                                viz.drawSegment(vwPos[0] + 0.8, vwPos[1] - 0.3, xPos[0] - 0.8, xPos[1] + 0.3,
                                    viz.colors.purple, 3, false);
                                viz.drawText('f (bilinear)', -1, -0.5, viz.colors.purple, 14, 'center');

                                // Draw sample point
                                viz.drawPoint(vwPos[0], vwPos[1] - 0.2, viz.colors.white, '(v,w)', 4);
                            }

                            // Stage 1: Show tau
                            if (stage >= 1) {
                                viz.drawSegment(vwPos[0] + 0.8, vwPos[1], tensorPos[0] - 0.8, tensorPos[1],
                                    viz.colors.green, 3, false);
                                viz.drawText('τ', -2, 2.5, viz.colors.green, 14, 'center');

                                viz.drawPoint(tensorPos[0], tensorPos[1] - 0.2, viz.colors.white, 'v⊗w', 4);
                            }

                            // Stage 2: Show f-bar (mediating morphism)
                            if (stage >= 2) {
                                viz.drawSegment(tensorPos[0] + 0.8, tensorPos[1] - 0.3, xPos[0] - 0.8, xPos[1] + 0.3,
                                    viz.colors.yellow, 3, false);
                                viz.drawText('f̄ (linear!)', 1, 0.2, viz.colors.yellow, 14, 'center');

                                viz.drawText('f = f̄ ∘ τ', 0, -3.5, viz.colors.white, 16, 'center');
                                viz.drawText('f̄ is UNIQUE', 0, -4, viz.colors.green, 14, 'center');
                            }

                            const messages = [
                                'Step 1: Given bilinear map f : V×W → X',
                                'Step 2: Universal tensor map τ : V×W → V⊗W',
                                'Step 3: Unique linear f̄ : V⊗W → X with f = f̄∘τ'
                            ];
                            viz.drawText(messages[stage], 0, 4, viz.colors.white, 13, 'center');
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'tensor-dimension-viz',
                    title: 'Interactive: Tensor Product Dimension Calculator',
                    description: 'See how dim(V⊗W) = dim(V)·dim(W) with basis visualization',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        let dimV = 2;
                        let dimW = 3;

                        const sliderV = VizEngine.createSlider(controls, 'dim(V)', 1, 4, dimV, 1, (val) => {
                            dimV = val;
                            draw();
                        });

                        const sliderW = VizEngine.createSlider(controls, 'dim(W)', 1, 4, dimW, 1, (val) => {
                            dimW = val;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const gridSpacing = 1.5;
                            const startX = -(dimW - 1) * gridSpacing / 2;
                            const startY = (dimV - 1) * gridSpacing / 2;

                            // Draw basis tensors e_i ⊗ f_j as a grid
                            let count = 0;
                            for (let i = 0; i < dimV; i++) {
                                for (let j = 0; j < dimW; j++) {
                                    const x = startX + j * gridSpacing;
                                    const y = startY - i * gridSpacing;

                                    viz.drawPoint(x, y, viz.colors.teal, null, 6);
                                    viz.drawText(`e${i+1}⊗f${j+1}`, x, y - 0.5, viz.colors.white, 11, 'center');
                                    count++;
                                }
                            }

                            // Draw V basis on left
                            for (let i = 0; i < dimV; i++) {
                                const y = startY - i * gridSpacing;
                                viz.drawText(`e${i+1}`, startX - 1.5, y, viz.colors.blue, 12, 'right');
                            }

                            // Draw W basis on bottom
                            for (let j = 0; j < dimW; j++) {
                                const x = startX + j * gridSpacing;
                                viz.drawText(`f${j+1}`, x, startY - dimV * gridSpacing + 0.5, viz.colors.orange, 12, 'center');
                            }

                            viz.drawText(`dim(V) = ${dimV}`, -5, 5.5, viz.colors.blue, 16, 'left');
                            viz.drawText(`dim(W) = ${dimW}`, -5, 5, viz.colors.orange, 16, 'left');
                            viz.drawText(`dim(V⊗W) = ${dimV}×${dimW} = ${dimV * dimW}`, -5, 4.5, viz.colors.teal, 16, 'left');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that the map \\(\\tau : V \\times W \\to V \\otimes W\\) given by \\(\\tau(v, w) = v \\otimes w\\) is bilinear.',
                    hint: 'Use the definition \\(v \\otimes w = \\sum_{i,j} a_i b_j (e_i \\otimes f_j)\\) where \\(v = \\sum a_i e_i\\) and \\(w = \\sum b_j f_j\\).',
                    solution: 'Let \\(v_1 = \\sum_i a_i e_i\\), \\(v_2 = \\sum_i a_i\' e_i\\), \\(w = \\sum_j b_j f_j\\). Then \\((\\alpha v_1 + \\beta v_2) \\otimes w = \\left(\\sum_i (\\alpha a_i + \\beta a_i\') e_i\\right) \\otimes w = \\sum_{i,j} (\\alpha a_i + \\beta a_i\')b_j (e_i \\otimes f_j) = \\alpha \\sum_{i,j} a_i b_j (e_i \\otimes f_j) + \\beta \\sum_{i,j} a_i\' b_j (e_i \\otimes f_j) = \\alpha(v_1 \\otimes w) + \\beta(v_2 \\otimes w)\\). Linearity in the second argument is similar.'
                },
                {
                    question: 'Show that \\(F \\otimes_F V \\cong V\\) as vector spaces over \\(F\\).',
                    hint: 'Define \\(\\phi : F \\otimes V \\to V\\) by \\(\\phi(\\alpha \\otimes v) = \\alpha v\\) and use the universal property.',
                    solution: 'The map \\(f : F \\times V \\to V\\) given by \\(f(\\alpha, v) = \\alpha v\\) is bilinear. By the universal property, there exists a unique linear map \\(\\phi : F \\otimes V \\to V\\) with \\(\\phi(\\alpha \\otimes v) = \\alpha v\\). Since \\(F \\otimes V\\) has basis \\(\\{1 \\otimes v_i\\}\\) where \\(\\{v_i\\}\\) is a basis for \\(V\\), and \\(\\phi(1 \\otimes v_i) = v_i\\), we see \\(\\phi\\) is an isomorphism.'
                },
                {
                    question: 'Prove that every element of \\(V \\otimes W\\) can be written as a finite sum \\(\\sum_{k=1}^n v_k \\otimes w_k\\). Show by example that a general element need not be a pure tensor \\(v \\otimes w\\).',
                    hint: 'Use the basis \\(\\{e_i \\otimes f_j\\}\\). For the example, consider \\(e_1 \\otimes f_1 + e_2 \\otimes f_2 \\in \\mathbb{R}^2 \\otimes \\mathbb{R}^2\\).',
                    solution: 'Every element of \\(V \\otimes W\\) is a linear combination of basis elements \\(e_i \\otimes f_j\\), so can be written \\(\\sum_{i,j} c_{ij}(e_i \\otimes f_j)\\), which is a sum of pure tensors. However, in \\(\\mathbb{R}^2 \\otimes \\mathbb{R}^2\\), the element \\(t = e_1 \\otimes f_1 + e_2 \\otimes f_2\\) is not pure. If \\(t = v \\otimes w\\) with \\(v = (a,b)\\) and \\(w = (c,d)\\), then \\(t = ac(e_1 \\otimes f_1) + ad(e_1 \\otimes f_2) + bc(e_2 \\otimes f_1) + bd(e_2 \\otimes f_2)\\). Comparing coefficients: \\(ac = 1\\), \\(ad = 0\\), \\(bc = 0\\), \\(bd = 1\\). From \\(ac=1\\), neither \\(a\\) nor \\(c\\) is zero. But then \\(ad = 0\\) implies \\(d = 0\\), contradicting \\(bd = 1\\).'
                }
            ]
        },
        {
            id: 'ch14-sec02',
            title: 'Properties and Functoriality of Tensor Products',
            content: `
                <h2>Properties and Functoriality of Tensor Products</h2>

                <p>The tensor product satisfies several fundamental algebraic properties that make it behave like a "multiplicative" operation on vector spaces (contrasting with the direct sum, which behaves like "addition").</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 14.7 (Fundamental Isomorphisms)</div>
                    <div class="env-body">
                        <p>For vector spaces \\(U, V, W\\) over \\(F\\), there are natural isomorphisms:</p>
                        <ol>
                            <li><strong>Commutativity:</strong> \\(V \\otimes W \\cong W \\otimes V\\) via \\(v \\otimes w \\mapsto w \\otimes v\\)</li>
                            <li><strong>Associativity:</strong> \\((U \\otimes V) \\otimes W \\cong U \\otimes (V \\otimes W)\\) via \\((u \\otimes v) \\otimes w \\mapsto u \\otimes (v \\otimes w)\\)</li>
                            <li><strong>Identity:</strong> \\(F \\otimes V \\cong V \\cong V \\otimes F\\) via \\(\\alpha \\otimes v \\mapsto \\alpha v\\)</li>
                            <li><strong>Distributivity over direct sum:</strong> \\(U \\otimes (V \\oplus W) \\cong (U \\otimes V) \\oplus (U \\otimes W)\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Commutativity)</div>
                    <div class="env-body">
                        <p>Define \\(\\sigma : V \\times W \\to W \\otimes V\\) by \\(\\sigma(v, w) = w \\otimes v\\). This is bilinear: \\(\\sigma(av_1 + v_2, w) = w \\otimes (av_1 + v_2) = a(w \\otimes v_1) + (w \\otimes v_2)\\), and similarly for the second variable.</p>

                        <p>By the universal property, there exists a unique linear map \\(\\bar{\\sigma} : V \\otimes W \\to W \\otimes V\\) with \\(\\bar{\\sigma}(v \\otimes w) = w \\otimes v\\). By symmetry, there is also \\(\\bar{\\sigma}^{-1} : W \\otimes V \\to V \\otimes W\\) with \\(\\bar{\\sigma}^{-1}(w \\otimes v) = v \\otimes w\\). These are mutual inverses since \\(\\bar{\\sigma}^{-1}(\\bar{\\sigma}(v \\otimes w)) = \\bar{\\sigma}^{-1}(w \\otimes v) = v \\otimes w\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 14.8 (Tensor Product of Linear Maps)</div>
                    <div class="env-body">
                        <p>Let \\(T : V \\to V'\\) and \\(S : W \\to W'\\) be linear maps. There exists a unique linear map</p>
                        \\[T \\otimes S : V \\otimes W \\to V' \\otimes W'\\]
                        <p>characterized by \\((T \\otimes S)(v \\otimes w) = T(v) \\otimes S(w)\\) for all \\(v \\in V, w \\in W\\).</p>

                        <p>Moreover:</p>
                        <ul>
                            <li>\\((T_2 \\otimes S_2) \\circ (T_1 \\otimes S_1) = (T_2 \\circ T_1) \\otimes (S_2 \\circ S_1)\\)</li>
                            <li>\\(\\operatorname{id}_V \\otimes \\operatorname{id}_W = \\operatorname{id}_{V \\otimes W}\\)</li>
                            <li>If \\(T\\) and \\(S\\) are isomorphisms, so is \\(T \\otimes S\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Define \\(f : V \\times W \\to V' \\otimes W'\\) by \\(f(v, w) = T(v) \\otimes S(w)\\). This is bilinear since</p>
                        \\[f(av_1 + v_2, w) = T(av_1 + v_2) \\otimes S(w) = (aT(v_1) + T(v_2)) \\otimes S(w)\\]
                        \\[= a(T(v_1) \\otimes S(w)) + (T(v_2) \\otimes S(w)) = af(v_1, w) + f(v_2, w)\\]
                        <p>By the universal property, there exists unique \\(T \\otimes S : V \\otimes W \\to V' \\otimes W'\\) with \\((T \\otimes S)(v \\otimes w) = T(v) \\otimes S(w)\\).</p>

                        <p>For composition: \\((T_2 \\otimes S_2)((T_1 \\otimes S_1)(v \\otimes w)) = (T_2 \\otimes S_2)(T_1(v) \\otimes S_1(w)) = T_2(T_1(v)) \\otimes S_2(S_1(w)) = (T_2 \\circ T_1)(v) \\otimes (S_2 \\circ S_1)(w)\\), so by uniqueness, \\((T_2 \\otimes S_2) \\circ (T_1 \\otimes S_1) = (T_2 \\circ T_1) \\otimes (S_2 \\circ S_1)\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="tensor-map-viz"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 14.9 (Tensor Product and Duality)</div>
                    <div class="env-body">
                        <p>For finite-dimensional vector spaces \\(V\\) and \\(W\\), there is a natural isomorphism</p>
                        \\[V^* \\otimes W^* \\cong (V \\otimes W)^*\\]
                        <p>given by \\((\\phi \\otimes \\psi)(v \\otimes w) = \\phi(v)\\psi(w)\\) for \\(\\phi \\in V^*\\), \\(\\psi \\in W^*\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>The map \\(V^* \\times W^* \\to (V \\otimes W)^*\\) given by \\((\\phi, \\psi) \\mapsto [v \\otimes w \\mapsto \\phi(v)\\psi(w)]\\) is bilinear, so induces a linear map \\(\\Phi : V^* \\otimes W^* \\to (V \\otimes W)^*\\).</p>

                        <p>To show \\(\\Phi\\) is an isomorphism, it suffices to check dimensions: \\(\\dim(V^* \\otimes W^*) = \\dim(V^*)\\dim(W^*) = (\\dim V)(\\dim W) = \\dim(V \\otimes W) = \\dim((V \\otimes W)^*)\\). Since \\(\\Phi\\) is injective on the basis \\(\\{e_i^* \\otimes f_j^*\\}\\) (where \\(\\{e_i\\}, \\{f_j\\}\\) are bases for \\(V, W\\)), it is an isomorphism.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 14.10 (Hom-Tensor Adjunction)</div>
                    <div class="env-body">
                        <p>For finite-dimensional vector spaces \\(U, V, W\\), there is a natural isomorphism</p>
                        \\[\\operatorname{Hom}(U \\otimes V, W) \\cong \\operatorname{Hom}(U, \\operatorname{Hom}(V, W))\\]
                        <p>In particular, taking \\(W = F\\),</p>
                        \\[(U \\otimes V)^* \\cong \\operatorname{Hom}(U, V^*)\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Currying and Uncurrying</div>
                    <div class="env-body">
                        <p>This theorem is the linear algebra version of "currying" in functional programming. A bilinear map \\(U \\times V \\to W\\) can be viewed in two equivalent ways:</p>
                        <ul>
                            <li><strong>Uncurried:</strong> A linear map \\(U \\otimes V \\to W\\)</li>
                            <li><strong>Curried:</strong> A linear map \\(U \\to \\operatorname{Hom}(V, W)\\) that takes \\(u \\in U\\) to a linear map \\(V \\to W\\)</li>
                        </ul>
                        <p>Example: Matrix multiplication \\(A \\cdot B\\) can be viewed as a linear map \\(M_{m \\times n} \\otimes M_{n \\times p} \\to M_{m \\times p}\\) or as \\(M_{m \\times n} \\to \\operatorname{Hom}(M_{n \\times p}, M_{m \\times p})\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="hom-tensor-viz"></div>
            `,
            visualizations: [
                {
                    id: 'tensor-map-viz',
                    title: 'Interactive: Tensor Product of Linear Maps',
                    description: 'Visualize how T⊗S acts on decomposable tensors',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 35});

                        let angle = Math.PI / 6;
                        let scale = 1.5;

                        const angleSlider = VizEngine.createSlider(controls, 'Rotation angle', 0, Math.PI, angle, 0.1, (val) => {
                            angle = val;
                            draw();
                        });

                        const scaleSlider = VizEngine.createSlider(controls, 'Scale factor', 0.5, 3, scale, 0.1, (val) => {
                            scale = val;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Original vectors v, w
                            const v = [2, 1];
                            const w = [1, 2];

                            // T is rotation, S is scaling
                            const T = [[Math.cos(angle), -Math.sin(angle)],
                                      [Math.sin(angle), Math.cos(angle)]];
                            const S = [[scale, 0], [0, scale]];

                            const Tv = VizEngine.matVec(T, v);
                            const Sw = VizEngine.matVec(S, w);

                            // Draw original
                            viz.drawVector(0, 0, v[0], v[1], viz.colors.blue, 'v', 2);
                            viz.drawVector(0, 0, w[0], w[1], viz.colors.orange, 'w', 2);
                            viz.drawPolygon([
                                [0, 0], v, [v[0] + w[0], v[1] + w[1]], w
                            ], viz.colors.purple + '22', viz.colors.purple + '88', 1);

                            // Draw transformed
                            viz.drawVector(0, 0, Tv[0], Tv[1], viz.colors.blue, 'T(v)', 3);
                            viz.drawVector(0, 0, Sw[0], Sw[1], viz.colors.orange, 'S(w)', 3);
                            viz.drawPolygon([
                                [0, 0], Tv, [Tv[0] + Sw[0], Tv[1] + Sw[1]], Sw
                            ], viz.colors.green + '33', viz.colors.green, 2);

                            viz.drawText('v ⊗ w', v[0] + w[0] + 0.5, v[1] + w[1] + 0.5, viz.colors.purple, 14);
                            viz.drawText('T(v) ⊗ S(w)', Tv[0] + Sw[0] + 0.5, Tv[1] + Sw[1] + 0.5, viz.colors.green, 14);

                            viz.drawText('(T⊗S)(v⊗w) = T(v)⊗S(w)', 0, -5, viz.colors.white, 15, 'center');
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'hom-tensor-viz',
                    title: 'Interactive: Hom-Tensor Adjunction',
                    description: 'Visualize the isomorphism Hom(U⊗V, W) ≅ Hom(U, Hom(V,W))',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        let viewMode = 0; // 0: uncurried, 1: curried

                        const toggleButton = VizEngine.createButton(controls, 'Toggle View', () => {
                            viewMode = 1 - viewMode;
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            if (viewMode === 0) {
                                // Uncurried view: show U⊗V → W
                                viz.drawText('Uncurried View', 0, 5, viz.colors.white, 18, 'center');

                                const uPos = [-3, 2];
                                const vPos = [-3, -1];
                                const tensorPos = [0, 0.5];
                                const wPos = [3, 0.5];

                                viz.drawText('U', uPos[0], uPos[1], viz.colors.blue, 14, 'center');
                                viz.drawText('V', vPos[0], vPos[1], viz.colors.orange, 14, 'center');
                                viz.drawText('U⊗V', tensorPos[0], tensorPos[1], viz.colors.teal, 16, 'center');
                                viz.drawText('W', wPos[0], wPos[1], viz.colors.purple, 16, 'center');

                                // Draw combining to tensor
                                viz.drawSegment(uPos[0] + 0.3, uPos[1] - 0.2, tensorPos[0] - 0.5, tensorPos[1] + 0.3,
                                    viz.colors.text, 2, true);
                                viz.drawSegment(vPos[0] + 0.3, vPos[1] + 0.2, tensorPos[0] - 0.5, tensorPos[1] - 0.3,
                                    viz.colors.text, 2, true);

                                // Draw map to W
                                viz.drawSegment(tensorPos[0] + 0.8, tensorPos[1], wPos[0] - 0.5, wPos[1],
                                    viz.colors.green, 3, false);
                                viz.drawText('f : U⊗V → W', 1.5, 1.5, viz.colors.green, 14, 'center');

                                viz.drawText('A linear map from the tensor product', 0, -3, viz.colors.text, 13, 'center');
                            } else {
                                // Curried view: show U → Hom(V,W)
                                viz.drawText('Curried View', 0, 5, viz.colors.white, 18, 'center');

                                const uPos = [-3, 0.5];
                                const homPos = [3, 0.5];

                                viz.drawText('U', uPos[0], uPos[1], viz.colors.blue, 16, 'center');
                                viz.drawText('Hom(V,W)', homPos[0], homPos[1] + 0.5, viz.colors.teal, 16, 'center');

                                // Draw map
                                viz.drawSegment(uPos[0] + 0.5, uPos[1], homPos[0] - 1.2, homPos[1],
                                    viz.colors.green, 3, false);
                                viz.drawText('f̃ : U → Hom(V,W)', 0, 1.5, viz.colors.green, 14, 'center');

                                // Show what Hom(V,W) means
                                viz.drawText('V', 2, -1, viz.colors.orange, 14, 'center');
                                viz.drawText('W', 4, -1, viz.colors.purple, 14, 'center');
                                viz.drawSegment(2.3, -1, 3.7, -1, viz.colors.yellow, 2, false);
                                viz.drawText('For each u∈U, get a map V→W', 0, -2.5, viz.colors.text, 13, 'center');
                                viz.drawText('f̃(u)(v) = f(u⊗v)', 0, -3, viz.colors.white, 14, 'center');
                            }

                            viz.drawText('These are the SAME data, different viewpoints!', 0, -4.5, viz.colors.yellow, 13, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove the associativity isomorphism: \\((U \\otimes V) \\otimes W \\cong U \\otimes (V \\otimes W)\\).',
                    hint: 'Define a trilinear map \\(U \\times V \\times W \\to U \\otimes (V \\otimes W)\\) and use the universal property twice.',
                    solution: 'Define \\(f : U \\times V \\times W \\to U \\otimes (V \\otimes W)\\) by \\(f(u, v, w) = u \\otimes (v \\otimes w)\\). For fixed \\(u\\), the map \\((v, w) \\mapsto v \\otimes w\\) is bilinear \\(V \\times W \\to V \\otimes W\\), and \\(v \\otimes w \\mapsto u \\otimes (v \\otimes w)\\) is linear, so \\(f(u, \\cdot, \\cdot)\\) is bilinear. Also, \\(f\\) is linear in \\(u\\). Thus \\(f\\) is trilinear. By the universal property for \\(V \\otimes W\\), there exists a bilinear map \\(g : U \\times (V \\otimes W) \\to U \\otimes (V \\otimes W)\\) with \\(g(u, v \\otimes w) = u \\otimes (v \\otimes w)\\). By the universal property for \\(U \\otimes (V \\otimes W)\\), there exists a linear map \\(\\phi : (U \\otimes V) \\otimes W \\to U \\otimes (V \\otimes W)\\) with \\(\\phi((u \\otimes v) \\otimes w) = u \\otimes (v \\otimes w)\\). By symmetry, there exists \\(\\psi\\) going the other way. They are mutual inverses.'
                },
                {
                    question: 'If \\(T : V \\to V\\) is a linear operator, show that \\(\\operatorname{tr}(T \\otimes \\operatorname{id}_W) = (\\dim W) \\cdot \\operatorname{tr}(T)\\).',
                    hint: 'Choose bases for \\(V\\) and \\(W\\), and compute the matrix of \\(T \\otimes \\operatorname{id}_W\\) with respect to the tensor product basis.',
                    solution: 'Let \\(\\{e_1, \\ldots, e_m\\}\\) be a basis for \\(V\\) and \\(\\{f_1, \\ldots, f_n\\}\\) a basis for \\(W\\). The basis for \\(V \\otimes W\\) is \\(\\{e_i \\otimes f_j : 1 \\le i \\le m, 1 \\le j \\le n\\}\\). We have \\((T \\otimes \\operatorname{id}_W)(e_i \\otimes f_j) = T(e_i) \\otimes f_j\\). If \\(T(e_i) = \\sum_k t_{ki} e_k\\), then \\((T \\otimes \\operatorname{id}_W)(e_i \\otimes f_j) = \\sum_k t_{ki}(e_k \\otimes f_j)\\). The diagonal entries of the matrix of \\(T \\otimes \\operatorname{id}_W\\) correspond to basis elements \\(e_i \\otimes f_j\\) mapped to themselves (with coefficient). For \\((i,j) = (i,j)\\), the coefficient is \\(t_{ii}\\). Summing over all \\(i, j\\): \\(\\operatorname{tr}(T \\otimes \\operatorname{id}_W) = \\sum_{i=1}^m \\sum_{j=1}^n t_{ii} = n \\sum_{i=1}^m t_{ii} = n \\cdot \\operatorname{tr}(T)\\).'
                },
                {
                    question: 'Show that if \\(V\\) is finite-dimensional, the map \\(\\operatorname{ev} : V^* \\otimes V \\to F\\) defined by \\(\\operatorname{ev}(\\phi \\otimes v) = \\phi(v)\\) is surjective, and describe its kernel.',
                    hint: 'Surjectivity is easy. For the kernel, consider what relations must hold among \\(\\sum_i \\phi_i \\otimes v_i\\).',
                    solution: 'Surjectivity: For any \\(\\alpha \\in F\\), choose any nonzero \\(v \\in V\\) and \\(\\phi \\in V^*\\) with \\(\\phi(v) = \\alpha\\). Then \\(\\operatorname{ev}(\\phi \\otimes v) = \\alpha\\). For the kernel: Let \\(\\{e_1, \\ldots, e_n\\}\\) be a basis for \\(V\\) and \\(\\{e_1^*, \\ldots, e_n^*\\}\\) the dual basis. Every element of \\(V^* \\otimes V\\) can be written \\(\\sum_{i,j} a_{ij}(e_i^* \\otimes e_j)\\). Then \\(\\operatorname{ev}(\\sum_{i,j} a_{ij}(e_i^* \\otimes e_j)) = \\sum_{i,j} a_{ij} e_i^*(e_j) = \\sum_{i,j} a_{ij} \\delta_{ij} = \\sum_i a_{ii} = \\operatorname{tr}(A)\\) where \\(A = (a_{ij})\\). Thus \\(\\ker(\\operatorname{ev})\\) consists of tensors corresponding to traceless matrices.'
                }
            ]
        },
        {
            id: 'ch14-sec03',
            title: 'Multilinear Maps and Iterated Tensor Products',
            content: `
                <h2>Multilinear Maps and Iterated Tensor Products</h2>

                <p>The universal property of the tensor product extends naturally to more than two vector spaces, connecting multilinear maps with linear maps on iterated tensor products.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 14.11 (Multilinear Map)</div>
                    <div class="env-body">
                        <p>Let \\(V_1, \\ldots, V_k, W\\) be vector spaces over \\(F\\). A function \\(f : V_1 \\times \\cdots \\times V_k \\to W\\) is <strong>\\(k\\)-multilinear</strong> (or simply <strong>multilinear</strong>) if it is linear in each variable separately:</p>
                        \\[f(v_1, \\ldots, av_i + v_i', \\ldots, v_k) = af(v_1, \\ldots, v_i, \\ldots, v_k) + f(v_1, \\ldots, v_i', \\ldots, v_k)\\]
                        <p>for all \\(1 \\le i \\le k\\), \\(a \\in F\\), and \\(v_i, v_i' \\in V_i\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 14.12 (Iterated Tensor Product)</div>
                    <div class="env-body">
                        <p>The <strong>tensor product</strong> of \\(k\\) vector spaces \\(V_1, \\ldots, V_k\\) is the vector space</p>
                        \\[V_1 \\otimes \\cdots \\otimes V_k\\]
                        <p>equipped with a multilinear map \\(\\tau : V_1 \\times \\cdots \\times V_k \\to V_1 \\otimes \\cdots \\otimes V_k\\) satisfying the universal property: for every multilinear map \\(f : V_1 \\times \\cdots \\times V_k \\to W\\), there exists a unique linear map \\(\\bar{f} : V_1 \\otimes \\cdots \\otimes V_k \\to W\\) such that \\(f = \\bar{f} \\circ \\tau\\).</p>

                        <p>We write \\(v_1 \\otimes \\cdots \\otimes v_k\\) for \\(\\tau(v_1, \\ldots, v_k)\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 14.13 (Universal Property for Multilinear Maps)</div>
                    <div class="env-body">
                        <p>There is a natural isomorphism</p>
                        \\[\\operatorname{Multilin}(V_1, \\ldots, V_k; W) \\cong \\operatorname{Hom}(V_1 \\otimes \\cdots \\otimes V_k, W)\\]
                        <p>where the left side denotes \\(k\\)-multilinear maps and the right side denotes linear maps. The correspondence sends \\(f\\) to its mediating morphism \\(\\bar{f}\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 14.14 (Determinant as Multilinear Form)</div>
                    <div class="env-body">
                        <p>The determinant \\(\\det : F^n \\times \\cdots \\times F^n \\to F\\) (\\(n\\) copies) is an \\(n\\)-multilinear alternating form. It factors through the \\(n\\)-fold tensor product:</p>
                        \\[\\det : F^n \\otimes \\cdots \\otimes F^n \\to F\\]
                        <p>However, \\(\\det(v_1, \\ldots, v_i, \\ldots, v_j, \\ldots, v_n) = -\\det(v_1, \\ldots, v_j, \\ldots, v_i, \\ldots, v_n)\\) (antisymmetry), so the determinant actually factors through a quotient of the tensor product called the <em>exterior product</em> (see next section).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 14.15 (Tensor Spaces)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be a vector space over \\(F\\). For nonnegative integers \\(r\\) and \\(s\\), the <strong>space of tensors of type \\((r, s)\\)</strong> is</p>
                        \\[T^r_s(V) = \\underbrace{V \\otimes \\cdots \\otimes V}_{r \\text{ times}} \\otimes \\underbrace{V^* \\otimes \\cdots \\otimes V^*}_{s \\text{ times}}\\]
                        <p>Elements of \\(T^r_s(V)\\) are called <strong>tensors of type \\((r,s)\\)</strong>, with \\(r\\) <strong>contravariant</strong> indices and \\(s\\) <strong>covariant</strong> indices.</p>

                        <ul>
                            <li>\\(T^r_0(V) = V^{\\otimes r}\\) are <strong>contravariant tensors</strong></li>
                            <li>\\(T^0_s(V) = (V^*)^{\\otimes s}\\) are <strong>covariant tensors</strong></li>
                            <li>\\(T^0_0(V) = F\\) (scalars)</li>
                            <li>\\(T^1_0(V) = V\\) (vectors)</li>
                            <li>\\(T^0_1(V) = V^*\\) (covectors/dual vectors)</li>
                        </ul>

                        <p>If \\(\\dim V = n\\), then \\(\\dim(T^r_s(V)) = n^{r+s}\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Tensors in Physics and Geometry</div>
                    <div class="env-body">
                        <p>In differential geometry and physics, tensors generalize scalars, vectors, and matrices:</p>
                        <ul>
                            <li><strong>Type (0,0):</strong> Scalars (temperature, mass) — unchanged under coordinate transformations</li>
                            <li><strong>Type (1,0):</strong> Contravariant vectors (velocity, displacement) — transform like \\(\\partial/\\partial x^i\\)</li>
                            <li><strong>Type (0,1):</strong> Covariant vectors (gradients, 1-forms) — transform like \\(dx^i\\)</li>
                            <li><strong>Type (0,2):</strong> Bilinear forms (metric tensor \\(g_{ij}\\), inner products)</li>
                            <li><strong>Type (1,1):</strong> Linear operators (represented as \\(T^i_j\\))</li>
                            <li><strong>Type (2,0):</strong> Bivectors (infinitesimal area elements)</li>
                        </ul>
                        <p>The distinction between contravariant and covariant is crucial for understanding how tensors transform under coordinate changes.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="multilinear-viz"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition 14.16 (Contraction)</div>
                    <div class="env-body">
                        <p>For a tensor of type \\((r, s)\\) with \\(r, s \\ge 1\\), <strong>contraction</strong> in a contravariant index \\(i\\) and a covariant index \\(j\\) is the operation that produces a tensor of type \\((r-1, s-1)\\) by "pairing" those indices using the natural pairing \\(V \\times V^* \\to F\\).</p>

                        <p>Concretely, if \\(T \\in V \\otimes V^*\\), the contraction is</p>
                        \\[C(T) = \\operatorname{ev}(T) \\in F\\]
                        <p>where \\(\\operatorname{ev}(v \\otimes \\phi) = \\phi(v)\\).</p>

                        <p>For a tensor \\(T \\in V \\otimes V \\otimes V^* \\otimes V^*\\), contracting the first contravariant index with the first covariant index gives an element of \\(V \\otimes V^*\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 14.17 (Trace as Contraction)</div>
                    <div class="env-body">
                        <p>A linear operator \\(T : V \\to V\\) can be viewed as an element of \\(V \\otimes V^*\\) (type (1,1)). The trace of \\(T\\) is exactly the contraction:</p>
                        \\[\\operatorname{tr}(T) = C(T)\\]
                        <p>In coordinates, if \\(T\\) has matrix \\((T^i_j)\\), then \\(\\operatorname{tr}(T) = \\sum_i T^i_i\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'multilinear-viz',
                    title: 'Interactive: Multilinear Map Factorization',
                    description: 'Visualize how 3-linear maps factor through the 3-fold tensor product',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        let showFactorization = false;

                        const toggleButton = VizEngine.createButton(controls, 'Show Factorization', () => {
                            showFactorization = !showFactorization;
                            toggleButton.textContent = showFactorization ? 'Hide Factorization' : 'Show Factorization';
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            // Three input spaces
                            const v1Pos = [-5, 2];
                            const v2Pos = [-5, 0];
                            const v3Pos = [-5, -2];
                            const targetPos = [4, 0];

                            viz.drawText('V₁', v1Pos[0], v1Pos[1], viz.colors.blue, 14, 'center');
                            viz.drawText('V₂', v2Pos[0], v2Pos[1], viz.colors.orange, 14, 'center');
                            viz.drawText('V₃', v3Pos[0], v3Pos[1], viz.colors.teal, 14, 'center');
                            viz.drawText('W', targetPos[0], targetPos[1], viz.colors.purple, 16, 'center');

                            if (!showFactorization) {
                                // Direct multilinear map
                                viz.drawText('V₁ × V₂ × V₃', -5, 0.5, viz.colors.white, 13, 'center');

                                // Curved arrow to W
                                const controlX = 0;
                                const controlY = -3;
                                viz.ctx.beginPath();
                                viz.ctx.strokeStyle = viz.colors.green;
                                viz.ctx.lineWidth = 3;
                                const start = viz.toScreen(-4, 0);
                                const end = viz.toScreen(3.5, 0);
                                const control = viz.toScreen(controlX, controlY);
                                viz.ctx.moveTo(start[0], start[1]);
                                viz.ctx.quadraticCurveTo(control[0], control[1], end[0], end[1]);
                                viz.ctx.stroke();

                                viz.drawText('f : V₁×V₂×V₃ → W', 0, -3.5, viz.colors.green, 14, 'center');
                                viz.drawText('(multilinear)', 0, -4, viz.colors.green, 12, 'center');
                            } else {
                                // Show tensor product
                                const tensorPos = [0, 0];
                                viz.drawText('V₁⊗V₂⊗V₃', tensorPos[0], tensorPos[1] + 0.5, viz.colors.yellow, 16, 'center');
                                viz.drawPolygon([
                                    [tensorPos[0] - 1.5, tensorPos[1] - 0.5],
                                    [tensorPos[0] + 1.5, tensorPos[1] - 0.5],
                                    [tensorPos[0] + 1.5, tensorPos[1] + 0.5],
                                    [tensorPos[0] - 1.5, tensorPos[1] + 0.5]
                                ], viz.colors.yellow + '22', viz.colors.yellow, 2);

                                // Arrows to tensor product
                                viz.drawSegment(v1Pos[0] + 0.5, v1Pos[1], tensorPos[0] - 1.3, tensorPos[1] + 0.3,
                                    viz.colors.text, 2, true);
                                viz.drawSegment(v2Pos[0] + 0.5, v2Pos[1], tensorPos[0] - 1.3, tensorPos[1],
                                    viz.colors.text, 2, true);
                                viz.drawSegment(v3Pos[0] + 0.5, v3Pos[1], tensorPos[0] - 1.3, tensorPos[1] - 0.3,
                                    viz.colors.text, 2, true);

                                viz.drawText('τ', -2, 0, viz.colors.text, 12, 'center');

                                // Linear map from tensor product to W
                                viz.drawSegment(tensorPos[0] + 1.5, tensorPos[1], targetPos[0] - 0.5, targetPos[1],
                                    viz.colors.green, 3, false);
                                viz.drawText('f̄ (linear!)', 2.5, 0.5, viz.colors.green, 14, 'center');

                                viz.drawText('f = f̄ ∘ τ', 0, -3, viz.colors.white, 15, 'center');
                                viz.drawText('Multilinear ↔ Linear on tensor product', 0, -4, viz.colors.yellow, 13, 'center');
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the determinant \\(\\det : F^n \\times \\cdots \\times F^n \\to F\\) is \\(n\\)-multilinear.',
                    hint: 'Use the column expansion of the determinant and linearity in each column.',
                    solution: 'Write \\(\\det(v_1, \\ldots, v_n)\\) where \\(v_i\\) are the columns. For the \\(i\\)th column, \\(\\det(v_1, \\ldots, av_i + v_i\', \\ldots, v_n)\\). By the column expansion formula, \\(\\det\\) is a linear combination of products of entries, and the entries from column \\(i\\) appear linearly in each term. Thus \\(\\det(v_1, \\ldots, av_i + v_i\', \\ldots, v_n) = a\\det(v_1, \\ldots, v_i, \\ldots, v_n) + \\det(v_1, \\ldots, v_i\', \\ldots, v_n)\\).'
                },
                {
                    question: 'Compute \\(\\dim(T^2_1(\\mathbb{R}^3))\\) and give a geometric interpretation of elements in this space.',
                    hint: 'Use the dimension formula. Elements can be viewed as multilinear maps \\((\\mathbb{R}^3)^* \\times (\\mathbb{R}^3)^* \\times \\mathbb{R}^3 \\to \\mathbb{R}\\).',
                    solution: '\\(\\dim(T^2_1(\\mathbb{R}^3)) = (\\dim \\mathbb{R}^3)^{2+1} = 3^3 = 27\\). An element \\(T \\in T^2_1(\\mathbb{R}^3)\\) can be represented by a \\(3 \\times 3 \\times 3\\) array of coefficients \\(T^{ij}_k\\). Geometrically, \\(T\\) takes two covectors (linear functionals) and one vector, producing a scalar. Alternatively, fixing the covectors gives a vector, or fixing the vector gives a bilinear form on \\((\\mathbb{R}^3)^*\\).'
                },
                {
                    question: 'Prove that for a tensor \\(T = \\sum_{i=1}^n e_i \\otimes e_i^* \\in V \\otimes V^*\\) (where \\(\\{e_i\\}\\) is a basis and \\(\\{e_i^*\\}\\) is the dual basis), the contraction \\(C(T) = n\\).',
                    hint: 'Use the definition of contraction: \\(C(v \\otimes \\phi) = \\phi(v)\\).',
                    solution: 'By linearity of contraction, \\(C(T) = C\\left(\\sum_{i=1}^n e_i \\otimes e_i^*\\right) = \\sum_{i=1}^n C(e_i \\otimes e_i^*) = \\sum_{i=1}^n e_i^*(e_i) = \\sum_{i=1}^n 1 = n\\).'
                }
            ]
        },
        {
            id: 'ch14-sec04',
            title: 'Symmetric and Exterior Algebras',
            content: `
                <h2>Symmetric and Exterior Algebras</h2>

                <p>While the tensor product \\(V \\otimes V\\) treats vectors symmetrically in the sense that \\(v \\otimes w\\) and \\(w \\otimes v\\) are distinct, many applications require us to impose symmetry or antisymmetry relations. This leads to quotients of the tensor algebra: the <strong>symmetric algebra</strong> and the <strong>exterior algebra</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 14.18 (Symmetric Tensor)</div>
                    <div class="env-body">
                        <p>The <strong>symmetric product</strong> of \\(v, w \\in V\\) is the element of the quotient space</p>
                        \\[S^2(V) = V \\otimes V / I_{\\text{sym}}\\]
                        <p>where \\(I_{\\text{sym}}\\) is the subspace generated by all elements of the form \\(v \\otimes w - w \\otimes v\\). We denote the image of \\(v \\otimes w\\) in \\(S^2(V)\\) by \\(v \\odot w\\) or \\(vw\\).</p>

                        <p>By construction, \\(v \\odot w = w \\odot v\\) in \\(S^2(V)\\).</p>

                        <p>More generally, the <strong>\\(k\\)th symmetric power</strong> is</p>
                        \\[S^k(V) = V^{\\otimes k} / I_k\\]
                        <p>where \\(I_k\\) is generated by \\(v_1 \\otimes \\cdots \\otimes v_k - v_{\\sigma(1)} \\otimes \\cdots \\otimes v_{\\sigma(k)}\\) for all permutations \\(\\sigma\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 14.19 (Exterior Product)</div>
                    <div class="env-body">
                        <p>The <strong>exterior product</strong> (or <strong>wedge product</strong>) of \\(v, w \\in V\\) is the element of the quotient space</p>
                        \\[\\Lambda^2(V) = V \\otimes V / I_{\\text{alt}}\\]
                        <p>where \\(I_{\\text{alt}}\\) is the subspace generated by all elements of the form \\(v \\otimes v\\) for \\(v \\in V\\). We denote the image of \\(v \\otimes w\\) in \\(\\Lambda^2(V)\\) by \\(v \\wedge w\\).</p>

                        <p>Key properties:</p>
                        <ul>
                            <li>\\(v \\wedge w = -w \\wedge v\\) (antisymmetry)</li>
                            <li>\\(v \\wedge v = 0\\) for all \\(v \\in V\\)</li>
                        </ul>

                        <p>More generally, the <strong>\\(k\\)th exterior power</strong> is</p>
                        \\[\\Lambda^k(V) = V^{\\otimes k} / J_k\\]
                        <p>where \\(J_k\\) is generated by \\(v_1 \\otimes \\cdots \\otimes v_k\\) whenever \\(v_i = v_j\\) for some \\(i \\ne j\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 14.20 (Dimension Formulas)</div>
                    <div class="env-body">
                        <p>If \\(\\dim V = n\\), then:</p>
                        <ol>
                            <li>\\(\\displaystyle \\dim S^k(V) = \\binom{n + k - 1}{k}\\) (the number of ways to choose \\(k\\) elements from \\(n\\) with repetition)</li>
                            <li>\\(\\displaystyle \\dim \\Lambda^k(V) = \\binom{n}{k}\\) (the number of ways to choose \\(k\\) elements from \\(n\\) without repetition)</li>
                        </ol>

                        <p>In particular:</p>
                        <ul>
                            <li>\\(\\dim \\Lambda^0(V) = 1\\), \\(\\dim \\Lambda^1(V) = n\\), \\(\\dim \\Lambda^2(V) = \\frac{n(n-1)}{2}\\)</li>
                            <li>\\(\\Lambda^k(V) = 0\\) if \\(k > n\\)</li>
                            <li>\\(\\dim \\Lambda^n(V) = 1\\) (the "top exterior power")</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Exterior Power)</div>
                    <div class="env-body">
                        <p>Let \\(\\{e_1, \\ldots, e_n\\}\\) be a basis for \\(V\\). Every element of \\(\\Lambda^k(V)\\) can be written as a linear combination of \\(e_{i_1} \\wedge \\cdots \\wedge e_{i_k}\\). Since \\(e_i \\wedge e_i = 0\\) and \\(e_i \\wedge e_j = -e_j \\wedge e_i\\), the only nonzero basis elements are those with \\(i_1 < i_2 < \\cdots < i_k\\) (strictly increasing indices). There are exactly \\(\\binom{n}{k}\\) such ordered \\(k\\)-tuples.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="exterior-viz"></div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Geometry of Exterior Products</div>
                    <div class="env-body">
                        <p>The exterior product has a beautiful geometric interpretation:</p>
                        <ul>
                            <li><strong>\\(v \\wedge w \\in \\Lambda^2(V)\\):</strong> Represents an <em>oriented parallelogram</em> spanned by \\(v\\) and \\(w\\). The magnitude \\(\\|v \\wedge w\\|\\) is the area, and the sign encodes orientation.</li>
                            <li><strong>\\(v_1 \\wedge v_2 \\wedge v_3 \\in \\Lambda^3(V)\\):</strong> Represents an <em>oriented parallelepiped</em> (3D volume element).</li>
                            <li><strong>\\(v_1 \\wedge \\cdots \\wedge v_n \\in \\Lambda^n(\\mathbb{R}^n)\\):</strong> Represents an \\(n\\)-dimensional oriented volume. Since \\(\\dim \\Lambda^n(\\mathbb{R}^n) = 1\\), this is essentially a scalar (the determinant!).</li>
                        </ul>
                        <p>In fact, for \\(v_1, \\ldots, v_n \\in \\mathbb{R}^n\\),</p>
                        \\[v_1 \\wedge \\cdots \\wedge v_n = \\det(v_1, \\ldots, v_n) \\cdot (e_1 \\wedge \\cdots \\wedge e_n)\\]
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 14.21 (Exterior Product in \\(\\mathbb{R}^3\\))</div>
                    <div class="env-body">
                        <p>In \\(\\mathbb{R}^3\\) with standard basis \\(\\{e_1, e_2, e_3\\}\\), the space \\(\\Lambda^2(\\mathbb{R}^3)\\) has dimension 3 with basis</p>
                        \\[\\{e_1 \\wedge e_2, \\, e_1 \\wedge e_3, \\, e_2 \\wedge e_3\\}\\]

                        <p>For \\(v = (v_1, v_2, v_3)\\) and \\(w = (w_1, w_2, w_3)\\),</p>
                        \\[v \\wedge w = (v_2w_3 - v_3w_2)(e_2 \\wedge e_3) + (v_3w_1 - v_1w_3)(e_3 \\wedge e_1) + (v_1w_2 - v_2w_1)(e_1 \\wedge e_2)\\]

                        <p>The coefficients are exactly the components of the cross product \\(v \\times w\\)! The exterior product generalizes the cross product to arbitrary dimensions.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 14.22 (Exterior Algebra)</div>
                    <div class="env-body">
                        <p>The <strong>exterior algebra</strong> (or <strong>Grassmann algebra</strong>) of \\(V\\) is the direct sum</p>
                        \\[\\Lambda(V) = \\bigoplus_{k=0}^{\\dim V} \\Lambda^k(V)\\]
                        <p>with the wedge product \\(\\wedge : \\Lambda^k(V) \\times \\Lambda^\\ell(V) \\to \\Lambda^{k+\\ell}(V)\\) making it a graded algebra.</p>

                        <p>If \\(\\dim V = n\\), then \\(\\dim \\Lambda(V) = 2^n\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 14.23 (Symmetric Algebra)</div>
                    <div class="env-body">
                        <p>The <strong>symmetric algebra</strong> of \\(V\\) is</p>
                        \\[S(V) = \\bigoplus_{k=0}^{\\infty} S^k(V)\\]
                        <p>with the symmetric product \\(\\odot : S^k(V) \\times S^\\ell(V) \\to S^{k+\\ell}(V)\\). This is a graded commutative algebra isomorphic to the polynomial ring in \\(n = \\dim V\\) variables:</p>
                        \\[S(V) \\cong F[x_1, \\ldots, x_n]\\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="sym-vs-ext-viz"></div>
            `,
            visualizations: [
                {
                    id: 'exterior-viz',
                    title: 'Interactive: Exterior Product as Oriented Area',
                    description: 'Drag vectors to see v∧w as an oriented parallelogram area',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 45});

                        const v = viz.addDraggable('v', 3, 1, viz.colors.blue, 8, () => draw());
                        const w = viz.addDraggable('w', 1, 2.5, viz.colors.orange, 8, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Compute exterior product (oriented area)
                            const area = v.x * w.y - v.y * w.x;

                            // Draw parallelogram
                            const color = area >= 0 ? viz.colors.green : viz.colors.red;
                            viz.drawPolygon([
                                [0, 0],
                                [v.x, v.y],
                                [v.x + w.x, v.y + w.y],
                                [w.x, w.y]
                            ], color + '33', color, 2);

                            // Draw vectors
                            viz.drawVector(0, 0, v.x, v.y, viz.colors.blue, 'v', 3);
                            viz.drawVector(0, 0, w.x, w.y, viz.colors.orange, 'w', 3);
                            viz.drawDraggables();

                            // Display information
                            viz.drawText(`v ∧ w (oriented area)`, 0, 5.5, viz.colors.white, 16, 'center');
                            viz.drawText(`Area = ${Math.abs(area).toFixed(2)}`, 0, -5.5, viz.colors.white, 15, 'center');
                            viz.drawText(`Orientation: ${area >= 0 ? 'CCW (+)' : 'CW (−)'}`, 0, -6.2, color, 14, 'center');

                            // Show v∧w = -w∧v
                            viz.drawText('v∧w = −w∧v', -6, 5, viz.colors.yellow, 13, 'left');
                            viz.drawText('v∧v = 0', -6, 4.5, viz.colors.yellow, 13, 'left');
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'sym-vs-ext-viz',
                    title: 'Interactive: Symmetric vs Exterior Products',
                    description: 'Compare the dimensions and properties of symmetric and exterior powers',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        let n = 3;
                        let k = 2;

                        const sliderN = VizEngine.createSlider(controls, 'dim(V) = n', 1, 6, n, 1, (val) => {
                            n = val;
                            k = Math.min(k, n);
                            sliderK.max = n;
                            sliderK.value = k;
                            draw();
                        });

                        const sliderK = VizEngine.createSlider(controls, 'k (power)', 0, n, k, 1, (val) => {
                            k = val;
                            draw();
                        });

                        function binomial(n, k) {
                            if (k > n || k < 0) return 0;
                            if (k === 0 || k === n) return 1;
                            let result = 1;
                            for (let i = 0; i < k; i++) {
                                result *= (n - i);
                                result /= (i + 1);
                            }
                            return Math.round(result);
                        }

                        function symDim(n, k) {
                            return binomial(n + k - 1, k);
                        }

                        function draw() {
                            viz.clear();

                            const dimExt = binomial(n, k);
                            const dimSym = symDim(n, k);
                            const dimTensor = Math.pow(n, k);

                            // Draw bars
                            const barWidth = 1.5;
                            const spacing = 2.5;
                            const maxHeight = 5;
                            const maxDim = Math.max(dimExt, dimSym, dimTensor);

                            const scale = maxDim > 0 ? maxHeight / maxDim : 1;

                            const extX = -3;
                            const symX = 0;
                            const tensorX = 3;

                            // Exterior bar
                            if (dimExt > 0) {
                                const h = dimExt * scale;
                                viz.drawPolygon([
                                    [extX - barWidth/2, 0],
                                    [extX + barWidth/2, 0],
                                    [extX + barWidth/2, h],
                                    [extX - barWidth/2, h]
                                ], viz.colors.blue + '66', viz.colors.blue, 2);
                                viz.drawText(dimExt.toString(), extX, h + 0.5, viz.colors.blue, 14, 'center');
                            }
                            viz.drawText('Λᵏ(V)', extX, -1, viz.colors.blue, 15, 'center');
                            viz.drawText('Exterior', extX, -1.5, viz.colors.blue, 12, 'center');

                            // Symmetric bar
                            if (dimSym > 0) {
                                const h = dimSym * scale;
                                viz.drawPolygon([
                                    [symX - barWidth/2, 0],
                                    [symX + barWidth/2, 0],
                                    [symX + barWidth/2, h],
                                    [symX - barWidth/2, h]
                                ], viz.colors.green + '66', viz.colors.green, 2);
                                viz.drawText(dimSym.toString(), symX, h + 0.5, viz.colors.green, 14, 'center');
                            }
                            viz.drawText('Sᵏ(V)', symX, -1, viz.colors.green, 15, 'center');
                            viz.drawText('Symmetric', symX, -1.5, viz.colors.green, 12, 'center');

                            // Tensor bar
                            if (dimTensor > 0) {
                                const h = dimTensor * scale;
                                viz.drawPolygon([
                                    [tensorX - barWidth/2, 0],
                                    [tensorX + barWidth/2, 0],
                                    [tensorX + barWidth/2, h],
                                    [tensorX - barWidth/2, h]
                                ], viz.colors.orange + '66', viz.colors.orange, 2);
                                viz.drawText(dimTensor.toString(), tensorX, h + 0.5, viz.colors.orange, 14, 'center');
                            }
                            viz.drawText('V⊗ᵏ', tensorX, -1, viz.colors.orange, 15, 'center');
                            viz.drawText('Tensor', tensorX, -1.5, viz.colors.orange, 12, 'center');

                            // Draw baseline
                            viz.drawSegment(-5, 0, 5, 0, viz.colors.text, 2, false);

                            // Info text
                            viz.drawText(`n = ${n}, k = ${k}`, 0, 6.5, viz.colors.white, 16, 'center');
                            viz.drawText(`dim Λᵏ(V) = C(${n},${k}) = ${dimExt}`, 0, -3, viz.colors.blue, 13, 'center');
                            viz.drawText(`dim Sᵏ(V) = C(${n}+${k}−1,${k}) = ${dimSym}`, 0, -3.5, viz.colors.green, 13, 'center');
                            viz.drawText(`dim V⊗ᵏ = ${n}ᵏ = ${dimTensor}`, 0, -4, viz.colors.orange, 13, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that \\(v \\wedge w = -w \\wedge v\\) in \\(\\Lambda^2(V)\\).',
                    hint: 'Use the fact that \\(v \\wedge v = 0\\) for all \\(v\\), applied to \\((v+w) \\wedge (v+w)\\).',
                    solution: 'We have \\(0 = (v+w) \\wedge (v+w) = v \\wedge v + v \\wedge w + w \\wedge v + w \\wedge w = v \\wedge w + w \\wedge v\\) (using \\(v \\wedge v = w \\wedge w = 0\\)). Thus \\(v \\wedge w = -w \\wedge v\\).'
                },
                {
                    question: 'Show that if \\(\\{e_1, \\ldots, e_n\\}\\) is a basis for \\(V\\), then \\(\\{e_{i_1} \\wedge \\cdots \\wedge e_{i_k} : 1 \\le i_1 < \\cdots < i_k \\le n\\}\\) is a basis for \\(\\Lambda^k(V)\\).',
                    hint: 'Prove linear independence and spanning separately. For spanning, use that every element is a sum of pure wedges.',
                    solution: 'Spanning: Every element of \\(\\Lambda^k(V)\\) is a linear combination of \\(v_1 \\wedge \\cdots \\wedge v_k\\) where each \\(v_i = \\sum_j a_{ij} e_j\\). Expanding using multilinearity gives a sum of \\(e_{j_1} \\wedge \\cdots \\wedge e_{j_k}\\). If any index repeats, that term is zero. Otherwise, we can permute to increasing order (introducing a sign). Independence: Suppose \\(\\sum c_I (e_{i_1} \\wedge \\cdots \\wedge e_{i_k}) = 0\\) where \\(I = (i_1, \\ldots, i_k)\\) runs over increasing sequences. Apply the dual functional that picks out one specific basis element to show each \\(c_I = 0\\).'
                },
                {
                    question: 'Compute \\((2e_1 + e_2) \\wedge (e_1 - e_2) \\wedge e_3\\) in \\(\\Lambda^3(\\mathbb{R}^3)\\).',
                    hint: 'Expand using multilinearity and use \\(e_i \\wedge e_i = 0\\) and antisymmetry.',
                    solution: '\\((2e_1 + e_2) \\wedge (e_1 - e_2) \\wedge e_3 = [2e_1 \\wedge e_1 \\wedge e_3 - 2e_1 \\wedge e_2 \\wedge e_3 + e_2 \\wedge e_1 \\wedge e_3 - e_2 \\wedge e_2 \\wedge e_3]\\). The first and last terms vanish (\\(e_i \\wedge e_i = 0\\)). The middle terms: \\(-2e_1 \\wedge e_2 \\wedge e_3 + e_2 \\wedge e_1 \\wedge e_3 = -2e_1 \\wedge e_2 \\wedge e_3 - e_1 \\wedge e_2 \\wedge e_3 = -3e_1 \\wedge e_2 \\wedge e_3\\).'
                }
            ]
        },
        {
            id: 'ch14-sec05',
            title: 'Tensor Algebra and Universal Constructions',
            content: `
                <h2>Tensor Algebra and Universal Constructions</h2>

                <p>The tensor algebra unifies the constructions we have seen, providing a universal "free" algebra generated by a vector space.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 14.24 (Tensor Algebra)</div>
                    <div class="env-body">
                        <p>The <strong>tensor algebra</strong> of a vector space \\(V\\) over \\(F\\) is the direct sum</p>
                        \\[T(V) = \\bigoplus_{k=0}^{\\infty} T^k(V) = \\bigoplus_{k=0}^{\\infty} V^{\\otimes k}\\]
                        <p>where \\(V^{\\otimes 0} = F\\) and \\(V^{\\otimes k} = V \\otimes \\cdots \\otimes V\\) (\\(k\\) times).</p>

                        <p>The tensor product gives \\(T(V)\\) the structure of a <strong>graded algebra</strong>: the multiplication is</p>
                        \\[T^k(V) \\times T^\\ell(V) \\to T^{k+\\ell}(V)\\]
                        \\[(v_1 \\otimes \\cdots \\otimes v_k) \\cdot (w_1 \\otimes \\cdots \\otimes w_\\ell) = v_1 \\otimes \\cdots \\otimes v_k \\otimes w_1 \\otimes \\cdots \\otimes w_\\ell\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 14.25 (Universal Property of Tensor Algebra)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be a vector space and \\(\\iota : V \\to T(V)\\) the natural inclusion \\(\\iota(v) = v \\in T^1(V) \\subset T(V)\\). For any associative algebra \\(A\\) (over the same field) and any linear map \\(f : V \\to A\\), there exists a unique algebra homomorphism \\(\\bar{f} : T(V) \\to A\\) such that \\(\\bar{f} \\circ \\iota = f\\).</p>

                        <p>In other words, \\(T(V)\\) is the <strong>free associative algebra</strong> on \\(V\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>Define \\(\\bar{f}\\) on decomposable tensors by</p>
                        \\[\\bar{f}(v_1 \\otimes \\cdots \\otimes v_k) = f(v_1) \\cdots f(v_k)\\]
                        <p>(product in \\(A\\)) and extend linearly. This is well-defined and respects the algebra structure by construction. Uniqueness follows from the fact that \\(T(V)\\) is generated (as an algebra) by \\(V\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 14.26 (Quotient Algebras)</div>
                    <div class="env-body">
                        <p>Both the symmetric and exterior algebras arise as quotients of the tensor algebra:</p>

                        <p><strong>Symmetric algebra:</strong></p>
                        \\[S(V) = T(V) / I_{\\text{sym}}\\]
                        <p>where \\(I_{\\text{sym}}\\) is the two-sided ideal generated by \\(v \\otimes w - w \\otimes v\\) for all \\(v, w \\in V\\).</p>

                        <p><strong>Exterior algebra:</strong></p>
                        \\[\\Lambda(V) = T(V) / I_{\\text{alt}}\\]
                        <p>where \\(I_{\\text{alt}}\\) is the two-sided ideal generated by \\(v \\otimes v\\) for all \\(v \\in V\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 14.27 (Universal Property of Exterior Algebra)</div>
                    <div class="env-body">
                        <p>The exterior algebra \\(\\Lambda(V)\\) with the natural map \\(\\iota : V \\to \\Lambda^1(V) \\subset \\Lambda(V)\\) has the following universal property: for any associative algebra \\(A\\) with a linear map \\(f : V \\to A\\) satisfying \\(f(v)^2 = 0\\) for all \\(v \\in V\\), there exists a unique algebra homomorphism \\(\\bar{f} : \\Lambda(V) \\to A\\) with \\(\\bar{f} \\circ \\iota = f\\).</p>

                        <p>In other words, \\(\\Lambda(V)\\) is the "free anticommutative algebra" on \\(V\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 14.28 (Polynomial Ring as Symmetric Algebra)</div>
                    <div class="env-body">
                        <p>If \\(V = F^n\\) with basis \\(\\{e_1, \\ldots, e_n\\}\\), then</p>
                        \\[S(V) \\cong F[x_1, \\ldots, x_n]\\]
                        <p>via the map sending \\(e_i \\odot e_j \\odot \\cdots \\odot e_k \\mapsto x_i x_j \\cdots x_k\\).</p>

                        <p>For instance, \\(S^2(\\mathbb{R}^2)\\) corresponds to homogeneous degree-2 polynomials:</p>
                        \\[\\{ax^2 + bxy + cy^2 : a, b, c \\in \\mathbb{R}\\}\\]
                        <p>which has dimension 3, matching \\(\\dim S^2(\\mathbb{R}^2) = \\binom{2+2-1}{2} = 3\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 14.29 (Alternating Multilinear Forms)</div>
                    <div class="env-body">
                        <p>An <strong>alternating \\(k\\)-linear form</strong> on \\(V\\) is a multilinear map \\(\\omega : V^k \\to F\\) such that</p>
                        \\[\\omega(v_1, \\ldots, v_k) = 0\\]
                        <p>whenever \\(v_i = v_j\\) for some \\(i \\ne j\\).</p>

                        <p>Equivalently (assuming \\(\\operatorname{char}(F) \\ne 2\\)), \\(\\omega\\) changes sign under transposition:</p>
                        \\[\\omega(\\ldots, v_i, \\ldots, v_j, \\ldots) = -\\omega(\\ldots, v_j, \\ldots, v_i, \\ldots)\\]

                        <p>The space of alternating \\(k\\)-linear forms on \\(V\\) is denoted \\(\\Lambda^k(V^*)\\) and is dual to \\(\\Lambda^k(V)\\):</p>
                        \\[\\Lambda^k(V^*) \\cong (\\Lambda^k(V))^*\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Applications in Differential Geometry</div>
                    <div class="env-body">
                        <p>The exterior algebra is fundamental in differential geometry and physics:</p>
                        <ul>
                            <li><strong>Differential forms:</strong> A \\(k\\)-form on a manifold \\(M\\) is a smooth section of \\(\\Lambda^k(T^*M)\\), the \\(k\\)th exterior power of the cotangent bundle.</li>
                            <li><strong>Exterior derivative:</strong> The map \\(d : \\Omega^k(M) \\to \\Omega^{k+1}(M)\\) satisfies \\(d^2 = 0\\), making \\((\\Omega^*(M), d)\\) a cochain complex.</li>
                            <li><strong>Integration:</strong> The integral \\(\\int_M \\omega\\) of a top-form \\(\\omega \\in \\Omega^n(M)\\) (\\(n = \\dim M\\)) generalizes the Riemann integral.</li>
                            <li><strong>Stokes theorem:</strong> \\(\\int_M d\\omega = \\int_{\\partial M} \\omega\\) unifies the fundamental theorem of calculus, Green theorem, divergence theorem, etc.</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="tensor-algebra-viz"></div>
            `,
            visualizations: [
                {
                    id: 'tensor-algebra-viz',
                    title: 'Interactive: Structure of Tensor Algebra T(V)',
                    description: 'Visualize the graded structure of T(V) = ⊕ V⊗k',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        let n = 2; // dimension of V

                        const slider = VizEngine.createSlider(controls, 'dim(V)', 1, 4, n, 1, (val) => {
                            n = val;
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            const levels = 5; // Show T^0 through T^4
                            const spacing = 1.8;
                            const startY = 4;

                            viz.drawText('Tensor Algebra T(V) = ⊕ₖ V⊗ᵏ', 0, 5.5, viz.colors.white, 16, 'center');

                            for (let k = 0; k < levels; k++) {
                                const y = startY - k * spacing;
                                const dim = Math.pow(n, k);

                                // Draw level
                                const width = Math.min(0.3 * dim, 3);
                                viz.drawPolygon([
                                    [-width, y - 0.3],
                                    [width, y - 0.3],
                                    [width, y + 0.3],
                                    [-width, y + 0.3]
                                ], viz.colors.teal + '44', viz.colors.teal, 2);

                                // Label
                                const label = k === 0 ? 'T⁰(V) = F' : k === 1 ? 'T¹(V) = V' : `T${k}(V) = V⊗${k}`;
                                viz.drawText(label, -5, y, viz.colors.blue, 14, 'left');
                                viz.drawText(`dim = ${dim}`, 4, y, viz.colors.orange, 13, 'left');

                                // Draw multiplication structure
                                if (k < levels - 1) {
                                    viz.drawText('⊗', width + 0.5, y - spacing/2, viz.colors.yellow, 16, 'center');
                                }
                            }

                            viz.drawText('Direct sum ⊕', -6.5, 0, viz.colors.green, 14, 'right');
                            viz.drawText('Multiplication: concatenation', 0, -5.5, viz.colors.yellow, 13, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that the tensor algebra \\(T(V)\\) is infinite-dimensional when \\(\\dim V \\ge 1\\).',
                    hint: 'Compute \\(\\dim T^k(V)\\) for each \\(k\\).',
                    solution: 'For each \\(k \\ge 0\\), \\(\\dim T^k(V) = (\\dim V)^k\\). If \\(n = \\dim V \\ge 1\\), then \\(\\dim T^k(V) = n^k\\), which is unbounded as \\(k \\to \\infty\\). Thus \\(\\dim T(V) = \\sum_{k=0}^{\\infty} n^k = \\infty\\).'
                },
                {
                    question: 'Show that the symmetric algebra \\(S(V)\\) is commutative: \\(xy = yx\\) for all \\(x, y \\in S(V)\\).',
                    hint: 'Use the fact that \\(S(V) = T(V) / I_{\\text{sym}}\\) where \\(I_{\\text{sym}}\\) is generated by \\(v \\otimes w - w \\otimes v\\).',
                    solution: 'In \\(S(V)\\), the image of \\(v \\otimes w\\) equals the image of \\(w \\otimes v\\) for all \\(v, w \\in V\\). Since \\(S(V)\\) is generated (as an algebra) by \\(S^1(V) = V\\), and multiplication is determined by the product on generators, we have commutativity on all of \\(S(V)\\).'
                },
                {
                    question: 'Compute the dimension of \\(\\Lambda(\\mathbb{R}^n)\\) for arbitrary \\(n\\).',
                    hint: 'Sum \\(\\dim \\Lambda^k(\\mathbb{R}^n) = \\binom{n}{k}\\) over all \\(k\\).',
                    solution: '\\(\\dim \\Lambda(\\mathbb{R}^n) = \\sum_{k=0}^n \\dim \\Lambda^k(\\mathbb{R}^n) = \\sum_{k=0}^n \\binom{n}{k} = 2^n\\) by the binomial theorem.'
                }
            ]
        }
    ]
});
