import AsyncStorage from "@react-native-async-storage/async-storage";

const CUSTOM_WORKOUTS_STORAGE_KEY = "redback:custom-workouts";

export const createWorkoutId = () =>
  `custom-workout-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const getWorkoutDuration = (blocks = []) =>
  blocks.reduce((total, block) => {
    const minutes = Number(block?.durationMinutes) || 0;
    return total + minutes;
  }, 0);

export const getCustomWorkouts = async () => {
  try {
    const storedValue = await AsyncStorage.getItem(CUSTOM_WORKOUTS_STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (error) {
    console.error("Failed to load custom workouts:", error);
    return [];
  }
};

export const saveCustomWorkout = async (workout) => {
  const existingWorkouts = await getCustomWorkouts();
  const nextWorkout = {
    ...workout,
    updatedAt: new Date().toISOString(),
  };

  const otherWorkouts = existingWorkouts.filter(
    (item) => item.id !== nextWorkout.id,
  );

  const nextWorkouts = [nextWorkout, ...otherWorkouts];

  await AsyncStorage.setItem(
    CUSTOM_WORKOUTS_STORAGE_KEY,
    JSON.stringify(nextWorkouts),
  );

  return nextWorkout;
};

export const deleteCustomWorkout = async (workoutId) => {
  const existingWorkouts = await getCustomWorkouts();
  const nextWorkouts = existingWorkouts.filter((item) => item.id !== workoutId);

  await AsyncStorage.setItem(
    CUSTOM_WORKOUTS_STORAGE_KEY,
    JSON.stringify(nextWorkouts),
  );

  return nextWorkouts;
};
