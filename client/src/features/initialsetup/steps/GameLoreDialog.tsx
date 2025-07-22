"use client";

import { useState } from "react";
import { useSetupStore } from "@/store/useSetupStore";
import { loreLines } from "@/shared/utils/setup/loreLines";

export function GameLoreDialog() {
  // 스토어에서 다음 단계로 이동하는 함수 가져오기
  const goToNextStep = useSetupStore((state) => state.goToNextStep);
  // 현재 줄 인덱스 상태
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // 다음 줄로 넘어가는 함수
  const handleNextLore = () => {
    if (currentLineIndex < loreLines.length - 1) {
      setCurrentLineIndex((prev) => prev + 1);
    } else {
      goToNextStep();
    }
  };

  return (
    <div
      className="game-lore-dialog w-screen h-screen bg-cover bg-center flex items-center justify-center mb-[20vh]"
      onClick={handleNextLore}
    >
      <div className="bg-transparent text-black text-center p-8 w-[800px] h-[300px] mb-12 rounded-md flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-4 text-center">에테리아</h2>
        <p className={loreLines[currentLineIndex].className}>
          {loreLines[currentLineIndex].text}
        </p>
        <p className="mt-4 text-sm text-gray-600">(화면을 클릭하면 계속됩니다)</p>
      </div>
    </div>
  );
}