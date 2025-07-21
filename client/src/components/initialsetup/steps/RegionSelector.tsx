import { useSetupStore } from "@/store/setupStore";
import { regions } from "@/shared/utils/setup/regions";

export function RegionSelector() {
  const setRegion = useSetupStore((state) => state.setRegion);
  const goToNextStep = useSetupStore((state) => state.goToNextStep);

  const handleRegionClick = (region: string) => {
    setRegion(region);
    // 여기에서 선택한 지역 로직 추가 예를들면 db저장
    goToNextStep();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">지역을 선택하세요</h2>
      <div className="grid grid-cols-2 gap-4">
        {regions.map((region) => (
          <div
            key={region}
            className="bg-gray-200 hover:bg-gray-300 cursor-pointer p-4 rounded text-center"
            onClick={() => handleRegionClick(region)}
          >
            {region.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}