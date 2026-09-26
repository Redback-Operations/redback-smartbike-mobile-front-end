jest.mock("expo-linear-gradient", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    LinearGradient: (props) => {
      return React.createElement(View, {
        testID: props.testID,
        colors: props.colors,
        start: props.start,
        end: props.end,
        style: props.style,
        ...props,
      });
    },
  };
});

jest.mock("react-native-svg", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    Svg: (props) => React.createElement(View, props),
    G: (props) => React.createElement(View, props),
    Rect: (props) => React.createElement(View, props),
    Line: (props) => React.createElement(View, props),
    Text: (props) => React.createElement(View, props),
    TSpan: (props) => React.createElement(View, props),
    Path: (props) => React.createElement(View, props),
    Defs: (props) => React.createElement(View, props),
    LinearGradient: (props) => React.createElement(View, props),
  };
});

jest.mock("react-native-chart-kit", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    LineChart: (props) => {
      return React.createElement(View, {
        testID: "line-chart",
        data: props.data,
        chartConfig: props.chartConfig,
        height: props.height,
        width: props.width,
      });
    },
  };
});

jest.mock("@expo/vector-icons/MaterialIcons", () => {
  const React = require("react");
  const { View } = require("react-native");
  return (props) => {
    return React.createElement(View, {
      testID: props.testID,
      name: props.name,
      size: props.size,
      color: props.color,
      ...props,
    });
  };
});