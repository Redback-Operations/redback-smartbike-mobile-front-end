import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router, Stack } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomSafeArea from "@/components/CustomSafeArea";

const friendsActivity = [
  {
    id: "1",
    name: "Mila",
    activity: "Rode 12.4 km",
    time: "32 min",
    calories: "245 kcal",
    likes: 3,
    comments: 1,
    accent: "#fb7185",
  },
  {
    id: "2",
    name: "Jay",
    activity: "Hit a weekly goal 🎯",
    time: "",
    calories: "",
    likes: 6,
    comments: 2,
    accent: "#4ade80",
  },
  {
    id: "3",
    name: "Noah",
    activity: "Rode 5.8 km",
    time: "14 min",
    calories: "114 kcal",
    likes: 1,
    comments: 0,
    accent: "#60a5fa",
  },
];

const Friends = () => {
  const renderItem = ({ item }) => {
    const meta =
      item.time || item.calories
        ? `${item.activity} • ${item.time} • ${item.calories}`
        : item.activity;

    return (
      <TouchableOpacity
        activeOpacity={0.88}
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: "/friendsdetails",
            params: { name: item.name },
          })
        }
      >
        <View style={styles.cardTop}>
          <View
            style={[
              styles.avatarCircle,
              { backgroundColor: `${item.accent}15` },
            ]}
          >
            <Text style={[styles.avatarText, { color: item.accent }]}>
              {item.name.charAt(0)}
            </Text>
          </View>

          <View style={styles.cardTextWrap}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>{meta}</Text>
          </View>

          <AntDesign name="right" size={16} color="#9ca3af" />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statPill}>
            <Text style={[styles.statNumber, { color: item.accent }]}>
              {item.likes}
            </Text>
            <Text style={styles.statLabel}>likes</Text>
          </View>

          <View style={styles.statPill}>
            <Text style={[styles.statNumber, { color: item.accent }]}>
              {item.comments}
            </Text>
            <Text style={styles.statLabel}>comments</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <CustomSafeArea>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.heading}>Friends Activity</Text>
              <Text style={styles.subheading}>
                See what your friends have been up to
              </Text>
            </View>

            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.push("/friendslist")}
            >
              <AntDesign name="team" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={friendsActivity}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListFooterComponent={<View style={{ height: 24 }} />}
          />
        </View>
      </CustomSafeArea>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  heading: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
  },
  subheading: {
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 4,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f1f1f",
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    paddingBottom: 10,
  },
  card: {
    backgroundColor: "#0b0b0b",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#1a1a1a",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "700",
  },
  cardTextWrap: {
    flex: 1,
  },
  name: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  meta: {
    color: "#9ca3af",
    fontSize: 14,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#181818",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  statNumber: {
    fontSize: 13,
    fontWeight: "700",
    marginRight: 4,
  },
  statLabel: {
    color: "#9ca3af",
    fontSize: 13,
  },
});

export default Friends;