import { View, Text } from "react-native";
import React from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const IOSTimeDatePickers = ({ date, setDate }) => {
  const updateTimeOnly = (originalDate, newTime) => {
    const updatedDate = new Date(originalDate); // clone the original date

    updatedDate.setHours(newTime.getHours());
    updatedDate.setMinutes(newTime.getMinutes());
    updatedDate.setSeconds(newTime.getSeconds());

    return updatedDate;
  };
  return (
    <View className="flex-row justify-center">
      <RNDateTimePicker
        onChange={(event, selectedDate) => {
          if (selectedDate) setDate(selectedDate);
        }}
        mode="date"
        value={date}
      />
      <RNDateTimePicker
        onChange={(event, selectedTime) => {
          if (selectedTime) {
            const newDate = updateTimeOnly(date, selectedTime);
            setDate(newDate);
          }
        }}
        value={date}
        mode="time"
      />
    </View>
  );
};

export default IOSTimeDatePickers;
