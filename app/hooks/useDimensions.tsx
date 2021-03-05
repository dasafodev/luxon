import { useState, useEffect } from "react";

function useDimensions() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
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
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return {
    width: dimensions.width,
    height: dimensions.height,
  };
}

export default useDimensions;