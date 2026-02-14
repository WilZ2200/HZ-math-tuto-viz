window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch15'] = window.EXTRA_VIZ['ch15'] || {};

// Helper function: Compute convex hull using Gift Wrapping algorithm
function computeConvexHull(pts) {
    if (pts.length < 3) return pts;
    const hull = [];
    let pointOnHull = pts.reduce((min, p) => p[0] < min[0] ? p : min, pts[0]);
    let endpoint;
    do {
        hull.push(pointOnHull);
        endpoint = pts[0];
        for (let j = 1; j < pts.length; j++) {
            if (endpoint === pointOnHull ||
                cross2D(pointOnHull, endpoint, pts[j]) > 0) {
                endpoint = pts[j];
            }
        }
        pointOnHull = endpoint;
    } while (endpoint !== hull[0]);
    return hull;
}

function cross2D(o, a, b) {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

// Section: Convex Sets and Separation Theorems
window.EXTRA_VIZ['ch15']['ch15-sec01'] = [
    {
        id: 'ch15-extra-viz-1',
        title: 'Interactive Convex Hull Construction',
        description: 'Drag points around to see how the convex hull changes dynamically. Add or remove points to explore convex hull properties.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Initial points
            const initialPoints = [
                {x: -4, y: 2}, {x: -2, y: -2}, {x: 1, y: -3},
                {x: 4, y: -1}, {x: 3, y: 3}, {x: -1, y: 2.5}
            ];

            let points = initialPoints.map((p, i) =>
                viz.addDraggable(`p${i}`, p.x, p.y, viz.colors.blue, 8, () => draw())
            );

            let showInterior = true;
            let showVertices = true;

            const toggleInterior = VizEngine.createButton(controls, 'Toggle Interior Fill', () => {
                showInterior = !showInterior;
                draw();
            });

            const toggleVertices = VizEngine.createButton(controls, 'Toggle Vertex Highlight', () => {
                showVertices = !showVertices;
                draw();
            });

            const addPoint = VizEngine.createButton(controls, 'Add Random Point', () => {
                const x = (Math.random() - 0.5) * 10;
                const y = (Math.random() - 0.5) * 8;
                const newPoint = viz.addDraggable(`p${points.length}`, x, y, viz.colors.blue, 8, () => draw());
                points.push(newPoint);
                draw();
            });

            const removePoint = VizEngine.createButton(controls, 'Remove Last Point', () => {
                if (points.length > 3) {
                    points.pop();
                    draw();
                }
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                if (points.length >= 3) {
                    const coords = points.map(p => [p.x, p.y]);
                    const hull = computeConvexHull(coords);

                    // Draw convex hull
                    if (showInterior) {
                        viz.drawPolygon(hull, viz.colors.teal + '33', viz.colors.teal, 3);
                    } else {
                        viz.drawPolygon(hull, null, viz.colors.teal, 3);
                    }

                    // Highlight vertices on hull
                    if (showVertices) {
                        hull.forEach(([hx, hy]) => {
                            viz.drawPoint(hx, hy, viz.colors.orange, null, 10);
                        });
                    }

                    // Draw info
                    viz.drawText(`Convex Hull: ${hull.length} vertices`, -6, 4.5, viz.colors.white, 14);
                    viz.drawText(`Total points: ${points.length}`, -6, 4, viz.colors.text, 12);
                }

                // Draw all points
                points.forEach((p, i) => {
                    viz.drawPoint(p.x, p.y, viz.colors.blue, `p${i}`, 8);
                });

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch15-extra-viz-2',
        title: 'Separating Hyperplane Finder',
        description: 'Drag two sets of points (blue and red) and watch the hyperplane that separates them appear. Illustrates separation theorem for disjoint convex sets.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Blue set (left)
            const bluePoints = [
                viz.addDraggable('b1', -5, 2, viz.colors.blue, 8, () => draw()),
                viz.addDraggable('b2', -4, -1, viz.colors.blue, 8, () => draw()),
                viz.addDraggable('b3', -3, 1.5, viz.colors.blue, 8, () => draw())
            ];

            // Red set (right)
            const redPoints = [
                viz.addDraggable('r1', 2, 2, viz.colors.red, 8, () => draw()),
                viz.addDraggable('r2', 3, -1, viz.colors.red, 8, () => draw()),
                viz.addDraggable('r3', 4, 1, viz.colors.red, 8, () => draw())
            ];

            let showHulls = true;
            const toggleHulls = VizEngine.createButton(controls, 'Toggle Convex Hulls', () => {
                showHulls = !showHulls;
                draw();
            });

            function findSeparatingHyperplane(set1, set2) {
                // Find centroids
                const c1 = set1.reduce((acc, p) => ({x: acc.x + p.x, y: acc.y + p.y}), {x:0, y:0});
                c1.x /= set1.length; c1.y /= set1.length;

                const c2 = set2.reduce((acc, p) => ({x: acc.x + p.x, y: acc.y + p.y}), {x:0, y:0});
                c2.x /= set2.length; c2.y /= set2.length;

                // Normal vector perpendicular to line joining centroids
                const dx = c2.x - c1.x;
                const dy = c2.y - c1.y;
                const len = Math.sqrt(dx*dx + dy*dy);

                if (len < 0.01) return null;

                // Normal vector (perpendicular)
                const nx = -dy / len;
                const ny = dx / len;

                // Hyperplane passes through midpoint
                const mx = (c1.x + c2.x) / 2;
                const my = (c1.y + c2.y) / 2;

                // Hyperplane: nx*(x-mx) + ny*(y-my) = 0
                // Or: nx*x + ny*y = c where c = nx*mx + ny*my
                const c = nx * mx + ny * my;

                return {nx, ny, c, mx, my};
            }

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw hulls if enabled
                if (showHulls && bluePoints.length >= 3) {
                    const blueCoords = bluePoints.map(p => [p.x, p.y]);
                    const blueHull = computeConvexHull(blueCoords);
                    viz.drawPolygon(blueHull, viz.colors.blue + '22', viz.colors.blue, 2);
                }

                if (showHulls && redPoints.length >= 3) {
                    const redCoords = redPoints.map(p => [p.x, p.y]);
                    const redHull = computeConvexHull(redCoords);
                    viz.drawPolygon(redHull, viz.colors.red + '22', viz.colors.red, 2);
                }

                // Find and draw separating hyperplane
                const hyperplane = findSeparatingHyperplane(bluePoints, redPoints);
                if (hyperplane) {
                    const {nx, ny, c, mx, my} = hyperplane;

                    // Draw hyperplane as a line
                    // We need two points on the line nx*x + ny*y = c
                    if (Math.abs(ny) > 0.01) {
                        // Use x = -5 and x = 5
                        const y1 = (c - nx * (-5)) / ny;
                        const y2 = (c - nx * 5) / ny;
                        viz.drawLine(-5, y1, 5, y2, viz.colors.yellow, 2);
                    } else {
                        // Vertical line
                        const x0 = c / nx;
                        viz.drawLine(x0, -5, x0, 5, viz.colors.yellow, 2);
                    }

                    // Draw normal vector
                    viz.drawVector(mx, my, mx + nx*2, my + ny*2, viz.colors.orange, 'n', 2);

                    viz.drawText('Separating Hyperplane', -6, 4.5, viz.colors.yellow, 14);
                    viz.drawText(`Normal: (${nx.toFixed(2)}, ${ny.toFixed(2)})`, -6, 4, viz.colors.text, 12);
                }

                // Draw points
                bluePoints.forEach((p, i) => {
                    viz.drawPoint(p.x, p.y, viz.colors.blue, `b${i}`, 8);
                });
                redPoints.forEach((p, i) => {
                    viz.drawPoint(p.x, p.y, viz.colors.red, `r${i}`, 8);
                });

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch15-extra-viz-3',
        title: 'Supporting Hyperplane Explorer',
        description: 'Drag the normal vector to see different supporting hyperplanes of a convex set. Shows how supporting hyperplanes touch the boundary.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Create a fixed convex set
            const setPoints = [
                {x: -2, y: 3}, {x: 1, y: 2.5}, {x: 3, y: 1},
                {x: 2, y: -2}, {x: -1, y: -2.5}, {x: -3, y: 0}
            ];

            const hull = computeConvexHull(setPoints.map(p => [p.x, p.y]));

            // Draggable normal vector
            const normalHandle = viz.addDraggable('normal', 2, 2, viz.colors.orange, 10, () => draw());

            let angle = 0;
            const angleSlider = VizEngine.createSlider(controls, 'Angle', 0, 360, 45, 1, (val) => {
                angle = val;
                normalHandle.x = 3 * Math.cos(angle * Math.PI / 180);
                normalHandle.y = 3 * Math.sin(angle * Math.PI / 180);
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw convex set
                viz.drawPolygon(hull, viz.colors.teal + '33', viz.colors.teal, 3);

                // Normal vector direction
                const nx = normalHandle.x;
                const ny = normalHandle.y;
                const nlen = Math.sqrt(nx*nx + ny*ny);

                if (nlen > 0.1) {
                    const ux = nx / nlen;
                    const uy = ny / nlen;

                    // Find support point: max dot product with normal
                    let maxDot = -Infinity;
                    let supportPoint = hull[0];

                    hull.forEach(([px, py]) => {
                        const dot = px * ux + py * uy;
                        if (dot > maxDot) {
                            maxDot = dot;
                            supportPoint = [px, py];
                        }
                    });

                    // Draw supporting hyperplane through support point
                    // Hyperplane perpendicular to normal: ux*x + uy*y = c
                    const c = ux * supportPoint[0] + uy * supportPoint[1];

                    // Draw line
                    if (Math.abs(uy) > 0.01) {
                        const y1 = (c - ux * (-7)) / uy;
                        const y2 = (c - ux * 7) / uy;
                        viz.drawLine(-7, y1, 7, y2, viz.colors.yellow, 2);
                    } else {
                        const x0 = c / ux;
                        viz.drawLine(x0, -5, x0, 5, viz.colors.yellow, 2);
                    }

                    // Highlight support point
                    viz.drawPoint(supportPoint[0], supportPoint[1], viz.colors.orange, 'support', 10);

                    // Draw normal vector from origin
                    viz.drawVector(0, 0, ux*2, uy*2, viz.colors.orange, 'n', 2);

                    viz.drawText('Supporting Hyperplane', -6, 4.5, viz.colors.yellow, 14);
                    viz.drawText(`Support at (${supportPoint[0].toFixed(2)}, ${supportPoint[1].toFixed(2)})`,
                                -6, 4, viz.colors.text, 12);
                }

                // Draw original points
                setPoints.forEach(p => {
                    viz.drawPoint(p.x, p.y, viz.colors.teal + '88', null, 5);
                });

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch15-extra-viz-4',
        title: 'Farkas Lemma Visualizer',
        description: 'Interactive demonstration of Farkas lemma: either Ax=b has a positive solution, or there exists y with yᵀA≤0 and yᵀb>0. Drag to explore both cases.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // We work in 2D: matrix A has columns a1, a2
            const a1 = viz.addDraggable('a1', 3, 1, viz.colors.blue, 8, () => draw());
            const a2 = viz.addDraggable('a2', 1, 3, viz.colors.blue, 8, () => draw());
            const b = viz.addDraggable('b', 2, 2, viz.colors.red, 10, () => draw());

            let showCone = true;
            const toggleCone = VizEngine.createButton(controls, 'Toggle Positive Cone', () => {
                showCone = !showCone;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw the cone generated by a1, a2 (positive combinations)
                if (showCone) {
                    const conePoints = [];
                    for (let t1 = 0; t1 <= 5; t1 += 0.5) {
                        for (let t2 = 0; t2 <= 5; t2 += 0.5) {
                            const x = t1 * a1.x + t2 * a2.x;
                            const y = t1 * a1.y + t2 * a2.y;
                            conePoints.push([x, y]);
                        }
                    }
                    conePoints.forEach(([cx, cy]) => {
                        viz.drawPoint(cx, cy, viz.colors.blue + '11', null, 2);
                    });
                }

                // Check if b is in the cone (has positive solution)
                // Solve: t1*a1 + t2*a2 = b
                // [a1.x a2.x] [t1]   [b.x]
                // [a1.y a2.y] [t2] = [b.y]
                const det = a1.x * a2.y - a1.y * a2.x;

                let hasSolution = false;
                let t1 = 0, t2 = 0;
                let separatingY = null;

                if (Math.abs(det) > 0.01) {
                    t1 = (b.x * a2.y - b.y * a2.x) / det;
                    t2 = (a1.x * b.y - a1.y * b.x) / det;

                    if (t1 > 0 && t2 > 0) {
                        hasSolution = true;
                        // Draw solution
                        viz.drawVector(0, 0, t1 * a1.x, t1 * a1.y, viz.colors.blue + '88', null, 1);
                        viz.drawVector(t1 * a1.x, t1 * a1.y,
                                     t1 * a1.x + t2 * a2.x, t1 * a1.y + t2 * a2.y,
                                     viz.colors.blue + '88', null, 1);
                    } else {
                        // Find separating vector y
                        // We want y perpendicular to the cone containing a1, a2
                        // Simple heuristic: perpendicular to (a1+a2)
                        const avgX = (a1.x + a2.x) / 2;
                        const avgY = (a1.y + a2.y) / 2;

                        // Perpendicular vectors
                        let yX = -avgY;
                        let yY = avgX;

                        // Check signs and flip if needed
                        const dotB = yX * b.x + yY * b.y;
                        const dotA1 = yX * a1.x + yY * a1.y;
                        const dotA2 = yX * a2.x + yY * a2.y;

                        // We want yᵀb > 0 and yᵀa1 <= 0, yᵀa2 <= 0
                        if (dotB < 0) {
                            yX = -yX;
                            yY = -yY;
                        }

                        separatingY = {x: yX, y: yY};
                    }
                }

                // Draw column vectors
                viz.drawVector(0, 0, a1.x, a1.y, viz.colors.blue, 'a₁', 2);
                viz.drawVector(0, 0, a2.x, a2.y, viz.colors.blue, 'a₂', 2);
                viz.drawVector(0, 0, b.x, b.y, viz.colors.red, 'b', 3);

                if (hasSolution) {
                    viz.drawText('✓ Positive solution EXISTS', -6, 4.5, viz.colors.green, 14);
                    viz.drawText(`x = (${t1.toFixed(2)}, ${t2.toFixed(2)})`, -6, 4, viz.colors.text, 12);
                    viz.drawText('Farkas (1): Ax = b with x > 0', -6, 3.5, viz.colors.text, 11);
                } else {
                    viz.drawText('✗ No positive solution', -6, 4.5, viz.colors.red, 14);
                    if (separatingY) {
                        viz.drawVector(0, 0, separatingY.x, separatingY.y, viz.colors.yellow, 'y', 2);
                        viz.drawText('Farkas (2): yᵀA ≤ 0, yᵀb > 0', -6, 4, viz.colors.text, 11);
                    }
                }

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch15-extra-viz-5',
        title: 'Convex Combination Explorer',
        description: 'Use sliders to explore convex combinations of points. See how varying coefficients (that sum to 1) keeps results within the convex hull.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Three fixed points forming a triangle
            const points = [
                {x: -4, y: -2, color: viz.colors.blue, label: 'p₁'},
                {x: 4, y: -1, color: viz.colors.red, label: 'p₂'},
                {x: 0, y: 3, color: viz.colors.green, label: 'p₃'}
            ];

            let lambda1 = 0.33;
            let lambda2 = 0.33;
            let lambda3 = 0.34;

            const slider1 = VizEngine.createSlider(controls, 'λ₁', 0, 1, lambda1, 0.01, (val) => {
                lambda1 = val;
                // Normalize so sum = 1
                const sum = lambda1 + lambda2 + lambda3;
                if (sum > 0) {
                    lambda1 = val;
                    lambda2 = lambda2 * (1 - val) / (lambda2 + lambda3);
                    lambda3 = 1 - lambda1 - lambda2;
                }
                draw();
            });

            const slider2 = VizEngine.createSlider(controls, 'λ₂', 0, 1, lambda2, 0.01, (val) => {
                lambda2 = val;
                const sum = lambda1 + lambda2 + lambda3;
                if (sum > 0) {
                    lambda2 = val;
                    lambda3 = lambda3 * (1 - val) / (lambda1 + lambda3);
                    lambda1 = 1 - lambda2 - lambda3;
                }
                draw();
            });

            const slider3 = VizEngine.createSlider(controls, 'λ₃', 0, 1, lambda3, 0.01, (val) => {
                lambda3 = val;
                const sum = lambda1 + lambda2 + lambda3;
                if (sum > 0) {
                    lambda3 = val;
                    lambda1 = lambda1 * (1 - val) / (lambda1 + lambda2);
                    lambda2 = 1 - lambda1 - lambda3;
                }
                draw();
            });

            let showLines = true;
            const toggleLines = VizEngine.createButton(controls, 'Toggle Component Lines', () => {
                showLines = !showLines;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Normalize lambdas to sum to 1
                const sum = lambda1 + lambda2 + lambda3;
                const l1 = lambda1 / sum;
                const l2 = lambda2 / sum;
                const l3 = lambda3 / sum;

                // Compute convex combination
                const cx = l1 * points[0].x + l2 * points[1].x + l3 * points[2].x;
                const cy = l1 * points[0].y + l2 * points[1].y + l3 * points[2].y;

                // Draw convex hull (triangle)
                const hull = points.map(p => [p.x, p.y]);
                viz.drawPolygon(hull, viz.colors.purple + '22', viz.colors.purple, 2);

                // Draw lines from points to combination
                if (showLines) {
                    points.forEach(p => {
                        viz.drawSegment(p.x, p.y, cx, cy, viz.colors.text + '44', 1, true);
                    });
                }

                // Draw base points
                points.forEach(p => {
                    viz.drawPoint(p.x, p.y, p.color, p.label, 8);
                });

                // Draw convex combination point
                viz.drawPoint(cx, cy, viz.colors.yellow, 'c', 12);

                // Draw info
                viz.drawText(`c = ${l1.toFixed(2)}p₁ + ${l2.toFixed(2)}p₂ + ${l3.toFixed(2)}p₃`,
                           -6, 4.5, viz.colors.white, 13);
                viz.drawText(`Sum: ${l1.toFixed(2)} + ${l2.toFixed(2)} + ${l3.toFixed(2)} = ${(l1+l2+l3).toFixed(2)}`,
                           -6, 4, viz.colors.text, 11);
                viz.drawText(`Point: (${cx.toFixed(2)}, ${cy.toFixed(2)})`, -6, 3.5, viz.colors.text, 11);
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch15-extra-viz-6',
        title: 'Cone and Dual Cone Visualization',
        description: 'Explore a cone and its dual cone. Drag vectors to see how the dual cone (all vectors with non-negative inner product) changes.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Two generators of the cone
            const v1 = viz.addDraggable('v1', 3, 1, viz.colors.blue, 8, () => draw());
            const v2 = viz.addDraggable('v2', 1, 3, viz.colors.blue, 8, () => draw());

            let showDual = true;
            let showCone = true;

            const toggleCone = VizEngine.createButton(controls, 'Toggle Primal Cone', () => {
                showCone = !showCone;
                draw();
            });

            const toggleDual = VizEngine.createButton(controls, 'Toggle Dual Cone', () => {
                showDual = !showDual;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw primal cone K = {t1*v1 + t2*v2 : t1,t2 >= 0}
                if (showCone) {
                    for (let t1 = 0; t1 <= 6; t1 += 0.3) {
                        for (let t2 = 0; t2 <= 6; t2 += 0.3) {
                            const x = t1 * v1.x + t2 * v2.x;
                            const y = t1 * v1.y + t2 * v2.y;
                            viz.drawPoint(x, y, viz.colors.blue + '11', null, 2);
                        }
                    }
                }

                // Draw dual cone K* = {y : <y,v> >= 0 for all v in K}
                // For 2D cone generated by v1, v2: dual is cone orthogonal to both
                // Actually: dual cone is {y : y·v1 >= 0 and y·v2 >= 0}
                if (showDual) {
                    // Find perpendicular vectors
                    const perp1 = {x: -v1.y, y: v1.x}; // 90° rotation
                    const perp2 = {x: -v2.y, y: v2.x};

                    // Dual cone boundary rays
                    // The dual cone is bounded by perpendiculars to v1 and v2
                    // pointing into the half-space where dot products are positive

                    // Check orientation
                    const cross = v1.x * v2.y - v1.y * v2.x;

                    if (Math.abs(cross) > 0.01) {
                        // Dual cone generators (perpendiculars facing outward)
                        let d1x = perp1.x, d1y = perp1.y;
                        let d2x = perp2.x, d2y = perp2.y;

                        // Ensure perpendiculars point into the correct half-space
                        if (d1x * v2.x + d1y * v2.y < 0) {
                            d1x = -d1x; d1y = -d1y;
                        }
                        if (d2x * v1.x + d2y * v1.y < 0) {
                            d2x = -d2x; d2y = -d2y;
                        }

                        // Draw dual cone
                        for (let t1 = 0; t1 <= 6; t1 += 0.3) {
                            for (let t2 = 0; t2 <= 6; t2 += 0.3) {
                                const x = t1 * d1x + t2 * d2x;
                                const y = t1 * d1y + t2 * d2y;
                                // Verify it's in dual cone
                                if (x * v1.x + y * v1.y >= -0.01 && x * v2.x + y * v2.y >= -0.01) {
                                    viz.drawPoint(x, y, viz.colors.orange + '11', null, 2);
                                }
                            }
                        }

                        // Draw boundary rays of dual cone
                        viz.drawVector(0, 0, d1x * 2, d1y * 2, viz.colors.orange, null, 2);
                        viz.drawVector(0, 0, d2x * 2, d2y * 2, viz.colors.orange, null, 2);
                    }
                }

                // Draw generators
                viz.drawVector(0, 0, v1.x, v1.y, viz.colors.blue, 'v₁', 3);
                viz.drawVector(0, 0, v2.x, v2.y, viz.colors.blue, 'v₂', 3);

                viz.drawText('Cone K (blue) and Dual K* (orange)', -6, 4.5, viz.colors.white, 13);
                viz.drawText('K* = {y : ⟨y,v⟩ ≥ 0 for all v ∈ K}', -6, 4, viz.colors.text, 11);

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch15-extra-viz-7',
        title: 'Strict vs Strong Separation',
        description: 'Compare strict separation (open half-spaces) and strong separation (positive distance). Drag sets to see when each type applies.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            // Two small convex sets
            const set1Center = viz.addDraggable('c1', -3, 0, viz.colors.blue, 10, () => draw());
            const set2Center = viz.addDraggable('c2', 3, 0, viz.colors.red, 10, () => draw());

            let radius1 = 1.5;
            let radius2 = 1.5;

            const slider1 = VizEngine.createSlider(controls, 'Set 1 Radius', 0.5, 3, radius1, 0.1, (val) => {
                radius1 = val;
                draw();
            });

            const slider2 = VizEngine.createSlider(controls, 'Set 2 Radius', 0.5, 3, radius2, 0.1, (val) => {
                radius2 = val;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw circles representing convex sets
                viz.drawCircle(set1Center.x, set1Center.y, radius1, viz.colors.blue + '33', viz.colors.blue, 2);
                viz.drawCircle(set2Center.x, set2Center.y, radius2, viz.colors.red + '33', viz.colors.red, 2);

                // Compute distance between sets
                const dx = set2Center.x - set1Center.x;
                const dy = set2Center.y - set1Center.y;
                const centerDist = Math.sqrt(dx*dx + dy*dy);
                const minDist = centerDist - radius1 - radius2;

                // Direction vector
                const ux = dx / centerDist;
                const uy = dy / centerDist;

                if (minDist > 0.1) {
                    // Strong separation: positive distance
                    // Draw separating line in middle of gap
                    const midX = set1Center.x + ux * (radius1 + minDist/2);
                    const midY = set1Center.y + uy * (radius1 + minDist/2);

                    // Perpendicular to direction
                    const px = -uy;
                    const py = ux;

                    viz.drawLine(midX - px*5, midY - py*5, midX + px*5, midY + py*5,
                               viz.colors.green, 3);

                    // Draw normal
                    viz.drawVector(midX, midY, midX + ux, midY + uy, viz.colors.yellow, 'n', 2);

                    viz.drawText('STRONG SEPARATION', -6, 4.5, viz.colors.green, 14);
                    viz.drawText(`Distance: ${minDist.toFixed(2)} > 0`, -6, 4, viz.colors.text, 12);

                    // Draw distance indicators
                    const p1x = set1Center.x + ux * radius1;
                    const p1y = set1Center.y + uy * radius1;
                    const p2x = set2Center.x - ux * radius2;
                    const p2y = set2Center.y - uy * radius2;
                    viz.drawSegment(p1x, p1y, p2x, p2y, viz.colors.yellow, 2, false);
                    viz.drawPoint(p1x, p1y, viz.colors.yellow, null, 5);
                    viz.drawPoint(p2x, p2y, viz.colors.yellow, null, 5);

                } else if (minDist > -0.1) {
                    // Strict separation: just touching or very close
                    const midX = (set1Center.x + set2Center.x) / 2;
                    const midY = (set1Center.y + set2Center.y) / 2;

                    const px = -uy;
                    const py = ux;

                    viz.drawLine(midX - px*5, midY - py*5, midX + px*5, midY + py*5,
                               viz.colors.yellow, 2);

                    viz.drawText('STRICT SEPARATION', -6, 4.5, viz.colors.yellow, 14);
                    viz.drawText('(touching or ε-close)', -6, 4, viz.colors.text, 12);

                } else {
                    // Overlapping - no separation
                    viz.drawText('OVERLAPPING - No Separation', -6, 4.5, viz.colors.red, 14);
                    viz.drawText('Move sets apart to separate', -6, 4, viz.colors.text, 12);
                }

                viz.drawDraggables();
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch15-extra-viz-8',
        title: 'Positive Orthant and Its Dual',
        description: 'Visualize the positive orthant cone and understand its self-dual property: the dual of the positive orthant is itself.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 560, height: 400, scale: 40});

            let showTest = false;
            const testPoint = viz.addDraggable('test', 2, 2, viz.colors.yellow, 10, () => draw());

            const toggleTest = VizEngine.createButton(controls, 'Toggle Test Point', () => {
                showTest = !showTest;
                draw();
            });

            function draw() {
                viz.clear();
                viz.drawGrid();
                viz.drawAxes();

                // Draw positive orthant R+^2
                const gridSize = 7;
                for (let x = 0; x <= gridSize; x += 0.3) {
                    for (let y = 0; y <= gridSize; y += 0.3) {
                        viz.drawPoint(x, y, viz.colors.teal + '11', null, 2);
                    }
                }

                // Draw boundary rays
                viz.drawVector(0, 0, 6, 0, viz.colors.teal, null, 3);
                viz.drawVector(0, 0, 0, 5, viz.colors.teal, null, 3);

                // Standard basis vectors
                viz.drawVector(0, 0, 1, 0, viz.colors.blue, 'e₁', 2);
                viz.drawVector(0, 0, 0, 1, viz.colors.blue, 'e₂', 2);

                viz.drawText('Positive Orthant: ℝ₊² = {(x,y) : x≥0, y≥0}', -6, 4.5, viz.colors.teal, 13);
                viz.drawText('Self-dual: (ℝ₊²)* = ℝ₊²', -6, 4, viz.colors.text, 11);

                if (showTest) {
                    viz.drawPoint(testPoint.x, testPoint.y, viz.colors.yellow, 'p', 10);

                    const inCone = testPoint.x >= 0 && testPoint.y >= 0;

                    if (inCone) {
                        viz.drawText(`✓ p ∈ ℝ₊²: (${testPoint.x.toFixed(2)}, ${testPoint.y.toFixed(2)})`,
                                   -6, 3.5, viz.colors.green, 11);

                        // Show that it satisfies dual condition
                        viz.drawText('⟨p,e₁⟩ ≥ 0 and ⟨p,e₂⟩ ≥ 0 ✓', -6, 3, viz.colors.text, 10);
                    } else {
                        viz.drawText(`✗ p ∉ ℝ₊²: (${testPoint.x.toFixed(2)}, ${testPoint.y.toFixed(2)})`,
                                   -6, 3.5, viz.colors.red, 11);
                    }

                    viz.drawDraggables();
                }
            }

            draw();
            return viz;
        }
    }
];
