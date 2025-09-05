interface UnityTileData {
  x: number;
  y: number;
  tileName: string;
}

import * as THREE from 'three';

export async function createTilesFromUnityJson(
  jsonUrl: string,
  textureUrl: string,
  tileSize: number,
  tilesPerRow: number
): Promise<THREE.Mesh[]> {
  // 텍스처 로드
  const texture = await new Promise<THREE.Texture>((resolve) => {
    new THREE.TextureLoader().load(textureUrl, resolve);
  });

  // JSON 로드
  const response = await fetch(jsonUrl);
  const data = await response.json();
  const tiles = data.tiles as UnityTileData[];
  
  if (!Array.isArray(tiles)) throw new Error('tiles is not an array');

  const tileMeshes: THREE.Mesh[] = [];

  tiles.forEach(({ x, y, tileName }) => {
    const tileIndexMatch = tileName.match(/_(\d+)$/);
    const tileIndex = tileIndexMatch ? parseInt(tileIndexMatch[1], 10) : NaN;
    if (isNaN(tileIndex)) return;

    const mesh = createTileMesh(tileIndex, tileSize, tilesPerRow, texture);
    mesh.position.set(x * tileSize, 0, -y * tileSize);
    mesh.rotation.x = -Math.PI / 2; // 바닥에 눕히기
    tileMeshes.push(mesh);
  });

  
  return tileMeshes;
}

function createTileMesh(
  tileIndex: number,
  tileSize: number,
  tilesPerRow: number,
  texture: THREE.Texture
): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(tileSize, tileSize);
  const uv = geometry.attributes.uv;

  const tileU = tileIndex % tilesPerRow;
  const tilesPerColumn = Math.floor(texture.image.height / tileSize);
  const tileV = tilesPerColumn - 1 - Math.floor(tileIndex / tilesPerRow);
  const tileWidth = 1 / tilesPerRow;
  const tileHeight = tileWidth; // assuming square tiles

  const u0 = tileU * tileWidth;
  const v0 = tileV * tileHeight;

  const epsilon = 0.001;
  uv.setXY(0, u0 + epsilon, 1 - (v0 + tileHeight - epsilon));
  uv.setXY(1, u0 + tileWidth - epsilon, 1 - (v0 + tileHeight - epsilon));
  uv.setXY(2, u0 + epsilon, 1 - (v0 + epsilon));
  uv.setXY(3, u0 + tileWidth - epsilon, 1 - (v0 + epsilon));

  uv.needsUpdate = true;

  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
  return new THREE.Mesh(geometry, material);
}