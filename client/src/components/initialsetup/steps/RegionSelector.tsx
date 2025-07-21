import { useState } from "react";
import { useSetupStore } from "@/store/setupStore";
import { regions } from "@/shared/utils/setup/regions";

export function RegionSelector() {
  const setRegion = useSetupStore((state) => state.setRegion);
  const goToNextStep = useSetupStore((state) => state.goToNextStep);
  const [selectedRegion, setSelectedRegion] = useState<null | { id: string; name: string; description: string }>(null);

  const handleRegionClick = (region: { id: string; name: string; description: string }) => {
    setSelectedRegion(region);
  };

  const handleConfirm = () => {
    if (!selectedRegion) return;
    setRegion(selectedRegion.id);
    goToNextStep();
  };

  return (
    <div className="region-selector p-4 justify-center">
      <h2 className="text-xl font-semibold mb-4 text-center">지역을 선택하세요</h2>
      <div className="grid grid-cols-2 gap-4">
        {regions.map((region) => (
          <div
            key={region.id}
            className={`w-full h-40 bg-white border hover:bg-gray-100 cursor-pointer p-4 rounded text-center flex flex-col justify-center items-center ${selectedRegion?.id === region.id ? "border-blue-500 border-2" : ""}`}
            onClick={() => handleRegionClick(region)}
          >
            <div className="font-bold text-lg">{region.name}</div>
            {selectedRegion?.id === region.id && (
              <div className="text-sm text-gray-600 mt-1">{region.description}</div>
            )}
          </div>
        ))}
      </div>
      {selectedRegion && (
        <div className="mt-4 text-center">
          <button
            onClick={handleConfirm}
          >
            선택 완료
          </button>
        </div>
      )}
    </div>
  );
}