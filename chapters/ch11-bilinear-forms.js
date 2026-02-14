window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch11',
    number: 11,
    title: 'Metric Vector Spaces',
    subtitle: 'The Theory of Bilinear Forms',
    sections: [
        {
            id: 'ch11-sec01',
            title: 'Bilinear Forms and Metric Vector Spaces',
            content: `
                <h2>Bilinear Forms and Metric Vector Spaces</h2>

                <p>In our study of inner product spaces, we encountered a special type of function that takes two vectors and produces a scalar. This chapter generalizes inner products by removing the positivity requirement, leading to the rich theory of <strong>bilinear forms</strong>. These structures arise naturally in geometry (quadratic forms, Lorentzian metrics), physics (Minkowski space-time), and algebra (trace forms, discriminants).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 11.1 (Bilinear Form)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be a vector space over a field \\(F\\). A <strong>bilinear form</strong> on \\(V\\) is a function \\(\\langle \\cdot, \\cdot \\rangle : V \\times V \\to F\\) that is linear in each argument:</p>
                        <ul>
                            <li>\\(\\langle au + bv, w \\rangle = a\\langle u, w \\rangle + b\\langle v, w \\rangle\\) for all \\(a, b \\in F\\) and \\(u, v, w \\in V\\)</li>
                            <li>\\(\\langle u, av + bw \\rangle = a\\langle u, v \\rangle + b\\langle u, w \\rangle\\) for all \\(a, b \\in F\\) and \\(u, v, w \\in V\\)</li>
                        </ul>
                        <p>A vector space equipped with a bilinear form is called a <strong>metric vector space</strong>.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 11.2 (Standard Examples)</div>
                    <div class="env-body">
                        <p><strong>(a) Euclidean inner product:</strong> On \\(\\mathbb{R}^n\\), define \\(\\langle x, y \\rangle = x_1y_1 + \\cdots + x_ny_n\\). This is a symmetric, positive-definite bilinear form.</p>

                        <p><strong>(b) Minkowski metric:</strong> On \\(\\mathbb{R}^4\\), define \\(\\langle x, y \\rangle = x_1y_1 + x_2y_2 + x_3y_3 - x_4y_4\\). This is symmetric but <em>not</em> positive-definite (the vector \\((0,0,0,1)\\) has "length squared" \\(-1\\)).</p>

                        <p><strong>(c) Determinant form:</strong> On \\(\\mathbb{R}^2\\), define \\(\\langle (x_1,x_2), (y_1,y_2) \\rangle = x_1y_2 - x_2y_1\\). This is <em>antisymmetric</em>: \\(\\langle v, w \\rangle = -\\langle w, v \\rangle\\).</p>

                        <p><strong>(d) Matrix trace form:</strong> On \\(M_n(F)\\), define \\(\\langle A, B \\rangle = \\operatorname{tr}(AB^T)\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 11.3 (Types of Bilinear Forms)</div>
                    <div class="env-body">
                        <p>Let \\(\\langle \\cdot, \\cdot \\rangle\\) be a bilinear form on \\(V\\). The form is:</p>
                        <ul>
                            <li><strong>Symmetric</strong> if \\(\\langle u, v \\rangle = \\langle v, u \\rangle\\) for all \\(u, v \\in V\\)</li>
                            <li><strong>Antisymmetric (or skew-symmetric)</strong> if \\(\\langle u, v \\rangle = -\\langle v, u \\rangle\\) for all \\(u, v \\in V\\)</li>
                            <li><strong>Alternating</strong> if \\(\\langle v, v \\rangle = 0\\) for all \\(v \\in V\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>If \\(\\operatorname{char}(F) \\neq 2\\), then antisymmetric and alternating are equivalent. To see this: if the form is alternating, then</p>
                        \\[0 = \\langle u+v, u+v \\rangle = \\langle u,u \\rangle + \\langle u,v \\rangle + \\langle v,u \\rangle + \\langle v,v \\rangle = \\langle u,v \\rangle + \\langle v,u \\rangle\\]
                        <p>so \\(\\langle v,u \\rangle = -\\langle u,v \\rangle\\). Conversely, if the form is antisymmetric, then \\(\\langle v,v \\rangle = -\\langle v,v \\rangle\\), which implies \\(2\\langle v,v \\rangle = 0\\), hence \\(\\langle v,v \\rangle = 0\\) when \\(\\operatorname{char}(F) \\neq 2\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="bilinear-form-viz"></div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Bilinear Forms as Generalized Measurements</div>
                    <div class="env-body">
                        <p>Think of a bilinear form as a way to "measure interaction" between vectors. An inner product measures how much vectors align (always non-negative for aligned vectors). A general bilinear form can be:</p>
                        <ul>
                            <li><strong>Symmetric:</strong> The interaction of \\(u\\) with \\(v\\) equals the interaction of \\(v\\) with \\(u\\) (like mutual gravitational force)</li>
                            <li><strong>Antisymmetric:</strong> The interactions are opposite (like work done by pushing vs. pulling)</li>
                            <li><strong>Indefinite:</strong> Some vectors can have "negative length squared" (like timelike vectors in relativity)</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'bilinear-form-viz',
                    title: 'Interactive: Symmetric vs. Antisymmetric Bilinear Forms',
                    description: 'Visualize how different bilinear forms measure vector pairs in ℝ²',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        const v1 = viz.addDraggable('v1', 2, 1.5, viz.colors.blue, 8, () => draw());
                        const v2 = viz.addDraggable('v2', -1, 2, viz.colors.orange, 8, () => draw());

                        let formType = 'symmetric';
                        const formSelect = document.createElement('select');
                        formSelect.innerHTML = `
                            <option value="symmetric">Symmetric: ⟨u,v⟩ = u₁v₁ + u₂v₂</option>
                            <option value="antisymmetric">Antisymmetric: ⟨u,v⟩ = u₁v₂ - u₂v₁</option>
                            <option value="indefinite">Indefinite: ⟨u,v⟩ = u₁v₁ - u₂v₂</option>
                        `;
                        formSelect.style.cssText = 'margin: 10px 0; padding: 5px; font-size: 14px;';
                        formSelect.onchange = (e) => {
                            formType = e.target.value;
                            draw();
                        };
                        controls.appendChild(formSelect);

                        function bilinearForm(u, v, type) {
                            if (type === 'symmetric') {
                                return u[0]*v[0] + u[1]*v[1];
                            } else if (type === 'antisymmetric') {
                                return u[0]*v[1] - u[1]*v[0];
                            } else { // indefinite
                                return u[0]*v[0] - u[1]*v[1];
                            }
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const u = [v1.x, v1.y];
                            const v = [v2.x, v2.y];

                            const uv = bilinearForm(u, v, formType);
                            const vu = bilinearForm(v, u, formType);
                            const uu = bilinearForm(u, u, formType);
                            const vv = bilinearForm(v, v, formType);

                            viz.drawVector(0, 0, v1.x, v1.y, viz.colors.blue, 'u');
                            viz.drawVector(0, 0, v2.x, v2.y, viz.colors.orange, 'v');
                            viz.drawDraggables();

                            viz.drawText(`⟨u,v⟩ = ${uv.toFixed(2)}`, -6.5, 3.5, viz.colors.white, 16);
                            viz.drawText(`⟨v,u⟩ = ${vu.toFixed(2)}`, -6.5, 3, viz.colors.white, 16);
                            viz.drawText(`⟨u,u⟩ = ${uu.toFixed(2)}`, -6.5, 2.5, viz.colors.blue, 16);
                            viz.drawText(`⟨v,v⟩ = ${vv.toFixed(2)}`, -6.5, 2, viz.colors.orange, 16);

                            if (formType === 'symmetric') {
                                const isSymmetric = Math.abs(uv - vu) < 0.01;
                                viz.drawText(isSymmetric ? '✓ Symmetric' : '✗ Not symmetric', -6.5, 1.5,
                                    isSymmetric ? viz.colors.green : viz.colors.red, 14);
                            } else if (formType === 'antisymmetric') {
                                const isAntisym = Math.abs(uv + vu) < 0.01;
                                viz.drawText(isAntisym ? '✓ Antisymmetric' : '✗ Not antisymmetric', -6.5, 1.5,
                                    isAntisym ? viz.colors.green : viz.colors.red, 14);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that any bilinear form \\(\\langle \\cdot, \\cdot \\rangle\\) on \\(V\\) can be uniquely written as \\(\\langle u, v \\rangle = s(u,v) + a(u,v)\\) where \\(s\\) is symmetric and \\(a\\) is antisymmetric.',
                    hint: 'Consider \\(s(u,v) = \\frac{1}{2}(\\langle u,v \\rangle + \\langle v,u \\rangle)\\) and \\(a(u,v) = \\frac{1}{2}(\\langle u,v \\rangle - \\langle v,u \\rangle)\\). Assume \\(\\operatorname{char}(F) \\neq 2\\).',
                    solution: 'Define \\(s(u,v) = \\frac{1}{2}(\\langle u,v \\rangle + \\langle v,u \\rangle)\\) and \\(a(u,v) = \\frac{1}{2}(\\langle u,v \\rangle - \\langle v,u \\rangle)\\). Then \\(s(v,u) = \\frac{1}{2}(\\langle v,u \\rangle + \\langle u,v \\rangle) = s(u,v)\\), so \\(s\\) is symmetric. Also \\(a(v,u) = \\frac{1}{2}(\\langle v,u \\rangle - \\langle u,v \\rangle) = -a(u,v)\\), so \\(a\\) is antisymmetric. Clearly \\(s(u,v) + a(u,v) = \\langle u,v \\rangle\\). For uniqueness, if \\(\\langle u,v \\rangle = s_1(u,v) + a_1(u,v) = s_2(u,v) + a_2(u,v)\\) with both decompositions having the symmetry properties, then \\((s_1-s_2)(u,v) = (a_2-a_1)(u,v)\\). The left side is symmetric, the right side is antisymmetric, so both must be zero.'
                },
                {
                    question: 'Show that on a vector space over a field of characteristic 2, a form can be both symmetric and alternating without being identically zero.',
                    hint: 'Consider \\(V = \\mathbb{F}_2^2\\) with \\(\\langle (a,b), (c,d) \\rangle = ac + bd\\).',
                    solution: 'Let \\(F = \\mathbb{F}_2\\) and \\(V = F^2\\). Define \\(\\langle (a,b), (c,d) \\rangle = ac + bd\\). This is clearly symmetric. Also, \\(\\langle (a,b), (a,b) \\rangle = a^2 + b^2 = a + b\\) in \\(\\mathbb{F}_2\\) (since \\(x^2 = x\\) for \\(x \\in \\mathbb{F}_2\\)). Wait, we need alternating. Better example: \\(\\langle (a,b), (c,d) \\rangle = ad + bc\\). Then \\(\\langle v,v \\rangle = \\langle (a,b),(a,b) \\rangle = ab + ba = 2ab = 0\\) in characteristic 2, so it is alternating. It is symmetric since \\(\\langle (a,b),(c,d) \\rangle = ad+bc = da+cb = \\langle (c,d),(a,b) \\rangle\\). This form is not identically zero since \\(\\langle (1,0),(0,1) \\rangle = 1\\).'
                },
                {
                    question: 'Let \\(T : V \\to V\\) be a linear operator. Show that \\(\\langle u, v \\rangle = \\operatorname{tr}(T(u) \\otimes v)\\) does not define a bilinear form (where \\(u \\otimes v\\) denotes the rank-one operator \\(w \\mapsto \\langle v, w \\rangle u\\) for some fixed inner product).',
                    hint: 'The notation is problematic. Instead, consider whether \\(\\langle u,v \\rangle = (Tu) \\cdot v\\) for a fixed inner product \\(\\cdot\\) is bilinear.',
                    solution: 'Reinterpreting the question: Let \\(V\\) have an inner product \\((\\cdot, \\cdot)\\) and define \\(\\langle u,v \\rangle = (Tu, v)\\). This is linear in \\(u\\): \\(\\langle au_1 + bu_2, v \\rangle = (T(au_1+bu_2), v) = (aTu_1 + bTu_2, v) = a(Tu_1,v) + b(Tu_2,v) = a\\langle u_1,v \\rangle + b\\langle u_2,v \\rangle\\). It is also linear in \\(v\\): \\(\\langle u, av_1+bv_2 \\rangle = (Tu, av_1+bv_2) = a(Tu,v_1) + b(Tu,v_2)\\). So this IS a bilinear form. The question as stated needs clarification.'
                }
            ]
        },
        {
            id: 'ch11-sec02',
            title: 'Matrix Representation of Bilinear Forms',
            content: `
                <h2>Matrix Representation of Bilinear Forms</h2>

                <p>Just as linear transformations can be represented by matrices, bilinear forms have matrix representations that capture their essential properties.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 11.4 (Matrix of a Bilinear Form)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be a finite-dimensional vector space with ordered basis \\(\\mathcal{B} = (v_1, \\ldots, v_n)\\), and let \\(\\langle \\cdot, \\cdot \\rangle\\) be a bilinear form on \\(V\\). Define the \\(n \\times n\\) matrix \\(M_\\mathcal{B}\\) by</p>
                        \\[M_\\mathcal{B}[i,j] = \\langle v_i, v_j \\rangle\\]
                        <p>Then for any vectors \\(u = \\sum a_i v_i\\) and \\(v = \\sum b_j v_j\\), we have</p>
                        \\[\\langle u, v \\rangle = [u]_\\mathcal{B}^T M_\\mathcal{B} [v]_\\mathcal{B}\\]
                        <p>where \\([u]_\\mathcal{B}\\) denotes the coordinate vector of \\(u\\) relative to \\(\\mathcal{B}\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>By bilinearity:</p>
                        \\[\\langle u, v \\rangle = \\left\\langle \\sum_{i=1}^n a_i v_i, \\sum_{j=1}^n b_j v_j \\right\\rangle = \\sum_{i=1}^n \\sum_{j=1}^n a_i b_j \\langle v_i, v_j \\rangle\\]
                        <p>This is exactly the matrix product \\((a_1, \\ldots, a_n) M_\\mathcal{B} (b_1, \\ldots, b_n)^T\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 11.5 (Form Type and Matrix Symmetry)</div>
                    <div class="env-body">
                        <p>Let \\(M_\\mathcal{B}\\) be the matrix of a bilinear form \\(\\langle \\cdot, \\cdot \\rangle\\) relative to a basis \\(\\mathcal{B}\\). Then:</p>
                        <ul>
                            <li>The form is symmetric if and only if \\(M_\\mathcal{B}^T = M_\\mathcal{B}\\)</li>
                            <li>The form is antisymmetric if and only if \\(M_\\mathcal{B}^T = -M_\\mathcal{B}\\)</li>
                            <li>The form is alternating if and only if \\(M_\\mathcal{B}\\) is antisymmetric with zero diagonal</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 11.6 (Change of Basis for Bilinear Forms)</div>
                    <div class="env-body">
                        <p>Let \\(\\mathcal{B}\\) and \\(\\mathcal{B}^{\\prime}\\) be two bases for \\(V\\), and let \\(P\\) be the change-of-basis matrix from \\(\\mathcal{B}\\) to \\(\\mathcal{B}^{\\prime}\\) (so \\([v]_{\\mathcal{B}} = P[v]_{\\mathcal{B}^{\\prime}}\\)). If \\(M_\\mathcal{B}\\) and \\(M_{\\mathcal{B}^{\\prime}}\\) are the matrices of a bilinear form relative to these bases, then</p>
                        \\[M_{\\mathcal{B}^{\\prime}} = P^T M_\\mathcal{B} P\\]
                        <p>Two matrices related by \\(M' = P^T M P\\) for some invertible \\(P\\) are called <strong>congruent</strong>.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>For vectors \\(u, v \\in V\\), we have</p>
                        \\[\\langle u,v \\rangle = [u]_\\mathcal{B}^T M_\\mathcal{B} [v]_\\mathcal{B} = (P[u]_{\\mathcal{B}^{\\prime}})^T M_\\mathcal{B} (P[v]_{\\mathcal{B}^{\\prime}}) = [u]_{\\mathcal{B}^{\\prime}}^T (P^T M_\\mathcal{B} P) [v]_{\\mathcal{B}^{\\prime}}\\]
                        <p>Since this holds for all \\(u,v\\), we have \\(M_{\\mathcal{B}^{\\prime}} = P^T M_\\mathcal{B} P\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Congruence vs. Similarity</div>
                    <div class="env-body">
                        <p>Note the difference:</p>
                        <ul>
                            <li><strong>Similarity</strong> (for operators): \\(M' = P^{-1}MP\\)</li>
                            <li><strong>Congruence</strong> (for bilinear forms): \\(M' = P^T M P\\)</li>
                        </ul>
                        <p>Congruence is a weaker equivalence relation than similarity. Two matrices can be congruent without being similar.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="matrix-form-viz"></div>

                <div class="env-block example">
                    <div class="env-title">Example 11.7 (Computing with Matrices)</div>
                    <div class="env-body">
                        <p>Consider \\(\\mathbb{R}^2\\) with basis \\(\\mathcal{B} = \\{(1,0), (0,1)\\}\\) and the bilinear form \\(\\langle (a,b), (c,d) \\rangle = 2ac + ad + bc + 3bd\\). The matrix is</p>
                        \\[M_\\mathcal{B} = \\begin{pmatrix} 2 & 1 \\\\ 1 & 3 \\end{pmatrix}\\]
                        <p>To find \\(\\langle (2,1), (1,-1) \\rangle\\), compute:</p>
                        \\[\\begin{pmatrix} 2 & 1 \\end{pmatrix} \\begin{pmatrix} 2 & 1 \\\\ 1 & 3 \\end{pmatrix} \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 2 & 1 \\end{pmatrix} \\begin{pmatrix} 1 \\\\ -2 \\end{pmatrix} = 0\\]
                        <p>So these vectors are <strong>orthogonal</strong> with respect to this bilinear form.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'matrix-form-viz',
                    title: 'Interactive: Matrix Representation of Bilinear Forms',
                    description: 'See how the matrix entries determine the bilinear form values',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        let a11 = 1, a12 = 0, a22 = 1;

                        const slider11 = VizEngine.createSlider(controls, 'a₁₁', -2, 2, a11, 0.1, (v) => { a11 = v; draw(); });
                        const slider12 = VizEngine.createSlider(controls, 'a₁₂ = a₂₁', -2, 2, a12, 0.1, (v) => { a12 = v; draw(); });
                        const slider22 = VizEngine.createSlider(controls, 'a₂₂', -2, 2, a22, 0.1, (v) => { a22 = v; draw(); });

                        const v1 = viz.addDraggable('v1', 2, 1, viz.colors.blue, 8, () => draw());
                        const v2 = viz.addDraggable('v2', -1, 2, viz.colors.orange, 8, () => draw());

                        function bilinearForm(u, v) {
                            return a11*u[0]*v[0] + a12*(u[0]*v[1] + u[1]*v[0]) + a22*u[1]*v[1];
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const u = [v1.x, v1.y];
                            const v = [v2.x, v2.y];
                            const value = bilinearForm(u, v);

                            viz.drawVector(0, 0, u[0], u[1], viz.colors.blue, 'u');
                            viz.drawVector(0, 0, v[0], v[1], viz.colors.orange, 'v');
                            viz.drawDraggables();

                            viz.drawText(`Matrix M = [${a11.toFixed(1)}  ${a12.toFixed(1)}]`, -6.5, 3.5, viz.colors.white, 14);
                            viz.drawText(`          [${a12.toFixed(1)}  ${a22.toFixed(1)}]`, -6.5, 3, viz.colors.white, 14);
                            viz.drawText(`⟨u,v⟩ = u^T M v = ${value.toFixed(2)}`, -6.5, 2, viz.colors.yellow, 16);

                            if (Math.abs(value) < 0.1) {
                                viz.drawText('u ⊥ v', -6.5, 1.5, viz.colors.green, 14);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the rank of the matrix \\(M_\\mathcal{B}\\) of a bilinear form is independent of the choice of basis.',
                    hint: 'Use the change of basis formula \\(M_{\\mathcal{B}^{\\prime}} = P^T M_\\mathcal{B} P\\) and recall that congruent matrices have the same rank.',
                    solution: 'If \\(M_{\\mathcal{B}^{\\prime}} = P^T M_\\mathcal{B} P\\) where \\(P\\) is invertible, then \\(\\operatorname{rank}(M_{\\mathcal{B}^{\\prime}}) = \\operatorname{rank}(P^T M_\\mathcal{B} P)\\). Since \\(P^T\\) and \\(P\\) are invertible, \\(\\operatorname{rank}(P^T M_\\mathcal{B} P) = \\operatorname{rank}(M_\\mathcal{B} P) = \\operatorname{rank}(M_\\mathcal{B})\\) by the rank-nullity theorem applied to row and column operations. Thus the rank is a well-defined invariant of the bilinear form, called the <strong>rank of the form</strong>.'
                },
                {
                    question: 'Prove that two symmetric matrices over \\(\\mathbb{R}\\) are congruent if and only if they have the same rank and the same signature (number of positive eigenvalues minus number of negative eigenvalues).',
                    hint: 'This is Sylvester\'s Law of Inertia, which we will prove in detail later.',
                    solution: 'This is a deep theorem (Sylvester\'s Law of Inertia). The forward direction: congruent matrices represent the same bilinear form in different bases, so they must have the same rank and signature (both are invariants of the form). The reverse direction requires showing that any symmetric matrix can be diagonalized via congruence to a canonical form with \\(p\\) ones, \\(q\\) negative ones, and zeros, where \\(p-q\\) is the signature and \\(p+q\\) is the rank. We will prove this systematically in Section 5.'
                },
                {
                    question: 'Give an example of two \\(2 \\times 2\\) matrices that are congruent but not similar over \\(\\mathbb{R}\\).',
                    hint: 'Consider diagonal matrices with different entries that can be made identical through scaling.',
                    solution: 'Let \\(M_1 = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}\\) and \\(M_2 = \\begin{pmatrix} 4 & 0 \\\\ 0 & 9 \\end{pmatrix}\\). Take \\(P = \\begin{pmatrix} 2 & 0 \\\\ 0 & 3 \\end{pmatrix}\\). Then \\(P^T M_1 P = \\begin{pmatrix} 2 & 0 \\\\ 0 & 3 \\end{pmatrix} \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} \\begin{pmatrix} 2 & 0 \\\\ 0 & 3 \\end{pmatrix} = M_2\\), so they are congruent. But \\(M_1\\) has eigenvalue 1 with multiplicity 2, while \\(M_2\\) has eigenvalues 4 and 9, so they are not similar.'
                }
            ]
        },
        {
            id: 'ch11-sec03',
            title: 'Orthogonality and the Radical',
            content: `
                <h2>Orthogonality and the Radical</h2>

                <p>The concept of orthogonality extends from inner products to general bilinear forms, but with surprising new phenomena.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 11.8 (Orthogonality)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be a metric vector space with bilinear form \\(\\langle \\cdot, \\cdot \\rangle\\).</p>
                        <ul>
                            <li>Vectors \\(u, v \\in V\\) are <strong>orthogonal</strong>, written \\(u \\perp v\\), if \\(\\langle u, v \\rangle = 0\\)</li>
                            <li>For a subspace \\(W \\subseteq V\\), the <strong>orthogonal complement</strong> is \\(W^\\perp = \\{v \\in V : \\langle v, w \\rangle = 0 \\text{ for all } w \\in W\\}\\)</li>
                            <li>A vector \\(v\\) is <strong>isotropic</strong> if \\(\\langle v, v \\rangle = 0\\)</li>
                            <li>The <strong>radical</strong> (or <strong>kernel</strong>) of \\(V\\) is \\(\\operatorname{rad}(V) = V^\\perp = \\{v \\in V : \\langle v, w \\rangle = 0 \\text{ for all } w \\in V\\}\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning: Orthogonality is Not Always Symmetric!</div>
                    <div class="env-body">
                        <p>For a general bilinear form, \\(u \\perp v\\) does <strong>not</strong> necessarily imply \\(v \\perp u\\). For example, with the antisymmetric form \\(\\langle (a,b), (c,d) \\rangle = ad - bc\\) on \\(\\mathbb{R}^2\\), we have \\(\\langle (1,0), (0,1) \\rangle = 1\\) but \\(\\langle (0,1), (1,0) \\rangle = -1\\). However, \\(\\langle (1,0), (1,0) \\rangle = 0\\), so \\((1,0) \\perp (1,0)\\)!</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 11.9 (Nondegeneracy)</div>
                    <div class="env-body">
                        <p>A metric vector space \\(V\\) is <strong>nonsingular</strong> (or <strong>nondegenerate</strong>) if \\(\\operatorname{rad}(V) = \\{0\\}\\). Otherwise, it is <strong>singular</strong> (or <strong>degenerate</strong>).</p>
                        <p>A subspace \\(W\\) is nonsingular if \\(W \\cap W^\\perp = \\{0\\}\\).</p>
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 11.10</div>
                    <div class="env-body">
                        <p>\\(V\\) is nonsingular if and only if the matrix \\(M_\\mathcal{B}\\) of the form is invertible for some (equivalently, every) basis \\(\\mathcal{B}\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>A vector \\(v = \\sum a_i v_i\\) is in \\(\\operatorname{rad}(V)\\) if and only if \\(\\langle v, v_j \\rangle = 0\\) for all \\(j\\). This gives</p>
                        \\[\\sum_{i=1}^n a_i \\langle v_i, v_j \\rangle = 0 \\quad \\text{for all } j\\]
                        <p>In matrix form: \\(M_\\mathcal{B} [v]_\\mathcal{B} = 0\\). So \\(\\operatorname{rad}(V) = \\{0\\}\\) if and only if \\(M_\\mathcal{B}\\) has trivial kernel, i.e., \\(M_\\mathcal{B}\\) is invertible.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 11.11 (Degenerate Space)</div>
                    <div class="env-body">
                        <p>On \\(\\mathbb{R}^3\\), define \\(\\langle (a,b,c), (x,y,z) \\rangle = ax + by\\). The matrix in the standard basis is</p>
                        \\[M = \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}\\]
                        <p>This is singular. The radical is \\(\\operatorname{rad}(V) = \\{(0,0,c) : c \\in \\mathbb{R}\\}\\), the \\(z\\)-axis. Every vector of the form \\((0,0,c)\\) is orthogonal to all vectors in \\(V\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 11.12 (Decomposition Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be a finite-dimensional metric vector space. Then</p>
                        \\[V = \\operatorname{rad}(V) \\oplus W\\]
                        <p>for some nonsingular subspace \\(W\\). Moreover, \\(\\operatorname{rad}(V)\\) is totally isotropic (all vectors in it have zero "length squared").</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="radical-viz"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 11.13 (Dimension of Orthogonal Complement)</div>
                    <div class="env-body">
                        <p>Let \\(W\\) be a subspace of a finite-dimensional metric vector space \\(V\\). If \\(V\\) or \\(W\\) is nonsingular, then</p>
                        \\[\\dim(W) + \\dim(W^\\perp) = \\dim(V)\\]
                        <p>Furthermore, \\((W^\\perp)^\\perp = W\\) if \\(V\\) is nonsingular.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Define the linear map \\(\\phi: V \\to W^*\\) by \\(\\phi(v)(w) = \\langle v, w \\rangle\\). Then \\(\\ker(\\phi) = W^\\perp\\). If \\(W\\) is nonsingular, then \\(\\phi\\) is surjective (by Riesz representation for subspaces). By rank-nullity:</p>
                        \\[\\dim(V) = \\dim(W^*) + \\dim(W^\\perp) = \\dim(W) + \\dim(W^\\perp)\\]
                        <div class="qed">∎</div>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'radical-viz',
                    title: 'Interactive: The Radical of a Degenerate Form',
                    description: 'Visualize the radical as the set of vectors orthogonal to everything',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        let formType = 'degenerate';
                        const typeSelect = document.createElement('select');
                        typeSelect.innerHTML = `
                            <option value="degenerate">Degenerate: ⟨u,v⟩ = u₁v₁</option>
                            <option value="nondegenerate">Nondegenerate: ⟨u,v⟩ = u₁v₁ + u₂v₂</option>
                        `;
                        typeSelect.style.cssText = 'margin: 10px 0; padding: 5px; font-size: 14px;';
                        typeSelect.onchange = (e) => {
                            formType = e.target.value;
                            draw();
                        };
                        controls.appendChild(typeSelect);

                        const testVec = viz.addDraggable('test', 2, 1.5, viz.colors.blue, 8, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            if (formType === 'degenerate') {
                                // Draw the radical (y-axis)
                                for (let t = -4; t <= 4; t += 0.2) {
                                    viz.drawPoint(0, t, viz.colors.red + '88', null, 4);
                                }
                                viz.drawText('rad(V) = y-axis', -6.5, -3, viz.colors.red, 14);
                                viz.drawLine(0, -4, 0, 4, viz.colors.red, 2);

                                const u = [testVec.x, testVec.y];
                                const isInRadical = Math.abs(u[0]) < 0.1;

                                viz.drawVector(0, 0, u[0], u[1], viz.colors.blue, 'v');
                                viz.drawDraggables();

                                viz.drawText(`⟨v,v⟩ = ${(u[0]*u[0]).toFixed(2)}`, -6.5, 3, viz.colors.white, 14);

                                if (isInRadical) {
                                    viz.drawText('v ∈ rad(V)', -6.5, 2.5, viz.colors.green, 16);
                                    viz.drawText('v ⊥ all vectors!', -6.5, 2, viz.colors.green, 14);
                                } else {
                                    viz.drawText('v ∉ rad(V)', -6.5, 2.5, viz.colors.yellow, 14);
                                }
                            } else {
                                viz.drawText('rad(V) = {0}', -6.5, -3, viz.colors.green, 14);
                                viz.drawText('(nondegenerate)', -6.5, -3.5, viz.colors.green, 12);

                                const u = [testVec.x, testVec.y];
                                viz.drawVector(0, 0, u[0], u[1], viz.colors.blue, 'v');
                                viz.drawDraggables();

                                viz.drawText(`⟨v,v⟩ = ${(u[0]*u[0] + u[1]*u[1]).toFixed(2)}`, -6.5, 3, viz.colors.white, 14);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that \\(W \\subseteq W^{\\perp\\perp}\\) always holds, but equality need not hold if \\(V\\) is degenerate.',
                    hint: 'For inclusion, check that if \\(w \\in W\\), then \\(\\langle w, v \\rangle = 0\\) for all \\(v \\in W^\\perp\\). For a counterexample, consider Example 11.11.',
                    solution: 'If \\(w \\in W\\) and \\(v \\in W^\\perp\\), then by definition \\(\\langle v, w \\rangle = 0\\). If the form is symmetric (or at least if orthogonality is symmetric), then \\(\\langle w, v \\rangle = 0\\), so \\(w \\in W^{\\perp\\perp}\\). For a counterexample to equality: in Example 11.11 with \\(V = \\mathbb{R}^3\\) and \\(\\langle (a,b,c), (x,y,z) \\rangle = ax + by\\), let \\(W = \\operatorname{span}\\{(1,0,0)\\}\\). Then \\(W^\\perp = \\{(0,y,z) : y,z \\in \\mathbb{R}\\}\\) and \\(W^{\\perp\\perp} = \\{(x,0,0) : x \\in \\mathbb{R}\\} = W\\). Actually this gives equality. Better: let \\(W = \\operatorname{span}\\{(0,0,1)\\} \\subseteq \\operatorname{rad}(V)\\). Then \\(W^\\perp = V\\) (everything is orthogonal to the radical), and \\(W^{\\perp\\perp} = V^\\perp = \\operatorname{rad}(V) \\supsetneq W\\).'
                },
                {
                    question: 'Prove that a symmetric bilinear form on \\(\\mathbb{R}^n\\) is nondegenerate if and only if it is an inner product (positive definite).',
                    hint: 'This is FALSE! Nondegeneracy only requires \\(\\det(M) \\neq 0\\), not positive definiteness.',
                    solution: 'The statement is false. Counterexample: the Minkowski metric \\(\\langle x,y \\rangle = x_1y_1 - x_2y_2\\) on \\(\\mathbb{R}^2\\) has matrix \\(M = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}\\) with \\(\\det(M) = -1 \\neq 0\\), so it is nondegenerate. But \\(\\langle (0,1), (0,1) \\rangle = -1 < 0\\), so it is not positive definite, hence not an inner product. The correct statement: a symmetric bilinear form is nondegenerate iff its matrix is invertible.'
                },
                {
                    question: 'Let \\(V\\) be a metric vector space and \\(W_1, W_2\\) subspaces with \\(W_1 \\perp W_2\\) (meaning every vector in \\(W_1\\) is orthogonal to every vector in \\(W_2\\)). Must \\(W_1 \\cap W_2 = \\{0\\}\\)?',
                    hint: 'Consider what happens with isotropic vectors.',
                    solution: 'No. If \\(v\\) is isotropic and nonzero, let \\(W_1 = W_2 = \\operatorname{span}\\{v\\}\\). Then \\(\\langle v, v \\rangle = 0\\), so \\(W_1 \\perp W_2\\), but \\(W_1 \\cap W_2 = W_1 \\neq \\{0\\}\\). For a concrete example: in \\(\\mathbb{R}^2\\) with \\(\\langle (a,b), (c,d) \\rangle = ac - bd\\) (Lorentz form), the vector \\(v = (1,1)\\) satisfies \\(\\langle v,v \\rangle = 1 - 1 = 0\\).'
                }
            ]
        },
        {
            id: 'ch11-sec04',
            title: 'Quadratic Forms and Diagonalization',
            content: `
                <h2>Quadratic Forms and Diagonalization</h2>

                <p>Every symmetric bilinear form gives rise to a quadratic form, a fundamental object in geometry, optimization, and number theory.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 11.14 (Quadratic Form)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be a vector space over a field \\(F\\) with \\(\\operatorname{char}(F) \\neq 2\\), and let \\(\\langle \\cdot, \\cdot \\rangle\\) be a symmetric bilinear form on \\(V\\). The associated <strong>quadratic form</strong> is the function \\(Q: V \\to F\\) defined by</p>
                        \\[Q(v) = \\langle v, v \\rangle\\]
                        <p>In coordinates, if \\(v = (x_1, \\ldots, x_n)\\) and the form has matrix \\(M\\), then</p>
                        \\[Q(v) = \\sum_{i,j} M_{ij} x_i x_j = x^T M x\\]
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 11.15 (Polarization Identity)</div>
                    <div class="env-body">
                        <p>When \\(\\operatorname{char}(F) \\neq 2\\), the symmetric bilinear form can be recovered from its quadratic form via</p>
                        \\[\\langle u, v \\rangle = \\frac{1}{2}\\left(Q(u+v) - Q(u) - Q(v)\\right)\\]
                        <p>or equivalently,</p>
                        \\[\\langle u, v \\rangle = \\frac{1}{4}\\left(Q(u+v) - Q(u-v)\\right)\\]
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 11.16 (Classical Quadratic Forms)</div>
                    <div class="env-body">
                        <p><strong>(a) Ellipsoid:</strong> \\(Q(x,y,z) = x^2 + 4y^2 + 9z^2\\). Level sets \\(Q = c\\) are ellipsoids.</p>

                        <p><strong>(b) Hyperboloid:</strong> \\(Q(x,y,z) = x^2 + y^2 - z^2\\). Level set \\(Q = 1\\) is a hyperboloid of one sheet.</p>

                        <p><strong>(c) Saddle:</strong> \\(Q(x,y) = x^2 - y^2\\). Level curves are hyperbolas.</p>

                        <p><strong>(d) Degenerate cone:</strong> \\(Q(x,y,z) = x^2 + y^2\\). This is degenerate (independent of \\(z\\)).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="quadratic-form-viz"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 11.17 (Diagonalization of Symmetric Forms)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be a finite-dimensional vector space over a field \\(F\\) with \\(\\operatorname{char}(F) \\neq 2\\), and let \\(\\langle \\cdot, \\cdot \\rangle\\) be a symmetric bilinear form on \\(V\\). If the form is not alternating (i.e., not identically zero), then there exists a basis \\(\\mathcal{B} = (v_1, \\ldots, v_n)\\) such that the matrix of the form is diagonal:</p>
                        \\[M_\\mathcal{B} = \\begin{pmatrix} d_1 & & \\\\ & \\ddots & \\\\ & & d_n \\end{pmatrix}\\]
                        <p>where \\(d_i = \\langle v_i, v_i \\rangle\\). Such a basis is called an <strong>orthogonal basis</strong>.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Sketch)</div>
                    <div class="env-body">
                        <p>We proceed by induction on \\(n = \\dim(V)\\). If \\(n = 1\\), any basis works. Assume true for dimension \\(n-1\\).</p>

                        <p>Since the form is not identically zero, there exists \\(v_1 \\in V\\) with \\(\\langle v_1, v_1 \\rangle \\neq 0\\). Let \\(W = \\operatorname{span}(v_1)\\) and consider \\(W^\\perp = \\{v \\in V : \\langle v, v_1 \\rangle = 0\\}\\).</p>

                        <p><strong>Claim:</strong> \\(V = W \\oplus W^\\perp\\). Proof: If \\(v \\in W \\cap W^\\perp\\), then \\(v = cv_1\\) for some \\(c\\), and \\(0 = \\langle v, v_1 \\rangle = c\\langle v_1, v_1 \\rangle\\). Since \\(\\langle v_1, v_1 \\rangle \\neq 0\\), we have \\(c = 0\\), so \\(v = 0\\). For dimension: \\(\\dim(W^\\perp) = n-1\\) by Theorem 11.13 (since \\(W\\) is nonsingular). Thus \\(\\dim(W) + \\dim(W^\\perp) = 1 + (n-1) = n = \\dim(V)\\), and \\(V = W \\oplus W^\\perp\\).</p>

                        <p>By induction, \\(W^\\perp\\) has an orthogonal basis \\((v_2, \\ldots, v_n)\\). Then \\((v_1, \\ldots, v_n)\\) is an orthogonal basis for \\(V\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 11.18</div>
                    <div class="env-body">
                        <p>Every symmetric matrix \\(M\\) over a field of characteristic \\(\\neq 2\\) is congruent to a diagonal matrix. That is, there exists an invertible matrix \\(P\\) such that \\(P^T M P\\) is diagonal.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Diagonalization vs. Orthogonal Diagonalization</div>
                    <div class="env-body">
                        <p>Note the distinction:</p>
                        <ul>
                            <li><strong>Congruence diagonalization</strong> (what we just proved): \\(P^TMP = D\\) for invertible \\(P\\)</li>
                            <li><strong>Orthogonal diagonalization</strong> (spectral theorem for symmetric matrices): \\(Q^TMQ = D\\) where \\(Q^TQ = I\\) (over \\(\\mathbb{R}\\))</li>
                        </ul>
                        <p>Every symmetric matrix is congruent to a diagonal matrix (general fields). Over \\(\\mathbb{R}\\), symmetric matrices are <em>orthogonally</em> similar to diagonal matrices (stronger!).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'quadratic-form-viz',
                    title: 'Interactive: Level Curves of Quadratic Forms',
                    description: 'Visualize level sets Q(x,y) = c for different quadratic forms',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        let a = 1, b = 0, c = 1;

                        const sliderA = VizEngine.createSlider(controls, 'a (x² coeff)', -2, 2, a, 0.1, (v) => { a = v; draw(); });
                        const sliderB = VizEngine.createSlider(controls, 'b (xy coeff)', -2, 2, b, 0.1, (v) => { b = v; draw(); });
                        const sliderC = VizEngine.createSlider(controls, 'c (y² coeff)', -2, 2, c, 0.1, (v) => { c = v; draw(); });

                        function Q(x, y) {
                            return a*x*x + b*x*y + c*y*y;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw level curves
                            const levels = [-4, -2, -1, 0, 1, 2, 4];
                            const colors = [viz.colors.blue, viz.colors.teal, viz.colors.green,
                                          viz.colors.yellow, viz.colors.orange, viz.colors.red, viz.colors.pink];

                            for (let li = 0; li < levels.length; li++) {
                                const level = levels[li];
                                const color = colors[li] + '88';

                                // Sample points on level curve
                                for (let x = -6; x <= 6; x += 0.1) {
                                    for (let y = -5; y <= 5; y += 0.1) {
                                        const val = Q(x, y);
                                        if (Math.abs(val - level) < 0.15) {
                                            viz.drawPoint(x, y, color, null, 2);
                                        }
                                    }
                                }
                            }

                            viz.drawText(`Q(x,y) = ${a.toFixed(1)}x² + ${b.toFixed(1)}xy + ${c.toFixed(1)}y²`,
                                        -6.5, -4.5, viz.colors.white, 12);

                            const det = a*c - b*b/4;
                            const trace = a + c;
                            let type = '';
                            if (Math.abs(det) < 0.01) type = 'Degenerate';
                            else if (det > 0 && a > 0) type = 'Positive definite (elliptic)';
                            else if (det > 0 && a < 0) type = 'Negative definite (elliptic)';
                            else if (det < 0) type = 'Indefinite (hyperbolic)';

                            viz.drawText(type, -6.5, -5, viz.colors.yellow, 12);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find an orthogonal basis for \\(\\mathbb{R}^2\\) with the bilinear form \\(\\langle (a,b), (c,d) \\rangle = 2ac + ad + bc + 3bd\\).',
                    hint: 'Start with \\(v_1 = (1, 0)\\). Compute \\(\\langle v_1, v_1 \\rangle\\) and find \\(v_1^\\perp\\).',
                    solution: 'Let \\(v_1 = (1,0)\\). Then \\(\\langle v_1, v_1 \\rangle = 2(1)(1) = 2 \\neq 0\\). For \\(v_2 = (x,y) \\in v_1^\\perp\\), we need \\(\\langle (x,y), (1,0) \\rangle = 0\\). This gives \\(2x(1) + x(0) + y(1) + 3y(0) = 2x + y = 0\\), so \\(y = -2x\\). Take \\(v_2 = (1, -2)\\). Check: \\(\\langle v_2, v_2 \\rangle = 2(1)(1) + 1(-2) + (-2)(1) + 3(-2)(-2) = 2 - 2 - 2 + 12 = 10 \\neq 0\\). So \\(\\mathcal{B} = \\{(1,0), (1,-2)\\}\\) is an orthogonal basis with matrix \\(M_\\mathcal{B} = \\begin{pmatrix} 2 & 0 \\\\ 0 & 10 \\end{pmatrix}\\).'
                },
                {
                    question: 'Classify the quadratic form \\(Q(x,y,z) = x^2 + 2xy + y^2 + z^2\\) by finding its canonical diagonal form.',
                    hint: 'Complete the square: \\(x^2 + 2xy + y^2 = (x+y)^2\\).',
                    solution: 'Rewrite \\(Q(x,y,z) = (x+y)^2 + z^2\\). Change variables: \\(u = x+y, v = x-y, w = z\\). Then \\(x = (u+v)/2, y = (u-v)/2\\), and \\(Q = u^2 + w^2\\). But we also need to express \\(v\\). Actually, simpler: let \\(u = x+y, v = y, w = z\\). Then \\(Q = u^2 + w^2\\), which shows the form is degenerate (no \\(v\\) term). The matrix is \\(M = \\begin{pmatrix} 1 & 1 & 0 \\\\ 1 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}\\) with rank 2. After congruence, we get \\(\\operatorname{diag}(1, 0, 1)\\) or \\(\\operatorname{diag}(1, 1, 0)\\) depending on basis choice.'
                },
                {
                    question: 'Show that the quadratic form \\(Q(v) = \\langle v,v \\rangle\\) satisfies \\(Q(cv) = c^2 Q(v)\\) for any scalar \\(c\\), but is generally not linear.',
                    hint: 'Use bilinearity of the form.',
                    solution: '\\(Q(cv) = \\langle cv, cv \\rangle = c\\langle v, cv \\rangle = c \\cdot c\\langle v,v \\rangle = c^2 Q(v)\\) by bilinearity. This shows \\(Q\\) is homogeneous of degree 2. To see it is not linear, note that \\(Q(v+w) = \\langle v+w, v+w \\rangle = Q(v) + 2\\langle v,w \\rangle + Q(w) \\neq Q(v) + Q(w)\\) in general (the cross term \\(2\\langle v,w \\rangle\\) appears).'
                }
            ]
        },
        {
            id: 'ch11-sec05',
            title: 'Sylvester\'s Law of Inertia',
            content: `
                <h2>Sylvester's Law of Inertia</h2>

                <p>Over \\(\\mathbb{R}\\), symmetric bilinear forms can be completely classified by a remarkable invariant called the <strong>signature</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 11.19 (Signature)</div>
                    <div class="env-body">
                        <p>Let \\(Q\\) be a quadratic form on \\(\\mathbb{R}^n\\) with matrix \\(M\\). After diagonalization, suppose \\(M\\) is congruent to</p>
                        \\[D = \\operatorname{diag}(d_1, \\ldots, d_n)\\]
                        <p>where \\(d_i \\in \\mathbb{R}\\). Let:</p>
                        <ul>
                            <li>\\(p\\) = number of positive \\(d_i\\)</li>
                            <li>\\(q\\) = number of negative \\(d_i\\)</li>
                            <li>\\(r\\) = number of zero \\(d_i\\)</li>
                        </ul>
                        <p>The <strong>signature</strong> of \\(Q\\) is the pair \\((p, q)\\), or sometimes the single number \\(p - q\\). The <strong>rank</strong> is \\(p + q = n - r\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 11.20 (Sylvester's Law of Inertia)</div>
                    <div class="env-body">
                        <p>Let \\(Q\\) be a quadratic form on a real vector space \\(V\\). The signature \\((p, q)\\) is independent of the choice of orthogonal basis used to diagonalize the form. That is, if</p>
                        \\[M \\cong \\operatorname{diag}(d_1, \\ldots, d_n) \\quad \\text{and} \\quad M \\cong \\operatorname{diag}(d'_1, \\ldots, d'_n)\\]
                        <p>then the number of positive (negative, zero) \\(d_i\\) equals the number of positive (negative, zero) \\(d'_i\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Suppose we have two diagonal forms with \\(p, p'\\) positive entries respectively. Let \\(V^+\\) be the span of eigenvectors corresponding to positive eigenvalues in the first diagonalization, and \\(V^-\\) be the span of eigenvectors corresponding to negative and zero eigenvalues in the second.</p>

                        <p>Then \\(\\dim(V^+) = p\\) and \\(\\dim(V^-) = q' + r'\\). If \\(v \\in V^+ \\cap V^-\\) and \\(v \\neq 0\\), then:</p>
                        <ul>
                            <li>Since \\(v \\in V^+\\), we have \\(Q(v) > 0\\) (as \\(v\\) is a positive linear combination of vectors with \\(Q(v_i) > 0\\))</li>
                            <li>Since \\(v \\in V^-\\), we have \\(Q(v) \\leq 0\\)</li>
                        </ul>
                        <p>This is a contradiction, so \\(V^+ \\cap V^- = \\{0\\}\\). By dimension:</p>
                        \\[\\dim(V^+ + V^-) = \\dim(V^+) + \\dim(V^-) = p + (q' + r')\\]
                        <p>Since \\(V^+ + V^- \\subseteq V\\), we have \\(p + q' + r' \\leq n\\). But \\(q' + r' = n - p'\\), so \\(p \\leq p'\\). By symmetry, \\(p' \\leq p\\), so \\(p = p'\\). Similarly, \\(q = q'\\) and \\(r = r'\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 11.21 (Canonical Form over \\(\\mathbb{R}\\))</div>
                    <div class="env-body">
                        <p>Every symmetric bilinear form on \\(\\mathbb{R}^n\\) is congruent to exactly one matrix of the form</p>
                        \\[I_{p,q,r} = \\begin{pmatrix} I_p & 0 & 0 \\\\ 0 & -I_q & 0 \\\\ 0 & 0 & 0_r \\end{pmatrix}\\]
                        <p>where \\(I_p\\) is the \\(p \\times p\\) identity matrix, \\(-I_q\\) is the negative of the \\(q \\times q\\) identity, and \\(0_r\\) is the \\(r \\times r\\) zero matrix, with \\(p + q + r = n\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 11.22 (Signatures of Classical Forms)</div>
                    <div class="env-body">
                        <p><strong>(a) Euclidean metric</strong> on \\(\\mathbb{R}^n\\): \\(Q(x) = x_1^2 + \\cdots + x_n^2\\) has signature \\((n, 0)\\)</p>

                        <p><strong>(b) Minkowski metric</strong> on \\(\\mathbb{R}^4\\): \\(Q(x) = x_1^2 + x_2^2 + x_3^2 - x_4^2\\) has signature \\((3, 1)\\)</p>

                        <p><strong>(c) Lorentz form</strong> on \\(\\mathbb{R}^2\\): \\(Q(x,y) = x^2 - y^2\\) has signature \\((1, 1)\\)</p>

                        <p><strong>(d) Degenerate form</strong>: \\(Q(x,y,z) = x^2 + y^2\\) has signature \\((2, 0)\\) with rank 2</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="signature-viz"></div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: What Signature Tells Us</div>
                    <div class="env-body">
                        <p>The signature captures the "shape" of the quadratic form:</p>
                        <ul>
                            <li>\\((n, 0)\\): <strong>Positive definite</strong> – ellipsoids, always curves upward, has a minimum</li>
                            <li>\\((0, n)\\): <strong>Negative definite</strong> – ellipsoids opening downward, has a maximum</li>
                            <li>\\((p, q)\\) with \\(p, q > 0\\): <strong>Indefinite</strong> – hyperbolic/saddle, no extrema, level sets are hyperboloids</li>
                            <li>\\((p, q)\\) with \\(r > 0\\): <strong>Degenerate</strong> – the form "ignores" \\(r\\) dimensions</li>
                        </ul>
                        <p>In physics, signature \\((3,1)\\) or \\((1,3)\\) describes space-time in special relativity!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'signature-viz',
                    title: 'Interactive: Signature and Form Behavior',
                    description: 'Explore how signature determines the geometry of quadratic forms',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        let sig_p = 2, sig_q = 0;

                        const infoDiv = document.createElement('div');
                        infoDiv.style.cssText = 'margin: 10px 0; padding: 10px; background: #1a1a1a; border-radius: 5px;';
                        controls.appendChild(infoDiv);

                        const buttonPD = VizEngine.createButton(controls, 'Positive Definite (2,0)', () => {
                            sig_p = 2; sig_q = 0; draw();
                        });
                        const buttonND = VizEngine.createButton(controls, 'Negative Definite (0,2)', () => {
                            sig_p = 0; sig_q = 2; draw();
                        });
                        const buttonIndef = VizEngine.createButton(controls, 'Indefinite (1,1)', () => {
                            sig_p = 1; sig_q = 1; draw();
                        });

                        buttonPD.style.cssText = buttonND.style.cssText = buttonIndef.style.cssText =
                            'margin: 5px; padding: 8px; font-size: 13px;';

                        function Q(x, y) {
                            if (sig_p === 2) return x*x + y*y;
                            else if (sig_q === 2) return -x*x - y*y;
                            else return x*x - y*y;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw level curves
                            let levels;
                            if (sig_p === 2) levels = [0.5, 1, 2, 4, 8];
                            else if (sig_q === 2) levels = [-8, -4, -2, -1, -0.5];
                            else levels = [-4, -2, -1, 0, 1, 2, 4];

                            for (let li = 0; li < levels.length; li++) {
                                const level = levels[li];
                                const color = viz.colors.teal + '66';

                                for (let x = -6; x <= 6; x += 0.08) {
                                    for (let y = -5; y <= 5; y += 0.08) {
                                        const val = Q(x, y);
                                        if (Math.abs(val - level) < 0.2) {
                                            viz.drawPoint(x, y, color, null, 2);
                                        }
                                    }
                                }
                            }

                            let formText = '';
                            let sigText = '';
                            let typeText = '';

                            if (sig_p === 2) {
                                formText = 'Q(x,y) = x² + y²';
                                sigText = 'Signature: (2, 0)';
                                typeText = 'Type: Positive Definite (Elliptic)';
                            } else if (sig_q === 2) {
                                formText = 'Q(x,y) = -x² - y²';
                                sigText = 'Signature: (0, 2)';
                                typeText = 'Type: Negative Definite (Elliptic)';
                            } else {
                                formText = 'Q(x,y) = x² - y²';
                                sigText = 'Signature: (1, 1)';
                                typeText = 'Type: Indefinite (Hyperbolic)';
                            }

                            viz.drawText(formText, -6.5, 4.5, viz.colors.white, 14);
                            viz.drawText(sigText, -6.5, 4, viz.colors.yellow, 14);
                            viz.drawText(typeText, -6.5, 3.5, viz.colors.green, 13);

                            infoDiv.innerHTML = `<div style="color: #3fb9a0; font-size: 13px;">
                                ${sig_p} positive direction${sig_p !== 1 ? 's' : ''},
                                ${sig_q} negative direction${sig_q !== 1 ? 's' : ''}</div>`;
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the signature of the quadratic form \\(Q(x,y,z) = x^2 + 2xy + 2y^2 + 2yz + z^2\\) over \\(\\mathbb{R}\\).',
                    hint: 'Complete the square or find the eigenvalues of the associated matrix.',
                    solution: 'The matrix is \\(M = \\begin{pmatrix} 1 & 1 & 0 \\\\ 1 & 2 & 1 \\\\ 0 & 1 & 1 \\end{pmatrix}\\). Compute eigenvalues via \\(\\det(M - \\lambda I) = 0\\). Expanding: \\(\\det\\begin{pmatrix} 1-\\lambda & 1 & 0 \\\\ 1 & 2-\\lambda & 1 \\\\ 0 & 1 & 1-\\lambda \\end{pmatrix} = (1-\\lambda)[(2-\\lambda)(1-\\lambda) - 1] - 1[(1)(1-\\lambda) - 0] = (1-\\lambda)[2 - 3\\lambda + \\lambda^2 - 1] - (1-\\lambda) = (1-\\lambda)(\\lambda^2 - 3\\lambda + 1 - 1) = (1-\\lambda)(\\lambda^2 - 3\\lambda) = (1-\\lambda)\\lambda(\\lambda - 3)\\). Wait, let me recalculate. Actually, use completing the square: \\(Q = x^2 + 2xy + 2y^2 + 2yz + z^2 = (x+y)^2 + y^2 + 2yz + z^2 = (x+y)^2 + (y+z)^2\\). This has signature \\((2, 0)\\) and rank 2 (degenerate). To verify: Let \\(u = x+y, v = y+z\\). Then \\(Q = u^2 + v^2\\).'
                },
                {
                    question: 'Prove that a symmetric bilinear form over \\(\\mathbb{R}\\) is positive definite if and only if its signature is \\((n, 0)\\).',
                    hint: 'Use the diagonal form and the definition of positive definite.',
                    solution: 'If signature is \\((n,0)\\), then the form is congruent to \\(I_n\\), so \\(Q(v) = \\sum_{i=1}^n y_i^2\\) in some basis \\((e_1, \\ldots, e_n)\\) where \\(v = \\sum y_i e_i\\). Thus \\(Q(v) \\geq 0\\) with equality iff all \\(y_i = 0\\) iff \\(v = 0\\). So \\(Q\\) is positive definite. Conversely, if \\(Q\\) is positive definite, then in any diagonal form \\(Q(v) = \\sum d_i y_i^2\\), taking \\(v = e_i\\) gives \\(Q(e_i) = d_i > 0\\), so all \\(d_i > 0\\), giving signature \\((n, 0)\\).'
                },
                {
                    question: 'Show that two symmetric matrices over \\(\\mathbb{R}\\) of the same size are congruent if and only if they have the same rank and signature.',
                    hint: 'This is the content of Sylvester\'s Law applied to classification.',
                    solution: 'By Corollary 11.21, any symmetric matrix \\(M\\) is congruent to a unique canonical form \\(I_{p,q,r}\\) where \\(p + q = \\operatorname{rank}(M)\\) and \\((p,q)\\) is the signature. Two matrices are congruent to the same canonical form iff they have the same \\(p, q, r\\). Since \\(r = n - p - q\\), this is equivalent to same \\(p, q\\), i.e., same signature and rank. Thus \\(M_1 \\cong M_2\\) iff \\(\\operatorname{sig}(M_1) = \\operatorname{sig}(M_2)\\) and \\(\\operatorname{rank}(M_1) = \\operatorname{rank}(M_2)\\).'
                }
            ]
        },
        {
            id: 'ch11-sec06',
            title: 'Symplectic Geometry and Alternating Forms',
            content: `
                <h2>Symplectic Geometry and Alternating Forms</h2>

                <p>Alternating (antisymmetric with zero diagonal) bilinear forms arise naturally in classical mechanics, differential geometry, and the study of Hamiltonian systems.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 11.23 (Symplectic Vector Space)</div>
                    <div class="env-body">
                        <p>A <strong>symplectic vector space</strong> is a pair \\((V, \\omega)\\) where \\(V\\) is a vector space and \\(\\omega\\) is a nondegenerate alternating bilinear form. The form \\(\\omega\\) is called a <strong>symplectic form</strong>.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 11.24 (Standard Symplectic Space)</div>
                    <div class="env-body">
                        <p>On \\(\\mathbb{R}^{2n}\\), define</p>
                        \\[\\omega((x_1, \\ldots, x_n, y_1, \\ldots, y_n), (x'_1, \\ldots, x'_n, y'_1, \\ldots, y'_n)) = \\sum_{i=1}^n (x_i y'_i - y_i x'_i)\\]
                        <p>This is the <strong>standard symplectic form</strong>. Its matrix is</p>
                        \\[J = \\begin{pmatrix} 0 & I_n \\\\ -I_n & 0 \\end{pmatrix}\\]
                        <p>where \\(I_n\\) is the \\(n \\times n\\) identity matrix.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 11.25 (Canonical Form for Alternating Forms)</div>
                    <div class="env-body">
                        <p>Let \\(\\omega\\) be an alternating bilinear form on a finite-dimensional vector space \\(V\\) over a field of characteristic \\(\\neq 2\\). Then there exists a basis of \\(V\\) in which \\(\\omega\\) has the block-diagonal matrix</p>
                        \\[\\begin{pmatrix} J_2 & & & & \\\\ & \\ddots & & & \\\\ & & J_2 & & \\\\ & & & 0 & \\\\ & & & & \\ddots \\end{pmatrix}\\]
                        <p>where \\(J_2 = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}\\). The number of \\(J_2\\) blocks equals \\(\\frac{1}{2}\\operatorname{rank}(\\omega)\\).</p>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 11.26</div>
                    <div class="env-body">
                        <p>If \\((V, \\omega)\\) is a symplectic vector space, then \\(\\dim(V)\\) is even. If \\(\\dim(V) = 2n\\), there exists a basis \\((e_1, \\ldots, e_n, f_1, \\ldots, f_n)\\) such that</p>
                        \\[\\omega(e_i, e_j) = 0, \\quad \\omega(f_i, f_j) = 0, \\quad \\omega(e_i, f_j) = \\delta_{ij}\\]
                        <p>Such a basis is called a <strong>symplectic basis</strong>.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 11.27 (Phase Space in Classical Mechanics)</div>
                    <div class="env-body">
                        <p>In Hamiltonian mechanics, the phase space of a system with \\(n\\) degrees of freedom is \\(\\mathbb{R}^{2n}\\) with coordinates \\((q_1, \\ldots, q_n, p_1, \\ldots, p_n)\\) representing positions and momenta. The natural symplectic form is</p>
                        \\[\\omega = \\sum_{i=1}^n dq_i \\wedge dp_i\\]
                        <p>In coordinates: \\(\\omega((\\delta q, \\delta p), (\\delta q', \\delta p')) = \\sum_i (\\delta q_i \\delta p'_i - \\delta p_i \\delta q'_i)\\).</p>
                        <p>Hamilton's equations preserve this symplectic structure, meaning the time evolution is a <strong>symplectomorphism</strong> (a linear map preserving \\(\\omega\\)).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 11.28 (Symplectic Transformations)</div>
                    <div class="env-body">
                        <p>A linear transformation \\(T: V \\to V\\) on a symplectic space \\((V, \\omega)\\) is <strong>symplectic</strong> if</p>
                        \\[\\omega(Tv, Tw) = \\omega(v, w) \\quad \\text{for all } v, w \\in V\\]
                        <p>The set of all symplectic transformations forms a group called the <strong>symplectic group</strong> \\(\\operatorname{Sp}(V, \\omega)\\) or \\(\\operatorname{Sp}(2n)\\) when \\(\\dim(V) = 2n\\).</p>
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 11.29</div>
                    <div class="env-body">
                        <p>If \\(T: \\mathbb{R}^{2n} \\to \\mathbb{R}^{2n}\\) is a linear map with matrix \\(M\\) relative to a symplectic basis, then \\(T\\) is symplectic if and only if</p>
                        \\[M^T J M = J\\]
                        <p>where \\(J\\) is the standard symplectic matrix. In particular, \\(\\det(M) = 1\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="symplectic-viz"></div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Why "Symplectic"?</div>
                    <div class="env-body">
                        <p>The term "symplectic" comes from the Greek "symplektikos" meaning "twining" or "plaiting together." It reflects how alternating forms naturally pair up dimensions:</p>
                        <ul>
                            <li>In \\(\\mathbb{R}^{2n}\\), coordinates come in pairs \\((q_i, p_i)\\) (position-momentum)</li>
                            <li>The form \\(\\omega(v, w)\\) measures an "oriented area" in the \\((q,p)\\) plane</li>
                            <li>Symplectic transformations preserve this pairing structure</li>
                            <li>All nondegenerate alternating forms on \\(\\mathbb{R}^{2n}\\) are equivalent (unlike symmetric forms which have signatures!)</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'symplectic-viz',
                    title: 'Interactive: Symplectic Form on ℝ²',
                    description: 'Visualize the alternating form ω((x₁,y₁), (x₂,y₂)) = x₁y₂ - y₁x₂',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        const v1 = viz.addDraggable('v1', 2, 1, viz.colors.blue, 8, () => draw());
                        const v2 = viz.addDraggable('v2', -1, 2.5, viz.colors.orange, 8, () => draw());

                        function omega(u, v) {
                            return u[0]*v[1] - u[1]*v[0];
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const u = [v1.x, v1.y];
                            const v = [v2.x, v2.y];

                            const omegaUV = omega(u, v);
                            const omegaVU = omega(v, u);

                            // Draw parallelogram showing oriented area
                            viz.drawPolygon([
                                [0, 0],
                                [u[0], u[1]],
                                [u[0] + v[0], u[1] + v[1]],
                                [v[0], v[1]]
                            ], viz.colors.teal + '33', viz.colors.teal, 2);

                            viz.drawVector(0, 0, u[0], u[1], viz.colors.blue, 'u');
                            viz.drawVector(0, 0, v[0], v[1], viz.colors.orange, 'v');
                            viz.drawDraggables();

                            viz.drawText(`ω(u,v) = ${omegaUV.toFixed(2)}`, -6.5, 4, viz.colors.white, 16);
                            viz.drawText(`ω(v,u) = ${omegaVU.toFixed(2)} = -ω(u,v)`, -6.5, 3.5, viz.colors.white, 14);
                            viz.drawText(`(antisymmetric)`, -6.5, 3, viz.colors.yellow, 12);

                            const area = Math.abs(omegaUV);
                            viz.drawText(`|ω(u,v)| = oriented area = ${area.toFixed(2)}`, -6.5, 2, viz.colors.teal, 14);

                            // Check if u ⊥ v in symplectic sense
                            if (Math.abs(omegaUV) < 0.1) {
                                viz.drawText('u and v are symplectically orthogonal!', -6.5, 1.5, viz.colors.green, 13);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that an alternating form \\(\\omega\\) on a finite-dimensional vector space satisfies \\(\\operatorname{rank}(\\omega)\\) is even.',
                    hint: 'Use the canonical form from Theorem 11.25.',
                    solution: 'By Theorem 11.25, \\(\\omega\\) can be represented in a suitable basis by a matrix with \\(k\\) copies of \\(J_2 = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}\\) on the diagonal and zeros elsewhere. Each \\(J_2\\) block contributes rank 2 (it is invertible), so \\(\\operatorname{rank}(\\omega) = 2k\\), which is even.'
                },
                {
                    question: 'Show that if \\(T\\) is a symplectic transformation on \\((V, \\omega)\\), then \\(T\\) is necessarily invertible.',
                    hint: 'Use nondegeneracy of \\(\\omega\\) and the definition of symplectic.',
                    solution: 'Suppose \\(Tv = 0\\). For any \\(w \\in V\\), we have \\(0 = \\omega(Tv, Tw) = \\omega(0, Tw) = 0\\). But also by the symplectic property, \\(\\omega(Tv, Tw) = \\omega(v, w)\\). Thus \\(\\omega(v, w) = 0\\) for all \\(w \\in V\\), which means \\(v \\in \\operatorname{rad}(V) = \\{0\\}\\) since \\(\\omega\\) is nondegenerate. So \\(\\ker(T) = \\{0\\}\\), making \\(T\\) injective, hence bijective in finite dimensions.'
                },
                {
                    question: 'Compute the symplectic group \\(\\operatorname{Sp}(2)\\) explicitly. What is its relationship to \\(\\operatorname{SL}(2)\\)?',
                    hint: 'Use the condition \\(M^T J M = J\\) where \\(J = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}\\).',
                    solution: 'Let \\(M = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\). Then \\(M^T J M = \\begin{pmatrix} a & c \\\\ b & d \\end{pmatrix} \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix} \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = \\begin{pmatrix} -c & a \\\\ -d & b \\end{pmatrix} \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = \\begin{pmatrix} -ca + ac & -cb + ad \\\\ -da + bc & -db + bd \\end{pmatrix} = \\begin{pmatrix} 0 & ad-bc \\\\ bc-ad & 0 \\end{pmatrix}\\). For this to equal \\(J\\), we need \\(ad - bc = 1\\), i.e., \\(\\det(M) = 1\\). Thus \\(\\operatorname{Sp}(2) = \\operatorname{SL}(2)\\), the special linear group.'
                }
            ]
        },
        {
            id: 'ch11-sec07',
            title: 'Applications and Further Topics',
            content: `
                <h2>Applications and Further Topics</h2>

                <p>We conclude with applications of bilinear forms to various areas of mathematics and physics.</p>

                <div class="env-block example">
                    <div class="env-title">Example 11.30 (Discriminant of a Quadratic Form)</div>
                    <div class="env-body">
                        <p>The <strong>discriminant</strong> of a quadratic form \\(Q(x) = x^T M x\\) is \\(\\Delta = \\det(M)\\). The discriminant determines degeneracy:</p>
                        <ul>
                            <li>\\(\\Delta \\neq 0\\): nondegenerate</li>
                            <li>\\(\\Delta = 0\\): degenerate</li>
                        </ul>
                        <p>For a binary quadratic form \\(Q(x,y) = ax^2 + bxy + cy^2\\), the discriminant is \\(\\Delta = \\det\\begin{pmatrix} a & b/2 \\\\ b/2 & c \\end{pmatrix} = ac - b^2/4\\). The form is:</p>
                        <ul>
                            <li><strong>Elliptic</strong> if \\(\\Delta > 0\\)</li>
                            <li><strong>Hyperbolic</strong> if \\(\\Delta < 0\\)</li>
                            <li><strong>Parabolic</strong> if \\(\\Delta = 0\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 11.31 (Optimization and Hessian Matrices)</div>
                    <div class="env-body">
                        <p>For a function \\(f: \\mathbb{R}^n \\to \\mathbb{R}\\), the <strong>Hessian matrix</strong> at a critical point \\(x_0\\) is</p>
                        \\[H_{ij} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j}\\bigg|_{x_0}\\]
                        <p>The signature of \\(H\\) determines the nature of the critical point:</p>
                        <ul>
                            <li>Signature \\((n, 0)\\): local minimum</li>
                            <li>Signature \\((0, n)\\): local maximum</li>
                            <li>Signature \\((p, q)\\) with \\(p, q > 0\\): saddle point</li>
                        </ul>
                        <p><strong>Example:</strong> For \\(f(x,y) = x^2 - y^2\\), we have \\(H = \\begin{pmatrix} 2 & 0 \\\\ 0 & -2 \\end{pmatrix}\\) with signature \\((1,1)\\), confirming the origin is a saddle point.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 11.32 (Special Relativity)</div>
                    <div class="env-body">
                        <p>In special relativity, <strong>Minkowski space</strong> is \\(\\mathbb{R}^4\\) with the Lorentzian metric</p>
                        \\[\\eta(v, w) = -v_0w_0 + v_1w_1 + v_2w_2 + v_3w_3\\]
                        <p>(signature \\((3,1)\\) or sometimes \\((1,3)\\) in physics conventions). A vector \\(v = (t, x, y, z)\\) is:</p>
                        <ul>
                            <li><strong>Timelike</strong> if \\(\\eta(v,v) < 0\\) (inside light cone)</li>
                            <li><strong>Spacelike</strong> if \\(\\eta(v,v) > 0\\) (outside light cone)</li>
                            <li><strong>Null (lightlike)</strong> if \\(\\eta(v,v) = 0\\) (on light cone)</li>
                        </ul>
                        <p>Lorentz transformations are precisely the isometries of this bilinear form preserving time orientation.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 11.33 (Orthogonal Polynomials)</div>
                    <div class="env-body">
                        <p>On the vector space \\(\\mathcal{P}_n\\) of polynomials of degree \\(\\leq n\\), define the inner product</p>
                        \\[\\langle p, q \\rangle = \\int_{-1}^1 p(x)q(x)\\,dx\\]
                        <p>Applying Gram-Schmidt to \\((1, x, x^2, x^3, \\ldots)\\) yields the <strong>Legendre polynomials</strong> \\(P_0, P_1, P_2, \\ldots\\), an orthogonal basis for \\(\\mathcal{P}_n\\).</p>
                        <p>Different weight functions \\(w(x)\\) in \\(\\langle p,q \\rangle = \\int p(x)q(x)w(x)\\,dx\\) yield different families (Chebyshev, Hermite, Laguerre).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 11.34 (Witt's Theorem)</div>
                    <div class="env-body">
                        <p>Let \\((V, \\langle \\cdot, \\cdot \\rangle)\\) be a nondegenerate metric vector space over a field of characteristic \\(\\neq 2\\). If \\(U\\) is a subspace and \\(\\phi: U \\to V\\) is an isometry (preserves the bilinear form), then \\(\\phi\\) extends to an isometry of \\(V\\).</p>
                        <p>This powerful result shows that the isometry group acts transitively on many structures, and is fundamental in the classification of orthogonal and symplectic geometries.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="applications-viz"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Beyond Bilinear Forms</div>
                    <div class="env-body">
                        <p>The theory extends in multiple directions:</p>
                        <ul>
                            <li><strong>Sesquilinear forms</strong>: Linear in one argument, conjugate-linear in the other (complex inner products)</li>
                            <li><strong>Hermitian forms</strong>: Sesquilinear forms with \\(\\langle v,w \\rangle = \\overline{\\langle w,v \\rangle}\\)</li>
                            <li><strong>Multilinear forms</strong>: Forms in \\(k\\) arguments (tensors)</li>
                            <li><strong>Exterior algebra</strong>: Alternating multilinear forms (differential forms)</li>
                            <li><strong>Clifford algebras</strong>: Associative algebras generated by vectors with relations from quadratic forms</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'applications-viz',
                    title: 'Interactive: Light Cone in Minkowski Space (2D projection)',
                    description: 'Visualize timelike, spacelike, and null vectors',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        const testVec = viz.addDraggable('test', 2, 1.5, viz.colors.yellow, 8, () => draw());

                        function minkowskiNorm(x, t) {
                            return x*x - t*t;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw light cone (lines t = ±x)
                            for (let x = -6; x <= 6; x += 0.1) {
                                viz.drawPoint(x, x, viz.colors.yellow + '66', null, 2);
                                viz.drawPoint(x, -x, viz.colors.yellow + '66', null, 2);
                            }

                            viz.drawLine(-6, -6, 6, 6, viz.colors.yellow + 'AA', 2);
                            viz.drawLine(-6, 6, 6, -6, viz.colors.yellow + 'AA', 2);

                            // Shade regions
                            const timelikeColor = viz.colors.blue + '22';
                            const spacelikeColor = viz.colors.red + '22';

                            for (let x = -6; x <= 6; x += 0.2) {
                                for (let t = -5; t <= 5; t += 0.2) {
                                    if (Math.abs(t) > Math.abs(x)) {
                                        viz.drawPoint(x, t, timelikeColor, null, 3);
                                    } else if (Math.abs(t) < Math.abs(x) - 0.3) {
                                        viz.drawPoint(x, t, spacelikeColor, null, 3);
                                    }
                                }
                            }

                            const x = testVec.x;
                            const t = testVec.y;
                            const norm = minkowskiNorm(x, t);

                            viz.drawVector(0, 0, x, t, viz.colors.white, 'v');
                            viz.drawDraggables();

                            viz.drawText('Minkowski metric: η(v,v) = x² - t²', -6.5, 4.5, viz.colors.white, 13);
                            viz.drawText(`v = (${x.toFixed(1)}, ${t.toFixed(1)})`, -6.5, 4, viz.colors.white, 14);
                            viz.drawText(`η(v,v) = ${norm.toFixed(2)}`, -6.5, 3.5, viz.colors.white, 14);

                            let type, color;
                            if (Math.abs(norm) < 0.1) {
                                type = 'NULL (lightlike)';
                                color = viz.colors.yellow;
                            } else if (norm < 0) {
                                type = 'TIMELIKE';
                                color = viz.colors.blue;
                            } else {
                                type = 'SPACELIKE';
                                color = viz.colors.red;
                            }

                            viz.drawText(`Type: ${type}`, -6.5, 3, color, 16);

                            viz.drawText('Future', 0, 4.5, viz.colors.blue + 'AA', 12, 'center');
                            viz.drawText('Past', 0, -4.5, viz.colors.blue + 'AA', 12, 'center');
                            viz.drawText('Elsewhere', 5, 0, viz.colors.red + 'AA', 12, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the quadratic form \\(Q(x,y,z) = x^2 + y^2 + z^2 - 2xy - 2xz - 2yz\\) represents zero nontrivially (i.e., \\(Q(v) = 0\\) for some \\(v \\neq 0\\)).',
                    hint: 'Try to factor or find a vector in the null set.',
                    solution: 'Observe that \\(Q(x,y,z) = x^2 + y^2 + z^2 - 2xy - 2xz - 2yz = (x - y - z)^2 - 2y^2 - 2z^2 - 2yz + 2yz = (x-y-z)^2 - 2y^2 - 2z^2\\). Actually, let\'s try a different approach. Note that \\(Q(1,1,0) = 1 + 1 + 0 - 2 - 0 - 0 = 0\\). So \\(v = (1,1,0)\\) satisfies \\(Q(v) = 0\\), showing the form represents zero nontrivially. The form is indefinite.'
                },
                {
                    question: 'For the Hessian \\(H = \\begin{pmatrix} 6 & 2 \\\\ 2 & 3 \\end{pmatrix}\\), determine whether the corresponding critical point is a minimum, maximum, or saddle.',
                    hint: 'Compute eigenvalues or use Sylvester\'s criterion (leading principal minors).',
                    solution: 'Method 1 (eigenvalues): \\(\\det(H - \\lambda I) = (6-\\lambda)(3-\\lambda) - 4 = \\lambda^2 - 9\\lambda + 14 = (\\lambda - 2)(\\lambda - 7)\\). Eigenvalues are 2 and 7, both positive. So signature is \\((2,0)\\), and the critical point is a <strong>local minimum</strong>. Method 2 (Sylvester): \\(H_{11} = 6 > 0\\) and \\(\\det(H) = 18 - 4 = 14 > 0\\). Both leading principal minors positive implies positive definite, so local minimum.'
                },
                {
                    question: 'Prove that a Lorentz transformation (isometry of Minkowski space) preserves the light cone.',
                    hint: 'Show that if \\(\\eta(v,v) = 0\\), then \\(\\eta(Tv, Tv) = 0\\).',
                    solution: 'Let \\(T\\) be a Lorentz transformation, so \\(\\eta(Tv, Tw) = \\eta(v, w)\\) for all \\(v, w\\). If \\(v\\) is null (on the light cone), then \\(\\eta(v, v) = 0\\). Applying the isometry property: \\(\\eta(Tv, Tv) = \\eta(v, v) = 0\\). So \\(Tv\\) is also null. Thus \\(T\\) maps the light cone to itself.'
                }
            ]
        }
    ]
});
