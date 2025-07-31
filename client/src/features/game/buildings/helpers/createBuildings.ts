import * as THREE from 'three';

export function createBuildings(): THREE.Group {
  const group = new THREE.Group();

  // ----------------------- 집 -----------------------
  const tileColsHouse = 2.5;
  const tileRowsHouse = 3;
  const tileColHouse = 10.4;
  const tileRowHouse = 2;

  const geometryHouse = new THREE.PlaneGeometry(tileColsHouse, tileRowsHouse);
  const materialHouse = new THREE.MeshStandardMaterial({ transparent: true });
  const house = new THREE.Mesh(geometryHouse, materialHouse);

  house.position.set(-7, 1.5, -8);
  house.rotation.x = -Math.PI / 6;

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('/assets/textures/maps/hometile.png', (texture) => {
    const tilesPerRow = 32;
    const tileSize = 2 / tilesPerRow;

    texture.repeat.set(tileSize * tileColsHouse, tileSize * tileRowsHouse);
    texture.offset.set(tileColHouse * tileSize, 1 - tileSize * (tileRowHouse + tileRowsHouse));
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;

    materialHouse.map = texture;
    materialHouse.needsUpdate = true;
  });

  group.add(house);

  // ----------------------- 나무1 -----------------------
  const tileColsTree = 4;
  const tileRowsTree = 6;
  const tileColTree = 2;
  const tileRowTree = 1;

  const geometryTree = new THREE.PlaneGeometry(tileColsTree, tileRowsTree);
  const materialTree = new THREE.MeshStandardMaterial({ transparent: true });
  const tree = new THREE.Mesh(geometryTree, materialTree);

  tree.position.set(-1, 1.5, -9);
  tree.rotation.x = -Math.PI / 8;

  textureLoader.load('/assets/textures/maps/Tree1.png', (texture) => {
    const tilesPerRow = 16;
    const tileSize = 2 / tilesPerRow;

    texture.repeat.set(tileSize * tileColsTree, tileSize * tileRowsTree);
    texture.offset.set(tileColTree * tileSize, 1 - tileSize * (tileRowTree + tileRowsTree));
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;

    materialTree.map = texture;
    materialTree.needsUpdate = true;
  });

  group.add(tree);
  // ----------------------- 나무2 -----------------------
  const tileColsTree2 = 3;
  const tileRowsTree2 = 3;
  const tileColTree2 = 0.5;
  const tileRowTree2 = 0.5;

  const geometryTree2 = new THREE.PlaneGeometry(tileColsTree2, tileRowsTree2);
  const materialTree2 = new THREE.MeshStandardMaterial({ transparent: true });
  const tree2 = new THREE.Mesh(geometryTree2, materialTree2);
  tree2.position.set(5, 1.5, -7);
  tree2.rotation.x = -Math.PI / 8;
  textureLoader.load('/assets/textures/maps/Tree3.png', (texture) => {
    const tilesPerRow = 8;
    const tileSize = 2 / tilesPerRow;

    texture.repeat.set(tileSize * tileColsTree2, tileSize * tileRowsTree2);
    texture.offset.set(tileColTree2 * tileSize, 1 - tileSize * (tileRowTree2 + tileRowsTree2));
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;

    materialTree2.map = texture;
    materialTree2.needsUpdate = true;
  });
  group.add(tree2);

  return group;
}