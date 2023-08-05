import { useState, useEffect } from "react";

export default function useWindowSize() {
  const breakPoint = 800;
  const [showIcon, setShowIcon] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth > breakPoint) {
      setShowIcon(false);
    } else {
      setShowIcon(true);
    }
    window.addEventListener("resize", () =>
      window.innerWidth <= breakPoint ? setShowIcon(true) : setShowIcon(false)
    );
  }, []);

  return [{ showIcon }];
}
