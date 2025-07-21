'use client';

import { Button } from '../common/Button';

export const LoadGameButton = () => {

  // 기존 게임 불러오기 함수
  const handleLoadGame = () => {
    console.log('불러오기 버튼 클릭');
    // 여기에 불러오기 로직 추가
    // 서버에서 저장된 게임 데이터를 가져오는 함수 추가하면 될듯.

  };

  return (
    <Button text="Load Game" onClick={handleLoadGame} />
  );
}