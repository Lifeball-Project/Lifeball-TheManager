import * as THREE from 'three';

// 타일맵을 로드하고 Three.js 씬에 타일을 배치하는 함수
export async function loadTileMap(scene: THREE.Scene, jsonUrl: string, tilesetUrl: string) {
  // 타일맵 JSON 데이터 불러오기
  const tileMap = await fetch(jsonUrl).then(res => res.json());

  // 타일맵의 기본 속성들 추출
  const { tilewidth, tileheight, width, height, layers, tilesets } = tileMap;

  // 맵 중앙 위치 계산
  const originX = (width * tilewidth) / 2;
  const originY = (height * tileheight) / 2;

  // 타일셋 이미지 로드
  const tilesetImage = await new THREE.TextureLoader().loadAsync(tilesetUrl);
  tilesetImage.magFilter = THREE.NearestFilter;
  tilesetImage.minFilter = THREE.NearestFilter;

  // 한 행에 들어가는 타일 수 계산
  const tilesetColumns = Math.floor(tilesetImage.image.width / tilewidth);

  // 기본 메쉬 머티리얼 설정
  const material = new THREE.MeshBasicMaterial({ map: tilesetImage, transparent: true });

  // 레이어 순회
  for (const layer of layers) {
    if (!layer.data) continue;

    // 각 타일 위치 순회
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const tileIndex = y * width + x;
        const tileId = layer.data[tileIndex] - 1;
        if (tileId < 0) continue; // 빈 타일은 건너뜀

        // 타일셋 내에서 타일의 위치 계산
        const u = (tileId % tilesetColumns) * tilewidth;
        const v = Math.floor(tileId / tilesetColumns) * tileheight;

        // 해당 타일만을 위한 텍스처 클론 및 UV 설정
        const tileTexture = tilesetImage.clone();
        tileTexture.needsUpdate = true;
        tileTexture.repeat.set(tilewidth / tilesetImage.image.width, tileheight / tilesetImage.image.height);
        tileTexture.offset.set(u / tilesetImage.image.width, 1 - (v + tileheight) / tilesetImage.image.height);

        // 해당 타일의 머티리얼 생성
        const tileMaterial = material.clone();
        tileMaterial.map = tileTexture;

        // 타일 하나의 PlaneGeometry 생성
        const geometry = new THREE.PlaneGeometry(tilewidth, tileheight);
        const mesh = new THREE.Mesh(geometry, tileMaterial);

        // 씬 상 위치 지정 (y는 아래로 갈수록 증가)
        mesh.position.set(
          x * tilewidth - originX,
          -(y * tileheight - originY),
          0
        );
        scene.add(mesh);
      }
    }
  }
}