'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { setupThreeScene } from './setupScene'; // 경로를 실제 위치에 맞게 조정
import { createTileGrid } from '../maps/helpers/createTiles';
import { createCharacter } from '../characters/createCharacter';
import { handleMovement } from '../characters/handleMovement';
import { useKeyboardInput } from '../hooks/useKeyboardInput';
import { defaultSpeed } from '../characters/defaultSpeed';

export function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<THREE.Mesh | null>(null);
  const pressedKeys = useKeyboardInput();

  useEffect(() => {
    const mount = mountRef.current!;
    const center = new THREE.Vector3(0, 0, 0);
    const { scene, camera, renderer } = setupThreeScene(mount, center);

    // 바닥 타일 격자 생성 (예: 10x10)
    const tileSize = 1;
    const gridSize = 20;
    const tileMaterial = new THREE.MeshBasicMaterial({ color: 0xA0522D }); // 진한 갈색

    const tiles = createTileGrid(tileSize, gridSize / 2, tileMaterial);
    tiles.forEach(tile => scene.add(tile));

    // 플레이어 캐릭터 생성
    const character = createCharacter();
    characterRef.current = character;
    scene.add(character);
    // 캐릭터 애니메이션 로직 추가
    // (pressedKeys, defaultSpeed를 사용)

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (characterRef.current) {
        handleMovement(
          characterRef.current,
          pressedKeys,
          defaultSpeed,
          () => true, // canMoveTo 함수는 현재 모든 위치 허용
          {
            minX: -gridSize / 2,
            maxX: gridSize / 2,
            minZ: -gridSize / 2,
            maxZ: gridSize / 2
          }
        );
      }
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