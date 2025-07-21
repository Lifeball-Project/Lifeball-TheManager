'use client';
import { useRouter } from "next/navigation";
// import { useSetupStore } from "@/store/setupStore";

export function TeamSetup() {
  const router = useRouter();

  const handleTeam = () => {
    // 팀 설정 로직을 여기에 추가합니다.
    
    
    // const setupData = useSetupStore.getState();
    // 그리고 fetch 사용해서 zustand 스토어에 저장된 정보 db 저장

    console.log("팀 설정 완료");
    router.push("/game-scene"); // 다음 단계로 이동
  };

  return (
    <div>
      {/* 9명의 선수들 스탯 선택 */}
      <h2 className="text-xl font-semibold mb-4">팀 구성</h2>


      <button onClick={handleTeam}>완료</button>
    </div>
  );
}