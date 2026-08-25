/**
 * Hero Section 3D Three.js Animation
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
    camera.position.set(0, 0, 7.5);

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

    // Primary Brand Red Spot Light
    const redLight = new THREE.PointLight(0xdc2626, 3.5, 15);
    redLight.position.set(2, 3, 4);
    scene.add(redLight);

    // Secondary Rim Light (White/Cyan Highlight)
    const rimLight = new THREE.PointLight(0xffffff, 2.0, 15);
    rimLight.position.set(-3, -2, 3);
    scene.add(rimLight);

    // Top Key Light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(0, 5, 5);
    scene.add(dirLight);

    // --- 3D OBJECTS CREATION ---
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    // 1. Stylized 3D Sport Shield / Badge Container
    const shieldGroup = new THREE.Group();

    // Outer Shield Frame (Extruded Geometry)
    const shieldShape = new THREE.Shape();
    shieldShape.moveTo(0, 1.6);
    shieldShape.quadraticCurveTo(1.3, 1.4, 1.3, 0.2);
    shieldShape.quadraticCurveTo(1.2, -1.0, 0, -1.7);
    shieldShape.quadraticCurveTo(-1.2, -1.0, -1.3, 0.2);
    shieldShape.quadraticCurveTo(-1.3, 1.4, 0, 1.6);

    const extrudeSettings = {
        depth: 0.25,
        bevelEnabled: true,
        bevelSegments: 5,
        steps: 2,
        bevelSize: 0.08,
        bevelThickness: 0.08
    };

    const shieldGeometry = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
    shieldGeometry.center();

    // Primary Shield Material (Dark Metallic Onyx)
    const shieldMaterial = new THREE.MeshStandardMaterial({
        color: 0x111115,
        metalness: 0.85,
        roughness: 0.2,
        clearcoat: 0.5,
        clearcoatRoughness: 0.1
    });

    const shieldMesh = new THREE.Mesh(shieldGeometry, shieldMaterial);
    shieldGroup.add(shieldMesh);

    // Inner Emblem (Crimson Red Metallic Inset)
    const innerShape = new THREE.Shape();
    innerShape.moveTo(0, 1.4);
    innerShape.quadraticCurveTo(1.1, 1.2, 1.1, 0.15);
    innerShape.quadraticCurveTo(1.0, -0.85, 0, -1.45);
    innerShape.quadraticCurveTo(-1.0, -0.85, -1.1, 0.15);
    innerShape.quadraticCurveTo(-1.1, 1.2, 0, 1.4);

    const innerExtrudeSettings = {
        depth: 0.1,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.04,
        bevelThickness: 0.04
    };

    const innerGeometry = new THREE.ExtrudeGeometry(innerShape, innerExtrudeSettings);
    innerGeometry.center();

    const innerMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xdc2626,
        emissive: 0x550000,
        roughness: 0.25,
        metalness: 0.6,
        clearcoat: 0.8
    });

    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    innerMesh.position.z = 0.12;
    shieldGroup.add(innerMesh);

    // Sport Star Emblem inside shield
    const starShape = new THREE.Shape();
    const points = 5;
    const outerRadius = 0.45;
    const innerRadius = 0.2;
    
    for (let i = 0; i < points * 2; i++) {
        const r = (i % 2 === 0) ? outerRadius : innerRadius;
        const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i === 0) starShape.moveTo(x, y);
        else starShape.lineTo(x, y);
    }
    starShape.closePath();

    const starGeometry = new THREE.ExtrudeGeometry(starShape, { depth: 0.08, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02 });
    starGeometry.center();
    const starMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.1
    });
    const starMesh = new THREE.Mesh(starGeometry, starMaterial);
    starMesh.position.z = 0.22;
    starMesh.position.y = 0.1;
    shieldGroup.add(starMesh);

    heroGroup.add(shieldGroup);

    // 2. Orbiting Energy Rings (3D Athletic Rings)
    const ringGroup = new THREE.Group();

    // Ring 1 - Crimson Wireframe Ring
    const ring1Geo = new THREE.TorusGeometry(2.1, 0.03, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
        color: 0xdc2626,
        emissive: 0xdc2626,
        emissiveIntensity: 0.5,
        roughness: 0.3
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    // Ring 2 - Outer Glow Accent Ring
    const ring2Geo = new THREE.TorusGeometry(2.5, 0.015, 12, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    ringGroup.add(ring2);

    heroGroup.add(ringGroup);

    // 3. Floating 3D Particle Cloud
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 12;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle Texture/Material
    const particleMaterial = new THREE.PointsMaterial({
        color: 0xff3355,
        size: 0.08,
        transparent: true,
        opacity: 0.75,
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

        // 1. Procedural Hover & Wave Bounce
        heroGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

        // 2. Continuous 3D Object Rotations
        shieldGroup.rotation.y = Math.sin(elapsedTime * 0.6) * 0.2;
        starMesh.rotation.z = Math.sin(elapsedTime * 1.2) * 0.1;

        ring1.rotation.z += delta * 0.4;
        ring2.rotation.z -= delta * 0.3;
        ring2.rotation.x = Math.sin(elapsedTime * 0.5) * 0.5;

        // 3. Particle System Motion
        particleSystem.rotation.y = elapsedTime * 0.05;
        particleSystem.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1;

        // 4. Smooth Mouse Parallax Lerp
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        heroGroup.rotation.y = targetX * 0.4;
        heroGroup.rotation.x = -targetY * 0.3;
        
        camera.position.x = targetX * 0.5;
        camera.position.y = -targetY * 0.5;
        camera.lookAt(scene.position);

        // 5. Dynamic Light Pulse
        redLight.intensity = 3.5 + Math.sin(elapsedTime * 2.5) * 1.0;

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

    // Initial trigger to ensure correct aspect
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
