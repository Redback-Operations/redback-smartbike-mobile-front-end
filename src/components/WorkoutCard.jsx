import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 40) / 2;
const cardHeight = cardWidth * 0.7; // 30% shorter than width

const WorkoutCard = ({
  title,
  image,
  bgColor,
  handlePress,
  isSelected,
  setSelectedWorkout,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        width: cardWidth,
        height: cardHeight,
        borderRadius: 20,
        margin: 10,
        overflow: "hidden",
      }}
    >
      <LinearGradient
        colors={[bgColor, `${bgColor}90`]}
        start={[1, 0]}
        end={[0, 0]}
        style={{ flex: 1, padding: 16, justifyContent: "space-between", alignItems: "center" }}
      >
        <Text style={{ fontSize: 36 }}>{image}</Text>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, textAlign: "center" }}>
          {title}
        </Text>

        {isSelected ? (
          <Entypo
            onPress={() => setSelectedWorkout(null)}
            name="cross"
            size={24}
            color="white"
            style={{ position: "absolute", top: 10, right: 10 }}
          />
        ) : (
          <MaterialIcons name="navigate-next" size={24} color="white" />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default WorkoutCard;
