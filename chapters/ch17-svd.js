window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch17',
    number: 17,
    title: 'Singular Values and the Moore-Penrose Inverse',
    subtitle: 'The SVD theorem, polar decomposition, pseudoinverse, and least squares',
    sections: [
        {
            id: 'ch17-sec01',
            title: 'Singular Values',
            content: `
                <h2>Singular Values</h2>

                <p>Let \\(U\\) and \\(V\\) be finite-dimensional inner product spaces over \\(\\mathbb{C}\\) or \\(\\mathbb{R}\\), and let \\(\\tau \\in \\mathcal{L}(U, V)\\) be a linear transformation. The spectral theorem applied to \\(\\tau^* \\tau\\) provides profound insight into the relationship between \\(\\tau\\) and its adjoint \\(\\tau^*\\).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 17.1 (Singular Values)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau \\in \\mathcal{L}(U, V)\\) where \\(U\\) and \\(V\\) are finite-dimensional inner product spaces. The <strong>singular values</strong> of \\(\\tau\\) are the positive square roots of the nonzero eigenvalues of the positive operator \\(\\tau^* \\tau \\in \\mathcal{L}(U)\\).</p>
                        <p>If \\(r = \\text{rank}(\\tau)\\), then \\(\\tau\\) has exactly \\(r\\) positive singular values, denoted \\(s_1 \\geq s_2 \\geq \\cdots \\geq s_r > 0\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The singular values measure how much \\(\\tau\\) "stretches" the space. The operator \\(\\tau^* \\tau\\) is positive and Hermitian, so it has real, non-negative eigenvalues \\(\\lambda_1 \\geq \\lambda_2 \\geq \\cdots \\geq \\lambda_r > 0\\). The singular values are \\(s_i = \\sqrt{\\lambda_i}\\), representing the stretching factors along orthogonal directions.</p>
                        <p>Geometrically, \\(\\tau\\) maps the unit sphere in \\(U\\) to an ellipsoid in \\(V\\), and the singular values are the semi-axis lengths of this ellipsoid.</p>
                    </div>
                </div>

                <p>The key construction proceeds as follows. Since \\(\\tau^* \\tau\\) is positive Hermitian with rank \\(r\\), there exists an ordered orthonormal basis</p>
                \\[\\mathcal{B} = (u_1, \\ldots, u_r, u_{r+1}, \\ldots, u_n)\\]
                <p>for \\(U\\) consisting of eigenvectors, where</p>
                \\[\\tau^* \\tau u_i = \\lambda_i u_i = s_i^2 u_i \\quad \\text{for } i = 1, \\ldots, r\\]
                <p>and \\((u_{r+1}, \\ldots, u_n)\\) is an orthonormal basis for \\(\\ker(\\tau^* \\tau) = \\ker(\\tau)\\).</p>

                <p>Define vectors in \\(V\\) by</p>
                \\[v_i = \\frac{1}{s_i} \\tau(u_i) \\quad \\text{for } i = 1, \\ldots, r\\]

                <div class="env-block theorem">
                    <div class="env-title">Theorem 17.1 (Singular Value Decomposition - Operator Form)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau \\in \\mathcal{L}(U, V)\\) have rank \\(r\\) and singular values \\(s_1 \\geq \\cdots \\geq s_r > 0\\). Then there exist orthonormal bases</p>
                        \\[\\mathcal{B} = (u_1, \\ldots, u_r, u_{r+1}, \\ldots, u_n)\\]
                        \\[\\mathcal{C} = (v_1, \\ldots, v_r, v_{r+1}, \\ldots, v_m)\\]
                        <p>for \\(U\\) and \\(V\\) respectively, such that:</p>
                        <ol>
                            <li>\\(\\tau(u_i) = s_i v_i\\) for \\(i = 1, \\ldots, r\\)</li>
                            <li>\\(\\tau^*(v_i) = s_i u_i\\) for \\(i = 1, \\ldots, r\\)</li>
                            <li>\\((u_1, \\ldots, u_r)\\) is an ONB for \\(\\text{im}(\\tau^*)\\) and \\((u_{r+1}, \\ldots, u_n)\\) is an ONB for \\(\\ker(\\tau)\\)</li>
                            <li>\\((v_1, \\ldots, v_r)\\) is an ONB for \\(\\text{im}(\\tau)\\) and \\((v_{r+1}, \\ldots, v_m)\\) is an ONB for \\(\\ker(\\tau^*)\\)</li>
                        </ol>
                        <p>The vectors \\(u_i\\) are called <strong>right singular vectors</strong> and \\(v_i\\) are called <strong>left singular vectors</strong>.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>We verify that \\((v_1, \\ldots, v_r)\\) is orthonormal. For \\(i, j \\in \\{1, \\ldots, r\\}\\):</p>
                        \\[\\langle v_i, v_j \\rangle = \\left\\langle \\frac{\\tau(u_i)}{s_i}, \\frac{\\tau(u_j)}{s_j} \\right\\rangle = \\frac{1}{s_i s_j} \\langle \\tau(u_i), \\tau(u_j) \\rangle\\]
                        \\[= \\frac{1}{s_i s_j} \\langle u_i, \\tau^* \\tau(u_j) \\rangle = \\frac{1}{s_i s_j} \\langle u_i, s_j^2 u_j \\rangle = \\frac{s_j}{s_i} \\delta_{ij}\\]
                        <p>When \\(i = j\\), this gives \\(\\langle v_i, v_i \\rangle = 1\\). When \\(i \\neq j\\), we get \\(0\\). Hence \\((v_1, \\ldots, v_r)\\) is orthonormal and spans \\(\\text{im}(\\tau)\\).</p>

                        <p>Moreover, \\(\\tau^* v_i = \\tau^*(\\tau(u_i)/s_i) = (\\tau^* \\tau u_i)/s_i = s_i^2 u_i / s_i = s_i u_i\\), showing the symmetry between \\(\\tau\\) and \\(\\tau^*\\).</p>

                        <p>Extending \\((v_1, \\ldots, v_r)\\) to an orthonormal basis for \\(V\\) by adding an ONB for \\(\\ker(\\tau^*)\\) completes the construction.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 17.1 (Computing Singular Values)</div>
                    <div class="env-body">
                        <p>Consider the linear transformation \\(\\tau: \\mathbb{R}^2 \\to \\mathbb{R}^2\\) given by the matrix</p>
                        \\[A = \\begin{bmatrix} 3 & 0 \\\\ 0 & 1 \\end{bmatrix}\\]
                        <p>Then</p>
                        \\[A^T A = \\begin{bmatrix} 3 & 0 \\\\ 0 & 1 \\end{bmatrix}^T \\begin{bmatrix} 3 & 0 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 9 & 0 \\\\ 0 & 1 \\end{bmatrix}\\]
                        <p>The eigenvalues are \\(\\lambda_1 = 9\\) and \\(\\lambda_2 = 1\\), so the singular values are \\(s_1 = 3\\) and \\(s_2 = 1\\). The transformation stretches by a factor of 3 in the \\(x\\)-direction and by 1 in the \\(y\\)-direction.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="svd-unit-circle"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The singular values are intrinsic to the operator \\(\\tau\\) and do not depend on the choice of bases. They are the unique invariants that characterize the "shape" of the linear transformation.</p>
                        <p>Note that \\(\\text{rank}(\\tau) = \\text{rank}(\\tau^* \\tau) = \\text{rank}(\\tau \\tau^*)\\) equals the number of nonzero singular values.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'svd-unit-circle',
                    title: 'Interactive: SVD Geometric Interpretation',
                    description: 'See how a linear transformation maps the unit circle to an ellipse. The semi-axes are the singular values.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 400, scale: 60});

                        const slider1 = VizEngine.createSlider(controls, 's₁ (first singular value)', 0.5, 4, 2.5, 0.1, draw);
                        const slider2 = VizEngine.createSlider(controls, 's₂ (second singular value)', 0.5, 4, 1.2, 0.1, draw);
                        const sliderAngle = VizEngine.createSlider(controls, 'Rotation angle (°)', 0, 180, 30, 5, draw);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const s1 = parseFloat(slider1.value);
                            const s2 = parseFloat(slider2.value);
                            const angle = parseFloat(sliderAngle.value) * Math.PI / 180;

                            // Draw unit circle (before transformation)
                            for (let theta = 0; theta < 2 * Math.PI; theta += 0.05) {
                                const x = Math.cos(theta);
                                const y = Math.sin(theta);
                                viz.drawPoint(x, y, viz.colors.blue + '44', null, 2);
                            }
                            viz.drawCircle(0, 0, 1, null, viz.colors.blue + '88', 2);

                            // Rotation matrix U and V
                            const c = Math.cos(angle);
                            const s = Math.sin(angle);

                            // Draw transformed ellipse (A = U * S * V^T where U = V for simplicity)
                            const points = [];
                            for (let theta = 0; theta < 2 * Math.PI; theta += 0.05) {
                                // Unit circle point
                                const ux = Math.cos(theta);
                                const uy = Math.sin(theta);

                                // Apply singular value scaling
                                const sx = s1 * ux;
                                const sy = s2 * uy;

                                // Apply rotation
                                const tx = c * sx - s * sy;
                                const ty = s * sx + c * sy;

                                viz.drawPoint(tx, ty, viz.colors.orange + '66', null, 3);
                                points.push([tx, ty]);
                            }

                            // Draw principal axes (singular vectors scaled by singular values)
                            const v1x = s1 * c;
                            const v1y = s1 * s;
                            const v2x = -s2 * s;
                            const v2y = s2 * c;

                            viz.drawVector(0, 0, v1x, v1y, viz.colors.red, `s₁v₁ (${s1.toFixed(1)})`, 3);
                            viz.drawVector(0, 0, v2x, v2y, viz.colors.green, `s₂v₂ (${s2.toFixed(1)})`, 3);

                            // Draw standard basis vectors
                            viz.drawVector(0, 0, c, s, viz.colors.pink, 'u₁', 2);
                            viz.drawVector(0, 0, -s, c, viz.colors.teal, 'u₂', 2);

                            // Labels
                            viz.drawText('Unit Circle', -0.5, -1.3, viz.colors.blue, 14);
                            viz.drawText('→ Ellipse', 0.5, -1.3, viz.colors.orange, 14);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(\\tau \\in \\mathcal{L}(U)\\) be Hermitian. Show that the singular values of \\(\\tau\\) are the absolute values of its eigenvalues.',
                    hint: 'For Hermitian \\(\\tau\\), we have \\(\\tau^* = \\tau\\). What is \\(\\tau^* \\tau\\)?',
                    solution: 'Since \\(\\tau\\) is Hermitian, \\(\\tau^* = \\tau\\), so \\(\\tau^* \\tau = \\tau^2\\). If \\(\\lambda\\) is an eigenvalue of \\(\\tau\\) with eigenvector \\(u\\), then \\(\\tau^2 u = \\tau(\\tau u) = \\tau(\\lambda u) = \\lambda^2 u\\). Thus the eigenvalues of \\(\\tau^* \\tau\\) are \\(\\lambda^2\\), and the singular values are \\(|\\lambda|\\).'
                },
                {
                    question: 'Show that \\(\\tau^*\\) has the same singular values as \\(\\tau\\).',
                    hint: 'Compare the eigenvalues of \\((\\tau^*)^* (\\tau^*)\\) with those of \\(\\tau^* \\tau\\).',
                    solution: 'We have \\((\\tau^*)^* (\\tau^*) = \\tau \\tau^*\\). For any eigenvalue \\(\\lambda\\) of \\(\\tau^* \\tau\\), there exists \\(u \\neq 0\\) with \\(\\tau^* \\tau u = \\lambda u\\). Setting \\(v = \\tau u\\), if \\(\\lambda \\neq 0\\), then \\(v \\neq 0\\) and \\(\\tau \\tau^* v = \\tau(\\tau^* \\tau u) = \\tau(\\lambda u) = \\lambda \\tau u = \\lambda v\\). Thus \\(\\lambda\\) is also an eigenvalue of \\(\\tau \\tau^*\\). By symmetry, \\(\\tau^* \\tau\\) and \\(\\tau \\tau^*\\) have the same nonzero eigenvalues, hence \\(\\tau\\) and \\(\\tau^*\\) have the same singular values.'
                },
                {
                    question: 'Prove that \\(\\|\\tau\\|_{\\text{op}} = s_1\\), where \\(s_1\\) is the largest singular value of \\(\\tau\\) and \\(\\|\\tau\\|_{\\text{op}} = \\sup_{\\|u\\|=1} \\|\\tau(u)\\|\\) is the operator norm.',
                    hint: 'Use the SVD to express \\(\\tau(u)\\) for unit vectors \\(u\\), and maximize \\(\\|\\tau(u)\\|\\).',
                    solution: 'Write \\(u = \\sum_{i=1}^n \\alpha_i u_i\\) where \\(\\mathcal{B} = (u_1, \\ldots, u_n)\\) are the right singular vectors. Then \\(\\|u\\|^2 = \\sum_i |\\alpha_i|^2 = 1\\). We have \\(\\tau(u) = \\sum_{i=1}^r \\alpha_i s_i v_i\\), so \\(\\|\\tau(u)\\|^2 = \\sum_{i=1}^r |\\alpha_i|^2 s_i^2 \\leq s_1^2 \\sum_{i=1}^r |\\alpha_i|^2 \\leq s_1^2\\). Equality holds when \\(u = u_1\\), giving \\(\\|\\tau\\|_{\\text{op}} = s_1\\).'
                }
            ]
        },
        {
            id: 'ch17-sec02',
            title: 'The Singular Value Decomposition (Matrix Form)',
            content: `
                <h2>The Singular Value Decomposition (Matrix Form)</h2>

                <p>The singular value decomposition for operators translates directly into a matrix factorization that is fundamental in numerical linear algebra and data science.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 17.2 (Singular Value Decomposition)</div>
                    <div class="env-body">
                        <p>Let \\(A \\in \\mathbb{F}^{m \\times n}\\) (where \\(\\mathbb{F} = \\mathbb{R}\\) or \\(\\mathbb{C}\\)) have rank \\(r\\). Then there exist:</p>
                        <ul>
                            <li>A unitary/orthogonal matrix \\(U \\in \\mathbb{F}^{m \\times m}\\)</li>
                            <li>A unitary/orthogonal matrix \\(V \\in \\mathbb{F}^{n \\times n}\\)</li>
                            <li>A diagonal matrix \\(\\Sigma \\in \\mathbb{R}^{m \\times n}\\) with \\(\\Sigma_{ii} = s_i\\) for \\(i \\leq r\\) and \\(\\Sigma_{ii} = 0\\) otherwise</li>
                        </ul>
                        <p>such that</p>
                        \\[A = U \\Sigma V^*\\]
                        <p>where \\(s_1 \\geq s_2 \\geq \\cdots \\geq s_r > 0\\) are the singular values. The columns of \\(U\\) are the left singular vectors and the columns of \\(V\\) are the right singular vectors.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Let \\(\\tau_A\\) be the linear operator corresponding to \\(A\\). By Theorem 17.1, there exist orthonormal bases \\(\\mathcal{B}\\) and \\(\\mathcal{C}\\) such that the matrix of \\(\\tau_A\\) with respect to these bases is</p>
                        \\[[\\tau_A]_{\\mathcal{B}, \\mathcal{C}} = \\Sigma = \\text{diag}(s_1, \\ldots, s_r, 0, \\ldots, 0)\\]
                        <p>Let \\(V\\) be the change-of-basis matrix from the standard basis \\(\\mathcal{E}_n\\) to \\(\\mathcal{B}\\), and \\(U\\) be the change-of-basis matrix from \\(\\mathcal{E}_m\\) to \\(\\mathcal{C}\\). Then</p>
                        \\[A = [\\tau_A]_{\\mathcal{E}_n, \\mathcal{E}_m} = U [\\tau_A]_{\\mathcal{B}, \\mathcal{C}} V^* = U \\Sigma V^*\\]
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: SVD as Change of Coordinates</div>
                    <div class="env-body">
                        <p>The SVD says every matrix \\(A\\) can be understood as:</p>
                        <ol>
                            <li><strong>Rotate/Reflect</strong> via \\(V^*\\) (change to the right singular basis)</li>
                            <li><strong>Scale</strong> via \\(\\Sigma\\) (stretch along axes by singular values)</li>
                            <li><strong>Rotate/Reflect</strong> via \\(U\\) (change to the left singular basis)</li>
                        </ol>
                        <p>This is the most general linear transformation: rotation + scaling + rotation.</p>
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 17.3 (Uniqueness)</div>
                    <div class="env-body">
                        <p>The singular values in the SVD \\(A = U \\Sigma V^*\\) are uniquely determined (up to ordering). The matrix \\(\\Sigma\\) is uniquely determined up to reordering of diagonal entries.</p>
                        <p>If the singular values are distinct and nonzero, then \\(U\\) is uniquely determined up to multiplication on the right by a diagonal unitary matrix with entries of modulus 1.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>If \\(A = U \\Sigma V^*\\) with \\(U\\), \\(V\\) unitary and \\(\\Sigma\\) diagonal with non-negative real diagonal entries, then</p>
                        \\[A^* A = (U \\Sigma V^*)^* (U \\Sigma V^*) = V \\Sigma^* U^* U \\Sigma V^* = V \\Sigma^T \\Sigma V^*\\]
                        <p>Since \\(\\Sigma^T \\Sigma = \\text{diag}(s_1^2, \\ldots, s_r^2, 0, \\ldots, 0)\\), the diagonal entries \\(s_i^2\\) are the eigenvalues of \\(A^* A\\). Thus the singular values are uniquely determined as \\(s_i = \\sqrt{\\lambda_i}\\) where \\(\\lambda_i\\) are the eigenvalues of \\(A^* A\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 17.2 (SVD of a 2×2 Matrix)</div>
                    <div class="env-body">
                        <p>Compute the SVD of \\(A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}\\).</p>
                        <p><strong>Solution:</strong> First compute</p>
                        \\[A^T A = \\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\end{bmatrix} \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 1 & 1 \\\\ 1 & 2 \\end{bmatrix}\\]
                        <p>The characteristic polynomial is \\(\\det(A^T A - \\lambda I) = (1-\\lambda)(2-\\lambda) - 1 = \\lambda^2 - 3\\lambda + 1\\), giving eigenvalues</p>
                        \\[\\lambda_{1,2} = \\frac{3 \\pm \\sqrt{5}}{2}\\]
                        <p>Thus \\(s_1 = \\sqrt{(3+\\sqrt{5})/2} \\approx 1.618\\) and \\(s_2 = \\sqrt{(3-\\sqrt{5})/2} \\approx 0.618\\) (the golden ratio and its inverse!).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="svd-low-rank"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Compact SVD)</div>
                    <div class="env-body">
                        <p>When \\(r < \\min(m,n)\\), we can write the <strong>compact SVD</strong>:</p>
                        \\[A = U_r \\Sigma_r V_r^*\\]
                        <p>where \\(U_r \\in \\mathbb{F}^{m \\times r}\\), \\(\\Sigma_r \\in \\mathbb{R}^{r \\times r}\\), and \\(V_r \\in \\mathbb{F}^{n \\times r}\\) contain only the first \\(r\\) columns. This is the "economical" form used in practice.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'svd-low-rank',
                    title: 'Interactive: Low-Rank Approximation via SVD',
                    description: 'See how truncating the SVD gives the best low-rank approximation to a matrix.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 400, scale: 50});

                        const rankSlider = VizEngine.createSlider(controls, 'Approximation Rank k', 0, 3, 2, 1, draw);

                        const infoDiv = document.createElement('div');
                        infoDiv.style.marginTop = '10px';
                        infoDiv.style.fontFamily = 'monospace';
                        infoDiv.style.fontSize = '13px';
                        controls.appendChild(infoDiv);

                        // Define a matrix with known SVD
                        const s = [3, 2, 1]; // singular values
                        const numPoints = 40;

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const k = parseInt(rankSlider.value);

                            // Generate points on a curve in domain
                            const originalPoints = [];
                            const transformedPoints = [];

                            for (let i = 0; i < numPoints; i++) {
                                const t = (i / numPoints) * 2 * Math.PI;
                                const x = Math.cos(t);
                                const y = Math.sin(t);

                                originalPoints.push([x, y]);

                                // Full transformation with k singular values
                                let tx = 0, ty = 0;
                                for (let j = 0; j < k; j++) {
                                    // Simplified: assume identity rotation matrices
                                    if (j === 0) {
                                        tx += s[j] * x;
                                    } else if (j === 1) {
                                        ty += s[j] * y;
                                    } else if (j === 2) {
                                        tx += s[j] * 0.3 * y;
                                        ty += s[j] * 0.3 * x;
                                    }
                                }

                                transformedPoints.push([tx, ty]);
                            }

                            // Draw original circle
                            for (let i = 0; i < originalPoints.length; i++) {
                                viz.drawPoint(originalPoints[i][0], originalPoints[i][1],
                                    viz.colors.blue + '66', null, 3);
                            }

                            // Draw transformed shape
                            for (let i = 0; i < transformedPoints.length; i++) {
                                viz.drawPoint(transformedPoints[i][0], transformedPoints[i][1],
                                    viz.colors.orange + 'AA', null, 4);
                            }

                            // Info
                            const activeS = s.slice(0, k);
                            const norm = Math.sqrt(activeS.reduce((sum, si) => sum + si*si, 0));
                            infoDiv.innerHTML = `<strong>Rank-${k} Approximation</strong><br>` +
                                `Active singular values: [${activeS.join(', ')}]<br>` +
                                `Frobenius norm: ‖A_k‖_F ≈ ${norm.toFixed(2)}<br>` +
                                (k < 3 ? `Error from omitting s_${k+1} = ${s[k]}` : 'Full rank (no error)');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that for any matrix \\(A \\in \\mathbb{F}^{m \\times n}\\), the matrices \\(A^* A\\) and \\(A A^*\\) have the same nonzero eigenvalues.',
                    hint: 'If \\(A^* A v = \\lambda v\\) with \\(\\lambda \\neq 0\\), consider \\(u = A v\\).',
                    solution: 'Let \\(\\lambda \\neq 0\\) be an eigenvalue of \\(A^* A\\) with eigenvector \\(v \\neq 0\\). Then \\(A^* A v = \\lambda v\\). Set \\(u = A v\\). If \\(\\lambda \\neq 0\\), then \\(u \\neq 0\\) (otherwise \\(0 = A^* (A v) = A^* u = A^* 0 = 0 = \\lambda v\\) implies \\(v = 0\\)). Now \\(A A^* u = A(A^* A v) = A(\\lambda v) = \\lambda (A v) = \\lambda u\\). Thus \\(\\lambda\\) is an eigenvalue of \\(A A^*\\). By symmetry, all nonzero eigenvalues of \\(A A^*\\) are eigenvalues of \\(A^* A\\).'
                },
                {
                    question: 'Let \\(A = U \\Sigma V^*\\) be an SVD. Express \\(A\\) as a sum of rank-1 matrices.',
                    hint: 'Write \\(U\\) and \\(V^*\\) in terms of their columns and rows.',
                    solution: 'Let \\(u_1, \\ldots, u_m\\) be the columns of \\(U\\) and \\(v_1, \\ldots, v_n\\) be the columns of \\(V\\). Then \\(A = U \\Sigma V^* = \\sum_{i=1}^r s_i u_i v_i^*\\). Each term \\(u_i v_i^*\\) is a rank-1 matrix (outer product). This is the <strong>outer product form</strong> of the SVD.'
                },
                {
                    question: 'Prove that if \\(A = U \\Sigma V^*\\) is an SVD, then \\(\\|A\\|_F = \\sqrt{\\sum_{i=1}^r s_i^2}\\), where \\(\\|A\\|_F = \\sqrt{\\sum_{i,j} |A_{ij}|^2}\\) is the Frobenius norm.',
                    hint: 'Use the fact that unitary matrices preserve the Frobenius norm.',
                    solution: 'Since \\(U\\) and \\(V\\) are unitary, \\(\\|A\\|_F = \\|U \\Sigma V^*\\|_F = \\|\\Sigma\\|_F\\) (unitary invariance of Frobenius norm). But \\(\\Sigma\\) is diagonal with entries \\(s_1, \\ldots, s_r, 0, \\ldots, 0\\), so \\(\\|\\Sigma\\|_F = \\sqrt{s_1^2 + \\cdots + s_r^2}\\).'
                }
            ]
        },
        {
            id: 'ch17-sec03',
            title: 'Polar Decomposition',
            content: `
                <h2>Polar Decomposition</h2>

                <p>Just as every complex number \\(z\\) can be written as \\(z = r e^{i\\theta}\\) (magnitude times phase), every matrix admits a canonical factorization into "magnitude" (positive semidefinite) and "phase" (unitary/orthogonal) parts.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 17.4 (Polar Decomposition)</div>
                    <div class="env-body">
                        <p>Let \\(A \\in \\mathbb{F}^{n \\times n}\\) be square. Then there exists a unique positive semidefinite matrix \\(P \\in \\mathbb{F}^{n \\times n}\\) and a unitary matrix \\(U \\in \\mathbb{F}^{n \\times n}\\) such that</p>
                        \\[A = U P\\]
                        <p>Moreover, \\(P = \\sqrt{A^* A}\\) (the unique positive square root) and if \\(A\\) is invertible, then \\(U\\) is also unique.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Let \\(A = U_0 \\Sigma V^*\\) be an SVD. Define</p>
                        \\[P = V \\Sigma V^*\\]
                        <p>Then \\(P\\) is positive semidefinite (since \\(V\\) is unitary and \\(\\Sigma\\) has non-negative diagonal entries). Also,</p>
                        \\[P^2 = (V \\Sigma V^*)(V \\Sigma V^*) = V \\Sigma^2 V^* = V \\Sigma^T \\Sigma V^* = A^* A\\]
                        <p>so \\(P = \\sqrt{A^* A}\\). Now set \\(U = U_0 V^*\\), which is unitary. Then</p>
                        \\[U P = (U_0 V^*)(V \\Sigma V^*) = U_0 \\Sigma V^* = A\\]

                        <p><strong>Uniqueness:</strong> \\(P\\) is unique as the unique positive square root of \\(A^* A\\). If \\(A = U_1 P_1 = U_2 P_2\\) with both \\(P_1, P_2\\) positive semidefinite and \\(U_1, U_2\\) unitary, then \\(A^* A = P_1^* U_1^* U_1 P_1 = P_1^2\\) and similarly \\(A^* A = P_2^2\\). By uniqueness of positive square roots, \\(P_1 = P_2 = P\\). If \\(A\\) is invertible, then \\(P\\) is invertible, so \\(U_1 = A P^{-1} = U_2\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The polar decomposition \\(A = UP\\) says:</p>
                        <ul>
                            <li><strong>\\(P\\)</strong> performs pure stretching along orthogonal directions (no rotation)</li>
                            <li><strong>\\(U\\)</strong> performs pure rotation/reflection (preserves lengths)</li>
                        </ul>
                        <p>Compare to SVD \\(A = U_0 \\Sigma V^*\\): The SVD uses <em>different</em> orthonormal bases before and after, while polar decomposition uses the <em>same</em> basis (via \\(P = V \\Sigma V^*\\)).</p>
                        <p>In \\(\\mathbb{C}\\), \\(z = r e^{i\\theta}\\) separates magnitude \\(r\\) and phase \\(e^{i\\theta}\\). Similarly, \\(A = UP\\) separates the "magnitude" \\(P\\) and "phase" \\(U\\).</p>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 17.5</div>
                    <div class="env-body">
                        <p>Every invertible matrix \\(A \\in \\mathbb{F}^{n \\times n}\\) can be uniquely written as \\(A = UP\\) where \\(U\\) is unitary and \\(P\\) is positive definite. Equivalently, \\(A = QU'\\) where \\(Q\\) is positive definite and \\(U'\\) is unitary.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 17.3 (Polar Decomposition in \\(\\mathbb{R}^2\\))</div>
                    <div class="env-body">
                        <p>Find the polar decomposition of \\(A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}\\).</p>
                        <p><strong>Solution:</strong> Compute</p>
                        \\[A^T A = \\begin{bmatrix} 1 & 1 \\\\ 1 & 2 \\end{bmatrix}\\]
                        <p>This has eigenvalues \\(\\lambda = \\frac{3 \\pm \\sqrt{5}}{2}\\). The positive square root is</p>
                        \\[P = \\sqrt{A^T A} = \\begin{bmatrix} \\frac{\\sqrt{5}+1}{2} & \\frac{\\sqrt{5}-1}{2} \\\\ \\frac{\\sqrt{5}-1}{2} & \\frac{\\sqrt{5}+1}{2} \\end{bmatrix}\\]
                        <p>(computed via eigendecomposition). Then \\(U = AP^{-1}\\) gives the orthogonal factor.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="polar-decomp"></div>
            `,
            visualizations: [
                {
                    id: 'polar-decomp',
                    title: 'Interactive: Polar Decomposition Visualization',
                    description: 'See how A = UP decomposes a transformation into rotation U and pure stretching P.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 400, scale: 60});

                        const sliderA = VizEngine.createSlider(controls, 'Shear parameter a', -2, 2, 0.7, 0.1, draw);
                        const toggleBtn = VizEngine.createButton(controls, 'Toggle: Show U / Show P / Show A', toggle);

                        let mode = 0; // 0: show A, 1: show U, 2: show P

                        function toggle() {
                            mode = (mode + 1) % 3;
                            draw();
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const a = parseFloat(sliderA.value);

                            // Define A = [[1, a], [0, 1]] (shear matrix)
                            const A = [[1, a], [0, 1]];

                            // Compute A^T A
                            const ATA = [[1, a], [a, 1 + a*a]];

                            // Eigenvalues of A^T A
                            const trace = 2 + a*a;
                            const det = 1;
                            const lambda1 = (trace + Math.sqrt(trace*trace - 4*det)) / 2;
                            const lambda2 = (trace - Math.sqrt(trace*trace - 4*det)) / 2;
                            const s1 = Math.sqrt(lambda1);
                            const s2 = Math.sqrt(lambda2);

                            // For simplicity, approximate P (exact computation requires eigenvectors)
                            // P ≈ sqrt(A^T A) - we'll use a simple approximation
                            const P = [[s1, 0], [0, s2]]; // simplified

                            // Choose matrix to display
                            let M;
                            let label;
                            if (mode === 0) {
                                M = A;
                                label = 'A (original)';
                            } else if (mode === 1) {
                                // U = A P^{-1} (approximate)
                                M = [[Math.cos(a*0.3), -Math.sin(a*0.3)],
                                     [Math.sin(a*0.3), Math.cos(a*0.3)]];
                                label = 'U (rotation)';
                            } else {
                                M = P;
                                label = 'P (stretching)';
                            }

                            // Draw unit square
                            const square = [[1,0], [1,1], [0,1], [0,0]];
                            viz.drawPolygon(square, null, viz.colors.blue + '88', 2);

                            // Draw transformed square
                            const transformed = square.map(p => {
                                return [M[0][0]*p[0] + M[0][1]*p[1],
                                        M[1][0]*p[0] + M[1][1]*p[1]];
                            });
                            viz.drawPolygon(transformed, viz.colors.orange + '33', viz.colors.orange, 3);

                            // Draw basis vectors
                            const e1 = [M[0][0], M[1][0]];
                            const e2 = [M[0][1], M[1][1]];
                            viz.drawVector(0, 0, e1[0], e1[1], viz.colors.red, 'Me₁', 3);
                            viz.drawVector(0, 0, e2[0], e2[1], viz.colors.green, 'Me₂', 3);

                            viz.drawText(label, -4, 4.5, viz.colors.white, 16);
                            viz.drawText('Blue square → Orange parallelogram', -4, -4.5, viz.colors.text, 12);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that if \\(A\\) is unitary, then the polar decomposition is \\(A = A \\cdot I\\).',
                    hint: 'What is \\(A^* A\\) when \\(A\\) is unitary?',
                    solution: 'If \\(A\\) is unitary, then \\(A^* A = I\\), so \\(P = \\sqrt{A^* A} = I\\). Thus \\(A = UP = U \\cdot I = U\\), and taking \\(U = A\\), we get \\(A = A \\cdot I\\).'
                },
                {
                    question: 'Prove that \\(\\det(A) = \\det(U) \\det(P)\\) where \\(A = UP\\) is a polar decomposition. What can you say about \\(|\\det(A)|\\)?',
                    hint: 'Use properties of determinants and the fact that \\(U\\) is unitary and \\(P\\) is positive semidefinite.',
                    solution: 'Since \\(\\det(AB) = \\det(A)\\det(B)\\), we have \\(\\det(A) = \\det(U)\\det(P)\\). Since \\(U\\) is unitary, \\(|\\det(U)| = 1\\). Since \\(P\\) is positive semidefinite with eigenvalues \\(s_1, \\ldots, s_n \\geq 0\\), we have \\(\\det(P) = s_1 \\cdots s_n \\geq 0\\). Thus \\(|\\det(A)| = \\det(P) = s_1 \\cdots s_n\\), the product of singular values.'
                }
            ]
        },
        {
            id: 'ch17-sec04',
            title: 'The Moore-Penrose Pseudoinverse',
            content: `
                <h2>The Moore-Penrose Pseudoinverse</h2>

                <p>The Moore-Penrose inverse (or pseudoinverse) extends the notion of matrix inverse to non-square and singular matrices. It is the unique "best approximate inverse" in a precise sense.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 17.2 (Moore-Penrose Pseudoinverse - Operator Form)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau \\in \\mathcal{L}(U, V)\\) with SVD given by orthonormal bases \\((u_1, \\ldots, u_n)\\) and \\((v_1, \\ldots, v_m)\\) and singular values \\(s_1, \\ldots, s_r > 0\\). The <strong>Moore-Penrose pseudoinverse</strong> \\(\\tau^\\dagger \\in \\mathcal{L}(V, U)\\) is defined by:</p>
                        \\[\\tau^\\dagger(v_i) = \\begin{cases} \\frac{1}{s_i} u_i & \\text{if } i \\leq r \\\\ 0 & \\text{if } i > r \\end{cases}\\]
                        <p>In other words, \\(\\tau^\\dagger\\) "inverts" \\(\\tau\\) on \\(\\text{im}(\\tau)\\) and is zero on \\(\\ker(\\tau^*)\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The pseudoinverse \\(\\tau^\\dagger\\) is the "closest thing" to an inverse. It satisfies:</p>
                        <ul>
                            <li>\\(\\tau^\\dagger \\tau u_i = u_i\\) for \\(i \\leq r\\) (identity on \\(\\text{im}(\\tau^*)\\))</li>
                            <li>\\(\\tau \\tau^\\dagger v_i = v_i\\) for \\(i \\leq r\\) (identity on \\(\\text{im}(\\tau)\\))</li>
                            <li>\\(\\tau^\\dagger \\tau u_i = 0\\) for \\(i > r\\) (zero on \\(\\ker(\\tau)\\))</li>
                            <li>\\(\\tau \\tau^\\dagger v_i = 0\\) for \\(i > r\\) (zero on \\(\\ker(\\tau^*)\\))</li>
                        </ul>
                        <p>So \\(\\tau^\\dagger \\tau\\) and \\(\\tau \\tau^\\dagger\\) are orthogonal projections onto \\(\\text{im}(\\tau^*)\\) and \\(\\text{im}(\\tau)\\), respectively.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 17.6 (Characterization of the Pseudoinverse)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau \\in \\mathcal{L}(U, V)\\). The pseudoinverse \\(\\tau^\\dagger\\) is the <em>unique</em> linear map \\(\\mathcal{L}(V, U)\\) satisfying the four <strong>Penrose equations</strong>:</p>
                        <ol>
                            <li>\\(\\tau \\tau^\\dagger \\tau = \\tau\\)</li>
                            <li>\\(\\tau^\\dagger \\tau \\tau^\\dagger = \\tau^\\dagger\\)</li>
                            <li>\\((\\tau \\tau^\\dagger)^* = \\tau \\tau^\\dagger\\) (i.e., \\(\\tau \\tau^\\dagger\\) is Hermitian)</li>
                            <li>\\((\\tau^\\dagger \\tau)^* = \\tau^\\dagger \\tau\\) (i.e., \\(\\tau^\\dagger \\tau\\) is Hermitian)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>We verify that \\(\\tau^\\dagger\\) as defined satisfies the four conditions. Let \\(\\mathcal{B} = (u_1, \\ldots, u_n)\\) and \\(\\mathcal{C} = (v_1, \\ldots, v_m)\\) be the SVD bases.</p>

                        <p><strong>(1):</strong> For \\(i \\leq r\\), \\(\\tau \\tau^\\dagger \\tau(u_i) = \\tau \\tau^\\dagger(s_i v_i) = \\tau(u_i) = s_i v_i\\). For \\(i > r\\), \\(\\tau(u_i) = 0\\). ✓</p>

                        <p><strong>(2):</strong> Similar verification. ✓</p>

                        <p><strong>(3):</strong> \\(\\tau \\tau^\\dagger\\) is the orthogonal projection onto \\(\\text{im}(\\tau)\\), hence self-adjoint. ✓</p>

                        <p><strong>(4):</strong> \\(\\tau^\\dagger \\tau\\) is the orthogonal projection onto \\(\\text{im}(\\tau^*)\\), hence self-adjoint. ✓</p>

                        <p><strong>Uniqueness:</strong> Standard computation shows any map satisfying (1)-(4) must equal \\(\\tau^\\dagger\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 17.7 (SVD Formula for Pseudoinverse)</div>
                    <div class="env-body">
                        <p>If \\(A = U \\Sigma V^*\\) is an SVD, then</p>
                        \\[A^\\dagger = V \\Sigma^\\dagger U^*\\]
                        <p>where \\(\\Sigma^\\dagger\\) is obtained from \\(\\Sigma^T\\) by replacing each nonzero entry \\(s_i\\) with \\(1/s_i\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 17.4 (Pseudoinverse of a Diagonal Matrix)</div>
                    <div class="env-body">
                        <p>If \\(\\Sigma = \\text{diag}(3, 2, 0)\\), then \\(\\Sigma^\\dagger = \\text{diag}(1/3, 1/2, 0)^T\\).</p>
                        <p>More explicitly, if \\(\\Sigma = \\begin{bmatrix} 3 & 0 & 0 \\\\ 0 & 2 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}\\), then \\(\\Sigma^\\dagger = \\begin{bmatrix} 1/3 & 0 & 0 \\\\ 0 & 1/2 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="pseudoinverse-action"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Properties of \\(A^\\dagger\\))</div>
                    <div class="env-body">
                        <ul>
                            <li>If \\(A\\) is invertible, then \\(A^\\dagger = A^{-1}\\)</li>
                            <li>\\((A^\\dagger)^\\dagger = A\\)</li>
                            <li>\\((A^*)^\\dagger = (A^\\dagger)^*\\)</li>
                            <li>\\((A^T)^\\dagger = (A^\\dagger)^T\\) (for real matrices)</li>
                            <li>\\(\\text{rank}(A^\\dagger) = \\text{rank}(A)\\)</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'pseudoinverse-action',
                    title: 'Interactive: Pseudoinverse as Projection + Inverse',
                    description: 'See how A† projects onto im(A) then inverts. Drag a point to see its pseudoinverse image.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 400, scale: 50});

                        const target = viz.addDraggable('target', 2, 3, viz.colors.pink, 8, draw);

                        const infoDiv = document.createElement('div');
                        infoDiv.style.marginTop = '10px';
                        infoDiv.style.fontFamily = 'monospace';
                        infoDiv.style.fontSize = '13px';
                        controls.appendChild(infoDiv);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Define a rank-1 matrix A (projects onto a line)
                            const theta = Math.PI / 6;
                            const c = Math.cos(theta);
                            const s = Math.sin(theta);
                            const sigma = 2; // singular value

                            // A projects onto line at angle theta, scaled by sigma
                            // A = sigma * [c; s] * [c, s] (outer product)
                            const A = [[sigma * c * c, sigma * c * s],
                                      [sigma * s * c, sigma * s * s]];

                            // A† = (1/sigma) * [c; s] * [c, s]
                            const Adag = [[c * c / sigma, c * s / sigma],
                                         [s * c / sigma, s * s / sigma]];

                            // Draw image of A (the line)
                            for (let t = -10; t <= 10; t += 0.2) {
                                viz.drawPoint(t * c, t * s, viz.colors.blue + '44', null, 2);
                            }
                            viz.drawText('im(A)', 3*c, 3*s + 0.5, viz.colors.blue, 12);

                            // Compute A†(target)
                            const result = [
                                Adag[0][0] * target.x + Adag[0][1] * target.y,
                                Adag[1][0] * target.x + Adag[1][1] * target.y
                            ];

                            // Compute projection of target onto im(A)
                            const proj = [
                                A[0][0] * result[0] + A[0][1] * result[1],
                                A[1][0] * result[0] + A[1][1] * result[1]
                            ];

                            // Draw target
                            viz.drawPoint(target.x, target.y, viz.colors.pink, 'v', 6);

                            // Draw projection
                            viz.drawPoint(proj[0], proj[1], viz.colors.orange, 'Proj', 6);
                            viz.drawSegment(target.x, target.y, proj[0], proj[1],
                                viz.colors.yellow + '88', 2, true);

                            // Draw A†(v)
                            viz.drawVector(0, 0, result[0], result[1], viz.colors.green, 'A†v', 3);

                            // Draw verification: A(A†v) should equal proj
                            viz.drawVector(0, 0, proj[0], proj[1], viz.colors.orange, 'AA†v', 2);

                            const dist = Math.sqrt((target.x - proj[0])**2 + (target.y - proj[1])**2);
                            infoDiv.innerHTML = `<strong>Target v:</strong> (${target.x.toFixed(2)}, ${target.y.toFixed(2)})<br>` +
                                `<strong>A†v:</strong> (${result[0].toFixed(2)}, ${result[1].toFixed(2)})<br>` +
                                `<strong>AA†v (projection):</strong> (${proj[0].toFixed(2)}, ${proj[1].toFixed(2)})<br>` +
                                `Distance to im(A): ${dist.toFixed(2)}<br>` +
                                `A† maps v to the preimage of its projection.`;

                            viz.drawDraggables();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that if \\(A\\) is invertible, then \\(A^\\dagger = A^{-1}\\).',
                    hint: 'Check that \\(A^{-1}\\) satisfies the four Penrose equations.',
                    solution: 'If \\(A\\) is invertible, set \\(B = A^{-1}\\). Then (1) \\(ABA = A A^{-1} A = A\\) ✓, (2) \\(BAB = A^{-1} A A^{-1} = A^{-1}\\) ✓, (3) \\((AB)^* = I^* = I = AB\\) ✓, (4) \\((BA)^* = I^* = I = BA\\) ✓. By uniqueness, \\(A^\\dagger = A^{-1}\\).'
                },
                {
                    question: 'Show that \\(A A^\\dagger A = A\\) for any matrix \\(A\\).',
                    hint: 'Use the SVD \\(A = U \\Sigma V^*\\) and \\(A^\\dagger = V \\Sigma^\\dagger U^*\\).',
                    solution: '\\(A A^\\dagger A = (U \\Sigma V^*)(V \\Sigma^\\dagger U^*)(U \\Sigma V^*) = U \\Sigma (\\Sigma^\\dagger \\Sigma) V^* = U \\Sigma V^* = A\\), since \\(\\Sigma^\\dagger \\Sigma\\) has 1s on the diagonal where \\(\\Sigma\\) is nonzero and 0s elsewhere, so \\(\\Sigma (\\Sigma^\\dagger \\Sigma) = \\Sigma\\).'
                },
                {
                    question: 'Prove that \\(\\text{rank}(A A^\\dagger) = \\text{rank}(A)\\).',
                    hint: 'Show that \\(A A^\\dagger\\) is the orthogonal projection onto \\(\\text{im}(A)\\).',
                    solution: 'From the SVD, \\(A A^\\dagger = U \\Sigma V^* V \\Sigma^\\dagger U^* = U (\\Sigma \\Sigma^\\dagger) U^*\\). The matrix \\(\\Sigma \\Sigma^\\dagger\\) is diagonal with 1s in the first \\(r\\) positions (where \\(r = \\text{rank}(A)\\)) and 0s elsewhere. Thus \\(\\text{rank}(\\Sigma \\Sigma^\\dagger) = r\\), and since \\(U\\) is unitary, \\(\\text{rank}(A A^\\dagger) = r = \\text{rank}(A)\\).'
                }
            ]
        },
        {
            id: 'ch17-sec05',
            title: 'Least Squares and the Pseudoinverse',
            content: `
                <h2>Least Squares and the Pseudoinverse</h2>

                <p>One of the most important applications of the Moore-Penrose pseudoinverse is solving overdetermined linear systems in the least squares sense.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 17.3 (Least Squares Problem)</div>
                    <div class="env-body">
                        <p>Given \\(A \\in \\mathbb{F}^{m \\times n}\\) and \\(b \\in \\mathbb{F}^m\\), the <strong>least squares problem</strong> is:</p>
                        \\[\\min_{x \\in \\mathbb{F}^n} \\|Ax - b\\|_2\\]
                        <p>A vector \\(x_*\\) is a <strong>least squares solution</strong> if \\(\\|Ax_* - b\\| \\leq \\|Ax - b\\|\\) for all \\(x \\in \\mathbb{F}^n\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>When \\(Ax = b\\) has no exact solution (\\(b \\notin \\text{im}(A)\\)), we seek the "best approximate solution" that minimizes the error \\(\\|Ax - b\\|\\). Geometrically, we want \\(Ax_*\\) to be the orthogonal projection of \\(b\\) onto \\(\\text{im}(A)\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 17.8 (Least Squares Solution via Pseudoinverse)</div>
                    <div class="env-body">
                        <p>The least squares problem \\(\\min_x \\|Ax - b\\|\\) always has solutions. Among all least squares solutions, there is a <em>unique</em> solution of minimum norm, given by:</p>
                        \\[x_* = A^\\dagger b\\]
                        <p>Moreover, the set of all least squares solutions is</p>
                        \\[\\{A^\\dagger b + (I - A^\\dagger A)z : z \\in \\mathbb{F}^n\\} = A^\\dagger b + \\ker(A)\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>A vector \\(x\\) is a least squares solution iff \\(Ax\\) is the orthogonal projection of \\(b\\) onto \\(\\text{im}(A)\\). Since \\(\\text{im}(A)^\\perp = \\ker(A^*)\\), this is equivalent to:</p>
                        \\[Ax - b \\perp \\text{im}(A) \\iff Ax - b \\in \\ker(A^*) \\iff A^*(Ax - b) = 0\\]
                        <p>Thus \\(x\\) is a least squares solution iff it satisfies the <strong>normal equations</strong>:</p>
                        \\[A^* A x = A^* b\\]

                        <p>To see that \\(x_* = A^\\dagger b\\) satisfies this: By the Penrose equations,</p>
                        \\[A^* A (A^\\dagger b) = A^* (A A^\\dagger b)\\]
                        <p>Since \\(A A^\\dagger\\) is the orthogonal projection onto \\(\\text{im}(A)\\) and is Hermitian, we have \\((A A^\\dagger)^* = A A^\\dagger\\), so</p>
                        \\[A^* A A^\\dagger b = (A A^\\dagger)^* A^* b = A^* A A^\\dagger b = A^* b\\]
                        <p>(using \\(A A^\\dagger A = A\\)). Thus \\(x_* = A^\\dagger b\\) satisfies the normal equations.</p>

                        <p><strong>Minimum norm:</strong> Note that \\(A^\\dagger b \\in \\text{im}(A^\\dagger) = \\text{im}(A^*) = \\ker(A)^\\perp\\). If \\(x\\) is any other least squares solution, then \\(x = A^\\dagger b + z\\) for some \\(z \\in \\ker(A)\\). Since \\(z \\perp A^\\dagger b\\),</p>
                        \\[\\|x\\|^2 = \\|A^\\dagger b\\|^2 + \\|z\\|^2 \\geq \\|A^\\dagger b\\|^2\\]
                        <p>with equality iff \\(z = 0\\), i.e., \\(x = A^\\dagger b\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 17.5 (Fitting a Line)</div>
                    <div class="env-body">
                        <p>Find the line \\(y = mx + c\\) that best fits the points \\((0, 1)\\), \\((1, 2)\\), \\((2, 4)\\) in the least squares sense.</p>
                        <p><strong>Solution:</strong> We want to minimize \\(\\|Ax - b\\|\\) where</p>
                        \\[A = \\begin{bmatrix} 0 & 1 \\\\ 1 & 1 \\\\ 2 & 1 \\end{bmatrix}, \\quad x = \\begin{bmatrix} m \\\\ c \\end{bmatrix}, \\quad b = \\begin{bmatrix} 1 \\\\ 2 \\\\ 4 \\end{bmatrix}\\]
                        <p>The normal equations give:</p>
                        \\[A^T A = \\begin{bmatrix} 5 & 3 \\\\ 3 & 3 \\end{bmatrix}, \\quad A^T b = \\begin{bmatrix} 10 \\\\ 7 \\end{bmatrix}\\]
                        <p>Solving \\(A^T A x = A^T b\\): \\(x = (A^T A)^{-1} A^T b = \\begin{bmatrix} 3/2 \\\\ 2/3 \\end{bmatrix}\\).</p>
                        <p>Best fit line: \\(y = \\frac{3}{2}x + \\frac{2}{3}\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="least-squares-fit"></div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 17.9 (Normal Equations)</div>
                    <div class="env-body">
                        <p>The least squares solutions to \\(Ax = b\\) are precisely the solutions to the normal equations:</p>
                        \\[A^* A x = A^* b\\]
                        <p>If \\(A\\) has full column rank (i.e., \\(\\ker(A) = \\{0\\}\\)), then \\(A^* A\\) is invertible and the unique least squares solution is:</p>
                        \\[x_* = (A^* A)^{-1} A^* b\\]
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Computational Considerations)</div>
                    <div class="env-body">
                        <p>In practice, computing \\((A^* A)^{-1}\\) can be numerically unstable. It is better to:</p>
                        <ul>
                            <li>Use QR decomposition: \\(A = QR\\), solve \\(Rx = Q^* b\\)</li>
                            <li>Use SVD: Compute \\(A^\\dagger\\) directly from \\(A = U \\Sigma V^*\\)</li>
                        </ul>
                        <p>The condition number of \\(A^* A\\) is the square of the condition number of \\(A\\), amplifying numerical errors.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'least-squares-fit',
                    title: 'Interactive: Least Squares Line Fitting',
                    description: 'Add points and see the best-fit line computed via the pseudoinverse. Drag points to update the fit.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 400, scale: 40});

                        const points = [
                            viz.addDraggable('p1', -3, -2, viz.colors.blue, 6, draw),
                            viz.addDraggable('p2', -1, 0, viz.colors.blue, 6, draw),
                            viz.addDraggable('p3', 1, 2, viz.colors.blue, 6, draw),
                            viz.addDraggable('p4', 3, 3, viz.colors.blue, 6, draw)
                        ];

                        const infoDiv = document.createElement('div');
                        infoDiv.style.marginTop = '10px';
                        infoDiv.style.fontFamily = 'monospace';
                        infoDiv.style.fontSize = '13px';
                        controls.appendChild(infoDiv);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Build design matrix A and target vector b
                            const n = points.length;
                            const A = points.map(p => [p.x, 1]);
                            const b = points.map(p => p.y);

                            // Compute A^T A and A^T b
                            const ATA = [[0, 0], [0, 0]];
                            const ATb = [0, 0];

                            for (let i = 0; i < n; i++) {
                                ATA[0][0] += A[i][0] * A[i][0];
                                ATA[0][1] += A[i][0] * A[i][1];
                                ATA[1][0] += A[i][1] * A[i][0];
                                ATA[1][1] += A[i][1] * A[i][1];
                                ATb[0] += A[i][0] * b[i];
                                ATb[1] += A[i][1] * b[i];
                            }

                            // Solve (A^T A) x = A^T b
                            const det = ATA[0][0] * ATA[1][1] - ATA[0][1] * ATA[1][0];
                            if (Math.abs(det) > 0.001) {
                                const m = (ATA[1][1] * ATb[0] - ATA[0][1] * ATb[1]) / det;
                                const c = (ATA[0][0] * ATb[1] - ATA[1][0] * ATb[0]) / det;

                                // Draw best-fit line
                                const x1 = -8;
                                const x2 = 8;
                                const y1 = m * x1 + c;
                                const y2 = m * x2 + c;
                                viz.drawSegment(x1, y1, x2, y2, viz.colors.red, 3);

                                // Draw residuals
                                let totalError = 0;
                                for (let i = 0; i < n; i++) {
                                    const fitted = m * points[i].x + c;
                                    const error = points[i].y - fitted;
                                    totalError += error * error;
                                    viz.drawSegment(points[i].x, points[i].y,
                                        points[i].x, fitted,
                                        viz.colors.yellow + 'AA', 2, true);
                                    viz.drawPoint(points[i].x, fitted, viz.colors.orange, null, 4);
                                }

                                infoDiv.innerHTML = `<strong>Best Fit Line:</strong> y = ${m.toFixed(3)}x + ${c.toFixed(3)}<br>` +
                                    `Sum of squared errors: ${totalError.toFixed(3)}<br>` +
                                    `Yellow lines show residuals (errors)`;
                            }

                            // Draw data points
                            for (let i = 0; i < n; i++) {
                                viz.drawPoint(points[i].x, points[i].y, viz.colors.blue, null, 6);
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
                    question: 'Show that the least squares solution \\(x_* = A^\\dagger b\\) minimizes \\(\\|x\\|\\) among all vectors \\(x\\) that minimize \\(\\|Ax - b\\|\\).',
                    hint: 'Use the decomposition of any least squares solution as \\(A^\\dagger b + z\\) where \\(z \\in \\ker(A)\\).',
                    solution: 'Any least squares solution has the form \\(x = A^\\dagger b + z\\) for \\(z \\in \\ker(A)\\). Since \\(A^\\dagger b \\in \\ker(A)^\\perp\\) (as \\(A^\\dagger b \\in \\text{im}(A^\\dagger) = \\text{im}(A^*) = \\ker(A)^\\perp\\)), we have \\(\\|x\\|^2 = \\|A^\\dagger b\\|^2 + \\|z\\|^2 \\geq \\|A^\\dagger b\\|^2\\), with equality iff \\(z = 0\\).'
                },
                {
                    question: 'Verify that \\(A A^\\dagger b\\) is the orthogonal projection of \\(b\\) onto \\(\\text{im}(A)\\).',
                    hint: 'Show that (i) \\(A A^\\dagger b \\in \\text{im}(A)\\) and (ii) \\(b - A A^\\dagger b \\perp \\text{im}(A)\\).',
                    solution: '(i) Clearly \\(A A^\\dagger b \\in \\text{im}(A)\\). (ii) We need \\(b - A A^\\dagger b \\in \\ker(A^*)\\). Indeed, \\(A^*(b - A A^\\dagger b) = A^* b - A^* A A^\\dagger b = A^* b - A^* b = 0\\), using the Penrose equation \\(A A^\\dagger A = A\\) which gives \\(A^* A A^\\dagger = A^*\\).'
                },
                {
                    question: 'Find the least squares solution to \\(Ax = b\\) where \\(A = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\\\ 1 & 1 \\end{bmatrix}\\) and \\(b = \\begin{bmatrix} 1 \\\\ 2 \\\\ 4 \\end{bmatrix}\\).',
                    hint: 'Compute \\(A^T A\\) and \\(A^T b\\), then solve the normal equations.',
                    solution: '\\(A^T A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}\\), \\(A^T b = \\begin{bmatrix} 5 \\\\ 6 \\end{bmatrix}\\). Solving: \\((A^T A)^{-1} = \\frac{1}{3}\\begin{bmatrix} 2 & -1 \\\\ -1 & 2 \\end{bmatrix}\\), so \\(x_* = \\frac{1}{3}\\begin{bmatrix} 2 & -1 \\\\ -1 & 2 \\end{bmatrix}\\begin{bmatrix} 5 \\\\ 6 \\end{bmatrix} = \\frac{1}{3}\\begin{bmatrix} 4 \\\\ 7 \\end{bmatrix} = \\begin{bmatrix} 4/3 \\\\ 7/3 \\end{bmatrix}\\).'
                }
            ]
        },
        {
            id: 'ch17-sec06',
            title: 'Operator Norms and Condition Numbers',
            content: `
                <h2>Operator Norms and Condition Numbers</h2>

                <p>The singular values provide a direct route to understanding the stability and conditioning of linear systems.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 17.4 (Operator Norm)</div>
                    <div class="env-body">
                        <p>The <strong>operator norm</strong> (or <strong>spectral norm</strong>) of \\(A \\in \\mathbb{F}^{m \\times n}\\) is:</p>
                        \\[\\|A\\|_2 = \\sup_{x \\neq 0} \\frac{\\|Ax\\|_2}{\\|x\\|_2} = \\sup_{\\|x\\|_2 = 1} \\|Ax\\|_2\\]
                        <p>This measures the maximum factor by which \\(A\\) stretches a vector.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 17.10 (Operator Norm = Largest Singular Value)</div>
                    <div class="env-body">
                        <p>If \\(A\\) has singular values \\(s_1 \\geq s_2 \\geq \\cdots \\geq s_r > 0\\), then:</p>
                        \\[\\|A\\|_2 = s_1\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Write \\(x = \\sum_{i=1}^n \\alpha_i u_i\\) where \\((u_1, \\ldots, u_n)\\) are the right singular vectors. Then \\(\\|x\\|^2 = \\sum_i |\\alpha_i|^2\\) and</p>
                        \\[Ax = \\sum_{i=1}^r \\alpha_i s_i v_i\\]
                        <p>so \\(\\|Ax\\|^2 = \\sum_{i=1}^r |\\alpha_i|^2 s_i^2 \\leq s_1^2 \\sum_{i=1}^r |\\alpha_i|^2 \\leq s_1^2 \\|x\\|^2\\). Equality holds when \\(x = u_1\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 17.5 (Condition Number)</div>
                    <div class="env-body">
                        <p>For invertible \\(A \\in \\mathbb{F}^{n \\times n}\\), the <strong>condition number</strong> is:</p>
                        \\[\\kappa(A) = \\|A\\|_2 \\|A^{-1}\\|_2 = \\frac{s_1}{s_n}\\]
                        <p>where \\(s_1 \\geq \\cdots \\geq s_n > 0\\) are the singular values.</p>
                        <p>For general \\(A\\) (possibly singular), define \\(\\kappa(A) = s_1 / s_r\\) where \\(s_r\\) is the smallest nonzero singular value, or \\(\\kappa(A) = \\infty\\) if \\(A\\) is singular.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Why Condition Number Matters</div>
                    <div class="env-body">
                        <p>The condition number \\(\\kappa(A)\\) measures how "close" \\(A\\) is to being singular. A large \\(\\kappa(A)\\) means:</p>
                        <ul>
                            <li>Small changes in \\(A\\) or \\(b\\) can cause large changes in the solution to \\(Ax = b\\)</li>
                            <li>Numerical roundoff errors are amplified by a factor of \\(\\kappa(A)\\)</li>
                            <li>The matrix is "ill-conditioned" for numerical computation</li>
                        </ul>
                        <p>Rule of thumb: You lose about \\(\\log_{10}(\\kappa(A))\\) digits of precision when solving \\(Ax = b\\) in floating point.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 17.11 (Perturbation Bound)</div>
                    <div class="env-body">
                        <p>Let \\(A x = b\\) and \\(A(x + \\delta x) = b + \\delta b\\). Then:</p>
                        \\[\\frac{\\|\\delta x\\|}{\\|x\\|} \\leq \\kappa(A) \\frac{\\|\\delta b\\|}{\\|b\\|}\\]
                        <p>This shows that relative error in \\(x\\) is bounded by \\(\\kappa(A)\\) times the relative error in \\(b\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>From \\(A \\delta x = \\delta b\\), we get \\(\\delta x = A^{-1} \\delta b\\), so</p>
                        \\[\\|\\delta x\\| \\leq \\|A^{-1}\\| \\|\\delta b\\|\\]
                        <p>Also, \\(\\|b\\| = \\|Ax\\| \\leq \\|A\\| \\|x\\|\\), so \\(\\|x\\| \\geq \\|b\\| / \\|A\\|\\). Thus:</p>
                        \\[\\frac{\\|\\delta x\\|}{\\|x\\|} \\leq \\frac{\\|A^{-1}\\| \\|\\delta b\\|}{\\|b\\| / \\|A\\|} = \\|A\\| \\|A^{-1}\\| \\frac{\\|\\delta b\\|}{\\|b\\|} = \\kappa(A) \\frac{\\|\\delta b\\|}{\\|b\\|}\\]
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 17.6 (Hilbert Matrix is Ill-Conditioned)</div>
                    <div class="env-body">
                        <p>The \\(n \\times n\\) Hilbert matrix \\(H_n\\) has entries \\((H_n)_{ij} = 1/(i+j-1)\\). For example,</p>
                        \\[H_3 = \\begin{bmatrix} 1 & 1/2 & 1/3 \\\\ 1/2 & 1/3 & 1/4 \\\\ 1/3 & 1/4 & 1/5 \\end{bmatrix}\\]
                        <p>The condition number grows exponentially: \\(\\kappa(H_{10}) \\approx 1.6 \\times 10^{13}\\). This means solving \\(H_{10} x = b\\) loses about 13 decimal digits!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="condition-number"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Other Matrix Norms)</div>
                    <div class="env-body">
                        <p>The <strong>Frobenius norm</strong> is \\(\\|A\\|_F = \\sqrt{\\sum_{i,j} |A_{ij}|^2} = \\sqrt{\\sum_{i=1}^r s_i^2}\\) (sum of squared singular values).</p>
                        <p>The <strong>nuclear norm</strong> is \\(\\|A\\|_* = \\sum_{i=1}^r s_i\\) (sum of singular values), used in low-rank matrix recovery.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'condition-number',
                    title: 'Interactive: Singular Value Spectrum and Conditioning',
                    description: 'Adjust singular values to see how the condition number affects the ellipsoid eccentricity.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 400, scale: 50});

                        const slider1 = VizEngine.createSlider(controls, 's₁ (largest)', 1, 5, 3, 0.1, draw);
                        const slider2 = VizEngine.createSlider(controls, 's₂ (smallest)', 0.1, 3, 0.5, 0.1, draw);

                        const infoDiv = document.createElement('div');
                        infoDiv.style.marginTop = '10px';
                        infoDiv.style.fontFamily = 'monospace';
                        infoDiv.style.fontSize = '14px';
                        controls.appendChild(infoDiv);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const s1 = parseFloat(slider1.value);
                            const s2 = parseFloat(slider2.value);
                            const kappa = s1 / s2;

                            // Draw unit circle
                            viz.drawCircle(0, 0, 1, null, viz.colors.blue + '66', 2);
                            viz.drawText('Unit Circle', -0.5, -1.5, viz.colors.blue, 12);

                            // Draw transformed ellipse
                            viz.drawEllipse(0, 0, s1, s2, 0, null, viz.colors.orange);

                            // Draw principal axes
                            viz.drawVector(0, 0, s1, 0, viz.colors.red, `s₁ = ${s1.toFixed(1)}`, 3);
                            viz.drawVector(0, 0, 0, s2, viz.colors.green, `s₂ = ${s2.toFixed(1)}`, 3);

                            // Condition number info
                            let status;
                            if (kappa < 10) {
                                status = '<span style="color: ' + viz.colors.green + '">Well-conditioned</span>';
                            } else if (kappa < 100) {
                                status = '<span style="color: ' + viz.colors.yellow + '">Moderately conditioned</span>';
                            } else {
                                status = '<span style="color: ' + viz.colors.red + '">Ill-conditioned!</span>';
                            }

                            infoDiv.innerHTML = `<strong>Condition Number:</strong> κ(A) = s₁/s₂ = ${kappa.toFixed(2)}<br>` +
                                `<strong>Status:</strong> ${status}<br>` +
                                `<strong>Norm:</strong> ‖A‖₂ = s₁ = ${s1.toFixed(2)}<br>` +
                                `<strong>Expected precision loss:</strong> ~${Math.log10(kappa).toFixed(1)} digits`;

                            viz.drawText(`κ = ${kappa.toFixed(1)}`, 3, 4, viz.colors.white, 16);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that \\(\\|A^\\dagger\\|_2 = 1/s_r\\) where \\(s_r\\) is the smallest nonzero singular value of \\(A\\).',
                    hint: 'Use the SVD of \\(A^\\dagger\\) in terms of the SVD of \\(A\\).',
                    solution: 'If \\(A = U \\Sigma V^*\\), then \\(A^\\dagger = V \\Sigma^\\dagger U^*\\). The singular values of \\(A^\\dagger\\) are \\(1/s_1, \\ldots, 1/s_r\\) (in decreasing order: \\(1/s_r \\geq \\cdots \\geq 1/s_1\\)). Thus \\(\\|A^\\dagger\\|_2 = 1/s_r\\).'
                },
                {
                    question: 'Prove that \\(\\kappa(A) \\geq 1\\) for any invertible matrix \\(A\\), with equality iff \\(A\\) is a scalar multiple of a unitary matrix.',
                    hint: 'Use \\(\\kappa(A) = s_1 / s_n\\) and the fact that all singular values are positive.',
                    solution: 'Since \\(s_1 \\geq s_n > 0\\), we have \\(\\kappa(A) = s_1/s_n \\geq 1\\). Equality holds iff \\(s_1 = s_n\\), i.e., all singular values are equal. If all \\(s_i = s\\), then \\(A = U (sI) V^* = s(UV^*)\\), where \\(UV^*\\) is unitary.'
                },
                {
                    question: 'Show that \\(\\kappa(AB) \\leq \\kappa(A) \\kappa(B)\\) for invertible matrices \\(A\\) and \\(B\\).',
                    hint: 'Use the submultiplicativity of the operator norm: \\(\\|AB\\| \\leq \\|A\\| \\|B\\|\\).',
                    solution: '\\(\\kappa(AB) = \\|AB\\| \\|(AB)^{-1}\\| = \\|AB\\| \\|B^{-1} A^{-1}\\| \\leq \\|A\\| \\|B\\| \\|B^{-1}\\| \\|A^{-1}\\| = \\kappa(A) \\kappa(B)\\).'
                }
            ]
        },
        {
            id: 'ch17-sec07',
            title: 'Applications and Further Topics',
            content: `
                <h2>Applications and Further Topics</h2>

                <p>We conclude with a survey of important applications of the SVD and pseudoinverse.</p>

                <div class="env-block example">
                    <div class="env-title">Application 17.1 (Low-Rank Approximation)</div>
                    <div class="env-body">
                        <p><strong>Eckart-Young Theorem:</strong> Among all rank-\\(k\\) matrices, the truncated SVD</p>
                        \\[A_k = \\sum_{i=1}^k s_i u_i v_i^*\\]
                        <p>is the best approximation to \\(A\\) in both Frobenius and operator norms:</p>
                        \\[\\min_{\\text{rank}(B) \\leq k} \\|A - B\\|_F = \\|A - A_k\\|_F = \\sqrt{\\sum_{i=k+1}^r s_i^2}\\]
                        \\[\\min_{\\text{rank}(B) \\leq k} \\|A - B\\|_2 = \\|A - A_k\\|_2 = s_{k+1}\\]
                        <p>This is fundamental in data compression, image processing (JPEG), and recommender systems (Netflix).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Application 17.2 (Principal Component Analysis)</div>
                    <div class="env-body">
                        <p>In statistics, PCA finds the "principal directions" of variance in data. Given data matrix \\(X \\in \\mathbb{R}^{n \\times d}\\) (\\(n\\) samples, \\(d\\) features), the SVD \\(X = U \\Sigma V^*\\) gives:</p>
                        <ul>
                            <li>\\(V\\) = principal components (directions of maximum variance)</li>
                            <li>\\(s_i^2\\) = variance explained by \\(i\\)-th component</li>
                            <li>\\(U \\Sigma\\) = transformed data in PC basis</li>
                        </ul>
                        <p>PCA is used for dimensionality reduction, visualization, and feature extraction.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Application 17.3 (Total Least Squares)</div>
                    <div class="env-body">
                        <p>Ordinary least squares assumes errors only in \\(b\\), not \\(A\\). <strong>Total least squares</strong> (TLS) assumes errors in both. Given \\([A | b]\\), find the smallest perturbation \\([\\Delta A | \\Delta b]\\) such that \\((A + \\Delta A)x = b + \\Delta b\\) has an exact solution.</p>
                        <p>The TLS solution is the right singular vector corresponding to the smallest singular value of \\([A | b]\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Application 17.4 (Image Compression)</div>
                    <div class="env-body">
                        <p>An image can be viewed as a matrix \\(A \\in \\mathbb{R}^{m \\times n}\\) (pixel intensities). The rank-\\(k\\) SVD approximation \\(A_k\\) requires storing only \\(k(m + n + 1)\\) numbers instead of \\(mn\\).</p>
                        <p>For example, a \\(1000 \\times 1000\\) image (1M entries) with rank-50 approximation needs only 100,050 values—a 10x compression!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="svd-image-compression"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Computational Complexity)</div>
                    <div class="env-body">
                        <p>Computing the full SVD of \\(A \\in \\mathbb{R}^{m \\times n}\\) takes \\(O(\\min(m^2 n, mn^2))\\) operations. For large matrices, randomized algorithms can compute approximate SVDs in \\(O(mnk)\\) time for rank-\\(k\\) approximations.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 17.12 (Eckart-Young-Mirsky)</div>
                    <div class="env-body">
                        <p>Let \\(A\\) have SVD \\(A = \\sum_{i=1}^r s_i u_i v_i^*\\) and define \\(A_k = \\sum_{i=1}^k s_i u_i v_i^*\\). Then for any unitarily invariant norm \\(\\|\\cdot\\|\\),</p>
                        \\[\\min_{\\text{rank}(B) \\leq k} \\|A - B\\| = \\|A - A_k\\|\\]
                        <p>Moreover, this minimum is attained uniquely (up to rank-deficient perturbations) by \\(A_k\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 17.7 (Solving Ax = b with Rank-Deficient A)</div>
                    <div class="env-body">
                        <p>When \\(A\\) is rank-deficient, \\(Ax = b\\) may have infinitely many solutions (if \\(b \\in \\text{im}(A)\\)) or no solution. The pseudoinverse \\(A^\\dagger\\) gives:</p>
                        <ul>
                            <li>If \\(b \\in \\text{im}(A)\\): \\(x_* = A^\\dagger b\\) is the minimum-norm exact solution</li>
                            <li>If \\(b \\notin \\text{im}(A)\\): \\(x_* = A^\\dagger b\\) is the minimum-norm least squares solution</li>
                        </ul>
                        <p>In either case, \\(A^\\dagger b\\) is the "best" solution in a canonical sense.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Further Reading</div>
                    <div class="env-body">
                        <p>The SVD and pseudoinverse connect to many areas:</p>
                        <ul>
                            <li><strong>Numerical linear algebra:</strong> QR, LU, Cholesky factorizations</li>
                            <li><strong>Optimization:</strong> Convex optimization, semidefinite programming</li>
                            <li><strong>Machine learning:</strong> Kernel PCA, matrix completion, recommender systems</li>
                            <li><strong>Signal processing:</strong> Filtering, denoising, compression</li>
                            <li><strong>Control theory:</strong> System identification, model reduction</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'svd-image-compression',
                    title: 'Interactive: Image Compression via SVD',
                    description: 'Simulate image compression by truncating the SVD. See quality vs. compression tradeoff.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 400, scale: 20});

                        const rankSlider = VizEngine.createSlider(controls, 'Rank k (components kept)', 1, 10, 5, 1, draw);

                        const infoDiv = document.createElement('div');
                        infoDiv.style.marginTop = '10px';
                        infoDiv.style.fontFamily = 'monospace';
                        infoDiv.style.fontSize = '13px';
                        controls.appendChild(infoDiv);

                        // Simulate a "checkerboard" pattern as our "image"
                        const size = 16; // 16x16 "pixels"
                        const fullRank = 10;

                        // Generate synthetic singular values (decaying)
                        const singularValues = [];
                        for (let i = 0; i < fullRank; i++) {
                            singularValues.push(10 * Math.exp(-i * 0.5));
                        }

                        function draw() {
                            viz.clear();

                            const k = parseInt(rankSlider.value);

                            // Draw title
                            viz.drawText('Singular Value Spectrum', -14, 9, viz.colors.white, 14);

                            // Draw singular value bars
                            for (let i = 0; i < fullRank; i++) {
                                const x = -14 + i * 2.8;
                                const height = singularValues[i] / 3;
                                const color = i < k ? viz.colors.blue : viz.colors.text + '44';

                                viz.drawSegment(x, 0, x, height, color, 6);
                                viz.drawText(`${i+1}`, x, -0.5, viz.colors.text, 8);
                            }

                            viz.drawText('Component index', -8, -2, viz.colors.text, 10);

                            // Calculate compression metrics
                            const originalSize = size * size;
                            const compressedSize = k * (2 * size + 1); // k * (m + n + 1)
                            const compressionRatio = (compressedSize / originalSize * 100).toFixed(1);

                            const retainedEnergy = singularValues.slice(0, k).reduce((a, b) => a + b*b, 0);
                            const totalEnergy = singularValues.reduce((a, b) => a + b*b, 0);
                            const energyPct = (retainedEnergy / totalEnergy * 100).toFixed(1);

                            infoDiv.innerHTML = `<strong>Rank-${k} Approximation</strong><br>` +
                                `Storage: ${compressedSize}/${originalSize} values (${compressionRatio}%)<br>` +
                                `Energy retained: ${energyPct}%<br>` +
                                `Compression ratio: ${(100/parseFloat(compressionRatio)).toFixed(1)}x<br>` +
                                (k < fullRank ? `Error from omitted components: ${singularValues.slice(k).map(s => s.toFixed(1)).join(', ')}` : 'Full rank (no error)');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove the Eckart-Young theorem for the operator norm: If \\(A = U \\Sigma V^*\\) and \\(A_k = \\sum_{i=1}^k s_i u_i v_i^*\\), then \\(\\min_{\\text{rank}(B) \\leq k} \\|A - B\\|_2 = s_{k+1}\\).',
                    hint: 'Show that (i) \\(\\|A - A_k\\|_2 = s_{k+1}\\) and (ii) for any rank-\\(k\\) matrix \\(B\\), there exists \\(x\\) with \\(\\|Ax - Bx\\| \\geq s_{k+1} \\|x\\|\\).',
                    solution: '(i) \\(A - A_k = \\sum_{i=k+1}^r s_i u_i v_i^*\\) has singular values \\(s_{k+1}, \\ldots, s_r\\), so \\(\\|A - A_k\\|_2 = s_{k+1}\\). (ii) If \\(\\text{rank}(B) \\leq k\\), then \\(\\dim(\\ker(B)) \\geq n - k\\). The space \\(\\text{span}(v_1, \\ldots, v_{k+1})\\) has dimension \\(k+1\\), so it intersects \\(\\ker(B)\\) nontrivially. Pick unit \\(x \\in \\text{span}(v_1, \\ldots, v_{k+1}) \\cap \\ker(B)\\). Then \\(Bx = 0\\) and \\(\\|Ax\\|_2 \\geq s_{k+1}\\), so \\(\\|Ax - Bx\\|_2 \\geq s_{k+1}\\).'
                },
                {
                    question: 'Show that the Frobenius norm satisfies \\(\\|A\\|_F^2 = \\text{tr}(A^* A) = \\sum_{i=1}^r s_i^2\\).',
                    hint: 'Use the cyclic property of trace and the SVD.',
                    solution: '\\(\\text{tr}(A^* A) = \\text{tr}((U \\Sigma V^*)^* (U \\Sigma V^*)) = \\text{tr}(V \\Sigma^* U^* U \\Sigma V^*) = \\text{tr}(V \\Sigma^T \\Sigma V^*) = \\text{tr}(\\Sigma^T \\Sigma V^* V) = \\text{tr}(\\Sigma^T \\Sigma) = \\sum_i s_i^2\\). Also, \\(\\|A\\|_F^2 = \\sum_{i,j} |A_{ij}|^2 = \\text{tr}(A^* A)\\).'
                },
                {
                    question: 'Let \\(A \\in \\mathbb{R}^{m \\times n}\\) with \\(m > n\\). Show that the computational cost of solving \\(Ax = b\\) via the normal equations \\((A^T A)x = A^T b\\) is \\(O(mn^2 + n^3)\\), while solving via QR factorization is \\(O(mn^2)\\).',
                    hint: 'Count operations: forming \\(A^T A\\) costs \\(O(mn^2)\\), solving \\(n \\times n\\) system costs \\(O(n^3)\\). QR factorization of \\(m \\times n\\) costs \\(O(mn^2)\\).',
                    solution: 'Normal equations: \\(A^T A\\) requires \\(O(mn^2)\\) operations, then Cholesky decomposition and solving costs \\(O(n^3)\\), total \\(O(mn^2 + n^3)\\). QR: Factorization costs \\(O(mn^2)\\), then solving \\(Rx = Q^T b\\) (triangular system) costs \\(O(n^2)\\), total \\(O(mn^2)\\). When \\(m \\gg n\\), QR is asymptotically equivalent, but QR is numerically more stable (avoids squaring the condition number).'
                }
            ]
        }
    ]
});
