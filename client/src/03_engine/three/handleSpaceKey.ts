import { useCollisionStore } from '06_store/useCollisionStore';
import { useMapStore } from '06_store/useMapStore';

export const handleSpaceKey = (e: KeyboardEvent) => {
  if (e.code === 'Space') {
    const id = useCollisionStore.getState().buildingId;
    const { setMapByBuilding, currentMap } = useMapStore.getState();
    console.log('currentMap:', currentMap);
    console.log('buildingId:', id);
    if (id) setMapByBuilding(id);
  }
};