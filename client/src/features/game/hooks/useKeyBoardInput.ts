import { useEffect } from 'react';
import { useKeyboardStore } from '@/store/useKeyboardStore';

export function useKeyboardInput(): void {
  const addKey = useKeyboardStore((state) => state.addKey);
  const removeKey = useKeyboardStore((state) => state.removeKey);
  const resetKeys = useKeyboardStore((state) => state.resetKeys);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      addKey(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      removeKey(e.key.toLowerCase());
    };

    const handleBlur = () => {
      resetKeys(); 
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur); 

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [addKey, removeKey, resetKeys]);
}