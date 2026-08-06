import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const [isReduced, setIsReduced] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReduced(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsReduced(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isReduced;
}
