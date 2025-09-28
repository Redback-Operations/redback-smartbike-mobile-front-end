import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useThemeStyles } from "@/hooks/useThemeStyles";
import { Card, Button, StatDisplay, Tile, ThemeToggle } from "@/components";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ComponentExamples = () => {
  const { inlineStyles } = useThemeStyles();

  return (
    <ScrollView style={inlineStyles.background} className="flex-1 p-4">
      <Text style={inlineStyles.text} className="text-2xl font-bold mb-6 text-center">
        Component Examples
      </Text>

      {/* Theme Toggle Section */}
      <Card className="mb-4">
        <Text style={inlineStyles.text} className="text-lg font-semibold mb-3">
          Theme Toggle
        </Text>
        <ThemeToggle />
      </Card>

      {/* Button Examples */}
      <Card className="mb-4">
        <Text style={inlineStyles.text} className="text-lg font-semibold mb-3">
          Buttons
        </Text>
        <View className="gap-3">
          <Button onPress={() => {}} variant="primary">
            Primary Button
          </Button>
          <Button onPress={() => {}} variant="secondary">
            Secondary Button
          </Button>
          <Button onPress={() => {}} variant="outline">
            Outline Button
          </Button>
          <Button onPress={() => {}} variant="danger">
            Danger Button
          </Button>
        </View>
      </Card>

      {/* Stat Display Examples */}
      <Card className="mb-4">
        <Text style={inlineStyles.text} className="text-lg font-semibold mb-3">
          Statistics
        </Text>
        <View className="flex-row justify-between">
          <StatDisplay
            value="142"
            label="Rides"
            icon={<MaterialIcons name="directions-bike" size={24} color="#8B5CF6" />}
          />
          <StatDisplay
            value="24.5"
            unit="km"
            label="Distance"
            icon={<MaterialIcons name="straighten" size={24} color="#8B5CF6" />}
          />
          <StatDisplay
            value="1h 32m"
            label="Time"
            icon={<MaterialIcons name="schedule" size={24} color="#8B5CF6" />}
          />
        </View>
      </Card>

      {/* Tile Examples */}
      <Card className="mb-4">
        <Text style={inlineStyles.text} className="text-lg font-semibold mb-3">
          Tiles
        </Text>
        <View className="gap-3">
          <Tile
            title="Workout Summary"
            subtitle="View your recent activities"
            icon={<MaterialIcons name="fitness-center" size={24} color="#8B5CF6" />}
            rightIcon={<MaterialIcons name="chevron-right" size={24} color="#6B7280" />}
            onPress={() => {}}
          />
          <Tile
            title="Friends Activity"
            subtitle="See what your friends are up to"
            icon={<MaterialIcons name="group" size={24} color="#8B5CF6" />}
            rightIcon={<MaterialIcons name="chevron-right" size={24} color="#6B7280" />}
            onPress={() => {}}
          />
        </View>
      </Card>

      {/* Nested Cards Example */}
      <Card className="mb-4">
        <Text style={inlineStyles.text} className="text-lg font-semibold mb-3">
          Nested Components
        </Text>
        <Card shadow={false} className="border">
          <Text style={inlineStyles.textSecondary} className="text-sm">
            This is a nested card with custom styling. It demonstrates how components
            can be composed together with different configurations.
          </Text>
        </Card>
      </Card>
    </ScrollView>
  );
};

export default ComponentExamples;
