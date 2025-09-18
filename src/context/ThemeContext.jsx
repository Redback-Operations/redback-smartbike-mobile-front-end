import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Theme colors
  const lightTheme = {
    background: '#FFFFFF',
    surface: '#F8F9FA',
    primary: '#8B5CF6', // brand-purple
    secondary: '#1E293B', // brand-navy
    accent: '#EB7363',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    card: '#FFFFFF',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
  };

  const darkTheme = {
    background: '#111827',
    surface: '#1F2937',
    primary: '#A78BFA',
    secondary: '#60A5FA',
    accent: '#F87171',
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    border: '#374151',
    card: '#1F2937',
    success: '#34D399',
    warning: '#FBBF24',
    danger: '#F87171',
    info: '#60A5FA',
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  // Load theme preference from AsyncStorage
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme_preference');
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save theme preference to AsyncStorage
  const saveThemePreference = async (darkMode) => {
    try {
      await AsyncStorage.setItem('theme_preference', darkMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    saveThemePreference(newDarkMode);
  };

  // Set specific theme
  const setTheme = (darkMode) => {
    setIsDarkMode(darkMode);
    saveThemePreference(darkMode);
  };

  const value = {
    isDarkMode,
    theme,
    lightTheme,
    darkTheme,
    toggleTheme,
    setTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
