window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch10',
    number: 10,
    title: 'Structure Theory for Normal Operators',
    subtitle: 'Spectral theory, self-adjoint and unitary operators, polar decomposition',
    sections: [
        {
            id: 'ch10-sec01',
            title: 'Normal Operators and Basic Properties',
            content: `
                <h2>Normal Operators and Basic Properties</h2>

                <p>In this chapter, we study operators that commute with their adjoints. These operators, called <strong>normal operators</strong>, have remarkably nice properties and admit a complete spectral decomposition.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 10.1 (Normal Operator)</div>
                    <div class="env-body">
                        <p>A linear operator \\(\\tau\\) on an inner product space \\(V\\) is <strong>normal</strong> if it commutes with its adjoint:</p>
                        \\[\\tau\\tau^* = \\tau^*\\tau\\]
                        <p>A matrix \\(A \\in M_n(\\mathbb{F})\\) is <strong>normal</strong> if \\(AA^* = A^*A\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Normal operators are those that "play nicely" with their adjoints. They generalize several important classes:</p>
                        <ul>
                            <li><strong>Self-adjoint operators</strong>: \\(\\tau^* = \\tau\\) (real eigenvalues)</li>
                            <li><strong>Unitary/orthogonal operators</strong>: \\(\\tau^* = \\tau^{-1}\\) (eigenvalues on unit circle)</li>
                            <li><strong>Skew-adjoint operators</strong>: \\(\\tau^* = -\\tau\\) (purely imaginary eigenvalues)</li>
                        </ul>
                        <p>All of these commute with their adjoints and hence are normal. The spectral theorem will show that normal operators are precisely those that can be diagonalized with respect to an orthonormal basis.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.2 (Basic Properties of Normal Operators)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau \\in \\mathcal{L}(V)\\) be normal. Then:</p>
                        <ol>
                            <li>The following are also normal:
                                <ul>
                                    <li>\\(\\tau|_W\\), if \\(W\\) reduces \\((W, W^\\perp)\\)</li>
                                    <li>\\(\\tau^*\\)</li>
                                    <li>\\(\\tau^{-1}\\), if \\(\\tau\\) is invertible</li>
                                    <li>\\(p(\\tau)\\), for any polynomial \\(p(x) \\in \\mathbb{F}[x]\\)</li>
                                </ul>
                            </li>
                            <li>For any \\(v, w \\in V\\):
                                \\[\\langle \\tau v, \\tau w \\rangle = \\langle \\tau^* v, \\tau^* w \\rangle\\]
                                and in particular, \\(\\|\\tau v\\| = \\|\\tau^* v\\|\\).
                            </li>
                            <li>\\(\\ker(\\tau^*) = \\ker(\\tau)\\)</li>
                            <li>For any integer \\(k \\geq 0\\): \\(\\ker(\\tau^k) = \\ker(\\tau)\\)</li>
                            <li>The minimal polynomial \\(m_\\tau(x)\\) is a product of distinct prime monic polynomials.</li>
                            <li>If \\(\\lambda\\) and \\(\\mu\\) are distinct eigenvalues of \\(\\tau\\), then \\(E_\\lambda \\perp E_\\mu\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>We prove the key parts:</p>

                        <p><strong>Part 2:</strong> Normality implies that</p>
                        \\[\\langle \\tau v, \\tau w \\rangle = \\langle \\tau^*\\tau v, v \\rangle = \\langle \\tau\\tau^* v, v \\rangle = \\langle \\tau^* v, \\tau^* w \\rangle\\]

                        <p><strong>Part 3:</strong> We prove this first for the operator \\(S = \\tau^*\\tau\\), which is self-adjoint. If \\(S^k v = 0\\) for \\(k \\geq 1\\), then</p>
                        \\[0 = \\langle S^k v, v \\rangle = \\langle S^{k-1} v, S^{k-1} v \\rangle\\]
                        <p>so \\(S^{k-1} v = 0\\). Continuing gives \\(Sv = 0\\). Now, if \\(\\tau^k v = 0\\) for \\(k \\geq 1\\), then</p>
                        \\[(\\tau^*\\tau)^k v = 0\\]
                        <p>which implies \\(\\tau^*\\tau v = 0\\), hence \\(\\|\\tau v\\|^2 = \\langle \\tau v, \\tau v \\rangle = 0\\), so \\(\\tau v = 0\\).</p>

                        <p><strong>Part 6:</strong> For \\(v \\in E_\\lambda\\) and \\(w \\in E_\\mu\\):</p>
                        \\[\\lambda \\langle v, w \\rangle = \\langle \\tau v, w \\rangle = \\langle v, \\tau^* w \\rangle = \\langle v, \\overline{\\mu} w \\rangle = \\mu \\langle v, w \\rangle\\]
                        <p>Since \\(\\lambda \\neq \\mu\\), we have \\(\\langle v, w \\rangle = 0\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 10.3</div>
                    <div class="env-body">
                        <p>Consider the matrix</p>
                        \\[A = \\begin{pmatrix} 1 & i \\\\ -i & 1 \\end{pmatrix}\\]
                        <p>Then</p>
                        \\[A^* = \\begin{pmatrix} 1 & i \\\\ -i & 1 \\end{pmatrix}, \\quad AA^* = \\begin{pmatrix} 2 & 0 \\\\ 0 & 2 \\end{pmatrix} = A^*A\\]
                        <p>so \\(A\\) is normal. The eigenvalues are \\(\\lambda = 1 \\pm i\\), which are neither real (not self-adjoint) nor of unit modulus (not unitary), but the eigenvectors are orthogonal.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="normal-operator-viz"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The condition \\(\\|\\tau v\\| = \\|\\tau^* v\\|\\) for all \\(v\\) is actually equivalent to normality. This gives a geometric interpretation: normal operators preserve lengths equally in both directions (forward and adjoint).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'normal-operator-viz',
                    title: 'Interactive: Normal vs Non-Normal Operators',
                    description: 'Compare how normal and non-normal operators transform vectors',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 700, height: 400, scale: 50});

                        let isNormal = true;
                        const btn = VizEngine.createButton(controls, 'Toggle: Normal', () => {
                            isNormal = !isNormal;
                            btn.textContent = isNormal ? 'Toggle: Normal' : 'Toggle: Non-Normal';
                            draw();
                        });

                        const v = viz.addDraggable('v', 1.5, 1, viz.colors.blue, 8, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Normal operator: rotation by 30 degrees
                            const theta = Math.PI / 6;
                            const normalMatrix = [
                                [Math.cos(theta), -Math.sin(theta)],
                                [Math.sin(theta), Math.cos(theta)]
                            ];

                            // Non-normal operator: shear
                            const nonNormalMatrix = [[1, 1], [0, 1]];

                            const matrix = isNormal ? normalMatrix : nonNormalMatrix;
                            const Tv = VizEngine.matVec(matrix, [v.x, v.y]);

                            // Compute adjoint
                            const adjMatrix = isNormal ?
                                [[Math.cos(theta), Math.sin(theta)], [-Math.sin(theta), Math.cos(theta)]] :
                                [[1, 0], [1, 1]];
                            const Tadj_v = VizEngine.matVec(adjMatrix, [v.x, v.y]);

                            // Draw transformed vectors
                            viz.drawVector(0, 0, v.x, v.y, viz.colors.blue, 'v');
                            viz.drawVector(0, 0, Tv[0], Tv[1], viz.colors.orange, 'τv');
                            viz.drawVector(0, 0, Tadj_v[0], Tadj_v[1], viz.colors.teal, 'τ*v');

                            // Draw length comparison
                            const normTv = Math.sqrt(Tv[0]*Tv[0] + Tv[1]*Tv[1]);
                            const normTadj_v = Math.sqrt(Tadj_v[0]*Tadj_v[0] + Tadj_v[1]*Tadj_v[1]);

                            viz.drawText('‖τv‖ = ' + normTv.toFixed(2), -6, 4.5, viz.colors.orange, 14);
                            viz.drawText('‖τ*v‖ = ' + normTadj_v.toFixed(2), -6, 4, viz.colors.teal, 14);
                            viz.drawText(isNormal ? 'Normal: ‖τv‖ = ‖τ*v‖' : 'Non-normal: ‖τv‖ ≠ ‖τ*v‖',
                                -6, 3.5, isNormal ? viz.colors.green : viz.colors.red, 14);

                            viz.drawDraggables();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that if \\(\\tau\\) is normal, then \\(\\tau^*\\) is also normal.',
                    hint: 'Use the fact that \\(\\tau\\tau^* = \\tau^*\\tau\\) and check if \\(\\tau^*(\\tau^*)^* = (\\tau^*)^*\\tau^*\\).',
                    solution: 'Since \\((\\tau^*)^* = \\tau\\), we need to show \\(\\tau^*\\tau = \\tau\\tau^*\\). But this is exactly the condition for \\(\\tau\\) to be normal, which is given. Therefore \\(\\tau^*\\) is normal.'
                },
                {
                    question: 'Show that the sum of two normal operators need not be normal. Give a specific example in \\(\\mathbb{C}^2\\).',
                    hint: 'Consider a self-adjoint matrix and a skew-adjoint matrix.',
                    solution: 'Let \\(A = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}\\) (self-adjoint, hence normal) and \\(B = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}\\) (skew-adjoint, hence normal). Then \\(A + B = \\begin{pmatrix} 1 & 1 \\\\ -1 & 1 \\end{pmatrix}\\). We have \\((A+B)(A+B)^* = \\begin{pmatrix} 2 & 0 \\\\ 0 & 2 \\end{pmatrix}\\) but \\((A+B)^*(A+B) = \\begin{pmatrix} 2 & 2 \\\\ 2 & 2 \\end{pmatrix}\\). Since these are not equal, \\(A + B\\) is not normal.'
                },
                {
                    question: 'Prove that if \\(\\tau\\) is normal and \\(\\tau v = \\lambda v\\), then \\(\\tau^* v = \\overline{\\lambda} v\\).',
                    hint: 'Use the fact that \\(\\ker(\\tau - \\lambda I) = \\ker((\\tau - \\lambda I)^*)\\).',
                    solution: 'Since \\(\\tau\\) is normal, so is \\(\\tau - \\lambda I\\). Therefore \\(\\ker(\\tau - \\lambda I) = \\ker((\\tau - \\lambda I)^*) = \\ker(\\tau^* - \\overline{\\lambda}I)\\). Since \\(v \\in \\ker(\\tau - \\lambda I)\\), we have \\(v \\in \\ker(\\tau^* - \\overline{\\lambda}I)\\), which means \\(\\tau^* v = \\overline{\\lambda} v\\).'
                }
            ]
        },
        {
            id: 'ch10-sec02',
            title: 'The Spectral Theorem for Normal Operators',
            content: `
                <h2>The Spectral Theorem for Normal Operators</h2>

                <p>The spectral theorem is one of the most important results in linear algebra. It characterizes normal operators as precisely those that can be diagonalized with respect to an orthonormal basis.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 10.4 (Unitary/Orthogonal Diagonalizability)</div>
                    <div class="env-body">
                        <p>A linear operator \\(\\tau \\in \\mathcal{L}(V)\\) is <strong>unitarily diagonalizable</strong> (when \\(\\mathbb{F} = \\mathbb{C}\\)) or <strong>orthogonally diagonalizable</strong> (when \\(\\mathbb{F} = \\mathbb{R}\\)) if there exists an orthonormal basis \\(\\mathcal{B} = (v_1, \\ldots, v_n)\\) of \\(V\\) such that \\([\\tau]_\\mathcal{B}\\) is diagonal, or equivalently, if</p>
                        \\[\\tau v_i = \\lambda_i v_i\\]
                        <p>for all \\(i = 1, \\ldots, n\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.5 (Spectral Theorem: Complex Case)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be a finite-dimensional complex inner product space and let \\(\\tau \\in \\mathcal{L}(V)\\). The following are equivalent:</p>
                        <ol>
                            <li>\\(\\tau\\) is normal.</li>
                            <li>\\(\\tau\\) is unitarily diagonalizable, that is,
                                \\[V = E_{\\lambda_1} \\oplus \\cdots \\oplus E_{\\lambda_k}\\]
                                where the sum is orthogonal.
                            </li>
                            <li>\\(\\tau\\) has an orthogonal spectral resolution
                                \\[\\tau = \\lambda_1 \\pi_1 + \\cdots + \\lambda_k \\pi_k\\]
                                where \\(\\pi_1 + \\cdots + \\pi_k = I\\) and \\(\\pi_i\\) is orthogonal projection onto \\(E_{\\lambda_i}\\), with \\(\\pi_i \\pi_j = 0\\) for \\(i \\neq j\\).
                            </li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>(1) ⇒ (2):</strong> Suppose \\(\\tau\\) is normal. Since \\(\\mathbb{F} = \\mathbb{C}\\), the characteristic polynomial splits completely. Let \\(\\lambda_1, \\ldots, \\lambda_k\\) be the distinct eigenvalues.</p>

                        <p>By Theorem 10.2, the minimal polynomial \\(m_\\tau(x)\\) is a product of distinct linear factors:</p>
                        \\[m_\\tau(x) = (x - \\lambda_1) \\cdots (x - \\lambda_k)\\]

                        <p>By the primary decomposition theorem,</p>
                        \\[V = E_{\\lambda_1} \\oplus \\cdots \\oplus E_{\\lambda_k}\\]

                        <p>By Theorem 10.2(6), distinct eigenspaces are orthogonal, so this is an orthogonal direct sum. Taking an orthonormal basis for each eigenspace gives an orthonormal basis of eigenvectors for \\(V\\).</p>

                        <p><strong>(2) ⇒ (3):</strong> Let \\(\\pi_i\\) be orthogonal projection onto \\(E_{\\lambda_i}\\). Then \\(\\pi_1 + \\cdots + \\pi_k = I\\) (resolution of the identity), and for any \\(v \\in V\\):</p>
                        \\[\\tau v = \\tau(\\pi_1 v + \\cdots + \\pi_k v) = \\lambda_1 \\pi_1 v + \\cdots + \\lambda_k \\pi_k v\\]

                        <p><strong>(3) ⇒ (1):</strong> If \\(\\tau = \\sum \\lambda_i \\pi_i\\), then</p>
                        \\[\\tau^* = \\sum \\overline{\\lambda_i} \\pi_i\\]
                        <p>Since the projections commute, \\(\\tau\\tau^* = \\tau^*\\tau\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="spectral-decomposition-viz"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.6 (Spectral Theorem: Real Case)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be a finite-dimensional real inner product space and let \\(\\tau \\in \\mathcal{L}(V)\\). Then \\(\\tau\\) is normal if and only if</p>
                        \\[V = E_{\\lambda_1} \\oplus \\cdots \\oplus E_{\\lambda_r} \\oplus W_1 \\oplus \\cdots \\oplus W_s\\]
                        <p>where \\(\\{\\lambda_1, \\ldots, \\lambda_r\\}\\) is the spectrum of \\(\\tau\\) and each \\(W_j\\) is a two-dimensional indecomposable \\(\\tau\\)-invariant subspace with an ordered basis \\(\\mathcal{B}_j\\) for which</p>
                        \\[[\\tau]_{\\mathcal{B}_j} = \\begin{pmatrix} a_j & -b_j \\\\ b_j & a_j \\end{pmatrix}\\]
                        <p>where \\(b_j \\neq 0\\) and \\(a_j \\pm ib_j\\) are complex conjugate eigenvalues.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The spectral theorem says that normal operators are as simple as possible: they can be completely understood by looking at how they act on orthogonal eigenspaces. In the complex case, we get a complete orthogonal decomposition into one-dimensional eigenspaces. In the real case, we may have two-dimensional rotation blocks corresponding to complex conjugate eigenvalue pairs.</p>

                        <p>This is why normal operators are so important in applications: they are precisely the operators that can be "diagonalized" in a way that respects the inner product structure.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 10.7</div>
                    <div class="env-body">
                        <p>Consider the \\(3 \\times 3\\) diagonal matrix</p>
                        \\[A = \\begin{pmatrix} 2 & 0 & 0 \\\\ 0 & -1 & 0 \\\\ 0 & 0 & 3 \\end{pmatrix}\\]
                        <p>This is obviously normal (in fact, self-adjoint). Its spectral decomposition is</p>
                        \\[A = 2\\pi_1 + (-1)\\pi_2 + 3\\pi_3\\]
                        <p>where \\(\\pi_i\\) is projection onto the \\(i\\)-th coordinate axis.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'spectral-decomposition-viz',
                    title: 'Interactive: Spectral Decomposition in ℝ²',
                    description: 'See how a normal operator decomposes space into orthogonal eigenspaces',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 700, height: 400, scale: 50});

                        const slider = VizEngine.createSlider(controls, 'Angle θ', 0, 360, 45, 1, () => draw());
                        const scaleSlider = VizEngine.createSlider(controls, 'Scale λ₂/λ₁', 0.5, 3, 2, 0.1, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const theta = slider.value * Math.PI / 180;
                            const scale = parseFloat(scaleSlider.value);

                            // Rotation matrix
                            const c = Math.cos(theta);
                            const s = Math.sin(theta);
                            const R = [[c, -s], [s, c]];

                            // Diagonal matrix
                            const D = [[2, 0], [0, scale]];

                            // Normal operator A = R D R^T
                            const RT = [[c, s], [-s, c]];
                            const RD = VizEngine.matMul(R, D);
                            const A = VizEngine.matMul(RD, RT);

                            // Eigenvectors (columns of R)
                            const e1 = [c, s];
                            const e2 = [-s, c];

                            // Draw eigenspaces
                            for (let t = -10; t <= 10; t += 0.5) {
                                viz.drawPoint(t * e1[0], t * e1[1], viz.colors.blue + '22', null, 2);
                                viz.drawPoint(t * e2[0], t * e2[1], viz.colors.orange + '22', null, 2);
                            }

                            // Draw eigenvectors
                            viz.drawVector(0, 0, e1[0], e1[1], viz.colors.blue, 'e₁ (λ₁=2)');
                            viz.drawVector(0, 0, e2[0], e2[1], viz.colors.orange, 'e₂ (λ₂=' + scale.toFixed(1) + ')');

                            // Show a test vector and its image
                            const v = [1.5, 1];
                            const Av = VizEngine.matVec(A, v);
                            viz.drawVector(0, 0, v[0], v[1], viz.colors.teal, 'v', 2, true);
                            viz.drawVector(0, 0, Av[0], Av[1], viz.colors.green, 'τv', 3);

                            // Decomposition
                            const alpha1 = (v[0] * e1[0] + v[1] * e1[1]);
                            const alpha2 = (v[0] * e2[0] + v[1] * e2[1]);
                            const proj1 = [alpha1 * e1[0], alpha1 * e1[1]];
                            const proj2 = [alpha2 * e2[0], alpha2 * e2[1]];

                            viz.drawSegment(0, 0, proj1[0], proj1[1], viz.colors.blue + '88', 2, true);
                            viz.drawSegment(0, 0, proj2[0], proj2[1], viz.colors.orange + '88', 2, true);

                            viz.drawText('τ = 2π₁ + ' + scale.toFixed(1) + 'π₂', -6, 4.5, viz.colors.white, 14);
                            viz.drawText('Eigenspaces are orthogonal', -6, 4, viz.colors.text, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that a \\(2 \\times 2\\) complex matrix \\(A\\) is normal if and only if it is unitarily similar to a diagonal matrix.',
                    hint: 'Use the spectral theorem.',
                    solution: 'By the spectral theorem, \\(A\\) is normal iff it is unitarily diagonalizable. This means there exists a unitary matrix \\(U\\) such that \\(U^*AU = D\\) is diagonal, i.e., \\(A\\) is unitarily similar to \\(D\\).'
                },
                {
                    question: 'Let \\(\\tau\\) be a normal operator on \\(\\mathbb{C}^3\\) with eigenvalues \\(1, i, -i\\). Write down the spectral decomposition of \\(\\tau\\) in terms of the orthogonal projections \\(\\pi_1, \\pi_2, \\pi_3\\).',
                    hint: 'Use the formula \\(\\tau = \\sum \\lambda_i \\pi_i\\).',
                    solution: 'The spectral decomposition is \\(\\tau = 1 \\cdot \\pi_1 + i \\cdot \\pi_2 + (-i) \\cdot \\pi_3\\), where \\(\\pi_j\\) is orthogonal projection onto \\(E_{\\lambda_j}\\).'
                },
                {
                    question: 'Show that if \\(\\tau\\) is a normal operator with spectral decomposition \\(\\tau = \\sum \\lambda_i \\pi_i\\), then \\(\\tau^2 = \\sum \\lambda_i^2 \\pi_i\\).',
                    hint: 'Use the fact that \\(\\pi_i \\pi_j = 0\\) for \\(i \\neq j\\) and \\(\\pi_i^2 = \\pi_i\\).',
                    solution: '\\(\\tau^2 = (\\sum \\lambda_i \\pi_i)(\\sum \\lambda_j \\pi_j) = \\sum_{i,j} \\lambda_i \\lambda_j \\pi_i \\pi_j = \\sum_i \\lambda_i^2 \\pi_i^2 = \\sum_i \\lambda_i^2 \\pi_i\\).'
                }
            ]
        },
        {
            id: 'ch10-sec03',
            title: 'Self-Adjoint Operators',
            content: `
                <h2>Self-Adjoint Operators</h2>

                <p>Self-adjoint operators (also called Hermitian operators in the complex case and symmetric operators in the real case) are normal operators with a special property: their eigenvalues are all real.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 10.8 (Self-Adjoint Operator)</div>
                    <div class="env-body">
                        <p>A linear operator \\(\\tau \\in \\mathcal{L}(V)\\) is <strong>self-adjoint</strong> (or <strong>Hermitian</strong> when \\(\\mathbb{F} = \\mathbb{C}\\), or <strong>symmetric</strong> when \\(\\mathbb{F} = \\mathbb{R}\\)) if</p>
                        \\[\\tau^* = \\tau\\]
                        <p>A matrix \\(A\\) is self-adjoint if \\(A^* = A\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.9 (Properties of Self-Adjoint Operators)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be a finite-dimensional inner product space and let \\(\\tau, \\sigma \\in \\mathcal{L}(V)\\).</p>
                        <ol>
                            <li>If \\(\\tau\\) and \\(\\sigma\\) are self-adjoint, then so are:
                                <ul>
                                    <li>\\(\\tau + \\sigma\\)</li>
                                    <li>\\(\\tau^{-1}\\), if \\(\\tau\\) is invertible</li>
                                    <li>\\(p(\\tau)\\), for any polynomial \\(p(x) \\in \\mathbb{R}[x]\\)</li>
                                </ul>
                            </li>
                            <li>A complex operator \\(\\tau\\) is Hermitian if and only if \\(\\langle \\tau v, v \\rangle\\) is real for all \\(v \\in V\\).</li>
                            <li>All eigenvalues of a self-adjoint operator are real.</li>
                            <li>The characteristic polynomial of a self-adjoint operator splits over \\(\\mathbb{R}\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>Part 2:</strong> If \\(\\tau\\) is Hermitian, then</p>
                        \\[\\langle \\tau v, v \\rangle = \\langle v, \\tau^* v \\rangle = \\langle v, \\tau v \\rangle = \\overline{\\langle \\tau v, v \\rangle}\\]
                        <p>so \\(\\langle \\tau v, v \\rangle\\) is real. Conversely, if \\(\\langle \\tau v, v \\rangle \\in \\mathbb{R}\\), then</p>
                        \\[\\langle v, \\tau v \\rangle = \\overline{\\langle \\tau v, v \\rangle} = \\langle \\tau v, v \\rangle = \\langle v, \\tau^* v \\rangle\\]
                        <p>The polarization identity then implies \\(\\tau = \\tau^*\\).</p>

                        <p><strong>Part 3:</strong> If \\(\\tau v = \\lambda v\\) with \\(v \\neq 0\\), then</p>
                        \\[\\lambda \\|v\\|^2 = \\langle \\lambda v, v \\rangle = \\langle \\tau v, v \\rangle = \\langle v, \\tau^* v \\rangle = \\langle v, \\tau v \\rangle = \\overline{\\lambda} \\|v\\|^2\\]
                        <p>Therefore \\(\\lambda = \\overline{\\lambda}\\), so \\(\\lambda \\in \\mathbb{R}\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="self-adjoint-viz"></div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 10.10</div>
                    <div class="env-body">
                        <p>A self-adjoint operator on a finite-dimensional inner product space is orthogonally/unitarily diagonalizable with real eigenvalues. Conversely, among normal operators, the self-adjoint operators are precisely those with all real eigenvalues.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 10.11</div>
                    <div class="env-body">
                        <p>The matrix</p>
                        \\[A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 3 \\end{pmatrix}\\]
                        <p>is symmetric (hence self-adjoint). Its eigenvalues are</p>
                        \\[\\lambda = \\frac{5 \\pm \\sqrt{5}}{2}\\]
                        <p>which are both real. The corresponding eigenvectors are orthogonal.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Self-adjoint operators arise naturally in many applications:</p>
                        <ul>
                            <li><strong>Physics:</strong> Observables in quantum mechanics are represented by Hermitian operators.</li>
                            <li><strong>Geometry:</strong> The shape operator of a surface is self-adjoint.</li>
                            <li><strong>Optimization:</strong> The Hessian matrix of a real-valued function is symmetric.</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'self-adjoint-viz',
                    title: 'Interactive: Self-Adjoint Operator Eigenvalues',
                    description: 'Explore how self-adjoint matrices always have real eigenvalues',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 700, height: 400, scale: 60});

                        const aSlider = VizEngine.createSlider(controls, 'a (diagonal)', -3, 3, 2, 0.1, () => draw());
                        const bSlider = VizEngine.createSlider(controls, 'b (off-diagonal)', -3, 3, 1, 0.1, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const a = parseFloat(aSlider.value);
                            const b = parseFloat(bSlider.value);

                            // Self-adjoint matrix
                            const A = [[a, b], [b, a]];

                            // Compute eigenvalues
                            const trace = 2 * a;
                            const det = a * a - b * b;
                            const disc = trace * trace - 4 * det;
                            const lambda1 = (trace + Math.sqrt(Math.abs(disc))) / 2;
                            const lambda2 = (trace - Math.sqrt(Math.abs(disc))) / 2;

                            // Eigenvectors
                            let e1, e2;
                            if (Math.abs(b) > 0.01) {
                                e1 = [b, lambda1 - a];
                                e2 = [b, lambda2 - a];
                                e1 = VizEngine.normalize(e1);
                                e2 = VizEngine.normalize(e2);
                            } else {
                                e1 = [1, 0];
                                e2 = [0, 1];
                            }

                            // Draw eigenspaces
                            for (let t = -8; t <= 8; t += 0.4) {
                                viz.drawPoint(t * e1[0], t * e1[1], viz.colors.blue + '22', null, 2);
                                viz.drawPoint(t * e2[0], t * e2[1], viz.colors.orange + '22', null, 2);
                            }

                            // Draw eigenvectors
                            viz.drawVector(0, 0, 1.5 * e1[0], 1.5 * e1[1], viz.colors.blue, 'e₁');
                            viz.drawVector(0, 0, 1.5 * e2[0], 1.5 * e2[1], viz.colors.orange, 'e₂');

                            // Check orthogonality
                            const dot = e1[0] * e2[0] + e1[1] * e2[1];

                            // Display info
                            viz.drawText('A = [' + a.toFixed(1) + ', ' + b.toFixed(1) + '; ' + b.toFixed(1) + ', ' + a.toFixed(1) + ']', -5, 5, viz.colors.white, 14);
                            viz.drawText('λ₁ = ' + lambda1.toFixed(2) + ' (real)', -5, 4.5, viz.colors.blue, 14);
                            viz.drawText('λ₂ = ' + lambda2.toFixed(2) + ' (real)', -5, 4, viz.colors.orange, 14);
                            viz.drawText('⟨e₁, e₂⟩ = ' + dot.toFixed(3) + ' ≈ 0', -5, 3.5, viz.colors.green, 14);
                            viz.drawText('Eigenspaces orthogonal!', -5, 3, viz.colors.text, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that if \\(A\\) is a Hermitian matrix, then \\(iA\\) is skew-Hermitian (i.e., \\((iA)^* = -iA\\)).',
                    hint: 'Use \\((iA)^* = -i A^*\\).',
                    solution: 'We have \\((iA)^* = \\overline{i} A^* = -i A^*\\). Since \\(A\\) is Hermitian, \\(A^* = A\\), so \\((iA)^* = -iA\\). Thus \\(iA\\) is skew-Hermitian.'
                },
                {
                    question: 'Prove that every complex matrix \\(A\\) can be uniquely written as \\(A = H + iK\\) where \\(H\\) and \\(K\\) are Hermitian matrices.',
                    hint: 'Consider \\(H = (A + A^*)/2\\) and \\(K = (A - A^*)/(2i)\\).',
                    solution: 'Define \\(H = \\frac{1}{2}(A + A^*)\\) and \\(K = \\frac{1}{2i}(A - A^*)\\). Then \\(H^* = \\frac{1}{2}(A^* + A) = H\\) and \\(K^* = \\frac{-1}{2i}(A^* - A) = K\\), so both are Hermitian. Also, \\(H + iK = \\frac{1}{2}(A + A^*) + i \\cdot \\frac{1}{2i}(A - A^*) = \\frac{1}{2}(A + A^*) + \\frac{1}{2}(A - A^*) = A\\). For uniqueness, if \\(A = H_1 + iK_1 = H_2 + iK_2\\), then \\(H_1 - H_2 = i(K_2 - K_1)\\). Taking adjoints gives \\(H_1 - H_2 = -i(K_2 - K_1)\\), so \\(H_1 = H_2\\) and \\(K_1 = K_2\\).'
                },
                {
                    question: 'Let \\(\\tau\\) be self-adjoint. Show that \\(\\ker(\\tau) = \\text{im}(\\tau)^\\perp\\).',
                    hint: 'Use the fact that \\(\\ker(\\tau^*) = \\text{im}(\\tau)^\\perp\\) and \\(\\tau^* = \\tau\\).',
                    solution: 'We always have \\(\\ker(\\tau^*) = \\text{im}(\\tau)^\\perp\\). Since \\(\\tau\\) is self-adjoint, \\(\\tau^* = \\tau\\), so \\(\\ker(\\tau) = \\ker(\\tau^*) = \\text{im}(\\tau)^\\perp\\).'
                }
            ]
        },
        {
            id: 'ch10-sec04',
            title: 'Unitary and Orthogonal Operators',
            content: `
                <h2>Unitary and Orthogonal Operators</h2>

                <p>Unitary operators (in complex spaces) and orthogonal operators (in real spaces) are the isometries that preserve the inner product structure. They are characterized by the property that their adjoint equals their inverse.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 10.12 (Unitary/Orthogonal Operator)</div>
                    <div class="env-body">
                        <p>A linear operator \\(\\tau \\in \\mathcal{L}(V)\\) is <strong>unitary</strong> (when \\(\\mathbb{F} = \\mathbb{C}\\)) or <strong>orthogonal</strong> (when \\(\\mathbb{F} = \\mathbb{R}\\)) if \\(\\tau\\) is invertible and</p>
                        \\[\\tau^* = \\tau^{-1}\\]
                        <p>Equivalently, \\(\\tau^*\\tau = \\tau\\tau^* = I\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.13 (Characterizations of Unitary/Orthogonal Operators)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be a finite-dimensional inner product space and let \\(\\tau \\in \\mathcal{L}(V)\\). The following are equivalent:</p>
                        <ol>
                            <li>\\(\\tau\\) is unitary/orthogonal.</li>
                            <li>\\(\\tau\\) is an isometric isomorphism, i.e., \\(\\|\\tau v\\| = \\|v\\|\\) for all \\(v \\in V\\).</li>
                            <li>\\(\\tau\\) preserves inner products: \\(\\langle \\tau v, \\tau w \\rangle = \\langle v, w \\rangle\\) for all \\(v, w \\in V\\).</li>
                            <li>\\(\\tau\\) maps some orthonormal basis to an orthonormal basis.</li>
                            <li>\\(\\tau\\) maps every orthonormal basis to an orthonormal basis.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>(1) ⇒ (3):</strong> If \\(\\tau^*\\tau = I\\), then</p>
                        \\[\\langle \\tau v, \\tau w \\rangle = \\langle v, \\tau^*\\tau w \\rangle = \\langle v, w \\rangle\\]

                        <p><strong>(3) ⇒ (2):</strong> Taking \\(w = v\\) gives \\(\\|\\tau v\\|^2 = \\|v\\|^2\\), so \\(\\tau\\) is an isometry. Since \\(V\\) is finite-dimensional, an isometry is automatically surjective, hence an isomorphism.</p>

                        <p><strong>(2) ⇒ (1):</strong> If \\(\\tau\\) is an isometric isomorphism, then</p>
                        \\[\\langle v, w \\rangle = \\frac{1}{4}(\\|v + w\\|^2 - \\|v - w\\|^2) = \\frac{1}{4}(\\|\\tau(v+w)\\|^2 - \\|\\tau(v-w)\\|^2) = \\langle \\tau v, \\tau w \\rangle\\]
                        <p>Therefore \\(\\langle v, w \\rangle = \\langle v, \\tau^*\\tau w \\rangle\\) for all \\(v, w\\), which implies \\(\\tau^*\\tau = I\\).</p>

                        <p><strong>(3) ⇔ (4) ⇔ (5):</strong> If \\(\\{e_1, \\ldots, e_n\\}\\) is an orthonormal basis, then \\(\\{\\tau e_1, \\ldots, \\tau e_n\\}\\) is orthonormal iff \\(\\langle \\tau e_i, \\tau e_j \\rangle = \\delta_{ij}\\) iff (3) holds.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="unitary-operator-viz"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.14 (Eigenvalues of Unitary/Orthogonal Operators)</div>
                    <div class="env-body">
                        <p>If \\(\\tau\\) is unitary/orthogonal and \\(\\tau v = \\lambda v\\) with \\(v \\neq 0\\), then \\(|\\lambda| = 1\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Since \\(\\tau\\) is an isometry,</p>
                        \\[\\|v\\| = \\|\\tau v\\| = \\|\\lambda v\\| = |\\lambda| \\|v\\|\\]
                        <p>Therefore \\(|\\lambda| = 1\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 10.15</div>
                    <div class="env-body">
                        <p>Among normal operators, the unitary/orthogonal operators are precisely those whose eigenvalues all have absolute value 1.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 10.16</div>
                    <div class="env-body">
                        <p>The rotation matrix</p>
                        \\[R_\\theta = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}\\]
                        <p>is orthogonal. Its complex eigenvalues are \\(e^{i\\theta}\\) and \\(e^{-i\\theta}\\), both of which have absolute value 1.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>For a matrix \\(U\\) to be unitary, it is equivalent that the columns (or rows) form an orthonormal set. This is because \\(U^*U = I\\) means the columns are orthonormal, while \\(UU^* = I\\) means the rows are orthonormal.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'unitary-operator-viz',
                    title: 'Interactive: Unitary Transformation as Rotation',
                    description: 'See how unitary operators preserve lengths and angles',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 700, height: 400, scale: 60});

                        const angleSlider = VizEngine.createSlider(controls, 'Rotation angle', 0, 360, 30, 1, () => draw());

                        const v1 = viz.addDraggable('v1', 1.5, 0.5, viz.colors.blue, 8, () => draw());
                        const v2 = viz.addDraggable('v2', 0.5, 1.5, viz.colors.orange, 8, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const theta = angleSlider.value * Math.PI / 180;
                            const c = Math.cos(theta);
                            const s = Math.sin(theta);
                            const U = [[c, -s], [s, c]];

                            // Transform vectors
                            const Uv1 = VizEngine.matVec(U, [v1.x, v1.y]);
                            const Uv2 = VizEngine.matVec(U, [v2.x, v2.y]);

                            // Draw original vectors
                            viz.drawVector(0, 0, v1.x, v1.y, viz.colors.blue, 'v₁', 2, true);
                            viz.drawVector(0, 0, v2.x, v2.y, viz.colors.orange, 'v₂', 2, true);

                            // Draw transformed vectors
                            viz.drawVector(0, 0, Uv1[0], Uv1[1], viz.colors.blue, 'Uv₁', 3);
                            viz.drawVector(0, 0, Uv2[0], Uv2[1], viz.colors.orange, 'Uv₂', 3);

                            // Compute norms
                            const norm_v1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
                            const norm_Uv1 = Math.sqrt(Uv1[0] * Uv1[0] + Uv1[1] * Uv1[1]);
                            const norm_v2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
                            const norm_Uv2 = Math.sqrt(Uv2[0] * Uv2[0] + Uv2[1] * Uv2[1]);

                            // Compute angle between vectors
                            const dot_orig = v1.x * v2.x + v1.y * v2.y;
                            const dot_trans = Uv1[0] * Uv2[0] + Uv1[1] * Uv2[1];
                            const angle_orig = Math.acos(dot_orig / (norm_v1 * norm_v2)) * 180 / Math.PI;
                            const angle_trans = Math.acos(dot_trans / (norm_Uv1 * norm_Uv2)) * 180 / Math.PI;

                            // Display info
                            viz.drawText('Unitary operator U (rotation by ' + angleSlider.value + '°)', -5, 5.5, viz.colors.white, 14);
                            viz.drawText('‖v₁‖ = ' + norm_v1.toFixed(2) + ', ‖Uv₁‖ = ' + norm_Uv1.toFixed(2), -5, 5, viz.colors.blue, 12);
                            viz.drawText('‖v₂‖ = ' + norm_v2.toFixed(2) + ', ‖Uv₂‖ = ' + norm_Uv2.toFixed(2), -5, 4.5, viz.colors.orange, 12);
                            viz.drawText('Angle preserved: ' + angle_orig.toFixed(1) + '° → ' + angle_trans.toFixed(1) + '°', -5, 4, viz.colors.green, 12);
                            viz.drawText('Lengths and angles preserved!', -5, 3.5, viz.colors.text, 12);

                            viz.drawDraggables();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the product of two unitary operators is unitary.',
                    hint: 'Use \\((UV)^* = V^*U^*\\).',
                    solution: 'Let \\(U\\) and \\(V\\) be unitary. Then \\((UV)^*(UV) = V^*U^*UV = V^*V = I\\). Similarly \\((UV)(UV)^* = I\\). Therefore \\(UV\\) is unitary.'
                },
                {
                    question: 'Prove that if \\(U\\) is a unitary matrix, then \\(|\\det(U)| = 1\\).',
                    hint: 'Use \\(\\det(U^*U) = 1\\).',
                    solution: 'Since \\(U^*U = I\\), we have \\(\\det(U^*U) = \\det(U^*)\\det(U) = \\overline{\\det(U)}\\det(U) = |\\det(U)|^2 = 1\\). Therefore \\(|\\det(U)| = 1\\).'
                },
                {
                    question: 'Show that a \\(2 \\times 2\\) real orthogonal matrix with determinant 1 is a rotation matrix.',
                    hint: 'Use the fact that the columns form an orthonormal basis.',
                    solution: 'Let \\(Q = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\) be orthogonal. Then the columns satisfy \\(a^2 + c^2 = 1\\) and \\(b^2 + d^2 = 1\\), so we can write \\(a = \\cos\\theta\\), \\(c = \\sin\\theta\\) for some \\(\\theta\\). Orthogonality of columns gives \\(ab + cd = 0\\), which implies \\(b = -\\sin\\theta\\), \\(d = \\cos\\theta\\) (using \\(\\det(Q) = 1\\)). Therefore \\(Q = R_\\theta\\).'
                }
            ]
        },
        {
            id: 'ch10-sec05',
            title: 'Positive Operators and Square Roots',
            content: `
                <h2>Positive Operators and Square Roots</h2>

                <p>Positive operators are self-adjoint operators with nonnegative eigenvalues. They play a crucial role in the polar decomposition and have a unique positive square root.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 10.17 (Positive Operator)</div>
                    <div class="env-body">
                        <p>A self-adjoint operator \\(\\tau \\in \\mathcal{L}(V)\\) is:</p>
                        <ul>
                            <li><strong>Positive</strong> if \\(\\langle \\tau v, v \\rangle \\geq 0\\) for all \\(v \\in V\\).</li>
                            <li><strong>Positive definite</strong> if \\(\\langle \\tau v, v \\rangle > 0\\) for all \\(v \\neq 0\\).</li>
                        </ul>
                        <p>We write \\(\\tau \\geq 0\\) for positive and \\(\\tau > 0\\) for positive definite.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.18 (Characterization of Positive Operators)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau\\) be a self-adjoint operator. The following are equivalent:</p>
                        <ol>
                            <li>\\(\\tau\\) is positive.</li>
                            <li>All eigenvalues of \\(\\tau\\) are nonnegative.</li>
                            <li>\\(\\tau = \\sigma^*\\sigma\\) for some operator \\(\\sigma\\).</li>
                            <li>\\(\\tau\\) has a positive square root, i.e., there exists a positive operator \\(\\rho\\) with \\(\\rho^2 = \\tau\\).</li>
                        </ol>
                        <p>Moreover, the positive square root in (4) is unique.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>(1) ⇒ (2):</strong> If \\(\\tau v = \\lambda v\\) with \\(v \\neq 0\\), then</p>
                        \\[\\lambda \\|v\\|^2 = \\langle \\lambda v, v \\rangle = \\langle \\tau v, v \\rangle \\geq 0\\]
                        <p>so \\(\\lambda \\geq 0\\).</p>

                        <p><strong>(2) ⇒ (4):</strong> Let \\(\\tau = \\sum \\lambda_i \\pi_i\\) be the spectral decomposition with \\(\\lambda_i \\geq 0\\). Define</p>
                        \\[\\rho = \\sum \\sqrt{\\lambda_i} \\pi_i\\]
                        <p>Then \\(\\rho\\) is self-adjoint, positive, and \\(\\rho^2 = \\sum \\lambda_i \\pi_i = \\tau\\).</p>

                        <p><strong>Uniqueness:</strong> If \\(\\rho_1^2 = \\rho_2^2 = \\tau\\) with both positive, then they have the same eigenspaces (those of \\(\\tau\\)) and on each eigenspace \\(E_{\\lambda_i}\\), both act as multiplication by \\(\\sqrt{\\lambda_i}\\). Therefore \\(\\rho_1 = \\rho_2\\).</p>

                        <p><strong>(4) ⇒ (3):</strong> Take \\(\\sigma = \\rho\\).</p>

                        <p><strong>(3) ⇒ (1):</strong> If \\(\\tau = \\sigma^*\\sigma\\), then</p>
                        \\[\\langle \\tau v, v \\rangle = \\langle \\sigma^*\\sigma v, v \\rangle = \\langle \\sigma v, \\sigma v \\rangle = \\|\\sigma v\\|^2 \\geq 0\\]
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="positive-operator-viz"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition 10.19 (Square Root Notation)</div>
                    <div class="env-body">
                        <p>For a positive operator \\(\\tau\\), we denote its unique positive square root by \\(\\sqrt{\\tau}\\) or \\(\\tau^{1/2}\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 10.20</div>
                    <div class="env-body">
                        <p>The matrix</p>
                        \\[A = \\begin{pmatrix} 5 & 2 \\\\ 2 & 2 \\end{pmatrix}\\]
                        <p>is symmetric with eigenvalues \\(\\lambda_1 = 6\\) and \\(\\lambda_2 = 1\\), both positive. Therefore \\(A\\) is positive definite. Its square root can be computed by diagonalizing:</p>
                        \\[A = PDP^T, \\quad \\sqrt{A} = P\\sqrt{D}P^T = P\\begin{pmatrix} \\sqrt{6} & 0 \\\\ 0 & 1 \\end{pmatrix}P^T\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.21</div>
                    <div class="env-body">
                        <p>If \\(\\tau\\) and \\(\\sigma\\) are positive operators and \\(\\tau\\sigma = \\sigma\\tau\\), then \\(\\tau\\sigma\\) is positive.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Since \\(\\tau\\) and \\(\\sigma\\) are positive, they have positive square roots \\(\\sqrt{\\tau}\\) and \\(\\sqrt{\\sigma}\\), which are polynomials in \\(\\tau\\) and \\(\\sigma\\) respectively. Since \\(\\tau\\sigma = \\sigma\\tau\\), we have \\(\\sqrt{\\tau}\\sqrt{\\sigma} = \\sqrt{\\sigma}\\sqrt{\\tau}\\). Therefore</p>
                        \\[\\tau\\sigma = (\\sqrt{\\tau}\\sqrt{\\sigma})^2 = (\\sqrt{\\sigma}\\sqrt{\\tau})^*\\sqrt{\\sigma}\\sqrt{\\tau}\\]
                        <p>which shows \\(\\tau\\sigma\\) is positive.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The positivity condition \\(\\langle \\tau v, v \\rangle \\geq 0\\) is called the <strong>quadratic form</strong> of \\(\\tau\\). Positive operators generalize the notion of positive real numbers to the operator setting, just as self-adjoint operators generalize real numbers and unitary operators generalize complex numbers of modulus 1.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'positive-operator-viz',
                    title: 'Interactive: Positive Operator Quadratic Form',
                    description: 'Visualize ⟨τv, v⟩ ≥ 0 for all vectors v',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 700, height: 400, scale: 60});

                        const lambda1Slider = VizEngine.createSlider(controls, 'λ₁ (eigenvalue 1)', 0, 4, 2, 0.1, () => draw());
                        const lambda2Slider = VizEngine.createSlider(controls, 'λ₂ (eigenvalue 2)', 0, 4, 1, 0.1, () => draw());
                        const angleSlider = VizEngine.createSlider(controls, 'Eigenvector angle', 0, 360, 0, 5, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const lambda1 = parseFloat(lambda1Slider.value);
                            const lambda2 = parseFloat(lambda2Slider.value);
                            const theta = angleSlider.value * Math.PI / 180;

                            // Rotation matrix for eigenvectors
                            const c = Math.cos(theta);
                            const s = Math.sin(theta);
                            const P = [[c, -s], [s, c]];
                            const PT = [[c, s], [-s, c]];

                            // Positive operator A = P diag(λ1, λ2) P^T
                            const D = [[lambda1, 0], [0, lambda2]];
                            const PD = VizEngine.matMul(P, D);
                            const A = VizEngine.matMul(PD, PT);

                            // Eigenvectors
                            const e1 = [c, s];
                            const e2 = [-s, c];

                            // Draw eigenspaces
                            viz.drawVector(0, 0, 1.5 * e1[0], 1.5 * e1[1], viz.colors.blue, 'e₁ (λ₁=' + lambda1.toFixed(1) + ')');
                            viz.drawVector(0, 0, 1.5 * e2[0], 1.5 * e2[1], viz.colors.orange, 'e₂ (λ₂=' + lambda2.toFixed(1) + ')');

                            // Sample the quadratic form on unit circle
                            const numSamples = 36;
                            for (let i = 0; i < numSamples; i++) {
                                const angle = 2 * Math.PI * i / numSamples;
                                const v = [Math.cos(angle), Math.sin(angle)];
                                const Av = VizEngine.matVec(A, v);
                                const quadForm = v[0] * Av[0] + v[1] * Av[1];

                                // Scale by quadratic form value
                                const scale = quadForm / 2;
                                const color = quadForm >= 0 ? viz.colors.green : viz.colors.red;
                                viz.drawPoint(scale * v[0], scale * v[1], color, null, 4);
                            }

                            // Test vector
                            const testAngle = Date.now() / 1000;
                            const v = [Math.cos(testAngle), Math.sin(testAngle)];
                            const Av = VizEngine.matVec(A, v);
                            const quadForm = v[0] * Av[0] + v[1] * Av[1];

                            viz.drawVector(0, 0, v[0], v[1], viz.colors.teal, 'v', 2);

                            // Display info
                            viz.drawText('Positive operator: λᵢ ≥ 0', -5, 5.5, viz.colors.white, 14);
                            viz.drawText('Quadratic form ⟨τv, v⟩ = ' + quadForm.toFixed(2) + ' ≥ 0', -5, 5,
                                quadForm >= 0 ? viz.colors.green : viz.colors.red, 14);
                            viz.drawText('Green points: ⟨τv, v⟩ values', -5, 4.5, viz.colors.text, 12);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that if \\(\\tau\\) is positive definite, then \\(\\tau\\) is invertible and \\(\\tau^{-1}\\) is also positive definite.',
                    hint: 'Use the fact that all eigenvalues are positive.',
                    solution: 'If \\(\\tau\\) is positive definite, all eigenvalues \\(\\lambda_i > 0\\). Therefore \\(\\tau\\) is invertible with \\(\\tau^{-1} = \\sum \\lambda_i^{-1} \\pi_i\\). Since \\(\\lambda_i^{-1} > 0\\), we have \\(\\tau^{-1}\\) is positive definite.'
                },
                {
                    question: 'Prove that if \\(\\tau \\geq 0\\) and \\(\\sigma \\geq \\tau\\), then \\(\\sqrt{\\sigma} \\geq \\sqrt{\\tau}\\).',
                    hint: 'Consider the eigenvalues.',
                    solution: 'If \\(\\sigma \\geq \\tau\\), then \\(\\sigma - \\tau \\geq 0\\). This means that for any eigenvalue \\(\\mu_i\\) of \\(\\sigma\\) and \\(\\lambda_i\\) of \\(\\tau\\) on the same eigenspace, we have \\(\\mu_i \\geq \\lambda_i\\). Therefore \\(\\sqrt{\\mu_i} \\geq \\sqrt{\\lambda_i}\\), which implies \\(\\sqrt{\\sigma} \\geq \\sqrt{\\tau}\\).'
                },
                {
                    question: 'Show that the sum of two positive operators is positive.',
                    hint: 'Use the characterization \\(\\langle \\tau v, v \\rangle \\geq 0\\).',
                    solution: 'If \\(\\tau \\geq 0\\) and \\(\\sigma \\geq 0\\), then for any \\(v \\in V\\): \\(\\langle (\\tau + \\sigma) v, v \\rangle = \\langle \\tau v, v \\rangle + \\langle \\sigma v, v \\rangle \\geq 0 + 0 = 0\\). Therefore \\(\\tau + \\sigma \\geq 0\\).'
                }
            ]
        },
        {
            id: 'ch10-sec06',
            title: 'Polar Decomposition',
            content: `
                <h2>Polar Decomposition</h2>

                <p>Just as every nonzero complex number can be written as \\(z = re^{i\\theta}\\) (polar form), every operator can be decomposed as a product of a positive operator and a unitary operator.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.22 (Polar Decomposition)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau\\) be a linear operator on a finite-dimensional complex inner product space \\(V\\). Then there exist:</p>
                        <ol>
                            <li>A positive operator \\(P\\) and a unitary operator \\(U\\) such that \\(\\tau = PU\\). Moreover, \\(P\\) is unique, and if \\(\\tau\\) is invertible, then \\(U\\) is also unique.</li>
                            <li>A positive operator \\(Q\\) and a unitary operator \\(W\\) such that \\(\\tau = WQ\\). Moreover, \\(Q\\) is unique, and if \\(\\tau\\) is invertible, then \\(W\\) is also unique.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>We prove part 1. Suppose momentarily that \\(\\tau = PU\\) where \\(P\\) is positive and \\(U\\) is unitary. Then</p>
                        \\[\\tau^*\\tau = U^*P^*PU = U^*P^2U = U^*PU \\cdot U^*PU\\]
                        <p>and</p>
                        \\[\\|\\tau v\\|^2 = \\langle \\tau v, \\tau v \\rangle = \\langle \\tau^*\\tau v, v \\rangle = \\|Pv\\|^2\\]

                        <p>These equations suggest defining \\(P = \\sqrt{\\tau^*\\tau}\\) (the unique positive square root). Then \\(\\|\\tau v\\| = \\|Pv\\|\\) for all \\(v\\).</p>

                        <p>Define \\(U\\) on \\(\\text{im}(P)\\) by \\(U(Pv) = \\tau v\\). This is well-defined since \\(Pv_1 = Pv_2\\) implies \\(\\|P(v_1 - v_2)\\| = 0\\), hence \\(\\|\\tau(v_1 - v_2)\\| = 0\\), so \\(\\tau v_1 = \\tau v_2\\).</p>

                        <p>Moreover, \\(U\\) is an isometry on \\(\\text{im}(P)\\) since</p>
                        \\[\\|U(Pv)\\| = \\|\\tau v\\| = \\|Pv\\|\\]

                        <p>Extend \\(U\\) to an isometry on all of \\(V\\) by defining it arbitrarily (but isometrically) on \\(\\text{im}(P)^\\perp = \\ker(P) = \\ker(\\tau)\\). Then \\(U\\) is a unitary operator with \\(\\tau = PU\\).</p>

                        <p><strong>Uniqueness:</strong> We've seen \\(P = \\sqrt{\\tau^*\\tau}\\) is unique. If \\(\\tau\\) is invertible, then \\(P\\) is invertible, so \\(U = P^{-1}\\tau\\) is uniquely determined.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="polar-decomposition-viz"></div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 10.23</div>
                    <div class="env-body">
                        <p>Every operator \\(\\tau\\) on a finite-dimensional complex inner product space has a decomposition</p>
                        \\[\\tau = P e^{iH}\\]
                        <p>where \\(P \\geq 0\\) and \\(H\\) is self-adjoint. Moreover, \\(P\\) is unique, and if \\(\\tau\\) is invertible, then \\(H\\) is unique up to addition of a multiple of \\(2\\pi i I\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Every unitary operator \\(U\\) can be written as \\(U = e^{iH}\\) for some self-adjoint \\(H\\) (using the spectral theorem and logarithm). Apply this to the polar decomposition \\(\\tau = PU\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.24</div>
                    <div class="env-body">
                        <p>Let \\(\\tau = PU\\) be the polar decomposition of \\(\\tau\\). Then \\(\\tau\\) is normal if and only if \\(PU = UP\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>We have</p>
                        \\[\\tau^*\\tau = U^*PU \\cdot PU = U^*P^2U\\]
                        \\[\\tau\\tau^* = PU \\cdot U^*P = P^2\\]
                        <p>if \\(PU = UP\\). Thus \\(\\tau\\) is normal iff \\(U^*P^2U = P^2\\) iff \\(P^2 = UP^2U^*\\) iff \\(UP = PU\\) (using that \\(P\\) is a polynomial in \\(P^2\\)).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 10.25</div>
                    <div class="env-body">
                        <p>Consider the matrix</p>
                        \\[A = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}\\]
                        <p>We compute</p>
                        \\[A^*A = \\begin{pmatrix} 1 & 1 \\\\ 1 & 2 \\end{pmatrix}\\]
                        <p>The eigenvalues are \\(\\frac{3 \\pm \\sqrt{5}}{2}\\), and we can compute</p>
                        \\[P = \\sqrt{A^*A} = \\begin{pmatrix} 0.896 & 0.618 \\\\ 0.618 & 1.514 \\end{pmatrix}\\]
                        <p>Then \\(U = P^{-1}A\\) is unitary.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The polar decomposition separates the "stretching" part (positive operator \\(P\\)) from the "rotation" part (unitary operator \\(U\\)) of a linear transformation. This is analogous to writing a complex number as \\(z = |z| \\cdot e^{i\\arg(z)}\\), separating magnitude from phase.</p>

                        <p>For normal operators, the stretching and rotation commute (\\(PU = UP\\)), which means the operator first rotates, then stretches (or vice versa, it doesn't matter). This is one more way to see why normal operators are so well-behaved.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'polar-decomposition-viz',
                    title: 'Interactive: Polar Decomposition τ = PU',
                    description: 'See how an operator decomposes into positive × unitary',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 900, height: 400, scale: 50});

                        const stretchSlider = VizEngine.createSlider(controls, 'Stretch factor', 0.5, 3, 2, 0.1, () => draw());
                        const shearSlider = VizEngine.createSlider(controls, 'Shear', -1, 1, 0.3, 0.1, () => draw());
                        const rotateSlider = VizEngine.createSlider(controls, 'Rotation', 0, 360, 30, 5, () => draw());

                        let step = 0;
                        const btnNext = VizEngine.createButton(controls, 'Step: Original', () => {
                            step = (step + 1) % 3;
                            btnNext.textContent = ['Step: Original', 'Step: After P', 'Step: After PU'][step];
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const stretch = parseFloat(stretchSlider.value);
                            const shear = parseFloat(shearSlider.value);
                            const angle = rotateSlider.value * Math.PI / 180;

                            // Target matrix: rotation + shear + stretch
                            const c = Math.cos(angle);
                            const s = Math.sin(angle);
                            const U = [[c, -s], [s, c]];
                            const P = [[stretch, shear], [shear, 1]];
                            const tau = VizEngine.matMul(P, U);

                            // Unit square vertices
                            const square = [[0, 0], [1, 0], [1, 1], [0, 1]];

                            // Draw original
                            viz.drawPolygon(square, viz.colors.blue + '44', viz.colors.blue, 2);

                            if (step >= 1) {
                                // After U (rotation)
                                const afterU = square.map(v => VizEngine.matVec(U, v));
                                const centerX = 4;
                                const shiftedU = afterU.map(v => [v[0] + centerX, v[1]]);
                                viz.drawPolygon(shiftedU, viz.colors.orange + '44', viz.colors.orange, 2);
                                viz.drawText('After U (unitary)', centerX, -4, viz.colors.orange, 12);
                            }

                            if (step >= 2) {
                                // After PU
                                const afterPU = square.map(v => VizEngine.matVec(tau, v));
                                const centerX2 = 8;
                                const shiftedPU = afterPU.map(v => [v[0] + centerX2, v[1]]);
                                viz.drawPolygon(shiftedPU, viz.colors.green + '44', viz.colors.green, 2);
                                viz.drawText('After P·U (final)', centerX2, -4, viz.colors.green, 12);
                            }

                            viz.drawText('Original', 0.5, -4, viz.colors.blue, 12);
                            viz.drawText('τ = P·U: First rotate (U), then stretch (P)', -8, 5.5, viz.colors.white, 14);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the polar decomposition of the matrix \\(A = \\begin{pmatrix} 2 & 0 \\\\ 0 & 0 \\end{pmatrix}\\).',
                    hint: 'Compute \\(A^*A\\) and its square root.',
                    solution: 'We have \\(A^*A = \\begin{pmatrix} 4 & 0 \\\\ 0 & 0 \\end{pmatrix}\\), so \\(P = \\sqrt{A^*A} = \\begin{pmatrix} 2 & 0 \\\\ 0 & 0 \\end{pmatrix} = A\\). Since \\(A\\) is not invertible, \\(U\\) is not unique. Any unitary matrix \\(U\\) that fixes \\(\\text{im}(A) = \\text{span}\\{e_1\\}\\) works. For instance, \\(U = I\\) gives \\(A = A \\cdot I\\).'
                },
                {
                    question: 'Show that if \\(\\tau\\) is self-adjoint, then its polar decomposition has the form \\(\\tau = P\\) where \\(P = |\\tau|\\) (the absolute value) and \\(U = \\text{sign}(\\tau)\\).',
                    hint: 'Use the spectral theorem for self-adjoint operators.',
                    solution: 'If \\(\\tau = \\sum \\lambda_i \\pi_i\\) is self-adjoint, then \\(\\tau^*\\tau = \\sum \\lambda_i^2 \\pi_i\\), so \\(P = \\sqrt{\\tau^*\\tau} = \\sum |\\lambda_i| \\pi_i = |\\tau|\\). The unitary part is \\(U = P^{-1}\\tau = \\sum \\text{sign}(\\lambda_i) \\pi_i\\), which is the sign operator.'
                },
                {
                    question: 'Prove that if \\(\\tau = PU\\) is the polar decomposition with \\(\\tau\\) invertible, then \\(\\tau^{-1} = U^*P^{-1}\\).',
                    hint: 'Use \\(U^* = U^{-1}\\) for unitary operators.',
                    solution: 'We have \\(\\tau^{-1} = (PU)^{-1} = U^{-1}P^{-1} = U^*P^{-1}\\) since \\(U\\) is unitary.'
                }
            ]
        },
        {
            id: 'ch10-sec07',
            title: 'Functional Calculus and Applications',
            content: `
                <h2>Functional Calculus and Applications</h2>

                <p>The spectral theorem allows us to define functions of normal operators in a natural way, leading to a powerful functional calculus.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 10.26 (Functional Calculus)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau\\) be a normal operator with spectral decomposition</p>
                        \\[\\tau = \\lambda_1 \\pi_1 + \\cdots + \\lambda_k \\pi_k\\]
                        <p>For any function \\(f: \\{\\lambda_1, \\ldots, \\lambda_k\\} \\to \\mathbb{C}\\), we define</p>
                        \\[f(\\tau) = f(\\lambda_1)\\pi_1 + \\cdots + f(\\lambda_k)\\pi_k\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Since \\(\\tau\\) acts as multiplication by \\(\\lambda_i\\) on each eigenspace \\(E_{\\lambda_i}\\), it makes sense that \\(f(\\tau)\\) should act as multiplication by \\(f(\\lambda_i)\\) on \\(E_{\\lambda_i}\\). This gives us a way to "plug in" an operator into any function.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 10.27</div>
                    <div class="env-body">
                        <p>If \\(\\tau = \\begin{pmatrix} 2 & 0 \\\\ 0 & 3 \\end{pmatrix}\\), then</p>
                        \\[e^\\tau = \\begin{pmatrix} e^2 & 0 \\\\ 0 & e^3 \\end{pmatrix}, \\quad \\sin(\\tau) = \\begin{pmatrix} \\sin 2 & 0 \\\\ 0 & \\sin 3 \\end{pmatrix}\\]
                        \\[\\sqrt{\\tau} = \\begin{pmatrix} \\sqrt{2} & 0 \\\\ 0 & \\sqrt{3} \\end{pmatrix}\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.28 (Properties of Functional Calculus)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau\\) be a normal operator. Then:</p>
                        <ol>
                            <li>For any functions \\(f, g\\): \\((f + g)(\\tau) = f(\\tau) + g(\\tau)\\) and \\((fg)(\\tau) = f(\\tau)g(\\tau)\\).</li>
                            <li>If \\(f\\) is a polynomial, this definition agrees with the usual polynomial evaluation.</li>
                            <li>\\(f(\\tau)\\) is normal, and if \\(f\\) is real-valued on the spectrum, then \\(f(\\tau)\\) is self-adjoint.</li>
                            <li>The eigenvalues of \\(f(\\tau)\\) are \\(f(\\lambda_1), \\ldots, f(\\lambda_k)\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 10.29 (Matrix Exponential)</div>
                    <div class="env-body">
                        <p>The matrix exponential \\(e^A\\) is defined by the power series</p>
                        \\[e^A = I + A + \\frac{A^2}{2!} + \\frac{A^3}{3!} + \\cdots\\]
                        <p>For a normal operator \\(\\tau = \\sum \\lambda_i \\pi_i\\), we have</p>
                        \\[e^\\tau = \\sum e^{\\lambda_i} \\pi_i\\]
                        <p>This is used extensively in solving differential equations \\(\\dot{x} = Ax\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="functional-calculus-viz"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 10.30 (Commutativity)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau\\) and \\(\\sigma\\) be normal operators on \\(V\\). Then \\(\\tau\\) and \\(\\sigma\\) commute if and only if there exists a polynomial \\(p(x, y)\\) in two variables such that</p>
                        \\[\\tau = p(\\theta, \\theta)\\text{ and }\\sigma = q(\\theta, \\theta)\\]
                        <p>for some normal operator \\(\\theta\\) and polynomials \\(p, q\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The functional calculus is particularly important in quantum mechanics, where observables are represented by self-adjoint operators, and functions of observables (like \\(e^{iHt}\\) for the Hamiltonian \\(H\\)) represent time evolution.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 10.31 (Application to Differential Equations)</div>
                    <div class="env-body">
                        <p>Consider the system \\(\\dot{x} = Ax\\) where \\(A = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}\\). This is a skew-symmetric matrix (hence normal) representing rotation. The solution is</p>
                        \\[x(t) = e^{tA} x(0)\\]
                        <p>Since \\(A\\) has eigenvalues \\(\\pm i\\), we have</p>
                        \\[e^{tA} = \\begin{pmatrix} \\cos t & \\sin t \\\\ -\\sin t & \\cos t \\end{pmatrix}\\]
                        <p>which is a rotation by angle \\(t\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'functional-calculus-viz',
                    title: 'Interactive: Functions of Operators',
                    description: 'Visualize how functions apply to operator eigenvalues',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 700, height: 400, scale: 40});

                        const lambda1Slider = VizEngine.createSlider(controls, 'λ₁', 0.5, 3, 2, 0.1, () => draw());
                        const lambda2Slider = VizEngine.createSlider(controls, 'λ₂', 0.5, 3, 1, 0.1, () => draw());

                        let funcIndex = 0;
                        const functions = [
                            {name: 'Square', f: x => x * x},
                            {name: 'Square root', f: x => Math.sqrt(x)},
                            {name: 'Exponential', f: x => Math.exp(x) / 3},
                            {name: 'Inverse', f: x => 1 / x}
                        ];

                        const btnFunc = VizEngine.createButton(controls, 'Function: ' + functions[0].name, () => {
                            funcIndex = (funcIndex + 1) % functions.length;
                            btnFunc.textContent = 'Function: ' + functions[funcIndex].name;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const lambda1 = parseFloat(lambda1Slider.value);
                            const lambda2 = parseFloat(lambda2Slider.value);
                            const func = functions[funcIndex];

                            // Eigenvalues after applying function
                            const fLambda1 = func.f(lambda1);
                            const fLambda2 = func.f(lambda2);

                            // Draw diagonal matrix visualization
                            // Original eigenvalues
                            viz.drawPoint(lambda1, 0, viz.colors.blue, 'λ₁', 8);
                            viz.drawPoint(0, lambda2, viz.colors.orange, 'λ₂', 8);

                            // Transformed eigenvalues
                            const scale = 1.5;
                            viz.drawPoint(scale * fLambda1, 0, viz.colors.green, 'f(λ₁)', 8);
                            viz.drawPoint(0, scale * fLambda2, viz.colors.teal, 'f(λ₂)', 8);

                            // Draw arrows showing transformation
                            viz.drawSegment(lambda1, 0, scale * fLambda1, 0, viz.colors.blue, 2, true);
                            viz.drawSegment(0, lambda2, 0, scale * fLambda2, viz.colors.orange, 2, true);

                            // Display formula
                            viz.drawText('τ = λ₁π₁ + λ₂π₂', -7, 6, viz.colors.white, 14);
                            viz.drawText('f(τ) = f(λ₁)π₁ + f(λ₂)π₂', -7, 5.5, viz.colors.white, 14);
                            viz.drawText('f = ' + func.name, -7, 5, viz.colors.text, 12);
                            viz.drawText('λ₁ = ' + lambda1.toFixed(2) + ' → f(λ₁) = ' + fLambda1.toFixed(2),
                                -7, 4, viz.colors.blue, 12);
                            viz.drawText('λ₂ = ' + lambda2.toFixed(2) + ' → f(λ₂) = ' + fLambda2.toFixed(2),
                                -7, 3.5, viz.colors.orange, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'If \\(\\tau\\) is self-adjoint with eigenvalues \\(\\lambda_1, \\ldots, \\lambda_k\\), find a formula for \\(\\tau^{1/3}\\) (the unique self-adjoint cube root).',
                    hint: 'Use the functional calculus with \\(f(x) = x^{1/3}\\).',
                    solution: 'By functional calculus, \\(\\tau^{1/3} = \\sum \\lambda_i^{1/3} \\pi_i\\), where \\(\\pi_i\\) are the orthogonal projections onto eigenspaces.'
                },
                {
                    question: 'Show that if \\(\\tau\\) is normal, then \\(e^{\\tau^*} = (e^\\tau)^*\\).',
                    hint: 'Use the spectral decomposition.',
                    solution: 'If \\(\\tau = \\sum \\lambda_i \\pi_i\\), then \\(\\tau^* = \\sum \\overline{\\lambda_i} \\pi_i\\). Therefore \\(e^{\\tau^*} = \\sum e^{\\overline{\\lambda_i}} \\pi_i = \\sum \\overline{e^{\\lambda_i}} \\pi_i = (\\sum e^{\\lambda_i} \\pi_i)^* = (e^\\tau)^*\\).'
                },
                {
                    question: 'If \\(A\\) is a \\(2 \\times 2\\) matrix with eigenvalues 1 and 2, compute \\(\\text{tr}(e^A)\\) without diagonalizing.',
                    hint: 'The trace of \\(f(A)\\) equals \\(\\sum f(\\lambda_i)\\).',
                    solution: 'Since the eigenvalues of \\(e^A\\) are \\(e^1\\) and \\(e^2\\), we have \\(\\text{tr}(e^A) = e + e^2\\).'
                }
            ]
        }
    ]
});
