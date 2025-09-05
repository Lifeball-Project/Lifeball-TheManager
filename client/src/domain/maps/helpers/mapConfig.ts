import { MapType } from "@/store/useMapStore";

export const mapConfig = {
  default: { enableCollision: true },
  house: { enableCollision: true },
  stadium: { enableCollision: true },
  exit: { enableCollision: false },
} satisfies Record<MapType, { enableCollision: boolean }>;