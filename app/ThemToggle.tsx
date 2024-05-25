"use client";
import { useState, useEffect } from "react";
import { MdOutlineWbSunny, MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (mounted)
    return (
      <div
        title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
        style={{
          cursor: "pointer",
        }}
        onClick={() =>
          resolvedTheme === "dark" ? setTheme("light") : setTheme("dark")
        }>
        {resolvedTheme === "dark" ? (
          <MdOutlineWbSunny size={25} />
        ) : (
          <MdOutlineDarkMode size={25} />
        )}
      </div>
    );
}
