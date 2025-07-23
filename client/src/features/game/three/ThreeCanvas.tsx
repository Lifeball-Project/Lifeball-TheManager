'use client';
import * as THREE from 'three';

import { useRef, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { createCharacter } from '../characters/Characters';
// import { handleMovement } from '../characters/movements';
// import { createBuilding } from '../buildings/helpers/createBuilding';
import { createTileGrid } from '../maps/helpers/createTiles';
// import { canMoveToNextPosition } from '../systems/collision';
// import { useKeyboardInput } from '../hooks/useKeyBoardInput';
// import { followPlayer } from '../systems/camera';
import { addDefaultLighting } from '../systems/lighting';
import { setupThreeScene } from './setupScene';
// import { DEFAULT_SPEED } from '../characters/DEFAULT_SPEED';
import { TILE_SIZE, TILE_COLOR, TILE_HALF } from '../maps/configs/defaultTileConfig';
import { createMapTiles } from '../tiles/createMapTiles';

interface ThreeCanvasProps {
  mapPath: string;
  tilesetPath: string;
  tileSize?: number; // 선택사항으로, 기본값 32
}

export function ThreeCanvas({
  mapPath,
  tilesetPath,
  tileSize = 32, // 기본값 설정
 }: ThreeCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  // const hasCollidedRef = useRef(false);
  // const playerRef = createCharacter();
  // const building = createBuilding();
  // const pressedKeys = useKeyboardInput();
  // const router = useRouter();

  useEffect(() => {
    const mount = mountRef.current!;
    const { scene, camera, renderer } = setupThreeScene(mount);
    
    // 조명
    addDefaultLighting(scene);

    createMapTiles(mapPath, tilesetPath, tileSize).then((tiles) => {
      tiles.forEach((tile) => { scene.add(tile) });
    })



    // playerRef.position.set(0, 1, 0);
    
    // 타일
    // const tileMaterial = new THREE.MeshStandardMaterial({ color: TILE_COLOR });
    // const tiles = createTileGrid(TILE_SIZE,TILE_HALF, tileMaterial);
    // tiles.forEach((tile) => scene.add(tile));
    

    // scene.add(playerRef);
    // scene.add(building);

    // const buildingBox = new THREE.Box3().setFromObject(building);
    // const playerBox = new THREE.Box3();

    // const canMoveTo = (x: number, z: number) =>
    //   canMoveToNextPosition({
    //     playerRef,
    //     buildingBox,
    //     playerBox,
    //     hasCollidedRef,
    //     nextX: x,
    //     nextZ: z,
    //     onCollision: () => {
    //       router.push('/game-scene/scene/home');
    //     },
    //   });

    const animate = () => {
      // 캐릭터 이동 처리
      // handleMovement(playerRef, pressedKeys, DEFAULT_SPEED, canMoveTo);
      // followPlayer(camera, playerRef);

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, [mapPath, tilesetPath, tileSize]);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
}