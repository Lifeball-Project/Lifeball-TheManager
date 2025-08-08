'use client';
// React /Three
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Scene helpers
import { setupThreeScene } from './setupScene'; 
import { initLighting } from './initLighting';
import { renderMapTiles } from '../maps/helpers/renderMapTiles';
import { mapBackground } from '../maps/helpers/mapBackground';

// Character
import {
  initCharacter,
} from '../characters';

// Systems
import { handleSpaceKey } from './handleSpaceKey';
import { startAnimationLoop } from './animateLoop';
// Zustand stores
import { useKeyboardStore } from '@/store/useKeyboardStore';
import { useCollisionStore } from '@/store/useCollosionStore';
import { useMapStore } from '@/store/useMapStore';

// hooks
import { useKeyboardInput } from '../hooks/useKeyBoardInput';

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