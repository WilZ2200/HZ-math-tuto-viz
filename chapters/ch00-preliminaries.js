window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch00',
    number: 0,
    title: 'Preliminaries',
    subtitle: 'Foundational concepts in set theory, functions, and algebraic structures',
    sections: [
        {
            id: 'ch00-sec01',
            title: 'Sets, Functions, and Composition',
            content: `
                <h2>Sets, Functions, and Composition</h2>

                <p>We begin by establishing notation and key definitions for functions, which serve as the foundation for understanding linear transformations.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.1 (Function)</div>
                    <div class="env-body">
                        <p>Let \\(f \\colon S \\to T\\) be a function from a set \\(S\\) to a set \\(T\\).</p>
                        <ol>
                            <li>The <strong>domain</strong> of \\(f\\) is the set \\(S\\) and the <strong>range</strong> of \\(f\\) is \\(T\\).</li>
                            <li>The <strong>image</strong> of \\(f\\) is the set \\(\\operatorname{im}(f) = \\{f(x) \\mid x \\in S\\}\\).</li>
                            <li>\\(f\\) is <strong>injective</strong> (one-to-one), or an <strong>injection</strong>, if \\(x \\neq y \\Rightarrow f(x) \\neq f(y)\\).</li>
                            <li>\\(f\\) is <strong>surjective</strong> (onto \\(T\\)), or a <strong>surjection</strong>, if \\(\\operatorname{im}(f) = T\\).</li>
                            <li>\\(f\\) is <strong>bijective</strong>, or a <strong>bijection</strong>, if it is both injective and surjective.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Think of an <strong>injection</strong> as a function where different inputs always produce different outputs—no collisions. A <strong>surjection</strong> covers the entire target set—nothing is left out. A <strong>bijection</strong> is a perfect pairing: each element of \\(S\\) matches with exactly one element of \\(T\\), and vice versa. This is the mathematical formalization of "same size."</p>
                    </div>
                </div>

                <p>If \\(f \\colon S \\to T\\) is injective, then its inverse \\(f^{-1} \\colon \\operatorname{im}(f) \\to S\\) exists and is well-defined as a function on \\(\\operatorname{im}(f)\\).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.2 (Preimage and Image of Subsets)</div>
                    <div class="env-body">
                        <p>Let \\(f \\colon S \\to T\\). If \\(A \\subseteq S\\) and \\(B \\subseteq T\\), we set:</p>
                        \\[f(A) = \\{f(x) \\mid x \\in A\\}\\]
                        \\[f^{-1}(B) = \\{x \\in S \\mid f(x) \\in B\\}\\]
                        <p>Note that \\(f^{-1}(B)\\) is defined even if \\(f\\) is not injective.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.3 (Restriction and Extension)</div>
                    <div class="env-body">
                        <p>Let \\(f \\colon S \\to T\\). If \\(A \\subseteq S\\), the <strong>restriction</strong> of \\(f\\) to \\(A\\) is the function \\(f|_A \\colon A \\to T\\) defined by \\(f|_A(x) = f(x)\\) for all \\(x \\in A\\).</p>
                        <p>If \\(S \\subseteq U\\), then an <strong>extension</strong> of \\(f\\) to \\(U\\) is a function \\(g \\colon U \\to T\\) for which \\(g|_S = f\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="function-types-viz"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.4 (Function Composition)</div>
                    <div class="env-body">
                        <p>If \\(f \\colon S \\to T\\) and \\(g \\colon T \\to U\\), the <strong>composition</strong> \\(g \\circ f \\colon S \\to U\\) is defined by:</p>
                        \\[(g \\circ f)(x) = g(f(x))\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.1 (Properties of Composition)</div>
                    <div class="env-body">
                        <ol>
                            <li>Composition is associative: \\((h \\circ g) \\circ f = h \\circ (g \\circ f)\\).</li>
                            <li>If \\(f\\) and \\(g\\) are injective, then \\(g \\circ f\\) is injective.</li>
                            <li>If \\(f\\) and \\(g\\) are surjective, then \\(g \\circ f\\) is surjective.</li>
                            <li>If \\(f\\) and \\(g\\) are bijective, then \\(g \\circ f\\) is bijective and \\((g \\circ f)^{-1} = f^{-1} \\circ g^{-1}\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>(1)</strong> For any \\(x\\) in the domain: \\[((h \\circ g) \\circ f)(x) = (h \\circ g)(f(x)) = h(g(f(x)))\\]
                        \\[(h \\circ (g \\circ f))(x) = h((g \\circ f)(x)) = h(g(f(x)))\\]</p>
                        <p><strong>(2)</strong> Suppose \\((g \\circ f)(x) = (g \\circ f)(y)\\). Then \\(g(f(x)) = g(f(y))\\). Since \\(g\\) is injective, \\(f(x) = f(y)\\). Since \\(f\\) is injective, \\(x = y\\).</p>
                        <p><strong>(3)</strong> Let \\(z \\in U\\). Since \\(g\\) is surjective, there exists \\(y \\in T\\) with \\(g(y) = z\\). Since \\(f\\) is surjective, there exists \\(x \\in S\\) with \\(f(x) = y\\). Thus \\((g \\circ f)(x) = g(f(x)) = g(y) = z\\).</p>
                        <p><strong>(4)</strong> Follows from (2) and (3). For the inverse: \\((f^{-1} \\circ g^{-1})(g(f(x))) = f^{-1}(g^{-1}(g(f(x)))) = f^{-1}(f(x)) = x\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="composition-viz"></div>

                <div class="env-block example">
                    <div class="env-title">Example 0.1</div>
                    <div class="env-body">
                        <p>The set \\(\\mathcal{S}\\) of all bijective functions from a set \\(S\\) to \\(S\\) is a group under composition of functions. This is called the <strong>symmetric group</strong> on \\(S\\). When \\(S = \\{1, 2, \\ldots, n\\}\\), we denote this group by \\(S_n\\), which has order \\(n!\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'function-types-viz',
                    title: 'Interactive: Function Types',
                    description: 'Drag points in the domain to see how different function types behave',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 700, height: 400, scale: 40});

                        let funcType = 'bijection'; // bijection, injection, surjection, general

                        // Domain points
                        const domainY = [3, 1, -1, -3];
                        const domain = domainY.map((y, i) => ({
                            id: `d${i}`,
                            x: -6,
                            y: y,
                            label: `x${i+1}`
                        }));

                        // Codomain points
                        const codomainY = [3, 1, -1, -3];
                        const codomain = codomainY.map((y, i) => ({
                            id: `c${i}`,
                            x: 6,
                            y: y,
                            label: `y${i+1}`
                        }));

                        function getMappings() {
                            switch(funcType) {
                                case 'bijection':
                                    return [0, 1, 2, 3]; // x1->y1, x2->y2, etc
                                case 'injection':
                                    return [0, 1, 2, 2]; // x3,x4 both map to y3
                                case 'surjection':
                                    return [0, 0, 2, 3]; // y2 not hit
                                case 'general':
                                    return [1, 1, 1, 3]; // y1, y3 not hit
                            }
                        }

                        function draw() {
                            viz.clear();
                            viz.drawAxes();

                            // Draw domain label
                            viz.drawText('Domain S', -6, 5, viz.colors.white, 14, 'center');
                            viz.drawText('Codomain T', 6, 5, viz.colors.white, 14, 'center');

                            // Draw points
                            domain.forEach(d => {
                                viz.drawPoint(d.x, d.y, viz.colors.blue, d.label, 6);
                            });
                            codomain.forEach(c => {
                                viz.drawPoint(c.x, c.y, viz.colors.orange, c.label, 6);
                            });

                            // Draw mappings
                            const mappings = getMappings();
                            mappings.forEach((targetIdx, sourceIdx) => {
                                viz.drawSegment(
                                    domain[sourceIdx].x, domain[sourceIdx].y,
                                    codomain[targetIdx].x, codomain[targetIdx].y,
                                    viz.colors.teal + '88', 2, false
                                );
                            });

                            // Draw status
                            let status = '';
                            const image = new Set(mappings);
                            const isInjective = mappings.length === image.size;
                            const isSurjective = image.size === codomain.length;

                            if (isInjective && isSurjective) status = 'Bijection (1-1 and onto)';
                            else if (isInjective) status = 'Injection (1-1, not onto)';
                            else if (isSurjective) status = 'Surjection (onto, not 1-1)';
                            else status = 'General function';

                            viz.drawText(status, 0, -5.5, viz.colors.yellow, 16, 'center');
                        }

                        const btnBij = VizEngine.createButton(controls, 'Bijection', () => {
                            funcType = 'bijection';
                            draw();
                        });
                        const btnInj = VizEngine.createButton(controls, 'Injection', () => {
                            funcType = 'injection';
                            draw();
                        });
                        const btnSur = VizEngine.createButton(controls, 'Surjection', () => {
                            funcType = 'surjection';
                            draw();
                        });
                        const btnGen = VizEngine.createButton(controls, 'General', () => {
                            funcType = 'general';
                            draw();
                        });

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'composition-viz',
                    title: 'Interactive: Function Composition',
                    description: 'Visualize how composition works: (g ∘ f)(x) = g(f(x))',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 800, height: 400, scale: 40});

                        let selectedX = 0;

                        function f(x) {
                            return 0.3 * x;
                        }

                        function g(y) {
                            return 0.5 * y * y;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw f: S -> T (left to middle)
                            viz.ctx.setLineDash([5, 5]);
                            for (let x = -8; x <= 8; x += 0.1) {
                                const y = f(x);
                                if (Math.abs(y) <= 7) {
                                    viz.drawPoint(x - 5, y, viz.colors.blue + '44', null, 2);
                                }
                            }
                            viz.ctx.setLineDash([]);

                            // Draw g: T -> U (middle to right)
                            viz.ctx.setLineDash([5, 5]);
                            for (let y = -6; y <= 6; y += 0.1) {
                                const z = g(y);
                                if (Math.abs(z) <= 7) {
                                    viz.drawPoint(y, z + 0, viz.colors.orange + '44', null, 2);
                                }
                            }
                            viz.ctx.setLineDash([]);

                            // Draw composition g ∘ f
                            viz.ctx.strokeStyle = viz.colors.green;
                            viz.ctx.lineWidth = 3;
                            viz.ctx.beginPath();
                            let first = true;
                            for (let x = -8; x <= 8; x += 0.05) {
                                const z = g(f(x));
                                if (Math.abs(z) <= 7) {
                                    const [px, py] = viz.toScreen(x + 5, z);
                                    if (first) {
                                        viz.ctx.moveTo(px, py);
                                        first = false;
                                    } else {
                                        viz.ctx.lineTo(px, py);
                                    }
                                }
                            }
                            viz.ctx.stroke();

                            // Draw selected point flow
                            const y = f(selectedX);
                            const z = g(y);

                            // x in domain
                            viz.drawPoint(selectedX - 5, 0, viz.colors.white, null, 8);
                            viz.drawText(`x=${selectedX.toFixed(1)}`, selectedX - 5, -0.8, viz.colors.white, 12, 'center');

                            // f(x) in middle set
                            viz.drawPoint(0, y, viz.colors.blue, null, 8);
                            viz.drawText(`f(x)=${y.toFixed(2)}`, 1, y, viz.colors.blue, 12, 'left');
                            viz.drawSegment(selectedX - 5, 0, 0, y, viz.colors.blue, 2, false);

                            // g(f(x)) in codomain
                            viz.drawPoint(selectedX + 5, z, viz.colors.green, null, 8);
                            viz.drawText(`(g∘f)(x)=${z.toFixed(2)}`, selectedX + 5, z + 0.8, viz.colors.green, 12, 'center');

                            // g(y) visual
                            viz.drawSegment(0, y, selectedX + 5, z, viz.colors.orange, 2, true);

                            // Labels
                            viz.drawText('f', -2.5, 4, viz.colors.blue, 16, 'center');
                            viz.drawText('g', 2.5, 4, viz.colors.orange, 16, 'center');
                            viz.drawText('g ∘ f', selectedX + 5, -6, viz.colors.green, 16, 'center');
                        }

                        const slider = VizEngine.createSlider(controls, 'x value', -4, 4, 0, 0.1, (val) => {
                            selectedX = val;
                            draw();
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that if \\(f \\colon S \\to T\\) is a bijection, then \\(f^{-1} \\colon T \\to S\\) is also a bijection.',
                    hint: 'Show that \\(f^{-1}\\) is both injective and surjective using the properties of \\(f\\).',
                    solution: 'Since \\(f\\) is a bijection, \\(f^{-1}\\) exists on all of \\(T\\). <strong>Injective:</strong> If \\(f^{-1}(y_1) = f^{-1}(y_2) = x\\), then \\(f(x) = y_1\\) and \\(f(x) = y_2\\), so \\(y_1 = y_2\\). <strong>Surjective:</strong> For any \\(x \\in S\\), let \\(y = f(x) \\in T\\). Then \\(f^{-1}(y) = x\\). Thus \\(f^{-1}\\) is a bijection.'
                },
                {
                    question: 'Show that composition of functions is associative but not commutative in general.',
                    hint: 'For associativity, evaluate both sides at an arbitrary point. For commutativity, find a counterexample.',
                    solution: '<strong>Associativity:</strong> Proven in Theorem 0.1. <strong>Not commutative:</strong> Let \\(f(x) = x + 1\\) and \\(g(x) = 2x\\). Then \\((g \\circ f)(x) = g(x+1) = 2(x+1) = 2x + 2\\), but \\((f \\circ g)(x) = f(2x) = 2x + 1\\). Since \\(2x + 2 \\neq 2x + 1\\), we have \\(g \\circ f \\neq f \\circ g\\).'
                },
                {
                    question: 'Prove that if \\(g \\circ f\\) is injective, then \\(f\\) must be injective.',
                    hint: 'Assume \\(f(x_1) = f(x_2)\\) and use the injectivity of \\(g \\circ f\\).',
                    solution: 'Suppose \\(f(x_1) = f(x_2)\\). Then \\((g \\circ f)(x_1) = g(f(x_1)) = g(f(x_2)) = (g \\circ f)(x_2)\\). Since \\(g \\circ f\\) is injective, we must have \\(x_1 = x_2\\). Therefore \\(f\\) is injective.'
                }
            ]
        },
        {
            id: 'ch00-sec02',
            title: 'Equivalence Relations and Partitions',
            content: `
                <h2>Equivalence Relations and Partitions</h2>

                <p>Equivalence relations formalize the notion of "sameness" and play a crucial role in linear algebra, particularly in understanding similarity of matrices and quotient spaces.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.5 (Equivalence Relation)</div>
                    <div class="env-body">
                        <p>Let \\(S\\) be a nonempty set. A binary relation \\(\\sim\\) on \\(S\\) is called an <strong>equivalence relation</strong> on \\(S\\) if it satisfies:</p>
                        <ol>
                            <li><strong>(Reflexivity)</strong> \\(x \\sim x\\) for all \\(x \\in S\\).</li>
                            <li><strong>(Symmetry)</strong> \\(x \\sim y \\Rightarrow y \\sim x\\) for all \\(x, y \\in S\\).</li>
                            <li><strong>(Transitivity)</strong> \\(x \\sim y\\) and \\(y \\sim z \\Rightarrow x \\sim z\\) for all \\(x, y, z \\in S\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.6 (Equivalence Class)</div>
                    <div class="env-body">
                        <p>Let \\(\\sim\\) be an equivalence relation on \\(S\\). For \\(x \\in S\\), the <strong>equivalence class</strong> of \\(x\\) is:</p>
                        \\[[x] = \\{y \\in S \\mid y \\sim x\\}\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.2 (Properties of Equivalence Classes)</div>
                    <div class="env-body">
                        <p>Let \\(\\sim\\) be an equivalence relation on \\(S\\). Then:</p>
                        <ol>
                            <li>\\(x \\in [x]\\) and \\(y \\in [x] \\Leftrightarrow [y] = [x]\\).</li>
                            <li>For any \\(x, y \\in S\\), either \\([x] = [y]\\) or \\([x] \\cap [y] = \\emptyset\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>(1)</strong> By reflexivity, \\(x \\sim x\\), so \\(x \\in [x]\\). If \\(y \\in [x]\\), then \\(y \\sim x\\). We show \\([y] = [x]\\). If \\(z \\in [y]\\), then \\(z \\sim y\\). By symmetry, \\(x \\sim y\\). By transitivity, \\(z \\sim x\\), so \\(z \\in [x]\\). Thus \\([y] \\subseteq [x]\\). Similarly, \\([x] \\subseteq [y]\\), so \\([y] = [x]\\).</p>
                        <p><strong>(2)</strong> Suppose \\([x] \\cap [y] \\neq \\emptyset\\), so there exists \\(z \\in [x] \\cap [y]\\). Then \\(z \\sim x\\) and \\(z \\sim y\\). By symmetry, \\(x \\sim z\\). By transitivity, \\(x \\sim y\\). By part (1), since \\(x \\in [x]\\) and \\(x \\sim y\\), we have \\([x] = [y]\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="equiv-classes-viz"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.7 (Partition)</div>
                    <div class="env-body">
                        <p>A <strong>partition</strong> of a nonempty set \\(S\\) is a collection \\(\\{A_1, \\ldots, A_n\\}\\) of nonempty subsets of \\(S\\), called the <strong>blocks</strong> of the partition, for which:</p>
                        <ol>
                            <li>\\(A_i \\cap A_j = \\emptyset\\) for all \\(i \\neq j\\).</li>
                            <li>\\(S = A_1 \\cup \\cdots \\cup A_n\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.3 (Equivalence Relations ↔ Partitions)</div>
                    <div class="env-body">
                        <ol>
                            <li>Let \\(\\sim\\) be an equivalence relation on \\(S\\). Then the set of distinct equivalence classes forms a partition of \\(S\\).</li>
                            <li>Conversely, if \\(\\mathcal{P}\\) is a partition of \\(S\\), the binary relation \\(\\sim\\) defined by "\\(x \\sim y\\) if \\(x\\) and \\(y\\) lie in the same block of \\(\\mathcal{P}\\)" is an equivalence relation on \\(S\\), whose equivalence classes are the blocks of \\(\\mathcal{P}\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>(1)</strong> By Theorem 0.2, every element \\(x \\in S\\) belongs to exactly one equivalence class (its own). The classes are pairwise disjoint and their union is \\(S\\).</p>
                        <p><strong>(2)</strong> <em>Reflexivity:</em> Every \\(x\\) is in some block \\(A_i\\), so \\(x \\sim x\\). <em>Symmetry:</em> If \\(x \\sim y\\), they're in the same block, so \\(y \\sim x\\). <em>Transitivity:</em> If \\(x \\sim y\\) and \\(y \\sim z\\), then \\(x, y\\) are in block \\(A_i\\) and \\(y, z\\) are in block \\(A_j\\). Since \\(y \\in A_i \\cap A_j\\) and blocks are disjoint, \\(A_i = A_j\\), so \\(x \\sim z\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>This theorem establishes a fundamental correspondence: <strong>equivalence relations are the same thing as partitions</strong>. Every way of declaring elements "equivalent" corresponds to a way of breaking the set into non-overlapping pieces. This is crucial in linear algebra: when we mod out by a subspace, we're partitioning the vector space into equivalence classes (cosets).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.8 (Invariants and Canonical Forms)</div>
                    <div class="env-body">
                        <p>Let \\(\\sim\\) be an equivalence relation on \\(S\\). A function \\(f \\colon S \\to T\\) is called an <strong>invariant</strong> of \\(\\sim\\) if it is constant on equivalence classes:</p>
                        \\[x \\sim y \\Rightarrow f(x) = f(y)\\]
                        <p>It is a <strong>complete invariant</strong> if:</p>
                        \\[x \\sim y \\Leftrightarrow f(x) = f(y)\\]
                        <p>A subset \\(C \\subseteq S\\) is a set of <strong>canonical forms</strong> for \\(\\sim\\) if each equivalence class contains exactly one element of \\(C\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 0.2 (Row Equivalence)</div>
                    <div class="env-body">
                        <p>Row equivalence is an equivalence relation on \\(M_{m,n}(F)\\). Two matrices \\(A, B\\) are row equivalent if one can be obtained from the other by elementary row operations. The set of matrices in <strong>reduced row echelon form</strong> is a set of canonical forms for row equivalence, since every matrix is row equivalent to a unique RREF matrix. The <strong>rank</strong> is an invariant (but not complete).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 0.3 (Similarity of Matrices)</div>
                    <div class="env-body">
                        <p>Two matrices \\(A, B \\in M_n(F)\\) are <strong>similar</strong> if there exists an invertible matrix \\(P\\) such that \\(A = P B P^{-1}\\). Similarity is an equivalence relation. The <strong>determinant</strong> and <strong>trace</strong> are invariants for similarity, but they do not form a complete system of invariants. Finding canonical forms for similarity (like Jordan normal form) is a central goal of this book.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'equiv-classes-viz',
                    title: 'Interactive: Equivalence Classes as Partitions',
                    description: 'Click to add points. Points with the same color are equivalent.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 500, scale: 40});

                        const points = [
                            {x: -4, y: 3, class: 0},
                            {x: -2, y: 2.5, class: 0},
                            {x: -3, y: 1, class: 0},
                            {x: 2, y: 3.5, class: 1},
                            {x: 3, y: 2, class: 1},
                            {x: 1, y: 1.5, class: 1},
                            {x: -2, y: -2, class: 2},
                            {x: -1, y: -3, class: 2},
                            {x: 3, y: -2.5, class: 3},
                            {x: 4, y: -3.5, class: 3},
                            {x: 5, y: -1.5, class: 3}
                        ];

                        const classColors = [viz.colors.blue, viz.colors.orange, viz.colors.green, viz.colors.purple];

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw convex hulls for each equivalence class
                            for (let c = 0; c < 4; c++) {
                                const classPoints = points.filter(p => p.class === c).map(p => [p.x, p.y]);
                                if (classPoints.length >= 3) {
                                    // Simple convex hull visualization (bounding box for simplicity)
                                    const xs = classPoints.map(p => p[0]);
                                    const ys = classPoints.map(p => p[1]);
                                    const minX = Math.min(...xs) - 0.5;
                                    const maxX = Math.max(...xs) + 0.5;
                                    const minY = Math.min(...ys) - 0.5;
                                    const maxY = Math.max(...ys) + 0.5;

                                    viz.drawPolygon([
                                        [minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY]
                                    ], classColors[c] + '22', classColors[c] + '88', 2);
                                }
                            }

                            // Draw points
                            points.forEach((p, i) => {
                                viz.drawPoint(p.x, p.y, classColors[p.class], `${i+1}`, 7);
                            });

                            // Draw labels
                            viz.drawText('Equivalence Classes (colored regions)', 0, 6, viz.colors.white, 14, 'center');
                            viz.drawText('Each region = one equivalence class', 0, -6, viz.colors.text, 12, 'center');
                            viz.drawText('Points in same region are equivalent', 0, -7, viz.colors.text, 12, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that congruence modulo \\(n\\) on \\(\\mathbb{Z}\\) (defined by \\(a \\sim b\\) iff \\(n \\mid (a-b)\\)) is an equivalence relation.',
                    hint: 'Check reflexivity, symmetry, and transitivity using divisibility properties.',
                    solution: '<strong>Reflexivity:</strong> \\(n \\mid (a - a) = 0\\), so \\(a \\sim a\\). <strong>Symmetry:</strong> If \\(n \\mid (a - b)\\), then \\(a - b = nk\\), so \\(b - a = n(-k)\\), thus \\(n \\mid (b - a)\\). <strong>Transitivity:</strong> If \\(n \\mid (a - b)\\) and \\(n \\mid (b - c)\\), then \\(a - b = nk\\) and \\(b - c = n\\ell\\). Adding: \\(a - c = n(k + \\ell)\\), so \\(n \\mid (a - c)\\).'
                },
                {
                    question: 'Show that the rank of a matrix is an invariant for the equivalence relation of matrix equivalence (\\(A \\sim B\\) if \\(A = PBQ\\) for invertible \\(P, Q\\)).',
                    hint: 'Use the fact that elementary row and column operations preserve rank.',
                    solution: 'Elementary row operations correspond to left multiplication by invertible matrices, and elementary column operations correspond to right multiplication by invertible matrices. Since elementary operations preserve rank, and \\(A = PBQ\\) where \\(P, Q\\) are products of elementary matrices, we have \\(\\operatorname{rank}(A) = \\operatorname{rank}(B)\\). Thus rank is an invariant.'
                },
                {
                    question: 'Prove that the set of monic polynomials in \\(F[x]\\) is a set of canonical forms for the equivalence relation \\(p(x) \\sim q(x)\\) iff \\(p(x) = cq(x)\\) for some nonzero \\(c \\in F\\).',
                    hint: 'Show that each equivalence class contains exactly one monic polynomial.',
                    solution: 'Each equivalence class consists of all scalar multiples of a given polynomial. If \\(p(x)\\) has leading coefficient \\(a \\neq 0\\), then \\(a^{-1}p(x)\\) is the unique monic polynomial in the equivalence class of \\(p(x)\\). Every polynomial is equivalent to exactly one monic polynomial.'
                }
            ]
        },
        {
            id: 'ch00-sec03',
            title: 'Partial Orders and Zorn\'s Lemma',
            content: `
                <h2>Partial Orders and Zorn's Lemma</h2>

                <p>Partial orders generalize the familiar notion of "less than or equal to" and provide the framework for Zorn's Lemma, which guarantees the existence of bases in vector spaces.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.9 (Partially Ordered Set)</div>
                    <div class="env-body">
                        <p>A <strong>partially ordered set</strong> (or <strong>poset</strong>) is a pair \\((P, \\leq)\\) where \\(P\\) is a nonempty set and \\(\\leq\\) is a binary relation called a <strong>partial order</strong> with the following properties:</p>
                        <ol>
                            <li><strong>(Reflexivity)</strong> For all \\(x \\in P\\), \\(x \\leq x\\).</li>
                            <li><strong>(Antisymmetry)</strong> For all \\(x, y \\in P\\), if \\(x \\leq y\\) and \\(y \\leq x\\), then \\(x = y\\).</li>
                            <li><strong>(Transitivity)</strong> For all \\(x, y, z \\in P\\), if \\(x \\leq y\\) and \\(y \\leq z\\), then \\(x \\leq z\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Note the difference between <strong>partial order</strong> (antisymmetric) and <strong>equivalence relation</strong> (symmetric). In a poset, it's possible that \\(x \\not\\leq y\\) and \\(y \\not\\leq x\\) (elements are <strong>incomparable</strong>).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.10 (Maximal and Maximum Elements)</div>
                    <div class="env-body">
                        <p>Let \\(P\\) be a partially ordered set.</p>
                        <ol>
                            <li>The <strong>maximum</strong> (or <strong>top</strong>) element of \\(P\\), if it exists, is an element \\(M \\in P\\) such that \\(x \\leq M\\) for all \\(x \\in P\\).</li>
                            <li>A <strong>maximal</strong> element is an element \\(m \\in P\\) such that there is no \\(x \\in P\\) with \\(m < x\\) (i.e., \\(m \\leq x\\) and \\(m \\neq x\\)).</li>
                        </ol>
                        <p>Similarly, the <strong>minimum</strong> (or <strong>bottom</strong>) element and <strong>minimal</strong> elements are defined dually.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body">
                        <p>A maximum element is unique (if it exists) and is also maximal. However, a poset can have multiple maximal elements, and a maximal element need not be a maximum. For example, in \\(P = \\{2, 3, 4, 6\\}\\) under divisibility, both 4 and 6 are maximal, but neither is maximum.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="hasse-diagram-viz"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.11 (Chain and Upper Bound)</div>
                    <div class="env-body">
                        <p>Let \\(P\\) be a partially ordered set.</p>
                        <ol>
                            <li>A <strong>chain</strong> in \\(P\\) is a subset \\(C \\subseteq P\\) such that any two elements of \\(C\\) are comparable (i.e., \\(C\\) is totally ordered).</li>
                            <li>An <strong>upper bound</strong> for a subset \\(S \\subseteq P\\) is an element \\(u \\in P\\) such that \\(s \\leq u\\) for all \\(s \\in S\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.4 (Zorn's Lemma)</div>
                    <div class="env-body">
                        <p>If \\(P\\) is a partially ordered set in which every chain has an upper bound, then \\(P\\) has a maximal element.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Zorn's Lemma is equivalent to the <strong>Axiom of Choice</strong> and the <strong>Well-Ordering Principle</strong>. It cannot be proved from the other axioms of ZF set theory. Despite its non-constructive nature, it is indispensable in algebra: we use it to prove that every vector space has a basis, every ring has a maximal ideal, and many other fundamental results.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.5 (Application: Existence of Bases)</div>
                    <div class="env-body">
                        <p>Every vector space has a basis. (Proof in Chapter 1 using Zorn's Lemma.)</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 0.4 (Divisibility Poset)</div>
                    <div class="env-body">
                        <p>Let \\(P = \\{1, 2, 3, 4, 6, 12\\}\\) with \\(a \\leq b\\) iff \\(a \\mid b\\). This is a poset with minimum element 1 and maximum element 12. The chain \\(\\{1, 2, 4, 12\\}\\) is totally ordered. The elements 2 and 3 are incomparable.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 0.5 (Power Set Poset)</div>
                    <div class="env-body">
                        <p>Let \\(S\\) be any set and let \\(P = \\mathcal{P}(S)\\) be the power set of \\(S\\), ordered by \\(\\subseteq\\). This is a poset with minimum element \\(\\emptyset\\) and maximum element \\(S\\). For any chain \\(\\mathcal{C}\\) in \\(\\mathcal{P}(S)\\), the union \\(\\bigcup \\mathcal{C}\\) is an upper bound.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Think of Zorn's Lemma as saying: "If you can always take one more step up in any totally ordered path, then you must eventually reach a point where you can't go any higher." It's a powerful non-constructive tool that guarantees the existence of maximal objects without telling us how to find them.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'hasse-diagram-viz',
                    title: 'Interactive: Hasse Diagram of a Poset',
                    description: 'Visualize the partial order on divisors. Click nodes to highlight chains.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 500, scale: 50});

                        // Divisors of 12: Hasse diagram
                        const nodes = [
                            {val: 1, x: 0, y: -4, level: 0},
                            {val: 2, x: -2, y: -2, level: 1},
                            {val: 3, x: 2, y: -2, level: 1},
                            {val: 4, x: -3, y: 0, level: 2},
                            {val: 6, x: 0, y: 0, level: 2},
                            {val: 12, x: -1.5, y: 2, level: 3}
                        ];

                        // Edges: (from, to) where from | to and no intermediate
                        const edges = [
                            [0, 1], [0, 2], // 1 -> 2, 1 -> 3
                            [1, 3], [1, 4], // 2 -> 4, 2 -> 6
                            [2, 4],         // 3 -> 6
                            [3, 5], [4, 5]  // 4 -> 12, 6 -> 12
                        ];

                        let selectedNode = null;

                        function getChainFrom(nodeIdx) {
                            // Find all nodes reachable from nodeIdx (upward)
                            const chain = [nodeIdx];
                            const visited = new Set([nodeIdx]);
                            const queue = [nodeIdx];

                            while (queue.length > 0) {
                                const curr = queue.shift();
                                for (const [from, to] of edges) {
                                    if (from === curr && !visited.has(to)) {
                                        visited.add(to);
                                        chain.push(to);
                                        queue.push(to);
                                    }
                                }
                            }
                            return chain;
                        }

                        function draw() {
                            viz.clear();

                            // Draw edges
                            edges.forEach(([from, to]) => {
                                const n1 = nodes[from];
                                const n2 = nodes[to];
                                const color = (selectedNode !== null &&
                                              getChainFrom(selectedNode).includes(from) &&
                                              getChainFrom(selectedNode).includes(to))
                                              ? viz.colors.yellow : viz.colors.text;
                                viz.drawSegment(n1.x, n1.y, n2.x, n2.y, color, 2, false);
                            });

                            // Draw nodes
                            nodes.forEach((n, i) => {
                                const color = selectedNode === i ? viz.colors.yellow :
                                             (selectedNode !== null && getChainFrom(selectedNode).includes(i))
                                             ? viz.colors.orange : viz.colors.blue;
                                viz.drawPoint(n.x, n.y, color, n.val.toString(), 12);
                            });

                            // Labels
                            viz.drawText('Hasse Diagram: Divisors of 12', 0, 4.5, viz.colors.white, 16, 'center');
                            viz.drawText('1 is minimum, 12 is maximum', 0, -5, viz.colors.text, 12, 'center');
                            if (selectedNode !== null) {
                                viz.drawText(`Selected: ${nodes[selectedNode].val} (chain highlighted)`, 0, -5.8, viz.colors.yellow, 12, 'center');
                            }
                        }

                        // Click detection
                        viz.canvas.addEventListener('click', (e) => {
                            const rect = viz.canvas.getBoundingClientRect();
                            const pixelX = e.clientX - rect.left;
                            const pixelY = e.clientY - rect.top;
                            const [mathX, mathY] = viz.toMath(pixelX, pixelY);

                            // Find clicked node
                            let clicked = null;
                            nodes.forEach((n, i) => {
                                const dist = Math.sqrt((n.x - mathX)**2 + (n.y - mathY)**2);
                                if (dist < 0.5) clicked = i;
                            });

                            selectedNode = (selectedNode === clicked) ? null : clicked;
                            draw();
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that the subset relation \\(\\subseteq\\) on \\(\\mathcal{P}(S)\\) satisfies the axioms of a partial order.',
                    hint: 'Check reflexivity, antisymmetry, and transitivity for set inclusion.',
                    solution: '<strong>Reflexivity:</strong> \\(A \\subseteq A\\) for all \\(A\\). <strong>Antisymmetry:</strong> If \\(A \\subseteq B\\) and \\(B \\subseteq A\\), then \\(A = B\\). <strong>Transitivity:</strong> If \\(A \\subseteq B\\) and \\(B \\subseteq C\\), then \\(A \\subseteq C\\) (every element of \\(A\\) is in \\(B\\), hence in \\(C\\)).'
                },
                {
                    question: 'In the poset \\((\\mathbb{N}, \\mid)\\) of natural numbers under divisibility, show that every chain has an upper bound, but there is no maximal element.',
                    hint: 'Consider the least common multiple of a chain. Can any number be maximal?',
                    solution: 'For a chain \\(C\\), let \\(u = \\operatorname{lcm}(C)\\) (which exists since a chain is totally ordered under divisibility). Then \\(c \\mid u\\) for all \\(c \\in C\\), so \\(u\\) is an upper bound. However, there is no maximal element: for any \\(n \\in \\mathbb{N}\\), we have \\(n \\mid 2n\\) with \\(n \\neq 2n\\), so \\(n\\) is not maximal.'
                },
                {
                    question: 'Give an example of a poset with exactly two maximal elements and no maximum element.',
                    hint: 'Consider a small finite set with an appropriate partial order.',
                    solution: 'Let \\(P = \\{a, b, c\\}\\) with \\(a \\leq b\\), \\(a \\leq c\\), but \\(b\\) and \\(c\\) incomparable. Then \\(b\\) and \\(c\\) are both maximal (nothing above them), but neither is a maximum (since \\(b \\not\\leq c\\) and \\(c \\not\\leq b\\)).'
                }
            ]
        },
        {
            id: 'ch00-sec04',
            title: 'Cardinality and Infinite Sets',
            content: `
                <h2>Cardinality and Infinite Sets</h2>

                <p>Cardinality formalizes the notion of "size" for sets, both finite and infinite. Understanding infinite cardinalities is essential for studying infinite-dimensional vector spaces.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.12 (Cardinality)</div>
                    <div class="env-body">
                        <p>Two sets \\(S\\) and \\(T\\) have the <strong>same cardinality</strong>, written \\(|S| = |T|\\), if there exists a bijection \\(f \\colon S \\to T\\).</p>
                        <p>We write \\(|S| \\leq |T|\\) if there exists an injection \\(f \\colon S \\to T\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.13 (Countable Sets)</div>
                    <div class="env-body">
                        <ol>
                            <li>A set is <strong>finite</strong> if it can be put in bijection with \\(\\{1, 2, \\ldots, n\\}\\) for some \\(n \\in \\mathbb{N}\\).</li>
                            <li>A set is <strong>countably infinite</strong> if it can be put in bijection with \\(\\mathbb{N}\\). Its cardinality is denoted \\(\\aleph_0\\) (aleph-null).</li>
                            <li>A set is <strong>countable</strong> if it is finite or countably infinite.</li>
                            <li>A set is <strong>uncountable</strong> if it is infinite and not countably infinite.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 0.6 (Famous Cardinalities)</div>
                    <div class="env-body">
                        <ol>
                            <li>\\(|\\mathbb{N}| = |\\mathbb{Z}| = |\\mathbb{Q}| = \\aleph_0\\). The rationals are countable!</li>
                            <li>\\(|\\mathbb{R}| = 2^{\\aleph_0} > \\aleph_0\\). The reals are uncountable.</li>
                            <li>\\(|\\mathbb{R}^n| = |\\mathbb{R}|\\) for all \\(n \\geq 1\\). All Euclidean spaces have the same cardinality.</li>
                        </ol>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="cantor-diagonal-viz"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.6 (Schröder-Bernstein)</div>
                    <div class="env-body">
                        <p>For any sets \\(S\\) and \\(T\\), if \\(|S| \\leq |T|\\) and \\(|T| \\leq |S|\\), then \\(|S| = |T|\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>This remarkable theorem says that if you can inject \\(S\\) into \\(T\\) and also inject \\(T\\) into \\(S\\), then the two sets are actually in bijection—they have the same size. It's non-obvious because the two injections might map things in completely different ways.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>Let \\(f \\colon S \\to T\\) and \\(g \\colon T \\to S\\) be injections. Trace back the ancestry of each element using \\(f\\) and \\(g\\) alternately. Each element either originates in \\(S\\), in \\(T\\), or has infinite ancestry. Partition \\(S = S_S \\cup S_T \\cup S_{\\infty}\\) based on origin. Use \\(f\\) on \\(S_S \\cup S_{\\infty}\\) and \\(g^{-1}\\) on \\(S_T\\) to construct a bijection \\(S \\to T\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.7 (Cantor's Theorem)</div>
                    <div class="env-body">
                        <p>For any set \\(S\\), we have \\(|S| < |\\mathcal{P}(S)|\\), where \\(\\mathcal{P}(S)\\) is the power set of \\(S\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>The map \\(x \\mapsto \\{x\\}\\) is an injection \\(S \\to \\mathcal{P}(S)\\), so \\(|S| \\leq |\\mathcal{P}(S)|\\). To show \\(|S| \\neq |\\mathcal{P}(S)|\\), suppose \\(f \\colon S \\to \\mathcal{P}(S)\\) is any function. Define:</p>
                        \\[D = \\{x \\in S \\mid x \\notin f(x)\\}\\]
                        <p>We claim \\(D \\notin \\operatorname{im}(f)\\). Suppose \\(D = f(y)\\) for some \\(y \\in S\\). Then:</p>
                        <ul>
                            <li>If \\(y \\in D\\), then by definition of \\(D\\), \\(y \\notin f(y) = D\\). Contradiction.</li>
                            <li>If \\(y \\notin D\\), then \\(y \\notin f(y)\\), so by definition \\(y \\in D\\). Contradiction.</li>
                        </ul>
                        <p>Thus no surjection \\(S \\to \\mathcal{P}(S)\\) exists, so \\(|S| < |\\mathcal{P}(S)|\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Cantor's theorem implies there is an infinite hierarchy of infinities: \\(\\aleph_0 < 2^{\\aleph_0} < 2^{2^{\\aleph_0}} < \\cdots\\). The cardinality of \\(\\mathbb{R}\\) is \\(2^{\\aleph_0}\\), sometimes denoted \\(\\mathfrak{c}\\) (the cardinality of the continuum).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.8 (Arithmetic of Infinite Cardinals)</div>
                    <div class="env-body">
                        <p>Let \\(\\kappa\\) and \\(\\lambda\\) be cardinal numbers, at least one of which is infinite. Then:</p>
                        \\[\\kappa + \\lambda = \\kappa \\cdot \\lambda = \\max\\{\\kappa, \\lambda\\}\\]
                        <p>In particular, \\(\\aleph_0 + \\aleph_0 = \\aleph_0 \\cdot \\aleph_0 = \\aleph_0\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Infinite cardinal arithmetic is "absorptive": combining two infinite sets (by union or Cartesian product) doesn't make them bigger unless one is strictly larger. This is counterintuitive: \\(\\mathbb{N} \\times \\mathbb{N}\\) has the same cardinality as \\(\\mathbb{N}\\)!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'cantor-diagonal-viz',
                    title: 'Interactive: Cantor\'s Diagonal Argument',
                    description: 'See why the real numbers are uncountable',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 650, height: 500, scale: 40});

                        // Simplified visualization: show infinite binary sequences
                        const sequences = [
                            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                            [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
                            [0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
                            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                            [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
                            [1, 1, 1, 1, 0, 0, 0, 0, 1, 1],
                            [0, 1, 1, 0, 0, 1, 1, 0, 0, 1],
                            [1, 0, 0, 1, 1, 0, 0, 1, 1, 0]
                        ];

                        function draw() {
                            viz.clear();

                            const cellSize = 0.6;
                            const startX = -5;
                            const startY = 4;

                            // Draw title
                            viz.drawText('Attempting to list all infinite binary sequences', 0, 6, viz.colors.white, 14, 'center');

                            // Draw sequences
                            sequences.forEach((seq, row) => {
                                // Row label
                                viz.drawText(`s${row + 1}:`, startX - 1.5, startY - row * cellSize, viz.colors.text, 12, 'right');

                                seq.forEach((bit, col) => {
                                    const x = startX + col * cellSize;
                                    const y = startY - row * cellSize;
                                    const isDiagonal = (row === col);
                                    const color = isDiagonal ? viz.colors.yellow : (bit === 1 ? viz.colors.blue : viz.colors.text);

                                    viz.drawText(bit.toString(), x, y, color, 14, 'center');

                                    if (isDiagonal) {
                                        // Highlight diagonal
                                        viz.drawCircle(x, y, 0.25, 'transparent', viz.colors.yellow, 2);
                                    }
                                });
                            });

                            // Draw diagonal sequence (flipped)
                            viz.drawText('Diagonal (flipped):', startX - 1.5, startY - (sequences.length + 1) * cellSize, viz.colors.orange, 12, 'right');
                            sequences.forEach((seq, i) => {
                                const bit = 1 - seq[i]; // Flip diagonal bit
                                const x = startX + i * cellSize;
                                const y = startY - (sequences.length + 1) * cellSize;
                                viz.drawText(bit.toString(), x, y, viz.colors.orange, 14, 'center');
                            });

                            viz.drawText('This new sequence differs from each sᵢ at position i', 0, -5.5, viz.colors.orange, 12, 'center');
                            viz.drawText('So it cannot be in the list!', 0, -6.3, viz.colors.red, 12, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that \\(|\\mathbb{Z}| = \\aleph_0\\) by constructing an explicit bijection \\(f \\colon \\mathbb{N} \\to \\mathbb{Z}\\).',
                    hint: 'Alternate between positive and negative integers: 0, 1, -1, 2, -2, 3, -3, ...',
                    solution: 'Define \\(f(n) = \\begin{cases} n/2 & \\text{if } n \\text{ is even} \\\\ -(n+1)/2 & \\text{if } n \\text{ is odd} \\end{cases}\\). This maps \\(\\mathbb{N}\\) bijectively to \\(\\mathbb{Z}\\): \\(0 \\mapsto 0, 1 \\mapsto -1, 2 \\mapsto 1, 3 \\mapsto -2, 4 \\mapsto 2, \\ldots\\)'
                },
                {
                    question: 'Use Cantor\'s diagonal argument to prove that the set of all infinite binary sequences is uncountable.',
                    hint: 'Assume a countable list exists and construct a sequence not in the list.',
                    solution: 'Suppose all sequences are listed as \\(s_1, s_2, s_3, \\ldots\\). Define a new sequence \\(d\\) where the \\(n\\)-th bit of \\(d\\) is the opposite of the \\(n\\)-th bit of \\(s_n\\). Then \\(d \\neq s_n\\) for all \\(n\\) (they differ at position \\(n\\)). So \\(d\\) is not in the list, contradicting completeness. Thus no such list exists.'
                },
                {
                    question: 'Prove that \\(|\\mathbb{N} \\times \\mathbb{N}| = \\aleph_0\\) by describing a bijection.',
                    hint: 'Use a diagonal enumeration or the pairing function \\(\\pi(m,n) = \\frac{(m+n)(m+n+1)}{2} + n\\).',
                    solution: 'The pairing function \\(\\pi(m,n) = \\frac{(m+n)(m+n+1)}{2} + n\\) is a bijection \\(\\mathbb{N} \\times \\mathbb{N} \\to \\mathbb{N}\\). It enumerates pairs by diagonals: (0,0), (0,1), (1,0), (0,2), (1,1), (2,0), ... This can be verified to be injective and surjective.'
                }
            ]
        },
        {
            id: 'ch00-sec05',
            title: 'Rings, Fields, and Polynomials',
            content: `
                <h2>Rings, Fields, and Polynomials</h2>

                <p>Linear algebra is fundamentally the study of vector spaces over fields. We review the algebraic structures underlying this theory.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.14 (Ring)</div>
                    <div class="env-body">
                        <p>A <strong>ring</strong> is a nonempty set \\(R\\) with two binary operations \\(+\\) (addition) and \\(\\cdot\\) (multiplication) such that:</p>
                        <ol>
                            <li>\\((R, +)\\) is an abelian group (identity \\(0\\), inverses \\(-a\\)).</li>
                            <li>Multiplication is associative: \\((ab)c = a(bc)\\).</li>
                            <li>Distributive laws: \\(a(b + c) = ab + ac\\) and \\((a + b)c = ac + bc\\).</li>
                        </ol>
                        <p>A ring is <strong>commutative</strong> if \\(ab = ba\\) for all \\(a, b \\in R\\). A ring has <strong>identity</strong> (or <strong>unity</strong>) if there exists \\(1 \\in R\\) with \\(1a = a1 = a\\) for all \\(a \\in R\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.15 (Field)</div>
                    <div class="env-body">
                        <p>A <strong>field</strong> is a commutative ring \\(F\\) with identity \\(1 \\neq 0\\) in which every nonzero element has a multiplicative inverse. That is, for all \\(a \\in F\\) with \\(a \\neq 0\\), there exists \\(a^{-1} \\in F\\) such that \\(aa^{-1} = 1\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 0.7 (Common Fields)</div>
                    <div class="env-body">
                        <ol>
                            <li>\\(\\mathbb{Q}\\) (rationals), \\(\\mathbb{R}\\) (reals), \\(\\mathbb{C}\\) (complex numbers) are fields.</li>
                            <li>\\(\\mathbb{Z}\\) (integers) is a commutative ring with identity, but not a field (2 has no multiplicative inverse).</li>
                            <li>\\(\\mathbb{Z}_p = \\{0, 1, \\ldots, p-1\\}\\) with addition and multiplication mod \\(p\\) is a field if and only if \\(p\\) is prime.</li>
                            <li>\\(M_n(F)\\) (\\(n \\times n\\) matrices over \\(F\\)) is a ring but not a field (not all matrices are invertible).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.16 (Polynomial Ring)</div>
                    <div class="env-body">
                        <p>Let \\(F\\) be a field. The <strong>polynomial ring</strong> \\(F[x]\\) is the set of all polynomials in the variable \\(x\\) with coefficients in \\(F\\):</p>
                        \\[F[x] = \\{a_0 + a_1 x + \\cdots + a_n x^n \\mid n \\geq 0, a_i \\in F\\}\\]
                        <p>with the usual addition and multiplication of polynomials. The <strong>degree</strong> of \\(p(x) = a_0 + \\cdots + a_n x^n\\) with \\(a_n \\neq 0\\) is \\(\\deg p(x) = n\\). A polynomial is <strong>monic</strong> if its leading coefficient is 1.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.9 (Division Algorithm for Polynomials)</div>
                    <div class="env-body">
                        <p>Let \\(f(x), g(x) \\in F[x]\\) with \\(g(x) \\neq 0\\). Then there exist unique \\(q(x), r(x) \\in F[x]\\) such that:</p>
                        \\[f(x) = q(x)g(x) + r(x)\\]
                        <p>where either \\(r(x) = 0\\) or \\(\\deg r(x) < \\deg g(x)\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.17 (Irreducible Polynomial)</div>
                    <div class="env-body">
                        <p>A nonconstant polynomial \\(p(x) \\in F[x]\\) is <strong>irreducible</strong> over \\(F\\) if whenever \\(p(x) = f(x)g(x)\\) with \\(f, g \\in F[x]\\), then either \\(f\\) or \\(g\\) is a constant (unit).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 0.8</div>
                    <div class="env-body">
                        <ol>
                            <li>\\(x^2 - 2\\) is irreducible over \\(\\mathbb{Q}\\) but factors as \\((x - \\sqrt{2})(x + \\sqrt{2})\\) over \\(\\mathbb{R}\\).</li>
                            <li>\\(x^2 + 1\\) is irreducible over \\(\\mathbb{R}\\) but factors as \\((x - i)(x + i)\\) over \\(\\mathbb{C}\\).</li>
                            <li>Every polynomial of degree 1 is irreducible.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.10 (Unique Factorization in \\(F[x]\\))</div>
                    <div class="env-body">
                        <p>Every nonconstant polynomial in \\(F[x]\\) can be written as a product of irreducible polynomials, and this factorization is unique up to order and multiplication by nonzero constants.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.18 (Characteristic of a Field)</div>
                    <div class="env-body">
                        <p>The <strong>characteristic</strong> of a field \\(F\\), denoted \\(\\operatorname{char}(F)\\), is the smallest positive integer \\(p\\) such that:</p>
                        \\[\\underbrace{1 + 1 + \\cdots + 1}_{p \\text{ times}} = 0\\]
                        <p>If no such \\(p\\) exists, we say \\(\\operatorname{char}(F) = 0\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.11</div>
                    <div class="env-body">
                        <p>The characteristic of a field is either 0 or a prime number \\(p\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Suppose \\(\\operatorname{char}(F) = n > 0\\) and \\(n = ab\\) with \\(1 < a, b < n\\). Then:</p>
                        \\[0 = \\underbrace{1 + \\cdots + 1}_{n} = \\underbrace{1 + \\cdots + 1}_{a} \\cdot \\underbrace{1 + \\cdots + 1}_{b}\\]
                        <p>In a field, if \\(xy = 0\\), then \\(x = 0\\) or \\(y = 0\\). So either \\(a \\cdot 1 = 0\\) or \\(b \\cdot 1 = 0\\), contradicting the minimality of \\(n\\). Thus \\(n\\) must be prime.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 0.9</div>
                    <div class="env-body">
                        <ol>
                            <li>\\(\\operatorname{char}(\\mathbb{Q}) = \\operatorname{char}(\\mathbb{R}) = \\operatorname{char}(\\mathbb{C}) = 0\\).</li>
                            <li>\\(\\operatorname{char}(\\mathbb{Z}_p) = p\\) when \\(p\\) is prime.</li>
                            <li>In a field of characteristic \\(p > 0\\), we have \\(a^p = a\\) for all \\(a\\) (Frobenius endomorphism).</li>
                        </ol>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="field-arithmetic-viz"></div>
            `,
            visualizations: [
                {
                    id: 'field-arithmetic-viz',
                    title: 'Interactive: Arithmetic in ℤ_p',
                    description: 'Explore addition and multiplication tables in finite fields',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 600, height: 500, scale: 40});

                        let p = 5;
                        let showMult = false;

                        function draw() {
                            viz.clear();

                            const cellSize = 0.8;
                            const startX = -3;
                            const startY = 3;

                            const op = showMult ? '×' : '+';
                            viz.drawText(`ℤ_${p} ${op} table`, 0, 5, viz.colors.white, 16, 'center');

                            // Draw table
                            for (let i = 0; i <= p; i++) {
                                for (let j = 0; j <= p; j++) {
                                    const x = startX + j * cellSize;
                                    const y = startY - i * cellSize;

                                    if (i === 0 && j === 0) {
                                        viz.drawText(op, x, y, viz.colors.text, 14, 'center');
                                    } else if (i === 0) {
                                        viz.drawText((j-1).toString(), x, y, viz.colors.blue, 14, 'center');
                                    } else if (j === 0) {
                                        viz.drawText((i-1).toString(), x, y, viz.colors.blue, 14, 'center');
                                    } else {
                                        const a = i - 1;
                                        const b = j - 1;
                                        const result = showMult ? (a * b) % p : (a + b) % p;
                                        const color = (result === 0 && showMult && a !== 0 && b !== 0) ? viz.colors.red : viz.colors.green;
                                        viz.drawText(result.toString(), x, y, color, 13, 'center');
                                    }
                                }
                            }

                            if (showMult) {
                                viz.drawText('Red = zero divisors (only if p is composite)', 0, -4.5, viz.colors.red, 11, 'center');
                            }
                        }

                        const sliderP = VizEngine.createSlider(controls, 'p (modulus)', 2, 11, 5, 1, (val) => {
                            p = val;
                            draw();
                        });

                        const btnToggle = VizEngine.createButton(controls, 'Toggle +/×', () => {
                            showMult = !showMult;
                            draw();
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that \\(\\mathbb{Z}_p\\) is a field if and only if \\(p\\) is prime.',
                    hint: 'Show that every nonzero element has a multiplicative inverse when \\(p\\) is prime. Use Bézout\'s identity: \\(\\gcd(a, p) = 1\\) implies \\(ax + py = 1\\) for some \\(x, y \\in \\mathbb{Z}\\).',
                    solution: 'If \\(p\\) is composite, say \\(p = ab\\) with \\(1 < a, b < p\\), then \\(a \\cdot b \\equiv 0 \\pmod{p}\\), so \\(a\\) is a zero divisor and has no inverse. Conversely, if \\(p\\) is prime and \\(0 \\neq a < p\\), then \\(\\gcd(a, p) = 1\\). By Bézout, \\(ax + py = 1\\), so \\(ax \\equiv 1 \\pmod{p}\\). Thus \\(a^{-1} = x \\in \\mathbb{Z}_p\\).'
                },
                {
                    question: 'Use the division algorithm to show that \\(x^3 - 2\\) is irreducible over \\(\\mathbb{Q}\\).',
                    hint: 'Use Eisenstein\'s criterion with \\(p = 2\\), or show it has no rational roots.',
                    solution: 'By the Rational Root Theorem, the only possible rational roots of \\(x^3 - 2\\) are \\(\\pm 1, \\pm 2\\). Testing: \\(1^3 - 2 = -1 \\neq 0\\), \\((-1)^3 - 2 = -3 \\neq 0\\), \\(2^3 - 2 = 6 \\neq 0\\), \\((-2)^3 - 2 = -10 \\neq 0\\). So \\(x^3 - 2\\) has no rational roots. A cubic with no roots in the field is irreducible (any factorization must have a linear factor).'
                },
                {
                    question: 'Prove that in a field of characteristic \\(p\\), we have \\((a + b)^p = a^p + b^p\\) for all \\(a, b\\).',
                    hint: 'Use the binomial theorem and show that \\(\\binom{p}{k} \\equiv 0 \\pmod{p}\\) for \\(0 < k < p\\).',
                    solution: 'By the binomial theorem, \\((a + b)^p = \\sum_{k=0}^{p} \\binom{p}{k} a^{p-k} b^k\\). For \\(0 < k < p\\), we have \\(\\binom{p}{k} = \\frac{p!}{k!(p-k)!}\\). Since \\(p\\) is prime and divides \\(p!\\) but not \\(k!\\) or \\((p-k)!\\), we have \\(p \\mid \\binom{p}{k}\\). In characteristic \\(p\\), this means \\(\\binom{p}{k} = 0\\). Thus \\((a + b)^p = a^p + b^p\\).'
                }
            ]
        },
        {
            id: 'ch00-sec06',
            title: 'Matrices and Linear Systems',
            content: `
                <h2>Matrices and Linear Systems</h2>

                <p>We conclude with a review of matrices, which provide the computational framework for linear algebra.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.19 (Matrix)</div>
                    <div class="env-body">
                        <p>An \\(m \\times n\\) <strong>matrix</strong> over a field \\(F\\) is a rectangular array of elements of \\(F\\):</p>
                        \\[A = \\begin{bmatrix} a_{11} & a_{12} & \\cdots & a_{1n} \\\\ a_{21} & a_{22} & \\cdots & a_{2n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ a_{m1} & a_{m2} & \\cdots & a_{mn} \\end{bmatrix}\\]
                        <p>We write \\(A \\in M_{m,n}(F)\\) or \\(A \\in M_{m \\times n}(F)\\). The \\((i,j)\\)-entry is denoted \\(A_{ij}\\) or \\([A]_{ij}\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.20 (Matrix Operations)</div>
                    <div class="env-body">
                        <ol>
                            <li><strong>Addition:</strong> \\([A + B]_{ij} = A_{ij} + B_{ij}\\).</li>
                            <li><strong>Scalar multiplication:</strong> \\([cA]_{ij} = c A_{ij}\\).</li>
                            <li><strong>Matrix multiplication:</strong> If \\(A \\in M_{m,n}(F)\\) and \\(B \\in M_{n,p}(F)\\), then \\(AB \\in M_{m,p}(F)\\) with:</li>
                        </ol>
                        \\[[AB]_{ij} = \\sum_{k=1}^{n} A_{ik} B_{kj}\\]
                        <ol start="4">
                            <li><strong>Transpose:</strong> \\([A^T]_{ij} = A_{ji}\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.12 (Properties of Transpose)</div>
                    <div class="env-body">
                        <ol>
                            <li>\\((A^T)^T = A\\)</li>
                            <li>\\((A + B)^T = A^T + B^T\\)</li>
                            <li>\\((cA)^T = c A^T\\)</li>
                            <li>\\((AB)^T = B^T A^T\\)</li>
                            <li>\\(\\det(A^T) = \\det(A)\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.21 (Elementary Row Operations)</div>
                    <div class="env-body">
                        <p>There are three types of <strong>elementary row operations</strong>:</p>
                        <ol>
                            <li><strong>Type I:</strong> Multiply a row by a nonzero scalar.</li>
                            <li><strong>Type II:</strong> Interchange two rows.</li>
                            <li><strong>Type III:</strong> Add a scalar multiple of one row to another row.</li>
                        </ol>
                        <p>Each operation can be performed by left multiplication by an <strong>elementary matrix</strong> \\(E\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.22 (Reduced Row Echelon Form)</div>
                    <div class="env-body">
                        <p>A matrix \\(R\\) is in <strong>reduced row echelon form (RREF)</strong> if:</p>
                        <ol>
                            <li>All zero rows are at the bottom.</li>
                            <li>The first nonzero entry in each nonzero row is 1 (called a <strong>leading 1</strong> or <strong>pivot</strong>).</li>
                            <li>Each leading 1 is to the right of the leading 1 in the row above it.</li>
                            <li>Each column containing a leading 1 has zeros in all other positions.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.13 (Existence and Uniqueness of RREF)</div>
                    <div class="env-body">
                        <p>Every matrix \\(A\\) is row equivalent to a unique matrix \\(R\\) in reduced row echelon form. Moreover, \\(R = E_k \\cdots E_1 A\\) where \\(E_i\\) are elementary matrices.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="row-reduction-viz"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.23 (Rank)</div>
                    <div class="env-body">
                        <p>The <strong>rank</strong> of a matrix \\(A\\), denoted \\(\\operatorname{rank}(A)\\), is the number of nonzero rows in its RREF. Equivalently, it is the dimension of the row space (or column space) of \\(A\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.14 (Invertible Matrix Theorem - Preview)</div>
                    <div class="env-body">
                        <p>For a square matrix \\(A \\in M_n(F)\\), the following are equivalent:</p>
                        <ol>
                            <li>\\(A\\) is invertible.</li>
                            <li>\\(\\operatorname{rank}(A) = n\\).</li>
                            <li>The RREF of \\(A\\) is \\(I_n\\).</li>
                            <li>\\(\\det(A) \\neq 0\\).</li>
                            <li>\\(A\\) is a product of elementary matrices.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 0.10 (Row Reduction)</div>
                    <div class="env-body">
                        <p>Reduce \\(A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 7 \\\\ 1 & 1 & 2 \\end{bmatrix}\\) to RREF:</p>
                        \\[\\begin{bmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 7 \\\\ 1 & 1 & 2 \\end{bmatrix} \\xrightarrow{R_2 - 2R_1} \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 0 & 1 \\\\ 1 & 1 & 2 \\end{bmatrix} \\xrightarrow{R_3 - R_1} \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 0 & 1 \\\\ 0 & -1 & -1 \\end{bmatrix}\\]
                        \\[\\xrightarrow{R_2 \\leftrightarrow R_3} \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & -1 & -1 \\\\ 0 & 0 & 1 \\end{bmatrix} \\xrightarrow{-R_2} \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 1 \\end{bmatrix}\\]
                        \\[\\xrightarrow{R_2 - R_3} \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix} \\xrightarrow{R_1 - 3R_3 - 2R_2} \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}\\]
                        <p>Thus \\(A\\) is invertible with \\(\\operatorname{rank}(A) = 3\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Row reduction is the algorithmic heart of linear algebra. It converts any matrix to a canonical form that reveals its rank, nullspace, and invertibility. Think of it as "simplifying" the matrix to expose its essential structure, just as we reduce fractions to lowest terms.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'row-reduction-viz',
                    title: 'Interactive: Row Reduction Steps',
                    description: 'Step through the row reduction algorithm',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 700, height: 450, scale: 40});

                        const steps = [
                            {
                                matrix: [[1, 2, 3], [2, 4, 7], [1, 1, 2]],
                                desc: 'Original matrix A'
                            },
                            {
                                matrix: [[1, 2, 3], [0, 0, 1], [1, 1, 2]],
                                desc: 'R₂ ← R₂ - 2R₁'
                            },
                            {
                                matrix: [[1, 2, 3], [0, 0, 1], [0, -1, -1]],
                                desc: 'R₃ ← R₃ - R₁'
                            },
                            {
                                matrix: [[1, 2, 3], [0, -1, -1], [0, 0, 1]],
                                desc: 'R₂ ↔ R₃ (swap rows)'
                            },
                            {
                                matrix: [[1, 2, 3], [0, 1, 1], [0, 0, 1]],
                                desc: 'R₂ ← -R₂'
                            },
                            {
                                matrix: [[1, 2, 3], [0, 1, 0], [0, 0, 1]],
                                desc: 'R₂ ← R₂ - R₃'
                            },
                            {
                                matrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
                                desc: 'R₁ ← R₁ - 2R₂ - 3R₃ (RREF)'
                            }
                        ];

                        let currentStep = 0;

                        function draw() {
                            viz.clear();

                            const step = steps[currentStep];
                            const m = step.matrix;
                            const cellW = 1.2;
                            const cellH = 1.0;
                            const startX = -2;
                            const startY = 1.5;

                            // Title
                            viz.drawText(`Step ${currentStep + 1} / ${steps.length}`, 0, 4.5, viz.colors.white, 16, 'center');
                            viz.drawText(step.desc, 0, 3.5, viz.colors.yellow, 14, 'center');

                            // Draw matrix
                            // Left bracket
                            viz.drawSegment(startX - 0.5, startY + 0.5, startX - 0.5, startY - 2.5, viz.colors.white, 2, false);
                            viz.drawSegment(startX - 0.5, startY + 0.5, startX - 0.3, startY + 0.5, viz.colors.white, 2, false);
                            viz.drawSegment(startX - 0.5, startY - 2.5, startX - 0.3, startY - 2.5, viz.colors.white, 2, false);

                            // Right bracket
                            viz.drawSegment(startX + 3.1, startY + 0.5, startX + 3.1, startY - 2.5, viz.colors.white, 2, false);
                            viz.drawSegment(startX + 3.1, startY + 0.5, startX + 2.9, startY + 0.5, viz.colors.white, 2, false);
                            viz.drawSegment(startX + 3.1, startY - 2.5, startX + 2.9, startY - 2.5, viz.colors.white, 2, false);

                            for (let i = 0; i < 3; i++) {
                                for (let j = 0; j < 3; j++) {
                                    const val = m[i][j];
                                    const x = startX + j * cellW;
                                    const y = startY - i * cellH;
                                    const color = (val === 1 && i === j) ? viz.colors.green :
                                                 (val === 0) ? viz.colors.text : viz.colors.blue;
                                    viz.drawText(val.toString(), x, y, color, 16, 'center');
                                }
                            }

                            // Navigation info
                            viz.drawText('Use buttons to navigate steps', 0, -3.5, viz.colors.text, 12, 'center');

                            // Rank info
                            const rank = m.filter(row => row.some(x => x !== 0)).length;
                            viz.drawText(`Current rank: ${rank}`, 0, -4.5, viz.colors.orange, 13, 'center');
                        }

                        const btnPrev = VizEngine.createButton(controls, 'Previous', () => {
                            if (currentStep > 0) {
                                currentStep--;
                                draw();
                            }
                        });

                        const btnNext = VizEngine.createButton(controls, 'Next', () => {
                            if (currentStep < steps.length - 1) {
                                currentStep++;
                                draw();
                            }
                        });

                        const btnReset = VizEngine.createButton(controls, 'Reset', () => {
                            currentStep = 0;
                            draw();
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that \\((AB)^T = B^T A^T\\) for matrices \\(A \\in M_{m,n}(F)\\) and \\(B \\in M_{n,p}(F)\\).',
                    hint: 'Compute the \\((i,j)\\)-entry of both sides using the definition of matrix multiplication and transpose.',
                    solution: 'Let \\(C = AB\\). Then \\([C^T]_{ij} = C_{ji} = \\sum_{k=1}^{n} A_{jk} B_{ki}\\). On the other hand, \\([B^T A^T]_{ij} = \\sum_{k=1}^{n} [B^T]_{ik} [A^T]_{kj} = \\sum_{k=1}^{n} B_{ki} A_{jk} = \\sum_{k=1}^{n} A_{jk} B_{ki}\\). Thus \\((AB)^T = B^T A^T\\).'
                },
                {
                    question: 'Show that row equivalence is an equivalence relation on \\(M_{m,n}(F)\\).',
                    hint: 'Verify reflexivity, symmetry, and transitivity using properties of elementary row operations.',
                    solution: '<strong>Reflexivity:</strong> \\(A \\sim A\\) (apply no operations). <strong>Symmetry:</strong> If \\(A \\sim B\\) via operations \\(E_1, \\ldots, E_k\\), then \\(B \\sim A\\) via \\(E_k^{-1}, \\ldots, E_1^{-1}\\) (elementary matrices are invertible). <strong>Transitivity:</strong> If \\(A \\sim B\\) and \\(B \\sim C\\), compose the sequences of operations to get \\(A \\sim C\\).'
                },
                {
                    question: 'Prove that a square matrix \\(A\\) is invertible if and only if its RREF is the identity matrix \\(I_n\\).',
                    hint: 'Use the fact that \\(A\\) is invertible iff \\(\\operatorname{rank}(A) = n\\).',
                    solution: 'If the RREF of \\(A\\) is \\(I_n\\), then \\(\\operatorname{rank}(A) = n\\) (all \\(n\\) rows are nonzero and independent). Thus \\(A\\) has full rank and is invertible. Conversely, if \\(A\\) is invertible, then \\(\\operatorname{rank}(A) = n\\). The RREF has \\(n\\) leading 1s, one in each row. Since \\(A\\) is \\(n \\times n\\), each column also contains a leading 1. By the definition of RREF, this means the RREF is \\(I_n\\).'
                }
            ]
        }
    ]
});
