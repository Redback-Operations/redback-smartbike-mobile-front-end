import React from "react";
import { View, TextInput } from "react-native";

const TextInputWithLogo = ({ id, data, setData, placeholder, secure, logo }) => {
    return (
        <View
            className="flex-row items-center border rounded-full px-4 py-2 bg-gray-100"
            pointerEvents="box-none"
        >
            {logo}
            <TextInput
                style={{ flex: 1, marginLeft: 8 }}
                placeholder={placeholder}
                value={data[id]}
                secureTextEntry={secure}
                onChangeText={(text) => setData((prev) => ({ ...prev, [id]: text }))}
                autoCapitalize="none"
                autoCorrect={false}
            />
        </View>
    );
};

export default TextInputWithLogo;