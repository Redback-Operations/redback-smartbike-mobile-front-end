import React, { useContext, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import CustomSafeArea from "@/components/CustomSafeArea";
import { AuthContext } from "@/context/authContext";
import { getLeaderboardData } from "../../friendsdata/data";

const leaderboardPeriods = [
  {
    key: "daily",
    label: "Daily",
    title: "Daily standings",
    sectionTitle: "Today's Riders",
    description: "Today's mock standings from your riding circle",
    distanceLabel: "Today's Distance",
    distanceSuffix: "today",
    ridesSuffix: "rides today",
  },
  {
    key: "weekly",
    label: "Weekly",
    title: "Weekly standings",
    sectionTitle: "This Week's Riders",
    description: "This week's mock standings linked to your friends list data",
    distanceLabel: "Weekly Distance",
    distanceSuffix: "this week",
    ridesSuffix: "rides this week",
  },
  {
    key: "monthly",
    label: "Monthly",
    title: "Monthly standings",
    sectionTitle: "This Month's Riders",
    description: "This month's mock standings across your riding network",
    distanceLabel: "Monthly Distance",
    distanceSuffix: "this month",
    ridesSuffix: "rides this month",
  },
];

const getRankStyle = (rank) => {
  switch (rank) {
    case 1:
      return {
        card: "#1B1610",
        border: "#D4AF37",
        badgeBg: "#3A2E16",
        badgeText: "#F5D27A",
        rankBg: "#473616",
        rankText: "#F5D27A",
        label: "Gold",
      };
    case 2:
      return {
        card: "#161B23",
        border: "#A7B0BE",
        badgeBg: "#27303C",
        badgeText: "#E5E7EB",
        rankBg: "#2C3744",
        rankText: "#E5E7EB",
        label: "Silver",
      };
    case 3:
      return {
        card: "#1B1512",
        border: "#C47A44",
        badgeBg: "#39241B",
        badgeText: "#F2B07A",
        rankBg: "#492C1E",
        rankText: "#F2B07A",
        label: "Bronze",
      };
    default:
      return {
        card: "#141A26",
        border: "#1F2937",
        badgeBg: "#1D2432",
        badgeText: "#AAB2C0",
        rankBg: "#1D2432",
        rankText: "#D7DCE4",
        label: "Rider",
      };
  }
};

const getStatusStyle = (status) => {
  switch (status) {
    case "Online":
      return {
        bg: "#1E2A24",
        text: "#4ADE80",
      };
    case "Active":
      return {
        bg: "#2B241C",
        text: "#FBBF24",
      };
    case "Rising":
      return {
        bg: "#2A1E22",
        text: "#FB7185",
      };
    default:
      return {
        bg: "#1D2432",
        text: "#AAB2C0",
      };
  }
};

const SummaryCard = ({ icon, title, value, subtitle }) => {
  return (
    <View className="flex-1 bg-[#141A26] rounded-2xl p-4 border border-[#1F2937]">
      <View className="w-10 h-10 rounded-2xl bg-[#221A22] items-center justify-center mb-3">
        {icon}
      </View>

      <Text className="text-[#9CA3AF] text-xs">{title}</Text>
      <Text className="text-white text-lg font-bold mt-2" numberOfLines={1}>
        {value}
      </Text>
      <Text className="text-[#7E8795] text-xs mt-1" numberOfLines={1}>
        {subtitle}
      </Text>
    </View>
  );
};

const LeaderboardRow = ({ rider, activePeriod }) => {
  const rankStyle = getRankStyle(rider.rank);
  const statusStyle = getStatusStyle(rider.status);
  const activeConfig =
    leaderboardPeriods.find((period) => period.key === activePeriod) ??
    leaderboardPeriods[1];

  return (
    <View
      className="rounded-3xl p-4 mb-3 border"
      style={{
        backgroundColor: rankStyle.card,
        borderColor: rankStyle.border,
      }}
    >
      <View className="flex-row items-center">
        <View
          className="w-12 h-12 rounded-2xl items-center justify-center mr-3"
          style={{ backgroundColor: rankStyle.rankBg }}
        >
          <Text
            className="text-base font-bold"
            style={{ color: rankStyle.rankText }}
          >
            #{rider.rank}
          </Text>
        </View>

        <Image
          source={{ uri: rider.photo }}
          className="w-14 h-14 rounded-full mr-3"
        />

        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-white text-base font-semibold">
                {rider.name}
              </Text>
              <Text className="text-[#9CA3AF] text-xs mt-1">
                {rider.distance.toFixed(1)} km {activeConfig.distanceSuffix}
              </Text>
            </View>

            <View className="items-end">
              <Text className="text-white text-lg font-bold">
                {rider.points.toLocaleString()}
              </Text>
              <Text className="text-[#7E8795] text-xs">pts</Text>
            </View>
          </View>

          <View className="flex-row items-center mt-3">
            <View
              className="px-3 py-1 rounded-full mr-2"
              style={{ backgroundColor: statusStyle.bg }}
            >
              <Text
                className="text-[10px] font-semibold"
                style={{ color: statusStyle.text }}
              >
                {rider.status}
              </Text>
            </View>

            <View
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: rankStyle.badgeBg }}
            >
              <Text
                className="text-[10px] font-semibold"
                style={{ color: rankStyle.badgeText }}
              >
                {rider.rank <= 3 ? rankStyle.label : rider.badge}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function Leaderboard() {
  const { user } = useContext(AuthContext);
  const username = user?.username ? user.username : "Username";
  const [activePeriod, setActivePeriod] = useState("weekly");
  const activeConfig =
    leaderboardPeriods.find((period) => period.key === activePeriod) ??
    leaderboardPeriods[1];
  const leaderboard = getLeaderboardData(activePeriod, username);
  const currentRider = leaderboard.find((rider) => rider.id === "self");
  const topRider = leaderboard[0];
  const currentRank = currentRider ? `#${currentRider.rank}` : "-";
  const currentPoints = currentRider ? currentRider.points.toLocaleString() : "0";
  const currentDistance = currentRider
    ? `${currentRider.distance.toFixed(1)} km`
    : "0.0 km";
  const currentRides = currentRider ? currentRider.periodRides : 0;
  const topRiderName = topRider ? topRider.name : "Jordan Anderson";
  const topRiderPoints = topRider ? topRider.points.toLocaleString() : "0";

  return (
    <CustomSafeArea bgColour="#0B0F1A">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          className="mb-4 self-start"
          onPress={() => router.back()}
        >
          <Text className="text-[#C2C8D0] text-base">← Back</Text>
        </TouchableOpacity>

        <LinearGradient
          colors={["#171E2A", "#111722"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 28,
            padding: 20,
            borderWidth: 1,
            borderColor: "#1F2937",
            marginBottom: 20,
          }}
        >
          <View className="w-16 h-16 rounded-full bg-[#221A22] items-center justify-center mb-4">
            <MaterialIcons name="leaderboard" size={30} color="#EB7363" />
          </View>

          <Text className="text-white text-3xl font-bold">Leaderboard</Text>

          <Text className="text-[#AAB2C0] text-sm mt-2 leading-5">
            Compare your progress with friends and riders.
          </Text>

          <View className="mt-5 self-start px-4 py-2 rounded-full bg-[#1D2432]">
            <Text className="text-[#D8DEE8] text-xs font-medium">
              {activeConfig.title}
            </Text>
          </View>
        </LinearGradient>

        <View className="bg-[#141A26] rounded-2xl p-2 border border-[#1F2937] mb-5">
          <View className="flex-row">
            {leaderboardPeriods.map((period) => {
              const isActive = period.key === activePeriod;

              return (
                <TouchableOpacity
                  key={period.key}
                  activeOpacity={0.85}
                  onPress={() => setActivePeriod(period.key)}
                  className="flex-1 rounded-2xl py-3 items-center"
                  style={{
                    backgroundColor: isActive ? "#EB7363" : "transparent",
                  }}
                >
                  <Text
                    className="text-sm font-semibold"
                    style={{ color: isActive ? "#FFFFFF" : "#9CA3AF" }}
                  >
                    {period.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View className="flex-row gap-3 mb-6">
          <SummaryCard
            title="Your Rank"
            value={currentRank}
            subtitle={`${currentPoints} pts`}
            icon={<FontAwesome5 name="medal" size={18} color="#EB7363" />}
          />
          <SummaryCard
            title="Top Rider"
            value={topRiderName}
            subtitle={`${topRiderPoints} pts`}
            icon={<FontAwesome5 name="trophy" size={18} color="#EB7363" />}
          />
          <SummaryCard
            title={activeConfig.distanceLabel}
            value={currentDistance}
            subtitle={`${currentRides} ${activeConfig.ridesSuffix}`}
            icon={<MaterialIcons name="directions-bike" size={20} color="#EB7363" />}
          />
        </View>

        <View className="mb-3">
          <Text className="text-white text-lg font-semibold">
            {activeConfig.sectionTitle}
          </Text>
          <Text className="text-[#9CA3AF] text-sm mt-1">
            {activeConfig.description}
          </Text>
        </View>

        {leaderboard.map((rider) => (
          <LeaderboardRow
            key={rider.id.toString()}
            rider={rider}
            activePeriod={activePeriod}
          />
        ))}
      </ScrollView>
    </CustomSafeArea>
  );
}
