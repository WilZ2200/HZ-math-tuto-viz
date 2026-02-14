// Extra Interactive Visualizations for Chapter 19: The Umbral Calculus
// Steven Roman's Advanced Linear Algebra

window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch19'] = window.EXTRA_VIZ['ch19'] || {};

// Section 1: Introduction to Umbral Calculus
window.EXTRA_VIZ['ch19']['ch19-sec01'] = [
    {
        id: 'ch19-extra-viz-1',
        title: 'Interactive: Bernoulli Polynomial Family Explorer',
        description: 'Explore the Bernoulli polynomials B_n(x), which form an Appell sequence. These polynomials appear in the Euler-MacLaurin expansion and are fundamental in umbral calculus.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 700, height: 450, scale: 60});

            let degree = 3;
            let showDerivatives = false;

            // Bernoulli numbers (first few)
            const bernoulliNumbers = [1, -1/2, 1/6, 0, -1/30, 0, 1/42, 0, -1/30, 0, 5/66];

            // Binomial coefficient
            function binomial(n, k) {
                if (k < 0 || k > n) return 0;
                if (k === 0 || k === n) return 1;
                let result = 1;
                for (let i = 0; i < k; i++) {
                    result *= (n - i) / (i + 1);
                }
                return result;
            }

            // Bernoulli polynomial B_n(x) = sum_{k=0}^n C(n,k) * B_k * x^(n-k)
            function bernoulliPoly(n, x) {
                let sum = 0;
                for (let k = 0; k <= n && k < bernoulliNumbers.length; k++) {
                    sum += binomial(n, k) * bernoulliNumbers[k] * Math.pow(x, n - k);
                }
                return sum;
            }

            // Derivative of Bernoulli polynomial: B_n'(x) = n * B_{n-1}(x)
            function bernoulliPolyDerivative(n, x) {
                if (n === 0) return 0;
                return n * bernoulliPoly(n - 1, x);
            }

            const sliderN = VizEngine.createSlider(controls, 'Degree n', 0, 7, degree, 1, (val) => {
                degree = val;
                draw();
            });

            const checkboxDiv = document.createElement('div');
            checkboxDiv.style.marginTop = '10px';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = showDerivatives;
            checkbox.addEventListener('change', (e) => {
                showDerivatives = e.target.checked;
                draw();
            });
            const label = document.createElement('label');
            label.textContent = ' Show derivative B\'_n(x) = n·B_{n-1}(x)';
            label.style.color = viz.colors.text;
            checkboxDiv.appendChild(checkbox);
            checkboxDiv.appendChild(label);
            controls.appendChild(checkboxDiv);

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            infoDiv.style.color = viz.colors.text;
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid(0.5);
                viz.drawAxes();

                // Draw the Bernoulli polynomial
                const points = [];
                for (let x = -5; x <= 5; x += 0.02) {
                    const y = bernoulliPoly(degree, x);
                    if (Math.abs(y) < 15) {
                        points.push([x, y]);
                    }
                }

                // Draw curve
                if (points.length > 1) {
                    for (let i = 0; i < points.length - 1; i++) {
                        viz.drawSegment(points[i][0], points[i][1],
                                      points[i+1][0], points[i+1][1],
                                      viz.colors.blue, 3);
                    }
                }

                // Draw derivative if enabled
                if (showDerivatives && degree > 0) {
                    const derivPoints = [];
                    for (let x = -5; x <= 5; x += 0.02) {
                        const y = bernoulliPolyDerivative(degree, x);
                        if (Math.abs(y) < 15) {
                            derivPoints.push([x, y]);
                        }
                    }

                    if (derivPoints.length > 1) {
                        for (let i = 0; i < derivPoints.length - 1; i++) {
                            viz.drawSegment(derivPoints[i][0], derivPoints[i][1],
                                          derivPoints[i+1][0], derivPoints[i+1][1],
                                          viz.colors.orange, 2, true);
                        }
                    }
                }

                // Mark special points at x = 0 and x = 1
                const y0 = bernoulliPoly(degree, 0);
                const y1 = bernoulliPoly(degree, 1);
                if (Math.abs(y0) < 15) {
                    viz.drawPoint(0, y0, viz.colors.green, 'B_' + degree + '(0)', 6);
                }
                if (Math.abs(y1) < 15) {
                    viz.drawPoint(1, y1, viz.colors.pink, 'B_' + degree + '(1)', 6);
                }

                // Info display
                let info = `<span style="color: ${viz.colors.blue}">B_${degree}(x)</span>`;
                if (showDerivatives && degree > 0) {
                    info += ` &nbsp; <span style="color: ${viz.colors.orange}">--- B'_${degree}(x) = ${degree}·B_${degree-1}(x)</span>`;
                }
                info += `<br>B_${degree}(0) = ${y0.toFixed(4)} &nbsp; B_${degree}(1) = ${y1.toFixed(4)}`;
                info += `<br><i>Appell sequence property: B'_n(x) = n·B_{n-1}(x)</i>`;
                infoDiv.innerHTML = info;
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch19-extra-viz-2',
        title: 'Interactive: Shift Operator E^a Animation',
        description: 'Visualize the shift operator E^a acting on polynomials: (E^a f)(x) = f(x+a). Watch how polynomials translate horizontally under this umbral operator.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 700, height: 450, scale: 50});

            let shiftAmount = 1.0;
            let animating = false;
            let animTime = 0;
            let polyType = 'quadratic';

            // Define test polynomials
            const polynomials = {
                'linear': (x) => x,
                'quadratic': (x) => 0.3 * x * x - 0.5 * x + 1,
                'cubic': (x) => 0.1 * x * x * x - 0.3 * x * x + 0.2,
                'quartic': (x) => 0.05 * x * x * x * x - 0.2 * x * x + 0.5
            };

            const sliderShift = VizEngine.createSlider(controls, 'Shift amount a', -3, 3, shiftAmount, 0.1, (val) => {
                shiftAmount = val;
                if (!animating) draw();
            });

            const selectDiv = document.createElement('div');
            selectDiv.style.marginTop = '10px';
            const selectLabel = document.createElement('label');
            selectLabel.textContent = 'Polynomial: ';
            selectLabel.style.color = viz.colors.text;
            const select = document.createElement('select');
            select.style.padding = '5px';
            ['linear', 'quadratic', 'cubic', 'quartic'].forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type;
                if (type === polyType) option.selected = true;
                select.appendChild(option);
            });
            select.addEventListener('change', (e) => {
                polyType = e.target.value;
                if (!animating) draw();
            });
            selectDiv.appendChild(selectLabel);
            selectDiv.appendChild(select);
            controls.appendChild(selectDiv);

            const btnAnimate = VizEngine.createButton(controls, 'Animate Shift', () => {
                animating = !animating;
                btnAnimate.textContent = animating ? 'Stop Animation' : 'Animate Shift';
                if (animating) {
                    animTime = 0;
                    animate();
                }
            });

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            infoDiv.style.color = viz.colors.text;
            controls.appendChild(infoDiv);

            function drawPoly(f, shift, color, lineWidth) {
                const points = [];
                for (let x = -7; x <= 7; x += 0.05) {
                    const y = f(x - shift);
                    if (Math.abs(y) < 10) {
                        points.push([x, y]);
                    }
                }

                if (points.length > 1) {
                    for (let i = 0; i < points.length - 1; i++) {
                        viz.drawSegment(points[i][0], points[i][1],
                                      points[i+1][0], points[i+1][1],
                                      color, lineWidth);
                    }
                }
            }

            function draw(currentShift = shiftAmount) {
                viz.clear();
                viz.drawGrid(1);
                viz.drawAxes();

                const f = polynomials[polyType];

                // Draw original function f(x)
                drawPoly(f, 0, viz.colors.blue + '88', 2);

                // Draw shifted function (E^a f)(x) = f(x+a) = f evaluated at x - (-a)
                drawPoly(f, -currentShift, viz.colors.orange, 3);

                // Show the transformation visually with vertical guide lines
                const testX = 0;
                const y0 = f(testX);
                const y1 = f(testX + currentShift);

                if (Math.abs(y0) < 10 && Math.abs(y1) < 10) {
                    viz.drawSegment(testX, -10, testX, 10, viz.colors.green + '33', 1, true);
                    viz.drawSegment(testX + currentShift, -10, testX + currentShift, 10,
                                  viz.colors.pink + '33', 1, true);
                    viz.drawPoint(testX, y0, viz.colors.blue, null, 5);
                    viz.drawPoint(testX + currentShift, y1, viz.colors.orange, null, 5);
                }

                // Info
                infoDiv.innerHTML = `<span style="color: ${viz.colors.blue}">f(x)</span> &nbsp;&nbsp; ` +
                    `<span style="color: ${viz.colors.orange}">(E^{${currentShift.toFixed(1)}} f)(x) = f(x + ${currentShift.toFixed(1)})</span><br>` +
                    `Shift operator translates the graph horizontally by ${currentShift.toFixed(1)} units.`;
            }

            function animate() {
                if (!animating) return;

                animTime += 0.02;
                const currentShift = shiftAmount * Math.sin(animTime);
                draw(currentShift);

                requestAnimationFrame(animate);
            }

            draw();
            return viz;
        }
    }
];

