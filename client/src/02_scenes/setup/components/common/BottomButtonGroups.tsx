interface Props {
  onRandom: () => void;
  onConfirm: () => void;
}

export function BottomButtonGroup({ onRandom, onConfirm }: Props) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex justify-center">
      <button
        onClick={onRandom}
        className="mr-4 px-4 py-2 rounded border"
      >
        랜덤 팀 생성
      </button>
      <button
        onClick={onConfirm}
        className="px-4 py-2 rounded border"
      >
        완료
      </button>
    </div>
  );
}