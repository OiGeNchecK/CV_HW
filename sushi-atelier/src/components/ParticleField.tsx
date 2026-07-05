"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * WebGL particle drift — gold "dust" floating in depth behind the hero.
 * Reacts to mouse (camera parallax) and scroll (slow rise).
 */
export default function ParticleField({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      wrap.clientWidth / wrap.clientHeight,
      0.1,
      60
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    wrap.appendChild(renderer.domElement);

    const isMobile = window.innerWidth < 768;

    const makeLayer = (count: number, spread: number, size: number, color: number, opacity: number) => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const speed = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * spread * 2.4;
        pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 1.4;
        pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
        speed[i] = 0.15 + Math.random() * 0.85;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        size,
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });
      const points = new THREE.Points(geo, mat);
      scene.add(points);
      return { points, geo, mat, speed, count };
    };

    const layers = [
      makeLayer(isMobile ? 220 : 520, 6, 0.028, 0xd9b57c, 0.65),
      makeLayer(isMobile ? 60 : 140, 5, 0.055, 0xf0836c, 0.35),
    ];

    let mouseX = 0;
    let mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const clock = new THREE.Clock();
    let rafId = 0;
    let running = true;

    const tick = () => {
      if (!running) return;
      rafId = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      const scroll = window.scrollY / window.innerHeight; // 0..~1 over hero

      layers.forEach((l, li) => {
        const arr = l.geo.attributes.position.array as Float32Array;
        for (let i = 0; i < l.count; i++) {
          arr[i * 3 + 1] += 0.0016 * l.speed[i];
          if (arr[i * 3 + 1] > 5) arr[i * 3 + 1] = -5;
        }
        l.geo.attributes.position.needsUpdate = true;
        l.points.rotation.y = t * 0.02 * (li === 0 ? 1 : -1.6);
        l.points.position.y = scroll * (li === 0 ? 1.4 : 2.4);
      });

      camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    tick();

    // pause when hero is off-screen — keeps the rest of the page at 60fps
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          tick();
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0 }
    );
    io.observe(wrap);

    const onResize = () => {
      camera.aspect = wrap.clientWidth / wrap.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(wrap.clientWidth, wrap.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      layers.forEach((l) => {
        l.geo.dispose();
        l.mat.dispose();
        scene.remove(l.points);
      });
      renderer.dispose();
      wrap.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={wrapRef} className={className} aria-hidden />;
}
