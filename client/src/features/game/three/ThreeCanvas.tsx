'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new THREE.Scene();

    // 카메라 설정 (약간 위에서 내려다보는 시점)
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 25, 25);
    camera.lookAt(0, 0, 0);

    // 렌더러 설정
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // 조명 추가
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // 타일 바닥 생성
    const tileSize = 2;
    const half = 8;

    const tileMaterial = new THREE.MeshStandardMaterial({ color: 0x55aa55 });

    for (let x = -half; x <= half; x++) {
      for (let z = -half; z <= half; z++) {
        const tile = new THREE.Mesh(
          new THREE.PlaneGeometry(tileSize, tileSize),
          tileMaterial
        );
        tile.rotation.x = -Math.PI / 2;
        tile.position.set(x * tileSize, 0, z * tileSize);
        scene.add(tile);
      }
    }

    // 플레이어 캐릭터(간단한 박스) 추가
    const playerRef = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 2, 1.5),
      new THREE.MeshStandardMaterial({ color: 0x4444ff })
    );
    playerRef.position.set(0, 1, 0); // slightly above tile
    scene.add(playerRef);

    // --- Keyboard movement logic ---
    const pressedKeys = new Set<string>();

    const handleKeyDown = (e: KeyboardEvent) => pressedKeys.add(e.key.toLowerCase());
    const handleKeyUp = (e: KeyboardEvent) => pressedKeys.delete(e.key.toLowerCase());

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const speed = 0.1;

    // 렌더링 루프
    const animate = () => {
      // Movement logic
      if (pressedKeys.has('ㅈ') || pressedKeys.has('w')) playerRef.position.z -= speed;
      if (pressedKeys.has('ㄴ') || pressedKeys.has('s')) playerRef.position.z += speed;
      if (pressedKeys.has('ㅁ') || pressedKeys.has('a')) playerRef.position.x -= speed;
      if (pressedKeys.has('ㅇ') || pressedKeys.has('d')) playerRef.position.x += speed;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // 정리
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
}