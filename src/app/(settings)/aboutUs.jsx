import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
  Dimensions,
} from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, Stack } from "expo-router";
import CustomSafeArea from "@/components/CustomSafeArea";

const { width } = Dimensions.get("window");
const isWideScreen = width > 700;

const links = [
  {
    title: "See our news",
    subtitle: "Latest updates and announcements",
    link: "",
    colors: ["#1f2937", "#111827"],
    borderColor: "#374151",
    icon: <FontAwesome name="newspaper-o" size={22} color="#c084fc" />,
  },
  {
    title: "Our privacy policy",
    subtitle: "Learn how your data is handled",
    link: "",
    colors: ["#1f2937", "#111827"],
    borderColor: "#374151",
    icon: <MaterialIcons name="privacy-tip" size={22} color="#60a5fa" />,
  },
  {
    title: "Get in touch",
    subtitle: "Reach out to our support team",
    link: "/contact",
    colors: ["#1f2937", "#111827"],
    borderColor: "#374151",
    icon: <Entypo name="mail" size={22} color="#fb7185" />,
  },
  {
    title: "Our website",
    subtitle: "Visit our main platform",
    link: "",
    colors: ["#1f2937", "#111827"],
    borderColor: "#374151",
    icon: <MaterialIcons name="computer" size={22} color="#f59e0b" />,
  },
];

const AboutUs = () => {
  const handlePress = async (item) => {
    if (!item.link) return;

    if (item.link.startsWith("/")) {
      router.replace(item.link);
      return;
    }

    await Linking.openURL(item.link);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <CustomSafeArea>
        <View style={{ flex: 1, backgroundColor: "#050505" }}>
          <FlatList
            data={links}
            key={isWideScreen ? "2-columns" : "1-column"}
            numColumns={isWideScreen ? 2 : 1}
            keyExtractor={(item) => item.title}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={isWideScreen ? { gap: 16 } : undefined}
            contentContainerStyle={{
              padding: 20,
              paddingBottom: 40,
              gap: 16,
              backgroundColor: "#050505",
              flexGrow: 1,
            }}
            ListHeaderComponent={
              <View style={{ marginBottom: 28 }}>
                <TouchableOpacity
                  onPress={() => router.replace("/settings")}
                  style={{
                    alignSelf: "flex-start",
                    marginBottom: 18,
                    padding: 6,
                  }}
                >
                  <AntDesign name="arrowleft" size={22} color="white" />
                </TouchableOpacity>

                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: "#0d0d0d",
                    borderRadius: 24,
                    paddingVertical: 30,
                    paddingHorizontal: 22,
                    borderWidth: 1,
                    borderColor: "#1f1f1f",
                  }}
                >
                  <View
                    style={{
                      width: 130,
                      height: 130,
                      borderRadius: 65,
                      backgroundColor: "#111111",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 18,
                      borderWidth: 1,
                      borderColor: "#222222",
                    }}
                  >
                    <Image
                      source={require("@assets/redback-logo.png")}
                      style={{
                        width: 105,
                        height: 105,
                      }}
                      resizeMode="contain"
                    />
                  </View>

                  <Text
                    style={{
                      color: "white",
                      fontSize: 30,
                      fontWeight: "700",
                      marginBottom: 14,
                      textAlign: "center",
                    }}
                  >
                    Redback Operations
                  </Text>

                  <Text
                    style={{
                      color: "#d1d5db",
                      fontSize: 15,
                      lineHeight: 24,
                      textAlign: "center",
                      maxWidth: 760,
                      marginBottom: 10,
                    }}
                  >
                    Redback Operations aims to turn small steps of virtuality into
                    bigger steps of reality, making you smarter, fitter, and better.
                  </Text>

                  <Text
                    style={{
                      color: "#9ca3af",
                      fontSize: 15,
                      lineHeight: 24,
                      textAlign: "center",
                      maxWidth: 760,
                    }}
                  >
                    Bad weather? Traffic? Worry not. Our smart bike project transforms
                    your indoor cycling experience and also features an interactive
                    virtual reality game and an accessible mobile application to bring
                    the world to you.
                  </Text>
                </View>
              </View>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handlePress(item)}
                style={{
                  flex: 1,
                  marginBottom: isWideScreen ? 0 : 16,
                }}
                activeOpacity={0.86}
              >
                <View
                  style={{
                    minHeight: 165,
                    borderRadius: 22,
                    padding: 18,
                    justifyContent: "space-between",
                    borderWidth: 1,
                    borderColor: item.borderColor,
                    backgroundColor: "#111827",
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      backgroundColor: "#18181b",
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#2a2a2a",
                    }}
                  >
                    {item.icon}
                  </View>

                  <View>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 22,
                        fontWeight: "700",
                        marginBottom: 6,
                      }}
                    >
                      {item.title}
                    </Text>

                    <Text
                      style={{
                        color: "#9ca3af",
                        fontSize: 13,
                        lineHeight: 18,
                      }}
                    >
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </CustomSafeArea>
    </>
  );
};

export default AboutUs;