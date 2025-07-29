import * as THREE from 'three';

// 개별 타일을 생성하고 UV 좌표를 tileset에서 설정
function createTileFromTileset(
  tileSize: number,
  tileIndex: number,
  tilesPerRow: number,
  texture: THREE.Texture
): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(tileSize, tileSize);
  const uv = geometry.attributes.uv;

  const tileU = tileIndex % tilesPerRow;
  const tileV = Math.floor(tileIndex / tilesPerRow);

  const tileUnit = 1 / tilesPerRow;
  const minU = tileU * tileUnit;
  const maxU = minU + tileUnit;
  const maxV = 1 - tileV * tileUnit;
  const minV = maxV - tileUnit;

  uv.setXY(0, minU, minV);
  uv.setXY(1, maxU, minV);
  uv.setXY(2, minU, maxV);
  uv.setXY(3, maxU, maxV);
  uv.needsUpdate = true;

  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  return mesh;
}

// Tiled JSON과 tileset 텍스처를 기반으로 전체 타일 생성
export async function createTileGridFromJson(
  jsonUrl: string,
  textureUrl: string,
  tileSize: number
): Promise<THREE.Mesh[]> {
  const response = await fetch(jsonUrl);
  const mapData = await response.json();
  const texture = new THREE.TextureLoader().load(textureUrl);

  const tiles: THREE.Mesh[] = [];

  const {
    width,
    height,
    tilesets,
    layers: [{ data }]
  } = mapData;

  const tilesPerRow = tilesets[0].columns;
  const firstGid = tilesets[0].firstgid;

  // Calculate offsets to center the grid at (0, 0)
  const offsetX = -(width * tileSize) / 2;
  const offsetZ = -(height * tileSize) / 2;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = y * width + x;
      const tileId = data[index];

      if (tileId === 0) continue;

      const tileIndex = tileId - firstGid;
      const tile = createTileFromTileset(tileSize, tileIndex, tilesPerRow, texture);
      tile.position.set(x * tileSize + offsetX, 0, y * tileSize + offsetZ);
      tiles.push(tile);
    }
  }

  return tiles;
}