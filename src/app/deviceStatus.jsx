import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomSafeArea from "@/components/CustomSafeArea";

const deviceChecks = [
  {
    label: "Bike connection",
    value: "Connected",
    status: "Stable",
    icon: (
      <MaterialCommunityIcons
        name="bike-fast"
        size={22}
        color="#22C55E"
      />
    ),
  },
  {
    label: "Bluetooth",
    value: "Enabled",
    status: "Ready",
    icon: <MaterialIcons name="bluetooth" size={22} color="#60A5FA" />,
  },
  {
    label: "Resistance sync",
    value: "Synced",
    status: "Normal",
    icon: (
      <MaterialCommunityIcons
        name="tune-vertical"
        size={22}
        color="#EB7363"
      />
    ),
  },
];

const sensors = [
  {
    title: "Speed Sensor",
    subtitle: "Detecting wheel speed in real time",
    value: "29.4 km/h",
    battery: "92%",
    accent: "#22C55E",
    icon: (
      <MaterialCommunityIcons
        name="speedometer"
        size={22}
        color="#22C55E"
      />
    ),
  },
  {
    title: "Cadence Sensor",
    subtitle: "Tracking pedal rhythm and cadence",
    value: "84 RPM",
    battery: "88%",
    accent: "#60A5FA",
    icon: (
      <MaterialCommunityIcons
        name="rotate-right"
        size={22}
        color="#60A5FA"
      />
    ),
  },
  {
    title: "Heart Rate Monitor",
    subtitle: "Live pulse broadcast is active",
    value: "148 BPM",
    battery: "76%",
    accent: "#F87171",
    icon: <MaterialIcons name="favorite" size={22} color="#F87171" />,
  },
];

const quickActions = [
  {
    title: "Reconnect Device",
    subtitle: "Restart the bike pairing flow",
    icon: <MaterialIcons name="sync" size={22} color="#EB7363" />,
  },
  {
    title: "Calibrate Resistance",
    subtitle: "Tune the trainer for smoother rides",
    icon: <MaterialCommunityIcons name="tune" size={22} color="#EB7363" />,
  },
  {
    title: "Run Diagnostics",
    subtitle: "Check sensors, battery, and signal health",
    icon: <FontAwesome5 name="stethoscope" size={18} color="#EB7363" />,
  },
  {
    title: "Open Help",
    subtitle: "Troubleshoot common connection issues",
    icon: <AntDesign name="questioncircleo" size={20} color="#EB7363" />,
  },
];

const DeviceCheckCard = ({ item }) => {
  return (
    <View className="flex-1 bg-[#101014] rounded-2xl border border-[#1c1c22] p-4">
      <View className="w-11 h-11 rounded-2xl bg-[#18191F] items-center justify-center mb-3">
        {item.icon}
      </View>
      <Text className="text-[#8b8b95] text-xs">{item.label}</Text>
      <Text className="text-white text-lg font-bold mt-2">{item.value}</Text>
      <Text className="text-[#A1A1AA] text-xs mt-1">{item.status}</Text>
    </View>
  );
};

const SensorCard = ({ item }) => {
  return (
    <View className="bg-[#101014] rounded-3xl border border-[#1c1c22] p-4 mb-4">
      <View className="flex-row justify-between items-start">
        <View className="flex-row flex-1 pr-4">
          <View className="w-12 h-12 rounded-2xl bg-[#18191F] items-center justify-center mr-3">
            {item.icon}
          </View>
          <View className="flex-1">
            <Text className="text-white text-lg font-semibold">
              {item.title}
            </Text>
            <Text className="text-[#A1A1AA] text-sm mt-1 leading-5">
              {item.subtitle}
            </Text>
          </View>
        </View>

        <View
          className="px-3 py-1 rounded-full"
          style={{ backgroundColor: `${item.accent}22` }}
        >
          <Text
            className="text-[11px] font-semibold"
            style={{ color: item.accent }}
          >
            Live
          </Text>
        </View>
      </View>

      <View className="flex-row gap-3 mt-5">
        <View className="flex-1 bg-[#18191F] rounded-2xl p-3">
          <Text className="text-[#8b8b95] text-xs">Reading</Text>
          <Text className="text-white font-semibold mt-1">{item.value}</Text>
        </View>
        <View className="flex-1 bg-[#18191F] rounded-2xl p-3">
          <Text className="text-[#8b8b95] text-xs">Battery</Text>
          <Text className="text-white font-semibold mt-1">{item.battery}</Text>
        </View>
      </View>
    </View>
  );
};

