import { useEffect, useState, useRef, useCallback } from 'react';

const useContainerWidth = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(500);

  const handleResize = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial width

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return { containerRef, containerWidth };
};

export default useContainerWidth;