// Section 2: Delta operators and Sheffer sequences
window.EXTRA_VIZ['ch19']['ch19-sec02'] = [
    {
        id: 'ch19-extra-viz-3',
        title: 'Interactive: Delta Operator Comparison',
        description: 'Compare the forward difference operator Δf(x) = f(x+1) - f(x) with the derivative operator Df(x) = f\'(x). Both are delta operators with different kernels.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 700, height: 450, scale: 40});

            let showForward = true;
            let showDerivative = true;
            let polyCoeffs = [0.5, 0, 0.3, -0.1]; // a_0 + a_1*x + a_2*x^2 + a_3*x^3

            function evalPoly(coeffs, x) {
                let sum = 0;
                for (let i = 0; i < coeffs.length; i++) {
                    sum += coeffs[i] * Math.pow(x, i);
                }
                return sum;
            }

            function evalDerivative(coeffs, x) {
                let sum = 0;
                for (let i = 1; i < coeffs.length; i++) {
                    sum += i * coeffs[i] * Math.pow(x, i - 1);
                }
                return sum;
            }

            function evalForwardDiff(coeffs, x, h = 1) {
                return evalPoly(coeffs, x + h) - evalPoly(coeffs, x);
            }

            const checkDiv1 = document.createElement('div');
            checkDiv1.style.marginTop = '5px';
            const check1 = document.createElement('input');
            check1.type = 'checkbox';
            check1.checked = showForward;
            check1.addEventListener('change', (e) => {
                showForward = e.target.checked;
                draw();
            });
            const label1 = document.createElement('label');
            label1.innerHTML = ' <span style="color: ' + viz.colors.orange + '">Show Δf(x) = f(x+1) - f(x)</span>';
            checkDiv1.appendChild(check1);
            checkDiv1.appendChild(label1);
            controls.appendChild(checkDiv1);

            const checkDiv2 = document.createElement('div');
            checkDiv2.style.marginTop = '5px';
            const check2 = document.createElement('input');
            check2.type = 'checkbox';
            check2.checked = showDerivative;
            check2.addEventListener('change', (e) => {
                showDerivative = e.target.checked;
                draw();
            });
            const label2 = document.createElement('label');
            label2.innerHTML = ' <span style="color: ' + viz.colors.green + '">Show Df(x) = f\'(x)</span>';
            checkDiv2.appendChild(check2);
            checkDiv2.appendChild(label2);
            controls.appendChild(checkDiv2);

            const coeffInputs = [];
            for (let i = 0; i < 4; i++) {
                const div = document.createElement('div');
                div.style.marginTop = '5px';
                const label = document.createElement('label');
                label.textContent = `a_${i}: `;
                label.style.color = viz.colors.text;
                label.style.width = '30px';
                label.style.display = 'inline-block';
                const input = document.createElement('input');
                input.type = 'number';
                input.step = '0.1';
                input.value = polyCoeffs[i];
                input.style.width = '60px';
                input.addEventListener('input', (e) => {
                    polyCoeffs[i] = parseFloat(e.target.value) || 0;
                    draw();
                });
                coeffInputs.push(input);
                div.appendChild(label);
                div.appendChild(input);
                controls.appendChild(div);
            }

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            infoDiv.style.color = viz.colors.text;
            controls.appendChild(infoDiv);

            function drawCurve(evalFunc, color, lineWidth) {
                const points = [];
                for (let x = -7; x <= 7; x += 0.05) {
                    const y = evalFunc(x);
                    if (Math.abs(y) < 12 && !isNaN(y)) {
                        points.push([x, y]);
                    }
                }

                if (points.length > 1) {
                    for (let i = 0; i < points.length - 1; i++) {
                        viz.drawSegment(points[i][0], points[i][1],
                                      points[i+1][0], points[i+1][1],
                                      color, lineWidth);
                    }
                }
            }

            function draw() {
                viz.clear();
                viz.drawGrid(1);
                viz.drawAxes();

                // Draw original polynomial
                drawCurve((x) => evalPoly(polyCoeffs, x), viz.colors.blue, 3);

                // Draw forward difference
                if (showForward) {
                    drawCurve((x) => evalForwardDiff(polyCoeffs, x), viz.colors.orange, 2);
                }

                // Draw derivative
                if (showDerivative) {
                    drawCurve((x) => evalDerivative(polyCoeffs, x), viz.colors.green, 2);
                }

                // Build polynomial string
                let polyStr = '';
                for (let i = polyCoeffs.length - 1; i >= 0; i--) {
                    if (Math.abs(polyCoeffs[i]) > 0.001) {
                        if (polyStr && polyCoeffs[i] > 0) polyStr += ' + ';
                        if (i === 0) {
                            polyStr += polyCoeffs[i].toFixed(2);
                        } else if (i === 1) {
                            polyStr += polyCoeffs[i].toFixed(2) + 'x';
                        } else {
                            polyStr += polyCoeffs[i].toFixed(2) + 'x^' + i;
                        }
                    }
                }
                if (!polyStr) polyStr = '0';

                let info = `<span style="color: ${viz.colors.blue}">f(x) = ${polyStr}</span><br>`;
                if (showForward) {
                    info += `<span style="color: ${viz.colors.orange}">Δf(x) = f(x+1) - f(x)</span> (forward difference)<br>`;
                }
                if (showDerivative) {
                    info += `<span style="color: ${viz.colors.green}">Df(x) = f'(x)</span> (derivative)<br>`;
                }
                info += `<i>Both are delta operators: Q(const) = 0, Q(x) ≠ 0</i>`;

                infoDiv.innerHTML = info;
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch19-extra-viz-4',
        title: 'Interactive: Sheffer Sequence Plotter',
        description: 'Explore Sheffer sequences, which generalize both associated sequences (binomial type) and Appell sequences. Adjust parameters to see different polynomial families.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 700, height: 450, scale: 50});

            let degree = 3;
            let sequenceType = 'hermite';

            // Factorial
            function factorial(n) {
                if (n <= 1) return 1;
                return n * factorial(n - 1);
            }

            // Hermite polynomials H_n(x) (physicist's)
            function hermitePoly(n, x) {
                if (n === 0) return 1;
                if (n === 1) return 2 * x;
                return 2 * x * hermitePoly(n - 1, x) - 2 * (n - 1) * hermitePoly(n - 2, x);
            }

            // Laguerre polynomials L_n(x)
            function laguerrePoly(n, x) {
                if (n === 0) return 1;
                if (n === 1) return 1 - x;
                return ((2 * n - 1 - x) * laguerrePoly(n - 1, x) - (n - 1) * laguerrePoly(n - 2, x)) / n;
            }

            // Lower factorial (falling factorial) x_(n) = x(x-1)...(x-n+1)
            function lowerFactorial(n, x) {
                let result = 1;
                for (let i = 0; i < n; i++) {
                    result *= (x - i);
                }
                return result;
            }

            // Abel polynomial A_n(x,a) = x(x-na)^(n-1), we use a=1
            function abelPoly(n, x, a = 1) {
                if (n === 0) return 1;
                return x * Math.pow(x - n * a, n - 1);
            }

            const sequences = {
                'hermite': {
                    name: 'Hermite H_n(x)',
                    func: hermitePoly,
                    info: 'Appell sequence for Q(t) = t^2/2'
                },
                'laguerre': {
                    name: 'Laguerre L_n(x)',
                    func: laguerrePoly,
                    info: 'Sheffer for pair ((1-t)^(-1), t/(1-t))'
                },
                'falling': {
                    name: 'Falling factorial x_(n)',
                    func: lowerFactorial,
                    info: 'Associated sequence for Δ (binomial type)'
                },
                'abel': {
                    name: 'Abel A_n(x,1)',
                    func: abelPoly,
                    info: 'Associated sequence for Q(t) = te^t'
                }
            };

            const sliderN = VizEngine.createSlider(controls, 'Degree n', 0, 6, degree, 1, (val) => {
                degree = val;
                draw();
            });

            const selectDiv = document.createElement('div');
            selectDiv.style.marginTop = '10px';
            const selectLabel = document.createElement('label');
            selectLabel.textContent = 'Sequence: ';
            selectLabel.style.color = viz.colors.text;
            const select = document.createElement('select');
            select.style.padding = '5px';
            Object.keys(sequences).forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = sequences[type].name;
                if (type === sequenceType) option.selected = true;
                select.appendChild(option);
            });
            select.addEventListener('change', (e) => {
                sequenceType = e.target.value;
                draw();
            });
            selectDiv.appendChild(selectLabel);
            selectDiv.appendChild(select);
            controls.appendChild(selectDiv);

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            infoDiv.style.color = viz.colors.text;
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid(0.5);
                viz.drawAxes();

                const seq = sequences[sequenceType];
                const polyFunc = seq.func;

                // Draw multiple polynomials of lower degree for context
                for (let d = 0; d <= degree; d++) {
                    const points = [];
                    const alpha = 0.3 + 0.7 * (d / Math.max(degree, 1));
                    const color = d === degree ? viz.colors.blue : viz.colors.teal + '66';
                    const lineWidth = d === degree ? 3 : 1.5;

                    for (let x = -5; x <= 5; x += 0.05) {
                        const y = polyFunc(d, x);
                        if (Math.abs(y) < 12 && !isNaN(y) && isFinite(y)) {
                            points.push([x, y]);
                        }
                    }

                    if (points.length > 1) {
                        for (let i = 0; i < points.length - 1; i++) {
                            viz.drawSegment(points[i][0], points[i][1],
                                          points[i+1][0], points[i+1][1],
                                          color, lineWidth);
                        }
                    }
                }

                // Highlight specific points
                const testPoints = [0, 1, 2];
                testPoints.forEach(x => {
                    const y = polyFunc(degree, x);
                    if (Math.abs(y) < 12 && !isNaN(y) && isFinite(y)) {
                        viz.drawPoint(x, y, viz.colors.orange, null, 5);
                    }
                });

                infoDiv.innerHTML = `<span style="color: ${viz.colors.blue}">${seq.name}</span> with degree n = ${degree}<br>` +
                    `${seq.info}<br>` +
                    `<i>Lighter curves show lower degrees for comparison</i>`;
            }

            draw();
            return viz;
        }
    }
];

