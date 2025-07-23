import * as THREE from 'three';

/**
 * 지정된 JSON 맵 경로와 타일셋 텍스처 경로를 기반으로 THREE 타일 오브젝트 배열을 생성
 * @param mapPath JSON 맵 파일 경로 (예: "/textures/maps/map.json")
 * @param tilesetPath 타일셋 이미지 경로 (예: "/textures/maps/tileset.png")
 * @param tileSize 타일 하나의 픽셀 크기 (기본값: 32)
 * @returns THREE.Object3D[] 형태의 타일 배열
 */
export async function createMapTiles(
  mapPath: string,
  tilesetPath: string,
  tileSize = 32
): Promise<THREE.Object3D[]> {
  const [mapRes, texture] = await Promise.all([
    fetch(mapPath).then((res) => res.json()),
    new THREE.TextureLoader().loadAsync(tilesetPath),
  ]);

  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  const tilesPerRow = Math.floor(texture.image.width / tileSize);
  const layer = mapRes.layers.find((l: any) => l.type === 'tilelayer');
  if (!layer) throw new Error('Tile layer not found in map.json');

  const tiles: THREE.Object3D[] = [];

  layer.data.forEach((tileId: number, index: number) => {
    if (tileId === 0) return;

    const tileX = (tileId - 1) % tilesPerRow;
    const tileY = Math.floor((tileId - 1) / tilesPerRow);

    const offsetX = tileX * tileSize;
    const offsetY = tileY * tileSize;

    const tileTexture = new THREE.Texture(texture.image);
    tileTexture.needsUpdate = true;
    tileTexture.repeat.set(1 / tilesPerRow, 1 / tilesPerRow);
    tileTexture.offset.set(tileX / tilesPerRow, tileY / tilesPerRow);
    tileTexture.wrapS = THREE.ClampToEdgeWrapping;
    tileTexture.wrapT = THREE.ClampToEdgeWrapping;

    const material = new THREE.MeshBasicMaterial({
      map: tileTexture,
      transparent: false,
      side: THREE.DoubleSide,
      depthWrite: true,
    });
    const geometry = new THREE.BoxGeometry(tileSize / tileSize, 0.1, tileSize / tileSize);
    const mesh = new THREE.Mesh(geometry, material);

    const mapWidth = layer.width;
    const x = index % mapWidth;
    const y = Math.floor(index / mapWidth);

    mesh.position.set(x, 0.05, y);
    tiles.push(mesh);
  });

  return tiles;
}