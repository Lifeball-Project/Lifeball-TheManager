'use client';

import { Button } from '../../../components/Button';
import { useSceneStore } from '@/store/useSceneStore';

export const NewGameButton = () => {
  const setScene = useSceneStore((s) => s.setScene);
  
  const handleNewGame = () => {
    console.log('새 게임 버튼 클릭');
    // 새 게임 시작 로직
    setScene('setup'); // 예시로 setup 씬으로 이동
  };

  return (
    <Button text="New Game" onClick={handleNewGame} />
  );
} 