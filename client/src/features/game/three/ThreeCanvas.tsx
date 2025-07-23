import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { loadTileMap } from '../tiles/loadTileMap';
import { createCharacter } from '../systems/createCharacter';
import { createCamera } from '../systems/createCamera';
import { createAnimationLoop } from '../systems/loop';
import { createRenderer } from '../systems/createRenderer';
import { createScene } from '../systems/createScene';
import { useController } from '../hooks/useController';
import { CharacterController } from '../characters/CharacterController';

interface ThreeCanvasProps {
  tilemapUrl: string;
  tilesetUrl: string;
}

export function ThreeCanvas({ tilemapUrl, tilesetUrl }: ThreeCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const pressedKeys = useController();

  useEffect(() => {
    const mount = mountRef.current!;
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    // 기존 캔버스 제거
    mount.innerHTML = '';

    const scene = createScene();
    const camera = createCamera(width / height);
    const renderer = createRenderer(mount);

    loadTileMap(scene, tilemapUrl, tilesetUrl).then(() => {
      const character = createCharacter();
      scene.add(character);
    

      createAnimationLoop(renderer, scene, camera, () => {
        CharacterController(character, pressedKeys);
      });
    });
  }, [tilemapUrl, tilesetUrl]);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
}