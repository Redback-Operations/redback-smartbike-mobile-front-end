import React, { useMemo, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomSafeArea from "@/components/CustomSafeArea";
import {
  createWorkoutId,
  getWorkoutDuration,
  saveCustomWorkout,
} from "@/lib/customWorkouts";

const difficultyOptions = ["Beginner", "Intermediate", "Advanced"];
const goalOptions = ["Endurance", "Intervals", "Fat Burn", "Recovery"];
const blockTypeOptions = [
  "Warm-up",
  "Steady Ride",
  "Sprint",
  "Recovery",
  "Climb",
  "Cool-down",
];
const intensityOptions = ["Low", "Medium", "High"];

const intensityAccentMap = {
  Low: {
    bg: "#163321",
    text: "#4ADE80",
  },
  Medium: {
    bg: "#332611",
    text: "#FBBF24",
  },
  High: {
    bg: "#351B20",
    text: "#F87171",
  },
};

const createDefaultBlock = (index = 0) => ({
  id: `block-${Date.now()}-${index}`,
  type: blockTypeOptions[Math.min(index, blockTypeOptions.length - 1)],
  durationMinutes: index === 0 ? "5" : "10",
  intensity: intensityOptions[index === 0 ? 0 : 1],
  resistance: index === 0 ? "2" : "4",
});

const SectionCard = ({ children, style }) => (
  <View
    className="bg-[#111216] border border-[#1B1D24] rounded-[30px] p-5 mb-5"
    style={style}
  >
    {children}
  </View>
);

const SectionTitle = ({ title, subtitle }) => (
  <View className="mb-4">
    <Text className="text-white text-[26px] font-bold">{title}</Text>
    {subtitle ? (
      <Text className="text-[#9A9CA8] text-base mt-2 leading-6">
        {subtitle}
      </Text>
    ) : null}
  </View>
);

const FieldLabel = ({ children }) => (
  <Text className="text-[#8D90A0] text-sm font-medium mb-2">{children}</Text>
);

const DetailChip = ({ label, value }) => (
  <View className="bg-[#171922] border border-[#232632] rounded-full px-4 py-3 mr-3 mb-3">
    <Text className="text-[#8D90A0] text-[11px] uppercase tracking-[0.6px]">
      {label}
    </Text>
    <Text className="text-white text-sm font-semibold mt-1">{value}</Text>
  </View>
);

const OptionPill = ({ label, selected, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={onPress}
    className={`px-5 py-3 rounded-full mr-3 mb-3 border ${
      selected
        ? "bg-[#EB7363] border-[#EB7363]"
        : "bg-[#171922] border-[#232632]"
    }`}
  >
    <Text
      className={`text-sm font-semibold ${
        selected ? "text-white" : "text-[#A8AAB5]"
      }`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const SummaryCard = ({ label, value, flex = 1 }) => (
  <View
    className="bg-[#1A1C24] rounded-[22px] px-4 py-4 border border-[#232632]"
    style={{ flex, minWidth: 180 }}
  >
    <Text className="text-[#8D90A0] text-sm">{label}</Text>
    <Text className="text-white text-[28px] font-bold mt-2">{value}</Text>
  </View>
);

const BlockCard = ({ block, index, onRemove, onUpdate, canDelete }) => {
  const accent = intensityAccentMap[block.intensity] || intensityAccentMap.Medium;

  return (
    <SectionCard>
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center flex-1 pr-4">
          <View className="w-12 h-12 rounded-2xl bg-[#1A1C24] border border-[#232632] items-center justify-center mr-3">
            <Text className="text-white text-lg font-bold">{index + 1}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-white text-xl font-semibold">
              Workout step
            </Text>
            <Text className="text-[#8D90A0] text-sm mt-1">
              Configure this training stage
            </Text>
          </View>
        </View>

        {canDelete ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onRemove}
            className="w-12 h-12 rounded-2xl bg-[#171922] border border-[#232632] items-center justify-center"
          >
            <AntDesign name="delete" size={18} color="#FF6B6B" />
          </TouchableOpacity>
        ) : null}
      </View>

      <View className="flex-row flex-wrap mb-2">
        <View className="bg-[#171922] border border-[#232632] rounded-full px-4 py-2 mr-3 mb-3">
          <Text className="text-[#8D90A0] text-[11px] uppercase tracking-[0.6px]">
            Type
          </Text>
          <Text className="text-white text-sm font-semibold mt-1">
            {block.type}
          </Text>
        </View>
        <View
          className="rounded-full px-4 py-2 mr-3 mb-3 border"
          style={{ backgroundColor: accent.bg, borderColor: `${accent.text}33` }}
        >
          <Text
            className="text-[11px] uppercase tracking-[0.6px]"
            style={{ color: accent.text }}
          >
            Intensity
          </Text>
          <Text
            className="text-sm font-semibold mt-1"
            style={{ color: accent.text }}
          >
            {block.intensity}
          </Text>
        </View>
        <View className="bg-[#171922] border border-[#232632] rounded-full px-4 py-2 mr-3 mb-3">
          <Text className="text-[#8D90A0] text-[11px] uppercase tracking-[0.6px]">
            Duration
          </Text>
          <Text className="text-white text-sm font-semibold mt-1">
            {block.durationMinutes || "0"} min
          </Text>
        </View>
      </View>

      <FieldLabel>Training step</FieldLabel>
      <View className="flex-row flex-wrap mb-2">
        {blockTypeOptions.map((option) => (
          <OptionPill
            key={option}
            label={option}
            selected={block.type === option}
            onPress={() => onUpdate("type", option)}
          />
        ))}
      </View>

      <FieldLabel>Intensity</FieldLabel>
      <View className="flex-row flex-wrap mb-2">
        {intensityOptions.map((option) => (
          <OptionPill
            key={option}
            label={option}
            selected={block.intensity === option}
            onPress={() => onUpdate("intensity", option)}
          />
        ))}
      </View>

      <View className="flex-row flex-wrap">
        <View className="flex-1 min-w-[180px] mr-3 mb-3">
          <FieldLabel>Duration (min)</FieldLabel>
          <TextInput
            value={String(block.durationMinutes)}
            onChangeText={(value) =>
              onUpdate("durationMinutes", value.replace(/[^0-9]/g, ""))
            }
            keyboardType="numeric"
            placeholder="10"
            placeholderTextColor="#666A78"
            className="bg-[#1A1C24] border border-[#232632] text-white rounded-[22px] px-4 py-4 text-base"
          />
        </View>

        <View className="flex-1 min-w-[180px] mb-3">
          <FieldLabel>Resistance</FieldLabel>
          <TextInput
            value={String(block.resistance)}
            onChangeText={(value) =>
              onUpdate("resistance", value.replace(/[^0-9]/g, ""))
            }
            keyboardType="numeric"
            placeholder="4"
            placeholderTextColor="#666A78"
            className="bg-[#1A1C24] border border-[#232632] text-white rounded-[22px] px-4 py-4 text-base"
          />
        </View>
      </View>
    </SectionCard>
  );
};

export default function CustomWorkoutBuilder() {
  const { width } = useWindowDimensions();
  const nameInputRef = useRef(null);
  const [workoutName, setWorkoutName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState(difficultyOptions[1]);
  const [goal, setGoal] = useState(goalOptions[0]);
  const [blocks, setBlocks] = useState([
    createDefaultBlock(0),
    createDefaultBlock(1),
  ]);
  const [isSaving, setIsSaving] = useState(false);

  const totalDuration = useMemo(() => getWorkoutDuration(blocks), [blocks]);
  const averageResistance = useMemo(() => {
    if (!blocks.length) return 0;

    const totalResistance = blocks.reduce(
      (sum, block) => sum + (Number(block.resistance) || 0),
      0,
    );

    return Math.round((totalResistance / blocks.length) * 10) / 10;
  }, [blocks]);
  const firstBlockLabel = blocks[0]?.type || "Warm-up";
  const isDesktop = Platform.OS === "web" && width >= 1280;
  const contentWidth = Math.min(width - (isDesktop ? 56 : 32), 1820);

  const updateBlock = (blockId, field, value) => {
    setBlocks((currentBlocks) =>
      currentBlocks.map((block) =>
        block.id === blockId ? { ...block, [field]: value } : block,
      ),
    );
  };

  const addBlock = () => {
    setBlocks((currentBlocks) => [
      ...currentBlocks,
      createDefaultBlock(currentBlocks.length),
    ]);
  };

  const removeBlock = (blockId) => {
    setBlocks((currentBlocks) =>
      currentBlocks.filter((block) => block.id !== blockId),
    );
  };

  const validateWorkout = () => {
    if (!workoutName.trim()) {
      Alert.alert("Missing workout name", "Please enter a name for the workout.");
      return false;
    }

    if (blocks.length === 0) {
      Alert.alert("Missing workout blocks", "Add at least one workout block.");
      return false;
    }

    const hasInvalidBlock = blocks.some(
      (block) =>
        !block.type ||
        !block.intensity ||
        !String(block.durationMinutes).trim() ||
        Number(block.durationMinutes) <= 0,
    );

    if (hasInvalidBlock) {
      Alert.alert(
        "Incomplete block details",
        "Each workout block needs a valid type, duration, and intensity.",
      );
      return false;
    }

    return true;
  };

  const buildWorkoutPayload = () => ({
    id: createWorkoutId(),
    name: workoutName.trim(),
    description: description.trim(),
    difficulty,
    goal,
    estimatedDurationMinutes: totalDuration,
    blocks: blocks.map((block, index) => ({
      ...block,
      order: index + 1,
      durationMinutes: Number(block.durationMinutes),
      resistance: Number(block.resistance) || 0,
    })),
    createdAt: new Date().toISOString(),
  });

  const handleSaveWorkout = async (startImmediately = false) => {
    if (!validateWorkout()) {
      return;
    }

    setIsSaving(true);

    try {
      const savedWorkout = await saveCustomWorkout(buildWorkoutPayload());

      if (startImmediately) {
        router.push({
          pathname: "/currentWorkout",
          params: {
            title: savedWorkout.name,
            mode: "Custom Workout",
            duration: `${savedWorkout.estimatedDurationMinutes} min`,
            goal: savedWorkout.goal,
            blockCount: String(savedWorkout.blocks.length),
          },
        });
        return;
      }

      Alert.alert(
        "Workout saved",
        "Your custom workout has been saved and is ready to use.",
        [
          {
            text: "Open Calendar",
            onPress: () => router.push("/calendar"),
          },
          {
            text: "Keep Editing",
            style: "cancel",
          },
        ],
      );
    } catch (error) {
      console.error("Failed to save custom workout:", error);
      Alert.alert(
        "Save failed",
        "Something went wrong while saving the custom workout.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <CustomSafeArea bgColour="#070709">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: isDesktop ? 24 : 16,
            paddingTop: isDesktop ? 18 : 16,
            paddingBottom: 48,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{ width: "100%", maxWidth: contentWidth, alignSelf: "center" }}
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

            <SectionCard>
              <View
                className="mb-5"
                style={{
                  flexDirection: isDesktop ? "row" : "column",
                  justifyContent: "space-between",
                  alignItems: isDesktop ? "flex-start" : "stretch",
                }}
              >
                <View
                  className="flex-1"
                  style={{ paddingRight: isDesktop ? 16 : 0 }}
                >
                  <Text className="text-[#FCA5A5] text-xs font-semibold uppercase tracking-[1px]">
                    Workout Builder
                  </Text>
                  <Text
                    className="text-white font-bold mt-3"
                    style={{
                      fontSize: isDesktop ? 34 : 40,
                      lineHeight: isDesktop ? 38 : 44,
                    }}
                  >
                    Custom workouts
                  </Text>
                  <Text className="text-[#9A9CA8] text-base mt-3 leading-6">
                    Build your workout through the app GUI by choosing the goal,
                    difficulty, and training blocks for the session.
                  </Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => nameInputRef.current?.focus()}
                  className="rounded-[28px] bg-[#EB7363] items-center justify-center"
                  style={{
                    width: isDesktop ? 72 : 80,
                    height: isDesktop ? 72 : 80,
                    marginTop: isDesktop ? 0 : 20,
                    alignSelf: isDesktop ? "auto" : "flex-start",
                  }}
                >
                  <MaterialCommunityIcons
                    name="playlist-edit"
                    size={isDesktop ? 30 : 34}
                    color="#0B0B0D"
                  />
                </TouchableOpacity>
              </View>

              <View className="flex-row flex-wrap mb-2">
                <DetailChip label="Difficulty" value={difficulty} />
                <DetailChip label="Goal" value={goal} />
                <DetailChip label="Starts with" value={firstBlockLabel} />
              </View>

              <View
                style={{
                  flexDirection: isDesktop ? "row" : "column",
                  gap: 12,
                }}
              >
                <View style={{ flex: 1, marginBottom: isDesktop ? 0 : 12 }}>
                  <SummaryCard label="Blocks" value={String(blocks.length)} />
                </View>
                <View style={{ flex: 1, marginBottom: isDesktop ? 0 : 12 }}>
                  <SummaryCard
                    label="Est. Duration"
                    value={`${totalDuration} min`}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <SummaryCard label="Goal" value={goal} />
                </View>
              </View>

              <View className="bg-[#171922] border border-[#232632] rounded-[24px] px-4 py-4 mt-1">
                <Text className="text-[#8D90A0] text-sm">Session Preview</Text>
                <Text className="text-white text-lg font-semibold mt-2">
                  {workoutName.trim() || "Untitled custom workout"}
                </Text>
                <Text className="text-[#9A9CA8] text-sm mt-2 leading-5">
                  {description.trim() ||
                    "Add a short description so this session is easier to recognise later."}
                </Text>
                <View className="flex-row flex-wrap mt-4">
                  <DetailChip
                    label="Avg Resistance"
                    value={`${averageResistance || 0}`}
                  />
                  <DetailChip
                    label="Intensity Mix"
                    value={blocks.map((block) => block.intensity).join(" / ")}
                  />
                </View>
              </View>
            </SectionCard>

            <SectionCard>
              <SectionTitle
                title="Details"
                subtitle="Set the workout name and overall training focus"
              />

              <FieldLabel>Workout name</FieldLabel>
              <TextInput
                ref={nameInputRef}
                value={workoutName}
                onChangeText={setWorkoutName}
                placeholder="Climb Intervals"
                placeholderTextColor="#666A78"
                className="bg-[#1A1C24] border border-[#232632] text-white rounded-[22px] px-4 py-4 text-base mb-4"
              />

              <FieldLabel>Description of the workout</FieldLabel>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Short description of the workout"
                placeholderTextColor="#666A78"
                multiline
                textAlignVertical="top"
                className="bg-[#1A1C24] border border-[#232632] text-white rounded-[22px] px-4 py-4 text-base min-h-[110px] mb-5"
              />

              <FieldLabel>Difficulty</FieldLabel>
              <View className="flex-row flex-wrap mb-2">
                {difficultyOptions.map((option) => (
                  <OptionPill
                    key={option}
                    label={option}
                    selected={difficulty === option}
                    onPress={() => setDifficulty(option)}
                  />
                ))}
              </View>

              <FieldLabel>Goal</FieldLabel>
              <View className="flex-row flex-wrap">
                {goalOptions.map((option) => (
                  <OptionPill
                    key={option}
                    label={option}
                    selected={goal === option}
                    onPress={() => setGoal(option)}
                  />
                ))}
              </View>
            </SectionCard>

            <View
              style={{
                flexDirection: isDesktop ? "row" : "column",
                alignItems: "flex-start",
                gap: 16,
              }}
            >
              <View style={{ flex: 1, width: "100%" }}>
                <View className="mb-4">
                  <Text className="text-white text-[26px] font-bold">
                    Blocks
                  </Text>
                  <Text className="text-[#9A9CA8] text-base mt-2 leading-6">
                    Add and configure each stage of your custom workout
                  </Text>
                </View>

                {blocks.map((block, index) => (
                  <BlockCard
                    key={block.id}
                    block={block}
                    index={index}
                    canDelete={blocks.length > 1}
                    onRemove={() => removeBlock(block.id)}
                    onUpdate={(field, value) =>
                      updateBlock(block.id, field, value)
                    }
                  />
                ))}

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={addBlock}
                  className="bg-[#171922] border border-[#232632] rounded-[26px] py-5 items-center mb-5"
                >
                  <View className="flex-row items-center mb-2">
                    <MaterialIcons
                      name="add-circle-outline"
                      size={22}
                      color="#EB7363"
                    />
                    <Text className="text-white text-base font-semibold ml-2">
                      Add workout block
                    </Text>
                  </View>
                  <Text className="text-[#8D90A0] text-sm">
                    Insert another stage such as a sprint, climb, or cool-down
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: isDesktop ? 380 : "100%",
                  flexShrink: 0,
                }}
              >
                <SectionCard>
                  <SectionTitle
                    title="Save workout"
                    subtitle="Store it for later or launch it right away"
                  />

                  <View className="bg-[#171922] border border-[#232632] rounded-[24px] p-4 mb-4">
                    <Text className="text-white text-base font-semibold">
                      Ready to save
                    </Text>
                    <Text className="text-[#9A9CA8] text-sm mt-2 leading-5">
                      This workout is saved locally on the device so you can reuse
                      it later or start it immediately.
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.9}
                    disabled={isSaving}
                    onPress={() => handleSaveWorkout(false)}
                    className="bg-[#EB7363] rounded-[22px] py-4 items-center mb-3"
                  >
                    <Text className="text-white text-base font-bold">
                      {isSaving ? "Saving..." : "Save Workout"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.9}
                    disabled={isSaving}
                    onPress={() => handleSaveWorkout(true)}
                    className="bg-[#171922] border border-[#232632] rounded-[22px] py-4 items-center"
                  >
                    <Text className="text-white text-base font-semibold">
                      Save and Start Now
                    </Text>
                  </TouchableOpacity>
                </SectionCard>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </CustomSafeArea>
  );
}
