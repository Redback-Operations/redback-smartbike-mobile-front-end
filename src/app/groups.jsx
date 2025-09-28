import CustomSafeArea from "@/components/CustomSafeArea";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Platform } from "react-native";
import { useThemeStyles } from "@/hooks/useThemeStyles";

import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const groups = [
  {
    title: "🏁 Fitness Squad",
    goal: "100 km this week",
    progress: "62km",
  },
  {
    title: "🚴‍♀️ Hill Climbers",
    goal: "200 mins ride",
    progress: "110 mins",
  },
];

const groupsScreen = () => {
  const insets = useSafeAreaInsets();
  const { theme, inlineStyles } = useThemeStyles();
  
  return (
    <CustomSafeArea>
      <View style={[inlineStyles.background, { padding: 16 }]}>
        <Text style={{ color: theme.text, fontSize: 24, fontWeight: "bold" }}>
          👥 Friends & Groups
        </Text>
        {/* Add Friend Button */}
        <TouchableOpacity 
          style={{ 
            backgroundColor: theme.primary, 
            padding: 16, 
            borderRadius: 12, 
            marginVertical: 24 
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontWeight: "600" }}>
            + Add Friend
          </Text>
        </TouchableOpacity>
        <FlatList
          ItemSeparatorComponent={<View style={{ height: 16 }} />}
          data={groups}
          renderItem={({ item }) => {
            return (
              <View style={{ 
                backgroundColor: theme.surface, 
                padding: 16, 
                borderRadius: 12,
                borderWidth: 1,
                borderColor: theme.border
              }}>
                <Text style={{ 
                  fontSize: 18, 
                  fontWeight: "500", 
                  color: theme.text 
                }}>
                  {item.title}
                </Text>
                <Text style={{ color: theme.textSecondary }}>{item.goal}</Text>
                <Text style={{ color: theme.textSecondary }}>{item.progress}</Text>
              </View>
            );
          }}
        />
      </View>
    </CustomSafeArea>
  );
};

export default groupsScreen;
