import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './Hero3D.css';

const checkWebGLSupport = () => {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};

const IS_WEBGL_AVAILABLE = checkWebGLSupport();

const getInitialFallback = () => {
  if (!IS_WEBGL_AVAILABLE) return true;
  if (typeof window === 'undefined') return false;
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
};

const Hero3D = () => {
  const mountRef = useRef(null);
  const [useFallback, setUseFallback] = useState(getInitialFallback);

  useEffect(() => {
    if (useFallback) return;

    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = isMobile ? 6.2 : 5.5;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: !isMobile,
        powerPreference: isMobile ? 'default' : 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);
    } catch {
      setTimeout(() => setUseFallback(true), 0);
      return;
    }

    // Geometry: Abstract futuristic metallic monolith
    const group = new THREE.Group();
    scene.add(group);

    // Outer crystalline sculpture
    const outerGeo = new THREE.IcosahedronGeometry(1.5, isMobile ? 0 : 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x141416,
      metalness: 0.92,
      roughness: 0.18,
      wireframe: false,
      flatShading: true,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // Fine wireframe cage
    const wireGeo = new THREE.IcosahedronGeometry(1.52, isMobile ? 0 : 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    group.add(wireMesh);

    // Inner glowing core
    const coreGeo = new THREE.OctahedronGeometry(0.65, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x222226,
      metalness: 0.9,
      roughness: 0.12,
      emissive: 0x00ffff,
      emissiveIntensity: 0.2,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Orbital ring
    const ringGeo = new THREE.TorusGeometry(2.1, 0.018, 12, isMobile ? 36 : 80);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x444444,
      metalness: 0.9,
      roughness: 0.25,
      transparent: true,
      opacity: 0.35
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    group.add(ringMesh);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.2);
    mainLight.position.set(5, 7, 5);
    scene.add(mainLight);

    const cyanRimLight = new THREE.PointLight(0x00ffff, 3.5, 14);
    cyanRimLight.position.set(-4, -2, 3);
    scene.add(cyanRimLight);

    const blueFillLight = new THREE.PointLight(0x3b82f6, 2.5, 14);
    blueFillLight.position.set(4, -3, -2);
    scene.add(blueFillLight);

    // Mouse interactivity (Desktop only)
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 0.6;
      targetY = (e.clientY / innerHeight - 0.5) * 0.6;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Window resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Animation Loop with Visibility & Intersection Observer Pausing
    let animationFrameId;
    let isIntersecting = true;
    let isVisible = !document.hidden;
    const startTime = performance.now();

    const animate = () => {
      if (!isIntersecting || !isVisible) {
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth mouse follow (lerp)
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      // Floating oscillation
      group.position.y = Math.sin(elapsedTime * 0.7) * 0.12;
      
      // Rotations
      outerMesh.rotation.y = elapsedTime * 0.1 + mouseX * 0.4;
      outerMesh.rotation.x = elapsedTime * 0.06 + mouseY * 0.4;

      wireMesh.rotation.y = elapsedTime * 0.1 + mouseX * 0.4;
      wireMesh.rotation.x = elapsedTime * 0.06 + mouseY * 0.4;

      coreMesh.rotation.y = -elapsedTime * 0.18 + mouseX * 0.6;
      coreMesh.rotation.z = elapsedTime * 0.12;

      ringMesh.rotation.z = elapsedTime * 0.04;
      ringMesh.rotation.y = mouseX * 0.25;

      renderer.render(scene, camera);
    };

    const startAnimation = () => {
      if (!animationFrameId && isIntersecting && isVisible) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    startAnimation();

    // Intersection Observer: Freeze Three.js loop when scrolled down the page
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          startAnimation();
        } else if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        startAnimation();
      } else if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // WebGL Context Loss Handling
    const handleContextLost = (e) => {
      e.preventDefault();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      setUseFallback(true);
    };

    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      if (renderer && renderer.domElement) {
        renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
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
  }, [useFallback]);

  return (
    <div className="hero-3d-wrapper" ref={mountRef} aria-hidden="true">
      {useFallback && (
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
