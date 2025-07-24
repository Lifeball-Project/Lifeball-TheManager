'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { setupThreeScene } from './setupScene'; // 경로를 실제 위치에 맞게 조정
import { createTileGrid } from '../maps/helpers/createTiles';

export function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const center = new THREE.Vector3(0, 0, 0);
    const { scene, camera, renderer } = setupThreeScene(mount, center);

    // 바닥 타일 격자 생성 (예: 10x10)
    const tileSize = 1;
    const gridSize = 10;
    const tileMaterial = new THREE.MeshBasicMaterial({ color: 0xA0522D }); // 진한 갈색

    const tiles = createTileGrid(tileSize, gridSize / 2, tileMaterial);
    tiles.forEach(tile => scene.add(tile));

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
}