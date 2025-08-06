'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { setupThreeScene } from './setupScene'; // 경로를 실제 위치에 맞게 조정
import { handleMovement } from '../characters/handleMovement';
import { useKeyboardStore } from '@/store/useKeyboardStore';
import { defaultSpeed } from '../characters/defaultSpeed';
import { useKeyboardInput } from '../hooks/useKeyBoardInput';
import { canMoveTo } from '../characters/canMoveTo';
import { initBuildings } from '../buildings/helpers/initBuildings';
import { initLighting } from './initLighting';
import { initCharacter } from '../characters/initCharacter';
import { useCharacterStore } from '@/store/useCharacterStore';
import { initTiles } from '../maps/helpers/initTiles';
import { useCollisionStore } from '@/store/useCollosionStore';
import { checkCollision } from '../systems/collision';
import { useMapStore } from '@/store/useMapStore';
import { initHouseTiles } from '../maps/helpers/initHouseTiles';

export function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const getPressedKeys = useKeyboardStore.getState;
  const { buildingId } = useCollisionStore();
  const { currentMap, setMap } = useMapStore(); // 👈 Zustand map 상태 사용

  useKeyboardInput();

  useEffect(() => {
    const mount = mountRef.current!;
    const center = new THREE.Vector3(0, 0, 0);
    const { scene, camera, renderer } = setupThreeScene(mount, center);
    scene.background = new THREE.Color(0xa0d0f0);
    
    const gridSize = 20;

    // 맵 렌더링 분기
    if (currentMap === 'default') {
      initTiles(scene);       // 필드 바닥
      initBuildings(scene);   // 건물
    } else if (currentMap === 'house') {
      initHouseTiles(scene);  // 내부 맵 (이건 네가 따로 만든 함수로 대체 가능)
    }

    initLighting(scene);
    initCharacter(scene);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const pressedKeys = getPressedKeys().pressedKeys;
      const character = useCharacterStore.getState().character;
      if (character) {
        handleMovement(
          character,
          pressedKeys,
          defaultSpeed,
          canMoveTo,
          {
            minX: -gridSize / 2,
            maxX: gridSize / 2,
            minZ: -gridSize / 2,
            maxZ: gridSize / 2,
          }
        );

        if (currentMap === 'default') {
          checkCollision(character.position.x, character.position.z);
        }

        camera.position.set(character.position.x, character.position.y + 10, character.position.z + 15);
        camera.lookAt(character.position);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleSpaceKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        const id = useCollisionStore.getState().buildingId;
        if (id === 'house') {
          console.log('🏠 집 내부 진입');
          setMap('house'); // ✅ 맵 전환
        }
      }
    };
    window.addEventListener('keydown', handleSpaceKey);

    return () => {
      cancelAnimationFrame(animationFrameId);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      window.removeEventListener('keydown', handleSpaceKey);
    };
  }, [currentMap]); // 👈 맵 전환 감지

  return (
    <>
      <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: 'rgba(0,0,0,0.5)',
        color: 'white',
        padding: '8px',
        borderRadius: '4px',
        fontSize: '14px',
        zIndex: 100,
      }}>
        {buildingId
          ? `🏠 건물 ID: ${buildingId}`
          : '충돌한 건물 없음'}
      </div>
    </>
  );
}