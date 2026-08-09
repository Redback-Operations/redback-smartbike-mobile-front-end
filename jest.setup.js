jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// expo-linear-gradient renders a native view; a plain View is enough for tests.
jest.mock("expo-linear-gradient", () => {
  const { View } = require("react-native");
  return { LinearGradient: View };
});

// react-native-gifted-charts drives its own setTimeout/Animated calls that
// keep firing after a test finishes and crash the worker; stub with plain Views.
jest.mock("react-native-gifted-charts", () => {
  const { View } = require("react-native");
  return { LineChart: View, BarChart: View };
});
