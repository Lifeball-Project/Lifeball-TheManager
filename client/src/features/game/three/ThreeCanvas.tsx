'use client';

import { useRef, useRef as useReactRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createCharacter } from '../characters/Characters';
import { handleMovement } from '../characters/movements';

import * as THREE from 'three';

export function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const hasCollidedRef = useReactRef(false);
  const playerRef = createCharacter();

  const router = useRouter();

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

    // 캐릭터 추가
    scene.add(playerRef);

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

  
    // 충돌 감지를 위한 bounding box 계산
    const building = new THREE.Mesh(
      new THREE.BoxGeometry(4, 6, 4),
      new THREE.MeshStandardMaterial({ color: 0x888888 })
    );
    building.position.set(5, 3, 5); // 바닥 위에 떠 있게 (높이 6 → 중심은 y=3)
    scene.add(building);

    const buildingBox = new THREE.Box3().setFromObject(building);
    const playerBox = new THREE.Box3();


    // 이동 가능 여부 확인 함수
    const canMoveTo = (x: number, z: number) => {
      playerBox.setFromObject(playerRef);
      const clone = playerBox.clone();
      const delta = new THREE.Vector3(x - playerRef.position.x, 0, z - playerRef.position.z);
      clone.translate(delta);
      if (clone.intersectsBox(buildingBox)) {
        if (!hasCollidedRef.current) {
          hasCollidedRef.current = true;
          router.push('/game-scene/scene/home');
        }
        return false;
      }
      return true;
    };

    playerRef.position.set(0, 1, 0); // slightly above tile
    scene.add(playerRef);


    // 키보드 입력 처리
    const pressedKeys = new Set<string>();

    const handleKeyDown = (e: KeyboardEvent) => pressedKeys.add(e.key.toLowerCase());
    const handleKeyUp = (e: KeyboardEvent) => pressedKeys.delete(e.key.toLowerCase());

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const speed = 0.1;
    // 렌더링 루프
    const animate = () => {
      // 이동 처리
      handleMovement(playerRef, pressedKeys, speed, canMoveTo);

      camera.position.set(
        playerRef.position.x,
        playerRef.position.y + 25,
        playerRef.position.z + 25
      );
      camera.lookAt(playerRef.position);

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