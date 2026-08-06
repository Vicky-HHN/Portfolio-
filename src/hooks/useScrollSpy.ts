import { useState, useEffect } from 'react';

export function useScrollSpy(ids: string[], offset: number = 150): string {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Find the element currently in view
      for (let i = ids.length - 1; i >= 0; i--) {
        const id = ids[i];
        const element = document.getElementById(id);
        if (element) {
          if (element.offsetTop <= scrollPosition) {
            setActiveId(id);
            return;
          }
        }
      }

      // Default to first id if none is actively triggered
      if (ids.length > 0) {
        setActiveId(ids[0]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial run
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids, offset]);

  return activeId;
}
