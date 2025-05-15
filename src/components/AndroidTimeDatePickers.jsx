import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const AndroidTimeDatePickers = ({ date, setDate, time, setTime }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const updateTimeOnly = (originalDate, newTime) => {
    const updatedDate = new Date(originalDate); // clone the original date

    updatedDate.setHours(newTime.getHours());
    updatedDate.setMinutes(newTime.getMinutes());
    updatedDate.setSeconds(newTime.getSeconds());

    return updatedDate;
  };
  return (
    <View className="flex-row justify-center">
      <View className="flex-row gap-4 justify-between">
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          className="bg-brand-purple rounded-xl p-4"
        >
          <Text className="text-white">Select Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          className="bg-brand-purple p-4 rounded-xl"
        >
          <Text className="text-white">Select Time</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <RNDateTimePicker
          onChange={(event, selectedDate) => {
            if (selectedDate) setDate(selectedDate);
            setShowDatePicker(false);
          }}
          mode="date"
          value={date}
        />
      )}
      {showTimePicker && (
        <RNDateTimePicker
          onChange={(event, selectedTime) => {
            if (selectedTime) {
              const newDate = updateTimeOnly(date, selectedTime);
              setDate(newDate);
              setShowTimePicker(false);
            }
          }}
          value={date}
          mode="time"
        />
      )}
    </View>
  );
};

export default AndroidTimeDatePickers;
