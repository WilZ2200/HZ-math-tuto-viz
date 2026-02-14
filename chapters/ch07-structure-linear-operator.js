window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch07',
    number: 7,
    title: 'The Structure of a Linear Operator',
    subtitle: 'Primary decomposition, canonical forms, and the fundamental structure theorem',
    sections: [
        {
            id: 'ch07-sec01',
            title: 'Invariant Subspaces and the Minimal Polynomial',
            content: `
                <h2>Invariant Subspaces and the Minimal Polynomial</h2>

                <p>The structure theory of linear operators reveals deep connections between abstract algebra and linear algebra. By viewing a vector space \\(V\\) as a module over the polynomial ring \\(F[x]\\), we can apply the powerful machinery of module theory to understand the canonical forms of linear operators.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 7.1 (\\(F[x]\\)-Module Structure)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be a vector space over a field \\(F\\) and \\(\\tau \\in \\mathcal{L}(V)\\) a linear operator. We can make \\(V\\) into an \\(F[x]\\)-module \\(V_\\tau\\) by defining scalar multiplication for polynomials \\(p(x) \\in F[x]\\) as:</p>
                        \\[p(x) \\cdot v = p(\\tau)(v)\\]
                        <p>where \\(p(\\tau)\\) denotes the operator polynomial obtained by substituting \\(\\tau\\) for \\(x\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Think of the \\(F[x]\\)-module structure as allowing us to "act" on vectors not just with the operator \\(\\tau\\) itself, but with arbitrary polynomials in \\(\\tau\\). This seemingly simple extension has profound consequences: submodules correspond to \\(\\tau\\)-invariant subspaces, and the module-theoretic structure completely determines the similarity class of \\(\\tau\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 7.2 (\\(\\tau\\)-Invariant Subspace)</div>
                    <div class="env-body">
                        <p>A subspace \\(W \\subseteq V\\) is <strong>\\(\\tau\\)-invariant</strong> if \\(\\tau(W) \\subseteq W\\). In module language, \\(W\\) is a submodule of \\(V_\\tau\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="invariant-subspace-viz"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition 7.3 (Minimal Polynomial)</div>
                    <div class="env-body">
                        <p>The <strong>minimal polynomial</strong> \\(\\min_\\tau(x)\\) of a linear operator \\(\\tau \\in \\mathcal{L}(V)\\) is the unique monic polynomial of smallest degree such that \\(\\min_\\tau(\\tau) = 0\\). Equivalently, it is the monic generator of the annihilator ideal:</p>
                        \\[\\operatorname{ann}(V_\\tau) = \\{p(x) \\in F[x] : p(\\tau) = 0\\}\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.4 (Properties of the Minimal Polynomial)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau \\in \\mathcal{L}(V)\\) with minimal polynomial \\(m_\\tau(x)\\). Then:</p>
                        <ol>
                            <li>\\(m_\\tau(x)\\) divides any polynomial \\(p(x)\\) satisfying \\(p(\\tau) = 0\\)</li>
                            <li>If \\(V = W_1 \\oplus W_2\\) with both \\(W_i\\) \\(\\tau\\)-invariant, then \\[m_\\tau(x) = \\operatorname{lcm}(m_{\\tau|_{W_1}}(x), m_{\\tau|_{W_2}}(x))\\]</li>
                            <li>Similar operators have the same minimal polynomial</li>
                            <li>\\(\\deg(m_\\tau) \\leq \\dim(V)\\) with equality if and only if \\(\\tau\\) is nonderogatory</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>For (1), use the division algorithm: if \\(p(\\tau) = 0\\), write \\(p(x) = q(x)m_\\tau(x) + r(x)\\) with \\(\\deg(r) < \\deg(m_\\tau)\\). Then \\(r(\\tau) = 0\\), so by minimality \\(r = 0\\).</p>
                        <p>For (2), note that \\(m_{\\tau|_{W_i}}(\\tau)\\) annihilates \\(W_i\\), so their lcm annihilates \\(V\\). The reverse inclusion uses the fact that \\(m_\\tau\\) must annihilate each restriction.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 7.5 (\\(\\tau\\)-Cyclic Subspace)</div>
                    <div class="env-body">
                        <p>A subspace \\(W \\subseteq V\\) is <strong>\\(\\tau\\)-cyclic</strong> if there exists a vector \\(v \\in V\\) such that</p>
                        \\[W = \\langle v \\rangle_\\tau = \\operatorname{span}\\{v, \\tau(v), \\tau^2(v), \\ldots\\}\\]
                        <p>The vector \\(v\\) is called a <strong>cyclic generator</strong> for \\(W\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 7.6</div>
                    <div class="env-body">
                        <p>Consider the differentiation operator \\(D: \\mathbb{R}_3[x] \\to \\mathbb{R}_3[x]\\) defined by \\(D(p) = p'\\). The polynomial \\(p(x) = x^3\\) generates a cyclic subspace:</p>
                        \\[\\langle x^3 \\rangle_D = \\operatorname{span}\\{x^3, 3x^2, 6x, 6\\} = \\mathbb{R}_3[x]\\]
                        <p>The minimal polynomial is \\(m_D(x) = x^4\\) since \\(D^4 = 0\\) but \\(D^3 \\neq 0\\).</p>
                    </div>
                </div>
`,
            visualizations: [
                {
                    id: 'invariant-subspace-viz',
                    title: 'Interactive: Invariant Subspace Explorer',
                    description: 'Explore how a linear transformation preserves a subspace. Drag vectors to see if the transformed vectors remain in the subspace.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 450, scale: 45});

                        // Define the transformation matrix (rotation + scaling)
                        let angle = 0.5;
                        let scale = 0.8;

                        function getMatrix() {
                            return [
                                [scale * Math.cos(angle), -scale * Math.sin(angle)],
                                [scale * Math.sin(angle), scale * Math.cos(angle)]
                            ];
                        }

                        const v1 = viz.addDraggable('v1', 2, 1, viz.colors.blue, 8, () => draw());
                        const v2 = viz.addDraggable('v2', 1, 2, viz.colors.orange, 8, () => draw());

                        VizEngine.createSlider(controls, 'Rotation angle: ', 0, Math.PI, 0.5, 0.01, (val) => {
                            angle = val;
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Scale: ', 0.3, 1.5, 0.8, 0.05, (val) => {
                            scale = val;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const matrix = getMatrix();

                            // Draw the invariant subspace (span of eigenvector if it exists)
                            // For a rotation, there's no real invariant subspace except origin
                            // Draw span of v1 in light color
                            for (let t = -5; t <= 5; t += 0.5) {
                                viz.drawPoint(t * v1.x, t * v1.y, viz.colors.teal + '22', null, 2);
                            }

                            // Original vectors
                            viz.drawVector(0, 0, v1.x, v1.y, viz.colors.blue, 'v₁');
                            viz.drawVector(0, 0, v2.x, v2.y, viz.colors.orange, 'v₂');

                            // Transformed vectors
                            const tv1 = VizEngine.matVec(matrix, [v1.x, v1.y]);
                            const tv2 = VizEngine.matVec(matrix, [v2.x, v2.y]);

                            viz.drawVector(0, 0, tv1[0], tv1[1], viz.colors.blue + 'aa', 'T(v₁)', 2, [5, 5]);
                            viz.drawVector(0, 0, tv2[0], tv2[1], viz.colors.orange + 'aa', 'T(v₂)', 2, [5, 5]);

                            // Check if transformed v1 stays in span(v1)
                            const proj1 = (tv1[0] * v1.x + tv1[1] * v1.y) / (v1.x * v1.x + v1.y * v1.y);
                            const projVec = [proj1 * v1.x, proj1 * v1.y];
                            const dist = Math.sqrt((tv1[0] - projVec[0])**2 + (tv1[1] - projVec[1])**2);

                            viz.drawText(
                                dist < 0.1 ? 'span{v₁} is T-invariant!' : 'span{v₁} is NOT T-invariant',
                                0, -5.5,
                                dist < 0.1 ? viz.colors.green : viz.colors.red,
                                16, 'center'
                            );

                            viz.drawDraggables();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(\\tau: \\mathbb{R}^3 \\to \\mathbb{R}^3\\) be defined by \\(\\tau(x, y, z) = (x + y, y, y + z)\\). Find the minimal polynomial of \\(\\tau\\).',
                    hint: 'Compute \\(\\tau^2\\), \\(\\tau^3\\), etc., and look for a linear dependence relation among \\(I, \\tau, \\tau^2, \\ldots\\). The minimal polynomial has degree at most 3.',
                    solution: 'Computing successive powers: \\(\\tau^2(x,y,z) = (x+2y, y, 2y+z)\\) and \\(\\tau^3(x,y,z) = (x+3y, y, 3y+z)\\). We find \\((\\tau - I)^2 = 0\\) since \\((\\tau - I)(x,y,z) = (y, 0, z)\\) and \\((\\tau-I)^2(x,y,z) = (0,0,0)\\). Thus \\(m_\\tau(x) = (x-1)^2\\).'
                },
                {
                    question: 'Prove that if \\(W\\) is \\(\\tau\\)-invariant, then \\(W\\) is also \\(p(\\tau)\\)-invariant for any polynomial \\(p(x) \\in F[x]\\).',
                    hint: 'Use induction on the degree of \\(p(x)\\). The base case is \\(p(x) = x\\), which is the definition of \\(\\tau\\)-invariance.',
                    solution: 'If \\(W\\) is \\(\\tau\\)-invariant, then \\(\\tau(W) \\subseteq W\\). For \\(p(x) = a_0 + a_1 x + \\cdots + a_n x^n\\), we have \\(p(\\tau)(w) = a_0 w + a_1 \\tau(w) + \\cdots + a_n \\tau^n(w)\\). By induction, each \\(\\tau^k(w) \\in W\\), so \\(p(\\tau)(w) \\in W\\) as \\(W\\) is a subspace.'
                },
                {
                    question: 'Show that \\(V\\) is \\(\\tau\\)-cyclic if and only if the minimal polynomial of \\(\\tau\\) has degree \\(\\dim(V)\\).',
                    hint: 'If \\(V = \\langle v \\rangle_\\tau\\), then \\(\\{v, \\tau(v), \\ldots, \\tau^{n-1}(v)\\}\\) forms a basis where \\(n = \\dim(V)\\). Use this to find \\(m_\\tau(x)\\).',
                    solution: 'If \\(V = \\langle v \\rangle_\\tau\\) with \\(\\dim(V) = n\\), then \\(\\{v, \\tau(v), \\ldots, \\tau^{n-1}(v)\\}\\) is a basis (by \\(\\tau\\)-cyclicity), so \\(\\tau^n(v)\\) is a linear combination of these. This gives \\(m_\\tau(\\tau)(v) = 0\\) with \\(\\deg(m_\\tau) = n\\). Conversely, if \\(\\deg(m_\\tau) = n = \\dim(V)\\), any vector \\(v\\) with \\(\\{v, \\ldots, \\tau^{n-1}(v)\\}\\) linearly independent generates \\(V\\).'
                }
            ]
        },
        {
            id: 'ch07-sec02',
            title: 'Primary Decomposition Theorem',
            content: `
                <h2>Primary Decomposition Theorem</h2>

                <p>The primary decomposition theorem is one of the cornerstones of linear algebra. It shows that any finite-dimensional vector space decomposes into invariant subspaces corresponding to the prime factors of the minimal polynomial.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.7 (Primary Decomposition Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be finite-dimensional and let \\(\\tau \\in \\mathcal{L}(V)\\) have minimal polynomial</p>
                        \\[m_\\tau(x) = p_1(x)^{e_1} \\cdots p_k(x)^{e_k}\\]
                        <p>where the \\(p_i(x)\\) are distinct monic irreducible polynomials. Then:</p>
                        <ol>
                            <li><strong>(Primary decomposition)</strong> The vector space decomposes as
                            \\[V = V_1 \\oplus \\cdots \\oplus V_k\\]
                            where \\(V_i = \\ker(p_i(\\tau)^{e_i})\\) is the <strong>primary component</strong> associated to \\(p_i\\).</li>
                            <li>Each \\(V_i\\) is \\(\\tau\\)-invariant with \\(m_{\\tau|_{V_i}}(x) = p_i(x)^{e_i}\\).</li>
                            <li>The primary components are uniquely determined by \\(\\tau\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Since the \\(p_i(x)^{e_i}\\) are pairwise relatively prime, by the Chinese Remainder Theorem for \\(F[x]\\), there exist polynomials \\(q_i(x)\\) such that:</p>
                        \\[q_i(x) \\equiv 1 \\pmod{p_i(x)^{e_i}} \\quad \\text{and} \\quad q_i(x) \\equiv 0 \\pmod{p_j(x)^{e_j}} \\text{ for } j \\neq i\\]
                        <p>Define \\(\\pi_i = q_i(\\tau)\\). Then \\(\\pi_i\\) are projections (idempotent operators) with \\(\\pi_i \\pi_j = 0\\) for \\(i \\neq j\\) and \\(\\sum \\pi_i = I\\). Thus:</p>
                        \\[V = \\operatorname{im}(\\pi_1) \\oplus \\cdots \\oplus \\operatorname{im}(\\pi_k)\\]
                        <p>One verifies that \\(\\operatorname{im}(\\pi_i) = \\ker(p_i(\\tau)^{e_i}) = V_i\\), completing the proof.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="primary-decomp-viz"></div>

                <div class="env-block intuition">
                    <div class="env-title">Geometric Intuition</div>
                    <div class="env-body">
                        <p>The primary decomposition isolates different "frequencies" or "modes" of the operator \\(\\tau\\). Each primary component \\(V_i\\) captures the behavior of \\(\\tau\\) near the roots of \\(p_i(x)\\). This is analogous to Fourier analysis, where a signal is decomposed into pure frequency components.</p>
                        <p>For instance, if \\(m_\\tau(x) = (x - \\lambda_1)(x - \\lambda_2)\\) with distinct eigenvalues, the primary decomposition gives \\(V = E_{\\lambda_1} \\oplus E_{\\lambda_2}\\), the familiar eigenspace decomposition.</p>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 7.8</div>
                    <div class="env-body">
                        <p>If \\(V = W_1 \\oplus W_2\\) with both \\(W_i\\) \\(\\tau\\)-invariant, then the primary decomposition of \\(V\\) is the direct sum of the primary decompositions of \\(W_1\\) and \\(W_2\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 7.9</div>
                    <div class="env-body">
                        <p>Let \\(\\tau: \\mathbb{R}^4 \\to \\mathbb{R}^4\\) have minimal polynomial \\(m_\\tau(x) = (x^2 + 1)(x - 2)\\). Then:</p>
                        \\[\\mathbb{R}^4 = \\ker((\\tau^2 + I)^1) \\oplus \\ker((\\tau - 2I)^1)\\]
                        <p>The first component has dimension 2 (since \\(x^2 + 1\\) has degree 2 and is irreducible over \\(\\mathbb{R}\\)), and the second has dimension at least 1. If \\(\\dim(V) = 4\\), we must have \\(\\dim(\\ker(\\tau^2 + I)) = 2\\) and \\(\\dim(\\ker(\\tau - 2I)) = 2\\).</p>
                    </div>
                </div>
`,
            visualizations: [
                {
                    id: 'primary-decomp-viz',
                    title: 'Interactive: Primary Decomposition Diagram',
                    description: 'Visualize how a vector space decomposes into primary components based on the minimal polynomial.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 400, scale: 1});

                        let numComponents = 2;

                        VizEngine.createSlider(controls, 'Number of components: ', 2, 4, 2, 1, (val) => {
                            numComponents = val;
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            const colors = [viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple];
                            const labels = ['p₁(x)^{e₁}', 'p₂(x)^{e₂}', 'p₃(x)^{e₃}', 'p₄(x)^{e₄}'];

                            // Draw main box representing V
                            const mainW = 500, mainH = 300;
                            const mainX = 50, mainY = 50;

                            viz.ctx.fillStyle = viz.colors.text + '22';
                            viz.ctx.fillRect(mainX, mainY, mainW, mainH);
                            viz.ctx.strokeStyle = viz.colors.white;
                            viz.ctx.lineWidth = 2;
                            viz.ctx.strokeRect(mainX, mainY, mainW, mainH);

                            viz.screenText('V (entire space)', mainX + mainW/2, mainY - 15, viz.colors.white, 18, 'center');

                            // Draw subdivided components
                            const compW = mainW / numComponents;
                            for (let i = 0; i < numComponents; i++) {
                                const x = mainX + i * compW;

                                viz.ctx.fillStyle = colors[i] + '33';
                                viz.ctx.fillRect(x + 5, mainY + 5, compW - 10, mainH - 10);
                                viz.ctx.strokeStyle = colors[i];
                                viz.ctx.lineWidth = 2;
                                viz.ctx.strokeRect(x + 5, mainY + 5, compW - 10, mainH - 10);

                                viz.screenText('V' + (i + 1), x + compW/2, mainY + mainH/2 - 20, colors[i], 24, 'center');
                                viz.screenText('ker(' + labels[i] + ')', x + compW/2, mainY + mainH/2 + 10, viz.colors.text, 14, 'center');
                            }

                            // Draw direct sum symbols
                            for (let i = 0; i < numComponents - 1; i++) {
                                const x = mainX + (i + 1) * compW;
                                viz.screenText('⊕', x, mainY + mainH/2, viz.colors.white, 28, 'center');
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(\\tau \\in \\mathcal{L}(\\mathbb{C}^5)\\) have minimal polynomial \\(m_\\tau(x) = (x - 1)^2(x - 2)\\). Find all possible dimensions for the primary components.',
                    hint: 'Use the constraint that the sum of dimensions equals 5, and each primary component has dimension at least the degree of its corresponding irreducible factor.',
                    solution: 'Let \\(V_1 = \\ker((\\tau - I)^2)\\) and \\(V_2 = \\ker(\\tau - 2I)\\). We must have \\(\\dim(V_1) \\geq 2\\) and \\(\\dim(V_2) \\geq 1\\), with \\(\\dim(V_1) + \\dim(V_2) = 5\\). Possibilities: \\((\\dim(V_1), \\dim(V_2)) \\in \\{(2,3), (3,2), (4,1)\\}\\).'
                },
                {
                    question: 'Prove that the primary components in the primary decomposition theorem are uniquely determined.',
                    hint: 'Show that \\(V_i = \\ker(p_i(\\tau)^{e_i})\\) is independent of the choice of decomposition.',
                    solution: 'The primary component \\(V_i\\) is determined as \\(\\ker(p_i(\\tau)^{e_i})\\), which depends only on \\(\\tau\\) and the factorization of \\(m_\\tau(x)\\). Any other \\(\\tau\\)-invariant decomposition of \\(V\\) must respect these kernels, so the \\(V_i\\) are unique.'
                }
            ]
        },
        {
            id: 'ch07-sec03',
            title: 'Cyclic Decomposition and Elementary Divisors',
            content: `
                <h2>Cyclic Decomposition and Elementary Divisors</h2>

                <p>Refining the primary decomposition, we can further decompose each primary component into cyclic subspaces. This leads to the notion of elementary divisors, a complete invariant for similarity.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.10 (Cyclic Decomposition Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be finite-dimensional and \\(\\tau \\in \\mathcal{L}(V)\\) with minimal polynomial factorization as before. Each primary component \\(V_i\\) decomposes as:</p>
                        \\[V_i = \\langle v_{i,1} \\rangle_\\tau \\oplus \\cdots \\oplus \\langle v_{i,n_i} \\rangle_\\tau\\]
                        <p>where each \\(\\langle v_{i,j} \\rangle_\\tau\\) is a \\(\\tau\\)-cyclic subspace with annihilator (order) \\(p_i(x)^{d_{i,j}}\\), and</p>
                        \\[d_{i,1} \\geq d_{i,2} \\geq \\cdots \\geq d_{i,n_i} \\geq 1\\]
                        <p>The multiset of polynomials \\(\\{p_i(x)^{d_{i,j}}\\}\\) is uniquely determined by \\(\\tau\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 7.11 (Elementary Divisors and Invariant Factors)</div>
                    <div class="env-body">
                        <p>The <strong>elementary divisors</strong> of \\(\\tau\\) are the monic prime power polynomials \\(p_i(x)^{d_{i,j}}\\) appearing in the cyclic decomposition. They form a complete invariant for similarity.</p>
                        <p>The <strong>invariant factors</strong> of \\(\\tau\\) are monic polynomials \\(f_1(x), \\ldots, f_m(x)\\) with \\(f_1 | f_2 | \\cdots | f_m\\) such that:</p>
                        \\[V = \\langle u_1 \\rangle_\\tau \\oplus \\cdots \\oplus \\langle u_m \\rangle_\\tau\\]
                        <p>where \\(\\langle u_i \\rangle_\\tau\\) has order \\(f_i(x)\\). The minimal polynomial is \\(m_\\tau(x) = f_m(x)\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.12 (Elementary Divisors as Complete Invariant)</div>
                    <div class="env-body">
                        <p>Two operators \\(\\tau, \\sigma \\in \\mathcal{L}(V)\\) are similar if and only if they have the same multiset of elementary divisors. Equivalently:</p>
                        \\[\\tau \\sim \\sigma \\iff \\text{ElemDiv}(\\tau) = \\text{ElemDiv}(\\sigma)\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>If \\(\\tau \\sim \\sigma\\), then \\(V_\\tau \\cong V_\\sigma\\) as \\(F[x]\\)-modules. The structure theorem for finitely generated modules over a PID implies that isomorphic modules have the same elementary divisors.</p>
                        <p>Conversely, if the elementary divisors match, construct an isomorphism between \\(V_\\tau\\) and \\(V_\\sigma\\) by matching cyclic generators in each primary component.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="elementary-divisors-viz"></div>

                <div class="env-block example">
                    <div class="env-title">Example 7.13</div>
                    <div class="env-body">
                        <p>Consider an operator on \\(\\mathbb{C}^7\\) with elementary divisors:</p>
                        \\[\\text{ElemDiv}(\\tau) = \\{(x-1)^3, (x-1)^2, (x-2)^2\\}\\]
                        <p>Then the primary decomposition gives:</p>
                        \\[V = V_1 \\oplus V_2\\]
                        <p>where \\(V_1 = \\ker((\\tau - I)^3)\\) has \\(\\dim(V_1) = 3 + 2 = 5\\) and \\(V_2 = \\ker((\\tau - 2I)^2)\\) has \\(\\dim(V_2) = 2\\).</p>
                        <p>The invariant factors are computed by "stacking" elementary divisors: \\(f_1(x) = (x-1)(x-2)\\), \\(f_2(x) = (x-1)^2(x-2)\\), \\(f_3(x) = (x-1)^3\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The relationship between elementary divisors and invariant factors is bijective but nontrivial. Elementary divisors group by prime factors (primary decomposition), while invariant factors group by cyclic summands in a global decomposition of \\(V\\).</p>
                    </div>
                </div>
`,
            visualizations: [
                {
                    id: 'elementary-divisors-viz',
                    title: 'Interactive: Elementary Divisor Structure',
                    description: 'Build elementary divisor lists and see the corresponding primary and cyclic decompositions.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 450, scale: 1});

                        let config = {
                            p1_powers: [3, 2],  // (x-1)^3, (x-1)^2
                            p2_powers: [2]       // (x-2)^2
                        };

                        const configDiv = document.createElement('div');
                        configDiv.style.marginBottom = '10px';
                        configDiv.innerHTML = '<p style="color: #8b949e; margin: 5px 0;">Elementary divisors: {(x-1)³, (x-1)², (x-2)²}</p>';
                        controls.appendChild(configDiv);

                        VizEngine.createButton(controls, 'Config 1: {(x-1)³, (x-1)², (x-2)²}', () => {
                            config = { p1_powers: [3, 2], p2_powers: [2] };
                            configDiv.innerHTML = '<p style="color: #8b949e; margin: 5px 0;">Elementary divisors: {(x-1)³, (x-1)², (x-2)²}</p>';
                            draw();
                        });

                        VizEngine.createButton(controls, 'Config 2: {(x-1)², (x-1), (x-2)²}', () => {
                            config = { p1_powers: [2, 1], p2_powers: [2] };
                            configDiv.innerHTML = '<p style="color: #8b949e; margin: 5px 0;">Elementary divisors: {(x-1)², (x-1), (x-2)²}</p>';
                            draw();
                        });

                        VizEngine.createButton(controls, 'Config 3: {(x-1)⁴}', () => {
                            config = { p1_powers: [4], p2_powers: [] };
                            configDiv.innerHTML = '<p style="color: #8b949e; margin: 5px 0;">Elementary divisors: {(x-1)⁴}</p>';
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            const startY = 30;
                            const boxH = 60;
                            const gap = 20;

                            viz.screenText('Primary Decomposition:', 50, startY, viz.colors.white, 16, 'left');

                            let currentY = startY + 30;
                            let totalDim = 0;

                            // Draw primary component 1
                            if (config.p1_powers.length > 0) {
                                const dim1 = config.p1_powers.reduce((a, b) => a + b, 0);
                                totalDim += dim1;

                                viz.ctx.fillStyle = viz.colors.blue + '33';
                                viz.ctx.fillRect(50, currentY, 250, boxH);
                                viz.ctx.strokeStyle = viz.colors.blue;
                                viz.ctx.lineWidth = 2;
                                viz.ctx.strokeRect(50, currentY, 250, boxH);

                                viz.screenText('V₁ = ker((τ - 1)^e₁)', 175, currentY + 20, viz.colors.blue, 14, 'center');
                                viz.screenText('dim = ' + dim1, 175, currentY + 40, viz.colors.text, 12, 'center');

                                // Draw cyclic decomposition
                                const cycleX = 320;
                                for (let i = 0; i < config.p1_powers.length; i++) {
                                    const w = 80;
                                    const x = cycleX + i * (w + 10);

                                    viz.ctx.fillStyle = viz.colors.blue + '22';
                                    viz.ctx.fillRect(x, currentY, w, boxH);
                                    viz.ctx.strokeStyle = viz.colors.blue + '88';
                                    viz.ctx.lineWidth = 1;
                                    viz.ctx.strokeRect(x, currentY, w, boxH);

                                    viz.screenText('⟨v₁,' + (i+1) + '⟩', x + w/2, currentY + 20, viz.colors.blue, 11, 'center');
                                    viz.screenText('(x-1)^' + config.p1_powers[i], x + w/2, currentY + 40, viz.colors.text, 10, 'center');
                                }

                                currentY += boxH + gap;
                            }

                            // Draw primary component 2
                            if (config.p2_powers.length > 0) {
                                const dim2 = config.p2_powers.reduce((a, b) => a + b, 0);
                                totalDim += dim2;

                                viz.ctx.fillStyle = viz.colors.orange + '33';
                                viz.ctx.fillRect(50, currentY, 250, boxH);
                                viz.ctx.strokeStyle = viz.colors.orange;
                                viz.ctx.lineWidth = 2;
                                viz.ctx.strokeRect(50, currentY, 250, boxH);

                                viz.screenText('V₂ = ker((τ - 2)^e₂)', 175, currentY + 20, viz.colors.orange, 14, 'center');
                                viz.screenText('dim = ' + dim2, 175, currentY + 40, viz.colors.text, 12, 'center');

                                // Draw cyclic decomposition
                                const cycleX = 320;
                                for (let i = 0; i < config.p2_powers.length; i++) {
                                    const w = 80;
                                    const x = cycleX + i * (w + 10);

                                    viz.ctx.fillStyle = viz.colors.orange + '22';
                                    viz.ctx.fillRect(x, currentY, w, boxH);
                                    viz.ctx.strokeStyle = viz.colors.orange + '88';
                                    viz.ctx.lineWidth = 1;
                                    viz.ctx.strokeRect(x, currentY, w, boxH);

                                    viz.screenText('⟨v₂,' + (i+1) + '⟩', x + w/2, currentY + 20, viz.colors.orange, 11, 'center');
                                    viz.screenText('(x-2)^' + config.p2_powers[i], x + w/2, currentY + 40, viz.colors.text, 10, 'center');
                                }

                                currentY += boxH + gap;
                            }

                            viz.screenText('Total dimension: ' + totalDim, 50, currentY + 10, viz.colors.green, 14, 'left');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find all possible multisets of elementary divisors for an operator \\(\\tau \\in \\mathcal{L}(\\mathbb{C}^6)\\) with minimal polynomial \\(m_\\tau(x) = (x-1)^2(x-2)\\).',
                    hint: 'The elementary divisors must include \\((x-1)^2\\) and \\((x-2)\\). Their degrees must sum to 6.',
                    solution: 'Possibilities: {(x-1)², (x-1)², (x-2), (x-2)}, {(x-1)², (x-1), (x-1), (x-2), (x-2)}, {(x-1)², (x-2)⁴}, {(x-1)², (x-1), (x-2)³}, {(x-1)⁴, (x-2)²}, {(x-1)³, (x-1), (x-2)²}. Total of 6 distinct similarity classes.'
                },
                {
                    question: 'Given elementary divisors \\(\\{(x-\\lambda)^3, (x-\\lambda)^2, (x-\\mu)^2\\}\\), compute the invariant factors.',
                    hint: 'Stack the elementary divisors by degree within each prime factor, then multiply across rows.',
                    solution: 'Create a tableau: Row 1: (x-λ)³, (x-μ)²; Row 2: (x-λ)². Invariant factors: f₁(x) = (x-λ)(x-μ), f₂(x) = (x-λ)²(x-μ), f₃(x) = (x-λ)³.'
                },
                {
                    question: 'Prove that \\(\\tau\\) is nonderogatory if and only if \\(V\\) is \\(\\tau\\)-cyclic.',
                    hint: 'Use the fact that \\(\\tau\\) is nonderogatory iff \\(\\deg(m_\\tau) = \\dim(V)\\).',
                    solution: '\\(\\tau\\) is nonderogatory iff \\(m_\\tau(x) = \\chi_\\tau(x)\\), i.e., \\(\\deg(m_\\tau) = \\dim(V)\\). This occurs iff the invariant factor decomposition has only one summand, i.e., \\(V = \\langle v \\rangle_\\tau\\) for some v, i.e., V is τ-cyclic.'
                }
            ]
        },
        {
            id: 'ch07-sec04',
            title: 'Jordan Canonical Form',
            content: `
                <h2>Jordan Canonical Form</h2>

                <p>When the base field \\(F\\) is algebraically closed (e.g., \\(F = \\mathbb{C}\\)), every irreducible polynomial has degree 1, and the elementary divisors take the particularly simple form \\((x - \\lambda)^k\\). This leads to the Jordan canonical form.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 7.14 (Jordan Block)</div>
                    <div class="env-body">
                        <p>A <strong>Jordan block</strong> \\(J_k(\\lambda)\\) of size \\(k\\) corresponding to eigenvalue \\(\\lambda\\) is the \\(k \\times k\\) matrix:</p>
                        \\[J_k(\\lambda) = \\begin{bmatrix}
                        \\lambda & 1 & 0 & \\cdots & 0 \\\\
                        0 & \\lambda & 1 & \\cdots & 0 \\\\
                        \\vdots & \\vdots & \\ddots & \\ddots & \\vdots \\\\
                        0 & 0 & \\cdots & \\lambda & 1 \\\\
                        0 & 0 & \\cdots & 0 & \\lambda
                        \\end{bmatrix}\\]
                        <p>It has \\(\\lambda\\) on the diagonal, 1's on the superdiagonal, and 0's elsewhere.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="jordan-block-viz"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.15 (Jordan Canonical Form)</div>
                    <div class="env-body">
                        <p>Let \\(F\\) be algebraically closed and \\(\\tau \\in \\mathcal{L}(V)\\). Then there exists a basis \\(\\mathcal{B}\\) of \\(V\\) such that:</p>
                        \\[[\\tau]_{\\mathcal{B}} = \\begin{bmatrix}
                        J_{k_1}(\\lambda_1) & & \\\\
                        & \\ddots & \\\\
                        & & J_{k_m}(\\lambda_m)
                        \\end{bmatrix}\\]
                        <p>where the sizes \\(k_i\\) and eigenvalues \\(\\lambda_i\\) (with repetitions) are uniquely determined by \\(\\tau\\) up to reordering. This is the <strong>Jordan canonical form</strong> of \\(\\tau\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Over an algebraically closed field, \\(m_\\tau(x) = (x - \\lambda_1)^{e_1} \\cdots (x - \\lambda_r)^{e_r}\\) factors into linear terms. The elementary divisors are \\((x - \\lambda_i)^{k_{i,j}}\\).</p>
                        <p>For each \\(\\tau\\)-cyclic subspace \\(\\langle v \\rangle_\\tau\\) with order \\((x - \\lambda)^k\\), construct the Jordan basis:</p>
                        \\[\\{v, (\\tau - \\lambda I)(v), \\ldots, (\\tau - \\lambda I)^{k-1}(v)\\}\\]
                        <p>In this basis, \\(\\tau|_{\\langle v \\rangle_\\tau}\\) is represented by \\(J_k(\\lambda)\\). Taking the union of all such bases gives the Jordan canonical form.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 7.16</div>
                    <div class="env-body">
                        <p>An operator on \\(\\mathbb{C}^7\\) with elementary divisors \\(\\{(x-2)^3, (x-2)^2, (x-5)^2\\}\\) has Jordan form:</p>
                        \\[J = \\begin{bmatrix}
                        2 & 1 & 0 & & & & \\\\
                        0 & 2 & 1 & & & & \\\\
                        0 & 0 & 2 & & & & \\\\
                        & & & 2 & 1 & & \\\\
                        & & & 0 & 2 & & \\\\
                        & & & & & 5 & 1 \\\\
                        & & & & & 0 & 5
                        \\end{bmatrix}\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Geometric Meaning of Jordan Blocks</div>
                    <div class="env-body">
                        <p>A Jordan block \\(J_k(\\lambda)\\) acts as \\(\\lambda I + N\\) where \\(N\\) is nilpotent (\\(N^k = 0\\)). Geometrically, \\(J_k(\\lambda)\\) represents:</p>
                        <ul>
                            <li>Scaling by \\(\\lambda\\) (the eigenvalue)</li>
                            <li>Plus a "shift" that creates a chain: \\(v \\to (\\tau - \\lambda I)(v) \\to \\cdots \\to 0\\)</li>
                        </ul>
                        <p>The size \\(k\\) measures how long the nilpotent chain is before collapsing to zero.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="jordan-form-builder"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.17 (Cayley-Hamilton Theorem)</div>
                    <div class="env-body">
                        <p>Every operator \\(\\tau \\in \\mathcal{L}(V)\\) satisfies its characteristic polynomial:</p>
                        \\[\\chi_\\tau(\\tau) = 0\\]
                        <p>Moreover, \\(m_\\tau(x) | \\chi_\\tau(x)\\), and they share the same irreducible factors (though with possibly different multiplicities).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>The characteristic polynomial \\(\\chi_\\tau(x) = \\prod_{i,j} (x - \\lambda_i)^{k_{i,j}}\\) is the product of all elementary divisors. Since \\(m_\\tau(x) = \\prod_i (x - \\lambda_i)^{\\max_j k_{i,j}}\\), we have \\(m_\\tau | \\chi_\\tau\\), so \\(\\chi_\\tau(\\tau) = 0\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>
`,
            visualizations: [
                {
                    id: 'jordan-block-viz',
                    title: 'Interactive: Jordan Block Structure',
                    description: 'Visualize the structure of a Jordan block and how it acts on basis vectors.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 400, scale: 1});

                        let blockSize = 3;
                        let lambda = 2;

                        VizEngine.createSlider(controls, 'Block size: ', 1, 5, 3, 1, (val) => {
                            blockSize = val;
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Eigenvalue λ: ', -3, 3, 2, 0.5, (val) => {
                            lambda = val;
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            const cellSize = 50;
                            const startX = 50;
                            const startY = 50;

                            viz.screenText('Jordan Block J' + blockSize + '(' + lambda + ')', startX + blockSize * cellSize / 2, startY - 20, viz.colors.white, 18, 'center');

                            // Draw matrix
                            for (let i = 0; i < blockSize; i++) {
                                for (let j = 0; j < blockSize; j++) {
                                    const x = startX + j * cellSize;
                                    const y = startY + i * cellSize;

                                    viz.ctx.strokeStyle = viz.colors.text + '44';
                                    viz.ctx.lineWidth = 1;
                                    viz.ctx.strokeRect(x, y, cellSize, cellSize);

                                    let value = '';
                                    let color = viz.colors.text;

                                    if (i === j) {
                                        value = lambda.toString();
                                        color = viz.colors.blue;
                                    } else if (j === i + 1) {
                                        value = '1';
                                        color = viz.colors.orange;
                                    } else {
                                        value = '0';
                                        color = viz.colors.text + '44';
                                    }

                                    viz.screenText(value, x + cellSize/2, y + cellSize/2 + 5, color, 20, 'center');
                                }
                            }

                            // Draw action diagram
                            const actionX = startX + blockSize * cellSize + 80;
                            const actionY = startY + 20;
                            const vGap = 60;

                            viz.screenText('Action on basis:', actionX, actionY - 10, viz.colors.white, 14, 'left');

                            for (let i = 0; i < blockSize; i++) {
                                const y = actionY + 20 + i * vGap;

                                // Draw basis vector
                                viz.ctx.fillStyle = viz.colors.teal + '44';
                                viz.ctx.fillRect(actionX, y, 60, 30);
                                viz.ctx.strokeStyle = viz.colors.teal;
                                viz.ctx.lineWidth = 1;
                                viz.ctx.strokeRect(actionX, y, 60, 30);
                                viz.screenText('e' + (i + 1), actionX + 30, y + 20, viz.colors.teal, 14, 'center');

                                // Draw arrow and result
                                if (i < blockSize - 1) {
                                    viz.screenText('→', actionX + 70, y + 15, viz.colors.text, 16, 'center');
                                    viz.screenText(lambda + ' e' + (i+1) + ' + e' + (i+2), actionX + 100, y + 15, viz.colors.white, 12, 'left');
                                } else {
                                    viz.screenText('→', actionX + 70, y + 15, viz.colors.text, 16, 'center');
                                    viz.screenText(lambda + ' e' + (i+1), actionX + 100, y + 15, viz.colors.white, 12, 'left');
                                }
                            }
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'jordan-form-builder',
                    title: 'Interactive: Build Jordan Forms',
                    description: 'Construct Jordan canonical forms by specifying elementary divisors.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 400, scale: 1});

                        let blocks = [{lambda: 1, size: 3}, {lambda: 1, size: 2}, {lambda: -1, size: 2}];

                        VizEngine.createButton(controls, 'Example 1: Single block', () => {
                            blocks = [{lambda: 2, size: 4}];
                            draw();
                        });

                        VizEngine.createButton(controls, 'Example 2: Two eigenvalues', () => {
                            blocks = [{lambda: 1, size: 3}, {lambda: 1, size: 2}, {lambda: -1, size: 2}];
                            draw();
                        });

                        VizEngine.createButton(controls, 'Example 3: Diagonal', () => {
                            blocks = [{lambda: 1, size: 1}, {lambda: 2, size: 1}, {lambda: 3, size: 1}, {lambda: 4, size: 1}];
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            const totalSize = blocks.reduce((sum, b) => sum + b.size, 0);
                            const cellSize = Math.min(40, 350 / totalSize);
                            const startX = 50;
                            const startY = 80;

                            viz.screenText('Jordan Canonical Form (dim = ' + totalSize + ')', 300, 30, viz.colors.white, 18, 'center');

                            let currentIdx = 0;

                            blocks.forEach((block, blockNum) => {
                                const blockColor = [viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple][blockNum % 4];

                                // Highlight block region
                                viz.ctx.fillStyle = blockColor + '11';
                                viz.ctx.fillRect(
                                    startX + currentIdx * cellSize,
                                    startY + currentIdx * cellSize,
                                    block.size * cellSize,
                                    block.size * cellSize
                                );
                                viz.ctx.strokeStyle = blockColor;
                                viz.ctx.lineWidth = 2;
                                viz.ctx.strokeRect(
                                    startX + currentIdx * cellSize,
                                    startY + currentIdx * cellSize,
                                    block.size * cellSize,
                                    block.size * cellSize
                                );

                                // Draw block entries
                                for (let i = 0; i < block.size; i++) {
                                    for (let j = 0; j < block.size; j++) {
                                        const x = startX + (currentIdx + j) * cellSize;
                                        const y = startY + (currentIdx + i) * cellSize;

                                        let value = '';
                                        if (i === j) {
                                            value = block.lambda.toString();
                                        } else if (j === i + 1) {
                                            value = '1';
                                        }

                                        if (value !== '') {
                                            viz.screenText(value, x + cellSize/2, y + cellSize/2 + 3, viz.colors.white, cellSize > 30 ? 14 : 10, 'center');
                                        }
                                    }
                                }

                                currentIdx += block.size;
                            });

                            // Draw full matrix grid
                            for (let i = 0; i <= totalSize; i++) {
                                viz.ctx.strokeStyle = viz.colors.text + '44';
                                viz.ctx.lineWidth = 1;
                                viz.ctx.beginPath();
                                viz.ctx.moveTo(startX + i * cellSize, startY);
                                viz.ctx.lineTo(startX + i * cellSize, startY + totalSize * cellSize);
                                viz.ctx.stroke();

                                viz.ctx.beginPath();
                                viz.ctx.moveTo(startX, startY + i * cellSize);
                                viz.ctx.lineTo(startX + totalSize * cellSize, startY + i * cellSize);
                                viz.ctx.stroke();
                            }

                            // Display elementary divisors
                            let edText = 'Elementary divisors: {';
                            blocks.forEach((b, i) => {
                                edText += '(x-' + b.lambda + ')^' + b.size;
                                if (i < blocks.length - 1) edText += ', ';
                            });
                            edText += '}';

                            viz.screenText(edText, 300, startY + totalSize * cellSize + 30, viz.colors.green, 13, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find all possible Jordan canonical forms for \\(\\tau \\in \\mathcal{L}(\\mathbb{C}^5)\\) with minimal polynomial \\(m_\\tau(x) = (x-1)^2(x-2)\\).',
                    hint: 'The largest Jordan block for eigenvalue 1 has size 2, and for eigenvalue 2 has size 1. Use dimension constraints.',
                    solution: 'Possibilities: (1) J₂(1) ⊕ J₂(1) ⊕ J₁(2), (2) J₂(1) ⊕ J₁(1) ⊕ J₁(1) ⊕ J₁(2), (3) J₂(1) ⊕ J₂(2) ⊕ J₁(1). Total of 3 distinct similarity classes.'
                },
                {
                    question: 'Compute \\(J_3(\\lambda)^n\\) for any positive integer \\(n\\).',
                    hint: 'Write \\(J_3(\\lambda) = \\lambda I + N\\) where \\(N\\) is the nilpotent part. Use the binomial theorem.',
                    solution: '\\(J_3(\\lambda)^n = (\\lambda I + N)^n = \\sum_{k=0}^{2} \\binom{n}{k} \\lambda^{n-k} N^k\\) where \\(N^3 = 0\\). Explicitly: \\[J_3(\\lambda)^n = \\begin{bmatrix} \\lambda^n & n\\lambda^{n-1} & \\frac{n(n-1)}{2}\\lambda^{n-2} \\\\ 0 & \\lambda^n & n\\lambda^{n-1} \\\\ 0 & 0 & \\lambda^n \\end{bmatrix}\\]'
                },
                {
                    question: 'Show that the number of Jordan blocks of size \\(\\geq k\\) for eigenvalue \\(\\lambda\\) equals \\(\\dim(\\ker((\\tau - \\lambda I)^k)) - \\dim(\\ker((\\tau - \\lambda I)^{k-1}))\\).',
                    hint: 'Count how many chains of length at least \\(k\\) exist in the generalized eigenspace.',
                    solution: 'Each Jordan block J_m(λ) with m ≥ k contributes exactly 1 to the count. The dimension formula follows from analyzing the kernel structure: ker((τ - λI)^k) contains all vectors in chains of length ≤ k.'
                }
            ]
        },
        {
            id: 'ch07-sec05',
            title: 'Rational Canonical Form',
            content: `
                <h2>Rational Canonical Form</h2>

                <p>The rational canonical form is a canonical form that works over any field, not just algebraically closed fields. It is based on companion matrices rather than Jordan blocks.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 7.18 (Companion Matrix)</div>
                    <div class="env-body">
                        <p>The <strong>companion matrix</strong> of a monic polynomial</p>
                        \\[p(x) = x^n + a_{n-1}x^{n-1} + \\cdots + a_1 x + a_0\\]
                        <p>is the \\(n \\times n\\) matrix:</p>
                        \\[C(p) = \\begin{bmatrix}
                        0 & 0 & \\cdots & 0 & -a_0 \\\\
                        1 & 0 & \\cdots & 0 & -a_1 \\\\
                        0 & 1 & \\cdots & 0 & -a_2 \\\\
                        \\vdots & \\vdots & \\ddots & \\vdots & \\vdots \\\\
                        0 & 0 & \\cdots & 1 & -a_{n-1}
                        \\end{bmatrix}\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.19 (Properties of Companion Matrices)</div>
                    <div class="env-body">
                        <p>Let \\(C = C(p)\\) be the companion matrix of \\(p(x)\\). Then:</p>
                        <ol>
                            <li>\\(C\\) is nonderogatory: \\(m_C(x) = \\chi_C(x) = p(x)\\)</li>
                            <li>The vectors \\(e_1, Ce_1, C^2e_1, \\ldots, C^{n-1}e_1\\) form a basis for \\(F^n\\)</li>
                            <li>If \\(\\tau\\) is represented by \\(C\\) in some basis, that basis is \\(\\tau\\)-cyclic</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>For (1), compute \\(C^n e_1\\) and show it equals \\(-a_0 e_1 - a_1 Ce_1 - \\cdots - a_{n-1}C^{n-1}e_1\\), so \\(p(C)e_1 = 0\\). Since the vectors \\(e_1, Ce_1, \\ldots, C^{n-1}e_1\\) span \\(F^n\\), we have \\(p(C) = 0\\), and minimality follows from degree considerations.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="companion-matrix-viz"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.20 (Rational Canonical Form: Elementary Divisor Version)</div>
                    <div class="env-body">
                        <p>Every operator \\(\\tau \\in \\mathcal{L}(V)\\) over any field \\(F\\) can be represented as a block diagonal matrix:</p>
                        \\[[\\tau]_{\\mathcal{B}} = \\begin{bmatrix}
                        C(p_1) & & \\\\
                        & \\ddots & \\\\
                        & & C(p_m)
                        \\end{bmatrix}\\]
                        <p>where \\(p_i(x)\\) are the elementary divisors of \\(\\tau\\) (monic prime powers). This form is unique up to reordering of blocks.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.21 (Rational Canonical Form: Invariant Factor Version)</div>
                    <div class="env-body">
                        <p>Every operator \\(\\tau\\) can also be represented as:</p>
                        \\[[\\tau]_{\\mathcal{B}} = \\begin{bmatrix}
                        C(f_1) & & \\\\
                        & \\ddots & \\\\
                        & & C(f_r)
                        \\end{bmatrix}\\]
                        <p>where \\(f_1 | f_2 | \\cdots | f_r\\) are the invariant factors of \\(\\tau\\). This form is unique up to reordering.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 7.22</div>
                    <div class="env-body">
                        <p>Over \\(\\mathbb{R}\\), an operator with minimal polynomial \\(m_\\tau(x) = (x^2 + 1)(x - 2)\\) and elementary divisors \\(\\{x^2 + 1, x - 2, x - 2\\}\\) has rational canonical form:</p>
                        \\[R = \\begin{bmatrix}
                        0 & -1 & & & \\\\
                        1 & 0 & & & \\\\
                        & & 2 & & \\\\
                        & & & 2 &
                        \\end{bmatrix}\\]
                        <p>Note that \\(C(x^2 + 1) = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}\\) (a rotation by 90°) and \\(C(x - 2) = [2]\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Jordan vs Rational Canonical Form</div>
                    <div class="env-body">
                        <p><strong>Jordan form:</strong> Only over algebraically closed fields. Very simple blocks (eigenvalue + nilpotent shift). Best for computations involving powers and exponentials.</p>
                        <p><strong>Rational form:</strong> Works over any field. More complex blocks (companion matrices). Better reflects the intrinsic structure independent of field choice.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="rational-form-viz"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.23 (Determinant Formula for Characteristic Polynomial)</div>
                    <div class="env-body">
                        <p>For any matrix \\(A\\) representing \\(\\tau\\), the characteristic polynomial is:</p>
                        \\[\\chi_\\tau(x) = \\det(xI - A)\\]
                        <p>This provides a computational method for finding \\(\\chi_\\tau(x)\\) without knowing the elementary divisors.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>For a companion matrix \\(C = C(p)\\), direct computation shows \\(\\det(xI - C) = p(x)\\). For a block diagonal matrix in rational canonical form, the determinant is the product of the determinants of blocks, giving \\(\\prod p_i(x) = \\chi_\\tau(x)\\). The result extends to all matrices by similarity invariance.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>
`,
            visualizations: [
                {
                    id: 'companion-matrix-viz',
                    title: 'Interactive: Companion Matrix Structure',
                    description: 'Explore companion matrices for different polynomials.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 400, scale: 1});

                        let coeffs = [-2, 1, 1];  // Represents x^3 + x^2 + x - 2

                        const inputDiv = document.createElement('div');
                        inputDiv.style.marginBottom = '10px';
                        inputDiv.innerHTML = '<p style="color: #8b949e; margin: 5px 0;">Polynomial: x³ + x² + x - 2</p>';
                        controls.appendChild(inputDiv);

                        VizEngine.createButton(controls, 'p(x) = x³ + x² + x - 2', () => {
                            coeffs = [-2, 1, 1];
                            inputDiv.innerHTML = '<p style="color: #8b949e; margin: 5px 0;">Polynomial: x³ + x² + x - 2</p>';
                            draw();
                        });

                        VizEngine.createButton(controls, 'p(x) = x³ - 1', () => {
                            coeffs = [-1, 0, 0];
                            inputDiv.innerHTML = '<p style="color: #8b949e; margin: 5px 0;">Polynomial: x³ - 1</p>';
                            draw();
                        });

                        VizEngine.createButton(controls, 'p(x) = x⁴ + x + 1', () => {
                            coeffs = [1, 1, 0, 0];
                            inputDiv.innerHTML = '<p style="color: #8b949e; margin: 5px 0;">Polynomial: x⁴ + x + 1</p>';
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            const n = coeffs.length;
                            const cellSize = 60;
                            const startX = 100;
                            const startY = 80;

                            viz.screenText('Companion Matrix C(p)', startX + n * cellSize / 2, startY - 30, viz.colors.white, 18, 'center');

                            // Draw matrix
                            for (let i = 0; i < n; i++) {
                                for (let j = 0; j < n; j++) {
                                    const x = startX + j * cellSize;
                                    const y = startY + i * cellSize;

                                    viz.ctx.strokeStyle = viz.colors.text + '44';
                                    viz.ctx.lineWidth = 1;
                                    viz.ctx.strokeRect(x, y, cellSize, cellSize);

                                    let value = '';
                                    let color = viz.colors.text;

                                    if (j === n - 1) {
                                        // Last column: -coefficients
                                        value = (-coeffs[i]).toString();
                                        color = viz.colors.orange;
                                    } else if (j === i - 1) {
                                        // Subdiagonal: 1's
                                        value = '1';
                                        color = viz.colors.blue;
                                    } else {
                                        value = '0';
                                        color = viz.colors.text + '44';
                                    }

                                    viz.screenText(value, x + cellSize/2, y + cellSize/2 + 5, color, 16, 'center');
                                }
                            }

                            // Draw cyclic basis action
                            const actionX = startX + n * cellSize + 60;
                            const actionY = startY + 20;

                            viz.screenText('Cyclic basis:', actionX, actionY - 10, viz.colors.white, 14, 'left');

                            for (let i = 0; i < n; i++) {
                                const y = actionY + 20 + i * 50;
                                viz.screenText('e₁, Ce₁, C²e₁, ...', actionX, y, viz.colors.teal, 12, 'left');
                                break; // Just show once
                            }

                            viz.screenText('Property: m_C(x) = p(x)', actionX, actionY + 80, viz.colors.green, 13, 'left');
                            viz.screenText('(nonderogatory)', actionX, actionY + 100, viz.colors.text, 11, 'left');
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'rational-form-viz',
                    title: 'Interactive: Rational Canonical Form',
                    description: 'See how elementary divisors determine the rational canonical form over different fields.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 400, scale: 1});

                        let field = 'real';

                        VizEngine.createButton(controls, 'Over ℝ: m(x) = (x²+1)(x-1)', () => {
                            field = 'real';
                            draw();
                        });

                        VizEngine.createButton(controls, 'Over ℂ: m(x) = (x-i)(x+i)(x-1)', () => {
                            field = 'complex';
                            draw();
                        });

                        VizEngine.createButton(controls, 'Over ℝ: m(x) = (x-2)²', () => {
                            field = 'real2';
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            viz.screenText('Rational Canonical Form', 300, 25, viz.colors.white, 18, 'center');

                            if (field === 'real') {
                                // Elementary divisors: {x²+1, x-1}
                                viz.screenText('Field: ℝ,  Elementary divisors: {x²+1, x-1}', 300, 50, viz.colors.text, 14, 'center');

                                const cellSize = 45;
                                const startX = 150;
                                const startY = 100;

                                // C(x²+1) = [[0, -1], [1, 0]]
                                const block1 = [[0, -1], [1, 0]];
                                for (let i = 0; i < 2; i++) {
                                    for (let j = 0; j < 2; j++) {
                                        const x = startX + j * cellSize;
                                        const y = startY + i * cellSize;

                                        viz.ctx.strokeStyle = viz.colors.blue;
                                        viz.ctx.lineWidth = 2;
                                        viz.ctx.strokeRect(x, y, cellSize, cellSize);

                                        viz.screenText(block1[i][j].toString(), x + cellSize/2, y + cellSize/2 + 5, viz.colors.blue, 16, 'center');
                                    }
                                }

                                viz.screenText('C(x²+1)', startX + cellSize, startY + 2*cellSize + 20, viz.colors.blue, 12, 'center');

                                // C(x-1) = [1]
                                const x2 = startX + 2.5 * cellSize;
                                const y2 = startY;
                                viz.ctx.strokeStyle = viz.colors.orange;
                                viz.ctx.lineWidth = 2;
                                viz.ctx.strokeRect(x2, y2, cellSize, cellSize);
                                viz.screenText('1', x2 + cellSize/2, y2 + cellSize/2 + 5, viz.colors.orange, 16, 'center');

                                viz.screenText('C(x-1)', x2 + cellSize/2, y2 + cellSize + 20, viz.colors.orange, 12, 'center');

                                viz.screenText('Note: Over ℝ, x²+1 is irreducible', 300, 250, viz.colors.green, 13, 'center');

                            } else if (field === 'complex') {
                                viz.screenText('Field: ℂ,  Elementary divisors: {x-i, x+i, x-1}', 300, 50, viz.colors.text, 14, 'center');
                                viz.screenText('Rational form = Jordan form (all linear factors)', 300, 250, viz.colors.green, 13, 'center');

                                const cellSize = 40;
                                const startX = 180;
                                const startY = 100;

                                for (let k = 0; k < 3; k++) {
                                    const x = startX + k * (cellSize + 20);
                                    const labels = ['i', '-i', '1'];
                                    const colors = [viz.colors.blue, viz.colors.orange, viz.colors.green];

                                    viz.ctx.strokeStyle = colors[k];
                                    viz.ctx.lineWidth = 2;
                                    viz.ctx.strokeRect(x, startY, cellSize, cellSize);
                                    viz.screenText(labels[k], x + cellSize/2, startY + cellSize/2 + 5, colors[k], 14, 'center');
                                }

                            } else if (field === 'real2') {
                                viz.screenText('Field: ℝ,  Elementary divisors: {(x-2)²}', 300, 50, viz.colors.text, 14, 'center');

                                const cellSize = 50;
                                const startX = 200;
                                const startY = 100;

                                // C((x-2)²) = C(x² - 4x + 4)
                                const block = [[0, -4], [1, 4]];
                                for (let i = 0; i < 2; i++) {
                                    for (let j = 0; j < 2; j++) {
                                        const x = startX + j * cellSize;
                                        const y = startY + i * cellSize;

                                        viz.ctx.strokeStyle = viz.colors.purple;
                                        viz.ctx.lineWidth = 2;
                                        viz.ctx.strokeRect(x, y, cellSize, cellSize);

                                        viz.screenText(block[i][j].toString(), x + cellSize/2, y + cellSize/2 + 5, viz.colors.purple, 16, 'center');
                                    }
                                }

                                viz.screenText('C(x² - 4x + 4)', startX + cellSize, startY + 2*cellSize + 20, viz.colors.purple, 12, 'center');
                                viz.screenText('Over ℂ, would decompose to J₂(2)', 300, 250, viz.colors.green, 13, 'center');
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the rational canonical form over \\(\\mathbb{R}\\) of a \\(6 \\times 6\\) matrix with minimal polynomial \\(m(x) = (x^2 + 1)^2(x - 1)\\) and invariant factors \\(f_1(x) = x - 1\\), \\(f_2(x) = (x^2 + 1)^2(x - 1)\\).',
                    hint: 'The rational form is block diagonal with blocks \\(C(f_1)\\) and \\(C(f_2)\\).',
                    solution: 'The form is diag(C(x-1), C((x²+1)²(x-1))). C(x-1) = [1] (1×1), and C((x²+1)²(x-1)) is a 5×5 companion matrix for p(x) = x⁵ + x⁴ + 2x³ + 2x² + 2x + 1 (expand (x²+1)²(x-1)).'
                },
                {
                    question: 'Prove that \\(\\det(xI - C(p)) = p(x)\\) for the companion matrix of \\(p(x) = x^n + a_{n-1}x^{n-1} + \\cdots + a_0\\).',
                    hint: 'Use induction on \\(n\\). Expand the determinant along the first row.',
                    solution: 'Base case n=1: det(x - a₀) = x - a₀ = p(x). Inductive step: Expand det(xI - C) along the first row. The (1,1) minor gives x·det(xI - C\'), where C\' is the companion for the degree n-1 part. The (1,n) minor contributes (-1)ⁿ⁺¹(-a₀)·1 = a₀. Combining gives p(x).'
                },
                {
                    question: 'How does the rational canonical form change when extending the base field from \\(\\mathbb{R}\\) to \\(\\mathbb{C}\\)?',
                    hint: 'Elementary divisors may factor further over \\(\\mathbb{C}\\), but invariant factors remain the same.',
                    solution: 'The invariant factors are field-independent (Theorem 7.20). However, elementary divisors change: irreducible polynomials over ℝ of degree >1 factor into linear factors over ℂ. For example, x²+1 becomes (x-i)(x+i). The rational form over ℂ equals the Jordan form.'
                }
            ]
        },
        {
            id: 'ch07-sec06',
            title: 'The Characteristic Polynomial and Applications',
            content: `
                <h2>The Characteristic Polynomial and Applications</h2>

                <p>We conclude with a deeper look at the characteristic polynomial and its relationship to the minimal polynomial, along with applications to computing functions of operators.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 7.24 (Characteristic Polynomial)</div>
                    <div class="env-body">
                        <p>The <strong>characteristic polynomial</strong> of \\(\\tau \\in \\mathcal{L}(V)\\) is the product of all elementary divisors:</p>
                        \\[\\chi_\\tau(x) = \\prod_{i,j} p_i(x)^{d_{i,j}}\\]
                        <p>Equivalently, for any matrix \\(A\\) representing \\(\\tau\\):</p>
                        \\[\\chi_\\tau(x) = \\det(xI - A)\\]
                        <p>The characteristic polynomial has degree \\(\\deg(\\chi_\\tau) = \\dim(V)\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.25 (Cayley-Hamilton Theorem)</div>
                    <div class="env-body">
                        <p>Every linear operator satisfies its characteristic polynomial:</p>
                        \\[\\chi_\\tau(\\tau) = 0\\]
                        <p>Moreover, the minimal polynomial divides the characteristic polynomial:</p>
                        \\[m_\\tau(x) \\mid \\chi_\\tau(x)\\]
                        <p>and they have the same irreducible factors (though possibly different multiplicities).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 7.26</div>
                    <div class="env-body">
                        <p>For an operator with elementary divisors \\(\\{(x-1)^3, (x-1)^2, (x-2)\\}\\):</p>
                        <ul>
                            <li>Characteristic polynomial: \\(\\chi_\\tau(x) = (x-1)^{3+2}(x-2) = (x-1)^5(x-2)\\)</li>
                            <li>Minimal polynomial: \\(m_\\tau(x) = (x-1)^3(x-2)\\)</li>
                            <li>Note: \\(m_\\tau | \\chi_\\tau\\) and they have the same roots \\(\\{1, 2\\}\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.27 (Trace and Determinant)</div>
                    <div class="env-body">
                        <p>Over an algebraically closed field with \\(\\chi_\\tau(x) = \\prod (x - \\lambda_i)\\):</p>
                        <ol>
                            <li>\\(\\operatorname{tr}(\\tau) = \\sum \\lambda_i\\) (sum of eigenvalues with multiplicity)</li>
                            <li>\\(\\det(\\tau) = \\prod \\lambda_i\\) (product of eigenvalues with multiplicity)</li>
                            <li>Both trace and determinant are similarity invariants</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>Both formulas follow from the Jordan canonical form. For \\(J = \\text{diag}(J_{k_1}(\\lambda_1), \\ldots)\\), we have \\(\\operatorname{tr}(J) = \\sum k_i \\lambda_i = \\sum \\lambda_i\\) (eigenvalues with multiplicity), and similarly for the determinant.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 7.28 (Nonderogatory Operator)</div>
                    <div class="env-body">
                        <p>An operator \\(\\tau\\) is <strong>nonderogatory</strong> if:</p>
                        \\[m_\\tau(x) = \\chi_\\tau(x)\\]
                        <p>Equivalently, \\(\\deg(m_\\tau) = \\dim(V)\\), or \\(V\\) is \\(\\tau\\)-cyclic.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 7.29 (Computing Functions of Operators)</div>
                    <div class="env-body">
                        <p>To compute \\(e^{tA}\\) for a matrix \\(A\\), use the Jordan form \\(A = PJP^{-1}\\):</p>
                        \\[e^{tA} = P e^{tJ} P^{-1}\\]
                        <p>For a Jordan block \\(J_k(\\lambda) = \\lambda I + N\\) with \\(N\\) nilpotent:</p>
                        \\[e^{tJ_k(\\lambda)} = e^{t\\lambda} e^{tN} = e^{t\\lambda} \\sum_{j=0}^{k-1} \\frac{t^j N^j}{j!}\\]
                        <p>This gives an explicit formula for the matrix exponential.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.30 (Spectral Mapping for Polynomials)</div>
                    <div class="env-body">
                        <p>If \\(p(x) \\in F[x]\\) and \\(\\tau \\in \\mathcal{L}(V)\\), then the eigenvalues of \\(p(\\tau)\\) are precisely \\(\\{p(\\lambda) : \\lambda \\in \\text{Spec}(\\tau)\\}\\):</p>
                        \\[\\text{Spec}(p(\\tau)) = p(\\text{Spec}(\\tau))\\]
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Computational Aspects</div>
                    <div class="env-body">
                        <p>While the characteristic polynomial is easier to compute than the minimal polynomial (via \\(\\det(xI - A)\\)), finding eigenvalues for large matrices remains computationally challenging. Numerical methods like QR iteration are typically used in practice.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="char-poly-viz"></div>
`,
            visualizations: [
                {
                    id: 'char-poly-viz',
                    title: 'Interactive: Characteristic vs Minimal Polynomial',
                    description: 'Compare the characteristic and minimal polynomials for different operators.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 400, scale: 1});

                        let config = 1;

                        VizEngine.createButton(controls, 'Nonderogatory: m = χ', () => {
                            config = 1;
                            draw();
                        });

                        VizEngine.createButton(controls, 'Diagonal: m ≠ χ', () => {
                            config = 2;
                            draw();
                        });

                        VizEngine.createButton(controls, 'General case', () => {
                            config = 3;
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            viz.screenText('Characteristic vs Minimal Polynomial', 300, 25, viz.colors.white, 18, 'center');

                            let mPoly = '';
                            let chiPoly = '';
                            let elemDiv = '';
                            let description = '';

                            if (config === 1) {
                                elemDiv = '{(x-1)³}';
                                mPoly = 'm(x) = (x-1)³';
                                chiPoly = 'χ(x) = (x-1)³';
                                description = 'Nonderogatory: Only one Jordan block per eigenvalue';

                            } else if (config === 2) {
                                elemDiv = '{(x-1), (x-1), (x-2), (x-2), (x-3)}';
                                mPoly = 'm(x) = (x-1)(x-2)(x-3)';
                                chiPoly = 'χ(x) = (x-1)²(x-2)²(x-3)';
                                description = 'Diagonalizable: All Jordan blocks size 1';

                            } else {
                                elemDiv = '{(x-1)³, (x-1)², (x-2)²}';
                                mPoly = 'm(x) = (x-1)³(x-2)²';
                                chiPoly = 'χ(x) = (x-1)⁵(x-2)²';
                                description = 'General: Multiple blocks, different sizes';
                            }

                            const startY = 80;
                            const boxW = 450;
                            const boxH = 50;
                            const boxX = (600 - boxW) / 2;

                            // Elementary divisors box
                            viz.ctx.fillStyle = viz.colors.blue + '22';
                            viz.ctx.fillRect(boxX, startY, boxW, boxH);
                            viz.ctx.strokeStyle = viz.colors.blue;
                            viz.ctx.lineWidth = 2;
                            viz.ctx.strokeRect(boxX, startY, boxW, boxH);
                            viz.screenText('Elementary divisors:', boxX + 10, startY + 20, viz.colors.blue, 14, 'left');
                            viz.screenText(elemDiv, boxX + boxW/2, startY + 35, viz.colors.white, 13, 'center');

                            // Minimal polynomial box
                            viz.ctx.fillStyle = viz.colors.orange + '22';
                            viz.ctx.fillRect(boxX, startY + 70, boxW, boxH);
                            viz.ctx.strokeStyle = viz.colors.orange;
                            viz.ctx.lineWidth = 2;
                            viz.ctx.strokeRect(boxX, startY + 70, boxW, boxH);
                            viz.screenText('Minimal polynomial:', boxX + 10, startY + 90, viz.colors.orange, 14, 'left');
                            viz.screenText(mPoly, boxX + boxW/2, startY + 105, viz.colors.white, 13, 'center');

                            // Characteristic polynomial box
                            viz.ctx.fillStyle = viz.colors.green + '22';
                            viz.ctx.fillRect(boxX, startY + 140, boxW, boxH);
                            viz.ctx.strokeStyle = viz.colors.green;
                            viz.ctx.lineWidth = 2;
                            viz.ctx.strokeRect(boxX, startY + 140, boxW, boxH);
                            viz.screenText('Characteristic polynomial:', boxX + 10, startY + 160, viz.colors.green, 14, 'left');
                            viz.screenText(chiPoly, boxX + boxW/2, startY + 175, viz.colors.white, 13, 'center');

                            // Description
                            viz.screenText(description, 300, startY + 220, viz.colors.text, 13, 'center');

                            // Key property
                            viz.screenText('Key: m(x) | χ(x) and they share the same roots', 300, startY + 250, viz.colors.purple, 13, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Give an example of two \\(4 \\times 4\\) matrices over \\(\\mathbb{C}\\) with the same characteristic and minimal polynomials but which are not similar.',
                    hint: 'The pair \\((m_A, \\chi_A)\\) is not a complete invariant. Look for matrices with the same polynomials but different elementary divisor multiplicities.',
                    solution: 'Let A have elementary divisors {(x-1)², (x-1)²} and B have elementary divisors {(x-1)³, (x-1)}. Both have m(x) = (x-1)³ and χ(x) = (x-1)⁴, but different Jordan forms: A ~ diag(J₂(1), J₂(1)) while B ~ diag(J₃(1), J₁(1)). Not similar.'
                },
                {
                    question: 'Prove that if \\(\\tau\\) is diagonalizable, then \\(m_\\tau(x)\\) has no repeated roots.',
                    hint: 'Diagonalizable means all Jordan blocks have size 1. What does this say about elementary divisors?',
                    solution: 'If τ is diagonalizable, all elementary divisors are distinct linear factors (x - λᵢ). Thus m_τ(x) = ∏(x - λᵢ) over distinct λᵢ, which has no repeated roots. Conversely, if m_τ has no repeated roots and F is algebraically closed, all elementary divisors are distinct linear factors, so τ is diagonalizable.'
                },
                {
                    question: 'Compute \\(A^{100}\\) where \\(A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}\\).',
                    hint: 'Write \\(A = I + N\\) where \\(N\\) is nilpotent. Use the binomial theorem.',
                    solution: 'A = I + N where N = [[0,1],[0,0]] with N² = 0. By binomial theorem: A¹⁰⁰ = ∑ᵏ₌₀¹⁰⁰ (100 choose k) Nᵏ = I + 100N = [[1, 100], [0, 1]].'
                }
            ]
        },
        {
            id: 'ch07-sec07',
            title: 'Summary and The Big Picture',
            content: `
                <h2>Summary and The Big Picture</h2>

                <p>We conclude by synthesizing the main results and presenting the grand unified picture of operator structure theory.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.31 (The Fundamental Structure Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be a finite-dimensional vector space over \\(F\\) and \\(\\tau \\in \\mathcal{L}(V)\\). Then:</p>
                        <ol>
                            <li><strong>(Primary decomposition)</strong> \\(V = V_1 \\oplus \\cdots \\oplus V_k\\) where \\(V_i = \\ker(p_i(\\tau)^{e_i})\\) for the prime factors \\(p_i\\) of \\(m_\\tau\\).</li>
                            <li><strong>(Cyclic decomposition)</strong> Each \\(V_i = \\bigoplus_j \\langle v_{i,j} \\rangle_\\tau\\) decomposes into \\(\\tau\\)-cyclic subspaces.</li>
                            <li><strong>(Elementary divisors)</strong> The multiset \\(\\{p_i(x)^{d_{i,j}}\\}\\) forms a complete invariant for similarity.</li>
                            <li><strong>(Canonical forms)</strong> Over algebraically closed fields, \\(\\tau\\) has a Jordan canonical form. Over any field, \\(\\tau\\) has a rational canonical form.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">The Big Picture</div>
                    <div class="env-body">
                        <p>The structure theory reveals that classifying operators up to similarity is equivalent to:</p>
                        <ul>
                            <li>Classifying \\(F[x]\\)-modules \\(V_\\tau\\) up to isomorphism</li>
                            <li>Classifying multisets of monic prime power polynomials (elementary divisors)</li>
                            <li>Classifying similarity classes of matrices</li>
                        </ul>
                        <p>This beautiful correspondence unifies abstract algebra (module theory), linear algebra (canonical forms), and invariant theory (elementary divisors).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="big-picture-viz"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Extensions and Generalizations</div>
                    <div class="env-body">
                        <p>The structure theory extends to:</p>
                        <ul>
                            <li><strong>Infinite-dimensional spaces:</strong> Spectral theory for compact and self-adjoint operators</li>
                            <li><strong>Several operators:</strong> Simultaneous canonical forms (when commutativity conditions hold)</li>
                            <li><strong>Non-commutative settings:</strong> Representation theory of algebras</li>
                            <li><strong>Continuous settings:</strong> Differential operators and spectral theory</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 7.32 (Complete Classification)</div>
                    <div class="env-body">
                        <p>Find all similarity classes of \\(5 \\times 5\\) complex matrices with \\(m(x) = (x-1)^2(x-2)\\).</p>
                        <p><strong>Solution:</strong> Elementary divisors must include \\((x-1)^2\\) and \\((x-2)\\). Remaining degrees sum to \\(5 - 2 - 1 = 2\\). Possibilities:</p>
                        <ol>
                            <li>\\(\\{(x-1)^2, (x-1)^2, (x-2)\\}\\) — Jordan form: \\(J_2(1) \\oplus J_2(1) \\oplus J_1(2)\\)</li>
                            <li>\\(\\{(x-1)^2, (x-1), (x-1), (x-2)\\}\\) — Jordan form: \\(J_2(1) \\oplus J_1(1) \\oplus J_1(1) \\oplus J_1(2)\\)</li>
                            <li>\\(\\{(x-1)^2, (x-2)^2, (x-2)\\}\\) — Jordan form: \\(J_2(1) \\oplus J_2(2) \\oplus J_1(2)\\)</li>
                            <li>\\(\\{(x-1)^2, (x-2), (x-2), (x-2)\\}\\) — Jordan form: \\(J_2(1) \\oplus J_1(2) \\oplus J_1(2) \\oplus J_1(2)\\)</li>
                        </ol>
                        <p>Total: <strong>4 distinct similarity classes</strong>.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 7.33 (Similarity Invariants Summary)</div>
                    <div class="env-body">
                        <p>The following are <strong>complete invariants</strong> for similarity (any one uniquely determines the similarity class):</p>
                        <ul>
                            <li>Multiset of elementary divisors</li>
                            <li>List of invariant factors (with divisibility)</li>
                            <li>Jordan canonical form (up to block reordering)</li>
                            <li>Rational canonical form (up to block reordering)</li>
                        </ul>
                        <p>The following are <strong>incomplete invariants</strong> (not sufficient alone):</p>
                        <ul>
                            <li>Characteristic polynomial \\(\\chi_\\tau(x)\\)</li>
                            <li>Minimal polynomial \\(m_\\tau(x)\\)</li>
                            <li>Pair \\((m_\\tau, \\chi_\\tau)\\)</li>
                            <li>Eigenvalues (spectrum)</li>
                            <li>Trace and determinant</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Common Pitfall</div>
                    <div class="env-body">
                        <p>Students often mistakenly believe that two operators with the same characteristic and minimal polynomials must be similar. This is <strong>false</strong>! The multiplicities of elementary divisors matter. Always verify the complete multiset of elementary divisors when checking similarity.</p>
                    </div>
                </div>
`,
            visualizations: [
                {
                    id: 'big-picture-viz',
                    title: 'The Big Picture: Connections',
                    description: 'Visualize the web of correspondences in structure theory.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 450, scale: 1});

                        function draw() {
                            viz.clear();

                            viz.screenText('The Structure Theory: Unified View', 300, 25, viz.colors.white, 18, 'center');

                            const centerX = 300;
                            const centerY = 225;
                            const radius = 140;

                            // Five key concepts arranged in a pentagon
                            const concepts = [
                                {name: 'Operators\nτ ∈ L(V)', angle: -Math.PI/2, color: viz.colors.blue},
                                {name: 'F[x]-Modules\nV_τ', angle: -Math.PI/2 + 2*Math.PI/5, color: viz.colors.orange},
                                {name: 'Elementary\nDivisors', angle: -Math.PI/2 + 4*Math.PI/5, color: viz.colors.green},
                                {name: 'Canonical\nForms', angle: -Math.PI/2 + 6*Math.PI/5, color: viz.colors.purple},
                                {name: 'Matrix\nSimilarity', angle: -Math.PI/2 + 8*Math.PI/5, color: viz.colors.teal}
                            ];

                            // Draw connections
                            viz.ctx.strokeStyle = viz.colors.text + '44';
                            viz.ctx.lineWidth = 1;
                            for (let i = 0; i < concepts.length; i++) {
                                const from = concepts[i];
                                const to = concepts[(i + 1) % concepts.length];

                                const x1 = centerX + radius * Math.cos(from.angle);
                                const y1 = centerY + radius * Math.sin(from.angle);
                                const x2 = centerX + radius * Math.cos(to.angle);
                                const y2 = centerY + radius * Math.sin(to.angle);

                                viz.ctx.beginPath();
                                viz.ctx.moveTo(x1, y1);
                                viz.ctx.lineTo(x2, y2);
                                viz.ctx.stroke();
                            }

                            // Draw center
                            viz.ctx.fillStyle = viz.colors.yellow + '44';
                            viz.ctx.beginPath();
                            viz.ctx.arc(centerX, centerY, 50, 0, 2*Math.PI);
                            viz.ctx.fill();
                            viz.ctx.strokeStyle = viz.colors.yellow;
                            viz.ctx.lineWidth = 2;
                            viz.ctx.stroke();
                            viz.screenText('Structure', centerX, centerY - 5, viz.colors.yellow, 14, 'center');
                            viz.screenText('Theory', centerX, centerY + 15, viz.colors.yellow, 14, 'center');

                            // Draw concept nodes
                            concepts.forEach(concept => {
                                const x = centerX + radius * Math.cos(concept.angle);
                                const y = centerY + radius * Math.sin(concept.angle);

                                viz.ctx.fillStyle = concept.color + '44';
                                viz.ctx.strokeStyle = concept.color;
                                viz.ctx.lineWidth = 2;
                                viz.ctx.beginPath();
                                viz.ctx.arc(x, y, 45, 0, 2*Math.PI);
                                viz.ctx.fill();
                                viz.ctx.stroke();

                                const lines = concept.name.split('\\n');
                                lines.forEach((line, i) => {
                                    viz.screenText(line, x, y - 8 + i * 16, viz.colors.white, 11, 'center');
                                });
                            });

                            // Draw equivalence labels
                            viz.screenText('≅ (isomorphism)', centerX + radius * 0.7, centerY - radius * 0.9, viz.colors.text, 10, 'center');
                            viz.screenText('~ (similarity)', centerX - radius * 0.7, centerY - radius * 0.9, viz.colors.text, 10, 'center');
                            viz.screenText('Complete Invariant', centerX, centerY + radius + 30, viz.colors.green, 11, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Classify all \\(6 \\times 6\\) complex matrices with characteristic polynomial \\(\\chi(x) = (x-1)^4(x-2)^2\\) and minimal polynomial \\(m(x) = (x-1)^2(x-2)^2\\) up to similarity.',
                    hint: 'The elementary divisors must multiply to χ and have lcm equal to m. List all partitions of exponents satisfying these constraints.',
                    solution: 'Elementary divisors must include (x-1)² and (x-2)². The remaining (x-1) factors (total power 4) must partition with max 2. Possibilities: (1) {(x-1)², (x-1)², (x-2)²}, (2) {(x-1)², (x-1), (x-1), (x-2)², (x-2)}. But (2) violates dim constraint. Answer: Only {(x-1)², (x-1)², (x-2)²}. One similarity class.'
                },
                {
                    question: 'Prove that two matrices are similar if and only if they have the same rational canonical form (up to block reordering).',
                    hint: 'Use the fact that the rational canonical form is uniquely determined by invariant factors.',
                    solution: 'The rational canonical form is uniquely determined by the invariant factors (Theorem 7.21), which form a complete invariant for similarity. Thus A ~ B iff they have the same invariant factors iff they have the same rational canonical form up to block order.'
                },
                {
                    question: 'Let \\(\\tau\\) have elementary divisors \\(\\{(x-\\lambda)^3, (x-\\lambda)^2\\}\\) over \\(\\mathbb{C}\\). Find a Jordan basis explicitly in terms of generalized eigenvectors.',
                    hint: 'For each Jordan block, start with a vector in ker((τ - λI)^k) but not in ker((τ - λI)^(k-1)), then apply (τ - λI) repeatedly.',
                    solution: 'Choose v₁ ∈ ker((τ-λI)³) \\ ker((τ-λI)²). Jordan chain: {v₁, (τ-λI)v₁, (τ-λI)²v₁}. Choose v₂ ∈ ker((τ-λI)²) \\ ker(τ-λI) independent of previous chain. Jordan chain: {v₂, (τ-λI)v₂}. Combined basis: {v₁, (τ-λI)v₁, (τ-λI)²v₁, v₂, (τ-λI)v₂}.'
                }
            ]
        }
    ]
});
