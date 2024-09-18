import { useState, useEffect } from "react";

export default function useWindowSize() {
  const tablet = 800;
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<number>(0);

  function returnWindowSize() {
    setWindowSize(window.innerWidth);
  }

  function checkIsMobile(mobileSize: number) {
    if (window.innerWidth > mobileSize) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      checkIsMobile(tablet);
      returnWindowSize();
    });
  }, []);

  return [{ isMobile, windowSize }];
}
