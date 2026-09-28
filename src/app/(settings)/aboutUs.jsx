import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
  useWindowDimensions,
} from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, Stack } from "expo-router";
import CustomSafeArea from "@/components/CustomSafeArea";

// Paste the real URLs here when they are available.
// Cards with an empty link are shown as "Coming soon" and can't be tapped.
const links = [
  {
    title: "See our news",
    subtitle: "Latest updates and announcements",
    link: "",
    borderColor: "#374151",
    icon: <FontAwesome name="newspaper-o" size={22} color="#c084fc" />,
  },
  {
    title: "Our privacy policy",
    subtitle: "Learn how your data is handled",
    link: "",
    borderColor: "#374151",
    icon: <MaterialIcons name="privacy-tip" size={22} color="#60a5fa" />,
  },
  {
    title: "Get in touch",
    subtitle: "Reach out to our support team",
    link: "/contact",
    borderColor: "#374151",
    icon: <Entypo name="mail" size={22} color="#fb7185" />,
  },
  {
    title: "Our website",
    subtitle: "Visit our main platform",
    link: "",
    borderColor: "#374151",
    icon: <MaterialIcons name="computer" size={22} color="#f59e0b" />,
  },
];

const AboutUs = () => {
  // Updates when the window is resized (the old version only checked once)
  const { width } = useWindowDimensions();
  const isWideScreen = width > 700;

  const handlePress = async (item) => {
    if (!item.link) return;

    // Internal screen: push so the back button returns to About Us
    if (item.link.startsWith("/")) {
      router.push(item.link);
      return;
    }

    // External website: open it safely
    try {
      const supported = await Linking.canOpenURL(item.link);
      if (!supported) throw new Error("Unsupported URL");
      await Linking.openURL(item.link);
    } catch (error) {
      console.error("Could not open link:", error);
      alert("Sorry, this link could not be opened.");
    }
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
                  accessibilityRole="button"
                  accessibilityLabel="Back to settings"
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
                      style={{ width: 105, height: 105 }}
                      resizeMode="contain"
                      accessibilityLabel="Redback Operations logo"
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
            renderItem={({ item }) => {
              const available = Boolean(item.link);

              return (
                <TouchableOpacity
                  onPress={() => handlePress(item)}
                  disabled={!available}
                  accessibilityRole="button"
                  accessibilityLabel={
                    available ? item.title : `${item.title}, coming soon`
                  }
                  accessibilityState={{ disabled: !available }}
                  style={{
                    flex: 1,
                    marginBottom: isWideScreen ? 0 : 16,
                    opacity: available ? 1 : 0.5,
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
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
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

                      {available ? (
                        <AntDesign name="right" size={16} color="#9ca3af" />
                      ) : (
                        <View
                          style={{
                            backgroundColor: "#27272a",
                            borderRadius: 999,
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                          }}
                        >
                          <Text style={{ color: "#d4d4d8", fontSize: 11, fontWeight: "600" }}>
                            Coming soon
                          </Text>
                        </View>
                      )}
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
              );
            }}
          />
        </View>
      </CustomSafeArea>
    </>
  );
};

export default AboutUs;
