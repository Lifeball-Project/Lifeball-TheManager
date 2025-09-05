'use client';
// React /Three
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Scene helpers
import { setupThreeScene } from '../three/setupScene'; 
import { initLighting } from '../three/initLighting';

import { renderMapTiles } from '04_domain/maps/helpers/renderMapTiles';
import { mapBackground } from '04_domain/maps/helpers/mapBackground';

// Character
import { initCharacter } from '04_domain/characters';

// Systems
import { handleSpaceKey } from '../three/handleSpaceKey';
import { startAnimationLoop } from '../three/animateLoop';
// Zustand stores
import { useKeyboardStore } from '06_store/useKeyboardStore';
import { useCollisionStore } from '06_store/useCollosionStore';
import { useMapStore } from '06_store/useMapStore';

import { useKeyboardInput } from '03_engine/input/useKeyBoardInput';

export function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const getPressedKeys = useKeyboardStore.getState;
  const { buildingId } = useCollisionStore();
  const { currentMap } = useMapStore(); 

  // 키보드 입력 훅 사용
  useKeyboardInput();

  useEffect(() => {
    const mount = mountRef.current!;
    const center = new THREE.Vector3(0, 0, 0);
    const { scene, camera, renderer } = setupThreeScene(mount, center);
    const gridSize = 20;
    
    // 맵 렌더링 분기
    renderMapTiles(currentMap, scene);
    // 맵 배경 설정
    scene.background = mapBackground(currentMap); // 배경색 설정
    // 건물 및 충돌 박스 초기화
    initLighting(scene);
    // 캐릭터 초기화
    initCharacter(scene);

    // 애니메이션 루프 시작
    const animationFrameId = startAnimationLoop({
      scene,
      camera,
      renderer,
      getPressedKeys,
      gridSize,
    });
    
    // 키보드 이벤트 리스너 등록
    window.addEventListener('keydown', handleSpaceKey);

    return () => {
      cancelAnimationFrame(animationFrameId);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      window.removeEventListener('keydown', handleSpaceKey);
    };
  }, [currentMap]);

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
          ? `건물 ID: ${buildingId}`
          : '충돌한 건물 없음'}
      </div>
    </>
  );
}