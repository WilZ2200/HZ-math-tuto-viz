window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch02',
    number: 2,
    title: 'Linear Transformations',
    subtitle: 'Maps that preserve vector space structure',
    sections: [
        {
            id: 'ch02-sec01',
            title: 'Definitions and Basic Properties',
            content: `
                <h2>Definitions and Basic Properties</h2>

                <p>Linear transformations are the fundamental morphisms in the category of vector spaces. They are the maps that preserve the vector space structure, making them the natural objects to study in linear algebra.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 2.1 (Linear Transformation)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) and \\(W\\) be vector spaces over a field \\(F\\). A function \\(\\tau: V \\to W\\) is called a <strong>linear transformation</strong> (or <strong>linear map</strong>) if for all \\(v, u \\in V\\) and all scalars \\(a \\in F\\):</p>
                        <ol>
                            <li>\\(\\tau(v + u) = \\tau(v) + \\tau(u)\\) (additivity)</li>
                            <li>\\(\\tau(av) = a\\tau(v)\\) (homogeneity)</li>
                        </ol>
                        <p>We denote the set of all linear transformations from \\(V\\) to \\(W\\) by \\(\\mathcal{L}(V, W)\\). When \\(V = W\\), we write \\(\\mathcal{L}(V)\\) and call such maps <strong>linear operators</strong> on \\(V\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>A linear transformation is a function that "respects" the vector space operations. Geometrically in \\(\\mathbb{R}^2\\) or \\(\\mathbb{R}^3\\), linear transformations include rotations, reflections, scalings, shears, and projections. The key property: lines through the origin map to lines through the origin (or to the origin itself), and parallel lines map to parallel lines.</p>
                        <p>The two conditions can be combined into a single statement: \\(\\tau(av + bu) = a\\tau(v) + b\\tau(u)\\) for all \\(a, b \\in F\\) and \\(v, u \\in V\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 2.1 (Basic Linear Transformations)</div>
                    <div class="env-body">
                        <p><strong>(a)</strong> The <strong>zero transformation</strong> \\(\\tau: V \\to W\\) defined by \\(\\tau(v) = 0\\) for all \\(v \\in V\\) is linear.</p>
                        <p><strong>(b)</strong> The <strong>identity transformation</strong> \\(\\iota: V \\to V\\) defined by \\(\\iota(v) = v\\) for all \\(v \\in V\\) is linear.</p>
                        <p><strong>(c)</strong> For \\(\\tau: \\mathbb{R}^3 \\to \\mathbb{R}^2\\) defined by \\(\\tau(x, y, z) = (x - y, z)\\), we verify linearity:
                        \\[\\tau(a(x_1, y_1, z_1) + b(x_2, y_2, z_2)) = \\tau(ax_1 + bx_2, ay_1 + by_2, az_1 + bz_2)\\]
                        \\[= (ax_1 + bx_2 - ay_1 - by_2, az_1 + bz_2) = a(x_1 - y_1, z_1) + b(x_2 - y_2, z_2)\\]
                        </p>
                        <p><strong>(d)</strong> The <strong>differentiation operator</strong> \\(D: P_n \\to P_{n-1}\\) on polynomials of degree at most \\(n\\) is linear.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="transform-unit-square"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 2.1 (Properties of Linear Transformations)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau: V \\to W\\) be a linear transformation. Then:</p>
                        <ol>
                            <li>\\(\\tau(0_V) = 0_W\\)</li>
                            <li>\\(\\tau(-v) = -\\tau(v)\\) for all \\(v \\in V\\)</li>
                            <li>\\(\\tau\\left(\\sum_{i=1}^{n} a_i v_i\\right) = \\sum_{i=1}^{n} a_i \\tau(v_i)\\) for all \\(a_i \\in F\\) and \\(v_i \\in V\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>(1) \\(\\tau(0_V) = \\tau(0 \\cdot v) = 0 \\cdot \\tau(v) = 0_W\\) for any \\(v \\in V\\).</p>
                        <p>(2) \\(\\tau(-v) = \\tau((-1) \\cdot v) = (-1) \\cdot \\tau(v) = -\\tau(v)\\).</p>
                        <p>(3) By induction on \\(n\\) using additivity and homogeneity.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 2.2 (Extension by Linearity)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) and \\(W\\) be vector spaces over \\(F\\), and let \\(\\mathcal{B} = \\{b_1, b_2, \\ldots, b_n\\}\\) be a basis for \\(V\\). For any choice of vectors \\(w_1, w_2, \\ldots, w_n \\in W\\), there exists a <em>unique</em> linear transformation \\(\\tau: V \\to W\\) such that \\(\\tau(b_i) = w_i\\) for \\(i = 1, 2, \\ldots, n\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Since \\(\\mathcal{B}\\) is a basis, every \\(v \\in V\\) can be uniquely written as \\(v = \\sum_{i=1}^{n} a_i b_i\\). Define:
                        \\[\\tau(v) = \\sum_{i=1}^{n} a_i w_i\\]
                        This is well-defined by the uniqueness of the representation. Linearity follows from the uniqueness of basis expansions. If \\(\\sigma\\) is another linear transformation with \\(\\sigma(b_i) = w_i\\), then \\(\\tau\\) and \\(\\sigma\\) agree on the basis, hence on all of \\(V\\), proving uniqueness.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>This theorem is powerful: to define a linear transformation from a finite-dimensional space, it suffices to specify where the basis vectors go. The transformation is then completely determined by linearity.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'transform-unit-square',
                    title: 'Interactive: Linear Transformation of the Unit Square',
                    description: 'Adjust matrix entries to see how a linear transformation \\(T(x) = Ax\\) transforms the unit square and grid',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        let matrix = [[1, 0], [0, 1]];

                        const aSlider = VizEngine.createSlider(controls, 'a (top-left)', -2, 2, 1, 0.1, draw);
                        const bSlider = VizEngine.createSlider(controls, 'b (top-right)', -2, 2, 0, 0.1, draw);
                        const cSlider = VizEngine.createSlider(controls, 'c (bottom-left)', -2, 2, 0, 0.1, draw);
                        const dSlider = VizEngine.createSlider(controls, 'd (bottom-right)', -2, 2, 1, 0.1, draw);

                        function draw() {
                            matrix = [[parseFloat(aSlider.value), parseFloat(bSlider.value)],
                                     [parseFloat(cSlider.value), parseFloat(dSlider.value)]];

                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw transformed grid lines
                            for (let x = -5; x <= 5; x++) {
                                const p1 = VizEngine.matVec(matrix, [x, -5]);
                                const p2 = VizEngine.matVec(matrix, [x, 5]);
                                viz.drawSegment(p1[0], p1[1], p2[0], p2[1], viz.colors.teal + '33', 1);
                            }
                            for (let y = -5; y <= 5; y++) {
                                const p1 = VizEngine.matVec(matrix, [-5, y]);
                                const p2 = VizEngine.matVec(matrix, [5, y]);
                                viz.drawSegment(p1[0], p1[1], p2[0], p2[1], viz.colors.teal + '33', 1);
                            }

                            // Draw transformed unit square
                            viz.drawTransformedUnitSquare(matrix, viz.colors.blue + '44', viz.colors.blue);

                            // Draw basis vectors
                            const e1 = VizEngine.matVec(matrix, [1, 0]);
                            const e2 = VizEngine.matVec(matrix, [0, 1]);
                            viz.drawVector(0, 0, e1[0], e1[1], viz.colors.orange, 'T(e₁)', 3);
                            viz.drawVector(0, 0, e2[0], e2[1], viz.colors.purple, 'T(e₂)', 3);

                            // Display matrix and determinant
                            const det = VizEngine.det2(matrix);
                            viz.drawText(`Matrix: [${matrix[0][0].toFixed(1)}, ${matrix[0][1].toFixed(1)}; ${matrix[1][0].toFixed(1)}, ${matrix[1][1].toFixed(1)}]`,
                                        -6.5, 4.5, viz.colors.text, 14);
                            viz.drawText(`det = ${det.toFixed(2)}`, -6.5, 3.8, viz.colors.text, 14);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that if \\(\\tau: V \\to W\\) is a linear transformation and \\(S = \\{v_1, \\ldots, v_n\\}\\) is a linearly dependent set in \\(V\\), then \\(\\tau(S) = \\{\\tau(v_1), \\ldots, \\tau(v_n)\\}\\) is linearly dependent in \\(W\\) (unless all \\(\\tau(v_i) = 0\\)).',
                    hint: 'Use a nontrivial linear combination of the \\(v_i\\) that equals zero, and apply \\(\\tau\\) to both sides.',
                    solution: 'If \\(\\sum a_i v_i = 0\\) with not all \\(a_i = 0\\), then by linearity \\(\\sum a_i \\tau(v_i) = \\tau(0) = 0\\). This is a nontrivial linear combination of the \\(\\tau(v_i)\\) unless all \\(\\tau(v_i) = 0\\).'
                },
                {
                    question: 'Let \\(\\tau: \\mathbb{R}^3 \\to \\mathbb{R}^2\\) be defined by \\(\\tau(x, y, z) = (x + 2y, 3z - y)\\). Find a basis for \\(\\mathbb{R}^3\\) and specify where \\(\\tau\\) sends each basis vector.',
                    hint: 'Use the standard basis and compute \\(\\tau(e_1)\\), \\(\\tau(e_2)\\), \\(\\tau(e_3)\\).',
                    solution: 'Using the standard basis \\(\\{e_1, e_2, e_3\\}\\): \\(\\tau(e_1) = \\tau(1,0,0) = (1, 0)\\), \\(\\tau(e_2) = \\tau(0,1,0) = (2, -1)\\), \\(\\tau(e_3) = \\tau(0,0,1) = (0, 3)\\).'
                },
                {
                    question: 'Show that the map \\(\\tau: \\mathbb{R}^2 \\to \\mathbb{R}^2\\) defined by \\(\\tau(x, y) = (x^2, y)\\) is not a linear transformation.',
                    hint: 'Check if \\(\\tau(2v) = 2\\tau(v)\\) for some specific vector \\(v\\).',
                    solution: 'Take \\(v = (1, 0)\\). Then \\(\\tau(2v) = \\tau(2, 0) = (4, 0)\\) but \\(2\\tau(v) = 2(1, 0) = (2, 0)\\). Since these are not equal, \\(\\tau\\) is not linear.'
                }
            ]
        },
        {
            id: 'ch02-sec02',
            title: 'Kernel and Image',
            content: `
                <h2>Kernel and Image</h2>

                <p>Two subspaces naturally associated with any linear transformation capture essential information about its behavior: the kernel (what maps to zero) and the image (what the transformation can reach).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 2.2 (Kernel and Image)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau: V \\to W\\) be a linear transformation.</p>
                        <ul>
                            <li>The <strong>kernel</strong> (or <strong>null space</strong>) of \\(\\tau\\) is:
                            \\[\\ker(\\tau) = \\{v \\in V : \\tau(v) = 0\\}\\]
                            </li>
                            <li>The <strong>image</strong> (or <strong>range</strong>) of \\(\\tau\\) is:
                            \\[\\operatorname{im}(\\tau) = \\{\\tau(v) : v \\in V\\} = \\{w \\in W : w = \\tau(v) \\text{ for some } v \\in V\\}\\]
                            </li>
                        </ul>
                        <p>The <strong>nullity</strong> of \\(\\tau\\) is \\(\\operatorname{null}(\\tau) = \\dim(\\ker(\\tau))\\), and the <strong>rank</strong> of \\(\\tau\\) is \\(\\operatorname{rk}(\\tau) = \\dim(\\operatorname{im}(\\tau))\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 2.3</div>
                    <div class="env-body">
                        <p>Let \\(\\tau: V \\to W\\) be a linear transformation. Then:</p>
                        <ol>
                            <li>\\(\\ker(\\tau)\\) is a subspace of \\(V\\)</li>
                            <li>\\(\\operatorname{im}(\\tau)\\) is a subspace of \\(W\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>(1)</strong> We verify the subspace criteria for \\(\\ker(\\tau)\\):</p>
                        <ul>
                            <li>\\(0 \\in \\ker(\\tau)\\) since \\(\\tau(0) = 0\\)</li>
                            <li>If \\(u, v \\in \\ker(\\tau)\\), then \\(\\tau(u + v) = \\tau(u) + \\tau(v) = 0 + 0 = 0\\), so \\(u + v \\in \\ker(\\tau)\\)</li>
                            <li>If \\(v \\in \\ker(\\tau)\\) and \\(a \\in F\\), then \\(\\tau(av) = a\\tau(v) = a \\cdot 0 = 0\\), so \\(av \\in \\ker(\\tau)\\)</li>
                        </ul>
                        <p><strong>(2)</strong> We verify the subspace criteria for \\(\\operatorname{im}(\\tau)\\):</p>
                        <ul>
                            <li>\\(0 \\in \\operatorname{im}(\\tau)\\) since \\(0 = \\tau(0)\\)</li>
                            <li>If \\(w_1, w_2 \\in \\operatorname{im}(\\tau)\\), then \\(w_1 = \\tau(v_1)\\) and \\(w_2 = \\tau(v_2)\\) for some \\(v_1, v_2 \\in V\\). Thus \\(w_1 + w_2 = \\tau(v_1) + \\tau(v_2) = \\tau(v_1 + v_2) \\in \\operatorname{im}(\\tau)\\)</li>
                            <li>If \\(w \\in \\operatorname{im}(\\tau)\\) with \\(w = \\tau(v)\\) and \\(a \\in F\\), then \\(aw = a\\tau(v) = \\tau(av) \\in \\operatorname{im}(\\tau)\\)</li>
                        </ul>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="kernel-image-viz"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 2.4 (Injectivity and Surjectivity)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau: V \\to W\\) be a linear transformation. Then:</p>
                        <ol>
                            <li>\\(\\tau\\) is <strong>injective</strong> (one-to-one) if and only if \\(\\ker(\\tau) = \\{0\\}\\)</li>
                            <li>\\(\\tau\\) is <strong>surjective</strong> (onto) if and only if \\(\\operatorname{im}(\\tau) = W\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>(1)</strong> Suppose \\(\\ker(\\tau) = \\{0\\}\\). If \\(\\tau(u) = \\tau(v)\\), then \\(\\tau(u - v) = 0\\), so \\(u - v \\in \\ker(\\tau) = \\{0\\}\\), thus \\(u = v\\). This shows \\(\\tau\\) is injective.</p>
                        <p>Conversely, suppose \\(\\tau\\) is injective. If \\(v \\in \\ker(\\tau)\\), then \\(\\tau(v) = 0 = \\tau(0)\\). By injectivity, \\(v = 0\\), so \\(\\ker(\\tau) = \\{0\\}\\).</p>
                        <p><strong>(2)</strong> This is simply a restatement of the definition of surjectivity in terms of the image.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 2.3 (Isomorphism)</div>
                    <div class="env-body">
                        <p>A linear transformation \\(\\tau: V \\to W\\) is called an <strong>isomorphism</strong> if it is both injective and surjective (i.e., bijective). If an isomorphism from \\(V\\) to \\(W\\) exists, we say \\(V\\) and \\(W\\) are <strong>isomorphic</strong> and write \\(V \\cong W\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Isomorphic vector spaces are "the same" from the perspective of linear algebra—they have identical linear structure, differing only in the names of their elements. The kernel measures how much information is lost by \\(\\tau\\) (collapsed to zero), while the image measures what \\(\\tau\\) can reach. An isomorphism loses no information and reaches everything.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 2.5 (Characterization of Isomorphisms)</div>
                    <div class="env-body">
                        <p>A linear transformation \\(\\tau: V \\to W\\) is an isomorphism if and only if \\(\\tau\\) maps some basis of \\(V\\) to a basis of \\(W\\). In this case, \\(\\tau\\) maps every basis of \\(V\\) to a basis of \\(W\\).</p>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 2.6 (Dimension and Isomorphism)</div>
                    <div class="env-body">
                        <p>Two finite-dimensional vector spaces \\(V\\) and \\(W\\) over the same field \\(F\\) are isomorphic if and only if \\(\\dim(V) = \\dim(W)\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'kernel-image-viz',
                    title: 'Interactive: Kernel and Image Visualization',
                    description: 'See how a linear transformation maps vectors, highlighting the kernel and image',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        let matrix = [[2, 1], [1, 0.5]];

                        const aSlider = VizEngine.createSlider(controls, 'a', -2, 2, 2, 0.1, draw);
                        const bSlider = VizEngine.createSlider(controls, 'b', -2, 2, 1, 0.1, draw);
                        const cSlider = VizEngine.createSlider(controls, 'c', -2, 2, 1, 0.1, draw);
                        const dSlider = VizEngine.createSlider(controls, 'd', -2, 2, 0.5, 0.1, draw);

                        const inputVec = viz.addDraggable('input', 2, 1, viz.colors.blue, 8, draw);

                        function draw() {
                            matrix = [[parseFloat(aSlider.value), parseFloat(bSlider.value)],
                                     [parseFloat(cSlider.value), parseFloat(dSlider.value)]];

                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const det = VizEngine.det2(matrix);

                            // If kernel is nontrivial, highlight it
                            if (Math.abs(det) < 0.01) {
                                // Find kernel direction
                                const kernelDir = [-matrix[0][1], matrix[0][0]];
                                const len = VizEngine.vecLen(kernelDir);
                                if (len > 0.01) {
                                    const normalized = [kernelDir[0]/len * 5, kernelDir[1]/len * 5];
                                    viz.drawSegment(-normalized[0], -normalized[1], normalized[0], normalized[1],
                                                   viz.colors.red, 3);
                                    viz.drawText('kernel', normalized[0] + 0.5, normalized[1], viz.colors.red, 12);
                                }
                            }

                            // Draw image (column space)
                            const col1 = [matrix[0][0], matrix[1][0]];
                            const col2 = [matrix[0][1], matrix[1][1]];

                            if (Math.abs(det) < 0.01) {
                                // One-dimensional image
                                const imgDir = VizEngine.vecLen(col1) > 0.01 ? col1 : col2;
                                const len = VizEngine.vecLen(imgDir);
                                if (len > 0.01) {
                                    const normalized = [imgDir[0]/len * 5, imgDir[1]/len * 5];
                                    viz.drawSegment(-normalized[0], -normalized[1], normalized[0], normalized[1],
                                                   viz.colors.green + '88', 3);
                                    viz.drawText('image', normalized[0] + 0.5, normalized[1] + 0.5, viz.colors.green, 12);
                                }
                            } else {
                                // Full rank: image is all of R^2
                                viz.drawText('image = ℝ²', -6.5, 4.5, viz.colors.green, 14);
                            }

                            // Draw input vector and its image
                            viz.drawVector(0, 0, inputVec.x, inputVec.y, viz.colors.blue, 'v', 2);

                            const output = VizEngine.matVec(matrix, [inputVec.x, inputVec.y]);
                            viz.drawVector(0, 0, output[0], output[1], viz.colors.orange, 'T(v)', 3);

                            viz.drawDraggables();

                            // Info text
                            viz.drawText(`rank = ${Math.abs(det) < 0.01 ? '1' : '2'}`, -6.5, 3.8, viz.colors.text, 14);
                            viz.drawText(`nullity = ${Math.abs(det) < 0.01 ? '1' : '0'}`, -6.5, 3.1, viz.colors.text, 14);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(\\tau: \\mathbb{R}^3 \\to \\mathbb{R}^2\\) be defined by \\(\\tau(x, y, z) = (x + y, 2x + 2y)\\). Find \\(\\ker(\\tau)\\) and \\(\\operatorname{im}(\\tau)\\), giving a basis for each.',
                    hint: 'For the kernel, solve \\(\\tau(x,y,z) = (0,0)\\). For the image, note that the second component is always twice the first.',
                    solution: '\\(\\ker(\\tau) = \\{(x, y, z) : x + y = 0\\} = \\operatorname{span}\\{(-1, 1, 0), (0, 0, 1)\\}\\). \\(\\operatorname{im}(\\tau) = \\{(a, 2a) : a \\in \\mathbb{R}\\} = \\operatorname{span}\\{(1, 2)\\}\\). Bases: \\(\\{(-1, 1, 0), (0, 0, 1)\\}\\) for kernel, \\(\\{(1, 2)\\}\\) for image.'
                },
                {
                    question: 'Prove that if \\(\\tau: V \\to W\\) is an isomorphism, then \\(\\tau^{-1}: W \\to V\\) is also a linear transformation (and hence an isomorphism).',
                    hint: 'Show that \\(\\tau^{-1}(w_1 + w_2) = \\tau^{-1}(w_1) + \\tau^{-1}(w_2)\\) by applying \\(\\tau\\) to both sides.',
                    solution: 'Let \\(w_1, w_2 \\in W\\) with \\(\\tau^{-1}(w_1) = v_1\\) and \\(\\tau^{-1}(w_2) = v_2\\). Then \\(\\tau(v_1 + v_2) = \\tau(v_1) + \\tau(v_2) = w_1 + w_2\\), so \\(\\tau^{-1}(w_1 + w_2) = v_1 + v_2 = \\tau^{-1}(w_1) + \\tau^{-1}(w_2)\\). Similarly for scalar multiplication.'
                },
                {
                    question: 'Show that the vector spaces \\(P_3\\) (polynomials of degree ≤ 3) and \\(\\mathbb{R}^4\\) are isomorphic by constructing an explicit isomorphism.',
                    hint: 'Consider the coefficient map.',
                    solution: 'Define \\(\\tau: P_3 \\to \\mathbb{R}^4\\) by \\(\\tau(a_0 + a_1 x + a_2 x^2 + a_3 x^3) = (a_0, a_1, a_2, a_3)\\). This is linear, injective (if \\(\\tau(p) = 0\\) then all coefficients are zero so \\(p = 0\\)), and surjective (any \\((a_0, a_1, a_2, a_3)\\) is the image of \\(a_0 + a_1 x + a_2 x^2 + a_3 x^3\\)).'
                }
            ]
        },
        {
            id: 'ch02-sec03',
            title: 'The Rank-Nullity Theorem',
            content: `
                <h2>The Rank-Nullity Theorem</h2>

                <p>One of the most fundamental results in linear algebra relates the dimensions of the kernel and image of a linear transformation to the dimension of its domain.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 2.7 (Rank-Nullity Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau: V \\to W\\) be a linear transformation, where \\(V\\) is finite-dimensional. Then:
                        \\[\\dim(V) = \\dim(\\ker(\\tau)) + \\dim(\\operatorname{im}(\\tau))\\]
                        or equivalently,
                        \\[\\dim(V) = \\operatorname{null}(\\tau) + \\operatorname{rk}(\\tau)\\]
                        </p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Let \\(k = \\dim(\\ker(\\tau))\\) and choose a basis \\(\\{v_1, \\ldots, v_k\\}\\) for \\(\\ker(\\tau)\\). Extend this to a basis \\(\\{v_1, \\ldots, v_k, v_{k+1}, \\ldots, v_n\\}\\) for \\(V\\), where \\(n = \\dim(V)\\).</p>

                        <p>We claim that \\(\\{\\tau(v_{k+1}), \\ldots, \\tau(v_n)\\}\\) is a basis for \\(\\operatorname{im}(\\tau)\\).</p>

                        <p><strong>Spanning:</strong> Let \\(w \\in \\operatorname{im}(\\tau)\\), so \\(w = \\tau(v)\\) for some \\(v \\in V\\). Write \\(v = \\sum_{i=1}^{k} a_i v_i + \\sum_{i=k+1}^{n} a_i v_i\\). Then:
                        \\[w = \\tau(v) = \\sum_{i=1}^{k} a_i \\tau(v_i) + \\sum_{i=k+1}^{n} a_i \\tau(v_i) = \\sum_{i=k+1}^{n} a_i \\tau(v_i)\\]
                        since \\(\\tau(v_i) = 0\\) for \\(i \\leq k\\).</p>

                        <p><strong>Linear independence:</strong> Suppose \\(\\sum_{i=k+1}^{n} a_i \\tau(v_i) = 0\\). Then:
                        \\[\\tau\\left(\\sum_{i=k+1}^{n} a_i v_i\\right) = 0\\]
                        so \\(\\sum_{i=k+1}^{n} a_i v_i \\in \\ker(\\tau)\\). This means we can write:
                        \\[\\sum_{i=k+1}^{n} a_i v_i = \\sum_{i=1}^{k} b_i v_i\\]
                        for some scalars \\(b_i\\). Rearranging: \\(\\sum_{i=1}^{k} (-b_i) v_i + \\sum_{i=k+1}^{n} a_i v_i = 0\\). By linear independence of the basis, all coefficients are zero, so \\(a_i = 0\\) for all \\(i > k\\).</p>

                        <p>Therefore, \\(\\dim(\\operatorname{im}(\\tau)) = n - k\\), which gives \\(\\dim(V) = k + (n-k) = \\dim(\\ker(\\tau)) + \\dim(\\operatorname{im}(\\tau))\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The rank-nullity theorem is a conservation law for dimension. Think of it as: dimensions going in = dimensions collapsed + dimensions going out. The nullity counts how many dimensions are "lost" (sent to zero), and the rank counts how many dimensions remain in the output. Their sum must equal the input dimension.</p>
                        <p>Geometrically: if \\(\\tau: \\mathbb{R}^3 \\to \\mathbb{R}^3\\) has a 1-dimensional kernel (a line through the origin), then its image must be 2-dimensional (a plane through the origin).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="rank-nullity-balance"></div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 2.8</div>
                    <div class="env-body">
                        <p>Let \\(\\tau: V \\to W\\) be a linear transformation where \\(\\dim(V) = \\dim(W) < \\infty\\). Then the following are equivalent:</p>
                        <ol>
                            <li>\\(\\tau\\) is injective</li>
                            <li>\\(\\tau\\) is surjective</li>
                            <li>\\(\\tau\\) is an isomorphism</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Let \\(n = \\dim(V) = \\dim(W)\\). By the rank-nullity theorem, \\(\\operatorname{null}(\\tau) + \\operatorname{rk}(\\tau) = n\\).</p>
                        <p>\\(\\tau\\) is injective \\(\\iff \\ker(\\tau) = \\{0\\} \\iff \\operatorname{null}(\\tau) = 0 \\iff \\operatorname{rk}(\\tau) = n \\iff \\operatorname{im}(\\tau) = W \\iff\\) \\(\\tau\\) is surjective.</p>
                        <p>If either holds, then \\(\\tau\\) is bijective, hence an isomorphism. Conversely, an isomorphism is both injective and surjective.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body">
                        <p>This corollary <em>fails</em> for infinite-dimensional spaces! Consider the right-shift operator \\(\\sigma: \\mathbb{R}^{\\infty} \\to \\mathbb{R}^{\\infty}\\) given by \\(\\sigma(a_1, a_2, a_3, \\ldots) = (0, a_1, a_2, \\ldots)\\). This is injective but not surjective. The left-shift \\(\\tau(a_1, a_2, a_3, \\ldots) = (a_2, a_3, \\ldots)\\) is surjective but not injective.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 2.2 (Derivative Operator)</div>
                    <div class="env-body">
                        <p>Consider the differentiation operator \\(D: P_n \\to P_{n-1}\\) defined by \\(D(p) = p'\\). We have:</p>
                        <ul>
                            <li>\\(\\dim(P_n) = n + 1\\)</li>
                            <li>\\(\\ker(D) = \\{\\text{constant polynomials}\\}\\), so \\(\\operatorname{null}(D) = 1\\)</li>
                            <li>By rank-nullity: \\(\\operatorname{rk}(D) = (n+1) - 1 = n = \\dim(P_{n-1})\\)</li>
                            <li>Therefore, \\(D\\) is surjective (onto \\(P_{n-1}\\)) but not injective</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'rank-nullity-balance',
                    title: 'Interactive: Rank-Nullity Balance',
                    description: 'Visualize the rank-nullity theorem as a balance: dim(V) = nullity + rank',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        let nullity = 1;
                        const dimV = 3;

                        const nullitySlider = VizEngine.createSlider(controls, 'nullity', 0, 3, 1, 1, draw);

                        function draw() {
                            nullity = parseInt(nullitySlider.value);
                            const rank = dimV - nullity;

                            viz.clear();

                            // Draw balance beam
                            viz.drawSegment(-5, 0, 5, 0, viz.colors.white, 4);
                            viz.drawSegment(0, 0, 0, -1, viz.colors.white, 4);

                            // Draw left side (nullity)
                            for (let i = 0; i < nullity; i++) {
                                viz.drawCircle(-3, 1 + i * 0.8, 0.3, viz.colors.red + '88', viz.colors.red);
                            }
                            viz.drawText(`nullity = ${nullity}`, -3, -1.5, viz.colors.red, 18, 'center');

                            // Draw right side (rank)
                            for (let i = 0; i < rank; i++) {
                                viz.drawCircle(3, 1 + i * 0.8, 0.3, viz.colors.green + '88', viz.colors.green);
                            }
                            viz.drawText(`rank = ${rank}`, 3, -1.5, viz.colors.green, 18, 'center');

                            // Draw total
                            viz.drawText(`dim(V) = ${dimV}`, 0, -2.5, viz.colors.blue, 20, 'center');

                            // Draw equation
                            viz.drawText(`${dimV} = ${nullity} + ${rank}`, 0, 4, viz.colors.text, 16, 'center');

                            // Explanation
                            const explanations = [
                                'All vectors map to non-zero (injective)',
                                `${nullity}D kernel, ${rank}D image`,
                                `${nullity}D kernel, ${rank}D image`,
                                'All vectors collapse to zero'
                            ];
                            viz.drawText(explanations[nullity], 0, 3.2, viz.colors.text, 14, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(\\tau: \\mathbb{R}^5 \\to \\mathbb{R}^3\\) be a linear transformation with \\(\\dim(\\ker(\\tau)) = 2\\). What is \\(\\dim(\\operatorname{im}(\\tau))\\)? Is \\(\\tau\\) surjective?',
                    hint: 'Use the rank-nullity theorem.',
                    solution: 'By rank-nullity, \\(5 = 2 + \\operatorname{rk}(\\tau)\\), so \\(\\operatorname{rk}(\\tau) = 3\\). Since \\(\\dim(\\operatorname{im}(\\tau)) = 3 = \\dim(\\mathbb{R}^3)\\), we have \\(\\operatorname{im}(\\tau) = \\mathbb{R}^3\\), so \\(\\tau\\) is surjective.'
                },
                {
                    question: 'Prove that if \\(\\tau: V \\to W\\) and \\(\\sigma: W \\to U\\) are linear transformations, then \\(\\operatorname{rk}(\\sigma \\circ \\tau) \\leq \\min(\\operatorname{rk}(\\tau), \\operatorname{rk}(\\sigma))\\).',
                    hint: 'The image of the composition is contained in the image of \\(\\sigma\\), and the composition can only map to things that \\(\\tau\\) reaches.',
                    solution: 'We have \\(\\operatorname{im}(\\sigma \\circ \\tau) = \\sigma(\\operatorname{im}(\\tau)) \\subseteq \\operatorname{im}(\\sigma)\\), so \\(\\operatorname{rk}(\\sigma \\circ \\tau) \\leq \\operatorname{rk}(\\sigma)\\). Also, since \\(\\sigma\\) is linear, \\(\\dim(\\sigma(\\operatorname{im}(\\tau))) \\leq \\dim(\\operatorname{im}(\\tau)) = \\operatorname{rk}(\\tau)\\).'
                },
                {
                    question: 'Let \\(\\tau: V \\to V\\) be a linear operator on a finite-dimensional space with \\(\\tau^2 = \\tau\\) (i.e., \\(\\tau\\) is idempotent). Prove that \\(\\dim(V) = \\dim(\\ker(\\tau)) + \\dim(\\operatorname{im}(\\tau))\\) and that \\(V = \\ker(\\tau) \\oplus \\operatorname{im}(\\tau)\\).',
                    hint: 'Show that \\(\\ker(\\tau) \\cap \\operatorname{im}(\\tau) = \\{0\\}\\) by considering what happens when \\(v \\in \\ker(\\tau) \\cap \\operatorname{im}(\\tau)\\).',
                    solution: 'The first part is just rank-nullity. For the direct sum, note that if \\(v \\in \\ker(\\tau) \\cap \\operatorname{im}(\\tau)\\), then \\(v = \\tau(u)\\) for some \\(u\\), and \\(0 = \\tau(v) = \\tau(\\tau(u)) = \\tau^2(u) = \\tau(u) = v\\). Any \\(v \\in V\\) can be written as \\(v = (v - \\tau(v)) + \\tau(v)\\) where \\(v - \\tau(v) \\in \\ker(\\tau)\\) (check: \\(\\tau(v - \\tau(v)) = \\tau(v) - \\tau^2(v) = 0\\)) and \\(\\tau(v) \\in \\operatorname{im}(\\tau)\\).'
                }
            ]
        },
        {
            id: 'ch02-sec04',
            title: 'Matrix Representations',
            content: `
                <h2>Matrix Representations</h2>

                <p>One of the most powerful ideas in linear algebra is that once bases are chosen, linear transformations can be represented by matrices, reducing abstract questions to concrete calculations.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 2.9 (Matrix Representation)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau: V \\to W\\) be a linear transformation, where \\(\\dim(V) = n\\) and \\(\\dim(W) = m\\). Let \\(\\mathcal{B} = \\{v_1, \\ldots, v_n\\}\\) be an ordered basis for \\(V\\) and \\(\\mathcal{C} = \\{w_1, \\ldots, w_m\\}\\) be an ordered basis for \\(W\\).</p>
                        <p>Then \\(\\tau\\) can be represented by an \\(m \\times n\\) matrix \\([\\tau]_{\\mathcal{B}}^{\\mathcal{C}}\\) whose \\(j\\)-th column is the coordinate vector \\([\\tau(v_j)]_{\\mathcal{C}}\\). That is:
                        \\[[\\tau]_{\\mathcal{B}}^{\\mathcal{C}} = \\begin{bmatrix} [\\tau(v_1)]_{\\mathcal{C}} & [\\tau(v_2)]_{\\mathcal{C}} & \\cdots & [\\tau(v_n)]_{\\mathcal{C}} \\end{bmatrix}\\]
                        </p>
                        <p>For any \\(v \\in V\\):
                        \\[[\\tau(v)]_{\\mathcal{C}} = [\\tau]_{\\mathcal{B}}^{\\mathcal{C}} [v]_{\\mathcal{B}}\\]
                        </p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Write \\(v = \\sum_{j=1}^{n} a_j v_j\\), so \\([v]_{\\mathcal{B}} = (a_1, \\ldots, a_n)^T\\). By linearity:
                        \\[\\tau(v) = \\sum_{j=1}^{n} a_j \\tau(v_j)\\]
                        Taking coordinate vectors with respect to \\(\\mathcal{C}\\):
                        \\[[\\tau(v)]_{\\mathcal{C}} = \\sum_{j=1}^{n} a_j [\\tau(v_j)]_{\\mathcal{C}}\\]
                        This is exactly the matrix-vector product \\([\\tau]_{\\mathcal{B}}^{\\mathcal{C}} [v]_{\\mathcal{B}}\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The matrix representation is built from "where do the basis vectors go?" Each column of the matrix records where one basis vector of \\(V\\) is sent, expressed in the coordinates of \\(W\\). This completely determines \\(\\tau\\) by linearity.</p>
                        <p>The standard matrix representation (using standard bases) is what we typically think of as "the matrix" of a transformation. But the same transformation looks different in different bases—much like how the same point has different coordinates in different coordinate systems.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="matrix-representation"></div>

                <div class="env-block example">
                    <div class="env-title">Example 2.3 (Rotation Matrix)</div>
                    <div class="env-body">
                        <p>Consider the counterclockwise rotation \\(R_{\\theta}: \\mathbb{R}^2 \\to \\mathbb{R}^2\\) by angle \\(\\theta\\). Using the standard basis \\(\\mathcal{E} = \\{e_1, e_2\\}\\):</p>
                        <ul>
                            <li>\\(R_{\\theta}(e_1) = (\\cos\\theta, \\sin\\theta)\\)</li>
                            <li>\\(R_{\\theta}(e_2) = (-\\sin\\theta, \\cos\\theta)\\)</li>
                        </ul>
                        <p>Therefore:
                        \\[[R_{\\theta}]_{\\mathcal{E}}^{\\mathcal{E}} = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}\\]
                        </p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 2.10 (Composition and Matrix Multiplication)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau: U \\to V\\) and \\(\\sigma: V \\to W\\) be linear transformations, with ordered bases \\(\\mathcal{A}\\), \\(\\mathcal{B}\\), \\(\\mathcal{C}\\) for \\(U\\), \\(V\\), \\(W\\) respectively. Then:
                        \\[[\\sigma \\circ \\tau]_{\\mathcal{A}}^{\\mathcal{C}} = [\\sigma]_{\\mathcal{B}}^{\\mathcal{C}} [\\tau]_{\\mathcal{A}}^{\\mathcal{B}}\\]
                        </p>
                        <p>In words: the matrix of the composition is the product of the matrices.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>For any \\(u \\in U\\):
                        \\[[\\sigma(\\tau(u))]_{\\mathcal{C}} = [\\sigma]_{\\mathcal{B}}^{\\mathcal{C}} [\\tau(u)]_{\\mathcal{B}} = [\\sigma]_{\\mathcal{B}}^{\\mathcal{C}} [\\tau]_{\\mathcal{A}}^{\\mathcal{B}} [u]_{\\mathcal{A}}\\]
                        Since this holds for all \\(u\\), the matrices must be equal.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>This theorem is the <em>reason</em> matrix multiplication is defined the way it is! The definition of matrix multiplication is precisely engineered so that "matrix of composition = product of matrices."</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 2.11 (Vector Space Isomorphism)</div>
                    <div class="env-body">
                        <p>Let \\(V\\) and \\(W\\) be finite-dimensional vector spaces with \\(\\dim(V) = n\\) and \\(\\dim(W) = m\\). Fix ordered bases \\(\\mathcal{B}\\) and \\(\\mathcal{C}\\). The map:
                        \\[\\Phi: \\mathcal{L}(V, W) \\to M_{m \\times n}(F), \\quad \\Phi(\\tau) = [\\tau]_{\\mathcal{B}}^{\\mathcal{C}}\\]
                        is an isomorphism of vector spaces. Therefore:
                        \\[\\mathcal{L}(V, W) \\cong M_{m \\times n}(F)\\]
                        and \\(\\dim(\\mathcal{L}(V, W)) = mn\\).
                        </p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'matrix-representation',
                    title: 'Interactive: Matrix Representation in Different Bases',
                    description: 'See how the same linear transformation has different matrix representations in different bases',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        // Standard basis vectors
                        const e1 = {x: 1, y: 0};
                        const e2 = {x: 0, y: 1};

                        // Custom basis (draggable)
                        const b1 = viz.addDraggable('b1', 1, 0.5, viz.colors.blue, 8, draw);
                        const b2 = viz.addDraggable('b2', 0.5, 1, viz.colors.orange, 8, draw);

                        // Fixed transformation matrix in standard basis
                        const T_standard = [[1.5, 0.5], [0.5, 1]];

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Check if custom basis is valid (non-zero determinant)
                            const B = [[b1.x, b2.x], [b1.y, b2.y]];
                            const det = VizEngine.det2(B);

                            if (Math.abs(det) < 0.01) {
                                viz.drawText('Basis vectors must be linearly independent!', 0, 0, viz.colors.red, 14, 'center');
                                viz.drawDraggables();
                                return;
                            }

                            // Draw custom basis
                            viz.drawVector(0, 0, b1.x, b1.y, viz.colors.blue, 'b₁', 2);
                            viz.drawVector(0, 0, b2.x, b2.y, viz.colors.orange, 'b₂', 2);

                            // Apply transformation to custom basis vectors
                            const Tb1 = VizEngine.matVec(T_standard, [b1.x, b1.y]);
                            const Tb2 = VizEngine.matVec(T_standard, [b2.x, b2.y]);

                            viz.drawVector(0, 0, Tb1[0], Tb1[1], viz.colors.blue + 'aa', 'T(b₁)', 2, true);
                            viz.drawVector(0, 0, Tb2[0], Tb2[1], viz.colors.orange + 'aa', 'T(b₂)', 2, true);

                            // Compute change of basis matrix
                            // B^{-1} = (1/det) * [[d, -b], [-c, a]]
                            const invDet = 1 / det;
                            const B_inv = [[B[1][1] * invDet, -B[0][1] * invDet],
                                          [-B[1][0] * invDet, B[0][0] * invDet]];

                            // Matrix in custom basis: [T]_B = B^{-1} T B
                            const TB_temp = VizEngine.matMul(T_standard, B);
                            const T_custom = VizEngine.matMul(B_inv, TB_temp);

                            // Display matrices
                            viz.drawText('[T] in standard basis:', -6.5, 4.5, viz.colors.text, 12);
                            viz.drawText(`[${T_standard[0][0].toFixed(1)}, ${T_standard[0][1].toFixed(1)}]`, -6.5, 3.9, viz.colors.text, 11);
                            viz.drawText(`[${T_standard[1][0].toFixed(1)}, ${T_standard[1][1].toFixed(1)}]`, -6.5, 3.4, viz.colors.text, 11);

                            viz.drawText('[T] in custom basis:', -6.5, 2.5, viz.colors.green, 12);
                            viz.drawText(`[${T_custom[0][0].toFixed(2)}, ${T_custom[0][1].toFixed(2)}]`, -6.5, 1.9, viz.colors.green, 11);
                            viz.drawText(`[${T_custom[1][0].toFixed(2)}, ${T_custom[1][1].toFixed(2)}]`, -6.5, 1.4, viz.colors.green, 11);

                            viz.drawDraggables();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(\\tau: \\mathbb{R}^2 \\to \\mathbb{R}^2\\) be reflection across the line \\(y = x\\). Find the matrix representation \\([\\tau]_{\\mathcal{E}}\\) with respect to the standard basis.',
                    hint: 'Where does \\((1, 0)\\) go? Where does \\((0, 1)\\) go?',
                    solution: '\\(\\tau(1, 0) = (0, 1)\\) and \\(\\tau(0, 1) = (1, 0)\\), so \\([\\tau]_{\\mathcal{E}} = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}\\).'
                },
                {
                    question: 'Let \\(D: P_3 \\to P_2\\) be the differentiation operator. Find \\([D]_{\\mathcal{B}}^{\\mathcal{C}}\\) where \\(\\mathcal{B} = \\{1, x, x^2, x^3\\}\\) and \\(\\mathcal{C} = \\{1, x, x^2\\}\\).',
                    hint: 'Differentiate each basis vector of \\(\\mathcal{B}\\) and express in terms of \\(\\mathcal{C}\\).',
                    solution: '\\(D(1) = 0\\), \\(D(x) = 1\\), \\(D(x^2) = 2x\\), \\(D(x^3) = 3x^2\\), so \\([D]_{\\mathcal{B}}^{\\mathcal{C}} = \\begin{bmatrix} 0 & 1 & 0 & 0 \\\\ 0 & 0 & 2 & 0 \\\\ 0 & 0 & 0 & 3 \\end{bmatrix}\\).'
                },
                {
                    question: 'Prove that if \\(\\tau: V \\to V\\) is an isomorphism and \\(A = [\\tau]_{\\mathcal{B}}\\) for some basis \\(\\mathcal{B}\\), then \\([\\tau^{-1}]_{\\mathcal{B}} = A^{-1}\\).',
                    hint: 'Use the fact that \\([\\tau \\circ \\tau^{-1}]_{\\mathcal{B}} = [\\text{id}]_{\\mathcal{B}} = I\\).',
                    solution: 'By Theorem 2.10, \\([\\tau^{-1}]_{\\mathcal{B}} [\\tau]_{\\mathcal{B}} = [\\tau^{-1} \\circ \\tau]_{\\mathcal{B}} = [\\text{id}]_{\\mathcal{B}} = I\\). Therefore \\([\\tau^{-1}]_{\\mathcal{B}}\\) is the inverse of \\(A = [\\tau]_{\\mathcal{B}}\\).'
                }
            ]
        },
        {
            id: 'ch02-sec05',
            title: 'Change of Basis',
            content: `
                <h2>Change of Basis</h2>

                <p>The same linear transformation looks different in different bases. Understanding how matrix representations change when we change bases is crucial for finding the "best" representation of a transformation.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 2.4 (Change of Basis Matrix)</div>
                    <div class="env-body">
                        <p>Let \\(\\mathcal{B} = \\{v_1, \\ldots, v_n\\}\\) and \\(\\mathcal{B}' = \\{v_1', \\ldots, v_n'\\}\\) be two ordered bases for a vector space \\(V\\). The <strong>change of basis matrix</strong> from \\(\\mathcal{B}\\) to \\(\\mathcal{B}'\\) is:
                        \\[P_{\\mathcal{B} \\to \\mathcal{B}'} = \\begin{bmatrix} [v_1]_{\\mathcal{B}'} & [v_2]_{\\mathcal{B}'} & \\cdots & [v_n]_{\\mathcal{B}'} \\end{bmatrix}\\]
                        </p>
                        <p>This matrix satisfies:
                        \\[[v]_{\\mathcal{B}'} = P_{\\mathcal{B} \\to \\mathcal{B}'} [v]_{\\mathcal{B}}\\]
                        for all \\(v \\in V\\).
                        </p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 2.12 (Properties of Change of Basis Matrices)</div>
                    <div class="env-body">
                        <ol>
                            <li>\\(P_{\\mathcal{B} \\to \\mathcal{B}'}\\) is invertible, and \\((P_{\\mathcal{B} \\to \\mathcal{B}'})^{-1} = P_{\\mathcal{B}' \\to \\mathcal{B}}\\)</li>
                            <li>If \\(\\mathcal{B}\\), \\(\\mathcal{B}'\\), \\(\\mathcal{B}''\\) are three bases for \\(V\\), then:
                            \\[P_{\\mathcal{B} \\to \\mathcal{B}''} = P_{\\mathcal{B}' \\to \\mathcal{B}''} P_{\\mathcal{B} \\to \\mathcal{B}'}\\]
                            </li>
                        </ol>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>(1)</strong> The columns of \\(P_{\\mathcal{B} \\to \\mathcal{B}'}\\) form a basis (when written in \\(\\mathcal{B}'\\) coordinates), so the matrix has full rank and is invertible. For any \\(v \\in V\\):
                        \\[[v]_{\\mathcal{B}} = P_{\\mathcal{B}' \\to \\mathcal{B}} [v]_{\\mathcal{B}'} = P_{\\mathcal{B}' \\to \\mathcal{B}} P_{\\mathcal{B} \\to \\mathcal{B}'} [v]_{\\mathcal{B}}\\]
                        Since \\([v]_{\\mathcal{B}} = I [v]_{\\mathcal{B}}\\), we have \\(P_{\\mathcal{B}' \\to \\mathcal{B}} P_{\\mathcal{B} \\to \\mathcal{B}'} = I\\).</p>
                        <p><strong>(2)</strong> For any \\(v \\in V\\):
                        \\[[v]_{\\mathcal{B}''} = P_{\\mathcal{B}' \\to \\mathcal{B}''} [v]_{\\mathcal{B}'} = P_{\\mathcal{B}' \\to \\mathcal{B}''} P_{\\mathcal{B} \\to \\mathcal{B}'} [v]_{\\mathcal{B}}\\]
                        </p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="change-of-basis-animation"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 2.13 (Change of Basis for Linear Transformations)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau: V \\to W\\) be a linear transformation, and let \\(\\mathcal{B}\\), \\(\\mathcal{B}'\\) be bases for \\(V\\) and \\(\\mathcal{C}\\), \\(\\mathcal{C}'\\) be bases for \\(W\\). Then:
                        \\[[\\tau]_{\\mathcal{B}'}^{\\mathcal{C}'} = P_{\\mathcal{C} \\to \\mathcal{C}'} [\\tau]_{\\mathcal{B}}^{\\mathcal{C}} P_{\\mathcal{B}' \\to \\mathcal{B}}\\]
                        or equivalently:
                        \\[[\\tau]_{\\mathcal{B}'}^{\\mathcal{C}'} = P_{\\mathcal{C} \\to \\mathcal{C}'} [\\tau]_{\\mathcal{B}}^{\\mathcal{C}} (P_{\\mathcal{B} \\to \\mathcal{B}'})^{-1}\\]
                        </p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>To convert the matrix representation from one pair of bases to another, we follow this sequence:</p>
                        <ol>
                            <li>Convert input coordinates from \\(\\mathcal{B}'\\) to \\(\\mathcal{B}\\) (multiply by \\(P_{\\mathcal{B}' \\to \\mathcal{B}}\\))</li>
                            <li>Apply the transformation (multiply by \\([\\tau]_{\\mathcal{B}}^{\\mathcal{C}}\\))</li>
                            <li>Convert output coordinates from \\(\\mathcal{C}\\) to \\(\\mathcal{C}'\\) (multiply by \\(P_{\\mathcal{C} \\to \\mathcal{C}'}\\))</li>
                        </ol>
                        <p>This is the famous "similarity transformation" formula when \\(V = W\\) and \\(\\mathcal{B}' = \\mathcal{C}'\\).</p>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 2.14 (Similarity for Operators)</div>
                    <div class="env-body">
                        <p>Let \\(\\tau: V \\to V\\) be a linear operator, and let \\(\\mathcal{B}\\) and \\(\\mathcal{B}'\\) be two bases for \\(V\\). Then:
                        \\[[\\tau]_{\\mathcal{B}'} = P [\\tau]_{\\mathcal{B}} P^{-1}\\]
                        where \\(P = P_{\\mathcal{B} \\to \\mathcal{B}'}\\).
                        </p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 2.4 (Diagonalization Preview)</div>
                    <div class="env-body">
                        <p>Consider \\(\\tau: \\mathbb{R}^2 \\to \\mathbb{R}^2\\) with standard matrix:
                        \\[A = \\begin{bmatrix} 3 & 1 \\\\ 1 & 3 \\end{bmatrix}\\]
                        </p>
                        <p>If we use the basis \\(\\mathcal{B}' = \\{(1, 1), (1, -1)\\}\\) (eigenvectors!), the matrix becomes:
                        \\[[\\tau]_{\\mathcal{B}'} = \\begin{bmatrix} 4 & 0 \\\\ 0 & 2 \\end{bmatrix}\\]
                        </p>
                        <p>This diagonal form is much simpler and reveals that \\(\\tau\\) is just scaling by 4 along one direction and by 2 along another.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'change-of-basis-animation',
                    title: 'Interactive: Change of Basis Visualization',
                    description: 'See how coordinate vectors change when switching between bases',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        // Standard basis
                        const e1 = {x: 1, y: 0};
                        const e2 = {x: 0, y: 1};

                        // Custom basis (draggable)
                        const b1 = viz.addDraggable('b1', 2, 0.5, viz.colors.blue, 8, draw);
                        const b2 = viz.addDraggable('b2', 0.5, 1.5, viz.colors.orange, 8, draw);

                        // A vector in the space
                        const v = viz.addDraggable('v', 3, 2, viz.colors.purple, 10, draw);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Check if custom basis is valid
                            const det = b1.x * b2.y - b1.y * b2.x;

                            if (Math.abs(det) < 0.01) {
                                viz.drawText('Basis vectors must be independent!', 0, 0, viz.colors.red, 14, 'center');
                                viz.drawDraggables();
                                return;
                            }

                            // Draw standard basis (light)
                            viz.drawVector(0, 0, 1, 0, viz.colors.text + '44', 'e₁', 1);
                            viz.drawVector(0, 0, 0, 1, viz.colors.text + '44', 'e₂', 1);

                            // Draw custom basis
                            viz.drawVector(0, 0, b1.x, b1.y, viz.colors.blue, 'b₁', 2);
                            viz.drawVector(0, 0, b2.x, b2.y, viz.colors.orange, 'b₂', 2);

                            // Draw the vector v
                            viz.drawVector(0, 0, v.x, v.y, viz.colors.purple, 'v', 3);

                            // Compute coordinates in standard basis (trivial)
                            const coords_std = [v.x, v.y];

                            // Compute coordinates in custom basis
                            // Solve: c1 * b1 + c2 * b2 = v
                            // [b1 b2] [c1; c2] = [v.x; v.y]
                            const invDet = 1 / det;
                            const c1 = invDet * (b2.y * v.x - b2.x * v.y);
                            const c2 = invDet * (-b1.y * v.x + b1.x * v.y);

                            // Draw the parallelogram decomposition
                            viz.drawVector(0, 0, c1 * b1.x, c1 * b1.y, viz.colors.blue + '66', '', 1, true);
                            viz.drawVector(c1 * b1.x, c1 * b1.y, v.x, v.y, viz.colors.orange + '66', '', 1, true);

                            // Display coordinates
                            viz.drawText('In standard basis:', -6.5, 4.5, viz.colors.text, 12);
                            viz.drawText(`[v] = [${coords_std[0].toFixed(2)}, ${coords_std[1].toFixed(2)}]ᵀ`, -6.5, 3.9, viz.colors.text, 12);

                            viz.drawText('In custom basis:', -6.5, 2.8, viz.colors.green, 12);
                            viz.drawText(`[v]ʙ = [${c1.toFixed(2)}, ${c2.toFixed(2)}]ᵀ`, -6.5, 2.2, viz.colors.green, 12);

                            viz.drawText(`v = ${c1.toFixed(2)}b₁ + ${c2.toFixed(2)}b₂`, -6.5, 1.3, viz.colors.text, 11);

                            viz.drawDraggables();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(\\mathcal{B} = \\{(1,0), (0,1)\\}\\) and \\(\\mathcal{B}^{\\prime} = \\{(1,1), (1,-1)\\}\\) be bases for \\(\\mathbb{R}^2\\). Find \\(P_{\\mathcal{B} \\to \\mathcal{B}^{\\prime}}\\) and verify that it is invertible.',
                    hint: 'Express each vector of \\(\\mathcal{B}\\) in terms of \\(\\mathcal{B}^{\\prime}\\) coordinates.',
                    solution: '\\((1,0) = \\frac{1}{2}(1,1) + \\frac{1}{2}(1,-1)\\) and \\((0,1) = \\frac{1}{2}(1,1) - \\frac{1}{2}(1,-1)\\), so \\(P = \\begin{bmatrix} 1/2 & 1/2 \\\\ 1/2 & -1/2 \\end{bmatrix}\\). Indeed, \\(\\det(P) = -1/2 \\neq 0\\).'
                },
                {
                    question: 'If \\(A\\) and \\(B\\) represent the same linear operator in different bases, show that \\(A\\) and \\(B\\) have the same determinant.',
                    hint: 'Use \\(B = PAP^{-1}\\) and properties of determinants.',
                    solution: 'If \\(B = PAP^{-1}\\), then \\(\\det(B) = \\det(P)\\det(A)\\det(P^{-1}) = \\det(P) \\cdot \\det(P^{-1}) \\cdot \\det(A) = \\det(PP^{-1}) \\det(A) = \\det(A)\\).'
                },
                {
                    question: 'Prove that if \\(\\tau: V \\to V\\) has matrix \\(A\\) in basis \\(\\mathcal{B}\\) and \\(A\\) is diagonal, then the basis vectors are eigenvectors of \\(\\tau\\).',
                    hint: 'If \\(A = \\text{diag}(\\lambda_1, \\ldots, \\lambda_n)\\), what is \\(\\tau(v_i)\\)?',
                    solution: 'If \\([\\tau]_{\\mathcal{B}} = \\text{diag}(\\lambda_1, \\ldots, \\lambda_n)\\) where \\(\\mathcal{B} = \\{v_1, \\ldots, v_n\\}\\), then \\([\\tau(v_i)]_{\\mathcal{B}}\\) is the \\(i\\)-th column of the matrix, which is \\((0, \\ldots, 0, \\lambda_i, 0, \\ldots, 0)^T\\). This means \\(\\tau(v_i) = \\lambda_i v_i\\), so \\(v_i\\) is an eigenvector with eigenvalue \\(\\lambda_i\\).'
                }
            ]
        },
        {
            id: 'ch02-sec06',
            title: 'Similarity and the Algebra of Linear Operators',
            content: `
                <h2>Similarity and the Algebra of Linear Operators</h2>

                <p>We now formalize the notion of similarity and explore the algebraic structure of the set of all linear operators on a vector space.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 2.5 (Similar Matrices)</div>
                    <div class="env-body">
                        <p>Two \\(n \\times n\\) matrices \\(A\\) and \\(B\\) are <strong>similar</strong>, written \\(A \\sim B\\), if there exists an invertible matrix \\(P\\) such that:
                        \\[B = P^{-1} A P\\]
                        </p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 2.15</div>
                    <div class="env-body">
                        <p>Similarity is an equivalence relation on the set of \\(n \\times n\\) matrices.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>Reflexive:</strong> \\(A = I^{-1} A I\\), so \\(A \\sim A\\).</p>
                        <p><strong>Symmetric:</strong> If \\(B = P^{-1} A P\\), then \\(A = P B P^{-1} = (P^{-1})^{-1} B P^{-1}\\), so \\(B \\sim A\\) implies \\(A \\sim B\\).</p>
                        <p><strong>Transitive:</strong> If \\(B = P^{-1} A P\\) and \\(C = Q^{-1} B Q\\), then:
                        \\[C = Q^{-1} P^{-1} A P Q = (PQ)^{-1} A (PQ)\\]
                        so \\(A \\sim B\\) and \\(B \\sim C\\) implies \\(A \\sim C\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 2.16 (Invariants of Similarity)</div>
                    <div class="env-body">
                        <p>If \\(A\\) and \\(B\\) are similar matrices, then they share the following properties:</p>
                        <ol>
                            <li>Determinant: \\(\\det(A) = \\det(B)\\)</li>
                            <li>Trace: \\(\\text{tr}(A) = \\text{tr}(B)\\)</li>
                            <li>Rank: \\(\\text{rank}(A) = \\text{rank}(B)\\)</li>
                            <li>Characteristic polynomial: \\(\\det(\\lambda I - A) = \\det(\\lambda I - B)\\)</li>
                            <li>Eigenvalues (with multiplicities)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Similar matrices represent the same linear operator in different coordinate systems. The properties listed above are intrinsic to the operator—they don't depend on the choice of basis. These are the "invariants" of the transformation.</p>
                        <p>The grand goal of much of linear algebra is to find the "simplest" representative in each similarity class—this leads to Jordan normal form, which we'll study in Chapter 7.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 2.17 (The Algebra \\(\\mathcal{L}(V)\\))</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be a vector space over \\(F\\). The set \\(\\mathcal{L}(V)\\) of all linear operators on \\(V\\), equipped with:</p>
                        <ul>
                            <li>Addition: \\((\\tau + \\sigma)(v) = \\tau(v) + \\sigma(v)\\)</li>
                            <li>Scalar multiplication: \\((a\\tau)(v) = a(\\tau(v))\\)</li>
                            <li>Composition: \\((\\tau \\circ \\sigma)(v) = \\tau(\\sigma(v))\\)</li>
                        </ul>
                        <p>forms an <strong>associative algebra</strong> over \\(F\\) with identity (the identity map \\(\\iota\\)).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 2.6 (Key Subsets of \\(\\mathcal{L}(V)\\))</div>
                    <div class="env-body">
                        <p>Let \\(V\\) be a vector space.</p>
                        <ul>
                            <li>\\(\\text{GL}(V)\\) = the set of all invertible linear operators (the <strong>general linear group</strong>)</li>
                            <li>For \\(\\tau \\in \\mathcal{L}(V)\\), the <strong>centralizer</strong> of \\(\\tau\\) is:
                            \\[C(\\tau) = \\{\\sigma \\in \\mathcal{L}(V) : \\sigma \\tau = \\tau \\sigma\\}\\]
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 2.18</div>
                    <div class="env-body">
                        <p>For any \\(\\tau \\in \\mathcal{L}(V)\\), the centralizer \\(C(\\tau)\\) is a subalgebra of \\(\\mathcal{L}(V)\\) containing the identity.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 2.5 (Centralizer of Identity)</div>
                    <div class="env-body">
                        <p>The centralizer of the identity operator \\(\\iota\\) is all of \\(\\mathcal{L}(V)\\), since every operator commutes with \\(\\iota\\):
                        \\[C(\\iota) = \\mathcal{L}(V)\\]
                        </p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 2.6 (Scalar Operators)</div>
                    <div class="env-body">
                        <p>An operator of the form \\(\\tau = \\lambda \\iota\\) (multiplication by a scalar) commutes with every operator. Conversely, if \\(\\tau\\) commutes with all operators, then \\(\\tau\\) must be a scalar operator. This is a special case of <strong>Schur's lemma</strong>.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Looking Ahead)</div>
                    <div class="env-body">
                        <p>The study of linear operators naturally leads to several deep questions:</p>
                        <ul>
                            <li><strong>Eigenvalue theory:</strong> When can we find bases that diagonalize an operator? (Chapter 6)</li>
                            <li><strong>Jordan form:</strong> What is the simplest form every operator can be put into? (Chapter 7)</li>
                            <li><strong>Inner products:</strong> What additional structure emerges when \\(V\\) has an inner product? (Chapters 9-10)</li>
                            <li><strong>Decomposition theorems:</strong> How can we break operators into simpler pieces? (Throughout)</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Prove that if \\(A\\) and \\(B\\) are similar \\(n \\times n\\) matrices, then \\(A^k\\) and \\(B^k\\) are similar for any positive integer \\(k\\).',
                    hint: 'If \\(B = P^{-1}AP\\), compute \\(B^k\\).',
                    solution: 'If \\(B = P^{-1}AP\\), then \\(B^2 = (P^{-1}AP)(P^{-1}AP) = P^{-1}A^2P\\), and by induction, \\(B^k = P^{-1}A^kP\\) for all \\(k \\geq 1\\).'
                },
                {
                    question: 'Show that the trace is well-defined on operators: if \\([\\tau]_{\\mathcal{B}}\\) and \\([\\tau]_{\\mathcal{B}^{\\prime}}\\) are two matrix representations of the same operator \\(\\tau\\), they have the same trace.',
                    hint: 'Use the fact that \\(\\text{tr}(AB) = \\text{tr}(BA)\\) and that the matrices are similar.',
                    solution: 'We have \\([\\tau]_{\\mathcal{B}^{\\prime}}  = P^{-1}[\\tau]_{\\mathcal{B}}P\\) for some invertible \\(P\\). Then \\(\\text{tr}([\\tau]_{\\mathcal{B}^{\\prime}}) = \\text{tr}(P^{-1}[\\tau]_{\\mathcal{B}}P) = \\text{tr}([\\tau]_{\\mathcal{B}}PP^{-1}) = \\text{tr}([\\tau]_{\\mathcal{B}})\\).'
                },
                {
                    question: 'Let \\(V\\) be finite-dimensional. Prove that \\(\\tau \\in \\mathcal{L}(V)\\) is invertible if and only if \\(\\ker(\\tau) = \\{0\\}\\) if and only if \\(\\operatorname{im}(\\tau) = V\\).',
                    hint: 'Use the rank-nullity theorem and the equivalence of injectivity/surjectivity for endomorphisms of finite-dimensional spaces.',
                    solution: 'By Corollary 2.8, for an endomorphism of a finite-dimensional space, injective \\(\\iff\\) surjective \\(\\iff\\) bijective. By Theorem 2.4, \\(\\tau\\) is injective iff \\(\\ker(\\tau) = \\{0\\}\\) and surjective iff \\(\\operatorname{im}(\\tau) = V\\). A bijective linear map has a linear inverse (verify this!), so all three conditions are equivalent to invertibility.'
                }
            ]
        }
    ]
});
