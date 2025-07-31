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

export function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const getPressedKeys = useKeyboardStore.getState;
    const { buildingId } = useCollisionStore();

  useKeyboardInput();
  
  useEffect(() => {
    const mount = mountRef.current!;
    const center = new THREE.Vector3(0, 0, 0);
    const { scene, camera, renderer } = setupThreeScene(mount, center);
    scene.background = new THREE.Color(0xa0d0f0); // 하늘색 배경 설정
    
    // json 파일에서 타일을 불러와서 초기화
    const gridSize = 20;
    initTiles(scene); 
    
    // 건물 생성 및 충돌 등록
    initBuildings(scene); // 충돌용 박스 배열 받아오기    
    // 조명 초기화
    initLighting(scene);

    // 플레이어 캐릭터 생성
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
            maxZ: gridSize / 2
          }
        );

        checkCollision(character.position.x, character.position.z);
  
        camera.position.set(character.position.x, character.position.y + 10, character.position.z + 15);
        camera.lookAt(character.position);
      }

      renderer.render(scene, camera);
    };
    console.log('[ThreeCanvas 렌더] buildingId:', buildingId);
    animate();
    
    // 스페이스바 키 입력 시 건물 상호작용 출력
    const handleSpaceKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        const currentBuildingId = useCollisionStore.getState().buildingId;
        if (currentBuildingId) {
          console.log(`[스페이스바] 건물(${currentBuildingId})과 상호작용`);
        }
      }
    };
    window.addEventListener('keydown', handleSpaceKey);

    // 정리: 애니메이션 및 이벤트 리스너 해제
    return () => {
      cancelAnimationFrame(animationFrameId);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      window.removeEventListener('keydown', handleSpaceKey);
    };
    
  }, []);


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