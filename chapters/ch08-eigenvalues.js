window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch08',
    number: 8,
    title: 'Eigenvalues and Eigenvectors',
    subtitle: 'Spectral theory, diagonalization, and canonical forms',
    sections: [
        {
            id: 'ch08-sec01',
            title: 'Eigenvalues and Eigenvectors',
            content: `
                <h2>Eigenvalues and Eigenvectors</h2>

                <p>The study of eigenvalues and eigenvectors is central to understanding the structure of linear operators. These special scalars and vectors reveal the fundamental behavior of a transformation.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 8.1 (Eigenvalue and Eigenvector)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau \\in \\mathcal{L}(V)\\) be a linear operator on a vector space \\(V\\) over a field \\(F\\). A scalar \\(\\lambda \\in F\\) is an <strong>eigenvalue</strong> of \\(\\tau\\) if there exists a nonzero vector \\(v \\in V\\) such that</p>
                        \\[\\tau(v) = \\lambda v\\]
                        <p>Any such nonzero vector \\(v\\) is called an <strong>eigenvector</strong> of \\(\\tau\\) associated with the eigenvalue \\(\\lambda\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>An eigenvector is a direction in the vector space that the linear operator merely stretches or compresses (possibly reversing direction), without rotating. The eigenvalue tells us the stretch factor. If \\(\\lambda = 2\\), the operator doubles the length along that direction; if \\(\\lambda = -1\\), it reverses the vector.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 8.2 (Eigenspace and Spectrum)</div>
                    <div class="env-body">
                        <p>For an eigenvalue \\(\\lambda\\) of \\(\\tau\\), the <strong>eigenspace</strong> is</p>
                        \\[E_\\lambda = \\ker(\\tau - \\lambda \\iota) = \\{v \\in V : \\tau(v) = \\lambda v\\}\\]
                        <p>The set of all eigenvalues of \\(\\tau\\) is called the <strong>spectrum</strong> of \\(\\tau\\), denoted \\(\\operatorname{spec}(\\tau)\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.3 (Properties of Eigenspaces)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau \\in \\mathcal{L}(V)\\) and let \\(\\lambda\\) be an eigenvalue of \\(\\tau\\). Then:</p>
                        <ol>
                            <li>\\(E_\\lambda\\) is a subspace of \\(V\\)</li>
                            <li>\\(E_\\lambda\\) is \\(\\tau\\)-invariant</li>
                            <li>\\(\\lambda\\) is an eigenvalue if and only if \\(\\tau - \\lambda \\iota\\) is not invertible</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Parts (1) and (2) follow from the fact that \\(E_\\lambda = \\ker(\\tau - \\lambda \\iota)\\) is a kernel, hence a subspace, and kernels are always invariant under the operator.</p>
                        <p>For (3), \\(\\lambda\\) is an eigenvalue if and only if there exists nonzero \\(v\\) with \\((\\tau - \\lambda \\iota)(v) = 0\\), which occurs if and only if \\(\\tau - \\lambda \\iota\\) has a nontrivial kernel, i.e., is not invertible.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.4 (Linear Independence of Eigenvectors)</div>
                    <div class="env-body">
                        <p>Eigenvectors corresponding to distinct eigenvalues are linearly independent. More precisely, if \\(\\lambda_1, \\ldots, \\lambda_k\\) are distinct eigenvalues of \\(\\tau\\) and \\(v_i \\in E_{\\lambda_i}\\) are nonzero eigenvectors, then \\(\\{v_1, \\ldots, v_k\\}\\) is linearly independent.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>By induction on \\(k\\). For \\(k = 1\\), a single nonzero vector is linearly independent. Suppose the result holds for \\(k-1\\) and consider a linear dependence</p>
                        \\[\\alpha_1 v_1 + \\cdots + \\alpha_k v_k = 0\\]
                        <p>Applying \\(\\tau\\) gives \\(\\alpha_1 \\lambda_1 v_1 + \\cdots + \\alpha_k \\lambda_k v_k = 0\\). Multiplying the original equation by \\(\\lambda_k\\) and subtracting:</p>
                        \\[\\alpha_1(\\lambda_1 - \\lambda_k)v_1 + \\cdots + \\alpha_{k-1}(\\lambda_{k-1} - \\lambda_k)v_{k-1} = 0\\]
                        <p>By the induction hypothesis, \\(\\alpha_i(\\lambda_i - \\lambda_k) = 0\\) for all \\(i < k\\). Since \\(\\lambda_i \\neq \\lambda_k\\), we have \\(\\alpha_i = 0\\) for \\(i < k\\), and thus \\(\\alpha_k = 0\\) as well.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="eigenvector-finder"></div>

                <div class="env-block example">
                    <div class="env-title">Example 8.5</div>
                    <div class="env-body">
                        <p>Consider the matrix \\(A = \\begin{pmatrix} 3 & 1 \\\\ 1 & 3 \\end{pmatrix}\\). To find eigenvalues, we solve \\(\\det(A - \\lambda I) = 0\\):</p>
                        \\[\\det\\begin{pmatrix} 3-\\lambda & 1 \\\\ 1 & 3-\\lambda \\end{pmatrix} = (3-\\lambda)^2 - 1 = \\lambda^2 - 6\\lambda + 8 = (\\lambda-4)(\\lambda-2) = 0\\]
                        <p>So \\(\\lambda_1 = 4\\) and \\(\\lambda_2 = 2\\). For \\(\\lambda_1 = 4\\), we solve \\((A - 4I)v = 0\\):</p>
                        \\[\\begin{pmatrix} -1 & 1 \\\\ 1 & -1 \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\end{pmatrix} = 0 \\implies v_1 = \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}\\]
                        <p>For \\(\\lambda_2 = 2\\):</p>
                        \\[\\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\end{pmatrix} = 0 \\implies v_2 = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}\\]
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'eigenvector-finder',
                    title: 'Interactive: Eigenvector Finder',
                    description: 'Drag matrix entries to see eigenvalues and eigenvectors. Watch how vectors align with eigendirections.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        let matrixA = [[2, 0.5], [0.5, 1]];

                        const aSlider = VizEngine.createSlider(controls, 'a₁₁', -3, 3, 2, 0.1, draw);
                        const bSlider = VizEngine.createSlider(controls, 'a₁₂', -2, 2, 0.5, 0.1, draw);
                        const cSlider = VizEngine.createSlider(controls, 'a₂₁', -2, 2, 0.5, 0.1, draw);
                        const dSlider = VizEngine.createSlider(controls, 'a₂₂', -3, 3, 1, 0.1, draw);

                        function draw() {
                            matrixA = [[parseFloat(aSlider.value), parseFloat(bSlider.value)],
                                      [parseFloat(cSlider.value), parseFloat(dSlider.value)]];

                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw unit circle and its image
                            const numPoints = 40;
                            for (let i = 0; i < numPoints; i++) {
                                const theta = (2 * Math.PI * i) / numPoints;
                                const x = Math.cos(theta);
                                const y = Math.sin(theta);
                                viz.drawPoint(x, y, viz.colors.text + '44', null, 2);

                                const [tx, ty] = VizEngine.matVec(matrixA, [x, y]);
                                viz.drawPoint(tx, ty, viz.colors.teal + '88', null, 2);
                            }

                            // Compute and draw eigenvalues/eigenvectors
                            const eigenvals = VizEngine.eigenvalues2(matrixA);
                            if (eigenvals && eigenvals.every(lambda => Math.abs(lambda.imag || 0) < 0.01)) {
                                for (let i = 0; i < eigenvals.length; i++) {
                                    const lambda = eigenvals[i].real || eigenvals[i];
                                    const evec = VizEngine.eigenvector2(matrixA, lambda);
                                    if (evec) {
                                        const color = i === 0 ? viz.colors.orange : viz.colors.purple;
                                        viz.drawVector(0, 0, evec[0], evec[1], color, null, 2);
                                        viz.drawVector(0, 0, -evec[0], -evec[1], color, null, 2);

                                        // Draw transformed eigenvector
                                        viz.drawVector(0, 0, lambda * evec[0], lambda * evec[1],
                                                     color, `λ${i+1}=${lambda.toFixed(2)}`, 3);

                                        viz.drawText(`λ${i+1}=${lambda.toFixed(2)}`,
                                                   evec[0] * 1.5, evec[1] * 1.5, color, 14);
                                    }
                                }
                            } else {
                                viz.drawText('Complex eigenvalues', 0, 5, viz.colors.red, 16, 'center');
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(\\tau \\in \\mathcal{L}(V)\\) be a linear operator. Show that if \\(\\lambda\\) is an eigenvalue of \\(\\tau\\), then \\(\\lambda^k\\) is an eigenvalue of \\(\\tau^k\\) for any positive integer \\(k\\).',
                    hint: 'If \\(\\tau(v) = \\lambda v\\), what is \\(\\tau^2(v)\\)? What about \\(\\tau^k(v)\\)?',
                    solution: 'If \\(v\\) is an eigenvector with \\(\\tau(v) = \\lambda v\\), then \\(\\tau^2(v) = \\tau(\\tau(v)) = \\tau(\\lambda v) = \\lambda \\tau(v) = \\lambda^2 v\\). By induction, \\(\\tau^k(v) = \\lambda^k v\\), so \\(\\lambda^k\\) is an eigenvalue of \\(\\tau^k\\) with eigenvector \\(v\\).'
                },
                {
                    question: 'Prove that if \\(\\tau\\) is invertible, then \\(0\\) is not an eigenvalue of \\(\\tau\\), and if \\(\\lambda \\neq 0\\) is an eigenvalue, then \\(\\lambda^{-1}\\) is an eigenvalue of \\(\\tau^{-1}\\).',
                    hint: 'Use the characterization that \\(\\lambda\\) is an eigenvalue if and only if \\(\\tau - \\lambda \\iota\\) is not invertible.',
                    solution: 'If \\(0\\) were an eigenvalue, then \\(\\tau - 0\\iota = \\tau\\) would not be invertible, contradicting the hypothesis. If \\(\\tau(v) = \\lambda v\\) with \\(\\lambda \\neq 0\\), then \\(v = \\tau^{-1}(\\lambda v) = \\lambda \\tau^{-1}(v)\\), so \\(\\tau^{-1}(v) = \\lambda^{-1} v\\).'
                },
                {
                    question: 'Show that the eigenvalues of a triangular matrix are precisely its diagonal entries.',
                    hint: 'Consider the determinant of \\(A - \\lambda I\\) when \\(A\\) is upper triangular.',
                    solution: 'If \\(A\\) is upper triangular with diagonal entries \\(a_{11}, \\ldots, a_{nn}\\), then \\(A - \\lambda I\\) is also upper triangular with diagonal entries \\(a_{11} - \\lambda, \\ldots, a_{nn} - \\lambda\\). The determinant is the product of diagonal entries: \\(\\det(A - \\lambda I) = \\prod_{i=1}^n (a_{ii} - \\lambda)\\). This is zero if and only if \\(\\lambda = a_{ii}\\) for some \\(i\\).'
                }
            ]
        },
        {
            id: 'ch08-sec02',
            title: 'Characteristic and Minimal Polynomials',
            content: `
                <h2>Characteristic and Minimal Polynomials</h2>

                <p>The characteristic polynomial encodes complete information about eigenvalues, including their algebraic multiplicities.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 8.6 (Characteristic Polynomial)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau \\in \\mathcal{L}(V)\\) where \\(\\dim V = n\\), and let \\(A\\) be any matrix representation of \\(\\tau\\). The <strong>characteristic polynomial</strong> of \\(\\tau\\) is</p>
                        \\[\\chi_\\tau(x) = \\det(xI - A)\\]
                        <p>This is a monic polynomial of degree \\(n\\) that is independent of the choice of basis.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Some authors define the characteristic polynomial as \\(\\det(A - xI)\\), which differs by a factor of \\((-1)^n\\). We use \\(\\det(xI - A)\\) to ensure the polynomial is monic.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.7 (Eigenvalues as Roots)</div>
                    <div class="env-body">
                        <p>A scalar \\(\\lambda \\in F\\) is an eigenvalue of \\(\\tau\\) if and only if \\(\\lambda\\) is a root of \\(\\chi_\\tau(x)\\). Moreover,</p>
                        \\[\\chi_\\tau(x) = \\prod_{i=1}^k (x - \\lambda_i)^{m_i}\\]
                        <p>where \\(\\lambda_1, \\ldots, \\lambda_k\\) are the distinct eigenvalues and \\(m_i\\) is the <strong>algebraic multiplicity</strong> of \\(\\lambda_i\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 8.8 (Geometric Multiplicity)</div>
                    <div class="env-body">
                        <p>The <strong>geometric multiplicity</strong> of an eigenvalue \\(\\lambda\\) is</p>
                        \\[g_\\lambda = \\dim E_\\lambda = \\dim \\ker(\\tau - \\lambda \\iota)\\]
                        <p>This counts the maximum number of linearly independent eigenvectors for \\(\\lambda\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.9 (Geometric vs Algebraic Multiplicity)</div>
                    <div class="env-body">
                        <p>For any eigenvalue \\(\\lambda\\), we have</p>
                        \\[1 \\leq g_\\lambda \\leq m_\\lambda\\]
                        <p>where \\(g_\\lambda\\) is the geometric multiplicity and \\(m_\\lambda\\) is the algebraic multiplicity.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="multiplicity-comparison"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition 8.10 (Minimal Polynomial)</div>
                    <div class="env-body">
                        <p>The <strong>minimal polynomial</strong> \\(m_\\tau(x)\\) of \\(\\tau\\) is the unique monic polynomial of smallest degree such that \\(m_\\tau(\\tau) = 0\\). Equivalently, it is the monic generator of the ideal</p>
                        \\[\\{p(x) \\in F[x] : p(\\tau) = 0\\}\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.11 (Cayley-Hamilton Theorem)</div>
                    <div class="env-body">
                        <p>Every linear operator satisfies its characteristic polynomial:</p>
                        \\[\\chi_\\tau(\\tau) = 0\\]
                        <p>Consequently, \\(m_\\tau(x)\\) divides \\(\\chi_\\tau(x)\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (sketch)</div>
                    <div class="env-body">
                        <p>Let \\(A\\) be the matrix of \\(\\tau\\). The key is to work with the adjugate matrix. We have</p>
                        \\[(xI - A) \\cdot \\operatorname{adj}(xI - A) = \\det(xI - A) \\cdot I = \\chi_\\tau(x) I\\]
                        <p>The entries of \\(\\operatorname{adj}(xI - A)\\) are polynomials in \\(x\\) of degree at most \\(n-1\\). Substituting \\(x = A\\) and using properties of matrix multiplication yields \\(\\chi_\\tau(A) = 0\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.12 (Properties of Minimal Polynomial)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau \\in \\mathcal{L}(V)\\). Then:</p>
                        <ol>
                            <li>\\(m_\\tau(x)\\) and \\(\\chi_\\tau(x)\\) have the same irreducible factors (possibly different multiplicities)</li>
                            <li>\\(\\lambda\\) is an eigenvalue if and only if \\((x - \\lambda) | m_\\tau(x)\\)</li>
                            <li>\\(\\deg(m_\\tau) \\leq n = \\dim V\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 8.13</div>
                    <div class="env-body">
                        <p>Consider the \\(3 \\times 3\\) Jordan block \\(J = \\begin{pmatrix} \\lambda & 1 & 0 \\\\ 0 & \\lambda & 1 \\\\ 0 & 0 & \\lambda \\end{pmatrix}\\). The characteristic polynomial is</p>
                        \\[\\chi_J(x) = (x - \\lambda)^3\\]
                        <p>The minimal polynomial is also \\(m_J(x) = (x - \\lambda)^3\\) since \\((J - \\lambda I)^2 \\neq 0\\) but \\((J - \\lambda I)^3 = 0\\). The eigenvalue \\(\\lambda\\) has algebraic multiplicity \\(3\\) but geometric multiplicity \\(1\\) (only one eigenvector).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'multiplicity-comparison',
                    title: 'Interactive: Geometric vs Algebraic Multiplicity',
                    description: 'Explore Jordan blocks to see how geometric and algebraic multiplicities differ.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        let blockSize = 3;
                        let lambda = 2;

                        const sizeSlider = VizEngine.createSlider(controls, 'Block Size', 1, 4, 3, 1, draw);
                        const lambdaSlider = VizEngine.createSlider(controls, 'λ', -2, 3, 2, 0.5, draw);

                        function draw() {
                            blockSize = parseInt(sizeSlider.value);
                            lambda = parseFloat(lambdaSlider.value);

                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            // Build Jordan block matrix
                            let J = [];
                            for (let i = 0; i < blockSize; i++) {
                                J[i] = [];
                                for (let j = 0; j < blockSize; j++) {
                                    J[i][j] = (i === j) ? lambda : (j === i + 1) ? 1 : 0;
                                }
                            }

                            // Display matrix
                            const matrixStr = J.map(row => '[' + row.map(x => x.toFixed(1)).join(' ') + ']').join('\\n');
                            viz.drawText('Jordan Block J:', -6, 5, viz.colors.white, 14, 'left');
                            const yStart = 4;
                            J.forEach((row, i) => {
                                const rowStr = '[' + row.map(x => (x === 0 ? '0' : x.toFixed(1))).join('  ') + ']';
                                viz.drawText(rowStr, -6, yStart - i * 0.6, viz.colors.text, 12, 'left', 'middle');
                            });

                            // Show eigenvector (only standard basis e₁)
                            viz.drawText('Eigenvector:', -6, -1, viz.colors.orange, 14, 'left');
                            viz.drawText('e₁ = (1,0,0,...)', -6, -1.7, viz.colors.orange, 12, 'left');

                            // Show multiplicities
                            viz.drawText(`Algebraic mult: ${blockSize}`, 2, 4, viz.colors.blue, 14, 'left');
                            viz.drawText(`Geometric mult: 1`, 2, 3.3, viz.colors.green, 14, 'left');

                            // Visual representation: eigenspace dimension
                            viz.drawVector(0, 0, 1, 0, viz.colors.orange, 'E_λ', 3);
                            viz.drawText('dim(E_λ) = 1', 1.5, -0.5, viz.colors.orange, 12);

                            // Show powers of (J - λI)
                            viz.drawText(`Nilpotency: (J-λI)^${blockSize} = 0`, 2, 2.3, viz.colors.purple, 12, 'left');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that similar matrices have the same characteristic polynomial.',
                    hint: 'If \\(B = PAP^{-1}\\), compute \\(\\det(xI - B)\\) using properties of determinants.',
                    solution: 'If \\(B = PAP^{-1}\\), then \\(\\det(xI - B) = \\det(xI - PAP^{-1}) = \\det(P(xI - A)P^{-1}) = \\det(P)\\det(xI - A)\\det(P^{-1}) = \\det(xI - A)\\) since \\(\\det(P)\\det(P^{-1}) = 1\\).'
                },
                {
                    question: 'Verify the Cayley-Hamilton theorem for \\(A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}\\).',
                    hint: 'First compute \\(\\chi_A(x)\\), then evaluate \\(\\chi_A(A)\\) directly.',
                    solution: '\\(\\chi_A(x) = \\det\\begin{pmatrix} x-1 & -2 \\\\ -3 & x-4 \\end{pmatrix} = (x-1)(x-4) - 6 = x^2 - 5x - 2\\). Now \\(A^2 = \\begin{pmatrix} 7 & 10 \\\\ 15 & 22 \\end{pmatrix}\\), so \\(A^2 - 5A - 2I = \\begin{pmatrix} 7 & 10 \\\\ 15 & 22 \\end{pmatrix} - \\begin{pmatrix} 5 & 10 \\\\ 15 & 20 \\end{pmatrix} - \\begin{pmatrix} 2 & 0 \\\\ 0 & 2 \\end{pmatrix} = 0\\).'
                },
                {
                    question: 'Show that if \\(m_\\tau(x) = \\chi_\\tau(x)\\), then \\(\\tau\\) is non-derogatory (has cyclic structure).',
                    hint: 'Use the fact that the degree of the minimal polynomial equals the dimension of a cyclic submodule.',
                    solution: 'If \\(m_\\tau(x) = \\chi_\\tau(x)\\), then \\(\\deg(m_\\tau) = n = \\dim V\\). By the theory of cyclic modules, this means \\(V\\) is a cyclic \\(\\tau\\)-module, i.e., \\(V = \\langle v, \\tau(v), \\ldots, \\tau^{n-1}(v)\\rangle\\) for some \\(v\\), so \\(\\tau\\) is non-derogatory.'
                }
            ]
        },
        {
            id: 'ch08-sec03',
            title: 'Diagonalizability',
            content: `
                <h2>Diagonalizability</h2>

                <p>A linear operator is diagonalizable when it admits an eigenvector basis—the ideal situation for understanding its structure.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 8.14 (Diagonalizable Operator)</div>
                    <div class="env-body">
                        <p>A linear operator \\(\\tau \\in \\mathcal{L}(V)\\) is <strong>diagonalizable</strong> if there exists an ordered basis \\(\\mathcal{B} = (v_1, \\ldots, v_n)\\) of \\(V\\) consisting entirely of eigenvectors of \\(\\tau\\). Equivalently, \\(\\tau\\) is diagonalizable if its matrix representation is similar to a diagonal matrix.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.15 (Characterization of Diagonalizability)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau \\in \\mathcal{L}(V)\\) where \\(\\dim V = n\\). The following are equivalent:</p>
                        <ol>
                            <li>\\(\\tau\\) is diagonalizable</li>
                            <li>\\(V\\) has a basis of eigenvectors of \\(\\tau\\)</li>
                            <li>\\(V = E_{\\lambda_1} \\oplus E_{\\lambda_2} \\oplus \\cdots \\oplus E_{\\lambda_k}\\) where \\(\\lambda_1, \\ldots, \\lambda_k\\) are the distinct eigenvalues</li>
                            <li>\\(\\sum_{i=1}^k \\dim E_{\\lambda_i} = n\\)</li>
                            <li>The minimal polynomial factors into distinct linear factors: \\(m_\\tau(x) = (x - \\lambda_1)\\cdots(x - \\lambda_k)\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>(1)⇔(2) is immediate from the definition. (2)⇔(3): A basis of eigenvectors can be partitioned by eigenvalue, giving bases for each \\(E_{\\lambda_i}\\). The sum is direct since eigenvectors for distinct eigenvalues are independent. (3)⇔(4) by dimension formula for direct sums.</p>
                        <p>(3)⇒(5): If \\(V = \\bigoplus E_{\\lambda_i}\\), then for any \\(v \\in V\\), we have \\(v = \\sum v_i\\) with \\(v_i \\in E_{\\lambda_i}\\). Then \\(\\prod(\\tau - \\lambda_i \\iota)(v) = \\prod(\\tau - \\lambda_i \\iota)(v_i) = 0\\) since each factor annihilates the corresponding eigenspace. Thus \\(m_\\tau(x) | \\prod(x - \\lambda_i)\\), and since all \\(\\lambda_i\\) are eigenvalues, \\(m_\\tau(x) = \\prod(x - \\lambda_i)\\).</p>
                        <p>(5)⇒(3): By primary decomposition, \\(V = \\bigoplus V_{\\lambda_i}\\) where \\(V_{\\lambda_i} = \\ker(\\tau - \\lambda_i \\iota)^{m_i}\\). If \\(m_\\tau(x)\\) has only simple roots, then \\(V_{\\lambda_i} = \\ker(\\tau - \\lambda_i \\iota) = E_{\\lambda_i}\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.16 (Diagonalization Criterion)</div>
                    <div class="env-body">
                        <p>An operator \\(\\tau\\) is diagonalizable if and only if:</p>
                        <ol>
                            <li>The characteristic polynomial splits: \\(\\chi_\\tau(x) = \\prod_{i=1}^k (x - \\lambda_i)^{m_i}\\)</li>
                            <li>For each eigenvalue \\(\\lambda_i\\), the geometric multiplicity equals the algebraic multiplicity: \\(g_{\\lambda_i} = m_{\\lambda_i}\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="diagonalization-demo"></div>

                <div class="env-block example">
                    <div class="env-title">Example 8.17 (Non-diagonalizable Matrix)</div>
                    <div class="env-body">
                        <p>The matrix \\(A = \\begin{pmatrix} 2 & 1 \\\\ 0 & 2 \\end{pmatrix}\\) has characteristic polynomial \\((x-2)^2\\), so \\(\\lambda = 2\\) with algebraic multiplicity 2. However, \\(A - 2I = \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}\\) has rank 1, so \\(\\dim E_2 = 1\\). Since \\(g_2 = 1 < 2 = m_2\\), the matrix is not diagonalizable.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.18 (Simultaneous Diagonalization)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau, \\sigma \\in \\mathcal{L}(V)\\) be diagonalizable operators. Then \\(\\tau\\) and \\(\\sigma\\) are <strong>simultaneously diagonalizable</strong> (there exists a basis that diagonalizes both) if and only if \\(\\tau\\sigma = \\sigma\\tau\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>(⇒) If both are diagonal in basis \\(\\mathcal{B}\\), then their matrices commute, so the operators commute.</p>
                        <p>(⇐) Suppose \\(\\tau\\sigma = \\sigma\\tau\\). For each eigenvalue \\(\\lambda\\) of \\(\\tau\\), the eigenspace \\(E_\\lambda\\) is \\(\\sigma\\)-invariant: if \\(v \\in E_\\lambda\\), then \\(\\tau(\\sigma(v)) = \\sigma(\\tau(v)) = \\sigma(\\lambda v) = \\lambda \\sigma(v)\\), so \\(\\sigma(v) \\in E_\\lambda\\). Since \\(\\sigma\\) is diagonalizable, \\(\\sigma|_{E_\\lambda}\\) is diagonalizable on \\(E_\\lambda\\). Choose an eigenbasis for \\(\\sigma|_{E_\\lambda}\\) in each \\(E_\\lambda\\). These vectors are eigenvectors of both \\(\\tau\\) and \\(\\sigma\\), forming a simultaneous eigenbasis for \\(V\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'diagonalization-demo',
                    title: 'Interactive: Diagonalization Step-by-Step',
                    description: 'See how changing to an eigenvector basis diagonalizes the matrix.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 60});

                        let step = 0;
                        const maxSteps = 3;

                        VizEngine.createButton(controls, 'Next Step', () => {
                            step = (step + 1) % (maxSteps + 1);
                            draw();
                        });

                        VizEngine.createButton(controls, 'Reset', () => {
                            step = 0;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            // Original matrix
                            const A = [[3, 1], [1, 3]];
                            const lambda1 = 4, lambda2 = 2;
                            const v1 = [1/Math.sqrt(2), 1/Math.sqrt(2)];
                            const v2 = [1/Math.sqrt(2), -1/Math.sqrt(2)];

                            if (step === 0) {
                                viz.drawText('Standard basis:', -6, 5, viz.colors.white, 14, 'left');
                                viz.drawVector(0, 0, 1, 0, viz.colors.blue, 'e₁', 2);
                                viz.drawVector(0, 0, 0, 1, viz.colors.blue, 'e₂', 2);

                                const p = [2, 1];
                                const Ap = VizEngine.matVec(A, p);
                                viz.drawVector(0, 0, p[0], p[1], viz.colors.teal, 'v', 2);
                                viz.drawVector(0, 0, Ap[0], Ap[1], viz.colors.orange, 'Av', 2);

                                viz.drawText('A = [[3,1],[1,3]]', -6, 4, viz.colors.text, 12, 'left');
                                viz.drawText('Non-diagonal action', -6, -4.5, viz.colors.white, 14, 'left');
                            } else if (step === 1) {
                                viz.drawText('Find eigenvectors:', -6, 5, viz.colors.white, 14, 'left');
                                viz.drawVector(0, 0, v1[0]*2, v1[1]*2, viz.colors.orange, 'v₁', 3);
                                viz.drawVector(0, 0, v2[0]*2, v2[1]*2, viz.colors.purple, 'v₂', 3);

                                viz.drawText('λ₁=4, v₁=(1,1)', -6, 4, viz.colors.orange, 11, 'left');
                                viz.drawText('λ₂=2, v₂=(1,-1)', -6, 3.3, viz.colors.purple, 11, 'left');

                                // Show Av₁ = 4v₁
                                const Av1 = VizEngine.matVec(A, v1);
                                viz.drawVector(0, 0, Av1[0], Av1[1], viz.colors.orange + '88', null, 2);
                            } else if (step === 2) {
                                viz.drawText('Change basis: P = [v₁ v₂]', -6, 5, viz.colors.white, 14, 'left');
                                viz.drawVector(0, 0, v1[0]*2, v1[1]*2, viz.colors.orange, 'v₁', 3);
                                viz.drawVector(0, 0, v2[0]*2, v2[1]*2, viz.colors.purple, 'v₂', 3);

                                viz.drawText('In new basis:', -6, 3.5, viz.colors.white, 12, 'left');
                                viz.drawText('D = P⁻¹AP = diag(4,2)', -6, 2.8, viz.colors.green, 12, 'left');
                            } else if (step === 3) {
                                viz.drawText('Diagonal matrix action:', -6, 5, viz.colors.white, 14, 'left');
                                viz.drawText('D = [[4,0],[0,2]]', -6, 4.2, viz.colors.green, 12, 'left');

                                viz.drawVector(0, 0, v1[0]*2, v1[1]*2, viz.colors.orange, 'v₁', 2);
                                viz.drawVector(0, 0, v2[0]*2, v2[1]*2, viz.colors.purple, 'v₂', 2);

                                // Show scaling
                                viz.drawVector(0, 0, lambda1*v1[0], lambda1*v1[1], viz.colors.orange, '4v₁', 3);
                                viz.drawVector(0, 0, lambda2*v2[0], lambda2*v2[1], viz.colors.purple, '2v₂', 3);

                                viz.drawText('Each eigenvector scaled!', -6, -4.5, viz.colors.green, 14, 'left');
                            }

                            viz.drawText(`Step ${step}/${maxSteps}`, 4, -4.5, viz.colors.text, 12, 'right');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that if \\(\\tau\\) is diagonalizable and \\(p(x) \\in F[x]\\) is any polynomial, then \\(p(\\tau)\\) is also diagonalizable.',
                    hint: 'If \\(\\tau(v) = \\lambda v\\), what is \\(p(\\tau)(v)\\)?',
                    solution: 'If \\(V\\) has basis \\(\\{v_1, \\ldots, v_n\\}\\) with \\(\\tau(v_i) = \\lambda_i v_i\\), then \\(p(\\tau)(v_i) = p(\\lambda_i) v_i\\). So the same basis diagonalizes \\(p(\\tau)\\) with eigenvalues \\(p(\\lambda_1), \\ldots, p(\\lambda_n)\\).'
                },
                {
                    question: 'Show that if \\(\\dim V = n\\) and \\(\\tau\\) has \\(n\\) distinct eigenvalues, then \\(\\tau\\) is diagonalizable.',
                    hint: 'Use the fact that eigenvectors for distinct eigenvalues are linearly independent.',
                    solution: 'If \\(\\lambda_1, \\ldots, \\lambda_n\\) are distinct eigenvalues with eigenvectors \\(v_1, \\ldots, v_n\\), these vectors are linearly independent by Theorem 8.4. Since there are \\(n\\) of them in an \\(n\\)-dimensional space, they form a basis, so \\(\\tau\\) is diagonalizable.'
                },
                {
                    question: 'Prove that a projection \\(\\pi\\) (with \\(\\pi^2 = \\pi\\)) is diagonalizable with eigenvalues in \\(\\{0, 1\\}\\).',
                    hint: 'Show that \\(V = \\ker(\\pi) \\oplus \\operatorname{im}(\\pi)\\) and these are eigenspaces.',
                    solution: 'If \\(\\pi^2 = \\pi\\), then \\(\\pi(\\pi - \\iota) = 0\\), so \\(m_\\pi(x) | x(x-1)\\). Thus \\(m_\\pi(x)\\) factors into distinct linear factors, so \\(\\pi\\) is diagonalizable with eigenvalues in \\(\\{0,1\\}\\). Explicitly, \\(\\ker(\\pi) = E_0\\) and \\(\\operatorname{im}(\\pi) = E_1\\), and \\(V = \\ker(\\pi) \\oplus \\operatorname{im}(\\pi)\\).'
                }
            ]
        },
        {
            id: 'ch08-sec04',
            title: 'Triangularization and Schur\'s Theorem',
            content: `
                <h2>Triangularization and Schur's Theorem</h2>

                <p>When an operator is not diagonalizable, we can often still achieve a triangular form, which is simpler than an arbitrary matrix.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 8.19 (Triangularizable Operator)</div>
                    <div class="env-body">
                        <p>A linear operator \\(\\tau \\in \\mathcal{L}(V)\\) is <strong>upper triangularizable</strong> if there exists an ordered basis \\(\\mathcal{B} = (v_1, \\ldots, v_n)\\) such that</p>
                        \\[\\tau(v_i) \\in \\operatorname{span}(v_1, \\ldots, v_i)\\]
                        <p>for all \\(i = 1, \\ldots, n\\). Equivalently, the matrix \\([\\tau]_\\mathcal{B}\\) is upper triangular.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.20 (Schur's Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be a finite-dimensional vector space over a field \\(F\\).</p>
                        <ol>
                            <li>If the characteristic polynomial of \\(\\tau \\in \\mathcal{L}(V)\\) splits over \\(F\\), then \\(\\tau\\) is upper triangularizable</li>
                            <li>If \\(F\\) is algebraically closed (e.g., \\(F = \\mathbb{C}\\)), then every operator is upper triangularizable</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>By induction on \\(n = \\dim V\\). For \\(n = 1\\), all \\(1 \\times 1\\) matrices are triangular. Assume the result for dimension \\(n-1\\).</p>
                        <p>Let \\(\\lambda\\) be an eigenvalue (exists since \\(\\chi_\\tau\\) splits) and let \\(v_1\\) be a corresponding eigenvector. Extend to a basis \\((v_1, \\ldots, v_n)\\). The matrix of \\(\\tau\\) in this basis has the form</p>
                        \\[[\\tau] = \\begin{pmatrix} \\lambda & * \\\\ 0 & A \\end{pmatrix}\\]
                        <p>where \\(A\\) is \\((n-1) \\times (n-1)\\). Since similar matrices have the same characteristic polynomial, \\(\\chi_A(x)\\) divides \\(\\chi_\\tau(x)\\), so \\(\\chi_A\\) also splits. By induction, there exists a basis for the \\((n-1)\\)-dimensional space making \\(A\\) upper triangular. This gives a basis for \\(V\\) making \\([\\tau]\\) upper triangular.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Over \\(\\mathbb{R}\\), not all operators are triangularizable (e.g., rotation by \\(\\pi/2\\) in \\(\\mathbb{R}^2\\)). However, we can achieve an <strong>almost upper triangular form</strong> where \\(2 \\times 2\\) blocks appear on the diagonal corresponding to complex conjugate eigenvalue pairs.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.21 (Real Schur Form)</div>
                    <div class="env-body">
                        <p>Every real matrix \\(A\\) is orthogonally similar to a block upper triangular matrix with \\(1 \\times 1\\) and \\(2 \\times 2\\) blocks on the diagonal. The \\(2 \\times 2\\) blocks have the form</p>
                        \\[\\begin{pmatrix} a & b \\\\ -b & a \\end{pmatrix}\\]
                        <p>corresponding to complex conjugate eigenvalues \\(a \\pm bi\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Triangular matrices are "almost diagonal"—they're as close as we can get without requiring diagonalizability. The eigenvalues appear on the diagonal, making them easy to read off. The upper triangular part captures the "non-diagonalizable" information about generalized eigenvectors.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="triangularization-demo"></div>

                <div class="env-block example">
                    <div class="env-title">Example 8.22</div>
                    <div class="env-body">
                        <p>The matrix \\(A = \\begin{pmatrix} 2 & 1 & -1 \\\\ 0 & 3 & 2 \\\\ 0 & 0 & 2 \\end{pmatrix}\\) is already upper triangular. Its eigenvalues are \\(\\lambda_1 = 2\\) (with multiplicity 2) and \\(\\lambda_2 = 3\\), which we read directly from the diagonal.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Corollary 8.23</div>
                    <div class="env-body">
                        <p>If \\(\\tau\\) is upper triangularizable, then:</p>
                        <ol>
                            <li>The diagonal entries of the triangular matrix are the eigenvalues (with repetition according to algebraic multiplicity)</li>
                            <li>\\(\\det(\\tau)\\) is the product of the eigenvalues</li>
                            <li>\\(\\operatorname{tr}(\\tau)\\) is the sum of the eigenvalues</li>
                        </ol>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'triangularization-demo',
                    title: 'Interactive: Triangularization Process',
                    description: 'Watch how successive eigenspaces lead to triangular form.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        let phase = 0;

                        VizEngine.createButton(controls, 'Next Phase', () => {
                            phase = (phase + 1) % 4;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            if (phase === 0) {
                                viz.drawText('Original 3×3 matrix A:', -6, 5.5, viz.colors.white, 14, 'left');
                                viz.drawText('[[2, 1, 1]', -6, 4.7, viz.colors.text, 11, 'left');
                                viz.drawText(' [0, 3, 2]', -6, 4.2, viz.colors.text, 11, 'left');
                                viz.drawText(' [0, 1, 4]]', -6, 3.7, viz.colors.text, 11, 'left');

                                viz.drawText('Goal: Find basis making A triangular', -6, 2.5, viz.colors.yellow, 12, 'left');
                            } else if (phase === 1) {
                                viz.drawText('Step 1: Find eigenvector v₁', -6, 5.5, viz.colors.white, 14, 'left');
                                viz.drawVector(0, 0, 2, 0, viz.colors.orange, 'v₁', 3);
                                viz.drawText('λ₁ = 2, v₁ = (1,0,0)', -6, 4.5, viz.colors.orange, 12, 'left');

                                viz.drawText('Av₁ = 2v₁', -6, 3.5, viz.colors.orange, 11, 'left');
                                viz.drawText('(stays in span(v₁))', -6, 2.9, viz.colors.text, 10, 'left');
                            } else if (phase === 2) {
                                viz.drawText('Step 2: Extend to basis', -6, 5.5, viz.colors.white, 14, 'left');
                                viz.drawVector(0, 0, 2, 0, viz.colors.orange, 'v₁', 2);
                                viz.drawVector(0, 0, 0, 2, viz.colors.purple, 'v₂', 2);
                                viz.drawVector(0, 0, 1, 1, viz.colors.blue, 'v₃', 2);

                                viz.drawText('Find v₂, v₃ so that:', -6, 4.3, viz.colors.white, 11, 'left');
                                viz.drawText('Av₂ ∈ span(v₁,v₂)', -6, 3.7, viz.colors.purple, 10, 'left');
                                viz.drawText('Av₃ ∈ span(v₁,v₂,v₃)', -6, 3.2, viz.colors.blue, 10, 'left');
                            } else if (phase === 3) {
                                viz.drawText('Result: Upper triangular!', -6, 5.5, viz.colors.green, 14, 'left');
                                viz.drawText('[A]_basis =', -6, 4.5, viz.colors.white, 12, 'left');
                                viz.drawText('[[λ₁, *, *]', -6, 3.9, viz.colors.text, 11, 'left');
                                viz.drawText(' [0, λ₂, *]', -6, 3.4, viz.colors.text, 11, 'left');
                                viz.drawText(' [0, 0, λ₃]]', -6, 2.9, viz.colors.text, 11, 'left');

                                viz.drawText('Eigenvalues on diagonal!', -6, 1.8, viz.colors.green, 12, 'left');

                                // Draw the basis
                                viz.drawVector(0, 0, 2, 0, viz.colors.orange, 'v₁', 2);
                                viz.drawVector(0, 0, 0, 2, viz.colors.purple, 'v₂', 2);
                                viz.drawVector(0, 0, 1, 1, viz.colors.blue, 'v₃', 2);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that a matrix is upper triangularizable if and only if its transpose is lower triangularizable.',
                    hint: 'Consider the relationship between the matrices in the corresponding bases.',
                    solution: 'If \\(A = PTP^{-1}\\) where \\(T\\) is upper triangular, then \\(A^T = (P^{-1})^T T^T P^T\\). Since \\(T^T\\) is lower triangular and \\((P^{-1})^T\\) is invertible, \\(A^T\\) is lower triangularizable. The converse is similar.'
                },
                {
                    question: 'Prove that the product of two upper triangular matrices is upper triangular.',
                    hint: 'Work with the definition: \\((AB)_{ij} = \\sum_k A_{ik} B_{kj}\\).',
                    solution: 'If \\(A\\) and \\(B\\) are upper triangular and \\(i > j\\), then \\((AB)_{ij} = \\sum_{k=1}^n A_{ik} B_{kj}\\). For \\(k < i\\), \\(A_{ik} = 0\\) (since \\(A\\) is upper triangular). For \\(k \\geq i > j\\), \\(B_{kj} = 0\\) (since \\(B\\) is upper triangular). So all terms are zero, hence \\((AB)_{ij} = 0\\).'
                },
                {
                    question: 'Let \\(A\\) be an upper triangular matrix with all diagonal entries equal. Show that either \\(A\\) is diagonal or \\(A\\) is not diagonalizable.',
                    hint: 'If all diagonal entries are \\(\\lambda\\), what are the eigenvalues? What is the geometric multiplicity?',
                    solution: 'All diagonal entries equal to \\(\\lambda\\) means \\(\\lambda\\) is the only eigenvalue with algebraic multiplicity \\(n\\). If \\(A\\) were diagonalizable, then \\(A\\) would be similar to \\(\\lambda I\\), hence \\(A = \\lambda I\\) is diagonal. Conversely, if \\(A\\) is not diagonal, then some off-diagonal entry is nonzero, so \\(g_\\lambda < n = m_\\lambda\\), making \\(A\\) non-diagonalizable.'
                }
            ]
        },
        {
            id: 'ch08-sec05',
            title: 'The Jordan Canonical Form',
            content: `
                <h2>The Jordan Canonical Form</h2>

                <p>Over an algebraically closed field, the Jordan canonical form provides the finest classification of operators up to similarity—a true canonical form that captures all essential information.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 8.24 (Jordan Block)</div>
                    <div class="env-body">
                        <p>A <strong>Jordan block</strong> of size \\(k \\times k\\) associated with eigenvalue \\(\\lambda\\) is the matrix</p>
                        \\[J_k(\\lambda) = \\begin{pmatrix}
                        \\lambda & 1 & 0 & \\cdots & 0 \\\\
                        0 & \\lambda & 1 & \\cdots & 0 \\\\
                        \\vdots & & \\ddots & \\ddots & \\vdots \\\\
                        0 & \\cdots & 0 & \\lambda & 1 \\\\
                        0 & \\cdots & 0 & 0 & \\lambda
                        \\end{pmatrix}\\]
                        <p>It has \\(\\lambda\\) on the diagonal, 1's on the superdiagonal, and 0's elsewhere.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 8.25 (Jordan Canonical Form)</div>
                    <div class="env-body">
                        <p>A matrix is in <strong>Jordan canonical form</strong> if it is a block diagonal matrix</p>
                        \\[J = \\operatorname{diag}(J_{k_1}(\\lambda_1), J_{k_2}(\\lambda_2), \\ldots, J_{k_r}(\\lambda_r))\\]
                        <p>where each \\(J_{k_i}(\\lambda_i)\\) is a Jordan block.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.26 (Jordan Canonical Form Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau \\in \\mathcal{L}(V)\\) where \\(V\\) is a vector space over an algebraically closed field \\(F\\) (e.g., \\(\\mathbb{C}\\)). Then:</p>
                        <ol>
                            <li>There exists a basis \\(\\mathcal{B}\\) such that \\([\\tau]_\\mathcal{B}\\) is in Jordan canonical form</li>
                            <li>The Jordan canonical form is unique up to permutation of blocks</li>
                            <li>Two operators are similar if and only if they have the same Jordan canonical form</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (sketch)</div>
                    <div class="env-body">
                        <p>The existence follows from the theory of cyclic decomposition. By the primary decomposition theorem, \\(V = \\bigoplus V_{\\lambda}\\) where \\(V_\\lambda = \\ker(\\tau - \\lambda \\iota)^m\\) for large \\(m\\). Each \\(V_\\lambda\\) further decomposes into cyclic submodules of orders \\((x - \\lambda)^{k_i}\\). On each cyclic submodule, we can choose a basis giving a single Jordan block. The uniqueness follows from the invariant factor theorem: the sizes and multiplicities of Jordan blocks are determined by the elementary divisors, which are similarity invariants.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.27 (Jordan Block Structure)</div>
                    <div class="env-body">
                        <p>For a Jordan block \\(J_k(\\lambda)\\):</p>
                        <ol>
                            <li>The only eigenvalue is \\(\\lambda\\) with algebraic multiplicity \\(k\\)</li>
                            <li>The geometric multiplicity is 1 (one eigenvector)</li>
                            <li>\\((J_k(\\lambda) - \\lambda I)^k = 0\\) but \\((J_k(\\lambda) - \\lambda I)^{k-1} \\neq 0\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="jordan-form-explorer"></div>

                <div class="env-block example">
                    <div class="env-title">Example 8.28</div>
                    <div class="env-body">
                        <p>Consider a \\(5 \\times 5\\) matrix with Jordan form</p>
                        \\[J = \\begin{pmatrix}
                        2 & 1 & 0 & 0 & 0 \\\\
                        0 & 2 & 1 & 0 & 0 \\\\
                        0 & 0 & 2 & 0 & 0 \\\\
                        0 & 0 & 0 & 3 & 1 \\\\
                        0 & 0 & 0 & 0 & 3
                        \\end{pmatrix}\\]
                        <p>This has two Jordan blocks: \\(J_3(2)\\) and \\(J_2(3)\\). The eigenvalue 2 has algebraic multiplicity 3 and geometric multiplicity 1. The eigenvalue 3 has algebraic multiplicity 2 and geometric multiplicity 1. The minimal polynomial is \\(m(x) = (x-2)^3(x-3)^2\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.29 (Computing Jordan Form from Ranks)</div>
                    <div class="env-body">
                        <p>Let \\(A\\) have only one eigenvalue \\(\\lambda\\) and let \\(r_k = \\operatorname{rank}(A - \\lambda I)^k\\). Then:</p>
                        <ol>
                            <li>The number of Jordan blocks equals \\(n - r_1\\)</li>
                            <li>The largest Jordan block has size \\(m\\) where \\(m\\) is minimal with \\(r_m = r_{m+1}\\)</li>
                            <li>The number of blocks of size \\(\\geq k\\) is \\(n - r_1 - (r_k - r_{k-1})\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The Jordan form reveals the "nilpotent structure" of an operator. If \\(\\tau\\) is diagonalizable, all Jordan blocks are \\(1 \\times 1\\) (just eigenvalues). Larger blocks indicate "generalized eigenvectors"—vectors that become eigenvectors after repeated application of \\((\\tau - \\lambda \\iota)\\). The size of the largest block for \\(\\lambda\\) is the exponent in the minimal polynomial's factor \\((x - \\lambda)^m\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Stability)</div>
                    <div class="env-body">
                        <p>The Jordan form is <em>not</em> continuous: arbitrarily small perturbations can drastically change the Jordan structure. For example, \\(\\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}\\) has one \\(2 \\times 2\\) Jordan block, but \\(\\begin{pmatrix} \\epsilon & 1 \\\\ 0 & 0 \\end{pmatrix}\\) for \\(\\epsilon \\neq 0\\) is diagonalizable with two \\(1 \\times 1\\) blocks. This instability makes the Jordan form impractical for numerical computation.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'jordan-form-explorer',
                    title: 'Interactive: Jordan Form Explorer',
                    description: 'Build custom Jordan forms and see their properties.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        let blockSizes = [3, 2];
                        let lambda = 2;

                        const block1Slider = VizEngine.createSlider(controls, 'Block 1 size', 1, 4, 3, 1, draw);
                        const block2Slider = VizEngine.createSlider(controls, 'Block 2 size', 1, 3, 2, 1, draw);
                        const lambdaSlider = VizEngine.createSlider(controls, 'λ', -2, 3, 2, 0.5, draw);

                        function draw() {
                            blockSizes = [parseInt(block1Slider.value), parseInt(block2Slider.value)];
                            lambda = parseFloat(lambdaSlider.value);

                            viz.clear();

                            const n = blockSizes[0] + blockSizes[1];

                            // Display Jordan matrix
                            viz.drawText('Jordan Form J:', -6, 6, viz.colors.white, 14, 'left');

                            let yPos = 5;
                            let rowIdx = 0;

                            for (let b = 0; b < blockSizes.length; b++) {
                                const size = blockSizes[b];
                                for (let i = 0; i < size; i++) {
                                    let rowStr = '[';
                                    for (let c = 0; c < blockSizes.length; c++) {
                                        const cSize = blockSizes[c];
                                        const startCol = blockSizes.slice(0, c).reduce((a, x) => a + x, 0);

                                        for (let j = 0; j < cSize; j++) {
                                            const globalJ = startCol + j;
                                            if (globalJ === rowIdx) {
                                                rowStr += lambda.toFixed(1);
                                            } else if (globalJ === rowIdx + 1 && c === b && j === i + 1) {
                                                rowStr += ' 1';
                                            } else {
                                                rowStr += ' 0';
                                            }
                                            if (globalJ < n - 1) rowStr += ' ';
                                        }
                                    }
                                    rowStr += ']';
                                    viz.drawText(rowStr, -6, yPos - rowIdx * 0.5, viz.colors.text, 10, 'left', 'middle');
                                    rowIdx++;
                                }
                            }

                            // Properties
                            viz.drawText('Properties:', 2, 6, viz.colors.white, 14, 'left');
                            viz.drawText(`Dimension: ${n}×${n}`, 2, 5.3, viz.colors.text, 11, 'left');
                            viz.drawText(`Eigenvalue: λ=${lambda.toFixed(1)}`, 2, 4.7, viz.colors.orange, 11, 'left');
                            viz.drawText(`Alg. mult: ${n}`, 2, 4.1, viz.colors.blue, 11, 'left');
                            viz.drawText(`Geo. mult: ${blockSizes.length}`, 2, 3.5, viz.colors.green, 11, 'left');

                            const maxBlock = Math.max(...blockSizes);
                            viz.drawText(`Max block: ${maxBlock}`, 2, 2.9, viz.colors.purple, 11, 'left');
                            viz.drawText(`Min poly: (x-λ)^${maxBlock}`, 2, 2.3, viz.colors.yellow, 11, 'left');

                            if (blockSizes.every(s => s === 1)) {
                                viz.drawText('✓ Diagonalizable!', 2, 1.5, viz.colors.green, 12, 'left');
                            } else {
                                viz.drawText('✗ Not diagonalizable', 2, 1.5, viz.colors.red, 12, 'left');
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that a Jordan block \\(J_k(\\lambda)\\) is diagonalizable if and only if \\(k = 1\\).',
                    hint: 'What is the dimension of \\(\\ker(J_k(\\lambda) - \\lambda I)\\)?',
                    solution: 'For \\(J_k(\\lambda)\\), we have \\(J_k(\\lambda) - \\lambda I\\) with 1\'s on the superdiagonal and 0\'s elsewhere. This has rank \\(k-1\\), so \\(\\dim \\ker(J_k(\\lambda) - \\lambda I) = k - (k-1) = 1\\). The geometric multiplicity is 1, but the algebraic multiplicity is \\(k\\). For diagonalizability, we need \\(g_\\lambda = m_\\lambda\\), which requires \\(k = 1\\).'
                },
                {
                    question: 'Compute the Jordan form of \\(A = \\begin{pmatrix} 5 & 4 & 2 & 1 \\\\ 0 & 1 & -1 & -1 \\\\ -1 & -1 & 3 & 0 \\\\ 1 & 1 & -1 & 2 \\end{pmatrix}\\) given that \\(\\chi_A(x) = (x-1)^2(x-4)^2\\).',
                    hint: 'Compute ranks of \\((A - I)^k\\) and \\((A - 4I)^k\\) to determine block sizes.',
                    solution: 'For \\(\\lambda = 1\\): \\(\\operatorname{rank}(A - I) = 3\\), so \\(\\dim \\ker(A-I) = 1\\). For \\(\\lambda = 4\\): \\(\\operatorname{rank}(A - 4I) = 2\\), so \\(\\dim \\ker(A-4I) = 2\\). Since \\(\\lambda = 1\\) has algebraic multiplicity 2 but geometric multiplicity 1, it has one \\(2 \\times 2\\) Jordan block. Since \\(\\lambda = 4\\) has both multiplicities equal to 2, it has two \\(1 \\times 1\\) blocks. Jordan form: \\(J = \\operatorname{diag}(J_2(1), 4, 4)\\).'
                },
                {
                    question: 'Prove that two \\(n \\times n\\) matrices over \\(\\mathbb{C}\\) are similar if and only if they have the same Jordan canonical form (up to block permutation).',
                    hint: 'Use the fact that the Jordan form is a complete set of similarity invariants.',
                    solution: 'If \\(A\\) and \\(B\\) have the same Jordan form \\(J\\), then \\(A = P_1 J P_1^{-1}\\) and \\(B = P_2 J P_2^{-1}\\) for some invertible \\(P_1, P_2\\). Thus \\(B = P_2 P_1^{-1} A P_1 P_2^{-1}\\), so \\(A\\) and \\(B\\) are similar. Conversely, if \\(A\\) and \\(B\\) are similar, they have the same characteristic polynomial, minimal polynomial, and rank sequences \\(\\operatorname{rank}(A - \\lambda I)^k\\), which uniquely determine the Jordan form. Thus they have the same Jordan form.'
                }
            ]
        },
        {
            id: 'ch08-sec06',
            title: 'The Cayley-Hamilton Theorem',
            content: `
                <h2>The Cayley-Hamilton Theorem</h2>

                <p>One of the most elegant results in linear algebra states that every operator satisfies its own characteristic equation—a powerful tool for computing matrix functions and understanding operator structure.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.30 (Cayley-Hamilton Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau \\in \\mathcal{L}(V)\\) where \\(\\dim V = n\\), and let \\(\\chi_\\tau(x) = x^n + c_{n-1}x^{n-1} + \\cdots + c_1 x + c_0\\) be the characteristic polynomial. Then</p>
                        \\[\\chi_\\tau(\\tau) = \\tau^n + c_{n-1}\\tau^{n-1} + \\cdots + c_1 \\tau + c_0 \\iota = 0\\]
                        <p>In other words, every linear operator is a zero of its characteristic polynomial.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (via adjugate matrix)</div>
                    <div class="env-body">
                        <p>Let \\(A\\) be the matrix of \\(\\tau\\) in some basis. Consider the matrix \\(xI - A\\) with polynomial entries. Its adjugate matrix \\(\\operatorname{adj}(xI - A)\\) has entries that are polynomials in \\(x\\) of degree at most \\(n-1\\). We can write</p>
                        \\[\\operatorname{adj}(xI - A) = B_{n-1}x^{n-1} + B_{n-2}x^{n-2} + \\cdots + B_1 x + B_0\\]
                        <p>where each \\(B_i\\) is an \\(n \\times n\\) matrix with scalar entries. By the adjugate formula,</p>
                        \\[(xI - A) \\cdot \\operatorname{adj}(xI - A) = \\det(xI - A) \\cdot I = \\chi_A(x) I\\]
                        <p>Expanding the left side and the right side as polynomials in \\(x\\) and equating coefficients, then substituting \\(x = A\\) yields \\(\\chi_A(A) = 0\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Alternative Proof (via eigenvalues)</div>
                    <div class="env-body">
                        <p>Over an algebraically closed field, we can triangularize \\(\\tau\\). If \\(T\\) is the upper triangular matrix with eigenvalues \\(\\lambda_1, \\ldots, \\lambda_n\\) on the diagonal (repeated according to multiplicity), then</p>
                        \\[\\chi_\\tau(x) = \\prod_{i=1}^n (x - \\lambda_i)\\]
                        <p>Since \\(T - \\lambda_i I\\) is upper triangular with at least one zero diagonal entry, the product \\(\\prod_{i=1}^n (T - \\lambda_i I) = 0\\) by considering the diagonal entries. Since \\(T\\) and \\(A\\) are similar, \\(\\chi_A(A) = 0\\) as well.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="cayley-hamilton-demo"></div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 8.31</div>
                    <div class="env-body">
                        <p>The minimal polynomial \\(m_\\tau(x)\\) divides the characteristic polynomial \\(\\chi_\\tau(x)\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>By Cayley-Hamilton, \\(\\chi_\\tau(\\tau) = 0\\). By definition of the minimal polynomial, \\(m_\\tau(x)\\) is the monic polynomial of smallest degree such that \\(m_\\tau(\\tau) = 0\\). Since \\(\\chi_\\tau(\\tau) = 0\\), we have \\(m_\\tau(x) | \\chi_\\tau(x)\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 8.32</div>
                    <div class="env-body">
                        <p>Let \\(A = \\begin{pmatrix} 3 & 1 \\\\ -1 & 1 \\end{pmatrix}\\). The characteristic polynomial is</p>
                        \\[\\chi_A(x) = \\det\\begin{pmatrix} x-3 & -1 \\\\ 1 & x-1 \\end{pmatrix} = (x-3)(x-1) + 1 = x^2 - 4x + 4 = (x-2)^2\\]
                        <p>By Cayley-Hamilton, \\(A^2 - 4A + 4I = 0\\). Let's verify:</p>
                        \\[A^2 = \\begin{pmatrix} 8 & 4 \\\\ -4 & 0 \\end{pmatrix}, \\quad 4A = \\begin{pmatrix} 12 & 4 \\\\ -4 & 4 \\end{pmatrix}, \\quad 4I = \\begin{pmatrix} 4 & 0 \\\\ 0 & 4 \\end{pmatrix}\\]
                        \\[A^2 - 4A + 4I = \\begin{pmatrix} 8-12+4 & 4-4+0 \\\\ -4+4+0 & 0-4+4 \\end{pmatrix} = \\begin{pmatrix} 0 & 0 \\\\ 0 & 0 \\end{pmatrix} \\checkmark\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.33 (Computing Matrix Inverses)</div>
                    <div class="env-body">
                        <p>If \\(A\\) is invertible and \\(\\chi_A(x) = x^n + c_{n-1}x^{n-1} + \\cdots + c_1 x + c_0\\), then</p>
                        \\[A^{-1} = -\\frac{1}{c_0}(A^{n-1} + c_{n-1}A^{n-2} + \\cdots + c_1 I)\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>By Cayley-Hamilton, \\(A^n + c_{n-1}A^{n-1} + \\cdots + c_1 A + c_0 I = 0\\). Factor out \\(A\\):</p>
                        \\[A(A^{n-1} + c_{n-1}A^{n-2} + \\cdots + c_1 I) = -c_0 I\\]
                        <p>Since \\(A\\) is invertible, \\(c_0 = \\det(A) \\neq 0\\), so we can divide by \\(-c_0\\) to get the result.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The Cayley-Hamilton theorem says that operators satisfy algebraic relations derived from their eigenvalues. It's a bridge between the geometric information (eigenvalues) and algebraic relations (polynomial equations). This allows us to express high powers \\(\\tau^k\\) for \\(k \\geq n\\) as linear combinations of \\(\\iota, \\tau, \\tau^2, \\ldots, \\tau^{n-1}\\), reducing infinite-dimensional problems to finite-dimensional ones.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 8.34 (Computing Matrix Powers)</div>
                    <div class="env-body">
                        <p>For \\(A = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}\\), we have \\(\\chi_A(x) = (x-1)^2 = x^2 - 2x + 1\\), so \\(A^2 = 2A - I\\). This gives us a recurrence: \\(A^{k+2} = 2A^{k+1} - A^k\\). Using \\(A^0 = I\\) and \\(A^1 = A\\), we can compute any power without direct matrix multiplication.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'cayley-hamilton-demo',
                    title: 'Interactive: Cayley-Hamilton Verification',
                    description: 'Watch the characteristic polynomial annihilate the matrix.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        let a = 3, b = 1, c = -1, d = 1;

                        const aSlider = VizEngine.createSlider(controls, 'a₁₁', -3, 3, 3, 0.5, draw);
                        const bSlider = VizEngine.createSlider(controls, 'a₁₂', -2, 2, 1, 0.5, draw);
                        const cSlider = VizEngine.createSlider(controls, 'a₂₁', -2, 2, -1, 0.5, draw);
                        const dSlider = VizEngine.createSlider(controls, 'a₂₂', -3, 3, 1, 0.5, draw);

                        function draw() {
                            a = parseFloat(aSlider.value);
                            b = parseFloat(bSlider.value);
                            c = parseFloat(cSlider.value);
                            d = parseFloat(dSlider.value);

                            viz.clear();

                            const A = [[a, b], [c, d]];

                            // Characteristic polynomial: x^2 - tr(A)x + det(A)
                            const tr = a + d;
                            const det = a * d - b * c;

                            viz.drawText('Matrix A:', -6, 6, viz.colors.white, 14, 'left');
                            viz.drawText(`[[${a.toFixed(1)}, ${b.toFixed(1)}]`, -6, 5.3, viz.colors.text, 11, 'left');
                            viz.drawText(` [${c.toFixed(1)}, ${d.toFixed(1)}]]`, -6, 4.8, viz.colors.text, 11, 'left');

                            viz.drawText('Characteristic polynomial:', -6, 4, viz.colors.orange, 12, 'left');
                            viz.drawText(`χ(x) = x² - ${tr.toFixed(2)}x + ${det.toFixed(2)}`, -6, 3.4, viz.colors.orange, 11, 'left');

                            // Compute A^2
                            const A2 = VizEngine.matMul(A, A);

                            viz.drawText('Compute χ(A):', -6, 2.5, viz.colors.blue, 12, 'left');
                            viz.drawText('A² =', -6, 1.9, viz.colors.text, 10, 'left');
                            viz.drawText(`[[${A2[0][0].toFixed(1)}, ${A2[0][1].toFixed(1)}]`, -5, 1.4, viz.colors.text, 10, 'left');
                            viz.drawText(` [${A2[1][0].toFixed(1)}, ${A2[1][1].toFixed(1)}]]`, -5, 0.9, viz.colors.text, 10, 'left');

                            // Compute χ(A) = A^2 - tr*A + det*I
                            const result = [
                                [A2[0][0] - tr*A[0][0] + det, A2[0][1] - tr*A[0][1]],
                                [A2[1][0] - tr*A[1][0], A2[1][1] - tr*A[1][1] + det]
                            ];

                            viz.drawText('χ(A) = A² - tr(A)·A + det(A)·I =', -6, 0.2, viz.colors.green, 11, 'left');
                            viz.drawText(`[[${result[0][0].toFixed(3)}, ${result[0][1].toFixed(3)}]`, -5, -0.4, viz.colors.green, 10, 'left');
                            viz.drawText(` [${result[1][0].toFixed(3)}, ${result[1][1].toFixed(3)}]]`, -5, -0.9, viz.colors.green, 10, 'left');

                            const isZero = Math.abs(result[0][0]) < 0.01 && Math.abs(result[0][1]) < 0.01 &&
                                          Math.abs(result[1][0]) < 0.01 && Math.abs(result[1][1]) < 0.01;

                            if (isZero) {
                                viz.drawText('✓ χ(A) = 0  (Cayley-Hamilton verified!)', -6, -1.7, viz.colors.green, 13, 'left');
                            } else {
                                viz.drawText('Numerical error (should be ≈ 0)', -6, -1.7, viz.colors.yellow, 11, 'left');
                            }

                            // Show eigenvalues
                            const eigenvals = VizEngine.eigenvalues2(A);
                            if (eigenvals && eigenvals.every(lam => Math.abs(lam.imag || 0) < 0.01)) {
                                const l1 = eigenvals[0].real || eigenvals[0];
                                const l2 = eigenvals[1].real || eigenvals[1];
                                viz.drawText(`Eigenvalues: λ₁=${l1.toFixed(2)}, λ₂=${l2.toFixed(2)}`, 0, -3, viz.colors.purple, 11, 'left');
                            } else {
                                viz.drawText('Complex eigenvalues', 0, -3, viz.colors.purple, 11, 'left');
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the Cayley-Hamilton theorem to find \\(A^{-1}\\) for \\(A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}\\) without computing the adjugate.',
                    hint: 'First find \\(\\chi_A(x)\\), then use \\(\\chi_A(A) = 0\\) to solve for \\(A^{-1}\\).',
                    solution: '\\(\\chi_A(x) = (x-2)^2 - 1 = x^2 - 4x + 3\\). So \\(A^2 - 4A + 3I = 0\\), giving \\(A(A - 4I) = -3I\\), hence \\(A^{-1} = -\\frac{1}{3}(A - 4I) = \\frac{1}{3}\\begin{pmatrix} 2 & -1 \\\\ -1 & 2 \\end{pmatrix}\\).'
                },
                {
                    question: 'Show that for any \\(n \\times n\\) matrix \\(A\\), the matrices \\(I, A, A^2, \\ldots, A^n\\) are linearly dependent.',
                    hint: 'Use Cayley-Hamilton.',
                    solution: 'By Cayley-Hamilton, \\(A^n + c_{n-1}A^{n-1} + \\cdots + c_1 A + c_0 I = 0\\), which is a nontrivial linear combination of \\(I, A, \\ldots, A^n\\) equal to zero. Thus these \\(n+1\\) matrices are linearly dependent.'
                },
                {
                    question: 'For a nilpotent matrix \\(N\\) (i.e., \\(N^k = 0\\) for some \\(k\\)), what can you say about its characteristic polynomial using Cayley-Hamilton?',
                    hint: 'What are the eigenvalues of a nilpotent matrix?',
                    solution: 'A nilpotent matrix has only 0 as an eigenvalue, so \\(\\chi_N(x) = x^n\\). By Cayley-Hamilton, \\(N^n = 0\\). Moreover, the minimal polynomial is \\(m_N(x) = x^k\\) where \\(k\\) is the index of nilpotence (smallest \\(k\\) with \\(N^k = 0\\)), and \\(k \\leq n\\).'
                }
            ]
        },
        {
            id: 'ch08-sec07',
            title: 'Applications and Spectral Theory',
            content: `
                <h2>Applications and Spectral Theory</h2>

                <p>The theory of eigenvalues has profound applications across mathematics, physics, engineering, and data science. We conclude with spectral resolutions and key applications.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 8.35 (Spectral Resolution)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau\\) be a diagonalizable operator with distinct eigenvalues \\(\\lambda_1, \\ldots, \\lambda_k\\). A <strong>spectral resolution</strong> of \\(\\tau\\) is a representation</p>
                        \\[\\tau = \\lambda_1 \\pi_1 + \\lambda_2 \\pi_2 + \\cdots + \\lambda_k \\pi_k\\]
                        <p>where \\(\\pi_i\\) is the projection onto \\(E_{\\lambda_i}\\) along \\(\\bigoplus_{j \\neq i} E_{\\lambda_j}\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.36 (Properties of Spectral Projections)</div>
                    <div class="env-body">
                        <p>The spectral projections \\(\\pi_i\\) satisfy:</p>
                        <ol>
                            <li>\\(\\pi_i^2 = \\pi_i\\) (idempotent)</li>
                            <li>\\(\\pi_i \\pi_j = 0\\) for \\(i \\neq j\\) (orthogonal)</li>
                            <li>\\(\\pi_1 + \\pi_2 + \\cdots + \\pi_k = \\iota\\) (resolution of identity)</li>
                            <li>\\(\\pi_i \\tau = \\tau \\pi_i = \\lambda_i \\pi_i\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.37 (Spectral Mapping Theorem)</div>
                    <div class="env-body">
                        <p>If \\(\\tau\\) has spectrum \\(\\{\\lambda_1, \\ldots, \\lambda_k\\}\\) and \\(p(x) \\in F[x]\\), then</p>
                        \\[\\operatorname{spec}(p(\\tau)) = \\{p(\\lambda_1), \\ldots, p(\\lambda_k)\\}\\]
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 8.38 (Differential Equations)</div>
                    <div class="env-body">
                        <p>Consider the system of ODEs \\(\\mathbf{x}'(t) = A\\mathbf{x}(t)\\) where \\(A\\) is diagonalizable with eigenvalues \\(\\lambda_i\\) and eigenvectors \\(v_i\\). The general solution is</p>
                        \\[\\mathbf{x}(t) = c_1 e^{\\lambda_1 t} v_1 + c_2 e^{\\lambda_2 t} v_2 + \\cdots + c_n e^{\\lambda_n t} v_n\\]
                        <p>The eigenvalues determine the system's stability: if all \\(\\operatorname{Re}(\\lambda_i) < 0\\), the system is asymptotically stable.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 8.39 (Markov Chains)</div>
                    <div class="env-body">
                        <p>A stochastic matrix \\(P\\) (columns sum to 1) always has \\(\\lambda = 1\\) as an eigenvalue. The corresponding eigenvector gives the steady-state distribution. For large \\(n\\), \\(P^n\\) converges to a matrix of repeated steady-state columns.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 8.40 (Principal Component Analysis)</div>
                    <div class="env-body">
                        <p>In PCA, we diagonalize the covariance matrix \\(\\Sigma\\) of data. The eigenvectors are the principal components (directions of maximum variance), and eigenvalues measure the variance along each component. Keeping the top \\(k\\) eigenvectors gives optimal rank-\\(k\\) approximation.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="spectral-resolution"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 8.41 (Perron-Frobenius Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(A\\) be a positive matrix (all entries \\(> 0\\)). Then:</p>
                        <ol>
                            <li>\\(A\\) has a positive real eigenvalue \\(\\lambda_{\\max}\\) that is strictly larger than the absolute value of any other eigenvalue</li>
                            <li>The eigenvector corresponding to \\(\\lambda_{\\max}\\) can be chosen to have all positive entries</li>
                            <li>The eigenvalue \\(\\lambda_{\\max}\\) has algebraic and geometric multiplicity 1</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 8.42 (Google PageRank)</div>
                    <div class="env-body">
                        <p>The PageRank algorithm models the web as a Markov chain. The PageRank vector is the dominant eigenvector (eigenvalue 1) of the modified adjacency matrix. By Perron-Frobenius, this eigenvector is unique and has positive entries, giving each page a positive rank.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Spectral theory extends far beyond finite dimensions. In infinite-dimensional Hilbert spaces, the spectrum generalizes to include continuous spectra (e.g., position and momentum operators in quantum mechanics). The spectral theorem for self-adjoint operators is a cornerstone of functional analysis and quantum theory.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Why Eigenvalues Matter</div>
                    <div class="env-body">
                        <p>Eigenvalues and eigenvectors reveal the "natural modes" of a linear system. In mechanical systems, they correspond to resonant frequencies and mode shapes. In data analysis, they identify principal directions of variation. In dynamical systems, they determine stability and long-term behavior. Understanding eigenstructure is understanding the essence of a linear transformation.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'spectral-resolution',
                    title: 'Interactive: Spectral Resolution',
                    description: 'Decompose operators into eigenspace projections.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 60});

                        let showProjections = false;

                        VizEngine.createButton(controls, 'Toggle Projections', () => {
                            showProjections = !showProjections;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            // Diagonalizable matrix
                            const A = [[3, 1], [1, 3]];
                            const lambda1 = 4, lambda2 = 2;
                            const v1 = [1/Math.sqrt(2), 1/Math.sqrt(2)];
                            const v2 = [1/Math.sqrt(2), -1/Math.sqrt(2)];

                            viz.drawText('A = λ₁π₁ + λ₂π₂', -6, 5.5, viz.colors.white, 14, 'left');
                            viz.drawText('λ₁=4, λ₂=2', -6, 4.8, viz.colors.text, 11, 'left');

                            // Draw eigenspaces
                            viz.drawVector(0, 0, v1[0]*2, v1[1]*2, viz.colors.orange, 'E₁', 3);
                            viz.drawVector(0, 0, -v1[0]*2, -v1[1]*2, viz.colors.orange, null, 3);
                            viz.drawVector(0, 0, v2[0]*2, v2[1]*2, viz.colors.purple, 'E₂', 3);
                            viz.drawVector(0, 0, -v2[0]*2, -v2[1]*2, viz.colors.purple, null, 3);

                            // Draw a test vector
                            const testVec = [1.5, 0.8];
                            viz.drawVector(0, 0, testVec[0], testVec[1], viz.colors.blue, 'v', 2);

                            if (showProjections) {
                                // Project onto each eigenspace
                                const proj1 = VizEngine.proj(testVec, v1);
                                const proj2 = VizEngine.proj(testVec, v2);

                                viz.drawVector(0, 0, proj1[0], proj1[1], viz.colors.orange + 'aa', 'π₁(v)', 2);
                                viz.drawVector(0, 0, proj2[0], proj2[1], viz.colors.purple + 'aa', 'π₂(v)', 2);

                                // Show: v = π₁(v) + π₂(v)
                                viz.drawText('v = π₁(v) + π₂(v)', -6, 3.8, viz.colors.green, 11, 'left');

                                // Show: A(v) = 4π₁(v) + 2π₂(v)
                                const Av = VizEngine.matVec(A, testVec);
                                viz.drawVector(0, 0, Av[0], Av[1], viz.colors.teal, 'Av', 3);

                                const lambda1Proj1 = [lambda1 * proj1[0], lambda1 * proj1[1]];
                                const lambda2Proj2 = [lambda2 * proj2[0], lambda2 * proj2[1]];

                                viz.drawVector(0, 0, lambda1Proj1[0], lambda1Proj1[1],
                                             viz.colors.orange + '66', '4π₁(v)', 2);
                                viz.drawVector(0, 0, lambda2Proj2[0], lambda2Proj2[1],
                                             viz.colors.purple + '66', '2π₂(v)', 2);

                                viz.drawText('Av = 4π₁(v) + 2π₂(v)', -6, 3.1, viz.colors.teal, 11, 'left');
                            } else {
                                // Just show transformation
                                const Av = VizEngine.matVec(A, testVec);
                                viz.drawVector(0, 0, Av[0], Av[1], viz.colors.teal, 'Av', 3);

                                viz.drawText('Click to see spectral decomposition', -6, 3.5, viz.colors.yellow, 11, 'left');
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that if \\(\\tau\\) has spectral resolution \\(\\tau = \\sum \\lambda_i \\pi_i\\), then \\(\\tau^k = \\sum \\lambda_i^k \\pi_i\\) for any positive integer \\(k\\).',
                    hint: 'Use the fact that \\(\\pi_i \\pi_j = \\delta_{ij} \\pi_i\\) and expand \\(\\tau^k\\).',
                    solution: '\\(\\tau^k = (\\sum \\lambda_i \\pi_i)^k = \\sum_{i_1,\\ldots,i_k} \\lambda_{i_1} \\cdots \\lambda_{i_k} \\pi_{i_1} \\cdots \\pi_{i_k}\\). Since \\(\\pi_i \\pi_j = 0\\) for \\(i \\neq j\\) and \\(\\pi_i^2 = \\pi_i\\), only terms with all indices equal survive: \\(\\tau^k = \\sum \\lambda_i^k \\pi_i\\).'
                },
                {
                    question: 'For a stochastic matrix \\(P\\) (columns sum to 1, all entries \\(\\geq 0\\)), prove that 1 is always an eigenvalue.',
                    hint: 'Consider \\(P^T \\mathbf{1}\\) where \\(\\mathbf{1} = (1,1,\\ldots,1)^T\\).',
                    solution: 'Since columns of \\(P\\) sum to 1, rows of \\(P^T\\) sum to 1. Thus \\(P^T \\mathbf{1} = \\mathbf{1}\\), so \\(\\mathbf{1}\\) is an eigenvector of \\(P^T\\) with eigenvalue 1. Since \\(P\\) and \\(P^T\\) have the same eigenvalues, 1 is an eigenvalue of \\(P\\).'
                },
                {
                    question: 'In quantum mechanics, observables are represented by Hermitian operators. Explain why the eigenvalues of a Hermitian operator must be real (you may use the fact that \\(\\langle Av, v \\rangle\\) is real for all \\(v\\)).',
                    hint: 'If \\(Av = \\lambda v\\), compute \\(\\langle Av, v \\rangle\\) in terms of \\(\\lambda\\).',
                    solution: 'If \\(Av = \\lambda v\\), then \\(\\langle Av, v \\rangle = \\langle \\lambda v, v \\rangle = \\lambda \\langle v, v \\rangle\\). Since \\(A\\) is Hermitian, \\(\\langle Av, v \\rangle\\) is real. Also, \\(\\langle v, v \\rangle = \\|v\\|^2 > 0\\) for \\(v \\neq 0\\). Thus \\(\\lambda = \\frac{\\langle Av, v \\rangle}{\\langle v, v \\rangle}\\) is real.'
                }
            ]
        }
    ]
});
