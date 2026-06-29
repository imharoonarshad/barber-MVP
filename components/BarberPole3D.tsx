"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Interactive 3D barber pole — the red/white/blue helix from the storefront,
 * rendered live with Three.js. Auto-spins, and visitors can drag to spin it
 * faster (with momentum). Pauses when scrolled off-screen to save battery.
 */
export default function BarberPole3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // ---- renderer / scene / camera ----
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.touchAction = "pan-y"; // let the page scroll vertically
    renderer.domElement.style.cursor = "grab";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    // ---- diagonal red/white/blue stripe texture (tiles seamlessly) ----
    const tex = (() => {
      const size = 128;
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const ctx = c.getContext("2d")!;
      const colors = ["#d1312a", "#ffffff", "#2a4ea0", "#ffffff"]; // red/white/blue/white
      const band = size / 8; // 8 bands across the diagonal period
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          // colour by (x+y) so the stripes run at 45°, periodic in both axes
          const idx = Math.floor((((x + y) % (band * colors.length)) / band)) % colors.length;
          ctx.fillStyle = colors[idx];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      const t = new THREE.CanvasTexture(c);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(3, 5);
      t.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return t;
    })();

    // ---- the pole ----
    const group = new THREE.Group();
    group.rotation.z = 0.12; // slight jaunty tilt

    const glass = new THREE.Mesh(
      new THREE.CylinderGeometry(0.78, 0.78, 3.4, 64, 1, true),
      new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.3,
        metalness: 0.1,
        side: THREE.DoubleSide,
      }),
    );
    group.add(glass);

    // chrome / brass caps + knobs (brand gold)
    const gold = new THREE.MeshStandardMaterial({
      color: 0xf5b61c,
      metalness: 0.85,
      roughness: 0.25,
    });
    const capGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.3, 64);
    const knobGeo = new THREE.SphereGeometry(0.34, 32, 32);
    [1.85, -1.85].forEach((y) => {
      const cap = new THREE.Mesh(capGeo, gold);
      cap.position.y = y;
      group.add(cap);
    });
    [2.25, -2.25].forEach((y) => {
      const knob = new THREE.Mesh(knobGeo, gold);
      knob.position.y = y;
      group.add(knob);
    });
    scene.add(group);

    // ---- lights ----
    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(3, 5, 4);
    scene.add(key);
    const warm = new THREE.PointLight(0xffd9a0, 0.8, 30);
    warm.position.set(-4, 2, 3);
    scene.add(warm);
    const cool = new THREE.PointLight(0x6da0ff, 0.5, 30);
    cool.position.set(4, -2, 2);
    scene.add(cool);

    // ---- interaction (drag to spin, with momentum) ----
    const AUTO = 0.01;
    let vel = AUTO;
    let dragging = false;
    let lastX = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      renderer.domElement.style.cursor = "grabbing";
      renderer.domElement.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      vel = dx * 0.02;
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      renderer.domElement.style.cursor = "grab";
      try {
        renderer.domElement.releasePointerCapture(e.pointerId);
      } catch {}
    };
    renderer.domElement.addEventListener("pointerdown", onDown);
    renderer.domElement.addEventListener("pointermove", onMove);
    renderer.domElement.addEventListener("pointerup", onUp);
    renderer.domElement.addEventListener("pointerleave", onUp);

    // ---- animation loop (paused when off-screen) ----
    let raf = 0;
    let running = true;
    const tick = () => {
      group.rotation.y += vel;
      tex.offset.y -= 0.004; // extra endless-upward drift
      if (!dragging) vel += (AUTO - vel) * 0.04; // ease back to auto-spin
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(tick);

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.05 },
    );
    io.observe(mount);

    // ---- resize ----
    const ro = new ResizeObserver(() => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    ro.observe(mount);

    // ---- cleanup ----
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("pointermove", onMove);
      renderer.domElement.removeEventListener("pointerup", onUp);
      renderer.domElement.removeEventListener("pointerleave", onUp);
      tex.dispose();
      glass.geometry.dispose();
      (glass.material as THREE.Material).dispose();
      capGeo.dispose();
      knobGeo.dispose();
      gold.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden />;
}
