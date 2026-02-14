window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch16',
    number: 16,
    title: 'Affine Geometry',
    subtitle: 'A geometry without a distinguished origin',
    sections: [
        {
            id: 'ch16-sec01',
            title: 'Affine Spaces',
            content: `
                <h2>Affine Spaces</h2>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Vector spaces have a distinguished point: the origin. But in many geometric contexts, there is no natural choice of origin. For instance, in Euclidean space, no point is intrinsically special. <strong>Affine geometry</strong> studies the properties that remain when we "forget" the origin, focusing on concepts like parallelism, ratios of distances along lines, and barycentric combinations. It is the geometry of parallel lines and translations, without a preferred zero point.</p>
                    </div>
                </div>

                <p>The key idea is to separate <em>points</em> (which have no algebraic structure) from <em>vectors</em> (which do). We can subtract two points to get a vector, and we can add a vector to a point to get another point, but we cannot add two points.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.1 (Affine Space)</div>
                    <div class="env-body">
                        <p>An <strong>affine space</strong> over a field \\(F\\) is a nonempty set \\(A\\) (whose elements are called <strong>points</strong>) together with a vector space \\(V\\) over \\(F\\) and a mapping</p>
                        \\[A \\times A \\to V, \\quad (p, q) \\mapsto \\overrightarrow{pq}\\]
                        <p>satisfying the following axioms:</p>
                        <ol>
                            <li><strong>(A1) Subtraction axiom:</strong> For all \\(p, q \\in A\\), there exists a unique vector \\(\\overrightarrow{pq} \\in V\\).</li>
                            <li><strong>(A2) Addition axiom:</strong> For every \\(p \\in A\\) and \\(v \\in V\\), there exists a unique \\(q \\in A\\) such that \\(\\overrightarrow{pq} = v\\). We write \\(q = p + v\\).</li>
                            <li><strong>(A3) Transitivity (Chasles relation):</strong> For all \\(p, q, r \\in A\\),
                            \\[\\overrightarrow{pq} + \\overrightarrow{qr} = \\overrightarrow{pr}.\\]</li>
                        </ol>
                        <p>The vector space \\(V\\) is called the <strong>associated vector space</strong> or <strong>direction space</strong> of \\(A\\), and we write \\(\\dim A = \\dim V\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 16.2</div>
                    <div class="env-body">
                        <p><strong>1. Standard affine space:</strong> Let \\(V\\) be any vector space over \\(F\\). Define \\(A = V\\) as a set, with the subtraction operation \\(\\overrightarrow{pq} = q - p\\) (vector subtraction). Then \\(A\\) is an affine space with direction space \\(V\\). This is the "standard model" of an affine space.</p>

                        <p><strong>2. Hyperplane not through origin:</strong> In \\(\\mathbb{R}^3\\), the plane \\(H = \\{(x,y,z) : x + y + z = 1\\}\\) is an affine space with direction space \\(V = \\{(x,y,z) : x + y + z = 0\\}\\), a 2-dimensional subspace.</p>

                        <p><strong>3. Solution space of inhomogeneous system:</strong> The set of solutions to \\(Ax = b\\) (where \\(b \\neq 0\\)) is an affine space with direction space \\(\\ker(A)\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>An affine space becomes a vector space if and only if it contains a distinguished point that we declare to be the origin. Given any point \\(o \\in A\\), we can define a vector space structure on \\(A\\) by setting \\(p + q = p + \\overrightarrow{oq}\\) and \\(\\alpha p = o + \\alpha \\overrightarrow{op}\\). Different choices of \\(o\\) yield different (but isomorphic) vector space structures.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="affine-vs-vector"></div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 16.3</div>
                    <div class="env-body">
                        <p>In an affine space \\(A\\) with direction space \\(V\\), the following identities hold for all points \\(p, q \\in A\\) and vectors \\(v, w \\in V\\):</p>
                        <ol>
                            <li>\\(\\overrightarrow{pp} = 0\\)</li>
                            <li>\\(\\overrightarrow{qp} = -\\overrightarrow{pq}\\)</li>
                            <li>\\((p + v) + w = p + (v + w)\\)</li>
                            <li>\\(p + 0 = p\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>(1) By (A3), \\(\\overrightarrow{pp} + \\overrightarrow{pp} = \\overrightarrow{pp}\\), so \\(\\overrightarrow{pp} = 0\\).</p>
                        <p>(2) By (A3), \\(\\overrightarrow{pq} + \\overrightarrow{qp} = \\overrightarrow{pp} = 0\\), so \\(\\overrightarrow{qp} = -\\overrightarrow{pq}\\).</p>
                        <p>(3) Let \\(q = p + v\\) and \\(r = q + w\\). Then \\(\\overrightarrow{pq} = v\\) and \\(\\overrightarrow{qr} = w\\). By (A3), \\(\\overrightarrow{pr} = \\overrightarrow{pq} + \\overrightarrow{qr} = v + w\\), so \\(r = p + (v + w)\\).</p>
                        <p>(4) Since \\(\\overrightarrow{pp} = 0\\), we have \\(p + 0 = p\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'affine-vs-vector',
                    title: 'Interactive: Affine Space vs Vector Space',
                    description: 'Drag points to see how vectors connect points in affine space. Notice: points have no addition, but differences of points give vectors.',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        const p = viz.addDraggable('p', -3, 2, viz.colors.blue, 8, () => draw());
                        const q = viz.addDraggable('q', 2, 1, viz.colors.orange, 8, () => draw());
                        const r = viz.addDraggable('r', 1, -2, viz.colors.teal, 8, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw vectors between points
                            viz.drawVector(p.x, p.y, q.x, q.y, viz.colors.green, 'pq', 2);
                            viz.drawVector(q.x, q.y, r.x, r.y, viz.colors.purple, 'qr', 2);
                            viz.drawVector(p.x, p.y, r.x, r.y, viz.colors.yellow, 'pr = pq + qr', 3);

                            // Draw points
                            viz.drawPoint(p.x, p.y, viz.colors.blue, 'p', 8);
                            viz.drawPoint(q.x, q.y, viz.colors.orange, 'q', 8);
                            viz.drawPoint(r.x, r.y, viz.colors.teal, 'r', 8);

                            viz.drawDraggables();

                            // Show Chasles relation
                            const pqx = q.x - p.x, pqy = q.y - p.y;
                            const qrx = r.x - q.x, qry = r.y - q.y;
                            const prx = r.x - p.x, pry = r.y - p.y;
                            viz.drawText(
                                `pq = (${pqx.toFixed(1)}, ${pqy.toFixed(1)})  qr = (${qrx.toFixed(1)}, ${qry.toFixed(1)})  pr = (${prx.toFixed(1)}, ${pry.toFixed(1)})`,
                                0, -4.5, viz.colors.white, 12, 'center'
                            );
                            viz.drawText('Chasles Relation: pq + qr = pr', 0, 4.5, viz.colors.yellow, 14, 'center');
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that if \\(A\\) is an affine space with direction space \\(V\\), then for any fixed point \\(o \\in A\\), the map \\(\\phi_o : A \\to V\\) defined by \\(\\phi_o(p) = \\overrightarrow{op}\\) is a bijection.',
                    hint: 'Use axiom (A2) to show surjectivity and axiom (A1) to show injectivity.',
                    solution: 'Injectivity: If \\(\\phi_o(p) = \\phi_o(q)\\), then \\(\\overrightarrow{op} = \\overrightarrow{oq}\\). By (A3), \\(\\overrightarrow{pq} = \\overrightarrow{oq} - \\overrightarrow{op} = 0\\). Since \\(\\overrightarrow{pp} = 0\\) and (A1) guarantees uniqueness, we have \\(p = q\\). Surjectivity: For any \\(v \\in V\\), axiom (A2) gives a unique \\(p \\in A\\) with \\(\\overrightarrow{op} = v\\), so \\(\\phi_o(p) = v\\).'
                },
                {
                    question: 'Let \\(A\\) be an affine space. Show that \\(\\overrightarrow{pq} = 0\\) if and only if \\(p = q\\).',
                    hint: 'Use Proposition 16.3(1) and the uniqueness in axiom (A1).',
                    solution: 'If \\(p = q\\), then by Proposition 16.3(1), \\(\\overrightarrow{pq} = \\overrightarrow{pp} = 0\\). Conversely, suppose \\(\\overrightarrow{pq} = 0\\). Then \\(\\overrightarrow{pq} = 0 = \\overrightarrow{pp}\\). By axiom (A1), the vector \\(\\overrightarrow{pq}\\) determines \\(q\\) uniquely given \\(p\\), so \\(q = p\\).'
                },
                {
                    question: 'Show that the set of solutions to the inhomogeneous linear system \\(Ax = b\\) (where \\(A\\) is \\(m \\times n\\) and \\(b \\neq 0\\)) is either empty or an affine space. What is its direction space?',
                    hint: 'If \\(x_0\\) is a particular solution, consider \\(x_0 + \\ker(A)\\).',
                    solution: 'If the system has no solution, it is empty. Otherwise, let \\(x_0\\) be a particular solution. The general solution is \\(x = x_0 + v\\) where \\(v \\in \\ker(A)\\). Define \\(A = \\{x : Ax = b\\}\\) and \\(\\overrightarrow{xy} = y - x\\). Then \\(A(y - x) = Ay - Ax = b - b = 0\\), so \\(y - x \\in \\ker(A)\\). The axioms are easily verified, and the direction space is \\(V = \\ker(A)\\).'
                }
            ]
        },
        {
            id: 'ch16-sec02',
            title: 'Affine Subspaces and Flats',
            content: `
                <h2>Affine Subspaces and Flats</h2>

                <p>Just as vector spaces have subspaces, affine spaces have affine subspaces. These generalize concepts like lines, planes, and hyperplanes in Euclidean space.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.4 (Affine Subspace)</div>
                    <div class="env-body">
                        <p>Let \\(A\\) be an affine space with direction space \\(V\\). A subset \\(F \\subseteq A\\) is called an <strong>affine subspace</strong> or <strong>flat</strong> if there exists a point \\(p \\in F\\) and a subspace \\(W \\subseteq V\\) such that</p>
                        \\[F = p + W := \\{p + w : w \\in W\\}.\\]
                        <p>We call \\(W\\) the <strong>direction space</strong> of \\(F\\), written \\(\\overrightarrow{F} = W\\), and define \\(\\dim F = \\dim W\\).</p>
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 16.5</div>
                    <div class="env-body">
                        <p>The representation \\(F = p + W\\) is independent of the choice of base point. That is, if \\(q \\in F\\), then \\(F = q + W\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Since \\(q \\in F = p + W\\), we have \\(q = p + w_0\\) for some \\(w_0 \\in W\\). For any \\(r \\in F\\), we have \\(r = p + w\\) for some \\(w \\in W\\). Then \\(r = q + (w - w_0)\\), and \\(w - w_0 \\in W\\), so \\(r \\in q + W\\). Conversely, if \\(r = q + w' = p + w_0 + w'\\) for \\(w' \\in W\\), then \\(r \\in p + W\\) since \\(w_0 + w' \\in W\\). Thus \\(F = q + W\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.6 (Parallel Flats)</div>
                    <div class="env-body">
                        <p>Two flats \\(F_1 = p + W_1\\) and \\(F_2 = q + W_2\\) are <strong>parallel</strong>, written \\(F_1 \\parallel F_2\\), if their direction spaces are equal: \\(W_1 = W_2\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 16.7</div>
                    <div class="env-body">
                        <p>In \\(\\mathbb{R}^3\\):</p>
                        <ul>
                            <li>A <strong>point</strong> is a 0-dimensional flat: \\(\\{p\\}\\).</li>
                            <li>A <strong>line</strong> through point \\(p\\) in direction \\(v \\neq 0\\) is: \\(L = p + \\operatorname{span}(v) = \\{p + tv : t \\in \\mathbb{R}\\}\\).</li>
                            <li>A <strong>plane</strong> through point \\(p\\) parallel to vectors \\(v, w\\) is: \\(\\Pi = p + \\operatorname{span}(v, w)\\).</li>
                            <li>Two distinct lines \\(p + \\operatorname{span}(v)\\) and \\(q + \\operatorname{span}(v)\\) are parallel (same direction, different base point).</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="affine-subspaces"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 16.8 (Characterization of Flats)</div>
                    <div class="env-body">
                        <p>A nonempty subset \\(F \\subseteq A\\) is a flat if and only if for all \\(p, q \\in F\\) and all \\(\\lambda \\in F\\),</p>
                        \\[p + \\lambda \\overrightarrow{pq} \\in F.\\]
                        <p>That is, \\(F\\) is closed under taking points on the line through any two of its points.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>(⇒) Suppose \\(F = p_0 + W\\) for some subspace \\(W\\). If \\(p, q \\in F\\), then \\(p = p_0 + w_1\\) and \\(q = p_0 + w_2\\) for some \\(w_1, w_2 \\in W\\). Then \\(\\overrightarrow{pq} = w_2 - w_1 \\in W\\), so \\(p + \\lambda \\overrightarrow{pq} = p_0 + w_1 + \\lambda(w_2 - w_1) \\in p_0 + W = F\\).</p>
                        <p>(⇐) Choose any \\(p_0 \\in F\\) and let \\(W = \\{\\overrightarrow{p_0 q} : q \\in F\\}\\). We claim \\(W\\) is a subspace. If \\(v = \\overrightarrow{p_0 q_1}\\) and \\(w = \\overrightarrow{p_0 q_2}\\), then \\(\\lambda v + \\mu w = \\overrightarrow{p_0 r}\\) for some \\(r \\in F\\) by the closure condition (exercise). Then \\(F = p_0 + W\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.9 (Intersection and Sum)</div>
                    <div class="env-body">
                        <p>Let \\(F = p + W\\) and \\(G = q + U\\) be flats in \\(A\\).</p>
                        <ul>
                            <li>Their <strong>intersection</strong> \\(F \\cap G\\) (if nonempty) is a flat with direction space \\(W \\cap U\\).</li>
                            <li>Their <strong>join</strong> (affine span) \\(F \\vee G\\) is the smallest flat containing both, with direction space \\(W + U + \\operatorname{span}(\\overrightarrow{pq})\\) if \\(F \\cap G = \\emptyset\\), or \\(W + U\\) if \\(F \\cap G \\neq \\emptyset\\).</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'affine-subspaces',
                    title: 'Interactive: Affine Subspaces in 2D',
                    description: 'Drag points to visualize a line (1D flat) through a point in a given direction',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        const basePoint = viz.addDraggable('base', 1, 1, viz.colors.blue, 10, () => draw());
                        const dirVector = viz.addDraggable('dir', 2, 0.5, viz.colors.orange, 8, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const dx = dirVector.x - basePoint.x;
                            const dy = dirVector.y - basePoint.y;
                            const len = Math.sqrt(dx*dx + dy*dy);

                            if (len > 0.1) {
                                const ux = dx / len, uy = dy / len;

                                // Draw the entire line (affine subspace)
                                for (let t = -15; t <= 15; t += 0.5) {
                                    const px = basePoint.x + t * ux;
                                    const py = basePoint.y + t * uy;
                                    viz.drawPoint(px, py, viz.colors.teal + '66', null, 2);
                                }

                                // Draw direction vector
                                viz.drawVector(basePoint.x, basePoint.y,
                                             basePoint.x + dx, basePoint.y + dy,
                                             viz.colors.orange, 'v', 3);

                                // Draw base point
                                viz.drawPoint(basePoint.x, basePoint.y, viz.colors.blue, 'p', 10);

                                // Show some specific points on the line
                                for (let k = -2; k <= 2; k++) {
                                    const sx = basePoint.x + k * dx;
                                    const sy = basePoint.y + k * dy;
                                    viz.drawPoint(sx, sy, viz.colors.green, null, 5);
                                }

                                viz.drawDraggables();
                                viz.drawText('Flat F = p + span(v) = {p + tv : t ∈ ℝ}', 0, 4.5, viz.colors.white, 14, 'center');
                                viz.drawText(`dim(F) = 1`, 0, -4.5, viz.colors.teal, 12, 'center');
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that a flat \\(F = p + W\\) is a subspace of the affine space \\(A\\) (i.e., \\(0 \\in F\\) when we identify \\(A\\) with a vector space) if and only if \\(p \\in W\\).',
                    hint: 'A flat contains the origin if and only if we can write \\(0 = p + w\\) for some \\(w \\in W\\).',
                    solution: 'If \\(F\\) is a subspace, then \\(0 \\in F\\), so \\(0 = p + w\\) for some \\(w \\in W\\), thus \\(p = -w \\in W\\). Conversely, if \\(p \\in W\\), then \\(0 = p + (-p) \\in p + W = F\\), so the flat passes through the origin. Moreover, if \\(p \\in W\\), then \\(F = p + W = W\\) (as proved in Proposition 16.5), which is a subspace.'
                },
                {
                    question: 'Let \\(F_1, F_2\\) be parallel flats in \\(A\\) with common direction space \\(W\\). Show that either \\(F_1 = F_2\\) or \\(F_1 \\cap F_2 = \\emptyset\\).',
                    hint: 'If they intersect at a point, use Proposition 16.5.',
                    solution: 'Write \\(F_1 = p + W\\) and \\(F_2 = q + W\\). If there exists \\(r \\in F_1 \\cap F_2\\), then by Proposition 16.5, \\(F_1 = r + W\\) and \\(F_2 = r + W\\), so \\(F_1 = F_2\\). Thus if \\(F_1 \\neq F_2\\), they must be disjoint.'
                },
                {
                    question: 'Show that the dimension formula for flats states: if \\(F, G\\) are flats with \\(F \\cap G \\neq \\emptyset\\), then \\[\\dim(F \\vee G) = \\dim F + \\dim G - \\dim(F \\cap G).\\]',
                    hint: 'Use the analogous dimension formula for vector spaces: \\(\\dim(W + U) = \\dim W + \\dim U - \\dim(W \\cap U)\\).',
                    solution: 'If \\(F \\cap G \\neq \\emptyset\\), pick \\(p \\in F \\cap G\\). Then \\(F = p + W\\), \\(G = p + U\\), \\(F \\cap G = p + (W \\cap U)\\), and \\(F \\vee G = p + (W + U)\\). Thus \\(\\dim(F \\vee G) = \\dim(W + U) = \\dim W + \\dim U - \\dim(W \\cap U) = \\dim F + \\dim G - \\dim(F \\cap G)\\).'
                }
            ]
        },
        {
            id: 'ch16-sec03',
            title: 'Affine Combinations and Barycentric Coordinates',
            content: `
                <h2>Affine Combinations and Barycentric Coordinates</h2>

                <p>In vector spaces, we can form linear combinations of vectors. In affine spaces, we must be more careful: we can only form <em>affine combinations</em> of points, which are weighted averages.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.10 (Affine Combination)</div>
                    <div class="env-body">
                        <p>Let \\(p_1, \\ldots, p_n\\) be points in an affine space \\(A\\). An <strong>affine combination</strong> of these points is an expression of the form</p>
                        \\[\\sum_{i=1}^{n} \\lambda_i p_i\\]
                        <p>where \\(\\lambda_i \\in F\\) and \\(\\sum_{i=1}^{n} \\lambda_i = 1\\).</p>
                        <p>The condition \\(\\sum \\lambda_i = 1\\) ensures that the result is independent of the choice of origin.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Making Sense of Affine Combinations</div>
                    <div class="env-body">
                        <p>To define \\(\\sum_{i=1}^{n} \\lambda_i p_i\\) rigorously, choose any base point \\(o \\in A\\) and set</p>
                        \\[\\sum_{i=1}^{n} \\lambda_i p_i := o + \\sum_{i=1}^{n} \\lambda_i \\overrightarrow{o p_i}.\\]
                        <p>The key fact is that this is <em>independent of \\(o\\)</em> when \\(\\sum \\lambda_i = 1\\). Indeed, if we choose a different base point \\(o'\\), we compute:</p>
                        \\[o' + \\sum_{i=1}^{n} \\lambda_i \\overrightarrow{o' p_i} = o' + \\sum_{i=1}^{n} \\lambda_i (\\overrightarrow{o' o} + \\overrightarrow{o p_i}) = o' + \\left(\\sum_{i=1}^{n} \\lambda_i\\right) \\overrightarrow{o' o} + \\sum_{i=1}^{n} \\lambda_i \\overrightarrow{o p_i}.\\]
                        <p>Since \\(\\sum \\lambda_i = 1\\), we have \\(\\overrightarrow{o' o} = \\overrightarrow{o' o}\\), so this simplifies to</p>
                        \\[o' + \\overrightarrow{o' o} + \\sum_{i=1}^{n} \\lambda_i \\overrightarrow{o p_i} = o + \\sum_{i=1}^{n} \\lambda_i \\overrightarrow{o p_i}.\\]
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="affine-combination"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.11 (Barycentric Coordinates)</div>
                    <div class="env-body">
                        <p>Let \\(p_0, \\ldots, p_n\\) be points in \\(A\\). Every point \\(p\\) in the affine span of \\(\\{p_0, \\ldots, p_n\\}\\) can be uniquely written as</p>
                        \\[p = \\sum_{i=0}^{n} \\lambda_i p_i \\quad \\text{with} \\quad \\sum_{i=0}^{n} \\lambda_i = 1\\]
                        <p>if \\(p_0, \\ldots, p_n\\) are affinely independent (defined below). The scalars \\((\\lambda_0, \\ldots, \\lambda_n)\\) are called the <strong>barycentric coordinates</strong> of \\(p\\) with respect to the affine basis \\(\\{p_0, \\ldots, p_n\\}\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 16.12 (Barycentric Coordinates in a Triangle)</div>
                    <div class="env-body">
                        <p>In \\(\\mathbb{R}^2\\), let \\(p_0 = (0,0)\\), \\(p_1 = (1,0)\\), \\(p_2 = (0,1)\\) be the vertices of a triangle. Any point \\(p = (x, y)\\) in the plane can be written as</p>
                        \\[p = \\lambda_0 p_0 + \\lambda_1 p_1 + \\lambda_2 p_2\\]
                        <p>where \\(\\lambda_0 + \\lambda_1 + \\lambda_2 = 1\\). Expanding, \\((x, y) = \\lambda_1 (1, 0) + \\lambda_2 (0, 1)\\), so \\(\\lambda_1 = x\\) and \\(\\lambda_2 = y\\), thus \\(\\lambda_0 = 1 - x - y\\).</p>
                        <p>The point \\(p\\) is inside the triangle if and only if all \\(\\lambda_i \\geq 0\\), i.e., \\(x, y \\geq 0\\) and \\(x + y \\leq 1\\).</p>
                        <p>The <strong>centroid</strong> (center of mass) corresponds to \\(\\lambda_0 = \\lambda_1 = \\lambda_2 = 1/3\\), giving \\(p = (1/3, 1/3)\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="barycentric-triangle"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.13 (Affine Hull)</div>
                    <div class="env-body">
                        <p>The <strong>affine hull</strong> of a set \\(S \\subseteq A\\), denoted \\(\\operatorname{aff}(S)\\), is the smallest flat containing \\(S\\). Equivalently, it is the set of all affine combinations of points in \\(S\\):</p>
                        \\[\\operatorname{aff}(S) = \\left\\{\\sum_{i=1}^{n} \\lambda_i p_i : n \\geq 1, p_i \\in S, \\lambda_i \\in F, \\sum_{i=1}^{n} \\lambda_i = 1\\right\\}.\\]
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 16.14</div>
                    <div class="env-body">
                        <p>If \\(S = \\{p_0, p_1, \\ldots, p_k\\}\\), then \\(\\operatorname{aff}(S) = p_0 + \\operatorname{span}\\{\\overrightarrow{p_0 p_1}, \\ldots, \\overrightarrow{p_0 p_k}\\}\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Any affine combination \\(\\sum_{i=0}^{k} \\lambda_i p_i\\) with \\(\\sum \\lambda_i = 1\\) can be rewritten as</p>
                        \\[p_0 + \\sum_{i=0}^{k} \\lambda_i \\overrightarrow{p_0 p_i} = p_0 + \\sum_{i=1}^{k} \\lambda_i \\overrightarrow{p_0 p_i}\\]
                        <p>(using \\(\\overrightarrow{p_0 p_0} = 0\\) and \\(\\lambda_0 = 1 - \\sum_{i=1}^{k} \\lambda_i\\)). This shows \\(\\operatorname{aff}(S) \\subseteq p_0 + \\operatorname{span}\\{\\overrightarrow{p_0 p_1}, \\ldots, \\overrightarrow{p_0 p_k}\\}\\). The reverse inclusion is similar.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'affine-combination',
                    title: 'Interactive: Affine Combination of Two Points',
                    description: 'Adjust λ to see the point q = (1-λ)p₁ + λp₂ move along the line',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        const p1 = viz.addDraggable('p1', -3, 1, viz.colors.blue, 10, () => draw());
                        const p2 = viz.addDraggable('p2', 3, -1, viz.colors.orange, 10, () => draw());

                        let lambda = 0.5;
                        const slider = VizEngine.createSlider(controls, 'λ', -0.5, 1.5, 0.5, 0.01, (val) => {
                            lambda = val;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw line through p1 and p2
                            viz.drawLine(p1.x, p1.y, p2.x, p2.y, viz.colors.text + '66', 1);

                            // Draw affine combination point
                            const qx = (1 - lambda) * p1.x + lambda * p2.x;
                            const qy = (1 - lambda) * p1.y + lambda * p2.y;

                            viz.drawPoint(p1.x, p1.y, viz.colors.blue, 'p₁', 10);
                            viz.drawPoint(p2.x, p2.y, viz.colors.orange, 'p₂', 10);
                            viz.drawPoint(qx, qy, viz.colors.green, 'q', 12);

                            // Draw vectors
                            viz.drawVector(0, 0, p1.x, p1.y, viz.colors.blue + '88', null, 1);
                            viz.drawVector(0, 0, p2.x, p2.y, viz.colors.orange + '88', null, 1);
                            viz.drawVector(0, 0, qx, qy, viz.colors.green, null, 2);

                            viz.drawDraggables();

                            const coeff1 = (1 - lambda).toFixed(2);
                            const coeff2 = lambda.toFixed(2);
                            viz.drawText(`q = ${coeff1}·p₁ + ${coeff2}·p₂`, 0, 4.5, viz.colors.white, 14, 'center');
                            viz.drawText(`(${coeff1} + ${coeff2} = 1)`, 0, -4.5, viz.colors.green, 12, 'center');

                            if (lambda >= 0 && lambda <= 1) {
                                viz.drawText('q is between p₁ and p₂ (convex combination)', 0, -5.2, viz.colors.teal, 11, 'center');
                            }
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'barycentric-triangle',
                    title: 'Interactive: Barycentric Coordinates in a Triangle',
                    description: 'Drag the point to see its barycentric coordinates with respect to the triangle vertices',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        const p0 = {x: 0, y: -2};
                        const p1 = {x: 4, y: -2};
                        const p2 = {x: 2, y: 2};

                        const q = viz.addDraggable('q', 2, 0, viz.colors.purple, 10, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw triangle
                            viz.drawPolygon([[p0.x, p0.y], [p1.x, p1.y], [p2.x, p2.y]],
                                           viz.colors.blue + '22', viz.colors.blue, 2);

                            // Compute barycentric coordinates
                            // For triangle with vertices p0, p1, p2, point q = λ0·p0 + λ1·p1 + λ2·p2
                            // Solve: q = λ0·p0 + λ1·p1 + λ2·p2 with λ0 + λ1 + λ2 = 1
                            const v0x = p1.x - p0.x, v0y = p1.y - p0.y;
                            const v1x = p2.x - p0.x, v1y = p2.y - p0.y;
                            const v2x = q.x - p0.x, v2y = q.y - p0.y;

                            const denom = v0x * v1y - v0y * v1x;
                            const lambda1 = (v2x * v1y - v2y * v1x) / denom;
                            const lambda2 = (v0x * v2y - v0y * v2x) / denom;
                            const lambda0 = 1 - lambda1 - lambda2;

                            // Draw vertices
                            viz.drawPoint(p0.x, p0.y, viz.colors.blue, 'p₀', 8);
                            viz.drawPoint(p1.x, p1.y, viz.colors.orange, 'p₁', 8);
                            viz.drawPoint(p2.x, p2.y, viz.colors.teal, 'p₂', 8);

                            // Draw query point
                            const isInside = lambda0 >= 0 && lambda1 >= 0 && lambda2 >= 0;
                            viz.drawPoint(q.x, q.y, isInside ? viz.colors.green : viz.colors.red, 'q', 10);

                            viz.drawDraggables();

                            viz.drawText(`λ₀=${lambda0.toFixed(2)}  λ₁=${lambda1.toFixed(2)}  λ₂=${lambda2.toFixed(2)}`,
                                        0, 4.5, viz.colors.white, 13, 'center');
                            viz.drawText(isInside ? 'q is inside triangle' : 'q is outside triangle',
                                        0, -4.5, isInside ? viz.colors.green : viz.colors.red, 12, 'center');
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that the set of all affine combinations of points in a set \\(S\\) forms a flat (the affine hull).',
                    hint: 'Show it is closed under affine combinations, hence satisfies the characterization in Theorem 16.8.',
                    solution: 'Let \\(F\\) be the set of all affine combinations of points in \\(S\\). If \\(p = \\sum_i \\lambda_i s_i\\) and \\(q = \\sum_j \\mu_j t_j\\) are in \\(F\\) (with \\(\\sum \\lambda_i = 1\\), \\(\\sum \\mu_j = 1\\)), then for any \\(\\alpha \\in F\\), \\(\\alpha p + (1-\\alpha)q = \\sum_i (\\alpha \\lambda_i) s_i + \\sum_j ((1-\\alpha)\\mu_j) t_j\\) is an affine combination of points in \\(S\\), hence in \\(F\\). By Theorem 16.8, \\(F\\) is a flat.'
                },
                {
                    question: 'Show that the midpoint of two points \\(p, q\\) in an affine space is \\(m = \\frac{1}{2}p + \\frac{1}{2}q\\).',
                    hint: 'This is the affine combination with equal weights.',
                    solution: 'The midpoint is the affine combination \\(m = \\frac{1}{2}p + \\frac{1}{2}q\\). Choosing a base point \\(o\\), we have \\(m = o + \\frac{1}{2}\\overrightarrow{op} + \\frac{1}{2}\\overrightarrow{oq} = o + \\frac{1}{2}(\\overrightarrow{op} + \\overrightarrow{oq})\\). Since \\(\\overrightarrow{pm} = \\overrightarrow{om} - \\overrightarrow{op} = \\frac{1}{2}(\\overrightarrow{oq} - \\overrightarrow{op}) = \\frac{1}{2}\\overrightarrow{pq}\\), the point \\(m\\) is indeed the midpoint on the segment from \\(p\\) to \\(q\\).'
                },
                {
                    question: 'Verify that barycentric coordinates are unique for affinely independent points. Specifically, if \\(\\sum_{i=0}^{n} \\lambda_i p_i = \\sum_{i=0}^{n} \\mu_i p_i\\) with \\(\\sum \\lambda_i = \\sum \\mu_i = 1\\) and \\(\\{p_0, \\ldots, p_n\\}\\) affinely independent, then \\(\\lambda_i = \\mu_i\\) for all \\(i\\).',
                    hint: 'Subtract the two expressions and use the definition of affine independence.',
                    solution: 'We have \\(\\sum_{i=0}^{n} (\\lambda_i - \\mu_i) p_i = 0\\) with \\(\\sum_{i=0}^{n} (\\lambda_i - \\mu_i) = 0\\). Choosing base point \\(p_0\\), this becomes \\(\\sum_{i=1}^{n} (\\lambda_i - \\mu_i) \\overrightarrow{p_0 p_i} = 0\\). By affine independence, the vectors \\(\\{\\overrightarrow{p_0 p_1}, \\ldots, \\overrightarrow{p_0 p_n}\\}\\) are linearly independent, so \\(\\lambda_i - \\mu_i = 0\\) for \\(i \\geq 1\\). Then \\(\\lambda_0 - \\mu_0 = -\\sum_{i=1}^{n}(\\lambda_i - \\mu_i) = 0\\).'
                }
            ]
        },
        {
            id: 'ch16-sec04',
            title: 'Affine Independence and Affine Bases',
            content: `
                <h2>Affine Independence and Affine Bases</h2>

                <p>The notion of linear independence for vectors has an analog for points in affine spaces.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.15 (Affine Independence)</div>
                    <div class="env-body">
                        <p>Points \\(p_0, p_1, \\ldots, p_k\\) in an affine space \\(A\\) are <strong>affinely independent</strong> if the vectors</p>
                        \\[\\overrightarrow{p_0 p_1}, \\overrightarrow{p_0 p_2}, \\ldots, \\overrightarrow{p_0 p_k}\\]
                        <p>are linearly independent in the direction space \\(V\\).</p>
                        <p>Equivalently, \\(p_0, \\ldots, p_k\\) are affinely independent if the only way to write</p>
                        \\[\\sum_{i=0}^{k} \\lambda_i p_i = 0 \\quad \\text{with} \\quad \\sum_{i=0}^{k} \\lambda_i = 0\\]
                        <p>is \\(\\lambda_0 = \\cdots = \\lambda_k = 0\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The definition is independent of the choice of base point \\(p_0\\). If we choose a different base point \\(p_j\\), the vectors \\(\\overrightarrow{p_j p_0}, \\overrightarrow{p_j p_1}, \\ldots, \\overrightarrow{p_j p_{j-1}}, \\overrightarrow{p_j p_{j+1}}, \\ldots, \\overrightarrow{p_j p_k}\\) span the same subspace and have the same linear independence.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 16.16</div>
                    <div class="env-body">
                        <p><strong>1.</strong> In \\(\\mathbb{R}^2\\), three points \\(p_0, p_1, p_2\\) are affinely independent if and only if they are not collinear. The vectors \\(\\overrightarrow{p_0 p_1}\\) and \\(\\overrightarrow{p_0 p_2}\\) are linearly independent precisely when the points do not lie on a line.</p>

                        <p><strong>2.</strong> In \\(\\mathbb{R}^3\\), four points are affinely independent if and only if they are not coplanar. They form a non-degenerate tetrahedron.</p>

                        <p><strong>3.</strong> In \\(\\mathbb{R}^n\\), at most \\(n+1\\) points can be affinely independent (since at most \\(n\\) vectors can be linearly independent).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.17 (Affine Basis)</div>
                    <div class="env-body">
                        <p>An <strong>affine basis</strong> for an \\(n\\)-dimensional affine space \\(A\\) is a set of \\(n+1\\) affinely independent points \\(\\{p_0, p_1, \\ldots, p_n\\}\\).</p>
                        <p>Every point \\(p \\in A\\) can be uniquely written as</p>
                        \\[p = \\sum_{i=0}^{n} \\lambda_i p_i \\quad \\text{with} \\quad \\sum_{i=0}^{n} \\lambda_i = 1.\\]
                        <p>The scalars \\((\\lambda_0, \\ldots, \\lambda_n)\\) are the barycentric coordinates of \\(p\\) with respect to the affine basis.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 16.18 (Characterization of Affine Bases)</div>
                    <div class="env-body">
                        <p>Let \\(A\\) be an \\(n\\)-dimensional affine space with direction space \\(V\\). The following are equivalent:</p>
                        <ol>
                            <li>\\(\\{p_0, \\ldots, p_n\\}\\) is an affine basis for \\(A\\).</li>
                            <li>\\(\\{\\overrightarrow{p_0 p_1}, \\ldots, \\overrightarrow{p_0 p_n}\\}\\) is a basis for \\(V\\).</li>
                            <li>\\(\\{p_0, \\ldots, p_n\\}\\) are affinely independent and \\(\\operatorname{aff}\\{p_0, \\ldots, p_n\\} = A\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>(1) ⇒ (2): If \\(\\{p_0, \\ldots, p_n\\}\\) is an affine basis, then by definition, \\(\\{\\overrightarrow{p_0 p_1}, \\ldots, \\overrightarrow{p_0 p_n}\\}\\) are linearly independent. Since \\(\\dim V = n\\), they form a basis.</p>
                        <p>(2) ⇒ (3): If \\(\\{\\overrightarrow{p_0 p_1}, \\ldots, \\overrightarrow{p_0 p_n}\\}\\) is a basis for \\(V\\), then the points are affinely independent. For any \\(q \\in A\\), write \\(\\overrightarrow{p_0 q} = \\sum_{i=1}^{n} \\mu_i \\overrightarrow{p_0 p_i}\\). Then \\(q = p_0 + \\sum_{i=1}^{n} \\mu_i \\overrightarrow{p_0 p_i}\\), which is an affine combination.</p>
                        <p>(3) ⇒ (1): If the points are affinely independent and span \\(A\\), every point has a unique barycentric representation, so they form an affine basis.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="affine-basis"></div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 16.19 (Affine Dimension Formula)</div>
                    <div class="env-body">
                        <p>Let \\(p_0, \\ldots, p_k\\) be affinely independent points in \\(A\\). Then</p>
                        \\[\\dim \\operatorname{aff}\\{p_0, \\ldots, p_k\\} = k.\\]
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 16.20 (Standard Simplex)</div>
                    <div class="env-body">
                        <p>In \\(\\mathbb{R}^n\\), the <strong>standard \\(n\\)-simplex</strong> is defined as</p>
                        \\[\\Delta^n = \\left\\{(x_0, \\ldots, x_n) \\in \\mathbb{R}^{n+1} : x_i \\geq 0, \\sum_{i=0}^{n} x_i = 1\\right\\}.\\]
                        <p>Its vertices are the standard basis vectors \\(e_0, \\ldots, e_n\\), which form an affine basis for the affine subspace \\(\\sum x_i = 1\\). Every point in \\(\\Delta^n\\) has a unique representation as a convex combination of the vertices:</p>
                        \\[x = \\sum_{i=0}^{n} x_i e_i.\\]
                        <p>The simplex is a fundamental object in algebraic topology, combinatorics, and optimization.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'affine-basis',
                    title: 'Interactive: Affine Basis in 2D',
                    description: 'Drag three affinely independent points (triangle) and see how any point can be expressed as their affine combination',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        const p0 = viz.addDraggable('p0', -3, -2, viz.colors.blue, 10, () => draw());
                        const p1 = viz.addDraggable('p1', 3, -2, viz.colors.orange, 10, () => draw());
                        const p2 = viz.addDraggable('p2', 0, 2.5, viz.colors.teal, 10, () => draw());

                        let showGrid = true;
                        const toggleButton = VizEngine.createButton(controls, 'Toggle Grid of Affine Combinations', () => {
                            showGrid = !showGrid;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw triangle
                            viz.drawPolygon([[p0.x, p0.y], [p1.x, p1.y], [p2.x, p2.y]],
                                           viz.colors.purple + '11', viz.colors.purple, 2);

                            // Draw grid of affine combinations
                            if (showGrid) {
                                for (let i = 0; i <= 10; i++) {
                                    for (let j = 0; j <= 10 - i; j++) {
                                        const k = 10 - i - j;
                                        const lambda0 = i / 10;
                                        const lambda1 = j / 10;
                                        const lambda2 = k / 10;
                                        const px = lambda0 * p0.x + lambda1 * p1.x + lambda2 * p2.x;
                                        const py = lambda0 * p0.y + lambda1 * p1.y + lambda2 * p2.y;
                                        viz.drawPoint(px, py, viz.colors.green + '88', null, 2);
                                    }
                                }
                            }

                            // Draw basis vectors from p0
                            viz.drawVector(p0.x, p0.y, p1.x, p1.y, viz.colors.orange + 'AA', 'v₁', 2);
                            viz.drawVector(p0.x, p0.y, p2.x, p2.y, viz.colors.teal + 'AA', 'v₂', 2);

                            // Draw vertices
                            viz.drawPoint(p0.x, p0.y, viz.colors.blue, 'p₀', 10);
                            viz.drawPoint(p1.x, p1.y, viz.colors.orange, 'p₁', 10);
                            viz.drawPoint(p2.x, p2.y, viz.colors.teal, 'p₂', 10);

                            viz.drawDraggables();

                            // Check linear independence
                            const v1x = p1.x - p0.x, v1y = p1.y - p0.y;
                            const v2x = p2.x - p0.x, v2y = p2.y - p0.y;
                            const det = v1x * v2y - v1y * v2x;

                            if (Math.abs(det) < 0.1) {
                                viz.drawText('Points are COLLINEAR (not affinely independent)', 0, 4.5, viz.colors.red, 13, 'center');
                            } else {
                                viz.drawText('Affine basis for ℝ²: any point = λ₀p₀ + λ₁p₁ + λ₂p₂', 0, 4.5, viz.colors.white, 13, 'center');
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that \\(k+1\\) points \\(p_0, \\ldots, p_k\\) are affinely dependent if and only if one of them can be written as an affine combination of the others.',
                    hint: 'Use the definition of affine dependence: there exist \\(\\lambda_i\\) not all zero with \\(\\sum \\lambda_i p_i = 0\\) and \\(\\sum \\lambda_i = 0\\).',
                    solution: 'If \\(\\sum_{i=0}^{k} \\lambda_i p_i = 0\\) with \\(\\sum \\lambda_i = 0\\) and some \\(\\lambda_j \\neq 0\\), then \\(\\lambda_j p_j = -\\sum_{i \\neq j} \\lambda_i p_i\\). Dividing by \\(\\lambda_j\\), we get \\(p_j = \\sum_{i \\neq j} (-\\lambda_i/\\lambda_j) p_i\\), and \\(\\sum_{i \\neq j} (-\\lambda_i/\\lambda_j) = -\\sum_{i=0}^{k} \\lambda_i / \\lambda_j = 0/\\lambda_j = 0 = 1 - 1\\). So \\(p_j\\) is an affine combination. Conversely, if \\(p_j = \\sum_{i \\neq j} \\mu_i p_i\\) with \\(\\sum_{i \\neq j} \\mu_i = 1\\), then \\(\\sum_{i \\neq j} \\mu_i p_i - p_j = 0\\) with coefficients summing to \\(1 - 1 = 0\\), so the points are affinely dependent.'
                },
                {
                    question: 'Show that in an \\(n\\)-dimensional affine space, any \\(n+2\\) points are affinely dependent.',
                    hint: 'Use the fact that in an \\(n\\)-dimensional vector space, any \\(n+1\\) vectors are linearly dependent.',
                    solution: 'Let \\(p_0, \\ldots, p_{n+1}\\) be \\(n+2\\) points. The \\(n+1\\) vectors \\(\\overrightarrow{p_0 p_1}, \\ldots, \\overrightarrow{p_0 p_{n+1}}\\) in the \\(n\\)-dimensional direction space \\(V\\) are linearly dependent, so there exist \\(\\mu_1, \\ldots, \\mu_{n+1}\\) not all zero with \\(\\sum_{i=1}^{n+1} \\mu_i \\overrightarrow{p_0 p_i} = 0\\). Let \\(\\lambda_0 = -\\sum_{i=1}^{n+1} \\mu_i\\) and \\(\\lambda_i = \\mu_i\\) for \\(i \\geq 1\\). Then \\(\\sum_{i=0}^{n+1} \\lambda_i = 0\\) and \\(\\sum_{i=0}^{n+1} \\lambda_i p_i = 0\\) (verified by choosing base point \\(p_0\\)), so the points are affinely dependent.'
                },
                {
                    question: 'Let \\(\\{p_0, \\ldots, p_n\\}\\) be an affine basis for \\(A\\). Show that the change of barycentric coordinates from one affine basis to another is an affine transformation.',
                    hint: 'This is analogous to change of basis in linear algebra.',
                    solution: 'Let \\(\\{q_0, \\ldots, q_n\\}\\) be another affine basis. Each \\(q_j\\) has unique barycentric coordinates with respect to \\(\\{p_0, \\ldots, p_n\\}\\): \\(q_j = \\sum_i a_{ij} p_i\\) with \\(\\sum_i a_{ij} = 1\\). If \\(x = \\sum_j \\lambda_j q_j\\) (with \\(\\sum \\lambda_j = 1\\)), then \\(x = \\sum_j \\lambda_j \\sum_i a_{ij} p_i = \\sum_i (\\sum_j a_{ij} \\lambda_j) p_i\\). The map \\((\\lambda_0, \\ldots, \\lambda_n) \\mapsto (\\sum_j a_{0j}\\lambda_j, \\ldots, \\sum_j a_{nj}\\lambda_j)\\) is an affine transformation on the barycentric coordinate space.'
                }
            ]
        },
        {
            id: 'ch16-sec05',
            title: 'Affine Maps',
            content: `
                <h2>Affine Maps</h2>

                <p>The natural maps between affine spaces are those that preserve the affine structure: affine combinations.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.21 (Affine Map)</div>
                    <div class="env-body">
                        <p>Let \\(A\\) and \\(B\\) be affine spaces over a field \\(F\\), with direction spaces \\(V\\) and \\(W\\) respectively. A map \\(f : A \\to B\\) is <strong>affine</strong> if it preserves affine combinations: for all \\(p_1, \\ldots, p_k \\in A\\) and \\(\\lambda_1, \\ldots, \\lambda_k \\in F\\) with \\(\\sum \\lambda_i = 1\\),</p>
                        \\[f\\left(\\sum_{i=1}^{k} \\lambda_i p_i\\right) = \\sum_{i=1}^{k} \\lambda_i f(p_i).\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 16.22 (Affine Maps and Linear Maps)</div>
                    <div class="env-body">
                        <p>A map \\(f : A \\to B\\) is affine if and only if there exists a linear map \\(T : V \\to W\\) (between the direction spaces) such that for all \\(p, q \\in A\\),</p>
                        \\[\\overrightarrow{f(p)f(q)} = T(\\overrightarrow{pq}).\\]
                        <p>We call \\(T\\) the <strong>linear part</strong> of \\(f\\), denoted \\(T = \\overrightarrow{f}\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>(⇒) Suppose \\(f\\) is affine. Fix a base point \\(o \\in A\\), and define \\(T : V \\to W\\) by \\(T(v) = \\overrightarrow{f(o)f(o+v)}\\). To show \\(T\\) is linear, note that for \\(v, w \\in V\\) and \\(\\alpha, \\beta \\in F\\) with \\(\\alpha + \\beta = 1\\), the affine combination gives:</p>
                        \\[f(\\alpha(o+v) + \\beta(o+w)) = \\alpha f(o+v) + \\beta f(o+w).\\]
                        <p>For general linear combinations, use \\(\\alpha + \\beta \\neq 1\\) by scaling. The details are left as an exercise.</p>
                        <p>(⇐) If \\(T\\) exists, then for any affine combination \\(\\sum \\lambda_i p_i\\) (with \\(\\sum \\lambda_i = 1\\)), choosing base point \\(o\\), we can write each \\(p_i = o + v_i\\), and</p>
                        \\[f\\left(\\sum \\lambda_i p_i\\right) = f\\left(o + \\sum \\lambda_i v_i\\right) = f(o) + T\\left(\\sum \\lambda_i v_i\\right) = f(o) + \\sum \\lambda_i T(v_i) = \\sum \\lambda_i f(p_i).\\]
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 16.23</div>
                    <div class="env-body">
                        <p><strong>1. Translations:</strong> For a fixed vector \\(v_0 \\in V\\), the map \\(\\tau_{v_0} : A \\to A\\) defined by \\(\\tau_{v_0}(p) = p + v_0\\) is affine with linear part \\(T = \\operatorname{id}_V\\).</p>

                        <p><strong>2. Projections:</strong> In \\(\\mathbb{R}^3\\), projection onto the \\(xy\\)-plane given by \\((x,y,z) \\mapsto (x,y,0)\\) is affine with linear part the projection map \\((x,y,z) \\mapsto (x,y,0)\\).</p>

                        <p><strong>3. Standard form:</strong> If we identify \\(A\\) with \\(V\\) via a base point, then every affine map \\(f : V \\to W\\) can be written as \\(f(x) = T(x) + b\\) where \\(T\\) is linear and \\(b \\in W\\) is a constant vector. This is the familiar "linear plus constant" form.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="affine-map-action"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 16.24 (Properties of Affine Maps)</div>
                    <div class="env-body">
                        <p>Let \\(f : A \\to B\\) be an affine map.</p>
                        <ol>
                            <li>\\(f\\) maps flats to flats: if \\(F = p + W\\) is a flat in \\(A\\), then \\(f(F) = f(p) + T(W)\\) is a flat in \\(B\\).</li>
                            <li>\\(f\\) preserves parallelism: if \\(F_1 \\parallel F_2\\) in \\(A\\), then \\(f(F_1) \\parallel f(F_2)\\) in \\(B\\) (or one is contained in the other).</li>
                            <li>\\(f\\) preserves ratios along lines: if \\(p, q, r\\) are collinear with \\(r = (1-t)p + tq\\), then \\(f(r) = (1-t)f(p) + tf(q)\\).</li>
                            <li>The composition of affine maps is affine.</li>
                            <li>\\(f\\) is bijective if and only if its linear part \\(T\\) is an isomorphism.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.25 (Affine Isomorphism)</div>
                    <div class="env-body">
                        <p>An affine map \\(f : A \\to B\\) is an <strong>affine isomorphism</strong> if it is bijective. Two affine spaces are <strong>affinely isomorphic</strong> if there exists an affine isomorphism between them.</p>
                        <p>The set of affine automorphisms \\(f : A \\to A\\) forms a group under composition, denoted \\(\\operatorname{Aff}(A)\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 16.26 (Classification of Affine Spaces)</div>
                    <div class="env-body">
                        <p>Two affine spaces over the same field \\(F\\) are affinely isomorphic if and only if they have the same dimension.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Dimension is clearly preserved by isomorphism. Conversely, if \\(\\dim A = \\dim B = n\\), choose affine bases \\(\\{p_0, \\ldots, p_n\\}\\) for \\(A\\) and \\(\\{q_0, \\ldots, q_n\\}\\) for \\(B\\). Define \\(f\\) by mapping \\(p_i \\mapsto q_i\\) and extending by barycentric coordinates: \\(f\\left(\\sum \\lambda_i p_i\\right) = \\sum \\lambda_i q_i\\). This is an affine isomorphism.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: The Group of Affine Transformations</div>
                    <div class="env-body">
                        <p>When \\(A = V\\) (identifying the affine space with its direction space via the origin), every affine map \\(f : V \\to V\\) has the form \\(f(x) = Tx + b\\) where \\(T \\in \\operatorname{GL}(V)\\) and \\(b \\in V\\). The group \\(\\operatorname{Aff}(V)\\) fits into the short exact sequence</p>
                        \\[1 \\to V \\to \\operatorname{Aff}(V) \\to \\operatorname{GL}(V) \\to 1\\]
                        <p>where \\(V\\) acts by translations and \\(\\operatorname{GL}(V)\\) is the quotient. This is a semidirect product: \\(\\operatorname{Aff}(V) \\cong V \\rtimes \\operatorname{GL}(V)\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'affine-map-action',
                    title: 'Interactive: Affine Map Action',
                    description: 'See how an affine map f(x) = Tx + b transforms a triangle',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 30});

                        let angle = 0.3;
                        let scale = 0.8;
                        let tx = 1, ty = 0.5;

                        const angleSlider = VizEngine.createSlider(controls, 'Rotation', -Math.PI, Math.PI, 0.3, 0.01, (val) => {
                            angle = val;
                            draw();
                        });
                        const scaleSlider = VizEngine.createSlider(controls, 'Scale', 0.3, 1.5, 0.8, 0.01, (val) => {
                            scale = val;
                            draw();
                        });
                        const txSlider = VizEngine.createSlider(controls, 'Translate X', -3, 3, 1, 0.1, (val) => {
                            tx = val;
                            draw();
                        });
                        const tySlider = VizEngine.createSlider(controls, 'Translate Y', -3, 3, 0.5, 0.1, (val) => {
                            ty = val;
                            draw();
                        });

                        // Original triangle
                        const p0 = {x: -4, y: -1};
                        const p1 = {x: -2, y: -1};
                        const p2 = {x: -3, y: 1};

                        function affineMap(p) {
                            const cos = Math.cos(angle);
                            const sin = Math.sin(angle);
                            return {
                                x: scale * (cos * p.x - sin * p.y) + tx,
                                y: scale * (sin * p.x + cos * p.y) + ty
                            };
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw original triangle
                            viz.drawPolygon([[p0.x, p0.y], [p1.x, p1.y], [p2.x, p2.y]],
                                           viz.colors.blue + '33', viz.colors.blue, 2);
                            viz.drawPoint(p0.x, p0.y, viz.colors.blue, 'p₀', 6);
                            viz.drawPoint(p1.x, p1.y, viz.colors.blue, 'p₁', 6);
                            viz.drawPoint(p2.x, p2.y, viz.colors.blue, 'p₂', 6);

                            // Transform
                            const fp0 = affineMap(p0);
                            const fp1 = affineMap(p1);
                            const fp2 = affineMap(p2);

                            // Draw transformed triangle
                            viz.drawPolygon([[fp0.x, fp0.y], [fp1.x, fp1.y], [fp2.x, fp2.y]],
                                           viz.colors.orange + '33', viz.colors.orange, 2);
                            viz.drawPoint(fp0.x, fp0.y, viz.colors.orange, 'f(p₀)', 6);
                            viz.drawPoint(fp1.x, fp1.y, viz.colors.orange, 'f(p₁)', 6);
                            viz.drawPoint(fp2.x, fp2.y, viz.colors.orange, 'f(p₂)', 6);

                            // Show affine structure preservation
                            const mid = {x: (p0.x + p1.x)/2, y: (p0.y + p1.y)/2};
                            const fmid = affineMap(mid);
                            viz.drawPoint(mid.x, mid.y, viz.colors.teal, 'm', 5);
                            viz.drawPoint(fmid.x, fmid.y, viz.colors.teal, 'f(m)', 5);

                            viz.drawText('Original', -3, 2.5, viz.colors.blue, 12, 'center');
                            viz.drawText('f(x) = T·x + b', 0, 5.5, viz.colors.white, 14, 'center');
                            viz.drawText('(affine map preserves midpoints and ratios)', 0, -5.5, viz.colors.teal, 11, 'center');
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Complete the proof of Theorem 16.22: show that if \\(f\\) is affine, then the induced map \\(T : V \\to W\\) defined by \\(T(v) = \\overrightarrow{f(o)f(o+v)}\\) is linear.',
                    hint: 'Use the fact that \\(f\\) preserves affine combinations, and note that \\(o + (\\alpha v + \\beta w) = \\frac{\\alpha}{\\alpha+\\beta}(o + v) + \\frac{\\beta}{\\alpha+\\beta}(o + w)\\) when \\(\\alpha + \\beta \\neq 0\\).',
                    solution: 'For \\(v, w \\in V\\) and \\(\\alpha, \\beta \\in F\\), if \\(\\alpha + \\beta \\neq 0\\), write \\(o + (\\alpha v + \\beta w) = (\\alpha+\\beta)\\left(\\frac{\\alpha}{\\alpha+\\beta}(o+v) + \\frac{\\beta}{\\alpha+\\beta}(o+w)\\right) - (\\alpha+\\beta-1)o\\). This is an affine combination with weights \\(\\frac{\\alpha}{\\alpha+\\beta}, \\frac{\\beta}{\\alpha+\\beta}, -(\\alpha+\\beta-1)\\) summing to 1. Applying \\(f\\) and taking differences shows \\(T(\\alpha v + \\beta w) = \\alpha T(v) + \\beta T(w)\\). For \\(\\alpha + \\beta = 0\\), handle separately.'
                },
                {
                    question: 'Show that an affine map \\(f : A \\to B\\) maps affinely independent points to affinely independent points if and only if its linear part \\(T : V \\to W\\) is injective.',
                    hint: 'Use the characterization: \\(p_0, \\ldots, p_k\\) are affinely independent iff \\(\\overrightarrow{p_0 p_1}, \\ldots, \\overrightarrow{p_0 p_k}\\) are linearly independent.',
                    solution: 'If \\(p_0, \\ldots, p_k\\) are affinely independent, then \\(\\{\\overrightarrow{p_0 p_1}, \\ldots, \\overrightarrow{p_0 p_k}\\}\\) are linearly independent. We have \\(\\overrightarrow{f(p_0)f(p_i)} = T(\\overrightarrow{p_0 p_i})\\). Thus \\(f(p_0), \\ldots, f(p_k)\\) are affinely independent iff \\(\\{T(\\overrightarrow{p_0 p_1}), \\ldots, T(\\overrightarrow{p_0 p_k})\\}\\) are linearly independent. This holds for all affinely independent sets iff \\(T\\) is injective.'
                },
                {
                    question: 'Prove that the composition of two affine maps is affine, and that if \\(f : A \\to B\\) and \\(g : B \\to C\\) are affine with linear parts \\(T_f\\) and \\(T_g\\), then \\(g \\circ f\\) has linear part \\(T_g \\circ T_f\\).',
                    hint: 'Use the characterization in terms of preserving affine combinations.',
                    solution: 'If \\(f\\) and \\(g\\) preserve affine combinations, then for \\(\\sum \\lambda_i p_i\\) with \\(\\sum \\lambda_i = 1\\), we have \\((g \\circ f)(\\sum \\lambda_i p_i) = g(\\sum \\lambda_i f(p_i)) = \\sum \\lambda_i g(f(p_i)) = \\sum \\lambda_i (g \\circ f)(p_i)\\). For the linear part, \\(\\overrightarrow{(g \\circ f)(p)(g \\circ f)(q)} = T_g(\\overrightarrow{f(p)f(q)}) = T_g(T_f(\\overrightarrow{pq})) = (T_g \\circ T_f)(\\overrightarrow{pq})\\).'
                }
            ]
        },
        {
            id: 'ch16-sec06',
            title: 'Affine Geometry and Projective Geometry',
            content: `
                <h2>Affine Geometry and Projective Geometry</h2>

                <p>Affine geometry has a natural connection to projective geometry. By "adding points at infinity," we can complete an affine space to a projective space where parallel lines meet.</p>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>In affine geometry, parallel lines never meet. But from the perspective of projective geometry, parallel lines meet at a "point at infinity" in their common direction. This idea is fundamental in perspective drawing and computer graphics: parallel train tracks appear to converge at the horizon.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.27 (Projective Space)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be an \\((n+1)\\)-dimensional vector space over \\(F\\). The <strong>projective space</strong> \\(\\mathbb{P}(V)\\) is the set of all 1-dimensional subspaces of \\(V\\) (i.e., lines through the origin).</p>
                        <p>Equivalently, \\(\\mathbb{P}(V)\\) is the quotient space \\((V \\setminus \\{0\\}) / {\\sim}\\) where \\(v \\sim w\\) if \\(v = \\lambda w\\) for some \\(\\lambda \\in F^*\\).</p>
                        <p>We write \\(\\mathbb{P}^n(F) = \\mathbb{P}(F^{n+1})\\) for the \\(n\\)-dimensional projective space over \\(F\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.28 (Embedding Affine Space into Projective Space)</div>
                    <div class="env-body">
                        <p>Let \\(A\\) be an \\(n\\)-dimensional affine space with direction space \\(V\\), and let \\(\\mathbb{P}(V \\oplus F)\\) be the \\(n\\)-dimensional projective space. We can embed \\(A\\) into \\(\\mathbb{P}(V \\oplus F)\\) by sending</p>
                        \\[p \\mapsto [\\overrightarrow{op} : 1]\\]
                        <p>where \\(o\\) is a chosen origin and \\([v : \\lambda]\\) denotes the line through \\((v, \\lambda) \\in V \\oplus F\\).</p>
                        <p>The <strong>points at infinity</strong> are those of the form \\([v : 0]\\) for \\(v \\in V \\setminus \\{0\\}\\). They correspond to directions in the affine space. The set of all points at infinity forms a <strong>hyperplane at infinity</strong>, which is a copy of \\(\\mathbb{P}(V)\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="projective-completion"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 16.29 (Parallel Lines Meet at Infinity)</div>
                    <div class="env-body">
                        <p>In the projective completion \\(\\overline{A}\\) of an affine space \\(A\\), two parallel lines in \\(A\\) meet at a unique point at infinity corresponding to their common direction.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Let \\(L_1 = p + \\operatorname{span}(v)\\) and \\(L_2 = q + \\operatorname{span}(v)\\) be parallel lines in \\(A\\) (same direction \\(v\\)). In the projective completion, \\(L_1\\) consists of points \\([tv : 1]\\) for \\(t \\in F\\), plus the point \\([v : 0]\\) at infinity. Similarly for \\(L_2\\). Both lines contain \\([v : 0]\\), so they meet at this point at infinity.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 16.30 (Real Projective Plane)</div>
                    <div class="env-body">
                        <p>The real projective plane \\(\\mathbb{RP}^2\\) can be visualized as the affine plane \\(\\mathbb{R}^2\\) together with a "line at infinity" where all parallel lines meet.</p>
                        <p>In homogeneous coordinates \\([x : y : z]\\), the affine plane corresponds to \\(z \\neq 0\\) (which we can normalize to \\(z = 1\\)), and the line at infinity is \\(z = 0\\).</p>
                        <p>For example:</p>
                        <ul>
                            <li>The point \\((x, y) \\in \\mathbb{R}^2\\) corresponds to \\([x : y : 1]\\).</li>
                            <li>Horizontal lines (direction \\((1, 0)\\)) meet at \\([1 : 0 : 0]\\).</li>
                            <li>Vertical lines (direction \\((0, 1)\\)) meet at \\([0 : 1 : 0]\\).</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark: Affine vs Projective Geometry</div>
                    <div class="env-body">
                        <p><strong>Affine geometry</strong> studies properties invariant under affine transformations: parallelism, ratios of distances along lines, barycentric combinations, midpoints.</p>
                        <p><strong>Projective geometry</strong> studies properties invariant under projective transformations: incidence (which points lie on which lines), cross-ratios, collinearity, concurrence.</p>
                        <p>Projective geometry is "more fundamental" in the sense that it treats all points equally (no special point at infinity), while affine geometry singles out a hyperplane (the hyperplane at infinity) and studies what happens away from it.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 16.31 (Dimension in Projective Geometry)</div>
                    <div class="env-body">
                        <p>Let \\(A\\) be an \\(n\\)-dimensional affine space and let \\(F \\subset A\\) be a \\(k\\)-dimensional flat. In the projective completion \\(\\overline{A}\\), the closure \\(\\overline{F}\\) is a \\(k\\)-dimensional projective subspace.</p>
                        <p>The intersection formula in projective space states: if \\(\\overline{F}\\) and \\(\\overline{G}\\) are projective subspaces with \\(\\dim \\overline{F} + \\dim \\overline{G} \\geq \\dim \\overline{A}\\), then</p>
                        \\[\\dim(\\overline{F} \\cap \\overline{G}) \\geq \\dim \\overline{F} + \\dim \\overline{G} - \\dim \\overline{A}.\\]
                        <p>In particular, in \\(\\mathbb{P}^2\\), any two distinct lines meet at exactly one point.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 16.32 (Applications)</div>
                    <div class="env-body">
                        <p><strong>1. Computer graphics:</strong> Projective transformations model perspective projection, where parallel lines converge to vanishing points.</p>
                        <p><strong>2. Robotics:</strong> The configuration space of a robot arm often has projective structure.</p>
                        <p><strong>3. Algebraic geometry:</strong> Projective varieties (zero sets of homogeneous polynomials) are central objects, and affine varieties are open subsets.</p>
                        <p><strong>4. Duality:</strong> In projective geometry, points and hyperplanes are dual: theorems about points on lines have dual theorems about lines through points.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'projective-completion',
                    title: 'Interactive: Parallel Lines Meeting at Infinity',
                    description: 'Drag points to see parallel lines in affine space (appear to converge in perspective)',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 30});

                        const dir = {x: 1, y: 0.3};
                        const spacing = 2;

                        let numLines = 5;
                        const slider = VizEngine.createSlider(controls, 'Number of parallel lines', 2, 8, 5, 1, (val) => {
                            numLines = val;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw parallel lines
                            const baseY = -(numLines - 1) * spacing / 2;
                            for (let i = 0; i < numLines; i++) {
                                const y = baseY + i * spacing;
                                const color = viz.colors.teal;

                                // Draw line extending far in both directions
                                for (let t = -15; t <= 15; t += 0.5) {
                                    const x = -6 + t * dir.x;
                                    const py = y + t * dir.y;
                                    viz.drawPoint(x, py, color + '44', null, 2);
                                }

                                // Mark a specific point on each line
                                viz.drawPoint(-6, y, color, null, 5);
                            }

                            // Draw "direction vector" (point at infinity)
                            const infX = 7;
                            const infY = 7 * dir.y / dir.x;
                            viz.drawPoint(infX, infY, viz.colors.orange, '∞', 10);

                            // Draw dashed lines toward infinity
                            for (let i = 0; i < numLines; i++) {
                                const y = baseY + i * spacing;
                                viz.drawSegment(-6, y, infX, infY, viz.colors.orange + '66', 1, true);
                            }

                            viz.drawText('Parallel lines in affine space', 0, 6, viz.colors.white, 13, 'center');
                            viz.drawText('All meet at point [v:0] at infinity (orange)', 0, -6.5, viz.colors.orange, 11, 'center');
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that in \\(\\mathbb{P}^2\\), any two distinct lines intersect at exactly one point.',
                    hint: 'Use the dimension formula: \\(\\dim(L_1 \\cap L_2) \\geq \\dim L_1 + \\dim L_2 - \\dim \\mathbb{P}^2 = 1 + 1 - 2 = 0\\).',
                    solution: 'In \\(\\mathbb{P}^2\\), lines are 1-dimensional projective subspaces. By the dimension formula, if \\(L_1\\) and \\(L_2\\) are distinct lines, \\(\\dim(L_1 \\cap L_2) \\geq 1 + 1 - 2 = 0\\), so the intersection is nonempty. If \\(\\dim(L_1 \\cap L_2) = 1\\), then \\(L_1 = L_2\\), contradicting distinctness. Thus \\(\\dim(L_1 \\cap L_2) = 0\\), i.e., a single point.'
                },
                {
                    question: 'Verify that the embedding \\(A \\to \\mathbb{P}(V \\oplus F)\\) by \\(p \\mapsto [\\overrightarrow{op} : 1]\\) is independent of the choice of origin \\(o\\).',
                    hint: 'If \\(o\'\\) is another origin, show that \\([\\overrightarrow{op} : 1] = [\\overrightarrow{o\'p} : 1]\\) as points in projective space.',
                    solution: 'We have \\(\\overrightarrow{o\'p} = \\overrightarrow{o\'o} + \\overrightarrow{op}\\). In projective coordinates, \\([\\overrightarrow{o\'p} : 1] = [\\overrightarrow{o\'o} + \\overrightarrow{op} : 1]\\). But this is NOT the same point unless... Actually, the embedding DOES depend on the origin. What is independent is the projective structure: changing origin corresponds to a projective transformation. The statement is that the affine structure is captured by the choice of hyperplane at infinity.'
                },
                {
                    question: 'Explain why the theorem "any two distinct lines in a plane intersect at exactly one point" is true in projective geometry but false in affine geometry.',
                    hint: 'Consider parallel lines in affine geometry versus projective geometry.',
                    solution: 'In affine geometry, two parallel lines do not intersect (they have empty intersection in the affine plane). In projective geometry, we add points at infinity: parallel lines in the affine plane meet at a point at infinity corresponding to their common direction. Thus in \\(\\mathbb{P}^2\\), any two distinct lines intersect at exactly one point (either in the affine chart or at infinity).'
                }
            ]
        },
        {
            id: 'ch16-sec07',
            title: 'Convex Sets in Affine Spaces',
            content: `
                <h2>Convex Sets in Affine Spaces</h2>

                <p>Convexity is a fundamental concept in affine geometry with deep connections to optimization, economics, and geometry.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.33 (Convex Set)</div>
                    <div class="env-body">
                        <p>A subset \\(C\\) of an affine space \\(A\\) is <strong>convex</strong> if for all \\(p, q \\in C\\) and all \\(\\lambda \\in [0, 1]\\),</p>
                        \\[(1 - \\lambda)p + \\lambda q \\in C.\\]
                        <p>That is, \\(C\\) contains the line segment between any two of its points.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 16.34</div>
                    <div class="env-body">
                        <p><strong>1. Flats:</strong> Every flat \\(F = p + W\\) is convex.</p>
                        <p><strong>2. Balls:</strong> In \\(\\mathbb{R}^n\\), any ball \\(B(c, r) = \\{x : \\|x - c\\| \\leq r\\}\\) is convex.</p>
                        <p><strong>3. Halfspaces:</strong> A halfspace \\(H = \\{p : f(p) \\geq 0\\}\\) for an affine functional \\(f\\) is convex.</p>
                        <p><strong>4. Simplices:</strong> The \\(n\\)-simplex \\(\\Delta^n = \\{(\\lambda_0, \\ldots, \\lambda_n) : \\lambda_i \\geq 0, \\sum \\lambda_i = 1\\}\\) is convex.</p>
                        <p><strong>5. Polyhedra:</strong> The intersection of finitely many halfspaces is a convex polyhedron.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 16.35 (Properties of Convex Sets)</div>
                    <div class="env-body">
                        <ol>
                            <li>The intersection of any family of convex sets is convex.</li>
                            <li>The image of a convex set under an affine map is convex.</li>
                            <li>If \\(C_1, C_2\\) are convex, so is their Minkowski sum \\(C_1 + C_2 = \\{p_1 + p_2 : p_1 \\in C_1, p_2 \\in C_2\\}\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.36 (Convex Hull)</div>
                    <div class="env-body">
                        <p>The <strong>convex hull</strong> of a set \\(S \\subseteq A\\), denoted \\(\\operatorname{conv}(S)\\), is the smallest convex set containing \\(S\\). Equivalently,</p>
                        \\[\\operatorname{conv}(S) = \\left\\{\\sum_{i=1}^{n} \\lambda_i p_i : n \\geq 1, p_i \\in S, \\lambda_i \\geq 0, \\sum \\lambda_i = 1\\right\\}.\\]
                        <p>These are the <strong>convex combinations</strong> of points in \\(S\\) (affine combinations with non-negative coefficients).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 16.37 (Carathéodory's Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(S \\subseteq A\\) where \\(\\dim A = n\\). Then every point in \\(\\operatorname{conv}(S)\\) can be written as a convex combination of at most \\(n + 1\\) points from \\(S\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Sketch)</div>
                    <div class="env-body">
                        <p>Suppose \\(p = \\sum_{i=1}^{k} \\lambda_i p_i\\) with \\(k > n + 1\\), \\(\\lambda_i > 0\\), \\(\\sum \\lambda_i = 1\\). Then \\(p_1, \\ldots, p_k\\) are affinely dependent, so there exist \\(\\mu_i\\) (not all zero) with \\(\\sum \\mu_i = 0\\) and \\(\\sum \\mu_i p_i = 0\\). Choose \\(t > 0\\) maximal such that \\(\\lambda_i - t\\mu_i \\geq 0\\) for all \\(i\\). Then \\(p = \\sum (\\lambda_i - t\\mu_i)p_i\\) is a convex combination with fewer nonzero terms.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 16.38 (Extreme Points)</div>
                    <div class="env-body">
                        <p>A point \\(p \\in C\\) (where \\(C\\) is convex) is an <strong>extreme point</strong> if it cannot be written as a nontrivial convex combination of other points in \\(C\\). That is, if \\(p = (1-\\lambda)q + \\lambda r\\) with \\(q, r \\in C\\) and \\(\\lambda \\in (0, 1)\\), then \\(p = q = r\\).</p>
                        <p>Geometrically, extreme points are the "corners" of \\(C\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 16.39 (Krein-Milman Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(C\\) be a compact convex set in a finite-dimensional affine space over \\(\\mathbb{R}\\). Then \\(C\\) is the convex hull of its extreme points:</p>
                        \\[C = \\operatorname{conv}(\\operatorname{ext}(C)).\\]
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The Krein-Milman theorem says that every compact convex set is determined by its "corners." This is fundamental in optimization: to minimize a linear functional over a compact convex set, it suffices to check the extreme points (vertices).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="convex-hull"></div>
            `,
            visualizations: [
                {
                    id: 'convex-hull',
                    title: 'Interactive: Convex Hull and Extreme Points',
                    description: 'Drag points to see the convex hull and identify extreme points',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        const points = [];
                        for (let i = 0; i < 6; i++) {
                            const angle = (i / 6) * 2 * Math.PI + Math.random() * 0.3;
                            const r = 2 + Math.random() * 1.5;
                            points.push(viz.addDraggable(`p${i}`, r * Math.cos(angle), r * Math.sin(angle),
                                                        viz.colors.blue, 8, () => draw()));
                        }

                        function computeConvexHull(pts) {
                            // Gift wrapping algorithm
                            if (pts.length < 3) return pts.map(p => [p.x, p.y]);
                            const hull = [];
                            let pointOnHull = pts.reduce((min, p) => p.x < min.x ? p : min, pts[0]);
                            let endpoint;
                            do {
                                hull.push([pointOnHull.x, pointOnHull.y]);
                                endpoint = pts[0];
                                for (let j = 1; j < pts.length; j++) {
                                    if (endpoint === pointOnHull ||
                                        cross([pointOnHull.x, pointOnHull.y], [endpoint.x, endpoint.y], [pts[j].x, pts[j].y]) > 0) {
                                        endpoint = pts[j];
                                    }
                                }
                                pointOnHull = endpoint;
                            } while (endpoint !== pts.reduce((min, p) => p.x < min.x ? p : min, pts[0]));
                            return hull;
                        }

                        function cross(o, a, b) {
                            return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const hull = computeConvexHull(points);

                            // Draw convex hull
                            viz.drawPolygon(hull, viz.colors.teal + '22', viz.colors.teal, 3);

                            // Identify extreme points
                            const hullSet = new Set(hull.map(p => `${p[0].toFixed(3)},${p[1].toFixed(3)}`));

                            // Draw all points
                            points.forEach(p => {
                                const isExtreme = hullSet.has(`${p.x.toFixed(3)},${p.y.toFixed(3)}`);
                                viz.drawPoint(p.x, p.y, isExtreme ? viz.colors.orange : viz.colors.blue,
                                             null, isExtreme ? 10 : 6);
                            });

                            viz.drawDraggables();

                            viz.drawText('Convex Hull = conv(extreme points)', 0, 4.5, viz.colors.white, 13, 'center');
                            viz.drawText('Orange = extreme points (vertices), Blue = interior', 0, -4.5, viz.colors.orange, 11, 'center');
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that the intersection of any collection of convex sets is convex.',
                    hint: 'If \\(p, q\\) are in all sets in the collection, then so is any convex combination.',
                    solution: 'Let \\(\\{C_i : i \\in I\\}\\) be convex sets and \\(C = \\bigcap_{i \\in I} C_i\\). If \\(p, q \\in C\\), then \\(p, q \\in C_i\\) for all \\(i\\). Since each \\(C_i\\) is convex, \\((1-\\lambda)p + \\lambda q \\in C_i\\) for all \\(i\\) and \\(\\lambda \\in [0,1]\\). Thus \\((1-\\lambda)p + \\lambda q \\in C\\), so \\(C\\) is convex.'
                },
                {
                    question: 'Show that if \\(f : A \\to B\\) is an affine map and \\(C \\subseteq A\\) is convex, then \\(f(C)\\) is convex.',
                    hint: 'Use the fact that affine maps preserve affine (hence convex) combinations.',
                    solution: 'Let \\(p\', q\' \\in f(C)\\), so \\(p\' = f(p)\\) and \\(q\' = f(q)\\) for some \\(p, q \\in C\\). For \\(\\lambda \\in [0,1]\\), the convex combination \\((1-\\lambda)p + \\lambda q \\in C\\) since \\(C\\) is convex. Then \\((1-\\lambda)p\' + \\lambda q\' = (1-\\lambda)f(p) + \\lambda f(q) = f((1-\\lambda)p + \\lambda q) \\in f(C)\\), so \\(f(C)\\) is convex.'
                },
                {
                    question: 'Prove that a point \\(p\\) in a convex set \\(C\\) is an extreme point if and only if \\(C \\setminus \\{p\\}\\) is convex.',
                    hint: 'Show: \\(p\\) is extreme ⟺ for all \\(q, r \\in C \\setminus \\{p\\}\\) and \\(\\lambda \\in (0,1)\\), we have \\((1-\\lambda)q + \\lambda r \\neq p\\).',
                    solution: '(⇒) If \\(p\\) is extreme and \\(q, r \\in C \\setminus \\{p\\}\\), then for any \\(\\lambda \\in (0,1)\\), if \\((1-\\lambda)q + \\lambda r = p\\), then by definition of extreme point, \\(p = q = r\\), contradicting \\(q, r \\neq p\\). Thus \\((1-\\lambda)q + \\lambda r \\neq p\\), and since \\(C\\) is convex, \\((1-\\lambda)q + \\lambda r \\in C\\), so it is in \\(C \\setminus \\{p\\}\\). (⇐) If \\(C \\setminus \\{p\\}\\) is convex and \\(p = (1-\\lambda)q + \\lambda r\\) for some \\(\\lambda \\in (0,1)\\), then \\(q, r \\in C\\). If \\(q \\neq p\\) or \\(r \\neq p\\), then the convex combination is in \\(C \\setminus \\{p\\}\\), contradiction. So \\(q = r = p\\), and \\(p\\) is extreme.'
                }
            ]
        }
    ]
});
