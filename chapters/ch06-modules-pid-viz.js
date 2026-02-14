// Extra Interactive Visualizations for Chapter 6: Modules over a PID

window.EXTRA_VIZ = window.EXTRA_VIZ || {};
window.EXTRA_VIZ['ch06'] = window.EXTRA_VIZ['ch06'] || {};

// Section-specific visualizations
window.EXTRA_VIZ['ch06']['ch06-sec01'] = [
    {
        id: 'ch06-extra-viz-1',
        title: 'Smith Normal Form Algorithm Stepper',
        description: 'Step through the Smith normal form algorithm on a matrix over Z. Watch how elementary row and column operations transform the matrix into diagonal form.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, { width: 700, height: 500, scale: 1 });

            // Initial matrix over Z
            let matrices = [
                [[6, 4, 8], [3, 2, 4], [9, 6, 12]],
                [[12, 8, 4], [6, 4, 2], [18, 12, 6]],
                [[2, 4, 6], [1, 2, 3], [3, 6, 9]]
            ];

            let currentMatrixIndex = 0;
            let currentMatrix = JSON.parse(JSON.stringify(matrices[currentMatrixIndex]));
            let steps = [];
            let currentStep = 0;

            function gcd(a, b) {
                a = Math.abs(a);
                b = Math.abs(b);
                while (b !== 0) {
                    let temp = b;
                    b = a % b;
                    a = temp;
                }
                return a;
            }

            function computeSmithForm(mat) {
                let M = mat.map(row => [...row]);
                let history = [{ matrix: M.map(row => [...row]), description: 'Initial matrix' }];
                let n = M.length;
                let m = M[0].length;

                for (let k = 0; k < Math.min(n, m); k++) {
                    // Find non-zero entry
                    let found = false;
                    for (let i = k; i < n && !found; i++) {
                        for (let j = k; j < m && !found; j++) {
                            if (M[i][j] !== 0) {
                                // Swap to position (k,k)
                                if (i !== k) {
                                    [M[i], M[k]] = [M[k], M[i]];
                                    history.push({ matrix: M.map(row => [...row]), description: `Swap rows ${i+1} and ${k+1}` });
                                }
                                if (j !== k) {
                                    for (let r = 0; r < n; r++) {
                                        [M[r][j], M[r][k]] = [M[r][k], M[r][j]];
                                    }
                                    history.push({ matrix: M.map(row => [...row]), description: `Swap columns ${j+1} and ${k+1}` });
                                }
                                found = true;
                            }
                        }
                    }

                    if (!found) continue;

                    // Make all entries in row k and column k divisible by M[k][k]
                    let improved = true;
                    while (improved) {
                        improved = false;

                        // Check row k
                        for (let j = k + 1; j < m; j++) {
                            if (M[k][j] !== 0) {
                                let g = gcd(M[k][k], M[k][j]);
                                if (g < Math.abs(M[k][k])) {
                                    // Use Euclidean algorithm
                                    let a = M[k][k], b = M[k][j];
                                    while (b !== 0) {
                                        let q = Math.floor(a / b);
                                        for (let r = 0; r < n; r++) {
                                            M[r][k] -= q * M[r][j];
                                        }
                                        history.push({ matrix: M.map(row => [...row]), description: `Column ${k+1} -= ${q} × Column ${j+1}` });
                                        [a, b] = [b, a % b];
                                        if (b !== 0) {
                                            for (let r = 0; r < n; r++) {
                                                [M[r][k], M[r][j]] = [M[r][j], M[r][k]];
                                            }
                                            history.push({ matrix: M.map(row => [...row]), description: `Swap columns ${k+1} and ${j+1}` });
                                        }
                                    }
                                    improved = true;
                                } else {
                                    // Eliminate
                                    let q = Math.floor(M[k][j] / M[k][k]);
                                    for (let r = 0; r < n; r++) {
                                        M[r][j] -= q * M[r][k];
                                    }
                                    history.push({ matrix: M.map(row => [...row]), description: `Column ${j+1} -= ${q} × Column ${k+1}` });
                                }
                            }
                        }

                        // Check column k
                        for (let i = k + 1; i < n; i++) {
                            if (M[i][k] !== 0) {
                                let g = gcd(M[k][k], M[i][k]);
                                if (g < Math.abs(M[k][k])) {
                                    let a = M[k][k], b = M[i][k];
                                    while (b !== 0) {
                                        let q = Math.floor(a / b);
                                        for (let c = 0; c < m; c++) {
                                            M[k][c] -= q * M[i][c];
                                        }
                                        history.push({ matrix: M.map(row => [...row]), description: `Row ${k+1} -= ${q} × Row ${i+1}` });
                                        [a, b] = [b, a % b];
                                        if (b !== 0) {
                                            [M[k], M[i]] = [M[i], M[k]];
                                            history.push({ matrix: M.map(row => [...row]), description: `Swap rows ${k+1} and ${i+1}` });
                                        }
                                    }
                                    improved = true;
                                } else {
                                    let q = Math.floor(M[i][k] / M[k][k]);
                                    for (let c = 0; c < m; c++) {
                                        M[i][c] -= q * M[k][c];
                                    }
                                    history.push({ matrix: M.map(row => [...row]), description: `Row ${i+1} -= ${q} × Row ${k+1}` });
                                }
                            }
                        }
                    }
                }

                history.push({ matrix: M.map(row => [...row]), description: 'Smith Normal Form achieved!' });
                return history;
            }

            steps = computeSmithForm(currentMatrix);

            function drawMatrix(mat, x, y, cellSize, highlightColor) {
                const n = mat.length;
                const m = mat[0].length;

                for (let i = 0; i < n; i++) {
                    for (let j = 0; j < m; j++) {
                        const px = x + j * cellSize;
                        const py = y + i * cellSize;

                        // Draw cell background
                        viz.ctx.fillStyle = highlightColor || '#1e1e1e';
                        viz.ctx.fillRect(px, py, cellSize, cellSize);

                        // Draw border
                        viz.ctx.strokeStyle = viz.colors.text;
                        viz.ctx.lineWidth = 1;
                        viz.ctx.strokeRect(px, py, cellSize, cellSize);

                        // Draw value
                        viz.ctx.fillStyle = mat[i][j] === 0 ? viz.colors.text + '55' : viz.colors.white;
                        viz.ctx.font = '18px monospace';
                        viz.ctx.textAlign = 'center';
                        viz.ctx.textBaseline = 'middle';
                        viz.ctx.fillText(mat[i][j].toString(), px + cellSize/2, py + cellSize/2);
                    }
                }
            }

            function draw() {
                viz.clear();

                const mat = steps[currentStep].matrix;
                const cellSize = 60;
                const startX = 50;
                const startY = 100;

                // Draw title
                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = 'bold 20px sans-serif';
                viz.ctx.textAlign = 'left';
                viz.ctx.fillText('Smith Normal Form Algorithm', 20, 30);

                // Draw step description
                viz.ctx.fillStyle = viz.colors.teal;
                viz.ctx.font = '16px sans-serif';
                viz.ctx.fillText(`Step ${currentStep + 1}/${steps.length}: ${steps[currentStep].description}`, 20, 60);

                // Draw matrix
                drawMatrix(mat, startX, startY, cellSize);

                // Draw progress indicator
                const progressWidth = 600;
                const progressHeight = 20;
                const progressX = 50;
                const progressY = 420;

                viz.ctx.fillStyle = '#333';
                viz.ctx.fillRect(progressX, progressY, progressWidth, progressHeight);

                viz.ctx.fillStyle = viz.colors.teal;
                viz.ctx.fillRect(progressX, progressY, progressWidth * (currentStep / (steps.length - 1)), progressHeight);

                viz.ctx.strokeStyle = viz.colors.text;
                viz.ctx.strokeRect(progressX, progressY, progressWidth, progressHeight);

                // Status text
                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = '14px sans-serif';
                viz.ctx.textAlign = 'left';
                if (currentStep === steps.length - 1) {
                    viz.ctx.fillText('✓ Final Smith Normal Form: diagonal matrix with d₁ | d₂ | d₃', 50, 465);
                } else {
                    viz.ctx.fillText('Elementary row and column operations preserve the module structure', 50, 465);
                }
            }

            // Controls
            const prevBtn = VizEngine.createButton(controls, '← Previous', () => {
                if (currentStep > 0) {
                    currentStep--;
                    draw();
                }
            });

            const nextBtn = VizEngine.createButton(controls, 'Next →', () => {
                if (currentStep < steps.length - 1) {
                    currentStep++;
                    draw();
                }
            });

            const resetBtn = VizEngine.createButton(controls, 'Reset', () => {
                currentStep = 0;
                draw();
            });

            const matrixSelect = document.createElement('select');
            matrixSelect.style.cssText = 'margin: 5px; padding: 5px; background: #1e1e1e; color: white; border: 1px solid #444;';
            matrices.forEach((mat, idx) => {
                const option = document.createElement('option');
                option.value = idx;
                option.textContent = `Matrix ${idx + 1}`;
                matrixSelect.appendChild(option);
            });
            matrixSelect.addEventListener('change', (e) => {
                currentMatrixIndex = parseInt(e.target.value);
                currentMatrix = JSON.parse(JSON.stringify(matrices[currentMatrixIndex]));
                steps = computeSmithForm(currentMatrix);
                currentStep = 0;
                draw();
            });
            controls.appendChild(matrixSelect);

            draw();
            return viz;
        }
    },

    {
        id: 'ch06-extra-viz-2',
        title: 'Invariant Factors ↔ Elementary Divisors Converter',
        description: 'Convert between invariant factor decomposition and elementary divisor decomposition. See how the two representations are equivalent.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, { width: 700, height: 500, scale: 1 });

            // Sample modules with their decompositions
            const examples = [
                {
                    name: 'Z₁₂ ⊕ Z₃₀',
                    invariantFactors: [60, 6],
                    elementaryDivisors: ['2²', '3', '5', '2', '3']
                },
                {
                    name: 'Z₂ ⊕ Z₄ ⊕ Z₈',
                    invariantFactors: [8, 4, 2],
                    elementaryDivisors: ['2³', '2²', '2']
                },
                {
                    name: 'Z₃₆ ⊕ Z₁₂',
                    invariantFactors: [36, 12],
                    elementaryDivisors: ['2²', '3²', '2²', '3']
                }
            ];

            let currentExample = 0;
            let showingInvariant = true;

            function primeFactorize(n) {
                const factors = [];
                let d = 2;
                while (n > 1) {
                    let count = 0;
                    while (n % d === 0) {
                        count++;
                        n /= d;
                    }
                    if (count > 0) {
                        factors.push({ prime: d, exp: count });
                    }
                    d++;
                    if (d * d > n && n > 1) {
                        factors.push({ prime: n, exp: 1 });
                        break;
                    }
                }
                return factors;
            }

            function invariantToElementary(invFactors) {
                // Convert invariant factors to elementary divisors
                const factorizations = invFactors.map(n => primeFactorize(n));
                const elemDiv = [];

                // Collect all primes
                const primes = new Set();
                factorizations.forEach(factorization => {
                    factorization.forEach(f => primes.add(f.prime));
                });

                // For each prime, collect exponents from all invariant factors
                primes.forEach(p => {
                    const exponents = [];
                    factorizations.forEach(factorization => {
                        const factor = factorization.find(f => f.prime === p);
                        exponents.push(factor ? factor.exp : 0);
                    });
                    // Add non-zero powers
                    exponents.forEach(exp => {
                        if (exp > 0) {
                            elemDiv.push(`${p}${exp > 1 ? '^' + exp : ''}`);
                        }
                    });
                });

                return elemDiv;
            }

            function draw() {
                viz.clear();

                const example = examples[currentExample];

                // Title
                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = 'bold 20px sans-serif';
                viz.ctx.textAlign = 'left';
                viz.ctx.fillText('Invariant Factors ↔ Elementary Divisors', 20, 30);

                // Module name
                viz.ctx.fillStyle = viz.colors.teal;
                viz.ctx.font = '18px sans-serif';
                viz.ctx.fillText(`Module: ${example.name}`, 20, 65);

                // Invariant factors section
                viz.ctx.fillStyle = viz.colors.orange;
                viz.ctx.font = 'bold 16px sans-serif';
                viz.ctx.fillText('Invariant Factor Decomposition:', 50, 120);

                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = '14px monospace';
                const invText = 'M ≅ ' + example.invariantFactors.map(n => `Z_${n}`).join(' ⊕ ');
                viz.ctx.fillText(invText, 50, 150);

                viz.ctx.fillStyle = viz.colors.text;
                viz.ctx.font = '12px sans-serif';
                viz.ctx.fillText('(d₁ | d₂ | ... | dₙ, where each dᵢ divides dᵢ₊₁)', 50, 175);

                // Draw factorizations
                let y = 200;
                example.invariantFactors.forEach((n, idx) => {
                    const factors = primeFactorize(n);
                    const factorStr = factors.map(f => `${f.prime}^${f.exp}`).join(' · ');
                    viz.ctx.fillStyle = viz.colors.white;
                    viz.ctx.font = '13px monospace';
                    viz.ctx.fillText(`  ${n} = ${factorStr}`, 70, y);
                    y += 25;
                });

                // Arrow
                viz.ctx.strokeStyle = viz.colors.teal;
                viz.ctx.fillStyle = viz.colors.teal;
                viz.ctx.lineWidth = 3;

                // Draw double arrow
                const arrowY = 280;
                viz.ctx.beginPath();
                viz.ctx.moveTo(100, arrowY);
                viz.ctx.lineTo(600, arrowY);
                viz.ctx.stroke();

                // Right arrowhead
                viz.ctx.beginPath();
                viz.ctx.moveTo(600, arrowY);
                viz.ctx.lineTo(585, arrowY - 8);
                viz.ctx.lineTo(585, arrowY + 8);
                viz.ctx.closePath();
                viz.ctx.fill();

                // Left arrowhead
                viz.ctx.beginPath();
                viz.ctx.moveTo(100, arrowY);
                viz.ctx.lineTo(115, arrowY - 8);
                viz.ctx.lineTo(115, arrowY + 8);
                viz.ctx.closePath();
                viz.ctx.fill();

                viz.ctx.font = '12px sans-serif';
                viz.ctx.textAlign = 'center';
                viz.ctx.fillText('equivalent', 350, arrowY - 10);

                // Elementary divisors section
                viz.ctx.fillStyle = viz.colors.green;
                viz.ctx.font = 'bold 16px sans-serif';
                viz.ctx.textAlign = 'left';
                viz.ctx.fillText('Elementary Divisor Decomposition:', 50, 320);

                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = '14px monospace';
                const elemText = 'M ≅ ' + example.elementaryDivisors.map(d => `Z_${d}`).join(' ⊕ ');
                viz.ctx.fillText(elemText, 50, 350);

                viz.ctx.fillStyle = viz.colors.text;
                viz.ctx.font = '12px sans-serif';
                viz.ctx.fillText('(prime power cyclic modules, grouped by prime)', 50, 375);

                // Draw the elementary divisors with grouping
                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = '13px monospace';
                const elemStr = example.elementaryDivisors.join(', ');
                viz.ctx.fillText(`  Elementary divisors: {${elemStr}}`, 70, 405);

                // Key insight box
                viz.ctx.strokeStyle = viz.colors.purple;
                viz.ctx.lineWidth = 2;
                viz.ctx.strokeRect(50, 430, 600, 50);

                viz.ctx.fillStyle = viz.colors.purple;
                viz.ctx.font = 'bold 12px sans-serif';
                viz.ctx.fillText('Key Insight:', 60, 450);

                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = '11px sans-serif';
                viz.ctx.fillText('Both decompositions uniquely determine the module structure (up to isomorphism)', 60, 467);
            }

            // Controls
            const prevBtn = VizEngine.createButton(controls, '← Previous Example', () => {
                currentExample = (currentExample - 1 + examples.length) % examples.length;
                draw();
            });

            const nextBtn = VizEngine.createButton(controls, 'Next Example →', () => {
                currentExample = (currentExample + 1) % examples.length;
                draw();
            });

            const infoDiv = document.createElement('div');
            infoDiv.style.cssText = 'margin: 10px; padding: 8px; background: #1e1e1e; color: #8b949e; font-size: 12px; border-left: 3px solid #58a6ff;';
            infoDiv.textContent = 'Invariant factors satisfy d₁ | d₂ | ... | dₙ. Elementary divisors are prime powers from factorizations.';
            controls.appendChild(infoDiv);

            draw();
            return viz;
        }
    },

    {
        id: 'ch06-extra-viz-3',
        title: 'PID Ideal Containment Diagram',
        description: 'Visualize the lattice of ideals in a principal ideal domain. See how ideals form a chain under containment.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, { width: 700, height: 500, scale: 1 });

            let selectedPID = 'Z'; // Z, Z[i], or F[x]
            let selectedElement = 12;

            function gcd(a, b) {
                a = Math.abs(a);
                b = Math.abs(b);
                while (b !== 0) {
                    let temp = b;
                    b = a % b;
                    a = temp;
                }
                return a;
            }

            function getDivisors(n) {
                const divisors = [];
                for (let i = 1; i <= Math.abs(n); i++) {
                    if (n % i === 0) {
                        divisors.push(i);
                    }
                }
                return divisors;
            }

            function draw() {
                viz.clear();

                // Title
                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = 'bold 20px sans-serif';
                viz.ctx.textAlign = 'left';
                viz.ctx.fillText('Principal Ideal Containment in Z', 20, 30);

                viz.ctx.fillStyle = viz.colors.teal;
                viz.ctx.font = '14px sans-serif';
                viz.ctx.fillText(`Exploring ideals containing ⟨${selectedElement}⟩`, 20, 55);

                // Get divisors (which correspond to ideals containing <n>)
                const divisors = getDivisors(selectedElement).sort((a, b) => b - a);

                // Draw the lattice
                const levels = divisors.length;
                const startY = 100;
                const levelHeight = 60;
                const centerX = 350;

                // Draw nodes and connections
                divisors.forEach((d, idx) => {
                    const y = startY + idx * levelHeight;

                    // Draw connections to next level
                    if (idx < divisors.length - 1) {
                        divisors.slice(idx + 1).forEach((nextD, nextIdx) => {
                            if (d % nextD === 0) {
                                // Check if it's a direct divisor (no intermediate)
                                let isDirect = true;
                                for (let k = idx + 1; k < idx + 1 + nextIdx; k++) {
                                    if (d % divisors[k] === 0 && divisors[k] % nextD === 0) {
                                        isDirect = false;
                                        break;
                                    }
                                }

                                if (isDirect) {
                                    const nextY = startY + (idx + 1 + nextIdx) * levelHeight;
                                    viz.ctx.strokeStyle = viz.colors.text + '44';
                                    viz.ctx.lineWidth = 1.5;
                                    viz.ctx.beginPath();
                                    viz.ctx.moveTo(centerX, y + 20);
                                    viz.ctx.lineTo(centerX, nextY - 20);
                                    viz.ctx.stroke();
                                }
                            }
                        });
                    }

                    // Draw node
                    viz.ctx.fillStyle = idx === 0 ? viz.colors.orange + 'dd' : viz.colors.blue + 'dd';
                    viz.ctx.beginPath();
                    viz.ctx.arc(centerX, y, 18, 0, Math.PI * 2);
                    viz.ctx.fill();

                    viz.ctx.strokeStyle = viz.colors.white;
                    viz.ctx.lineWidth = 2;
                    viz.ctx.stroke();

                    // Draw label
                    viz.ctx.fillStyle = viz.colors.white;
                    viz.ctx.font = 'bold 14px monospace';
                    viz.ctx.textAlign = 'center';
                    viz.ctx.textBaseline = 'middle';
                    viz.ctx.fillText(d.toString(), centerX, y);

                    // Draw ideal notation
                    viz.ctx.font = '13px monospace';
                    viz.ctx.textAlign = 'left';
                    viz.ctx.fillText(`⟨${d}⟩`, centerX + 30, y);

                    // Draw inclusion relation
                    if (idx === 0) {
                        viz.ctx.fillStyle = viz.colors.text;
                        viz.ctx.font = '11px sans-serif';
                        viz.ctx.textAlign = 'right';
                        viz.ctx.fillText('Z', centerX - 30, y);
                    } else {
                        viz.ctx.fillStyle = viz.colors.text;
                        viz.ctx.font = '11px monospace';
                        viz.ctx.textAlign = 'right';
                        viz.ctx.fillText(`[Z : ⟨${d}⟩] = ${d}`, centerX - 30, y);
                    }
                });

                // Draw containment chain on the right
                viz.ctx.fillStyle = viz.colors.green;
                viz.ctx.font = 'bold 12px sans-serif';
                viz.ctx.textAlign = 'left';
                viz.ctx.fillText('Containment Chain:', 480, 120);

                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = '12px monospace';
                let chainY = 145;
                divisors.forEach((d, idx) => {
                    viz.ctx.fillText(`⟨${d}⟩`, 480, chainY);
                    chainY += 20;
                    if (idx < divisors.length - 1) {
                        viz.ctx.fillStyle = viz.colors.teal;
                        viz.ctx.fillText('⊇', 495, chainY);
                        viz.ctx.fillStyle = viz.colors.white;
                        chainY += 20;
                    }
                });

                // Info box
                const boxY = Math.min(400, startY + levels * levelHeight + 20);
                viz.ctx.strokeStyle = viz.colors.purple;
                viz.ctx.lineWidth = 2;
                viz.ctx.strokeRect(20, boxY, 660, 80);

                viz.ctx.fillStyle = viz.colors.purple;
                viz.ctx.font = 'bold 13px sans-serif';
                viz.ctx.textAlign = 'left';
                viz.ctx.fillText('PID Property:', 30, boxY + 25);

                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = '12px sans-serif';
                viz.ctx.fillText('In a principal ideal domain, every ideal is generated by a single element.', 30, boxY + 45);
                viz.ctx.fillText(`In Z: ⟨a⟩ ⊆ ⟨b⟩ if and only if b | a. Here we see all ideals containing ⟨${selectedElement}⟩.`, 30, boxY + 63);
            }

            // Controls
            const slider = VizEngine.createSlider(controls, `Element n = ${selectedElement}`, 2, 60, selectedElement, 1, (value) => {
                selectedElement = value;
                slider.label.textContent = `Element n = ${selectedElement}`;
                draw();
            });

            const infoDiv = document.createElement('div');
            infoDiv.style.cssText = 'margin: 10px; padding: 8px; background: #1e1e1e; color: #8b949e; font-size: 11px; border-left: 3px solid #3fb950;';
            infoDiv.innerHTML = '<strong>Note:</strong> Divisors of n correspond to ideals containing ⟨n⟩. The lattice shows d | n implies ⟨n⟩ ⊆ ⟨d⟩.';
            controls.appendChild(infoDiv);

            draw();
            return viz;
        }
    },

    {
        id: 'ch06-extra-viz-4',
        title: 'Structure Theorem Decomposition Animator',
        description: 'Animate the decomposition of a finitely generated module over a PID into free and torsion parts, then into primary components.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, { width: 700, height: 500, scale: 1 });

            let animationPhase = 0; // 0: original, 1: free+torsion, 2: primary, 3: cyclic
            let isAnimating = false;
            let animationProgress = 0;

            // Module: Z^2 ⊕ Z₁₂ ⊕ Z₃₀
            const moduleData = {
                name: 'M = Z² ⊕ Z₁₂ ⊕ Z₃₀',
                free: ['Z', 'Z'],
                torsion: ['Z₁₂', 'Z₃₀'],
                primary: ['Z₄', 'Z₃', 'Z₆', 'Z₅'],
                cyclic: ['Z₆₀', 'Z₆']
            };

            function drawBox(x, y, w, h, label, color, alpha = 1) {
                viz.ctx.fillStyle = color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
                viz.ctx.fillRect(x, y, w, h);

                viz.ctx.strokeStyle = viz.colors.white;
                viz.ctx.lineWidth = 2;
                viz.ctx.strokeRect(x, y, w, h);

                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = 'bold 14px monospace';
                viz.ctx.textAlign = 'center';
                viz.ctx.textBaseline = 'middle';
                viz.ctx.fillText(label, x + w/2, y + h/2);
            }

            function drawOplus(x, y, size = 20) {
                viz.ctx.strokeStyle = viz.colors.teal;
                viz.ctx.lineWidth = 3;
                viz.ctx.beginPath();
                viz.ctx.arc(x, y, size, 0, Math.PI * 2);
                viz.ctx.stroke();

                viz.ctx.beginPath();
                viz.ctx.moveTo(x - size, y);
                viz.ctx.lineTo(x + size, y);
                viz.ctx.moveTo(x, y - size);
                viz.ctx.lineTo(x, y + size);
                viz.ctx.stroke();
            }

            function draw() {
                viz.clear();

                // Title
                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = 'bold 20px sans-serif';
                viz.ctx.textAlign = 'left';
                viz.ctx.fillText('Structure Theorem Decomposition', 20, 30);

                viz.ctx.fillStyle = viz.colors.teal;
                viz.ctx.font = '14px monospace';
                viz.ctx.fillText(moduleData.name, 20, 55);

                const boxWidth = 80;
                const boxHeight = 50;
                const spacing = 20;

                if (animationPhase === 0) {
                    // Original module
                    viz.ctx.fillStyle = viz.colors.text;
                    viz.ctx.font = '14px sans-serif';
                    viz.ctx.textAlign = 'left';
                    viz.ctx.fillText('Original Module:', 50, 120);

                    let x = 100;
                    const y = 150;

                    drawBox(x, y, boxWidth, boxHeight, 'Z', viz.colors.blue);
                    x += boxWidth + 15;
                    drawOplus(x, y + boxHeight/2, 12);
                    x += 30;

                    drawBox(x, y, boxWidth, boxHeight, 'Z', viz.colors.blue);
                    x += boxWidth + 15;
                    drawOplus(x, y + boxHeight/2, 12);
                    x += 30;

                    drawBox(x, y, boxWidth, boxHeight, 'Z₁₂', viz.colors.orange);
                    x += boxWidth + 15;
                    drawOplus(x, y + boxHeight/2, 12);
                    x += 30;

                    drawBox(x, y, boxWidth, boxHeight, 'Z₃₀', viz.colors.orange);

                } else if (animationPhase === 1) {
                    // Free + Torsion split
                    viz.ctx.fillStyle = viz.colors.text;
                    viz.ctx.font = '14px sans-serif';
                    viz.ctx.fillText('Free-Torsion Decomposition: M = M_free ⊕ M_tor', 50, 120);

                    // Free part
                    viz.ctx.fillStyle = viz.colors.blue;
                    viz.ctx.font = 'bold 13px sans-serif';
                    viz.ctx.fillText('M_free (rank 2)', 80, 165);

                    let x = 80;
                    let y = 185;
                    drawBox(x, y, boxWidth, boxHeight, 'Z', viz.colors.blue);
                    x += boxWidth + 15;
                    drawOplus(x, y + boxHeight/2, 12);
                    x += 30;
                    drawBox(x, y, boxWidth, boxHeight, 'Z', viz.colors.blue);

                    // Torsion part
                    viz.ctx.fillStyle = viz.colors.orange;
                    viz.ctx.font = 'bold 13px sans-serif';
                    viz.ctx.fillText('M_tor (torsion)', 380, 165);

                    x = 380;
                    drawBox(x, y, boxWidth, boxHeight, 'Z₁₂', viz.colors.orange);
                    x += boxWidth + 15;
                    drawOplus(x, y + boxHeight/2, 12);
                    x += 30;
                    drawBox(x, y, boxWidth, boxHeight, 'Z₃₀', viz.colors.orange);

                } else if (animationPhase === 2) {
                    // Primary decomposition
                    viz.ctx.fillStyle = viz.colors.text;
                    viz.ctx.font = '14px sans-serif';
                    viz.ctx.fillText('Primary Decomposition: M_tor = ⊕ M_pᵢ (each p-primary)', 50, 120);

                    // Free part (smaller)
                    viz.ctx.fillStyle = viz.colors.blue;
                    viz.ctx.font = '12px sans-serif';
                    viz.ctx.fillText('Free: Z²', 50, 165);

                    // Primary components
                    viz.ctx.fillStyle = viz.colors.green;
                    viz.ctx.font = 'bold 13px sans-serif';
                    viz.ctx.fillText('Torsion (primary components):', 50, 200);

                    let x = 80;
                    let y = 220;

                    // 2-primary
                    viz.ctx.fillStyle = viz.colors.text;
                    viz.ctx.font = '11px sans-serif';
                    viz.ctx.fillText('2-primary:', x, y - 5);
                    drawBox(x, y, boxWidth - 10, boxHeight - 10, 'Z₄', viz.colors.purple);
                    x += (boxWidth - 10) + 10;
                    drawOplus(x, y + (boxHeight - 10)/2, 10);
                    x += 25;
                    drawBox(x, y, boxWidth - 10, boxHeight - 10, 'Z₂', viz.colors.purple);

                    // 3-primary
                    x = 80;
                    y = 290;
                    viz.ctx.fillStyle = viz.colors.text;
                    viz.ctx.fillText('3-primary:', x, y - 5);
                    drawBox(x, y, boxWidth - 10, boxHeight - 10, 'Z₃', viz.colors.pink);
                    x += (boxWidth - 10) + 10;
                    drawOplus(x, y + (boxHeight - 10)/2, 10);
                    x += 25;
                    drawBox(x, y, boxWidth - 10, boxHeight - 10, 'Z₃', viz.colors.pink);

                    // 5-primary
                    x = 350;
                    y = 220;
                    viz.ctx.fillStyle = viz.colors.text;
                    viz.ctx.fillText('5-primary:', x, y - 5);
                    drawBox(x, y, boxWidth - 10, boxHeight - 10, 'Z₅', viz.colors.yellow);

                } else if (animationPhase === 3) {
                    // Invariant factor (cyclic) decomposition
                    viz.ctx.fillStyle = viz.colors.text;
                    viz.ctx.font = '14px sans-serif';
                    viz.ctx.fillText('Invariant Factor Decomposition: M = Z² ⊕ C₁ ⊕ C₂ (dᵢ | dᵢ₊₁)', 50, 120);

                    let x = 100;
                    let y = 180;

                    // Free
                    viz.ctx.fillStyle = viz.colors.blue;
                    viz.ctx.font = '12px sans-serif';
                    viz.ctx.fillText('Free:', x, y - 10);
                    drawBox(x, y, boxWidth, boxHeight, 'Z', viz.colors.blue);
                    x += boxWidth + 15;
                    drawOplus(x, y + boxHeight/2, 12);
                    x += 30;
                    drawBox(x, y, boxWidth, boxHeight, 'Z', viz.colors.blue);

                    // Cyclic torsion
                    x = 100;
                    y = 280;
                    viz.ctx.fillStyle = viz.colors.green;
                    viz.ctx.font = '12px sans-serif';
                    viz.ctx.fillText('Torsion (cyclic):', x, y - 10);
                    drawBox(x, y, boxWidth + 20, boxHeight, 'Z₆', viz.colors.green);
                    x += boxWidth + 35;
                    drawOplus(x, y + boxHeight/2, 12);
                    x += 30;
                    drawBox(x, y, boxWidth + 20, boxHeight, 'Z₆₀', viz.colors.green);

                    viz.ctx.fillStyle = viz.colors.text;
                    viz.ctx.font = '11px sans-serif';
                    viz.ctx.fillText('(Note: 6 | 60)', x + boxWidth - 20, y + boxHeight + 20);
                }

                // Phase indicator
                const phases = ['Original', 'Free ⊕ Torsion', 'Primary', 'Invariant Factors'];
                viz.ctx.fillStyle = viz.colors.teal;
                viz.ctx.font = 'bold 12px sans-serif';
                viz.ctx.textAlign = 'center';
                viz.ctx.fillText(`Phase ${animationPhase + 1}/4: ${phases[animationPhase]}`, 350, 450);

                // Theorem reference
                viz.ctx.strokeStyle = viz.colors.purple;
                viz.ctx.lineWidth = 2;
                viz.ctx.strokeRect(20, 470, 660, 22);
                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = '11px sans-serif';
                viz.ctx.textAlign = 'left';
                viz.ctx.fillText('Structure Theorem 6.9, 6.10, 6.13, 6.16: Every finitely generated module over a PID decomposes uniquely', 25, 485);
            }

            // Controls
            const prevBtn = VizEngine.createButton(controls, '← Previous Phase', () => {
                animationPhase = (animationPhase - 1 + 4) % 4;
                draw();
            });

            const nextBtn = VizEngine.createButton(controls, 'Next Phase →', () => {
                animationPhase = (animationPhase + 1) % 4;
                draw();
            });

            const resetBtn = VizEngine.createButton(controls, 'Reset', () => {
                animationPhase = 0;
                draw();
            });

            draw();
            return viz;
        }
    },

    {
        id: 'ch06-extra-viz-5',
        title: 'Cyclic Module Visualization',
        description: 'Explore cyclic modules Z/nZ and their submodules. See how ideals correspond to submodules and the correspondence with divisors.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, { width: 700, height: 500, scale: 1 });

            let n = 12;
            let selectedDivisor = null;

            function getDivisors(num) {
                const divisors = [];
                for (let i = 1; i <= num; i++) {
                    if (num % i === 0) {
                        divisors.push(i);
                    }
                }
                return divisors;
            }

            function drawCyclicGroup(centerX, centerY, radius, mod, highlightMultiple = null) {
                const angleStep = (2 * Math.PI) / mod;

                // Draw circle
                viz.ctx.strokeStyle = viz.colors.text + '44';
                viz.ctx.lineWidth = 2;
                viz.ctx.beginPath();
                viz.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                viz.ctx.stroke();

                // Draw elements
                for (let i = 0; i < mod; i++) {
                    const angle = -Math.PI / 2 + i * angleStep;
                    const x = centerX + radius * Math.cos(angle);
                    const y = centerY + radius * Math.sin(angle);

                    const isInSubmodule = highlightMultiple !== null && (i % highlightMultiple === 0);

                    // Draw point
                    viz.ctx.fillStyle = isInSubmodule ? viz.colors.orange : viz.colors.blue;
                    viz.ctx.beginPath();
                    viz.ctx.arc(x, y, 8, 0, Math.PI * 2);
                    viz.ctx.fill();

                    viz.ctx.strokeStyle = viz.colors.white;
                    viz.ctx.lineWidth = 1.5;
                    viz.ctx.stroke();

                    // Draw label
                    const labelRadius = radius + 25;
                    const labelX = centerX + labelRadius * Math.cos(angle);
                    const labelY = centerY + labelRadius * Math.sin(angle);

                    viz.ctx.fillStyle = isInSubmodule ? viz.colors.orange : viz.colors.white;
                    viz.ctx.font = 'bold 12px monospace';
                    viz.ctx.textAlign = 'center';
                    viz.ctx.textBaseline = 'middle';
                    viz.ctx.fillText(i.toString(), labelX, labelY);
                }

                // If highlighting a submodule, draw connections
                if (highlightMultiple !== null) {
                    viz.ctx.strokeStyle = viz.colors.orange + '66';
                    viz.ctx.lineWidth = 2;
                    for (let i = 0; i < mod; i += highlightMultiple) {
                        const angle1 = -Math.PI / 2 + i * angleStep;
                        const angle2 = -Math.PI / 2 + ((i + highlightMultiple) % mod) * angleStep;
                        const x1 = centerX + radius * Math.cos(angle1);
                        const y1 = centerY + radius * Math.sin(angle1);
                        const x2 = centerX + radius * Math.cos(angle2);
                        const y2 = centerY + radius * Math.sin(angle2);

                        viz.ctx.beginPath();
                        viz.ctx.moveTo(x1, y1);
                        viz.ctx.lineTo(x2, y2);
                        viz.ctx.stroke();
                    }
                }
            }

            function draw() {
                viz.clear();

                // Title
                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = 'bold 20px sans-serif';
                viz.ctx.textAlign = 'left';
                viz.ctx.fillText(`Cyclic Module Z/${n}Z`, 20, 30);

                // Draw the cyclic group
                const centerX = 250;
                const centerY = 250;
                const radius = 120;

                drawCyclicGroup(centerX, centerY, radius, n, selectedDivisor);

                // Info about cyclic module
                viz.ctx.fillStyle = viz.colors.teal;
                viz.ctx.font = 'bold 14px sans-serif';
                viz.ctx.fillText('Generator: 1̄', centerX - 20, centerY - 10);
                viz.ctx.fillStyle = viz.colors.text;
                viz.ctx.font = '12px sans-serif';
                viz.ctx.fillText(`ann(Z/${n}Z) = ⟨${n}⟩`, centerX - 35, centerY + 10);

                // Submodules panel
                viz.ctx.fillStyle = viz.colors.green;
                viz.ctx.font = 'bold 14px sans-serif';
                viz.ctx.textAlign = 'left';
                viz.ctx.fillText('Submodules:', 480, 100);

                const divisors = getDivisors(n);
                let y = 130;

                divisors.forEach(d => {
                    const submodSize = n / d;
                    const isSelected = selectedDivisor === d;

                    viz.ctx.fillStyle = isSelected ? viz.colors.orange : viz.colors.white;
                    viz.ctx.font = isSelected ? 'bold 12px monospace' : '12px monospace';
                    viz.ctx.fillText(`⟨${d}⟩ ≅ Z/${submodSize}Z`, 490, y);

                    if (isSelected) {
                        viz.ctx.fillStyle = viz.colors.orange;
                        viz.ctx.fillText('◄', 630, y);
                    }

                    y += 20;
                });

                // Instruction
                viz.ctx.fillStyle = viz.colors.text;
                viz.ctx.font = '11px sans-serif';
                viz.ctx.fillText('(Use slider to select)', 490, y + 5);

                // Theorem box
                const boxY = 400;
                viz.ctx.strokeStyle = viz.colors.purple;
                viz.ctx.lineWidth = 2;
                viz.ctx.strokeRect(20, boxY, 660, 80);

                viz.ctx.fillStyle = viz.colors.purple;
                viz.ctx.font = 'bold 13px sans-serif';
                viz.ctx.fillText('Theorem 6.4:', 30, boxY + 22);

                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = '12px sans-serif';
                viz.ctx.fillText('Every submodule of a cyclic module over a PID is cyclic.', 30, boxY + 42);
                viz.ctx.fillText(`For Z/${n}Z, submodules correspond to divisors d of n, giving Z/(n/d)Z ≅ ⟨d⟩.`, 30, boxY + 60);
            }

            // Controls
            const divisors = getDivisors(n);
            const slider = VizEngine.createSlider(controls, `Submodule: ⟨${divisors[0]}⟩`, 0, divisors.length - 1, 0, 1, (value) => {
                selectedDivisor = divisors[value];
                slider.label.textContent = `Submodule: ⟨${selectedDivisor}⟩ ≅ Z/${n/selectedDivisor}Z`;
                draw();
            });
            selectedDivisor = divisors[0];

            const nSlider = VizEngine.createSlider(controls, `n = ${n}`, 4, 24, n, 1, (value) => {
                n = value;
                nSlider.label.textContent = `n = ${n}`;
                const newDivisors = getDivisors(n);
                selectedDivisor = newDivisors[0];
                slider.input.max = newDivisors.length - 1;
                slider.input.value = 0;
                slider.label.textContent = `Submodule: ⟨${selectedDivisor}⟩ ≅ Z/${n/selectedDivisor}Z`;
                draw();
            });

            draw();
            return viz;
        }
    },

    {
        id: 'ch06-extra-viz-6',
        title: 'Torsion-Free + Torsion Decomposition Explorer',
        description: 'Visualize the unique decomposition M = M_free ⊕ M_tor. Explore different modules and see their free rank and torsion components.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, { width: 700, height: 500, scale: 1 });

            const modules = [
                {
                    name: 'Z³ ⊕ Z₆ ⊕ Z₁₀',
                    freeRank: 3,
                    torsion: ['Z₆', 'Z₁₀'],
                    description: 'Mixed: free rank 3, torsion Z₆ ⊕ Z₁₀'
                },
                {
                    name: 'Z₁₂ ⊕ Z₁₈ ⊕ Z₃₀',
                    freeRank: 0,
                    torsion: ['Z₁₂', 'Z₁₈', 'Z₃₀'],
                    description: 'Pure torsion module'
                },
                {
                    name: 'Z⁵',
                    freeRank: 5,
                    torsion: [],
                    description: 'Pure free module'
                },
                {
                    name: 'Z² ⊕ Z₄ ⊕ Z₂²',
                    freeRank: 2,
                    torsion: ['Z₄', 'Z₂', 'Z₂'],
                    description: 'Free rank 2 with 2-group torsion'
                }
            ];

            let currentModule = 0;

            function drawModuleBox(x, y, w, h, label, color, title = '') {
                viz.ctx.fillStyle = color + 'cc';
                viz.ctx.fillRect(x, y, w, h);

                viz.ctx.strokeStyle = viz.colors.white;
                viz.ctx.lineWidth = 2;
                viz.ctx.strokeRect(x, y, w, h);

                if (title) {
                    viz.ctx.fillStyle = viz.colors.white;
                    viz.ctx.font = 'bold 13px sans-serif';
                    viz.ctx.textAlign = 'center';
                    viz.ctx.fillText(title, x + w/2, y + 20);
                }

                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = '14px monospace';
                viz.ctx.textAlign = 'center';
                viz.ctx.textBaseline = 'middle';
                viz.ctx.fillText(label, x + w/2, y + h/2 + (title ? 10 : 0));
            }

            function draw() {
                viz.clear();

                const mod = modules[currentModule];

                // Title
                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = 'bold 20px sans-serif';
                viz.ctx.textAlign = 'left';
                viz.ctx.fillText('Free-Torsion Decomposition', 20, 30);

                viz.ctx.fillStyle = viz.colors.teal;
                viz.ctx.font = '16px monospace';
                viz.ctx.fillText(`M = ${mod.name}`, 20, 60);

                viz.ctx.fillStyle = viz.colors.text;
                viz.ctx.font = '13px sans-serif';
                viz.ctx.fillText(mod.description, 20, 85);

                // Draw decomposition
                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = 'bold 16px sans-serif';
                viz.ctx.fillText('M = M_free ⊕ M_tor', 50, 130);

                const boxWidth = 280;
                const boxHeight = 150;
                const boxY = 160;

                // Free part
                if (mod.freeRank > 0) {
                    drawModuleBox(50, boxY, boxWidth, boxHeight,
                        `Z^${mod.freeRank}`, viz.colors.blue, 'M_free');

                    viz.ctx.fillStyle = viz.colors.text;
                    viz.ctx.font = '12px sans-serif';
                    viz.ctx.textAlign = 'center';
                    viz.ctx.fillText(`Rank: ${mod.freeRank}`, 50 + boxWidth/2, boxY + boxHeight + 20);
                    viz.ctx.fillText('(torsion-free)', 50 + boxWidth/2, boxY + boxHeight + 38);
                } else {
                    viz.ctx.strokeStyle = viz.colors.blue + '44';
                    viz.ctx.lineWidth = 2;
                    viz.ctx.setLineDash([5, 5]);
                    viz.ctx.strokeRect(50, boxY, boxWidth, boxHeight);
                    viz.ctx.setLineDash([]);

                    viz.ctx.fillStyle = viz.colors.text;
                    viz.ctx.font = 'italic 14px sans-serif';
                    viz.ctx.textAlign = 'center';
                    viz.ctx.fillText('M_free = {0}', 50 + boxWidth/2, boxY + boxHeight/2);
                }

                // Oplus symbol
                viz.ctx.strokeStyle = viz.colors.teal;
                viz.ctx.lineWidth = 4;
                viz.ctx.beginPath();
                viz.ctx.arc(350, boxY + boxHeight/2, 25, 0, Math.PI * 2);
                viz.ctx.stroke();
                viz.ctx.beginPath();
                viz.ctx.moveTo(325, boxY + boxHeight/2);
                viz.ctx.lineTo(375, boxY + boxHeight/2);
                viz.ctx.moveTo(350, boxY + boxHeight/2 - 25);
                viz.ctx.lineTo(350, boxY + boxHeight/2 + 25);
                viz.ctx.stroke();

                // Torsion part
                if (mod.torsion.length > 0) {
                    const torsionLabel = mod.torsion.join(' ⊕ ');
                    drawModuleBox(400, boxY, boxWidth, boxHeight,
                        torsionLabel, viz.colors.orange, 'M_tor');

                    viz.ctx.fillStyle = viz.colors.text;
                    viz.ctx.font = '12px sans-serif';
                    viz.ctx.textAlign = 'center';
                    viz.ctx.fillText('(all torsion elements)', 400 + boxWidth/2, boxY + boxHeight + 20);
                } else {
                    viz.ctx.strokeStyle = viz.colors.orange + '44';
                    viz.ctx.lineWidth = 2;
                    viz.ctx.setLineDash([5, 5]);
                    viz.ctx.strokeRect(400, boxY, boxWidth, boxHeight);
                    viz.ctx.setLineDash([]);

                    viz.ctx.fillStyle = viz.colors.text;
                    viz.ctx.font = 'italic 14px sans-serif';
                    viz.ctx.textAlign = 'center';
                    viz.ctx.fillText('M_tor = {0}', 400 + boxWidth/2, boxY + boxHeight/2);
                }

                // Theorem box
                viz.ctx.strokeStyle = viz.colors.purple;
                viz.ctx.lineWidth = 2;
                viz.ctx.strokeRect(20, 360, 660, 120);

                viz.ctx.fillStyle = viz.colors.purple;
                viz.ctx.font = 'bold 14px sans-serif';
                viz.ctx.textAlign = 'left';
                viz.ctx.fillText('Theorem 6.9 (Free-Torsion Decomposition):', 30, 385);

                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = '12px sans-serif';
                viz.ctx.fillText('Any finitely generated module M over a PID decomposes uniquely as:', 30, 410);
                viz.ctx.fillText('M = M_free ⊕ M_tor', 50, 430);

                viz.ctx.fillStyle = viz.colors.text;
                viz.ctx.font = '11px sans-serif';
                viz.ctx.fillText('• M_free is a free module (uniquely determined up to rank)', 40, 453);
                viz.ctx.fillText('• M_tor contains all torsion elements (uniquely determined)', 40, 468);
            }

            // Controls
            const prevBtn = VizEngine.createButton(controls, '← Previous Example', () => {
                currentModule = (currentModule - 1 + modules.length) % modules.length;
                draw();
            });

            const nextBtn = VizEngine.createButton(controls, 'Next Example →', () => {
                currentModule = (currentModule + 1) % modules.length;
                draw();
            });

            const infoDiv = document.createElement('div');
            infoDiv.style.cssText = 'margin: 10px; padding: 8px; background: #1e1e1e; color: #8b949e; font-size: 11px; border-left: 3px solid #bc8cff;';
            infoDiv.innerHTML = '<strong>Key insight:</strong> The torsion part M_tor is the set {m ∈ M : rm = 0 for some r ≠ 0}. ' +
                'The quotient M/M_tor is torsion-free, hence free over a PID.';
            controls.appendChild(infoDiv);

            draw();
            return viz;
        }
    }
];

