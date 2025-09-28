import { useTheme } from "@/context/ThemeContext";

export const useThemeStyles = () => {
  const { theme, isDarkMode } = useTheme();

  // Helper function to get conditional theme classes
  const getThemeClass = (lightClass, darkClass) => {
    return isDarkMode ? darkClass : lightClass;
  };

  // Helper function to get conditional theme colors
  const getThemeColor = (lightColor, darkColor) => {
    return isDarkMode ? darkColor : lightColor;
  };

  // Common theme-aware style combinations
  const commonStyles = {
    container: {
      backgroundColor: theme.background,
    },
    card: {
      backgroundColor: theme.card,
      borderColor: theme.border,
    },
    text: {
      color: theme.text,
    },
    textSecondary: {
      color: theme.textSecondary,
    },
    border: {
      borderColor: theme.border,
    },
  };

  // Theme-aware Tailwind classes
  const themeClasses = {
    background: getThemeClass('bg-white', 'bg-gray-900'),
    surface: getThemeClass('bg-gray-50', 'bg-gray-800'),
    card: getThemeClass('bg-white', 'bg-gray-800'),
    text: getThemeClass('text-gray-900', 'text-white'),
    textSecondary: getThemeClass('text-gray-600', 'text-gray-300'),
    border: getThemeClass('border-gray-200', 'border-gray-700'),
    input: getThemeClass('bg-white border-gray-300', 'bg-gray-800 border-gray-600'),
  };

  // Inline styles for guaranteed theme support
  const inlineStyles = {
    background: { backgroundColor: theme.background },
    surface: { backgroundColor: theme.surface },
    card: { backgroundColor: theme.card },
    text: { color: theme.text },
    textSecondary: { color: theme.textSecondary },
    border: { borderColor: theme.border },
  };

  return {
    theme,
    isDarkMode,
    getThemeClass,
    getThemeColor,
    commonStyles,
    themeClasses,
    inlineStyles,
  };
};
