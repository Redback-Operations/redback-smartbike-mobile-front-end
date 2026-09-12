import AsyncStorage from "@react-native-async-storage/async-storage";

const SCHEDULED_WORKOUTS_STORAGE_KEY = "redback:scheduled-workouts";

export const createScheduledWorkoutId = () =>
  `scheduled-workout-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const getScheduledWorkouts = async () => {
  try {
    const storedValue = await AsyncStorage.getItem(SCHEDULED_WORKOUTS_STORAGE_KEY);
    const workouts = storedValue ? JSON.parse(storedValue) : [];
    return Array.isArray(workouts)
      ? workouts.sort((first, second) => new Date(first.date) - new Date(second.date))
      : [];
  } catch (error) {
    console.error("Failed to load scheduled workouts:", error);
    return [];
  }
};

export const replaceScheduledWorkouts = async (workouts) => {
  await AsyncStorage.setItem(SCHEDULED_WORKOUTS_STORAGE_KEY, JSON.stringify(workouts));
  return workouts;
};

export const saveScheduledWorkout = async (workout) => {
  const currentWorkouts = await getScheduledWorkouts();
  const updatedWorkouts = [
    workout,
    ...currentWorkouts.filter((item) => item.id !== workout.id),
  ];
  return replaceScheduledWorkouts(updatedWorkouts);
};

export const deleteScheduledWorkout = async (workoutId) => {
  const currentWorkouts = await getScheduledWorkouts();
  return replaceScheduledWorkouts(
    currentWorkouts.filter((workout) => workout.id !== workoutId),
  );
};
