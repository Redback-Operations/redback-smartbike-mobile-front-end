import React from "react";
import { Image, Text, View } from "react-native";

const FriendAvatar = ({ friend, size = 56, showRing = false }) => {
  const fallbackSize = Math.round(size * 0.42);

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: `${friend.accent}25`,
        borderWidth: showRing ? 1 : 0,
        borderColor: `${friend.accent}80`,
        overflow: "hidden",
      }}
    >
      {friend.photo ? (
        <Image
          source={{ uri: friend.photo }}
          style={{ width: size, height: size }}
          resizeMode="cover"
        />
      ) : (
        <Text
          style={{
            color: friend.accent,
            fontSize: fallbackSize,
            fontWeight: "700",
          }}
        >
          {friend.name.charAt(0)}
        </Text>
      )}
    </View>
  );
};

export default FriendAvatar;
