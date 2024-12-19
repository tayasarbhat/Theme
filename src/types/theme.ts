export type ThemeColor = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  surface: string;
};

export type Theme = {
  name: string;
  colors: ThemeColor;
  font: string;
};

export type ThemeContextType = {
  isDarkMode: boolean;
  currentTheme: Theme;
  toggleDarkMode: () => void;
  setTheme: (theme: Theme) => void;
};