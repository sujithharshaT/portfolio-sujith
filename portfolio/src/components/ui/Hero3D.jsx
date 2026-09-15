import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Hero3D.css';

const checkWebGLSupport = () => {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
};

const IS_WEBGL_AVAILABLE = checkWebGLSupport();

const Hero3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!IS_WEBGL_AVAILABLE) return;

    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.5;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // Geometry: Abstract futuristic metallic monolith / sculpture
    const group = new THREE.Group();
    scene.add(group);

    // Outer crystalline sculpture
    const outerGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.95,
      roughness: 0.15,
      wireframe: false,
      flatShading: true,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // Fine wireframe cage for futuristic technical depth
    const wireGeo = new THREE.IcosahedronGeometry(1.62, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    group.add(wireMesh);

    // Inner glowing core representing the genesis of an idea
    const coreGeo = new THREE.OctahedronGeometry(0.7, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x00ffff,
      emissiveIntensity: 0.15,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Orbital ring
    const ringGeo = new THREE.TorusGeometry(2.2, 0.02, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x555555,
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 0.4
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    group.add(ringMesh);

    // Lighting setup for rich metallic reflections
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
    mainLight.position.set(5, 8, 5);
    scene.add(mainLight);

    const cyanRimLight = new THREE.PointLight(0x00ffff, 4, 15);
    cyanRimLight.position.set(-4, -2, 3);
    scene.add(cyanRimLight);

    const blueFillLight = new THREE.PointLight(0x3b82f6, 3, 15);
    blueFillLight.position.set(4, -3, -2);
    scene.add(blueFillLight);

    // Mouse interactivity
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 0.8;
      targetY = (e.clientY / innerHeight - 0.5) * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Window resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth mouse follow (lerp)
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Floating oscillation
      group.position.y = Math.sin(elapsedTime * 0.8) * 0.15;
      
      // Continuous subtle rotations
      outerMesh.rotation.y = elapsedTime * 0.12 + mouseX * 0.5;
      outerMesh.rotation.x = elapsedTime * 0.08 + mouseY * 0.5;

      wireMesh.rotation.y = elapsedTime * 0.12 + mouseX * 0.5;
      wireMesh.rotation.x = elapsedTime * 0.08 + mouseY * 0.5;

      coreMesh.rotation.y = -elapsedTime * 0.2 + mouseX * 0.8;
      coreMesh.rotation.z = elapsedTime * 0.15;

      ringMesh.rotation.z = elapsedTime * 0.05;
      ringMesh.rotation.y = mouseX * 0.3;

      // Interactive light follow
      cyanRimLight.position.x = -4 + mouseX * 2;
      cyanRimLight.position.y = -2 - mouseY * 2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      outerGeo.dispose();
      outerMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <div className="hero-3d-wrapper" ref={mountRef}>
      {!IS_WEBGL_AVAILABLE && (
        <div className="hero-3d-fallback">
          <div className="fallback-sculpture">
            <div className="fallback-ring"></div>
            <div className="fallback-core"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero3D;
