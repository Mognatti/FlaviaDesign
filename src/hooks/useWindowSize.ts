import { useState, useEffect } from "react";

export default function useWindowSize() {
  const tablet = 800;
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    if (window.innerWidth > tablet) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
    window.addEventListener("resize", () => (window.innerWidth <= tablet ? setIsMobile(true) : setIsMobile(false)));
  }, []);

  return [{ isMobile }];
}
