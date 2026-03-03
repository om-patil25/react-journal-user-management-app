const item = "Journal_Entries";

export const getLocalEntries = () => {
  const stored = localStorage.getItem(item);
  return stored ? JSON.parse(stored) : [];
};

export const setLocalEntries = (entries) => {
  localStorage.setItem(item, JSON.stringify(entries));
};

export const getLocalTheme = () => {
  const themeExist = localStorage.getItem("theme");
  return themeExist ? themeExist : "";
};

export const setLocalTheme = (theme) => {
  localStorage.setItem("theme", theme);
};
