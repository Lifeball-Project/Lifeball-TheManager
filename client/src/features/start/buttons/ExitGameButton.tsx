'use client';

import { Button } from "../../../components/Button";

export const ExitGameButton = () => {

  // 게임 종료 함수
  const handleExitGame = () => {
    console.log('게임 종료 버튼 클릭');
    // 여기에 게임 종료 로직 추가
  };

  return (
    <Button text="Exit Game" onClick={handleExitGame} />
  );
}