"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * "Cutting" scene: a pair of barber scissors that continuously snip open and
 * closed while hair clippings rain down and tumble around them. Drag to rotate
 * the scissors. Pauses when off-screen; fully disposed on unmount.
 */
export default function CutScene3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.touchAction = "pan-y";
    renderer.domElement.style.cursor = "grab";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    // ---- materials ----
    const steel = new THREE.MeshStandardMaterial({ color: 0xcfd3d8, metalness: 0.95, roughness: 0.22 });
    const gold = new THREE.MeshStandardMaterial({ color: 0xf5b61c, metalness: 0.85, roughness: 0.25 });

    // ---- build one scissor half (blade + shank + handle), pivoting at origin ----
    function makeHalf(): THREE.Group {
      const half = new THREE.Group();

      const shape = new THREE.Shape();
      shape.moveTo(0, -0.06);
      shape.lineTo(1.7, -0.015);
      shape.lineTo(1.98, 0); // tip
      shape.lineTo(1.7, 0.035);
      shape.lineTo(0, 0.085);
      shape.lineTo(0, -0.06);
      const bladeGeo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.04,
        bevelEnabled: true,
        bevelThickness: 0.012,
        bevelSize: 0.012,
        bevelSegments: 1,
      });
      bladeGeo.translate(0, 0, -0.02);
      half.add(new THREE.Mesh(bladeGeo, steel));

      const shankGeo = new THREE.BoxGeometry(0.7, 0.07, 0.06);
      shankGeo.translate(-0.35, 0.01, 0);
      half.add(new THREE.Mesh(shankGeo, steel));

      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.045, 18, 36), gold);
      handle.position.set(-0.78, 0.01, 0);
      half.add(handle);

      return half;
    }

    const scissors = new THREE.Group();
    const top = makeHalf();
    const bottom = makeHalf();
    scissors.add(top, bottom);

    // pivot screw
    const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.16, 24), gold);
    screw.rotation.x = Math.PI / 2;
    scissors.add(screw);

    scissors.rotation.x = -0.25;
    scissors.rotation.z = 0.35;
    scene.add(scissors);

    // ---- falling hair clippings (instanced) ----
    const COUNT = 240;
    const hairGeo = new THREE.BoxGeometry(0.014, 0.16, 0.014);
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x241e1a, roughness: 0.85 });
    const hair = new THREE.InstancedMesh(hairGeo, hairMat, COUNT);
    const dummy = new THREE.Object3D();
    type Bit = { x: number; y: number; z: number; vy: number; rx: number; rz: number; sx: number; sz: number };
    const bits: Bit[] = [];
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    for (let i = 0; i < COUNT; i++) {
      bits.push({
        x: rand(-6, 6), y: rand(-4.5, 5), z: rand(-2.5, 2),
        vy: rand(0.006, 0.018), rx: rand(0, Math.PI), rz: rand(0, Math.PI),
        sx: rand(0.5, 1.3), sz: rand(0.5, 1.3),
      });
    }
    scene.add(hair);

    // ---- lights ----
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(3, 5, 4);
    scene.add(key);
    const warm = new THREE.PointLight(0xffd9a0, 0.8, 30);
    warm.position.set(-4, 2, 3);
    scene.add(warm);
    const cool = new THREE.PointLight(0x6da0ff, 0.55, 30);
    cool.position.set(4, -3, 2);
    scene.add(cool);

    // ---- drag to rotate ----
    const AUTO = 0.006;
    let vel = AUTO;
    let dragging = false;
    let lastX = 0;
    const onDown = (e: PointerEvent) => { dragging = true; lastX = e.clientX; renderer.domElement.style.cursor = "grabbing"; renderer.domElement.setPointerCapture(e.pointerId); };
    const onMove = (e: PointerEvent) => { if (!dragging) return; const dx = e.clientX - lastX; lastX = e.clientX; vel = dx * 0.02; };
    const onUp = (e: PointerEvent) => { dragging = false; renderer.domElement.style.cursor = "grab"; try { renderer.domElement.releasePointerCapture(e.pointerId); } catch {} };
    renderer.domElement.addEventListener("pointerdown", onDown);
    renderer.domElement.addEventListener("pointermove", onMove);
    renderer.domElement.addEventListener("pointerup", onUp);
    renderer.domElement.addEventListener("pointerleave", onUp);

    // ---- loop ----
    const clock = new THREE.Clock();
    let raf = 0;
    let running = true;
    const tick = () => {
      const t = clock.getElapsedTime();
      // snip: open/close around the pivot (z axis)
      const snip = 0.16 + Math.abs(Math.sin(t * 2.6)) * 0.16;
      top.rotation.z = snip;
      bottom.rotation.z = -snip;
      // float + spin
      scissors.rotation.y += vel;
      scissors.position.y = Math.sin(t * 1.1) * 0.12;
      if (!dragging) vel += (AUTO - vel) * 0.04;

      // hair falls + tumbles
      for (let i = 0; i < COUNT; i++) {
        const b = bits[i];
        b.y -= b.vy;
        b.rx += b.vy * 1.5;
        b.rz += b.vy;
        if (b.y < -4.5) { b.y = rand(4.5, 5.5); b.x = rand(-6, 6); }
        dummy.position.set(b.x, b.y, b.z);
        dummy.rotation.set(b.rx, 0, b.rz);
        dummy.scale.set(b.sx, 1, b.sz);
        dummy.updateMatrix();
        hair.setMatrixAt(i, dummy.matrix);
      }
      hair.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) { running = true; raf = requestAnimationFrame(tick); }
        else if (!entry.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
      },
      { threshold: 0.05 },
    );
    io.observe(mount);

    const ro = new ResizeObserver(() => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("pointermove", onMove);
      renderer.domElement.removeEventListener("pointerup", onUp);
      renderer.domElement.removeEventListener("pointerleave", onUp);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
      });
      steel.dispose();
      gold.dispose();
      hairGeo.dispose();
      hairMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden />;
}
