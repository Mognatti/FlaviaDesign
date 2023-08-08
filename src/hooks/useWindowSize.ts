import { useState, useEffect } from "react";

export default function useWindowSize() {
  const tablet = 800;
  const [isTablet, setIsTablet] = useState<boolean>(false);
  useEffect(() => {
    if (window.innerWidth > tablet) {
      setIsTablet(false);
    } else {
      setIsTablet(true);
    }
    window.addEventListener("resize", () =>
      window.innerWidth <= tablet ? setIsTablet(true) : setIsTablet(false)
    );
  }, []);

  return [{ isTablet }];
}
