import { useState, useEffect } from 'react';

function useDimensions() {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  function resizeHandler(event) {
    setDimensions(() => {
      return {
        width: event.target.innerWidth,
        height: event.target.innerHeight,
      };
    });
  }

  useEffect(() => {
    setDimensions(() => {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    });

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return {
    width: dimensions.width,
    height: dimensions.height,
  };
}

export default useDimensions;