// Section 3: Advanced operators
window.EXTRA_VIZ['ch19']['ch19-sec03'] = [
    {
        id: 'ch19-extra-viz-5',
        title: 'Interactive: Abel Polynomial Visualization',
        description: 'Explore Abel polynomials A_n(x,a) = x(x-na)^(n-1), which form the associated sequence for the Abel functional Q(t) = te^t. Adjust the parameter a.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 700, height: 450, scale: 40});

            let degree = 3;
            let paramA = 1.0;

            function abelPoly(n, x, a) {
                if (n === 0) return 1;
                if (n === 1) return x;
                return x * Math.pow(x - n * a, n - 1);
            }

            const sliderN = VizEngine.createSlider(controls, 'Degree n', 0, 5, degree, 1, (val) => {
                degree = val;
                draw();
            });

            const sliderA = VizEngine.createSlider(controls, 'Parameter a', -2, 2, paramA, 0.1, (val) => {
                paramA = val;
                draw();
            });

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            infoDiv.style.color = viz.colors.text;
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid(1);
                viz.drawAxes();

                // Draw the Abel polynomial
                const points = [];
                for (let x = -7; x <= 7; x += 0.03) {
                    const y = abelPoly(degree, x, paramA);
                    if (Math.abs(y) < 15 && !isNaN(y) && isFinite(y)) {
                        points.push([x, y]);
                    }
                }

                if (points.length > 1) {
                    for (let i = 0; i < points.length - 1; i++) {
                        viz.drawSegment(points[i][0], points[i][1],
                                      points[i+1][0], points[i+1][1],
                                      viz.colors.blue, 3);
                    }
                }

                // Mark the critical points x = n*a (where the factor (x-na) vanishes)
                if (degree > 0) {
                    const criticalX = degree * paramA;
                    if (Math.abs(criticalX) < 7) {
                        viz.drawSegment(criticalX, -15, criticalX, 15,
                                      viz.colors.red + '44', 2, true);
                        viz.drawText('x = na', criticalX, -11, viz.colors.red, 12);
                    }
                }

                // Mark zeros
                const zeros = [0];
                if (degree > 0) {
                    zeros.push(degree * paramA);
                }
                zeros.forEach(x => {
                    if (Math.abs(x) < 7) {
                        viz.drawPoint(x, 0, viz.colors.green, null, 6);
                    }
                });

                infoDiv.innerHTML = `<span style="color: ${viz.colors.blue}">A_${degree}(x, ${paramA.toFixed(1)}) = ` +
                    `x(x - ${degree}·${paramA.toFixed(1)})^${degree > 0 ? degree - 1 : 0}</span><br>` +
                    `Associated sequence for Abel delta operator Q(t) = te^t<br>` +
                    (degree > 0 ? `Zero at x = ${(degree * paramA).toFixed(2)} of multiplicity ${degree - 1}<br>` : '') +
                    `<i>Used in tree enumeration and combinatorics</i>`;
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch19-extra-viz-6',
        title: 'Interactive: Laguerre Polynomial Explorer',
        description: 'Explore Laguerre polynomials L_n(x), which form a Sheffer sequence. These appear in quantum mechanics and the study of the hydrogen atom.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 700, height: 450, scale: 35});

            let degree = 3;
            let showZeros = true;

            // Laguerre polynomial using recurrence relation
            function laguerrePoly(n, x) {
                if (n === 0) return 1;
                if (n === 1) return 1 - x;

                let L_prev2 = 1;
                let L_prev1 = 1 - x;
                let L_curr = 0;

                for (let k = 2; k <= n; k++) {
                    L_curr = ((2 * k - 1 - x) * L_prev1 - (k - 1) * L_prev2) / k;
                    L_prev2 = L_prev1;
                    L_prev1 = L_curr;
                }

                return L_curr;
            }

            // Numerical root finding (simple bisection for display purposes)
            function findZeros(n, maxX = 15) {
                const zeros = [];
                const step = 0.1;

                for (let x = 0; x < maxX; x += step) {
                    const y1 = laguerrePoly(n, x);
                    const y2 = laguerrePoly(n, x + step);

                    if (y1 * y2 < 0 || Math.abs(y1) < 0.01) {
                        zeros.push(x);
                    }
                }

                return zeros;
            }

            const sliderN = VizEngine.createSlider(controls, 'Degree n', 0, 6, degree, 1, (val) => {
                degree = val;
                draw();
            });

            const checkDiv = document.createElement('div');
            checkDiv.style.marginTop = '10px';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = showZeros;
            checkbox.addEventListener('change', (e) => {
                showZeros = e.target.checked;
                draw();
            });
            const label = document.createElement('label');
            label.textContent = ' Show zeros (eigenvalues in QM)';
            label.style.color = viz.colors.text;
            checkDiv.appendChild(checkbox);
            checkDiv.appendChild(label);
            controls.appendChild(checkDiv);

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            infoDiv.style.color = viz.colors.text;
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid(1);
                viz.drawAxes();

                // Draw the Laguerre polynomial
                const points = [];
                for (let x = -2; x <= 15; x += 0.03) {
                    const y = laguerrePoly(degree, x);
                    if (Math.abs(y) < 12 && !isNaN(y) && isFinite(y)) {
                        points.push([x, y]);
                    }
                }

                if (points.length > 1) {
                    for (let i = 0; i < points.length - 1; i++) {
                        viz.drawSegment(points[i][0], points[i][1],
                                      points[i+1][0], points[i+1][1],
                                      viz.colors.blue, 3);
                    }
                }

                // Draw zeros
                if (showZeros && degree > 0) {
                    const zeros = findZeros(degree);
                    zeros.forEach((z, idx) => {
                        if (Math.abs(z) < 15) {
                            viz.drawPoint(z, 0, viz.colors.orange, `z_${idx}`, 6);
                            viz.drawSegment(z, -12, z, 12, viz.colors.orange + '22', 1, true);
                        }
                    });
                }

                // Highlight L_n(0)
                const y0 = laguerrePoly(degree, 0);
                if (Math.abs(y0) < 12) {
                    viz.drawPoint(0, y0, viz.colors.green, 'L_n(0)=1', 6);
                }

                infoDiv.innerHTML = `<span style="color: ${viz.colors.blue}">L_${degree}(x)</span> - Laguerre polynomial<br>` +
                    `L_${degree}(0) = 1, has ${degree} real positive zeros<br>` +
                    `Recurrence: (k+1)L_{k+1} = (2k+1-x)L_k - kL_{k-1}<br>` +
                    `<i>Sheffer sequence for pair ((1-t)^(-1), t/(1-t))</i>`;
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch19-extra-viz-7',
        title: 'Interactive: Umbral Composition Visualizer',
        description: 'Visualize umbral composition of associated sequences. If p_n and q_n are associated sequences, their composition forms a group structure central to umbral calculus.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 700, height: 450, scale: 45});

            let n = 2;
            let seq1Type = 'power';
            let seq2Type = 'falling';

            // Define sequences
            function powerSeq(n, x) {
                return Math.pow(x, n);
            }

            function fallingFactorial(n, x) {
                let result = 1;
                for (let i = 0; i < n; i++) {
                    result *= (x - i);
                }
                return result;
            }

            function risingFactorial(n, x) {
                let result = 1;
                for (let i = 0; i < n; i++) {
                    result *= (x + i);
                }
                return result;
            }

            // Umbral composition: evaluate seq1 with coefficients given by seq2
            // This is a simplified visualization
            function umbralCompose(type1, type2, n, x) {
                const seq1 = sequences[type1].func;
                const seq2 = sequences[type2].func;

                // Simplified: just multiply the sequences for visualization
                // True umbral composition is more complex
                return seq1(n, x) * 0.3 + seq2(n, x) * 0.7;
            }

            const sequences = {
                'power': { name: 'x^n', func: powerSeq },
                'falling': { name: 'x_(n)', func: fallingFactorial },
                'rising': { name: 'x^(n)', func: risingFactorial }
            };

            const sliderN = VizEngine.createSlider(controls, 'Degree n', 0, 4, n, 1, (val) => {
                n = val;
                draw();
            });

            const select1Div = document.createElement('div');
            select1Div.style.marginTop = '10px';
            const label1 = document.createElement('label');
            label1.textContent = 'Sequence 1: ';
            label1.style.color = viz.colors.text;
            const select1 = document.createElement('select');
            select1.style.padding = '5px';
            Object.keys(sequences).forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = sequences[type].name;
                if (type === seq1Type) option.selected = true;
                select1.appendChild(option);
            });
            select1.addEventListener('change', (e) => {
                seq1Type = e.target.value;
                draw();
            });
            select1Div.appendChild(label1);
            select1Div.appendChild(select1);
            controls.appendChild(select1Div);

            const select2Div = document.createElement('div');
            select2Div.style.marginTop = '5px';
            const label2 = document.createElement('label');
            label2.textContent = 'Sequence 2: ';
            label2.style.color = viz.colors.text;
            const select2 = document.createElement('select');
            select2.style.padding = '5px';
            Object.keys(sequences).forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = sequences[type].name;
                if (type === seq2Type) option.selected = true;
                select2.appendChild(option);
            });
            select2.addEventListener('change', (e) => {
                seq2Type = e.target.value;
                draw();
            });
            select2Div.appendChild(label2);
            select2Div.appendChild(select2);
            controls.appendChild(select2Div);

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            infoDiv.style.color = viz.colors.text;
            controls.appendChild(infoDiv);

            function drawSequence(seqType, n, color, lineWidth) {
                const points = [];
                const seq = sequences[seqType].func;

                for (let x = -5; x <= 5; x += 0.04) {
                    const y = seq(n, x);
                    if (Math.abs(y) < 12 && !isNaN(y) && isFinite(y)) {
                        points.push([x, y]);
                    }
                }

                if (points.length > 1) {
                    for (let i = 0; i < points.length - 1; i++) {
                        viz.drawSegment(points[i][0], points[i][1],
                                      points[i+1][0], points[i+1][1],
                                      color, lineWidth);
                    }
                }
            }

            function draw() {
                viz.clear();
                viz.drawGrid(1);
                viz.drawAxes();

                // Draw first sequence
                drawSequence(seq1Type, n, viz.colors.blue, 2);

                // Draw second sequence
                drawSequence(seq2Type, n, viz.colors.orange, 2);

                // Draw composition (simplified)
                const points = [];
                for (let x = -5; x <= 5; x += 0.04) {
                    const y = umbralCompose(seq1Type, seq2Type, n, x);
                    if (Math.abs(y) < 12 && !isNaN(y) && isFinite(y)) {
                        points.push([x, y]);
                    }
                }

                if (points.length > 1) {
                    for (let i = 0; i < points.length - 1; i++) {
                        viz.drawSegment(points[i][0], points[i][1],
                                      points[i+1][0], points[i+1][1],
                                      viz.colors.green, 3);
                    }
                }

                infoDiv.innerHTML = `<span style="color: ${viz.colors.blue}">${sequences[seq1Type].name}</span> and ` +
                    `<span style="color: ${viz.colors.orange}">${sequences[seq2Type].name}</span><br>` +
                    `<span style="color: ${viz.colors.green}">Umbral composition (simplified)</span><br>` +
                    `Degree n = ${n}<br>` +
                    `<i>Associated sequences form a group under umbral composition</i>`;
            }

            draw();
            return viz;
        }
    },

    {
        id: 'ch19-extra-viz-8',
        title: 'Interactive: Generating Function Visualizer',
        description: 'Visualize generating functions for polynomial sequences. The generating function encodes the entire sequence in a single power series.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, {width: 700, height: 450, scale: 80});

            let maxN = 5;
            let tValue = 0.3;
            let seqType = 'exponential';

            // Sequences and their generating functions
            const sequences = {
                'exponential': {
                    name: 'x^n/n!',
                    poly: (n, x) => Math.pow(x, n) / factorial(n),
                    genFunc: (t) => Math.exp(t), // e^t
                    genName: 'e^t'
                },
                'power': {
                    name: 'x^n',
                    poly: (n, x) => Math.pow(x, n),
                    genFunc: (t) => t < 1 ? 1 / (1 - t) : null, // 1/(1-t)
                    genName: '1/(1-t)'
                },
                'binomial': {
                    name: 'C(n,k)',
                    poly: (n, k) => {
                        if (k > n || k < 0) return 0;
                        return binomial(n, k);
                    },
                    genFunc: (t) => Math.pow(1 + t, maxN), // (1+t)^n
                    genName: '(1+t)^n'
                }
            };

            function factorial(n) {
                if (n <= 1) return 1;
                return n * factorial(n - 1);
            }

            function binomial(n, k) {
                if (k < 0 || k > n) return 0;
                if (k === 0 || k === n) return 1;
                let result = 1;
                for (let i = 0; i < k; i++) {
                    result *= (n - i) / (i + 1);
                }
                return result;
            }

            const sliderMax = VizEngine.createSlider(controls, 'Max degree', 2, 8, maxN, 1, (val) => {
                maxN = val;
                draw();
            });

            const sliderT = VizEngine.createSlider(controls, 'Parameter t', -0.5, 0.8, tValue, 0.05, (val) => {
                tValue = val;
                draw();
            });

            const selectDiv = document.createElement('div');
            selectDiv.style.marginTop = '10px';
            const selectLabel = document.createElement('label');
            selectLabel.textContent = 'Sequence: ';
            selectLabel.style.color = viz.colors.text;
            const select = document.createElement('select');
            select.style.padding = '5px';
            Object.keys(sequences).forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = sequences[type].name;
                if (type === seqType) option.selected = true;
                select.appendChild(option);
            });
            select.addEventListener('change', (e) => {
                seqType = e.target.value;
                draw();
            });
            selectDiv.appendChild(selectLabel);
            selectDiv.appendChild(select);
            controls.appendChild(selectDiv);

            const infoDiv = document.createElement('div');
            infoDiv.style.marginTop = '10px';
            infoDiv.style.fontFamily = 'monospace';
            infoDiv.style.fontSize = '11px';
            infoDiv.style.color = viz.colors.text;
            controls.appendChild(infoDiv);

            function draw() {
                viz.clear();
                viz.drawGrid(0.5);
                viz.drawAxes();

                const seq = sequences[seqType];

                // Draw the polynomial family at different degrees
                for (let n = 0; n <= maxN; n++) {
                    const points = [];
                    const alpha = 0.3 + 0.7 * (n / maxN);
                    const color = viz.colors.blue + Math.floor(alpha * 255).toString(16).padStart(2, '0');

                    for (let x = -3; x <= 3; x += 0.05) {
                        let y;
                        if (seqType === 'binomial') {
                            // For binomial, we plot C(n, k) as function of k
                            y = seq.poly(maxN, Math.round(x + maxN/2));
                        } else {
                            y = seq.poly(n, x);
                        }

                        if (Math.abs(y) < 8 && !isNaN(y) && isFinite(y)) {
                            points.push([x, y]);
                        }
                    }

                    if (points.length > 1) {
                        for (let i = 0; i < points.length - 1; i++) {
                            viz.drawSegment(points[i][0], points[i][1],
                                          points[i+1][0], points[i+1][1],
                                          color, 2);
                        }
                    }
                }

                // Show partial sum of generating function
                let partialSum = 0;
                for (let n = 0; n <= maxN; n++) {
                    if (seqType === 'binomial') {
                        partialSum += seq.poly(maxN, n) * Math.pow(tValue, n);
                    } else {
                        partialSum += seq.poly(n, 1) * Math.pow(tValue, n);
                    }
                }

                const exactValue = seq.genFunc(tValue);

                // Draw bar chart showing coefficients
                const barWidth = 0.15;
                for (let n = 0; n <= Math.min(maxN, 6); n++) {
                    const coeff = seqType === 'binomial' ? seq.poly(maxN, n) : seq.poly(n, 1);
                    const x = -2.5 + n * 0.5;
                    if (Math.abs(coeff) < 8) {
                        viz.drawSegment(x, 0, x, coeff, viz.colors.orange, 8);
                        viz.drawPoint(x, coeff, viz.colors.orange, null, 4);
                    }
                }

                let info = `<span style="color: ${viz.colors.blue}">p_n(x) = ${seq.name}</span><br>`;
                info += `Generating function: G(t) = ${seq.genName}<br>`;
                info += `At t = ${tValue.toFixed(2)}: `;
                info += `partial sum = ${partialSum.toFixed(4)}`;
                if (exactValue !== null && isFinite(exactValue)) {
                    info += `, exact = ${exactValue.toFixed(4)}`;
                }

                infoDiv.innerHTML = info;
            }

            draw();
            return viz;
        }
    }
];
