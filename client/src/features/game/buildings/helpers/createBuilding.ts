import * as THREE from 'three';

export function createBuilding(): THREE.Mesh {
  // 사용할 타일 수
  const tileCols = 2; // 가로 2칸
  const tileRows = 7; // 세로 2칸

  // 타일셋에서 시작할 위치 (왼쪽 위 타일 좌표)
  const tileCol = 1;
  const tileRow = 10;

  // 건물 Plane의 크기 (타일 수 기준)
  const geometry = new THREE.PlaneGeometry(tileCols, tileRows);
  const material = new THREE.MeshStandardMaterial({ transparent: true });
  const building = new THREE.Mesh(geometry, material);

  // 중심 위치 맞추기 (건물 높이만큼 위로)
  building.position.set(0, tileRows / 2, 0);

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('/assets/textures/maps/hometile.png', (texture) => {
    const tilesPerRow = 32; // 전체 타일셋의 열 개수 (512px / 16px = 32)
    const tileSize = 1 / tilesPerRow; // 한 타일의 비율 (텍스처 전체 기준)

    // 2x2 영역의 텍스처만 보여주도록 repeat 설정
    texture.repeat.set(tileSize * tileCols, tileSize * tileRows);

    // offset은 텍스처의 시작점 (왼쪽 위 모서리) 기준
    texture.offset.set(
      tileCol * tileSize,
      1 - tileSize * (tileRow + tileRows) // 세로는 아래로 갈수록 증가하므로 보정
    );

    // 반복 설정 및 픽셀 깨짐 방지
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;

    material.map = texture;
    material.needsUpdate = true;
  });

  return building;
}