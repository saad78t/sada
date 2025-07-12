import { useEffect, useRef, useState } from "react";

export function useToggleMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  function toggleMenu() {
    setShowMenu((menu) => !menu);
  }

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return { showMenu, toggleMenu, menuRef };
}
