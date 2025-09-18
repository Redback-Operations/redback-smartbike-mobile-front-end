import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, Button, StatDisplay, Tile } from "./index";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ComponentExamples = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-center mb-6">
        Component Examples
      </Text>

      {/* Card Examples */}
      <View className="mb-8">
        <Text className="text-xl font-semibold mb-4">Card Component</Text>
        
        <Card className="mb-4">
          <Text>Basic Card with theme-aware styling</Text>
        </Card>
        
        <Card 
          bgColor="bg-blue-100" 
          useThemeColors={false}
          padding="p-6" 
          rounded="rounded-2xl" 
          className="mb-4"
        >
          <Text>Custom styled card with blue background (theme disabled)</Text>
        </Card>
        
        <Card 
          useThemeColors={true}
          padding="p-6" 
          rounded="rounded-2xl" 
          className="mb-4"
        >
          <Text>Theme-aware card that adapts to light/dark mode</Text>
        </Card>
      </View>

      {/* Button Examples */}
      <View className="mb-8">
        <Text className="text-xl font-semibold mb-4">Button Component</Text>
        
        <View className="flex-row gap-2 mb-4">
          <Button size="small" onPress={() => {}}>
            Small
          </Button>
          <Button size="medium" onPress={() => {}}>
            Medium
          </Button>
          <Button size="large" onPress={() => {}}>
            Large
          </Button>
        </View>
        
        <View className="flex-row gap-2 mb-4">
          <Button variant="primary" onPress={() => {}}>
            Primary
          </Button>
          <Button variant="secondary" onPress={() => {}}>
            Secondary
          </Button>
          <Button variant="outline" onPress={() => {}}>
            Outline
          </Button>
          <Button variant="danger" onPress={() => {}}>
            Danger
          </Button>
        </View>
      </View>

      {/* StatDisplay Examples */}
      <View className="mb-8">
        <Text className="text-xl font-semibold mb-4">StatDisplay Component</Text>
        
        <View className="flex-row gap-2 mb-4">
          <StatDisplay
            title="Distance"
            value="12.5"
            subtitle="miles"
            size="small"
            className="flex-1"
          />
          <StatDisplay
            title="Time"
            value="45:30"
            subtitle="minutes"
            size="small"
            className="flex-1"
          />
        </View>
        
        <StatDisplay
          title="Calories Burned"
          value="450"
          subtitle="kcal"
          variant="success"
          size="medium"
          className="mb-4"
        />
      </View>

      {/* Tile Examples */}
      <View className="mb-8">
        <Text className="text-xl font-semibold mb-4">Tile Component</Text>
        
        <View className="flex-row gap-2 mb-4">
          <Tile
            title="Workout"
            icon={<MaterialIcons name="fitness-center" size={32} color="#EB7363" />}
            onPress={() => {}}
            className="flex-1"
          />
          <Tile
            title="Profile"
            icon={<MaterialIcons name="person" size={32} color="#EB7363" />}
            onPress={() => {}}
            className="flex-1"
          />
        </View>
      </View>

    </ScrollView>
  );
};

export default ComponentExamples;