const ActionCard = ({ item }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className="w-[48.5%] bg-[#101014] rounded-3xl border border-[#1c1c22] p-4 min-h-[164px] justify-between"
    >
      <View className="w-11 h-11 rounded-2xl bg-[#18191F] items-center justify-center">
        {item.icon}
      </View>

      <View>
        <Text className="text-white text-base font-semibold">{item.title}</Text>
        <Text className="text-[#A1A1AA] text-sm mt-2 leading-5">
          {item.subtitle}
        </Text>
      </View>

      <View className="items-end">
        <View className="w-8 h-8 rounded-full bg-[#1D2432] items-center justify-center">
          <MaterialIcons
            name="keyboard-arrow-right"
            size={20}
            color="#EB7363"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function DeviceStatus() {
  return (
    <CustomSafeArea bgColour="#050505">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          className="mb-4 self-start"
          onPress={() => router.back()}
        >
          <View className="flex-row items-center">
            <MaterialIcons name="arrow-back" size={18} color="#C2C8D0" />
            <Text className="text-[#C2C8D0] text-base ml-1">Back</Text>
          </View>
        </TouchableOpacity>

        <View className="bg-[#101014] rounded-[28px] p-5 mb-5 border border-[#1c1c22]">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 pr-4">
              <Text className="text-[#FCA5A5] text-xs font-semibold uppercase tracking-[1px]">
                Smart Bike Hub
              </Text>
              <Text className="text-white text-3xl font-bold mt-2">
                Device status
              </Text>
              <Text className="text-[#A1A1AA] text-sm mt-2 leading-5">
                Monitor connection health, sensor readings, battery levels, and
                bike readiness before your next ride.
              </Text>
            </View>

            <View className="w-16 h-16 rounded-[20px] bg-[#EB7363] items-center justify-center">
              <MaterialCommunityIcons
                name="bike-fast"
                size={30}
                color="#050505"
              />
            </View>
          </View>

          <View className="flex-row gap-3 mt-5">
            {deviceChecks.map((item) => (
              <DeviceCheckCard key={item.label} item={item} />
            ))}
          </View>
        </View>

        <View className="bg-[#15171C] rounded-3xl border border-[#1f2937] p-5 mb-5">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-white text-xl font-semibold">
                Ride readiness
              </Text>
              <Text className="text-[#A1A1AA] text-sm mt-1">
                All primary systems are ready for a workout
              </Text>
            </View>

            <View className="px-4 py-2 rounded-full bg-[#163321]">
              <Text className="text-[#4ADE80] text-xs font-semibold">
                READY
              </Text>
            </View>
          </View>

          <View className="flex-row gap-3 mt-5">
            <View className="flex-1 bg-[#101014] rounded-2xl p-4 border border-[#1c1c22]">
              <Text className="text-[#8b8b95] text-xs">Signal strength</Text>
              <Text className="text-white text-lg font-bold mt-2">
                Excellent
              </Text>
            </View>
            <View className="flex-1 bg-[#101014] rounded-2xl p-4 border border-[#1c1c22]">
              <Text className="text-[#8b8b95] text-xs">Bike battery</Text>
              <Text className="text-white text-lg font-bold mt-2">81%</Text>
            </View>
          </View>
        </View>

        <View className="mb-3">
          <Text className="text-white text-lg font-semibold">
            Connected Sensors
          </Text>
          <Text className="text-[#A1A1AA] text-sm mt-1">
            Real-time device readings from your active setup
          </Text>
        </View>

        {sensors.map((item) => (
          <SensorCard key={item.title} item={item} />
        ))}

        <View className="mb-3 mt-1">
          <Text className="text-white text-lg font-semibold">
            Quick Actions
          </Text>
          <Text className="text-[#A1A1AA] text-sm mt-1">
            Helpful tools for setup, calibration, and troubleshooting
          </Text>
        </View>

        <View className="flex-row flex-wrap justify-between gap-y-4">
          {quickActions.map((item) => (
            <ActionCard key={item.title} item={item} />
          ))}
        </View>
      </ScrollView>
    </CustomSafeArea>
  );
}