// Additional visualizations for other sections
window.EXTRA_VIZ['ch06']['ch06-sec02'] = [
    {
        id: 'ch06-extra-viz-7',
        title: 'Primary Module Decomposition Interactive',
        description: 'Decompose a torsion module into p-primary components. Each component consists of elements whose order is a power of a prime p.',
        setup: function(container, controls) {
            const viz = new VizEngine(container, { width: 700, height: 500, scale: 1 });

            const examples = [
                {
                    name: 'Z₃₆₀',
                    factorization: '2³ · 3² · 5',
                    primary: {
                        2: ['Z₈'],
                        3: ['Z₉'],
                        5: ['Z₅']
                    }
                },
                {
                    name: 'Z₁₂ ⊕ Z₁₈',
                    factorization: '(2² · 3) ⊕ (2 · 3²)',
                    primary: {
                        2: ['Z₄', 'Z₂'],
                        3: ['Z₃', 'Z₉']
                    }
                },
                {
                    name: 'Z₁₀₀ ⊕ Z₅₀',
                    factorization: '(2² · 5²) ⊕ (2 · 5²)',
                    primary: {
                        2: ['Z₄', 'Z₂'],
                        5: ['Z₂₅', 'Z₂₅']
                    }
                }
            ];

            let currentExample = 0;

            function draw() {
                viz.clear();

                const ex = examples[currentExample];

                // Title
                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = 'bold 20px sans-serif';
                viz.ctx.textAlign = 'left';
                viz.ctx.fillText('Primary Decomposition of Torsion Module', 20, 30);

                viz.ctx.fillStyle = viz.colors.teal;
                viz.ctx.font = '16px monospace';
                viz.ctx.fillText(`M = ${ex.name}`, 20, 60);

                viz.ctx.fillStyle = viz.colors.text;
                viz.ctx.font = '13px monospace';
                viz.ctx.fillText(`Factorization: ${ex.factorization}`, 20, 85);

                // Primary decomposition
                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = 'bold 14px sans-serif';
                viz.ctx.fillText('M = ⊕ M_pᵢ (p-primary components)', 50, 130);

                const primes = Object.keys(ex.primary).map(Number).sort((a, b) => a - b);
                const colors = [viz.colors.purple, viz.colors.pink, viz.colors.yellow, viz.colors.green];

                let y = 170;
                primes.forEach((p, idx) => {
                    const components = ex.primary[p];
                    const color = colors[idx % colors.length];

                    // Draw box for this prime
                    viz.ctx.strokeStyle = color;
                    viz.ctx.lineWidth = 2;
                    viz.ctx.strokeRect(60, y - 10, 580, 60);

                    viz.ctx.fillStyle = color;
                    viz.ctx.font = 'bold 14px sans-serif';
                    viz.ctx.textAlign = 'left';
                    viz.ctx.fillText(`${p}-primary:`, 70, y + 10);

                    viz.ctx.fillStyle = viz.colors.white;
                    viz.ctx.font = '14px monospace';
                    const componentsText = components.join(' ⊕ ');
                    viz.ctx.fillText(`M_${p} = ${componentsText}`, 70, y + 32);

                    y += 80;
                });

                // Theorem box
                const boxY = Math.max(y + 20, 400);
                viz.ctx.strokeStyle = viz.colors.purple;
                viz.ctx.lineWidth = 2;
                viz.ctx.strokeRect(20, boxY, 660, 80);

                viz.ctx.fillStyle = viz.colors.purple;
                viz.ctx.font = 'bold 13px sans-serif';
                viz.ctx.fillText('Theorem 6.10 (Primary Decomposition):', 30, boxY + 25);

                viz.ctx.fillStyle = viz.colors.white;
                viz.ctx.font = '12px sans-serif';
                viz.ctx.fillText('Every torsion module over a PID uniquely decomposes as M = ⊕ M_pᵢ where', 30, boxY + 47);
                viz.ctx.fillText('each M_pᵢ is pᵢ-primary (order is a power of prime pᵢ).', 30, boxY + 64);
            }

            // Controls
            const prevBtn = VizEngine.createButton(controls, '← Previous', () => {
                currentExample = (currentExample - 1 + examples.length) % examples.length;
                draw();
            });

            const nextBtn = VizEngine.createButton(controls, 'Next →', () => {
                currentExample = (currentExample + 1) % examples.length;
                draw();
            });

            draw();
            return viz;
        }
    }
];
