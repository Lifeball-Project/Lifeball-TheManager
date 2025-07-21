'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../../../components/Button';

export const NewGameButton = () => {
  const router = useRouter();

  // 새 게임 시작 함수
  const handleNewGame = () => {
    router.push('/initial-setup-scene'); // 초기 설정 페이지로 이동
  };

  return (
    <Button text="New Game" onClick={handleNewGame} />
  );
} 