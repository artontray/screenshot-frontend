import { useEffect, useRef, useState } from "react";

/**
 * 
 * useClickOutsideToggle component is used to control behaviour 
 * of the Menu when opened with burger icons, the fact of clicking
 * on a link or outside the box will close it automatically and 
 * providing an efficient and user-friendly experience.
 * 
 */

const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;