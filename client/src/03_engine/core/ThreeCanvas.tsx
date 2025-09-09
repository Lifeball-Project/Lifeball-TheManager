'use client';
// React /Three
import { useEffect, useRef, useState } from 'react';
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
import { useCollisionStore } from '06_store/useCollisionStore';
import { useMapStore } from '06_store/useMapStore';

import { useKeyboardInput } from '03_engine/input/useKeyBoardInput';

export function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0, z: 0 });

  const getPressedKeys = useKeyboardStore.getState;
  const { buildingId } = useCollisionStore();
  const { currentMap } = useMapStore(); 

  // 키보드 입력 훅 사용
  useKeyboardInput();

  useEffect(() => {
    const mount = mountRef.current!;
    const center = new THREE.Vector3(0, 0, 0);
    const { scene, camera, renderer } = setupThreeScene(mount, center);
    sceneRef.current = scene;
    const gridSize = 20;
    
    // 맵 렌더링 분기
    renderMapTiles(currentMap, scene);
    // 맵 배경 설정
    scene.background = mapBackground(currentMap); // 배경색 설정
    // 건물 및 충돌 박스 초기화
    initLighting(scene);
    // 캐릭터 초기화
    initCharacter(scene);

    // 플레이어 위치 실시간 업데이트 (UI 표시용)
    // initCharacter에서 생성된 오브젝트의 이름이 'Player' 또는 'Character'라고 가정합니다.
    let posRafId = 0;
    const updatePlayerPos = () => {
      const s = sceneRef.current;
      if (s) {
        const player = s.getObjectByName('Player') || s.getObjectByName('Character');
        if (player) {
          const { x, y, z } = (player as THREE.Object3D).position;
          // 소수점 두 자리로 제한하여 잦은 리렌더 방지
          const nx = Number(x.toFixed(2));
          const ny = Number(y.toFixed(2));
          const nz = Number(z.toFixed(2));
          setPlayerPos((prev) => (
            prev.x !== nx || prev.y !== ny || prev.z !== nz
              ? { x: nx, y: ny, z: nz }
              : prev
          ));
        }
      }
      posRafId = requestAnimationFrame(updatePlayerPos);
    };
    posRafId = requestAnimationFrame(updatePlayerPos);

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
      cancelAnimationFrame(posRafId);
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
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '14px',
          zIndex: 100,
          textAlign: 'right',
          minWidth: '160px',
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 4 }}>Player Pos</div>
        <div>X: {playerPos.x}</div>
        <div>Y: {playerPos.y}</div>
        <div>Z: {playerPos.z}</div>
      </div>
    </>
  );
}