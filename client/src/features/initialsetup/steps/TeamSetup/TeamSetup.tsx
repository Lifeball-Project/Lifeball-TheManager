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

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">라인업</h2>

      <button onClick={handleRandomTeam} className="mr-4">랜덤 팀 생성</button>
      <button onClick={handleTeam}>완료</button>

      {team && (
        <div className="mt-6 space-y-2">
          {team.map(player => (
            <div
              key={player.id}
              className="border border-gray-300 rounded-md p-4"
            >
              <p className="font-semibold">{player.position} ({player.race})</p>
              <p className="text-sm text-gray-600">
                {player.tags && player.tags.length > 0
                  ? player.tags.join(", ")
                  : "태그 없음"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}