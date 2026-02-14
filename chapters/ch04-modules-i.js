window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch04',
    number: 4,
    title: 'Modules I: Basic Properties',
    subtitle: 'Generalizing vector spaces to modules over rings',
    sections: [
        {
            id: 'ch04-sec01',
            title: 'Introduction to Modules',
            content: `
                <h2>Introduction to Modules</h2>

                <p>In this chapter, we begin our study of modules, which generalize the notion of vector spaces. While vector spaces are defined over fields, modules are defined over arbitrary rings. This seemingly small change has profound consequences: many of the nice properties we enjoyed for vector spaces fail for modules in general.</p>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Think of a module as a "vector space" where scalars come from a ring \\(R\\) instead of a field \\(F\\). The key difference: in a field, every nonzero element has a multiplicative inverse, allowing us to "divide" by scalars. In a ring, this may fail, leading to phenomena impossible in vector spaces—such as nonzero elements with nontrivial annihilators, or finitely generated modules with non-finitely-generated submodules.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 4.1 (Module)</div>
                    <div class="env-body">
                        <p>Let \\(R\\) be a ring with identity \\(1\\). A <strong>left \\(R\\)-module</strong> is an abelian group \\((M, +)\\) together with a scalar multiplication \\(R \\times M \\to M\\), denoted \\((r, m) \\mapsto rm\\), satisfying:</p>
                        <ol>
                            <li>\\(r(m + n) = rm + rn\\) for all \\(r \\in R\\) and \\(m, n \\in M\\)</li>
                            <li>\\((r + s)m = rm + sm\\) for all \\(r, s \\in R\\) and \\(m \\in M\\)</li>
                            <li>\\((rs)m = r(sm)\\) for all \\(r, s \\in R\\) and \\(m \\in M\\)</li>
                            <li>\\(1m = m\\) for all \\(m \\in M\\)</li>
                        </ol>
                        <p>A <strong>right \\(R\\)-module</strong> is defined analogously with scalar multiplication \\(M \\times R \\to M\\). When \\(R\\) is commutative, left and right modules coincide, and we simply speak of <strong>\\(R\\)-modules</strong>.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 4.1 (Vector Spaces as Modules)</div>
                    <div class="env-body">
                        <p>Every vector space \\(V\\) over a field \\(F\\) is an \\(F\\)-module. Conversely, every \\(F\\)-module (where \\(F\\) is a field) is a vector space over \\(F\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 4.2 (Rings as Modules over Themselves)</div>
                    <div class="env-body">
                        <p>Any ring \\(R\\) with identity is a module over itself, where scalar multiplication is just ring multiplication. This is one of the most important examples of modules.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 4.3 (Abelian Groups as \\(\\mathbb{Z}\\)-modules)</div>
                    <div class="env-body">
                        <p>Every abelian group \\(G\\) is naturally a \\(\\mathbb{Z}\\)-module, where for \\(n \\in \\mathbb{Z}\\) and \\(g \\in G\\), we define:</p>
                        \\[ng = \\begin{cases}
                        g + g + \\cdots + g & (n \\text{ times if } n > 0) \\\\
                        0 & (n = 0) \\\\
                        (-g) + (-g) + \\cdots + (-g) & (|n| \\text{ times if } n < 0)
                        \\end{cases}\\]
                        <p>This establishes a fundamental connection: the study of abelian groups is equivalent to the study of \\(\\mathbb{Z}\\)-modules.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="module-vs-vectorspace"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Throughout this chapter, unless otherwise stated, we assume all rings are commutative with identity, and we work with left modules, simply called modules.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'module-vs-vectorspace',
                    title: 'Interactive: Modules vs. Vector Spaces',
                    description: 'Compare scalar multiplication in a vector space over ℝ with a module over ℤ',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 700, height: 400, scale: 35});

                        // Create controls
                        const scalarSlider = VizEngine.createSlider(controls, 'Scalar (ℝ for left, ℤ for right)', -3, 3, 1.5, 0.1, () => draw());

                        const v = {x: 2, y: 1};

                        function draw() {
                            viz.clear();

                            const scalar = parseFloat(scalarSlider.value);
                            const scalarInt = Math.round(scalar);

                            // Left side: Vector space over ℝ
                            viz.ctx.save();
                            viz.ctx.translate(-viz.width/4, 0);

                            viz.drawGrid();
                            viz.drawAxes();
                            viz.drawVector(0, 0, v.x, v.y, viz.colors.blue, 'v');
                            viz.drawVector(0, 0, scalar * v.x, scalar * v.y, viz.colors.orange, scalar.toFixed(1) + 'v');
                            viz.drawText('Vector Space (ℝ)', 0, -5.5, viz.colors.white, 16, 'center', 'middle');
                            viz.drawText('Any real scalar works', 0, 5.5, viz.colors.text, 12, 'center', 'middle');

                            viz.ctx.restore();

                            // Right side: ℤ-module
                            viz.ctx.save();
                            viz.ctx.translate(viz.width/4, 0);

                            viz.drawGrid();
                            viz.drawAxes();
                            viz.drawVector(0, 0, v.x, v.y, viz.colors.blue, 'v');
                            viz.drawVector(0, 0, scalarInt * v.x, scalarInt * v.y, viz.colors.green, scalarInt + 'v');

                            // Show integer lattice points
                            for (let k = -3; k <= 3; k++) {
                                viz.drawPoint(k * v.x, k * v.y, viz.colors.teal + '88', null, 4);
                            }

                            viz.drawText('ℤ-Module', 0, -5.5, viz.colors.white, 16, 'center', 'middle');
                            viz.drawText('Only integer multiples', 0, 5.5, viz.colors.text, 12, 'center', 'middle');

                            viz.ctx.restore();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that any ring \\(R\\) with identity is a left \\(R\\)-module over itself.',
                    hint: 'Check each of the four module axioms using ring multiplication as scalar multiplication.',
                    solution: 'The abelian group structure is given by \\((R, +)\\). For scalar multiplication, define \\(r \\cdot m = rm\\) (ring multiplication). Then: (1) \\(r(m+n) = rm + rn\\) by distributivity in \\(R\\); (2) \\((r+s)m = rm + sm\\) by distributivity; (3) \\((rs)m = r(sm)\\) by associativity of multiplication; (4) \\(1m = m\\) since \\(1\\) is the multiplicative identity.'
                },
                {
                    question: 'Show that every \\(F\\)-module \\(M\\), where \\(F\\) is a field, is necessarily a vector space over \\(F\\).',
                    hint: 'The module axioms already give you most of what you need. What additional property does a field provide?',
                    solution: 'An \\(F\\)-module \\(M\\) satisfies all vector space axioms by definition. The key point is that \\(F\\) being a field ensures that scalar multiplication by nonzero elements of \\(F\\) is always possible and invertible, which is implicitly used in the vector space structure but not explicitly required in the module definition.'
                },
                {
                    question: 'Let \\(M\\) be an \\(R\\)-module. Prove that \\(0 \\cdot m = 0\\) for all \\(m \\in M\\), and \\(r \\cdot 0 = 0\\) for all \\(r \\in R\\).',
                    hint: 'Use the fact that \\(0 + 0 = 0\\) in the ring and in the module.',
                    solution: 'For the first: \\(0 \\cdot m = (0+0) \\cdot m = 0 \\cdot m + 0 \\cdot m\\), so subtracting \\(0 \\cdot m\\) from both sides gives \\(0 = 0 \\cdot m\\). For the second: \\(r \\cdot 0 = r \\cdot (0 + 0) = r \\cdot 0 + r \\cdot 0\\), so similarly \\(r \\cdot 0 = 0\\).'
                }
            ]
        },
        {
            id: 'ch04-sec02',
            title: 'Submodules and Quotient Modules',
            content: `
                <h2>Submodules and Quotient Modules</h2>

                <p>Just as vector spaces have subspaces, modules have submodules. The theory parallels that of vector spaces, but with important differences that we will highlight.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 4.2 (Submodule)</div>
                    <div class="env-body">
                        <p>Let \\(M\\) be an \\(R\\)-module. A subset \\(N \\subseteq M\\) is a <strong>submodule</strong> of \\(M\\) if:</p>
                        <ol>
                            <li>\\(N\\) is a subgroup of \\(M\\) under addition (i.e., \\(0 \\in N\\), and \\(N\\) is closed under addition and negation)</li>
                            <li>\\(N\\) is closed under scalar multiplication: \\(rn \\in N\\) for all \\(r \\in R\\) and \\(n \\in N\\)</li>
                        </ol>
                        <p>We write \\(N \\leq M\\) or \\(N \\subseteq M\\) to denote that \\(N\\) is a submodule of \\(M\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 4.4 (Submodules of \\(\\mathbb{Z}\\))</div>
                    <div class="env-body">
                        <p>Consider \\(\\mathbb{Z}\\) as a module over itself. The submodules of \\(\\mathbb{Z}\\) are precisely the ideals of \\(\\mathbb{Z}\\), which are the sets \\(n\\mathbb{Z} = \\{nk : k \\in \\mathbb{Z}\\}\\) for \\(n \\geq 0\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 4.3 (Generated Submodule)</div>
                    <div class="env-body">
                        <p>Let \\(S \\subseteq M\\) be a subset of an \\(R\\)-module \\(M\\). The <strong>submodule generated by \\(S\\)</strong>, denoted \\(\\langle S \\rangle\\), is the smallest submodule of \\(M\\) containing \\(S\\). Explicitly,</p>
                        \\[\\langle S \\rangle = \\left\\{ r_1 s_1 + \\cdots + r_n s_n : n \\in \\mathbb{N}, r_i \\in R, s_i \\in S \\right\\}\\]
                        <p>We say \\(S\\) <strong>generates</strong> or <strong>spans</strong> \\(M\\) if \\(\\langle S \\rangle = M\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 4.4 (Cyclic Submodule)</div>
                    <div class="env-body">
                        <p>A submodule of the form \\(\\langle m \\rangle = \\{rm : r \\in R\\}\\) for \\(m \\in M\\) is called the <strong>cyclic submodule generated by \\(m\\)</strong>.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 4.5 (Finitely Generated Module)</div>
                    <div class="env-body">
                        <p>An \\(R\\)-module \\(M\\) is <strong>finitely generated</strong> if it contains a finite set that generates \\(M\\). More specifically, \\(M\\) is <strong>\\(n\\)-generated</strong> if it has a generating set of size \\(n\\) (though it may have smaller generating sets).</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body">
                        <p>Unlike vector spaces, a finitely generated module may have submodules that are <em>not</em> finitely generated! See Example 4.5 below for a striking instance.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 4.5 (Finitely Generated Module with Non-Finitely-Generated Submodule)</div>
                    <div class="env-body">
                        <p>Let \\(R = F[x_1, x_2, x_3, \\ldots]\\) be the ring of polynomials in infinitely many variables over a field \\(F\\). As an \\(R\\)-module, \\(R\\) is finitely generated (in fact, 1-generated) by the identity \\(1\\).</p>
                        <p>However, consider the submodule \\(N\\) consisting of all polynomials with zero constant term. Then \\(N = \\langle x_1, x_2, x_3, \\ldots \\rangle\\), but \\(N\\) is <em>not</em> finitely generated. Indeed, if \\(S = \\{f_1, \\ldots, f_n\\}\\) is any finite subset of \\(N\\), then each \\(f_i\\) involves only finitely many variables. Choose a variable \\(x_j\\) not appearing in any \\(f_i\\). Then \\(x_j \\notin \\langle S \\rangle\\), so \\(S\\) does not generate \\(N\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="submodule-lattice"></div>

                <h3>Quotient Modules</h3>

                <p>The construction of quotient modules mirrors that of quotient vector spaces.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 4.1 (Quotient Module)</div>
                    <div class="env-body">
                        <p>Let \\(N\\) be a submodule of an \\(R\\)-module \\(M\\). The binary relation on \\(M\\) defined by</p>
                        \\[m \\sim m' \\iff m - m' \\in N\\]
                        <p>is an equivalence relation. The equivalence classes are the cosets \\(m + N = \\{m + n : n \\in N\\}\\). The set \\(M/N\\) of all cosets is an \\(R\\)-module, called the <strong>quotient module</strong>, under the operations:</p>
                        \\[(m + N) + (m' + N) = (m + m') + N\\]
                        \\[r(m + N) = rm + N\\]
                        <p>The zero element in \\(M/N\\) is \\(N\\) itself.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 4.6 (\\(\\mathbb{Z}/n\\mathbb{Z}\\))</div>
                    <div class="env-body">
                        <p>As a \\(\\mathbb{Z}\\)-module, \\(\\mathbb{Z}\\) is free on \\(\\{1\\}\\). For any \\(n \\in \\mathbb{N}\\), the submodule \\(n\\mathbb{Z}\\) is free on \\(\\{n\\}\\). However, the quotient \\(\\mathbb{Z}/n\\mathbb{Z}\\) is isomorphic to \\(\\mathbb{Z}_n\\) (the cyclic group of order \\(n\\)) as a \\(\\mathbb{Z}\\)-module, and \\(\\mathbb{Z}_n\\) is not free when \\(n > 1\\) (it has no linearly independent elements).</p>
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 4.2</div>
                    <div class="env-body">
                        <p>A quotient module of a free module need not be free.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'submodule-lattice',
                    title: 'Interactive: Submodule Lattice of \\(\\mathbb{Z}_{12}\\)',
                    description: 'Explore the lattice of submodules of \\(\\mathbb{Z}_{12}\\) as a \\(\\mathbb{Z}\\)-module',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 700, height: 500, scale: 1});

                        // Submodules of Z_12 are cyclic subgroups
                        const submodules = [
                            {id: '0', gen: 0, elements: [0], label: '{0}', pos: {x: 350, y: 450}},
                            {id: '1', gen: 1, elements: [0,1,2,3,4,5,6,7,8,9,10,11], label: 'Z₁₂', pos: {x: 350, y: 50}},
                            {id: '2', gen: 2, elements: [0,2,4,6,8,10], label: '⟨2⟩', pos: {x: 200, y: 150}},
                            {id: '3', gen: 3, elements: [0,3,6,9], label: '⟨3⟩', pos: {x: 350, y: 200}},
                            {id: '4', gen: 4, elements: [0,4,8], label: '⟨4⟩', pos: {x: 500, y: 150}},
                            {id: '6', gen: 6, elements: [0,6], label: '⟨6⟩', pos: {x: 350, y: 320}}
                        ];

                        // Inclusion relations
                        const inclusions = [
                            ['0', '6'], ['6', '3'], ['6', '2'], ['3', '1'], ['2', '4'], ['4', '1'], ['2', '1']
                        ];

                        let selectedId = null;

                        // Make nodes clickable
                        viz.canvas.addEventListener('click', (e) => {
                            const rect = viz.canvas.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;

                            for (const sm of submodules) {
                                const dx = x - sm.pos.x;
                                const dy = y - sm.pos.y;
                                if (dx*dx + dy*dy < 900) { // 30px radius
                                    selectedId = sm.id;
                                    draw();
                                    return;
                                }
                            }
                        });

                        function draw() {
                            viz.clear();

                            // Draw edges
                            for (const [from, to] of inclusions) {
                                const n1 = submodules.find(s => s.id === from);
                                const n2 = submodules.find(s => s.id === to);
                                viz.ctx.strokeStyle = viz.colors.text + '88';
                                viz.ctx.lineWidth = 2;
                                viz.ctx.beginPath();
                                viz.ctx.moveTo(n1.pos.x, n1.pos.y);
                                viz.ctx.lineTo(n2.pos.x, n2.pos.y);
                                viz.ctx.stroke();
                            }

                            // Draw nodes
                            for (const sm of submodules) {
                                const isSelected = sm.id === selectedId;
                                viz.ctx.fillStyle = isSelected ? viz.colors.orange : viz.colors.blue;
                                viz.ctx.beginPath();
                                viz.ctx.arc(sm.pos.x, sm.pos.y, 25, 0, 2*Math.PI);
                                viz.ctx.fill();
                                viz.ctx.strokeStyle = viz.colors.white;
                                viz.ctx.lineWidth = 2;
                                viz.ctx.stroke();

                                viz.screenText(sm.label, sm.pos.x, sm.pos.y, viz.colors.white, 14, 'center', 'middle');
                            }

                            // Show elements of selected submodule
                            if (selectedId) {
                                const sm = submodules.find(s => s.id === selectedId);
                                viz.screenText('Elements: {' + sm.elements.join(', ') + '}',
                                    350, 490, viz.colors.orange, 14, 'center', 'top');
                            } else {
                                viz.screenText('Click a node to see its elements',
                                    350, 490, viz.colors.text, 14, 'center', 'top');
                            }

                            viz.screenText('Submodule Lattice of ℤ₁₂', 350, 20, viz.colors.white, 16, 'center', 'top');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(N_1, N_2 \\leq M\\) be submodules. Prove that \\(N_1 \\cap N_2\\) and \\(N_1 + N_2 = \\{n_1 + n_2 : n_1 \\in N_1, n_2 \\in N_2\\}\\) are also submodules.',
                    hint: 'Verify the submodule conditions directly for both sets.',
                    solution: 'For \\(N_1 \\cap N_2\\): Contains \\(0\\) since both \\(N_i\\) do. If \\(m, m\' \\in N_1 \\cap N_2\\), then \\(m + m\' \\in N_i\\) for each \\(i\\), so \\(m + m\' \\in N_1 \\cap N_2\\). Similarly for scalar multiplication. For \\(N_1 + N_2\\): \\(0 = 0 + 0 \\in N_1 + N_2\\). If \\(m = n_1 + n_2\\) and \\(m\' = n_1\' + n_2\'\\), then \\(m + m\' = (n_1 + n_1\') + (n_2 + n_2\') \\in N_1 + N_2\\). For scalars: \\(r(n_1 + n_2) = rn_1 + rn_2 \\in N_1 + N_2\\).'
                },
                {
                    question: 'Show that \\(N_1 \\cap N_2\\) is the greatest lower bound and \\(N_1 + N_2\\) is the least upper bound of \\(\\{N_1, N_2\\}\\) in the lattice of submodules.',
                    hint: 'Use the definitions of glb and lub with respect to the inclusion ordering.',
                    solution: 'For glb: \\(N_1 \\cap N_2 \\subseteq N_i\\) for \\(i=1,2\\). If \\(K \\subseteq N_1\\) and \\(K \\subseteq N_2\\), then \\(K \\subseteq N_1 \\cap N_2\\). For lub: \\(N_i \\subseteq N_1 + N_2\\) for \\(i=1,2\\) (clear). If \\(N_i \\subseteq L\\) for some submodule \\(L\\), then any \\(n_1 + n_2 \\in N_1 + N_2\\) satisfies \\(n_i \\in L\\), hence \\(n_1 + n_2 \\in L\\), so \\(N_1 + N_2 \\subseteq L\\).'
                },
                {
                    question: 'Prove that the quotient map \\(\\pi: M \\to M/N\\) defined by \\(\\pi(m) = m + N\\) is a surjective \\(R\\)-module homomorphism with kernel \\(N\\).',
                    hint: 'Check that \\(\\pi\\) preserves the module operations.',
                    solution: '\\(\\pi(m + m\') = (m+m\') + N = (m+N) + (m\'+N) = \\pi(m) + \\pi(m\')\\). Also \\(\\pi(rm) = rm + N = r(m+N) = r\\pi(m)\\). Surjectivity is immediate. For the kernel: \\(\\pi(m) = N\\) iff \\(m + N = N\\) iff \\(m \\in N\\), so \\(\\ker(\\pi) = N\\).'
                }
            ]
        },
        {
            id: 'ch04-sec03',
            title: 'Torsion and Annihilators',
            content: `
                <h2>Torsion and Annihilators</h2>

                <p>One of the most striking differences between modules and vector spaces concerns the possibility of nonzero elements being "killed" by nonzero scalars. This phenomenon has no analog in vector spaces over fields.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 4.6 (Torsion Element)</div>
                    <div class="env-body">
                        <p>Let \\(M\\) be an \\(R\\)-module. A nonzero element \\(m \\in M\\) is a <strong>torsion element</strong> if there exists a nonzero \\(r \\in R\\) such that \\(rm = 0\\). The module \\(M\\) is:</p>
                        <ul>
                            <li><strong>Torsion-free</strong> if it has no nonzero torsion elements</li>
                            <li>A <strong>torsion module</strong> if every element is a torsion element</li>
                        </ul>
                        <p>The set of all torsion elements, together with zero, is denoted \\(M_{\\text{tor}}\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 4.7 (\\(\\mathbb{Z}_n\\) as a Torsion Module)</div>
                    <div class="env-body">
                        <p>The \\(\\mathbb{Z}\\)-module \\(\\mathbb{Z}_n = \\{0, 1, \\ldots, n-1\\}\\) with scalar multiplication \\(k \\cdot m = (km) \\bmod n\\) is a torsion module: for any \\(m \\in \\mathbb{Z}_n\\), we have \\(n \\cdot m = 0\\).</p>
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 4.3</div>
                    <div class="env-body">
                        <p>If \\(R\\) is an integral domain and \\(M\\) is an \\(R\\)-module, then \\(M_{\\text{tor}}\\) is a submodule of \\(M\\), and \\(M/M_{\\text{tor}}\\) is torsion-free.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Clearly \\(0 \\in M_{\\text{tor}}\\). Let \\(m_1, m_2 \\in M_{\\text{tor}}\\) with \\(r_1 m_1 = 0\\) and \\(r_2 m_2 = 0\\) for nonzero \\(r_1, r_2 \\in R\\). Then \\(r_1 r_2 (m_1 + m_2) = r_1 r_2 m_1 + r_1 r_2 m_2 = r_2(r_1 m_1) + r_1(r_2 m_2) = 0\\). Since \\(R\\) is an integral domain, \\(r_1 r_2 \\neq 0\\), so \\(m_1 + m_2 \\in M_{\\text{tor}}\\). For scalar multiplication: if \\(rm = 0\\) with \\(r \\neq 0\\) and \\(s \\in R\\), then \\(r(sm) = s(rm) = 0\\), so \\(sm \\in M_{\\text{tor}}\\) (if \\(sm \\neq 0\\)).</p>
                        <p>For torsion-freeness of \\(M/M_{\\text{tor}}\\): suppose \\(r(m + M_{\\text{tor}}) = M_{\\text{tor}}\\) for \\(r \\neq 0\\). Then \\(rm \\in M_{\\text{tor}}\\), so \\(s(rm) = 0\\) for some \\(s \\neq 0\\). Thus \\((sr)m = 0\\) with \\(sr \\neq 0\\), so \\(m \\in M_{\\text{tor}}\\), i.e., \\(m + M_{\\text{tor}} = M_{\\text{tor}}\\) is the zero element.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 4.7 (Annihilator)</div>
                    <div class="env-body">
                        <p>Let \\(M\\) be an \\(R\\)-module. The <strong>annihilator</strong> of an element \\(m \\in M\\) is</p>
                        \\[\\operatorname{ann}(m) = \\{r \\in R : rm = 0\\}\\]
                        <p>The annihilator of a submodule \\(N \\leq M\\) is</p>
                        \\[\\operatorname{ann}(N) = \\{r \\in R : rn = 0 \\text{ for all } n \\in N\\}\\]
                        <p>Annihilators are also called <strong>order ideals</strong>.</p>
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 4.4</div>
                    <div class="env-body">
                        <p>For any \\(m \\in M\\) and \\(N \\leq M\\), \\(\\operatorname{ann}(m)\\) and \\(\\operatorname{ann}(N)\\) are ideals of \\(R\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>If \\(r, s \\in \\operatorname{ann}(m)\\), then \\((r-s)m = rm - sm = 0\\), so \\(r - s \\in \\operatorname{ann}(m)\\). If \\(r \\in \\operatorname{ann}(m)\\) and \\(s \\in R\\), then \\((sr)m = s(rm) = 0\\), so \\(sr \\in \\operatorname{ann}(m)\\). Similarly for \\(\\operatorname{ann}(N)\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 4.5</div>
                    <div class="env-body">
                        <p>An element \\(m \\in M\\) is a torsion element if and only if \\(\\operatorname{ann}(m) \\neq \\{0\\}\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Order Reversal)</div>
                    <div class="env-body">
                        <p>If \\(N_1 \\subseteq N_2\\) are submodules, then \\(\\operatorname{ann}(N_2) \\subseteq \\operatorname{ann}(N_1)\\). Note the reversal of inclusion: larger submodules have smaller annihilators.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="torsion-viz"></div>

                <div class="env-block example">
                    <div class="env-title">Example 4.8 (Linear Independence Fails for Torsion)</div>
                    <div class="env-body">
                        <p>In \\(\\mathbb{Z}_6\\) viewed as a \\(\\mathbb{Z}\\)-module, consider the elements \\(2\\) and \\(3\\). We have \\(3 \\cdot 2 + 2 \\cdot 3 = 6 + 6 = 0 \\pmod{6}\\), but neither \\(2\\) nor \\(3\\) is a scalar multiple of the other. Thus \\(\\{2, 3\\}\\) is linearly dependent, yet no element is in the span of the other—a situation impossible in vector spaces.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 4.2 (Finitely Generated Torsion Modules over Integral Domains)</div>
                    <div class="env-body">
                        <p>Let \\(M = \\langle m_1, \\ldots, m_n \\rangle\\) be a finitely generated module over an integral domain \\(R\\). If each generator \\(m_i\\) is torsion, then \\(\\operatorname{ann}(M) \\neq \\{0\\}\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>For each \\(i\\), there exists nonzero \\(r_i \\in \\operatorname{ann}(m_i)\\). Let \\(r = r_1 r_2 \\cdots r_n\\). Since \\(R\\) is an integral domain, \\(r \\neq 0\\). For any \\(m = s_1 m_1 + \\cdots + s_n m_n \\in M\\), we have</p>
                        \\[rm = r s_1 m_1 + \\cdots + r s_n m_n\\]
                        <p>Each term \\(r s_i m_i = s_i (r m_i)\\). Now \\(r m_i = r_1 \\cdots r_n m_i = r_i (r_1 \\cdots r_{i-1} r_{i+1} \\cdots r_n) m_i = 0\\) since \\(r_i m_i = 0\\). Thus \\(rm = 0\\) for all \\(m \\in M\\), so \\(r \\in \\operatorname{ann}(M)\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body">
                        <p>This theorem fails if \\(R\\) is not an integral domain! There exist torsion modules over non-integral-domains with trivial annihilator.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'torsion-viz',
                    title: 'Interactive: Torsion Elements in \\(\\mathbb{Z}_n\\)',
                    description: 'Visualize annihilators and torsion in cyclic groups',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 700, height: 420, scale: 1, originX: 0, originY: 0});
                        const ctx = viz.ctx;

                        const nSlider = VizEngine.createSlider(controls, 'n (for ℤₙ)', 2, 20, 12, 1, () => draw());
                        const elemSlider = VizEngine.createSlider(controls, 'Element m', 0, 19, 4, 1, () => draw());

                        function gcd(a, b) {
                            while (b !== 0) { let t = b; b = a % b; a = t; }
                            return a;
                        }

                        function text(str, x, y, color, size, align, baseline) {
                            ctx.fillStyle = color;
                            ctx.font = (size || 14) + 'px -apple-system,sans-serif';
                            ctx.textAlign = align || 'center';
                            ctx.textBaseline = baseline || 'middle';
                            ctx.fillText(str, x, y);
                        }

                        function draw() {
                            viz.clear();
                            const W = viz.width, H = viz.height;
                            const n = parseInt(nSlider.value);
                            const m = parseInt(elemSlider.value) % n;
                            elemSlider.max = n - 1;
                            if (m >= n) elemSlider.value = n - 1;

                            // Circle of elements — centered in left portion
                            const cx = W * 0.32, cy = H / 2;
                            const radius = Math.min(H / 2 - 45, W * 0.22);

                            for (let k = 0; k < n; k++) {
                                const angle = -Math.PI / 2 + (2 * Math.PI * k / n);
                                const x = cx + radius * Math.cos(angle);
                                const y = cy + radius * Math.sin(angle);
                                const isSelected = (k === m);

                                ctx.fillStyle = isSelected ? viz.colors.orange : viz.colors.blue + '88';
                                ctx.beginPath();
                                ctx.arc(x, y, 12, 0, 2 * Math.PI);
                                ctx.fill();

                                // Label on outside of circle
                                const lx = cx + (radius + 22) * Math.cos(angle);
                                const ly = cy + (radius + 22) * Math.sin(angle);
                                text(k.toString(), lx, ly, viz.colors.text, 11);
                            }

                            text('ℤ' + n, cx, cy, viz.colors.white, 18);

                            // Compute annihilator and order
                            const g = gcd(m, n);
                            const order = (m === 0) ? 1 : n / g;

                            // Multiples
                            const multiples = [];
                            for (let k = 0; k <= n && k * m < 2 * n; k++) {
                                multiples.push((k * m) % n);
                                if (k > 0 && (k * m) % n === 0) break;
                            }

                            // Highlight multiples on circle
                            for (let k = 0; k < n; k++) {
                                if (multiples.includes(k) && k !== m) {
                                    const angle = -Math.PI / 2 + (2 * Math.PI * k / n);
                                    const x = cx + radius * Math.cos(angle);
                                    const y = cy + radius * Math.sin(angle);
                                    ctx.strokeStyle = viz.colors.teal;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.arc(x, y, 15, 0, 2 * Math.PI);
                                    ctx.stroke();
                                }
                            }

                            // Info panel on the right
                            const infoX = W * 0.62;
                            let infoY = H * 0.15;
                            const lineH = 28;

                            text('Element: m = ' + m, infoX, infoY, viz.colors.white, 16, 'left', 'top');
                            infoY += lineH + 4;
                            text('Order of m: ' + order, infoX, infoY, viz.colors.teal, 14, 'left', 'top');
                            infoY += lineH;
                            text('Ann(m) = ' + order + 'ℤ', infoX, infoY, viz.colors.orange, 14, 'left', 'top');
                            infoY += lineH - 4;
                            text('= {0, ±' + order + ', ±' + (2 * order) + ', ...}', infoX, infoY, viz.colors.text, 12, 'left', 'top');
                            infoY += lineH + 8;
                            text('Cyclic submodule ⟨m⟩:', infoX, infoY, viz.colors.white, 14, 'left', 'top');
                            infoY += lineH - 4;
                            text('{' + multiples.slice(0, 8).join(', ') + (multiples.length > 8 ? ', ...' : '') + '}',
                                infoX, infoY, viz.colors.blue, 12, 'left', 'top');
                            infoY += lineH + 8;

                            const isTorsion = (order < n);
                            text(isTorsion ? '⚡ Torsion element' : '✓ Generates entire group',
                                infoX, infoY, isTorsion ? viz.colors.red : viz.colors.green, 14, 'left', 'top');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that if \\(R\\) is an integral domain and \\(M\\) is a torsion-free \\(R\\)-module, then for \\(m_1, \\ldots, m_n \\in M\\) linearly independent over \\(R\\), the set \\(\\{r m_1, \\ldots, r m_n\\}\\) is linearly independent for any nonzero \\(r \\in R\\).',
                    hint: 'Use the fact that you can "cancel" \\(r\\) in an integral domain.',
                    solution: 'Suppose \\(s_1(r m_1) + \\cdots + s_n(r m_n) = 0\\). Then \\(r(s_1 m_1 + \\cdots + s_n m_n) = 0\\). Since \\(M\\) is torsion-free and \\(r \\neq 0\\), we have \\(s_1 m_1 + \\cdots + s_n m_n = 0\\). By linear independence of \\(\\{m_i\\}\\), each \\(s_i = 0\\).'
                },
                {
                    question: 'Find an example of a ring \\(R\\) (not an integral domain) and an \\(R\\)-module \\(M\\) such that \\(M_{\\text{tor}}\\) is not a submodule.',
                    hint: 'Consider \\(R = \\mathbb{Z}_6\\) and look for elements with different annihilators.',
                    solution: 'Let \\(R = \\mathbb{Z}_6\\) and \\(M = \\mathbb{Z}_6\\) as an \\(R\\)-module. Then \\(2 \\in M_{\\text{tor}}\\) (since \\(3 \\cdot 2 = 0\\)) and \\(3 \\in M_{\\text{tor}}\\) (since \\(2 \\cdot 3 = 0\\)). However, \\(2 + 3 = 5\\), and \\(\\operatorname{ann}(5) = \\{0\\}\\) in \\(\\mathbb{Z}_6\\) (check: \\(k \\cdot 5 \\equiv 0 \\pmod 6\\) requires \\(k \\equiv 0\\)), so \\(5 \\notin M_{\\text{tor}}\\). Thus \\(M_{\\text{tor}}\\) is not closed under addition.'
                },
                {
                    question: 'Prove that if \\(N_1 \\subseteq N_2\\) are submodules of \\(M\\), then \\(\\operatorname{ann}(N_2) \\subseteq \\operatorname{ann}(N_1)\\).',
                    hint: 'If \\(r\\) annihilates everything in \\(N_2\\), what about elements of \\(N_1 \\subseteq N_2\\)?',
                    solution: 'Let \\(r \\in \\operatorname{ann}(N_2)\\). Then \\(rn = 0\\) for all \\(n \\in N_2\\). Since \\(N_1 \\subseteq N_2\\), for any \\(n \\in N_1\\) we have \\(n \\in N_2\\), hence \\(rn = 0\\). Thus \\(r \\in \\operatorname{ann}(N_1)\\).'
                }
            ]
        },
        {
            id: 'ch04-sec04',
            title: 'Linear Independence and Free Modules',
            content: `
                <h2>Linear Independence and Free Modules</h2>

                <p>The concepts of linear independence and basis extend from vector spaces to modules, but with crucial differences that make modules much more subtle.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 4.8 (Linear Independence)</div>
                    <div class="env-body">
                        <p>A subset \\(S\\) of an \\(R\\)-module \\(M\\) is <strong>linearly independent</strong> if for any distinct \\(m_1, \\ldots, m_n \\in S\\) and \\(r_1, \\ldots, r_n \\in R\\),</p>
                        \\[r_1 m_1 + \\cdots + r_n m_n = 0 \\implies r_1 = \\cdots = r_n = 0\\]
                        <p>A set that is not linearly independent is <strong>linearly dependent</strong>.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 4.9 (Basis and Free Module)</div>
                    <div class="env-body">
                        <p>A subset \\(B\\) of an \\(R\\)-module \\(M\\) is a <strong>basis</strong> if \\(B\\) is linearly independent and spans \\(M\\). An \\(R\\)-module is <strong>free</strong> if it equals \\(\\{0\\}\\) or has a basis. If \\(B\\) is a basis for \\(M\\), we say \\(M\\) is <strong>free on \\(B\\)</strong>.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning: Modules Behave Badly</div>
                    <div class="env-body">
                        <p>For vector spaces, the following are equivalent for a set \\(B\\):</p>
                        <ul>
                            <li>\\(B\\) is a basis</li>
                            <li>\\(B\\) is a maximal linearly independent set</li>
                            <li>\\(B\\) is a minimal spanning set</li>
                        </ul>
                        <p>For modules, a maximal linearly independent set need not be a basis, and a minimal spanning set need not be a basis!</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 4.9 (Minimal Spanning Set Not a Basis)</div>
                    <div class="env-body">
                        <p>Consider \\(\\mathbb{Z}_6\\) as a \\(\\mathbb{Z}\\)-module. The set \\(\\{1\\}\\) is a minimal spanning set (it generates \\(\\mathbb{Z}_6\\)), but it is not a basis because \\(\\{1\\}\\) is not linearly independent: \\(6 \\cdot 1 = 0\\) with \\(6 \\neq 0\\). In fact, \\(\\mathbb{Z}_6\\) has no basis—it is not a free \\(\\mathbb{Z}\\)-module.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 4.3 (Characterization of Bases)</div>
                    <div class="env-body">
                        <p>A subset \\(B\\) of an \\(R\\)-module \\(M\\) is a basis if and only if every nonzero element of \\(M\\) can be written <em>uniquely</em> (up to order) as a linear combination of elements of \\(B\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>(⇒) Suppose \\(B\\) is a basis. Since \\(B\\) spans \\(M\\), every \\(m \\in M\\) can be written as \\(m = r_1 b_1 + \\cdots + r_n b_n\\) for some \\(b_i \\in B\\), \\(r_i \\in R\\). For uniqueness, suppose \\(m = s_1 c_1 + \\cdots + s_k c_k\\) is another representation with \\(c_j \\in B\\). Then (after reindexing and allowing zero coefficients) we have \\((r_1 - s_1) b_1 + \\cdots + (r_n - s_n) b_n = 0\\). By linear independence, \\(r_i = s_i\\) for all \\(i\\).</p>
                        <p>(⇐) If every element has a unique representation, then \\(B\\) spans \\(M\\) (existence of representations). For linear independence, if \\(r_1 b_1 + \\cdots + r_n b_n = 0\\), then this is also equal to \\(0 \\cdot b_1 + \\cdots + 0 \\cdot b_n\\). By uniqueness, \\(r_i = 0\\) for all \\(i\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 4.4 (Universal Property of Free Modules)</div>
                    <div class="env-body">
                        <p>Let \\(M\\) and \\(N\\) be \\(R\\)-modules with \\(M\\) free on basis \\(B = \\{b_i : i \\in I\\}\\). Then for any function \\(f: B \\to N\\), there exists a unique \\(R\\)-module homomorphism \\(\\phi: M \\to N\\) extending \\(f\\) by linearity, i.e.,</p>
                        \\[\\phi\\left(\\sum r_i b_i\\right) = \\sum r_i f(b_i)\\]
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 4.10 (Free Module with Non-Free Submodule)</div>
                    <div class="env-body">
                        <p>The \\(\\mathbb{Z}\\)-module \\(\\mathbb{Z} \\times \\mathbb{Z}\\) is free with basis \\(\\{(1,0), (0,1)\\}\\). However, the submodule \\(\\mathbb{Z} \\times \\{0\\}\\) embedded diagonally—wait, let's be more dramatic: Consider the submodule</p>
                        \\[N = \\{(a, b) \\in \\mathbb{Z} \\times \\mathbb{Z} : a = 0\\} = \\{0\\} \\times \\mathbb{Z}\\]
                        <p>This is isomorphic to \\(\\mathbb{Z}\\), hence free. But consider instead:</p>
                        \\[N = \\{(2a, b) : a, b \\in \\mathbb{Z}\\} = 2\\mathbb{Z} \\times \\mathbb{Z}\\]
                        <p>Actually, this is also free (isomorphic to \\(\\mathbb{Z}^2\\)). The canonical example of a non-free submodule of a free module requires different construction—see the exercises.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 4.5 (Bases in Free Modules)</div>
                    <div class="env-body">
                        <p>Let \\(M\\) be a free \\(R\\)-module with basis \\(B\\). Then:</p>
                        <ol>
                            <li>\\(B\\) is a minimal spanning set</li>
                            <li>\\(B\\) is a maximal linearly independent set</li>
                        </ol>
                        <p>However, the converses fail: not every minimal spanning set or maximal linearly independent set is a basis.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Prove that any subset of a linearly independent set is linearly independent.',
                    hint: 'Use the definition directly.',
                    solution: 'Let \\(S\\) be linearly independent and \\(T \\subseteq S\\). If \\(r_1 t_1 + \\cdots + r_n t_n = 0\\) for distinct \\(t_i \\in T\\) and \\(r_i \\in R\\), then since \\(t_i \\in S\\) and \\(S\\) is linearly independent, we have \\(r_i = 0\\) for all \\(i\\). Thus \\(T\\) is linearly independent.'
                },
                {
                    question: 'Show that \\(\\mathbb{Z}_n\\) has no basis as a \\(\\mathbb{Z}\\)-module for \\(n > 1\\).',
                    hint: 'Show that no singleton set \\(\\{m\\}\\) in \\(\\mathbb{Z}_n\\) can be linearly independent.',
                    solution: 'For any \\(m \\in \\mathbb{Z}_n\\), we have \\(n \\cdot m = 0\\) in \\(\\mathbb{Z}_n\\), with \\(n \\neq 0\\) in \\(\\mathbb{Z}\\). Thus no element forms a linearly independent set. Since a basis must be linearly independent and nonempty (as \\(\\mathbb{Z}_n \\neq \\{0\\}\\) for \\(n > 1\\)), \\(\\mathbb{Z}_n\\) has no basis.'
                },
                {
                    question: 'Prove that if \\(\\phi: M \\to N\\) is an \\(R\\)-module isomorphism and \\(B\\) is a basis for \\(M\\), then \\(\\phi(B) = \\{\\phi(b) : b \\in B\\}\\) is a basis for \\(N\\).',
                    hint: 'Check linear independence and spanning separately using the fact that \\(\\phi\\) is bijective.',
                    solution: 'For spanning: Let \\(n \\in N\\). Since \\(\\phi\\) is surjective, \\(n = \\phi(m)\\) for some \\(m \\in M\\). Write \\(m = r_1 b_1 + \\cdots + r_k b_k\\) with \\(b_i \\in B\\). Then \\(n = \\phi(m) = r_1 \\phi(b_1) + \\cdots + r_k \\phi(b_k) \\in \\langle \\phi(B) \\rangle\\). For linear independence: If \\(r_1 \\phi(b_1) + \\cdots + r_k \\phi(b_k) = 0\\), then \\(\\phi(r_1 b_1 + \\cdots + r_k b_k) = 0\\). Since \\(\\ker(\\phi) = \\{0\\}\\), we have \\(r_1 b_1 + \\cdots + r_k b_k = 0\\). By linear independence of \\(B\\), \\(r_i = 0\\) for all \\(i\\).'
                }
            ]
        },
        {
            id: 'ch04-sec05',
            title: 'Module Homomorphisms',
            content: `
                <h2>Module Homomorphisms</h2>

                <p>Module homomorphisms are the structure-preserving maps between modules, generalizing linear transformations between vector spaces.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 4.10 (Module Homomorphism)</div>
                    <div class="env-body">
                        <p>Let \\(M\\) and \\(N\\) be \\(R\\)-modules. A function \\(\\phi: M \\to N\\) is an <strong>\\(R\\)-module homomorphism</strong> (or <strong>\\(R\\)-map</strong>) if:</p>
                        \\[\\phi(r m + s m') = r \\phi(m) + s \\phi(m')\\]
                        <p>for all \\(r, s \\in R\\) and \\(m, m' \\in M\\). We denote the set of all \\(R\\)-homomorphisms from \\(M\\) to \\(N\\) by \\(\\operatorname{Hom}_R(M, N)\\).</p>
                        <p>Special terminology:</p>
                        <ul>
                            <li><strong>Endomorphism</strong>: \\(\\phi: M \\to M\\)</li>
                            <li><strong>Monomorphism</strong> (or <strong>embedding</strong>): injective homomorphism</li>
                            <li><strong>Epimorphism</strong>: surjective homomorphism</li>
                            <li><strong>Isomorphism</strong>: bijective homomorphism</li>
                            <li><strong>Automorphism</strong>: isomorphism \\(\\phi: M \\to M\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 4.6</div>
                    <div class="env-body">
                        <p>\\(\\operatorname{Hom}_R(M, N)\\) is itself an \\(R\\)-module under pointwise addition and scalar multiplication:</p>
                        \\[(\\phi + \\psi)(m) = \\phi(m) + \\psi(m)\\]
                        \\[(r\\phi)(m) = r(\\phi(m))\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 4.6 (Kernel and Image)</div>
                    <div class="env-body">
                        <p>Let \\(\\phi: M \\to N\\) be an \\(R\\)-module homomorphism. Then:</p>
                        <ol>
                            <li>\\(\\ker(\\phi) = \\{m \\in M : \\phi(m) = 0\\}\\) is a submodule of \\(M\\)</li>
                            <li>\\(\\operatorname{im}(\\phi) = \\{\\phi(m) : m \\in M\\}\\) is a submodule of \\(N\\)</li>
                            <li>\\(\\phi\\) is injective if and only if \\(\\ker(\\phi) = \\{0\\}\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Sketch)</div>
                    <div class="env-body">
                        <p>(1) \\(0 \\in \\ker(\\phi)\\) since \\(\\phi(0) = 0\\). If \\(m_1, m_2 \\in \\ker(\\phi)\\) and \\(r, s \\in R\\), then \\(\\phi(r m_1 + s m_2) = r\\phi(m_1) + s\\phi(m_2) = 0\\), so \\(r m_1 + s m_2 \\in \\ker(\\phi)\\).</p>
                        <p>(2) Similar verification.</p>
                        <p>(3) (⇒) If \\(\\phi\\) is injective and \\(\\phi(m) = 0 = \\phi(0)\\), then \\(m = 0\\). (⇐) If \\(\\ker(\\phi) = \\{0\\}\\) and \\(\\phi(m) = \\phi(m')\\), then \\(\\phi(m - m') = 0\\), so \\(m - m' \\in \\ker(\\phi) = \\{0\\}\\), thus \\(m = m'\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <h3>The Isomorphism Theorems</h3>

                <p>The fundamental isomorphism theorems for vector spaces extend to modules.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 4.7 (First Isomorphism Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(\\phi: M \\to N\\) be an \\(R\\)-module homomorphism. Then the map \\(\\bar{\\phi}: M/\\ker(\\phi) \\to N\\) defined by</p>
                        \\[\\bar{\\phi}(m + \\ker(\\phi)) = \\phi(m)\\]
                        <p>is a well-defined \\(R\\)-module monomorphism, and</p>
                        \\[M / \\ker(\\phi) \\cong \\operatorname{im}(\\phi)\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 4.8 (Second Isomorphism Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(M\\) be an \\(R\\)-module and let \\(N, P\\) be submodules of \\(M\\). Then</p>
                        \\[\\frac{N + P}{P} \\cong \\frac{N}{N \\cap P}\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 4.9 (Third Isomorphism Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(M\\) be an \\(R\\)-module and suppose \\(N \\subseteq P\\) are submodules of \\(M\\). Then</p>
                        \\[\\frac{M/N}{P/N} \\cong \\frac{M}{P}\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 4.10 (Correspondence Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(N\\) be a submodule of \\(M\\). The map that assigns to each submodule \\(P\\) with \\(N \\subseteq P \\subseteq M\\) the quotient \\(P/N\\) is an order-preserving bijection between:</p>
                        <ul>
                            <li>Submodules of \\(M\\) containing \\(N\\)</li>
                            <li>Submodules of \\(M/N\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The isomorphism theorems tell us that quotient constructions "behave well" with respect to submodules. The first isomorphism theorem says that every homomorphism factors through a quotient by its kernel, yielding an embedding. The correspondence theorem says that the lattice of submodules "above" \\(N\\) in \\(M\\) is isomorphic to the entire lattice of submodules in \\(M/N\\)—we can "forget" about \\(N\\) by quotienting it out.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Prove that the composition of two \\(R\\)-module homomorphisms is an \\(R\\)-module homomorphism.',
                    hint: 'Check the definition directly.',
                    solution: 'Let \\(\\phi: M \\to N\\) and \\(\\psi: N \\to P\\) be \\(R\\)-module homomorphisms. Then for \\(r, s \\in R\\) and \\(m, m\' \\in M\\), we have \\((\\psi \\circ \\phi)(rm + sm\') = \\psi(\\phi(rm + sm\')) = \\psi(r\\phi(m) + s\\phi(m\')) = r\\psi(\\phi(m)) + s\\psi(\\phi(m\')) = r(\\psi \\circ \\phi)(m) + s(\\psi \\circ \\phi)(m\')\\).'
                },
                {
                    question: 'Let \\(\\phi: M \\to N\\) be an \\(R\\)-module homomorphism. Show that if \\(P\\) is a submodule of \\(M\\), then \\(\\phi(P)\\) is a submodule of \\(N\\).',
                    hint: 'Verify the submodule conditions for \\(\\phi(P)\\).',
                    solution: '\\(0 = \\phi(0) \\in \\phi(P)\\) since \\(0 \\in P\\). If \\(n_1, n_2 \\in \\phi(P)\\), write \\(n_i = \\phi(p_i)\\) for \\(p_i \\in P\\). Then \\(r n_1 + s n_2 = r\\phi(p_1) + s\\phi(p_2) = \\phi(r p_1 + s p_2) \\in \\phi(P)\\) since \\(r p_1 + s p_2 \\in P\\).'
                },
                {
                    question: 'Prove the Second Isomorphism Theorem: If \\(N, P \\leq M\\), then \\((N+P)/P \\cong N/(N \\cap P)\\).',
                    hint: 'Define \\(\\phi: N \\to (N+P)/P\\) by \\(\\phi(n) = n + P\\) and use the First Isomorphism Theorem.',
                    solution: 'Define \\(\\phi: N \\to (N+P)/P\\) by \\(\\phi(n) = n + P\\). This is an \\(R\\)-module homomorphism: \\(\\phi(rn + sn\') = (rn+sn\') + P = r(n+P) + s(n\'+P) = r\\phi(n) + s\\phi(n\')\\). It is surjective: any element of \\((N+P)/P\\) has form \\((n+p) + P = n + P = \\phi(n)\\). The kernel is \\(\\ker(\\phi) = \\{n \\in N : n \\in P\\} = N \\cap P\\). By the First Isomorphism Theorem, \\(N/(N \\cap P) \\cong \\operatorname{im}(\\phi) = (N+P)/P\\).'
                }
            ]
        },
        {
            id: 'ch04-sec06',
            title: 'Direct Sums and Direct Products',
            content: `
                <h2>Direct Sums and Direct Products</h2>

                <p>Direct sums and products provide ways to build new modules from old ones, generalizing the constructions for vector spaces.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 4.11 (External Direct Sum)</div>
                    <div class="env-body">
                        <p>Let \\(M_1, \\ldots, M_n\\) be \\(R\\)-modules. The <strong>external direct sum</strong> is the \\(R\\)-module</p>
                        \\[M_1 \\oplus \\cdots \\oplus M_n = \\{(m_1, \\ldots, m_n) : m_i \\in M_i\\}\\]
                        <p>with componentwise operations:</p>
                        \\[(m_1, \\ldots, m_n) + (m_1', \\ldots, m_n') = (m_1 + m_1', \\ldots, m_n + m_n')\\]
                        \\[r(m_1, \\ldots, m_n) = (rm_1, \\ldots, rm_n)\\]
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 4.12 (Internal Direct Sum)</div>
                    <div class="env-body">
                        <p>An \\(R\\)-module \\(M\\) is the <strong>internal direct sum</strong> of submodules \\(N_1, \\ldots, N_k\\), written</p>
                        \\[M = N_1 \\oplus \\cdots \\oplus N_k\\]
                        <p>if:</p>
                        <ol>
                            <li><strong>Sum (Join):</strong> \\(M = N_1 + \\cdots + N_k\\) (every \\(m \\in M\\) can be written as \\(m = n_1 + \\cdots + n_k\\) with \\(n_i \\in N_i\\))</li>
                            <li><strong>Independence:</strong> For each \\(i\\), \\(N_i \\cap (N_1 + \\cdots + N_{i-1} + N_{i+1} + \\cdots + N_k) = \\{0\\}\\)</li>
                        </ol>
                        <p>In this case, each \\(N_i\\) is called a <strong>direct summand</strong> of \\(M\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 4.11 (Characterization of Internal Direct Sums)</div>
                    <div class="env-body">
                        <p>Let \\(N_1, \\ldots, N_k\\) be submodules of \\(M\\). The following are equivalent:</p>
                        <ol>
                            <li>\\(M = N_1 \\oplus \\cdots \\oplus N_k\\) (internal direct sum)</li>
                            <li>Every \\(m \\in M\\) can be written <em>uniquely</em> as \\(m = n_1 + \\cdots + n_k\\) with \\(n_i \\in N_i\\)</li>
                            <li>\\(M = N_1 + \\cdots + N_k\\) and the only way to write \\(0\\) as a sum of elements from distinct \\(N_i\\) is trivially</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Sketch)</div>
                    <div class="env-body">
                        <p>(1⇒2) Suppose \\(m = n_1 + \\cdots + n_k = n_1' + \\cdots + n_k'\\). Then \\((n_1 - n_1') + \\cdots + (n_k - n_k') = 0\\). Write this as \\((n_1 - n_1') = -(n_2 - n_2') - \\cdots - (n_k - n_k')\\). The left side is in \\(N_1\\), the right in \\(N_2 + \\cdots + N_k\\), so both are in \\(N_1 \\cap (N_2 + \\cdots + N_k) = \\{0\\}\\). Thus \\(n_1 = n_1'\\). Similarly for other indices.</p>
                        <p>(2⇒3) Uniqueness of \\(0 = 0 + \\cdots + 0\\) gives (3).</p>
                        <p>(3⇒1) We need to show independence. If \\(n_1 + \\cdots + n_i + \\cdots + n_k = 0\\) with \\(n_j \\in N_j\\) and \\(n_i \\in N_i \\cap (\\sum_{j \\neq i} N_j)\\), then \\(n_i = 0\\) by (3), establishing the independence condition.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 4.13 (Complemented Submodule)</div>
                    <div class="env-body">
                        <p>A submodule \\(N\\) of \\(M\\) is <strong>complemented</strong> if there exists a submodule \\(P\\) such that \\(M = N \\oplus P\\). We call \\(P\\) a <strong>complement</strong> of \\(N\\) in \\(M\\).</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning: Not All Submodules Are Complemented!</div>
                    <div class="env-body">
                        <p>In a vector space, <em>every</em> subspace has a complement. For modules, this fails spectacularly. See Example 4.11 below.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 4.11 (Non-Complemented Submodule)</div>
                    <div class="env-body">
                        <p>Consider \\(\\mathbb{Z}\\) as a \\(\\mathbb{Z}\\)-module. The submodules are precisely \\(n\\mathbb{Z}\\) for \\(n \\geq 0\\). For \\(n > 1\\), the submodule \\(n\\mathbb{Z}\\) has no complement. Why? Suppose \\(\\mathbb{Z} = n\\mathbb{Z} \\oplus P\\) for some submodule \\(P\\). Since \\(P\\) is a submodule of \\(\\mathbb{Z}\\), we have \\(P = m\\mathbb{Z}\\) for some \\(m\\). Then \\(n\\mathbb{Z} \\cap m\\mathbb{Z} = \\operatorname{lcm}(n,m)\\mathbb{Z}\\). For this to equal \\(\\{0\\}\\), we need \\(\\operatorname{lcm}(n,m) = \\infty\\), which is impossible for nonzero \\(n, m\\). The only complemented submodules of \\(\\mathbb{Z}\\) are \\(\\{0\\}\\) and \\(\\mathbb{Z}\\) itself.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="direct-sum-viz"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 4.12 (Complements and Quotients)</div>
                    <div class="env-body">
                        <p>Let \\(N\\) be a complemented submodule of \\(M\\). Then all complements of \\(N\\) are isomorphic to \\(M/N\\) (and hence to each other).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Let \\(M = N \\oplus P\\). Define \\(\\pi: M \\to P\\) by \\(\\pi(n + p) = p\\) (this is well-defined by uniqueness of decomposition). Then \\(\\pi\\) is an \\(R\\)-module homomorphism with \\(\\ker(\\pi) = N\\) and \\(\\operatorname{im}(\\pi) = P\\). By the First Isomorphism Theorem, \\(M/N \\cong P\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <h3>Free Modules and Direct Sums</h3>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 4.7</div>
                    <div class="env-body">
                        <p>If \\(M_1, \\ldots, M_n\\) are free \\(R\\)-modules with bases \\(B_1, \\ldots, B_n\\), then \\(M_1 \\oplus \\cdots \\oplus M_n\\) is free with basis</p>
                        \\[\\{(b, 0, \\ldots, 0) : b \\in B_1\\} \\cup \\cdots \\cup \\{(0, \\ldots, 0, b) : b \\in B_n\\}\\]
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'direct-sum-viz',
                    title: 'Interactive: Direct Sum Decomposition',
                    description: 'Visualize decomposition of vectors in a direct sum',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 700, height: 400, scale: 40});

                        const v1 = viz.addDraggable('v1', 3, 1, viz.colors.blue, 8, () => draw());
                        const v2 = viz.addDraggable('v2', -1, 2, viz.colors.green, 8, () => draw());
                        const target = viz.addDraggable('target', 4, 5, viz.colors.orange, 10, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw subspaces
                            for (let t = -8; t <= 8; t += 0.5) {
                                viz.drawPoint(t * v1.x, t * v1.y, viz.colors.blue + '22', null, 2);
                                viz.drawPoint(t * v2.x, t * v2.y, viz.colors.green + '22', null, 2);
                            }

                            // Compute decomposition: target = a*v1 + b*v2
                            const det = v1.x * v2.y - v1.y * v2.x;
                            if (Math.abs(det) > 0.01) {
                                const a = (target.x * v2.y - target.y * v2.x) / det;
                                const b = (v1.x * target.y - v1.y * target.x) / det;

                                const comp1 = {x: a * v1.x, y: a * v1.y};
                                const comp2 = {x: b * v2.x, y: b * v2.y};

                                // Draw decomposition
                                viz.drawVector(0, 0, comp1.x, comp1.y, viz.colors.blue, a.toFixed(1) + 'v₁', 3);
                                viz.drawVector(comp1.x, comp1.y, comp1.x + comp2.x, comp1.y + comp2.y,
                                    viz.colors.green, b.toFixed(1) + 'v₂', 3);

                                // Draw parallelogram
                                viz.ctx.strokeStyle = viz.colors.white + '88';
                                viz.ctx.setLineDash([5, 5]);
                                viz.ctx.lineWidth = 1;
                                viz.ctx.beginPath();
                                viz.ctx.moveTo(...viz.toScreen(0, 0));
                                viz.ctx.lineTo(...viz.toScreen(comp1.x, comp1.y));
                                viz.ctx.lineTo(...viz.toScreen(target.x, target.y));
                                viz.ctx.lineTo(...viz.toScreen(comp2.x, comp2.y));
                                viz.ctx.closePath();
                                viz.ctx.stroke();
                                viz.ctx.setLineDash([]);

                                viz.drawText('t = ' + a.toFixed(2) + 'v₁ + ' + b.toFixed(2) + 'v₂',
                                    0, 7, viz.colors.orange, 14, 'center', 'top');
                            } else {
                                viz.drawText('v₁ and v₂ are not independent!',
                                    0, 7, viz.colors.red, 14, 'center', 'top');
                            }

                            viz.drawVector(0, 0, v1.x, v1.y, viz.colors.blue, 'v₁');
                            viz.drawVector(0, 0, v2.x, v2.y, viz.colors.green, 'v₂');
                            viz.drawVector(0, 0, target.x, target.y, viz.colors.orange, 't');
                            viz.drawDraggables();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that if \\(M = N \\oplus P\\) and \\(\\phi: M \\to M\\) is an \\(R\\)-module endomorphism with \\(\\phi^2 = \\phi\\) (idempotent), then \\(M = \\ker(\\phi) \\oplus \\operatorname{im}(\\phi)\\).',
                    hint: 'Show that \\(M = \\ker(\\phi) + \\operatorname{im}(\\phi)\\) and \\(\\ker(\\phi) \\cap \\operatorname{im}(\\phi) = \\{0\\}\\).',
                    solution: 'For any \\(m \\in M\\), write \\(m = \\phi(m) + (m - \\phi(m))\\). Since \\(\\phi^2 = \\phi\\), we have \\(\\phi(m) \\in \\operatorname{im}(\\phi)\\). Also, \\(\\phi(m - \\phi(m)) = \\phi(m) - \\phi^2(m) = 0\\), so \\(m - \\phi(m) \\in \\ker(\\phi)\\). Thus \\(M = \\ker(\\phi) + \\operatorname{im}(\\phi)\\). For independence: if \\(x \\in \\ker(\\phi) \\cap \\operatorname{im}(\\phi)\\), write \\(x = \\phi(m)\\) for some \\(m\\). Then \\(0 = \\phi(x) = \\phi^2(m) = \\phi(m) = x\\).'
                },
                {
                    question: 'Show that \\(\\mathbb{Z}_6 \\cong \\mathbb{Z}_2 \\oplus \\mathbb{Z}_3\\) as \\(\\mathbb{Z}\\)-modules.',
                    hint: 'Use the Chinese Remainder Theorem or construct an explicit isomorphism.',
                    solution: 'Define \\(\\phi: \\mathbb{Z}_6 \\to \\mathbb{Z}_2 \\oplus \\mathbb{Z}_3\\) by \\(\\phi(n) = (n \\bmod 2, n \\bmod 3)\\). This is a \\(\\mathbb{Z}\\)-module homomorphism. It is injective: if \\(\\phi(n) = (0, 0)\\), then \\(2 | n\\) and \\(3 | n\\), so \\(6 | n\\), thus \\(n = 0\\) in \\(\\mathbb{Z}_6\\). Since both modules have 6 elements, \\(\\phi\\) is bijective.'
                },
                {
                    question: 'Prove Proposition 4.7: A direct sum of free modules is free.',
                    hint: 'Show that the union of "embedded" bases forms a basis for the direct sum.',
                    solution: 'Let \\(B = \\{(b, 0, \\ldots, 0) : b \\in B_1\\} \\cup \\cdots \\cup \\{(0, \\ldots, 0, b) : b \\in B_n\\}\\). For spanning: any \\((m_1, \\ldots, m_n) \\in M_1 \\oplus \\cdots \\oplus M_n\\) has \\(m_i = \\sum r_{ij} b_{ij}\\) with \\(b_{ij} \\in B_i\\), so \\((m_1, \\ldots, m_n) = \\sum_i \\sum_j r_{ij} (0, \\ldots, b_{ij}, \\ldots, 0)\\). For linear independence: if \\(\\sum r_k e_k = 0\\) with \\(e_k \\in B\\), then looking at each component separately and using linear independence of each \\(B_i\\) gives \\(r_k = 0\\) for all \\(k\\).'
                }
            ]
        },
        {
            id: 'ch04-sec07',
            title: 'Summary: Modules vs. Vector Spaces',
            content: `
                <h2>Summary: Modules vs. Vector Spaces</h2>

                <p>We conclude this chapter by highlighting the key differences between modules and vector spaces.</p>

                <div class="env-block remark">
                    <div class="env-title">Properties That Fail for Modules</div>
                    <div class="env-body">
                        <p>Here is a list of properties enjoyed by vector spaces that <em>fail</em> for general modules over commutative rings with identity:</p>
                        <ol>
                            <li><strong>Submodules need not be complemented.</strong> There exist submodules with no complement.</li>
                            <li><strong>Submodules of finitely generated modules need not be finitely generated.</strong> (Example 4.5)</li>
                            <li><strong>There exist modules with no basis.</strong> (Example: \\(\\mathbb{Z}_n\\) for \\(n > 1\\))</li>
                            <li><strong>Minimal spanning sets need not be bases.</strong> (Example: \\(\\{1\\}\\) in \\(\\mathbb{Z}_n\\))</li>
                            <li><strong>Maximal linearly independent sets need not be bases.</strong></li>
                            <li><strong>Free modules can have non-free submodules.</strong></li>
                            <li><strong>Quotients of free modules need not be free.</strong> (Example: \\(\\mathbb{Z}/n\\mathbb{Z}\\))</li>
                            <li><strong>Nonzero elements can be "killed" by nonzero scalars</strong> (torsion).</li>
                            <li><strong>Linear dependence does not imply one element is in the span of the others.</strong></li>
                        </ol>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why Modules Are Harder Than Vector Spaces</div>
                    <div class="env-body">
                        <p>The root cause of these pathologies is the lack of multiplicative inverses in rings. In a field \\(F\\), every nonzero element has an inverse, allowing us to "divide" and "solve for" coefficients uniquely. In a ring \\(R\\), elements like zero-divisors and non-units prevent this. The equation \\(rm = 0\\) with \\(r \\neq 0\\) cannot be "solved" to conclude \\(m = 0\\) if \\(r\\) is a zero-divisor.</p>
                        <p>Despite these complications, modules are indispensable in modern algebra. They provide the natural language for homological algebra, representation theory, and algebraic geometry. Much of the beauty of module theory lies in identifying classes of rings (like PIDs) for which modules behave more like vector spaces.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="annihilator-viz"></div>

                <div class="env-block remark">
                    <div class="env-title">Looking Ahead</div>
                    <div class="env-body">
                        <p>In the next chapter, we will study special classes of modules—free modules and Noetherian modules—that have better properties. We will also prove the fundamental structure theorem for finitely generated modules over principal ideal domains, which generalizes the theory of finite-dimensional vector spaces and provides the foundation for canonical forms of linear operators.</p>
                    </div>
                </div>

                <h3>Key Takeaways</h3>

                <div class="env-block definition">
                    <div class="env-title">Essential Concepts from Chapter 4</div>
                    <div class="env-body">
                        <ul>
                            <li><strong>Module:</strong> An abelian group with scalar multiplication by a ring</li>
                            <li><strong>Submodule:</strong> A subgroup closed under scalar multiplication</li>
                            <li><strong>Torsion element:</strong> \\(m \\neq 0\\) with \\(rm = 0\\) for some \\(r \\neq 0\\)</li>
                            <li><strong>Annihilator:</strong> \\(\\operatorname{ann}(m) = \\{r : rm = 0\\}\\) (an ideal)</li>
                            <li><strong>Free module:</strong> Has a basis (linearly independent spanning set)</li>
                            <li><strong>Direct sum:</strong> \\(M = N_1 \\oplus N_2\\) means every \\(m\\) has unique decomposition \\(m = n_1 + n_2\\)</li>
                            <li><strong>Isomorphism theorems:</strong> Parallel those for vector spaces</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'annihilator-viz',
                    title: 'Interactive: Annihilators in \\(\\mathbb{Z}_{24}\\)',
                    description: 'Explore the relationship between elements and their annihilators',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 700, height: 450, scale: 1});

                        const elemSlider = VizEngine.createSlider(controls, 'Element', 0, 23, 6, 1, () => draw());

                        function gcd(a, b) {
                            while (b !== 0) {
                                let t = b;
                                b = a % b;
                                a = t;
                            }
                            return a;
                        }

                        function draw() {
                            viz.clear();

                            const n = 24;
                            const m = parseInt(elemSlider.value);
                            const g = gcd(m, n);
                            const annSize = g; // Annihilator is (n/g)Z, smallest nonzero element is n/g... wait
                            // Actually: ann(m) in Z_n consists of k such that km ≡ 0 (mod n)
                            // This means n | km, i.e., (n/gcd(n,m)) | k
                            const annGen = (m === 0) ? 1 : n / g;

                            // Draw ring Z_24 as a circle
                            const cx = 200, cy = 225, radius = 120;

                            for (let k = 0; k < n; k++) {
                                const angle = -Math.PI/2 + (2 * Math.PI * k / n);
                                const x = cx + radius * Math.cos(angle);
                                const y = cy + radius * Math.sin(angle);

                                const isSelected = (k === m);
                                const isInAnn = (k * m) % n === 0;

                                let color = viz.colors.blue + '88';
                                if (isSelected) color = viz.colors.orange;
                                else if (isInAnn) color = viz.colors.red + 'aa';

                                viz.ctx.fillStyle = color;
                                viz.ctx.beginPath();
                                viz.ctx.arc(x, y, isSelected ? 14 : 8, 0, 2*Math.PI);
                                viz.ctx.fill();

                                if (k % 2 === 0) {
                                    viz.screenText(k.toString(), x, y, viz.colors.white, 10, 'center', 'middle');
                                }
                            }

                            viz.screenText('ℤ₂₄', cx, cy, viz.colors.white, 18, 'center', 'middle');

                            // Info panel
                            const infoX = 450;
                            let infoY = 50;

                            viz.screenText('Element m = ' + m, infoX, infoY, viz.colors.orange, 18, 'left', 'top');
                            infoY += 35;

                            viz.screenText('gcd(m, 24) = ' + g, infoX, infoY, viz.colors.teal, 14, 'left', 'top');
                            infoY += 30;

                            viz.screenText('Annihilator in ℤ:', infoX, infoY, viz.colors.white, 14, 'left', 'top');
                            infoY += 25;
                            viz.screenText('ann(m) = ' + annGen + 'ℤ', infoX, infoY, viz.colors.red, 14, 'left', 'top');
                            infoY += 25;
                            viz.screenText('= {..., -' + annGen + ', 0, ' + annGen + ', ' + (2*annGen) + ', ...}',
                                infoX, infoY, viz.colors.text, 11, 'left', 'top');
                            infoY += 35;

                            viz.screenText('Annihilators mod 24:', infoX, infoY, viz.colors.white, 14, 'left', 'top');
                            infoY += 25;

                            const annElements = [];
                            for (let k = 0; k < n; k++) {
                                if ((k * m) % n === 0) annElements.push(k);
                            }
                            viz.screenText('{' + annElements.join(', ') + '}', infoX, infoY, viz.colors.red, 12, 'left', 'top');
                            infoY += 30;
                            viz.screenText('(shown in red on circle)', infoX, infoY, viz.colors.text, 11, 'left', 'top');

                            infoY += 40;
                            if (m === 0) {
                                viz.screenText('m = 0: all scalars annihilate', infoX, infoY, viz.colors.yellow, 12, 'left', 'top');
                            } else if (g === 1) {
                                viz.screenText('Torsion-free: only 0 annihilates', infoX, infoY, viz.colors.green, 12, 'left', 'top');
                            } else {
                                viz.screenText('Torsion element!', infoX, infoY, viz.colors.red, 14, 'left', 'top');
                                infoY += 25;
                                viz.screenText('Order = ' + annGen, infoX, infoY, viz.colors.orange, 12, 'left', 'top');
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that if \\(R\\) is a field, then every \\(R\\)-module is free.',
                    hint: 'Show that every module has a basis using the standard basis extension argument.',
                    solution: "Since \\(R\\) is a field, every \\(R\\)-module is a vector space over \\(R\\). By the standard theory of vector spaces, every vector space has a basis (using Zorn's lemma for infinite-dimensional spaces). Thus every \\(R\\)-module is free."
                },
                {
                    question: 'Find a free \\(\\mathbb{Z}\\)-module that has a submodule that is not free. (This requires a clever construction beyond the examples in the text.)',
                    hint: 'Consider \\(M = \\mathbb{Q}\\) as a \\(\\mathbb{Z}\\)-module and find a non-free submodule.',
                    solution: "Actually, every submodule of a free \\(\\mathbb{Z}\\)-module is free (this is a theorem for modules over PIDs). A correct example: Let \\(M = \\mathbb{Z}[x]\\) (polynomials with integer coefficients) as a module over \\(R = \\mathbb{Z}[x]\\) itself. Then \\(M\\) is free (rank 1). Consider the submodule \\(N = \\langle 2, x \\rangle\\). This is not free: it's not cyclic (cannot be generated by one element), but if it had a two-element basis \\(\\{f, g\\}\\), then \\(2 = af + bg\\) and \\(x = cf + dg\\) for some \\(a,b,c,d \\in \\mathbb{Z}[x]\\), leading to contradictions (checking degrees)."
                },
                {
                    question: 'Show that the \\(\\mathbb{Z}\\)-module \\(\\mathbb{Q}\\) (rational numbers under addition, with scalar multiplication by integers) has no basis.',
                    hint: 'Show that every finite subset is linearly dependent over \\(\\mathbb{Z}\\), but \\(\\mathbb{Q}\\) is not finitely generated.',
                    solution: "Suppose \\(q_1, \\ldots, q_n \\in \\mathbb{Q}\\) are linearly independent over \\(\\mathbb{Z}\\). Write \\(q_i = a_i/b_i\\) with \\(a_i, b_i \\in \\mathbb{Z}\\), \\(b_i > 0\\). Let \\(b = b_1 \\cdots b_n\\). Then \\(bq_i \\in \\mathbb{Z}\\) for all \\(i\\). Consider \\((bq_1)q_1 - (bq_1^2) \\cdot 1 = 0\\)... Actually, simpler: any \\(q_1, q_2\\) with \\(q_1 = a/b\\) satisfy \\(b q_1 - a \\cdot 1 = 0\\), contradicting independence unless we include 1. But \\(\\langle 1 \\rangle_\\mathbb{Z} = \\mathbb{Z} \\neq \\mathbb{Q}\\). A rigorous argument: \\(\\mathbb{Q}\\) is divisible (for any \\(q \\in \\mathbb{Q}\\) and \\(n \\neq 0\\), there exists \\(q' \\in \\mathbb{Q}\\) with \\(nq' = q\\)). Free \\(\\mathbb{Z}\\)-modules are not divisible (in \\(\\mathbb{Z}\\), we cannot solve \\(2x = 1\\)). Thus \\(\\mathbb{Q}\\) is not free."
                }
            ]
        }
    ]
});
