'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

type Player = {
  id: number;
  name: string;
};

export function TeamSetup() {
  const router = useRouter();

  // 20명의 후보 선수
  const [candidates, setCandidates] = useState<Player[]>(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      name: `후보 ${i + 1}`,
    }))
  );
  // 9명의 라인업 (비어있으면 null)
  const [lineup, setLineup] = useState<(Player | null)[]>(Array(9).fill(null));
  // 현재 선택된 선수 (왼쪽에서만 선택)
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // 오른쪽 슬롯에 선수 배정
  const assignToLineup = (index: number) => {
    if (!selectedPlayer) return;
    setLineup((prev) => {
      const updated = [...prev];
      updated[index] = selectedPlayer;
      return updated;
    });
    setCandidates((prev) => prev.filter((p) => p.id !== selectedPlayer.id));
    setSelectedPlayer(null);
  };

  // 라인업에서 후보로 되돌리기 (슬롯 클릭)
  const moveToCandidates = (index: number) => {
    const player = lineup[index];
    if (!player) return;
    setCandidates((prev) => [...prev, player]);
    setLineup((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  };

  // 왼쪽 화살표: 선택된 선수를 후보로 되돌림 (중복 방지)
  const moveLeft = () => {
    if (!selectedPlayer) return;

    const alreadyExists = candidates.some(p => p.id === selectedPlayer.id);
    if (alreadyExists) {
      setSelectedPlayer(null); // just deselect
      return;
    }

    setCandidates((prev) => [...prev, selectedPlayer]);
    setSelectedPlayer(null);
  };

  // 오른쪽 화살표: 선택된 선수를 첫 빈 슬롯에 배정
  const moveRight = () => {
    if (!selectedPlayer) return;
    const firstEmpty = lineup.findIndex((slot) => slot === null);
    if (firstEmpty === -1) return;
    assignToLineup(firstEmpty);
  };

  // 완료 버튼
  const handleSubmit = () => {
    console.log("라인업:", lineup);
    router.push("/game-scene");
  };

  return (
    <div className="flex justify-center items-start gap-4 p-8">
      {/* 왼쪽 컨테이너 */}
      <div className="w-1/3">
        <h3 className="font-bold mb-2">후보 선수 (20명)</h3>
        <div className="grid grid-cols-2 gap-2">
          {candidates.map((player) => (
            <div
              key={player.id}
              onClick={() => setSelectedPlayer(player)}
              className={`border p-2 cursor-pointer rounded ${
                selectedPlayer?.id === player.id ? "bg-yellow-300" : ""
              }`}
            >
              {player.name}
            </div>
          ))}
        </div>
      </div>

      {/* 가운데 방향 버튼 */}
      <div className="flex flex-col items-center justify-center gap-2">
        <button onClick={moveRight} className="border px-3 py-1">→</button>
        <button onClick={moveLeft} className="border px-3 py-1">←</button>
      </div>

      {/* 오른쪽 컨테이너 */}
      <div className="w-1/3">
        <h3 className="font-bold mb-2">라인업 (9명)</h3>
        <div className="grid grid-cols-3 gap-2">
          {lineup.map((slot, idx) => (
            <div
              key={idx}
              onClick={() => (slot ? moveToCandidates(idx) : assignToLineup(idx))}
              className="border p-2 h-[60px] text-center cursor-pointer rounded bg-white"
            >
              {slot ? slot.name : "비어 있음"}
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={lineup.some((p) => p === null)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          완료
        </button>
      </div>
    </div>
  );
}