import { createContext, useEffect, useState } from "react";
import { getLocalTheme, setLocalTheme } from "../services/storageServices";

export const ThemeDataContext = createContext();

const ThemeContext = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return getLocalTheme() || "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    setLocalTheme(theme);
  }, [theme]);

  return (
    <ThemeDataContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeDataContext.Provider>
  );
};

export default ThemeContext;
