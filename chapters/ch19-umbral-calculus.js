window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch19',
    number: 19,
    title: 'The Umbral Calculus',
    subtitle: 'Linear Algebra on the Polynomial Ring',
    sections: [
        {
            id: 'ch19-sec01',
            title: 'The Umbral Algebra and Polynomial Sequences',
            content: `
                <h2>The Umbral Algebra and Polynomial Sequences</h2>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The umbral calculus is a remarkable bridge between linear algebra and the study of polynomial sequences. The key insight is that the polynomial ring \\(\\mathbb{F}[x]\\) can be viewed as an infinite-dimensional vector space, and many classical polynomial sequences (Hermite, Laguerre, Bernoulli, etc.) can be understood through the lens of linear operators, dual spaces, and functional analysis.</p>
                        <p>The name "umbral" (from Latin <em>umbra</em> = shadow) refers to the historical practice of manipulating polynomial sequences as if their subscripts were exponents—a formal technique that works "in the shadows" without rigorous justification. The modern umbral calculus makes this rigorous using the machinery of linear algebra.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.1 (The Polynomial Ring)</div>
                    <div class="env-body">
                        <p>Let \\(\\mathbb{F}\\) be a field of characteristic zero. The <strong>polynomial ring</strong> \\(\\mathcal{P} = \\mathbb{F}[x]\\) is the vector space of all polynomials over \\(\\mathbb{F}\\) with the standard operations of polynomial addition and scalar multiplication.</p>
                        <p>The ring \\(\\mathcal{P}\\) has a natural basis \\(\\{1, x, x^2, x^3, \\ldots\\}\\), making it an infinite-dimensional vector space over \\(\\mathbb{F}\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.2 (The Umbral Algebra)</div>
                    <div class="env-body">
                        <p>The <strong>umbral algebra</strong> \\(\\mathcal{U}\\) is the algebra of all formal power series in a single variable \\(t\\):</p>
                        \\[\\mathcal{U} = \\mathbb{F}[[t]] = \\left\\{\\sum_{n=0}^{\\infty} a_n t^n : a_n \\in \\mathbb{F}\\right\\}\\]
                        <p>The umbral algebra plays three equivalent roles:</p>
                        <ul>
                            <li>As the algebra of formal power series in \\(t\\)</li>
                            <li>As the dual space \\(\\mathcal{P}^* = \\operatorname{Hom}(\\mathcal{P}, \\mathbb{F})\\) of linear functionals on \\(\\mathcal{P}\\)</li>
                            <li>As the algebra of all shift-invariant linear operators on \\(\\mathcal{P}\\) that commute with the derivative</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.3 (Evaluation Functional)</div>
                    <div class="env-body">
                        <p>For a formal power series \\(\\phi(t) = \\sum_{n=0}^{\\infty} a_n t^n \\in \\mathcal{U}\\) and polynomial \\(p(x) = \\sum_{k=0}^{m} c_k x^k \\in \\mathcal{P}\\), the <strong>evaluation</strong> of \\(\\phi\\) at \\(p\\) is:</p>
                        \\[\\langle \\phi(t) | p(x) \\rangle = \\sum_{n=0}^{\\infty} a_n c_n\\]
                        <p>(This is a finite sum since \\(p(x)\\) has finite degree.) This pairing identifies \\(\\mathcal{U}\\) with the algebraic dual \\(\\mathcal{P}^*\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 19.1 (Basic Functionals)</div>
                    <div class="env-body">
                        <p>Consider the evaluation at \\(x = a\\):</p>
                        \\[e^{at} \\leftrightarrow \\varepsilon_a \\quad \\text{where} \\quad \\langle e^{at} | p(x) \\rangle = p(a)\\]
                        <p>Indeed, if \\(p(x) = \\sum c_k x^k\\), then:</p>
                        \\[\\langle e^{at} | p(x) \\rangle = \\left\\langle \\sum_{n=0}^{\\infty} \\frac{a^n}{n!} t^n \\mid \\sum_{k=0}^{m} c_k x^k \\right\\rangle = \\sum_{k=0}^{m} c_k \\frac{a^k}{k!} \\cdot k! = \\sum_{k=0}^{m} c_k a^k = p(a)\\]
                        <p>The derivative functional corresponds to \\(t\\):</p>
                        \\[\\langle t | p(x) \\rangle = p'(0)\\]
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.4 (Order of a Series)</div>
                    <div class="env-body">
                        <p>For \\(\\phi(t) = \\sum_{n=0}^{\\infty} a_n t^n \\in \\mathcal{U}\\), the <strong>order</strong> is:</p>
                        \\[o(\\phi) = \\min\\{n : a_n \\neq 0\\}\\]
                        <p>We define \\(o(0) = \\infty\\). Key properties:</p>
                        <ul>
                            <li>\\(o(\\phi + \\psi) \\geq \\min\\{o(\\phi), o(\\psi)\\}\\)</li>
                            <li>\\(o(\\phi \\cdot \\psi) = o(\\phi) + o(\\psi)\\)</li>
                            <li>\\(\\phi\\) is invertible in \\(\\mathcal{U}\\) if and only if \\(o(\\phi) = 0\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.5 (Delta Series and Delta Operators)</div>
                    <div class="env-body">
                        <p>A series \\(\\phi(t) \\in \\mathcal{U}\\) is a <strong>delta series</strong> if \\(o(\\phi) = 1\\), that is:</p>
                        \\[\\phi(t) = \\phi_1 t + \\phi_2 t^2 + \\cdots \\quad \\text{with } \\phi_1 \\neq 0\\]
                        <p>Equivalently, as a functional on \\(\\mathcal{P}\\), \\(\\phi\\) is a delta functional if:</p>
                        <ul>
                            <li>\\(\\langle \\phi | 1 \\rangle = 0\\)</li>
                            <li>\\(\\langle \\phi | x \\rangle \\neq 0\\)</li>
                        </ul>
                        <p>The corresponding linear operator \\(Q: \\mathcal{P} \\to \\mathcal{P}\\) is called a <strong>delta operator</strong>.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 19.2 (Classical Delta Operators)</div>
                    <div class="env-body">
                        <p><strong>1. The derivative:</strong> \\(D = \\frac{d}{dx}\\) corresponds to the series \\(\\phi(t) = t\\).</p>
                        <p><strong>2. Forward difference:</strong> \\(\\Delta f(x) = f(x+1) - f(x)\\) corresponds to \\(\\phi(t) = e^t - 1\\).</p>
                        <p><strong>3. Abel operator:</strong> \\(A f(x) = x f'(x)\\) corresponds to \\(\\phi(t) = t e^t\\).</p>
                        <p>Each delta operator annihilates constants and acts nontrivially on \\(x\\), making them the "generalized derivatives" of the umbral calculus.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="polynomial-seq-viz"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.1 (Compositional Inverse)</div>
                    <div class="env-body">
                        <p>Every delta series \\(\\phi(t)\\) has a unique <strong>compositional inverse</strong> \\(\\bar{\\phi}(t)\\) such that:</p>
                        \\[\\phi(\\bar{\\phi}(t)) = \\bar{\\phi}(\\phi(t)) = t\\]
                        <p>Moreover, \\(\\bar{\\phi}\\) is also a delta series.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Write \\(\\phi(t) = a_1 t + a_2 t^2 + \\cdots\\) with \\(a_1 \\neq 0\\). Seek \\(\\bar{\\phi}(t) = b_1 t + b_2 t^2 + \\cdots\\) satisfying \\(\\phi(\\bar{\\phi}(t)) = t\\).</p>
                        <p>Equating coefficients:</p>
                        \\[a_1(b_1 t + b_2 t^2 + \\cdots) + a_2(b_1 t + b_2 t^2 + \\cdots)^2 + \\cdots = t\\]
                        <p>Coefficient of \\(t\\): \\(a_1 b_1 = 1 \\Rightarrow b_1 = a_1^{-1}\\).</p>
                        <p>Coefficient of \\(t^n\\) (\\(n \\geq 2\\)): determines \\(b_n\\) uniquely in terms of \\(b_1, \\ldots, b_{n-1}\\) and the \\(a_i\\).</p>
                        <p>By induction, all \\(b_n\\) are uniquely determined, giving the compositional inverse.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'polynomial-seq-viz',
                    title: 'Interactive: Polynomial Sequence Plotter',
                    description: 'Plot members of a polynomial sequence and observe their orthogonality properties. Select different sequences: powers, lower factorials, Hermite, Laguerre.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 700, height: 450, scale: 60});

                        // Create controls
                        const seqSelect = document.createElement('select');
                        seqSelect.innerHTML = `
                            <option value="powers">Powers: x^n</option>
                            <option value="lower">Lower Factorials: x(x-1)...(x-n+1)</option>
                            <option value="hermite">Hermite Polynomials</option>
                            <option value="laguerre">Laguerre Polynomials</option>
                        `;
                        controls.appendChild(document.createTextNode('Sequence: '));
                        controls.appendChild(seqSelect);

                        const degreeSlider = VizEngine.createSlider(controls, 'Degree n', 0, 5, 2, 1, draw);

                        const infoDiv = document.createElement('div');
                        infoDiv.style.marginTop = '10px';
                        infoDiv.style.fontFamily = 'monospace';
                        infoDiv.style.fontSize = '13px';
                        controls.appendChild(infoDiv);

                        seqSelect.addEventListener('change', draw);

                        function powers(n, x) {
                            return Math.pow(x, n);
                        }

                        function lowerFactorial(n, x) {
                            let result = 1;
                            for (let k = 0; k < n; k++) {
                                result *= (x - k);
                            }
                            return result;
                        }

                        function hermite(n, x) {
                            // Physicist's Hermite polynomials H_n(x)
                            if (n === 0) return 1;
                            if (n === 1) return 2*x;
                            if (n === 2) return 4*x*x - 2;
                            if (n === 3) return 8*x*x*x - 12*x;
                            if (n === 4) return 16*x*x*x*x - 48*x*x + 12;
                            if (n === 5) return 32*Math.pow(x,5) - 160*Math.pow(x,3) + 120*x;
                            return 0;
                        }

                        function laguerre(n, x) {
                            // Laguerre polynomials L_n(x)
                            if (n === 0) return 1;
                            if (n === 1) return 1 - x;
                            if (n === 2) return 1 - 2*x + x*x/2;
                            if (n === 3) return 1 - 3*x + 3*x*x/2 - x*x*x/6;
                            if (n === 4) return 1 - 4*x + 3*x*x - 2*x*x*x/3 + x*x*x*x/24;
                            if (n === 5) return 1 - 5*x + 5*x*x - 5*x*x*x/3 + 5*x*x*x*x/24 - Math.pow(x,5)/120;
                            return 0;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const seqType = seqSelect.value;
                            const n = parseInt(degreeSlider.value);

                            let func, name;
                            if (seqType === 'powers') {
                                func = (x) => powers(n, x);
                                name = `p_${n}(x) = x^${n}`;
                            } else if (seqType === 'lower') {
                                func = (x) => lowerFactorial(n, x);
                                name = `(x)_${n} = x(x-1)···(x-${n-1})`;
                            } else if (seqType === 'hermite') {
                                func = (x) => hermite(n, x);
                                name = `H_${n}(x)`;
                            } else {
                                func = (x) => laguerre(n, x);
                                name = `L_${n}(x)`;
                            }

                            // Plot the polynomial
                            const xMin = -4, xMax = 4;
                            const points = [];
                            for (let x = xMin; x <= xMax; x += 0.02) {
                                const y = func(x);
                                if (Math.abs(y) < 15) {
                                    points.push([x, y]);
                                }
                            }

                            for (let i = 0; i < points.length - 1; i++) {
                                viz.drawSegment(points[i][0], points[i][1],
                                              points[i+1][0], points[i+1][1],
                                              viz.colors.blue, 3);
                            }

                            // Mark roots
                            for (let x = xMin; x <= xMax; x += 0.05) {
                                const y1 = func(x);
                                const y2 = func(x + 0.05);
                                if (y1 * y2 <= 0 && Math.abs(y1) < 5) {
                                    viz.drawPoint(x, 0, viz.colors.orange, null, 6);
                                }
                            }

                            infoDiv.innerHTML = `<strong>${name}</strong><br>Degree: ${n}<br>Roots visible in [-4, 4]`;
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that \\(\\phi(t) \\in \\mathcal{U}\\) is invertible if and only if \\(\\langle \\phi | 1 \\rangle \\neq 0\\).',
                    hint: 'Show that \\(\\phi\\) is invertible iff \\(o(\\phi) = 0\\), which means the constant term is nonzero.',
                    solution: 'If \\(\\phi(t) = a_0 + a_1 t + \\cdots\\), then \\(\\phi\\) has a multiplicative inverse \\(\\psi\\) with \\(\\phi \\cdot \\psi = 1\\) iff \\(a_0 \\neq 0\\). But \\(\\langle \\phi | 1 \\rangle = a_0\\) by definition of the evaluation functional. Thus \\(\\phi\\) is invertible iff \\(\\langle \\phi | 1 \\rangle \\neq 0\\).'
                },
                {
                    question: 'Show that the forward difference operator \\(\\Delta f(x) = f(x+1) - f(x)\\) corresponds to the delta series \\(e^t - 1\\) and verify that \\(\\Delta(x^n) = (x+1)^n - x^n\\).',
                    hint: 'Use the shift operator \\(E f(x) = f(x+1)\\) which corresponds to \\(e^t\\), so \\(\\Delta = E - I\\).',
                    solution: 'The shift operator \\(E: f(x) \\mapsto f(x+1)\\) has the series representation \\(e^t\\) because \\(\\langle e^t | x^n \\rangle = (1+0)^n = 1\\) matches \\(E(x^n)|_{x=0} = 1\\). Thus \\(\\Delta = E - I\\) corresponds to \\(e^t - 1\\). For \\(\\Delta(x^n) = (x+1)^n - x^n = \\sum_{k=0}^{n-1} \\binom{n}{k} x^k\\), which has order 1 as a delta operator should.'
                },
                {
                    question: 'Verify that the compositional inverse of \\(\\phi(t) = e^t - 1\\) is \\(\\bar{\\phi}(t) = \\log(1+t)\\).',
                    hint: 'Check that \\(e^{\\log(1+t)} - 1 = t\\) and \\(\\log(1 + (e^t - 1)) = t\\) as formal power series.',
                    solution: 'We have \\(e^{\\log(1+t)} = 1 + t\\), so \\(e^{\\log(1+t)} - 1 = t\\). Conversely, \\(\\log(1 + (e^t - 1)) = \\log(e^t) = t\\). Both compositions yield the identity, confirming that \\(\\log(1+t)\\) is the compositional inverse of \\(e^t - 1\\).'
                }
            ]
        },
        {
            id: 'ch19-sec02',
            title: 'Associated Sequences and the Shift Operator',
            content: `
                <h2>Associated Sequences and the Shift Operator</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.6 (Associated Sequence)</div>
                    <div class="env-body">
                        <p>Let \\(\\phi(t)\\) be a delta series. A polynomial sequence \\(\\{p_n(x)\\}_{n=0}^{\\infty}\\) with \\(\\deg(p_n) = n\\) is the <strong>associated sequence</strong> for \\(\\phi\\) if it satisfies the <strong>orthogonality conditions</strong>:</p>
                        \\[\\langle \\phi^k | p_n(x) \\rangle = n! \\cdot \\delta_{n,k}\\]
                        <p>where \\(\\delta_{n,k}\\) is the Kronecker delta. Equivalently:</p>
                        <ul>
                            <li>\\(\\langle \\phi^k | p_n \\rangle = 0\\) for \\(k \\neq n\\)</li>
                            <li>\\(\\langle \\phi^n | p_n \\rangle = n!\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The associated sequence forms a "dual basis" to the sequence of powers \\(\\{\\phi^n\\}\\) in the umbral algebra. The orthogonality condition is analogous to \\(\\langle e_i, e_j \\rangle = \\delta_{ij}\\) for an orthonormal basis in finite dimensions, but with a factorial normalization.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.2 (Existence and Uniqueness)</div>
                    <div class="env-body">
                        <p>Every delta series \\(\\phi(t)\\) has a unique associated sequence \\(\\{p_n(x)\\}\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Sketch)</div>
                    <div class="env-body">
                        <p>We construct \\(p_n\\) by induction. Let \\(p_0(x) = 1\\) (clearly \\(\\langle \\phi^0 | 1 \\rangle = \\langle 1 | 1 \\rangle = 0! = 1\\)).</p>
                        <p>Suppose \\(p_0, \\ldots, p_{n-1}\\) are determined. Write \\(p_n(x) = x^n + \\text{lower degree terms}\\). The orthogonality \\(\\langle \\phi^k | p_n \\rangle = 0\\) for \\(k < n\\) gives \\(n\\) linear equations in the \\(n\\) unknown coefficients of the lower degree terms. The system has a unique solution because the \\(\\{p_k\\}_{k<n}\\) are linearly independent.</p>
                        <p>The normalization \\(\\langle \\phi^n | p_n \\rangle = n!\\) determines the leading coefficient.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 19.3 (Powers and Lower Factorials)</div>
                    <div class="env-body">
                        <p><strong>1. For \\(\\phi(t) = t\\) (the derivative):</strong> The associated sequence is \\(p_n(x) = x^n\\).</p>
                        <p>Verification: \\(\\langle t^k | x^n \\rangle = n! [t^n] t^k = n! \\delta_{n,k}\\).</p>
                        <p><strong>2. For \\(\\phi(t) = e^t - 1\\) (forward difference):</strong> The associated sequence is the <strong>lower factorial</strong>:</p>
                        \\[(x)_n = x(x-1)(x-2) \\cdots (x-n+1)\\]
                        <p>For \\(n = 0\\): \\((x)_0 = 1\\). For \\(n \\geq 1\\): \\((x)_n = x(x-1) \\cdots (x-n+1)\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.7 (Shift Operator)</div>
                    <div class="env-body">
                        <p>The <strong>shift operator</strong> \\(E_a: \\mathcal{P} \\to \\mathcal{P}\\) is defined by:</p>
                        \\[E_a f(x) = f(x + a)\\]
                        <p>For \\(a = 1\\), we write simply \\(E = E_1\\). In terms of the umbral algebra, \\(E_a\\) corresponds to the series \\(e^{at}\\):</p>
                        \\[\\langle e^{at} | p(x) \\rangle = p(a)\\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="shift-operator-viz"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.3 (Expansion Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(\\{p_n(x)\\}\\) be the associated sequence for the delta series \\(\\phi(t)\\), and let \\(\\psi(t)\\) be any series in \\(\\mathcal{U}\\). Then for any \\(f(x) \\in \\mathcal{P}\\):</p>
                        \\[\\psi(t) f(x) = \\sum_{n=0}^{\\infty} \\frac{\\langle \\psi(\\phi(t)) | p_n(x) \\rangle}{n!} p_n(x)\\]
                        <p>where \\(\\psi(t)\\) acts as a linear operator on \\(f(x)\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 19.4 (Taylor Expansion)</div>
                    <div class="env-body">
                        <p>Take \\(\\phi(t) = t\\) (so \\(p_n(x) = x^n\\)) and \\(\\psi(t) = e^{at}\\) (the shift operator). Then:</p>
                        \\[f(x + a) = \\sum_{n=0}^{\\infty} \\frac{\\langle e^{at} | x^n \\rangle}{n!} x^n = \\sum_{n=0}^{\\infty} \\frac{a^n}{n!} x^n\\]
                        <p>Wait, this is incorrect! The correct Taylor expansion is:</p>
                        \\[f(x + a) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(0) a^n}{n!} = E_a f(x)\\]
                        <p>The expansion theorem gives the abstract machinery behind Taylor's theorem.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.4 (Binomial Identity)</div>
                    <div class="env-body">
                        <p>A sequence \\(\\{p_n(x)\\}\\) is the associated sequence for a delta series \\(\\phi(t)\\) if and only if it satisfies the <strong>binomial identity</strong>:</p>
                        \\[p_n(x + y) = \\sum_{k=0}^{n} \\binom{n}{k} p_k(y) p_{n-k}(x)\\]
                        <p>Sequences satisfying this identity are called <strong>binomial type</strong>.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Idea)</div>
                    <div class="env-body">
                        <p>The binomial identity is equivalent to the operator equation \\(E_y p_n(x) = p_n(x + y)\\) expanding in terms of the basis \\(\\{p_k(x)\\}\\). The shift operator \\(E_y\\) commutes with the delta operator \\(Q\\) associated to \\(\\phi\\), and this commutation relation forces the binomial identity.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 19.5 (Binomial Theorem)</div>
                    <div class="env-body">
                        <p>For \\(p_n(x) = x^n\\), the binomial identity becomes the classical binomial theorem:</p>
                        \\[(x + y)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^k y^{n-k}\\]
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'shift-operator-viz',
                    title: 'Interactive: Shift Operator Action',
                    description: 'Visualize how the shift operator E_a transforms a polynomial. Drag the slider to change the shift amount a.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 700, height: 450, scale: 60});

                        const shiftSlider = VizEngine.createSlider(controls, 'Shift a', -2, 2, 0.5, 0.1, draw);

                        const polySelect = document.createElement('select');
                        polySelect.innerHTML = `
                            <option value="quadratic">Quadratic: x²</option>
                            <option value="cubic">Cubic: x³ - 2x</option>
                            <option value="quartic">Quartic: x⁴ - 4x²</option>
                        `;
                        controls.appendChild(document.createTextNode('Polynomial: '));
                        controls.appendChild(polySelect);
                        polySelect.addEventListener('change', draw);

                        const infoDiv = document.createElement('div');
                        infoDiv.style.marginTop = '10px';
                        infoDiv.style.fontFamily = 'monospace';
                        infoDiv.style.fontSize = '13px';
                        controls.appendChild(infoDiv);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const a = parseFloat(shiftSlider.value);
                            const polyType = polySelect.value;

                            let f, fname;
                            if (polyType === 'quadratic') {
                                f = (x) => x*x;
                                fname = 'x²';
                            } else if (polyType === 'cubic') {
                                f = (x) => x*x*x - 2*x;
                                fname = 'x³ - 2x';
                            } else {
                                f = (x) => x*x*x*x - 4*x*x;
                                fname = 'x⁴ - 4x²';
                            }

                            // Plot original function
                            const xMin = -3, xMax = 3;
                            for (let x = xMin; x <= xMax; x += 0.02) {
                                const y = f(x);
                                const nextY = f(x + 0.02);
                                if (Math.abs(y) < 8 && Math.abs(nextY) < 8) {
                                    viz.drawSegment(x, y, x + 0.02, nextY, viz.colors.blue, 2);
                                }
                            }

                            // Plot shifted function
                            for (let x = xMin; x <= xMax; x += 0.02) {
                                const y = f(x + a);
                                const nextY = f(x + 0.02 + a);
                                if (Math.abs(y) < 8 && Math.abs(nextY) < 8) {
                                    viz.drawSegment(x, y, x + 0.02, nextY, viz.colors.orange, 2);
                                }
                            }

                            // Draw vertical line at x = -a to show the shift
                            if (Math.abs(a) > 0.05) {
                                viz.drawSegment(-a, -8, -a, 8, viz.colors.green + '66', 2, true);
                            }

                            infoDiv.innerHTML = `
                                <span style="color: ${viz.colors.blue}">━━</span> f(x) = ${fname}<br>
                                <span style="color: ${viz.colors.orange}">━━</span> E<sub>${a.toFixed(1)}</sub> f(x) = f(x + ${a.toFixed(1)})<br>
                                <span style="color: ${viz.colors.green}">┊┊</span> Shift center at x = ${(-a).toFixed(1)}
                            `;
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that the lower factorial polynomials \\((x)_n = x(x-1) \\cdots (x-n+1)\\) satisfy the binomial identity \\((x+y)_n = \\sum_{k=0}^{n} \\binom{n}{k} (x)_k (y)_{n-k}\\).',
                    hint: 'This is the Vandermonde convolution formula. Use the generating function or prove directly by induction.',
                    solution: 'By definition, \\((x+y)_n = (x+y)(x+y-1) \\cdots (x+y-n+1)\\). Each factor \\((x+y-k)\\) can be partitioned into cases where the first \\(j\\) factors contribute \\(x\\) and the remaining contribute \\(y\\). This combinatorial argument yields the Vandermonde convolution, which is equivalent to the binomial identity for lower factorials.'
                },
                {
                    question: 'Show that if \\(Q\\) is a delta operator and \\(\\{p_n(x)\\}\\) is its associated sequence, then \\(Q p_n(x) = n p_{n-1}(x)\\).',
                    hint: 'Use the orthogonality conditions and the fact that \\(Q\\) has order 1.',
                    solution: 'Since \\(Q\\) is a delta operator, \\(Q p_n(x)\\) has degree \\(n-1\\). Write \\(Q p_n = \\sum_{k=0}^{n-1} c_k p_k\\). Apply \\(\\langle \\phi^k | - \\rangle\\) to both sides: \\(\\langle \\phi^{k+1} | p_n \\rangle = c_k k!\\). By orthogonality, this is zero unless \\(k = n-1\\), giving \\(c_{n-1} = n\\). Thus \\(Q p_n = n p_{n-1}\\).'
                },
                {
                    question: 'Compute the first few terms of the associated sequence for the Abel delta series \\(\\phi(t) = te^t\\).',
                    hint: 'These are the Abel polynomials \\(a_n(x) = x(x - n)^{n-1}\\).',
                    solution: 'The Abel polynomials are: \\(a_0(x) = 1\\), \\(a_1(x) = x\\), \\(a_2(x) = x(x-2)\\), \\(a_3(x) = x(x-3)^2\\), \\(a_4(x) = x(x-4)^3\\), etc. These satisfy the Abel identity and are orthogonal with respect to the functional \\((te^t)^k\\).'
                }
            ]
        },
        {
            id: 'ch19-sec03',
            title: 'Sheffer Sequences and Delta Operators',
            content: `
                <h2>Sheffer Sequences and Delta Operators</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.8 (Sheffer Sequence)</div>
                    <div class="env-body">
                        <p>A polynomial sequence \\(\\{s_n(x)\\}_{n=0}^{\\infty}\\) with \\(\\deg(s_n) = n\\) is a <strong>Sheffer sequence</strong> for the pair \\((g(t), \\phi(t))\\) if:</p>
                        <ul>
                            <li>\\(g(t)\\) is an invertible series (\\(g(0) \\neq 0\\))</li>
                            <li>\\(\\phi(t)\\) is a delta series</li>
                            <li>The generating function is:</li>
                        </ul>
                        \\[\\sum_{n=0}^{\\infty} s_n(x) \\frac{t^n}{n!} = \\frac{1}{g(t)} e^{x \\bar{\\phi}(t)}\\]
                        <p>where \\(\\bar{\\phi}(t)\\) is the compositional inverse of \\(\\phi(t)\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>When \\(g(t) = 1\\), Sheffer sequences reduce to associated sequences (also called sequences of <strong>binomial type</strong>). When \\(\\phi(t) = t\\), Sheffer sequences are called <strong>Appell sequences</strong>.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.9 (Delta Operator Characterization)</div>
                    <div class="env-body">
                        <p>Let \\(Q: \\mathcal{P} \\to \\mathcal{P}\\) be a linear operator. Then \\(Q\\) is a <strong>delta operator</strong> if:</p>
                        <ul>
                            <li>\\(Q\\) is shift-invariant: \\(Q(f(x+a)) = (Qf)(x+a)\\) for all \\(a \\in \\mathbb{F}\\)</li>
                            <li>\\(Q(1) = 0\\) (annihilates constants)</li>
                            <li>\\(Q(x) = c \\neq 0\\) (acts nontrivially on \\(x\\))</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.5 (Operator Characterization of Sheffer Sequences)</div>
                    <div class="env-body">
                        <p>A sequence \\(\\{s_n(x)\\}\\) is Sheffer for \\((g(t), \\phi(t))\\) if and only if there exists a delta operator \\(Q\\) such that:</p>
                        \\[Q s_n(x) = n s_{n-1}(x)\\]
                        <p>for all \\(n \\geq 1\\), and \\(s_0(x)\\) is a nonzero constant.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="delta-operator-viz"></div>

                <div class="env-block example">
                    <div class="env-title">Example 19.6 (Hermite Polynomials)</div>
                    <div class="env-body">
                        <p>The <strong>Hermite polynomials</strong> \\(H_n(x)\\) are the Sheffer sequence for \\((e^{t^2/2}, t)\\). They satisfy:</p>
                        \\[H_n(x) = (-1)^n e^{x^2/2} \\frac{d^n}{dx^n} e^{-x^2/2}\\]
                        <p>The first few are:</p>
                        \\[\\begin{align}
                        H_0(x) &= 1\\\\
                        H_1(x) &= x\\\\
                        H_2(x) &= x^2 - 1\\\\
                        H_3(x) &= x^3 - 3x\\\\
                        H_4(x) &= x^4 - 6x^2 + 3
                        \\end{align}\\]
                        <p>They satisfy the recurrence \\(H_{n+1}(x) = x H_n(x) - n H_{n-1}(x)\\) and the differential equation:</p>
                        \\[H_n''(x) - x H_n'(x) + n H_n(x) = 0\\]
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 19.7 (Laguerre Polynomials)</div>
                    <div class="env-body">
                        <p>The <strong>Laguerre polynomials</strong> \\(L_n(x)\\) are the Sheffer sequence for \\(\\left((1-t)^{-1}, \\frac{t}{1-t}\\right)\\). They have the generating function:</p>
                        \\[\\frac{1}{1-t} e^{-xt/(1-t)} = \\sum_{n=0}^{\\infty} L_n(x) t^n\\]
                        <p>Explicitly:</p>
                        \\[L_n(x) = \\sum_{k=0}^{n} \\binom{n}{k} \\frac{(-x)^k}{k!}\\]
                        <p>They satisfy the differential equation:</p>
                        \\[x L_n''(x) + (1-x) L_n'(x) + n L_n(x) = 0\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.6 (Sheffer Identity)</div>
                    <div class="env-body">
                        <p>A sequence \\(\\{s_n(x)\\}\\) is Sheffer for \\((g(t), \\phi(t))\\) if and only if there exists an associated sequence \\(\\{p_n(x)\\}\\) for \\(\\phi(t)\\) such that:</p>
                        \\[s_n(x + y) = \\sum_{k=0}^{n} \\binom{n}{k} p_k(y) s_{n-k}(x)\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Sketch)</div>
                    <div class="env-body">
                        <p>This follows from the generating function formula. The shift \\(x \\to x + y\\) in the exponential gives:</p>
                        \\[e^{(x+y)\\bar{\\phi}(t)} = e^{x\\bar{\\phi}(t)} e^{y\\bar{\\phi}(t)}\\]
                        <p>The first factor generates \\(\\{s_n(x)\\}\\) and the second factor generates \\(\\{p_n(y)\\}\\) (since \\(g(t)^{-1}\\) cancels out in the associated sequence). Multiplying the series and comparing coefficients yields the Sheffer identity.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.7 (Transfer Formula)</div>
                    <div class="env-body">
                        <p>If \\(\\{p_n(x)\\}\\) is the associated sequence for the delta series \\(\\phi(t)\\), then:</p>
                        \\[p_n(x) = \\phi'(t)^{-n-1} \\left(\\frac{t}{\\phi(t)}\\right)^n \\Big|_{t^n}\\]
                        <p>where \\(|_{t^n}\\) denotes extracting the coefficient of \\(t^n\\), and we compose with \\(x^k \\to x^{k-1}\\) repeatedly.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 19.8 (Bernoulli Polynomials)</div>
                    <div class="env-body">
                        <p>The <strong>Bernoulli polynomials</strong> \\(B_n(x)\\) are the Sheffer sequence for \\(\\left(\\frac{t}{e^t - 1}, t\\right)\\). They appear in the Euler-Maclaurin formula and number theory. The first few:</p>
                        \\[\\begin{align}
                        B_0(x) &= 1\\\\
                        B_1(x) &= x - \\frac{1}{2}\\\\
                        B_2(x) &= x^2 - x + \\frac{1}{6}\\\\
                        B_3(x) &= x^3 - \\frac{3}{2}x^2 + \\frac{1}{2}x
                        \\end{align}\\]
                        <p>The Bernoulli numbers are \\(B_n = B_n(0)\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'delta-operator-viz',
                    title: 'Interactive: Delta Operator vs Derivative',
                    description: 'Compare how the standard derivative D and the forward difference Δ act on polynomials. Both are delta operators!',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 700, height: 450, scale: 50});

                        const degreeSlider = VizEngine.createSlider(controls, 'Polynomial degree', 1, 4, 2, 1, draw);

                        const opSelect = document.createElement('select');
                        opSelect.innerHTML = `
                            <option value="derivative">Derivative D</option>
                            <option value="difference">Forward Difference Δ</option>
                            <option value="both">Both (compare)</option>
                        `;
                        controls.appendChild(document.createTextNode('Operator: '));
                        controls.appendChild(opSelect);
                        opSelect.addEventListener('change', draw);

                        const infoDiv = document.createElement('div');
                        infoDiv.style.marginTop = '10px';
                        infoDiv.style.fontFamily = 'monospace';
                        infoDiv.style.fontSize = '12px';
                        controls.appendChild(infoDiv);

                        function evalPoly(coeffs, x) {
                            let result = 0;
                            for (let i = coeffs.length - 1; i >= 0; i--) {
                                result = result * x + coeffs[i];
                            }
                            return result;
                        }

                        function derivative(coeffs) {
                            if (coeffs.length <= 1) return [0];
                            const result = [];
                            for (let i = 1; i < coeffs.length; i++) {
                                result.push(i * coeffs[i]);
                            }
                            return result;
                        }

                        function forwardDiff(coeffs) {
                            // Δf(x) = f(x+1) - f(x)
                            // Compute this symbolically
                            const n = coeffs.length;
                            const result = new Array(n).fill(0);

                            // f(x+1) using binomial expansion
                            for (let k = 0; k < n; k++) {
                                for (let j = 0; j <= k; j++) {
                                    const binom = factorial(k) / (factorial(j) * factorial(k-j));
                                    result[j] += coeffs[k] * binom;
                                }
                            }
                            // Subtract f(x)
                            for (let i = 0; i < n; i++) {
                                result[i] -= coeffs[i];
                            }

                            return result.slice(0, n-1);
                        }

                        function factorial(n) {
                            if (n <= 1) return 1;
                            let result = 1;
                            for (let i = 2; i <= n; i++) result *= i;
                            return result;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const n = parseInt(degreeSlider.value);
                            const opType = opSelect.value;

                            // Create a simple polynomial: x^n - (n-1)x
                            let coeffs = new Array(n+1).fill(0);
                            coeffs[n] = 1;
                            if (n >= 1) coeffs[1] = -(n-1);

                            const xMin = -4, xMax = 4;

                            // Plot original
                            if (opType === 'both' || opType === 'derivative' || opType === 'difference') {
                                for (let x = xMin; x <= xMax; x += 0.02) {
                                    const y = evalPoly(coeffs, x);
                                    const nextY = evalPoly(coeffs, x + 0.02);
                                    if (Math.abs(y) < 10 && Math.abs(nextY) < 10) {
                                        viz.drawSegment(x, y, x + 0.02, nextY, viz.colors.white + '66', 1.5);
                                    }
                                }
                            }

                            if (opType === 'derivative' || opType === 'both') {
                                const dCoeffs = derivative(coeffs);
                                for (let x = xMin; x <= xMax; x += 0.02) {
                                    const y = evalPoly(dCoeffs, x);
                                    const nextY = evalPoly(dCoeffs, x + 0.02);
                                    if (Math.abs(y) < 10 && Math.abs(nextY) < 10) {
                                        viz.drawSegment(x, y, x + 0.02, nextY, viz.colors.blue, 2.5);
                                    }
                                }
                            }

                            if (opType === 'difference' || opType === 'both') {
                                const deltaCoeffs = forwardDiff(coeffs);
                                for (let x = xMin; x <= xMax; x += 0.02) {
                                    const y = evalPoly(deltaCoeffs, x);
                                    const nextY = evalPoly(deltaCoeffs, x + 0.02);
                                    if (Math.abs(y) < 10 && Math.abs(nextY) < 10) {
                                        const color = opType === 'both' ? viz.colors.orange : viz.colors.orange;
                                        viz.drawSegment(x, y, x + 0.02, nextY, color, 2.5);
                                    }
                                }
                            }

                            let polyStr = '';
                            for (let i = coeffs.length - 1; i >= 0; i--) {
                                if (Math.abs(coeffs[i]) > 0.01) {
                                    const sign = coeffs[i] > 0 ? '+' : '';
                                    if (i === 0) polyStr += sign + coeffs[i].toFixed(1);
                                    else if (i === 1) polyStr += sign + coeffs[i].toFixed(1) + 'x';
                                    else polyStr += sign + coeffs[i].toFixed(1) + 'x^' + i;
                                }
                            }

                            infoDiv.innerHTML = `
                                f(x) = ${polyStr.replace(/\\+/g, ' + ').replace(/\\-/g, ' - ').trim()}<br>
                                ${opType === 'derivative' || opType === 'both' ? '<span style="color:' + viz.colors.blue + '">━━</span> Df(x)<br>' : ''}
                                ${opType === 'difference' || opType === 'both' ? '<span style="color:' + viz.colors.orange + '">━━</span> Δf(x) = f(x+1) - f(x)<br>' : ''}
                                <span style="color:' + viz.colors.white + '66">━━</span> f(x) (original)
                            `;
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that the Hermite polynomials \\(H_n(x)\\) satisfy \\(H_n\'\'(x) - xH_n\'(x) + nH_n(x) = 0\\).',
                    hint: 'Use the recurrence relation \\(H_{n+1}(x) = xH_n(x) - nH_{n-1}(x)\\) and differentiate.',
                    solution: 'Differentiate the recurrence \\(H_{n+1}(x) = xH_n(x) - nH_{n-1}(x)\\) to get \\(H_{n+1}\'(x) = H_n(x) + xH_n\'(x) - nH_{n-1}\'(x)\\). Differentiate again and use the recurrence to eliminate \\(H_{n+1}\'\'\\) and \\(H_{n-1}\\), yielding the differential equation.'
                },
                {
                    question: 'Show that every delta operator \\(Q\\) can be uniquely written as \\(Q = \\sum_{k=1}^{\\infty} a_k D^k\\) where \\(D\\) is the derivative and \\(a_1 \\neq 0\\).',
                    hint: 'Use the fact that \\(Q\\) commutes with shifts and expand in terms of the derivative basis.',
                    solution: 'Since \\(Q\\) is shift-invariant, it commutes with \\(E_a\\) for all \\(a\\). The derivative \\(D\\) generates the algebra of shift-invariant operators. Any such operator has a unique representation as a power series in \\(D\\). The condition \\(Q(1) = 0\\) forces the constant term to vanish, and \\(Q(x) \\neq 0\\) forces \\(a_1 \\neq 0\\).'
                },
                {
                    question: 'Prove that if \\(\\{s_n(x)\\}\\) is a Sheffer sequence for \\((g(t), \\phi(t))\\), then \\(s_0(x)\\) is a nonzero constant.',
                    hint: 'Use the generating function and examine the coefficient of \\(t^0\\).',
                    solution: 'From the generating function \\(\\sum s_n(x) t^n/n! = g(t)^{-1} e^{x\\bar{\\phi}(t)}\\), the \\(t^0\\) coefficient is \\(s_0(x) = g(0)^{-1}\\), which is a nonzero constant since \\(g(t)\\) is invertible.'
                }
            ]
        },
        {
            id: 'ch19-sec04',
            title: 'Umbral Composition and Operator Theory',
            content: `
                <h2>Umbral Composition and Operator Theory</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.10 (Umbral Operator)</div>
                    <div class="env-body">
                        <p>Let \\(\\{p_n(x)\\}\\) be the associated sequence for a delta series \\(\\phi(t)\\). The <strong>umbral operator</strong> \\(T_\\phi: \\mathcal{P} \\to \\mathcal{P}\\) is the unique linear operator defined by:</p>
                        \\[T_\\phi(x^n) = p_n(x)\\]
                        <p>Equivalently, \\(T_\\phi\\) sends the standard basis \\(\\{x^n\\}\\) to the associated sequence \\(\\{p_n(x)\\}\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.8 (Umbral Operators are Automorphisms)</div>
                    <div class="env-body">
                        <p>Every umbral operator \\(T_\\phi\\) is a vector space automorphism of \\(\\mathcal{P}\\). Moreover:</p>
                        <ul>
                            <li>The composition \\(T_\\phi \\circ T_\\psi\\) is an umbral operator</li>
                            <li>The inverse \\(T_\\phi^{-1}\\) is an umbral operator</li>
                            <li>The set of all umbral operators forms a group under composition</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Since \\(\\{p_n(x)\\}\\) is a basis for \\(\\mathcal{P}\\) (each \\(p_n\\) has degree \\(n\\)), the map \\(T_\\phi\\) is a bijection between bases, hence an automorphism.</p>
                        <p>For composition: If \\(T_\\phi(x^n) = p_n(x)\\) and \\(T_\\psi(x^n) = q_n(x)\\), then:</p>
                        \\[T_\\phi \\circ T_\\psi(x^n) = T_\\phi(q_n(x))\\]
                        <p>Since \\(q_n(x)\\) is the associated sequence for \\(\\psi\\), we can write \\(q_n(x) = x^n + \\text{lower}\\), and applying \\(T_\\phi\\) gives another associated sequence (for the composition \\(\\phi \\circ \\psi\\)).</p>
                        <p>The group axioms follow from the functoriality of composition.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.11 (Umbral Composition)</div>
                    <div class="env-body">
                        <p>Given two associated sequences \\(\\{p_n(x)\\}\\) for \\(\\phi(t)\\) and \\(\\{q_n(x)\\}\\) for \\(\\psi(t)\\), their <strong>umbral composition</strong> is:</p>
                        \\[p_n \\circ q(x) = \\sum_{k=0}^{n} c_{n,k} q_k(x)\\]
                        <p>where \\(p_n \\circ q\\) denotes the result of formally replacing \\(x^k\\) with \\(q_k(x)\\) in the expansion of \\(p_n\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="umbral-composition-viz"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.9 (Operator Adjoints)</div>
                    <div class="env-body">
                        <p>Let \\(T: \\mathcal{P} \\to \\mathcal{P}\\) be a linear operator. The <strong>operator adjoint</strong> \\(T^*: \\mathcal{U} \\to \\mathcal{U}\\) is defined by:</p>
                        \\[\\langle T^*\\phi | p \\rangle = \\langle \\phi | Tp \\rangle\\]
                        <p>for all \\(\\phi \\in \\mathcal{U}\\) and \\(p \\in \\mathcal{P}\\). Key properties:</p>
                        <ul>
                            <li>\\((S \\circ T)^* = T^* \\circ S^*\\)</li>
                            <li>\\((T^{-1})^* = (T^*)^{-1}\\) for invertible \\(T\\)</li>
                            <li>\\(T\\) is an umbral operator iff \\(T^*\\) is an automorphism of \\(\\mathcal{U}\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.10 (Umbral Shift Operator)</div>
                    <div class="env-body">
                        <p>For an associated sequence \\(\\{p_n(x)\\}\\), the <strong>umbral shift</strong> \\(S: \\mathcal{P} \\to \\mathcal{P}\\) is defined by:</p>
                        \\[S(p_n(x)) = p_{n+1}(x)\\]
                        <p>The adjoint \\(S^*\\) is a derivation on \\(\\mathcal{U}\\), i.e., \\(S^*(\\phi \\psi) = S^*(\\phi)\\psi + \\phi S^*(\\psi)\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Sketch)</div>
                    <div class="env-body">
                        <p>The umbral shift satisfies \\(S(p_n) = p_{n+1}\\). For the adjoint:</p>
                        \\[\\langle S^*\\phi | p_n \\rangle = \\langle \\phi | p_{n+1} \\rangle\\]
                        <p>This implies \\(S^*\\) acts by "lowering the index" in the dual basis. The derivation property follows from the product structure of \\(\\mathcal{U}\\) and the orthogonality of the associated sequence.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 19.9 (Stirling Numbers)</div>
                    <div class="env-body">
                        <p>The <strong>Stirling numbers of the second kind</strong> \\(S(n,k)\\) appear as the coefficients in the umbral composition of powers and lower factorials:</p>
                        \\[x^n = \\sum_{k=0}^{n} S(n,k) (x)_k\\]
                        <p>where \\((x)_k = x(x-1) \\cdots (x-k+1)\\). These numbers count partitions of a set of size \\(n\\) into \\(k\\) non-empty blocks.</p>
                        <p>The <strong>Stirling numbers of the first kind</strong> \\(s(n,k)\\) give the inverse transformation:</p>
                        \\[(x)_n = \\sum_{k=0}^{n} s(n,k) x^k\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.11 (Recurrence Formula)</div>
                    <div class="env-body">
                        <p>Let \\(\\{p_n(x)\\}\\) be the associated sequence for \\(\\phi(t)\\). Then:</p>
                        \\[p_{n+1}(x) = x \\cdot (\\phi'(t))^{-1} p_n(x)\\]
                        <p>where the operator \\((\\phi'(t))^{-1}\\) acts by formal inverse of the derivative of \\(\\phi\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 19.10 (Lower Factorial Recurrence)</div>
                    <div class="env-body">
                        <p>For \\(\\phi(t) = e^t - 1\\), we have \\(\\phi'(t) = e^t\\). The recurrence becomes:</p>
                        \\[(x)_{n+1} = x \\cdot e^{-t} (x)_n = x(x-n)\\]
                        <p>which gives the familiar formula \\((x)_{n+1} = x(x-1) \\cdots (x-n)\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'umbral-composition-viz',
                    title: 'Interactive: Umbral Composition',
                    description: 'Visualize the umbral composition of polynomial sequences. See how composing associated sequences creates new sequences.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 700, height: 500, scale: 50});

                        const seq1Select = document.createElement('select');
                        seq1Select.innerHTML = `
                            <option value="powers">Powers x^n</option>
                            <option value="lower">Lower Factorials (x)_n</option>
                        `;
                        controls.appendChild(document.createTextNode('Outer sequence: '));
                        controls.appendChild(seq1Select);
                        controls.appendChild(document.createElement('br'));

                        const seq2Select = document.createElement('select');
                        seq2Select.innerHTML = `
                            <option value="powers">Powers x^n</option>
                            <option value="lower">Lower Factorials (x)_n</option>
                        `;
                        controls.appendChild(document.createTextNode('Inner sequence: '));
                        controls.appendChild(seq2Select);

                        const nSlider = VizEngine.createSlider(controls, 'Degree n', 0, 4, 2, 1, draw);

                        seq1Select.addEventListener('change', draw);
                        seq2Select.addEventListener('change', draw);

                        const infoDiv = document.createElement('div');
                        infoDiv.style.marginTop = '10px';
                        infoDiv.style.fontFamily = 'monospace';
                        infoDiv.style.fontSize = '12px';
                        controls.appendChild(infoDiv);

                        function stirling2(n, k) {
                            // Stirling numbers of the second kind
                            if (n === 0 && k === 0) return 1;
                            if (n === 0 || k === 0) return 0;
                            if (k > n) return 0;

                            const S = Array(n+1).fill(0).map(() => Array(k+1).fill(0));
                            S[0][0] = 1;

                            for (let i = 1; i <= n; i++) {
                                for (let j = 1; j <= Math.min(i, k); j++) {
                                    S[i][j] = j * S[i-1][j] + S[i-1][j-1];
                                }
                            }
                            return S[n][k];
                        }

                        function lowerFactorial(n, x) {
                            let result = 1;
                            for (let k = 0; k < n; k++) {
                                result *= (x - k);
                            }
                            return result;
                        }

                        function evaluateComposition(seq1, seq2, n, x) {
                            if (seq1 === 'powers' && seq2 === 'powers') {
                                return Math.pow(x, n);
                            } else if (seq1 === 'powers' && seq2 === 'lower') {
                                return lowerFactorial(n, x);
                            } else if (seq1 === 'lower' && seq2 === 'powers') {
                                // (p)_n where p = x: use Stirling numbers
                                let sum = 0;
                                for (let k = 0; k <= n; k++) {
                                    sum += stirling2(n, k) * lowerFactorial(k, x);
                                }
                                return sum;
                            } else {
                                return lowerFactorial(n, x);
                            }
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const seq1 = seq1Select.value;
                            const seq2 = seq2Select.value;
                            const n = parseInt(nSlider.value);

                            // Plot composition
                            const xMin = -3, xMax = 5;
                            for (let x = xMin; x <= xMax; x += 0.02) {
                                const y = evaluateComposition(seq1, seq2, n, x);
                                const nextY = evaluateComposition(seq1, seq2, n, x + 0.02);
                                if (Math.abs(y) < 12 && Math.abs(nextY) < 12) {
                                    viz.drawSegment(x, y, x + 0.02, nextY, viz.colors.purple, 3);
                                }
                            }

                            // Show coefficients for Stirling case
                            let coeffInfo = '';
                            if (seq1 === 'lower' && seq2 === 'powers') {
                                coeffInfo = '<br>Stirling expansion: ' + n + '! S(' + n + ',k):<br>';
                                for (let k = 0; k <= n; k++) {
                                    const s = stirling2(n, k);
                                    if (s !== 0) {
                                        coeffInfo += 'S(' + n + ',' + k + ') = ' + s + '  ';
                                    }
                                }
                            }

                            const seq1Name = seq1 === 'powers' ? 'x^n' : '(x)_n';
                            const seq2Name = seq2 === 'powers' ? 'x^k' : '(x)_k';

                            infoDiv.innerHTML = `
                                <strong>Composition:</strong> ${seq1Name} ∘ ${seq2Name}<br>
                                Degree n = ${n}
                                ${coeffInfo}
                            `;
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that the set of umbral operators forms a group under composition.',
                    hint: 'Show closure, associativity, identity, and inverses. Use the fact that umbral operators are bijections between bases.',
                    solution: 'Closure: If \\(T_\\phi\\) and \\(T_\\psi\\) are umbral operators, then \\(T_\\phi \\circ T_\\psi\\) sends \\(x^n\\) to an associated sequence, hence is an umbral operator. Associativity is inherited from function composition. Identity: \\(T_t\\) where \\(\\phi(t) = t\\) is the identity. Inverses: \\(T_\\phi^{-1} = T_{\\bar{\\phi}}\\) where \\(\\bar{\\phi}\\) is the compositional inverse.'
                },
                {
                    question: 'Show that \\(S(n,k) = k \\cdot S(n-1,k) + S(n-1,k-1)\\) for Stirling numbers of the second kind.',
                    hint: 'Use the interpretation of \\(S(n,k)\\) as counting set partitions and consider where the element \\(n\\) is placed.',
                    solution: 'To partition \\(\\{1,2,\\ldots,n\\}\\) into \\(k\\) blocks, either: (1) element \\(n\\) is alone in a new block: \\(S(n-1,k-1)\\) ways, or (2) element \\(n\\) joins one of \\(k\\) existing blocks in a partition of \\(\\{1,\\ldots,n-1\\}\\): \\(k \\cdot S(n-1,k)\\) ways. Summing gives the recurrence.'
                },
                {
                    question: 'Verify that the adjoint of the derivative operator \\(D\\) acting on \\(\\mathcal{P}\\) is the multiplication operator \\(M_t: \\phi(t) \\mapsto t\\phi(t)\\) on \\(\\mathcal{U}\\).',
                    hint: 'Use the definition \\(\\langle D^*\\phi | p \\rangle = \\langle \\phi | Dp \\rangle\\) and compute explicitly.',
                    solution: 'For \\(p(x) = x^n\\), we have \\(Dp = nx^{n-1}\\). Thus \\(\\langle D^*\\phi | x^n \\rangle = \\langle \\phi | nx^{n-1} \\rangle = n[t^{n-1}]\\phi(t)\\). But \\(\\langle t\\phi(t) | x^n \\rangle = [t^n](t\\phi(t)) = [t^{n-1}]\\phi(t) \\cdot n\\). Hence \\(D^* = M_t\\).'
                }
            ]
        },
        {
            id: 'ch19-sec05',
            title: 'Generating Functions and Classical Sequences',
            content: `
                <h2>Generating Functions and Classical Sequences</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.12 (Generating Function)</div>
                    <div class="env-body">
                        <p>The <strong>generating function</strong> of a polynomial sequence \\(\\{p_n(x)\\}\\) is the formal power series:</p>
                        \\[G(x,t) = \\sum_{n=0}^{\\infty} p_n(x) \\frac{t^n}{n!}\\]
                        <p>For associated sequences, the generating function has the special form:</p>
                        \\[G(x,t) = e^{x\\bar{\\phi}(t)}\\]
                        <p>where \\(\\bar{\\phi}(t)\\) is the compositional inverse of the delta series \\(\\phi(t)\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.12 (Generating Function Characterization)</div>
                    <div class="env-body">
                        <p>A sequence \\(\\{p_n(x)\\}\\) is the associated sequence for \\(\\phi(t)\\) if and only if:</p>
                        \\[\\sum_{n=0}^{\\infty} p_n(x) \\frac{t^n}{n!} = e^{x\\bar{\\phi}(t)}\\]
                        <p>More generally, \\(\\{s_n(x)\\}\\) is Sheffer for \\((g(t), \\phi(t))\\) if and only if:</p>
                        \\[\\sum_{n=0}^{\\infty} s_n(x) \\frac{t^n}{n!} = \\frac{1}{g(t)} e^{x\\bar{\\phi}(t)}\\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="sheffer-explorer-viz"></div>

                <div class="env-block example">
                    <div class="env-title">Example 19.11 (Catalog of Classical Sequences)</div>
                    <div class="env-body">
                        <p><strong>1. Powers:</strong> \\(\\phi(t) = t\\), \\(p_n(x) = x^n\\)</p>
                        \\[\\sum_{n=0}^{\\infty} x^n \\frac{t^n}{n!} = e^{xt}\\]

                        <p><strong>2. Lower Factorials:</strong> \\(\\phi(t) = e^t - 1\\), \\(p_n(x) = (x)_n\\)</p>
                        \\[\\sum_{n=0}^{\\infty} (x)_n \\frac{t^n}{n!} = e^{x\\log(1+t)} = (1+t)^x\\]

                        <p><strong>3. Abel Polynomials:</strong> \\(\\phi(t) = te^t\\), \\(a_n(x) = x(x-n)^{n-1}\\)</p>
                        \\[\\sum_{n=0}^{\\infty} a_n(x) \\frac{t^n}{n!} = e^{x\\bar{\\phi}(t)}\\]
                        <p>where \\(\\bar{\\phi}(t) = W(t)\\) is the Lambert W function (\\(W(t)e^{W(t)} = t\\)).</p>

                        <p><strong>4. Hermite Polynomials:</strong> \\(g(t) = e^{t^2/2}\\), \\(\\phi(t) = t\\)</p>
                        \\[\\sum_{n=0}^{\\infty} H_n(x) \\frac{t^n}{n!} = e^{xt - t^2/2}\\]

                        <p><strong>5. Laguerre Polynomials:</strong> \\(g(t) = (1-t)^{-1}\\), \\(\\phi(t) = \\frac{t}{1-t}\\)</p>
                        \\[\\sum_{n=0}^{\\infty} L_n(x) t^n = \\frac{1}{1-t} e^{-xt/(1-t)}\\]

                        <p><strong>6. Bernoulli Polynomials:</strong> \\(g(t) = \\frac{t}{e^t-1}\\), \\(\\phi(t) = t\\)</p>
                        \\[\\sum_{n=0}^{\\infty} B_n(x) \\frac{t^n}{n!} = \\frac{t}{e^t - 1} e^{xt}\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.13 (Orthogonality and Generating Functions)</div>
                    <div class="env-body">
                        <p>If \\(G(x,t) = \\sum p_n(x) t^n/n!\\) is the generating function of \\(\\{p_n(x)\\}\\), then the orthogonality with respect to \\(\\phi(t)\\) can be expressed as:</p>
                        \\[\\left.\\frac{\\partial^k}{\\partial t^k} G(x,t)\\right|_{t=0} = p_k(x)\\]
                        <p>and the action of \\(\\phi^k\\) extracts the \\(k\\)-th coefficient.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 19.12 (Dobinski's Formula)</div>
                    <div class="env-body">
                        <p>The Bell number \\(B_n\\) (number of partitions of a set of size \\(n\\)) equals the \\(n\\)-th moment of a Poisson(1) distribution:</p>
                        \\[B_n = \\frac{1}{e} \\sum_{k=0}^{\\infty} \\frac{k^n}{k!}\\]
                        <p>This follows from the generating function of the exponential polynomials (inverse of lower factorials under umbral composition).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.14 (Rodrigues Formula)</div>
                    <div class="env-body">
                        <p>For many classical Sheffer sequences, there exists a <strong>Rodrigues formula</strong> of the form:</p>
                        \\[s_n(x) = \\frac{1}{w(x)} \\frac{d^n}{dx^n}[w(x) v(x)^n]\\]
                        <p>where \\(w(x)\\) is a weight function and \\(v(x)\\) is related to the generating function. For example:</p>
                        <ul>
                            <li>Hermite: \\(H_n(x) = (-1)^n e^{x^2/2} \\frac{d^n}{dx^n} e^{-x^2/2}\\)</li>
                            <li>Laguerre: \\(L_n(x) = \\frac{e^x}{n!} \\frac{d^n}{dx^n}(x^n e^{-x})\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Applications)</div>
                    <div class="env-body">
                        <p>The umbral calculus provides a unified framework for:</p>
                        <ul>
                            <li>Deriving recurrence relations for polynomial sequences</li>
                            <li>Computing connection coefficients between different bases</li>
                            <li>Solving differential and difference equations</li>
                            <li>Understanding combinatorial identities (Stirling numbers, Bell numbers, etc.)</li>
                            <li>Analyzing special functions in mathematical physics</li>
                        </ul>
                        <p>Modern extensions include q-analogs, logarithmic umbral calculus, and multivariate generalizations.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'sheffer-explorer-viz',
                    title: 'Interactive: Sheffer Sequence Explorer',
                    description: 'Explore different classical Sheffer sequences and their properties. Select a sequence to see its graph and generating function.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 700, height: 500, scale: 40});

                        const seqSelect = document.createElement('select');
                        seqSelect.innerHTML = `
                            <option value="hermite">Hermite Polynomials</option>
                            <option value="laguerre">Laguerre Polynomials</option>
                            <option value="bernoulli">Bernoulli Polynomials</option>
                            <option value="lower">Lower Factorials</option>
                            <option value="powers">Powers (baseline)</option>
                        `;
                        controls.appendChild(document.createTextNode('Sequence: '));
                        controls.appendChild(seqSelect);

                        const nSlider = VizEngine.createSlider(controls, 'Degree n', 0, 5, 2, 1, draw);

                        seqSelect.addEventListener('change', draw);

                        const infoDiv = document.createElement('div');
                        infoDiv.style.marginTop = '10px';
                        infoDiv.style.fontFamily = 'monospace';
                        infoDiv.style.fontSize = '11px';
                        infoDiv.style.lineHeight = '1.4';
                        controls.appendChild(infoDiv);

                        function hermite(n, x) {
                            if (n === 0) return 1;
                            if (n === 1) return x;
                            if (n === 2) return x*x - 1;
                            if (n === 3) return x*x*x - 3*x;
                            if (n === 4) return x*x*x*x - 6*x*x + 3;
                            if (n === 5) return Math.pow(x,5) - 10*Math.pow(x,3) + 15*x;
                            return 0;
                        }

                        function laguerre(n, x) {
                            if (n === 0) return 1;
                            if (n === 1) return 1 - x;
                            if (n === 2) return 1 - 2*x + x*x/2;
                            if (n === 3) return 1 - 3*x + 3*x*x/2 - x*x*x/6;
                            if (n === 4) return 1 - 4*x + 3*x*x - 2*x*x*x/3 + x*x*x*x/24;
                            if (n === 5) return 1 - 5*x + 5*x*x - 5*x*x*x/3 + 5*Math.pow(x,4)/24 - Math.pow(x,5)/120;
                            return 0;
                        }

                        function bernoulli(n, x) {
                            if (n === 0) return 1;
                            if (n === 1) return x - 0.5;
                            if (n === 2) return x*x - x + 1/6;
                            if (n === 3) return x*x*x - 1.5*x*x + 0.5*x;
                            if (n === 4) return Math.pow(x,4) - 2*Math.pow(x,3) + x*x - 1/30;
                            if (n === 5) return Math.pow(x,5) - 2.5*Math.pow(x,4) + 5/3*Math.pow(x,3) - 1/6*x;
                            return 0;
                        }

                        function lowerFact(n, x) {
                            let result = 1;
                            for (let k = 0; k < n; k++) {
                                result *= (x - k);
                            }
                            return result;
                        }

                        function powers(n, x) {
                            return Math.pow(x, n);
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const seqType = seqSelect.value;
                            const n = parseInt(nSlider.value);

                            let func, name, genFunc, deltaOp;

                            if (seqType === 'hermite') {
                                func = (x) => hermite(n, x);
                                name = 'H_' + n + '(x)';
                                genFunc = 'G(x,t) = exp(xt - t²/2)';
                                deltaOp = 'Q = D (derivative)';
                            } else if (seqType === 'laguerre') {
                                func = (x) => laguerre(n, x);
                                name = 'L_' + n + '(x)';
                                genFunc = 'G(x,t) = (1-t)⁻¹ exp(-xt/(1-t))';
                                deltaOp = 'Q f(x) = x f\'(x) + (1-x) f\'(x)';
                            } else if (seqType === 'bernoulli') {
                                func = (x) => bernoulli(n, x);
                                name = 'B_' + n + '(x)';
                                genFunc = 'G(x,t) = t/(eᵗ-1) · eˣᵗ';
                                deltaOp = 'Q = D (derivative)';
                            } else if (seqType === 'lower') {
                                func = (x) => lowerFact(n, x);
                                name = '(x)_' + n;
                                genFunc = 'G(x,t) = (1+t)ˣ';
                                deltaOp = 'Q = Δ (forward diff)';
                            } else {
                                func = (x) => powers(n, x);
                                name = 'x^' + n;
                                genFunc = 'G(x,t) = exp(xt)';
                                deltaOp = 'Q = D (derivative)';
                            }

                            // Determine plot range
                            let xMin = -4, xMax = 4;
                            if (seqType === 'laguerre') {
                                xMin = -1;
                                xMax = 6;
                            }

                            // Plot the polynomial
                            const yMax = 12;
                            for (let x = xMin; x <= xMax; x += 0.02) {
                                const y = func(x);
                                const nextY = func(x + 0.02);
                                if (Math.abs(y) < yMax && Math.abs(nextY) < yMax) {
                                    viz.drawSegment(x, y, x + 0.02, nextY, viz.colors.blue, 3);
                                }
                            }

                            // Mark zeros
                            for (let x = xMin; x <= xMax; x += 0.05) {
                                const y1 = func(x);
                                const y2 = func(x + 0.05);
                                if (y1 * y2 <= 0 && Math.abs(y1) < yMax * 0.8) {
                                    viz.drawPoint(x, 0, viz.colors.orange, null, 7);
                                }
                            }

                            infoDiv.innerHTML = `
                                <strong>${name}</strong> (degree ${n})<br>
                                ${genFunc}<br>
                                ${deltaOp}
                            `;
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify the generating function for Hermite polynomials: \\(\\sum_{n=0}^{\\infty} H_n(x) \\frac{t^n}{n!} = e^{xt - t^2/2}\\).',
                    hint: 'Use the Rodrigues formula or the recurrence relation to compute coefficients.',
                    solution: 'From the definition \\(H_n(x) = (-1)^n e^{x^2/2} D^n e^{-x^2/2}\\), we compute the generating function by summing. Alternatively, verify that \\(e^{xt - t^2/2}\\) satisfies the PDE \\(\\partial_t G = (x - t) \\partial_x G\\) and initial condition \\(G(x,0) = 1\\), which characterizes the Hermite generating function.'
                },
                {
                    question: 'Show that the Bernoulli numbers \\(B_n = B_n(0)\\) satisfy \\(\\sum_{k=0}^{n} \\binom{n+1}{k} B_k = 0\\) for \\(n \\geq 1\\).',
                    hint: 'Use the generating function \\(\\frac{t}{e^t - 1} = \\sum B_n t^n/n!\\) and compute \\((e^t - 1) \\cdot \\frac{t}{e^t-1}\\).',
                    solution: 'From \\(\\frac{t}{e^t-1} \\cdot e^t = \\frac{te^t}{e^t-1} = t + \\frac{t}{e^t-1}\\), we get \\(\\sum B_n t^n/n! \\cdot \\sum t^k/k! = t + \\sum B_n t^n/n!\\). Comparing coefficients of \\(t^{n+1}\\) gives the desired recursion.'
                },
                {
                    question: "Prove Dobinski's formula: \\(B_n = \\frac{1}{e} \\sum_{k=0}^{\\infty} \\frac{k^n}{k!}\\) where \\(B_n\\) is the \\(n\\)-th Bell number.",
                    hint: 'Use the generating function of Stirling numbers and the exponential function.',
                    solution: "The exponential generating function of Bell numbers is \\(\\sum B_n t^n/n! = e^{e^t - 1}\\). Expanding: \\(e^{e^t-1} = e^{-1} e^{e^t} = e^{-1} \\sum_{k=0}^{\\infty} \\frac{(e^t)^k}{k!} = e^{-1} \\sum_{k=0}^{\\infty} \\frac{1}{k!} \\sum_{n=0}^{\\infty} k^n \\frac{t^n}{n!}\\). Comparing coefficients yields Dobinski's formula."
                }
            ]
        }
    ]
});
