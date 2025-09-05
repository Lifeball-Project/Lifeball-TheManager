'use client';

import { useSetupStore } from '@/store/useSetupStore';
import { useState } from 'react';

export function PlayerNameStep() {
  const setPlayerName = useSetupStore((state) => state.setPlayerName);
  const goToNextStep = useSetupStore((state) => state.goToNextStep);

  const [input, setInput] = useState('');

  const handleNameSubmit = () => {
    if (!input.trim()) return;
    setPlayerName(input);
    goToNextStep(); // 다음 단계로 이동
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 items-center">
        <label htmlFor="playerName" className="text-lg font-semibold">Enter Player Name:</label>
        <input
          type="text"
          id="playerName"
          name="playerName"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
          className="border rounded px-4 py-2"
        />
        <button
          onClick={handleNameSubmit}
          className="px-4 py-2 border border-black rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}