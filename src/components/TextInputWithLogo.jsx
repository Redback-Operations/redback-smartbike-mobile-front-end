import { View, TextInput } from "react-native";
import React, { useState } from "react";
import { useThemeStyles } from "@/hooks/useThemeStyles";

const TextInputWithLogo = ({
  logo,
  placeholder,
  secure,
  data,
  setData,
  id,
}) => {
  const [focus, setFocus] = useState(false);
  const { theme } = useThemeStyles();
  return (
    <View
      style={{
        backgroundColor: theme.surface,
        borderColor: focus ? theme.primary : theme.border,
      }}
      className="flex flex-row relative items-center transition-all duration-500 border gap-4 px-6 py-4 rounded-full"
    >
      {logo}

      <TextInput
        autoCapitalize="none"
        onChangeText={(text) => setData({ ...data, [id]: text })}
        secureTextEntry={secure}
        className="w-full rounded-full"
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        style={{ color: theme.text }}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
      />
    </View>
  );
};

export default TextInputWithLogo;
