import * as THREE from 'three';
import { MapType } from '@/store/useMapStore';

export function mapBackground(currentMap: MapType): THREE.Color {
  switch (currentMap) {
    case 'default':
      return new THREE.Color(0xa0d0f0); // 연한 하늘색
    case 'house':
      return new THREE.Color(0x2a2a2a); // 어두운 실내 느낌
    case 'stadium':
      return new THREE.Color(0x1a1a1a); // 어두운 경기장 느낌
    default:
      return new THREE.Color(0x000000); // fallback
  }
}