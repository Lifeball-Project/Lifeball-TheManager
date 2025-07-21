'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function LandingClient() {
  const router = useRouter();

  // start-scene 이동 함수
  const handleLanding = () => {
    router.push('/start-scene'); 
  };

  // 클릭 or 키보드 입력 감지
  useEffect(() => {

    // 키보드 입력 또는 클릭 이벤트 핸들러 handleLanding 호출
    const handleKeyDown = (e: KeyboardEvent) => {
      handleLanding();
    };

    const handleClick = () => {
      handleLanding();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);

    // 컴포넌트 언마운트 시 이벤트 리스너. 제거 메모리 누수 방지 용
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h1 className="text-3xl">Press any key or click to start</h1>
    </div>
  );
}