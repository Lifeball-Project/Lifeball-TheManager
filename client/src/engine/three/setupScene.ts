import * as THREE from 'three';

export function setupThreeScene(mount: HTMLDivElement, center: THREE.Vector3) {
  const scene = new THREE.Scene();

  const aspect = window.innerWidth / window.innerHeight;
  const d = 10;

  const camera = new THREE.OrthographicCamera(
    -d * aspect,
    d * aspect,
    d,
    -d,
    0.1,
    1000
  );

  const cameraHeight = 20;
  const tiltAngle = Math.PI / 4; // 45도 기울기

  const x = center.x + cameraHeight * Math.sin(tiltAngle);
  const y = center.y + cameraHeight;
  const z = center.z + cameraHeight * Math.cos(tiltAngle);

  camera.position.set(x, y, z);
  camera.lookAt(center);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  mount.appendChild(renderer.domElement);

  return { scene, camera, renderer };
}