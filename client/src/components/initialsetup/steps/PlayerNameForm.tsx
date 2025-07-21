'use client';

import { useSetupStore } from '@/store/setupStore';
import { useState } from 'react';

export function PlayerNameForm() {
  const setPlayerName = useSetupStore((state) => state.setPlayerName);
  const goToNextStep = useSetupStore((state) => state.goToNextStep);

  const [input, setInput] = useState('');

  const handleNameSubmit = () => {
    if (!input.trim()) return;
    setPlayerName(input);
    goToNextStep(); // 다음 단계로 이동
  };

  return (
    <div>
      <label htmlFor="playerName">Enter Player Name:</label>
      <input
        type="text"
        id="playerName"
        name="playerName"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <button onClick={handleNameSubmit}>확인</button>
    </div>
  );
}