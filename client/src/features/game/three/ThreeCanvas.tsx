'use client';
import * as THREE from 'three';

import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createCharacter } from '../characters/Characters';
import { handleMovement } from '../characters/movements';
import { createBuilding } from '../buildings/helpers/createBuilding';
import { createTileGrid } from '../maps/helpers/createTiles';
import { canMoveToNextPosition } from '../systems/collision';
import { useKeyboardInput } from '../hooks/useKeyBoardInput';
import { followPlayer } from '../systems/camera';
import { addDefaultLighting } from '../systems/lighting';
import { setupThreeScene } from './setupScene';
import { DEFAULT_SPEED } from '../characters/DEFAULT_SPEED';
import { TILE_SIZE, TILE_COLOR, TILE_HALF } from '../maps/configs/defaultTileConfig';

export function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const hasCollidedRef = useRef(false);
  const playerRef = createCharacter();
  const building = createBuilding();
  const pressedKeys = useKeyboardInput();

  const router = useRouter();

  useEffect(() => {

    const mount = mountRef.current!;
    const { scene, camera, renderer } = setupThreeScene(mount);



    playerRef.position.set(0, 1, 0);
    

    const tileMaterial = new THREE.MeshStandardMaterial({ color: TILE_COLOR });
    const tiles = createTileGrid(TILE_SIZE, TILE_HALF, tileMaterial);
    addDefaultLighting(scene);

    scene.add(playerRef);
    scene.add(building);
    tiles.forEach((tile) => scene.add(tile));

    const buildingBox = new THREE.Box3().setFromObject(building);
    const playerBox = new THREE.Box3();

    const canMoveTo = (x: number, z: number) =>
      canMoveToNextPosition({
        playerRef,
        buildingBox,
        playerBox,
        hasCollidedRef,
        nextX: x,
        nextZ: z,
        onCollision: () => {
          router.push('/game-scene/scene/home');
        },
      });

    const animate = () => {
      handleMovement(playerRef, pressedKeys, DEFAULT_SPEED, canMoveTo);
      followPlayer(camera, playerRef);

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
}