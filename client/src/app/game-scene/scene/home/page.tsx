import { ThreeCanvas } from "@/features/game/three/ThreeCanvas";
// import { homeConfig } from "@/features/game/maps/configs/home";

export default function HomeScenePage() {
  return (
      <ThreeCanvas
        mapPath="/assets/textures/maps/village-map.json"
        tilesetPath="/assets/textures/maps/tileset.png"
        tileSize={16} 
        mapBoundary={{ minX: -50, maxX: 50, minZ: -50, maxZ: 50 }} // 맵 경계 설정
      />
  )
  
}