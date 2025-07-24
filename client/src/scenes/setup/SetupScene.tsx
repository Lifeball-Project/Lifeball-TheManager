import { useSceneStore } from '@/store/useSceneStore';

export function SetupScene() {
  const setScene = useSceneStore((s) => s.setScene);

  return (
    <div>
      <h2>초기 설정 단계</h2>
      {/* 이름 입력 등 설정 UI */}
      <button onClick={() => setScene('game')}>게임 시작</button>
    </div>
  );
}