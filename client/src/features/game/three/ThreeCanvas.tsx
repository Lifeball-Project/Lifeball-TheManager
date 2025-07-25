'use client';

import { use, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { setupThreeScene } from './setupScene'; // 경로를 실제 위치에 맞게 조정
import { createTileGrid } from '../maps/helpers/createTiles';
import { createCharacter } from '../characters/createCharacter';
import { handleMovement } from '../characters/handleMovement';
import { useKeyboardStore } from '@/store/useKeyboardStore';
import { defaultSpeed } from '../characters/defaultSpeed';
import { useKeyboardInput } from '../hooks/useKeyboardInput';
import { createBuilding } from '../buildings/helpers/createBuilding';

export function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<THREE.Mesh | null>(null);
  const getPressedKeys = useKeyboardStore.getState;
  useKeyboardInput();
  
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
    scene.add(character);
    characterRef.current = character;
    console.log('[createCharacter] created at:', character.position.toArray());

    // 건물 추가
const building = createBuilding();
if (building) scene.add(building);

    // 조명
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const pressedKeys = getPressedKeys().pressedKeys;

      if (characterRef.current) {
        handleMovement(
          characterRef.current,
          pressedKeys,
          defaultSpeed,
          () => true,
          {
            minX: -gridSize / 2,
            maxX: gridSize / 2,
            minZ: -gridSize / 2,
            maxZ: gridSize / 2
          }
        );

        const char = characterRef.current;
        camera.position.set(char.position.x, char.position.y + 10, char.position.z + 15);
        camera.lookAt(char.position);
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