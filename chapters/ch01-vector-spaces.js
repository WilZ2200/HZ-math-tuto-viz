window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch01',
    number: 1,
    title: 'Vector Spaces',
    subtitle: 'Foundations of linear algebra over arbitrary fields',
    sections: [
        {
            id: 'ch01-sec01',
            title: 'Vector Spaces and Subspaces',
            content: `
                <h2>Vector Spaces and Subspaces</h2>

                <p>We begin our study of advanced linear algebra with the foundational concept of a vector space. Unlike elementary treatments that focus on \\(\\mathbb{R}^n\\) or \\(\\mathbb{C}^n\\), we work over arbitrary fields, revealing the algebraic essence of linearity.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.1 (Vector Space)</div>
                    <div class="env-body">
                        <p>A <strong>vector space</strong> over a field \\(F\\) is a set \\(V\\) equipped with two operations:</p>
                        <ul>
                            <li><strong>Addition:</strong> \\(+ : V \\times V \\to V\\)</li>
                            <li><strong>Scalar multiplication:</strong> \\(\\cdot : F \\times V \\to V\\)</li>
                        </ul>
                        <p>satisfying the following axioms for all \\(u, v, w \\in V\\) and \\(\\alpha, \\beta \\in F\\):</p>
                        <ol>
                            <li><strong>Additive commutativity:</strong> \\(u + v = v + u\\)</li>
                            <li><strong>Additive associativity:</strong> \\((u + v) + w = u + (v + w)\\)</li>
                            <li><strong>Additive identity:</strong> There exists \\(0 \\in V\\) such that \\(v + 0 = v\\)</li>
                            <li><strong>Additive inverse:</strong> For each \\(v \\in V\\), there exists \\(-v \\in V\\) such that \\(v + (-v) = 0\\)</li>
                            <li><strong>Scalar multiplicative identity:</strong> \\(1 \\cdot v = v\\) where \\(1\\) is the multiplicative identity in \\(F\\)</li>
                            <li><strong>Scalar multiplicative compatibility:</strong> \\(\\alpha(\\beta v) = (\\alpha\\beta)v\\)</li>
                            <li><strong>Distributivity over vector addition:</strong> \\(\\alpha(u + v) = \\alpha u + \\alpha v\\)</li>
                            <li><strong>Distributivity over field addition:</strong> \\((\\alpha + \\beta)v = \\alpha v + \\beta v\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>A vector space captures the essence of "things you can add and scale." The power of abstraction lies in recognizing that matrices, polynomials, functions, and sequences all share this algebraic structure. By working over arbitrary fields \\(F\\), we reveal that linearity is fundamentally algebraic, not geometric.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 1.2 (Standard Examples)</div>
                    <div class="env-body">
                        <ol>
                            <li><strong>Coordinate spaces:</strong> \\(F^n = \\{(x_1, \\ldots, x_n) \\mid x_i \\in F\\}\\) with componentwise operations.</li>
                            <li><strong>Matrix spaces:</strong> \\(\\mathcal{M}_{m \\times n}(F)\\), the set of all \\(m \\times n\\) matrices over \\(F\\).</li>
                            <li><strong>Polynomial spaces:</strong> \\(F[x]\\), the set of all polynomials with coefficients in \\(F\\).</li>
                            <li><strong>Sequence spaces:</strong> \\(\\operatorname{Seq}(F)\\), all infinite sequences with entries from \\(F\\).</li>
                            <li><strong>Function spaces:</strong> If \\(S\\) is any set, then \\(F^S = \\{f : S \\to F\\}\\) forms a vector space.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 1.3 (Binary Vector Spaces)</div>
                    <div class="env-body">
                        <p>Consider the vector space \\(V_n(\\mathbb{F}_2)\\) of all binary \\(n\\)-tuples over the field \\(\\mathbb{F}_2 = \\{0, 1\\}\\). The <strong>weight</strong> \\(w(v)\\) of a vector \\(v\\) is the number of nonzero coordinates. Let \\(E_n\\) be the set of all vectors of even weight.</p>
                        <p>We claim \\(E_n\\) is a subspace. Note that \\(w(u + v) = w(u) + w(v) - 2w(u \\wedge v)\\), where \\(u \\wedge v\\) is the componentwise product. Thus if \\(w(u)\\) and \\(w(v)\\) are both even, so is \\(w(u + v)\\). Since scalar multiplication over \\(\\mathbb{F}_2\\) is trivial (scalars are 0 or 1), \\(E_n\\) is a subspace called the <strong>even weight subspace</strong>.</p>
                        <p>Any subspace of \\(V_n(\\mathbb{F}_2)\\) is called a <strong>linear code</strong>. These codes are fundamental in coding theory because their linear structure enables efficient encoding and decoding algorithms.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.4 (Subspace)</div>
                    <div class="env-body">
                        <p>A <strong>subspace</strong> of a vector space \\(V\\) is a subset \\(W \\subseteq V\\) that is itself a vector space under the operations inherited from \\(V\\). We write \\(W \\leq V\\) to indicate that \\(W\\) is a subspace, and \\(W < V\\) for a proper subspace.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.5 (Subspace Criterion)</div>
                    <div class="env-body">
                        <p>A nonempty subset \\(W\\) of a vector space \\(V\\) is a subspace if and only if \\(W\\) is closed under linear combinations, that is,</p>
                        \\[\\forall \\alpha, \\beta \\in F, \\; \\forall u, v \\in W : \\alpha u + \\beta v \\in W\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>(\\(\\Rightarrow\\)) If \\(W\\) is a subspace, closure under linear combinations follows immediately from closure under addition and scalar multiplication.</p>
                        <p>(\\(\\Leftarrow\\)) Suppose \\(W\\) is closed under linear combinations. Setting \\(\\alpha = \\beta = 0\\) shows \\(0 \\in W\\). Setting \\(\\alpha = -1\\) and \\(\\beta = 0\\) shows that additive inverses exist in \\(W\\). Setting \\(\\beta = 0\\) shows closure under scalar multiplication, and setting \\(\\alpha = \\beta = 1\\) shows closure under addition. The remaining vector space axioms (commutativity, associativity, etc.) are inherited from \\(V\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="subspace-viz"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The subspace criterion dramatically simplifies verification. We need only check closure under linear combinations, not all eight axioms. This is our first example of how abstraction simplifies reasoning.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'subspace-viz',
                    title: 'Interactive: Subspace Closure Under Linear Combinations',
                    description: 'Drag vectors u and v. The visualization shows all linear combinations αu + βv for various scalars.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});
                        const u = viz.addDraggable('u', 2, 1, viz.colors.blue, 8, () => draw());
                        const v = viz.addDraggable('v', 1, 2, viz.colors.orange, 8, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw span (plane through origin)
                            for (let a = -5; a <= 5; a += 0.5) {
                                for (let b = -5; b <= 5; b += 0.5) {
                                    const x = a * u.x + b * v.x;
                                    const y = a * u.y + b * v.y;
                                    const dist = Math.sqrt(x*x + y*y);
                                    if (dist < 7) {
                                        viz.drawPoint(x, y, viz.colors.teal + '33', null, 2);
                                    }
                                }
                            }

                            // Draw specific linear combinations
                            viz.drawVector(0, 0, u.x + v.x, u.y + v.y, viz.colors.green, 'u+v', 2);
                            viz.drawVector(0, 0, 2*u.x, 2*u.y, viz.colors.blue + '88', '2u', 1.5);
                            viz.drawVector(0, 0, -u.x + v.x, -u.y + v.y, viz.colors.purple, '-u+v', 1.5);

                            // Draw base vectors
                            viz.drawVector(0, 0, u.x, u.y, viz.colors.blue, 'u', 3);
                            viz.drawVector(0, 0, v.x, v.y, viz.colors.orange, 'v', 3);
                            viz.drawDraggables();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that the zero vector \\(0\\) in any vector space is unique.',
                    hint: 'Suppose \\(0\\) and \\(0\'\\) are both zero vectors. Apply the defining property of each to the other.',
                    solution: 'Suppose \\(0\\) and \\(0\'\\) are both zero vectors. Then \\(0 = 0 + 0\' = 0\'\\), where the first equality uses that \\(0\'\\) is a zero vector (\\(v + 0\' = v\\) for all \\(v\\)), and the second uses that \\(0\\) is a zero vector. Thus the zero vector is unique.'
                },
                {
                    question: 'Let \\(V\\) be a vector space over a field \\(F\\). Prove that \\(0 \\cdot v = 0\\) and \\(\\alpha \\cdot 0 = 0\\) for all \\(\\alpha \\in F\\) and \\(v \\in V\\). (Note: different zeros!)',
                    hint: 'Use the distributive law and the uniqueness of additive inverses. For the first, write \\(0 \\cdot v = (0 + 0) \\cdot v\\).',
                    solution: 'For \\(0 \\cdot v = 0\\): We have \\(0 \\cdot v = (0 + 0) \\cdot v = 0 \\cdot v + 0 \\cdot v\\) by distributivity. Adding \\(-(0 \\cdot v)\\) to both sides gives \\(0 = 0 \\cdot v\\). For \\(\\alpha \\cdot 0 = 0\\): We have \\(\\alpha \\cdot 0 = \\alpha \\cdot (0 + 0) = \\alpha \\cdot 0 + \\alpha \\cdot 0\\). Adding \\(-(\\alpha \\cdot 0)\\) to both sides gives \\(0 = \\alpha \\cdot 0\\).'
                },
                {
                    question: 'Show that the intersection of any family of subspaces \\(\\{W_\\lambda\\}_{\\lambda \\in \\Lambda}\\) of a vector space \\(V\\) is itself a subspace.',
                    hint: 'Check the subspace criterion: if \\(u, v \\in \\bigcap W_\\lambda\\), then \\(u, v \\in W_\\lambda\\) for all \\(\\lambda\\).',
                    solution: 'Let \\(W = \\bigcap_{\\lambda \\in \\Lambda} W_\\lambda\\). First, \\(0 \\in W_\\lambda\\) for all \\(\\lambda\\), so \\(0 \\in W\\) and \\(W \\neq \\emptyset\\). Now let \\(u, v \\in W\\) and \\(\\alpha, \\beta \\in F\\). Then \\(u, v \\in W_\\lambda\\) for all \\(\\lambda \\in \\Lambda\\). Since each \\(W_\\lambda\\) is a subspace, \\(\\alpha u + \\beta v \\in W_\\lambda\\) for all \\(\\lambda\\). Thus \\(\\alpha u + \\beta v \\in W\\). By the subspace criterion, \\(W\\) is a subspace.'
                }
            ]
        },
        {
            id: 'ch01-sec02',
            title: 'The Lattice of Subspaces',
            content: `
                <h2>The Lattice of Subspaces</h2>

                <p>The collection of all subspaces of a vector space \\(V\\) forms a rich algebraic structure called a lattice. Understanding this structure reveals deep connections between linear algebra and order theory.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.6 (Sum of Subspaces)</div>
                    <div class="env-body">
                        <p>Let \\(U\\) and \\(W\\) be subspaces of \\(V\\). The <strong>sum</strong> \\(U + W\\) is defined by</p>
                        \\[U + W = \\{u + w \\mid u \\in U, w \\in W\\}\\]
                        <p>More generally, for a family \\(\\{W_\\lambda\\}_{\\lambda \\in \\Lambda}\\) of subspaces,</p>
                        \\[\\sum_{\\lambda \\in \\Lambda} W_\\lambda = \\left\\{\\sum_{i=1}^{n} w_i \\mid n \\in \\mathbb{N}, w_i \\in \\bigcup_{\\lambda} W_\\lambda\\right\\}\\]
                        <p>(all finite sums of vectors from the union).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.7</div>
                    <div class="env-body">
                        <p>The sum \\(U + W\\) is a subspace of \\(V\\), and it is the smallest subspace containing both \\(U\\) and \\(W\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Clearly \\(0 = 0 + 0 \\in U + W\\). Let \\(v_1 = u_1 + w_1\\) and \\(v_2 = u_2 + w_2\\) be in \\(U + W\\). Then</p>
                        \\[\\alpha v_1 + \\beta v_2 = \\alpha(u_1 + w_1) + \\beta(u_2 + w_2) = (\\alpha u_1 + \\beta u_2) + (\\alpha w_1 + \\beta w_2) \\in U + W\\]
                        <p>since \\(U\\) and \\(W\\) are closed under linear combinations. Thus \\(U + W\\) is a subspace.</p>
                        <p>For minimality, suppose \\(X\\) is a subspace with \\(U, W \\subseteq X\\). Then for any \\(u + w \\in U + W\\), we have \\(u, w \\in X\\), so \\(u + w \\in X\\). Thus \\(U + W \\subseteq X\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Why Not Union?)</div>
                    <div class="env-body">
                        <p>The union \\(U \\cup W\\) is generally <strong>not</strong> a subspace. For if \\(u \\in U \\setminus W\\) and \\(w \\in W \\setminus U\\), then \\(u, w \\in U \\cup W\\) but \\(u + w\\) may not be in either \\(U\\) or \\(W\\), hence not in \\(U \\cup W\\). This is why we define the sum instead.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.8</div>
                    <div class="env-body">
                        <p>A nontrivial vector space \\(V\\) over an infinite field \\(F\\) is not the union of finitely many proper subspaces.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>Suppose \\(V = W_1 \\cup \\cdots \\cup W_n\\) where each \\(W_i\\) is a proper subspace. We may assume \\(W_i \\not\\subseteq \\bigcup_{j \\neq i} W_j\\) for all \\(i\\). Pick \\(v \\in W_1 \\setminus (W_2 \\cup \\cdots \\cup W_n)\\) and \\(u \\notin W_1\\). Consider the infinite set \\(L = \\{v + \\alpha u \\mid \\alpha \\in F\\}\\), which is a "line" through \\(v\\) parallel to \\(u\\).</p>
                        <p>Each \\(W_i\\) contains at most one element of \\(L\\): If \\(v + \\alpha u, v + \\beta u \\in W_i\\) with \\(\\alpha \\neq \\beta\\), then \\((\\alpha - \\beta)u \\in W_i\\), so \\(u \\in W_i\\). But \\(v + \\alpha u \\in W_i\\) implies \\(v \\in W_i\\), contradicting our choice. Since \\(|L| = |F| = \\infty\\) but the union of finitely many \\(W_i\\) can contain at most \\(n\\) elements of \\(L\\), we have a contradiction.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.9 (Lattice Structure)</div>
                    <div class="env-body">
                        <p>Let \\(\\mathcal{L}(V)\\) denote the set of all subspaces of \\(V\\), partially ordered by inclusion \\(\\subseteq\\). For subspaces \\(U, W \\in \\mathcal{L}(V)\\), define:</p>
                        <ul>
                            <li><strong>Meet (greatest lower bound):</strong> \\(U \\wedge W = U \\cap W\\)</li>
                            <li><strong>Join (least upper bound):</strong> \\(U \\vee W = U + W\\)</li>
                        </ul>
                        <p>The structure \\((\\mathcal{L}(V), \\subseteq)\\) forms a <strong>complete lattice</strong> with smallest element \\(\\{0\\}\\) and largest element \\(V\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.10 (Modular Law)</div>
                    <div class="env-body">
                        <p>If \\(U, W, X \\in \\mathcal{L}(V)\\) with \\(X \\subseteq U\\), then</p>
                        \\[U \\cap (W + X) = (U \\cap W) + X\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The lattice \\(\\mathcal{L}(V)\\) captures the "geometry" of how subspaces intersect and combine. The modular law is a weakening of the distributive law \\(U \\cap (W + X) = (U \\cap W) + (U \\cap X)\\), which generally fails for vector spaces. This reflects that subspace addition is not as well-behaved as set union.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="lattice-viz"></div>
            `,
            visualizations: [
                {
                    id: 'lattice-viz',
                    title: 'Interactive: Subspace Intersection and Sum',
                    description: 'Drag vectors defining subspaces U = span(u) and W = span(w). Observe U ∩ W and U + W.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 35});
                        const u = viz.addDraggable('u', 3, 1, viz.colors.blue, 8, () => draw());
                        const w = viz.addDraggable('w', 1, 3, viz.colors.orange, 8, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw U = span(u) as a line
                            const uLen = Math.sqrt(u.x*u.x + u.y*u.y);
                            if (uLen > 0.1) {
                                viz.drawLine(0, 0, u.x, u.y, viz.colors.blue + '66', 2, false);
                            }

                            // Draw W = span(w) as a line
                            const wLen = Math.sqrt(w.x*w.x + w.y*w.y);
                            if (wLen > 0.1) {
                                viz.drawLine(0, 0, w.x, w.y, viz.colors.orange + '66', 2, false);
                            }

                            // Determine if parallel (U ∩ W = {0} or U = W)
                            const det = u.x * w.y - u.y * w.x;

                            if (Math.abs(det) < 0.01) {
                                viz.drawText('U + W = U = W (parallel)', 0, -6, viz.colors.text, 14, 'center');
                            } else {
                                // U + W = entire plane
                                viz.drawText('U + W = ℝ² (entire plane)', 0, -6, viz.colors.green, 14, 'center');
                                viz.drawText('U ∩ W = {0}', 0, -5.2, viz.colors.purple, 14, 'center');
                            }

                            // Draw vectors
                            viz.drawVector(0, 0, u.x, u.y, viz.colors.blue, 'u', 3);
                            viz.drawVector(0, 0, w.x, w.y, viz.colors.orange, 'w', 3);
                            viz.drawDraggables();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the union \\(U \\cup W\\) of two subspaces is a subspace if and only if \\(U \\subseteq W\\) or \\(W \\subseteq U\\).',
                    hint: 'For the forward direction, suppose neither is contained in the other. Pick \\(u \\in U \\setminus W\\) and \\(w \\in W \\setminus U\\), and consider \\(u + w\\).',
                    solution: '(\\(\\Leftarrow\\)) If \\(U \\subseteq W\\), then \\(U \\cup W = W\\), which is a subspace. Similarly if \\(W \\subseteq U\\). (\\(\\Rightarrow\\)) Suppose \\(U \\cup W\\) is a subspace but \\(U \\not\\subseteq W\\) and \\(W \\not\\subseteq U\\). Pick \\(u \\in U \\setminus W\\) and \\(w \\in W \\setminus U\\). Then \\(u, w \\in U \\cup W\\), so \\(u + w \\in U \\cup W\\). Thus \\(u + w \\in U\\) or \\(u + w \\in W\\). If \\(u + w \\in U\\), then \\(w = (u+w) - u \\in U\\), contradiction. If \\(u + w \\in W\\), then \\(u = (u+w) - w \\in W\\), contradiction.'
                },
                {
                    question: 'Prove the modular law: If \\(X \\subseteq U\\), then \\(U \\cap (W + X) = (U \\cap W) + X\\).',
                    hint: 'For \\(\\supseteq\\), write an element of \\(U \\cap (W + X)\\) as \\(w + x\\) with \\(w \\in W, x \\in X\\), and show \\(w \\in U\\).',
                    solution: '(\\(\\subseteq\\)) Let \\(v \\in U \\cap (W + X)\\). Then \\(v = w + x\\) for some \\(w \\in W, x \\in X\\). Since \\(v \\in U\\) and \\(x \\in X \\subseteq U\\), we have \\(w = v - x \\in U\\). Thus \\(w \\in U \\cap W\\) and \\(v = w + x \\in (U \\cap W) + X\\). (\\(\\supseteq\\)) Let \\(v = w + x\\) with \\(w \\in U \\cap W\\) and \\(x \\in X\\). Then \\(w \\in W\\) and \\(x \\in X\\), so \\(v \\in W + X\\). Also, \\(w \\in U\\) and \\(x \\in X \\subseteq U\\), so \\(v \\in U\\). Thus \\(v \\in U \\cap (W + X)\\).'
                },
                {
                    question: 'Let \\(V = \\mathbb{R}^2\\). Give an example showing that the distributive law \\(U \\cap (W + X) = (U \\cap W) + (U \\cap X)\\) can fail.',
                    hint: 'Try \\(U = \\mathbb{R}^2\\), \\(W = \\operatorname{span}(e_1)\\), \\(X = \\operatorname{span}(e_2)\\).',
                    solution: 'Let \\(U = \\mathbb{R}^2\\), \\(W = \\operatorname{span}\\{(1,0)\\}\\), and \\(X = \\operatorname{span}\\{(0,1)\\}\\). Then \\(W + X = \\mathbb{R}^2\\), so \\(U \\cap (W + X) = \\mathbb{R}^2\\). But \\(U \\cap W = W\\) and \\(U \\cap X = X\\), so \\((U \\cap W) + (U \\cap X) = W + X = \\mathbb{R}^2\\). So in this case they are equal! We need a different example. Let \\(U = \\operatorname{span}\\{(1,1)\\}\\), \\(W = \\operatorname{span}\\{(1,0)\\}\\), \\(X = \\operatorname{span}\\{(0,1)\\}\\). Then \\(W + X = \\mathbb{R}^2\\), so \\(U \\cap (W+X) = U\\). But \\(U \\cap W = \\{0\\}\\) and \\(U \\cap X = \\{0\\}\\), so \\((U \\cap W) + (U \\cap X) = \\{0\\} \\neq U\\).'
                }
            ]
        },
        {
            id: 'ch01-sec03',
            title: 'Spanning Sets and Linear Independence',
            content: `
                <h2>Spanning Sets and Linear Independence</h2>

                <p>Two fundamental concepts govern how vectors generate subspaces: <em>span</em> measures what we can reach, while <em>linear independence</em> measures redundancy. Together, these notions lead to the concept of a basis.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.11 (Span)</div>
                    <div class="env-body">
                        <p>Let \\(S \\subseteq V\\) be a nonempty set of vectors. The <strong>span</strong> of \\(S\\), denoted \\(\\operatorname{span}(S)\\) or \\(\\langle S \\rangle\\), is the set of all linear combinations:</p>
                        \\[\\operatorname{span}(S) = \\left\\{\\sum_{i=1}^{n} \\alpha_i v_i \\mid n \\in \\mathbb{N}, \\alpha_i \\in F, v_i \\in S\\right\\}\\]
                        <p>We say \\(S\\) <strong>spans</strong> or <strong>generates</strong> \\(V\\) if \\(\\operatorname{span}(S) = V\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.12</div>
                    <div class="env-body">
                        <p>For any nonempty \\(S \\subseteq V\\), the span \\(\\operatorname{span}(S)\\) is a subspace of \\(V\\), and it is the smallest subspace containing \\(S\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="span-viz"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.13 (Linear Independence)</div>
                    <div class="env-body">
                        <p>A nonempty set \\(S \\subseteq V\\) is <strong>linearly independent</strong> if for any distinct vectors \\(v_1, \\ldots, v_n \\in S\\),</p>
                        \\[\\alpha_1 v_1 + \\cdots + \\alpha_n v_n = 0 \\implies \\alpha_1 = \\cdots = \\alpha_n = 0\\]
                        <p>In words: the only linear combination equaling \\(0\\) is the trivial one. A set that is not linearly independent is <strong>linearly dependent</strong>.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Linear independence means "no redundancy": no vector can be expressed in terms of the others. This is crucial for efficiency—independent sets are "economical" generating sets. Linear dependence means there's a nontrivial relation among the vectors, revealing redundancy or a "constraint."</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.14 (Characterizations of Linear Independence)</div>
                    <div class="env-body">
                        <p>Let \\(S\\) be a nonempty subset of \\(V\\). The following are equivalent:</p>
                        <ol>
                            <li>\\(S\\) is linearly independent.</li>
                            <li>Every nonzero vector \\(v \\in \\operatorname{span}(S)\\) has an essentially unique representation as a linear combination of vectors in \\(S\\) (unique up to order, with all coefficients nonzero).</li>
                            <li>No vector in \\(S\\) is a linear combination of other vectors in \\(S\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>(1 \\(\\Rightarrow\\) 2) Suppose \\(v = \\sum \\alpha_i v_i = \\sum \\beta_j u_j\\) with all coefficients nonzero. Then \\(\\sum \\alpha_i v_i - \\sum \\beta_j u_j = 0\\). Collecting like terms and using linear independence shows the two expressions are identical up to reindexing.</p>
                        <p>(2 \\(\\Rightarrow\\) 3) If \\(v \\in S\\) were a linear combination of other vectors in \\(S\\), then \\(v\\) would have two essentially different representations in \\(\\operatorname{span}(S)\\): \\(v = 1 \\cdot v\\) and \\(v = \\sum_{i} \\alpha_i v_i\\) (sum over other vectors).</p>
                        <p>(3 \\(\\Rightarrow\\) 1) If \\(\\sum \\alpha_i v_i = 0\\) with some \\(\\alpha_k \\neq 0\\), then \\(v_k = -\\sum_{i \\neq k} (\\alpha_i/\\alpha_k) v_i\\), contradicting (3).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="independence-viz"></div>

                <div class="env-block warning">
                    <div class="env-title">Common Mistake</div>
                    <div class="env-body">
                        <p>Students often confuse "no vector is a linear combination of the others" with "any two vectors are linearly independent." The former is a statement about the entire set, not just pairs. For instance, \\(\\{(1,0,0), (0,1,0), (1,1,0)\\}\\) has each pair independent, but the set is dependent: \\((1,1,0) = (1,0,0) + (0,1,0)\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'span-viz',
                    title: 'Interactive: Span of Two Vectors',
                    description: 'Drag vectors u and v to explore their span. Green points show all integer linear combinations.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});
                        const u = viz.addDraggable('u', 2, 1, viz.colors.blue, 8, () => draw());
                        const v = viz.addDraggable('v', -1, 2, viz.colors.orange, 8, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw integer linear combinations
                            for (let a = -5; a <= 5; a++) {
                                for (let b = -5; b <= 5; b++) {
                                    const x = a * u.x + b * v.x;
                                    const y = a * u.y + b * v.y;
                                    const dist = Math.sqrt(x*x + y*y);
                                    if (dist < 6.5) {
                                        viz.drawPoint(x, y, viz.colors.teal + '55', null, 3);
                                    }
                                }
                            }

                            // Highlight some specific combinations
                            viz.drawVector(0, 0, u.x + v.x, u.y + v.y, viz.colors.green, 'u+v', 2);
                            viz.drawVector(0, 0, 2*u.x - v.x, 2*u.y - v.y, viz.colors.purple + 'aa', '2u-v', 1.5);

                            viz.drawVector(0, 0, u.x, u.y, viz.colors.blue, 'u', 3);
                            viz.drawVector(0, 0, v.x, v.y, viz.colors.orange, 'v', 3);
                            viz.drawDraggables();

                            const det = u.x * v.y - u.y * v.x;
                            if (Math.abs(det) < 0.1) {
                                viz.drawText('Dependent: span is a line', 0, -5.5, viz.colors.red, 14, 'center');
                            } else {
                                viz.drawText('Independent: span is the plane', 0, -5.5, viz.colors.green, 14, 'center');
                            }
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'independence-viz',
                    title: 'Interactive: Linear Independence Checker',
                    description: 'Adjust three vectors. The system checks if they are linearly independent.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 45});
                        const u = viz.addDraggable('u', 2, 1, viz.colors.blue, 8, () => draw());
                        const v = viz.addDraggable('v', -1, 2, viz.colors.orange, 8, () => draw());
                        const w = viz.addDraggable('w', 1, -1, viz.colors.purple, 8, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Check if w is in span(u,v) by solving w = a*u + b*v
                            // This gives: w.x = a*u.x + b*v.x and w.y = a*u.y + b*v.y
                            const det = u.x * v.y - u.y * v.x;

                            let dependent = false;
                            if (Math.abs(det) < 0.01) {
                                // u and v are already dependent
                                dependent = true;
                                viz.drawText('u and v are parallel!', 0, 5, viz.colors.red, 14, 'center');
                            } else {
                                // Solve for a, b
                                const a = (w.x * v.y - w.y * v.x) / det;
                                const b = (u.x * w.y - u.y * w.x) / det;

                                // Check if this is approximately correct
                                const wx = a * u.x + b * v.x;
                                const wy = a * u.y + b * v.y;
                                const error = Math.sqrt((wx - w.x)**2 + (wy - w.y)**2);

                                if (error < 0.15) {
                                    dependent = true;
                                    viz.drawText(`Dependent: w ≈ ${a.toFixed(2)}u + ${b.toFixed(2)}v`, 0, 5, viz.colors.red, 13, 'center');

                                    // Draw the combination
                                    viz.drawVector(0, 0, a*u.x, a*u.y, viz.colors.blue + '88', `${a.toFixed(1)}u`, 1.5);
                                    viz.drawVector(a*u.x, a*u.y, wx, wy, viz.colors.orange + '88', `${b.toFixed(1)}v`, 1.5);
                                } else {
                                    viz.drawText('Independent!', 0, 5, viz.colors.green, 14, 'center');
                                }
                            }

                            viz.drawVector(0, 0, u.x, u.y, viz.colors.blue, 'u', 3);
                            viz.drawVector(0, 0, v.x, v.y, viz.colors.orange, 'v', 3);
                            viz.drawVector(0, 0, w.x, w.y, dependent ? viz.colors.red : viz.colors.purple, 'w', 3);
                            viz.drawDraggables();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that any set containing the zero vector is linearly dependent.',
                    hint: 'Exhibit a nontrivial linear combination of vectors from the set that equals zero.',
                    solution: 'Let \\(S\\) be a set containing \\(0\\). Then \\(1 \\cdot 0 = 0\\) is a linear combination with a nonzero coefficient (\\(1 \\neq 0\\)) that equals zero. Thus \\(S\\) is linearly dependent.'
                },
                {
                    question: 'Let \\(v_1, \\ldots, v_n\\) be linearly independent vectors in \\(V\\), and let \\(u \\in V\\). Prove that \\(\\{v_1, \\ldots, v_n, u\\}\\) is linearly independent if and only if \\(u \\notin \\operatorname{span}(v_1, \\ldots, v_n)\\).',
                    hint: 'For the forward direction, suppose \\(u \\in \\operatorname{span}(v_1, \\ldots, v_n)\\) and write \\(u = \\sum \\alpha_i v_i\\). For the reverse, suppose \\(\\sum \\beta_i v_i + \\gamma u = 0\\) and show \\(\\gamma = 0\\).',
                    solution: '(\\(\\Rightarrow\\)) Contrapositive: If \\(u \\in \\operatorname{span}(v_1, \\ldots, v_n)\\), write \\(u = \\sum_{i=1}^{n} \\alpha_i v_i\\). Then \\(\\sum_{i=1}^{n} (-\\alpha_i) v_i + 1 \\cdot u = 0\\) is a nontrivial dependence relation. (\\(\\Leftarrow\\)) Suppose \\(\\sum_{i=1}^{n} \\beta_i v_i + \\gamma u = 0\\). If \\(\\gamma \\neq 0\\), then \\(u = -\\sum_{i=1}^{n} (\\beta_i/\\gamma) v_i \\in \\operatorname{span}(v_1, \\ldots, v_n)\\), contradiction. So \\(\\gamma = 0\\), whence \\(\\sum \\beta_i v_i = 0\\), which implies all \\(\\beta_i = 0\\) by independence of \\(v_1, \\ldots, v_n\\).'
                },
                {
                    question: 'In \\(\\mathbb{R}^3\\), determine whether the vectors \\((1,0,1), (0,1,1), (1,1,0)\\) are linearly independent.',
                    hint: 'Set up the equation \\(\\alpha(1,0,1) + \\beta(0,1,1) + \\gamma(1,1,0) = (0,0,0)\\) and solve for \\(\\alpha, \\beta, \\gamma\\).',
                    solution: 'We have \\(\\alpha(1,0,1) + \\beta(0,1,1) + \\gamma(1,1,0) = (\\alpha+\\gamma, \\beta+\\gamma, \\alpha+\\beta) = (0,0,0)\\). This gives the system: \\(\\alpha + \\gamma = 0\\), \\(\\beta + \\gamma = 0\\), \\(\\alpha + \\beta = 0\\). From the first two equations, \\(\\alpha = -\\gamma\\) and \\(\\beta = -\\gamma\\). Substituting into the third: \\(-\\gamma - \\gamma = 0\\), so \\(\\gamma = 0\\), hence \\(\\alpha = \\beta = 0\\). Since the only solution is the trivial one, the vectors are linearly independent.'
                }
            ]
        },
        {
            id: 'ch01-sec04',
            title: 'Bases and Dimension',
            content: `
                <h2>Bases and Dimension</h2>

                <p>A basis is a "perfect" generating set: large enough to span the space, yet small enough to be linearly independent. Bases provide coordinate systems, revealing the dimension as an intrinsic invariant.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.15 (Basis)</div>
                    <div class="env-body">
                        <p>A subset \\(\\mathcal{B} \\subseteq V\\) is a <strong>basis</strong> for \\(V\\) if:</p>
                        <ol>
                            <li>\\(\\mathcal{B}\\) is linearly independent, and</li>
                            <li>\\(\\mathcal{B}\\) spans \\(V\\), i.e., \\(\\operatorname{span}(\\mathcal{B}) = V\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.16 (Characterizations of Basis)</div>
                    <div class="env-body">
                        <p>For a nonempty set \\(\\mathcal{B} \\subseteq V\\), the following are equivalent:</p>
                        <ol>
                            <li>\\(\\mathcal{B}\\) is a basis.</li>
                            <li>Every nonzero vector \\(v \\in V\\) has a unique expression as a linear combination of vectors in \\(\\mathcal{B}\\) (with nonzero coefficients, up to order).</li>
                            <li>\\(\\mathcal{B}\\) is a minimal spanning set: \\(\\operatorname{span}(\\mathcal{B}) = V\\) but no proper subset of \\(\\mathcal{B}\\) spans \\(V\\).</li>
                            <li>\\(\\mathcal{B}\\) is a maximal linearly independent set: \\(\\mathcal{B}\\) is linearly independent but any proper superset is dependent.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>A basis gives a "coordinate system": each vector \\(v\\) has unique coordinates \\((\\alpha_1, \\ldots, \\alpha_n)\\) relative to \\(\\mathcal{B}\\). This establishes an isomorphism \\(V \\cong F^n\\), making abstract spaces computationally tractable. Minimality and maximality reflect that a basis is "just right"—neither redundant nor incomplete.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 1.17 (Standard Basis)</div>
                    <div class="env-body">
                        <p>The <strong>standard basis</strong> for \\(F^n\\) is \\(\\{e_1, \\ldots, e_n\\}\\) where</p>
                        \\[e_i = (0, \\ldots, 0, 1, 0, \\ldots, 0)\\]
                        <p>(the \\(i\\)-th entry is 1, all others are 0). Any \\((x_1, \\ldots, x_n) = \\sum_{i=1}^{n} x_i e_i\\), so the \\(e_i\\) span \\(F^n\\). If \\(\\sum \\alpha_i e_i = 0\\), then \\((\\alpha_1, \\ldots, \\alpha_n) = 0\\), so all \\(\\alpha_i = 0\\), proving independence.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.18 (Steinitz Exchange Lemma)</div>
                    <div class="env-body">
                        <p>Let \\(S = \\{w_1, \\ldots, w_m\\}\\) span \\(V\\) and let \\(L = \\{v_1, \\ldots, v_n\\}\\) be linearly independent. Then \\(n \\leq m\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Exchange Argument)</div>
                    <div class="env-body">
                        <p>We perform an iterative "exchange" process. Initially, list the spanning set followed by the independent set:</p>
                        \\[w_1, \\ldots, w_m \\quad | \\quad v_1, \\ldots, v_n\\]
                        <p><strong>Step 1:</strong> Since \\(S\\) spans \\(V\\), we can write \\(v_1 = \\sum \\alpha_i w_i\\) with some \\(\\alpha_j \\neq 0\\). Move \\(v_1\\) to the front and delete \\(w_j\\):</p>
                        \\[v_1, w_1, \\ldots, \\widehat{w_j}, \\ldots, w_m \\quad | \\quad v_2, \\ldots, v_n\\]
                        <p>(Here \\(\\widehat{w_j}\\) means \\(w_j\\) is omitted.) The first list still spans \\(V\\) because \\(w_j\\) can be recovered from \\(v_1\\) and the remaining \\(w_i\\).</p>
                        <p><strong>Step \\(k\\):</strong> Repeat for \\(v_k\\). Write \\(v_k\\) as a linear combination of the current spanning set. Since \\(L\\) is independent, the dependence relation must involve at least one \\(w_i\\) (not just \\(v_1, \\ldots, v_{k-1}\\)). Exchange \\(v_k\\) in and remove that \\(w_i\\).</p>
                        <p>After \\(n\\) steps, we have exhausted all \\(v_j\\) and removed \\(n\\) of the \\(w_i\\). Since we must have \\(n \\leq m\\) (otherwise we'd run out of \\(w_i\\) to remove), the theorem is proved.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 1.19 (Dimension is Well-Defined)</div>
                    <div class="env-body">
                        <p>If \\(V\\) has a finite spanning set, then any two bases of \\(V\\) have the same cardinality.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Let \\(\\mathcal{B}_1\\) and \\(\\mathcal{B}_2\\) be bases. Since \\(\\mathcal{B}_1\\) spans and \\(\\mathcal{B}_2\\) is independent, \\(|\\mathcal{B}_2| \\leq |\\mathcal{B}_1|\\). Reversing roles, \\(|\\mathcal{B}_1| \\leq |\\mathcal{B}_2|\\). Thus \\(|\\mathcal{B}_1| = |\\mathcal{B}_2|\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.20 (Dimension)</div>
                    <div class="env-body">
                        <p>A vector space \\(V\\) is <strong>finite-dimensional</strong> if it has a finite basis. The <strong>dimension</strong> of \\(V\\), denoted \\(\\dim V\\), is the cardinality of any basis. By convention, \\(\\dim \\{0\\} = 0\\).</p>
                        <p>For infinite-dimensional spaces, the dimension is the cardinality of any basis (all bases have the same cardinality by Zorn's lemma arguments).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.21 (Existence of Bases)</div>
                    <div class="env-body">
                        <p>Every nonzero vector space \\(V\\) has a basis. Moreover:</p>
                        <ol>
                            <li>Any linearly independent set can be extended to a basis.</li>
                            <li>Any spanning set contains a basis.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch (Zorn's Lemma)</div>
                    <div class="env-body">
                        <p>Let \\(L\\) be a linearly independent set and \\(S\\) a spanning set with \\(L \\subseteq S\\). Consider the poset \\(\\mathcal{P}\\) of all linearly independent subsets of \\(S\\) containing \\(L\\), ordered by inclusion. Any chain \\(\\mathcal{C}\\) in \\(\\mathcal{P}\\) has an upper bound (its union). By Zorn's lemma, \\(\\mathcal{P}\\) has a maximal element \\(\\mathcal{B}\\). By maximality, \\(\\mathcal{B}\\) spans \\(S\\), hence spans \\(V\\). Thus \\(\\mathcal{B}\\) is a basis with \\(L \\subseteq \\mathcal{B} \\subseteq S\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.22 (Dimension Formula for Subspaces)</div>
                    <div class="env-body">
                        <p>Let \\(U, W\\) be subspaces of a finite-dimensional vector space \\(V\\). Then</p>
                        \\[\\dim(U + W) = \\dim U + \\dim W - \\dim(U \\cap W)\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Let \\(\\mathcal{B}_0\\) be a basis for \\(U \\cap W\\). Extend to bases \\(\\mathcal{B}_0 \\cup \\mathcal{B}_U\\) for \\(U\\) and \\(\\mathcal{B}_0 \\cup \\mathcal{B}_W\\) for \\(W\\). We claim \\(\\mathcal{B} = \\mathcal{B}_0 \\cup \\mathcal{B}_U \\cup \\mathcal{B}_W\\) is a basis for \\(U + W\\).</p>
                        <p><em>Spanning:</em> Any \\(v \\in U + W\\) is \\(u + w\\) with \\(u \\in U, w \\in W\\). Write \\(u\\) in terms of \\(\\mathcal{B}_0 \\cup \\mathcal{B}_U\\) and \\(w\\) in terms of \\(\\mathcal{B}_0 \\cup \\mathcal{B}_W\\). Thus \\(v \\in \\operatorname{span}(\\mathcal{B})\\).</p>
                        <p><em>Independence:</em> Suppose \\(\\sum \\alpha_i b_i = 0\\) for \\(b_i \\in \\mathcal{B}\\). Separate the sum: \\((\\sum_{b \\in \\mathcal{B}_0 \\cup \\mathcal{B}_U} \\alpha_b b) + (\\sum_{b \\in \\mathcal{B}_W} \\alpha_b b) = 0\\). The first part is in \\(U\\), the second in \\(W\\), so both are in \\(U \\cap W\\). Thus the second part is in \\(\\operatorname{span}(\\mathcal{B}_0)\\), contradicting independence of \\(\\mathcal{B}_0 \\cup \\mathcal{B}_W\\) unless all \\(\\alpha_b = 0\\) for \\(b \\in \\mathcal{B}_W\\). Similarly for the first part.</p>
                        <p>Hence \\(\\dim(U + W) = |\\mathcal{B}| = |\\mathcal{B}_0| + |\\mathcal{B}_U| + |\\mathcal{B}_W| = \\dim(U \\cap W) + (\\dim U - \\dim(U \\cap W)) + (\\dim W - \\dim(U \\cap W))\\), which simplifies to the formula.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that \\(\\{(1,1,0), (1,0,1), (0,1,1)\\}\\) is a basis for \\(\\mathbb{R}^3\\).',
                    hint: 'Check linear independence by solving \\(\\alpha(1,1,0) + \\beta(1,0,1) + \\gamma(0,1,1) = 0\\). Since \\(\\dim \\mathbb{R}^3 = 3\\), independence of 3 vectors implies spanning.',
                    solution: 'Set \\(\\alpha(1,1,0) + \\beta(1,0,1) + \\gamma(0,1,1) = (\\alpha+\\beta, \\alpha+\\gamma, \\beta+\\gamma) = (0,0,0)\\). This gives: \\(\\alpha + \\beta = 0\\), \\(\\alpha + \\gamma = 0\\), \\(\\beta + \\gamma = 0\\). From the first two, \\(\\beta = \\gamma\\). From the third, \\(2\\beta = 0\\), so \\(\\beta = \\gamma = 0\\), whence \\(\\alpha = 0\\). Thus the vectors are linearly independent. Since they are 3 independent vectors in a 3-dimensional space, they form a basis.'
                },
                {
                    question: 'Let \\(U = \\{(x,y,z) \\in \\mathbb{R}^3 \\mid x + y + z = 0\\}\\) and \\(W = \\operatorname{span}\\{(1,1,0)\\}\\). Compute \\(\\dim(U + W)\\) and \\(\\dim(U \\cap W)\\).',
                    hint: 'First find \\(\\dim U\\) by finding a basis for \\(U\\). Then determine \\(U \\cap W\\) explicitly.',
                    solution: '\\(U\\) has basis \\(\\{(1,-1,0), (1,0,-1)\\}\\) (check: independent and satisfy constraint), so \\(\\dim U = 2\\). \\(W = \\operatorname{span}\\{(1,1,0)\\}\\) has \\(\\dim W = 1\\). For \\(U \\cap W\\): a vector \\((t,t,0) \\in W\\) is in \\(U\\) iff \\(t + t + 0 = 0\\), i.e., \\(t = 0\\). So \\(U \\cap W = \\{0\\}\\) and \\(\\dim(U \\cap W) = 0\\). By the dimension formula, \\(\\dim(U + W) = 2 + 1 - 0 = 3\\). So \\(U + W = \\mathbb{R}^3\\).'
                },
                {
                    question: 'Prove that if \\(W\\) is a subspace of a finite-dimensional vector space \\(V\\) with \\(\\dim W = \\dim V\\), then \\(W = V\\).',
                    hint: 'Take a basis for \\(W\\) and show it spans \\(V\\).',
                    solution: 'Let \\(\\mathcal{B}\\) be a basis for \\(W\\). Then \\(|\\mathcal{B}| = \\dim W = \\dim V\\). Since \\(\\mathcal{B} \\subseteq W \\subseteq V\\), the set \\(\\mathcal{B}\\) is linearly independent in \\(V\\). By Corollary 1.19, any linearly independent set in \\(V\\) of size \\(\\dim V\\) is a basis for \\(V\\). Hence \\(\\mathcal{B}\\) is a basis for \\(V\\), so \\(V = \\operatorname{span}(\\mathcal{B}) \\subseteq W\\). Thus \\(W = V\\).'
                }
            ]
        },
        {
            id: 'ch01-sec05',
            title: 'Direct Sums',
            content: `
                <h2>Direct Sums</h2>

                <p>Direct sums formalize the decomposition of a vector space into independent components. This construction is fundamental for understanding structure theorems in linear algebra.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.23 (External Direct Sum)</div>
                    <div class="env-body">
                        <p>Let \\(V_1, \\ldots, V_k\\) be vector spaces over \\(F\\). The <strong>external direct sum</strong></p>
                        \\[V = V_1 \\oplus \\cdots \\oplus V_k\\]
                        <p>is the vector space of \\(k\\)-tuples \\((v_1, \\ldots, v_k)\\) with \\(v_i \\in V_i\\), equipped with componentwise operations:</p>
                        \\[(v_1, \\ldots, v_k) + (w_1, \\ldots, w_k) = (v_1 + w_1, \\ldots, v_k + w_k)\\]
                        \\[\\alpha(v_1, \\ldots, v_k) = (\\alpha v_1, \\ldots, \\alpha v_k)\\]
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 1.24</div>
                    <div class="env-body">
                        <p>The coordinate space \\(F^n = F \\oplus \\cdots \\oplus F\\) (\\(n\\) times) is the external direct sum of \\(n\\) copies of the field \\(F\\) (viewed as a 1-dimensional vector space over itself).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.25 (Internal Direct Sum)</div>
                    <div class="env-body">
                        <p>Let \\(W_1, \\ldots, W_k\\) be subspaces of \\(V\\). We say \\(V\\) is the <strong>internal direct sum</strong> of \\(W_1, \\ldots, W_k\\), written</p>
                        \\[V = W_1 \\oplus \\cdots \\oplus W_k\\]
                        <p>if:</p>
                        <ol>
                            <li><strong>Sum condition:</strong> \\(V = W_1 + \\cdots + W_k\\), i.e., every \\(v \\in V\\) can be written \\(v = w_1 + \\cdots + w_k\\) with \\(w_i \\in W_i\\).</li>
                            <li><strong>Uniqueness condition:</strong> The representation is unique, i.e., if \\(w_1 + \\cdots + w_k = 0\\) with \\(w_i \\in W_i\\), then \\(w_i = 0\\) for all \\(i\\).</li>
                        </ol>
                        <p>Equivalently, \\(V = W_1 \\oplus \\cdots \\oplus W_k\\) if \\(V = W_1 + \\cdots + W_k\\) and for each \\(i\\),</p>
                        \\[W_i \\cap (W_1 + \\cdots + W_{i-1} + W_{i+1} + \\cdots + W_k) = \\{0\\}\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The direct sum \\(V = W_1 \\oplus W_2\\) means "\\(V\\) decomposes cleanly into independent parts \\(W_1\\) and \\(W_2\\)." Every vector has a unique "address" \\((w_1, w_2)\\). This is analogous to decomposing \\(\\mathbb{R}^3\\) as the \\(xy\\)-plane plus the \\(z\\)-axis: \\(\\mathbb{R}^3 = \\mathbb{R}^2 \\oplus \\mathbb{R}\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.26 (Dimension of Direct Sum)</div>
                    <div class="env-body">
                        <p>If \\(V = W_1 \\oplus \\cdots \\oplus W_k\\), then</p>
                        \\[\\dim V = \\dim W_1 + \\cdots + \\dim W_k\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Let \\(\\mathcal{B}_i\\) be a basis for \\(W_i\\). We claim \\(\\mathcal{B} = \\mathcal{B}_1 \\cup \\cdots \\cup \\mathcal{B}_k\\) is a basis for \\(V\\).</p>
                        <p><em>Spanning:</em> Any \\(v \\in V\\) is \\(w_1 + \\cdots + w_k\\). Each \\(w_i \\in \\operatorname{span}(\\mathcal{B}_i)\\), so \\(v \\in \\operatorname{span}(\\mathcal{B})\\).</p>
                        <p><em>Independence:</em> Suppose \\(\\sum_{i=1}^{k} \\sum_{b \\in \\mathcal{B}_i} \\alpha_b b = 0\\). For each \\(i\\), let \\(w_i = \\sum_{b \\in \\mathcal{B}_i} \\alpha_b b \\in W_i\\). Then \\(w_1 + \\cdots + w_k = 0\\). By uniqueness in the direct sum, \\(w_i = 0\\) for all \\(i\\). By independence of \\(\\mathcal{B}_i\\), all \\(\\alpha_b = 0\\) for \\(b \\in \\mathcal{B}_i\\). Thus \\(\\mathcal{B}\\) is independent.</p>
                        <p>Hence \\(\\dim V = |\\mathcal{B}| = \\sum_{i=1}^{k} |\\mathcal{B}_i| = \\sum_{i=1}^{k} \\dim W_i\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.27 (Existence of Complements)</div>
                    <div class="env-body">
                        <p>If \\(W\\) is a subspace of \\(V\\), there exists a subspace \\(U\\) such that \\(V = W \\oplus U\\). We call \\(U\\) a <strong>complement</strong> of \\(W\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Let \\(\\mathcal{B}_W\\) be a basis for \\(W\\). Extend to a basis \\(\\mathcal{B} = \\mathcal{B}_W \\cup \\mathcal{B}_U\\) for \\(V\\). Define \\(U = \\operatorname{span}(\\mathcal{B}_U)\\). Then \\(W + U = V\\) (since \\(\\mathcal{B}\\) spans \\(V\\)) and \\(W \\cap U = \\{0\\}\\) (if \\(v \\in W \\cap U\\), write \\(v\\) using \\(\\mathcal{B}_W\\) and \\(\\mathcal{B}_U\\); uniqueness of basis representation implies \\(v = 0\\)).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body">
                        <p>Complements are <strong>not unique</strong>. For instance, in \\(\\mathbb{R}^2\\), the \\(x\\)-axis has infinitely many complements: any line through the origin not parallel to the \\(x\\)-axis. However, all complements of \\(W\\) are isomorphic (they all have dimension \\(\\dim V - \\dim W\\)).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 1.28 (Symmetric and Skew-Symmetric Matrices)</div>
                    <div class="env-body">
                        <p>Let \\(\\mathcal{M}_n(F)\\) be the space of \\(n \\times n\\) matrices over a field \\(F\\) with \\(\\operatorname{char}(F) \\neq 2\\). Define:</p>
                        <ul>
                            <li>\\(\\operatorname{Sym}_n = \\{A \\mid A^T = A\\}\\) (symmetric matrices)</li>
                            <li>\\(\\operatorname{Skew}_n = \\{A \\mid A^T = -A\\}\\) (skew-symmetric matrices)</li>
                        </ul>
                        <p>Any matrix \\(A\\) decomposes as \\(A = \\frac{1}{2}(A + A^T) + \\frac{1}{2}(A - A^T)\\), where the first term is symmetric and the second is skew-symmetric. If \\(A \\in \\operatorname{Sym}_n \\cap \\operatorname{Skew}_n\\), then \\(A = -A\\), so \\(2A = 0\\), whence \\(A = 0\\) (since \\(\\operatorname{char}(F) \\neq 2\\)). Thus</p>
                        \\[\\mathcal{M}_n(F) = \\operatorname{Sym}_n \\oplus \\operatorname{Skew}_n\\]
                        <p>Moreover, \\(\\dim \\operatorname{Sym}_n = \\binom{n+1}{2}\\) and \\(\\dim \\operatorname{Skew}_n = \\binom{n}{2}\\), which sum to \\(n^2\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="directsum-viz"></div>
            `,
            visualizations: [
                {
                    id: 'directsum-viz',
                    title: 'Interactive: Direct Sum Decomposition',
                    description: 'Drag a vector v. The visualization decomposes v uniquely as v = w₁ + w₂ where w₁ ∈ W₁ and w₂ ∈ W₂.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});
                        const v = viz.addDraggable('v', 3, 2, viz.colors.green, 8, () => draw());

                        // Define W1 = span((2,1)) and W2 = span((0,1))
                        const w1_basis = {x: 2, y: 1};
                        const w2_basis = {x: 0, y: 1};

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw W1 and W2 as lines
                            viz.drawLine(0, 0, w1_basis.x, w1_basis.y, viz.colors.blue + '44', 2, false);
                            viz.drawLine(0, 0, w2_basis.x, w2_basis.y, viz.colors.orange + '44', 2, false);

                            // Decompose v = w1 + w2
                            // v = a*(2,1) + b*(0,1) means v.x = 2a, v.y = a + b
                            // So a = v.x/2, b = v.y - a = v.y - v.x/2
                            const a = v.x / 2;
                            const b = v.y - a;
                            const w1 = {x: a * w1_basis.x, y: a * w1_basis.y};
                            const w2 = {x: b * w2_basis.x, y: b * w2_basis.y};

                            // Draw the decomposition
                            viz.drawVector(0, 0, w1.x, w1.y, viz.colors.blue, 'w₁', 3);
                            viz.drawVector(w1.x, w1.y, w1.x + w2.x, w1.y + w2.y, viz.colors.orange, 'w₂', 3);
                            viz.drawVector(0, 0, v.x, v.y, viz.colors.green, 'v', 3);

                            // Draw parallelogram
                            viz.drawSegment(0, 0, w1.x, w1.y, viz.colors.blue + '88', 1, true);
                            viz.drawSegment(w1.x, w1.y, v.x, v.y, viz.colors.orange + '88', 1, true);
                            viz.drawSegment(0, 0, w2.x, w2.y, viz.colors.orange + '88', 1, true);
                            viz.drawSegment(w2.x, w2.y, v.x, v.y, viz.colors.blue + '88', 1, true);

                            viz.drawText('W₁ = span((2,1))', -4, 5.5, viz.colors.blue, 12);
                            viz.drawText('W₂ = span((0,1))', -4, 4.8, viz.colors.orange, 12);
                            viz.drawText(`v = ${a.toFixed(2)}·(2,1) + ${b.toFixed(2)}·(0,1)`, -4, 4.1, viz.colors.text, 11);

                            viz.drawDraggables();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that if \\(V = W_1 \\oplus W_2\\) and \\(\\dim V = n\\), \\(\\dim W_1 = k\\), then \\(\\dim W_2 = n - k\\).',
                    hint: 'Use the dimension formula for direct sums and the fact that \\(W_1 \\cap W_2 = \\{0\\}\\).',
                    solution: 'By Theorem 1.26, \\(\\dim V = \\dim W_1 + \\dim W_2\\). Since \\(V = W_1 \\oplus W_2\\), we have \\(\\dim V = n\\) and \\(\\dim W_1 = k\\). Thus \\(n = k + \\dim W_2\\), so \\(\\dim W_2 = n - k\\).'
                },
                {
                    question: 'In \\(\\mathbb{R}^3\\), let \\(W = \\{(x,y,z) \\mid x + y = 0\\}\\) and \\(U = \\operatorname{span}\\{(1,1,0)\\}\\). Is \\(\\mathbb{R}^3 = W \\oplus U\\)? If not, find a complement to \\(W\\).',
                    hint: 'Check if \\(W \\cap U = \\{0\\}\\) and \\(W + U = \\mathbb{R}^3\\). For dimension reasons, \\(\\dim W + \\dim U = \\dim \\mathbb{R}^3\\) is necessary.',
                    solution: '\\(\\dim W = 2\\) (basis: \\(\\{(1,-1,0), (0,0,1)\\}\\)) and \\(\\dim U = 1\\). For \\((t,t,0) \\in U\\) to be in \\(W\\), we need \\(t + t = 0\\), so \\(t = 0\\). Thus \\(W \\cap U = \\{0\\}\\). By dimension, \\(\\dim(W + U) = \\dim W + \\dim U - \\dim(W \\cap U) = 2 + 1 - 0 = 3\\), so \\(W + U = \\mathbb{R}^3\\). Hence \\(\\mathbb{R}^3 = W \\oplus U\\). ✓'
                },
                {
                    question: 'Prove that complements are not unique by exhibiting two different complements of the \\(x\\)-axis in \\(\\mathbb{R}^2\\).',
                    hint: 'Any line through the origin not equal to the \\(x\\)-axis will work.',
                    solution: 'Let \\(W = \\operatorname{span}\\{(1,0)\\}\\) be the \\(x\\)-axis. Let \\(U_1 = \\operatorname{span}\\{(0,1)\\}\\) and \\(U_2 = \\operatorname{span}\\{(1,1)\\}\\). Both \\(U_1\\) and \\(U_2\\) are 1-dimensional, \\(W \\cap U_1 = W \\cap U_2 = \\{0\\}\\) (check by solving), and \\(W + U_1 = W + U_2 = \\mathbb{R}^2\\) (dimension count). Thus both are complements, but \\(U_1 \\neq U_2\\).'
                }
            ]
        },
        {
            id: 'ch01-sec06',
            title: 'Quotient Spaces',
            content: `
                <h2>Quotient Spaces</h2>

                <p>Quotient spaces formalize the process of "collapsing" a subspace to zero. This construction is dual to taking subspaces and plays a central role in homological algebra and representation theory.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.29 (Cosets)</div>
                    <div class="env-body">
                        <p>Let \\(W\\) be a subspace of \\(V\\). For \\(v \\in V\\), the <strong>coset</strong> of \\(v\\) modulo \\(W\\) is</p>
                        \\[v + W = \\{v + w \\mid w \\in W\\}\\]
                        <p>Two vectors \\(v_1, v_2\\) are <strong>congruent modulo \\(W\\)</strong>, written \\(v_1 \\equiv v_2 \\ (\\text{mod } W)\\), if \\(v_1 - v_2 \\in W\\), i.e., \\(v_1 + W = v_2 + W\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.30</div>
                    <div class="env-body">
                        <p>Congruence modulo \\(W\\) is an equivalence relation on \\(V\\). The equivalence class of \\(v\\) is \\(v + W\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.31 (Quotient Space)</div>
                    <div class="env-body">
                        <p>The <strong>quotient space</strong> \\(V/W\\) (read "\\(V\\) mod \\(W\\)") is the set of all cosets:</p>
                        \\[V/W = \\{v + W \\mid v \\in V\\}\\]
                        <p>with operations defined by:</p>
                        <ul>
                            <li><strong>Addition:</strong> \\((v_1 + W) + (v_2 + W) = (v_1 + v_2) + W\\)</li>
                            <li><strong>Scalar multiplication:</strong> \\(\\alpha(v + W) = (\\alpha v) + W\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.32</div>
                    <div class="env-body">
                        <p>The operations on \\(V/W\\) are well-defined (independent of coset representatives), and \\(V/W\\) is a vector space over \\(F\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p><em>Well-definedness:</em> Suppose \\(v_1 + W = v_1' + W\\) and \\(v_2 + W = v_2' + W\\). Then \\(v_1 - v_1', v_2 - v_2' \\in W\\). Thus \\((v_1 + v_2) - (v_1' + v_2') = (v_1 - v_1') + (v_2 - v_2') \\in W\\), so \\((v_1 + v_2) + W = (v_1' + v_2') + W\\). Similarly for scalar multiplication.</p>
                        <p><em>Vector space axioms:</em> The zero element is \\(0 + W = W\\). Additive inverses: \\(-(v + W) = (-v) + W\\). The remaining axioms are inherited from \\(V\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The quotient \\(V/W\\) "collapses" \\(W\\) to a point. Geometrically, if \\(W\\) is a line through the origin in \\(\\mathbb{R}^3\\), then \\(\\mathbb{R}^3/W\\) is the plane orthogonal to \\(W\\). Each coset \\(v + W\\) is a line parallel to \\(W\\), and we treat all vectors on that line as "the same."</p>
                        <p>This construction is ubiquitous: think of modular arithmetic (\\(\\mathbb{Z}/n\\mathbb{Z}\\)), or identifying antipodal points on a sphere to get projective space.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.33 (Dimension of Quotient)</div>
                    <div class="env-body">
                        <p>If \\(W\\) is a subspace of a finite-dimensional vector space \\(V\\), then</p>
                        \\[\\dim(V/W) = \\dim V - \\dim W\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Choose a complement \\(U\\) of \\(W\\), so \\(V = W \\oplus U\\). We claim \\(V/W \\cong U\\) (isomorphic as vector spaces). Define \\(\\phi: U \\to V/W\\) by \\(\\phi(u) = u + W\\).</p>
                        <p><em>Surjective:</em> Any \\(v + W \\in V/W\\) has \\(v = w + u\\) with \\(w \\in W, u \\in U\\). Then \\(v + W = (w + u) + W = u + W = \\phi(u)\\).</p>
                        <p><em>Injective:</em> If \\(\\phi(u) = W\\), then \\(u + W = W\\), so \\(u \\in W\\). But \\(u \\in U\\) and \\(W \\cap U = \\{0\\}\\), so \\(u = 0\\).</p>
                        <p><em>Linear:</em> \\(\\phi(\\alpha u_1 + \\beta u_2) = (\\alpha u_1 + \\beta u_2) + W = \\alpha(u_1 + W) + \\beta(u_2 + W) = \\alpha\\phi(u_1) + \\beta\\phi(u_2)\\).</p>
                        <p>Thus \\(\\dim(V/W) = \\dim U = \\dim V - \\dim W\\) by the dimension formula for direct sums.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 1.34</div>
                    <div class="env-body">
                        <p>Let \\(W = \\{(x,y,z) \\in \\mathbb{R}^3 \\mid z = 0\\}\\) be the \\(xy\\)-plane. Then \\(\\mathbb{R}^3/W\\) is 1-dimensional. Each coset is a plane parallel to \\(W\\), parametrized by the \\(z\\)-coordinate. The map \\((x,y,z) + W \\mapsto z\\) gives an isomorphism \\(\\mathbb{R}^3/W \\cong \\mathbb{R}\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="quotient-viz"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.35 (First Isomorphism Theorem for Vector Spaces)</div>
                    <div class="env-body">
                        <p>If \\(T: V \\to U\\) is a linear transformation, then</p>
                        \\[V / \\ker(T) \\cong \\operatorname{im}(T)\\]
                        <p>where \\(\\ker(T) = \\{v \\in V \\mid T(v) = 0\\}\\) is the kernel and \\(\\operatorname{im}(T) = \\{T(v) \\mid v \\in V\\}\\) is the image.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>Define \\(\\bar{T}: V/\\ker(T) \\to \\operatorname{im}(T)\\) by \\(\\bar{T}(v + \\ker(T)) = T(v)\\). This is well-defined: if \\(v + \\ker(T) = v' + \\ker(T)\\), then \\(v - v' \\in \\ker(T)\\), so \\(T(v - v') = 0\\), whence \\(T(v) = T(v')\\). Clearly \\(\\bar{T}\\) is linear, surjective (by definition of image), and injective (\\(\\bar{T}(v + \\ker(T)) = 0\\) implies \\(T(v) = 0\\), so \\(v \\in \\ker(T)\\), i.e., \\(v + \\ker(T) = \\ker(T)\\) is the zero coset).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Rank-Nullity Theorem)</div>
                    <div class="env-body">
                        <p>The first isomorphism theorem immediately implies the rank-nullity theorem:</p>
                        \\[\\dim V = \\dim \\ker(T) + \\dim \\operatorname{im}(T)\\]
                        <p>since \\(\\dim V = \\dim \\ker(T) + \\dim(V/\\ker(T)) = \\dim \\ker(T) + \\dim \\operatorname{im}(T)\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'quotient-viz',
                    title: 'Interactive: Quotient Space Visualization',
                    description: 'W is a line (red). Drag v to see its coset v + W (all points at the same perpendicular distance from W).',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});
                        const v = viz.addDraggable('v', 2, 3, viz.colors.green, 8, () => draw());

                        // W = span((1, 1/2))
                        const w = {x: 2, y: 1};

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw W as a line
                            viz.drawLine(0, 0, w.x, w.y, viz.colors.red + '88', 3, false);
                            viz.drawText('W = span(w)', -5, 5.5, viz.colors.red, 13);

                            // Project v onto W to get w0 (representative in W closest to origin)
                            const wLen2 = w.x*w.x + w.y*w.y;
                            const proj = (v.x * w.x + v.y * w.y) / wLen2;
                            const w0 = {x: proj * w.x, y: proj * w.y};

                            // v + W is the line through v parallel to W
                            // This is the set {v + tw : t ∈ ℝ}
                            // To draw it, find two points on this line far from v
                            const t1 = -3, t2 = 3;
                            const p1 = {x: v.x + t1*w.x, y: v.y + t1*w.y};
                            const p2 = {x: v.x + t2*w.x, y: v.y + t2*w.y};

                            // Draw v + W
                            viz.drawSegment(p1.x, p1.y, p2.x, p2.y, viz.colors.green + '88', 3, false);

                            // Draw a few sample points in v + W
                            for (let t = -2; t <= 2; t += 0.5) {
                                const px = v.x + t*w.x;
                                const py = v.y + t*w.y;
                                viz.drawPoint(px, py, viz.colors.green + '66', null, 3);
                            }

                            // Draw perpendicular from W to v's coset
                            const perp = {x: v.x - w0.x, y: v.y - w0.y};
                            viz.drawSegment(0, 0, perp.x, perp.y, viz.colors.blue + 'aa', 2, true);
                            viz.drawText('Coset representative', perp.x + 0.5, perp.y + 0.5, viz.colors.blue, 11);

                            viz.drawVector(0, 0, w.x, w.y, viz.colors.red, 'w', 3);
                            viz.drawVector(0, 0, v.x, v.y, viz.colors.green, 'v', 3);
                            viz.drawText('v + W (coset)', v.x + 1, v.y + 0.7, viz.colors.green, 13);

                            viz.drawDraggables();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(W = \\operatorname{span}\\{(1,0,0)\\}\\) in \\(\\mathbb{R}^3\\). Describe the cosets of \\(W\\) geometrically and compute \\(\\dim(\\mathbb{R}^3/W)\\).',
                    hint: 'Each coset is a line parallel to the \\(x\\)-axis. How many "degrees of freedom" remain after collapsing the \\(x\\)-direction?',
                    solution: 'Each coset \\((x,y,z) + W = \\{(x+t, y, z) \\mid t \\in \\mathbb{R}\\}\\) is a line parallel to the \\(x\\)-axis. Two vectors are in the same coset iff they have the same \\(y\\) and \\(z\\) coordinates. Thus \\(\\mathbb{R}^3/W\\) is naturally identified with the \\(yz\\)-plane, and \\(\\dim(\\mathbb{R}^3/W) = \\dim \\mathbb{R}^3 - \\dim W = 3 - 1 = 2\\).'
                },
                {
                    question: 'Prove that the operations on \\(V/W\\) are well-defined.',
                    hint: 'Show that if \\(v_1 + W = v_1^{\\prime} + W\\), then \\((v_1 + v_2) + W = (v_1^{\\prime} + v_2) + W\\).',
                    solution: 'Suppose \\(v_1 + W = v_1^{\\prime} + W\\) and \\(v_2 + W = v_2^{\\prime} + W\\). Then \\(v_1 - v_1^{\\prime} \\in W\\) and \\(v_2 - v_2^{\\prime} \\in W\\). For addition: \\((v_1 + v_2) - (v_1^{\\prime} + v_2^{\\prime}) = (v_1 - v_1^{\\prime}) + (v_2 - v_2^{\\prime}) \\in W\\) (since \\(W\\) is a subspace), so \\((v_1 + v_2) + W = (v_1^{\\prime} + v_2^{\\prime}) + W\\). For scalar multiplication: \\(\\alpha v_1 - \\alpha v_1^{\\prime} = \\alpha(v_1 - v_1^{\\prime}) \\in W\\), so \\(\\alpha v_1 + W = \\alpha v_1^{\\prime} + W\\). Thus the operations are well-defined.'
                },
                {
                    question: 'Let \\(T: \\mathbb{R}^3 \\to \\mathbb{R}^2\\) be given by \\(T(x,y,z) = (x+y, y+z)\\). Find \\(\\ker(T)\\), \\(\\operatorname{im}(T)\\), and verify the first isomorphism theorem.',
                    hint: 'Solve \\(T(x,y,z) = (0,0)\\) to find \\(\\ker(T)\\). Check if \\(T\\) is surjective.',
                    solution: '\\(\\ker(T) = \\{(x,y,z) \\mid x+y=0, y+z=0\\} = \\{(t, -t, t) \\mid t \\in \\mathbb{R}\\} = \\operatorname{span}\\{(1,-1,1)\\}\\), so \\(\\dim \\ker(T) = 1\\). For \\(\\operatorname{im}(T)\\): \\(T(1,0,0) = (1,0)\\) and \\(T(0,1,0) = (1,1)\\) are linearly independent, so \\(\\operatorname{im}(T) = \\mathbb{R}^2\\), hence \\(\\dim \\operatorname{im}(T) = 2\\). By the first isomorphism theorem, \\(\\dim(\\mathbb{R}^3/\\ker(T)) = \\dim \\operatorname{im}(T) = 2\\). Verify: \\(\\dim(\\mathbb{R}^3/\\ker(T)) = \\dim \\mathbb{R}^3 - \\dim \\ker(T) = 3 - 1 = 2\\). ✓'
                }
            ]
        },
        {
            id: 'ch01-sec07',
            title: 'Coordinates and the Row Space',
            content: `
                <h2>Coordinates and the Row Space</h2>

                <p>Bases provide coordinate systems, turning abstract vectors into concrete tuples. This connection between abstract and computational viewpoints is formalized through coordinate maps. We also explore the fundamental equality of row rank and column rank.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.36 (Ordered Basis and Coordinates)</div>
                    <div class="env-body">
                        <p>An <strong>ordered basis</strong> for an \\(n\\)-dimensional vector space \\(V\\) is an \\(n\\)-tuple \\(\\mathcal{B} = (v_1, \\ldots, v_n)\\) such that \\(\\{v_1, \\ldots, v_n\\}\\) is a basis for \\(V\\).</p>
                        <p>If \\(v \\in V\\) and \\(v = \\alpha_1 v_1 + \\cdots + \\alpha_n v_n\\), the <strong>coordinate vector</strong> of \\(v\\) with respect to \\(\\mathcal{B}\\) is</p>
                        \\[[v]_{\\mathcal{B}} = \\begin{bmatrix} \\alpha_1 \\\\ \\vdots \\\\ \\alpha_n \\end{bmatrix} \\in F^n\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.37 (Coordinate Map is an Isomorphism)</div>
                    <div class="env-body">
                        <p>The coordinate map \\([\\cdot]_{\\mathcal{B}}: V \\to F^n\\) is a vector space isomorphism. That is, it is bijective and</p>
                        \\[[\\alpha u + \\beta v]_{\\mathcal{B}} = \\alpha [u]_{\\mathcal{B}} + \\beta [v]_{\\mathcal{B}}\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Every \\(n\\)-dimensional vector space "looks like" \\(F^n\\) once we choose a basis. The coordinate map makes this precise: choosing a basis is choosing a coordinate system. Different bases give different coordinate systems, related by change-of-basis matrices.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.38 (Row and Column Spaces)</div>
                    <div class="env-body">
                        <p>Let \\(A\\) be an \\(m \\times n\\) matrix over \\(F\\). The <strong>row space</strong> of \\(A\\), denoted \\(\\operatorname{row}(A)\\), is the subspace of \\(F^n\\) spanned by the rows of \\(A\\). The <strong>column space</strong> \\(\\operatorname{col}(A)\\) is the subspace of \\(F^m\\) spanned by the columns.</p>
                        <p>The dimensions are called the <strong>row rank</strong> \\(\\operatorname{rrk}(A)\\) and <strong>column rank</strong> \\(\\operatorname{crk}(A)\\).</p>
                    </div>
                </div>

                <div class="env-block lemma">
                    <div class="env-title">Lemma 1.39</div>
                    <div class="env-body">
                        <p>Elementary row operations do not change the column rank of a matrix. Elementary column operations do not change the row rank.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>Elementary column operations correspond to right-multiplying by invertible matrices: \\(A \\mapsto AE\\). The row space of \\(AE\\) is \\(\\operatorname{span}\\{e_i A E \\mid i = 1, \\ldots, m\\}\\). Since \\(E\\) is invertible, \\(e_i A E\\) spans the same space as \\(e_i A\\). Thus \\(\\operatorname{row}(AE) = \\operatorname{row}(A)\\). The proof for column operations is dual.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.40 (Equality of Row and Column Rank)</div>
                    <div class="env-body">
                        <p>For any matrix \\(A\\), \\(\\operatorname{rrk}(A) = \\operatorname{crk}(A)\\). This common value is called the <strong>rank</strong> of \\(A\\), denoted \\(\\operatorname{rank}(A)\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>By Lemma 1.39, we can perform elementary row and column operations without changing either rank. Reduce \\(A\\) to reduced row echelon form (RREF), which has \\(r\\) leading 1's. Then \\(\\operatorname{rrk}(A) = r\\) (the \\(r\\) nonzero rows are independent) and \\(\\operatorname{crk}(A) = r\\) (the \\(r\\) pivot columns are independent, and the non-pivot columns are in their span). Thus \\(\\operatorname{rrk}(A) = \\operatorname{crk}(A) = r\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>This theorem is remarkable: the row space lives in \\(F^n\\), the column space in \\(F^m\\), yet their dimensions are equal! This equality is fundamental to the theory of linear transformations and duality.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 1.41</div>
                    <div class="env-body">
                        <p>Consider the matrix</p>
                        \\[A = \\begin{bmatrix} 1 & 2 & 1 \\\\ 2 & 4 & 3 \\\\ 0 & 0 & 1 \\end{bmatrix}\\]
                        <p>The rows are \\((1,2,1), (2,4,3), (0,0,1)\\). Since row 2 = 2·row 1 + row 3, the row space is spanned by rows 1 and 3, so \\(\\operatorname{rrk}(A) = 2\\).</p>
                        <p>The columns are \\((1,2,0)^T, (2,4,0)^T, (1,3,1)^T\\). Column 2 = 2·column 1, and column 3 is not in span of column 1, so the column space has basis \\(\\{\\text{col}_1, \\text{col}_3\\}\\), giving \\(\\operatorname{crk}(A) = 2\\). Indeed, \\(\\operatorname{rrk}(A) = \\operatorname{crk}(A)\\).</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Let \\(\\mathcal{B} = ((1,1), (1,-1))\\) be an ordered basis for \\(\\mathbb{R}^2\\). Find \\([(3,1)]_{\\mathcal{B}}\\).',
                    hint: 'Write \\((3,1) = \\alpha(1,1) + \\beta(1,-1)\\) and solve for \\(\\alpha, \\beta\\).',
                    solution: 'We have \\((3,1) = \\alpha(1,1) + \\beta(1,-1) = (\\alpha + \\beta, \\alpha - \\beta)\\). So \\(\\alpha + \\beta = 3\\) and \\(\\alpha - \\beta = 1\\). Solving: \\(2\\alpha = 4\\), so \\(\\alpha = 2\\) and \\(\\beta = 1\\). Thus \\([(3,1)]_{\\mathcal{B}} = \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix}\\).'
                },
                {
                    question: 'Compute the rank of \\(A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\\\ 1 & 1 & 1 \\end{bmatrix}\\).',
                    hint: 'Row reduce \\(A\\) and count the number of nonzero rows.',
                    solution: 'Row 2 = 2·row 1, so eliminate row 2: \\(\\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 0 & 0 \\\\ 1 & 1 & 1 \\end{bmatrix}\\). Subtract row 1 from row 3: \\(\\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 0 & 0 \\\\ 0 & -1 & -2 \\end{bmatrix}\\). Swap rows 2 and 3: \\(\\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & -1 & -2 \\\\ 0 & 0 & 0 \\end{bmatrix}\\). Two nonzero rows, so \\(\\operatorname{rank}(A) = 2\\).'
                },
                {
                    question: 'Prove that \\(\\operatorname{rank}(A^T) = \\operatorname{rank}(A)\\).',
                    hint: 'The rows of \\(A^T\\) are the columns of \\(A\\).',
                    solution: 'By definition, \\(\\operatorname{rrk}(A^T) = \\dim \\operatorname{row}(A^T) = \\dim \\operatorname{col}(A) = \\operatorname{crk}(A)\\). By Theorem 1.40, \\(\\operatorname{crk}(A) = \\operatorname{rrk}(A) = \\operatorname{rank}(A)\\). Also, \\(\\operatorname{rank}(A^T) = \\operatorname{rrk}(A^T)\\) (they are equal by definition of rank). Thus \\(\\operatorname{rank}(A^T) = \\operatorname{rank}(A)\\).'
                }
            ]
        }
    ]
});
