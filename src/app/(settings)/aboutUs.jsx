import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";

const links = [
  {
    title: "See our news",
    link: "",
    bgcolours: ["#55C0FF", "#04A1FE"],
    icon: <FontAwesome name="newspaper-o" size={30} color="white" />,
  },
  {
    title: "Our privacy policy",
    link: "",
    bgcolours: ["#73FCE9", "#18E5CF"],
    icon: <MaterialIcons name="privacy-tip" size={30} color="white" />,
  },
  {
    title: "Get in touch",
    link: "/contact",
    bgcolours: ["#88FA4D", "#61D837"],
    icon: <Entypo name="mail" size={30} color="white" />,
  },
  {
    title: "Our website",
    link: "",
    bgcolours: ["#FE968C", "#FE644E"],
    icon: <MaterialIcons name="computer" size={30} color="white" />,
  },
];

const aboutUs = () => {
  const headerHeight = useHeaderHeight();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <FlatList
        style={{ paddingTop: Platform.OS === "android" && headerHeight }}
        ListHeaderComponent={
          <View className="p-4  gap-4">
            <Image
              source={require("@assets/redback-logo.png")}
              className="w-[130px] h-[130px] self-center"
              resizeMode="contain"
            />

            <Image />

            <View className="my-6 gap-2 ">
              <Text className="text-center leading-6">
                Redback operations aims to turn small steps of virtuality into
                bigger steps of reality, making you smarter, fitter, and better.
              </Text>
              <Text className="text-center leading-6">
                Bad weather? Traffic? Worry not, our smart bike project
                transforms your indoor cycling experience but also features an
                interactive virtual reality game and accessible mobile
                application to bring the world to you.
              </Text>
            </View>
          </View>
        }
        numColumns={2}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ padding: 10, gap: 10 }}
        data={links}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: "gray",
              borderRadius: 20,
            }}
            onPress={() => {
              item.link && router.push(item.link);
            }}
            className=" flex-1 overflow-hidden aspect-video items-between"
          >
            <LinearGradient
              start={[0, 0]}
              end={[1, 0]}
              colors={item.bgcolours}
              style={{
                flex: 1,
                padding: 16,
              }}
            >
              <View>{item.icon}</View>
              <Text className="text-white mt-auto text-lg font-semibold">
                {item.title}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default aboutUs;
