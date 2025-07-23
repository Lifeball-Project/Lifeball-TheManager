'use client'

import { ThreeCanvas } from "@/features/game/three/ThreeCanvas"

export default function GameScenePage() {
  return <ThreeCanvas tilemapUrl="/assets/textures/maps/village-map.json" tilesetUrl="/assets/textures/maps/tileset.png"/>
}