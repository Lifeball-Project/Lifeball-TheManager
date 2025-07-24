import * as THREE from 'three';

export function setupThreeScene(mount: HTMLDivElement, center: THREE.Vector3) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(center.x, center.y + 10, center.z + 15); // 중심 기준으로 offset
  camera.lookAt(center);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  mount.appendChild(renderer.domElement);

  return { scene, camera, renderer };
}