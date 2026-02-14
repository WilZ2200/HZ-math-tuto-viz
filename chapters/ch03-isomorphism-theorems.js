window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch03',
    number: 3,
    title: 'The Isomorphism Theorems',
    subtitle: 'Quotient spaces, canonical projections, and the fundamental isomorphism theorems',
    sections: [
        {
            id: 'ch03-sec01',
            title: 'Quotient Spaces and Cosets',
            content: `
                <h2>Quotient Spaces and Cosets</h2>

                <p>The concept of a quotient space is one of the most powerful constructions in linear algebra. Given a vector space \\(V\\) and a subspace \\(S\\), we can form a new vector space \\(V/S\\) whose elements are <em>cosets</em> of \\(S\\) in \\(V\\). This construction allows us to "collapse" \\(S\\) to a single point while preserving the vector space structure.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 3.1 (Cosets)</div>
                    <div class="env-body">
                        <p>Let \\(S\\) be a subspace of a vector space \\(V\\). For any vector \\(v \\in V\\), the <strong>coset of \\(S\\) containing \\(v\\)</strong> is the set</p>
                        \\[v + S = \\{v + s \\mid s \\in S\\}\\]
                        <p>Two vectors \\(v, w \\in V\\) belong to the same coset if and only if \\(v - w \\in S\\).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Think of cosets as parallel copies of the subspace \\(S\\) translated by different vectors. In \\(\\mathbb{R}^3\\), if \\(S\\) is a plane through the origin, then \\(v + S\\) is a parallel plane passing through the point \\(v\\). All points on this parallel plane form a single coset.</p>
                        <p>The key insight: two vectors are in the same coset if and only if they differ by an element of \\(S\\). This creates an equivalence relation that partitions \\(V\\) into disjoint parallel copies of \\(S\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="coset-viz"></div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 3.2 (Coset Equivalence)</div>
                    <div class="env-body">
                        <p>The relation \\(v \\sim w\\) if and only if \\(v - w \\in S\\) is an equivalence relation on \\(V\\). The equivalence classes are precisely the cosets of \\(S\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>Reflexive:</strong> \\(v - v = 0 \\in S\\), so \\(v \\sim v\\).</p>
                        <p><strong>Symmetric:</strong> If \\(v - w \\in S\\), then \\(w - v = -(v - w) \\in S\\) since \\(S\\) is a subspace.</p>
                        <p><strong>Transitive:</strong> If \\(v - w \\in S\\) and \\(w - u \\in S\\), then \\(v - u = (v - w) + (w - u) \\in S\\).</p>
                        <p>The equivalence class of \\(v\\) is \\(\\{w \\in V \\mid w - v \\in S\\} = v + S\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 3.3 (Quotient Space)</div>
                    <div class="env-body">
                        <p>The <strong>quotient space</strong> \\(V/S\\) is the set of all cosets of \\(S\\) in \\(V\\), equipped with the operations:</p>
                        \\[(v + S) + (w + S) = (v + w) + S\\]
                        \\[c(v + S) = cv + S\\]
                        <p>for \\(v, w \\in V\\) and \\(c\\) in the base field \\(F\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.4 (Well-Definedness of Quotient Operations)</div>
                    <div class="env-body">
                        <p>The operations of addition and scalar multiplication on \\(V/S\\) are well-defined, making \\(V/S\\) a vector space over \\(F\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>We must show the operations don't depend on the choice of coset representatives. Suppose \\(v + S = v' + S\\) and \\(w + S = w' + S\\). Then \\(v - v' \\in S\\) and \\(w - w' \\in S\\).</p>
                        <p>For addition: \\((v + w) - (v' + w') = (v - v') + (w - w') \\in S\\), so \\((v + w) + S = (v' + w') + S\\).</p>
                        <p>For scalar multiplication: \\(cv - cv' = c(v - v') \\in S\\), so \\(cv + S = cv' + S\\).</p>
                        <p>Verification of the vector space axioms is straightforward, with the zero vector being \\(0 + S = S\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 3.5</div>
                    <div class="env-body">
                        <p>Let \\(V = \\mathbb{R}^3\\) and \\(S = \\{(x, y, 0) \\mid x, y \\in \\mathbb{R}\\}\\) (the \\(xy\\)-plane). The quotient space \\(V/S\\) consists of all horizontal planes in \\(\\mathbb{R}^3\\). Each plane is determined by its \\(z\\)-coordinate, so \\(V/S \\cong \\mathbb{R}\\).</p>
                        <p>For instance, the coset \\((0, 0, 5) + S\\) represents all points with \\(z = 5\\), regardless of \\(x\\) and \\(y\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'coset-viz',
                    title: 'Interactive: Cosets as Parallel Subspaces',
                    description: 'Drag the vector v to see different cosets v + S as parallel lines',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

                        // Define the subspace S as span of (1, 0.5)
                        const sVec = {x: 2, y: 1};

                        const v = viz.addDraggable('v', 1, 2, viz.colors.orange, 8, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw the subspace S (line through origin)
                            viz.drawLine(0, 0, sVec.x, sVec.y, viz.colors.blue + '88', 2);
                            viz.drawText('S', sVec.x * 2.5, sVec.y * 2.5, viz.colors.blue, 16);

                            // Draw several vectors in S
                            for (let t = -2; t <= 2; t += 0.5) {
                                const sx = t * sVec.x;
                                const sy = t * sVec.y;
                                viz.drawPoint(sx, sy, viz.colors.blue + '66', null, 3);
                            }

                            // Draw the coset v + S (parallel line through v)
                            viz.drawLine(v.x, v.y, v.x + sVec.x, v.y + sVec.y, viz.colors.orange + '88', 2);
                            viz.drawText('v + S', v.x + sVec.x * 2, v.y + sVec.y * 2, viz.colors.orange, 16);

                            // Draw several vectors in v + S
                            for (let t = -2; t <= 2; t += 0.5) {
                                const cx = v.x + t * sVec.x;
                                const cy = v.y + t * sVec.y;
                                viz.drawPoint(cx, cy, viz.colors.orange + '66', null, 3);
                            }

                            // Draw v
                            viz.drawVector(0, 0, v.x, v.y, viz.colors.orange, 'v', 2);

                            // Draw perpendicular from origin to coset line (shortest distance)
                            const perpX = v.x - (v.x * sVec.x + v.y * sVec.y) / (sVec.x * sVec.x + sVec.y * sVec.y) * sVec.x;
                            const perpY = v.y - (v.x * sVec.x + v.y * sVec.y) / (sVec.x * sVec.x + sVec.y * sVec.y) * sVec.y;
                            viz.drawSegment(0, 0, perpX, perpY, viz.colors.teal + '88', 2, true);

                            viz.drawDraggables();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(V = \\mathbb{R}^4\\) and \\(S = \\operatorname{span}\\{(1,0,1,0), (0,1,0,1)\\}\\). Find a basis for \\(V/S\\) and determine \\(\\dim(V/S)\\).',
                    hint: 'Extend a basis of \\(S\\) to a basis of \\(V\\). The additional vectors correspond to a basis of \\(V/S\\).',
                    solution: 'A basis for \\(S\\) is \\(\\{(1,0,1,0), (0,1,0,1)\\}\\), so \\(\\dim(S) = 2\\). We can extend this to a basis of \\(V\\): \\(\\{(1,0,1,0), (0,1,0,1), (1,0,0,0), (0,1,0,0)\\}\\). The cosets \\((1,0,0,0) + S\\) and \\((0,1,0,0) + S\\) form a basis for \\(V/S\\), so \\(\\dim(V/S) = 4 - 2 = 2\\).'
                },
                {
                    question: 'Prove that if \\(v + S = w + S\\), then \\(v - w \\in S\\).',
                    hint: 'Use the fact that \\(0 \\in S\\) and \\(w \\in w + S\\).',
                    solution: 'If \\(v + S = w + S\\), then \\(v \\in w + S\\), so \\(v = w + s\\) for some \\(s \\in S\\). Therefore \\(v - w = s \\in S\\).'
                },
                {
                    question: 'Show that the zero vector in \\(V/S\\) is the coset \\(S\\) itself.',
                    hint: 'The zero vector of \\(V/S\\) is \\(0 + S\\). What is this set?',
                    solution: 'The zero vector of \\(V/S\\) is \\(0 + S = \\{0 + s \\mid s \\in S\\} = S\\). This is the coset containing the origin.'
                }
            ]
        },
        {
            id: 'ch03-sec02',
            title: 'The Canonical Projection and Dimension Formula',
            content: `
                <h2>The Canonical Projection and Dimension Formula</h2>

                <p>Every quotient space comes equipped with a natural linear transformation called the canonical projection, which maps each vector to its coset.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 3.6 (Canonical Projection)</div>
                    <div class="env-body">
                        <p>Let \\(S\\) be a subspace of \\(V\\). The <strong>canonical projection</strong> (or <strong>quotient map</strong>) is the linear transformation \\(\\pi_S: V \\to V/S\\) defined by</p>
                        \\[\\pi_S(v) = v + S\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.7 (Properties of the Canonical Projection)</div>
                    <div class="env-body">
                        <p>The canonical projection \\(\\pi_S: V \\to V/S\\) is a surjective linear transformation with \\(\\ker(\\pi_S) = S\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>Linearity:</strong> For \\(v, w \\in V\\) and \\(c \\in F\\):</p>
                        \\[\\pi_S(v + w) = (v + w) + S = (v + S) + (w + S) = \\pi_S(v) + \\pi_S(w)\\]
                        \\[\\pi_S(cv) = cv + S = c(v + S) = c\\pi_S(v)\\]
                        <p><strong>Surjectivity:</strong> Every coset \\(v + S \\in V/S\\) is the image of \\(v\\).</p>
                        <p><strong>Kernel:</strong> \\(\\pi_S(v) = 0 + S = S\\) if and only if \\(v + S = S\\), which occurs if and only if \\(v \\in S\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.8 (Dimension Formula for Quotient Spaces)</div>
                    <div class="env-body">
                        <p>If \\(S\\) is a subspace of a finite-dimensional vector space \\(V\\), then</p>
                        \\[\\dim(V/S) = \\dim(V) - \\dim(S)\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Apply the rank-nullity theorem to \\(\\pi_S: V \\to V/S\\):</p>
                        \\[\\dim(V) = \\dim(\\ker(\\pi_S)) + \\dim(\\operatorname{im}(\\pi_S)) = \\dim(S) + \\dim(V/S)\\]
                        <p>Rearranging gives the result.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="dimension-viz"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition 3.9 (Codimension)</div>
                    <div class="env-body">
                        <p>The <strong>codimension</strong> of a subspace \\(S\\) in \\(V\\), denoted \\(\\operatorname{codim}_V(S)\\) or simply \\(\\operatorname{codim}(S)\\), is defined as</p>
                        \\[\\operatorname{codim}(S) = \\dim(V/S) = \\dim(V) - \\dim(S)\\]
                        <p>when \\(V\\) is finite-dimensional.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>Codimension measures "how much room" there is to move outside of \\(S\\). In \\(\\mathbb{R}^3\\):</p>
                        <ul>
                            <li>A plane has codimension 1 (one perpendicular direction)</li>
                            <li>A line has codimension 2 (two perpendicular directions)</li>
                            <li>A point has codimension 3 (three perpendicular directions)</li>
                        </ul>
                        <p>The codimension equals the dimension of any complementary subspace \\(T\\) with \\(V = S \\oplus T\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.10 (Quotients and Complements)</div>
                    <div class="env-body">
                        <p>Let \\(S\\) be a subspace of \\(V\\). All complements of \\(S\\) in \\(V\\) are isomorphic to \\(V/S\\), and hence to each other.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Let \\(T\\) be a complement of \\(S\\), so \\(V = S \\oplus T\\). The projection \\(\\rho_{T,S}: V \\to T\\) onto \\(T\\) along \\(S\\) is a surjective linear transformation with \\(\\ker(\\rho_{T,S}) = S\\). By the First Isomorphism Theorem (which we'll prove next), \\(T \\cong V/S\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 3.11</div>
                    <div class="env-body">
                        <p>In \\(\\mathbb{R}^4\\), let \\(S = \\{(x,y,0,0) \\mid x,y \\in \\mathbb{R}\\}\\). Then \\(\\dim(S) = 2\\) and \\(\\operatorname{codim}(S) = 4 - 2 = 2\\).</p>
                        <p>Two different complements are \\(T_1 = \\{(0,0,z,w) \\mid z,w \\in \\mathbb{R}\\}\\) and \\(T_2 = \\operatorname{span}\\{(1,0,1,0), (0,1,0,1)\\}\\). Both are isomorphic to \\(\\mathbb{R}^2\\), and both are isomorphic to \\(V/S\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'dimension-viz',
                    title: 'Interactive: Dimension Formula Balance',
                    description: 'Visual representation of dim(V) = dim(S) + dim(V/S)',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 60});

                        let dimV = 4;
                        let dimS = 1;

                        const slider = VizEngine.createSlider(controls, 'dim(S)', 0, dimV, dimS, 1, (val) => {
                            dimS = parseInt(val);
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            const ctx = viz.ctx;
                            const w = viz.width;
                            const h = viz.height;

                            // Draw title
                            viz.screenText(`dim(V) = ${dimV}`, w/2, 30, viz.colors.white, 20, 'center');

                            // Draw equation
                            viz.screenText(`${dimV} = ${dimS} + ${dimV - dimS}`, w/2, 60, viz.colors.text, 18, 'center');
                            viz.screenText(`dim(V) = dim(S) + dim(V/S)`, w/2, 85, viz.colors.text, 16, 'center');

                            // Draw visual bars
                            const barY = 150;
                            const barHeight = 60;
                            const barWidth = 300;

                            // Total V bar
                            ctx.fillStyle = viz.colors.purple + '44';
                            ctx.fillRect((w - barWidth)/2, barY, barWidth, barHeight);
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2;
                            ctx.strokeRect((w - barWidth)/2, barY, barWidth, barHeight);
                            viz.screenText('V', w/2, barY + barHeight + 25, viz.colors.purple, 16, 'center');

                            // S part
                            const sWidth = (dimS / dimV) * barWidth;
                            ctx.fillStyle = viz.colors.blue + '88';
                            ctx.fillRect((w - barWidth)/2, barY, sWidth, barHeight);
                            if (sWidth > 20) {
                                viz.screenText('S', (w - barWidth)/2 + sWidth/2, barY + barHeight/2, viz.colors.white, 16, 'center', 'middle');
                            }

                            // V/S part
                            const qWidth = barWidth - sWidth;
                            ctx.fillStyle = viz.colors.orange + '88';
                            ctx.fillRect((w - barWidth)/2 + sWidth, barY, qWidth, barHeight);
                            if (qWidth > 20) {
                                viz.screenText('V/S', (w - barWidth)/2 + sWidth + qWidth/2, barY + barHeight/2, viz.colors.white, 16, 'center', 'middle');
                            }

                            // Draw dimension labels
                            if (sWidth > 0) {
                                viz.screenText(`dim = ${dimS}`, (w - barWidth)/2 + sWidth/2, barY - 15, viz.colors.blue, 14, 'center');
                            }
                            if (qWidth > 0) {
                                viz.screenText(`dim = ${dimV - dimS}`, (w - barWidth)/2 + sWidth + qWidth/2, barY - 15, viz.colors.orange, 14, 'center');
                            }

                            // Draw balance scale metaphor
                            const scaleY = 280;
                            const leftX = w/2 - 120;
                            const rightX = w/2 + 120;

                            // Fulcrum
                            ctx.beginPath();
                            ctx.moveTo(w/2, scaleY);
                            ctx.lineTo(w/2 - 15, scaleY + 30);
                            ctx.lineTo(w/2 + 15, scaleY + 30);
                            ctx.closePath();
                            ctx.fillStyle = viz.colors.text;
                            ctx.fill();

                            // Balance beam
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(leftX, scaleY);
                            ctx.lineTo(rightX, scaleY);
                            ctx.stroke();

                            // Left weight (dim S)
                            const leftWeight = dimS * 15;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(leftX - 25, scaleY - leftWeight, 50, leftWeight);
                            viz.screenText(`${dimS}`, leftX, scaleY + 25, viz.colors.blue, 14, 'center');

                            // Right weight (dim V/S)
                            const rightWeight = (dimV - dimS) * 15;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillRect(rightX - 25, scaleY - rightWeight, 50, rightWeight);
                            viz.screenText(`${dimV - dimS}`, rightX, scaleY + 25, viz.colors.orange, 14, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(T: V \\to W\\) be a linear transformation. Prove that \\(\\dim(\\ker(T)) + \\dim(\\operatorname{im}(T)) = \\dim(V)\\) using the dimension formula for quotient spaces.',
                    hint: 'Consider the quotient space \\(V/\\ker(T)\\) and use the fact that \\(\\operatorname{im}(T) \\cong V/\\ker(T)\\).',
                    solution: 'By the First Isomorphism Theorem, \\(\\operatorname{im}(T) \\cong V/\\ker(T)\\), so \\(\\dim(\\operatorname{im}(T)) = \\dim(V/\\ker(T)) = \\dim(V) - \\dim(\\ker(T))\\). Rearranging gives the rank-nullity theorem.'
                },
                {
                    question: 'If \\(S \\subseteq T \\subseteq V\\) are subspaces with \\(\\operatorname{codim}_V(S) = 3\\) and \\(\\operatorname{codim}_V(T) = 1\\), find \\(\\operatorname{codim}_T(S)\\).',
                    hint: 'Use \\(\\dim(V) - \\dim(S) = 3\\) and \\(\\dim(V) - \\dim(T) = 1\\).',
                    solution: '\\(\\operatorname{codim}_T(S) = \\dim(T) - \\dim(S) = [\\dim(V) - 1] - [\\dim(V) - 3] = 2\\).'
                },
                {
                    question: 'Show that \\(\\ker(\\pi_S) = S\\) directly from the definition of the canonical projection.',
                    hint: 'When is \\(v + S\\) the zero coset?',
                    solution: '\\(v \\in \\ker(\\pi_S)\\) iff \\(\\pi_S(v) = v + S = 0_{V/S} = S\\) iff \\(v \\in S\\). Therefore \\(\\ker(\\pi_S) = S\\).'
                }
            ]
        },
        {
            id: 'ch03-sec03',
            title: 'The Universal Property and First Isomorphism Theorem',
            content: `
                <h2>The Universal Property and First Isomorphism Theorem</h2>

                <p>The quotient space \\(V/S\\) satisfies a remarkable <em>universal property</em> that characterizes it uniquely up to isomorphism. This property is fundamental to category theory and appears throughout mathematics.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.12 (Universal Property of Quotients)</div>
                    <div class="env-body">
                        <p>Let \\(S\\) be a subspace of \\(V\\) and let \\(T: V \\to W\\) be a linear transformation satisfying \\(S \\subseteq \\ker(T)\\). Then there exists a unique linear transformation \\(\\overline{T}: V/S \\to W\\) such that</p>
                        \\[T = \\overline{T} \\circ \\pi_S\\]
                        <p>Moreover, \\(\\ker(\\overline{T}) = \\ker(T)/S\\) and \\(\\operatorname{im}(\\overline{T}) = \\operatorname{im}(T)\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="universal-property-viz"></div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>Existence and uniqueness:</strong> We must define \\(\\overline{T}(v + S) = T(v)\\). This is well-defined if and only if whenever \\(v + S = w + S\\), we have \\(T(v) = T(w)\\). This is equivalent to:</p>
                        \\[v - w \\in S \\Rightarrow T(v - w) = 0 \\Rightarrow T(v) = T(w)\\]
                        <p>which holds precisely when \\(S \\subseteq \\ker(T)\\). The condition \\(T = \\overline{T} \\circ \\pi_S\\) uniquely determines \\(\\overline{T}\\).</p>

                        <p><strong>Kernel:</strong></p>
                        \\[\\ker(\\overline{T}) = \\{v + S \\mid \\overline{T}(v + S) = 0\\} = \\{v + S \\mid T(v) = 0\\} = \\{v + S \\mid v \\in \\ker(T)\\} = \\ker(T)/S\\]

                        <p><strong>Image:</strong></p>
                        \\[\\operatorname{im}(\\overline{T}) = \\{\\overline{T}(v + S) \\mid v \\in V\\} = \\{T(v) \\mid v \\in V\\} = \\operatorname{im}(T)\\]
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The universal property says: "Any linear map that kills \\(S\\) can be factored through the quotient \\(V/S\\)." This is powerful because:</p>
                        <ul>
                            <li>It shows that \\(V/S\\) is the "most economical" way to build a space where \\(S\\) becomes zero</li>
                            <li>It provides a systematic way to construct maps from quotient spaces</li>
                            <li>It explains why quotients appear naturally whenever we want to "ignore" certain elements</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.13 (First Isomorphism Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(T: V \\to W\\) be a linear transformation. Then the induced map \\(\\overline{T}: V/\\ker(T) \\to W\\) defined by</p>
                        \\[\\overline{T}(v + \\ker(T)) = T(v)\\]
                        <p>is an injective linear transformation, and</p>
                        \\[V/\\ker(T) \\cong \\operatorname{im}(T)\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Apply the universal property with \\(S = \\ker(T)\\). We have \\(\\ker(\\overline{T}) = \\ker(T)/\\ker(T)\\), which consists only of the zero coset. Thus \\(\\overline{T}\\) is injective.</p>
                        <p>Since \\(\\operatorname{im}(\\overline{T}) = \\operatorname{im}(T)\\) and \\(\\overline{T}\\) is injective, \\(\\overline{T}\\) is an isomorphism from \\(V/\\ker(T)\\) onto \\(\\operatorname{im}(T)\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The First Isomorphism Theorem is one of the most frequently used results in linear algebra. It tells us that:</p>
                        <ul>
                            <li>Every image is isomorphic to some quotient space</li>
                            <li>Every quotient space is isomorphic to some image (namely, \\(\\operatorname{im}(\\pi_S)\\))</li>
                            <li>To understand \\(T: V \\to W\\), we can factor it as \\(V \\twoheadrightarrow V/\\ker(T) \\xrightarrow{\\cong} \\operatorname{im}(T) \\hookrightarrow W\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 3.14</div>
                    <div class="env-body">
                        <p>Let \\(T: \\mathbb{R}^4 \\to \\mathbb{R}^3\\) be defined by \\(T(x,y,z,w) = (x+y, z+w, x-y)\\). Then:</p>
                        <ul>
                            <li>\\(\\ker(T) = \\{(x,y,z,w) \\mid x = -y, z = -w, x = y\\} = \\{0\\}\\) (verify: the only solution is all zeros)</li>
                            <li>Actually, recalculating: \\(\\ker(T) = \\{(x, -x, z, -z) \\mid x, z \\in \\mathbb{R}\\}\\), so \\(\\dim(\\ker(T)) = 2\\)</li>
                            <li>By rank-nullity: \\(\\dim(\\operatorname{im}(T)) = 4 - 2 = 2\\)</li>
                            <li>Therefore \\(\\mathbb{R}^4/\\ker(T) \\cong \\operatorname{im}(T) \\cong \\mathbb{R}^2\\)</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'universal-property-viz',
                    title: 'Interactive: Commutative Diagram for Universal Property',
                    description: 'Shows how T factors through the quotient V/S',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 1});

                        function draw() {
                            viz.clear();

                            const ctx = viz.ctx;

                            // Draw nodes
                            const vX = 100, vY = 100;
                            const vsX = 100, vsY = 280;
                            const wX = 450, wY = 190;

                            // V node
                            viz.drawCircle(vX, vY, 40, viz.colors.blue + '44', viz.colors.blue);
                            viz.screenText('V', vX, vY, viz.colors.white, 24, 'center', 'middle');

                            // V/S node
                            viz.drawCircle(vsX, vsY, 40, viz.colors.purple + '44', viz.colors.purple);
                            viz.screenText('V/S', vsX, vsY, viz.colors.white, 20, 'center', 'middle');

                            // W node
                            viz.drawCircle(wX, wY, 40, viz.colors.orange + '44', viz.colors.orange);
                            viz.screenText('W', wX, wY, viz.colors.white, 24, 'center', 'middle');

                            // Arrows
                            // V to V/S (pi_S)
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(vX, vY + 40);
                            ctx.lineTo(vsX, vsY - 40);
                            ctx.stroke();
                            drawArrowhead(ctx, vX, vY + 40, vsX, vsY - 40, viz.colors.purple);
                            viz.screenText('πₛ', vX - 40, (vY + vsY)/2, viz.colors.purple, 18);

                            // V to W (T)
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(vX + 35, vY + 20);
                            ctx.lineTo(wX - 35, wY - 20);
                            ctx.stroke();
                            drawArrowhead(ctx, vX + 35, vY + 20, wX - 35, wY - 20, viz.colors.teal);
                            viz.screenText('T', (vX + wX)/2, (vY + wY)/2 - 20, viz.colors.teal, 18);

                            // V/S to W (T-bar)
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 3;
                            ctx.setLineDash([8, 4]);
                            ctx.beginPath();
                            ctx.moveTo(vsX + 40, vsY);
                            ctx.lineTo(wX - 40, wY + 15);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            drawArrowhead(ctx, vsX + 40, vsY, wX - 40, wY + 15, viz.colors.green);
                            viz.screenText('T̄ (unique)', (vsX + wX)/2, (vsY + wY)/2 + 30, viz.colors.green, 18, 'center');

                            // Condition: S ⊆ ker(T)
                            viz.screenText('Condition: S ⊆ ker(T)', 280, 50, viz.colors.white, 16, 'center');
                            viz.screenText('Then: T = T̄ ∘ πₛ', 280, 370, viz.colors.text, 16, 'center');

                            function drawArrowhead(ctx, x1, y1, x2, y2, color) {
                                const angle = Math.atan2(y2 - y1, x2 - x1);
                                const size = 12;
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.moveTo(x2, y2);
                                ctx.lineTo(x2 - size * Math.cos(angle - Math.PI/6),
                                          y2 - size * Math.sin(angle - Math.PI/6));
                                ctx.lineTo(x2 - size * Math.cos(angle + Math.PI/6),
                                          y2 - size * Math.sin(angle + Math.PI/6));
                                ctx.closePath();
                                ctx.fill();
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(T: \\mathbb{R}[x] \\to \\mathbb{R}\\) be evaluation at \\(x = 2\\), i.e., \\(T(p) = p(2)\\). Describe \\(\\ker(T)\\) and use the First Isomorphism Theorem to identify \\(\\mathbb{R}[x]/\\ker(T)\\).',
                    hint: 'What polynomials satisfy \\(p(2) = 0\\)?',
                    solution: '\\(\\ker(T) = \\{p \\in \\mathbb{R}[x] \\mid p(2) = 0\\}\\) is the ideal of polynomials divisible by \\((x-2)\\). Since \\(\\operatorname{im}(T) = \\mathbb{R}\\) (every real number is \\(p(2)\\) for some \\(p\\)), we have \\(\\mathbb{R}[x]/\\ker(T) \\cong \\mathbb{R}\\).'
                },
                {
                    question: 'Prove that the universal property uniquely characterizes \\(V/S\\) up to isomorphism.',
                    hint: 'If \\((Q, \\rho)\\) also satisfies the universal property, construct isomorphisms between \\(Q\\) and \\(V/S\\).',
                    solution: 'If \\((Q, \\rho: V \\to Q)\\) satisfies the universal property with \\(\\ker(\\rho) = S\\), then applying the property to \\(\\rho\\) gives a unique \\(\\phi: V/S \\to Q\\) with \\(\\rho = \\phi \\circ \\pi_S\\). Similarly, applying to \\(\\pi_S\\) gives \\(\\psi: Q \\to V/S\\) with \\(\\pi_S = \\psi \\circ \\rho\\). The compositions \\(\\phi \\circ \\psi\\) and \\(\\psi \\circ \\phi\\) are identity maps by uniqueness, so \\(Q \\cong V/S\\).'
                },
                {
                    question: 'Use the First Isomorphism Theorem to prove that every surjective linear map \\(T: V \\to W\\) induces an isomorphism \\(V/\\ker(T) \\cong W\\).',
                    hint: 'What is \\(\\operatorname{im}(T)\\) when \\(T\\) is surjective?',
                    solution: 'If \\(T\\) is surjective, then \\(\\operatorname{im}(T) = W\\). The First Isomorphism Theorem gives \\(V/\\ker(T) \\cong \\operatorname{im}(T) = W\\).'
                }
            ]
        },
        {
            id: 'ch03-sec04',
            title: 'The Second and Third Isomorphism Theorems',
            content: `
                <h2>The Second and Third Isomorphism Theorems</h2>

                <p>The remaining isomorphism theorems provide powerful tools for manipulating quotient spaces. They show that quotient spaces behave somewhat like fractions in arithmetic.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.15 (Second Isomorphism Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(S\\) and \\(T\\) be subspaces of \\(V\\). Then</p>
                        \\[\\frac{S + T}{S} \\cong \\frac{T}{S \\cap T}\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Define \\(\\phi: S + T \\to T/(S \\cap T)\\) by \\(\\phi(s + t) = t + (S \\cap T)\\) for \\(s \\in S, t \\in T\\).</p>

                        <p><strong>Well-defined:</strong> If \\(s + t = s' + t'\\) with \\(s, s' \\in S\\) and \\(t, t' \\in T\\), then \\(t - t' = s' - s \\in S \\cap T\\), so \\(t + (S \\cap T) = t' + (S \\cap T)\\).</p>

                        <p><strong>Surjective:</strong> Every coset \\(t + (S \\cap T)\\) is the image of \\(t \\in S + T\\).</p>

                        <p><strong>Kernel:</strong> \\(\\phi(s + t) = 0\\) iff \\(t \\in S \\cap T\\) iff \\(s + t \\in S\\). Thus \\(\\ker(\\phi) = S\\).</p>

                        <p>By the First Isomorphism Theorem, \\((S + T)/S \\cong \\operatorname{im}(\\phi) = T/(S \\cap T)\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The Second Isomorphism Theorem has a natural interpretation: When we quotient \\(S + T\\) by \\(S\\), we're "removing" all of \\(S\\) from \\(S + T\\). What remains is essentially \\(T\\), but we've also removed the part of \\(T\\) that overlaps with \\(S\\), namely \\(S \\cap T\\).</p>
                        <p>Think of it like Venn diagrams: \\((S \\cup T) \\setminus S = T \\setminus (S \\cap T)\\) in set theory.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="second-iso-viz"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.16 (Third Isomorphism Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(S \\subseteq T \\subseteq V\\) be subspaces. Then</p>
                        \\[\\frac{V/S}{T/S} \\cong \\frac{V}{T}\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Define \\(\\phi: V/S \\to V/T\\) by \\(\\phi(v + S) = v + T\\).</p>

                        <p><strong>Well-defined:</strong> If \\(v + S = w + S\\), then \\(v - w \\in S \\subseteq T\\), so \\(v + T = w + T\\).</p>

                        <p><strong>Linearity and surjectivity:</strong> Straightforward to verify.</p>

                        <p><strong>Kernel:</strong> \\(\\phi(v + S) = 0_{V/T}\\) iff \\(v + T = T\\) iff \\(v \\in T\\) iff \\(v + S \\in T/S\\). Thus \\(\\ker(\\phi) = T/S\\).</p>

                        <p>By the First Isomorphism Theorem, \\((V/S)/(T/S) \\cong \\operatorname{im}(\\phi) = V/T\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The Third Isomorphism Theorem says quotients can be "canceled" like fractions: \\(\\frac{V/S}{T/S} = \\frac{V}{T}\\). More precisely, "quotienting twice" is the same as "quotienting once by the larger space."</p>
                        <p>If we first collapse \\(S\\) to get \\(V/S\\), then collapse the image of \\(T\\) (which is \\(T/S\\)) in \\(V/S\\), we end up with the same result as directly collapsing \\(T\\) in \\(V\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 3.17</div>
                    <div class="env-body">
                        <p><strong>Second Isomorphism Theorem:</strong> In \\(\\mathbb{R}^3\\), let \\(S = \\operatorname{span}\\{(1,0,0)\\}\\) (the \\(x\\)-axis) and \\(T = \\operatorname{span}\\{(0,1,0)\\}\\) (the \\(y\\)-axis). Then \\(S \\cap T = \\{0\\}\\) and \\(S + T\\) is the \\(xy\\)-plane. The theorem gives:</p>
                        \\[\\frac{\\text{(xy-plane)}}{\\text{(x-axis)}} \\cong \\frac{\\text{(y-axis)}}{\\{0\\}} \\cong \\mathbb{R}\\]
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 3.18</div>
                    <div class="env-body">
                        <p><strong>Third Isomorphism Theorem:</strong> In \\(\\mathbb{R}^4\\), let \\(S = \\operatorname{span}\\{e_1\\}\\), \\(T = \\operatorname{span}\\{e_1, e_2\\}\\), and \\(V = \\mathbb{R}^4\\). Then:</p>
                        \\[\\frac{\\mathbb{R}^4/S}{T/S} \\cong \\frac{\\mathbb{R}^4}{T}\\]
                        <p>Both sides have dimension 2. The left side: \\(\\dim(\\mathbb{R}^4/S) = 3\\) and \\(\\dim(T/S) = 1\\), so the quotient has dimension \\(3 - 1 = 2\\). The right side: \\(\\dim(\\mathbb{R}^4/T) = 4 - 2 = 2\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="third-iso-viz"></div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 3.19 (Dimension Formula for Sums)</div>
                    <div class="env-body">
                        <p>For subspaces \\(S, T\\) of a finite-dimensional space \\(V\\):</p>
                        \\[\\dim(S + T) = \\dim(S) + \\dim(T) - \\dim(S \\cap T)\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>By the Second Isomorphism Theorem:</p>
                        \\[\\dim\\left(\\frac{S + T}{S}\\right) = \\dim\\left(\\frac{T}{S \\cap T}\\right)\\]
                        <p>This gives:</p>
                        \\[\\dim(S + T) - \\dim(S) = \\dim(T) - \\dim(S \\cap T)\\]
                        <p>Rearranging yields the result.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'second-iso-viz',
                    title: 'Interactive: Second Isomorphism Theorem',
                    description: 'Visualize (S+T)/S ≅ T/(S∩T) using draggable subspaces',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 50});

                        // Fixed S along x-axis, draggable T
                        const s = {x: 1, y: 0};
                        const t = viz.addDraggable('t', 0.5, 1, viz.colors.orange, 8, () => draw());

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw S (blue line along x-axis)
                            viz.drawLine(0, 0, s.x, s.y, viz.colors.blue, 2);
                            viz.drawText('S', 3, 0.3, viz.colors.blue, 14);

                            // Draw T (orange line)
                            viz.drawLine(0, 0, t.x, t.y, viz.colors.orange, 2);
                            viz.drawVector(0, 0, t.x, t.y, viz.colors.orange, 't');
                            viz.drawText('T', t.x * 2.5, t.y * 2.5, viz.colors.orange, 14);

                            // Calculate S ∩ T (scalar multiple relationship)
                            // If t = λs for some λ, they intersect non-trivially
                            const parallel = Math.abs(t.y) < 0.1;

                            if (parallel) {
                                viz.drawText('S ∩ T = S (T ⊆ S)', 0, -4.5, viz.colors.teal, 14, 'center');
                            } else {
                                viz.drawText('S ∩ T = {0}', 0, -4.5, viz.colors.teal, 14, 'center');
                            }

                            // Draw S + T (shaded parallelogram)
                            if (!parallel) {
                                const points = [
                                    [0, 0],
                                    [s.x * 3, s.y * 3],
                                    [s.x * 3 + t.x * 2, s.y * 3 + t.y * 2],
                                    [t.x * 2, t.y * 2]
                                ];
                                viz.drawPolygon(points, viz.colors.purple + '22', viz.colors.purple + '88', 1);
                                viz.drawText('S + T', s.x * 1.5 + t.x, s.y * 1.5 + t.y, viz.colors.purple, 14);
                            }

                            viz.drawDraggables();

                            // Show dimension equation
                            const dimS = 1;
                            const dimT = 1;
                            const dimIntersect = parallel ? 1 : 0;
                            const dimSum = parallel ? 1 : 2;

                            viz.drawText(`dim(S+T) = ${dimSum}, dim(S) = ${dimS}, dim(T) = ${dimT}, dim(S∩T) = ${dimIntersect}`,
                                        0, -5.5, viz.colors.text, 12, 'center');
                            viz.drawText(`dim((S+T)/S) = ${dimSum - dimS}, dim(T/(S∩T)) = ${dimT - dimIntersect}`,
                                        0, -6.3, viz.colors.green, 12, 'center');
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'third-iso-viz',
                    title: 'Interactive: Third Isomorphism Theorem',
                    description: 'Shows the "cancellation" property: (V/S)/(T/S) ≅ V/T',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 1});

                        function draw() {
                            viz.clear();

                            const ctx = viz.ctx;

                            // Draw nested boxes representing S ⊆ T ⊆ V
                            const centerX = 280;
                            const centerY = 200;

                            // V (largest box)
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 3;
                            ctx.strokeRect(centerX - 200, centerY - 150, 400, 300);
                            viz.screenText('V', centerX - 180, centerY - 130, viz.colors.purple, 20);

                            // T (medium box)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 3;
                            ctx.strokeRect(centerX - 140, centerY - 100, 280, 200);
                            viz.screenText('T', centerX - 120, centerY - 80, viz.colors.orange, 18);

                            // S (smallest box)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.strokeRect(centerX - 80, centerY - 50, 160, 100);
                            viz.screenText('S', centerX - 60, centerY - 30, viz.colors.blue, 16);

                            // Show the isomorphism
                            viz.screenText('(V/S)/(T/S) ≅ V/T', 280, 50, viz.colors.white, 20, 'center');

                            // Left path: First quotient by S
                            viz.screenText('First: V → V/S', 100, 370, viz.colors.teal, 14);
                            viz.screenText('Then: V/S → (V/S)/(T/S)', 100, 390, viz.colors.teal, 14);

                            // Right path: Direct quotient by T
                            viz.screenText('Direct: V → V/T', 450, 380, viz.colors.green, 14);

                            // Draw arrows showing the quotient process
                            // Arrow from V to T showing T/S
                            ctx.strokeStyle = viz.colors.orange + '88';
                            ctx.lineWidth = 2;
                            ctx.setLineDash([5, 3]);
                            ctx.strokeRect(centerX - 140, centerY - 100, 280, 200);
                            ctx.setLineDash([]);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the Second Isomorphism Theorem to prove the dimension formula: \\(\\dim(S + T) = \\dim(S) + \\dim(T) - \\dim(S \\cap T)\\).',
                    hint: 'Apply dimension to both sides of \\((S+T)/S \\cong T/(S \\cap T)\\).',
                    solution: 'By the Second Isomorphism Theorem, \\(\\dim((S+T)/S) = \\dim(T/(S \\cap T))\\). Using \\(\\dim(V/W) = \\dim(V) - \\dim(W)\\), we get \\(\\dim(S+T) - \\dim(S) = \\dim(T) - \\dim(S \\cap T)\\), which rearranges to the formula.'
                },
                {
                    question: 'Let \\(S \\subseteq T \\subseteq V\\) with \\(\\dim(S) = 2\\), \\(\\dim(T) = 5\\), \\(\\dim(V) = 8\\). Find \\(\\dim((V/S)/(T/S))\\).',
                    hint: 'Use the Third Isomorphism Theorem.',
                    solution: 'By the Third Isomorphism Theorem, \\((V/S)/(T/S) \\cong V/T\\), so \\(\\dim((V/S)/(T/S)) = \\dim(V/T) = \\dim(V) - \\dim(T) = 8 - 5 = 3\\).'
                },
                {
                    question: 'If \\(V = S \\oplus T\\) (direct sum), verify both isomorphism theorems reduce to simple statements.',
                    hint: 'What is \\(S \\cap T\\) when the sum is direct?',
                    solution: 'When \\(V = S \\oplus T\\), we have \\(S \\cap T = \\{0\\}\\). Second Isomorphism Theorem: \\((S+T)/S = V/S \\cong T/\\{0\\} \\cong T\\). This is consistent with \\(V/S \\cong T\\) for direct sums. Third Isomorphism Theorem: If \\(T = V\\) and \\(S \\subseteq T\\), then \\((V/S)/(V/S) = \\{0\\} \\cong V/V = \\{0\\}\\).'
                }
            ]
        },
        {
            id: 'ch03-sec05',
            title: 'The Correspondence Theorem',
            content: `
                <h2>The Correspondence Theorem</h2>

                <p>The Correspondence Theorem (also called the Lattice Isomorphism Theorem) reveals a beautiful structure-preserving relationship between subspaces of \\(V\\) containing \\(S\\) and subspaces of the quotient \\(V/S\\).</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.20 (Correspondence Theorem)</div>
                    <div class="env-body">
                        <p>Let \\(S\\) be a subspace of \\(V\\). The map \\(\\Phi\\) that assigns to each subspace \\(W\\) with \\(S \\subseteq W \\subseteq V\\) the quotient subspace \\(W/S\\) of \\(V/S\\) is an order-preserving bijection:</p>
                        \\[\\Phi: \\{W \\mid S \\subseteq W \\subseteq V\\} \\longleftrightarrow \\{U \\mid U \\subseteq V/S\\}\\]
                        <p>Moreover, \\(\\Phi\\) preserves:</p>
                        <ul>
                            <li><strong>Inclusion:</strong> \\(W_1 \\subseteq W_2\\) iff \\(W_1/S \\subseteq W_2/S\\)</li>
                            <li><strong>Sums:</strong> \\((W_1 + W_2)/S = W_1/S + W_2/S\\)</li>
                            <li><strong>Intersections:</strong> \\((W_1 \\cap W_2)/S = W_1/S \\cap W_2/S\\)</li>
                            <li><strong>Dimensions:</strong> \\(\\dim(W/S) = \\dim(W) - \\dim(S)\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>Surjectivity:</strong> Let \\(U\\) be a subspace of \\(V/S\\). Define \\(W = \\{v \\in V \\mid v + S \\in U\\}\\). We show \\(S \\subseteq W \\subseteq V\\) and \\(W/S = U\\).</p>
                        <ul>
                            <li>If \\(s \\in S\\), then \\(s + S = S = 0_{V/S} \\in U\\), so \\(s \\in W\\). Thus \\(S \\subseteq W\\).</li>
                            <li>\\(W\\) is a subspace: if \\(v, w \\in W\\), then \\(v + S, w + S \\in U\\), so \\((v+w) + S = (v+S) + (w+S) \\in U\\), thus \\(v + w \\in W\\).</li>
                            <li>If \\(v + S \\in W/S\\), then \\(v \\in W\\), so \\(v + S \\in U\\). Conversely, if \\(v + S \\in U\\), then \\(v \\in W\\) by definition. Thus \\(W/S = U\\).</li>
                        </ul>

                        <p><strong>Injectivity:</strong> If \\(W_1/S = W_2/S\\), then for any \\(w_1 \\in W_1\\), we have \\(w_1 + S \\in W_1/S = W_2/S\\), so \\(w_1 + S = w_2 + S\\) for some \\(w_2 \\in W_2\\). This means \\(w_1 - w_2 \\in S \\subseteq W_2\\), so \\(w_1 \\in W_2\\). Thus \\(W_1 \\subseteq W_2\\), and by symmetry \\(W_1 = W_2\\).</p>

                        <p>The preservation properties follow from straightforward verification of set inclusions.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body">
                        <p>The Correspondence Theorem says: "The lattice of subspaces above \\(S\\) in \\(V\\) is isomorphic to the entire lattice of subspaces of \\(V/S\\)."</p>
                        <p>When we form the quotient \\(V/S\\), we're collapsing \\(S\\) to zero. The theorem tells us that all the interesting structure "above" \\(S\\) is preserved—we don't lose information about how subspaces containing \\(S\\) relate to each other. We just shift the perspective so that \\(S\\) becomes the new zero.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="correspondence-viz"></div>

                <div class="env-block example">
                    <div class="env-title">Example 3.21</div>
                    <div class="env-body">
                        <p>Let \\(V = \\mathbb{R}^3\\) and \\(S = \\operatorname{span}\\{(1,0,0)\\}\\) (the \\(x\\)-axis). The quotient \\(V/S \\cong \\mathbb{R}^2\\) (the \\(yz\\)-plane). Subspaces of \\(V\\) containing \\(S\\) are:</p>
                        <ul>
                            <li>\\(S\\) itself \\(\\leftrightarrow\\) \\(\\{0\\} \\subseteq V/S\\)</li>
                            <li>Any plane containing the \\(x\\)-axis \\(\\leftrightarrow\\) lines in \\(V/S \\cong \\mathbb{R}^2\\)</li>
                            <li>\\(V\\) itself \\(\\leftrightarrow\\) \\(V/S\\)</li>
                        </ul>
                        <p>For instance, the plane \\(W = \\operatorname{span}\\{(1,0,0), (0,1,0)\\}\\) (the \\(xy\\)-plane) corresponds to \\(W/S \\cong \\operatorname{span}\\{(0,1,0) + S\\}\\), a line in \\(V/S\\).</p>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 3.22</div>
                    <div class="env-body">
                        <p>The number of subspaces of \\(V/S\\) equals the number of subspaces of \\(V\\) that contain \\(S\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The Correspondence Theorem is fundamental in many areas of mathematics. In group theory, it relates normal subgroups of \\(G\\) containing \\(N\\) to all subgroups of \\(G/N\\). In ring theory, it relates ideals of \\(R\\) containing \\(I\\) to ideals of \\(R/I\\). The pattern is always the same: quotient constructions preserve the lattice structure above the subobject being quotiented out.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'correspondence-viz',
                    title: 'Interactive: Subspace Lattice Correspondence',
                    description: 'Shows bijection between subspaces containing S and subspaces of V/S',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 400, scale: 1});

                        function draw() {
                            viz.clear();

                            const ctx = viz.ctx;

                            // Left side: subspaces of V containing S
                            const leftX = 120;
                            viz.screenText('Subspaces of V', leftX, 30, viz.colors.white, 16, 'center');
                            viz.screenText('containing S', leftX, 50, viz.colors.text, 14, 'center');

                            // Right side: subspaces of V/S
                            const rightX = 440;
                            viz.screenText('Subspaces of V/S', rightX, 30, viz.colors.white, 16, 'center');

                            // Draw lattice structure (diamond shape)
                            const topY = 100;
                            const midY = 200;
                            const botY = 320;

                            // Left lattice
                            // V at top
                            viz.drawCircle(leftX, topY, 15, viz.colors.purple + '44', viz.colors.purple);
                            viz.screenText('V', leftX, topY, viz.colors.white, 12, 'center', 'middle');

                            // Intermediate subspaces W1, W2
                            const w1X = leftX - 50;
                            const w2X = leftX + 50;
                            viz.drawCircle(w1X, midY, 15, viz.colors.orange + '44', viz.colors.orange);
                            viz.screenText('W₁', w1X, midY, viz.colors.white, 11, 'center', 'middle');
                            viz.drawCircle(w2X, midY, 15, viz.colors.orange + '44', viz.colors.orange);
                            viz.screenText('W₂', w2X, midY, viz.colors.white, 11, 'center', 'middle');

                            // S at bottom
                            viz.drawCircle(leftX, botY, 15, viz.colors.blue + '44', viz.colors.blue);
                            viz.screenText('S', leftX, botY, viz.colors.white, 12, 'center', 'middle');

                            // Left connections
                            ctx.strokeStyle = viz.colors.text + '88';
                            ctx.lineWidth = 2;
                            // V to W1, W2
                            ctx.beginPath();
                            ctx.moveTo(leftX, topY + 15);
                            ctx.lineTo(w1X, midY - 15);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(leftX, topY + 15);
                            ctx.lineTo(w2X, midY - 15);
                            ctx.stroke();
                            // W1, W2 to S
                            ctx.beginPath();
                            ctx.moveTo(w1X, midY + 15);
                            ctx.lineTo(leftX, botY - 15);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(w2X, midY + 15);
                            ctx.lineTo(leftX, botY - 15);
                            ctx.stroke();

                            // Right lattice (V/S)
                            // V/S at top
                            viz.drawCircle(rightX, topY, 15, viz.colors.purple + '44', viz.colors.purple);
                            viz.screenText('V/S', rightX, topY, viz.colors.white, 10, 'center', 'middle');

                            // W1/S, W2/S
                            const u1X = rightX - 50;
                            const u2X = rightX + 50;
                            viz.drawCircle(u1X, midY, 15, viz.colors.orange + '44', viz.colors.orange);
                            viz.screenText('W₁/S', u1X, midY, viz.colors.white, 9, 'center', 'middle');
                            viz.drawCircle(u2X, midY, 15, viz.colors.orange + '44', viz.colors.orange);
                            viz.screenText('W₂/S', u2X, midY, viz.colors.white, 9, 'center', 'middle');

                            // {0} at bottom
                            viz.drawCircle(rightX, botY, 15, viz.colors.blue + '44', viz.colors.blue);
                            viz.screenText('{0}', rightX, botY, viz.colors.white, 10, 'center', 'middle');

                            // Right connections
                            ctx.beginPath();
                            ctx.moveTo(rightX, topY + 15);
                            ctx.lineTo(u1X, midY - 15);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(rightX, topY + 15);
                            ctx.lineTo(u2X, midY - 15);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(u1X, midY + 15);
                            ctx.lineTo(rightX, botY - 15);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(u2X, midY + 15);
                            ctx.lineTo(rightX, botY - 15);
                            ctx.stroke();

                            // Draw correspondence arrows
                            const arrowY1 = topY;
                            const arrowY2 = midY;
                            const arrowY3 = botY;

                            drawDoubleArrow(ctx, leftX + 40, arrowY1, rightX - 40, arrowY1, viz.colors.green);
                            drawDoubleArrow(ctx, w1X + 35, arrowY2, u1X - 35, arrowY2, viz.colors.green);
                            drawDoubleArrow(ctx, w2X + 35, arrowY2, u2X - 35, arrowY2, viz.colors.green);
                            drawDoubleArrow(ctx, leftX + 40, arrowY3, rightX - 40, arrowY3, viz.colors.green);

                            // Label
                            viz.screenText('Φ: W ↦ W/S', 280, 370, viz.colors.green, 16, 'center');
                            viz.screenText('(bijection)', 280, 390, viz.colors.text, 12, 'center');

                            function drawDoubleArrow(ctx, x1, y, x2, _y, color) {
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(x1, y);
                                ctx.lineTo(x2, y);
                                ctx.stroke();

                                // Right arrowhead
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.moveTo(x2, y);
                                ctx.lineTo(x2 - 8, y - 5);
                                ctx.lineTo(x2 - 8, y + 5);
                                ctx.closePath();
                                ctx.fill();

                                // Left arrowhead
                                ctx.beginPath();
                                ctx.moveTo(x1, y);
                                ctx.lineTo(x1 + 8, y - 5);
                                ctx.lineTo(x1 + 8, y + 5);
                                ctx.closePath();
                                ctx.fill();
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(V = \\mathbb{R}^4\\) and \\(S = \\operatorname{span}\\{e_1, e_2\\}\\). How many 2-dimensional subspaces of \\(V/S\\) are there? What do they correspond to in \\(V\\)?',
                    hint: '\\(V/S \\cong \\mathbb{R}^2\\). What are the 2-dimensional subspaces of \\(\\mathbb{R}^2\\)?',
                    solution: '\\(V/S \\cong \\mathbb{R}^2\\) has only one 2-dimensional subspace: itself. This corresponds to the unique 4-dimensional subspace of \\(V\\) containing \\(S\\), namely \\(V\\) itself.'
                },
                {
                    question: 'Use the Correspondence Theorem to prove: if \\(S \\subseteq W \\subseteq V\\) and \\(\\dim(W/S) = 1\\), then \\(W\\) is maximal among subspaces containing \\(S\\) (i.e., no proper subspace strictly between \\(W\\) and \\(V\\) contains \\(S\\)).',
                    hint: 'What does maximality in \\(V\\) correspond to in \\(V/S\\)?',
                    solution: 'By the Correspondence Theorem, subspaces of \\(V\\) strictly between \\(W\\) and \\(V\\) correspond to subspaces of \\(V/S\\) strictly between \\(W/S\\) and \\(V/S\\). If \\(\\dim(W/S) = 1\\) and \\(\\dim(V/S) \\geq 2\\), such intermediate subspaces exist. But if \\(\\dim(V/S) = 2\\) and \\(\\dim(W/S) = 1\\), then \\(W/S\\) is a hyperplane in \\(V/S\\), so \\(W\\) is a hyperplane in the lattice above \\(S\\).'
                },
                {
                    question: 'Show that the correspondence preserves dimension: \\(\\dim(W/S) = \\dim(W) - \\dim(S)\\) for \\(S \\subseteq W\\).',
                    hint: 'This is the dimension formula for quotients.',
                    solution: 'The canonical projection \\(\\pi_S: W \\to W/S\\) is surjective with \\(\\ker(\\pi_S) = S\\). By rank-nullity: \\(\\dim(W) = \\dim(S) + \\dim(W/S)\\), so \\(\\dim(W/S) = \\dim(W) - \\dim(S)\\).'
                }
            ]
        },
        {
            id: 'ch03-sec06',
            title: 'Applications and the Three Isomorphisms Unified',
            content: `
                <h2>Applications and the Three Isomorphisms Unified</h2>

                <p>We conclude by examining how the three isomorphism theorems work together and by exploring several important applications.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.23 (The Isomorphism Theorems Summary)</div>
                    <div class="env-body">
                        <p>For a vector space \\(V\\) and subspaces \\(S, T, W\\):</p>
                        <ol>
                            <li><strong>First:</strong> If \\(\\phi: V \\to W\\) is linear, then \\(V/\\ker(\\phi) \\cong \\operatorname{im}(\\phi)\\)</li>
                            <li><strong>Second:</strong> \\(\\displaystyle\\frac{S + T}{S} \\cong \\frac{T}{S \\cap T}\\)</li>
                            <li><strong>Third:</strong> If \\(S \\subseteq T \\subseteq V\\), then \\(\\displaystyle\\frac{V/S}{T/S} \\cong \\frac{V}{T}\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="three-iso-diagram"></div>

                <div class="env-block example">
                    <div class="env-title">Example 3.24 (Rank-Nullity from First Isomorphism)</div>
                    <div class="env-body">
                        <p>The rank-nullity theorem is an immediate consequence of the First Isomorphism Theorem. For \\(T: V \\to W\\):</p>
                        \\[\\dim(\\operatorname{im}(T)) = \\dim(V/\\ker(T)) = \\dim(V) - \\dim(\\ker(T))\\]
                        <p>Rearranging: \\(\\dim(V) = \\dim(\\ker(T)) + \\dim(\\operatorname{im}(T))\\)</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 3.25 (Composition of Quotient Maps)</div>
                    <div class="env-body">
                        <p>Let \\(S \\subseteq T \\subseteq V\\). The Third Isomorphism Theorem tells us that:</p>
                        \\[\\pi_{T/S} \\circ \\pi_S = \\phi \\circ \\pi_T\\]
                        <p>where \\(\\phi: V/T \\to (V/S)/(T/S)\\) is the canonical isomorphism. In other words, "quotienting twice" \\((V \\to V/S \\to (V/S)/(T/S))\\) is equivalent to "quotienting once then lifting" \\((V \\to V/T \\to (V/S)/(T/S))\\).</p>
                    </div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 3.26 (Quotient of Direct Sums)</div>
                    <div class="env-body">
                        <p>Let \\(V = V_1 \\oplus V_2\\) and suppose \\(S = S_1 \\oplus S_2\\) where \\(S_i \\subseteq V_i\\). Then</p>
                        \\[\\frac{V}{S} \\cong \\frac{V_1}{S_1} \\oplus \\frac{V_2}{S_2}\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Define \\(\\phi: V \\to (V_1/S_1) \\oplus (V_2/S_2)\\) by \\(\\phi(v_1, v_2) = (v_1 + S_1, v_2 + S_2)\\). Then \\(\\phi\\) is surjective and \\(\\ker(\\phi) = S_1 \\oplus S_2 = S\\). By the First Isomorphism Theorem, \\(V/S \\cong (V_1/S_1) \\oplus (V_2/S_2)\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 3.27 (Modular Law)</div>
                    <div class="env-body">
                        <p>For subspaces \\(S, T, W\\) with \\(S \\subseteq W\\), the <em>modular law</em> states:</p>
                        \\[W \\cap (S + T) = S + (W \\cap T)\\]
                        <p><strong>Proof using isomorphisms:</strong> Apply the Second Isomorphism Theorem to both sides after quotienting by \\(S\\):
                        \\[\\frac{W \\cap (S + T)}{S} = \\frac{W}{S} \\cap \\frac{S + T}{S} = \\frac{W}{S} \\cap \\frac{T}{S \\cap T}\\]
                        Working through the lattice operations shows this equals \\((S + (W \\cap T))/S\\), from which the result follows by the Correspondence Theorem.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.28 (Zassenhaus Lemma / Butterfly Lemma)</div>
                    <div class="env-body">
                        <p>Let \\(S, S', T, T'\\) be subspaces with \\(S' \\subseteq S\\) and \\(T' \\subseteq T\\). Then:</p>
                        \\[\\frac{S' + (S \\cap T)}{S' + (S \\cap T')} \\cong \\frac{T' + (S \\cap T)}{T' + (S' \\cap T)}\\]
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The Zassenhaus Lemma is a powerful generalization that leads to the Jordan-Hölder theorem in both group theory and module theory. It shows that certain "refinements" of filtrations lead to isomorphic factor structures.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition: Why Isomorphism Theorems Matter</div>
                    <div class="env-body">
                        <p>The isomorphism theorems are not just abstract curiosities. They are essential tools for:</p>
                        <ul>
                            <li><strong>Simplifying computations:</strong> Understanding \\(T: V \\to W\\) by factoring through \\(V/\\ker(T)\\)</li>
                            <li><strong>Counting subspaces:</strong> Using the Correspondence Theorem to transfer counting problems</li>
                            <li><strong>Understanding structure:</strong> Every quotient is an image; every image is a quotient</li>
                            <li><strong>Generalizing arithmetic:</strong> Quotient spaces behave like "division" but in a linear algebra context</li>
                            <li><strong>Building intuition:</strong> The lattice of subspaces has predictable, algebraically-governed behavior</li>
                        </ul>
                        <p>In more advanced mathematics, these theorems appear in category theory as the foundation for understanding exact sequences, homological algebra, and derived functors.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'three-iso-diagram',
                    title: 'Interactive: The Three Isomorphism Theorems as Commutative Diagrams',
                    description: 'Visual summary showing all three isomorphism theorems',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, {width: 560, height: 450, scale: 1});

                        let currentTheorem = 1;

                        VizEngine.createButton(controls, 'First Iso', () => { currentTheorem = 1; draw(); });
                        VizEngine.createButton(controls, 'Second Iso', () => { currentTheorem = 2; draw(); });
                        VizEngine.createButton(controls, 'Third Iso', () => { currentTheorem = 3; draw(); });

                        function draw() {
                            viz.clear();

                            const ctx = viz.ctx;

                            viz.screenText('The Three Isomorphism Theorems', 280, 25, viz.colors.white, 18, 'center');

                            if (currentTheorem === 1) {
                                // First Isomorphism Theorem
                                viz.screenText('First Isomorphism Theorem: V/ker(φ) ≅ im(φ)', 280, 55, viz.colors.teal, 14, 'center');

                                const vX = 150, vY = 150;
                                const wX = 410, wY = 150;
                                const qX = 150, qY = 300;
                                const imX = 410, imY = 300;

                                // V
                                viz.drawCircle(vX, vY, 35, viz.colors.blue + '44', viz.colors.blue);
                                viz.screenText('V', vX, vY, viz.colors.white, 20, 'center', 'middle');

                                // W
                                viz.drawCircle(wX, wY, 35, viz.colors.purple + '44', viz.colors.purple);
                                viz.screenText('W', wX, wY, viz.colors.white, 20, 'center', 'middle');

                                // V/ker(φ)
                                viz.drawCircle(qX, qY, 35, viz.colors.orange + '44', viz.colors.orange);
                                viz.screenText('V/ker(φ)', qX, qY, viz.colors.white, 12, 'center', 'middle');

                                // im(φ)
                                viz.drawCircle(imX, imY, 35, viz.colors.green + '44', viz.colors.green);
                                viz.screenText('im(φ)', imX, imY, viz.colors.white, 14, 'center', 'middle');

                                // Arrows
                                drawArrow(ctx, vX + 30, vY, wX - 30, wY, viz.colors.teal, 'φ', 280, vY - 20);
                                drawArrow(ctx, vX, vY + 35, qX, qY - 35, viz.colors.orange, 'π', vX - 30, (vY + qY)/2);
                                drawArrow(ctx, imX - 5, imY - 30, wX - 5, wY + 30, viz.colors.green, 'inclusion', imX + 70, (imY + wY)/2);
                                drawArrow(ctx, qX + 30, qY, imX - 30, imY, viz.colors.green, '≅ (φ̄)', 280, qY - 20, true);

                            } else if (currentTheorem === 2) {
                                // Second Isomorphism Theorem
                                viz.screenText('Second Isomorphism Theorem: (S+T)/S ≅ T/(S∩T)', 280, 55, viz.colors.teal, 14, 'center');

                                const stX = 150, stY = 150;
                                const tX = 410, tY = 150;
                                const qstX = 150, qstY = 300;
                                const qtX = 410, qtY = 300;

                                viz.drawCircle(stX, stY, 35, viz.colors.blue + '44', viz.colors.blue);
                                viz.screenText('S + T', stX, stY, viz.colors.white, 14, 'center', 'middle');

                                viz.drawCircle(tX, tY, 35, viz.colors.purple + '44', viz.colors.purple);
                                viz.screenText('T', tX, tY, viz.colors.white, 20, 'center', 'middle');

                                viz.drawCircle(qstX, qstY, 35, viz.colors.orange + '44', viz.colors.orange);
                                viz.screenText('(S+T)/S', qstX, qstY, viz.colors.white, 11, 'center', 'middle');

                                viz.drawCircle(qtX, qtY, 35, viz.colors.green + '44', viz.colors.green);
                                viz.screenText('T/(S∩T)', qtX, qtY, viz.colors.white, 11, 'center', 'middle');

                                drawArrow(ctx, stX, stY + 35, qstX, qstY - 35, viz.colors.orange, 'π_S', stX - 40, (stY + qstY)/2);
                                drawArrow(ctx, tX, tY + 35, qtX, qtY - 35, viz.colors.green, 'π_{S∩T}', tX + 50, (tY + qtY)/2);
                                drawArrow(ctx, qstX + 30, qstY, qtX - 30, qtY, viz.colors.green, '≅', 280, qstY - 20, true);

                                viz.screenText('Both quotients have dimension dim(S+T) - dim(S) = dim(T) - dim(S∩T)', 280, 380, viz.colors.text, 12, 'center');

                            } else if (currentTheorem === 3) {
                                // Third Isomorphism Theorem
                                viz.screenText('Third Isomorphism Theorem: (V/S)/(T/S) ≅ V/T', 280, 55, viz.colors.teal, 14, 'center');

                                const vX = 280, vY = 120;
                                const vsX = 150, vsY = 240;
                                const vtX = 410, vtY = 240;
                                const qX = 150, qY = 360;

                                viz.drawCircle(vX, vY, 35, viz.colors.blue + '44', viz.colors.blue);
                                viz.screenText('V', vX, vY, viz.colors.white, 20, 'center', 'middle');

                                viz.drawCircle(vsX, vsY, 35, viz.colors.purple + '44', viz.colors.purple);
                                viz.screenText('V/S', vsX, vsY, viz.colors.white, 16, 'center', 'middle');

                                viz.drawCircle(vtX, vtY, 35, viz.colors.orange + '44', viz.colors.orange);
                                viz.screenText('V/T', vtX, vtY, viz.colors.white, 16, 'center', 'middle');

                                viz.drawCircle(qX, qY, 40, viz.colors.green + '44', viz.colors.green);
                                viz.screenText('(V/S)/(T/S)', qX, qY, viz.colors.white, 11, 'center', 'middle');

                                drawArrow(ctx, vX - 25, vY + 25, vsX + 20, vsY - 25, viz.colors.purple, 'π_S', (vX + vsX)/2 - 40, (vY + vsY)/2);
                                drawArrow(ctx, vX + 25, vY + 25, vtX - 20, vtY - 25, viz.colors.orange, 'π_T', (vX + vtX)/2 + 40, (vY + vtY)/2);
                                drawArrow(ctx, vsX, vsY + 35, qX, qY - 40, viz.colors.green, 'π_{T/S}', vsX - 50, (vsY + qY)/2);
                                drawArrow(ctx, qX + 35, qY - 10, vtX - 30, vtY + 20, viz.colors.green, '≅', (qX + vtX)/2, (qY + vtY)/2 + 20, true);

                                viz.screenText('Given S ⊆ T ⊆ V', 280, 410, viz.colors.text, 12, 'center');
                            }

                            function drawArrow(ctx, x1, y1, x2, y2, color, label, labelX, labelY, dashed = false) {
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2;
                                if (dashed) ctx.setLineDash([5, 3]);
                                ctx.beginPath();
                                ctx.moveTo(x1, y1);
                                ctx.lineTo(x2, y2);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                const angle = Math.atan2(y2 - y1, x2 - x1);
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.moveTo(x2, y2);
                                ctx.lineTo(x2 - 10 * Math.cos(angle - Math.PI/6), y2 - 10 * Math.sin(angle - Math.PI/6));
                                ctx.lineTo(x2 - 10 * Math.cos(angle + Math.PI/6), y2 - 10 * Math.sin(angle + Math.PI/6));
                                ctx.closePath();
                                ctx.fill();

                                viz.screenText(label, labelX, labelY, color, 13, 'center');
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove the rank-nullity theorem using the First Isomorphism Theorem: For \\(T: V \\to W\\), show that \\(\\dim(\\ker(T)) + \\dim(\\operatorname{im}(T)) = \\dim(V)\\).',
                    hint: 'Use \\(V/\\ker(T) \\cong \\operatorname{im}(T)\\) and apply dimension.',
                    solution: 'By the First Isomorphism Theorem, \\(\\dim(\\operatorname{im}(T)) = \\dim(V/\\ker(T)) = \\dim(V) - \\dim(\\ker(T))\\). Rearranging gives \\(\\dim(V) = \\dim(\\ker(T)) + \\dim(\\operatorname{im}(T))\\).'
                },
                {
                    question: 'Let \\(V = \\mathbb{R}^4\\), \\(S = \\operatorname{span}\\{e_1, e_2\\}\\), \\(T = \\operatorname{span}\\{e_2, e_3\\}\\). Compute \\(\\dim((S+T)/S)\\) and \\(\\dim(T/(S \\cap T))\\) and verify the Second Isomorphism Theorem.',
                    hint: 'Find \\(S + T\\) and \\(S \\cap T\\) first.',
                    solution: '\\(S \\cap T = \\operatorname{span}\\{e_2\\}\\) has dimension 1. \\(S + T = \\operatorname{span}\\{e_1, e_2, e_3\\}\\) has dimension 3. Thus \\(\\dim((S+T)/S) = 3 - 2 = 1\\) and \\(\\dim(T/(S \\cap T)) = 2 - 1 = 1\\). Both equal 1, confirming the isomorphism.'
                },
                {
                    question: 'Show that if \\(\\phi: V \\to W\\) is surjective, then \\(W \\cong V/\\ker(\\phi)\\).',
                    hint: 'What is \\(\\operatorname{im}(\\phi)\\) when \\(\\phi\\) is surjective?',
                    solution: 'If \\(\\phi\\) is surjective, then \\(\\operatorname{im}(\\phi) = W\\). By the First Isomorphism Theorem, \\(V/\\ker(\\phi) \\cong \\operatorname{im}(\\phi) = W\\).'
                }
            ]
        }
    ]
});
