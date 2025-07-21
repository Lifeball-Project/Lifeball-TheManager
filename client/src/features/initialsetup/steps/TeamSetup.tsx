'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTeamStore } from "@/store/useTeamStore";
import { getRandomPlayerSelection } from "@/shared/utils/setup/setupList"; 
import { PlayerCard } from "@/components/PlayerCard";
import { BottomButtonGroup } from "@/components/BootomButtonGroups";

export function TeamSetup() {
  const router = useRouter();
  const setTeamStore = useTeamStore((state) => state.setTeam);
  const [team, setTeam] = useState<ReturnType<typeof getRandomPlayerSelection> | null>(null);

  const handleTeam = () => {
    if (!team) return;
    setTeamStore(team); // 팀 상태를 저장
    // DB에 팀 저장 로직 여기다가 만들기
    console.log("팀 설정 완료: ", team);

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
      <PlayerCard
        key={player.id}
        id={player.id}
        position={player.position}
        race={player.race}
        tags={player.tags}
      />
    );
  };

  return (
    <div>
      <p className="text-2xl font-bold mb-4 text-center">라인업</p>

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

      <BottomButtonGroup
        onRandom={handleRandomTeam}
        onConfirm={handleTeam}
      />
    </div>
  );
}