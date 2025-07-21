'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getRandomPlayerSelection } from "@/shared/utils/setup/setupList"; // 경로는 실제 위치에 맞게 조정

export function TeamSetup() {
  const router = useRouter();
  const [team, setTeam] = useState<ReturnType<typeof getRandomPlayerSelection> | null>(null);

  const handleTeam = () => {
    console.log("팀 설정 완료");
    router.push("/game-scene");
  };

  const handleRandomTeam = () => {
    const newTeam = getRandomPlayerSelection();
    setTeam(newTeam);
  };

  const renderPlayer = (position: string) => {
    const player = team?.find(p => p.position === position);
    if (!player) return null;

    return (
      <div key={player.id} className="border rounded-md p-3 w-40 text-center text-sm">
        <p className="font-semibold">{player.position} ({player.race})</p>
        <p className="text-xs text-gray-600">
          {player.tags?.join(", ") || "태그 없음"}
        </p>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">라인업</h2>

      {team && (
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-3 justify-items-center">
            {renderPlayer("좌익수")}
            {renderPlayer("중견수")}
            {renderPlayer("우익수")}
          </div>

          <div className="grid grid-cols-4 justify-items-center">
            {renderPlayer("3루수")}
            {renderPlayer("유격수")}
            {renderPlayer("2루수")}
            {renderPlayer("1루수")}
          </div>

          <div className="grid grid-cols-1 justify-items-center">
            {renderPlayer("투수")}
          </div>

          <div className="grid grid-cols-1 justify-items-center">
            {renderPlayer("포수")}
          </div>

          <div className="grid grid-cols-1 justify-items-center">
            {renderPlayer("지명타자")}
          </div>
        </div>
      )}

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex justify-center">
        <button
          onClick={handleRandomTeam}
          className="mr-4 px-4 py-2 rounded border"
        >
          랜덤 팀 생성
        </button>
        <button
          onClick={handleTeam}
          className="px-4 py-2 rounded border"
        >
          완료
        </button>
      </div>
    </div>
  );
}