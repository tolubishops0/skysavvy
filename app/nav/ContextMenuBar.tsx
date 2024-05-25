import React, { useEffect } from "react";
import { ContextMenuBar } from "@/global";

function ContextNavBar({
  x,
  y,
  onCloseContextMenu,
  parentRef,
  children,
}: ContextMenuBar) {
  const menuStyle = {
    top: `${y}px`,
    right: `${0}px`,
    borderRadius: "8px",
  };

  useEffect(() => {
    const clickListener = (event: MouseEvent) => {
      const menuParent = parentRef?.current;
      if (!menuParent || !menuParent.contains(event?.target)) {
        return;
      }
      onCloseContextMenu();
    };
    document.addEventListener("mousedown", clickListener);

    return () => {
      document.removeEventListener("mousedown", clickListener);
    };
  }, []);

  return (
    <div
      style={menuStyle}
      className="absolute z-999 transition duration-1000 translate-x-0  bg-white dark:bg-[#121212] p-6">
      {children}
    </div>
  );
}

export default ContextNavBar;
