import type React from "react";
import { createContext, useContext, useMemo } from "react";
import type { SDUITheme } from "../types/sdui";

export const defaultTheme: SDUITheme = {
  primary: "#10B981",
  secondary: "#F59E0B",
  background: "#F0FDF4",
  cardBackground: "#FFFFFF",
  text: "#064E3B",
  textSecondary: "#6B7280",
  border: "#D1FAE5",
};

export const campaignThemes: Record<
  "rakhi" | "janmashtami" | "ganesh",
  SDUITheme
> = {
  rakhi: {
    primary: "#DB2777",
    secondary: "#F59E0B",
    background: "#FDF2F8",
    cardBackground: "#FFFFFF",
    text: "#831843",
    textSecondary: "#9D174D",
    border: "#FBCFE8",
  },
  janmashtami: {
    primary: "#2563EB",
    secondary: "#F59E0B",
    background: "#EFF6FF",
    cardBackground: "#FFFFFF",
    text: "#1E3A5F",
    textSecondary: "#3B82F6",
    border: "#BFDBFE",
  },
  ganesh: {
    primary: "#EA580C",
    secondary: "#F59E0B",
    background: "#FFF7ED",
    cardBackground: "#FFFFFF",
    text: "#7C2D12",
    textSecondary: "#C2410C",
    border: "#FED7AA",
  },
};

const ThemeContext = createContext<SDUITheme>(defaultTheme);

interface ThemeProviderProps {
  children: React.ReactNode;
  payloadTheme?: Partial<SDUITheme>;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  payloadTheme,
}) => {
  const theme = useMemo(() => {
    if (payloadTheme) {
      return { ...defaultTheme, ...payloadTheme };
    }
    return defaultTheme;
  }, [payloadTheme]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useDynamicTheme = () => useContext(ThemeContext);
