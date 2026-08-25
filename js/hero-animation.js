/**
 * Hero Section 3D Three.js Animation - Soccer / Football Theme
 * Prima Nusa Sport - Sportswear Manufacture
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas) return;

    const heroSection = document.getElementById('home');
    if (!heroSection) return;

    // --- SCENE & RENDERER SETUP ---
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
        45,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 7.2);

    // WebGL Renderer with Alpha Transparency & Antialiasing
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Stadium Key Light (Primary Red Spotlight)
    const redLight = new THREE.PointLight(0xdc2626, 4.0, 16);
    redLight.position.set(3, 4, 4);
    scene.add(redLight);

    // Rim Light (Bright White/Cyan Accent)
    const rimLight = new THREE.PointLight(0xffffff, 2.5, 16);
    rimLight.position.set(-4, -3, 3);
    scene.add(rimLight);

    // Top Soft Light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(0, 6, 6);
    scene.add(dirLight);

    // --- 3D SOCCER BALL PROCEDURAL GEOMETRY ---
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    function createSoccerBall(radius = 1.75) {
        const ballGroup = new THREE.Group();
        const t = (1 + Math.sqrt(5)) / 2; // Golden Ratio

        // 12 Original Icosahedron Vertices
        const icoVertices = [
            new THREE.Vector3(-1,  t,  0), new THREE.Vector3( 1,  t,  0), new THREE.Vector3(-1, -t,  0), new THREE.Vector3( 1, -t,  0),
            new THREE.Vector3( 0, -1,  t), new THREE.Vector3( 0,  1,  t), new THREE.Vector3( 0, -1, -t), new THREE.Vector3( 0,  1, -t),
            new THREE.Vector3( t,  0, -1), new THREE.Vector3( t,  0,  1), new THREE.Vector3(-t,  0, -1), new THREE.Vector3(-t,  0,  1)
        ];

        icoVertices.forEach(v => v.normalize());

        // Find neighbors for each vertex
        const neighbors = Array.from({ length: 12 }, () => []);
        for (let i = 0; i < 12; i++) {
            for (let j = i + 1; j < 12; j++) {
                if (icoVertices[i].distanceTo(icoVertices[j]) < 1.1) {
                    neighbors[i].push(j);
                    neighbors[j].push(i);
                }
            }
        }

        // Find 20 Triangular Faces of original icosahedron
        const icoFaces = [];
        for (let i = 0; i < 12; i++) {
            for (const j of neighbors[i]) {
                if (j > i) {
                    for (const k of neighbors[j]) {
                        if (k > j && neighbors[i].includes(k)) {
                            icoFaces.push([i, j, k]);
                        }
                    }
                }
            }
        }

        // Truncation cache
        const truncatedCache = {};
        function getTruncatedPoint(aIdx, bIdx) {
            const key = `${aIdx}_${bIdx}`;
            if (truncatedCache[key]) return truncatedCache[key];

            const pA = icoVertices[aIdx];
            const pB = icoVertices[bIdx];
            const p = new THREE.Vector3()
                .copy(pA).multiplyScalar(2 / 3)
                .add(new THREE.Vector3().copy(pB).multiplyScalar(1 / 3))
                .normalize()
                .multiplyScalar(radius);

            truncatedCache[key] = p;
            return p;
        }

        // Materials
        const pentagonMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xdc2626, // Crimson Red (Prima Nusa Sport Brand Color)
            emissive: 0x330000,
            metalness: 0.35,
            roughness: 0.2,
            clearcoat: 0.7,
            clearcoatRoughness: 0.1
        });

        const hexagonMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xf5f5f7, // Metallic White/Silver
            metalness: 0.15,
            roughness: 0.2,
            clearcoat: 0.6,
            clearcoatRoughness: 0.15
        });

        const coreMaterial = new THREE.MeshStandardMaterial({
            color: 0x08080c,
            metalness: 0.9,
            roughness: 0.1
        });

        // Inner Core Sphere (Visible at panel seam grooves)
        const coreSphere = new THREE.Mesh(
            new THREE.SphereGeometry(radius * 0.97, 32, 32),
            coreMaterial
        );
        ballGroup.add(coreSphere);

        // Helper to construct curved extruded panel geometry
        function createPanelMesh(polyPoints, material) {
            // Compute centroid normal
            const centroid = new THREE.Vector3();
            polyPoints.forEach(p => centroid.add(p));
            centroid.divideScalar(polyPoints.length);
            const normal = centroid.clone().normalize();

            // Create local coordinate basis
            const v0 = polyPoints[0].clone().sub(centroid).normalize();
            const vY = new THREE.Vector3().crossVectors(normal, v0).normalize();
            const vX = new THREE.Vector3().crossVectors(vY, normal).normalize();

            // Project 3D points to 2D local shape
            const shape2DPoints = polyPoints.map(p => {
                const diff = p.clone().sub(centroid);
                return new THREE.Vector2(diff.dot(vX), diff.dot(vY));
            });

            // Scale slightly down for seam gap
            const scaleFactor = 0.94;
            const scaled2DPoints = shape2DPoints.map(p => p.clone().multiplyScalar(scaleFactor));

            const shape = new THREE.Shape(scaled2DPoints);

            const extrudeSettings = {
                depth: 0.06,
                bevelEnabled: true,
                bevelSegments: 2,
                steps: 1,
                bevelSize: 0.025,
                bevelThickness: 0.025
            };

            const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);

            // Matrix transform to align 2D local extrude to original 3D position
            const matrix = new THREE.Matrix4();
            matrix.makeBasis(vX, vY, normal);
            matrix.setPosition(centroid.clone().add(normal.clone().multiplyScalar(0.01)));

            geom.applyMatrix4(matrix);

            return new THREE.Mesh(geom, material);
        }

        // 1. Build 12 Pentagon Panels
        for (let i = 0; i < 12; i++) {
            const nbrs = [...neighbors[i]];
            const center = icoVertices[i];
            const normal = center.clone().normalize();
            const refVec = new THREE.Vector3().subVectors(icoVertices[nbrs[0]], center).normalize();

            nbrs.sort((a, b) => {
                const vA = new THREE.Vector3().subVectors(icoVertices[a], center).normalize();
                const vB = new THREE.Vector3().subVectors(icoVertices[b], center).normalize();
                
                const cA = new THREE.Vector3().crossVectors(refVec, vA);
                let angA = Math.atan2(cA.dot(normal), refVec.dot(vA));
                if (angA < 0) angA += Math.PI * 2;

                const cB = new THREE.Vector3().crossVectors(refVec, vB);
                let angB = Math.atan2(cB.dot(normal), refVec.dot(vB));
                if (angB < 0) angB += Math.PI * 2;

                return angA - angB;
            });

            const polyPoints = nbrs.map(nbrIdx => getTruncatedPoint(i, nbrIdx));
            const panelMesh = createPanelMesh(polyPoints, pentagonMaterial);
            ballGroup.add(panelMesh);
        }

        // 2. Build 20 Hexagon Panels
        for (const face of icoFaces) {
            const [a, b, c] = face;
            const p1 = getTruncatedPoint(a, b);
            const p2 = getTruncatedPoint(b, a);
            const p3 = getTruncatedPoint(b, c);
            const p4 = getTruncatedPoint(c, b);
            const p5 = getTruncatedPoint(c, a);
            const p6 = getTruncatedPoint(a, c);

            const polyPoints = [p1, p2, p3, p4, p5, p6];
            const panelMesh = createPanelMesh(polyPoints, hexagonMaterial);
            ballGroup.add(panelMesh);
        }

        return ballGroup;
    }

    const soccerBall = createSoccerBall(1.75);
    heroGroup.add(soccerBall);

    // --- ORBITING DYNAMIC STADIUM / TRAJECTORY RINGS ---
    const ringGroup = new THREE.Group();

    // Ring 1 - Crimson Trajectory Ring
    const ring1Geo = new THREE.TorusGeometry(2.35, 0.025, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
        color: 0xdc2626,
        emissive: 0xdc2626,
        emissiveIntensity: 0.6,
        roughness: 0.2
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    // Ring 2 - Outer Wireframe Goal Ring
    const ring2Geo = new THREE.TorusGeometry(2.7, 0.015, 12, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 5;
    ringGroup.add(ring2);

    heroGroup.add(ringGroup);

    // --- FLOATING 3D MINI PENTAGONS & PARTICLES ---
    const miniPentagons = new THREE.Group();
    const pentagonShape = new THREE.Shape();
    for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(a) * 0.12;
        const y = Math.sin(a) * 0.12;
        if (i === 0) pentagonShape.moveTo(x, y);
        else pentagonShape.lineTo(x, y);
    }
    pentagonShape.closePath();

    const miniGeo = new THREE.ExtrudeGeometry(pentagonShape, { depth: 0.02, bevelEnabled: true, bevelSize: 0.005, bevelThickness: 0.005 });
    miniGeo.center();

    const miniMat = new THREE.MeshStandardMaterial({
        color: 0xdc2626,
        metalness: 0.8,
        roughness: 0.2
    });

    const miniCount = 14;
    const miniMeshes = [];
    for (let i = 0; i < miniCount; i++) {
        const mesh = new THREE.Mesh(miniGeo, miniMat);
        mesh.position.set(
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 5
        );
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        mesh.userData = {
            rotSpeedX: (Math.random() - 0.5) * 1.5,
            rotSpeedY: (Math.random() - 0.5) * 1.5,
            floatSpeed: Math.random() * 0.8 + 0.4,
            offset: Math.random() * Math.PI * 2
        };
        miniPentagons.add(mesh);
        miniMeshes.push(mesh);
    }
    scene.add(miniPentagons);

    // Stadium Speed Particle Cloud
    const particleCount = 160;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 12;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
        color: 0xff3355,
        size: 0.07,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // --- MOUSE PARALLAX INTERACTION ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) / windowHalfX;
        mouseY = (event.clientY - windowHalfY) / windowHalfY;
    }
    window.addEventListener('mousemove', onDocumentMouseMove, { passive: true });

    // --- ANIMATION LOOP (Skill: threejs-animation) ---
    const clock = new THREE.Clock();
    let isRendering = true;

    function animate() {
        if (!isRendering) return;

        requestAnimationFrame(animate);

        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();

        // 1. Procedural Hover & Soccer Spin Motion
        heroGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.14;

        // Continuous Realistic Soccer Ball Rotation
        soccerBall.rotation.y += delta * 0.45;
        soccerBall.rotation.x = Math.sin(elapsedTime * 0.5) * 0.2;
        soccerBall.rotation.z = Math.cos(elapsedTime * 0.4) * 0.15;

        // Trajectory Ring Rotations
        ring1.rotation.z += delta * 0.5;
        ring2.rotation.z -= delta * 0.35;
        ring2.rotation.x = Math.sin(elapsedTime * 0.6) * 0.4;

        // Floating Mini Pentagons Animation
        miniMeshes.forEach(m => {
            m.rotation.x += delta * m.userData.rotSpeedX;
            m.rotation.y += delta * m.userData.rotSpeedY;
            m.position.y += Math.sin(elapsedTime * m.userData.floatSpeed + m.userData.offset) * 0.003;
        });

        // Particle System Rotation
        particleSystem.rotation.y = elapsedTime * 0.04;

        // 2. Smooth Mouse Parallax Lerp
        targetX += (mouseX - targetX) * 0.06;
        targetY += (mouseY - targetY) * 0.06;

        heroGroup.rotation.y = soccerBall.rotation.y + targetX * 0.5;
        heroGroup.rotation.x = targetY * 0.4;

        camera.position.x = targetX * 0.6;
        camera.position.y = -targetY * 0.6;
        camera.lookAt(scene.position);

        // 3. Dynamic Light Pulse
        redLight.intensity = 4.0 + Math.sin(elapsedTime * 2.2) * 1.2;

        renderer.render(scene, camera);
    }

    animate();

    // --- RESPONSIVE RESIZE HANDLER ---
    function onWindowResize() {
        if (!canvas || !canvas.parentElement) return;
        const width = canvas.parentElement.clientWidth || window.innerWidth;
        const height = canvas.parentElement.clientHeight || window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }
    window.addEventListener('resize', onWindowResize, { passive: true });

    setTimeout(onWindowResize, 100);

    // --- INTERSECTION OBSERVER FOR GPU EFFICIENCY ---
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (!isRendering) {
                        isRendering = true;
                        clock.start();
                        animate();
                    }
                } else {
                    isRendering = false;
                }
            });
        }, { threshold: 0.05 });

        observer.observe(heroSection);
    }
});
