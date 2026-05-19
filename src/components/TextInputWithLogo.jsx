import { View, TextInput } from "react-native";
import React, { useState } from "react";

const TextInputWithLogo = ({
  logo,
  placeholder,
  secure,
  data,
  setData,
  id,
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <View
      className={`flex flex-row relative items-center transition-all duration-500 border gap-4 px-6 py-4 rounded-full ${
        focus ? "border-brand-purple" : "border-gray-400"
      }`}
    >
      {logo}

      <TextInput
        autoCapitalize="none"
        value={data?.[id] ?? ""}
        onChangeText={(text) => setData({ ...data, [id]: text })}
        secureTextEntry={secure}
        className="flex-1"
        placeholder={placeholder}
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
